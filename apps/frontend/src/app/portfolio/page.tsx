'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ArrowUpRight, Coins, Layers, PieChart as PieChartIcon, TrendingUp } from 'lucide-react';
import { formatUsd } from '@web3-intelligence/shared';
import { CHAIN_DISTRIBUTION, PORTFOLIO_HISTORY, TOKEN_HOLDINGS } from '@/lib/demo-data';

export default function PortfolioPage() {
  const totalValue = TOKEN_HOLDINGS.reduce((sum, token) => sum + token.valueUsd, 0);
  const totalPnl = PORTFOLIO_HISTORY.at(-1)?.pnl ?? 0;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-primary">Portfolio Analytics</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal">Portfolio overview</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Concept portfolio view with allocation, historical balance, profit/loss, chain
          distribution, top holdings, and token performance.
        </p>
      </div>

      <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total value', value: formatUsd(totalValue), icon: PieChartIcon },
          { label: 'Unrealized P/L', value: formatUsd(totalPnl), icon: TrendingUp },
          { label: 'Top holdings', value: `${TOKEN_HOLDINGS.length}`, icon: Coins },
          { label: 'Active chains', value: `${CHAIN_DISTRIBUTION.length}`, icon: Layers },
        ].map((metric) => (
          <div key={metric.label} className="rounded-lg border border-border/70 bg-card/60 p-5">
            <metric.icon className="h-5 w-5 text-primary" />
            <p className="mt-4 text-sm text-muted-foreground">{metric.label}</p>
            <p className="mt-1 text-2xl font-semibold">{metric.value}</p>
          </div>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-lg border border-border/70 bg-card/60 p-5">
          <h2 className="mb-5 font-semibold">Historical balance</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PORTFOLIO_HISTORY}>
                <defs>
                  <linearGradient id="portfolioFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
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
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Portfolio value']}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#34d399"
                  fill="url(#portfolioFill)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-lg border border-border/70 bg-card/60 p-5">
          <h2 className="mb-5 font-semibold">Asset allocation</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={TOKEN_HOLDINGS}
                  dataKey="allocation"
                  nameKey="symbol"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                >
                  {TOKEN_HOLDINGS.map((token, index) => (
                    <Cell
                      key={token.symbol}
                      fill={
                        ['#22d3ee', '#34d399', '#f59e0b', '#f43f5e', '#a78bfa', '#94a3b8'][index]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 8,
                  }}
                  formatter={(value) => [`${value}%`, 'Allocation']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="rounded-lg border border-border/70 bg-card/60">
          <div className="border-b border-border/70 p-5">
            <h2 className="font-semibold">Top holdings</h2>
            <p className="text-sm text-muted-foreground">
              Representative balances for the portfolio UI
            </p>
          </div>
          <div className="divide-y divide-border/70">
            {TOKEN_HOLDINGS.map((token) => (
              <div
                key={token.symbol}
                className="grid gap-3 p-5 sm:grid-cols-[1fr_140px_120px] sm:items-center"
              >
                <div>
                  <p className="font-medium">{token.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {token.symbol} on {token.chain}
                  </p>
                </div>
                <p className="font-mono text-sm text-muted-foreground">{token.balance}</p>
                <div className="text-left sm:text-right">
                  <p className="font-medium">{formatUsd(token.valueUsd)}</p>
                  <p
                    className={
                      token.performance >= 0 ? 'text-sm text-success' : 'text-sm text-destructive'
                    }
                  >
                    {token.performance >= 0 ? '+' : ''}
                    {token.performance}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="rounded-lg border border-border/70 bg-card/60 p-5">
          <h2 className="mb-5 font-semibold">Chain distribution</h2>
          <div className="space-y-4">
            {CHAIN_DISTRIBUTION.map((chain) => (
              <div key={chain.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>{chain.name}</span>
                  <span className="text-muted-foreground">{chain.value}%</span>
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
          <a
            href="/tokens"
            className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80"
          >
            Open token holdings
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </aside>
      </div>
    </div>
  );
}
