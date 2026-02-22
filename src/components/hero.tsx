import HeroClient from '@/components/client/hero-client';
import socials from '@/data/collections/socials.json';
import { heroSection } from '@/data/page-data/home-page.json';
import type { Social } from '@/types/portfolio-types';
import { SectionError } from './client/section-error';
import { ImageBox } from './image-box';

export default function Hero() {
  if (!heroSection) {
    return (
      <section id='heroSection' className='container py-12 md:py-24'>
        <SectionError title='Hero section Unavailable' message='Failed to load hero section data' />
      </section>
    );
  }

  if (!socials) {
    return (
      <section id='heroSection' className='container py-12 md:py-24'>
        <SectionError title='Hero section Unavailable' message='Failed to load social links data' />
      </section>
    );
  }

  return (
    <HeroClient
      heroSection={heroSection}
      socials={socials as Social[]}
      profileImage={
        <ImageBox
          imageUrl={heroSection.image}
          imageClassName='object-cover'
          fill
          priority
          sizes='(max-width: 768px) 192px, (max-width: 1024px) 256px, 320px'
          alt={heroSection.name}
        />
      }
    />
  );
}
