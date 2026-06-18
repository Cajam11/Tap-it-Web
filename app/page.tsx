"use client";

import Image, { type StaticImageData } from "next/image";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Bell,
  CalendarDays,
  Check,
  Clock,
  CreditCard,
  DoorOpen,
  Dumbbell,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  ScanLine,
  Smartphone,
  Sun,
  Twitter,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import {
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type RefObject,
  type ReactNode,
} from "react";

import analyticsScreen from "../screenshots/Analytics.png";
import bookingsScreen from "../screenshots/Bookings.png";
import dashboardScreen from "../screenshots/Dashboard.png";
import filipFounder from "../founders/Filip_Paučo.jpg";
import membershipsScreen from "../screenshots/Memberships.png";
import newsScreen from "../screenshots/News.png";
import patrikFounder from "../founders/Patrik_Repkovský.jpg";
import priestoryScreen from "../screenshots/Priestory.png";
import scanLogsScreen from "../screenshots/Scan_Logs.png";
import smenyScreen from "../screenshots/Smeny.png";
import usersScreen from "../screenshots/User_Management.png";
import verificationScreen from "../screenshots/Verification.png";

const navItems = [
  ["Platforma", "#platforma"],
  ["Produkt", "#produkt"],
  ["Prevádzka", "#prevadzka"],
  ["Kontakt", "#kontakt"],
];

// Several sections render mutually-exclusive mobile/desktop variants that share
// the same id, so resolve in-page anchors to whichever copy is currently visible.
function scrollToAnchor(
  event: ReactMouseEvent<HTMLAnchorElement>,
  href: string,
) {
  if (!href.startsWith("#")) return;
  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>(`[id="${href.slice(1)}"]`),
  );
  const target =
    candidates.find((el) => el.offsetParent !== null) ?? candidates[0];
  if (!target) return;
  event.preventDefault();
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  target.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
}

const revealContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const revealItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

type TourScreen = {
  title: string;
  eyebrow: string;
  body: string;
  blurb: string;
  metric: string;
  metricLabel: string;
  image: StaticImageData;
  icon: LucideIcon;
  alt: string;
};

const tourScreens: TourScreen[] = [
  {
    title: "Dashboard pre majiteľa",
    eyebrow: "Live prehľad",
    body: "Majiteľ vidí návštevy, predané členstvá, obnovy a posledné scan logy na jednom mieste bez exportovania tabuliek.",
    blurb: "Návštevy, členstvá a scan logy na jednom mieste.",
    metric: "1 pohľad",
    metricLabel: "na celý gym",
    image: dashboardScreen,
    icon: Activity,
    alt: "Dashboard Tap-it admin panelu so štatistikami návštev a živými scan logmi",
  },
  {
    title: "User management",
    eyebrow: "Používatelia",
    body: "Recepcia, tréneri, manažéri aj členovia sú v jednom zozname s rolami, overením a onboarding stavom.",
    blurb: "Členovia, tréneri a manažéri v jednom zozname.",
    metric: "10",
    metricLabel: "profilov v databáze",
    image: usersScreen,
    icon: Users,
    alt: "Správa používateľov a rolí v Tap-it admin paneli",
  },
  {
    title: "Verifikácia nových účtov",
    eyebrow: "Bezpečný onboarding",
    body: "Nový člen alebo pracovník sa do systému nedostane len tak. Admin potvrdí verifikáciu a až potom sa účet objaví v ostrej prevádzke.",
    blurb: "Nové účty schvaľuje admin pred ostrou prevádzkou.",
    metric: "4",
    metricLabel: "čakajúci používatelia",
    image: verificationScreen,
    icon: BadgeCheck,
    alt: "Zoznam používateľov čakajúcich na verifikáciu v Tap-it admin paneli",
  },
  {
    title: "Členstvá bez chaosu",
    eyebrow: "Predplatné",
    body: "Mesačné, ročné aj jednorazové vstupy sú prepojené na profil člena. Expirácie a zmeny plánu sú riešené priamo v administrácii.",
    blurb: "Vstupy a expirácie prepojené na profil člena.",
    metric: "5+",
    metricLabel: "aktívnych členstiev",
    image: membershipsScreen,
    icon: CreditCard,
    alt: "Prehľad členstiev v Tap-it admin paneli",
  },
  {
    title: "Analytics",
    eyebrow: "Prehľady",
    body: "Analytická vrstva je pripravené miesto pre detailnejšie prehľady návštev, členstiev a trendov prevádzky.",
    blurb: "Pripravené miesto pre detailné prehľady a trendy.",
    metric: "soon",
    metricLabel: "detailné štatistiky",
    image: analyticsScreen,
    icon: Activity,
    alt: "Analytics obrazovka v Tap-it admin paneli",
  },
  {
    title: "QR vstupy a scan logy",
    eyebrow: "Kontrola vstupu",
    body: "Každý príchod a odchod zostane zapísaný. Recepcia okamžite vidí, kto vstúpil, kedy a či má platné členstvo.",
    blurb: "Každý príchod a odchod zostane zapísaný.",
    metric: "114",
    metricLabel: "udalostí v logu",
    image: scanLogsScreen,
    icon: ScanLine,
    alt: "Scan logy v Tap-it admin paneli so záznamami vstupov a odchodov",
  },
  {
    title: "Rezervácie a kalendár",
    eyebrow: "Triedy a termíny",
    body: "Skupinové tréningy, opakované hodiny a rezervácie priestoru sú v jednom kalendári, aby tím nemusel koordinovať termíny bokom.",
    blurb: "Tréningy aj rezervácie priestoru v jednom kalendári.",
    metric: "30 dní",
    metricLabel: "plánovania dopredu",
    image: bookingsScreen,
    icon: CalendarDays,
    alt: "Kalendár rezervácií v Tap-it admin paneli",
  },
  {
    title: "Smeny a pokrytie",
    eyebrow: "Denná prevádzka",
    body: "Tím vidí pokrytie recepcie, diery v službách a čakajúce smeny, ktoré treba vyriešiť pred začiatkom dňa.",
    blurb: "Pokrytie recepcie a diery v službách na očiach.",
    metric: "06:00",
    metricLabel: "štart pokrytia",
    image: smenyScreen,
    icon: Clock,
    alt: "Kalendár smien v Tap-it admin paneli",
  },
  {
    title: "Priestory, ceny a kapacity",
    eyebrow: "Rezervovateľné zóny",
    body: "Basketbal, bedminton, solárium alebo vlastná miestnosť. Každý priestor má cenu, pravidlá a obrázok, ktorý sa použije v rezervačnom toku.",
    blurb: "Každý priestor má cenu, pravidlá aj obrázok.",
    metric: "5",
    metricLabel: "typov priestoru",
    image: priestoryScreen,
    icon: MapPin,
    alt: "Správa rezervovateľných priestorov v Tap-it admin paneli",
  },
  {
    title: "Novinky pre členov",
    eyebrow: "Komunikácia",
    body: "Sviatky, opravy alebo nové služby viete poslať členom ako oznam, ktorý má jasné obdobie platnosti a správny vizuál.",
    blurb: "Oznamy členom s platnosťou a vlastným vizuálom.",
    metric: "2",
    metricLabel: "aktívne oznamy",
    image: newsScreen,
    icon: Bell,
    alt: "Novinky a oznamy v Tap-it admin paneli",
  },
];

