"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

// Define the testimonial type
interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  image: string;
  testimonial: string;
  featured?: boolean;
}

// Sample testimonials data
const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "CTO",
    company: "TechCorp",
    image: "/placeholder.svg?height=100&width=100",
    testimonial:
      "John's expertise in React and Next.js is exceptional. He helped us rebuild our entire frontend, resulting in a 40% improvement in performance and a much better user experience. His attention to detail and commitment to quality is impressive.",
    featured: true,
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "Product Manager",
    company: "InnovateLabs",
    image: "/placeholder.svg?height=100&width=100",
    testimonial:
      "Working with John was a game-changer for our startup. He not only delivered a beautiful, responsive website but also provided valuable insights that helped shape our product strategy. His technical knowledge combined with business acumen is rare to find.",
    featured: true,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    title: "Frontend Lead",
    company: "DesignStudio",
    image: "/placeholder.svg?height=100&width=100",
    testimonial:
      "John's workshops on modern React patterns transformed how our team approaches frontend development. His teaching style makes complex concepts accessible, and the custom tools he built for us have significantly improved our development workflow.",
    featured: true,
  },
  {
    id: "4",
    name: "David Kim",
    title: "CEO",
    company: "StartupX",
    image: "/placeholder.svg?height=100&width=100",
    testimonial:
      "We hired John for a critical project with a tight deadline. Not only did he deliver on time, but the quality of his work exceeded our expectations. His communication throughout the project was excellent, making the entire process smooth and stress-free.",
  },
  {
    id: "5",
    name: "Lisa Patel",
    title: "Engineering Director",
    company: "Enterprise Solutions",
    image: "/placeholder.svg?height=100&width=100",
    testimonial:
      "John's contributions to our open-source projects have been invaluable. His code is clean, well-documented, and thoughtfully designed. He's also been a great mentor to junior developers in our community.",
  },
];

export default function Testimonials() {
  // Only show featured testimonials on the home page
  const featuredTestimonials = testimonials.filter(
    (testimonial) => testimonial.featured
  );

  return (
    <section
      id="testimonials"
      className="container max-w-[90rem] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-4 text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold">My Testimonials</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Here's what people have to say about working with me.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredTestimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col">
              <CardContent className="p-6 flex-grow flex flex-col">
                <div className="mb-4 text-primary">
                  <Quote className="h-8 w-8 opacity-50" />
                </div>
                <blockquote className="flex-grow mb-6 italic text-muted-foreground">
                  "{testimonial.testimonial}"
                </blockquote>
                <div className="flex items-center mt-auto">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.title}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button asChild>
          <Link href="/testimonials">View All Testimonials</Link>
        </Button>
      </div>
    </section>
  );
}
