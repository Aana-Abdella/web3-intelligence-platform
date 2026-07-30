'use client';

import type { TaskCategory, TaskSortOption } from '@web3-intelligence/shared';
import { cn } from '@/lib/utils';
import { SORT_OPTIONS, TASK_CATEGORIES } from './utils';

interface FiltersProps {
  category: TaskCategory | 'all';
  onCategoryChange: (category: TaskCategory | 'all') => void;
  sortBy: TaskSortOption;
  onSortChange: (sort: TaskSortOption) => void;
  resultCount?: number;
}

export function Filters({
  category,
  onCategoryChange,
  sortBy,
  onSortChange,
  resultCount,
}: FiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter tasks by category"
      >
        {TASK_CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            type="button"
            role="tab"
            aria-selected={category === cat.value}
            onClick={() => onCategoryChange(cat.value)}
            className={cn(
              'rounded-md border px-3 py-1.5 text-sm font-medium transition-all duration-200',
              category === cat.value
                ? 'border-primary/50 bg-primary/10 text-primary'
                : 'border-border/60 bg-background/50 text-muted-foreground hover:border-primary/30 hover:text-foreground',
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {resultCount !== undefined && (
          <span className="hidden text-sm text-muted-foreground sm:inline">
            {resultCount} task{resultCount !== 1 ? 's' : ''}
          </span>
        )}
        <label htmlFor="task-sort" className="sr-only">
          Sort tasks
        </label>
        <select
          id="task-sort"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as TaskSortOption)}
          className="h-9 rounded-md border border-border/60 bg-background/50 px-3 text-sm text-foreground transition hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
