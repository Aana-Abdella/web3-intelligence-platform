'use client';

import { CalendarCheck, CheckCircle2 } from 'lucide-react';
import type { DailyTask } from '@web3-intelligence/shared';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface DailyTasksProps {
  tasks: DailyTask[];
}

export function DailyTasks({ tasks }: DailyTasksProps) {
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <section
      className="rounded-lg border border-border/70 bg-card/60 p-5"
      aria-labelledby="daily-tasks-heading"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarCheck className="h-5 w-5 text-primary" aria-hidden="true" />
          <div>
            <h2 id="daily-tasks-heading" className="font-semibold">
              Daily Tasks
            </h2>
            <p className="text-xs text-muted-foreground">Resets every 24 hours</p>
          </div>
        </div>
        <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
          {completedCount}/{tasks.length} done
        </span>
      </div>

      <ul className="space-y-3" role="list">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={cn(
              'rounded-md border p-3 transition-all duration-200',
              task.completed
                ? 'border-success/30 bg-success/5'
                : 'border-border/60 bg-background/50 hover:border-primary/30',
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2">
                {task.completed ? (
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-success"
                    aria-label="Completed"
                  />
                ) : (
                  <div
                    className="mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-muted-foreground/40"
                    aria-hidden="true"
                  />
                )}
                <div>
                  <p
                    className={cn(
                      'text-sm font-medium',
                      task.completed && 'text-muted-foreground line-through',
                    )}
                  >
                    {task.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{task.description}</p>
                </div>
              </div>
              <span className="shrink-0 text-xs font-medium text-primary">{task.reward}</span>
            </div>

            {!task.completed && task.target > 1 && (
              <div className="mt-2 pl-6">
                <Progress
                  value={(task.progress / task.target) * 100}
                  className="h-1.5"
                  aria-label={`${task.title} progress`}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function DailyTasksSkeleton() {
  return (
    <div className="rounded-lg border border-border/70 bg-card/60 p-5" aria-hidden="true">
      <div className="mb-4 h-5 w-28 animate-pulse rounded bg-secondary" />
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-md bg-secondary" />
        ))}
      </div>
    </div>
  );
}
