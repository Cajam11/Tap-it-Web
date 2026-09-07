/**
 * Tap-it značka — skenovacie zátvorky okolo serifového T.
 *
 * Kreslí sa inline, aby značka nečakala na sieť a ostala ostrá v každej
 * veľkosti. Podklad je gradient z Tailwindu (`bg-brand-mark`), nie SVG
 * `<defs>`: dve značky na jednej stránke by inak zdieľali rovnaké `id`
 * a rádius rohov ostáva bežnou utilitou.
 *
 * Vlasový `ring` drží hranu dlaždice čitateľnú aj na `#050506` v pätičke, kde
 * najtmavší stop gradientu splynie s pozadím.
 *
 * Zdrojové súbory značky sú v `public/brand/`.
 */
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block shrink-0 overflow-hidden bg-brand-mark ring-1 ring-inset ring-white/10 ${className}`}
    >
      <svg viewBox="0 0 300 300" className="h-full w-full">
        <path
          d="M54 100 L54 66 Q54 54 66 54 L100 54"
          fill="none"
          stroke="#EF2428"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <path
          d="M246 200 L246 234 Q246 246 234 246 L200 246"
          fill="none"
          stroke="#3E63DD"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <rect x="84" y="92" width="132" height="36" rx="9" fill="#ECEAE2" />
        <rect x="132" y="92" width="36" height="116" rx="9" fill="#ECEAE2" />
      </svg>
    </span>
  );
}
