import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface SponsorsSkeletonProps {
  isSection?: boolean;
}

export default function SponsorsSkeleton({ isSection = false }: SponsorsSkeletonProps) {
  if (isSection) {
    return (
      <section id='sponsors' className='container max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-24'>
        <div className='space-y-4 text-center mb-12'>
          <Skeleton className='h-10 md:h-12 w-64 mx-auto rounded-lg' />
          <Skeleton className='h-6 w-full max-w-2xl mx-auto rounded-lg' />
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto mb-12'>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={`skeleton-${index}`} className='flex justify-center'>
              <Skeleton className='w-24 h-24 md:w-32 md:h-32 rounded-full' />
            </div>
          ))}
        </div>

        <div className='flex justify-center'>
          <Skeleton className='h-10 w-40 rounded-md' />
        </div>
      </section>
    );
  }

  return (
    <div className='container py-12 max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24'>
      <div className='flex items-center gap-4 mb-8'>
        <div className='flex items-center gap-2 h-9 px-3 border rounded-md bg-muted/50 w-32'>
          <ArrowLeft className='h-4 w-4 text-muted-foreground' />
          <Skeleton className='h-4 w-16' />
        </div>
        <Skeleton className='h-9 w-48 rounded-lg' />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16'>
        <div className='md:col-span-2'>
          <Card>
            <CardHeader>
              <Skeleton className='h-8 w-48 mb-2' />
              <Skeleton className='h-4 w-64' />
            </CardHeader>
            <CardContent className='space-y-4'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-2/3' />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <Skeleton className='h-8 w-48 mb-2' />
              <Skeleton className='h-4 w-64' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-10 w-full rounded-md' />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className='space-y-16'>
        <Skeleton className='h-8 w-48 mb-8' />
        {Array.from({ length: 2 }).map((_, sectionIndex) => (
          <div key={sectionIndex} className='mb-12'>
            <Skeleton className='h-6 w-40 mb-4' />
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
              {Array.from({ length: 5 }).map((_, cardIndex) => (
                <div key={cardIndex} className='flex flex-col items-center'>
                  <Skeleton className='w-24 h-24 sm:w-28 sm:h-28 rounded-full mb-3' />
                  <Skeleton className='h-4 w-24 mb-1' />
                  <Skeleton className='h-3 w-16' />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
