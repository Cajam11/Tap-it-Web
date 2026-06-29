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
  title: "Tap-it | Fitness OS pre moderné fitness centrá",
  description:
    "Tap-it navrhuje QR vstupy, členstvá, rezervácie, migráciu z existujúceho systému, turnikety, skenery, admin panel a mobilnú appku podľa reality tvojej fitness prevádzky.",
  openGraph: {
    title: "Tap-it | Fitness OS pre moderné fitness centrá",
    description:
      "QR vstupy, členstvá, rezervácie, migrácia z existujúceho systému, turnikety, skenery, admin panel a mobilná appka podľa reality tvojej fitness prevádzky.",
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
