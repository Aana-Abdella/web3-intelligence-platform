'use client';

import Link from 'next/link';
import { ArrowRight, Clock, Sparkles, Zap } from 'lucide-react';
import type { FeaturedTask } from '@web3-intelligence/shared';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { getDifficultyColor, getStatusColor, getStatusLabel } from './utils';

interface TaskCardProps {
  task: FeaturedTask;
  isRecommended?: boolean;
  recommendationReason?: string;
}

export function TaskCard({ task, isRecommended, recommendationReason }: TaskCardProps) {
  const isCompleted = task.status === 'completed';

  return (
    <article
      className={cn(
        'group relative flex flex-col rounded-lg border border-border/70 bg-card/60 p-5 transition-all duration-300',
        'hover:border-primary/40 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5',
        isRecommended && 'ring-1 ring-primary/30',
      )}
    >
      {task.isNew && (
        <span className="absolute right-4 top-4 rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
          New
        </span>
      )}

      {isRecommended && (
        <div className="mb-3 flex items-start gap-2 rounded-md border border-primary/20 bg-primary/5 p-2.5">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-xs leading-relaxed text-primary/90">{recommendationReason}</p>
        </div>
      )}

      <div className="mb-4 flex items-start gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background/50 text-xl transition group-hover:scale-105"
          aria-hidden="true"
        >
          {task.icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {task.protocol}
          </p>
          <h3 className="mt-0.5 font-semibold leading-snug">{task.title}</h3>
        </div>
      </div>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        {task.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        <span
          className={cn(
            'rounded-md border px-2 py-0.5 text-xs font-medium capitalize',
            getDifficultyColor(task.difficulty),
          )}
        >
          {task.difficulty}
        </span>
        <span className="flex items-center gap-1 rounded-md border border-border/60 bg-background/50 px-2 py-0.5 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" aria-hidden="true" />
          {task.estimatedTime}
        </span>
        <span className="rounded-md border border-border/60 bg-background/50 px-2 py-0.5 text-xs text-muted-foreground">
          {task.blockchain}
        </span>
      </div>

      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-1 text-sm font-medium text-primary">
          <Zap className="h-3.5 w-3.5" aria-hidden="true" />
          {task.rewardBadge}
        </span>
        <span
          className={cn(
            'rounded-md border px-2 py-0.5 text-xs font-medium',
            getStatusColor(task.status),
          )}
        >
          {getStatusLabel(task.status)}
        </span>
      </div>

      {task.progress > 0 && (
        <div className="mb-4">
          <div className="mb-1 flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{task.progress}%</span>
          </div>
          <Progress value={task.progress} aria-label={`${task.title} progress`} />
        </div>
      )}

      <div className="mt-auto flex flex-wrap gap-1.5">
        {task.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-secondary/80 px-2 py-0.5 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <Button
          asChild
          size="sm"
          className="flex-1"
          variant={isCompleted ? 'secondary' : 'default'}
          disabled={isCompleted}
        >
          <Link href={task.guideUrl ?? '/airdrop'}>
            {task.ctaLabel}
            {!isCompleted && <ArrowRight className="h-3.5 w-3.5" />}
          </Link>
        </Button>
        {task.secondaryCtaLabel && !isCompleted && (
          <Button asChild size="sm" variant="outline">
            <Link href={task.guideUrl ?? '/airdrop'}>{task.secondaryCtaLabel}</Link>
          </Button>
        )}
      </div>
    </article>
  );
}

export function TaskCardSkeleton() {
  return (
    <div
      className="flex flex-col rounded-lg border border-border/70 bg-card/60 p-5"
      aria-hidden="true"
    >
      <div className="mb-4 flex items-start gap-3">
        <div className="h-11 w-11 animate-pulse rounded-lg bg-secondary" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-16 animate-pulse rounded bg-secondary" />
          <div className="h-5 w-3/4 animate-pulse rounded bg-secondary" />
        </div>
      </div>
      <div className="mb-4 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-secondary" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-secondary" />
      </div>
      <div className="mb-4 flex gap-2">
        <div className="h-6 w-14 animate-pulse rounded-md bg-secondary" />
        <div className="h-6 w-20 animate-pulse rounded-md bg-secondary" />
        <div className="h-6 w-24 animate-pulse rounded-md bg-secondary" />
      </div>
      <div className="mb-4 h-2 animate-pulse rounded-full bg-secondary" />
      <div className="mt-auto h-9 animate-pulse rounded-md bg-secondary" />
    </div>
  );
}
