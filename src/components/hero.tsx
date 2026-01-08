import { Suspense } from 'react';
import HeroClient from '@/components/client/hero-client';
import HeroSkeleton from '@/components/skeletons/hero-skeleton';
import { getCollectionData } from '@/payload/fetchers/collections';
import { getGlobalConfig } from '@/payload/fetchers/globals';
import type { HomePage, Social } from '@/payload/types';
import { SectionError } from './client/section-error';

export default async function Hero() {
  const data = await getGlobalConfig<HomePage>('homePage');
  const socials = await getCollectionData<Social[]>('socials');

  if (!data || !data.heroSection) {
    return (
      <section id='heroSection' className='container py-12 md:py-24'>
        <SectionError title='Hero section Unavailable' message='Failed to load hero section data' />
      </section>
    );
  }

  if (!socials) {
    <section id='heroSection' className='container py-12 md:py-24'>
      <SectionError title='Hero section Unavailable' message='Failed to load social links data' />
    </section>;
  }

  // Build typing sequences array
  const sequences: any[] = [];
  data.heroSection.typingTexts.forEach((text: string) => {
    sequences.push(text);
    sequences.push(data.heroSection.typingDelay || 1000);
  });

  return (
    <Suspense fallback={<HeroSkeleton />}>
      <HeroClient heroSection={data.heroSection} socials={socials} typingSequences={sequences} />
    </Suspense>
  );
}
