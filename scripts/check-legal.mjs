/**
 * Kontrola právnych stránok v produkčnom builde.
 *
 * `EntityFacts` vykresľuje chip „doplniť" len vo vývoji — v produkcii sa prázdne
 * riadky zahodia. Podmienka stojí na `process.env.NODE_ENV`, ktoré Next nahradí
 * konštantou pri builde, takže sa nedá omylom prepnúť konfiguráciou. Tento skript
 * to napriek tomu overí na skutočnom výstupe, nie na dôvere v podmienku.
 *
 * Spúšťa sa po `npm run build`, nad `.next/server/app`.
 */

import fs from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), ".next", "server", "app");
const placeholder = "doplniť";
/** Blok s identifikáciou má jeden z týchto popiskov podľa toho, či je firma zapísaná. */
const identityMarkers = ["Obchodné meno", "Prevádzkovateľ"];

const pages = [
  { route: "obchodne-podmienky", hasIdentity: true },
  { route: "ochrana-osobnych-udajov", hasIdentity: true },
  { route: "prevadzkovy-poriadok", hasIdentity: false },
  { route: "cookies", hasIdentity: false },
];

const failures = [];

if (!fs.existsSync(outDir)) {
  console.error("✗ Chýba .next/server/app — spusti najprv `npm run build`.");
  process.exit(1);
}

for (const { route, hasIdentity } of pages) {
  const html = path.join(outDir, `${route}.html`);

  // Chýbajúci .html neznamená „čisté". Znamená, že route sa prestala
  // prerenderovať a kontrola by inak mlčky prešla na prázdnom vstupe.
  if (!fs.existsSync(html)) {
    failures.push(`${route}: nie je staticky prerenderovaná (chýba ${route}.html)`);
    continue;
  }

  // .rsc je payload pre klientsku navigáciu. Keby placeholder prešiel len tade,
  // v HTML by nebol a na webe by sa aj tak ukázal.
  const files = [html, path.join(outDir, `${route}.rsc`)].filter((file) =>
    fs.existsSync(file),
  );

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");

    if (content.includes(placeholder)) {
      failures.push(`${route}: ${path.basename(file)} obsahuje „${placeholder}"`);
    }

    if (hasIdentity && file === html) {
      if (!identityMarkers.some((marker) => content.includes(marker))) {
        failures.push(`${route}: chýba blok s identifikáciou prevádzkovateľa`);
      }
      if (!content.includes("mailto:")) {
        failures.push(`${route}: chýba kontaktný e-mail`);
      }
    }
  }

  console.log(`  ${route} — skontrolované: ${files.map((f) => path.extname(f)).join(", ")}`);
}

if (failures.length > 0) {
  console.error("\n✗ Právne stránky neprešli kontrolou:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log("\n✓ Právne stránky sú čisté: žiadny placeholder, identifikácia aj kontakt na mieste.");
