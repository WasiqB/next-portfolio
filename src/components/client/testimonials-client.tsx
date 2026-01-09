'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { HomePage, Media, Testimonial } from '@/payload/types';

interface TestimonialsClientProps {
  testimonialSection: HomePage['testimonialSection'];
  testimonials: Testimonial[];
}

export default function TestimonialsClient({ testimonialSection, testimonials }: TestimonialsClientProps) {
  const featuredTestimonials = testimonials.filter((t) => t.featured);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex: number) => (prevIndex + 1) % featuredTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex: number) => (prevIndex - 1 + featuredTestimonials.length) % featuredTestimonials.length);
  };

  useEffect(() => {
    if (autoplay && featuredTestimonials.length > 1) {
      autoplayRef.current = setInterval(() => {
        nextTestimonial();
      }, 5000);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, featuredTestimonials.length]);

  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  if (featuredTestimonials.length === 0) return null;

  return (
    <section id='testimonials' className='container py-12 max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='space-y-4 text-center mb-12'
      >
        <h2 className='text-3xl md:text-4xl font-bold'>{testimonialSection.title}</h2>
        {testimonialSection.description && (
          <p className='text-muted-foreground max-w-2xl mx-auto'>{testimonialSection.description}</p>
        )}
      </motion.div>

      <div className='relative max-w-4xl mx-auto px-4' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
              <Card className='max-w-2xl my-5 w-full'>
                <CardContent className='p-6 flex flex-col'>
                  <div className='mb-4 text-primary'>
                    <Quote className='h-8 w-8 opacity-50' />
                  </div>
                  <blockquote className='grow mb-6 italic text-muted-foreground'>
                    "{featuredTestimonials[currentIndex].testimonial}"
                  </blockquote>
                  <div className='flex flex-col md:flex-row items-center mt-auto gap-4 md:gap-0'>
                    <div className='relative w-12 h-12 rounded-full overflow-hidden mb-2 md:mb-0 md:mr-4'>
                      <Image
                        src={
                          typeof featuredTestimonials[currentIndex].image === 'object'
                            ? (featuredTestimonials[currentIndex].image as Media).url || '/placeholder.svg'
                            : '/placeholder.svg'
                        }
                        alt={featuredTestimonials[currentIndex].name}
                        fill
                        className='object-cover'
                      />
                    </div>
                    <div className='text-center md:text-left text-balance'>
                      <div className='font-medium'>{featuredTestimonials[currentIndex].name}</div>
                      <div className='text-sm text-muted-foreground text-wrap'>
                        {featuredTestimonials[currentIndex].title}, {featuredTestimonials[currentIndex].company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {featuredTestimonials.length > 1 && (
          <>
            <Button
              variant='outline'
              onClick={prevTestimonial}
              className='absolute left-[-20px] md:left-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-muted transition-colors'
              aria-label='Previous testimonial'
            >
              <ChevronLeft className='h-5 w-5' />
            </Button>
            <Button
              variant='outline'
              onClick={nextTestimonial}
              className='absolute right-[-20px] md:right-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-muted transition-colors'
              aria-label='Next testimonial'
            >
              <ChevronRight className='h-5 w-5' />
            </Button>
          </>
        )}

        <div className='flex justify-center gap-2 mt-6'>
          {featuredTestimonials.map((_, index) => (
            <Button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-primary w-4' : 'bg-muted'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {testimonialSection.viewAllButton?.[0] && (
        <div className='flex justify-center mt-8'>
          <Button asChild>
            <Link href={testimonialSection.viewAllButton[0].url}>{testimonialSection.viewAllButton[0].label}</Link>
          </Button>
        </div>
      )}
    </section>
  );
}
