# Web3 Intelligence & Airdrop Eligibility Platform
## Comprehensive Website Overview & Technical Documentation

---

## 1. Executive Summary & Purpose

The **Web3 Intelligence & Airdrop Eligibility Platform** is a production-grade Web3 analytics command center designed to empower crypto users, DeFi participants, and Web3 researchers to maximize their eligibility for upcoming protocol token distributions (airdrops).

### Primary Objectives:
1. **Wallet Eligibility Scoring**: Score any EVM or Solana address against on-chain signals (volume, gas spent, protocol diversity, contract interactions, wallet age).
2. **Actionable Task Discovery (⭐ Featured Tasks)**: Provide clear, step-by-step recommended tasks across **Bridge, DEX, Lending, NFT, Governance, Staking, and Social** categories that boost eligibility.
3. **Personalized Recommendation Engine**: Analyze wallet history to explain *why* specific actions are suggested (e.g., recommending Aave if no lending activity is detected, or recommending cross-chain bridging if L2 usage is low).
4. **Gamification & Habit Building**: Motivate continuous, organic on-chain engagement via **Daily Tasks**, **Weekly Missions**, and **20+ Unlockable Achievements**.
5. **Ecosystem Campaign Tracking**: Monitor high-opportunity protocol campaigns (zkSync, Linea, Scroll, Base, EigenLayer, Berachain) with real-time risk, popularity, and deadline tracking.

---

## 2. Key Features & Dashboard Modules

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        WEB3 INTELLIGENCE COMMAND CENTER                                │
├───────────────────────────────┬────────────────────────────────────────────────────────┤
│ ⭐ Featured Tasks System      │ Filterable catalog across 7 categories & 5 sort modes  │
│ 🤖 Recommendation Engine      │ Tailored wallet advice based on transaction history    │
│ 🎯 Airdrop Readiness Meter    │ Overall readiness score & 7-category visual progress   │
│ 🎮 Quests & Achievements      │ Daily tasks, weekly missions, and 20+ achievements     │
│ 🔥 Trending Campaigns         │ Opportunity, risk, deadline, and popularity metrics    │
│ 🛡️ Portfolio & Risk Analytics │ Approval exposure, suspicious contracts, asset values  │
└───────────────────────────────┴────────────────────────────────────────────────────────┘
```

### ⭐ Featured Tasks System
- **Filterable & Searchable Task Hub**: Search across 30+ protocol actions by title, protocol name, blockchain, or tag.
- **7 Core Categories**:
  - **Bridge**: Across, Stargate, LayerZero, Relay, Hop, Wormhole.
  - **DEX**: Uniswap, Aerodrome, SushiSwap, PancakeSwap, Curve, Balancer.
  - **Lending**: Aave, Compound, Morpho, Spark.
  - **NFT**: Zora, OpenSea, Farcaster Frames, Mirror.
  - **Governance**: Snapshot, Arbitrum DAO, Optimism Collective, Tally.
  - **Staking**: Lido, EigenLayer, Rocket Pool, Polygon Staking.
  - **Social**: Discord, X (Twitter), Galxe, Zealy.
- **Rich Task Cards**:
  - Protocol logo & title
  - Short actionable description
  - Difficulty badge (`Easy`, `Medium`, `Hard`)
  - Estimated time & eligibility score boost (`+8 Eligibility Score`)
  - Chain badge & progress bar (`0%` to `100%`)
  - Status indicator (`Not Started`, `In Progress`, `Completed`)
  - Primary ("View Guide") and secondary CTA buttons.

### 🤖 Intelligent Wallet Recommendation Engine
Analyzes public on-chain activity parameters to generate customized insights:
- **Low Transaction Count (<50)**: Recommends regular DEX swaps.
- **No Bridge History**: Suggests cross-chain bridging to L2 networks.
- **No Lending History**: Recommends supplying liquidity to Aave or Compound.
- **No NFT Activity**: Recommends minting edition NFTs on Zora/Base.
- **New Wallet Age (<90 days)**: Displays organic usage guidance instead of rushing high-risk transactions.

### 🎯 Airdrop Readiness & Category Breakdown
- **Overall Score**: 0–100% overall readiness indicator with rating labels (*Excellent*, *High*, *Moderate*, *Low*).
- **Progress Breakdown**: Visual progress bars across all 7 protocol categories.

### 🎮 Quests & Gamification
- **Daily Tasks**: 24-hour rotating micro-tasks (Swap once, Bridge once, Vote once, Mint NFT).
- **Weekly Missions**: Higher-tier weekly targets (10 Transactions, 5 Protocols, Bridge 3 Chains).
- **Achievements**: Unlockable badges with progress meters (First Bridge, DeFi Explorer, NFT Collector, Governance Voter, Multi-chain User, Power Wallet).

### 🔥 Trending Ecosystem Campaigns
- Curated index of high-value tokenless or incentivized ecosystems (zkSync, Linea, Scroll, Base, EigenLayer, Blast, Berachain, Monad, Sui, Aptos, Starknet).
- Displays opportunity rating, deadline, risk level (`Low`, `Medium`, `High`), popularity percentage bar, and direct access links.

---

## 3. Technology Stack & Architecture

| Layer | Technology |
| :--- | :--- |
| **Monorepo Architecture** | `pnpm` workspace + `Turborepo` |
| **Frontend Framework** | Next.js 15 (App Router), React 19, TypeScript |
| **Styling & Aesthetics** | Vanilla CSS tokens, Tailwind CSS 3.4, Framer Motion, Radix UI |
| **Icons & Design System** | Lucide React, Glassmorphism cards, Sleek dark mode palette |
| **Web3 Stack** | `@rainbow-me/rainbowkit` 2.2, `wagmi` 2.14, `viem` 2.21 |
| **State & Data Fetching** | `@tanstack/react-query` 5.62, `zustand` 5.0 |

---

## 4. User Workflow & Journey

1. **Connect or Search Wallet**: Users enter any EVM address or connect via RainbowKit.
2. **Review Readiness**: The dashboard displays the wallet's overall readiness score and category breakdown.
3. **Explore Recommended Tasks**: The recommendation engine highlights high-priority tasks tailored to the wallet's missing requirements.
4. **Execute & Track**: Users filter tasks by category or sort by Highest Reward / Easiest / Fastest, click "View Guide" or "Continue", and track completion progress.
5. **Earn Rewards & Achievements**: Completing daily tasks and weekly missions unlocks achievements and increases the overall airdrop readiness score.

---

## 5. Deployment & System Verification

- **TypeScript Typecheck**: Verified clean (`tsc --noEmit` exit code 0).
- **ESLint Compliance**: Passed with 0 warnings or errors.
- **Production Build**: Successfully compiled and optimized across all 17 App Router pages.
