'use client';

import { AlertTriangle, CheckCircle2, Lock, Shield, ShieldAlert, Siren } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { RISK_FLAGS, SECURITY_TIPS } from '@/lib/demo-data';

const SCANNER_MODULES = [
  { label: 'Token approvals', status: 'Concept Preview', value: 68 },
  { label: 'Suspicious contracts', status: 'Coming Soon', value: 42 },
  { label: 'Phishing detection', status: 'Coming Soon', value: 18 },
  { label: 'Known scam contracts', status: 'Coming Soon', value: 7 },
];

export default function RiskPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-medium text-primary">Risk Analysis</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal">Wallet security review</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Concept preview for wallet risk score, suspicious contracts, approvals, phishing checks,
            known scam exposure, and wallet health.
          </p>
        </div>
        <span className="w-fit rounded-md border border-warning/30 bg-warning/10 px-3 py-2 text-sm text-warning">
          Risk engine coming soon
        </span>
      </div>

      <section className="mb-6 grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="rounded-lg border border-border/70 bg-card/60 p-6">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-primary" />
            <div>
              <h2 className="font-semibold">Wallet risk score</h2>
              <p className="text-sm text-muted-foreground">Concept scoring model</p>
            </div>
          </div>
          <div className="mt-8 flex items-end gap-3">
            <span className="text-6xl font-semibold">28</span>
            <span className="pb-2 text-sm text-muted-foreground">/ 100</span>
          </div>
          <Progress value={28} className="mt-6 h-3" />
          <p className="mt-4 text-sm text-muted-foreground">
            Low-to-medium concept risk. Review stale approvals before using this wallet for
            high-value operations.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {SCANNER_MODULES.map((module) => (
            <div key={module.label} className="rounded-lg border border-border/70 bg-card/60 p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-medium">{module.label}</p>
                <span className="rounded-md bg-secondary px-2 py-1 text-xs text-muted-foreground">
                  {module.status}
                </span>
              </div>
              <Progress value={module.value} />
              <p className="mt-3 text-sm text-muted-foreground">
                Scanner UI is designed; production detection requires indexed contract intelligence.
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="rounded-lg border border-border/70 bg-card/60">
          <div className="border-b border-border/70 p-5">
            <h2 className="font-semibold">Risk findings</h2>
            <p className="text-sm text-muted-foreground">Representative scanner output</p>
          </div>
          <div className="divide-y divide-border/70">
            {RISK_FLAGS.map((flag) => (
              <div key={flag.title} className="grid gap-3 p-5 sm:grid-cols-[180px_1fr]">
                <div className="flex items-center gap-2">
                  {flag.severity === 'Clear' ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : flag.severity === 'Medium' ? (
                    <AlertTriangle className="h-5 w-5 text-warning" />
                  ) : (
                    <ShieldAlert className="h-5 w-5 text-primary" />
                  )}
                  <span className="font-medium">{flag.severity}</span>
                </div>
                <div>
                  <p className="font-medium">{flag.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{flag.target}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{flag.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-lg border border-border/70 bg-card/60 p-5">
            <div className="mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Wallet health</h2>
            </div>
            <div className="space-y-3">
              {[
                'Hardware wallet recommended',
                'No high-severity flags',
                '2 approvals need review',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-md border border-border/60 bg-background/50 p-3 text-sm text-muted-foreground"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-border/70 bg-card/60 p-5">
            <div className="mb-4 flex items-center gap-2">
              <Siren className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Security tips</h2>
            </div>
            <div className="space-y-3">
              {SECURITY_TIPS.map((tip) => (
                <p
                  key={tip}
                  className="rounded-md border border-border/60 bg-background/50 p-3 text-sm text-muted-foreground"
                >
                  {tip}
                </p>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
