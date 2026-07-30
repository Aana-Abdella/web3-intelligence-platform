import { ChainId } from '../constants/index.js';

/** Paginated API response wrapper */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/** Pagination metadata */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/** Standard API error response */
export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  error?: string;
  timestamp: string;
  path?: string;
}

/** Wallet address with chain context */
export interface WalletAddress {
  address: string;
  chainId: ChainId;
  ensName?: string;
}

/** Token balance representation */
export interface TokenBalance {
  contractAddress: string | null;
  symbol: string;
  name: string;
  decimals: number;
  balance: string;
  balanceFormatted: number;
  priceUsd: number | null;
  valueUsd: number | null;
  logoUrl?: string;
  chainId: ChainId;
}

/** NFT asset representation */
export interface NftAsset {
  tokenId: string;
  contractAddress: string;
  name: string;
  description?: string;
  imageUrl?: string;
  collectionName: string;
  floorPriceUsd?: number;
  estimatedValueUsd?: number;
  traits?: NftTrait[];
  chainId: ChainId;
}

/** NFT trait metadata */
export interface NftTrait {
  traitType: string;
  value: string;
  rarity?: number;
}

/** Transaction summary */
export interface TransactionSummary {
  hash: string;
  from: string;
  to: string | null;
  value: string;
  valueFormatted: number;
  timestamp: Date;
  blockNumber: number;
  status: 'success' | 'failed' | 'pending';
  gasUsed: string;
  gasPrice: string;
  gasCostUsd: number | null;
  method?: string;
  chainId: ChainId;
}

/** Wallet overview dashboard data */
export interface WalletOverview {
  address: string;
  chainId: ChainId;
  ensName?: string;
  portfolioValueUsd: number;
  walletAgeDays: number;
  tokenCount: number;
  nftCount: number;
  riskScore: number;
  reputationScore: number;
  transactionCount: number;
  totalGasSpentUsd: number;
  firstActivityAt: Date | null;
  lastActivityAt: Date | null;
  labels: string[];
  isWhale: boolean;
}

/** Portfolio summary */
export interface PortfolioSummary {
  totalValueUsd: number;
  change24h: number;
  change24hPercent: number;
  tokens: TokenBalance[];
  topAssets: TokenBalance[];
  chainBreakdown: ChainValueBreakdown[];
}

/** Value breakdown by chain */
export interface ChainValueBreakdown {
  chainId: ChainId;
  chainName: string;
  valueUsd: number;
  percentage: number;
}

/** Risk analysis result */
export interface RiskAnalysis {
  score: number;
  level: 'low' | 'medium' | 'high' | 'critical';
  flags: RiskFlag[];
  recommendations: string[];
  approvalRisks: ApprovalRisk[];
  lastAnalyzedAt: Date;
}

/** Individual risk flag */
export interface RiskFlag {
  type: string;
  severity: 'info' | 'warning' | 'danger';
  title: string;
  description: string;
  relatedAddress?: string;
}

/** Token approval risk */
export interface ApprovalRisk {
  tokenSymbol: string;
  spenderAddress: string;
  spenderName?: string;
  allowance: string;
  riskLevel: 'low' | 'medium' | 'high';
}

/** Airdrop eligibility analysis */
export interface AirdropEligibility {
  score: number;
  level: 'low' | 'medium' | 'high' | 'excellent';
  factors: AirdropFactor[];
  suggestions: string[];
  potentialCampaigns: PotentialCampaign[];
}

/** Individual airdrop eligibility factor */
export interface AirdropFactor {
  name: string;
  score: number;
  maxScore: number;
  weight: number;
  description: string;
}

/** Potential airdrop campaign match */
export interface PotentialCampaign {
  name: string;
  protocol: string;
  likelihood: 'low' | 'medium' | 'high';
  requirements: string[];
  url?: string;
}

/** AI-generated wallet insight */
export interface AiInsight {
  summary: string;
  behaviorAnalysis: string;
  spendingPatterns: string;
  investmentDiversity: string;
  riskAssessment: string;
  recommendations: string[];
  generatedAt: Date;
}

/** DeFi position */
export interface DefiPosition {
  protocol: string;
  type: 'lending' | 'borrowing' | 'staking' | 'farming' | 'liquidity';
  asset: string;
  amount: number;
  valueUsd: number;
  apy?: number;
  chainId: ChainId;
}

