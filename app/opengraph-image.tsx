import { ImageResponse } from "next/og";

export const alt =
  "Tap-it Fitness OS — softvér pre fitká, ktoré nechcú krabicový systém";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered by Satori, which only understands flexbox — no grid, and every
// element with more than one child needs an explicit `display: flex`.
//
// Type is drawn with the Noto Sans that `next/og` bundles, which covers Latin-1
// but not Latin Extended-A. Slovak č/š/ž/ť/ň/ľ/ď would render as tofu, so keep
// the copy on this card to the á/é/í/ó/ú/ý diacritics it can actually draw.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090D",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Brand glow, echoing the hero's red accent wash. */}
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -180,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(239,36,40,0.34) 0%, rgba(239,36,40,0.10) 45%, rgba(9,9,13,0) 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 68,
              height: 68,
              borderRadius: 20,
              backgroundColor: "#EF2428",
              color: "#FFFFFF",
              fontSize: 38,
              fontWeight: 800,
            }}
          >
            T
          </div>
          <div
            style={{
              display: "flex",
              color: "#ECEAE2",
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: -0.5,
            }}
          >
            Tap-it
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: 10,
              padding: "10px 20px",
              borderRadius: 9999,
              border: "1px solid rgba(255,179,181,0.28)",
              backgroundColor: "rgba(42,17,21,0.85)",
              color: "#FFB3B5",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            Fitness OS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#ECEAE2",
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: -2,
            }}
          >
            <div style={{ display: "flex" }}>Softvér pre fitká,</div>
            <div style={{ display: "flex" }}>
              ktoré nechcú krabicový systém.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 30,
              color: "#94A3B8",
              fontSize: 30,
              fontWeight: 500,
              lineHeight: 1.4,
            }}
          >
            QR vstupy · rezervácie · turnikety · migrácia dát · mobilná appka
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "16px 30px",
              borderRadius: 9999,
              backgroundColor: "#EF2428",
              color: "#FFFFFF",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            Bezplatný audit prevádzky
          </div>
          <div
            style={{
              display: "flex",
              color: "#64748B",
              fontSize: 26,
              fontWeight: 600,
            }}
          >
            tap-it.sk
          </div>
        </div>
      </div>
    ),
    size,
  );
}
