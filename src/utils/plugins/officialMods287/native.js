// Complete official 2.1.287 Mods module. Original declarations and namespace initialization unchanged.
import {mkdirSync as or} from "node:fs";
import {join as Vo} from "node:path";
import {mkdir as Ie} from "node:fs/promises";
import {basename as Ao} from "node:path";
import {utimes as ye} from "node:fs/promises";
import {basename as vo} from "node:path";
import {readdirSync as Ke} from "node:fs";
import {join as Be} from "node:path";
import {statSync as Ue} from "node:fs";
export function createMods287(ports){
const {q,Ge,Ut,S,c,l,Ht,ee,yr,Von,ksn,YO,sTo,iTo,ixr,pce,HWn,jPr,WPr,aDt,Mxo,L6n,N6n,F6n,Pan,tOr,nOr,Mi,xi,qH,_t,t,_Y,y,m,p,Qs,ge,Lcn,ade,Ncn,Xye,Jye,Gr,coe,Wb,I9,O9,ab,cM,wH,xP,lpt,JPt,Yqe,k$,YJ,io}=ports;
var T=(o)=>Vo(lpt(),o);
var so=[{refusal:"diskless",isRefused:Ut},{refusal:"hooks_modules_off",isRefused:()=>!YJ()},{refusal:"all_hooks_disabled",isRefused:Wb},{refusal:"sideload_disabled",isRefused:O9},{refusal:"local_dirs_blocked",isRefused:()=>!I9()},{refusal:"managed_hooks_only",isRefused:()=>ge("policySettings")?.allowManagedHooksOnly===!0},{refusal:"hooks_disabled_in_settings",isRefused:coe},{refusal:"safe_mode",isRefused:yr},{refusal:"bare_mode",isRefused:()=>Gr("hooks")},{refusal:"untrusted",isRefused:()=>!qH()}];
function g(){return so.find((o)=>o.isRefused())?.refusal};
function b(){let o=g();if(o!==void 0)p("plugin_dev_mods",o),t(`dev mods: mod hot-reloading is off here (${o})`);return o};
var no=2000;
var ao={explain:"explain",allow:"enable",not_now:"decline"};
function fo(o){switch(o.kind){case"chose":return ao[o.value];case"declined":return"decline";case"aborted":return"withdrawn";case"unanswered":return o.reason==="no_one_to_ask"?"no_one_to_ask":"retry"}};
var F=(o)=>o==="now"?"now":"when this turn ends";
var G="this session's folder";
function X(o){let e=cM(o);if(e===null)return`${G} (${Qs(o)})`;return`[${G}](${e.replaceAll("(","%28").replaceAll(")","%29")})`};
var mo=(o,e)=>`Mods in ${X(o)} load ${F(e)} and reload when their files change. They run with your permissions.`;
var te=[{value:"explain",label:"How does this work?"},{value:"allow",label:"Enable for this session"},{value:"not_now",label:"Not now"}];
var po=(o,e)=>[`Mods live in ${X(o)}.`,"A mod is code Claude wrote; it runs with your permissions.",`Enable: they load ${F(e)} and reload when their files change.`,"Enable holds for this session, also after a restart.","Not now: they stay unloaded until this session next starts.","/plugin lists what loaded and turns it off."].join(`
`);
var ne="Mods";
var H="Enable hot reloading for this session?";
var de=(o,e)=>`${H}

${mo(o,e)}`;
var ae="mod_hot_reload";
var fe=(o,e)=>`${H}

${po(o,e)}`;
var co=3;
async function J(o,e){let r=Pan.isRunning()?"turn-end":"now",n=e===0?de(o.folder,r):fe(o.folder,r),d=fo(await Yqe({canUseTool:o.binding.canUseTool,toolUseContext:o.binding.toolContext(o.abortController),source:ae,header:ne,question:n,choices:te,personOnly:!0}));if(d!=="explain")return d;return y("plugin_dev_mods",{answer:S("explain")}),e<co?J(o,e+1):"decline"};
async function go(o,e){let r=xP();if(r===void 0)return p("plugin_dev_mods","no_session"),"no_one_to_ask";let s=new AbortController;e?.addEventListener("abort",()=>s.abort(),{once:!0});try{let n=await J({binding:r,folder:o,abortController:s},0);return n==="no_one_to_ask"?p("plugin_dev_mods","no_one_to_ask"):y("plugin_dev_mods",{answer:c(n)}),n}catch(n){return t(`dev mods: the ask failed, asked again later: ${l(n)}`,{level:"error"}),"retry"}};
function W(){let o=xP();if(o===void 0)return!0;try{return JPt(o.toolContext(new AbortController))}catch(e){return t(`dev mods: no context to ask in yet: ${l(e)}`,{level:"error"}),!0}};
function ho(o,e){let r=new Set,s=new Set(e.loaded),n=!1,d=!1,i=!1,f,a=0,L=Number.NEGATIVE_INFINITY,k=!1,E=!1,V=!1,v=!1,O,Wo=e.watchRoot(o,()=>{n=!0,eo()}),No=e.turn.onBegin(()=>{if(a+=1,!(f!==void 0&&!f.signal.aborted&&e.turn.isPersonTurn()))return;if(f?.abort(),!E)E=!0,e.unanswered()}),Io=e.turn.onEnd(()=>void Y($o));function oo(){O?.(),O=void 0}function eo(){if(v||d)return;if(oo(),e.turn.isRunning()){Y(Q);return}O=e.clock.setTimeout(()=>void Y(Q),e.quietMs)}async function Y(u){try{await u()}catch(C){t(`dev mods: the watch on ${o} failed: ${l(C)}`,{level:"error"})}}async function $o(){if(i){i=!1;for(let u of await e.listChildren(o)??[])r.add(u)}if(d){await ro();return}if(k)k=!1,await Q()}async function ro(){if(v)return;if(e.refusal()){await R(),e.stopped("refused");return}await Promise.all([R(),e.enable(o)]),e.stopped("enabled")}async function Q(){O=void 0;let u=e.turn.isRunning()&&n&&L===Number.NEGATIVE_INFINITY,C=v||d,Uo=e.turn.isRunning()&&!u;if(C||V||Uo||L===a){k=!C;return}V=!0;try{let z=u?[]:(await e.listChildren(o)??[]).filter((P)=>!r.has(P)),jo=u||z.length>0&&(n||z.some((P)=>!s.has(P)));if(v||!jo)return;if(e.turn.isRunning()&&!u){k=!0;return}if(e.refusal()){await R(),e.stopped("refused");return}L=a;let to=new AbortController;f=to;let Ko=await e.ask(o,to.signal).finally(()=>{f=void 0});if(v)return;switch(Ko){case"enable":if(e.turn.isRunning()&&!e.refusal()){d=!0,e.deferred();return}await ro();return;case"decline":{E=!1,i=e.turn.isRunning();let P=await e.listChildren(o);for(let Bo of[...z,...P??[]])r.add(Bo);return}case"withdrawn":if(e.withdrawn(),!E)E=!0,e.unanswered();k=!0;return;case"retry":k=!0;return;case"no_one_to_ask":await R(),e.stopped("no_one_to_ask");return}}finally{V=!1}}async function R(){if(v)return;v=!0,k=!1,oo(),f?.abort(),No(),Io(),await Wo.close()}return eo(),{declined:()=>[...r],isClosed:()=>v,dispose:R}};
var xo="Mod hot-reloading is on; this session's mods load when this turn ends.";
function yo(o,e){let r=YO.get();if(r?.stage!=="watching"||r.folder!==o)return;switch(e){case"refused":YO.set({stage:"wanted",folder:o,...r.loaded!==void 0&&{loaded:r.loaded}});return;case"no_one_to_ask":YO.set({stage:"off",folder:o});return;case"enabled":return}};
async function w(o){let e=new Date;await ye(o,e,e).catch((r)=>t(`dev mods: ${o} keeps its old time: ${l(r)}`))};
function N(){if(iTo.get()!==void 0)return;iTo.set(Pan.onEnd(()=>{try{for(let o of[...ade.get()??[],...Ncn.get()??[]])w(o)}catch(o){t(`dev mods: the turn-end refresh failed: ${l(o)}`,{level:"error"})}}))};
function I(o,e,r){let s=r==="enable_failed"?"enabling":"loading";return Jye(vo(o),HWn(vo(o),e)),m("plugin_dev_mods",r),t(`dev mods: ${s} ${o} failed: ${l(e)}`,{level:"error"}),"failed"};
function wo(o,e,r){return{root:o,before:new Map,after:r.after,present:r.present,outcome:e}};
function Do(o,e){let r=o==="new";switch(e){case"reloaded":return r?"loaded from this session's mods folder":"unloaded (gone from this session's mods folder)";case"not-loaded":return"in this session's mods folder, not loaded; /plugin shows why";case"held":return"in this session's mods folder, on hold: /reload-plugins applies it";case"unbound":return"in this session's mods folder; restart to apply"}};
async function _o(o,e,r){let s=await N6n(o)??[],d=e==="reloaded"?await xi(r.storageV5,r.credentials):{enabled:[],disabled:[]},[i]=Mxo([...d.enabled,...d.disabled],[o]),f=i?.loaded??new Map;for(let a of jPr(wo(o,e,{present:s,after:f}),Do))Xye(a.plugin,a.text)};
async function U(o,e){let r=xP()?.toolContext(new AbortController);await _o(o,e,{storageV5:r?.storageV5,credentials:r?.credentials}).catch((s)=>t(`dev mods: the lines for ${o} were not told: ${l(s)}`,{level:"error"}))};
async function j(o){try{YO.set({stage:"enabled",folder:o}),pce.get()?.joinPluginDir(o),ade.set(k$(ade.get()??[],[o])),N(),await w(o),await ee(0);let e=xP()?.toolContext(new AbortController);tOr(o,e?.storageV5);let r=await F6n();return await U(o,r),y("plugin_dev_mods",{enabled:!0}),r}catch(e){return I(o,e,"enable_failed")}};
function Mo(o,e){switch(e){case"reloaded":return`The person enabled mod hot-reloading for this session and the mods under ${o} loaded: they load and reload by themselves as their files change; the transcript names any mod that failed.`;case"held":return`The person enabled mod hot-reloading for this session, but the mods under ${o} wait for /reload-plugins (the load would rewrite the prompt cache): they are NOT loaded yet.`;case"unbound":return`The person enabled mod hot-reloading for this session, but the mods under ${o} did not load (this session cannot reload its plugins; only a restart loads them).`;case"failed":return`The person enabled mod hot-reloading for this session, but the mods under ${o} did not load (the load failed; the transcript says why, and /reload-plugins tries again).`}};
function ko(o,e){switch(e.kind){case"enabled":return Mo(o,e.load);case"declined":return`The person declined mod hot-reloading: what this run wrote under ${o} is written but NOT loaded (a mod that loaded when the session started keeps running as it loaded). Do not say the change is running. It loads the next time this session starts (/reload-plugins reloads only a mod that loaded at the start); the person can ask again.`;case"unanswered":return`The person has not answered the mod hot-reloading question yet; it is asked again once a turn ends. What this run wrote under ${o} is written but NOT loaded yet. Do not say it was declined, and do not suggest --plugin-dir or a restart.`;case"off":return`Mod hot-reloading is off in this session (${e.reason}): mods under ${o} are not loaded.`}};
var D=(o,e)=>Mi({agentId:Ge(),value:ko(o,e),mode:"task-notification",skipAttachments:!0,passive:!0,priority:"next"});
var K="nobody could be asked";
function B(o){if(ixr.get()===o)return;ixr.set(o),D(o,{kind:"off",reason:K})};
var To={hooks_modules_off:"hooks modules are switched off in this process",all_hooks_disabled:"the organization disables all hooks",sideload_disabled:"the organization forbids side-loaded plugins",local_dirs_blocked:"the organization blocks plugins from local folders",managed_hooks_only:"the organization allows only managed hooks",hooks_disabled_in_settings:"hooks are turned off in your settings (disableAllHooks)",safe_mode:"the session runs in safe mode",diskless:"this kind of cloud session has no disk to load mods from",bare_mode:"the session runs in bare mode",untrusted:"the workspace is not trusted"};
function bo(o,e){switch(o){case"enabled":return;case"refused":if(e===void 0)return;return{kind:"off",reason:To[e]};case"no_one_to_ask":return{kind:"off",reason:K}}};
function So(o,e){let r=bo(e,g());if(e==="no_one_to_ask")B(o);else if(r!==void 0)D(o,r)};
var Eo={kind:"unanswered"};
function Ro(o,e){let r=ab.watch(o,{persistent:!0,ignoreInitial:!0,followSymlinks:!1,ignorePermissionErrors:!0,ignored:WPr(o,_Y(),()=>!1),usePolling:!0,interval:aDt,binaryInterval:aDt}),s=()=>e();return r.on("add",s),r.on("addDir",s),r.on("change",s),r.on("unlink",s),r.on("unlinkDir",s),r.on("error",(n)=>t(`dev mods: the watch on ${o}: ${l(n)}`,{level:"warn"})),{close:()=>r.close()}};
var Po="Mod hot-reloading was not answered; it will be asked again once a turn ends.";
async function _(){try{let o=YO.get();if(o?.stage!=="wanted")return;if(g()!==void 0)return;if(!W()){if(p("plugin_dev_mods","no_one_to_ask"),YO.set({stage:"off",folder:o.folder}),o.loaded===void 0)B(o.folder);return}await Ie(o.folder,{recursive:!0});let e=YO.get();if(e?.stage!=="wanted")return;let{folder:r,loaded:s}=e,n={},d=ho(r,{watchRoot:Ro,loaded:s??[],listChildren:N6n,refusal:b,ask:async(i,f)=>{let a=await go(i,f);if(a!=="no_one_to_ask"&&a!=="retry")ixr.set(void 0);if(a==="decline")D(i,{kind:"declined"});return a},enable:async(i)=>D(i,{kind:"enabled",load:await j(i)}),deferred:()=>Xye(Ao(r),xo),withdrawn:()=>Xye(Ao(r),Po),unanswered:()=>D(r,Eo),stopped:(i)=>{n.release?.(),yo(r,i),So(r,i)},clock:L6n,turn:Pan,quietMs:no});YO.set({stage:"watching",folder:r,watch:d,...s!==void 0&&{loaded:s}}),n.release=_t(()=>d.dispose())}catch(o){t(`dev mods: the watch did not start: ${l(o)}`,{level:"error"})}};
function Lo(o){try{return Ue(o,{throwIfNoEntry:!1})?.isFile()===!0}catch(e){if(Ht(e))return!1;throw e}};
function Oo(o){try{return Ke(o,{withFileTypes:!0}).filter((e)=>(e.isDirectory()||e.isSymbolicLink())&&Von(e.name)).map((e)=>e.name).filter((e)=>Lo(Be(o,e,wH))).toSorted()}catch(e){if(Ht(e))return;throw e}};
async function Co(o){try{let e=Oo(o);if(e===void 0||e.length===0){let r=e!==void 0&&W();YO.set(r?{stage:"wanted",folder:o,loaded:e}:void 0),await _();return}YO.set({stage:"wanted",folder:o,loaded:e}),Ncn.set(k$(Ncn.get()??[],[o])),pce.get()?.joinPluginDir(o),N(),await w(o),await ee(0),await U(o,await F6n()),y("plugin_dev_mods",{loaded_at_start:!0}),await _()}catch(e){let r=YO.get();if((r?.stage==="wanted"||r?.stage==="present")&&r.folder===o)YO.set({stage:"wanted",folder:o}),_();I(o,e,"load_failed")}};
function M(){try{let o=YO.get();switch(o?.stage){case"consented":if(g()===void 0)j(o.folder);return;case"present":if(g()===void 0)Co(o.folder);return;case"wanted":_();return;case"enabled":w(o.folder);return;case void 0:case"watching":case"off":return}}catch(o){t(`dev mods: the catch-up failed: ${l(o)}`,{level:"error"})}};
async function Fo(){let o=YO.get(),e=T(q());try{if(o?.stage==="watching"&&o.folder!==e)await o.watch.dispose();let r=YO.get(),s=r!==void 0&&r.folder!==e,n=r===void 0||r.stage==="off"||r.stage==="watching"&&r.watch.isClosed();if(s||n)YO.set({stage:"wanted",folder:e});if(Lcn.set(M),b()===void 0)await _()}catch(r){t(`dev mods: handing out ${e} started nothing: ${l(r)}`,{level:"error"})}return e};
var A={};
io(A,{DEV_MODS_PLACEHOLDER:()=>ze,default:()=>A});;
var ze="${CLAUDE_DEV_MODS_DIR}";
async function Rcr(o,e){let{DEV_MODS_PLACEHOLDER:r}=A;if(!o.includes(r))return o;let s=e.isPreload?T(q()):await Fo();return o.replaceAll(r,s)};
function Ho(){let o=T(q()),e=YO.get();if(e!==void 0&&e.folder===o&&e.stage!=="off")return;if(e?.stage==="watching")e.watch.dispose().catch((s)=>t(`dev mods: the watch did not close: ${l(s)}`));YO.set({stage:"present",folder:o}),Lcn.set(M),M()};
function Qxn(){sTo.set(Rcr);try{let o=nOr(),e=YO.get();if(!(o!==void 0&&ksn(o,q())&&!(e?.stage==="enabled"&&e.folder===o))){Ho();return}if(e?.stage==="watching")e.watch.dispose().catch((s)=>t(`dev mods: the watch did not close: ${l(s)}`));if(YO.set({stage:"consented",folder:o}),Lcn.set(M),b()===void 0)or(o,{recursive:!0}),M()}catch(o){t(`dev mods: the restore failed: ${l(o)}`,{level:"error"})}};
return {initialize:Qxn,expand:Rcr,watch:ho};
}
