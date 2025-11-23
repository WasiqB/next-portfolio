import { getVideos } from '@/actions/videos';
import VideosClientContent from '@/components/pages/videos-client-content';

export default async function VideosServerContent() {
  const videoData = await getVideos() || { 
    videos: [], 
    channelStats: {
      subscriberCount: 0,
      viewCount: 0,
      videoCount: 0
    } 
  };
  
  return <VideosClientContent videos={videoData.videos} channelStats={videoData.channelStats} />;
}
