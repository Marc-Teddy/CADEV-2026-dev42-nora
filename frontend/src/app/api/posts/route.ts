import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireDev, serPost } from "@/lib/server/helpers";

export async function GET(req: NextRequest) {
  const dev = await requireDev(req);
  const rows = await db.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { likedBy: true } },
      likedBy: dev ? { where: { username: dev.username }, select: { username: true } } : false,
    },
  });
  return NextResponse.json({
    posts: rows.map((p) => serPost(p as never, dev?.username ?? null)),
  });
}

export async function POST(req: NextRequest) {
  const dev = await requireDev(req);
  if (!dev) return NextResponse.json({ error: "non authentifié" }, { status: 401 });
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  if (!b.content || typeof b.content !== "string") {
    return NextResponse.json({ error: "le contenu du post est requis" }, { status: 400 });
  }
  const p = await db.post.create({
    data: {
      author: dev.username,
      type: typeof b.type === "string" ? b.type : "text",
      content: b.content,
      tagsJson: JSON.stringify(Array.isArray(b.tags) ? b.tags : []),
      projectId: typeof b.projectId === "string" ? b.projectId : null,
    },
    include: { _count: { select: { likedBy: true } }, likedBy: { where: { username: dev.username } } },
  });
  return NextResponse.json({ post: serPost(p as never, dev.username) }, { status: 201 });
}
