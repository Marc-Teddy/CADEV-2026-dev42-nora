import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { parseJson, requireDev, serProject } from "@/lib/server/helpers";

/* Rejoindre / quitter l'équipe d'un projet — écrit dans teamJson (réel). */
export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const me = await requireDev(_req);
  if (!me) return NextResponse.json({ error: "non authentifié" }, { status: 401 });
  const { id } = await params;

  const project = await db.project.findUnique({ where: { id } });
  if (!project) return NextResponse.json({ error: "projet introuvable" }, { status: 404 });

  const team: string[] = parseJson(project.teamJson, []);
  const joined = team.includes(me.username);

  const nextTeam = joined
    ? team.filter((u) => u !== me.username)
    : [...team, me.username];

  const updated = await db.project.update({
    where: { id },
    data: { teamJson: JSON.stringify(nextTeam) },
    include: {
      _count: { select: { starsGiven: true } },
      starsGiven: { where: { username: me.username } },
    },
  });

  return NextResponse.json({ project: serProject(updated, updated.starsGiven.length > 0), joined: !joined });
}
