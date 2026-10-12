// Complete pinned official 2.1.287 source; see provenance.json.
export function createSideQueryEffort287(ports){
const {Be,nu,ny}=ports;
function $v(e){return nu.includes(e)};
function b(e){return nu.indexOf(e)};
var PXe="high";
function XYn(e){return $v(e)&&b(e)>b(PXe)};
function JYn(e){let n=Be(e);return ny(n,"thinking_disabled_effort_cap",e)??n==="claude-opus-5"};
return {XYn,JYn,PXe};
}
