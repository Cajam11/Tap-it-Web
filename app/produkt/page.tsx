import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import { Linkedin } from "lucide-react";

import { JsonLd } from "../components/json-ld";
import {
  FaqSection,
  PageHero,
  PageSection,
  Prose,
  RelatedPages,
  SubPage,
} from "../components/page-chrome";
import { pageMetadata, pageStructuredData } from "../seo-content";
import { produktSeo } from "../site-pages";

import filipFounder from "../../founders/Filip_Paučo.jpg";
import patrikFounder from "../../founders/Patrik_Repkovský.jpg";
import analyticsScreen from "../../screenshots/web/Analytics.png";
import bookingsScreen from "../../screenshots/web/Bookings.png";
import dashboardScreen from "../../screenshots/web/Dashboard.png";
import membershipsScreen from "../../screenshots/web/Memberships.png";
import webNewsScreen from "../../screenshots/web/News.png";
import priestoryScreen from "../../screenshots/web/Priestory.png";
import scanLogsScreen from "../../screenshots/web/Scan_Logs.png";
import smenyScreen from "../../screenshots/web/Smeny.png";
import usersScreen from "../../screenshots/web/User_Management.png";
import verificationScreen from "../../screenshots/web/Verification.png";
import appBookScreen from "../../screenshots/app/Book.jpeg";
import appHelpScreen from "../../screenshots/app/Help.jpeg";
import appHomeScreen from "../../screenshots/app/Home.jpeg";
import appNewsScreen from "../../screenshots/app/News.jpeg";
import appProfileScreen from "../../screenshots/app/Profile.jpeg";
import appProfileMenuScreen from "../../screenshots/app/Profilemenu.jpeg";
import appQrScreen from "../../screenshots/app/QRcode.jpeg";
import appSettingsScreen from "../../screenshots/app/Settings.jpeg";
import appStatsScreen from "../../screenshots/app/Stats.jpeg";
import appTransactionsScreen from "../../screenshots/app/Transactions.jpeg";
import appTermsScreen from "../../screenshots/app/VOP.jpeg";

export const metadata: Metadata = pageMetadata(produktSeo);

type Shot = {
  image: StaticImageData;
  title: string;
  text: string;
  alt: string;
};

const adminShots: Shot[] = [
  {
    image: dashboardScreen,
    title: "Prehľad pre majiteľa",
    text: "Živý prehľad vstupov, členstiev a diania v gyme na jednej obrazovke.",
    alt: "Admin panel Tap-it Fitness OS — prehľadový dashboard pre majiteľa fitness centra",
  },
  {
    image: scanLogsScreen,
    title: "Scan logy",
    text: "Každé overenie s časom a členom — úspešné aj zamietnuté, spätne dohľadateľné.",
    alt: "Scan logy vstupov do fitka so záznamom času a člena",
  },
  {
    image: membershipsScreen,
    title: "Členstvá a expirácie",
    text: "Mesačné, ročné, jednorazové vstupy, obnovy aj ručné zásahy na jednom mieste.",
    alt: "Správa členstiev a expirácií v admin paneli pre fitness centrum",
  },
  {
    image: usersScreen,
    title: "Správa členov a rolí",
    text: "Členovia, recepčné role a prístupové práva tímu bez zdieľaných hesiel.",
    alt: "Správa členov, rolí a prístupových práv v systéme pre fitko",
  },
  {
    image: verificationScreen,
    title: "Overovanie účtov",
    text: "Nové registrácie prechádzajú kontrolou skôr, než dostanú platný vstup.",
    alt: "Overovanie nových účtov členov fitness centra",
  },
  {
    image: bookingsScreen,
    title: "Rezervácie",
    text: "Termíny trénerov, skupinové lekcie, kapacity a pravidlá storna.",
    alt: "Rezervačný modul pre trénerov a skupinové lekcie vo fitku",
  },
  {
    image: priestoryScreen,
    title: "Priestory",
    text: "Sály, zóny a ich dostupnosť naviazaná priamo na rezervácie.",
    alt: "Správa priestorov a sál fitness centra",
  },
  {
    image: smenyScreen,
    title: "Smeny recepcie",
    text: "Kto má službu, kedy a s akými právami — vrátane zastupovania.",
    alt: "Plán smien recepcie vo fitness centre",
  },
  {
    image: analyticsScreen,
    title: "Analytika prevádzky",
    text: "Návštevnosť, trendy členstiev a vyťaženie v čase namiesto odhadov.",
    alt: "Analytika návštevnosti a členstiev fitness centra",
  },
  {
    image: webNewsScreen,
    title: "Oznamy",
    text: "Správy pre členov, ktoré sa zobrazia priamo v ich mobilnej appke.",
    alt: "Správa oznamov pre členov fitka v admin paneli",
  },
];

