import { Suspense } from 'react';
import { appProtocol } from '@/lib/constants';
import { getGitHubApiUrl } from '@/lib/github-utils';
import { getHomePage } from '@/payload/fetchers/globals';
import type { Project } from '@/types/portfolio-types';
import ProjectsClient from './client/projects-client';
import { SectionError } from './client/section-error';
import ProjectsSkeleton from './skeletons/projects-skeleton';

async function fetchProjects(projectUrls: string[]): Promise<Project[] | undefined> {
  try {
    const projects = projectUrls.map(async (projectUrl) => {
      const projectGitUrl = getGitHubApiUrl(projectUrl);

      if (!projectGitUrl) {
        console.error(`Invalid GitHub URL: ${projectUrl}`);
        return null;
      }

      const apiUrl = `${appProtocol}://${process.env.VERCEL_URL}${projectGitUrl}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        console.error(`Error fetching project data for ${apiUrl}`);
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
    return (
      <section id='projectSection' className='max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-24'>
        <SectionError title='Project section Unavailable' message='Failed to load project section data' />
      </section>
    );
  }

  return (
    <Suspense fallback={<ProjectsSkeleton />}>
      <ProjectsClient projectSection={projects} projectData={projectData} />
    </Suspense>
  );
}
