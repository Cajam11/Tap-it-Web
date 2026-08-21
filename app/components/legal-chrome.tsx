import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

import { legalEntity } from "../legal-content";
import { LegalToc } from "./legal-toc";

/**
 * Rozloženie pre právne dokumenty. Rovnako ako `page-chrome` je to server
 * component so statickým markupom a CSS reveal efektom: obsah musí byť čitateľný
 * v prerenderovanom HTML aj vtedy, keď hydratácia nikdy nedobehne.
 *
 * Oproti obchodným stránkam tu nie je CTA na audit — dokument má byť dokument,
 * nie ďalší predajný krok.
 */

/** Jeden bod článku: text a voliteľný odrážkový zoznam pod ním. */
export type LegalClause = {
  text: ReactNode;
  items?: readonly ReactNode[];
  /**
   * Blokový obsah pod bodom — tabuľka alebo poznámka. Vykresľuje sa mimo `<p>`,
   * lebo odsek nesmie obsahovať blokové prvky.
   */
  block?: ReactNode;
};

export type LegalArticle = {
  /** Kotva pre obsah dokumentu; musí byť v rámci stránky jedinečná. */
  id: string;
  title: string;
  clauses: readonly LegalClause[];
};

export function LegalHero({
  breadcrumb,
  title,
  lead,
  meta,
}: {
  breadcrumb: string;
  title: string;
  lead: string;
  /** Hlavička dokumentu: účinnosť, verzia, komu je určený. */
  meta: readonly { label: string; value: ReactNode }[];
}) {
  return (
    <section className="px-4 pb-10 pt-28 sm:px-6 sm:pt-32 lg:pb-14 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Omrvinková navigácia">
          <ol className="hero-reveal hero-reveal-1 flex flex-wrap items-center gap-1 text-xs font-bold text-slate-500">
            <li>
              <Link href="/" className="transition hover:text-white">
                Domov
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-500">
              <ChevronRight className="h-3 w-3" />
            </li>
            <li className="text-accent-soft">{breadcrumb}</li>
          </ol>
        </nav>

        <p className="section-kicker hero-reveal hero-reveal-2 mt-8 block">
          Právne informácie
        </p>
        <h1 className="hero-reveal hero-reveal-2 mt-4 max-w-4xl text-3xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl sm:leading-[1.05]">
          {title}
        </h1>
        <p className="hero-reveal hero-reveal-3 mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:mt-6 sm:text-base sm:leading-8">
          {lead}
        </p>

        {/* Na mobile beží každý údaj ako riadok štítok–hodnota, aby hlavička
            dokumentu nezabrala pol obrazovky ešte pred prvým článkom. */}
        <dl className="hero-reveal hero-reveal-4 mt-8 grid gap-2 sm:mt-10 sm:grid-cols-3 sm:gap-3">
          {meta.map((item) => (
            <div
              key={item.label}
              className="flex items-baseline justify-between gap-3 rounded-2xl border border-white/10 bg-surface px-4 py-3 sm:block sm:px-5 sm:py-4"
            >
              <dt className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                {item.label}
              </dt>
              <dd className="min-w-0 text-right text-sm font-bold tracking-tight text-white sm:mt-1.5 sm:text-left">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/**
 * Dokument s obsahom vľavo a článkami vpravo. Obsah je obyčajný zoznam kotiev,
 * takže funguje bez JavaScriptu; `scroll-mt-28` drží nadpis pod fixnou navigáciou.
 * Zvýraznenie práve čítaného článku rieši `LegalToc` — jediná klientská časť
 * inak statickej stránky.
 */
export function LegalDocument({
  articles,
  intro,
}: {
  articles: readonly LegalArticle[];
  intro?: ReactNode;
}) {
  return (
    <section className="px-4 pb-16 sm:px-6 lg:pb-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-12">
        <LegalToc
          items={articles.map(({ id, title }) => ({ id, title }))}
        />

        <div className="min-w-0 rounded-3xl border border-white/10 bg-surface p-5 shadow-card sm:p-9 lg:p-10">
          {intro ? <div className="mb-10 sm:mb-12">{intro}</div> : null}

          <div className="grid gap-10 sm:gap-12">
            {articles.map((article, index) => (
              <LegalArticleBlock
                key={article.id}
                article={article}
                number={index + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LegalArticleBlock({
  article,
  number,
}: {
  article: LegalArticle;
  number: number;
}) {
  return (
    <article
      id={article.id}
      className="scroll-mt-28 border-t border-white/10 pt-12 first:border-t-0 first:pt-0"
    >
      <p className="text-xs font-black uppercase tracking-[0.16em] text-accent-soft">
        Čl. {number}
      </p>
      <h2 className="mt-3 text-lg font-black leading-tight tracking-tight text-white sm:text-2xl">
        {article.title}
      </h2>

      {/* Číslo bodu je na telefóne vlastný riadok nad textom: ako bočný stĺpec
          by ukroplo 56 z ~250 px, ktoré na odsek vôbec zostávajú. */}
      <ol className="mt-6 grid gap-5">
        {article.clauses.map((clause, index) => (
          <li key={index} className="grid gap-1 sm:flex sm:gap-4">
            <span className="font-display text-xs font-semibold tabular-nums text-slate-500 sm:w-11 sm:shrink-0 sm:text-sm sm:leading-7">
              {number}.{index + 1}
            </span>
            <div className="min-w-0">
              <p className="break-words text-sm leading-7 text-slate-400">
                {clause.text}
              </p>
              {clause.items ? (
                <ul className="mt-3 grid gap-2">
                  {clause.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-3 h-1 w-1 shrink-0 rounded-full bg-accent"
                      />
                      <span className="min-w-0 break-words text-sm leading-7 text-slate-400">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {clause.block ? (
                <div className="mt-4">{clause.block}</div>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}

/** Zvýraznená poznámka — na veci, ktoré si čitateľ nemá prehliadnuť. */
export function LegalNote({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-accent/30 bg-accent-faint p-4 sm:p-6">
      <h3 className="text-sm font-black tracking-tight text-white">{title}</h3>
      <div className="mt-2.5 grid gap-3 text-sm leading-7 text-slate-400">
        {children}
      </div>
    </div>
  );
}

/**
 * Tabuľka na účely spracúvania a na zoznam cookies.
 *
 * Štyri stĺpce právneho textu sa do šírky telefónu nezmestia a bočné rolovanie
 * na nich znamená, že polovicu obsahu nikto neuvidí. Pod `lg` sa preto každý
 * riadok vykreslí ako karta — prvá bunka je jej nadpis, zvyšok dvojice
 * štítok–hodnota. Tabuľka sa vracia až tam, kde má stĺpec skutočne priestor.
 *
 * Obe podoby čítajú tie isté dáta a v každom bode je práve jedna `display:none`,
 * takže sa čítačke obrazovky nikdy neponúknu dvakrát.
 */
export function LegalTable({
  columns,
  rows,
  caption,
}: {
  columns: readonly string[];
  rows: readonly (readonly ReactNode[])[];
  caption?: string;
}) {
  return (
    <div>
      <ul className="grid gap-3 md:grid-cols-2 lg:hidden">
        {caption ? (
          <li className="text-xs font-bold uppercase tracking-wider text-slate-500 md:col-span-2">
            {caption}
          </li>
        ) : null}
        {rows.map((row, rowIndex) => (
          <li
            key={rowIndex}
            className="rounded-2xl border border-white/10 bg-base p-4"
          >
            <p className="break-words text-sm font-bold leading-6 text-white">
              {row[0]}
            </p>
            <dl className="mt-3 grid gap-3 border-t border-white/10 pt-3">
              {columns.slice(1).map((column, columnIndex) => (
                <div key={column}>
                  <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    {column}
                  </dt>
                  <dd className="mt-1 break-words text-sm font-semibold leading-6 text-slate-400">
                    {row[columnIndex + 1]}
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>

      <div className="hidden overflow-x-auto rounded-2xl border border-white/10 lg:block">
        <table className="w-full min-w-[44rem] border-collapse text-left">
          {caption ? (
            <caption className="border-b border-white/10 bg-base px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
              {caption}
            </caption>
          ) : null}
          <thead>
            <tr className="bg-base">
              {columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="border-b border-white/10 px-4 py-3 text-xs font-black uppercase tracking-wider text-slate-300"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-t border-white/10 first:border-t-0"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`px-4 py-4 align-top text-sm leading-6 ${
                      cellIndex === 0
                        ? "whitespace-nowrap font-bold text-white"
                        : "font-semibold text-slate-400"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * Nedoplnený údaj vo vývoji — viditeľná pripomienka, že dokument čaká na dáta.
 * V produkcii sa taký riadok nevykreslí vôbec (pozri `EntityFacts`).
 */
function MissingValue() {
  return (
    <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent-faint px-2.5 py-0.5 text-xs font-bold text-accent-soft">
      doplniť
    </span>
  );
}

type EntityRow = { label: string; value: string | null; href?: string };

/**
 * Identifikačné údaje poskytovateľa — rovnaké vo VOP aj vo vyhlásení o ochrane
 * údajov.
 *
 * Kým firma nie je zapísaná, nemáme čo do väčšiny polí napísať. Vo vývoji sa
 * preto prázdne riadky ukazujú ako „doplniť", aby na ne nikto nezabudol, ale v
 * produkcii sa nevykreslia — rad červených chipov v publikovanom právnom
 * dokumente pôsobí ako chyba a povinné údaje aj tak nenahradí. Zostane len to,
 * čo je pravda: kto web prevádzkuje a ako sa naň dá ozvať.
 *
 * Vo chvíli, keď sa v `legalEntity` objaví obchodné meno, sa plná tabuľka
 * vráti sama a bez ďalšieho zásahu.
 */
export function EntityFacts() {
  const showPlaceholders = process.env.NODE_ENV === "development";
  const isIdentified = Boolean(legalEntity.legalName);

  const rows: readonly EntityRow[] = [
    { label: "Obchodné meno", value: legalEntity.legalName },
    { label: "Sídlo", value: legalEntity.address },
    { label: "IČO", value: legalEntity.ico },
    { label: "DIČ", value: legalEntity.dic },
    // IČ DPH pýta § 4 zákona o elektronickom obchode len od platiteľa DPH,
    // takže prázdne pole tu nie je medzera, ale platná odpoveď.
    { label: "IČ DPH", value: legalEntity.icDph },
    { label: "Zápis v registri", value: legalEntity.register },
    {
      label: "Telefón",
      value: legalEntity.phone,
      href: legalEntity.phone ? `tel:${legalEntity.phone.replace(/\s/g, "")}` : undefined,
    },
    {
      label: "E-mail",
      value: legalEntity.email,
      href: `mailto:${legalEntity.email}`,
    },
  ];

  const visibleRows = showPlaceholders
    ? rows
    : [
        ...(isIdentified
          ? []
          : [{ label: "Prevádzkovateľ", value: legalEntity.tradeName }]),
        ...rows.filter((row) => row.value),
      ];

  return (
    <dl className="grid gap-2 sm:grid-cols-2 sm:gap-3">
      {visibleRows.map((row) => (
        <div
          key={row.label}
          className="rounded-2xl border border-white/10 bg-base px-4 py-3 sm:px-5 sm:py-4"
        >
          <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            {row.label}
          </dt>
          <dd className="mt-1.5 break-words text-sm font-bold tracking-tight text-white">
            {row.value ? (
              row.href ? (
                <a
                  href={row.href}
                  className="text-accent-soft transition hover:text-white"
                >
                  {row.value}
                </a>
              ) : (
                row.value
              )
            ) : (
              <MissingValue />
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Odkaz vnútri právneho textu — na inú stránku alebo na kotvu v dokumente. */
export function LegalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a
        href={href}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="font-semibold text-accent-soft underline decoration-accent/40 underline-offset-4 transition hover:text-white"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="font-semibold text-accent-soft underline decoration-accent/40 underline-offset-4 transition hover:text-white"
    >
      {children}
    </Link>
  );
}
