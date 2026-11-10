// projects/module-1/scenes/shots/main.js
// Module 1: Process & Memory Segmentation (Three.js 3D + GrowKaz 2.5D Stickman & Blueprint)
import { E, V, S, registerShot, mood, layer, blurLayer, veil, ease, prog, clamp, lerp, rr, seg, circle, ring, glow, alpha, text, FONTS } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, bigFace } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { cyberLab, drawMemoryTower2D } from '../sets/cyberLab.js';
import { ALEX, PROF } from '../cast.js';

// s001 (3D): Executable App launched -> transforms into active Process inside 3D Main Memory
registerShot('s001', {
  kind: '3d',
  init(T) {
    const M = mood('night');
    const st = T.stage({ mood: 'night', fov: 36, fog: [14, 48], keyPos: [-6, 10, 7], keyIntensity: 2.8, ambient: 1.2, bloom: 0.65 });
    st.add(T.ground(60, 60, M.floor, T.tiles('#0B1320', 12, [12, 12])));

    // Background server racks
    for (const x of [-8, -4, 4, 8]) {
      const rack = T.building(1.8, 5.2, 1.4, { color: '#101d30', win: '#3FF2B6', lit: 0.7, seed: Math.abs(x) + 2 });
      rack.position.set(x, 2.6, -5.5);
      st.add(rack);
    }

    // Central 3D Main Memory Platform & glowing Process Core
    const pedestal = T.cyl(1.6, 1.9, 0.35, '#162840', 0, 0.18, 0, 24);
    const coreBox = T.box(1.5, 2.4, 1.1, T.mat('#3FF2B6', { emissive: new T.THREE.Color('#3FF2B6'), emissiveIntensity: 0.45, roughness: 0.3 }), 0, 1.6, 0);
    st.add(pedestal, coreBox);

    // Alex & Prof stick figures in 3D
    const alex = T.figure3D(ALEX, { rim: '#3FF2B6', pose: POSES.point });
    alex.position.set(-2.2, 0, 0.8);
    const prof = T.figure3D(PROF, { rim: '#FFD166', pose: POSES.explain });
    prof.position.set(2.2, 0, 0.8);
    prof.rotation.y = Math.PI;
    st.add(alex, prof);

    const beam = T.shaft(2.4, 6.5, '#3FF2B6', 0.09);
    beam.position.set(0, 3.2, 0);
    st.add(beam);

    return { stage: st, coreBox, alex, prof };
  },
  draw(s, t, info, T) {
    const k = ease.outBack(prog(t, 0.2, 1.4));
    s.coreBox.scale.set(0.3 + 0.7 * k, 0.3 + 0.7 * k, 0.3 + 0.7 * k);
    s.coreBox.rotation.y = t * 0.85;
    s. coreBox.position.y = 1.65 + Math.sin(t * 3) * 0.12;
    s.alex.setPose(t < 1.5 ? POSES.point : POSES.cheer);
    T.orbit(s.stage.camera, t, { target: [0, 1.4, 0], radius: [6.8, 5.4], height: [2.8, 2.1], from: -0.65, to: 0.45, dur: info.dur });
  },
  overlay(g, t, info) {
    UI.badge(g, { str: 'MAIN MEMORY (RAM)', x: E.W - 80, y: 100, color: '#3FF2B6', a: ease.out(prog(t, 0.2, 0.7)) });
    UI.callout(g, t, { at: [E.W * 0.5, E.H * 0.44], to: [E.W * 0.68, E.H * 0.26], str: 'EXECUTABLE -> ACTIVE PROCESS', color: '#FFD166', start: 0.8 });
  },
});

// s002 (2.5D Lab + Variable Size Segments): OS sets aside memory ("Memory Segmentation", not fixed size)
registerShot('s002', {
  draw(g, t, info) {
    const cam = { z: 1 + 0.06 * ease.inOut(t / info.dur), x: -25 * ease.inOut(t / info.dur) };
    const { GY, M } = cyberLab(g, t, cam, { mood: 'interiorCool' });
    layer(g, cam, 1, (g) => {
      drawFigure(g, {
        x: E.W * 0.24, y: GY, s: 1.45, facing: 1, outfit: PROF,
        pose: breathe(posesAt(t, [[0, POSES.explain], [1.2, POSES.point]]), t),
        expr: 'smile', prop: { type: 'pointer' }, rim: { color: M.rim, dir: [1, -1] }
      });
      drawFigure(g, {
        x: E.W * 0.78, y: GY, s: 1.4, facing: -1, outfit: ALEX,
        pose: breathe(POSES.think, t, 1, 2), expr: 'awe', rim: { color: M.rim, dir: [-1, -1] }
      });
    });

    // Definition Card & dynamic variable-size segment animation in center
    const cardA = ease.out(prog(t, 0.15, 0.6));
    g.save();
    g.globalAlpha = cardA;
    rr(g, E.W * 0.34, E.H * 0.16, E.W * 0.34, 150, 18);
    g.fillStyle = 'rgba(11, 19, 32, 0.92)';
    g.fill();
    g.strokeStyle = '#FFD166';
    g.lineWidth = 3;
    g.stroke();
    text(g, 'MEMORY SEGMENTATION', E.W * 0.51, E.H * 0.21, { size: 32, color: '#FFD166', font: FONTS.ui, weight: 900, spacing: 2 });
    text(g, 'OS allocates flexible sections of memory', E.W * 0.51, E.H * 0.26, { size: 22, color: '#E8F6F2', font: FONTS.ui, weight: 800 });

    // Dynamic resizing segments bar
    const dynH = 260 + Math.sin(t * 3.2) * 45;
    drawMemoryTower2D(g, E.W * 0.43, E.H * 0.35, 360, dynH, t, { highlight: 'all', showLabels: true });
    UI.dimension(g, t, { x1: E.W * 0.34, y1: E.H * 0.35, x2: E.W * 0.34, y2: E.H * 0.35 + dynH, str: 'FLEXIBLE', color: '#3FF2B6', start: 0.5 });
    g.restore();
    FX.dust(g, t, { count: 35 });
  }
});

