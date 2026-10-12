// Original 287 checksum closure.
export function createPolicyChecksum287({_m,_}){
function aO(e){if(Array.isArray(e))return e.map(aO);if(e!==null&&typeof e==="object"){let n={};for(let s of Object.keys(e).sort())n[s]=aO(e[s]);return n}return e};
function Dwe(e){let n=aO(e),s=_(n);return`sha256:${_m("sha256").update(s).digest("hex")}`};
return {Dwe};
}
