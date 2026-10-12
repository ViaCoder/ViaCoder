// Complete pinned 2.1.287 declarations; see controller-provenance.json.
export function createPolicyLocks287(ports){
const {E,l,lt,t}=ports;
async function oa(e,r){let n=await lt().lock(e,r);return Object.assign(n,{[Symbol.asyncDispose]:n})};
async function Bf(e,r){if(!e)return;try{await e()}catch(n){let i;try{let u=E(n);i=u==="ERELEASED"||u==="ENOTACQUIRED"?`lock was no longer held at release (${u}); the locked section may have run without exclusivity`:`lock directory could not be removed and is left to go stale: ${l(n)}`}catch{i="lock release rejected with a value that cannot be described"}t(`${r}: ${i}`,{level:"warn"})}};
return {oa,Bf};
}
