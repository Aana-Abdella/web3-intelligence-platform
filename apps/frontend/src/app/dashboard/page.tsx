'use client';

import Link from 'next/link';
import {
  Activity,
  Bell,
  Clock,
  Gift,
  LineChart,
  PieChart,
  Search,
  Shield,
  Star,
} from 'lucide-react';
import { WalletSearchBar } from '@/components/wallet/wallet-search-bar';
import { useAppStore } from '@/store/app.store';
import { formatCompact, truncateAddress } from '@web3-intelligence/shared';
import { FeaturedTasks } from '@/components/featured-tasks';
import {
  DASHBOARD_OVERVIEW,
  PROTOCOL_USAGE,
  SAMPLE_WALLET_ADDRESS,
  TRANSACTIONS,
} from '@/lib/demo-data';

const QUICK_ACTIONS = [
  {
    href: '/search',
    label: 'Wallet Search',
    icon: Search,
    detail: 'Analyze any EVM or Solana address',
  },
  {
    href: '/portfolio',
    label: 'Portfolio',
    icon: PieChart,
    detail: 'Allocation, holdings, and P/L',
  },
  { href: '/airdrop', label: 'Airdrop', icon: Gift, detail: 'Eligibility score and missing tasks' },
  { href: '/risk', label: 'Risk', icon: Shield, detail: 'Approval and scam exposure review' },
];

/** Dashboard home with search, live local state, and professional overview panels. */
export default function DashboardPage() {
  const recentSearches = useAppStore((s) => s.recentSearches);
  const bookmarkedAddresses = useAppStore((s) => s.bookmarkedAddresses);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="text-sm font-medium text-primary">Command center</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal">Dashboard</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Search wallets, review saved addresses, and jump into the main analysis modules.
          </p>
        </div>
        <div className="rounded-lg border border-border/70 bg-card/60 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">System status</p>
              <p className="text-xs text-muted-foreground">Frontend connected to API client</p>
            </div>
            <span className="rounded-md border border-success/30 bg-success/10 px-2 py-1 text-xs text-success">
              Operational
            </span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <WalletSearchBar size="large" autoFocus />
      </div>

      <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DASHBOARD_OVERVIEW.map((metric) => (
          <div key={metric.label} className="rounded-lg border border-border/70 bg-card/60 p-5">
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
            <p className="mt-1 text-sm text-success">{metric.change}</p>
          </div>
        ))}
      </section>

      <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {QUICK_ACTIONS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg border border-border/70 bg-card/60 p-5 transition hover:border-primary/40 hover:bg-card/80"
          >
            <item.icon className="h-5 w-5 text-primary" />
            <h2 className="mt-4 font-semibold">{item.label}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p>
          </Link>
        ))}
      </section>

      <div className="mb-12">
        <FeaturedTasks />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="rounded-lg border border-border/70 bg-card/60">
          <div className="flex items-center justify-between border-b border-border/70 p-5">
            <div>
              <h2 className="font-semibold">Recent activity stream</h2>
              <p className="text-sm text-muted-foreground">
                Concept preview based on representative wallet events
              </p>
            </div>
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <div className="divide-y divide-border/70">
            {TRANSACTIONS.slice(0, 4).map((transaction) => (
              <div
                key={transaction.hash}
                className="grid gap-3 p-5 sm:grid-cols-[120px_1fr_120px] sm:items-center"
              >
                <div>
                  <p className="font-medium">{transaction.method}</p>
                  <p className="font-mono text-xs text-muted-foreground">{transaction.hash}</p>
                </div>
                <div>
                  <p className="text-sm">{transaction.counterparty}</p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.chain} · {transaction.time}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-sm font-medium">{transaction.value}</p>
                  <p className="text-xs text-muted-foreground">Gas {transaction.gas}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-lg border border-border/70 bg-card/60 p-5">
            <div className="mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Recent searches</h2>
            </div>
            {recentSearches.length > 0 ? (
              <div className="space-y-3">
                {recentSearches.slice(0, 5).map((search) => (
                  <Link
                    key={search.address}
                    href={`/wallet/${search.address}`}
                    className="block rounded-md border border-border/60 bg-background/50 p-3"
                  >
                    <p className="font-mono text-sm">{truncateAddress(search.address)}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(search.searchedAt).toLocaleString()}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                href={`/wallet/${SAMPLE_WALLET_ADDRESS}`}
                className="block rounded-md border border-dashed border-border p-4 text-sm text-muted-foreground hover:text-foreground"
              >
                No local searches yet. Open the sample wallet to populate this area.
              </Link>
            )}
          </section>

          <section className="rounded-lg border border-border/70 bg-card/60 p-5">
            <div className="mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Bookmarked wallets</h2>
            </div>
            {bookmarkedAddresses.length > 0 ? (
              <div className="space-y-3">
                {bookmarkedAddresses.slice(0, 5).map((address) => (
                  <Link
                    key={address}
                    href={`/wallet/${address}`}
                    className="block rounded-md border border-border/60 bg-background/50 p-3 font-mono text-sm"
                  >
                    {truncateAddress(address)}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="rounded-md border border-dashed border-border p-4 text-sm text-muted-foreground">
                Bookmark wallets from the wallet detail page.
              </p>
            )}
          </section>

          <section className="rounded-lg border border-border/70 bg-card/60 p-5">
            <div className="mb-4 flex items-center gap-2">
              <LineChart className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Top protocols</h2>
            </div>
            <div className="space-y-3">
              {PROTOCOL_USAGE.map((protocol) => (
                <div key={protocol.protocol}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span>{protocol.protocol}</span>
                    <span className="text-muted-foreground">
                      {formatCompact(protocol.interactions)}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${Math.min(protocol.interactions / 4, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Link
            href="/notifications"
            className="flex items-center justify-between rounded-lg border border-border/70 bg-card/60 p-5 transition hover:border-primary/40"
          >
            <span className="flex items-center gap-2 font-medium">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
            </span>
            <span className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary">4</span>
          </Link>
        </aside>
      </div>
    </div>
  );
}
