'use client';

import { useMemo, useState } from 'react';
import type { FeaturedTask, TaskCategory, TaskSortOption } from '@web3-intelligence/shared';
import { filterTasks, sortTasks } from './utils';

interface UseFeaturedTasksOptions {
  tasks: FeaturedTask[];
  initialCategory?: TaskCategory | 'all';
  initialSort?: TaskSortOption;
}

export function useFeaturedTasks({
  tasks,
  initialCategory = 'all',
  initialSort = 'recommended',
}: UseFeaturedTasksOptions) {
  const [category, setCategory] = useState<TaskCategory | 'all'>(initialCategory);
  const [sortBy, setSortBy] = useState<TaskSortOption>(initialSort);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = useMemo(() => {
    const filtered = filterTasks(tasks, category, searchQuery);
    return sortTasks(filtered, sortBy);
  }, [tasks, category, searchQuery, sortBy]);

  return {
    category,
    setCategory,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    filteredTasks,
    totalCount: tasks.length,
    filteredCount: filteredTasks.length,
  };
}
