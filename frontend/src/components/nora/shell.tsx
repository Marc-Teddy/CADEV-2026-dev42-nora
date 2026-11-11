"use client";

/* ============================================================
   NORA — Shell de l'application (zone connectée)
   Desktop : sidebar (onglets par intention) + topbar (recherche,
   cloche, paramètres, compte). Mobile : topbar compacte + dock
   basse (cibles tactiles ≥ 44px). L'onglet Studio ouvre l'IDE.
   ============================================================ */

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell, ChevronRight, Code2, Home, LayoutDashboard, LogOut, MessageSquare,
  Newspaper, Search, Settings, SquareTerminal, Trophy, Users, Menu, X, User,
  BadgeDollarSign,
} from "lucide-react";
import { useNora } from "@/lib/store";
import { useLang } from "@/lib/i18n";
import { toast } from "sonner";
import { Logo, ThemeToggle, NoraAvatar } from "./shared";
import { NotificationsBell, SettingsButton, SettingsDialog, UserMenu } from "./topbar";
import { cn } from "@/lib/utils";

type NavId = "dashboard" | "feed" | "projects" | "devs" | "salons" | "challenges" | "missions" | "studio";

const NAV: { id: NavId; icon: typeof Code2; key: string }[] = [
  { id: "dashboard", icon: LayoutDashboard, key: "app.dashboard" },
  { id: "feed", icon: Newspaper, key: "app.feed" },
  { id: "studio", icon: SquareTerminal, key: "app.studio" },
  { id: "projects", icon: Code2, key: "app.projects" },
  { id: "devs", icon: Users, key: "app.devs" },
  { id: "salons", icon: MessageSquare, key: "app.salons" },
  { id: "challenges", icon: Trophy, key: "app.challenges" },
  { id: "missions", icon: BadgeDollarSign, key: "app.missions" },
];

/* Onglets regroupés par intention utilisateur :
   · Espace    — ce qui m'appartient (tableau de bord, fil)
   · Créer     — Studio de code (IDE)
   · Découvrir — ce que la communauté produit (projets, devs, salons)
   · Progresser— ce qui me fait monter (challenges, missions) */
const GROUPS: { label: string; items: NavId[]; accent?: boolean }[] = [
  { label: "app.group.workspace", items: ["dashboard", "feed"] },
  { label: "app.group.create", items: ["studio"], accent: true },
  { label: "app.group.discover", items: ["projects", "devs", "salons"] },
  { label: "app.group.grow", items: ["challenges", "missions"] },
];

const MOBILE_NAV: { id: NavId | "profile"; icon: typeof Code2; key: string }[] = [
  { id: "dashboard", icon: Home, key: "app.dashboard.short" },
  { id: "feed", icon: Newspaper, key: "app.feed.short" },
  { id: "studio", icon: SquareTerminal, key: "app.studio.short" },
  { id: "salons", icon: MessageSquare, key: "app.salons" },
  { id: "profile", icon: User, key: "app.profile.short" },
];

