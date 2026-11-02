// Procedural, rigged model of Anita Sharma (Excite branch manager), built from her cartoon artwork.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const C = {
  skin: 0xC68B59, hair: 0x35191B, blazer: 0x5A2A2E, blazerDark: 0x47201F, shirt: 0xF4F1EE,
  trousers: 0x3B3B40, shoe: 0x8E8E94, white: 0xFFFFFF, lid: 0xF0A07E, pupil: 0x1B1A1F,
  lip: 0xC8424F, button: 0xE9E2D0, brow: 0x2B1416
};

export function buildAnita() {
  const B = {}; const bones = [];
  function bone(name, parent, x, y, z) {
    const b = new THREE.Bone(); b.name = name; B[name] = b; bones.push(b);
    b.userData.w = new THREE.Vector3(x, y, z);
    if (parent) { parent.add(b); b.position.set(x - parent.userData.w.x, y - parent.userData.w.y, z - parent.userData.w.z); }
    else b.position.set(x, y, z);
    return b;
  }
  const hips = bone('Hips', null, 0, 0.95, 0);
  bone('Spine', hips, 0, 1.12, 0); bone('Chest', B.Spine, 0, 1.28, 0);
  bone('Neck', B.Chest, 0, 1.44, 0); bone('Head', B.Neck, 0, 1.53, 0);
  for (const [s, sx] of [['L', 1], ['R', -1]]) {
    bone('UpperArm_' + s, B.Chest, 0.2 * sx, 1.39, 0);
    bone('LowerArm_' + s, B['UpperArm_' + s], 0.22 * sx, 1.13, 0);
    bone('Hand_' + s, B['LowerArm_' + s], 0.232 * sx, 0.91, 0);
    bone('UpperLeg_' + s, hips, 0.09 * sx, 0.9, 0);
    bone('LowerLeg_' + s, B['UpperLeg_' + s], 0.09 * sx, 0.5, 0);
    bone('Foot_' + s, B['LowerLeg_' + s], 0.09 * sx, 0.09, 0);
  }
  const idx = n => bones.indexOf(B[n]);
  const parts = [];
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  function add(g, color, boneName) {
    g = g.index ? g : g; g.deleteAttribute('uv');
    if (!g.index) { const n = g.attributes.position.count; g.setIndex([...Array(n).keys()]); }
    const n = g.attributes.position.count, col = new THREE.Color(color).convertSRGBToLinear();
    const c = new Float32Array(n * 3), si = new Uint16Array(n * 4), sw = new Float32Array(n * 4), bi = idx(boneName);
    for (let i = 0; i < n; i++) { c[i*3]=col.r; c[i*3+1]=col.g; c[i*3+2]=col.b; si[i*4]=bi; sw[i*4]=1; }
    g.setAttribute('color', new THREE.BufferAttribute(c, 3));
    g.setAttribute('skinIndex', new THREE.BufferAttribute(si, 4));
    g.setAttribute('skinWeight', new THREE.BufferAttribute(sw, 4));
    parts.push(g);
  }
  function cyl(a, b, r1, r2, color, bn, seg = 18, sz = 1) {
    const d = new THREE.Vector3().subVectors(a, b), len = d.length();
    const g = new THREE.CylinderGeometry(r1, r2, len, seg, 1, false);
    g.scale(1, 1, sz);
    g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(V(0, 1, 0), d.normalize()));
    g.translate((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2);
    add(g, color, bn);
  }
  function sph(p, r, color, bn, s = [1, 1, 1], opts) {
    const g = opts ? new THREE.SphereGeometry(r, 24, 16, opts.ps || 0, opts.pl || Math.PI * 2, opts.ts || 0, opts.tl || Math.PI) : new THREE.SphereGeometry(r, 24, 16);
    g.scale(...s); if (opts && opts.rx) g.rotateX(opts.rx); if (opts && opts.ry) g.rotateY(opts.ry);
    g.translate(p.x, p.y, p.z); add(g, color, bn);
  }
  function box(p, w, h, d, color, bn, rx = 0, rz = 0) {
    const g = new THREE.BoxGeometry(w, h, d, 2, 2, 2); g.rotateX(rx); g.rotateZ(rz); g.translate(p.x, p.y, p.z); add(g, color, bn);
  }
  function cap(p, r, len, color, bn, s = [1, 1, 1], rx = 0) {
    const g = new THREE.CapsuleGeometry(r, len, 6, 18); g.scale(...s); g.rotateX(rx); g.translate(p.x, p.y, p.z); add(g, color, bn);
  }

  // ---- Torso: maroon blazer over white shirt
  cyl(V(0, 1.16, 0), V(0, 0.9, 0), 0.16, 0.175, C.blazer, 'Spine', 20, 0.72);
  cyl(V(0, 1.42, 0), V(0, 1.15, 0), 0.19, 0.158, C.blazer, 'Chest', 20, 0.7);
  cyl(V(0, 0.93, 0), V(0, 0.8, 0), 0.172, 0.19, C.blazer, 'Hips', 20, 0.74);
  for (const sx of [1, -1]) {
    sph(V(0.185 * sx, 1.385, 0), 0.075, C.blazer, 'Chest');
    box(V(0.095 * sx, 0.93, 0.128), 0.1, 0.02, 0.02, C.blazerDark, 'Hips');           // pocket flaps
    box(V(0.07 * sx, 1.3, 0.128), 0.035, 0.22, 0.02, C.blazerDark, 'Chest', 0, 0.35 * sx); // lapels
  }
  { const g = new THREE.ConeGeometry(0.075, 0.2, 3); g.rotateZ(Math.PI); g.rotateY(Math.PI / 6 + Math.PI); g.scale(1, 1, 0.25); g.translate(0, 1.33, 0.123); add(g, C.shirt, 'Chest'); }
  sph(V(0, 1.06, 0.122), 0.014, C.button, 'Spine');
  // collar
  for (const sx of [1, -1]) box(V(0.045 * sx, 1.425, 0.085), 0.06, 0.05, 0.02, C.shirt, 'Chest', 0, -0.5 * sx);
  // ---- Hips / trousers
  cyl(V(0, 0.84, 0), V(0, 0.74, 0), 0.165, 0.15, C.trousers, 'Hips', 18, 0.78);
  for (const [s, sx] of [['L', 1], ['R', -1]]) {
    cyl(V(0.09 * sx, 0.9, 0), V(0.09 * sx, 0.5, 0), 0.082, 0.068, C.trousers, 'UpperLeg_' + s);
    sph(V(0.09 * sx, 0.5, 0), 0.066, C.trousers, 'LowerLeg_' + s);
    cyl(V(0.09 * sx, 0.5, 0), V(0.09 * sx, 0.09, 0), 0.066, 0.064, C.trousers, 'LowerLeg_' + s);
    cap(V(0.09 * sx, 0.045, 0.04), 0.045, 0.14, C.shoe, 'Foot_' + s, [1.05, 0.8, 1], Math.PI / 2);
    // ---- Arms
    cyl(V(0.2 * sx, 1.39, 0), V(0.22 * sx, 1.13, 0), 0.062, 0.056, C.blazer, 'UpperArm_' + s);
    sph(V(0.22 * sx, 1.13, 0), 0.056, C.blazer, 'LowerArm_' + s);
    cyl(V(0.22 * sx, 1.13, 0), V(0.23 * sx, 0.96, 0), 0.056, 0.054, C.blazer, 'LowerArm_' + s);
    cyl(V(0.23 * sx, 0.98, 0), V(0.232 * sx, 0.925, 0), 0.062, 0.062, C.blazerDark, 'LowerArm_' + s);
    sph(V(0.234 * sx, 0.875, 0.005), 0.045, C.skin, 'Hand_' + s, [0.8, 1.15, 0.95]);
  }
  // ---- Neck and head
  cyl(V(0, 1.54, 0), V(0, 1.42, 0), 0.046, 0.05, C.skin, 'Neck', 14);
  sph(V(0, 1.625, 0.005), 0.135, C.skin, 'Head', [1, 1.08, 0.95]);
  sph(V(0, 1.6, 0.135), 0.022, C.skin, 'Head', [0.9, 1.2, 1]);              // nose
  for (const sx of [1, -1]) {
    sph(V(0.133 * sx, 1.615, 0), 0.03, C.skin, 'Head', [0.6, 1, 1]);       // ears
    sph(V(0.054 * sx, 1.645, 0.108), 0.05, C.white, 'Head', [1, 1.08, 0.66]); // big eyes
    sph(V(0.054 * sx, 1.633, 0.14), 0.014, C.pupil, 'Head', [1, 1, 0.5]);   // pupils (sleepy, low)
    sph(V(0.054 * sx, 1.645, 0.108), 0.0525, C.lid, 'Head', [1, 1.08, 0.68], { ts: 0, tl: Math.PI * 0.42, rx: 0.12 }); // coral lids, half closed
    box(V(0.052 * sx, 1.705, 0.12), 0.06, 0.008, 0.01, C.brow, 'Head');
  }
  box(V(0.008, 1.565, 0.124), 0.055, 0.016, 0.02, C.lip, 'Head', 0, 0.12);
  // ---- Hair: long, straight, blunt bangs
  sph(V(0, 1.64, -0.008), 0.148, C.hair, 'Head', [1.03, 1.08, 1.0], { ts: 0, tl: Math.PI * 0.52 });
  sph(V(0, 1.63, -0.02), 0.146, C.hair, 'Head', [1.03, 1.08, 1.0], { ps: Math.PI * 1.15, pl: Math.PI * 0.7, ts: 0, tl: Math.PI * 0.85 });
  box(V(0, 1.722, 0.105), 0.255, 0.06, 0.07, C.hair, 'Head');
  cap(V(0, 1.4, -0.085), 0.12, 0.34, C.hair, 'Head', [1.2, 1, 0.55]);
  for (const sx of [1, -1]) {
    box(V(0.128 * sx, 1.53, 0.035), 0.05, 0.3, 0.1, C.hair, 'Head');
    box(V(0.075 * sx, 1.33, 0.135), 0.018, 0.24, 0.016, C.hair, 'Chest', 0.18, 0.05 * sx);
  }

  const geo = mergeGeometries(parts, false);
  geo.computeVertexNormals();
  const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.85, metalness: 0 });
  const mesh = new THREE.SkinnedMesh(geo, mat); mesh.name = 'Anita_Body';
  mesh.add(hips); hips.updateMatrixWorld(true);
  mesh.bind(new THREE.Skeleton(bones));
  const root = new THREE.Group(); root.name = 'Anita_Sharma'; root.add(mesh);
  return { root, clips: buildClips() };
}

