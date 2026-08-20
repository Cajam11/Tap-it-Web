import { ImageResponse } from "next/og";

import { OgCard, ogContentType, ogSize } from "../og-card";

export const alt = "Tap-it Fitness OS — reálne obrazovky admin panelu a mobilnej appky pre fitká";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        badge="Produkt"
        lines={["Reálne obrazovky,", "nie prezentácia."]}
        subline="admin panel · scan logy · rezervácie · mobilná appka"
      />
    ),
    size,
  );
}
