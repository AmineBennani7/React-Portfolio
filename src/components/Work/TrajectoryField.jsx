import { useEffect, useRef } from "react";
import data from "../../data/trajectories.json";
import { useReducedMotion } from "../../lib/hooks";
import styles from "./TrajectoryField.module.css";

// Colours per trajectory (the van carries the injected speed anomaly, so it gets the warm tone).
const COLORS = {
  "SEV-TAXI-03_2026-03-11": "169, 192, 255",
  "SEV-VAN-02_2026-03-10": "231, 182, 90",
  "SEV-VEH-01_2026-03-10": "93, 139, 255",
  "SEV-VEH-01_2026-03-11": "236, 234, 228",
};
const PROBE_RADIUS_M = 180;
const LOOP_SECONDS = 15; // wall-clock seconds for the longest trajectory
const HOLD_SECONDS = 2.5; // pause on the finished picture before replaying

const tracks = data.trajectories;
const maxT = Math.max(...tracks.map((t) => t.points[t.points.length - 1][2]));
const totalFixes = tracks.reduce((n, t) => n + t.points.length, 0);

const bounds = (() => {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const t of tracks) {
    for (const [x, y] of t.points) {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
  return { minX, minY, maxX, maxY };
})();

function pointInRing(x, y, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

const fmt = new Intl.NumberFormat("en-GB");

export function TrajectoryField() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const readoutRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const readout = readoutRef.current;
    const ctx = canvas.getContext("2d");
    const staticLayer = document.createElement("canvas");
    const sctx = staticLayer.getContext("2d");

    let dpr = 1, w = 0, h = 0, scale = 1, ox = 0, oy = 0;
    let screen = []; // per track: Float32Array of [x, y] in CSS pixels
    let raf = 0, running = false, visible = true;
    let start = performance.now();
    const pointer = { x: 0, y: 0, active: false };

    const toScreen = (x, y) => [ox + (x - bounds.minX) * scale, oy + (y - bounds.minY) * scale];
    const toWorld = (sx, sy) => [(sx - ox) / scale + bounds.minX, (sy - oy) / scale + bounds.minY];

    function layout() {
      const rect = wrap.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      for (const c of [canvas, staticLayer]) {
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
      }
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const pad = Math.min(w, h) * 0.08;
      const bw = bounds.maxX - bounds.minX;
      const bh = bounds.maxY - bounds.minY;
      scale = Math.min((w - pad * 2) / bw, (h - pad * 2) / bh);
      ox = (w - bw * scale) / 2;
      oy = (h - bh * scale) / 2;

      screen = tracks.map((t) => {
        const arr = new Float32Array(t.points.length * 2);
        t.points.forEach(([x, y], i) => {
          const [sx, sy] = toScreen(x, y);
          arr[i * 2] = sx;
          arr[i * 2 + 1] = sy;
        });
        return arr;
      });
      drawStatic();
    }

    function drawStatic() {
      sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sctx.clearRect(0, 0, w, h);

      // Measurement grid, 250 m spacing
      sctx.strokeStyle = "rgba(236, 234, 228, 0.045)";
      sctx.lineWidth = 1;
      const step = 250 * scale;
      if (step > 12) {
        sctx.beginPath();
        for (let x = ox % step; x < w; x += step) {
          sctx.moveTo(Math.round(x) + 0.5, 0);
          sctx.lineTo(Math.round(x) + 0.5, h);
        }
        for (let y = oy % step; y < h; y += step) {
          sctx.moveTo(0, Math.round(y) + 0.5);
          sctx.lineTo(w, Math.round(y) + 0.5);
        }
        sctx.stroke();
      }

      // Geofence zones
      sctx.setLineDash([3, 5]);
      sctx.strokeStyle = "rgba(236, 234, 228, 0.16)";
      for (const z of data.zones) {
        sctx.beginPath();
        z.ring.forEach(([x, y], i) => {
          const [sx, sy] = toScreen(x, y);
          if (i) sctx.lineTo(sx, sy);
          else sctx.moveTo(sx, sy);
        });
        sctx.closePath();
        sctx.stroke();
      }
      sctx.setLineDash([]);

      // Full routes, very faint
      tracks.forEach((t, k) => {
        const s = screen[k];
        sctx.strokeStyle = `rgba(${COLORS[t.id]}, 0.13)`;
        sctx.lineWidth = 1;
        sctx.beginPath();
        for (let i = 0; i < s.length; i += 2) {
          if (i) sctx.lineTo(s[i], s[i + 1]);
          else sctx.moveTo(s[i], s[i + 1]);
        }
        sctx.stroke();
      });

      // Fixes rejected for low accuracy: hollow rings
      sctx.strokeStyle = "rgba(236, 234, 228, 0.35)";
      for (const [x, y] of data.lowAccuracy) {
        const [sx, sy] = toScreen(x, y);
        sctx.beginPath();
        sctx.arc(sx, sy, 3, 0, Math.PI * 2);
        sctx.stroke();
      }
    }

    function headIndex(points, t) {
      let lo = 0, hi = points.length - 1;
      if (t >= points[hi][2]) return hi;
      while (lo < hi - 1) {
        const mid = (lo + hi) >> 1;
        if (points[mid][2] <= t) lo = mid;
        else hi = mid;
      }
      return lo;
    }

    function drawFrame(now) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(staticLayer, 0, 0, w, h);

      const cycle = LOOP_SECONDS + HOLD_SECONDS;
      const elapsed = reduced ? cycle : ((now - start) / 1000) % cycle;
      const simT = Math.min(elapsed / LOOP_SECONDS, 1) * maxT;

      tracks.forEach((t, k) => {
        const s = screen[k];
        const pts = t.points;
        const i = headIndex(pts, simT);
        // interpolated head position
        let hx = s[i * 2], hy = s[i * 2 + 1];
        if (i < pts.length - 1) {
          const f = (simT - pts[i][2]) / (pts[i + 1][2] - pts[i][2] || 1);
          hx += (s[(i + 1) * 2] - hx) * f;
          hy += (s[(i + 1) * 2 + 1] - hy) * f;
        }
        const rgb = COLORS[t.id];

        // travelled path
        ctx.strokeStyle = `rgba(${rgb}, 0.42)`;
        ctx.lineWidth = 1.25;
        ctx.lineJoin = "round";
        ctx.beginPath();
        for (let j = 0; j <= i; j++) {
          if (j) ctx.lineTo(s[j * 2], s[j * 2 + 1]);
          else ctx.moveTo(s[0], s[1]);
        }
        ctx.lineTo(hx, hy);
        ctx.stroke();

        // bright tail
        const tail = Math.max(0, i - 14);
        ctx.strokeStyle = `rgba(${rgb}, 0.95)`;
        ctx.lineWidth = 1.75;
        ctx.beginPath();
        ctx.moveTo(s[tail * 2], s[tail * 2 + 1]);
        for (let j = tail + 1; j <= i; j++) ctx.lineTo(s[j * 2], s[j * 2 + 1]);
        ctx.lineTo(hx, hy);
        ctx.stroke();

        // head
        ctx.fillStyle = `rgba(${rgb}, 0.18)`;
        ctx.beginPath();
        ctx.arc(hx, hy, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgb(${rgb})`;
        ctx.beginPath();
        ctx.arc(hx, hy, 2.6, 0, Math.PI * 2);
        ctx.fill();
      });

      drawProbe();
    }

    function drawProbe() {
      if (!pointer.active) {
        readout.dataset.active = "false";
        return;
      }
      const r = PROBE_RADIUS_M * scale;
      const [wx, wy] = toWorld(pointer.x, pointer.y);
      let fixes = 0;
      const vehicles = new Set();
      ctx.fillStyle = "rgba(169, 192, 255, 1)";
      tracks.forEach((t, k) => {
        const s = screen[k];
        for (let i = 0; i < s.length; i += 2) {
          const dx = s[i] - pointer.x;
          const dy = s[i + 1] - pointer.y;
          if (dx * dx + dy * dy <= r * r) {
            fixes += 1;
            vehicles.add(t.vehicle);
            ctx.fillRect(s[i] - 1.25, s[i + 1] - 1.25, 2.5, 2.5);
          }
        }
      });
      const zone = data.zones.find((z) => pointInRing(wx, wy, z.ring));

      ctx.strokeStyle = "rgba(169, 192, 255, 0.85)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "rgba(93, 139, 255, 0.07)";
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(pointer.x - 6, pointer.y);
      ctx.lineTo(pointer.x + 6, pointer.y);
      ctx.moveTo(pointer.x, pointer.y - 6);
      ctx.lineTo(pointer.x, pointer.y + 6);
      ctx.stroke();

      readout.dataset.active = "true";
      readout.querySelector("[data-k=fixes]").textContent = fmt.format(fixes);
      readout.querySelector("[data-k=vehicles]").textContent = String(vehicles.size);
      readout.querySelector("[data-k=zone]").textContent = zone ? zone.name : "outside zones";
    }

    function loop(now) {
      drawFrame(now);
      if (running) raf = requestAnimationFrame(loop);
    }

    function startLoop() {
      if (running || reduced || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }
    function stopLoop() {
      running = false;
      cancelAnimationFrame(raf);
    }
    const redraw = () => {
      if (!running) requestAnimationFrame((t) => drawFrame(t));
    };

    function onPointerMove(e) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      pointer.active = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      pointer.x = x;
      pointer.y = y;
      redraw();
    }
    function onPointerLeave() {
      pointer.active = false;
      redraw();
    }

    const ro = new ResizeObserver(() => {
      layout();
      redraw();
    });
    ro.observe(wrap);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) startLoop();
      else stopLoop();
    });
    io.observe(wrap);
    const onVisibility = () => (document.hidden ? stopLoop() : startLoop());
    document.addEventListener("visibilitychange", onVisibility);

    const target = wrap.parentElement || wrap;
    target.addEventListener("pointermove", onPointerMove);
    target.addEventListener("pointerleave", onPointerLeave);

    layout();
    start = performance.now();
    if (reduced) redraw();
    else startLoop();

    return () => {
      stopLoop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      target.removeEventListener("pointermove", onPointerMove);
      target.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [reduced]);

  return (
    <figure className={styles.figure}>
      <div ref={wrapRef} className={styles.canvasWrap}>
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      </div>
      <div ref={readoutRef} className={styles.readout} data-active="false" aria-hidden="true">
        <div className={styles.readoutIdle}>
          <span>{tracks.length} trajectories</span>
          <span>{fmt.format(totalFixes)} fixes</span>
          <span>{data.zones.length} geofences</span>
        </div>
        <dl className={styles.readoutLive}>
          <div>
            <dt>Probe</dt>
            <dd>r {PROBE_RADIUS_M} m</dd>
          </div>
          <div>
            <dt>Fixes</dt>
            <dd data-k="fixes">0</dd>
          </div>
          <div>
            <dt>Vehicles</dt>
            <dd data-k="vehicles">0</dd>
          </div>
          <div>
            <dt>Zone</dt>
            <dd data-k="zone">—</dd>
          </div>
        </dl>
      </div>
      <figcaption className={styles.caption}>
        The four cleaned trajectories from the sample data, replayed. Move the cursor (or drag on a touch screen) to
        count the GPS points within 180 m and see which geofence you are in.
      </figcaption>
    </figure>
  );
}
