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
      boxShadow: {
        card: "0 16px 50px rgba(3, 4, 10, 0.4)",
        float: "0 24px 80px rgba(3, 4, 10, 0.55)",
        brand: "0 16px 44px rgba(239, 36, 40, 0.32)"
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
