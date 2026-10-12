// Complete pinned 2.1.287 declarations; see controller-provenance.json.
export function createPolicyTunnel287(ports){
const {Me,U,V}=ports;
var Myt="x-claude-code-tunnel-credential-epoch";
var Op=new V(()=>Me());
function mqr(e){let n=WJn(e);if(n!==void 0)Op.of(U().host).emit(n)};
function eVo(e){return Op.of(U().host).subscribe(e)};
function WJn(e){if(e==null||!/^\d{1,15}$/.test(e))return;return Number(e)};
return {mqr,eVo,WJn,Myt};
}
