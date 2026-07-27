import { Injectable, BadRequestException } from '@nestjs/common';
import { ChainId, CACHE_TTL, detectChain, isValidWalletAddress, normalizeAddress } from '@web3-intelligence/shared';
import { getWalletDataService } from '@web3-intelligence/blockchain';
import { RedisService } from '@/infrastructure/cache/redis.service';
import type { PortfolioSummary } from '@web3-intelligence/shared';

/**
 * Application service for portfolio tracking and token balance operations.
 */
@Injectable()
export class PortfolioService {
  private walletDataService = getWalletDataService();

  constructor(private readonly redis: RedisService) {}

  /**
   * Gets portfolio summary including token balances and chain breakdown.
   */
  async getPortfolio(address: string, chainId?: ChainId): Promise<PortfolioSummary> {
    if (!isValidWalletAddress(address)) {
      throw new BadRequestException('Invalid wallet address');
    }

    const normalized = normalizeAddress(address);
    const resolvedChainId = chainId ?? detectChain(normalized);
    const cacheKey = `portfolio:${normalized}:${resolvedChainId}`;

    return this.redis.getOrSet(
      cacheKey,
      async () => {
        const tokens = await this.walletDataService.getTokenBalances(normalized, resolvedChainId);
        const totalValueUsd = tokens.reduce((sum, t) => sum + (t.valueUsd ?? 0), 0);
        const topAssets = [...tokens].sort((a, b) => (b.valueUsd ?? 0) - (a.valueUsd ?? 0)).slice(0, 5);

        return {
          totalValueUsd,
          change24h: 0,
          change24hPercent: 0,
          tokens,
          topAssets,
          chainBreakdown: [
            {
              chainId: resolvedChainId,
              chainName: 'Current Chain',
              valueUsd: totalValueUsd,
              percentage: 100,
            },
          ],
        };
      },
      CACHE_TTL.PORTFOLIO,
    );
  }
}
