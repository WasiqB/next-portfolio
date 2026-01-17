import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ImageBox } from '@/components/image-box';
import AboutContent from '@/components/pages/about-content';
import AboutSkeleton from '@/components/skeletons/about-skeleton';
import { Data } from '@/data/portfolio-data';

export const metadata: Metadata = {
  title: 'About',
  description: 'Get to know more about Wasiq Bhamla',
};

async function AboutData() {
  const profileImage = Data.about.profileImage;

  return (
    <AboutContent
      imageNode={
        <ImageBox imageUrl={profileImage.src} alt={profileImage.alt} fill imageClassName='object-cover' priority />
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
