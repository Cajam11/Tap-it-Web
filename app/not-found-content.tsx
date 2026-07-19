"use client";

import Link from "next/link";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useThemeMode } from "./use-theme";

const revealContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function NotFoundContent() {
  const reduceMotion = useReducedMotion();
  const { theme, toggleTheme } = useThemeMode();
  const isDark = theme === "dark";

  const revealItem: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  return (
    <main
      className="relative flex min-h-screen flex-col overflow-x-clip bg-base text-slate-100"
    >
      <div aria-hidden="true" className="grain-overlay" />
      <div aria-hidden="true" className="notfound-bg" />
      <div aria-hidden="true" className="hero-grid" />
      <p
        aria-hidden="true"
        className="notfound-watermark font-display font-semibold tracking-tight"
      >
        TAP-IT
      </p>

      <section className="relative z-10 flex flex-1 items-center justify-center px-6 py-16 sm:px-10">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          animate="visible"
          className="flex w-full max-w-2xl flex-col items-center text-center"
        >
          <motion.button
            variants={revealItem}
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDark ? "Prepnúť na svetlý režim" : "Prepnúť na tmavý režim"
            }
            className={`mb-9 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft active:translate-y-px ${
              isDark
                ? "border-white/10 bg-white/[0.04] text-slate-400 hover:border-white/25 hover:text-white"
                : "border-slate-950/10 bg-white/70 text-slate-500 hover:border-slate-950/25 hover:text-slate-950"
            }`}
          >
            {isDark ? (
              <Sun aria-hidden="true" className="h-3.5 w-3.5" />
            ) : (
              <Moon aria-hidden="true" className="h-3.5 w-3.5" />
            )}
            {isDark ? "Svetlý" : "Tmavý"}
          </motion.button>

          <motion.div
            variants={revealItem}
            aria-hidden="true"
            className="notfound-phone-dock"
          >
            <div className="notfound-phone">
              <figure className="member-phone-frame">
                <div className="member-phone-speaker" />
                <div className="member-phone-screen">
                  <div className="notfound-screen-content">
                    <p className="notfound-screen-code rotate-90 font-display font-semibold leading-none tracking-tight text-ivory">
                      4<span className="text-accent">0</span>4
                    </p>
                  </div>
                </div>
              </figure>
            </div>
          </motion.div>

          <motion.h1
            variants={revealItem}
            className="mt-12 text-balance text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Táto stránka neexistuje.
          </motion.h1>

          <motion.p
            variants={revealItem}
            className="mt-5 max-w-lg text-pretty text-base leading-7 text-slate-400"
          >
            Odkaz je pravdepodobne neplatný alebo sme stránku presunuli.
            Vráťte sa na úvod a pokračujte odtiaľ.
          </motion.p>

          <motion.div variants={revealItem} className="mt-9">
            <Link href="/" className="primary-button">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              Späť na úvod
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
