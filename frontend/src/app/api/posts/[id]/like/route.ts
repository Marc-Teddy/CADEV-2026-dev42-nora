import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireDev, serPost } from "@/lib/server/helpers";

/* J'aime / je n'aime plus. */
export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const dev = await requireDev(_req);
  if (!dev) return NextResponse.json({ error: "non authentifié" }, { status: 401 });
  const { id } = await params;

  const existing = await db.postLike.findUnique({
    where: { postId_username: { postId: id, username: dev.username } },
  });
  if (existing) {
    await db.postLike.delete({ where: { postId_username: { postId: id, username: dev.username } } });
  } else {
    await db.postLike.create({ data: { postId: id, username: dev.username } });
  }
  const p = await db.post.findUnique({
    where: { id },
    include: { _count: { select: { likedBy: true } }, likedBy: { where: { username: dev.username } } },
  });
  if (!p) return NextResponse.json({ error: "post introuvable" }, { status: 404 });
  return NextResponse.json({ post: serPost(p as never, dev.username) });
}
