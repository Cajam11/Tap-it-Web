import { ImageResponse } from "next/og";

import { OgCard, ogContentType, ogSize } from "../og-card";

export const alt = "Tap-it — migrácia fitness systému a prechod z iného softvéru bez chaosu";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        badge="Prechod"
        lines={["Prechod z iného systému", "bez chaosu na recepcii."]}
        subline="migrácia dát · expirácie · import · turnikety · hardvér"
      />
    ),
    size,
  );
}
