// Complete pinned official 2.1.287 source; see provenance.json.
export function createSideQueryOnce287(ports){
const {U,V}=ports;
class s{#t=new Set;#e=new Map;lastBellAt=0;claim(t){if(this.#t.has(t))return!1;return this.#t.add(t),!0}has(t){return this.#t.has(t)}claimIfChanged(t,e){if(this.#e.get(t)===e)return!1;return this.#e.set(t,e),!0}};
var oK=new V(()=>new s);
function rl(){return oK.of(U().host)};
return {rl};
}
