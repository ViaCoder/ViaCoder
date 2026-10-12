// Official npm 2.1.283: entire module declarations unchanged; imports adapted. See NOTICE.
import{Oe}from"./host.js";
import{quotaResumeText287}from"../../state/quotaResumePrompt287.js";
import{K,j,qe,Zd}from"./host.js";
import{c}from"./host.js";
import{d}from"./host.js";
import{i}from"./host.js";
import{_,m,p}from"./host.js";
import{wne,vRe}from"./host.js";
import{o7,qLr,Mh,it,hce,Be,$b,At,pt,Rn,u7,mm}from"./host.js";
import{bee}from"./host.js";
import{Ni}from"./host.js";
import{ga,CJt,ppo,sY,ume,hF,hv,fb,KNn}from"./host.js";
import{wvt,RG,G5t}from"./intent.js";
import{Svt,j5t,qRn,pwe,bvt,Rso,W5t}from"./gates.js";
import{randomUUID as O}from"node:crypto";
var B="later",D="Your claude.ai usage limit has reset. Continue the task you were working on when the limit was reached; do not repeat work that is already complete.",F="Your claude.ai usage is available again before the usage-limit reset. Continue the task you were working on when the limit was reached; do not repeat work that is already complete.",H=2,x=[60000,300000],G=30000,z=90000,V=1800000,X=21600000;
function Y(){return{state:{phase:"idle"},consecutiveRearms:0,armedAtMs:0,lastArmedResetsAtSeconds:0,lastObservedMs:null,takeoverUuids:new Set,queuedBeforeArmUuids:new Set,handoffInProgress:!1,dispatchingTakeoverUuids:new Set,pendingContinuationUuid:null,activeTurnClaim:null,episodeArmOrigin:"dialog",sleptThroughReset:!1,confirmingMainModel:!1,recheckRequestedWhileConfirming:!1,armedResetKeys:new Set,autoArmDedupeResetKeys:new Set,changed:Oe(),events:Oe(),autoContinueKeyPresence:"unscanned",storageV5:void 0,unsubscribeSettingsChanges:null,unknowableRescanDelayMs:2000,unknowableRescanTimer:void 0,revocationRescan:"idle",revocationRescanGeneration:0,limitsSubscriptionStarted:!1,unsubscribeQuotaRejected:null,unsubscribeSessionSwitch:null}}
var J=new K(Y);
function a(){let e=j().host,t=J.of(e),o=G5t.of(e);if(!o.provided)o.provide(()=>r(t));return t}
function S(e,t,o=0){if(typeof e!=="number"&&typeof e!=="string")return t;let n=Number(e);if(!Number.isFinite(n)||n<0)return t;return Math.min(Math.max(Math.round(n),o),X)}
var Z=60000;
function N5t(){return U(a())}
function U(e){return j5t(e.autoContinueKeyPresence)}
function Eso(e){let t=a();if(e==="auto_restore_cancel")return;if(!r(t))return;k(t,"conversation_reset")}
var ee=2;
async function g(e,t=ee){try{e.autoContinueKeyPresence=await vRe("autoContinueAtUsageLimit",e.storageV5)}catch(o){e.autoContinueKeyPresence="unknowable",d(o)}if(e.autoContinueKeyPresence!=="unknowable")e.revocationRescan="idle",e.revocationRescanGeneration++;if(clearTimeout(e.unknowableRescanTimer),e.autoContinueKeyPresence==="unknowable"&&t>0)e.unknowableRescanTimer=setTimeout((o,n)=>{g(o,n)},e.unknowableRescanDelayMs,e,t-1),e.unknowableRescanTimer.unref?.()}
function F5t(){let e=wne("autoContinueAtUsageLimit")[0]?.source;return e===void 0||e==="userSettings"}
function K0e(e){return pt()&&Rn()?.billingType!=="usage_based"&&RG(e)&&Rso()}
function ose(){return a().state}
function vso(){let e=a();return e.state.phase==="armed"&&e.episodeArmOrigin==="auto"}
function E(e){let t=ga();if(t.status==="rejected"&&t.resetsAt!==void 0)e.armedResetKeys.add(t.resetsAt)}
function yvt(e){return a().armedResetKeys.has(e)}
function TG(){return a().state.phase==="armed"}
function r(e){return e.state.phase==="armed"||e.state.phase==="stale"||e.activeTurnClaim!==null||e.dispatchingTakeoverUuids.size>0||hF().some((t)=>A(e,t))||KNn((t)=>A(e,t))}
function te(e){return sY(e)&&ume(e)}
function A(e,t){return t.uuid!==void 0&&(t.uuid===e.pendingContinuationUuid||e.takeoverUuids.has(t.uuid))}
function Udr(){return r(a())}
function dwe(e){return Q(a(),e)}
function Q(e,t){return t==="armed"||t==="stale"||M(e)}
function ret(){return M(a())}
function M(e){let t=e.pendingContinuationUuid;return t!==null&&hF().some((o)=>o.uuid===t)}
function VRn(e){return e!==void 0&&e===a().pendingContinuationUuid}
function oet(e){return a().events.subscribe(e)}
function Bdr(e){return a().changed.subscribe(e)}
function R(e,t){e.state=t,e.changed.emit()}
function oe(){let e=qRn(),t=S(e.jitterMinMs,G),o=Math.max(t,S(e.jitterMaxMs,z));return Math.round(t+Math.random()*(o-t))}
function ne(e,t,o){let n=e*1000+oe();if(t===null)return n;let s=x[t]??x.at(-1)??0;return Math.max(n,o+s)}
function jdr(e,t=Date.now(),o="dialog",n){return P(a(),e,t,o,n)}
function P(e,t,o,n,s){if(!K0e(t))return!1;N(e,s),e.consecutiveRearms=0,e.takeoverUuids.clear(),e.dispatchingTakeoverUuids.clear(),e.queuedBeforeArmUuids.clear();for(let u of hF())if(te(u)||u.mode==="bash"&&ume(u))u.uuid??=O(),e.queuedBeforeArmUuids.add(u.uuid);return e.armedAtMs=o,_("quota_auto_resume"),i("tengu_quota_auto_resume_offer_armed",{origin:c(n)}),q(e,t.resetsAt??0,null,o,n),e.events.emit("armed"),!0}
function Cso(e,t=Date.now(),o){let n=a();if(!K0e(e))return!1;if(n.handoffInProgress)return!1;if(!U(n)||!W5t())return!1;if(mm())return!1;let s=e.resetsAt??0;if(s*1000-t>wvt)return!1;if(fe(e.rateLimitType,it()))return!1;if(r(n)||n.autoArmDedupeResetKeys.has(s))return!1;if(!P(n,e,t,"auto",o))return!1;return n.events.emit("auto-armed"),!0}
function q(e,t,o,n,s="dialog"){y(e),e.episodeArmOrigin=s,e.lastArmedResetsAtSeconds=t,e.autoArmDedupeResetKeys.add(t),e.armedResetKeys.add(t),E(e),e.activeTurnClaim=null,e.sleptThroughReset=!1,e.lastObservedMs=n;let u=ne(t,o,n);i("tengu_quota_auto_resume_armed",{resets_in_sec:Math.max(0,Math.round(t-n/1000)),rearm:o===null?0:o+1}),R(e,{phase:"armed",resetsAtSeconds:t,fireAtMs:u,consecutiveRearms:e.consecutiveRearms})}
function Y0e(){ae(a())}
function o8(e){return(...t)=>{let o=e(...t);if(o!==!1)Y0e();return o}}
async function ae(e){if(e.state.phase!=="armed")return;if(e.confirmingMainModel){e.recheckRequestedWhileConfirming=!0;return}e.confirmingMainModel=!0;try{for(;;){if(e.recheckRequestedWhileConfirming=!1,hce(Mh())!==null)return;let t=it(),o=e.state,n=await ppo(t,void 0,e.storageV5);if(e.state.phase!=="armed"||h(e))return;if(e.recheckRequestedWhileConfirming||it()!==t||e.state!==o)continue;if(n===null||!le(n))return;se(e);return}}catch(t){d(t)}finally{e.confirmingMainModel=!1}}
function se(e){L(e,F),i("tengu_quota_auto_resume_fired",{rearm:e.consecutiveRearms,waited_ms:Math.max(0,Math.round(Date.now()-e.armedAtMs)),early:1}),e.lastObservedMs=null,R(e,{phase:"idle"}),e.events.emit("fired-now")}
function ue(e){switch(e){case"escape":case"ctrl_c":case"kill_agents_chord":return!0;case"dialog":case"low_priority":case"juniper_tide":case"cedar_ember":case"account_switch":case"conversation_reset":case"background_handoff":case"relaunch":case"desktop_handoff":case"cloud_handoff":case"process_exit":return!1}}
function ie(e){switch(e){case"low_priority":case"juniper_tide":case"cedar_ember":case"account_switch":case"conversation_reset":case"background_handoff":case"relaunch":case"desktop_handoff":case"cloud_handoff":case"process_exit":return!0;case"escape":case"ctrl_c":case"kill_agents_chord":case"dialog":return!1}}
function SO(e){k(a(),e)}
function k(e,t){if(r(e))E(e);if(ie(t))e.autoArmDedupeResetKeys.clear();let o=Q(e,e.state.phase);if(C(e)&&e.state.phase==="idle")i("tengu_quota_auto_resume_cancelled",{reason:c(t)});if(b(e,t),o&&ue(t))e.events.emit("cancelled")}
var $5t={background_handoff:"Automatic continue cancelled \xB7 this session moved to the background, so the task will not resume on its own when the usage limit resets",relaunch:"Automatic continue cancelled \xB7 Claude Code relaunched during the wait, so the task will not resume on its own when the usage limit resets (send a prompt then to continue)",desktop_handoff:"Automatic continue cancelled \xB7 this session moved to Claude Desktop, so the task will not resume on its own when the usage limit resets (continue it there)",cloud_handoff:"Automatic continue cancelled \xB7 sending this session to the cloud, so the task will not resume here on its own when the usage limit resets (continue it in the cloud session)",process_exit:"Automatic continue cancelled \xB7 Claude Code exited during the wait, so the task will not resume on its own when the usage limit resets (send a prompt after the reset to continue)"};
function U5t(e){let t=a();if(t.handoffInProgress=!0,!r(t))return!1;let o=Q(t,t.state.phase);return k(t,e),o}
function uwe(){a().handoffInProgress=!1}
function B5t(e,{dispatching:t=!1}={}){let o=a();if(!r(o))return;if(W(o),o.takeoverUuids.add(e),t)o.dispatchingTakeoverUuids.add(e);o.changed.emit()}
function y(e,{keepIfDrained:t=!1}={}){if(e.pendingContinuationUuid===null)return!1;let o=e.pendingContinuationUuid,n=fb((s)=>s.uuid===o).length>0;if(n||!t)e.pendingContinuationUuid=null,e.changed.emit();return n}
function re(e){switch(e){case"escape":case"ctrl_c":case"kill_agents_chord":case"dialog":case"low_priority":case"juniper_tide":case"cedar_ember":case"account_switch":case"setting_off":case"manual_submit":case"conversation_reset":case"killswitch":case"rearm_cap":case"horizon_exceeded":case"continuation_dropped":case"background_handoff":case"relaunch":case"desktop_handoff":case"cloud_handoff":case"process_exit":return!0;case"fired":case"stale":return!1}}
function b(e,t){if(e.state.phase==="idle")return;if(re(t))i("tengu_quota_auto_resume_cancelled",{reason:c(t)});R(e,{phase:"idle"})}
function Wdr(e,t){let o=a();if(o.state.phase!=="armed"||h(o))return"idle";let n=o.lastObservedMs??o.state.fireAtMs;o.lastObservedMs=e;let s=e-n,u=S(qRn().graceMs,V,Z);if(s>u&&e>=o.state.fireAtMs)o.sleptThroughReset=!0;if(t||e<o.state.fireAtMs)return"pending";if(o.sleptThroughReset)return o.sleptThroughReset=!1,p("quota_auto_resume","stale"),i("tengu_quota_auto_resume_stale",{late_by_ms:Math.round(e-o.state.fireAtMs)}),R(o,{phase:"stale"}),o.events.emit("stale"),"stale";return L(o),i("tengu_quota_auto_resume_fired",{rearm:o.state.consecutiveRearms,waited_ms:Math.max(0,Math.round(e-o.armedAtMs))}),b(o,"fired"),"fired"}
function L(e,t=quotaResumeText287.W()){y(e);let o=O();e.pendingContinuationUuid=o,e.activeTurnClaim=null,e.changed.emit(),hv({agentId:qe(),mode:"prompt",priority:B,value:t,uuid:o,origin:{kind:"auto-continuation"},isMeta:!0,skipSlashCommands:!0,workload:u7})}
function Gdr(){return zdr()?quotaResumeText287.W():null}
function zdr(){let e=a();return e.state.phase==="stale"&&!h(e)}
function Aso(e){let t=a(),o=t.pendingContinuationUuid;if(o===null||!e.some((n)=>n.uuid===o))return e;if(!h(t))return e;return e.filter((n)=>n.uuid!==o)}
function de(e){if(e.episodeArmOrigin!=="auto"||U(e))return e.revocationRescan="idle",!1;if(Svt()===void 0&&e.autoContinueKeyPresence==="unknowable"){if(e.revocationRescan==="idle"){e.revocationRescan="pending";let t=++e.revocationRescanGeneration;return g(e).finally(()=>{if(e.revocationRescan==="pending"&&t===e.revocationRescanGeneration)e.revocationRescan="done"}),!1}if(e.revocationRescan==="pending")return!1}return e.revocationRescan="idle",!0}
function h(e){if(!pwe())return v(e,"killswitch"),!0;if(de(e))return v(e,"setting_off"),!0;return!1}
function W(e){if(y(e,{keepIfDrained:!0}),e.state.phase==="stale")i("tengu_quota_auto_resume_stale_resumed",{}),e.lastObservedMs=null,b(e,"stale");else if(e.state.phase==="armed")e.lastObservedMs=null,b(e,"manual_submit")}
function v(e,t){i("tengu_quota_auto_resume_cancelled",{reason:c(t)}),C(e),R(e,{phase:"idle"}),e.events.emit(t==="horizon_exceeded"?"horizon-exceeded":t==="rearm_cap"?"cap-exhausted":"disabled")}
function ce(e,t){return e.episodeArmOrigin==="auto"&&t*1000-Date.now()>wvt}
function kso(e){let t=a();for(let l of e.turnUuids)t.dispatchingTakeoverUuids.delete(l);let o=t.pendingContinuationUuid!==null&&e.turnUuids.includes(t.pendingContinuationUuid),n=e.turnUuids.some((l)=>t.takeoverUuids.has(l)),s=Q(t,t.state.phase)||o,u=e.isHumanTakeover&&!n&&e.humanCommandUuids.length>0&&e.humanCommandUuids.every((l)=>l!==void 0&&t.queuedBeforeArmUuids.has(l)),f=null;if(u&&!o)return null;if(u)f="continuation";else if(e.isHumanTakeover&&(n||s))f="takeover",W(t);else if(o)f="continuation";if(f===null)return null;if(t.activeTurnClaim!==null)d(Error("quota auto-resume: a turn claimed the episode while another claim was outstanding"));let T={kind:f,queried:e.willQuery};return t.activeTurnClaim=T,t.changed.emit(),T}
function Tso(e,t){let o=a();for(let u of t)o.dispatchingTakeoverUuids.delete(u);if(e!==null){if(e!==o.activeTurnClaim)return;if(o.activeTurnClaim=null,o.changed.emit(),o.state.phase!=="idle")return;if(hF().some((u)=>A(o,u)))return;if(C(o),e.kind==="continuation"&&!e.queried)I(o);return}let n=o.pendingContinuationUuid!==null&&t.includes(o.pendingContinuationUuid);if((n||t.some((u)=>o.takeoverUuids.has(u)))&&o.state.phase==="idle"&&o.activeTurnClaim===null&&!hF().some((u)=>A(o,u))){if(C(o),n)I(o)}}
function I(e){m("quota_auto_resume","continuation_dropped"),i("tengu_quota_auto_resume_cancelled",{reason:c("continuation_dropped")}),e.events.emit("continuation-dropped")}
function C(e){e.consecutiveRearms=0,e.lastArmedResetsAtSeconds=0,e.episodeArmOrigin="dialog",e.revocationRescan="idle",e.revocationRescanGeneration++,e.takeoverUuids.clear(),e.dispatchingTakeoverUuids.clear(),e.queuedBeforeArmUuids.clear(),e.lastObservedMs=null,e.activeTurnClaim=null;let t=y(e);return e.changed.emit(),t}
function le(e){return e.status!=="rejected"||e.isUsingOverage===!0||e.overageInUse===!0}
function me(e,t,o){if(!RG(t)||!bvt())return;let n=t.resetsAt??0;if(r(e)&&_vt(t.rateLimitType,it()))e.autoArmDedupeResetKeys.add(n);if(e.state.phase==="armed"){if(n*1000>e.state.fireAtMs&&_vt(t.rateLimitType,it()))w(e,n,null,e.episodeArmOrigin);return}if(M(e))return;if(e.state.phase==="stale")return;let s=e.activeTurnClaim;if(s===null)return;if(o!=="main_thread")return;if(s.kind==="takeover"){e.consecutiveRearms=0,w(e,_vt(t.rateLimitType,it())?n:e.lastArmedResetsAtSeconds,null,"dialog");return}if(e.consecutiveRearms>=H){m("quota_auto_resume","rearm_cap"),e.autoArmDedupeResetKeys.add(n),v(e,"rearm_cap");return}let u=e.consecutiveRearms;e.consecutiveRearms++,w(e,n,u,e.episodeArmOrigin)}
function w(e,t,o,n){if(h(e))return;if(ce(e,t)){v(e,"horizon_exceeded");return}let s=e.episodeArmOrigin==="auto"&&n==="dialog";if(q(e,t,o,Date.now(),n),e.events.emit("rearmed"),s)e.events.emit("taken-over")}
function fe(e,t){if(e!=="seven_day_opus"&&e!=="seven_day_sonnet")return!1;if(_vt(e,t))return!1;let o=hce(Mh());if(e==="seven_day_opus"&&o==="opus")return!1;if(e==="seven_day_sonnet"&&o==="sonnet")return!1;return!0}
function _vt(e,t){switch(e){case"five_hour":case"seven_day":case"overage":return!0;case"seven_day_opus":return o7(Be(t));case"seven_day_sonnet":return qLr(Be(t));case"seven_day_overage_included":{let o=$b(At(t));if(o===null)return!1;let n=o.toLowerCase();return bee().some((s)=>s.toLowerCase()===n)}case void 0:return!1}return!1}
function Vdr(e){N(a(),e)}
function N(e,t){if(e.limitsSubscriptionStarted)return;e.limitsSubscriptionStarted=!0,e.storageV5=t,e.unsubscribeQuotaRejected=CJt((o,n)=>me(e,o,n)),g(e),e.unsubscribeSettingsChanges=Ni.subscribe(()=>{g(e)}),e.unsubscribeSessionSwitch=Zd((o,n)=>{if(e6e(n))k(e,"conversation_reset"),e.handoffInProgress=!1})}
function e6e(e){switch(e){case"clear":case"resume":case"remote_attach":return!0;case"fork":case"cd":case"spare_claim":case"hydrate":case"startup_custom_id":return!1}}
export{N5t,Eso,F5t,K0e,ose,vso,yvt,TG,Udr,dwe,ret,VRn,oet,Bdr,jdr,Cso,Y0e,o8,SO,$5t,U5t,uwe,B5t,Wdr,Gdr,zdr,Aso,kso,Tso,_vt,Vdr,e6e};

// Read-only source accessor for the 287 AppState recheck; retains canonical J/a owner.
export {a as getUsageLimitStateForAppState287};
