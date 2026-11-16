"use client";

/* ============================================================
   NORA — Cluster haut-droite de l'app connectée :
   · cloche de notifications (réelles : contacts, likes, stars, MP)
   · menu utilisateur (mon profil, studio, paramètres, sortie)
   · panneau paramètres (apparence, langue, intégration GitHub)
   ============================================================ */

import { useEffect, useMemo, useState } from "react";
import {
  Bell, Check, Github, Globe2, Heart, Loader2, LogOut, MessageCircle,
  Moon, Settings, Star, Sun, TerminalSquare, UserPlus, User as UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNora } from "@/lib/store";
import { useLang } from "@/lib/i18n";
import { useTheme } from "next-themes";
import { api } from "@/lib/api-client";
import { NoraAvatar } from "./shared";
import { cn } from "@/lib/utils";
import type { GithubRepo, NotifItem } from "@/lib/types";

/* ---------- temps relatif côté client ---------- */
function ago(iso: string, lang: "fr" | "en"): string {
  const s = Math.max(1, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 60) return lang === "fr" ? "à l'instant" : "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return lang === "fr" ? `il y a ${m} min` : `${m} min ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return lang === "fr" ? `il y a ${h} h` : `${h} h ago`;
  const j = Math.floor(h / 24);
  return lang === "fr" ? `il y a ${j} j` : `${j} d ago`;
}

/* ============================================================
   CLOCHE DE NOTIFICATIONS
   ============================================================ */
