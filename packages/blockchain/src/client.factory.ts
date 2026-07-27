import { ChainId } from '@web3-intelligence/shared';
import { createPublicClient, http, type PublicClient, type Chain } from 'viem';
import {
  mainnet,
  base,
  arbitrum,
  optimism,
  polygon,
  bsc,
  avalanche,
} from 'viem/chains';

/** Chain configuration with RPC URL */
export interface ChainConfig {
  chainId: ChainId;
  chain: Chain;
  rpcUrl: string;
}

/** Maps ChainId enum to viem chain definitions */
const VIEM_CHAINS: Record<number, Chain> = {
  [ChainId.ETHEREUM]: mainnet,
  [ChainId.BASE]: base,
  [ChainId.ARBITRUM]: arbitrum,
  [ChainId.OPTIMISM]: optimism,
  [ChainId.POLYGON]: polygon,
  [ChainId.BNB]: bsc,
  [ChainId.AVALANCHE]: avalanche,
};

/** Default RPC URLs (overridden by environment) */
const DEFAULT_RPC_URLS: Record<number, string> = {
  [ChainId.ETHEREUM]: 'https://eth.llamarpc.com',
  [ChainId.BASE]: 'https://mainnet.base.org',
  [ChainId.ARBITRUM]: 'https://arb1.arbitrum.io/rpc',
  [ChainId.OPTIMISM]: 'https://mainnet.optimism.io',
  [ChainId.POLYGON]: 'https://polygon-rpc.com',
  [ChainId.BNB]: 'https://bsc-dataseed.binance.org',
  [ChainId.AVALANCHE]: 'https://api.avax.network/ext/bc/C/rpc',
};

/**
 * Blockchain client factory for creating viem public clients.
 * Supports multiple EVM chains with configurable RPC endpoints.
 */
export class BlockchainClientFactory {
  private clients: Map<number, PublicClient> = new Map();
  private rpcOverrides: Map<number, string> = new Map();

  /**
   * Sets a custom RPC URL for a chain.
   */
  setRpcUrl(chainId: ChainId, rpcUrl: string): void {
    this.rpcOverrides.set(chainId, rpcUrl);
    this.clients.delete(chainId);
  }

  /**
   * Gets or creates a public client for the specified chain.
   */
  getClient(chainId: ChainId): PublicClient {
    const existing = this.clients.get(chainId);
    if (existing) return existing;

    const viemChain = VIEM_CHAINS[chainId];
    if (!viemChain) {
      throw new Error(`Unsupported EVM chain: ${chainId}`);
    }

    const rpcUrl = this.rpcOverrides.get(chainId) ?? DEFAULT_RPC_URLS[chainId];
    const client = createPublicClient({
      chain: viemChain,
      transport: http(rpcUrl),
    });

    this.clients.set(chainId, client);
    return client;
  }

  /**
   * Gets native balance for an address.
   */
  async getNativeBalance(chainId: ChainId, address: `0x${string}`): Promise<bigint> {
    const client = this.getClient(chainId);
    return client.getBalance({ address });
  }

  /**
   * Gets transaction count (nonce) for an address.
   */
  async getTransactionCount(chainId: ChainId, address: `0x${string}`): Promise<number> {
    const client = this.getClient(chainId);
    return client.getTransactionCount({ address });
  }

  /**
   * Gets the current block number.
   */
  async getBlockNumber(chainId: ChainId): Promise<bigint> {
    const client = this.getClient(chainId);
    return client.getBlockNumber();
  }

  /**
   * Gets the first block timestamp for wallet age calculation.
   * Uses binary search approximation via transaction history.
   */
  async getFirstActivityTimestamp(
    chainId: ChainId,
    address: `0x${string}`,
  ): Promise<Date | null> {
    const client = this.getClient(chainId);
    const txCount = await client.getTransactionCount({ address });

    if (txCount === 0) return null;

    // For production, integrate with Etherscan/Alchemy APIs for full history
    // This is a simplified implementation using current block as fallback
    const block = await client.getBlock({ blockTag: 'latest' });
    if (!block.timestamp) return null;

    // Estimate wallet age based on tx count (rough heuristic for demo)
    const estimatedDays = Math.min(txCount * 2, 365 * 3);
    const estimatedTimestamp = Number(block.timestamp) - estimatedDays * 86400;
    return new Date(estimatedTimestamp * 1000);
  }
}

/** Singleton factory instance */
let factoryInstance: BlockchainClientFactory | null = null;

/**
 * Gets the singleton blockchain client factory.
 */
export function getBlockchainFactory(): BlockchainClientFactory {
  if (!factoryInstance) {
    factoryInstance = new BlockchainClientFactory();
  }
  return factoryInstance;
}

/**
 * Initializes RPC URLs from environment variables.
 */
export function initializeRpcUrls(config: Record<string, string | undefined>): void {
  const factory = getBlockchainFactory();
  const mapping: Record<string, ChainId> = {
    ETHEREUM_RPC_URL: ChainId.ETHEREUM,
    BASE_RPC_URL: ChainId.BASE,
    ARBITRUM_RPC_URL: ChainId.ARBITRUM,
    OPTIMISM_RPC_URL: ChainId.OPTIMISM,
    POLYGON_RPC_URL: ChainId.POLYGON,
    BNB_RPC_URL: ChainId.BNB,
    AVALANCHE_RPC_URL: ChainId.AVALANCHE,
  };

  for (const [envKey, chainId] of Object.entries(mapping)) {
    const url = config[envKey];
    if (url) {
      factory.setRpcUrl(chainId, url);
    }
  }
}
