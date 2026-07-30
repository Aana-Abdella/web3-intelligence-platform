'use client';

import { useEffect, useState } from 'react';
import type {
  Achievement,
  AirdropReadiness,
  DailyTask,
  FeaturedTask,
  TaskRecommendation,
  TrendingCampaign,
  WalletActivityProfile,
  WeeklyMission,
} from '@web3-intelligence/shared';
import {
  ACHIEVEMENTS,
  AIRDROP_READINESS,
  DAILY_TASK_POOL,
  FEATURED_TASKS,
  SAMPLE_WALLET_PROFILE,
  TRENDING_CAMPAIGNS,
  WEEKLY_MISSIONS,
} from '@/lib/featured-tasks-data';
import { generateRecommendations, getDailyTasksForToday } from './utils';

export interface FeaturedTasksData {
  tasks: FeaturedTask[];
  readiness: AirdropReadiness;
  achievements: Achievement[];
  dailyTasks: DailyTask[];
  weeklyMissions: WeeklyMission[];
  campaigns: TrendingCampaign[];
  walletProfile: WalletActivityProfile;
  recommendations: TaskRecommendation[];
}

interface UseFeaturedTasksDataResult {
  data: FeaturedTasksData | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useFeaturedTasksData(): UseFeaturedTasksDataResult {
  const [data, setData] = useState<FeaturedTasksData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [fetchKey, setFetchKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      setIsLoading(true);
      setError(null);

      try {
        await new Promise((resolve) => setTimeout(resolve, 600));

        if (cancelled) return;

        const walletProfile = SAMPLE_WALLET_PROFILE;
        const recommendations = generateRecommendations(walletProfile, FEATURED_TASKS);

        setData({
          tasks: FEATURED_TASKS,
          readiness: AIRDROP_READINESS,
          achievements: ACHIEVEMENTS,
          dailyTasks: getDailyTasksForToday(DAILY_TASK_POOL, 4),
          weeklyMissions: WEEKLY_MISSIONS,
          campaigns: TRENDING_CAMPAIGNS,
          walletProfile,
          recommendations,
        });
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Failed to load featured tasks'));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, [fetchKey]);

  const refetch = () => setFetchKey((k) => k + 1);

  return { data, isLoading, error, refetch };
}
