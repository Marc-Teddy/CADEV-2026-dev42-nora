"use client";

/* ============================================================
   NORA — Vue « Accueil » (dashboard v2, type maquette)
   Bannière photo + profil complété, 4 stats continentales,
   projets tendance / équipe à rejoindre / fil condensé,
   activité récente / éditeur + NORA IA / carte #BuildAfrica.
   Volontairement resserré : 3 lignes de lecture, rien de plus.
   ============================================================ */

import { motion } from "framer-motion";
import {
  ArrowRight, CalendarDays, Code2, FilePlus2, Flame, MessageSquare,
  Rocket, Sparkles, Star, Trophy, Users, MessageSquareText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNora, devByUsername } from "@/lib/store";
import { useLang } from "@/lib/i18n";
import { IMAGES } from "@/lib/content";
import { NoraAvatar, fmt } from "../shared";
import { ViewHeader } from "../shell";
import { EASE, Reveal } from "../fx/reveal";
import { Magnetic } from "../fx/magnetic";
import { cn } from "@/lib/utils";

/* format compact FR : 12 847 → « 12,8K », 86 400 000 → « 86,4M » */
const fr = (n: number, unit = "") => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(".", ",").replace(",0", "")}M${unit}`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(".", ",").replace(",0", "")}K${unit}`;
  return `${n}${unit}`;
};

