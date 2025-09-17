# Docker Node.js Application

This project demonstrates how to use Docker with a bind mount for persistent data storage.

## Project Structure

- `Dockerfile` - Defines the Node.js application container
- `docker-mount/` - Directory to be mounted into the container for persistent data
- `README.md` - This file

## Building the Docker Image

To build the Docker image, run:

```bash
docker build -t docker-node-app .
```

## Running the Container with Mount

To run the container with the docker-mount directory mounted, use:

```bash
docker run -p 3000:3000 -v $(pwd)/docker-mount:/app/data docker-node-app
```

On Windows, use:
```bash
docker run -p 3000:3000 -v %cd%/docker-mount:/app/data docker-node-app
```

## Using Docker Compose

Alternatively, you can use docker-compose:

```bash
docker-compose up
```

## Mount Directory Usage

The `docker-mount` directory is designed to store persistent data that should survive container restarts. Any files placed in this directory will be accessible to the container at `/app/data`.

## Customizing the Application

To add your own Node.js application:

1. Replace the CMD in the Dockerfile with your application's entry point
2. Add your source files to the project directory
3. If you have dependencies, add a package.json file