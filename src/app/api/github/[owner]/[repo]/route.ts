import { NextRequest, NextResponse } from "next/server";

interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  owner: {
    login: string;
  };
  stargazers_count: number;
  forks: number;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { owner: string; repo: string } }
) {
  try {
    // Extract owner and repo from the URL params
    const { owner, repo } = await params;

    // Fetch repository data from GitHub API
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "NextJS-Portfolio-App",
          // Add GitHub token if available to increase rate limit
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `token ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
        next: { revalidate: 3600 * 24 }, // Cache for 1 day
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch repository: ${response.statusText}` },
        { status: response.status }
      );
    }

    const repoData: GitHubRepo = await response.json();

    // Construct the result
    const result = {
      title: repoData.name,
      description: repoData.description || `A project by ${owner}`,
      link: repoData.html_url,
      stars: repoData.stargazers_count || 0,
      forks: repoData.forks || 0,
      tags: repoData.topics || [],
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching GitHub repository data:", error);
    return NextResponse.json(
      { error: "Failed to fetch repository data" },
      { status: 500 }
    );
  }
}
