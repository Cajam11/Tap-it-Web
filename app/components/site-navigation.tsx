"use client";

import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";

import { useThemeMode } from "../use-theme";
import { BrandMark } from "./brand-mark";
import { navItems, useSectionLinks } from "./site-links";

export function SiteNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useThemeMode();
  const { hrefFor, onAnchorClick } = useSectionLinks();

  const isDark = theme === "dark";
  const navSurface = isDark
    ? "border-white/15 bg-[#111827]/[0.42] shadow-[0_18px_70px_rgba(0,0,0,0.24)]"
    : "border-white/65 bg-white/[0.72] shadow-[0_18px_70px_rgba(15,23,42,0.14)]";
  const brandText = isDark ? "text-white" : "text-slate-950";
  const linkTone = isDark
    ? "text-slate-300 hover:bg-white/[0.08] hover:text-white"
    : "text-slate-600 hover:bg-slate-950/[0.06] hover:text-slate-950";
  const iconButtonTone = isDark
    ? "border-white/10 bg-white/[0.06] text-white hover:bg-white/[0.1]"
    : "border-slate-950/10 bg-white/70 text-slate-950 hover:bg-white";
  const mobileSurface = isDark
    ? "border-white/15 bg-[#111827]/[0.86] shadow-[0_18px_70px_rgba(0,0,0,0.28)]"
    : "border-white/65 bg-white/[0.86] shadow-[0_18px_70px_rgba(15,23,42,0.14)]";

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setMenuOpen(false);
    onAnchorClick(event, href);
  };

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6">
      <nav
        className={`mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 rounded-2xl border px-3 backdrop-blur-2xl backdrop-saturate-150 transition-colors duration-300 sm:px-4 ${navSurface}`}
      >
        <Link
          href={hrefFor("#platforma")}
          onClick={(event) => handleNavClick(event, "#platforma")}
          className="flex min-w-0 items-center gap-3"
        >
          <BrandMark className="h-10 w-10 rounded-xl" />
          <span
            className={`truncate text-sm font-bold tracking-tight transition-colors sm:text-base ${brandText}`}
          >
            Tap-it
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={hrefFor(href)}
              onClick={(event) => handleNavClick(event, href)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${linkTone}`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={hrefFor("#kontakt")}
            onClick={(event) => handleNavClick(event, "#kontakt")}
            className="hidden h-10 items-center justify-center rounded-full bg-accent px-5 text-sm font-bold text-white shadow-brand transition hover:bg-accent-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft active:translate-y-px md:inline-flex"
          >
            Bezplatný audit
          </Link>
          <button
            type="button"
            className={`grid h-10 w-10 place-items-center rounded-xl border transition ${iconButtonTone}`}
            aria-label={
              isDark ? "Prepnúť na svetlý režim" : "Prepnúť na tmavý režim"
            }
            onClick={toggleTheme}
          >
            {isDark ? (
              <Sun aria-hidden="true" className="h-[18px] w-[18px]" />
            ) : (
              <Moon aria-hidden="true" className="h-[18px] w-[18px]" />
            )}
          </button>
          <button
            type="button"
            className={`grid h-10 w-10 place-items-center rounded-xl border transition md:hidden ${iconButtonTone}`}
            aria-label={menuOpen ? "Zatvoriť menu" : "Otvoriť menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div
          className={`mx-auto mt-2 grid w-full max-w-7xl gap-1 rounded-2xl border p-2 backdrop-blur-2xl transition-colors md:hidden ${mobileSurface}`}
        >
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={hrefFor(href)}
              onClick={(event) => handleNavClick(event, href)}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${linkTone}`}
            >
              {label}
            </Link>
          ))}
          <Link
            href={hrefFor("#kontakt")}
            onClick={(event) => handleNavClick(event, "#kontakt")}
            className="mt-1 rounded-xl bg-accent px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-accent-bright"
          >
            Bezplatný audit
          </Link>
        </div>
      ) : null}
    </header>
  );
}
