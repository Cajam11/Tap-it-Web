import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

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
  title: "Tap-it | SaaS systém pre fitness centrá",
  description:
    "Tap-it spája QR vstupy, členstvá, rezervácie, smeny a admin panel do jedného operačného systému pre fitness centrá.",
  openGraph: {
    title: "Tap-it | Fitness OS",
    description:
      "QR vstupy, členstvá, rezervácie a prevádzka fitka v jednom SaaS systéme.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sk"
      className={`${fraunces.variable} ${manrope.variable} scroll-smooth`}
    >
      <body className="bg-base font-sans text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
