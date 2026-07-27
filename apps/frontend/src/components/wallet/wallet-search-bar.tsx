'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search as SearchIcon, Loader2 } from 'lucide-react';
import { isValidWalletAddress } from '@web3-intelligence/shared';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/app.store';
import { ChainId } from '@web3-intelligence/shared';
import { cn } from '@/lib/utils';

interface WalletSearchBarProps {
  defaultValue?: string;
  size?: 'default' | 'large';
  autoFocus?: boolean;
}

/** Wallet address search bar with validation */
export function WalletSearchBar({ defaultValue = '', size = 'default', autoFocus }: WalletSearchBarProps) {
  const [address, setAddress] = useState(defaultValue);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const addRecentSearch = useAppStore((s) => s.addRecentSearch);

  const handleSearch = async () => {
    const trimmed = address.trim();
    if (!trimmed) {
      setError('Enter a wallet address');
      return;
    }
    if (!isValidWalletAddress(trimmed)) {
      setError('Invalid wallet address format');
      return;
    }

    setError('');
    setLoading(true);

    addRecentSearch({
      address: trimmed,
      chainId: ChainId.ETHEREUM,
      searchedAt: new Date(),
    });

    router.push(`/wallet/${trimmed}`);
    setLoading(false);
  };

  return (
    <div className="w-full">
      <div className={size === 'large' ? 'flex gap-3' : 'flex gap-2'}>
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={address}
            onChange={(e) => { setAddress(e.target.value); setError(''); }}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Enter wallet address (0x... or Solana)"
            className={cn(size === 'large' ? 'h-14 pl-10 text-base' : 'pl-10')}
            autoFocus={autoFocus}
          />
        </div>
        <Button
          onClick={handleSearch}
          disabled={loading}
          size={size === 'large' ? 'lg' : 'default'}
          className={size === 'large' ? 'h-14 px-8' : ''}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Analyze'}
        </Button>
      </div>
      {error && <p className="text-destructive text-sm mt-2">{error}</p>}
    </div>
  );
}
