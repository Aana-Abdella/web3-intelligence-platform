'use client';

import { Flag, Timer } from 'lucide-react';
import type { WeeklyMission } from '@web3-intelligence/shared';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface WeeklyMissionsProps {
  missions: WeeklyMission[];
}

export function WeeklyMissions({ missions }: WeeklyMissionsProps) {
  const activeMissions = missions.slice(0, 5);
  const completedCount = activeMissions.filter((m) => m.completed).length;

  return (
    <section
      className="rounded-lg border border-border/70 bg-card/60 p-5"
      aria-labelledby="weekly-missions-heading"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flag className="h-5 w-5 text-primary" aria-hidden="true" />
          <div>
            <h2 id="weekly-missions-heading" className="font-semibold">
              Weekly Missions
            </h2>
            <p className="text-xs text-muted-foreground">Complete before deadline</p>
          </div>
        </div>
        <span className="rounded-md border border-border/60 bg-background/50 px-2 py-0.5 text-xs text-muted-foreground">
          {completedCount}/{activeMissions.length}
        </span>
      </div>

      <ul className="space-y-3" role="list">
        {activeMissions.map((mission) => {
          const progressPercent = Math.round((mission.progress / mission.target) * 100);

          return (
            <li
              key={mission.id}
              className={cn(
                'rounded-md border p-3 transition-all duration-200',
                mission.completed
                  ? 'border-success/30 bg-success/5'
                  : 'border-border/60 bg-background/50',
              )}
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium">{mission.title}</p>
                  <p className="text-xs text-muted-foreground">{mission.description}</p>
                </div>
                <span className="shrink-0 text-xs font-medium text-primary">
                  {mission.reward}
                </span>
              </div>

              <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {mission.progress}/{mission.target}
                </span>
                <span className="flex items-center gap-1">
                  <Timer className="h-3 w-3" aria-hidden="true" />
                  {new Date(mission.deadline).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <Progress
                value={progressPercent}
                className="h-1.5"
                aria-label={`${mission.title} progress`}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function WeeklyMissionsSkeleton() {
  return (
    <div className="rounded-lg border border-border/70 bg-card/60 p-5" aria-hidden="true">
      <div className="mb-4 h-5 w-36 animate-pulse rounded bg-secondary" />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-md bg-secondary" />
        ))}
      </div>
    </div>
  );
}
