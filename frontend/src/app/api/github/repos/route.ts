import { NextRequest, NextResponse } from "next/server";
import { requireDev } from "@/lib/server/helpers";

/* ============================================================
   GitHub — dépôts publics réels d'un utilisateur, via l'API
   officielle (api.github.com). Côté serveur pour éviter les
   soucis CORS et préparer l'ajout d'un token optionnel.
   GET /api/github/repos?user=torvalds
   ============================================================ */

export type GithubRepo = {
  name: string;
  fullName: string;
  description: string;
  language: string | null;
  stars: number;
  forks: number;
  url: string;
  updatedAtIso: string;
  topics: string[];
};

export async function GET(req: NextRequest) {
  const me = await requireDev(req);
  if (!me) return NextResponse.json({ error: "non authentifié" }, { status: 401 });

  const user = req.nextUrl.searchParams.get("user")?.trim();
  if (!user) return NextResponse.json({ error: "paramètre user requis" }, { status: 400 });

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(user)}`, {
        headers: { Accept: "application/vnd.github+json", "User-Agent": "NORA-dev42" },
        next: { revalidate: 60 },
      }),
      fetch(`https://api.github.com/users/${encodeURIComponent(user)}/repos?sort=updated&per_page=8`, {
        headers: { Accept: "application/vnd.github+json", "User-Agent": "NORA-dev42" },
        next: { revalidate: 60 },
      }),
    ]);

    if (userRes.status === 404) {
      return NextResponse.json({ error: "Utilisateur GitHub introuvable." }, { status: 404 });
    }
    if (!userRes.ok || !reposRes.ok) {
      return NextResponse.json({ error: "GitHub est momentanément indisponible." }, { status: 502 });
    }

    const u = (await userRes.json()) as { login: string; avatar_url: string; public_repos: number; bio: string | null };
    const reposRaw = (await reposRes.json()) as Array<{
      name: string; full_name: string; description: string | null; language: string | null;
      stargazers_count: number; forks_count: number; html_url: string; updated_at: string; topics?: string[];
    }>;

    const repos: GithubRepo[] = reposRaw.map((r) => ({
      name: r.name,
      fullName: r.full_name,
      description: r.description ?? "",
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      url: r.html_url,
      updatedAtIso: r.updated_at,
      topics: r.topics?.slice(0, 4) ?? [],
    }));

    return NextResponse.json({
      user: { login: u.login, avatarUrl: u.avatar_url, publicRepos: u.public_repos, bio: u.bio ?? "" },
      repos,
    });
  } catch {
    return NextResponse.json({ error: "GitHub injoignable depuis le serveur." }, { status: 502 });
  }
}
