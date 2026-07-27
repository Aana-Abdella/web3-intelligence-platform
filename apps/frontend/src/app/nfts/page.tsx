'use client';

import { Image, LayoutGrid, ShieldCheck, Sparkles } from 'lucide-react';
import { NFT_COLLECTIONS } from '@/lib/demo-data';

export default function NftsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-medium text-primary">NFTs</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal">
            NFT activity and collections
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Concept gallery for collection exposure, mint history, floor estimates, and NFT activity
            signals.
          </p>
        </div>
        <span className="w-fit rounded-md border border-warning/30 bg-warning/10 px-3 py-2 text-sm text-warning">
          Metadata indexer coming soon
        </span>
      </div>

      <section className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Collections', value: '34', icon: LayoutGrid },
          { label: 'NFT events', value: '346', icon: Sparkles },
          { label: 'Verified collections', value: '27', icon: ShieldCheck },
        ].map((metric) => (
          <div key={metric.label} className="rounded-lg border border-border/70 bg-card/60 p-5">
            <metric.icon className="h-5 w-5 text-primary" />
            <p className="mt-4 text-sm text-muted-foreground">{metric.label}</p>
            <p className="mt-1 text-2xl font-semibold">{metric.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {NFT_COLLECTIONS.map((collection, index) => (
          <div
            key={collection.name}
            className="overflow-hidden rounded-lg border border-border/70 bg-card/60"
          >
            <div
              className="flex aspect-[4/3] items-center justify-center border-b border-border/70"
              style={{
                background:
                  index % 2 === 0
                    ? 'linear-gradient(135deg, rgba(34,211,238,.18), rgba(245,158,11,.12))'
                    : 'linear-gradient(135deg, rgba(52,211,153,.16), rgba(244,63,94,.12))',
              }}
            >
              <Image className="h-10 w-10 text-primary" />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold">{collection.name}</h2>
                  <p className="text-sm text-muted-foreground">{collection.chain}</p>
                </div>
                <span className="rounded-md bg-secondary px-2 py-1 text-xs text-muted-foreground">
                  {collection.items} items
                </span>
              </div>
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Floor</span>
                <span>{collection.floor}</span>
              </div>
              <p className="mt-3 text-sm text-primary">{collection.status}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
