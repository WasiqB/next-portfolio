import { GoogleAnalytics } from '@next/third-parties/google';
import type React from 'react';
import '@/app/(frontend)/globals.css';
import { DevCycleClientsideProvider } from '@devcycle/nextjs-sdk';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import CrispChat from '@/components/pages/crisp-chat';
import { ThemeProvider } from '@/components/theme-provider';
import { Data } from '@/data/portfolio-data';
import { isProd } from '@/lib/constants';
import { getClientContext } from '@/lib/feature-toggle/devcycle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
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
    apple: '/icons/apple-touch-icon.png',
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
      </body>
    </html>
  );
}
