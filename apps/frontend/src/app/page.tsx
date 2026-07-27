'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Database,
  GitBranch,
  Layers,
  Search,
  Shield,
  Sparkles,
  Wallet,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WalletSearchBar } from '@/components/wallet/wallet-search-bar';
import { SUPPORTED_CHAINS } from '@web3-intelligence/shared';
import { CHAIN_DISTRIBUTION, PLATFORM_METRICS, SAMPLE_WALLET_ADDRESS } from '@/lib/demo-data';

const FEATURES = [
  {
    icon: Search,
    title: 'Wallet Intelligence',
    description:
      'Wallet age, transaction volume, gas spend, protocol diversity, and activity quality in one report.',
  },
  {
    icon: BarChart3,
    title: 'Portfolio Analytics',
    description:
      'Allocation, chain distribution, top holdings, and P/L views designed for repeat monitoring.',
  },
  {
    icon: Shield,
    title: 'Risk Analysis',
    description:
      'Concept scanner for approvals, suspicious contracts, phishing exposure, and wallet hygiene.',
  },
  {
    icon: Layers,
    title: 'Airdrop Research',
    description:
      'Eligibility factors, missing requirements, historical airdrop patterns, and future opportunity tracking.',
  },
  {
    icon: Database,
    title: 'Clean API Layer',
    description:
      'NestJS modules, DTO validation, Prisma persistence, Redis caching, and Swagger documentation.',
  },
  {
    icon: Sparkles,
    title: 'AI Insights',
    description:
      'Planned wallet summaries, behavioral explanations, portfolio suggestions, and risk narratives.',
  },
];

const ROADMAP = [
  'Production wallet and portfolio APIs',
  'Risk engine and NFT metadata indexing',
  'AI wallet insight generation',
  'Enterprise workspaces and webhooks',
];

