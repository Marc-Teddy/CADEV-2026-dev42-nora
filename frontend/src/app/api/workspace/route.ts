import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireDev } from "@/lib/server/helpers";

/* ============================================================
   Studio — fichiers de code persistés par dev (PostgreSQL-like
   mais SQLite). Premier accès : amorce 3 fichiers réels.
   GET    → liste des fichiers du dev connecté
   POST   → upsert { path, content, language }
   DELETE → ?path=...
   ============================================================ */

const STARTERS: { path: string; language: string; content: string }[] = [
  {
    path: "bienvenue.js",
    language: "javascript",
    content: `/* Bienvenue dans NORA Studio — ton espace de code. */
/* Clique sur ▶ Exécuter pour lancer ce fichier.        */

const continent = "Afrique";
const devs = ["Abidjan", "Dakar", "Cotonou", "Accra", "Lagos"];

console.log("NORA Studio connecté depuis", continent);
console.log("Villes actives :", devs.join(" · "));

function fibonacci(n) {
  let a = 0, b = 1;
  for (let i = 0; i < n; i++) [a, b] = [b, a + b];
  return a;
}

console.log("Fibonacci(12) =", fibonacci(12));
return "Prêt à coder 🚀";
`,
  },
  {
    path: "algo/dijkstra.js",
    language: "javascript",
    content: `/* Dijkstra — plus court chemin (ex. livraison Dakar → Saint-Louis) */
const graphe = {
  Dakar: { Thies: 70, Mbour: 85 },
  Thies: { Louga: 90 },
  Mbour: { Fatick: 60 },
  Louga: { "Saint-Louis": 70 },
  Fatick: { "Saint-Louis": 180 },
};

function plusCourt(depart) {
  const dist = { [depart]: 0 };
  const vu = new Set();
  while (true) {
    const courant = Object.entries(dist)
      .filter(([n]) => !vu.has(n))
      .sort(([, d1], [, d2]) => d1 - d2)[0];
    if (!courant) break;
    const [noeud, d] = courant;
    vu.add(noeud);
    for (const [voisin, poids] of Object.entries(graphe[noeud] ?? {})) {
      if (d + poids < (dist[voisin] ?? Infinity)) dist[voisin] = d + poids;
    }
  }
  return dist;
}

console.table(plusCourt("Dakar"));
return plusCourt("Dakar");
`,
  },
  {
    path: "README.md",
    language: "markdown",
    content: `# Mon workspace NORA

Ce dossier est **persisté côté backend** : tes fichiers survivent
à la déconnexion. Ctrt/Cmd + S sauvegarde, ▶ Exécute le fichier
JavaScript actif dans un bac à sable isolé.

## Raccourcis
- \`Ctrl/Cmd + S\` — enregistrer
- \`Ctrl/Cmd + Enter\` — exécuter
- Panneau NORA IA — génère du code directement dans le fichier
`,
  },
];

export async function GET(req: NextRequest) {
  const me = await requireDev(req);
  if (!me) return NextResponse.json({ error: "non authentifié" }, { status: 401 });

  let files = await db.workspaceFile.findMany({
    where: { owner: me.username },
    orderBy: { path: "asc" },
  });

  if (files.length === 0) {
    await db.workspaceFile.createMany({
      data: STARTERS.map((s) => ({ ...s, owner: me.username })),
    });
    files = await db.workspaceFile.findMany({ where: { owner: me.username }, orderBy: { path: "asc" } });
  }

  return NextResponse.json({
    files: files.map((f) => ({
      id: f.id, path: f.path, content: f.content, language: f.language,
      updatedAt: f.updatedAt.toISOString(),
    })),
  });
}

export async function POST(req: NextRequest) {
  const me = await requireDev(req);
  if (!me) return NextResponse.json({ error: "non authentifié" }, { status: 401 });

  const body = (await req.json().catch(() => ({}))) as {
    path?: string; content?: string; language?: string;
  };
  const path = (body.path ?? "").trim().replace(/^\/+/, "");
  if (!path || path.length > 120) {
    return NextResponse.json({ error: "chemin invalide" }, { status: 400 });
  }
  const language = body.language ?? guessLanguage(path);

  const file = await db.workspaceFile.upsert({
    where: { owner_path: { owner: me.username, path } },
    create: { owner: me.username, path, content: body.content ?? "", language },
    update: { content: body.content ?? "", language },
  });

  return NextResponse.json({
    file: { id: file.id, path: file.path, content: file.content, language: file.language, updatedAt: file.updatedAt.toISOString() },
  });
}

export async function DELETE(req: NextRequest) {
  const me = await requireDev(req);
  if (!me) return NextResponse.json({ error: "non authentifié" }, { status: 401 });

  const path = req.nextUrl.searchParams.get("path") ?? "";
  await db.workspaceFile.deleteMany({ where: { owner: me.username, path } });
  return NextResponse.json({ ok: true });
}

function guessLanguage(path: string): string {
  const ext = path.split(".").pop()?.toLowerCase() ?? "";
  const map: Record<string, string> = {
    js: "javascript", mjs: "javascript", jsx: "javascript",
    ts: "typescript", tsx: "typescript",
    json: "json", css: "css", html: "html", md: "markdown",
    go: "go", py: "python", sql: "sql", yml: "yaml", yaml: "yaml", sh: "shell",
  };
  return map[ext] ?? "plaintext";
}
