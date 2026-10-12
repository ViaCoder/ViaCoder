export function createHookRegistryAccessors287(ports){
function module0(imports){

var s=globalThis.process?.getBuiltinModule?.("async_hooks");
var wKt=s?(e)=>s.AsyncResource.bind(e):(e)=>e;
function Me(){let e=new Set;return{subscribe(n){let r=wKt(n);return e.add(r),()=>{e.delete(r)}},emit(...n){let r;for(let o of e)try{o(...n)}catch(i){(r??=[]).push(i)}if(r)throw r.length===1?r[0]:AggregateError(r,"Signal listener(s) threw")},clear(){e.clear()}}};
return {s,wKt,Me};
}
function module1(imports){
const c=imports["c"];
const n=imports["n"];
const v=imports["v"];
const Me=imports["Me"];
class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}};
function Rs(e){return e.of(v.host)};
function R(){return c()??n().hookRegistry.holder()};
function Wz(e){let t=R();if(!t.registeredHooks)t.registeredHooks={};for(let[o,r]of Object.entries(e)){let i=o;if(!t.registeredHooks[i])t.registeredHooks[i]=[];t.registeredHooks[i].push(...r)}PY()};
function S$(){return R().registeredHooks};
function nKt(){let e=R();e.registeredHooks=null,e.sdkHostOutOfReachNoted=void 0,PY()};
function Gi(){let e=R();if(!e.registeredHooks)return;let t=e.pluginHookRunner,o={};for(let[r,i]of Object.entries(e.registeredHooks)){let s=i.filter((a)=>!("pluginRoot"in a)||t?.holds(a.pluginId)===!0);if(s.length>0)o[r]=s}e.registeredHooks=Object.keys(o).length>0?o:null,PY()};
var Tn=new V(()=>Me());
function PY(){Rs(Tn).emit()};
function Nto(e){return Rs(Tn).subscribe(e)};
function dC(){let e=c();return e?e.mainThreadAgentType:n().hookRegistry.mainThreadAgentType()};
function uee(e){let t=c();if(t)t.mainThreadAgentType=e;else n().hookRegistry.replaceMainThreadAgentType(e)};
function LEe(){let e=c();return e?e.mainThreadAgentHooks:n().hookRegistry.mainThreadAgentHooks()};
function _kn(e){let t=c();if(t)t.mainThreadAgentHooks=e;else n().hookRegistry.replaceMainThreadAgentHooks(e);PY()};
return {V,Rs,R,Wz,S$,nKt,Gi,Tn,PY,Nto,dC,uee,LEe,_kn};
}
const m0=module0({});
const m1=module1({"c":ports["legacy"],"n":ports["execution"],"v":ports["root"],"Me":m0["Me"]});
return {"holder":m1.R,"register":m1.Wz,"registered":m1.S$,"clear":m1.nKt,"clearPlugins":m1.Gi,"agentType":m1.dC,"setAgentType":m1.uee,"agentHooks":m1.LEe,"setAgentHooks":m1._kn,"notify":m1.PY,"subscribe":m1.Nto};
}
