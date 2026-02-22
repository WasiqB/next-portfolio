import testimonials from '@/data/collections/testimonials.json';
import { testimonialSection } from '@/data/page-data/home-page.json';
import type { Testimonial } from '@/types/portfolio-types';
import { SectionError } from './client/section-error';
import TestimonialsClient from './client/testimonials-client';
import { ImageBox } from './image-box';

export default function Testimonials() {
  if (!testimonialSection || !testimonials) {
    return (
      <section id='testimonials' className='container py-12 max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24'>
        <SectionError title='Testimonial section Unavailable' message='Failed to load testimonial section data' />
      </section>
    );
  }

  const testimonialsWithImages = testimonials.map((testimonial, index) => ({
    ...testimonial,
    imageNode: (
      <ImageBox
        imageUrl={testimonial.avatar}
        imageClassName='object-cover'
        priority={index < 4}
        fill
        alt={testimonial.name}
      />
    ),
  }));

  return (
    <TestimonialsClient
      testimonialSection={testimonialSection}
      testimonials={testimonialsWithImages as Testimonial[]}
    />
  );
}
