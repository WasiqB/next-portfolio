import { cacheLife, cacheTag } from 'next/cache';
import { CACHE_DURATION, CACHE_TAGS } from '@/lib/constants';
import { fetchYouTubeVideos } from '@/lib/videos-utils';
import type { Video } from '@/types/portfolio-types';

export interface ChannelStats {
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
}

export interface FetchVideosResult {
  videos: Video[];
  channelStats: ChannelStats;
}

export async function fetchVideosAction(channelId: string): Promise<FetchVideosResult | { error: string }> {
  'use cache';
  cacheTag(CACHE_TAGS.VIDEOS);
  cacheLife('days');

  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!channelId) {
    return { error: 'channelId is required' };
  }
  if (!apiKey) {
    return { error: 'YOUTUBE_API_KEY is not set in environment' };
  }

  try {
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`,
      {
        signal: AbortSignal.timeout(5000),
        next: {
          revalidate: CACHE_DURATION,
        },
      },
    );
    const channelData = await channelResponse.json();

    if (!channelData.items?.[0]?.statistics) {
      throw new Error('Failed to fetch channel statistics');
    }

    const stats = channelData.items[0].statistics;
    const channelStats: ChannelStats = {
      subscriberCount: Number.parseInt(stats.subscriberCount, 10) || 0,
      viewCount: Number.parseInt(stats.viewCount, 10) || 0,
      videoCount: Number.parseInt(stats.videoCount, 10) || 0,
    };

    const videos = await fetchYouTubeVideos({ channelId, apiKey });

    return {
      videos,
      channelStats,
    };
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    return { error: 'Failed to fetch YouTube data' };
  }
}
