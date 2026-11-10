// projects/module-4/scenes/shots/main.js
// Module 4: Dynamic Stack Growth & Free Memory (Three.js 3D + GrowKaz 2.5D Stickman & Blueprint)
import { E, V, S, registerShot, mood, layer, blurLayer, veil, ease, prog, clamp, lerp, rr, seg, circle, ring, glow, alpha, text, FONTS } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, bigFace } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { cyberLab, drawMemoryTower2D } from '../sets/cyberLab.js';
import { ALEX, PROF, BOT } from '../cast.js';

// s001 (3D Nested Subroutines Stacking): What happens when multiple subroutines run at the same time?
registerShot('s001', {
  kind: '3d',
  init(T) {
    const M = mood('night');
    const st = T.stage({ mood: 'night', fov: 36, fog: [14, 48], keyPos: [-7, 11, 7], keyIntensity: 2.8, ambient: 1.25, bloom: 0.7 });
    st.add(T.ground(60, 60, M.floor, T.tiles('#0B1320', 12, [12, 12])));

    // Stack frames piling up in 3D
    const frames = [0, 1, 2, 3].map((i) => {
      const f = T.box(2.6, 0.42, 1.8, T.mat(i % 2 ? '#9b87d4' : '#FFD166', { emissive: new T.THREE.Color('#9b87d4'), emissiveIntensity: 0.45 }), 0, 3.8 - i * 0.52, -0.8);
      st.add(f);
      return f;
    });

    const alex = T.figure3D(ALEX, { rim: '#3FF2B6', pose: POSES.handsOnHead });
    alex.position.set(-2.3, 0, 0.8);
    st.add(alex);

    return { stage: st, frames };
  },
  draw(s, t, info, T) {
    s.frames.forEach((f, i) => {
      const k = ease.outBack(prog(t, i * 0.45, i * 0.45 + 0.55));
      f.scale.set(k, k, k);
    });
    T.orbit(s.stage.camera, t, { target: [0, 2.4, -0.6], radius: [6.0, 5.2], height: [2.8, 2.3], from: -0.5, to: 0.35, dur: info.dur });
  },
  overlay(g, t) {
    UI.badge(g, { str: 'NESTED SUBROUTINES', x: E.W - 80, y: 100, color: '#FFD166', a: ease.out(prog(t, 0.1, 0.5)) });
    UI.readout(g, { label: 'ACTIVE SUBROUTINES:', value: `${Math.min(4, Math.floor(t * 1.8) + 1)} FRAMES`, x: 120, y: 180, color: '#3FF2B6', size: 46, a: 1 });
  }
});

// s002 (2.5D Blueprint + Counter): More subroutines running = more memory needed in the stack to store addresses
registerShot('s002', {
  draw(g, t, info) {
    UI.blueprint(g);
    const grow = ease.inOut(prog(t, 0.2, info.dur - 0.3));
    const stackRatio = lerp(0.16, 0.46, grow);
    drawMemoryTower2D(g, E.W * 0.14, 150, 460, 580, t, { highlight: 'stack', stackRatio, showLabels: true });

    UI.dataCard(g, t, {
      title: 'STACK MEMORY USAGE',
      subtitle: 'RETURN ADDRESSES STORED IN STACK',
      from: 1,
      to: 8,
      decimals: 0,
      unit: ' ADDRS',
      start: 0.2,
      dur: info.dur - 0.5,
      inDur: 0.25,
      total: info.dur + 2
    });
  }
});

