"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Moon,
  Sun,
  Menu,
  Home,
  User,
  Briefcase,
  BookOpen,
  MessageSquare,
  Heart,
  Code,
  FileText,
  Video,
  ShoppingCart,
  Mail,
  Wrench,
  Package,
  TrendingUp,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useVariableValue } from "@devcycle/nextjs-sdk";

const ListItem = function ListItem(
  {
    className,
    title,
    children,
    icon,
    description,
    ...props
  }: React.ComponentPropsWithoutRef<"a"> & {
    icon?: React.ReactNode;
    title: string;
    description?: string;
  },
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none">
            {icon}
            {title}
          </div>
          {description && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {description}
            </p>
          )}
          {children}
        </a>
      </NavigationMenuLink>
    </li>
  );
};
// Use the new React v19 forwardRef API
const ListItemWithRef = React.forwardRef(ListItem);
ListItem.displayName = "ListItem";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [openCollapsible, setOpenCollapsible] = useState<string | null>(null);

  const showProducts = useVariableValue("show-products", false);
  const showBuyButton = useVariableValue("show-buy-button", false);
  const showGrowth = useVariableValue("show-growth", false);

  // Define the navigation structure
  const navigationItems = [
    {
      name: "About",
      href: "#",
      icon: <User className="h-4 w-4" />,
      submenu: true,
      visible: true,
      items: [
        {
          name: "About Me",
          href: "/about",
          icon: <User className="h-4 w-4" />,
          visible: true,
          description: "Learn about my background, experience, and journey",
        },
        {
          name: "My Growth",
          href: "/#growth",
          icon: <TrendingUp className="h-4 w-4" />,
          visible: !!showGrowth,
          description: "Track my progress across various platforms",
        },
        {
          name: "Testimonials",
          href: "/#testimonials",
          icon: <MessageSquare className="h-4 w-4" />,
          visible: true,
          description: "What clients and colleagues say about my work",
        },
      ],
    },
    {
      name: "Work",
      href: "#",
      icon: <Briefcase className="h-4 w-4" />,
      submenu: true,
      visible: true,
      items: [
        {
          name: "Projects",
          href: "/#projects",
          icon: <Code className="h-4 w-4" />,
          visible: true,
          description: "Explore my latest development projects",
        },
        {
          name: "Products",
          href: "/#products",
          icon: <Package className="h-4 w-4" />,
          visible: !!showProducts,
          description: "Software as a Service products I've built",
        },
        {
          name: "Services",
          href: "/#services",
          icon: <Wrench className="h-4 w-4" />,
          visible: true,
          description: "Professional services I offer to clients",
        },
        {
          name: "Sponsors",
          href: "/#sponsors",
          icon: <Heart className="h-4 w-4" />,
          visible: true,
          description: "Support my work and open source projects",
        },
      ],
    },
    {
      name: "Resources",
      href: "#",
      icon: <BookOpen className="h-4 w-4" />,
      visible: true,
      submenu: true,
      items: [
        {
          name: "Blogs",
          href: "/#blogs",
          icon: <FileText className="h-4 w-4" />,
          visible: true,
          description: "Articles and insights on web development",
        },
        {
          name: "Videos",
          href: "/#videos",
          icon: <Video className="h-4 w-4" />,
          visible: true,
          description: "Tutorials and tech talks on YouTube",
        },
      ],
    },
    {
      name: "Contact Me",
      href: "/#contact",
      icon: <Mail className="h-4 w-4" />,
      submenu: false,
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
          <Link href="/" className="flex items-center gap-2" aria-label="Home">
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
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {navigationItems
                .filter((item) => item.visible)
                .map((item) => (
                  <NavigationMenuItem key={item.name}>
                    {item.submenu ? (
                      <>
                        <NavigationMenuTrigger className="flex items-center gap-2">
                          {item.icon}
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {item.items
                              ?.filter((item) => item.visible)
                              .map((subItem) => (
                                <ListItemWithRef
                                  key={subItem.name}
                                  title={subItem.name}
                                  href={subItem.href}
                                  icon={subItem.icon}
                                  description={subItem.description}
                                />
                              ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink
                        href={item.href}
                        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                      >
                        <span className="flex items-center gap-2">
                          {item.icon}
                          {item.name}
                        </span>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
            </NavigationMenuList>
          </NavigationMenu>

          {showBuyButton && (
            <Button variant="default" size="sm" className="gap-1" asChild>
              <Link href="/theme/pricing">
                <ShoppingCart className="h-4 w-4" />
                Buy Theme
              </Link>
            </Button>
          )}

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
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px]">
            <SheetHeader>
              <SheetTitle className="text-lg font-semibold">
                Menu Options
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-8 px-2">
              {navigationItems
                .filter((item) => item.visible)
                .map((item) => (
                  <div key={item.name}>
                    {item.submenu ? (
                      <Collapsible
                        open={openCollapsible === item.name}
                        onOpenChange={() => toggleCollapsible(item.name)}
                      >
                        <CollapsibleTrigger asChild>
                          <button className="flex items-center justify-between w-full text-sm font-medium transition-colors hover:text-primary p-2 rounded-md hover:bg-accent">
                            <span className="flex items-center gap-2">
                              {item.icon}
                              {item.name}
                            </span>
                            <svg
                              className={`h-4 w-4 transition-transform ${
                                openCollapsible === item.name
                                  ? "rotate-180"
                                  : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pl-6 mt-2 space-y-2 border-l border-border">
                          {item.items
                            ?.filter((item) => item.visible)
                            .map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="flex items-start gap-3 p-2 rounded-md text-sm hover:bg-accent transition-colors"
                              >
                                <div className="text-muted-foreground mt-0.5">
                                  {subItem.icon}
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium text-foreground">
                                    {subItem.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                    {subItem.description}
                                  </div>
                                </div>
                              </Link>
                            ))}
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary p-2 rounded-md hover:bg-accent"
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}

              {showBuyButton && (
                <Link
                  href="/theme/pricing"
                  className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary p-2 rounded-md hover:bg-accent mt-4 border border-border"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Buy Theme
                </Link>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="justify-start px-2 mt-4"
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
