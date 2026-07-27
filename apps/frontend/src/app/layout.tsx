import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/layout/navbar';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://web3-intelligence.local'),
  title: {
    default: 'Web3 Intelligence Platform',
    template: '%s | Web3 Intelligence',
  },
  description:
    'Analyze any wallet across multiple blockchains. Portfolio tracking, airdrop eligibility, risk analysis, and AI insights.',
  keywords: ['web3', 'wallet analytics', 'airdrop', 'blockchain', 'portfolio', 'DeFi'],
  openGraph: {
    title: 'Web3 Intelligence Platform',
    description:
      'Multi-chain wallet intelligence, portfolio analytics, airdrop scoring, and risk analysis.',
    type: 'website',
    images: ['/og-image.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web3 Intelligence Platform',
    description:
      'Analyze wallet activity, portfolio exposure, airdrop readiness, and on-chain risk.',
  },
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
