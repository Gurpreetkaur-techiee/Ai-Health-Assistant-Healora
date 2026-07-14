/**
 * Auth Service
 *
 * Contains ALL authentication business logic.
 * This layer has zero knowledge of HTTP (no req, res, next).
 * It only works with plain data in and plain data out.
 *
 * DESIGN DECISION — Why a Service layer?
 *
 *   Without a service layer, business logic lives in controllers.
 *   Controllers then become hard to test (they need an HTTP context)
 *   and hard to reuse (another feature can't call registration logic
 *   without faking a request object).
 *
 *   With a service layer:
 *   - Controllers are thin: they call the service and shape the HTTP response.
 *   - Services are pure functions of data: easy to unit test with jest.
 *   - Business logic can be called from other services in future phases.
 *
 * BCRYPT SALT ROUNDS — Why 12?
 *
 *   bcrypt cost factor (rounds) determines how many times the hashing
 *   algorithm iterates. Each increment doubles the time:
 *     rounds=10 → ~65ms  per hash (common default)
 *     rounds=12 → ~250ms per hash (chosen here)
 *     rounds=14 → ~1s    per hash (too slow for login UX)
 *
 *   12 rounds is the current OWASP recommendation for bcrypt.
 *   250ms is imperceptible to a real user logging in, but makes
 *   brute-force attacks significantly more expensive.
 *
 *   IMPORTANT: This only applies to register and login — NOT to JWT
 *   verification, which is fast (microseconds).
 */

const bcrypt  = require('bcryptjs');
const { User } = require('../models');
const AppError  = require('../utils/AppError');

// OWASP-recommended bcrypt cost factor (see note above)
const BCRYPT_SALT_ROUNDS = 12;

// ─────────────────────────────────────────────────────────────
// Register a new user
// ─────────────────────────────────────────────────────────────
/**
 * Creates a new user account.
 * Checks for duplicate email before hashing to avoid unnecessary bcrypt work.
 *
 * @param  {object} param0         - { name, email, password }
 * @returns {Promise<User>}         - The newly created user document (without password)
 * @throws  {AppError} 409          - If the email is already registered
 */
const registerUser = async ({ name, email, password }) => {
  // ── Step 1: Check for duplicate email ─────────────────────
  // We check manually (not relying solely on the unique index) so we can
  // return a clear 409 Conflict instead of a raw MongoDB duplicate key error.
  // The unique index on email is still a safety net at the DB layer.
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('An account with this email address already exists.', 409);
  }

  // ── Step 2: Hash the password ──────────────────────────────
  // bcrypt.hash() generates a unique salt internally and incorporates it
  // into the hash string — we do NOT manage salts manually.
  // The resulting hash is always a different string even for the same password.
  const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

  // ── Step 3: Create the user document ──────────────────────
  // We store the hash, never the plaintext password.
  // The User model's `select: false` on the password field ensures
  // the hash is never returned in subsequent queries.
  const user = await User.create({
    name,
    email,
    password: passwordHash
  });

  // Return the user document — password is excluded by the toJSON transform
  return user;
};

// ─────────────────────────────────────────────────────────────
// Authenticate a login attempt
// ─────────────────────────────────────────────────────────────
/**
 * Validates email/password credentials and returns the user if correct.
 *
 * SECURITY — Generic error message:
 * Both "email not found" and "wrong password" return the same 401 message:
 * "Invalid email or password."
 *
 * Why? If we say "email not found", an attacker can enumerate valid accounts
 * by trying different emails. A generic message prevents this.
 *
 * SECURITY — Timing attack mitigation:
 * We always call bcrypt.compare() even when the user is not found.
 * This ensures the response time is consistent regardless of whether the
 * email exists, preventing timing-based user enumeration.
 *
 * @param  {object} param0     - { email, password }
 * @returns {Promise<User>}     - The authenticated user document (without password)
 * @throws  {AppError} 401      - If credentials are invalid
 * @throws  {AppError} 403      - If the account is deactivated
 */
const loginUser = async ({ email, password }) => {
  // ── Step 1: Find the user — explicitly select password ────
  // The password field has `select: false` in the schema, so we must
  // explicitly request it here with `.select('+password')`.
  // This is the ONLY place in the codebase where we do this.
  const user = await User.findOne({ email }).select('+password');

  // ── Step 2: Timing-safe credential check ──────────────────
  // We use a dummy hash if the user doesn't exist so bcrypt.compare()
  // still runs and takes the same time. This prevents timing-based
  // enumeration of valid email addresses.
  const DUMMY_HASH = '$2a$12$dummyhashtopreventtimingattacksonuserenumeration123456';
  const passwordToCompare = user ? user.password : DUMMY_HASH;
  const isPasswordCorrect = await bcrypt.compare(password, passwordToCompare);

  // ── Step 3: Fail with a generic message ───────────────────
  if (!user || !isPasswordCorrect) {
    throw new AppError('Invalid email or password.', 401);
  }

  // ── Step 4: Check account status ──────────────────────────
  if (!user.isActive) {
    throw new AppError('This account has been deactivated. Please contact support.', 403);
  }

  // ── Step 5: Strip password before returning ───────────────
  // Remove the password hash from the document before handing it
  // to the controller. The toJSON transform handles this too, but
  // we do it explicitly here for clarity.
  user.password = undefined;

  return user;
};

// ─────────────────────────────────────────────────────────────
// Get a user by ID (for /me endpoint)
// ─────────────────────────────────────────────────────────────
/**
 * Fetches a user by their MongoDB _id.
 * Used by the auth middleware and the /me controller.
 *
 * @param  {string} userId     - MongoDB ObjectId string
 * @returns {Promise<User>}     - User document (without password)
 * @throws  {AppError} 404      - If no user found with this ID
 */
const getUserById = async (userId) => {
  const user = await User.findById(userId);

  if (!user || !user.isActive) {
    throw new AppError('User not found or account is inactive.', 404);
  }

  return user;
};// ─────────────────────────────────────────────────────────────
// Update current user profile
// ─────────────────────────────────────────────────────────────
const updateMe = async (userId, data) => {

  const allowedUpdates = {
    name: data.name,
    dateOfBirth: data.dateOfBirth,
    gender: data.gender,
    bloodGroup: data.bloodGroup
  };

  const user = await User.findByIdAndUpdate(
    userId,
    allowedUpdates,
    {
      new: true,
      runValidators: true
    }
  );

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  return user;

};



module.exports = {
  registerUser,
  loginUser,
  getUserById,
  updateMe
};
