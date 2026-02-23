import { CACHE_DURATION } from '@/lib/constants';
import type { Project } from '@/types/portfolio-types';

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
  full_name: string;
}

export async function fetchGitHubRepoAction(owner: string, repo: string): Promise<Project | { error: string }> {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'NextJS-Portfolio-App',
        ...(process.env.GITHUB_TOKEN ? { Authorization: `token ${process.env.GITHUB_TOKEN}` } : {}),
      },
      signal: AbortSignal.timeout(5000),
      next: {
        revalidate: CACHE_DURATION,
      },
    });

    if (!response.ok) {
      return { error: `Failed to fetch repository: ${response.statusText}` };
    }

    const repoData: GitHubRepo = await response.json();

    const result: Project = {
      title: repoData.name,
      description: repoData.description || `A project by ${owner}`,
      link: repoData.html_url,
      stars: repoData.stargazers_count || 0,
      forks: repoData.forks || 0,
      tags: repoData.topics || [],
    };

    return result;
  } catch (error) {
    console.error('Error fetching GitHub repository data:', error);
    return { error: 'Failed to fetch repository data' };
  }
}
