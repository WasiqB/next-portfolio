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
  Code,
  Palette,
  Globe,
  Smartphone,
  Server,
  Lightbulb,
  ShoppingCart,
  Zap,
  FileText,
  Link2,
  Accessibility,
  Search,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Services() {
  const services = [
    {
      title: "Web Development",
      description:
        "Building responsive and performant websites using modern technologies.",
      icon: <Globe className="h-10 w-10" />,
    },
    {
      title: "Frontend Development",
      description:
        "Creating interactive user interfaces with React and Next.js.",
      icon: <Code className="h-10 w-10" />,
    },
    {
      title: "UI/UX Design",
      description:
        "Designing intuitive and visually appealing user experiences.",
      icon: <Palette className="h-10 w-10" />,
    },
    {
      title: "Mobile Development",
      description:
        "Building cross-platform mobile applications with React Native.",
      icon: <Smartphone className="h-10 w-10" />,
    },
    {
      title: "Backend Development",
      description: "Developing robust server-side applications and APIs.",
      icon: <Server className="h-10 w-10" />,
    },
    {
      title: "Consultation",
      description: "Providing expert advice on web development and design.",
      icon: <Lightbulb className="h-10 w-10" />,
    },
    {
      title: "E-commerce Solutions",
      description:
        "Building online stores with secure payment processing and inventory management.",
      icon: <ShoppingCart className="h-10 w-10" />,
    },
    {
      title: "Performance Optimization",
      description:
        "Improving website speed and performance for better user experience and SEO.",
      icon: <Zap className="h-10 w-10" />,
    },
    {
      title: "CMS Development",
      description:
        "Creating custom content management systems or integrating existing ones.",
      icon: <FileText className="h-10 w-10" />,
    },
    {
      title: "API Integration",
      description:
        "Connecting your application with third-party services and APIs.",
      icon: <Link2 className="h-10 w-10" />,
    },
    {
      title: "Web Accessibility",
      description:
        "Ensuring your website is accessible to all users, including those with disabilities.",
      icon: <Accessibility className="h-10 w-10" />,
    },
    {
      title: "SEO Optimization",
      description: "Improving your website's visibility in search engines.",
      icon: <Search className="h-10 w-10" />,
    },
  ];

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
        <h2 className="text-3xl md:text-4xl font-bold">My Services</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Here are the services I offer to help you achieve your digital goals.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.slice(0, 6).map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="text-primary mb-4">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Additional content can be added here */}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button asChild>
          <Link href="/services">View All Services</Link>
        </Button>
      </div>
    </section>
  );
}
