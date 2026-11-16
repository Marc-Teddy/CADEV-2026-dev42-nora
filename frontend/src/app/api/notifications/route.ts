import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireDev } from "@/lib/server/helpers";

/* ============================================================
   Notifications réelles, calculées depuis la base :
   · demandes de contact entrantes (pending)
   · likes reçus sur mes posts
   · stars reçues sur mes projets
   · derniers messages privés reçus
   ============================================================ */

export type NotifItem = {
  id: string;
  kind: "contact" | "like" | "star" | "message";
  from: string;
  target?: string; // slug du post/projet ou nom du projet
  createdAtIso: string;
};

export async function GET(req: NextRequest) {
  const me = await requireDev(req);
  if (!me) return NextResponse.json({ error: "non authentifié" }, { status: 401 });

  const [requests, likes, stars, messages] = await Promise.all([
    db.contactRequest.findMany({ where: { to: me.username, status: "pending" }, orderBy: { createdAt: "desc" }, take: 6 }),
    db.postLike.findMany({
      where: { post: { author: me.username }, NOT: { username: me.username } },
      orderBy: { createdAt: "desc" }, take: 6, include: { post: { select: { id: true, content: true } } },
    }),
    db.projectStar.findMany({
      where: { project: { owner: me.username }, NOT: { username: me.username } },
      orderBy: { createdAt: "desc" }, take: 6, include: { project: { select: { id: true, name: true } } },
    }),
    db.directMessage.findMany({
      where: { threadKey: { contains: me.username }, NOT: { author: me.username } },
      orderBy: { createdAt: "desc" }, take: 6,
    }),
  ]);

  const items: NotifItem[] = [
    ...requests.map((r) => ({
      id: `contact-${r.id}`, kind: "contact" as const, from: r.from,
      createdAtIso: r.createdAt.toISOString(),
    })),
    ...likes.map((l) => ({
      id: `like-${l.postId}-${l.username}`, kind: "like" as const, from: l.username,
      target: l.post.content.slice(0, 60), createdAtIso: l.createdAt.toISOString(),
    })),
    ...stars.map((s) => ({
      id: `star-${s.projectId}-${s.username}`, kind: "star" as const, from: s.username,
      target: s.project.name, createdAtIso: s.createdAt.toISOString(),
    })),
    ...messages
      .filter((m) => m.threadKey.split("|").includes(me.username))
      .map((m) => ({
        id: `message-${m.id}`, kind: "message" as const, from: m.author,
        target: m.content.slice(0, 60), createdAtIso: m.createdAt.toISOString(),
      })),
  ].sort((a, b) => b.createdAtIso.localeCompare(a.createdAtIso));

  return NextResponse.json({ notifications: items });
}
