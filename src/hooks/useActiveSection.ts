import { useEffect, useState } from "react";

/** Track the reading position without a per-frame scroll listener. */
export function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState("");
  useEffect(() => {
    if (!enabled) return;
    const sections = [
      ...document.querySelectorAll<HTMLElement>("main > section[id]"),
    ];
    const visible = new Set<string>();
    let footerVisible = false;
    const update = () => {
      const section = footerVisible
        ? sections.at(-1)
        : (sections.filter((item) => visible.has(item.id)).at(-1) ??
          sections
            .filter(
              (item) => item.getBoundingClientRect().top <= innerHeight * 0.35,
            )
            .at(-1));
      setActive(section?.id === "home" ? "" : (section?.id ?? ""));
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        update();
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    // On tall screens the final section cannot reach the reading band.
    const footerObserver = new IntersectionObserver((entries) => {
      footerVisible = entries.some((entry) => entry.isIntersecting);
      update();
    });
    const footer = document.querySelector("footer");
    if (footer) footerObserver.observe(footer);
    return () => {
      observer.disconnect();
      footerObserver.disconnect();
    };
  }, [enabled]);
  return active;
}
