import * as lib0 from "crypto";
function module0(imports){
const n=imports["n"];
class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}};
function LZr(e){n().surfaceCapabilities.declarePerTaskStopAffordance(e)};
function S3t(){return n().surfaceCapabilities.sdkPerTaskStopAffordance()===!0};
function uo(){return n().host.credentialSlots.gatewayAuth()};
function M3t(){return n().host.credentialSlots.gatewayServerProcess()};
function L3t(){return n().host.credentialSlots.gatewayRequiredByHostPolicy()};
return {LZr,S3t,uo,M3t,L3t,V};
}
function module1(imports){
class e{availability=()=>!1;register(i){this.availability=i}isAvailable(){return this.availability()}};
var a=new e;
function qS(){return a.isAvailable()};
return {qS,a,e};
}
function module2(imports){
function r(n){return n};
function S(n){return r(n)};
function c(n){return r(n)};
function bn(n){return r(n)};
return {c,r,bn,S};
}
function module3(imports){
const bn=imports["bn"];
const S=imports["S"];
function Z(n){return n instanceof Error?n:Error(String(n))};
function l(n){return n instanceof Error?n.message:String(n)};
function tme(n){if(typeof n!=="string")return;return/^[A-Za-z][A-Za-z0-9_-]{0,63}$/.test(n)?bn(n):S("nonconforming")};
return {tme,Z,l};
}
function module4(imports){
const i=imports["i"];
const c=imports["c"];
const tme=imports["tme"];
function y(e,r){i("tengu_feature_ok",{feature_name:c(e),...r})};
function m(e,r,u){i("tengu_feature_bad",{...u,feature_name:c(e),error_code:tme(r)})};
return {y,m};
}
function module5(imports){
const X=imports["X"];
function RH(e){X().shareStatus.pendingNoticeSlugs.delete(e)};
return {RH};
}
function module6(imports){
function I(t,n,e=n+"s"){return t===1?n:e};
return {I};
}
function module7(imports){
function Le(e){if(!e)return!1;if(typeof e==="boolean")return e;let n=String(e).toLowerCase().trim();return["1","true","yes","on"].includes(n)};
return {Le};
}
function module8(imports){
const process=imports["process"];
const Le=imports["Le"];
var Ru="task-notification";
var Oz="task-id";
var zK="tool-use-id";
var ZZ="task-type";
var qU="artifact-watch-lifecycle";
var ret="output-file";
var aC="status";
var wT="summary";
var oet="Monitor event:";
var lwt=`${oet} "`;
var Lqt="event";
function mwt(){if(process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC)return"essential-traffic";if(process.env.DISABLE_TELEMETRY)return"no-telemetry";if(Le(process.env.DO_NOT_TRACK))return"no-telemetry";return"default"};
function EL(){return mwt()!=="default"};
return {Oz,zK,ZZ,ret,aC,wT,Ru,lwt,oet,Lqt,qU,EL,mwt};
}
function module9(imports){
const Oz=imports["Oz"];
const zK=imports["zK"];
const ZZ=imports["ZZ"];
const ret=imports["ret"];
const aC=imports["aC"];
const wT=imports["wT"];
const Ru=imports["Ru"];
function qi({taskId:n,toolUseId:s,taskType:r,outputFile:e,status:i,summary:t,body:u,trailing:d}){let f=[[Oz,n],[zK,s],[ZZ,r],[ret,e],[aC,i],[wT,t]],o=`<${Ru}>`;for(let[a,T]of f)if(T)o+=`
<${a}>${T}</${a}>`;return`${o}${u??""}
</${Ru}>${d??""}`};
return {qi};
}
function module10(imports){
function zt(u){return u.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")};
return {zt};
}
function module11(imports){
var mk="PushNotification";
return {mk};
}
function module12(imports){
const a=imports["a"];
function LUt(e){if(e.stopped=!0,e.abort.abort(),e.timer!==void 0)clearTimeout(e.timer),e.timer=void 0;delete e.lease,delete e.renewable,delete e.wake};
function NUt(){return a().current?.room};
function dhn(e){let r=a().current?.presence;r?.disposeSlug?.(r,e)};
return {LUt,dhn,NUt};
}
function module13(imports){
const X=imports["X"];
const y=imports["y"];
const rr=imports["rr"];
const Aw=imports["Aw"];
const v=imports["v"];
const RH=imports["RH"];
const I=imports["I"];
const Mi=imports["Mi"];
const Ge=imports["Ge"];
const qi=imports["qi"];
const zt=imports["zt"];
const nx=imports["nx"];
const lwt=imports["lwt"];
const sSe=imports["sSe"];
const mk=imports["mk"];
const Lqt=imports["Lqt"];
const Ii=imports["Ii"];
const NUt=imports["NUt"];
const qU=imports["qU"];
function pte(e){for(let[t,n]of X().wakes.wakes){if(e!==void 0&&t!==e)continue;if(n.coalesceTimer)clearTimeout(n.coalesceTimer),n.coalesceTimer=null;if(n.rescanWanted=!1,n.pendingConfirm=null,n.pendingSeed=null,n.newestKickAt=0,n.kickSettled=!0,n.lastScanScheduledAt=0,n.rescanArgs=null,n.idleRescanCancel?.(),n.idleRescanCancel=null,n.idleRescanUnmuted=!1,n.idlePassOwed=null,n.readRetryTimer)clearTimeout(n.readRetryTimer),n.readRetryTimer=null;n.readRetryAttempts=0,n.cancelGeneration++}};
function fst(){X().wakes.scanGeneration++};
function FQt(e){let{slugEpochs:t}=X().wakes;t.set(e,(t.get(e)??0)+1)};
function M(e){let{stopGenerations:t}=X().wakes;t.set(e,(t.get(e)??0)+1)};
function $Qt(e,t){let{latchChangedAt:n}=X().wakes;if(t===void 0)n.set(e,Date.now());else if(Number.isFinite(t))n.set(e,Math.min(t,Date.now()));else n.delete(e)};
var b=$Qt;
function UQt(e){let{wakes:t}=X();b(e),t.stoppedSlugs.add(e),t.sweptSlugs.delete(e),t.orphanedSweptSlugs.delete(e),M(e),t.pendingResumeDisclosure.delete(e)};
function jg(e){return X().wakes.stoppedSlugs.has(e)};
function Wg(e){let t=X();return t.wakes.stoppedSlugs.has(e)||t.durable.stopLatches.isStopped(e)};
function dqe(e){let{wakes:t}=X();if(!t.stoppedSlugs.has(e))b(e),t.stoppedSlugs.add(e),t.sweptSlugs.add(e),M(e);else{let n=t.yieldedSlugs.get(e);if(n!==void 0)n.wasPaused=!0,M(e)}t.humanTurnAtScanGeneration=null,t.liftedAtScanGeneration.delete(e),t.orphanedSweptSlugs.delete(e),t.pendingResumeDisclosure.delete(e)};
function mh(e){return X().wakes.sweptSlugs.has(e)};
function FD(e){return X().wakes.yieldedSlugs.has(e)};
function KLn(e){let t=`${e.count} comment ${e.count===1?"thread":"threads"}`;return`Before the stop, ${e.family==="auto-edited"?`Artifact: ${e.artifactName} had already been auto-edited in response to ${t}`:`automatic replies had already been posted on ${t} of Artifact: ${e.artifactName}`} (the pending notice was discarded with the stop \u2014 the artifact's thread and version history carry the record).`};
function x(e){let t=X().noticeCoalesce,n=[];for(let[o,r]of t){if(e!==void 0&&r.slug!==e)continue;if(r.family==="artifact-changed")continue;if(r.timer!==void 0)clearTimeout(r.timer);t.delete(o),n.push({slug:r.slug,family:r.family,artifactName:r.artifactName,count:r.count})}return n};
function rwr(e){let{autoReact:t,live:n}=X(),o=n.supervisors.get(e);return t.userDisarmed||Wg(e)||t.enabledMemo===!1||(t.artifacts.get(e)?.lastProbeDeniedBy??null)!==null||o!==void 0&&!o.stopped&&o.armedVia==="mcp_write"};
function D(e,t,n){if(t(n),!e.summonArmOkReported)e.summonArmOkReported=!0,y("artifact_summon_arm_emit")};
function te(e,t,n){let o=e.activitySenders.get(t);if(o===void 0)return;let r=e.summonDeclared.get(t);if(n&&r!==!0)e.summonDeclared.set(t,!0),D(e,o,"arm:0");else if(!n&&r===!0)e.summonDeclared.set(t,!1),D(e,o,"arm")};
function PB(e,t){te(e,t,rwr(t))};
function owr(e){for(let t of e.activitySenders.keys())PB(e,t)};
function B(e,t=!1){let n=!t&&sSe()?`
If this event is something the user would act on now, send a ${mk}. Routine or benign output doesn't need one.`:"";return`
<${Lqt}>${zt(e)}</${Lqt}>${n}`};
function n6(e,t,n,o){Mi({value:qi({taskId:n?zt(n):void 0,summary:`${lwt}${zt(e)}"`,body:B(t,o?.isHousekeeping)}),mode:"task-notification",skipAttachments:!0,priority:"next",agentId:o?.agentId??Ge()},{turnAttribution:o?.turnAttribution??"inherit"})};
function P(e,t,n){let o,r,i;if(t.update(e,(s)=>{if(s.status!=="running")return s;if(o=s.description,r=s.toolUseId,i=s.agentId,s.timeoutId!==void 0)clearTimeout(s.timeoutId);return{...s,status:n?.endedAs?.status??"killed",endTime:Date.now(),timeoutId:void 0,notified:!0,terminal:{summary:n?.endedAs?.summary??s.description}}}),n?.onKilled?.(),nx(i,`monitor:${e}`,t),o!==void 0){if(!n?.quiet)n6(o,"[Monitor stopped]",e,{isHousekeeping:!0,agentId:i});Ii(e,n?.endedAs?.status??"stopped",{toolUseId:r,summary:n?.endedAs?.summary??o})}};
function $D(e){return typeof e==="object"&&e!==null&&"type"in e&&e.type==="monitor_ws"};
function ZLn(e,t,n){return $D(e)&&e.status==="running"&&e.autoReactArmed===!0&&t()&&(n?.includeStopLatched===!0||!(e.autoReactSlug!==void 0&&Wg(e.autoReactSlug)))};
function dwr(e){let t=NUt(),n=rr().artifactRoomStopObserver?.disposeAll()??0,o=t?.consentRevoke?.()??0;if(n<=0&&o<=0||t?.consentGone?.()===!0)return n;let r="The next publish of such an artifact that declares a room will ask the user before joining again; do not republish to rejoin unless the user asks.",i={agentId:Ge(),value:qi({taskType:qU,summary:zt(n>0?`Left the live ${I(n,"room")} of ${n} ${I(n,"artifact")} (the user stopped background activity)`:`Forgot the live-room ${I(o,"approval")} of ${o} ${I(o,"artifact")} (the user stopped background activity)`),body:`
<event>${zt(n>0?`Page events from those artifacts' viewers will no longer arrive and room_send to them will report not_connected; every remembered room-join approval was forgotten too. ${r}`:`No room was open. ${r}`)}</event>`}),mode:"task-notification",skipAttachments:!0,priority:"later",origin:{kind:"task-notification",source:qU,roomLifecycle:!0}};if(e!==void 0)e.enqueuePendingNotification(i);else Mi(i);return n};
function py(e,t,n){let o=t.all()[e];if($D(o)&&o.autoReactArmed===!0){if(pte(o.autoReactSlug),o.autoReactSlug!==void 0&&n?.connectionLost!==!0)FQt(o.autoReactSlug);if(n?.userStop===!0&&o.autoReactSlug!==void 0&&(o.status==="running"||!mh(o.autoReactSlug)))VQt(o.autoReactSlug)}if(n?.userStop===!0&&$D(o)&&o.frameLive!==void 0){if(rr().frameLiveUserStopObserver?.(o.frameLive.slug,{running:o.status==="running",taskId:e,taskStop:n?.taskStop===!0,modelOrigin:n?.modelOrigin===!0,taskRegistry:t})===!0)if(mh(o.frameLive.slug))VQt(o.frameLive.slug);else rr().autoReactDeliberateStopObserver?.(o.frameLive.slug)}if(n?.userStop===!0&&$D(o)&&o.frameLive===void 0&&o.autoReactArmed!==!0)rr().liveDocUserStopObserver?.(e,{modelOrigin:n?.modelOrigin===!0,running:o.status==="running"}),rr().artifactRoomStopObserver?.leaveByTaskId(e),rr().artifactPresenceStopObserver?.closeByTaskId(e);P(e,t,{quiet:n?.quiet,onKilled(){let r=rr().monitorSockets.get(e);if(r)rr().monitorSockets.delete(e),r.close()}})};
function VQt(e){UQt(e),rr().autoReactDeliberateStopObserver?.(e),PB(X().live,e);let t=x(e);rr().artifactRoomStopObserver?.leave(e);let n=Aw((o)=>o.origin?.kind==="task-notification"&&o.origin.slug===e&&bxt(o));if(Q(n,t),v(n),n.some(be)||t.length>0)RH(e);r6(0,t)};
function ye(e){return e==="artifact-auto-react"||e==="artifact-room"};
function Q(e,t){for(let n of e){let o=n.origin;if(o?.kind==="task-notification"&&o.coalesced!==void 0&&o.coalesced.family!=="artifact-changed"&&o.slug!==void 0&&o.displayName!==void 0)t.push({slug:o.slug,family:o.coalesced.family,artifactName:o.displayName,count:o.coalesced.count})}};
function r6(e,t=[],n){if(e<=0&&t.length===0)return;let o=I(e,"it","them"),r=I(e,"this artifact","these artifacts"),i=I(e,"the watch is kept","the watches are kept"),s=n?.catchUp===!1?"":" (comments sent to Claude meanwhile are answered then)",d=n?.catchUp===!1?"":", and comments sent to Claude in the meantime are answered then",l=", or resume_replies if the user asks",a=`publishing without being asked, while handling a notification or a wake-up, leaves ${o} paused`,c=`the user can stop ${o} for good with \u2715 on the watch in the tasks list or the kill-all-agents gesture`,g=n?.nameChordGesture===!0?`this receipt reaches you with a later turn: if that turn is the user's own typed message it has already resumed ${o}${n.catchUp===!1?"":" (comments sent to Claude meanwhile are being answered now)"}, otherwise the user's next message resumes ${o} (so does a publish of ${r} the user asks for${l}; ${a})${d}; ${c}`:`when the user asks you to publish ${r} again, that publish resumes ${o}${l}, as does the user's next typed message \u2014 each only on hosts that pass typed input through as the user's${d}; ${a}`;Mi({agentId:Ge(),value:qi({taskType:"artifact-auto-react",summary:zt(e>0?`${e} artifact auto-reply ${I(e,"subscription")} paused ${n?.nameChordGesture===!0?"until your next message":"by the interrupt"}${s}`:"Artifact auto-reply activity stopped"),body:`
${zt(t.map(KLn).concat(e>0?[`The user's interrupt paused ${o} and ${i}; ${g}. Do not republish or resume just to re-enable auto-replies unless the user asks.`]:[]).join(`

`))}`}),mode:"task-notification",skipAttachments:!0,...n?.passive===!0&&{passive:!0,priority:"next"},origin:{kind:"task-notification",source:"artifact-auto-react-stop-disclosure",nonDurableStop:!0,...t.length>0&&{carriesDiscardRecord:!0}}})};
function be(e){return e.origin?.kind==="task-notification"&&e.origin.source==="artifact-auto-react"};
function bxt(e){return e.origin?.kind==="task-notification"&&ye(e.origin.source)};
function zae(e,t){let n=x();for(let r of n)RH(r.slug);if(t?.leaveArtifactRooms===!0)dwr(e);let o=e.removeByFilter(bxt);for(let r of o)if(r.origin?.kind==="task-notification"&&r.origin.source==="artifact-auto-react"&&r.origin.slug!==void 0)RH(r.origin.slug);return Q(o,n),v(o),n};
return {pte,fst,ZLn,$D,Wg,owr,PB,te,D,rwr,jg,mh,FD,py,FQt,VQt,UQt,b,$Qt,M,x,bxt,ye,Q,be,r6,KLn,P,n6,B,dqe,zae,dwr};
}
function module14(imports){
const X=imports["X"];
const a=imports["a"];
const k=imports["k"];
const qS=imports["qS"];
const owr=imports["owr"];
function XJt(e){if(e!==void 0)X().autoReact.ledgerStorageV5=e};
function rxt(){let e=X().autoReact;return e.optIn??=a.CLAUDE_CODE_ARTIFACT_COMMENTS_AUTOREACT??k("tengu_sorrel_trellis",!1),e.optIn};
function zu(){let e=X(),t=!e.autoReact.userDisarmed&&rxt()&&qS();if(e.autoReact.enabledMemo!==t)e.autoReact.enabledMemo=t,owr(e.live);return t};
return {XJt,zu,rxt};
}
function module15(imports){
const X=imports["X"];
function Yrn(e,n){let r=X().live.heardVersions;if(n===void 0||r.get(e)?.ver===n)r.delete(e)};
return {Yrn};
}
function module16(imports){
const XJt=imports["XJt"];
const pte=imports["pte"];
const fst=imports["fst"];
const X=imports["X"];
const ZLn=imports["ZLn"];
const zu=imports["zu"];
const jg=imports["jg"];
const mh=imports["mh"];
const FD=imports["FD"];
const py=imports["py"];
const oxt=imports["oxt"];
const dqe=imports["dqe"];
const PB=imports["PB"];
const Er=imports["Er"];
const Xi=imports["Xi"];
const LUt=imports["LUt"];
const Yrn=imports["Yrn"];
const dhn=imports["dhn"];
const kLn=imports["kLn"];
const UQt=imports["UQt"];
const oQt=imports["oQt"];
const Uae=imports["Uae"];
function te(e,n){let r=e.supervisors.get(n);if(r)LUt(r),e.supervisors.delete(n);Yrn(n),dhn(n),Ve(n)?.sourceEnded()};
function Ve(e){return X().liveDocWatch.headSinks.get(e)};
function ho(e){return ZLn(e,zu,{includeStopLatched:!0})};
function Lae(e,n){XJt(n?.storageV5),pte(),fst();let r=X().live,i=n?.durable!==!1,l=0,s=new Set;for(let h of Object.values(e.all()))if(ho(h)){let g=h.autoReactSlug!==void 0&&jg(h.autoReactSlug)&&(!mh(h.autoReactSlug)||FD(h.autoReactSlug));if(i){if(py(h.id,e,{quiet:!0,userStop:!0}),h.autoReactSlug!==void 0)oxt(h.autoReactSlug),s.add(h.autoReactSlug)}else if(h.autoReactSlug!==void 0)s.add(h.autoReactSlug);if(!g&&!(h.autoReactSlug!==void 0&&!i&&jg(h.autoReactSlug))){if(l++,!i&&h.autoReactSlug!==void 0)dqe(h.autoReactSlug),PB(r,h.autoReactSlug)}}for(let h of r.supervisors.values()){if(h.autoReactWiring===void 0)continue;if(i)delete h.autoReactWiring;if(i&&zu()&&(!jg(h.slug)||s.has(h.slug)))if(Er(e,h.slug)||r.inFlightSubscribes.has(h.slug))Xi(r,h.slug,e);else te(r,h.slug),kLn(h.slug,h.context.storageV5);if(!s.has(h.slug)&&zu()&&!jg(h.slug))if(s.add(h.slug),l++,i)oxt(h.slug),UQt(h.slug);else dqe(h.slug)}if(i)oQt({storageV5:n?.storageV5});else if(l>0)Uae({flush:!0,storageV5:n?.storageV5});return l};
return {Lae,ho,te,Ve};
}
function module17(imports){
function Fu(e){return e.type==="local_agent"&&"isObserver"in e&&e.isObserver===!0};
function x1(e){if(e.type==="local_agent")return!Fu(e);return e.type==="local_workflow"};
function gg(e){if(e.status!=="running"&&e.status!=="pending")return!1;if("isBackgrounded"in e&&e.isBackgrounded===!1)return!1;return!0};
return {gg,x1,Fu};
}
function module18(imports){
function Oi(e){return e instanceof DOMException&&e.name==="AbortError"?e.message:e};
function iT(e){return Oi(e.reason)==="shutdown"?!0:void 0};
return {iT,Oi};
}
function module19(imports){
const uo=imports["uo"];
const M3t=imports["M3t"];
const L3t=imports["L3t"];
const a=imports["a"];
function He(){if(uo()||M3t()||L3t())return"gateway";return a.CLAUDE_CODE_USE_BEDROCK?"bedrock":a.CLAUDE_CODE_USE_FOUNDRY?"foundry":a.CLAUDE_CODE_USE_ANTHROPIC_AWS?"anthropicAws":a.CLAUDE_CODE_USE_ANTHROPIC_GOOGLE_CLOUD?"anthropicGoogleCloud":a.CLAUDE_CODE_USE_MANTLE?"mantle":a.CLAUDE_CODE_USE_VERTEX?"vertex":"firstParty"};
function Vn(){return He()==="firstParty"};
return {Vn,He};
}
function module20(imports){
const a=imports["a"];
const Vn=imports["Vn"];
const uo=imports["uo"];
const EL=imports["EL"];
function u(){if(a.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST)return!1;return!Vn()};
function l(){return a.CLAUDE_CODE_CUSTOM_OAUTH_URL!==void 0};
function Ch(){return u()||uo()!==null||EL()||l()};
return {Ch,u,l};
}
function module21(imports){
const a=imports["a"];
const Ch=imports["Ch"];
function XWt(e){let n={};if(e.verifiedSlackHumanTurn===!0)n.verifiedSlackHumanTurn=!0;if(e.projectsUserTurn===!0)n.projectsUserTurn=!0;if(e.hearthRelayMessageIds!==void 0)n.hearthRelayMessageIds=e.hearthRelayMessageIds;if(e.hearthRelayRows!==void 0)n.hearthRelayRows=e.hearthRelayRows;if(e.hearthRelayThreadTs!==void 0)n.hearthRelayThreadTs=e.hearthRelayThreadTs;return n};
var Rd="(no content)";
function nz(){return!Ch()};
function IS(){return!a.DISABLE_GROWTHBOOK&&nz()};
return {IS,nz,XWt,Rd};
}
function module22(imports){
const bn=imports["bn"];
const e=lib0["createHash"];
function an(t){return bn(e("sha256").update(t).digest("hex").slice(0,12))};
return {an};
}
function module23(imports){
function Fq(e){if(e?.kind!=="task-notification")return e;return{kind:"task-notification",...e.subkind!==void 0&&{subkind:e.subkind},...e.fireReason!==void 0&&{fireReason:e.fireReason},...e.producer!==void 0&&{producer:e.producer}}};
return {Fq};
}
function module24(imports){
var n=5;
function Pg(){let r=new Map;return{run(e,i){let t=(r.get(e)??Promise.resolve()).then(()=>i()),s=t.then(()=>{},()=>{});return r.set(e,s),s.then(()=>{if(r.get(e)===s)r.delete(e)}),t},has(e){return r.has(e)},get size(){return r.size},async settle(){await Promise.all([...r.values()])},async drain(){for(let e=0;e<n;e++){let i=[...r.values()];if(i.length===0)return;await Promise.all(i)}},clearForTest(){r.clear()}}};
return {Pg,n};
}
function module25(imports){
function B7o(n){if(typeof n==="boolean")return n?"1":"0";return String(n)};
return {B7o};
}
function module26(imports){
const process=imports["process"];
const B7o=imports["B7o"];
function ZZe(t,o){let _=Object.create(o);for(let[r,s]of Object.entries(t)){let n=_,e;Object.defineProperty(_,r,{get:()=>{let C=process.env[r];if(C!==n)e=s.parse(C),n=C;return e},enumerable:!0,configurable:!0})}return Object.defineProperties(_,{set:{value:(r,s)=>{process.env[r]=B7o(s)}},unset:{value:(r)=>{delete process.env[r]}}}),_};
var JU={};
var Dn=ZZe(JU,null);
return {Dn,ZZe,JU};
}
function module27(imports){
var Jw="[Request interrupted by user]";
var fu="[Request interrupted by user for tool use]";
var $Je="[Tool call not completed: an approval request expired with no answer, so the action awaiting approval did not run. Nobody refused it, so this is not the user's decision; ask again if it is still needed.]";
var UJe="[Tool call not completed: an approval request was still unanswered when the message that follows arrived and was closed, so the action awaiting approval did not run. Nobody refused it, so this is not the user's decision; ask again if it is still needed.]";
return {UJe,$Je,fu,Jw};
}
function module28(imports){
const Ge=imports["Ge"];
const a=imports["a"];
const Fq=imports["Fq"];
const i=imports["i"];
const S=imports["S"];
const V=imports["V"];
const U=imports["U"];
const Pg=imports["Pg"];
const Dn=imports["Dn"];
const d=imports["d"];
const Z=imports["Z"];
const Rd=imports["Rd"];
const hg=lib0["randomUUID"];
const fu=imports["fu"];
const Jw=imports["Jw"];
class m8e{lines=new Map;record(e,n){this.lines.set(e,n)}linesFor(e){return this.lines.get(e)}forget(e){this.lines.delete(e)}reset(){this.lines.clear()}};
var dkn=new V(()=>new m8e);
function s_e(){return dkn.of(U().host)};
function CW(e){return s_e().linesFor(e)};
function g8e(){return ckn().value};
function ckn(){let e=Dn.CLAUDE_CODE_AUTO_MODE_CLASSIFIER_OVERLAP;if(e!==void 0)return{value:e,src:"env"};return{value:!1,src:"default"}};
var ukn=4;
var fkn={transcriptStatePublished:()=>{},stageOneDone:()=>{}};
class _8e{serializer=Pg();pending=new Map;lanes=new Map;classifiedCallIds=new Set;enqueue(e,n,r,s){let g=this.pending.get(e)??0;if(g===0&&hkn())this.lanes.set(e,{waiting:[],running:0,unpublished:0,inStageOne:0,pastStageOne:0,warmPrefixes:new Set,commitLine:Promise.resolve()});this.pending.set(e,g+1);let h=this.lanes.get(e),b=Date.now(),w=h===void 0?this.serializer.run(e,()=>(y8e(r,{queueDepth:g,queueWaitMs:Date.now()-b}),n(fkn))):this.runOverlapping(h,n,r,{queueDepth:g,enqueuedAt:b},s);return w.then(()=>{return},()=>{return}).then(()=>{let D=(this.pending.get(e)??1)-1;if(D<=0){if(this.pending.delete(e),this.lanes.get(e)===h)this.lanes.delete(e)}else this.pending.set(e,D)}),w}runOverlapping(e,n,r,s,g){let h=g?.cachePrefix??"",b=new Promise((z,K)=>{e.waiting.push({cachePrefix:h,start:()=>this.startCall(e,h,n,r,s,z,K)})}),w=e.commitLine,D=()=>{},j=new Promise((z)=>{D=z});if(e.commitLine=w.then(()=>j),g?.commitTurn===void 0)b.then(D,D);else g.commitTurn.place(w,D);return this.startReadySoon(e),b}startCall(e,n,r,s,g,h,b){y8e(s,{queueDepth:g.queueDepth,queueWaitMs:Date.now()-g.enqueuedAt,overlap:{inFlightAtStart:e.running,overlapped:e.running>0,releasedByEscalation:e.pastStageOne>0}});let w={lane:e,cachePrefix:n,published:!1,inStageOne:!0,pastStageOne:!1};e.running++,e.unpublished++,e.inStageOne++;let D=new Promise((z)=>z(r({transcriptStatePublished:()=>this.reportPublished(w),stageOneDone:()=>this.reportStageOneDone(w)})));D.then(h,b);let j=()=>this.settle(w);D.then(j,j)}reportPublished(e){this.publish(e),this.startReadySoon(e.lane)}reportStageOneDone(e){this.leaveStageOne(e,!0),this.startReadySoon(e.lane)}settle(e){if(this.leaveStageOne(e,!1),e.pastStageOne)e.lane.pastStageOne--;e.lane.running--,this.startReady(e.lane)}publish(e){if(!e.published)e.published=!0,e.lane.unpublished--}leaveStageOne(e,n){if(this.publish(e),e.inStageOne){if(e.inStageOne=!1,e.lane.inStageOne--,n)e.pastStageOne=!0,e.lane.pastStageOne++,e.lane.warmPrefixes.add(e.cachePrefix)}}startReadySoon(e){Promise.resolve().then(()=>this.startReady(e))}startReady(e){while(this.headMayStart(e))e.waiting.shift()?.start()}headMayStart(e){let n=e.waiting[0];if(n===void 0||e.unpublished>0)return!1;return e.inStageOne===0||e.warmPrefixes.has(n.cachePrefix)&&e.inStageOne<ukn}recordClassifiedCall(e){this.classifiedCallIds.add(e)}isRecordedClassifiedCall(e){return this.classifiedCallIds.has(e)}get size(){return this.serializer.size+this.lanes.size}reset(){this.serializer.clearForTest(),this.pending.clear(),this.lanes.clear(),this.classifiedCallIds.clear()}};
var pkn=new V(()=>new _8e);
function c_e(){return pkn.of(U().host)};
function F3(e){return c_e().isRecordedClassifiedCall(e)};
function hkn(){try{return g8e()}catch(e){return d(Z(e)),!1}};
function y8e(e,n){try{e?.(n)}catch{}};
class O8e{inFlight=new Map;judged=new Map;recordRequest(e,n){this.inFlight.set(e,n)}settleRequest(e,n){let r=this.inFlight.get(e);if(r===void 0)return;this.inFlight.delete(e);let s={request:e,context:r};for(let g of n)this.judged.set(g,s)}forgetRequest(e){this.inFlight.delete(e)}historyFor(e){return this.judged.get(e)}reset(){this.inFlight.clear(),this.judged.clear()}};
var Lkn=new V(()=>new O8e);
function $3(){return Lkn.of(U().host)};
function z8e(e){return $3().historyFor(e)};
function Ku(e){return e.agentId===Ge()};
function u4e(e){return e.origin?.kind==="task-notification"&&(e.origin.source==="goal-checkin"||e.origin.source==="worker-checkin")};
function iDt(e){let n=e.queueOrigin??e.origin;return u4e({origin:n})?Fq(n):n};
function UPr(e){return e.queueMode??ybn(iDt(e))};
function uct(e){return e.queueSkipAttachments===!0||UPr(e)==="task-notification"?!0:void 0};
function ybn(e){return e?.kind==="task-notification"?"task-notification":"prompt"};
var h3o="interrupted_turn";
var y3o=/^[a-z_]{1,64}$/;
function SIo(){let e=a.CLAUDE_CODE_RESUME_REASON;return e!==void 0&&y3o.test(e)?e:h3o};
function Yln(e,n,r,s){i("tengu_resume_interrupted_turn",{surface:e==="print"?S("print"):S("repl_restore"),kind:n.isMeta?S("synthetic_continue"):S("resubmit"),...r!==void 0&&{deferred:r},...s!==void 0&&{pending_action_class:s}})};
var bv="The user doesn't want to proceed with this tool use. The tool use was rejected (eg. if it was a file edit, the new_string was NOT written to the file). STOP what you are doing and wait for the user to tell you how to proceed.";
function Re({content:e,isMeta:n,promptShellHandOff:r,ephemeral:s,turnCompanion:g,usageLimitNote:h,replacesSpan:b,isVisibleInTranscriptOnly:w,isVirtual:D,isCompactSummary:j,modelOnlyText:z,summarizeMetadata:K,toolUseResult:he,hostClassifierContext:_e,toolDenialKind:ke,toolDenialEndsTurn:be,toolDenialUnanswered:ve,userFeedback:Te,toolResultRemedy:xe,mcpMeta:Pe,toolEndsTurn:$e,uuid:Ne,timestamp:We,imagePasteIds:qe,sourceToolAssistantUUID:Qe,permissionMode:Ze,origin:et,promptSource:bt,promptId:ht,interruptedMessageId:kt,interruptedByShutdown:$t,now:It,uuidFn:jt}){let Xt,un,rn,Yt;if(Array.isArray(e)){let nn=e.filter((Pn)=>Pn.type==="tool_result");if(nn.length===1)Xt=CW(nn[0].tool_use_id),un=F3(nn[0].tool_use_id)?!0:void 0,rn=z8e(nn[0].tool_use_id),Yt=_e}return{type:"user",message:{role:"user",content:e||Rd},isMeta:n,promptShellHandOff:r,ephemeral:s,turnCompanion:g,usageLimitNote:h,replacesSpan:b,isVisibleInTranscriptOnly:w,isVirtual:D,isCompactSummary:j,...z!==void 0&&{modelOnlyText:z},summarizeMetadata:K,uuid:Ne||(jt?jt():hg()),timestamp:We??(It?It():new Date().toISOString()),toolUseResult:he,classifierMetaLines:Xt,...un!==void 0&&{classifierBoundary:un},serverClassifierContext:rn,hostClassifierContext:Yt,toolDenialKind:ke,toolDenialEndsTurn:be,toolDenialUnanswered:ve,userFeedback:Te,toolResultRemedy:xe,mcpMeta:Pe,toolEndsTurn:$e,imagePasteIds:qe,sourceToolAssistantUUID:Qe,permissionMode:Ze,origin:et,promptSource:bt,...ht!==void 0&&{promptId:ht},interruptedMessageId:kt,interruptedByShutdown:$t}};
function tk({toolUse:e=!1,interruptedMessageId:n,interruptedByShutdown:r,now:s,uuidFn:g}){return Re({content:[{type:"text",text:e?fu:Jw}],interruptedMessageId:n,interruptedByShutdown:r,now:s,uuidFn:g})};
return {Ku,SIo,y3o,h3o,iDt,u4e,uct,UPr,ybn,Yln,bv,Re,CW,s_e,dkn,m8e,F3,c_e,pkn,_8e,hkn,g8e,ckn,y8e,fkn,ukn,z8e,$3,Lkn,O8e,tk};
}
function module29(imports){
function tb(e){return e.mode==="poll-event"};
return {tb};
}
function module30(imports){
const a=imports["a"];
function jue(){return a.CLAUDE_CODE_REMOTE_TOOLS_FORWARD===!0};
return {jue};
}
function module31(imports){
const jue=imports["jue"];
function Vg(){return jue()};
return {Vg};
}
function module32(imports){
const y=imports["y"];
const t=imports["t"];
const m=imports["m"];
function iqe(e,s,n){if(typeof e!=="string")return!1;if(e===s)return y("bridge_permission_toolname_check"),!1;return t(`Ignoring can_use_tool control_response for request_id=${n}: toolName '${e}' does not match pending '${s}'`,{level:"warn"}),m("bridge_permission_toolname_check","toolname_mismatch"),!0};
return {iqe};
}
function module33(imports){
const Gm=imports["Gm"];
const v=imports["v"];
const R=imports["R"];
const I=imports["I"];
const S3t=imports["S3t"];
const y=imports["y"];
const _Tt=imports["_Tt"];
const Ai=imports["Ai"];
const gl=imports["gl"];
const gg=imports["gg"];
const x1=imports["x1"];
const m=imports["m"];
const d=imports["d"];
const t=imports["t"];
const qe=imports["qe"];
const iT=imports["iT"];
const Gee=imports["Gee"];
const a=imports["a"];
const k=imports["k"];
const IS=imports["IS"];
const ff=imports["ff"];
const _t=imports["_t"];
const c=imports["c"];
const r=imports["r"];
const On=imports["On"];
const KS=imports["KS"];
const e=imports["e"];
const Yt=imports["Yt"];
const an=imports["an"];
const Ku=imports["Ku"];
const tb=imports["tb"];
const Ge=imports["Ge"];
const d_=lib0["randomUUID"];
const SIo=imports["SIo"];
const iDt=imports["iDt"];
const uct=imports["uct"];
const XWt=imports["XWt"];
const Yln=imports["Yln"];
const Vg=imports["Vg"];
const i=imports["i"];
const S=imports["S"];
const bv=imports["bv"];
const UJe=imports["UJe"];
const $Je=imports["$Je"];
const Re=imports["Re"];
const tk=imports["tk"];
const l=imports["l"];
const ne=imports["ne"];
const iqe=imports["iqe"];
const vie=imports["vie"];
const KZe=imports["KZe"];
const $y=imports["$y"];
const Q=imports["Q"];
const dt=imports["dt"];
const yo=imports["yo"];
const si=imports["si"];
const Ze=imports["Ze"];
const Ky=imports["Ky"];
const Lae=imports["Lae"];
const zae=imports["zae"];
const km=imports["km"];
const r6=imports["r6"];
const KQt=imports["KQt"];
function Pc(e){return Object.values(e??{}).some((r)=>r.status==="running"&&gg(r)&&x1(r))};
function Yg(e){return e.status==="running"&&gg(e)&&e.type==="local_bash"&&e.agentId===void 0};
function pd(e){if(!a.CLAUDE_CODE_REMOTE)return"off";if(k(e,!1))return"on";return IS()&&!ff()?"cold":"off"};
function discardSuggestion287(){this.abortController?.abort(),this.abortController=null,this.lastEmitted=null,this.pendingSuggestion=null};
var dT=30000;
var Vy="tengu_ccr_keepalive_after_stop_enabled";
var lT=21600000;
class vm{deps;timer;armedAt=0;framesSent=0;sawFlagOn=!1;unregisterExitCleanup;constructor(e){this.deps=e}arm(){if(this.timer!==void 0)return;try{let e=pd(Vy);if(e==="off"||this.deps.isSessionEnding())return;let r=this.deps.getTurnSignal();if(r!==void 0&&!r.aborted)return;let n=Gy(this.deps.getTasks(),Date.now());if(n==="past_ceiling"&&e==="on")this.logWindow("ceiling_at_stop",0,0);if(n!=="some")return;this.timer=setInterval(uT,dT,this),this.timer.unref?.(),this.armedAt=Date.now(),this.framesSent=0,this.sawFlagOn=e==="on",this.unregisterExitCleanup=_t(async()=>this.end("shutdown"))}catch(e){this.fail(e,"arm_throw")}}disarm(e){try{this.end(e)}catch(r){this.fail(r,"disarm_throw")}}tick(){try{let e=this.deps.getTurnSignal();if(this.deps.isSessionEnding()){this.end("session_ending");return}if(e!==void 0&&!e.aborted){this.end("live_turn");return}let r=pd(Vy);if(r==="off"){this.end("flag_off");return}if(r==="on")this.sawFlagOn=!0;let n=Gy(this.deps.getTasks(),Date.now());if(n!=="some"){this.end(n==="past_ceiling"?"ceiling":"task_ended");return}if(r==="cold")return;this.deps.sendKeepAlive(),this.framesSent++}catch(e){this.fail(e,"tick_throw")}}clear(){if(this.timer===void 0)return!1;return clearInterval(this.timer),this.timer=void 0,this.unregisterExitCleanup?.(),this.unregisterExitCleanup=void 0,!0}end(e){if(!this.clear())return;if(this.sawFlagOn)this.logWindow(e,this.framesSent,Date.now()-this.armedAt)}logWindow(e,r,n){y("ccr_keepalive_after_stop",{retire_reason:c(e),frames_sent:r,armed_ms:n})}fail(e,r){this.clear(),m("ccr_keepalive_after_stop",r),d(e)}};
function uT(e){e.tick()};
function Gy(e,r){let n=!1;for(let s of Object.values(e??{})){if(!Yg(s))continue;if(r-s.startTime<lT)return"some";n=!0}return n?"past_ceiling":"none"};
function hd(e){return e.shouldQuery===!1&&e.queryHeldForNextTurn!==!0||tb(e)||e.pollEmptyDispatch===!0||e.passive===!0};
var mT={interrupt:{content:bv,toolDenialKind:"user-rejected"},denied:{content:bv,toolDenialKind:"user-rejected"},new_input:{content:UJe,toolDenialKind:"cancelled"},timeout:{content:$Je,toolDenialKind:"cancelled"}};
class Cm{deferredParkedPermissionRescue;parkedPermissionRetirement;parkedPermissionFallbackTimer;parkedPermissionHeld=!1;stashedAdoptedParkAnswer;registrationKeepsPendingAction;parkedPermissionWaitStart=Date.now();parkedPermissionFallbackFiredAt;parkSiblings=[];parkOwnAdoptedCall;parkSettledAtBoot=!1;handledOrphanedToolUseIds=new Set;adoptedParkEventFields;parkedPromptEventFields;parkedPermission;turnInterruptionState;supersededToolUseIds;bootRetiredToolUseIds;answeredToolUseIds;initParkReport;pendingActionClass;servedCallsToAdopt;journaledServedCalls;withdrawCard;retirementWriter;clearBeforeRun;answerClearing=!1;answers;lane;io;drain;messageQueue;declinedRedeliveries;store;kick;isShuttingDown;isTerminalShutdown;findUnresolvedToolUse;reportInheritedPromptDecided;reportIdleAtTurnEndAllowed;dropLoaderSyntheticRows;removeInterruptedMessage;adoptedServedCallsCommand;inFlightServedCalls;presentAdoptedHostTools;servedElsewhere;constructor({parkedPermission:e,turnInterruptionState:r,supersededToolUseIds:n,bootRetiredToolUseIds:s,answeredToolUseIds:g,initParkReport:w,pendingActionClass:h,servedCallsToAdopt:M,journaledServedCalls:v,withdrawCard:R,retirementWriter:U,clearBeforeRun:H,answers:I,lane:de,io:z,drain:he,messageQueue:ge,declinedRedeliveries:fe,store:Se,kick:Pe,isShuttingDown:Q,isTerminalShutdown:Te,findUnresolvedToolUse:Ue,reportInheritedPromptDecided:_e,reportIdleAtTurnEndAllowed:Ne,dropLoaderSyntheticRows:et,removeInterruptedMessage:bt,adoptedServedCallsCommand:Xt,inFlightServedCalls:dr,presentAdoptedHostTools:ir,servedElsewhere:qe}){this.parkedPermission=e,this.turnInterruptionState=r,this.supersededToolUseIds=n,this.bootRetiredToolUseIds=s,this.answeredToolUseIds=g,this.initParkReport=w,this.pendingActionClass=h,this.servedCallsToAdopt=M,this.journaledServedCalls=v,this.withdrawCard=R,this.retirementWriter=U,this.clearBeforeRun=H,this.answers=I,this.lane=de,this.io=z,this.drain=he,this.messageQueue=ge,this.declinedRedeliveries=fe,this.store=Se,this.kick=Pe,this.isShuttingDown=Q,this.isTerminalShutdown=Te,this.findUnresolvedToolUse=Ue,this.reportInheritedPromptDecided=_e,this.reportIdleAtTurnEndAllowed=Ne,this.dropLoaderSyntheticRows=et,this.removeInterruptedMessage=bt,this.adoptedServedCallsCommand=Xt,this.inFlightServedCalls=dr,this.presentAdoptedHostTools=ir,this.servedElsewhere=qe,this.registrationKeepsPendingAction=w!==void 0,this.io.sessionState.heldRequiresAction=()=>this.drain.running&&this.drain.runPhase!=="waiting_for_agents"?void 0:this.heldCardToReassert(),this.adoptedParkEventFields=this.parkedPermission?.kind==="adopted"?{derivable:!1}:{},this.parkedPromptEventFields=this.parkedPermission?{parked_tool_use_sha12:an(this.parkedPermission.tool_use_id),parked_request_sha12:an(this.parkedPermission.request_id)}:{}}get retirement(){return this.parkedPermissionRetirement}get handledToolUseIds(){return this.handledOrphanedToolUseIds}holdingParkedPermission(){return this.parkedPermissionHeld&&this.deferredParkedPermissionRescue!==void 0}inheritedPromptPending(){return this.deferredParkedPermissionRescue!==void 0}inheritedPromptHoldCapable(){return this.inheritedPromptPending()&&this.parkedPermission?.details!==void 0&&typeof this.parkedPermission.details.tool_name==="string"}keptInheritedPromptPending(){return this.registrationKeepsPendingAction&&this.inheritedPromptPending()}inheritedPromptOwnsWorkerStatus(){return this.holdingParkedPermission()||this.keptInheritedPromptPending()}userIntentCommandQueued(){return this.messageQueue.getCommandQueue().some((e)=>Ku(e)&&!hd(e))}retirementMayLandDuringReads(){return this.parkedPermissionRetirement!==void 0||this.deferredParkedPermissionRescue!==void 0}rescueOwnsReRun(){return this.deferredParkedPermissionRescue!==void 0||this.parkedPermissionRetirement!==void 0}resumeInterruptedTurn(){if(this.turnInterruptionState&&this.turnInterruptionState.kind!=="none"&&this.lane.resumeInterruptedTurn){let e={mode:"prompt",agentId:Ge(),value:this.turnInterruptionState.message.message.content,uuid:this.turnInterruptionState.message.isMeta?d_():this.turnInterruptionState.message.uuid??d_(),isMeta:this.turnInterruptionState.message.isMeta,...this.turnInterruptionState.interruptedTurnUserMessageUuid!==void 0&&{resumedTurnUserMessageUuid:this.turnInterruptionState.interruptedTurnUserMessageUuid},resumeReason:SIo(),origin:iDt(this.turnInterruptionState.message),skipAttachments:uct(this.turnInterruptionState.message),...this.turnInterruptionState.message.taskDelivery&&{taskDelivery:this.turnInterruptionState.message.taskDelivery},...XWt(this.turnInterruptionState.message)};Yln("print",this.turnInterruptionState.message,!!this.parkedPermission,this.pendingActionClass);let r=Vg()?this.servedCallsToAdopt??[]:[],n=this.inFlightServedCalls();for(let{call:w}of r)n.adopt(w),n.add(w);let s=this.presentAdoptedHostTools(r.map(({call:w})=>w));if(r.length>0||(this.journaledServedCalls??0)>0)this.io.sessionState.notifyInternalMetadataChanged({in_flight_served_calls:n.current()});this.parkSiblings=r.filter(({call:w})=>w.tool_use_id!==this.parkedPermission?.tool_use_id),this.parkOwnAdoptedCall=r.find(({call:w})=>w.tool_use_id===this.parkedPermission?.tool_use_id);let g=this.parkOwnAdoptedCall!==void 0;if(this.parkOwnAdoptedCall!==void 0)n.noteParkedAtRestart(this.parkOwnAdoptedCall.call.tool_use_id);if(this.parkedPermission&&this.parkOwnAdoptedCall!==void 0){if(this.parkSettledAtBoot=!0,this.withdrawCard(this.parkedPermission.request_id),this.registrationKeepsPendingAction)this.io.sessionState.adoptRestoredPendingAction();let w=this.takeParkAdoption();t(`[print.ts] Adopting ${w.length} served call(s) the previous worker had in flight, the parked one (toolUseID=${this.parkedPermission.tool_use_id}) included, instead of holding its prompt`),this.messageQueue.enqueue(this.adoptedServedCallsCommand(w)),this.dropLoaderSyntheticRows(),i("tengu_resume_parked_permission",{outcome:S("served_adopted_at_boot"),served_adopted:w.length,parked_tool_use_sha12:an(this.parkedPermission.tool_use_id),parked_request_sha12:an(this.parkedPermission.request_id)})}else if(this.parkedPermission)t(`[print.ts] Deferring interrupted-turn rescue for parked permission toolUseID=${this.parkedPermission.tool_use_id}${this.parkSiblings.length>0?` (with ${this.parkSiblings.length} adopted served call(s) riding its resolution)`:""}`),this.deferredParkedPermissionRescue=e;else if(this.parkSiblings.length>0)t(`[print.ts] Adopting ${this.parkSiblings.length} served call(s) the previous worker had in flight instead of re-running the interrupted turn: ${this.parkSiblings.map(({call:w})=>w.tool_use_id).join(",")}`),this.messageQueue.enqueue(this.adoptedServedCallsCommand(this.parkSiblings)),this.parkSiblings=[],this.dropLoaderSyntheticRows();else t(`[print.ts] Auto-resuming interrupted turn (kind: ${this.turnInterruptionState.kind})`),this.removeInterruptedMessage(this.turnInterruptionState.message),this.messageQueue.enqueue(e);if((this.journaledServedCalls??0)>0||r.length>0)i("tengu_remote_tool_restart_adoption",{journaled:this.journaledServedCalls??0,adoptable:(this.servedCallsToAdopt??[]).length,adopted:r.length,park_adopted:g,provisional_host_tools:s})}}takeParkSiblings(){let e=this.parkSiblings;return this.parkSiblings=[],e}takeParkAdoption(){let e=this.parkOwnAdoptedCall;this.parkOwnAdoptedCall=void 0;let r=this.takeParkSiblings();return e===void 0?r:[e,...r]}dropParkSiblings(){let e=this.inFlightServedCalls(),r=this.takeParkAdoption();for(let{call:n}of r)e.takeAdopted(n.tool_use_id),e.remove(n.tool_use_id);if(r.length>0)this.io.sessionState.notifyInternalMetadataChanged({in_flight_served_calls:e.current()}),i("tengu_remote_tool_restart_adoption_dropped",{dropped:r.length})}walkBackKeptRegistrationWithoutPark(){if(this.initParkReport&&this.deferredParkedPermissionRescue===void 0&&(this.initParkReport.reported==="requires_action"||this.initParkReport.pendingActionOutstanding))this.io.sessionState.adoptRestoredPendingAction(),this.io.sessionState.notifyStateChanged("idle"),i("tengu_ccr_init_park_report",{reported:S("idle"),reason:this.parkSettledAtBoot?S("park_settled_at_boot"):S("no_park_derived"),init_reported:c(this.initParkReport.reported)})}seedHandledToolUseIds(){if(this.supersededToolUseIds&&this.turnInterruptionState&&this.turnInterruptionState.kind!=="none"&&this.lane.resumeInterruptedTurn)for(let e of this.supersededToolUseIds){if(e===this.parkedPermission?.tool_use_id)continue;this.handledOrphanedToolUseIds.add(e)}if(this.bootRetiredToolUseIds)for(let e of this.bootRetiredToolUseIds){if(e===this.parkedPermission?.tool_use_id)continue;this.handledOrphanedToolUseIds.add(e)}for(let e of this.answeredToolUseIds??[])this.handledOrphanedToolUseIds.add(e);if(this.parkedPermission&&(this.parkedPermission.kind==="adopted"||this.parkSettledAtBoot))this.handledOrphanedToolUseIds.add(this.parkedPermission.tool_use_id)}parkedTurnToolUseIds(e){return e.kind==="adopted"?e.turnToolUseIds:[e.tool_use_id,...[...this.bootRetiredToolUseIds??[]].filter((r)=>r!==e.tool_use_id)]}async retireInTranscript(e,r,n){let{content:s,toolDenialKind:g}=mT[r],w=()=>{switch(r){case"new_input":return!1;case"timeout":return this.drain.running||this.messageQueue.hasUserIntentCommandsInQueue();default:return this.drain.intentBatchInFlight||this.userIntentCommandQueued()}},M=(async()=>{let U="retired_unanswered",H=0;try{let I=[];for(let de of e){let z=(await this.findUnresolvedToolUse(de))?.holder;if(z)I.push({toolUseId:de,assistantMessage:z})}if(w())U="retire_superseded";else if(I.length>0){let de=I.reduce((z,he)=>he.assistantMessage.timestamp>z.assistantMessage.timestamp?he:z).assistantMessage;await this.retirementWriter.append([de,...I.map(({toolUseId:z,assistantMessage:he})=>Re({content:[{type:"tool_result",content:s,is_error:!0,tool_use_id:z}],toolUseResult:s,toolDenialKind:g,sourceToolAssistantUUID:he.uuid})),tk({toolUse:!0})]),H=I.length}}catch(I){U="retire_write_failed",t(`[print.ts] retiring parked permission(s) toolUseIDs=${e.join(",")} in the transcript failed: ${l(I)}`,{level:"warn"})}if(U==="retired_unanswered")try{await this.retirementWriter.flush()}catch{}return{outcome:U,retiredCount:H}})();this.parkedPermissionRetirement=M.then(()=>{return},()=>{return});let{outcome:v,retiredCount:R}=await M.finally(()=>{this.parkedPermissionRetirement=void 0});if(v==="retired_unanswered")await this.declinedRedeliveries.ackAfterRetirement();if(i("tengu_resume_parked_permission",{outcome:c(v),reason:c(r),wait_ms:n,retired_count:R,...this.adoptedParkEventFields,...this.parkedPromptEventFields}),r!=="new_input"&&v!=="retire_superseded"&&!w()&&!this.drain.running&&!this.isShuttingDown()&&!this.isTerminalShutdown()&&!this.drain.running&&!this.io.hasStandingPrompt())this.reportInheritedPromptDecided()}fire(e){if(this.parkedPermissionFallbackTimer)clearTimeout(this.parkedPermissionFallbackTimer),this.parkedPermissionFallbackTimer=void 0;let r=this.deferredParkedPermissionRescue;if(!r||!this.parkedPermission)return;if(this.isTerminalShutdown())return;if(this.parkedPermission.kind==="adopted"&&(e==="denied"||e==="orphan_dropped")&&this.drain.running&&!this.drain.intentBatchInFlight&&this.drain.runPhase!=="waiting_for_agents"){this.stashedAdoptedParkAnswer??=e;return}let n=e==="timeout"&&this.parkedPermission.details!==void 0&&typeof this.parkedPermission.details.tool_name==="string";if(n&&this.io.sessionState.getState()==="requires_action"){this.arm();return}if(n&&this.parkedPermission.details&&!this.drain.intentBatchInFlight&&!this.userIntentCommandQueued()&&!this.drain.endSessionRequested&&!this.isShuttingDown()&&!this.isTerminalShutdown()){this.parkedPermissionHeld=!0,this.io.sessionState.notifyStateChanged("requires_action",this.parkedPermission.details),this.drain.runningReported=!1,t(`[print.ts] No persisted control_response for parked permission toolUseID=${this.parkedPermission.tool_use_id} \u2014 holding it answerable; not re-running, not retiring`),i("tengu_resume_parked_permission",{outcome:S("held"),reason:c(e),wait_ms:Date.now()-this.parkedPermissionWaitStart,...this.adoptedParkEventFields,...this.parkedPromptEventFields});return}let s=this.holdingParkedPermission();if(this.registrationKeepsPendingAction)this.io.sessionState.adoptRestoredPendingAction();if(this.deferredParkedPermissionRescue=void 0,this.handledOrphanedToolUseIds.add(this.parkedPermission.tool_use_id),this.withdrawCard(this.parkedPermission.request_id),i("tengu_resume_stale_prompt_cancel",{kind:S("permission")}),e==="interrupt"||e==="new_input"||e==="rewind"||this.drain.running||(s||this.parkedPermission.kind==="adopted"?this.userIntentCommandQueued():this.messageQueue.hasUserIntentCommandsInQueue())){if(t(`[print.ts] Parked permission toolUseID=${this.parkedPermission.tool_use_id} superseded by new input during ${s?"hold":"wait"} (${e}) \u2014 dropping deferred rescue`),i("tengu_resume_parked_permission",{outcome:c(s?"held_superseded":"superseded"),reason:c(e),wait_ms:Date.now()-this.parkedPermissionWaitStart,...this.adoptedParkEventFields,...this.parkedPromptEventFields}),e==="rewind")this.declinedRedeliveries.closeAfterRewind();let h=e==="interrupt"&&this.lane.parkedStopRetires;if(e==="new_input"&&this.parkedPermission.kind!=="adopted"&&!this.isShuttingDown()&&!this.isTerminalShutdown())this.retireInTranscript(this.parkedTurnToolUseIds(this.parkedPermission),e,Date.now()-this.parkedPermissionWaitStart);else if(!this.drain.running&&!this.isShuttingDown()&&!this.isTerminalShutdown()){if((s||h)&&e==="interrupt")this.retireInTranscript(this.parkedTurnToolUseIds(this.parkedPermission),e,Date.now()-this.parkedPermissionWaitStart);else if((s||this.registrationKeepsPendingAction)&&!this.io.hasStandingPrompt())this.reportInheritedPromptDecided()}this.dropParkSiblings();return}if(e==="timeout")this.parkedPermissionFallbackFiredAt=Date.now();if(e==="timeout"||e==="denied"){t(this.parkedPermission.kind==="adopted"?`[print.ts] Adopted sidechain parked permission toolUseID=${this.parkedPermission.tool_use_id} ${e==="denied"?"denied":"unanswered"} \u2014 retiring the interrupted turn's toolUseIDs=${this.parkedPermission.turnToolUseIds.join(",")} (CLAUDE_CODE_ADOPT_UNDERIVABLE_PARKED_PERMISSION); not re-running it`:`[print.ts] No persisted control_response for parked permission toolUseID=${this.parkedPermission.tool_use_id} \u2014 retiring it unanswered (nothing to hold); not re-running the interrupted turn`),this.retireInTranscript(this.parkedTurnToolUseIds(this.parkedPermission),e,Date.now()-this.parkedPermissionWaitStart),this.dropParkSiblings();return}t(`[print.ts] No consumable persisted control_response for parked permission toolUseID=${this.parkedPermission.tool_use_id} (${e}) \u2014 falling back to cancel + re-ask`);let g=this.takeParkAdoption();if(g.length>0)this.messageQueue.enqueue(this.adoptedServedCallsCommand(g)),this.dropLoaderSyntheticRows();else{if(this.turnInterruptionState&&this.turnInterruptionState.kind!=="none")this.removeInterruptedMessage(this.turnInterruptionState.message);this.messageQueue.enqueue(r)}i("tengu_resume_parked_permission",{outcome:g.length>0?S("fallback_served_adopted"):S("fallback_reask"),reason:c(e),wait_ms:Date.now()-this.parkedPermissionWaitStart,...g.length>0&&{served_adopted:g.length},...this.adoptedParkEventFields,...this.parkedPromptEventFields}),this.kick()}async onUnexpectedResponse(e){if(this.answers.kind==="strict")return this.routeStrictAnswer(e);let r=e.response.subtype==="success"&&typeof e.response.response?.toolUseID==="string"?e.response.response.toolUseID:void 0,n=this.parkedPermission!==void 0&&r===this.parkedPermission.tool_use_id&&e.response.request_id===this.parkedPermission.request_id;if(n&&this.parkedPermissionFallbackTimer)clearTimeout(this.parkedPermissionFallbackTimer),this.parkedPermissionFallbackTimer=void 0;if(n&&this.keptInheritedPromptPending())this.io.sessionState.adoptRestoredPendingAction();if(this.inheritedPromptPending()&&r!==void 0&&r===this.parkedPermission?.tool_use_id&&!n){t(`[print.ts] Dropping control_response for inherited parked permission toolUseID=${r}: request_id does not match the pending prompt`,{level:"warn"}),ne("warn","cli_orphan_answer_dropped",()=>({...this.orphanDropContext(r),is_park_answer:!1,tool_use_id_matches_park:!0,reason:"inherited_request_id_mismatch"}));return}let s=this.parkedPermission?.kind==="adopted"&&!(e.response.subtype==="success"&&e.response.response?.behavior==="allow")?"denied":"orphan_dropped",g=!1;if(n&&this.parkedPermission!==void 0&&this.promptStillOpen(this.parkedPermission)&&this.inheritedPromptOwnsWorkerStatus()&&!this.io.hasStandingPrompt()){if(this.answerClearing){t(`[print.ts] Dropping a copy of the parked permission's answer toolUseID=${r}: its clear is pending`);return}this.answerClearing=!0;try{g=await this.recordClearedBeforeRun(S("clear_unconfirmed"))}finally{this.answerClearing=g}if(!g)return}let w,h;try{w=await l_({message:e,setAppState:this.store.setState,messageQueue:this.messageQueue,handledToolUseIds:this.handledOrphanedToolUseIds,findUnresolved:async(M)=>{let v=await this.findUnresolvedToolUse(M);return h=v?.messageRows,v?.holder??null},...n&&{initFirst:(M,v)=>this.parkSiblings.length>0||this.servedElsewhere(M,v),siblings:()=>this.takeParkSiblings().map(({call:M,assistantMessage:v})=>({toolUseID:M.tool_use_id,assistantMessage:v})),messageRows:()=>h,resumesInterruptedTurn:()=>this.deferredParkedPermissionRescue!==void 0},onEnqueued:()=>{this.kick()},dropContext:(M)=>({...this.orphanDropContext(M),is_park_answer:n,tool_use_id_matches_park:M!==void 0&&M===this.parkedPermission?.tool_use_id})})}catch(M){if(n)t(`[print.ts] orphan handler threw for parked permission toolUseID=${this.parkedPermission?.tool_use_id}: ${M}`,{level:"error"}),this.fire(s);throw M}finally{if(g)this.answerClearing=!1}if(n){if(w&&this.deferredParkedPermissionRescue)this.deferredParkedPermissionRescue=void 0,this.dropLoaderSyntheticRows(),this.withdrawCard(this.parkedPermission.request_id),t(`[print.ts] Parked permission toolUseID=${r} resolved by persisted control_response \u2014 dropping deferred rescue`),i("tengu_resume_parked_permission",{outcome:S("consumed_persisted"),wait_ms:Date.now()-this.parkedPermissionWaitStart,...this.parkedPromptEventFields});else if(!w)if(this.parkedPermissionFallbackFiredAt!==void 0)i("tengu_resume_parked_permission",{outcome:S("late_answer_discarded"),wait_ms:Date.now()-this.parkedPermissionWaitStart,late_ms:Date.now()-this.parkedPermissionFallbackFiredAt,...this.adoptedParkEventFields,...this.parkedPromptEventFields}),this.parkedPermissionFallbackFiredAt=void 0;else this.fire(s)}}async routeStrictAnswer(e){let r=this.parkedPermission,n=e.response;if(n.subtype!=="success")return this.dropStrictAnswer("not_an_answer");let s=n.response;if(r===void 0||s?.toolUseID!==r.tool_use_id||n.request_id!==r.request_id)return this.dropStrictAnswer("not_the_park");if(r.kind==="adopted"||this.parkSiblings.length>0||this.parkOwnAdoptedCall!==void 0)return this.dropStrictAnswer("adoption");if(this.answerClearing)return this.dropStrictAnswer("clear_pending");if(!this.promptStillOpen(r))return this.dropStrictAnswer("decided");if(!vie().safeParse(s).success)return this.dropStrictAnswer("unparseable");let g=await this.findUnresolvedToolUse(r.tool_use_id);if(g===null||!g.inLastAssistantTurn)return this.dropStrictAnswer("not_in_last_turn");let w=g.holder.message.content,h=Array.isArray(w)?w.find((M)=>M.type==="tool_use"&&M.id===r.tool_use_id):void 0;if(h?.type!=="tool_use")return this.dropStrictAnswer("not_in_last_turn");for(let M of[s.toolName,s.tool_name,r.details?.tool_name])if(typeof M==="string"&&M!==h.name)return this.dropStrictAnswer("tool_name_mismatch");if(this.answerClearing)return this.dropStrictAnswer("clear_pending");if(!this.promptStillOpen(r))return this.dropStrictAnswer("decided");if(this.parkedPermissionFallbackTimer)clearTimeout(this.parkedPermissionFallbackTimer),this.parkedPermissionFallbackTimer=void 0;if(this.keptInheritedPromptPending())this.io.sessionState.adoptRestoredPendingAction();this.answerClearing=!0;try{if(!await this.recordClearedBeforeRun(S("strict_clear_unconfirmed")))return this.dropStrictAnswer("clear_unconfirmed");if(!this.promptStillOpen(r))return this.dropStrictAnswer("decided");let M=!1,v=!1;try{M=await l_({message:e,setAppState:this.store.setState,messageQueue:this.messageQueue,handledToolUseIds:this.handledOrphanedToolUseIds,findUnresolved:async()=>g.holder,resumesInterruptedTurn:()=>this.deferredParkedPermissionRescue!==void 0,onEnqueued:()=>{v=!0,this.kick()},dropContext:(R)=>this.orphanDropContext(R)})}catch(R){if(t(`[print.ts] strict parked-permission answer could not be queued: ${l(R)}`,{level:"error"}),M=v,!v&&this.deferredParkedPermissionRescue!==void 0)this.handledOrphanedToolUseIds.delete(r.tool_use_id)}if(!M){if(this.deferredParkedPermissionRescue!==void 0&&!this.parkedPermissionHeld&&this.parkedPermissionFallbackTimer===void 0)this.arm();return this.dropStrictAnswer("not_queued")}this.deferredParkedPermissionRescue=void 0,this.dropLoaderSyntheticRows(),i("tengu_resume_parked_permission",{outcome:S("consumed_persisted"),wait_ms:Date.now()-this.parkedPermissionWaitStart,...this.parkedPromptEventFields})}finally{this.answerClearing=!1}}async recordClearedBeforeRun(e){let r=!1;try{r=await this.clearBeforeRun()===!0}catch(n){t(`[print.ts] the host could not clear a parked permission's record: ${l(n)}`,{level:"error"})}if(r)return!0;if(this.deferredParkedPermissionRescue!==void 0&&!this.parkedPermissionHeld&&this.parkedPermissionFallbackTimer===void 0)this.arm();return i("tengu_resume_parked_permission",{outcome:e,wait_ms:Date.now()-this.parkedPermissionWaitStart,...this.parkedPromptEventFields}),!1}promptStillOpen(e){return this.deferredParkedPermissionRescue!==void 0&&!this.handledOrphanedToolUseIds.has(e.tool_use_id)}dropStrictAnswer(e){t(`[print.ts] Dropping a control_response on the strict parked-permission lane: ${e}`,{level:"warn"}),ne("warn","cli_strict_answer_dropped",{reason:e})}orphanDropContext(e){return{boot_retired:e!==void 0&&this.bootRetiredToolUseIds?.has(e)===!0,interruption_kind:this.turnInterruptionState?.kind??"unknown"}}arm(){if(this.parkedPermission&&this.deferredParkedPermissionRescue)this.parkedPermissionFallbackTimer=setTimeout((e)=>this.fire(e),this.lane.answerWaitMs,"timeout"),this.parkedPermissionFallbackTimer.unref?.()}decideStashedAnswer(){if(this.stashedAdoptedParkAnswer!==void 0){let e=this.stashedAdoptedParkAnswer;this.stashedAdoptedParkAnswer=void 0,this.fire(e)}}decideIdleReport(){let e=this.stashedAdoptedParkAnswer!==void 0&&this.deferredParkedPermissionRescue!==void 0;if(!e&&this.reportIdleAtTurnEndAllowed()&&!this.io.hasStandingPrompt())return"idle";let n=this.heldCardToReassert();if(!e&&n&&this.io.sessionState.getState()!=="requires_action")this.io.sessionState.notifyStateChanged("requires_action",n);else if(!e&&!this.drain.runningReported&&this.registrationKeepsPendingAction&&!this.inheritedPromptOwnsWorkerStatus()&&!this.isTerminalShutdown()&&!this.io.hasStandingPrompt())this.reportInheritedPromptDecided();return"withheld"}heldCardToReassert(){if(!this.holdingParkedPermission()||this.answerClearing||this.isTerminalShutdown())return;return this.parkedPermission?.details}onCommitted(e){let r=e.mode==="orphaned-permission"&&this.parkedPermission!==void 0&&e.orphanedPermission?.permissionResult?.toolUseID===this.parkedPermission.tool_use_id;if(this.stashedAdoptedParkAnswer!==void 0&&this.drain.intentBatchInFlight)this.stashedAdoptedParkAnswer=void 0,this.fire("new_input");if(this.inheritedPromptPending()&&this.drain.intentBatchInFlight&&!r)this.fire("new_input");return!this.inheritedPromptOwnsWorkerStatus()||r}onShutdown(){if(this.parkedPermissionFallbackTimer)clearTimeout(this.parkedPermissionFallbackTimer),this.parkedPermissionFallbackTimer=void 0;if(this.parkedPermission&&this.deferredParkedPermissionRescue&&!this.holdingParkedPermission()&&!this.registrationKeepsPendingAction)this.withdrawCard(this.parkedPermission.request_id).catch(()=>{});this.deferredParkedPermissionRescue=void 0}};
async function l_({message:e,setAppState:r,onEnqueued:n,handledToolUseIds:s,findUnresolved:g,messageQueue:w,siblings:h,messageRows:M,initFirst:v,resumesInterruptedTurn:R,dropContext:U}){let H=(I,de)=>(ne("warn","cli_orphan_answer_dropped",()=>({...U?.(de),reason:I})),!1);if(e.response.subtype==="success"&&e.response.response?.toolUseID&&typeof e.response.response.toolUseID==="string"){let I=e.response.response,{toolUseID:de}=I;if(!de)return H("no_tool_use_id");if(t(`handleOrphanedPermissionResponse: received orphaned control_response for toolUseID=${de} request_id=${e.response.request_id}`),s.has(de))return t(`handleOrphanedPermissionResponse: skipping duplicate orphaned permission for toolUseID=${de} (already handled)`),H("already_handled",de);let z=await g(de);if(!z)return t(`handleOrphanedPermissionResponse: dropping orphaned control_response for toolUseID=${de} \u2014 no unresolved tool_use found`,{level:"warn"}),H("not_unresolved",de);if(s.has(de))return t(`handleOrphanedPermissionResponse: dropping orphaned permission for toolUseID=${de} \u2014 handled while its transcript read was in flight`),H("handled_during_read",de);let he=Array.isArray(z.message.content)?z.message.content.find((Q)=>Q.type==="tool_use"&&Q.id===de):void 0;if(he?.type==="tool_use"&&iqe(e.response.response?.toolName,he.name,e.response.request_id))return H("name_mismatch",de);s.add(de),t(`handleOrphanedPermissionResponse: enqueuing orphaned permission for toolUseID=${de} messageID=${z.message.id}`);let ge=v?.(z,de)===!0,fe=R?.()===!0,Se=h?.(),Pe=M?.();return w.enqueue({mode:"orphaned-permission",agentId:Ge(),value:[],orphanedPermission:{permissionResult:I,assistantMessage:z,...ge&&{initFirst:!0},...fe&&{resumesInterruptedTurn:!0},...Se!==void 0&&Se.length>0&&{siblings:Se},...Pe!==void 0&&Pe.length>0&&{messageRows:Pe}}}),n?.(),ne("info","cli_orphan_answer_enqueued"),!0}return H(e.response.subtype==="success"?"no_tool_use_id":"not_success")};
var Xr=()=>qe.abortController!==void 0&&qe.abortController.signal.aborted&&iT(qe.abortController.signal)===!0;
var Wn;
var Oo=()=>{if(Wn!==void 0)clearInterval(Wn),Wn=void 0};
var Fa=()=>{let b=I.maxBudgetUsd;if(b===void 0||Wn!==void 0)return;Wn=setInterval((D,K,ce,ke,Ie,Ye)=>{try{if(Ai()||Ie()){ce();return}if(gl({maxBudgetUsd:K,abortedForShutdown:!1,turnAborted:!0,getAppState:D,setAppState:ke,storageV5:Ye})){ce();return}if(!Pc(D().tasks))ce()}catch(Oe){ce(),m("per_task_stop_sparing","budget_poll_sweep_throw"),d(Oe),t("[print.ts] spared-budget poll sweep failed; poll disarmed (error in error log when reporting is enabled)",{level:"error"})}},100,v,b,Oo,R,Xr,I.storageV5),Wn.unref?.()};
var Ws=new vm({sendKeepAlive:()=>r.outbound.enqueue({type:"keep_alive"}),getTasks:()=>v().tasks,getTurnSignal:()=>qe.abortController?.signal,isSessionEnding:()=>Ai()||Xr()||qe.endSessionRequested||qe.inputClosed});
var Qs=()=>{let b={taskRegistry:Gm(v,R),setAppState:R,storageV5:I.storageV5};if(S3t())y("per_task_stop_sparing",{spared:!0}),_Tt(b),Fa();else y("per_task_stop_sparing",{spared:!1}),Gee(b);return Ws.arm(),b};
var Gu=(b={})=>{if(On.discard(),b.keepDetachedToolCalls!==!0)KS.of(e).stopRunning();if(b.retireParkedPermission!==!1)Yt.fire(b.parkedPermissionReason??"interrupt")};
var $e=(A,nt)=>{if(KZe(nt)){let Ko=$y({messageQueue:Q,drain:qe,prewaitLatch:dt,frameIntake:yo,io:r,pressed:nt.message_uuid,deliver:()=>si.pressWaiting()});Ze(A,Ko),y("headless_interrupt_send_now",{outcome:c(Ko.send_now)});return}Ky({drain:qe,prewaitLatch:dt});let sr=Qs(),fr=Lae(sr.taskRegistry,{durable:!1}),Us=zae(Q,{leaveArtifactRooms:!0});Gu();let{receipt:Ls,clearSurvivors:Pn}=km({cancelQueued:nt.cancel_queued===!0,messageQueue:Q,drain:qe,prewaitLatch:dt,io:r});if(Ze(A,Ls),fr>0||Us.length>0)r6(fr,Us);KQt(Q,Pn,fr)};
return {Qs,Fa,Wn,Pc,Oo,Xr,Ws,vm,pd,Vy,Gy,Yg,lT,uT,dT,Gu,Cm,hd,mT,l_,$e,discardSuggestion287};
}
export function createPrintInterruptSweepNative287(ports){
const m0=module0({"n":ports["executionContext"]});
const m1=module1({});
const m2=module2({});
const m3=module3({"bn":m2["bn"],"S":m2["S"]});
const m4=module4({"i":ports["analytics"],"c":m2["c"],"tme":m3["tme"]});
const m5=module5({"X":ports["artifactState"]});
const m6=module6({});
const m7=module7({});
const m8=module8({"process":ports["process"],"Le":m7["Le"]});
const m9=module9({"Oz":m8["Oz"],"zK":m8["zK"],"ZZ":m8["ZZ"],"ret":m8["ret"],"aC":m8["aC"],"wT":m8["wT"],"Ru":m8["Ru"]});
const m10=module10({});
const m11=module11({});
const m12=module12({"a":ports["artifactSlot"]});
const m13=module13({"X":ports["artifactState"],"y":m4["y"],"rr":ports["taskSession"],"Aw":ports["removeQueueByFilter"],"v":ports["cancelHandoffs"],"RH":m5["RH"],"I":m6["I"],"Mi":ports["enqueueNotification"],"Ge":ports["mainAgentId"],"qi":m9["qi"],"zt":m10["zt"],"nx":ports["removeKeepalive"],"lwt":m8["lwt"],"sSe":ports["qualifiedPushNotice"],"mk":m11["mk"],"Lqt":m8["Lqt"],"Ii":ports["terminalEvent"],"NUt":m12["NUt"],"qU":m8["qU"]});
const m14=module14({"X":ports["artifactState"],"a":ports["environment"],"k":ports["feature"],"qS":m1["qS"],"owr":m13["owr"]});
const m15=module15({"X":ports["artifactState"]});
const m16=module16({"XJt":m14["XJt"],"pte":m13["pte"],"fst":m13["fst"],"X":ports["artifactState"],"ZLn":m13["ZLn"],"zu":m14["zu"],"jg":m13["jg"],"mh":m13["mh"],"FD":m13["FD"],"py":m13["py"],"oxt":ports["persistStoppedSlug"],"dqe":m13["dqe"],"PB":m13["PB"],"Er":ports["findLiveSupervisor"],"Xi":ports["retireLiveSupervisor"],"LUt":m12["LUt"],"Yrn":m15["Yrn"],"dhn":m12["dhn"],"kLn":ports["clearWatchLaunchFlag"],"UQt":m13["UQt"],"oQt":ports["disarmDurableAutoReact"],"Uae":ports["persistAutoReactLedger"]});
const m17=module17({});
const m18=module18({});
const m19=module19({"uo":m0["uo"],"M3t":m0["M3t"],"L3t":m0["L3t"],"a":ports["environment"]});
const m20=module20({"a":ports["environment"],"Vn":m19["Vn"],"uo":m0["uo"],"EL":m8["EL"]});
const m21=module21({"a":ports["environment"],"Ch":m20["Ch"]});
const m22=module22({"bn":m2["bn"]});
const m23=module23({});
const m24=module24({});
const m25=module25({});
const m26=module26({"process":ports["process"],"B7o":m25["B7o"]});
const m27=module27({});
const m28=module28({"Ge":ports["mainAgentId"],"a":ports["environment"],"Fq":m23["Fq"],"i":ports["analytics"],"S":m2["S"],"V":m0["V"],"U":ports["executionContext"],"Pg":m24["Pg"],"Dn":m26["Dn"],"d":ports["logError"],"Z":m3["Z"],"Rd":m21["Rd"],"fu":m27["fu"],"Jw":m27["Jw"]});
const m29=module29({});
const m30=module30({"a":ports["environment"]});
const m31=module31({"jue":m30["jue"]});
const m32=module32({"y":m4["y"],"t":ports["debug"],"m":m4["m"]});
const m33=module33({"Gm":ports["registry"],"v":ports["getAppState"],"R":ports["setAppState"],"I":ports["options"],"S3t":m0["S3t"],"y":m4["y"],"_Tt":ports["stopForegroundAgents"],"Ai":ports["shuttingDown"],"gl":ports["budgetSweep"],"gg":m17["gg"],"x1":m17["x1"],"m":m4["m"],"d":ports["logError"],"t":ports["debug"],"qe":ports["drain"],"iT":m18["iT"],"Gee":ports["stopBackgroundAgents"],"a":ports["environment"],"k":ports["feature"],"IS":m21["IS"],"ff":ports["remoteInit"],"_t":ports["onExit"],"c":m2["c"],"r":ports["io"],"On":ports["suggestions"],"KS":ports["detachedSlot"],"e":ports["execution"],"Yt":ports["parkedPermissionRetirement"],"an":m22["an"],"Ku":m28["Ku"],"tb":m29["tb"],"Ge":ports["mainAgentId"],"SIo":m28["SIo"],"iDt":m28["iDt"],"uct":m28["uct"],"XWt":m21["XWt"],"Yln":m28["Yln"],"Vg":m31["Vg"],"i":ports["analytics"],"S":m2["S"],"bv":m28["bv"],"UJe":m27["UJe"],"$Je":m27["$Je"],"Re":m28["Re"],"tk":m28["tk"],"l":m3["l"],"ne":ports["diagnostic"],"iqe":m32["iqe"],"vie":ports["permissionResultSchema"],"KZe":ports["isSendNow"],"$y":ports["sendNow"],"Q":ports["messageQueue"],"dt":ports["prewaitLatch"],"yo":ports["frameIntake"],"si":ports["inputDelivery"],"Ze":ports["respond"],"Ky":ports["interruptTurn"],"Lae":m16["Lae"],"zae":m13["zae"],"km":ports["cancelQueue"],"r6":m13["r6"],"KQt":ports["requeueSurvivors"]});
return {"declarePerTaskStopAffordance":m0["LZr"],"pauseAutoReact":m16["Lae"],"discardArtifactActivity":m13["zae"],"emitStopReceipt":m13["r6"],"prepareStop":m33["Qs"],"discardTurn":m33["Gu"],"perTaskStop":m0["S3t"],"ParkedPermission":m33["Cm"],"keepAlive":m33["Ws"],"disposeBudget":m33["Oo"],"normalInterrupt":m33["$e"],"available":m1["qS"],"discardSuggestion":m33["discardSuggestion287"]};
}
