import type { Metadata } from "next";

import { JsonLd } from "../components/json-ld";
import {
  EntityFacts,
  LegalDocument,
  LegalHero,
  LegalLink,
  LegalNote,
  LegalTable,
  type LegalArticle,
} from "../components/legal-chrome";
import { RelatedPages, SubPage } from "../components/page-chrome";
import {
  legalEffectiveLabel,
  legalEntity,
  legalVersion,
  otherLegalPages,
  supervisoryAuthorities,
} from "../legal-content";
import { pageMetadata, pageStructuredData } from "../seo-content";
import { ochranaUdajovSeo } from "../site-pages";

export const metadata: Metadata = pageMetadata(ochranaUdajovSeo);

const dpo = supervisoryAuthorities.dataProtection;

/** Účely spracúvania na strane Tap-it. Tabuľka je zdrojom pravdy aj pre čl. 6. */
const processingRows = [
  [
    "Odpoveď na dopyt z kontaktného formulára",
    "Meno, e-mailová adresa, typ záujmu, text správy, čas odoslania",
    "Čl. 6 ods. 1 písm. b) GDPR — predzmluvné vzťahy na žiadosť dotknutej osoby, a písm. f) — oprávnený záujem odpovedať na oslovenie",
    "24 mesiacov od poslednej komunikácie",
  ],
  [
    "E-mailová a telefonická komunikácia",
    "Kontaktné údaje a obsah komunikácie",
    "Čl. 6 ods. 1 písm. b) a f) GDPR",
    "24 mesiacov od poslednej komunikácie",
  ],
  [
    "Plnenie zmluvy s klientom",
    "Identifikačné a fakturačné údaje, údaje kontaktných osôb klienta",
    "Čl. 6 ods. 1 písm. b) GDPR — plnenie zmluvy",
    "Počas trvania zmluvy a 4 roky po jej skončení",
  ],
  [
    "Účtovné a daňové povinnosti",
    "Fakturačné a účtovné doklady",
    "Čl. 6 ods. 1 písm. c) GDPR — zákonná povinnosť",
    "10 rokov podľa zákona o účtovníctve",
  ],
  [
    "Prevádzka a bezpečnosť webu",
    "IP adresa, typ prehliadača, čas a adresa požiadavky v serverových logoch",
    "Čl. 6 ods. 1 písm. f) GDPR — oprávnený záujem na bezpečnej prevádzke",
    "Spravidla najviac 30 dní",
  ],
  [
    "Uplatnenie a obhajoba právnych nárokov",
    "Údaje potrebné na preukázanie nároku",
    "Čl. 6 ods. 1 písm. f) GDPR — oprávnený záujem",
    "Do uplynutia premlčacej lehoty",
  ],
] as const;

