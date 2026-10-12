// Complete pinned 2.1.287 declarations; see controller-provenance.json.
export function createPolicyActivityGate287(ports){
const {cKt,r}=ports;
function que(){return r().currentStateOrNull()?.mainLoopRefcount??0};
function Kue(){return cKt()||que()>0};
return {Kue};
}
