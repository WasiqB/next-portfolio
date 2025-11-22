'use client';

import { useVariableValue } from '@devcycle/nextjs-sdk';
import { Suspense } from 'react';
import Blogs from '@/components/blogs';
import Contact from '@/components/contact';
import GrowthSection from '@/components/growth-section';
import Hero from '@/components/hero';
import Products from '@/components/products';
import Projects from '@/components/projects';
import Services from '@/components/services';
import { BlogsSkeleton } from '@/components/skeletons/blogs';
import { ProjectsSkeleton } from '@/components/skeletons/projects';
import { VideosSkeleton } from '@/components/skeletons/videos';
import SponsorsSection from '@/components/sponsors-section';
import Testimonials from '@/components/testimonials';
import Videos from '@/components/videos';

export default function Home() {
  const showProducts = useVariableValue('show-products', false);
  const showGrowth = useVariableValue('show-growth', false);

  return (
    <main className='min-h-screen'>
      <Hero />
      <Suspense fallback={<ProjectsSkeleton />}>
        <Projects />
      </Suspense>
      <Services />
      {showProducts && <Products />}
      <Suspense fallback={<BlogsSkeleton />}>
        <Blogs />
      </Suspense>
      <Suspense fallback={<VideosSkeleton />}>
        <Videos />
      </Suspense>
      {showGrowth && <GrowthSection />}
      <Testimonials />
      <SponsorsSection />
      <Contact />
    </main>
  );
}
