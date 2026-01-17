import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ImageBox } from '@/components/image-box';
import SponsorContent from '@/components/pages/sponsor-content';
import SponsorsSkeleton from '@/components/skeletons/sponsors-skeleton';
import { getCollectionData } from '@/payload/fetchers/collections';
import type { Media, Sponsor, SponsorTier } from '@/payload/types';

export const metadata: Metadata = {
  title: 'My Sponsors',
  description: 'My sponsors for my open source project contributions',
};

async function SponsorData() {
  const sponsors = await getCollectionData<Sponsor[]>('sponsors');
  const tiers = await getCollectionData<SponsorTier[]>('sponsor-tiers');

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

  return <SponsorContent sponsors={sponsorsWithImages} tiers={tiers} />;
}

export default function SponsorsPage() {
  return (
    <Suspense fallback={<SponsorsSkeleton />}>
      <SponsorData />
    </Suspense>
  );
}
