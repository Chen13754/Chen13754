import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  LazyMotion,
  MotionConfig,
  domAnimation,
  useReducedMotion,
} from "motion/react";
import * as m from "motion/react-m";
import { Flower } from "@phosphor-icons/react/dist/csr/Flower";
import { Leaf } from "@phosphor-icons/react/dist/csr/Leaf";
import { Sparkle } from "@phosphor-icons/react/dist/csr/Sparkle";
type MotionSettings = {
  enabled: boolean;
  systemReduced: boolean;
  toggle: () => void;
};
const MotionContext = createContext<MotionSettings | null>(null);
const preferenceKey = "garden-motion";

export function useMotionSettings() {
  const settings = useContext(MotionContext);
  if (!settings) throw new Error("Motion components require MotionProvider");
  return settings;
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const systemReduced = !!useReducedMotion();
  const [requested, setRequested] = useState(() => {
    try {
      return localStorage.getItem(preferenceKey) !== "off";
    } catch {
      return true;
    }
  });
  const enabled = requested && !systemReduced;
  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? "on" : "off";
    try {
      localStorage.setItem(preferenceKey, requested ? "on" : "off");
    } catch {
      /* Persistence is optional. */
    }
  }, [enabled, requested]);
  useEffect(() => {
    const update = () => {
      document.documentElement.dataset.visibility = document.hidden
        ? "hidden"
        : "visible";
    };
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return (
    <MotionContext.Provider
      value={{
        enabled,
        systemReduced,
        toggle: () => setRequested((value) => !value),
      }}
    >
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion={enabled ? "never" : "always"}>
          {children}
        </MotionConfig>
      </LazyMotion>
    </MotionContext.Provider>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { enabled } = useMotionSettings();
  return (
    <m.div
      className={className}
      initial={enabled ? { opacity: 0, y: 24 } : false}
      animate={!enabled ? { opacity: 1, y: 0 } : undefined}
      whileInView={enabled ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: enabled ? 0.65 : 0,
        delay: enabled ? delay : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </m.div>
  );
}

export function Expandable({
  id,
  open,
  children,
}: {
  id: string;
  open: boolean;
  children: ReactNode;
}) {
  const { enabled } = useMotionSettings();
  return (
    <AnimatePresence initial={false}>
      {open && (
        <m.div
          id={id}
          className="expandable"
          initial={enabled ? { height: 0, opacity: 0 } : false}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            duration: enabled ? 0.35 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {children}
        </m.div>
      )}
    </AnimatePresence>
  );
}

export function AmbientGarden() {
  const { enabled } = useMotionSettings();
  if (!enabled) return null;
  return (
    <div className="ambient-garden" aria-hidden="true">
      {Array.from({ length: 9 }, (_, i) => (
        <span
          className={`drifting-element drifting-element-${i % 3}`}
          key={i}
          style={{
            left: `${8 + i * 10}%`,
            animationDuration: `${28 + i * 3}s`,
            animationDelay: `${-i * 6}s`,
          }}
        >
          {i % 3 === 0 ? (
            <Leaf weight="duotone" />
          ) : i % 3 === 1 ? (
            <Sparkle weight="fill" />
          ) : (
            <Flower weight="duotone" />
          )}
        </span>
      ))}
    </div>
  );
}
