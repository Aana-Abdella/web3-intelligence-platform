import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/database/prisma.service';
import { ChainSlug } from '@prisma/client';

/**
 * Repository layer for wallet persistence operations.
 */
@Injectable()
export class WalletRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByAddress(address: string, chain: ChainSlug) {
    return this.prisma.wallet.findUnique({
      where: { address_chain: { address: address.toLowerCase(), chain } },
    });
  }

  async upsert(data: {
    address: string;
    chain: ChainSlug;
    ensName?: string;
    portfolioValueUsd: number;
    walletAgeDays: number;
    tokenCount: number;
    nftCount: number;
    riskScore: number;
    reputationScore: number;
    transactionCount: number;
    totalGasSpentUsd: number;
    firstActivityAt?: Date | null;
    lastActivityAt?: Date | null;
    labels: string[];
    isWhale: boolean;
  }) {
    return this.prisma.wallet.upsert({
      where: {
        address_chain: { address: data.address.toLowerCase(), chain: data.chain },
      },
      update: { ...data, lastSyncedAt: new Date() },
      create: { ...data, lastSyncedAt: new Date() },
    });
  }

  async saveRecentSearch(address: string, chain: ChainSlug, userId?: string) {
    return this.prisma.recentSearch.create({
      data: { address: address.toLowerCase(), chain, userId },
    });
  }

  async getRecentSearches(userId?: string, limit = 10) {
    return this.prisma.recentSearch.findMany({
      where: userId ? { userId } : {},
      orderBy: { searchedAt: 'desc' },
      take: limit,
    });
  }
}
