import { Suspense } from 'react';
import { domain } from '@/lib/constants';
import { fetchWithBypass } from '@/lib/fetch-utils';
import { getGlobalConfig } from '@/payload/fetchers/globals';
import type { HomePage } from '@/payload/types';
import type { Video } from '@/types/portfolio-types';
import { SectionError } from './client/section-error';
import VideosClient from './client/videos-client';
import { ImageBox } from './image-box';
import VideosSkeleton from './skeletons/videos-skeleton';

async function fetchVideos(channelId: string): Promise<Video[]> {
  const res = await fetchWithBypass(`${domain}/api/videos?channelId=${channelId}`);
  if (!res.ok) throw new Error('Failed to fetch videos');
  const data = await res.json();
  return data.videos || [];
}

export default async function Videos() {
  const data = await getGlobalConfig<HomePage>('homePage');
  const videoSection = data?.videoSection;

  if (!videoSection) {
    return (
      <section id='videos' className='container py-12 max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24'>
        <SectionError title='Video section Unavailable' message='Failed to load video section data' />
      </section>
    );
  }

  const videos = await fetchVideos(videoSection.channelId);

  if (!videos) {
    return (
      <section id='videos' className='container py-12 max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24'>
        <SectionError title='Video section Unavailable' message='Failed to load video data' />
      </section>
    );
  }

  const videosWithImages = videos.map((video) => ({
    ...video,
    imageNode: <ImageBox imageUrl={video.thumbnail} imageClassName='object-cover' fill alt={video.title} />,
  }));

  return (
    <Suspense fallback={<VideosSkeleton isSection />}>
      <VideosClient videoSection={videoSection} videos={videosWithImages} />
    </Suspense>
  );
}
