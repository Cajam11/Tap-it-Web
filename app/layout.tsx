import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { themeBootstrapScript } from "./use-theme";
import {
  siteDescription,
  siteName,
  siteTitle,
  siteUrl,
  structuredData,
} from "./seo-content";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  // No `keywords` meta: Google has ignored it since 2009. The keyword list
  // still earns its keep in the JSON-LD `knowsAbout` graph and in llms.txt.
  applicationName: "Tap-it Fitness OS",
  authors: [{ name: "Tap-it" }],
  creator: "Tap-it",
  publisher: "Tap-it",
  category: "fitness software",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName,
    locale: "sk_SK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const jsonLd = JSON.stringify(structuredData).replace(/</g, "\\u003c");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sk"
      className={`${fraunces.variable} ${manrope.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body className="bg-base font-sans text-slate-100 antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      </body>
    </html>
  );
}
