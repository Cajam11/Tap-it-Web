export const projectTypes = [
  "Chcem kompletný prechod",
  "Prechádzam z iného systému",
  "Riešim turniket/skener",
  "Chcem bezplatný audit",
] as const;

export type ProjectType = (typeof projectTypes)[number];
