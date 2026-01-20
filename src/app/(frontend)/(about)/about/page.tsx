import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ImageBox } from '@/components/image-box';
import AboutContent from '@/components/pages/about-content';
import AboutSkeleton from '@/components/skeletons/about-skeleton';
import { getCollectionData } from '@/payload/fetchers/collections';
import { getGlobalConfig } from '@/payload/fetchers/globals';
import type { AboutPage as AboutPageType, Certificate, Education, Experience, Media, Social } from '@/payload/types';

export const metadata: Metadata = {
  title: 'About',
  description: 'Get to know more about Wasiq Bhamla',
};

async function AboutData() {
  const [about, experiences, educations, socialLinks, certificates] = await Promise.all([
    getGlobalConfig<AboutPageType>('aboutPage'),
    getCollectionData<Experience[]>('experience'),
    getCollectionData<Education[]>('education'),
    getCollectionData<Social[]>('socials'),
    getCollectionData<Certificate[]>('certificates'),
  ]);

  if (!about) return null;

  const aboutImage = about.aboutImage[0];
  const media = aboutImage?.src as Media;

  return (
    <AboutContent
      about={about}
      experiences={experiences}
      educations={educations}
      socialLinks={socialLinks}
      certificates={certificates}
      imageNode={
        media && (
          <ImageBox
            imageUrl={media.url || ''}
            alt={aboutImage.alt || media.alt || 'About'}
            fill
            imageClassName='object-cover'
            priority
          />
        )
      }
    />
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<AboutSkeleton />}>
      <AboutData />
    </Suspense>
  );
}
