"use client";

import { useEffect, useRef } from "react";

/**
 * Realistic 3D die for the game cover (three.js, loaded on demand).
 * Ivory resin body, engraved pips (one olive "lie" pip per face), soft contact shadow.
 * Idle: slow turn + bob. Drag: turn by hand with momentum. Click/tap: toss, two bounces, settle on a flat face.
 * Renders only while on screen. Reports failure (no WebGL) so the caller can show the CSS cube instead.
 * Reduced motion: no idle turn/bob/toss; drag still works and a click just turns the die to a new face.
 */
export function Dice3D({ onFail }: { onFail: () => void }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};

    const start = async () => {
      let THREE: typeof import("three");
      let RoundedBoxGeometry: typeof import("three/examples/jsm/geometries/RoundedBoxGeometry.js").RoundedBoxGeometry;
      let RoomEnvironment: typeof import("three/examples/jsm/environments/RoomEnvironment.js").RoomEnvironment;
      const load = async () => ({
        THREE: await import("three"),
        geo: await import("three/examples/jsm/geometries/RoundedBoxGeometry.js"),
        env: await import("three/examples/jsm/environments/RoomEnvironment.js"),
      });
      try {
        let m;
        try { m = await load(); } catch { await new Promise((r) => setTimeout(r, 800)); m = await load(); } // one retry (stale dev chunks, flaky network)
        THREE = m.THREE; RoundedBoxGeometry = m.geo.RoundedBoxGeometry; RoomEnvironment = m.env.RoomEnvironment;
      } catch { if (!disposed) onFail(); return; }
      if (disposed) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // default GPU: forcing the discrete GPU can trigger GPU switches/context loss on dual-GPU laptops
      } catch { onFail(); return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.debug.onShaderError = () => { if (!disposed) onFail(); };
      const canvas = renderer.domElement;
      canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
      canvas.setAttribute("aria-hidden", "true");
      el.appendChild(canvas);

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
      const scene = new THREE.Scene();
      const pm = new THREE.PMREMGenerator(renderer);
      const envRT = pm.fromScene(new RoomEnvironment(), 0.04);
      scene.environment = envRT.texture;
      scene.environmentIntensity = 0.55;
      const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
      cam.position.set(0, 3.4, 6.6);
      cam.lookAt(0, -0.05, 0);
      const key = new THREE.DirectionalLight(0xfff1dc, 2.6); key.position.set(-3.5, 6, 4); scene.add(key);
      const rim = new THREE.DirectionalLight(0xb9c24a, 1.4); rim.position.set(4, 2.5, -4); scene.add(rim);

      // Soft contact shadow (a baked radial gradient, scaled with the die's height).
      const sc = document.createElement("canvas"); sc.width = sc.height = 256;
      { const g = sc.getContext("2d")!; const gr = g.createRadialGradient(128, 128, 0, 128, 128, 128);
        gr.addColorStop(0, "rgba(0,0,0,.85)"); gr.addColorStop(0.45, "rgba(0,0,0,.45)"); gr.addColorStop(1, "rgba(0,0,0,0)");
        g.fillStyle = gr; g.fillRect(0, 0, 256, 256); }
      const shadowTex = new THREE.CanvasTexture(sc);
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 3.4), new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, opacity: 0.9 }));
      floor.rotation.x = -Math.PI / 2; floor.position.set(0.15, -1.2, 0.1); scene.add(floor);

      // Texture atlas (3x2 cells: +x -x +y -y +z -z) for colour / engraving / roughness.
      const ORDER = ["px", "nx", "py", "ny", "pz", "nz"] as const;
      const NUM: Record<(typeof ORDER)[number], number> = { px: 3, nx: 4, py: 1, ny: 6, pz: 2, nz: 5 };
      const PIPS: Record<number, number[]> = { 1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] };
      const BODY = "#ece3d3", PIP = "#1c1b19", LIE = "#8f9a22", CS = 512;
      const atlas = (kind: "color" | "bump" | "rough") => {
        const c = document.createElement("canvas"); c.width = CS * 3; c.height = CS * 2;
        const g = c.getContext("2d")!;
        g.fillStyle = kind === "color" ? BODY : "#fff"; g.fillRect(0, 0, c.width, c.height);
        if (kind === "color") for (let i = 0; i < 9000; i++) { g.fillStyle = `rgba(${Math.random() < 0.5 ? "0,0,0" : "255,255,255"},${Math.random() * 0.035})`; g.fillRect(Math.random() * c.width, Math.random() * c.height, 2, 2); }
        ORDER.forEach((f, ci) => {
          const ox = (ci % 3) * CS, oy = Math.floor(ci / 3) * CS, pips = PIPS[NUM[f]];
          pips.forEach((p, k) => {
            const x = ox + CS * [0.27, 0.5, 0.73][p % 3], y = oy + CS * [0.27, 0.5, 0.73][Math.floor(p / 3)], R = CS * 0.095;
            if (kind === "color") { g.fillStyle = k === pips.length - 1 ? LIE : PIP; g.beginPath(); g.arc(x, y, R * 1.04, 0, 7); g.fill(); }
            else if (kind === "bump") {
              const gr = g.createRadialGradient(x, y, 0, x, y, R * 1.12);
              gr.addColorStop(0, "#000"); gr.addColorStop(0.78, "#2a2a2a"); gr.addColorStop(0.97, "#9a9a9a"); gr.addColorStop(1, "#fff");
              g.fillStyle = gr; g.beginPath(); g.arc(x, y, R * 1.12, 0, 7); g.fill();
            } else { g.fillStyle = "#bbb"; g.beginPath(); g.arc(x, y, R * 1.1, 0, 7); g.fill(); }
          });
        });
        const t = new THREE.CanvasTexture(c); t.anisotropy = 8; if (kind === "color") t.colorSpace = THREE.SRGBColorSpace; return t;
      };
      const geo = new RoundedBoxGeometry(1.7, 1.7, 1.7, 8, 0.2);
      { const uv = geo.attributes.uv, nr = geo.attributes.normal;
        for (let i = 0; i < uv.count; i++) {
          const x = nr.getX(i), y = nr.getY(i), z = nr.getZ(i), ax = Math.abs(x), ay = Math.abs(y), az = Math.abs(z);
          const f = ax >= ay && ax >= az ? (x > 0 ? "px" : "nx") : ay >= az ? (y > 0 ? "py" : "ny") : z > 0 ? "pz" : "nz";
          const ci = ORDER.indexOf(f), cu = ci % 3, cv = Math.floor(ci / 3), u = Math.min(Math.max(uv.getX(i), 0), 1), v = Math.min(Math.max(uv.getY(i), 0), 1);
          uv.setXY(i, (cu + u) / 3, 1 - (cv + 1 - v) / 2);
        } }
      const maps = [atlas("color"), atlas("bump"), atlas("rough")];
      const mat = new THREE.MeshPhysicalMaterial({
        map: maps[0], bumpMap: maps[1], bumpScale: -5, roughnessMap: maps[2], roughness: 0.32, metalness: 0,
        clearcoat: 0.7, clearcoatRoughness: 0.18, sheen: 0.3, sheenRoughness: 0.6, sheenColor: new THREE.Color("#fff3df"),
      });
      const die = new THREE.Mesh(geo, mat);
      const pivot = new THREE.Group(); pivot.add(die); scene.add(pivot);
      die.quaternion.setFromEuler(new THREE.Euler(-0.5, 0.62, 0.1));

      // Interaction state
      type Roll = { t: number; dur: number; w: import("three").Vector3 };
      let drag: { x: number; y: number; moved: number } | null = null;
      let rolling: Roll | null = null;
      let settle: { q: import("three").Quaternion; t: number } | null = null;
      const omega = new THREE.Vector3(0, 0.35, 0);
      const tmpQ = new THREE.Quaternion(), ax = new THREE.Vector3(), UP = new THREE.Vector3(0, 1, 0);
      const spin = (vx: number, vy: number, dt: number) => {
        ax.set(vy, vx, 0); const a = ax.length();
        if (a > 1e-6) { tmpQ.setFromAxisAngle(ax.normalize(), a * dt); die.quaternion.premultiply(tmpQ); }
      };
      const settleTarget = () => {
        let best = new THREE.Vector3(0, 1, 0), bd = -2;
        for (const n of [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]) {
          const v = new THREE.Vector3(n[0], n[1], n[2]).applyQuaternion(die.quaternion), d = v.dot(UP);
          if (d > bd) { bd = d; best = v; }
        }
        return new THREE.Quaternion().setFromUnitVectors(best, UP).multiply(die.quaternion.clone());
      };
      const roll = () => {
        if (rolling || settle) return;
        if (reduce.matches) {
          tmpQ.setFromAxisAngle(new THREE.Vector3(Math.random() < 0.5 ? 1 : 0, 0, Math.random() < 0.5 ? 0 : 1).normalize(), Math.PI / 2);
          die.quaternion.premultiply(tmpQ); settle = { q: settleTarget(), t: 0 }; return;
        }
        rolling = { t: 0, dur: 2.3, w: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(16 + Math.random() * 6) };
      };

      const onDown = (e: PointerEvent) => { drag = { x: e.clientX, y: e.clientY, moved: 0 }; el.setPointerCapture(e.pointerId); };
      const onMove = (e: PointerEvent) => {
        if (!drag || rolling) return;
        const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
        drag.moved += Math.abs(dx) + Math.abs(dy); spin(dx * 0.012, dy * 0.012, 1);
        omega.set(dy * 0.5, dx * 0.5, 0); drag.x = e.clientX; drag.y = e.clientY;
      };
      const onUp = () => { if (drag && drag.moved < 6) roll(); drag = null; };
      el.addEventListener("pointerdown", onDown); el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerup", onUp); el.addEventListener("pointercancel", () => { drag = null; });

      let last = 0, t0 = 0, raf = 0, visible = false;
      const frame = (now: number) => {
        raf = 0;
        if (!visible || document.hidden) { last = 0; return; }
        if (!t0) t0 = now;
        const dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016; last = now;
        const t = (now - t0) / 1000;
        let h = 0;
        if (rolling) {
          rolling.t += dt; const u = Math.min(rolling.t / rolling.dur, 1);
          const b = (p: number, H: number) => H * Math.max(0, 4 * p * (1 - p));
          if (u < 0.42) h = b(u / 0.42, 1.55); else if (u < 0.7) h = b((u - 0.42) / 0.28, 0.5); else if (u < 0.86) h = b((u - 0.7) / 0.16, 0.14);
          const decay = Math.pow(1 - u, 2.2); spin(rolling.w.x * decay, rolling.w.y * decay, dt);
          if (u >= 1) { rolling = null; settle = { q: settleTarget(), t: 0 }; }
        } else if (settle) {
          settle.t += dt; die.quaternion.slerp(settle.q, Math.min(1, settle.t * 6));
          if (settle.t > 0.5) { settle = null; omega.set(0, 0.35, 0); }
        } else if (!drag && !reduce.matches) {
          spin(omega.x * 0.5, omega.y, dt); omega.multiplyScalar(Math.pow(0.2, dt));
          if (omega.length() < 0.35) omega.y += (0.35 - omega.y) * dt * 0.8;
        } else if (!drag) { spin(omega.x * 0.5, omega.y, dt); omega.multiplyScalar(Math.pow(0.05, dt)); }
        pivot.position.y = h + (reduce.matches || rolling ? 0 : Math.sin(t * 1.3) * 0.06);
        const lift = pivot.position.y;
        floor.material.opacity = 0.9 * Math.max(0.45, 1 - lift * 0.28);
        floor.scale.set(1.1 - lift * 0.12, 1.1 - lift * 0.12, 1);
        try { renderer.render(scene, cam); } catch { onFail(); return; }
        raf = requestAnimationFrame(frame);
      };
      const kick = () => { if (!raf && visible) raf = requestAnimationFrame(frame); };
      const size = () => {
        const r = el.getBoundingClientRect(); if (!r.width || !r.height) return;
        renderer.setSize(r.width, r.height, false); cam.aspect = r.width / r.height; cam.updateProjectionMatrix();
        if (!visible || !raf) renderer.render(scene, cam);
      };
      // three.js already calls preventDefault on "webglcontextlost" so the browser can restore it; resume drawing when it does.
      const onRestored = () => { last = 0; kick(); };
      canvas.addEventListener("webglcontextrestored", onRestored);
      const ro = new ResizeObserver(size); ro.observe(el); size();
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); }, { threshold: 0.05 });
      io.observe(el);
      const onVis = () => kick(); document.addEventListener("visibilitychange", onVis);

      cleanup = () => {
        cancelAnimationFrame(raf); canvas.removeEventListener("webglcontextrestored", onRestored); ro.disconnect(); io.disconnect(); document.removeEventListener("visibilitychange", onVis);
        el.removeEventListener("pointerdown", onDown); el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerup", onUp);
        geo.dispose(); mat.dispose(); maps.forEach((m) => m.dispose()); shadowTex.dispose(); floor.geometry.dispose(); floor.material.dispose();
        envRT.dispose(); pm.dispose(); renderer.dispose(); renderer.forceContextLoss(); canvas.remove();
      };
    };

    // Create the WebGL context only once the die is near the viewport (the game sits far down the page).
    const wake = new IntersectionObserver(([e]) => { if (e.isIntersecting) { wake.disconnect(); start(); } }, { rootMargin: "300px" });
    wake.observe(el);

    return () => { disposed = true; wake.disconnect(); cleanup(); };
  }, [onFail]);

  return <div ref={host} className="absolute inset-0" style={{ touchAction: "pan-y" }} />;
}
