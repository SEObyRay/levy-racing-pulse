import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GlobalSchemas from "@/components/seo/GlobalSchemas";

const headline = Poppins({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-headline" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL("https://vsgtalent.nl"),
  title: {
    default: "VSG Talent - Altijd 100%, in weer en wind",
    template: "%s | VSG Talent",
  },
  description:
    "VSG Talent ondersteunt veelbelovende sporters in Nederland. Ontdek onze talenten zoals Levy Opbergen en word partner. Een initiatief van VSG Dakwerken.",
  keywords: [
    "VSG Talent",
    "VSG Dakwerken",
    "sportsponsoring",
    "talent development",
    "Levy Opbergen",
    "karting",
    "motorsport",
    "Nederlandse sporters",
    "sport partnerships",
    "altijd 100%",
  ],
  authors: [{ name: "VSG Talent" }],
  creator: "VSG Talent",
  publisher: "VSG Dakwerken",
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
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://vsgtalent.nl",
    siteName: "VSG Talent",
    title: "VSG Talent - Altijd 100%, in weer en wind",
    description: "VSG Talent ondersteunt veelbelovende sporters in Nederland. Ontdek onze talenten en word partner.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Levy Opbergen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@vsgdakwerken",
    creator: "@vsgdakwerken",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "verification_token_here",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl">
      <head>
        <link rel="dns-prefetch" href="//levy-racing-backend.local" />
        <link rel="preconnect" href="https://levy-racing-backend.local" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${headline.variable} ${body.variable} antialiased bg-background text-foreground`}>
        <GlobalSchemas />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
