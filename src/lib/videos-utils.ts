'use server';

import { cacheLife, cacheTag } from 'next/cache';
import type { Video } from '@/types/portfolio-types';

const apiKey = process.env.YOUTUBE_API_KEY || '';

// Helper to determine if a video is a short
function isShort(description: string, title: string): boolean {
  // YouTube Shorts are < 60s and have a specific URL pattern
  // We'll use duration and/or URL for best guess
  if (description) {
    return description.includes('#shorts');
  }
  if (title) {
    return title.includes('#shorts');
  }
  return false;
}

export const fetchChannelStats = async (channelId: string) => {
  'use cache';
  cacheLife('days');
  cacheTag('youtube-channel-stats');

  // Fetch channel statistics
  const channelResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`,
  );
  const channelData = await channelResponse.json();

  if (!channelData.items?.[0]?.statistics) {
    throw new Error('Failed to fetch channel statistics');
  }

  const stats = channelData.items[0].statistics;
  return {
    subscriberCount: parseInt(stats.subscriberCount, 10) || 0,
    viewCount: parseInt(stats.viewCount, 10) || 0,
    videoCount: parseInt(stats.videoCount, 10) || 0,
  };
};

export async function fetchYouTubeVideos({ channelId }: { channelId: string }): Promise<Video[]> {
  'use cache';
  cacheLife('days');
  cacheTag('youtube-videos');

  // 1. Get uploads playlist ID
  const channelRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`,
  );
  if (!channelRes.ok) return [];
  const channelData = await channelRes.json();
  const uploadsPlaylistId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsPlaylistId) return [];

  // 2. Get all video IDs from uploads playlist (may need to paginate)
  const videos: Video[] = [];
  let nextPageToken = '';
  do {
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${uploadsPlaylistId}&key=${apiKey}${
        nextPageToken ? `&pageToken=${nextPageToken}` : ''
      }`,
    );
    if (!playlistRes.ok) break;
    const playlistData = await playlistRes.json();
    const videoIds = playlistData.items.map((item: any) => item.contentDetails.videoId).join(',');
    if (!videoIds) break;

    // 3. Get video details (snippet, statistics, contentDetails)
    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${apiKey}`,
    );
    if (!videosRes.ok) break;
    const videosData = await videosRes.json();
    videos.push(
      ...videosData.items.map((video: any) => {
        const isShortVideo = isShort(video.snippet.description, video.snippet.title);
        return {
          id: video.id,
          title: video.snippet.title,
          thumbnail: video.snippet.thumbnails?.high?.url || video.snippet.thumbnails?.default?.url || '',
          videoUrl: `https://www.youtube.com/watch?v=${video.id}`,
          views: parseInt(video.statistics?.viewCount || '0', 10),
          likes: parseInt(video.statistics?.likeCount || '0', 10),
          comments: parseInt(video.statistics?.commentCount || '0', 10),
          publishDate: video.snippet.publishedAt,
          category: isShortVideo ? 'short' : 'video',
          platform: 'YouTube',
        };
      }),
    );
    nextPageToken = playlistData.nextPageToken;
  } while (nextPageToken);

  // 4. Sort videos from newest to oldest
  return videos.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
}
