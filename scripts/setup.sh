#!/bin/bash
set -e

echo "🚀 Web3 Intelligence Platform — Setup Script"
echo "============================================="

# Check prerequisites
command -v node >/dev/null 2>&1 || { echo "Node.js 20+ required"; exit 1; }
command -v pnpm >/dev/null 2>&1 || { echo "Installing pnpm..."; corepack enable && corepack prepare pnpm@9.15.0 --activate; }

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Build shared packages
echo "🔨 Building shared packages..."
pnpm --filter @web3-intelligence/shared build
pnpm --filter @web3-intelligence/blockchain build

# Setup environment
if [ ! -f .env ]; then
  echo "📝 Creating .env from .env.example..."
  cp .env.example .env
fi

# Start infrastructure
echo "🐳 Starting PostgreSQL and Redis..."
docker compose -f docker/docker-compose.yml up -d postgres redis

echo "⏳ Waiting for database..."
sleep 5

# Database setup
echo "🗄️  Running database migrations..."
cd apps/backend
npx prisma generate
npx prisma db push
npx prisma db seed
cd ../..

echo ""
echo "✅ Setup complete!"
echo ""
echo "Start development:"
echo "  pnpm dev          — Start frontend + backend"
echo "  pnpm docker:up    — Start full stack with Docker"
echo ""
echo "URLs:"
echo "  Frontend:  http://localhost:3000"
echo "  API:       http://localhost:4000"
echo "  Swagger:   http://localhost:4000/docs"
