'use client';

import { Bell, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NOTIFICATIONS } from '@/lib/demo-data';

export default function NotificationsPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-primary">Notifications</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal">Wallet alerts</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Concept notification center for portfolio, risk, and airdrop changes.
          </p>
        </div>
        <Button variant="outline">
          <CheckCheck className="h-4 w-4" />
          Mark all read
        </Button>
      </div>

      <section className="overflow-hidden rounded-lg border border-border/70 bg-card/60">
        <div className="divide-y divide-border/70">
          {NOTIFICATIONS.map((notification) => (
            <div key={notification.title} className="flex gap-4 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/10">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{notification.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{notification.detail}</p>
                <p className="mt-2 text-xs text-muted-foreground">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
