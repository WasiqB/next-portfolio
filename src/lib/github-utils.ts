/**
 * Parses a GitHub repository URL and extracts the owner and repository name.
 *
 * @param url GitHub repository URL (e.g., https://github.com/owner/repo)
 * @returns An object with owner and repo properties, or null if the URL is invalid
 */
export function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
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

/**
 * Takes a GitHub repository URL and returns the API endpoint to fetch metadata.
 *
 * @param repoUrl GitHub repository URL
 * @returns API endpoint URL or null if the URL is invalid
 */
export function getGitHubApiUrl(repoUrl: string): string | null {
  const parsed = parseGitHubUrl(repoUrl);

  if (!parsed) {
    return null;
  }

  return `/api/github/${parsed.owner}/${parsed.repo}`;
}
