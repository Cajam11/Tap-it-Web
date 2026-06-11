import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        base: "#0A0E16",
        surface: "#0F141E",
        raised: "#141B28",
        accent: {
          DEFAULT: "#3A5BA8",
          bright: "#4C6FBE",
          soft: "#9DB3E0",
          deep: "#22345F",
          faint: "#16213D"
        },
        success: "#10B981",
        warning: "#F59E0B"
      },
      boxShadow: {
        card: "0 16px 50px rgba(4, 8, 18, 0.35)",
        float: "0 24px 80px rgba(4, 8, 18, 0.45)"
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-body)", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
