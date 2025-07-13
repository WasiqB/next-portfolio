"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Settings2,
  Terminal,
  Pen,
  Headphones,
  LifeBuoy,
  Code2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Data as portfolioData } from "@/data/portfolio-data";
import { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Settings2,
  Terminal,
  Pen,
  Headphones,
  LifeBuoy,
  Code2,
};

export default function Services() {
  const { sectionTitle, sectionDescription, services, viewAllButton } =
    portfolioData.services;

  const handleServiceClick = (serviceId: string) => {
    window.location.href = `/services?service=${serviceId}`;
  };

  return (
    <section
      id="services"
      className="max-w-[90rem] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-24 bg-muted/50"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-4 text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold">{sectionTitle}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {sectionDescription}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {services.slice(0, 6).map((service, index) => {
          const Icon = iconMap[service.icon];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="h-full cursor-pointer group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50"
                onClick={() => handleServiceClick(service.id)}
              >
                <CardHeader>
                  <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                    {Icon && <Icon className="h-10 w-10" />}
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-primary font-medium group-hover:underline">
                    View Process →
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center mt-8">
        <Button asChild>
          <Link href={viewAllButton.href}>{viewAllButton.text}</Link>
        </Button>
      </div>
    </section>
  );
}
