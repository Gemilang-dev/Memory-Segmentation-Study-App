// projects/module-2/scenes/shots/main.js
// Module 2: Code Segment & Data Segment (Three.js 3D + GrowKaz 2.5D Stickman & Blueprint)
import { E, V, S, registerShot, mood, layer, blurLayer, veil, ease, prog, clamp, lerp, rr, seg, circle, ring, glow, alpha, text, FONTS } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, bigFace } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { cyberLab, drawMemoryTower2D } from '../sets/cyberLab.js';
import { ALEX, PROF } from '../cast.js';

// s001 (2.5D BigFace + Memory Tower): How does your computer separate instructions from changing values?
registerShot('s001', {
  draw(g, t, info) {
    blurLayer(g, 12, (g) => cyberLab(g, t, { z: 1.35, x: -120, y: -80 }, { mood: 'interiorCool' }));
    veil(g, '#08111c', 0.42);
    const M = mood('interiorCool');
    bigFace(g, E.W * 0.28, E.H * 0.62, 270 * (1 + 0.03 * t), { outfit: ALEX, expr: t < 2.2 ? 'thinking' : 'surprised', look: [0.6, -0.15], rimColor: M.rim, rimSide: 1 });
    drawMemoryTower2D(g, E.W * 0.56, E.H * 0.16, 460, 560, t, { highlight: t > 2.5 ? 'code' : 'data', showLabels: true });
    UI.callout(g, t, { at: [E.W * 0.56, E.H * 0.52], to: [E.W * 0.44, E.H * 0.34], str: 'VARIABLES vs INSTRUCTIONS?', color: '#FFD166', start: 0.5 });
  }
});

// s002 (3D Code Segment Vault): At the bottom sits the Code Segment, where executable program instructions reside
registerShot('s002', {
  kind: '3d',
  init(T) {
    const M = mood('night');
    const st = T.stage({ mood: 'night', fov: 35, fog: [12, 46], keyPos: [-7, 9, 6], keyIntensity: 2.8, ambient: 1.2, bloom: 0.68 });
    st.add(T.ground(60, 60, M.floor, T.tiles('#0B1320', 12, [12, 12])));

    // Giant 3D Memory Tower with glowing rose-pink CODE SEGMENT at the base
    const codeSeg = T.box(3.2, 1.3, 2.0, T.mat('#e5989b', { emissive: new T.THREE.Color('#ff6b7a'), emissiveIntensity: 0.55 }), 0, 0.7, -1.2);
    const dataSeg = T.box(3.2, 0.9, 2.0, T.mat('#3a5e48'), 0, 1.85, -1.2);
    const freeSeg = T.box(3.2, 1.5, 2.0, T.mat('#2c3e45'), 0, 3.1, -1.2);
    const stackSeg = T.box(3.2, 0.9, 2.0, T.mat('#3d3559'), 0, 4.35, -1.2);
    st.add(codeSeg, dataSeg, freeSeg, stackSeg);

    const prof = T.figure3D(PROF, { rim: '#FFD166', pose: POSES.point });
    prof.position.set(-2.5, 0, 0.6);
    st.add(prof);

    return { stage: st, codeSeg, prof };
  },
  draw(s, t, info, T) {
    s.codeSeg.scale.set(1 + 0.04 * Math.sin(t * 5), 1, 1 + 0.04 * Math.sin(t * 5));
    T.orbit(s.stage.camera, t, { target: [0, 1.1, -1.0], radius: [6.4, 4.9], height: [2.2, 1.5], from: -0.55, to: 0.35, dur: info.dur });
  },
  overlay(g, t) {
    UI.badge(g, { str: 'CODE SEGMENT = INSTRUCTIONS', x: E.W - 80, y: 100, color: '#ffc4c6', a: ease.out(prog(t, 0.2, 0.6)) });
    rr(g, 110, 180, 480, 230, 16);
    g.fillStyle = 'rgba(11,19,32,0.9)'; g.fill(); g.strokeStyle = '#e5989b'; g.lineWidth = 3; g.stroke();
    text(g, '0x00401000: LOAD  R1, [score]', 135, 235, { size: 24, color: '#ffc4c6', font: FONTS.ui, weight: 800, align: 'left' });
    text(g, '0x00401004: ADD   R1, 10',      135, 285, { size: 24, color: '#3FF2B6', font: FONTS.ui, weight: 800, align: 'left' });
    text(g, '0x00401008: CALL  updateUI()',  135, 335, { size: 24, color: '#FFD166', font: FONTS.ui, weight: 800, align: 'left' });
  }
});

