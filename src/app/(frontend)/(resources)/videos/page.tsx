import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ImageBox } from '@/components/image-box';
import VideoContent from '@/components/pages/videos-content';
import VideosSkeleton from '@/components/skeletons/videos-skeleton';
import { appProtocol, domain } from '@/lib/constants';
import { fetchWithBypass } from '@/lib/fetch-utils';
import { getGlobalConfig } from '@/payload/fetchers/globals';
import type { HomePage } from '@/payload/types';
import type { Video } from '@/types/portfolio-types';

export const metadata: Metadata = {
  title: 'My Videos',
  description: 'My videos on various testing related topics',
};

async function VideoData() {
  const config = await getGlobalConfig<HomePage>('homePage');
  const channelId = config?.videoSection?.channelId;

  if (!channelId) return null;

  const res = await fetchWithBypass(`${appProtocol}://${domain}/api/videos?channelId=${channelId}`);
  if (!res.ok) return null;
  const data = await res.json();
  const videos: Video[] = data.videos || [];
  const channelStats = data.channelStats;

  const videosWithImages = videos.map((video) => ({
    ...video,
    imageNode: <ImageBox imageUrl={video.thumbnail} imageClassName='object-cover' fill alt={video.title} />,
  }));

  return (
    <VideoContent
      initialVideos={videosWithImages}
      channelStats={channelStats}
      channelUrl={config?.videoSection?.channelUrl || ''}
    />
  );
}

export default function VideosPage() {
  return (
    <Suspense fallback={<VideosSkeleton />}>
      <VideoData />
    </Suspense>
  );
}
