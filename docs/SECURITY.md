# Security

## Overview

Security is implemented at multiple layers following OWASP best practices for Web3 applications.

## Application Security

### HTTP Headers (Helmet)

- Content-Security-Policy
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Strict-Transport-Security (production)

### CORS

- Restricted to configured `APP_URL` origin
- Credentials enabled for authenticated requests

### Rate Limiting

- Global: 100 requests/minute per IP (configurable)
- Applied via NestJS ThrottlerGuard
- Returns HTTP 429 when exceeded

### Input Validation

- All API inputs validated via `class-validator` decorators
- Wallet addresses validated with regex patterns (EVM + Solana)
- Whitelist mode: unknown fields rejected
- SQL injection prevented by Prisma parameterized queries

### Authentication

- Wallet-based auth using SIWE (Sign-In With Ethereum)
- JWT tokens with configurable expiration
- Nonce-based replay attack prevention
- No private keys ever accessed or stored

## Data Security

### Secrets Management

- All secrets in environment variables
- `.env` files excluded from git
- API keys never exposed to frontend
- RPC URLs server-side only

### Database

- Parameterized queries via Prisma ORM
- No raw SQL except health check (`SELECT 1`)
- Connection string with SSL in production (Neon)

### Caching

- Redis data is non-sensitive (public on-chain data)
- Cache keys namespaced by resource type
- TTL-based expiration

## Web3-Specific Security

### Address Validation

- EVM: `0x` + 40 hex characters
- Solana: Base58, 32-44 characters
- Normalized to lowercase for storage

### RPC Security

- Server-side RPC calls only
- Rate limiting on blockchain queries
- Fallback RPC endpoints

### Frontend

- No private key handling
- Wallet connection via RainbowKit (industry standard)
- XSS prevention via React's default escaping
- No `dangerouslySetInnerHTML`

## Reporting Vulnerabilities

If you discover a security vulnerability, please report it responsibly by emailing the maintainers. Do not create public GitHub issues for security concerns.

## Checklist for Production

- [ ] Change `JWT_SECRET` to cryptographically random 64+ char string
- [ ] Enable HTTPS (Vercel/Railway handle this)
- [ ] Configure Neon PostgreSQL with SSL
- [ ] Set up Upstash Redis with TLS
- [ ] Restrict CORS to production domain
- [ ] Enable database connection pooling
- [ ] Set up monitoring and alerting
- [ ] Review and rotate API keys regularly
- [ ] Implement full SIWE verification before production auth