// s003 (3D Data Segment Workspace): Right above it lives the Data Segment, holding all the variables the program uses
registerShot('s003', {
  kind: '3d',
  init(T) {
    const M = mood('night');
    const st = T.stage({ mood: 'night', fov: 35, fog: [12, 46], keyPos: [6, 10, 7], keyIntensity: 2.8, ambient: 1.2, bloom: 0.68 });
    st.add(T.ground(60, 60, M.floor, T.tiles('#0B1320', 12, [12, 12])));

    const codeSeg = T.box(3.2, 1.3, 2.0, T.mat('#593b3d'), 0, 0.7, -1.2);
    const dataSeg = T.box(3.2, 1.0, 2.0, T.mat('#7bc98f', { emissive: new T.THREE.Color('#3FF2B6'), emissiveIntensity: 0.55 }), 0, 1.9, -1.2);
    const freeSeg = T.box(3.2, 1.5, 2.0, T.mat('#2c3e45'), 0, 3.2, -1.2);
    const stackSeg = T.box(3.2, 0.9, 2.0, T.mat('#3d3559'), 0, 4.45, -1.2);
    st.add(codeSeg, dataSeg, freeSeg, stackSeg);

    // Floating variable cubes around the Data Segment
    const varCubes = [-1.1, 0, 1.1].map((x) => {
      const c = T.box(0.55, 0.55, 0.55, T.mat('#FFD166', { emissive: new T.THREE.Color('#FFD166'), emissiveIntensity: 0.4 }), x, 1.9, 0.3);
      st.add(c);
      return c;
    });

    const alex = T.figure3D(ALEX, { rim: '#3FF2B6', pose: POSES.pointUp });
    alex.position.set(2.4, 0, 0.7);
    alex.rotation.y = Math.PI;
    st.add(alex);

    return { stage: st, dataSeg, varCubes };
  },
  draw(s, t, info, T) {
    s.varCubes.forEach((c, i) => {
      c.rotation.y = t * 1.4 + i;
      c.position.y = 1.9 + Math.sin(t * 3.5 + i * 1.5) * 0.14;
    });
    T.orbit(s.stage.camera, t, { target: [0, 1.85, -0.6], radius: [5.8, 4.8], height: [2.5, 2.0], from: 0.55, to: -0.45, dur: info.dur });
  },
  overlay(g, t) {
    UI.badge(g, { str: 'DATA SEGMENT = VARIABLES', x: E.W - 80, y: 100, color: '#7bc98f', a: ease.out(prog(t, 0.2, 0.6)) });
    const scoreVal = Math.round(lerp(100, 250, ease.inOut(prog(t, 0.4, 3.0))));
    UI.readout(g, { label: 'VARIABLE [playerScore] =', value: String(scoreVal), x: 120, y: 220, color: '#3FF2B6', size: 48, a: ease.out(prog(t, 0.3, 0.8)) });
    UI.readout(g, { label: 'VARIABLE [isRunning] =', value: 'true', x: 120, y: 300, color: '#FFD166', size: 42, a: ease.out(prog(t, 0.7, 1.2)) });
  }
});

// s004 (Blueprint Side-by-Side Summary): One stores WHAT TO DO (Code); the other stores WHAT TO REMEMBER (Data)
registerShot('s004', {
  draw(g, t) {
    UI.blueprint(g);
    text(g, 'CODE SEGMENT vs DATA SEGMENT', E.W / 2, 115, { size: 46, color: '#FFD166', font: FONTS.ui, weight: 900, spacing: 3 });

    const boxes = [
      { x: E.W * 0.12, title: 'CODE SEGMENT', sub: 'WHAT TO DO', desc: 'Program Instructions', col: '#e5989b', ex: 'if (health > 0) { run(); }' },
      { x: E.W * 0.54, title: 'DATA SEGMENT', sub: 'WHAT TO REMEMBER', desc: 'Program Variables', col: '#7bc98f', ex: 'int health = 100;' },
    ];
    boxes.forEach((b, i) => {
      const k = ease.outBack(prog(t, i * 0.35, i * 0.35 + 0.6));
      g.save();
      g.translate(b.x + 320, 440);
      g.scale(k, k);
      rr(g, -320, -220, 640, 440, 24);
      g.fillStyle = 'rgba(11, 19, 32, 0.92)'; g.fill();
      g.strokeStyle = b.col; g.lineWidth = 4; g.stroke();
      text(g, b.title, 0, -140, { size: 42, color: b.col, font: FONTS.ui, weight: 900, spacing: 2 });
      text(g, b.sub, 0, -75, { size: 28, color: '#FFD166', font: FONTS.ui, weight: 900, spacing: 3 });
      text(g, b.desc, 0, 10, { size: 32, color: '#ffffff', font: FONTS.ui, weight: 800 });
      rr(g, -250, 75, 500, 85, 12);
      g.fillStyle = 'rgba(255,255,255,0.06)'; g.fill();
      text(g, b.ex, 0, 120, { size: 28, color: '#3FF2B6', font: FONTS.ui, weight: 800 });
      g.restore();
    });
  }
});
