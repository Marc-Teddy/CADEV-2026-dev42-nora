"use client";

/* ============================================================
   NORA — Section « Le terrain » : l'Afrique et ses 54 drapeaux.
   La carte officielle fournie par l'équipe (africa-flags.png)
   remplace l'ancienne carte en points. Révélation au scroll.
   ============================================================ */

import { motion } from "framer-motion";
import { MapPin, Users } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useNora } from "@/lib/store";
import { TextReveal, Reveal, EASE } from "@/components/nora/fx/reveal";
import { Kicker } from "@/components/nora/shared";
import { cityCards, IMAGES } from "@/lib/content";
import { cn } from "@/lib/utils";

/* Villes technologiques réelles du continent — hubs de la communauté. */
const CITIES = [
  { name: "Casablanca" }, { name: "Le Caire" }, { name: "Dakar" }, { name: "Abidjan" },
  { name: "Accra" }, { name: "Lagos" }, { name: "Douala" }, { name: "Addis-Abeba" },
  { name: "Kampala" }, { name: "Nairobi" }, { name: "Kigali" }, { name: "Antananarivo" },
  { name: "Johannesburg" },
];

export function AfricaSection() {
  const { t } = useLang();
  const stats = useNora((s) => s.stats);

  return (
    <section id="communaute" className="relative border-t border-line bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* texte */}
          <div className="parallax-slow" style={{ "--plx": "34px" } as React.CSSProperties}>
            <Kicker>{t("africa.kicker")}</Kicker>
            <TextReveal text={t("africa.title")} className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[44px]" />
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[440px] text-[15.5px] leading-relaxed text-muted-foreground sm:text-base">
                {t("africa.sub")}
              </p>
            </Reveal>

            <Reveal delay={0.18} className="mt-8">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {t("africa.cities")}
              </p>
              <div className="flex flex-wrap gap-2">
                {CITIES.map((c, i) => (
                  <span
                    key={c.name}
                    className="inline-flex items-center gap-2 rounded-md border border-line bg-surface-2 px-3 py-1.5 font-mono text-[11px] text-foreground transition-colors duration-300 hover:border-signal-muted/60"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <MapPin className="size-3 text-signal" />
                    {c.name}
                  </span>
                ))}
              </div>
              <p className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] text-muted-foreground/60">
                <Users className="size-3" />
                {stats.devs} {t("africa.memberWord")} · {stats.countries} {t("africa.countriesWord")}
              </p>
            </Reveal>
          </div>

          {/* carte officielle : l'Afrique en drapeaux (fournie par l'équipe) */}
          <Reveal delay={0.12} className={cn("relative rounded-2xl border border-line bg-surface p-4 sm:p-8")}>
            <div className="absolute inset-0 rounded-2xl bg-dots opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotate: -1 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 1.1, ease: EASE }}
              className="relative mx-auto w-full max-w-[480px]"
            >
              <div
                className="absolute inset-6 rounded-full opacity-70 blur-2xl"
                style={{ background: "radial-gradient(ellipse at center, rgba(124,58,237,0.35), rgba(59,130,246,0.18) 55%, transparent 75%)" }}
                aria-hidden
              />
              <img
                src={IMAGES.africaFlags}
                alt={t("africa.mapAlt")}
                loading="lazy"
                className="relative w-full [filter:drop-shadow(0_18px_40px_rgba(124,58,237,0.28))]"
              />
            </motion.div>
            <p className="relative mt-3 text-center font-mono text-[9.5px] uppercase tracking-[0.2em] text-muted-foreground/60">
              {t("africa.mapCaption")}
            </p>
          </Reveal>
        </div>

        {/* communautés locales — photos réelles des villes */}
        <Reveal delay={0.1} className="mt-12 lg:mt-16">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {t("africa.photoTitle")}
          </p>
          <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
            {cityCards.map((c, i) => (
              <motion.figure
                key={c.city}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                className="group relative overflow-hidden rounded-xl border border-line"
              >
                <img
                  src={c.image}
                  alt={`${c.city}, ${c.country}`}
                  loading="lazy"
                  className="h-40 w-full object-cover transition-transform duration-700 group-hover:scale-[1.06] sm:h-48"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0912]/90 via-[#0b0912]/20 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3.5">
                  <span>
                    <span className="block font-display text-[14.5px] font-bold text-white">{c.city} {c.flag}</span>
                    <span className="block font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/60">{c.country}</span>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
