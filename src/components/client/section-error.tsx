'use client';

import { AlertTriangle, Loader2Icon, RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { revalidateAction } from '@/components/actions/revalidate';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface SectionErrorProps {
  title?: string;
  message?: string;
  tag?: string;
}

export function SectionError({
  title = 'Unable to Load Section',
  message = 'Something went wrong while fetching the data. Please try refreshing to load the content.',
  tag,
}: SectionErrorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRetry = () => {
    startTransition(async () => {
      if (tag) {
        await revalidateAction(tag);
      }
      router.refresh();
    });
  };

  return (
    <Card className='border-destructive/30 bg-destructive/5 backdrop-blur-sm shadow-xl shadow-destructive/5 border-dashed'>
      <CardContent className='flex flex-col items-center justify-center p-12 space-y-6 text-center animate-in fade-in zoom-in slide-in-from-bottom-4 duration-500'>
        <div className='rounded-full bg-destructive/10 p-4 ring-offset-4 ring-destructive/10 ring-2'>
          <AlertTriangle className='h-12 w-12 text-destructive shadow-sm shadow-destructive/20' />
        </div>
        <div className='space-y-2'>
          <h3 className='text-xl font-bold tracking-tight text-destructive'>{title}</h3>
          <p className='text-muted-foreground/80 max-w-md mx-auto text-balance'>{message}</p>
        </div>
        <Button
          variant='ghost'
          size='lg'
          onClick={handleRetry}
          disabled={isPending}
          className='group relative gap-3 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground ring-1 ring-destructive/30 transition-all duration-300'
        >
          {isPending ? (
            <Loader2Icon className='h-5 w-5 animate-spin' />
          ) : (
            <RefreshCcw className='h-5 w-5 group-hover:rotate-180 transition-transform duration-500' />
          )}
          <span className='font-semibold'>{isPending ? 'Re-Fetching...' : 'Refresh Section'}</span>
        </Button>
      </CardContent>
    </Card>
  );
}
