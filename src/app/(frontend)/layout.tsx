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
import { domain, isProd } from '@/lib/constants';
import { getClientContext } from '@/lib/feature-toggle/devcycle';
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const analytics = await getGlobalConfig<Analytics>('analytics');
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <DevCycleClientsideProvider context={getClientContext()}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            <div className='flex min-h-screen flex-col'>
              <Navbar />
              <div className='flex-1'>{children}</div>
              <Footer />
            </div>
            {isProd && <GoogleAnalytics gaId={analytics?.googleAnalyticsId || ''} />}
            <Toaster richColors expand position='top-center' />
            {isProd && <CrispChat />}
          </ThemeProvider>
        </DevCycleClientsideProvider>
      </body>
    </html>
  );
}
