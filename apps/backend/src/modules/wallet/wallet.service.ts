import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ChainId, CACHE_TTL, detectChain, isValidWalletAddress, normalizeAddress } from '@web3-intelligence/shared';
import { getWalletDataService } from '@web3-intelligence/blockchain';
import { WalletRepository } from './wallet.repository';
import { RedisService } from '@/infrastructure/cache/redis.service';
import { ChainSlug } from '@prisma/client';

const CHAIN_ID_TO_SLUG: Record<number, ChainSlug> = {
  [ChainId.ETHEREUM]: 'ETHEREUM',
  [ChainId.BASE]: 'BASE',
  [ChainId.ARBITRUM]: 'ARBITRUM',
  [ChainId.OPTIMISM]: 'OPTIMISM',
  [ChainId.POLYGON]: 'POLYGON',
  [ChainId.BNB]: 'BNB',
  [ChainId.AVALANCHE]: 'AVALANCHE',
  [ChainId.SOLANA]: 'SOLANA',
};

/**
 * Application service for wallet analytics and search operations.
 */
@Injectable()
export class WalletService {
  private walletDataService = getWalletDataService();

  constructor(
    private readonly walletRepo: WalletRepository,
    private readonly redis: RedisService,
  ) {}

  /**
   * Searches and validates a wallet address, returning overview data.
   */
  async searchWallet(address: string, chainId?: ChainId, refresh = false) {
    if (!isValidWalletAddress(address)) {
      throw new BadRequestException('Invalid wallet address format');
    }

    const normalized = normalizeAddress(address);
    const resolvedChainId = chainId ?? detectChain(normalized);
    const chainSlug = CHAIN_ID_TO_SLUG[resolvedChainId];

    if (!chainSlug) {
      throw new BadRequestException('Unsupported chain');
    }

    const cacheKey = `wallet:overview:${normalized}:${resolvedChainId}`;

    if (!refresh) {
      const cached = await this.redis.get(cacheKey);
      if (cached) return cached;
    }

    const overview = await this.walletDataService.getWalletOverview(normalized, resolvedChainId);

    await this.walletRepo.upsert({
      address: normalized,
      chain: chainSlug,
      ensName: overview.ensName,
      portfolioValueUsd: overview.portfolioValueUsd,
      walletAgeDays: overview.walletAgeDays,
      tokenCount: overview.tokenCount,
      nftCount: overview.nftCount,
      riskScore: overview.riskScore,
      reputationScore: overview.reputationScore,
      transactionCount: overview.transactionCount,
      totalGasSpentUsd: overview.totalGasSpentUsd,
      firstActivityAt: overview.firstActivityAt,
      lastActivityAt: overview.lastActivityAt,
      labels: overview.labels,
      isWhale: overview.isWhale,
    });

    await this.walletRepo.saveRecentSearch(normalized, chainSlug);
    await this.redis.set(cacheKey, overview, CACHE_TTL.WALLET_OVERVIEW);

    return overview;
  }

  /**
   * Gets wallet overview by address (from cache or chain).
   */
  async getOverview(address: string, chainId?: ChainId, refresh = false) {
    return this.searchWallet(address, chainId, refresh);
  }

  /**
   * Returns recent wallet searches.
   */
  async getRecentSearches(userId?: string) {
    const searches = await this.walletRepo.getRecentSearches(userId);
    return searches.map((s) => ({
      address: s.address,
      chainId: ChainId[s.chain as keyof typeof ChainId] ?? ChainId.ETHEREUM,
      searchedAt: s.searchedAt,
    }));
  }
}
