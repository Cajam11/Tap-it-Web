"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  User,
} from "lucide-react";
import { useMemo, type ReactNode } from "react";

import { legalPageLinks } from "../legal-content";
import { footerNavItems, footerPageItems, useSectionLinks } from "./site-links";

const founders = [
  { name: "Filip", linkedin: "https://www.linkedin.com/in/filip-pau%C4%8Do/" },
  {
    name: "Patrik",
    linkedin: "https://www.linkedin.com/in/patrik-repkovsk%C3%BD/",
  },
];

const socialLinks = [
  { label: "Facebook", icon: Facebook },
  { label: "Instagram", icon: Instagram },
  { label: "X", icon: Twitter },
  { label: "LinkedIn", icon: Linkedin },
];

export function SiteFooter() {
  const { hrefFor, onAnchorClick } = useSectionLinks();
  // Resolved on the client so a build that straddles New Year does not serve a
  // stale copyright line until the next deploy.
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="site-footer border-t border-white/5 bg-[#050506] px-4 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1.25fr_0.85fr_0.8fr_0.9fr_0.9fr_0.65fr]">
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
            {legalPageLinks.map((page) => (
              <Link key={page.href} href={page.href} className="footer-link">
                {page.title}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Founderi">
            {founders.map((founder) => (
              <a
                key={founder.name}
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`LinkedIn profil – ${founder.name}`}
                className="group flex items-center gap-3 text-slate-500 transition hover:text-white"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition group-hover:border-accent/45 group-hover:bg-accent/10 group-hover:text-white">
                  <User aria-hidden="true" className="h-4 w-4" />
                </span>
                {founder.name}
              </a>
            ))}
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
