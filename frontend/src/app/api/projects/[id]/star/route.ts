import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireDev, serProject } from "@/lib/server/helpers";

/* Basculer le « star » du projet connecté (GitHub-like). */
export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const dev = await requireDev(_req);
  if (!dev) return NextResponse.json({ error: "non authentifié" }, { status: 401 });
  const { id } = await params;

  const existing = await db.projectStar.findUnique({
    where: { projectId_username: { projectId: id, username: dev.username } },
  });
  if (existing) {
    await db.projectStar.delete({ where: { projectId_username: { projectId: id, username: dev.username } } });
  } else {
    await db.projectStar.create({ data: { projectId: id, username: dev.username } });
  }
  const p = await db.project.findUnique({
    where: { id },
    include: { _count: { select: { starsGiven: true } }, starsGiven: { where: { username: dev.username } } },
  });
  if (!p) return NextResponse.json({ error: "projet introuvable" }, { status: 404 });
  return NextResponse.json({ project: serProject(p, p.starsGiven.length > 0) });
}
