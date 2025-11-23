'use server';

import { cacheLife, cacheTag } from 'next/cache';
import { Data as portfolioData } from '@/data/portfolio-data';
import { getGitHubRepoDetails } from '@/lib/github-utils';
import type { Project } from '@/types/portfolio-types';

const getProjects = async () => {
  'use cache';
  cacheLife('days');
  cacheTag('projects');

  try {
    const projectPromises = portfolioData.projects.projects.map(async (projectUrl: string) => {
      const projectData = await getGitHubRepoDetails(projectUrl);

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
