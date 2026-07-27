import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/layout/navbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Web3 Intelligence Platform',
  description: 'Analyze any wallet across multiple blockchains. Portfolio tracking, airdrop eligibility, risk analysis, and AI insights.',
  keywords: ['web3', 'wallet analytics', 'airdrop', 'blockchain', 'portfolio', 'DeFi'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
