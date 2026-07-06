"use client";

import Image, { type StaticImageData } from "next/image";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bell,
  CalendarDays,
  Check,
  Clock,
  CreditCard,
  DoorOpen,
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
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";

import appBookScreen from "../screenshots/app/Book.jpeg";
import appHelpScreen from "../screenshots/app/Help.jpeg";
import appHomeScreen from "../screenshots/app/Home.jpeg";
import appLandingScreen from "../screenshots/app/Landing.jpeg";
import appLoginScreen from "../screenshots/app/Login.jpeg";
import appNewsScreen from "../screenshots/app/News.jpeg";
import appProfileScreen from "../screenshots/app/Profile.jpeg";
import appProfileMenuScreen from "../screenshots/app/Profilemenu.jpeg";
import appQrScreen from "../screenshots/app/QRcode.jpeg";
import appSettingsScreen from "../screenshots/app/Settings.jpeg";
import appStatsScreen from "../screenshots/app/Stats.jpeg";
import appTransactionsScreen from "../screenshots/app/Transactions.jpeg";
import appTermsScreen from "../screenshots/app/VOP.jpeg";
import analyticsScreen from "../screenshots/web/Analytics.png";
import bookingsScreen from "../screenshots/web/Bookings.png";
import dashboardScreen from "../screenshots/web/Dashboard.png";
import filipFounder from "../founders/Filip_Paučo.jpg";
import membershipsScreen from "../screenshots/web/Memberships.png";
import newsScreen from "../screenshots/web/News.png";
import patrikFounder from "../founders/Patrik_Repkovský.jpg";
import priestoryScreen from "../screenshots/web/Priestory.png";
import scanLogsScreen from "../screenshots/web/Scan_Logs.png";
import smenyScreen from "../screenshots/web/Smeny.png";
import usersScreen from "../screenshots/web/User_Management.png";
import verificationScreen from "../screenshots/web/Verification.png";
import { projectTypes, type ProjectType } from "./contact-options";
import { fitnessFaqItems } from "./fitness-faq";

const navItems = [
  ["Platforma", "#platforma"],
  ["Prečo Tap-it", "#preco"],
  ["Prechod", "#prechod"],
  ["Appka", "#appka"],
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
    title: "Prehľad pre majiteľa",
    eyebrow: "Živý prehľad",
    body: "Majiteľ vidí návštevy, predané členstvá, obnovy a posledné záznamy vstupov na jednom mieste bez exportovania tabuliek.",
    blurb: "Návštevy, členstvá a scan logy na jednom mieste.",
    metric: "Živo",
    metricLabel: "prehľad prevádzky",
    image: dashboardScreen,
    icon: Activity,
    alt: "Prehľad Tap-it admin panelu so štatistikami návštev a živými scan logmi",
  },
  {
    title: "Správa používateľov",
    eyebrow: "Používatelia",
    body: "Recepcia, tréneri, manažéri aj členovia sú v jednom zozname s rolami, overením a stavom registrácie.",
    blurb: "Členovia, tréneri a manažéri v jednom zozname.",
    metric: "Role",
    metricLabel: "tím aj členovia",
    image: usersScreen,
    icon: Users,
    alt: "Správa používateľov a rolí v Tap-it admin paneli",
  },
  {
    title: "Verifikácia nových účtov",
    eyebrow: "Bezpečné schválenie",
    body: "Nový člen alebo pracovník sa do systému nedostane len tak. Admin potvrdí verifikáciu a až potom sa účet objaví v ostrej prevádzke.",
    blurb: "Nové účty schvaľuje admin pred ostrou prevádzkou.",
    metric: "Schválenie",
    metricLabel: "pred ostrým účtom",
    image: verificationScreen,
    icon: BadgeCheck,
    alt: "Zoznam používateľov čakajúcich na verifikáciu v Tap-it admin paneli",
  },
  {
    title: "Členstvá bez chaosu",
    eyebrow: "Predplatné",
    body: "Mesačné, ročné aj jednorazové vstupy sú prepojené na profil člena. Expirácie a zmeny plánu sú riešené priamo v administrácii.",
    blurb: "Vstupy a expirácie prepojené na profil člena.",
    metric: "Expirácie",
    metricLabel: "a zmeny plánov",
    image: membershipsScreen,
    icon: CreditCard,
    alt: "Prehľad členstiev v Tap-it admin paneli",
  },
  {
    title: "Analytika",
    eyebrow: "Prehľady",
    body: "Analytická vrstva je pripravené miesto pre detailnejšie prehľady návštev, členstiev a trendov prevádzky.",
    blurb: "Pripravené miesto pre detailné prehľady a trendy.",
    metric: "Ďalej",
    metricLabel: "prehľady a trendy",
    image: analyticsScreen,
    icon: Activity,
    alt: "Analytická obrazovka v Tap-it admin paneli",
  },
  {
    title: "QR vstupy a scan logy",
    eyebrow: "Kontrola vstupu",
    body: "Každý príchod a odchod zostane zapísaný. Recepcia okamžite vidí, kto vstúpil, kedy a či má platné členstvo.",
    blurb: "Každý príchod a odchod zostane zapísaný.",
    metric: "Scan log",
    metricLabel: "každého vstupu",
    image: scanLogsScreen,
    icon: ScanLine,
    alt: "Scan logy v Tap-it admin paneli so záznamami vstupov a odchodov",
  },
  {
    title: "Rezervácie a kalendár",
    eyebrow: "Triedy a termíny",
    body: "Skupinové tréningy, opakované hodiny a rezervácie priestoru sú v jednom kalendári, aby tím nemusel koordinovať termíny bokom.",
    blurb: "Tréningy aj rezervácie priestoru v jednom kalendári.",
    metric: "Kalendár",
    metricLabel: "rezervácií",
    image: bookingsScreen,
    icon: CalendarDays,
    alt: "Kalendár rezervácií v Tap-it admin paneli",
  },
  {
    title: "Smeny a pokrytie",
    eyebrow: "Denná prevádzka",
    body: "Tím vidí pokrytie recepcie, diery v službách a čakajúce smeny, ktoré treba vyriešiť pred začiatkom dňa.",
    blurb: "Pokrytie recepcie a diery v službách na očiach.",
    metric: "Pokrytie",
    metricLabel: "recepcie a tímu",
    image: smenyScreen,
    icon: Clock,
    alt: "Kalendár smien v Tap-it admin paneli",
  },
  {
    title: "Priestory, ceny a kapacity",
    eyebrow: "Rezervovateľné zóny",
    body: "Basketbal, bedminton, solárium alebo vlastná miestnosť. Každý priestor má cenu, pravidlá a obrázok, ktorý sa použije v rezervačnom toku.",
    blurb: "Každý priestor má cenu, pravidlá aj obrázok.",
    metric: "Kapacity",
    metricLabel: "priestorov",
    image: priestoryScreen,
    icon: MapPin,
    alt: "Správa rezervovateľných priestorov v Tap-it admin paneli",
  },
  {
    title: "Novinky pre členov",
    eyebrow: "Komunikácia",
    body: "Sviatky, opravy alebo nové služby viete poslať členom ako oznam, ktorý má jasné obdobie platnosti a správny vizuál.",
    blurb: "Oznamy členom s platnosťou a vlastným vizuálom.",
    metric: "Oznamy",
    metricLabel: "pre členov",
    image: newsScreen,
    icon: Bell,
    alt: "Novinky a oznamy v Tap-it admin paneli",
  },
];

