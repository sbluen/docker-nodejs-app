#!/bin/sh

# Run migrations and seeding only once
if [ ! -f ".migrated" ]; then
    echo "Running database migrations..."
    cd docker-mount && npx prisma db push
    
    # Run all migration files in the migrations folder (alphabetical order)
    for file in migrations/*.ts; do
        if [ -f "$file" ]; then
            echo "Running migration: $file"
            npx ts-node "$file"
        fi
    done
    
    cd ..
    touch .migrated
    echo "Migrations complete."
else
    echo "Skipping migrations (already completed)."
fi

# Build TypeScript and start server
echo "Starting server..."
cd docker-mount && npx tsc && node server.js

