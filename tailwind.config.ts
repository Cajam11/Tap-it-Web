import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        base: "#09090D",
        surface: "#0E0F15",
        raised: "#14161F",
        ivory: "#ECEAE2",
        accent: {
          DEFAULT: "#EF2428",
          bright: "#FF3B3F",
          soft: "#FFB3B5",
          deep: "#8F1117",
          faint: "#2A1115"
        },
        success: "#10B981",
        warning: "#F59E0B"
      },
      backgroundImage: {
        // The ground of the Tap-it mark. Lives here rather than in an SVG
        // <defs> gradient so several marks can share a page without repeating
        // an element id, and so the corner radius stays a normal utility.
        "brand-mark":
          "linear-gradient(135deg, #1B2447 0%, #0B1020 52%, #09090D 100%)"
      },
      boxShadow: {
        card: "0 16px 50px rgba(3, 4, 10, 0.4)",
        float: "0 24px 80px rgba(3, 4, 10, 0.55)",
        brand: "0 16px 44px rgba(239, 36, 40, 0.32)"
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"]
      }
    },
    // `base` collides with the core `text-base` font-size utility: leaving it in
    // the text-color palette makes `.text-base` also emit `color:#09090D`, which
    // silently overrides the intended text color and renders copy invisible on
    // the dark surface. Keep `base` as a background color only.
    textColor: ({ theme }) => {
      const palette = { ...theme("colors") } as Record<string, string>;
      delete palette.base;
      return palette;
    }
  },
  plugins: []
};

export default config;
