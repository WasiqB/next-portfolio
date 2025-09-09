'use client';

import { useVariableValue } from '@wb/feature-toggle/client';
import { Button } from '@wb/ui/components/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@wb/ui/components/collapsible';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@wb/ui/components/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@wb/ui/components/sheet';
import {
  BookOpen,
  Briefcase,
  Code,
  FileText,
  Heart,
  Mail,
  Menu,
  MessageSquare,
  Moon,
  Package,
  ShoppingCart,
  Sun,
  TrendingUp,
  User,
  Video,
  Wrench,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { cn } from '../../../../packages/ui/src/libs/utils';

const ListItem = function ListItem(
  {
    className,
    title,
    children,
    icon,
    description,
    ...props
  }: React.ComponentPropsWithoutRef<'a'> & {
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
            'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none',
            className
          )}
          {...props}
        >
          <div className='flex items-center gap-2 text-sm leading-none font-medium'>
            {icon}
            {title}
          </div>
          {description && (
            <p className='text-muted-foreground line-clamp-2 text-sm leading-snug'>
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
ListItem.displayName = 'ListItem';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [openCollapsible, setOpenCollapsible] = useState<string | null>(null);

  const showProducts = useVariableValue('show-products', false);
  const showBuyButton = useVariableValue('show-buy-button', false);
  const showGrowth = useVariableValue('show-growth', false);

  // Define the navigation structure
  const navigationItems = [
    {
      name: 'About',
      href: '#',
      icon: <User className='h-4 w-4' />,
      submenu: true,
      visible: true,
      items: [
        {
          name: 'About Me',
          href: '/about',
          icon: <User className='h-4 w-4' />,
          visible: true,
          description: 'Learn about my background, experience, and journey',
        },
        {
          name: 'My Growth',
          href: '/#growth',
          icon: <TrendingUp className='h-4 w-4' />,
          visible: !!showGrowth,
          description: 'Track my progress across various platforms',
        },
        {
          name: 'Testimonials',
          href: '/#testimonials',
          icon: <MessageSquare className='h-4 w-4' />,
          visible: true,
          description: 'What clients and colleagues say about my work',
        },
      ],
    },
    {
      name: 'Work',
      href: '#',
      icon: <Briefcase className='h-4 w-4' />,
      submenu: true,
      visible: true,
      items: [
        {
          name: 'Projects',
          href: '/#projects',
          icon: <Code className='h-4 w-4' />,
          visible: true,
          description: 'Explore my latest development projects',
        },
        {
          name: 'Products',
          href: '/#products',
          icon: <Package className='h-4 w-4' />,
          visible: !!showProducts,
          description: "Software as a Service products I've built",
        },
        {
          name: 'Services',
          href: '/#services',
          icon: <Wrench className='h-4 w-4' />,
          visible: true,
          description: 'Professional services I offer to clients',
        },
        {
          name: 'Sponsors',
          href: '/#sponsors',
          icon: <Heart className='h-4 w-4' />,
          visible: true,
          description: 'Support my work and open source projects',
        },
      ],
    },
    {
      name: 'Resources',
      href: '#',
      icon: <BookOpen className='h-4 w-4' />,
      visible: true,
      submenu: true,
      items: [
        {
          name: 'Blogs',
          href: '/#blogs',
          icon: <FileText className='h-4 w-4' />,
          visible: true,
          description: 'Articles and insights on web development',
        },
        {
          name: 'Videos',
          href: '/#videos',
          icon: <Video className='h-4 w-4' />,
          visible: true,
          description: 'Tutorials and tech talks on YouTube',
        },
      ],
    },
    {
      name: 'Contact Me',
      href: '/#contact',
      icon: <Mail className='h-4 w-4' />,
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
    <header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b backdrop-blur'>
      <div className='mx-auto flex h-16 max-w-[90rem] items-center justify-between px-6 sm:px-8 md:px-12 lg:px-16'>
        <div className='flex items-center gap-2'>
          <Link href='/' className='flex items-center gap-2' aria-label='Home'>
            {theme === 'dark' ? (
              <Image
                src='/images/logo/dark-logo.png'
                alt='Logo'
                width={40}
                height={40}
                priority
                className='h-10 w-10 object-contain'
              />
            ) : (
              <Image
                src='/images/logo/light-logo.png'
                alt='Logo'
                width={40}
                height={40}
                priority
                className='h-10 w-10 object-contain'
              />
            )}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className='hidden items-center gap-6 lg:flex'>
          <NavigationMenu>
            <NavigationMenuList>
              {navigationItems
                .filter((item) => item.visible)
                .map((item) => (
                  <NavigationMenuItem key={item.name}>
                    {item.submenu ? (
                      <>
                        <NavigationMenuTrigger className='flex items-center gap-2'>
                          {item.icon}
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
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
                        className='group bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50'
                      >
                        <span className='flex items-center gap-2'>
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
            <Button variant='default' size='sm' className='gap-1' asChild>
              <Link href='/theme/pricing'>
                <ShoppingCart className='h-4 w-4' />
                Buy Theme
              </Link>
            </Button>
          )}

          <Button
            variant='ghost'
            size='icon'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label='Toggle theme'
          >
            <Sun className='h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
            <Moon className='absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className='lg:hidden'>
            <Button variant='ghost' size='icon' aria-label='Menu'>
              <Menu className='h-5 w-5' />
            </Button>
          </SheetTrigger>
          <SheetContent side='right' className='w-[250px] sm:w-[300px]'>
            <SheetHeader>
              <SheetTitle className='text-lg font-semibold'>
                Menu Options
              </SheetTitle>
            </SheetHeader>
            <nav className='mt-8 flex flex-col gap-4 px-2'>
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
                          <button className='hover:text-primary hover:bg-accent flex w-full items-center justify-between rounded-md p-2 text-sm font-medium transition-colors'>
                            <span className='flex items-center gap-2'>
                              {item.icon}
                              {item.name}
                            </span>
                            <svg
                              className={`h-4 w-4 transition-transform ${
                                openCollapsible === item.name
                                  ? 'rotate-180'
                                  : ''
                              }`}
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M19 9l-7 7-7-7'
                              />
                            </svg>
                          </button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className='border-border mt-2 space-y-2 border-l pl-6'>
                          {item.items
                            ?.filter((item) => item.visible)
                            .map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className='hover:bg-accent flex items-start gap-3 rounded-md p-2 text-sm transition-colors'
                              >
                                <div className='text-muted-foreground mt-0.5'>
                                  {subItem.icon}
                                </div>
                                <div className='flex-1'>
                                  <div className='text-foreground font-medium'>
                                    {subItem.name}
                                  </div>
                                  <div className='text-muted-foreground mt-1 text-xs leading-relaxed'>
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
                        className='hover:text-primary hover:bg-accent flex items-center gap-2 rounded-md p-2 text-sm font-medium transition-colors'
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}

              {showBuyButton && (
                <Link
                  href='/theme/pricing'
                  className='hover:text-primary hover:bg-accent border-border mt-4 flex items-center gap-2 rounded-md border p-2 text-sm font-medium transition-colors'
                >
                  <ShoppingCart className='h-4 w-4' />
                  Buy Theme
                </Link>
              )}

              <Button
                variant='ghost'
                size='sm'
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className='mt-4 justify-start px-2'
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className='mr-2 h-4 w-4' />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className='mr-2 h-4 w-4' />
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
