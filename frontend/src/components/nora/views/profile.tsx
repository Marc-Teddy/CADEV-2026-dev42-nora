"use client";

/* ============================================================
   NORA — Vue « Profil développeur » (portfolio vivant)
   En-tête riche, badges, heatmap de contributions, onglets :
   aperçu (compétences, langues), projets, articles, badges.
   ============================================================ */

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Award, BookOpen, Github, Globe, MapPin, MessageSquare, PencilRuler,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNora } from "@/lib/store";
import { useLang } from "@/lib/i18n";
import { devByUsername, projects, CURRENT_USER } from "@/lib/data";
import { NoraAvatar, BadgePill, fmt } from "../shared";
import { EASE } from "../fx/reveal";
import { cn } from "@/lib/utils";

/* heatmap déterministe */
function useHeatmap(seed: string, weeks = 26) {
  const cells: number[] = [];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 9973;
  for (let i = 0; i < weeks * 7; i++) {
    h = (h * 137 + 61) % 9973;
    cells.push(h / 9973);
  }
  return cells;
}

const heat = (v: number) =>
  v < 0.25 ? "bg-surface-2" : v < 0.5 ? "bg-signal-muted/35" : v < 0.78 ? "bg-signal-muted/70" : "bg-signal";

export function ProfileView() {
  const { t, lang } = useLang();
  const { profileOf, followOverrides, toggleFollow } = useNora();
  const dev = devByUsername(profileOf) ?? devByUsername(CURRENT_USER)!;
  const isMe = dev.username === CURRENT_USER;
  const [tab, setTab] = useState<"overview" | "projects" | "articles" | "badges">("overview");
  const followed = followOverrides[dev.username] ?? dev.following;
  const userProjects = projects.filter((p) => p.owner === dev.username || p.team.includes(dev.username));
  const cells = useHeatmap(dev.username);

  const tabs = ["overview", "projects", "articles", "badges"] as const;

  return (
    <div className="mx-auto max-w-5xl pb-4">
      {/* ---------- couverture ---------- */}
      <div className="relative overflow-hidden rounded-2xl border border-line bg-surface">
        <div className="relative h-24 bg-surface-2 sm:h-28">
          <div className="absolute inset-0 bg-grid opacity-70" />
          <div
            className="absolute inset-x-0 bottom-0 h-[3px]"
            style={{ backgroundImage: "repeating-linear-gradient(90deg, var(--signal) 0 16px, transparent 16px 26px, var(--flare) 26px 36px, transparent 36px 60px)" }}
          />
        </div>

        <div className="relative px-5 pb-5 sm:px-7">
          <div className="-mt-9 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <NoraAvatar name={dev.name} gradient={dev.gradient} size={76} online={dev.online} className="ring-4 ring-surface" />
              <div className="pb-1">
                <h1 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{dev.name}</h1>
                <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                  @{dev.username} · {dev.role} · {dev.city} {dev.flag}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 pb-1">
              {!isMe && (
                <Button
                  onClick={() => toggleFollow(dev.username)}
                  className={cn(
                    "h-9 rounded-lg px-4 font-mono text-[12px]",
                    followed ? "border border-signal-muted/50 bg-transparent text-signal" : "bg-flare text-flare-foreground hover:bg-flare/90",
                  )}
                >
                  {followed ? t("prof.followingLabel") : t("prof.follow")}
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => toast(lang === "fr" ? "Salon privé ouvert — démo" : "Private room open — demo")}
                className="h-9 gap-2 rounded-lg border-line px-4 font-mono text-[12px] hover:border-signal-muted/50 hover:text-signal"
              >
                <MessageSquare className="size-3.5" /> {t("prof.contact")}
              </Button>
            </div>
          </div>

          <p className="mt-4 max-w-[560px] text-[14px] leading-relaxed text-foreground">{dev.bio}</p>

          {/* stats */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {[
              { v: fmt(dev.reputation), l: t("prof.reputation"), accent: true },
              { v: fmt(dev.followers), l: t("prof.followers") },
              { v: `${dev.projectsCount}`, l: t("prof.projects") },
              { v: `${dev.challengesWon}`, l: t("prof.challengesWon") },
              { v: `${dev.articles}`, l: t("prof.articlesCount") },
            ].map((s) => (
              <div key={s.l} className="rounded-lg border border-line bg-surface-2/60 px-3 py-2.5">
                <p className={cn("font-display text-lg font-bold tabular-nums", s.accent ? "text-signal" : "text-foreground")}>{s.v}</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>

          {/* badges + disponibilité */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {dev.badges.map((b) => <BadgePill key={b.label} {...b} />)}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-flare/40 bg-flare/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-flare">
              <Globe className="size-3" /> {t(`devs.availability.${dev.availability}`)}
            </span>
            <span className="ml-auto font-mono text-[10px] text-muted-foreground/70">
              {t("prof.joined")} {dev.joined}
            </span>
          </div>
        </div>
      </div>

      {/* ---------- heatmap ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
        className="mt-3.5 rounded-xl border border-line bg-surface p-4.5"
      >
        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px] text-muted-foreground">
            <span className="text-signal">1 847</span> {t("prof.contributions")}
          </p>
          <div className="flex items-center gap-1 font-mono text-[9px] text-muted-foreground/70">
            {t("misc.verified")} <span className="size-2 rounded-[2px] bg-signal" />
          </div>
        </div>
        <div className="mt-3 flex gap-[3px] overflow-hidden">
          {Array.from({ length: 26 }).map((_, w) => (
            <div key={w} className="flex flex-col gap-[3px]">
              {Array.from({ length: 7 }).map((_, d) => (
                <span key={d} className={cn("size-[9px] rounded-[2px] sm:size-[10px]", heat(cells[w * 7 + d]))} />
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      {/* ---------- onglets : contrôle segmenté animé ---------- */}
      <div className="mt-3.5 inline-flex rounded-xl border border-line bg-surface-2/50 p-1">
        {tabs.map((id) => {
          const on = tab === id;
          return (
            <button
              key={id}
              onClick={() => setTab(id)}
              aria-current={on ? "true" : undefined}
              className="relative rounded-lg px-4 py-1.5 font-mono text-[11px] transition-colors duration-300"
            >
              {on && (
                <motion.span
                  layoutId="prof-tab-pill"
                  className="absolute inset-0 rounded-lg border border-signal-muted/35 bg-card shadow-sm"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              <span className={cn("relative z-[1] flex items-center gap-1.5", on ? "text-signal" : "text-muted-foreground hover:text-foreground")}>
                {on && <span className="size-1 rounded-full bg-flare" />}
                {t(`prof.${id}`)}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4">
        {tab === "overview" && (
          <div className="grid gap-3.5 md:grid-cols-2">
            <div className="rounded-xl border border-line bg-surface p-5">
              <h2 className="font-display text-[15px] font-semibold">{t("prof.skills")}</h2>
              <div className="mt-4 space-y-3">
                {dev.skills.map((s, i) => (
                  <div key={s.name}>
                    <div className="flex justify-between font-mono text-[11px]">
                      <span className="text-foreground">{s.name}</span>
                      <span className="text-signal tabular-nums">{s.level}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-2">
                      <motion.div
                        className="h-full rounded-full bg-signal"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3.5">
              <div className="rounded-xl border border-line bg-surface p-5">
                <h2 className="font-display text-[15px] font-semibold">{t("prof.languages")}</h2>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {dev.langs.map((l) => (
                    <span key={l} className="rounded bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-foreground">{l}</span>
                  ))}
                </div>
              </div>
              <div className="card-halo rounded-xl border border-line bg-surface p-5">
                <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-flare">
                  <Award className="size-3.5" /> {t("prof.mentor.t")}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{t("prof.mentor.d")}</p>
                <div className="mt-3 flex gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-surface-2 px-2.5 py-1 font-mono text-[10.5px] text-foreground">
                    <BookOpen className="size-3 text-signal" /> {dev.articles}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-surface-2 px-2.5 py-1 font-mono text-[10.5px] text-foreground">
                    <PencilRuler className="size-3 text-signal" /> {dev.challengesWon}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "projects" && (
          <div className="grid gap-3.5 md:grid-cols-2">
            {userProjects.map((p) => (
              <article key={p.id} className="hover-spot rounded-xl border border-line bg-surface p-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-lg text-lg" style={{ background: `linear-gradient(135deg, ${p.gradient[0]}22, ${p.gradient[1]}33)` }}>
                    {p.icon}
                  </span>
                  <div className="min-w-0">
                    <h2 className="truncate font-display text-[15px] font-semibold">{p.name}</h2>
                    <p className="truncate font-mono text-[10px] text-muted-foreground">{p.repo}</p>
                  </div>
                  <span className="ml-auto font-mono text-[11px] text-signal">★ {fmt(p.stars)}</span>
                </div>
                <p className="mt-3 line-clamp-2 text-[12.5px] leading-snug text-muted-foreground">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">{s}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}

        {tab === "articles" && (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <article key={i} className="hover-spot flex cursor-pointer items-center gap-4 rounded-xl border border-line bg-surface p-4.5">
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-surface-2">
                  <BookOpen className="size-4.5 text-signal" />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-display text-[14px] font-semibold">
                    {lang === "fr"
                      ? ["Optimiser son bundle React pour la 3G", "Go en production : les pièges du scheduler", "Design tokens : une palette qui tient"][i]
                      : ["Optimizing your React bundle for 3G", "Go in production: scheduler pitfalls", "Design tokens: a palette that holds"][i]}
                  </h2>
                  <p className="mt-0.5 font-mono text-[10.5px] text-muted-foreground">
                    {lang === "fr" ? ["tutoriel · 12 min", "retour d'XP · 8 min", "guide · 15 min"][i] : ["tutorial · 12 min", "field notes · 8 min", "guide · 15 min"][i]}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[10px] text-signal">
                  {lang === "fr" ? ["+240 rep", "+180 rep", "+310 rep"][i] : ["+240 rep", "+180 rep", "+310 rep"][i]}
                </span>
              </article>
            ))}
          </div>
        )}

        {tab === "badges" && (
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
            {dev.badges.concat(dev.badges.slice(0, 2)).map((b, i) => (
              <div key={`${b.label}-${i}`} className="hover-spot flex flex-col items-center gap-2.5 rounded-xl border border-line bg-surface p-5 text-center">
                <span className="grid size-11 place-items-center rounded-full bg-signal-muted/15 text-signal">
                  <Award className="size-5" />
                </span>
                <p className="font-display text-[13px] font-semibold">{b.label}</p>
                <p className="font-mono text-[9.5px] uppercase tracking-wider text-muted-foreground">{t("misc.verified")}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/60">
        <Github className="size-3.5" /> {dev.username} · git.nora/{dev.username}
        <MapPin className="ml-2 size-3.5" /> {dev.city}, {dev.country}
      </p>
    </div>
  );
}
