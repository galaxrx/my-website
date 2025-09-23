import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import { cn } from "./cn";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import "./styles/globals.css";
import { Suspense } from "react";
import dynamic from 'next/dynamic';

// Load Analytics only on the client (no SSR)
const Analytics = dynamic(() => import('./components/Analytics'), { ssr: false });

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fontSora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  // Added metadataBase to resolve the build warning.
  metadataBase: new URL("https://galaxrx.com"),
  title: "GALAXRX | AI-Powered Stock Management for Pharmacies",
  description: "Automate forecasts, optimize inventory, plan promotions, and buy smarter—so you can focus on patients, not spreadsheets.",
  openGraph: {
    title: "GALAXRX",
    description: "AI-Powered Stock Management for Pharmacies.",
    url: "https://galaxrx.com",
    siteName: "GALAXRX",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GALAXRX",
    description: "AI-Powered Stock Management for Pharmacies.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark !scroll-smooth"> {/* Added 'dark' class */}
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          fontInter.variable,
          fontSora.variable
        )}
      >
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <SiteHeader />
        <main className="relative flex flex-col items-center">
            {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}