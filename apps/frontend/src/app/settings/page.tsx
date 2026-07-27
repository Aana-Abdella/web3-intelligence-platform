'use client';

import { Bell, Database, KeyRound, Moon, Save, Shield, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NETWORK_OPTIONS } from '@/lib/demo-data';

export default function SettingsPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-primary">Settings</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal">Workspace preferences</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Concept settings page for API preferences, notifications, chain selection, and security
          controls.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="space-y-6">
          <div className="rounded-lg border border-border/70 bg-card/60 p-5">
            <div className="mb-5 flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Analysis defaults</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm">
                <span className="text-muted-foreground">Default address</span>
                <Input placeholder="0x..." />
              </label>
              <label className="space-y-2 text-sm">
                <span className="text-muted-foreground">Cache refresh window</span>
                <Input placeholder="5 minutes" />
              </label>
            </div>
          </div>

          <div className="rounded-lg border border-border/70 bg-card/60 p-5">
            <div className="mb-5 flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Enabled networks</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {NETWORK_OPTIONS.map((network) => (
                <label
                  key={network.id}
                  className="flex items-center justify-between rounded-md border border-border/60 bg-background/50 p-3 text-sm"
                >
                  <span>{network.name}</span>
                  <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
                </label>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-lg border border-border/70 bg-card/60 p-5">
            <div className="mb-4 flex items-center gap-2">
              <Moon className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Appearance</h2>
            </div>
            <label className="flex items-center justify-between rounded-md border border-border/60 bg-background/50 p-3 text-sm">
              <span>Dark mode</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
            </label>
          </section>

          <section className="rounded-lg border border-border/70 bg-card/60 p-5">
            <div className="mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Notifications</h2>
            </div>
            <div className="space-y-3">
              {['Airdrop score changes', 'Risk alerts', 'Portfolio thresholds'].map((item) => (
                <label
                  key={item}
                  className="flex items-center justify-between rounded-md border border-border/60 bg-background/50 p-3 text-sm"
                >
                  <span>{item}</span>
                  <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-border/70 bg-card/60 p-5">
            <div className="mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Security</h2>
            </div>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <KeyRound className="h-4 w-4" />
                Manage API keys
              </Button>
              <Button className="w-full justify-start">
                <Save className="h-4 w-4" />
                Save preferences
              </Button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