type AppScreen = {
  title: string;
  label: string;
  body: string;
  features: string[];
  image: StaticImageData;
  icon: LucideIcon;
  alt: string;
};

const appScreens: AppScreen[] = [
  {
    title: "Prvý vstup do Premium Gyms",
    label: "Úvod",
    body: "Úvodná obrazovka vysvetlí hodnotu appky a pošle člena rovno na prihlásenie alebo registráciu.",
    features: [
      "Rýchla voľba prihlásenia alebo registrácie",
      "Silný gym vizuál pre prvý kontakt so značkou",
    ],
    image: appLandingScreen,
    icon: Smartphone,
    alt: "Úvodná obrazovka mobilnej aplikácie Tap-it s úvodným textom a tlačidlami na prihlásenie alebo registráciu",
  },
  {
    title: "Prihlásenie bez trenia",
    label: "Prihlásenie",
    body: "Člen sa prihlási e-mailom, heslom alebo Google účtom. Chybové hlášky ostávajú priamo pri postupe.",
    features: [
      "E-mail a heslo pre existujúcich členov",
      "Prihlásenie cez Google a lokálne spätné väzby",
    ],
    image: appLoginScreen,
    icon: DoorOpen,
    alt: "Prihlasovacia obrazovka mobilnej aplikácie Tap-it s e-mailom, heslom a Google prihlásením",
  },
  {
    title: "Domov s aktuálnym stavom",
    label: "Domov",
    body: "Domov ukáže účet, neprečítané oznamy, obsadenosť fitka a práve hrajúcu hudbu, aby člen vedel, čo sa deje.",
    features: [
      "Živá obsadenosť fitka a novinky",
      "Rýchly prehľad členského účtu po prihlásení",
    ],
    image: appHomeScreen,
    icon: Activity,
    alt: "Domovská obrazovka mobilnej aplikácie Tap-it s prehľadom, notifikáciami a stavom fitka",
  },
  {
    title: "Oznamy z gymu",
    label: "Oznamy",
    body: "Aktuality majú obrázok, platnosť a detail. Člen vidí zmeny otváracích hodín, servis alebo nové služby v appke.",
    features: [
      "Zoznam aktívnych oznamov z administrácie",
      "Detail oznamu s obrázkom a textom",
    ],
    image: appNewsScreen,
    icon: Bell,
    alt: "Obrazovka oznamov v mobilnej aplikácii Tap-it s aktualitami z fitness centra",
  },
  {
    title: "Tréningový progres",
    label: "Progres",
    body: "Štatistiky skladajú vstupy, minúty, sériu návštev, váhu, odznaky a kalendár tréningov do jedného osobného prehľadu.",
    features: [
      "Mesačné tréningy, minúty a séria návštev",
      "Graf váhy, odznaky a kalendár aktivity",
    ],
    image: appStatsScreen,
    icon: Activity,
    alt: "Štatistiky člena v mobilnej aplikácii Tap-it s tréningmi, grafmi a odznakmi",
  },
  {
    title: "QR karta pre vstup",
    label: "QR kód",
    body: "Aplikácia načíta aktívne členstvo, uložené záložné údaje a pravidelne obnovovaný QR token pre kontrolovaný vstup.",
    features: [
      "Aktívne členstvo alebo otvorený vstup",
      "QR token pripravený na sken pri recepcii",
    ],
    image: appQrScreen,
    icon: ScanLine,
    alt: "QR obrazovka mobilnej aplikácie Tap-it s členskou kartou a vstupným QR kódom",
  },
  {
    title: "Rezervácie služieb",
    label: "Rezervácie",
    body: "Člen si vyberie trénera, priestor alebo skupinovú lekciu, zvolí termín a môže pokračovať na platbu.",
    features: [
      "Tréneri, priestory a skupinové lekcie",
      "Termíny, dostupnosť, cena a platobný krok",
    ],
    image: appBookScreen,
    icon: CalendarDays,
    alt: "Rezervačná obrazovka mobilnej aplikácie Tap-it s ponukou trénerov, priestorov a lekcií",
  },
  {
    title: "Profilové menu",
    label: "Profil menu",
    body: "Z jedného miesta vedie cesta na profil, nastavenia, notifikácie, transakcie, QR členstvo, podporu aj právne dokumenty.",
    features: [
      "Účet, členstvo, podpora a relácia pokope",
      "Rýchle odkazy na najčastejšie akcie člena",
    ],
    image: appProfileMenuScreen,
    icon: Menu,
    alt: "Profilové menu mobilnej aplikácie Tap-it s odkazmi na účet, nastavenia, platby a podporu",
  },
  {
    title: "Osobný profil",
    label: "Profil",
    body: "Profil spája osobné údaje s tréningovými metrikami, cieľmi, úrovňou skúseností, odznakmi a stavom členstva.",
    features: [
      "Osobné údaje a tréningové preferencie",
      "Metriky, odznaky a aktívne členstvo",
    ],
    image: appProfileScreen,
    icon: Users,
    alt: "Detail profilu v mobilnej aplikácii Tap-it s údajmi člena, metrikami a odznakmi",
  },
  {
    title: "Úprava údajov",
    label: "Nastavenia",
    body: "Člen môže doplniť fotku, kontakty, adresu, dátum narodenia, tréningový cieľ a základné parametre profilu.",
    features: [
      "Avatar, kontakt a adresa člena",
      "Ciele, skúsenosť, výška a váha",
    ],
    image: appSettingsScreen,
    icon: Users,
    alt: "Nastavenia profilu v mobilnej aplikácii Tap-it s formulárom osobných údajov a tréningových cieľov",
  },
  {
    title: "História platieb",
    label: "Transakcie",
    body: "Transakcie ukazujú nákupy, refundy, stav platby, dôvod a prepojenie na členstvo alebo rezervovanú službu.",
    features: [
      "Prehľad nákupov a vrátených platieb",
      "Stav platby, suma, mena a dátum",
    ],
    image: appTransactionsScreen,
    icon: CreditCard,
    alt: "História transakcií v mobilnej aplikácii Tap-it s platbami za členstvá a rezervácie",
  },
  {
    title: "Centrum pomoci",
    label: "Pomoc",
    body: "FAQ rieši QR vstup, členstvo a platby. Formulár zbiera meno, e-mail a popis problému pre podporu.",
    features: [
      "Otázky k QR vstupu, členstvu a platbám",
      "Kontaktný formulár pre problém člena",
    ],
    image: appHelpScreen,
    icon: Mail,
    alt: "Centrum pomoci v mobilnej aplikácii Tap-it s FAQ a kontaktným formulárom",
  },
  {
    title: "Právne dokumenty",
    label: "VOP",
    body: "VOP, ochrana údajov, prevádzkový poriadok a cookies sú dostupné priamo v appke aj s PDF verziou.",
    features: [
      "Text dokumentu v aplikácii",
      "Tlačidlo na otvorenie PDF verzie",
    ],
    image: appTermsScreen,
    icon: BadgeCheck,
    alt: "Všeobecné obchodné podmienky v mobilnej aplikácii Tap-it s právnym textom a PDF tlačidlom",
  },
];

