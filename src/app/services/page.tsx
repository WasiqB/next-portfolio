import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
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

// Define the service type
interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  longDescription?: string;
}

// Sample services data
const services: Service[] = [
  {
    title: "Web Development",
    description:
      "Building responsive and performant websites using modern technologies.",
    icon: <Globe className="h-10 w-10" />,
    longDescription:
      "I create custom websites that are fast, responsive, and optimized for search engines. Using the latest technologies like Next.js, React, and Tailwind CSS, I build websites that not only look great but also perform exceptionally well. Whether you need a simple landing page or a complex web application, I can deliver a solution that meets your specific requirements.",
  },
  {
    title: "Frontend Development",
    description: "Creating interactive user interfaces with React and Next.js.",
    icon: <Code className="h-10 w-10" />,
    longDescription:
      "I specialize in building modern, interactive user interfaces using React and Next.js. With a focus on component-based architecture and state management, I create frontend applications that are both powerful and maintainable. My expertise includes implementing complex UI patterns, optimizing performance, and ensuring cross-browser compatibility.",
  },
  {
    title: "UI/UX Design",
    description: "Designing intuitive and visually appealing user experiences.",
    icon: <Palette className="h-10 w-10" />,
    longDescription:
      "Good design is more than just aesthetics—it's about creating intuitive experiences that users love. I combine visual design principles with user research to create interfaces that are both beautiful and functional. My design process includes wireframing, prototyping, and user testing to ensure the final product meets both user needs and business goals.",
  },
  {
    title: "Mobile Development",
    description:
      "Building cross-platform mobile applications with React Native.",
    icon: <Smartphone className="h-10 w-10" />,
    longDescription:
      "I develop mobile applications that work seamlessly across iOS and Android platforms using React Native. This approach allows for faster development times and consistent user experiences across devices. From concept to deployment on app stores, I handle the entire mobile app development process with a focus on performance and user engagement.",
  },
  {
    title: "Backend Development",
    description: "Developing robust server-side applications and APIs.",
    icon: <Server className="h-10 w-10" />,
    longDescription:
      "I build secure, scalable backend systems that power your web and mobile applications. Using Node.js, Express, and various database technologies, I create RESTful APIs and GraphQL endpoints that efficiently handle data processing, authentication, and business logic. My backend solutions are designed with security, performance, and maintainability in mind.",
  },
  {
    title: "Consultation",
    description: "Providing expert advice on web development and design.",
    icon: <Lightbulb className="h-10 w-10" />,
    longDescription:
      "I offer technical consultation services to help you make informed decisions about your digital projects. Whether you're starting a new project, facing technical challenges, or looking to improve an existing application, I provide expert guidance based on years of industry experience. My consultation services include technology stack recommendations, architecture planning, and code reviews.",
  },
  {
    title: "E-commerce Solutions",
    description:
      "Building online stores with secure payment processing and inventory management.",
    icon: <ShoppingCart className="h-10 w-10" />,
    longDescription:
      "I create custom e-commerce solutions that help businesses sell products and services online. From product catalogs and shopping carts to secure payment processing and inventory management, I build comprehensive online shopping experiences. My e-commerce solutions integrate with popular payment gateways and can be customized to match your specific business requirements.",
  },
  {
    title: "Performance Optimization",
    description:
      "Improving website speed and performance for better user experience and SEO.",
    icon: <Zap className="h-10 w-10" />,
    longDescription:
      "I optimize web applications for maximum speed and efficiency. Using techniques like code splitting, lazy loading, image optimization, and caching strategies, I significantly improve load times and overall performance. Better performance not only enhances user experience but also positively impacts search engine rankings and conversion rates.",
  },
  {
    title: "CMS Development",
    description:
      "Creating custom content management systems or integrating existing ones.",
    icon: <FileText className="h-10 w-10" />,
    longDescription:
      "I develop content management solutions that make it easy for you to update and maintain your website. Whether it's integrating existing CMS platforms like WordPress or building custom CMS solutions, I create systems that are tailored to your content workflow. My CMS implementations focus on ease of use, flexibility, and security.",
  },
  {
    title: "API Integration",
    description:
      "Connecting your application with third-party services and APIs.",
    icon: <Link2 className="h-10 w-10" />,
    longDescription:
      "I integrate third-party APIs and services to extend the functionality of your applications. From payment processors and social media platforms to mapping services and data providers, I seamlessly connect your application with external services. My integration approach ensures reliable data exchange while handling authentication, rate limiting, and error scenarios.",
  },
  {
    title: "Web Accessibility",
    description:
      "Ensuring your website is accessible to all users, including those with disabilities.",
    icon: <Accessibility className="h-10 w-10" />,
    longDescription:
      "I make websites accessible to all users, including those with disabilities. Following WCAG guidelines and best practices, I implement features like keyboard navigation, screen reader compatibility, and proper color contrast. Accessible websites not only reach a wider audience but also often provide better user experiences for everyone.",
  },
  {
    title: "SEO Optimization",
    description: "Improving your website's visibility in search engines.",
    icon: <Search className="h-10 w-10" />,
    longDescription:
      "I optimize websites to rank higher in search engine results, driving more organic traffic to your business. My SEO services include technical optimizations like semantic HTML, metadata improvements, and structured data, as well as performance enhancements that search engines reward. I focus on sustainable SEO practices that provide long-term benefits.",
  },
];

export default function ServicesPage() {
  return (
    <div className="container py-12 max-w-[90rem] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">My Services</h1>
      </div>

      <div className="max-w-3xl mx-auto mb-12">
        <p className="text-lg text-muted-foreground">
          I offer a comprehensive range of digital services to help businesses
          and individuals establish a strong online presence. Each service is
          tailored to meet your specific needs and goals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card key={index} className="h-full flex flex-col">
            <CardHeader>
              <div className="text-primary mb-4">{service.icon}</div>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground text-sm">
                {service.longDescription || service.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 bg-muted/50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Need a Custom Service?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Don't see exactly what you're looking for? I offer custom solutions
          tailored to your specific needs.
        </p>
        <Button asChild>
          <Link href="#contact">Contact Me</Link>
        </Button>
      </div>
    </div>
  );
}
