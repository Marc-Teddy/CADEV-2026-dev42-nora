import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireDev, serMessage, threadKey } from "@/lib/server/helpers";
import { aiReply } from "@/lib/server/ai";

/* Envoyer un message privé. La conversation doit avoir été
   validée par le destinataire (sauf l'agent NORA). */
export async function POST(req: NextRequest, { params }: { params: Promise<{ username: string }> }) {
  const dev = await requireDev(req);
  if (!dev) return NextResponse.json({ error: "non authentifié" }, { status: 401 });
  const me = dev.username;
  const { username } = await params;
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  if (!b.content || typeof b.content !== "string") {
    return NextResponse.json({ error: "contenu requis" }, { status: 400 });
  }

  /* L'agent NORA répond toujours. */
  if (username === "nora") {
    await db.directMessage.create({
      data: { threadKey: threadKey(me, "nora"), author: me, content: b.content },
    });
    const answer = await aiReply(b.content);
    const reply = await db.directMessage.create({
      data: { threadKey: threadKey(me, "nora"), author: "nora", content: answer.content },
    });
    return NextResponse.json({
      messages: [
        serMessage(reply),
      ],
      aiCode: answer.code ?? null,
    }, { status: 201 });
  }

  const target = await db.dev.findUnique({ where: { username } });
  if (!target) return NextResponse.json({ error: "dev introuvable" }, { status: 404 });

  const request = await db.contactRequest.findFirst({
    where: {
      OR: [{ from: me, to: username }, { from: username, to: me }],
    },
  });
  if (!request || request.status !== "accepted") {
    return NextResponse.json({ error: "demande de contact non validée" }, { status: 403 });
  }

  const m = await db.directMessage.create({
    data: { threadKey: threadKey(me, username), author: me, content: b.content },
  });
  return NextResponse.json({ messages: [serMessage(m)] }, { status: 201 });
}