const valueCards = [
  {
    title: "Nie šablóna, ale prevádzkový návrh",
    text: "Najprv mapujeme, ako tvoj gym funguje dnes. Až potom skladáme moduly, ktoré majú zmysel.",
    icon: BadgeCheck,
  },
  {
    title: "Vlastná appka ako hlavný zážitok",
    text: "Člen nerieši cudzí portál. Vidí vstup, rezervácie, platby a podporu v prostredí tvojej značky.",
    icon: Smartphone,
  },
  {
    title: "Členstvá bez slepých miest",
    text: "Expirácie, jednorazové vstupy, obnovy aj výnimky sú naviazané na profil člena a scan log.",
    icon: CreditCard,
  },
  {
    title: "Prechod pred veľkým záväzkom",
    text: "Začíname auditom dát, hardvéru a najdôležitejšieho vstupného postupu, nie verejnou tabuľkou s balíkmi.",
    icon: Activity,
  },
];

const operations = [
  "Kto môže vstúpiť, kedy a s akým členstvom",
  "Kto na recepcii rieši výnimky a manuálne vstupy",
  "Ako sa obnovujú členstvá, jednorazové vstupy a platby",
  "Ktoré rezervácie potrebujú kapacitu, cenu a pravidlá",
  "Ktorý skener alebo turniket otvára vstup a čo sa deje pri zamietnutí",
  "Ako sa zapisujú scan logy a výpadkové scenáre",
  "Čo má vidieť člen v appke a čo má vidieť tím v admin paneli",
];

const comparisonColumns = [
  {
    title: "Krabicový systém",
    badge: "Proces sa ohýba softvéru",
    text: "Dostaneš veľa funkcií naraz, ale prevádzka sa často musí prispôsobiť tomu, ako je balík postavený.",
    outcome: "Výsledok: tím začne systém obchádzať hneď pri prvých výnimkách.",
    icon: Activity,
    points: [
      "Fixné balíky a hranice funkcií",
      "Veľa modulov naraz bez jasnej priority",
      "Kompromisy v členovskom zážitku",
      "Zmena procesu až po nasadení",
    ],
  },
  {
    title: "Tap-it OS",
    badge: "Softvér sa skladá podľa gymu",
    text: "Začíname auditom prevádzky, dát a vstupu. Potom skladáme prechod, hardvér a pilot podľa reality gymu.",
    outcome: "Výsledok: prvý prechod rieši dáta, vstup, hardvér aj členovskú appku.",
    icon: BadgeCheck,
    points: [
      "Prechod z existujúceho systému",
      "Migrácia dát a členstiev",
      "Hardvér na kľúč",
      "Admin aj appka podľa reality gymu",
    ],
  },
];

const auditSteps = [
  {
    title: "Vstupy",
    text: "Kto môže vstúpiť, kedy, cez čo a čo sa má stať pri výnimke.",
    icon: DoorOpen,
  },
  {
    title: "Migrácia",
    text: "Odkiaľ idú dáta členov, členstiev, expirácie a čo treba vyčistiť pred importom.",
    icon: Activity,
  },
  {
    title: "Hardvér",
    text: "Turniket, QR skener, recepčný skener, fyzické umiestnenie a postup pri výpadku.",
    icon: ScanLine,
  },
  {
    title: "Členstvá",
    text: "Mesačné, ročné, jednorazové vstupy, expirácie a manuálne zásahy.",
    icon: CreditCard,
  },
  {
    title: "Recepcia",
    text: "Role, overovanie účtov, scan logy a každodenné rozhodnutia tímu.",
    icon: Users,
  },
  {
    title: "Rezervácie",
    text: "Tréneri, priestory, kapacity, pravidlá storna a platobné kroky.",
    icon: CalendarDays,
  },
  {
    title: "Komunikácia",
    text: "Oznamy, notifikácie, právne dokumenty a podpora pre členov.",
    icon: Bell,
  },
  {
    title: "Výpadky",
    text: "Slabý internet, chyba platby, neplatné členstvo a ručný zásah recepcie.",
    icon: BadgeCheck,
  },
];

const pilotWeeks = [
  {
    week: "Týždeň 1",
    title: "Audit a export",
    text: "Mapujeme dáta, členstvá, vstupné pravidlá, recepčný postup a obhliadku hardvéru.",
  },
  {
    week: "Týždeň 2",
    title: "Admin a import",
    text: "Pripravíme role, používateľov, import dát, scan logy a konfiguráciu vstupu.",
  },
  {
    week: "Týždeň 3",
    title: "Appka a hardvér",
    text: "Napojíme appku, QR vstup, skenery alebo turniket a otestujeme členovský postup.",
  },
  {
    week: "Týždeň 4",
    title: "Školenie a prepnutie",
    text: "Prejdeme skúšobný deň, zaškolíme tím, nastavíme záložný postup a spustíme ostrý prechod.",
  },
];

const migrationSteps = [
  {
    title: "Aktuálne riešenie",
    text: "Zistíme, kde dnes žijú členovia, členstvá, platby, rezervácie a recepčné výnimky.",
    icon: Activity,
  },
  {
    title: "Tap-it OS",
    text: "Vyčistíme pravidlá, pripravíme import a nastavíme admin tak, aby tím nemusel začínať od nuly.",
    icon: BadgeCheck,
  },
  {
    title: "Vstup a hardvér",
    text: "Zladíme QR vstup, skenery, turnikety a recepčný záložný postup pred ostrým prepnutím.",
    icon: ScanLine,
  },
];

const hardwareItems = [
  {
    title: "Turnikety a brány",
    text: "Návrh zapojenia, pravidlá otvorenia a test scenárov pre platné aj neplatné členstvo.",
    icon: DoorOpen,
  },
  {
    title: "QR skenery",
    text: "Recepčný alebo vstupný skener napojený na členstvo, scan log a výnimkové rozhodnutia.",
    icon: ScanLine,
  },
  {
    title: "Umiestnenie v prevádzke",
    text: "Riešime, kde má byť skener, čo vidí recepcia a ako sa člen prirodzene dostane dnu.",
    icon: MapPin,
  },
];

const cutoverChecks = [
  "Export a čistenie dát pred importom",
  "Mapovanie členstiev, expirácie a výnimiek",
  "Test QR vstupu, skenera a turniketu",
  "Školenie recepcie a záložný postup",
  "Skúšobný deň pred ostrým prepnutím",
];

const proofItems = [
  "Admin prehľad so vstupmi, členstvami a scan logmi",
  "Správa členov, rolí a verifikácie nových účtov",
  "Rezervácie priestorov, trénerov a skupinových termínov",
  "Mobilná appka s QR kartou, oznamami, profilom a podporou",
];

const nextItems = [
  "Detailnejšia analytika návštevnosti a trendov členstiev",
  "Platobné scenáre pre rôzne typy služieb a výnimiek",
  "Výpadkové režimy pre recepciu a kontrolovaný vstup",
  "Lepšie vstupné kroky pre nový gym a nový tím",
];

type ThemeMode = "light" | "dark";
type ContactSubmitStatus = "idle" | "submitting" | "success" | "error";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("dark");
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
      <MiddleExperienceBackdrop>
        <ValueSection />
        <BoxVsTapitSection />
        <AuditSection />
        <MigrationHardwareSection />
        <OperationsSection />
        <PilotSection />
        <ProofSection />
      </MiddleExperienceBackdrop>
      <MobilePreviewSection />
      <SeoAnswersSection />
      <ContactSection />
      <FullFooter year={year} />
    </main>
  );
}

