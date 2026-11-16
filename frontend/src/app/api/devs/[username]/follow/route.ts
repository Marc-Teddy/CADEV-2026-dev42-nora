import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireDev } from "@/lib/server/helpers";

/* Suivre / ne plus suivre un dev — réel, persisté en base. */
export async function POST(_req: NextRequest, { params }: { params: Promise<{ username: string }> }) {
  const me = await requireDev(_req);
  if (!me) return NextResponse.json({ error: "non authentifié" }, { status: 401 });
  const { username } = await params;

  if (username === me.username) {
    return NextResponse.json({ error: "on ne se suit pas soi-même" }, { status: 400 });
  }
  const target = await db.dev.findUnique({ where: { username } });
  if (!target) return NextResponse.json({ error: "dev introuvable" }, { status: 404 });

  const existing = await db.follow.findUnique({
    where: { follower_followee: { follower: me.username, followee: username } },
  });

  if (existing) {
    await db.follow.delete({ where: { follower_followee: { follower: me.username, followee: username } } });
    await db.dev.update({ where: { username }, data: { followers: { decrement: 1 } } });
  } else {
    await db.follow.create({ data: { follower: me.username, followee: username } });
    await db.dev.update({ where: { username }, data: { followers: { increment: 1 } } });
  }

  const [updated, following] = await Promise.all([
    db.dev.findUnique({ where: { username } }),
    db.follow.findUnique({ where: { follower_followee: { follower: me.username, followee: username } } }),
  ]);

  return NextResponse.json({
    following: Boolean(following),
    followers: updated?.followers ?? target.followers,
  });
}
