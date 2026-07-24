import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const siteUrl = "https://capitalcitygrooming.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Capital City Grooming & Supply | Dog & Cat Grooming in Olympia, WA",
  description:
    "Full-service dog and cat grooming in Olympia, Washington. Now under new ownership: same location at 1720 4th Ave E, renewed standards. 4.3★ across 116 Google reviews. Call (360) 754-4767.",
  keywords: [
    "pet grooming Olympia",
    "dog grooming Olympia WA",
    "Capital City Grooming",
    "cat grooming Olympia",
  ],
  openGraph: {
    title: "Capital City Grooming & Supply | Olympia, WA",
    description:
      "Full-service dog and cat grooming in Olympia, Washington. Now under new ownership: same location, renewed standards.",
    url: siteUrl,
    siteName: "Capital City Grooming & Supply",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/hero.png",
        width: 1200,
        height: 630,
        alt: "A happy dog on the grooming table at Capital City Grooming & Supply in Olympia, Washington",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Capital City Grooming & Supply | Olympia, WA",
    description:
      "Full-service dog and cat grooming in Olympia, Washington. Now under new ownership: same location, renewed standards.",
    images: ["/images/hero.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
