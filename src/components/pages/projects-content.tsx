'use client';

import type { Project } from '@/types/portfolio-types';
import { useEffect, useState } from 'react';
import { Data as portfolioData } from '@/data/portfolio-data';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowLeft, GitFork, Star } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';
import { FaGithub } from 'react-icons/fa6';
import { getProjects } from '@/actions/projects';

export default function ProjectPageContent() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      const projectList = await getProjects() || [];
      setProjects(projectList);
    }

    fetchProjects();
  }, []);

  return (
    <div className="container py-12 max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="sm" asChild>
          <Link href="/#projects">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">All Projects</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Link
            key={index}
            href={project.link}
            target="_blank"
            className="block h-full transition-transform hover:scale-[1.02]"
          >
            <Card className="h-full flex flex-col overflow-hidden cursor-pointer border-2 hover:border-primary/50">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="grow">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-4 text-sm text-muted-foreground pt-0">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span>{project.stars}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="h-4 w-4" />
                  <span>{project.forks}</span>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-16 bg-muted/50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Want to See More?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Check out my GitHub profile for more projects, open-source
          contributions, and code repositories.
        </p>
        <Button asChild>
          <Link
            href={`https://github.com/${portfolioData.github.username}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="h-4 w-4 mr-2" />
            Visit My GitHub
          </Link>
        </Button>
      </div>
    </div>
  );
}
