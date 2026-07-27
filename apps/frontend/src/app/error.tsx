'use client';

import { useEffect } from 'react';
import { RotateCcw, TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
      <TriangleAlert className="h-12 w-12 text-destructive" />
      <h1 className="mt-6 text-3xl font-semibold tracking-normal">Something went wrong</h1>
      <p className="mt-3 text-muted-foreground">
        The application hit an unexpected rendering error.
      </p>
      <Button onClick={reset} className="mt-6">
        <RotateCcw className="h-4 w-4" />
        Try again
      </Button>
    </div>
  );
}
