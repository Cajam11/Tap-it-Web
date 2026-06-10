"use client";

import {
  ArrowRight,
  BarChart3,
  CalendarCheck2,
  Check,
  Layers3,
  Menu,
  QrCode,
  ScanLine,
  ShieldCheck,
  UsersRound,
  X,
  Zap
} from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import QRCodeGenerator from "qrcode";
import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";

const navItems = [
  ["Funkcie", "#funkcie"],
  ["Riešenia", "#riesenia"],
  ["Admin", "#admin"],
  ["Bezpečnosť", "#bezpecnost"]
];

const modules = ["QR vstup", "Členstvá", "Platby", "Rezervácie", "Obsadenosť", "Roly"];

const easterEggMessages = [
  "Našiel si Tap-it easter egg. Recepcia má dnes pokoj.",
  "Tento QR kód nie je vstupenka, ale má dobrý vibe.",
  "Ak toto čítaš po scane, systém práve žmurkol.",
  "Tap-it tip: Menej kartičiek, viac tréningu.",
  "Hidden mode: fitko bez tabuliek odomknuté."
];

const calendarSlots = [
  { day: 4, title: "Silový tréning", meta: "07:00 · Tréner Jana", status: "paid" },
  { day: 8, title: "Fyzioterapia", meta: "10:30 · Miestnosť B", status: "hold" },
  { day: 11, title: "HIIT skupina", meta: "16:00 · Studio 1", status: "paid" },
  { day: 18, title: "Osobný tréning", meta: "18:30 · Tréner Peter", status: "paid" },
  { day: 23, title: "Open gym limit", meta: "19:00 · 84% obsadenosť", status: "busy" }
];

const features = [
  {
    icon: <QrCode aria-hidden="true" />,
    title: "QR vstup bez plastových kartičiek",
    text: "Dynamická QR permanentka sa obnovuje každých 15 sekúnd. Recepcia alebo scanner okamžite vidí, či je vstup platný.",
    visual: <MiniBrowser variant="qr" />
  },
  {
    icon: <Zap aria-hidden="true" />,
    title: "Live prevádzka bez ručného prepisovania",
    text: "Check-in, check-out a scan logy držia obsadenosť aktuálnu. Majiteľ vidí návštevy, predaje a renewal rate v jednom pohľade.",
    visual: <MiniBrowser variant="sync" />
  },
  {
    icon: <CalendarCheck2 aria-hidden="true" />,
    title: "Rezervácie trénerov a priestorov",
    text: "Tréneri, miestnosti a skupinové lekcie s dostupnosťou, pending holdmi, platenými rezerváciami a prevenciou konfliktov.",
    visual: <MiniBrowser variant="calendar" />
  }
];

