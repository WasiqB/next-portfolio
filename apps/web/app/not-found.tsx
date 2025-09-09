'use client';

import { Button } from '@wb/ui/components/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='bg-muted/50 flex min-h-screen flex-col items-center justify-center px-4 text-center'>
      <h1 className='text-primary mb-4 text-7xl font-extrabold'>404</h1>
      <h2 className='mb-2 text-2xl font-bold md:text-3xl'>Page Not Found</h2>
      <p className='text-muted-foreground mb-8 max-w-md'>
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Button asChild>
        <Link href='/'>Go to Homepage</Link>
      </Button>
    </div>
  );
}
