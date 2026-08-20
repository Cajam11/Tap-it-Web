import type { PageSeo } from "./seo-content";

/**
 * SEO descriptor per route. Paths carry no trailing slash: Next.js runs with
 * the default `trailingSlash: false`, so `/cena/` 308s to `/cena` — a canonical
 * pointing at the slashed form would name a URL that redirects.
 *
 * SEO descriptor per route. The sitemap, the JSON-LD and the visible FAQ blocks
 * all read from here, so a page can never drift from what it claims to be.
 */

export const cenaSeo: PageSeo = {
  path: "/cena",
  title: "Cena softvéru pre fitko",
  ogTitle: "Cena softvéru pre fitko | Ako Tap-it určuje rozsah a cenu",
  description:
    "Bezplatný audit prevádzky, z neho rozsah a až potom cena. Vysvetľujeme, čo určuje cenu systému pre fitko: počet vstupov a turniketov, počet členov, hardvér, zložitosť migrácie a množstvo výnimiek v prevádzke.",
  breadcrumb: "Cena",
  service: {
    name: "Nacenenie systému pre fitness centrum",
    serviceType: "Gym software scoping and quotation",
  },
  faq: [
    {
      question: "Koľko stojí softvér pre fitko?",
      answer:
        "Cena má dve časti: jednorazovú implementáciu a mesačný poplatok za prevádzku systému. Vstupný hardvér si gym kupuje priamo, takže mu zostáva. Nedávame to ako balík z cenníka, pretože rozsah sa gym od gymu líši — vplýva naň počet vstupov a turniketov, veľkosť prevádzky, typy členstiev, zložitosť migrácie dát a množstvo výnimiek. Postup je opačný ako pri krabicovom softvéri: z bezplatného auditu vyjde rozsah a až z rozsahu vyjde cena.",
    },
    {
      question: "Prečo Tap-it nemá verejný cenník s balíkmi?",
      answer:
        "Balíkový cenník dáva zmysel vtedy, keď každý zákazník dostane to isté. Tap-it sa skladá podľa konkrétnej prevádzky, takže číslo bez znalosti vstupov, hardvéru a dát by bolo buď nadsadené, alebo nepravdivé. Mesačný poplatok u nás existuje tiež — rozdiel je v tom, že jeho výška vychádza z dohodnutého rozsahu, nie z tarifu, do ktorého sa treba vojsť.",
    },
    {
      question: "Je prevádzkový audit naozaj bezplatný?",
      answer:
        "Áno. Audit je bezplatný a nezáväzný. Jeho výstupom je mapa modulov, priorít, rizík a pilotného rozsahu — teda dokument, ktorý má hodnotu aj v prípade, že sa nakoniec rozhodneš pre iné riešenie.",
    },
    {
      question: "Čo je v jednorazovej cene a čo v mesačnom poplatku?",
      answer:
        "Jednorazová implementácia pokrýva prípravu a migráciu dát, konfiguráciu vstupných pravidiel a rolí, napojenie hardvéru, prípravu adminu a appky a školenie tímu. Mesačný poplatok pokrýva beh systému, aktualizácie a podporu a jeho výška sa odvíja od škály fitka. Vstupný hardvér nie je v ani jednej položke — turnikety a skenery si kupuje gym priamo, my ich pomôžeme vybrať a zostávajú jeho.",
    },
  ],
};

export const produktSeo: PageSeo = {
  path: "/produkt",
  title: "Produkt a ukážky",
  ogTitle:
    "Tap-it Fitness OS | Reálne obrazovky admin panelu a mobilnej appky",
  description:
    "Reálne obrazovky Tap-it Fitness OS, nie prezentácia. Admin panel pre recepciu a majiteľa so scan logmi, členstvami a rezerváciami, plus mobilná appka pre členov fitka s QR kartou a platbami.",
  breadcrumb: "Produkt",
  service: {
    name: "Tap-it Fitness OS",
    serviceType: "Gym management software",
  },
  faq: [
    {
      question: "Dá sa Tap-it Fitness OS vidieť naživo?",
      answer:
        "Áno. Obrazovky na tejto stránke sú z reálneho systému, nie z návrhu. Na bezplatnom audite prejdeme admin panel aj appku naživo a ukážeme presne tie postupy, ktoré rieši tvoja prevádzka.",
    },
    {
      question: "Čo vidí recepcia v admin paneli?",
      answer:
        "Prehľad vstupov a scan logov, správu členov a rolí, overovanie nových účtov, členstvá a ich expirácie, rezervácie priestorov a trénerov, smeny a oznamy. Recepcia rieši výnimky a manuálne vstupy na jednom mieste namiesto viacerých nástrojov.",
    },
    {
      question: "Čo vidí člen v mobilnej appke?",
      answer:
        "QR kartu na vstup, stav členstva, rezervácie, oznamy, profil, prehľad platieb, zákaznícku podporu a právne dokumenty. Cieľom je, aby člen nemusel riešiť cudzí portál ani zbytočné kroky bokom.",
    },
    {
      question: "Je appka v prostredí našej značky?",
      answer:
        "Áno. Člen nerieši cudzí portál — vstup, rezervácie, platby aj podporu vidí v prostredí tvojho gymu. Rozsah brandingu je súčasťou rozsahu, ktorý vyjde z auditu.",
    },
  ],
};

