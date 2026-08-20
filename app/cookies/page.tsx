import type { Metadata } from "next";

import { JsonLd } from "../components/json-ld";
import {
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
} from "../legal-content";
import { pageMetadata, pageStructuredData } from "../seo-content";
import { cookiesSeo } from "../site-pages";
import { CONSENT_COOKIE, CONSENT_DURATION_LABEL } from "../use-cookie-consent";
import { THEME_COOKIE } from "../use-theme";

export const metadata: Metadata = pageMetadata(cookiesSeo);

/**
 * Zoznam cookies. Názvy aj platnosti čítame priamo z kódu, ktorý ich zapisuje,
 * takže sa dokument nemôže rozísť s tým, čo web naozaj ukladá.
 */
const cookieRows = [
  [
    THEME_COOKIE,
    "Funkčná",
    "Pamätá si voľbu svetlého alebo tmavého režimu, aby sa stránka po načítaní nezobrazila v inej téme, než si si nastavil.",
    "1 rok",
    "Prvá strana (tap-it.sk)",
  ],
  [
    CONSENT_COOKIE,
    "Funkčná",
    "Zaznamená, že si videl lištu s informáciou o cookies, aby ti nevyskakovala pri každej návšteve.",
    CONSENT_DURATION_LABEL,
    "Prvá strana (tap-it.sk)",
  ],
] as const;

