'use client';

import Blogs from '@/app/components/blogs';
import Contact from '@/app/components/contact';
import GrowthSection from '@/app/components/growth-section';
import Hero from '@/app/components/hero';
import Products from '@/app/components/products';
import Projects from '@/app/components/projects';
import Services from '@/app/components/services';
import SponsorsSection from '@/app/components/sponsors-section';
import Testimonials from '@/app/components/testimonials';
import Videos from '@/app/components/videos';
import { useVariableValue } from '@wb/feature-toggle/client';

export default function Home() {
  const showProducts = useVariableValue('show-products', false);
  const showGrowth = useVariableValue('show-growth', false);

  return (
    <main className='min-h-screen'>
      <Hero />
      <Projects />
      <Services />
      {showProducts && <Products />}
      <Blogs />
      <Videos />
      {showGrowth && <GrowthSection />}
      <Testimonials />
      <SponsorsSection />
      <Contact />
    </main>
  );
}
