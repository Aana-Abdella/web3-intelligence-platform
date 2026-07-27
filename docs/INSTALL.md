# Installation Guide

## Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 20+ | Runtime |
| pnpm | 9+ | Package manager |
| Docker | 24+ | Local infrastructure |
| Git | 2.40+ | Version control |

## Step-by-Step Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd web3-intelligence
```

### 2. Install Dependencies

```bash
corepack enable
pnpm install
```

### 3. Environment Configuration

```bash
cp .env.example .env
```

Edit `.env` and configure:

- `DATABASE_URL` — PostgreSQL connection string
- `REDIS_URL` — Redis connection string
- `JWT_SECRET` — Random string (min 32 characters)
- `ETHEREUM_RPC_URL` — Alchemy/Infura RPC endpoint
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` — From [WalletConnect Cloud](https://cloud.walletconnect.com)

### 4. Start Infrastructure

```bash
# Start PostgreSQL and Redis only
docker compose -f docker/docker-compose.yml up -d postgres redis
```

Or use the setup script:

```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### 5. Database Setup

```bash
pnpm db:generate    # Generate Prisma client
pnpm db:push        # Push schema to database
pnpm db:seed        # Seed demo data
```

### 6. Build Shared Packages

```bash
pnpm --filter @web3-intelligence/shared build
pnpm --filter @web3-intelligence/blockchain build
```

### 7. Start Development

```bash
pnpm dev
```

This starts:
- Frontend at http://localhost:3000
- Backend at http://localhost:4000
- Swagger at http://localhost:4000/docs

## Production with Neon + Upstash

For production deployment without local Docker:

1. Create a [Neon](https://neon.tech) PostgreSQL database
2. Create an [Upstash](https://upstash.com) Redis instance
3. Update `.env`:

```env
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/web3_intelligence?sslmode=require
REDIS_URL=rediss://default:xxx@xxx.upstash.io:6379
```

4. Run migrations: `pnpm db:push`

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `ECONNREFUSED` on DB | Ensure Docker containers are running: `docker ps` |
| Prisma client not found | Run `pnpm db:generate` |
| Port 3000/4000 in use | Change ports in `.env` or kill existing processes |
| Redis connection failed | Caching degrades gracefully; API still works |
