import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ImageBox } from '@/components/image-box';
import AboutContent from '@/components/pages/about-content';
import AboutSkeleton from '@/components/skeletons/about-skeleton';
import { domain } from '@/lib/constants';
import { getCollectionData } from '@/payload/fetchers/collections';
import { getGlobalConfig } from '@/payload/fetchers/globals';
import type {
  AboutPage as AboutPageType,
  Certificate,
  Education,
  Experience,
  Media,
  SiteSetting,
  Social,
} from '@/payload/types';

export const generateMetadata = async (): Promise<Metadata> => {
  const [about, socialLinks, siteSettings] = await Promise.all([
    getGlobalConfig<AboutPageType>('aboutPage'),
    getCollectionData<Social[]>('socials'),
    getGlobalConfig<SiteSetting>('siteSettings'),
  ]);

  if (!about) return {};

  const { name, aboutImage, description } = about;
  const image = aboutImage?.[0]?.src as Media;
  const imageUrl = image?.url;
  const twitterHandle = socialLinks
    ?.find((link) => link.platform === 'x')
    ?.url.split('/')
    .pop();

  const desc = description?.[0]?.desc || `Get to know more about ${name}`;

  return {
    title: {
      absolute: `About | ${name}`,
      template: siteSettings?.titleTemplate || `%s | ${name}`,
    },
    description: desc,
    keywords: about.seo?.keywords || [],
    openGraph: {
      title: `${name} | About`,
      description: desc,
      url: `${domain}/about`,
      siteName: siteSettings?.siteName || name,
      images: [
        {
          url: imageUrl || '',
          width: 400,
          height: 400,
          alt: aboutImage?.[0]?.alt || name,
          type: 'image/jpeg',
        },
      ],
      locale: siteSettings?.defaultLanguage || 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} | About`,
      description: desc,
      creator: `@${twitterHandle}`,
      images: [imageUrl || ''],
    },
    alternates: {
      canonical: `${domain}/about`,
    },
  };
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Person',
      name: about.name,
      jobTitle: about.title,
      url: domain,
      image: media?.url,
      sameAs: socialLinks?.map((link) => link.url) || [],
    },
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <AboutContent
        about={about}
        experiences={experiences}
        educations={educations}
        socialLinks={socialLinks}
        certificates={certificates}
        imageNode={
          media && (
            <ImageBox
              media={media}
              alt={aboutImage.alt || media.alt || 'About'}
              fill
              imageClassName='object-cover'
              priority
            />
          )
        }
      />
    </>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<AboutSkeleton />}>
      <AboutData />
    </Suspense>
  );
}
