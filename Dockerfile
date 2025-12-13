# ---------------- Base Stage ----------------
FROM node:20-alpine AS base

# Install necessary utility for Next.js to run on Alpine
RUN apk add --no-cache libc6-compat

WORKDIR /app

# ---------------- Dependencies Stage ----------------
FROM base AS deps
COPY package.json package-lock.json ./
# Use 'npm ci' for clean and fast dependency installation
RUN npm ci

# ---------------- Builder Stage ----------------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variable for build
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT $PORT_Fronted 
# The build command generates the standalone output in .next/standalone
RUN npm run build

# ---------------- Production Stage (Runner) ----------------
# Use a slim, secure base image
FROM node:20-alpine AS runner
WORKDIR /app

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set environment variable for production runtime
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Copy the standalone output and public files from the builder stage
# The 'standalone' folder contains *all* necessary dependencies and server files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Copy the static assets
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Run the application as the non-root user
USER nextjs

EXPOSE 5050

# The standalone output generates a server.js file to start the Next.js server
CMD ["node", "server.js"] 