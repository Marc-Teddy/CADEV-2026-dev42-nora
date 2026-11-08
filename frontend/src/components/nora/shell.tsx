"use client";

/* ============================================================
   NORA — Shell de l'application (zone connectée)
   Desktop : sidebar fixe + topbar (recherche → palette, thème,
   langue). Mobile : topbar compacte + barre d'onglets basse
   (cibles tactiles ≥ 44px). Footer collant respecté.
   ============================================================ */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeDollarSign, Code2, Home, LayoutDashboard, LogOut, MessageSquare,
  Newspaper, Search, Trophy, Users, Menu, X, User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNora } from "@/lib/store";
import { useLang } from "@/lib/i18n";
import { toast } from "sonner";
import { Logo, ThemeToggle, NoraAvatar } from "./shared";
import { devByUsername, CURRENT_USER } from "@/lib/data";
import { cn } from "@/lib/utils";

type NavId = "dashboard" | "feed" | "projects" | "devs" | "salons" | "challenges" | "missions";

const NAV: { id: NavId; icon: typeof Code2; key: string }[] = [
  { id: "dashboard", icon: LayoutDashboard, key: "app.dashboard" },
  { id: "feed", icon: Newspaper, key: "app.feed" },
  { id: "projects", icon: Code2, key: "app.projects" },
  { id: "devs", icon: Users, key: "app.devs" },
  { id: "salons", icon: MessageSquare, key: "app.salons" },
  { id: "challenges", icon: Trophy, key: "app.challenges" },
  { id: "missions", icon: BadgeDollarSign, key: "app.missions" },
];

/* Onglets regroupés par intention utilisateur, pas par module interne :
   · Espace      — ce qui m'appartient (tableau de bord, fil)
   · Découvrir   — ce que la communauté produit (projets, devs, salons)
   · Progresser  — ce qui me fait monter (challenges, missions) */
const GROUPS: { label: string; items: NavId[] }[] = [
  { label: "app.group.workspace", items: ["dashboard", "feed"] },
  { label: "app.group.discover", items: ["projects", "devs", "salons"] },
  { label: "app.group.grow", items: ["challenges", "missions"] },
];

