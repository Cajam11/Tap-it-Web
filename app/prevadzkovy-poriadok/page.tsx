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
import { prevadzkovyPoriadokSeo } from "../site-pages";

export const metadata: Metadata = pageMetadata(prevadzkovyPoriadokSeo);

/** Kategórie incidentov. Reakčný čas = čas do prvej odpovede, nie do vyriešenia. */
const incidentRows = [
  [
    "P1 — kritický",
    "Členovia sa nedostanú do prevádzky, systém je nedostupný alebo vstup neoveruje členstvá.",
    "Do 2 hodín v prevádzkových hodinách podpory",
    "Priebežná informácia každé 4 hodiny až do obnovenia prevádzky",
  ],
  [
    "P2 — vysoký",
    "Časť systému nefunguje, existuje však náhradný postup — napríklad manuálny vstup cez recepciu.",
    "Do 1 pracovného dňa",
    "Informácia o postupe riešenia do 2 pracovných dní",
  ],
  [
    "P3 — bežný",
    "Kozmetická vada, otázka k používaniu alebo požiadavka na zmenu bez dopadu na prevádzku.",
    "Do 3 pracovných dní",
    "Zaradenie do plánu prác a informácia o termíne",
  ],
] as const;

const articles: readonly LegalArticle[] = [
  {
    id: "predmet",
    title: "Predmet prevádzkového poriadku",
    clauses: [
      {
        text: "Tento prevádzkový poriadok upravuje pravidlá, za akých beží systém Tap-it Fitness OS u klienta: dostupnosť, údržbu, podporu, riešenie incidentov, zálohovanie a povinnosti oboch strán počas prevádzky.",
      },
      {
        text: (
          <>
            Je súčasťou{" "}
            <LegalLink href="/obchodne-podmienky">
              Všeobecných obchodných podmienok
            </LegalLink>{" "}
            a dopĺňa ich. Ak konkrétna zmluva s klientom určuje iné parametre —
            napríklad podporu mimo bežných hodín — má prednosť zmluva.
          </>
        ),
      },
      {
        text: "Poriadok sa vzťahuje na klienta, jeho zamestnancov a na osoby, ktoré s jeho súhlasom systém používajú alebo doň zasahujú.",
      },
    ],
  },
  {
    id: "dostupnost",
    title: "Prevádzka a dostupnosť systému",
    clauses: [
      {
        text: "Systém beží v cloudovom prostredí a je dostupný nepretržite, 24 hodín denne, s výnimkou plánovanej údržby podľa čl. 3.",
      },
      {
        text: "Cieľová dostupnosť je 99,5 % mesačne, meraná mimo času plánovanej údržby. Konkrétne garantované parametre a prípadné sankcie určuje zmluva.",
      },
      {
        text: "Do dostupnosti sa nezapočítava čas, počas ktorého je systém nedostupný z dôvodov na strane klienta alebo tretích strán, najmä:",
        items: [
          "výpadok internetového pripojenia alebo elektriny v prevádzke,",
          "porucha turniketu, skenera alebo iného hardvéru klienta,",
          "zásah personálu klienta do konfigurácie alebo hardvéru,",
          "výpadok služby tretej strany, napríklad platobnej brány,",
          "okolnosti vylučujúce zodpovednosť podľa čl. 17 VOP.",
        ],
      },
    ],
  },
  {
    id: "planovana-udrzba",
    title: "Plánovaná údržba",
    clauses: [
      {
        text: "Plánovanú údržbu vykonávame spravidla v čase medzi 00:00 a 05:00, teda mimo prevádzkovej špičky väčšiny fitiek.",
      },
      {
        text: "Údržbu, ktorá môže obmedziť používanie systému, oznámime klientovi najmenej 48 hodín vopred spolu s očakávaným trvaním.",
      },
      {
        text: "Bezpečnostné zásahy, ktoré neznesú odklad, môžeme vykonať aj bez dodržania tejto lehoty. Klienta o nich informujeme bez zbytočného odkladu.",
      },
      {
        text: "Pri nonstop a bezobslužných prevádzkach si termín údržby dohodneme individuálne tak, aby vstup členov zostal funkčný.",
      },
    ],
  },
  {
    id: "podpora",
    title: "Podpora a prevádzkové hodiny",
    clauses: [
      {
        text: `Podporu poskytujeme e-mailom na adrese ${legalEntity.email} a prostredníctvom kanála dohodnutého v zmluve. Za nahlásenie sa považuje správa doručená na tieto kontakty, nie ústna zmienka pri inej príležitosti.`,
      },
      {
        text: "Prevádzkové hodiny podpory sú pracovné dni od 9:00 do 17:00 okrem štátnych sviatkov v Slovenskej republike. Požiadavky doručené mimo tohto času sa považujú za doručené na začiatku najbližšieho pracovného dňa.",
      },
      {
        text: "Kritické incidenty (P1) mimo prevádzkových hodín riešime v rozsahu dohodnutom v zmluve. Pre bezobslužné a nonstop fitká odporúčame dohodnúť rozšírené pokrytie ešte pred spustením.",
      },
      {
        text: "Podpora zahŕňa riešenie vád, prevádzkové otázky a drobné konfiguračné zmeny. Nezahŕňa vývoj nových funkcií, ktorý sa dojednáva samostatne ako zmena rozsahu.",
      },
    ],
  },
  {
    id: "incidenty",
    title: "Klasifikácia incidentov a reakčné časy",
    clauses: [
      {
        text: "Nahlásené incidenty zaraďujeme podľa dopadu na prevádzku. Rozhodujúce je, či sa člen dostane do fitka, nie to, ako nepríjemne chyba vyzerá.",
        block: (
          <LegalTable
            columns={["Kategória", "Kedy sa použije", "Reakčný čas", "Ďalší postup"]}
            rows={incidentRows.map((row) => [...row])}
          />
        ),
      },
      {
        text: "Reakčný čas je čas do prvej odpovede a začatia riešenia, nie čas do odstránenia vady. Čas odstránenia závisí od povahy vady a oznámime ho pri prvej odpovedi.",
      },
      {
        text: "Kategóriu určuje poskytovateľ na základe popisu a overenia dopadu. Ak sa s ňou klient nestotožňuje, prehodnotíme ju spolu s ním.",
      },
      {
        text: "Ak vadu nemožno odstrániť ihneď, navrhneme náhradný postup (workaround), aby prevádzka mohla pokračovať.",
      },
    ],
  },
  {
    id: "nahlasenie",
    title: "Ako nahlásiť incident",
    clauses: [
      {
        text: "Aby sme incident vedeli riešiť hneď a nie po troch spätných otázkach, do hlásenia patrí:",
        items: [
          "prevádzka a konkrétny vstup, ktorého sa to týka,",
          "presný čas, kedy problém nastal,",
          "meno člena alebo účet, na ktorom sa prejavil,",
          "čo sa zobrazilo na skeneri, v aplikácii alebo v admin paneli — ideálne fotografia či snímka obrazovky,",
          "či sa problém opakuje a či sa týka všetkých členov alebo len jedného,",
          "meno a telefónne číslo osoby, s ktorou vieme problém overiť.",
        ],
      },
      {
        text: "Prijatie hlásenia potvrdíme a pridelíme mu kategóriu podľa čl. 5. Klienta informujeme o vyriešení a v prípade kritického incidentu aj o príčine.",
      },
      {
        text: "Kritické incidenty odporúčame hlásiť aj telefonicky na kontakt dohodnutý v zmluve, ak je taký zriadený. E-mail zostáva záznamom o nahlásení.",
      },
    ],
  },
  {
    id: "vypadkove-scenare",
    title: "Výpadkové scenáre v prevádzke",
    clauses: [
      {
        text: (
          <>
            Postup pre situácie, keď niečo nefunguje, sa dohaduje pri
            prevádzkovom audite a je súčasťou nasadenia — nie doplnkom po ňom.
            Podrobnosti sú na stránke{" "}
            <LegalLink href="/bezobsluzne-fitko">
              Bezobslužné a nonstop fitká
            </LegalLink>
            .
          </>
        ),
      },
      {
        text: "Pri každom nasadení musí byť pred spustením rozhodnuté, čo sa má stať pri:",
        items: [
          "výpadku internetu alebo elektriny v prevádzke,",
          "poruche turniketu alebo skenera,",
          "neplatnom, expirovanom alebo zmrazenom členstve,",
          "chybe platby na strane platobnej brány,",
          "vstupe mimo otváracích hodín a v bezobslužnom režime.",
        ],
      },
      {
        text: "Recepcia má vždy k dispozícii manuálny postup pre vstup člena, ktorý sa nedostane dnu štandardnou cestou. Každý takýto vstup sa zapisuje, aby zostal dohľadateľný.",
      },
      {
        text: "V bezobslužnej prevádzke nie je na mieste nikto, kto by výnimku vyriešil, preto musí byť pravidlo rozhodnuté dopredu. Klient zodpovedá za to, že členovia poznajú kontakt pre prípad, že sa nedostanú dnu.",
      },
    ],
  },
  {
    id: "zalohovanie",
    title: "Zálohovanie a obnova",
    clauses: [
      {
        text: "Dáta systému zálohujeme denne. Zálohy sú šifrované a uchovávané oddelene od produkčného prostredia.",
      },
      {
        text: "Zálohy uchovávame 30 dní, ak nie je v zmluve dohodnutá dlhšia retencia.",
      },
      {
        text: "Cieľový bod obnovy (RPO) je 24 hodín a cieľový čas obnovy (RTO) 8 pracovných hodín od rozhodnutia o obnove.",
      },
      {
        text: "Obnovu zo zálohy vykonávame na žiadosť klienta alebo z vlastného rozhodnutia pri incidente. O obnove, ktorá by znamenala stratu novších dát, klienta vopred informujeme.",
      },
      {
        text: "Funkčnosť obnovy overujeme pravidelne. Záloha, ktorá sa nikdy neobnovovala, nie je zálohou.",
      },
    ],
  },
  {
    id: "aktualizacie",
    title: "Aktualizácie a nové verzie",
    clauses: [
      {
        text: "Systém aktualizujeme priebežne, spravidla bez odstávky. Opravy chýb a bezpečnostné aktualizácie nasadzujeme bez zbytočného odkladu.",
      },
      {
        text: "Zmeny, ktoré menia zaužívaný postup na recepcii alebo vzhľad aplikácie pre členov, oznámime najmenej 7 dní vopred spolu s krátkym popisom toho, čo sa mení.",
      },
      {
        text: "Aktualizácie sú súčasťou mesačného poplatku. Nové moduly nad rámec dohodnutého rozsahu sa dojednávajú samostatne.",
      },
      {
        text: "Klient je povinný používať aktuálnu verziu mobilnej aplikácie a podporovaný prehliadač v admin paneli. Na zastaraných verziách nevieme zaručiť správne fungovanie.",
      },
    ],
  },
  {
    id: "pristupy-a-role",
    title: "Prístupy, role a účty",
    clauses: [
      {
        text: "Účty v admin paneli sú menné. Zdieľané prihlasovacie údaje na recepcii sú bezpečnostné riziko a nie sú prípustné, pretože znemožňujú dohľadať, kto výnimku v systéme vykonal.",
      },
      {
        text: "Prístupy prideľujeme podľa princípu najmenšieho potrebného oprávnenia. Za správu rolí a za včasné odobratie prístupu pri ukončení pracovného pomeru zodpovedá klient.",
      },
      {
        text: "Klient chráni prihlasovacie údaje pred zneužitím a bez zbytočného odkladu nám hlási podozrenie na ich vyzradenie.",
      },
      {
        text: "K produkčným dátam klienta pristupujeme len vtedy, keď je to nevyhnutné na riešenie incidentu alebo na základe jeho pokynu. Osoby s prístupom sú viazané mlčanlivosťou.",
      },
    ],
  },
  {
    id: "bezpecnostne-incidenty",
    title: "Bezpečnostné incidenty",
    clauses: [
      {
        text: "Podozrenie na bezpečnostný incident — neoprávnený prístup, únik údajov, zneužitie účtu — hlási každá strana druhej bez zbytočného odkladu.",
      },
      {
        text: "Porušenie ochrany osobných údajov oznámime klientovi najneskôr do 24 hodín od jeho zistenia, aby stihol splniť vlastnú 72-hodinovú oznamovaciu povinnosť voči dozornému orgánu podľa čl. 33 GDPR.",
      },
      {
        text: "Poskytneme klientovi súčinnosť pri posúdení rozsahu incidentu, pri oznámení dozornému orgánu aj pri prípadnom informovaní dotknutých osôb.",
      },
    ],
  },
  {
    id: "hardver-v-prevadzke",
    title: "Hardvér v prevádzke",
    clauses: [
      {
        text: "Turnikety, skenery a tablety sú majetkom klienta. Zodpovedá za ich napájanie, sieťové pripojenie, čistotu čítacej plochy a fyzickú ochranu.",
      },
      {
        text: "Pri poruche hardvéru pomôžeme s diagnostikou a rozlíšením, či je príčina na strane zariadenia alebo systému. Samotný servis a reklamáciu rieši klient s dodávateľom zariadenia.",
      },
      {
        text: "Zmenu hardvéru, prekonfigurovanie vstupu alebo pridanie nového vchodu nám klient oznámi vopred, aby sa dali upraviť vstupné pravidlá a scan logy.",
      },
      {
        text: "Pri prevádzkach s jedným vstupom odporúčame držať náhradný skener alebo pripravený manuálny postup — porucha jediného zariadenia inak zastaví vstup celej prevádzky.",
      },
    ],
  },
  {
    id: "povinnosti-klienta",
    title: "Povinnosti klienta",
    clauses: [
      {
        text: "Klient udržiava aktuálny zoznam kontaktných osôb pre incidenty vrátane telefónneho čísla dostupného počas otváracích hodín.",
      },
      {
        text: "Klient zaškolí nových zamestnancov pred tým, než začnú systém používať, a zabezpečí, aby postupy pri vstupe a výnimkách dodržiavali.",
      },
      {
        text: "Klient nezasahuje do systému mimo dostupného rozhrania, nepokúša sa obísť vstupné pravidlá a neposkytuje prístup tretím osobám.",
      },
      {
        text: "Zmeny v prevádzke, ktoré sa dotknú nastavenia systému — nové otváracie hodiny, nový typ členstva, ďalší vchod, sezónne pravidlá — nám klient oznámi s dostatočným predstihom.",
      },
      {
        text: "Klient zodpovedá za obsah, ktorý do systému vloží, najmä za správnosť údajov o členoch a členstvách a za oznamy zobrazované členom.",
      },
    ],
  },
  {
    id: "skolenie",
    title: "Školenie a zmeny v tíme",
    clauses: [
      {
        text: "Vstupné školenie tímu je súčasťou implementácie. Prechádza sa na ňom bežný vstup, riešenie neplatného členstva, manuálny vstup, rezervácie a záložný postup pri výpadku.",
      },
      {
        text: "Klient dostane písomný prehľad postupov, ktorý môže odovzdať novým zamestnancom bez toho, aby sa školenie muselo opakovať.",
      },
      {
        text: "Ďalšie školenia nad rámec dohodnutého počtu vieme zabezpečiť za odplatu podľa platnej sadzby.",
      },
    ],
  },
  {
    id: "ukoncenie-prevadzky",
    title: "Ukončenie prevádzky",
    clauses: [
      {
        text: "Po skončení zmluvy pripravíme export dát klienta v bežnom strojovo čitateľnom formáte do 30 dní od skončenia.",
      },
      {
        text: "Po uplynutí ďalších 30 dní dáta z produkčného prostredia vymažeme; zo záloh zaniknú uplynutím retenčnej doby podľa čl. 8.",
      },
      {
        text: "Odovzdáme informácie o konfigurácii hardvéru, aby vedel klient zariadenia ďalej používať s iným riešením. Zariadenia zostávajú jeho.",
      },
    ],
  },
  {
    id: "zmeny-poriadku",
    title: "Zmeny prevádzkového poriadku",
    clauses: [
      {
        text: "Poriadok môžeme zmeniť, ak sa zmení technické prostredie, rozsah služby alebo právne predpisy. Zmenu oznámime najmenej 30 dní pred jej účinnosťou.",
      },
      {
        text: "Ak klient so zmenou nesúhlasí, môže do nadobudnutia jej účinnosti zmluvu vypovedať postupom podľa čl. 15 VOP.",
      },
      {
        text: `Toto znenie je účinné od ${legalEffectiveLabel}.`,
      },
    ],
  },
];

