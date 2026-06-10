import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1677FF",
        electric: "#00A3FF",
        navy: "#061B3A",
        sky: "#EEF6FF",
        ice: "#F8FBFF",
        ink: "#07111F",
        muted: "#5D6B82",
        success: "#10B981",
        warning: "#F59E0B"
      },
      boxShadow: {
        soft: "0 24px 80px rgba(6, 27, 58, 0.12)",
        panel: "0 18px 60px rgba(22, 119, 255, 0.14)",
        glow: "0 24px 90px rgba(0, 163, 255, 0.32)"
      },
      fontFamily: {
        sans: ["Inter", "SF Pro Display", "Segoe UI", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        "hero-depth":
          "radial-gradient(circle at 72% 16%, rgba(255,255,255,0.45), transparent 24%), linear-gradient(135deg, #1677FF 0%, #00A3FF 52%, #EEF6FF 100%)"
      }
    }
  },
  plugins: []
};

export default config;
