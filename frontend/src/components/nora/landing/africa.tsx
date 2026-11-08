"use client";

/* ============================================================
   NORA — Section « Le terrain » : carte d'Afrique en matrice de points
   Le maillage est généré au runtime (test point-dans-polygone sur une
   grille), chaque point s'allume en cascade du nord au sud au scroll.
   Les villes actives pulsent ; survoler une ville l'illumine sur la carte.
   ============================================================ */

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { TextReveal, Reveal, EASE } from "@/components/nora/fx/reveal";
import { Kicker } from "@/components/nora/shared";
import { cn } from "@/lib/utils";

/* Silhouette simplifiée du continent (espace 0–100, nord→sud) */
const AFRICA: [number, number][] = [
  [19.7, 3], [31.9, 1.6], [42, 1.6], [46.1, 7], [51.4, 10.3], [55.6, 8.2],
  [71.5, 8.9], [72.9, 11], [79.2, 22], [82.6, 31.5], [87.5, 36.3], [99.2, 35.9],
  [90.7, 49.3], [83, 57.5], [82.4, 61.4], [84, 72], [76.1, 79.7], [73, 87.7],
  [70.8, 93], [55.6, 99.7], [53.3, 98.6], [50.6, 91.2], [48, 83.3], [49, 72.9],
  [46.4, 69.3], [46.1, 64], [40.8, 51.6], [41.2, 46.6], [36.1, 46.2], [32.5, 43.6],
  [29.4, 43.7], [27.5, 44.4], [22.2, 44.8], [17.5, 46], [12.8, 43.4], [9.4, 40.4],
  [8.8, 39], [6.1, 35.8], [4.7, 33.7], [3.6, 31.9], [4.9, 30.1], [5.6, 27.4],
  [5.6, 23.3], [14.2, 8.9], [14.6, 7.5],
];

/* Madagascar */
const MADAGASCAR: [number, number][] = [
  [96.2, 68.5], [97.5, 73], [95.5, 80], [95.8, 87.2], [92.5, 88.5], [90.6, 82], [91.2, 74.5], [93.5, 69.5],
];

/* Villes technologiques réelles du continent — aucun chiffre
   inventé : les membres réels arriveront avec l'API Go.
   side : côté d'étiquette pour éviter les collisions sur la côte ouest. */
const CITIES: { name: string; x: number; y: number; major?: boolean; side?: "left" | "right" | "below" }[] = [
  { name: "Casablanca", x: 17.2, y: 6.0 },
  { name: "Le Caire", x: 71.1, y: 10.9, major: true, side: "right" },
  { name: "Dakar", x: 3.6, y: 31.9, major: true, side: "right" },
  { name: "Abidjan", x: 22.2, y: 44.8, major: true, side: "below" },
  { name: "Accra", x: 27.5, y: 44.4 },
  { name: "Lagos", x: 32.5, y: 43.3, major: true, side: "left" },
  { name: "Douala", x: 41.2, y: 46.6 },
  { name: "Addis-Abeba", x: 81.5, y: 39.7 },
  { name: "Kampala", x: 73.0, y: 51.7 },
  { name: "Nairobi", x: 78.9, y: 53.7, major: true, side: "left" },
  { name: "Kigali", x: 69.4, y: 54.7 },
  { name: "Antananarivo", x: 93.8, y: 77.8 },
  { name: "Johannesburg", x: 66.7, y: 88.0, major: true, side: "right" },
];

function inside(pt: [number, number], poly: [number, number][]): boolean {
  let ok = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if ((yi > pt[1]) !== (yj > pt[1]) && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) ok = !ok;
  }
  return ok;
}

/* hash déterministe pour choisir les « membres actifs » */
const hash = (x: number, y: number) => ((Math.sin(x * 127.1 + y * 311.7) * 43758.5453) % 1 + 1) % 1;

function useAfricaDots(step = 2.15) {
  return useMemo(() => {
    const dots: { x: number; y: number; o: number; active: boolean }[] = [];
    for (let y = step / 2; y < 100; y += step) {
      for (let x = 0; x < 100; x += step) {
        const p: [number, number] = [x, y];
        if (inside(p, AFRICA) || inside(p, MADAGASCAR)) {
          dots.push({ x, y, o: 0.28 + hash(x, y) * 0.5, active: hash(x * 1.7, y * 2.3) > 0.955 });
        }
      }
    }
    return dots;
  }, [step]);
}