const appShots: Shot[] = [
  {
    image: appHomeScreen,
    title: "Domov",
    text: "Stav členstva, najbližšie rezervácie a oznamy hneď po otvorení.",
    alt: "Domovská obrazovka mobilnej appky pre členov fitka",
  },
  {
    image: appQrScreen,
    title: "QR karta",
    text: "Vstupný token viazaný na účet člena, nie zdieľateľný kód.",
    alt: "QR karta na vstup do fitka v mobilnej aplikácii",
  },
  {
    image: appBookScreen,
    title: "Rezervácie",
    text: "Termíny, kapacity a potvrdenie rezervácie bez cudzieho portálu.",
    alt: "Rezervácia tréningu v mobilnej appke pre fitko",
  },
  {
    image: appNewsScreen,
    title: "Oznamy",
    text: "Novinky z gymu tam, kde ich člen naozaj uvidí.",
    alt: "Oznamy fitness centra v mobilnej aplikácii",
  },
  {
    image: appProfileScreen,
    title: "Profil",
    text: "Údaje člena, jeho členstvo a jeho platnosť na jednom mieste.",
    alt: "Profil člena fitka v mobilnej aplikácii",
  },
  {
    image: appProfileMenuScreen,
    title: "Menu profilu",
    text: "Rýchly prístup k nastaveniam, platbám, podpore a dokumentom.",
    alt: "Menu profilu člena v mobilnej appke fitness centra",
  },
  {
    image: appTransactionsScreen,
    title: "Platby",
    text: "História platieb a stav predplatného bez volania na recepciu.",
    alt: "História platieb člena fitka v mobilnej aplikácii",
  },
  {
    image: appStatsScreen,
    title: "Štatistiky",
    text: "Prehľad návštev člena v čase — dôvod, prečo sa do appky vracia.",
    alt: "Štatistiky návštev člena fitness centra",
  },
  {
    image: appSettingsScreen,
    title: "Nastavenia",
    text: "Notifikácie a preferencie, ktoré si člen rieši sám.",
    alt: "Nastavenia mobilnej aplikácie pre členov fitka",
  },
  {
    image: appHelpScreen,
    title: "Podpora",
    text: "Zákaznícka podpora bez hľadania kontaktu po webe.",
    alt: "Zákaznícka podpora v mobilnej appke fitness centra",
  },
  {
    image: appTermsScreen,
    title: "Právne dokumenty",
    text: "VOP a prevádzkový poriadok dostupné priamo v appke.",
    alt: "Právne dokumenty a VOP v mobilnej aplikácii fitka",
  },
];

const founders = [
  {
    name: "Filip Paučo",
    role: "Co-founder / produkt",
    motto: "Produkt musí sedieť na to, ako gym reálne funguje.",
    text: "Vedie audity prevádzky a návrh rozsahu. Prechádza s tebou vstupy, členstvá, recepčné postupy a výnimky, z ktorých vyjde, čo má ísť do pilotu.",
    linkedin: "https://www.linkedin.com/in/filip-pau%C4%8Do/",
    image: filipFounder,
  },
  {
    name: "Patrik Repkovský",
    role: "Co-founder / technológia",
    motto: "Systém musí prežiť bežný deň, nie len demo.",
    text: "Zodpovedá za systém, migráciu dát a napojenie vstupného hardvéru. Rieši, aby prepnutie prebehlo ako bežná zmena, nie ako krízový deň.",
    linkedin: "https://www.linkedin.com/in/patrik-repkovsk%C3%BD/",
    image: patrikFounder,
  },
];

