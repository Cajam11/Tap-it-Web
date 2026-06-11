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
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants
} from "framer-motion";
import QRCodeGenerator from "qrcode";
import { FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";

const navItems = [
  ["Funkcie", "#funkcie"],
  ["Riešenia", "#riesenia"],
  ["Admin", "#admin"],
  ["Bezpečnosť", "#bezpecnost"]
];

const modules = ["QR vstup", "Členstvá", "Platby", "Rezervácie", "Obsadenosť", "Roly", "Scan logy", "Reporty"];

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

const security = [
  "Krátko platné podpísané QR tokeny",
  "Server-side Stripe webhooky",
  "Role-based admin prístup",
  "Supabase Auth, PostgreSQL, Realtime, Storage a RLS",
  "Privacy-aware live presence"
];

const revealContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const revealItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } }
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-base text-slate-100">
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <ModulesMarquee />
      <FeaturesBento />
      <RolesSection />
      <AdminSection />
      <SecuritySection />
      <DemoSection />
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

    const update = () => {
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
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-base/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent">
            <ScanLine aria-hidden="true" className="h-5 w-5" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-base font-semibold">Tap-it</span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:block">
              Fitness OS
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setActiveSection(href)}
              className={`relative py-2 text-sm font-medium transition ${
                activeSection === href ? "text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              {activeSection === href ? (
                <motion.span
                  layoutId="active-nav-underline"
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-accent-bright"
                  transition={{ type: "spring", stiffness: 520, damping: 38 }}
                />
              ) : null}
              <span className="relative">{label}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#demo"
            className="hidden min-h-10 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-white transition hover:bg-accent-bright lg:inline-flex"
          >
            Rezervovať demo
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </a>

          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] lg:hidden"
            type="button"
            aria-label={menuOpen ? "Zatvoriť menu" : "Otvoriť menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X aria-hidden="true" className="h-4 w-4" /> : <Menu aria-hidden="true" className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div className="border-t border-white/5 bg-base/95 px-4 pb-4 pt-2 backdrop-blur-xl lg:hidden">
          <div className="mx-auto grid max-w-6xl gap-1">
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => {
                  setActiveSection(href);
                  setMenuOpen(false);
                }}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                  activeSection === href
                    ? "bg-accent-faint text-white"
                    : "text-slate-300 hover:bg-white/[0.06]"
                }`}
              >
                {label}
              </a>
            ))}
            <a
              href="#demo"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-xl bg-accent px-4 py-3 text-center text-sm font-semibold transition hover:bg-accent-bright"
            >
              Rezervovať demo
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  const panelY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -60]);
  const glowY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 140]);
  const gridY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 90]);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:pb-28 lg:pt-36">
      <motion.div style={{ y: glowY }} className="hero-glow pointer-events-none absolute inset-x-0 top-0 -z-20 h-[720px]" />
      <motion.div style={{ y: gridY }} className="hero-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px]" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          <motion.p
            variants={revealItem}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface/80 px-4 py-2 text-xs font-semibold text-accent-soft backdrop-blur lg:mx-0"
          >
            <ScanLine aria-hidden="true" className="h-4 w-4" />
            B2B SaaS pre fitness prevádzky
          </motion.p>

          <motion.h1
            variants={revealItem}
            className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl xl:text-6xl"
          >
            Operačný systém pre{" "}
            <span className="bg-gradient-to-r from-accent-soft via-accent-bright to-accent bg-clip-text text-transparent">
              moderné fitká
            </span>
          </motion.h1>

          <motion.p
            variants={revealItem}
            className="mx-auto mt-6 max-w-md text-sm leading-7 text-slate-400 sm:text-base lg:mx-0"
          >
            Digitálne členstvá, QR vstup, rezervácie, platby a real-time prehľad
            prevádzky v jednom čistom systéme.
          </motion.p>

          <motion.div
            variants={revealItem}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <a href="#demo" className="primary-button w-full sm:w-auto">
              Rezervovať demo
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <a href="#funkcie" className="secondary-button w-full sm:w-auto">
              Pozrieť funkcie
            </a>
          </motion.div>

          <motion.div
            variants={revealItem}
            className="mt-10 grid grid-cols-3 divide-x divide-white/5 rounded-2xl border border-white/5 bg-surface/60"
          >
            {[
              ["15 s", "obnova QR"],
              ["92 %", "renewal rate"],
              ["5", "rolí v systéme"]
            ].map(([value, label]) => (
              <div key={label} className="px-3 py-4 text-center lg:text-left lg:px-5">
                <p className="font-display text-xl font-semibold sm:text-2xl">{value}</p>
                <p className="mt-1 text-[11px] font-medium text-slate-500 sm:text-xs">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: panelY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
        >
          <HeroPanel />
        </motion.div>
      </div>
    </section>
  );
}

function HeroPanel() {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-raised p-2 shadow-float">
      <div className="pointer-events-none absolute -inset-x-8 -top-8 h-24 rounded-full bg-accent/15 blur-3xl" />
      <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-surface">
        <div className="panel-grid pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative flex h-10 items-center gap-2 border-b border-white/5 px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-auto h-5 w-24 rounded-full bg-white/5" />
        </div>

        <div className="relative grid gap-4 p-4 sm:grid-cols-[1fr_150px]">
          <div className="rounded-xl bg-base/70 p-5">
            <div className="mb-6 space-y-3 text-left">
              <span className="block h-4 w-28 rounded-full bg-white/10" />
              <span className="block h-3 w-40 rounded-full bg-white/5" />
            </div>
            <div className="flex h-40 items-end gap-3 rounded-xl bg-raised p-4 sm:h-44">
              {[28, 44, 58, 76, 54, 42].map((height, index) => (
                <motion.div
                  key={`${height}-${index}`}
                  className={`flex-1 rounded-t-md ${index === 3 ? "bg-accent-bright" : "bg-accent-deep"}`}
                  initial={{ height: "18%" }}
                  whileInView={{ height: `${height}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.05, duration: 0.55 }}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
            <div className="rounded-xl bg-base/70 p-4 text-left">
              <div className="mb-4 grid h-9 w-9 place-items-center rounded-lg bg-accent">
                <Layers3 aria-hidden="true" className="h-4 w-4" />
              </div>
              <span className="block h-3 w-16 rounded-full bg-white/10" />
              <span className="mt-2 block h-3 w-12 rounded-full bg-white/5" />
            </div>
            <div className="grid place-items-center rounded-xl bg-accent-faint p-6 text-accent-soft">
              <Zap aria-hidden="true" className="h-7 w-7" />
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute -left-3 bottom-10 hidden rounded-xl border border-white/10 bg-raised px-4 py-3 text-left shadow-card sm:block"
      >
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Obsadenosť</p>
        <p className="mt-1 font-display text-xl font-semibold">
          84 <span className="text-sm font-medium text-emerald-300">live</span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute -right-3 top-12 hidden rounded-xl border border-white/10 bg-raised px-4 py-3 text-left shadow-card sm:block"
      >
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">QR refresh</p>
        <p className="mt-1 font-display text-xl font-semibold">15 s</p>
      </motion.div>
    </div>
  );
}

function ModulesMarquee() {
  return (
    <section className="border-y border-white/5 bg-surface py-8">
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        Prevádzkové moduly v jednom toku
      </p>
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center gap-3 pr-3"
            >
              {modules.map((module) => (
                <span
                  key={module}
                  className="whitespace-nowrap rounded-full border border-white/5 bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-slate-400"
                >
                  {module}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesBento() {
  return (
    <section id="funkcie" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p variants={revealItem} className="section-kicker">
            Funkcie bez šumu
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Postavené pre rýchlu prevádzku.
          </motion.h2>
          <motion.p variants={revealItem} className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-400">
            Menej ručného overovania, menej rozhádzaných nástrojov, viac jasných
            dát pre každodenné rozhodovanie.
          </motion.p>
        </motion.div>

        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid gap-4 lg:grid-cols-2"
        >
          <motion.div variants={revealItem} className="lg:col-span-2">
            <BentoCard
              icon={<QrCode aria-hidden="true" />}
              title="QR vstup bez plastových kartičiek"
              text="Dynamická QR permanentka sa obnovuje každých 15 sekúnd. Recepcia alebo scanner okamžite vidí, či je vstup platný."
              wide
            >
              <LiveQrCard />
            </BentoCard>
          </motion.div>

          <motion.div variants={revealItem}>
            <BentoCard
              icon={<Zap aria-hidden="true" />}
              title="Live prevádzka bez ručného prepisovania"
              text="Check-in, check-out a scan logy držia obsadenosť aktuálnu. Majiteľ vidí návštevy, predaje a renewal rate v jednom pohľade."
            >
              <SyncActivityPanel />
            </BentoCard>
          </motion.div>

          <motion.div variants={revealItem}>
            <BentoCard
              icon={<CalendarCheck2 aria-hidden="true" />}
              title="Rezervácie trénerov a priestorov"
              text="Tréneri, miestnosti a skupinové lekcie s dostupnosťou, pending holdmi, platenými rezerváciami a prevenciou konfliktov."
            >
              <InteractiveCalendar />
            </BentoCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function BentoCard({
  icon,
  title,
  text,
  wide = false,
  children
}: {
  icon: ReactNode;
  title: string;
  text: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`grid h-full gap-8 rounded-3xl border border-white/5 bg-surface p-6 shadow-card sm:p-8 ${
        wide ? "lg:grid-cols-2 lg:items-center" : "content-start"
      }`}
    >
      <div>
        <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-accent-faint text-accent-soft">
          <IconSlot>{icon}</IconSlot>
        </div>
        <h3 className="max-w-md font-display text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h3>
        <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">{text}</p>
      </div>
      <div className="rounded-2xl bg-raised p-4 sm:p-5">{children}</div>
    </motion.div>
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
        dark: "#0A0E16",
        light: "#ffffff"
      }
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
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Scan easter egg</p>
        <p className="mt-2 min-h-12 text-sm font-medium leading-6 text-slate-200">{activeMessage}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-500">Obnova QR</span>
          <span className="font-display text-3xl font-semibold">{secondsLeft} s</span>
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
        <span className="relative h-10 w-10 shrink-0 rounded-full bg-accent">
          <span className="absolute inset-0 rounded-full bg-accent opacity-40 motion-safe:animate-ping" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="font-display font-semibold">Live recepcia</p>
            <span className="rounded-full bg-success/10 px-2 py-1 text-[10px] font-semibold text-emerald-300">
              Realtime
            </span>
          </div>
          <div className="mt-3 h-1.5 rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full bg-accent-bright"
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
            className={`rounded-xl border p-3 text-left transition ${
              active === index
                ? "border-accent/50 bg-accent/15"
                : "border-white/5 bg-white/[0.03] hover:bg-white/[0.05]"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold">{action}</p>
              <span className="text-xs font-medium text-slate-500">{time}</span>
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
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {days.map((day) => (
          <div key={day} className="text-center text-[10px] font-semibold text-slate-500">
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
              className={`relative aspect-square rounded-md text-xs font-semibold transition ${
                isSelected
                  ? "bg-accent text-white"
                  : slot
                    ? "bg-accent/25 text-accent-soft hover:bg-accent/40"
                    : "bg-white/5 text-slate-500 hover:bg-white/10"
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
        className="rounded-xl border border-white/5 bg-white/[0.03] p-3"
      >
        {selectedSlot ? (
          <>
            <div className="flex items-center justify-between gap-3">
              <p className="font-display font-semibold">{selectedSlot.title}</p>
              <span className="rounded-full bg-accent/20 px-2 py-1 text-[10px] font-semibold text-accent-soft">
                {selectedSlot.status}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">{selectedSlot.meta}</p>
          </>
        ) : (
          <>
            <p className="font-display font-semibold">Voľný slot</p>
            <p className="mt-1 text-xs text-slate-500">Klikni na modré dni pre rezervácie.</p>
          </>
        )}
      </motion.div>
    </div>
  );
}

function RolesSection() {
  const roles = [
    {
      icon: <BarChart3 aria-hidden="true" />,
      title: "Majiteľ",
      text: "Vidí predaje, návštevy, obsadenosť a obnovy bez ručných reportov."
    },
    {
      icon: <ScanLine aria-hidden="true" />,
      title: "Recepcia",
      text: "Overuje QR vstupy, rieši check-in/out a vidí stav členstva okamžite."
    },
    {
      icon: <UsersRound aria-hidden="true" />,
      title: "Tréneri",
      text: "Spravujú dostupnosť, rozvrhy a rezervácie bez konfliktov."
    }
  ];

  return (
    <section id="riesenia" className="border-y border-white/5 bg-surface px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16"
        >
          <div>
            <motion.p variants={revealItem} className="section-kicker">
              Pre koho
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Jeden systém pre celý tím.
            </motion.h2>
            <motion.p variants={revealItem} className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
              Každá rola vidí presne to, čo potrebuje — nič navyše.
            </motion.p>
          </div>

          <div className="grid gap-0 divide-y divide-white/5">
            {roles.map((role, index) => (
              <motion.div
                key={role.title}
                variants={revealItem}
                className="group grid grid-cols-[auto_auto_1fr] items-start gap-5 py-6 first:pt-0 last:pb-0 sm:items-center"
              >
                <span className="font-display text-sm font-semibold text-slate-600 transition group-hover:text-accent-soft">
                  0{index + 1}
                </span>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-faint text-accent-soft">
                  <IconSlot>{role.icon}</IconSlot>
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight">{role.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-400">{role.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AdminSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const matrixY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [40, -40]);

  return (
    <section ref={sectionRef} id="admin" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p variants={revealItem} className="section-kicker">
            Admin &amp; kontrola
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Prehľad prevádzky bez konca mesiaca v tabuľke.
          </motion.h2>
          <motion.p variants={revealItem} className="mt-5 max-w-md text-sm leading-7 text-slate-400">
            Admin dashboard sleduje obsadenosť, predané členstvá, priemer
            denných návštev, obnovy, scan logy, frontu overení a prevádzkové
            pokrytie.
          </motion.p>
          <motion.div variants={revealItem} className="mt-7 grid gap-3 text-sm text-slate-300">
            {["Obsadenosť v reálnom čase", "Predaje a transakčná história", "Roly user, tréner, recepčný, manager, owner"].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-accent-bright" />
                {item}
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div style={{ y: matrixY }}>
          <PerformanceMatrix />
        </motion.div>
      </div>
    </section>
  );
}

function PerformanceMatrix() {
  return (
    <div className="rounded-3xl border border-white/5 bg-raised p-5 shadow-card sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Majiteľský pohľad</p>
          <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">Performance matrix</h3>
        </div>
        <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent-soft">
          Live
        </span>
      </div>
      <div className="flex h-56 items-end gap-3 rounded-xl bg-base/70 p-5 sm:h-64">
        {[34, 61, 77, 49, 92, 68].map((height, index) => (
          <motion.div
            key={`${height}-${index}`}
            className={`flex-1 rounded-t-md ${index === 4 ? "bg-accent-bright" : "bg-accent-deep"}`}
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

function SecuritySection() {
  return (
    <section id="bezpecnost" className="border-y border-white/5 bg-surface px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="mx-auto max-w-2xl text-center">
            <motion.p variants={revealItem} className="section-kicker">
              Bezpečnosť
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Praktické pravidlá namiesto veľkých sľubov.
            </motion.h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-2">
            {security.map((item, index) => (
              <motion.div
                key={item}
                variants={revealItem}
                className={`flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5 text-sm font-medium text-slate-300 ${
                  index === security.length - 1 ? "sm:col-span-2" : ""
                }`}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-faint text-accent-soft">
                  <ShieldCheck aria-hidden="true" className="h-5 w-5" />
                </span>
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DemoSection() {
  const [submitted, setSubmitted] = useState(false);

  function submitDemo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="demo" className="px-4 py-20 sm:px-6 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(135deg,#33518F_0%,#22345F_55%,#141F3C_100%)] shadow-float"
      >
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative grid gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:px-16 lg:py-16">
          <div className="text-center lg:text-left">
            <h2 className="mx-auto max-w-xl font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:mx-0">
              Pozrime sa, ako by Tap-it fungoval vo vašej prevádzke.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/70 lg:mx-0">
              Demo môže byť zatiaľ len jednoduchý kontakt. Reálny CRM alebo
              backend endpoint dopojíme neskôr.
            </p>
          </div>

          <form onSubmit={submitDemo} className="grid gap-3">
            <input className="minimal-input" name="email" type="email" placeholder="E-mail" required />
            <input className="minimal-input" name="gym" placeholder="Názov prevádzky" required />
            <button
              className="min-h-12 rounded-xl bg-white px-6 text-sm font-semibold text-accent-deep transition hover:bg-slate-100"
              type="submit"
            >
              Rezervovať demo
            </button>
            {submitted ? (
              <p className="text-center text-sm font-medium text-white/80 lg:text-left">
                Ďakujeme, demo request je zachytený.
              </p>
            ) : null}
          </form>
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
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent">
              <ScanLine aria-hidden="true" className="h-4 w-4" />
            </span>
            <span className="font-display text-sm font-semibold">Tap-it</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-7 text-slate-500">
            Digitálny operačný systém pre fitness prevádzky.
          </p>
        </div>
        {[
          ["Produkt", "QR vstup", "Členstvá", "Rezervácie"],
          ["Prevádzka", "Recepcia", "Tréneri", "Admin"],
          ["Systém", "Platby", "Roly", "Bezpečnosť"]
        ].map(([heading, ...links]) => (
          <div key={heading}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">{heading}</p>
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
        <span>Navrhnuté pre majiteľov, recepciu a trénerov.</span>
      </div>
    </footer>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-white/[0.03] p-3">
      <p className="font-display text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-xs font-medium text-slate-500">{label}</p>
    </div>
  );
}

function IconSlot({ children }: { children: ReactNode }) {
  return <span className="[&>svg]:h-5 [&>svg]:w-5">{children}</span>;
}
