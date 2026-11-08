"use client";

/* ============================================================
   NORA — Point d'entrée de l'application
   Routeur de vues client (SPA) : la démo vit sur la route /,
   prête à être éclatée en routes Next.js ou branchée au backend
   Go quand l'intégration démarre.
   ============================================================ */

import { AnimatePresence, motion } from "framer-motion";
import { useNora } from "@/lib/store";
import { CommandPalette } from "@/components/nora/palette";
import { LandingPage } from "@/components/nora/landing";
import { LoginPage, RegisterPage } from "@/components/nora/auth";
import { AppShell } from "@/components/nora/shell";
import { DashboardView } from "@/components/nora/views/dashboard";
import { FeedView } from "@/components/nora/views/feed";
import { ProjectsView, DevsView } from "@/components/nora/views/explore";
import { ProfileView } from "@/components/nora/views/profile";
import { SalonsView, ChallengesView } from "@/components/nora/views/salons";
import { MissionsView } from "@/components/nora/views/extra";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Home() {
  const { view, authed } = useNora();

  const inApp = authed && !["landing", "login", "register"].includes(view);

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
      default: return <DashboardView />;
    }
  };

  const inner = viewFor();

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