function AdminGallery({ shots }: { shots: Shot[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {shots.map((shot) => (
        <figure
          key={shot.title}
          className="overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-card"
        >
          <div className="border-b border-white/10 bg-base/[0.7] px-4 py-3">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            </div>
          </div>
          <Image
            src={shot.image}
            alt={shot.alt}
            sizes="(min-width: 1024px) 46vw, 92vw"
            className="h-auto w-full"
          />
          <figcaption className="border-t border-white/10 p-5">
            <h3 className="text-base font-black tracking-tight text-white">
              {shot.title}
            </h3>
            <p className="mt-2 text-sm font-semibold leading-7 text-slate-400">
              {shot.text}
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function AppGallery({ shots }: { shots: Shot[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {shots.map((shot) => (
        <figure key={shot.title}>
          <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-surface shadow-card">
            <Image
              src={shot.image}
              alt={shot.alt}
              sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, 45vw"
              className="h-auto w-full"
            />
          </div>
          <figcaption className="mt-4">
            <h3 className="text-sm font-black tracking-tight text-white">
              {shot.title}
            </h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-400">
              {shot.text}
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function ProduktPage() {
  return (
    <SubPage>
      <JsonLd data={pageStructuredData(produktSeo)} />

      <PageHero
        breadcrumb={produktSeo.breadcrumb}
        kicker="Produkt a ukážky"
        title={<>Reálne obrazovky, nie prezentácia.</>}
        lead="Všetko na tejto stránke je z bežiaceho systému — admin panel, ktorý používa recepcia a majiteľ, a mobilná appka, ktorú má člen vo vrecku. Žiadne nakreslené koncepty ani obrazovky, ktoré existujú len na weboch dodávateľov."
        points={[
          "Admin panel pre recepciu aj majiteľa",
          "Scan logy, členstvá, rezervácie a smeny",
          "Mobilná appka v prostredí tvojho gymu",
          "Naživo prejdeme všetko na bezplatnom audite",
        ]}
      />

      <PageSection
        kicker="Admin panel"
        title="Čo vidí recepcia a majiteľ."
        lead="Denná práca gymu na jednom mieste: vstupy, členstvá, ľudia, rezervácie a čísla, podľa ktorých sa dá rozhodovať."
        tone="surface"
      >
        <AdminGallery shots={adminShots} />
      </PageSection>

      <PageSection
        kicker="Mobilná appka"
        title="Čo má člen vo vrecku."
        lead="Člen nerieši cudzí portál. Vstup, členstvo, rezervácie, platby aj podporu vidí v prostredí tvojej značky."
      >
        <AppGallery shots={appShots} />
      </PageSection>

      <PageSection
        kicker="Kto to stavia"
        title="Dvaja ľudia, ktorých budeš mať na telefóne."
        lead="Tap-it nie je anonymná značka s podporným formulárom. Audit, migráciu aj prepnutie s tebou prejdú tí istí dvaja ľudia, ktorí systém stavajú."
        tone="surface"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {founders.map((founder) => (
            <article
              key={founder.name}
              className="rounded-3xl border border-white/10 bg-base/[0.72] p-6 shadow-card sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-raised">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </span>
                <div>
                  <h3 className="text-lg font-black tracking-tight text-white">
                    {founder.name}
                  </h3>
                  <p className="mt-1 text-[0.65rem] font-black uppercase tracking-[0.18em] text-accent-soft">
                    {founder.role}
                  </p>
                </div>
              </div>
              <p className="mt-6 text-base font-bold leading-7 text-white">
                „{founder.motto}“
              </p>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-400">
                {founder.text}
              </p>
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent-soft transition hover:text-white"
              >
                <Linkedin aria-hidden="true" className="h-4 w-4" />
                LinkedIn profil
              </a>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection kicker="Poznámka" title="Prečo tu zatiaľ nie sú referencie.">
        <Prose>
          <p>
            Sme pred prvým ostrým nasadením, takže by sme sem vedeli dať len
            logá, na ktoré nemáme nárok, alebo čísla, ktoré nemáme odkiaľ
            zobrať. <strong>Namiesto toho ukazujeme softvér.</strong> Obrazovky
            vyššie sú overiteľnejšie než zoznam klientov, ktorý si aj tak nikto
            neoverí.
          </p>
          <p>
            Keď prvé nasadenie pobeží a prevádzkovateľ bude súhlasiť, pribudne
            sem prípadová štúdia s reálnymi dátami z prevádzky. Do vtedy
            považuj za dôkaz to, čo si môžeš pozrieť sám — a na bezplatnom
            audite si to prejsť naživo.
          </p>
        </Prose>
      </PageSection>

      <FaqSection items={produktSeo.faq} />

      <RelatedPages
        items={[
          {
            title: "Ako určujeme cenu",
            text: "Čo hýbe cenou a prečo tu nenájdeš cenník s balíkmi.",
            href: "/cena",
          },
          {
            title: "Prechod z iného systému",
            text: "Ako sa tvoje dáta dostanú do admin panelu vyššie.",
            href: "/migracia",
          },
          {
            title: "Bezobslužné a nonstop fitká",
            text: "Ako ten istý systém funguje, keď pri dverách nikto nestojí.",
            href: "/bezobsluzne-fitko",
          },
        ]}
      />
    </SubPage>
  );
}
