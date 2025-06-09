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
import { getFlag } from "@/lib/feature-toggle/provider";

export default function Home() {
  const showProducts = getFlag("show_products")?.enabled;

  return (
    <main className="min-h-screen">
      <Hero />
      <Projects />
      <Services />
      {showProducts && <Products />}
      <Blogs />
      <Videos />
      <GrowthSection />
      <Testimonials />
      <SponsorsSection />
      <Contact />
    </main>
  );
}
