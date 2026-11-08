"use client";

/* ============================================================
   NORA — Briques partagées : logo, avatars, badges, ornements.
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

/* ---------- Logo : marque N + wordmark, point flare ---------- */
export function Logo({ size = 28, wordmark = true }: { size?: number; wordmark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 select-none">
      <span
        className="relative grid place-items-center rounded-[7px] bg-signal text-[#07130b] font-display font-bold overflow-hidden"
        style={{ width: size, height: size, fontSize: size * 0.56 }}
        aria-hidden
      >
        N
        <span className="absolute bottom-0 right-0 size-[22%] bg-flare" />
      </span>
      {wordmark && (
        <span className="font-display font-bold tracking-[0.18em] text-foreground" style={{ fontSize: size * 0.62 }}>
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

/* ---------- Avatars (initiales + dégradé du profil) ---------- */
export function NoraAvatar({
  name,
  gradient,
  size = 40,
  online,
  className = "",
}: {
  name: string;
  gradient: [string, string];
  size?: number;
  online?: boolean;
  className?: string;
}) {
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  return (
    <span className={cn("relative inline-grid shrink-0 place-items-center rounded-full font-display font-semibold text-[#0b0d0a]", className)} style={{ width: size, height: size, fontSize: size * 0.38, background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}>
      {initials}
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
  return <Crown className="size-3.5 text-flare" />;
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
