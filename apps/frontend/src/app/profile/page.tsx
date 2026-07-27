'use client';

import { KeyRound, ShieldCheck, UserRound, Wallet } from 'lucide-react';
import { SAMPLE_WALLET_ADDRESS } from '@/lib/demo-data';

export default function ProfilePage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-primary">Profile</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal">Connected wallet profile</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Concept profile view for wallet identity, role, API access, and security posture.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <section className="rounded-lg border border-border/70 bg-card/60 p-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
            <UserRound className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mt-5 text-xl font-semibold">Research wallet</h2>
          <p className="mt-2 font-mono text-sm text-muted-foreground">{SAMPLE_WALLET_ADDRESS}</p>
          <span className="mt-5 inline-flex rounded-md border border-success/30 bg-success/10 px-2 py-1 text-xs text-success">
            User role
          </span>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Primary wallet', value: 'Verified', icon: Wallet },
            { label: 'API keys', value: 'Planned', icon: KeyRound },
            { label: 'Security', value: 'Healthy', icon: ShieldCheck },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-border/70 bg-card/60 p-5">
              <item.icon className="h-5 w-5 text-primary" />
              <p className="mt-4 text-sm text-muted-foreground">{item.label}</p>
              <p className="mt-1 text-xl font-semibold">{item.value}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
