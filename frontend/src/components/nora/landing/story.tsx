"use client";

/* ============================================================
   NORA — Récit : diff IA, parcours (graphe de commits) et CTA final
   · Vue « diff » vert/orange : l'agent propose, l'utilisateur valide.
   · Graphe de commits minimaliste qui se dessine au scroll.
   ============================================================ */

import { useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { ArrowRight, Check, GitCommitHorizontal, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNora } from "@/lib/store";
import { useLang } from "@/lib/i18n";
import { TextReveal, Reveal, EASE } from "@/components/nora/fx/reveal";
import { Magnetic } from "@/components/nora/fx/magnetic";
import { Kicker, WeaveStrip } from "@/components/nora/shared";
import { cn } from "@/lib/utils";

/* =========================== DIFF =========================== */

type Line = { kind: "ctx" | "del" | "add"; text: string };

const DIFF: Line[] = [
  { kind: "ctx", text: "func (s *Store) Session(id string) (*User, error) {" },
  { kind: "del", text: '  row, err := db.Query("SELECT * FROM users WHERE id = \'" + id + "\'")' },
  { kind: "add", text: "  u, ok := cache.Get(id)" },
  { kind: "add", text: "  if ok { return u, nil }" },
  { kind: "add", text: '  row := db.QueryRow("SELECT id, name, email FROM users WHERE id = $1", id)' },
  { kind: "ctx", text: "  if err != nil { return nil, err }" },
  { kind: "del", text: "  rows.Scan(&u.ID, &u.Name, &u.Email)" },
  { kind: "add", text: "  row.Scan(&u.ID, &u.Name, &u.Email)" },
  { kind: "add", text: "  cache.Set(id, u, 30*time.Second)" },
  { kind: "ctx", text: "  return &u, nil" },
  { kind: "ctx", text: "}" },
];

export function DiffSection() {
  const { t } = useLang();
  const [applied, setApplied] = useState(false);
  const removed = DIFF.filter((l) => l.kind === "del").length;
  const added = DIFF.filter((l) => l.kind === "add").length;

  return (
    <section className="relative border-t border-line bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="parallax-slow" style={{ "--plx": "30px" } as React.CSSProperties}>
            <Kicker>{t("diff.kicker")}</Kicker>
            <TextReveal text={t("diff.title")} className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[44px]" />
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[420px] leading-relaxed text-muted-foreground">{t("diff.sub")}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-7 flex items-center gap-5 font-mono text-[11px]">
                <span className="text-flare">−{removed} {t("diff.removed")}</span>
                <span className="text-signal">+{added} {t("diff.added")}</span>
              </div>
              <Button
                onClick={() => setApplied(!applied)}
                variant={applied ? "outline" : "default"}
                className={cn(
                  "mt-6 h-11 rounded-lg px-5 font-mono text-[12px]",
                  applied
                    ? "border-signal-muted/60 bg-transparent text-signal"
                    : "flare-cta text-flare-foreground shadow-[0_10px_44px_-12px_var(--glow-flare)]",
                )}
              >
                {applied ? <Check className="size-4" /> : <GitBranch className="size-4" />}
                {applied ? t("diff.applied") : t("diff.apply")}
              </Button>
            </Reveal>
          </div>

          {/* panneau diff */}
          <Reveal delay={0.12}>
            <div className="overflow-hidden rounded-xl border border-line bg-[#0d0a18] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.75)] dark:bg-[#0d0a18]">
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[11px]">
                <span className="text-muted-foreground">auth/session.go</span>
                <span className="flex gap-4">
                  <span className="text-flare/90">{t("diff.before")}</span>
                  <span className="text-signal">{t("diff.after")}</span>
                </span>
              </div>
              <div className="px-0 py-3 font-mono text-[11.5px] leading-[1.9] sm:text-[12.5px]">
                {DIFF.map((l, i) => (
                  <motion.div
                    key={i}
                    className={cn(
                      "flex gap-3 px-4",
                      l.kind === "add" && "bg-signal/[0.08]",
                      l.kind === "del" && "bg-flare/[0.08]",
                    )}
                    animate={{
                      opacity: applied && l.kind === "del" ? 0 : 1,
                      height: applied && l.kind === "del" ? 0 : "auto",
                    }}
                    transition={{ duration: 0.4, delay: applied ? i * 0.02 : 0, ease: EASE }}
                    style={applied && l.kind === "del" ? { overflow: "hidden", marginTop: 0, marginBottom: 0 } : undefined}
                  >
                    <span
                      className={cn(
                        "w-3 shrink-0 select-none",
                        l.kind === "add" ? "text-signal" : l.kind === "del" ? "text-flare" : "text-transparent",
                      )}
                    >
                      {l.kind === "add" ? "+" : l.kind === "del" ? "−" : " "}
                    </span>
                    <span className={cn(
                      "whitespace-pre",
                      l.kind === "add" ? "text-signal/95" : l.kind === "del" ? "text-flare/80 line-through decoration-flare/40" : "text-muted-foreground",
                    )}>
                      {l.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =========================== PARCOURS =========================== */

const COMMITS: { hash: string; msg: string; date: string; tag: string; current?: boolean }[] = [
  { hash: "8c41e02", msg: "feat(core): profils-portfolio vivants", date: "T1 2026", tag: "MVP" },
  { hash: "b7d90af", msg: "feat(salons): temps réel par stack, par ville", date: "T1 2026", tag: "MVP" },
  { hash: "e21c7d3", msg: "feat(hackathon): espace d'équipe en 1 clic", date: "T2 2026", tag: "v1" },
  { hash: "f90a118", msg: "feat(missions): paiements Mobile Money", date: "T3 2026", tag: "v1.1" },
  { hash: "a5e64c9", msg: "feat(ai): éditeur en ligne + agents de code", date: "T4 2026", tag: "v2", current: true },
  { hash: "0d3b5f8", msg: "chore(scale): communautés dans toute l'Afrique", date: "2027", tag: "∞" },
];

export function RoadmapSection() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });

  return (
    <section id="parcours" className="relative border-t border-line">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="parallax-slow" style={{ "--plx": "28px" } as React.CSSProperties}>
              <Kicker>{t("roadmap.kicker")}</Kicker>
              <TextReveal text={t("roadmap.title")} className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[44px]" />
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-[380px] leading-relaxed text-muted-foreground">{t("roadmap.sub")}</p>
              </Reveal>
              <Reveal delay={0.16} className="mt-8">
                <WeaveStrip className="max-w-[220px]" />
              </Reveal>
            </div>
          </div>

          {/* timeline de commits */}
          <div ref={ref} className="relative pl-8 sm:pl-10">
            {/* ligne qui se dessine au scroll : dégradé vert → orange */}
            <div className="absolute bottom-2 left-[9px] top-2 w-px bg-line sm:left-[13px]" aria-hidden>
              <motion.div
                className="h-full w-full origin-top bg-gradient-to-b from-signal via-flare-bright/70 to-flare"
                style={{ scaleY: scrollYProgress }}
              />
            </div>

            {COMMITS.map((c, i) => (
              <motion.div
                key={c.hash}
                className="group relative pb-9 last:pb-0"
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-14% 0px" }}
                transition={{ duration: 0.55, delay: i * 0.04, ease: EASE }}
              >
                {/* nœud */}
                <span
                  className={cn(
                    "absolute -left-8 top-1 grid size-[19px] place-items-center rounded-full border sm:-left-10",
                    c.current
                      ? "border-flare/60 bg-flare/15 text-flare"
                      : "border-signal-muted/50 bg-surface text-signal",
                  )}
                >
                  <GitCommitHorizontal className="size-3" />
                  {c.current && (
                    <span className="absolute inset-0 -z-[1] animate-ping rounded-full bg-flare/20" />
                  )}
                </span>

                <div className="rounded-xl border border-line bg-surface px-4 py-3.5 transition-colors duration-300 group-hover:border-signal-muted/50">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10.5px] text-muted-foreground">
                    <span className="text-flare">{c.hash}</span>
                    <span>{c.date}</span>
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.5 text-[9.5px] uppercase tracking-wider",
                        c.current ? "bg-flare/15 text-flare" : "bg-signal-muted/15 text-signal",
                      )}
                    >
                      {c.tag}
                    </span>
                    {c.current && (
                      <span className="ml-auto inline-flex items-center gap-1 text-flare">
                        <span className="size-1.5 animate-pulse-dot rounded-full bg-flare" />
                        {t("roadmap.now")}
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 font-mono text-[13px] text-foreground">{c.msg}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================== CTA FINAL =========================== */

export function CtaSection() {
  const { t } = useLang();
  const { navigate } = useNora();

  return (
    <section className="relative border-t border-line bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-surface px-6 py-14 text-center sm:px-10 sm:py-20">
          <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,black,transparent)]" />
          <WeaveStrip className="absolute inset-x-0 top-0" />
          <div className="relative">
            <TextReveal
              text={t("cta.title")}
              className="mx-auto max-w-[640px] font-display text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-[46px]"
            />
            <Reveal delay={0.12}>
              <p className="mx-auto mt-5 max-w-[420px] text-muted-foreground">{t("cta.sub")}</p>
            </Reveal>
            <Reveal delay={0.2} className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
              <Magnetic>
                <Button
                  size="lg"
                  onClick={() => navigate("register")}
                  className="flare-cta group h-12 gap-2.5 rounded-lg px-7 font-semibold text-flare-foreground shadow-[0_10px_44px_-12px_var(--glow-flare)]"
                >
                  {t("cta.b1")}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Magnetic>
              <Magnetic strength={0.2}>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("login")}
                  className="h-12 rounded-lg border-signal-muted/50 px-7 font-mono text-[13px] text-signal hover:bg-signal/10 hover:text-signal"
                >
                  {t("cta.b2")}
                </Button>
              </Magnetic>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
                {t("footer.cmdk")}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
