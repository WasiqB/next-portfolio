import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface ServicesSkeletonProps {
  isSection?: boolean;
}

export default function ServicesSkeleton({ isSection = false }: ServicesSkeletonProps) {
  const header = isSection ? (
    <div className='space-y-4 text-center mb-12'>
      <Skeleton className='h-10 md:h-12 w-64 mx-auto rounded-lg' />
      <Skeleton className='h-6 w-full max-w-2xl mx-auto rounded-lg' />
    </div>
  ) : (
    <div className='space-y-8 mb-12'>
      <div className='flex items-center gap-4 mb-8'>
        <div className='flex items-center gap-2 h-9 px-3 border rounded-md bg-muted/50 w-32'>
          <ArrowLeft className='h-4 w-4 text-muted-foreground' />
          <Skeleton className='h-4 w-16' />
        </div>
        <Skeleton className='h-9 w-48 rounded-lg' />
      </div>
      <div className='max-w-3xl'>
        <Skeleton className='h-6 w-full rounded-lg' />
        <Skeleton className='h-6 w-2/3 mt-2 rounded-lg' />
      </div>
    </div>
  );

  const content = (
    <>
      {header}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={`skeleton-${index}`} className='h-full border-2 flex flex-col overflow-hidden'>
            <CardHeader className='relative'>
              <Skeleton className='h-10 w-10 mb-4 rounded-md' />
              <Skeleton className='h-7 w-3/4 mb-2' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
            </CardHeader>
            <CardContent className='grow'>
              <ul className='space-y-2 mt-4'>
                {Array.from({ length: 3 }).map((_, i) => (
                  <li key={i} className='flex items-start gap-2'>
                    <Skeleton className='h-1.5 w-1.5 rounded-full mt-2' />
                    <Skeleton className='h-3 w-full' />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {isSection ? (
        <div className='flex justify-center mt-8'>
          <Skeleton className='h-10 w-40 rounded-md' />
        </div>
      ) : (
        <div className='text-center mt-12 p-8 bg-muted/20 rounded-2xl border border-muted-foreground/10'>
          <Skeleton className='h-8 w-64 mx-auto mb-4' />
          <Skeleton className='h-4 w-full max-w-2xl mx-auto mb-6' />
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Skeleton className='h-11 w-48 rounded-md' />
            <Skeleton className='h-11 w-48 rounded-md' />
          </div>
        </div>
      )}
    </>
  );

  if (isSection) {
    return (
      <section id='services' className='max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-24 bg-muted/50'>
        {content}
      </section>
    );
  }

  return <div className='container py-12 max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24'>{content}</div>;
}
