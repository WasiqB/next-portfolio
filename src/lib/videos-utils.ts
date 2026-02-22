import type { Video } from '@/types/portfolio-types';
import { CACHE_DURATION } from './constants';

function isShort(description: string, title: string): boolean {
  if (description) {
    return description.includes('#shorts');
  }
  if (title) {
    return title.includes('#shorts');
  }
  return false;
}

export async function fetchYouTubeVideos({
  channelId,
  apiKey,
}: {
  channelId: string;
  apiKey: string;
}): Promise<Video[]> {
  const channelRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`,
    {
      signal: AbortSignal.timeout(5000),
      next: {
        revalidate: CACHE_DURATION,
      },
    },
  );
  if (!channelRes.ok) return [];
  const channelData = await channelRes.json();
  const uploadsPlaylistId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsPlaylistId) return [];

  const videos: Video[] = [];
  const playlistRes = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${uploadsPlaylistId}&key=${apiKey}`,
    {
      signal: AbortSignal.timeout(5000),
      next: {
        revalidate: CACHE_DURATION,
      },
    },
  );
  if (!playlistRes.ok) return [];
  const playlistData = playlistRes.ok ? await playlistRes.json() : { items: [] };
  const videoIds = playlistData.items?.map((item: any) => item.contentDetails.videoId).join(',') || '';
  if (!videoIds) return [];

  const videosRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${apiKey}`,
    {
      signal: AbortSignal.timeout(5000),
      next: {
        revalidate: CACHE_DURATION,
      },
    },
  );
  if (!videosRes.ok) return [];
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

  return videos.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
}
