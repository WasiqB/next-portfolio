import { Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function TestimonialsSkeleton() {
  return (
    <section id='testimonials' className='container py-12 max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24'>
      <div className='space-y-4 text-center mb-12'>
        <Skeleton className='h-10 md:h-12 w-64 mx-auto rounded-lg' />
        <Skeleton className='h-6 w-full max-w-2xl mx-auto rounded-lg' />
      </div>

      <div className='relative max-w-4xl mx-auto px-4'>
        <div className='flex justify-center'>
          <Card className='max-w-2xl w-full my-5'>
            <CardContent className='p-6 flex flex-col'>
              <div className='mb-4 text-primary opacity-20'>
                <Quote className='h-8 w-8' />
              </div>
              <div className='space-y-2 mb-6'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-[90%]' />
                <Skeleton className='h-4 w-[80%]' />
              </div>
              <div className='flex flex-col md:flex-row items-center mt-auto gap-4 md:gap-0'>
                <Skeleton className='w-12 h-12 rounded-full overflow-hidden' />
                <div className='md:ml-4 text-center md:text-left space-y-2'>
                  <Skeleton className='h-5 w-32' />
                  <Skeleton className='h-4 w-48' />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='flex justify-center gap-2 mt-6'>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className='w-2 h-2 rounded-full' />
          ))}
        </div>
      </div>

      <div className='flex justify-center mt-8'>
        <Skeleton className='h-10 w-40 rounded-md' />
      </div>
    </section>
  );
}
