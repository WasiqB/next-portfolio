import type { Metadata } from 'next';
import { fetchVideosAction } from '@/components/actions/videos';
import { ImageBox } from '@/components/image-box';
import VideoContent from '@/components/pages/videos-content';
import socialLinks from '@/data/collections/socials.json';
import { heroSection, videoSection } from '@/data/page-data/home-page.json';
import siteSettings from '@/data/page-data/site-setting.json';
import videosPage from '@/data/page-data/video-page.json';
import { domain } from '@/lib/constants';
import type { Video } from '@/types/portfolio-types';

export const generateMetadata = async (): Promise<Metadata> => {
  if (!videosPage) return {};

  const { title, description, seo } = videosPage;
  const name = heroSection.name;
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
      siteName: siteSettings?.name || name,
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
  const channelId = videoSection?.channelId;

  if (!channelId) return null;

  const result = await fetchVideosAction(channelId);
  if ('error' in result) return null;

  const videos: Video[] = result.videos || [];
  const channelStats = result.channelStats;

  const videosWithImages = videos.map((video) => ({
    ...video,
    imageNode: <ImageBox imageUrl={video.thumbnail} imageClassName='object-cover' fill priority alt={video.title} />,
  }));

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
        channelUrl={videoSection?.channelUrl || ''}
      />
    </>
  );
}

export default function VideosPage() {
  return <VideoData />;
}
