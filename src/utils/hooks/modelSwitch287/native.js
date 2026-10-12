// Pinned official 2.1.287 original model-switch Hook closure.
export function createModelSwitchFlow287(ports){
const {Hl,LEe,NPe,P4e,PA,Py,R7,Rt,S$,Tk,Tt,Ty,V9,Xc,ZJn,Zyt,_,bQn,dd,fWt,gWt,kRo,l,l$o,lp,lt,oe,one,rte,t,t2e,t4,tDt,tFe,ut,vbe,w$r,xet,yy}=ports;
var MQ=(e)=>dd(`classic.${e}`);
function Exe(e,n,r=xxe()){let s={...lp,cache_creation_input_tokens:n,cache_creation:{ephemeral_5m_input_tokens:r==="5m"?n:0,ephemeral_1h_input_tokens:r==="1h"?n:0}},{usd:g,pricing:h}=ZJn(e,s);return{cache_ttl:r,estimated_cache_write_usd:Math.round(g*1e4)/1e4,pricing:h}}
function xxe(){let e=t4();if(e!==null)return e>=Tk?"1h":"5m";return rte()}
function Axe(e){let n=xet()??0;return{context_tokens:n,prompt_cache_warm:one([]),...Exe(e,n)}}
async function MDt(e){let n=ut();if(await n.hookRegistrationInFlight?.catch(()=>{}),n.hooksUnknownCause===void 0||!w$r())return;if(e){n.hookRegistration=void 0,yy("plugin hook registration retry");let r=n.hookRegistrationArgs;await R7(r?.storageV5,r?.credentials).catch(()=>{}),await n.hookRegistrationInFlight?.catch(()=>{})}return n.hooksUnknownCause}
function LDt(){return ut().hookRegistrationInFlight?.catch(()=>{})}
async function Ian(){return ut().hookRegistration?.then(()=>{return},(e)=>l(e))}
function Lxo(){let e=ut();return w$r()&&(e.hookRegistrationInFlight!==void 0||e.hooksUnknownCause!==void 0)}
var kLe=30000;
var $jt=5000;
function eDt(e,n){let r=e??Py();if(n==="plan"){let s=bQn(r);if(s!==null)return s.model}return Rt(r)}
function YD(e){return eDt(tDt(e),e.toolPermissionContext.mode)}
function ZV(e){if(Lxo())return!0;return QR("PreModelSwitch",tFe.of(e).registry,e.id)}
async function FPr(e,n,r={}){let s=[];await LDt();let g=await MDt(!0);if(g!==void 0)return{decision:"block",reason:`${g}, so organization-managed PreModelSwitch hooks could not be checked. Switching models again re-checks; details are in the debug log`,messages:s};if(!ZV(e))return{decision:"proceed",skipConfirm:!1,messages:s};if(NPe(n.toModel))await vbe(n.toModel);let h={...Xc(e,oe()),hook_event_name:"PreModelSwitch",from_model:n.fromModel,to_model:n.toModel,requested_model:n.requestedModel,source:n.source,...Axe(n.toModel)},b=t2e(n.toModel),w,D,j=!1,z=!1;try{for await(let K of PA({session:e,hookInput:h,toolUseID:fWt(),matchQuery:Zyt(b)?b:void 0,sessionHooks:tFe.of(e).registry,signal:r.signal,timeoutMs:r.timeoutMs??kLe})){if(d$o(K.message,s),K.message?.type==="attachment"&&K.message.attachment.type==="hook_cancelled"&&!r.signal?.aborted)w??=`PreModelSwitch hook ${K.message.attachment.hookName} did not respond before its timeout`;if(K.blockingError)w??=K.blockingError.blockingError;else if(K.permissionBehavior==="ask")j=!0,D??=K.hookPermissionDecisionReason;else if(K.permissionBehavior==="allow")z=!0}}catch(K){t(`PreModelSwitch hooks did not complete: ${K instanceof Hl?"control stream closed":String(K)}`,{level:"error"}),w??=K instanceof Hl?"PreModelSwitch hooks were cancelled (the control stream closed) before answering":"a PreModelSwitch hook failed before answering"}if(w!==void 0)return{decision:"block",reason:w,messages:s};if(j)return{decision:"ask",reason:D,messages:s};return{decision:"proceed",skipConfirm:z,messages:s}}
function B_(e,n,r,s){if(YD(n)!==eDt(r,n.toolPermissionContext.mode))l$o(e,s,r)}
class hWt{pending=[];landedOn=null;inFlight=new Set}
var yWt=new Tt(()=>new hWt);
function $Pr(e,n,r={}){let s=yWt.of(e),g=e.id;s.landedOn={sessionId:g,toModel:n.toModel};let b=(async()=>{await LDt();let w=await MDt(!1)??await Ian();if(w!==void 0)t(`PostModelSwitch: plugin-delivered hooks are missing from this run: ${w}`,{level:"error"});if(NPe(n.toModel))await vbe(n.toModel);let D={...Xc(e,oe()),hook_event_name:"PostModelSwitch",from_model:n.fromModel,to_model:n.toModel,requested_model:n.requestedModel,source:n.source,...Axe(n.toModel)},j=[],z=[];try{for await(let K of PA({session:e,hookInput:D,toolUseID:fWt(),matchQuery:Zyt(t2e(n.toModel))?t2e(n.toModel):void 0,sessionHooks:tFe.of(e).registry,timeoutMs:r.timeoutMs??kLe})){if(K.additionalContexts)j.push(...K.additionalContexts);if(K.message?.type==="attachment"){let he=K.message.attachment;if(he.type==="hook_success"&&he.content)j.push(he.content);if(he.type!=="hook_blocking_error")z.push(K.message)}if(K.blockingError)z.push(P4e("PostModelSwitch",K.blockingError,`PostModelSwitch:${t2e(n.toModel)}`))}}catch(K){t(K instanceof Hl?"PostModelSwitch hooks cancelled (control stream closed)":`PostModelSwitch hooks failed: ${String(K)}`,{level:K instanceof Hl?"debug":"error"})}if(j.length>0||z.length>0)s.pending.push({sessionId:g,toModel:n.toModel,contexts:j,messages:z})})().catch((w)=>{t(`PostModelSwitch hooks failed: ${String(w)}`,{level:"error"})}).finally(()=>{s.inFlight.delete(b)});return s.inFlight.add(b),b}
async function RRo(e,n=$jt){let r=yWt.of(e);if(r.inFlight.size>0&&r.landedOn?.sessionId===e.id)await lt(Promise.all([...r.inFlight]),n);let s=r.pending;r.pending=[];let g=s.filter((w)=>w.sessionId===e.id),h=r.landedOn?.sessionId===e.id?r.landedOn.toModel:void 0,b=new Set;return g.filter((w)=>{if(w.toModel!==h)return!1;let D=_([w.contexts,w.messages.map((j)=>j.type==="attachment"?[j.attachment.type,"content"in j.attachment?j.attachment.content:"","stderr"in j.attachment?j.attachment.stderr:""]:j.type)]);if(b.has(D))return!1;return b.add(D),!0})}
function d$o(e,n){if(e?.type!=="attachment")return;let r=e.attachment;if(r.type==="hook_system_message")n.push(r.content);else if(r.type==="hook_non_blocking_error"){let s=r.stderr.trim();n.push(`PreModelSwitch hook ${r.hookName} failed${s?`: ${s}`:""}`)}}
function QR(e,n,r){return mFe(e,n,r)||MQ(e)}
function mFe(e,n,r){let s=V9()?.[e];if(s&&s.length>0)return!0;if(!Ty()){let b=LEe()?.[e];if(b&&b.length>0)return!0}let g=S$()?.[e];if(g&&g.length>0)return!0;if(n===void 0)return!1;return(typeof r==="string"?[r]:r).some((b)=>n.has(b,e))}
return {FPr,LDt,MDt,ZV,QR,l$o,B_,gWt,kRo,$Pr,RRo,yWt};
}
export function createModelSwitchAttachment287(ports){
const {Dfe,OMt}=ports;
function ln(e,n={now:()=>new Date().toISOString(),uuid:()=>Dfe()}){let r=OMt(e);return{attachment:e,type:"attachment",uuid:n.uuid(),timestamp:(e.type==="queued_command"||e.type==="poll_events")&&e.timestamp||n.now(),...r}}
return {ln};
}
export function createModelSwitchChange287(ports){
const {Tt}=ports;
class pWt{next=void 0}
var gWt=new Tt(()=>new pWt);
function l$o(e,n,r){gWt.of(e).next={source:n,requestedModel:r}}
function kRo(e){let n=gWt.of(e),r=n.next??{source:"auto",requestedModel:null};return n.next=void 0,r}
return {l$o,gWt,kRo};
}
export function createModelSwitchPipeline287(ports){
const {K0o,Qrt,u1t}=ports;
async function*PA(e){let{hookInput:n}=e;if(!e.classicChainMember&&!e.managedHooksOnly&&!e.sessionFunctionHooksOnly&&n.hook_event_name!=="PreToolUse"&&Qrt(n.hook_event_name)){yield*K0o(e,n);return}yield*u1t(e)}
return {PA};
}
export function createModelSwitchMatcher287(ports){
const {N,W}=ports;
function gF(r){if(!N(r))return!1;let o=Object.getPrototypeOf(r);return o===null||!W(o)&&Object.getPrototypeOf(o)===null}
function i(r){if(typeof r!=="object"||!r)return!1;try{return Reflect.get(RegExp.prototype,"source",r),!0}catch{return!1}}
function s(r,o,t){if(Array.isArray(r))return Array.prototype.some.call(r,(e)=>s(e,o,t));if(Array.isArray(o))return Array.prototype.some.call(o,(e)=>s(r,e,t));if(typeof r!=="object"||r===null)return r===o;if(gF(r)){if(typeof o!=="object"||!o)return!1;for(let e of Object.keys(r))if(!Object.hasOwn(o,e)||!s(r[e],o[e],t))return!1;return!0}return i(r)&&t(r,String(o))}
var KVr=(r,o)=>s(r,o,()=>!0);
var FQ=(r,o,t)=>Array.isArray(r)?r.some((e)=>FQ(e,o,t)):!gF(r)||!Object.hasOwn(r,o)||KVr(r[o],t);
return {FQ};
}
export function createModelSwitchModules287(ports){
const {FQ,ut}=ports;
var dd=(o,e,s)=>(s??ut().loadedModules).some((r)=>r.hooks(o)&&(e===void 0||Object.entries(e).every(([t,d])=>FQ(r.matcherFor(o),t,d))));
return {dd};
}
export function createModelSwitchFeatures287(ports){
const {Ut,xr,yr}=ports;
var t={claudeMd:!0,skills:!0,workflows:!1,plugins:!0,pluginMonitors:!1,themes:!1,hljsLanguages:!0,hooks:!0,statusLine:!1,fileSuggestion:!1,mcpAutoDiscovered:!1,mcpClaudeAi:!1,mcpAgentFrontmatter:!0,agents:!0,outputStyles:!1,lspServers:!0,keybindings:!1};
var l={claudeMd:!1,skills:!1,workflows:!1,plugins:!1,pluginMonitors:!1,themes:!1,hljsLanguages:!1,hooks:!0,statusLine:!0,fileSuggestion:!0,mcpAutoDiscovered:!1,mcpClaudeAi:!1,mcpAgentFrontmatter:!1,agents:!1,outputStyles:!1,lspServers:!1,keybindings:!1};
var o={claudeMd:!1,skills:!1,workflows:!1,plugins:!1,pluginMonitors:!1,themes:!1,hljsLanguages:!1,hooks:!1,statusLine:!0,fileSuggestion:!0,mcpAutoDiscovered:!1,mcpClaudeAi:!1,mcpAgentFrontmatter:!1,agents:!1,outputStyles:!1,lspServers:!1,keybindings:!1};
function Gr(e,s){if(o[e]&&Ut())return!0;if(yr()&&!l[e])return!0;if(xr()&&!s?.explicitlyRequested)return t[e];return!1}
return {Gr};
}
export function createModelSwitchSimple287(ports){
const {Le}=ports;
function i(e){let n=process.argv.indexOf("--");return(n===-1?process.argv:process.argv.slice(0,n)).includes(e)}
function xr(){return Le(process.env.CLAUDE_CODE_SIMPLE)||i("--bare")}
function yr(){return Le(process.env.CLAUDE_CODE_SAFE_MODE)||i("--safe-mode")}
return {yr,xr};
}
export function createModelSwitchDisabled287(ports){
const {ge}=ports;
function Wb(){return ge("policySettings")?.disableAllHooks===!0}
return {Wb};
}
export function createModelSwitchGate287(ports){
const {Gr,Wb,yr}=ports;
function w$r(){return!Gr("hooks")&&!Wb()&&!yr()}
return {w$r};
}
export function createModelSwitchErrors287(ports){
const {}=ports;
class Ye extends Error{constructor(n){super(n);this.name="AbortError"}}
class Hl extends Ye{}
class P extends Error{telemetryMessage;errorClass;constructor(n,e,t){super(n);this.name="TelemetrySafeError",this.telemetryMessage=e??n,this.errorClass=t}}
return {Hl,P};
}
export function createModelSwitchCatalog287(ports){
const {Gj,P,Vn,g,ho}=ports;
function gse(e){return g().catalogIdByProviderId.get(e.toLowerCase())}
function D8r(e){let t=e.pricing;if(typeof t!=="string")return t;let n=Gj().pricing_tiers;return Object.hasOwn(n,t)?n[t]:void 0}
function i(e){for(let t of["bedrock","vertex","foundry","anthropicAws"])if(e[t]===null)throw new P(`named CLAUDE_*_CONFIG export for '${e.firstParty}' has null ${t}`,"named model config export has null 3P provider id");return e}
var VQe=i(ho.fable5);
var M9o={firstParty:"claude-mythos-5",bedrock:"us.anthropic.claude-mythos-5",vertex:"claude-mythos-5",foundry:"claude-mythos-5",anthropicAws:"claude-mythos-5",anthropicGoogleCloud:"claude-mythos-5",mantle:"anthropic.claude-mythos-5",gateway:"claude-mythos-5",eagerInputStreaming:{bedrock:!0,vertex:!0}};
function ECn(){return Vn()}
return {D8r,gse,VQe,M9o,ECn};
}
export function createModelSwitchLookup287(ports){
const {}=ports;
function ra(e,r){return Object.hasOwn(e,r)?e[r]:void 0}
return {ra};
}
export function createModelSwitchLexical287(ports){
const {}=ports;
function qj(e){return e!==null&&e.trailer===void 0}
return {qj};
}
export function createModelSwitchIdentity287(ports){
const {Be,Ct,Fn,MSt,Qfe,pse,xa}=ports;
function NPe(e){return e.includes("application-inference-profile")&&typeof Qfe(Fn(e))!=="string"}
function $b(){return["claude-3-opus","claude-3-sonnet","claude-3-haiku"]}
var PI=new Set($b());
function Doe(e){let n=Ct(e);return xa(n)!==void 0||PI.has(n)||n===MSt}
function t2e(e){return Ct(Be(e,{overridesMap:pse()??{},identity:!0}))}
function Zyt(e){return Doe(e)}
return {t2e,Zyt,NPe};
}
export function createModelSwitchPricing287(ports){
const {Be,C,D8r,ECn,Fn,Gj,Kd,M9o,No,P,QZ,VQe,cL,de,f,gse,hse,le,o,pse,qQe,qj,ra,u,vwe,wu}=ports;
var sx={inputTokens:5,outputTokens:25,promptCacheWriteTokens:6.25,promptCacheWrite1hTokens:10,promptCacheReadTokens:0.5,webSearchRequests:0.01};
var Us={inputTokens:10,outputTokens:50,promptCacheWriteTokens:12.5,promptCacheWrite1hTokens:20,promptCacheReadTokens:1,webSearchRequests:0.01};
var Uyt=sx;
function d_(e,n){let{input:r,output:s,cache_write_5m:g,cache_write_1h:h,cache_read:b,web_search:v}=n;if(g===void 0||b===void 0||v===void 0)throw new P(`model catalog entry '${e}' has incomplete pricing \u2014 baked entries need the full ModelCosts shape`,"model catalog entry has incomplete pricing");return{inputTokens:r,outputTokens:s,promptCacheWriteTokens:g,...h!==void 0&&{promptCacheWrite1hTokens:h},promptCacheReadTokens:b,webSearchRequests:v}}
var ax=new Set(hse);
function Zu(e){return ax.has(e)}
function lx(){let e={};for(let n of Gj().models){let r=D8r(n);if(r===void 0)continue;if(!Zu(n.id))throw new P(`model catalog id '${n.id}' missing from CATALOG_MODEL_IDS \u2014 regenerate with 'bun run generate:model-catalog'`,"model catalog id missing from CATALOG_MODEL_IDS");e[n.id]=d_(n.id,r)}return e}
var $3=Object.assign(Object.create(null),{[fb(VQe.firstParty)]:Us,[fb(M9o.firstParty)]:Us,...lx()});
function ux(e,n){let r=n.cache_creation_input_tokens??0,s=e.promptCacheWrite1hTokens,g=Math.min(n.cache_creation?.ephemeral_1h_input_tokens??0,r);if(s===void 0||g<=0)return r/1e6*e.promptCacheWriteTokens;return g/1e6*s+(r-g)/1e6*e.promptCacheWriteTokens}
var dx=1.1;
function cx(e){return e.inference_geo==="us"?dx:1}
function j7e(e,n){let r=n.input_tokens/1e6*e.inputTokens+n.output_tokens/1e6*e.outputTokens+(n.cache_read_input_tokens??0)/1e6*e.promptCacheReadTokens+ux(e,n),s=(n.server_tool_use?.web_search_requests??0)*e.webSearchRequests;return r*cx(n)+s}
function ed(e,n){return e!=null&&Object.hasOwn(e,n)?e[n]:void 0}
var px="alder_ford";
var gx=f(()=>de(o(),u({as:o(),ends_at:C().positive().lt(100000000000)}).optional().catch(void 0)));
function c_(e){if(!ECn())return;let n=gx().safeParse(Kd()?.[px]),r=n.success?ra(n.data,e):void 0;return r!==void 0&&Date.now()<r.ends_at*1000&&ed($3,r.as)!==void 0?r.as:void 0}
function td(e){let n=c_(e);return n===void 0?void 0:ed($3,n)}
function nd(e){return Be(Fn(e),{identity:!0})}
function Bs(e,n){return e.exact.get(Fn(n).toLowerCase())??(e.builtin.size>0?e.builtin.get(Be(n,{overridesMap:e.adminOverrides??pse()??{},identity:!0})):void 0)}
function ZJn(e,n){let r=No(),s=r?.multiplier??1,g=r?Bs(r,e):void 0;if(g)return{usd:j7e(g,{...n,inference_geo:null})*s,pricing:"configured"};let h=yx(e);if(h)return{usd:j7e(h,n)*s,pricing:s!==1?"configured":"catalog"};return{usd:j7e(Uyt,n)*s,pricing:"default"}}
function yx(e){let n=td(nd(e));if(n)return n;let r=Be(e),s=$3[r];if(s)return s;let g=le().additionalModelCostsCache;return(g?ra(g,e)??ra(g,r):void 0)||void 0}
function fb(e){e=e.toLowerCase();let n=cL().canonicalNameMemo,r=n.get(e);if(r!==void 0)return r;let s=OI(e);if(e.length<=256){if(n.size>=256)n.clear();n.set(e,s)}return s}
function OI(e){let n=gse(e);if(n!==void 0)return n;for(let s of QZ)if(s!=="us"&&e.startsWith(`${s}.anthropic.`)){let g=gse(`us${e.slice(s.length)}`);if(g!==void 0)return g;break}let r=wu(e);if(qj(r))return xI(r)??Ab(r.base);if(e.includes("claude-fable-5-1"))return"claude-fable-5-1";if(e.includes("claude-fable-5"))return"claude-fable-5";if(e.includes("claude-mythos-5-1"))return"claude-mythos-5-1";if(e.includes("claude-mythos-5"))return"claude-mythos-5";if(e.includes("claude-opus-5-5"))return"claude-opus-5-5";if(e.includes("claude-opus-5"))return"claude-opus-5";if(e.includes("claude-opus-4-8"))return"claude-opus-4-8";if(e.includes("claude-opus-4-7"))return"claude-opus-4-7";if(e.includes("claude-opus-4-6"))return"claude-opus-4-6";if(e.includes("claude-opus-4-5"))return"claude-opus-4-5";if(e.includes("claude-opus-4-1"))return"claude-opus-4-1";if(/claude-opus-4(?!-\d(?!\d))/.test(e))return"claude-opus-4-0";if(e.includes("claude-sonnet-5-5"))return"claude-sonnet-5-5";if(e.includes("claude-sonnet-5"))return"claude-sonnet-5";if(e.includes("claude-sonnet-4-6"))return"claude-sonnet-4-6";if(e.includes("claude-sonnet-4-5"))return"claude-sonnet-4-5";if(/claude-sonnet-4(?!-\d(?!\d))/.test(e))return"claude-sonnet-4-0";if(e.includes("claude-haiku-4-5"))return"claude-haiku-4-5";if(e.includes("claude-3-7-sonnet"))return"claude-3-7-sonnet";if(e.includes("claude-3-5-sonnet"))return"claude-3-5-sonnet";if(e.includes("claude-3-5-haiku"))return"claude-3-5-haiku";if(e.includes("claude-3-opus"))return"claude-3-opus";if(e.includes("claude-3-sonnet"))return"claude-3-sonnet";if(e.includes("claude-3-haiku"))return"claude-3-haiku";return Ab(e)}
function Ab(e){return e.replace(/-\d{8}$/,"")}
function xI(e){let n=[...vwe().models.map((r)=>r.id),...$b()];for(let r of n){let s=wu(r);if(qj(s)&&qQe(s,e))return r}return}
function $b(){return["claude-3-opus","claude-3-sonnet","claude-3-haiku"]}
return {ZJn,yx};
}
export function createModelSwitchUsage287(ports){
const {}=ports;
var lp={output_tokens_details:{thinking_tokens:0},input_tokens:0,cache_creation_input_tokens:0,cache_read_input_tokens:0,output_tokens:0,server_tool_use:{web_search_requests:0,web_fetch_requests:0},service_tier:"standard",cache_creation:{ephemeral_1h_input_tokens:0,ephemeral_5m_input_tokens:0},inference_geo:"",iterations:[],speed:"standard",fallback_credit:null};
return {lp};
}
