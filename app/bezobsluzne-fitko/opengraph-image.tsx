import { ImageResponse } from "next/og";

import { OgCard, ogContentType, ogSize } from "../og-card";

export const alt = "Tap-it — softvér pre bezobslužné a nonstop fitká s QR vstupom a turniketom";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        badge="Nonstop fitko"
        lines={["Fitko bez recepcie,", "vstup na pravidlách."]}
        subline="QR token · turniket · scan log · nonstop 24/7"
      />
    ),
    size,
  );
}
