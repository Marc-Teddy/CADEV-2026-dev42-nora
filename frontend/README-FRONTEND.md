# NORA — Frontend (partie UI/UX de l'équipe dev42)

> La plateforme de référence des développeurs africains — CADEV 2026.
> Démo interactive : accueil, connexion, inscription, dashboard, profils, fil, projets, salons, challenges, missions, studio IA.

## 🚀 Lancer le projet

```bash
bun install        # ou npm install
bun run dev        # http://localhost:3000
```

## 🎨 Design system — 3 couleurs majeures

| Nom | Hex | Rôle |
|---|---|---|
| **Soleil** | `#FF7A1F` | Couleur primaire : énergie, CTA, créativité |
| **Or** | `#F2B33D` | Réputation, badges, réussite, dégradés avec le Soleil |
| **Sahel** | `#2DBE78` | Succès, présence en ligne, croissance |

Base sombre chaude : `#0B0907` (nuit d'Afrique), surfaces `#14110D`, texte écume `#F7F2EA`.
Typographies : **Space Grotesk** (titres), **Inter** (texte), **JetBrains Mono** (code).
Motifs : bande *kente* CSS (`KenteStrip`), grille de points, carte d'Afrique (`AfricaMap`).

## 🗂 Structure

```
src/
├── app/
│   ├── layout.tsx          # fonts + metadata NORA
│   ├── page.tsx            # routeur de vues SPA (AnimatePresence)
│   └── globals.css         # tokens de design + motifs + animations
├── lib/
│   ├── types.ts            # types du domaine (Dev, Project, Post…)
│   ├── data.ts             # données de démo réalistes (14 devs, 8 projets…)
│   ├── api.ts              # couche API mockée → remplacer par fetch vers le backend Go
│   └── store.ts            # zustand : vue courante, auth, likes/follows
└── components/nora/
    ├── shared.tsx          # Logo, NoraAvatar, AfricaMap, KenteStrip, badges
    ├── landing.tsx         # accueil : hero, bento, parcours, hackathon, mentors, footer
    ├── auth.tsx            # connexion + inscription 2 étapes
    ├── shell.tsx           # sidebar, topbar, ⌘K, barre mobile
    └── views/              # dashboard, feed, explore (projets+devs),
                            # profile, salons (chat), challenges, extra (missions+studio)
```

## 🔌 Brancher le backend Go

Dans `src/lib/api.ts`, chaque résolveur (`getDevs`, `getFeed`, `getMessages`…) est déjà
signé comme un appel réseau. Il suffit de remplacer le corps mocké :

```ts
async getFeed() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/feed`);
  return res.json();
}
```

L'état global (zustand) et les composants n'ont pas besoin de changer.

## ✨ Points forts pour le jury

- **Responsive** : desktop, tablette, mobile (barre d'onglets inférieure) — pensé mobile-first.
- **Mode léger** : toggle dans la navbar et le footer qui coupe les animations décoratives
  et les fonds (vision « connexions lentes / 2G-3G » du cahier des charges).
- **Palette de commandes ⌘K** : navigation clavier pro.
- **Micro-interactions** : toasts, likes/follows optimistes, agent IA qui « tape » en direct,
  countdown hackathon temps réel, message live simulé dans les salons.
- **Accessibilité** : HTML sémantique, aria-labels, contrastes élevés.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui · framer-motion · zustand · recharts · sonner

---
Fait avec 🧡 à Cotonou pour le CADEV 2026 — Équipe dev42