function MiddleExperienceBackdrop({ children }: { children: ReactNode }) {
  return (
    <div className="experience-band">
      <div aria-hidden="true" className="experience-band-grid" />
      <div aria-hidden="true" className="experience-band-glow experience-band-glow-blue" />
      <div aria-hidden="true" className="experience-band-glow experience-band-glow-red" />
      <div className="relative z-10">{children}</div>
    </div>
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
            Dohodnúť audit
          </a>
        </div>
      ) : null}
    </header>
  );
}

// Scattered layout for the desktop horizontal gallery. Index 0 is the large
// "hero" browser frame; the rest are smaller shots dropped at varied heights so
// the track reads like an editorial collage as it scrolls sideways.
const desktopGalleryLayout = [
  { width: "clamp(34rem, 46vw, 54rem)", offsetY: 0, rotate: 0 },
  { width: "clamp(15rem, 19vw, 22rem)", offsetY: -84, rotate: -1.5 },
  { width: "clamp(17rem, 23vw, 27rem)", offsetY: 66, rotate: 1.2 },
  { width: "clamp(14rem, 17vw, 20rem)", offsetY: -36, rotate: 2 },
  { width: "clamp(18rem, 25vw, 29rem)", offsetY: 48, rotate: -1 },
  { width: "clamp(15rem, 19vw, 22rem)", offsetY: -92, rotate: 1.6 },
  { width: "clamp(16rem, 21vw, 24rem)", offsetY: 30, rotate: -2 },
  { width: "clamp(14rem, 17vw, 20rem)", offsetY: -52, rotate: 1 },
  { width: "clamp(17rem, 23vw, 26rem)", offsetY: 72, rotate: -1.4 },
  { width: "clamp(15rem, 19vw, 22rem)", offsetY: -22, rotate: 2 },
];

// Scattered vertical layout for the mobile gallery (screens after the hero).
// Varied widths + left/right/center alignment give it the editorial collage
// feel instead of a uniform stack. One entry per tourScreens.slice(1) item.
const mobileGalleryLayout = [
  { width: "72%", align: "flex-start", gap: "0rem" },
  { width: "58%", align: "flex-end", gap: "4.5rem" },
  { width: "84%", align: "flex-start", gap: "5rem" },
  { width: "62%", align: "flex-end", gap: "4.5rem" },
  { width: "76%", align: "center", gap: "5rem" },
  { width: "58%", align: "flex-start", gap: "4.5rem" },
  { width: "86%", align: "flex-end", gap: "5rem" },
  { width: "64%", align: "flex-start", gap: "4.5rem" },
  { width: "74%", align: "flex-end", gap: "5rem" },
] as const;

function HeroProductShowcase() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const closeDetail = () => setOpenIndex(null);
  const stepDetail = (step: number) =>
    setOpenIndex((current) =>
      current === null
        ? current
        : (current + step + tourScreens.length) % tourScreens.length,
    );

  return (
    <>
      <MobileHeroProductShowcase onOpen={setOpenIndex} />
      <DesktopHeroProductShowcase onOpen={setOpenIndex} />
      <TourDetailOverlay
        activeIndex={openIndex}
        onClose={closeDetail}
        onPrev={() => stepDetail(-1)}
        onNext={() => stepDetail(1)}
      />
    </>
  );
}

