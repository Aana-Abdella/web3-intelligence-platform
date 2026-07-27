'use client';

import { WalletSearchBar } from '@/components/wallet/wallet-search-bar';
import { useAppStore } from '@/store/app.store';
import { truncateAddress } from '@web3-intelligence/shared';
import Link from 'next/link';
import { Clock, Star } from 'lucide-react';

/** Dashboard home with search and recent activity */
export default function DashboardPage() {
  const recentSearches = useAppStore((s) => s.recentSearches);
  const bookmarkedAddresses = useAppStore((s) => s.bookmarkedAddresses);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Search any wallet to get started</p>
      </div>

      <div className="mb-12">
        <WalletSearchBar size="large" autoFocus />
      </div>

      {recentSearches.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5" /> Recent Searches
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {recentSearches.slice(0, 6).map((search) => (
              <Link
                key={search.address}
                href={`/wallet/${search.address}`}
                className="glass-hover rounded-lg p-4 block"
              >
                <p className="font-mono text-sm">{truncateAddress(search.address)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(search.searchedAt).toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {bookmarkedAddresses.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Star className="h-5 w-5" /> Bookmarked Wallets
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {bookmarkedAddresses.map((address) => (
              <Link
                key={address}
                href={`/wallet/${address}`}
                className="glass-hover rounded-lg p-4 block"
              >
                <p className="font-mono text-sm">{truncateAddress(address)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {recentSearches.length === 0 && bookmarkedAddresses.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p>Search a wallet address above to begin analyzing on-chain data.</p>
          <p className="text-sm mt-2">
            Try{' '}
            <Link
              href="/wallet/0xd8da6bf26964af9d7eed9e03ae44754f960fc3f6"
              className="text-primary hover:underline font-mono"
            >
              vitalik.eth
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
