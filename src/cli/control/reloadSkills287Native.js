// Fixed official 2.1.287 print-local uv; only the lexical import boundary is transported.
export function createReloadSkillsProjection287(ports){
const {l2,mcn,Is,cLt}=ports;
function uv(e,r,n){return{skills:l2(e,r).map((g)=>{let{builtin:w,...h}=mcn(g),M=Is(h.name,n),v=M!==void 0&&cLt(M)&&cLt(g);return{...h,...v&&{builtin:!0}}})}}
return uv
}
