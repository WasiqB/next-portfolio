import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ContactSkeleton() {
  return (
    <section id='contact' className='max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-24'>
      {/* Section title and description skeleton */}
      <div className='space-y-4 text-center mb-12'>
        <Skeleton className='h-10 md:h-12 w-64 mx-auto rounded-lg' />
        <Skeleton className='h-6 w-full max-w-2xl mx-auto rounded-lg' />
      </div>

      <div className='max-w-4xl mx-auto'>
        <div className='grid grid-cols-1 gap-8'>
          <div className='lg:col-span-2'>
            <Card className='border-2 border-muted shadow-lg'>
              <CardContent className='space-y-6'>
                {/* Form fields skeleton */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {/* Name field skeleton */}
                  <div className='space-y-2'>
                    <Skeleton className='h-5 w-24 rounded-lg' />
                    <Skeleton className='h-12 w-full rounded-md' />
                  </div>
                  {/* Email field skeleton */}
                  <div className='space-y-2'>
                    <Skeleton className='h-5 w-32 rounded-lg' />
                    <Skeleton className='h-12 w-full rounded-md' />
                  </div>
                </div>

                {/* Reason field skeleton */}
                <div className='space-y-2'>
                  <Skeleton className='h-5 w-48 rounded-lg' />
                  <Skeleton className='h-12 w-full rounded-md' />
                </div>

                {/* Message field skeleton */}
                <div className='space-y-2'>
                  <Skeleton className='h-5 w-32 rounded-lg' />
                  <Skeleton className='h-32 w-full rounded-md' />
                </div>

                {/* Submit button skeleton */}
                <Skeleton className='h-12 w-full rounded-md' />

                <div className='text-center pt-4 border-t border-muted'></div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information Section skeleton */}
        <div className='mt-12 text-center'></div>
      </div>
    </section>
  );
}
