import type { Metadata } from 'next';
import { cacheLife, cacheTag } from 'next/cache';
import { Suspense } from 'react';
import { fetchGitHubRepoAction } from '@/components/actions/github';
import ProjectPageContent from '@/components/pages/projects-content';
import ProjectsSkeleton from '@/components/skeletons/projects-skeleton';
import { CACHE_TAGS, domain } from '@/lib/constants';
import { parseGitHubUrl } from '@/lib/github-utils';
import { getCollectionData } from '@/payload/fetchers/collections';
import { getGlobalConfig } from '@/payload/fetchers/globals';
import type { HomePage, ProjectsPage as ProjectsPageType, SiteSetting, Social } from '@/payload/types';
import type { Project } from '@/types/portfolio-types';

export const generateMetadata = async (): Promise<Metadata> => {
  const [projectsPage, socialLinks, siteSettings] = await Promise.all([
    getGlobalConfig<ProjectsPageType>('projectsPage'),
    getCollectionData<Social[]>('socials'),
    getGlobalConfig<SiteSetting>('siteSettings'),
  ]);

  if (!projectsPage) return {};

  const { title, description, seo } = projectsPage;
  const homePage = await getGlobalConfig<HomePage>('homePage');
  const name = homePage?.heroSection.name;
  const twitterHandle = socialLinks
    ?.find((link) => link.platform === 'x')
    ?.url.split('/')
    .pop();

  return {
    title: {
      absolute: `${title} | ${name}`,
      template: siteSettings?.titleTemplate || `%s | ${name}`,
    },
    description,
    keywords: seo?.keywords || [],
    openGraph: {
      title: `${title} | ${name}`,
      description,
      url: `${domain}/projects`,
      siteName: siteSettings?.siteName || name,
      locale: siteSettings?.defaultLanguage || 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${name}`,
      description,
      creator: `@${twitterHandle}`,
    },
    alternates: {
      canonical: `${domain}/projects`,
    },
  };
};

async function fetchProjects(projectUrls: string[]): Promise<Project[]> {
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

      const result = await fetchGitHubRepoAction(parsed.owner, parsed.repo);

      if ('error' in result) {
        console.error(`Error fetching project data for ${projectUrl}:`, result.error);
        return null;
      }

      return result;
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: data?.projectSection.title || 'Projects',
    description: data?.projectSection.description,
    url: `${domain}/projects`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projectData.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: project.title,
        description: project.description,
        url: project.link,
      })),
    },
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <ProjectPageContent projects={projectData} githubUsername={githubUsername} />
    </>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<ProjectsSkeleton />}>
      <ProjectsData />
    </Suspense>
  );
}
