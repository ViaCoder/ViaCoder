// Complete pinned 2.1.287 declarations; see controller-provenance.json.
export function createPolicyNetwork287(ports){
const {Me,U,V}=ports;
var e=new V(()=>Me());
function o(){return e.of(U().host)};
function jXn(){o().emit()};
function Z6o(t){return o().subscribe(t)};
return {Z6o,jXn};
}
