/* ============================================================
   NORA — Marque « N » en blocs pixelisés (dégradé vert-lime ->
   magenta). Source unique de la forme du logo : utilisée par le
   logo de la page (topbar, landing, auth) et par le splash animé.
   ============================================================ */

export const COLS = 12;
export const ROWS = 10;

export type Cell = { c: number; r: number };

/* Lettre « N » : jambage gauche, diagonale haut-gauche -> bas-droite,
   jambage droit. */
export function buildN(): Cell[] {
  const cells: Cell[] = [];
  const push = (c: number, r: number) => cells.push({ c, r });
  const TOP = 1;
  const BOT = 8;
  for (let r = TOP; r <= BOT; r++) {
    push(2, r);
    push(3, r);
  }
  for (let r = TOP; r <= BOT; r++) {
    push(8, r);
    push(9, r);
  }
  for (let r = TOP; r <= BOT; r++) {
    const c = 3 + Math.round(((r - TOP) * 5) / (BOT - TOP));
    push(c, r);
    push(c + 1, r);
  }
  const seen = new Set<string>();
  return cells.filter(({ c, r }) => {
    const k = `${c},${r}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/* Dégradé : vert-lime (bas-gauche) -> jaune -> orange -> rose -> magenta (haut-droite). */
const STOPS: [number, [number, number, number]][] = [
  [0.0, [166, 226, 46]],
  [0.3, [250, 204, 21]],
  [0.55, [249, 115, 22]],
  [0.78, [244, 63, 125]],
  [1.0, [208, 38, 143]],
];

export function cellColor(c: number, r: number): string {
  const v = (c / (COLS - 1) + (ROWS - 1 - r) / (ROWS - 1)) / 2;
  let lo = STOPS[0];
  let hi = STOPS[STOPS.length - 1];
  for (let i = 0; i < STOPS.length - 1; i++) {
    if (v >= STOPS[i][0] && v <= STOPS[i + 1][0]) {
      lo = STOPS[i];
      hi = STOPS[i + 1];
      break;
    }
  }
  const t = hi[0] === lo[0] ? 0 : (v - lo[0]) / (hi[0] - lo[0]);
  const mix = (a: number, b: number) => Math.round(a + (b - a) * t);
  const [r1, g1, b1] = lo[1];
  const [r2, g2, b2] = hi[1];
  return `rgb(${mix(r1, r2)}, ${mix(g1, g2)}, ${mix(b1, b2)})`;
}

/* viewBox ajustée aux blocs du « N » (colonnes 2..9, lignes 1..8). */
export const N_VIEWBOX = "18 8 84 84";

/* Logo statique de la page. */
export function NMark({ size = 32, glow = true }: { size?: number; glow?: boolean }) {
  const cells = buildN();
  const fid = "nmark-glow";
  return (
    <svg width={size} height={size} viewBox={N_VIEWBOX} aria-hidden>
      {glow && (
        <defs>
          <filter id={fid} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )}
      <g filter={glow ? `url(#${fid})` : undefined}>
        {cells.map(({ c, r }) => (
          <rect
            key={`${c}-${r}`}
            x={c * 10 + 1}
            y={r * 10 + 1}
            width={8}
            height={8}
            rx={1.6}
            fill={cellColor(c, r)}
          />
        ))}
      </g>
    </svg>
  );
}
