'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search, Shield, Gift, BarChart3, Layers, Zap, Globe, ArrowRight,
  CheckCircle, ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WalletSearchBar } from '@/components/wallet/wallet-search-bar';
import { SUPPORTED_CHAINS } from '@web3-intelligence/shared';

const FEATURES = [
  {
    icon: Search,
    title: 'Wallet Analytics',
    description: 'Deep analysis of any wallet address across 8+ blockchains with real-time on-chain data.',
  },
  {
    icon: BarChart3,
    title: 'Portfolio Tracking',
    description: 'Track token balances, NFT holdings, and portfolio value with historical charts.',
  },
  {
    icon: Gift,
    title: 'Airdrop Eligibility',
    description: 'Score your wallet for potential airdrops based on activity patterns and on-chain behavior.',
  },
  {
    icon: Shield,
    title: 'Risk Analysis',
    description: 'Detect scam tokens, honeypots, mixer exposure, and risky token approvals.',
  },
  {
    icon: Layers,
    title: 'DeFi Positions',
    description: 'Track lending, borrowing, staking, and yield farming positions across protocols.',
  },
  {
    icon: Zap,
    title: 'AI Insights',
    description: 'AI-powered analysis of wallet behavior, spending patterns, and recommendations.',
  },
];

const FAQ = [
  {
    q: 'Which blockchains are supported?',
    a: 'We support Ethereum, Base, Arbitrum, Optimism, Polygon, BNB Chain, Avalanche, and Solana, with more chains coming soon.',
  },
  {
    q: 'Is my wallet data stored?',
    a: 'We cache public on-chain data temporarily for performance. No private keys are ever accessed or stored.',
  },
  {
    q: 'How is airdrop eligibility calculated?',
    a: 'Our algorithm analyzes wallet age, transaction count, bridge usage, L2 activity, DeFi participation, and protocol diversity.',
  },
  {
    q: 'Is this free to use?',
    a: 'Core features are free. Premium features including AI insights and API access will be available in future plans.',
  },
];

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-glow" />

        <div className="relative container mx-auto text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-primary mb-6">
              <Globe className="h-4 w-4" /> Multi-chain Web3 Intelligence
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Analyze Any Wallet{' '}
              <span className="gradient-text">Across Blockchains</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Portfolio tracking, airdrop eligibility, risk analysis, and AI-powered insights —
              all in one professional platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <WalletSearchBar size="large" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
          >
            {['8+ Chains', 'Real-time Data', 'No Wallet Required'].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-success" /> {item}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to understand, track, and optimize your Web3 portfolio.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-hover rounded-xl p-6"
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chains */}
      <section className="py-24 px-4 bg-card/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Supported Chains</h2>
          <p className="text-muted-foreground mb-12">Analyze wallets across major blockchain networks</p>
          <div className="flex flex-wrap justify-center gap-4">
            {SUPPORTED_CHAINS.filter((c) => c.isActive).map((chain) => (
              <div
                key={chain.slug}
                className="glass-hover px-6 py-3 rounded-xl flex items-center gap-3"
              >
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                  {chain.nativeCurrency.symbol.slice(0, 3)}
                </div>
                <span className="font-medium">{chain.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">FAQ</h2>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <div key={item.q} className="glass rounded-xl p-6">
                <h3 className="font-semibold mb-2">{item.q}</h3>
                <p className="text-muted-foreground text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="glass rounded-2xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10" />
            <div className="relative">
              <h2 className="text-3xl font-bold mb-4">Ready to analyze your wallet?</h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Get instant insights into your on-chain activity, portfolio, and airdrop eligibility.
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  Launch Dashboard <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 Web3 Intelligence Platform. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/docs" className="hover:text-foreground transition-colors">Documentation</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