const valueCards = [
  {
    title: "Vstup bez plastových kartičiek",
    text: "Člen sa identifikuje QR kódom. Systém overí profil, členstvo a zapíše scan.",
    icon: DoorOpen,
  },
  {
    title: "Prevádzka pre celý tím",
    text: "Recepcia rieši vstupy, tréner rezervácie a majiteľ kontroluje čísla bez ručného preposielania.",
    icon: Dumbbell,
  },
  {
    title: "Členstvá a platby pokope",
    text: "Jednorazové vstupy, mesačné plány aj ročné členstvá sú napojené na profily a expirácie.",
    icon: CreditCard,
  },
  {
    title: "Menej práce v chatoch",
    text: "Oznamy, služby, priestory a schvaľovanie účtov sú v systéme, nie v poznámkach na recepcii.",
    icon: Bell,
  },
];

const operations = [
  "Admin panel pre majiteľa, manažéra, recepciu a trénerov",
  "QR vstup s históriou príchodov a odchodov",
  "Členstvá, rezervácie, priestory, smeny a novinky v jednej aplikácii",
  "Pripravené na napojenie mobilnej aplikácie pre členov",
];

const projectTypes = [
  "Chcem demo",
  "Mám fitness centrum",
  "Chcem pilot",
  "Chcem sa opýtať",
];

type ThemeMode = "light" | "dark";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("light");
  const year = useMemo(() => new Date().getFullYear(), []);
  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  return (
    <main
      className={`min-h-screen overflow-x-clip bg-base text-slate-100 theme-${theme}`}
    >
      <div aria-hidden="true" className="grain-overlay" />
      <Navigation
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
      <HeroProductShowcase />
      <ValueSection />
      <OperationsSection />
      <MobilePreviewSection />
      <ContactSection />
      <FullFooter year={year} />
    </main>
  );
}

function Navigation({
  menuOpen,
  setMenuOpen,
  theme,
  onThemeToggle,
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  theme: ThemeMode;
  onThemeToggle: () => void;
}) {
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
    event: ReactMouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setMenuOpen(false);
    scrollToAnchor(event, href);
  };

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6">
      <nav
        className={`mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 rounded-2xl border px-3 backdrop-blur-2xl backdrop-saturate-150 transition-colors duration-300 sm:px-4 ${navSurface}`}
      >
        <a
          href="#platforma"
          onClick={(event) => handleNavClick(event, "#platforma")}
          className="flex min-w-0 items-center gap-3"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-sm font-black text-white shadow-brand">
            T
          </span>
          <span
            className={`truncate text-sm font-bold tracking-tight transition-colors sm:text-base ${brandText}`}
          >
            Tap-it
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={(event) => handleNavClick(event, href)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${linkTone}`}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a href="#kontakt" className="primary-button hidden sm:inline-flex">
            Získať demo
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </a>
          <button
            type="button"
            className={`grid h-10 w-10 place-items-center rounded-xl border transition ${iconButtonTone}`}
            aria-label={
              isDark ? "Prepnúť na svetlý režim" : "Prepnúť na tmavý režim"
            }
            onClick={onThemeToggle}
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
            <a
              key={href}
              href={href}
              onClick={(event) => handleNavClick(event, href)}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${linkTone}`}
            >
              {label}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={() => setMenuOpen(false)}
            className="mt-1 rounded-xl bg-accent px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-accent-bright"
          >
            Získať demo
          </a>
        </div>
      ) : null}
    </header>
  );
}

