"use client";

import { Data as portfolioData } from "@/data/portfolio-data";
import {
  ArrowLeft,
  Code2,
  Headphones,
  LifeBuoy,
  LucideIcon,
  Pen,
  Settings2,
  Terminal,
} from "lucide-react";
import { getFlag } from "@/lib/feature-toggle/provider";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const iconMap: Record<string, LucideIcon> = {
  Settings2,
  Terminal,
  Pen,
  Headphones,
  LifeBuoy,
  Code2,
};

export default function ServiceContent() {
  const { sectionTitle, sectionDescription, services } = portfolioData.services;
  const showContact = getFlag("show_contact")?.enabled;

  return (
    <div className="container py-12 max-w-[90rem] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{sectionTitle}</h1>
      </div>

      <div className="max-w-3xl mx-auto mb-12">
        <p className="text-lg text-muted-foreground">{sectionDescription}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => {
          const Icon = iconMap[service.icon];
          return (
            <Card key={index} className="h-full flex flex-col">
              <CardHeader>
                <div className="text-primary mb-4">
                  {Icon && <Icon className="h-10 w-10" />}
                </div>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm">
                  {service.longDescription || service.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-16 bg-muted/50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Need a Custom Service?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Don't see exactly what you're looking for? I offer custom solutions
          tailored to your specific needs.
        </p>
        <Button asChild>
          <Link
            href={showContact ? "/#contact" : "mailto:wasbhamla2005@gmail.com"}
          >
            Contact Me
          </Link>
        </Button>
      </div>
    </div>
  );
}
