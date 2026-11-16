import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { parseJson } from "@/lib/server/helpers";

export async function GET() {
  const rows = await db.mission.findMany();
  return NextResponse.json({
    missions: rows.map((m) => ({ ...m, skills: parseJson<string[]>(m.skillsJson, []), id: m.id })),
  });
}
