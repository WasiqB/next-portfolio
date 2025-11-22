'use server';

import { cacheLife, cacheTag } from 'next/cache';
import { Data as portfolioData } from '@/data/portfolio-data';
import { SITE_URL } from '@/lib/constants';

const getVideos = async () => {
  'use cache';
  cacheTag('videos');
  cacheLife('days');

  const channelId = portfolioData.videos.youtubeChannelId;
  if (!channelId) return;
  const res = await fetch(`${SITE_URL}/api/videos?channelId=${channelId}`);
  if (!res.ok) return;
  return await res.json();
};

export { getVideos };
