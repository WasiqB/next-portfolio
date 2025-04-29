"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Play } from "lucide-react";

// Define the video type
interface Video {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  views: number;
  platform: string;
}

// Sample video data
const videos: Video[] = [
  {
    id: "1",
    title: "How to Build a Next.js Portfolio Website",
    thumbnail: "/placeholder.svg?height=200&width=360",
    videoUrl: "https://youtube.com/watch?v=example1",
    views: 15432,
    platform: "YouTube",
  },
  {
    id: "2",
    title: "Mastering Tailwind CSS: Tips and Tricks",
    thumbnail: "/placeholder.svg?height=200&width=360",
    videoUrl: "https://youtube.com/watch?v=example2",
    views: 8765,
    platform: "YouTube",
  },
  {
    id: "3",
    title: "React Server Components Explained",
    thumbnail: "/placeholder.svg?height=200&width=360",
    videoUrl: "https://youtube.com/watch?v=example3",
    views: 12543,
    platform: "YouTube",
  },
  {
    id: "4",
    title: "Building a Full-Stack App with Next.js and Supabase",
    thumbnail: "/placeholder.svg?height=200&width=360",
    videoUrl: "https://youtube.com/watch?v=example4",
    views: 9876,
    platform: "YouTube",
  },
  {
    id: "5",
    title: "TypeScript for React Developers",
    thumbnail: "/placeholder.svg?height=200&width=360",
    videoUrl: "https://youtube.com/watch?v=example5",
    views: 7654,
    platform: "YouTube",
  },
  {
    id: "6",
    title: "Creating Custom Hooks in React",
    thumbnail: "/placeholder.svg?height=200&width=360",
    videoUrl: "https://youtube.com/watch?v=example6",
    views: 6543,
    platform: "YouTube",
  },
];

// Format view count
function formatViewCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M views`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K views`;
  } else {
    return `${count} views`;
  }
}

// Video card component
function VideoCard({ video }: { video: Video }) {
  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <div className="relative aspect-video w-full group cursor-pointer">
        <Image
          src={video.thumbnail || "/placeholder.svg"}
          alt={video.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <div className="rounded-full bg-primary/90 p-3">
            <Play className="h-6 w-6 text-white" fill="white" />
          </div>
        </div>
        <Link
          href={video.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0"
        >
          <span className="sr-only">Watch {video.title}</span>
        </Link>
      </div>
      <CardContent className="p-4 flex-grow">
        <h3 className="font-medium line-clamp-2">{video.title}</h3>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center text-sm text-muted-foreground">
        <span>{video.platform}</span>
        <div className="flex items-center gap-1">
          <Eye className="h-3.5 w-3.5" />
          <span>{formatViewCount(video.views)}</span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default function Videos() {
  return (
    <section
      id="videos"
      className="container py-12 max-w-[90rem] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-4 text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold">My Videos</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Check out my latest video tutorials and tech talks.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {videos.slice(0, 4).map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <VideoCard video={video} />
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button asChild>
          <Link href="/videos">See All Videos</Link>
        </Button>
      </div>
    </section>
  );
}
