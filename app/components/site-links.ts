"use client";

import { usePathname } from "next/navigation";
import type { MouseEvent as ReactMouseEvent } from "react";

/**
 * Sitewide navigation. Hash entries point at homepage sections; path entries are
 * real routes, so every commercial page carries an inbound link from every other
 * page instead of sitting orphaned behind the footer.
 */
export const navItems = [
  ["Platforma", "#platforma"],
  ["Produkt", "/produkt"],
  ["Prechod", "/migracia"],
  ["Cena", "/cena"],
  ["Kontakt", "#kontakt"],
] as const;

export const footerNavItems = [
  ["Platforma", "#platforma"],
  ["Prečo Tap-it", "#preco"],
  ["Appka", "#appka"],
  ["Otázky", "#otazky"],
  ["Kontakt", "#kontakt"],
] as const;

export const footerPageItems = [
  ["Produkt a ukážky", "/produkt"],
  ["Prechod z iného systému", "/migracia"],
  ["Ako určujeme cenu", "/cena"],
  ["Bezobslužné a nonstop fitká", "/bezobsluzne-fitko"],
] as const;

// Several sections render mutually-exclusive mobile/desktop variants that share
// the same id, so resolve in-page anchors to whichever copy is currently visible.
export function scrollToAnchor(
  event: ReactMouseEvent<HTMLAnchorElement>,
  href: string,
) {
  if (!href.startsWith("#")) return;
  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>(`[id="${href.slice(1)}"]`),
  );
  const target =
    candidates.find((el) => el.offsetParent !== null) ?? candidates[0];
  if (!target) return;
  event.preventDefault();
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  target.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
}

/**
 * A `#section` href only means something on the homepage. Everywhere else the
 * same link has to navigate home first, so it is rewritten to `/#section` and
 * the smooth-scroll handler steps aside and lets the browser do a real
 * navigation.
 */
export function useSectionLinks() {
  const isHome = usePathname() === "/";

  return {
    isHome,
    hrefFor: (href: string) =>
      href.startsWith("#") && !isHome ? `/${href}` : href,
    onAnchorClick: (event: ReactMouseEvent<HTMLAnchorElement>, href: string) => {
      if (!isHome || !href.startsWith("#")) return;
      scrollToAnchor(event, href);
    },
  };
}
