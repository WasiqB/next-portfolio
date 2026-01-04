import Blogs from '@/components/blogs';
import { ConditionalSection } from '@/components/conditional-section';
import Contact from '@/components/contact';
import GrowthSection from '@/components/growth-section';
import Hero from '@/components/hero';
import Products from '@/components/products';
import Projects from '@/components/projects';
import Services from '@/components/services';
import SponsorsSection from '@/components/sponsors-section';
import Testimonials from '@/components/testimonials';
import Videos from '@/components/videos';

export default function Home() {
  return (
    <main className='min-h-screen'>
      <Hero />
      <Projects />
      <Services />
      <ConditionalSection variableKey='show-products' defaultValue={false}>
        <Products />
      </ConditionalSection>
      <Blogs />
      <Videos />
      <ConditionalSection variableKey='show-growth' defaultValue={false}>
        <GrowthSection />
      </ConditionalSection>
      <Testimonials />
      <SponsorsSection />
      <Contact />
    </main>
  );
}
