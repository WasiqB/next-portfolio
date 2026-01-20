import { Suspense } from 'react';
import { appProtocol, domain } from '@/lib/constants';
import { fetchWithBypass } from '@/lib/fetch-utils';
import { getGitHubApiUrl } from '@/lib/github-utils';
import { getGlobalConfig } from '@/payload/fetchers/globals';
import type { HomePage } from '@/payload/types';
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

      const apiUrl = `${appProtocol}://${domain}${projectGitUrl}`;
      console.info(`Fetching project data for ${apiUrl}`);
      const response = await fetchWithBypass(apiUrl);

      if (!response.ok) {
        console.error(`Error fetching project data for ${apiUrl}`);
        console.error(`Response status: ${response.status}`);
        console.error(`Response Body: ${await response.text()}`);
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
  const data = await getGlobalConfig<HomePage>('homePage');
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
    <Suspense fallback={<ProjectsSkeleton isSection />}>
      <ProjectsClient projectSection={projects} projectData={projectData} />
    </Suspense>
  );
}
