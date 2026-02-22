import { videoSection } from '@/data/page-data/home-page.json';
import type { Video } from '@/types/portfolio-types';
import { fetchVideosAction } from './actions/videos';
import { SectionError } from './client/section-error';
import VideosClient from './client/videos-client';
import { ImageBox } from './image-box';

async function fetchVideos(channelId: string): Promise<Video[]> {
  const result = await fetchVideosAction(channelId);
  if ('error' in result) {
    throw new Error(result.error);
  }
  return result.videos || [];
}

export default async function Videos() {
  if (!videoSection) {
    return (
      <section id='videos' className='container py-12 max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24'>
        <SectionError title='Video section Unavailable' message='Failed to load video section data' />
      </section>
    );
  }

  try {
    const videos = await fetchVideos(videoSection.channelId);

    if (!videos || videos.length === 0) {
      return (
        <section id='videos' className='container py-12 max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24'>
          <SectionError title='Video section Unavailable' message='No videos found for the specified channel' />
        </section>
      );
    }

    const videosWithImages = videos.map((video, index) => ({
      ...video,
      imageNode: (
        <ImageBox
          imageUrl={video.thumbnail}
          imageClassName='object-cover'
          fill
          priority={index < 4}
          sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw'
          alt={video.title}
        />
      ),
    }));

    return <VideosClient videoSection={videoSection} videos={videosWithImages} />;
  } catch (error) {
    console.error('Error in Videos component:', error);
    return (
      <section id='videos' className='container py-12 max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24'>
        <SectionError title='Video section Unavailable' message='Failed to load video data' />
      </section>
    );
  }
}
