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

async function fetchGitHubRepoAction(owner: string, repo: string): Promise<Project | { error: string }> {
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

export async function fetchGitHubReposAction(repos: { owner: string; repo: string }[]): Promise<Project[]> {
  if (repos.length === 0) return [];

  // If there's only one repo, use the single fetch for better performance/caching
  if (repos.length === 1) {
    const result = await fetchGitHubRepoAction(repos[0].owner, repos[0].repo);
    return 'error' in result ? [] : [result];
  }

  try {
    const query = repos.map((r) => `repo:${r.owner}/${r.repo}`).join('+');
    const response = await fetch(`https://api.github.com/search/repositories?q=${query}`, {
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
      console.error('Failed to fetch repositories in bulk:', response.statusText);
      return [];
    }

    const data = await response.json();
    const items: GitHubRepo[] = data.items || [];

    // Map the items back to the Project type, preserving the order of the input repos if possible
    return repos
      .map((repoReq) => {
        const repoData = items.find(
          (item) => item.full_name.toLowerCase() === `${repoReq.owner}/${repoReq.repo}`.toLowerCase(),
        );
        if (!repoData) return null;

        return {
          title: repoData.name,
          description: repoData.description || `A project by ${repoReq.owner}`,
          link: repoData.html_url,
          stars: repoData.stargazers_count || 0,
          forks: repoData.forks || 0,
          tags: repoData.topics || [],
        };
      })
      .filter(Boolean) as Project[];
  } catch (error) {
    console.error('Error fetching repositories in bulk:', error);
    return [];
  }
}
