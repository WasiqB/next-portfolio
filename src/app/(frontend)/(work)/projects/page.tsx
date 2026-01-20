import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProjectPageContent from '@/components/pages/projects-content';
import ProjectsSkeleton from '@/components/skeletons/projects-skeleton';
import { appProtocol, domain } from '@/lib/constants';
import { fetchWithBypass } from '@/lib/fetch-utils';
import { getGitHubApiUrl } from '@/lib/github-utils';
import { getCollectionData } from '@/payload/fetchers/collections';
import { getGlobalConfig } from '@/payload/fetchers/globals';
import type { HomePage, Social } from '@/payload/types';
import type { Project } from '@/types/portfolio-types';

export const metadata: Metadata = {
  title: 'My Projects',
  description: 'My open source projects about various automation tools',
};

async function fetchProjects(projectUrls: string[]): Promise<Project[]> {
  try {
    const projects = projectUrls.map(async (projectUrl) => {
      const projectGitUrl = getGitHubApiUrl(projectUrl);

      if (!projectGitUrl) {
        console.error(`Invalid GitHub URL: ${projectUrl}`);
        return null;
      }

      const apiUrl = `${appProtocol}://${domain}${projectGitUrl}`;
      const response = await fetchWithBypass(apiUrl);

      if (!response.ok) {
        console.error(`Error fetching project data for ${apiUrl}`);
        return null;
      }

      return await response.json();
    });
    return (await Promise.all(projects)).filter(Boolean) as Project[];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

async function ProjectsData() {
  const [data, socials] = await Promise.all([
    getGlobalConfig<HomePage>('homePage'),
    getCollectionData<Social[]>('socials'),
  ]);

  const projects = data?.projectSection;
  const projectUrls = projects?.projectUrls.map((p) => p.url) || [];
  const projectData = await fetchProjects(projectUrls);

  const githubSocial = socials.find((s) => s.platform === 'github');
  const githubUsername = githubSocial?.url.split('/').pop() || '';

  return <ProjectPageContent projects={projectData} githubUsername={githubUsername} />;
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<ProjectsSkeleton />}>
      <ProjectsData />
    </Suspense>
  );
}