/** Gas analytics summary */
export interface GasAnalytics {
  totalSpentUsd: number;
  averageGasPrice: number;
  totalTransactions: number;
  dailyAverage: number;
  monthlyTrend: GasTrendPoint[];
  topSpendingDays: GasTrendPoint[];
}

/** Gas trend data point */
export interface GasTrendPoint {
  date: string;
  gasSpentUsd: number;
  transactionCount: number;
}

/** Wallet comparison result */
export interface WalletComparison {
  wallets: WalletOverview[];
  metrics: ComparisonMetric[];
}

/** Comparison metric between wallets */
export interface ComparisonMetric {
  name: string;
  values: Record<string, number | string>;
  winner?: string;
}

/** User profile */
export interface UserProfile {
  id: string;
  walletAddress: string;
  ensName?: string;
  email?: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

/** Bookmarked wallet */
export interface BookmarkedWallet {
  id: string;
  address: string;
  chainId: ChainId;
  label?: string;
  notes?: string;
  createdAt: Date;
}

/** Recent search entry */
export interface RecentSearch {
  address: string;
  chainId: ChainId;
  searchedAt: Date;
}

/** Featured task category for airdrop eligibility actions */
export type TaskCategory =
  | 'bridge'
  | 'dex'
  | 'lending'
  | 'nft'
  | 'governance'
  | 'staking'
  | 'social';

/** Task difficulty level */
export type TaskDifficulty = 'easy' | 'medium' | 'hard';

/** Task completion status */
export type TaskStatus = 'not_started' | 'in_progress' | 'completed';

/** Sort options for featured tasks */
export type TaskSortOption =
  | 'recommended'
  | 'highest_reward'
  | 'easiest'
  | 'fastest'
  | 'newest';

/** Featured task for airdrop eligibility improvement */
export interface FeaturedTask {
  id: string;
  title: string;
  description: string;
  protocol: string;
  blockchain: string;
  category: TaskCategory;
  difficulty: TaskDifficulty;
  estimatedTime: string;
  estimatedEligibilityBoost: number;
  status: TaskStatus;
  progress: number;
  rewardBadge: string;
  icon: string;
  tags: string[];
  ctaLabel: string;
  secondaryCtaLabel?: string;
  guideUrl?: string;
  isNew?: boolean;
  createdAt: string;
}

/** Category progress for airdrop readiness */
export interface CategoryProgress {
  category: TaskCategory;
  label: string;
  progress: number;
}

/** Airdrop readiness overview */
export interface AirdropReadiness {
  overallScore: number;
  level: 'low' | 'medium' | 'high' | 'excellent';
  categoryBreakdown: CategoryProgress[];
}

/** Achievement for gamification */
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: 'locked' | 'unlocked' | 'in_progress';
  progress: number;
  maxProgress: number;
  unlockedAt?: string;
  category: TaskCategory | 'general';
}

/** Daily rotating task */
export interface DailyTask {
  id: string;
  title: string;
  description: string;
  category: TaskCategory | 'general';
  reward: string;
  progress: number;
  target: number;
  completed: boolean;
}

/** Weekly mission */
export interface WeeklyMission {
  id: string;
  title: string;
  description: string;
  category: TaskCategory | 'general';
  reward: string;
  progress: number;
  target: number;
  deadline: string;
  completed: boolean;
}

/** Trending airdrop campaign */
export interface TrendingCampaign {
  id: string;
  project: string;
  chain: string;
  difficulty: TaskDifficulty;
  estimatedOpportunity: string;
  deadline?: string;
  risk: 'low' | 'medium' | 'high';
  popularity: number;
  description: string;
  url?: string;
}

/** Wallet activity profile for recommendations */
export interface WalletActivityProfile {
  transactionCount: number;
  bridgeActivity: boolean;
  lendingActivity: boolean;
  nftActivity: boolean;
  walletAgeDays: number;
  dexActivity: boolean;
  governanceActivity: boolean;
  stakingActivity: boolean;
}

/** Personalized task recommendation */
export interface TaskRecommendation {
  taskId: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  isInformational?: boolean;
}
