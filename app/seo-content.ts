import type { Metadata } from "next";

import { fitnessFaqItems } from "./fitness-faq";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tap-it.sk"
).replace(/\/$/, "");

export const siteName = "Tap-it";

export const siteTitle =
  "Softvér pre fitká | Tap-it Fitness OS, QR vstupy a členstvá";

export const siteDescription =
  "Bezplatný audit prevádzky. Tap-it Fitness OS je softvér pre fitká a fitness centrá: QR vstupy, členstvá, rezervácie, turnikety, migrácia z existujúceho systému, admin panel a mobilná appka.";

export const seoKeywords = [
  "softvér pre fitká",
  "software pre fitka",
  "systém pre fitko",
  "systém pre fitká",
  "gym systém",
  "fitness software",
  "softvér pre fitness centrum",
  "QR vstup do fitka",
  "turniketový systém pre fitness centrum",
  "rezervačný systém pre fitko",
  "správa členstiev",
  "mobilná appka pre fitko",
  "migrácia fitness systému",
  "Tap-it Fitness OS",
];

export const productFeatures = [
  "QR vstupy a scan logy",
  "Správa členov, rolí a verifikácie",
  "Členstvá, expirácie a jednorazové vstupy",
  "Rezervácie trénerov, priestorov a skupinových lekcií",
  "Turnikety, QR skenery a vstupný hardvér",
  "Admin panel pre recepciu a majiteľa",
  "Mobilná aplikácia pre členov fitness centra",
  "Migrácia dát z existujúceho systému",
];

const organizationNode = {
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: siteName,
  url: `${siteUrl}/`,
  email: "info@tap-it.sk",
  founder: [
    {
      "@type": "Person",
      name: "Filip Paučo",
    },
    {
      "@type": "Person",
      name: "Patrik Repkovský",
    },
  ],
  areaServed: {
    "@type": "Country",
    name: "Slovensko",
  },
  knowsAbout: seoKeywords,
  makesOffer: [
    {
      "@type": "Offer",
      name: "Bezplatný prevádzkový audit fitness centra",
      description:
        "Audit vstupov, členstiev, dát, hardvéru a recepčných postupov, z ktorého vyjde rozsah nasadenia. Audit je bezplatný.",
      price: "0",
      priceCurrency: "EUR",
      itemOffered: {
        "@type": "Service",
        name: "Prevádzkový audit fitness centra",
        serviceType: "Gym operations audit",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Softvér pre fitká a fitness centrá",
        serviceType: "Custom fitness management software",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Webové stránky a redizajny",
        serviceType: "Website design and redesign",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Custom softvér a e-shopy",
        serviceType: "Custom software development",
      },
    },
  ],
};

const websiteNode = {
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: `${siteUrl}/`,
  name: siteName,
  description: siteDescription,
  inLanguage: "sk-SK",
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
};

/**
 * The only nodes safe to emit on every route: they describe the publisher and
 * the site, not the current document. Anything page-specific — WebPage,
 * FAQPage, SoftwareApplication — belongs to the route that owns it, otherwise
 * every subpage claims to be the homepage.
 */
export const globalStructuredData = {
  "@context": "https://schema.org",
  "@graph": [organizationNode, websiteNode],
};

export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: `${siteUrl}/`,
      name: siteTitle,
      description: siteDescription,
      inLanguage: "sk-SK",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#fitness-os` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#fitness-os`,
      name: "Tap-it Fitness OS",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Gym management software",
      operatingSystem: "Web, iOS, Android",
      url: `${siteUrl}/`,
      description: siteDescription,
      featureList: productFeatures,
      creator: { "@id": `${siteUrl}/#organization` },
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Majitelia fitness centier a gymov",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      inLanguage: "sk-SK",
      mainEntity: fitnessFaqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export type FaqItem = { question: string; answer: string };

export type PageSeo = {
  /** Route path with a leading and trailing slash, e.g. `/cena/`. */
  path: string;
  /** Goes into <title>; the layout template appends the site name. */
  title: string;
  /** Full <title> used for og:title, where the template does not apply. */
  ogTitle: string;
  description: string;
  /** Breadcrumb label — short, not the full title. */
  breadcrumb: string;
  faq?: readonly FaqItem[];
  /** Optional schema.org Service described by the page. */
  service?: { name: string; serviceType: string };
};

export function pageMetadata(seo: PageSeo): Metadata {
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: seo.path },
    openGraph: {
      title: seo.ogTitle,
      description: seo.description,
      url: seo.path,
      siteName,
      locale: "sk_SK",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.ogTitle,
      description: seo.description,
    },
  };
}

export function pageStructuredData(seo: PageSeo) {
  const pageUrl = `${siteUrl}${seo.path}`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: seo.ogTitle,
      description: seo.description,
      inLanguage: "sk-SK",
      isPartOf: { "@id": `${siteUrl}/#website` },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Domov",
          item: `${siteUrl}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: seo.breadcrumb,
          item: pageUrl,
        },
      ],
    },
  ];

  if (seo.service) {
    graph.push({
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: seo.service.name,
      serviceType: seo.service.serviceType,
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: { "@type": "Country", name: "Slovensko" },
      url: pageUrl,
    });
  }

  if (seo.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      inLanguage: "sk-SK",
      mainEntity: seo.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