function AfricaMapSvg() {
  const dots = useAfricaDots();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <svg
      viewBox="-4 -4 108 108"
      className="h-auto w-full"
      role="img"
      aria-label="Carte d'Afrique — villes actives de la communauté NORA"
    >
      {/* contour discret */}
      <motion.polygon
        points={AFRICA.map((p) => p.join(",")).join(" ")}
        fill="none"
        stroke="var(--signal-muted)"
        strokeWidth="0.35"
        strokeDasharray="1.6 1.6"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.55 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 2.2, ease: "easeOut" }}
      />
      <motion.polygon
        points={MADAGASCAR.map((p) => p.join(",")).join(" ")}
        fill="none"
        stroke="var(--signal-muted)"
        strokeWidth="0.35"
        strokeDasharray="1.6 1.6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.55 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.8 }}
      />

      {/* matrice de points */}
      {dots.map((d, i) => (
        <motion.circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.active ? 0.78 : 0.52}
          fill={d.active ? "var(--signal)" : "var(--muted-foreground)"}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: d.active ? 0.95 : d.o * 0.55, scale: 1 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.4, delay: (d.y / 100) * 1.4 + (d.x / 100) * 0.3, ease: EASE }}
          style={{ transformOrigin: `${d.x}px ${d.y}px` }}
        />
      ))}

      {/* villes : hubs majeurs en orange, relais en vert signal */}
      {CITIES.map((c) => {
        const lit = hovered === c.name;
        const color = c.major ? "var(--flare)" : "var(--signal)";
        return (
          <g
            key={c.name}
            onMouseEnter={() => setHovered(c.name)}
            onMouseLeave={() => setHovered(null)}
            className="cursor-pointer"
          >
            <motion.circle
              cx={c.x}
              cy={c.y}
              fill={color}
              r={lit ? 1.5 : c.major ? 1.15 : 0.95}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 1.2 + (c.y / 100) * 0.8, ease: EASE }}
              style={{ transformOrigin: `${c.x}px ${c.y}px` }}
            />
            {/* halo pulsant */}
            <motion.circle
              cx={c.x}
              cy={c.y}
              fill="none"
              stroke={color}
              strokeWidth="0.3"
              initial={{ r: 1, opacity: 0.6 }}
              animate={{ r: [1, 3.2], opacity: [0.55, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: 1.6 + (c.y / 100), ease: "easeOut" }}
            />
            {/* étiquettes — side évite les collisions de la côte ouest */}
            {(c.major || lit) && (
              <motion.text
                x={
                  c.side === "below" ? c.x
                    : c.side === "left" || (c.x > 78 && c.side !== "right") || (c.x < 45 && c.y > 38 && c.y < 50 && !c.side) ? c.x - 2
                    : c.x + 2
                }
                y={c.side === "below" ? c.y + 4.6 : c.y - 2.4}
                textAnchor={
                  c.side === "below" ? "middle"
                    : c.side === "left" || (c.side !== "right" && (c.x > 78 || (c.x < 45 && c.y > 38 && c.y < 50))) ? "end"
                    : "start"
                }
                className="fill-foreground font-mono"
                fontSize={hovered === c.name ? 3.4 : 2.9}
                style={{ paintOrder: "stroke", stroke: "var(--background)", strokeWidth: 0.8 }}
              >
                {c.name}
                {c.major && <tspan fill="var(--flare-bright)" fontSize={2.2}> · hub</tspan>}
              </motion.text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function AfricaSection() {
  const { t } = useLang();
  const top = [...CITIES].sort((a, b) => Number(b.major ?? false) - Number(a.major ?? false)).slice(0, 7);

  return (
    <section id="communaute" className="relative border-t border-line bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* texte */}
          <div className="parallax-slow" style={{ "--plx": "34px" } as React.CSSProperties}>
            <Kicker>{t("africa.kicker")}</Kicker>
            <TextReveal text={t("africa.title")} className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[44px]" />
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[440px] leading-relaxed text-muted-foreground">{t("africa.sub")}</p>
            </Reveal>

            <Reveal delay={0.18} className="mt-8">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {t("africa.cities")}
              </p>
              <div className="flex flex-wrap gap-2">
                {top.map((c, i) => (
                  <span
                    key={c.name}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-[11px] transition-colors duration-300",
                      c.major
                        ? "border-flare/25 bg-flare-soft text-foreground hover:border-flare/50"
                        : "border-line bg-surface-2 text-foreground hover:border-signal-muted/60",
                    )}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <MapPin className={cn("size-3", c.major ? "text-flare" : "text-signal")} />
                    {c.name}
                    {c.major && <span className="text-[9px] uppercase tracking-[0.14em] text-flare-bright">{t("africa.hub")}</span>}
                  </span>
                ))}
              </div>
              <p className="mt-5 font-mono text-[10px] text-muted-foreground/60">{t("africa.note")}</p>
            </Reveal>
          </div>

          {/* carte */}
          <Reveal delay={0.12} className={cn("relative rounded-2xl border border-line bg-surface p-4 sm:p-8")}>
            <div className="absolute inset-0 rounded-2xl bg-dots opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
            <AfricaMapSvg />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
