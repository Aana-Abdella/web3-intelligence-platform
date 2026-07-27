'use client';

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Activity, BarChart3, Fuel, Network, Repeat2, WalletCards } from 'lucide-react';
import {
  ACTIVITY_HEATMAP,
  PORTFOLIO_HISTORY,
  PROTOCOL_USAGE,
  WALLET_ANALYTICS,
} from '@/lib/demo-data';

const NETWORK_DATA = [
  { chain: 'Ethereum', transactions: 5400 },
  { chain: 'Base', transactions: 3280 },
  { chain: 'Arbitrum', transactions: 2410 },
  { chain: 'Optimism', transactions: 1860 },
  { chain: 'Polygon', transactions: 1210 },
];

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-primary">Wallet Analytics</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal">On-chain behavior analysis</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Concept dashboard for wallet age, transaction count, gas spend, protocol usage, bridge
          behavior, DeFi activity, and network distribution.
        </p>
      </div>

      <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { label: 'Wallet age', value: '3,216d', icon: WalletCards },
          { label: 'Transactions', value: '14.9K', icon: Activity },
          { label: 'Gas spent', value: '$38.4K', icon: Fuel },
          { label: 'Protocols', value: '67', icon: Repeat2 },
          { label: 'Networks', value: '8', icon: Network },
        ].map((metric) => (
          <div key={metric.label} className="rounded-lg border border-border/70 bg-card/60 p-5">
            <metric.icon className="h-5 w-5 text-primary" />
            <p className="mt-4 text-sm text-muted-foreground">{metric.label}</p>
            <p className="mt-1 text-2xl font-semibold">{metric.value}</p>
          </div>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-lg border border-border/70 bg-card/60 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Historical wallet value</h2>
              <p className="text-sm text-muted-foreground">Representative monthly trend</p>
            </div>
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PORTFOLIO_HISTORY}>
                <defs>
                  <linearGradient id="valueFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `$${Number(value) / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 8,
                  }}
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Value']}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#22d3ee"
                  fill="url(#valueFill)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-lg border border-border/70 bg-card/60 p-5">
          <div className="mb-5">
            <h2 className="font-semibold">Activity heatmap</h2>
            <p className="text-sm text-muted-foreground">
              Concept preview across the last 12 weeks
            </p>
          </div>
          <div className="grid grid-cols-12 gap-1.5">
            {ACTIVITY_HEATMAP.map((cell) => (
              <span
                key={`${cell.week}-${cell.day}`}
                className="h-5 rounded-sm bg-primary"
                style={{ opacity: Math.max(cell.value, 12) / 100 }}
                title={`Activity ${cell.value}`}
              />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>Less active</span>
            <span>More active</span>
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-border/70 bg-card/60 p-5">
          <h2 className="mb-5 font-semibold">Network distribution</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={NETWORK_DATA}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                <XAxis dataKey="chain" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 8,
                  }}
                />
                <Bar dataKey="transactions" fill="#34d399" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-lg border border-border/70 bg-card/60 p-5">
          <h2 className="mb-5 font-semibold">Wallet score factors</h2>
          <div className="space-y-4">
            {WALLET_ANALYTICS.map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="text-muted-foreground">{item.value}</span>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-lg border border-border/70 bg-card/60 p-5">
        <h2 className="mb-5 font-semibold">Protocol usage</h2>
        <div className="grid gap-3 md:grid-cols-5">
          {PROTOCOL_USAGE.map((protocol) => (
            <div
              key={protocol.protocol}
              className="rounded-md border border-border/60 bg-background/50 p-4"
            >
              <p className="font-medium">{protocol.protocol}</p>
              <p className="mt-1 text-sm text-muted-foreground">{protocol.category}</p>
              <p className="mt-4 text-2xl font-semibold">{protocol.interactions}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