function HeroProductShowcase() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const activeScreen = tourScreens[activeIndex];
  const settlePoint = 0.24;
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.18, settlePoint],
    reduceMotion ? [0, 0, 0] : [0, -62, -90],
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.14, settlePoint],
    [1, 0.5, 0],
  );
  const frameY = useTransform(
    scrollYProgress,
    [0, settlePoint],
    reduceMotion ? [0, 0] : [420, 0],
  );
  const frameScale = useTransform(
    scrollYProgress,
    [0, settlePoint],
    reduceMotion ? [1, 1] : [0.78, 1],
  );
  const frameWidth = useTransform(
    scrollYProgress,
    [0, settlePoint],
    ["min(62vw, 1040px)", "min(66vw, 1120px)"],
  );
  const frameOpacity = useTransform(scrollYProgress, [0, 0.08], [0.94, 1]);
  const bubbleOpacity = useTransform(
    scrollYProgress,
    [0, settlePoint, settlePoint + 0.06],
    [0, 0, 1],
  );
  const bubbleDriftX = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-10, 10],
  );
  const bubbleDriftY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [12, -12],
  );
  const screenFadeOpacity = useTransform(
    scrollYProgress,
    [0, 0.14, settlePoint],
    [1, 0.45, 0],
  );
  const sectionGlowX = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["45%", "45%"] : ["18%", "82%"],
  );
  const sectionGlowOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.5, 1, 0.62],
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < settlePoint) {
      setActiveIndex((current) => (current === 0 ? current : 0));
      return;
    }

    const normalized = (latest - settlePoint) / (1 - settlePoint);
    const clamped = Math.min(0.999, Math.max(0, normalized));
    const nextIndex = Math.min(
      tourScreens.length - 1,
      Math.floor(clamped * tourScreens.length),
    );

    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  return (
    <>
      <MobileHeroProductShowcase />
      <DesktopHeroProductShowcase
        sectionRef={sectionRef}
        activeScreen={activeScreen}
        activeIndex={activeIndex}
        contentY={contentY}
        contentOpacity={contentOpacity}
        frameY={frameY}
        frameScale={frameScale}
        frameWidth={frameWidth}
        frameOpacity={frameOpacity}
        screenFadeOpacity={screenFadeOpacity}
        sectionGlowX={sectionGlowX}
        sectionGlowOpacity={sectionGlowOpacity}
        bubbleOpacity={bubbleOpacity}
        bubbleDriftX={bubbleDriftX}
        bubbleDriftY={bubbleDriftY}
      />
    </>
  );
}

