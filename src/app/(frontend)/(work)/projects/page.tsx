import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProjectPageContent from '@/components/pages/projects-content';
import ProjectsSkeleton from '@/components/skeletons/projects-skeleton';
import { domain } from '@/lib/constants';
import { fetchWithBypass } from '@/lib/fetch-utils';
import { getGitHubApiUrl } from '@/lib/github-utils';
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
  try {
    const projects = projectUrls.map(async (projectUrl) => {
      const projectGitUrl = getGitHubApiUrl(projectUrl);

      if (!projectGitUrl) {
        console.error(`Invalid GitHub URL: ${projectUrl}`);
        return null;
      }

      const apiUrl = `${domain}${projectGitUrl}`;
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
