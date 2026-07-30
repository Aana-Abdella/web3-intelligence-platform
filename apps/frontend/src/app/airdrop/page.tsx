'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AlertTriangle, CheckCircle2, Gift, Lightbulb, Target } from 'lucide-react';
import { WalletSearchBar } from '@/components/wallet/wallet-search-bar';
import { airdropApi } from '@/lib/api';
import { Progress } from '@/components/ui/progress';
import { FeaturedTasks } from '@/components/featured-tasks';
import type { AirdropEligibility } from '@web3-intelligence/shared';
import { AIRDROP_FACTORS, AIRDROP_OPPORTUNITIES, HISTORICAL_AIRDROPS } from '@/lib/demo-data';

export default function AirdropPage() {
  const [address, setAddress] = useState('');

  const { data, isLoading, error } = useQuery<AirdropEligibility>({
    queryKey: ['airdrop', address],
    queryFn: () => airdropApi.eligibility(address) as Promise<AirdropEligibility>,
    enabled: !!address,
  });

  const score = data?.score ?? 74;
  const level = data?.level ?? 'high';
  const factorRows =
    data?.factors.map((factor) => ({
      name: factor.name,
      score: factor.score,
      status: `${factor.score}/${factor.maxScore}`,
      description: factor.description,
    })) ??
    AIRDROP_FACTORS.map((factor) => ({
      name: factor.name,
      score: factor.score,
      status: factor.status,
      description: undefined,
    }));
  const opportunityRows =
    data?.potentialCampaigns.map((campaign) => ({
      protocol: campaign.name,
      estimate: campaign.likelihood,
      tasks: campaign.requirements,
    })) ?? AIRDROP_OPPORTUNITIES;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-medium text-primary">Airdrop Eligibility Engine</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal">
            Eligibility research workspace
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Score a wallet against public on-chain signals, review completed tasks, and identify
            missing requirements for future protocol opportunities.
          </p>
        </div>
        <span className="w-fit rounded-md border border-warning/30 bg-warning/10 px-3 py-2 text-sm text-warning">
          Estimates only
        </span>
      </div>

      <section className="mb-6 rounded-lg border border-border/70 bg-card/60 p-5">
        <WalletSearchBar size="large" onSearch={setAddress} />
        {address && (
          <p className="mt-3 font-mono text-xs text-muted-foreground">Analyzing {address}</p>
        )}
      </section>

      {error && (
        <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {(error as Error).message}
        </div>
      )}

      <section className="mb-6 grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="rounded-lg border border-border/70 bg-card/60 p-6">
          <div className="flex items-center gap-3">
            <Gift className="h-6 w-6 text-primary" />
            <div>
              <h2 className="font-semibold">Eligibility score</h2>
              <p className="text-sm capitalize text-muted-foreground">
                {isLoading ? 'Loading live estimate' : `${level} likelihood`}
              </p>
            </div>
          </div>
          <div className="mt-8 flex items-end gap-3">
            <span className="text-6xl font-semibold">{score}</span>
            <span className="pb-2 text-sm text-muted-foreground">/ 100</span>
          </div>
          <Progress value={score} className="mt-6 h-3" />
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Eligibility estimates are based on public on-chain activity and do not guarantee
            qualification.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {factorRows.map((factor) => {
            return (
              <div key={factor.name} className="rounded-lg border border-border/70 bg-card/60 p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="font-medium">{factor.name}</p>
                  <span className="rounded-md bg-secondary px-2 py-1 text-xs text-muted-foreground">
                    {factor.status}
                  </span>
                </div>
                <Progress value={factor.score} />
                {factor.description && (
                  <p className="mt-3 text-sm text-muted-foreground">{factor.description}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="rounded-lg border border-border/70 bg-card/60">
          <div className="border-b border-border/70 p-5">
            <h2 className="font-semibold">Future opportunities</h2>
            <p className="text-sm text-muted-foreground">
              Supported protocols and likely requirement themes
            </p>
          </div>
          <div className="divide-y divide-border/70">
            {opportunityRows.map((opportunity) => {
              return (
                <div key={opportunity.protocol} className="p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">{opportunity.protocol}</p>
                      <p className="text-sm capitalize text-muted-foreground">
                        Estimated qualification: {opportunity.estimate}
                      </p>
                    </div>
                    <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-1 text-xs text-primary">
                      Concept Preview
                    </span>
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    {opportunity.tasks.map((task) => (
                      <div
                        key={task}
                        className="rounded-md border border-border/60 bg-background/50 p-3 text-sm text-muted-foreground"
                      >
                        {task}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-lg border border-border/70 bg-card/60 p-5">
            <div className="mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Completed tasks</h2>
            </div>
            <div className="space-y-3">
              {['Active wallet history', 'L2 usage', 'Bridge interactions', 'DEX swaps'].map(
                (task) => (
                  <p
                    key={task}
                    className="rounded-md border border-border/60 bg-background/50 p-3 text-sm text-muted-foreground"
                  >
                    {task}
                  </p>
                ),
              )}
            </div>
          </section>

          <section className="rounded-lg border border-border/70 bg-card/60 p-5">
            <div className="mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Missing requirements</h2>
            </div>
            <div className="space-y-3">
              {(
                data?.suggestions ?? [
                  'Add governance participation',
                  'Increase sustained liquidity duration',
                  'Avoid repetitive low-value activity',
                ]
              ).map((item) => (
                <p
                  key={item}
                  className="rounded-md border border-border/60 bg-background/50 p-3 text-sm text-muted-foreground"
                >
                  {item}
                </p>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-border/70 bg-card/60 p-5">
            <div className="mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Historical airdrops</h2>
            </div>
            <div className="space-y-3">
              {HISTORICAL_AIRDROPS.map((drop) => (
                <div
                  key={drop.name}
                  className="rounded-md border border-border/60 bg-background/50 p-3"
                >
                  <p className="text-sm font-medium">{drop.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{drop.criteria}</p>
                  <p className="mt-2 text-xs text-primary">{drop.lesson}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-warning/30 bg-warning/10 p-5">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 shrink-0 text-warning" />
              <p className="text-sm leading-6 text-warning">
                Eligibility estimates are based on public on-chain activity and do not guarantee
                qualification.
              </p>
            </div>
          </section>
        </aside>
      </div>

      <div className="mt-12">
        <FeaturedTasks />
      </div>
    </div>
  );
}
