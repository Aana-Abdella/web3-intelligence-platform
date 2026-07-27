# FAQ

## Is this a complete production SaaS?

No. It is a production-oriented foundation under active development. Wallet, portfolio, auth, health, and airdrop API surfaces exist. Risk, NFT, transaction, notification, and AI features are currently planned or concept preview surfaces unless explicitly backed by an API.

## Does the airdrop score guarantee qualification?

No. Eligibility estimates are based on public on-chain activity and do not guarantee qualification. Protocol teams control final criteria.

## Does the app store private keys?

No. The app does not ask for or store private keys. Wallet connection is handled through Wagmi and RainbowKit.

## Which chains are represented?

Ethereum, Base, Arbitrum, Optimism, Polygon, BNB Chain, Avalanche, and Solana are represented in shared chain metadata.

## Can I use this with real RPC providers?

Yes. Configure RPC URLs in `.env`, provide database and Redis connection strings, and run the backend with the documented environment variables.

## Why do some pages show concept data?

The repository includes professional UI for planned modules so contributors can see the intended product direction. These pages are labeled as `Concept Preview`, `Coming Soon`, or `Planned` when the backend implementation is not complete.

## Where are API docs?

Run the backend and open `http://localhost:4000/docs` for Swagger. The static reference is in [API.md](API.md).

## How should I report security issues?

Use private responsible disclosure. Do not open public issues for vulnerabilities. See [SECURITY.md](../SECURITY.md).
