'use client';

import { Brain, Lightbulb, ShieldQuestion, Sparkles, TrendingUp } from 'lucide-react';

const INSIGHT_BLOCKS = [
  {
    title: 'Wallet summary',
    icon: Brain,
    detail:
      'Coming Soon: summarize activity clusters, protocol usage, and wallet intent in plain language.',
  },
  {
    title: 'Behavior analysis',
    icon: Sparkles,
    detail: 'Coming Soon: identify trading, bridging, collecting, and DeFi participation patterns.',
  },
  {
    title: 'Recommendations',
    icon: Lightbulb,
    detail:
      'Coming Soon: generate next-best actions for safety, diversification, and research workflows.',
  },
  {
    title: 'Portfolio suggestions',
    icon: TrendingUp,
    detail: 'Coming Soon: explain concentration, volatility, and network exposure opportunities.',
  },
  {
    title: 'Risk explanation',
    icon: ShieldQuestion,
    detail:
      'Coming Soon: translate risk flags into user-readable severity and remediation guidance.',
  },
];

export default function InsightsPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-medium text-primary">AI Insights</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal">AI wallet intelligence</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Planned AI layer for summaries, behavior analysis, recommendations, portfolio
            suggestions, and risk explanations.
          </p>
        </div>
        <span className="w-fit rounded-md border border-warning/30 bg-warning/10 px-3 py-2 text-sm text-warning">
          Coming Soon
        </span>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        {INSIGHT_BLOCKS.map((block) => (
          <div key={block.title} className="rounded-lg border border-border/70 bg-card/60 p-5">
            <block.icon className="h-5 w-5 text-primary" />
            <h2 className="mt-4 font-semibold">{block.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{block.detail}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
