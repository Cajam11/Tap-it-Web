"use client";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Check,
  ChevronsLeftRight,
  Menu,
  ScanLine,
  X,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import QRCodeGenerator from "qrcode";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

const navItems = [
  ["Služby", "#sluzby"],
  ["Projekt", "#projekt"],
  ["Proces", "#proces"],
  ["Kontakt", "#kontakt"],
];

const services = [
  {
    number: "01",
    title: "Tvorba webov",
    text: "Nový web od čistého papiera — premyslená štruktúra, vizuál na mieru a kód, ktorý sa rýchlo načíta na každom zariadení.",
    tags: ["UX & dizajn", "Texty a štruktúra", "Next.js vývoj", "Nasadenie"],
  },
  {
    number: "02",
    title: "Redizajn stránok",
    text: "Zo zastaraného webu spravíme vizitku, za ktorú sa nebudete hanbiť. Zachováme, čo funguje, a prekopeme zvyšok.",
    tags: [
      "Audit súčasného webu",
      "Nový vizuál",
      "Migrácia obsahu",
      "Optimalizácia rýchlosti",
    ],
  },
  {
    number: "03",
    title: "Vývoj na mieru",
    text: "Webové aplikácie, rezervačné systémy, interné nástroje a integrácie presne podľa toho, ako funguje vaša firma.",
    tags: [
      "Webové aplikácie",
      "Integrácie & API",
      "Automatizácia",
      "Dlhodobý rozvoj",
    ],
  },
  {
    number: "04",
    title: "E-shopy",
    text: "Obchod, ktorý predáva — od katalógu a platieb až po správu objednávok a automatizácie okolo nich.",
    tags: [
      "Katalóg produktov",
      "Platobné brány",
      "Doprava a sklady",
      "Správa objednávok",
    ],
  },
];

const processSteps = [
  [
    "01",
    "Konzultácia",
    "Nezáväzný rozhovor o cieľoch, rozsahu a rozpočte. Do 48 hodín viete, čo vám vieme postaviť.",
  ],
  [
    "02",
    "Návrh",
    "Wireframy a vizuálny koncept. Iterujeme spolu, kým dizajn nesedí na milimeter.",
  ],
  [
    "03",
    "Vývoj",
    "Čistý a rýchly kód s priebežnými ukážkami — vidíte progres, nie čiernu skrinku.",
  ],
  [
    "04",
    "Spustenie & podpora",
    "Nasadenie, meranie a ďalší rozvoj. Web odovzdaním nekončí, ale začína.",
  ],
];

const caseHighlights = [
  "Dynamický QR vstup s obnovou každých 15 sekúnd",
  "Členstvá, rezervácie a platby cez Stripe",
  "Real-time obsadenosť a scan logy",
  "5 rolí od recepcie po majiteľa",
];

const caseStack = ["Next.js", "React", "Supabase", "Stripe", "Realtime"];

const easterEggMessages = [
  "Našiel si Tap-it easter egg. Recepcia má dnes pokoj.",
  "Tento QR kód nie je vstupenka, ale má dobrý vibe.",
  "Ak toto čítaš po scane, systém práve žmurkol.",
  "Tap-it tip: Menej kartičiek, viac tréningu.",
  "Hidden mode: fitko bez tabuliek odomknuté.",
];

const revealContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const revealItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-base text-slate-100">
      <div aria-hidden="true" className="grain-overlay" />
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <div className="relative z-10 rounded-t-[2.5rem] border-t border-white/10 bg-base shadow-[0_-24px_80px_rgba(3,4,10,0.55)]">
        <IntroSection />
        <ManifestoParallax />
        <ServicesSection />
        <CaseStudySection />
        <ProcessSection />
        <ContactSection />
        <Footer year={year} />
      </div>
    </main>
  );
}

