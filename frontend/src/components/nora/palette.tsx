"use client";

/* ============================================================
   NORA — Palette de commandes (Cmd/Ctrl + K)
   Navigation complète du site, bascule thème / langue / FX,
   connexion démo. Basée sur cmdk (shadcn Command).
   ============================================================ */

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import {
  CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator,
} from "@/components/ui/command";
import { useNora } from "@/lib/store";
import { useLang } from "@/lib/i18n";
import { useThemeSwitch } from "./shared";
import {
  BadgeDollarSign, Code2, Cpu, Home, LayoutDashboard, LogIn, LogOut,
  MessageSquare, Moon, Newspaper, SquareTerminal, Sun, Trophy, User, Users,
} from "lucide-react";

export function CommandPalette() {
  const { view, authed, commandOpen, setCommandOpen, navigate, login, logout } = useNora();
  const { t, lang, setLang } = useLang();
  const { theme, setTheme } = useTheme();
  const switchTheme = useThemeSwitch();

  /* Raccourci global Cmd/Ctrl + K */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen(!commandOpen);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [commandOpen, setCommandOpen]);

  const run = (fn: () => void) => () => { fn(); };

  return (
    <CommandDialog
      open={commandOpen}
      onOpenChange={setCommandOpen}
      className="border-line bg-popover/95 backdrop-blur-xl [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.2em] [&_[cmdk-group-heading]]:text-muted-foreground"
    >
      <CommandInput placeholder={t("palette.placeholder")} className="font-mono text-sm" />
      <CommandList className="max-h-[380px]">
        <CommandEmpty>{lang === "fr" ? "Aucun résultat." : "No result."}</CommandEmpty>

        <CommandGroup heading={t("palette.nav")}>
          <CommandItem onSelect={run(() => navigate("landing"))}>
            <Home className="size-4 text-signal" /> {t("app.home")}
          </CommandItem>
          {!authed ? (
            <>
              <CommandItem onSelect={run(() => navigate("login"))}>
                <LogIn className="size-4 text-signal" /> {t("auth.login.title")}
              </CommandItem>
              <CommandItem onSelect={run(() => navigate("register"))}>
                <LogIn className="size-4 text-signal" /> {t("auth.register.title")}
              </CommandItem>
            </>
          ) : (
            <>
              <CommandItem onSelect={run(() => navigate("dashboard"))}>
                <LayoutDashboard className="size-4 text-signal" /> {t("app.dashboard")}
              </CommandItem>
              <CommandItem onSelect={run(() => navigate("feed"))}>
                <Newspaper className="size-4 text-signal" /> {t("app.feed")}
              </CommandItem>
              <CommandItem onSelect={run(() => navigate("studio"))}>
                <SquareTerminal className="size-4 text-flare" /> {t("app.studio")}
              </CommandItem>
              <CommandItem onSelect={run(() => navigate("projects"))}>
                <Code2 className="size-4 text-signal" /> {t("app.projects")}
              </CommandItem>
              <CommandItem onSelect={run(() => navigate("devs"))}>
                <Users className="size-4 text-signal" /> {t("app.devs")}
              </CommandItem>
              <CommandItem onSelect={run(() => navigate("salons"))}>
                <MessageSquare className="size-4 text-signal" /> {t("app.salons")}
              </CommandItem>
              <CommandItem onSelect={run(() => navigate("challenges"))}>
                <Trophy className="size-4 text-signal" /> {t("app.challenges")}
              </CommandItem>
              <CommandItem onSelect={run(() => navigate("missions"))}>
                <BadgeDollarSign className="size-4 text-signal" /> {t("app.missions")}
              </CommandItem>
              <CommandItem onSelect={run(() => useNora.getState().openMyProfile())}>
                <User className="size-4 text-signal" /> {t("app.profile")}
              </CommandItem>
            </>
          )}
        </CommandGroup>

        <CommandSeparator />
        <CommandGroup heading={t("palette.actions")}>
          <CommandItem onSelect={run(() => switchTheme(setTheme, theme))}>
            {theme === "dark" ? <Moon className="size-4 text-signal" /> : <Sun className="size-4 text-flare" />}
            {t("palette.theme")}
          </CommandItem>
          <CommandItem onSelect={run(() => setLang(lang === "fr" ? "en" : "fr"))}>
            <Cpu className="size-4 text-signal" />
            {lang === "fr" ? t("palette.lang") : t("palette.lang.fr")}
          </CommandItem>
          {!authed ? (
            <CommandItem onSelect={run(() => navigate("login"))}>
              <LogIn className="size-4 text-flare" /> {t("auth.login.title")}
            </CommandItem>
          ) : (
            <CommandItem onSelect={run(() => { logout(); navigate("landing"); })}>
              <LogOut className="size-4 text-flare" /> {t("palette.logout")}
            </CommandItem>
          )}
        </CommandGroup>
      </CommandList>
      <div className="flex items-center justify-between border-t border-line px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>NORA</span>
        <span>enter ↵ · esc</span>
      </div>
    </CommandDialog>
  );
}
