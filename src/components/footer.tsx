"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Data as portfolioData } from "@/data/portfolio-data";
import { HeroData } from "@/types/portfolio-types";
import { getSocialIcon } from "@/lib/social-utils";
import { useVariableValue } from "@devcycle/nextjs-sdk";

export default function Footer() {
  const heroData: HeroData = portfolioData.hero;
  const { theme } = useTheme();
  const showProducts = useVariableValue("show-products", false);
  const showContact = useVariableValue("show-contact", false);
  const showGrowth = useVariableValue("show-growth", false);

  // Define the navigation structure (same as navbar)
  const navigationItems = [
    { name: "Home", href: "/", submenu: false },
    {
      name: "About",
      href: "#",
      submenu: true,
      items: [
        { name: "About Me", href: "/about", visible: true },
        { name: "My Growth", href: "/#growth", visible: !!showGrowth },
        { name: "Testimonials", href: "/#testimonials", visible: true },
      ],
    },
    {
      name: "Work",
      href: "#",
      submenu: true,
      items: [
        { name: "Projects", href: "/#projects", visible: true },
        { name: "Services", href: "/#services", visible: true },
        { name: "Products", href: "/#products", visible: !!showProducts },
        { name: "Sponsors", href: "/#sponsors", visible: true },
      ],
    },
    {
      name: "Resources",
      href: "#",
      submenu: true,
      items: [
        { name: "Blogs", href: "/#blogs", visible: true },
        { name: "Videos", href: "/#videos", visible: true },
      ],
    },
    {
      name: "Contact Me",
      href: "/#contact",
      submenu: false,
      visible: !!showContact,
    },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="container max-w-[90rem] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-8 md:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About section */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              {theme === "dark" ? (
                <Image
                  src="/images/logo/dark-logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  priority
                  className="h-10 w-10 object-contain"
                />
              ) : (
                <Image
                  src="/images/logo/light-logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  priority
                  className="h-10 w-10 object-contain"
                />
              )}
            </div>
            <p className="text-muted-foreground">Follow me on my Socials</p>
            <div className="flex items-center gap-4">
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
            </div>
          </div>

          {/* Navigation sections */}
          {navigationItems
            .filter((item) => item.submenu)
            .map((category) => (
              <div key={category.name} className="space-y-4">
                <h3 className="text-lg font-bold">{category.name}</h3>
                <nav className="flex flex-col space-y-2">
                  {category.items
                    ?.filter((item) => item.visible)
                    .map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                </nav>
              </div>
            ))}
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} {heroData.name}. Build with ❤️
            from 🇮🇳.
            <br /> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
