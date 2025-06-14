import { NextRequest, NextResponse } from "next/server";
import { fetchYouTubeVideos } from "@/lib/videos-utils";

export const config = { revalidate: 86400 };

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const channelId = searchParams.get("channelId");
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!channelId) {
    return NextResponse.json(
      { error: "channelId is required" },
      { status: 400 }
    );
  }
  if (!apiKey) {
    return NextResponse.json(
      { error: "YOUTUBE_API_KEY is not set in environment" },
      { status: 500 }
    );
  }

  try {
    // Fetch channel statistics
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`
    );
    const channelData = await channelResponse.json();

    if (!channelData.items?.[0]?.statistics) {
      throw new Error("Failed to fetch channel statistics");
    }

    const stats = channelData.items[0].statistics;
    const channelStats = {
      subscriberCount: parseInt(stats.subscriberCount) || 0,
      viewCount: parseInt(stats.viewCount) || 0,
      videoCount: parseInt(stats.videoCount) || 0,
    };

    // Fetch videos
    const videos = await fetchYouTubeVideos({ channelId, apiKey });

    return NextResponse.json({
      videos,
      channelStats,
    });
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    return NextResponse.json(
      { error: "Failed to fetch YouTube data" },
      { status: 500 }
    );
  }
};
