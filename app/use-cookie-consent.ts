"use client";

import { useCallback, useSyncExternalStore } from "react";

/** Cookie, ktorá si pamätá rozhodnutie návštevníka o ostatných cookies. */
export const CONSENT_COOKIE = "tapit-consent";
export const CONSENT_MAX_AGE_SECONDS = 31_536_000;
/** Rovnaký údaj vypisuje aj tabuľka na stránke /cookies. */
export const CONSENT_DURATION_LABEL = "1 rok";

/** `unset` znamená, že sa návštevník ešte nerozhodol — lišta je otvorená. */
export type ConsentState = "granted" | "denied" | "unset";

export function writeCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax`;
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}

function readCookie(name: string) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? match[1] : null;
}

/**
 * Staršia verzia lišty zapisovala `tapit-consent=1` a znamenala len „videl som
 * to“. Tá hodnota sa tu zámerne nepovažuje za súhlas — význam rozhodnutia sa
 * zmenil, takže sa treba spýtať znova.
 */
function readConsent(): ConsentState {
  const value = readCookie(CONSENT_COOKIE);
  return value === "granted" || value === "denied" ? value : "unset";
}

let listeners: (() => void)[] = [];

export function subscribeConsent(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((item) => item !== listener);
  };
}

export function consentGranted() {
  return readConsent() === "granted";
}

export function setConsent(next: "granted" | "denied") {
  writeCookie(CONSENT_COOKIE, next);
  // Cookie sa zapisuje pred oznámením, aby si odberatelia (napr. téma) vedeli
  // prečítať už nový stav a podľa neho uložiť alebo zmazať svoju cookie.
  for (const listener of [...listeners]) listener();
}

/**
 * Stav súhlasu s cookies.
 *
 * Prerenderované HTML je spoločné pre všetkých návštevníkov, takže server
 * nemôže vedieť, ako sa kto rozhodol — `useSyncExternalStore` preto pri
 * hydratácii vráti `unset` a skutočnú hodnotu doplní hneď po nej.
 */
export function useConsent() {
  const consent = useSyncExternalStore<ConsentState>(
    subscribeConsent,
    readConsent,
    () => "unset"
  );

  return {
    consent,
    grant: useCallback(() => setConsent("granted"), []),
    deny: useCallback(() => setConsent("denied"), []),
  };
}
