"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

// Define the sponsor type
interface Sponsor {
  id: string;
  name: string;
  image: string;
  url: string;
  tier: "bronze" | "silver" | "gold" | "platinum";
}

// Sample sponsors data
const sponsors: Sponsor[] = [
  {
    id: "1",
    name: "Acme Inc",
    image: "/placeholder.svg?height=200&width=200",
    url: "https://example.com",
    tier: "platinum",
  },
  {
    id: "2",
    name: "TechCorp",
    image: "/placeholder.svg?height=200&width=200",
    url: "https://example.com",
    tier: "gold",
  },
  {
    id: "3",
    name: "DevStudio",
    image: "/placeholder.svg?height=200&width=200",
    url: "https://example.com",
    tier: "silver",
  },
  {
    id: "4",
    name: "CodeLabs",
    image: "/placeholder.svg?height=200&width=200",
    url: "https://example.com",
    tier: "silver",
  },
  {
    id: "5",
    name: "WebWorks",
    image: "/placeholder.svg?height=200&width=200",
    url: "https://example.com",
    tier: "bronze",
  },
];

export default function SponsorsSection() {
  return (
    <section id="sponsors" className="container py-12 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-4 text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold">My Sponsors</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          These amazing sponsors support my work and help me create more
          content.
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-8 mb-12">
        {sponsors.slice(0, 5).map((sponsor, index) => (
          <motion.div
            key={sponsor.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="relative w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-full border-2 border-muted transition-all hover:border-primary">
                <Image
                  src={sponsor.image || "/placeholder.svg"}
                  alt={sponsor.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button asChild>
          <Link href="/sponsors">
            <Heart className="h-4 w-4 mr-2" />
            Become a Sponsor
          </Link>
        </Button>
      </div>
    </section>
  );
}
