'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  FilterX,
  Lightbulb,
  RefreshCw,
  Sparkles,
  Star,
  Trophy,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TaskCard, TaskCardSkeleton } from './TaskCard';
import { ProgressCard, ProgressCardSkeleton } from './ProgressCard';
import { AchievementCard, AchievementCardSkeleton } from './AchievementCard';
import { DailyTasks, DailyTasksSkeleton } from './DailyTasks';
import { WeeklyMissions, WeeklyMissionsSkeleton } from './WeeklyMissions';
import { TrendingCampaigns, TrendingCampaignsSkeleton } from './TrendingCampaigns';
import { Filters } from './Filters';
import { SearchBar } from './SearchBar';
import { useFeaturedTasksData } from './use-featured-tasks-data';
import { useFeaturedTasks } from './use-featured-tasks';

export function FeaturedTasks() {
  const { data, isLoading, error, refetch } = useFeaturedTasksData();
  const [activeTab, setActiveTab] = useState<'tasks' | 'readiness' | 'quests' | 'campaigns'>('tasks');

  const {
    category,
    setCategory,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    filteredTasks,
    filteredCount,
  } = useFeaturedTasks({
    tasks: data?.tasks ?? [],
    initialCategory: 'all',
    initialSort: 'recommended',
  });

  if (error) {
    return (
      <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-6 text-center">
        <AlertCircle className="mx-auto h-10 w-10 text-destructive" />
        <h3 className="mt-3 text-lg font-semibold text-foreground">Failed to Load Featured Tasks</h3>
        <p className="mt-1 text-sm text-muted-foreground">{error.message}</p>
        <Button onClick={refetch} variant="outline" className="mt-4 gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  const recommendations = data?.recommendations ?? [];

  return (
    <section className="space-y-8" aria-label="Featured Tasks Dashboard">
      {/* Header section */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" />
              Eligibility Engine
            </span>
            <span className="rounded-full border border-border/60 bg-background/50 px-2.5 py-0.5 text-xs text-muted-foreground">
              v2.4
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            ⭐ Featured Tasks
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Complete targeted protocols and chain interactions to maximize your wallet&apos;s eligibility score for upcoming airdrops.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(val: string) => setActiveTab(val as 'tasks' | 'readiness' | 'quests' | 'campaigns')} className="w-full md:w-auto">
          <TabsList className="grid w-full grid-cols-4 md:w-auto">
            <TabsTrigger value="tasks" className="gap-1.5 text-xs sm:text-sm">
              <Zap className="h-4 w-4" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="readiness" className="gap-1.5 text-xs sm:text-sm">
              <Star className="h-4 w-4" />
              Readiness
            </TabsTrigger>
            <TabsTrigger value="quests" className="gap-1.5 text-xs sm:text-sm">
              <Trophy className="h-4 w-4" />
              Quests
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="gap-1.5 text-xs sm:text-sm">
              <Sparkles className="h-4 w-4" />
              Campaigns
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Recommendation Engine Banner */}
      {!isLoading && recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-5 shadow-inner"
        >
          <div className="flex items-center gap-2 font-semibold text-primary">
            <Sparkles className="h-5 w-5" />
            <h3>Personalized Wallet Recommendations</h3>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Based on your on-chain history (42 transactions, 45d age, no bridge/lending activity detected):
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {recommendations.map((rec, i) => (
              <div
                key={i}
                className="flex flex-col justify-between rounded-lg border border-border/70 bg-card/80 p-3.5 backdrop-blur-sm"
              >
                <div className="flex items-start gap-2">
                  <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                  <p className="text-xs leading-relaxed text-foreground">{rec.reason}</p>
                </div>
                {rec.taskId && (
                  <Button
                    variant="link"
                    size="sm"
                    className="mt-2 h-auto p-0 text-xs text-primary justify-start"
                    onClick={() => {
                      setActiveTab('tasks');
                      setSearchQuery(rec.taskId.split('-')[0]);
                    }}
                  >
                    View Task &rarr;
                  </Button>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Main Content Tabs */}
      {activeTab === 'tasks' && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-[1fr_auto]">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          <Filters
            category={category}
            onCategoryChange={setCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            resultCount={filteredCount}
          />

          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <TaskCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border/80 bg-card/40 p-12 text-center">
              <FilterX className="mx-auto h-12 w-12 text-muted-foreground/60" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">No tasks match your criteria</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your search query or category filter.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setCategory('all');
                  setSearchQuery('');
                  setSortBy('recommended');
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTasks.map((task) => {
                const rec = recommendations.find((r) => r.taskId === task.id);
                return (
                  <TaskCard
                    key={task.id}
                    task={task}
                    isRecommended={!!rec}
                    recommendationReason={rec?.reason}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'readiness' && (
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {isLoading ? (
            <ProgressCardSkeleton />
          ) : (
            data?.readiness && <ProgressCard readiness={data.readiness} />
          )}

          <div className="space-y-6">
            {isLoading ? (
              <DailyTasksSkeleton />
            ) : (
              data?.dailyTasks && <DailyTasks tasks={data.dailyTasks} />
            )}
          </div>
        </div>
      )}

      {activeTab === 'quests' && (
        <div className="grid gap-6 lg:grid-cols-2">
          {isLoading ? (
            <>
              <DailyTasksSkeleton />
              <WeeklyMissionsSkeleton />
              <AchievementCardSkeleton />
            </>
          ) : (
            <>
              <DailyTasks tasks={data?.dailyTasks ?? []} />
              <WeeklyMissions missions={data?.weeklyMissions ?? []} />
              <div className="lg:col-span-2">
                <AchievementCard achievements={data?.achievements ?? []} />
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === 'campaigns' && (
        <div>
          {isLoading ? (
            <TrendingCampaignsSkeleton />
          ) : (
            <TrendingCampaigns campaigns={data?.campaigns ?? []} />
          )}
        </div>
      )}

      {/* Secondary Bottom Overview Panel if on 'tasks' tab */}
      {activeTab === 'tasks' && !isLoading && data && (
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ProgressCard readiness={data.readiness} />
          </div>
          <div className="space-y-6">
            <DailyTasks tasks={data.dailyTasks} />
            <WeeklyMissions missions={data.weeklyMissions} />
          </div>
          <div className="lg:col-span-3">
            <AchievementCard achievements={data.achievements} />
          </div>
          <div className="lg:col-span-3">
            <TrendingCampaigns campaigns={data.campaigns} />
          </div>
        </div>
      )}
    </section>
  );
}
