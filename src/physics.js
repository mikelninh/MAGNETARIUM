/**
 * MAGNETARIUM demonstration models. Coordinates for diagram-only magnets are
 * dimensionless. Coil estimates are idealised air-core SI approximations.
 * These functions are pure and can be unit tested outside a browser.
 */
export const MU0 = 4 * Math.PI * 1e-7;
export const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
export const magnitude = ([x, y]) => Math.hypot(x, y);

export function polesForMagnet(m) {
  const x = Number(m.x) || 0, y = Number(m.y) || 0;
  const a = Number(m.angle) || 0;
  const len = m.shape === 'disc' ? 0.105 : m.shape === 'ring' ? 0.14 : 0.175;
  const dx = Math.cos(a) * len, dy = Math.sin(a) * len;
  // A horseshoe is idealised with poles on its two parallel ends.
  if (m.shape === 'horse') {
    const ux = Math.cos(a), uy = Math.sin(a);
    const vx = -uy, vy = ux;
    return [{x:x+ux*.075+vx*.13,y:y+uy*.075+vy*.13,q:1},{x:x+ux*.075-vx*.13,y:y+uy*.075-vy*.13,q:-1}];
  }
  return [{x:x+dx,y:y+dy,q:1},{x:x-dx,y:y-dy,q:-1}];
}

export function magnetField(x, y, magnets) {
  let bx = 0, by = 0;
  for (const m of magnets) {
    for (const p of polesForMagnet(m)) {
      const dx = x-p.x, dy = y-p.y;
      const r2 = dx*dx + dy*dy + .0045;
      const inv = p.q / (r2*Math.sqrt(r2));
      bx += dx*inv; by += dy*inv;
    }
  }
  return [bx, by];
}

export function wireField(x, y, current, core = .075) {
  // For an effectively infinite straight wire perpendicular to the plane:
  // B = μ₀ I / (2π r), with direction tangent to concentric circles.
  const r2 = x*x+y*y;
  const d = Math.max(core*core, r2);
  const scale = MU0 * current / (2*Math.PI*d);
  return [-y*scale, x*scale];
}

export function solenoidFieldTesla(current, turns, lengthMeters = .40) {
  return MU0 * turns * current / lengthMeters;
}

export function toroidFieldTesla(current, turns, radialDistanceMeters) {
  if (radialDistanceMeters <= 0) return 0;
  return MU0 * turns * current / (2*Math.PI*radialDistanceMeters);
}

export function toroidFieldAtRadius(current, turns, r, innerRadius, outerRadius) {
  return r > innerRadius && r < outerRadius ? toroidFieldTesla(current,turns,r) : 0;
}

/** 3D torus parametrisation: toroidal azimuth t, poloidal angle p. */
export function torusPoint(R, r, t, p) {
  return [(R+r*Math.cos(p))*Math.cos(t), (R+r*Math.cos(p))*Math.sin(t), r*Math.sin(p)];
}
export function torusWinding(R,r,t,turns) {
  return torusPoint(R,r,t,turns*t);
}

export const CHAPTERS = [
 {key:'magnet',category:'01 / MAGNETISM',tag:'MAGNETIC INTERACTION',title:'The invisible<br>handshake.',desc:'A magnet changes the space around it. Another magnet responds—even when nothing touches.',challenge:'Drag either magnet towards the other. Then reverse one pole: where do the field lines go?',why:'Magnets create a magnetic field. Opposite poles tend to attract and like poles repel. This diagram uses a simplified magnetic-pole approximation; the coloured lines represent field directions, not physical threads.',label:'Opposites attract.',hint:'↖ Drag either magnet',equation:'B ~ 1 / r³',equationSub:'FAR-FIELD APPROXIMATION'},
 {key:'compass',category:'02 / MAGNETISM',tag:'DIRECTION IN SPACE',title:'A thousand<br>tiny compasses.',desc:'Place a compass anywhere around a magnet and it reveals the local direction of the magnetic field.',challenge:'Rotate the magnet. Watch every tiny compass turn together. Where is the direction most surprising?',why:'A compass needle is a small magnetic dipole. It tends to align with the local magnetic field, although Earth’s field and friction also matter in the real world. These arrows indicate the calculated direction.',label:'A field has direction.',hint:'↖ Drag or rotate the magnet',equation:'B →',equationSub:'DIRECTION AT EACH POINT'},
 {key:'wire',category:'03 / ELECTROMAGNETISM',tag:'A CURRENT CREATES A FIELD',title:'Electricity<br>draws circles.',desc:'Look straight down a current-carrying wire. A magnetic field curls around it—clockwise or anticlockwise.',challenge:'Reverse the current. Which way do the glowing loops flow now? Increase the current to strengthen the field.',why:'Ampère’s law and the right-hand rule tell us the field circles a long straight wire. For this ideal model, B = μ₀I/(2πr). Reverse the current, and the field reverses too.',label:'Current shapes space.',hint:'↖ Turn the current up or down',equation:'B = μ₀I / 2πr',equationSub:'IDEAL STRAIGHT WIRE'},
 {key:'solenoid',category:'04 / ELECTROMAGNETISM',tag:'FIELD INSIDE A COIL',title:'The field<br>within.',desc:'Wind a wire into a coil and the individual fields reinforce each other. That is the principle behind an electromagnet.',challenge:'Double the number of turns. Does the estimated field inside double? Now reverse the current.',why:'Near the centre of a sufficiently long air-core solenoid, B ≈ μ₀(N/L)I. More turns per metre or more current produces a stronger field. The drawing is a side-view illustration; finite coils have end effects.',label:'Many loops, one field.',hint:'↖ Change the number of turns',equation:'B ≈ μ₀NI / L',equationSub:'IDEAL LONG SOLENOID'},
 {key:'toroid',category:'05 / ELECTROMAGNETISM',tag:'A COIL BENT INTO A CIRCLE',title:'A field<br>without an end.',desc:'Bend a solenoid into a doughnut. In an ideal toroidal coil, the magnetic field mostly loops inside the ring.',challenge:'Drag to turn the torus in 3D. Then reverse the current and follow the animated field. Notice where it is concentrated.',why:'For an ideal closely wound toroidal coil, B ≈ μ₀NI/(2πr) inside the winding region and is small outside. The luminous loops show the toroidal field direction. A toroidal coil is different from an ordinary permanent ring magnet.',label:'A loop inside a loop.',hint:'↖ Drag to rotate the 3D torus',equation:'B ≈ μ₀NI / 2πr',equationSub:'IDEAL TOROID · INTERIOR'},
 {key:'geometry',category:'06 / GEOMETRY & DESIGN',tag:'MATHEMATICS AS ART',title:'Circles become<br>cathedrals.',desc:'Repetition, rhythm and symmetry connect mathematics to rose windows, arches and architectural ornament.',challenge:'Change the symmetry from six to twelve. Then switch from Rose window to Vault or Lattice. What starts to feel architectural?',why:'Circular symmetry, tessellations and arches appear across mathematics and architectural history. “Sacred geometry” is a cultural and symbolic term, not a separate physical force. These designs are mathematical art inspired by nature and buildings—not magnetic-field calculations.',label:'Where pattern becomes place.',hint:'↖ Change the symmetry',equation:'θ = 2π / n',equationSub:'ROTATIONAL SYMMETRY'}
];