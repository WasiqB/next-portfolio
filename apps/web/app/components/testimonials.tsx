'use client';

import { Data } from '@/app/data/portfolio-data';
import type { TestimonialsData } from '@/app/types/portfolio-types';
import { Button } from '@wb/ui/components/button';
import { Card, CardContent } from '@wb/ui/components/card';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const testimonials: TestimonialsData = Data.testimonials;

export default function Testimonials() {
  // Only show featured testimonials on the home page
  const featuredTestimonials = testimonials.testimonials.filter(
    (testimonial) => testimonial.featured
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const nextTestimonial = () => {
    setCurrentIndex(
      (prevIndex: number) => (prevIndex + 1) % featuredTestimonials.length
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex: number) =>
        (prevIndex - 1 + featuredTestimonials.length) %
        featuredTestimonials.length
    );
  };

  // Setup autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        nextTestimonial();
      }, 5000); // Change testimonial every 5 seconds
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  return (
    <section
      id='testimonials'
      className='container mx-auto max-w-[90rem] px-6 py-12 sm:px-8 md:px-12 md:py-24 lg:px-16'
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='mb-12 space-y-4 text-center'
      >
        <h2 className='text-3xl font-bold md:text-4xl'>
          {testimonials.sectionTitle}
        </h2>
        <p className='text-muted-foreground mx-auto max-w-2xl'>
          {testimonials.sectionDescription}
        </p>
      </motion.div>

      <div
        className='relative mx-auto max-w-4xl px-4'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className='overflow-hidden'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className='flex justify-center'
            >
              {featuredTestimonials[currentIndex] && (
                <Card className='my-5 max-w-2xl'>
                  <CardContent className='flex flex-col p-6'>
                    <div className='text-primary mb-4'>
                      <Quote className='h-8 w-8 opacity-50' />
                    </div>
                    <blockquote className='text-muted-foreground mb-6 flex-grow italic'>
                      "{featuredTestimonials[currentIndex].testimonial}"
                    </blockquote>
                    <div className='mt-auto flex flex-col items-center gap-4 md:flex-row md:gap-0'>
                      <div className='relative mb-2 h-12 w-12 overflow-hidden rounded-full md:mr-4 md:mb-0'>
                        <Image
                          src={
                            featuredTestimonials[currentIndex].image ||
                            '/placeholder.svg'
                          }
                          alt={featuredTestimonials[currentIndex].name}
                          fill
                          className='object-cover'
                        />
                      </div>
                      <div className='text-center text-balance md:text-left'>
                        <div className='font-medium'>
                          {featuredTestimonials[currentIndex].name}
                        </div>
                        <div className='text-muted-foreground text-sm text-wrap'>
                          {featuredTestimonials[currentIndex].title},{' '}
                          {featuredTestimonials[currentIndex].company}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevTestimonial}
          className='bg-background/80 hover:bg-muted absolute top-1/2 left-0 -translate-y-1/2 rounded-full p-2 shadow-md backdrop-blur-sm transition-colors'
          aria-label='Previous testimonial'
        >
          <ChevronLeft className='h-5 w-5' />
        </button>
        <button
          onClick={nextTestimonial}
          className='bg-background/80 hover:bg-muted absolute top-1/2 right-0 -translate-y-1/2 rounded-full p-2 shadow-md backdrop-blur-sm transition-colors'
          aria-label='Next testimonial'
        >
          <ChevronRight className='h-5 w-5' />
        </button>

        {/* Indicators */}
        <div className='mt-6 flex justify-center gap-2'>
          {featuredTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-primary w-4' : 'bg-muted'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className='mt-8 flex justify-center'>
        <Button asChild>
          <Link href={testimonials.viewAllButton?.href || '/#testimonials'}>
            {testimonials.viewAllButton?.text}
          </Link>
        </Button>
      </div>
    </section>
  );
}
