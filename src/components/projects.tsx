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
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import portfolioData from "@/data/portfolio-data.json";
import { ProjectsData, Project, ProjectInput } from "@/types/portfolio-types";
import { getGitHubApiUrl } from "@/lib/github-utils";
import { Skeleton } from "./ui/skeleton";

export default function Projects() {
  const projectsData: ProjectsData = portfolioData.projects;
  const [projects, setProjects] = useState<(Project & { tags: string[] })[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const projectPromises = projectsData.projects
          .slice(0, 4)
          .map(async (projectInput: ProjectInput) => {
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
            Array.from({ length: 4 }).map((_, index) => (
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
          : // Actual projects
            projects.map((project, index) => (
              <motion.div
                key={project.githubLink}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col overflow-hidden">
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
                    {project.demoLink && (
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
                    )}
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
