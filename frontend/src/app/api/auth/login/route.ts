import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword, newToken, serDev } from "@/lib/server/helpers";

export async function POST(req: NextRequest) {
  const { email, password } = (await req.json().catch(() => ({}))) as Record<string, string>;
  if (!email || !password) {
    return NextResponse.json({ error: "email et password requis" }, { status: 400 });
  }
  const dev = await db.dev.findUnique({ where: { email } });
  if (!dev || !verifyPassword(password, dev.passwordHash)) {
    return NextResponse.json({ error: "identifiants incorrects" }, { status: 401 });
  }
  await db.dev.update({ where: { username: dev.username }, data: { online: true } });
  const token = newToken();
  await db.session.create({ data: { id: token, devUsername: dev.username } });
  return NextResponse.json({ token, dev: serDev(dev, { private: true }) });
}
