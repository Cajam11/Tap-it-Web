import type { Metadata } from "next";
import NotFoundContent from "./not-found-content";

export const metadata: Metadata = {
  title: "Stránka sa nenašla",
  description:
    "Túto stránku sa nepodarilo nájsť. Vráťte sa na úvod Tap-it Fitness OS.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return <NotFoundContent />;
}
