import type { Metadata } from 'next';
import { cacheLife, cacheTag } from 'next/cache';
import { Suspense } from 'react';
import { fetchGitHubRepoAction } from '@/components/actions/github';
import ProjectPageContent from '@/components/pages/projects-content';
import ProjectsSkeleton from '@/components/skeletons/projects-skeleton';
import socialLinks from '@/data/collections/socials.json';
import { heroSection, projectSection } from '@/data/page-data/home-page.json';
import projectPage from '@/data/page-data/project-page.json';
import siteSettings from '@/data/page-data/site-setting.json';
import { CACHE_TAGS, domain } from '@/lib/constants';
import { parseGitHubUrl } from '@/lib/github-utils';
import type { Project } from '@/types/portfolio-types';

export const generateMetadata = async (): Promise<Metadata> => {
  if (!projectPage) return {};

  const { title, description, seo } = projectPage;
  const name = heroSection.name;
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
      siteName: siteSettings?.name || name,
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
  cacheLife('weeks');

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
  const projectUrls = projectSection?.projectUrls || [];
  const projectData = await fetchProjects(projectUrls);

  const githubSocial = socialLinks.find((s) => s.platform === 'github');
  const githubUsername = githubSocial?.url.split('/').pop() || '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: projectSection.title || 'Projects',
    description: projectSection.description,
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