const VIEW_PATH: Record<string, string> = {
  dashboard: "dashboard", feed: "feed", studio: "studio", projects: "projects",
  devs: "devs", salons: "salons", challenges: "challenges", missions: "missions", profile: "profil",
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const { view, navigate, logout, me, openMyProfile } = useNora();
  const { t, lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  /* une demande de contact acceptée → toast global */
  useEffect(() => {
    const onAccepted = (e: Event) => {
      const { name } = (e as CustomEvent<{ name: string }>).detail;
      toast.success(`${name} ${t("msg.acceptedToast")}`);
    };
    window.addEventListener("nora:contact-accepted", onAccepted);
    return () => window.removeEventListener("nora:contact-accepted", onAccepted);
  }, [t]);

  const navItem = (id: NavId, mobile = false) => {
    const n = NAV.find((x) => x.id === id)!;
    const on = view === id;
    return (
      <button
        key={id}
        onClick={() => { navigate(id); setMenuOpen(false); }}
        className={cn(
          "group relative flex w-full items-center gap-2.5 rounded-xl px-2.5 text-[13px] transition-colors duration-300",
          on ? "text-signal" : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
          mobile ? "py-3 text-[14px]" : "py-2",
        )}
        aria-current={on ? "page" : undefined}
      >
        {/* pilule active glissante : la barre suit l'onglet sélectionné */}
        {on && (
          <motion.span
            layoutId="nav-active"
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 rounded-xl border border-flare/25 bg-gradient-to-r from-flare/[0.14] via-flare/[0.06] to-transparent"
          />
        )}
        {/* icône encadrée : teintée + lumineuse quand l'onglet est actif */}
        <span
          className={cn(
            "relative z-[1] grid size-7 shrink-0 place-items-center rounded-lg border transition-all duration-300",
            on
              ? "border-flare/40 bg-flare text-white shadow-[0_4px_14px_-4px_var(--glow-flare)]"
              : "border-transparent text-muted-foreground group-hover:text-foreground",
          )}
        >
          <n.icon className="size-4" />
        </span>
        <span className={cn("relative z-[1] truncate", on && "font-medium")}>{t(n.key)}</span>
        {id === "studio" && (
          <span className="relative z-[1] ml-auto rounded bg-flare/15 px-1.5 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.14em] text-flare">
            IDE
          </span>
        )}
        {on && (
          <motion.span
            layoutId="nav-dot"
            className="absolute -left-2.5 top-1/2 z-[1] size-1.5 -translate-y-1/2 rounded-full bg-flare shadow-[0_0_8px_var(--glow-flare)]"
          />
        )}
      </button>
    );
  };

  const groupLabel = (label: string) => (
    <p className="mb-1 flex items-center gap-2 px-2.5 font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground/60">
      {t(label)}
      <span className="h-px flex-1 bg-line" />
    </p>
  );

  return (
    <div className="flex min-h-svh flex-col bg-background">
      {/* ---------- sidebar desktop ---------- */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[232px] flex-col border-r border-line bg-sidebar px-4 py-5 lg:flex">
        <button onClick={() => navigate("landing")} className="mb-7 px-1 cursor-pointer" aria-label="NORA">
          <Logo size={28} />
        </button>

        <button
          onClick={() => useNora.getState().setCommandOpen(true)}
          className="mb-5 flex h-9 items-center gap-2 rounded-lg border border-line bg-surface px-3 font-mono text-[11px] text-muted-foreground transition-colors hover:border-signal-muted/50 hover:text-signal"
        >
          <Search className="size-3.5" />
          {t("app.search")}
          <kbd className="ml-auto rounded bg-surface-2 px-1.5 py-0.5 text-[9px] tracking-widest">⌘K</kbd>
        </button>

        <nav className="mt-1 flex-1 space-y-3 overflow-y-auto" aria-label="Navigation principale">
          {GROUPS.map((g) => (
            <div key={g.label}>
              {groupLabel(g.label)}
              <div className="space-y-0.5">
                {g.items.map((id) => navItem(id))}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-4 space-y-3">
          <button
            onClick={() => (me ? openMyProfile() : navigate("login"))}
            className="flex w-full items-center gap-3 rounded-xl border border-line bg-surface p-3 text-left transition-colors hover:border-flare/40"
            aria-label={t("app.profile")}
          >
            {me ? (
              <>
                <NoraAvatar name={me.name} gradient={me.gradient} size={36} online avatarUrl={me.avatarUrl} />
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-medium text-foreground">{me.name}</span>
                  <span className="block font-mono text-[10px] text-muted-foreground">@{me.username}</span>
                </span>
              </>
            ) : (
              <>
                <span className="grid size-9 place-items-center rounded-full bg-surface-2 text-muted-foreground"><User className="size-4" /></span>
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-medium text-foreground">{t("nav.enter")}</span>
                  <span className="block font-mono text-[10px] text-muted-foreground">{t("auth.login.kicker")}</span>
                </span>
              </>
            )}
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
              onClick={() => { if (me) { logout(); navigate("landing"); } else navigate("login"); }}
              className="grid h-9 flex-1 place-items-center rounded-lg border border-line text-muted-foreground transition-colors hover:border-flare/40 hover:text-flare"
              aria-label={me ? t("app.logout") : t("auth.login.title")}
            >
              {me ? <LogOut className="size-3.5" /> : <User className="size-3.5" />}
            </button>
          </div>
        </div>
      </aside>

      {/* ---------- zone principale ---------- */}
      <div className="flex flex-1 flex-col lg:pl-[232px]">
        {/* topbar desktop : fil d'ariane + cloche + paramètres + compte */}
        <header className="sticky top-0 z-30 hidden h-14 items-center gap-3 border-b border-line bg-background/85 px-6 backdrop-blur-xl lg:flex">
          <p className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
            <span className="text-flare">~/nora</span>
            <ChevronRight className="size-3 text-muted-foreground/50" />
            <span className="text-foreground">{VIEW_PATH[view] ?? view}</span>
          </p>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => useNora.getState().setCommandOpen(true)}
              className="flex h-9 items-center gap-2 rounded-lg border border-line bg-surface px-3 font-mono text-[10.5px] text-muted-foreground transition-colors hover:border-signal-muted/50 hover:text-signal"
            >
              <Search className="size-3.5" /> {t("app.search")}
              <kbd className="rounded bg-surface-2 px-1.5 py-0.5 text-[9px] tracking-widest">⌘K</kbd>
            </button>
            <span className="mx-1 h-5 w-px bg-line" />
            <NotificationsBell />
            <SettingsButton />
            <UserMenu />
          </div>
        </header>

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
            <NotificationsBell compact />
            <SettingsButton compact />
            <button
              onClick={() => setMenuOpen(true)}
              className="grid size-9 place-items-center rounded-lg border border-line text-muted-foreground"
              aria-label={t("nav.menu")}
            >
              <Menu className="size-4" />
            </button>
          </div>
        </header>

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
              const on = n.id === "profile" ? view === "profile" && me != null && view === "profile" : view === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => (n.id === "profile" ? (me ? openMyProfile() : navigate("login")) : navigate(n.id))}
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
                  <span className={cn("relative z-[1] max-w-full truncate text-[8px] font-medium uppercase tracking-normal transition-colors duration-300", on ? "text-signal" : "text-muted-foreground")}>
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
              <nav className="max-h-[62svh] space-y-1 overflow-y-auto py-2">
                {GROUPS.map((g) => (
                  <div key={g.label}>
                    {groupLabel(g.label)}
                    {g.items.map((id) => navItem(id, true))}
                  </div>
                ))}
                <div className="mt-2 space-y-1 border-t border-line pt-2">
                  <button
                    onClick={() => { openMyProfile(); setMenuOpen(false); }}
                    className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-[14px] text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
                  >
                    <User className="size-4" /> {t("app.profile")}
                  </button>
                  <button
                    onClick={() => { useNora.getState().setSettingsOpen(true); setMenuOpen(false); }}
                    className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-[14px] text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
                  >
                    <Settings className="size-4" /> {t("top.settings")}
                  </button>
                  <button
                    onClick={() => { if (me) { logout(); navigate("landing"); } else navigate("login"); setMenuOpen(false); }}
                    className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-[14px] text-muted-foreground transition-colors hover:bg-surface-2 hover:text-flare"
                  >
                    <LogOut className="size-4" /> {me ? t("app.logout") : t("auth.login.title")}
                  </button>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* panneau paramètres (une seule instance) */}
      <SettingsDialog />
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