const articles: readonly LegalArticle[] = [
  {
    id: "co-su-cookies",
    title: "Čo sú cookies",
    clauses: [
      {
        text: "Cookies sú malé textové súbory, ktoré web uloží do tvojho prehliadača. Pri ďalšej návšteve ich vie prečítať, a tak si zapamätá napríklad nastavenie, prihlásenie alebo obsah košíka.",
      },
      {
        text: "Funkčné a nevyhnutné cookies sú potrebné na to, aby stránka fungovala tak, ako od nej čakáš. Analytické a marketingové cookies slúžia na meranie návštevnosti a na cielenie reklamy — a práve tie vyžadujú tvoj súhlas.",
      },
    ],
  },
  {
    id: "co-pouzivame",
    title: "Aké cookies používame my",
    clauses: [
      {
        text: "Na tap-it.sk ukladáme dve cookies a obe sú funkčné. Jedna si pamätá, či si prepol web do svetlého alebo tmavého režimu, druhá to, že si už videl lištu s informáciou o cookies.",
        block: (
          <LegalTable
            columns={["Názov", "Typ", "Účel", "Platnosť", "Pôvod"]}
            rows={cookieRows.map((row) => [...row])}
          />
        ),
      },
      {
        text: "Ani jedna neobsahuje meno, e-mail ani identifikátor, podľa ktorého by sa dala určiť tvoja totožnosť. Prvá nesie hodnotu „light“ alebo „dark“, druhá jedinú číslicu.",
      },
      {
        text: "Nespájame ich s inými údajmi a nesledujeme cez ne pohyb po webe.",
      },
    ],
  },
  {
    id: "cookie-lista",
    title: "Prečo má lišta jediné tlačidlo",
    clauses: [
      {
        text: "Súhlas s ukladaním cookies vyžaduje § 109 ods. 8 zákona č. 452/2021 Z. z. o elektronických komunikáciách. Výnimku majú cookies nevyhnutné na poskytnutie služby, ktorú si používateľ výslovne vyžiadal.",
      },
      {
        text: "Obe naše cookies pod túto výnimku spadajú: prvá vzniká, len keď sám klikneš na prepínač témy, druhá až vtedy, keď lištu odklikneš. Súhlas na ne teda nepotrebujeme.",
      },
      {
        text: "Preto lišta nie je súhlasná brána, ale informácia — nič sa za ňou neodomyká a nič sa nespustí, keď ju necháš tak. Má jediné tlačidlo práve preto, že nie je čo odmietnuť.",
      },
      {
        text: "Keby sme niekedy nasadili analytiku alebo reklamné nástroje, jedno tlačidlo by prestalo stačiť. Lišta by musela ponúknuť rovnako dostupnú možnosť odmietnuť aj neskôr súhlas odvolať a túto stránku by sme aktualizovali skôr, než by sa čokoľvek také spustilo.",
      },
    ],
  },
  {
    id: "co-nepouzivame",
    title: "Čo na webe nepoužívame",
    clauses: [
      {
        text: "Aby bolo jasné, čo tu nenájdeš:",
        items: [
          "žiadnu analytiku návštevnosti — ani Google Analytics, ani inú,",
          "žiadne reklamné a remarketingové pixely, napríklad Meta Pixel či Google Ads,",
          "žiadne profilovacie cookies tretích strán,",
          "žiadne nástroje na nahrávanie relácií a teplotné mapy,",
          "žiadne cookies zo vložených prehrávačov a widgetov tretích strán.",
        ],
      },
      {
        text: "Písma na webe sú hosťované priamo z našej domény, takže sa pri načítaní stránky nesťahujú z externých serverov a tvoja IP adresa sa k nim nedostane.",
      },
      {
        text: "Nepoužívame ani local storage či session storage na sledovanie správania.",
      },
    ],
  },
  {
    id: "serverove-logy",
    title: "Serverové logy",
    clauses: [
      {
        text: "Server, na ktorom web beží, zaznamenáva technické údaje o požiadavkách — IP adresu, typ prehliadača, čas a adresu požiadavky. Nie sú to cookies a neukladajú sa do tvojho zariadenia.",
      },
      {
        text: (
          <>
            Spracúvame ich na základe oprávneného záujmu na bezpečnej prevádzke
            webu a uchovávame spravidla najviac 30 dní. Podrobnosti sú vo
            vyhlásení{" "}
            <LegalLink href="/ochrana-osobnych-udajov">
              Ochrana osobných údajov
            </LegalLink>
            .
          </>
        ),
      },
    ],
  },
  {
    id: "ako-spravovat",
    title: "Ako cookies spravovať alebo zmazať",
    clauses: [
      {
        text: "Cookies vieš kedykoľvek zmazať alebo zakázať v nastaveniach prehliadača. Postup nájdeš v jeho nápovede pod heslom „cookies“ alebo „ochrana súkromia“:",
        items: [
          "Chrome: Nastavenia → Ochrana osobných údajov a zabezpečenie → Súbory cookie tretích strán,",
          "Safari: Nastavenia → Ochrana osobných údajov → Spravovať údaje webových stránok,",
          "Firefox: Nastavenia → Súkromie a bezpečnosť → Cookies a údaje stránok,",
          "Edge: Nastavenia → Súbory cookie a povolenia stránok.",
        ],
      },
      {
        text: "Ak cookies zmažeš, web sa pri ďalšej návšteve zobrazí v predvolenom tmavom režime a znova sa ukáže lišta s informáciou o cookies. Nič iné sa nestane — žiadna funkcia stránky na nich nestojí.",
      },
      {
        text: "Blokovanie cookies v prehliadači nemá na použiteľnosť tohto webu vplyv. Prepínač témy bude fungovať, len si voľbu nezapamätá po zatvorení karty, a lišta sa ukáže pri každej návšteve.",
      },
    ],
  },
  {
    id: "appka-a-system",
    title: "Mobilná aplikácia a systém pre fitká",
    clauses: [
      {
        text: "Mobilná aplikácia pre členov nepoužíva reklamné identifikátory ani cookies tretích strán a nesleduje správanie mimo aplikácie.",
      },
      {
        text: "Prihlásený člen a recepcia v admin paneli majú prihlasovaciu reláciu, bez ktorej sa systém nedá používať. Ide o technicky nevyhnutnú funkciu, nie o sledovanie.",
      },
      {
        text: "Za nastavenie a informovanie členov v systéme konkrétneho fitka zodpovedá dané fitko ako prevádzkovateľ.",
      },
    ],
  },
  {
    id: "zmeny",
    title: "Zmeny týchto zásad",
    clauses: [
      {
        text: "Zásady aktualizujeme vtedy, keď sa zmení to, čo web ukladá. Aktuálne znenie je vždy na tejto adrese.",
      },
      {
        text: `Toto znenie je účinné od ${legalEffectiveLabel}. Otázky posielaj na ${legalEntity.email}.`,
      },
    ],
  },
];

export default function CookiesPage() {
  return (
    <SubPage>
      <JsonLd data={pageStructuredData(cookiesSeo)} />

      <LegalHero
        breadcrumb={cookiesSeo.breadcrumb}
        title="Cookies"
        lead="Krátky dokument, lebo je krátky aj zoznam. Tento web ukladá dve funkčné cookies — voľbu svetlého alebo tmavého režimu a to, že si videl lištu o cookies. Nič iné nemeriame a nič iné neukladáme."
        meta={[
          { label: "Účinnosť od", value: legalEffectiveLabel },
          { label: "Verzia", value: legalVersion },
          { label: "Počet cookies", value: "2 funkčné" },
        ]}
      />

      <LegalDocument
        articles={articles}
        intro={
          <LegalNote title="Zhrnutie na jeden odsek">
            <p>
              Neukladáme analytické ani reklamné cookies, nepoužívame nástroje
              tretích strán a nesledujeme, kadiaľ po webe chodíš. Vznikajú tu
              presne dve cookies — jedna si pamätá tvoju voľbu témy, druhá to, že
              si odklikol lištu — a obe až vtedy, keď na niečo naozaj klikneš.
            </p>
          </LegalNote>
        }
      />

      <RelatedPages items={[...otherLegalPages("/cookies")]} />
    </SubPage>
  );
}
