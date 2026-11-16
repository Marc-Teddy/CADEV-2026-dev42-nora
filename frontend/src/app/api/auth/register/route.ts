import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, newToken, serDev } from "@/lib/server/helpers";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "body invalide" }, { status: 400 });
  const { name, username, email, password, city, country } = body as Record<string, string>;
  if (!name || !username || !email || !password) {
    return NextResponse.json({ error: "name, username, email et password sont requis" }, { status: 400 });
  }
  if (!/^[a-z0-9_-]{3,20}$/i.test(username)) {
    return NextResponse.json({ error: "username : 3-20 caractères alphanumériques" }, { status: 400 });
  }
  const exists = await db.dev.findFirst({ where: { OR: [{ email }, { username }] } });
  if (exists) {
    return NextResponse.json({ error: "email ou username déjà utilisé" }, { status: 409 });
  }
  const dev = await db.dev.create({
    data: {
      username, email, name,
      passwordHash: hashPassword(password),
      city: city ?? "", country: country ?? "",
      joined: new Date().toLocaleDateString("fr-FR", { month: "short", year: "numeric" }),
      online: true,
      role: "Developer",
    },
  });
  const token = newToken();
  await db.session.create({ data: { id: token, devUsername: dev.username } });
  return NextResponse.json({ token, dev: serDev(dev, { private: true }) }, { status: 201 });
}
