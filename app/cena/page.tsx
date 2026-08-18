import type { Metadata } from "next";
import {
  Activity,
  CalendarClock,
  CreditCard,
  DoorOpen,
  ScanLine,
  Shuffle,
  Users,
  Wrench,
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
import { cenaSeo } from "../site-pages";

export const metadata: Metadata = pageMetadata(cenaSeo);

const priceDrivers = [
  {
    title: "Počet vstupov a turniketov",
    text: "Jeden vchod s jedným turniketom je iná úloha než dva vchody, vedľajší vstup pre trénerov a nočný režim. Každý ďalší vstupný bod si nesie vlastné pravidlá otvorenia, vlastný scan log a vlastný výpadkový scenár.",
    icon: DoorOpen,
  },
  {
    title: "Veľkosť prevádzky",
    text: "Podľa škály fitka sa určuje mesačný poplatok — malé jednoprevádzkové fitko a sieť s viacerými vchodmi nemajú dôvod platiť rovnako. Toto je jediný faktor, ktorý sa premieta do opakovaného nákladu, nie len do nasadenia.",
    icon: Users,
  },
  {
    title: "Typy členstiev a ich pravidlá",
    text: "Tisíc členov s jedným mesačným členstvom býva jednoduchších než tristo členov s rôznymi dĺžkami členstva, jednorazovými vstupmi, rodinnými účtami a firemnými balíkmi. Nasadenie dvíha počet pravidiel, nie počet riadkov v databáze.",
    icon: CreditCard,
  },
  {
    title: "Vstupný hardvér",
    text: "Ak turnikety a skenery už máš, riešime napojenie na systém. Ak nie, vyberieme a odporučíme konkrétne zariadenia — kupuješ ich priamo ty, takže zostávajú tvoje a nie sú viazané na nás.",
    icon: ScanLine,
  },
  {
    title: "Zložitosť migrácie dát",
    text: "Čistý export z existujúceho systému je iná práca než dáta rozsypané medzi starým softvérom, tabuľkou a poznámkami na recepcii. Čistenie pred importom býva väčšia časť prechodu než samotný import.",
    icon: Activity,
  },
  {
    title: "Výnimky v prevádzke",
    text: "Každé „u nás to robíme inak“ je funkcia. Vstup trénera bez členstva, zmrazené členstvo cez dovolenku, jednorazový vstup na skúšku, brigádnik s obmedzenými právami. Toto je najčastejší dôvod, prečo krabicový softvér nesadne.",
    icon: Shuffle,
  },
];

const costStructure = [
  {
    title: "Jednorazová implementácia",
    text: "Migrácia a čistenie dát, konfigurácia vstupných pravidiel a rolí, napojenie hardvéru, príprava adminu a appky a školenie tímu. Platí sa raz, pri nasadení, a jej výška vychádza z rozsahu, ktorý vyjde z auditu.",
    icon: Wrench,
  },
  {
    title: "Mesačný poplatok za prevádzku",
    text: "Beh systému, aktualizácie a podpora. Jeho výška sa odvíja od škály fitka — jednoprevádzkové fitko a sieť s viacerými vchodmi nemajú dôvod platiť rovnako.",
    icon: CalendarClock,
  },
  {
    title: "Vstupný hardvér",
    text: "Turnikety a skenery si kupuje gym priamo, takže zostávajú tvoje a nie sú viazané na dodávateľa. Výber a špecifikáciu ti pripravíme, aby si nekupoval zariadenie, ktoré sa nedá zmysluplne napojiť.",
    icon: ScanLine,
  },
];

const priceProcess = [
  {
    title: "Bezplatný audit prevádzky",
    text: "Prejdeme vstupy, členstvá, dáta, hardvér, recepčné postupy, rezervácie a výpadkové scenáre. Audit je bezplatný a nezáväzný.",
  },
  {
    title: "Mapa rozsahu",
    text: "Z auditu vyjde zoznam modulov, priorít a rizík plus návrh pilotného rozsahu pre prvé nasadenie. Tento výstup ti zostáva aj vtedy, ak sa rozhodneš pokračovať s niekým iným.",
  },
  {
    title: "Cena k rozsahu",
    text: "Až keď je jasné, čo sa stavia, dáva zmysel povedať, koľko to stojí. Cena je naviazaná na konkrétny rozsah, nie na balík, do ktorého sa treba vojsť.",
  },
  {
    title: "Pilot a ostré prepnutie",
    text: "Rozsah rozdelíme na pilotnú fázu a ďalšie kroky, aby sa prvé nasadenie dalo overiť v reálnej prevádzke skôr, než sa doň zaviažeš celý.",
  },
];

const scopeItems = [
  "Konfigurácia vstupných pravidiel, rolí a overovania účtov",
  "Import členov, členstiev, expirácií a jednorazových vstupov",
  "Napojenie QR vstupu, skenerov a turniketu",
  "Admin panel pre recepciu a majiteľa",
  "Mobilná appka pre členov v prostredí tvojho gymu",
  "Školenie tímu a záložný postup pri výpadku",
];

const auditOutput = [
  "Mapa modulov a ich priorít",
  "Stav dát a zoznam toho, čo treba vyčistiť pred importom",
  "Návrh vstupu, hardvéru a umiestnenia v prevádzke",
  "Zoznam rizík, ktoré treba vyriešiť pred prepnutím",
  "Návrh pilotného rozsahu pre prvé nasadenie",
  "Odhad termínu, naviazaný na stav dát a hardvéru",
];

export default function CenaPage() {
  return (
    <SubPage>
      <JsonLd data={pageStructuredData(cenaSeo)} />

      <PageHero
        breadcrumb={cenaSeo.breadcrumb}
        kicker="Cena a rozsah"
        title={
          <>
            Koľko stojí softvér pre fitko? Najprv rozsah, potom cena.
          </>
        }
        lead="Na tejto stránke nenájdeš tabuľku s balíkmi — nájdeš tu to, čo cenu určuje, a postup, ktorým sa k nej dostaneme. Začína sa bezplatným auditom prevádzky, z neho vyjde rozsah a až z rozsahu vyjde cena."
        points={[
          "Audit prevádzky je bezplatný a nezáväzný",
          "Jednorazová implementácia plus mesačný poplatok",
          "Hardvér kupuješ priamo ty a zostáva tvoj",
          "Výška vychádza z rozsahu, nie z tarifu",
        ]}
      />

      <PageSection
        kicker="Prečo tu nie je cenník"
        title="Cenník s balíkmi by hovoril o inom produkte, než staviame."
        tone="surface"
      >
        <Prose>
          <p>
            Balíkový cenník dáva zmysel vtedy, keď každý zákazník dostane to
            isté: systém je hotový, je rovnaký pre všetkých a gym sa mu
            prispôsobí. To je legitímny spôsob, ako predávať softvér — len je to
            iný produkt než ten náš.
          </p>
          <p>
            <strong>Mesačný poplatok pritom platíš aj u nás.</strong> Rozdiel
            nie je v tom, či sa platí mesačne — ale v tom, odkiaľ sa berie jeho
            výška. Pri krabicovom systéme ju určuje tarif, do ktorého sa musíš
            vojsť. U nás vychádza z rozsahu, ktorý tvojej prevádzke naozaj
            sadne.
          </p>
          <p>
            <strong>
              Tap-it sa skladá podľa konkrétnej prevádzky.
            </strong>{" "}
            Číslo vypísané na web bez znalosti tvojich vstupov, hardvéru a dát
            by bolo buď nadsadené, aby pokrylo najhorší prípad, alebo
            nepravdivé, lebo by mlčalo o tom, čo v ňom nie je. Ani jedno ti
            nepomôže pri rozhodovaní.
          </p>
          <p>
            Zároveň nechceme predstierať, že otázka „koľko to stojí“ je
            nemiestna. Je to prvá otázka, ktorú si položí každý majiteľ, a
            zaslúži si odpoveď. Naša odpoveď je{" "}
            <strong>bezplatný audit → rozsah → cena</strong> — a nižšie je
            rozpísané presne to, čo do toho rozsahu vstupuje.
          </p>
        </Prose>
      </PageSection>

      <PageSection
        kicker="Z čoho sa cena skladá"
        title="Tri položky, nie jedno číslo."
        lead="Aby bolo jasné, za čo sa platí raz, za čo každý mesiac a čo si gym obstaráva sám."
      >
        <CardGrid items={costStructure} />
      </PageSection>

      <PageSection
        kicker="Čo určuje výšku"
        title="Šesť vecí, ktoré s cenou hýbu najviac."
        lead="Toto sú premenné, na ktoré sa pýtame pri audite. Keď ich vieš zodpovedať dopredu, vieme sa k rozsahu dostať rýchlejšie."
        tone="surface"
      >
        <CardGrid items={priceDrivers} />
      </PageSection>

      <PageSection kicker="Postup" title="Ako sa dostaneme k číslu.">
        <NumberedSteps items={priceProcess} />
      </PageSection>

      <PageSection
        kicker="Rozsah"
        title="Čo je súčasťou implementácie."
        lead="Presné zloženie vychádza z auditu — zmysel má platiť za to, čo tvoja prevádzka naozaj používa."
        tone="surface"
      >
        <CheckList items={scopeItems} />
      </PageSection>

      <PageSection
        kicker="Bezplatný audit"
        title="Čo z auditu dostaneš."
        lead="Audit nie je formalita pred cenovou ponukou. Je to mapa, ktorá rozhodne, čo má ísť do pilotu — a je bezplatná aj vtedy, keď z toho nakoniec nič nebude."
      >
        <CheckList items={auditOutput} />
      </PageSection>

      <FaqSection items={cenaSeo.faq} />

      <RelatedPages
        items={[
          {
            title: "Prechod z iného systému",
            text: "Ako mapujeme dáta, členstvá a expirácie, aby prepnutie nezhodilo recepciu.",
            href: "/migracia",
          },
          {
            title: "Produkt a ukážky",
            text: "Reálne obrazovky admin panelu a mobilnej appky, nie prezentácia.",
            href: "/produkt",
          },
          {
            title: "Bezobslužné a nonstop fitká",
            text: "Vstup, ktorý stojí celý na pravidlách systému a turnikete.",
            href: "/bezobsluzne-fitko",
          },
        ]}
      />
    </SubPage>
  );
}