function MobileHeroProductShowcase() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeScreen = tourScreens[activeIndex];
  const ActiveIcon = activeScreen.icon;
  const settlePoint = 0.24;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.16, settlePoint],
    reduceMotion ? [0, 0, 0] : [0, -44, -64],
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.16, settlePoint],
    [1, 0.44, 0],
  );
  const frameY = useTransform(
    scrollYProgress,
    [0, settlePoint],
    reduceMotion ? [0, 0] : [390, 0],
  );
  const frameScale = useTransform(
    scrollYProgress,
    [0, settlePoint],
    reduceMotion ? [1, 1] : [0.9, 1],
  );
  const frameWidth = useTransform(
    scrollYProgress,
    [0, settlePoint],
    ["min(calc(100vw - 1.5rem), 520px)", "min(calc(100vw - 1.5rem), 576px)"],
  );
  const detailOpacity = useTransform(
    scrollYProgress,
    [0, settlePoint, settlePoint + 0.08],
    [0, 0, 1],
  );
  const detailY = useTransform(
    scrollYProgress,
    [0, settlePoint, settlePoint + 0.08],
    reduceMotion ? [0, 0, 0] : [24, 24, 0],
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < settlePoint) {
      setActiveIndex((current) => (current === 0 ? current : 0));
      return;
    }

    const normalized = (latest - settlePoint) / (1 - settlePoint);
    const clamped = Math.min(0.999, Math.max(0, normalized));
    const nextIndex = Math.min(
      tourScreens.length - 1,
      Math.floor(clamped * tourScreens.length),
    );

    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  return (
    <section
      ref={sectionRef}
      id="platforma"
      className="relative lg:hidden"
      style={{ height: `${(tourScreens.length + 1) * 96}svh` }}
    >
      <span
        id="produkt"
        aria-hidden="true"
        className="absolute top-[96svh] h-px w-px"
      />
      <div className="sticky top-0 min-h-[100svh] overflow-hidden">
        <div className="tap-hero-shell relative flex min-h-[100svh] items-start justify-center overflow-hidden px-3 pb-6 pt-[8.25rem]">
          <div aria-hidden="true" className="tap-hero-sky" />
          <HeroCloud
            src="/hero-clouds/cloud-left.png"
            className="hero-cloud-left"
          />
          <HeroCloud
            src="/hero-clouds/cloud-right.png"
            className="hero-cloud-right"
          />
          <HeroCloud
            src="/hero-clouds/cloud-low.png"
            className="hero-cloud-bottom"
          />
          <div aria-hidden="true" className="hero-grid opacity-60" />

          <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            variants={revealContainer}
            initial="hidden"
            animate="visible"
            className="pointer-events-none absolute inset-x-0 top-[6.5rem] z-20 mx-auto flex max-w-xl flex-col items-center px-4 text-center"
          >
            <motion.div
              variants={revealItem}
              className="hero-chip inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white/70 px-3 py-1.5 text-xs font-bold text-accent-deep shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent-bright" />
              Tap-it Fitness OS
            </motion.div>
            <motion.h1
              variants={revealItem}
              className="hero-title mt-5 max-w-xl text-balance text-[2.35rem] font-black leading-[0.95] tracking-tight text-slate-950 min-[390px]:text-[2.55rem] sm:text-6xl"
            >
              <span className="block">Fitness systém, ktorý pustí</span>
              <span className="block">dnu správnych ľudí.</span>
            </motion.h1>
            <motion.p
              variants={revealItem}
              className="hero-copy mt-4 max-w-md text-pretty text-sm font-semibold leading-6 text-slate-600 sm:text-base"
            >
              QR vstupy, členstvá, rezervácie a admin panel, ktorý drží celú
              prevádzku fitka pokope.
            </motion.p>
            <motion.div
              variants={revealItem}
              className="pointer-events-auto mt-5 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
            >
              <a href="#kontakt" className="primary-button w-full sm:w-auto">
                Dohodnúť demo
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
              <a
                href="#produkt"
                onClick={(event) => scrollToAnchor(event, "#produkt")}
                className="hero-secondary secondary-button w-full border-slate-950/10 bg-white/70 text-slate-950 hover:bg-white sm:w-auto"
              >
                Pozrieť produkt
              </a>
            </motion.div>
          </motion.div>

          <div className="relative z-10 flex w-full flex-col items-center">
            <motion.div
              style={{
                y: frameY,
                scale: frameScale,
                width: frameWidth,
              }}
              className="screen-stage relative aspect-[16/10]"
            >
            <StackedTourBrowserFrame activeIndex={activeIndex} />
            </motion.div>

            <motion.div
              style={{ opacity: detailOpacity, y: detailY }}
              className="mobile-tour-card mt-4 w-full max-w-xl rounded-3xl border border-white/55 bg-white/72 p-4 text-left shadow-[0_24px_70px_rgba(15,23,42,0.14)] backdrop-blur-xl"
            >
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent text-white shadow-brand">
                  <ActiveIcon aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-accent">
                    {activeScreen.eyebrow}
                  </p>
                  <h2 className="mt-1 text-xl font-black leading-tight text-slate-950">
                    {activeScreen.title}
                  </h2>
                </div>
              </div>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                {activeScreen.body}
              </p>
              <div className="mt-4 flex items-end justify-between border-t border-slate-950/10 pt-3">
                <div>
                  <p className="text-2xl font-black leading-none text-slate-950">
                    {activeScreen.metric}
                  </p>
                  <p className="mt-1 text-xs font-bold text-slate-500">
                    {activeScreen.metricLabel}
                  </p>
                </div>
                <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-black text-accent">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(tourScreens.length).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DesktopHeroProductShowcase({
  sectionRef,
  activeScreen,
  activeIndex,
  contentY,
  contentOpacity,
  frameY,
  frameScale,
  frameWidth,
  frameOpacity,
  screenFadeOpacity,
  sectionGlowX,
  sectionGlowOpacity,
  bubbleOpacity,
  bubbleDriftX,
  bubbleDriftY,
}: {
  sectionRef: RefObject<HTMLElement | null>;
  activeScreen: TourScreen;
  activeIndex: number;
  contentY: MotionValue<number>;
  contentOpacity: MotionValue<number>;
  frameY: MotionValue<number>;
  frameScale: MotionValue<number>;
  frameWidth: MotionValue<string>;
  frameOpacity: MotionValue<number>;
  screenFadeOpacity: MotionValue<number>;
  sectionGlowX: MotionValue<string>;
  sectionGlowOpacity: MotionValue<number>;
  bubbleOpacity: MotionValue<number>;
  bubbleDriftX: MotionValue<number>;
  bubbleDriftY: MotionValue<number>;
}) {
  return (
    <section
      ref={sectionRef}
      id="platforma"
      className="relative hidden bg-base lg:block"
      style={{ height: `${(tourScreens.length + 1) * 112}vh` }}
    >
      <span
        id="produkt"
        aria-hidden="true"
        className="absolute top-[112vh] h-px w-px"
      />
      <div className="sticky top-0 min-h-[100svh] overflow-hidden">
        <div className="tap-hero-shell relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden">
        <div aria-hidden="true" className="tap-hero-sky" />
        <HeroCloud src="/hero-clouds/cloud-left.png" className="hero-cloud-left" />
        <HeroCloud src="/hero-clouds/cloud-right.png" className="hero-cloud-right" />
        <HeroCloud src="/hero-clouds/cloud-low.png" className="hero-cloud-bottom" />
        <HeroCloud src="/hero-clouds/cloud-right.png" className="hero-cloud-low-right" />
        <div aria-hidden="true" className="hero-grid opacity-60" />
        <div aria-hidden="true" className="product-field" />
        <motion.div
          aria-hidden="true"
          className="product-orbit"
          style={{ left: sectionGlowX, opacity: sectionGlowOpacity }}
        />
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          variants={revealContainer}
          initial="hidden"
          animate="visible"
          className="pointer-events-none absolute inset-x-0 top-[7rem] z-20 mx-auto flex max-w-5xl flex-col items-center px-8 text-center"
        >
          <motion.div
            variants={revealItem}
            className="hero-chip inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white/75 px-3 py-1.5 text-xs font-bold text-accent-deep shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-bright" />
            Tap-it Fitness OS
          </motion.div>

          <motion.h1
            variants={revealItem}
            className="hero-title mt-6 max-w-6xl text-balance text-[2.9rem] font-black leading-[0.95] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            <span className="block sm:whitespace-nowrap">
              Fitness systém, ktorý pustí
            </span>
            <span className="block sm:whitespace-nowrap">
              dnu správnych ľudí.
            </span>
          </motion.h1>

          <motion.p
            variants={revealItem}
            className="hero-copy mt-6 max-w-2xl text-pretty text-base font-semibold leading-7 text-slate-600 sm:text-lg"
          >
            Promo web pre Tap-it: QR vstupy, členstvá, rezervácie a admin
            panel, ktorý drží celú prevádzku fitka pokope.
          </motion.p>

          <motion.div
            variants={revealItem}
            className="pointer-events-auto mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
          >
            <a href="#kontakt" className="primary-button w-full sm:w-auto">
              Dohodnúť demo
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <a
              href="#produkt"
              onClick={(event) => scrollToAnchor(event, "#produkt")}
              className="hero-secondary secondary-button w-full border-slate-950/10 bg-white/70 text-slate-950 hover:bg-white sm:w-auto"
            >
              Pozrieť produkt
            </a>
          </motion.div>

        </motion.div>

        <motion.div
          style={{ y: frameY, scale: frameScale, width: frameWidth, opacity: frameOpacity }}
          className="screen-stage relative z-10 mx-auto aspect-[16/9]"
        >
          <motion.div
            aria-hidden="true"
            className="hero-screen-fade"
            style={{ opacity: screenFadeOpacity }}
          />
          <motion.div
            aria-hidden="true"
            className="hero-proof-strip"
            style={{ opacity: screenFadeOpacity }}
          >
            {["QR vstupy", "Členstvá", "Rezervácie", "Smeny"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </motion.div>
          <StackedTourBrowserFrame activeIndex={activeIndex} />
          <TourInfoBubble
            activeScreen={activeScreen}
            activeIndex={activeIndex}
            bubbleOpacity={bubbleOpacity}
            driftX={bubbleDriftX}
            driftY={bubbleDriftY}
          />
        </motion.div>
        </div>
      </div>
    </section>
  );
}

const bubblePositions = [
  { top: "16%", left: "1%" },
  { top: "84%", left: "99%" },
  { top: "16%", left: "99%" },
  { top: "84%", left: "1%" },
];

function TourInfoBubble({
  activeScreen,
  activeIndex,
  bubbleOpacity,
  driftX,
  driftY,
}: {
  activeScreen: TourScreen;
  activeIndex: number;
  bubbleOpacity: MotionValue<number>;
  driftX: MotionValue<number>;
  driftY: MotionValue<number>;
}) {
  const reduceMotion = useReducedMotion();
  const Icon = activeScreen.icon;
  const position = bubblePositions[activeIndex % bubblePositions.length];

  return (
    <motion.div
      aria-hidden="true"
      className="tour-bubble pointer-events-none absolute z-30 w-[clamp(11rem,15vw,14rem)]"
      style={{ x: "-50%", y: "-50%", opacity: bubbleOpacity }}
      animate={{ top: position.top, left: position.left }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 120, damping: 20 }
      }
    >
      <motion.div style={{ x: driftX, y: driftY }}>
        <motion.div
          key={activeIndex}
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          className="rounded-3xl border border-white/60 bg-white/90 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.2)] backdrop-blur-xl"
        >
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-accent text-white shadow-brand">
              <Icon aria-hidden="true" className="h-4 w-4" />
            </span>
            <h3 className="text-sm font-black leading-tight text-slate-950">
              {activeScreen.title}
            </h3>
          </div>
          <p className="mt-3 text-xs font-semibold leading-5 text-slate-600">
            {activeScreen.blurb}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function HeroCloud({ src, className }: { src: string; className: string }) {
  return (
    <div aria-hidden="true" className={`hero-cloud ${className}`}>
      <Image
        src={src}
        alt=""
        fill
        sizes="(min-width: 1024px) 36vw, 70vw"
        className="object-contain"
      />
    </div>
  );
}

function StaticProductTour() {
  return (
    <section id="produkt" className="px-4 py-20 sm:px-6 lg:hidden">
      <div className="mx-auto max-w-4xl">
        <p className="section-kicker">Produkt</p>
        <h2 className="mt-4 text-4xl font-black leading-none tracking-tight text-white sm:text-5xl">
          Reálne obrazovky Tap-it.
        </h2>
        <div className="mt-10 grid gap-8">
          {tourScreens.map((screen) => {
            const Icon = screen.icon;

            return (
              <article
                key={screen.title}
                className="rounded-3xl border border-white/10 bg-surface p-3 shadow-card"
              >
                <BrowserFrame
                  image={screen.image}
                  alt={screen.alt}
                  label={screen.eyebrow}
                  sizes="(min-width: 768px) 720px, 100vw"
                />
                <div className="px-2 py-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-faint text-accent-soft">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-bold text-accent-soft">
                        {screen.eyebrow}
                      </p>
                      <h3 className="text-xl font-black text-white">
                        {screen.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    {screen.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StackedTourBrowserFrame({ activeIndex }: { activeIndex: number }) {
  const firstImage = tourScreens[0].image;
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const lastActiveIndex = useRef(activeIndex);

  useEffect(() => {
    if (activeIndex === lastActiveIndex.current) {
      return;
    }

    setPreviousIndex(lastActiveIndex.current);
    lastActiveIndex.current = activeIndex;

    const timeout = window.setTimeout(() => {
      setPreviousIndex(null);
    }, 360);

    return () => window.clearTimeout(timeout);
  }, [activeIndex]);

  return (
    <figure
      className="app-window absolute inset-0 overflow-hidden rounded-3xl border border-white/10 bg-raised p-2 shadow-[0_44px_150px_rgba(0,0,0,0.72)]"
    >
      <div className="flex h-10 items-center justify-between rounded-2xl border border-white/5 bg-base/[0.8] px-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning" />
          <span className="h-2.5 w-2.5 rounded-full bg-success" />
        </div>
        <span className="truncate px-4 text-xs font-bold text-slate-500">
          Tap-it admin
        </span>
        <span className="hidden rounded-full bg-accent-faint px-2.5 py-1 text-[10px] font-bold text-accent-soft sm:inline-flex">
          tap-it.sk
        </span>
      </div>
      <div
        className="relative mt-2 overflow-hidden rounded-2xl border border-white/5 bg-base"
        style={{ aspectRatio: `${firstImage.width} / ${firstImage.height}` }}
      >
        {tourScreens.map((screen, index) => {
          const isActive = index === activeIndex;
          const isPrevious = index === previousIndex;

          return (
            <Image
              key={screen.title}
              src={screen.image}
              alt={screen.alt}
              fill
              priority={index === 0}
              sizes="(min-width: 1280px) 1100px, 90vw"
              className={`select-none object-cover transition-opacity duration-300 ease-out ${
                isActive || isPrevious ? "opacity-100" : "opacity-0"
              }`}
              style={{ zIndex: isActive ? 20 : isPrevious ? 10 : 0 }}
            />
          );
        })}
      </div>
    </figure>
  );
}

function BrowserFrame({
  image,
  alt,
  label,
  className = "",
  priority = false,
  sizes = "(min-width: 1280px) 1040px, 92vw",
}: {
  image: StaticImageData;
  alt: string;
  label: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <figure
      className={`app-window relative overflow-hidden rounded-3xl border border-white/10 bg-raised p-2 ${className}`}
    >
      <div className="flex h-10 items-center justify-between rounded-2xl border border-white/5 bg-base/[0.8] px-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning" />
          <span className="h-2.5 w-2.5 rounded-full bg-success" />
        </div>
        <span className="truncate px-4 text-xs font-bold text-slate-500">
          {label}
        </span>
        <span className="hidden rounded-full bg-accent-faint px-2.5 py-1 text-[10px] font-bold text-accent-soft sm:inline-flex">
          tap-it.sk
        </span>
      </div>
      <div className="relative mt-2 overflow-hidden rounded-2xl border border-white/5 bg-base">
        <Image
          src={image}
          alt={alt}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full select-none"
        />
      </div>
    </figure>
  );
}

function ValueSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-3xl"
        >
          <motion.p variants={revealItem} className="section-kicker">
            Základ
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-4 text-4xl font-black leading-none tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Menej manuálnej práce, viac kontroly nad prevádzkou.
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-5 max-w-2xl text-base leading-7 text-slate-400"
          >
            Tap-it je operačný systém pre fitness centrum. Nerobí len pekný
            check-in, ale spája členov, tím, rezervácie a každodennú operatívu.
          </motion.p>
        </motion.div>

        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {valueCards.map((card) => {
            const Icon = card.icon;

            return (
              <motion.article
                key={card.title}
                variants={revealItem}
                className="group rounded-3xl border border-white/10 bg-surface p-6 transition hover:border-accent/40 hover:bg-raised"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-faint text-accent-soft transition group-hover:bg-accent group-hover:text-white">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </span>
                <h3 className="mt-8 text-xl font-black tracking-tight text-white">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {card.text}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function OperationsSection() {
  return (
    <section id="prevadzka" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p variants={revealItem} className="section-kicker">
            Prevádzka
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-4 max-w-2xl text-4xl font-black leading-none tracking-tight text-white sm:text-5xl"
          >
            Jeden systém pre vstup, členstvo aj denný tím.
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-5 max-w-xl text-base leading-7 text-slate-400"
          >
            Tap-it je navrhnutý pre malé a stredné fitness prevádzky, ktoré už
            nechcú skladať prácu z Google tabuliek, papierových zoznamov a
            ručných kontrol na recepcii.
          </motion.p>
        </motion.div>

        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-3xl border border-white/10 bg-surface p-3 shadow-card"
        >
          <div className="grid gap-3">
            {operations.map((item, index) => (
              <motion.div
                key={item}
                variants={revealItem}
                className="grid gap-4 rounded-2xl border border-white/5 bg-base/[0.65] p-5 sm:grid-cols-[3rem_1fr] sm:items-center"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-faint text-sm font-black text-accent-soft">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-base font-bold leading-7 text-white">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MobilePreviewSection() {
  return (
    <section className="border-y border-white/5 bg-surface px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="order-2 lg:order-1"
        >
          <div className="phone-stage mx-auto">
            <div className="phone-frame">
              <div className="phone-dynamic-island" />
              <div className="mt-12 flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-accent text-sm font-black text-white">
                  T
                </span>
                <span className="rounded-full bg-accent-faint px-3 py-1 text-xs font-bold text-accent-soft">
                  člen
                </span>
              </div>
              <div className="mt-10">
                <p className="text-sm font-semibold text-slate-500">
                  Váš vstup
                </p>
                <p className="mt-2 text-4xl font-black leading-none text-white">
                  QR karta
                </p>
              </div>
              <div className="mt-8 grid aspect-square place-items-center rounded-[2rem] border border-white/10 bg-white p-4">
                <div className="grid h-full w-full grid-cols-5 gap-2">
                  {Array.from({ length: 25 }).map((_, index) => (
                    <span
                      key={index}
                      className={
                        index % 3 === 0 || index % 7 === 0
                          ? "rounded-md bg-base"
                          : "rounded-md bg-slate-200"
                      }
                    />
                  ))}
                </div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs font-semibold text-slate-500">
                    Členstvo
                  </p>
                  <p className="mt-2 text-lg font-black text-white">Aktívne</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs font-semibold text-slate-500">
                    Rezervácie
                  </p>
                  <p className="mt-2 text-lg font-black text-white">3</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="order-1 lg:order-2"
        >
          <motion.div
            variants={revealItem}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-base/[0.7] px-3 py-1.5 text-xs font-bold text-slate-300"
          >
            <Smartphone aria-hidden="true" className="h-4 w-4 text-accent-soft" />
            Mobilná vrstva
          </motion.div>
          <motion.h2
            variants={revealItem}
            className="mt-5 max-w-2xl text-4xl font-black leading-none tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Ďalší reveal bude natívna appka pre členov.
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-5 max-w-xl text-base leading-7 text-slate-400"
          >
            Túto časť nechávam pripravenú ako produktový blok. Keď budú hotové
            reálne mobile screenshoty, dá sa z nej spraviť druhý parallax
            príbeh s iPhone mockupom.
          </motion.p>
          <motion.div variants={revealItem} className="mt-8 grid gap-3">
            {[
              "QR karta člena a stav členstva",
              "Rezervácie tréningov a priestorov",
              "Novinky, upozornenia a história vstupov",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-faint text-accent-soft">
                  <Check aria-hidden="true" className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold text-slate-300">
                  {item}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

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
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-surface shadow-float"
      >
        <div aria-hidden="true" className="contact-field" />
        <div className="relative grid gap-12 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-12 lg:py-14">
          <div>
            <p className="section-kicker">Demo</p>
            <h2 className="mt-4 max-w-xl text-4xl font-black leading-none tracking-tight text-white sm:text-5xl">
              Ukážme si, ako by Tap-it sedel na tvoje fitko.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-400">
              Napíš pár viet o prevádzke. Formulár je zatiaľ bez backendu, ale
              texty a flow sú pripravené na napojenie.
            </p>

            <div className="mt-8 grid gap-3">
              {[
                "Krátke produktové demo",
                "Pilotná prevádzka pre jeden gym",
                "Návrh modulov podľa reality recepcie",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent-faint text-accent-soft">
                    <BadgeCheck aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold text-slate-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {submitted ? (
            <div className="flex min-h-[360px] flex-col items-start justify-center rounded-3xl border border-white/10 bg-base/[0.7] p-8">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-white shadow-brand">
                <Check aria-hidden="true" className="h-7 w-7" />
              </span>
              <p className="mt-6 text-3xl font-black leading-tight text-white">
                Super, dopyt je pripravený.
              </p>
              <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">
                Backend ešte nie je napojený, takže toto je lokálny stav
                formulára. Vizuálne aj obsahovo je flow pripravený.
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
                    placeholder="Filip Paučo"
                    required
                  />
                </label>
                <label className="block">
                  <span className="field-label">E-mail</span>
                  <input
                    className="editorial-input"
                    name="email"
                    type="email"
                    placeholder="filip@fitko.sk"
                    required
                  />
                </label>
              </div>

              <fieldset>
                <legend className="field-label">Typ záujmu</legend>
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
                      <span className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-bold text-slate-400 transition hover:border-white/25 peer-checked:border-accent peer-checked:bg-accent peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-accent-soft">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="block">
                <span className="field-label">Správa</span>
                <textarea
                  className="editorial-input min-h-32 resize-none"
                  name="message"
                  placeholder="Koľko máte členov, ako dnes riešite vstupy a čo by mal Tap-it vyriešiť ako prvé?"
                  rows={5}
                />
              </label>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button className="primary-button w-full sm:w-auto" type="submit">
                  Odoslať záujem
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </button>
                <p className="text-center text-xs font-semibold text-slate-500 sm:text-right">
                  Bez newslettera. Len odpoveď k Tap-it.
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
    <footer className="border-t border-white/5 px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-sm font-black text-white">
              T
            </span>
            <span className="text-base font-black text-white">Tap-it</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-500">
            SaaS systém pre fitness centrá: QR vstupy, členstvá, rezervácie,
            smeny a admin panel pre každodennú prevádzku.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm font-semibold text-slate-500 sm:flex-row sm:gap-5">
          <span>© {year} Tap-it</span>
          <span>tap-it.sk</span>
          <span>Fitness OS</span>
        </div>
      </div>
    </footer>
  );
}

function FullFooter({ year }: { year: number }) {
  const footerNavigation = [
    ["Platforma", "#platforma"],
    ["Produkt", "#produkt"],
    ["Prevádzka", "#prevadzka"],
    ["Demo", "#kontakt"],
  ];
  const infoLinks = [
    "Všeobecné obchodné podmienky",
    "Ochrana osobných údajov",
    "Prevádzkový poriadok",
    "Cookies",
  ];
  const socialLinks = [
    { label: "Facebook", icon: Facebook },
    { label: "Instagram", icon: Instagram },
    { label: "X", icon: Twitter },
    { label: "LinkedIn", icon: Linkedin },
  ];
  const founders = [
    {
      name: "Filip Paučo",
      role: "Co-founder / produkt",
      image: filipFounder,
    },
    {
      name: "Patrik Repkovský",
      role: "Co-founder / technológia",
      image: patrikFounder,
    },
  ];

  return (
    <footer className="site-footer border-t border-white/5 bg-[#050506] px-4 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.9fr_0.9fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-sm font-black text-white shadow-brand">
                T
              </span>
              <span className="text-xl font-black tracking-tight text-white">
                Tap<span className="text-accent">-it</span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm font-semibold leading-7 text-slate-500">
              SaaS systém pre fitness centrá: QR vstupy, členstvá,
              rezervácie, smeny a admin panel pre každodennú prevádzku.
            </p>
            <div className="mt-7 flex gap-3">
              {socialLinks.map(({ label, icon: Icon }) => (
                <a
                  key={label}
                  href="#kontakt"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition hover:border-accent/45 hover:bg-accent/10 hover:text-white"
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Navigácia">
            {footerNavigation.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={(event) => scrollToAnchor(event, href)}
                className="footer-link"
              >
                {label}
              </a>
            ))}
          </FooterColumn>

          <FooterColumn title="Kontakt">
            <a href="#kontakt" className="footer-contact-row">
              <MapPin aria-hidden="true" className="h-4 w-4" />
              <span>
                Tap-it demo
                <br />
                Slovensko / online
              </span>
            </a>
            <a href="tel:+421000000000" className="footer-contact-row">
              <Phone aria-hidden="true" className="h-4 w-4" />
              <span>+421 demo call</span>
            </a>
            <a href="mailto:info@tap-it.sk" className="footer-contact-row">
              <Mail aria-hidden="true" className="h-4 w-4" />
              <span>info@tap-it.sk</span>
            </a>
          </FooterColumn>

          <FooterColumn title="Informácie">
            {infoLinks.map((item) => (
              <a key={item} href="#kontakt" className="footer-link">
                {item}
              </a>
            ))}
          </FooterColumn>

          <FooterColumn title="Founderi">
            <div className="flex -space-x-3">
              {founders.map((founder) => (
                <div
                  key={founder.name}
                  className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-[#050506] bg-raised"
                  title={founder.name}
                >
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="max-w-[13rem] text-sm font-semibold leading-6 text-slate-500">
              Tap-it stavajú Filip Paučo a Patrik Repkovský.
            </p>
          </FooterColumn>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs font-semibold text-slate-600 md:flex-row md:items-center md:justify-between">
          <p>© {year} Tap-it. Všetky práva vyhradené.</p>
          <p>
            Powered by{" "}
            <a
              href="#platforma"
              onClick={(event) => scrollToAnchor(event, "#platforma")}
              className="text-accent-soft transition hover:text-white"
            >
              Tap-it Fitness OS
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xs font-black uppercase tracking-[0.16em] text-slate-300">
        {title}
      </h2>
      <div className="mt-5 grid gap-3 text-sm font-semibold text-slate-500">
        {children}
      </div>
    </div>
  );
}
