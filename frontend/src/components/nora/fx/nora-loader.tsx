"use client";

/* ============================================================
   NORA — Écran de chargement animé (splash).
   Séquence : un « N » droit apparaît bloc par bloc, fait un tour
   complet (360°), puis glisse / se transforme en la forme finale
   du logo (diagonale « éclair », comme l'image de la marque), avec
   le wordmark NORA, avant de s'effacer pour révéler la page.
   Aucun fond d'écran : surface unie sur le fond du thème.
   ============================================================ */

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { buildN, buildMark, cellColor } from "@/components/nora/n-mark";

type Phase = "loading" | "morph" | "settle" | "out";

const EASE = [0.22, 1, 0.36, 1] as const;

export function NoraLoader({
  active,
  onFinish,
}: {
  active: boolean;
  onFinish: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("loading");
  const mountedAt = useRef<number>(Date.now());

  /* Forme d'intro (N) ordonnée pour l'assemblage/onde. */
  const nCells = useMemo(() => buildN(), []);
  const nOrdered = useMemo(
    () => nCells.map((c, i) => ({ ...c, i })).sort((a, b) => a.r - b.r || b.c - a.c),
    [nCells],
  );
  /* Forme finale (logo de l'image). */
  const markCells = useMemo(() => buildMark(), []);

  const shown = phase !== "loading"; // N -> forme finale (glisse) à partir du morph

  /* Enchaînement des phases : au plus tôt après une durée mini et une fois
     le chargement terminé (active === false). Garde-fou à 6 s. Une seule fois. */
  const scheduled = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (scheduled.current) return;
    const MIN_MS = 1900; // laisse le temps au tour (1,4 s) + assemblage
    const MORPH_MS = 800; // durée du glissement N -> forme finale
    const HOLD_MS = 1500; // logo final maintenu, comme la photo

    const start = () => {
      if (scheduled.current) return;
      scheduled.current = true;
      const wait = Math.max(0, MIN_MS - (Date.now() - mountedAt.current));
      timers.current.push(
        setTimeout(() => {
          setPhase("morph");
          timers.current.push(
            setTimeout(() => {
              setPhase("settle");
              timers.current.push(setTimeout(() => setPhase("out"), HOLD_MS));
            }, MORPH_MS),
          );
        }, wait),
      );
    };

    if (!active) start();
    timers.current.push(setTimeout(start, 6000));
  }, [active]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  return (
    <AnimatePresence>
      {phase !== "out" ? (
        <motion.div
          key="nora-splash"
          className="fixed inset-0 z-[60] grid place-items-center bg-[#0B0912]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.55, ease: EASE }}
          onAnimationComplete={(d) => {
            if ((d as { opacity?: number })?.opacity === 0) onFinish();
          }}
        >
          <SplashStyles />
          <div className="flex flex-col items-center gap-7">
            {/* bloc logo : rotation d'un tour complet pendant l'intro */}
            <motion.div
              aria-label="NORA"
              role="img"
              style={{ transformOrigin: "center" }}
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.4, ease: EASE }}
            >
              <div className="grid place-items-center">
                {/* porteur du filtre + gabarit de taille de la cellule */}
                <svg
                  viewBox="0 0 120 100"
                  width="300"
                  className="max-w-[62vw]"
                  style={{ gridArea: "1 / 1" }}
                  aria-hidden
                >
                  <defs>
                    <filter id="nora-glow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="1.3" result="b" />
                      <feMerge>
                        <feMergeNode in="b" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                </svg>

                {/* N d'intro (glisse vers le haut et disparaît au morph) */}
                <motion.svg
                  viewBox="0 0 120 100"
                  width="300"
                  className="max-w-[62vw]"
                  style={{ gridArea: "1 / 1" }}
                  initial={{ opacity: 1, y: 0 }}
                  animate={shown ? { opacity: 0, y: -16 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <g filter="url(#nora-glow)">
                    {nOrdered.map(({ c, r, i }) => (
                      <rect
                        key={`n-${c}-${r}`}
                        className="nora-splash-cell"
                        x={c * 10 + 1}
                        y={r * 10 + 1}
                        width={8}
                        height={8}
                        rx={1.6}
                        fill={cellColor(c, r)}
                        style={{ "--d": `${i * 0.03}s`, "--o": `${i * 0.06}s` } as React.CSSProperties}
                      />
                    ))}
                  </g>
                </motion.svg>

                {/* forme finale (logo image) : glisse depuis le bas et se fige */}
                <motion.svg
                  viewBox="0 0 120 100"
                  width="300"
                  className={`max-w-[62vw] ${phase === "settle" ? "nora-mark-glow" : ""}`}
                  style={{ gridArea: "1 / 1" }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <g filter="url(#nora-glow)">
                    {markCells.map(({ c, r }) => (
                      <rect
                        key={`m-${c}-${r}`}
                        x={c * 10 + 1}
                        y={r * 10 + 1}
                        width={8}
                        height={8}
                        rx={1.6}
                        fill={cellColor(c, r)}
                      />
                    ))}
                  </g>
                </motion.svg>
              </div>
            </motion.div>

            {/* wordmark : apparaît une fois la forme finale posée */}
            <motion.div
              className="flex flex-col items-center gap-1"
              initial={{ opacity: 0, y: 8 }}
              animate={phase === "settle" ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span
                className="font-display font-extrabold tracking-[0.42em] text-[26px] pl-[0.42em]"
                style={{ color: "#FDE047" }}
              >
                NORA
              </span>
              <span
                className="font-mono text-[10px] tracking-[0.3em] pl-[0.3em]"
                style={{ color: "#EC4899" }}
              >
                NETWORK OF RISING AFRICAN
              </span>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function SplashStyles() {
  return (
    <style>{`
      .nora-splash-cell {
        transform-box: fill-box;
        transform-origin: center;
        opacity: 0;
        transform: scale(0.1);
        animation:
          nora-pop 0.5s cubic-bezier(0.22,1,0.36,1) var(--d) forwards,
          nora-wave 1.5s ease-in-out calc(var(--o) + 0.5s) infinite;
      }
      .nora-mark-glow {
        animation: nora-settle-glow 0.9s ease-out forwards;
      }
      @keyframes nora-pop {
        0%   { opacity: 0; transform: scale(0.1); }
        70%  { opacity: 1; transform: scale(1.18); }
        100% { opacity: 1; transform: scale(1); }
      }
      @keyframes nora-wave {
        0%, 100% { filter: brightness(0.82); opacity: 0.82; transform: scale(1); }
        50%      { filter: brightness(1.7);  opacity: 1;    transform: scale(1.12); }
      }
      @keyframes nora-settle-glow {
        0%   { filter: drop-shadow(0 0 0 rgba(244,63,125,0)); }
        40%  { filter: drop-shadow(0 0 26px rgba(244,63,125,0.55)); }
        100% { filter: drop-shadow(0 0 10px rgba(244,63,125,0.22)); }
      }
      @media (prefers-reduced-motion: reduce) {
        .nora-splash-cell { opacity: 1; transform: scale(1); animation: none; }
      }
    `}</style>
  );
}
