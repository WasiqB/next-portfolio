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
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import portfolioData from "@/data/portfolio-data.json";
import { Project, ProjectInput } from "@/types/portfolio-types";
import { getGitHubApiUrl } from "@/lib/github-utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<(Project & { tags: string[] })[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const projectPromises = portfolioData.projects.projects.map(
          async (projectInput: ProjectInput) => {
            const apiUrl = getGitHubApiUrl(projectInput.repoUrl);

            if (!apiUrl) {
              console.error(`Invalid GitHub URL: ${projectInput.repoUrl}`);
              return null;
            }

            const response = await fetch(apiUrl);

            if (!response.ok) {
              console.error(
                `Error fetching project data for ${projectInput.repoUrl}`
              );
              return null;
            }

            const projectData = await response.json();

            return {
              ...projectData,
              tags: projectInput.tags,
            };
          }
        );

        const fetchedProjects = (await Promise.all(projectPromises)).filter(
          Boolean
        ) as (Project & { tags: string[] })[];
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
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 3 }).map((_, tagIndex) => (
                      <Skeleton key={`tag-${tagIndex}`} className="h-5 w-16" />
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Skeleton className="h-9 w-20" />
                  <Skeleton className="h-9 w-20" />
                </CardFooter>
              </Card>
            ))
          : projects.map((project, index) => (
              <Card
                key={index}
                className="h-full flex flex-col overflow-hidden"
              >
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
                <CardFooter className="flex gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
      </div>
    </div>
  );
}
