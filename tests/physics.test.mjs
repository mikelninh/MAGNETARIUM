import test from 'node:test';
import assert from 'node:assert/strict';
import { MU0,wireField,solenoidFieldTesla,toroidFieldTesla,toroidFieldAtRadius,torusPoint,magnetField,polesForMagnet } from '../src/physics.js';
const close=(a,b,eps=1e-11)=>assert.ok(Math.abs(a-b)<eps, `${a} != ${b}`);
test('wire follows the right-hand rule at +x',()=>{
 const b=wireField(1,0,2,0);assert.ok(b[1]>0);close(b[0],0);
 const reversed=wireField(1,0,-2,0);close(reversed[1],-b[1]);
});
test('long air-core solenoid: field proportional to current and turns',()=>{
 const B=solenoidFieldTesla(2,120,.4);close(solenoidFieldTesla(4,120,.4),2*B);close(solenoidFieldTesla(2,240,.4),2*B);
 close(B,MU0*120*2/.4);
});
test('toroidal interior field scales as 1/r, exterior zero in ideal limit',()=>{
 const B=toroidFieldTesla(3,140,.13);
 close(B,2*toroidFieldTesla(3,140,.26));
 close(toroidFieldAtRadius(3,140,.05,.10,.20),0);
 close(toroidFieldAtRadius(3,140,.25,.10,.20),0);
 close(toroidFieldAtRadius(3,140,.13,.10,.20),B);
});
test('torus geometry is a closed surface with major and minor radii',()=>{
 const p=torusPoint(1,.25,0,0);close(p[0],1.25);close(p[1],0);close(p[2],0);
 const a=torusPoint(1,.25,.72,1.1),b=torusPoint(1,.25,.72+2*Math.PI,1.1);
 a.forEach((x,i)=>close(x,b[i]));
});
test('magnet virtual poles have opposite signs and bounded finite field',()=>{
 for(let shape of ['bar','disc','ring','horse']){
  const m={x:0,y:0,angle:0,shape};const ps=polesForMagnet(m);
  assert.equal(ps.length,2);assert.equal(ps[0].q+ps[1].q,0);
  assert.ok(magnetField(.25,.25,[m]).every(Number.isFinite));
 }
});