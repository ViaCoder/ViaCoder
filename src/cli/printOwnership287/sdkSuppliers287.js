import {PassThrough as genericBuiltin0} from "stream";
import {URL as genericBuiltin1} from "url";
import {fstatSync as genericBuiltin2} from "fs";
import {createWriteStream as genericBuiltin3} from "fs";
import {randomUUID as genericBuiltin4} from "crypto";
export function createPrintSdkSuppliers287(borrow287,filesNamespaces287){
const builtin287={"stream:PassThrough":genericBuiltin0,"url:URL":genericBuiltin1,"fs:fstatSync":genericBuiltin2,"fs:createWriteStream":genericBuiltin3,"crypto:randomUUID":genericBuiltin4};
const embeddedRequire287=file=>filesNamespaces287[file]??genericNamespaces287[file];const embeddedImport287=async file=>embeddedRequire287(file);
function genericModule0(imports){
const Po=imports["Po"];
const eIt=imports["eIt"];
const Wa=imports["Wa"];
const iAr=imports["iAr"];
const Zqe=imports["Zqe"];
const Qqe=imports["Qqe"];
const wo=imports["wo"];
const Eo=imports["Eo"];
const Ja=imports["Ja"];
const lt=imports["lt"];
const bn=imports["bn"];
const Zr=imports["Zr"];
const Gr=imports["Gr"];
const vr=imports["vr"];
const to=imports["to"];
const rb=imports["rb"];
const kt=imports["kt"];
const hn=imports["hn"];
const y=imports["y"];
const Kr=imports["Kr"];
const m=imports["m"];
const Go=imports["Go"];
const zI=imports["zI"];
const VI=imports["VI"];
const Mt=imports["Mt"];
const FB=imports["FB"];
async function gf(e,n,r,s){let h=[],g=[],w=[];Po();let E=await Promise.allSettled(Object.entries(e).map(async([v,U])=>{let V=new eIt(v,n,Wa(v,r?.get(v))),ue=new iAr({...Zqe,version:{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.287",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-10-01T16:02:06Z",GIT_SHA:"3c446a1b98aceb99a6cdee0f84a8bea42f4a8937",HOOKS_WORKER_URL:"/$bunfs/root/src/plugins/functionHooks/hooks-worker/hooks-worker.js",DD_SOURCEMAP_GROUP:"darwin"}.VERSION??"unknown"},{capabilities:Qqe,jsonSchemaValidator:new wo,versionNegotiation:Eo("sdk-control")}),Q=!1;try{let le=ue.connect(V,{timeout:Ja()});if(!await lt(le.then(()=>!0),Ja()))throw le.catch(()=>{}),V.close().catch(()=>{}),Q=!0,bn(`SDK MCP server "${v}" connection timed out after ${Ja()}ms`);let Le=ue.getServerCapabilities(),Ie=ue.getInstructions(),ge=Zr(Ie,v),xe={type:"connected",serverInfo:ue.getServerVersion(),name:v,capabilities:Le||{},instructions:ge,negotiatedProtocolVersion:ue.getNegotiatedProtocolVersion(),protocolEra:ue.getProtocolEra(),client:Gr(ue),config:{...U,scope:"dynamic"},cleanup:async()=>{await ue.close()}},b=vr(xe.name,xe.config);if(to().toolLists.delete(b),rb())kt.invalidateMcpSkillsForServer(b);let oe=[];if(Le?.tools){let L=await hn(xe,s);oe.push(...L)}let R=rb()&&Le?.resources?await kt.fetchMcpSkillsForClient(xe,s):[];return y("mcp_sdk_connect"),Kr(V.manifestOutcome,!0),{client:xe,tools:oe,commands:R}}catch(le){return m("mcp_sdk_connect",Q?"mcp_sdk_connect_timeout":"mcp_sdk_connect_failed"),Kr(V.manifestOutcome,!1),Go(v,`Failed to connect SDK MCP server: ${le}`),{client:{type:"failed",name:v,config:{...U,scope:"user"}},tools:[],commands:[]}}}));for(let v of E)if(v.status==="fulfilled")h.push(v.value.client),g.push(...v.value.tools),w.push(...v.value.commands);if(h.some((v)=>v.type==="connected"&&!!v.capabilities?.resources)){if(![zI,VI].some((U)=>g.some((V)=>Mt(V,U.name))))g.push(zI,VI,FB)}return{clients:h,tools:g,commands:w}};
return {gf,Po,eIt,Wa,iAr,Zqe,Qqe,wo,Eo,Ja,lt,bn,Zr,Gr,vr,to,rb,kt,hn,y,Kr,m,Go,zI,VI,Mt,FB}
}
function genericModule1(imports){
const Zt=imports["Zt"];
const eIt=imports["eIt"];
const qn=imports["qn"];
const Et=imports["Et"];
const Zqe=imports["Zqe"];
const Qqe=imports["Qqe"];
const Ja=imports["Ja"];
const lt=imports["lt"];
const Yo=imports["Yo"];
const Lo=imports["Lo"];
const VGt=imports["VGt"];
const vr=imports["vr"];
const to=imports["to"];
const rb=imports["rb"];
const Ve=imports["Ve"];
const Ct=imports["Ct"];
const y=imports["y"];
const Oo=imports["Oo"];
const m=imports["m"];
const Go=imports["Go"];
const zI=imports["zI"];
const VI=imports["VI"];
const Mt=imports["Mt"];
const FB=imports["FB"];
async function Fd(e,r,n,s){let u=[],h=[],g=[];Zt();let C=await Promise.allSettled(Object.entries(e).map(async([w,M])=>{let x=new eIt(w,r,qn(w,n?.get(w))),K=new Et({...Zqe,version:{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.287",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-10-01T16:02:06Z",GIT_SHA:"3c446a1b98aceb99a6cdee0f84a8bea42f4a8937",HOOKS_WORKER_URL:"/$bunfs/root/src/plugins/functionHooks/hooks-worker/hooks-worker.js",DD_SOURCEMAP_GROUP:"darwin"}.VERSION??"unknown"},{capabilities:Qqe}),z=!1;try{let V=K.connect(x,{timeout:Ja()});if(!await lt(V.then(()=>!0),Ja()))throw V.catch(()=>{}),x.close().catch(()=>{}),z=!0,Yo(`SDK MCP server "${w}" connection timed out after ${Ja()}ms`);let Te=K.getServerCapabilities(),A=K.getInstructions(),j=Lo(A,w),ie={type:"connected",serverInfo:K.getServerVersion(),name:w,capabilities:Te||{},instructions:j,client:VGt(K),config:{...M,scope:"dynamic"},cleanup:async()=>{await K.close()}},U=vr(ie.name,ie.config);if(to().toolLists.delete(U),rb())Ve.invalidateMcpSkillsForServer(U);let ye=[];if(Te?.tools){let v=await Ct(ie,s);ye.push(...v)}let E=rb()&&Te?.resources?await Ve.fetchMcpSkillsForClient(ie,s):[];return y("mcp_sdk_connect"),Oo(x.manifestOutcome,!0),{client:ie,tools:ye,commands:E}}catch(V){return m("mcp_sdk_connect",z?"mcp_sdk_connect_timeout":"mcp_sdk_connect_failed"),Oo(x.manifestOutcome,!1),Go(w,`Failed to connect SDK MCP server: ${V}`),{client:{type:"failed",name:w,config:{...M,scope:"user"}},tools:[],commands:[]}}}));for(let w of C)if(w.status==="fulfilled")u.push(w.value.client),h.push(...w.value.tools),g.push(...w.value.commands);if(u.some((w)=>w.type==="connected"&&!!w.capabilities?.resources)){if(![zI,VI].some((M)=>h.some((x)=>Mt(x,M.name))))h.push(zI,VI,FB)}return{clients:u,tools:h,commands:g}};
return {Fd,Zt,eIt,qn,Et,Zqe,Qqe,Ja,lt,Yo,Lo,VGt,vr,to,rb,Ve,Ct,y,Oo,m,Go,zI,VI,Mt,FB}
}
function genericModule2(imports){
const Zx=imports["Zx"];

return {Zx}
}
function genericModule3(imports){
const qt=imports["qt"];
const gwe=imports["gwe"];

return {qt,gwe}
}
function genericModule4(imports){
const G2=imports["G2"];
const Os=imports["Os"];
function QUo(e,o){Os(e.client)?.transport?.onmessage?.(o)};
return {QUo,G2,Os}
}
function genericModule5(imports){
const f=imports["f"];

return {f}
}
function genericModule6(imports){
const u=imports["u"];
const x=imports["x"];
const o=imports["o"];
const se=imports["se"];
const Ve=imports["Ve"];
const B=imports["B"];

return {u,x,o,se,Ve,B}
}
function genericModule7(imports){
const oE=imports["oE"];
const hu=imports["hu"];

return {oE,hu}
}
function genericModule8(imports){
const on=imports["on"];
const j0=imports["j0"];

return {on,j0}
}
function genericModule9(imports){
const re=imports["re"];

return {re}
}
function genericModule10(imports){
const n=imports["n"];
const jOe=imports["jOe"];
const v3t=imports["v3t"];
const tB=imports["tB"];
const ee=imports["ee"];
function QTn(){let e=process.env.CLAUDE_CODE_REMOTE_SESSION_ID?.trim();return e?tB(e,ee):null};
function Msr(){return n().host.telemetryHandles.eventLoggerOwner()};
function leo(){return n().host.telemetryHandles.windowCloseCause()};
function Nwt(){return n().host.telemetryHandles.hostOtel()};
return {Nwt,Msr,leo,QTn,n,jOe,v3t,tB,ee}
}
function genericModule11(imports){
const IVe=imports["IVe"];

return {IVe}
}
function genericModule12(imports){
const nDe=imports["nDe"];

return {nDe}
}
function genericModule13(imports){
const T8=imports["T8"];
const EL=imports["EL"];
function Oj(){if(T8())return!1;return EL()};
return {Oj,T8,EL}
}
function genericModule14(imports){
const bn=imports["bn"];
const me=imports["me"];
const S=imports["S"];
const c=imports["c"];

return {bn,me,S,c}
}
function genericModule15(imports){
const ye=imports["ye"];

return {ye}
}
function genericModule16(imports){
const ys=imports["ys"];

return {ys}
}
function genericModule17(imports){
const fIe=imports["fIe"];
const le=imports["le"];
const Ae=imports["Ae"];
const B3r=imports["B3r"];
const lo=imports["lo"];
const k=imports["k"];
const xp=imports["xp"];
const BM=imports["BM"];

return {fIe,le,Ae,B3r,lo,k,xp,BM}
}
function genericModule18(imports){
const ldn=imports["ldn"];
const xN=imports["xN"];
const Vg=imports["Vg"];
const Dn=imports["Dn"];
const k=imports["k"];
const d=imports["d"];
const Z=imports["Z"];
const C1=imports["C1"];
function BDr(){try{return Dn.CLAUDE_CODE_REMOTE_TOOLS_JUMP_QUEUE??k("tengu_valiant_rain",!1)===!0}catch(e){return d(Z(e)),!1}};
return {BDr,ldn,xN,Vg,Dn,k,d,Z,C1}
}
function genericModule19(imports){
const u=imports["u"];
const s=imports["s"];
function Gao(){let n=u().filter(s).sort((t,r)=>r.priority-t.priority)[0];if(n===void 0)return!1;return JSON.stringify({id:n.id,title:n.title,text:n.text,footer:n.footer})};
return {Gao,u,s}
}
function genericModule20(imports){
const Zyn=imports["Zyn"];
const eoe=imports["eoe"];

return {Zyn,eoe}
}
function genericModule21(imports){
const F1=imports["F1"];

return {F1}
}
function genericModule22(imports){
const kh=imports["kh"];
const N=imports["N"];

return {kh,N}
}
function genericModule23(imports){
const i=imports["i"];

return {i}
}
function genericModule24(imports){
const hn=imports["hn"];

return {hn}
}
function genericModule25(imports){
const le=imports["le"];
const kh=imports["kh"];
const i=imports["i"];
const me=imports["me"];
const S=imports["S"];
const hn=imports["hn"];
const Ae=imports["Ae"];
function pcr(u,n,o){if(le().hasSeenAutoDefaultNudge)return;let e=kh(n.current_mode);if(u==="shown"){i("tengu_auto_default_nudge_shown",{current_mode:me(e),surface:S("ide")});return}let t=n.choice==="accept"?"accept":"decline";if(t==="accept")hn("userSettings",{permissions:{defaultMode:"auto"}},void 0,o);Ae((r)=>r.hasSeenAutoDefaultNudge?r:{...r,hasSeenAutoDefaultNudge:!0},o),i("tengu_auto_default_nudge_resolved",{choice:S(t),outcome:t==="accept"?S("switched"):S("declined"),current_mode:me(e),surface:S("ide")})};
return {pcr,le,kh,i,me,S,hn,Ae}
}
function genericModule26(imports){
const N=imports["N"];
function frt(e){return typeof e==="number"&&Number.isInteger(e)&&e>0?e:void 0};
function hdo(e,d){let t=new Map,o=[];if(e===void 0||e===null)return{manifests:t,malformedField:!1,malformedServerNames:o};if(!N(e))return{manifests:t,malformedField:!0,malformedServerNames:o};for(let r of d){if(!Object.hasOwn(e,r))continue;let n=e[r],s=N(n)?n.initializeResult:void 0,i=N(n)&&n.toolsListResult!==null?n.toolsListResult:void 0;if(N(s)&&(i===void 0||N(i)))t.set(r,i===void 0?{initializeResult:s}:{initializeResult:s,toolsListResult:i});else o.push(r)}return{manifests:t,malformedField:!1,malformedServerNames:o}};
var l="notifications/tools/list_changed";
function AYt(e){return N(e)&&!("id"in e)&&e.method===l};
return {frt,hdo,AYt,l,N}
}
function genericModule27(imports){
const Ide=imports["Ide"];

return {Ide}
}
function genericModule28(imports){
const f=imports["f"];
const Ve=imports["Ve"];
const B=imports["B"];
const C=imports["C"];
const yot=imports["yot"];
const _7t=imports["_7t"];
const y7t=imports["y7t"];
const F$=imports["F$"];
const TDn=imports["TDn"];
const tCe=imports["tCe"];
const V=imports["V"];
const ryr=imports["ryr"];
function Smo(e){return e instanceof tCe&&e.reason==="worker_register_failed"&&!V(e.httpStatus)};
var bmo=f(()=>Ve({writers:B(["owner_account_only","not_owner_only"]),statedAtMs:C()}));
return {bmo,Smo,f,Ve,B,C,yot,_7t,y7t,F$,TDn,tCe,V,ryr}
}
function genericModule29(imports){
const Cie=imports["Cie"];

return {Cie}
}
function genericModule30(imports){
const l=imports["l"];

return {l}
}
function genericModule31(imports){
const qht=imports["qht"];
const DBe=imports["DBe"];
const uSn=imports["uSn"];
const gjt=imports["gjt"];
const r7e=imports["r7e"];
const gSn=imports["gSn"];
const Kht=imports["Kht"];
const HBe=imports["HBe"];
const x7n=imports["x7n"];
const Vr=imports["Vr"];
const t=imports["t"];
const A=imports["A"];
const p=imports["p"];
const l=imports["l"];
const O7n=imports["O7n"];
const m=imports["m"];
const Ee=imports["Ee"];
const pSn=imports["pSn"];
function OGo(e){try{let r=Vr().attestation.reportedCloudWorkerCodes;if(r.has(e))return;r.add(e),t(`${A(!0)} the attestation policy header could not be read whole (${e})`,{level:"error"}),p("ccr_worker_attestation_policy",e)}catch(r){t(`${A(!0)} policy-fault report threw: ${l(r)}`,{level:"error"})}};
function HGo(e){let r=Vr().attestation;if(r.dropNotifier===e)r.dropNotifier=void 0};
var Vht="[remote-io] warning: ";
function LGo(e,r){if(e.source!=="client"){try{let s=Vr().attestation.reportedCloudWorkerCodes;if(!s.has("source_not_client"))s.add("source_not_client"),t(`${A(!0)} ${r.enforce?"DROPPING":"would drop"} event_id=${e.event_id}: not marked client-written (counted once per process)`,{level:"warn"}),m("ccr_worker_stray_event_attestation","source_not_client")}catch(s){t(`${A(!0)} source-drop report threw: ${l(s)}`,{level:"error"})}if(!r.enforce)O7n(e);return r.enforce}return Ee(e,r,!0)};
return {Vht,OGo,LGo,HGo,qht,DBe,uSn,gjt,r7e,gSn,Kht,HBe,x7n,Vr,t,A,p,l,O7n,m,Ee,pSn}
}
function genericModule32(imports){
const xz=imports["xz"];

return {xz}
}
function genericModule33(imports){
const YK=imports["YK"];
const _t=imports["_t"];
const lC=imports["lC"];
const Y=imports["Y"];

return {YK,_t,lC,Y}
}
function genericModule34(imports){
const Le=imports["Le"];

return {Le}
}
function genericModule35(imports){
const Oh=imports["Oh"];

return {Oh}
}
function genericModule36(imports){
const hX=imports["hX"];

return {hX}
}
function genericModule37(imports){
const Ai=imports["Ai"];
const Kn=imports["Kn"];
const oMt=imports["oMt"];
const sMt=imports["sMt"];
const tMt=imports["tMt"];
const Ld=imports["Ld"];
const vFe=imports["vFe"];
const Vx=imports["Vx"];
const F=imports["F"];
const _=imports["_"];
const t=imports["t"];
const it=imports["it"];
const edt=imports["edt"];
const Tn=imports["Tn"];
const q=imports["q"];
const js=imports["js"];
const Yf=imports["Yf"];
const Jme=imports["Jme"];
const lC=imports["lC"];
const gP=imports["gP"];
const W=imports["W"];
const Y=imports["Y"];
const tWe=imports["tWe"];
const oTe=imports["oTe"];
function R0r(){js().sealAppendsForShutdown()};
function Xfn(e){return Ld(vFe(e),"ccr-tip.json")};
function Kkr(e){return vFe(e)+".ccr-tip.json"};
async function JZo(e,n){for(let r of[Xfn(e),Kkr(e)]){let s=await Vkr(r,n);if(s!=="absent")return s}return null};
async function Vkr(e,n){let r=n!==void 0?Vx(e):void 0,s;if(F()&&n!==void 0&&r!==void 0)try{let g=await n.readText([r]);if(!g.ok)return null;let h=g.value.items[0];if(!h.found)return"absent";s=h.value}catch{return null}else try{s=await gP(e,"utf-8")}catch(g){return W(g)?"absent":null}try{let g=Y(s);if(typeof g==="object"&&g!==null&&"eventId"in g&&typeof g.eventId==="string")return g;return null}catch{return null}};
async function Qfn(e,n,r){let s={eventId:n,updatedAt:new Date().toISOString()};try{let g=Xfn(e),h=r!==void 0?Vx(g):void 0;if(F()&&r!==void 0&&h!==void 0){let b=await r.write(h,_(s),{mode:384});if(!b.ok)t(`Failed to write CCR tip sidecar: ${it(b.error)}`);return}await edt(g),await Tn(g,_(s),384)}catch(g){t(`Failed to write CCR tip sidecar: ${g}`)}};
async function U0r(e,n){for(let r=e.length-1;r>=0;r--){let s=e[r];if(!s||s.session_agent_id)continue;if(tMt(s.payload)){await Qfn(q(),s.payload.uuid,n);return}}};
function mPo(e){let n=new Set;for(let r of tWe(e)){if(typeof r!=="object"||r===null)continue;let s=r.uuid;if(typeof s==="string")n.add(s)}return n};
async function HGn(e,n,r){let[s,g]=await Promise.all([JZo(e,r),n!==void 0?n:tdt(e,r)]);if(!s)return{fallbackReason:"no-sidecar"};if(!g||!mPo(g.content).has(s.eventId))return{fallbackReason:"tip-not-in-tail"};return{eventId:s.eventId}};
async function tdt(e,n){let r=Yf(e);if(F()&&n!==void 0){let s=await Jme(r,65536,n).catch(()=>{return});if(s!==void 0)return s}return lC(r,65536).catch(()=>null)};
return {U0r,Qfn,Xfn,R0r,tdt,HGn,JZo,Kkr,Vkr,mPo,Ai,Kn,oMt,sMt,tMt,Ld,vFe,Vx,F,_,t,it,edt,Tn,q,js,Yf,Jme,lC,gP,W,Y,tWe,oTe}
}
function genericModule38(imports){
const wYe=imports["wYe"];

return {wYe}
}
function genericModule39(imports){
const ar=imports["ar"];

return {ar}
}
function genericModule40(imports){

var Gar=[250,500,500,750,1000];
return {Gar}
}
function genericModule41(imports){
const ee=imports["ee"];

return {ee}
}
function genericModule42(imports){
const ne=imports["ne"];

return {ne}
}
function genericModule43(imports){
const d=imports["d"];
const te=imports["te"];

return {d,te}
}
function genericModule44(imports){
const wr=imports["wr"];
const s=imports["s"];
function F6o(e){s().noteSdkMcpDial(e)};
function $6o(){s().markHydratePrefetchSettled()};
return {$6o,F6o,wr,s}
}
function genericModule45(imports){
const Que=imports["Que"];

return {Que}
}
function genericModule46(imports){
const a=imports["a"];

return {a}
}
function genericModule47(imports){
const Mie=imports["Mie"];

return {Mie}
}
function genericModule48(imports){
const r=imports["r"];
const que=imports["que"];
function VGr(e){r().mainLoopActivityListener=e};
function qGr(e){r().nestedChainDropListener=e};
return {VGr,qGr,r,que}
}
function genericModule49(imports){
const O=imports["O"];
function B7r(e){return O().addRepo(e)};
function j7r(e){return O().onRepoBranchChange(e)};
return {B7r,j7r,O}
}
function genericModule50(imports){
const Vr=imports["Vr"];
const Apt=imports["Apt"];
const B7r=imports["B7r"];
const j7r=imports["j7r"];
const EFr=imports["EFr"];
async function bLo(e){Vr().repoCheckouts.onMetadataChanged=e;for(let[,n]of Apt())await B7r(n);j7r(()=>void EFr())};
return {bLo,Vr,Apt,B7r,j7r,EFr}
}
function genericModule51(imports){
const Do=imports["Do"];

return {Do}
}
function genericModule52(imports){
const Fie=imports["Fie"];

return {Fie}
}
function genericModule53(imports){
const rF=imports["rF"];
const Xre=imports["Xre"];
const tp=imports["tp"];
var _Xe="sender_below_floor";
return {_Xe,rF,Xre,tp}
}
function genericModule54(imports){
const uj=imports["uj"];

return {uj}
}
function genericModule55(imports){
const m=imports["m"];
const p=imports["p"];

return {m,p}
}
function genericModule56(imports){
const Qen=imports["Qen"];

return {Qen}
}
function genericModule57(imports){
const Mre=imports["Mre"];

return {Mre}
}
function genericModule58(imports){
const S7t=imports["S7t"];

return {S7t}
}
function genericModule59(imports){
const qa=imports["qa"];

return {qa}
}
function genericModule60(imports){
const bmo=imports["bmo"];
const Cie=imports["Cie"];
const t=imports["t"];
const l=imports["l"];
const Vht=imports["Vht"];
const qht=imports["qht"];
const xz=imports["xz"];
const DBe=imports["DBe"];
const ut=imports["ut"];
const gwe=imports["gwe"];
const xe=imports["xe"];
const YK=imports["YK"];
const Le=imports["Le"];
const at=imports["at"];
const it=imports["it"];
const k=imports["k"];
const yot=imports["yot"];
const Oh=imports["Oh"];
const ot=imports["ot"];
const _7t=imports["_7t"];
const hX=imports["hX"];
const y7t=imports["y7t"];
const F$=imports["F$"];
const Vg=imports["Vg"];
const BDr=imports["BDr"];
const N=imports["N"];
const Ai=imports["Ai"];
const wYe=imports["wYe"];
const _t=imports["_t"];
const TDn=imports["TDn"];
const ar=imports["ar"];
const xp=imports["xp"];
const Gar=imports["Gar"];
const ee=imports["ee"];
const ne=imports["ne"];
const $e=imports["$e"];
const tCe=imports["tCe"];
const Smo=imports["Smo"];
const d=imports["d"];
const Kn=imports["Kn"];
const oMt=imports["oMt"];
const sMt=imports["sMt"];
const U0r=imports["U0r"];
const R0r=imports["R0r"];
const QTn=imports["QTn"];
const tdt=imports["tdt"];
const HGn=imports["HGn"];
const wr=imports["wr"];
const $6o=imports["$6o"];
const uSn=imports["uSn"];
const gjt=imports["gjt"];
const r7e=imports["r7e"];
const Que=imports["Que"];
const gSn=imports["gSn"];
const a=imports["a"];
const Mie=imports["Mie"];
const VGr=imports["VGr"];
const que=imports["que"];
const qGr=imports["qGr"];
const bLo=imports["bLo"];
const Y=imports["Y"];
const Do=imports["Do"];
const ryr=imports["ryr"];
const Fie=imports["Fie"];
const Kht=imports["Kht"];
const HBe=imports["HBe"];
const x7n=imports["x7n"];
const _Xe=imports["_Xe"];
const rF=imports["rF"];
const Xre=imports["Xre"];
const tp=imports["tp"];
const OGo=imports["OGo"];
const O7n=imports["O7n"];
const LGo=imports["LGo"];
const C1=imports["C1"];
const uj=imports["uj"];
const i=imports["i"];
const c=imports["c"];
const m=imports["m"];
const p=imports["p"];
const Qen=imports["Qen"];
const Mre=imports["Mre"];
const S7t=imports["S7t"];
const qa=imports["qa"];
const pSn=imports["pSn"];
const HGo=imports["HGo"];
function he(e,n){if(!n)return e;return{...N(e)?e:{},envelope:!0}};
function ge(e,n){let r=e?.turn_handoff;if(!r)return;return{type:"system",subtype:"turn_handoff_available",v:r.v,tools:[...r.tools],worker_epoch:r.worker_epoch,staged_files:r.staged_files,no_query_first:r.no_query_first,uuid:$e(),session_id:n,...r.relay_marker&&{relay_marker:!0},...r.home_files&&{home_files:!0},...r.file_names&&{file_names:!0}}};
var Ye="VERIFIED_BY_GATE";
var Ve="refuse";
function re(e,{floor:n=Ye,unstamped:r=Ve}={}){let o=HBe(e.device_attestation_status);if(x7n(o,n))return{verdict:"pass",status:o};if(o==="UNSPECIFIED"&&r==="pass")return{verdict:"pass",status:o};return{verdict:"drop",status:o}};
var ze=new Set(["remote_tools_announce","register_device_hooks","upload_device_hook_template","apply_flag_settings"]);
function oe(e){let n=e.type==="control_request"?e.request:void 0;if(typeof n!=="object"||n===null)return;let r=n.subtype;if(typeof r!=="string"||!ze.has(r))return;if(r==="apply_flag_settings"){let o=n.settings;return typeof o==="object"&&o!==null&&!Array.isArray(o)&&Object.hasOwn(o,Fie)?"apply_flag_settings":void 0}return r};
function ie(e){let n=e.type==="control_response"?e.response:void 0;return typeof n==="object"&&n!==null?Kht(n):void 0};
function ve(e,n,r=ke){let o=oe(e);if(o!==void 0)return r[Re(o)];let f=ie(e),h=f===void 0?void 0:n(f);return h!==void 0&&r[we(h)]};
function Ee(e,n){switch(oe(e)){case"register_device_hooks":return"register";case"upload_device_hook_template":return"template";case"apply_flag_settings":return"plugin_patch";case"remote_tools_announce":return;case void 0:{let r=ie(e);return r!==void 0&&n(r)==="hook"?"answer":void 0}}};
var Se={register:"hooks",template:"hooks",answer:"hooks",plugin_patch:"plugins"};
var ke={remoteTools:!0,hooks:!0,plugins:!0};
function Re(e){switch(e){case"remote_tools_announce":return"remoteTools";case"register_device_hooks":case"upload_device_hook_template":return"hooks";case"apply_flag_settings":return"plugins"}};
function we(e){return e==="served_call"?"remoteTools":"hooks"};
function Ce(e,n,r=ke){let o=e.payload,f=oe(o);if(f!==void 0){if(!r[Re(f)])return{kind:"pass"};let{verdict:g,status:I}=re(e);if(g==="pass")return{kind:"pass"};let D=f==="apply_flag_settings"?Xe(o):void 0;return D!==void 0?{kind:"strip_forwarded_plugins",requestId:Kht(o),status:I,remainder:D}:{kind:"refuse_request",subtype:f,status:I}}let h=ie(o),E=h===void 0?void 0:n(h);if(h===void 0||E===void 0||!r[we(E)])return{kind:"pass"};let{verdict:w,status:b}=re(e);if(w==="pass"){let g=z(z(o.response)?.response);if(g!==void 0&&_Xe in g)delete g[_Xe];return{kind:"pass"}}let A=E==="served_call"?Ze(o):void 0;return A===void 0?{kind:"drop_answer",requestId:h,answers:E,status:b}:{kind:"admit_refusal",requestId:h,status:b,result:A}};
function Xe(e){let n=z(z(e.request)?.settings);if(n===void 0)return;let{[Fie]:r,...o}=n;return Object.keys(o).length>0?o:void 0};
function be(e){};
function Ae(e,n){let r=z(e.request)??{};e.request={...r,settings:n}};
function Te(e,n,r){e.response={subtype:"success",request_id:n,response:{result:r,[_Xe]:!0}}};
function T(e){return`reported refused \u2014 ${e} \u2014 by a sender this session could not verify; whether anything ran there is not confirmed. Check its effect before re-running it.`};
var Qe={no_approval:"reported refused \u2014 no person's approval matching this call was found \u2014 by a sender this session could not verify; whether anything ran there is not confirmed. Ask the user to approve it again if it is still wanted.",unbound:T("this session is not bound to that machine"),unsupported_protocol:T("the call's protocol version was not accepted"),invalid_request:T("the call was not acceptable as sent"),not_served:T("that machine does not serve this tool to the session"),no_session:T("that machine could not tell which session the call came from"),session_mismatch:T("that machine is connected on behalf of a different session"),too_many_in_flight:T("that machine already has as many calls under way, or keeps state for as many cloud sessions, as it accepts"),refused_field:T("one of the call's input fields is not accepted on that machine"),sandbox_unavailable:T("that machine serves no tools while its sandbox is off or not fully confining"),unknown_call:T("that machine has no record of the call asked about"),stale:T("the call, or the answer to its permission question, reached that machine after its delivery window"),unattested_request:T("the call arrived without a valid device signature"),queue_full:T("that machine was at one of its capacity limits"),rate_limited:T("that machine's call budget for this session was spent"),duplicate_call:T("that machine had already received a call with this id"),withdrawn:T("the permission request the call was waiting on there ended unanswered"),result_lost:T("that machine no longer holds the result of the call"),unrecognized:"reported refused, without a reason this session recognises, by a sender this session could not verify; whether anything ran there is not confirmed. Check its effect before re-running it."};
var Je="unverified-sender";
function Ze(e){let n=z(e.response),r=z(n?.response);if(n?.subtype!=="success"||r===void 0)return;let o;try{o=rF(r.result)}catch{return}if(o.envelope.status!=="present"||o.envelope.envelope.outcome!=="refused")return;let f=o.envelope.envelope,h=Qe[f.code];return Xre({envelope:{v:tp,outcome:"refused",...f.call_id!==void 0&&{call_id:f.call_id},target:{name:Je,working_dir:""},code:f.code,message:h},content:h})};
function z(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)?e:void 0};
var rtt=new Set(["remote","remote_projects","remote_desktop","sdk-cli",""]);
var et=rtt;
function ERn(e){if(!e.sdkUrl||!e.remoteSessionId||e.environmentKind!==void 0)return{admitted:!1,reason:"not_managed_cloud_worker"};if(e.entrypoint!==void 0&&!et.has(e.entrypoint))return{admitted:!1,reason:"entrypoint"};if(e.disabled)return{admitted:!1,reason:"disabled"};if(e.hermetic)return{admitted:!1,reason:"hermetic"};return{admitted:!0}};
function vRn(e){if(!e.sdkUrl||!e.remoteSessionId||e.environmentKind!==void 0)return{admitted:!1,reason:"not_managed_cloud_worker"};if(e.entrypoint!==void 0&&!rtt.has(e.entrypoint))return{admitted:!1,reason:"entrypoint"};if(e.disabled)return{admitted:!1,reason:"disabled"};if(e.hermetic)return{admitted:!1,reason:"hermetic"};return{admitted:!0}};
async function Pe({getAuthHeaders:e,rereadMiss:n,onDiagnostic:r,delaysMs:o=Gar}){if(Object.keys(e()).length>0)return!0;r?.(`no session auth headers yet, re-reading up to ${o.length} times`,"warn");let f={};for(let[h,E]of o.entries()){let w=h+1;if(t(`[remote-io] no auth headers, re-reading in ${E}ms (attempt ${w}/${o.length})`,{level:"warn"}),await ee(E),f=n().diag,Object.keys(e()).length>0)return r?.(`session auth headers present after ${w} re-read(s)`,"info"),ne("info","cli_worker_lifecycle_init_auth_retried",{attempts:w,...f}),!0}return t(`[remote-io] auth headers still missing after ${o.length} re-reads`,{level:"error"}),r?.(`session auth headers still missing after ${o.length} re-reads`,"warn"),ne("error","cli_worker_lifecycle_init_auth_retry_exhausted",{attempts:o.length,...f}),!1};
function Ne(e,n={},r={}){let o=gwe(new ot(e.href));return o.pathname=o.pathname.replace(/\/$/,"")+"/worker/events/stream",new _7t(o,n,r)};
var ct=new Set(["set_chrome_browser_hints"]);
var B="session_stream_created_at";
function Bar(e){if(!Object.hasOwn(e,B))return;let n=Reflect.get(e,B);if(typeof n!=="string")return;let r=Date.parse(n);return Number.isNaN(r)?void 0:r};
var Z="session_stream_writers";
function jar(e){if(!Object.hasOwn(e,Z))return;let n=bmo().safeParse(Reflect.get(e,Z));return n.success?n.data:void 0};
function pt(e,n){if(e.payload.type!=="control_request"||He(e.payload)!=="initialize")return;if(e.event_type!=="control_request"){delete e.payload[B],delete e.payload[Z],ne("warn","cli_sse_initialize_row_type_mismatch",{event_type:typeof e.event_type==="string"&&/^[a-z_]{1,40}$/.test(e.event_type)?e.event_type:"other"});return}if(typeof e.created_at==="string")e.payload[B]=e.created_at;else delete e.payload[B];if(n!==void 0)e.payload[Z]={writers:n.writers,statedAtMs:n.statedAtMs};else delete e.payload[Z]};
function ft(e){if(e.payload.type!=="control_response")return;if(e.event_type==="control_response"&&typeof e.created_at==="string")e.payload[B]=e.created_at;else delete e.payload[B]};
function He(e){if(typeof e!=="object"||e===null)return;let n=e.request;if(typeof n!=="object"||n===null)return;let r=n.subtype;return typeof r==="string"?r:void 0};
function mt(e){let r=e.split(`
`).flatMap((o)=>{let f;try{f=Y(Do(o))}catch{return[o]}let h=typeof f==="object"&&f!==null?f.type:void 0;if(typeof h==="string"&&ryr.has(h))return ne("warn","cli_stdin_server_only_type_dropped",{payload_type:h}),t(`[remote-io] dropped a ${h} frame from the stdin lane (server-authored-only type; SSE is its only ingress)`,{level:"warn"}),[];if(h==="control_request"){let b=He(f);if(b!==void 0&&ct.has(b))return ne("warn","cli_stdin_host_forwarded_subtype_dropped",{subtype:b}),t(`[remote-io] dropped a ${b} control_request from the stdin lane (host-forwarded-only subtype; SSE is its only ingress)`,{level:"warn"}),[]}if(typeof f!=="object"||f===null)return[o];let E=new Set([B,Z,...[]]),w=Object.entries(f);if(!w.some(([b])=>E.has(b)))return[o];return[Mie(Object.fromEntries(w.filter(([b])=>!E.has(b))))]});return r.length===0?void 0:r.join(`
`)};
class We extends Error{name="UnreadableInputError";constructor(){super("stream-json input could not be read")}};
var ht=256;
var gt={remote_tools_announce:"remote_tools_announce",register_device_hooks:"device_hooks_register",upload_device_hook_template:"device_hooks_register",apply_flag_settings:"ccr_cloud_plugins_forward"};
class qz extends Cie{isRemoteTransport(){return!0}sessionWriters(){return this.transport.getSessionWriters()}takeUserFrameReceivedWallMs(e){let n=this.userFrameReceivedWallMs.get(e);return this.userFrameReceivedWallMs.delete(e),n}hostOwnsStdinOrigin=!1;persistsOutboundFrames=!0;get isHostedWorker(){return this.hosting.kind==="hosted"}url;transport;inputStream;workerAttestationPolicy;countedSenderStatuses=new Set;isBridge=!1;isDebug=!1;teeStdout=!1;activityFd;ccrClient;idleTracker;onPromptAnswered;keepAliveTimer=null;inboundLanesDroppedAfterClose=new Set;userFrameReceivedWallMs=new Map;unsubscribeGrowthBookRefresh;attestationDropSenderWriter=(e)=>{this.ccrClient.writeEvent(e).catch((n)=>{t(`[remote-io] drop sender-notice write failed: ${l(n)}`,{level:"warn"})})};attestationDropNotifier=(e)=>{if(this.isBridge)process.stderr.write(Vht+qht(e)+`
`);if(e.payloadType==="control_request"&&e.requestId)this.ccrClient.writeEvent(xz(e.requestId,DBe(e))).catch((n)=>{t(`[remote-io] refusal write failed: ${l(n)}`,{level:"warn"})})};permanentCloseCode;closeCause;hosting;endedByHost=!1;constructor({streamUrl:e,initialPrompt:n,stdinLane:r,replayUserMessages:o,sessionState:f,storageV5:h,getAuthHeaders:E,rereadMissingAuthHeaders:w,sessionId:b,workerEpoch:A,environmentKind:g,isResume:I,earlyHydrateReads:D,earlyRemoteLink:S,reportParkAtInit:X,initExternalMetadata:F,initialWorkerStatus:j,hosting:R}){let U=new ut({encoding:"utf8"});super(U,o,f);this.inputStream=U,this.hosting=R,this.url=gwe(new xe(e));let P=E();if(Object.keys(P).length===0)t(w?"[remote-io] No session ingress token available yet, will re-read":"[remote-io] No session ingress token available",{level:"error"});this.isBridge=g==="bridge",this.isDebug=YK(),this.teeStdout=Le(process.env.CLAUDE_CODE_TEE_SDK_STDOUT);let x=process.env.CLAUDE_RUNNER_ACTIVITY_FD,H=x?Number.parseInt(x,10):NaN;if(Number.isInteger(H)&&H>2)try{let s=at(H);if(!s.isFIFO()&&!s.isSocket())throw Error("not a pipe");let y=it("",{fd:H,autoClose:!1});y.on("error",(v)=>{t(`[remote-io] activity fd ${H} write error (${l(v)}); falling back to stdout`),this.activityFd=void 0}),this.activityFd=y}catch(s){t(`[remote-io] activity fd ${H} unavailable (${l(s)}); falling back to stdout`)}if(S&&R.kind!=="owns-process")throw Error("earlyRemoteLink is only valid for an owns-process RemoteIO");if(S)S.ccrClient.setFeatureGatedOptions(qe()),S.ccrClient.setStreamEventFlushIntervalMs(le()),S.ccrClient.setStreamEventFirstFlushMs(ue()),S.ccrClient.setStreamEventFlushOnFirstDelta(ce()),S.ccrClient.setNoSubscriberStreamEventFlushIntervalMs(pe()),S.ccrClient.setDropUnwatchedStreamEvents(fe());let M=S??je({url:this.url,getAuthHeaders:E,sessionId:b,environmentKind:g,storageV5:h,hosting:R,onEpochMismatch:R.kind==="hosted"?(s)=>{throw this.stopFor(Et(s)),Error("terminal request-path condition")}:void 0,reportParkAtInit:X,initExternalMetadata:F,initialWorkerStatus:j,deferDelivery:!1}),W=M.onDiagnostic;this.transport=M.transport,this.ccrClient=M.ccrClient,this.idleTracker=M.idleTracker;let Q=Vg();if(Q)this.ccrClient.onDurableEventsDropped=(s,y)=>{let v=Me(s);if(v.length>0)this.rejectUndeliveredRequests(v,y)},this.ccrClient.onDurableEventsUpload=(s,y)=>{let v=Me(s);if(v.length>0)this.noteRequestsUpload(v,y)};this.tracksRequestDelivery=Q,this.transport.setOnData((s)=>{if(this.writeInbound(s,"sse"),this.isBridge&&this.isDebug)ar(s.endsWith(`
`)?s:s+`
`)}),this.transport.setOnUserFrameReceived((s,y)=>{if(this.userFrameReceivedWallMs.has(s))return;if(this.userFrameReceivedWallMs.size>=ht){let v=this.userFrameReceivedWallMs.keys().next().value;if(v!==void 0)this.userFrameReceivedWallMs.delete(v)}this.userFrameReceivedWallMs.set(s,y)}),this.transport.setOnClose((s,y)=>{if(s!==void 0){switch(this.permanentCloseCode=s,R.kind){case"owns-process":process.stderr.write(`RemoteIO: transport closed permanently (code ${s})
`);break;case"hosted":R.onDiagnostic(`transport closed permanently (code ${s})`,"warn");break}this.stopFor({kind:"stream-rejected",closeCode:s})}this.inputStream.end()}),this.transport.setOnEventVetoed((s)=>{this.ccrClient.reportDelivery(s.event_id,"received"),this.ccrClient.reportDelivery(s.event_id,"processed")}),this.unsubscribeGrowthBookRefresh=xp(()=>{this.ccrClient.setStreamEventFlushIntervalMs(le()),this.ccrClient.setStreamEventFirstFlushMs(ue()),this.ccrClient.setStreamEventFlushOnFirstDelta(ce()),this.ccrClient.setNoSubscriberStreamEventFlushIntervalMs(pe()),this.ccrClient.setDropUnwatchedStreamEvents(fe())});let L=w&&Object.keys(P).length===0?Pe({getAuthHeaders:E,rereadMiss:w,onDiagnostic:W}):null,K=S?.initialized??(L?L.then(()=>this.ccrClient.initialize(A)):this.ccrClient.initialize(A));if(this.restoredWorkerState=K.catch(()=>null),K.then(()=>{W?.("worker registered","info");let s=ge(M.initExternalMetadata,b);if(s)this.write(s)},(s)=>{let y=s instanceof tCe?s.reason:l(s);ne("error","cli_worker_lifecycle_init_failed",{reason:s instanceof tCe?s.reason:"unknown"});let v=`CCRClient initialization failed: ${l(s)}`;if(Smo(s))t(v,{level:"error"});else d(Error(v));switch(R.kind){case"owns-process":W?.(`worker registration failed (${y}), exiting`,"warn"),Kn(1,"other");return;case"hosted":W?.(`worker registration failed (${y}), stopping`,"warn"),this.stopFor({kind:"registration-failed",reason:s instanceof tCe?s.reason:"unknown",httpStatus:s instanceof tCe?s.httpStatus:void 0,closeCode:4091});return}}),oMt((s,y,v)=>this.ccrClient.writeInternalEvent(s,y,v)),sMt((s)=>this.ccrClient.readInternalEvents(s),()=>this.ccrClient.readSubagentInternalEvents(),I?(s,y)=>this.ccrClient.readAgentInternalEvents(s,y):void 0),this.ccrClient.onInternalBatchAcked=(s)=>U0r(s,h),this.ccrClient.onInternalEventLaneClosed=R0r,I){let s=performance.now(),y=this.ccrClient;this.hydratePrefetch=(async()=>{if(L)await L,s=performance.now();return(L?void 0:await D)??await Be((v)=>y.readInternalEvents(v),()=>y.readSubagentInternalEvents(),h)})().catch((v)=>(d(v),null)),this.hydratePrefetch.then(()=>{wr("resume_hydrate_fetch_ms",performance.now()-s,s),$6o()})}let te={started:"processing",completed:"processed",cancelled:"processed"};if(this.onCommandLifecycle=(s,y)=>{if(!Object.hasOwn(te,y))return;let v=te[y];if(v===void 0)return;this.ccrClient.reportDelivery(s,v)},this.transport.setOnDelivered((s,y)=>{if(pt(s,y),R.kind==="hosted")ft(s)}),uSn(this.attestationDropSenderWriter),gjt(this.attestationDropNotifier),this.isBridge)r7e(Que),this.transport.setEventFilter((s)=>{this.markAndStripSessionChannelFrame(s,{listedOnly:!1});let y=gSn(s);if(y)this.ccrClient.reportDelivery(s.event_id,"received"),this.ccrClient.reportDelivery(s.event_id,"processed");return y});else{this.transport.setWorkerAttestationPolicySink((y)=>this.takeWorkerAttestationPolicy(y));let s=a.CLAUDE_CODE_ENVIRONMENT_KIND===void 0;this.transport.setEventFilter((y)=>{let v=this.judgeInboundFrame(y,s);if(v)this.ccrClient.reportDelivery(y.event_id,"received"),this.ccrClient.reportDelivery(y.event_id,"processed");return v})}let u=(s)=>{if(this.teeStdout&&!this.isBridge)try{this.teeActivity(Mie({type:"system",subtype:"session_state_changed",state:s,waiting_on_user:this.sessionState.waitingOnUser})+`
`)}catch{}};if(this.sessionState.onStateChanged=(s,y)=>{this.ccrClient.reportState(s,y),u(s)},this.sessionState.onWaitingOnUserChanged=()=>{u(this.sessionState.getState())},this.sessionState.onTurnStarting=(s,y)=>{if(this.teeStdout&&!this.isBridge)try{this.teeActivity(Mie({type:"system",subtype:"turn_starting",mode:s,...s==="task-notification"&&{task_id:y??null}})+`
`)}catch{}},VGr((s)=>this.sessionState.setMainLoopRefcount(s)),this.sessionState.setMainLoopRefcount(que()),qGr((s)=>this.sessionState.dropNestedBlockedChain(s)),this.sessionState.onMetadataChanged=(s)=>{this.ccrClient.reportMetadata(s)},this.sessionState.onInternalMetadataChanged=(s)=>{this.ccrClient.reportInternalMetadata(s)},bLo((s)=>this.sessionState.notifyMetadataChanged(s)),S)this.transport.startDelivery();else if(L)L.then(()=>this.transport.connect(),()=>{});else this.transport.connect();let _=hX().session_keepalive_interval_v2_ms;if(this.isBridge&&_>0)this.keepAliveTimer=setInterval(()=>{t("[remote-io] keep_alive sent"),this.write({type:"keep_alive"}).catch((s)=>{t(`[remote-io] keep_alive write failed: ${l(s)}`)})},_),this.keepAliveTimer.unref?.();if(R.kind==="owns-process")_t(async()=>this.close());if(n)this.writeInbound(n.replace(/\n$/,"")+`
`,"stdin");if(r)if(g==="bridge"||g==="byoc")this.pumpStdinLane(r);else this.discardStdinLane(r,g)}pumpStdinLane(e){(async()=>{for await(let n of e){let r=mt(String(n).replace(/\n$/,""));if(r!==void 0)this.writeInbound(r+`
`,"stdin")}})()}discardStdinLane(e,n){(async()=>{let r=!1;for await(let o of e)if(!r&&String(o).trim()!=="")r=!0,ne("warn","cli_remote_io_stdin_ignored"),t(`[remote-io] ignored data on process stdin (host kind ${n===null?"unset":`'${n}'`}): only a 'bridge' or 'byoc' host's stdin is an input lane, so control input comes from the session stream only`,{level:"warn"})})()}markAndStripSessionChannelFrame(e,{listedOnly:n}){be(e)}sessionChannelFloorVerdict(e){let n=this.guardedFamilies();if(!n.remoteTools&&!n.hooks&&!n.plugins)return"passed";if(!ve(e.payload,(o)=>this.liveDeviceRequestKind(o),n))return"passed";try{let o=Ce(e,(f)=>this.liveDeviceRequestKind(f),n);return o.kind==="pass"?"passed":this.applySessionChannelVerdict(e,o)}catch(o){return t(`[remote-io] a guarded session-channel frame could not be judged or handled; dropped: ${l(o)}`,{level:"warn"}),"dropped"}}takeWorkerAttestationPolicy(e){if(this.workerAttestationPolicy=e.policy,e.fault!==void 0)OGo(e.fault)}judgeInboundFrame(e,n){if(n)this.countHookOrPluginSender(e);if(Vg()){let r=n?this.sessionChannelFloorVerdict(e):"passed";if(r==="dropped")return!0;if(r==="refusal_rebuilt")return!1}if(this.workerAttestationPolicy===void 0)return O7n(e),!1;return LGo(e,this.workerAttestationPolicy)?"attestation_policy":!1}guardedFamilies(){let e=Vg()&&!C1();return{remoteTools:e,hooks:!1,plugins:!1}}hookAndPluginAdmissions(){return{hooks:ERn({sdkUrl:!0,remoteSessionId:a.CLAUDE_CODE_REMOTE_SESSION_ID,environmentKind:void 0,entrypoint:a.CLAUDE_CODE_ENTRYPOINT,disabled:a.CLAUDE_CODE_DISABLE_HOOK_FORWARDING,hermetic:uj()}).admitted,plugins:vRn({sdkUrl:!0,remoteSessionId:a.CLAUDE_CODE_REMOTE_SESSION_ID,environmentKind:void 0,entrypoint:a.CLAUDE_CODE_ENTRYPOINT,disabled:a.CLAUDE_CODE_DISABLE_PLUGIN_FORWARDING,hermetic:uj()}).admitted}}countHookOrPluginSender(e){try{let n=Ee(e.payload,(w)=>this.liveDeviceRequestKind(w));if(n===void 0)return;let{verdict:r,status:o}=re(e),f=`${n}:${o}`,h=Se[n];if(this.countedSenderStatuses.has(f)||!this.hookAndPluginAdmissions()[h])return;let E=this.guardedFamilies()[h]?"enforce":"observe";this.countedSenderStatuses.add(f),i("tengu_session_channel_sender_status",{kind:c(n),attestation_status:c(o),verdict:c(r==="pass"?"pass":"below_floor"),mode:c(E)})}catch(n){t(`[remote-io] counting a hook or plugin frame's sender failed; the frame goes on as it would have: ${l(n)}`,{level:"warn"})}}applySessionChannelVerdict(e,n){let r=n.status.toLowerCase();switch(n.kind){case"refuse_request":return m(gt[n.subtype],`unverified_sender_${r}`),t(`[remote-io] dropped a below-floor ${n.subtype} (attestation ${r}) unanswered`),"dropped";case"drop_answer":return m(n.answers==="hook"?"device_hooks_serve":"remote_tool_forward",`unverified_answer_dropped_${r}`),t(`[remote-io] dropped a below-floor reply to ${n.answers==="hook"?"forwarded-hook":"served-call"} request ${n.requestId} (attestation ${r}); the request keeps waiting for the machine's own answer`),"dropped";case"strip_forwarded_plugins":return Ae(e.payload,n.remainder),p("ccr_cloud_plugins_forward",`unverified_patch_stripped_${r}`),t(`[remote-io] stripped below-floor forwarded plugin choices from an apply_flag_settings (attestation ${r}); its other keys go on`),"passed";case"admit_refusal":return Te(e.payload,n.requestId,n.result),p("remote_tool_forward",`unverified_refusal_admitted_${r}`),t(`[remote-io] admitted a below-floor refusal of served-call request ${n.requestId} (attestation ${r}) rebuilt and marked unverified: the machine is asked what became of the call`),"refusal_rebuilt"}}flushInternalEvents(){return this.ccrClient.flushInternalEvents()}withdrawQueuedRequest(e){return this.ccrClient.withdrawQueuedControlRequest(e)>0}droppedInternalEventBatches(){return this.droppedInternalBatches}async flushInternalEventsConfirmed(){let e=this.ccrClient.droppedInternalBatches;return await this.ccrClient.flushInternalEvents(),this.ccrClient.droppedInternalBatches===e&&!this.ccrClient.awaitsCompactSummary}flushDeliveryAcks(){return this.ccrClient.flushDeliveryAcks()}flushDeliveryAcksConfirmed(){return this.ccrClient.flushDeliveryAcksConfirmed()}setOnOwnerPresent(e){this.transport.setOnOwnerPresent(e)}setOnPromptAnswered(e){this.onPromptAnswered=e}rereadWorkerState(){return this.ccrClient.readWorkerState()}readProjectsBinding(){return this.ccrClient.readProjectsBinding()}workerEpoch(){return this.ccrClient.currentWorkerEpoch}async flushClientEvents(){let e=this.ccrClient.droppedDurableBatches;return await this.ccrClient.flush(),this.ccrClient.droppedDurableBatches===e}async flushSessionState(){let e=this.ccrClient.droppedWorkerStatePatches;return await this.ccrClient.flushWorkerState()&&this.ccrClient.droppedWorkerStatePatches===e}get internalEventsPending(){return this.ccrClient.internalEventsPending}get droppedInternalBatches(){return this.ccrClient.droppedInternalBatches}hasInternalEventRoom(e){return this.ccrClient.hasInternalEventRoom(e)}readInternalEvents(e){return this.ccrClient.readInternalEvents(void 0,e)}teeActivity(e){if(this.activityFd!==void 0){this.activityFd.write(e);return}ar(e)}writeInbound(e,n){if(this.inputStream.destroyed||this.inputStream.writableEnded){if(!this.inboundLanesDroppedAfterClose.has(n))this.inboundLanesDroppedAfterClose.add(n),ne("info","cli_remote_io_inbound_dropped_after_close",{lane:n});return}this.inputStream.write(e)}writeActivityLine(e){this.teeActivity(e)}acceptsInboundEnvUpdates(){switch(this.hosting.kind){case"owns-process":return this.hosting.trustsInboundEnvUpdates;case"hosted":return!1}}exitOnFatalInput(e){switch(this.hosting.kind){case"owns-process":return super.exitOnFatalInput(e);case"hosted":return t(`[remote-io] ${e}`,{level:"error"}),this.stopFor({kind:"unreadable-input"}),Promise.reject(new We)}}recordUserDrivenInbound(e){switch(super.recordUserDrivenInbound(e),e.type){case"user":if(Qen(e,"remote-worker",Mre()))this.idleTracker.noteActivity();return;case"control_response":if(e.response.subtype==="success")this.idleTracker.noteActivity();return;case"control_request":if(S7t(e))this.idleTracker.noteActivity();return;case"bash_command":this.idleTracker.noteActivity();return;default:return}}recordAnsweredPrompt(e,n){if(e.response.subtype==="success"&&(n==="can_use_tool"||n==="request_user_dialog"))this.onPromptAnswered?.()}async write(e){if(e.type==="transcript_mirror")return;let n=this.heldDueBefore(e);if(n.length>0)await this.writeHeld(n);let r=this.trackWrite(e);if(this.teeStdout&&!this.isBridge){let f=St(r);if(f!==void 0)try{this.teeActivity(Mie(f)+`
`)}catch{}}if(await this.ccrClient.writeEvent(r),this.isBridge){if(r.type==="control_request"||this.isDebug)ar(Mie(r)+`
`)}let o=this.heldDueAfter(r);if(o.length>0)await this.writeHeld(o)}trackFirstFrameUpload(e){return this.ccrClient.trackFirstFrameUpload(e)}trackFirstTextFrameUpload(e){return this.ccrClient.trackFirstTextFrameUpload(e)}trackFirstBlockFrameUpload(e){return this.ccrClient.trackFirstBlockFrameUpload(e)}close(){switch(this.endedByHost=!0,this.closeConnections(),this.hosting.kind){case"owns-process":return;case"hosted":this.ccrClient.close({goodbye:!1});return}}async goodbye(){this.endedByHost=!0,this.ccrClient.beginShutdown(),this.closeConnections(),await this.ccrClient.finishShutdown()}stopFor(e){if(this.closeCause!==void 0||this.endedByHost)return;if(this.closeCause=e,e.kind!=="unreadable-input")this.permanentCloseCode=e.closeCode;switch(this.hosting.kind){case"owns-process":return;case"hosted":this.ccrClient.close({goodbye:!1}),this.closeConnections();try{this.hosting.onFatal(e)}catch(n){d(n)}return}}closeConnections(){if(VGr(null),qGr(null),pSn(this.attestationDropSenderWriter),HGo(this.attestationDropNotifier),this.keepAliveTimer)clearInterval(this.keepAliveTimer),this.keepAliveTimer=null;this.unsubscribeGrowthBookRefresh(),this.transport.close(),this.inputStream.end()}};
function vt(e){switch(e.kind){case"owns-process":return e.adoptRefreshedAuth;case"hosted":return}};
function Et(e){let n=TDn[e];switch(n){case 4090:return{kind:"lease-superseded",cause:e,closeCode:n};case 4094:return{kind:"auth-rejected",cause:e,closeCode:n}}};
function le(){return k("tengu_ccr_stream_event_flush_ms",yot)};
function ue(){return k("tengu_ccr_stream_first_flush_ms",0)};
function ce(){return k("tengu_ccr_stream_flush_on_first_delta",!1)};
function pe(){return k("tengu_ccr_no_subscriber_flush_ms",0)};
function qe(){return{advertiseHeartbeatProbeSupport:k("tengu_ccr_idle_heartbeat",!1),beatOnStaleReconnect:k("tengu_ccr_reconnect_beat",!1),beatOnReactivation:k("tengu_ccr_reactivation_beat",!1),skipRedundantHeartbeats:k("tengu_ccr_skip_redundant_heartbeat",!1)}};
function fe(){return k("tengu_ccr_drop_unwatched_stream_events",!1)};
function St(e){let n=e,r=n.subtype;if(e.type==="result"||e.type==="system"&&r==="init")return e.type==="result"?{...e,result:void 0,permission_denials:void 0,structured_output:void 0,deferred_tool_use:void 0,errors:void 0,subagent_stats:void 0}:e;if(e.type==="system"&&r==="task_started")return{type:"system",subtype:r,task_id:n.task_id,task_type:n.task_type,owned_by_subagent:n.owned_by_subagent};if(e.type==="system"&&r==="task_updated"){let o=n.patch;return{type:"system",subtype:r,task_id:n.task_id,patch:{status:o?.status,is_backgrounded:o?.is_backgrounded}}}if(e.type==="system"&&r==="task_notification")return{type:"system",subtype:r,task_id:n.task_id,status:n.status};if(e.type==="system"&&r==="background_tasks_changed"){let o=n.tasks;return{type:"system",subtype:r,tasks:Array.isArray(o)?o.map((f)=>({task_id:f?.task_id})):[]}}if(e.type==="system"&&r==="hook_response")return{type:"system",subtype:r,hook_event:n.hook_event,outcome:n.outcome};if(e.type==="user")return{type:e.type,subtype:r,...ae(n)};if(e.type==="assistant"){let o=n.message?.content;if(Array.isArray(o)){let f=o.find((h)=>h&&typeof h==="object"&&h.type==="tool_use"&&h.name===qa);if(f){let h=f.input;return{type:"assistant",subtype:r,...ae(n),message:{content:[{type:"tool_use",name:qa,input:{delaySeconds:h?.delaySeconds}}]}}}}return{type:e.type,subtype:r,...ae(n)}}return};
function ae(e){return e.parent_tool_use_id!=null?{from_subagent:!0}:{}};
function Me(e){return e.flatMap((n)=>n.payload.type==="control_request"&&typeof n.payload.request_id==="string"?[n.payload.request_id]:[])};
async function Be(e,n,r){let o=QTn(),f=o?await tdt(o,r):void 0,h=o?await HGn(o,f,r):void 0,[E,w]=await Promise.all([e(h?.eventId),f===null||h?.eventId!==void 0?void 0:n()]);return[E,w,h]};
function je({url:e,getAuthHeaders:n,sessionId:r,environmentKind:o,storageV5:f,hosting:h,onEpochMismatch:E,reportParkAtInit:w,initExternalMetadata:b,initialWorkerStatus:A,deferDelivery:g}){let I=o==="bridge"?void 0:h.kind==="hosted"?(P,x)=>{h.onDiagnostic(P.replace(/\bexiting$/,"stopping"),x)}:(P)=>{process.stderr.write(`SDKStartup: ${P}
`)},D={"anthropic-client-platform":Oh(),...n()},S=process.env.CLAUDE_CODE_ENVIRONMENT_RUNNER_VERSION;if(S)D["x-environment-runner-version"]=S;let F=Ne(e,D,{sessionId:r,refreshHeaders:()=>{let P={...n()},x=process.env.CLAUDE_CODE_ENVIRONMENT_RUNNER_VERSION;if(x)P["x-environment-runner-version"]=x;return P},getAuthHeaders:n,deferDelivery:g,connectTimeoutMs:()=>hX().sse_connect_timeout_ms,sseKeepaliveMaxIntervalSeconds:()=>k("tengu_ccr_sse_keepalive_max_interval_s",0)});if(I)F.setOnDiagnostic?.(I);let j=void 0,R=y7t(),U=new F$(F,e,{onDiagnostic:I,...E&&{onEpochMismatch:E},...!1,...qe(),streamEventFlushIntervalMs:le(),streamEventFirstFlushMs:ue(),streamEventFlushOnFirstDelta:ce(),noSubscriberStreamEventFlushIntervalMs:pe(),dropUnwatchedStreamEvents:fe(),...Vg()&&{servedCallRequestsJumpQueue:BDr},idleTracker:R,uploadTrim:()=>he(k("tengu_ccr_upload_trim",{}),h.kind==="hosted"),uploadHoldMarker:()=>k("tengu_ccr_upload_hold_marker",!1),eventHoldEnabled:()=>k("tengu_ccr_event_hold_enabled",!0),processExiting:Ai,gatesToolCalls:o!=="bridge",adoptRefreshedAuth:vt(h),gzipRequestBodyFetch:wYe("ccr_worker",f),getAuthHeaders:n,reportParkAtInit:w,initExternalMetadata:b,initialWorkerStatus:A});switch(h.kind){case"owns-process":U.registerShutdownCleanup(),_t(async()=>F.close());break;case"hosted":break}return{transport:F,ccrClient:U,idleTracker:R,onDiagnostic:I,initExternalMetadata:b,proxyRefusal:j}};
return {Bar,B,jar,Z,qz,qe,le,ue,ce,pe,fe,je,Ne,he,vt,Et,Me,ht,Pe,ge,Be,pt,He,ft,mt,ct,be,ve,ke,oe,ze,Re,ie,we,Ce,re,Ye,Ve,Xe,z,Ze,Qe,T,Je,ERn,et,rtt,vRn,Ee,Se,gt,Ae,Te,We,St,ae,bmo,Cie,t,l,Vht,qht,xz,DBe,ut,gwe,xe,YK,Le,at,it,k,yot,Oh,ot,_7t,hX,y7t,F$,Vg,BDr,N,Ai,wYe,_t,TDn,ar,xp,Gar,ee,ne,$e,tCe,Smo,d,Kn,oMt,sMt,U0r,R0r,QTn,tdt,HGn,wr,$6o,uSn,gjt,r7e,Que,gSn,a,Mie,VGr,que,qGr,bLo,Y,Do,ryr,Fie,Kht,HBe,x7n,_Xe,rF,Xre,tp,OGo,O7n,LGo,C1,uj,i,c,m,p,Qen,Mre,S7t,qa,pSn,HGo}
}
function genericModule61(imports){
const age=imports["age"];

return {age}
}
function genericModule62(imports){
const ra=imports["ra"];

return {ra}
}
function genericModule63(imports){
const Zx=imports["Zx"];
const qt=imports["qt"];
const G2=imports["G2"];
const f=imports["f"];
const u=imports["u"];
const x=imports["x"];
const o=imports["o"];
const oE=imports["oE"];
const on=imports["on"];
const i=imports["i"];
const y=imports["y"];
const re=imports["re"];
const Nwt=imports["Nwt"];
const Msr=imports["Msr"];
const p=imports["p"];
const t=imports["t"];
const Os=imports["Os"];
const k=imports["k"];
const Ji=imports["Ji"];
const IVe=imports["IVe"];
const Uo=imports["Uo"];
const nDe=imports["nDe"];
const _=imports["_"];
const j0=imports["j0"];
const Oj=imports["Oj"];
const a=imports["a"];
const bn=imports["bn"];
const ye=imports["ye"];
const jOe=imports["jOe"];
const v3t=imports["v3t"];
const leo=imports["leo"];
const ys=imports["ys"];
const T8=imports["T8"];
const fIe=imports["fIe"];
const le=imports["le"];
const Ae=imports["Ae"];
const hu=imports["hu"];
const se=imports["se"];
const B3r=imports["B3r"];
const lo=imports["lo"];
const KV=imports["KV"];
const Jte=imports["Jte"];
const L=imports["L"];
const Ds=imports["Ds"];
const zc=imports["zc"];
const fy=imports["fy"];
const ldn=imports["ldn"];
const xN=imports["xN"];
const Gao=imports["Gao"];
const Zyn=imports["Zyn"];
const F1=imports["F1"];
const eoe=imports["eoe"];
const pcr=imports["pcr"];
const N=imports["N"];
const frt=imports["frt"];
const hdo=imports["hdo"];
const Ide=imports["Ide"];
const zh=imports["zh"];
const lt=imports["lt"];
const Vd=imports["Vd"];
const Bar=imports["Bar"];
const jar=imports["jar"];
const qz=imports["qz"];
const BM=imports["BM"];
const S=imports["S"];
const oTe=imports["oTe"];
const age=imports["age"];
const QUo=imports["QUo"];
const AYt=imports["AYt"];
const Gf=imports["Gf"];
const F6o=imports["F6o"];
const ne=imports["ne"];
const d=imports["d"];
const te=imports["te"];
const ra=imports["ra"];
function vl(){return lo("tengu_sdk_mcp_manifests",!0)};
var JP=300000;
var XP=300000;
async function Yh({origin:e,frameCreatedAt:r,sessionWriters:n,now:s=Date.now()}){if(e!=="host_per_send")return"no_origin_marker";if(r===void 0)return"no_frame_stamp";if(s-r>JP)return"stale_frame";if(n===void 0)return"session_writers_unknown";if(n.writers!=="owner_account_only")return"session_not_owner_only";let g=s-n.statedAtMs;if(!(g>=0&&g<=XP))return"session_writers_stale";if(zh())return;return await lt(Vd().catch(()=>null),0)!==void 0?"flag_off":"flag_unsettled"};
var WM=/^(?=[\s\S]{1,64}$)[a-z][a-z0-9_]*(?:\.[a-z][a-z0-9_]*)*$/;
var QM=/^[a-z][a-z0-9_]{0,63}$/;
var KM=32;
var VM=16384;
var GM="event_origin";
var zM="event_origin_server";
var Ck="host.";
var JM="sdk_host.";
var ZM=120;
var Pk=240;
function Mk(e){let r=Nwt();if(r.reportedDropReasons.has(e))return;if(r.reportedDropReasons.add(e),Msr()==="beta")return;p("mcp_host_otel_route",e)};
function Rk(e,r,n){Mk(e),t(r,n?{level:n}:void 0)};
function hi(e,r,n){if(Nwt().reportedDropReasons.has(e))return;try{Mk(e),t(r,n?{level:n}:void 0)}catch{}};
function Tk(e,r){let n=Nwt();if(n.reportedDropReasons.has(e))return;n.reportedDropReasons.add(e);try{t(r)}catch{}};
function Zm(){let e=Nwt();if(!e.featureOkLogged&&Msr()==="org")e.featureOkLogged=!0,y("mcp_host_otel_route")};
function eE(e){let r=Nwt(),n=r.rateTokens??Pk,s=r.rateLastRefillMs??e;if(r.rateTokens=Math.min(Pk,n+Math.max(0,e-s)/60000*ZM),r.rateLastRefillMs=Math.max(s,e),r.rateTokens<1)return!1;return r.rateTokens-=1,!0};
function tp(e){let r=e==="survey"?{loggerNotReady:"survey_logger_not_ready",rateCapped:"survey_rate_capped",otlpNotConfigured:"survey_otlp_not_configured",otlpInitFailed:"survey_otlp_init_failed"}:{loggerNotReady:"logger_not_ready",rateCapped:"rate_capped",otlpNotConfigured:"otlp_not_configured",otlpInitFailed:"otlp_init_failed"};if(!jOe()){if(!v3t()){if(leo()==="init_failed")return hi(r.otlpInitFailed,`host OTLP ${e} record dropped: telemetry init failed before producing a logger; further drops are not logged this session`),!1;return Tk(r.otlpNotConfigured,`host OTLP ${e} record dropped: no OTLP logs exporter configured; further drops are not logged this session`),!1}return Tk(r.loggerNotReady,`host OTLP ${e} record dropped: telemetry logger not ready; further drops are not logged this session`),!1}if(!eE(Date.now()))return hi(r.rateCapped,`host OTLP ${e} record dropped: rate cap reached; further drops are not logged this session`,"warn"),!1;return!0};
function tE(e,r,n){if(typeof e!=="string"||!WM.test(e))return{ok:!1,reason:"bad_event_name"};if(e.startsWith("claude_code.")||e.startsWith(Ck))return{ok:!1,reason:"bad_event_name"};if(typeof r!=="object"||r===null||Array.isArray(r)||Object.getPrototypeOf(r)!==Object.prototype&&Object.getPrototypeOf(r)!==null)return{ok:!1,reason:"bad_attributes_shape"};let s=Object.getOwnPropertyDescriptors(r);if(Object.getOwnPropertySymbols(s).length>0)return{ok:!1,reason:"bad_attributes_shape"};let g=[];for(let M of Object.getOwnPropertyNames(s)){let v=s[M];if(v===void 0||v.get!==void 0||v.set!==void 0||v.enumerable!==!0)return{ok:!1,reason:"bad_attributes_shape"};g.push([M,v.value])}if(g.length>KM)return{ok:!1,reason:"too_many_attributes"};let w={},h=e.length;for(let[M,v]of g){if(!QM.test(M))return{ok:!1,reason:"bad_attribute_key"};if(typeof v!=="string"||v.length>B3r)return{ok:!1,reason:"bad_attribute_value"};if(h+=M.length+v.length,h>VM)return{ok:!1,reason:"payload_too_large"};w[JM+M]=fIe(v)}return w[GM]="sdk_host",w[zM]=fIe(n),{ok:!0,eventName:e,attributes:w}};
function Ek(e,r){try{if(typeof e!=="object"||e===null||Array.isArray(e)){hi("bad_envelope","host OTLP event dropped: bad_envelope (params is not an object); further envelope drops are not logged this session","warn");return}let{eventName:n,attributes:s}=e;rE(n,s,r)}catch{hi("bad_envelope","host OTLP event dropped: bad_envelope (envelope read threw); further envelope drops are not logged this session","warn")}};
function rE(e,r,n){try{if(!tp("route"))return;let s=tE(e,r,n);if(!s.ok){Rk(s.reason,`host OTLP event dropped: ${s.reason}`);return}ys(`${Ck}${s.eventName}`,s.attributes).then(()=>{Zm()},()=>{hi("emit_failed","host OTLP event emit failed")}).catch(()=>{})}catch(s){let g="unknown";try{if(s instanceof Error){let w=s.name;if(typeof w==="string")g=re(w,256)}}catch{}try{Rk("route_error",`host OTLP event route error: ${g}`,"warn")}catch{}}};
function nE(e,r){return(n)=>{try{let s="unreadable error value";try{let g=n?.message;s=re(typeof g==="string"?g:String(n),256)}catch{}hi(e,`${r} notification channel error: ${s}; further channel errors are not logged this session`,"warn")}catch{}}};
function ql(e,r,n){let s=e.onerror,g=nE(r,n);e.onerror=(w)=>{try{s?.(w)}catch{}g(w)}};
var sE=new Set(["appeared","responded","abandoned"]);
var iE=new Set(["bad","fine","good","not_sure","dismissed"]);
var aE=new Set(["session","post_compact","memory","long_context"]);
var dE=new Set(["ide","desktop"]);
var lE=new Set(["positive","negative"]);
var uE=new Set(["tool_use","assistant_text"]);
function Ta(e,r){return typeof e==="string"&&r.has(e)?bn(e):void 0};
function Ik(e){return Ta(e,sE)};
function Dk(e){return Ta(e,iE)};
function xk(e){return Ta(e,aE)};
function Ok(e){return Ta(e,dE)};
function Uk(e){return Ta(e,lE)};
function Lk(e){return Ta(e,uE)};
function Pd(e){return typeof e==="string"?e:void 0};
function Nk(e,r){if(rp(e,"claude-vscode"))pE(e,r)};
function rp(e,r){if(!on("allow_product_feedback"))return!1;if(Oj()||a.CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY)return!1;let n=Ik(e.event_type),s=Dk(e.response),g=xk(e.survey_type),w=ye(Pd(e.appearance_id)),h=ye(Pd(e.last_assistant_message_id));if(i("tengu_feedback_survey_event",{event_type:n,appearance_id:w,response:s,survey_type:g,last_assistant_message_id:h,surface:Ok(e.surface)}),!tp("survey"))return!0;return ys("feedback_survey",{event_type:n,appearance_id:w,response:s,survey_type:g,enabled_via_override:T8(),event_origin:"sdk_host",event_origin_server:fIe(r)}).then(()=>{Zm()},()=>{hi("survey_emit_failed","proxied survey OTLP record emit failed")}).catch(()=>{}),!0};
var cE=60000;
function pE(e,r){if(e.event_type!=="appeared")return;let n=le().feedbackSurveyState?.lastShownTime;if(n!==void 0&&Date.now()-n<cE)return;Ae((s)=>({...s,feedbackSurveyState:{lastShownTime:Date.now()}}),r)};
function fE(){let{value:e,source:r}=Uo("tengu_auto_mode_config",{}),n=e?.enabled;if(n==="disabled"&&r!=="override"&&r!=="payload")return"enabled";return n==="enabled"||n==="disabled"||n==="opt-in"?n:"enabled"};
var np=f(()=>u({method:x("log_event"),params:u({eventName:o(),eventData:u({}).passthrough()})}));
function Qk(e,r){let n=e.find((g)=>g.name==="claude-vscode"),s=qt();if(s.stopVscodePolicyGatesRefresh?.(),s.stopVscodePolicyGatesRefresh=null,n&&n.type==="connected"){s.vscodeClient=n,G2(n,np(),async(U)=>{let{eventName:H,eventData:I}=U.params;if(H==="tengu_feedback_survey_event"){if(n.config?.type==="sdk"&&oE())r?.onFeedbackSurveyEvent?.(I);return}if(H==="auto_default_nudge_shown"||H==="auto_default_nudge_resolved"){if(n.config?.type==="sdk"&&oE())r?.onAutoDefaultNudgeEvent?.(H==="auto_default_nudge_shown"?"shown":"resolved",I);return}if((H.startsWith("review_upsell_")||H==="feedback_form_opened")&&!on("allow_product_feedback"))return;if(i(`tengu_vscode_${H}`,I),H==="prompt_invisible_strip")y("input_invisible_strip")}),ql(Os(n.client),"vscode_notification_channel_error","claude-vscode");let g=on("allow_product_feedback"),w=k("tengu_swift_lynx",null),h=Ji(w)&&IVe(),M={...qk(g),tengu_quiet_fern:!0,tengu_vscode_cc_auth:!0,tengu_slate_ribbon:!0,...jk(w,h),tengu_loggia_carousel:r?.refusalFallbackLaneEnabled??!1,tengu_loggia_carousel_config:r?.refusalFallbackSettingToggleVisible??!1,fable5_launch_show:r?.fable5LaunchShow??!1,startup_announcement:r?.startupAnnouncement??!1,tengu_proud_clover:r?.maxEffortReminderEnabled??!1,tengu_harbor_willow:r?.autoDefaultLaunchEnabled??!1,tengu_ccr_v2_session_crud_cli:r?.ccrV2SessionCrudEnabled??!1};Wk(n,M);let v=!1,R=j0(()=>{queueMicrotask(()=>{if(v)return;try{let U=on("allow_product_feedback"),H=Ji(w)&&IVe();if(U===g&&H===h)return;let I=H===h?{}:jk(w,H);g=U,h=H,Object.assign(M,qk(U),I),Wk(n,M)}catch(U){t(`[VSCode] Failed to refresh the policy-bound gates: ${U instanceof Error?U.message:String(U)}`)}})});s.stopVscodePolicyGatesRefresh=()=>{v=!0,R()}}};
function qk(e){let r=k("tengu_vscode_review_upsell",!1),n=k("tengu_vellum_siding",!1),s=fE(),g=k("tengu_lantern_sconce_copy",null),w=k(nDe,null);return{tengu_vscode_review_upsell:r&&e,tengu_cobalt_harbor_notice:k("tengu_cobalt_harbor_notice",!0),tengu_vscode_onboarding:k("tengu_vscode_onboarding",!1),tengu_vscode_resume_precheck:k("tengu_vscode_resume_precheck",!0),tengu_vscode_inline_pastes:k("tengu_vscode_inline_pastes",!0),tengu_tranquil_cloud:Boolean(k("tengu_tranquil_cloud",!0)),tengu_brick_follow:k("tengu_brick_follow",!1),tengu_vellum_siding:n&&e,tengu_lantern_sconce:k("tengu_lantern_sconce",!1),tengu_auto_mode_state:s==="opt-in"?"enabled":s,tengu_lantern_sconce_copy:Ji(g)?_(g):!1,[nDe]:Ji(w)?_(w):!1}};
function jk(e,r){if(!r||!Ji(e))return{tengu_swift_lynx:"",tengu_smooth_forest:!1};return{tengu_swift_lynx:_(e),tengu_smooth_forest:k("tengu_smooth_forest",!1)===!0}};
function Wk(e,r){Os(e.client).notification({method:"experiment_gates",params:{gates:r}}).catch((n)=>{let s="unreadable error value";try{let g=n?.message;s=typeof g==="string"?g:String(n)}catch{}try{t(`[VSCode] Failed to send experiment_gates notification: ${s}`)}catch{}})};
var gE=new Set(["tengu_message_rated","tengu_feedback_survey_event"]);
var yE=f(()=>u({method:x("log_otel_event"),params:se().optional()}));
function $k(e){let r=e.find((n)=>n.name==="ccd_session");if(!r||r.type!=="connected")return;if(r.config.type!=="sdk"||!hu())return;G2(r,yE(),async(n)=>{Ek(n.params,r.name)}),G2(r,np(),async(n)=>{let{eventName:s,eventData:g}=n.params;if(!gE.has(s))return;if(!on("allow_product_feedback"))return;let w=g;switch(s){case"tengu_message_rated":i(s,{message_uuid:ye(Pd(w.message_uuid)),sentiment:Uk(w.sentiment),surface:Lk(w.surface),cleared:w.cleared===!0});break;case"tengu_feedback_survey_event":rp(w,r.name);break}}),ql(Os(r.client),"notification_channel_error","ccd_session")};
function kp(e,r){for(let s of Object.keys(e))if(!r.some((g)=>g.name===s))return"sync";let n=!1;for(let s of r){if(!Object.hasOwn(e,s.name)||s.type==="pending")return"sync";if(s.type==="failed")n=!0}return n?"retry_failed":"none"};
return {kp,Qk,np,ql,nE,hi,Mk,qk,fE,jk,Wk,Nk,rp,Ik,Ta,sE,Dk,iE,xk,aE,Pd,Ok,dE,tp,Tk,eE,Pk,ZM,Zm,pE,cE,$k,yE,Ek,rE,tE,WM,Ck,KM,QM,VM,JM,GM,zM,Rk,gE,Uk,lE,Lk,uE,vl,Yh,JP,XP,Zx,qt,G2,f,u,x,o,oE,on,i,y,re,Nwt,Msr,p,t,Os,k,Ji,IVe,Uo,nDe,_,j0,Oj,a,bn,ye,jOe,v3t,leo,ys,T8,fIe,le,Ae,hu,se,B3r,lo,KV,Jte,L,Ds,zc,fy,ldn,xN,Gao,Zyn,F1,eoe,pcr,N,frt,hdo,Ide,zh,lt,Vd,Bar,jar,qz,BM,S,oTe,age,QUo,AYt,Gf,F6o,ne,d,te,ra}
}

