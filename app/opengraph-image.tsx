import { ImageResponse } from "next/og";

import { OgCard, ogContentType, ogSize } from "./og-card";

export const alt =
  "Tap-it Fitness OS — softvér pre fitká, ktoré nechcú krabicový systém";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        badge="Fitness OS"
        lines={["Softvér pre fitká,", "ktoré nechcú krabicový systém."]}
        subline="QR vstupy · rezervácie · turnikety · migrácia dát · mobilná appka"
      />
    ),
    size,
  );
}
