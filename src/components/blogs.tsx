"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";
import { Blog } from "@/types/portfolio-types";
import { Data as portfolioData } from "@/data/portfolio-data";

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link
      href={blog.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full transition-transform hover:scale-[1.02]"
    >
      <Card className="h-full flex flex-col overflow-hidden cursor-pointer border-2 hover:border-primary/50">
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
          <div className="flex items-center text-xs text-muted-foreground">
            <CalendarIcon className="h-3.5 w-3.5 mr-1" />
            <span>{formatDate(blog.publishedAt)}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function BlogSkeletonCard() {
  return (
    <div className="animate-pulse h-full flex flex-col overflow-hidden border-2 rounded-lg bg-muted">
      <div className="relative h-48 w-full bg-gray-200" />
      <div className="p-4 pb-2">
        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2" />
      </div>
      <div className="p-4 pt-0 flex-grow">
        <div className="h-4 bg-gray-200 rounded w-full mb-2" />
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-2" />
        <div className="flex gap-2 mb-3">
          <div className="h-5 w-12 bg-gray-300 rounded" />
          <div className="h-5 w-12 bg-gray-300 rounded" />
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <div className="h-4 w-4 bg-gray-300 rounded mr-1" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function Blogs() {
  const [activeTab, setActiveTab] = useState("all");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const blogsPromise = portfolioData.blogs.sources.map(async (source) => {
          if (source.source === "Medium") {
            const response = await fetch(
              `/api/blogs?username=${source.username}`
            );
            return response.json() as Promise<Blog[]>;
          } else {
            const customBlogsPromise = source.urls?.map(async (url) => {
              const response = await fetch(`/api/blogs?url=${url}`);
              return response.json() as Promise<Blog[]>;
            });
            const customBlogs = await Promise.all(customBlogsPromise || []);
            return customBlogs.flat();
          }
        });
        const blogs = await Promise.all(blogsPromise);
        setBlogs(blogs.flat());
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  // Get unique sources for tabs
  const sources = Array.from(new Set(blogs.map((b) => b.source)));

  const sortedBlogs = [...blogs].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <section
      id="blogs"
      className="container max-w-[90rem] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-4 text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold">My Blogs</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Check out my latest articles and insights on web development and
          design.
        </p>
      </motion.div>

      <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
        <div className="flex justify-center">
          <TabsList>
            <TabsTrigger value="all">All Blogs</TabsTrigger>
            {sources.map((source) => (
              <TabsTrigger key={source} value={source}>
                {source}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <BlogSkeletonCard key={i} />
                ))
              : sortedBlogs.slice(0, 4).map((blog, index) => (
                  <motion.div
                    key={blog.url}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <BlogCard blog={blog} />
                  </motion.div>
                ))}
          </div>
        </TabsContent>
        {sources.map((source) => (
          <TabsContent key={source} value={source} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <BlogSkeletonCard key={i} />
                  ))
                : sortedBlogs
                    .filter((blog) => blog.source === source)
                    .slice(0, 4)
                    .map((blog, index) => (
                      <motion.div
                        key={blog.url}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <BlogCard blog={blog} />
                      </motion.div>
                    ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-center mt-8">
        <Button asChild>
          <Link href="/blogs">See All Blogs</Link>
        </Button>
      </div>
    </section>
  );
}
