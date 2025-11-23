'use server';

import { cacheLife, cacheTag } from 'next/cache';
import { Data as portfolioData } from '@/data/portfolio-data';
import { fetchChannelStats, fetchYouTubeVideos } from '@/lib/videos-utils';

const getVideos = async () => {
  'use cache';
  cacheLife('days');
  cacheTag('videos');

  const channelId = portfolioData.videos.youtubeChannelId;
  if (!channelId) return;

  const videos = await fetchYouTubeVideos({ channelId });
  const channelStats = await fetchChannelStats(channelId);
  return { videos, channelStats };
};

export { getVideos };
