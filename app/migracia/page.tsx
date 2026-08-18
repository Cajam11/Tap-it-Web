import type { Metadata } from "next";
import {
  BadgeCheck,
  CalendarDays,
  CreditCard,
  DoorOpen,
  MapPin,
  ScanLine,
  Users,
} from "lucide-react";

import { JsonLd } from "../components/json-ld";
import {
  CardGrid,
  CheckList,
  FaqSection,
  NumberedSteps,
  PageHero,
  PageSection,
  Prose,
  RelatedPages,
  SubPage,
} from "../components/page-chrome";
import { pageMetadata, pageStructuredData } from "../seo-content";
import { migraciaSeo } from "../site-pages";

export const metadata: Metadata = pageMetadata(migraciaSeo);

const mappedData = [
  {
    title: "Členovia a role",
    text: "Kto v starom systéme existuje, kto je overený, kto je duplicitný a kto tam zostal po niekom, kto v gyme nebol dva roky. Import bez tohto kroku prenesie neporiadok jedna k jednej.",
    icon: Users,
  },
  {
    title: "Členstvá a expirácie",
    text: "Mesačné, ročné, zmrazené, predplatené aj tie s ručne posunutým dátumom. Expirácia je pravidlo, ktoré po prepnutí rozhoduje o vstupe, takže musí sedieť do dňa.",
    icon: CreditCard,
  },
  {
    title: "Nevyčerpané jednorazové vstupy",
    text: "Zaplatené vstupy, ktoré člen ešte nevyužil, a vstupy na skúšku. Toto je položka, na ktorú sa pri prechodoch najčastejšie zabudne — a člen na ňu príde skôr než recepcia.",
    icon: BadgeCheck,
  },
  {
    title: "Rezervácie a kapacity",
    text: "Tréneri, priestory, skupinové termíny, pravidlá storna a to, čo už je rezervované na obdobie po prepnutí. Budúce rezervácie sa musia preniesť, nie zmazať.",
    icon: CalendarDays,
  },
  {
    title: "Vstupné pravidlá",
    text: "Kto môže vstúpiť, kedy, cez ktorý vchod a čo sa má stať pri zamietnutí. Toto býva najmenej zdokumentovaná časť starej prevádzky, hoci ju systém potrebuje najpresnejšie.",
    icon: DoorOpen,
  },
  {
    title: "Výnimky, ktoré nikde nie sú",
    text: "Vstup trénera bez členstva, zľava pre kamaráta majiteľa, brigádnik s obmedzenými právami. Existujú v hlave recepčnej, nie v databáze — a práve ony rozhodnú, či tím nový systém prijme.",
    icon: ScanLine,
  },
];

const migrationPhases = [
  {
    title: "Audit a export",
    text: "Zmapujeme dáta, členstvá, vstupné pravidlá a recepčný postup, prejdeme obhliadku hardvéru a zistíme, čo sa zo starého systému dá dostať von a v akej kvalite.",
  },
  {
    title: "Admin a import",
    text: "Pripravíme role, používateľov, import dát, scan logy a konfiguráciu vstupu. Dáta prechádzajú čistením ešte pred tým, než sa dotknú ostrého prostredia.",
  },
  {
    title: "Appka a hardvér",
    text: "Napojíme appku, QR vstup, skenery alebo turniket a otestujeme celý členovský postup — vrátane toho, čo sa stane pri neplatnom členstve.",
  },
  {
    title: "Školenie a prepnutie",
    text: "Prejdeme skúšobný deň, zaškolíme tím, nastavíme záložný postup a až potom spustíme ostrý prechod. Prepnutie je posledný krok, nie prvý.",
  },
];

const cutoverChecks = [
  "Export a čistenie dát pred importom",
  "Mapovanie členstiev, expirácií a výnimiek",
  "Kontrola nevyčerpaných jednorazových vstupov",
  "Prenos rezervácií, ktoré presahujú deň prepnutia",
  "Test QR vstupu, skenera a turniketu",
  "Školenie recepcie a záložný postup pri výpadku",
  "Skúšobný deň pred ostrým prepnutím",
  "Dohodnutý postup pre prvý týždeň po prepnutí",
];

const entryHardware = [
  {
    title: "Turnikety a brány",
    text: "Návrh zapojenia, pravidlá otvorenia a test scenárov pre platné aj neplatné členstvo. Ak turniket už máš, riešime napojenie namiesto výmeny.",
    icon: DoorOpen,
  },
  {
    title: "QR skenery",
    text: "Recepčný alebo vstupný skener napojený na členstvo, scan log a výnimkové rozhodnutia, aby zamietnutie nekončilo dohadovaním pri dverách.",
    icon: ScanLine,
  },
  {
    title: "Umiestnenie v prevádzke",
    text: "Riešime, kde má skener fyzicky byť, čo z toho vidí recepcia a ako sa člen prirodzene dostane dnu bez toho, aby vznikal rad.",
    icon: MapPin,
  },
];

