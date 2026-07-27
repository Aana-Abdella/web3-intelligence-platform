'use client';

import Link from 'next/link';
import { ArrowRight, History, Search, ShieldCheck, Wallet } from 'lucide-react';
import { WalletSearchBar } from '@/components/wallet/wallet-search-bar';
import { SAMPLE_WALLET_ADDRESS } from '@/lib/demo-data';

const SEARCH_CAPABILITIES = [
  'EVM and Solana address validation',
  'Recent searches stored locally',
  'API cache refresh support',
  'Explorer-ready chain metadata',
];

export default function SearchPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="text-sm font-medium text-primary">Wallet Search</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal">Analyze a wallet address</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Search any supported wallet and route directly into the wallet detail dashboard.
          </p>
        </div>
        <div className="rounded-lg border border-border/70 bg-card/60 p-5">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Read-only analysis</p>
              <p className="text-sm text-muted-foreground">
                No private keys or signatures required for search.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="rounded-lg border border-border/70 bg-card/60 p-5">
        <WalletSearchBar size="large" autoFocus />
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link
            href={`/wallet/${SAMPLE_WALLET_ADDRESS}`}
            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <Wallet className="h-4 w-4" />
            Open sample wallet
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <section className="rounded-lg border border-border/70 bg-card/60 p-5">
          <div className="mb-4 flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Search pipeline</h2>
          </div>
          <div className="space-y-3">
            {SEARCH_CAPABILITIES.map((item) => (
              <div
                key={item}
                className="rounded-md border border-border/60 bg-background/50 p-3 text-sm text-muted-foreground"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-border/70 bg-card/60 p-5">
          <div className="mb-4 flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">What gets returned</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {['Wallet age', 'Token count', 'NFT count', 'Risk score', 'Gas spent', 'Labels'].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-md border border-border/60 bg-background/50 p-3 text-sm"
                >
                  {item}
                </div>
              ),
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
