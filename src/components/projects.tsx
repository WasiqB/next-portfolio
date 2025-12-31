import { Suspense } from 'react';
import { getGitHubApiUrl } from '@/lib/github-utils';
import { getHomePage } from '@/payload/fetchers/globals';
import type { Project } from '@/types/portfolio-types';
import ProjectsClient from './client/projects-client';
import ProjectsSkeleton from './skeletons/projects-skeleton';

async function fetchProjects(projectUrls: string[]): Promise<Project[] | undefined> {
  try {
    const projects = projectUrls.map(async (projectUrl) => {
      const apiUrl = getGitHubApiUrl(projectUrl);

      if (!apiUrl) {
        console.error(`Invalid GitHub URL: ${projectUrl}`);
        return null;
      }

      const response = await fetch(`${process.env.VERCEL_URL}${apiUrl}`);

      if (!response.ok) {
        console.error(`Error fetching project data for ${projectUrl}`);
        return null;
      }

      const projectData = await response.json();

      return {
        ...projectData,
      };
    });
    const fetchedProjects = (await Promise.all(projects)).filter(Boolean) as (Project & { tags: string[] })[];
    return fetchedProjects;
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
  return undefined;
}

export default async function Projects() {
  const data = await getHomePage();
  const projects = data?.projectSection;
  const projectData = await fetchProjects(projects?.projectUrls.map((project) => project.url) || []);

  if (!projects || !projectData) {
    return <ProjectsSkeleton />;
  }

  return (
    <Suspense fallback={<ProjectsSkeleton />}>
      <ProjectsClient projectSection={projects} projectData={projectData} />
    </Suspense>
  );
}
