import { ChainId, SUPPORTED_CHAINS } from '../constants/index.js';

/**
 * Checks if a string is a valid EVM address.
 */
export function isEvmAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Checks if a string is a valid Solana address.
 */
export function isSolanaAddress(address: string): boolean {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
}

/**
 * Validates a wallet address (EVM or Solana).
 */
export function isValidWalletAddress(address: string): boolean {
  return isEvmAddress(address) || isSolanaAddress(address);
}

/**
 * Normalizes an EVM address to checksum format (lowercase for storage).
 */
export function normalizeAddress(address: string): string {
  if (isEvmAddress(address)) {
    return address.toLowerCase();
  }
  return address;
}

/**
 * Auto-detects the likely chain for an address.
 * EVM addresses default to Ethereum; Solana addresses map to Solana chain.
 */
export function detectChain(address: string): ChainId {
  if (isSolanaAddress(address)) {
    return ChainId.SOLANA;
  }
  return ChainId.ETHEREUM;
}

/**
 * Gets chain info by chain ID.
 */
export function getChainInfo(chainId: ChainId) {
  return SUPPORTED_CHAINS.find((c) => c.id === chainId);
}

/**
 * Gets chain info by slug.
 */
export function getChainBySlug(slug: string) {
  return SUPPORTED_CHAINS.find((c) => c.slug === slug);
}

/**
 * Formats a USD value for display.
 */
export function formatUsd(value: number, decimals = 2): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Formats a large number with abbreviations (K, M, B).
 */
export function formatCompact(value: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Formats a percentage value.
 */
export function formatPercent(value: number, decimals = 2): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(decimals)}%`;
}

/**
 * Truncates an address for display.
 */
export function truncateAddress(address: string, start = 6, end = 4): string {
  if (address.length <= start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

/**
 * Calculates risk level from score (0-100).
 */
export function getRiskLevel(score: number): 'low' | 'medium' | 'high' | 'critical' {
  if (score <= 30) return 'low';
  if (score <= 60) return 'medium';
  if (score <= 80) return 'high';
  return 'critical';
}

/**
 * Calculates airdrop eligibility level from score (0-100).
 */
export function getAirdropLevel(score: number): 'low' | 'medium' | 'high' | 'excellent' {
  if (score <= 25) return 'low';
  if (score <= 50) return 'medium';
  if (score <= 75) return 'high';
  return 'excellent';
}

/**
 * Builds explorer URL for an address on a given chain.
 */
export function getExplorerAddressUrl(chainId: ChainId, address: string): string {
  const chain = getChainInfo(chainId);
  if (!chain) return '#';
  return `${chain.explorerUrl}/address/${address}`;
}

/**
 * Builds explorer URL for a transaction hash.
 */
export function getExplorerTxUrl(chainId: ChainId, hash: string): string {
  const chain = getChainInfo(chainId);
  if (!chain) return '#';
  return `${chain.explorerUrl}/tx/${hash}`;
}

/**
 * Calculates pagination metadata.
 */
export function buildPaginationMeta(page: number, limit: number, total: number) {
  const totalPages = Math.ceil(total / limit);
  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

/**
 * Sleep utility for rate limiting.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
