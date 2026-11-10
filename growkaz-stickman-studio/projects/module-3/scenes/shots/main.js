// projects/module-3/scenes/shots/main.js
// Module 3: Stack Segment & Subroutines (Three.js 3D + GrowKaz 2.5D Stickman & Blueprint)
import { E, V, S, registerShot, mood, layer, blurLayer, veil, ease, prog, clamp, lerp, rr, seg, circle, ring, glow, alpha, text, FONTS } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, walkPose, bigFace } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { cyberLab, drawMemoryTower2D } from '../sets/cyberLab.js';
import { ALEX, PROF, BOT } from '../cast.js';

// s001 (2.5D Action + Subroutine Jump): Instruction interrupted by a function/subroutine
registerShot('s001', {
  draw(g, t, info) {
    const cam = { z: 1 + 0.05 * ease.inOut(t / info.dur), x: 20 * t };
    const { GY, M } = cyberLab(g, t, cam, { mood: 'interiorCool' });
    layer(g, cam, 1, (g) => {
      // Instruction track on the floor
      for (let i = 0; i < 6; i++) {
        const bx = 240 + i * 240;
        rr(g, bx, GY - 24, 180, 32, 8);
        g.fillStyle = i === 2 ? '#FFD166' : '#3FF2B6';
        g.fill();
        text(g, `0x0${i + 1}0`, bx + 90, GY - 6, { size: 20, color: '#0B1320', font: FONTS.ui, weight: 900 });
      }
      const jump = ease.outBack(prog(t, 1.5, 2.5));
      const rx = lerp(280, 720, clamp(t / 1.5));
      const ry = GY - jump * 240;
      drawFigure(g, {
        x: rx, y: ry, s: 1.4, facing: 1, outfit: BOT,
        pose: jump > 0.1 ? POSES.jump : walkPose(t * 9, { run: true }),
        expr: 'surprised', rim: { color: '#FFD166', dir: [1, -1] }, shadow: jump < 0.1
      });
      if (jump > 0.05) {
        rr(g, 620, GY - 270, 340, 40, 10);
        g.fillStyle = '#9b87d4'; g.fill();
        text(g, 'SUBROUTINE: calcTax()', 790, GY - 248, { size: 22, color: '#0B1320', font: FONTS.ui, weight: 900 });
      }
    });
    UI.badge(g, { str: 'INTERRUPTED BY SUBROUTINE!', x: E.W - 80, y: 100, color: '#FFD166', a: ease.out(prog(t, 1.2, 1.7)) });
  }
});

// s002 (2.5D BigFace + Stack Tower): That is the job of the Stack Segment
registerShot('s002', {
  draw(g, t) {
    blurLayer(g, 12, (g) => cyberLab(g, t, { z: 1.4, x: 100, y: -90 }, { mood: 'interiorCool' }));
    veil(g, '#08111c', 0.4);
    bigFace(g, E.W * 0.3, E.H * 0.62, 260, { outfit: PROF, expr: 'determined', look: [0.5, -0.2], rimColor: '#3FF2B6', rimSide: 1 });
    drawMemoryTower2D(g, E.W * 0.55, E.H * 0.16, 460, 540, t, { highlight: 'stack', showLabels: true });
    UI.callout(g, t, { at: [E.W * 0.55, E.H * 0.23], to: [E.W * 0.42, E.H * 0.18], str: 'BOOKMARKS RETURN ADDRESS', color: '#c9b8ff', start: 0.15 });
  }
});

