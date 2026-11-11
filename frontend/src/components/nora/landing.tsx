"use client";

/* ============================================================
   NORA — Landing : nav flottante, composition des sections,
   ticker mono et footer.
   ============================================================ */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNora } from "@/lib/store";
import { useLang } from "@/lib/i18n";
import { Logo, WeaveStrip, ThemeToggle } from "@/components/nora/shared";
import { api } from "@/lib/api-client";
import { Magnetic } from "@/components/nora/fx/magnetic";
import { EASE } from "@/components/nora/fx/reveal";
import { cn } from "@/lib/utils";
import { Hero } from "./landing/hero";
import { AfricaSection } from "./landing/africa";
import { ActivitySection } from "./landing/activity";
import { BentoSection } from "./landing/bento";
import { DiffSection, RoadmapSection, CtaSection } from "./landing/story";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/* ============================ NAVBAR ============================ */
function LandingNav() {
  const { navigate, authed } = useNora();
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  // scroll-spy : l'onglet de la section visible porte la pilule
  const [active, setActive] = useState<string | null>(null);

  const SECTIONS = [
    { id: "produit", label: t("nav.product") },
    { id: "communaute", label: t("nav.community") },
    { id: "parcours", label: t("nav.roadmap") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.38;
      let cur: string | null = null;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= y) cur = s.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });

  const go = (id: string) => () => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div
          className={`mt-3 flex h-14 items-center justify-between rounded-2xl border px-3 sm:px-4 transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
            scrolled
              ? "border-line bg-background/80 shadow-[0_10px_40px_-14px_rgba(0,0,0,0.65)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <button onClick={() => navigate("landing")} aria-label="NORA — accueil" className="cursor-pointer">
            <Logo size={30} />
          </button>

          {/* onglets de sections : pilule glissante + scroll-spy */}
          <nav
            className="hidden items-center gap-0.5 rounded-full border border-line bg-surface/50 p-1 backdrop-blur-md lg:flex"
            aria-label="Sections"
          >
            {SECTIONS.map((l) => {
              const on = active === l.id;
              return (
                <button
                  key={l.id}
                  onClick={go(l.id)}
                  aria-current={on ? "true" : undefined}
                  className="relative rounded-full px-4 py-1.5 text-[13px] transition-colors duration-300"
                >
                  {on && (
                    <motion.span
                      layoutId="landing-nav-pill"
                      className="absolute inset-0 rounded-full border border-signal-muted/30 bg-signal/[0.12]"
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                  <span className={cn("relative z-[1] transition-colors duration-300", on ? "text-signal" : "text-muted-foreground hover:text-foreground")}>
                    {l.label}
                  </span>
                  {on && <span className="absolute -bottom-[5px] left-1/2 z-[1] size-[5px] -translate-x-1/2 rounded-full bg-flare" />}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* raccourci palette */}
            <button
              onClick={() => useNora.getState().setCommandOpen(true)}
              className="hidden items-center gap-2 rounded-lg border border-line bg-surface/60 px-2.5 py-1.5 font-mono text-[10px] text-muted-foreground transition-colors hover:border-signal-muted/50 hover:text-signal sm:flex"
              aria-label="Palette de commandes"
            >
              <Zap className="size-3 text-flare" />
              <kbd className="tracking-widest">⌘K</kbd>
              <span className="hidden lg:inline">{t("nav.cmdk")}</span>
            </button>

            {/* langue */}
            <button
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              className="flex h-8 items-center overflow-hidden rounded-lg border border-line font-mono text-[10px]"
              aria-label={t("app.lang")}
            >
              <span className={`px-2 py-1 transition-colors ${lang === "fr" ? "bg-signal text-[#07130b]" : "text-muted-foreground"}`}>FR</span>
              <span className={`px-2 py-1 transition-colors ${lang === "en" ? "bg-signal text-[#07130b]" : "text-muted-foreground"}`}>EN</span>
            </button>

            {/* thème */}
            <ThemeToggle
              className="grid size-8 place-items-center rounded-lg border border-line text-muted-foreground transition-colors hover:border-signal-muted/50 hover:text-signal"
              iconClass="size-3.5"
            />

            <Magnetic strength={0.22}>
              <Button
                onClick={() => navigate(authed ? "dashboard" : "register")}
                className="h-9 gap-1.5 rounded-lg bg-flare px-4 text-[13px] font-semibold text-flare-foreground hover:bg-flare/90"
              >
                {authed ? t("nav.openApp") : t("nav.enter")}
                <ArrowUpRight className="size-3.5" />
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

/* ============================ TICKER ============================ */
/* chiffres réels de la plateforme + derniers projets publiés */
function Ticker() {
  const { t } = useLang();
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    let alive = true;
    Promise.all([api.stats(), api.projects()])
      .then(([s, p]) => {
        if (!alive) return;
        const st = s.stats;
        const base = [
          `${st.devs} ${t("ticker.devs")}`,
          `${st.projects} ${t("ticker.projects")}`,
          `${st.posts} ${t("ticker.posts")}`,
          `${st.countries} ${t("ticker.countries")}`,
          `${st.channels} ${t("ticker.channels")}`,
        ];
        const proj = p.projects.slice(0, 5).map((x) => `${x.icon} ${x.name} · ★ ${x.stars}`);
        setItems([...base, ...proj]);
      })
      .catch(() => undefined);
    const id = setInterval(() => {
      api.projects().then((p) => {
        if (!alive) return;
        setItems((cur) => {
          const proj = p.projects.slice(0, 5).map((x) => `${x.icon} ${x.name} · ★ ${x.stars}`);
          return cur.length ? [...cur.slice(0, 5), ...proj] : cur;
        });
      }).catch(() => undefined);
    }, 30000);
    return () => { alive = false; clearInterval(id); };
  }, [t]);

  /* repli sobre si l'API est inaccessible */
  const fallback = ["ticker.1", "ticker.2", "ticker.3", "ticker.4", "ticker.5", "ticker.6", "ticker.7", "ticker.8"].map((k) => t(k));
  const list = items.length ? items : fallback;
  const row = [...list, ...list];
  return (
    <div className="relative border-y border-line bg-surface/60 py-3.5">
      <WeaveStrip className="absolute inset-x-0 top-0 opacity-60" />
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee flex w-max items-center gap-8">
          {row.map((it, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              {it}
              <span className={i % 2 === 0 ? "text-flare" : "text-flare-bright/60"}>▸</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================ FOOTER ============================ */
function LandingFooter() {
  const { t } = useLang();
  const { navigate, viewProfile } = useNora();

  const col = (title: string, links: { label: string; onClick?: () => void }[]) => (
    <div>
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{title}</p>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <button
              onClick={l.onClick}
              className="cursor-pointer text-[13px] text-muted-foreground transition-colors duration-300 hover:text-signal"
            >
              {l.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="relative border-t border-line bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.2fr_repeat(3,1fr)]">
          <div>
            <Logo size={30} />
            <p className="mt-4 max-w-[260px] text-[13px] leading-relaxed text-muted-foreground">{t("footer.tag")}</p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-signal">Réalisée par l'équipe dev42</p>
          </div>
          {col(t("footer.product"), [
            { label: t("footer.p1"), onClick: () => viewProfile("theoah") },
            { label: t("footer.p2"), onClick: () => navigate("login") },
            { label: t("footer.p3"), onClick: () => go("produit") },
            { label: t("footer.p4"), onClick: () => navigate("login") },
          ])}
          {col(t("footer.community"), [
            { label: t("footer.c1"), onClick: () => go("communaute") },
            { label: t("footer.c2"), onClick: () => navigate("register") },
            { label: t("footer.c3"), onClick: () => navigate("register") },
            { label: t("footer.c4"), onClick: () => navigate("register") },
          ])}
          {col(t("footer.stack"), [
            { label: t("footer.s1") },
            { label: t("footer.s2") },
            { label: t("footer.s3") },
            { label: t("footer.s4") },
          ])}
        </div>

        <div className="ascii-sep mt-12" aria-hidden />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
          <span>
            {t("footer.rights")}
            <span className="mx-2.5 inline-block size-[3px] rounded-full bg-flare/70 align-middle" />
            <span className="text-flare-bright/80">NORA</span>
          </span>
          <span>{t("footer.cmdk")}</span>
        </div>
      </div>
    </footer>
  );
}

function go(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ============================ PAGE ============================ */
export function LandingPage() {
  return (
    <main className="relative">
      <LandingNav />
      <Hero />
      <Ticker />
      <AfricaSection />
      <ActivitySection />
      <BentoSection />
      <DiffSection />
      <RoadmapSection />
      <CtaSection />
      <LandingFooter />
    </main>
  );
}

/* easing partagé exporté pour cohérence */
export { EASE };
