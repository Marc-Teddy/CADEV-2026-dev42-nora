import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireDev } from "@/lib/server/helpers";

/* Demandes de contact : liste des entrantes et sortantes. */
export async function GET(req: NextRequest) {
  const dev = await requireDev(req);
  if (!dev) return NextResponse.json({ error: "non authentifié" }, { status: 401 });
  const me = dev.username;
  const rows = await db.contactRequest.findMany({
    where: { OR: [{ from: me }, { to: me }] },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({
    incoming: rows.filter((r) => r.to === me && r.status === "pending").map((r) => ({ username: r.from })),
    outgoing: rows.filter((r) => r.from === me).map((r) => ({ username: r.to, status: r.status })),
  });
}

/* Demander le contact d'un dev : crée une demande en attente
   de validation par le destinataire. */
export async function POST(req: NextRequest) {
  const dev = await requireDev(req);
  if (!dev) return NextResponse.json({ error: "non authentifié" }, { status: 401 });
  const me = dev.username;
  const { username } = (await req.json().catch(() => ({}))) as Record<string, string>;
  if (!username || username === me) {
    return NextResponse.json({ error: "username requis" }, { status: 400 });
  }
  const target = await db.dev.findUnique({ where: { username } });
  if (!target) return NextResponse.json({ error: "dev introuvable" }, { status: 404 });

  const existing = await db.contactRequest.findFirst({ where: { OR: [{ from: me, to: username }, { from: username, to: me }] } });
  if (existing) {
    return NextResponse.json({ status: existing.status, request: existing });
  }
  const created = await db.contactRequest.create({ data: { from: me, to: username, status: "pending" } });
  return NextResponse.json({ status: created.status, request: created }, { status: 201 });
}
