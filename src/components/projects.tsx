import { cacheLife, cacheTag } from 'next/cache';
import { CACHE_TAGS } from '@/lib/constants';
import { parseGitHubUrl } from '@/lib/github-utils';
import { getGlobalConfig } from '@/payload/fetchers/globals';
import type { HomePage } from '@/payload/types';
import type { Project } from '@/types/portfolio-types';
import { fetchGitHubRepoAction } from './actions/github';
import ProjectsClient from './client/projects-client';
import { SectionError } from './client/section-error';

async function fetchProjects(projectUrls: string[]): Promise<Project[] | undefined> {
  'use cache';
  cacheTag(CACHE_TAGS.PROJECTS);
  cacheLife('days');

  try {
    const projects = projectUrls.map(async (projectUrl) => {
      const parsed = parseGitHubUrl(projectUrl);

      if (!parsed) {
        console.error(`Invalid GitHub URL: ${projectUrl}`);
        return null;
      }

      console.info(`Fetching project data for ${parsed.owner}/${parsed.repo}`);
      const result = await fetchGitHubRepoAction(parsed.owner, parsed.repo);

      if ('error' in result) {
        console.error(`Error fetching project data for ${projectUrl}:`, result.error);
        return null;
      }

      return result;
    });
    const fetchedProjects = (await Promise.all(projects)).filter(Boolean) as Project[];
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

  return <ProjectsClient projectSection={projects} projectData={projectData} />;
}
