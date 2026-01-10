import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ServicesSkeleton() {
  return (
    <section id='services' className='max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-24 bg-muted/50'>
      <div className='space-y-4 text-center mb-12'>
        <Skeleton className='h-10 md:h-12 w-64 mx-auto rounded-lg' />
        <Skeleton className='h-6 w-full max-w-2xl mx-auto rounded-lg' />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className='h-full border-2'>
            <CardHeader>
              <Skeleton className='h-10 w-10 mb-4 rounded-md' />
              <Skeleton className='h-7 w-3/4 mb-2' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-4 w-32' />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='flex justify-center mt-8'>
        <Skeleton className='h-10 w-40 rounded-md' />
      </div>
    </section>
  );
}
