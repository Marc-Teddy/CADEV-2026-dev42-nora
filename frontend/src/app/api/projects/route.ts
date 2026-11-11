import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireDev, serProject } from "@/lib/server/helpers";

export async function GET(req: NextRequest) {
  const dev = await requireDev(req);
  const rows = await db.project.findMany({
    orderBy: { updatedAt: "desc" },
    include: { _count: { select: { starsGiven: true } }, starsGiven: dev ? { where: { username: dev.username } } : false },
  });
  return NextResponse.json({
    projects: rows.map((p) => serProject(p, (p as unknown as { starsGiven?: unknown[] }).starsGiven?.length ? true : false)),
  });
}

export async function POST(req: NextRequest) {
  const dev = await requireDev(req);
  if (!dev) return NextResponse.json({ error: "non authentifié" }, { status: 401 });
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  if (!b.name || typeof b.name !== "string") {
    return NextResponse.json({ error: "le nom du projet est requis" }, { status: 400 });
  }
  const p = await db.project.create({
    data: {
      name: b.name,
      tagline: typeof b.tagline === "string" ? b.tagline : "",
      description: typeof b.description === "string" ? b.description : "",
      domain: typeof b.domain === "string" ? b.domain : "Communautaire",
      stackJson: JSON.stringify(Array.isArray(b.stack) ? b.stack : []),
      status: typeof b.status === "string" ? b.status : "dev",
      owner: dev.username,
      teamJson: JSON.stringify([dev.username]),
      openRolesJson: "[]",
      progress: 0,
      icon: typeof b.icon === "string" ? b.icon : "🚀",
      cover: typeof b.cover === "string" ? b.cover : null,
      repo: `nora/${dev.username}/${String(b.name).toLowerCase().replace(/\s+/g, "-")}`,
    },
    include: { _count: { select: { starsGiven: true } } },
  });
  await db.dev.update({ where: { username: dev.username }, data: { projectsCount: { increment: 1 } } });
  return NextResponse.json({ project: serProject(p) }, { status: 201 });
}
