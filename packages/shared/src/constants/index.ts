/**
 * Supported blockchain networks across the platform.
 */
export enum ChainId {
  ETHEREUM = 1,
  BASE = 8453,
  ARBITRUM = 42161,
  OPTIMISM = 10,
  POLYGON = 137,
  BNB = 56,
  AVALANCHE = 43114,
  SOLANA = -1,
}

/**
 * Chain metadata for UI and API responses.
 */
export interface ChainInfo {
  id: ChainId;
  name: string;
  slug: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  explorerUrl: string;
  isEvm: boolean;
  isActive: boolean;
}

/**
 * Supported chains configuration.
 */
export const SUPPORTED_CHAINS: ChainInfo[] = [
  {
    id: ChainId.ETHEREUM,
    name: 'Ethereum',
    slug: 'ethereum',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    explorerUrl: 'https://etherscan.io',
    isEvm: true,
    isActive: true,
  },
  {
    id: ChainId.BASE,
    name: 'Base',
    slug: 'base',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    explorerUrl: 'https://basescan.org',
    isEvm: true,
    isActive: true,
  },
  {
    id: ChainId.ARBITRUM,
    name: 'Arbitrum',
    slug: 'arbitrum',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    explorerUrl: 'https://arbiscan.io',
    isEvm: true,
    isActive: true,
  },
  {
    id: ChainId.OPTIMISM,
    name: 'Optimism',
    slug: 'optimism',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    explorerUrl: 'https://optimistic.etherscan.io',
    isEvm: true,
    isActive: true,
  },
  {
    id: ChainId.POLYGON,
    name: 'Polygon',
    slug: 'polygon',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    explorerUrl: 'https://polygonscan.com',
    isEvm: true,
    isActive: true,
  },
  {
    id: ChainId.BNB,
    name: 'BNB Chain',
    slug: 'bnb',
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    explorerUrl: 'https://bscscan.com',
    isEvm: true,
    isActive: true,
  },
  {
    id: ChainId.AVALANCHE,
    name: 'Avalanche',
    slug: 'avalanche',
    nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
    explorerUrl: 'https://snowtrace.io',
    isEvm: true,
    isActive: true,
  },
  {
    id: ChainId.SOLANA,
    name: 'Solana',
    slug: 'solana',
    nativeCurrency: { name: 'SOL', symbol: 'SOL', decimals: 9 },
    explorerUrl: 'https://solscan.io',
    isEvm: false,
    isActive: true,
  },
];

/** API version prefix */
export const API_VERSION = 'v1';

/** Default pagination limits */
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

/** Cache TTL in seconds */
export const CACHE_TTL = {
  WALLET_OVERVIEW: 300,
  PORTFOLIO: 120,
  TRANSACTIONS: 60,
  NFT: 300,
  AIRDROP: 600,
  RISK: 300,
} as const;

/** Risk score thresholds */
export const RISK_THRESHOLDS = {
  LOW: 30,
  MEDIUM: 60,
  HIGH: 80,
} as const;

/** Airdrop eligibility weights */
export const AIRDROP_WEIGHTS = {
  WALLET_AGE: 0.15,
  TX_COUNT: 0.1,
  BRIDGE_USAGE: 0.15,
  L2_USAGE: 0.15,
  NFT_OWNERSHIP: 0.1,
  GAS_USAGE: 0.05,
  DEFI_ACTIVITY: 0.15,
  PROTOCOL_DIVERSITY: 0.1,
  VOLUME: 0.05,
} as const;
