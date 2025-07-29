# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for potential build steps)
RUN npm ci --only=production && npm cache clean --force

# Production stage
FROM node:20-alpine AS production

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S botuser -u 1001 -G nodejs

WORKDIR /app

# Copy node_modules from builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy application code
COPY --chown=botuser:nodejs . .

# Create necessary directories with proper permissions
RUN mkdir -p Logs && \
    chown -R botuser:nodejs Logs && \
    chmod 755 Logs

# Remove unnecessary files to reduce image size
RUN rm -rf .git .gitignore README.md Dockerfile docker-compose.yml \
    && rm -rf node_modules/*/README.md \
    && rm -rf node_modules/*/CHANGELOG.md \
    && rm -rf node_modules/*/.github \
    && rm -rf node_modules/*/docs

# Switch to non-root user
USER botuser

EXPOSE 3000

CMD ["node", "index.js"]
