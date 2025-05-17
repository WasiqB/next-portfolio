"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import portfolioData from "@/data/portfolio-data.json";
import { HeroData } from "@/types/portfolio-types";
import { getSocialIcon } from "@/lib/social-utils";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const heroData: HeroData = portfolioData.hero;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section className="max-w-[90rem] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-24 lg:py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6 order-2 md:order-1">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {heroData.name}
          </motion.h1>

          <div className="h-12">
            <TypeAnimation
              sequence={heroData.typingSequences}
              wrapper="h2"
              speed={50}
              className="text-xl md:text-2xl text-muted-foreground"
              repeat={Number.POSITIVE_INFINITY}
            />
          </div>

          <motion.p
            className="text-lg text-muted-foreground max-w-prose"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {heroData.bio}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button asChild>
              <Link href={heroData.buttons.primary.href}>
                {heroData.buttons.primary.text}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={heroData.buttons.secondary.href}>
                {heroData.buttons.secondary.text}
              </Link>
            </Button>
          </motion.div>

          <motion.div
            className="flex items-center gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {heroData.socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.ariaLabel}
              >
                {getSocialIcon(social.platform)}
              </Link>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="flex justify-center order-1 md:order-2 mb-8 md:mb-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary mx-auto">
            <Image
              src={heroData.profileImage.src}
              alt={heroData.profileImage.alt}
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
