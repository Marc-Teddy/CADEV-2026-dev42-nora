"use client";

/* ============================================================
   NORA — Hero (v3)
   Première section : titre, sous-titre, deux actions, chiffres
   en direct de la plateforme. Rien d'autre — la carte d'Afrique
   arrive plus bas, au scroll. Globe réseau 3D en décor.
   ============================================================ */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNora } from "@/lib/store";
import { useLang } from "@/lib/i18n";
import { NetworkGlobe } from "@/components/nora/fx/network-globe";
import { Magnetic } from "@/components/nora/fx/magnetic";
import { TextReveal, EASE } from "@/components/nora/fx/reveal";
import { NoraAvatar } from "@/components/nora/shared";
import { api } from "@/lib/api-client";

function LiveStats() {
  const { t } = useLang();
  const [stats, setStats] = useState<{ projects: number; posts: number; devs: number; countries: number } | null>(null);
  const [online, setOnline] = useState<{ name: string; gradient: [string, string]; avatarUrl?: string }[]>([]);

  useEffect(() => {
    api.stats()
      .then((r) => setStats({
        projects: r.stats.projects,
        posts: r.stats.posts,
        devs: r.stats.devs,
        countries: r.stats.countries,
      }))
      .catch(() => setStats(null));
    api.devs()
      .then((r) => setOnline(
        r.devs.filter((d) => d.online).slice(0, 5)
          .map((d) => ({ name: d.name, gradient: d.gradient, avatarUrl: d.avatarUrl })),
      ))
      .catch(() => undefined);
  }, []);

  const chips = stats ? [
    { v: stats.devs, l: t("hero.stat.devs") },
    { v: stats.projects, l: t("hero.stat.projects") },
    { v: stats.posts, l: t("hero.stat.posts") },
    { v: stats.countries, l: t("hero.stat.countries") },
  ] : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.66, ease: EASE }}
      className="mt-10"
    >
      <p className="mb-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        <span className="size-1.5 animate-pulse-dot rounded-full bg-flare" />
        {t("hero.live")}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        {chips.map((c) => (
          <div key={c.l} className="rounded-xl border border-line bg-surface/70 px-4 py-3 backdrop-blur-sm">
            <p className="font-display text-2xl font-bold tabular-nums text-foreground sm:text-[28px]">{c.v}</p>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">{c.l}</p>
          </div>
        ))}
        {stats == null && (
          <div className="flex h-[70px] items-center font-mono text-[11px] text-muted-foreground">…</div>
        )}
        {online.length > 0 && (
          <div className="flex items-center gap-2.5 rounded-xl border border-line bg-surface/70 px-4 py-3 backdrop-blur-sm">
            <span className="flex -space-x-2">
              {online.map((d) => (
                <NoraAvatar key={d.name} name={d.name} gradient={d.gradient} size={26} online className="ring-2 ring-surface" avatarUrl={d.avatarUrl} />
              ))}
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-signal">{t("hero.stat.online")}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function Hero() {
  const { t } = useLang();
  const { navigate, authed } = useNora();

  return (
    <section className="relative overflow-hidden" id="top">
      {/* fond : grille */}
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="relative mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-center px-4 pb-14 pt-32 sm:px-6 lg:min-h-[92svh] lg:pt-24">
        <div className="max-w-[640px]">
          {/* l'orbe NORA — en flux au-dessus du titre sur mobile, décor
              à droite à partir de md ; toujours entièrement visible */}
          <NetworkGlobe className="relative z-0 mx-auto mb-6 block h-[220px] w-[220px] opacity-90 sm:h-[260px] sm:w-[260px] lg:absolute lg:right-[3%] lg:top-[6%] lg:mb-0 lg:h-[450px] lg:w-[450px] xl:right-[5%] xl:h-[550px] xl:w-[550px]" />
          <h1 className="font-display text-[46px] font-bold leading-[1.04] tracking-tight sm:text-[64px] lg:text-[72px]">
            <TextReveal text={t("hero.t1")} as="span" className="block" />
            <TextReveal text={t("hero.t2")} as="span" className="block text-flare-bright" delay={0.12} />
            <TextReveal text={t("hero.t3")} as="span" className="block" delay={0.22} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-muted-foreground sm:text-lg"
          >
            {t("hero.sub")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.52, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <Button
                size="lg"
                onClick={() => navigate("register")}
                className="flare-cta group h-13 gap-2.5 rounded-xl px-7 text-[15px] font-semibold text-flare-foreground shadow-[0_10px_44px_-12px_var(--glow-flare)]"
              >
                {t("hero.cta1")}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate(authed ? "projects" : "login")}
                className="h-13 gap-2.5 rounded-xl border-line bg-surface/60 px-7 text-[15px] font-medium text-foreground backdrop-blur-sm hover:border-signal-muted/50 hover:text-signal"
              >
                <Compass className="size-4 text-flare-bright" />
                {t("hero.cta2")}
              </Button>
            </Magnetic>
          </motion.div>

          {/* chiffres en direct — seuls dans la première section */}
          <LiveStats />
        </div>
      </div>
    </section>
  );
}
