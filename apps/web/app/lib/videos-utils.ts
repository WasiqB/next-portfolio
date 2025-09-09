import { Video } from '@/app/types/portfolio-types';
import { CACHE_DURATION } from './constants';

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

export async function fetchYouTubeVideos({
  channelId,
  apiKey,
}: {
  channelId: string;
  apiKey: string;
}): Promise<Video[]> {
  // 1. Get uploads playlist ID
  const channelRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`,
    {
      next: {
        revalidate: CACHE_DURATION,
      },
    }
  );
  if (!channelRes.ok) return [];
  const channelData = await channelRes.json();
  const uploadsPlaylistId =
    channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsPlaylistId) return [];

  // 2. Get all video IDs from uploads playlist (may need to paginate)
  let videos: Video[] = [];
  let nextPageToken = '';
  do {
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${uploadsPlaylistId}&key=${apiKey}${
        nextPageToken ? `&pageToken=${nextPageToken}` : ''
      }`,
      {
        next: {
          revalidate: CACHE_DURATION,
        },
      }
    );
    if (!playlistRes.ok) break;
    const playlistData = await playlistRes.json();
    const videoIds = playlistData.items
      .map((item: any) => item.contentDetails.videoId)
      .join(',');
    if (!videoIds) break;

    // 3. Get video details (snippet, statistics, contentDetails)
    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${apiKey}`,
      {
        next: {
          revalidate: CACHE_DURATION,
        },
      }
    );
    if (!videosRes.ok) break;
    const videosData = await videosRes.json();
    videos.push(
      ...videosData.items.map((video: any) => {
        const isShortVideo = isShort(
          video.snippet.description,
          video.snippet.title
        );
        return {
          id: video.id,
          title: video.snippet.title,
          thumbnail:
            video.snippet.thumbnails?.high?.url ||
            video.snippet.thumbnails?.default?.url ||
            '',
          videoUrl: `https://www.youtube.com/watch?v=${video.id}`,
          views: parseInt(video.statistics?.viewCount || '0', 10),
          likes: parseInt(video.statistics?.likeCount || '0', 10),
          comments: parseInt(video.statistics?.commentCount || '0', 10),
          publishDate: video.snippet.publishedAt,
          category: isShortVideo ? 'short' : 'video',
          platform: 'YouTube',
        };
      })
    );
    nextPageToken = playlistData.nextPageToken;
  } while (nextPageToken);

  // 4. Sort videos from newest to oldest
  return videos.sort(
    (a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}
