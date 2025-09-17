# Use node:22-alpine as the base image
FROM node:22-alpine

# Create app directory for mounted files
WORKDIR /app/data

# Copy package files from docker-mount subdir
COPY docker-mount/package*.json ./

# Install all dependencies (including dev for TypeScript build)
RUN npm install

# Copy source code from docker-mount subdir
COPY docker-mount/ .

# Expose port
EXPOSE 3000

# Define the command to run the application: build TS then start compiled server
CMD ["sh", "-c", "npm run build && node server.js"]