import type { Metadata } from 'next';
import { ImageBox } from '@/components/image-box';
import AboutContent from '@/components/pages/about-content';
import certificates from '@/data/collections/certificates.json';
import educations from '@/data/collections/educations.json';
import experiences from '@/data/collections/experiences.json';
import socialLinks from '@/data/collections/socials.json';
import about from '@/data/page-data/about-page.json';
import siteSettings from '@/data/page-data/site-setting.json';
import { domain } from '@/lib/constants';
import type { Certificate, Education, Experience, Social } from '@/types/portfolio-types';

export const generateMetadata = async (): Promise<Metadata> => {
  if (!about) return {};

  const { name, image, description } = about;
  const twitterHandle = socialLinks
    ?.find((link) => link.platform === 'x')
    ?.url.split('/')
    .pop();

  const desc = description[0] || `Get to know more about ${name}`;

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
      siteName: siteSettings?.name || name,
      images: [
        {
          url: image,
          width: 400,
          height: 400,
          alt: name,
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
      images: [image],
    },
    alternates: {
      canonical: `${domain}/about`,
    },
  };
};

async function AboutData() {
  if (!about) return null;

  const aboutImage = about.image;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Person',
      name: about.name,
      jobTitle: about.title,
      url: domain,
      image: aboutImage,
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
        experiences={experiences as Experience[]}
        educations={educations as Education[]}
        socialLinks={socialLinks as Social[]}
        certificates={certificates as Certificate[]}
        imageNode={
          aboutImage && (
            <ImageBox imageUrl={aboutImage} alt={siteSettings.name || 'About'} imageClassName='object-cover' priority />
          )
        }
      />
    </>
  );
}

export default function AboutPage() {
  return <AboutData />;
}
