import { ArrowLeft, Eye, Heart, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface VideosSkeletonProps {
  isSection?: boolean;
}

export default function VideosSkeleton({ isSection = false }: VideosSkeletonProps) {
  if (isSection) {
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

  return (
    <div className='container py-12 max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24'>
      <div className='flex items-center gap-4 mb-8'>
        <div className='flex items-center gap-2 h-9 px-3 border rounded-md bg-muted/50 w-32'>
          <ArrowLeft className='h-4 w-4 text-muted-foreground' />
          <Skeleton className='h-4 w-16' />
        </div>
        <Skeleton className='h-9 w-48 rounded-lg' />
      </div>

      <div className='mb-8'>
        <div className='flex justify-center'>
          <div className='inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 gap-1'>
            <Skeleton className='h-9 w-24 rounded-sm' />
            <Skeleton className='h-9 w-20 rounded-sm' />
            <Skeleton className='h-9 w-20 rounded-sm' />
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={`skeleton-page-${index}`} className='h-full flex flex-col overflow-hidden'>
              <Skeleton className='aspect-video w-full' />
              <CardContent className='p-4 grow'>
                <Skeleton className='h-4 w-full mb-2 rounded-lg' />
                <Skeleton className='h-4 w-3/4 mb-2 rounded-lg' />
                <Skeleton className='h-3 w-1/2 rounded-lg' />
              </CardContent>
              <CardFooter className='p-4 pt-0 flex justify-between items-center'>
                <div className='flex items-center gap-3'>
                  <Skeleton className='h-3 w-8 rounded-lg' />
                  <Skeleton className='h-3 w-8 rounded-lg' />
                </div>
                <Skeleton className='h-3 w-16 rounded-lg' />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className='mt-16 bg-muted/5 rounded-lg p-8 text-center'>
        <Skeleton className='h-8 w-64 mx-auto mb-4' />
        <Skeleton className='h-4 w-full max-w-2xl mx-auto mb-6' />
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Skeleton className='h-11 w-40' />
          <Skeleton className='h-11 w-40' />
        </div>
      </div>
    </div>
  );
}
