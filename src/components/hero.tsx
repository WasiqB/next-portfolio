import HeroClient from '@/components/client/hero-client';
import { getCollectionData } from '@/payload/fetchers/collections';
import { getGlobalConfig } from '@/payload/fetchers/globals';
import type { HomePage, Media, Social } from '@/payload/types';
import { SectionError } from './client/section-error';
import { ImageBox } from './image-box';

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
    return (
      <section id='heroSection' className='container py-12 md:py-24'>
        <SectionError title='Hero section Unavailable' message='Failed to load social links data' />
      </section>
    );
  }

  return (
    <HeroClient
      heroSection={data.heroSection}
      socials={socials}
      profileImage={
        <ImageBox
          media={data.heroSection.profileImage[0].src as Media}
          imageClassName='object-cover'
          fill
          alt={data.heroSection.profileImage[0].alt}
        />
      }
    />
  );
}
