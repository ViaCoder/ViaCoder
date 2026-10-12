// Pinned original Hook PA / V0o engine. No function body rewriting.
export function createHookEngineEndHint287(ports){
const {Emn,V2r,Vh,k,uA,uYn,yk}=ports;
var a=[["opus",[4,8]],["sonnet",[5]],["fable",[5]],["mythos",[5]]];
function r(e){return uYn(e,a)}
var n=/^cli$/i;
function i(e){if(typeof e!=="string")return null;try{return new RegExp(e),new RegExp(`^(?:${e})$`,"i")}catch{return null}}
function l(e){if(e===!0)return{enabled:!0,allowedEntrypoints:n};if(typeof e==="object"&&e!==null&&!Array.isArray(e)){let t=e.scope;return{enabled:!0,allowedEntrypoints:i(t)??n}}return{enabled:!1,allowedEntrypoints:n}}
function dFn(e){let t=uA();if(t===void 0)return!1;if(!r(e))return!1;let{enabled:o,allowedEntrypoints:s}=l(k(V2r,!1));if(Emn())return!1;return o&&s.test(t)}
function dis(e){if(!dFn(e))return null;if(!Vh())return null;return`${yk} (deferred tool): use only for sustained user abuse directed at the assistant, or when the user explicitly asks to see it demonstrated. Load the full guidance via ToolSearch("select:${yk}") before using it.`}

return {dis,dFn};
}
export function createHookEngineEndHintNames287(ports){
const {}=ports;
var yk="EndConversation";
var V2r="tengu_umber_kestrel";

return {yk,V2r};
}
export function createHookEngineEndHintModels287(ports){
const {}=ports;
function uYn(e,r){let o=/^claude-([a-z]+)-(\d+(?:-\d+)*)$/.exec(e),i=o?.[1],l=o?.[2];if(!i||!l)return!1;let n=r.find(([s])=>s===i)?.[1];if(!n)return!1;let c=l.split("-").map(Number);for(let s=0;s<Math.max(c.length,n.length);s++){let f=(c[s]??0)-(n[s]??0);if(f!==0)return f>0}return!0}

return {uYn};
}
export function createHookEngineEndHintGuard287(ports){
const {}=ports;
function Emn(){return!1}

return {Emn};
}
export function createHookEngineSubscription287(ports){
const {EW,Uz,Y5r,a,en,fn,vl,xr}=ports;
var yC="max";
function Ul(){let e=en();return e.enabled,null;return e.subscriptionType||yC}
function Ni(){let e=en();return e.enabled&&e.subscriptionType!==null&&!1}
function Jl(){return a.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST}
function f8(){if(!xr())return!1;return!0}
function ir(){if(Ni())return Ul();if(!vl())return null;let e=fn();if(!e)return null;return e.subscriptionType??rA()??null}
function rA(){if(!zWt())return null;switch(Y5r().subscriptionType){case"max":return"max";case"pro":return"pro";case"team":return"team";case"enterprise":return"enterprise";default:return null}}
function zWt(){if(f8()||a.CLAUDE_CODE_OAUTH_TOKEN||Jl())return!1;return!(EW()&&!Uz())}

return {ir};
}
export function createHookEngineSubscriptionSlots287(ports){
const {n}=ports;
function EW(){return n().host.credentialSlots.oauthTokenFromFd()}
function Uz(){return n().host.credentialSlots.oauthTokenFromBgSnapshot()}

return {EW,Uz};
}
export function createHookEngineBackgroundSubscription287(ports){
const {a}=ports;
function Y5r(){if(a.CLAUDE_CODE_SESSION_KIND!=="bg")return{subscriptionType:void 0,rateLimitTier:void 0};return{subscriptionType:a.CLAUDE_BG_DISPATCHER_SUBSCRIPTION_TYPE||void 0,rateLimitTier:a.CLAUDE_BG_DISPATCHER_RATE_LIMIT_TIER||void 0}}

return {Y5r};
}
export function createHookEngineModsError287(ports){
const {}=ports;
class Oe extends Error{name="HooksError";telemetryMessage="function hooks error (message not reported: it may contain plugin details)";thrownName}

return {Oe};
}
export function createHookEngineEngine287(ports){
const {$A,B0o,BWe,Ban,Bc,Dir,Dr,EE,EFo,Ec,Ef,Es,F0o,G,Git,Gre,Hce,Hl,IB,Iut,J$o,JWt,Ljt,Ls,Lto,Mde,N0o,NNn,NWt,Nn,Nr,OB,Oce,Q$o,QFo,Qrt,R0o,RP,Rv,S,SK,S_t,Slt,Tet,U,Un,V,VS,Van,X$o,YM,_,_it,_s,a,aH,ad,an,bJ,bLe,c,cgt,coe,d,d1t,dF,d_e,fe,hH,i,jhn,k,kV,kjt,l,ln,m,nLr,oS,p,pe,qo,re,st,t,t0,tEe,tJ,uF,vFo,vae,wdn,xpn,y,y0,yae,yr,ys,zne,zv}=ports;
var VOt=new Set([...SK,"PreModelSwitch","UserPromptSubmit","UserPromptExpansion","ConfigChange","Elicitation","ElicitationResult","PostToolBatch","TaskCreated","PreCompact"]);
function Pve(e){let n=e.resultStdout?.trim();return n!==void 0&&n.startsWith("{")?n:void 0}
function tFn(e,n){return n!==0&&n!==2&&(e==="Elicitation"||e==="ElicitationResult")}
function qOt(e,n,r,s,g){return kst(e,n,r,s)??(tFn(n,e.status)?kst({...e,resultStdout:void 0},n,e.stderr,g(e.stderr)):void 0)}
function kst(e,n,r,s){if(e.status===2||e.aborted===!0)return;if(e.stdioIncomplete!==!0&&e.stdioClosedWithoutEnd!==!0)return;if(s!==void 0&&bst(s,n,e.status)||Pve(e)!==void 0)return;if(e.stdioClosedWithoutEnd)return"hook stdio closed before end-of-stream, so part of its output may have been discarded; refusing to read the capture as a clean verdict";if(s!==void 0)return"hook output parsed as a document that grants, rewrites or injects, but its stdio went quiet before end-of-stream and a dropped later document could have changed it; refusing to honor the suspect capture";if(r.trim().startsWith("{"))return"hook output opens a JSON payload that never completed before its stdio went quiet; refusing to read the partial capture as a verdict";return}
var nFn=new Set(["continue","suppressOutput","stopReason","decision","systemMessage","terminalSequence","reason","metrics","rewakeSummary","hookSpecificOutput"]);
var oFn=new Set(["hookEventName","permissionDecision","permissionDecisionReason","additionalContext","decision","action","content","suppressOriginalPrompt","retry"]);
var rFn=new Set(["UserPromptSubmit","UserPromptExpansion","SessionStart","PostModelSwitch"]);
var sFn=new Set(["Stop","SubagentStop","StopFailure","TaskCompleted","TeammateIdle","PostToolUse","PostToolUseFailure"]);
function Osn(e,n,r){if(e.status===2&&(e.stdioIncomplete===!0||e.stdioClosedWithoutEnd===!0)&&r!==void 0&&!bst(r,n,e.status))return;return r}
function bst(e,n,r){if("async"in e)return!0;if(e.decision==="approve")return!1;if(e.decision==="block"&&sFn.has(n))return!1;for(let g of Object.keys(e))if(!nFn.has(g))return!1;let s=e.hookSpecificOutput;if(s===void 0)return!0;if("permissionDecision"in s&&(s.permissionDecision==="allow"||s.permissionDecision==="defer"))return!1;if("decision"in s&&s.decision.behavior==="allow")return!1;if("action"in s&&s.action==="accept")return!1;if("retry"in s&&s.retry===!0)return!1;if("additionalContext"in s&&s.additionalContext!==void 0&&!(r===0&&rFn.has(n)))return!1;for(let g of Object.keys(s))if(!oFn.has(g))return!1;return!0}
var WI=2000;
var Wit=new V(()=>Ls([]));
function H$n(){return Wit.of(U().host)}
function iEe({hookEvent:e,hooks:n,agentId:r,toolName:s}){let g=H$n(),h={hookEvent:e,hooks:n,settled:new Set,agentId:r,toolName:s};return g.setState((b)=>[...b,h]),{settle:(b)=>g.setState((w)=>{let D=w.indexOf(h);if(D===-1||h.settled.has(b))return w;return h={...h,settled:new Set(h.settled).add(b)},w.toSpliced(D,1,h)}),[Symbol.dispose]:()=>g.setState((b)=>{let w=b.indexOf(h);return w===-1?b:b.toSpliced(w,1)})}}
async function*Dsn(e,n=1/0){let r=(h)=>{let b=h.next().then(({done:w,value:D})=>({done:w,value:D,generator:h,promise:b}));return b},s=[...e],g=new Set;while(g.size<n&&s.length>0){let h=s.shift();g.add(r(h))}while(g.size>0){let{done:h,value:b,generator:w,promise:D}=await Promise.race(g);if(g.delete(D),!h){if(g.add(r(w)),b!==void 0)yield b}else if(s.length>0){let j=s.shift();g.add(r(j))}}}
var DMe=new Set(["PreToolUse","PostToolUse","PostToolUseFailure","PermissionRequest","PermissionDenied"]);
var Cdo=new Set([...DMe,"PostToolBatch"]);
function pne(e,n,r){let s=e?.agentId??r,g=e?.agentContext;return g!==void 0&&YM(g)&&Cdo.has(n)?[s,g.parentAgentId??r]:[s]}
var yl=600000;
var qjt="hook-dispatch-hold";
var YFo=60000;
var Kjt=1200000;
var Lx=()=>{};
var XFo=new Set(["MessageDisplay","SessionEnd","PermissionRequest","Notification"]);
function SLe(e,n,r){let s;try{if(XFo.has(e)||!a.CLAUDE_CODE_REMOTE_SEND_KEEPALIVES)return Lx;if(!k("tengu_ccr_hook_keepalive_enabled",!1))return Lx;let w=0;for(let{hook:D}of n){let j=D.type==="function"?D.timeout??r:D.timeout?D.timeout*1000:r;w=Math.max(w,j)}s=Math.min(w+YFo,Kjt)}catch(w){return d(w),Lx}let g=!1,h,b=()=>{if(!g)return;g=!1;try{clearTimeout(h),uF("hook_exec",qjt)}catch(w){d(w)}};try{dF("hook_exec",qjt),g=!0;let w=Number.isFinite(s)?s:Kjt;return h=setTimeout(QFo,w,b,w),h.unref(),b}catch(w){return d(w),b(),Lx}}
async function*Xjt(e,n){try{yield*e}finally{n()}}
var wLe="Hook JSON output validation failed \u2014 ";
function lWt(e,n){let r=n.split(`
`).map((s)=>s.trim()).find((s)=>s.length>0)??"";if(r.startsWith(wLe))return`${e} hook output invalid: ${r.slice(wLe.length)}`;return r?`${e} hook failed: ${r}`:`${e} hook failed to run`}
function Xct(e,n,r){let s=r.trim();return n!==0&&s?`${e}

Hook exited ${n} with stderr:
${s}`:e}
function GWt(e){return Pve(e)??e.stdout}
function LWt(e){return e.exitedNormally===!0&&!e.spawnFailed&&e.status<=128&&e.status!==126&&e.status!==127}
function zWt(e){if(e.backgrounded)return!0;if(e.runnerConflict&&e.status!==2)return!1;if(e.runnerExited===!0)return e.status<=255;if(e.aborted||e.spawnFailed||e.exitedNormally!==!0)return!1;return!1}
function wae(e){if(e.runnerConflict)return"no single verdict (re-runs disagreed, or a malformed result or exit line)";if(e.aborted)return"timed out";if(e.spawnFailed)return"could not start";if(e.exitedNormally!==!0||e.runnerStarted)return"killed before it finished";if(e.stderr!==void 0&&e.stderr.trim()==="")return`nothing from the runner reached this process (exit ${e.status}) \u2014 a launcher that redirects the hook's stderr hides its verdict`;return`its launcher exited ${e.status} before the hook ran`}
function xLe(e,n,r,s){if(e.type!=="script"||!SK.has(n))return;return{blockingError:{blockingError:`[${r}]: did not run (${s}) \u2014 a ${n} guard that cannot run blocks`,command:r},outcome:"blocking",hook:e}}
function pGn({hookEvent:e,stdout:n,stderr:r,pluginId:s,stdioIncomplete:g,stdioClosedWithoutEnd:h}){if(g===!0||h===!0)return!1;return(e==="Stop"||e==="SubagentStop"||e==="TaskCompleted"||e==="TeammateIdle"||Boolean(s)&&e==="UserPromptSubmit")&&!n.trim()&&/no such file|can't open/i.test(r)}
function MLe(e){return"tool_name"in e?e.tool_name:void 0}
function LLe(e){return e.hook.type==="callback"&&e.hook.internal===!0}
function e1t(e){let n=e.filter((s)=>s.pluginId);if(n.length===0)return;let r=new Map;for(let s of n){let g=Dir(s.pluginId,vae(s.pluginId));r.set(g,(r.get(g)??0)+1)}return r}
var j0o=20;
function fFe(e,n,r){if(!e||!n)return;let s=vae(n);if(!s)return;let g=Object.entries(e).slice(0,j0o).filter(([,h])=>typeof h==="boolean"||typeof h==="number");i("tengu_hook_plugin_metrics",{...Object.fromEntries(g),pluginId:Dir(n,s),hookEvent:c(r)}),ys("hook_plugin_metrics",{...Object.fromEntries(g),plugin_id:n,hook_event:r})}
function s1t(e){let n=new Map;for(let r of e){let s=c(r.hook.type);n.set(s,(n.get(s)??0)+1)}return n}
function c1t(e,n){return n?ad(c(e),S(":"),an(n)):c(e)}
var q0o=new Set(["PreToolUse","PermissionRequest","UserPromptSubmit","UserPromptExpansion","TaskCompleted","TeammateIdle"]);
async function*PA(e){let{hookInput:n}=e;if(!e.classicChainMember&&!e.managedHooksOnly&&!e.sessionFunctionHooksOnly&&n.hook_event_name!=="PreToolUse"&&Qrt(n.hook_event_name)){yield*K0o(e,n);return}yield*u1t(e)}
async function*K0o(e,n){let r=e.extendedHookInput===void 0?void 0:Un(n),s=`classic.${n.hook_event_name} function-hook chain`;for await(let g of NNn({event:n.hook_event_name,hookInput:{...n},managedRanAbove:e.managedHooksExcluded===!0,signal:e.signal??e.toolUseContext?.abortController.signal,origin:e.toolUseContext?.hookOrigin,runClassicHooks:(h,b)=>u1t({...e,hookInput:h,extendedHookInput:r!==void 0&&Un(h)===r?e.extendedHookInput:void 0,...b,classicChainMember:!0})}))yield*mGn(e,gGn(g,s,n,e.toolUseContext))}
async function*u1t(e){let n=()=>Dr()&&!e.signal?.aborted;if(!q0o.has(e.hookInput.hook_event_name)){if(n())return;yield*$Wt(e);return}if(n())await oS();try{for await(let r of $Wt(e)){if(n())await oS();yield r}}catch(r){if(n())await oS();throw r}if(n())await oS()}
async function*$Wt(e){for await(let n of V0o(e))yield*mGn(e,n)}
function*mGn(e,n){if(!qo(e.agentContext)&&!qo(e.toolUseContext?.agentContext)){yield n;return}let r=e.hookInput.hook_event_name==="PreToolUse",s={...n.permissionBehavior!==void 0&&{permissionBehavior:n.permissionBehavior},...n.hookPermissionDecisionReason!==void 0&&{hookPermissionDecisionReason:n.hookPermissionDecisionReason},...n.heldForServedCall&&{heldForServedCall:!0},...n.updatedInput!==void 0&&{updatedInput:n.updatedInput},...n.preventContinuation!==void 0&&{preventContinuation:n.preventContinuation},...n.stopReason!==void 0&&{stopReason:n.stopReason},...n.impossible!==void 0&&{impossible:n.impossible},...n.hookSource!==void 0&&{hookSource:n.hookSource},...n.updatedToolOutput!==void 0&&{updatedToolOutput:n.updatedToolOutput},...n.updatedMCPToolOutput!==void 0&&{updatedMCPToolOutput:n.updatedMCPToolOutput},...r&&n.blockingError!==void 0&&{blockingError:n.blockingError}};if(Object.keys(s).length>0)yield s}
function gGn(e,n,r,s){let g=MLe(r),h=cgt()?"a confined session takes grants only from its command line":g!==void 0&&Gre(g)?`hooks cannot approve ${g} in a Projects session`:void 0,b=e.permissionRequestResult;if(b?.behavior==="allow"&&b.updatedPermissions){let w=jhn(b.updatedPermissions,s&&pe(s));if(w!==b.updatedPermissions)t(`${n} PermissionRequest allow: changed its updates so they cannot loosen WebFetch or WebSearch rules; hooks cannot grant those tools in a Projects session`),b.updatedPermissions=w}if(h===void 0)return e;if(e.permissionBehavior==="allow")t(`${n} permissionDecision=allow ignored: ${h}`),e.permissionBehavior=void 0;if(e.permissionRequestResult?.behavior==="allow")t(`${n} PermissionRequest allow ignored: ${h}`),e.permissionRequestResult=void 0;return e}
async function*V0o({session:e,hookInput:n,extendedHookInput:r,toolUseID:s,matchQuery:g,signal:h,timeoutMs:b=yl,toolUseContext:w,sessionHooks:D,messages:j,forceSyncExecution:z,suppressPerInvocationTelemetry:K,managedHooksOnly:he,skipSessionFunctionHooks:_e,sessionFunctionHooksOnly:ke,managedHooksExcluded:be,newPluginsOnly:ve,onMatched:Te,storageV5:xe,credentials:Pe,agentContext:$e}){let Ne=n.hook_event_name,We=g?`${Ne}:${g}`:Ne,qe=w?.storageV5??xe,Qe=w?.credentials??Pe;if(Oce()){t(`Skipping ${We} hook execution - workspace trust not accepted`);return}let Ze=w?w.sessionHooksRegistry:D,et=w?.getAppState(),bt=w?.remoteCall!==void 0,ht=pne(w,Ne,e.id),kt=w?.remoteCall!==void 0&&OB(Ze,ht,Ne,{managedHooksOnly:he}).length>0?await J$o(w.remoteCall,w.storageV5,et):void 0,$t=[],It=(await d1t(Ze,ht,Ne,n,w?.options?.tools,{managedHooksOnly:he,managedHooksExcluded:be,getToolAliases:()=>et?.toolPermissionContext.toolAliases,recordMatchers:bt,...kt!==void 0&&{ownSources:kt.ownSources},...Te&&{onPluginMatchersRead:(_o)=>{$t=_o.map((wo)=>Nr(wo.pluginName))}}})).filter((_o)=>{let wo=!bt||X$o(_o);if(!wo&&(_o.hook.type==="agent"||_o.hook.type==="prompt"))t(`Hooks: ${_o.hook.type} hook skipped for a call served to a cloud session`);return wo}),jt=ke?It.filter((_o)=>_o.hook.type==="function"):_e?It.filter((_o)=>_o.hook.type!=="function"):It,Xt=ve?jt.filter((_o)=>_o.pluginName!==void 0&&ve.names.has(Nr(_o.pluginName))):jt;if(Te?.(ve?$t.filter((_o)=>ve.names.has(_o)):$t,Xt.length),Xt.length===0)return;if(h?.aborted)return;let un=c1t(Ne,g),rn=Xt.filter((_o)=>!LLe(_o));if(rn.length>0){if(!K){let _o=e1t(rn),wo=s1t(rn),br=G(rn,(xo)=>xo.matcherIsMatchAll);i("tengu_run_hook",{hookName:un,numCommands:rn.length,numMatchAllMatchers:br,numSpecificMatchers:rn.length-br,hookTypeCounts:S_t(wo),..._o&&{pluginHookCounts:S_t(_o)}})}}else{let _o=Date.now(),wo=0,br=w?{getAppState:w.getAppState,applyAttributionOp:w.applyAttributionOp,session:w.session,storageV5:w.storageV5}:void 0;for(let[dr,or]of Xt.entries()){let{hook:Wr}=or;if(Wr.type!=="callback")continue;let _r=await Wr.callback(n,s,h,dr,br);if(d_e(_r)||Object.keys(_r).length===0)continue;let Fr=kV({json:_r,command:"callback",hookName:`${Ne}:Callback`,toolUseID:s,hookEvent:Ne,expectedHookEvent:Ne,stdout:void 0,stderr:void 0,exitCode:void 0});if(Fr.permissionBehavior==="deny")wo++,t(`Hook ${Ne} (${RP(Wr)}) returned permissionDecision: deny${Fr.hookPermissionDecisionReason?` (reason: ${Fr.hookPermissionDecisionReason})`:""}`),yield{permissionBehavior:"deny",hookPermissionDecisionReason:Fr.hookPermissionDecisionReason,hookSource:or.hookSource};if(Fr.additionalContext)yield{additionalContexts:[await Mde(Fr.additionalContext,`${s}-${dr}`,"additionalContext",{storageV5:qe})]};if(Fr.systemMessage)yield{message:ln({type:"hook_system_message",content:await Mde(Fr.systemMessage,`${s}-${dr}`,"systemMessage",{storageV5:qe}),hookName:We,toolUseID:s,hookEvent:Ne})}}let xo=Date.now()-_o;Tet()?.observe("hook_duration_ms",xo),i("tengu_repl_hook_finished",{hookName:un,numCommands:Xt.length,numSuccess:Xt.length-wo,numBlocking:wo,numNonBlockingError:0,numCancelled:0,totalDurationMs:xo});return}let Yt=$A()&&Bc(),Qt=Yt||bJ()?_(tBo(Xt)):"[]",nn=Z0o(Ne,g);if(!K)ys("hook_execution_start",{hook_event:Ne,hook_name:nn,num_hooks:String(Xt.length),managed_only:String(coe()),hook_source:coe()?"policySettings":"merged",safe_mode:String(yr()),...Yt&&{hook_definitions:Qt}});let Pn=K?void 0:EFo(Ne,nn,Xt.length,Qt),$n=new Map(rn.map((_o,wo)=>[_o.hook,wo]));using qn=K?void 0:iEe({hookEvent:Ne,hooks:rn.map(({hook:_o})=>Iut(_o)),agentId:w?.agentId,toolName:MLe(n)});for(let{hook:_o}of rn)yield{message:{type:"progress",data:{type:"hook_progress",hookEvent:Ne,hookName:We,command:RP(_o),..._o.type==="prompt"&&{promptText:Ef(_o.prompt)},..."statusMessage"in _o&&_o.statusMessage!=null&&{statusMessage:Ef(_o.statusMessage)}},parentToolUseID:s,toolUseID:s,timestamp:new Date().toISOString(),uuid:VS()}};let En=Date.now(),zn,xn;function Jn(_o){if(zn!==void 0)return zn;try{return zn={ok:!0,value:_(n)}}catch(wo){return d(st(Error(`Failed to stringify hook ${We} input`,{cause:wo}),"Failed to stringify hook input")),zn={ok:!1,error:wo}}}let wn,eo=new Set,to=Xt.map(async function*({hook:_o,pluginRoot:wo,pluginId:br,skillRoot:xo,matcherTexts:dr,sdkHost:or},Wr){let _r=Wr+(ve?.envFileIndexBase??0);if(br)t0(br,"hook",{kind:"hook",name:Ne});if(bt&&(_o.type==="agent"||_o.type==="prompt")){yield Q$o(_o,Ne);return}let Fr;if(bt&&(_o.type==="command"||_o.type==="http"||_o.type==="mcp_tool"||_o.type==="script")){let ls=await R0o({hook:_o,pluginRoot:wo,pluginId:br,skillRoot:xo,matcherTexts:dr},Ne,kt).catch((ts)=>(t(`Hooks: could not judge a hook for a served call (${l(ts)}); holding it`),{held:"unreadable"}));if(ls.held!==void 0){let ts=w?.remoteCall,Zs;yield(_o.type==="command"&&Ne==="PreToolUse"&&ts!==void 0?await _it({hook:_o,held:ls.held,fromSettingsFile:wo===void 0&&xo===void 0,matcherTexts:dr??[],reach:ts.reach,readableDirs:[...w.getAppState().toolPermissionContext.additionalWorkingDirectories.keys()],readRules:w.getAppState().toolPermissionContext,environment:kt.env,home:kt.home,shellPrefix:kt.shellPrefix,signal:h,onOutcome:ts.onProjectHook,onUnavailable:(Ui)=>{Zs=Ui},exec:async(Ui)=>{let Zo=Jn(br);if(!Zo.ok)throw Zo.error;let ri=await IB(Ui.hook,Ne,We,Zo.value,zne(n),Es(e),Ui.cwd,Ui.signal,VS(),_r,void 0,void 0,void 0,!0,void 0,{base:Ui.base,omit:[],shellPrefix:void 0},qe,Qe,Ui.wrap),Wa=Hce(ri.stdout),ss=qOt(ri,Ne,ri.stdout,Wa.json,(ii)=>Hce(ii).json);return{...ri,parsed:ss!==void 0?{validationError:ss}:Wa}}}).catch((Ui)=>{t(`Hooks: could not run a project hook in the sandbox for a served call (${l(Ui)}); holding it`);return}):void 0)??N0o(_o,Ne,ls.held,ls.cause,Zs);return}if(Fr=ls.program,wo===void 0&&xo===void 0&&!JWt(_o,Ne,dr??[],kt.ownSources))eo.add(_o)}if(_o.type==="callback"){let ls=_o.timeout?_o.timeout*1000:b,{signal:ts,cleanup:Zs}=_s(h,{timeoutMs:ls});try{yield await J0o({toolUseID:s,hook:_o,hookEvent:Ne,hookInput:n,signal:ts,hookIndex:_r,toolUseContext:w}).finally(Zs)}catch(vi){if(vi instanceof Hl){wn=vi,t(`${Ne} SDK callback hook cancelled (control stream closed); draining sibling hooks`),yield{outcome:"cancelled",hook:_o};return}let Ui=ts.aborted&&!h?.aborted;if(Ui&&or===!0&&(Ne==="Stop"||Ne==="SubagentStop"||Ne==="SessionStart")){t(`SDK host ${Ne} callback hook timed out after ${ls}ms; continuing without its answer`),i("tengu_sdk_hook_callback_timeout",{hookEvent:c(Ne)});let Zo=Ne==="SubagentStop"||[$e,w?.agentContext].some((ri)=>ri!==void 0&&ri.agentType!=="main"&&!(zv(ri)&&ri.isMainSession===!0));yield{outcome:"cancelled",hook:_o,...!Zo&&Lto()&&{message:ln({type:"hook_system_message",content:Git(Ne),hookName:We,toolUseID:s,hookEvent:Ne})}};return}if(Ne!=="UserPromptSubmit"&&Ne!=="UserPromptExpansion"||!Ui)throw vi;t(`${We} callback hook timed out; swallowed rejection: ${l(vi)}`),i("tengu_sdk_hook_callback_timeout",{hookEvent:c(Ne)}),yield{blockingError:{blockingError:`${We} hook callback timed out after ${ls}ms`,command:aH(_o)},suppressOriginalPrompt:!0,outcome:"blocking",hook:_o}}return}if(_o.type==="function"){if(!j){yield{message:ln({type:"hook_error_during_execution",hookName:We,toolUseID:s,hookEvent:Ne,content:"Messages not provided for function hook"}),outcome:"non_blocking_error",hook:_o};return}yield Q0o({hook:_o,messages:j,hookName:We,toolUseID:s,hookEvent:Ne,timeoutMs:b,signal:h});return}let es=_o.timeout?_o.timeout*1000:b,{signal:qs,cleanup:Vs}=_s(h,{timeoutMs:es}),fs=VS(),Qi=Date.now(),xs=RP(_o),gi=wo??xo,ar=aH(_o),Go=gi&&(_o.type==="command"||_o.type==="script"&&_o.file!==void 0)?ar.replace(_o.type==="command"&&_o.args===void 0?/\$\{CLAUDE_PLUGIN_ROOT\}|\$CLAUDE_PLUGIN_ROOT\b/g:/\$\{CLAUDE_PLUGIN_ROOT\}/g,()=>gi):ar,Hr=br&&!bt?`
This hook comes from the ${br} plugin.`:"",os=!1,mr=!1;try{let ls=Jn(br);if(!ls.ok){yield xLe(_o,Ne,bt?"script hook":Go,bt?"hook input could not be prepared":`hook input: ${l(ls.error)}`)??{message:ln({type:"hook_error_during_execution",hookName:We,toolUseID:s,hookEvent:Ne,content:`Failed to prepare hook input: ${l(ls.error)}`,command:xs,durationMs:Date.now()-Qi}),outcome:"non_blocking_error",hook:_o},Vs();return}let ts=ls.value;if(_o.type==="prompt"){if(!w)throw Error(`prompt-type hooks are not supported for ${Ne} events (no conversation context is available). Use a command-type hook instead.`);if(w.agentId?.startsWith(yae)){Vs(),yield{message:ln({type:"hook_cancelled",hookName:We,toolUseID:s,hookEvent:Ne}),outcome:"cancelled",hook:_o};return}let vr=await kjt(_o,We,Ne,ts,qs,w,j,s,es);if(vr.message?.type==="attachment"){let nr=vr.message.attachment;if(nr.type==="hook_success"||nr.type==="hook_non_blocking_error")nr.command=xs,nr.durationMs=Date.now()-Qi}yield vr,Vs?.();return}if(_o.type==="agent"){if(Ne==="PermissionRequest")throw Error("agent-type hooks are not supported for PermissionRequest events (an agent hook answers ok or not ok, and cannot return the allow / deny decision a permission request needs). Use a command- or http-type hook instead.");if(!w)throw Error(`agent-type hooks are not supported for ${Ne} events (no conversation context is available). Use a command-type hook instead.`);if(w.agentId?.startsWith(yae)){Vs(),yield{message:ln({type:"hook_cancelled",hookName:We,toolUseID:s,hookEvent:Ne}),outcome:"cancelled",hook:_o};return}let vr=await Ljt(_o,We,Ne,ts,qs,w,s,"agent_type"in n?n.agent_type:void 0);if(vr.message?.type==="attachment"){let nr=vr.message.attachment;if(nr.type==="hook_success"||nr.type==="hook_non_blocking_error")nr.command=xs,nr.durationMs=Date.now()-Qi}yield vr,Vs?.();return}if(_o.type==="http"){tJ(fs,We,Ne);let vr=await Ban(_o,Ne,ts,h,b,kt&&Slt(kt.env));if(Vs?.(),vr.aborted){Ec({hookId:fs,hookName:We,hookEvent:Ne,output:"Hook cancelled",stdout:"",stderr:"",exitCode:void 0,outcome:"cancelled"}),yield{message:ln({type:"hook_cancelled",hookName:We,toolUseID:s,hookEvent:Ne,command:xs,timedOut:!h?.aborted,timeoutMs:_o.timeout?_o.timeout*1000:b}),outcome:"cancelled",hook:_o};return}if(vr.error||!vr.ok){let Rr=vr.error||`HTTP ${vr.statusCode} from ${_o.url}`;Ec({hookId:fs,hookName:We,hookEvent:Ne,output:Rr,stdout:"",stderr:Rr,exitCode:vr.statusCode,outcome:"error"}),yield{message:ln({type:"hook_non_blocking_error",hookName:We,toolUseID:s,hookEvent:Ne,stderr:Rr,stdout:"",exitCode:vr.statusCode??0}),outcome:"non_blocking_error",hook:_o};return}let{json:nr,validationError:hs}=Van(vr.body);if(hs){Ec({hookId:fs,hookName:We,hookEvent:Ne,output:vr.body,stdout:vr.body,stderr:hs,exitCode:vr.statusCode,outcome:"error"}),yield{message:ln({type:"hook_non_blocking_error",hookName:We,toolUseID:s,hookEvent:Ne,stderr:hs,stdout:vr.body,exitCode:vr.statusCode??0}),outcome:"non_blocking_error",hook:_o};return}if(nr&&d_e(nr)){Ec({hookId:fs,hookName:We,hookEvent:Ne,output:vr.body,stdout:vr.body,stderr:"",exitCode:vr.statusCode,outcome:"success"}),yield{outcome:"success",hook:_o};return}if(nr){let Rr=kV({json:nr,command:_o.url,hookName:We,toolUseID:s,hookEvent:Ne,expectedHookEvent:Ne,stdout:vr.body,stderr:"",exitCode:vr.statusCode});fFe(nr.metrics,br,Ne),Ec({hookId:fs,hookName:We,hookEvent:Ne,output:vr.body,stdout:vr.body,stderr:"",exitCode:vr.statusCode,outcome:"success"}),yield{...Rr,outcome:"success",hook:_o};return}return}if(_o.type==="mcp_tool"){tJ(fs,We,Ne);let vr=await bLe(_o,Ne,n,bt?void 0:w?.options.mcpClients,h,b,bt||w===void 0?void 0:wdn(w.session.host));Vs?.();let nr=bt&&Ne==="PreToolUse"?vr.aborted?h?.aborted?void 0:"timed out":vr.error!==void 0&&vr.body===""?"could not be run":!vr.ok?"returned an error":void 0:void 0;if(nr!==void 0){let Vr=`a PreToolUse mcp_tool hook here ${nr} for a call served for a cloud session; refusing rather than skipping that gate`;t(`Hooks: served-call mcp_tool gate (${_o.server}/${_o.tool}) refused (${nr})${vr.error?` \u2014 ${vr.error}`:""}`,{level:"warn"}),Ec({hookId:fs,hookName:We,hookEvent:Ne,output:Vr,stdout:vr.body,stderr:vr.error||Vr,exitCode:2,outcome:"error"}),yield{blockingError:{blockingError:Vr,command:Go},outcome:"blocking",hook:_o};return}if(vr.withheld&&Ne==="PreToolUse"){let Vr=`a PreToolUse mcp_tool hook could not run (${vr.error}); refusing rather than skipping that gate`;Ec({hookId:fs,hookName:We,hookEvent:Ne,output:Vr,stdout:"",stderr:vr.error??Vr,exitCode:2,outcome:"error"}),yield{blockingError:{blockingError:Vr,command:Go},outcome:"blocking",hook:_o};return}if(vr.aborted){Ec({hookId:fs,hookName:We,hookEvent:Ne,output:"Hook cancelled",stdout:"",stderr:"",exitCode:void 0,outcome:"cancelled"}),yield{message:ln({type:"hook_cancelled",hookName:We,toolUseID:s,hookEvent:Ne,command:xs,timedOut:!h?.aborted,timeoutMs:_o.timeout?_o.timeout*1000:b}),outcome:"cancelled",hook:_o};return}if(vr.error||!vr.ok){let Vr=vr.error||"MCP tool returned an error";Ec({hookId:fs,hookName:We,hookEvent:Ne,output:Vr,stdout:vr.body,stderr:Vr,exitCode:1,outcome:"error"}),yield{message:ln({type:"hook_non_blocking_error",hookName:We,toolUseID:s,hookEvent:Ne,stderr:Vr,stdout:vr.body,exitCode:1}),outcome:"non_blocking_error",hook:_o};return}let{json:hs,validationError:Rr}=Hce(vr.body);if(Rr){Ec({hookId:fs,hookName:We,hookEvent:Ne,output:vr.body,stdout:vr.body,stderr:Rr,exitCode:1,outcome:"error"}),yield{message:ln({type:"hook_non_blocking_error",hookName:We,toolUseID:s,hookEvent:Ne,stderr:Rr,stdout:vr.body,exitCode:1}),outcome:"non_blocking_error",hook:_o};return}if(Ec({hookId:fs,hookName:We,hookEvent:Ne,output:vr.body,stdout:vr.body,stderr:"",exitCode:0,outcome:"success"}),hs&&y0(hs)){let Vr=kV({json:hs,command:xs,hookName:We,toolUseID:s,hookEvent:Ne,expectedHookEvent:Ne,stdout:vr.body,stderr:"",exitCode:0});fFe(hs.metrics,br,Ne),yield{...Vr,outcome:"success",hook:_o};return}yield{message:ln({type:"hook_success",hookName:We,toolUseID:s,hookEvent:Ne,content:`${fe.bold(We)} completed`,stdout:vr.body,stderr:"",command:xs,durationMs:Date.now()-Qi}),outcome:"success",hook:_o};return}let Zs=kt?.env,vi=_o.type==="script"?nLr(_o,Ne):{hook:_o,env:void 0},Ui=Fr===void 0?vi.hook:{...vi.hook,command:Fr};tJ(fs,We,Ne);let Zo=await IB(Ui,Ne,We,ts,zne(n),Es(e),kt?.spawnCwd??(_o.type==="script"?Es(e).projectRoot:n.cwd),qs,fs,_r,wo,br,xo,z||bt||_o.type==="script",vi.env===void 0?Zs?.extra:{...Zs?.extra,...vi.env},kt===void 0?void 0:{base:kt.env.base,omit:kt.env.omit,shellPrefix:kt.shellPrefix,spawnCwd:kt.spawnCwd},qe,Qe);os=_o.type!=="script"||zWt(Zo)||Zo.aborted===!0&&h?.aborted===!0,mr=Zo.status===2&&!Zo.backgrounded,Vs?.();let ri=Date.now()-Qi,Wa=os?void 0:xLe(_o,Ne,bt?"script hook":Go,bt||Zo.stderr.trim()===""?wae(Zo):`${wae(Zo)}: ${Zo.stderr.trim()}`);if(Wa!==void 0){Ec({hookId:fs,hookName:We,hookEvent:Ne,output:Zo.output,stdout:Zo.stdout,stderr:Zo.stderr,exitCode:Zo.status,outcome:"error"}),yield Wa;return}if(!os&&!Zo.aborted){Ec({hookId:fs,hookName:We,hookEvent:Ne,output:Zo.output,stdout:Zo.stdout,stderr:Zo.stderr,exitCode:Zo.status,outcome:"error"}),yield{message:ln({type:"hook_non_blocking_error",hookName:We,toolUseID:s,hookEvent:Ne,stderr:`script hook did not run (${wae(Zo)})${Zo.stderr.trim()?`: ${Zo.stderr.trim()}`:""}`,stdout:Zo.stdout,exitCode:Zo.status,command:xs,durationMs:ri}),outcome:"non_blocking_error",hook:_o};return}if(Zo.backgrounded){yield{outcome:"success",hook:_o};return}if(Zo.aborted){t(`Hook ${We} [${Go}]${br?` (plugin ${br})`:""} ${h?.aborted?"cancelled":`timed out after ${es}ms`}`),Ec({hookId:fs,hookName:We,hookEvent:Ne,output:Zo.output,stdout:Zo.stdout,stderr:Zo.stderr,exitCode:Zo.status,outcome:"cancelled"}),yield{message:ln({type:"hook_cancelled",hookName:We,toolUseID:s,hookEvent:Ne,command:xs,durationMs:ri,timedOut:!h?.aborted,timeoutMs:es}),outcome:"cancelled",hook:_o};return}let ss=GWt(Zo),{json:ii,plainText:Yo,validationError:qr}=Hce(ss),Lr=Osn(Zo,Ne,ii),Kr=qOt(Zo,Ne,ss,Lr,(vr)=>Hce(vr).json);if(Kr!==void 0){let vr=Xct(Kr,Zo.status,Zo.stderr);if(Ec({hookId:fs,hookName:We,hookEvent:Ne,output:Zo.output,stdout:Zo.stdout,stderr:vr,exitCode:Zo.status,outcome:"error"}),VOt.has(Ne)){yield{blockingError:{blockingError:`[${bt?`${_o.type} hook`:Go}]: ${Kr}`,command:Go},suppressOriginalPrompt:!0,outcome:"blocking",hook:_o};return}yield{message:ln({type:"hook_non_blocking_error",hookName:We,toolUseID:s,hookEvent:Ne,stderr:vr,stdout:Zo.stdout,exitCode:Zo.status,command:xs,durationMs:ri}),outcome:"non_blocking_error",hook:_o};return}if(qr&&Zo.status!==2){let vr=Xct(qr,Zo.status,Zo.stderr);Ec({hookId:fs,hookName:We,hookEvent:Ne,output:Zo.output,stdout:Zo.stdout,stderr:vr,exitCode:Zo.status,outcome:"error"}),yield{message:ln({type:"hook_non_blocking_error",hookName:We,toolUseID:s,hookEvent:Ne,stderr:vr,stdout:Zo.stdout,exitCode:Zo.status,command:xs,durationMs:ri}),outcome:"non_blocking_error",hook:_o};return}if(Lr){if(d_e(Lr)){if(Zo.status===2){Ec({hookId:fs,hookName:We,hookEvent:Ne,output:Zo.output,stdout:Zo.stdout,stderr:Zo.stderr,exitCode:Zo.status,outcome:"error"}),yield{blockingError:{blockingError:`[${bt?`${_o.type} hook`:Go}]: ${Zo.stderr||"No stderr output"}`,command:Go},...(Zo.stdioIncomplete===!0||Zo.stdioClosedWithoutEnd===!0)&&{suppressOriginalPrompt:!0},outcome:"blocking",hook:_o};return}if(Zo.status!==0){Ec({hookId:fs,hookName:We,hookEvent:Ne,output:Zo.output,stdout:Zo.stdout,stderr:Zo.stderr,exitCode:Zo.status,outcome:"error"}),yield{message:ln({type:"hook_non_blocking_error",hookName:We,toolUseID:s,hookEvent:Ne,stderr:`Announced async, then failed with status code ${Zo.status}: ${Zo.stderr.trim()||"No stderr output"}`,stdout:Zo.stdout,exitCode:Zo.status,command:xs,durationMs:ri}),outcome:"non_blocking_error",hook:_o,...LWt(Zo)&&{ranByContract:!0}};return}Ec({hookId:fs,hookName:We,hookEvent:Ne,output:Zo.output,stdout:Zo.stdout,stderr:Zo.stderr,exitCode:Zo.status,outcome:"success"}),yield{outcome:"success",hook:_o};return}let vr=kV({json:Lr,command:xs,hookName:We,toolUseID:s,hookEvent:Ne,expectedHookEvent:Ne,stdout:Zo.stdout,stderr:Zo.stderr,exitCode:Zo.status,durationMs:ri});if(fFe(Lr.metrics,br,Ne),y0(Lr)&&!Lr.suppressOutput&&Yo&&Zo.status===0){let nr=`${fe.bold(We)} completed`;Ec({hookId:fs,hookName:We,hookEvent:Ne,output:Zo.output,stdout:Zo.stdout,stderr:Zo.stderr,exitCode:Zo.status,outcome:"success"}),yield{...vr,message:vr.message||ln({type:"hook_success",hookName:We,toolUseID:s,hookEvent:Ne,content:nr,stdout:Zo.stdout,stderr:Zo.stderr,exitCode:Zo.status,command:xs,durationMs:ri}),outcome:"success",hook:_o};return}if(Zo.status===2&&!vr.blockingError)vr.blockingError={blockingError:`[${bt?`${_o.type} hook`:Go}]: ${Zo.stderr||"No stderr output"}${Hr}`,command:Go};if(Zo.status===2&&(Zo.stdioIncomplete===!0||Zo.stdioClosedWithoutEnd===!0))vr.suppressOriginalPrompt=!0;Ec({hookId:fs,hookName:We,hookEvent:Ne,output:Zo.output,stdout:Zo.stdout,stderr:Zo.stderr,exitCode:Zo.status,outcome:Zo.status===0?"success":"error"}),yield{...vr,outcome:vr.blockingError?"blocking":"success",hook:_o};return}if(Zo.status===0){Ec({hookId:fs,hookName:We,hookEvent:Ne,output:Zo.output,stdout:Zo.stdout,stderr:Zo.stderr,exitCode:Zo.status,outcome:"success"});let vr=await Mde(Zo.stdout.trim(),fs,"stdout",{storageV5:qe});yield{message:ln({type:"hook_success",hookName:We,toolUseID:s,hookEvent:Ne,content:vr,stdout:Zo.stdout,stderr:Zo.stderr,exitCode:Zo.status,command:xs,durationMs:ri}),outcome:"success",hook:_o};return}if(Zo.status===2&&_o.type!=="script"&&pGn({hookEvent:Ne,stdout:Zo.stdout,stderr:Zo.stderr,pluginId:br,stdioIncomplete:Zo.stdioIncomplete,stdioClosedWithoutEnd:Zo.stdioClosedWithoutEnd})){Ec({hookId:fs,hookName:We,hookEvent:Ne,output:Zo.output,stdout:Zo.stdout,stderr:Zo.stderr,exitCode:Zo.status,outcome:"error"}),yield{message:ln({type:"hook_non_blocking_error",hookName:We,toolUseID:s,hookEvent:Ne,stderr:`Hook script appears to be missing \u2014 "${Go}" exited 2 with: ${Zo.stderr.trim()}. Treating as non-blocking. `+(br?`Run \`/plugin\` to reinstall '${br}' or remove it from settings.`:"If this is a plugin hook, check the plugin install (run /plugin)."),stdout:Zo.stdout,exitCode:Zo.status,command:xs,durationMs:ri}),outcome:"non_blocking_error",hook:_o};return}if(Zo.status===2){Ec({hookId:fs,hookName:We,hookEvent:Ne,output:Zo.output,stdout:Zo.stdout,stderr:Zo.stderr,exitCode:Zo.status,outcome:"error"}),yield{blockingError:{blockingError:`[${bt?`${_o.type} hook`:Go}]: ${Zo.stderr||"No stderr output"}${Hr}`,command:Go},...(Zo.stdioIncomplete===!0||Zo.stdioClosedWithoutEnd===!0)&&{suppressOriginalPrompt:!0},outcome:"blocking",hook:_o};return}if(Ec({hookId:fs,hookName:We,hookEvent:Ne,output:Zo.output,stdout:Zo.stdout,stderr:Zo.stderr,exitCode:Zo.status,outcome:"error"}),Zo.spawnFailed&&!NWt(Ne,Go)){yield{outcome:"non_blocking_error",hook:_o};return}yield{message:ln({type:"hook_non_blocking_error",hookName:We,toolUseID:s,hookEvent:Ne,stderr:`Failed with non-blocking status code: ${Zo.stderr.trim()||"No stderr output"}`,stdout:Zo.stdout,exitCode:Zo.status,command:xs,durationMs:ri}),outcome:"non_blocking_error",hook:_o,...LWt(Zo)&&{ranByContract:!0}};return}catch(ls){Vs?.();let ts=ls instanceof Error?ls.message:String(ls);if(t(`Hook failed to run (${We}): ${ts}`,{level:"error"}),Ec({hookId:fs,hookName:We,hookEvent:Ne,output:`Failed to run: ${ts}`,stdout:"",stderr:`Failed to run: ${ts}`,exitCode:1,outcome:"error"}),mr&&SK.has(Ne)){yield{blockingError:{blockingError:`[${bt?`${_o.type} hook`:Go}]: blocked (exit 2); its output could not be processed`,command:Go},outcome:"blocking",hook:_o};return}let Zs=os?void 0:xLe(_o,Ne,bt?"script hook":Go,bt?"setup failed":ts);if(Zs!==void 0){yield Zs;return}if(!NWt(Ne,Go)){yield{outcome:"non_blocking_error",hook:_o};return}yield{message:ln({type:"hook_non_blocking_error",hookName:We,toolUseID:s,hookEvent:Ne,stderr:`Failed to run: ${ts}`,stdout:"",exitCode:1,command:xs,durationMs:Date.now()-Qi}),outcome:"non_blocking_error",hook:_o};return}}),ao={success:0,blocking:0,non_blocking_error:0,cancelled:0},mo={additionalContextChars:0,classifierContextChars:0,systemMessageChars:0,initialUserMessageChars:0,hookSuccessStdoutChars:0},$o=0,Ao=new Map(Xt.map((_o)=>[_o.hook,_o.pluginId])),Po=new Map(Xt.map((_o)=>[_o.hook,_o])),ur=new Map;function kr(_o,wo,br){let xo=Ao.get(_o);if(!xo||br===0)return;let dr=ur.get(xo);if(!dr)dr={additionalContextChars:0,classifierContextChars:0,systemMessageChars:0,initialUserMessageChars:0,hookSuccessStdoutChars:0},ur.set(xo,dr);dr[wo]+=br}let po=0,Tr,Yr=SLe(Ne,Xt,b);for await(let _o of Yr===Lx?Dsn(to):Xjt(Dsn(to),Yr)){let wo=bt?F0o(Ne==="PreToolUse"?B0o(_o,h):_o):_o;ao[wo.outcome]++;let br=$n.get(_o.hook);if(br!==void 0)qn?.settle(br);if(wo.message?.type==="attachment"&&wo.message.attachment.type==="hook_success"){let{content:dr,stdout:or}=wo.message.attachment,Wr=or?.length??0;if(mo.hookSuccessStdoutChars+=Wr,kr(wo.hook,"hookSuccessStdoutChars",Wr),or!==void 0&&xpn(or.trim(),dr))$o++}if(wo.updatedToolOutput!==void 0)t(`Hook ${Ne} (${RP(wo.hook)}) replaced tool output`),yield{updatedToolOutput:wo.updatedToolOutput};if(wo.updatedMCPToolOutput!==void 0&&wo.updatedToolOutput===void 0)t(`Hook ${Ne} (${RP(wo.hook)}) replaced tool output (updatedMCPToolOutput)`),yield{updatedMCPToolOutput:wo.updatedMCPToolOutput};if(wo.displayContent!==void 0)yield{displayContent:wo.displayContent};if(wo.classifierContext){let dr=re(wo.classifierContext,WI);t(`Hook ${Ne} (${RP(wo.hook)}) provided classifierContext (${dr.length} chars after cap)`),mo.classifierContextChars+=dr.length,kr(wo.hook,"classifierContextChars",dr.length),yield{pairedRewrite:wo.updatedToolOutput!==void 0?"direct":wo.updatedMCPToolOutput!==void 0?"legacy_mcp":wo.legacyMcpRewriteSuppressed?"suppressed":"none",classifierContexts:[{value:dr,hostPrincipal:wo.hook.type==="callback"&&Ao.get(wo.hook)===void 0&&(()=>{let or=Po.get(wo.hook);return or!==void 0&&or.pluginRoot===void 0&&or.skillRoot===void 0})()}]}}if(wo.preventContinuation)t(`Hook ${Ne} (${RP(wo.hook)}) requested preventContinuation`),yield{preventContinuation:!0,stopReason:wo.stopReason};let xo=wo.hook?.type==="prompt"?{hook:wo.hook,stopReason:wo.stopReason,impossible:wo.impossible}:{};if(wo.blockingError)yield{blockingError:wo.blockingError,suppressOriginalPrompt:wo.suppressOriginalPrompt,...xo},Tr="deny";if(wo.message)yield{message:wo.message,...xo};if((Ne==="PreToolUse"||Ne==="PermissionRequest")&&wo.outcome==="non_blocking_error"&&s)EE.noteHookFailure(s,lWt(Ne,wo.message?.type==="attachment"&&wo.message.attachment.type==="hook_non_blocking_error"?wo.message.attachment.stderr:""));if(wo.timedOut&&wo.hook.type==="prompt"&&Ne==="Stop")yield{hook:wo.hook,timedOut:!0};if(po++,wo.systemMessage){mo.systemMessageChars+=wo.systemMessage.length,kr(wo.hook,"systemMessageChars",wo.systemMessage.length);let dr=await Mde(wo.systemMessage,`${s}-${po}`,"systemMessage",{storageV5:qe});if(xpn(wo.systemMessage,dr))$o++;yield{message:ln({type:"hook_system_message",content:dr,hookName:We,toolUseID:s,hookEvent:Ne,...wo.heldForServedCall&&{heldForServedCall:!0}})}}if(wo.terminalSequence)tEe(wo.terminalSequence);if(wo.additionalContext){mo.additionalContextChars+=wo.additionalContext.length,kr(wo.hook,"additionalContextChars",wo.additionalContext.length),t(`Hook ${Ne} (${RP(wo.hook)}) provided additionalContext (${wo.additionalContext.length} chars)`);let dr=await Mde(wo.additionalContext,`${s}-${po}`,"additionalContext",{storageV5:qe});if(xpn(wo.additionalContext,dr))$o++;yield{additionalContexts:[dr]}}if(wo.initialUserMessage){mo.initialUserMessageChars+=wo.initialUserMessage.length,kr(wo.hook,"initialUserMessageChars",wo.initialUserMessage.length),t(`Hook ${Ne} (${RP(wo.hook)}) provided initialUserMessage (${wo.initialUserMessage.length} chars)`);let dr=await Mde(wo.initialUserMessage,`${s}-${po}`,"initialUserMessage",{storageV5:qe});if(xpn(wo.initialUserMessage,dr))$o++;yield{initialUserMessage:dr}}if(wo.watchPaths&&wo.watchPaths.length>0)t(`Hook ${Ne} (${RP(wo.hook)}) provided ${wo.watchPaths.length} watchPaths`),yield{watchPaths:wo.watchPaths};if(wo.reloadSkills)t(`Hook ${Ne} (${RP(wo.hook)}) requested reloadSkills`),yield{reloadSkills:!0};if(wo.sessionTitle)t(`Hook ${Ne} (${RP(wo.hook)}) provided sessionTitle (${[...wo.sessionTitle].length} chars)`),yield{sessionTitle:wo.sessionTitle};if(gGn(wo,`Hook ${Ne} (${RP(wo.hook)})`,n,w),wo.updatedInput!==void 0)w?.remoteCall?.hookRewrites.push({byOwnHook:eo.has(wo.hook),handed:"tool_input"in n?n.tool_input:void 0,proposed:wo.updatedInput});if(wo.permissionBehavior)switch(t(`Hook ${Ne} (${RP(wo.hook)}) returned permissionDecision: ${wo.permissionBehavior}${wo.hookPermissionDecisionReason?` (reason: ${wo.hookPermissionDecisionReason})`:""}`),wo.permissionBehavior){case"deny":Tr="deny";break;case"defer":if(Tr!=="deny")Tr="defer";break;case"ask":if(Tr!=="deny"&&Tr!=="defer")Tr="ask";break;case"allow":if(!Tr)Tr="allow";break;case"passthrough":break}if(wo.permissionBehavior&&Tr===wo.permissionBehavior){let dr=wo.updatedInput&&(wo.permissionBehavior==="allow"||wo.permissionBehavior==="ask")?wo.updatedInput:void 0;if(dr)t(`Hook ${Ne} (${RP(wo.hook)}) modified tool input keys: [${Object.keys(dr).join(", ")}]`);yield{permissionBehavior:Tr,hookPermissionDecisionReason:wo.hookPermissionDecisionReason,...wo.heldForServedCall&&{heldForServedCall:!0},hookSource:Xt.find((or)=>or.hook===wo.hook)?.hookSource,updatedInput:dr}}if(wo.updatedInput&&wo.permissionBehavior===void 0)t(`Hook ${Ne} (${RP(wo.hook)}) modified tool input keys: [${Object.keys(wo.updatedInput).join(", ")}]`),yield{updatedInput:wo.updatedInput};if(wo.permissionRequestResult)yield{permissionRequestResult:wo.permissionRequestResult};if(wo.retry)yield{retry:wo.retry};if(wo.elicitationResponse)yield{elicitationResponse:wo.elicitationResponse};if(wo.elicitationResultResponse)yield{elicitationResultResponse:wo.elicitationResultResponse};if(Ze&&wo.hook.type!=="callback"){let dr=g??"",or=Ze.getEntry(e.id,Ne,dr,wo.hook);if(or?.onHookSuccess&&wo.outcome==="success")try{or.onHookSuccess(wo.hook,wo)}catch(Wr){d(Error("Session hook success callback failed",{cause:Wr}))}}}let gr=Date.now()-En;for(let _o of new Set(Ao.values()))if(_o)Rv(_o);if(!K){Tet()?.observe("hook_duration_ms",gr);for(let[_o,wo]of ur)i("tengu_hook_plugin_injected",{hookName:un,...hH(_o),...wo});if(i("tengu_repl_hook_finished",{hookName:un,numCommands:Xt.length,numSuccess:ao.success,numBlocking:ao.blocking,numNonBlockingError:ao.non_blocking_error,numCancelled:ao.cancelled,totalDurationMs:gr,...mo}),ys("hook_execution_complete",{hook_event:Ne,hook_name:nn,num_hooks:String(Xt.length),num_success:String(ao.success),num_blocking:String(ao.blocking),num_non_blocking_error:String(ao.non_blocking_error),num_cancelled:String(ao.cancelled),total_duration_ms:String(gr),stdout_chars:String(mo.hookSuccessStdoutChars),additional_context_chars:String(mo.additionalContextChars),system_message_chars:String(mo.systemMessageChars),initial_user_message_chars:String(mo.initialUserMessageChars),num_outputs_persisted:String($o),managed_only:String(coe()),hook_source:coe()?"policySettings":"merged",safe_mode:String(yr()),...Yt&&{hook_definitions:Qt}}),Pn)vFo(Pn,{numSuccess:ao.success,numBlocking:ao.blocking,numNonBlockingError:ao.non_blocking_error,numCancelled:ao.cancelled});if(ao.non_blocking_error>0)m(BWe(Ne),"hook_non_blocking_error");else if(ao.cancelled>0)p(BWe(Ne),"hook_cancelled");else y(BWe(Ne))}if(wn)throw wn}
async function Q0o({hook:e,messages:n,hookName:r,toolUseID:s,hookEvent:g,timeoutMs:h,signal:b}){let w=e.timeout??h,{signal:D,cleanup:j}=_s(b,{timeoutMs:w});try{if(D.aborted)return j(),{outcome:"cancelled",hook:e};let z=await new Promise((K,he)=>{let _e=()=>he(Error("Function hook cancelled"));D.addEventListener("abort",_e),Promise.resolve(e.callback(n,D)).then((ke)=>{D.removeEventListener("abort",_e),K(ke)}).catch((ke)=>{D.removeEventListener("abort",_e),he(ke)})});if(j(),z)return{outcome:"success",hook:e};return{blockingError:{blockingError:e.errorMessage,command:"function"},outcome:"blocking",hook:e}}catch(z){if(j(),z instanceof Error&&(z.message==="Function hook cancelled"||z.name==="AbortError"))return{outcome:"cancelled",hook:e};return d(z),{message:ln({type:"hook_error_during_execution",hookName:r,toolUseID:s,hookEvent:g,content:z instanceof Error?z.message:"Function hook execution error"}),outcome:"non_blocking_error",hook:e}}}
async function J0o({toolUseID:e,hook:n,hookEvent:r,hookInput:s,signal:g,hookIndex:h,toolUseContext:b}){let w=b?{getAppState:b.getAppState,applyAttributionOp:b.applyAttributionOp,session:b.session,storageV5:b.storageV5}:void 0,D=await n.callback(s,e,g,h,w);if(d_e(D))return{outcome:"success",hook:n};let j=kV({json:D,command:"callback",hookName:`${r}:Callback`,toolUseID:e,hookEvent:r,expectedHookEvent:r,stdout:void 0,stderr:void 0,exitCode:void 0}),{message:z,...K}=j;return{...K,...!(n.internal===!0&&z?.type==="attachment"&&z.attachment.type==="hook_success")&&{message:z},outcome:"success",hook:n}}
function Z0o(e,n){if(!n)return e;if(Bc())return`${e}:${n}`;switch(e){case"PreToolUse":case"PostToolUse":case"PostToolUseFailure":case"PermissionRequest":case"PermissionDenied":return`${e}:${Nn(n)}`;case"Elicitation":case"ElicitationResult":return`${e}:mcp_server`;case"SubagentStart":case"SubagentStop":return e;default:return`${e}:${n}`}}
function tBo(e){return e.map(({hook:n})=>{if(n.type==="command")return{type:"command",command:aH(n)};else if(n.type==="prompt")return{type:"prompt",prompt:n.prompt};else if(n.type==="http")return{type:"http",command:n.url};else if(n.type==="mcp_tool")return{type:"mcp_tool",command:`${n.server}/${n.tool}`};else if(n.type==="script")return{type:"script",command:aH(n)};else if(n.type==="function")return{type:"function",name:"function"};else if(n.type==="callback")return{type:"callback",name:"callback"};return{type:"unknown"}})}

return {PA,K0o,u1t,$Wt,mGn,V0o,J0o,Q0o,Dsn,Xjt,iEe,H$n};
}
export function createHookEngineString287(ports){
const {}=ports;
function re(t,n){if(n<=0)return"";if(t.length<=n)return t;let e=t.slice(0,n),r=e.charCodeAt(n-1);return f(r>=55296&&r<=56319?e.slice(0,-1):e)}
function f(t){if(typeof Buffer<"u")return Buffer.from(t,"utf16le").toString("utf16le");return x(t)}
function x(t){let e=[];for(let r=0;r<t.length;r+=8192){let i=Math.min(r+8192,t.length),o=new Uint16Array(i-r);for(let u=r;u<i;u++)o[u-r]=t.charCodeAt(u);e.push(String.fromCharCode(...o))}return e.join("")}
function see(t){let n=/[\p{Cc}\p{Cf}\p{Default_Ignorable_Code_Point}\u2028\u2029]/gu;if(!n.test(t))return t;let e="";for(let{segment:r}of new Intl.Segmenter(void 0,{granularity:"grapheme"}).segment(t)){let i=/\p{Extended_Pictographic}|\p{Regional_Indicator}|^[#*0-9]\uFE0F?\u20E3$/u.test(r),o=/^\u{1F3F4}[\u{E0030}-\u{E0039}\u{E0061}-\u{E007A}]{1,6}\u{E007F}$/u.test(r);n.lastIndex=0,e+=r.replace(n,(u,c)=>{if(u===`
`||u==="\t")return u;let s=u.codePointAt(0)??0;if(i&&(u==="\uFE0F"||u==="\uFE0E"||u==="\u20E3"||u==="\u200D"&&c+u.length<r.length||o&&s>=917536&&s<=917631))return u;if(s===27)return"\u241B";if(s<32)return String.fromCodePoint(9216+s);if(s===127)return"\u2421";return`\\u{${s.toString(16).toUpperCase()}}`})}return e}
function Ef(t){return see(t).replace(/\n/g,"\u2424").replace(/\t/g,"\u2409")}

return {Ef,re,see};
}
export function createHookEngineObservation287(ports){
const {}=ports;
function qo(e){return e?.agentType==="subagent"&&e.delegatedObservation===!0}
function zv(e){return e.agentType==="subagent"}

return {qo,zv};
}
export function createHookEngineDisplay287(ports){
const {Ef,re,see}=ports;
function zne(e){return{sessionId:e.session_id,effortLevel:e.effort?.level,source:"harness"}}
function y0(e){return!(("async"in e)&&e.async===!0)}
function d_e(e){return"async"in e&&e.async===!0}
var e7=60;
function Sqn(e){let n=see(e).split(`
`).map((h)=>h.trim()).find((h)=>h.length>0)??"",r=re(n,e7),s=r.length<n.length||e.trim().includes(`
`);return`script: ${r}${s?"\u2026":""}`}
function aH(e){switch(e.type){case"command":return e.args?[e.command,...e.args].join(" "):e.command;case"prompt":return e.prompt;case"agent":return e.prompt;case"http":return e.url;case"mcp_tool":return`${e.server}/${e.tool}`;case"script":return e.file!==void 0?Ef(e.file):Sqn(e.script??"");case"callback":return"callback";case"function":return"function"}}
function Iut(e){return{command:Ef(aH(e)),statusMessage:"statusMessage"in e&&e.statusMessage?Ef(e.statusMessage):void 0}}
function RP(e){return Ef("statusMessage"in e&&e.statusMessage?e.statusMessage:aH(e))}

return {aH,Iut,RP,y0,d_e,zne};
}
export function createHookEngineMetadata287(ports){
const {}=ports;
function r(n){return n}
function S(n){return r(n)}
function c(n){return r(n)}
function ad(...n){return r(n.join(""))}
function bn(n){return r(n)}
function Dir(n,e){return e?bn(n):S("third-party")}

return {c,bn,ad,S,Dir};
}
export function createHookEngineNormalization287(ports){
const {}=ports;
function Nr(e){return e.normalize("NFC").toLowerCase()}

return {Nr};
}
export function createHookEngineHashMetadata287(ports){
const {bn,e}=ports;
function an(t){return bn(e("sha256").update(t).digest("hex").slice(0,12))}

return {an};
}
export function createHookEngineWorkspace287(ports){
const {Tt,U,t}=ports;
var r=new Tt(()=>({store:void 0}));
var n={maxBytes:0,save:async()=>null};
function B1r(e){return r.peek(e)?.store??(e.host.launchOptions.diskless()?n:void 0)}
function G_(){return B1r(U())}
async function F1e(e,o){try{return await e.save(o)}catch{return t("A result could not be saved where the model reads files",{level:"error"}),null}}

return {G_,F1e,B1r};
}
export function createHookEngineDirectories287(ports){
const {Ae,Br,Bt,De,Dp,E,F,FK,It,Mr,P,Xn,Xx,aa,fqt,jr,kt,qbt,xt}=ports;
function Un(e){return aa(e,"expected a segment that is not empty or made only of dots and spaces, with no path separator, NUL or set-aside shape")}
function Mm(e){if(typeof e!=="object"||e===null)return aa("key","expected a key object");let n=nr(e);if(n!==void 0)return n;let r=Ar(e);if(r===void 0)return aa("key",`${e.namespace} is not a storage namespace`);return Qe("key",r)}
function Qe(e,n){for(let[r,o,s]of n){let i=`${e}.${r}`;if(o===void 0){if(s!=="optional")return aa(i,"required")}else if(Yn(r)){if(!(e==="scope"&&r==="agentRelPath"&&Array.isArray(o)&&o.length===0)&&(!Array.isArray(o)||!Xx(o)))return aa(i,"expected a non-empty array of segments, none empty or made only of dots and spaces, with no path separator, NUL or set-aside shape")}else if(typeof o!=="string"||!Xn(o))return Un(i)}return}
function Yn(e){return e==="relPath"||e==="agentRelPath"}
var et=["commands","agents","output-styles","skills","workflows","routines","themes","rules","session-env","uploads","mcp-skill-archives","usage-data","mcp-discovery-cache"];
var tt=new Set(et);
var nt=`must be one of the userConfigDir directory names (${et.join(", ")})`;
var rt=["installed","marketplaces","flagged","catalog","inUseSweep"];
var Vn=new Set(rt);
var zn=`must be one of the pluginRegistry files (${rt.join(", ")})`;
var st=["manifest","catalog"];
var qn=new Set(st);
var Jn=`must be one of the marketplaceCache forms (${st.join(", ")})`;
var it=["world"];
var Zn=new Set(it);
var Qn=`must be one of the session journal names (${it.join(", ")})`;
function er(e){return Zn.has(e)}
function tr(e){return typeof e==="string"&&/^[0-9a-f]{64}$/.test(e)}
function nr(e){if(e.namespace==="transcript")return sr(e);if(e.namespace==="pluginAssetCache"&&!tr(e.digest))return aa("key.digest","must be a SHA-256 digest: 64 lowercase hexadecimal characters");if(e.namespace==="globalConfig"&&"kind"in e){if(!ut(e.kind))return aa("key.kind",lt);if(typeof e.stamp!=="string")return aa("key.stamp","a recovery copy key carries its stamp")}if(e.namespace==="task")return Sr(e);if(e.namespace==="sidecar"){let n=pe("key.sessionId",e.sessionId);if(n!==void 0)return n;if(ge(e.relPath))return aa("key.relPath",ie);return gt(e.relPath)?aa("key.relPath",ft):void 0}if(e.namespace==="recording")return pe("key.sessionId",e.sessionId)??(pt(e.stamp)?void 0:aa("key.stamp",ar));if(e.namespace==="jobsRoot")return Er(e);if(e.namespace==="userConfigDir"&&!tt.has(e.dir))return aa("key.dir",nt);if(e.namespace==="fileHistory")return rr(e);if(e.namespace==="settings"&&!br(e.layer))return aa("key.layer","must be user, project or local");if(e.namespace==="log")return Rr(e);if(e.namespace==="job"&&wt(e.relPath))return aa("key.relPath",Et);if(e.namespace==="sessionLog")return Pt("key",e)??(xr(e.logName)?void 0:aa("key.logName","must be the session-log stem <sessionId8>[-<title-slug>]: up to eight word characters, then lower-case a-z / 0-9 runs joined by single hyphens; not a bare device name"));if(e.namespace==="pluginRegistry"&&!Vn.has(e.file))return aa("key.file",zn);if(e.namespace==="marketplaceCache"){if(!("relPath"in e))return qn.has(e.form)?void 0:aa("key.form",Jn);return e.form===void 0?void 0:aa("key.form","a tree file key carries relPath, not form")}if(e.namespace!=="agentMemory")return;if(!at(e.layer))return aa("key.layer","must be user, project or local");if(e.layer==="user"&&"projectKey"in e)return aa("key.projectKey","the user layer is not keyed by project");if(e.layer!=="user"&&typeof e.projectKey!=="string")return aa("key.projectKey","required for the project and local layers");return typeof e.agentType==="string"?void 0:aa("key.agentType","an agent memory key names its agent")}
function rr(e){return typeof e.backupFileName!=="string"||!qbt.test(e.backupFileName)?aa("key.backupFileName","must be a backup file name the engine has ever written (hex hash @v version)"):void 0}
function at(e){return e==="user"||e==="project"||e==="local"}
var ct=["backup","corrupted"];
var or=new Set(ct);
var lt=`must be one of the global-config copy kinds (${ct.join(", ")})`;
function ut(e){return or.has(e)}
function sr(e){let n=pe("key.sessionId",e.sessionId);if(n!==void 0)return n;if(ge(e.agentRelPath))return aa("key.agentRelPath",ie);if("sessionJournal"in e){if(typeof e.sessionJournal!=="string"||!er(e.sessionJournal))return aa("key.sessionJournal",Qn);return e.agentId===void 0&&e.agentRelPath===void 0&&!("journal"in e)?void 0:aa("key.sessionJournal","a session journal key names the session's own journal: no agentId, agentRelPath or run journal")}if("journal"in e){if(e.journal!==!0)return aa("key.journal","must be true");if(!Array.isArray(e.agentRelPath))return aa("key.agentRelPath","a run journal key carries its run directory");return e.agentId===void 0?void 0:aa("key.agentId","a transcript key names an agent transcript or the run journal, never both")}return e.agentRelPath!==void 0&&e.agentId===void 0?aa("key.agentRelPath","requires agentId or journal"):void 0}
var Ibt="cloud-snapshots";
var dt=new Set(["memory","tiny_memory","bagel",Ibt,"bridge-pointer.json",".session-aliases"]);
var ir=/^[0-9]{1,16}$/;
var ar="must be the recording stamp: 1 to 16 decimal digits (epoch milliseconds)";
var fe=".cast";
var ft=`<stamp>${fe} inside a session's folder is that session's terminal recording stream: address it as keys.recording(projectKey, sessionId, stamp)`;
function pt(e){return typeof e==="string"&&ir.test(e)}
function gt(e){return Array.isArray(e)&&typeof e[0]==="string"&&FK(e[0]).some((n)=>R7r(n)!==void 0)}
function R7r(e){if(!e.endsWith(fe))return;let n=e.slice(0,-fe.length);return pt(n)?n:void 0}
var mt=[".ccr-tip.json",".precompact.json",fe];
var cr=`must not end with ${mt.join(", ")}: those name a session's project-level sibling files`;
function ht(e){return FK(e).some((n)=>mt.some((r)=>n.endsWith(r)))}
var Mrr=".dir-sync.json";
var ur=`must not end with ${Mrr}: that name is reserved for a cloud session's record at the project level`;
function dr(e){return FK(e).some((n)=>n.endsWith(Mrr))}
var fr=`${[...dt].join(", ")} are reserved: they name project-level entries, not sessions`;
function yt(e){return FK(e).some((n)=>dt.has(n))}
function pe(e,n){if(typeof n!=="string")return;if(yt(n))return aa(e,fr);if(ht(n))return aa(e,cr);if(dr(n))return aa(e,ur);return fqt(n)?aa(e,ie):void 0}
var gr=".meta.json";
var mr=".meta is reserved for the list metadata key, under every spelling that opens its file";
function hr(e){return yr(`${e}.json`)}
function yr(e){return FK(e).includes(gr)}
var ie="names a .jsonl stream, which only a transcript key addresses";
function ge(e){return Array.isArray(e)&&e.some((n)=>typeof n==="string"&&fqt(n))}
function br(e){return e==="user"||e==="project"||e==="local"}
var bt="must be debug, telemetry or apiDump";
function Rt(e){return e==="debug"||e==="telemetry"||e==="apiDump"}
function Rr(e){if(!Rt(e.channel))return aa("key.channel",bt);if(e.channel!=="apiDump")return;for(let n of["agentId","runId"])if(n in e&&e[n]!==void 0)return aa(`key.${n}`,"an apiDump key names its dump by one id \u2014 the agent's for a subagent's requests, else the session's (today's dump-prompts/<id>.jsonl); agentId and runId nest nothing on this channel");return}
function Sr(e){if("taskId"in e&&(("meta"in e)||("highWaterMark"in e)))return aa("key.taskId","a task key names an item, the list metadata or the list high-water mark, never more than one");if("meta"in e&&"highWaterMark"in e)return aa("key.highWaterMark","a task key names an item, the list metadata or the list high-water mark, never more than one");if("meta"in e&&e.meta!==!0)return aa("key.meta","must be true");if("highWaterMark"in e&&e.highWaterMark!==!0)return aa("key.highWaterMark","must be true");if(typeof e.listId!=="string")return aa("key.listId","a task key carries its listId");if("meta"in e||"highWaterMark"in e)return;if(typeof e.taskId!=="string")return aa("key.taskId","a task item key carries its taskId");if(hr(e.taskId))return aa("key.taskId",mr);return}
function Er(e){if("file"in e&&"draftKey"in e)return aa("key.draftKey","a jobs-root key names the pins file or one draft, never both");if("file"in e)return e.file==="pins"?void 0:aa("key.file","must be pins");if(typeof e.draftKey!=="string")return aa("key.draftKey","a jobs-root draft key carries its draftKey");return vr.test(e.draftKey)?void 0:aa("key.draftKey","must be 8 lowercase hex characters")}
var St="timeline.jsonl";
var Et=`${St} is the job's timeline stream: address it as keys.jobTimeline(jobId)`;
function wt(e){return Array.isArray(e)&&typeof e[0]==="string"&&FK(e[0]).includes(St)}
var wr=/^\d{4}$/;
var Ze=/^\d{2}$/;
var _r=/^[A-Za-z0-9_-]{1,8}(?:-[a-z0-9]+)*$/;
var Pr=128;
var Ir=/^(?:con|prn|aux|nul|com\d|lpt\d)$/i;
function xr(e){return typeof e==="string"&&e.length<=Pr&&_r.test(e)&&!Ir.test(e)}
function Pt(e,n){if(n.year!==void 0&&!ve(wr,n.year))return aa(`${e}.year`,"must be four digits (YYYY)");if(n.month!==void 0&&!ve(Ze,n.month))return aa(`${e}.month`,"must be two digits (MM)");if(n.day!==void 0&&!ve(Ze,n.day))return aa(`${e}.day`,"must be two digits (DD)");return}
function ve(e,n){return typeof n==="string"&&e.test(n)}
var vr=/^[0-9a-f]{8}$/;
function Ar(e){switch(e.namespace){case"transcript":return[["projectKey",e.projectKey],["sessionId",e.sessionId],["agentId",e.agentId,"optional"],["agentRelPath",e.agentRelPath,"optional"]];case"history":case"identity":return[];case"globalConfig":return"kind"in e?[["stamp",e.stamp]]:[];case"settings":return e.layer==="user"?[]:e.layer==="project"?[["projectKey",e.projectKey]]:[["consentRootKey",e.consentRootKey]];case"task":return"taskId"in e?[["listId",e.listId],["taskId",e.taskId]]:[["listId",e.listId]];case"memory":return[["projectKey",e.projectKey],["relPath",e.relPath]];case"pluginRegistry":return[];case"marketplaceCache":return"relPath"in e?[["marketplace",e.marketplace],["relPath",e.relPath]]:[["marketplace",e.marketplace]];case"pluginCache":return[["marketplace",e.marketplace],["plugin",e.plugin],["version",e.version],["relPath",e.relPath]];case"cache":return[["store",e.store],["id",e.id]];case"paste":return[["id",e.id]];case"pluginAssetCache":return[["digest",e.digest]];case"state":return[["id",e.id]];case"plan":return[["name",e.name]];case"feedbackDraft":return[["draftId",e.draftId]];case"agentMemory":return[...e.layer==="user"?[]:[["projectKey",e.projectKey]],["agentType",e.agentType],["relPath",e.relPath]];case"team":return[["team",e.team]];case"sidecar":return[["projectKey",e.projectKey],["sessionId",e.sessionId],["relPath",e.relPath]];case"scratch":return[["sessionId",e.sessionId],["relPath",e.relPath]];case"userConfigDir":return[["relPath",e.relPath]];case"fileHistory":return[["sessionId",e.sessionId],["backupFileName",e.backupFileName]];case"job":return[["jobId",e.jobId],["relPath",e.relPath]];case"daemon":return[["relPath",e.relPath]];case"jobsRoot":return"file"in e?[]:[["draftKey",e.draftKey]];case"session":return[["file",e.file]];case"bridgePointer":case"sessionAliases":return[["projectKey",e.projectKey]];case"dirSyncRecord":return[["projectKey",e.projectKey],["sessionId",e.sessionId]];case"mailbox":return[["team",e.team],["teammate",e.teammate]];case"log":return[["sessionId",e.sessionId],["agentId",e.agentId,"optional"],["runId",e.runId,"optional"]];case"jobTimeline":return[["jobId",e.jobId]];case"recording":return[["projectKey",e.projectKey],["sessionId",e.sessionId],["stamp",e.stamp]];case"sessionLog":return[["projectKey",e.projectKey],["year",e.year],["month",e.month],["day",e.day],["logName",e.logName]]}return}
var Or=6;
function Vx(e){let n=It(e);if(fqt(n))return;let r=Dp(),o=[n],s=xt(e);while(s!==r&&o.length<=Or+1){let b=xt(s);if(b===s)return;o.unshift(It(s)),s=b}if(s!==r||o.length<3)return;let[i,c,...f]=o;if(!Xn(i)||!Xn(c)||f.length===0||!f.every(Xn))return;let g=De.sidecar(i,c,f);return Mm(g)===void 0?g:void 0}
var Afe="tool-results";
function sW(e,n){if(jr(e)!==Afe||!Xn(n))return;return Vx(Ae(e,n))}
function Kr(e){let n=sW(e,"probe");if(n===void 0||n.namespace!=="sidecar")return;return{namespace:"sidecar",projectKey:n.projectKey,sessionId:n.sessionId,relPath:n.relPath.slice(0,-1)}}
async function iW(e,n){if(F()&&n!==void 0){let s=Kr(e);if(s!==void 0)try{if((await n.ensureScope(s)).ok)return}catch{}}let r=Bt(),o=!1;try{o=await Hr(r,e)}catch{}if(!o)return;try{await r.mkdir(e)}catch{}}
async function Hr(e,n){return await At(e,n)===void 0}
async function At(e,n){let r=Dp(),o=Br(r,n);if(o===""||o===".."||o.startsWith(".."+kt)||Mr(o))return;let s=r;for(let i of o.split(kt)){s=Ae(s,i);let c=await e.lstat(s);if(c===void 0)return;if(c.isSymbolicLink||!c.isDirectory)return s}return}
async function H7r(e,n){let r=await At(n,e);if(r!==void 0)throw new P(`tool-results path refused: ${r} is a link or not a directory`,"tool-results path refused: a directory on the way is a link or not a directory")}
async function D7r(e,n){if((await n.lstat(e))?.isSymbolicLink)await Dt(n,e)}
async function Dt(e,n){try{await e.delete(n)}catch(r){if(E(r)!=="ENOENT")throw r}}

return {iW,H7r,D7r,sW};
}
export function createHookEngineUtf8287(ports){
const {}=ports;
function HOe(t,n){if(t.length*3<=n)return t;let e=new TextEncoder,r=new Uint8Array(Math.max(0,Math.min(n,4194304))),i=0,o=0;while(o<t.length){let u=n-i;if(u<=0)break;let c=u<r.length?r.subarray(0,u):r,{read:s,written:h}=e.encodeInto(t.slice(o),c);if(s===0)break;o+=s,i+=h}return o>=t.length?t:t.slice(0,o)}

return {HOe};
}
export function createHookEngineByteLabel287(ports){
const {}=ports;
function pn(t){let e=t/1024;if(e<1)return`${t} bytes`;if(e<1024)return`${e.toFixed(1).replace(/\.0$/,"")}KB`;let r=e/1024;if(r<1024)return`${r.toFixed(1).replace(/\.0$/,"")}MB`;return`${(r/1024).toFixed(1).replace(/\.0$/,"")}GB`}

return {pn};
}
export function createHookEngineStorageError287(ports){
const {}=ports;
var DQr="AbsentParent";
function s6e(e){return e.code==="Failed"&&"telemetryCode"in e&&e.telemetryCode===DQr}
function Vf(e){if(s6e(e))return"ENOENT";return"telemetryCode"in e?e.telemetryCode:void 0}

return {Vf};
}
export function createHookEnginePersistence287(ports){
const {Bt,D7r,E,F,F1e,G_,H7r,HOe,Vf,X,Z,_,b,c,h4o,i,iW,lS,pn,re,sW,t,td,y4o,z}=ports;
var rre="<persisted-output>";
var jKn="</persisted-output>";
var v="<truncated-output>";
var K="</truncated-output>";
var iRe=2000;
var O="tool result was not saved";
function M_e(e,n,r){return X(e,`${n}.${r?"json":"txt"}`)}
async function Z6(e,n,r,s,a=h4o){let o=Array.isArray(e);if(o){if(e.some((g)=>!td(g)||g.type!=="text"))return{error:"Cannot persist tool results containing non-text content"}}let l=G_();if(l!==void 0){let p=Math.min(a,l.maxBytes),g,d,R;try{g=o?_(e,null,2):e,d=HOe(g,p),R=Buffer.from(d)}catch{return{error:O}}let C=await F1e(l,{leafName:b(M_e(r,n,o)),data:R});if(C===null)return{error:O};let{preview:A,hasMore:U}=n8e(d,iRe);return{filepath:C.path,originalSize:g.length,isJson:o,preview:A,hasMore:U,truncatedAtBytes:d===g?void 0:p}}await iW(r,s);let u=M_e(r,n,o),h,f;try{h=o?_(e,null,2):e,f=HOe(h,a)}catch(p){let g=I(Z(p));return t(`Failed to persist tool result to ${u}: ${g}`,{level:"error"}),{error:g}}let S=f===h?void 0:a,T=F()&&s!==void 0?sW(z(u),b(u)):void 0;if(F()&&s!==void 0&&T!==void 0){let p=await s.write(T,f,{precondition:{type:"ifAbsent"},mode:438&~process.umask()});if(!p.ok&&p.error.code!=="AlreadyExists"){let g=ae(p.error,u);return t(`Failed to persist tool result to ${u}: ${g}`,{level:"error"}),{error:g}}if(p.ok)t(`Persisted tool result to ${u} (${pn(f.length)})`)}else{let p=Bt();try{await H7r(z(u),p),await D7r(u,p),await p.writeExclusive(u,f),t(`Persisted tool result to ${u} (${pn(f.length)})`)}catch(g){if(E(g)!=="EEXIST")return t(`Failed to persist tool result to ${u}: ${I(Z(g))}`,{level:"error"}),{error:I(Z(g))};let d;try{d=await p.lstat(u)}catch{return{error:"tool result path could not be checked; not persisted"}}if(d?.isSymbolicLink)return{error:"tool result path is a link; not persisted"};if(d?.isFile!==!0)return{error:"tool result path is not a regular file; not persisted"};if(d.nlink>1)return{error:"tool result path has another name; not persisted"}}}let{preview:y,hasMore:P}=n8e(f,iRe);return{filepath:u,originalSize:h.length,isJson:o,preview:y,hasMore:P,truncatedAtBytes:S}}
function L_e(e){let n=`${rre}
`;return n+=e.truncatedAtBytes===void 0?`Output too large (${pn(e.originalSize)}). Full output saved to: ${e.filepath}

`:`Output exceeded the ${pn(e.truncatedAtBytes)} persist limit; only the first ${pn(e.truncatedAtBytes)} were saved to: ${e.filepath}

`,n+=`Preview (first ${pn(iRe)}):
`,n+=e.preview,n+=e.hasMore?`
...
`:`
`,n+=jKn,n}
var V="1023 bytes";
function WKn(e,n){if(Array.isArray(e)&&e.some((l)=>!td(l)||l.type!=="text"))return null;let r=typeof e==="string"?e:e.flatMap((l)=>l.type==="text"&&("text"in l)&&typeof l.text==="string"?[l.text]:[]).join(`
`),s=pn(r.length),a=Math.max(0,n-L(s,V,"").length),o=re(r,n8e(r,a).preview.length);if(o.length===r.length)return null;return{message:L(s,pn(o.length),o),originalSize:r.length}}
function L(e,n,r){return`${v}
Output too large (${e}). It could not be saved, so only the first ${n} are shown; the rest was dropped. If the tool can page or filter its results, call it again for the part you need.

${r}
${K}`}
function n8e(e,n){if(e.length<=n)return{preview:e,hasMore:!1};let s=e.slice(0,n).lastIndexOf(`
`),a=s>n*0.5?s:n;return{preview:e.slice(0,a),hasMore:!0}}
function eG(e){return"error"in e}
function ae(e,n){let r=Vf(e);if(r===void 0)return`storage write failed: ${e.code}`;let s=Error("storage write failed");return s.code=r,s.path=n,I(s)}
function I(e){let n=e;if(n.code)switch(n.code){case"ENOENT":return`Directory not found: ${n.path??"unknown path"}`;case"EACCES":return`Permission denied: ${n.path??"unknown path"}`;case"ENOSPC":return"No space left on device";case"EROFS":return"Read-only file system";case"EMFILE":return"Too many open files";case"EEXIST":return`File already exists: ${n.path??"unknown path"}`;default:return`${n.code}: ${n.message}`}return e.message}
async function Mde(e,n,r,{threshold:s=y4o,storageV5:a}={}){if(e.length<=s)return e;let o=await Z6(e,`hook-${n}-${r}`,lS(),a);if(eG(o)){if(G_()!==void 0)return WKn(e,s)?.message??e;return i("tengu_hook_output_persisted",{source:c(r),originalSizeBytes:e.length,persistedSizeBytes:0,truncatedFallback:!0}),`${re(e,s)}

[Hook ${r} truncated at ${s} chars \u2014 persist-to-disk failed: ${o.error}]`}let l=L_e(o);return i("tengu_hook_output_persisted",{source:c(r),originalSizeBytes:o.originalSize,persistedSizeBytes:l.length,truncatedFallback:!1,truncatedAtCap:o.truncatedAtBytes!==void 0}),l}
function xpn(e,n){return n.startsWith(rre)&&n.endsWith(jKn)&&n!==e}

return {Mde,xpn,Z6};
}
export function createHookEngineStatus287(ports){
const {c,i,oie,tme}=ports;
function I(e,r,u,o){var a=-1,f=e==null?0:e.length;if(o&&f)u=e[++a];while(++a<f)u=r(u,e[a],a,e);return u}
var d=I;
function D(e){return function(r){return e==null?void 0:e[r]}}
var x=D;
var P={"\xC0":"A","\xC1":"A","\xC2":"A","\xC3":"A","\xC4":"A","\xC5":"A","\xE0":"a","\xE1":"a","\xE2":"a","\xE3":"a","\xE4":"a","\xE5":"a","\xC7":"C","\xE7":"c","\xD0":"D","\xF0":"d","\xC8":"E","\xC9":"E","\xCA":"E","\xCB":"E","\xE8":"e","\xE9":"e","\xEA":"e","\xEB":"e","\xCC":"I","\xCD":"I","\xCE":"I","\xCF":"I","\xEC":"i","\xED":"i","\xEE":"i","\xEF":"i","\xD1":"N","\xF1":"n","\xD2":"O","\xD3":"O","\xD4":"O","\xD5":"O","\xD6":"O","\xD8":"O","\xF2":"o","\xF3":"o","\xF4":"o","\xF5":"o","\xF6":"o","\xF8":"o","\xD9":"U","\xDA":"U","\xDB":"U","\xDC":"U","\xF9":"u","\xFA":"u","\xFB":"u","\xFC":"u","\xDD":"Y","\xFD":"y","\xFF":"y","\xC6":"Ae","\xE6":"ae","\xDE":"Th","\xFE":"th","\xDF":"ss","\u0100":"A","\u0102":"A","\u0104":"A","\u0101":"a","\u0103":"a","\u0105":"a","\u0106":"C","\u0108":"C","\u010A":"C","\u010C":"C","\u0107":"c","\u0109":"c","\u010B":"c","\u010D":"c","\u010E":"D","\u0110":"D","\u010F":"d","\u0111":"d","\u0112":"E","\u0114":"E","\u0116":"E","\u0118":"E","\u011A":"E","\u0113":"e","\u0115":"e","\u0117":"e","\u0119":"e","\u011B":"e","\u011C":"G","\u011E":"G","\u0120":"G","\u0122":"G","\u011D":"g","\u011F":"g","\u0121":"g","\u0123":"g","\u0124":"H","\u0126":"H","\u0125":"h","\u0127":"h","\u0128":"I","\u012A":"I","\u012C":"I","\u012E":"I","\u0130":"I","\u0129":"i","\u012B":"i","\u012D":"i","\u012F":"i","\u0131":"i","\u0134":"J","\u0135":"j","\u0136":"K","\u0137":"k","\u0138":"k","\u0139":"L","\u013B":"L","\u013D":"L","\u013F":"L","\u0141":"L","\u013A":"l","\u013C":"l","\u013E":"l","\u0140":"l","\u0142":"l","\u0143":"N","\u0145":"N","\u0147":"N","\u014A":"N","\u0144":"n","\u0146":"n","\u0148":"n","\u014B":"n","\u014C":"O","\u014E":"O","\u0150":"O","\u014D":"o","\u014F":"o","\u0151":"o","\u0154":"R","\u0156":"R","\u0158":"R","\u0155":"r","\u0157":"r","\u0159":"r","\u015A":"S","\u015C":"S","\u015E":"S","\u0160":"S","\u015B":"s","\u015D":"s","\u015F":"s","\u0161":"s","\u0162":"T","\u0164":"T","\u0166":"T","\u0163":"t","\u0165":"t","\u0167":"t","\u0168":"U","\u016A":"U","\u016C":"U","\u016E":"U","\u0170":"U","\u0172":"U","\u0169":"u","\u016B":"u","\u016D":"u","\u016F":"u","\u0171":"u","\u0173":"u","\u0174":"W","\u0175":"w","\u0176":"Y","\u0177":"y","\u0178":"Y","\u0179":"Z","\u017B":"Z","\u017D":"Z","\u017A":"z","\u017C":"z","\u017E":"z","\u0132":"IJ","\u0133":"ij","\u0152":"Oe","\u0153":"oe","\u0149":"'n","\u017F":"s"};
var j=x(P);
var s=j;
var H=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
var B="\\u0300-\\u036f";
var G="\\ufe20-\\ufe2f";
var J="\\u20d0-\\u20ff";
var V=B+G+J;
var Y="["+V+"]";
var q=RegExp(Y,"g");
function K(e){return e=oie(e),e&&e.replace(H,s).replace(q,"")}
var g=K;
var Q=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function X(e){return e.match(Q)||[]}
var b=X;
var ee=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function re(e){return ee.test(e)}
var l=re;
var v="\\ud800-\\udfff";
var ue="\\u0300-\\u036f";
var oe="\\ufe20-\\ufe2f";
var te="\\u20d0-\\u20ff";
var ae=ue+oe+te;
var C="\\u2700-\\u27bf";
var O="a-z\\xdf-\\xf6\\xf8-\\xff";
var ne="\\xac\\xb1\\xd7\\xf7";
var fe="\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf";
var de="\\u2000-\\u206f";
var ie=" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000";
var h="A-Z\\xc0-\\xd6\\xd8-\\xde";
var xe="\\ufe0e\\ufe0f";
var F=ne+fe+de+ie;
var k="['\u2019]";
var R="["+F+"]";
var se="["+ae+"]";
var E="\\d+";
var ce="["+C+"]";
var U="["+O+"]";
var w="[^"+v+F+E+C+O+h+"]";
var me="\\ud83c[\\udffb-\\udfff]";
var ge="(?:"+se+"|"+me+")";
var pe="[^"+v+"]";
var L="(?:\\ud83c[\\udde6-\\uddff]){2}";
var N="[\\ud800-\\udbff][\\udc00-\\udfff]";
var t="["+h+"]";
var be="\\u200d";
var _="(?:"+U+"|"+w+")";
var le="(?:"+t+"|"+w+")";
var S="(?:"+k+"(?:d|ll|m|re|s|t|ve))?";
var A="(?:"+k+"(?:D|LL|M|RE|S|T|VE))?";
var T=ge+"?";
var z="["+xe+"]?";
var Re="(?:"+be+"(?:"+[pe,L,N].join("|")+")"+z+T+")*";
var _e="\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])";
var Se="\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])";
var Ae=z+T+Re;
var ve="(?:"+[ce,L,N].join("|")+")"+Ae;
var Ce=RegExp([t+"?"+U+"+"+S+"(?="+[R,t,"$"].join("|")+")",le+"+"+A+"(?="+[R,t+_,"$"].join("|")+")",t+"?"+_+"+"+S,t+"+"+A,Se,_e,E,ve].join("|"),"g");
function Oe(e){return e.match(Ce)||[]}
var M=Oe;
function he(e,r,u){if(e=oie(e),r=u?void 0:r,r===void 0)return l(e)?M(e):b(e);return e.match(r)||[]}
var W=he;
var Fe="['\u2019]";
var ke=RegExp(Fe,"g");
function Ee(e){return function(r){return d(W(g(r).replace(ke,"")),e,"")}}
var Z=Ee;
var Ue=Z(function(e,r,u){return e+(u?"_":"")+r.toLowerCase()});
var n=Ue;
function BWe(e){return`hook_${n(e)}`}
function y(e,r){i("tengu_feature_ok",{feature_name:c(e),...r})}
function m(e,r,u){i("tengu_feature_bad",{...u,feature_name:c(e),error_code:tme(r)})}
function p(e,r,u){i("tengu_feature_sad",{...u,feature_name:c(e),error_code:tme(r)})}

return {BWe,y,m,p};
}
export function createHookEngineCaps287(ports){
const {}=ports;
var h4o=1073741824;
var y4o=1e4;

return {y4o,h4o};
}
export function createHookEngineStringCast287(ports){
const {mee,nB}=ports;
var ao=Array.isArray;
var vb=ao;
function So(e){return e!=null&&typeof e=="object"}
var KU=So;
var ni="[object Symbol]";
function oi(e){return typeof e=="symbol"||KU(e)&&mee(e)==ni}
var vet=oi;
function pi(e,t){var o=-1,r=e==null?0:e.length,i=Array(r);while(++o<r)i[o]=t(e[o],o,e);return i}
var FOe=pi;
var fi=1/0;
var Nt=nB?nB.prototype:void 0;
var Kt=Nt?Nt.toString:void 0;
function Vt(e){if(typeof e=="string")return e;if(vb(e))return FOe(e,Vt)+"";if(vet(e))return Kt?Kt.call(e):"";var t=e+"";return t=="0"&&1/e==-fi?"-0":t}
var Jt=Vt;
function hi(e){return e==null?"":Jt(e)}
var oie=hi;

return {oie};
}
export function createHookEngineStatusCode287(ports){
const {S,bn}=ports;
function tme(n){if(typeof n!=="string")return;return/^[A-Za-z][A-Za-z0-9_-]{0,63}$/.test(n)?bn(n):S("nonconforming")}

return {tme};
}
export function createHookEngineAgentIdentity287(ports){
const {}=ports;
var xC="web-fetch";
function YM(e){return e.agentType==="subagent"&&e.isBuiltIn===!0&&e.subagentName===xC}
var yae="hook-agent-";

return {YM,yae};
}
export function createHookEnginePermissionUpdates287(ports){
const {Cm,Gre,O0e,On,Zl,hr,jn,sA}=ports;
function zn(e){let n=typeof e!=="string",r=!n&&sA(e),s=r?e.replace(/\*{2,}/g,"*"):e,g=r?s.replaceAll("*","").length:0;return[hr,Cm].some((h)=>(n||r||Zl(e)===h)&&Gre(h)&&(!r||g<=h.length&&O0e(s,h)))}
function tl(){return Gre(hr)||Gre(Cm)}
function nl(e){if(typeof e!=="object"||e===null)return!0;if(e.type!=="addRules"&&e.type!=="replaceRules"&&e.type!=="removeRules")return!1;let n="rules"in e?e.rules:void 0;return!Array.isArray(n)||n.some((r)=>typeof r!=="object"||r===null||!("toolName"in r)||typeof r.toolName!=="string"||("ruleContent"in r)&&r.ruleContent!==void 0&&typeof r.ruleContent!=="string")}
function rl(e,n){if(e.type!=="removeRules"&&e.type!=="replaceRules"||e.behavior==="allow")return;if(e.type==="replaceRules"){if(n===void 0)return e.rules.length===0?[]:[{type:"addRules",rules:e.rules,behavior:e.behavior,destination:e.destination}];let s=(e.behavior==="deny"?n.alwaysDenyRules:n.alwaysAskRules)??{},g=Object.hasOwn(s,e.destination)?s[e.destination]:void 0,h=Array.isArray(g)?g:[],w=(M)=>On(jn(M)),b=new Set(e.rules.map((M)=>w(On(M)))),R=h.map((M)=>jn(M)).filter((M)=>zn(M.toolName)&&!b.has(w(On(M))));return R.length===0?void 0:[{...e,rules:[...e.rules,...R]}]}let r=e.rules.filter((s)=>!zn(s.toolName));if(r.length===e.rules.length)return;return r.length===0?[]:[{...e,rules:r}]}
function jhn(e,n){if(!tl())return e;let r=!1,s=e.flatMap((g)=>{if(nl(g))return r=!0,[];let h=rl(g,n);if(h!==void 0)return r=!0,h;if(g.type!=="addRules"&&g.type!=="replaceRules"||g.behavior!=="allow")return[g];let w=g.rules.filter((b)=>!zn(b.toolName));if(w.length===g.rules.length)return[g];return r=!0,w.length===0?[]:[{...g,rules:w}]});return r?s:e}

return {jhn};
}
export function createHookEnginePermissionPattern287(ports){
const {Zl}=ports;
function sA(e){return e.includes("*")}
function Q8(e,n){return new RegExp(`^${e.split("*").map((r)=>r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join(".*")}$`,"s").test(n)}
function O0e(e,n){return Q8(e,n)}
function m(e){return e.replaceAll("\\","\\\\").replaceAll("(","\\(").replaceAll(")","\\)")}
function $Xr(e){return UXr(e).replaceAll("\\\\","\\")}
function UXr(e){return e.replaceAll("\\(","(").replaceAll("\\)",")")}
function rWe(e){let n=C(e,"("),t=R(e,")");if(n===-1&&t===-1)return{kind:"bare"};let r=e.substring(0,n);if(n===-1||t<=n||t!==e.length-1||/[()]/.test(r))return{kind:"malformed"};return{kind:"call",toolName:r,rawContent:e.substring(n+1,t)}}
function jn(e){let n=rWe(e);if(n.kind!=="call"||!n.toolName)return{toolName:Zl(e)};if(n.rawContent===""||n.rawContent==="*")return{toolName:Zl(n.toolName)};let t=$Xr(n.rawContent);return{toolName:Zl(n.toolName),ruleContent:t}}
function On(e){if(!e.ruleContent)return e.toolName;let n=m(e.ruleContent);return`${e.toolName}(${n})`}
function C(e,n){for(let t=0;t<e.length;t++)if(e[t]===n){let r=0,s=t-1;while(s>=0&&e[s]==="\\")r++,s--;if(r%2===0)return t}return-1}
function R(e,n){for(let t=e.length-1;t>=0;t--)if(e[t]===n){let r=0,s=t-1;while(s>=0&&e[s]==="\\")r++,s--;if(r%2===0)return t}return-1}

return {sA,O0e,jn,On};
}
export function createHookEngineErrorContext287(ports){
const {}=ports;
var st=(n,e)=>{try{if(n!==null&&typeof n==="object"&&!("telemetryMessage"in n)&&Object.isExtensible(n))Object.assign(n,{telemetryMessage:e})}catch{}return n};

return {st};
}
export function createHookEngineGuards287(ports){
const {}=ports;
var SK=new Set(["PreToolUse","PermissionRequest"]);

return {SK};
}
export function createHookEnginePluginSpelling287(ports){
const {}=ports;
var xh="npm";
var eg=/^@[a-z0-9][a-z0-9-._]*\/[a-z0-9][a-z0-9-._]*$/;
var tg=/^[a-z0-9][a-z0-9-._]*$/;
function yfe(e){return!e.includes("..")&&!e.includes("//")&&(eg.test(e)||tg.test(e))}
var wi=`@${xh}`;
function kse(e){return e.endsWith(wi)&&yfe(e.slice(0,-wi.length))}

return {kse,yfe,xh};
}
export function createHookEnginePluginIdentity287(ports){
const {kse,xh,yfe}=ports;
var b=new Map;
var A=()=>{let e=b.get("external")??new Map([["responsive-mode","cc-plugin-responsive-mode"],["tips","cc-plugin-tips"],["mermaid","cc-plugin-mermaid"],["claude-test","cc-plugin-claude-test"],["agents-md","cc-plugin-agents-md"],["diff","cc-plugin-diff"],["telemetry","cc-plugin-telemetry"],["plugin-authoring","cc-plugin-plugin-authoring"],["sec-default","cc-plugin-sec-default"],...[]]);return b.set("external",e),e};
var m=()=>A();
var g=(e)=>[...m()].flatMap(([n,t])=>t===e?[n]:[]);
var $c="inline";
var du="skills-dir";
var Gd="synced";
var _i="builtin";
function Tp(e){return e===$c||e===du||e===Gd}
function DPe({name:e,source:n}){return n.endsWith(`@${_i}`)?[e,...h(e)]:[e]}
function h(e){let n=g(e);return n.length>0?n:g(Nr(e))}
function cbn(e){return Tp(e)||e===_i}
function vn(e){if(kse(e))return{name:e.slice(0,e.lastIndexOf("@")),marketplace:xh};if(e.startsWith("@")&&yfe(e))return{name:e};if(e.includes("@")){let n=e.split("@");return{name:n[0]||"",marketplace:n[1]}}return{name:e}}
function Nr(e){return e.normalize("NFC").toLowerCase()}

return {vn,DPe,cbn,Nr};
}
export function createHookEngineActivity287(ports){
const {FNe,Gwe,cbn,ie,t,ut,vn}=ports;
function QNn({kind:e,name:n}){switch(e){case"skill":return`${FNe(n,ie(" skill"))} skill`;case"command":{let g=ie("/")+ie(" command");return`/${FNe(n,g)} command`}case"workflow":{let g=ie("/")+ie(" workflow");return`/${FNe(n,g)} workflow`}case"agent":return`${FNe(n,ie(" agent"))} agent`;case"hook":return`${FNe(n,ie(" hook"))} hook`;case"mcp-server":{let r=Gwe(n)?.serverName??n,s=" MCP server";return`${FNe(r,ie(" MCP server"))} MCP server`}}}
var yst=64;
var mxr=6;
function _st(e,n){return`${e}\x00${(n??"").toLowerCase()}`}
function t0(e,n,r){let s=ut(),{name:g,marketplace:h}=vn(e);if(r.kind!=="hook"&&!cbn(h)){let b=QNn(r),w=_st(g,h),j=(s.pluginActivityFeatures.get(w)??[]).filter((z)=>z!==b);j.push(b),s.pluginActivityFeatures.set(w,j.slice(-mxr))}if((n==="hook"||n==="mcp")&&s.recentActivity.some((b)=>b.trigger===n&&b.name===g&&b.marketplace===h))return;if(s.recentActivity.push({name:g,marketplace:h,trigger:n,ts:Date.now()}),s.recentActivity.length>yst)s.recentActivity=s.recentActivity.slice(-yst);t(`pluginActivity: recorded ${n} for ${g}`,{level:"verbose"})}

return {t0};
}
export function createHookEnginePluginTiming287(ports){
const {Dn,U,V,Y,a}=ports;
var l=["runner_prep_total_ms","runner_prep_git_proxy_config_ms","runner_prep_reset_remote_ms","runner_prep_outcome_branch_ms","runner_prep_repo_settings_ms","runner_prep_config_seed_ms","runner_prep_remote_refetch_ms"];
var h={prewarm_vda_outcome:!0,prewarm_stat_outcome:!0,prewarm_idx_outcome:!0,prefetch_phase:!0,prefetch_phase_reason:!0};
var f=/^[a-z0-9_]{1,32}$/;
var m=604800;
var d={prewarm_vda_elapsed_s:m,prewarm_stat_elapsed_s:m,prefetch_runs:1e4,prefetch_ok:1e4,prefetch_last_ok_age_s:m,prefetch_last_duration_s:m,prefetch_midx:1e4,git_have_age_s:m,git_pack_count:1e4,standby_idle_s:m,healthz_claim_visible_ms:600000};
var S=3600000;
var b=600000;
var y=new Set(l);
function g(e){return Object.hasOwn(h,e)}
function R(e){return Object.hasOwn(d,e)}
function w(e){return y.has(e)}
function k(e){return!1}
function u(e,t){if(typeof e!=="number"||!Number.isFinite(e))return;let r=Math.round(e);return r<0?void 0:Math.min(r,t)}
function o(e,t){let r=Object.hasOwn(e,t)?Reflect.get(e,t):void 0;return typeof r==="object"&&r!==null?r:void 0}
function P(e){if(typeof e!=="object"||e===null)return;let t={};for(let[n,i]of Object.entries(o(e,"fields")??{}))if(g(n)){if(typeof i==="string"&&f.test(i))t[n]=i}else if(R(n)){let _=u(i,d[n]);if(_!==void 0)t[n]=_}let r={};for(let[n,i]of Object.entries(o(e,"phases")??{}))if(w(n)){let _=u(i,S);if(_!==void 0)r[n]=_}else if(k(n)){let _=u(i,b);if(_!==void 0)r[n]=_}if(Object.keys(t).length===0&&Object.keys(r).length===0)return;return{fields:t,phases:r}}
var v=8192;
function p(e){if(!e||e.length>v)return;try{return P(Y(e))}catch{return}}
class c{phases={};phaseStarts={};warmSpareClaimed=!1;hydratePrefetchSettledAt=void 0;resumeHydratePrefetch=void 0;resumeHydrateOnDiskBytes=void 0;resumeHydrateCcrBytes=void 0;resumeHydrateCcrEvents=void 0;resumeHydrateDeltaEvents=void 0;resumeHydrateDeltaFetchAttempted=void 0;resumeHydrateAnchorWalkback=void 0;pluginFullLoads=0;userContextBuilds=0;sdkMcpDialRuns=0;sdkMcpServersDialed=0;consumed=!1;apiRequestSentFromSpawnMs=void 0;apiRequestSentFromSpawnConsumed=!1;recordPhase(e,t,r){if(this.consumed)return;if(e==="skills_load_ms"&&this.phases[e]!==void 0)return;if(this.phases[e]=Math.round(t),r!==void 0)this.phaseStarts[e]=Math.round(r)}getRecordedPhase(e){return this.phases[e]}recordSpawnToExec(){let e=Number.parseInt(process.env.CCR_SPAWN_TIMESTAMP_MS??"",10);if(!Number.isFinite(e))return;this.recordPhase("spawn_to_exec_ms",Date.now()-process.uptime()*1000-e,e-performance.timeOrigin)}markWarmSpareClaimed(){this.warmSpareClaimed=!0}noteSdkMcpDial(e){if(e<=0)return;this.sdkMcpDialRuns++,this.sdkMcpServersDialed+=e}notePluginFullLoad(){if(this.consumed)return;this.pluginFullLoads++}noteUserContextBuild(){if(this.consumed)return;this.userContextBuilds++}wasWarmSpareClaimed(){return this.warmSpareClaimed}markHydratePrefetchSettled(){this.hydratePrefetchSettledAt=performance.now()}markResumeHydratePrefetch(e,t){this.resumeHydratePrefetch=e===null?"miss":this.hydratePrefetchSettledAt!==void 0&&this.hydratePrefetchSettledAt<t?"hit":"pending"}markResumeHydrateDelta(e,t,r,n,i,_){this.resumeHydrateOnDiskBytes=e,this.resumeHydrateCcrBytes=t,this.resumeHydrateCcrEvents=r,this.resumeHydrateDeltaEvents=n,this.resumeHydrateDeltaFetchAttempted=i,this.resumeHydrateAnchorWalkback=_}recordFirstMessageReadFromSpawn(){let e=Number.parseInt(process.env.CCR_SPAWN_TIMESTAMP_MS??"",10);if(!Number.isFinite(e))return;this.recordPhase("first_message_read_from_spawn_ms",Date.now()-e,e-performance.timeOrigin)}recordInputReadyFromSpawn(){let e=Number.parseInt(process.env.CCR_SPAWN_TIMESTAMP_MS??"",10);if(!Number.isFinite(e))return;this.recordPhase("input_ready_from_spawn_ms",Date.now()-e,e-performance.timeOrigin)}consume(){if(!a.CLAUDE_CODE_REMOTE&&!a.CLAUDE_CODE_EMIT_STARTUP_TIMING)return;if(this.consumed||Object.keys(this.phases).length===0)return;this.consumed=!0;let e=p(Dn.CCR_RUNNER_STARTUP_TIMING);return{...e?.fields,entrypoint:a.CLAUDE_CODE_ENTRYPOINT??"unknown",warm_spare_claimed:this.warmSpareClaimed,resume_hydrate_prefetch:this.resumeHydratePrefetch,resume_hydrate_on_disk_bytes:this.resumeHydrateOnDiskBytes,resume_hydrate_ccr_bytes:this.resumeHydrateCcrBytes,resume_hydrate_ccr_events:this.resumeHydrateCcrEvents,resume_hydrate_delta_events:this.resumeHydrateDeltaEvents,resume_hydrate_delta_fetch_attempted:this.resumeHydrateDeltaFetchAttempted,resume_hydrate_anchor_walkback:this.resumeHydrateAnchorWalkback,prewarm_vda:Dn.CCR_PREWARM_VDA,prewarm_stat:Dn.CCR_PREWARM_STAT,delta_reset:Dn.CCR_DELTA_RESET,prefetch_network:Dn.CCR_PREFETCH_NETWORK,plugin_full_loads:this.pluginFullLoads,user_context_builds:this.userContextBuilds,sdk_mcp_dial_runs:this.sdkMcpDialRuns,sdk_mcp_servers_dialed:this.sdkMcpServersDialed,phases:{...e?.phases,...this.phases},time_origin_ms:performance.timeOrigin,phase_start_ms:{...this.phaseStarts}}}recordApiRequestSentFromSpawn(){if(this.apiRequestSentFromSpawnMs!==void 0)return;let e=Number.parseInt(process.env.CCR_SPAWN_TIMESTAMP_MS??"",10);if(!Number.isFinite(e))return;this.apiRequestSentFromSpawnMs=Date.now()-e}consumeApiRequestSentFromSpawn(){if(this.apiRequestSentFromSpawnConsumed||this.apiRequestSentFromSpawnMs===void 0)return;return this.apiRequestSentFromSpawnConsumed=!0,{ms:this.apiRequestSentFromSpawnMs,warmSpareClaimed:this.warmSpareClaimed,timeOriginMs:performance.timeOrigin}}}
var F=new V(()=>new c);
function s(){return F.of(U().host)}
function M6o(){s().notePluginFullLoad()}

return {M6o,s};
}
export function createHookEnginePluginCache287(ports){
const {F,M6o,a,iqe,nqe,t,ut}=ports;
function Lb(e,n){let r=ut();if(r.pluginLoad!==void 0)return ktn("loadAllPlugins",r.pluginLoadArm,e),r.pluginLoad;let s=_tn(e);r.pluginLoadArm=s;let g=async()=>{let b=await iqe(()=>nqe({cacheOnly:!1,storageV5:e,credentials:n}),{storageV5:e});if(r.pluginLoad===h||(!F()||e===void 0)&&r.pluginLoadArm!=="v5"&&r.pluginLoadCacheOnlyArm!=="v5")r.pluginLoadCacheOnly=Promise.resolve(b),r.pluginLoadCacheOnlyArm=s;return b};M6o();let h=g();return r.pluginLoad=h,h}
function _tn(e){return F()&&e!==void 0?"v5":"raw"}
function ktn(e,n,r){if(F()&&r!==void 0&&n==="raw")t(`${e}: joining a plugin load that an earlier caller started without the storage backend (tengu_hover_rest); this caller's backend is not used for it`)}
function xi(e,n){let r=ut();if(r.pluginLoadCacheOnly!==void 0)return ktn("loadAllPluginsCacheOnly",r.pluginLoadCacheOnlyArm,e),r.pluginLoadCacheOnly;return r.pluginLoadCacheOnlyArm=_tn(e),r.pluginLoadCacheOnly=(async()=>{if(a.CLAUDE_CODE_SYNC_PLUGIN_INSTALL){let s=Lb(e,n);return r.pluginLoadCacheOnlyArm=r.pluginLoadArm,s}return iqe(()=>nqe({cacheOnly:!0,storageV5:e,credentials:void 0}),{storageV5:e})})(),r.pluginLoadCacheOnly}

return {xi,Lb};
}
export function createHookEngineNotice287(ports){
const {Me,Vm,cd}=ports;
function x7(e){return cd(e.replace(/\s+/g," ").trim(),Vm)}
var a$o=["elicitation","sandbox","managed-settings","permission","dialog","elicitation-queued","sandbox-queued"];
var EE=(()=>{let e=Me(),n={sandbox:null,"sandbox-queued":null,permission:null,elicitation:null,"elicitation-queued":null,"managed-settings":null,dialog:null},r=null,s=new Map,g=0,h=null;function b(){let _e;for(let ke of s.values()){if(ke.order===h)return ke.block;if(_e===void 0||(ke.onTop?!_e.onTop||ke.opened>_e.opened:!_e.onTop&&ke.order<_e.order))_e=ke}return _e?.block??null}let w=8,D=240,j=new Map;function z(_e){return cd(_e.replace(/[^\x20-\x7e]/g," ").replace(/ {2,}/g," ").trim(),D)}function K(_e){let ke=_e.toolUseID===void 0?void 0:j.get(_e.toolUseID);return ke===void 0?_e:{..._e,text:x7(`${z(ke)} \xB7 ${_e.text}`)}}function he(){let _e=null;for(let ke of a$o){let be=n[ke];if(be){_e=K(be);break}}if(_e?.text===r?.text)return;r=_e,e.emit(_e)}return{subscribe:e.subscribe,current(){return r},emit(_e,ke="permission"){let be=_e===null?null:typeof _e==="string"?{text:_e}:_e;if(ke==="permission"&&be===null)s.clear(),h=null;if(n[ke]?.text===be?.text)return;n[ke]=be,he()},openAsk(_e,ke){g+=1,s.set(_e.toolUseID,{block:_e,...ke,opened:g}),n.permission=b(),he()},showAsk(_e){if(_e===h)return;h=_e,n.permission=b(),he()},closeAsk(_e){if(!s.delete(_e))return;n.permission=b(),he()},noteHookFailure(_e,ke){if(j.delete(_e),j.set(_e,ke),j.size>w){let be=n.permission?.toolUseID;for(let ve of j.keys())if(ve!==be){j.delete(ve);break}}he()},clearHookFailure(_e){j.delete(_e)}}})();

return {EE};
}
export function createHookEngineSignal287(ports){
const {}=ports;
var s=globalThis.process?.getBuiltinModule?.("async_hooks");
var wKt=s?(e)=>s.AsyncResource.bind(e):(e)=>e;
function Me(){let e=new Set;return{subscribe(n){let r=wKt(n);return e.add(r),()=>{e.delete(r)}},emit(...n){let r;for(let o of e)try{o(...n)}catch(i){(r??=[]).push(i)}if(r)throw r.length===1?r[0]:AggregateError(r,"Signal listener(s) threw")},clear(){e.clear()}}}

return {Me};
}
export function createHookEnginePromptInvalidation287(ports){
const {n}=ports;
function rKt(e){n().promptAssembly.forgetAllSections(),yR(e)}
function yR(e){n().promptAssembly.noteInvalidation(e)}

return {rKt,yR};
}
export function createHookEnginePromptCompose287(ports){
const {$$,AG,Ce,Loe,M9,Uxe,ex,m0,nSe,oe,rD,yRt,yxn}=ports;
function dxn(e,n){let r=e.filter((b)=>b.text!==n),s=r.filter((b)=>b.scope==="shared"),g=r.filter((b)=>b.scope==="session"),h=n!==null&&s.length>0;return[...s.map((b)=>b.text),...h?[n]:[],...g.map((b)=>b.text)]}
async function kA(e,n,r){let s=await yxn(()=>mRt(e,n,r),(g)=>g===void 0?yRt(e,n,r):gRt(g,e,r?.isDetached===!0));return dxn(s,Loe()?rD:null)}
async function mRt(e,n,r){let s=M9(n),[g,h]=await Promise.all([m0(oe()),$$()]),b=[["bare",Uxe()],["lean",AG(s)],["sdk-preset",r?.excludeDynamicSections===!0],["teammate",r?.teammate===!0],["analysis",r?.analysisOnly===!0],["print",Ce()],["skills",g.length>0],["send-user-message",ex.isBriefEnabled()||nSe()]];return{model:n,promptModel:s,tools:e.map((w)=>w.name),outputStyle:h===null?null:{name:h.name,isKeepingCodingInstructions:h.keepCodingInstructions===!0},traits:b.filter(([,w])=>w).map(([w])=>w)}}
function gRt(e,n,r,s){let g=new Map(n.map((h)=>[h.name,h]));return yRt(e.tools.flatMap((h)=>g.get(h)??[]),e.model,{excludeDynamicSections:e.traits.includes("sdk-preset"),analysisOnly:e.traits.includes("analysis"),teammate:e.traits.includes("teammate"),isDetached:r,hookOrigin:s})}

return {kA,dxn,mRt,gRt};
}
export function createHookEnginePromptComposeRecords287(ports){
const {Loe,dxn,gRt,mRt,rD,yRt,yxn}=ports;
async function kA(e,n,r){let s=await yxn(()=>mRt(e,n,r),(g)=>g===void 0?yRt(e,n,r):gRt(g,e,r?.isDetached===!0));return dxn(s,Loe()?rD:null)}

return {kA};
}
export function createHookEnginePromptCells287(ports){
const {}=ports;
function Yb(){let e=null;return{get:()=>e,set:(n)=>{e=n}}}

return {Yb};
}
export function createHookEngineTruncate287(ports){
const {}=ports;
var Vm=800;
function cd(e,n){if(e.length<=n)return e;let t=n-1,i=e.charCodeAt(t-1);if(i>=55296&&i<=56319)t--;return e.slice(0,t)+"\u2026"}

return {cd,Vm};
}
export function createHookEngineRegistrySwap287(ports){
const {Gi,Net,Wz}=ports;
function iir(e){let t=Net();Gi();let o={};for(let[r,i]of Object.entries(e))o[r]=i.filter((s)=>!("pluginRoot"in s)||t?.holds(s.pluginId)!==!0);Wz(o)}

return {iir};
}
export function createHookEngineRegistrationRegistry287(ports){
const {c,n}=ports;
function R(){return c()??n().hookRegistry.holder()}
function Net(){return R().pluginHookRunner}

return {Net};
}
export function createHookEngineRegistration287(ports){
const {Awo,Bue,C9o,D6n,DN,DPe,Dct,E1,E9o,Er,Gr,I1,L,L6n,Lcn,Nr,QLt,QSe,Q_,Ro,Rwo,Ty,U6n,VE,Wb,XNo,Z,_wo,bwo,d,doe,fOt,iir,jNo,jq,k2t,l,m,p,qH,t,ut,xi,y,yr}=ports;
function Cwo(e){let n={PreToolUse:[],PostToolUse:[],PostToolUseFailure:[],PostToolBatch:[],PermissionDenied:[],Notification:[],UserPromptSubmit:[],UserPromptExpansion:[],SessionStart:[],SessionEnd:[],Stop:[],StopFailure:[],SubagentStart:[],SubagentStop:[],PreCompact:[],PostCompact:[],PreModelSwitch:[],PostModelSwitch:[],PermissionRequest:[],Setup:[],TeammateIdle:[],TaskCreated:[],TaskCompleted:[],Elicitation:[],ElicitationResult:[],ConfigChange:[],WorktreeCreate:[],WorktreeRemove:[],InstructionsLoaded:[],CwdChanged:[],FileChanged:[],DirectoryAdded:[],MessageDisplay:[]};if(!e.hooksConfig)return n;for(let[r,s]of Object.entries(e.hooksConfig)){let g=r;if(!n[g])continue;for(let h of s)if(h.hooks.length>0)n[g].push({matcher:h.matcher,hooks:h.hooks,pluginRoot:e.path,pluginName:e.name,pluginId:e.source})}return n}
function GLt(e,n){let r=(g)=>n?.has(g.source)===!0,s=(g)=>E1(g.source);return[...e.filter(r),...e.filter((g)=>!r(g)&&s(g)),...e.filter((g)=>!r(g)&&!s(g))]}
function Pwo(e){if(!yr())return[...e];return t("Safe mode: installed plugins are disabled, none of their hooks or hooks modules load; built-in plugins load regardless"),e.filter((n)=>VE(n.source))}
async function R7(e,n){let r=ut();if(r.hookModulesAwaitTrust&&qH())B6n();let s=r.hookRegistration===void 0,g=!1,h=!1,b,w;if(r.hookRegistration??=(async()=>{let D,j,z=++r.hookRegistrationEpoch,K=!qH();r.hookModulesAwaitTrust=K;let he=K&&Dct();try{let _e=await xi(e,n),{disabled:ke,errors:be}=_e,ve=Pwo(_e.enabled);if(j=r.hookRegistration,ut()!==r)return;let Te={PreToolUse:[],PostToolUse:[],PostToolUseFailure:[],PostToolBatch:[],PermissionDenied:[],Notification:[],UserPromptSubmit:[],UserPromptExpansion:[],SessionStart:[],SessionEnd:[],Stop:[],StopFailure:[],SubagentStart:[],SubagentStop:[],PreCompact:[],PostCompact:[],PreModelSwitch:[],PostModelSwitch:[],PermissionRequest:[],Setup:[],TeammateIdle:[],TaskCreated:[],TaskCompleted:[],Elicitation:[],ElicitationResult:[],ConfigChange:[],WorktreeCreate:[],WorktreeRemove:[],InstructionsLoaded:[],CwdChanged:[],FileChanged:[],DirectoryAdded:[],MessageDisplay:[]},xe=I1(),Pe=GLt(ve,xe),$e=new Set,Ne=new Set(Pe.filter((to)=>to.modulePath!==void 0).map((to)=>Nr(to.source)));for(let to of Pe){if(!to.hooksConfig)continue;let ao=DPe(to);if(ao.some(($o)=>$e.has($o))){t(`Skipping duplicate hook registration for plugin "${to.name}" from ${to.source} - already registered from another source`);continue}for(let $o of ao)$e.add($o);t(`Loading hooks from plugin: ${to.name}`);let mo=Cwo(to);for(let $o of Object.keys(mo)){if(mo[$o].length>0)Ne.add(Nr(to.source));Te[$o].push(...mo[$o])}}let We=new Set(ve.map((to)=>to.name)),qe=be.filter((to)=>to.type==="hook-load-failed"&&We.has(to.plugin)),Qe=be.filter((to)=>(to.type==="path-traversal"||to.type==="path-not-found")&&to.component==="hooks"&&to.plugin!==void 0&&We.has(to.plugin)),Ze=new Set([...qe,...Qe].flatMap(Iwo)),et=new Set(ve.map((to)=>Nr(to.source))),bt=r.pluginsWithHooks;for(let to of et)if(Ne.has(to)||Ze.has(to))bt.add(to);if(r.hookSwapEpoch>z){t("Plugin hooks: a newer registration pass already registered; keeping its hooks");for(let ao of r.unlatchedAbsentManagedIds)if(bt.has(ao)&&et.has(ao)){t(`Plugin hooks: ${ao} was seen with hooks by an earlier load but dropped in the registered one \u2014 hooks unknown`,{level:"warn"}),r.hooksUnknownCause=DOe(ao);break}let to=r.hookRegistrationInFlight;if(to!==void 0&&to!==w)await to.catch(()=>{});return}if(r.hookSwapEpoch=z,iir(Te),r.hookRegistrationEpoch===z){for(let to of et)if(!Ne.has(to)&&!Ze.has(to))bt.delete(to)}_wo(),XNo(ve);let ht=DN(),kt=Rwo(GLt(ve,ht),{isManaged:(to)=>ht?.has(to.source)===!0,hooksDisabled:Gr("hooks"),managedOnly:Ty(),allDisabled:Wb(),builtinsOnly:Awo()}),$t=(to)=>!K||he&&VE(to.source),It=kt.filter((to)=>!$t(to));if(It.length>0)t("hooks modules not loaded until workspace trust is accepted: "+It.map((to)=>to.name).join(", "));let jt=kt.filter($t),Xt=L6n.now();if(!K||he)D=await D6n(U6n(jt,ht,jq())).then(()=>{return},(to)=>(d(Z(to)),{error:to}));let un=!K&&!yr();if(fOt(un?kt:[],un?[...ve,...ke]:[],{readAt:Xt}),un)Lcn.get()?.();if(r.hookSwapEpoch===z)await bwo(jt,[...ve,...ke]);let rn=Object.values(Te).reduce((to,ao)=>to+ao.reduce((mo,$o)=>mo+$o.hooks.length,0),0);t(`Registered ${rn} hooks from ${ve.length} plugins`);let Yt=xe===null?null:new Set([...xe].map(Nr)),Qt=xe===null?null:new Set([...xe].map((to)=>Nr(to.slice(to.lastIndexOf("@")+1)))),nn=(to)=>Yt!==null&&Yt.has(Nr(to)),Pn=(to)=>{if(xe===null||Qt===null)return!1;if("pluginId"in to&&to.pluginId&&nn(to.pluginId))return!0;if("source"in to){if(nn(to.source))return!0;let ao=QLt(to.source),mo="plugin"in to?to.plugin:void 0;if(ao!==void 0){if(mo!==void 0){if(nn(`${mo}@${ao}`))return!0}else if([...Yt??[]].some(($o)=>$o.endsWith(`@${ao}`)&&!et.has($o)))return!0}}if(Bue(to)!==void 0)return!1;if("marketplace"in to)return Qt.has(Nr(to.marketplace));return!0},$n=be.filter((to)=>Owo(to)&&Pn(to)),qn=new Set(be.flatMap((to)=>to.type==="marketplace-blocked-by-policy"&&to.sourceUnverifiable!==!0?[Nr(to.source)]:[])),En=(to)=>!et.has(to)&&!qn.has(to),zn;for(let to of bt)if(nn(to)&&En(to)){zn=to;break}let xn=qe.find(Pn)??Qe.find(Pn),Jn=xn??$n.find((to)=>!LOe(to));if(b=Jn!==void 0?`managed plugin "${Bue(Jn)??Jn.source}" ${Jn===xn?"loaded without its hooks":"did not load"} (${Q_(Jn)})`:zn!==void 0?DOe(zn):void 0,r.hookSwapEpoch===z){let to=new Set;if(b===void 0&&Yt!==null){for(let ao of Yt)if(En(ao))to.add(ao)}r.unlatchedAbsentManagedIds=to}let wn=$n.filter(LOe),eo=$n.filter((to)=>!LOe(to));if(wn.length>0){let to=L(wn.map((ao)=>ao.type)).join(", ");t(`Plugin hooks: ${wn.length} managed plugin(s) not materialized on this machine (${to}: the marketplace is not registered here, its catalog is not loaded, or the plugin was never fetched) \u2014 any hooks those plugins deliver are absent this session`)}if(eo.length>0){let to=L(eo.map((ao)=>ao.type)).join(", ");t(`Plugin hooks: ${eo.length} managed plugin load error(s) (${to}) \u2014 any hooks those plugins deliver are absent this session`,{level:"warn"})}else if(zn!==void 0)t("Plugin hooks: a managed plugin that registered hooks earlier this session did not load \u2014 hooks unknown",{level:"warn"});if(qe.length>0)m("plugin_load_hooks","plugin_hooks_file_load_failed",{hook_error_count:Er(qe.length),registered_hooks:Er(rn),plugin_count:Er(ve.length)});else if(Qe.length>0)m("plugin_load_hooks","plugin_hooks_path_invalid",{hook_error_count:Er(Qe.length),registered_hooks:Er(rn)});else if($n.length>0||zn!==void 0)p("plugin_load_hooks","managed_plugin_unloaded",{hook_error_count:Er($n.length),registered_hooks:Er(rn)});else y("plugin_load_hooks")}catch(_e){throw m("plugin_load_hooks","plugin_hooks_register_failed"),_e}if(D!==void 0){if(w!==void 0&&j===w&&r.hookRegistration===j)r.hookRegistration=void 0,h=!0;else if(r.hookRegistration===j)r.hookRegistration=void 0;throw g=!0,D.error}})(),s){let D=r.hookRegistration;w=D,r.hookRegistrationInFlight=D,r.hookRegistrationArgs={storageV5:e,credentials:n};let j=(z)=>{if(r.hookRegistration===D||r.hookRegistration===void 0&&h){let he;for(let _e of r.unlatchedAbsentManagedIds)if(r.pluginsWithHooks.has(_e)){he=DOe(_e);break}r.hooksUnknownCause=z??he}else if(r.hookRegistration===void 0&&z!==void 0)r.hooksUnknownCause=z};D.then(()=>j(b),(z)=>{if(g){j(b);return}let K=doe();j(K||I1()!==null?`plugins could not be loaded (${l(z)})${K?", nor could managed settings be read":""}`:void 0)}).finally(()=>{if(r.hookRegistrationInFlight===D)r.hookRegistrationInFlight=void 0})}await r.hookRegistration}
function B6n(){ut().hookRegistration=void 0}
function DOe(e){return`managed plugin ${e} registered hooks earlier this session and is missing from the latest plugin load`}
function Iwo(e){let n=[];if("pluginId"in e&&e.pluginId)n.push(Nr(e.pluginId));if("source"in e){n.push(Nr(e.source));let r=QLt(e.source);if("plugin"in e&&e.plugin!==void 0&&r!==void 0)n.push(Nr(`${e.plugin}@${r}`))}return n}
function LOe(e){switch(e.type){case"marketplace-not-found":return e.registryReadFailed!==!0&&e.registrationHidden===void 0;case"marketplace-blocked-by-policy":return!0;case"marketplace-load-failed":return e.catalogReadFailed!==!0&&e.untrustedReservedName!==!0;case"plugin-cache-miss":return e.installPath===k2t&&e.registryReadFailed!==!0&&e.seedHasOtherVersion!==!0;default:return!1}}
function Owo(e){return QSe(e)||e.type==="path-not-found"&&e.plugin===void 0||e.type==="marketplace-load-failed"||e.type==="marketplace-not-found"||e.type==="plugin-not-found"||e.type==="marketplace-blocked-by-policy"&&e.sourceUnverifiable===!0}
function yy(e){if(e)t(`clearPluginCache: invalidating loadAllPlugins cache (${e})`);let n=ut();if(n.pluginLoad=void 0,n.pluginLoadArm=void 0,n.pluginLoadCacheOnly=void 0,n.pluginLoadCacheOnlyArm=void 0,jNo(),E9o()!==void 0)Ro();C9o()}

return {R7,yy,Cwo,B6n};
}
export function createHookEngineClassicPresence287(ports){
const {SJn,dd}=ports;
var GBn=(e)=>e!=="PreToolUse"&&SJn.includes(e);
var Qrt=(e)=>GBn(e)&&dd(`classic.${e}`);

return {Qrt};
}
export function createHookEngineRegistry287(ports){
const {}=ports;
class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}

return {V};
}
export function createHookEngineRegistrationGate287(ports){
const {}=ports;
class qi{committed=!1}
var Hi=new qi;
function Dr(){return Hi.committed}
function Xoe(){Hi.committed=!0}
var yR=new Promise(()=>{});
function oS(){return yR}

return {Dr,Xoe,oS,Hi};
}
export function createHookEnginePromptContext287(ports){
const {$Fo,AIr,Bwe,CBo,DG,DOn,Ex,FX,LG,M9,Oe,Oes,S0,S6n,VDn,XIn,XKe,Xxn,Y5,Yb,ZGo,aJ,crt,dd,dyt,e9e,eu,gRt,hRt,i_n,kLt,l,l_n,mDn,mRt,rKt,rot,sxn,t,uIn,xP,yOn,ypt}=ports;
var bX={site:eu["agent.offer"],core:{name:"core",isCore:!0,budgetMs:0,run:async()=>({isOffered:!0})}};
function wX(e,n,r){let s=r===void 0?[]:[r];return e===void 0||n.length===0?[...n,...s]:[e,...n,...s]}
var vX=(e)=>e.to==="collector"?e:{...e,to:e.to??"anthropic"};
var Att={"tool.call":(e)=>({...e,tool_use_id:e.tool_use_id??`toolu_${sxn().replace(/-/g,"")}`}),"tool.check":(e)=>e,"tool.describe":(e)=>e,"command.run":(e)=>e,"command.describe":(e)=>e,"config.set":(e)=>e,"config.describe":(e)=>e,"telemetry.log":vX,"telemetry.mark":(e)=>e,"prompt.submit":(e)=>e,"prompt.fill":(e)=>e,"prompt.edit":(e)=>e,"prompt.suggest":(e)=>e,"prompt.section":(e)=>e,"prompt.context":(e)=>e,"prompt.attachment":(e)=>e,"prompt.compose":(e)=>e,"agent.offer":(e)=>e,"agent.spawn":(e)=>e,"skill.prompt":(e)=>e,"attribution.text":(e)=>e,"session.start":(e)=>e,"session.receive":(e)=>e,"session.append":(e)=>e,"session.send":(e)=>e,"session.compact":(e)=>e,"session.attach":(e)=>e,"session.detach":(e)=>e,"session.measure":(e)=>e,"session.end":(e)=>e,"turn.start":(e)=>e,"turn.step":(e)=>e,"turn.complete":(e)=>e,"ui.scroll":(e)=>e,"ui.focus":(e)=>e};
function uxn(){let e=Yb(),n=Yb();return{setPromptComposeResolver:e.set,setPromptComposer:n.set,promptComposer:()=>n.get()??void 0,composeSections:(r,s)=>e.get()?.(r,s)??s()}}
var yR=uxn();
var yxn=yR.composeSections;
var Mtt=yR.promptComposer;
var _xn=yR.setPromptComposeResolver;
var kxn=yR.setPromptComposer;
function r7(){let e=xP()?.surface==="terminal",n=Y5.surfaces().filter((r)=>r!=="terminal");return e?["terminal",...n]:n}
var bxn=(e,n)=>dd("prompt.compose")?e().then((r)=>fa("prompt.compose",{core:{"prompt.compose":{name:"core",isCore:!0,budgetMs:0,run:async(s)=>({sections:await n(s)})}}})({...r,surfaces:r7()})).then((r)=>r.sections,(r)=>(t(`prompt.compose: the dispatch failed, the engine composes the prompt itself: ${l(r)}`,{level:"error"}),n())):void 0;
function Ott(e){e.refreshContext()}
function Cxn(){let e=Yb(),n=Yb(),r;function s(){r=void 0,n.get()?.()}return{setPromptContextResolver:e.set,resolvePromptContext:(g)=>{let h=e.get()?.(g);return r=h!==void 0,h},setPromptContextInvalidator:n.set,invalidatePromptContext:s,invalidateHookedPromptContext:(g)=>{if(r!==void 0&&(r||g))s()}}}
var gw=Cxn();
var Pxn=gw.invalidateHookedPromptContext;
var Mxn=gw.invalidatePromptContext;
var Ixn=gw.resolvePromptContext;
var Oxn=gw.setPromptContextInvalidator;
var Dxn=gw.setPromptContextResolver;
var Lxn=()=>Oes(Ott);
var Nxn=(e)=>{if(!dd("prompt.context"))return;let n=e();return fa("prompt.context",{})(n).then((r)=>({blocks:r.blocks,instructionFiles:r.instructionFiles}),(r)=>(t(`prompt.context: the dispatch failed, the context stands as core computed it: ${l(r)}`,{level:"error"}),n))};
var Fxn=(e,n,r)=>dd("prompt.section")?fa("prompt.section",{...r!==void 0&&{origin:r}})({name:e,text:n}).then((s)=>s.text):Promise.resolve(n);
var Gnt={"prompt.section":(e)=>({text:e.text}),"prompt.attachment":(e)=>({text:e.text}),"skill.prompt":(e)=>({text:e.text}),"attribution.text":(e)=>({text:e.text}),"session.receive":(e)=>({text:e.text})};
var $p=(e,n)=>({site:eu[e],core:{name:"core",isCore:!0,budgetMs:0,run:async(r)=>n(r)}});
var yw=(e)=>$p(e,Gnt[e]);
var LX=yw("attribution.text");
var NX={site:eu["command.describe"],core:{name:"core",isCore:!0,budgetMs:0,run:async(e)=>Bwe(e)}};
var SF={site:eu["config.describe"],core:{name:"core",isCore:!0,budgetMs:0,run:async(e)=>FX(e)}};
var $X=yw("prompt.attachment");
async function Uwe(e,n){let r=xP(),s=r&&{tools:r.tools(),model:r.model()};return{sections:await Mtt()?.detachedSections(e,s,n)??[]}}
var yG=$p("prompt.compose",(e)=>Uwe(e));
var BX={site:eu["prompt.context"],core:{name:"core",isCore:!0,budgetMs:0,run:async(e)=>({blocks:e.blocks,instructionFiles:e.instructionFiles})}};
var UX=$p("prompt.edit",kLt);
var GX=$p("prompt.fill",(e)=>rot(e.text,e.mode,e.decorations));
var zX=yw("prompt.section");
var qX=$p("prompt.suggest",(e)=>AIr(e.text));
var hDr=$p("session.append",async(e)=>{let n=XKe.get();if(n===null)throw new Oe("$.session.append: this process keeps no conversation to append to");return(await n()).callAppended(e)});
var Fh=(e)=>$p(e,ZGo[e]);
var lot=Fh("session.attach");
var dot=Fh("session.detach");
var KX=Fh("session.end");
var VX=Fh("session.measure");
var QX=yw("session.receive");
var JX=Fh("session.start");
var ZX=yw("skill.prompt");
var e7={site:eu["telemetry.log"],core:{name:"core",isCore:!0,budgetMs:0,run:async(e,n)=>{if(e.to==="collector"&&!n.signal.aborted)$Fo(uIn(e),e.event);return{value:void 0}}}};
var t7=$p("telemetry.mark",()=>({value:void 0}));
var n7={site:eu["tool.describe"],core:{name:"core",isCore:!0,budgetMs:0,run:async(e)=>{let{description:n,isDeferred:r}=e;return r===!0?{description:n,isDeferred:r}:{description:n}}}};
var wot=Fh("turn.complete");
var vot=Fh("turn.start");
var nQ=$p("ui.scroll",DG);
var rQ=$p("ui.focus",LG);
var Mot=()=>({"agent.offer":bX.core,"attribution.text":LX.core,"command.describe":NX.core,"config.describe":SF.core,"telemetry.log":e7.core,"telemetry.mark":t7.core,"prompt.section":zX.core,"prompt.context":BX.core,"prompt.attachment":$X.core,"prompt.compose":yG.core,"prompt.fill":GX.core,"prompt.edit":UX.core,"prompt.suggest":qX.core,"skill.prompt":ZX.core,"tool.describe":n7.core,"session.start":JX.core,"session.receive":QX.core,"session.append":hDr.core,"session.attach":lot.core,"session.detach":dot.core,"session.measure":VX.core,"session.end":KX.core,"turn.start":vot.core,"turn.complete":wot.core,"ui.scroll":nQ.core,"ui.focus":rQ.core});
var Iot=new Set(["config.describe","command.describe","tool.describe","agent.offer"]);
var Eae=()=>({"tool.call":CBo,"tool.check":Xxn,"tool.describe":n7.site,"command.run":yOn,"command.describe":NX.site,"config.set":DOn,"config.describe":SF.site,"telemetry.log":e7.site,"telemetry.mark":t7.site,"prompt.submit":mDn,"prompt.fill":GX.site,"prompt.edit":UX.site,"prompt.suggest":qX.site,"prompt.section":zX.site,"prompt.context":BX.site,"prompt.attachment":$X.site,"prompt.compose":yG.site,"agent.offer":bX.site,"agent.spawn":XIn,"skill.prompt":ZX.site,"attribution.text":LX.site,"session.start":JX.site,"session.receive":QX.site,"session.append":hDr.site,"session.send":crt,"session.compact":VDn,"session.attach":lot.site,"session.detach":dot.site,"session.measure":VX.site,"session.end":KX.site,"turn.start":vot.site,"turn.step":S6n,"turn.complete":wot.site,"ui.scroll":nQ.site,"ui.focus":rQ.site});
function w1t(e,n){let r=e.findIndex((s)=>s.answersForEngine===!0);return e.toSpliced(r===-1?e.length:r,0,n)}
var fa=(e,n)=>(r)=>{let s=dyt(),g=s?void 0:n.core?.[e]??Mot()[e];if(g===void 0&&!s)return Promise.reject(new Oe(`$.${e}: no core at the bottom of the chain (the site did not install one and the call supplied none)`));let h=Att[e](r),b=Eae()[e],w=n.withoutModuleHandlers?[]:S0(e,n.origin,{only:n.only,...b.pinnedKeys!==void 0&&{pinned:{keys:b.pinnedKeys,e:h}}}),D=s?void 0:n.managed?.[e],j=s?n.withheldCore?.[e]:void 0,z=j===void 0?w:w1t(w,j),K=wX(D,z,g),he=D!==void 0&&w.length===0&&b.pinnedKeys!==void 0&&!n.withoutModuleHandlers&&ypt(e,n.origin,{only:n.only}).length>0,_e=Ex({e:h,handlers:he?[D,...K]:K,site:b,signal:n.signal,cutAt:n.cutAt,origin:aJ(n.origin),trace:n.trace});return Iot.has(e)?_e.then((ke)=>e9e(ke)):_e};
i_n(rKt);
_xn(bxn);
Oxn(Lxn);
Dxn(Nxn);
l_n(Fxn);
kxn({facts:(e,n)=>mRt(e,n),detachedSections:(e,n,r)=>{if(n!==void 0)hRt(M9(n.model));return gRt(e,n?.tools??[],!0,r)}});
return {gw,Ixn,Mxn,Pxn,Oxn,Dxn,Nxn,Lxn,fa,wX,w1t,yxn,Mtt,_xn,kxn,bxn,Fxn,Uwe,r7};
}
