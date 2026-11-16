import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { parseJson } from "@/lib/server/helpers";

export async function GET() {
  const rows = await db.hackathon.findMany();
  return NextResponse.json({
    hackathons: rows.map((h) => ({ ...h, color: parseJson<[string, string]>(h.colorJson, ["#7c3aed", "#3b82f6"]) })),
  });
}