const MOBILE_NAV: { id: NavId | "profile"; icon: typeof Code2; key: string }[] = [
  { id: "dashboard", icon: Home, key: "app.dashboard.short" },
  { id: "feed", icon: Newspaper, key: "app.feed.short" },
  { id: "salons", icon: MessageSquare, key: "app.salons" },
  { id: "challenges", icon: Trophy, key: "app.challenges" },
  { id: "profile", icon: User, key: "app.profile.short" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const { view, navigate, logout } = useNora();
  const { t, lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const me = devByUsername(CURRENT_USER)!;

  const navItem = (id: NavId, mobile = false) => {
    const n = NAV.find((x) => x.id === id)!;
    const on = view === id;
    return (
      <button
        key={id}
        onClick={() => { navigate(id); setMenuOpen(false); }}
        className={cn(
          "group relative flex w-full items-center gap-2.5 rounded-lg px-2.5 text-[13px] transition-colors duration-300",
          on ? "bg-signal/[0.1] text-signal" : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
          mobile ? "py-3 text-[14px]" : "py-2",
        )}
        aria-current={on ? "page" : undefined}
      >
        {/* icône encadrée : seule la vue active la teinte */}
        <span
          className={cn(
            "grid size-7 shrink-0 place-items-center rounded-md border transition-colors duration-300",
            on
              ? "border-signal-muted/40 bg-signal/[0.12] text-signal"
              : "border-transparent text-muted-foreground group-hover:text-foreground",
          )}
        >
          <n.icon className="size-4" />
        </span>
        {t(n.key)}
        {/* repère d'activation : point flare, le micro-détail de la charte */}
        {on && (
          <motion.span
            layoutId="nav-dot"
            className="absolute -left-2.5 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-flare"
          />
        )}
      </button>
    );
  };

  return (
    <div className="flex min-h-svh flex-col bg-background">
      {/* ---------- sidebar desktop ---------- */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[232px] flex-col border-r border-line bg-sidebar px-4 py-5 lg:flex">
        <button onClick={() => navigate("landing")} className="mb-8 px-1 cursor-pointer" aria-label="NORA">
          <Logo size={28} />
        </button>

        <button
          onClick={() => useNora.getState().setCommandOpen(true)}
          className="mb-6 flex h-9 items-center gap-2 rounded-lg border border-line bg-surface px-3 font-mono text-[11px] text-muted-foreground transition-colors hover:border-signal-muted/50 hover:text-signal"
        >
          <Search className="size-3.5" />
          {t("app.search")}
          <kbd className="ml-auto rounded bg-surface-2 px-1.5 py-0.5 text-[9px] tracking-widest">⌘K</kbd>
        </button>

        <nav className="mt-1" aria-label="Navigation principale">
          {GROUPS.map((g) => (
            <div key={g.label} className="mt-3 first:mt-0">
              <p className="mb-1 px-2.5 font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground/60">
                {t(g.label)}
              </p>
              <div className="space-y-0.5">
                {g.items.map((id) => navItem(id))}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-auto space-y-3">
          <button
            onClick={() => navigate("profile")}
            className="flex w-full items-center gap-3 rounded-xl border border-line bg-surface p-3 text-left transition-colors hover:border-signal-muted/50"
          >
            <NoraAvatar name={me.name} gradient={me.gradient} size={36} online />
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-medium text-foreground">{me.name}</span>
              <span className="block font-mono text-[10px] text-muted-foreground">@{me.username}</span>
            </span>
          </button>
          <div className="flex items-center gap-2">
            <ThemeToggle
              className="grid h-9 flex-1 place-items-center rounded-lg border border-line text-muted-foreground transition-colors hover:text-signal"
              iconClass="size-3.5"
            />
            <button
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              className="flex h-9 flex-1 items-center justify-center rounded-lg border border-line font-mono text-[10px] text-muted-foreground transition-colors hover:text-signal"
            >
              FR/EN
            </button>
            <button
              onClick={() => { logout(); navigate("landing"); }}
              className="grid h-9 flex-1 place-items-center rounded-lg border border-line text-muted-foreground transition-colors hover:border-flare/40 hover:text-flare"
              aria-label={t("app.logout")}
            >
              <LogOut className="size-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* ---------- zone principale ---------- */}
      <div className="flex flex-1 flex-col lg:pl-[232px]">
        {/* topbar mobile */}
        <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-line bg-background/85 px-4 backdrop-blur-xl lg:hidden">
          <button onClick={() => navigate("landing")} aria-label="NORA">
            <Logo size={26} />
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => useNora.getState().setCommandOpen(true)}
              className="grid size-9 place-items-center rounded-lg border border-line text-muted-foreground"
              aria-label={t("app.search")}
            >
              <Search className="size-4" />
            </button>
            <ThemeToggle
              className="grid size-9 place-items-center rounded-lg border border-line text-muted-foreground"
              iconClass="size-4"
            />
            <button
              onClick={() => setMenuOpen(true)}
              className="grid size-9 place-items-center rounded-lg border border-line text-muted-foreground"
              aria-label={t("nav.menu")}
            >
              <Menu className="size-4" />
            </button>
          </div>
        </header>

        {/* bandeau démo */}
        <div className="border-b border-line bg-surface/60 px-4 py-1.5 text-center font-mono text-[9.5px] uppercase tracking-[0.2em] text-muted-foreground/70 sm:px-6">
          {t("app.demo")}
        </div>

        <main className="flex-1 px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-10">{children}</main>

        <footer className="mt-auto hidden border-t border-line px-8 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/60 lg:flex lg:items-center lg:justify-between">
          <span>
            NORA
            <span className="mx-2.5 inline-block size-[3px] rounded-full bg-flare/70 align-middle" />
            une équipe dev42
          </span>
          <span>{t("footer.cmdk")}</span>
        </footer>
      </div>

      {/* ---------- dock d'onglets mobile flottant ---------- */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 pb-[max(env(safe-area-inset-bottom),10px)] lg:hidden"
        aria-label="Navigation mobile"
      >
        <div className="mx-3 rounded-2xl border border-line bg-popover/95 shadow-[0_18px_50px_-14px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <div className="grid grid-cols-5 gap-1 px-1.5 py-1.5">
            {MOBILE_NAV.map((n) => {
              const on = view === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => navigate(n.id)}
                  className="relative flex h-[52px] flex-col items-center justify-center gap-1 rounded-xl transition-colors duration-300"
                  aria-current={on ? "page" : undefined}
                >
                  {on && (
                    <motion.span
                      layoutId="dock-pill"
                      className="absolute inset-0 rounded-xl border border-signal-muted/30 bg-signal/[0.1]"
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                  <n.icon className={cn("relative z-[1] size-[18px] transition-colors duration-300", on ? "text-signal" : "text-muted-foreground")} />
                  <span className={cn("relative z-[1] text-[9px] font-medium uppercase tracking-wider transition-colors duration-300", on ? "text-signal" : "text-muted-foreground")}>
                    {t(n.key)}
                  </span>
                  {on && <span className="absolute -top-[2px] left-1/2 z-[1] size-[4px] -translate-x-1/2 rounded-full bg-flare" />}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ---------- menu mobile complet ---------- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              className="absolute right-3 top-3 w-[260px] rounded-2xl border border-line bg-popover p-3 shadow-2xl"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-2 flex items-center justify-between px-1">
                <Logo size={24} />
                <button onClick={() => setMenuOpen(false)} className="grid size-8 place-items-center rounded-lg text-muted-foreground" aria-label="Fermer">
                  <X className="size-4" />
                </button>
              </div>
              <nav className="space-y-1 py-2">
                {GROUPS.map((g) => (
                  <div key={g.label}>
                    <p className="mb-1 px-2.5 pt-2 font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground/60">
                      {t(g.label)}
                    </p>
                    {g.items.map((id) => navItem(id, true))}
                  </div>
                ))}
                <button
                  onClick={() => { logout(); navigate("landing"); }}
                  className="mt-2 flex w-full items-center gap-3 rounded-lg px-3.5 py-3 text-[14px] text-muted-foreground transition-colors hover:bg-surface-2 hover:text-flare"
                >
                  <LogOut className="size-4" /> {t("app.logout")}
                </button>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- entête de vue partagée ---------- */
export function ViewHeader({ kicker, title, sub, action }: { kicker: string; title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="font-mono text-[11px] tracking-[0.2em] text-signal">
          <span className="mr-2 text-flare">{"//"}</span>{kicker}
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
        {sub && <p className="mt-1.5 max-w-[520px] text-[13.5px] text-muted-foreground">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

/* petit helper toast démo */
export function demoToast(msg: string) {
  toast(msg);
}
