"use client";

/* ============================================================
   NORA — Vues « Messagerie » (v2) et « Challenges »
   · Messagerie : deux panneaux (discussions / conversation),
     agent NORA IA en tête de liste avec code + copie,
     demandes de contact AVEC VALIDATION (entrant et sortant),
     indicateur « écrit… », réponses simulées en direct.
   · Challenges : défis du jour / de la semaine + classement.
   En démo, l'acceptation et les réponses sont simulées côté
   client (store) — le backend Go branchera ses WebSockets ici.
   ============================================================ */

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Check, CheckCheck, Copy, Hash, MessageSquare, Mic, Search,
  Send, Sparkles, TrendingDown, TrendingUp, Trophy, Users, X, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNora, devByUsername } from "@/lib/store";
import { useLang } from "@/lib/i18n";
import { NoraAvatar, fmt, CrownIcon } from "../shared";
import { ViewHeader } from "../shell";
import { EASE, Reveal } from "../fx/reveal";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/lib/types";

/* ============================================================
   Bloc de code : fond nuit violette, copie en un clic
   ============================================================ */
function CodeBlock({ code }: { code: NonNullable<ChatMessage["code"]> }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  return (
    <div className="mt-2 overflow-hidden rounded-lg border border-line bg-[#0d0a18]">
      <div className="flex items-center justify-between border-b border-line/70 px-3 py-1.5">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground">{code.lang}</span>
        <button
          onClick={() => {
            navigator.clipboard?.writeText(code.snippet).catch(() => {});
            setCopied(true);
            toast.success(t("misc.save") === "Save" ? "Copied ✓" : "Copié ✓");
            setTimeout(() => setCopied(false), 1600);
          }}
          className="flex cursor-pointer items-center gap-1.5 rounded px-1.5 py-0.5 font-mono text-[9.5px] text-muted-foreground transition-colors hover:text-cyan-neon"
        >
          {copied ? <Check className="size-3 text-signal" /> : <Copy className="size-3" />}
          {copied ? "✓" : "copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-3.5 py-2.5 font-mono text-[11.5px] leading-[1.75] text-[#d9d4ee]">
        <code>{code.snippet}</code>
      </pre>
    </div>
  );
}

/* ============================================================
   Bulle de message (moi / correspondant / système)
   ============================================================ */
function Bubble({ m, mine }: { m: ChatMessage; mine: boolean }) {
  if (m.kind === "system") {
    return (
      <p className="mx-auto max-w-[520px] rounded-lg border border-flare/25 bg-flare/8 px-3.5 py-2 text-center font-mono text-[10.5px] leading-relaxed text-flare-bright">
        {m.content}
      </p>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={cn("flex w-full", mine ? "justify-end" : "justify-start")}
    >
      <div className={cn("max-w-[78%] sm:max-w-[68%]", mine ? "items-end" : "items-start")}>
        <div
          className={cn(
            "rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed",
            mine
              ? "rounded-br-md bg-flare text-flare-foreground"
              : "rounded-bl-md border border-line bg-surface text-foreground",
          )}
        >
          {m.kind === "code" && m.code ? (
            <span className="block text-white">{m.content}</span>
          ) : (
            m.content
          )}
        </div>
        {m.kind === "code" && m.code && (
          <CodeBlock code={m.code} />
        )}
        <p className={cn("mt-1 flex items-center gap-1 font-mono text-[9px] text-muted-foreground/70", mine ? "justify-end" : "justify-start")}>
          {m.time}
          {mine && <CheckCheck className="size-3" />}
        </p>
      </div>
    </motion.div>
  );
}

/* ============================================================
   MESSAGERIE
   ============================================================ */
export function SalonsView() {
  const { t, lang } = useLang();
  const {
    dmRequests, dmThreads, activeDm, openDm, sendDm,
    incomingRequest, acceptRequest, declineRequest, requestContact, viewProfile,
    selectChannel, channelMessages, sendChannelMessage, me,
  } = useNora();
  const devs = useNora((s) => s.devs);
  const channels = useNora((s) => s.channels);
  const meUsername = me?.username ?? "";
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [pickOpen, setPickOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
  const [channelDraft, setChannelDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const channelScrollRef = useRef<HTMLDivElement>(null);

  const accepted = useMemo(
    () =>
      Object.entries(dmRequests)
        .filter(([, v]) => v === "accepted")
        .map(([u]) => u),
    [dmRequests],
  );
  const pending = useMemo(
    () => Object.entries(dmRequests).filter(([, v]) => v === "pending").map(([u]) => u),
    [dmRequests],
  );
  const notContacted = useMemo(
    () => devs.filter((d) => d.username !== meUsername && !dmRequests[d.username]),
    [devs, dmRequests, meUsername],
  );

  const filtered = (u: string) => {
    const d = devByUsername(u);
    return (d?.name ?? u).toLowerCase().includes(query.toLowerCase());
  };

  /* auto-scroll en bas à chaque nouveau message */
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [dmThreads, activeDm, sending]);

  const activeDev = activeDm && activeDm !== "nora" ? devByUsername(activeDm) : null;
  const messages = activeDm ? dmThreads[activeDm] ?? [] : [];

  /* regroupe par jour (en démo tout est « Aujourd'hui ») */
  const groups: { day: string; items: ChatMessage[] }[] = [];
  for (const m of messages) {
    const day = m.day ?? t("msg.today");
    const last = groups[groups.length - 1];
    if (last && last.day === day) last.items.push(m);
    else groups.push({ day, items: [m] });
  }

  const send = async () => {
    if (!draft.trim() || !activeDm || sending) return;
    setSending(true);
    try {
      await sendDm(activeDm, draft);
      setDraft("");
    } catch {
      toast.error(t("msg.requestNeeded"));
    } finally {
      setSending(false);
    }
  };

  /* ----- panneau conversation (droite) ----- */
  const conversation = activeDm ? (
    <div className="flex h-full min-h-0 flex-col">
      {/* en-tête */}
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <button
          onClick={() => openDm(null)}
          className="grid size-8 cursor-pointer place-items-center rounded-lg text-muted-foreground hover:bg-surface-2 lg:hidden"
          aria-label="←"
        >
          <ArrowLeft className="size-4" />
        </button>
        {activeDm === "nora" ? (
          <>
            <span className="relative grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-flare to-cyan-neon text-white">
              <Sparkles className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[13.5px] font-semibold">{t("msg.nora.t")}</p>
              <p className="truncate font-mono text-[10px] text-signal">{t("msg.nora.d")}</p>
            </div>
          </>
        ) : activeDev ? (
          <>
            <button onClick={() => viewProfile(activeDev.username)} className="cursor-pointer">
              <NoraAvatar name={activeDev.name} gradient={activeDev.gradient} size={38} online={activeDev.online} />
            </button>
            <button onClick={() => viewProfile(activeDev.username)} className="min-w-0 cursor-pointer text-left">
              <p className="truncate text-[13.5px] font-semibold hover:underline">{activeDev.name}</p>
              <p className="truncate font-mono text-[10px] text-muted-foreground">
                {activeDev.online ? t("devs.online") : t("devs.offline")} · {activeDev.city}
              </p>
            </button>
          </>
        ) : null}
      </div>

      {/* messages */}
      <div ref={scrollRef} className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-5">
        {/* suggestions NORA */}
        {activeDm === "nora" && messages.length === 0 && (
          <div className="mx-auto max-w-[420px] space-y-3 pt-4 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-flare to-cyan-neon text-white shadow-[0_10px_36px_-8px_var(--glow-flare)]">
              <Sparkles className="size-5" />
            </span>
            <p className="font-display text-[15px] font-semibold">{t("msg.nora.t")} — {t("msg.nora.d")}</p>
            <div className="flex flex-col gap-2 pt-2">
              {[t("msg.nora.sug1"), t("msg.nora.sug2"), t("msg.nora.sug3")].map((s) => (
                <button
                  key={s}
                  onClick={() => sendDm("nora", s)}
                  className="cursor-pointer rounded-xl border border-line bg-surface px-3.5 py-2.5 text-left text-[12.5px] text-muted-foreground transition-colors hover:border-flare/40 hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {groups.map((g) => (
          <div key={g.day} className="space-y-3.5">
            <p className="text-center font-mono text-[9.5px] uppercase tracking-[0.2em] text-muted-foreground/60">
              — {g.day} —
            </p>
            {g.items.map((m) => (
              <Bubble key={m.id} m={m} mine={m.author === meUsername} />
            ))}
          </div>
        ))}

        {/* indicateur d'envoi en cours */}
        <AnimatePresence>
          {sending && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2.5"
            >
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-line bg-surface px-3.5 py-3">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="size-1.5 animate-pulse-dot rounded-full bg-flare"
                    style={{ animationDelay: `${i * 0.18}s` }}
                  />
                ))}
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">{t("msg.sending")}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* saisie */}
      <form
        onSubmit={(e) => { e.preventDefault(); send(); }}
        className="flex items-center gap-2 border-t border-line p-3"
      >
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={t("msg.placeholder")}
          className="h-11 rounded-xl border-line bg-surface text-[13px]"
        />
        <Button
          type="submit"
          disabled={!draft.trim()}
          className="flare-cta grid size-11 shrink-0 place-items-center rounded-xl p-0 text-flare-foreground"
          aria-label={t("msg.send")}
        >
          <Send className="size-4" />
        </Button>
      </form>
    </div>
  ) : (
    /* état vide */
    <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
      <span className="grid size-14 place-items-center rounded-2xl border border-line bg-surface text-muted-foreground">
        <MessageSquare className="size-5" />
      </span>
      <p className="max-w-[260px] text-[13px] text-muted-foreground">{t("msg.empty")}</p>
    </div>
  );

  /* ----- panneau liste (gauche) ----- */
  const list = (
    <div className="flex h-full min-h-0 flex-col">
      <div className="space-y-2.5 border-b border-line p-3.5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/60" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("msg.search")}
            className="h-9 rounded-lg border-line bg-surface pl-9 text-[12.5px]"
          />
        </div>
        {/* nouveau message : choisir un dev à contacter */}
        <div className="relative">
          <Button
            onClick={() => setPickOpen((v) => !v)}
            variant="outline"
            className="h-9 w-full gap-2 rounded-lg border-line bg-surface font-mono text-[11.5px] hover:border-flare/40"
          >
            {pickOpen ? <X className="size-3.5" /> : <MessageSquare className="size-3.5 text-flare" />}
            {t("msg.newChat")}
          </Button>
          <AnimatePresence>
            {pickOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="absolute inset-x-0 top-11 z-20 max-h-[260px] space-y-0.5 overflow-y-auto rounded-xl border border-line bg-popover p-1.5 shadow-2xl"
              >
                {notContacted.slice(0, 8).map((d) => (
                  <button
                    key={d.username}
                    onClick={() => {
                      requestContact(d.username);
                      toast.success(t("msg.requestSentToast"));
                      setPickOpen(false);
                    }}
                    className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-surface-2"
                  >
                    <NoraAvatar name={d.name} gradient={d.gradient} size={28} online={d.online} />
                    <span className="min-w-0">
                      <span className="block truncate text-[12.5px] font-medium">{d.name}</span>
                      <span className="block truncate font-mono text-[10px] text-muted-foreground">{d.role}</span>
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* demande ENTRANTE : validation */}
      {incomingRequest && (
        <div className="border-b border-line p-3.5">
          <div className="card-halo rounded-xl border border-flare/40 bg-flare/8 p-3.5">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-flare">{t("msg.request.t")}</p>
            {(() => {
              const d = devByUsername(incomingRequest);
              return d ? (
                <div className="mt-2.5 flex items-center gap-2.5">
                  <NoraAvatar name={d.name} gradient={d.gradient} size={34} online={d.online} />
                  <div className="min-w-0">
                    <p className="truncate text-[12.5px] font-semibold">{d.name}</p>
                    <p className="truncate font-mono text-[10px] text-muted-foreground">{d.role} · {d.city}</p>
                  </div>
                </div>
              ) : null;
            })()}
            <p className="mt-2 text-[11.5px] leading-snug text-muted-foreground">
              <span className="font-medium text-foreground">{devByUsername(incomingRequest)?.name}</span> {t("msg.request.d")}
            </p>
            <div className="mt-3 flex gap-2">
              <Button
                onClick={() => { acceptRequest(incomingRequest); toast.success(`${devByUsername(incomingRequest)?.name} — ${t("msg.acceptedToast")}`); }}
                className="flare-cta h-8 flex-1 gap-1.5 rounded-lg text-[12px] font-semibold text-flare-foreground"
              >
                <Check className="size-3.5" /> {t("msg.accept")}
              </Button>
              <Button
                onClick={() => { declineRequest(incomingRequest); }}
                variant="outline"
                className="h-8 flex-1 rounded-lg border-line bg-transparent text-[12px] text-muted-foreground hover:text-foreground"
              >
                {t("msg.decline")}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        <p className="px-2.5 pb-1.5 pt-2 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground/60">
          {t("msg.discussions")}
        </p>

        {/* NORA — épinglée en tête */}
        {"nora".includes(query.toLowerCase()) ? (
          <button
            onClick={() => openDm("nora")}
            className={cn(
              "group flex w-full cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition-colors",
              activeDm === "nora" ? "bg-flare/10" : "hover:bg-surface-2",
            )}
          >
            <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-flare to-cyan-neon text-white">
              <Sparkles className="size-4" />
              <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-card bg-signal" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline justify-between gap-2">
                <span className="truncate text-[13px] font-semibold text-foreground">{t("msg.nora.t")}</span>
              </span>
              <span className="block truncate font-mono text-[10.5px] text-muted-foreground">{t("msg.nora.d")}</span>
            </span>
          </button>
        ) : null}

        {/* conversations acceptées */}
        {accepted.filter(filtered).map((u) => {
          const d = devByUsername(u);
          if (!d) return null;
          const thread = dmThreads[u] ?? [];
          const last = thread[thread.length - 1];
          const on = activeDm === u;
          return (
            <button
              key={u}
              onClick={() => openDm(u)}
              className={cn(
                "flex w-full cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition-colors",
                on ? "bg-flare/10" : "hover:bg-surface-2",
              )}
            >
              <NoraAvatar name={d.name} gradient={d.gradient} size={40} online={d.online} />
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-[13px] font-semibold text-foreground">{d.name}</span>
                  <span className="shrink-0 font-mono text-[9px] text-muted-foreground/70">{last?.time}</span>
                </span>
                <span className={cn("block truncate font-mono text-[10.5px]", on ? "text-flare-bright" : "text-muted-foreground")}>
                  {last ? last.content : "…"}
                </span>
              </span>
            </button>
          );
        })}

        {/* demandes sortantes en attente */}
        {pending.filter(filtered).map((u) => {
          const d = devByUsername(u);
          if (!d) return null;
          return (
            <div key={u} className="flex items-center gap-3 rounded-xl px-2.5 py-2.5 opacity-70">
              <NoraAvatar name={d.name} gradient={d.gradient} size={40} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-medium text-muted-foreground">{d.name}</span>
                <span className="flex items-center gap-1.5 font-mono text-[10px] text-gold">
                  <span className="size-1.5 animate-pulse-dot rounded-full bg-gold" /> {t("msg.pending")}
                </span>
              </span>
            </div>
          );
        })}

        {/* canaux thématiques */}
        <p className="px-2.5 pb-1.5 pt-4 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground/60">
          {t("msg.channels")}
        </p>
        {channels.map((c) => {
          const on = activeChannel === c.id;
          return (
            <button
              key={c.id}
              onClick={() => { setActiveChannel(c.id); selectChannel(c.id); }}
              className={cn(
                "flex w-full cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors",
                on ? "bg-flare/10" : "hover:bg-surface-2",
              )}
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-surface-2 text-muted-foreground">
                {c.kind === "voice" ? <Mic className="size-3.5" /> : <Hash className="size-3.5" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12.5px] text-foreground">#{c.name}</span>
                <span className="block truncate font-mono text-[9.5px] text-muted-foreground/70">
                  {fmt(c.members)} {t("msg.discussions") === "Chats" ? "members" : "membres"}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl">
      <ViewHeader kicker={t("app.salons")} title={t("msg.title")} sub={t("msg.sub")} />

      {/* carte de demande entrante visible aussi en haut sur mobile */}
      <div className="grid gap-3.5 overflow-hidden rounded-2xl border border-line bg-surface lg:grid-cols-[320px_1fr] lg:gap-0">
        {/* mobile : liste OU conversation ; desktop : les deux */}
        <div className={cn("h-[560px] lg:h-[600px] lg:border-r lg:border-line", activeDm && "hidden lg:block")}>
          {list}
        </div>
        <div className={cn("h-[560px] lg:h-[600px]", !activeDm && "hidden lg:block")}>
          {conversation}
        </div>
      </div>

      <Reveal className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-center font-mono text-[10px] text-muted-foreground/60">
        <span className="inline-flex items-center gap-1.5"><Check className="size-3 text-signal" /> {lang === "fr" ? "Contacts validés par les deux devs" : "Contacts validated by both devs"}</span>
        <span className="inline-flex items-center gap-1.5"><Sparkles className="size-3 text-flare" /> NORA IA</span>
        <span className="inline-flex items-center gap-1.5"><Hash className="size-3" /> {channels.length} {lang === "fr" ? "canaux" : "channels"}</span>
      </Reveal>

      {/* ----- salon public ouvert ----- */}
      {activeChannel && (() => {
        const ch = channels.find((c) => c.id === activeChannel);
        if (!ch) return null;
        return (
          <Reveal className="mt-4 overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="flex items-center gap-2.5 border-b border-line px-4 py-3">
              <Hash className="size-4 text-flare" />
              <p className="text-[13.5px] font-semibold">#{ch.name}</p>
              <p className="truncate font-mono text-[10px] text-muted-foreground">{ch.topic}</p>
              <button
                onClick={() => setActiveChannel(null)}
                className="ml-auto cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
                aria-label="×"
              >
                <X className="size-4" />
              </button>
            </div>
            <div
              ref={(el) => {
                channelScrollRef.current = el;
                if (el) requestAnimationFrame(() => el.scrollTo({ top: el.scrollHeight }));
              }}
              className="h-[300px] space-y-4 overflow-y-auto px-4 py-4"
            >
              {channelMessages.length === 0 && (
                <p className="pt-8 text-center font-mono text-[10.5px] text-muted-foreground/60">
                  {lang === "fr" ? "Aucun message pour l'instant — lancez la discussion." : "No messages yet — start the conversation."}
                </p>
              )}
              {channelMessages.map((m) => (
                <div key={m.id} className={cn("flex w-full", m.author === meUsername ? "justify-end" : "justify-start")}>
                  <div className="max-w-[76%]">
                    {m.author !== meUsername && (
                      <p className="mb-0.5 font-mono text-[9.5px] text-signal">@{m.author}</p>
                    )}
                    <div
                      className={cn(
                        "rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed",
                        m.author === meUsername
                          ? "rounded-br-md bg-flare text-flare-foreground"
                          : "rounded-bl-md border border-line bg-surface-2 text-foreground",
                      )}
                    >
                      {m.content}
                    </div>
                    {m.kind === "code" && m.code && <CodeBlock code={m.code} />}
                    <p className={cn("mt-1 font-mono text-[9px] text-muted-foreground/70", m.author === meUsername ? "text-right" : "")}>{m.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!channelDraft.trim()) return;
                try {
                  await sendChannelMessage(activeChannel, channelDraft);
                  setChannelDraft("");
                } catch {
                  toast.error(t("msg.requestNeeded"));
                }
              }}
              className="flex items-center gap-2 border-t border-line p-3"
            >
              <Input
                value={channelDraft}
                onChange={(e) => setChannelDraft(e.target.value)}
                placeholder={t("msg.placeholder")}
                className="h-11 rounded-xl border-line bg-surface text-[13px]"
              />
              <Button type="submit" disabled={!channelDraft.trim()} className="flare-cta grid size-11 shrink-0 place-items-center rounded-xl p-0 text-flare-foreground" aria-label={t("msg.send")}>
                <Send className="size-4" />
              </Button>
            </form>
          </Reveal>
        );
      })()}
    </div>
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
  const { viewProfile } = useNora();
  const challenges = useNora((s) => s.challenges);
  const devs = useNora((s) => s.devs);
  const meUsername = useNora((s) => s.me?.username ?? "");
  const [joined, setJoined] = useState<Record<string, boolean>>({});

  /* classement réel : réputation des devs de la plateforme */
  const board = [...devs].sort((a, b) => b.reputation - a.reputation).slice(0, 8);
  const rankOf = (username: string) => board.findIndex((d) => d.username === username) + 1;

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
            <Trophy className="size-4 text-gold" /> {t("chal.board")}
          </h2>
          <div className="mt-4 space-y-1.5">
            {board.map((d) => {
              const rank = rankOf(d.username);
              const mine = d.username === meUsername;
              return (
                <button
                  key={d.username}
                  onClick={() => !mine && viewProfile(d.username)}
                  className={cn(
                    "flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 font-mono text-[11.5px] transition-colors",
                    mine ? "bg-flare/10 text-flare" : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
                  )}
                >
                  <span className={cn("grid size-5 shrink-0 place-items-center rounded text-[10px]", rank === 1 ? "bg-gold text-white" : "bg-surface-2")}>
                    {rank}
                  </span>
                  {rank === 1 && <CrownIcon />}
                  <span className={cn("truncate", mine || rank === 1 ? "font-semibold" : "text-foreground")}>
                    {d.username}{mine && ` (${t("chal.you")})`}
                  </span>
                  <span className="ml-auto flex items-center gap-2 tabular-nums">
                    <span className="text-signal">{fmt(d.reputation)}</span>
                    <span className="text-muted-foreground/70">★</span>
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
