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
          DEFAULT: "#3E63DD",
          bright: "#5E7CFF",
          soft: "#ADC2F7",
          deep: "#2A3F86",
          faint: "#131A30"
        },
        success: "#10B981",
        warning: "#F59E0B"
      },
      boxShadow: {
        card: "0 16px 50px rgba(3, 4, 10, 0.4)",
        float: "0 24px 80px rgba(3, 4, 10, 0.55)"
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
