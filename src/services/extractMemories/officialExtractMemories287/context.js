// Complete pinned official 2.1.287 extract lifecycle; see provenance.json.
export function createExtractContext287(ports){
const {hdt}=ports;
function Bi(e){return e?.type==="system"&&e.subtype==="compact_boundary"};
function ai(e,n){let r=hdt(e);return r===-1?e:e.slice(r)};
return {Bi,ai};
}