const genericNamespaces287={};
const genericM0=genericModule0({"Po":borrow287("chunk-amg94xhm.js:Po"),"eIt":borrow287("chunk-amg94xhm.js:eIt"),"Wa":borrow287("chunk-amg94xhm.js:Wa"),"iAr":borrow287("chunk-amg94xhm.js:iAr"),"Zqe":borrow287("chunk-amg94xhm.js:Zqe"),"Qqe":borrow287("chunk-amg94xhm.js:Qqe"),"wo":borrow287("chunk-amg94xhm.js:wo"),"Eo":borrow287("chunk-amg94xhm.js:Eo"),"Ja":borrow287("chunk-amg94xhm.js:Ja"),"lt":borrow287("chunk-amg94xhm.js:lt"),"bn":borrow287("chunk-amg94xhm.js:bn"),"Zr":borrow287("chunk-amg94xhm.js:Zr"),"Gr":borrow287("chunk-amg94xhm.js:Gr"),"vr":borrow287("chunk-amg94xhm.js:vr"),"to":borrow287("chunk-amg94xhm.js:to"),"rb":borrow287("chunk-amg94xhm.js:rb"),"kt":borrow287("chunk-amg94xhm.js:kt"),"hn":borrow287("chunk-amg94xhm.js:hn"),"y":borrow287("chunk-amg94xhm.js:y"),"Kr":borrow287("chunk-amg94xhm.js:Kr"),"m":borrow287("chunk-amg94xhm.js:m"),"Go":borrow287("chunk-amg94xhm.js:Go"),"zI":borrow287("chunk-amg94xhm.js:zI"),"VI":borrow287("chunk-amg94xhm.js:VI"),"Mt":borrow287("chunk-amg94xhm.js:Mt"),"FB":borrow287("chunk-amg94xhm.js:FB")});
const genericM1=genericModule1({"Zt":borrow287("chunk-fdjgzr8v.js:Zt"),"eIt":borrow287("chunk-fdjgzr8v.js:eIt"),"qn":borrow287("chunk-fdjgzr8v.js:qn"),"Et":borrow287("chunk-fdjgzr8v.js:Et"),"Zqe":borrow287("chunk-fdjgzr8v.js:Zqe"),"Qqe":borrow287("chunk-fdjgzr8v.js:Qqe"),"Ja":borrow287("chunk-fdjgzr8v.js:Ja"),"lt":borrow287("chunk-fdjgzr8v.js:lt"),"Yo":borrow287("chunk-fdjgzr8v.js:Yo"),"Lo":borrow287("chunk-fdjgzr8v.js:Lo"),"VGt":borrow287("chunk-fdjgzr8v.js:VGt"),"vr":borrow287("chunk-fdjgzr8v.js:vr"),"to":borrow287("chunk-fdjgzr8v.js:to"),"rb":borrow287("chunk-fdjgzr8v.js:rb"),"Ve":borrow287("chunk-fdjgzr8v.js:Ve"),"Ct":borrow287("chunk-fdjgzr8v.js:Ct"),"y":borrow287("chunk-fdjgzr8v.js:y"),"Oo":borrow287("chunk-fdjgzr8v.js:Oo"),"m":borrow287("chunk-fdjgzr8v.js:m"),"Go":borrow287("chunk-fdjgzr8v.js:Go"),"zI":borrow287("chunk-fdjgzr8v.js:zI"),"VI":borrow287("chunk-fdjgzr8v.js:VI"),"Mt":borrow287("chunk-fdjgzr8v.js:Mt"),"FB":borrow287("chunk-fdjgzr8v.js:FB")});
const genericM2=genericModule2({"Zx":borrow287("chunk-v8yhm36h.js:Zx")});
const genericM3=genericModule3({"qt":borrow287("chunk-758hjhx1.js:qt"),"gwe":borrow287("chunk-758hjhx1.js:gwe")});
const genericM4=genericModule4({"G2":borrow287("chunk-rgcp4trk.js:G2"),"Os":borrow287("chunk-rgcp4trk.js:Os")});
const genericM5=genericModule5({"f":borrow287("chunk-5qqrzb2c.js:f")});
const genericM6=genericModule6({"u":borrow287("chunk-aybmj3t4.js:u"),"x":borrow287("chunk-aybmj3t4.js:x"),"o":borrow287("chunk-aybmj3t4.js:o"),"se":borrow287("chunk-aybmj3t4.js:se"),"Ve":borrow287("chunk-aybmj3t4.js:Ve"),"B":borrow287("chunk-aybmj3t4.js:B")});
const genericM7=genericModule7({"oE":borrow287("chunk-0a47xg8f.js:oE"),"hu":borrow287("chunk-0a47xg8f.js:hu")});
const genericM8=genericModule8({"on":borrow287("chunk-b5kmgz2n.js:on"),"j0":borrow287("chunk-b5kmgz2n.js:j0")});
const genericM9=genericModule9({"re":borrow287("chunk-eske5nfz.js:re")});
const genericM10=genericModule10({"n":borrow287("chunk-bn3p37gv.js:n"),"jOe":borrow287("chunk-bn3p37gv.js:jOe"),"v3t":borrow287("chunk-bn3p37gv.js:v3t"),"tB":borrow287("chunk-bn3p37gv.js:tB"),"ee":borrow287("chunk-bn3p37gv.js:ee")});
const genericM11=genericModule11({"IVe":borrow287("chunk-bddx0hyp.js:IVe")});
const genericM12=genericModule12({"nDe":borrow287("chunk-a6hmr81n.js:nDe")});
const genericM13=genericModule13({"T8":borrow287("chunk-3pvpzycx.js:T8"),"EL":borrow287("chunk-3pvpzycx.js:EL")});
const genericM14=genericModule14({"bn":borrow287("chunk-n4qghq20.js:bn"),"me":borrow287("chunk-n4qghq20.js:me"),"S":borrow287("chunk-n4qghq20.js:S"),"c":borrow287("chunk-n4qghq20.js:c")});
const genericM15=genericModule15({"ye":borrow287("chunk-t20x5mnd.js:ye")});
const genericM16=genericModule16({"ys":borrow287("chunk-qyc5w2q1.js:ys")});
const genericM17=genericModule17({"fIe":borrow287("chunk-nankzm0s.js:fIe"),"le":borrow287("chunk-nankzm0s.js:le"),"Ae":borrow287("chunk-nankzm0s.js:Ae"),"B3r":borrow287("chunk-nankzm0s.js:B3r"),"lo":borrow287("chunk-nankzm0s.js:lo"),"k":borrow287("chunk-nankzm0s.js:k"),"xp":borrow287("chunk-nankzm0s.js:xp"),"BM":borrow287("chunk-nankzm0s.js:BM")});
const genericM18=genericModule18({"ldn":borrow287("chunk-09m4fzsj.js:ldn"),"xN":borrow287("chunk-09m4fzsj.js:xN"),"Vg":borrow287("chunk-09m4fzsj.js:Vg"),"Dn":borrow287("chunk-09m4fzsj.js:Dn"),"k":borrow287("chunk-09m4fzsj.js:k"),"d":borrow287("chunk-09m4fzsj.js:d"),"Z":borrow287("chunk-09m4fzsj.js:Z"),"C1":borrow287("chunk-09m4fzsj.js:C1")});
const genericM19=genericModule19({"u":borrow287("chunk-bq2rje4b.js:u"),"s":borrow287("chunk-bq2rje4b.js:s")});
const genericM20=genericModule20({"Zyn":borrow287("chunk-5rsp1jx3.js:Zyn"),"eoe":borrow287("chunk-5rsp1jx3.js:eoe")});
const genericM21=genericModule21({"F1":borrow287("chunk-cwq90agc.js:F1")});
const genericM22=genericModule22({"kh":borrow287("chunk-hrhfcbdv.js:kh"),"N":borrow287("chunk-hrhfcbdv.js:N")});
const genericM23=genericModule23({"i":borrow287("chunk-6hnyhakg.js:i")});
const genericM24=genericModule24({"hn":borrow287("chunk-f1vb7bx7.js:hn")});
const genericM25=genericModule25({"le":genericM17["le"],"kh":genericM22["kh"],"i":genericM23["i"],"me":genericM14["me"],"S":genericM14["S"],"hn":genericM24["hn"],"Ae":genericM17["Ae"]});
const genericM26=genericModule26({"N":genericM22["N"]});
const genericM27=genericModule27({"Ide":borrow287("chunk-0rn4hgq0.js:Ide")});
const genericM28=genericModule28({"f":borrow287("chunk-bvq78v2j.js:f"),"Ve":genericM6["Ve"],"B":genericM6["B"],"C":borrow287("chunk-bvq78v2j.js:C"),"yot":borrow287("chunk-bvq78v2j.js:yot"),"_7t":borrow287("chunk-bvq78v2j.js:_7t"),"y7t":borrow287("chunk-bvq78v2j.js:y7t"),"F$":borrow287("chunk-bvq78v2j.js:F$"),"TDn":borrow287("chunk-bvq78v2j.js:TDn"),"tCe":borrow287("chunk-bvq78v2j.js:tCe"),"V":borrow287("chunk-bvq78v2j.js:V"),"ryr":borrow287("chunk-bvq78v2j.js:ryr")});
const genericM29=genericModule29({"Cie":borrow287("chunk-64z3xwk8.js:Cie")});
const genericM30=genericModule30({"l":borrow287("chunk-c9me9cp7.js:l")});
const genericM31=genericModule31({"qht":borrow287("chunk-4shr1gvc.js:qht"),"DBe":borrow287("chunk-4shr1gvc.js:DBe"),"uSn":borrow287("chunk-4shr1gvc.js:uSn"),"gjt":borrow287("chunk-4shr1gvc.js:gjt"),"r7e":borrow287("chunk-4shr1gvc.js:r7e"),"gSn":borrow287("chunk-4shr1gvc.js:gSn"),"Kht":borrow287("chunk-4shr1gvc.js:Kht"),"HBe":borrow287("chunk-4shr1gvc.js:HBe"),"x7n":borrow287("chunk-4shr1gvc.js:x7n"),"Vr":borrow287("chunk-4shr1gvc.js:Vr"),"t":borrow287("chunk-4shr1gvc.js:t"),"A":borrow287("chunk-4shr1gvc.js:A"),"p":borrow287("chunk-4shr1gvc.js:p"),"l":borrow287("chunk-4shr1gvc.js:l"),"O7n":borrow287("chunk-4shr1gvc.js:O7n"),"m":borrow287("chunk-4shr1gvc.js:m"),"Ee":borrow287("chunk-4shr1gvc.js:Ee"),"pSn":borrow287("chunk-4shr1gvc.js:pSn")});
const genericM32=genericModule32({"xz":borrow287("chunk-w77dxxmg.js:xz")});
const genericM33=genericModule33({"YK":borrow287("chunk-q80zaav8.js:YK"),"_t":borrow287("chunk-q80zaav8.js:_t"),"lC":borrow287("chunk-q80zaav8.js:lC"),"Y":borrow287("chunk-q80zaav8.js:Y")});
const genericM34=genericModule34({"Le":borrow287("chunk-4s38z9x2.js:Le")});
const genericM35=genericModule35({"Oh":borrow287("chunk-q6t47sex.js:Oh")});
const genericM36=genericModule36({"hX":borrow287("chunk-dbsg9bmz.js:hX")});
const genericM37=genericModule37({"Ai":borrow287("chunk-mphp7acd.js:Ai"),"Kn":borrow287("chunk-mphp7acd.js:Kn"),"oMt":borrow287("chunk-mphp7acd.js:oMt"),"sMt":borrow287("chunk-mphp7acd.js:sMt"),"tMt":borrow287("chunk-mphp7acd.js:tMt"),"Ld":borrow287("chunk-mphp7acd.js:Ld"),"vFe":borrow287("chunk-mphp7acd.js:vFe"),"Vx":borrow287("chunk-mphp7acd.js:Vx"),"F":borrow287("chunk-mphp7acd.js:F"),"_":borrow287("chunk-mphp7acd.js:_"),"t":borrow287("chunk-mphp7acd.js:t"),"it":borrow287("chunk-mphp7acd.js:it"),"edt":borrow287("chunk-mphp7acd.js:edt"),"Tn":borrow287("chunk-mphp7acd.js:Tn"),"q":borrow287("chunk-mphp7acd.js:q"),"js":borrow287("chunk-mphp7acd.js:js"),"Yf":borrow287("chunk-mphp7acd.js:Yf"),"Jme":borrow287("chunk-mphp7acd.js:Jme"),"lC":genericM33["lC"],"gP":borrow287("chunk-mphp7acd.js:gP"),"W":borrow287("chunk-mphp7acd.js:W"),"Y":borrow287("chunk-mphp7acd.js:Y"),"tWe":borrow287("chunk-mphp7acd.js:tWe"),"oTe":borrow287("chunk-mphp7acd.js:oTe")});
const genericM38=genericModule38({"wYe":borrow287("chunk-s74nkhgm.js:wYe")});
const genericM39=genericModule39({"ar":borrow287("chunk-g3fn1fm9.js:ar")});
const genericM40=genericModule40({});
const genericM41=genericModule41({"ee":borrow287("chunk-f2n7vgt8.js:ee")});
const genericM42=genericModule42({"ne":borrow287("chunk-h7xaj2fc.js:ne")});
const genericM43=genericModule43({"d":borrow287("chunk-amhtwhch.js:d"),"te":borrow287("chunk-amhtwhch.js:te")});
const genericM44=genericModule44({"wr":borrow287("chunk-wn3f9rb9.js:wr"),"s":borrow287("chunk-wn3f9rb9.js:s")});
const genericM45=genericModule45({"Que":borrow287("chunk-s5hxszmb.js:Que")});
const genericM46=genericModule46({"a":borrow287("chunk-mbfze585.js:a")});
const genericM47=genericModule47({"Mie":borrow287("chunk-5z8mq5zm.js:Mie")});
const genericM48=genericModule48({"r":borrow287("chunk-35ny7gy3.js:r"),"que":borrow287("chunk-35ny7gy3.js:que")});
const genericM49=genericModule49({"O":borrow287("chunk-2ynta9xc.js:O")});
const genericM50=genericModule50({"Vr":borrow287("chunk-w7hy7pqe.js:Vr"),"Apt":borrow287("chunk-w7hy7pqe.js:Apt"),"B7r":genericM49["B7r"],"j7r":genericM49["j7r"],"EFr":borrow287("chunk-w7hy7pqe.js:EFr")});
const genericM51=genericModule51({"Do":borrow287("chunk-1cedw4af.js:Do")});
const genericM52=genericModule52({"Fie":borrow287("chunk-ycmwpgqc.js:Fie")});
const genericM53=genericModule53({"rF":borrow287("chunk-1b21she7.js:rF"),"Xre":borrow287("chunk-1b21she7.js:Xre"),"tp":borrow287("chunk-1b21she7.js:tp")});
const genericM54=genericModule54({"uj":borrow287("chunk-vhpv944z.js:uj")});
const genericM55=genericModule55({"m":borrow287("chunk-9d2ykxmy.js:m"),"p":borrow287("chunk-9d2ykxmy.js:p")});
const genericM56=genericModule56({"Qen":borrow287("chunk-jgt9a0f6.js:Qen")});
const genericM57=genericModule57({"Mre":borrow287("chunk-6jc3yf5g.js:Mre")});
const genericM58=genericModule58({"S7t":borrow287("chunk-9sfc355h.js:S7t")});
const genericM59=genericModule59({"qa":borrow287("chunk-ywykbzag.js:qa")});
const genericM60=genericModule60({"bmo":genericM28["bmo"],"Cie":genericM29["Cie"],"t":borrow287("chunk-r7jk65a3.js:t"),"l":genericM30["l"],"Vht":genericM31["Vht"],"qht":genericM31["qht"],"xz":genericM32["xz"],"DBe":genericM31["DBe"],"ut":builtin287["stream:PassThrough"],"gwe":genericM3["gwe"],"xe":builtin287["url:URL"],"YK":genericM33["YK"],"Le":genericM34["Le"],"at":builtin287["fs:fstatSync"],"it":builtin287["fs:createWriteStream"],"k":genericM17["k"],"yot":genericM28["yot"],"Oh":genericM35["Oh"],"ot":builtin287["url:URL"],"_7t":genericM28["_7t"],"hX":genericM36["hX"],"y7t":genericM28["y7t"],"F$":genericM28["F$"],"Vg":genericM18["Vg"],"BDr":genericM18["BDr"],"N":genericM22["N"],"Ai":genericM37["Ai"],"wYe":genericM38["wYe"],"_t":genericM33["_t"],"TDn":genericM28["TDn"],"ar":genericM39["ar"],"xp":genericM17["xp"],"Gar":genericM40["Gar"],"ee":genericM41["ee"],"ne":genericM42["ne"],"$e":builtin287["crypto:randomUUID"],"tCe":genericM28["tCe"],"Smo":genericM28["Smo"],"d":genericM43["d"],"Kn":genericM37["Kn"],"oMt":genericM37["oMt"],"sMt":genericM37["sMt"],"U0r":genericM37["U0r"],"R0r":genericM37["R0r"],"QTn":genericM10["QTn"],"tdt":genericM37["tdt"],"HGn":genericM37["HGn"],"wr":genericM44["wr"],"$6o":genericM44["$6o"],"uSn":genericM31["uSn"],"gjt":genericM31["gjt"],"r7e":genericM31["r7e"],"Que":genericM45["Que"],"gSn":genericM31["gSn"],"a":genericM46["a"],"Mie":genericM47["Mie"],"VGr":genericM48["VGr"],"que":genericM48["que"],"qGr":genericM48["qGr"],"bLo":genericM50["bLo"],"Y":genericM33["Y"],"Do":genericM51["Do"],"ryr":genericM28["ryr"],"Fie":genericM52["Fie"],"Kht":genericM31["Kht"],"HBe":genericM31["HBe"],"x7n":genericM31["x7n"],"_Xe":genericM53["_Xe"],"rF":genericM53["rF"],"Xre":genericM53["Xre"],"tp":genericM53["tp"],"OGo":genericM31["OGo"],"O7n":genericM31["O7n"],"LGo":genericM31["LGo"],"C1":genericM18["C1"],"uj":genericM54["uj"],"i":genericM23["i"],"c":genericM14["c"],"m":genericM55["m"],"p":genericM55["p"],"Qen":genericM56["Qen"],"Mre":genericM57["Mre"],"S7t":genericM58["S7t"],"qa":genericM59["qa"],"pSn":genericM31["pSn"],"HGo":genericM31["HGo"]});
const genericM61=genericModule61({"age":borrow287("chunk-vr91y374.js:age")});
const genericM62=genericModule62({"ra":borrow287("chunk-cn6jmgrs.js:ra")});
const genericM63=genericModule63({"Zx":genericM2["Zx"],"qt":genericM3["qt"],"G2":genericM4["G2"],"f":genericM5["f"],"u":genericM6["u"],"x":genericM6["x"],"o":genericM6["o"],"oE":genericM7["oE"],"on":genericM8["on"],"i":borrow287("chunk-xapeakym.js:i"),"y":borrow287("chunk-xapeakym.js:y"),"re":genericM9["re"],"Nwt":genericM10["Nwt"],"Msr":genericM10["Msr"],"p":borrow287("chunk-xapeakym.js:p"),"t":borrow287("chunk-xapeakym.js:t"),"Os":borrow287("chunk-xapeakym.js:Os"),"k":borrow287("chunk-xapeakym.js:k"),"Ji":borrow287("chunk-xapeakym.js:Ji"),"IVe":genericM11["IVe"],"Uo":borrow287("chunk-xapeakym.js:Uo"),"nDe":genericM12["nDe"],"_":borrow287("chunk-xapeakym.js:_"),"j0":genericM8["j0"],"Oj":genericM13["Oj"],"a":borrow287("chunk-xapeakym.js:a"),"bn":genericM14["bn"],"ye":genericM15["ye"],"jOe":genericM10["jOe"],"v3t":genericM10["v3t"],"leo":genericM10["leo"],"ys":genericM16["ys"],"T8":genericM13["T8"],"fIe":genericM17["fIe"],"le":genericM17["le"],"Ae":genericM17["Ae"],"hu":genericM7["hu"],"se":genericM6["se"],"B3r":genericM17["B3r"],"lo":genericM17["lo"],"KV":borrow287("chunk-xapeakym.js:KV"),"Jte":borrow287("chunk-xapeakym.js:Jte"),"L":borrow287("chunk-xapeakym.js:L"),"Ds":borrow287("chunk-xapeakym.js:Ds"),"zc":borrow287("chunk-xapeakym.js:zc"),"fy":borrow287("chunk-xapeakym.js:fy"),"ldn":genericM18["ldn"],"xN":genericM18["xN"],"Gao":genericM19["Gao"],"Zyn":genericM20["Zyn"],"F1":genericM21["F1"],"eoe":genericM20["eoe"],"pcr":genericM25["pcr"],"N":borrow287("chunk-xapeakym.js:N"),"frt":genericM26["frt"],"hdo":genericM26["hdo"],"Ide":genericM27["Ide"],"zh":borrow287("chunk-xapeakym.js:zh"),"lt":borrow287("chunk-xapeakym.js:lt"),"Vd":borrow287("chunk-xapeakym.js:Vd"),"Bar":genericM60["Bar"],"jar":genericM60["jar"],"qz":genericM60["qz"],"BM":genericM17["BM"],"S":borrow287("chunk-xapeakym.js:S"),"oTe":genericM37["oTe"],"age":genericM61["age"],"QUo":genericM4["QUo"],"AYt":genericM26["AYt"],"Gf":borrow287("chunk-xapeakym.js:Gf"),"F6o":genericM44["F6o"],"ne":borrow287("chunk-xapeakym.js:ne"),"d":borrow287("chunk-xapeakym.js:d"),"te":genericM43["te"],"ra":genericM62["ra"]});
const genericSources287={"chunk-amg94xhm.js":genericM0,"chunk-fdjgzr8v.js":genericM1,"chunk-v8yhm36h.js":genericM2,"chunk-758hjhx1.js":genericM3,"chunk-rgcp4trk.js":genericM4,"chunk-5qqrzb2c.js":genericM5,"chunk-aybmj3t4.js":genericM6,"chunk-0a47xg8f.js":genericM7,"chunk-b5kmgz2n.js":genericM8,"chunk-eske5nfz.js":genericM9,"chunk-bn3p37gv.js":genericM10,"chunk-bddx0hyp.js":genericM11,"chunk-a6hmr81n.js":genericM12,"chunk-3pvpzycx.js":genericM13,"chunk-n4qghq20.js":genericM14,"chunk-t20x5mnd.js":genericM15,"chunk-qyc5w2q1.js":genericM16,"chunk-nankzm0s.js":genericM17,"chunk-09m4fzsj.js":genericM18,"chunk-bq2rje4b.js":genericM19,"chunk-5rsp1jx3.js":genericM20,"chunk-cwq90agc.js":genericM21,"chunk-hrhfcbdv.js":genericM22,"chunk-6hnyhakg.js":genericM23,"chunk-f1vb7bx7.js":genericM24,"chunk-ce86av7y.js":genericM25,"chunk-49evd8xc.js":genericM26,"chunk-0rn4hgq0.js":genericM27,"chunk-bvq78v2j.js":genericM28,"chunk-64z3xwk8.js":genericM29,"chunk-c9me9cp7.js":genericM30,"chunk-4shr1gvc.js":genericM31,"chunk-w77dxxmg.js":genericM32,"chunk-q80zaav8.js":genericM33,"chunk-4s38z9x2.js":genericM34,"chunk-q6t47sex.js":genericM35,"chunk-dbsg9bmz.js":genericM36,"chunk-mphp7acd.js":genericM37,"chunk-s74nkhgm.js":genericM38,"chunk-g3fn1fm9.js":genericM39,"chunk-85cakz9j.js":genericM40,"chunk-f2n7vgt8.js":genericM41,"chunk-h7xaj2fc.js":genericM42,"chunk-amhtwhch.js":genericM43,"chunk-wn3f9rb9.js":genericM44,"chunk-s5hxszmb.js":genericM45,"chunk-mbfze585.js":genericM46,"chunk-5z8mq5zm.js":genericM47,"chunk-35ny7gy3.js":genericM48,"chunk-2ynta9xc.js":genericM49,"chunk-w7hy7pqe.js":genericM50,"chunk-1cedw4af.js":genericM51,"chunk-ycmwpgqc.js":genericM52,"chunk-1b21she7.js":genericM53,"chunk-vhpv944z.js":genericM54,"chunk-9d2ykxmy.js":genericM55,"chunk-jgt9a0f6.js":genericM56,"chunk-6jc3yf5g.js":genericM57,"chunk-9sfc355h.js":genericM58,"chunk-ywykbzag.js":genericM59,"chunk-r7jk65a3.js":genericM60,"chunk-vr91y374.js":genericM61,"chunk-cn6jmgrs.js":genericM62,"chunk-xapeakym.js":genericM63};

return {sources:genericSources287,namespaces:genericNamespaces287};
}
