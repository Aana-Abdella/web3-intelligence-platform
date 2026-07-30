'use client';

import { Lock, Trophy, Unlock } from 'lucide-react';
import type { Achievement } from '@web3-intelligence/shared';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface AchievementCardProps {
  achievements: Achievement[];
}

export function AchievementCard({ achievements }: AchievementCardProps) {
  const unlocked = achievements.filter((a) => a.status === 'unlocked').length;

  return (
    <section
      className="rounded-lg border border-border/70 bg-card/60 p-5"
      aria-labelledby="achievements-heading"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" aria-hidden="true" />
          <h2 id="achievements-heading" className="font-semibold">
            Achievements
          </h2>
        </div>
        <span className="rounded-md border border-border/60 bg-background/50 px-2 py-0.5 text-xs text-muted-foreground">
          {unlocked}/{achievements.length} unlocked
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {achievements.slice(0, 8).map((achievement) => (
          <AchievementItem key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </section>
  );
}

function AchievementItem({ achievement }: { achievement: Achievement }) {
  const isLocked = achievement.status === 'locked';
  const isUnlocked = achievement.status === 'unlocked';
  const progressPercent = Math.round((achievement.progress / achievement.maxProgress) * 100);

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-md border p-3 transition-all duration-200',
        isUnlocked
          ? 'border-success/30 bg-success/5'
          : isLocked
            ? 'border-border/40 bg-background/30 opacity-60'
            : 'border-border/60 bg-background/50 hover:border-primary/30',
      )}
    >
      <div
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg',
          isUnlocked ? 'bg-success/10' : 'bg-secondary',
        )}
        aria-hidden="true"
      >
        {isLocked ? (
          <Lock className="h-4 w-4 text-muted-foreground" />
        ) : (
          achievement.icon
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">{achievement.title}</p>
          {isUnlocked && (
            <Unlock className="h-3 w-3 text-success" aria-label="Unlocked" />
          )}
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">{achievement.description}</p>

        {!isUnlocked && (
          <div className="mt-2">
            <div className="mb-1 flex justify-between text-xs text-muted-foreground">
              <span>
                {achievement.progress}/{achievement.maxProgress}
              </span>
              <span>{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-1.5" />
          </div>
        )}
      </div>
    </div>
  );
}

export function AchievementCardSkeleton() {
  return (
    <div className="rounded-lg border border-border/70 bg-card/60 p-5" aria-hidden="true">
      <div className="mb-4 h-5 w-32 animate-pulse rounded bg-secondary" />
      <div className="grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-md bg-secondary" />
        ))}
      </div>
    </div>
  );
}
