"use client";

import { useEffect, useRef, useState } from "react";

/** Len to, čo obsah potrebuje — žiadne `ReactNode` cez hranicu servera. */
export type LegalTocItem = { id: string; title: string };

/**
 * Čítacia čiara: bod pod fixnou navigáciou, podľa ktorého sa určuje, v ktorom
 * článku sa čitateľ nachádza. Aktívny je posledný článok, ktorého vrch ju už
 * prešiel — rovnaké pravidlo, aké dáva `scroll-mt-28` kotvám.
 */
const READING_LINE = 140;

/**
 * Obsah právneho dokumentu so zvýraznením práve čítaného článku.
 *
 * Jediný klientský ostrovček na inak statických právnych stránkach. Zoznam sa
 * aj tak vyrenderuje na serveri a odkazy sú obyčajné kotvy, takže bez
 * JavaScriptu funguje presne ako predtým — zvýraznenie je nadstavba, nie
 * podmienka použiteľnosti.
 *
 * Zámerne to nestojí na `IntersectionObserver`: články majú veľmi rozdielnu
 * dĺžku a pri viacerých naraz v zábere by sa aktívna položka preskakovala.
 * Porovnanie vrchov voči jednej čiare dá vždy jednu odpoveď.
 */
export function LegalToc({ items }: { items: readonly LegalTocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;

      // Na konci stránky sa posledné články už nemajú kam posunúť; bez tejto
      // výnimky by zostal zvýraznený ten, ktorý čiaru prešiel ako posledný.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (atBottom) {
        setActiveId(items[items.length - 1]?.id ?? null);
        return;
      }

      let current: string | null = null;
      for (const item of items) {
        const element = document.getElementById(item.id);
        if (element && element.getBoundingClientRect().top <= READING_LINE) {
          current = item.id;
        }
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  /*
   * Pri dlhom dokumente sa bočný stĺpec sám roluje, takže aktívna položka vie
   * vyjsť zo záberu. Dorovnáva sa `scrollTop` samotného stĺpca — `scrollIntoView`
   * by potiahol aj stránku a čitateľovi ukradol miesto, kde práve je.
   */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !activeId) return;
    if (nav.scrollHeight <= nav.clientHeight) return;

    const link = nav.querySelector<HTMLElement>(`[href="#${CSS.escape(activeId)}"]`);
    if (!link) return;

    const navBox = nav.getBoundingClientRect();
    const linkBox = link.getBoundingClientRect();
    const margin = 24;

    const overflowTop = navBox.top + margin - linkBox.top;
    const overflowBottom = linkBox.bottom - (navBox.bottom - margin);
    if (overflowTop <= 0 && overflowBottom <= 0) return;

    nav.scrollBy({
      top: overflowTop > 0 ? -overflowTop : overflowBottom,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, [activeId]);

  return (
    <nav
      ref={navRef}
      aria-label="Obsah dokumentu"
      className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto lg:pr-2"
    >
      <h2 className="text-xs font-black uppercase tracking-[0.16em] text-slate-300">
        Obsah
      </h2>
      <ol className="mt-5 grid gap-2.5">
        {items.map((item, index) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`flex gap-3 text-sm font-semibold leading-6 transition hover:text-white ${
                  isActive ? "text-white" : "text-slate-500"
                }`}
              >
                <span
                  className={`font-display tabular-nums transition ${
                    isActive ? "text-accent-soft" : "text-slate-500"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">{item.title}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
