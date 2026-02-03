#!/usr/bin/env bash
# exit on error
set -o errexit

# Install and build the frontend
cd frontend
npm install
npm run build
cd ..

# Install backend dependencies
cd backend
npm install
cd ..