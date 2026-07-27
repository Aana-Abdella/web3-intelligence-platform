'use client';

import { ArrowDownLeft, ArrowUpRight, Download, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TRANSACTIONS } from '@/lib/demo-data';

export default function TransactionsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-primary">Transactions</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal">Wallet activity ledger</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Concept transaction table for method, chain, counterparty, value, gas, status, and timing.
        </p>
      </div>

      <section className="mb-6 flex flex-col gap-3 rounded-lg border border-border/70 bg-card/60 p-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-10" placeholder="Search hash, method, or counterparty" />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </section>

      <section className="overflow-hidden rounded-lg border border-border/70 bg-card/60">
        <div className="grid grid-cols-[120px_1fr_120px_100px_120px] gap-4 border-b border-border/70 p-4 text-sm text-muted-foreground max-lg:hidden">
          <span>Method</span>
          <span>Counterparty</span>
          <span>Value</span>
          <span>Gas</span>
          <span>Status</span>
        </div>
        <div className="divide-y divide-border/70">
          {TRANSACTIONS.map((transaction, index) => (
            <div
              key={transaction.hash}
              className="grid gap-4 p-4 lg:grid-cols-[120px_1fr_120px_100px_120px] lg:items-center"
            >
              <div className="flex items-center gap-2">
                {index % 2 === 0 ? (
                  <ArrowUpRight className="h-4 w-4 text-primary" />
                ) : (
                  <ArrowDownLeft className="h-4 w-4 text-success" />
                )}
                <div>
                  <p className="font-medium">{transaction.method}</p>
                  <p className="font-mono text-xs text-muted-foreground">{transaction.hash}</p>
                </div>
              </div>
              <div>
                <p className="text-sm">{transaction.counterparty}</p>
                <p className="text-xs text-muted-foreground">
                  {transaction.chain} · {transaction.time}
                </p>
              </div>
              <p className="font-medium">{transaction.value}</p>
              <p className="text-sm text-muted-foreground">{transaction.gas}</p>
              <span className="w-fit rounded-md border border-success/30 bg-success/10 px-2 py-1 text-xs text-success">
                {transaction.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
