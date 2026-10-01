import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "motion/react";
import * as m from "motion/react-m";
import { Sparkle } from "@phosphor-icons/react/dist/csr/Sparkle";
import { useMotionSettings } from "./Motion";
import { profile } from "../profile";
import { asset } from "../lib/site";
export function Portrait() {
  const { enabled } = useMotionSettings();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 65, damping: 20 });
  const springY = useSpring(y, { stiffness: 65, damping: 20 });
  const canParallax = useRef(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 900px) and (pointer: fine)");
    const update = () => {
      canParallax.current = query.matches;
      if (!query.matches) {
        x.set(0);
        y.set(0);
      }
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [x, y]);
  useEffect(() => {
    if (!enabled) {
      x.set(0);
      y.set(0);
    }
  }, [enabled, x, y]);
  return (
    <m.div
      className="portrait-composition"
      data-pause-offscreen
      initial={enabled ? { opacity: 0, y: 28, rotate: 2 } : false}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: enabled ? 1 : 0, delay: enabled ? 0.2 : 0 }}
      onPointerMove={(event) => {
        if (!enabled || !canParallax.current) return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.025);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.025);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <div className="portrait-backdrop" aria-hidden="true" />
      <div className="portrait-orbit" aria-hidden="true" />
      <m.div
        className="portrait-parallax"
        style={enabled ? { x: springX, y: springY } : undefined}
      >
        <div className="portrait-frame">
          <img
            src={asset(profile.avatar)}
            alt="Yuyang’s pastel pink and lavender anime avatar"
            width="460"
            height="460"
            fetchPriority="high"
          />
        </div>
      </m.div>
      <img
        className="hero-blossoms"
        src={asset("images/blossoms.webp")}
        alt=""
        width="1536"
        height="1024"
        aria-hidden="true"
      />
      <div className="curiosity-sticker">
        <Sparkle weight="light" size={22} />
        <span>
          always a<br />
          <em>little curious</em>
        </span>
      </div>
      <span className="portrait-caption">
        a little imagination goes a long way
      </span>
      <div className="portrait-sparkle portrait-sparkle-one" aria-hidden="true">
        <Sparkle weight="light" />
      </div>
      <div className="portrait-sparkle portrait-sparkle-two" aria-hidden="true">
        <Sparkle weight="light" />
      </div>
      <span className="portrait-coordinate" aria-hidden="true">
        THEORY × IMAGINATION
      </span>
    </m.div>
  );
}
