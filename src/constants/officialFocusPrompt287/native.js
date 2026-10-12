// Generated complete 2.1.287 focus prompt, invalidation and override closures.
function module0(imports){

class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}};
return {V};
}
function module1(imports){

var s=globalThis.process?.getBuiltinModule?.("async_hooks");
var wKt=s?(e)=>s.AsyncResource.bind(e):(e)=>e;
function Me(){let e=new Set;return{subscribe(n){let r=wKt(n);return e.add(r),()=>{e.delete(r)}},emit(...n){let r;for(let o of e)try{o(...n)}catch(i){(r??=[]).push(i)}if(r)throw r.length===1?r[0]:AggregateError(r,"Signal listener(s) threw")},clear(){e.clear()}}};
return {s,wKt,Me};
}
function module2(imports){
const tt=imports["tt"];
const le=imports["le"];
const Fet=imports["Fet"];
const yR=imports["yR"];
const V=imports["V"];
const Me=imports["Me"];
const U=imports["U"];
const ly=imports["ly"];
const RL=imports["RL"];
const Ki=imports["Ki"];
var vu=new V(()=>Me());
function Zi(){return vu.of(U().host)};
function kSe(){let e=tt().viewMode;return e?e==="focus":le().briefTranscript??!1};
function _hn(e){let{viewMode:n=null,...r}=ly()??{};if(n===e)return;RL(e?{...r,viewMode:e}:r),Ki.notifyChange("flagSettings"),egt()};
var Ji=["",":L"];
function egt(){for(let e of Ji)Fet().delete(`focus_mode${e}`);yR("focus_mode"),Zi().emit()};
return {vu,Zi,kSe,_hn,Ji,egt};
}
function module3(imports){
const Ce=imports["Ce"];
const ge=imports["ge"];
const kSe=imports["kSe"];
const AG=imports["AG"];
var elo=`# Focus mode
The user has focus mode enabled. In focus mode, the user only sees your final text message in each response. They do not see tool calls, tool results, or any text you emit between tool calls. This overrides earlier guidance about giving short updates between tool calls \u2014 skip those updates and put everything the user needs to know in your final message. Do not assume they saw earlier progress updates.`;
var tlo=`# Focus mode
The user has focus mode enabled. They only see your final text message in each response \u2014 not tool calls, tool results, or any text you write between tool calls. Anything you say mid-turn is not seen, so don't narrate progress between tool calls. Put everything the user needs into your final message: what you investigated, what you found, what you changed, decisions you made, and what's next. Do not assume they saw earlier output.`;
function nlo(e){if(Ce()){if(ge("flagSettings")?.viewMode!=="focus")return null}else if(!kSe())return null;return AG(e)?tlo:elo};
return {elo,tlo,nlo};
}
export function createOfficialFocusPrompt287(ports){
const m0=module0({});
const m1=module1({});
const m2=module2({"tt":ports["settings"],"le":ports["globalConfig"],"Fet":ports["sections"],"yR":ports["noteInvalidation"],"V":m0.V,"Me":m1.Me,"U":ports["execution"],"ly":ports["flagSettings"],"RL":ports["setFlagSettings"],"Ki":ports["settingsChangeDetector"]});
const m3=module3({"Ce":ports["nonInteractive"],"ge":ports["settingsForSource"],"kSe":m2.kSe,"AG":ports["lean"]});
return {guidance:m3.nlo,enabled:m2.kSe,invalidate:m2.egt,override:m2._hn,signal:m2.Zi};
}
