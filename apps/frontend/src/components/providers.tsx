'use client';

import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider, http } from 'wagmi';
import { mainnet, base, arbitrum, optimism, polygon, bsc, avalanche } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';

// Open public WalletConnect Project ID for localhost development (no domain allowlist restrictions)
const rawProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID?.trim();
const projectId =
  rawProjectId &&
  rawProjectId !== 'your-walletconnect-project-id' &&
  rawProjectId !== 'demo-project-id' &&
  rawProjectId !== '3a4516ec4fe463724c01d390f34fef04' &&
  rawProjectId.length >= 20
    ? rawProjectId
    : '20e40889c25381f9b3cf286707328bfb';

// Suppress known WalletConnect relay allowlist warnings in client-side dev console if cloud.reown.com is unreachable
if (typeof window !== 'undefined') {
  const originalConsoleError = console.error;
  console.error = (...args: unknown[]) => {
    const errorStr = args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
    if (
      errorStr.includes('cloud.reown.com') ||
      errorStr.includes('Connection interrupted while trying to subscribe') ||
      errorStr.includes('Subscribing to')
    ) {
      return;
    }
    originalConsoleError.apply(console, args);
  };
}

const config = getDefaultConfig({
  appName: 'Web3 Intelligence Platform',
  projectId,
  chains: [mainnet, base, arbitrum, optimism, polygon, bsc, avalanche],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [polygon.id]: http(),
    [bsc.id]: http(),
    [avalanche.id]: http(),
  },
  ssr: true,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

/** Root providers wrapping the application with Web3 and data fetching */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({ accentColor: '#3b82f6' })}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

