# Multi-stage build para optimizar tamaño
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./

# Install all dependencies including dev
RUN npm ci --silent

# Copy source code
COPY . .

# Generate types and build
RUN npx react-router typegen
RUN npm run build

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --silent --only=production && npm cache clean --force

# Copy built application
COPY --from=builder /app/build ./build

# Create necessary directories and set permissions
RUN mkdir -p /app/logs /app/tmp && \
    chown -R node:node /app

# Switch to non-root user
USER node

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

EXPOSE 3000

CMD ["npm", "start"]