"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Data } from "@/data/portfolio-data";
import type { TestimonialsData } from "@/types/portfolio-types";
import { useEffect, useRef, useState } from "react";

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
    <section id="testimonials" className="container py-12 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-4 text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold">
          {testimonials.sectionTitle}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {testimonials.sectionDescription}
        </p>
      </motion.div>

      <div
        className="relative max-w-4xl mx-auto px-4"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <Card className="max-w-2xl my-5">
                <CardContent className="p-6 flex flex-col">
                  <div className="mb-4 text-primary">
                    <Quote className="h-8 w-8 opacity-50" />
                  </div>
                  <blockquote className="flex-grow mb-6 italic text-muted-foreground">
                    "{featuredTestimonials[currentIndex].testimonial}"
                  </blockquote>
                  <div className="flex items-center mt-auto">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={
                          featuredTestimonials[currentIndex].image ||
                          "/placeholder.svg"
                        }
                        alt={featuredTestimonials[currentIndex].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">
                        {featuredTestimonials[currentIndex].name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {featuredTestimonials[currentIndex].title},{" "}
                        {featuredTestimonials[currentIndex].company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevTestimonial}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-muted transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextTestimonial}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-muted transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {featuredTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-primary w-4" : "bg-muted"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Button asChild>
          <Link href={testimonials.viewAllButton?.href || "/#testimonials"}>
            {testimonials.viewAllButton?.text}
          </Link>
        </Button>
      </div>
    </section>
  );
}
