import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const rows = await db.channel.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ channels: rows });
}
