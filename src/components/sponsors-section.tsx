import { Suspense } from 'react';
import { getCollectionData } from '@/payload/fetchers/collections';
import { getGlobalConfig } from '@/payload/fetchers/globals';
import type { HomePage, Media, Sponsor, SponsorTier } from '@/payload/types';
import { SectionError } from './client/section-error';
import SponsorsClient from './client/sponsors-client';
import { ImageBox } from './image-box';
import SponsorsSkeleton from './skeletons/sponsors-skeleton';

export default async function SponsorsSection() {
  const data = await getGlobalConfig<HomePage>('homePage');
  const sponsorsSection = data?.sponsorSection;
  const sponsors = await getCollectionData<Sponsor[]>('sponsors');
  const tiers = await getCollectionData<SponsorTier[]>('sponsor-tiers');

  if (!sponsorsSection || !sponsors || !tiers) {
    return (
      <section id='sponsors' className='max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-24'>
        <SectionError title='Sponsor section Unavailable' message='Failed to load sponsor section data' />
      </section>
    );
  }

  const sponsorsWithImages = sponsors.map((sponsor) => ({
    ...sponsor,
    imageNode: (
      <ImageBox
        media={sponsor.avatar as Media}
        imageClassName='object-cover transition-transform group-hover:scale-105'
        fill
        alt={sponsor.name}
      />
    ),
  }));

  return (
    <Suspense fallback={<SponsorsSkeleton isSection />}>
      <SponsorsClient sponsorSection={sponsorsSection} sponsors={sponsorsWithImages} tiers={tiers} />
    </Suspense>
  );
}
