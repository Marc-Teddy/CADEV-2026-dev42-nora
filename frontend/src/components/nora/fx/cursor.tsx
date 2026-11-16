"use client";

/* ============================================================
   NORA — Curseur personnalisé
   · Point orange (flare) verrouillé au centre de l'anneau : les
     deux éléments partagent les mêmes ressorts, le point ne
     dérive jamais vers le bord du cercle.
   · Anneau blanc en mix-blend-mode: difference : suit le pointeur
     avec une inertie douce, s'agrandit sur les éléments interactifs
     et s'aimante aux boutons magnétiques.
   · Désactivé sur pointeur tactile et sous prefers-reduced-motion.
   ============================================================ */

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]';

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // L'anneau et le point partagent la même trajectoire ressortie :
  // le point reste toujours parfaitement centré dans le cercle.
  const ringX = useSpring(x, { stiffness: 480, damping: 34, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 480, damping: 34, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    // activation différée d'un frame : évite le setState synchrone dans l'effet
    const enableId = requestAnimationFrame(() => setEnabled(true));
    document.documentElement.classList.add("custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      setHovering(!!target?.closest(INTERACTIVE));
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      cancelAnimationFrame(enableId);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Anneau : blanc pur pour que blend-difference inverse le fond */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border border-white mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 44 : 28,
          height: hovering ? 44 : 28,
          opacity: pressed ? 0.7 : 1,
        }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Point orange : immobile au centre de l'anneau, même trajectoire */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[101] size-[6px] rounded-full bg-flare"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: pressed ? 0.45 : hovering ? 0.55 : 1 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
}
