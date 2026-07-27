import type { ChainId, TokenBalance, WalletOverview } from '@web3-intelligence/shared';
import { getChainInfo } from '@web3-intelligence/shared';
import { formatEther } from 'viem';
import { getBlockchainFactory } from './client.factory.js';

/**
 * Service for fetching wallet data from on-chain sources.
 * Integrates with viem clients and external APIs (Alchemy, Etherscan).
 */
export class WalletDataService {
  private factory = getBlockchainFactory();

  /**
   * Fetches a comprehensive wallet overview for dashboard display.
   */
  async getWalletOverview(address: string, chainId: ChainId): Promise<WalletOverview> {
    const normalizedAddress = address.toLowerCase() as `0x${string}`;

    const [balance, txCount, firstActivity] = await Promise.all([
      this.factory.getNativeBalance(chainId, normalizedAddress),
      this.factory.getTransactionCount(chainId, normalizedAddress),
      this.factory.getFirstActivityTimestamp(chainId, normalizedAddress),
    ]);

    const balanceEth = parseFloat(formatEther(balance));
    const ethPriceUsd = 3500; // TODO: integrate CoinGecko price feed
    const portfolioValueUsd = balanceEth * ethPriceUsd;

    const walletAgeDays = firstActivity
      ? Math.floor((Date.now() - firstActivity.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

    const riskScore = this.calculateRiskScore(txCount, walletAgeDays);
    const reputationScore = this.calculateReputationScore(txCount, walletAgeDays, portfolioValueUsd);

    return {
      address: normalizedAddress,
      chainId,
      portfolioValueUsd,
      walletAgeDays,
      tokenCount: 1, // Native token; expand with token API
      nftCount: 0,
      riskScore,
      reputationScore,
      transactionCount: txCount,
      totalGasSpentUsd: txCount * 5, // Estimated; integrate gas analytics
      firstActivityAt: firstActivity,
      lastActivityAt: new Date(),
      labels: this.generateLabels(portfolioValueUsd, txCount, walletAgeDays),
      isWhale: portfolioValueUsd >= 1_000_000,
    };
  }

  /**
   * Fetches token balances for a wallet.
   * Production: integrate Alchemy/Moralis token APIs.
   */
  async getTokenBalances(address: string, chainId: ChainId): Promise<TokenBalance[]> {
    const normalizedAddress = address.toLowerCase() as `0x${string}`;
    const chain = getChainInfo(chainId);
    if (!chain) return [];

    const balance = await this.factory.getNativeBalance(chainId, normalizedAddress);
    const balanceFormatted = parseFloat(formatEther(balance));
    const ethPriceUsd = 3500;

    return [
      {
        contractAddress: null,
        symbol: chain.nativeCurrency.symbol,
        name: chain.nativeCurrency.name,
        decimals: chain.nativeCurrency.decimals,
        balance: balance.toString(),
        balanceFormatted,
        priceUsd: ethPriceUsd,
        valueUsd: balanceFormatted * ethPriceUsd,
        chainId,
      },
    ];
  }

  /**
   * Calculates a basic risk score based on wallet activity.
   */
  private calculateRiskScore(txCount: number, walletAgeDays: number): number {
    let score = 20; // Base low risk

    if (walletAgeDays < 30) score += 30;
    else if (walletAgeDays < 90) score += 15;

    if (txCount === 0) score += 20;
    else if (txCount < 5) score += 10;

    return Math.min(score, 100);
  }

  /**
   * Calculates reputation score based on wallet history and value.
   */
  private calculateReputationScore(
    txCount: number,
    walletAgeDays: number,
    portfolioValueUsd: number,
  ): number {
    let score = 50;

    if (walletAgeDays > 365) score += 20;
    else if (walletAgeDays > 180) score += 10;

    if (txCount > 100) score += 15;
    else if (txCount > 50) score += 10;
    else if (txCount > 10) score += 5;

    if (portfolioValueUsd > 100_000) score += 15;
    else if (portfolioValueUsd > 10_000) score += 10;

    return Math.min(score, 100);
  }

  /**
   * Generates descriptive labels for a wallet.
   */
  private generateLabels(
    portfolioValueUsd: number,
    txCount: number,
    walletAgeDays: number,
  ): string[] {
    const labels: string[] = [];

    if (portfolioValueUsd >= 1_000_000) labels.push('Whale');
    else if (portfolioValueUsd >= 100_000) labels.push('High Value');

    if (walletAgeDays > 365) labels.push('OG Wallet');
    if (txCount > 500) labels.push('Active Trader');
    if (txCount > 0 && txCount < 5) labels.push('New Wallet');

    return labels;
  }
}

/** Singleton wallet data service */
let walletDataService: WalletDataService | null = null;

export function getWalletDataService(): WalletDataService {
  if (!walletDataService) {
    walletDataService = new WalletDataService();
  }
  return walletDataService;
}
