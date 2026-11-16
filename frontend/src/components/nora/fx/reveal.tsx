"use client";

/* ============================================================
   NORA — Révélation de texte au scroll
   Les mots sortent d'un masque (overflow hidden) un par un,
   avec un easing custom. Fallback : si prefers-reduced-motion,
   le texte s'affiche sans animation. Framer Motion whileInView.
   ============================================================ */

import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const; // ease-signal : pas de linear, pas de ease par défaut

/** Titre révélé mot par mot depuis un masque.
    L'observateur est posé sur le conteneur (jamais clippé), les mots
    enchaînent via variants + staggerChildren. */
export function TextReveal({
  text,
  className = "",
  delay = 0,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}) {
  const words = text.split(" ");
  return (
    <Tag className={className} aria-label={text}>
      {/* key = text : au changement de langue, le conteneur se remonte
          et la révélation repart proprement (l'état once:true n'est pas
          réutilisé entre deux textes différents). */}
      <motion.span
        key={text}
        className="inline"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ staggerChildren: 0.045, delayChildren: delay }}
      >
        {words.map((w, i) => (
          <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom" aria-hidden>
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: { y: "112%" },
                show: { y: "0%", transition: { duration: 0.62, ease: EASE } },
              }}
            >
              {w}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Bloc générique : fondu + translation courte à l'entrée dans le viewport. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
