#!/bin/bash
# Devix Solutions - Vercel Build Script

# Set environment variables
export NEXT_TELEMETRY_DISABLED=1

# Clean previous builds
if [ -d ".next" ]; then
  echo " Cleaning previous build..."
  rm -rf .next
fi

# Install dependencies
echo " Installing dependencies..."
npm install

# Build the project
echo " Building project..."
npm run build:vercel

echo " Build completed successfully!"
