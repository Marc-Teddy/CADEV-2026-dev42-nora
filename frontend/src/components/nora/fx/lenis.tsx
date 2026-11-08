"use client";

/* ============================================================
   NORA — Défilement cinétique (Lenis)
   Smooth scroll avec easing physique. La navigation SPA émet
   l'événement « nora:jump-top » pour remonter instantanément.
   Respecte prefers-reduced-motion (boucle non démarrée).
   ============================================================ */

import { useEffect } from "react";
import Lenis from "lenis";

export const NORA_JUMP = "nora:jump-top";

export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out, jamais linear
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onJump = () => lenis.scrollTo(0, { immediate: true });
    window.addEventListener(NORA_JUMP, onJump);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener(NORA_JUMP, onJump);
      lenis.destroy();
    };
  }, []);

  return null;
}
