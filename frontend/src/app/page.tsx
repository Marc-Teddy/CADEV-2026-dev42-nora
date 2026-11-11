"use client";

/* ============================================================
   NORA — Point d'entrée de l'application (SPA client-side).
   · Session réelle : bootstrap() recharge le compte via le token.
   · Accès gardé : la plateforme (dashboard, fil, projets, devs,
     salons, challenges, missions, profils) exige un compte.
     Seules la landing et les pages d'authentification sont publiques.
   ============================================================ */

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { useNora } from "@/lib/store";
import { useLang } from "@/lib/i18n";
import { CommandPalette } from "@/components/nora/palette";
import { LandingPage } from "@/components/nora/landing";
import { LoginPage, RegisterPage } from "@/components/nora/auth";
import { AppShell } from "@/components/nora/shell";
import { DashboardView } from "@/components/nora/views/dashboard";
import { FeedView } from "@/components/nora/views/feed";
import { ProjectsView, DevsView } from "@/components/nora/views/explore";
import { ProfileView } from "@/components/nora/views/profile";
import { StudioView } from "@/components/nora/views/studio";
import { SalonsView, ChallengesView } from "@/components/nora/views/salons";
import { MissionsView } from "@/components/nora/views/extra";
import { Logo } from "@/components/nora/shared";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Home() {
  const { view, authed, booting } = useNora();
  const { t } = useLang();
  const authToastShown = useRef(false);

  const isAuthPage = view === "login" || view === "register";
  /* garde d'accès : aucune vue de la plateforme sans compte */
  const needsAuth = !authed && !isAuthPage && view !== "landing";

  /* session au premier rendu */
  useEffect(() => {
    useNora.getState().bootstrap();
    /* rafraîchissement léger : demandes de contact + présence */
    const id = setInterval(() => {
      if (useNora.getState().authed) useNora.getState().refreshThreads();
    }, 15000);
    return () => clearInterval(id);
  }, []);

  /* redirection vers la connexion + message sobre, une seule fois */
  useEffect(() => {
    if (!needsAuth) return;
    useNora.setState({ view: "login" });
    if (!authToastShown.current) {
      authToastShown.current = true;
      toast(t("auth.requiredToast"));
    }
  }, [needsAuth, t]);

  if (booting) {
    return (
      <div className="grid min-h-svh place-items-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Logo size={34} />
          <span className="size-5 animate-spin rounded-full border-2 border-flare/30 border-t-flare" />
        </div>
      </div>
    );
  }

  const inApp = !needsAuth && view !== "landing" && !isAuthPage;

  const viewFor = () => {
    switch (view) {
      case "landing": return <LandingPage />;
      case "login": return <LoginPage />;
      case "register": return <RegisterPage />;
      case "feed": return <FeedView />;
      case "projects": return <ProjectsView />;
      case "devs": return <DevsView />;
      case "salons": return <SalonsView />;
      case "challenges": return <ChallengesView />;
      case "missions": return <MissionsView />;
      case "profile": return <ProfileView />;
      case "studio": return <StudioView />;
      default: return <DashboardView />;
    }
  };

  const inner = needsAuth ? <LoginPage /> : viewFor();

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={inApp ? `app-${view}` : view}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.32, ease: EASE }}
        >
          {inApp ? <AppShell>{inner}</AppShell> : inner}
        </motion.div>
      </AnimatePresence>
      {/* Palette Cmd/Ctrl+K, montée une seule fois globalement */}
      <CommandPalette />
    </>
  );
}
