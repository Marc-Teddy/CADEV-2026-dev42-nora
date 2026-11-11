import { NextRequest, NextResponse } from "next/server";
import { requireDev } from "@/lib/server/helpers";
import { aiReply } from "@/lib/server/ai";

/* Panneau NORA AI — réservé aux devs connectés. */
export async function POST(req: NextRequest) {
  const dev = await requireDev(req);
  if (!dev) return NextResponse.json({ error: "non authentifié" }, { status: 401 });
  const { prompt } = (await req.json().catch(() => ({}))) as Record<string, string>;
  if (!prompt) return NextResponse.json({ error: "prompt requis" }, { status: 400 });
  const answer = await aiReply(prompt);
  return NextResponse.json({ answer });
}
