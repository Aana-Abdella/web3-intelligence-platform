# API Reference

Base URL: `http://localhost:4000/api/v1`

Interactive documentation: `http://localhost:4000/docs` (Swagger UI)

## Authentication

Wallet-based authentication using Sign-In With Ethereum (SIWE) pattern.

### Get Nonce

```
GET /auth/nonce/:address
```

**Response:**

```json
{
  "nonce": "a1b2c3d4...",
  "message": "Sign this message to authenticate..."
}
```

### Verify Signature

```
POST /auth/verify
Content-Type: application/json

{
  "walletAddress": "0x...",
  "signature": "0x..."
}
```

**Response:**

```json
{
  "accessToken": "eyJhbG...",
  "user": {
    "id": "clx...",
    "walletAddress": "0x...",
    "role": "user"
  }
}
```

## Wallets

### Search Wallet

```
GET /wallets/search?address=0x...&chainId=1&refresh=false
```

| Parameter | Type    | Required | Description                         |
| --------- | ------- | -------- | ----------------------------------- |
| address   | string  | Yes      | Wallet address (EVM or Solana)      |
| chainId   | number  | No       | Chain ID (auto-detected if omitted) |
| refresh   | boolean | No       | Bypass cache                        |

**Response:** `WalletOverview` object

### Get Overview

```
GET /wallets/overview?address=0x...
```

Same as search. Returns dashboard metrics.

### Recent Searches

```
GET /wallets/recent
```

**Response:** Array of `RecentSearch` objects

## Portfolio

### Get Portfolio

```
GET /portfolio?address=0x...&chainId=1
```

**Response:**

```json
{
  "totalValueUsd": 850000,
  "change24h": 0,
  "change24hPercent": 0,
  "tokens": [...],
  "topAssets": [...],
  "chainBreakdown": [...]
}
```

## Airdrop

### Eligibility Analysis

```
GET /airdrop/eligibility?address=0x...
```

**Response:**

```json
{
  "score": 72,
  "level": "high",
  "factors": [
    {
      "name": "Wallet Age",
      "score": 100,
      "maxScore": 100,
      "weight": 0.15,
      "description": "3200 days since first activity"
    }
  ],
  "suggestions": ["Bridge assets to Layer 2 networks"],
  "potentialCampaigns": [
    {
      "name": "LayerZero",
      "protocol": "LayerZero",
      "likelihood": "high",
      "requirements": ["Bridge usage", "Multi-chain activity"]
    }
  ]
}
```

## Health

```
GET /health
```

**Response:**

```json
{
  "status": "healthy",
  "timestamp": "2026-07-27T...",
  "services": {
    "database": "ok",
    "api": "ok"
  }
}
```

## Error Responses

All errors follow this format:

```json
{
  "statusCode": 400,
  "message": "Invalid wallet address format",
  "error": "Bad Request",
  "timestamp": "2026-07-27T..."
}
```

## Rate Limiting

- Default: 100 requests per 60 seconds per IP
- Configurable via `RATE_LIMIT_TTL` and `RATE_LIMIT_MAX` env vars
- Returns `429 Too Many Requests` when exceeded

## Pagination

Endpoints returning lists support:

| Parameter | Default | Max |
| --------- | ------- | --- |
| page      | 1       | —   |
| limit     | 20      | 100 |
