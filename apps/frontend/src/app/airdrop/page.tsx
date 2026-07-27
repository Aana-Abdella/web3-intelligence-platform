'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { WalletSearchBar } from '@/components/wallet/wallet-search-bar';
import { airdropApi } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatUsd } from '@web3-intelligence/shared';
import { Gift, Lightbulb, Target, Loader2 } from 'lucide-react';
import type { AirdropEligibility } from '@web3-intelligence/shared';

/** Airdrop eligibility checker page */
export default function AirdropPage() {
  const [address, setAddress] = useState('');

  const { data, isLoading, error } = useQuery<AirdropEligibility>({
    queryKey: ['airdrop', address],
    queryFn: () => airdropApi.eligibility(address) as Promise<AirdropEligibility>,
    enabled: !!address,
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Gift className="h-8 w-8 text-primary" /> Airdrop Eligibility
        </h1>
        <p className="text-muted-foreground">
          Analyze your wallet for potential airdrop eligibility based on on-chain activity.
        </p>
      </div>

      <div className="mb-8" onKeyDown={(e) => {
        if (e.key === 'Enter') {
          const input = (e.target as HTMLInputElement);
          if (input.value) setAddress(input.value.trim());
        }
      }}>
        <WalletSearchBar />
      </div>

      {isLoading && (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {error && (
        <p className="text-destructive text-center py-8">{(error as Error).message}</p>
      )}

      {data && (
        <div className="space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Eligibility Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <span className="text-5xl font-bold">{data.score}</span>
                <div className="flex-1">
                  <Progress value={data.score} className="h-3" />
                  <p className="text-sm text-muted-foreground mt-2 capitalize">
                    Level: {data.level}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-lg font-semibold mb-4">Factor Breakdown</h2>
            <div className="grid gap-3">
              {data.factors.map((factor) => (
                <Card key={factor.name} className="glass">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{factor.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {factor.score}/{factor.maxScore}
                      </span>
                    </div>
                    <Progress value={factor.score} className="h-2 mb-1" />
                    <p className="text-xs text-muted-foreground">{factor.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {data.suggestions.length > 0 && (
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Lightbulb className="h-4 w-4" /> Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {data.suggestions.map((s, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary">•</span> {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {data.potentialCampaigns.length > 0 && (
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Target className="h-4 w-4" /> Potential Campaigns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.potentialCampaigns.map((campaign) => (
                    <div key={campaign.name} className="p-3 rounded-lg bg-secondary/50">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{campaign.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                          campaign.likelihood === 'high' ? 'bg-success/20 text-success' :
                          campaign.likelihood === 'medium' ? 'bg-warning/20 text-warning' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {campaign.likelihood}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{campaign.protocol}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
