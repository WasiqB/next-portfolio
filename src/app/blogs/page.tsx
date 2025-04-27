import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  Heart,
  MessageSquare,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";

// Define the blog type
interface Blog {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  tags: string[];
  source: string;
  sourceUrl: string;
  likes: number;
  comments: number;
  views: number;
}

// Sample blog data
const blogs: Blog[] = [
  {
    id: "1",
    title: "Building Responsive Websites with Tailwind CSS",
    description:
      "Learn how to create beautiful responsive websites using Tailwind CSS utility classes.",
    image: "/placeholder.svg?height=200&width=400",
    date: "2023-04-15",
    tags: ["Web Development", "CSS", "Tailwind"],
    source: "Medium",
    sourceUrl: "https://medium.com",
    likes: 124,
    comments: 32,
    views: 1543,
  },
  {
    id: "2",
    title: "Next.js 15: What's New and Improved",
    description:
      "Exploring the latest features and improvements in Next.js 15 and how they can enhance your development workflow.",
    image: "/placeholder.svg?height=200&width=400",
    date: "2023-05-20",
    tags: ["Next.js", "React", "Web Development"],
    source: "Hashnode",
    sourceUrl: "https://hashnode.com",
    likes: 89,
    comments: 14,
    views: 976,
  },
  {
    id: "3",
    title: "The Power of Server Components in React",
    description:
      "Understanding React Server Components and how they can improve performance and user experience.",
    image: "/placeholder.svg?height=200&width=400",
    date: "2023-06-10",
    tags: ["React", "Server Components", "Performance"],
    source: "LambdaTest",
    sourceUrl: "https://www.lambdatest.com/blog",
    likes: 156,
    comments: 28,
    views: 2134,
  },
  {
    id: "4",
    title: "Mastering TypeScript for Modern Web Development",
    description:
      "A comprehensive guide to using TypeScript effectively in your web development projects.",
    image: "/placeholder.svg?height=200&width=400",
    date: "2023-07-05",
    tags: ["TypeScript", "JavaScript", "Web Development"],
    source: "Medium",
    sourceUrl: "https://medium.com",
    likes: 112,
    comments: 19,
    views: 1876,
  },
  {
    id: "5",
    title: "Building a Design System with Shadcn UI",
    description:
      "How to create a consistent design system for your applications using Shadcn UI components.",
    image: "/placeholder.svg?height=200&width=400",
    date: "2023-08-12",
    tags: ["Design System", "UI/UX", "Shadcn"],
    source: "Hashnode",
    sourceUrl: "https://hashnode.com",
    likes: 78,
    comments: 11,
    views: 945,
  },
  {
    id: "6",
    title: "Optimizing Web Performance with Core Web Vitals",
    description:
      "Strategies to improve your website's Core Web Vitals for better SEO and user experience.",
    image: "/placeholder.svg?height=200&width=400",
    date: "2023-09-18",
    tags: ["Performance", "SEO", "Web Vitals"],
    source: "LambdaTest",
    sourceUrl: "https://www.lambdatest.com/blog",
    likes: 134,
    comments: 23,
    views: 1765,
  },
];

// Blog card component
function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={blog.image || "/placeholder.svg"}
          alt={blog.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded px-2 py-1 text-xs font-medium">
          {blog.source}
        </div>
      </div>
      <CardHeader className="p-4 pb-2">
        <h3 className="text-lg font-bold line-clamp-2">{blog.title}</h3>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-3 mb-3">
          {blog.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {blog.tags.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{blog.tags.length - 2}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Heart className="h-3.5 w-3.5" />
            <span>{blog.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>{blog.comments}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            <span>{blog.views}</span>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" asChild>
          <Link href={blog.sourceUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="sr-only">Visit blog</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function BlogsPage() {
  return (
    <div className="container py-12 max-w-[90rem] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">All Blogs</h1>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <div className="flex justify-center">
          <TabsList>
            <TabsTrigger value="all">All Blogs</TabsTrigger>
            <TabsTrigger value="medium">Medium</TabsTrigger>
            <TabsTrigger value="hashnode">Hashnode</TabsTrigger>
            <TabsTrigger value="lambdatest">LambdaTest</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="medium" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs
              .filter((blog) => blog.source === "Medium")
              .map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="hashnode" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs
              .filter((blog) => blog.source === "Hashnode")
              .map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="lambdatest" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs
              .filter((blog) => blog.source === "LambdaTest")
              .map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