function q(x, y, z, order = 'XYZ') { return new THREE.Quaternion().setFromEuler(new THREE.Euler(x, y, z, order)).toArray(); }
function track(bone, times, eulers, order) {
  return new THREE.QuaternionKeyframeTrack(bone + '.quaternion', times, eulers.flatMap(e => q(e[0], e[1], e[2], order)));
}
function buildClips() {
  // Idle: Anita's signature pose, arms crossed, with breathing and a slow glance
  const T = [0, 1.5, 3];
  const idle = new THREE.AnimationClip('Idle', 3, [
    track('UpperArm_L', T, [[-0.62, 0, 0.18], [-0.64, 0, 0.18], [-0.62, 0, 0.18]], 'YXZ'),
    track('LowerArm_L', T, [[-1.45, -1.25, 0], [-1.45, -1.25, 0], [-1.45, -1.25, 0]], 'YXZ'),
    track('UpperArm_R', T, [[-0.48, 0, -0.18], [-0.5, 0, -0.18], [-0.48, 0, -0.18]], 'YXZ'),
    track('LowerArm_R', T, [[-1.62, 1.3, 0], [-1.62, 1.3, 0], [-1.62, 1.3, 0]], 'YXZ'),
    track('Chest', T, [[0, 0, 0], [-0.03, 0, 0], [0, 0, 0]]),
    track('Head', [0, 1, 2, 3], [[0.05, 0.12, 0.04], [0.05, 0.12, 0.04], [0.02, -0.08, -0.02], [0.05, 0.12, 0.04]]),
    track('Hips', T, [[0, 0.08, 0.02], [0, 0.08, 0.02], [0, 0.08, 0.02]]),
    track('UpperLeg_L', T, [[0, 0, 0.04], [0, 0, 0.04], [0, 0, 0.04]]),
    track('UpperLeg_R', T, [[0, 0, -0.02], [0, 0, -0.02], [0, 0, -0.02]])
  ]);
  function gait(name, dur, leg, knee, arm, bob, lean) {
    const t = [0, .25, .5, .75, 1].map(x => x * dur);
    const L = [-leg, 0, leg, 0, -leg], R = L.map(v => -v);
    const kL = [0.12, 0.15, 0.35, knee, 0.12], kR = [0.35, knee, 0.12, 0.15, 0.35];
    return new THREE.AnimationClip(name, dur, [
      track('UpperLeg_L', t, L.map(v => [v, 0, 0])), track('UpperLeg_R', t, R.map(v => [v, 0, 0])),
      track('LowerLeg_L', t, kL.map(v => [v, 0, 0])), track('LowerLeg_R', t, kR.map(v => [v, 0, 0])),
      track('Foot_L', t, kL.map(v => [-v * 0.4, 0, 0])), track('Foot_R', t, kR.map(v => [-v * 0.4, 0, 0])),
      track('UpperArm_L', t, R.map(v => [v * arm, 0, 0.1])), track('UpperArm_R', t, L.map(v => [v * arm, 0, -0.1])),
      track('LowerArm_L', t, R.map(v => [-0.35 - Math.max(0, -v) * 0.6, 0, 0])), track('LowerArm_R', t, L.map(v => [-0.35 - Math.max(0, -v) * 0.6, 0, 0])),
      track('Spine', t, [[lean, 0.08, 0], [lean, 0, 0], [lean, -0.08, 0], [lean, 0, 0], [lean, 0.08, 0]]),
      track('Head', t, [[-lean * 0.6, -0.05, 0], [-lean * 0.6, 0, 0], [-lean * 0.6, 0.05, 0], [-lean * 0.6, 0, 0], [-lean * 0.6, -0.05, 0]]),
      new THREE.VectorKeyframeTrack('Hips.position', t, [0, .95 - bob, 0, 0, .95 + bob * 0.4, 0, 0, .95 - bob, 0, 0, .95 + bob * 0.4, 0, 0, .95 - bob, 0])
    ]);
  }
  const walk = gait('Walk', 1.0, 0.5, 0.95, 0.75, 0.025, 0.04);
  const run = gait('Run', 0.62, 0.85, 1.6, 1.0, 0.05, 0.2);
  const wt = [0, 0.3, 0.55, 0.8, 1.05, 1.3, 1.6];
  const up = (z) => [0, 0, z];
  const wave = new THREE.AnimationClip('Wave', 1.6, [
    track('UpperArm_R', wt, [up(-0.1), up(-2.5), up(-2.5), up(-2.5), up(-2.5), up(-2.5), up(-0.1)]),
    track('LowerArm_R', wt, [up(0), up(0.4), up(-0.2), up(0.4), up(-0.2), up(0.3), up(0)]),
    track('UpperArm_L', wt, wt.map(() => [0, 0, 0.08])),
    track('Head', wt, [[0, 0, 0], [0, 0, -0.12], [0, 0, -0.12], [0, 0, -0.12], [0, 0, -0.12], [0, 0, -0.1], [0, 0, 0]]),
    track('Spine', wt, [[0, 0, 0], [0, 0, 0.06], [0, 0, 0.06], [0, 0, 0.06], [0, 0, 0.06], [0, 0, 0.06], [0, 0, 0]])
  ]);
  return [idle, walk, run, wave];
}
