import Link from 'next/link';
import { ArrowLeft, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
      <SearchX className="h-12 w-12 text-primary" />
      <h1 className="mt-6 text-3xl font-semibold tracking-normal">Page not found</h1>
      <p className="mt-3 text-muted-foreground">
        The route does not exist in this version of Web3 Intelligence Platform.
      </p>
      <Button asChild className="mt-6">
        <Link href="/dashboard">
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
      </Button>
    </div>
  );
}
