'use server';

import { cacheLife, cacheTag } from 'next/cache';
import type { GitHubRepo } from '@/types/portfolio-types';

/**
 * Parses a GitHub repository URL and extracts the owner and repository name.
 *
 * @param url GitHub repository URL (e.g., https://github.com/owner/repo)
 * @returns An object with owner and repo properties, or null if the URL is invalid
 */
export async function parseGitHubUrl(url: string): Promise<{ owner: string; repo: string } | null> {
  try {
    const githubRegex = /github\.com\/([^/]+)\/([^/]+)/;
    const match = url.match(githubRegex);

    if (!match || match.length < 3) {
      return null;
    }

    return {
      owner: match[1],
      repo: match[2],
    };
  } catch (error) {
    console.error('Error parsing GitHub URL:', error);
    return null;
  }
}

export const getGitHubRepoDetails = async (url: string) => {
  'use cache';
  cacheLife('days');
  cacheTag('github-repo');

  const { owner, repo } = (await parseGitHubUrl(url)) || {};
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'NextJS-Portfolio-App',
      ...(process.env.GITHUB_TOKEN ? { Authorization: `token ${process.env.GITHUB_TOKEN}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch repository: ${response.statusText}`);
  }

  const repoData: GitHubRepo = await response.json();

  return {
    title: repoData.name,
    description: repoData.description || `A project by ${owner}`,
    link: repoData.html_url,
    stars: repoData.stargazers_count || 0,
    forks: repoData.forks || 0,
    tags: repoData.topics || [],
  };
};
