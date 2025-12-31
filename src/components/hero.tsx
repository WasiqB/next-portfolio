import { Suspense } from 'react';
import HeroClient from '@/components/client/hero-client';
import HeroSkeleton from '@/components/skeletons/hero-skeleton';
import { getCollectionData } from '@/payload/fetchers/collections';
import { getHomePage } from '@/payload/fetchers/globals';
import type { Social } from '@/payload/types';

export default async function Hero() {
  const data = await getHomePage();
  const socials = await getCollectionData<Social[]>('socials');

  if (!data || !data.heroSection) {
    return <HeroSkeleton />;
  }

  if (!socials) {
    return <HeroSkeleton />;
  }

  // Build typing sequences array
  const sequences: any[] = [];
  data.heroSection.typingTexts.forEach((text) => {
    sequences.push(text);
    sequences.push(data.heroSection.typingDelay || 1000);
  });

  return (
    <Suspense fallback={<HeroSkeleton />}>
      <HeroClient heroSection={data.heroSection} socials={socials} typingSequences={sequences} />
    </Suspense>
  );
}
