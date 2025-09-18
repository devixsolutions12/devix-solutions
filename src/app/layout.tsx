import type { Metadata } from "next";
import { Inter, Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import useScrollAnimation from '@/hooks/useScrollAnimation';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Devix Solutions - Modern Websites at Affordable Prices",
  description: "Professional web development services including websites, e-commerce, portfolios, and dashboards. Fast delivery, modern design, affordable pricing.",
  keywords: "web development, website design, e-commerce, portfolio, dashboard, affordable websites, modern design",
  authors: [{ name: "Devix Solutions" }],
  robots: "index, follow",
  openGraph: {
    title: "Devix Solutions - Modern Websites at Affordable Prices",
    description: "Professional web development services with modern design and affordable pricing",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: [
      { url: '/favicon.svg' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico' }
    ],
  },
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    // Add smooth scrolling
    scrollBehavior: 'smooth'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body
        className={`${inter.variable} ${poppins.variable} ${geistMono.variable} antialiased`}
        style={{ scrollBehavior: 'smooth' }}
      >
        {children}
      </body>
    </html>
  );
}