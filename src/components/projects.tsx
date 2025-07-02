"use client";

import { motion } from "framer-motion";
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
import { GitFork, Star } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Data as portfolioData } from "@/data/portfolio-data";
import { ProjectsData, Project } from "@/types/portfolio-types";
import { getGitHubApiUrl } from "@/lib/github-utils";
import { Skeleton } from "./ui/skeleton";

export default function Projects() {
  const projectsData: ProjectsData = portfolioData.projects;
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const projectPromises = projectsData.projects
          .slice(0, 4)
          .map(async (projectUrl: string) => {
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
          });

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
  }, [projectsData.projects]);

  return (
    <section
      id="projects"
      className="max-w-[90rem] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-4 text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold">
          {projectsData.sectionTitle}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {projectsData.sectionDescription}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          : // Actual projects
            projects.map((project, index) => (
              <motion.div
                key={project.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
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
              </motion.div>
            ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button asChild>
          <Link href={projectsData.allProjectsButton.href}>
            {projectsData.allProjectsButton.text}
          </Link>
        </Button>
      </div>
    </section>
  );
}
