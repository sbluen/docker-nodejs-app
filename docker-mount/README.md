# Docker Mount Folder

This directory is designed to be used as a bind mount in Docker containers.

## Usage

You can mount this directory to a Docker container using the `-v` flag:

```bash
docker run -v ${PWD}/docker-mount:/app/data your-image
```

Or in docker-compose:

```yaml
version: '3'
services:
  app:
    image: your-image
    volumes:
      - ./docker-mount:/app/data
```

## Structure

Feel free to organize your data in this directory as needed:
- Create subdirectories for different types of data
- Add configuration files
- Store application data that needs to persist

## Benefits of Bind Mounts

- Direct access to files on the host system
- Changes are immediately reflected in both host and container
- Useful for development and data persistence