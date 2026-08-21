"use client";

import { useCallback, useEffect, useState } from "react";

import {
  consentGranted,
  deleteCookie,
  subscribeConsent,
  writeCookie,
} from "./use-cookie-consent";

export type ThemeMode = "light" | "dark";

export const THEME_COOKIE = "tapit-theme";
export const DEFAULT_THEME: ThemeMode = "dark";

/**
 * Inlined in <head> so the theme class lands on <html> before first paint —
 * otherwise a light-mode visitor gets a dark flash on every reload.
 */
export const themeBootstrapScript = `(function(){try{var m=document.cookie.match(/(?:^|; )${THEME_COOKIE}=(light|dark)/);var t=m?m[1]:"${DEFAULT_THEME}";document.documentElement.classList.add("theme-"+t);}catch(e){document.documentElement.classList.add("theme-${DEFAULT_THEME}");}})();`;

/**
 * Trieda na <html> je zdroj pravdy, nie cookie: bez súhlasu sa voľba témy
 * nikam neukladá, takže po prekliku na inú stránku by z cookie nebolo čo čítať.
 */
function readActiveTheme(): ThemeMode {
  return document.documentElement.classList.contains("theme-light")
    ? "light"
    : DEFAULT_THEME;
}

function applyThemeClass(theme: ThemeMode) {
  const root = document.documentElement;
  root.classList.toggle("theme-light", theme === "light");
  root.classList.toggle("theme-dark", theme === "dark");
}

/**
 * Theme state backed by a cookie so the choice survives reloads and carries
 * across routes (the 404 page included). The prerendered HTML always assumes
 * `DEFAULT_THEME`, so the active value is picked up in an effect after
 * hydration; the bootstrap script keeps the visible background in sync.
 *
 * Cookie je podmienená súhlasom — kým ho návštevník nedá, prepínač funguje, ale
 * voľba prežije len do zatvorenia karty.
 */
export function useThemeMode() {
  const [theme, setTheme] = useState<ThemeMode>(DEFAULT_THEME);

  useEffect(() => {
    setTheme(readActiveTheme());
  }, []);

  useEffect(
    () =>
      subscribeConsent(() => {
        if (consentGranted()) writeCookie(THEME_COOKIE, readActiveTheme());
        // Odvolanie súhlasu musí zmazať aj cookie, ktorá už na disku je.
        else deleteCookie(THEME_COOKIE);
      }),
    []
  );

  const toggleTheme = useCallback(() => {
    const next: ThemeMode = readActiveTheme() === "light" ? "dark" : "light";
    applyThemeClass(next);
    if (consentGranted()) writeCookie(THEME_COOKIE, next);
    setTheme(next);
  }, []);

  return { theme, toggleTheme };
}
