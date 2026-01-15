# Stage 1: Build the Vite app
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with a static file server
FROM node:18-alpine

WORKDIR /app

# Install a lightweight static file server
RUN npm install -g serve

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Expose the port used by serve
EXPOSE 5170

# Serve the static files
CMD ["serve", "-s", "dist", "-l", "5170"]