// s003 (2.5D Animated Growing & Shrinking Stack): Memory is freed when subroutines complete -> continually getting bigger & smaller
registerShot('s003', {
  draw(g, t, info) {
    const cam = { z: 1 + 0.05 * ease.inOut(t / info.dur), x: -20 * ease.inOut(t / info.dur) };
    const { GY, M } = cyberLab(g, t, cam, { mood: 'interiorCool' });
    layer(g, cam, 1, (g) => {
      drawFigure(g, {
        x: E.W * 0.22, y: GY, s: 1.45, facing: 1, outfit: PROF,
        pose: breathe(POSES.explain, t), expr: 'smile', rim: { color: M.rim, dir: [1, -1] }
      });
      drawFigure(g, {
        x: E.W * 0.80, y: GY, s: 1.4, facing: -1, outfit: ALEX,
        pose: breathe(POSES.cheer, t, 1, 2), expr: 'happy', rim: { color: M.rim, dir: [-1, -1] }
      });
    });

    // Oscillating stack ratio showing continuous growth and shrinkage into Free Memory
    const wave = 0.5 + 0.5 * Math.sin(t * 3.4);
    const stackRatio = lerp(0.14, 0.48, wave);
    drawMemoryTower2D(g, E.W * 0.38, 130, 460, 560, t, { highlight: 'stack', stackRatio, showLabels: true });
    UI.badge(g, { str: wave > 0.5 ? 'STACK GROWING (CALL)' : 'STACK SHRINKING (RETURN)', x: E.W / 2, y: 85, color: '#FFD166', a: 1 });
  }
});

// s004 (3D Full Memory Segmentation Tower Finale): Free Memory is allocated for the Stack to grow and shrink as necessary
registerShot('s004', {
  kind: '3d',
  init(T) {
    const M = mood('night');
    const st = T.stage({ mood: 'night', fov: 36, fog: [14, 50], keyPos: [6, 11, 8], keyIntensity: 2.9, ambient: 1.3, bloom: 0.72 });
    st.add(T.ground(60, 60, M.floor, T.tiles('#0B1320', 12, [12, 12])));

    const codeSeg  = T.box(3.0, 1.1, 1.8, T.mat('#e5989b'), 0, 0.6, -0.8);
    const dataSeg  = T.box(3.0, 0.8, 1.8, T.mat('#7bc98f'), 0, 1.6, -0.8);
    const freeSeg  = T.box(3.0, 1.6, 1.8, T.mat('#d9ece8', { emissive: new T.THREE.Color('#3FF2B6'), emissiveIntensity: 0.45 }), 0, 2.85, -0.8);
    const stackSeg = T.box(3.0, 1.0, 1.8, T.mat('#9b87d4', { emissive: new T.THREE.Color('#9b87d4'), emissiveIntensity: 0.5 }), 0, 4.2, -0.8);
    st.add(codeSeg, dataSeg, freeSeg, stackSeg);

    const alex = T.figure3D(ALEX, { rim: '#3FF2B6', pose: POSES.cheer });
    alex.position.set(-2.5, 0, 0.8);
    const prof = T.figure3D(PROF, { rim: '#FFD166', pose: POSES.wave });
    prof.position.set(2.5, 0, 0.8);
    prof.rotation.y = Math.PI;
    st.add(alex, prof);

    return { stage: st, freeSeg, stackSeg };
  },
  draw(s, t, info, T) {
    const pulse = Math.sin(t * 3.8) * 0.25;
    s.stackSeg.scale.y = 1 + pulse;
    s.stackSeg.position.y = 4.2 - pulse * 0.4;
    s.freeSeg.scale.y = 1 - pulse * 0.6;
    s.freeSeg.position.y = 2.85 - pulse * 0.2;
    T.orbit(s.stage.camera, t, { target: [0, 2.3, -0.6], radius: [8.2, 7.0], height: [3.2, 2.6], from: -0.55, to: 0.55, dur: info.dur });
  },
  overlay(g, t) {
    UI.badge(g, { str: 'FREE MEMORY = BREATHING ROOM FOR STACK', x: E.W - 80, y: 100, color: '#3FF2B6', a: ease.out(prog(t, 0.2, 0.6)) });
    UI.callout(g, t, { at: [E.W * 0.5, E.H * 0.45], to: [E.W * 0.56, E.H * 0.24], str: 'ALLOWS STACK TO GROW & SHRINK', color: '#FFD166', start: 0.5 });
  }
});
