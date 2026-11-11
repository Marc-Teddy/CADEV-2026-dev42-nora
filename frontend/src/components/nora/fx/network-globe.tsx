"use client";

/* ============================================================
   NORA — Globe réseau 3D (three.js, sans dépendance R3F).
   Sphère de nœuds + arcs de connexions, rotation lente,
   parallaxe pointeur, palette violette de la charte.
   Vivant : impulsions lumineuses qui voyagent le long des arcs,
   ondes radar qui se propagent, respiration du noyau, scintillement.
   Adapté au thème : noyau nuit en mode sombre, noyau lavande
   pâle en mode clair (transition fondue automatique).
   Performance : points partagés, DPR plafonné, pause hors écran,
   respects prefers-reduced-motion.
   ============================================================ */

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function NetworkGlobe({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.15, 6.4);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      return; // WebGL indisponible : rien à rendre
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    /* ----- palettes par thème : sombre = nuit (défaut), clair = lavande pâle ----- */
    const THEMES = {
      dark: {
        core: new THREE.Color("#14102a"),
        coreOpacity: 0.82,
        halo: new THREE.Color("#7c4df0"),
        haloOpacity: 0.07,
        nodeA: new THREE.Color("#a78bfa"),
        nodeB: new THREE.Color("#60a5fa"),
        nodeC: new THREE.Color("#00e0b0"),
        arcTint: new THREE.Color("#ffffff"),
        arcOpacity: 0.5,
        pulse: new THREE.Color("#7ef0cf"),
        ring: new THREE.Color("#a78bfa"),
      },
      light: {
        /* noyau lavande clair : l'orbe reste un globe lisible sur fond gris
           tamisé, nœuds approfondis pour garder le contraste */
        core: new THREE.Color("#e9e3f8"),
        coreOpacity: 0.92,
        halo: new THREE.Color("#7c3aed"),
        haloOpacity: 0.1,
        nodeA: new THREE.Color("#7c3aed"),
        nodeB: new THREE.Color("#2563eb"),
        nodeC: new THREE.Color("#0c9d77"),
        arcTint: new THREE.Color("#b0a0e4"),
        arcOpacity: 0.55,
        pulse: new THREE.Color("#0a8f6f"),
        ring: new THREE.Color("#7c3aed"),
      },
    } as const;

    const readTheme = (): keyof typeof THEMES =>
      document.documentElement.classList.contains("dark") ? "dark" : "light";

    let target = THEMES[readTheme()];
    /* suit le basculement de thème (next-themes pose .dark sur <html>) */
    const themeMo = new MutationObserver(() => {
      target = THEMES[readTheme()];
    });
    themeMo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    /* ----- noyau : l'orbe devient un vrai globe, visible ----- */
    const coreGeo = new THREE.SphereGeometry(2.08, 48, 48);
    const coreMat = new THREE.MeshBasicMaterial({
      color: target.core.clone(),
      transparent: true,
      opacity: target.coreOpacity,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    /* léger halo interne violet pour la profondeur */
    const haloGeo = new THREE.SphereGeometry(2.2, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: target.halo.clone(),
      transparent: true,
      opacity: target.haloOpacity,
      side: THREE.BackSide,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    group.add(halo);

    /* ----- nœuds : sphère fibonacci ----- */
    const N = 320;
    const positions = new Float32Array(N * 3);
    const seeds = new Float32Array(N);
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = phi * i;
      positions[i * 3] = Math.cos(th) * r * 2.1;
      positions[i * 3 + 1] = y * 2.1;
      positions[i * 3 + 2] = Math.sin(th) * r * 2.1;
      seeds[i] = Math.random();
    }
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    nodeGeo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    const nodeMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: target.nodeA.clone() },
        uColorB: { value: target.nodeB.clone() },
        uColorC: { value: target.nodeC.clone() },
      },
      vertexShader: /* glsl */ `
        attribute float aSeed;
        uniform float uTime;
        varying float vSeed;
        varying float vTwinkle;
        void main() {
          vSeed = aSeed;
          vTwinkle = 0.62 + 0.38 * sin(uTime * (1.1 + aSeed * 1.6) + aSeed * 40.0);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = (2.2 + aSeed * 2.8) * (12.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColorA; uniform vec3 uColorB; uniform vec3 uColorC;
        varying float vSeed; varying float vTwinkle;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.08, d) * vTwinkle;
          vec3 c = vSeed > 0.965 ? uColorC : mix(uColorA, uColorB, vSeed);
          gl_FragColor = vec4(c, alpha);
        }
      `,
    });
    const nodes = new THREE.Points(nodeGeo, nodeMat);
    group.add(nodes);

    /* ----- arcs : grandes connexions violet→bleu -----
       arcTint sert de multiplicateur : blanc en sombre, teinte
       violacée profonde en clair pour que les arcs restent nets. */
    const arcMat = new THREE.LineBasicMaterial({
      transparent: true,
      opacity: target.arcOpacity,
      color: target.arcTint.clone(),
      vertexColors: true,
    });
    const arcGroup = new THREE.Group();
    group.add(arcGroup);
    const cA = new THREE.Color("#8b5cf6");
    const cB = new THREE.Color("#3b82f6");
    const v = (i: number) => new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
    const arcPaths: THREE.Vector3[][] = []; // polices de points pour les impulsions
    for (let k = 0; k < 26; k++) {
      const i = Math.floor(Math.random() * N);
      const j = Math.floor(Math.random() * N);
      if (i !== j) {
        const mid = v(i).clone().add(v(j)).multiplyScalar(0.5).normalize().multiplyScalar(2.1 + v(i).distanceTo(v(j)) * 0.32);
        const pts = new THREE.QuadraticBezierCurve3(v(i), mid, v(j)).getPoints(24);
        arcPaths.push(pts);
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const cols = new Float32Array(pts.length * 3);
        pts.forEach((_, n) => {
          const t = n / (pts.length - 1);
          const c = cA.clone().lerp(cB, t);
          cols[n * 3] = c.r; cols[n * 3 + 1] = c.g; cols[n * 3 + 2] = c.b;
        });
        geo.setAttribute("color", new THREE.BufferAttribute(cols, 3));
        arcGroup.add(new THREE.Line(geo, arcMat));
      }
    }

    /* ----- impulsions : points lumineux qui parcourent les arcs ----- */
    const NP = Math.min(14, arcPaths.length);
    const pulseGeo = new THREE.BufferGeometry();
    const pulsePos = new Float32Array(NP * 3);
    pulseGeo.setAttribute("position", new THREE.BufferAttribute(pulsePos, 3));
    const pulseMat = new THREE.PointsMaterial({
      size: 0.1,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      color: target.pulse.clone(),
    });
    const pulsePts = new THREE.Points(pulseGeo, pulseMat);
    group.add(pulsePts);
    const pulses = Array.from({ length: NP }, () => ({
      path: Math.floor(Math.random() * arcPaths.length),
      t: Math.random(),
      speed: 0.12 + Math.random() * 0.22,
    }));

    /* ----- ondes radar : anneaux qui se propagent depuis l'équateur ----- */
    const ringGeo = new THREE.RingGeometry(0.985, 1.0, 72);
    const rings = Array.from({ length: 3 }, (_, i) => {
      const mat = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false,
        color: target.ring.clone(),
      });
      const m = new THREE.Mesh(ringGeo, mat);
      m.rotation.x = Math.PI / 2; // plan équatorial, effet radar
      m.scale.setScalar(0.001);
      group.add(m);
      return { mesh: m, mat, offset: i / 3 };
    });

    /* ----- resize + boucle ----- */
    const resize = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(el);

    const pointer = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      pointer.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let raf = 0;
    let elapsed = 0;
    const clock = new THREE.Clock();
    const tmpA = new THREE.Vector3();
    const tmpB = new THREE.Vector3();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      elapsed += dt;
      nodeMat.uniforms.uTime.value += dt;

      /* fondu en douceur vers la palette du thème actif */
      const k = Math.min(1, dt * 5);
      coreMat.color.lerp(target.core, k);
      coreMat.opacity += (target.coreOpacity - coreMat.opacity) * k;
      haloMat.color.lerp(target.halo, k);
      haloMat.opacity += (target.haloOpacity - haloMat.opacity) * k;
      (nodeMat.uniforms.uColorA.value as THREE.Color).lerp(target.nodeA, k);
      (nodeMat.uniforms.uColorB.value as THREE.Color).lerp(target.nodeB, k);
      (nodeMat.uniforms.uColorC.value as THREE.Color).lerp(target.nodeC, k);
      arcMat.color.lerp(target.arcTint, k);
      arcMat.opacity += (target.arcOpacity - arcMat.opacity) * k;
      pulseMat.color.lerp(target.pulse, k);
      for (const r of rings) r.mat.color.lerp(target.ring, k);

      if (!reduced) {
        group.rotation.y += dt * 0.12;
        group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, pointer.y * 0.18, 0.04);
        group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, pointer.x * 0.06, 0.04);
        arcGroup.rotation.y -= dt * 0.03;

        /* respiration du noyau + flottement doux du globe */
        const breathe = 1 + 0.014 * Math.sin(elapsed * 0.9);
        core.scale.setScalar(breathe);
        halo.scale.setScalar(1 + 0.02 * Math.sin(elapsed * 0.9 + 0.6));
        haloMat.opacity = (coreMat.opacity - 0.7) * 0.35 + target.haloOpacity * (1 + 0.3 * Math.sin(elapsed * 1.25));
        group.position.y = 0.06 * Math.sin(elapsed * 0.45);

        /* impulsions lumineuses le long des arcs */
        for (let p = 0; p < pulses.length; p++) {
          const pu = pulses[p];
          pu.t += dt * pu.speed;
          if (pu.t >= 1) { pu.t = 0; pu.path = Math.floor(Math.random() * arcPaths.length); pu.speed = 0.12 + Math.random() * 0.22; }
          const pts = arcPaths[pu.path];
          const f = pu.t * (pts.length - 1);
          const i0 = Math.floor(f); const i1 = Math.min(pts.length - 1, i0 + 1); const fr = f - i0;
          tmpA.copy(pts[i0]).lerp(tmpB.copy(pts[i1]), fr);
          pulsePos[p * 3] = tmpA.x; pulsePos[p * 3 + 1] = tmpA.y; pulsePos[p * 3 + 2] = tmpA.z;
        }
        pulseGeo.attributes.position.needsUpdate = true;

        /* ondes radar équatoriales */
        for (const r of rings) {
          const prog = (elapsed * 0.16 + r.offset) % 1;
          const s = 0.55 + prog * 2.05;
          r.mesh.scale.setScalar(s);
          r.mat.opacity = 0.26 * Math.sin(Math.PI * prog) * (1 - prog * 0.35);
        }
      }
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      themeMo.disconnect();
      window.removeEventListener("pointermove", onPointer);
      renderer.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
      });
      arcMat.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
      ringGeo.dispose();
      for (const r of rings) r.mat.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={host} className={className} aria-hidden />;
}
