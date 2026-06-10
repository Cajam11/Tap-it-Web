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
import { FormEvent, ReactNode, useMemo, useState } from "react";

const navItems = [
  ["Funkcie", "#funkcie"],
  ["Riešenia", "#riesenia"],
  ["Admin", "#admin"],
  ["Bezpečnosť", "#bezpecnost"]
];

const modules = ["QR vstup", "Členstvá", "Platby", "Rezervácie", "Obsadenosť", "Roly"];

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
  const year = useMemo(() => new Date().getFullYear(), []);

  function submitDemo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#05070d] text-white">
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <section className="relative px-4 pb-24 pt-28 sm:px-6 lg:pb-32 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(22,119,255,0.18),transparent_32%)]" />

        <div className="relative mx-auto max-w-5xl text-center">
          <p className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0a0f1c] px-4 py-2 text-xs font-bold text-[#5d7cff]">
            <ScanLine aria-hidden="true" className="h-4 w-4" />
            B2B SaaS pre fitness prevádzky
          </p>

          <h1 className="mx-auto max-w-4xl text-5xl font-black leading-[0.95] text-white sm:text-7xl lg:text-[88px]">
            Operačný systém pre{" "}
            <span className="text-[#4c6bff]">moderné fitká</span>
          </h1>

          <div className="mx-auto mt-7 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            Digitálne členstvá, QR vstup, rezervácie, platby a real-time
            prehľad prevádzky v jednom čistom systéme.
          </div>

          <div className="mx-auto mt-9 max-w-4xl">
            <HeroPanel />
          </div>

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
        <div className="mx-auto max-w-5xl rounded-[28px] bg-[#1238ff] px-6 py-16 text-center sm:px-10 lg:px-16">
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
  return (
    <header className="fixed inset-x-0 top-5 z-50 px-4">
      <nav className="mx-auto flex h-12 max-w-4xl items-center justify-between rounded-full border border-white/10 bg-[#0a0e19]/90 px-3 backdrop-blur-md">
        <a href="#" className="flex items-center gap-2 rounded-full">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#1238ff]">
            <ScanLine aria-hidden="true" className="h-4 w-4" />
          </span>
          <span className="text-sm font-black">Tap-it</span>
        </a>

        <div className="hidden items-center gap-5 lg:flex">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} className="text-xs font-bold text-slate-400 transition hover:text-white">
              {label}
            </a>
          ))}
        </div>

        <a href="#demo" className="hidden rounded-full bg-[#1238ff] px-4 py-2 text-xs font-black text-white transition hover:bg-[#244bff] lg:inline-flex">
          Rezervovať demo
        </a>

        <button
          className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 lg:hidden"
          type="button"
          aria-label={menuOpen ? "Zatvoriť menu" : "Otvoriť menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X aria-hidden="true" className="h-4 w-4" /> : <Menu aria-hidden="true" className="h-4 w-4" />}
        </button>
      </nav>

      {menuOpen ? (
        <div className="mx-auto mt-3 grid max-w-4xl gap-1 rounded-[16px] border border-white/10 bg-[#0a0e19] p-3 lg:hidden">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-[8px] px-3 py-3 text-sm font-bold text-slate-300 hover:bg-white/5">
              {label}
            </a>
          ))}
          <a href="#demo" onClick={() => setMenuOpen(false)} className="mt-2 rounded-[8px] bg-[#1238ff] px-4 py-3 text-center text-sm font-black">
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
      <div className="overflow-hidden rounded-[18px] border border-white/5 bg-[#171c2a]">
        <div className="flex h-10 items-center gap-2 border-b border-white/5 px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-auto h-5 w-24 rounded-full bg-white/5" />
        </div>

        <div className="grid gap-4 p-4 md:grid-cols-[56px_1fr_180px] lg:grid-cols-[64px_1fr_220px]">
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
            <div className="flex h-48 items-end gap-3 rounded-[12px] bg-[#151a27] p-5">
              {[28, 44, 58, 76, 54, 42].map((height, index) => (
                <div
                  key={`${height}-${index}`}
                  className={`flex-1 rounded-t-[8px] ${index === 3 ? "bg-[#1238ff]" : "bg-[#132772]"}`}
                  style={{ height: `${height}%` }}
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
    <div className={`grid gap-8 md:grid-cols-2 md:items-center ${index % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
      <div>
        <div className="mb-5 grid h-11 w-11 place-items-center rounded-[8px] bg-[#111a42] text-[#4c6bff]">
          <IconSlot>{icon}</IconSlot>
        </div>
        <h3 className="max-w-md text-2xl font-black leading-tight sm:text-3xl">{title}</h3>
        <p className="mt-4 max-w-md text-sm leading-7 text-slate-500">{text}</p>
      </div>
      {visual}
    </div>
  );
}

function MiniBrowser({ variant }: { variant: "qr" | "sync" | "calendar" }) {
  return (
    <div className="rounded-[18px] border border-white/5 bg-[#101520] p-4">
      <div className="rounded-[14px] bg-[#151a27] p-5">
        {variant === "qr" ? (
          <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
            <div className="rounded-[12px] bg-[#1238ff] p-4">
              <div className="qr-grid h-24 rounded-[8px] bg-white" />
            </div>
            <div className="space-y-3">
              <Line width="w-32" />
              <Line width="w-44" muted />
              <Line width="w-36" muted />
              <div className="pt-4 text-3xl font-black">15 s</div>
            </div>
          </div>
        ) : null}

        {variant === "sync" ? (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <span className="h-10 w-10 rounded-full bg-[#1238ff]" />
              <div className="flex-1 space-y-2">
                <Line width="w-44" />
                <Line width="w-60" muted />
              </div>
            </div>
            <div className="h-2 rounded-full bg-white/5">
              <div className="h-full w-2/3 rounded-full bg-[#1238ff]" />
            </div>
          </div>
        ) : null}

        {variant === "calendar" ? (
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 28 }, (_, index) => (
              <div
                key={index}
                className={`aspect-square rounded-[7px] ${[4, 8, 11, 18, 23].includes(index) ? "bg-[#1238ff]" : "bg-white/5"}`}
              />
            ))}
          </div>
        ) : null}
      </div>
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
          <div
            key={`${height}-${index}`}
            className={`flex-1 rounded-t-[9px] ${index === 4 ? "bg-[#1238ff]" : "bg-[#132772]"}`}
            style={{ height: `${height}%` }}
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
