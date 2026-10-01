import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ArrowRight } from "@phosphor-icons/react/dist/csr/ArrowRight";
import { ArrowUpRight } from "@phosphor-icons/react/dist/csr/ArrowUpRight";
import { Flower } from "@phosphor-icons/react/dist/csr/Flower";
import { List } from "@phosphor-icons/react/dist/csr/List";
import { Sparkle } from "@phosphor-icons/react/dist/csr/Sparkle";
import { X } from "@phosphor-icons/react/dist/csr/X";
import { profile } from "../profile";
import { asset, navigation, type Page } from "../lib/site";
import { AmbientGarden, MotionProvider, useMotionSettings } from "./Motion";
import { useActiveSection } from "../hooks/useActiveSection";
import { useOffscreenPause } from "../hooks/useOffscreenPause";

export function SiteShell({
  page,
  children,
}: {
  page: Page;
  children: ReactNode;
}) {
  return (
    <MotionProvider>
      <ShellContent page={page}>{children}</ShellContent>
    </MotionProvider>
  );
}

function ShellContent({ page, children }: { page: Page; children: ReactNode }) {
  const isHome = page === "home";
  const { enabled, systemReduced, toggle } = useMotionSettings();
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(!isHome);
  const menuButton = useRef<HTMLButtonElement>(null);
  useOffscreenPause(enabled);
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const query = window.matchMedia("(min-width: 761px)");
    const closeOnDesktop = () => {
      if (query.matches) setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    query.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      query.removeEventListener("change", closeOnDesktop);
    };
  }, [menuOpen]);
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <AmbientGarden />
      <header className={`site-header${isHome ? " landing-header" : ""}`}>
        <div className="header-inner">
          <a
            className="brand"
            href={asset("")}
            aria-label="Yuyang, back to home"
            onClick={() => setMenuOpen(false)}
          >
            <Flower size={29} weight="light" />
            <span>
              yuyang<span className="brand-dot">.</span>
            </span>
          </a>
          <nav
            className={isHome ? "landing-nav" : "desktop-nav"}
            aria-label="Main navigation"
          >
            {isHome ? (
              <a href={asset("cv/")}>
                CV <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            ) : (
              navigation.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  aria-current={
                    activeSection === link.id ? "location" : undefined
                  }
                >
                  {link.label}
                </a>
              ))
            )}
          </nav>
          <div className="header-actions">
            <button
              className="motion-toggle"
              aria-label={
                systemReduced
                  ? "Animation disabled by your system’s reduced motion preference"
                  : "Enable animations"
              }
              aria-pressed={enabled}
              disabled={!!systemReduced}
              title={
                systemReduced
                  ? "Your system requests reduced motion"
                  : "Toggle decorative animations"
              }
              onClick={toggle}
            >
              <Sparkle size={16} weight={enabled ? "duotone" : "regular"} />
              <span>
                {systemReduced
                  ? "Reduced motion"
                  : `Motion ${enabled ? "on" : "off"}`}
              </span>
              <span className="toggle-track" aria-hidden="true">
                <span />
              </span>
            </button>
            {!isHome && (
              <button
                className="menu-toggle"
                ref={menuButton}
                aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={23} /> : <List size={23} />}
              </button>
            )}
          </div>
        </div>
        <AnimatePresence>
          {!isHome && menuOpen && (
            <m.nav
              id="mobile-navigation"
              className="mobile-nav"
              aria-label="Mobile navigation"
              initial={enabled ? { opacity: 0, height: 0 } : false}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: enabled ? 0.2 : 0 }}
            >
              {navigation.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  aria-current={
                    activeSection === link.id ? "location" : undefined
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                  <ArrowUpRight size={18} />
                </a>
              ))}
            </m.nav>
          )}
        </AnimatePresence>
      </header>
      <main
        id="main"
        tabIndex={-1}
        className={isHome ? "landing-main" : undefined}
      >
        {children}
      </main>
      <footer
        className={`site-footer page-width${isHome ? " landing-footer" : ""}`}
      >
        <a className="footer-brand" href="#home">
          yuyang.
        </a>
        <p>{profile.motto}</p>
        {!isHome && (
          <a href="#home">
            Back to top <ArrowRight className="back-to-top-icon" size={15} />
          </a>
        )}
        <span className="footer-copyright">
          © {new Date().getFullYear()} Yuyang Chen
        </span>
      </footer>
    </>
  );
}
