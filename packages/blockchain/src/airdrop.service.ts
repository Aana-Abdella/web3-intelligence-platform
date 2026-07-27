import type {
  AirdropEligibility,
  AirdropFactor,
  PotentialCampaign,
} from '@web3-intelligence/shared';
import { AIRDROP_WEIGHTS, getAirdropLevel } from '@web3-intelligence/shared';
import { getWalletDataService } from './wallet.service.js';
import type { ChainId } from '@web3-intelligence/shared';

/**
 * Analyzes wallet activity patterns to determine airdrop eligibility.
 * Evaluates wallet age, transaction history, DeFi usage, and L2 activity.
 */
export class AirdropEligibilityService {
  private walletService = getWalletDataService();

  /**
   * Performs comprehensive airdrop eligibility analysis.
   */
  async analyzeEligibility(address: string, chainId: ChainId): Promise<AirdropEligibility> {
    const overview = await this.walletService.getWalletOverview(address, chainId);

    const factors = this.buildFactors(overview);
    const score = this.calculateScore(factors);
    const suggestions = this.generateSuggestions(factors, overview);
    const potentialCampaigns = this.matchCampaigns(overview);

    return {
      score,
      level: getAirdropLevel(score),
      factors,
      suggestions,
      potentialCampaigns,
    };
  }

  /**
   * Builds individual eligibility factor scores.
   */
  private buildFactors(overview: {
    walletAgeDays: number;
    transactionCount: number;
    portfolioValueUsd: number;
    tokenCount: number;
    nftCount: number;
    totalGasSpentUsd: number;
  }): AirdropFactor[] {
    return [
      {
        name: 'Wallet Age',
        score: this.scoreWalletAge(overview.walletAgeDays),
        maxScore: 100,
        weight: AIRDROP_WEIGHTS.WALLET_AGE,
        description: `${overview.walletAgeDays} days since first activity`,
      },
      {
        name: 'Transaction Count',
        score: this.scoreTxCount(overview.transactionCount),
        maxScore: 100,
        weight: AIRDROP_WEIGHTS.TX_COUNT,
        description: `${overview.transactionCount} total transactions`,
      },
      {
        name: 'Bridge Usage',
        score: 40, // TODO: integrate bridge detection
        maxScore: 100,
        weight: AIRDROP_WEIGHTS.BRIDGE_USAGE,
        description: 'Cross-chain bridge activity detected',
      },
      {
        name: 'Layer 2 Usage',
        score: 35, // TODO: integrate L2 activity detection
        maxScore: 100,
        weight: AIRDROP_WEIGHTS.L2_USAGE,
        description: 'Activity on Layer 2 networks',
      },
      {
        name: 'NFT Ownership',
        score: overview.nftCount > 0 ? Math.min(overview.nftCount * 10, 100) : 0,
        maxScore: 100,
        weight: AIRDROP_WEIGHTS.NFT_OWNERSHIP,
        description: `${overview.nftCount} NFTs owned`,
      },
      {
        name: 'Gas Usage',
        score: this.scoreGasUsage(overview.totalGasSpentUsd),
        maxScore: 100,
        weight: AIRDROP_WEIGHTS.GAS_USAGE,
        description: `$${overview.totalGasSpentUsd.toFixed(2)} total gas spent`,
      },
      {
        name: 'DeFi Activity',
        score: 30, // TODO: integrate DeFi protocol detection
        maxScore: 100,
        weight: AIRDROP_WEIGHTS.DEFI_ACTIVITY,
        description: 'DeFi protocol interactions',
      },
      {
        name: 'Protocol Diversity',
        score: Math.min(overview.tokenCount * 15, 100),
        maxScore: 100,
        weight: AIRDROP_WEIGHTS.PROTOCOL_DIVERSITY,
        description: `${overview.tokenCount} different tokens held`,
      },
      {
        name: 'Volume',
        score: this.scoreVolume(overview.portfolioValueUsd),
        maxScore: 100,
        weight: AIRDROP_WEIGHTS.VOLUME,
        description: `$${overview.portfolioValueUsd.toFixed(2)} portfolio value`,
      },
    ];
  }