export function NotificationsBell({ compact = false }: { compact?: boolean }) {
  const { t, lang } = useLang();
  const { authed, notifications, lastSeenNotif, loadNotifications, markNotificationsSeen } = useNora();
  const [open, setOpen] = useState(false);

  /* polling léger — les notifs viennent de la base, calculées serveur */
  useEffect(() => {
    if (!authed) return;
    loadNotifications();
    const id = setInterval(loadNotifications, 20000);
    return () => clearInterval(id);
  }, [authed, loadNotifications]);

  const unseen = useMemo(
    () => notifications.filter((n) => !lastSeenNotif || n.createdAtIso > lastSeenNotif).length,
    [notifications, lastSeenNotif],
  );

  const openPanel = (v: boolean) => {
    setOpen(v);
    if (v) loadNotifications();
    if (!v && unseen > 0) markNotificationsSeen();
  };

  if (!authed) return null;

  return (
    <Popover open={open} onOpenChange={openPanel}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "relative grid place-items-center rounded-lg border border-line text-muted-foreground transition-colors hover:border-signal-muted/50 hover:text-signal",
            compact ? "size-9" : "size-9",
          )}
          aria-label={t("top.notif")}
        >
          <Bell className="size-4" />
          {unseen > 0 && (
            <span className="absolute -right-1 -top-1 grid min-w-[16px] place-items-center rounded-full bg-flare px-1 font-mono text-[9px] font-bold leading-4 text-white shadow-[0_0_10px_var(--glow-flare)]">
              {unseen > 9 ? "9+" : unseen}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={10} className="w-[330px] rounded-2xl border-line bg-popover p-0 shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <p className="font-display text-[13.5px] font-semibold">{t("top.notif.title")}</p>
          <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-signal">{t("top.notif.live")}</span>
        </div>
        <div className="max-h-[320px] overflow-y-auto p-1.5">
          {notifications.length === 0 ? (
            <p className="px-3 py-8 text-center text-[12px] text-muted-foreground">{t("top.notif.empty")}</p>
          ) : (
            notifications.slice(0, 12).map((n) => <NotifRow key={n.id} n={n} />)
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function NotifRow({ n }: { n: NotifItem }) {
  const { t, lang } = useLang();
  const { viewProfile, openDm, navigate } = useNora();
  const devs = useNora((s) => s.devs);
  const dev = devs.find((d) => d.username === n.from);

  const meta = {
    contact: { icon: UserPlus, cls: "bg-flare/15 text-flare", to: () => navigate("salons") },
    like: { icon: Heart, cls: "bg-flare/15 text-flare-bright", to: () => navigate("feed") },
    star: { icon: Star, cls: "bg-gold/15 text-gold", to: () => navigate("projects") },
    message: { icon: MessageCircle, cls: "bg-signal-muted/15 text-signal", to: () => { openDm(n.from); navigate("salons"); } },
  }[n.kind];

  const text = {
    contact: t("top.notif.contact"),
    like: t("top.notif.like"),
    star: t("top.notif.star"),
    message: t("top.notif.message"),
  }[n.kind];

  const Icon = meta.icon;
  return (
    <button
      onClick={() => { if (n.kind !== "message") viewProfile(n.from); meta.to(); }}
      className="flex w-full cursor-pointer items-start gap-2.5 rounded-xl px-2.5 py-2.5 text-left transition-colors hover:bg-surface-2/70"
    >
      <span className={cn("mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg", meta.cls)}>
        <Icon className="size-3.5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[12.5px] leading-snug text-foreground">
          <span className="font-semibold">{dev?.name ?? `@${n.from}`}</span> {text}
          {n.kind === "star" && n.target && <span className="text-flare-bright"> {n.target}</span>}
        </span>
        {n.kind !== "contact" && n.target && n.kind !== "star" && (
          <span className="mt-0.5 block truncate font-mono text-[10.5px] text-muted-foreground">« {n.target} »</span>
        )}
        <span className="mt-0.5 block font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted-foreground/70">
          {ago(n.createdAtIso, lang)}
        </span>
      </span>
    </button>
  );
}

/* ============================================================
   MENU UTILISATEUR (haut-droite)
   ============================================================ */
export function UserMenu() {
  const { t } = useLang();
  const { me, openMyProfile, navigate, logout, setSettingsOpen } = useNora();
  if (!me) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex cursor-pointer items-center gap-2 rounded-full border border-line bg-surface py-1 pl-1 pr-2.5 transition-colors hover:border-flare/40"
          aria-label={t("top.account")}
        >
          <NoraAvatar name={me.name} gradient={me.gradient} size={26} online avatarUrl={me.avatarUrl} />
          <span className="hidden max-w-[110px] truncate text-[12px] font-medium sm:block">{me.name.split(" ")[0]}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={10} className="w-[220px] rounded-xl border-line bg-popover">
        <DropdownMenuLabel className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground">
          @{me.username}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-line" />
        <DropdownMenuItem onClick={openMyProfile} className="gap-2.5 rounded-lg text-[13px]">
          <UserIcon className="size-4 text-signal" /> {t("app.profile")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("studio")} className="gap-2.5 rounded-lg text-[13px]">
          <TerminalSquare className="size-4 text-signal" /> {t("app.studio")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSettingsOpen(true)} className="gap-2.5 rounded-lg text-[13px]">
          <Settings className="size-4 text-signal" /> {t("top.settings")}
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-line" />
        <DropdownMenuItem
          onClick={() => { logout(); navigate("landing"); }}
          className="gap-2.5 rounded-lg text-[13px] text-destructive focus:text-destructive"
        >
          <LogOut className="size-4" /> {t("app.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ============================================================
   BOUTON PARAMÈTRES + PANNEAU (apparence, langue, GitHub)
   ============================================================ */
export function SettingsButton({ compact = false }: { compact?: boolean }) {
  const { t } = useLang();
  const { setSettingsOpen } = useNora();
  return (
    <button
      onClick={() => setSettingsOpen(true)}
      className={cn(
        "grid cursor-pointer place-items-center rounded-lg border border-line text-muted-foreground transition-colors hover:border-signal-muted/50 hover:text-signal",
        compact ? "size-9" : "size-9",
      )}
      aria-label={t("top.settings")}
    >
      <Settings className="size-4" />
    </button>
  );
}

export function SettingsDialog() {
  const { t, lang, setLang } = useLang();
  const { settingsOpen, setSettingsOpen, publishProject } = useNora();

  return (
    <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
      <DialogContent className="max-w-[520px] rounded-2xl border-line bg-popover">
        <DialogHeader>
          <DialogTitle className="font-display">{t("settings.title")}</DialogTitle>
          <DialogDescription>{t("settings.sub")}</DialogDescription>
        </DialogHeader>
        <AppearanceSection />
        <LangSection lang={lang} setLang={setLang} />
        <GithubSection onImport={(r) => publishProject({
          name: r.name,
          tagline: (r.description || `${r.language ?? "Code"} — dépôt GitHub`).slice(0, 140),
          description: r.description || `Dépo\u0074 GitHub importé depuis ${r.fullName}.`,
          stack: [r.language, ...r.topics].filter(Boolean).slice(0, 6) as string[],
          status: "dev",
          icon: "🐙",
          repo: r.url,
        })} />
      </DialogContent>
    </Dialog>
  );
}

function AppearanceSection() {
  const { t } = useLang();
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMounted(true);
      setDark(document.documentElement.classList.contains("dark"));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const pick = (wantDark: boolean) => {
    const apply = () => setTheme(wantDark ? "dark" : "light");
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      (document as Document & { startViewTransition: (cb: () => void) => void }).startViewTransition(apply);
    } else apply();
    setDark(wantDark);
  };

  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{t("settings.appearance")}</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {[
          { id: "dark", label: t("app.theme.dark"), icon: Moon },
          { id: "light", label: t("app.theme.light"), icon: Sun },
        ].map((o) => {
          const on = mounted && (o.id === "dark") === dark;
          return (
            <button
              key={o.id}
              onClick={() => pick(o.id === "dark")}
              className={cn(
                "flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border font-mono text-[11.5px] transition-colors",
                on ? "border-flare/50 bg-flare/10 text-flare" : "border-line text-muted-foreground hover:text-foreground",
              )}
            >
              <o.icon className="size-3.5" /> {o.label}
              {on && <Check className="size-3" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function LangSection({ lang, setLang }: { lang: "fr" | "en"; setLang: (l: "fr" | "en") => void }) {
  const { t } = useLang();
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{t("settings.language")}</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {(["fr", "en"] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={cn(
              "flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border font-mono text-[11.5px] uppercase transition-colors",
              lang === l ? "border-signal-muted/50 bg-signal-muted/10 text-signal" : "border-line text-muted-foreground hover:text-foreground",
            )}
          >
            <Globe2 className="size-3.5" /> {l}
            {lang === l && <Check className="size-3" />}
          </button>
        ))}
      </div>
    </div>
  );
}

function GithubSection({ onImport }: { onImport: (r: GithubRepo) => void }) {
  const { t } = useLang();
  const { me } = useNora();
  const [user, setUser] = useState(() => getGithubPrefill());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ghUser, setGhUser] = useState<{ login: string; avatarUrl: string; publicRepos: number } | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [imported, setImported] = useState<Record<string, boolean>>({});

  const load = async () => {
    if (!user.trim()) return;
    setLoading(true);
    setError("");
    try {
      const r = await api.githubRepos(user.trim());
      setGhUser(r.user);
      setRepos(r.repos);
      /* mémoriser le pseudo côté profil (localStorage simple) */
      if (typeof window !== "undefined") window.localStorage.setItem("nora.github", user.trim());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
      setGhUser(null);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <div className="flex items-center gap-2">
        <Github className="size-4 text-foreground" />
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{t("settings.github")}</p>
      </div>
      <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">{t("settings.github.d")}</p>

      <div className="mt-3 flex gap-2">
        <Input
          value={user}
          onChange={(e) => setUser(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && load()}
          placeholder={me ? `${me.username.split("@")[0]}` : "pseudo"}
          className="h-9 flex-1 rounded-lg border-line bg-popover font-mono text-[12.5px]"
        />
        <Button onClick={load} disabled={loading || !user.trim()} className="h-9 gap-2 rounded-lg bg-flare px-4 text-[12px] font-semibold text-flare-foreground hover:bg-flare/90">
          {loading ? <Loader2 className="size-3.5 animate-spin" /> : <Github className="size-3.5" />}
          {t("settings.github.load")}
        </Button>
      </div>
      {error && <p className="mt-2 text-[11.5px] text-destructive">{error}</p>}

      {ghUser && (
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2.5 rounded-lg bg-popover px-3 py-2">
            <img src={ghUser.avatarUrl} alt="" className="size-7 rounded-full" />
            <span className="text-[12.5px] font-semibold">{ghUser.login}</span>
            <span className="ml-auto font-mono text-[10px] text-muted-foreground">{ghUser.publicRepos} repos</span>
          </div>
          <div className="max-h-[210px] space-y-1.5 overflow-y-auto pr-0.5">
            {repos.map((r) => (
              <div key={r.fullName} className="flex items-center gap-2 rounded-lg border border-line bg-popover px-3 py-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-[12px] font-medium">{r.name}</p>
                  <p className="truncate text-[11px] text-muted-foreground">
                    {r.language ?? "—"} · ★ {r.stars}
                    {r.description ? ` · ${r.description}` : ""}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant={imported[r.name] ? "outline" : "default"}
                  disabled={imported[r.name]}
                  onClick={() => {
                    onImport(r);
                    setImported((p) => ({ ...p, [r.name]: true }));
                  }}
                  className={cn(
                    "h-7 shrink-0 rounded-md px-2.5 font-mono text-[10px]",
                    imported[r.name] ? "border-signal-muted/50 bg-transparent text-signal" : "bg-flare text-flare-foreground hover:bg-flare/90",
                  )}
                >
                  {imported[r.name] ? <><Check className="size-3" /> {t("settings.github.imported")}</> : t("settings.github.import")}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* pseudo GitHub mémorisé (settings → import) */
export function getGithubPrefill(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem("nora.github") ?? "";
}
