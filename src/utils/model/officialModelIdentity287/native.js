// Original settings override matcher, bound to the existing identity and settings readers.
export function createModelSettingsIdentity287({fb,Doe,Be,tt}){
function cI(e,n){return Ct(e).toLowerCase()===Ct(n).toLowerCase()}
function Ct(e){return e.replace(/\[1m\]$/i,"")}
function Go(e,n,r){if(e===void 0)return;for(let[s,g]of Object.entries(e)){if(!(r?cI(g,n):g===n))continue;let b=fb(s);if(Moe(b,b))return b}return}
function Moe(e,n=Be(e)){return Doe(n)||MI(e,n)}
function MI(e,n){return!1}
function ua(){try{return tt().modelOverrides}catch{return}}
return {resolve:e=>Go(ua(),e,!1)??fb(e)};
}
