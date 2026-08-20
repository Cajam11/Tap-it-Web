"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Cookie } from "lucide-react";

import { useCookieConsent } from "../use-cookie-consent";

/**
 * Informačná lišta o cookies.
 *
 * Jediné tlačidlo je tu preto, že nie je čo odopierať: obe cookies webu sú
 * funkčné a podľa § 109 ods. 8 zákona č. 452/2021 Z. z. súhlas nevyžadujú.
 * Lišta teda nič neodomyká — berie na vedomie. Keby na web pribudla analytika
 * alebo reklama, musela by dostať aj rovnocennú možnosť odmietnuť.
 *
 * Je to `<section>`, aby ju zachytili svetlé prepisy v `globals.css`, ktoré
 * cielia na `.theme-light section:not(#platforma)`.
 */
export function CookieBanner() {
  const { visible, accept } = useCookieConsent();
  const prefersReducedMotion = useReducedMotion();

  const hidden = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 24 };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.section
          aria-label="Informácia o cookies"
          initial={hidden}
          animate={{ opacity: 1, y: 0 }}
          exit={hidden}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-x-3 bottom-3 z-[60] sm:inset-x-6 sm:bottom-6"
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-5 rounded-2xl border border-white/10 bg-surface p-5 shadow-float backdrop-blur-xl sm:flex-row sm:items-center sm:gap-6 sm:p-6">
            <span
              aria-hidden="true"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent-faint text-accent-soft"
            >
              <Cookie className="h-5 w-5" />
            </span>

            <p className="min-w-0 text-sm leading-6 text-slate-400">
              Ukladáme dve funkčné cookies — voľbu svetlého alebo tmavého režimu
              a to, že si túto lištu videl. Žiadna analytika ani reklama.{" "}
              <Link
                href="/cookies"
                className="font-semibold text-accent-soft underline decoration-accent/40 underline-offset-4 transition hover:text-white"
              >
                Viac o cookies
              </Link>
            </p>

            <button
              type="button"
              onClick={accept}
              className="primary-button w-full shrink-0 sm:w-auto"
            >
              Súhlasím
            </button>
          </div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}
