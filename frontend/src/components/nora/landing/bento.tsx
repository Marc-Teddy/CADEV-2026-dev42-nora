"use client";

/* ============================================================
   NORA — Section « Le produit » : Bento Grid interactif
   Chaque bloc réagit au survol : lueur interne qui suit le
   pointeur (variables CSS --mx/--my), bordure signal, scale
   inversé subtil du contenu. Aperçus mini-UI réels dans chaque
   bloc (pas d'icônes génériques).
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight, Banknote, Check, Crown, MapPin, MessageSquareText,
  Sparkles, Terminal,
} from "lucide-react";
import { useNora } from "@/lib/store";
import { useLang } from "@/lib/i18n";
import { TextReveal, Reveal, EASE } from "@/components/nora/fx/reveal";
import { Kicker, NoraAvatar, fmt } from "@/components/nora/shared";
import { cn } from "@/lib/utils";

/* lueur qui suit le pointeur dans chaque bloc */
function useSpot() {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return { ref, onMove };
}

function BentoCard({
  children,
  className = "",
  title,
  desc,
  accent = "signal",
}: {
  children?: React.ReactNode;
  className?: string;
  title: string;
  desc: string;
  accent?: "signal" | "flare";
}) {
  const { ref, onMove } = useSpot();
  const { navigate } = useNora();
  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={cn(
        "hover-spot group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface p-5 transition-[border-color,transform] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
        accent === "flare" && "hover-spot-flare",
        className,
      )}
    >
      {/* le contenu glisse imperceptiblement vers le haut : scale inversé */}
      <div className="relative z-[1] flex h-full flex-col transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5">
        <h3 className="font-display text-[15px] font-semibold text-foreground">{title}</h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{desc}</p>
        <div className="mt-4 flex-1">{children}</div>
      </div>
      {/* flèche d'exploration au survol */}
      <button
        onClick={() => navigate("register")}
        aria-label={title}
        className="absolute right-4 top-4 z-[2] grid size-7 place-items-center rounded-full border border-line text-muted-foreground opacity-0 transition-all duration-300 hover:border-signal-muted/60 hover:text-signal group-hover:opacity-100"
      >
        <ArrowUpRight className="size-3.5" />
      </button>
    </div>
  );
}

/* ---------- mini-aperçus ---------- */
/* Aucune donnée fictive : chaque aperçu démontre une mécanique du
   produit (« vous » désigne le futur utilisateur, pas un persona). */