// s003 (Blueprint Diagram): Typical Memory Segment of a Process (4 Sections from textbook diagram)
registerShot('s003', {
  draw(g, t, info) {
    UI.blueprint(g);
    const ui = S().ui;
    text(g, 'TYPICAL MEMORY SEGMENT OF A PROCESS', E.W / 2, 110, { size: 44, color: ui.gold, font: FONTS.ui, weight: 900, spacing: 3, glow: 16, glowColor: alpha(ui.gold, 0.5) });

    const tw = 520, th = 560, tx = E.W / 2 - tw / 2, ty = 175;
    const step = Math.floor(clamp((t / info.dur) * 4.5, 0, 3.99));
    const ids = ['stack', 'free', 'data', 'code'];
    drawMemoryTower2D(g, tx, ty, tw, th, t, { highlight: ids[step], showLabels: true });

    UI.callout(g, t, { at: [tx, ty + 60],  to: [tx - 240, ty + 50],  str: '1. STACK SEGMENT', color: '#c9b8ff', start: 0.2 });
    UI.callout(g, t, { at: [tx + tw, ty + 200], to: [tx + tw + 240, ty + 190], str: '2. FREE MEMORY', color: '#ffffff', start: 0.9 });
    UI.callout(g, t, { at: [tx, ty + 365], to: [tx - 240, ty + 365], str: '3. DATA SEGMENT',  color: '#b3f2c4', start: 1.6 });
    UI.callout(g, t, { at: [tx + tw, ty + 485], to: [tx + tw + 240, ty + 485], str: '4. CODE SEGMENT', color: '#ffc4c6', start: 2.3 });
  }
});

// s004 (3D Non-Contiguous Segments in RAM): Segments don't have to be physically next to one another; OS tracks them!
registerShot('s004', {
  kind: '3d',
  init(T) {
    const M = mood('night');
    const st = T.stage({ mood: 'night', fov: 38, fog: [16, 55], keyPos: [7, 11, 8], keyIntensity: 2.7, ambient: 1.25, bloom: 0.7 });
    st.add(T.ground(60, 60, M.floor, T.tiles('#09121e', 14, [14, 14])));

    // 4 segments scattered across non-adjacent physical RAM slots
    const colors = ['#9b87d4', '#d9ece8', '#7bc98f', '#e5989b'];
    const targets = [[-3.2, 0.7, -1.8], [2.8, 0.7, -2.2], [-1.5, 0.7, 1.9], [3.1, 0.7, 1.5]];
    const blocks = colors.map((c, i) => {
      const b = T.box(1.4, 0.9, 1.4, T.mat(c, { emissive: new T.THREE.Color(c), emissiveIntensity: 0.35 }), 0, 0.6 + i * 0.95, 0);
      st.add(b);
      return { mesh: b, start: [0, 0.6 + i * 0.95, 0], target: targets[i] };
    });

    // OS Kernel central beacon tracking them
    const osHub = T.sphere(0.55, T.mat('#FFD166', { emissive: new T.THREE.Color('#FFD166'), emissiveIntensity: 0.8 }), 0, 3.4, -0.5);
    st.add(osHub);

    const prof = T.figure3D(PROF, { rim: '#3FF2B6', pose: POSES.pointUp });
    prof.position.set(0, 0, -0.5);
    st.add(prof);

    return { stage: st, blocks, osHub };
  },
  draw(s, t, info, T) {
    const spread = ease.inOut(prog(t, 0.4, 2.2));
    for (const b of s.blocks) {
      b.mesh.position.set(
        lerp(b.start[0], b.target[0], spread),
        lerp(b.start[1], b.target[1], spread) + Math.sin(t * 3 + b.target[0]) * 0.08,
        lerp(b.start[2], b.target[2], spread)
      );
      b.mesh.rotation.y = t * 0.5;
    }
    s.osHub.scale.setScalar(1 + 0.12 * Math.sin(t * 6));
    T.orbit(s.stage.camera, t, { target: [0, 1.3, 0], radius: [6.5, 7.8], height: [3.2, 4.2], from: -0.4, to: 0.8, dur: info.dur });
  },
  overlay(g, t) {
    UI.badge(g, { str: 'NON-CONTIGUOUS IN RAM', x: E.W - 80, y: 100, color: '#FFD166', a: ease.out(prog(t, 0.3, 0.8)) });
    UI.readout(g, { label: 'OS KERNEL TRACKING:', value: '4 / 4 SEGMENTS MAPPED', x: 90, y: 105, align: 'left', color: '#3FF2B6', size: 36, a: ease.out(prog(t, 0.6, 1.2)) });
  }
});
