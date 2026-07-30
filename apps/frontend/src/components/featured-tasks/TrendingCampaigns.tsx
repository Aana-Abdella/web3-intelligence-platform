'use client';

import Link from 'next/link';
import { ArrowRight, Flame, Timer } from 'lucide-react';
import type { TrendingCampaign } from '@web3-intelligence/shared';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getDifficultyColor, getRiskColor } from './utils';

interface TrendingCampaignsProps {
  campaigns: TrendingCampaign[];
}

export function TrendingCampaigns({ campaigns }: TrendingCampaignsProps) {
  return (
    <section
      className="rounded-lg border border-border/70 bg-card/60 p-5"
      aria-labelledby="trending-campaigns-heading"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-primary animate-pulse" aria-hidden="true" />
          <div>
            <h2 id="trending-campaigns-heading" className="font-semibold">
              Trending Campaigns
            </h2>
            <p className="text-xs text-muted-foreground">High-potential ecosystem opportunities</p>
          </div>
        </div>
        <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
          {campaigns.length} Active
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </section>
  );
}

function CampaignCard({ campaign }: { campaign: TrendingCampaign }) {
  return (
    <article className="group relative flex flex-col justify-between rounded-md border border-border/60 bg-background/50 p-4 transition-all duration-200 hover:border-primary/40 hover:bg-card/80 hover:shadow-md">
      <div>
        <div className="mb-2 flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold leading-snug">{campaign.project}</h3>
            <p className="text-xs text-muted-foreground">{campaign.chain}</p>
          </div>
          <span
            className={cn(
              'rounded-md border px-2 py-0.5 text-xs font-medium capitalize',
              getDifficultyColor(campaign.difficulty),
            )}
          >
            {campaign.difficulty}
          </span>
        </div>

        <p className="mb-3 text-xs leading-relaxed text-muted-foreground line-clamp-2">
          {campaign.description}
        </p>

        <div className="mb-3 flex flex-wrap gap-2 text-xs">
          <div className="rounded-md border border-border/50 bg-secondary/50 px-2 py-1">
            <span className="text-muted-foreground">Opportunity: </span>
            <span className="font-medium text-foreground">{campaign.estimatedOpportunity}</span>
          </div>

          <div className="rounded-md border border-border/50 bg-secondary/50 px-2 py-1">
            <span className="text-muted-foreground">Risk: </span>
            <span className={cn('font-medium capitalize', getRiskColor(campaign.risk))}>
              {campaign.risk}
            </span>
          </div>
        </div>

        {campaign.deadline && (
          <div className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Timer className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span>
              Deadline:{' '}
              {new Date(campaign.deadline).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        )}

        <div className="mb-4">
          <div className="mb-1 flex justify-between text-xs text-muted-foreground">
            <span>Popularity</span>
            <span className="font-medium text-foreground">{campaign.popularity}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${campaign.popularity}%` }}
              role="progressbar"
              aria-valuenow={campaign.popularity}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${campaign.project} popularity: ${campaign.popularity}%`}
            />
          </div>
        </div>
      </div>

      <Button asChild size="sm" variant="outline" className="w-full justify-between">
        <Link href={campaign.url ?? '/airdrop'}>
          <span>View Campaign</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Button>
    </article>
  );
}

export function TrendingCampaignsSkeleton() {
  return (
    <div className="rounded-lg border border-border/70 bg-card/60 p-5" aria-hidden="true">
      <div className="mb-4 h-5 w-44 animate-pulse rounded bg-secondary" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-44 animate-pulse rounded-md bg-secondary" />
        ))}
      </div>
    </div>
  );
}
