"use client";

/* ============================================================
   NORA — Vue « Fil d'actualité »
   Composer, filtres par type, cartes de posts (code, projet,
   article, milestone), like/follow optimistes.
   ============================================================ */

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2, FileText, GitBranch, Heart, MessageCircle, Rocket, Share2, Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNora } from "@/lib/store";
import { useLang } from "@/lib/i18n";
import { posts as seedPosts, devByUsername } from "@/lib/data";
import { NoraAvatar } from "../shared";
import { ViewHeader } from "../shell";
import { EASE } from "../fx/reveal";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/types";

const typeIcon: Record<string, React.ReactNode> = {
  code: <Code2 className="size-3" />,
  project: <GitBranch className="size-3" />,
  article: <FileText className="size-3" />,
  challenge: <Trophy className="size-3" />,
  milestone: <Rocket className="size-3" />,
  text: <MessageCircle className="size-3" />,
};

export function FeedView() {
  const { t, lang } = useLang();
  const { viewProfile, followOverrides, toggleFollow, likeOverrides, toggleLike } = useNora();
  const [tab, setTab] = useState<string>("all");
  const [draft, setDraft] = useState("");
  const [extra, setExtra] = useState<Post[]>([]);
  const me = devByUsername("theoah")!;

  const all = [...extra, ...seedPosts].filter((p) => (tab === "all" ? true : p.type === tab));
  const tabs = ["all", "projects", "code", "articles"];

  const publish = () => {
    if (!draft.trim()) return;
    setExtra((prev) => [{
      id: `local-${Date.now()}`,
      author: me.username,
      time: lang === "fr" ? "à l'instant" : "just now",
      type: "text",
      content: draft.trim(),
      tags: [],
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
    }, ...prev]);
    setDraft("");
    toast.success(lang === "fr" ? "Publié dans le fil" : "Posted to the feed");
  };

  return (
    <div className="mx-auto max-w-3xl">
      <ViewHeader kicker={t("app.feed")} title={t("app.feed")} />

      {/* composer */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3.5"
      >
        <NoraAvatar name={me.name} gradient={me.gradient} size={38} />
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && publish()}
          placeholder={t("feed.compose")}
          className="h-10 rounded-lg border-line bg-surface-2 text-[13px]"
        />
        <Button onClick={publish} className="h-10 shrink-0 rounded-lg bg-flare px-4 text-[13px] font-semibold text-flare-foreground hover:bg-flare/90">
          {t("feed.post")}
        </Button>
      </motion.div>

      {/* onglets */}
      <div className="mt-4 flex gap-1.5">
        {tabs.map((id) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={cn(
              "rounded-lg px-3.5 py-1.5 font-mono text-[11px] transition-colors duration-300",
              tab === id ? "bg-signal-muted/15 text-signal" : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
            )}
          >
            {t(`feed.${id === "all" ? "all" : id === "articles" ? "articles" : id}`)}
          </button>
        ))}
      </div>

      {/* posts */}
      <div className="mt-4 space-y-3.5 pb-4">
        {all.map((p, i) => {
          const author = devByUsername(p.author) ?? me;
          const liked = likeOverrides[p.id] ?? p.liked;
          const followed = followOverrides[p.author] ?? author.following;
          return (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.3), ease: EASE }}
              className="hover-spot rounded-xl border border-line bg-surface p-4.5 sm:p-5"
            >
              <div className="flex items-center gap-3">
                <button onClick={() => viewProfile(author.username)} className="cursor-pointer">
                  <NoraAvatar name={author.name} gradient={author.gradient} size={40} online={author.online} />
                </button>
                <div className="min-w-0 flex-1">
                  <button onClick={() => viewProfile(author.username)} className="cursor-pointer text-[13.5px] font-semibold text-foreground hover:underline">
                    {author.name}
                  </button>
                  <span className="ml-1.5 font-mono text-[11px] text-muted-foreground">@{author.username} · {p.time}</span>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-wider text-muted-foreground">
                  {typeIcon[p.type]} {t(`feed.${p.type === "milestone" ? "projects" : p.type === "challenge" ? "code" : p.type}`)}
                </span>
                {p.author !== me.username && (
                  <Button
                    size="sm"
                    variant={followed ? "outline" : "default"}
                    onClick={() => toggleFollow(p.author)}
                    className={cn(
                      "h-8 rounded-md px-3 font-mono text-[10.5px]",
                      followed ? "border-signal-muted/50 bg-transparent text-signal" : "bg-flare text-flare-foreground hover:bg-flare/90",
                    )}
                  >
                    {followed ? t("feed.following") : t("feed.follow")}
                  </Button>
                )}
              </div>

              <p className="mt-3.5 whitespace-pre-line text-[14px] leading-relaxed text-foreground">{p.content}</p>

              {p.code && (
                <div className="mt-3.5 overflow-hidden rounded-lg border border-line bg-[#0d120c] font-mono text-[11.5px] leading-[1.8] dark:bg-[#0d120c]">
                  <div className="border-b border-line px-3 py-1.5 text-[10px] text-muted-foreground">{p.code.title}</div>
                  <pre className="overflow-x-auto px-3 py-2.5 text-signal/90">{p.code.snippet}</pre>
                </div>
              )}

              {p.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[11px] text-signal/80">#{tag}</span>
                  ))}
                </div>
              )}

              <div className="mt-4 flex items-center gap-1 border-t border-line pt-3">
                {[
                  { icon: Heart, label: t("feed.like"), count: p.likes + (liked ? 1 : 0), active: liked, onClick: () => toggleLike(p.id) },
                  { icon: MessageCircle, label: t("feed.comment"), count: p.comments, onClick: () => toast(lang === "fr" ? "Commentaires — démo" : "Comments — demo") },
                  { icon: Share2, label: t("feed.share"), count: p.shares, onClick: () => toast(lang === "fr" ? "Lien copié" : "Link copied") },
                ].map((a) => (
                  <button
                    key={a.label}
                    onClick={a.onClick}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-1.5 text-[12px] transition-colors duration-300 hover:bg-surface-2",
                      a.active ? "text-flare" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <a.icon className={cn("size-3.5", a.active && "fill-current")} />
                    {a.count > 0 && <span className="tabular-nums">{a.count}</span>}
                  </button>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
