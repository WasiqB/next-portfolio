import { Skeleton } from '@/components/ui/skeleton';

export default function NavbarSkeleton() {
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
      <div className='max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 flex h-16 items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-10 w-10 rounded-full' />
        </div>

        {/* Desktop Navigation Skeleton */}
        <nav className='hidden lg:flex items-center gap-6'>
          <div className='flex items-center gap-4'>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className='h-4 w-20' />
            ))}
          </div>
          <Skeleton className='h-9 w-24' />
          <Skeleton className='h-9 w-9' />
        </nav>

        {/* Mobile Navigation Trigger Skeleton */}
        <div className='lg:hidden'>
          <Skeleton className='h-9 w-9' />
        </div>
      </div>
    </header>
  );
}
