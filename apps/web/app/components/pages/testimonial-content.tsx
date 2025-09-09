import { Data } from '@/app/data/portfolio-data';
import { Testimonial } from '@/app/types/portfolio-types';
import { Button } from '@wb/ui/components/button';
import { Card, CardContent } from '@wb/ui/components/card';
import { ArrowLeft, Quote } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const testimonials: Testimonial[] = Data.testimonials.testimonials;

// Testimonial card component
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className='flex h-full flex-col'>
      <CardContent className='flex flex-grow flex-col p-6'>
        <div className='text-primary mb-4'>
          <Quote className='h-8 w-8 opacity-50' />
        </div>
        <blockquote className='text-muted-foreground mb-6 flex-grow italic'>
          "{testimonial.testimonial}"
        </blockquote>
        <div className='mt-auto flex flex-col items-center gap-4 md:flex-row md:gap-0'>
          <div className='relative mb-2 h-16 w-16 flex-shrink-0 overflow-hidden rounded-full md:mr-4 md:mb-0'>
            <Image
              src={testimonial.image || '/placeholder.svg'}
              alt={testimonial.name}
              fill
              className='object-cover'
            />
          </div>
          <div className='min-w-0 text-center text-balance md:text-left'>
            <div className='truncate font-medium'>{testimonial.name}</div>
            <div className='text-muted-foreground text-sm text-wrap'>
              {testimonial.title}, {testimonial.company}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TestimonialContent() {
  // Group testimonials by category
  const clientTestimonials = testimonials.filter(
    (t) => t.category === 'client'
  );
  const colleagueTestimonials = testimonials.filter(
    (t) => t.category === 'colleague'
  );
  const studentTestimonials = testimonials.filter(
    (t) => t.category === 'student'
  );
  const generalTestimonials = testimonials.filter(
    (t) => t.category === 'general' || !t.category
  );

  return (
    <div className='container mx-auto max-w-[90rem] px-6 py-12 sm:px-8 md:px-12 md:py-24 lg:px-16'>
      <div className='mb-8 flex items-center gap-4'>
        <Button variant='outline' size='sm' asChild>
          <Link href='/#testimonials'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Home
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>My Testimonials</h1>
      </div>

      <div className='space-y-16'>
        {/* Client Testimonials */}
        {clientTestimonials.length > 0 && (
          <div>
            <h2 className='mb-6 text-2xl font-bold'>Client Testimonials</h2>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {clientTestimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              ))}
            </div>
          </div>
        )}

        {/* Colleague Testimonials */}
        {colleagueTestimonials.length > 0 && (
          <div>
            <h2 className='mb-6 text-2xl font-bold'>Colleague Testimonials</h2>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {colleagueTestimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              ))}
            </div>
          </div>
        )}

        {/* Student Testimonials */}
        {studentTestimonials.length > 0 && (
          <div>
            <h2 className='mb-6 text-2xl font-bold'>Student Testimonials</h2>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {studentTestimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              ))}
            </div>
          </div>
        )}

        {/* General Testimonials */}
        {generalTestimonials.length > 0 && (
          <div>
            <h2 className='mb-6 text-2xl font-bold'>Other Testimonials</h2>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {generalTestimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className='bg-muted/50 mt-16 rounded-lg p-8 text-center'>
        <h2 className='mb-4 text-2xl font-bold'>
          Would you like to share your experience?
        </h2>
        <p className='text-muted-foreground mx-auto mb-6 max-w-2xl'>
          If we've worked together and you'd like to share your feedback, I'd be
          honored to hear from you.
        </p>
        <Button asChild>
          <Link
            href='https://www.linkedin.com/in/wasiqbhamla/edit/forms/recommendation/write/?profileFormEntryPoint=PROFILE_SECTION&profileUrn=urn:li:fsd_profile:ACoAAAM86f0BWA_fsJW-LYrGysLiENkIMc85KVQ'
            target='_blank'
            rel='noopener noreferrer'
          >
            Submit a Testimonial
          </Link>
        </Button>
      </div>
    </div>
  );
}
