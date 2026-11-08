"use client";

/* ============================================================
   NORA — Vues « Salons » (temps réel simulé) et « Challenges »
   · Salons : liste de canaux, messages groupés par jour, code,
     réactions, envoi + réponse simulée, générateur d'espace
     hackathon (salon + dépôt + environnement).
   · Challenges : défis du jour / de la semaine + classement.
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Hash, Mic, Send, Sparkles, TrendingDown, TrendingUp, Trophy, Users, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNora } from "@/lib/store";
import { useLang } from "@/lib/i18n";
import {
  channels as seedChannels, chatMessages as seedMessages, challenges, leaderboard,
  devByUsername, devs, CURRENT_USER,
} from "@/lib/data";
import { NoraAvatar, fmt, CrownIcon } from "../shared";
import { ViewHeader } from "../shell";
import { EASE } from "../fx/reveal";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/lib/types";

/* =========================== SALONS =========================== */

export function SalonsView() {
  const { t, lang } = useLang();
  const { viewProfile } = useNora();
  const [activeId, setActiveId] = useState(seedChannels[0].id);
  const [messages, setMessages] = useState<ChatMessage[]>(seedMessages);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState<string | null>(null);
  const [workspace, setWorkspace] = useState<"idle" | "building" | "done">("idle");
  const bottomRef = useRef<HTMLDivElement>(null);

  const active = seedChannels.find((c) => c.id === activeId)!;
  const visible = messages;
  const others = devs.filter((d) => d.username !== CURRENT_USER);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typing]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const mine: ChatMessage = {
      id: `m-${Date.now()}`, author: CURRENT_USER, time: "maintenant", content: text,
    };
    setMessages((prev) => [...prev, mine]);
    setDraft("");

    // réponse simulée : le salon reste vivant
    const replier = others[Math.floor(Math.random() * others.length)];
    setTimeout(() => setTyping(replier.username), 700);
    setTimeout(() => {
      setTyping(null);
      const replies = lang === "fr"
        ? ["Bonne idée — je push ça sur la branche `feat/ux`.", "Je review ça ce soir après le daily.", "+1, et on l'ajoute au board du hackathon ?", "Regarde le diff que l'agent IA a proposé, c'est carrément ça."]
        : ["Good idea — pushing to `feat/ux`.", "Reviewing tonight after standup.", "+1, add it to the hackathon board?", "Check the diff the AI agent proposed — exactly that."];
      setMessages((prev) => [...prev, {
        id: `m-${Date.now() + 1}`, author: replier.username, time: "maintenant",
        content: replies[Math.floor(Math.random() * replies.length)],
      }]);
    }, 1900);
  };

  const buildWorkspace = () => {
    setWorkspace("building");
    setTimeout(() => {
      setWorkspace("done");
      toast.success(t("salons.workspace.created"));
    }, 1100);
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-3.5 lg:grid-cols-[260px_1fr]">
      {/* liste des canaux */}
      <aside className="rounded-xl border border-line bg-surface p-3">
        <ViewHeaderKicker label={t("app.salons")} />
        <div className="space-y-1">
          {seedChannels.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left transition-colors duration-300",
                activeId === c.id ? "bg-signal-muted/15 text-signal" : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
              )}
            >
              {c.kind === "voice" ? <Mic className="size-3.5 shrink-0" /> : <Hash className="size-3.5 shrink-0" />}
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-medium">{c.name}</span>
                <span className="block truncate font-mono text-[9.5px] text-muted-foreground">{c.members} {t("salons.members")}</span>
              </span>
              {c.unread ? (
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-flare font-mono text-[9.5px] text-flare-foreground">{c.unread}</span>
              ) : null}
            </button>
          ))}
        </div>

        {/* générateur d'espace hackathon */}
        <div className="mt-4 rounded-xl border border-flare/30 bg-flare/5 p-3.5">
          <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-flare">
            <Zap className="size-3" /> {t("salons.workspace.t")}
          </p>
          <p className="mt-1.5 text-[11.5px] leading-snug text-muted-foreground">{t("salons.workspace.d")}</p>
          <Button
            onClick={buildWorkspace}
            disabled={workspace !== "idle"}
            className={cn(
              "mt-3 h-8.5 w-full gap-2 rounded-lg font-mono text-[11px]",
              workspace === "done"
                ? "border border-signal-muted/60 bg-transparent text-signal"
                : "flare-cta text-flare-foreground",
            )}
          >
            {workspace === "building" && <span className="size-3.5 animate-spin rounded-full border-2 border-flare-foreground/40 border-t-flare-foreground" />}
            {workspace === "idle" && t("salons.workspace.cta")}
            {workspace === "building" && "…"}
            {workspace === "done" && `✓ ${t("salons.workspace.created")}`}
          </Button>
          <AnimatePresence>
            {workspace === "done" && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-2.5 space-y-1 overflow-hidden font-mono text-[10px] text-signal"
              >
                <li>✔ #hackathon-nuit</li>
                <li>✔ git.nora/mon-equipe</li>
                <li>✔ env ubuntu-go-py</li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </aside>

      {/* chat */}
      <section className="flex min-h-[70svh] flex-col overflow-hidden rounded-xl border border-line bg-surface">
        <header className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-line px-4 py-3">
          <h2 className="flex items-center gap-2 font-display text-[15px] font-semibold">
            <Hash className="size-4 text-signal" />{active.name}
          </h2>
          <p className="hidden truncate font-mono text-[11px] text-muted-foreground sm:block">{active.topic}</p>
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[10.5px] text-signal">
            <span className="size-1.5 animate-pulse-dot rounded-full bg-signal" />
            {active.members} {t("salons.online")}
          </span>
        </header>

        {/* messages */}
        <div className="flex-1 space-y-1 overflow-y-auto px-4 py-4 max-h-[58svh] min-h-[320px]">
          {visible.map((m, i) => {
            const d = devByUsername(m.author);
            const mine = m.author === CURRENT_USER;
            const prevSame = i > 0 && visible[i - 1].author === m.author;
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className={cn("flex gap-3", mine && "flex-row-reverse")}
              >
                {prevSame ? <span className="w-8 shrink-0" /> : (
                  <button onClick={() => viewProfile(m.author)} className="mt-0.5 shrink-0 cursor-pointer">
                    <NoraAvatar name={d?.name ?? m.author} gradient={d?.gradient ?? ["#1f7a45", "#3dff8b"]} size={32} />
                  </button>
                )}
                <div className={cn("max-w-[78%]", mine && "text-right")}>
                  {!prevSame && (
                    <p className={cn("mb-1 flex items-baseline gap-2 font-mono text-[10.5px]", mine && "justify-end")}>
                      <span className="text-foreground">{d?.name ?? m.author}</span>
                      <span className="text-muted-foreground/70">{m.time}</span>
                    </p>
                  )}
                  <div className={cn(
                    "inline-block rounded-xl px-3.5 py-2 text-left text-[13.5px] leading-relaxed",
                    mine ? "rounded-br-sm bg-signal-muted/25 text-foreground" : "rounded-bl-sm bg-surface-2 text-foreground",
                    m.kind === "system" && "w-full bg-transparent px-0 text-center font-mono text-[10.5px] text-muted-foreground",
                  )}>
                    {m.kind === "code" && m.code ? (
                      <pre className="overflow-x-auto rounded-lg bg-[#0d120c] p-3 font-mono text-[11px] text-signal/90">{m.code.snippet}</pre>
                    ) : m.content}
                  </div>
                  {m.reactions && m.reactions.length > 0 && (
                    <div className={cn("mt-1 flex gap-1.5", mine && "justify-end")}>
                      {m.reactions.map((r) => (
                        <span key={r.emoji} className="flex items-center gap-1 rounded-full border border-line bg-surface px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                          {r.emoji} {r.count}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* indicateur de frappe */}
          <AnimatePresence>
            {typing && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2.5 pl-11 font-mono text-[11px] text-signal"
              >
                <span className="flex gap-1">
                  <span className="size-1.5 animate-pulse-dot rounded-full bg-signal" />
                  <span className="size-1.5 animate-pulse-dot rounded-full bg-signal [animation-delay:0.2s]" />
                  <span className="size-1.5 animate-pulse-dot rounded-full bg-signal [animation-delay:0.4s]" />
                </span>
                {devByUsername(typing)?.name} {t("salons.typing")}
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* saisie */}
        <div className="border-t border-line p-3.5">
          <div className="flex items-center gap-2.5">
            <NoraAvatar name={devByUsername(CURRENT_USER)!.name} gradient={devByUsername(CURRENT_USER)!.gradient} size={32} />
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={t("salons.send")}
              className="h-10 flex-1 rounded-lg border-line bg-surface-2 text-[13px]"
            />
            <Button
              onClick={send}
              className="grid size-10 shrink-0 place-items-center rounded-lg bg-flare p-0 text-flare-foreground hover:bg-flare/90"
              aria-label={t("salons.send")}
            >
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ViewHeaderKicker({ label }: { label: string }) {
  return (
    <p className="mb-2 px-1 font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
      <span className="mr-2 text-flare">{"//"}</span>{label}
    </p>
  );
}

/* =========================== CHALLENGES =========================== */

const diffStyle: Record<string, string> = {
  Facile: "bg-signal-muted/15 text-signal",
  Moyen: "bg-flare/15 text-flare",
  Difficile: "bg-flare/20 text-flare",
  Expert: "bg-flare/25 text-flare",
};

export function ChallengesView() {
  const { t, lang } = useLang();
  const { navigate } = useNora();
  const [joined, setJoined] = useState<Record<string, boolean>>({});

  return (
    <div className="mx-auto max-w-6xl">
      <ViewHeader kicker={t("app.challenges")} title={t("chal.title")} sub={t("chal.sub")} />

      {/* défis */}
      <div className="grid gap-3.5 md:grid-cols-2 xl:grid-cols-3">
        {challenges.map((c, i) => (
          <motion.article
            key={c.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.3), ease: EASE }}
            className={cn(
              "hover-spot flex flex-col rounded-xl border bg-surface p-5",
              i === 0 ? "border-flare/40 card-halo" : "border-line",
            )}
          >
            <div className="flex items-center gap-2">
              <span className={cn("rounded px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider", diffStyle[c.difficulty])}>
                {t(`chal.difficulty.${c.difficulty}`)}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">{c.language}</span>
              {i === 0 && (
                <span className="ml-auto flex items-center gap-1 font-mono text-[9.5px] uppercase text-flare">
                  <Zap className="size-3" /> {t("chal.daily")}
                </span>
              )}
            </div>
            <h2 className="mt-3 font-display text-[15px] font-semibold leading-snug">{c.title}</h2>
            <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-snug text-muted-foreground">{c.description}</p>
            <div className="mt-3.5 grid grid-cols-3 gap-2 font-mono text-[10.5px]">
              <div>
                <p className="text-muted-foreground">{t("chal.participants")}</p>
                <p className="mt-0.5 tabular-nums text-foreground">{fmt(c.participants)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">{t("chal.successRate")}</p>
                <p className="mt-0.5 tabular-nums text-signal">{c.successRate}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">{t("misc.points")}</p>
                <p className="mt-0.5 tabular-nums text-flare">{c.points}</p>
              </div>
            </div>
            <div className="mt-auto flex items-center justify-between border-t border-line pt-3.5 [margin-top:auto]">
              <span className="font-mono text-[10px] text-muted-foreground">
                {t("chal.by")} <span className="text-signal">{c.by}</span> · {c.endsIn}
              </span>
              <Button
                size="sm"
                onClick={() => {
                  setJoined((p) => ({ ...p, [c.id]: !p[c.id] }));
                  if (!joined[c.id]) toast.success(lang === "fr" ? "Éditeur ouvert — bon courage ⚡" : "Editor open — good luck ⚡");
                }}
                className={cn(
                  "h-8 rounded-md px-3 font-mono text-[10.5px]",
                  joined[c.id] ? "border border-signal-muted/60 bg-transparent text-signal" : "bg-flare text-flare-foreground hover:bg-flare/90",
                )}
              >
                {joined[c.id] ? "✓" : t("chal.participate")}
              </Button>
            </div>
          </motion.article>
        ))}

        {/* classement */}
        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          className="rounded-xl border border-line bg-surface p-5 md:col-span-2 xl:col-span-1"
        >
          <h2 className="flex items-center gap-2 font-display text-[15px] font-semibold">
            <Trophy className="size-4 text-flare" /> {t("chal.board")}
          </h2>
          <div className="mt-4 space-y-1.5">
            {leaderboard.map((r) => {
              const me = r.username === CURRENT_USER;
              const d = devByUsername(r.username);
              return (
                <button
                  key={r.username}
                  onClick={() => d && !me && navigate("landing")}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 font-mono text-[11.5px] transition-colors",
                    me ? "bg-flare/10 text-flare" : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
                  )}
                >
                  <span className={cn("grid size-5 shrink-0 place-items-center rounded text-[10px]", r.rank === 1 ? "bg-flare text-flare-foreground" : "bg-surface-2")}>
                    {r.rank}
                  </span>
                  {r.rank === 1 && <CrownIcon />}
                  <span className={cn("truncate", me || r.rank === 1 ? "font-semibold" : "text-foreground")}>
                    {r.username}{me && ` (${t("chal.you")})`}
                  </span>
                  <span className="ml-auto flex items-center gap-2 tabular-nums">
                    <span className="text-signal">{fmt(r.points)}</span>
                    <span className="text-muted-foreground/70">🔥{r.streak}</span>
                    <span className={cn("flex items-center gap-0.5", r.delta >= 0 ? "text-signal" : "text-flare")}>
                      {r.delta >= 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                      {r.delta >= 0 ? `+${r.delta}` : r.delta}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-4 flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground/60">
            <Users className="size-3" /> <Sparkles className="size-3" /> réputation vérifiable
          </p>
        </motion.aside>
      </div>
    </div>
  );
}
