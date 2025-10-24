'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/50 px-4 text-center">
      <h1 className="text-7xl font-extrabold text-primary mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/">Go to Homepage</Link>
      </Button>
    </div>
  );
}
