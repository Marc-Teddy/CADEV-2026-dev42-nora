import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/* Chiffres publics de la plateforme — calculés sur la base réelle. */
export async function GET() {
  const [devs, projects, posts, channels, devsCountries] = await Promise.all([
    db.dev.count(),
    db.project.count(),
    db.post.count(),
    db.channel.count(),
    db.dev.findMany({ select: { country: true }, distinct: ["country"] }),
  ]);
  return NextResponse.json({
    stats: {
      devs,
      projects,
      posts,
      channels,
      countries: devsCountries.filter((c) => c.country).length,
    },
  });
}
