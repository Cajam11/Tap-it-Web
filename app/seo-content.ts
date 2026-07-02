import { fitnessFaqItems } from "./fitness-faq";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tap-it.sk"
).replace(/\/$/, "");

export const siteName = "Tap-it";

export const siteTitle =
  "Softvér pre fitká | Tap-it Fitness OS, QR vstupy a členstvá";

export const siteDescription =
  "Tap-it Fitness OS je softvér pre fitká a fitness centrá: QR vstupy, členstvá, rezervácie, migrácia z existujúceho systému, turnikety, skenery, admin panel a mobilná appka.";

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

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
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
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      inLanguage: "sk-SK",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: siteTitle,
      description: siteDescription,
      inLanguage: "sk-SK",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#fitness-os`,
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#fitness-os`,
      name: "Tap-it Fitness OS",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Gym management software",
      operatingSystem: "Web, iOS, Android",
      url: siteUrl,
      description: siteDescription,
      featureList: productFeatures,
      creator: {
        "@id": `${siteUrl}/#organization`,
      },
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
} as const;
