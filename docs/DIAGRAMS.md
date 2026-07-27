# Architecture Diagrams

## System Architecture

```mermaid
flowchart LR
    User[User] --> Frontend[Next.js Frontend]
    Frontend --> API[NestJS API]
    API --> Redis[(Redis Cache)]
    API --> Postgres[(PostgreSQL)]
    API --> Blockchain[Blockchain RPC Providers]
    API --> Jobs[BullMQ Workers - planned]
    Jobs --> Redis
    Jobs --> Postgres
```

## Folder Structure

```mermaid
flowchart TD
    Root[web3-intelligence] --> Apps[apps]
    Root --> Packages[packages]
    Root --> Docs[docs]
    Root --> Docker[docker]
    Root --> GitHub[.github]
    Apps --> Frontend[frontend: Next.js]
    Apps --> Backend[backend: NestJS]
    Packages --> Shared[shared types and utils]
    Packages --> Blockchain[blockchain services]
```

## Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as Auth API
    participant DB as PostgreSQL

    U->>F: Connect wallet
    F->>A: GET /auth/nonce/:address
    A->>DB: Store nonce
    A-->>F: Signing message
    U->>F: Sign message
    F->>A: POST /auth/verify
    A->>DB: Validate nonce and user
    A-->>F: JWT and profile
```

## API Flow

```mermaid
sequenceDiagram
    participant F as Frontend
    participant API as NestJS API
    participant Cache as Redis
    participant DB as PostgreSQL
    participant RPC as Blockchain RPC

    F->>API: GET /wallets/overview
    API->>Cache: Read cache
    alt Cache hit
        Cache-->>API: Wallet overview
    else Cache miss
        API->>RPC: Fetch wallet data
        API->>DB: Upsert wallet snapshot
        API->>Cache: Store TTL result
    end
    API-->>F: Wallet overview
```

## Database ERD

```mermaid
erDiagram
    User ||--o{ WalletBookmark : creates
    User ||--o{ RecentSearch : performs
    User ||--o{ ApiKey : owns
    Wallet ||--o{ WalletBookmark : receives
    Wallet ||--o{ TokenBalance : has
    Wallet ||--o{ Transaction : has
    Wallet ||--o{ RiskAnalysis : has
    Wallet ||--o{ AirdropAnalysis : has
```

## Blockchain Interaction

```mermaid
flowchart LR
    WalletService[Wallet Service] --> ClientFactory[Client Factory]
    PortfolioService[Portfolio Service] --> ClientFactory
    AirdropService[Airdrop Service] --> ClientFactory
    ClientFactory --> Ethereum[Ethereum RPC]
    ClientFactory --> Base[Base RPC]
    ClientFactory --> Arbitrum[Arbitrum RPC]
    ClientFactory --> Optimism[Optimism RPC]
    ClientFactory --> Polygon[Polygon RPC]
    ClientFactory --> Solana[Solana RPC]
```

## Deployment

```mermaid
flowchart LR
    GitHub[GitHub] --> Actions[GitHub Actions]
    Actions --> Vercel[Vercel Frontend]
    Actions --> Railway[Railway API]
    Railway --> Neon[(Neon PostgreSQL)]
    Railway --> Upstash[(Upstash Redis)]
    Railway --> RPC[RPC Providers]
```

## Sequence Diagram

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant Q as React Query
    participant API as API
    participant C as Cache
    participant RPC as RPC

    U->>F: Search address
    F->>Q: Start wallet query
    Q->>API: Fetch overview
    API->>C: Check cache
    API->>RPC: Fetch if needed
    API-->>Q: JSON response
    Q-->>F: Data, loading, error state
    F-->>U: Render dashboard
```

## Component Diagram

```mermaid
flowchart TD
    Layout[Root Layout] --> Providers[Wagmi, RainbowKit, React Query]
    Layout --> Navbar
    Layout --> Pages[App Router Pages]
    Pages --> WalletSearchBar
    Pages --> WalletDashboard
    Pages --> UI[Button, Input, Card, Progress]
    Pages --> Charts[Recharts Views]
    WalletDashboard --> SharedTypes[Shared Package Types]
```
