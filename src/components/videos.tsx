import { getVideos } from '@/actions/videos';
import VideosClient from '@/components/videos-client';

export default async function Videos() {
  const videoData = await getVideos() || { 
    videos: [], 
    channelStats: {
      subscriberCount: 0,
      viewCount: 0,
      videoCount: 0
    } 
  };
  
  return <VideosClient videos={videoData.videos} />;
}
