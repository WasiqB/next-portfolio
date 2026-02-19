import type { Metadata } from 'next';
import { Suspense } from 'react';
import { fetchVideosAction } from '@/components/actions/videos';
import { ImageBox } from '@/components/image-box';
import VideoContent from '@/components/pages/videos-content';
import VideosSkeleton from '@/components/skeletons/videos-skeleton';
import { domain } from '@/lib/constants';
import { getCollectionData } from '@/payload/fetchers/collections';
import { getGlobalConfig } from '@/payload/fetchers/globals';
import type { HomePage, SiteSetting, Social, VideosPage as VideosPageType } from '@/payload/types';
import type { Video } from '@/types/portfolio-types';

export const generateMetadata = async (): Promise<Metadata> => {
  const [videosPage, socialLinks, siteSettings] = await Promise.all([
    getGlobalConfig<VideosPageType>('videosPage'),
    getCollectionData<Social[]>('socials'),
    getGlobalConfig<SiteSetting>('siteSettings'),
  ]);

  if (!videosPage) return {};

  const { title, description, seo } = videosPage;
  const homePage = await getGlobalConfig<HomePage>('homePage');
  const name = homePage?.heroSection.name;
  const twitterHandle = socialLinks
    ?.find((link) => link.platform === 'x')
    ?.url.split('/')
    .pop();

  return {
    title: {
      absolute: `${title} | ${name}`,
      template: siteSettings?.titleTemplate || `%s | ${name}`,
    },
    description,
    keywords: seo?.keywords || [],
    openGraph: {
      title: `${title} | ${name}`,
      description,
      url: `${domain}/videos`,
      siteName: siteSettings?.siteName || name,
      locale: siteSettings?.defaultLanguage || 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${name}`,
      description,
      creator: `@${twitterHandle}`,
    },
    alternates: {
      canonical: `${domain}/videos`,
    },
  };
};

async function VideoData() {
  const config = await getGlobalConfig<HomePage>('homePage');
  const channelId = config?.videoSection?.channelId;

  if (!channelId) return null;

  const result = await fetchVideosAction(channelId);
  if ('error' in result) return null;

  const videos: Video[] = result.videos || [];
  const channelStats = result.channelStats;

  const videosWithImages = videos.map((video) => ({
    ...video,
    imageNode: <ImageBox imageUrl={video.thumbnail} imageClassName='object-cover' fill priority alt={video.title} />,
  }));

  const videosPage = await getGlobalConfig<VideosPageType>('videosPage');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: videosPage?.title || 'Videos',
    description: videosPage?.description,
    url: `${domain}/videos`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: videos.map((video, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'VideoObject',
          name: video.title,
          description: video.title, // Use title as description if not available
          thumbnailUrl: video.thumbnail,
          uploadDate: video.publishDate,
          contentUrl: video.videoUrl,
        },
      })),
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
      <VideoContent
        initialVideos={videosWithImages}
        channelStats={channelStats}
        channelUrl={config?.videoSection?.channelUrl || ''}
      />
    </>
  );
}

export default function VideosPage() {
  return (
    <Suspense fallback={<VideosSkeleton />}>
      <VideoData />
    </Suspense>
  );
}
