'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { walletApi, portfolioApi } from '@/lib/api';
import { WalletDashboard } from '@/components/wallet/wallet-dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatUsd } from '@web3-intelligence/shared';
import { Loader2, AlertCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/app.store';
import type { WalletOverview, PortfolioSummary } from '@web3-intelligence/shared';

/** Wallet detail page with overview and portfolio */
export default function WalletDetailPage() {
  const params = useParams();
  const address = params.address as string;
  const toggleBookmark = useAppStore((s) => s.toggleBookmark);
  const isBookmarked = useAppStore((s) => s.isBookmarked);

  const { data: overview, isLoading, error } = useQuery<WalletOverview>({
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
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !overview) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Failed to load wallet</h2>
        <p className="text-muted-foreground">{(error as Error)?.message ?? 'Unknown error'}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => toggleBookmark(address)}
          className="gap-2"
        >
          <Star className={`h-4 w-4 ${isBookmarked(address) ? 'fill-warning text-warning' : ''}`} />
          {isBookmarked(address) ? 'Bookmarked' : 'Bookmark'}
        </Button>
      </div>

      <WalletDashboard data={overview} />

      {portfolio && portfolio.tokens.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Token Holdings</h2>
          <div className="grid gap-3">
            {portfolio.tokens.map((token) => (
              <Card key={token.symbol} className="glass">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{token.name}</p>
                    <p className="text-sm text-muted-foreground">{token.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{token.balanceFormatted.toFixed(4)}</p>
                    <p className="text-sm text-muted-foreground">
                      {token.valueUsd ? formatUsd(token.valueUsd) : '—'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
