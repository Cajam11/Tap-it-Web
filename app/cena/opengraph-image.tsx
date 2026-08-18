import { ImageResponse } from "next/og";

import { OgCard, ogContentType, ogSize } from "../og-card";

export const alt = "Tap-it — ako určujeme cenu softvéru pre fitko: bezplatný audit, rozsah, cena";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        badge="Cena a rozsah"
        lines={["Cena softvéru pre fitko?", "Najprv rozsah, potom cena."]}
        subline="Bezplatný audit · rozsah · cena · bez balíkov"
      />
    ),
    size,
  );
}
