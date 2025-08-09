import TestimonialContent from "@/components/pages/testimonial-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What my clients, colleagues and friends say about me?",
};

export default function TestimonialsPage() {
  return <TestimonialContent />;
}
