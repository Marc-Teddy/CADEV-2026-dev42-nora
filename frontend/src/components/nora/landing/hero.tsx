"use client";

/* ============================================================
   NORA — Hero
   · Titre éditorial révélé mot par mot (masque).
   · Faux terminal qui tape des commandes réelles du produit,
     curseur orange clignotant.
   · Champ de points WebGL en fond, désactivable d'un clic.
   ============================================================ */

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, TerminalSquare, PowerOff, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNora } from "@/lib/store";
import { useLang } from "@/lib/i18n";
import { WebglField } from "@/components/nora/fx/webgl-field";
import { Magnetic } from "@/components/nora/fx/magnetic";
import { TextReveal, EASE } from "@/components/nora/fx/reveal";

/* ---------------- Moteur de frappe du terminal ---------------- */

type TermLine = { kind: "cmd" | "ok" | "info"; text: string };

/* Scénario 100 % produit : les mécaniques de NORA, pas de persona
   ni de chiffres inventés — chaque commande correspond à une
   fonctionnalité réelle de la plateforme. */
const SCRIPT: TermLine[] = [
  { kind: "cmd", text: "nora init --hackathon" },
  { kind: "ok", text: "✔ salon d'équipe généré" },
  { kind: "ok", text: "✔ dépôt de code partagé prêt" },
  { kind: "ok", text: "✔ environnement dev en ligne" },
  { kind: "cmd", text: "nora publish ./ma-api" },
  { kind: "info", text: "portfolio à jour · visible par les recruteurs" },
  { kind: "cmd", text: "nora deploy api --stack go" },
  { kind: "ok", text: "build 2.3s · live → nora.dev" },
];

function useTerminal(reduced: boolean) {
  const [lines, setLines] = useState<{ line: TermLine; chars: number }[]>([]);
  const [phase, setPhase] = useState<"typing" | "hold">("typing");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;
    const ref = { current: [] as { line: TermLine; chars: number }[] };
    const commit = (v: { line: TermLine; chars: number }[]) => {
      ref.current = v;
      setLines(v);
    };

    const run = () => {
      let idx = 0;
      let chars = 0;
      const step = () => {
        if (cancelled) return;
        if (idx >= SCRIPT.length) {
          setPhase("hold");
          timer = setTimeout(() => {
            if (cancelled) return;
            commit([]);
            setPhase("typing");
            idx = 0; chars = 0;
            timer = setTimeout(step, 450);
          }, 3800);
          return;
        }
        const cur = SCRIPT[idx];
        const next = [...ref.current];
        if (cur.kind === "cmd") {
          chars += 1;
          next[idx] = { line: cur, chars };
          commit(next);
          if (chars >= cur.text.length) { idx += 1; chars = 0; timer = setTimeout(step, 360); }
          else timer = setTimeout(step, 26 + Math.random() * 30);
        } else {
          next[idx] = { line: cur, chars: cur.text.length };
          commit(next);
          idx += 1; chars = 0;
          timer = setTimeout(step, 180);
        }
      };
      timer = setTimeout(step, 650);
    };

    // tout démarre après un frame : pas de setState synchrone dans l'effet
    const raf = requestAnimationFrame(() => {
      if (cancelled) return;
      if (reduced) {
        commit(SCRIPT.map((line) => ({ line, chars: line.text.length })));
        setPhase("hold");
        return;
      }
      run();
    });

    return () => { cancelled = true; clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [reduced]);

  return { lines, phase };
}

