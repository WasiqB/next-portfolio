"use client";

import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Services from "@/components/services";
import Contact from "@/components/contact";
import Blogs from "@/components/blogs";
import Videos from "@/components/videos";
import SponsorsSection from "@/components/sponsors-section";
import Testimonials from "@/components/testimonials";
import GrowthSection from "@/components/growth-section";
import Products from "@/components/products";
import { useVariableValue } from "@devcycle/nextjs-sdk";

export default function Home() {
  const showProducts = useVariableValue("show-products", false);
  const showContact = useVariableValue("show-contact", false);
  const showGrowth = useVariableValue("show-growth", false);

  return (
    <main className="min-h-screen">
      <Hero />
      <Projects />
      <Services />
      {showProducts && <Products />}
      <Blogs />
      <Videos />
      {showGrowth && <GrowthSection />}
      <Testimonials />
      <SponsorsSection />
      {showContact && <Contact />}
    </main>
  );
}
