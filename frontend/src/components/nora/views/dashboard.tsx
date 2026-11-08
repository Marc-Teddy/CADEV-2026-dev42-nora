"use client";

/* ============================================================
   NORA — Vue « Tableau de bord »
   Stats du jour, tâches, activité des salons, devs suggérés,
   pulse du continent et hackathon à venir.
   ============================================================ */

import { motion } from "framer-motion";
import {
  ArrowUpRight, CalendarDays, Check, Flame, MessageSquare, Sparkles, Trophy, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNora } from "@/lib/store";
import { useLang } from "@/lib/i18n";
import { devs, devByUsername, globalStats, hackathons, trendingTags, CURRENT_USER } from "@/lib/data";
import { NoraAvatar, fmt } from "../shared";
import { ViewHeader } from "../shell";
import { EASE, Reveal } from "../fx/reveal";
import { Magnetic } from "../fx/magnetic";
import { cn } from "@/lib/utils";

const BARS = [42, 68, 35, 80, 55, 92, 61, 74, 48, 88, 66, 79, 38, 84, 57, 95, 52, 70, 63, 91, 45, 76, 59, 82];

export function DashboardView() {
  const { t } = useLang();
  const { navigate, viewProfile } = useNora();
  const me = devByUsername(CURRENT_USER)!;
  const suggested = devs.filter((d) => d.username !== CURRENT_USER).slice(0, 3);
  const hack = hackathons[0];

  const stats = [
    { icon: Flame, label: t("dash.streak"), value: "17", color: "text-flare" },
    { icon: Sparkles, label: t("dash.reputation"), value: fmt(me.reputation), color: "text-signal" },
    { icon: Trophy, label: t("dash.points"), value: "3 985", color: "text-signal" },
    { icon: MessageSquare, label: t("dash.unread"), value: "12", color: "text-foreground" },
  ];

  const tasks = [t("dash.task1"), t("dash.task2"), t("dash.task3")];

  return (
    <div className="mx-auto max-w-6xl">
      <ViewHeader
        kicker={t("app.dashboard")}
        title={`${t("dash.greeting")}, ${me.name.split(" ")[0]} 👋`}
        sub={t("dash.today")}
      />

      {/* stats */}
      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
            className="hover-spot rounded-xl border border-line bg-surface p-4"
          >
            <s.icon className={cn("size-4", s.color)} />
            <p className="mt-3 font-display text-2xl font-bold tabular-nums text-foreground">{s.value}</p>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-3.5 lg:grid-cols-[1.35fr_1fr]">
        {/* activité des salons */}
        <Reveal className="rounded-xl border border-line bg-surface p-5">
          <div className="flex items-baseline justify-between">
            <div>
              <h2 className="font-display text-[15px] font-semibold">{t("dash.trend.t")}</h2>
              <p className="mt-0.5 text-[12px] text-muted-foreground">{t("dash.trend.d")}</p>
            </div>
            <span className="font-mono text-[10px] text-signal">+38%</span>
          </div>
          <div className="mt-5 flex h-[92px] items-end gap-[5px]">
            {BARS.map((h, i) => (
              <motion.div
                key={i}
                className={cn("flex-1 rounded-t-sm", i === 15 ? "bg-flare" : "bg-signal/45")}
                initial={{ height: 4 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.02, ease: EASE }}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60">
            <span>00h</span><span>12h</span><span>24h</span>
          </div>
        </Reveal>

        {/* à faire */}
        <Reveal delay={0.08} className="rounded-xl border border-line bg-surface p-5">
          <h2 className="font-display text-[15px] font-semibold">{t("dash.tasks.t")}</h2>
          <ul className="mt-4 space-y-2.5">
            {tasks.map((task, i) => (
              <li key={task} className="group flex items-center gap-3 rounded-lg border border-line px-3 py-2.5 transition-colors hover:border-signal-muted/50">
                <span className={cn(
                  "grid size-4.5 shrink-0 place-items-center rounded-full border transition-colors",
                  i === 0 ? "border-flare/60 bg-flare/15 text-flare" : "border-line text-muted-foreground group-hover:border-signal/60",
                )}>
                  <Check className="size-2.5" />
                </span>
                <span className="text-[13px] text-muted-foreground group-hover:text-foreground">{task}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="mt-6 grid gap-3.5 lg:grid-cols-[1fr_1fr_1.1fr]">
        {/* devs suggérés */}
        <Reveal className="rounded-xl border border-line bg-surface p-5">
          <h2 className="font-display text-[15px] font-semibold">{t("dash.suggest.t")}</h2>
          <p className="mt-0.5 text-[12px] text-muted-foreground">{t("dash.suggest.d")}</p>
          <div className="mt-4 space-y-2">
            {suggested.map((d) => (
              <button
                key={d.username}
                onClick={() => viewProfile(d.username)}
                className="flex w-full items-center gap-3 rounded-lg border border-line px-3 py-2.5 text-left transition-colors hover:border-signal-muted/50"
              >
                <NoraAvatar name={d.name} gradient={d.gradient} size={34} online={d.online} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-medium">{d.name}</span>
                  <span className="block truncate font-mono text-[10px] text-muted-foreground">{d.role} · {d.city}</span>
                </span>
                <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground" />
              </button>
            ))}
          </div>
        </Reveal>

        {/* pulse du continent */}
        <Reveal delay={0.08} className="rounded-xl border border-line bg-surface p-5">
          <h2 className="font-display text-[15px] font-semibold">{t("dash.pulse.t")}</h2>
          <p className="mt-0.5 text-[12px] text-muted-foreground">{t("dash.pulse.d")}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {trendingTags.map((item, i) => (
              <span
                key={item.tag}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px]",
                  i < 2 ? "border-signal-muted/50 bg-signal-muted/10 text-signal" : "border-line text-muted-foreground",
                )}
              >
                #{item.tag}
                <span className="tabular-nums opacity-60">{item.trend}</span>
              </span>
            ))}
          </div>
          <p className="mt-4 font-mono text-[10px] text-muted-foreground/60">
            {fmt(globalStats.devs)} devs · {globalStats.countries} pays
          </p>
        </Reveal>

        {/* hackathon à venir */}
        <Reveal delay={0.14} className="card-halo relative overflow-hidden rounded-xl border border-line bg-surface p-5">
          <div className="absolute inset-0 bg-dots opacity-30 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
          <div className="relative">
            <p className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-flare">
              <CalendarDays className="size-3" /> {t("dash.hackathon.t")}
            </p>
            <h2 className="mt-2.5 font-display text-lg font-bold leading-snug">{hack.name}</h2>
            <p className="mt-1 text-[12.5px] text-muted-foreground">{hack.tagline}</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[10.5px] text-muted-foreground">
              <span>{hack.date}</span>
              <span>{hack.place}</span>
              <span className="text-flare">{hack.prize}</span>
            </div>
            <Magnetic strength={0.18} className="mt-4">
              <Button
                onClick={() => navigate("salons")}
                className="h-9 gap-2 rounded-lg bg-flare px-4 text-[12.5px] font-semibold text-flare-foreground hover:bg-flare/90"
              >
                <Users className="size-3.5" /> {t("dash.hackathon.cta")}
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