export const migraciaSeo: PageSeo = {
  path: "/migracia",
  title: "Prechod z iného systému",
  ogTitle:
    "Migrácia fitness systému | Prechod z iného softvéru bez chaosu na recepcii",
  description:
    "Prechod z existujúceho systému do Tap-it: export a čistenie dát, mapovanie členstiev a expirácií, test QR vstupu a turniketu, školenie recepcie a skúšobný deň pred ostrým prepnutím.",
  breadcrumb: "Prechod",
  service: {
    name: "Migrácia fitness systému",
    serviceType: "Gym software data migration",
  },
  faq: [
    {
      question: "Vieme prejsť na Tap-it bez straty dát o členstvách?",
      answer:
        "To je celý zmysel toho, že prechod riešime ako samostatnú časť projektu. Mapujeme aktuálne dáta, členstvá, expirácie, používateľov, vstupné pravidlá a výnimky, aby nové nasadenie nezačalo prázdnym adminom. Čo sa nedá exportovať automaticky, dohodneme ako ručný krok ešte pred prepnutím, nie počas neho.",
    },
    {
      question: "Ako dlho trvá prechod z iného systému?",
      answer:
        "Typický prvý rámec delíme na štyri kroky: audit a export, príprava adminu a importu, appka s hardvérom a napokon školenie s ostrým prepnutím. Presný termín závisí od stavu dát, hardvéru a rozsahu výnimiek — preto je odhad výstupom auditu, nie sľubom pred ním.",
    },
    {
      question: "Čo sa deje s recepciou počas prepnutia?",
      answer:
        "Pred ostrým prepnutím ide skúšobný deň a školenie tímu. Recepcia dopredu vie, ako vyzerá bežný vstup, ako sa rieši neplatné členstvo a aký je záložný postup, keď niečo nesedí. Prepnutie tak nie je moment, keď sa tím prvýkrát stretne so systémom.",
    },
    {
      question: "Čo ak sú dáta v starom systéme neporiadok?",
      answer:
        "To je bežný východiskový stav a počítame s ním. Súčasťou prípravy je čistenie dát pred importom: duplicitní členovia, členstvá bez expirácie, staré jednorazové vstupy a výnimky, ktoré existujú len v hlave recepčnej. Radšej ich vyriešime pred importom než aby sa preniesli do nového systému.",
    },
  ],
};

export const bezobsluzneSeo: PageSeo = {
  path: "/bezobsluzne-fitko",
  title: "Bezobslužné a nonstop fitká",
  ogTitle:
    "Softvér pre bezobslužné a nonstop fitko | QR vstup a turniket 24/7",
  description:
    "Systém pre bezobslužné a nonstop (24/7) fitká: QR token člena, kontrola platného členstva, otvorenie turniketu, scan log a záložný postup pri výpadku internetu alebo hardvéru.",
  breadcrumb: "Bezobslužné fitká",
  service: {
    name: "Softvér pre bezobslužné a nonstop fitness centrá",
    serviceType: "Unstaffed gym access control software",
  },
  faq: [
    {
      question: "Funguje Tap-it vo fitku bez stálej recepcie?",
      answer:
        "Áno. Pri prevádzke bez stálej recepcie stojí vstup celý na pravidlách systému: QR token člena, kontrola platného členstva, otvorenie turniketu, scan log a záložný postup pri výpadku internetu alebo hardvéru. Ten istý systém zvládne aj hybridný režim, keď je recepcia obsadená len časť dňa.",
    },
    {
      question: "Čo sa stane, keď vypadne internet alebo hardvér?",
      answer:
        "Výpadkový scenár je súčasťou návrhu vstupu, nie doplnok na koniec. Pri audite prechádzame, čo sa má stať pri slabom internete, chybe platby, neplatnom členstve a nefunkčnom turnikete, a aký je náhradný postup pre člena aj pre majiteľa. Bezobslužná prevádzka nemá koho sa opýtať, takže pravidlo musí byť rozhodnuté dopredu.",
    },
    {
      question: "Vieme rozlíšiť, kto naozaj vstúpil?",
      answer:
        "Každé overenie sa zapisuje do scan logu s časom a členom, takže vstupy sú spätne dohľadateľné. Turniket pustí jeden priechod na jedno úspešné overenie, čím sa vstup viaže na konkrétne členstvo namiesto anonymného otvorenia dverí.",
    },
    {
      question: "Dá sa kombinovať obsluhovaný a bezobslužný režim?",
      answer:
        "Áno, a v praxi je to najčastejší variant. Cez deň recepcia rieši výnimky, predaje a nových členov; mimo otváracích hodín beží vstup výhradne na pravidlách systému. Pravidlá pre oba režimy nastavujeme pri audite, aby sa neprekrývali ani nevytvárali diery.",
    },
  ],
};

export const allPageSeo: readonly PageSeo[] = [
  produktSeo,
  migraciaSeo,
  cenaSeo,
  bezobsluzneSeo,
];
