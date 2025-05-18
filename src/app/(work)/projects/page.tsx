"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, GitFork, Star } from "lucide-react";
import { Data as portfolioData } from "@/data/portfolio-data";
import { Project } from "@/types/portfolio-types";
import { getGitHubApiUrl } from "@/lib/github-utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsPage() {
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
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div className="container py-12 max-w-[90rem] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">All Projects</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <Card
                key={`skeleton-${index}`}
                className="h-full flex flex-col overflow-hidden"
              >
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3 mt-1" />
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Array.from({ length: 3 }).map((_, tagIndex) => (
                      <Skeleton key={`tag-${tagIndex}`} className="h-5 w-16" />
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-4 text-sm text-muted-foreground pt-0">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    <Skeleton className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="h-4 w-4" />
                    <Skeleton className="h-5 w-5" />
                  </div>
                </CardFooter>
              </Card>
            ))
          : projects.map((project, index) => (
              <Link
                key={index}
                href={project.link}
                className="block h-full transition-transform hover:scale-[1.02]"
              >
                <Card className="h-full flex flex-col overflow-hidden cursor-pointer border-2 hover:border-primary/50">
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
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
    </div>
  );
}
