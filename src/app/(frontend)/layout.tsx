import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Fira_Code, Poppins, Roboto } from 'next/font/google';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import '@/app/(frontend)/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from 'sonner';
import ScrollToTop from '@/components/client/scroll-to-top';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import CrispChat from '@/components/pages/crisp-chat';
import FooterSkeleton from '@/components/skeletons/footer-skeleton';
import NavbarSkeleton from '@/components/skeletons/navbar-skeleton';
import { ThemeProvider } from '@/components/theme-provider';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import analytics from '@/data/page-data/analytics.json';
import { domain, isProd } from '@/lib/constants';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-serif',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
});

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

function LayoutContent({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
      <div className='flex min-h-screen flex-col'>
        <Suspense fallback={<NavbarSkeleton />}>
          <Navbar />
          <ScrollProgress />
        </Suspense>
        <div className='flex-1'>{children}</div>
        <ScrollToTop />
        <Suspense fallback={<FooterSkeleton />}>
          <Footer />
        </Suspense>
      </div>
      <Toaster richColors expand position='top-center' />
      {isProd && <CrispChat />}
      <SpeedInsights />
    </ThemeProvider>
  );
}

async function AnalyticsWrapper() {
  if (!isProd) return null;
  const analyticsId = analytics?.gaId;
  if (!analyticsId) return null;
  return <GoogleAnalytics gaId={analyticsId} />;
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${poppins.variable} ${roboto.variable} ${firaCode.variable} font-sans antialiased`}>
        <LayoutContent>{children}</LayoutContent>
        <Suspense>
          <AnalyticsWrapper />
        </Suspense>
      </body>
    </html>
  );
}
