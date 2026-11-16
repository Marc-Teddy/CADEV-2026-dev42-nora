import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireDev, serDev } from "@/lib/server/helpers";

/* Liste publique des devs — avec l'état réel « following »
   du compte connecté (table Follow). */
export async function GET(req: NextRequest) {
  const me = await requireDev(req);

  const rows = await db.dev.findMany({ orderBy: { reputation: "desc" } });
  const followed = me
    ? new Set(
        (
          await db.follow.findMany({
            where: { follower: me.username },
            select: { followee: true },
          })
        ).map((f) => f.followee),
      )
    : null;

  return NextResponse.json({
    devs: rows.map((d) => serDev(d, { following: followed?.has(d.username) ?? false })),
  });
}
