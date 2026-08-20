"use client";

import { useCallback, useEffect, useState } from "react";

/** Cookie, ktorá si pamätá, že lišta už bola odklinutá. */
export const CONSENT_COOKIE = "tapit-consent";
export const CONSENT_MAX_AGE_SECONDS = 31_536_000;
/** Rovnaký údaj vypisuje aj tabuľka na stránke /cookies. */
export const CONSENT_DURATION_LABEL = "1 rok";

function hasConsent() {
  return new RegExp(`(?:^|; )${CONSENT_COOKIE}=1`).test(document.cookie);
}

/**
 * Stav informačnej lišty o cookies.
 *
 * Začína skrytá a odkrýva sa až v efekte po hydratácii: prerenderované HTML je
 * spoločné pre všetkých návštevníkov, takže server nemôže vedieť, či lištu už
 * niekto odklikol — bez toho by blikla aj tým, ktorí ju majú dávno za sebou.
 */
export function useCookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasConsent()) setVisible(true);
  }, []);

  const accept = useCallback(() => {
    document.cookie = `${CONSENT_COOKIE}=1; path=/; max-age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax`;
    setVisible(false);
  }, []);

  return { visible, accept };
}
