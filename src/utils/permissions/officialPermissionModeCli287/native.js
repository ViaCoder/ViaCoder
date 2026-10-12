// Complete official 2.1.287 CLI permission parser and alias declarations.
export function createPermissionModeCli287(dHe){
function Tg(e){return e==="manual"?"default":e};
var KF=["acceptEdits","auto","bypassPermissions","default","dontAsk","plan"];
var Vs=[...KF];
function kh(e){let n=Tg(e);return Vs.find((s)=>s===n)};
var nA=Vs;
var YF="manual";
var dn=nA.map((n)=>n==="default"?YF:n);
var Lr=[...nA,YF];
function cn(n){if(!Lr.includes(n))throw new dHe(`Allowed choices are ${dn.join(", ")}.`);return n};
return {choices:dn,parse:cn,normalize:Tg,find:kh};
}
