"use client";

/* ============================================================
   NORA — Connexion & inscription
   Mise en page partagée : colonne « produit » (perks + ornements)
   et colonne formulaire. En démo, toute saisie connecte.
   Prêt à brancher sur l'API Go : POST /api/v1/auth/login|register.
   ============================================================ */

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Github, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNora } from "@/lib/store";
import { useLang } from "@/lib/i18n";
import { Logo, WeaveStrip } from "./shared";
import { EASE } from "./fx/reveal";
import { Magnetic } from "./fx/magnetic";

function AuthSide() {
  const { t, lang } = useLang();
  const perks = [
    { t: t("auth.perk1.t"), d: t("auth.perk1.d") },
    { t: t("auth.perk2.t"), d: t("auth.perk2.d") },
    { t: t("auth.perk3.t"), d: t("auth.perk3.d") },
  ];
  return (
    <div className="relative hidden flex-col justify-between overflow-hidden border-r border-line bg-surface/50 p-10 lg:flex">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_30%_30%,black,transparent)]" />
      <div className="relative">
        <Logo size={30} />
      </div>
      <div className="relative space-y-8">
        {perks.map((p, i) => (
          <motion.div
            key={p.t}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease: EASE }}
            className="flex gap-3.5"
          >
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-signal/15 text-signal">
              <Check className="size-3" />
            </span>
            <div>
              <p className="font-display text-sm font-semibold text-foreground">{p.t}</p>
              <p className="mt-1 max-w-[300px] text-[13px] leading-relaxed text-muted-foreground">{p.d}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="relative">
        <WeaveStrip className="mb-4 max-w-[240px]" />
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
          {lang === "fr" ? "nora — pensée par des devs africains, pour les devs africains" : "nora — built by african devs, for african devs"}
        </p>
      </div>
    </div>
  );
}

function AuthCard({
  kicker, title, sub, subLink, fields, submit, onSubmit, isRegister,
}: {
  kicker: string;
  title: string;
  sub: string;
  subLink: string;
  fields: ("email" | "password" | "name" | "username" | "city")[];
  submit: string;
  onSubmit: () => void;
  isRegister: boolean;
}) {
  const { t, lang } = useLang();
  const { navigate } = useNora();
  const [loading, setLoading] = useState(false);

  const labels: Record<string, string> = {
    email: t("auth.email"),
    password: t("auth.password"),
    name: t("auth.name"),
    username: t("auth.username"),
    city: t("auth.city"),
  };
  const icons: Record<string, React.ReactNode> = {
    email: <Mail className="size-3.5" />,
    password: <User className="size-3.5" />,
    name: <User className="size-3.5" />,
    username: <User className="size-3.5" />,
    city: <User className="size-3.5" />,
  };

  const submit2 = () => {
    setLoading(true);
    setTimeout(() => {
      onSubmit();
      setLoading(false);
    }, 550);
  };

  return (
    <div className="flex w-full items-center justify-center px-4 py-24 sm:px-6 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="w-full max-w-[420px]"
      >
        <button
          onClick={() => navigate("landing")}
          className="mb-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-signal"
        >
          <ArrowLeft className="size-3.5" /> {t("auth.back")}
        </button>

        <p className="font-mono text-[11px] tracking-[0.2em] text-signal">
          <span className="text-flare mr-2">{"//"}</span>{kicker}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">{title}</h1>
        <p className="mt-3 text-[13.5px] text-muted-foreground">
          {sub}{" "}
          <button
            onClick={() => navigate(isRegister ? "login" : "register")}
            className="cursor-pointer font-medium text-signal underline-offset-4 hover:underline"
          >
            {subLink}
          </button>
        </p>

        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => { e.preventDefault(); submit2(); }}
        >
          {fields.map((f) => (
            <div key={f} className="space-y-1.5">
              <Label htmlFor={`f-${f}`} className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {labels[f]}
              </Label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60">
                  {icons[f]}
                </span>
                <Input
                  id={`f-${f}`}
                  type={f === "password" ? "password" : "text"}
                  required={f === "email" || f === "password"}
                  className="h-11 rounded-lg border-line bg-surface pl-9 font-mono text-[13px] focus-visible:ring-signal/50"
                />
              </div>
            </div>
          ))}

          <Magnetic strength={0.15} className="block pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="group h-12 w-full gap-2.5 rounded-lg bg-flare font-semibold text-flare-foreground hover:bg-flare/90 glow-flare disabled:opacity-70"
            >
              {loading ? (
                <span className="size-4 animate-spin rounded-full border-2 border-flare-foreground/40 border-t-flare-foreground" />
              ) : (
                <>
                  {submit}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </Magnetic>
          <p className="text-center font-mono text-[10px] text-muted-foreground/60">{t("auth.hint")}</p>
        </form>

        <div className="mt-8 flex items-center gap-3">
          <span className="h-px flex-1 bg-line" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">or</span>
          <span className="h-px flex-1 bg-line" />
        </div>
        <Button
          variant="outline"
          onClick={() => { toast(lang === "fr" ? "OAuth GitHub — bientôt branché au backend Go" : "GitHub OAuth — Go backend hook coming soon"); }}
          className="mt-6 h-11 w-full gap-2.5 rounded-lg border-line bg-surface font-mono text-[12px] hover:border-signal-muted/50"
        >
          <Github className="size-4" /> GitHub
        </Button>
      </motion.div>
    </div>
  );
}

export function LoginPage() {
  const { t, lang } = useLang();
  const { login } = useNora();
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <AuthSide />
      <AuthCard
        kicker={t("auth.login.kicker")}
        title={t("auth.login.title")}
        sub={t("auth.login.sub")}
        subLink={t("auth.register.title")}
        fields={["email", "password"]}
        submit={t("auth.submitLogin")}
        onSubmit={login}
        isRegister={false}
      />
    </main>
  );
}

export function RegisterPage() {
  const { t, lang } = useLang();
  const { login } = useNora();
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <AuthSide />
      <AuthCard
        kicker={t("auth.register.kicker")}
        title={t("auth.register.title")}
        sub={t("auth.register.sub")}
        subLink={t("auth.login.title")}
        fields={["name", "username", "email", "password", "city"]}
        submit={t("auth.submitRegister")}
        onSubmit={login}
        isRegister
      />
    </main>
  );
}
