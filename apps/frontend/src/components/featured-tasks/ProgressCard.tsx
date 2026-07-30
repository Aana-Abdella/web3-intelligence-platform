'use client';

import { Target, TrendingUp } from 'lucide-react';
import type { AirdropReadiness } from '@web3-intelligence/shared';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { getReadinessLevelLabel } from './utils';

interface ProgressCardProps {
  readiness: AirdropReadiness;
}

export function ProgressCard({ readiness }: ProgressCardProps) {
  const levelLabel = getReadinessLevelLabel(readiness.level);

  return (
    <section
      className="glass-hover rounded-lg p-5"
      aria-labelledby="readiness-heading"
    >
      <div className="mb-5 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" aria-hidden="true" />
            <h2 id="readiness-heading" className="font-semibold">
              Airdrop Readiness
            </h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Your eligibility across key activity categories
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold tabular-nums text-primary">
            {readiness.overallScore}%
          </p>
          <p
            className={cn(
              'text-sm font-medium',
              readiness.level === 'excellent' && 'text-success',
              readiness.level === 'high' && 'text-primary',
              readiness.level === 'medium' && 'text-warning',
              readiness.level === 'low' && 'text-destructive',
            )}
          >
            {levelLabel}
          </p>
        </div>
      </div>

      <Progress
        value={readiness.overallScore}
        className="mb-6 h-2.5"
        aria-label={`Overall airdrop readiness: ${readiness.overallScore}%`}
      />

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
          Category breakdown
        </div>
        {readiness.categoryBreakdown.map((item) => (
          <div key={item.category}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span>{item.label}</span>
              <span className="tabular-nums text-muted-foreground">{item.progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-secondary">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-500',
                  item.progress >= 70
                    ? 'bg-primary'
                    : item.progress >= 40
                      ? 'bg-warning'
                      : 'bg-destructive/70',
                )}
                style={{ width: `${item.progress}%` }}
                role="progressbar"
                aria-valuenow={item.progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${item.label} progress`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProgressCardSkeleton() {
  return (
    <div className="glass rounded-lg p-5" aria-hidden="true">
      <div className="mb-5 flex justify-between">
        <div className="space-y-2">
          <div className="h-5 w-40 animate-pulse rounded bg-secondary" />
          <div className="h-3 w-56 animate-pulse rounded bg-secondary" />
        </div>
        <div className="h-10 w-16 animate-pulse rounded bg-secondary" />
      </div>
      <div className="mb-6 h-2.5 animate-pulse rounded-full bg-secondary" />
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-1">
            <div className="h-4 w-full animate-pulse rounded bg-secondary" />
            <div className="h-2 animate-pulse rounded-full bg-secondary" />
          </div>
        ))}
      </div>
    </div>
  );
}
