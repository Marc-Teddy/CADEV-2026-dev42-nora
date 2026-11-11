import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireDev, serMessage } from "@/lib/server/helpers";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = await db.channelMessage.findMany({
    where: { channelId: id },
    orderBy: { createdAt: "asc" },
    take: 80,
  });
  return NextResponse.json({ messages: rows.map(serMessage) });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const dev = await requireDev(req);
  if (!dev) return NextResponse.json({ error: "non authentifié" }, { status: 401 });
  const { id } = await params;
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  if (!b.content || typeof b.content !== "string") {
    return NextResponse.json({ error: "contenu requis" }, { status: 400 });
  }
  const m = await db.channelMessage.create({
    data: {
      channelId: id,
      author: dev.username,
      content: b.content,
      kind: typeof b.kind === "string" ? b.kind : "text",
      codeLang: typeof (b.code as { lang?: string })?.lang === "string" ? (b.code as { lang: string }).lang : null,
      codeSnippet: typeof (b.code as { snippet?: string })?.snippet === "string" ? (b.code as { snippet: string }).snippet : null,
    },
  });
  return NextResponse.json({ message: serMessage(m) }, { status: 201 });
}
