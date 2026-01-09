import { Suspense } from 'react';
import { getCollectionData } from '@/payload/fetchers/collections';
import { getGlobalConfig } from '@/payload/fetchers/globals';
import type { HomePage, Testimonial } from '@/payload/types';
import { SectionError } from './client/section-error';
import TestimonialsClient from './client/testimonials-client';
import TestimonialsSkeleton from './skeletons/testimonials-skeleton';

export default async function Testimonials() {
  const data = await getGlobalConfig<HomePage>('homePage');
  const testimonialSection = data?.testimonialSection;
  const testimonials = await getCollectionData<Testimonial[]>('testimonials');

  if (!testimonialSection || !testimonials) {
    return (
      <section id='testimonials' className='container py-12 max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24'>
        <SectionError title='Testimonial section Unavailable' message='Failed to load testimonial section data' />
      </section>
    );
  }

  return (
    <Suspense fallback={<TestimonialsSkeleton />}>
      <TestimonialsClient testimonialSection={testimonialSection} testimonials={testimonials} />
    </Suspense>
  );
}
