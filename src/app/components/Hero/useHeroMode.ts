"use client";

import { useSyncExternalStore } from "react";

/**
 * How the hero background is presented:
 * - "pending": server render / before hydration — only the poster image shows
 * - "video":   small screens — portrait clip that plays once (hardware decoded)
 * - "scrub":   larger screens — frame sequence driven by scroll
 * - "static":  reduced motion or data saver — poster only
 *
 * The 768px breakpoint must match the one in Hero.module.css.
 */
export type HeroMode = "pending" | "video" | "scrub" | "static";

const MOBILE_QUERY = "(max-width: 768px)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const queries = [MOBILE_QUERY, REDUCED_QUERY].map((q) => window.matchMedia(q));
  queries.forEach((q) => q.addEventListener("change", onChange));
  return () => queries.forEach((q) => q.removeEventListener("change", onChange));
}

function getSnapshot(): HeroMode {
  const saveData =
    (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection?.saveData === true;
  if (saveData || window.matchMedia(REDUCED_QUERY).matches) return "static";
  return window.matchMedia(MOBILE_QUERY).matches ? "video" : "scrub";
}

function getServerSnapshot(): HeroMode {
  return "pending";
}

export default function useHeroMode(): HeroMode {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
