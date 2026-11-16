import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireDev, serDev } from "@/lib/server/helpers";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const me = await requireDev(_req);
  const dev = await db.dev.findUnique({ where: { username } });
  if (!dev) return NextResponse.json({ error: "dev introuvable" }, { status: 404 });

  const following = me
    ? Boolean(
        await db.follow.findUnique({
          where: { follower_followee: { follower: me.username, followee: username } },
        }),
      )
    : false;

  return NextResponse.json({ dev: serDev(dev, { following }) });
}
