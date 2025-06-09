import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { getFeatureState } from "@/lib/feature-toggle/client";
import { FeatureProvider } from "@/lib/feature-toggle/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Portfolio",
  description: "A showcase of my work and skills",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const featureState = await getFeatureState();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <FeatureProvider serverState={featureState}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </ThemeProvider>
        </FeatureProvider>
      </body>
    </html>
  );
}