export function DashboardView() {
  const { t, lang } = useLang();
  const { me, navigate, viewProfile, openDm, toggleStar, toggleJoin } = useNora();
  const devs = useNora((s) => s.devs);
  const hackathons = useNora((s) => s.hackathons);
  const projects = useNora((s) => s.projects);
  const posts = useNora((s) => s.posts);
  const platformStats = useNora((s) => s.stats);
  const hack = hackathons[0];

  /* top 3 projets par stars */
  const trending = [...projects].sort((a, b) => b.stars - a.stars).slice(0, 3);
  const teamPick = projects.find((p) => p.openRoles.length > 0) ?? projects[0];
  const joined = teamPick ? Boolean(me && teamPick.team.includes(me.username)) : false;

  const stats = [
    { icon: Users, label: t("dash.stats.devs"), value: fr(platformStats.devs), color: "text-signal" },
    { icon: Code2, label: t("dash.stats.projects"), value: fr(platformStats.projects), color: "text-flare" },
    { icon: MessageSquareText, label: t("dash.stats.posts"), value: fr(platformStats.posts), color: "text-gold" },
    { icon: Sparkles, label: t("dash.stats.channels"), value: fr(platformStats.channels), color: "text-cyan-neon" },
  ];

  /* complétion du profil — calculée sur les vrais champs remplis */
  const completion = (() => {
    if (!me) return 0;
    const checks = [
      Boolean(me.bio),
      Boolean(me.avatarUrl),
      me.skills.length >= 3,
      Boolean(me.city),
      Boolean(me.role && me.role !== "Developer"),
      projects.some((p) => p.owner === me.username),
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  })();

  /* activité récente — 100% réelle : mes posts, mes projets, mes messages */
  const activity = (() => {
    const items: { icon: typeof Rocket; text: string; time: string; key: string }[] = [];
    if (me) {
      for (const p of posts.filter((x) => x.author === me.username).slice(0, 2)) {
        items.push({
          icon: MessageSquare,
          text: lang === "fr" ? "Tu as publié sur le fil" : "You posted on the feed",
          time: p.time,
          key: `post-${p.id}`,
        });
      }
      for (const p of projects.filter((x) => x.owner === me.username).slice(0, 2)) {
        items.push({
          icon: Rocket,
          text: lang === "fr" ? `Projet mis à jour : ${p.name}` : `Project updated: ${p.name}`,
          time: p.updated,
          key: `proj-${p.id}`,
        });
      }
    }
    if (items.length === 0) {
      items.push({
        icon: FilePlus2,
        text: lang === "fr" ? "Commence : publie un post ou un projet" : "Start: publish a post or a project",
        time: t("misc.now"),
        key: "starter",
      });
    }
    return items.slice(0, 3);
  })();

  return (
    <div className="mx-auto max-w-6xl">
      <ViewHeader kicker={t("app.dashboard")} title={t("dash.today")} />

      {/* ---------- bannière + carte profil ---------- */}
      <div className="grid gap-3.5 lg:grid-cols-[1fr_300px]">
        <Reveal className="relative overflow-hidden rounded-2xl border border-line">
          <img
            src={IMAGES.heroSavanna}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0912]/95 via-[#0b0912]/70 to-[#0b0912]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0912]/70 via-transparent to-transparent" />
          <div className="relative flex min-h-[210px] flex-col justify-center gap-3 p-6 sm:p-8">
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="font-display text-2xl font-bold text-white sm:text-3xl"
            >
              {t("dash.hero.hello")}, {me?.name.split(" ")[0] ?? ""} <span aria-hidden>👋</span>
            </motion.h2>
            <p className="font-display text-base font-semibold text-flare-bright sm:text-lg">
              {t("dash.hero.tag")}
            </p>
            <p className="max-w-[380px] text-[13px] leading-relaxed text-white/75">{t("dash.hero.sub")}</p>
            <Magnetic strength={0.15} className="mt-1 w-max">
              <Button
                onClick={() => navigate("feed")}
                className="flare-cta h-10 gap-2 rounded-lg px-5 text-[13px] font-semibold text-flare-foreground"
              >
                {t("dash.hero.cta")} <ArrowRight className="size-4" />
              </Button>
            </Magnetic>
          </div>
        </Reveal>

        {/* carte complétion du profil */}
        <Reveal delay={0.08} className="hover-spot flex flex-col justify-between rounded-2xl border border-line bg-surface p-5">
          <div className="flex items-start justify-between">
            <h2 className="font-display text-[15px] font-semibold">{t("dash.profile.t")}</h2>
            <span className="grid size-9 place-items-center rounded-xl bg-gold/15 text-gold">
              <Flame className="size-4" />
            </span>
          </div>
          <p className="mt-2 font-display text-4xl font-bold tabular-nums">{completion}%</p>
          <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-surface-2">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-flare to-cyan-neon"
              initial={{ width: 0 }}
              animate={{ width: `${completion}%` }}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            />
          </div>
          <p className="mt-3 text-[12.5px] leading-relaxed text-muted-foreground">{t("dash.profile.d")}</p>
          <Button
            onClick={() => { useNora.getState().setEditProfileOpen(true); navigate("profile"); }}
            variant="outline"
            className="mt-4 h-9 gap-2 self-start rounded-lg border-flare/40 bg-transparent px-4 text-[12.5px] font-medium text-flare hover:bg-flare/10"
          >
            {t("dash.profile.cta")} <ArrowRight className="size-3.5" />
          </Button>
        </Reveal>
      </div>

      {/* ---------- 4 stats continentales ---------- */}
      <div className="mt-3.5 grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 + i * 0.06, ease: EASE }}
            className="hover-spot flex items-center gap-3.5 rounded-xl border border-line bg-surface p-4"
          >
            <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl bg-surface-2", s.color)}>
              <s.icon className="size-4.5" />
            </span>
            <span className="min-w-0">
              <span className="block font-display text-lg font-bold tabular-nums leading-tight">{s.value}</span>
              <span className="block truncate font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted-foreground">{s.label}</span>
            </span>
          </motion.div>
        ))}
      </div>

      {/* ---------- projets tendance / équipe / fil ---------- */}
      <div className="mt-3.5 grid gap-3.5 lg:grid-cols-3">
        {/* projets tendance */}
        <Reveal className="rounded-xl border border-line bg-surface p-5">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-[15px] font-semibold">{t("dash.trend.t")} 🔥</h2>
            <button onClick={() => navigate("projects")} className="cursor-pointer font-mono text-[10.5px] text-signal hover:underline">
              {t("dash.seeAll")} →
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {trending.map((p) => (
              <button
                key={p.id}
                onClick={() => navigate("projects")}
                className="group flex w-full cursor-pointer items-center gap-3 rounded-lg border border-transparent px-1.5 py-1.5 text-left transition-colors hover:border-line hover:bg-surface-2/60"
              >
                {p.cover ? (
                  <img src={p.cover} alt="" className="size-10 shrink-0 rounded-lg object-cover" loading="lazy" />
                ) : (
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface-2 text-lg">{p.icon}</span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-medium text-foreground group-hover:text-flare">{p.name}</span>
                  <span className="block truncate text-[11px] text-muted-foreground">{p.tagline}</span>
                </span>
                <span className="flex shrink-0 items-center gap-1 font-mono text-[10.5px] text-gold">
                  <Star className="size-3 fill-current" /> {fmt(p.stars)}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* rejoins une équipe */}
        <Reveal delay={0.08} className="hover-spot-flare relative flex flex-col rounded-xl border border-line bg-surface p-5">
          <div className="flex items-start justify-between">
            <h2 className="font-display text-[15px] font-semibold">{t("dash.team.t")}</h2>
            <span className="grid size-9 place-items-center rounded-xl bg-flare/15 text-lg" aria-hidden>{teamPick.icon}</span>
          </div>
          <p className="mt-3 font-display text-[15px] font-semibold text-flare-bright">{teamPick.name}</p>
          <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{teamPick.tagline}.</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {teamPick.openRoles.slice(0, 2).map((r) => (
              <span key={r} className="rounded-full border border-flare/30 bg-flare/10 px-2 py-0.5 font-mono text-[10px] text-flare">{r}</span>
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between pt-4">
            <span className="flex -space-x-2">
              {teamPick.team.map((u) => {
                const d = devByUsername(u);
                return d ? <NoraAvatar key={u} name={d.name} gradient={d.gradient} size={26} className="ring-2 ring-surface" /> : null;
              })}
            </span>
            <Button
              size="sm"
              variant={joined ? "outline" : "default"}
              onClick={() => toggleJoin(teamPick.id)}
              className={cn(
                "h-8 rounded-md px-3 font-mono text-[10.5px]",
                joined ? "border-signal-muted/50 bg-transparent text-signal" : "bg-flare text-flare-foreground hover:bg-flare/90",
              )}
            >
              {joined ? "✓" : t("projects.join")}
            </Button>
          </div>
        </Reveal>

        {/* fil condensé */}
        <Reveal delay={0.14} className="rounded-xl border border-line bg-surface p-5">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-[15px] font-semibold">{t("app.feed")}</h2>
            <button onClick={() => navigate("feed")} className="cursor-pointer font-mono text-[10.5px] text-signal hover:underline">
              {t("dash.seeAll")} →
            </button>
          </div>
          <div className="mt-4 space-y-3.5">
            {posts.slice(0, 2).map((p) => {
              const a = devByUsername(p.author);
              return (
                <button key={p.id} onClick={() => navigate("feed")} className="flex w-full cursor-pointer items-start gap-2.5 text-left">
                  {a && <NoraAvatar name={a.name} gradient={a.gradient} size={30} online={a.online} />}
                  <span className="min-w-0">
                    <span className="block text-[12.5px] font-medium text-foreground">{a?.name}</span>
                    <span className="mt-0.5 line-clamp-2 block text-[11.5px] leading-relaxed text-muted-foreground">{p.content}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>

      {/* ---------- activité / éditeur NORA / build africa ---------- */}
      <div className="mt-3.5 grid gap-3.5 lg:grid-cols-3">
        {/* activité récente */}
        <Reveal className="rounded-xl border border-line bg-surface p-5">
          <h2 className="font-display text-[15px] font-semibold">{t("dash.activity.t")}</h2>
          <ul className="mt-4 space-y-3">
            {activity.map((a) => (
              <li key={a.key} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-surface-2 text-signal">
                  <a.icon className="size-3.5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[12.5px] leading-snug text-foreground">{a.text}</span>
                  <span className="font-mono text-[10px] text-muted-foreground">{a.time}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* éditeur NORA Studio */}
        <Reveal delay={0.08} className="card-halo flex flex-col overflow-hidden rounded-xl border border-line bg-surface">
          <div className="p-5 pb-0">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-signal animate-pulse-dot" />
              <h2 className="font-display text-[15px] font-semibold">{t("dash.editor.t")}</h2>
            </div>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">{t("dash.editor.d")}</p>
          </div>
          <div className="mx-4 mt-3.5 overflow-hidden rounded-lg border border-line bg-[#0d0a18] font-mono text-[11.5px] leading-[1.8]">
            <pre className="overflow-x-auto px-3.5 py-2.5"><code>
              <span className="text-gold">const</span> <span className="text-flare-bright">africa</span> <span className="text-muted-foreground">=</span> {"{"}{"\n"}
              {"  "}talent<span className="text-muted-foreground">:</span> <span className="text-signal">true</span>,{"\n"}
              {"  "}innovation<span className="text-muted-foreground">:</span> <span className="text-signal">true</span>,{"\n"}
              {"  "}future<span className="text-muted-foreground">:</span> <span className="text-cyan-neon">&apos;bright&apos;</span>,{"\n"}
              {"}"};
            </code></pre>
          </div>
          <div className="p-4 pt-3.5">
            <Magnetic strength={0.15}>
              <Button
                onClick={() => navigate("studio")}
                className="flare-cta h-9 w-full gap-2 rounded-lg text-[12.5px] font-semibold text-flare-foreground"
              >
                <Sparkles className="size-3.5" /> {t("dash.editor.cta")}
              </Button>
            </Magnetic>
          </div>
        </Reveal>

        {/* carte #BuildAfrica */}
        <Reveal delay={0.14} className="relative flex flex-col justify-end overflow-hidden rounded-xl border border-line">
          <img src={IMAGES.buildAfrica} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0912]/92 via-[#0b0912]/35 to-transparent" />
          <div className="relative p-5">
            <p className="font-display text-[15px] font-bold leading-snug text-white">{t("dash.build.t")}</p>
            <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-cyan-neon">{t("dash.build.tag")}</p>
          </div>
        </Reveal>
      </div>

      {/* ---------- hackathon à venir (bandeau fin) ---------- */}
      <Reveal className="hover-spot-flare mt-3.5 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border border-line bg-surface p-4.5 sm:flex-nowrap">
        <img src={IMAGES.hackathon} alt="" className="h-14 w-24 shrink-0 rounded-lg object-cover" loading="lazy" />
        <div className="min-w-0 flex-1">
          <p className="inline-flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-gold">
            <CalendarDays className="size-3" /> {t("dash.hackathon.t")}
          </p>
          <p className="mt-0.5 truncate font-display text-[14.5px] font-semibold">{hack?.name} <span className="font-normal text-muted-foreground">· {hack?.date} · {hack?.place}</span></p>
        </div>
        <span className="font-mono text-[11.5px] text-flare-bright">{hack?.prize}</span>
        <Button
          onClick={() => navigate("salons")}
          className="h-9 shrink-0 gap-2 rounded-lg bg-flare px-4 text-[12.5px] font-semibold text-flare-foreground hover:bg-flare/90"
        >
          <Users className="size-3.5" /> {t("dash.hackathon.cta")}
        </Button>
      </Reveal>

      {/* micro footer de vue */}
      <p className="mt-5 text-center font-mono text-[10px] text-muted-foreground/50">
        {fmt(devs.length)} {t("dash.featured")}
      </p>
    </div>
  );
}
