import { ArrowLeft, CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface BlogsSkeletonProps {
  isSection?: boolean;
}

export default function BlogsSkeleton({ isSection = false }: BlogsSkeletonProps) {
  return (
    <section
      id='blogs'
      className={
        isSection
          ? 'container max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-24'
          : 'container py-12 max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24'
      }
    >
      {/* Header Skeleton */}
      {isSection ? (
        <div className='space-y-4 text-center mb-8'>
          <Skeleton className='h-10 md:h-12 w-64 mx-auto rounded-lg' />
          <Skeleton className='h-6 w-full max-w-2xl mx-auto rounded-lg' />
        </div>
      ) : (
        <div className='flex items-center gap-4 mb-8'>
          <div className='flex items-center gap-2 h-9 px-3 border rounded-md bg-muted/50 w-32'>
            <ArrowLeft className='h-4 w-4 text-muted-foreground' />
            <Skeleton className='h-4 w-16' />
          </div>
          <Skeleton className='h-9 w-48 rounded-lg' />
        </div>
      )}

      {/* Tabs skeleton */}
      <div className='mb-8'>
        <div className='flex justify-center'>
          <div className='flex gap-2 p-1 bg-muted rounded-lg'>
            <Skeleton className='h-9 w-24 rounded-md' />
            <Skeleton className='h-9 w-20 rounded-md' />
            <Skeleton className='h-9 w-20 rounded-md' />
          </div>
        </div>
      </div>

      {/* Blog cards grid skeleton */}
      <div
        className={
          isSection
            ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
            : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
        }
      >
        {Array.from({ length: isSection ? 4 : 8 }).map((_, index) => (
          <Card key={`skeleton-${index}`} className='h-full flex flex-col overflow-hidden border-2'>
            {/* Image skeleton */}
            <div className='relative h-48 w-full bg-muted'>
              <div className='absolute top-2 right-2'>
                <Skeleton className='h-6 w-16 rounded' />
              </div>
            </div>
            <CardHeader className='p-4 pb-2'>
              {/* Title skeleton */}
              <Skeleton className='h-6 w-3/4 mb-2 rounded-lg' />
            </CardHeader>
            <CardContent className='p-4 pt-0 grow'>
              {/* Description skeleton */}
              <Skeleton className='h-4 w-full mb-2 rounded-lg' />
              <Skeleton className='h-4 w-5/6 mb-2 rounded-lg' />
              <Skeleton className='h-4 w-2/3 mb-3 rounded-lg' />
              {/* Tags skeleton */}
              <div className='flex flex-wrap gap-2 mb-3'>
                {Array.from({ length: 3 }).map((_, tagIndex) => (
                  <Skeleton key={`tag-${tagIndex}`} className='h-5 w-16 rounded-full' />
                ))}
              </div>
              {/* Date skeleton */}
              <div className='flex items-center text-xs text-muted-foreground'>
                <CalendarIcon className='h-3.5 w-3.5 mr-1' />
                <Skeleton className='h-4 w-24 rounded-lg' />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View All Blogs button skeleton */}
      {isSection && (
        <div className='flex justify-center mt-8'>
          <Skeleton className='h-10 w-40 rounded-md' />
        </div>
      )}
    </section>
  );
}
