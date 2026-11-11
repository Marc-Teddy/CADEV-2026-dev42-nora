import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireDev, serDev, parseJson } from "@/lib/server/helpers";
import type { Badge } from "@/lib/types";

export async function GET(req: NextRequest) {
  const dev = await requireDev(req);
  if (!dev) return NextResponse.json({ error: "non authentifié" }, { status: 401 });
  return NextResponse.json({ dev: serDev(dev, { private: true }) });
}

/* Mise à jour du profil : bio, rôle, ville, compétences, avatar… */
export async function PATCH(req: NextRequest) {
  const dev = await requireDev(req);
  if (!dev) return NextResponse.json({ error: "non authentifié" }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

  const patch: Record<string, unknown> = {};
  for (const k of ["name", "role", "city", "country", "flag", "bio", "availability", "avatarUrl"] as const) {
    if (typeof body[k] === "string") patch[k] = body[k];
  }
  if (Array.isArray(body.skills)) patch.skillsJson = JSON.stringify(body.skills);
  if (Array.isArray(body.langs)) patch.langsJson = JSON.stringify(body.langs);
  if (Array.isArray(body.badges)) patch.badgesJson = JSON.stringify(body.badges);

  const updated = await db.dev.update({ where: { username: dev.username }, data: patch });
  const out = serDev(updated, { private: true });
  out.badges = parseJson<Badge[]>(updated.badgesJson, []);
  return NextResponse.json({ dev: out });
}
