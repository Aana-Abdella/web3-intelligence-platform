'use client';

import { formatUsd, formatCompact, truncateAddress } from '@web3-intelligence/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Wallet, Clock, Coins, Shield, Star, Activity, Fuel } from 'lucide-react';
import type { WalletOverview } from '@web3-intelligence/shared';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: number;
}

function StatCard({ title, value, subtitle, icon, trend }: StatCardProps) {
  return (
    <Card className="glass-hover">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
            {trend !== undefined && (
              <p className={`text-xs mt-1 ${trend >= 0 ? 'text-success' : 'text-destructive'}`}>
                {trend >= 0 ? '+' : ''}
                {trend.toFixed(2)}%
              </p>
            )}
          </div>
          <div className="p-2 rounded-lg bg-primary/10 text-primary">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

interface WalletDashboardProps {
  data: WalletOverview;
}

/** Dashboard overview displaying key wallet metrics */
export function WalletDashboard({ data }: WalletDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{data.ensName ?? truncateAddress(data.address)}</h1>
          <p className="text-muted-foreground font-mono text-sm">{data.address}</p>
          {data.labels.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {data.labels.map((label) => (
                <span
                  key={label}
                  className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Portfolio Value"
          value={formatUsd(data.portfolioValueUsd)}
          icon={<Wallet className="h-5 w-5" />}
        />
        <StatCard
          title="Wallet Age"
          value={`${data.walletAgeDays} days`}
          subtitle={
            data.firstActivityAt
              ? `Since ${new Date(data.firstActivityAt).toLocaleDateString()}`
              : undefined
          }
          icon={<Clock className="h-5 w-5" />}
        />
        <StatCard
          title="Tokens / NFTs"
          value={`${data.tokenCount} / ${data.nftCount}`}
          icon={<Coins className="h-5 w-5" />}
        />
        <StatCard
          title="Transactions"
          value={formatCompact(data.transactionCount)}
          icon={<Activity className="h-5 w-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4" /> Risk Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold">{data.riskScore}</span>
              <Progress value={data.riskScore} className="flex-1" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {data.riskScore <= 30
                ? 'Low risk wallet'
                : data.riskScore <= 60
                  ? 'Moderate risk'
                  : 'High risk — review recommended'}
            </p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Star className="h-4 w-4" /> Reputation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold">{data.reputationScore}</span>
              <Progress value={data.reputationScore} className="flex-1" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">On-chain reputation score</p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Fuel className="h-4 w-4" /> Gas Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold">{formatUsd(data.totalGasSpentUsd)}</span>
            <p className="text-sm text-muted-foreground mt-2">Total gas fees paid</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
