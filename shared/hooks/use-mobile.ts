import { useCallback, useSyncExternalStore } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile(breakPoint = MOBILE_BREAKPOINT) {
  const query = `(max-width: ${breakPoint - 1}px)`;

  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}
