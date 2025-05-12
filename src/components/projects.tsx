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
import portfolioData from "@/data/portfolio-data.json";
import { ProjectsData } from "@/types/portfolio-types";

export default function Projects() {
  const projectsData: ProjectsData = portfolioData.projects;

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
        {projectsData.projects.slice(0, 4).map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src={project.thumbnail || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
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
