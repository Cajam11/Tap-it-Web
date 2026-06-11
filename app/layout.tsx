import type { Metadata, Viewport } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  weight: ["500", "600", "700"]
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Tap-it - systém pre fitness prevádzky",
  description:
    "Digitálne členstvá, QR vstup, rezervácie, platby a real-time prehľad pre moderné fitká.",
  openGraph: {
    title: "Tap-it - systém pre fitness prevádzky",
    description:
      "Digitálne členstvá, QR vstup, rezervácie, platby a real-time prehľad pre moderné fitká.",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className={`${sora.variable} ${manrope.variable} scroll-smooth`}>
      <body className="bg-base font-sans text-slate-100 antialiased">{children}</body>
    </html>
  );
}