// s003 (3D Stack Push): Program notes the return address where it left off and pushes it onto the Stack
registerShot('s003', {
  kind: '3d',
  init(T) {
    const M = mood('night');
    const st = T.stage({ mood: 'night', fov: 36, fog: [12, 46], keyPos: [-6, 10, 7], keyIntensity: 2.8, ambient: 1.25, bloom: 0.7 });
    st.add(T.ground(60, 60, M.floor, T.tiles('#0B1320', 12, [12, 12])));

    // 3D Stack Platform & Return Address Slab being pushed onto Stack
    const towerBase = T.box(3.0, 2.2, 2.0, T.mat('#1b2a3d'), 0, 1.1, -1.0);
    const stackTray = T.box(3.2, 0.45, 2.2, T.mat('#9b87d4', { emissive: new T.THREE.Color('#9b87d4'), emissiveIntensity: 0.45 }), 0, 2.45, -1.0);
    const addrCard = T.box(2.4, 0.38, 1.5, T.mat('#FFD166', { emissive: new T.THREE.Color('#FFD166'), emissiveIntensity: 0.65 }), 0, 4.2, -1.0);
    st.add(towerBase, stackTray, addrCard);

    const prof = T.figure3D(PROF, { rim: '#3FF2B6', pose: POSES.pointUp });
    prof.position.set(-2.4, 0, 0.6);
    const alex = T.figure3D(ALEX, { rim: '#FFD166', pose: POSES.stand });
    alex.position.set(2.4, 0, 0.6);
    alex.rotation.y = Math.PI;
    st.add(prof, alex);

    return { stage: st, addrCard, stackTray };
  },
  draw(s, t, info, T) {
    const pushK = ease.outBack(prog(t, 0.6, 2.4));
    s.addrCard.position.y = lerp(4.2, 2.9, pushK);
    s.addrCard.rotation.y = (1 - pushK) * 0.8;
    T.orbit(s.stage.camera, t, { target: [0, 2.2, -0.8], radius: [6.5, 5.2], height: [3.2, 2.5], from: -0.6, to: 0.45, dur: info.dur });
  },
  overlay(g, t) {
    UI.badge(g, { str: 'PUSH TO STACK SEGMENT', x: E.W - 80, y: 100, color: '#c9b8ff', a: ease.out(prog(t, 0.2, 0.7)) });
    UI.readout(g, { label: 'SAVED RETURN ADDRESS:', value: '0x00401A08', x: 120, y: 200, color: '#FFD166', size: 46, a: ease.out(prog(t, 0.8, 1.4)) });
    UI.callout(g, t, { at: [E.W * 0.5, E.H * 0.43], to: [E.W * 0.55, E.H * 0.24], str: 'KEPT IN STACK WHILE SUBROUTINE RUNS', color: '#3FF2B6', start: 1.5 });
  }
});

// s004 (3D Stack Pop & Return): Subroutine completes -> program reads address from Stack and returns where it left off
registerShot('s004', {
  kind: '3d',
  init(T) {
    const M = mood('night');
    const st = T.stage({ mood: 'night', fov: 36, fog: [12, 46], keyPos: [6, 10, 7], keyIntensity: 2.8, ambient: 1.25, bloom: 0.7 });
    st.add(T.ground(60, 60, M.floor, T.tiles('#0B1320', 12, [12, 12])));

    const towerBase = T.box(3.0, 2.2, 2.0, T.mat('#1b2a3d'), 0, 1.1, -1.0);
    const stackTray = T.box(3.2, 0.45, 2.2, T.mat('#9b87d4', { emissive: new T.THREE.Color('#9b87d4'), emissiveIntensity: 0.45 }), 0, 2.45, -1.0);
    const addrCard = T.box(2.4, 0.38, 1.5, T.mat('#3FF2B6', { emissive: new T.THREE.Color('#3FF2B6'), emissiveIntensity: 0.7 }), 0, 2.9, -1.0);
    st.add(towerBase, stackTray, addrCard);

    const bot = T.figure3D(BOT, { rim: '#FFD166', pose: POSES.cheer });
    bot.position.set(0, 0, 1.2);
    st.add(bot);

    return { stage: st, addrCard, bot };
  },
  draw(s, t, info, T) {
    const popK = ease.inOut(prog(t, 0.4, 1.8));
    s.addrCard.position.y = lerp(2.9, 4.6, popK);
    s.addrCard.position.z = lerp(-1.0, 1.2, popK);
    s.addrCard.scale.setScalar(1 - 0.6 * prog(t, 1.6, 2.4));
    T.orbit(s.stage.camera, t, { target: [0, 1.8, 0], radius: [5.6, 6.4], height: [2.4, 2.9], from: 0.4, to: -0.4, dur: info.dur });
  },
  overlay(g, t) {
    UI.badge(g, { str: 'SUBROUTINE COMPLETE -> POP & RETURN', x: E.W - 80, y: 100, color: '#3FF2B6', a: ease.out(prog(t, 0.2, 0.6)) });
    UI.readout(g, { label: 'JUMPING BACK TO:', value: '0x00401A08 (MAIN CODE)', x: E.W / 2, y: 150, align: 'center', color: '#FFD166', size: 44, a: ease.out(prog(t, 0.5, 1.1)) });
  }
});
