import { Eye, Heart, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function VideosSkeleton() {
  return (
    <section id='videos' className='container py-12 max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24'>
      {/* Section title and description skeleton */}
      <div className='space-y-4 text-center mb-12'>
        <Skeleton className='h-10 md:h-12 w-64 mx-auto rounded-lg' />
        <Skeleton className='h-6 w-full max-w-2xl mx-auto rounded-lg' />
      </div>

      {/* Tabs skeleton */}
      <div className='mb-8'>
        <div className='flex justify-center'>
          <div className='inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground gap-1'>
            <Skeleton className='h-9 w-24 rounded-sm' />
            <Skeleton className='h-9 w-20 rounded-sm' />
            <Skeleton className='h-9 w-20 rounded-sm' />
          </div>
        </div>

        {/* Videos grid skeleton */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6'>
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={`skeleton-${index}`} className='h-full flex flex-col overflow-hidden'>
              {/* Thumbnail skeleton */}
              <Skeleton className='aspect-video w-full' />
              <CardContent className='p-4 grow'>
                {/* Title skeleton */}
                <Skeleton className='h-4 w-full mb-2 rounded-lg' />
                <Skeleton className='h-4 w-3/4 mb-2 rounded-lg' />
                {/* Date skeleton */}
                <Skeleton className='h-3 w-1/2 rounded-lg' />
              </CardContent>
              <CardFooter className='p-4 pt-0 flex justify-between items-center'>
                {/* Stats skeleton */}
                <div className='flex items-center gap-3'>
                  <div className='flex items-center gap-1'>
                    <Heart className='h-3.5 w-3.5' />
                    <Skeleton className='h-3 w-8 rounded-lg' />
                  </div>
                  <div className='flex items-center gap-1'>
                    <MessageSquare className='h-3.5 w-3.5' />
                    <Skeleton className='h-3 w-8 rounded-lg' />
                  </div>
                </div>
                <div className='flex items-center gap-1'>
                  <Eye className='h-3.5 w-3.5' />
                  <Skeleton className='h-3 w-16 rounded-lg' />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* View All Videos button skeleton */}
      <div className='flex justify-center mt-8'>
        <Skeleton className='h-10 w-40 rounded-md' />
      </div>
    </section>
  );
}
