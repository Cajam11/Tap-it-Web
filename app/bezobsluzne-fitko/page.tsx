import type { Metadata } from "next";
import {
  Activity,
  Bell,
  Check,
  Clock,
  CreditCard,
  DoorOpen,
  ScanLine,
  X,
} from "lucide-react";

import { JsonLd } from "../components/json-ld";
import {
  CardGrid,
  CheckList,
  FaqSection,
  HeroSheet,
  NumberedSteps,
  PageHero,
  PageSection,
  Prose,
  RelatedPages,
  SheetRow,
  SheetTag,
  SubPage,
} from "../components/page-chrome";
import { pageMetadata, pageStructuredData } from "../seo-content";
import { bezobsluzneSeo } from "../site-pages";

export const metadata: Metadata = pageMetadata(bezobsluzneSeo);

/**
 * The hero sheet: a modelled night, not a record of one. No gym is live yet, so
 * the log is labelled as a model — what it shows is the mechanism, including
 * the refusal, which is the entry nobody else puts on a marketing page.
 */
const nightLog: {
  time: string;
  event: string;
  state: string;
  note?: string;
}[] = [
  {
    time: "02:41",
    event: "QR token overený, členstvo platné",
    state: "Vstup",
  },
  {
    time: "03:12",
    event: "Členstvo exspirovalo o 4 dni skôr",
    state: "Zamietnuté",
    note: "Dôvod aj postup obnovy odoslaný do appky člena.",
  },
  {
    time: "04:58",
    event: "QR token overený, členstvo platné",
    state: "Vstup",
  },
];

const entryChain = [
  {
    title: "QR token člena",
    text: "Člen otvorí appku a načíta QR kartu. Token je viazaný na jeho účet, takže vstup nie je anonymné otvorenie dverí, ale konkrétne overenie konkrétneho človeka.",
  },
  {
    title: "Kontrola platného členstva",
    text: "Systém overí, či členstvo platí, či nie je zmrazené, či nejde o jednorazový vstup a či člen spĺňa pravidlá pre daný čas a vchod.",
  },
  {
    title: "Otvorenie turniketu",
    text: "Pri úspešnom overení sa turniket otvorí na jeden priechod. Pri zamietnutí dostane člen dôvod v appke — nie zavreté dvere bez vysvetlenia.",
  },
  {
    title: "Zápis do scan logu",
    text: "Každé overenie, úspešné aj zamietnuté, sa zapíše s časom a členom. Vstupy sú spätne dohľadateľné aj vtedy, keď pri nich nikto nebol.",
  },
];

const failureScenarios = [
  {
    title: "Výpadok internetu",
    text: "Prevádzka bez recepcie nemá koho sa opýtať, takže pravidlo musí byť rozhodnuté dopredu: čo sa stane s overením, čo s turniketom a čo uvidí člen. Toto je jedna z otázok, ktoré prechádzame pri audite.",
    icon: Activity,
  },
  {
    title: "Nefunkčný turniket alebo skener",
    text: "Definujeme náhradný postup pre člena a spôsob, akým sa o probléme dozvie majiteľ. Bez toho sa porucha o druhej v noci prejaví až ráno na telefóne.",
    icon: ScanLine,
  },
  {
    title: "Chyba platby alebo expirované členstvo",
    text: "Členovi má byť jasné, prečo ho systém nepustil a čo s tým môže urobiť hneď z appky. Väčšina nočných konfliktov vzniká z toho, že dôvod zamietnutia nikto nevysvetlí.",
    icon: CreditCard,
  },
  {
    title: "Vstup mimo pravidiel",
    text: "Zabudnutý telefón, člen s platným členstvom bez prístupu k appke, návšteva. Aj pre tieto prípady musí existovať postup, inak si ho tím vymyslí sám.",
    icon: DoorOpen,
  },
];

const hybridPoints = [
  "Denný režim s recepciou, ktorá rieši výnimky, predaje a nových členov",
  "Nočný a víkendový režim výhradne na pravidlách systému",
  "Rozdielne pravidlá vstupu pre rôzne časy a vchody",
  "Oznamy a notifikácie pre členov mimo otváracích hodín",
  "Prehľad nočných vstupov v admin paneli ráno",
  "Jasná hranica medzi tým, čo rieši systém a čo človek",
];

const decidedUpfront = [
  "Kto môže vstúpiť, kedy a s akým členstvom",
  "Čo sa stane pri zamietnutí a čo o tom uvidí člen",
  "Ako sa rieši vstup bez telefónu alebo s vybitou batériou",
  "Kto dostane upozornenie pri poruche hardvéru",
  "Ako sa spätne dohľadá konkrétny vstup",
  "Čo platí pri výpadku internetu na strane gymu",
];

