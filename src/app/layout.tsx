import { GoogleAnalytics } from '@next/third-parties/google';
import type React from 'react';
import '@/app/globals.css';
import { DevCycleClientsideProvider } from '@devcycle/nextjs-sdk';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import { Toaster } from 'sonner';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import CrispChat from '@/components/pages/crisp-chat';
import { ThemeProvider } from '@/components/theme-provider';
import { Data } from '@/data/portfolio-data';
import { isProd } from '@/lib/constants';
import { getClientContext } from '@/lib/feature-toggle/devcycle';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: Data.hero.name,
    template: `%s | ${Data.about.name}`,
  },
  description: Data.hero.bio,
  keywords: [
    'Wasiq Bhamla',
    'Wasiq',
    'Bhamla',
    'Automation',
    'Testing',
    'QA',
    'Quality Assurance',
    'Quality Assurance Engineer',
    'Quality Assurance Analyst',
    'Quality Assurance Tester',
    'Quality Assurance Lead',
    'SDET',
    'Selenium WebDriver',
    'Appium',
    'Rest-Assured',
    'WebDriverIO',
    'Java',
    'JavaScript',
    'TypeScript',
    'Open Source',
    'Freelancing',
    'Consulting',
    'Technical Support',
    'Automation Testing',
    'Test Automation',
    'Test Automation Framework',
    'Test Automation Tools',
  ],
  metadataBase: new URL(Data.url),
  openGraph: {
    title: `${Data.hero.name} | ${Data.about.title}`,
    description: Data.hero.bio,
    url: Data.url,
    siteName: Data.hero.name,
    images: [
      {
        url: Data.hero.profileImage.src,
        width: 400,
        height: 400,
        alt: Data.hero.profileImage.alt,
        type: 'image/jpeg',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${Data.hero.name} | ${Data.about.title}`,
    description: Data.hero.bio,
    creator: '@WasiqBhamla',
    images: [Data.hero.profileImage.src],
  },
  alternates: {
    canonical: Data.url,
  },
  icons: {
    icon: '/icons/favicon.ico',
    appleIcon: '/icons/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta name='description' content={metadata.description} />
        <meta
          name='keywords'
          content='Wasiq Bhamla, Software Testing, Web Testing, API Testing, Mobile Testing, Test Automation, Test Automation Framework, Selenium WebDriver, Appium, Rest-Assured, WebDriverIO, JavaScript, Typescript, Open Source'
        />
        <meta name='author' content='Wasiq Bhamla' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='robots' content={JSON.stringify(metadata.robots)} />
        <meta property='og:title' content={metadata.openGraph.title} />
        <meta property='og:description' content={metadata.openGraph.description} />
        <meta property='og:url' content={metadata.openGraph.url} />
        <meta property='og:site_name' content={metadata.openGraph.siteName} />
        <meta property='og:image' content={metadata.openGraph.images[0].url} />
        <meta property='og:image:width' content={metadata.openGraph.images[0].width.toString()} />
        <meta property='og:image:height' content={metadata.openGraph.images[0].height.toString()} />
        <meta property='og:image:alt' content={metadata.openGraph.images[0].alt} />
        <meta property='og:image:type' content={metadata.openGraph.images[0].type} />
        <meta name='twitter:card' content={metadata.twitter.card} />
        <meta name='twitter:title' content={metadata.twitter.title} />
        <meta name='twitter:description' content={metadata.twitter.description} />
        <meta name='twitter:creator' content={metadata.twitter.creator} />
        <meta name='twitter:image' content={metadata.twitter.images[0]} />
        <link rel='canonical' href={metadata.alternates.canonical} />
        <link rel='icon' href={metadata.icons.icon} sizes='any' />
        <link rel='apple-touch-icon' href={metadata.icons.appleIcon} type='image/<generated>' sizes='<generated>' />
      </head>
      <body className={inter.className}>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: Data.hero.name,
              url: Data.url,
              image: Data.hero.profileImage.src,
              sameAs: Data.hero.socialLinks.map((link) => link.url),
              jobTitle: Data.about.title,
              description: Data.hero.bio,
            }),
          }}
        />
        <Suspense>
          <DevCycleClientsideProvider context={getClientContext()}>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
              <div className='flex min-h-screen flex-col'>
                <Navbar />
                <div className='flex-1'>{children}</div>
                <Footer />
              </div>
              {isProd && <GoogleAnalytics gaId={Data.analytics.gaId} />}
              <Toaster richColors expand position='top-center' />
              {isProd && <CrispChat />}
            </ThemeProvider>
          </DevCycleClientsideProvider>
        </Suspense>
      </body>
    </html>
  );
}
