"use client";

/* ============================================================
   NORA — Vue « Missions rémunérées »
   Petits contrats payés en Mobile Money : budget, durée,
   compétences, taux de correspondance, candidature.
   ============================================================ */

import { useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Banknote, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNora } from "@/lib/store";
import { useLang } from "@/lib/i18n";
import { ViewHeader } from "../shell";
import { EASE } from "../fx/reveal";
import { cn } from "@/lib/utils";

export function MissionsView() {
  const { t, lang } = useLang();
  const missions = useNora((s) => s.missions);
  const [sent, setSent] = useState<Record<string, boolean>>({});

  return (
    <div className="mx-auto max-w-6xl">
      <ViewHeader kicker={t("app.missions")} title={t("missions.title")} sub={t("missions.sub")} />

      <div className="grid gap-3.5 md:grid-cols-2 xl:grid-cols-3">
        {missions.map((m, i) => (
          <motion.article
            key={m.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.3), ease: EASE }}
            className="hover-spot flex flex-col rounded-xl border border-line bg-surface p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-display text-[15px] font-semibold leading-snug">{m.title}</h2>
              <span className="shrink-0 rounded-md bg-signal-muted/15 px-2 py-1 font-mono text-[10px] text-signal">
                {m.match}% {t("missions.match")}
              </span>
            </div>
            <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10.5px] text-muted-foreground">
              <span className="inline-flex items-center gap-1"><MapPin className="size-3 text-signal" />{m.city} {m.flag}</span>
              <span>{m.client}</span>
            </p>

            <p className="mt-3.5 flex items-baseline gap-2">
              <span className="font-display text-xl font-bold text-foreground">{m.budget}</span>
              <span className="font-mono text-[10px] text-muted-foreground">
                · {m.duration}
              </span>
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {m.skills.map((s) => (
                <span key={s} className="rounded bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-foreground">{s}</span>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[10.5px] text-muted-foreground">
              <span className="inline-flex items-center gap-1"><Clock className="size-3 text-flare" />{t(`missions.urgency.${m.urgency}`)}</span>
              <span className="inline-flex items-center gap-1">
                <Banknote className="size-3.5 text-signal" />
                {t("missions.paidVia")} <span className="text-signal">{m.money}</span>
              </span>
            </div>

            <div className="mt-auto border-t border-line pt-3.5 [margin-top:auto]">
              <Button
                onClick={() => {
                  setSent((p) => ({ ...p, [m.id]: true }));
                  toast.success(lang === "fr" ? "Candidature envoyée — réponse sous 48 h" : "Application sent — reply within 48 h");
                }}
                disabled={sent[m.id]}
                className={cn(
                  "h-9 w-full gap-2 rounded-lg font-mono text-[11.5px]",
                  sent[m.id]
                    ? "border border-signal-muted/60 bg-transparent text-signal"
                    : "bg-flare text-flare-foreground hover:bg-flare/90",
                )}
              >
                {sent[m.id] && <BadgeCheck className="size-3.5" />}
                {sent[m.id] ? t("missions.applied") : t("missions.apply")}
              </Button>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
