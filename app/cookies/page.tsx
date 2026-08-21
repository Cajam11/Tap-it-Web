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
    CONSENT_COOKIE,
    "Nevyhnutná",
    "Uchová tvoje rozhodnutie o cookies — hodnotu „granted“ alebo „denied“. Bez nej by sme sa ťa museli pýtať pri každom načítaní stránky a nevedeli by sme tvoje odmietnutie rešpektovať.",
    CONSENT_DURATION_LABEL,
    "Prvá strana (tap-it.sk)",
  ],
  [
    THEME_COOKIE,
    "Funkčná — len so súhlasom",
    "Pamätá si voľbu svetlého alebo tmavého režimu. Vznikne až vtedy, keď dáš súhlas a prepneš tému. Bez súhlasu prepínač funguje, len si voľbu nezapamätá po zatvorení karty.",
    "1 rok",
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
        text: "Na tap-it.sk môžu vzniknúť najviac dve cookies. Jedna drží tvoje rozhodnutie o cookies, druhá voľbu svetlého alebo tmavého režimu — a tá až vtedy, keď nám na ňu dáš súhlas.",
        block: (
          <LegalTable
            columns={["Názov", "Typ", "Účel", "Platnosť", "Pôvod"]}
            rows={cookieRows.map((row) => [...row])}
          />
        ),
      },
      {
        text: "Ani jedna neobsahuje meno, e-mail ani identifikátor, podľa ktorého by sa dala určiť tvoja totožnosť. Prvá nesie slovo „granted“ alebo „denied“, druhá „light“ alebo „dark“.",
      },
      {
        text: "Nespájame ich s inými údajmi a nesledujeme cez ne pohyb po webe.",
      },
    ],
  },
  {
    id: "cookie-lista",
    title: "Ako funguje lišta a čo sa deje po kliknutí",
    clauses: [
      {
        text: "Súhlas s ukladaním cookies vyžaduje § 109 ods. 8 zákona č. 452/2021 Z. z. o elektronických komunikáciách. Výnimku majú cookies nevyhnutné na poskytnutie služby, ktorú si používateľ výslovne vyžiadal.",
      },
      {
        text: "Lišta je skutočná brána, nie oznam: kým sa nerozhodneš, neuloží sa nič. Ak dáš súhlas, začneme si pamätať voľbu témy. Ak odmietneš, prepínač témy funguje ďalej, len si voľbu nezapamätá po zatvorení karty.",
      },
      {
        text: "Odmietnuť je rovnako ľahké ako súhlasiť — obe tlačidlá sú vedľa seba, rovnako veľké a nič sa za nimi neodomyká. Odmietnutie nemá na použiteľnosť webu žiadny vplyv.",
      },
      {
        text: "Pod tvojím rozhodnutím ukladáme jedinú cookie — samotné rozhodnutie. To je cookie nevyhnutná na to, aby sme tvoju voľbu vedeli dodržať, a spadá pod uvedenú výnimku.",
      },
      {
        text: "Rozhodnutie vieš kedykoľvek zmeniť: v pravom dolnom rohu každej stránky je koliesko s cookie, ktoré lištu znova otvorí. Ak súhlas odvoláš, cookie s témou hneď zmažeme.",
      },
      {
        text: "Keby sme niekedy nasadili analytiku alebo reklamné nástroje, pribudli by do lišty ako samostatná voľba vypnutá dopredu a túto stránku by sme aktualizovali skôr, než by sa čokoľvek také spustilo.",
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
        text: "Priamo na webe stačí kliknúť na koliesko s cookie v pravom dolnom rohu — lišta sa znova otvorí a rozhodnutie vieš zmeniť oboma smermi.",
      },
      {
        text: "Ak cookies zmažeš v prehliadači, web sa pri ďalšej návšteve zobrazí v predvolenom tmavom režime a lišta sa opýta znova. Nič iné sa nestane — žiadna funkcia stránky na nich nestojí.",
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
        lead="Krátky dokument, lebo je krátky aj zoznam. Tento web ukladá najviac dve cookies — tvoje rozhodnutie o cookies a voľbu svetlého alebo tmavého režimu, tú až so súhlasom. Nič iné nemeriame a nič iné neukladáme."
        meta={[
          { label: "Účinnosť od", value: legalEffectiveLabel },
          { label: "Verzia", value: legalVersion },
          { label: "Počet cookies", value: "najviac 2" },
        ]}
      />

      <LegalDocument
        articles={articles}
        intro={
          <LegalNote title="Zhrnutie na jeden odsek">
            <p>
              Neukladáme analytické ani reklamné cookies, nepoužívame nástroje
              tretích strán a nesledujeme, kadiaľ po webe chodíš. Kým sa
              nerozhodneš v lište, web si neuloží nič. Po súhlase pribudne jediná
              ďalšia cookie — voľba svetlého alebo tmavého režimu — a odvolať ho
              vieš kedykoľvek cez koliesko v pravom dolnom rohu.
            </p>
          </LegalNote>
        }
      />

      <RelatedPages items={[...otherLegalPages("/cookies")]} />
    </SubPage>
  );
}