const articles: readonly LegalArticle[] = [
  {
    id: "kto-sme",
    title: "Kto sme a čoho sa toto vyhlásenie týka",
    clauses: [
      {
        text: "Prevádzkovateľom, ktorý určuje účely a prostriedky spracúvania osobných údajov popísaných v tomto dokumente, je Tap-it. Kontaktné a identifikačné údaje sú uvedené v úvode dokumentu.",
      },
      {
        text: "Vyhlásenie sa týka spracúvania údajov na webe tap-it.sk, v kontaktnom formulári a v bežnej obchodnej komunikácii s nami — teda situácií, v ktorých určujeme účel spracúvania my.",
      },
      {
        text: (
          <>
            Netýka sa údajov členov fitka, ktoré prechádzajú systémom Tap-it
            Fitness OS. Tam je prevádzkovateľom samotné fitko a my sme
            sprostredkovateľ — podrobnosti sú v{" "}
            <LegalLink href="#clenovia-fitka">čl. 8</LegalLink>.
          </>
        ),
      },
      {
        text: `Nemáme povinnosť určiť zodpovednú osobu (DPO) podľa čl. 37 GDPR, a preto ju neurčujeme. Otázky k ochrane údajov posielaj na ${legalEntity.email}.`,
      },
    ],
  },
  {
    id: "ake-udaje",
    title: "Aké údaje spracúvame a na akom základe",
    clauses: [
      {
        text: "Zbierame len údaje, ktoré potrebujeme na odpoveď, na plnenie zmluvy alebo na splnenie zákonnej povinnosti. Prehľad všetkých účelov:",
        block: (
          <LegalTable
            columns={["Účel", "Kategórie údajov", "Právny základ", "Doba uchovávania"]}
            rows={processingRows.map((row) => [...row])}
          />
        ),
      },
      {
        text: "Poskytnutie údajov v kontaktnom formulári je dobrovoľné. Bez mena a e-mailovej adresy však na dopyt nevieme odpovedať.",
      },
      {
        text: "Nevedieme newsletter a e-mailovú adresu z formulára nepoužívame na hromadné rozosielanie ponúk.",
      },
      {
        text: "Osobitné kategórie údajov podľa čl. 9 GDPR (napríklad údaje o zdraví) na strane webu ani obchodnej komunikácie nespracúvame.",
      },
    ],
  },
  {
    id: "odkial-udaje",
    title: "Odkiaľ údaje máme",
    clauses: [
      {
        text: "Údaje získavame priamo od teba — z formulára, z e-mailu, z telefonátu alebo zo zmluvnej dokumentácie.",
      },
      {
        text: "Nekupujeme databázy kontaktov ani nezískavame údaje od tretích strán na marketingové účely. Ak nás oslovíš z firemnej adresy, spracúvame len to, čo si nám sám poslal, prípadne verejne dostupné identifikačné údaje firmy z verejných registrov na účel prípravy zmluvy a faktúry.",
      },
    ],
  },
  {
    id: "prijemcovia",
    title: "Komu údaje sprístupňujeme",
    clauses: [
      {
        text: "Údaje nepredávame a neposkytujeme ich tretím stranám na ich vlastné marketingové účely. Sprístupňujeme ich len tým, ktorí nám pomáhajú službu prevádzkovať:",
        items: [
          "poskytovateľovi hostingu a doručovania obsahu, na ktorom web beží,",
          "službe Resend (Resend, Inc.), ktorá doručuje správy odoslané z kontaktného formulára na našu e-mailovú adresu,",
          "poskytovateľovi e-mailovej schránky a kancelárskych nástrojov,",
          "účtovníkovi a prípadne právnemu alebo daňovému poradcovi,",
          "orgánom verejnej moci, ak nám to ukladá právny predpis.",
        ],
      },
      {
        text: "S poskytovateľmi, ktorí pre nás spracúvajú osobné údaje, máme uzavretú zmluvu podľa čl. 28 GDPR. Sú viazaní mlčanlivosťou a smú údaje spracúvať len na základe našich pokynov.",
      },
    ],
  },
  {
    id: "prenos-mimo-eu",
    title: "Prenos mimo Európskeho hospodárskeho priestoru",
    clauses: [
      {
        text: "Časť našich dodávateľov sídli mimo EHP, najmä v Spojených štátoch. Prenos v takom prípade prebieha na základe rozhodnutia o primeranosti (rámec EU–US Data Privacy Framework) alebo štandardných zmluvných doložiek schválených Európskou komisiou.",
      },
      {
        text: `Ak chceš vedieť, ktorý konkrétny dodávateľ sa dotýka tvojich údajov a aké záruky sme s ním dohodli, napíš nám na ${legalEntity.email} a pošleme ti aktuálny zoznam.`,
      },
    ],
  },
  {
    id: "doba-uchovavania",
    title: "Ako dlho údaje uchovávame",
    clauses: [
      {
        text: "Doby uchovávania sú uvedené pri jednotlivých účeloch v čl. 2. Kratšie neuchovávame nič, čo potrebujeme na plnenie zákonnej povinnosti, a dlhšie nič, na čo už nemáme dôvod.",
      },
      {
        text: "Po uplynutí doby údaje vymažeme alebo anonymizujeme tak, aby ich už nebolo možné priradiť ku konkrétnej osobe.",
      },
      {
        text: "Ak požiadaš o výmaz skôr a nebráni tomu zákonná povinnosť ani prebiehajúci právny nárok, údaje vymažeme bez zbytočného odkladu.",
      },
    ],
  },
  {
    id: "prava",
    title: "Aké máš práva",
    clauses: [
      {
        text: "Ako dotknutá osoba máš voči nám tieto práva:",
        items: [
          "právo na prístup k údajom a na kópiu spracúvaných údajov,",
          "právo na opravu nesprávnych a doplnenie neúplných údajov,",
          "právo na výmaz („právo na zabudnutie“),",
          "právo na obmedzenie spracúvania,",
          "právo na prenosnosť údajov k inému prevádzkovateľovi,",
          "právo namietať proti spracúvaniu založenému na oprávnenom záujme,",
          "právo kedykoľvek odvolať súhlas, ak je spracúvanie na súhlase založené, bez vplyvu na zákonnosť spracúvania pred odvolaním,",
          "právo podať sťažnosť dozornému orgánu.",
        ],
      },
      {
        text: `Práva si môžeš uplatniť e-mailom na ${legalEntity.email} alebo cez kontaktný formulár na tejto stránke. Odpovieme do 30 dní; v zložitejších prípadoch môžeme lehotu predĺžiť a vopred ti to oznámime.`,
      },
      {
        text: "Uplatnenie práv je bezplatné. Pri zjavne neopodstatnených alebo opakovaných žiadostiach môžeme účtovať primeraný poplatok alebo žiadosť odmietnuť.",
      },
      {
        text: `Ak si myslíš, že spracúvaním porušujeme právne predpisy, môžeš podať sťažnosť na dozornom orgáne: ${dpo.name}, ${dpo.address}, e-mail ${dpo.email}.`,
      },
    ],
  },
  {
    id: "clenovia-fitka",
    title: "Údaje členov v systéme Tap-it Fitness OS",
    clauses: [
      {
        text: "Keď fitko používa Tap-it Fitness OS, prevádzkovateľom údajov jeho členov je fitko. Určuje, aké údaje sa zbierajú, na aký účel a ako dlho sa uchovávajú. My vystupujeme ako sprostredkovateľ podľa čl. 28 GDPR.",
      },
      {
        text: "Ak si člen fitka a chceš uplatniť svoje práva — prístup, opravu, výmaz — obráť sa na svoje fitness centrum. My mu pri vybavení žiadosti poskytneme súčinnosť, ale sami o jeho údajoch nerozhodujeme.",
      },
      {
        text: "Údaje členov spracúvame len na základe zdokumentovaných pokynov fitka. Nepoužívame ich na vlastné obchodné účely, nepredávame ich a nemiešame dáta rôznych klientov.",
      },
      {
        text: (
          <>
            Bezpečnostné opatrenia, zálohovanie a postup pri bezpečnostnom
            incidente vrátane lehôt na oznámenie klientovi upravuje{" "}
            <LegalLink href="/prevadzkovy-poriadok">
              Prevádzkový poriadok
            </LegalLink>
            .
          </>
        ),
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies a podobné technológie",
    clauses: [
      {
        text: (
          <>
            Web ukladá dve funkčné cookies — voľbu svetlého alebo tmavého
            režimu a to, že si videl lištu s informáciou o cookies.
            Nepoužívame analytické, marketingové ani profilovacie cookies.
            Podrobnosti sú na stránke{" "}
            <LegalLink href="/cookies">Cookies</LegalLink>.
          </>
        ),
      },
      {
        text: "Serverové logy nie sú cookies, ale obsahujú IP adresu. Spracúvame ich na základe oprávneného záujmu na bezpečnej prevádzke webu, ako je uvedené v čl. 2.",
      },
    ],
  },
  {
    id: "bezpecnost",
    title: "Bezpečnosť spracúvania",
    clauses: [
      {
        text: "Prenos údajov medzi tvojím zariadením a našimi službami je šifrovaný (HTTPS). Prístup k údajom majú len osoby, ktoré ho na svoju prácu potrebujú, a to na menné účty.",
      },
      {
        text: "Uplatňujeme princíp minimalizácie: nezbierame údaje, ktoré na daný účel nepotrebujeme, a nekopírujeme produkčné dáta do testovacích prostredí bez ich úpravy.",
      },
      {
        text: "Ak dôjde k porušeniu ochrany osobných údajov s rizikom pre práva dotknutých osôb, oznámime to dozornému orgánu do 72 hodín a v odôvodnených prípadoch aj dotknutým osobám.",
      },
    ],
  },
  {
    id: "automatizovane-rozhodovanie",
    title: "Automatizované rozhodovanie a profilovanie",
    clauses: [
      {
        text: "Nevykonávame automatizované rozhodovanie ani profilovanie, ktoré by malo právne účinky alebo by ťa podobne významne ovplyvnilo.",
      },
      {
        text: "Kontrola platnosti členstva pri vstupe do fitka je automatizované vyhodnotenie pravidla nastaveného fitkom, nie profilovanie podľa čl. 22 GDPR — vyhodnocuje sa iba to, či má člen v danom čase platné oprávnenie na vstup.",
      },
    ],
  },
  {
    id: "deti",
    title: "Údaje detí",
    clauses: [
      {
        text: "Web ani kontaktný formulár nie sú určené deťom a vedome od nich údaje nezbierame.",
      },
      {
        text: "Ak fitko eviduje členov mladších ako 16 rokov, súhlas zákonného zástupcu a podmienky členstva rieši ako prevádzkovateľ samo fitko.",
      },
    ],
  },
  {
    id: "zmeny",
    title: "Zmeny tohto vyhlásenia",
    clauses: [
      {
        text: "Vyhlásenie môžeme aktualizovať, ak sa zmenia služby, dodávatelia alebo právne predpisy. Aktuálne znenie je vždy dostupné na tejto adrese.",
      },
      {
        text: `Toto znenie je účinné od ${legalEffectiveLabel}. Pri podstatnej zmene, ktorá sa dotkne už zbieraných údajov, budeme klientov informovať aj priamo.`,
      },
    ],
  },
];

export default function OchranaOsobnychUdajovPage() {
  return (
    <SubPage>
      <JsonLd data={pageStructuredData(ochranaUdajovSeo)} />

      <LegalHero
        breadcrumb={ochranaUdajovSeo.breadcrumb}
        title="Ochrana osobných údajov"
        lead="Aké údaje o tebe spracúvame, prečo ich potrebujeme, ako dlho ich držíme a čo s nimi môžeš urobiť. Bez zoznamu partnerov na tri obrazovky — spracúvame len to, čo naozaj používame."
        meta={[
          { label: "Účinnosť od", value: legalEffectiveLabel },
          { label: "Verzia", value: legalVersion },
          { label: "Rámec", value: "GDPR a zákon č. 18/2018 Z. z." },
        ]}
      />

      <LegalDocument
        articles={articles}
        intro={
          <div className="grid gap-6">
            <EntityFacts />
            <LegalNote title="Si člen fitka, ktoré používa Tap-it?">
              <p>
                Za tvoje údaje v systéme zodpovedá tvoje fitness centrum, nie my
                — my ich spracúvame iba na jeho pokyn. So žiadosťou o prístup,
                opravu alebo výmaz sa preto obráť priamo naň. Podrobnosti sú v{" "}
                <LegalLink href="#clenovia-fitka">čl. 8</LegalLink>.
              </p>
            </LegalNote>
          </div>
        }
      />

      <RelatedPages items={[...otherLegalPages("/ochrana-osobnych-udajov")]} />
    </SubPage>
  );
}