function Navigation({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) {
  const [activeSection, setActiveSection] = useState(navItems[0][1]);
  const suppressSpy = useRef(false);
  const settleTimer = useRef(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const offset = 150;
      const scrollPosition = window.scrollY + offset;
      let current = navItems[0][1];

      for (const [, href] of navItems) {
        const section = document.querySelector<HTMLElement>(href);
        if (
          section &&
          section.getBoundingClientRect().top + window.scrollY <= scrollPosition
        ) {
          current = href;
        }
      }

      setActiveSection(current);
    };

    const onScroll = () => {
      // While a click-initiated smooth scroll runs, hold the spy so the nav
      // pill doesn't hop through every section the scroll passes over.
      if (suppressSpy.current) {
        window.clearTimeout(settleTimer.current);
        settleTimer.current = window.setTimeout(() => {
          suppressSpy.current = false;
          update();
        }, 160);
        return;
      }
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  function handleNavClick(href: string) {
    setActiveSection(href);
    suppressSpy.current = true;
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => {
      suppressSpy.current = false;
    }, 600);
  }

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-4 sm:top-4 sm:px-6">
      <nav className="mx-auto flex h-16 w-full max-w-[22rem] items-center justify-between gap-2 rounded-2xl border border-white/10 bg-base/75 pl-6 pr-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_16px_50px_rgba(3,4,10,0.6)] backdrop-blur-2xl backdrop-saturate-150 lg:max-w-6xl lg:gap-8">
        <a href="#" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-accent">
            <Asterisk aria-hidden="true" className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-ivory">
            Tap-it
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => handleNavClick(href)}
              className={`relative rounded-full px-4 py-2.5 text-sm font-medium transition ${
                activeSection === href
                  ? "text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {activeSection === href ? (
                <motion.span
                  layoutId="active-nav-pill"
                  className="absolute inset-0 rounded-full bg-white/10"
                  transition={{ type: "spring", stiffness: 520, damping: 38 }}
                />
              ) : null}
              <span className="relative">{label}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#kontakt"
            className="hidden h-10 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-white transition hover:bg-accent-bright lg:inline-flex"
          >
            Začať projekt
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </a>

          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.05] lg:hidden"
            type="button"
            aria-label={menuOpen ? "Zatvoriť menu" : "Otvoriť menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X aria-hidden="true" className="h-4 w-4" />
            ) : (
              <Menu aria-hidden="true" className="h-4 w-4" />
            )}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div className="mx-auto mt-2 w-full max-w-[22rem] rounded-2xl border border-white/10 bg-base/85 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_80px_rgba(3,4,10,0.55)] backdrop-blur-2xl backdrop-saturate-150 lg:hidden">
          <div className="grid gap-1">
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => {
                  handleNavClick(href);
                  setMenuOpen(false);
                }}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                  activeSection === href
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/[0.06]"
                }`}
              >
                {label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={() => setMenuOpen(false)}
              className="mt-1 rounded-xl bg-accent px-4 py-3 text-center text-sm font-semibold transition hover:bg-accent-bright"
            >
              Začať projekt
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const titleY = useTransform(
    scrollY,
    [0, 700],
    reduceMotion ? [0, 0] : [0, -180],
  );
  const introY = useTransform(
    scrollY,
    [0, 500],
    reduceMotion ? [0, 0] : [0, -70],
  );
  const introOpacity = useTransform(scrollY, [0, 420], [1, 0.1]);

  return (
    <section className="sticky top-0 z-0 h-svh sm:h-screen">
      <div className="flex h-full flex-col overflow-hidden">
        <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 -z-20 h-full" />
        <div className="hero-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[80%]" />

        <motion.div
          style={{ y: introY, opacity: introOpacity }}
          className="relative flex flex-1 flex-col px-4 pt-24 sm:px-6"
        >
          <div className="mx-auto flex w-full max-w-6xl justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            <span>Webové štúdio</span>
            <span>Dizajn & vývoj · Slovensko</span>
          </div>

          <motion.div
            variants={revealContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-1 flex-col items-center justify-center pb-10 text-center sm:pb-0"
          >
            <motion.span
              variants={revealItem}
              className="grid h-10 w-10 place-items-center rounded-full bg-accent"
            >
              <Asterisk aria-hidden="true" className="h-5 w-5" />
            </motion.span>
            <motion.p
              variants={revealItem}
              className="mt-6 max-w-md font-display text-lg font-medium italic leading-relaxed text-slate-400 sm:text-2xl"
            >
              tvorba webov, redizajn a vývoj na mieru dizajn aj kód pod jednou
              strechou
            </motion.p>
            <motion.span
              variants={revealItem}
              className="mt-10 grid h-9 w-9 place-items-center rounded-full border border-white/10 text-slate-500 motion-safe:animate-bounce"
              aria-hidden="true"
            >
              <ArrowDown className="h-4 w-4" />
            </motion.span>
          </motion.div>
        </motion.div>

        <motion.h1
          style={{ y: titleY }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          className="relative mb-20 w-full whitespace-nowrap pb-6 text-center font-display text-[16vw] font-semibold leading-[0.9] tracking-tight text-ivory sm:mb-0 sm:pb-[3vw]"
        >
          Weby & <em className="italic text-accent-soft">kód</em>
        </motion.h1>
      </div>
    </section>
  );
}

function IntroSection() {
  return (
    <section className="relative px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center lg:text-left"
        >
          <motion.p
            variants={revealItem}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface/80 px-4 py-2 text-xs font-semibold text-accent-soft backdrop-blur lg:mx-0"
          >
            Webové štúdio · dizajn & vývoj
          </motion.p>

          <motion.h2
            variants={revealItem}
            className="mt-6 font-display text-3xl font-semibold leading-[1.08] tracking-tight text-ivory sm:text-4xl xl:text-5xl"
          >
            Staviame weby, ktoré si ľudia{" "}
            <em className="italic text-accent-soft">zapamätajú</em>.
          </motion.h2>

          <motion.p
            variants={revealItem}
            className="mx-auto mt-6 max-w-md text-sm leading-7 text-slate-400 sm:text-base lg:mx-0"
          >
            Tap-it je webové štúdio — tvorba webov, redizajn, e-shopy a vývoj na
            mieru. Od prvej skice po nasadenie, dizajn aj kód pod jednou
            strechou.
          </motion.p>

          <motion.div
            variants={revealItem}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <a href="#kontakt" className="primary-button w-full sm:w-auto">
              Nezáväzná konzultácia
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <a href="#sluzby" className="secondary-button w-full sm:w-auto">
              Pozrieť služby
            </a>
          </motion.div>

          <motion.div
            variants={revealItem}
            className="mt-10 grid grid-cols-3 divide-x divide-white/5 rounded-2xl border border-white/5 bg-surface/60"
          >
            {[
              ["48 h", "prvá odpoveď"],
              ["0", "šablón v kóde"],
              ["100 %", "na mieru"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="px-3 py-4 text-center lg:px-5 lg:text-left"
              >
                <p className="font-display text-xl font-semibold text-ivory sm:text-2xl">
                  {value}
                </p>
                <p className="mt-1 text-[11px] font-medium text-slate-500 sm:text-xs">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <RedesignSlider />
        </motion.div>
      </div>
    </section>
  );
}

function RedesignSlider() {
  const [position, setPosition] = useState(56);

  return (
    <div className="relative rounded-3xl border border-white/10 bg-raised p-2 shadow-float">
      <div className="pointer-events-none absolute -inset-x-10 -top-10 h-28 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative overflow-hidden rounded-2xl border border-white/5">
        <div className="relative aspect-[4/3.4] select-none sm:aspect-[4/3]">
          <AfterPreview />
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <BeforePreview />
          </div>

          <div
            className="pointer-events-none absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-white/70"
            style={{ left: `${position}%` }}
          >
            <span className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-base/90 shadow-card backdrop-blur">
              <ChevronsLeftRight
                aria-hidden="true"
                className="h-4 w-4 text-white"
              />
            </span>
          </div>

          <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur">
            Pred
          </span>
          <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            Po
          </span>

          <input
            type="range"
            min={8}
            max={92}
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
            aria-label="Porovnanie webu pred a po redizajne"
            className="absolute inset-0 z-20 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
          />
        </div>
      </div>

      <p className="px-3 py-3 text-center text-xs font-medium text-slate-500">
        Potiahnite a porovnajte web pred a po redizajne
      </p>
    </div>
  );
}

function BeforePreview() {
  return (
    <div className="flex h-full flex-col bg-[#E3E1D8] p-4 sm:p-5">
      <div className="flex items-center justify-between border-b border-black/10 pb-3">
        <span className="h-3 w-16 rounded-sm bg-black/30" />
        <div className="flex gap-2">
          {[0, 1, 2].map((item) => (
            <span key={item} className="h-2 w-8 rounded-sm bg-black/20" />
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-1 flex-col items-center justify-center gap-2.5 rounded-sm bg-black/[0.06] p-4">
        <span className="h-4 w-3/4 max-w-44 rounded-sm bg-black/25" />
        <span className="h-2.5 w-2/3 max-w-36 rounded-sm bg-black/15" />
        <span className="mt-2 h-6 w-20 rounded-sm bg-[#7A89B0]" />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="h-12 rounded-sm bg-black/10 sm:h-14" />
        ))}
      </div>
    </div>
  );
}

function AfterPreview() {
  return (
    <div className="flex h-full flex-col bg-base p-4 sm:p-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <span className="flex items-center gap-1.5">
          <span className="grid h-4 w-4 place-items-center rounded-full bg-accent">
            <Asterisk aria-hidden="true" className="h-3 w-3" />
          </span>
          <span className="h-2.5 w-12 rounded-full bg-white/25" />
        </span>
        <div className="flex gap-2">
          {[0, 1, 2].map((item) => (
            <span key={item} className="h-2 w-8 rounded-full bg-white/15" />
          ))}
        </div>
      </div>

      <div className="relative mt-4 flex flex-1 flex-col items-start justify-center gap-2.5 overflow-hidden rounded-xl border border-white/5 bg-surface p-4">
        <div className="panel-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute -top-10 left-1/4 h-20 w-2/3 rounded-full bg-accent/25 blur-2xl" />
        <p className="relative font-display text-base font-semibold italic tracking-tight text-ivory sm:text-lg">
          Váš nový web
        </p>
        <span className="relative block h-2 w-2/3 rounded-full bg-white/10" />
        <span className="relative mt-1 inline-flex h-6 items-center rounded-full bg-accent px-3 text-[9px] font-semibold text-white">
          Začnime
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className="h-12 rounded-lg border border-white/5 bg-raised sm:h-14"
          />
        ))}
      </div>
    </div>
  );
}

const floatingTags = [
  {
    label: "Tvorba webov",
    position: "left-[4%] top-[16%]",
    depth: 130,
    hideOnMobile: false,
  },
  {
    label: "Redizajn stránok",
    position: "right-[5%] top-[22%]",
    depth: 80,
    hideOnMobile: false,
  },
  {
    label: "E-shopy",
    position: "left-[10%] bottom-[18%]",
    depth: 60,
    hideOnMobile: false,
  },
  {
    label: "Webové aplikácie",
    position: "right-[8%] bottom-[14%]",
    depth: 150,
    hideOnMobile: true,
  },
  {
    label: "Next.js & React",
    position: "left-[34%] top-[8%]",
    depth: 100,
    hideOnMobile: true,
  },
  {
    label: "SEO základy",
    position: "right-[30%] bottom-[6%]",
    depth: 90,
    hideOnMobile: true,
  },
];

function ManifestoParallax() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const yStatement = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [50, -50],
  );
  const yBackdrop = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-90, 90],
  );
  const rotateMark = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 150],
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden border-y border-white/5 bg-surface py-28 sm:py-36 lg:py-44"
    >
      <motion.p
        style={{ y: yBackdrop }}
        aria-hidden="true"
        className="text-outline pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 text-center font-display text-[30vw] font-semibold italic leading-none opacity-50 lg:text-[18rem]"
      >
        štúdio
      </motion.p>

      <motion.div
        style={{ rotate: rotateMark }}
        aria-hidden="true"
        className="pointer-events-none absolute -right-14 -top-14 -z-10"
      >
        <Asterisk className="h-48 w-48 text-accent/10 sm:h-64 sm:w-64" />
      </motion.div>

      <div aria-hidden="true">
        {floatingTags.map((tag) => (
          <FloatingTag
            key={tag.label}
            tag={tag}
            progress={scrollYProgress}
            reduceMotion={!!reduceMotion}
          />
        ))}
      </div>

      <motion.div
        style={{ y: yStatement }}
        className="relative mx-auto max-w-4xl px-4 text-center sm:px-6"
      >
        <p className="section-kicker">Tap-it</p>
        <p className="mt-5 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ivory sm:text-5xl lg:text-6xl">
          Dizajn, ktorý <em className="italic text-accent-soft">predáva</em>.
          <br />
          Kód, ktorý <em className="italic text-accent-soft">vydrží</em>.
        </p>
      </motion.div>
    </section>
  );
}

