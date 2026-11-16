"use client";

/* ============================================================
   NORA — Section « En direct du réseau » (landing)
   Met en avant le dernier projet publié et le dernier post du
   fil — données réelles de l'API, présentation éditoriale.
   ============================================================ */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, GitBranch, Heart, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNora, devByUsername } from "@/lib/store";
import { useLang } from "@/lib/i18n";
import { Reveal, EASE } from "@/components/nora/fx/reveal";
import { Kicker, NoraAvatar } from "@/components/nora/shared";
import { api } from "@/lib/api-client";
import type { Post, Project } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ActivitySection() {
  const { t } = useLang();
  const { navigate, viewProfile, toggleStar } = useNora();
  const [project, setProject] = useState<Project | null>(null);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const load = () => {
      Promise.all([api.projects(), api.posts()])
        .then(([p, f]) => {
          setProject(p.projects[0] ?? null);
          setPost(f.posts[0] ?? null);
        })
        .catch(() => undefined);
    };
    load();
    /* la section vit : rafraîchie toutes les 30 s */
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, []);

  const author = post ? devByUsername(post.author) : undefined;

  return (
    <section id="activite" className="relative border-t border-line bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
        <Kicker>{t("activity.kicker")}</Kicker>
        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-[640px] font-display text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-[44px]">
            {t("activity.title")}
          </h2>
        </Reveal>

        {/* bandeau défilant : les derniers projets réels de la vitrine */}
        <Reveal delay={0.08}>
          <LiveProjectsStrip />
        </Reveal>

        <div className="mt-10 grid gap-3.5 lg:grid-cols-[1.15fr_1fr]">
          {/* ----- dernier projet ----- */}
          <Reveal delay={0.1}>
            {project ? (
              <article className="hover-spot group relative h-full overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color] duration-500 hover:border-flare/40">
                <div className="relative h-44 overflow-hidden sm:h-52">
                  <img
                    src={project.cover ?? "/images/tech-network.jpg"}
                    alt={project.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0912]/85 via-[#0b0912]/25 to-transparent" />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-flare/40 bg-flare/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-flare-bright backdrop-blur">
                    <GitBranch className="size-3" /> {t("activity.project.badge")}
                  </span>
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-display text-xl font-bold text-white sm:text-2xl">
                        {project.icon} {project.name}
                      </p>
                      <p className="mt-0.5 truncate text-[13px] text-white/70">{project.tagline}</p>
                    </div>
                    <button
                      onClick={() => toggleStar(project.id)}
                      className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 font-mono text-[11px] text-white backdrop-blur transition-colors hover:bg-white/20"
                      aria-label={t("activity.star")}
                    >
                      ★ {project.stars}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 p-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 4).map((s) => (
                      <span key={s} className="rounded bg-surface-2 px-2 py-1 font-mono text-[10px] text-muted-foreground">{s}</span>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("projects")}
                    className="h-8 shrink-0 gap-1.5 rounded-md border-line bg-transparent font-mono text-[11px] hover:border-flare/40"
                  >
                    {t("activity.project.cta")} <ArrowUpRight className="size-3" />
                  </Button>
                </div>
              </article>
            ) : (
              <div className="grid h-full min-h-[280px] place-items-center rounded-2xl border border-dashed border-line text-[12px] text-muted-foreground">
                {t("activity.empty")}
              </div>
            )}
          </Reveal>

          {/* ----- dernier post ----- */}
          <Reveal delay={0.16}>
            {post ? (
              <article className="hover-spot-flare flex h-full flex-col rounded-2xl border border-line bg-surface p-5 sm:p-6">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-signal-muted/40 bg-signal-muted/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-signal">
                  <Sparkles className="size-3" /> {t("activity.post.badge")}
                </span>
                <div className="mt-4 flex items-center gap-3">
                  <button onClick={() => viewProfile(post.author)} className="cursor-pointer">
                    <NoraAvatar
                      name={author?.name ?? post.author}
                      gradient={author?.gradient ?? ["#8b5cf6", "#3b82f6"]}
                      size={42}
                      online={author?.online}
                      avatarUrl={author?.avatarUrl}
                    />
                  </button>
                  <div className="min-w-0">
                    <button
                      onClick={() => viewProfile(post.author)}
                      className="cursor-pointer truncate text-[14px] font-semibold hover:underline"
                    >
                      {author?.name ?? `@${post.author}`}
                    </button>
                    <p className="font-mono text-[10px] text-muted-foreground">
                      @{post.author} · {post.time}
                    </p>
                  </div>
                </div>
                <p className="mt-4 line-clamp-4 flex-1 text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]">
                  {post.content}
                </p>
                {post.code && (
                  <pre className="mt-3 overflow-hidden rounded-lg border border-line bg-[#0d0a18] px-3 py-2 font-mono text-[10.5px] leading-[1.7] text-[#d9d4ee]">
                    <code>{post.code.snippet.slice(0, 140)}</code>
                  </pre>
                )}
                <div className="mt-4 flex items-center gap-4 border-t border-line pt-3.5 font-mono text-[11px] text-muted-foreground">
                  <span className={cn("inline-flex items-center gap-1.5", post.liked && "text-flare-bright")}>
                    <Heart className="size-3.5" /> {post.likes}
                  </span>
                  <span className="inline-flex items-center gap-1.5"><MessageCircle className="size-3.5" /> {post.comments}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("feed")}
                    className="ml-auto h-8 gap-1.5 rounded-md font-mono text-[11px] text-flare-bright hover:bg-flare/10 hover:text-flare-bright"
                  >
                    {t("activity.post.cta")} <ArrowUpRight className="size-3" />
                  </Button>
                </div>
              </article>
            ) : (
              <div className="grid h-full min-h-[280px] place-items-center rounded-2xl border border-dashed border-line text-[12px] text-muted-foreground">
                {t("activity.empty")}
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- bandeau « projets en direct » : marquee des derniers projets réels ---------- */
function LiveProjectsStrip() {
  const { t } = useLang();
  const { navigate } = useNora();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    api.projects()
      .then((r) => setProjects(r.projects.slice(0, 8)))
      .catch(() => undefined);
  }, []);

  if (projects.length === 0) return null;
  const row = [...projects, ...projects];

  return (
    <div className="relative mt-8 overflow-hidden rounded-2xl border border-line bg-background/60 py-3">
      <p className="absolute left-4 top-2 z-[2] inline-flex items-center gap-1.5 rounded-full bg-popover/90 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-signal backdrop-blur">
        <span className="size-1.5 animate-pulse-dot rounded-full bg-signal" />
        {t("activity.strip")}
      </p>
      <div className="mt-4 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
        <div className="animate-marquee flex w-max items-center gap-2.5 px-2.5 [animation-duration:38s] hover:[animation-play-state:paused]">
          {row.map((p, i) => (
            <button
              key={`${p.id}-${i}`}
              onClick={() => navigate("projects")}
              className="group flex shrink-0 cursor-pointer items-center gap-2.5 rounded-xl border border-line bg-surface px-3 py-2 transition-colors hover:border-flare/40"
            >
              {p.cover ? (
                <img src={p.cover} alt="" className="size-8 rounded-lg object-cover" loading="lazy" />
              ) : (
                <span className="grid size-8 place-items-center rounded-lg bg-surface-2 text-[15px]">{p.icon}</span>
              )}
              <span className="min-w-0">
                <span className="block max-w-[150px] truncate text-[12.5px] font-medium text-foreground group-hover:text-flare">{p.name}</span>
                <span className="block font-mono text-[9.5px] uppercase tracking-[0.1em] text-muted-foreground">
                  {p.owner} · ★ {p.stars}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
