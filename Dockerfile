# Stage 1: Install Dependencies
FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

# Install all deps (including dev) for build
RUN npm ci



# Stage 2: Build TypeScript
FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build



# Stage 3: Production Runtime

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Install curl for HEALTHCHECK
RUN apk add --no-cache curl

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only production package files
COPY package.json package-lock.json ./

# Install production deps only
RUN npm ci --omit=dev

# Copy compiled app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/views ./dist/views
COPY --from=builder /app/public ./public

# Change ownership
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

EXPOSE 3000


# HEALTHCHECK
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "dist/server.js"]