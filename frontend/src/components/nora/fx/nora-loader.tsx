"use client";

/* ============================================================
   NORA — Écran de chargement animé (splash).
   La lettre « N » (forme en éclair pixelisée du logo) s'assemble
   bloc par bloc, ondule pendant le chargement, puis se fige sur
   la forme finale du logo avant de s'effacer pour révéler la page.
   Aucun fond d'écran : surface unie sur le fond du thème.
   ============================================================ */

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const COLS = 12;
const ROWS = 10;

type Cell = { c: number; r: number };

/* Génère les blocs de l'éclair « N » : barre haute, diagonale, barre basse. */
function buildBolt(): Cell[] {
  const cells: Cell[] = [];
  const push = (c: number, r: number) => cells.push({ c, r });
  // barre supérieure (haut-droite)
  for (let r = 1; r <= 2; r++) for (let c = 4; c <= 8; c++) push(c, r);
  // diagonale haut-droite -> bas-gauche (épaisseur 2)
  for (let r = 2; r <= 7; r++) {
    const c = 7 - (r - 2);
    push(c, r);
    push(c + 1, r);
  }
  // barre inférieure (bas-gauche)
  for (let r = 7; r <= 8; r++) for (let c = 2; c <= 6; c++) push(c, r);
  // dédoublonnage
  const seen = new Set<string>();
  return cells.filter(({ c, r }) => {
    const k = `${c},${r}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/* Dégradé : vert-lime (bas-gauche) -> jaune -> orange -> rose -> magenta (haut-droite). */
const STOPS: [number, [number, number, number]][] = [
  [0.0, [166, 226, 46]],
  [0.3, [250, 204, 21]],
  [0.55, [249, 115, 22]],
  [0.78, [244, 63, 125]],
  [1.0, [208, 38, 143]],
];

function cellColor(c: number, r: number): string {
  const v = (c / (COLS - 1) + (ROWS - 1 - r) / (ROWS - 1)) / 2;
  let lo = STOPS[0];
  let hi = STOPS[STOPS.length - 1];
  for (let i = 0; i < STOPS.length - 1; i++) {
    if (v >= STOPS[i][0] && v <= STOPS[i + 1][0]) {
      lo = STOPS[i];
      hi = STOPS[i + 1];
      break;
    }
  }
  const t = hi[0] === lo[0] ? 0 : (v - lo[0]) / (hi[0] - lo[0]);
  const mix = (a: number, b: number) => Math.round(a + (b - a) * t);
  const [r1, g1, b1] = lo[1];
  const [r2, g2, b2] = hi[1];
  return `rgb(${mix(r1, r2)}, ${mix(g1, g2)}, ${mix(b1, b2)})`;
}

type Phase = "loading" | "settle" | "out";

export function NoraLoader({
  active,
  onFinish,
}: {
  active: boolean;
  onFinish: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("loading");
  const mountedAt = useRef<number>(Date.now());

  const cells = useMemo(() => buildBolt(), []);
  /* ordre d'assemblage/onde : de haut-droite vers bas-gauche */
  const ordered = useMemo(
    () => cells.map((c, i) => ({ ...c, i })).sort((a, b) => a.r - b.r || b.c - a.c),
    [cells],
  );

  /* Passage en phase « settle » : au plus tôt après une durée mini, et une
     fois le chargement réel terminé (active === false). Garde-fou à 6 s.
     La planification n'a lieu qu'une seule fois (scheduled). */
  const scheduled = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (scheduled.current) return;
    const MIN_MS = 2000;
    const SETTLE_MS = 950;

    const start = () => {
      if (scheduled.current) return;
      scheduled.current = true;
      const wait = Math.max(0, MIN_MS - (Date.now() - mountedAt.current));
      timers.current.push(
        setTimeout(() => {
          setPhase("settle");
          timers.current.push(setTimeout(() => setPhase("out"), SETTLE_MS));
        }, wait),
      );
    };

    if (!active) start();
    // garde-fou : déclenche même si le chargement ne se termine jamais
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
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={(d) => {
            if ((d as { opacity?: number })?.opacity === 0) onFinish();
          }}
        >
          <SplashStyles />
          <div className="flex flex-col items-center gap-7">
            <div
              className={`nora-splash-bolt ${phase === "settle" ? "is-settled" : ""}`}
              aria-label="NORA"
              role="img"
            >
              <svg viewBox="0 0 120 100" width="300" className="max-w-[62vw]">
                <defs>
                  <filter id="nora-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="1.3" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <g filter="url(#nora-glow)">
                  {ordered.map(({ c, r, i }) => (
                    <rect
                      key={`${c}-${r}`}
                      className="nora-splash-cell"
                      x={c * 10 + 1}
                      y={r * 10 + 1}
                      width={8}
                      height={8}
                      rx={1.6}
                      fill={cellColor(c, r)}
                      style={
                        {
                          "--d": `${i * 0.035}s`,
                          "--o": `${i * 0.06}s`,
                        } as React.CSSProperties
                      }
                    />
                  ))}
                </g>
              </svg>
            </div>

            <motion.div
              className="flex flex-col items-center gap-1"
              initial={{ opacity: 0, y: 8 }}
              animate={phase === "settle" ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
      .nora-splash-bolt.is-settled .nora-splash-cell {
        /* forme finale figée (comme sur le logo) + petit éclat */
        animation: nora-pop 0.45s cubic-bezier(0.22,1,0.36,1) forwards;
        opacity: 1;
        transform: scale(1);
      }
      .nora-splash-bolt.is-settled {
        animation: nora-settle-glow 0.95s ease-out forwards;
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
        .nora-splash-cell {
          opacity: 1;
          transform: scale(1);
          animation: none;
        }
        .nora-splash-bolt.is-settled { animation: none; }
      }
    `}</style>
  );
}
