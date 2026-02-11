# Use node:22-alpine as the base image
FROM node:22-alpine

# Create app directory
WORKDIR /app

# Copy package files from root
COPY package*.json ./

# Install all dependencies (including dev for TypeScript build)
RUN npm install

# Copy source code from docker-mount subdir
COPY docker-mount/ ./docker-mount/

# Generate Prisma client
RUN cd docker-mount && npx prisma generate

# Set NODE_PATH to use /app/node_modules for module resolution
ENV NODE_PATH=/app/node_modules

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose port
EXPOSE 3000

# Run entrypoint script
CMD ["/entrypoint.sh"]