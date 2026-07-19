"use client";

import { useCallback, useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";

export const THEME_COOKIE = "tapit-theme";
export const DEFAULT_THEME: ThemeMode = "dark";

/**
 * Inlined in <head> so the theme class lands on <html> before first paint —
 * otherwise a light-mode visitor gets a dark flash on every reload.
 */
export const themeBootstrapScript = `(function(){try{var m=document.cookie.match(/(?:^|; )${THEME_COOKIE}=(light|dark)/);var t=m?m[1]:"${DEFAULT_THEME}";document.documentElement.classList.add("theme-"+t);}catch(e){document.documentElement.classList.add("theme-${DEFAULT_THEME}");}})();`;

function readThemeCookie(): ThemeMode {
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${THEME_COOKIE}=(light|dark)`)
  );
  return match ? (match[1] as ThemeMode) : DEFAULT_THEME;
}

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  root.classList.toggle("theme-light", theme === "light");
  root.classList.toggle("theme-dark", theme === "dark");
  document.cookie = `${THEME_COOKIE}=${theme}; path=/; max-age=31536000; SameSite=Lax`;
}

/**
 * Theme state backed by a cookie so the choice survives reloads and carries
 * across routes (the 404 page included). The prerendered HTML always assumes
 * `DEFAULT_THEME`, so the stored value is picked up in an effect after
 * hydration; the bootstrap script keeps the visible background in sync.
 */
export function useThemeMode() {
  const [theme, setTheme] = useState<ThemeMode>(DEFAULT_THEME);

  useEffect(() => {
    setTheme(readThemeCookie());
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: ThemeMode = current === "light" ? "dark" : "light";
      applyTheme(next);
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