function HeroCopy({ variant }: { variant: "mobile" | "desktop" }) {
  const isDesktop = variant === "desktop";

  return (
    <>
      <motion.div
        variants={revealItem}
        className={`hero-chip inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white/75 px-3 py-1.5 text-xs font-bold text-accent-deep shadow-[0_10px_30px_rgba(15,23,42,0.08)] ${
          isDesktop ? "backdrop-blur" : ""
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent-bright" />
        Tap-it Fitness OS
      </motion.div>

      <motion.h1
        variants={revealItem}
        className={
          isDesktop
            ? "hero-title mt-6 max-w-6xl text-balance text-[2.9rem] font-black leading-[0.95] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl xl:text-8xl"
            : "hero-title mt-5 max-w-xl text-balance text-[2.35rem] font-black leading-[0.95] tracking-tight text-slate-950 min-[390px]:text-[2.55rem] sm:text-6xl"
        }
      >
        <span className="block">Softvér pre fitká,</span>
        <span className="block">ktoré nechcú krabicový systém.</span>
      </motion.h1>

      <motion.p
        variants={revealItem}
        className={
          isDesktop
            ? "hero-copy mt-6 max-w-2xl text-pretty text-base font-semibold leading-7 text-slate-600 sm:text-lg"
            : "hero-copy mt-4 max-w-md text-pretty text-sm font-semibold leading-6 text-slate-600 sm:text-base"
        }
      >
        Tap-it Fitness OS spája QR vstupy, členstvá, rezervácie, turnikety a appku
        do jedného systému podľa tvojej prevádzky.
      </motion.p>

      <motion.div
        variants={revealItem}
        className={`pointer-events-auto flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row ${
          isDesktop ? "mt-8" : "mt-5"
        }`}
      >
        <a href="#kontakt" className="primary-button w-full sm:w-auto">
          Dohodnúť audit
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
    </>
  );
}

function MobileHeroProductShowcase({
  onOpen,
}: {
  onOpen: (index: number) => void;
}) {
  const heroScreen = tourScreens[0];

  return (
    <section id="platforma" className="relative overflow-hidden lg:hidden">
      <div className="tap-hero-shell relative overflow-hidden">
        <div className="relative flex min-h-[100svh] flex-col items-center px-3 pb-12 pt-[8.25rem]">
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
            variants={revealContainer}
            initial="hidden"
            animate="visible"
            className="relative z-20 flex max-w-xl flex-col items-center text-center"
          >
            <HeroCopy variant="mobile" />
          </motion.div>

          <motion.button
            type="button"
            onClick={() => onOpen(0)}
            whileTap={{ scale: 0.985 }}
            aria-label={`Otvoriť detail: ${heroScreen.title}`}
            className="relative z-10 mt-9 w-full max-w-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft"
          >
            <BrowserFrame
              image={heroScreen.image}
              alt={heroScreen.alt}
              label="Tap-it admin"
              priority
              sizes="(min-width: 768px) 600px, 92vw"
            />
          </motion.button>
        </div>

        <div className="relative px-5 pb-28 pt-8">
          <span id="produkt" aria-hidden="true" className="block h-px w-px" />
          <p className="tour-tile-eyebrow mb-2 text-[0.7rem] font-bold uppercase tracking-[0.24em]">
            Ďalšie obrazovky
          </p>

          <div className="flex flex-col">
            {tourScreens.slice(1).map((screen, offset) => {
              const index = offset + 1;
              const layout =
                mobileGalleryLayout[offset] ??
                mobileGalleryLayout[offset % mobileGalleryLayout.length];

              return (
                <motion.button
                  key={screen.title}
                  type="button"
                  onClick={() => onOpen(index)}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-12%" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  aria-label={`Otvoriť detail: ${screen.title}`}
                  style={{
                    width: layout.width,
                    alignSelf: layout.align,
                    marginTop: layout.gap,
                  }}
                  className="group block text-left focus:outline-none"
                >
                  <span className="tour-tile-eyebrow mb-3 flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.22em]">
                    <span className="tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-5 bg-current opacity-40" />
                    {screen.eyebrow}
                  </span>
                  <div className="tour-tile-card relative overflow-hidden rounded-2xl p-1.5">
                    <div className="overflow-hidden rounded-xl">
                      <Image
                        src={screen.image}
                        alt={screen.alt}
                        sizes="90vw"
                        className="h-auto w-full select-none"
                      />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function DesktopHeroProductShowcase({
  onOpen,
}: {
  onOpen: (index: number) => void;
}) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (reduceMotion) return;

    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const distance = track.scrollWidth - window.innerWidth;
      setMaxScroll(distance > 0 ? distance : 0);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [reduceMotion]);

  // Choreography: the hero text sits over the big first frame, which peeks up
  // from the bottom. Scrolling lifts the text out while the frame rises to fill
  // its place; only after that does the horizontal gallery of the other screens
  // scroll in.
  const textOutEnd = 0.16;
  const riseEnd = 0.26;
  const contentY = useTransform(
    scrollYProgress,
    [0, textOutEnd],
    reduceMotion ? [0, 0] : [0, -150],
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, textOutEnd * 0.55, textOutEnd],
    [1, 0.35, 0],
  );
  const galleryY = useTransform(
    scrollYProgress,
    [0, riseEnd],
    reduceMotion ? [0, 0] : [440, 0],
  );
  const galleryScale = useTransform(
    scrollYProgress,
    [0, riseEnd],
    reduceMotion ? [1, 1] : [0.9, 1],
  );
  const galleryOpacity = useTransform(
    scrollYProgress,
    [0, 0.04],
    reduceMotion ? [1, 1] : [0.7, 1],
  );
  const trackX = useTransform(scrollYProgress, [riseEnd, 1], [0, -maxScroll]);
  const hintOpacity = useTransform(
    scrollYProgress,
    [0, riseEnd, riseEnd + 0.04, 0.9, 1],
    [0, 0, 1, 1, 0],
  );
  const sectionGlowX = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["50%", "50%"] : ["26%", "74%"],
  );

  return (
    <section
      ref={sectionRef}
      id="platforma"
      className="relative hidden bg-base lg:block"
      style={
        reduceMotion
          ? undefined
          : { height: `${(tourScreens.length + 3) * 46}vh` }
      }
    >
      <span
        id="produkt"
        aria-hidden="true"
        className="absolute left-0 top-[100vh] h-px w-px"
      />
      <div
        className={`min-h-[100svh] overflow-hidden ${
          reduceMotion ? "" : "sticky top-0"
        }`}
      >
        <div className="tap-hero-shell relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden">
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
          <HeroCloud
            src="/hero-clouds/cloud-right.png"
            className="hero-cloud-low-right"
          />
          <div aria-hidden="true" className="hero-grid opacity-60" />
          <motion.div
            aria-hidden="true"
            className="product-orbit"
            style={{ left: sectionGlowX }}
          />

          <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            variants={revealContainer}
            initial="hidden"
            animate="visible"
            className="pointer-events-none absolute inset-x-0 top-[7rem] z-20 mx-auto flex max-w-5xl flex-col items-center px-8 text-center"
          >
            <HeroCopy variant="desktop" />
          </motion.div>

          <motion.div
            style={{
              y: galleryY,
              scale: galleryScale,
              opacity: galleryOpacity,
            }}
            className="relative z-10 w-full"
          >
            <div className={reduceMotion ? "w-full overflow-x-auto pb-6" : "w-full"}>
              <motion.div
                ref={trackRef}
                style={{
                  ...(reduceMotion ? {} : { x: trackX }),
                  gap: "clamp(4.5rem, 8vw, 9rem)",
                  paddingLeft: "calc(50vw - clamp(17rem, 23vw, 27rem))",
                  paddingRight: "calc(50vw - clamp(7.5rem, 9.5vw, 11rem))",
                }}
                className="flex w-max items-center"
              >
                {tourScreens.map((screen, index) => (
                  <GalleryTile
                    key={screen.title}
                    screen={screen}
                    index={index}
                    onOpen={onOpen}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            aria-hidden="true"
            style={reduceMotion ? { opacity: 1 } : { opacity: hintOpacity }}
            className="tour-scroll-hint pointer-events-none absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.24em]"
          >
            Skroluj galériou
            <ArrowRight className="h-3.5 w-3.5" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function GalleryTile({
  screen,
  index,
  onOpen,
}: {
  screen: TourScreen;
  index: number;
  onOpen: (index: number) => void;
}) {
  const reduceMotion = useReducedMotion();
  const layout =
    desktopGalleryLayout[index] ??
    desktopGalleryLayout[index % desktopGalleryLayout.length];
  const isHero = index === 0;

  return (
    <div
      className="shrink-0"
      style={{
        width: layout.width,
        transform: `translateY(${layout.offsetY}px) rotate(${layout.rotate}deg)`,
      }}
    >
      <motion.button
        type="button"
        onClick={() => onOpen(index)}
        whileHover={reduceMotion ? undefined : { y: -10 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        aria-label={`Otvoriť detail: ${screen.title}`}
        className="group block w-full text-left focus:outline-none"
      >
        {isHero ? null : (
          <span className="tour-tile-eyebrow mb-3 flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.24em]">
            <span className="tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-6 bg-current opacity-40" />
            {screen.eyebrow}
          </span>
        )}

        {isHero ? (
          <BrowserFrame
            image={screen.image}
            alt={screen.alt}
            label="Tap-it admin"
            priority
            sizes="(min-width: 1280px) 900px, 46vw"
          />
        ) : (
          <div className="tour-tile-card relative overflow-hidden rounded-3xl p-2">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src={screen.image}
                alt={screen.alt}
                sizes="(min-width: 1024px) 30vw, 90vw"
                className="h-auto w-full select-none transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <span className="pointer-events-none absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-base/70 px-3 py-1 text-[0.68rem] font-bold text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
              Zobraziť
              <ArrowRight aria-hidden="true" className="h-3 w-3" />
            </span>
          </div>
        )}
      </motion.button>
    </div>
  );
}

function TourDetailOverlay({
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: {
  activeIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const isOpen = activeIndex !== null;

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowLeft") onPrev();
      else if (event.key === "ArrowRight") onNext();
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose, onPrev, onNext]);

  const screen = activeIndex === null ? null : tourScreens[activeIndex];

  return (
    <AnimatePresence>
      {isOpen && screen ? (
        <motion.div
          className="tour-detail fixed inset-0 z-[70] flex items-center justify-center px-4 py-16 sm:px-8"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: 0.26, ease: "easeOut" }}
          role="dialog"
          aria-modal="true"
          aria-label={screen.title}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Zavrieť"
            className="tour-detail-close absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full transition sm:right-8 sm:top-8"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>

          <motion.div
            key={activeIndex}
            onClick={(event) => event.stopPropagation()}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.12fr_1fr] lg:gap-16"
          >
            <div className="order-2 lg:order-1">
              <BrowserFrame
                image={screen.image}
                alt={screen.alt}
                label="Tap-it admin"
                sizes="(min-width: 1024px) 640px, 92vw"
              />
            </div>

            <div className="order-1 lg:order-2">
              <p className="tour-detail-eyebrow text-xs font-bold uppercase tracking-[0.32em]">
                Tap-it admin — {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(tourScreens.length).padStart(2, "0")}
              </p>
              <h2 className="tour-detail-title mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                {screen.title}
              </h2>
              <p className="tour-detail-body mt-5 max-w-md text-base leading-7 sm:text-lg">
                {screen.body}
              </p>

              <div className="tour-detail-rule mt-8 h-px w-full" />

              <div className="mt-6 flex items-center gap-8">
                <button
                  type="button"
                  onClick={onPrev}
                  className="tour-detail-nav group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] transition"
                >
                  <ArrowLeft
                    aria-hidden="true"
                    className="h-4 w-4 transition group-hover:-translate-x-1"
                  />
                  Späť
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  className="tour-detail-nav group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] transition"
                >
                  Ďalej
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
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
    <section id="preco" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-3xl"
        >
          <motion.p variants={revealItem} className="section-kicker">
            Prečo Tap-it
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-4 text-4xl font-black leading-none tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Nie ďalší modulový balík. Prevádzkový systém na mieru.
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-5 max-w-2xl text-base leading-7 text-slate-400"
          >
            Majiteľ fitka nepotrebuje ďalší zoznam funkcií. Potrebuje systém,
            ktorý rešpektuje recepciu, členov, výnimky a reálne tempo
            prevádzky.
          </motion.p>
        </motion.div>

        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid gap-8 md:grid-cols-2 md:gap-6 xl:grid-cols-4 xl:gap-4"
        >
          {valueCards.map((card) => {
            const Icon = card.icon;

            return (
              <div key={card.title} className="h-full">
                <motion.article
                  variants={revealItem}
                  className="group h-full rounded-3xl border border-white/10 bg-surface p-6 transition hover:border-accent/40 hover:bg-raised"
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
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function BoxVsTapitSection() {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:pb-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-8 max-w-4xl"
        >
          <motion.p variants={revealItem} className="section-kicker">
            Prečo nie krabica
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-4 text-4xl font-black leading-none tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Rozdiel nie je v počte modulov. Rozdiel je v tom, kto sa komu
            prispôsobuje.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative grid overflow-hidden rounded-[2rem] border border-white/15 bg-base/[0.96] shadow-float lg:grid-cols-2"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-accent-deep/25"
          />
          {comparisonColumns.map((column, index) => {
            const Icon = column.icon;
            const isTapit = index === 1;

            return (
              <div key={column.title} className="min-h-full">
                <motion.article
                  variants={revealItem}
                  className={`relative min-h-full p-6 sm:p-8 lg:p-10 ${
                    isTapit
                      ? "bg-gradient-to-br from-accent-deep/60 via-accent-deep/40 to-base/[0.88]"
                      : "border-b border-white/15 bg-gradient-to-br from-surface/80 via-base/[0.72] to-base/[0.92] lg:border-b-0 lg:border-r"
                  }`}
                >
                  {isTapit ? (
                    <div
                      aria-hidden="true"
                      className="absolute inset-y-8 left-0 hidden w-px bg-gradient-to-b from-transparent via-accent-soft/80 to-transparent lg:block"
                    />
                  ) : null}
                  <div className="relative flex min-h-full flex-col">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <span className="inline-flex rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-white/70">
                          {column.badge}
                        </span>
                        <h3 className="mt-5 text-4xl font-black tracking-tight text-white/95 sm:text-5xl">
                          {column.title}
                        </h3>
                      </div>
                      <span
                        className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${
                          isTapit
                            ? "bg-accent text-white shadow-brand"
                            : "border border-white/15 bg-white/[0.08] text-white/75"
                        }`}
                      >
                        <Icon aria-hidden="true" className="h-6 w-6" />
                      </span>
                    </div>

                    <p className="mt-5 max-w-xl text-base font-semibold leading-8 !text-white/80">
                      {column.text}
                    </p>

                    <div className="mt-8 grid gap-3">
                      {column.points.map((point, pointIndex) => (
                        <div
                          key={point}
                          className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/[0.07] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                        >
                          <span
                            className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full ${
                              isTapit
                                ? "bg-accent text-white"
                                : "border border-white/15 bg-white/[0.08] text-white/70"
                            }`}
                          >
                            <Check aria-hidden="true" className="h-3.5 w-3.5" />
                          </span>
                          <p className="text-sm font-black leading-6 text-white/90">
                            {point}
                          </p>
                          <span className="ml-auto pt-1 text-xs font-black text-white/30">
                            {String(pointIndex + 1).padStart(2, "0")}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div
                      className={`mt-8 rounded-3xl border p-5 ${
                        isTapit
                          ? "border-accent/40 bg-accent/20"
                          : "border-white/15 bg-white/[0.05]"
                      }`}
                    >
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-white/50">
                        Pointa
                      </p>
                      <p className="mt-2 text-base font-black leading-7 text-white/90">
                        {column.outcome}
                      </p>
                    </div>
                  </div>
                </motion.article>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function AuditSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="lg:self-stretch">
          <div className="lg:sticky lg:top-28">
            <motion.div
              variants={revealContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.p variants={revealItem} className="section-kicker">
                Prevádzkový audit
              </motion.p>
              <motion.h2
                variants={revealItem}
                className="mt-4 max-w-xl text-4xl font-black leading-none tracking-tight text-white sm:text-5xl"
              >
                Softvér navrhujeme až po tom, čo pochopíme realitu gymu.
              </motion.h2>
              <motion.p
                variants={revealItem}
                className="mt-5 max-w-xl text-base leading-7 text-slate-300"
              >
                Audit nie je formalita pred cenovou ponukou. Je to mapa, ktorá
                rozhodne, čo má ísť do pilotu a čo by bolo len drahé
                rozptýlenie.
              </motion.p>
              <motion.div
                variants={revealItem}
                className="relative mt-8 overflow-hidden rounded-3xl border border-accent/30 bg-accent-faint/45 p-5 shadow-[0_24px_80px_rgba(62,99,221,0.12)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-accent-bright"
                />
                <p className="text-xs font-black uppercase tracking-[0.16em] text-accent-soft">
                  Výstup auditu
                </p>
                <p className="mt-3 text-lg font-black leading-7 text-white">
                  Mapa modulov, priorít, rizík a pilotného rozsahu pre prvé
                  nasadenie.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-7 sm:grid-cols-2"
        >
          {auditSteps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.title} className="h-full">
                <motion.article
                  variants={revealItem}
                  className="h-full rounded-3xl border border-white/10 bg-surface p-5 transition hover:border-accent/35 hover:bg-raised"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent-faint text-accent-soft">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 text-xl font-black tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-400">
                    {step.text}
                  </p>
                </motion.article>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function MigrationHardwareSection() {
  return (
    <section id="prechod" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-4xl"
        >
          <motion.h2
            variants={revealItem}
            className="text-4xl font-black leading-none tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Prechod z iného systému bez toho, aby recepcia horela.
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-5 max-w-2xl text-base leading-7 text-slate-400"
          >
            Nerobíme iba nové prihlasovanie. Riešime dáta, členstvá, tím,
            členov, skenery, turnikety a ostré prepnutie prevádzky.
          </motion.p>
        </motion.div>

        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative mt-12 overflow-hidden rounded-[2rem] border border-white/15 bg-base/[0.96] p-4 shadow-float sm:p-6 lg:p-8"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-accent-deep/30"
          />

          <div className="relative grid gap-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch lg:gap-4">
            {migrationSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.title} className="contents">
                  <div className="min-h-full">
                    <motion.article
                      variants={revealItem}
                      className={`h-full rounded-3xl border p-5 ${
                        index === 1
                          ? "border-accent/40 bg-accent/20"
                          : "border-white/15 bg-white/[0.06]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span
                          className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${
                            index === 1
                              ? "bg-accent text-white shadow-brand"
                              : "border border-white/15 bg-white/[0.08] text-white/75"
                          }`}
                        >
                          <Icon aria-hidden="true" className="h-5 w-5" />
                        </span>
                        <span className="pt-1 text-xs font-black text-white/30">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="mt-6 text-2xl font-black tracking-tight !text-white">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm font-semibold leading-6 !text-white/70">
                        {step.text}
                      </p>
                    </motion.article>
                  </div>

                  {index < migrationSteps.length - 1 ? (
                    <div className="hidden items-center justify-center lg:flex">
                      <span className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white/50">
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </span>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="relative mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-4">
            <div className="h-full">
              <motion.div
                variants={revealItem}
                className="h-full rounded-3xl border border-white/15 bg-white/[0.05] p-5"
              >
                <h3 className="text-2xl font-black tracking-tight !text-white">
                  Hardvér na kľúč.
                </h3>
                <p className="mt-3 text-sm font-semibold leading-6 !text-white/70">
                  Turniket alebo skener nie je doplnok na koniec. Je to súčasť
                  vstupného procesu, ktorý musí sedieť členovi aj recepcii.
                </p>
                <div className="mt-6 grid gap-3">
                  {hardwareItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="flex gap-4 rounded-2xl border border-white/10 bg-base/[0.55] p-4"
                      >
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-faint text-accent-soft">
                          <Icon aria-hidden="true" className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-sm font-black !text-white/90">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs font-semibold leading-5 !text-white/60">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            <div className="h-full">
              <motion.div
                variants={revealItem}
                className="h-full rounded-3xl border border-accent/30 bg-accent-deep/30 p-5"
              >
                <h3 className="text-2xl font-black tracking-tight !text-white">
                  Pred ostrým prepnutím musí byť jasno.
                </h3>
                <div className="mt-6 grid gap-3">
                  {cutoverChecks.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                    >
                      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-white">
                        <Check aria-hidden="true" className="h-4 w-4" />
                      </span>
                      <p className="text-sm font-black leading-6 !text-white/80">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function OperationsSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p variants={revealItem} className="section-kicker">
            Pred ostrou prevádzkou
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-4 max-w-2xl text-4xl font-black leading-none tracking-tight text-white sm:text-5xl"
          >
            Systém musí poznať výnimky skôr, než otvoríš dvere.
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-5 max-w-xl text-base leading-7 text-slate-400"
          >
            Vstup, členstvo a rezervácia znejú jednoducho. V realite
            rozhodujú výnimky, role a slabé miesta v každodennej prevádzke.
          </motion.p>
        </motion.div>

        <div>
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
      </div>
    </section>
  );
}

function PilotSection() {
  return (
    <section id="pilot" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end"
        >
          <div>
            <motion.p variants={revealItem} className="section-kicker">
              Prechod a pilotný štart
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="mt-4 max-w-2xl text-4xl font-black leading-none tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Najprv bezpečné prepnutie. Potom rozširovanie systému.
            </motion.h2>
          </div>
          <motion.p
            variants={revealItem}
            className="max-w-2xl text-base leading-7 text-slate-400 lg:justify-self-end"
          >
            Tento rámec nie je garancia bez výpadkov pre každý gym. Je to
            praktický spôsob, ako pripraviť dáta, hardvér, tím a členov pred
            ostrým štartom.
          </motion.p>
        </motion.div>

        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid gap-8 md:grid-cols-2 md:gap-6 xl:grid-cols-4 xl:gap-4"
        >
          {pilotWeeks.map((item, index) => (
            <div key={item.week} className="h-full">
              <motion.article
                variants={revealItem}
                className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-surface p-6 shadow-card"
              >
                <div
                  aria-hidden="true"
                  className="absolute right-5 top-5 font-display text-6xl font-semibold leading-none text-white/[0.04]"
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-accent-soft">
                  {item.week}
                </p>
                <h3 className="mt-5 text-2xl font-black tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm font-semibold leading-6 text-slate-400">
                  {item.text}
                </p>
              </motion.article>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProofSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-5"
        >
          <div className="h-full">
            <motion.article
              variants={revealItem}
              className="h-full rounded-[2rem] border border-white/10 bg-surface p-6 shadow-card sm:p-8 lg:p-10"
            >
              <p className="section-kicker">Čo už máme hotové</p>
              <h2 className="mt-4 text-4xl font-black leading-none tracking-tight text-white sm:text-5xl">
                Reálne obrazovky, nie sľub na papieri.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
                Tap-it je pilotný produkt a hlavná prípadová štúdia nášho tímu.
                Preto ukazujeme skutočný admin aj skutočnú mobilnú appku
                namiesto vymyslených referencií.
              </p>
              <div className="mt-8 grid gap-3">
                {proofItems.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-white">
                      <Check aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-bold leading-6 text-slate-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.article>
          </div>

          <div className="h-full">
            <motion.article
              variants={revealItem}
              className="h-full rounded-[2rem] border border-white/10 bg-base/[0.72] p-6 sm:p-8 lg:p-10"
            >
              <p className="section-kicker">Čo testujeme ďalej</p>
              <h3 className="mt-4 text-3xl font-black leading-none tracking-tight text-white sm:text-4xl">
                Plán bez divadla.
              </h3>
              <p className="mt-5 text-base leading-7 text-slate-400">
                Nechceme sľubovať všetko naraz. Testujeme veci, ktoré rozhodujú
                o tom, či systém prežije bežný deň v reálnom gyme.
              </p>
              <div className="mt-8 grid gap-3">
                {nextItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/5 bg-surface p-4 text-sm font-bold leading-6 text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.article>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MobilePreviewSection() {
  return <AppRoadmapSection />;
}

function AppRoadmapSection() {
  return (
    <section
      id="appka"
      className="app-showcase-section bg-surface px-4 py-20 sm:px-6 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-3xl"
        >
          <motion.div
            variants={revealItem}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-base/[0.7] px-3 py-1.5 text-xs font-bold text-slate-300"
          >
            <Smartphone aria-hidden="true" className="h-4 w-4 text-accent-soft" />
            Mobilná aplikácia
          </motion.div>
          <motion.h2
            variants={revealItem}
            className="mt-5 text-4xl font-black leading-none tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Celá cesta člena, obrazovka po obrazovke.
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-5 max-w-xl text-base leading-7 text-slate-400"
          >
            Roadmapa mobilnej aplikácie Tap-it — od prvého spustenia cez
            rezervácie a QR vstup až po podporu a dokumenty, v poradí, v akom
            ich člen zažije.
          </motion.p>
        </motion.div>

        <div className="roadmap relative mt-16 lg:mt-20">
          <span aria-hidden="true" className="roadmap-spine" />
          <div className="flex flex-col gap-16 sm:gap-20 lg:gap-0">
            {appScreens.map((screen, index) => (
              <RoadmapStop
                key={screen.label}
                screen={screen}
                index={index}
                total={appScreens.length}
                priority={index === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RoadmapStop({
  screen,
  index,
  total,
  priority,
}: {
  screen: AppScreen;
  index: number;
  total: number;
  priority: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const phoneLeft = index % 2 === 0;
  const number = String(index + 1).padStart(2, "0");
  const totalLabel = String(total).padStart(2, "0");

  return (
    <div className="roadmap-stop relative grid grid-cols-1 items-center gap-x-12 gap-y-6 pl-12 sm:gap-y-7 lg:grid-cols-2 lg:gap-x-24 lg:py-14 lg:pl-0">
      <span aria-hidden="true" className="roadmap-node" />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className={`order-2 flex justify-center ${
          phoneLeft
            ? "lg:order-1 lg:justify-end"
            : "lg:order-2 lg:justify-start"
        }`}
      >
        <div
          data-side={phoneLeft ? "left" : "right"}
          className="roadmap-phone w-[min(56vw,24svh,14rem)] lg:w-[clamp(16rem,20vw,21.5rem)]"
        >
          <StaticAppPhoneShot screen={screen} priority={priority} />
        </div>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
        className={`order-1 ${
          phoneLeft ? "lg:order-2" : "lg:order-1 lg:text-right"
        }`}
      >
        <div className={`lg:max-w-md ${phoneLeft ? "" : "lg:ml-auto"}`}>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-soft">
            <span className="tabular-nums text-white">{number}</span>
            <span className="mx-1.5 text-slate-500">/</span>
            <span className="tabular-nums text-slate-500">{totalLabel}</span>
            <span className="ml-3">{screen.label}</span>
          </p>
          <h3 className="mt-3 text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl">
            {screen.title}
          </h3>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-400 sm:text-base sm:leading-7">
            {screen.body}
          </p>
          <ul className="mt-5 grid gap-2.5">
            {screen.features.map((feature) => (
              <li
                key={feature}
                className={`flex items-start gap-3 ${
                  phoneLeft ? "" : "lg:flex-row-reverse lg:text-right"
                }`}
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-faint text-accent-soft">
                  <Check aria-hidden="true" className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-semibold leading-6 text-slate-300">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}


function StaticAppPhoneShot({
  screen,
  priority = false,
}: {
  screen: AppScreen;
  priority?: boolean;
}) {
  return (
    <figure className="member-phone-frame">
      <div aria-hidden="true" className="member-phone-speaker" />
      <div className="member-phone-screen">
        <Image
          src={screen.image}
          alt={screen.alt}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 240px, (min-width: 768px) 34vw, 74vw"
          className="select-none object-cover"
        />
      </div>
    </figure>
  );
}

function SeoAnswersSection() {
  return (
    <section id="otazky" className="bg-surface px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="lg:self-stretch">
          <div className="lg:sticky lg:top-28">
            <motion.div
              variants={revealContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.p variants={revealItem} className="section-kicker">
                Otázky majiteľov fitiek
              </motion.p>
              <motion.h2
                variants={revealItem}
                className="mt-4 max-w-2xl text-4xl font-black leading-none tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                Keď hľadáš systém pre fitko, najprv potrebuješ jasné odpovede.
              </motion.h2>
              <motion.p
                variants={revealItem}
                className="mt-5 max-w-xl text-base leading-7 text-slate-400"
              >
                Softvér pre fitness centrum nie je len zoznam modulov. Pred
                rozhodnutím treba vedieť, ako sa vyrieši vstup, migrácia dát,
                členstvá, recepcia, hardvér a každodenné výnimky.
              </motion.p>
              <motion.div
                variants={revealItem}
                className="relative mt-8 overflow-hidden rounded-3xl border border-accent/30 bg-accent-faint/45 p-5 shadow-[0_24px_80px_rgba(62,99,221,0.12)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-accent-bright"
                />
                <p className="text-xs font-black uppercase tracking-[0.16em] text-accent-soft">
                  Pre rýchlu odpoveď
                </p>
                <p className="mt-3 text-lg font-black leading-7 text-white">
                  Tap-it je systém pre fitká, ktoré riešia QR vstup,
                  členstvá, rezervácie, hardvér a migráciu dát naraz.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-4"
        >
          {fitnessFaqItems.map((item, index) => (
            <motion.article
              key={item.question}
              variants={revealItem}
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
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [projectType, setProjectType] = useState<ProjectType>(projectTypes[0]);
  const [submitStatus, setSubmitStatus] =
    useState<ContactSubmitStatus>("idle");
  const [submitError, setSubmitError] = useState("");

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setSubmitStatus("submitting");
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message ?? "Mail sa nepodarilo odoslať. Skús to prosím znova.",
        );
      }

      form.reset();
      setProjectType(projectTypes[0]);
      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Mail sa nepodarilo odoslať. Skús to prosím znova.",
      );
    }
  }

  return (
    <section
      id="kontakt"
      className="contact-transition-section px-4 py-20 sm:px-6 lg:py-28"
    >
      <div>
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
              <p className="section-kicker">Prechod alebo demo</p>
              <h2 className="mt-4 max-w-xl text-4xl font-black leading-none tracking-tight text-white sm:text-5xl">
                Začnime prechodom bez chaosu.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-slate-400">
                Napíš, z čoho dnes prechádzaš, aký hardvér riešiš a čo nesmie
                počas prepnutia spadnúť. Ozveme sa s návrhom auditu.
              </p>

              <div className="mt-8 grid gap-3">
                {[
                  "Kompletný prechod z aktuálneho riešenia",
                  "Turnikety, QR skenery a záložný postup recepcie",
                  "Bez newslettera. Len odpoveď k Tap-it prechodu",
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

            {submitStatus === "success" ? (
              <div className="flex min-h-[360px] flex-col items-start justify-center rounded-3xl border border-white/10 bg-base/[0.7] p-8">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-white shadow-brand">
                  <Check aria-hidden="true" className="h-7 w-7" />
                </span>
                <p className="mt-6 text-3xl font-black leading-tight text-white">
                  Super, dopyt odišiel.
                </p>
                <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">
                  Správa je odoslaná na Tap-it e-mail. Ozveme sa s návrhom
                  auditu alebo ďalším krokom.
                </p>
              </div>
            ) : (
              <form onSubmit={submitInquiry} className="grid content-start gap-7">
                <input
                  aria-hidden="true"
                  autoComplete="off"
                  className="hidden"
                  name="company"
                  tabIndex={-1}
                  type="text"
                />
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
                    placeholder="Z akého systému prechádzate, koľko máte členov, aký vstup alebo hardvér riešite a čo musí pri prepnutí fungovať?"
                    rows={5}
                  />
                </label>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    className="primary-button w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    disabled={submitStatus === "submitting"}
                    type="submit"
                  >
                    {submitStatus === "submitting"
                      ? "Odosielam..."
                      : "Odoslať prechod"}
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </button>
                  <p className="text-center text-xs font-semibold text-slate-500 sm:text-right">
                    Bez newslettera. Len odpoveď k Tap-it prechodu.
                  </p>
                </div>
                {submitStatus === "error" ? (
                  <p
                    className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200"
                    role="alert"
                  >
                    {submitError}
                  </p>
                ) : null}
              </form>
            )}
          </div>
        </motion.div>
      </div>
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
            Fitness OS navrhnutý podľa reality prevádzky. QR vstupy,
            migrácia, turnikety, skenery, admin panel a mobilná appka bez
            krabicového myslenia.
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
    ["Prečo Tap-it", "#preco"],
    ["Prechod", "#prechod"],
    ["Appka", "#appka"],
    ["Kontakt", "#kontakt"],
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
              Fitness OS navrhnutý podľa reality prevádzky. QR vstupy,
              migrácia, turnikety, skenery, admin panel a mobilná appka bez
              krabicového myslenia.
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
                Tap-it prechod
                <br />
                Slovensko / online
              </span>
            </a>
            <a href="#kontakt" className="footer-contact-row">
              <Phone aria-hidden="true" className="h-4 w-4" />
              <span>Prechod alebo ukážka</span>
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
