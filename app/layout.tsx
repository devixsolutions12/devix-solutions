import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { SmoothScroll } from "@/components/smooth-scroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Devix Solutions | Web Development, UI/UX Design & AI Agents",
    template: "%s | Devix Solutions",
  },
  description:
    "Devix Solutions — Expert web & app development agency specializing in custom websites, UI/UX design, AI agents, AI-integrated websites, mobile apps, and full-stack software solutions. Build your next project with a dedicated team of developers.",
  keywords: [
    "Devix Solutions",
    "Devix",
    "Solutions Devix",
    "web development agency",
    "web development company",
    "custom website development",
    "UI/UX design services",
    "AI agents development",
    "AI integrated websites",
    "mobile app development",
    "full stack development",
    "React development",
    "Next.js development",
    "software development company",
    "hire web developers",
    "build web app",
    "build website",
    "app development services",
    "frontend development",
    "backend development",
    "SaaS development",
    "ecommerce website development",
    "responsive web design",
    "website redesign",
    "startup web development",
    "affordable web development",
  ],
  authors: [{ name: "Devix Solutions", url: "https://www.devixsolutions.shop" }],
  creator: "Devix Solutions",
  publisher: "Devix Solutions",
  metadataBase: new URL("https://www.devixsolutions.shop"),
  alternates: {
    canonical: "https://www.devixsolutions.shop",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.devixsolutions.shop",
    siteName: "Devix Solutions",
    title: "Devix Solutions | Web Development, UI/UX Design & AI Agents",
    description:
      "Expert web & app development agency. Custom websites, UI/UX design, AI agents, mobile apps, and full-stack solutions. 50+ projects delivered.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Devix Solutions - Web Development & AI Agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devix Solutions | Web Development, UI/UX Design & AI Agents",
    description:
      "Expert web & app development agency. Custom websites, UI/UX design, AI agents, mobile apps, and full-stack solutions.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import { ChatBot } from "@/components/ui/chat-bot";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.devixsolutions.shop/#organization",
                  name: "Devix Solutions",
                  url: "https://www.devixsolutions.shop",
                  logo: "https://www.devixsolutions.shop/new-logo-cropped.png",
                  description:
                    "Expert web & app development agency specializing in custom websites, UI/UX design, AI agents, mobile apps, and full-stack software solutions.",
                  sameAs: [],
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer service",
                    availableLanguage: ["English"],
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.devixsolutions.shop/#website",
                  url: "https://www.devixsolutions.shop",
                  name: "Devix Solutions",
                  publisher: {
                    "@id": "https://www.devixsolutions.shop/#organization",
                  },
                  description:
                    "Devix Solutions — Expert web & app development agency offering custom websites, UI/UX design, AI agents, and full-stack solutions.",
                },
                {
                  "@type": "ProfessionalService",
                  "@id": "https://www.devixsolutions.shop/#service",
                  name: "Devix Solutions",
                  url: "https://www.devixsolutions.shop",
                  description:
                    "Web development, app development, UI/UX design, AI agents, and full-stack software solutions.",
                  priceRange: "$$",
                  image: "https://www.devixsolutions.shop/new-logo-cropped.png",
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Development Services",
                    itemListElement: [
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Custom Website Development",
                          description: "Professional custom websites built with React, Next.js, and modern technologies.",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "UI/UX Design",
                          description: "Premium user interface and experience design for web and mobile applications.",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "AI Agents & AI-Integrated Websites",
                          description: "Custom AI agents, chatbots, and AI-powered web applications.",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Mobile App Development",
                          description: "Cross-platform mobile apps with Flutter and React Native.",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Full-Stack Development",
                          description: "End-to-end web application development with modern tech stack.",
                        },
                      },
                    ],
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        <SmoothScroll />
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <ChatBot />
      </body>
    </html>
  );
}
