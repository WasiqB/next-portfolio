import { cacheLife, cacheTag } from 'next/cache';
import { projectSection } from '@/data/page-data/home-page.json';
import { CACHE_TAGS } from '@/lib/constants';
import { parseGitHubUrl } from '@/lib/github-utils';
import type { Project } from '@/types/portfolio-types';
import { fetchGitHubReposAction } from './actions/github';
import ProjectsClient from './client/projects-client';
import { SectionError } from './client/section-error';

async function fetchProjects(projectUrls: string[]): Promise<Project[] | undefined> {
  'use cache';
  cacheTag(CACHE_TAGS.PROJECTS);
  cacheLife('days');

  try {
    const parsedRepos = projectUrls
      .map((url) => parseGitHubUrl(url))
      .filter((parsed): parsed is { owner: string; repo: string } => parsed !== null);

    if (parsedRepos.length === 0) return [];

    return await fetchGitHubReposAction(parsedRepos);
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
  return undefined;
}

export default async function Projects() {
  const projectData = await fetchProjects(projectSection?.projectUrls);

  if (!projectSection || !projectData) {
    return (
      <section id='projectSection' className='max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-24'>
        <SectionError title='Project section Unavailable' message='Failed to load project section data' />
      </section>
    );
  }

  return <ProjectsClient projectSection={projectSection} projectData={projectData} />;
}
