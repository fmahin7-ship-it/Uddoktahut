"use client";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Current year on the client; `fallback` during server render to avoid a hydration mismatch. */
export function useCurrentYear(fallback = "2025") {
  return useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear().toString(),
    () => fallback
  );
}
