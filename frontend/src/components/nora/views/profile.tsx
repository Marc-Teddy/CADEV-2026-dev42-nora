"use client";

/* ============================================================
   NORA — Vue « Profil développeur » (v2, type GitHub)
   · Propriétaire (moi) : édition du profil (nom, rôle, bio,
     ville, compétences), téléversement de photo de profil,
     publication d'un projet → carte réelle dans Projets.
   · Visiteur : suivre + demander le contact (validation).
   Onglets : À propos / Projets / Activité (heatmap).
   ============================================================ */

import { useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck, Camera, Check, Globe, MapPin, MessageSquare, Pencil, Plus,
  Settings, SquareTerminal, UserPlus, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useNora, devByUsername } from "@/lib/store";
import { useLang } from "@/lib/i18n";
import { NoraAvatar, BadgePill, fmt } from "../shared";
import { EASE } from "../fx/reveal";
import { cn } from "@/lib/utils";

/* heatmap réelle : calculée depuis les posts et projets du dev */
function Heatmap({ events, weeks = 26 }: { events: number[]; weeks?: number }) {
  const { t, lang } = useLang();
  const now = Date.now();
  const weekMs = 7 * 24 * 3600 * 1000;
  const start = now - weeks * weekMs;
  const counts = new Array(weeks * 7).fill(0) as number[];
  for (const ts of events) {
    if (ts < start) continue;
    const idx = Math.floor((ts - start) / (24 * 3600 * 1000));
    if (idx >= 0 && idx < counts.length) counts[idx] += 1;
  }
  const max = Math.max(1, ...counts);
  const total = counts.reduce((a, b) => a + b, 0);
  return (
    <div>
      <div className="flex flex-wrap gap-[3px]">
        {counts.map((v, i) => (
          <span
            key={i}
            title={new Date(start + i * 24 * 3600 * 1000).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US")}
            className="size-[7px] rounded-[2px]"
            style={{
              background:
                v === 0 ? "var(--surface-2)"
                : v / max > 0.66 ? "var(--flare)"
                : v / max > 0.33 ? "color-mix(in oklab, var(--flare) 62%, transparent)"
                : "color-mix(in oklab, var(--flare) 32%, transparent)",
            }}
          />
        ))}
      </div>
      <p className="mt-2.5 font-mono text-[10px] text-muted-foreground">
        {total.toLocaleString(lang === "fr" ? "fr-FR" : "en-US")} {t("prof.contributions")}
      </p>
    </div>
  );
}

/* ================== Modale : éditer mon profil ================== */
function EditProfileDialog() {
  const { t } = useLang();
  const { me, editProfileOpen, setEditProfileOpen, saveProfile } = useNora();
  /* la modale ne s'ouvre que connecté — cast sûr */
  const meSafe = me as NonNullable<typeof me>;
  const [name, setName] = useState(meSafe.name);
  const [role, setRole] = useState(meSafe.role);
  const [city, setCity] = useState(meSafe.city);
  const [bio, setBio] = useState(meSafe.bio);
  const [skills, setSkills] = useState(meSafe.skills.map((s) => s.name).join(", "));
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(meSafe.avatarUrl);
  const fileRef = useRef<HTMLInputElement>(null);

  const open = editProfileOpen;
  /* re-synchroniser les champs à chaque ouverture (état frais) */
  const sync = () => {
    setName(meSafe.name); setRole(meSafe.role); setCity(meSafe.city); setBio(meSafe.bio);
    setSkills(meSafe.skills.map((s) => s.name).join(", ")); setAvatarUrl(meSafe.avatarUrl);
  };

  const pickAvatar = (file?: File) => {
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      toast.error(t("prof.avatarTooBig"));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setAvatarUrl(String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) setEditProfileOpen(false); else sync(); }}>
      <DialogContent className="max-w-[480px] border-line bg-popover">
        <DialogHeader>
          <DialogTitle className="font-display">{t("prof.edit.title")}</DialogTitle>
          <DialogDescription>{t("prof.edit.sub")}</DialogDescription>
        </DialogHeader>

        {/* photo de profil */}
        <div className="flex items-center gap-4">
          <span className="relative">
            <NoraAvatar name={name} gradient={meSafe.gradient} size={64} avatarUrl={avatarUrl} />
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute -bottom-1 -right-1 grid size-7 cursor-pointer place-items-center rounded-full border border-line bg-flare text-white shadow-lg transition-transform hover:scale-105"
              aria-label={t("prof.avatar.pick")}
            >
              <Camera className="size-3.5" />
            </button>
          </span>
          <div>
            <p className="text-[13px] font-medium">{t("prof.avatar.t")}</p>
            <p className="text-[11.5px] text-muted-foreground">{t("prof.avatar.d")}</p>
            {avatarUrl && (
              <button onClick={() => setAvatarUrl(undefined)} className="mt-1 cursor-pointer font-mono text-[10px] text-muted-foreground hover:text-destructive">
                {t("prof.avatar.remove")}
              </button>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => pickAvatar(e.target.files?.[0])}
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="pe-name" className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{t("auth.name")}</Label>
            <Input id="pe-name" value={name} onChange={(e) => setName(e.target.value)} className="h-10 rounded-lg border-line bg-surface" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pe-role" className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{t("prof.role")}</Label>
            <Input id="pe-role" value={role} onChange={(e) => setRole(e.target.value)} className="h-10 rounded-lg border-line bg-surface" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pe-city" className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{t("auth.city")}</Label>
          <Input id="pe-city" value={city} onChange={(e) => setCity(e.target.value)} className="h-10 rounded-lg border-line bg-surface" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pe-bio" className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{t("prof.bio")}</Label>
          <Textarea id="pe-bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="resize-none rounded-lg border-line bg-surface text-[13px]" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pe-skills" className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{t("prof.skills")}</Label>
          <Input id="pe-skills" value={skills} onChange={(e) => setSkills(e.target.value)} className="h-10 rounded-lg border-line bg-surface font-mono text-[12.5px]" />
          <p className="text-[10.5px] text-muted-foreground">{t("prof.skillsHint")}</p>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setEditProfileOpen(false)} className="h-10 rounded-lg border-line bg-transparent">
            {t("misc.cancel")}
          </Button>
          <Button
            onClick={() => {
              saveProfile({
                name: name.trim() || meSafe.name,
                role: role.trim() || meSafe.role,
                city: city.trim() || meSafe.city,
                bio: bio.trim(),
                skills: skills.split(",").map((s) => s.trim()).filter(Boolean).map((n, i) => ({ name: n, level: meSafe.skills[i]?.level ?? 75 })),
                avatarUrl,
              });
              toast.success(t("prof.saved"));
            }}
            className="flare-cta h-10 gap-2 rounded-lg font-semibold text-flare-foreground"
          >
            <Check className="size-4" /> {t("misc.save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ================== Modale : publier un projet ================== */
function PublishDialog() {
  const { t } = useLang();
  const { publishOpen, setPublishOpen, publishProject } = useNora();
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [stack, setStack] = useState("");
  const [status, setStatus] = useState<ProjectStatusInput>("dev");

  type ProjectStatusInput = "production" | "dev" | "equipe" | "idee";

  return (
    <Dialog open={publishOpen} onOpenChange={setPublishOpen}>
      <DialogContent className="max-w-[480px] border-line bg-popover">
        <DialogHeader>
          <DialogTitle className="font-display">{t("prof.publish.title")}</DialogTitle>
          <DialogDescription>{t("prof.publish.sub")}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="pp-name" className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{t("prof.publish.name")}</Label>
            <Input id="pp-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="SolarTrack…" className="h-10 rounded-lg border-line bg-surface" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pp-tag" className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{t("prof.publish.tagline")}</Label>
            <Input id="pp-tag" value={tagline} onChange={(e) => setTagline(e.target.value)} className="h-10 rounded-lg border-line bg-surface" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pp-desc" className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{t("prof.publish.desc")}</Label>
            <Textarea id="pp-desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="resize-none rounded-lg border-line bg-surface text-[13px]" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="pp-stack" className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{t("prof.publish.stack")}</Label>
              <Input id="pp-stack" value={stack} onChange={(e) => setStack(e.target.value)} placeholder="React, Go…" className="h-10 rounded-lg border-line bg-surface font-mono text-[12.5px]" />
            </div>
            <div className="space-y-1.5">
              <Label className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{t("prof.publish.status")}</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as ProjectStatusInput)}>
                <SelectTrigger className="h-10 rounded-lg border-line bg-surface"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="idee">{t("projects.status.idee")}</SelectItem>
                  <SelectItem value="dev">{t("projects.status.dev")}</SelectItem>
                  <SelectItem value="equipe">{t("projects.status.equipe")}</SelectItem>
                  <SelectItem value="production">{t("projects.status.production")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setPublishOpen(false)} className="h-10 rounded-lg border-line bg-transparent">
            {t("misc.cancel")}
          </Button>
          <Button
            disabled={!name.trim() || !tagline.trim()}
            onClick={() => {
              publishProject({
                name: name.trim(), tagline: tagline.trim(), description: description.trim() || tagline.trim(),
                stack: stack.split(",").map((s) => s.trim()).filter(Boolean), status,
              });
              toast.success(t("prof.publish.done", ));
            }}
            className="flare-cta h-10 gap-2 rounded-lg font-semibold text-flare-foreground"
          >
            <Plus className="size-4" /> {t("prof.publish.cta")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ================== Vue profil ================== */
export function ProfileView() {
  const { t, lang } = useLang();
  const { profileOf, me, navigate, toggleFollow, dmRequests, requestContact, openDm, setEditProfileOpen, setPublishOpen, setSettingsOpen } = useNora();
  const projects = useNora((s) => s.projects);
  const posts = useNora((s) => s.posts);

  const isMe = profileOf === (me?.username ?? "");
  const dev = isMe ? me : devByUsername(profileOf) ?? me;

  /* évènements réels pour la heatmap : posts + projets du dev
     (hooks toujours appelés, avant tout early-return) */
  const allProjects = useNora((s) => s.projects);
  const allPosts = useNora((s) => s.posts);
  const devName = isMe ? me?.username ?? "" : profileOf;
  const heatEvents = useMemo(() => {
    const ts: number[] = [];
    for (const p of allPosts) {
      if (p.author !== devName) continue;
      ts.push(p.createdAtIso ? new Date(p.createdAtIso).getTime() : Date.now());
    }
    for (const p of allProjects) {
      if (p.owner === devName && p.createdAtIso) ts.push(new Date(p.createdAtIso).getTime());
    }
    return ts;
  }, [allPosts, allProjects, devName]);

  if (!dev) {
    return (
      <div className="mx-auto max-w-6xl p-16 text-center font-mono text-[12px] text-muted-foreground">
        {t("prof.loading")}
      </div>
    );
  }
  const owned = [...projects.filter((p) => p.owner === dev.username)];
  const followed = dev.following;
  const contact = dmRequests[dev.username] ?? "none";

  /* activité réelle récente */
  const recentActivity = (() => {
    const items: { text: string; time: string; key: string }[] = [];
    for (const p of posts.filter((x) => x.author === dev.username).slice(0, 3)) {
      items.push({
        text: lang === "fr" ? "Post publié sur le fil" : "Posted on the feed",
        time: p.time,
        key: `post-${p.id}`,
      });
    }
    for (const p of owned.slice(0, 2)) {
      items.push({
        text: lang === "fr" ? `Projet : ${p.name}` : `Project: ${p.name}`,
        time: p.updated,
        key: `proj-${p.id}`,
      });
    }
    return items.slice(0, 4);
  })();

  return (
    <div className="mx-auto max-w-5xl">
      {/* ---------- couverture ---------- */}
      <div className="relative overflow-hidden rounded-2xl border border-line">
        <div className="h-28 bg-gradient-to-r from-flare-deep via-flare to-cyan-neon/70 sm:h-36" />
        <div className="absolute inset-0 bg-dots opacity-25" />
        <div className="absolute bottom-3 right-4 hidden sm:block">
          <WeaveLine />
        </div>
      </div>

      {/* ---------- en-tête ---------- */}
      <div className="relative px-1 sm:px-4">
        <div className="-mt-10 flex flex-wrap items-end justify-between gap-4 sm:-mt-12">
          <div className="relative">
            <NoraAvatar name={dev.name} gradient={dev.gradient} size={92} className="border-4 border-background" avatarUrl={dev.avatarUrl} />
            {isMe && (
              <button
                onClick={() => setEditProfileOpen(true)}
                className="absolute -bottom-1 -right-1 grid size-8 cursor-pointer place-items-center rounded-full border border-line bg-flare text-white shadow-lg transition-transform hover:scale-105"
                aria-label={t("prof.avatar.pick")}
              >
                <Camera className="size-4" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2 pb-1">
            {isMe ? (
              <>
                <Button onClick={() => navigate("studio")} className="flare-cta h-9 gap-2 rounded-lg px-4 text-[12.5px] font-semibold text-flare-foreground">
                  <SquareTerminal className="size-3.5" /> {t("app.studio")}
                </Button>
                <Button onClick={() => setPublishOpen(true)} variant="outline" className="h-9 gap-2 rounded-lg border-line bg-surface px-4 text-[12.5px] font-medium">
                  <Plus className="size-3.5" /> {t("prof.publish.cta")}
                </Button>
                <Button onClick={() => setEditProfileOpen(true)} variant="outline" className="h-9 gap-2 rounded-lg border-line bg-surface px-4 text-[12.5px] font-medium">
                  <Pencil className="size-3.5" /> {t("prof.edit.cta")}
                </Button>
                <Button
                  onClick={() => setSettingsOpen(true)}
                  variant="ghost"
                  className="h-9 gap-2 rounded-lg px-3 text-[12.5px] text-muted-foreground hover:bg-surface-2"
                  aria-label={t("top.settings")}
                >
                  <Settings className="size-4" />
                </Button>
              </>
            ) : (
              <>
                {contact === "accepted" ? (
                  <Button onClick={() => { openDm(dev.username); navigate("salons"); }} className="flare-cta h-9 gap-2 rounded-lg px-4 text-[12.5px] font-semibold text-flare-foreground">
                    <MessageSquare className="size-3.5" /> {t("prof.openChat")}
                  </Button>
                ) : contact === "pending" ? (
                  <Button disabled variant="outline" className="h-9 gap-2 rounded-lg border-line bg-surface px-4 font-mono text-[12px] text-muted-foreground">
                    <span className="size-1.5 animate-pulse-dot rounded-full bg-gold" /> {t("prof.requestSent")}
                  </Button>
                ) : (
                  <Button onClick={() => requestContact(dev.username)} className="flare-cta h-9 gap-2 rounded-lg px-4 text-[12.5px] font-semibold text-flare-foreground">
                    <MessageSquare className="size-3.5" /> {t("prof.contact")}
                  </Button>
                )}
                <Button
                  onClick={() => toggleFollow(dev.username)}
                  variant={followed ? "outline" : "default"}
                  className={cn(
                    "h-9 gap-2 rounded-lg px-4 text-[12.5px] font-medium",
                    followed ? "border-signal-muted/50 bg-transparent text-signal" : "bg-foreground text-background hover:bg-foreground/90",
                  )}
                >
                  <UserPlus className="size-3.5" /> {followed ? t("prof.followingLabel") : t("prof.follow")}
                </Button>
              </>
            )}
          </div>
        </div>

        <motion.div
          key={dev.username}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="mt-4"
        >
          <h1 className="flex flex-wrap items-center gap-2 font-display text-2xl font-bold tracking-tight">
            {dev.name}
            <BadgeCheck className="size-5 text-flare" aria-label={t("misc.verified")} />
            {dev.online && (
              <span className="rounded-full bg-signal-muted/15 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-wider text-signal">
                {t("devs.online")}
              </span>
            )}
          </h1>
          <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11.5px] text-muted-foreground">
            <span>@{dev.username}</span>
            <span className="inline-flex items-center gap-1"><Pencil className="size-3" />{dev.role}</span>
            <span className="inline-flex items-center gap-1"><MapPin className="size-3 text-flare" />{dev.city} {dev.flag}</span>
            <span className="inline-flex items-center gap-1"><Globe className="size-3" />{t("prof.joined")} {dev.joined}</span>
          </p>
          <p className="mt-3 max-w-[560px] text-[13.5px] leading-relaxed text-foreground/90">{dev.bio}</p>
        </motion.div>

        {/* stats */}
        <div className="mt-5 flex flex-wrap gap-x-7 gap-y-2 border-y border-line py-3.5">
          {[
            { v: owned.length, l: t("prof.projects") },
            { v: fmt(dev.followers), l: t("prof.followers") },
            { v: fmt(dev.reputation), l: t("prof.reputation") },
            { v: dev.challengesWon, l: t("prof.challengesWon") },
          ].map((s) => (
            <p key={s.l} className="text-[13px]">
              <span className="font-display text-lg font-bold tabular-nums">{s.v}</span>{" "}
              <span className="text-muted-foreground">{s.l}</span>
            </p>
          ))}
          <p className="ml-auto hidden items-center gap-1.5 font-mono text-[11px] text-signal sm:flex">
            <Users className="size-3.5" /> {t(`devs.availability.${dev.availability}`)}
          </p>
        </div>
      </div>

      {/* ---------- onglets ---------- */}
      <Tabs defaultValue="about" className="mt-5">
        <TabsList className="h-10 gap-1 rounded-xl border border-line bg-surface p-1">
          <TabsTrigger value="about" className="rounded-lg px-4 font-mono text-[11.5px]">{t("prof.about")}</TabsTrigger>
          <TabsTrigger value="projects" className="rounded-lg px-4 font-mono text-[11.5px]">{t("prof.projects")}</TabsTrigger>
          <TabsTrigger value="activity" className="rounded-lg px-4 font-mono text-[11.5px]">{t("prof.activity")}</TabsTrigger>
        </TabsList>

        {/* ----- à propos ----- */}
        <TabsContent value="about" className="mt-4 grid gap-3.5 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-xl border border-line bg-surface p-5">
            <h2 className="font-display text-[15px] font-semibold">{t("prof.skills")}</h2>
            <div className="mt-4 space-y-3.5">
              {dev.skills.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between font-mono text-[11px]">
                    <span className="text-foreground">{s.name}</span>
                    <span className="text-signal tabular-nums">{s.level}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-flare to-cyan-neon"
                      initial={{ width: 0 }}
                      animate={{ width: `${s.level}%` }}
                      transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3.5">
            <div className="rounded-xl border border-line bg-surface p-5">
              <h2 className="font-display text-[15px] font-semibold">{t("prof.languages")}</h2>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {dev.langs.map((l) => (
                  <span key={l} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted-foreground">{l}</span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-surface p-5">
              <h2 className="font-display text-[15px] font-semibold">{t("prof.badges")}</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {dev.badges.map((b) => <BadgePill key={b.kind} {...b} />)}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ----- projets ----- */}
        <TabsContent value="projects" className="mt-4">
          {owned.length === 0 ? (
            <div className="rounded-xl border border-dashed border-line bg-surface/60 p-10 text-center">
              <p className="text-[13.5px] text-muted-foreground">{t("prof.noProjects")}</p>
              {isMe && (
                <Button onClick={() => setPublishOpen(true)} className="flare-cta mt-4 h-9 gap-2 rounded-lg px-4 text-[12.5px] font-semibold text-flare-foreground">
                  <Plus className="size-3.5" /> {t("prof.publish.cta")}
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-3.5 md:grid-cols-2">
              {owned.map((p) => (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="hover-spot overflow-hidden rounded-xl border border-line bg-surface"
                >
                  {p.cover && (
                    <div className="relative h-32 overflow-hidden">
                      <img src={p.cover} alt="" className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]" loading="lazy" />
                      <span className="absolute left-3 top-3 rounded-md bg-[#0b0912]/80 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-white backdrop-blur">
                        {t(`projects.status.${p.status}`)}
                      </span>
                    </div>
                  )}
                  <div className="p-4.5">
                    <div className="flex items-center gap-2.5">
                      {!p.cover && <span className="grid size-9 place-items-center rounded-lg bg-surface-2 text-lg">{p.icon}</span>}
                      <h3 className="truncate font-display text-[14.5px] font-semibold">{p.name}</h3>
                      {!p.cover && (
                        <span className="ml-auto shrink-0 rounded px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                          {t(`projects.status.${p.status}`)}
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-snug text-muted-foreground">{p.tagline}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.stack.slice(0, 4).map((s) => (
                        <span key={s} className="rounded bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">{s}</span>
                      ))}
                    </div>
                    <div className="mt-3.5 flex items-center justify-between border-t border-line pt-3 font-mono text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1.5"><span className="text-gold">★</span> {fmt(p.stars)}</span>
                      <span>{p.updated}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </TabsContent>

        {/* ----- activité ----- */}
        <TabsContent value="activity" className="mt-4 space-y-3.5">
          <div className="rounded-xl border border-line bg-surface p-5">
            <h2 className="mb-4 font-display text-[15px] font-semibold">{t("prof.contributionsT")}</h2>
            <Heatmap events={heatEvents} />
          </div>
          <div className="rounded-xl border border-line bg-surface p-5">
            <h2 className="font-display text-[15px] font-semibold">{t("dash.activity.t")}</h2>
            <ul className="mt-3.5 space-y-3">
              {recentActivity.length === 0 ? (
                <li className="text-[12.5px] text-muted-foreground">
                  {lang === "fr" ? "Aucune activité pour l'instant — publie un premier post !" : "No activity yet — publish your first post!"}
                </li>
              ) : (
                recentActivity.map((a) => (
                  <li key={a.key} className="flex items-center gap-3 border-b border-line/60 pb-3 text-[12.5px] last:border-0 last:pb-0">
                    <span className="size-1.5 shrink-0 rounded-full bg-flare" /> {a.text}
                    <span className="ml-auto shrink-0 font-mono text-[10px] text-muted-foreground">{a.time}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </TabsContent>
      </Tabs>

      <EditProfileDialog />
      <PublishDialog />
    </div>
  );
}

/* ligne tissée décorative */
function WeaveLine() {
  return (
    <div
      aria-hidden
      className="h-[3px] w-40 rounded-full"
      style={{
        backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,.55) 0 12px, transparent 12px 18px, rgba(255,255,255,.25) 18px 26px, transparent 26px 34px)",
        opacity: 0.5,
      }}
    />
  );
}
