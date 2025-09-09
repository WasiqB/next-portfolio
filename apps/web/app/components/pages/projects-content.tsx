'use client';

import { Data as portfolioData } from '@/app/data/portfolio-data';
import { getGitHubApiUrl } from '@/app/lib/github-utils';
import { Project } from '@/app/types/portfolio-types';
import { Badge } from '@wb/ui/components/badge';
import { Button } from '@wb/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@wb/ui/components/card';
import { Skeleton } from '@wb/ui/components/skeleton';
import { ArrowLeft, GitFork, Star } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa6';

export default function ProjectPageContent() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const projectPromises = portfolioData.projects.projects.map(
          async (projectUrl: string) => {
            const apiUrl = getGitHubApiUrl(projectUrl);

            if (!apiUrl) {
              console.error(`Invalid GitHub URL: ${projectUrl}`);
              return null;
            }

            const response = await fetch(apiUrl);

            if (!response.ok) {
              console.error(`Error fetching project data for ${projectUrl}`);
              return null;
            }

            const projectData = await response.json();

            return {
              ...projectData,
            };
          }
        );

        const fetchedProjects = (await Promise.all(projectPromises)).filter(
          Boolean
        ) as Project[];
        setProjects(fetchedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div className='container mx-auto max-w-[90rem] px-6 py-12 sm:px-8 md:px-12 md:py-24 lg:px-16'>
      <div className='mb-8 flex items-center gap-4'>
        <Button variant='outline' size='sm' asChild>
          <Link href='/#projects'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Home
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>All Projects</h1>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {loading
          ? // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <Card
                key={`skeleton-${index}`}
                className='flex h-full flex-col overflow-hidden'
              >
                <CardHeader>
                  <Skeleton className='mb-2 h-6 w-3/4' />
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='mt-1 h-4 w-2/3' />
                </CardHeader>
                <CardContent>
                  <div className='mb-4 flex flex-wrap gap-2'>
                    {Array.from({ length: 3 }).map((_, tagIndex) => (
                      <Skeleton key={`tag-${tagIndex}`} className='h-5 w-16' />
                    ))}
                  </div>
                </CardContent>
                <CardFooter className='text-muted-foreground flex justify-end gap-4 pt-0 text-sm'>
                  <div className='flex items-center gap-1'>
                    <Star className='h-4 w-4' />
                    <Skeleton className='h-5 w-5' />
                  </div>
                  <div className='flex items-center gap-1'>
                    <GitFork className='h-4 w-4' />
                    <Skeleton className='h-5 w-5' />
                  </div>
                </CardFooter>
              </Card>
            ))
          : projects.map((project, index) => (
              <Link
                key={index}
                href={project.link}
                target='_blank'
                className='block h-full transition-transform hover:scale-[1.02]'
              >
                <Card className='hover:border-primary/50 flex h-full cursor-pointer flex-col overflow-hidden border-2'>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className='flex-grow'>
                    <div className='flex flex-wrap gap-2'>
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant='secondary'>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className='text-muted-foreground flex justify-end gap-4 pt-0 text-sm'>
                    <div className='flex items-center gap-1'>
                      <Star className='h-4 w-4' />
                      <span>{project.stars}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <GitFork className='h-4 w-4' />
                      <span>{project.forks}</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
      </div>

      <div className='bg-muted/50 mt-16 rounded-lg p-8 text-center'>
        <h2 className='mb-4 text-2xl font-bold'>Want to See More?</h2>
        <p className='text-muted-foreground mx-auto mb-6 max-w-2xl'>
          Check out my GitHub profile for more projects, open-source
          contributions, and code repositories.
        </p>
        <Button asChild>
          <Link
            href={`https://github.com/${portfolioData.github.username}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaGithub className='mr-2 h-4 w-4' />
            Visit My GitHub
          </Link>
        </Button>
      </div>
    </div>
  );
}
