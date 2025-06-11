"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Moon,
  Sun,
  Menu,
  ChevronDown,
  Home,
  User,
  Briefcase,
  BookOpen,
  MessageSquare,
  LineChart,
  Award,
  Heart,
  Code,
  Cog,
  FileText,
  Video,
  ShoppingCart,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Data as portfolioData } from "@/data/portfolio-data";
import { HeroData } from "@/types/portfolio-types";
import { getFlag } from "@/lib/feature-toggle/provider";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [openCollapsible, setOpenCollapsible] = useState<string | null>(null);
  const heroData: HeroData = portfolioData.hero;

  const showProducts = getFlag("show_products")?.enabled;

  // Define the navigation structure
  const navigationItems = [
    {
      name: "Home",
      href: "/",
      submenu: false,
      icon: <Home className="h-4 w-4" />,
      visible: true,
    },
    {
      name: "About",
      href: "#",
      submenu: true,
      icon: <User className="h-4 w-4" />,
      visible: true,
      items: [
        {
          name: "About Me",
          href: "/about",
          icon: <User className="h-4 w-4" />,
          visible: true,
        },
        {
          name: "My Growth",
          href: "/#growth",
          icon: <LineChart className="h-4 w-4" />,
          visible: true,
        },
        {
          name: "Testimonials",
          href: "/#testimonials",
          icon: <Award className="h-4 w-4" />,
          visible: true,
        },
      ],
    },
    {
      name: "Work",
      href: "#",
      submenu: true,
      icon: <Briefcase className="h-4 w-4" />,
      visible: true,
      items: [
        {
          name: "Projects",
          href: "/#projects",
          icon: <Code className="h-4 w-4" />,
          visible: true,
        },
        {
          name: "Products",
          href: "/#products",
          icon: <ShoppingCart className="h-4 w-4" />,
          visible: !!showProducts,
        },
        {
          name: "Services",
          href: "/#services",
          icon: <Cog className="h-4 w-4" />,
          visible: true,
        },
        {
          name: "Sponsors",
          href: "/#sponsors",
          icon: <Heart className="h-4 w-4" />,
          visible: true,
        },
      ],
    },
    {
      name: "Resources",
      href: "#",
      submenu: true,
      icon: <BookOpen className="h-4 w-4" />,
      visible: true,
      items: [
        {
          name: "Blogs",
          href: "/#blogs",
          icon: <FileText className="h-4 w-4" />,
          visible: true,
        },
        {
          name: "Videos",
          href: "/#videos",
          icon: <Video className="h-4 w-4" />,
          visible: true,
        },
      ],
    },
    {
      name: "Contact Me",
      href: "/#contact",
      submenu: false,
      icon: <MessageSquare className="h-4 w-4" />,
      visible: true,
    },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleCollapsible = (name: string) => {
    setOpenCollapsible(openCollapsible === name ? null : name);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-[90rem] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-xl">
            {heroData.name}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigationItems
            .filter((item) => item.visible)
            .map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary">
                        {item.icon}
                        {item.name}
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-48">
                      {item.items
                        ?.filter((subItem) => subItem.visible)
                        .map((subItem) => (
                          <DropdownMenuItem key={subItem.name} asChild>
                            <Link
                              href={subItem.href}
                              className="w-full cursor-pointer flex items-center gap-1.5"
                            >
                              {subItem.icon}
                              {subItem.name}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary"
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

          <Button variant="default" size="sm" className="gap-1" asChild>
            <Link href="/theme/pricing">
              <ShoppingCart className="h-4 w-4" />
              Buy Theme
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px]">
            <nav className="flex flex-col gap-4 mt-8 px-2">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <Collapsible
                      open={openCollapsible === item.name}
                      onOpenChange={() => toggleCollapsible(item.name)}
                    >
                      <CollapsibleTrigger asChild>
                        <button className="flex items-center justify-between w-full text-sm font-medium transition-colors hover:text-primary">
                          <span className="flex items-center gap-1.5">
                            {item.icon}
                            {item.name}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              openCollapsible === item.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-4 mt-2 space-y-2 border-l">
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="flex text-sm text-muted-foreground hover:text-primary items-center gap-1.5"
                          >
                            {subItem.icon}
                            {subItem.name}
                          </Link>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary"
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              <Link
                href="/theme/pricing"
                className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
              >
                <ShoppingCart className="h-4 w-4" />
                Buy Theme
              </Link>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="justify-start mt-4"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="h-4 w-4 mr-2" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4 mr-2" />
                    Dark Mode
                  </>
                )}
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
