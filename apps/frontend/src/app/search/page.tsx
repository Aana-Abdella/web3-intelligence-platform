'use client';

import { WalletSearchBar } from '@/components/wallet/wallet-search-bar';

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">Wallet Search</h1>
      <p className="text-muted-foreground mb-8">
        Enter any EVM or Solana wallet address to analyze on-chain activity.
      </p>
      <WalletSearchBar size="large" autoFocus />
    </div>
  );
}
