🚀 Web3 Intelligence Platform
Wallet Analytics • Portfolio • AI • Airdrops

A production-ready Web3 analytics platform for wallet analysis, portfolio tracking, airdrop eligibility scoring, and risk assessment across multiple blockchains.

## Features

- **Wallet Analytics** — Deep analysis of any wallet across 8+ blockchains
- **Portfolio Tracking** — Token balances, NFT holdings, and value tracking
- **Airdrop Eligibility** — Score wallets for potential airdrops based on on-chain behavior
- **Risk Analysis** — Detect scams, honeypots, and risky approvals (Phase 2)
- **AI Insights** — AI-powered wallet behavior analysis (Phase 3)
- **Multi-chain Support** — Ethereum, Base, Arbitrum, Optimism, Polygon, BNB, Avalanche, Solana

## Architecture

```
web3-intelligence/
├── apps/
│   ├── frontend/     # Next.js 15 (App Router)
│   └── backend/      # NestJS REST API
├── packages/
│   ├── shared/       # Types, validators, constants
│   └── blockchain/   # Viem clients, on-chain services
├── docker/           # Docker Compose & Dockerfiles
├── docs/             # Documentation
└── scripts/          # Setup & utility scripts
```

Built with **Clean Architecture**: Presentation → Application → Domain → Infrastructure.

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm 9+
- Docker & Docker Compose (for local database)

### Setup

```bash
# Clone and setup
chmod +x scripts/setup.sh
./scripts/setup.sh

# Or manually:
pnpm install
cp .env.example .env
pnpm docker:up          # Start PostgreSQL + Redis
pnpm db:push            # Push schema
pnpm db:seed            # Seed demo data
pnpm dev                # Start dev servers
```

### URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| API | http://localhost:4000/api/v1 |
| Swagger | http://localhost:4000/docs |
| Health | http://localhost:4000/api/v1/health |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, TypeScript, TailwindCSS, shadcn/ui, React Query, Zustand, Wagmi, RainbowKit |
| Backend | NestJS, Prisma, PostgreSQL, Redis, BullMQ, Swagger, JWT |
| Blockchain | Viem, Ethers.js |
| Infrastructure | Docker, GitHub Actions, Vercel, Railway, Neon, Upstash |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/wallets/search?address=` | Search and analyze wallet |
| GET | `/wallets/overview?address=` | Wallet dashboard overview |
| GET | `/portfolio?address=` | Token balances and portfolio |
| GET | `/airdrop/eligibility?address=` | Airdrop eligibility analysis |
| GET | `/health` | Health check |
| GET | `/auth/nonce/:address` | Get auth nonce |
| POST | `/auth/verify` | Verify wallet signature |

## Development

```bash
pnpm dev          # Start all apps in dev mode
pnpm build        # Production build
pnpm test         # Run tests
pnpm lint         # Lint all packages
pnpm db:migrate   # Run Prisma migrations
pnpm db:seed      # Seed database
```

## Documentation

- [Installation Guide](docs/INSTALL.md)
- [Architecture](docs/ARCHITECTURE.md)
- [API Reference](docs/API.md)
- [Database Schema](docs/DATABASE.md)
- [Security](docs/SECURITY.md)
- [Deployment](docs/DEPLOYMENT.md)
- [Contributing](docs/CONTRIBUTING.md)
- [Roadmap](docs/ROADMAP.md)

## License

MIT
