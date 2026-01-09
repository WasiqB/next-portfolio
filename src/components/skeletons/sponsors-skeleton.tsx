import { Skeleton } from '@/components/ui/skeleton';

export default function SponsorsSkeleton() {
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
