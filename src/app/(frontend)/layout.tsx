import { GoogleAnalytics } from '@next/third-parties/google';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import '@/app/(frontend)/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import CrispChat from '@/components/pages/crisp-chat';
import FooterSkeleton from '@/components/skeletons/footer-skeleton';
import NavbarSkeleton from '@/components/skeletons/navbar-skeleton';
import { ThemeProvider } from '@/components/theme-provider';
import { domain, isProd } from '@/lib/constants';
import { getGlobalConfig } from '@/payload/fetchers/globals';
import type { Analytics } from '@/payload/types';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(domain),
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

function LayoutContent({ children, analyticsId }: { children: ReactNode; analyticsId?: string | null }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
      <div className='flex min-h-screen flex-col'>
        <Suspense fallback={<NavbarSkeleton />}>
          <Navbar />
        </Suspense>
        <div className='flex-1'>{children}</div>
        <Suspense fallback={<FooterSkeleton />}>
          <Footer />
        </Suspense>
      </div>
      {isProd && <GoogleAnalytics gaId={analyticsId || ''} />}
      <Toaster richColors expand position='top-center' />
      {isProd && <CrispChat />}
    </ThemeProvider>
  );
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const analytics = await getGlobalConfig<Analytics>('analytics');
  const analyticsId = analytics?.googleAnalyticsId;

  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <LayoutContent analyticsId={analyticsId}>{children}</LayoutContent>
      </body>
    </html>
  );
}