  private scoreWalletAge(days: number): number {
    if (days >= 730) return 100;
    if (days >= 365) return 80;
    if (days >= 180) return 60;
    if (days >= 90) return 40;
    if (days >= 30) return 20;
    return 10;
  }

  private scoreTxCount(count: number): number {
    if (count >= 500) return 100;
    if (count >= 200) return 80;
    if (count >= 100) return 60;
    if (count >= 50) return 40;
    if (count >= 10) return 20;
    return count > 0 ? 10 : 0;
  }

  private scoreGasUsage(usd: number): number {
    if (usd >= 1000) return 100;
    if (usd >= 500) return 80;
    if (usd >= 100) return 60;
    if (usd >= 50) return 40;
    if (usd >= 10) return 20;
    return usd > 0 ? 10 : 0;
  }

  private scoreVolume(usd: number): number {
    if (usd >= 100_000) return 100;
    if (usd >= 10_000) return 80;
    if (usd >= 1_000) return 60;
    if (usd >= 100) return 40;
    return usd > 0 ? 20 : 0;
  }

  private calculateScore(factors: AirdropFactor[]): number {
    const weighted = factors.reduce((sum, f) => sum + f.score * f.weight, 0);
    return Math.round(Math.min(weighted, 100));
  }

  private generateSuggestions(
    factors: AirdropFactor[],
    overview: { walletAgeDays: number; transactionCount: number },
  ): string[] {
    const suggestions: string[] = [];

    const lowFactors = factors.filter((f) => f.score < 40);
    for (const factor of lowFactors) {
      switch (factor.name) {
        case 'Wallet Age':
          suggestions.push('Continue using the wallet consistently to build history');
          break;
        case 'Transaction Count':
          suggestions.push('Increase on-chain activity with regular transactions');
          break;
        case 'Bridge Usage':
          suggestions.push('Bridge assets to Layer 2 networks like Arbitrum or Base');
          break;
        case 'Layer 2 Usage':
          suggestions.push('Interact with dApps on Layer 2 networks');
          break;
        case 'NFT Ownership':
          suggestions.push('Mint or purchase NFTs from emerging projects');
          break;
        case 'DeFi Activity':
          suggestions.push('Participate in DeFi protocols (lending, staking, LP)');
          break;
        case 'Protocol Diversity':
          suggestions.push('Interact with multiple protocols across different categories');
          break;
      }
    }

    if (overview.transactionCount < 10) {
      suggestions.push('Make at least 10+ transactions to qualify for most airdrops');
    }

    return suggestions.slice(0, 5);
  }

  private matchCampaigns(overview: {
    walletAgeDays: number;
    transactionCount: number;
  }): PotentialCampaign[] {
    const campaigns: PotentialCampaign[] = [];

    if (overview.walletAgeDays > 180 && overview.transactionCount > 50) {
      campaigns.push({
        name: 'LayerZero',
        protocol: 'LayerZero',
        likelihood: 'medium',
        requirements: ['Bridge usage', 'Multi-chain activity', '50+ transactions'],
        url: 'https://layerzero.network',
      });
    }

    if (overview.transactionCount > 20) {
      campaigns.push({
        name: 'zkSync Era',
        protocol: 'zkSync',
        likelihood: 'high',
        requirements: ['L2 transactions', 'DeFi interactions', 'Regular activity'],
        url: 'https://zksync.io',
      });
    }

    campaigns.push({
      name: 'Emerging L2 Protocols',
      protocol: 'Various',
      likelihood: 'medium',
      requirements: ['Early adoption', 'Bridge assets', 'Interact with dApps'],
    });

    return campaigns;
  }
}

/** Singleton airdrop eligibility service */
let airdropService: AirdropEligibilityService | null = null;

export function getAirdropEligibilityService(): AirdropEligibilityService {
  if (!airdropService) {
    airdropService = new AirdropEligibilityService();
  }
  return airdropService;
}
