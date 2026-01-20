import { ArrowLeft, GitFork, Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface ProjectsSkeletonProps {
  isSection?: boolean;
}

export default function ProjectsSkeleton({ isSection = false }: ProjectsSkeletonProps) {
  const header = isSection ? (
    <div className='space-y-4 text-center mb-12'>
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
  );

  const content = (
    <>
      {header}

      {/* Projects grid skeleton */}
      <div className={`grid grid-cols-1 ${isSection ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
        {Array.from({ length: isSection ? 4 : 6 }).map((_, index) => (
          <Card key={`skeleton-${index}`} className='h-full flex flex-col overflow-hidden'>
            <CardHeader>
              {/* Project title skeleton */}
              <Skeleton className='h-6 w-3/4 mb-2 rounded-lg' />
              {/* Project description skeleton */}
              <Skeleton className='h-4 w-full rounded-lg' />
              <Skeleton className='h-4 w-2/3 mt-1 rounded-lg' />
            </CardHeader>
            <CardContent>
              {/* Tags skeleton */}
              <div className='flex flex-wrap gap-2 mb-4'>
                {Array.from({ length: 3 }).map((_, tagIndex) => (
                  <Skeleton key={`tag-${tagIndex}`} className='h-5 w-16 rounded-full' />
                ))}
              </div>
            </CardContent>
            <CardFooter className='flex justify-end gap-4 text-sm text-muted-foreground pt-0'>
              {/* Stars skeleton */}
              <div className='flex items-center gap-1'>
                <Star className='h-4 w-4' />
                <Skeleton className='h-5 w-8 rounded-lg' />
              </div>
              {/* Forks skeleton */}
              <div className='flex items-center gap-1'>
                <GitFork className='h-4 w-4' />
                <Skeleton className='h-5 w-8 rounded-lg' />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {isSection && (
        /* View All Projects button skeleton */
        <div className='flex justify-center mt-8'>
          <Skeleton className='h-10 w-40 rounded-md' />
        </div>
      )}

      {!isSection && (
        <div className='mt-16 bg-muted/50 rounded-lg p-8 text-center'>
          <Skeleton className='h-8 w-64 mx-auto mb-4' />
          <Skeleton className='h-4 w-full max-w-2xl mx-auto mb-6' />
          <Skeleton className='h-10 w-40 mx-auto rounded-md' />
        </div>
      )}
    </>
  );

  if (isSection) {
    return (
      <section id='projects' className='max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-24'>
        {content}
      </section>
    );
  }

  return <div className='container py-12 max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24'>{content}</div>;
}
