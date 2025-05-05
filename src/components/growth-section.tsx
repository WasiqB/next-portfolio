"use client";

import type React from "react";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin, Twitter, Youtube, TrendingUp } from "lucide-react";

// Define the platform type
interface PlatformStat {
  name: string;
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color: string;
}

// Sample platform stats data
const platformStats: PlatformStat[] = [
  {
    name: "YouTube",
    icon: <Youtube className="h-5 w-5" />,
    value: "25.4K",
    label: "Subscribers",
    color: "bg-red-500",
  },
  {
    name: "GitHub",
    icon: <Github className="h-5 w-5" />,
    value: "12.5K",
    label: "Stars",
    color: "bg-gray-800",
  },
  {
    name: "Twitter",
    icon: <Twitter className="h-5 w-5" />,
    value: "18.7K",
    label: "Followers",
    color: "bg-sky-500",
  },
  {
    name: "LinkedIn",
    icon: <Linkedin className="h-5 w-5" />,
    value: "7.2K",
    label: "Followers",
    color: "bg-blue-600",
  },
];

export default function GrowthSection() {
  return (
    <section
      id="growth"
      className="container max-w-[90rem] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-4 text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold">My Growth</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Track my growth and impact across various platforms in the developer
          community.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {platformStats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-2">
                <div className={`${stat.color} text-white p-1.5 rounded w-fit`}>
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-2xl">{stat.value}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {stat.label} on {stat.name}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button asChild>
          <Link href="/growth">
            <TrendingUp className="h-4 w-4 mr-2" />
            View All Statistics
          </Link>
        </Button>
      </div>
    </section>
  );
}
