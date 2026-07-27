import { Injectable, BadRequestException } from '@nestjs/common';
import {
  ChainId,
  CACHE_TTL,
  detectChain,
  isValidWalletAddress,
  normalizeAddress,
} from '@web3-intelligence/shared';
import { getAirdropEligibilityService } from '@web3-intelligence/blockchain';
import { RedisService } from '@/infrastructure/cache/redis.service';
import type { AirdropEligibility } from '@web3-intelligence/shared';

/**
 * Application service for airdrop eligibility analysis.
 */
@Injectable()
export class AirdropService {
  private airdropService = getAirdropEligibilityService();

  constructor(private readonly redis: RedisService) {}

  /**
   * Analyzes wallet for airdrop eligibility across multiple factors.
   */
  async analyzeEligibility(address: string, chainId?: ChainId): Promise<AirdropEligibility> {
    if (!isValidWalletAddress(address)) {
      throw new BadRequestException('Invalid wallet address');
    }

    const normalized = normalizeAddress(address);
    const resolvedChainId = chainId ?? detectChain(normalized);
    const cacheKey = `airdrop:${normalized}:${resolvedChainId}`;

    return this.redis.getOrSet(
      cacheKey,
      () => this.airdropService.analyzeEligibility(normalized, resolvedChainId),
      CACHE_TTL.AIRDROP,
    );
  }
}
