# Deployment Guide

## Frontend — Vercel

1. Connect GitHub repository to [Vercel](https://vercel.com)
2. Set root directory to `apps/frontend`
3. Configure environment variables:

```
NEXT_PUBLIC_API_URL=https://your-api.railway.app/api/v1
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-project-id
```

4. Deploy — Vercel auto-detects Next.js

## Backend — Railway

1. Create new project on [Railway](https://railway.app)
2. Connect GitHub repository
3. Set root directory to `apps/backend`
4. Configure environment variables:

```
DATABASE_URL=postgresql://...@ep-xxx.neon.tech/web3_intelligence?sslmode=require
REDIS_URL=rediss://...@xxx.upstash.io:6379
JWT_SECRET=your-production-secret-min-64-chars
NODE_ENV=production
ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
APP_URL=https://your-app.vercel.app
```

5. Set build command: `pnpm install && pnpm --filter @web3-intelligence/shared build && pnpm --filter @web3-intelligence/blockchain build && cd apps/backend && npx prisma generate && pnpm build`
6. Set start command: `node dist/main.js`

## Database — Neon PostgreSQL

1. Create project at [Neon](https://neon.tech)
2. Copy connection string to `DATABASE_URL`
3. Run migrations:

```bash
DATABASE_URL="your-neon-url" pnpm db:push
DATABASE_URL="your-neon-url" pnpm db:seed
```

## Cache — Upstash Redis

1. Create database at [Upstash](https://upstash.com)
2. Copy `UPSTASH_REDIS_REST_URL` as `REDIS_URL`
3. Enable TLS

## Docker (Self-Hosted)

```bash
# Build and start full stack
docker compose -f docker/docker-compose.yml up -d

# View logs
docker compose -f docker/docker-compose.yml logs -f

# Stop
docker compose -f docker/docker-compose.yml down
```

## CI/CD — GitHub Actions

The `.github/workflows/ci.yml` pipeline runs on every push/PR:

1. Install dependencies
2. Build shared packages
3. Lint all packages
4. Build frontend and backend
5. Run tests with PostgreSQL + Redis services

## Health Monitoring

- Health endpoint: `GET /api/v1/health`
- Monitor database connectivity
- Set up uptime monitoring (e.g., Better Uptime, Checkly)

## Production Checklist

- [ ] Environment variables configured
- [ ] Database migrated and seeded
- [ ] CORS origin set to production frontend URL
- [ ] JWT secret rotated
- [ ] RPC endpoints configured with API keys
- [ ] SSL/TLS enabled on all services
- [ ] Health checks passing
- [ ] Monitoring and alerting configured
