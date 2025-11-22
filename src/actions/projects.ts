'use server';

import { cacheLife, cacheTag } from 'next/cache';
import { Data as portfolioData } from '@/data/portfolio-data';
import { getGitHubApiUrl } from '@/lib/github-utils';
import type { Project } from '@/types/portfolio-types';

const getProjects = async () => {
  'use cache';
  cacheTag('projects');
  cacheLife('days');
  try {
    const projectPromises = portfolioData.projects.projects.map(async (projectUrl: string) => {
      const apiUrl = getGitHubApiUrl(projectUrl);

      if (!apiUrl) {
        console.error(`Invalid GitHub URL: ${projectUrl}`);
        return null;
      }

      const response = await fetch(apiUrl);

      if (!response.ok) {
        console.error(`Error fetching project data for ${projectUrl}`);
        return null;
      }

      const projectData = await response.json();

      return {
        ...projectData,
      };
    });

    const projects = (await Promise.all(projectPromises)).filter(Boolean) as Project[];
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
};

export { getProjects };
