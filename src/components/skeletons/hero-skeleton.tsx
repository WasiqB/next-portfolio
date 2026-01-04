import { Skeleton } from '@/components/ui/skeleton';

export default function HeroSkeleton() {
  return (
    <section className='max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-24 lg:py-32'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
        <div className='space-y-6 order-2 md:order-1'>
          {/* Name skeleton */}
          <Skeleton className='h-12 md:h-14 lg:h-16 w-3/4 rounded-lg' />

          {/* Typing animation skeleton */}
          <div className='h-12'>
            <Skeleton className='h-8 w-2/3 rounded-lg' />
          </div>

          {/* Bio skeleton */}
          <div className='space-y-2 max-w-prose'>
            <Skeleton className='h-6 w-full rounded-lg' />
            <Skeleton className='h-6 w-5/6 rounded-lg' />
            <Skeleton className='h-6 w-4/5 rounded-lg' />
          </div>

          {/* Buttons skeleton */}
          <div className='flex flex-wrap gap-4'>
            <Skeleton className='h-10 w-32 rounded-md' />
            <Skeleton className='h-10 w-32 rounded-md' />
          </div>

          {/* Social links skeleton */}
          <div className='flex items-center gap-4 pt-4'>
            <Skeleton className='h-6 w-6 rounded-full' />
            <Skeleton className='h-6 w-6 rounded-full' />
            <Skeleton className='h-6 w-6 rounded-full' />
            <Skeleton className='h-6 w-6 rounded-full' />
          </div>
        </div>

        {/* Profile image skeleton */}
        <div className='flex justify-center order-1 md:order-2 mb-8 md:mb-0'>
          <Skeleton className='w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full' />
        </div>
      </div>
    </section>
  );
}
