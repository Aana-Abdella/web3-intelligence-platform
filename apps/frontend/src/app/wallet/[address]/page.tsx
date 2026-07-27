'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, ArrowUpRight, Coins, FileText, Loader2, Shield, Star } from 'lucide-react';
import { walletApi, portfolioApi } from '@/lib/api';
import { WalletDashboard } from '@/components/wallet/wallet-dashboard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { formatUsd, truncateAddress } from '@web3-intelligence/shared';
import { useAppStore } from '@/store/app.store';
import { RISK_FLAGS, TOKEN_HOLDINGS, TRANSACTIONS, WALLET_ANALYTICS } from '@/lib/demo-data';
import type { WalletOverview, PortfolioSummary } from '@web3-intelligence/shared';

export default function WalletDetailPage() {
  const params = useParams();
  const address = params.address as string;
  const toggleBookmark = useAppStore((s) => s.toggleBookmark);
  const isBookmarked = useAppStore((s) => s.isBookmarked);

  const {
    data: overview,
    isLoading,
    error,
  } = useQuery<WalletOverview>({
    queryKey: ['wallet', address],
    queryFn: () => walletApi.overview(address) as Promise<WalletOverview>,
    enabled: !!address,
  });

  const { data: portfolio } = useQuery<PortfolioSummary>({
    queryKey: ['portfolio', address],
    queryFn: () => portfolioApi.get(address) as Promise<PortfolioSummary>,
    enabled: !!address,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto flex min-h-[50vh] justify-center px-4 py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !overview) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertCircle className="mx-auto mb-4 h-12 w-12 text-destructive" />
        <h2 className="mb-2 text-xl font-semibold">Failed to load wallet</h2>
        <p className="text-muted-foreground">{(error as Error)?.message ?? 'Unknown error'}</p>
      </div>
    );
  }

  const tokenRows = portfolio?.tokens?.length
    ? portfolio.tokens.map((token) => ({
        symbol: token.symbol,
        name: token.name,
        chain: `Chain ${token.chainId}`,
        balance: token.balanceFormatted.toFixed(4),
        valueUsd: token.valueUsd ?? 0,
      }))
    : TOKEN_HOLDINGS.map((token) => ({
        symbol: token.symbol,
        name: token.name,
        chain: token.chain,
        balance: token.balance,
        valueUsd: token.valueUsd,
      }));

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-primary">Wallet Details</p>
          <p className="mt-1 font-mono text-sm text-muted-foreground">
            {truncateAddress(address, 10, 8)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => toggleBookmark(address)}>
            <Star
              className={`h-4 w-4 ${isBookmarked(address) ? 'fill-warning text-warning' : ''}`}
            />
            {isBookmarked(address) ? 'Bookmarked' : 'Bookmark'}
          </Button>
          <Button asChild size="sm">
            <Link href="/transactions">
              <FileText className="h-4 w-4" />
              Transactions
            </Link>
          </Button>
        </div>
      </div>

      <WalletDashboard data={overview} />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="rounded-lg border border-border/70 bg-card/60">
          <div className="flex items-center justify-between border-b border-border/70 p-5">
            <div>
              <h2 className="font-semibold">Token holdings</h2>
              <p className="text-sm text-muted-foreground">
                {portfolio?.tokens?.length
                  ? 'Live API response'
                  : 'Concept preview until balances are available'}
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/tokens">
                <Coins className="h-4 w-4" />
                View all
              </Link>
            </Button>
          </div>
          <div className="divide-y divide-border/70">
            {tokenRows.slice(0, 6).map((token) => {
              return (
                <div
                  key={`${token.symbol}-${token.chain}`}
                  className="grid gap-3 p-5 sm:grid-cols-[1fr_120px_120px] sm:items-center"
                >
                  <div>
                    <p className="font-medium">{token.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {token.symbol} · {token.chain}
                    </p>
                  </div>
                  <p className="font-mono text-sm text-muted-foreground">{token.balance}</p>
                  <p className="font-medium sm:text-right">{formatUsd(token.valueUsd)}</p>
                </div>
              );
            })}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-lg border border-border/70 bg-card/60 p-5">
            <div className="mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Risk snapshot</h2>
            </div>
            <div className="space-y-3">
              {RISK_FLAGS.map((flag) => (
                <div
                  key={flag.title}
                  className="rounded-md border border-border/60 bg-background/50 p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">{flag.title}</p>
                    <span className="rounded-md bg-secondary px-2 py-1 text-xs text-muted-foreground">
                      {flag.severity}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{flag.detail}</p>
                </div>
              ))}
            </div>
            <Link href="/risk" className="mt-4 inline-flex items-center gap-2 text-sm text-primary">
              Open risk analysis
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </section>

          <section className="rounded-lg border border-border/70 bg-card/60 p-5">
            <h2 className="mb-4 font-semibold">Wallet analytics</h2>
            <div className="space-y-4">
              {WALLET_ANALYTICS.slice(0, 5).map((item) => (
                <div key={item.label}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span>{item.label}</span>
                    <span className="text-muted-foreground">{item.value}</span>
                  </div>
                  <Progress value={item.score} />
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <section className="mt-8 rounded-lg border border-border/70 bg-card/60">
        <div className="flex items-center justify-between border-b border-border/70 p-5">
          <div>
            <h2 className="font-semibold">Recent transactions</h2>
            <p className="text-sm text-muted-foreground">
              Concept preview until transaction API is implemented
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/transactions">
              <FileText className="h-4 w-4" />
              Ledger
            </Link>
          </Button>
        </div>
        <div className="divide-y divide-border/70">
          {TRANSACTIONS.slice(0, 4).map((transaction) => (
            <Card key={transaction.hash} className="border-0 bg-transparent shadow-none">
              <CardContent className="grid gap-3 p-5 sm:grid-cols-[120px_1fr_120px] sm:items-center">
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
                <div className="sm:text-right">
                  <p className="font-medium">{transaction.value}</p>
                  <p className="text-xs text-muted-foreground">Gas {transaction.gas}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
