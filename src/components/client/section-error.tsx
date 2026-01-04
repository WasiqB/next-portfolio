'use client';

import { AlertTriangle, Loader2Icon, RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface SectionErrorProps {
  title?: string;
  message?: string;
}

export function SectionError({
  title = 'Unable to Load Section',
  message = 'Something went wrong while fetching the data. Please try refreshing to load the content.',
}: SectionErrorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRetry = () => {
    setLoading(true);
    router.refresh();
    setLoading(false);
  };

  return (
    <Card className='border-destructive/50 bg-destructive/5'>
      <CardContent className='flex flex-col items-center justify-center p-8 space-y-4 text-center'>
        <div className='rounded-full bg-destructive/10 p-3'>
          <AlertTriangle className='h-10 w-10 text-destructive' />
        </div>
        <div className='space-y-2'>
          <h3 className='text-lg font-semibold text-destructive'>{title}</h3>
          <p className='text-sm text-muted-foreground max-w-md mx-auto'>{message}</p>
        </div>
        <Button
          variant='outline'
          size='sm'
          onClick={handleRetry}
          className='gap-2 hover:bg-destructive/70 hover:text-foreground transition-colors'
        >
          {loading ? <Loader2Icon className='h-4 w-4 animate-spin' /> : <RefreshCcw className='h-4 w-4' />}
          Refresh Section
        </Button>
      </CardContent>
    </Card>
  );
}
