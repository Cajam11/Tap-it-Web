import type { Metadata } from "next";

import { JsonLd } from "../components/json-ld";
import {
  EntityFacts,
  LegalDocument,
  LegalHero,
  LegalLink,
  LegalNote,
  type LegalArticle,
} from "../components/legal-chrome";
import { RelatedPages, SubPage } from "../components/page-chrome";
import {
  legalEffectiveLabel,
  legalVersion,
  otherLegalPages,
  supervisoryAuthorities,
} from "../legal-content";
import { pageMetadata, pageStructuredData } from "../seo-content";
import { obchodnePodmienkySeo } from "../site-pages";

export const metadata: Metadata = pageMetadata(obchodnePodmienkySeo);

const articles: readonly LegalArticle[] = [
  {
    id: "uvodne-ustanovenia",
    title: "Úvodné ustanovenia",
    clauses: [
      {
        text: "Tieto všeobecné obchodné podmienky (ďalej len „VOP“) upravujú práva a povinnosti medzi Tap-it ako poskytovateľom a klientom pri dodaní služieb uvedených v čl. 3. Identifikačné údaje poskytovateľa sú uvedené v úvode tohto dokumentu.",
      },
      {
        text: "VOP sú neoddeliteľnou súčasťou každej zmluvy, objednávky alebo akceptovanej cenovej ponuky medzi poskytovateľom a klientom. Odchylné dojednania v zmluve alebo v akceptovanej ponuke majú prednosť pred znením VOP.",
      },
      {
        text: (
          <>
            Prevádzkové pravidlá behu systému — dostupnosť, podpora, reakčné
            časy, zálohovanie a postup pri incidentoch — upravuje{" "}
            <LegalLink href="/prevadzkovy-poriadok">
              Prevádzkový poriadok
            </LegalLink>
            , ktorý je súčasťou týchto VOP.
          </>
        ),
      },
      {
        text: "Služby poskytovateľa sú určené podnikateľom, teda fitness centrám, gymom a ďalším prevádzkam a firmám. Vzťah medzi poskytovateľom a klientom-podnikateľom sa spravuje Obchodným zákonníkom. Ak klient výnimočne vystupuje ako spotrebiteľ, uplatní sa navyše čl. 18.",
      },
      {
        text: "Právne vzťahy neupravené VOP ani zmluvou sa spravujú právnym poriadkom Slovenskej republiky.",
      },
    ],
  },
  {
    id: "vymedzenie-pojmov",
    title: "Vymedzenie pojmov",
    clauses: [
      {
        text: "Na účely týchto VOP majú nasledujúce pojmy tento význam:",
        items: [
          <>
            <strong className="font-bold text-white">Poskytovateľ</strong> —
            Tap-it, subjekt identifikovaný v úvode tohto dokumentu.
          </>,
          <>
            <strong className="font-bold text-white">Klient</strong> — fyzická
            alebo právnická osoba, ktorá si od poskytovateľa objednala službu.
          </>,
          <>
            <strong className="font-bold text-white">Systém</strong> — Tap-it
            Fitness OS vrátane admin panelu, mobilnej aplikácie pre členov a
            napojenia na vstupný hardvér, v rozsahu dohodnutom v zmluve.
          </>,
          <>
            <strong className="font-bold text-white">Audit</strong> — bezplatný
            prevádzkový audit podľa čl. 4.
          </>,
          <>
            <strong className="font-bold text-white">Implementácia</strong> —
            jednorazové nasadenie systému: migrácia dát, konfigurácia pravidiel a
            rolí, napojenie hardvéru, príprava adminu a aplikácie a školenie tímu.
          </>,
          <>
            <strong className="font-bold text-white">Prevádzka</strong> — beh
            systému, aktualizácie a podpora, spoplatnené mesačným poplatkom.
          </>,
          <>
            <strong className="font-bold text-white">Hardvér</strong> —
            turnikety, QR skenery, tablety a ďalšie zariadenia na strane
            prevádzky klienta.
          </>,
          <>
            <strong className="font-bold text-white">Člen</strong> — koncový
            používateľ na strane klienta, teda člen fitka, ktorý systém používa
            na vstup, rezervácie a platby.
          </>,
        ],
      },
    ],
  },
  {
    id: "predmet-sluzieb",
    title: "Predmet a rozsah služieb",
    clauses: [
      {
        text: "Poskytovateľ dodáva najmä tieto služby:",
        items: [
          "bezplatný prevádzkový audit a návrh rozsahu nasadenia,",
          "implementáciu systému Tap-it Fitness OS vrátane migrácie dát z existujúceho riešenia,",
          "prevádzku systému, jeho aktualizácie a podporu,",
          "návrh a vývoj webových stránok, redizajnov, custom softvéru a e-shopov.",
        ],
      },
      {
        text: "Konkrétny rozsah, míľniky a termíny určuje zmluva alebo akceptovaná cenová ponuka. Rozsah vychádza z výstupu auditu; funkcie, ktoré v ňom nie sú uvedené, nie sú predmetom plnenia.",
      },
      {
        text: "Poskytovateľ je oprávnený plniť aj prostredníctvom subdodávateľa. Za plnenie subdodávateľa zodpovedá klientovi tak, akoby plnil sám.",
      },
      {
        text: "Poskytovateľ nie je poskytovateľom platobných služieb. Ak systém sprostredkúva platby členov, tie prebiehajú cez platobnú bránu tretej strany, ktorej podmienky si klient dojednáva samostatne.",
      },
    ],
  },
  {
    id: "bezplatny-audit",
    title: "Bezplatný prevádzkový audit",
    clauses: [
      {
        text: (
          <>
            Spolupráca sa začína bezplatným prevádzkovým auditom. Audit je
            bezplatný a nezáväzný — klientovi z neho nevzniká povinnosť
            objednať si ďalšie plnenie. Podrobnosti o jeho priebehu sú na
            stránke <LegalLink href="/cena">Ako určujeme cenu</LegalLink>.
          </>
        ),
      },
      {
        text: "Výstupom auditu je mapa modulov a ich priorít, stav dát a zoznam toho, čo treba vyčistiť pred importom, návrh vstupu a hardvéru, zoznam rizík, návrh pilotného rozsahu a odhad termínu.",
      },
      {
        text: "Výstup auditu zostáva klientovi aj v prípade, že sa rozhodne pokračovať s iným dodávateľom alebo nepokračovať vôbec.",
      },
      {
        text: "Audit vychádza z informácií a podkladov, ktoré poskytne klient. Ak sa neskôr ukáže, že skutočný stav prevádzky, dát alebo hardvéru je iný, než bol pri audite uvedený, ide o dôvod na zmenu rozsahu, ceny a termínu podľa čl. 5.4.",
      },
      {
        text: "Audit nie je záväznou cenovou ponukou ani projektovou dokumentáciou a odhad termínu v ňom uvedený nie je záväzným termínom plnenia.",
      },
    ],
  },
  {
    id: "uzavretie-zmluvy",
    title: "Uzavretie zmluvy",
    clauses: [
      {
        text: "Na základe výstupu auditu pripraví poskytovateľ cenovú ponuku s rozsahom, cenou a rámcovým harmonogramom. Ponuka platí 30 dní od doručenia, ak v nej nie je uvedené inak.",
      },
      {
        text: "Zmluva vzniká podpisom zmluvy alebo písomnou akceptáciou cenovej ponuky zo strany klienta. Za písomnú formu sa na účely týchto VOP považuje aj e-mail odoslaný z kontaktnej adresy uvedenej v zmluve alebo v ponuke.",
      },
      {
        text: "Každá strana určí kontaktnú osobu oprávnenú odsúhlasovať rozsah a preberať plnenie. Zmenu kontaktnej osoby treba druhej strane oznámiť bez zbytočného odkladu.",
      },
      {
        text: "Zmeny rozsahu počas plnenia sa dohadujú písomne. Ak zmena ovplyvní cenu alebo termín, poskytovateľ na to klienta upozorní ešte pred jej realizáciou a zmenu vykoná až po jeho odsúhlasení.",
      },
    ],
  },
  {
    id: "cena-a-platby",
    title: "Cena a platobné podmienky",
    clauses: [
      {
        text: "Cena má dve zložky: jednorazovú cenu za implementáciu a mesačný poplatok za prevádzku systému. Výška oboch vychádza z dohodnutého rozsahu a veľkosti prevádzky, nie z tarifného balíka.",
      },
      {
        text: "Vstupný hardvér nie je súčasťou ceny podľa bodu 6.1. Klient si ho kupuje priamo od dodávateľa a zostáva v jeho vlastníctve — podrobnosti upravuje čl. 10.",
      },
      {
        text: "Všetky ceny sú uvedené bez dane z pridanej hodnoty. K cene sa účtuje DPH podľa platných právnych predpisov, ak je poskytovateľ jej platiteľom.",
      },
      {
        text: "Cena za implementáciu môže byť fakturovaná zálohovo alebo po dohodnutých míľnikoch. Mesačný poplatok sa fakturuje mesačne, prvý raz za mesiac, v ktorom prebehlo ostré prepnutie.",
      },
      {
        text: "Splatnosť faktúr je 14 dní od ich doručenia, ak nie je dohodnuté inak. Faktúra sa doručuje elektronicky a klient s takýmto doručovaním súhlasí.",
      },
      {
        text: "Pri omeškaní s úhradou má poskytovateľ nárok na úrok z omeškania podľa § 369 Obchodného zákonníka a súvisiacich predpisov.",
      },
      {
        text: "Pri omeškaní dlhšom ako 30 dní môže poskytovateľ po písomnom upozornení obmedziť prístup do admin panelu. Funkcie, od ktorých závisí vstup členov do prevádzky, obmedzí až po uplynutí ďalších 15 dní od takého upozornenia — systém, ktorý drží vstup do fitka, nemá byť vypnutý zo dňa na deň.",
      },
      {
        text: "Poskytovateľ môže raz ročne upraviť mesačný poplatok najviac o mieru inflácie podľa indexu spotrebiteľských cien vykázaného Štatistickým úradom SR. Úpravu oznámi najmenej 30 dní vopred; klient má v tejto lehote právo zmluvu vypovedať.",
      },
      {
        text: "Práce nad rámec dohodnutého rozsahu, opakované školenia nad dohodnutý počet a servisné zásahy zavinené klientom sa účtujú podľa platnej hodinovej sadzby, o ktorej je klient vopred informovaný.",
      },
    ],
  },
  {
    id: "sucinnost-klienta",
    title: "Súčinnosť klienta",
    clauses: [
      {
        text: "Klient poskytne poskytovateľovi súčinnosť potrebnú na plnenie, najmä:",
        items: [
          "exporty dát z existujúceho systému a informácie o ich štruktúre,",
          "prístupy k doménam, hostingu, e-mailu a k existujúcim systémom v potrebnom rozsahu,",
          "informácie o vstupných pravidlách, typoch členstiev a výnimkách, ktoré sa v prevádzke reálne používajú,",
          "pripravené prostredie na strane prevádzky: internetové pripojenie, elektrickú prípojku a miesto na osadenie hardvéru,",
          "dostupnosť kontaktnej osoby a personálu na testovanie, školenie a akceptáciu.",
        ],
      },
      {
        text: "Klient zodpovedá za správnosť, úplnosť a zákonnosť podkladov a dát, ktoré poskytovateľovi odovzdá, a za to, že je oprávnený ich odovzdať.",
      },
      {
        text: "Ak klient neposkytne súčinnosť riadne a včas, termíny sa predlžujú o čas omeškania a poskytovateľ nie je v omeškaní. Náklady vzniknuté z takéhoto omeškania znáša klient.",
      },
    ],
  },
  {
    id: "odovzdanie-a-akceptacia",
    title: "Odovzdanie a akceptácia",
    clauses: [
      {
        text: "Pred ostrým prepnutím prebieha skúšobná prevádzka a školenie tímu klienta. Cieľom je, aby recepcia poznala bežný vstup, riešenie neplatného členstva aj záložný postup skôr, než sa systém spustí naostro.",
      },
      {
        text: "Po odovzdaní plnenia alebo jeho míľnika má klient 5 pracovných dní na písomné uplatnenie výhrad. Ak v tejto lehote výhrady neuplatní alebo začne plnenie používať v ostrej prevádzke, plnenie sa považuje za akceptované.",
      },
      {
        text: "Drobné vady, ktoré nebránia používaniu plnenia na dohodnutý účel, nie sú dôvodom na odmietnutie akceptácie. Poskytovateľ ich odstráni v primeranej lehote.",
      },
      {
        text: "Ostré prepnutie sa uskutoční v termíne dohodnutom s klientom tak, aby čo najmenej zasiahlo do bežnej prevádzky.",
      },
    ],
  },
  {
    id: "prevadzka-a-podpora",
    title: "Prevádzka, podpora a dostupnosť",
    clauses: [
      {
        text: (
          <>
            Podmienky behu systému — cieľová dostupnosť, plánovaná údržba,
            prevádzkové hodiny podpory, klasifikácia incidentov a reakčné časy,
            zálohovanie a obnova — sú uvedené v{" "}
            <LegalLink href="/prevadzkovy-poriadok">
              Prevádzkovom poriadku
            </LegalLink>
            .
          </>
        ),
      },
      {
        text: "Poskytovateľ priebežne aktualizuje systém. Aktualizácie, ktoré menia zaužívané postupy na recepcii, oznamuje vopred v lehote uvedenej v Prevádzkovom poriadku.",
      },
      {
        text: "Poskytovateľ nezodpovedá za nedostupnosť spôsobenú výpadkom internetového pripojenia, elektriny alebo hardvéru na strane klienta, ani zásahom tretej strany do prostredia klienta.",
      },
    ],
  },
  {
    id: "hardver",
    title: "Vstupný hardvér",
    clauses: [
      {
        text: "Turnikety, QR skenery, tablety a ďalšie vstupné zariadenia si klient kupuje priamo od ich dodávateľa. Nie sú súčasťou ceny za implementáciu ani mesačného poplatku a zostávajú vo vlastníctve klienta.",
      },
      {
        text: "Poskytovateľ pomáha s výberom a špecifikáciou zariadení tak, aby ich bolo možné zmysluplne napojiť. Odporúčanie konkrétneho zariadenia nie je zárukou jeho vlastností ani životnosti.",
      },
      {
        text: "Záruku, reklamácie a servis hardvéru rieši klient priamo s jeho predajcom alebo výrobcom. Poskytovateľ pri diagnostike poskytne súčinnosť.",
      },
      {
        text: "Ak klient obstará hardvér mimo odporúčanej špecifikácie, poskytovateľ nezaručuje, že ho bude možné napojiť; prípadné napojenie sa oceňuje samostatne.",
      },
      {
        text: "Klient zodpovedá za bežnú údržbu, napájanie, sieťové pripojenie a fyzickú ochranu zariadení v prevádzke.",
      },
    ],
  },
  {
    id: "licencia",
    title: "Licencia a duševné vlastníctvo",
    clauses: [
      {
        text: "Klient nadobúda nevýhradnú, neprenosnú a časovo obmedzenú licenciu na používanie systému počas trvania zmluvy, a to pre prevádzky uvedené v zmluve.",
      },
      {
        text: "Zdrojový kód, architektúra, know-how a znovupoužiteľné komponenty zostávajú duševným vlastníctvom poskytovateľa, ak sa strany písomne nedohodnú inak.",
      },
      {
        text: "Klient nesmie systém ani jeho časti sublicencovať, prenajímať, sprístupniť tretej osobe mimo dohodnutých prevádzok, spätne analyzovať ani z neho odvodzovať konkurenčné riešenie.",
      },
      {
        text: "Dáta klienta a dáta jeho členov sú a zostávajú majetkom klienta. Poskytovateľ si k nim neuplatňuje vlastnícke právo a nepoužíva ich na vlastné obchodné účely.",
      },
      {
        text: "Klient poskytuje poskytovateľovi bezodplatnú licenciu na použitie svojho loga a podkladov v rozsahu potrebnom na prispôsobenie systému jeho značke.",
      },
      {
        text: "Poskytovateľ môže klienta uviesť ako referenciu a použiť jeho logo v referenciách iba s jeho predchádzajúcim súhlasom. Súhlas je možné kedykoľvek odvolať.",
      },
    ],
  },
  {
    id: "data-a-osobne-udaje",
    title: "Dáta klienta a ochrana osobných údajov",
    clauses: [
      {
        text: "Pri prevádzke systému je prevádzkovateľom osobných údajov členov klient. Poskytovateľ vystupuje ako sprostredkovateľ podľa čl. 28 nariadenia (EÚ) 2016/679 (GDPR) a spracúva údaje len na základe pokynov klienta.",
      },
      {
        text: "Strany uzavrú zmluvu o spracúvaní osobných údajov, ktorá upravuje predmet, dobu, povahu a účel spracúvania, kategórie dotknutých osôb a bezpečnostné opatrenia.",
      },
      {
        text: "Poskytovateľ zaviaže mlčanlivosťou všetky osoby, ktoré majú k údajom prístup, a zabezpečí, aby prístup mali len tí, ktorí ho na plnenie potrebujú.",
      },
      {
        text: "Poskytovateľ je oprávnený zapojiť ďalších sprostredkovateľov, najmä poskytovateľa hostingu a doručovania e-mailov, s primeranými zárukami ochrany. Zmenu takého sprostredkovateľa klientovi vopred oznámi.",
      },
      {
        text: (
          <>
            Spracúvanie údajov na strane samotného poskytovateľa — teda údajov z
            kontaktného formulára, komunikácie a zmluvnej agendy — popisuje
            stránka{" "}
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
    id: "vady-a-reklamacie",
    title: "Zodpovednosť za vady a reklamácie",
    clauses: [
      {
        text: "Poskytovateľ zodpovedá za to, že plnenie má vlastnosti dohodnuté v zmluve alebo v akceptovanej ponuke.",
      },
      {
        text: "Vadou nie je požiadavka nad rámec dohodnutého rozsahu, správanie spôsobené chybnými alebo neúplnými dátami klienta, výpadok internetu či elektriny, porucha hardvéru, zásah neoprávnenej osoby ani použitie systému v rozpore s dokumentáciou a školením.",
      },
      {
        text: (
          <>
            Vady sa nahlasujú bez zbytočného odkladu postupom podľa{" "}
            <LegalLink href="/prevadzkovy-poriadok">
              Prevádzkového poriadku
            </LegalLink>
            , ktorý určuje aj klasifikáciu incidentov a reakčné časy.
          </>
        ),
      },
      {
        text: "Vadu odstraňuje poskytovateľ opravou alebo náhradným riešením. Ak vadu nemožno v primeranej lehote odstrániť, má klient nárok na primeranú zľavu z ceny za dotknutú časť plnenia.",
      },
    ],
  },
  {
    id: "zodpovednost-za-skodu",
    title: "Zodpovednosť za škodu",
    clauses: [
      {
        text: "Poskytovateľ zodpovedá za preukázanú skutočnú škodu spôsobenú porušením svojich povinností.",
      },
      {
        text: "Nenahrádza sa ušlý zisk, nepriama a následná škoda, strata dobrého mena ani strata dát, ktoré bolo možné obnoviť zo zálohy podľa Prevádzkového poriadku.",
      },
      {
        text: "Celková náhrada škody je obmedzená sumou odplaty, ktorú klient poskytovateľovi uhradil za obdobie 12 mesiacov predchádzajúcich vzniku škody.",
      },
      {
        text: "Obmedzenia podľa bodov 14.2 a 14.3 sa neuplatnia pri škode spôsobenej úmyselne alebo z hrubej nedbanlivosti a pri škode na zdraví.",
      },
      {
        text: "Poskytovateľ nezodpovedá za konanie personálu klienta, za nesprávne nastavené prevádzkové pravidlá schválené klientom ani za obsah dát, ktoré klient do systému vloží.",
      },
    ],
  },
  {
    id: "trvanie-a-ukoncenie",
    title: "Trvanie a ukončenie zmluvy",
    clauses: [
      {
        text: "Zmluva o prevádzke sa uzatvára na dobu neurčitú, ak nie je dohodnuté inak.",
      },
      {
        text: "Klient môže zmluvu vypovedať aj bez uvedenia dôvodu s výpovednou lehotou 1 mesiac. Poskytovateľ môže zmluvu vypovedať bez uvedenia dôvodu s výpovednou lehotou 3 mesiace, aby mal klient čas na prechod na iné riešenie. Výpovedná lehota začína plynúť prvým dňom mesiaca nasledujúceho po doručení výpovede.",
      },
      {
        text: "Ktorákoľvek strana môže od zmluvy odstúpiť pri podstatnom porušení, ak ho druhá strana neodstráni ani do 15 dní od písomnej výzvy.",
      },
      {
        text: "Za podstatné porušenie sa považuje najmä omeškanie s úhradou dlhšie ako 30 dní, porušenie licenčných podmienok podľa čl. 11, porušenie mlčanlivosti a konanie ohrozujúce bezpečnosť systému alebo dát.",
      },
      {
        text: "Po skončení zmluvy poskytne poskytovateľ klientovi export jeho dát v bežnom strojovo čitateľnom formáte, a to do 30 dní od skončenia. Po uplynutí ďalších 30 dní dáta vymaže, okrem tých, ktoré je povinný archivovať podľa právnych predpisov.",
      },
      {
        text: "Hardvér zostáva klientovi. Poskytovateľ odovzdá informácie o konfigurácii zariadení potrebné na ďalšiu prevádzku.",
      },
      {
        text: "Skončením zmluvy nezanikajú nároky na úhradu už poskytnutého plnenia ani ustanovenia o mlčanlivosti, licencii, zodpovednosti a rozhodnom práve.",
      },
    ],
  },
  {
    id: "mlcanlivost",
    title: "Mlčanlivosť",
    clauses: [
      {
        text: "Strany sú povinné zachovávať mlčanlivosť o dôverných informáciách druhej strany, najmä o obchodných podmienkach, cenách, dátach, technickom riešení a údajoch o prevádzke.",
      },
      {
        text: "Povinnosť mlčanlivosti sa nevzťahuje na informácie verejne známe, informácie získané nezávisle a na sprístupnenie vyžadované právnym predpisom alebo rozhodnutím orgánu verejnej moci.",
      },
      {
        text: "Povinnosť mlčanlivosti trvá aj 3 roky po skončení zmluvy.",
      },
    ],
  },
  {
    id: "vyssia-moc",
    title: "Vyššia moc",
    clauses: [
      {
        text: "Žiadna zo strán nezodpovedá za nesplnenie povinnosti spôsobené okolnosťou vylučujúcou zodpovednosť, najmä výpadkom infraštruktúry tretích strán, rozsiahlym výpadkom elektriny alebo internetu, prírodnou udalosťou, štrajkom alebo opatrením orgánu verejnej moci.",
      },
      {
        text: "Dotknutá strana o takej okolnosti bez zbytočného odkladu informuje druhú stranu a vynaloží primerané úsilie na zmiernenie následkov. Lehoty plnenia sa predlžujú o čas jej trvania.",
      },
      {
        text: "Ak okolnosť trvá dlhšie ako 60 dní, môže ktorákoľvek strana od zmluvy odstúpiť bez sankcie.",
      },
    ],
  },
  {
    id: "spotrebitel",
    title: "Klient v postavení spotrebiteľa",
    clauses: [
      {
        text: "Tento článok sa uplatní iba vtedy, ak klient uzatvára zmluvu mimo rámca svojej podnikateľskej činnosti, teda ako spotrebiteľ.",
      },
      {
        text: "Pri zmluve uzavretej na diaľku alebo mimo prevádzkových priestorov má spotrebiteľ právo odstúpiť od zmluvy do 14 dní bez uvedenia dôvodu, a to podľa zákona č. 108/2024 Z. z. o ochrane spotrebiteľa. Odstúpenie stačí zaslať e-mailom na adresu uvedenú v úvode dokumentu.",
      },
      {
        text: "Ak spotrebiteľ výslovne požiada o začatie poskytovania služby pred uplynutím lehoty na odstúpenie, uhradí pri odstúpení pomernú časť ceny za plnenie poskytnuté do doručenia odstúpenia. Po úplnom poskytnutí služby s výslovným súhlasom spotrebiteľa právo na odstúpenie zaniká.",
      },
      {
        text: "Reklamácie prijíma poskytovateľ na e-mailovej adrese uvedenej v úvode dokumentu a vybaví ich najneskôr do 30 dní od uplatnenia.",
      },
      {
        text: `Orgánom dozoru je ${supervisoryAuthorities.trade.name}, ${supervisoryAuthorities.trade.address}. Spotrebiteľ má právo obrátiť sa na poskytovateľa so žiadosťou o nápravu a ak nie je s vybavením spokojný, má právo podať návrh na začatie alternatívneho riešenia sporu podľa zákona č. 391/2015 Z. z.`,
      },
    ],
  },
  {
    id: "zaverecne-ustanovenia",
    title: "Záverečné ustanovenia",
    clauses: [
      {
        text: "Písomnosti sa doručujú na kontaktné e-mailové adresy uvedené v zmluve. Správa sa považuje za doručenú nasledujúci pracovný deň po odoslaní, ak odosielateľ nedostal oznámenie o nedoručení.",
      },
      {
        text: "Poskytovateľ môže VOP zmeniť. Nové znenie oznámi klientovi najmenej 30 dní pred nadobudnutím účinnosti. Ak klient so zmenou nesúhlasí, môže do nadobudnutia jej účinnosti zmluvu vypovedať s účinnosťou k tomuto dňu.",
      },
      {
        text: "Ak sa niektoré ustanovenie VOP stane neplatným alebo nevykonateľným, ostatné ustanovenia zostávajú v platnosti a strany nahradia dotknuté ustanovenie ustanovením s čo najbližším významom.",
      },
      {
        text: "Zmluvné vzťahy sa spravujú právom Slovenskej republiky. Na riešenie sporov sú príslušné súdy Slovenskej republiky. Strany sa pokúsia spor najprv vyriešiť rokovaním.",
      },
      {
        text: `Toto znenie VOP nadobúda účinnosť ${legalEffectiveLabel} a nahrádza predchádzajúce znenia.`,
      },
    ],
  },
];

export default function ObchodnePodmienkyPage() {
  return (
    <SubPage>
      <JsonLd data={pageStructuredData(obchodnePodmienkySeo)} />

      <LegalHero
        breadcrumb={obchodnePodmienkySeo.breadcrumb}
        title="Všeobecné obchodné podmienky"
        lead="Podmienky, za akých dodávame bezplatný prevádzkový audit, implementáciu Tap-it Fitness OS, jeho prevádzku a ďalšie softvérové a webové služby. Napísané tak, aby sa dali prečítať bez právnika."
        meta={[
          { label: "Účinnosť od", value: legalEffectiveLabel },
          { label: "Verzia", value: legalVersion },
          { label: "Určené pre", value: "Klientov Tap-it" },
        ]}
      />

      <LegalDocument
        articles={articles}
        intro={
          <div className="grid gap-6">
            <EntityFacts />
            <LegalNote title="Prednosť má zmluva">
              <p>
                Ak sa konkrétna zmluva alebo akceptovaná cenová ponuka od týchto
                podmienok odchyľuje, platí znenie zmluvy. VOP dopĺňajú to, čo
                zmluva neupravuje — nie naopak.
              </p>
            </LegalNote>
          </div>
        }
      />

      <RelatedPages items={[...otherLegalPages("/obchodne-podmienky")]} />
    </SubPage>
  );
}
