/**
 * Health Service
 *
 * Business logic for health readings (blood pressure, weight, blood sugar).
 * Also provides an aggregated dashboard summary.
 *
 * DESIGN DECISIONS:
 *
 * 1. DASHBOARD SUMMARY via parallel queries:
 *    getDashboardSummary() fetches:
 *      - Latest reading of each type (3 queries)
 *      - Total reading count per type (1 aggregation)
 *    We use Promise.all() to run them concurrently, not sequentially.
 *    This reduces response time from ~3× to ~1× query latency.
 *
 *    ALTERNATIVE: A single MongoDB aggregation pipeline with $group and $sort.
 *    Pros: One network round-trip.
 *    Cons: More complex, harder to read, marginal gain at this scale.
 *    IMPROVEMENT: Switch to aggregation if reading collection grows large.
 *
 * 2. POLYMORPHIC TYPE FILTERING:
 *    getUserReadings accepts an optional `type` filter.
 *    No type = return all (useful for a timeline of all health events).
 *    With type = return only that metric (useful for a trend chart).
 *
 * 3. DATE RANGE FILTERING:
 *    Accepts startDate / endDate for chart queries (e.g., last 30 days).
 *    If not provided, returns all records up to the limit.
 *
 * 4. READING LIMIT:
 *    Default limit of 50 records per request.
 *    Charts typically show the last 7, 14, or 30 days — 50 is generous.
 *    Prevents accidentally returning thousands of readings.
 *
 * 5. EXTRACTING TYPE-SPECIFIC DATA for the summary:
 *    Since readings are polymorphic, each document has only one populated
 *    sub-object. We extract the relevant value for display in the summary
 *    (e.g., "120/80 mmHg" for BP, "70 kg" for weight).
 */

const { HealthReading } = require('../models');
const AppError           = require('../utils/AppError');

const DEFAULT_LIMIT = 50;

// ─────────────────────────────────────────────────────────────
// LOG A READING
// ─────────────────────────────────────────────────────────────
/**
 * Creates a new health reading document.
 * The Mongoose pre-save hook validates the correct sub-object is present.
 *
 * @param {string} userId
 * @param {object} data   - Validated body including type + type-specific sub-object
 * @returns {Promise<HealthReading>}
 */
const logReading = async (userId, data) => {
  return HealthReading.create({ userId, ...data });
};

// ─────────────────────────────────────────────────────────────
// READ ALL (with filters)
// ─────────────────────────────────────────────────────────────
/**
 * Returns health readings for a user with optional filters.
 *
 * @param {string}  userId
 * @param {object}  options
 * @param {string}  [options.type]      - Filter by reading type
 * @param {number}  [options.limit]     - Max records to return (default: 50)
 * @param {Date}    [options.startDate] - Filter recordedAt >= startDate
 * @param {Date}    [options.endDate]   - Filter recordedAt <= endDate
 * @returns {Promise<HealthReading[]>}
 */
const getUserReadings = async (userId, { type, limit, startDate, endDate } = {}) => {
  const filter = { userId };

  if (type) filter.type = type;

  if (startDate || endDate) {
    filter.recordedAt = {};
    if (startDate) filter.recordedAt.$gte = new Date(startDate);
    if (endDate)   filter.recordedAt.$lte = new Date(endDate);
  }

  const maxLimit = Math.min(parseInt(limit, 10) || DEFAULT_LIMIT, 100);

  return HealthReading
    .find(filter)
    .sort({ recordedAt: -1 }) // Most recent first
    .limit(maxLimit);
};

// ─────────────────────────────────────────────────────────────
// READ ONE
// ─────────────────────────────────────────────────────────────
/**
 * @param {string} userId
 * @param {string} readingId
 * @returns {Promise<HealthReading>}
 * @throws  {AppError} 404
 */
const getReadingById = async (userId, readingId) => {
  const reading = await HealthReading.findOne({ _id: readingId, userId });

  if (!reading) {
    throw new AppError('Health reading not found or does not belong to your account.', 404);
  }

  return reading;
};

// ─────────────────────────────────────────────────────────────
// DELETE
// ─────────────────────────────────────────────────────────────
/**
 * @param {string} userId
 * @param {string} readingId
 * @returns {Promise<void>}
 * @throws  {AppError} 404
 */
const deleteReading = async (userId, readingId) => {
  const reading = await HealthReading.findOneAndDelete({ _id: readingId, userId });

  if (!reading) {
    throw new AppError('Health reading not found or does not belong to your account.', 404);
  }
};

// ─────────────────────────────────────────────────────────────
// DASHBOARD SUMMARY
// ─────────────────────────────────────────────────────────────
/**
 * Builds the health dashboard summary:
 *   - Latest reading of each type
 *   - Total reading count per type
 *
 * Uses Promise.all() for concurrent queries.
 *
 * @param {string} userId
 * @returns {Promise<object>} - Dashboard summary object
 */
const getDashboardSummary = async (userId) => {
  const types = ['blood_pressure', 'weight', 'blood_sugar'];

  // ── Run all queries concurrently ─────────────────────────
  const [
    latestBP,
    latestWeight,
    latestSugar,
    countAggregation
  ] = await Promise.all([
    // Latest reading of each type
    HealthReading.findOne({ userId, type: 'blood_pressure' }).sort({ recordedAt: -1 }),
    HealthReading.findOne({ userId, type: 'weight'         }).sort({ recordedAt: -1 }),
    HealthReading.findOne({ userId, type: 'blood_sugar'    }).sort({ recordedAt: -1 }),

    // Count documents per type in one aggregation
    HealthReading.aggregate([
      { $match: { userId: userId } }, // Must pass userId as-is (aggregation doesn't auto-cast)
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ])
  ]);

  // ── Build count map { blood_pressure: 12, weight: 8, ... } ─
  const readingCounts = types.reduce((acc, t) => ({ ...acc, [t]: 0 }), {});
  countAggregation.forEach(({ _id, count }) => {
    readingCounts[_id] = count;
  });

  const totalReadings = Object.values(readingCounts).reduce((sum, c) => sum + c, 0);

  // ── Format latest readings for display ───────────────────
  const formatReading = (reading) => {
    if (!reading) return null;
    return reading.toJSON();
  };

  return {
    latestReadings: {
      blood_pressure: formatReading(latestBP),
      weight:         formatReading(latestWeight),
      blood_sugar:    formatReading(latestSugar)
    },
    readingCounts,
    totalReadings
  };
};

module.exports = {
  logReading,
  getUserReadings,
  getReadingById,
  deleteReading,
  getDashboardSummary
};
