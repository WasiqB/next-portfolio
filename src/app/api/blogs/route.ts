import { getMediumPost, scrapeWebsite } from "@/lib/blogs-utils";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 24 * 60 * 60;

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");
  const url = searchParams.get("url");

  if (!username && !url) {
    return NextResponse.json(
      { error: "Username or url is required" },
      { status: 400 }
    );
  }

  if (username) {
    const posts = await getMediumPost(username);
    return NextResponse.json(posts);
  }

  if (url) {
    const post = await scrapeWebsite(url);
    return NextResponse.json(post);
  }
};
