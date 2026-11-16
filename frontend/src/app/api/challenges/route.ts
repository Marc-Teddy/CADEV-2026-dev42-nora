import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const rows = await db.challenge.findMany();
  return NextResponse.json({ challenges: rows });
}
