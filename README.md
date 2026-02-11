# Docker Node.js Application

This project demonstrates how to use Docker with a bind mount for persistent data storage.

## Project Structure

- `Dockerfile` - Defines the Node.js application container
- `docker-mount/` - Directory to be mounted into the container for persistent data
- `README.md` - This file

## Local Development

To run the application locally without Docker:

```bash
# Install dependencies
npm install

# Run in development mode with hot reload
npm run dev

# Or build TypeScript and run production mode
npm run build
npm start
```

The server will be available at `http://localhost:3000`

## Building the Docker Image

To build the Docker image, run:

```bash
docker build -t docker-node-app .
```

Or use the npm script:
```bash
npm run docker:build
```

## Running the Container with Mount

To run the container with the docker-mount directory mounted, use:

```bash
docker run -p 3000:3000 -v $(pwd)/docker-mount:/app/docker-mount docker-node-app
```

On Windows, use:
```bash
docker run -p 3000:3000 -v %cd%/docker-mount:/app/docker-mount docker-node-app
```

## Using Docker Compose

Alternatively, you can use docker-compose:

```bash
docker-compose up
docker-compose down
```

Or use the npm scripts:
```bash
npm run docker:up    # Start the container
npm run docker:down  # Stop the container
```

## Mount Directory Usage

The `docker-mount` directory is designed to store persistent data that should survive container restarts. Any files placed in this directory will be accessible to the container at `/app/docker-mount`.

## Customizing the Application

To add your own Node.js application:

1. Replace the CMD in the Dockerfile with your application's entry point
2. Add your source files to the `docker-mount/` directory
3. Add dependencies to the root `package.json` file
4. Update scripts in `package.json` as needed