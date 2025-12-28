import { Suspense } from 'react';
import HeroClient from '@/components/hero-client';
import HeroSkeleton from '@/components/hero-skeleton';
import { getHomePage } from '@/payload/fetchers/globals';
import { getSocials } from '@/payload/fetchers/socials';

export default async function Hero() {
  const data = await getHomePage();
  const socials = await getSocials();

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
