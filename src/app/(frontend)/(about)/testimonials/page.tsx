import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ImageBox } from '@/components/image-box';
import TestimonialContent from '@/components/pages/testimonial-content';
import TestimonialsSkeleton from '@/components/skeletons/testimonials-skeleton';
import { getCollectionData } from '@/payload/fetchers/collections';
import type { Media, Testimonial } from '@/payload/types';

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'What my clients, colleagues and friends say about me?',
};

async function TestimonialData() {
  const testimonials = await getCollectionData<Testimonial[]>('testimonials');

  const testimonialsWithImages = testimonials.map((testimonial) => ({
    ...testimonial,
    imageNode: (
      <ImageBox media={testimonial.image as Media} imageClassName='object-cover' fill alt={testimonial.name} />
    ),
  }));

  return <TestimonialContent testimonials={testimonialsWithImages} />;
}

export default function TestimonialsPage() {
  return (
    <Suspense fallback={<TestimonialsSkeleton />}>
      <TestimonialData />
    </Suspense>
  );
}