/* ---------------- Bloc terminal ---------------- */
function TerminalWindow() {
  const { t } = useLang();
  const reduced = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );
  const { lines, phase } = useTerminal(reduced);

  return (
    <div className="relative w-full max-w-[520px] rounded-xl border border-line bg-surface-2/90 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-sm">
      {/* barre de titre */}
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-muted-foreground/40" />
        <span className="size-2.5 rounded-full bg-muted-foreground/40" />
        <span className="size-2.5 rounded-full bg-flare/70" />
        <span className="ml-2 flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
          <TerminalSquare className="size-3.5" />
          {t("term.title")}
        </span>
        <span className="ml-auto font-mono text-[10px] text-signal/80">zsh</span>
      </div>

      {/* corps */}
      <div className="relative h-[224px] overflow-hidden px-4 py-3 font-mono text-[12.5px] leading-[1.75] sm:text-[13px]">
        {lines.map(({ line, chars }, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">
            {line.kind === "cmd" ? (
              <>
                <span className="text-flare">$ </span>
                <span className="text-foreground">{line.text.slice(0, chars)}</span>
                {i === lines.length - 1 && phase === "typing" && (
                  <span className="animate-blink ml-0.5 inline-block h-[1.05em] w-[7px] translate-y-[2px] bg-flare" />
                )}
              </>
            ) : line.kind === "ok" ? (
              <span className="text-signal">{line.text}</span>
            ) : (
              <span className="text-flare-bright/75">{line.text}</span>
            )}
          </div>
        ))}
        {phase === "hold" && (
          <div>
            <span className="text-flare">$ </span>
            <span className="animate-blink inline-block h-[1.05em] w-[7px] translate-y-[2px] bg-flare" />
          </div>
        )}
        {/* balayage discret : signal → flare */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px animate-scan bg-gradient-to-r from-transparent via-signal/20 to-flare/30" />
      </div>
    </div>
  );
}

/* ---------------- Hero ---------------- */
export function Hero() {
  const { t } = useLang();
  const { navigate, webgl, setWebgl } = useNora();

  return (
    <section className="relative overflow-hidden" id="top">
      {/* fond : grille + champ WebGL (désactivable) */}
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)]" />
      <WebglField />

      <div className="relative mx-auto flex min-h-[92svh] max-w-7xl flex-col justify-center gap-10 px-4 pb-16 pt-28 sm:px-6 lg:flex-row lg:items-center lg:gap-14 lg:pt-24">
        {/* texte */}
        <div className="max-w-[560px] flex-1">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.14em] text-muted-foreground"
          >
            <span className="size-1.5 animate-pulse-dot rounded-full bg-flare" />
            {t("hero.badge")}
          </motion.p>

          <h1 className="font-display text-[42px] font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-[64px]">
            <TextReveal text={t("hero.t1")} as="span" className="block" />
            <TextReveal text={t("hero.t2")} as="span" className="block text-signal" delay={0.12} />
            <TextReveal text={t("hero.t3")} as="span" className="block" delay={0.22} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            className="mt-5 max-w-[460px] text-[15px] leading-relaxed text-muted-foreground sm:text-base"
          >
            {t("hero.sub")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.52, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-3.5"
          >
            <Magnetic>
              <Button
                size="lg"
                onClick={() => navigate("register")}
                className="flare-cta group h-12 gap-2.5 rounded-lg px-6 font-semibold text-flare-foreground shadow-[0_10px_44px_-12px_var(--glow-flare)]"
              >
                {t("hero.cta1")}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Button
                size="lg"
                variant="outline"
                onClick={() => { useNora.getState().login(); }}
                className="h-12 gap-2.5 rounded-lg border-signal-muted/50 bg-transparent px-6 font-mono text-[13px] text-signal hover:bg-signal/10 hover:text-signal"
              >
                <Play className="size-3.5 fill-current" />
                {t("hero.cta2")}
              </Button>
            </Magnetic>

            {/* toggle du champ WebGL — léger et désactivable */}
            <button
              onClick={() => setWebgl(!webgl)}
              aria-pressed={webgl}
              className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-signal-muted/60 hover:text-signal"
              title={t("hero.fx")}
            >
              {webgl ? <Power className="size-3 text-signal" /> : <PowerOff className="size-3" />}
              {t("hero.fx")} {webgl ? t("hero.fxOn") : t("hero.fxOff")}
            </button>
          </motion.div>
        </div>

        {/* terminal */}
        <motion.div
          initial={{ opacity: 0, y: 26, rotate: 0.4 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
          className="flex flex-1 justify-center lg:justify-end"
        >
          <div className="animate-float">
            <TerminalWindow />
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
              {t("term.line1")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
