import type {
  FeaturedTask,
  TaskCategory,
  TaskDifficulty,
  TaskRecommendation,
  TaskSortOption,
  TaskStatus,
  WalletActivityProfile,
} from '@web3-intelligence/shared';

export const TASK_CATEGORIES: { value: TaskCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'bridge', label: 'Bridge' },
  { value: 'dex', label: 'DEX' },
  { value: 'lending', label: 'Lending' },
  { value: 'nft', label: 'NFT' },
  { value: 'governance', label: 'Governance' },
  { value: 'staking', label: 'Staking' },
  { value: 'social', label: 'Social' },
];

export const SORT_OPTIONS: { value: TaskSortOption; label: string }[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'highest_reward', label: 'Highest Reward' },
  { value: 'easiest', label: 'Easiest' },
  { value: 'fastest', label: 'Fastest' },
  { value: 'newest', label: 'Newest' },
];

const DIFFICULTY_ORDER: Record<TaskDifficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

const TIME_ORDER: Record<string, number> = {
  '2–5': 1,
  '3–5': 1,
  '3–6': 2,
  '3–7': 2,
  '3–8': 2,
  '5–10': 3,
  '5–12': 3,
  '5–15': 4,
  '10–15': 5,
  '10–20': 6,
  '15–20': 7,
  '15–25': 8,
  '15–30': 9,
  '20–30': 10,
};

function getTimeSortValue(time: string): number {
  for (const [prefix, order] of Object.entries(TIME_ORDER)) {
    if (time.startsWith(prefix)) return order;
  }
  return 99;
}

export function filterTasks(
  tasks: FeaturedTask[],
  category: TaskCategory | 'all',
  query: string,
): FeaturedTask[] {
  const normalizedQuery = query.trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesCategory = category === 'all' || task.category === category;
    if (!matchesCategory) return false;

    if (!normalizedQuery) return true;

    const searchable = [
      task.title,
      task.description,
      task.protocol,
      task.blockchain,
      task.category,
      ...task.tags,
    ]
      .join(' ')
      .toLowerCase();

    return searchable.includes(normalizedQuery);
  });
}

export function sortTasks(tasks: FeaturedTask[], sortBy: TaskSortOption): FeaturedTask[] {
  const sorted = [...tasks];

  switch (sortBy) {
    case 'highest_reward':
      return sorted.sort((a, b) => b.estimatedEligibilityBoost - a.estimatedEligibilityBoost);
    case 'easiest':
      return sorted.sort(
        (a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty],
      );
    case 'fastest':
      return sorted.sort(
        (a, b) => getTimeSortValue(a.estimatedTime) - getTimeSortValue(b.estimatedTime),
      );
    case 'newest':
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    case 'recommended':
    default:
      return sorted.sort((a, b) => {
        const statusWeight = (status: TaskStatus) =>
          status === 'not_started' ? 3 : status === 'in_progress' ? 2 : 1;
        const score =
          statusWeight(b.status) * 10 +
          b.estimatedEligibilityBoost +
          (b.isNew ? 5 : 0) -
          DIFFICULTY_ORDER[b.difficulty];
        const scoreA =
          statusWeight(a.status) * 10 +
          a.estimatedEligibilityBoost +
          (a.isNew ? 5 : 0) -
          DIFFICULTY_ORDER[a.difficulty];
        return score - scoreA;
      });
  }
}

