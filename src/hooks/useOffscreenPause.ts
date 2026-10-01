import { useEffect } from "react";

/** Pause invisible CSS loops; resume before they re-enter the viewport. */
export function useOffscreenPause(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const targets = [
      ...document.querySelectorAll<HTMLElement>("[data-pause-offscreen]"),
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          (entry.target as HTMLElement).dataset.inView = String(
            entry.isIntersecting,
          );
        }
      },
      { rootMargin: "200px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => {
      observer.disconnect();
      targets.forEach((target) => delete target.dataset.inView);
    };
  }, [enabled]);
}
