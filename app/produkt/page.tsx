import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";

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

/**
 * The two admin screens that carry the argument. They run the full width of the
 * content column so the scan log rows and the KPI numbers are actually legible
 * — the whole page claims to show a running system, so at least the evidence it
 * leans on has to be readable rather than a thumbnail.
 */
const adminLeadShots: Shot[] = [
  {
    image: dashboardScreen,
    title: "Prehľad pre majiteľa",
    text: "Koľko ľudí je práve v gyme, predané členstvá za mesiac, priemer návštev a obnovy — plus živý zoznam posledných vstupov. Jedna obrazovka, ktorú majiteľ otvorí ráno.",
    alt: "Admin panel Tap-it Fitness OS — prehľadový dashboard pre majiteľa fitness centra",
  },
  {
    image: scanLogsScreen,
    title: "Scan logy",
    text: "Každé priloženie QR kódu s časom, menom a smerom prechodu. Úspešné aj zamietnuté, spätne dohľadateľné — toto je odpoveď na „kto tu včera večer bol“.",
    alt: "Scan logy vstupov do fitka so záznamom času a člena",
  },
];

/** The rest of the panel, shown as an index of scope rather than as evidence. */
const adminIndexShots: Shot[] = [
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

/** The one member screen the whole product hangs on. */
const appLeadShot: Shot = {
  image: appQrScreen,
  title: "QR karta",
  text: "Vstupný token viazaný na účet člena, nie zdieľateľný kód.",
  alt: "QR karta na vstup do fitka v mobilnej aplikácii",
};

/**
 * The member screens, grouped by what the member is doing rather than listed
 * flat: ten equal tiles read as a spec sheet, and the grouping is what carries
 * the actual argument — the app exists so nobody has to ask at the reception.
 */
const appGroups: { title: string; lead: string; shots: Shot[] }[] = [
  {
    title: "Čo otvorí pri každej návšteve.",
    lead: "Stav členstva, najbližší tréning a novinky z gymu na jednej obrazovke.",
    shots: [
      {
        image: appHomeScreen,
        title: "Domov",
        text: "Stav členstva, najbližšie rezervácie a oznamy hneď po otvorení.",
        alt: "Domovská obrazovka mobilnej appky pre členov fitka",
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
        image: appStatsScreen,
        title: "Štatistiky",
        text: "Prehľad návštev člena v čase — dôvod, prečo sa do appky vracia.",
        alt: "Štatistiky návštev člena fitness centra",
      },
      {
        image: appProfileScreen,
        title: "Profil",
        text: "Údaje člena, jeho členstvo a jeho platnosť na jednom mieste.",
        alt: "Profil člena fitka v mobilnej aplikácii",
      },
    ],
  },
  {
    title: "Čo si vybaví bez recepcie.",
    lead: "Platby, nastavenia aj dokumenty si člen otvorí sám — aj keď je zavreté.",
    shots: [
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
    ],
  },
];

/**
 * Admin screenshots keep the dark frame in both themes (`.tour-tile-card`,
 * shared with the homepage tour): the panel itself is near-black, so a light
 * card wrapped around it in light mode reads as a rendering bug.
 */
function AdminShot({
  shot,
  sizes,
  rounding,
  priority = false,
}: {
  shot: Shot;
  sizes: string;
  rounding: string;
  priority?: boolean;
}) {
  return (
    <div className={`tour-tile-card relative overflow-hidden p-2 ${rounding}`}>
      <div className="overflow-hidden rounded-xl">
        <Image
          src={shot.image}
          alt={shot.alt}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full select-none"
        />
      </div>
    </div>
  );
}

/**
 * Member screenshots in the homepage's device frame, with the bezel, radius and
 * notch scaled off the frame's own width (`.phone-shot` is the query container)
 * rather than the viewport — these render anywhere from 8rem to 19rem wide.
 */
function PhoneShot({ shot, sizes }: { shot: Shot; sizes: string }) {
  return (
    <div className="phone-shot">
      <div className="member-phone-frame member-phone-frame--fluid">
        <div aria-hidden="true" className="member-phone-speaker" />
        <div className="member-phone-screen">
          <Image
            src={shot.image}
            alt={shot.alt}
            fill
            sizes={sizes}
            className="select-none object-cover"
          />
        </div>
      </div>
    </div>
  );
}

function ExhibitNumber({
  index,
  featured = false,
}: {
  index: number;
  featured?: boolean;
}) {
  return (
    <span
      className={`font-display tabular-nums ${
        featured
          ? "text-2xl font-semibold text-accent-soft"
          : "text-base font-semibold text-slate-400"
      }`}
    >
      {String(index).padStart(2, "0")}
    </span>
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
        media={
          <div className="relative">
            <AdminShot
              shot={adminLeadShots[0]}
              rounding="rounded-2xl sm:rounded-3xl"
              priority
              sizes="(min-width: 1280px) 700px, (min-width: 1024px) 44vw, 94vw"
            />
            {/* Repeated below at full size in the app gallery, so hiding the
                overlap on narrow screens costs nothing. */}
            <div className="pointer-events-none absolute -bottom-8 -left-8 hidden w-32 lg:block xl:w-36">
              <PhoneShot shot={appLeadShot} sizes="160px" />
            </div>
          </div>
        }
      />

      <PageSection
        kicker="Admin panel"
        title="Čo vidí recepcia a majiteľ."
        lead="Denná práca gymu na jednom mieste: vstupy, členstvá, ľudia, rezervácie a čísla, podľa ktorých sa dá rozhodovať."
      >
        <div className="grid gap-16 lg:gap-20">
          {adminLeadShots.map((shot, index) => (
            <figure key={shot.title}>
              <AdminShot
                shot={shot}
                rounding="rounded-2xl sm:rounded-3xl"
                sizes="(min-width: 1280px) 1240px, 94vw"
              />
              <figcaption className="mt-6 flex flex-col gap-x-8 gap-y-3 sm:flex-row sm:items-baseline">
                <span className="flex items-baseline gap-3 sm:w-52 sm:shrink-0">
                  <ExhibitNumber index={index + 1} featured />
                  <h3 className="text-lg font-black leading-tight tracking-tight text-white">
                    {shot.title}
                  </h3>
                </span>
                <p className="max-w-2xl text-sm font-semibold leading-7 text-slate-400">
                  {shot.text}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-20 border-t border-white/10 pt-6 text-sm font-semibold leading-7 text-slate-400">
          Ďalších osem obrazoviek z toho istého panelu. Na audite ich prejdeme
          naživo a v tvojich dátach.
        </p>

        <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2">
          {adminIndexShots.map((shot, index) => (
            <figure key={shot.title}>
              <AdminShot
                shot={shot}
                rounding="rounded-xl sm:rounded-2xl"
                sizes="(min-width: 1280px) 620px, (min-width: 640px) 46vw, 92vw"
              />
              <figcaption className="mt-4">
                <span className="flex items-baseline gap-3">
                  <ExhibitNumber index={index + 3} />
                  <h3 className="text-base font-black leading-tight tracking-tight text-white">
                    {shot.title}
                  </h3>
                </span>
                <p className="mt-2 text-sm font-semibold leading-7 text-slate-400">
                  {shot.text}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </PageSection>

      <PageSection
        kicker="Mobilná appka"
        title="Čo má člen vo vrecku."
        lead="Člen nerieši cudzí portál. Vstup, členstvo, rezervácie, platby aj podporu vidí v prostredí tvojej značky."
        tone="surface"
      >
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
          <figure className="mx-auto w-full max-w-[17rem] lg:mx-0 lg:max-w-[19rem]">
            <PhoneShot shot={appLeadShot} sizes="320px" />
          </figure>

          <div className="max-w-xl">
            <h3 className="text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl">
              Vstup je token, nie kód na screenshote.
            </h3>
            <p className="mt-5 text-base leading-8 text-slate-400">
              QR kód v appke sa prepíše každých 15 sekúnd a je viazaný na účet
              člena. Screenshot poslaný kamarátovi dvere neotvorí a v scan logu
              vidíš, kto naozaj prešiel.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-400">
              Zvyšok appky drží člena mimo recepcie: stav členstva, rezervácie,
              história platieb aj podpora sú v tom istom prostredí, takže sa na
              recepcii neriešia otázky, ktoré si vie zodpovedať sám.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-14 lg:mt-20 lg:gap-16">
          {appGroups.map((group) => (
            // min-w-0: as a grid item this would otherwise take its automatic
            // minimum size from the filmstrip's content width, growing the track
            // past the viewport so the rail has nothing left to scroll.
            <div key={group.title} className="min-w-0">
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-black leading-tight tracking-tight text-white sm:text-xl">
                  {group.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm font-semibold leading-7 text-slate-400">
                  {group.lead}
                </p>
              </div>

              {/* Below `sm` the five phones are a snap filmstrip: a 2-up grid at
                  375px puts them at ~155px, where the screens stop being
                  readable. Each card is 58vw so the next one peeks in and the
                  swipe is discoverable without a scrollbar. */}
              <div
                role="group"
                aria-label={group.title}
                tabIndex={0}
                className="hide-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft sm:mx-0 sm:grid sm:snap-none sm:grid-cols-3 sm:gap-x-5 sm:gap-y-9 sm:overflow-visible sm:px-0 lg:grid-cols-4 xl:grid-cols-5"
              >
                {group.shots.map((shot) => (
                  <figure
                    key={shot.title}
                    className="w-[58vw] max-w-[15rem] shrink-0 snap-start sm:w-auto sm:max-w-none sm:shrink"
                  >
                    <PhoneShot
                      shot={shot}
                      sizes="(min-width: 1024px) 240px, (min-width: 640px) 30vw, 58vw"
                    />
                    <figcaption className="mt-4">
                      <h4 className="text-sm font-black tracking-tight text-white">
                        {shot.title}
                      </h4>
                      <p className="mt-2 text-sm font-semibold leading-6 text-slate-400">
                        {shot.text}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection title="Prečo tu zatiaľ nie sú referencie.">
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
