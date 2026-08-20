/**
 * Konštanty zdieľané všetkými štyrmi právnymi dokumentmi.
 *
 * Identifikačné údaje firmy sú zámerne `null` tam, kde ich nemáme — právna
 * stránka radšej ukáže viditeľné „doplniť“, než by mala uvádzať vymyslené IČO
 * alebo sídlo. Doplň ich tu na jednom mieste a prejaví sa to vo všetkých
 * dokumentoch naraz.
 */

export type LegalEntity = {
  /** Značka, pod ktorou vystupujeme navonok. */
  tradeName: string;
  /** Obchodné meno podľa obchodného alebo živnostenského registra. */
  legalName: string | null;
  /** Sídlo alebo miesto podnikania. */
  address: string | null;
  ico: string | null;
  dic: string | null;
  /** IČ DPH — `null`, ak nie sme platiteľom DPH. */
  icDph: string | null;
  /** Napr. „Okresný súd Bratislava III, oddiel: Sro, vložka č. …“. */
  register: string | null;
  email: string;
  phone: string | null;
};

export const legalEntity: LegalEntity = {
  tradeName: "Tap-it",
  legalName: null,
  address: null,
  ico: null,
  dic: null,
  icDph: null,
  register: null,
  email: "info@tap-it.sk",
  phone: null,
};

/** Účinnosť aktuálneho znenia všetkých štyroch dokumentov. */
export const legalEffectiveIso = "2026-08-20";
export const legalEffectiveLabel = "20. augusta 2026";
export const legalVersion = "1.0";

/** Dozorné orgány, na ktoré sa dokumenty odvolávajú. */
export const supervisoryAuthorities = {
  dataProtection: {
    name: "Úrad na ochranu osobných údajov Slovenskej republiky",
    address: "Hraničná 12, 820 07 Bratislava 27",
    email: "statny.dozor@pdp.gov.sk",
    web: "https://dataprotection.gov.sk",
  },
  trade: {
    name: "Slovenská obchodná inšpekcia (ústredný inšpektorát)",
    address: "Bajkalská 21/A, P. O. BOX 29, 827 99 Bratislava",
    web: "https://www.soi.sk",
  },
} as const;

/** Krížové odkazy medzi právnymi dokumentmi — každý ukáže tie ostatné tri. */
export const legalPageLinks = [
  {
    href: "/obchodne-podmienky",
    title: "Všeobecné obchodné podmienky",
    text: "Rozsah služieb, cena a platby, licencia, zodpovednosť a ukončenie spolupráce.",
  },
  {
    href: "/ochrana-osobnych-udajov",
    title: "Ochrana osobných údajov",
    text: "Aké údaje spracúvame, na akom právnom základe, ako dlho a aké máš práva.",
  },
  {
    href: "/prevadzkovy-poriadok",
    title: "Prevádzkový poriadok",
    text: "Dostupnosť, podpora, incidenty, zálohy a výpadkové scenáre v prevádzke.",
  },
  {
    href: "/cookies",
    title: "Cookies",
    text: "Jediná cookie, ktorú web ukladá, a prečo tu nie je cookie lišta.",
  },
] as const;

/** Ostatné tri dokumenty — na krížové odkazy v päte každého z nich. */
export function otherLegalPages(currentHref: string) {
  return legalPageLinks.filter((page) => page.href !== currentHref);
}
