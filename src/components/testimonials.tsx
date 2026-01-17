import { Suspense } from 'react';
import { getCollectionData } from '@/payload/fetchers/collections';
import { getGlobalConfig } from '@/payload/fetchers/globals';
import type { HomePage, Media, Testimonial } from '@/payload/types';
import { SectionError } from './client/section-error';
import TestimonialsClient from './client/testimonials-client';
import { ImageBox } from './image-box';
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

  const testimonialsWithImages = testimonials.map((testimonial) => ({
    ...testimonial,
    imageNode: (
      <ImageBox media={testimonial.image as Media} imageClassName='object-cover' fill alt={testimonial.name} />
    ),
  }));

  return (
    <Suspense fallback={<TestimonialsSkeleton isSection />}>
      <TestimonialsClient testimonialSection={testimonialSection} testimonials={testimonialsWithImages} />
    </Suspense>
  );
}
