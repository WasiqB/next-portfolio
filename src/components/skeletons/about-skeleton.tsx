import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function AboutSkeleton() {
  return (
    <div className='container py-12 max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24'>
      <div className='flex items-center gap-4 mb-8'>
        <div className='flex items-center gap-2 h-9 px-3 border rounded-md bg-muted/50 w-32'>
          <ArrowLeft className='h-4 w-4 text-muted-foreground' />
          <Skeleton className='h-4 w-16' />
        </div>
        <Skeleton className='h-9 w-48 rounded-lg' />
      </div>

      {/* Mobile profile image skeleton */}
      <div className='md:hidden mb-8'>
        <Card>
          <CardContent className='p-0'>
            <Skeleton className='aspect-square w-full rounded-none' />
          </CardContent>
        </Card>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>
        <div className='md:col-span-2'>
          <Card>
            <CardHeader>
              <Skeleton className='h-8 w-64 mb-2' />
              <Skeleton className='h-5 w-48' />
            </CardHeader>
            <CardContent className='space-y-4'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-3/4' />
              <div className='pt-4'>
                <Skeleton className='h-6 w-40 mb-2' />
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-5/6' />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='space-y-8 hidden md:block'>
          <Card>
            <CardContent className='p-0'>
              <Skeleton className='aspect-square w-full rounded-none' />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-32' />
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-3 gap-4'>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className='flex flex-col items-center gap-2 p-3'>
                    <Skeleton className='h-8 w-8 rounded-full' />
                    <Skeleton className='h-3 w-12' />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
