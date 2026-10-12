// Generated from official npm 2.1.283; declarations preserved verbatim.
// (c) Anthropic PBC. Source terms/provenance retained in provenance.json.
export function createOfficialTitleWriter(ports, options) {
const {errorMessage:l, diagnostic:p, debug:t, read:v3e, write:YAr}=ports;
function u3t(i){let n={entries:new Map,burst:i?.burst??3,refillMs:i?.refillMs??1e4,retryMs:i?.retryMs??60000,isOwnTitle:i?.isOwnTitle??(()=>!1),onRemoteTitleAdopted:i?.onRemoteTitleAdopted??(()=>{})};return{update:(e,r,s)=>h(n,e,r,s),noteRemoteTitle:(e,r)=>S(n,e,r),forget:(e)=>R(n,e),hasSent:(e,r)=>n.entries.get(e)?.sentTitles.has(r)??!1,isKnownTitle:(e,r)=>n.entries.get(e)?.knownTitles.has(r)??!1}}
function c(i,n){let e=i.entries.get(n);if(!e)e={lastSentTitle:void 0,lastSentOk:!1,sentTitles:new Set,knownTitles:new Set,tokens:i.burst,refilledAt:Date.now(),pending:void 0,inFlight:!1,timer:void 0,retryTimer:void 0,sendingRetry:!1,suppressed:0},i.entries.set(n,e);return e}
function h(i,n,e,r){let s=c(i,n);if(y(s,e,r))return T(s),Promise.resolve();return new Promise((d)=>{let u=[d];if(a(s),s.pending||s.inFlight){if(s.suppressed===0)p("bridge_session_patch","title_write_coalesced");s.suppressed+=1}f(s.pending?.waiters),s.pending={title:e,opts:r,waiters:u},s.sendingRetry=!1,g(i,n)})}
function k(i,n,e){let r=Math.floor((e-n.refilledAt)/i.refillMs);if(r>0)n.tokens=Math.min(i.burst,n.tokens+r),n.refilledAt+=r*i.refillMs;if(n.tokens===i.burst)n.refilledAt=e}
function g(i,n){let e=i.entries.get(n);if(!e||e.inFlight||!e.pending)return;let r=Date.now();if(k(i,e,r),e.tokens<=0&&!e.pending.opts?.userInitiated){if(!e.timer){let o=Math.max(0,e.refilledAt+i.refillMs-r);e.timer=setTimeout(W,o,i,n),e.timer.unref?.()}return}let{title:s,opts:d,waiters:u}=e.pending;if(e.pending=void 0,y(e,s,d)||d?.shouldSend!==void 0&&!d.shouldSend()){a(e),e.sendingRetry=!1,e.suppressed=0,f(u);return}e.tokens=Math.max(0,e.tokens-1),e.inFlight=!0,e.lastSentTitle=s,e.lastSentOk=!1,e.sentTitles.add(s),e.knownTitles.add(s),a(e);let b=e.sendingRetry;if(e.sendingRetry=!1,e.suppressed>0)t(`[bridge] title write: sending latest after coalescing ${e.suppressed} update(s)`),e.suppressed=0;YAr(n,s,d).then((o)=>{if(o==="landed")e.lastSentTitle=s,e.lastSentOk=!0;else if(e.lastSentTitle===s)e.lastSentOk=!1;if(i.entries.get(n)!==e)return;if(o==="failed"&&!b&&!e.retryTimer&&!e.pending)e.retryTimer=setTimeout(v,i.retryMs,i,n,s,d),e.retryTimer.unref?.()},(o)=>{t(`[bridge] title write failed: ${l(o)}`)}).finally(()=>{e.inFlight=!1,f(u),g(i,n)})}
function W(i,n){let e=i.entries.get(n);if(e)e.timer=void 0,g(i,n)}
function v(i,n,e,r){let s=i.entries.get(n);if(!s)return;if(s.retryTimer=void 0,!m(i,s,n,e))return;if(r?.shouldSend!==void 0&&!r.shouldSend()){t("[bridge] title write retry dropped: sending is now barred");return}v3e(n,{baseUrl:r?.baseUrl,getAccessToken:r?.getAccessToken,credentials:r?.credentials}).then((d)=>{if(!m(i,s,n,e))return;if(d===null){t("[bridge] title write retry skipped: server state unreadable");return}if(d.title&&!s.knownTitles.has(d.title)&&!i.isOwnTitle(n,d.title)){t("[bridge] title write retry dropped: the session was renamed elsewhere"),S(i,n,d.title),i.onRemoteTitleAdopted(n,d.title);return}s.pending={title:e,opts:r,waiters:[]},s.sendingRetry=!0,g(i,n)},(d)=>{t(`[bridge] title write retry skipped: ${l(d)}`)})}
function m(i,n,e,r){return i.entries.get(e)===n&&n.lastSentTitle===r&&!n.lastSentOk&&!n.inFlight&&!n.pending&&!n.retryTimer}
function S(i,n,e){let r=c(i,n);r.lastSentTitle=e,r.lastSentOk=!0,r.knownTitles.add(e),a(r),T(r)}
function R(i,n){let e=i.entries.get(n);if(!e)return;if(e.timer)clearTimeout(e.timer);a(e),T(e),i.entries.delete(n)}
function T(i){f(i.pending?.waiters),i.pending=void 0,i.sendingRetry=!1,i.suppressed=0}
function a(i){if(i.retryTimer)clearTimeout(i.retryTimer),i.retryTimer=void 0}
function f(i){for(let n of i??[])n()}
function y(i,n,e){if(i.lastSentTitle!==n)return!1;if(i.inFlight||i.retryTimer!==void 0)return!0;return i.lastSentOk&&!e?.userInitiated}
return u3t(options);
}
export function createOfficialTitleTransport(ports) {
const {http:gt, errorMessage:l, debug:t, errorDetail:sp, toCompatSessionId:Wc, toInfraSessionId:ci, userAgent:Ua, clientPlatform:jg}=ports;
var a=/^[a-zA-Z0-9_-]+$/;
function af(e,n){if(!M$(e))throw Error(`Invalid ${n}: contains unsafe characters`);return e}
function M$(e){return e!==""&&a.test(e)}
var U="2023-06-01";
function Qct(e){return{Authorization:`Bearer ${e}`,"Content-Type":"application/json","anthropic-version":U,"anthropic-client-platform":jg(),"User-Agent":Ua()}}
function v(e,r){try{return af(e,"sessionId"),!0}catch(i){return t(`[code-session] ${r}: ${l(i)}`),!1}}
function b(e,r,i,o,u,f=""){let _=u.trustedDeviceToken?{"X-Trusted-Device-Token":u.trustedDeviceToken}:void 0;if(u.useV2){let a=ci(o);return{url:`${r}/v1/code/sessions/${a}${f}`,headers:{...Qct(i),..._},id:a}}if(!u.orgUUID)return t(`[code-session] ${e} ${o}: v1 compat path needs an org UUID`),null;let p=Wc(o);return{url:`${r}/v1/sessions/${p}${f}`,headers:{...Qct(i),"anthropic-beta":"ccr-byoc-2025-07-29","x-organization-uuid":u.orgUUID,..._},id:p}}
async function YKo(e,r,i,o,u){if(!v(i,"Get"))return"invalid";let f=b("Get",e,r,i,u);if(!f)return"invalid";let{url:_,headers:p,id:a}=f;try{let n=await gt.get(_,{headers:p,timeout:o,validateStatus:(s)=>s<500});if(n.status!==200){let s=sp(n.data);return t(`[code-session] Get ${a} failed ${n.status}${s?`: ${s}`:""}`),n.status}if(!u.useV2){let s=n.data;return{...s,status:s?.status??s?.session_status,id:typeof s?.id==="string"?s.id:a}}let g=n.data,c=g?.response_shape??g?.session;if(c&&typeof c.id==="string")return{...c,updated_at:"last_event_at"in c&&typeof c.last_event_at==="string"?c.last_event_at:void 0};return t(`[code-session] Get ${a}: no session.id in 200 response`),n.status}catch(n){return t(`[code-session] Get ${a} failed: ${l(n)}`),gt.isAxiosError(n)&&n.code==="ECONNABORTED"?"timeout":"error"}}
async function XKo(e,r,i,o,u,f){if(!v(i,"Update"))return"invalid";let _=b("Update",e,r,i,f);if(!_)return"invalid";let{url:p,headers:a,id:n}=_,g={headers:a,timeout:u,validateStatus:()=>!0};try{let c=f.useV2?await gt.put(p,o,g):await gt.patch(p,o,g);if(c.status!==200){let s=sp(c.data);t(`[code-session] Update ${n} failed ${c.status}${s?`: ${s}`:""}`)}return c.status}catch(c){return t(`[code-session] Update ${n} failed: ${l(c)}`),gt.isAxiosError(c)&&c.code==="ECONNABORTED"?"timeout":"error"}}
return {get:YKo, update:XKo};
}
