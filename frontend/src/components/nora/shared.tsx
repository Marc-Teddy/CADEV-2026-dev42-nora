/* ============================================================
   NORA — Briques partagées : logo, avatars, badges, ornements.
   Logo v3 : silhouette de l'Afrique + nœud réseau sur tuile
   dégradé violette (« Network of Rising Africans »).
   ============================================================ */

import { cn } from "@/lib/utils";
import type { Badge } from "@/lib/types";
import { useLang } from "@/lib/i18n";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import {
  Award, Braces, Crown, GraduationCap, Hammer, Languages, Rocket, Star,
} from "lucide-react";

/* ---------- Chemins du continent (générés depuis la carte) ---------- */
const AFRICA_PATH =
  "26.5,15.2 35.4,14.2 42.9,14.2 45.9,18.1 49.8,20.5 52.9,19.0 64.6,19.5 65.6,21.0 70.2,29.1 72.7,36.0 76.3,39.5 84.9,39.2 78.7,49.0 73.0,55.0 72.6,57.8 73.7,65.6 67.9,71.2 65.6,77.1 63.9,80.9 52.9,85.8 51.2,85.0 49.2,79.6 47.3,73.8 48.0,66.2 46.1,63.6 45.9,59.7 41.9,50.7 42.2,47.0 38.6,46.7 35.7,44.8 33.5,44.9 32.0,45.4 28.3,45.7 24.6,46.6 21.2,44.7 18.8,42.5 18.4,41.5 16.5,39.1 15.4,37.6 14.6,36.3 14.9,35.0 15.4,33.0 15.4,30.0 22.3,19.5 22.6,18.5";
const MADAGASCAR_PATH =
  "82.7,63.0 83.7,66.3 82.2,71.4 82.4,76.7 80.0,77.6 78.6,72.9 79.0,67.4 80.7,63.7";

export function AfricaMark({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none" aria-hidden>
      <defs>
        <linearGradient id="nora-tile" x1="12" y1="86" x2="84" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5B21B6" />
          <stop offset="0.55" stopColor="#7C4DF0" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      {/* tuile dégradé, coins doux */}
      <rect x="2" y="2" width="92" height="92" rx="26" fill="url(#nora-tile)" />
      {/* silhouette Afrique + Madagascar */}
      <g>
        <polygon points={AFRICA_PATH} fill="rgba(255,255,255,0.94)" />
        <polygon points={MADAGASCAR_PATH} fill="rgba(255,255,255,0.94)" />
      </g>
      {/* orbite réseau + nœud teal : « rising » */}
      <path
        d="M58 8 A34 34 0 0 1 90 40"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="90" cy="40" r="5" fill="#00E0B0" />
      <circle cx="90" cy="40" r="8.5" fill="#00E0B0" opacity="0.25" />
    </svg>
  );
}

/* ---------- Logo (marque + wordmark) ---------- */
export function Logo({ size = 28, wordmark = true }: { size?: number; wordmark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <AfricaMark size={size} />
      {wordmark && (
        <span className="font-display font-bold tracking-[0.18em] text-foreground" style={{ fontSize: size * 0.56 }}>
          NORA
        </span>
      )}
    </span>
  );
}

/* ---------- Ornements ---------- */
/** Bande « tissage » : pixel-art discret inspiré des motifs tissés africains. */
export function WeaveStrip({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`h-[3px] w-full ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, var(--signal-muted) 0 14px, transparent 14px 22px, var(--flare) 22px 30px, transparent 30px 38px, var(--line) 38px 46px, transparent 46px 72px)",
        opacity: 0.75,
      }}
    />
  );
}

/** Kicker éditorial en mono : « // 01 — section » */
export function Kicker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono text-[11px] tracking-[0.22em] uppercase text-signal", className)}>
      <span className="text-flare mr-2">{"//"}</span>
      {children}
    </p>
  );
}

/* ---------- Formatters ---------- */
export function fmt(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(".0", "")}k` : `${n}`;
}

/* ---------- Avatars (photo téléversée ou initiales + dégradé) ---------- */
export function NoraAvatar({
  name,
  gradient,
  size = 40,
  online,
  className = "",
  avatarUrl,
}: {
  name: string;
  gradient: [string, string];
  size?: number;
  online?: boolean;
  className?: string;
  avatarUrl?: string;
}) {
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  return (
    <span className={cn("relative inline-grid shrink-0 place-items-center overflow-hidden rounded-full font-display font-semibold text-white", className)} style={{ width: size, height: size, fontSize: size * 0.38, background: avatarUrl ? undefined : `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}>
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
      ) : (
        initials
      )}
      {online !== undefined && (
        <span
          className={cn("absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-card", online ? "bg-signal" : "bg-muted-foreground")}
          style={{ width: size * 0.26, height: size * 0.26 }}
        />
      )}
    </span>
  );
}

/* ---------- Badges de réputation ---------- */
const badgeIcon: Record<Badge["kind"], typeof Star> = {
  mentor: GraduationCap,
  solo: Hammer,
  architect: Braces,
  challenger: Award,
  founder: Rocket,
  polyglote: Languages,
  opensource: Braces,
  star: Star,
};

export function BadgePill({ kind, label }: Badge) {
  const Icon = badgeIcon[kind] ?? Star;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-signal-muted/40 bg-signal-muted/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-signal">
      <Icon className="size-3" />
      {label}
    </span>
  );
}

export function CrownIcon() {
  return <Crown className="size-3.5 text-gold" />;
}

/* ---------- Toggle thème via View Transitions API ---------- */
export function useThemeSwitch() {
  return (setTheme: (t: string) => void, resolved: string | undefined) => {
    const next = resolved === "dark" ? "light" : "dark";
    const apply = () => setTheme(next);
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      (document as Document & { startViewTransition: (cb: () => void) => void }).startViewTransition(apply);
    } else {
      apply();
    }
  };
}

/* ---------- Bouton thème : rendu stable jusqu'au mount (anti-hydration) ---------- */
export function ThemeToggle({ className = "", iconClass = "" }: { className?: string; iconClass?: string }) {
  const { t } = useLang();
  const { theme, setTheme } = useTheme();
  const switchTheme = useThemeSwitch();
  // Le site démarre sombre : ce rendu initial est identique serveur / client.
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(true);

  // lecture réelle après paint (classe posée par next-themes avant hydratation)
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMounted(true);
      setDark(document.documentElement.classList.contains("dark"));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const isDark = mounted && dark;
  return (
    <button
      onClick={() => switchTheme(setTheme, theme)}
      className={className}
      aria-label={isDark ? t("app.theme.light") : t("app.theme.dark")}
    >
      {isDark ? <Moon className={iconClass} /> : <Sun className={`${iconClass} text-flare`} />}
    </button>
  );
}
