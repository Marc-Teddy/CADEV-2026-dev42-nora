"use client";

/* ============================================================
   NORA — Bouton magnétique
   Le bloc s'aimante vers le pointeur dans un rayon donné et
   reprend sa place avec un ressort. Micro-interaction physique,
   jamais plus de quelques pixels de déplacement.
   ============================================================ */

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { EASE } from "./reveal";

export function Magnetic({
  children,
  className = "",
  strength = 0.28,
  radius = 90,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.6 });

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist < radius + rect.width / 2) {
          x.set(dx * strength);
          y.set(dy * strength);
        } else {
          x.set(0);
          y.set(0);
        }
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
