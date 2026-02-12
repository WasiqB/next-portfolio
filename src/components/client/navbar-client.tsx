'use client';

import { Menu, Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn, smoothScrollTo } from '@/lib/utils';
import type { Media, Navbar } from '@/payload/types';
import DynamicLucideIcon, { type IconName } from '../dynamic-icon';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';

const ListItem = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<'a'> & {
    icon?: string;
    title: string;
    description?: string;
  }
>(({ className, title, children, icon, description, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className='flex items-center gap-2 text-sm font-medium leading-none'>
            {icon && <DynamicLucideIcon name={icon as IconName} className='h-4 w-4' />}
            {title}
          </div>
          {description && <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{description}</p>}
          {children}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

interface NavbarClientProps {
  navbar: Navbar;
}

export default function NavbarClient({ navbar }: NavbarClientProps) {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [openCollapsible, setOpenCollapsible] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleCollapsible = (name: string) => {
    setOpenCollapsible(openCollapsible === name ? null : name);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    smoothScrollTo(e, () => setIsSheetOpen(false));
  };

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    setIsSheetOpen(false);
  };

  const lightLogo = navbar.logo.lightLogo as Media;
  const darkLogo = navbar.logo.darkLogo as Media;

  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 h-16'>
      <div className='max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 flex h-16 items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link href='/' className='flex items-center gap-2' aria-label='Home'>
            {!isMounted ? (
              <div className='h-10 w-10 animate-pulse rounded-full bg-muted' />
            ) : theme === 'dark' ? (
              <Image
                src={darkLogo.url || ''}
                alt={darkLogo.alt || 'Logo'}
                width={40}
                height={40}
                priority
                className='h-10 w-10 object-contain'
              />
            ) : (
              <Image
                src={lightLogo.url || ''}
                alt={lightLogo.alt || 'Logo'}
                width={40}
                height={40}
                priority
                className='h-10 w-10 object-contain'
              />
            )}
          </Link>
        </div>

        {!isMounted ? (
          <div className='flex items-center gap-6'>
            <div className='hidden lg:flex gap-6'>
              {[1, 2, 3].map((i) => (
                <div key={i} className='h-4 w-20 animate-pulse rounded bg-muted' />
              ))}
            </div>
            <div className='h-9 w-9 animate-pulse rounded bg-muted' />
          </div>
        ) : (
          <>
            {/* Desktop Navigation */}
            <nav className='hidden lg:flex items-center gap-6'>
              <NavigationMenu>
                <NavigationMenuList>
                  {navbar.navItems
                    ?.filter((item) => item.visible)
                    .map((item) => (
                      <NavigationMenuItem key={item.label}>
                        {item.hasSubmenu ? (
                          <>
                            <NavigationMenuTrigger className='flex items-center gap-2'>
                              <DynamicLucideIcon name={item.icon as IconName} className='h-4 w-4' />
                              {item.label}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                              <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                                {item.subNavItems
                                  ?.filter((item) => item.visible)
                                  .map((subItem) => (
                                    <ListItem
                                      key={subItem.label}
                                      title={subItem.label}
                                      href={subItem.url}
                                      icon={subItem.icon}
                                      description={subItem.description || ''}
                                      onClick={handleClick}
                                    />
                                  ))}
                              </ul>
                            </NavigationMenuContent>
                          </>
                        ) : (
                          <NavigationMenuLink
                            href={item.url}
                            className='group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-active:bg-accent/50 data-[state=open]:bg-accent/50'
                            onClick={handleClick}
                          >
                            <span className='flex items-center gap-2'>
                              <DynamicLucideIcon name={item.icon as IconName} className='h-4 w-4' />
                              {item.label}
                            </span>
                          </NavigationMenuLink>
                        )}
                      </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
              </NavigationMenu>

              {navbar.buyButton?.[0]?.visible && (
                <Button variant='default' size='sm' className='gap-1' asChild>
                  <Link href={navbar.buyButton[0].url}>
                    <DynamicLucideIcon name={navbar.buyButton[0].icon as IconName} className='h-4 w-4' />
                    {navbar.buyButton[0].label}
                  </Link>
                </Button>
              )}

              <Button variant='ghost' size='icon' onClick={handleThemeToggle} aria-label='Toggle theme'>
                <Sun className='h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                <Moon className='absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
              </Button>
            </nav>

            {/* Mobile Navigation */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild className='lg:hidden'>
                <Button variant='ghost' size='icon' aria-label='Menu'>
                  <Menu className='h-5 w-5' />
                </Button>
              </SheetTrigger>
              <SheetContent side='right' className='w-[250px] sm:w-[300px]'>
                <SheetHeader>
                  <SheetTitle className='text-lg font-semibold'>Menu Options</SheetTitle>
                </SheetHeader>
                <nav className='flex flex-col gap-4 mt-8 px-2'>
                  {navbar.navItems
                    ?.filter((item) => item.visible)
                    .map((item) => (
                      <div key={item.label}>
                        {item.hasSubmenu ? (
                          <Collapsible
                            open={openCollapsible === item.label}
                            onOpenChange={() => toggleCollapsible(item.label)}
                          >
                            <CollapsibleTrigger asChild>
                              <Button className='flex items-center justify-between w-full text-sm font-medium transition-colors hover:text-primary p-2 rounded-md hover:bg-accent'>
                                <span className='flex items-center gap-2'>
                                  <DynamicLucideIcon name={item.icon as IconName} className='h-4 w-4' />
                                  {item.label}
                                </span>
                                <svg
                                  className={`h-4 w-4 transition-transform ${
                                    openCollapsible === item.label ? 'rotate-180' : ''
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
                              </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className='pl-6 mt-2 space-y-2 border-l border-border'>
                              {item.subNavItems
                                ?.filter((item) => item.visible)
                                .map((subItem) => (
                                  <Link
                                    key={subItem.label}
                                    href={subItem.url}
                                    className='flex items-start gap-3 p-2 rounded-md text-sm hover:bg-accent transition-colors'
                                    onClick={handleClick}
                                  >
                                    <div className='text-muted-foreground mt-0.5'>
                                      <DynamicLucideIcon name={subItem.icon as IconName} className='h-4 w-4' />
                                    </div>
                                    <div className='flex-1'>
                                      <div className='font-medium text-foreground'>{subItem.label}</div>
                                      {subItem.description && (
                                        <div className='text-xs text-muted-foreground mt-1 leading-relaxed'>
                                          {subItem.description}
                                        </div>
                                      )}
                                    </div>
                                  </Link>
                                ))}
                            </CollapsibleContent>
                          </Collapsible>
                        ) : (
                          <Link
                            href={item.url}
                            className='flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary p-2 rounded-md hover:bg-accent'
                            onClick={handleClick}
                          >
                            <DynamicLucideIcon name={item.icon as IconName} className='h-4 w-4' />
                            {item.label}
                          </Link>
                        )}
                      </div>
                    ))}

                  {navbar.buyButton?.[0]?.visible && (
                    <Link
                      href={navbar.buyButton[0].url}
                      className='flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary p-2 rounded-md hover:bg-accent mt-4 border border-border'
                      onClick={handleClick}
                    >
                      <DynamicLucideIcon name={navbar.buyButton[0].icon as IconName} className='h-4 w-4' />
                      {navbar.buyButton[0].label}
                    </Link>
                  )}

                  <Button variant='ghost' size='sm' onClick={handleThemeToggle} className='justify-start px-2 mt-4'>
                    {theme === 'dark' ? (
                      <>
                        <Sun className='h-4 w-4 mr-2' />
                        Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className='h-4 w-4 mr-2' />
                        Dark Mode
                      </>
                    )}
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </>
        )}
      </div>
    </header>
  );
}