export function generateRecommendations(
  profile: WalletActivityProfile,
  tasks: FeaturedTask[],
): TaskRecommendation[] {
  const recommendations: TaskRecommendation[] = [];

  if (profile.walletAgeDays < 90) {
    recommendations.push({
      taskId: '',
      reason:
        'Your wallet is relatively new. Focus on building consistent, organic activity over time rather than rushing transactions.',
      priority: 'high',
      isInformational: true,
    });
  }

  if (profile.transactionCount < 50) {
    const swapTasks = tasks.filter(
      (t) => t.category === 'dex' && t.status !== 'completed',
    );
    if (swapTasks.length > 0) {
      recommendations.push({
        taskId: swapTasks[0].id,
        reason: `Low transaction count (${profile.transactionCount}). Regular DEX swaps demonstrate active wallet usage — a key airdrop eligibility signal.`,
        priority: 'high',
      });
    }
  }

  if (!profile.bridgeActivity) {
    const bridgeTasks = tasks.filter(
      (t) => t.category === 'bridge' && t.status !== 'completed',
    );
    if (bridgeTasks.length > 0) {
      recommendations.push({
        taskId: bridgeTasks[0].id,
        reason:
          'No bridge activity detected. Cross-chain bridging is one of the strongest signals for L2 and omnichain airdrops.',
        priority: 'high',
      });
    }
  }

  if (!profile.lendingActivity) {
    const lendingTask = tasks.find(
      (t) => t.protocol === 'Aave' && t.status !== 'completed',
    );
    if (lendingTask) {
      recommendations.push({
        taskId: lendingTask.id,
        reason:
          'No lending activity found. Supplying to Aave shows DeFi depth and sustained capital commitment.',
        priority: 'medium',
      });
    }
  }

  if (!profile.nftActivity) {
    const nftTask = tasks.find(
      (t) => t.category === 'nft' && t.title.toLowerCase().includes('mint') && t.status !== 'completed',
    );
    if (nftTask) {
      recommendations.push({
        taskId: nftTask.id,
        reason:
          'No NFT activity detected. Minting NFTs signals creator and collector engagement valued by many ecosystems.',
        priority: 'medium',
      });
    }
  }

  if (!profile.governanceActivity) {
    const govTask = tasks.find(
      (t) => t.category === 'governance' && t.status !== 'completed',
    );
    if (govTask) {
      recommendations.push({
        taskId: govTask.id,
        reason:
          'No governance participation yet. DAO voting history was rewarded in Optimism and other major airdrops.',
        priority: 'low',
      });
    }
  }

  return recommendations.slice(0, 4);
}

export function getDifficultyColor(difficulty: TaskDifficulty): string {
  switch (difficulty) {
    case 'easy':
      return 'border-success/30 bg-success/10 text-success';
    case 'medium':
      return 'border-warning/30 bg-warning/10 text-warning';
    case 'hard':
      return 'border-destructive/30 bg-destructive/10 text-destructive';
  }
}

export function getStatusColor(status: TaskStatus): string {
  switch (status) {
    case 'completed':
      return 'border-success/30 bg-success/10 text-success';
    case 'in_progress':
      return 'border-primary/30 bg-primary/10 text-primary';
    case 'not_started':
      return 'border-border/60 bg-background/50 text-muted-foreground';
  }
}

export function getStatusLabel(status: TaskStatus): string {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'in_progress':
      return 'In Progress';
    case 'not_started':
      return 'Not Started';
  }
}

export function getReadinessLevelLabel(level: string): string {
  switch (level) {
    case 'excellent':
      return 'Excellent';
    case 'high':
      return 'High';
    case 'medium':
      return 'Moderate';
    case 'low':
      return 'Low';
    default:
      return level;
  }
}

export function getRiskColor(risk: 'low' | 'medium' | 'high'): string {
  switch (risk) {
    case 'low':
      return 'text-success';
    case 'medium':
      return 'text-warning';
    case 'high':
      return 'text-destructive';
  }
}

export function getDailyTasksForToday<T extends { id: string }>(pool: T[], count = 4): T[] {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000,
  );
  const shuffled = [...pool].sort((a, b) => {
    const hashA = (a.id.charCodeAt(0) + dayOfYear) % pool.length;
    const hashB = (b.id.charCodeAt(0) + dayOfYear + 7) % pool.length;
    return hashA - hashB;
  });
  return shuffled.slice(0, count);
}
