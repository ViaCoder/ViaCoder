export function createHooksSnapshot287(ports){
function module0(imports){
const v=imports["v"];
class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}};
function Rs(e){return e.of(v.host)};
return {V,Rs};
}
function module1(imports){

function Le(e){if(!e)return!1;if(typeof e==="boolean")return e;let n=String(e).toLowerCase().trim();return["1","true","yes","on"].includes(n)};
return {Le};
}
function module2(imports){
const Le=imports["Le"];
function i(e){let n=process.argv.indexOf("--");return(n===-1?process.argv:process.argv.slice(0,n)).includes(e)};
function yr(){return Le(process.env.CLAUDE_CODE_SAFE_MODE)||i("--safe-mode")};
return {i,yr};
}
function module3(imports){
const Rs=imports["Rs"];
const V=imports["V"];
const Ro=imports["Ro"];
const ge=imports["ge"];
const yr=imports["yr"];
const er=imports["er"];
const PY=imports["PY"];
function jd(o){let t=ge("policySettings")?.strictPluginOnlyCustomization;if(t===!0)return!0;if(Array.isArray(t))return t.includes(o);return!1};
function s(o){return o};
var i="cli";
class l{snapshotKey=()=>i;snapshotsBySessionId=new Map;setSnapshotKey(o){this.snapshotKey=o}current(){let o=this.snapshotKey(),t=this.snapshotsBySessionId.get(o);if(!t)t={initialHooksConfig:null},this.snapshotsBySessionId.set(o,t);return t}store(o){this.current().initialHooksConfig=o}evict(o){if(o===i)return;this.snapshotsBySessionId.delete(o)}};
var d=new V(()=>new l);
function e(){return Rs(d)};
function n(){let o=ge("policySettings");if(o?.disableAllHooks===!0)return{};if(o?.allowManagedHooksOnly===!0||yr())return o?.hooks??{};if(jd("hooks"))return o?.hooks??{};let t=er();if(t.disableAllHooks===!0)return o?.hooks??{};return s(t.hooks??{})};
function Ty(){return yr()||coe()};
function coe(){let o=ge("policySettings");if(o?.allowManagedHooksOnly===!0)return!0;if(er().disableAllHooks===!0&&o?.disableAllHooks!==!0)return!0;return!1};
function Wb(){return ge("policySettings")?.disableAllHooks===!0};
function _Gr(){e().store(n()),PY()};
function MG(o){Ro(o),e().store(n()),PY()};
function V9(){let o=e().current();if(o.initialHooksConfig===null)Ro(),o.initialHooksConfig=n(),PY();return o.initialHooksConfig};
return {jd,s,i,l,d,e,n,Ty,coe,Wb,_Gr,MG,V9};
}
const m0=module0({"v":ports["root"]});
const m1=module1({});
const m2=module2({"Le":m1["Le"]});
const m3=module3({"Rs":m0["Rs"],"V":m0["V"],"Ro":ports["invalidateSettings"],"ge":ports["settingsForSource"],"yr":m2["yr"],"er":ports["settings"],"PY":ports["notify"]});
return {"snapshot":m3.V9,"capture":m3._Gr,"update":m3.MG,"managedOnly":m3.Ty,"disabled":m3.Wb,"owner":m3.e};
}
