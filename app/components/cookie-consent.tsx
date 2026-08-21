"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { useState } from "react";

import { useConsent } from "../use-cookie-consent";

/**
 * Súhlas s cookies — lišta pri prvej návšteve a koliesko, ktorým sa dá
 * rozhodnutie kedykoľvek zmeniť.
 *
 * Lišta je skutočná brána, nie oznam: kým návštevník nedá súhlas, web si
 * neuloží ani voľbu témy (pozri `useThemeMode`). Preto má aj rovnocenné
 * tlačidlo na odmietnutie a odvolať súhlas sa dá rovnako ľahko, ako sa dal.
 *
 * Oboje sú `<section>`, aby ich zachytili svetlé prepisy v `globals.css`, ktoré
 * cielia na `.theme-light section:not(#platforma)`.
 */
export function CookieConsent() {
  const { consent, grant, deny } = useConsent();
  const [reopened, setReopened] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const decided = consent !== "unset";
  const open = !decided || reopened;

  const hidden = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 };
  const transition = { duration: 0.35, ease: "easeOut" } as const;

  const choose = (decide: () => void) => () => {
    decide();
    setReopened(false);
  };

  return (
    <>
      <AnimatePresence>
        {open ? null : (
          <motion.section
            aria-label="Nastavenia cookies"
            initial={hidden}
            animate={{ opacity: 1, y: 0 }}
            // Rýchlejší odchod než príchod lišty, aby sa v pravom dolnom rohu
            // neprekrývali — lišta ide cez celú šírku obrazovky.
            exit={{ ...hidden, transition: { duration: 0.15 } }}
            transition={transition}
            className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6"
          >
            <button
              type="button"
              onClick={() => setReopened(true)}
              aria-label="Otvoriť nastavenia cookies"
              title="Nastavenia cookies"
              className="cookie-wheel grid h-12 w-12 place-items-center rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft active:translate-y-px"
            >
              <Cookie aria-hidden="true" className="h-5 w-5" />
            </button>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.section
            aria-label="Nastavenia cookies"
            initial={hidden}
            animate={{ opacity: 1, y: 0 }}
            exit={hidden}
            transition={transition}
            className="fixed inset-x-3 bottom-3 z-[60] sm:inset-x-6 sm:bottom-6"
          >
            <div className="relative mx-auto max-w-3xl rounded-2xl border border-white/10 bg-surface p-4 shadow-float backdrop-blur-xl sm:p-6">
              {decided ? (
                <button
                  type="button"
                  onClick={() => setReopened(false)}
                  aria-label="Zavrieť nastavenia cookies"
                  className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full text-slate-500 transition hover:bg-white/[0.06] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft"
                >
                  <X aria-hidden="true" className="h-4 w-4" />
                </button>
              ) : null}

              <div className="flex gap-3 sm:gap-5">
                <span
                  aria-hidden="true"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-accent-faint text-accent-soft sm:h-11 sm:w-11"
                >
                  <Cookie className="h-5 w-5" />
                </span>

                <div className="min-w-0 pr-8 sm:pr-10">
                  <p className="text-sm font-bold tracking-tight text-white">
                    Cookies na tomto webe
                  </p>
                  <p className="mt-1.5 text-sm leading-6 text-slate-400">
                    Bez tvojho súhlasu si web nezapamätá nič — ani voľbu svetlého
                    alebo tmavého režimu. Žiadna analytika, žiadna reklama.{" "}
                    <Link
                      href="/cookies"
                      className="font-semibold text-accent-soft underline decoration-accent/40 underline-offset-4 transition hover:text-white"
                    >
                      Viac o cookies
                    </Link>
                  </p>
                  {decided ? (
                    <p className="mt-2 text-xs font-bold text-slate-500">
                      {consent === "granted"
                        ? "Aktuálne máme súhlas na ukladanie funkčných cookies."
                        : "Aktuálne neukladáme žiadne cookies okrem tohto rozhodnutia."}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 sm:mt-5 sm:flex-row sm:justify-end sm:gap-3">
                <button
                  type="button"
                  onClick={choose(deny)}
                  className="secondary-button w-full sm:w-auto"
                >
                  Odmietnuť
                </button>
                <button
                  type="button"
                  onClick={choose(grant)}
                  className="primary-button w-full sm:w-auto"
                >
                  Súhlasím
                </button>
              </div>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </>
  );
}
