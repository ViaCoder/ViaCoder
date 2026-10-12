// Exact fixed287 cleanup closure; shared by cold config and the full Mods graph.
const v={get host(){return import.meta.require('../../../services/context/execution287.js').getRootExecutionSession287().host}};
class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}};
function Rs(e){return e.of(v.host)};
function rn(e){if(typeof e==="function")return e;if(Symbol.asyncDispose in e)return()=>e[Symbol.asyncDispose]();return()=>e[Symbol.dispose]()};
class De{#e=new Set;#t=!1;get drainStarted(){return this.#t}register(e){let n=rn(e);this.#e.add(n);let r=()=>{this.#e.delete(n)};return Object.assign(r,{[Symbol.dispose]:r})}async drain(){this.#t=!0;let e=Array.from(this.#e);this.#e.clear();let r=(await Promise.allSettled(e.map(async(s)=>s()))).find((s)=>s.status==="rejected");if(r!==void 0)throw r.reason}async[Symbol.asyncDispose](){await this.drain()}get sizeForTesting(){return this.#e.size}};
class rt{cleanup=new De;preExitFlush=new De};
var sn=new V(()=>new rt);
function se(){return Rs(sn)};
function _t(e){return se().cleanup.register(e)};
async function uet(){await se().cleanup.drain()};
function mA(){return se().cleanup.drainStarted};
function uR(e){return se().preExitFlush.register(e)};
async function jTn(){await se().preExitFlush.drain()};
export {sn as cleanupSlot287,se,_t,uet,mA,uR,jTn};