export default function BezobsluzneFitkoPage() {
  return (
    <SubPage>
      <JsonLd data={pageStructuredData(bezobsluzneSeo)} />

      <PageHero
        breadcrumb={bezobsluzneSeo.breadcrumb}
        kicker="Bezobslužné a nonstop fitká"
        title={<>Keď pri dverách nikto nestojí, rozhoduje systém.</>}
        lead="V bezobslužnom a nonstop (24/7) fitku stojí vstup celý na pravidlách: QR token člena, kontrola platného členstva, otvorenie turniketu a scan log. Nie je tu recepčná, ktorá by výnimku vyriešila pohľadom — preto musí byť každý scenár rozhodnutý dopredu."
        points={[
          "Vstup viazaný na konkrétneho člena, nie na kód",
          "Scan log pre spätnú dohľadateľnosť",
          "Výpadkové scenáre riešené pri návrhu",
          "Hybridný režim s recepciou časť dňa",
        ]}
        mediaSize="sheet"
        media={
          <HeroSheet
            label="Scan log"
            meta="modelová noc"
            caption="Nikto pri dverách nestál. Rozhodlo pravidlo, člen dostal dôvod a ráno je celá noc dohľadateľná v admin paneli."
            footer={
              <>
                <span className="text-sm font-black tracking-tight text-white">
                  Ráno v admin paneli
                </span>
                <span className="font-display text-base italic text-accent-soft">
                  2 vstupy · 1 zamietnutie
                </span>
              </>
            }
          >
            {nightLog.map((entry) => {
              const allowed = entry.state === "Vstup";

              return (
                <SheetRow key={entry.time}>
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                    <span className="flex min-w-0 items-baseline gap-3">
                      <span className="font-display text-sm font-semibold tabular-nums text-slate-400">
                        {entry.time}
                      </span>
                      <span className="text-sm font-black tracking-tight text-white">
                        {entry.event}
                      </span>
                    </span>
                    <SheetTag
                      icon={allowed ? Check : X}
                      tone={allowed ? "muted" : "accent"}
                    >
                      {entry.state}
                    </SheetTag>
                  </div>
                  {entry.note ? (
                    <p className="mt-1.5 pl-12 text-xs font-semibold leading-6 text-slate-400">
                      {entry.note}
                    </p>
                  ) : null}
                </SheetRow>
              );
            })}
          </HeroSheet>
        }
      />

      <PageSection
        kicker="Čo sa mení"
        title="Bezobslužná prevádzka nie je fitko bez recepcie. Je to fitko, kde pravidlá musia byť úplné."
        tone="surface"
      >
        <Prose>
          <p>
            V obsluhovanom gyme je systém pomôcka. Keď niečo nesedí, recepčná
            rozhodne — pustí známu tvár, ručne predĺži členstvo, zavolá
            majiteľovi. Tie zásahy nikde nevidno, ale držia prevádzku
            pohromade a zakrývajú všetky diery v pravidlách.
          </p>
          <p>
            <strong>
              V bezobslužnej prevádzke tie zásahy zmiznú a diery zostanú.
            </strong>{" "}
            Každý prípad, ktorý dovtedy riešil človek, sa musí stať pravidlom:
            čo s expirovaným členstvom o polnoci, čo s členom bez telefónu, čo
            keď turniket nereaguje. Nerozhodnuté pravidlo sa v nonstop režime
            neprejaví ako nepríjemnosť, ale ako člen stojaci pred zatvorenými
            dverami bez toho, aby mal komu zavolať.
          </p>
          <p>
            Preto pri audite bezobslužných prevádzok trávime najviac času na
            výnimkách a výpadkoch, nie na funkciách. Zoznam funkcií vyzerá
            rovnako u každého dodávateľa. Rozdiel je v tom, či niekto prešiel s
            tebou aj scenáre, ktoré nastanú raz za mesiac o tretej v noci.
          </p>
        </Prose>
      </PageSection>

      <PageSection
        kicker="Vstupný reťazec"
        title="Čo sa stane medzi appkou a turniketom."
      >
        <NumberedSteps items={entryChain} />
      </PageSection>

      <PageSection
        kicker="Výpadkové scenáre"
        title="Štyri situácie, ktoré musia mať odpoveď pred spustením."
        lead="Vstupný hardvér berieme ako súčasť systému, nie ako doplnok na koniec — a to platí aj pre to, čo sa stane, keď zlyhá."
        tone="surface"
      >
        <CardGrid items={failureScenarios} columns={2} />
      </PageSection>

      <PageSection
        kicker="Hybridný režim"
        title="Recepcia časť dňa, systém zvyšok."
        lead="V praxi najčastejší variant: cez deň obsluhovaná prevádzka, mimo otváracích hodín vstup výhradne na pravidlách. Oba režimy nastavujeme naraz, aby sa neprekrývali ani nevytvárali diery."
      >
        <CheckList items={hybridPoints} />
      </PageSection>

      <PageSection
        kicker="Pred spustením"
        title="Čo musí byť rozhodnuté dopredu."
        tone="surface"
      >
        <CheckList items={decidedUpfront} />
      </PageSection>

      <FaqSection items={bezobsluzneSeo.faq} />

      <RelatedPages
        items={[
          {
            title: "Prechod z iného systému",
            text: "Ako prepnúť prevádzku, ktorá nemá kedy zavrieť.",
            href: "/migracia",
          },
          {
            title: "Ako určujeme cenu",
            text: "Počet vstupov, turniketov a výnimiek patrí medzi hlavné faktory ceny.",
            href: "/cena",
          },
          {
            title: "Produkt a ukážky",
            text: "Scan logy, členstvá a admin panel na reálnych obrazovkách.",
            href: "/produkt",
          },
        ]}
      />
    </SubPage>
  );
}
