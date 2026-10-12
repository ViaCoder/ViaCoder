// Complete pinned 2.1.287 declarations; see controller-provenance.json.
export function createPolicySignal287(ports){
const {}=ports;
var s=globalThis.process?.getBuiltinModule?.("async_hooks");
var wKt=s?(e)=>s.AsyncResource.bind(e):(e)=>e;
function Me(){let e=new Set;return{subscribe(n){let r=wKt(n);return e.add(r),()=>{e.delete(r)}},emit(...n){let r;for(let o of e)try{o(...n)}catch(i){(r??=[]).push(i)}if(r)throw r.length===1?r[0]:AggregateError(r,"Signal listener(s) threw")},clear(){e.clear()}}};
return {Me};
}
