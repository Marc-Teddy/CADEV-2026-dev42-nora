"use client";

/* ============================================================
   NORA — Champ de points WebGL (le seul moment shader du site)
   Grille de points vert atténué qui respire (bruit) et s'aimante
   au curseur. Léger : un seul triangle plein écran, DPR plafonné,
   pause quand hors écran ou onglet caché, désactivable via le
   store (hero.fx) et sous prefers-reduced-motion (frame unique).
   ============================================================ */

import { useEffect, useRef } from "react";
import { useNora } from "@/lib/store";

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform vec2  u_res;
uniform vec2  u_mouse;
uniform float u_time;
uniform float u_dpr;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  vec2 frag = gl_FragCoord.xy / u_dpr;      // espace CSS
  vec2 cell = vec2(26.0, 26.0);
  vec2 id = floor(frag / cell);
  vec2 center = (id + 0.5) * cell;

  // dérive organique : chaque point respire lentement
  float n = hash(id) * 6.2831;
  center.x += sin(u_time * 0.5 + n) * 1.6;
  center.y += cos(u_time * 0.4 + n * 1.3) * 1.6;

  // attraction douce vers la souris (rayon ~180px)
  float md = distance(center, u_mouse);
  float pull = smoothstep(180.0, 0.0, md);
  vec2 toMouse = normalize(u_mouse - center + 0.0001);
  center += toMouse * pull * 6.0;

  float d = distance(frag, center);
  float base = 0.10 + 0.10 * hash(id + floor(u_time * 0.3));
  float lit = smoothstep(4.2, 0.0, d) * (base + pull * 0.85);

  // vert signal atténué ; proche souris -> vert vif, halo chaud au centre
  vec3 dim   = vec3(0.122, 0.478, 0.271);  // #1F7A45
  vec3 live  = vec3(0.239, 1.0, 0.545);    // #3DFF8B
  vec3 col = mix(dim, live, clamp(pull * 1.2 + lit * 0.25, 0.0, 1.0));

  gl_FragColor = vec4(col, clamp(lit, 0.0, 0.9));
}
`;

export function WebglField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const webgl = useNora((s) => s.webgl);

  useEffect(() => {
    if (!webgl) return;
    const canvas = ref.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: false });
    if (!gl) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---- pipeline ---- */
    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = {
      res: gl.getUniformLocation(prog, "u_res"),
      mouse: gl.getUniformLocation(prog, "u_mouse"),
      time: gl.getUniformLocation(prog, "u_time"),
      dpr: gl.getUniformLocation(prog, "u_dpr"),
    };

    /* ---- sizing (DPR plafonné à 1.5) ---- */
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0, h = 0;
    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    /* ---- souris lissée, en coordonnées canvas ---- */
    const mouse = { x: -999, y: -999, tx: -999, ty: -999 };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    /* ---- visibilité : on ne rend que si nécessaire ---- */
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
    io.observe(canvas);

    const draw = (t: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;
      gl.uniform2f(U.res, w, h);
      gl.uniform2f(U.mouse, mouse.x, h - mouse.y);
      gl.uniform1f(U.time, t / 1000);
      gl.uniform1f(U.dpr, dpr);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    if (reduced) {
      draw(0); // frame unique statique
    } else {
      let raf = 0;
      const loop = (t: number) => {
        if (visible && !document.hidden) draw(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      return () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onMove);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    }

    return () => {
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [webgl]);

  if (!webgl) return null;

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`webgl-field pointer-events-none absolute inset-0 ${className}`}
    />
  );
}