export default function MigraciaPage() {
  return (
    <SubPage>
      <JsonLd data={pageStructuredData(migraciaSeo)} />

      <PageHero
        breadcrumb={migraciaSeo.breadcrumb}
        kicker="Prechod z iného systému"
        title={<>Prechod z iného systému bez toho, aby recepcia horela.</>}
        lead="Migráciu neriešime ako import na konci projektu, ale ako samostatnú časť s vlastným rozsahom, vlastnými rizikami a vlastným skúšobným dňom. Cieľom je, aby nové nasadenie nezačalo prázdnym adminom ani chaosom pri dverách."
        points={[
          "Dáta sa čistia pred importom, nie po ňom",
          "Členstvá a expirácie sedia do dňa prepnutia",
          "Recepcia je zaškolená skôr, než sa prepína",
          "Záložný postup je dohodnutý dopredu",
        ]}
      />

      <PageSection
        kicker="Prečo prechody padajú"
        title="Prechod nezhodí softvér. Zhodia ho dáta a nedohodnuté výnimky."
        tone="surface"
      >
        <Prose>
          <p>
            Väčšina neúspešných prechodov nevyzerá ako výpadok. Vyzerá tak, že
            v pondelok ráno stojí pri turnikete člen s predplatenými vstupmi,
            ktoré nový systém nepozná, a recepčná nemá ako rozhodnúť. O týždeň neskôr už
            tím eviduje výnimky v zošite vedľa monitora — a systém, za ktorý gym
            zaplatil, obchádza každý druhý vstup.
          </p>
          <p>
            <strong>
              Preto je najdrahšia časť prechodu tá, ktorá sa deje pred importom.
            </strong>{" "}
            Zistiť, ktoré členstvá naozaj platia, ktoré vstupy sú nevyčerpané a
            ktoré pravidlá existujú len ako zvyk, je práca, ktorú nemá kto
            urobiť za teba — ale má ju kto viesť.
          </p>
          <p>
            Druhý dôvod je ľudský. Ak tím vidí nový systém prvýkrát v deň
            prepnutia, každá výnimka sa stane hádkou pri dverách. Skúšobný deň a
            školenie nie sú bonus na konci, sú podmienkou toho, aby prepnutie
            prebehlo ako bežná zmena, nie ako krízový deň.
          </p>
        </Prose>
      </PageSection>

      <PageSection
        kicker="Čo mapujeme"
        title="Šesť vecí, ktoré musia sedieť pred prepnutím."
        lead="Toto prechádzame pri audite. Čím presnejšie sa dá odpovedať, tým menej prekvapení zostane na deň prepnutia."
      >
        <CardGrid items={mappedData} />
      </PageSection>

      <PageSection
        kicker="Postup"
        title="Prechod v štyroch krokoch."
        lead="Presný termín závisí od stavu dát, hardvéru a rozsahu výnimiek — odhad je preto výstupom auditu, nie sľubom pred ním."
        tone="surface"
      >
        <NumberedSteps items={migrationPhases} />
      </PageSection>

      <PageSection
        kicker="Kontrolný zoznam"
        title="Čo musí byť hotové pred ostrým prepnutím."
      >
        <CheckList items={cutoverChecks} />
      </PageSection>

      <PageSection
        kicker="Vstup a hardvér"
        title="Hardvér riešime ako súčasť prechodu, nie ako doplnok."
        lead="Vstupné zariadenia rozhodujú o tom, či prepnutie pocíti člen. Preto sa testujú skôr, než sa vypne starý systém."
        tone="surface"
      >
        <CardGrid items={entryHardware} />
      </PageSection>

      <FaqSection items={migraciaSeo.faq} />

      <RelatedPages
        items={[
          {
            title: "Ako určujeme cenu",
            text: "Zložitosť migrácie je jedna z piatich vecí, ktoré hýbu cenou. Tu je zvyšok.",
            href: "/cena",
          },
          {
            title: "Produkt a ukážky",
            text: "Ako vyzerá admin panel, do ktorého sa dáta importujú.",
            href: "/produkt",
          },
          {
            title: "Bezobslužné a nonstop fitká",
            text: "Prechod v prevádzke, kde pri dverách nikto nestojí.",
            href: "/bezobsluzne-fitko",
          },
        ]}
      />
    </SubPage>
  );
}
