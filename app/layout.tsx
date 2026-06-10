import type { Metadata, Viewport } from "next";
import "./globals.css";

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
    <html lang="sk" className="scroll-smooth">
      <body className="bg-ice text-ink antialiased">{children}</body>
    </html>
  );
}