function FloatingTag({
  tag,
  progress,
  reduceMotion,
}: {
  tag: (typeof floatingTags)[number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduceMotion: boolean;
}) {
  const y = useTransform(
    progress,
    [0, 1],
    reduceMotion ? [0, 0] : [tag.depth, -tag.depth],
  );

  return (
    <motion.span
      style={{ y }}
      className={`absolute whitespace-nowrap rounded-full border border-white/10 bg-raised/80 px-4 py-2 text-xs font-semibold text-slate-400 shadow-card backdrop-blur ${tag.position} ${
        tag.hideOnMobile ? "hidden md:inline-flex" : "inline-flex"
      }`}
    >
      {tag.label}
    </motion.span>
  );
}

function ServicesSection() {
  return (
    <section id="sluzby" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-2xl"
        >
          <motion.p variants={revealItem} className="section-kicker">
            Služby
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-4 font-display text-3xl font-semibold tracking-tight text-ivory sm:text-4xl lg:text-5xl"
          >
            Čo pre vás vieme postaviť.
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-4 max-w-lg text-sm leading-7 text-slate-400"
          >
            Štyri služby, jeden prístup: žiadne šablóny a žiadny medzičlánok
            navyše — návrh aj kód robíme my.
          </motion.p>
        </motion.div>

        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14"
        >
          {services.map((service) => (
            <motion.a
              key={service.number}
              href="#kontakt"
              variants={revealItem}
              className="group grid gap-5 border-t border-white/5 py-9 transition last:border-b sm:py-10 lg:grid-cols-[88px_1fr_auto] lg:items-start"
            >
              <span className="font-display text-lg font-semibold italic text-slate-600 transition group-hover:text-accent-soft">
                {service.number}
              </span>

              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight text-ivory transition group-hover:text-accent-soft sm:text-3xl lg:text-4xl">
                  {service.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
                  {service.text}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs font-medium text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <span className="hidden h-12 w-12 place-items-center rounded-full border border-white/10 text-slate-400 transition group-hover:border-accent group-hover:bg-accent group-hover:text-white lg:grid">
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-5 w-5 transition group-hover:rotate-45"
                />
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CaseStudySection() {
  return (
    <section
      id="projekt"
      className="border-y border-white/5 bg-surface px-4 py-20 sm:px-6 lg:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p variants={revealItem} className="section-kicker">
            Vlastný produkt
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-4 font-display text-3xl font-semibold tracking-tight text-ivory sm:text-4xl"
          >
            Tap-it Fitness — systém, ktorý sme si{" "}
            <em className="italic text-accent-soft">postavili sami</em>.
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-5 max-w-md text-sm leading-7 text-slate-400"
          >
            Operačný systém pre fitness prevádzky — digitálne členstvá, QR
            vstup, rezervácie, platby a real-time prehľad — sme navrhli aj
            naprogramovali od nuly. Presne takto pristupujeme aj k vášmu
            projektu.
          </motion.p>

          <motion.div
            variants={revealItem}
            className="mt-7 grid gap-3 text-sm text-slate-300"
          >
            {caseHighlights.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Check
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-accent-bright"
                />
                {item}
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={revealItem}
            className="mt-7 flex flex-wrap gap-2"
          >
            {caseStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-accent-faint px-3 py-1 text-xs font-semibold text-accent-soft"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <div className="rounded-3xl border border-white/10 bg-raised p-2 shadow-float">
            <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-base p-5 sm:p-6">
              <div className="panel-grid pointer-events-none absolute inset-0 opacity-50" />
              <div className="relative mb-5 flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm font-semibold text-ivory">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent">
                    <ScanLine aria-hidden="true" className="h-4 w-4" />
                  </span>
                  Tap-it
                </span>
                <span className="rounded-full bg-success/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                  Live demo
                </span>
              </div>
              <div className="relative">
                <LiveQrCard />
              </div>
            </div>
          </div>

          <div className="absolute -left-3 -top-4 hidden rounded-xl border border-white/10 bg-raised px-4 py-3 shadow-card sm:block">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              QR refresh
            </p>
            <p className="mt-1 font-display text-xl font-semibold text-ivory">
              15 s
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function LiveQrCard() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(15);
  const [qrUrl, setQrUrl] = useState("");
  const activeMessage = easterEggMessages[messageIndex];

  useEffect(() => {
    let active = true;

    QRCodeGenerator.toDataURL(`Tap-it easter egg: ${activeMessage}`, {
      width: 512,
      margin: 1,
      color: {
        dark: "#09090D",
        light: "#ffffff",
      },
    }).then((url) => {
      if (active) setQrUrl(url);
    });

    return () => {
      active = false;
    };
  }, [activeMessage]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          setMessageIndex((index) => (index + 1) % easterEggMessages.length);
          return 15;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="grid gap-5 sm:grid-cols-[170px_1fr] sm:items-center">
      <div className="mx-auto w-full max-w-[210px] rounded-xl bg-accent p-3.5 sm:mx-0 sm:max-w-none">
        <div className="grid aspect-square place-items-center overflow-hidden rounded-lg bg-white p-1.5">
          {qrUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={qrUrl}
              alt="QR kód s Tap-it easter egg správou"
              className="h-full w-full"
            />
          ) : null}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Scan easter egg
        </p>
        <p className="mt-2 min-h-12 text-sm font-medium leading-6 text-slate-200">
          {activeMessage}
        </p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-500">Obnova QR</span>
          <span className="font-display text-3xl font-semibold text-ivory">
            {secondsLeft} s
          </span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
          <motion.div
            key={messageIndex}
            className="h-full rounded-full bg-accent-bright"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 15, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}

function ProcessSection() {
  return (
    <section id="proces" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end"
        >
          <div>
            <motion.p variants={revealItem} className="section-kicker">
              Ako pracujeme
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="mt-4 max-w-xl font-display text-3xl font-semibold tracking-tight text-ivory sm:text-4xl"
            >
              Od prvej správy po spustený web.
            </motion.h2>
          </div>
          <motion.div variants={revealItem}>
            <a href="#kontakt" className="secondary-button">
              Začať konzultáciou
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          {processSteps.map(([number, title, text]) => (
            <motion.div
              key={number}
              variants={revealItem}
              className="border-t border-white/10 pt-6"
            >
              <p className="font-display text-3xl font-semibold italic text-accent-soft">
                {number}
              </p>
              <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-ivory">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const projectTypes = ["Nový web", "Redizajn", "E-shop", "Niečo iné"];

function ContactSection() {
  const [projectType, setProjectType] = useState(projectTypes[0]);
  const [submitted, setSubmitted] = useState(false);

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="kontakt" className="px-4 py-20 sm:px-6 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-float"
      >
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <Asterisk
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-12 -left-12 h-56 w-56 text-white/[0.03]"
        />

        <div className="relative grid gap-12 px-6 py-12 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-14 lg:py-16">
          <div>
            <p className="section-kicker">Kontakt</p>
            <h2 className="mt-4 max-w-md font-display text-3xl font-semibold tracking-tight text-ivory sm:text-4xl">
              Povedzte nám, čo{" "}
              <em className="italic text-accent-soft">staviate</em>.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
              Napíšte pár viet o projekte — nový web, redizajn, e-shop alebo
              čokoľvek na mieru. Ozveme sa s návrhom ďalších krokov.
            </p>

            <div className="mt-8 grid gap-4">
              {[
                "Nezáväzná konzultácia zdarma",
                "Odpoveď do 48 hodín",
                "Cenový odhad bez prekvapení",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm font-medium text-slate-300"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent-faint text-accent-soft">
                    <Asterisk aria-hidden="true" className="h-4 w-4" />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {submitted ? (
            <div className="flex flex-col items-start justify-center rounded-2xl border border-white/5 bg-white/[0.02] p-8 sm:p-10">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-accent">
                <Check aria-hidden="true" className="h-6 w-6" />
              </span>
              <p className="mt-6 font-display text-2xl font-semibold tracking-tight text-ivory">
                Ďakujeme, dopyt je{" "}
                <em className="italic text-accent-soft">na ceste</em>.
              </p>
              <p className="mt-3 max-w-sm text-sm leading-7 text-slate-400">
                Ozveme sa vám do 48 hodín s návrhom ďalších krokov.
              </p>
            </div>
          ) : (
            <form onSubmit={submitInquiry} className="grid content-start gap-7">
              <div className="grid gap-7 sm:grid-cols-2">
                <label className="block">
                  <span className="field-label">Meno</span>
                  <input
                    className="editorial-input"
                    name="name"
                    placeholder="Jana Nováková"
                    required
                  />
                </label>
                <label className="block">
                  <span className="field-label">E-mail</span>
                  <input
                    className="editorial-input"
                    name="email"
                    type="email"
                    placeholder="jana@firma.sk"
                    required
                  />
                </label>
              </div>

              <fieldset>
                <legend className="field-label">Typ projektu</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {projectTypes.map((type) => (
                    <label key={type} className="cursor-pointer">
                      <input
                        type="radio"
                        name="type"
                        value={type}
                        checked={projectType === type}
                        onChange={() => setProjectType(type)}
                        className="peer sr-only"
                      />
                      <span className="inline-flex rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-xs font-semibold text-slate-400 transition hover:border-white/25 peer-checked:border-accent peer-checked:bg-accent peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-accent-soft">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="block">
                <span className="field-label">Správa</span>
                <textarea
                  className="editorial-input resize-none"
                  name="message"
                  placeholder="Pár viet o projekte — čo má web robiť a dokedy ho potrebujete…"
                  rows={4}
                />
              </label>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  className="primary-button w-full sm:w-auto"
                  type="submit"
                >
                  Odoslať dopyt
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </button>
                <p className="text-center text-xs font-medium text-slate-500 sm:text-right">
                  Žiadny spam — len odpoveď na váš dopyt.
                </p>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}

function Footer({ year }: { year: number }) {
  return (
    <footer className="border-t border-white/5 px-4 py-14 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 md:grid-cols-[1.2fr_repeat(3,1fr)]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-accent">
              <Asterisk aria-hidden="true" className="h-4 w-4" />
            </span>
            <span className="font-display text-sm font-semibold tracking-tight text-ivory">
              Tap-it
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-7 text-slate-500">
            Webové štúdio — tvorba webov, redizajn, e-shopy a vývoj na mieru.
          </p>
        </div>
        {[
          [
            "Služby",
            "Tvorba webov",
            "Redizajn stránok",
            "Vývoj na mieru",
            "E-shopy",
          ],
          ["Štúdio", "Projekt", "Proces", "Kontakt"],
          ["Produkt", "Tap-it", "QR vstup", "Rezervácie"],
        ].map(([heading, ...links]) => (
          <div key={heading}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
              {heading}
            </p>
            <div className="grid gap-2 text-sm text-slate-500">
              {links.map((link) => (
                <span key={link}>{link}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t border-white/5 pt-6 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <span>© {year} Tap-it. Všetky práva vyhradené.</span>
        <span>Dizajn a kód pod jednou strechou.</span>
      </div>
    </footer>
  );
}
