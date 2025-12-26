import { ArrowLeft, Quote } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Data } from '@/data/portfolio-data';
import type { Testimonial } from '@/types/portfolio-types';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

const testimonials: Testimonial[] = Data.testimonials.testimonials;

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className='h-full flex flex-col'>
      <CardContent className='p-6 grow flex flex-col'>
        <div className='mb-4 text-primary'>
          <Quote className='h-8 w-8 opacity-50' />
        </div>
        <blockquote className='grow mb-6 italic text-muted-foreground'>"{testimonial.testimonial}"</blockquote>
        <div className='flex flex-col md:flex-row items-center mt-auto gap-4 md:gap-0'>
          <div className='relative w-16 h-16 shrink-0 rounded-full overflow-hidden mb-2 md:mb-0 md:mr-4'>
            <Image src={testimonial.image || '/placeholder.svg'} alt={testimonial.name} fill className='object-cover' />
          </div>
          <div className='text-center md:text-left min-w-0 text-balance'>
            <div className='font-medium truncate'>{testimonial.name}</div>
            <div className='text-sm text-muted-foreground text-wrap'>
              {testimonial.title}, {testimonial.company}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TestimonialContent() {
  const clientTestimonials = testimonials.filter((t) => t.category === 'client');
  const colleagueTestimonials = testimonials.filter((t) => t.category === 'colleague');
  const studentTestimonials = testimonials.filter((t) => t.category === 'student');
  const generalTestimonials = testimonials.filter((t) => t.category === 'general' || !t.category);

  return (
    <div className='container py-12 max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24'>
      <div className='flex items-center gap-4 mb-8'>
        <Button variant='outline' size='sm' asChild>
          <Link href='/#testimonials'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Home
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>My Testimonials</h1>
      </div>

      <div className='space-y-16'>
        {/* Client Testimonials */}
        {clientTestimonials.length > 0 && (
          <div>
            <h2 className='text-2xl font-bold mb-6'>Client Testimonials</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {clientTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        )}

        {/* Colleague Testimonials */}
        {colleagueTestimonials.length > 0 && (
          <div>
            <h2 className='text-2xl font-bold mb-6'>Colleague Testimonials</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {colleagueTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        )}

        {/* Student Testimonials */}
        {studentTestimonials.length > 0 && (
          <div>
            <h2 className='text-2xl font-bold mb-6'>Student Testimonials</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {studentTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        )}

        {/* General Testimonials */}
        {generalTestimonials.length > 0 && (
          <div>
            <h2 className='text-2xl font-bold mb-6'>Other Testimonials</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {generalTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className='mt-16 bg-muted/50 rounded-lg p-8 text-center'>
        <h2 className='text-2xl font-bold mb-4'>Would you like to share your experience?</h2>
        <p className='text-muted-foreground max-w-2xl mx-auto mb-6'>
          If we've worked together and you'd like to share your feedback, I'd be honored to hear from you.
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
