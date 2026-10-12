// Complete pinned 2.1.287 declarations; see controller-provenance.json.
export function createPolicyKnownTaints287(ports){
const {L}=ports;
var a=new Set(["hipaa"]);
function Qpe(n){return L(n).filter((e)=>a.has(e))};
return {Qpe};
}
