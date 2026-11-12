/* Fichiers d'amorce du Studio NORA (repris de l'API Next historique). */

export const WORKSPACE_STARTERS = [
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

export function guessLanguage(path) {
  const ext = path.split(".").pop()?.toLowerCase() ?? '';
  const map = {
    js: "javascript", mjs: "javascript", jsx: "javascript",
    ts: "typescript", tsx: "typescript",
    json: "json", css: "css", html: "html", md: "markdown",
    go: "go", py: "python", sql: "sql", yml: "yaml", yaml: "yaml", sh: "shell",
  };
  return map[ext] ?? "plaintext";
}
