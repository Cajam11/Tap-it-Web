import Link from "next/link";
import { ArrowRight, ChevronRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { ContactSection } from "./contact-section";
import { SiteFooter } from "./site-footer";
import { SiteNavigation } from "./site-navigation";
import type { FaqItem } from "../seo-content";

/**
 * Shell for every page that is not the homepage.
 *
 * Deliberately a server component with static markup: the audit flagged that
 * framer-motion ships the homepage with inline `opacity:0` on ~108 elements, so
 * these pages reveal with CSS instead and their copy is readable in the
 * prerendered HTML even if hydration never runs.
 */
export function SubPage({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen overflow-x-clip bg-base text-slate-100">
      <div aria-hidden="true" className="grain-overlay" />
      <SiteNavigation />
      {children}
      <ContactSection />
      <SiteFooter />
    </main>
  );
}

export function PageHero({
  kicker,
  title,
  lead,
  breadcrumb,
  points,
  media,
}: {
  kicker: string;
  title: ReactNode;
  lead: string;
  breadcrumb: string;
  points?: readonly string[];
  /**
   * Optional artwork for the right-hand column. With it the hero becomes a
   * two-column split at `lg`; without it the layout is unchanged, so the three
   * text-only sub-page heroes keep their full-width measure.
   */
  media?: ReactNode;
}) {
  return (
    <section className="px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:pb-20 lg:pt-40">
      <div
        className={
          media
            ? "mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,31rem)_minmax(0,1fr)] lg:gap-16"
            : "mx-auto max-w-7xl"
        }
      >
        <div className="min-w-0">
        <nav aria-label="Omrvinková navigácia">
          <ol className="hero-reveal hero-reveal-1 flex flex-wrap items-center gap-1 text-xs font-bold text-slate-500">
            <li>
              <Link href="/" className="transition hover:text-white">
                Domov
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-600">
              <ChevronRight className="h-3 w-3" />
            </li>
            <li className="text-accent-soft">{breadcrumb}</li>
          </ol>
        </nav>

        <p className="section-kicker hero-reveal hero-reveal-2 mt-8 block">
          {kicker}
        </p>
        <h1 className="hero-reveal hero-reveal-2 mt-4 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="hero-reveal hero-reveal-3 mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
          {lead}
        </p>

        {points ? (
          <ul
            className={`hero-reveal hero-reveal-3 mt-8 grid max-w-3xl gap-2 ${
              media ? "" : "sm:grid-cols-2"
            }`}
          >
            {points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2 text-sm font-semibold leading-6 text-slate-300"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                />
                {point}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="hero-reveal hero-reveal-4 mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/#kontakt" className="primary-button">
            Bezplatný audit prevádzky
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <Link href="/#platforma" className="secondary-button">
            Pozrieť platformu
          </Link>
        </div>
        </div>

        {media ? (
          <div className="hero-reveal hero-reveal-4 min-w-0">{media}</div>
        ) : null}
      </div>
    </section>
  );
}

export function PageSection({
  id,
  kicker,
  title,
  lead,
  children,
  tone = "base",
}: {
  id?: string;
  kicker?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
  tone?: "base" | "surface";
}) {
  return (
    <section
      id={id}
      className={`px-4 py-16 sm:px-6 lg:py-24 ${
        tone === "surface" ? "bg-surface" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl">
        {kicker ? <p className="section-kicker">{kicker}</p> : null}
        <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {lead ? (
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400">
            {lead}
          </p>
        ) : null}
        {children ? <div className="mt-12">{children}</div> : null}
      </div>
    </section>
  );
}

/** Long-form prose block. Keeps the measure readable on wide monitors. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="grid max-w-3xl gap-5 text-base leading-8 text-slate-400 [&_strong]:font-bold [&_strong]:text-white">
      {children}
    </div>
  );
}

export function CardGrid({
  items,
  columns = 3,
}: {
  items: readonly {
    title: string;
    text: string;
    icon?: LucideIcon;
  }[];
  columns?: 2 | 3 | 4;
}) {
  const columnClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div className={`grid gap-4 ${columnClass}`}>
      {items.map(({ title, text, icon: Icon }) => (
        <article
          key={title}
          className="rounded-3xl border border-white/10 bg-surface p-6 shadow-card transition hover:border-accent/35 hover:bg-raised"
        >
          {Icon ? (
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent-faint text-accent-soft">
              <Icon aria-hidden="true" className="h-5 w-5" />
            </span>
          ) : null}
          <h3 className="mt-5 text-lg font-black leading-7 tracking-tight text-white">
            {title}
          </h3>
          <p className="mt-3 text-sm font-semibold leading-7 text-slate-400">
            {text}
          </p>
        </article>
      ))}
    </div>
  );
}

export function NumberedSteps({
  items,
}: {
  items: readonly { title: string; text: string }[];
}) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2">
      {items.map((item, index) => (
        <li
          key={item.title}
          className="rounded-3xl border border-white/10 bg-surface p-6 shadow-card"
        >
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-accent-faint text-sm font-black text-accent-soft">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-5 text-lg font-black leading-7 tracking-tight text-white">
            {item.title}
          </h3>
          <p className="mt-3 text-sm font-semibold leading-7 text-slate-400">
            {item.text}
          </p>
        </li>
      ))}
    </ol>
  );
}

export function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 rounded-2xl border border-white/10 bg-surface px-5 py-4"
        >
          <span
            aria-hidden="true"
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
          />
          <span className="text-sm font-semibold leading-7 text-slate-300">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Visible counterpart to the FAQPage node in the page's JSON-LD — both read the
 * same array, so the markup can never drift from the schema.
 */
export function FaqSection({ items }: { items?: readonly FaqItem[] }) {
  if (!items?.length) return null;

  return (
    <PageSection
      id="otazky"
      kicker="Časté otázky"
      title="Otázky, ktoré dostávame najčastejšie."
      tone="surface"
    >
      <div className="grid gap-4">
        {items.map((item, index) => (
          <article
            key={item.question}
            className="rounded-3xl border border-white/10 bg-base/[0.72] p-5 shadow-card transition hover:border-accent/35 hover:bg-raised sm:p-6"
          >
            <div className="flex items-start gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-accent-faint text-sm font-black text-accent-soft">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg font-black leading-7 tracking-tight text-white">
                  {item.question}
                </h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-400">
                  {item.answer}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </PageSection>
  );
}

/** Contextual links out to the sibling pages, so none of them sits orphaned. */
export function RelatedPages({
  items,
}: {
  items: readonly { title: string; text: string; href: string }[];
}) {
  return (
    <section className="px-4 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-xs font-black uppercase tracking-[0.16em] text-slate-300">
          Ďalej na Tap-it
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-3xl border border-white/10 bg-surface p-6 transition hover:border-accent/35 hover:bg-raised"
            >
              <h3 className="flex items-center gap-2 text-base font-black tracking-tight text-white">
                {item.title}
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 text-accent-soft transition group-hover:translate-x-1"
                />
              </h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-400">
                {item.text}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