const FAQ = [
  {
    q: 'Does this guarantee an airdrop?',
    a: 'No. Eligibility estimates are based on public on-chain activity and do not guarantee qualification.',
  },
  {
    q: 'Which networks are supported?',
    a: 'Ethereum, Base, Arbitrum, Optimism, Polygon, BNB Chain, Avalanche, and Solana are represented in the platform model.',
  },
  {
    q: 'Does the app require a private key?',
    a: 'No. Wallet connection is handled through RainbowKit and the platform only reads public wallet activity.',
  },
  {
    q: 'Is every module live?',
    a: 'Wallet, portfolio, auth, health, and airdrop APIs exist. Risk, NFT, transaction, and AI pages are clearly marked as concept or planned views.',
  },
];

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden border-b border-border/60">
        <div className="surface-grid absolute inset-0 opacity-40" />

        <div className="container relative mx-auto grid min-h-[calc(100vh-4rem)] items-center gap-10 px-4 py-16 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary">
              <GitBranch className="h-4 w-4" />
              Open-source Web3 analytics monorepo
            </div>
            <h1 className="text-4xl font-bold tracking-normal text-foreground sm:text-6xl lg:text-7xl">
              Web3 Intelligence Platform
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Multi-chain wallet intelligence, portfolio analytics, airdrop research, and risk
              analysis for teams building serious Web3 tooling.
            </p>

            <div className="mt-9 max-w-2xl">
              <WalletSearchBar size="large" />
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/dashboard">
                  <Wallet className="h-4 w-4" />
                  Launch Dashboard
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`/wallet/${SAMPLE_WALLET_ADDRESS}`}>
                  <Search className="h-4 w-4" />
                  View Sample Wallet
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-lg border border-border bg-card/90 p-4 shadow-2xl shadow-black/30">
              <div className="mb-4 flex items-center justify-between border-b border-border/70 pb-3">
                <div>
                  <p className="text-sm font-medium">Wallet command center</p>
                  <p className="font-mono text-xs text-muted-foreground">0xd8da...c3f6</p>
                </div>
                <span className="rounded-md border border-success/30 bg-success/10 px-2 py-1 text-xs text-success">
                  Live API ready
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ['Portfolio', '$312.9K', '+12.4%'],
                  ['Wallet score', '87/100', 'Healthy'],
                  ['Airdrop fit', 'High', '4 gaps'],
                ].map(([label, value, detail]) => (
                  <div
                    key={label}
                    className="rounded-lg border border-border/70 bg-background/60 p-4"
                  >
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="mt-2 text-2xl font-semibold">{value}</p>
                    <p className="mt-1 text-xs text-primary">{detail}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-lg border border-border/70 bg-background/60 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-medium">Activity heatmap</p>
                    <p className="text-xs text-muted-foreground">Last 12 weeks</p>
                  </div>
                  <div className="grid grid-cols-12 gap-1.5">
                    {Array.from({ length: 84 }, (_, index) => {
                      const opacity = ((index * 19) % 90) + 10;
                      return (
                        <span
                          key={index}
                          className="h-4 rounded-sm bg-primary"
                          style={{ opacity: opacity / 100 }}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-lg border border-border/70 bg-background/60 p-4">
                  <p className="mb-4 text-sm font-medium">Network mix</p>
                  <div className="space-y-3">
                    {CHAIN_DISTRIBUTION.slice(0, 4).map((chain) => (
                      <div key={chain.name}>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{chain.name}</span>
                          <span>{chain.value}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-secondary">
                          <div
                            className="h-2 rounded-full"
                            style={{ width: `${chain.value}%`, backgroundColor: chain.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-card/20 px-4 py-8">
        <div className="container mx-auto grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PLATFORM_METRICS.map((metric) => (
            <div key={metric.label} className="rounded-lg border border-border/70 bg-card/60 p-4">
              <p className="text-xs uppercase text-muted-foreground">{metric.label}</p>
              <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{metric.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-medium text-primary">Product surface</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-normal sm:text-4xl">
              Built for wallet research workflows
            </h2>
            <p className="mt-4 text-muted-foreground">
              The app separates implemented API capabilities from planned intelligence modules, so
              contributors and users can see what works today.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                viewport={{ once: true }}
                className="rounded-lg border border-border/70 bg-card/60 p-5"
              >
                <feature.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-card/20 px-4 py-20">
        <div className="container mx-auto grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-medium text-primary">Supported chains</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-normal">Multi-chain by design</h2>
            <p className="mt-4 text-muted-foreground">
              Shared chain metadata powers both the API and frontend, keeping network names,
              explorers, and native assets consistent across the stack.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {SUPPORTED_CHAINS.filter((chain) => chain.isActive).map((chain) => (
              <div
                key={chain.slug}
                className="flex items-center justify-between rounded-lg border border-border/70 bg-background/60 p-4"
              >
                <div>
                  <p className="font-medium">{chain.name}</p>
                  <p className="text-sm text-muted-foreground">{chain.nativeCurrency.symbol}</p>
                </div>
                <span className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary">
                  {chain.isEvm ? 'EVM' : 'SVM'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="container mx-auto grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-primary">Roadmap</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-normal">Honest delivery status</h2>
            <div className="mt-6 space-y-3">
              {ROADMAP.map((item, index) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-lg border border-border/70 bg-card/60 p-4"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-sm text-primary">
                    {index + 1}
                  </span>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-primary">FAQ</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-normal">What users should know</h2>
            <div className="mt-6 space-y-3">
              {FAQ.map((item) => (
                <div key={item.q} className="rounded-lg border border-border/70 bg-card/60 p-5">
                  <h3 className="font-medium">{item.q}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 px-4 py-10">
        <div className="container mx-auto flex flex-col justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <p>Web3 Intelligence Platform v0.1.0</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/dashboard" className="hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/portfolio" className="hover:text-foreground">
              Portfolio
            </Link>
            <Link href="/risk" className="hover:text-foreground">
              Risk
            </Link>
            <Link href="/settings" className="hover:text-foreground">
              Settings
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