export default function PrevadzkovyPoriadokPage() {
  return (
    <SubPage>
      <JsonLd data={pageStructuredData(prevadzkovyPoriadokSeo)} />

      <LegalHero
        breadcrumb={prevadzkovyPoriadokSeo.breadcrumb}
        title="Prevádzkový poriadok"
        lead="Pravidlá, za akých Tap-it Fitness OS beží u klienta: kedy je dostupný, kedy sa opravuje, ako sa hlási incident, čo sa deje pri výpadku a čo musí zvládnuť recepcia bez nás."
        meta={[
          { label: "Účinnosť od", value: legalEffectiveLabel },
          { label: "Verzia", value: legalVersion },
          { label: "Týka sa", value: "Prevádzky Tap-it Fitness OS" },
        ]}
      />

      <LegalDocument
        articles={articles}
        intro={
          <LegalNote title="Toto nie je prevádzkový poriadok fitness centra">
            <p>
              Dokument upravuje prevádzku softvérovej služby — dostupnosť,
              podporu, incidenty a zálohy. Nenahrádza prevádzkový poriadok
              prevádzky podľa § 26 zákona č. 355/2007 Z. z. o ochrane verejného
              zdravia, ktorý si fitness centrum vypracúva samo a schvaľuje ho
              regionálny úrad verejného zdravotníctva.
            </p>
          </LegalNote>
        }
      />

      <RelatedPages items={[...otherLegalPages("/prevadzkovy-poriadok")]} />
    </SubPage>
  );
}
