'use client';

import { ArrowLeft, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import type { Testimonial } from '@/types/portfolio-types';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

function TestimonialCard({ testimonial }: { testimonial: Testimonial & { imageNode?: React.ReactNode } }) {
  return (
    <motion.div variants={itemVariants} whileHover={{ y: -5 }} transition={{ duration: 0.5 }} className='h-full'>
      <Card className='h-full flex flex-col'>
        <CardContent className='p-6 grow flex flex-col'>
          <div className='mb-4 text-primary'>
            <Quote className='h-8 w-8 opacity-50' />
          </div>
          <blockquote className='grow mb-6 italic text-muted-foreground'>"{testimonial.testimonial}"</blockquote>
          <div className='flex flex-col md:flex-row items-center mt-auto gap-4 md:gap-0'>
            <div className='relative w-16 h-16 shrink-0 rounded-full overflow-hidden mb-2 md:mb-0 md:mr-4'>
              {testimonial.imageNode}
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
    </motion.div>
  );
}

interface TestimonialContentProps {
  testimonials: (Testimonial & { imageNode?: React.ReactNode })[];
}

export default function TestimonialContent({ testimonials }: TestimonialContentProps) {
  const clientTestimonials = testimonials.filter((t) => t.category === 'client');
  const colleagueTestimonials = testimonials.filter((t) => t.category === 'colleague');
  const generalTestimonials = testimonials.filter((t) => t.category === 'general' || !t.category);

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='container py-12 max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24'
    >
      <motion.div variants={itemVariants} className='flex items-center gap-4 mb-8'>
        <Button variant='outline' size='sm' asChild>
          <Link href='/#testimonials'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Home
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>My Testimonials</h1>
      </motion.div>

      <div className='space-y-16'>
        {/* Client Testimonials */}
        {clientTestimonials.length > 0 && (
          <motion.div variants={itemVariants}>
            <h2 className='text-2xl font-bold mb-6'>Client Testimonials</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {clientTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.name} testimonial={testimonial} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Colleague Testimonials */}
        {colleagueTestimonials.length > 0 && (
          <motion.div variants={itemVariants}>
            <h2 className='text-2xl font-bold mb-6'>Colleague Testimonials</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {colleagueTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.name} testimonial={testimonial} />
              ))}
            </div>
          </motion.div>
        )}

        {/* General Testimonials */}
        {generalTestimonials.length > 0 && (
          <motion.div variants={itemVariants}>
            <h2 className='text-2xl font-bold mb-6'>Other Testimonials</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {generalTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.name} testimonial={testimonial} />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='mt-16 bg-muted/50 rounded-lg p-8 text-center'
      >
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
      </motion.div>
    </motion.div>
  );
}
