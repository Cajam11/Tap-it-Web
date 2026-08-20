"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";

import filipFounder from "../../founders/Filip_Paučo.jpg";
import patrikFounder from "../../founders/Patrik_Repkovský.jpg";
import { footerNavItems, footerPageItems, useSectionLinks } from "./site-links";

const infoLinks = [
  "Všeobecné obchodné podmienky",
  "Ochrana osobných údajov",
  "Prevádzkový poriadok",
  "Cookies",
];

const socialLinks = [
  { label: "Facebook", icon: Facebook },
  { label: "Instagram", icon: Instagram },
  { label: "X", icon: Twitter },
  { label: "LinkedIn", icon: Linkedin },
];

const founders = [
  {
    name: "Filip Paučo",
    role: "Co-founder / produkt",
    motto: "Produkt musí sedieť na to, ako gym reálne funguje.",
    linkedin: "https://www.linkedin.com/in/filip-pau%C4%8Do/",
    image: filipFounder,
  },
  {
    name: "Patrik Repkovský",
    role: "Co-founder / technológia",
    motto: "Systém musí prežiť bežný deň, nie len demo.",
    linkedin: "https://www.linkedin.com/in/patrik-repkovsk%C3%BD/",
    image: patrikFounder,
  },
];

export function SiteFooter() {
  const { hrefFor, onAnchorClick } = useSectionLinks();
  // Resolved on the client so a build that straddles New Year does not serve a
  // stale copyright line until the next deploy.
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="site-footer border-t border-white/5 bg-[#050506] px-4 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1.2fr_0.85fr_0.8fr_0.85fr_0.9fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-sm font-black text-white shadow-brand">
                T
              </span>
              <span className="text-xl font-black tracking-tight text-white">
                Tap<span className="text-accent">-it</span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm font-semibold leading-7 text-slate-500">
              Fitness OS navrhnutý podľa reality prevádzky. QR vstupy,
              migrácia, turnikety, skenery, admin panel a mobilná appka bez
              krabicového myslenia.
            </p>
            <div className="mt-7 flex gap-3">
              {socialLinks.map(({ label, icon: Icon }) => (
                <Link
                  key={label}
                  href={hrefFor("#kontakt")}
                  onClick={(event) => onAnchorClick(event, "#kontakt")}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition hover:border-accent/45 hover:bg-accent/10 hover:text-white"
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <FooterColumn title="Stránky">
            {footerPageItems.map(([label, href]) => (
              <Link key={href} href={href} className="footer-link">
                {label}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Sekcie">
            {footerNavItems.map(([label, href]) => (
              <Link
                key={href}
                href={hrefFor(href)}
                onClick={(event) => onAnchorClick(event, href)}
                className="footer-link"
              >
                {label}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Kontakt">
            <Link
              href={hrefFor("#kontakt")}
              onClick={(event) => onAnchorClick(event, "#kontakt")}
              className="footer-contact-row"
            >
              <MapPin aria-hidden="true" className="h-4 w-4" />
              <span>
                Tap-it prechod
                <br />
                Slovensko / online
              </span>
            </Link>
            <Link
              href={hrefFor("#kontakt")}
              onClick={(event) => onAnchorClick(event, "#kontakt")}
              className="footer-contact-row"
            >
              <Phone aria-hidden="true" className="h-4 w-4" />
              <span>Prechod alebo ukážka</span>
            </Link>
            <a href="mailto:info@tap-it.sk" className="footer-contact-row">
              <Mail aria-hidden="true" className="h-4 w-4" />
              <span>info@tap-it.sk</span>
            </a>
          </FooterColumn>

          <FooterColumn title="Informácie">
            {infoLinks.map((item) => (
              <Link
                key={item}
                href={hrefFor("#kontakt")}
                onClick={(event) => onAnchorClick(event, "#kontakt")}
                className="footer-link"
              >
                {item}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Founderi">
            <FoundersSwitcher founders={founders} />
          </FooterColumn>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs font-semibold text-slate-600 md:flex-row md:items-center md:justify-between">
          <p>© {year} Tap-it. Všetky práva vyhradené.</p>
          <p>
            Powered by{" "}
            <Link
              href={hrefFor("#platforma")}
              onClick={(event) => onAnchorClick(event, "#platforma")}
              className="text-accent-soft transition hover:text-white"
            >
              Tap-it Fitness OS
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

type Founder = {
  name: string;
  role: string;
  motto: string;
  linkedin: string;
  image: StaticImageData;
};

function FoundersSwitcher({ founders }: { founders: Founder[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [displayed, setDisplayed] = useState(founders[0]);

  const handlePreview = (index: number) => {
    if (index === activeIndex || isAnimating) return;
    setIsAnimating(true);

    setTimeout(() => {
      setDisplayed(founders[index]);
      setActiveIndex(index);
      setTimeout(() => setIsAnimating(false), 400);
    }, 200);
  };

  return (
    <div>
      <p
        className={`text-sm font-semibold leading-6 text-slate-300 transition-all duration-300 ease-out ${
          isAnimating ? "scale-[0.98] opacity-0 blur-sm" : "scale-100 opacity-100 blur-none"
        }`}
      >
        “{displayed.motto}”
      </p>
      <p
        className={`mt-2 text-[0.65rem] font-black uppercase tracking-[0.18em] text-accent-soft transition-all duration-[400ms] ease-out ${
          isAnimating ? "translate-y-1 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        {displayed.role}
      </p>

      <div className="mt-4 flex items-center gap-2">
        {founders.map((founder, index) => {
          const isActive = activeIndex === index;
          const showName = isActive || (hoveredIndex === index && !isActive);

          const pillClassName = `flex items-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isActive ? "bg-accent shadow-brand" : "bg-transparent hover:bg-white/10"
          } ${showName ? "py-1 pl-1 pr-3" : "p-0.5"}`;

          const pillContent = (
            <>
              <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-white/10 bg-raised">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </span>
              <span
                className={`grid overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  showName ? "ml-2 grid-cols-[1fr] opacity-100" : "ml-0 grid-cols-[0fr] opacity-0"
                }`}
              >
                <span className="flex items-center gap-1 whitespace-nowrap">
                  <span
                    className={`text-xs font-bold ${
                      isActive ? "text-white" : "text-slate-300"
                    }`}
                  >
                    {founder.name.split(" ")[0]}
                  </span>
                  {isActive && founder.linkedin ? (
                    <Linkedin
                      aria-hidden="true"
                      className="h-3 w-3 shrink-0 text-white/70"
                    />
                  ) : null}
                </span>
              </span>
            </>
          );

          // Always the same <a>, so the pill's color/shape can transition
          // smoothly instead of snapping — swapping between <a> and
          // <button> per state would force React to remount the node.
          // Tap on the already-active founder opens LinkedIn (modifier/
          // middle clicks navigate immediately, same as any link); tap on
          // an inactive one just previews them. No hover dependency, so
          // it holds up on touch devices too.
          return (
            <a
              key={founder.name}
              href={founder.linkedin || undefined}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => {
                if (isActive || !founder.linkedin) {
                  if (!founder.linkedin) event.preventDefault();
                  return;
                }
                if (event.metaKey || event.ctrlKey || event.shiftKey) return;
                event.preventDefault();
                handlePreview(index);
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              aria-label={
                isActive
                  ? `LinkedIn profil – ${founder.name}`
                  : `Zobraziť ${founder.name}`
              }
              className={pillClassName}
            >
              {pillContent}
            </a>
          );
        })}
      </div>
    </div>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xs font-black uppercase tracking-[0.16em] text-slate-300">
        {title}
      </h2>
      <div className="mt-5 grid gap-3 text-sm font-semibold text-slate-500">
        {children}
      </div>
    </div>
  );
}
