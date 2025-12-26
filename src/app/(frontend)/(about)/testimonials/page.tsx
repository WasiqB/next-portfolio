import type { Metadata } from 'next';
import TestimonialContent from '@/components/pages/testimonial-content';

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'What my clients, colleagues and friends say about me?',
};

export default function TestimonialsPage() {
  return <TestimonialContent />;
}
