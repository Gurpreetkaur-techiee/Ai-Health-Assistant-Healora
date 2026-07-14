# ─────────────────────────────────────────────────────────────
# Dockerfile — AI Health Assistant Backend
# Target: AWS App Runner (and any OCI-compatible runtime)
#
# DESIGN DECISIONS:
#
# 1. BASE IMAGE — node:18-alpine:
#    - Alpine Linux is ~5MB vs ~900MB for node:18-debian.
#    - Smaller image = faster deployments, lower storage cost, reduced attack surface.
#    - Node 18 = LTS, matches package.json `engines` requirement.
#    - IMPROVEMENT: Pin to a specific patch version (e.g., node:18.20.2-alpine)
#      to make builds fully reproducible.
#
# 2. NON-ROOT USER:
#    Running as root inside a container is a security risk — if the app is
#    compromised, the attacker has root access to the container filesystem.
#    We create a `node` user (already exists in node:alpine) and switch to it.
#
# 3. npm ci OVER npm install:
#    `npm ci` (clean install) installs exactly what's in package-lock.json.
#    `npm install` may update lock file entries. `npm ci` is deterministic,
#    faster in CI/CD, and fails if package.json and lock are out of sync.
#
# 4. --only=production:
#    Excludes devDependencies (nodemon, jest, supertest) from the final image.
#    This reduces image size and removes development tools from production.
#
# 5. uploads/ directory:
#    Created at build time so the container has it ready. Even though PDFs
#    are processed in memory (memoryStorage), Multer may check if the
#    directory exists. The `uploads/` dir is owned by the `node` user.
#
# 6. HEALTHCHECK:
#    Docker and AWS App Runner use this to determine if the container is healthy.
#    The `/health` endpoint (no auth required) is ideal for this.
#    --interval=30s: check every 30 seconds
#    --timeout=10s:  fail the check if it takes longer than 10s
#    --start-period=10s: give the app 10s to start before first check
#    --retries=3:    mark unhealthy after 3 consecutive failures
# ─────────────────────────────────────────────────────────────

FROM node:18-alpine

# Install dumb-init for proper PID 1 signal handling
# Without it, Node.js runs as PID 1 and doesn't properly forward
# SIGTERM from Docker/App Runner to child processes.
RUN apk add --no-cache dumb-init

# Set working directory inside the container
WORKDIR /app

# Copy dependency manifests first (Docker layer caching optimization)
# If package.json hasn't changed, Docker reuses the cached node_modules layer.
# This makes rebuilds after code changes much faster.
COPY package*.json ./

# Install production dependencies only (no devDependencies)
RUN npm ci --only=production

# Copy the rest of the application source code
COPY . .

# Create the uploads directory and set correct ownership
# Even though files are processed in memory, this prevents any runtime errors.
RUN mkdir -p uploads && chown -R node:node /app

# Switch to the non-root node user
USER node

# Document the port the application listens on
# This is metadata only — the actual port binding happens at runtime via PORT env var.
EXPOSE 5000

# Health check configuration
HEALTHCHECK \
  --interval=30s \
  --timeout=10s \
  --start-period=15s \
  --retries=3 \
  CMD wget -qO- http://localhost:${PORT:-5000}/health || exit 1

# Use dumb-init as PID 1 to properly handle OS signals (SIGTERM from App Runner)
# Then start the Node.js application
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
