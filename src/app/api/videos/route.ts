import { NextRequest, NextResponse } from "next/server";
import { fetchYouTubeVideos } from "@/lib/videos-utils";
import { CACHE_DURATION } from "@/lib/constants";

export const revalidate = CACHE_DURATION;

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const channelId = searchParams.get("channelId");
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  if (!channelId) {
    return NextResponse.json(
      { error: "channelId is required" },
      { status: 400 }
    );
  }
  if (!apiKey) {
    return NextResponse.json(
      { error: "NEXT_PUBLIC_YOUTUBE_API_KEY is not set in environment" },
      { status: 500 }
    );
  }

  const videos = await fetchYouTubeVideos({ channelId, apiKey });
  return NextResponse.json(videos);
};
