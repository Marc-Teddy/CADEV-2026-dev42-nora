import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireDev } from "@/lib/server/helpers";

/* Valider ou refuser une demande de contact reçue. */
export async function POST(req: NextRequest, { params }: { params: Promise<{ username: string }> }) {
  const dev = await requireDev(req);
  if (!dev) return NextResponse.json({ error: "non authentifié" }, { status: 401 });
  const me = dev.username;
  const { username } = await params;
  const { action } = (await req.json().catch(() => ({}))) as Record<string, string>;

  if (action !== "accept" && action !== "decline") {
    return NextResponse.json({ error: "action : accept ou decline" }, { status: 400 });
  }
  const request = await db.contactRequest.findFirst({ where: { from: username, to: me } });
  if (!request) return NextResponse.json({ error: "demande introuvable" }, { status: 404 });
  if (request.status !== "pending") {
    return NextResponse.json({ status: request.status });
  }
  const updated = await db.contactRequest.update({
    where: { id: request.id },
    data: { status: action === "accept" ? "accepted" : "declined" },
  });
  return NextResponse.json({ status: updated.status });
}