const security = [
  "Krátko platné podpísané QR tokeny",
  "Server-side Stripe webhooky",
  "Role-based admin prístup",
  "Supabase Auth, PostgreSQL, Realtime, Storage a RLS",
  "Privacy-aware live presence"
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroPanelY = useTransform(scrollYProgress, [0, 0.35], reduceMotion ? [0, 0] : [0, -36]);
  const heroGridY = useTransform(scrollYProgress, [0, 0.35], reduceMotion ? [0, 0] : [0, 64]);
  const year = useMemo(() => new Date().getFullYear(), []);

  function submitDemo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#05070d] text-white">
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <section className="relative isolate px-4 pb-24 pt-28 sm:px-6 lg:pb-32 lg:pt-32">
        <div className="hero-gradient pointer-events-none absolute inset-x-0 top-0 -z-20 h-[760px]" />
        <motion.div style={{ y: heroGridY }} className="hero-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px]" />
        <div className="hero-beam pointer-events-none absolute left-1/2 top-28 -z-10 h-24 w-[min(820px,90vw)] -translate-x-1/2 opacity-60" />

        <div className="relative mx-auto max-w-5xl text-center">
          <p className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0a0f1c]/80 px-4 py-2 text-xs font-bold text-[#8fa2ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur">
            <ScanLine aria-hidden="true" className="h-4 w-4" />
            B2B SaaS pre fitness prevádzky
          </p>

          <h1 className="mx-auto max-w-4xl text-5xl font-black leading-[0.95] text-white sm:text-7xl lg:text-[88px]">
            Operačný systém pre{" "}
            <span className="bg-gradient-to-r from-[#eef2ff] via-[#7892ff] to-[#1238ff] bg-clip-text text-transparent">
              moderné fitká
            </span>
          </h1>

          <div className="mx-auto mt-7 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            Digitálne členstvá, QR vstup, rezervácie, platby a real-time
            prehľad prevádzky v jednom čistom systéme.
          </div>

          <motion.div style={{ y: heroPanelY }} className="mx-auto mt-9 max-w-4xl">
            <HeroPanel />
          </motion.div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#demo" className="primary-button">
              Rezervovať demo
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <a href="#funkcie" className="secondary-button">
              Pozrieť funkcie
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500">
            <span className="inline-flex -space-x-2">
              <span className="h-7 w-7 rounded-full border border-[#05070d] bg-[#c7d2fe]" />
              <span className="h-7 w-7 rounded-full border border-[#05070d] bg-[#93c5fd]" />
              <span className="h-7 w-7 rounded-full border border-[#05070d] bg-[#dbeafe]" />
            </span>
            Navrhnuté pre majiteľov, recepciu a trénerov
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#080b12] px-4 py-9 sm:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-6 text-xs font-bold uppercase text-slate-600">Prevádzkové moduly v jednom toku</p>
          <div className="grid grid-cols-2 gap-4 text-sm font-bold text-slate-500 sm:grid-cols-3 lg:grid-cols-6">
            {modules.map((module) => (
              <div key={module} className="rounded-[8px] border border-white/5 bg-white/[0.02] px-3 py-3">
                {module}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="funkcie" className="px-4 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <p className="section-kicker">Funkcie bez šumu</p>
          <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
            Postavené pre rýchlu prevádzku.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-slate-500">
            Menej ručného overovania, menej rozhádzaných nástrojov, viac jasných
            dát pre každodenné rozhodovanie.
          </p>
        </div>

        <div className="mx-auto mt-20 grid max-w-5xl gap-16">
          {features.map((feature, index) => (
            <FeatureBlock key={feature.title} index={index} {...feature} />
          ))}
        </div>
      </section>

      <section id="riesenia" className="px-4 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-kicker">Pre koho</p>
            <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
              Jeden systém pre celý tím.
            </h2>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            <RoleCard title="Majiteľ" text="Vidí predaje, návštevy, obsadenosť a obnovy bez ručných reportov." icon={<BarChart3 aria-hidden="true" />} />
            <RoleCard title="Recepcia" text="Overuje QR vstupy, rieši check-in/out a vidí stav členstva okamžite." icon={<ScanLine aria-hidden="true" />} />
            <RoleCard title="Tréneri" text="Spravujú dostupnosť, rozvrhy a rezervácie bez konfliktov." icon={<UsersRound aria-hidden="true" />} />
          </div>
        </div>
      </section>

      <section id="admin" className="border-y border-white/5 bg-[#080b12] px-4 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto grid max-w-5xl gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="section-kicker">Admin & kontrola</p>
            <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
              Prehľad prevádzky bez konca mesiaca v tabuľke.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-500">
              Admin dashboard sleduje obsadenosť, predané členstvá, priemer
              denných návštev, obnovy, scan logy, frontu overení a prevádzkové
              pokrytie.
            </p>
            <div className="mt-7 grid gap-3 text-sm text-slate-400">
              {["Obsadenosť v reálnom čase", "Predaje a transakčná história", "Roly user, tréner, recepčný, manager, owner"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Check aria-hidden="true" className="h-4 w-4 text-[#4c6bff]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <PerformanceMatrix />
        </div>
      </section>

      <section id="bezpecnost" className="border-y border-white/5 bg-[#080b12] px-4 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="section-kicker">Bezpečnosť</p>
            <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
              Praktické pravidlá namiesto veľkých sľubov.
            </h2>
          </div>
          <div className="grid gap-3">
            {security.map((item) => (
              <div key={item} className="flex items-center gap-4 rounded-[8px] border border-white/5 bg-white/[0.02] p-4 text-sm font-semibold text-slate-300">
                <ShieldCheck aria-hidden="true" className="h-5 w-5 shrink-0 text-[#4c6bff]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className="px-4 py-24 sm:px-6 lg:py-32">
        <div className="soft-vignette relative mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent_34%),linear-gradient(135deg,#3156ff_0%,#1238ff_48%,#081c8d_100%)] px-6 py-16 text-center sm:px-10 lg:px-16">
          <div className="hero-grid pointer-events-none absolute inset-0 opacity-35" />
          <div className="relative">
          <h2 className="mx-auto max-w-2xl text-4xl font-black leading-tight sm:text-5xl">
            Pozrime sa, ako by Tap-it fungoval vo vašej prevádzke.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-white/75">
            Demo môže byť zatiaľ len jednoduchý kontakt. Reálny CRM alebo backend
            endpoint dopojíme neskôr.
          </p>

          <form onSubmit={submitDemo} className="mx-auto mt-8 grid max-w-xl gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <input className="minimal-input" name="email" type="email" placeholder="E-mail" required />
            <input className="minimal-input" name="gym" placeholder="Názov prevádzky" required />
            <button className="rounded-[8px] bg-white px-5 py-3 text-sm font-black text-[#0b1f90]" type="submit">
              Rezervovať
            </button>
          </form>
          {submitted ? <p className="mt-4 text-sm font-bold text-white/80">Ďakujeme, demo request je zachytený.</p> : null}
          </div>
        </div>
      </section>

      <Footer year={year} />
    </main>
  );
}

function Navigation({
  menuOpen,
  setMenuOpen
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) {
  const [activeSection, setActiveSection] = useState(navItems[0][1]);

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      const offset = 150;
      const scrollPosition = window.scrollY + offset;
      let current = navItems[0][1];

      for (const [, href] of navItems) {
        const section = document.querySelector<HTMLElement>(href);
        if (section && section.offsetTop <= scrollPosition) {
          current = href;
        }
      }

      setActiveSection(current);
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="relative mx-auto flex h-16 max-w-5xl items-center justify-between overflow-hidden rounded-full border border-white/10 bg-[#080d19]/85 px-3 shadow-[0_18px_70px_rgba(0,0,0,0.36)] backdrop-blur-xl sm:px-4">
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="pointer-events-none absolute -top-12 left-1/2 h-24 w-80 -translate-x-1/2 rounded-full bg-[#1238ff]/18 blur-3xl" />

        <a href="#" className="relative flex items-center gap-3 rounded-full">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_30%),linear-gradient(135deg,#244bff,#1024b8)] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
            <ScanLine aria-hidden="true" className="h-5 w-5" />
          </span>
          <span className="leading-none">
            <span className="block text-base font-black">Tap-it</span>
            <span className="hidden text-[10px] font-bold uppercase text-slate-500 sm:block">Fitness OS</span>
          </span>
        </a>

        <div className="relative hidden items-center gap-6 px-2 lg:flex">
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setActiveSection(href)}
              className={`relative py-2 text-xs font-black transition ${
                activeSection === href ? "text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              {activeSection === href ? (
                <motion.span
                  layoutId="active-nav-underline"
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-[#6d8cff] via-white to-[#1238ff]"
                  transition={{ type: "spring", stiffness: 520, damping: 38 }}
                />
              ) : null}
              <span className="relative">{label}</span>
            </a>
          ))}
        </div>

        <motion.a
          href="#demo"
          whileHover={{ y: -1, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative hidden min-h-11 items-center gap-2 overflow-hidden rounded-full bg-[#1238ff] px-5 text-xs font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_10px_34px_rgba(18,56,255,0.26)] transition hover:bg-[#244bff] lg:inline-flex"
        >
          <span className="absolute inset-y-0 -left-10 w-8 rotate-12 bg-white/30 blur-sm transition duration-700 group-hover:left-[120%]" />
          <span className="relative">Rezervovať demo</span>
          <ArrowRight aria-hidden="true" className="relative h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </motion.a>

        <button
          className="relative grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.055] lg:hidden"
          type="button"
          aria-label={menuOpen ? "Zatvoriť menu" : "Otvoriť menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X aria-hidden="true" className="h-4 w-4" /> : <Menu aria-hidden="true" className="h-4 w-4" />}
        </button>
      </nav>

      {menuOpen ? (
        <div className="mx-auto mt-3 grid max-w-5xl gap-1 rounded-[20px] border border-white/10 bg-[#080d19]/95 p-3 shadow-[0_18px_70px_rgba(0,0,0,0.36)] backdrop-blur-xl lg:hidden">
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => {
                setActiveSection(href);
                setMenuOpen(false);
              }}
              className={`relative rounded-[12px] px-4 py-3 text-sm font-black transition ${
                activeSection === href ? "text-white" : "text-slate-300 hover:bg-white/[0.06]"
              }`}
            >
              {activeSection === href ? (
                <span className="absolute bottom-2 left-4 h-0.5 w-8 rounded-full bg-[#6d8cff]" />
              ) : null}
              {label}
            </a>
          ))}
          <a href="#demo" onClick={() => setMenuOpen(false)} className="mt-2 rounded-[12px] bg-[#1238ff] px-4 py-3 text-center text-sm font-black">
            Rezervovať demo
          </a>
        </div>
      ) : null}
    </header>
  );
}

function HeroPanel() {
  return (
    <div className="relative rounded-[24px] border border-white/10 bg-[#111622] p-2 shadow-[0_32px_90px_rgba(0,0,0,0.4)]">
      <div className="pointer-events-none absolute -inset-x-8 -top-8 h-24 rounded-full bg-[#1238ff]/20 blur-3xl" />
      <div className="soft-vignette relative overflow-hidden rounded-[18px] border border-white/5 bg-[#171c2a]">
        <div className="panel-grid pointer-events-none absolute inset-0 opacity-45" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_50%_0%,rgba(76,107,255,0.22),transparent_62%)]" />
        <div className="relative flex h-10 items-center gap-2 border-b border-white/5 px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-auto h-5 w-24 rounded-full bg-white/5" />
        </div>

        <div className="relative grid gap-4 p-4 md:grid-cols-[56px_1fr_180px] lg:grid-cols-[64px_1fr_220px]">
          <div className="hidden rounded-[12px] bg-[#0d1220] p-3 md:block">
            <div className="mb-5 grid h-9 w-9 place-items-center rounded-[8px] bg-[#1238ff]">
              <Layers3 aria-hidden="true" className="h-4 w-4" />
            </div>
            <div className="space-y-3">
              <span className="block h-8 rounded-[8px] bg-white/5" />
              <span className="block h-8 rounded-[8px] bg-white/5" />
              <span className="block h-8 rounded-[8px] bg-white/5" />
            </div>
          </div>

          <div className="rounded-[14px] bg-[#0d1220] p-5">
            <div className="mb-7 space-y-3">
              <span className="block h-4 w-28 rounded-full bg-white/10" />
              <span className="block h-3 w-40 rounded-full bg-white/5" />
            </div>
            <div className="panel-grid flex h-48 items-end gap-3 rounded-[12px] bg-[#151a27] p-5">
              {[28, 44, 58, 76, 54, 42].map((height, index) => (
                <motion.div
                  key={`${height}-${index}`}
                  className={`flex-1 rounded-t-[8px] ${index === 3 ? "bg-[#1238ff]" : "bg-[#132772]"}`}
                  initial={{ height: "18%" }}
                  whileInView={{ height: `${height}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.55 }}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[14px] bg-[#0d1220] p-4">
              <span className="block h-4 w-20 rounded-full bg-white/10" />
              <span className="mt-3 block h-3 w-28 rounded-full bg-white/5" />
              <span className="mt-2 block h-3 w-24 rounded-full bg-white/5" />
            </div>
            <div className="grid place-items-center rounded-[14px] bg-[#101b52] p-8 text-[#1238ff]">
              <Zap aria-hidden="true" className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -right-3 top-14 hidden rounded-[10px] border border-white/10 bg-[#111622] px-4 py-3 text-left shadow-[0_20px_50px_rgba(0,0,0,0.32)] sm:block">
        <p className="text-[10px] font-bold text-slate-500">QR REFRESH</p>
        <p className="mt-1 text-xl font-black">15 s</p>
      </div>
    </div>
  );
}

function FeatureBlock({
  index,
  icon,
  title,
  text,
  visual
}: {
  index: number;
  icon: ReactNode;
  title: string;
  text: string;
  visual: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`grid gap-8 md:grid-cols-2 md:items-center ${index % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
    >
      <div>
        <div className="mb-5 grid h-11 w-11 place-items-center rounded-[8px] bg-[#111a42] text-[#4c6bff]">
          <IconSlot>{icon}</IconSlot>
        </div>
        <h3 className="max-w-md text-2xl font-black leading-tight sm:text-3xl">{title}</h3>
        <p className="mt-4 max-w-md text-sm leading-7 text-slate-500">{text}</p>
      </div>
      <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 220, damping: 20 }}>
        {visual}
      </motion.div>
    </motion.div>
  );
}

function MiniBrowser({ variant }: { variant: "qr" | "sync" | "calendar" }) {
  return (
    <div className="rounded-[18px] border border-white/5 bg-[#101520] p-4">
      <div className="rounded-[14px] bg-[#151a27] p-5">
        {variant === "qr" ? <LiveQrCard /> : null}
        {variant === "sync" ? <SyncActivityPanel /> : null}
        {variant === "calendar" ? <InteractiveCalendar /> : null}
      </div>
    </div>
  );
}

function LiveQrCard() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(15);
  const [qrSvg, setQrSvg] = useState("");
  const activeMessage = easterEggMessages[messageIndex];

  useEffect(() => {
    let active = true;

    QRCodeGenerator.toString(`Tap-it easter egg: ${activeMessage}`, {
      type: "svg",
      width: 128,
      margin: 1,
      color: {
        dark: "#05070d",
        light: "#ffffff"
      }
    }).then((svg) => {
      if (active) setQrSvg(svg);
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
    <div className="grid gap-5 sm:grid-cols-[150px_1fr] sm:items-center">
      <div className="rounded-[14px] bg-[#1238ff] p-4">
        <div
          className="grid aspect-square place-items-center rounded-[10px] bg-white p-2 [&_svg]:h-full [&_svg]:w-full"
          aria-label="QR kód s Tap-it easter egg správou"
          dangerouslySetInnerHTML={{ __html: qrSvg }}
        />
      </div>

      <div>
        <p className="text-xs font-bold uppercase text-slate-500">Scan easter egg</p>
        <p className="mt-2 min-h-12 text-sm font-semibold leading-6 text-slate-200">{activeMessage}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-500">Obnova QR</span>
          <span className="text-3xl font-black">{secondsLeft} s</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
          <motion.div
            key={messageIndex}
            className="h-full rounded-full bg-[#1238ff]"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 15, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}

function SyncActivityPanel() {
  const [active, setActive] = useState(0);
  const events = [
    ["08:41", "Check-in", "Martin K.", "Monthly Plus"],
    ["08:55", "Check-out", "Lucia H.", "Trainer"],
    ["09:02", "Check-in", "Eva K.", "Single entry"]
  ];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActive((index) => (index + 1) % events.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, [events.length]);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <span className="relative h-10 w-10 rounded-full bg-[#1238ff]">
          <span className="absolute inset-0 rounded-full bg-[#1238ff] opacity-40 motion-safe:animate-ping" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="font-black">Live recepcia</p>
            <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[10px] font-black text-emerald-300">
              Realtime
            </span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full bg-[#1238ff]"
              animate={{ width: ["38%", "72%", "52%", "84%"] }}
              transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-2">
        {events.map(([time, action, name, plan], index) => (
          <button
            key={`${time}-${name}`}
            type="button"
            onClick={() => setActive(index)}
            className={`rounded-[10px] border p-3 text-left transition ${
              active === index
                ? "border-[#1238ff]/50 bg-[#1238ff]/15"
                : "border-white/5 bg-white/[0.03] hover:bg-white/[0.05]"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-black">{action}</p>
              <span className="text-xs font-bold text-slate-500">{time}</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {name} · {plan}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

function InteractiveCalendar() {
  const [selectedDay, setSelectedDay] = useState(8);
  const selectedSlot = calendarSlots.find((slot) => slot.day === selectedDay);
  const days = ["Po", "Ut", "St", "Št", "Pi", "So", "Ne"];

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => (
          <div key={day} className="text-center text-[10px] font-black text-slate-600">
            {day}
          </div>
        ))}
        {Array.from({ length: 28 }, (_, index) => {
          const day = index + 1;
          const slot = calendarSlots.find((item) => item.day === day);
          const isSelected = selectedDay === day;

          return (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`relative aspect-square rounded-[7px] text-xs font-black transition ${
                isSelected
                  ? "bg-[#1238ff] text-white"
                  : slot
                    ? "bg-[#1238ff]/30 text-[#b9c4ff] hover:bg-[#1238ff]/45"
                    : "bg-white/5 text-slate-600 hover:bg-white/10"
              }`}
              aria-label={`Deň ${day}${slot ? `, ${slot.title}` : ""}`}
            >
              {day}
              {slot ? <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-current" /> : null}
            </button>
          );
        })}
      </div>

      <motion.div
        key={selectedDay}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[10px] border border-white/5 bg-white/[0.03] p-3"
      >
        {selectedSlot ? (
          <>
            <div className="flex items-center justify-between gap-3">
              <p className="font-black">{selectedSlot.title}</p>
              <span className="rounded-full bg-[#1238ff]/20 px-2 py-1 text-[10px] font-black text-[#b9c4ff]">
                {selectedSlot.status}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">{selectedSlot.meta}</p>
          </>
        ) : (
          <>
            <p className="font-black">Voľný slot</p>
            <p className="mt-1 text-xs text-slate-500">Klikni na modré dni pre rezervácie.</p>
          </>
        )}
      </motion.div>
    </div>
  );
}

function PerformanceMatrix() {
  return (
    <div className="rounded-[24px] border border-white/5 bg-[#111622] p-5">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500">MAJITEĽSKÝ POHĽAD</p>
          <h3 className="mt-2 text-2xl font-black">Performance matrix</h3>
        </div>
        <span className="rounded-full bg-[#1238ff]/20 px-3 py-1 text-xs font-black text-[#89a0ff]">
          Live
        </span>
      </div>
      <div className="flex h-64 items-end gap-3 rounded-[16px] bg-[#0d1220] p-5">
        {[34, 61, 77, 49, 92, 68].map((height, index) => (
          <motion.div
            key={`${height}-${index}`}
            className={`flex-1 rounded-t-[9px] ${index === 4 ? "bg-[#1238ff]" : "bg-[#132772]"}`}
            initial={{ height: "18%" }}
            whileInView={{ height: `${height}%` }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06, duration: 0.55 }}
          />
        ))}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        <Stat value="84" label="teraz" />
        <Stat value="312" label="návštevy" />
        <Stat value="92%" label="renewal" />
      </div>
    </div>
  );
}

function RoleCard({ title, text, icon }: { title: string; text: string; icon: ReactNode }) {
  return (
    <div className="rounded-[16px] border border-white/5 bg-[#101520] p-5">
      <div className="mb-5 grid h-11 w-11 place-items-center rounded-[8px] bg-[#111a42] text-[#4c6bff]">
        <IconSlot>{icon}</IconSlot>
      </div>
      <h3 className="text-xl font-black">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}

function Footer({ year }: { year: number }) {
  return (
    <footer className="border-t border-white/5 px-4 py-14 sm:px-6">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1.2fr_repeat(3,1fr)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#1238ff]">
              <ScanLine aria-hidden="true" className="h-4 w-4" />
            </span>
            <span className="text-sm font-black">Tap-it</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-600">
            Digitálny operačný systém pre fitness prevádzky.
          </p>
        </div>
        {[
          ["Produkt", "QR vstup", "Členstvá", "Rezervácie"],
          ["Prevádzka", "Recepcia", "Tréneri", "Admin"],
          ["Systém", "Platby", "Roly", "Bezpečnosť"]
        ].map(([heading, ...links]) => (
          <div key={heading}>
            <p className="mb-4 text-xs font-black text-slate-400">{heading}</p>
            <div className="grid gap-2 text-sm text-slate-600">
              {links.map((link) => (
                <span key={link}>{link}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 max-w-5xl border-t border-white/5 pt-6 text-xs text-slate-700">
        © {year} Tap-it. Všetky práva vyhradené.
      </div>
    </footer>
  );
}

function Line({ width, muted = false }: { width: string; muted?: boolean }) {
  return <span className={`block h-3 rounded-full ${width} ${muted ? "bg-white/5" : "bg-white/10"}`} />;
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[8px] bg-white/[0.03] p-3">
      <p className="text-2xl font-black">{value}</p>
      <p className="mt-1 text-xs font-bold text-slate-600">{label}</p>
    </div>
  );
}

function IconSlot({ children }: { children: ReactNode }) {
  return <span className="[&>svg]:h-5 [&>svg]:w-5">{children}</span>;
}