function ProfilePreview() {
  return (
    <div className="@container flex h-full flex-col justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <NoraAvatar name="Vous" gradient={["#34e3b5", "#0f9d77"]} size={52} online />
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-semibold">@vous</p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">votre vitrine de code</p>
        </div>
        <span className="ml-auto rounded-full bg-signal-muted/15 px-2.5 py-1 font-mono text-[10px] text-signal">
          ★ vérifiable
        </span>
      </div>
      <div className="space-y-2.5">
        {["React", "TypeScript", "Tailwind"].map((n, i) => {
          const v = [92, 88, 95][i];
          return (
            <div key={n} className="flex items-center gap-3">
              <span className="w-20 shrink-0 font-mono text-[10px] text-muted-foreground">{n}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
                <motion.div
                  className="h-full rounded-full bg-signal"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${v}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: EASE }}
                />
              </div>
              <span className="font-mono text-[10px] text-signal">{v}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EditorPreview() {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-[#0d0a18] font-mono text-[11.5px] leading-[1.8] dark:bg-[#0d0a18]">
      <div className="flex items-center gap-2 border-b border-line px-3 py-1.5 text-[10px] text-muted-foreground">
        <Terminal className="size-3" /> api/handlers.go
        <span className="ml-auto flex items-center gap-1 text-signal"><Sparkles className="size-3" /> agent</span>
      </div>
      <div className="space-y-0.5 px-3 py-2">
        <p className="text-muted-foreground">+ <span className="text-flare">func</span> (s *Store) <span className="text-foreground">GetUser</span><span className="text-muted-foreground">(id string)</span></p>
        <p className="text-signal">+&nbsp;&nbsp;return cache.Get(id) <span className="text-muted-foreground">{"// miss → SQL"}</span></p>
        <p className="text-flare/90">-&nbsp;&nbsp;rows, err := db.Query(&quot;SELECT…&quot;)</p>
        <p className="text-muted-foreground/60">&nbsp;&nbsp;…</p>
      </div>
    </div>
  );
}

function SalonsPreview() {
  return (
    <div className="flex h-full flex-col justify-end gap-2">
      <div className="max-w-[85%] rounded-lg rounded-bl-sm bg-surface-2 px-3 py-1.5 text-[12px] text-muted-foreground">
        qui rejoint le hackathon ?
      </div>
      <div className="max-w-[85%] self-end rounded-lg rounded-br-sm bg-signal-muted/25 px-3 py-1.5 text-[12px] text-foreground">
        moi — je prends le backend Go
      </div>
      <div className="flex items-center gap-2 font-mono text-[10px] text-signal">
        <MessageSquareText className="size-3" /> #frontend · en direct
        <span className="ml-auto size-1.5 animate-pulse-dot rounded-full bg-flare" />
      </div>
    </div>
  );
}

function HackathonPreview() {
  const items = ["salon", "dépôt git", "environnement"];
  return (
    <div className="space-y-2.5">
      <div className="relative h-20 overflow-hidden rounded-lg border border-line">
        <img src="/images/event-hackathon.jpg" alt="" loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0912]/85 via-[#0b0912]/25 to-transparent" />
        <span className="absolute bottom-1.5 left-2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/85">Nuit du Code · Cotonou</span>
      </div>
      <div className="inline-flex items-center gap-1.5 rounded-md bg-flare/15 px-2.5 py-1 font-mono text-[10px] text-flare">
        ⚡ 1 clic
      </div>
      {items.map((it, i) => (
        <motion.div
          key={it}
          className="flex items-center gap-2 text-[12px] text-muted-foreground"
          initial={{ opacity: 0.35, x: -6 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.25, duration: 0.45, ease: EASE }}
        >
          <span className="grid size-4 place-items-center rounded-full bg-signal/15 text-signal">
            <Check className="size-2.5" />
          </span>
          {it} <span className="ml-auto font-mono text-[9px] text-signal">ok</span>
        </motion.div>
      ))}
    </div>
  );
}

function ChallengesPreview() {
  /* classement illustratif : aucune paire nommée, barres relatives */
  const rows = [
    { u: "pair A", w: 92, you: false },
    { u: "pair B", w: 78, you: false },
    { u: "vous", w: 64, you: true },
  ];
  return (
    <div className="space-y-1.5">
      {rows.map((r, i) => (
        <div
          key={r.u}
          className={cn(
            "flex items-center gap-2.5 rounded-md px-2.5 py-1.5 font-mono text-[11px]",
            r.you ? "border border-flare/30 bg-flare-soft" : "bg-surface-2",
          )}
        >
          <span className={cn("grid size-4.5 shrink-0 place-items-center rounded text-[9px]", i === 0 ? "bg-flare text-flare-foreground" : "bg-surface text-muted-foreground")}>{i + 1}</span>
          <span className={r.you ? "text-flare" : "text-foreground"}>{r.u}</span>
          {i === 0 && <Crown className="size-3 text-flare" />}
          <span className="ml-auto flex w-14 items-center">
            <span className="h-1 flex-1 overflow-hidden rounded-full bg-background/60">
              <motion.span
                className={cn("block h-full rounded-full", r.you ? "bg-flare" : "bg-signal")}
                initial={{ width: 0 }}
                whileInView={{ width: `${r.w}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.25 + i * 0.1, ease: EASE }}
              />
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

function MissionsPreview() {
  return (
    <div className="space-y-2.5">
      <div className="flex items-baseline justify-between">
        <span className="bg-gradient-to-r from-flare-bright via-flare to-flare-deep bg-clip-text font-display text-xl font-bold text-transparent">
          Mobile Money
        </span>
        <span className="font-mono text-[10px] text-flare-bright">paie à la tâche</span>
      </div>
      <div className="flex items-center gap-2">
        <Banknote className="size-3.5 text-flare" />
        <span className="rounded bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-foreground">Wave</span>
        <span className="rounded bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-foreground">MTN MoMo</span>
        <span className="rounded bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-foreground">M-Pesa</span>
      </div>
      <p className="font-mono text-[10px] text-muted-foreground">le client finance, vous livrez, la paie part.</p>
    </div>
  );
}

function CitiesPreview() {
  const photos = [
    { city: "Cotonou", image: "/images/city-cotonou.jpg" },
    { city: "Abidjan", image: "/images/city-abidjan.jpg" },
    { city: "Dakar", image: "/images/city-dakar.jpg" },
    { city: "Accra", image: "/images/city-accra.jpg" },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <div className="flex flex-wrap gap-1.5">
        {photos.map((c) => (
          <span key={c.city} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 py-1 pl-1 pr-2.5 font-mono text-[10px] text-foreground">
            <img src={c.image} alt="" loading="lazy" className="size-5 rounded-full object-cover" />
            {c.city}
          </span>
        ))}
        <span className="inline-flex items-center gap-1 rounded-full border border-flare/30 bg-flare-soft px-2.5 py-1 font-mono text-[10px] text-flare">
          <MapPin className="size-2.5" /> + votre ville
        </span>
      </div>
      <p className="font-mono text-[10px] text-muted-foreground/70">meetups · mentorat · hackathons de quartier</p>
    </div>
  );
}

function ReputationPreview() {
  const [go, setGo] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setGo(true), 300);
    return () => clearTimeout(id);
  }, []);
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="flex items-end gap-2">
        <motion.p
          className="font-display text-4xl font-bold tabular-nums text-signal sm:text-5xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <CountUp target={100} run={go} />
        </motion.p>
        <span className="pb-1.5 font-display text-xl font-bold text-signal">%</span>
        <span className="pb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-flare-bright">vérifiable</span>
      </div>
      <div className="mt-3 h-1.5 max-w-full overflow-hidden rounded-full bg-surface-2">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-signal-muted via-signal to-flare-bright"
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
        />
      </div>
      <p className="mt-3 font-mono text-[10px] leading-relaxed text-muted-foreground">
        chaque point vient d'un projet réel, d'un challenge réussi ou d'une contribution acceptée.
      </p>
    </div>
  );
}

function CountUp({ target, run }: { target: number; run: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    const t0 = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return <>{fmt(v)}</>;
}

/* ---------- grille ---------- */
export function BentoSection() {
  const { t } = useLang();
  return (
    <section id="produit" className="relative border-t border-line">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <Kicker>{t("bento.kicker")}</Kicker>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <TextReveal
            text={t("bento.title")}
            className="max-w-[560px] font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[44px]"
          />
          <Reveal delay={0.1}>
            <p className="max-w-[300px] text-sm leading-relaxed text-muted-foreground">{t("bento.sub")}</p>
          </Reveal>
        </div>

        <Reveal delay={0.05} className="mt-10">
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            <BentoCard title={t("bento.profile.t")} desc={t("bento.profile.d")} className="sm:col-span-2 lg:row-span-2 lg:min-h-[320px]">
              <ProfilePreview />
            </BentoCard>
            <BentoCard title={t("bento.ai.t")} desc={t("bento.ai.d")} className="sm:col-span-2">
              <EditorPreview />
            </BentoCard>
            <BentoCard title={t("bento.salons.t")} desc={t("bento.salons.d")}>
              <SalonsPreview />
            </BentoCard>
            <BentoCard title={t("bento.challenges.t")} desc={t("bento.challenges.d")}>
              <ChallengesPreview />
            </BentoCard>
            <BentoCard title={t("bento.missions.t")} desc={t("bento.missions.d")} className="sm:col-span-2 lg:col-span-4">
              <MissionsPreview />
            </BentoCard>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

