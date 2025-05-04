import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Quote } from "lucide-react";

// Define the testimonial type
interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  image: string;
  testimonial: string;
  category?: "client" | "colleague" | "student" | "general";
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
    category: "client",
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
    category: "client",
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
    category: "student",
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
    category: "client",
  },
  {
    id: "5",
    name: "Lisa Patel",
    title: "Engineering Director",
    company: "Enterprise Solutions",
    image: "/placeholder.svg?height=100&width=100",
    testimonial:
      "John's contributions to our open-source projects have been invaluable. His code is clean, well-documented, and thoughtfully designed. He's also been a great mentor to junior developers in our community.",
    category: "colleague",
  },
  {
    id: "6",
    name: "Robert Taylor",
    title: "Senior Developer",
    company: "WebTech",
    image: "/placeholder.svg?height=100&width=100",
    testimonial:
      "I've had the pleasure of collaborating with John on several projects. His problem-solving skills and ability to architect scalable solutions are outstanding. He's always willing to share his knowledge and has helped me grow as a developer.",
    category: "colleague",
  },
  {
    id: "7",
    name: "Jennifer Lee",
    title: "UX Designer",
    company: "CreativeUI",
    image: "/placeholder.svg?height=100&width=100",
    testimonial:
      "As a designer, I appreciate how John bridges the gap between design and development. He understands design principles and implements UI with pixel-perfect precision. Our collaboration has always resulted in exceptional user experiences.",
    category: "colleague",
  },
  {
    id: "8",
    name: "Carlos Mendez",
    title: "Bootcamp Graduate",
    company: "TechAcademy",
    image: "/placeholder.svg?height=100&width=100",
    testimonial:
      "John's mentorship during my coding bootcamp was instrumental to my success. He has a gift for explaining complex programming concepts in an accessible way. Thanks to his guidance, I landed my first developer job within a month of graduation.",
    category: "student",
  },
  {
    id: "9",
    name: "Amanda Wilson",
    title: "Freelance Developer",
    company: "Self-employed",
    image: "/placeholder.svg?height=100&width=100",
    testimonial:
      "The development course John created transformed my career. His comprehensive curriculum and hands-on approach gave me the skills and confidence to take on more complex projects and increase my rates. It was the best investment in my professional development.",
    category: "student",
  },
];

// Testimonial card component
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
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
  );
}

export default function TestimonialsPage() {
  // Group testimonials by category
  const clientTestimonials = testimonials.filter(
    (t) => t.category === "client"
  );
  const colleagueTestimonials = testimonials.filter(
    (t) => t.category === "colleague"
  );
  const studentTestimonials = testimonials.filter(
    (t) => t.category === "student"
  );
  const generalTestimonials = testimonials.filter(
    (t) => t.category === "general" || !t.category
  );

  return (
    <div className="container py-12 max-w-[90rem] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">My Testimonials</h1>
      </div>

      <div className="space-y-16">
        {/* Client Testimonials */}
        {clientTestimonials.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Client Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <h2 className="text-2xl font-bold mb-6">Colleague Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <h2 className="text-2xl font-bold mb-6">Student Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <h2 className="text-2xl font-bold mb-6">Other Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      <div className="mt-16 bg-muted/50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Would you like to share your experience?
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          If we've worked together and you'd like to share your feedback, I'd be
          honored to hear from you.
        </p>
        <Button asChild>
          <Link href="mailto:testimonial@example.com">
            Submit a Testimonial
          </Link>
        </Button>
      </div>
    </div>
  );
}
