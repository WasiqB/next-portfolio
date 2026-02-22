import sponsorTiers from '@/data/collections/sponsor-tiers.json';
import sponsors from '@/data/collections/sponsors.json';
import { sponsorSection } from '@/data/page-data/home-page.json';
import { SectionError } from './client/section-error';
import SponsorsClient from './client/sponsors-client';
import { ImageBox } from './image-box';

export default function SponsorsSection() {
  if (!sponsorSection || !sponsors || !sponsorTiers) {
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
        imageUrl={sponsor.avatar}
        imageClassName='object-cover transition-transform group-hover:scale-105'
        fill
        priority
        alt={sponsor.name}
      />
    ),
  }));

  return <SponsorsClient sponsorSection={sponsorSection} sponsors={sponsorsWithImages} tiers={sponsorTiers} />;
}
