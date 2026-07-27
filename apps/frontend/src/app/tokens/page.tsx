'use client';

import { ArrowUpDown, Coins, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatUsd } from '@web3-intelligence/shared';
import { TOKEN_HOLDINGS } from '@/lib/demo-data';

export default function TokenHoldingsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-primary">Token Holdings</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal">Assets and performance</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Table-first concept view for balances, values, allocation, network exposure, and token
          performance.
        </p>
      </div>

      <section className="mb-6 flex flex-col gap-3 rounded-lg border border-border/70 bg-card/60 p-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-10" placeholder="Search tokens, symbols, or chains" />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        <Button variant="outline">
          <ArrowUpDown className="h-4 w-4" />
          Sort
        </Button>
      </section>

      <section className="overflow-hidden rounded-lg border border-border/70 bg-card/60">
        <div className="grid grid-cols-[1fr_120px_140px_120px] gap-4 border-b border-border/70 p-4 text-sm text-muted-foreground max-md:hidden">
          <span>Asset</span>
          <span>Allocation</span>
          <span>Value</span>
          <span>Performance</span>
        </div>
        <div className="divide-y divide-border/70">
          {TOKEN_HOLDINGS.map((token) => (
            <div
              key={token.symbol}
              className="grid gap-4 p-4 md:grid-cols-[1fr_120px_140px_120px] md:items-center"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-primary/30 bg-primary/10">
                  <Coins className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{token.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {token.symbol} · {token.chain} · {token.balance}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{token.allocation}%</p>
              <p className="font-medium">{formatUsd(token.valueUsd)}</p>
              <p
                className={
                  token.performance >= 0 ? 'text-sm text-success' : 'text-sm text-destructive'
                }
              >
                {token.performance >= 0 ? '+' : ''}
                {token.performance}%
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
