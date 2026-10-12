// Complete original host-scoped J9e/Z_n/dN gate and V cell owner.
export function createBuiltinAgentPolicy287({a,U}){
class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}};
class J9e{latched=void 0;isEnabled(){return this.latched??=!a.CLAUDE_CODE_DISABLE_EXPLORE_PLAN_AGENTS,this.latched}};
var Z_n=new V(()=>new J9e);
function dN(){return Z_n.of(U().host).isEnabled()};
return {isEnabled:dN,registry:Z_n};
}
