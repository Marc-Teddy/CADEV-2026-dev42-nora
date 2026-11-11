import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireDev, serMessage, threadKey } from "@/lib/server/helpers";

/* Threads privés de l'utilisateur connecté :
   - contacts validés (acceptés des deux côtés) → discussions
   - demandes entrantes en attente de validation
   - demandes sortantes en attente */
export async function GET(req: NextRequest) {
  const dev = await requireDev(req);
  if (!dev) return NextResponse.json({ error: "non authentifié" }, { status: 401 });
  const me = dev.username;

  const requests = await db.contactRequest.findMany({
    where: { OR: [{ from: me }, { to: me }] },
    orderBy: { createdAt: "asc" },
  });

  const accepted: string[] = [];
  const incoming: string[] = [];
  const outgoing: { username: string; status: string }[] = [];
  for (const r of requests) {
    if (r.status === "accepted") {
      accepted.push(r.from === me ? r.to : r.from);
    } else if (r.status === "pending" && r.to === me) {
      incoming.push(r.from);
    } else if (r.status === "pending" && r.from === me) {
      outgoing.push({ username: r.to, status: "pending" });
    }
  }

  const keys = [...accepted.map((u) => threadKey(me, u)), threadKey(me, "nora")];
  const msgs = keys.length
    ? await db.directMessage.findMany({ where: { threadKey: { in: keys } }, orderBy: { createdAt: "asc" } })
    : [];

  const threads: Record<string, ReturnType<typeof serMessage>[]> = {};
  for (const u of [...accepted, "nora"]) threads[u] = [];
  for (const m of msgs) {
    const [a, b] = m.threadKey.split("|");
    const other = a === me ? b : a;
    (threads[other] ??= []).push(serMessage(m));
  }

  return NextResponse.json({ contacts: accepted, incoming, outgoing, threads });
}
