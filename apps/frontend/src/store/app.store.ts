import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { RecentSearch } from '@web3-intelligence/shared';

interface AppState {
  recentSearches: RecentSearch[];
  bookmarkedAddresses: string[];
  addRecentSearch: (search: RecentSearch) => void;
  toggleBookmark: (address: string) => void;
  isBookmarked: (address: string) => boolean;
}

/** Global application state with persistence */
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      recentSearches: [],
      bookmarkedAddresses: [],

      addRecentSearch: (search) =>
        set((state) => ({
          recentSearches: [
            search,
            ...state.recentSearches.filter((s) => s.address !== search.address),
          ].slice(0, 20),
        })),

      toggleBookmark: (address) =>
        set((state) => ({
          bookmarkedAddresses: state.bookmarkedAddresses.includes(address)
            ? state.bookmarkedAddresses.filter((a) => a !== address)
            : [...state.bookmarkedAddresses, address],
        })),

      isBookmarked: (address) => get().bookmarkedAddresses.includes(address),
    }),
    { name: 'web3-intelligence-store' },
  ),
);
