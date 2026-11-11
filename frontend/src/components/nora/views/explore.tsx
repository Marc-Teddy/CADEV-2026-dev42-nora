"use client";

/* ============================================================
   NORA — Vues « Projets » et « Développeurs »
   Projets : filtres par statut, cartes vitrine (stack, équipe,
   rôles ouverts, progression). Devs : grille de portfolios.
   ============================================================ */

import { useState } from "react";
import { motion } from "framer-motion";
import { GitFork, Star, UserPlus, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNora } from "@/lib/store";
import { useLang } from "@/lib/i18n";
import { NoraAvatar, BadgePill, fmt } from "../shared";
import { ViewHeader } from "../shell";
import { EASE } from "../fx/reveal";
import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/lib/types";

/* =========================== PROJETS =========================== */

const statusStyle: Record<ProjectStatus, string> = {
  production: "bg-signal-muted/15 text-signal",
  dev: "bg-surface-2 text-foreground",
  equipe: "bg-flare/15 text-flare",
  idee: "bg-surface-2 text-muted-foreground",
};

export function ProjectsView() {
  const { t, lang } = useLang();
  const { viewProfile, toggleJoin, toggleStar, me } = useNora();
  const projects = useNora((s) => s.projects);
  const devs = useNora((s) => s.devs);
  const [filter, setFilter] = useState<ProjectStatus | "all">("all");
  const [joinBusy, setJoinBusy] = useState<string | null>(null);

  const doJoin = async (id: string, name: string) => {
    setJoinBusy(id);
    const before = projects.find((p) => p.id === id);
    const wasJoined = Boolean(me && before?.team.includes(me.username));
    await toggleJoin(id);
    toast.success(wasJoined
      ? (lang === "fr" ? `Tu as quitté ${name}` : `You left ${name}`)
      : (lang === "fr" ? `Tu as rejoint ${name} — bienvenue dans l'équipe !` : `You joined ${name} — welcome aboard!`));
    setJoinBusy(null);
  };

  const list = projects.filter((p) => (filter === "all" ? true : p.status === filter));
  const filters: (ProjectStatus | "all")[] = ["all", "production", "dev", "equipe", "idee"];

  return (
    <div className="mx-auto max-w-6xl">
      <ViewHeader kicker={t("app.projects")} title={t("projects.title")} sub={t("projects.sub")} />

      <div className="mb-5 flex flex-wrap gap-1.5">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-lg px-3.5 py-1.5 font-mono text-[11px] transition-colors duration-300",
              filter === f ? "bg-signal-muted/15 text-signal" : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
            )}
          >
            {f === "all" ? t("projects.all") : t(`projects.status.${f}`)}
          </button>
        ))}
      </div>

      <div className="grid gap-3.5 md:grid-cols-2 xl:grid-cols-3">
        {list.map((p, i) => {
          const joined = Boolean(me && p.team.includes(me.username));
          return (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: Math.min(i * 0.04, 0.28), ease: EASE }}
              className="hover-spot group flex flex-col overflow-hidden rounded-xl border border-line bg-surface p-5"
            >
              {p.cover ? (
                <div className="relative -mx-5 -mt-5 mb-4 h-32 overflow-hidden">
                  <img src={p.cover} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-transparent" />
                  <span className={cn("absolute right-3 top-3 rounded px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider backdrop-blur", statusStyle[p.status], "bg-[#0b0912]/70 text-white")}>
                    {t(`projects.status.${p.status}`)}
                  </span>
                </div>
              ) : null}
              <div className="flex items-start gap-3.5">
                {!p.cover && (
                  <span
                    className="grid size-11 shrink-0 place-items-center rounded-xl text-xl"
                    style={{ background: `linear-gradient(135deg, ${p.gradient[0]}22, ${p.gradient[1]}33)` }}
                  >
                    {p.icon}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="truncate font-display text-[15px] font-semibold">{p.name}</h2>
                    {!p.cover && (
                      <span className={cn("shrink-0 rounded px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider", statusStyle[p.status])}>
                        {t(`projects.status.${p.status}`)}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-[12.5px] leading-snug text-muted-foreground">{p.tagline}</p>
                </div>
              </div>

              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s} className="rounded bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">{s}</span>
                ))}
              </div>

              <div className="mt-4">
                <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
                  <span>{t("progress")}</span>
                  <span className="text-signal tabular-nums">{p.progress}%</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-2">
                  <motion.div
                    className="h-full rounded-full bg-signal"
                    initial={{ width: 0 }}
                    animate={{ width: `${p.progress}%` }}
                    transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                  />
                </div>
              </div>

              {p.openRoles.length > 0 && (
                <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
                  <Wrench className="size-3 text-flare" />
                  {p.openRoles.map((r) => (
                    <span key={r} className="rounded-full border border-flare/30 bg-flare/10 px-2 py-0.5 font-mono text-[10px] text-flare">{r}</span>
                  ))}
                </div>
              )}

              <div className="mt-auto flex items-center justify-between border-t border-line pt-3.5 [margin-top:auto]">
                <div className="flex items-center gap-3.5 font-mono text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Star className="size-3.5 text-signal" />{fmt(p.stars)}</span>
                  <span className="flex items-center gap-1.5"><GitFork className="size-3.5" />{fmt(p.forks)}</span>
                  <span className="flex -space-x-2">
                    {[...new Set([p.owner, ...p.team])].slice(0, 3).map((u) => {
                      const d = devs.find((x) => x.username === u);
                      return d ? (
                        <button key={u} onClick={() => viewProfile(u)} className="cursor-pointer">
                          <NoraAvatar name={d.name} gradient={d.gradient} size={22} className="ring-2 ring-surface" />
                        </button>
                      ) : null;
                    })}
                  </span>
                </div>
                {p.openRoles.length > 0 && (
                  <Button
                    size="sm"
                    variant={joined ? "outline" : "default"}
                    disabled={joinBusy === p.id}
                    onClick={() => doJoin(p.id, p.name)}
                    className={cn(
                      "h-8 rounded-md px-3 font-mono text-[10.5px]",
                      joined ? "border-signal-muted/50 bg-transparent text-signal" : "bg-flare text-flare-foreground hover:bg-flare/90",
                    )}
                  >
                    {joined ? "✓" : t("projects.join")}
                  </Button>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}

/* =========================== DEVS =========================== */

export function DevsView() {
  const { t } = useLang();
  const { viewProfile, toggleFollow, dmRequests, requestContact, openDm, navigate } = useNora();
  const devs = useNora((s) => s.devs);

  /* contact : demande avec validation, ou discussion ouverte */
  const contactAction = (username: string) => {
    const state = dmRequests[username] ?? "none";
    if (state === "accepted") {
      openDm(username);
      navigate("salons");
      return;
    }
    if (state === "none") {
      requestContact(username);
      toast.success(t("msg.requestSentToast"));
    }
  };

  return (
    <div className="mx-auto max-w-6xl">
      <ViewHeader kicker={t("app.devs")} title={t("devs.title")} sub={t("devs.sub")} />

      <div className="grid gap-3.5 md:grid-cols-2 xl:grid-cols-3">
        {devs.map((d, i) => {
          const followed = d.following;
          const contact = dmRequests[d.username] ?? "none";
          return (
            <motion.article
              key={d.username}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: Math.min(i * 0.04, 0.3), ease: EASE }}
              className="hover-spot flex flex-col rounded-xl border border-line bg-surface p-5"
            >
              <div className="flex items-start gap-3.5">
                <button onClick={() => viewProfile(d.username)} className="cursor-pointer">
                  <NoraAvatar name={d.name} gradient={d.gradient} size={48} online={d.online} />
                </button>
                <div className="min-w-0 flex-1">
                  <button onClick={() => viewProfile(d.username)} className="cursor-pointer block truncate text-left font-display text-[15px] font-semibold hover:underline">
                    {d.name}
                  </button>
                  <p className="truncate font-mono text-[10.5px] text-muted-foreground">@{d.username} · {d.city} {d.flag}</p>
                </div>
                <span className="shrink-0 rounded-full bg-surface-2 px-2 py-1 font-mono text-[10px] text-signal">★ {fmt(d.reputation)}</span>
              </div>

              <p className="mt-3 line-clamp-2 text-[12.5px] leading-relaxed text-muted-foreground">{d.bio}</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {d.skills.slice(0, 3).map((s) => (
                  <span key={s.name} className="rounded bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-foreground">{s.name}</span>
                ))}
                <span
                  className={cn(
                    "rounded px-2 py-0.5 font-mono text-[10px]",
                    d.online ? "bg-signal-muted/15 text-signal" : "text-muted-foreground",
                  )}
                >
                  {d.online ? t("devs.online") : t("devs.offline")} · {t(`devs.availability.${d.availability}`)}
                </span>
              </div>

              <div className="mt-auto flex items-center gap-2 border-t border-line pt-3.5 [margin-top:auto]">
                {d.badges[0] && <BadgePill {...d.badges[0]} />}
                <div className="ml-auto flex gap-2">
                  <Button
                    size="sm"
                    variant={followed ? "outline" : "default"}
                    onClick={() => toggleFollow(d.username)}
                    className={cn(
                      "h-8 gap-1.5 rounded-md px-3 font-mono text-[10.5px]",
                      followed ? "border-signal-muted/50 bg-transparent text-signal" : "bg-flare text-flare-foreground hover:bg-flare/90",
                    )}
                  >
                    <UserPlus className="size-3" />
                    {followed ? t("feed.following") : t("feed.follow")}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={contact === "pending"}
                    onClick={() => contactAction(d.username)}
                    className={cn(
                      "h-8 rounded-md border-line px-3 font-mono text-[10.5px] hover:border-flare/40 hover:text-flare",
                      contact === "pending" && "text-muted-foreground",
                    )}
                  >
                    {contact === "accepted" ? t("prof.openChat") : contact === "pending" ? t("msg.pending") : t("devs.message")}
                  </Button>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
