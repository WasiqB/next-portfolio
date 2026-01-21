import { Skeleton } from '@/components/ui/skeleton';

export default function FooterSkeleton() {
  return (
    <footer className='border-t bg-background'>
      <div className='container max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-8 md:py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* Logo and socials skeleton */}
          <div className='space-y-4 flex flex-col items-center lg:items-start'>
            <Skeleton className='h-10 w-10 rounded-full' />
            <Skeleton className='h-4 w-40' />
            <div className='flex items-center gap-4'>
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className='h-6 w-6 rounded-full' />
              ))}
            </div>
          </div>

          {/* Navigation sections skeleton */}
          <div className='grid grid-cols-2 lg:grid-cols-3 lg:col-span-3 gap-8'>
            {[1, 2, 3].map((section) => (
              <div key={section} className='space-y-4'>
                <Skeleton className='mx-auto lg:mx-0 h-6 w-32' />
                <div className='flex flex-col space-y-2 items-center lg:items-start'>
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className='h-4 w-24' />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-8 pt-8 border-t'>
          <Skeleton className='mx-auto h-4 w-64' />
        </div>
      </div>
    </footer>
  );
}
