// sets/cyberLab.js — OS Kernel Control Room & RAM Architecture Lab
import { E, V, mood, layer, rr, seg, circle, ring, linGrad, glow, alpha, shade, text, FONTS } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';

export const labGround = () => E.H * V(0.8, 0.68);

export function drawMemoryTower2D(g, x, y, w, h, t, o = {}) {
  const { highlight = null, stackRatio = 0.22, showLabels = true } = o;
  const freeRatio = Math.max(0.08, 0.46 - (stackRatio - 0.22));
  const secs = [
    { id: 'stack', label: 'STACK SEGMENT', frac: stackRatio, bg: '#9b87d4', border: '#c9b8ff' },
    { id: 'free',  label: 'FREE MEMORY',   frac: freeRatio,  bg: '#d9ece8', border: '#ffffff' },
    { id: 'data',  label: 'DATA SEGMENT',  frac: 0.16,       bg: '#7bc98f', border: '#b3f2c4' },
    { id: 'code',  label: 'CODE SEGMENT',  frac: 0.26,       bg: '#e5989b', border: '#ffc4c6' },
  ];
  rr(g, x - 8, y - 8, w + 16, h + 16, 14);
  g.fillStyle = 'rgba(8, 16, 28, 0.85)';
  g.fill();
  g.strokeStyle = '#3FF2B6';
  g.lineWidth = 3;
  g.stroke();

  let curY = y;
  for (const s of secs) {
    const sh = h * s.frac;
    const isHi = highlight === s.id || highlight === 'all';
    g.save();
    rr(g, x, curY, w, sh - 3, 6);
    g.fillStyle = isHi ? s.bg : alpha(s.bg, highlight ? 0.35 : 0.88);
    g.fill();
    g.strokeStyle = isHi ? '#FFD166' : s.border;
    g.lineWidth = isHi ? 4 : 2;
    g.stroke();
    if (isHi) glow(g, x + w / 2, curY + sh / 2, w * 0.7, s.bg, 0.35);
    if (showLabels) {
      text(g, s.label, x + w / 2, curY + sh / 2 + 2, {
        size: Math.min(26, sh * 0.42),
        color: '#0B1320',
        font: FONTS.ui,
        weight: 900,
        spacing: 1.5,
      });
    }
    g.restore();
    curY += sh;
  }
}

export function cyberLab(g, t, cam, o = {}) {
  const M = mood(o.mood || 'interiorCool'), GY = labGround(), CX = E.W / 2;
  layer(g, cam, 0.35, (g) => {
    g.fillStyle = linGrad(g, 0, -E.H, 0, GY, [M.dark, M.wall]);
    g.fillRect(-E.W, -E.H, E.W * 3, GY + E.H);
    const wx = CX - V(360, 300), wy = GY - V(560, 760), ww = V(720, 600), wh = V(340, 420);
    FX.windowFrame(g, { x: wx, y: wy, w: ww, h: wh, cols: 3, frame: shade(M.wall, -0.55), bar: 10, blinds: 5 }, (g, x, y, w, h) => {
      g.fillStyle = linGrad(g, 0, y, 0, y + h, M.sky);
      g.fillRect(x, y, w, h);
      FX.skyline(g, { x, y: y + h, w, maxH: h * 0.65, color: alpha(shade(M.wall, -0.25), 0.8), windowColor: alpha('#3FF2B6', 0.7), seed: 9 });
    });
  });
  layer(g, cam, 0.7, (g) => {
    FX.counter(g, { x: CX - V(580, 520), y: GY - 40, w: V(1160, 1040), h: 120, color: shade(M.wall, -0.45), top: shade(M.wall, -0.2), doors: 8 });
    g.fillStyle = linGrad(g, 0, GY - 40, 0, GY + 600, [shade(M.floor, 0.1), M.dark]);
    g.fillRect(-E.W, GY - 40, E.W * 3, E.H * 2);
    FX.floorLines(g, GY - 40, GY + 600, 'rgba(63,242,182,.12)', 0.08);
    FX.pool(g, CX, GY + 10, 480, 75, M.key, 0.24);
  });
  return { GY, CX, M };
}
