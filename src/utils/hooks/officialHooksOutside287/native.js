export function createHooksOutside287(ports){
function module0(imports){

function Le(e){if(!e)return!1;if(typeof e==="boolean")return e;let n=String(e).toLowerCase().trim();return["1","true","yes","on"].includes(n)};
function gs(e){if(e===void 0)return!1;if(typeof e==="boolean")return!e;let n=String(e).toLowerCase().trim();return["0","false","no","off"].includes(n)};
var s=globalThis.process?.getBuiltinModule?.("async_hooks");
var wKt=s?(e)=>s.AsyncResource.bind(e):(e)=>e;
function Me(){let e=new Set;return{subscribe(n){let r=wKt(n);return e.add(r),()=>{e.delete(r)}},emit(...n){let r;for(let o of e)try{o(...n)}catch(i){(r??=[]).push(i)}if(r)throw r.length===1?r[0]:AggregateError(r,"Signal listener(s) threw")},clear(){e.clear()}}};
return {Le,gs,s,wKt,Me};
}
function module1(imports){
const f=imports["f"];
const o=imports["o"];
const uO=imports["uO"];
const tR=imports["tR"];
const Le=imports["Le"];
var KF=["acceptEdits","auto","bypassPermissions","default","dontAsk","plan"];
var YF="manual";
function Tg(e){return e==="manual"?"default":e};
function N(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)};
var nu=["low","medium","high","xhigh","max"];
var Kj=["CLAUDE_CODE_USE_BEDROCK","CLAUDE_CODE_USE_VERTEX","CLAUDE_CODE_USE_FOUNDRY","CLAUDE_CODE_USE_ANTHROPIC_AWS","CLAUDE_CODE_USE_ANTHROPIC_GOOGLE_CLOUD","CLAUDE_CODE_USE_MANTLE","CLAUDE_CODE_USE_GATEWAY","ANTHROPIC_FOUNDRY_RESOURCE","ANTHROPIC_VERTEX_PROJECT_ID","ANTHROPIC_AWS_WORKSPACE_ID","ANTHROPIC_GOOGLE_CLOUD_PROJECT","ANTHROPIC_GOOGLE_CLOUD_LOCATION","ANTHROPIC_GOOGLE_CLOUD_WORKSPACE_ID","CLOUD_ML_REGION"];
var mo=["CLAUDE_CODE_USE_BEDROCK","CLAUDE_CODE_USE_ANTHROPIC_AWS","CLAUDE_CODE_USE_MANTLE"];
var jc=["AWS_BEARER_TOKEN_BEDROCK","ANTHROPIC_AWS_API_KEY"];
var dr=["CLAUDE_CODE_MEMORY_API_BASE_URL","CLAUDE_CODE_MEMORY_API_TOKEN"];
function Awe(e){return dr.includes(e)};
var qF=["ANTHROPIC_BASE_URL","_CLAUDE_CODE_ASSUME_FIRST_PARTY_BASE_URL","ANTHROPIC_BEDROCK_BASE_URL","ANTHROPIC_VERTEX_BASE_URL","ANTHROPIC_FOUNDRY_BASE_URL","ANTHROPIC_AWS_BASE_URL","ANTHROPIC_GOOGLE_CLOUD_BASE_URL","ANTHROPIC_BEDROCK_MANTLE_BASE_URL","CLAUDE_CODE_ARTIFACTS_API_BASE_URL","CLAUDE_CODE_ARTIFACTS_API_TOKEN","CLAUDE_CODE_ARTIFACT_ASSET_BASE_URL","CLAUDE_CODE_ARTIFACT_LIVE_BASE_URL","CLAUDE_CODE_ARTIFACT_SYNC_BASE_URL","CLAUDE_CODE_ARTIFACT_VIEWER_BASE_URL",...dr];
var uL=["ANTHROPIC_API_KEY","ANTHROPIC_AUTH_TOKEN","CLAUDE_CODE_OAUTH_TOKEN","AWS_BEARER_TOKEN_BEDROCK","ANTHROPIC_FOUNDRY_API_KEY","ANTHROPIC_FOUNDRY_AUTH_TOKEN","ANTHROPIC_AWS_API_KEY"];
var xzt=["CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR","CLAUDE_CODE_GATEWAY_TOKEN_FILE_DESCRIPTOR","CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR","CLAUDE_CODE_WEBSOCKET_AUTH_FILE_DESCRIPTOR"];
var Pzt=["CLAUDE_CODE_OAUTH_TOKEN",...xzt,"CLAUDE_CODE_ARTIFACTS_API_TOKEN","CLAUDE_CODE_SLACK_TAG_TOKEN","CLAUDE_CODE_HFI_BEARER_TOKEN","CLAUDE_BRIDGE_OAUTH_TOKEN","CLAUDE_TRUSTED_DEVICE_TOKEN","AGENT_PROXY_AUTH_TOKEN","CLAUDE_CODE_MCP_SERVE_AUTH_TOKEN","CLAUDE_BG_AUTH_SNAPSHOT_PATH","CLAUDE_BG_SOCKET_TOKENS_PATH","CLAUDE_BG_RV_AUTH","CLAUDE_BG_PTY_AUTH","CLAUDE_BG_CLAIM_AUTH"];
var fo=["AWS_ACCESS_KEY_ID","AWS_SECRET_ACCESS_KEY","AWS_SESSION_TOKEN"];
var FSt=[...fo,"AWS_PROFILE","AWS_CONFIG_FILE","AWS_SHARED_CREDENTIALS_FILE","GOOGLE_APPLICATION_CREDENTIALS","GOOGLE_CLOUD_PROJECT"];
var xje=["ANTHROPIC_UNIX_SOCKET","CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST","CLAUDE_CODE_HOST_AUTH_ENV_VAR"];
function Pje(e){if(!Le(e.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST))return[];let n=mo.some((i)=>Le(e[i])),s=!!e.CLAUDE_CODE_HOST_AUTH_ENV_VAR||jc.some((i)=>!!e[i])||!!e.AWS_PROFILE||!!e.AWS_CONFIG_FILE||!!e.AWS_SHARED_CREDENTIALS_FILE,r=FSt.filter((i)=>e[i]==="");return["ANTHROPIC_CUSTOM_HEADERS",...uL,...n&&s?fo:[],...r,hK(e),"CLAUDE_CODE_HOST_CREDS_FILE"].filter((i)=>!!i)};
function hK(e){let n=e.CLAUDE_CODE_HOST_AUTH_ENV_VAR;if(!n||xje.includes(n)||Kj.includes(n))return;return n};
function Ts(e){return e.type==="connected"||e.type==="cached"};
var Ag=["PreToolUse","PostToolUse","PostToolUseFailure","PostToolBatch","Notification","UserPromptSubmit","UserPromptExpansion","SessionStart","SessionEnd","Stop","StopFailure","SubagentStart","SubagentStop","PreCompact","PostCompact","PreModelSwitch","PostModelSwitch","PermissionRequest","PermissionDenied","Setup","TeammateIdle","TaskCreated","TaskCompleted","Elicitation","ElicitationResult","ConfigChange","WorktreeCreate","WorktreeRemove","InstructionsLoaded","CwdChanged","FileChanged","DirectoryAdded","MessageDisplay"];
var SK=new Set(["PreToolUse","PermissionRequest"]);
var Pi=["healthcare"];
var Jzt=new Set(["claude-community","claude-plugins-community",...Pi]);
var w0e=new Set(["claude-code-marketplace","claude-code-plugins","claude-plugins-official","anthropic-marketplace","anthropic-plugins","agent-skills","anthropic-agent-skills","life-sciences","knowledge-work-plugins","claude-for-legal","claude-for-financial-services","financial-services-plugins","first-party-plugins","claude-tag-plugins"]);
var Vo={inline:"--plugin-dir session plugins",builtin:"built-in plugins","skills-dir":"plugins auto-loaded from .claude/skills/",synced:"plugins synced from your claude.ai account","claude-plugin-test":"plugins loaded by claude plugin test",npm:"plugins installed from an npm registry (`<package>@npm`); remove this marketplace and add it again under another name",pip:"plugins installed from a Python package index (reserved; not yet available)",uv:"plugins installed from a Python package index through uv (reserved; not yet available)",cargo:"plugins installed from a Rust crate registry (reserved; not yet available)",github:"plugins installed straight from a GitHub repository (`<owner>/<repo>@github`; reserved; not yet available)",gh:"plugins installed straight from a GitHub repository (reserved; not yet available)"};
var xh="npm";
function yz(e){return Object.hasOwn(Vo,e)};
var eg=/^@[a-z0-9][a-z0-9-._]*\/[a-z0-9][a-z0-9-._]*$/;
var tg=/^[a-z0-9][a-z0-9-._]*$/;
function yfe(e){return!e.includes("..")&&!e.includes("//")&&(eg.test(e)||tg.test(e))};
var $o="[A-Za-z0-9][-A-Za-z0-9._]*";
var Cg=new RegExp(`^${$o}@${$o}$`);
var wi=`@${xh}`;
function kse(e){return e.endsWith(wi)&&yfe(e.slice(0,-wi.length))};
var Ux=f(()=>o().refine((e)=>Cg.test(e)||kse(e),"Plugin ID must be in format: plugin@marketplace"));
function SXr(e){let n=uO(e);if(n.composes==="tier")return[n.helper];let{tiers:s,tierSources:r,present:i,merged:d,snapshotFirst:c}=tR(e),p=s.filter((g,h)=>r[h]==="file"?i.file:r[h]!=="remote"&&i.mdm);if(d)return p;if(i.remote&&!c)return[];return p.slice(0,1)};
return {KF,YF,Tg,N,nu,Kj,mo,jc,dr,Awe,qF,uL,xzt,Pzt,fo,FSt,xje,Pje,hK,Ts,Ag,SK,Pi,Jzt,w0e,Vo,xh,yz,eg,tg,yfe,$o,Cg,wi,kse,Ux,SXr};
}
function module2(imports){
const w0e=imports["w0e"];
const Jzt=imports["Jzt"];
const Ux=imports["Ux"];
const yz=imports["yz"];
var ebn="anthropic-skills";
var b=new Map;
var A=()=>{let e=b.get("external")??new Map([["responsive-mode","cc-plugin-responsive-mode"],["tips","cc-plugin-tips"],["mermaid","cc-plugin-mermaid"],["claude-test","cc-plugin-claude-test"],["agents-md","cc-plugin-agents-md"],["diff","cc-plugin-diff"],["telemetry","cc-plugin-telemetry"],["plugin-authoring","cc-plugin-plugin-authoring"],["sec-default","cc-plugin-sec-default"],...[]]);return b.set("external",e),e};
var m=()=>A();
var g=(e)=>[...m()].flatMap(([n,t])=>t===e?[n]:[]);
var Dzo=(e)=>g(e).at(-1);
var gn="anthropic-plugin-directory";
function T(e){return B(e)||e==="synced"};
function B(e){return e==="inline"};
var $c="inline";
var Gd="synced";
var _i="builtin";
function P(e){let n=e.lastIndexOf("@");return n>0&&lbn(e.slice(n+1))===_i?e.slice(0,n):void 0};
function ZA(e){let n=P(e);return n===void 0?[]:h(n).map((t)=>`${t}@${_i}`).toReversed()};
function h(e){let n=g(e);return n.length>0?n:g(Nr(e))};
function lbn(e){let n=e.toLowerCase();return yz(n)?n:e};
function qG(e){let n=e.lastIndexOf("@");if(n<0)return{name:e};return{name:e.slice(0,n),marketplace:e.slice(n+1)}};
function Yl(e){let{name:n,marketplace:t}=qG(e);if((R7e(t)||t===_i||t===gn)&&!Ux().safeParse(e).success)return{name:n};return{name:n,marketplace:t}};
function Nr(e){return e.normalize("NFC").toLowerCase()};
function el(e){return e!==void 0&&w0e.has(e.toLowerCase())};
function R7e(e){return el(e)||e!==void 0&&Jzt.has(e.toLowerCase())};
var q=new Set([ebn,"core","cowork-plugin-management","data","design","engineering","enterprise-search","figma","finance","human-resources","internal-apps","legal","marketing","operations","product-management","productivity","sales","small-business","ai-governance-legal","cocounsel-legal","commercial-legal","corporate-legal","employment-legal","ip-legal","law-student","legal-builder-hub","legal-clinic","litigation-legal","privacy-legal","product-legal","regulatory-legal","healthcare","fhir-developer","npi-registry","icd10-codes","pubmed","prior-auth-review","cms-coverage","clinical-trial-protocol","documents","asana","bigquery","claude-tag-data-viz","claude-tag-oncall","claude-tag-troubleshoot","confluence","datadog","google-drive","grafana","hubspot","jira","linear","notion","pagerduty","redshift","salesforce","sentry","snowflake"]);
function qBe(e,n){return T(n)&&q.has(e)};
return {ebn,b,A,m,g,Dzo,gn,T,B,$c,Gd,_i,P,ZA,h,lbn,qG,Yl,Nr,el,R7e,q,qBe};
}
function module3(imports){

function yo(t){return t};
return {yo};
}
function module4(imports){
const n=imports["n"];
const v=imports["v"];
const c=imports["c"];
const yo=imports["yo"];
class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}};
var an="NoProjectDirectoryError";
class gR extends Error{name=an;constructor(){super("This session has no working directory.")}};
function Es(e){let{project:t}=e;if(t===null)throw new gR;return t};
function Rs(e){return e.of(v.host)};
function Ge(){let e=c()?.sessionId;if(e)return yo(e);let t=n();return t.identity.mainAgentId(t.id)};
function Ee(){return c()?.originalCwd??Es(n()).originalCwd};
function Co(){return n().host.launchOptions.projectConfigRoot()};
function Ce(){return!n().host.launchOptions.isInteractive()};
function Oet(){return n().host.launchOptions.hasStreamingInput()};
function fto(e){return n().host.extensionsConfig.attestedOfficialPluginMarketplace(e)};
function cS(){return n().host.extensionsConfig.teammateAgentId()};
function z3t(){return n().host.settingsSource.useCoworkPlugins()};
function dS(){return n().mcpSessionWiring.clientsFromAccessor()};
function wO(){return n().host.mcpProcessWiring.ensureConnectedClient()};
function R(){return c()??n().hookRegistry.holder()};
function Net(){return R().pluginHookRunner};
function CW(e){n().host.extensionsConfig.replaceAdditionalDirectoriesForClaudeMd(e)};
return {V,an,gR,Es,Rs,Ge,Ee,Co,Ce,Oet,fto,cS,z3t,dS,wO,R,Net,CW};
}
function module5(imports){

function r(n){return n};
function S(n){return r(n)};
function c(n){return r(n)};
function ad(...n){return r(n.join(""))};
function bn(n){return r(n)};
function Dir(n,e){return e?bn(n):S("third-party")};
return {r,S,c,ad,bn,Dir};
}
function module6(imports){

var a=/^[a-zA-Z0-9_-]+$/;
function zU(e){return e!==""&&a.test(e)};
function or(e){return e.replace(/^(?:session|cse)_/,"")};
function lY(e){return(e.startsWith("session_")||e.startsWith("cse_"))&&zU(e)&&or(e)!==""};
return {a,zU,or,lY};
}
function module7(imports){
const V=imports["V"];
const Me=imports["Me"];
const U=imports["U"];
const Le=imports["Le"];
const lY=imports["lY"];
class h{reconnect=null;toggle=null;isDisabled=null;dialBlockCause=null;policyColdStartWaiter=null;skippedDynamicServers=[];cliOwnedConfigs=new WeakSet;cliOwnedBearerProviders=new WeakMap;cliOwnedAsyncBearerProviders=new WeakMap;cliOwnedResponseObservers=new WeakMap;cliOwnedRequestHeaderProviders=new WeakMap;ccrInjectedConfigs=new WeakSet;clientAuthProviders=new WeakMap;clientFirstPartyBearers=new WeakMap;stepUpReauthFlights=new Map;stepUpReauthExhausted=new Map;identityEpoch=0;identityBaseline=void 0;identitySeedAttempted=!1;identityChangedThisProcess=!1;identityTrippedHandler=null;identityTripUnowned=!1;headlessMcpTeardown=null;headlessConnectorMountInFlight=void 0;authCacheRead=null;authCacheWriteChain=Promise.resolve();discoverVerdictsRead=null;discoverVerdictsWriteChain=Promise.resolve();firstPartyDesignConsentAsks=new Map;claudeAiConfigsFetch=null;claudeAiConfigsFetchTransientFailures=new WeakSet;pendingCrossOrgNotice=void 0;claudeAiConnectedThisSession=new Set;needsAuthNoticedThisSession=new Set;pendingScopeExpansionNotice=void 0;scopeExpansionDisclosed=!1;officialUrls=void 0;vscodeClient=null;stopVscodePolicyGatesRefresh=null;toolRefreshSequences=new WeakMap;droppedToolsSeqByConnection=new WeakMap;toolsListErrorByResult=new WeakMap;discoveryFetchErrors=new WeakMap;rawToolsByResult=new WeakMap;rawCommandsByResult=new WeakMap;rawResourcesByResult=new WeakMap;rawFetchedAtByResult=new WeakMap;persistedDiscoveryRounds=new WeakSet;listChangedRefetchHandlers=new WeakMap;burnedListingDiscoverPriors=new Set;skillsFunnelSeen=new Set;skillsFetcher=null;discoveryCacheStore=null;connectionCache=null;cachedFirstDialArmsRan=new WeakSet;supersededDials=new WeakSet;swrRefreshDialsInFlight=new WeakSet;reauthDecisionSinkForTest=void 0;holdStaleReauthEntryForTest=!1;oauthCallbackListeners=new Map;oauthCallbackSubmitters=new Map;activeOAuthFlows=new Map;authLost=Me();reauthReconnect=Me();cachedAdopt=Me();cachedDialFailed=Me()};
var I=new V(()=>new h);
function qt(){return I.of(U().host)};
function Vp(e){return typeof e==="object"&&e!==null&&qt().cliOwnedConfigs.has(e)};
var cje="memory";
var g=["/v2/session_ingress/shttp/mcp/","/v2/session_ingress/mcp/ws/","/v2/ccr-sessions/","/v1/code/"];
class w{captured=E();carrier=R();ownSessionIds=y();get atStartup(){return this.captured}get ownCcrSessionIds(){return this.ownSessionIds}get bridgeCarrier(){return this.carrier}get isBridgeCarrierChild(){return this.carrier==="child"}reset(){this.captured=E(),this.carrier=R(),this.ownSessionIds=y()}};
var T_=new w;
function s9r(){return T_.bridgeCarrier?["CLAUDE_CODE_SESSION_ACCESS_TOKEN","SESSION_INGRESS_URL","CLAUDE_CODE_BRIDGE_PROMPT_SHA256"]:[]};
function sS(e){let r=T_.atStartup;if(!r)return!1;let n,t;try{n=new URL(e),t=new URL(r)}catch{return!1}if((n.protocol==="wss:"?`https://${n.host}`:n.protocol==="ws:"?`http://${n.host}`:n.origin)!==t.origin)return!1;return g.some((o)=>n.pathname.includes(o))};
var XIe=/^\/v2\/ccr-sessions\/([A-Za-z0-9_-]+)\/mcp$/;
function E(){return process.env.SESSION_INGRESS_URL??process.env.ANTHROPIC_BASE_URL};
function R(){let e=process.env.CLAUDE_CODE_BRIDGE_MCP_CARRIER;if(e==="1"||!e)return e?"child":void 0;if(process.env.CLAUDE_CODE_ENVIRONMENT_KIND==="byoc"&&Le(process.env.CLAUDE_CODE_REMOTE)){delete process.env.CLAUDE_CODE_BRIDGE_MCP_CARRIER;return}return"descendant"};
function y(){return[process.env.CLAUDE_CODE_REMOTE_SESSION_ID,process.env.CLAUDE_CODE_SESSION_ID].filter((e)=>e!==void 0&&lY(e))};
return {h,I,qt,Vp,cje,g,w,T_,s9r,sS,XIe,E,R,y};
}
function module8(imports){
const C=imports["C"];
const U=imports["U"];
const a=imports["a"];
const cS=imports["cS"];
var r=new Set(["claude-desktop","claude-desktop-3p","local-agent"]);
function _(){let e=uA();return e!==void 0&&r.has(e)};
function n(){return C.of(U().host)};
function uA(){return n().entrypoint};
var T=new Set(["claude-vscode","claude-desktop","claude-desktop-3p","local-agent","local_agent","remote","remote_desktop","remote_mobile","remote_projects","remote_cowork","ssh-remote","claude-in-slack","claude_in_slack","claude-in-teams","claude-coworker","claude-coworker-terminal"]);
function uY(){let e=a.CLAUDE_CODE_SESSION_KIND;if(e==="bg"||e==="daemon"||e==="daemon-worker"||cS()!==void 0)return!1;let t=n();if(t.interactive)return!0;return!t.childSession&&t.entrypoint!==void 0&&T.has(t.entrypoint)};
function hu(){return _()&&!n().childSession};
return {r,_,n,uA,T,uY,hu};
}
function module9(imports){
const yN=imports["yN"];
const bn=imports["bn"];
const _=imports["_"];
const cje=imports["cje"];
const Vp=imports["Vp"];
const sS=imports["sS"];
const XIe=imports["XIe"];
const hu=imports["hu"];
function S_t(e){return bn(_(Object.fromEntries(e)))};
var bN="claude-plugin-telemetry-v1";
function Gbe(e){return yN("sha256").update(e+bN).digest("hex").slice(0,16)};
var ni=cje;
var qU=/^\/v2\/ccr-sessions\/[A-Za-z0-9_-]+\/memory\/mcp$/;
var wKr="a471caf9-e559-5ad8-836c-4e5972877185";
var XU=/^memory_[a-z_]+$/;
var aKo=new Set(["memory_read","memory_list","memory_search"]);
var JU="memory_read";
function b6t(e){if(e?.name!==ni||e.config.scope!=="dynamic"||Vp(e.config)||!("url"in e.config)||typeof e.config.url!=="string"||!sS(e.config.url))return!1;let n;try{n=new URL(e.config.url)}catch{return!1}if(n.username!==""||n.password!==""||n.hash!=="")return!1;if(qU.test(n.pathname))return n.search==="";let r=n.searchParams.getAll("toolbox_mcp_server_id");return XIe.test(n.pathname)&&r.length===1&&r[0]===wKr};
function oE(e,n){return iE(e,n)&&hu()};
function iE(e,n){return e?.name===ni&&e.config.scope==="dynamic"&&e.config.type==="sdk"&&!Vp(e.config)&&XU.test(n)};
function cZ(e){return b6t(e)||oE(e,JU)||e?.name===ni&&Vp(e.config)};
var dZ="anthropic/memory.caller";
return {S_t,bN,Gbe,ni,qU,wKr,XU,aKo,JU,b6t,oE,iE,cZ,dZ};
}
function module10(imports){

var ZS="third-party";
return {ZS};
}
function module11(imports){
const Yl=imports["Yl"];
const V=imports["V"];
const U=imports["U"];
const _i=imports["_i"];
const el=imports["el"];
const Jzt=imports["Jzt"];
const qBe=imports["qBe"];
const gn=imports["gn"];
const k=imports["k"];
const Dzo=imports["Dzo"];
const bn=imports["bn"];
const Gbe=imports["Gbe"];
const c=imports["c"];
const S=imports["S"];
const ZS=imports["ZS"];
class z{nameRegistration;catalogEntryNames;reviewerMarkedEntryNames;isAccessAllowed;lastFailedWalk;staleCatalogFetchedAt;catalogLoadInFlight;bindingsWriteTail=Promise.resolve();marketplaceChoice;blockedLogged=new Set};
var Pe=new V(()=>new z);
function QS(){return Pe.of(U().host)};
function $pn(e){if(e!==gn)return!1;let{nameRegistration:n}=QS();return n==="built-in"||n==="none"};
function v(){let e=QS();return e.nameRegistration==="built-in"&&e.isAccessAllowed?.()===!0};
function Y(e){return v()&&QS().catalogEntryNames?.has(e)===!0};
function J(e,n){return n?`${e}@${n.toLowerCase()}`:e};
class q{#e=new Map;#n=0;generation(){return this.#n}register(e,n,r,s){if(s!==void 0&&s!==this.#n)return;this.#e.set(J(e,n),r)}get(e,n){if(n===void 0)return;return this.#e.get(J(e,n))}clear(){this.#e.clear(),this.#n++}};
var ke=new V(()=>new q);
function b(){return ke.of(U().host)};
function C(e,n){return b().get(e,n)};
function jNo(){b().clear()};
class X{pendingUsage=new Map;flushTimer=null;exitFlushesInFlight=[];flushStorageV5=void 0};
var Z=new V(()=>new X);
class Q{flushers=null;exitFlushRegistered=!1};
var E=new Q;
var Ee=60000;
function y(){return Z.of(U().host)};
function Rv(e){let n=Date.now(),r=y(),s=r.pendingUsage.get(e);if(s)s.count++,s.lastUsedAt=n;else r.pendingUsage.set(e,{count:1,lastUsedAt:n});if(E.flushers)ne(r,E.flushers)};
function ne(e,n){if(!E.exitFlushRegistered)E.exitFlushRegistered=!0,process.on("exit",n.flushAtExit);if(!e.flushTimer)e.flushTimer=setTimeout(n.flush,Ee),e.flushTimer.unref?.()};
function ix(e,n){let r=C(e,n)??n,s=r?`${e}@${r.toLowerCase()}`:e;return bn(Gbe(s))};
function fe(e){return e===gn&&k("tengu_wise_kite",!1)};
function _e(e,n){return fe(n)&&Y(e)};
function d9(e,n,r){if(n===_i)return"default-bundle";if(el(n))return"official";if(n!==void 0&&Jzt.has(n.toLowerCase()))return"community";if(r?.has(e))return"org";return"user-local"};
function u9(e){return e==="official"||e==="default-bundle"};
function Ce(e){return u9(e)||e==="community"};
function XFt(e,n,r=null){let s=d9(e,n,r),g=Ce(s)||qBe(e,n)||_e(e,n),p=n===_i?Dzo(e):void 0;return{plugin_id_hash:ix(e,n),plugin_scope:$pn(n)?c("directory"):c(s),plugin_name_redacted:g?bn(e):S(ZS),marketplace_name_redacted:g&&n?bn(n):S(ZS),is_official_plugin:u9(s),...p!==void 0&&{plugin_name_previous:bn(p),plugin_id_hash_previous:ix(p,n)}}};
function P2(e,n,r=null){let s=C(e,n)??n;return{_PROTO_plugin_name:e,...s&&{_PROTO_marketplace_name:s},...XFt(e,n,r)}};
function hH(e,n=null){let{name:r,marketplace:s}=Yl(e);return P2(r,s,n)};
return {z,Pe,QS,$pn,v,Y,J,q,ke,b,C,jNo,X,Z,Q,E,Ee,y,Rv,ne,ix,fe,_e,d9,u9,Ce,XFt,P2,hH};
}
function module12(imports){
const Ag=imports["Ag"];
const Oe=imports["Oe"];
var SJn=Ag;
var Xe=SJn.map((e)=>`classic.${e}`);
var USn=["model.complete","model.classify","model.fork","audio.play","audio.speak","mcp.call","mcp.connect","session.cwd","session.root","session.model","session.turns","session.id","session.messages","session.repo","session.surface","session.surfaces","session.authorize","session.usage","session.version","turn.abort","prompt.read","flag.value","tool.list","tool.register","command.list","command.register","config.list","agent.list","agent.register","ui.toast","ui.status","ui.log","ui.notice","ui.invalidate","ui.open","ui.close","ui.panes","ui.copy","ui.blit","fs.read","fs.write","fs.list","fs.exists","fs.stat","fs.ancestors","store.get","store.set","store.delete","store.keys","state.get","state.set","clock.now","clock.sleep","clock.after","clock.every","http.fetch","process.run","process.spawn","settings.read","env.get","env.set"];
var Mts=Xe.filter((e)=>e!=="classic.PreToolUse");
var Ye=String.raw`(?!\p{Default_Ignorable_Code_Point})[\p{ID_Start}$_]`+String.raw`(?:(?!\p{Default_Ignorable_Code_Point})[\p{ID_Continue}$])*`;
var _zo=["managed","user","project","local","memory"];
var Fjt=["replace","append","insert"];
var WSn=(e)=>typeof e==="string"&&Fjt.includes(e);
var ac=["prepend","user","append","builtin","core"];
var Szo=["allow","ask","deny"];
var y7e=(e)=>ac.indexOf(e);
function Lts(e,o){let r=y7e(o);return e.find((t)=>y7e(t.from)<r&&r<y7e(t.to))?.plugin};
var yyt=(e)=>({prepend:["append","builtin","core"],user:[],append:["core"],builtin:[],core:[]})[e];
var EJn=(e)=>yyt("prepend").includes(e);
function Nts(e,o){return Object.freeze([...e,Object.freeze({...o,to:e.reduce((r,t)=>y7e(t.to)>y7e(r)?t.to:r,o.to)})])};
var _7e=Object.freeze([]);
var lt=new RegExp(`^${Ye}$`,"u");
function Ze(e){if(typeof e!=="string")return`${typeof e} is not an event name or a pattern (a string)`;let o=e.startsWith("!"),r=o?e.slice(1):e;if(o&&r==="*")return`"${e}" is not a pattern: it selects no event`;if(o&&r.startsWith("!"))return`"${e}" is not a pattern: "!" negates once`;let t=r==="*",n=r.endsWith(".*"),s=(n?r.slice(0,-2):r).split(".");if(!(t||s.every((i)=>lt.test(i))))return`"${e}" is not an event name or a pattern ("*", "<prefix>.*", or "!" before either)`;return{isNegated:o,selection:t?{kind:"every"}:n?{kind:"prefix",prefix:s.join(".")}:{kind:"name",name:r}}};
function eo(e){let o=Ze(e);if(typeof o==="string")throw new Oe(o);return o};
function npe(e,o){let{isNegated:r,selection:t}=eo(e),n;switch(t.kind){case"every":n=!0;break;case"prefix":n=o.startsWith(`${t.prefix}.`);break;case"name":n=o===t.name;break}return r?!n:n};
return {SJn,Xe,USn,Mts,Ye,_zo,Fjt,WSn,ac,Szo,y7e,Lts,yyt,EJn,Nts,_7e,lt,Ze,eo,npe};
}
function module13(imports){
const N=imports["N"];
const W=imports["W"];
function gF(r){if(!N(r))return!1;let o=Object.getPrototypeOf(r);return o===null||!W(o)&&Object.getPrototypeOf(o)===null};
function I(){let r={log(){},hookFailed(){}};return{set:(o)=>{r=o},get:()=>r}};
var x=I();
var nd=x.get;
var l=65536;
function i(r){if(typeof r!=="object"||!r)return!1;try{return Reflect.get(RegExp.prototype,"source",r),!0}catch{return!1}};
var xPe=(r)=>gF(r)&&!i(r);
function s(r,o,t){if(Array.isArray(r))return Array.prototype.some.call(r,(e)=>s(e,o,t));if(Array.isArray(o))return Array.prototype.some.call(o,(e)=>s(r,e,t));if(typeof r!=="object"||r===null)return r===o;if(gF(r)){if(typeof o!=="object"||!o)return!1;for(let e of Object.keys(r))if(!Object.hasOwn(o,e)||!s(r[e],o[e],t))return!1;return!0}return i(r)&&t(r,String(o))};
function Bjt(r,o,t=""){let e;if(Array.isArray(r))return Array.prototype.some.call(r,(n)=>(e=Bjt(n,o,t),e!==void 0)),e;if(Array.isArray(o))return Array.prototype.some.call(o,(n)=>(e=Bjt(r,n,t),e!==void 0)),e;if(!xPe(r))return;if(o===null)return{path:t,kind:"null"};switch(typeof o){case"string":return{path:t,kind:"string"};case"number":return{path:t,kind:"number"};case"boolean":return{path:t,kind:"boolean"};case"bigint":return{path:t,kind:"bigint"};case"object":break;case"undefined":case"symbol":case"function":return}for(let n of Object.keys(r)){if(!Object.hasOwn(o,n))continue;if(e=Bjt(r[n],o[n],t===""?n:`${t}.${n}`),e!==void 0)return e}return};
function zVr(r,o,t){let e=t.path.split(".").at(-1)??t.path;return`hooks module ${r}: on('${o}') matcher at ${t.path} is a nested object, but e.${t.path} is a ${t.kind} there, which an object matcher can never match (a matcher has no operator keys); the hook will not run for it. A ${t.kind} is matched by the literal value or, as a string, by a RegExp, e.g. { ${e}: /^prefix/ }`};
var VVr=32;
var d=(r)=>r.includes("g")?"g":r.includes("y")?"y":void 0;
var m=(r)=>({source:String(Reflect.get(RegExp.prototype,"source",r)),flags:String(Reflect.get(RegExp.prototype,"flags",r))});
function tr(r,o){if(o.length>l)return nd().log(`matcher: a value of ${o.length} characters is past the ${l} a RegExp matcher reads; it matches, so the hook decides`),!0;if(d(m(r).flags))r.lastIndex=0;return RegExp.prototype.exec.call(r,o)!==null};
var KVr=(r,o)=>s(r,o,()=>!0);
var FQ=(r,o,t)=>Array.isArray(r)?r.some((e)=>FQ(e,o,t)):!gF(r)||!Object.hasOwn(r,o)||KVr(r[o],t);
var _yt=(r,o)=>s(r,o,tr);
return {gF,I,x,nd,l,i,xPe,s,Bjt,zVr,VVr,d,m,tr,KVr,FQ,_yt};
}
function module14(imports){
const ut=imports["ut"];
const FQ=imports["FQ"];
var dd=(o,e,s)=>(s??ut().loadedModules).some((r)=>r.hooks(o)&&(e===void 0||Object.entries(e).every(([t,d])=>FQ(r.matcherFor(o),t,d))));
return {dd};
}
function module15(imports){

function re(t,n){if(n<=0)return"";if(t.length<=n)return t;let e=t.slice(0,n),r=e.charCodeAt(n-1);return f(r>=55296&&r<=56319?e.slice(0,-1):e)};
function f(t){if(typeof Buffer<"u")return Buffer.from(t,"utf16le").toString("utf16le");return x(t)};
function x(t){let e=[];for(let r=0;r<t.length;r+=8192){let i=Math.min(r+8192,t.length),o=new Uint16Array(i-r);for(let u=r;u<i;u++)o[u-r]=t.charCodeAt(u);e.push(String.fromCharCode(...o))}return e.join("")};
var m=/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/;
var a=/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g;
var l=typeof String.prototype.isWellFormed==="function"?Function.prototype.call.bind(String.prototype.isWellFormed):void 0;
var g=typeof String.prototype.toWellFormed==="function"?Function.prototype.call.bind(String.prototype.toWellFormed):void 0;
function wf(t){if(l)return l(t);return!m.test(t)};
function Fm(t){if(g)return g(t);return t.replace(a,"\uFFFD")};
function Nz(t){if(l&&l(t))return t;return t.replace(a,"")};
function ot(t,n){let e=t.indexOf(n);return e===-1?t:t.slice(0,e)};
function Mr(t){return ot(t,`
`)};
function see(t){let n=/[\p{Cc}\p{Cf}\p{Default_Ignorable_Code_Point}\u2028\u2029]/gu;if(!n.test(t))return t;let e="";for(let{segment:r}of new Intl.Segmenter(void 0,{granularity:"grapheme"}).segment(t)){let i=/\p{Extended_Pictographic}|\p{Regional_Indicator}|^[#*0-9]\uFE0F?\u20E3$/u.test(r),o=/^\u{1F3F4}[\u{E0030}-\u{E0039}\u{E0061}-\u{E007A}]{1,6}\u{E007F}$/u.test(r);n.lastIndex=0,e+=r.replace(n,(u,c)=>{if(u===`
`||u==="\t")return u;let s=u.codePointAt(0)??0;if(i&&(u==="\uFE0F"||u==="\uFE0E"||u==="\u20E3"||u==="\u200D"&&c+u.length<r.length||o&&s>=917536&&s<=917631))return u;if(s===27)return"\u241B";if(s<32)return String.fromCodePoint(9216+s);if(s===127)return"\u2421";return`\\u{${s.toString(16).toUpperCase()}}`})}return e};
function Ef(t){return see(t).replace(/\n/g,"\u2424").replace(/\t/g,"\u2409")};
return {re,f,x,m,a,l,g,wf,Fm,Nz,ot,Mr,see,Ef};
}
function module16(imports){
const Nz=imports["Nz"];
function en(e){return Bun.stripANSI(e)};
function _(e){let n=e.replace(/[\p{Cf}\p{Co}\p{Cn}]/gu,"");return n=n.replace(/[\u200B-\u200F]/g,"").replace(/[\u202A-\u202E]/g,"").replace(/[\u2066-\u2069]/g,"").replace(/[\uFEFF]/g,"").replace(/[\uE000-\uF8FF]/g,""),n};
function bf(e){let n=Nz(e);for(let r=0;r<10;r++){let t=_(n);if(t===n)return n;n=t}return n};
return {en,_,bf};
}
function module17(imports){

function G(n,e){let r=0;for(let t of n)r+=+!!e(t);return r};
function L(n){return[...new Set(n)]};
return {G,L};
}
function module18(imports){
const N=imports["N"];
const Oe=imports["Oe"];
function Syt(e,r="aborted"){let{reason:o}=e;return o instanceof Error?o.message:o===void 0?r:String(o)};
function jjt(e,r){if(!N(e))throw new Oe(`${r}: next() takes the event's argument: next(e) passes it on, next({ ...e, x }) rewrites it`);return e};
return {Syt,jjt};
}
function module19(imports){
const Dd=imports["Dd"];
const bn=imports["bn"];
const S=imports["S"];
const P=imports["P"];
class Ye extends Error{constructor(n){super(n);this.name="AbortError"}};
function at(n){try{return n instanceof Ye||n instanceof Dd||n instanceof Error&&(n.name==="AbortError"||("__CANCEL__"in n)&&Boolean(n.__CANCEL__))}catch{return!1}};
class Hr extends P{};
function Z(n){return n instanceof Error?n:Error(String(n))};
function l(n){return n instanceof Error?n.message:String(n)};
function E(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return};
function so(n){return wR(E(n))};
function wR(n){return n&&/^[A-Z][A-Z0-9_]{0,63}$/.test(n)?bn(n):void 0};
function Ng(n){let e=n?.name;return typeof e==="string"&&/^[A-Z][a-zA-Z]{0,63}$/.test(e)?bn(e):void 0};
function tme(n){if(typeof n!=="string")return;return/^[A-Za-z][A-Za-z0-9_-]{0,63}$/.test(n)?bn(n):S("nonconforming")};
function pEt(n){let e=n.message?`${n.name}: ${n.message}`:n.name,t=n.stack;if(!t)return e;if(t.startsWith(e))return t;let r=t.split(`
`),o=r[0]??"",i=o===n.name||o.startsWith(`${n.name}:`)?r.slice(1):r;return[e,...i].join(`
`)};
return {Ye,at,Hr,Z,l,E,so,wR,Ng,tme,pEt};
}
function module20(imports){
const V=imports["V"];
const ot=imports["ot"];
var is=V;
function ct(t,e){return t};
function Hd(t){if(Vt(t))return ot()+t.slice(1);return t};
function Vt(t){return t==="~"||t.startsWith("~/")||!1};
return {is,ct,Hd,Vt};
}
function module21(imports){

function Ys(){let t;return{set:(e)=>{t=e},get:()=>t}};
var kJn=Ys();
var byt=()=>kJn.get();
return {Ys,kJn,byt};
}
function module22(imports){

var l=Object.create;
var {getPrototypeOf:m,defineProperty:g,getOwnPropertyNames:n}=Object;
var k=Object.prototype.hasOwnProperty;
function o(a){return this[a]};
var p;
var q;
var Se=(a,c,d)=>{var e=a!=null&&typeof a==="object";if(e){var i=c?p??=new WeakMap:q??=new WeakMap,j=i.get(a);if(j)return j}d=a!=null?l(m(a)):{};let f=c||!a||!a.__esModule||!k.call(a,"default")?g(d,"default",{value:a,enumerable:!0}):d;if(a&&typeof a==="object"||typeof a==="function"){for(let h of n(a))if(!k.call(f,h))g(f,h,{get:o.bind(a,h),enumerable:!0})}if(e)i.set(a,f);return f};
var v=(a,c)=>()=>(c||a((c={exports:{}}).exports,c),c.exports);
return {l,m,g,n,k,o,p,q,Se,v};
}
function module23(imports){
const v=imports["v"];
var o=v(function(b,i){i.exports={single:{topLeft:"\u250C",top:"\u2500",topRight:"\u2510",right:"\u2502",bottomRight:"\u2518",bottom:"\u2500",bottomLeft:"\u2514",left:"\u2502"},double:{topLeft:"\u2554",top:"\u2550",topRight:"\u2557",right:"\u2551",bottomRight:"\u255D",bottom:"\u2550",bottomLeft:"\u255A",left:"\u2551"},round:{topLeft:"\u256D",top:"\u2500",topRight:"\u256E",right:"\u2502",bottomRight:"\u256F",bottom:"\u2500",bottomLeft:"\u2570",left:"\u2502"},bold:{topLeft:"\u250F",top:"\u2501",topRight:"\u2513",right:"\u2503",bottomRight:"\u251B",bottom:"\u2501",bottomLeft:"\u2517",left:"\u2503"},singleDouble:{topLeft:"\u2553",top:"\u2500",topRight:"\u2556",right:"\u2551",bottomRight:"\u255C",bottom:"\u2500",bottomLeft:"\u2559",left:"\u2551"},doubleSingle:{topLeft:"\u2552",top:"\u2550",topRight:"\u2555",right:"\u2502",bottomRight:"\u255B",bottom:"\u2550",bottomLeft:"\u2558",left:"\u2502"},classic:{topLeft:"+",top:"-",topRight:"+",right:"|",bottomRight:"+",bottom:"-",bottomLeft:"+",left:"|"},arrow:{topLeft:"\u2198",top:"\u2193",topRight:"\u2199",right:"\u2190",bottomRight:"\u2196",bottom:"\u2191",bottomLeft:"\u2197",left:"\u2192"}}});
var AJn=v(function(g,t){var e=o();t.exports=e;t.exports.default=e});
return {o,AJn};
}
function module24(imports){

var pR=/\p{DI}/gu;
function M2e(e){return e.replace(pR,"")};
return {pR,M2e};
}
function module25(imports){

var R=new Map([["a","aA\uFF21\uFF41\uD835\uDC00\uD835\uDC1A\uD835\uDC34\uD835\uDC4E\uD835\uDC68\uD835\uDC82\uD835\uDC9C\uD835\uDCB6\uD835\uDCD0\uD835\uDCEA\uD835\uDD04\uD835\uDD1E\uD835\uDD38\uD835\uDD52\uD835\uDD6C\uD835\uDD86\uD835\uDDA0\uD835\uDDBA\uD835\uDDD4\uD835\uDDEE\uD835\uDE08\uD835\uDE22\uD835\uDE3C\uD835\uDE56\uD835\uDE70\uD835\uDE8A\u24B6\u24D0\u0430\u03B1\u1D00\u0251\uAB7A\uA4EE\u2C81\u0410\u0391\u2C6D\u13AA\u2C80\xC0\xC1\xC2\xC3\xC4\xC5\xE0\xE1\xE2\xE3\xE4\xE5\u0100\u0101\u0102\u0103\u0104\u0105\u01CD\u01CE\u01DE\u01DF\u01E0\u01E1\u01FA\u01FB\u0200\u0201\u0202\u0203\u0226\u0227\u1E00\u1E01\u1EA0\u1EA1\u1EA2\u1EA3\u1EA4\u1EA5\u1EA6\u1EA7\u1EA8\u1EA9\u1EAA\u1EAB\u1EAC\u1EAD\u1EAE\u1EAF\u1EB0\u1EB1\u1EB2\u1EB3\u1EB4\u1EB5\u1EB6\u1EB7\u212B\uD835\uDC00\uD835\uDC1A\uD835\uDC34\uD835\uDC4E\uD835\uDC68\uD835\uDC82\uD835\uDC9C\uD835\uDCB6\uD835\uDCD0\uD835\uDCEA\uD835\uDD04\uD835\uDD1E\uD835\uDD38\uD835\uDD52\uD835\uDD6C\uD835\uDD86\uD835\uDDA0\uD835\uDDBA\uD835\uDDD4\uD835\uDDEE\uD835\uDE08\uD835\uDE22\uD835\uDE3C\uD835\uDE56\uD835\uDE70\uD835\uDE8A\uD835\uDEA8\uD835\uDEC2\uD835\uDEE2\uD835\uDEFC\uD835\uDF1C\uD835\uDF36\uD835\uDF56\uD835\uDF70\uD835\uDF90\uD835\uDFAA\u1D2C\u1D43\u1D45\u2090"],["b","bB\uFF22\uFF42\uD835\uDC01\uD835\uDC1B\uD835\uDC35\uD835\uDC4F\uD835\uDC69\uD835\uDC83\uD835\uDC9D\uD835\uDCB7\uD835\uDCD1\uD835\uDCEB\uD835\uDD05\uD835\uDD1F\uD835\uDD39\uD835\uDD53\uD835\uDD6D\uD835\uDD87\uD835\uDDA1\uD835\uDDBB\uD835\uDDD5\uD835\uDDEF\uD835\uDE09\uD835\uDE23\uD835\uDE3D\uD835\uDE57\uD835\uDE71\uD835\uDE8B\u24B7\u24D1\u212C\u0412\u0392\u0299\uAB9F\u13FC\uA4D0\u2C83\u13CF\u13F4\u2C82\u1E02\u1E03\u1E04\u1E05\u1E06\u1E07\uD835\uDC01\uD835\uDC1B\uD835\uDC35\uD835\uDC4F\uD835\uDC69\uD835\uDC83\uD835\uDCB7\uD835\uDCD1\uD835\uDCEB\uD835\uDD05\uD835\uDD1F\uD835\uDD39\uD835\uDD53\uD835\uDD6D\uD835\uDD87\uD835\uDDA1\uD835\uDDBB\uD835\uDDD5\uD835\uDDEF\uD835\uDE09\uD835\uDE23\uD835\uDE3D\uD835\uDE57\uD835\uDE71\uD835\uDE8B\uD835\uDEA9\uD835\uDEE3\uD835\uDF1D\uD835\uDF57\uD835\uDF91\u1D2E\u1D47"],["c","cC\uFF23\uFF43\uD835\uDC02\uD835\uDC1C\uD835\uDC36\uD835\uDC50\uD835\uDC6A\uD835\uDC84\uD835\uDC9E\uD835\uDCB8\uD835\uDCD2\uD835\uDCEC\uD835\uDD06\uD835\uDD20\uD835\uDD3A\uD835\uDD54\uD835\uDD6E\uD835\uDD88\uD835\uDDA2\uD835\uDDBC\uD835\uDDD6\uD835\uDDF0\uD835\uDE0A\uD835\uDE24\uD835\uDE3E\uD835\uDE58\uD835\uDE72\uD835\uDE8C\u24B8\u24D2\u2102\u212D\u0441\u1D04\uABAF\uA4DA\u03F2\u2CA5\u0421\u13DF\u03F9\u2CA4\xC7\xE7\u0106\u0107\u0108\u0109\u010A\u010B\u010C\u010D\u1E08\u1E09\uD835\uDC02\uD835\uDC1C\uD835\uDC36\uD835\uDC50\uD835\uDC6A\uD835\uDC84\uD835\uDC9E\uD835\uDCB8\uD835\uDCD2\uD835\uDCEC\uD835\uDD20\uD835\uDD54\uD835\uDD6E\uD835\uDD88\uD835\uDDA2\uD835\uDDBC\uD835\uDDD6\uD835\uDDF0\uD835\uDE0A\uD835\uDE24\uD835\uDE3E\uD835\uDE58\uD835\uDE72\uD835\uDE8C\u1D9C\u216D\u217D\uA7F2"],["d","dD\uFF24\uFF44\uD835\uDC03\uD835\uDC1D\uD835\uDC37\uD835\uDC51\uD835\uDC6B\uD835\uDC85\uD835\uDC9F\uD835\uDCB9\uD835\uDCD3\uD835\uDCED\uD835\uDD07\uD835\uDD21\uD835\uDD3B\uD835\uDD55\uD835\uDD6F\uD835\uDD89\uD835\uDDA3\uD835\uDDBD\uD835\uDDD7\uD835\uDDF1\uD835\uDE0B\uD835\uDE25\uD835\uDE3F\uD835\uDE59\uD835\uDE73\uD835\uDE8D\u24B9\u24D3\u2145\u2146\u0501\u1D05\uAB70\uABB7\uA4D3\u0500\u13A0\u13E7\u010E\u010F\u1E0A\u1E0B\u1E0C\u1E0D\u1E0E\u1E0F\u1E10\u1E11\u1E12\u1E13\uD835\uDC03\uD835\uDC1D\uD835\uDC37\uD835\uDC51\uD835\uDC6B\uD835\uDC85\uD835\uDC9F\uD835\uDCB9\uD835\uDCD3\uD835\uDCED\uD835\uDD07\uD835\uDD21\uD835\uDD3B\uD835\uDD55\uD835\uDD6F\uD835\uDD89\uD835\uDDA3\uD835\uDDBD\uD835\uDDD7\uD835\uDDF1\uD835\uDE0B\uD835\uDE25\uD835\uDE3F\uD835\uDE59\uD835\uDE73\uD835\uDE8D\u1D30\u1D48\u216E\u217E"],["e","eE\uFF25\uFF45\uD835\uDC04\uD835\uDC1E\uD835\uDC38\uD835\uDC52\uD835\uDC6C\uD835\uDC86\uD835\uDCA0\uD835\uDCBA\uD835\uDCD4\uD835\uDCEE\uD835\uDD08\uD835\uDD22\uD835\uDD3C\uD835\uDD56\uD835\uDD70\uD835\uDD8A\uD835\uDDA4\uD835\uDDBE\uD835\uDDD8\uD835\uDDF2\uD835\uDE0C\uD835\uDE26\uD835\uDE40\uD835\uDE5A\uD835\uDE74\uD835\uDE8E\u24BA\u24D4\u212F\u2130\u2147\u0435\u03B5\u1D07\uAB7C\uA4F0\u2C89\u0415\u0395\u13AC\u2C88\xC8\xC9\xCA\xCB\xE8\xE9\xEA\xEB\u0112\u0113\u0114\u0115\u0116\u0117\u0118\u0119\u011A\u011B\u0204\u0205\u0206\u0207\u0228\u0229\u1E14\u1E15\u1E16\u1E17\u1E18\u1E19\u1E1A\u1E1B\u1E1C\u1E1D\u1EB8\u1EB9\u1EBA\u1EBB\u1EBC\u1EBD\u1EBE\u1EBF\u1EC0\u1EC1\u1EC2\u1EC3\u1EC4\u1EC5\u1EC6\u1EC7\uD835\uDC04\uD835\uDC1E\uD835\uDC38\uD835\uDC52\uD835\uDC6C\uD835\uDC86\uD835\uDCD4\uD835\uDCEE\uD835\uDD08\uD835\uDD22\uD835\uDD3C\uD835\uDD56\uD835\uDD70\uD835\uDD8A\uD835\uDDA4\uD835\uDDBE\uD835\uDDD8\uD835\uDDF2\uD835\uDE0C\uD835\uDE26\uD835\uDE40\uD835\uDE5A\uD835\uDE74\uD835\uDE8E\uD835\uDEAC\uD835\uDEC6\uD835\uDEDC\uD835\uDEE6\uD835\uDF00\uD835\uDF16\uD835\uDF20\uD835\uDF3A\uD835\uDF50\uD835\uDF5A\uD835\uDF74\uD835\uDF8A\uD835\uDF94\uD835\uDFAE\uD835\uDFC4\u1D31\u1D49\u2091"],["f","fF\uFF26\uFF46\uD835\uDC05\uD835\uDC1F\uD835\uDC39\uD835\uDC53\uD835\uDC6D\uD835\uDC87\uD835\uDCA1\uD835\uDCBB\uD835\uDCD5\uD835\uDCEF\uD835\uDD09\uD835\uDD23\uD835\uDD3D\uD835\uDD57\uD835\uDD71\uD835\uDD8B\uD835\uDDA5\uD835\uDDBF\uD835\uDDD9\uD835\uDDF3\uD835\uDE0D\uD835\uDE27\uD835\uDE41\uD835\uDE5B\uD835\uDE75\uD835\uDE8F\u24BB\u24D5\u2131\uA730\uA4DD\u1E1E\u1E1F\uD835\uDC05\uD835\uDC1F\uD835\uDC39\uD835\uDC53\uD835\uDC6D\uD835\uDC87\uD835\uDCBB\uD835\uDCD5\uD835\uDCEF\uD835\uDD09\uD835\uDD23\uD835\uDD3D\uD835\uDD57\uD835\uDD71\uD835\uDD8B\uD835\uDDA5\uD835\uDDBF\uD835\uDDD9\uD835\uDDF3\uD835\uDE0D\uD835\uDE27\uD835\uDE41\uD835\uDE5B\uD835\uDE75\uD835\uDE8F\u1DA0\uA7F3"],["g","gG\uFF27\uFF47\uD835\uDC06\uD835\uDC20\uD835\uDC3A\uD835\uDC54\uD835\uDC6E\uD835\uDC88\uD835\uDCA2\uD835\uDCBC\uD835\uDCD6\uD835\uDCF0\uD835\uDD0A\uD835\uDD24\uD835\uDD3E\uD835\uDD58\uD835\uDD72\uD835\uDD8C\uD835\uDDA6\uD835\uDDC0\uD835\uDDDA\uD835\uDDF4\uD835\uDE0E\uD835\uDE28\uD835\uDE42\uD835\uDE5C\uD835\uDE76\uD835\uDE90\u24BC\u24D6\u210A\u0262\u0261\uAB90\uA4D6\u0581\uA7AC\u13C0\u0551\u011C\u011D\u011E\u011F\u0120\u0121\u0122\u0123\u01E6\u01E7\u01F4\u01F5\u1E20\u1E21\uD835\uDC06\uD835\uDC20\uD835\uDC3A\uD835\uDC54\uD835\uDC6E\uD835\uDC88\uD835\uDCA2\uD835\uDCD6\uD835\uDCF0\uD835\uDD0A\uD835\uDD24\uD835\uDD3E\uD835\uDD58\uD835\uDD72\uD835\uDD8C\uD835\uDDA6\uD835\uDDC0\uD835\uDDDA\uD835\uDDF4\uD835\uDE0E\uD835\uDE28\uD835\uDE42\uD835\uDE5C\uD835\uDE76\uD835\uDE90\u1D33\u1D4D\u1DA2"],["h","hH\uFF28\uFF48\uD835\uDC07\uD835\uDC21\uD835\uDC3B\uD835\uDC55\uD835\uDC6F\uD835\uDC89\uD835\uDCA3\uD835\uDCBD\uD835\uDCD7\uD835\uDCF1\uD835\uDD0B\uD835\uDD25\uD835\uDD3F\uD835\uDD59\uD835\uDD73\uD835\uDD8D\uD835\uDDA7\uD835\uDDC1\uD835\uDDDB\uD835\uDDF5\uD835\uDE0F\uD835\uDE29\uD835\uDE43\uD835\uDE5D\uD835\uDE77\uD835\uDE91\u24BD\u24D7\u210B\u210C\u210D\u210E\u04BB\u041D\u0397\u029C\uAB8B\uAB92\uA4E7\u0570\u2C8F\u04BA\u13BB\u13C2\u0540\u2C8E\u0124\u0125\u021E\u021F\u1E22\u1E23\u1E24\u1E25\u1E26\u1E27\u1E28\u1E29\u1E2A\u1E2B\u1E96\uD835\uDC07\uD835\uDC21\uD835\uDC3B\uD835\uDC6F\uD835\uDC89\uD835\uDCBD\uD835\uDCD7\uD835\uDCF1\uD835\uDD25\uD835\uDD59\uD835\uDD73\uD835\uDD8D\uD835\uDDA7\uD835\uDDC1\uD835\uDDDB\uD835\uDDF5\uD835\uDE0F\uD835\uDE29\uD835\uDE43\uD835\uDE5D\uD835\uDE77\uD835\uDE91\uD835\uDEAE\uD835\uDEE8\uD835\uDF22\uD835\uDF5C\uD835\uDF96\u02B0\u1D34\u2095"],["i","iI\uFF29\uFF49\uD835\uDC08\uD835\uDC22\uD835\uDC3C\uD835\uDC56\uD835\uDC70\uD835\uDC8A\uD835\uDCA4\uD835\uDCBE\uD835\uDCD8\uD835\uDCF2\uD835\uDD0C\uD835\uDD26\uD835\uDD40\uD835\uDD5A\uD835\uDD74\uD835\uDD8E\uD835\uDDA8\uD835\uDDC2\uD835\uDDDC\uD835\uDDF6\uD835\uDE10\uD835\uDE2A\uD835\uDE44\uD835\uDE5E\uD835\uDE78\uD835\uDE92\u24BE\u24D8\u2110\u2111\u2139\u2148\u0456\u03B9\u026A\u0131\uA4F2\u0269\u2C93\u0406\u0399\uA7AE\u0196\u2C92\xCC\xCD\xCE\xCF\xEC\xED\xEE\xEF\u0128\u0129\u012A\u012B\u012C\u012D\u012E\u012F\u0130\u01CF\u01D0\u0208\u0209\u020A\u020B\u1E2C\u1E2D\u1E2E\u1E2F\u1EC8\u1EC9\u1ECA\u1ECB\uD835\uDC08\uD835\uDC22\uD835\uDC3C\uD835\uDC56\uD835\uDC70\uD835\uDC8A\uD835\uDCBE\uD835\uDCD8\uD835\uDCF2\uD835\uDD26\uD835\uDD40\uD835\uDD5A\uD835\uDD74\uD835\uDD8E\uD835\uDDA8\uD835\uDDC2\uD835\uDDDC\uD835\uDDF6\uD835\uDE10\uD835\uDE2A\uD835\uDE44\uD835\uDE5E\uD835\uDE78\uD835\uDE92\uD835\uDEA4\uD835\uDEB0\uD835\uDECA\uD835\uDEEA\uD835\uDF04\uD835\uDF24\uD835\uDF3E\uD835\uDF5E\uD835\uDF78\uD835\uDF98\uD835\uDFB2\u1D35\u1D62\u1DA5\u1DA6\u2071\u2160\u2170"],["j","jJ\uFF2A\uFF4A\uD835\uDC09\uD835\uDC23\uD835\uDC3D\uD835\uDC57\uD835\uDC71\uD835\uDC8B\uD835\uDCA5\uD835\uDCBF\uD835\uDCD9\uD835\uDCF3\uD835\uDD0D\uD835\uDD27\uD835\uDD41\uD835\uDD5B\uD835\uDD75\uD835\uDD8F\uD835\uDDA9\uD835\uDDC3\uD835\uDDDD\uD835\uDDF7\uD835\uDE11\uD835\uDE2B\uD835\uDE45\uD835\uDE5F\uD835\uDE79\uD835\uDE93\u24BF\u24D9\u2149\u0458\u03F3\u1D0A\uAB7B\uA4D9\u0408\u037F\u13AB\u0134\u0135\u01F0\uD835\uDC09\uD835\uDC23\uD835\uDC3D\uD835\uDC57\uD835\uDC71\uD835\uDC8B\uD835\uDCA5\uD835\uDCBF\uD835\uDCD9\uD835\uDCF3\uD835\uDD0D\uD835\uDD27\uD835\uDD41\uD835\uDD5B\uD835\uDD75\uD835\uDD8F\uD835\uDDA9\uD835\uDDC3\uD835\uDDDD\uD835\uDDF7\uD835\uDE11\uD835\uDE2B\uD835\uDE45\uD835\uDE5F\uD835\uDE79\uD835\uDE93\u02B2\u1D36"],["k","kK\uFF2B\uFF4B\uD835\uDC0A\uD835\uDC24\uD835\uDC3E\uD835\uDC58\uD835\uDC72\uD835\uDC8C\uD835\uDCA6\uD835\uDCC0\uD835\uDCDA\uD835\uDCF4\uD835\uDD0E\uD835\uDD28\uD835\uDD42\uD835\uDD5C\uD835\uDD76\uD835\uDD90\uD835\uDDAA\uD835\uDDC4\uD835\uDDDE\uD835\uDDF8\uD835\uDE12\uD835\uDE2C\uD835\uDE46\uD835\uDE60\uD835\uDE7A\uD835\uDE94\u24C0\u24DA\u212A\u043A\u03BA\u1D0B\uABB6\uA4D7\u2C95\u041A\u039A\u13E6\u2C94\u0136\u0137\u01E8\u01E9\u1E30\u1E31\u1E32\u1E33\u1E34\u1E35\uD835\uDC0A\uD835\uDC24\uD835\uDC3E\uD835\uDC58\uD835\uDC72\uD835\uDC8C\uD835\uDCA6\uD835\uDCC0\uD835\uDCDA\uD835\uDCF4\uD835\uDD0E\uD835\uDD28\uD835\uDD42\uD835\uDD5C\uD835\uDD76\uD835\uDD90\uD835\uDDAA\uD835\uDDC4\uD835\uDDDE\uD835\uDDF8\uD835\uDE12\uD835\uDE2C\uD835\uDE46\uD835\uDE60\uD835\uDE7A\uD835\uDE94\uD835\uDEB1\uD835\uDECB\uD835\uDEDE\uD835\uDEEB\uD835\uDF05\uD835\uDF18\uD835\uDF25\uD835\uDF3F\uD835\uDF52\uD835\uDF5F\uD835\uDF79\uD835\uDF8C\uD835\uDF99\uD835\uDFB3\uD835\uDFC6\u1D37\u1D4F\u2096"],["l","lL\uFF2C\uFF4C\uD835\uDC0B\uD835\uDC25\uD835\uDC3F\uD835\uDC59\uD835\uDC73\uD835\uDC8D\uD835\uDCA7\uD835\uDCC1\uD835\uDCDB\uD835\uDCF5\uD835\uDD0F\uD835\uDD29\uD835\uDD43\uD835\uDD5D\uD835\uDD77\uD835\uDD91\uD835\uDDAB\uD835\uDDC5\uD835\uDDDF\uD835\uDDF9\uD835\uDE13\uD835\uDE2D\uD835\uDE47\uD835\uDE61\uD835\uDE7B\uD835\uDE95\u24C1\u24DB\u2112\u2113\u04CF\u029F\uABAE\uA4E1\u04C0\u13DE\u0139\u013A\u013B\u013C\u013D\u013E\u1E36\u1E37\u1E38\u1E39\u1E3A\u1E3B\u1E3C\u1E3D\uD835\uDC0B\uD835\uDC25\uD835\uDC3F\uD835\uDC59\uD835\uDC73\uD835\uDC8D\uD835\uDCC1\uD835\uDCDB\uD835\uDCF5\uD835\uDD0F\uD835\uDD29\uD835\uDD43\uD835\uDD5D\uD835\uDD77\uD835\uDD91\uD835\uDDAB\uD835\uDDC5\uD835\uDDDF\uD835\uDDF9\uD835\uDE13\uD835\uDE2D\uD835\uDE47\uD835\uDE61\uD835\uDE7B\uD835\uDE95\u02E1\u1D38\u1DAB\u2097\u216C\u217C"],["m","mM\uFF2D\uFF4D\uD835\uDC0C\uD835\uDC26\uD835\uDC40\uD835\uDC5A\uD835\uDC74\uD835\uDC8E\uD835\uDCA8\uD835\uDCC2\uD835\uDCDC\uD835\uDCF6\uD835\uDD10\uD835\uDD2A\uD835\uDD44\uD835\uDD5E\uD835\uDD78\uD835\uDD92\uD835\uDDAC\uD835\uDDC6\uD835\uDDE0\uD835\uDDFA\uD835\uDE14\uD835\uDE2E\uD835\uDE48\uD835\uDE62\uD835\uDE7C\uD835\uDE96\u24C2\u24DC\u2133\u041C\u039C\u1D0D\u043C\uAB87\uA4DF\u2C99\u13B7\u2C98\u1E3E\u1E3F\u1E40\u1E41\u1E42\u1E43\uD835\uDC0C\uD835\uDC26\uD835\uDC40\uD835\uDC5A\uD835\uDC74\uD835\uDC8E\uD835\uDCC2\uD835\uDCDC\uD835\uDCF6\uD835\uDD10\uD835\uDD2A\uD835\uDD44\uD835\uDD5E\uD835\uDD78\uD835\uDD92\uD835\uDDAC\uD835\uDDC6\uD835\uDDE0\uD835\uDDFA\uD835\uDE14\uD835\uDE2E\uD835\uDE48\uD835\uDE62\uD835\uDE7C\uD835\uDE96\uD835\uDEB3\uD835\uDEED\uD835\uDF27\uD835\uDF61\uD835\uDF9B\u1D39\u1D50\u2098\u216F\u217F"],["n","nN\uFF2E\uFF4E\uD835\uDC0D\uD835\uDC27\uD835\uDC41\uD835\uDC5B\uD835\uDC75\uD835\uDC8F\uD835\uDCA9\uD835\uDCC3\uD835\uDCDD\uD835\uDCF7\uD835\uDD11\uD835\uDD2B\uD835\uDD45\uD835\uDD5F\uD835\uDD79\uD835\uDD93\uD835\uDDAD\uD835\uDDC7\uD835\uDDE1\uD835\uDDFB\uD835\uDE15\uD835\uDE2F\uD835\uDE49\uD835\uDE63\uD835\uDE7D\uD835\uDE97\u24C3\u24DD\u2115\u039D\u0274\uA4E0\u0578\u2C9B\u0548\u2C9A\xD1\xF1\u0143\u0144\u0145\u0146\u0147\u0148\u01F8\u01F9\u1E44\u1E45\u1E46\u1E47\u1E48\u1E49\u1E4A\u1E4B\uD835\uDC0D\uD835\uDC27\uD835\uDC41\uD835\uDC5B\uD835\uDC75\uD835\uDC8F\uD835\uDCA9\uD835\uDCC3\uD835\uDCDD\uD835\uDCF7\uD835\uDD11\uD835\uDD2B\uD835\uDD5F\uD835\uDD79\uD835\uDD93\uD835\uDDAD\uD835\uDDC7\uD835\uDDE1\uD835\uDDFB\uD835\uDE15\uD835\uDE2F\uD835\uDE49\uD835\uDE63\uD835\uDE7D\uD835\uDE97\uD835\uDEB4\uD835\uDEEE\uD835\uDF28\uD835\uDF62\uD835\uDF9C\u1D3A\u1DB0\u207F\u2099"],["o","oO\uFF2F\uFF4F\uD835\uDC0E\uD835\uDC28\uD835\uDC42\uD835\uDC5C\uD835\uDC76\uD835\uDC90\uD835\uDCAA\uD835\uDCC4\uD835\uDCDE\uD835\uDCF8\uD835\uDD12\uD835\uDD2C\uD835\uDD46\uD835\uDD60\uD835\uDD7A\uD835\uDD94\uD835\uDDAE\uD835\uDDC8\uD835\uDDE2\uD835\uDDFC\uD835\uDE16\uD835\uDE30\uD835\uDE4A\uD835\uDE64\uD835\uDE7E\uD835\uDE98\u24C4\u24DE\u2134\u043E\u03BF\u1D0F\uA4F3\u0585\u2C9F\u041E\u039F\u0555\u2C9E\xD2\xD3\xD4\xD5\xD6\xF2\xF3\xF4\xF5\xF6\u014C\u014D\u014E\u014F\u0150\u0151\u01A0\u01A1\u01D1\u01D2\u01EA\u01EB\u01EC\u01ED\u020C\u020D\u020E\u020F\u022A\u022B\u022C\u022D\u022E\u022F\u0230\u0231\u1E4C\u1E4D\u1E4E\u1E4F\u1E50\u1E51\u1E52\u1E53\u1ECC\u1ECD\u1ECE\u1ECF\u1ED0\u1ED1\u1ED2\u1ED3\u1ED4\u1ED5\u1ED6\u1ED7\u1ED8\u1ED9\u1EDA\u1EDB\u1EDC\u1EDD\u1EDE\u1EDF\u1EE0\u1EE1\u1EE2\u1EE3\uD835\uDC0E\uD835\uDC28\uD835\uDC42\uD835\uDC5C\uD835\uDC76\uD835\uDC90\uD835\uDCAA\uD835\uDCDE\uD835\uDCF8\uD835\uDD12\uD835\uDD2C\uD835\uDD46\uD835\uDD60\uD835\uDD7A\uD835\uDD94\uD835\uDDAE\uD835\uDDC8\uD835\uDDE2\uD835\uDDFC\uD835\uDE16\uD835\uDE30\uD835\uDE4A\uD835\uDE64\uD835\uDE7E\uD835\uDE98\uD835\uDEB6\uD835\uDED0\uD835\uDEF0\uD835\uDF0A\uD835\uDF2A\uD835\uDF44\uD835\uDF64\uD835\uDF7E\uD835\uDF9E\uD835\uDFB8\u1D3C\u1D52\u2092"],["p","pP\uFF30\uFF50\uD835\uDC0F\uD835\uDC29\uD835\uDC43\uD835\uDC5D\uD835\uDC77\uD835\uDC91\uD835\uDCAB\uD835\uDCC5\uD835\uDCDF\uD835\uDCF9\uD835\uDD13\uD835\uDD2D\uD835\uDD47\uD835\uDD61\uD835\uDD7B\uD835\uDD95\uD835\uDDAF\uD835\uDDC9\uD835\uDDE3\uD835\uDDFD\uD835\uDE17\uD835\uDE31\uD835\uDE4B\uD835\uDE65\uD835\uDE7F\uD835\uDE99\u24C5\u24DF\u2119\u0440\u03C1\u1D18\uABB2\uA4D1\u2CA3\u0420\u03A1\u13E2\u2CA2\u1E54\u1E55\u1E56\u1E57\uD835\uDC0F\uD835\uDC29\uD835\uDC43\uD835\uDC5D\uD835\uDC77\uD835\uDC91\uD835\uDCAB\uD835\uDCC5\uD835\uDCDF\uD835\uDCF9\uD835\uDD13\uD835\uDD2D\uD835\uDD61\uD835\uDD7B\uD835\uDD95\uD835\uDDAF\uD835\uDDC9\uD835\uDDE3\uD835\uDDFD\uD835\uDE17\uD835\uDE31\uD835\uDE4B\uD835\uDE65\uD835\uDE7F\uD835\uDE99\uD835\uDEB8\uD835\uDED2\uD835\uDEE0\uD835\uDEF2\uD835\uDF0C\uD835\uDF1A\uD835\uDF2C\uD835\uDF46\uD835\uDF54\uD835\uDF66\uD835\uDF80\uD835\uDF8E\uD835\uDFA0\uD835\uDFBA\uD835\uDFC8\u1D3E\u1D56\u1D68\u209A"],["q","qQ\uFF31\uFF51\uD835\uDC10\uD835\uDC2A\uD835\uDC44\uD835\uDC5E\uD835\uDC78\uD835\uDC92\uD835\uDCAC\uD835\uDCC6\uD835\uDCE0\uD835\uDCFA\uD835\uDD14\uD835\uDD2E\uD835\uDD48\uD835\uDD62\uD835\uDD7C\uD835\uDD96\uD835\uDDB0\uD835\uDDCA\uD835\uDDE4\uD835\uDDFE\uD835\uDE18\uD835\uDE32\uD835\uDE4C\uD835\uDE66\uD835\uDE80\uD835\uDE9A\u24C6\u24E0\u211A\u051B\u0566\u051A\u0536\uD835\uDC10\uD835\uDC2A\uD835\uDC44\uD835\uDC5E\uD835\uDC78\uD835\uDC92\uD835\uDCAC\uD835\uDCC6\uD835\uDCE0\uD835\uDCFA\uD835\uDD14\uD835\uDD2E\uD835\uDD62\uD835\uDD7C\uD835\uDD96\uD835\uDDB0\uD835\uDDCA\uD835\uDDE4\uD835\uDDFE\uD835\uDE18\uD835\uDE32\uD835\uDE4C\uD835\uDE66\uD835\uDE80\uD835\uDE9A\uA7F4"],["r","rR\uFF32\uFF52\uD835\uDC11\uD835\uDC2B\uD835\uDC45\uD835\uDC5F\uD835\uDC79\uD835\uDC93\uD835\uDCAD\uD835\uDCC7\uD835\uDCE1\uD835\uDCFB\uD835\uDD15\uD835\uDD2F\uD835\uDD49\uD835\uDD63\uD835\uDD7D\uD835\uDD97\uD835\uDDB1\uD835\uDDCB\uD835\uDDE5\uD835\uDDFF\uD835\uDE19\uD835\uDE33\uD835\uDE4D\uD835\uDE67\uD835\uDE81\uD835\uDE9B\u24C7\u24E1\u211B\u211C\u211D\u0280\uAB71\uABA2\uA4E3\u01A6\u13A1\u13D2\u0154\u0155\u0156\u0157\u0158\u0159\u0210\u0211\u0212\u0213\u1E58\u1E59\u1E5A\u1E5B\u1E5C\u1E5D\u1E5E\u1E5F\uD835\uDC11\uD835\uDC2B\uD835\uDC45\uD835\uDC5F\uD835\uDC79\uD835\uDC93\uD835\uDCC7\uD835\uDCE1\uD835\uDCFB\uD835\uDD2F\uD835\uDD63\uD835\uDD7D\uD835\uDD97\uD835\uDDB1\uD835\uDDCB\uD835\uDDE5\uD835\uDDFF\uD835\uDE19\uD835\uDE33\uD835\uDE4D\uD835\uDE67\uD835\uDE81\uD835\uDE9B\u02B3\u1D3F\u1D63"],["s","sS\uFF33\uFF53\uD835\uDC12\uD835\uDC2C\uD835\uDC46\uD835\uDC60\uD835\uDC7A\uD835\uDC94\uD835\uDCAE\uD835\uDCC8\uD835\uDCE2\uD835\uDCFC\uD835\uDD16\uD835\uDD30\uD835\uDD4A\uD835\uDD64\uD835\uDD7E\uD835\uDD98\uD835\uDDB2\uD835\uDDCC\uD835\uDDE6\uD835\uDE00\uD835\uDE1A\uD835\uDE34\uD835\uDE4E\uD835\uDE68\uD835\uDE82\uD835\uDE9C\u24C8\u24E2\u0455\uA731\uABAA\uA4E2\u0405\u13DA\u015A\u015B\u015C\u015D\u015E\u015F\u0160\u0161\u017F\u0218\u0219\u1E60\u1E61\u1E62\u1E63\u1E64\u1E65\u1E66\u1E67\u1E68\u1E69\u1E9B\uD835\uDC12\uD835\uDC2C\uD835\uDC46\uD835\uDC60\uD835\uDC7A\uD835\uDC94\uD835\uDCAE\uD835\uDCC8\uD835\uDCE2\uD835\uDCFC\uD835\uDD16\uD835\uDD30\uD835\uDD4A\uD835\uDD64\uD835\uDD7E\uD835\uDD98\uD835\uDDB2\uD835\uDDCC\uD835\uDDE6\uD835\uDE00\uD835\uDE1A\uD835\uDE34\uD835\uDE4E\uD835\uDE68\uD835\uDE82\uD835\uDE9C\u02E2\u209B\uA7F1"],["t","tT\uFF34\uFF54\uD835\uDC13\uD835\uDC2D\uD835\uDC47\uD835\uDC61\uD835\uDC7B\uD835\uDC95\uD835\uDCAF\uD835\uDCC9\uD835\uDCE3\uD835\uDCFD\uD835\uDD17\uD835\uDD31\uD835\uDD4B\uD835\uDD65\uD835\uDD7F\uD835\uDD99\uD835\uDDB3\uD835\uDDCD\uD835\uDDE7\uD835\uDE01\uD835\uDE1B\uD835\uDE35\uD835\uDE4F\uD835\uDE69\uD835\uDE83\uD835\uDE9D\u24C9\u24E3\u0422\u03C4\u1D1B\u0442\uAB72\uA4D4\u2CA7\u03A4\u13A2\u2CA6\u0162\u0163\u0164\u0165\u021A\u021B\u1E6A\u1E6B\u1E6C\u1E6D\u1E6E\u1E6F\u1E70\u1E71\u1E97\uD835\uDC13\uD835\uDC2D\uD835\uDC47\uD835\uDC61\uD835\uDC7B\uD835\uDC95\uD835\uDCAF\uD835\uDCC9\uD835\uDCE3\uD835\uDCFD\uD835\uDD17\uD835\uDD31\uD835\uDD4B\uD835\uDD65\uD835\uDD7F\uD835\uDD99\uD835\uDDB3\uD835\uDDCD\uD835\uDDE7\uD835\uDE01\uD835\uDE1B\uD835\uDE35\uD835\uDE4F\uD835\uDE69\uD835\uDE83\uD835\uDE9D\uD835\uDEBB\uD835\uDED5\uD835\uDEF5\uD835\uDF0F\uD835\uDF2F\uD835\uDF49\uD835\uDF69\uD835\uDF83\uD835\uDFA3\uD835\uDFBD\u1D40\u1D57\u209C"],["u","uU\uFF35\uFF55\uD835\uDC14\uD835\uDC2E\uD835\uDC48\uD835\uDC62\uD835\uDC7C\uD835\uDC96\uD835\uDCB0\uD835\uDCCA\uD835\uDCE4\uD835\uDCFE\uD835\uDD18\uD835\uDD32\uD835\uDD4C\uD835\uDD66\uD835\uDD80\uD835\uDD9A\uD835\uDDB4\uD835\uDDCE\uD835\uDDE8\uD835\uDE02\uD835\uDE1C\uD835\uDE36\uD835\uDE50\uD835\uDE6A\uD835\uDE84\uD835\uDE9E\u24CA\u24E4\u03C5\u1D1C\uAB9C\uA4F4\u057D\u13CC\u054D\xD9\xDA\xDB\xDC\xF9\xFA\xFB\xFC\u0168\u0169\u016A\u016B\u016C\u016D\u016E\u016F\u0170\u0171\u0172\u0173\u01AF\u01B0\u01D3\u01D4\u01D5\u01D6\u01D7\u01D8\u01D9\u01DA\u01DB\u01DC\u0214\u0215\u0216\u0217\u1E72\u1E73\u1E74\u1E75\u1E76\u1E77\u1E78\u1E79\u1E7A\u1E7B\u1EE4\u1EE5\u1EE6\u1EE7\u1EE8\u1EE9\u1EEA\u1EEB\u1EEC\u1EED\u1EEE\u1EEF\u1EF0\u1EF1\uD835\uDC14\uD835\uDC2E\uD835\uDC48\uD835\uDC62\uD835\uDC7C\uD835\uDC96\uD835\uDCB0\uD835\uDCCA\uD835\uDCE4\uD835\uDCFE\uD835\uDD18\uD835\uDD32\uD835\uDD4C\uD835\uDD66\uD835\uDD80\uD835\uDD9A\uD835\uDDB4\uD835\uDDCE\uD835\uDDE8\uD835\uDE02\uD835\uDE1C\uD835\uDE36\uD835\uDE50\uD835\uDE6A\uD835\uDE84\uD835\uDE9E\uD835\uDED6\uD835\uDF10\uD835\uDF4A\uD835\uDF84\uD835\uDFBE\u1D41\u1D58\u1D64\u1DB8"],["v","vV\uFF36\uFF56\uD835\uDC15\uD835\uDC2F\uD835\uDC49\uD835\uDC63\uD835\uDC7D\uD835\uDC97\uD835\uDCB1\uD835\uDCCB\uD835\uDCE5\uD835\uDCFF\uD835\uDD19\uD835\uDD33\uD835\uDD4D\uD835\uDD67\uD835\uDD81\uD835\uDD9B\uD835\uDDB5\uD835\uDDCF\uD835\uDDE9\uD835\uDE03\uD835\uDE1D\uD835\uDE37\uD835\uDE51\uD835\uDE6B\uD835\uDE85\uD835\uDE9F\u24CB\u24E5\u03BD\u1D20\u0475\uABA9\uA4E6\u0474\u13D9\u1E7C\u1E7D\u1E7E\u1E7F\uD835\uDC15\uD835\uDC2F\uD835\uDC49\uD835\uDC63\uD835\uDC7D\uD835\uDC97\uD835\uDCB1\uD835\uDCCB\uD835\uDCE5\uD835\uDCFF\uD835\uDD19\uD835\uDD33\uD835\uDD4D\uD835\uDD67\uD835\uDD81\uD835\uDD9B\uD835\uDDB5\uD835\uDDCF\uD835\uDDE9\uD835\uDE03\uD835\uDE1D\uD835\uDE37\uD835\uDE51\uD835\uDE6B\uD835\uDE85\uD835\uDE9F\uD835\uDECE\uD835\uDF08\uD835\uDF42\uD835\uDF7C\uD835\uDFB6\u1D5B\u1D65\u2164\u2174"],["w","wW\uFF37\uFF57\uD835\uDC16\uD835\uDC30\uD835\uDC4A\uD835\uDC64\uD835\uDC7E\uD835\uDC98\uD835\uDCB2\uD835\uDCCC\uD835\uDCE6\uD835\uDD00\uD835\uDD1A\uD835\uDD34\uD835\uDD4E\uD835\uDD68\uD835\uDD82\uD835\uDD9C\uD835\uDDB6\uD835\uDDD0\uD835\uDDEA\uD835\uDE04\uD835\uDE1E\uD835\uDE38\uD835\uDE52\uD835\uDE6C\uD835\uDE86\uD835\uDEA0\u24CC\u24E6\u051D\u1D21\uAB83\uABA4\uA4EA\u051C\u13B3\u13D4\u0174\u0175\u1E80\u1E81\u1E82\u1E83\u1E84\u1E85\u1E86\u1E87\u1E88\u1E89\u1E98\uD835\uDC16\uD835\uDC30\uD835\uDC4A\uD835\uDC64\uD835\uDC7E\uD835\uDC98\uD835\uDCB2\uD835\uDCCC\uD835\uDCE6\uD835\uDD00\uD835\uDD1A\uD835\uDD34\uD835\uDD4E\uD835\uDD68\uD835\uDD82\uD835\uDD9C\uD835\uDDB6\uD835\uDDD0\uD835\uDDEA\uD835\uDE04\uD835\uDE1E\uD835\uDE38\uD835\uDE52\uD835\uDE6C\uD835\uDE86\uD835\uDEA0\u02B7\u1D42"],["x","xX\uFF38\uFF58\uD835\uDC17\uD835\uDC31\uD835\uDC4B\uD835\uDC65\uD835\uDC7F\uD835\uDC99\uD835\uDCB3\uD835\uDCCD\uD835\uDCE7\uD835\uDD01\uD835\uDD1B\uD835\uDD35\uD835\uDD4F\uD835\uDD69\uD835\uDD83\uD835\uDD9D\uD835\uDDB7\uD835\uDDD1\uD835\uDDEB\uD835\uDE05\uD835\uDE1F\uD835\uDE39\uD835\uDE53\uD835\uDE6D\uD835\uDE87\uD835\uDEA1\u24CD\u24E7\u0445\u03C7\uA4EB\u2CAD\u0425\u03A7\u2CAC\u1E8A\u1E8B\u1E8C\u1E8D\uD835\uDC17\uD835\uDC31\uD835\uDC4B\uD835\uDC65\uD835\uDC7F\uD835\uDC99\uD835\uDCB3\uD835\uDCCD\uD835\uDCE7\uD835\uDD01\uD835\uDD1B\uD835\uDD35\uD835\uDD4F\uD835\uDD69\uD835\uDD83\uD835\uDD9D\uD835\uDDB7\uD835\uDDD1\uD835\uDDEB\uD835\uDE05\uD835\uDE1F\uD835\uDE39\uD835\uDE53\uD835\uDE6D\uD835\uDE87\uD835\uDEA1\uD835\uDEBE\uD835\uDED8\uD835\uDEF8\uD835\uDF12\uD835\uDF32\uD835\uDF4C\uD835\uDF6C\uD835\uDF86\uD835\uDFA6\uD835\uDFC0\u02E3\u1D61\u1D6A\u2093\u2169\u2179"],["y","yY\uFF39\uFF59\uD835\uDC18\uD835\uDC32\uD835\uDC4C\uD835\uDC66\uD835\uDC80\uD835\uDC9A\uD835\uDCB4\uD835\uDCCE\uD835\uDCE8\uD835\uDD02\uD835\uDD1C\uD835\uDD36\uD835\uDD50\uD835\uDD6A\uD835\uDD84\uD835\uDD9E\uD835\uDDB8\uD835\uDDD2\uD835\uDDEC\uD835\uDE06\uD835\uDE20\uD835\uDE3A\uD835\uDE54\uD835\uDE6E\uD835\uDE88\uD835\uDEA2\u24CE\u24E8\u0443\u03A5\u028F\uAB79\uA4EC\u2CA9\u0423\u13A9\u2CA8\xDD\xFD\xFF\u0176\u0177\u0178\u0232\u0233\u1E8E\u1E8F\u1E99\u1EF2\u1EF3\u1EF4\u1EF5\u1EF6\u1EF7\u1EF8\u1EF9\uD835\uDC18\uD835\uDC32\uD835\uDC4C\uD835\uDC66\uD835\uDC80\uD835\uDC9A\uD835\uDCB4\uD835\uDCCE\uD835\uDCE8\uD835\uDD02\uD835\uDD1C\uD835\uDD36\uD835\uDD50\uD835\uDD6A\uD835\uDD84\uD835\uDD9E\uD835\uDDB8\uD835\uDDD2\uD835\uDDEC\uD835\uDE06\uD835\uDE20\uD835\uDE3A\uD835\uDE54\uD835\uDE6E\uD835\uDE88\uD835\uDEA2\uD835\uDEBC\uD835\uDEF6\uD835\uDF30\uD835\uDF6A\uD835\uDFA4\u02B8"],["z","zZ\uFF3A\uFF5A\uD835\uDC19\uD835\uDC33\uD835\uDC4D\uD835\uDC67\uD835\uDC81\uD835\uDC9B\uD835\uDCB5\uD835\uDCCF\uD835\uDCE9\uD835\uDD03\uD835\uDD1D\uD835\uDD37\uD835\uDD51\uD835\uDD6B\uD835\uDD85\uD835\uDD9F\uD835\uDDB9\uD835\uDDD3\uD835\uDDED\uD835\uDE07\uD835\uDE21\uD835\uDE3B\uD835\uDE55\uD835\uDE6F\uD835\uDE89\uD835\uDEA3\u24CF\u24E9\u2124\u2128\u0396\u1D22\uAB93\uA4DC\u2C8D\u13C3\u2C8C\u0179\u017A\u017B\u017C\u017D\u017E\u1E90\u1E91\u1E92\u1E93\u1E94\u1E95\uD835\uDC19\uD835\uDC33\uD835\uDC4D\uD835\uDC67\uD835\uDC81\uD835\uDC9B\uD835\uDCB5\uD835\uDCCF\uD835\uDCE9\uD835\uDD03\uD835\uDD37\uD835\uDD6B\uD835\uDD85\uD835\uDD9F\uD835\uDDB9\uD835\uDDD3\uD835\uDDED\uD835\uDE07\uD835\uDE21\uD835\uDE3B\uD835\uDE55\uD835\uDE6F\uD835\uDE89\uD835\uDEA3\uD835\uDEAD\uD835\uDEE7\uD835\uDF21\uD835\uDF5B\uD835\uDF95\u1DBB"]]);
function zt(u){return u.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")};
var itr="\\u00ad\\u034f\\u0600-\\u0605\\u061c\\u06dd\\u070f\\u0890\\u0891\\u08e2\\u115f\\u1160\\u17b4\\u17b5\\u180b-\\u180f\\u200b-\\u200f\\u202a-\\u202e\\u2060-\\u206f\\u3164\\ufe00-\\ufe0f\\ufeff\\uffa0\\ufff0-\\ufffb\\u{110bd}\\u{110cd}\\u{13430}-\\u{1343f}\\u{1bca0}-\\u{1bca3}\\u{1d173}-\\u{1d17a}\\u{16fe4}\\u{e0000}-\\u{e0fff}";
var I={"\uFF1C":"<","\uFF1E":">","\uFE64":"<","\uFE65":">","\u2329":"<","\u232A":">","\u27E8":"<","\u27E9":">","\u3008":"<","\u3009":">","\u2039":"<","\u203A":">","\u02C2":"<","\u02C3":">","\u1438":"<","\u1433":">","\u276C":"<","\u276D":">","\u276E":"<","\u276F":">","\u2770":"<","\u2771":">","\u29FC":"<","\u29FD":">","\u226E":"<","\u226F":">","\u227A":"<","\u227B":">","\u22D6":"<","\u22D7":">","\uFF0F":"/","\u2215":"/","\u2044":"/"};
var Z="\\u0300-\\u0344\\u0346-\\u036f\\u0483-\\u0489\\u0591-\\u05bd\\u05bf\\u05c1\\u05c2\\u05c4\\u05c5\\u05c7\\u0610-\\u061a\\u064b-\\u065f\\u0670\\u06d6-\\u06dc\\u06df-\\u06e4\\u06e7\\u06e8\\u06ea-\\u06ed\\u1ab0-\\u1aff\\u1dc0-\\u1dff\\u20d0-\\u20ff\\u3099\\u309a\\ufe20-\\ufe2f";
var x=`${itr}${Z}\\x00-\\x08\\x0b\\x0c\\x0e-\\x1f\\x7f-\\x9f\\u2028\\u2029`;
var V="\\x0b\\x0c\\x1c-\\x1f\\x85\\u2028\\u2029\\u115f\\u1160\\u3164\\uffa0";
var bSt="A-Za-z0-9_\\-";
var j=`(?:[^${bSt}]|$)`;
var wSt="\\p{Pd}\\u2212\\u207b\\u208b\\u02d7\\u2796\\u2043\\u30fc\\uff70";
var QIe=":\\uff1a\\ufe55\\ufe13\\ua789\\u2236\\u02d0\\u02f8\\u05c3\\u0589\\u0703\\u0704\\u16ec\\u1803\\u1809\\u205a\\ua4fd\\ufe30";
var z="=\\u207c\\u208c\\ufe66\\uff1d\\ua78a\\u2550\\u268c\\ua4ff\\u{1f7f0}";
var F="\u2E40\u30A0\u1400";
var B=`\\s\\u2800${x}`;
var atr=`_\\p{Pc}\\u2017\\u02cd\\u07fa\\u0640${wSt}`;
var i=(()=>{let u={"<":"<",">":">","/":"/"};for(let[d,e]of Object.entries(I))u[e]+=d;return{open:u["<"],close:u[">"],slash:u["/"],filler:`^${bSt}${u["<"]}${u[">"]}`,lookalikePattern:new RegExp(`[${Object.keys(I).join("")}]`,"g"),invisiblePattern:new RegExp(`[${itr}]`,"gu")}})();
function ZIe(u,d){return`(?=([${u}]*))(?:\\${d})`};
function ESt(u){return ZIe(x,u)};
var k={"\u0430":"a","\u0435":"e","\u043E":"o","\u0440":"p","\u0441":"c","\u0443":"y","\u0445":"x","\u043A":"k","\u0456":"i","\u0458":"j","\u0455":"s","\u0501":"d","\u051B":"q","\u051D":"w","\u04BB":"h","\u04CF":"l","\u0412":"b","\u041C":"m","\u041D":"h","\u0422":"t","\u03B1":"a","\u03B5":"e","\u03B9":"i","\u03BA":"k","\u03BD":"v","\u03BF":"o","\u03C1":"p","\u03C4":"t","\u03C5":"u","\u03C7":"x","\u03F3":"j","\u0392":"b","\u0396":"z","\u0397":"h","\u039C":"m","\u039D":"n","\u03A5":"y","\u1D00":"a","\u0299":"b","\u1D04":"c","\u1D05":"d","\u1D07":"e","\uA730":"f","\u0262":"g","\u029C":"h","\u026A":"i","\u1D0A":"j","\u1D0B":"k","\u029F":"l","\u1D0D":"m","\u0274":"n","\u1D0F":"o","\u1D18":"p","\u0280":"r","\uA731":"s","\u1D1B":"t","\u1D1C":"u","\u1D20":"v","\u1D21":"w","\u028F":"y","\u1D22":"z","\u0251":"a","\u0261":"g","\u0131":"i","\u0475":"v","\u0442":"t","\u043C":"m","\uAB70":"d","\uAB71":"r","\uAB72":"t","\uAB79":"y","\uAB7A":"a","\uAB7B":"j","\uAB7C":"e","\uAB83":"w","\uAB87":"m","\uAB8B":"h","\uAB90":"g","\uAB92":"h","\uAB93":"z","\uAB9C":"u","\uAB9F":"b","\uABA2":"r","\uABA4":"w","\uABA9":"v","\uABAA":"s","\uABAE":"l","\uABAF":"c","\uABB2":"p","\uABB6":"k","\uABB7":"d","\u13FC":"b","\uA4D0":"b","\uA4D1":"p","\uA4D3":"d","\uA4D4":"t","\uA4D6":"g","\uA4D7":"k","\uA4D9":"j","\uA4DA":"c","\uA4DC":"z","\uA4DD":"f","\uA4DF":"m","\uA4E0":"n","\uA4E1":"l","\uA4E2":"s","\uA4E3":"r","\uA4E6":"v","\uA4E7":"h","\uA4EA":"w","\uA4EB":"x","\uA4EC":"y","\uA4EE":"a","\uA4F0":"e","\uA4F2":"i","\uA4F3":"o","\uA4F4":"u","\u0566":"q","\u0570":"h","\u0578":"n","\u057D":"u","\u0581":"g","\u0585":"o","\u03F2":"c","\u2CA5":"c","\u0269":"i","\u2C81":"a","\u2C83":"b","\u2C89":"e","\u2C8F":"h","\u2C93":"i","\u2C95":"k","\u2C99":"m","\u2C9B":"n","\u2C9F":"o","\u2CA3":"p","\u2CA7":"t","\u2CA9":"y","\u2CAD":"x","\u2C8D":"z"};
var du=(()=>{let u={...k};for(let[d,e]of Object.entries(k)){let a=d.toUpperCase();if(a!==d&&[...a].length===1&&!(a in u)&&!/^[A-Za-z]$/.test(a))u[a]=e}return{table:u,pattern:new RegExp(`[${Object.keys(u).join("")}]`,"gu")}})();
function Swe(u){let{table:d,pattern:e}=du,a=(c)=>c.replace(e,(n)=>d[n]??n);return a(eu(a(u)).normalize("NFKC"))};
function eu(u){return u.normalize("NFKD").replace(/\p{M}+/gu,"")};
function f9r({name:u,close:d,span:e=(c)=>`[^${d}]{0,${c}}`,assign:a=(c)=>`${c}(?=(?<assignGap>[${B}]*))\\k<assignGap>[${z}${F}]`}){return`(?:(?![${u}])|(?<=[${V}][${x}]*))${e(120)}(?<![\\w-])${a("source")}`};
var au=/[\u0080-\u{10ffff}]/u;
var fu=new RegExp(`[${i.open}]`,"u");
var cu=new RegExp(`[${wSt}]`,"gu");
var nu=new RegExp(`^[${atr}]$`,"u");
var tu=String.fromCharCode(65533);
var h=57344;
var ru=h+32;
var ou=h+126;
var y=57856;
var H=y+32;
var v=y+126;
var N=`${String.fromCharCode(H)}-${String.fromCharCode(v)}`;
var K=["nv","uy"];
var S=57600;
var su=S+255;
var P=String.fromCharCode(S+240);
var T=new Map;
var bu=32768;
var X=new Uint8Array(4352);
var m;
function A(u){return String.fromCharCode(h+u.charCodeAt(0))};
function L(u){return String.fromCharCode(y+u.charCodeAt(0))};
function iu(u){let d=T.get(u);if(d!==void 0)return d;let e=q(u);if(T.size>=bu)T.clear();return T.set(u,e),e};
function q(u){let d=u.codePointAt(0),e=u;if(d>=ru&&d<=ou||d>=H&&d<=v||d>=S&&d<=su)e=tu;else if(F.includes(u))e=P;else{if(m===void 0){m=new Map;for(let[f,t]of R)for(let o of t)m.set(o,f)}let a=new Set;for(let f of[u,u.toLowerCase(),u.toUpperCase(),u.toUpperCase().toLowerCase(),u.toLowerCase().toUpperCase()]){let t=m.get(f);if(t!==void 0)a.add(t)}let c=[...a].sort().join(""),n=c||Swe(u).replace(cu,"-").toLowerCase().replace(/\u00DF/g,"ss");if(a.size>1){let f=K.indexOf(c);e=f===-1?A(c):String.fromCharCode(S+f)}else if(/^[a-z0-9_-]+$/.test(n))e=[...n].map((f,t)=>t===0?A(f):L(f)).join("");else if(nu.test(u))e=A("_")}return e};
var lu=256;
function gu(u){let d=1;for(let e=Math.max(u<<8,128);e<u+1<<8;e++){let a=String.fromCodePoint(e);if(q(a)!==a){d=2;break}}return X[u]=d,d};
function pu(u){if(/^[a-z0-9]$/.test(u)){let d=K.flatMap((e,a)=>e.includes(u)?[String.fromCharCode(S+a)]:[]);return`[${u}${A(u)}${L(u)}${d.join("")}]`}if(u==="-"||u==="_")return`[_\\-${A("_")}${A("-")}${L("_")}${L("-")}${P}]`;throw Error("createTagFormScrub: tag names are lowercase [a-z0-9_-]")};
function Au({tags:u,tail:d}){let{open:e,close:a,filler:c}=i,n=0,f=(r)=>[...r].map((b,l)=>(l===0?"":ESt(++n))+pu(b)).join(""),t=u.map(f),o=d===void 0?j:`${ESt(++n)}${d({name:bSt,close:a,colon:QIe,span:(r)=>`[${N}]*(?:[^${a}${N}][${N}]*){0,${r}}`,spell:f,assign:(r)=>`${f(r)}${ZIe(B,++n)}[${z}${P}]`})}`;return new RegExp(`[${e}](?!\\\\)(?=[${c}]*?(?:${t.join("|")})${o})`,"giu")};
function g9r(u){let d=u.filter((e)=>e.tags.length>0).map(Au);return{openerOffsets(e){return M(e,d)},neutralize(e){let a="",c=0;for(let n of M(e,d))a+=`${e.slice(c,n)}<\\`,c=n+1;return a+e.slice(c)}}};
function Eu(u){let d=[],e=[],a,c="",n=0;for(let f=0;f<u.length;f++){let t=u.charCodeAt(f);if(t<128)continue;let o=u.charCodeAt(f+1),r=t>=55296&&t<=56319&&o>=56320&&o<=57343?2:1,b=(r===2?u.codePointAt(f):t)>>8,l=X[b];if(l===0){if(a??=new Uint16Array(4352),++a[b]>=lu)l=gu(b)}if(l===1){f+=r-1;continue}let p=iu(u.slice(f,f+r));if(c+=u.slice(n,f)+p,n=f+r,p.length!==r)d.push(c.length),e.push(p.length-r+(e.at(-1)??0));f+=r-1}return c+=u.slice(n),{reading:c,offsetInText(f){let t=0,o=d.length;while(t<o){let r=t+o>>1;if(d[r]<=f)t=r+1;else o=r}return t===0?f:f-e[t-1]}}};
function M(u,d){if(!fu.test(u))return[];let e=au.test(u)?Eu(u):void 0,a=e?.reading??u,c=new Set;for(let n of d)for(let f of a.matchAll(n))c.add(e?e.offsetInText(f.index):f.index);return[...c].sort((n,f)=>n-f)};
return {R,zt,itr,I,Z,x,V,bSt,j,wSt,QIe,z,F,B,atr,i,ZIe,ESt,k,du,Swe,eu,f9r,au,fu,cu,nu,tu,h,ru,ou,y,H,v,N,K,S,su,P,T,bu,X,m,A,L,iu,q,lu,gu,pu,Au,g9r,Eu,M};
}
function module26(imports){
const Z=imports["Z"];
const Le=imports["Le"];
const At=imports["At"];
const pEt=imports["pEt"];
var net="cowritten-artifact-html";
var EOe="artifact-file-content";
var Dfe="artifact-type-instructions";
var vOe="artifact-origin-notes";
var swt="artifact-stored-declaration";
var dp="command-name";
var yf="command-message";
var mY="command-args";
var iwt="bash-input";
var Qse="bash-stdout";
var VU="bash-stderr";
var Wor="bash-exit-code";
var id="local-command-stdout";
var Xp="local-command-stderr";
var hW="local-command-caveat";
var KWe=[iwt,Qse,VU,Wor,id,Xp,hW];
var GK="tick";
var Ru="task-notification";
var Oz="task-id";
var zK="tool-use-id";
var ZZ="task-type";
var ret="output-file";
var aC="status";
var wT="summary";
var LTn="remote-review";
var g$="teammate-message";
var mO="channel";
var _W="cross-session-message";
var D="slack-ping";
var x="slack-tag-message";
var Nqt="agent-message";
var COe="fetched-web-content";
var dwt="coordinator-relay";
var AOe=[Ru,Nqt,g$,_W,LTn,D,x,GK,COe,dwt,Dfe,net,EOe,vOe,swt];
var eee=[...KWe,dp,yf,mY,...AOe,mO,"system-reminder","system_reminder","function_results","tool_use_error","sandbox_violations","persisted-output","total_tokens","user-prompt-submit-hook"];
var pD="<system-reminder>";
var TOe="</system-reminder>";
var v=100;
var k=1000;
class I{recentErrors=[];queue=[];droppedBeforeSink=0;sink=null;hardFailMode=void 0;remember(e){if(this.recentErrors.length>=v)this.recentErrors.shift();this.recentErrors.push(e)}dispatch(e){if(this.sink===null){if(this.queue.length>=k){this.droppedBeforeSink++;return}this.queue.push(e);return}switch(e.type){case"error":this.sink.logError(e.error);break;case"mcpError":this.sink.logMCPError(e.serverName,e.error);break;case"mcpDebug":this.sink.logMCPDebug(e.serverName,e.message);break}}attachSink(e){if(this.sink!==null)return;this.sink=e;let r=this.queue;this.queue=[];for(let n of r)this.dispatch(n)}isHardFailMode(){return this.hardFailMode??=process.argv.includes("--hard-fail"),this.hardFailMode}reset(){this.recentErrors=[],this.queue=[],this.droppedBeforeSink=0,this.sink=null,this.hardFailMode=void 0}};
var JWe=new I;
function d(e){let r=Z(e);try{if(Le(process.env.CLAUDE_CODE_USE_BEDROCK)||Le(process.env.CLAUDE_CODE_USE_VERTEX)||Le(process.env.CLAUDE_CODE_USE_FOUNDRY)||Le(process.env.CLAUDE_CODE_USE_ANTHROPIC_AWS)||Le(process.env.CLAUDE_CODE_USE_ANTHROPIC_GOOGLE_CLOUD)||Le(process.env.CLAUDE_CODE_USE_MANTLE)||process.env.DISABLE_ERROR_REPORTING||At())return;let s={error:pEt(r),timestamp:new Date().toISOString()};JWe.remember(s),JWe.dispatch({type:"error",error:r})}catch{}};
return {net,EOe,Dfe,vOe,swt,dp,yf,mY,iwt,Qse,VU,Wor,id,Xp,hW,KWe,GK,Ru,Oz,zK,ZZ,ret,aC,wT,LTn,g$,mO,_W,D,x,Nqt,COe,dwt,AOe,eee,pD,TOe,v,k,I,JWe,d};
}
function module27(imports){
const g9r=imports["g9r"];
const eee=imports["eee"];
const mO=imports["mO"];
const f9r=imports["f9r"];
var K;
function z(){return K??=g9r([{tags:eee.filter((e)=>e!==mO)},{tags:[mO],tail:f9r},{tags:["antml"],tail:({colon:e})=>`[${e}]`}]),K};
function FIe(e){return z().neutralize(e)};
return {K,z,FIe};
}
function module28(imports){
const M2e=imports["M2e"];
const bf=imports["bf"];
const FIe=imports["FIe"];
function DM(t){let r="";for(let n of M2e(bf(t.replace(/\r\n?|[\u2028\u2029]/g,`
`)))){let e=n.codePointAt(0),o=e!==9&&e!==10&&(e<32||e>=127&&e<=159);r+=o?"\uFFFD":n}return r};
function jQ(t){return FIe(s(t))};
var ZVr=new Set([8204,8205,65038,65039]);
var i=/^[\p{Cf}\p{Co}\p{Cn}\p{Cs}\p{DI}]$/u;
function C7e(t){let r=t.codePointAt(0);if(ZVr.has(r)||r===9||r===10||r===13)return!1;return i.test(t)||r<32||r>=127&&r<=159};
function s(t){let r="";for(let n of t.replace(/\r\n?|[\u2028\u2029]/g,`
`)){if(C7e(n))continue;r+=n}return r};
return {DM,jQ,ZVr,i,C7e,s};
}
function module29(imports){
const _7e=imports["_7e"];
const L=imports["L"];
const Oe=imports["Oe"];
const Q7n=imports["Q7n"];
const Lts=imports["Lts"];
const nd=imports["nd"];
const Md=imports["Md"];
const jjt=imports["jjt"];
const gF=imports["gF"];
const yyt=imports["yyt"];
const EJn=imports["EJn"];
const Nts=imports["Nts"];
const npe=imports["npe"];
const l=imports["l"];
const Vd=imports["Vd"];
const at=imports["at"];
const Syt=imports["Syt"];
const re=imports["re"];
const Ng=imports["Ng"];
const ct=imports["ct"];
const Ys=imports["Ys"];
const N=imports["N"];
const KF=imports["KF"];
const YF=imports["YF"];
const USn=imports["USn"];
const Mts=imports["Mts"];
const di=imports["di"];
const Szo=imports["Szo"];
const Xl=imports["Xl"];
const WSn=imports["WSn"];
const Fjt=imports["Fjt"];
const Se=imports["Se"];
const AJn=imports["AJn"];
const _zo=imports["_zo"];
const jQ=imports["jQ"];
const nu=imports["nu"];
const wf=imports["wf"];
const Fm=imports["Fm"];
const G=imports["G"];
const _yt=imports["_yt"];
var woe="engine";
var BBe=Object.freeze({plugin:woe,tier:"core"});
var JGo=Object.freeze([]);
function G0(e){return Object.setPrototypeOf(e,null),e};
var Bo=(e)=>G0((t,o)=>npe(t,e));
var Ko=Object.freeze({ms:0,remainingMs:Number.POSITIVE_INFINITY});
function EPe(e){let{call:t,signal:o,event:r,origin:n}=e,s=G0(t);if(s.to=G0(e.to),s.signal=o,s.is=e.is,s.event=r,s.origin=n,e.caught!==void 0)Object.assign(s,e.caught);return Object.defineProperty(s,"trace",{get:G0(e.trace),enumerable:!0}),Object.defineProperty(s,"budget",{get:G0(e.budget??(()=>Ko)),enumerable:!0}),Object.freeze(s)};
var GG={escape:String.raw`\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f`,placeholder:String.raw`\u{10eeee}`,loneSurrogate:String.raw`\ud800-\udfff`};
var H3=new RegExp(`[${String.raw`\t\n\r`}${GG.escape}${GG.loneSurrogate}${GG.placeholder}]`,"gu");
function ss(e,t){if(N(t)){let o=Object.create(null);for(let r of Object.keys(t).toSorted())Object.defineProperty(o,r,{value:t[r],enumerable:!0});return o}return t};
var is="\x00unserializable:";
function as(){let e=0;return()=>`${is}${++e}`};
var ps=as();
function Un(e){try{return JSON.stringify(e,ss)}catch{return ps()}};
var eJn=new Set(["dimColor","bold","italic","underline","strikethrough","inverse","borderDimColor"]);
var fs=Se(AJn(),1);
var tJn=new Set([...Object.keys(fs.default),"dashed","quote"]);
var uVr=new Set(["color","backgroundColor","borderColor"]);
var fVr=new Set(["flexGrow","flexShrink","gap","columnGap","rowGap","margin","marginX","marginY","marginTop","marginBottom","marginLeft","marginRight","padding","paddingX","paddingY","paddingTop","paddingBottom","paddingLeft","paddingRight"]);
var u7e=new Set(["top","left","right","bottom"]);
var mVr={flexDirection:new Set(["row","column","row-reverse","column-reverse"]),flexWrap:new Set(["nowrap","wrap","wrap-reverse"]),alignItems:new Set(["flex-start","center","flex-end","stretch"]),alignSelf:new Set(["flex-start","center","flex-end","auto"]),justifyContent:new Set(["flex-start","center","flex-end","space-between","space-around","space-evenly"]),overflow:new Set(["visible","hidden"]),display:new Set(["flex","none"]),position:new Set(["relative","absolute"]),wrap:new Set(["wrap","end","middle","truncate-end","truncate","truncate-middle","truncate-start"]),borderStyle:tJn};
var p7e=1e4;
var Pjt=new Set(["width","height","minWidth","minHeight"]);
function Ijt(e,t){let o=mVr[e];if(o!==void 0)return typeof t==="string"&&o.has(t)?void 0:`must be one of ${[...o].join(", ")}`;if(Pjt.has(e)){if(typeof t==="number")return Number.isFinite(t)&&t>=0&&t<=p7e?void 0:`must be a finite number between 0 and ${p7e}`;return typeof t==="string"&&/^\d{1,3}%$/.test(t)?void 0:"must be a number or a percentage"}if(fVr.has(e))return typeof t==="number"&&Number.isFinite(t)&&Math.abs(t)<=p7e?void 0:`must be a finite number within ${p7e}`;if(u7e.has(e))return typeof t==="number"&&Number.isInteger(t)&&Math.abs(t)<=p7e?void 0:`must be an integer within ${p7e} (character cells)`;if(uVr.has(e))return typeof t==="string"&&/^[#a-zA-Z0-9_().,% -]{1,40}$/.test(t)?void 0:"must be a color (a theme key, a name, or hex)";if(eJn.has(e))return typeof t==="boolean"?void 0:"must be a boolean";return"has no value rule"};
var oJn=(e,t)=>G(Array.from(e),(o)=>t.test(o));
var sJn=new RegExp(`[${GG.escape}]`,"u");
var iJn=new RegExp(`[${GG.loneSurrogate}]`,"u");
var aJn=new RegExp(`[${GG.placeholder}]`,"u");
var tpe={AskUserQuestion:"AskUserQuestionPermissionDialog",UserMessage:"UserPromptMessage",AssistantMessage:"AssistantTextMessage",ToolUse:"AssistantToolUseMessage",ToolResult:"UserToolResultMessage",ToolGroup:"CollapsedReadSearchContent",ToolProgress:"ToolProgressHint",CommandOutput:"CommandOutputSite",Spinner:"SpinnerWithVerb",TurnDuration:"TurnDurationMessage",InfoNotice:"InfoNoticeLine",SessionMode:"SessionStateRow",PromptHint:"PromptHintSite",AbovePrompt:"AbovePromptSite",Pane:"PaneSite"};
var LQ=1e5;
var TPe=32;
var kPe=20000;
function fj(e){if(e===null)return"null";let t=typeof e==="object";return Array.isArray(e)?"an array":t?"an object":`a ${typeof e}`};
var Djt=new Set(["UserMessage","AssistantMessage","ToolUse","ToolResult","ToolGroup","CommandOutput","TurnDuration","InfoNotice"]);
var LSn=4;
var NSn=(e)=>wf(e)?e:Fm(e);
var ms=4294967295;
function B(e){let t=e.length,r=typeof t!=="bigint"&&typeof t!=="symbol"?Math.max(Math.trunc(Number(t))||0,0):void 0;if(r===void 0||r>ms)throw new Oe(`a plugin's list claims a length no list has (got ${r??`a ${typeof t}`})`);return r};
function Re(e,t){let o=B(e);for(let r=0;r<o;r+=1)if(r in e&&!t(e[r]))return!1;return!0};
function Y(e){let t=B(e),o=[];o.length=t;for(let r=0;r<t;r+=1)if(r in e)o[r]=e[r];return o};
function fyt(e,t){if(typeof e==="string")return NSn(e);if(!Array.isArray(e)&&!gF(e))return e;if(t.copies.has(e))return t.copies.get(e);if(t.depth>=TPe*LSn||t.nodes>=kPe*LSn)return e;let r=Array.isArray(e)?Y(e).map((a,f)=>[String(f),a]):Object.entries(e);t.copies.set(e,e),t.nodes+=1,t.depth+=1;let n=r.map(([a,f])=>[t.isKeyed?NSn(a):a,fyt(f,t)]);t.depth-=1;let s=n.some(([a,f],m)=>a!==r[m]?.[0]||f!==r[m]?.[1]),i=Array.isArray(e)?n.map(([,a])=>a):Object.fromEntries(n),p=s?i:e;return t.copies.set(e,p),p};
var f7e=(e)=>fyt(e,{copies:new Map,nodes:0,depth:0,isKeyed:!0});
var ZGo={"session.start":(e)=>({cwd:e.cwd}),"session.attach":(e)=>({clientId:e.clientId}),"session.detach":(e)=>({clientId:e.clientId}),"session.measure":(e)=>({changed:e.changed}),"session.end":(e)=>({sessionId:e.sessionId}),"turn.start":(e)=>({turnId:e.turnId}),"turn.complete":(e)=>({text:e.answer,...e.usage&&{usage:e.usage}})};
var C=(e)=>(t,o,r)=>N(t)?e(t,o,r):"something that is not a result object";
function Vo(e){let{deny:t}=e;return t===void 0||typeof t==="string"&&t!==""?void 0:"a deny that is not a non-empty string"};
function De(e,t,o){if(e.deny===void 0)return o(e)?void 0:`neither ${t} nor { deny }`;return typeof e.deny==="string"?o(e)?`a deny beside ${t}`:void 0:"a deny that is not a string"};
function gt(e,t,o=B(e)){for(let r=0;r<o;r+=1){let n=r in e?t(e[r]):void 0;if(n!==void 0)return[r,n]}return};
var cs=(e,t)=>Un(e)!==Un(t);
function cVr(e){let{isError:t,...o}=e;return t===!0?e:o};
function OM(e){if(!Array.isArray(e))return;let t=B(e),o=[];for(let r=0;r<t;r+=1){let n=e[r];if(!(Object.hasOwn(e,r)&&typeof n==="string"))return;o.push(n)}return o};
var d7e=(e)=>OM(e)!==void 0;
function xt(e,t){let o=new Map;for(let r of e)o.set(r,(o.get(r)??0)+1);for(let r of t){let n=o.get(r)??0;if(n===0)return!1;o.set(r,n-1)}return!0};
function fe(e,t,o){let r=e.find((n)=>Un(t[n])!==Un(o[n]));if(!r)return;return`a changed ${r} (the envelope is the engine's; a rewrite keeps ${e.join(", ")})`};
function z0(e,t,o){let r=e.filter((s)=>!Object.hasOwn(t,s)&&Object.hasOwn(o,s));if(r.length===0)return t;let n={...t};for(let s of r)n[s]=o[s];return n};
var Go=Object.freeze(Array(1));
function Xo(e,t){return e===null||typeof e==="string"?void 0:`no { text } (a string, or null to leave the ${t} out)`};
var Gt=({event:e,check:t,checkArgument:o})=>({event:e,check:C(t),checkArgument:o});
var zo=(e,t,o)=>({event:e,checkArgument:(r,n)=>fe(t,r,n),check:C(o)});
function us(e,t,o){if(e===void 0)return;let r=OM(e);if(r===void 0)return"a context that is not a list of texts";if(r.some((a)=>a===""))return"a context with an empty entry";let s=o.filter((a)=>a.ref!==void 0&&a.ref===t),i=(a)=>xt(r,OM(a.context)??[]);return(s.length===0?o.slice(-1):s).every(i)?void 0:"a context without an entry a hook below attached (a hook adds to the context its next gave it; it may not leave an entry out)"};
var ls=(e)=>e===void 0?void 0:"a drop that carries a context";
var Xt=255;
function ds(e){return e===void 0||typeof e==="number"&&Number.isInteger(e)&&e>=0&&e<=Xt?void 0:`an exitCode that is not a whole number from 0 to ${Xt}`};
var ht="an origin other than the engine set (next(e) passes e.origin on)";
function Yo(e,t){return Un(e)===Un(t)?void 0:ht};
function ys(e,t){if(e.model!==t.model)return"a changed model (pinned)";if(typeof e.promptModel!=="string")return"no { promptModel } (a model id)";let o=e.outputStyle;if(!(o===null||N(o)&&typeof o.name==="string"&&typeof o.isKeepingCodingInstructions==="boolean"))return"no { outputStyle } (null, or { name, isKeepingCodingInstructions })";let[n]=["tools","traits","surfaces"].filter((s)=>!d7e(e[s])).map((s)=>`no { ${s} } (a list of names)`);return n};
function gs(e){let{sections:t}=e;if(!Array.isArray(t))return"no { sections } (a list of { id, text, scope })";let o=B(t),r=new Set,n=new Set;for(let s=0;s<o;s+=1){let i=t[s];if(!(Object.hasOwn(t,s)&&N(i)))return`a section that is not { id, text, scope } (at ${s})`;let{id:a,text:f,scope:m}=i;if(typeof a!=="string"||a==="")return`a section without an id (at ${s})`;if(typeof f!=="string")return`a section whose text is not a string (${a})`;if(m!=="shared"&&m!=="session")return`a section whose scope is neither shared nor session (${a})`;if(r.has(a))return`two sections with the id ${a} (a hook finds a section by it)`;if(m==="shared"&&n.has("session"))return`a shared section after a session one (${a}): every shared section goes first`;r.add(a),n.add(m)}return};
function xs(e,t){let o=new Set(t.flatMap((n)=>n.sections).map((n)=>n.text));return(Array.isArray(e.sections)?e.sections:[]).filter(N).flatMap(({text:n})=>typeof n==="string"&&!o.has(n)?[n]:[]).reduce((n,s)=>Math.max(n,s.length),0)};
var zt=32;
function Jo(e,t){if(!N(e))return`an instruction file that is not { path, kind, content } (at ${t})`;let{path:o,kind:r,content:n,parent:s}=e;if(typeof o!=="string"||o==="")return`an instruction file without a path (at ${t})`;if(!(typeof r==="string"&&_zo.some((a)=>a===r)))return`an instruction file whose kind is not one of ${_zo.join(", ")} (${o})`;if(typeof n!=="string")return`an instruction file whose content is not a string (${o})`;return s===void 0||typeof s==="string"?void 0:`an instruction file whose parent is not a string (${o})`};
function qo(e){let t=N(e)?e.path:void 0;return typeof t==="string"?t:""};
function kt(e){if(e===void 0)return;if(!Array.isArray(e))return"instructionFiles that is not a list of { path, kind, content }";let t=B(e),o=new Set;for(let r=0;r<t;r+=1){let n=e[r],s=Jo(n,r);if(s!==void 0)return s;let i=qo(n);if(o.has(i))return`two instruction files with the path ${i}`;o.add(i)}return};
function Qo(e){let{blocks:t}=e,o=kt(e.instructionFiles);if(o!==void 0)return o;if(!Array.isArray(t))return"no { blocks } (a list of { name, text })";let r=B(t);if(r>zt)return`more than ${zt} blocks`;let n=new Set;for(let s=0;s<r;s+=1){let i=t[s];if(!(Object.hasOwn(t,s)&&N(i)))return`a block that is not { name, text } (at ${s})`;let{name:a,text:f}=i;if(typeof a!=="string"||a==="")return`a block without a name (at ${s})`;if(typeof f!=="string")return`a block whose text is not a string (${a})`;if(n.has(a))return`two blocks named ${a} (the engine keys the context by name)`;n.add(a)}return};
function ks(e){switch(e.kind){case"managed":return"Managed";case"user":return"User";case"project":return"Project";case"local":return"Local";case"memory":return"AutoMem"}};
function ezo(e,t){let o=B(e);if(o!==t.length)return!1;for(let r=0;r<o;r+=1){let n=e[r],s=t[r];if(!(!(r in e)||n!==void 0&&s!==void 0&&n.path===s.path&&n.kind===s.kind&&n.content===s.content&&n.parent===s.parent))return!1}return!0};
var ws="Codebase and user instructions are shown below. Be sure to adhere to these instructions. IMPORTANT: These instructions OVERRIDE any default behavior and you MUST follow them exactly as written.";
function Ts(e){switch(e){case"Project":return" (project instructions, checked into the codebase)";case"Local":return" (user's private project instructions, not checked in)";case"AutoMem":return" (user's auto-memory, persists across conversations)";case"Managed":return" (organization-managed policy instructions)";case"User":return" (user's private global instructions for all projects)"}};
function Z7n(e){return e.map((t)=>`Contents of ${t.path}${Ts(t.type)}:

`+(t.type==="AutoMem"?jQ(t.content).trim():t.content.trim())).join(`

`)};
function CPe(e){let t=Z7n(e);return t===""?"":`${ws}

${t}`};
function Ye(e){return CPe(Y(e).map((t)=>({path:t.path,type:ks(t),content:t.content})))};
function Yt(e){return Array.isArray(e)&&kt(e)===void 0};
function tr(e){return Yt(e)?Ye(e):void 0};
function or(e,t,o){let r=new Map;for(let i of[t,...o].flatMap((p)=>p.blocks))r.set(i.name,(r.get(i.name)??new Set).add(i.text));let n=Array.isArray(e.blocks)?Y(e.blocks):[],s=tr(e.instructionFiles);return n.filter(N).flatMap(({name:i,text:p})=>{let a=r.get(String(i))?.has(String(p))===!0||i==="claudeMd"&&p===s;return typeof p==="string"&&!a?[p]:[]}).reduce((i,p)=>Math.max(i,p.length),0)};
function rr(e){if(e!==void 0&&!d7e(e))return"a context that is not a list of texts";return(OM(e)??[]).some((o)=>o==="")?"a context with an empty entry":void 0};
var qb=4096;
function Es(e,t){return t.includes(e)||e.length<=qb?void 0:`a drop over ${qb} characters`};
function bs(e,t){return e===void 0||Un(e)===Un(t)?void 0:"an origin the engine did not set (a hook may leave the origin out of its answer, or answer it as received; it may not set one)"};
function Ss(e,t){return e===t?void 0:typeof e==="boolean"?"a wait the engine did not set (whether the prompt waits its turn is the user's; a hook carries it as received)":"no { wait }"};
function Os(e,t,o){if(e!==void 0&&!OM(e))return"a context that is not a list of texts";let r=e===void 0?[]:OM(e)??[];if(r.some((f)=>f===""))return"a context with an empty entry";let s=Un(t),i=o.filter((f)=>Un(f.result)===s),p=(f)=>xt(r,OM(f.context)??[]);return(i.length===0?o:i).every(p)?void 0:"a context without an entry a hook below attached (a hook adds to the context its next gave it; it may not leave an entry out)"};
function nr(e,t){return e===t||e.length<=qb?void 0:`a text over ${qb} characters`};
function Jt(e){if(!Array.isArray(e))return e;let t=B(e),o=[];for(let r=0;r<t;r+=1){if(!Object.hasOwn(e,r)){o.push(void 0);continue}let n=e[r];o.push(N(n)?Object.fromEntries(Object.keys(n).map((s)=>[s,n[s]])):n)}return o};
var Ce=(e)=>(t,o)=>z0(e,t,o);
function wt(e,...t){let o=new Set(t.flatMap((r)=>OM(r)??[]));return(OM(e)??[]).filter((r)=>!o.has(r)).reduce((r,n)=>Math.max(r,n.length),0)};
function oe(e,...t){return typeof e==="string"&&!t.includes(e)?e.length:0};
var Je=(e)=>(t,o,r)=>oe(t[e],o[e],...r.map((n)=>n[e]));
var V=(e)=>({event:e,check:C((t)=>De(t,"{ value }",(o)=>Object.hasOwn(o,"value")))});
var qt=32000;
var Qt=(e,t)=>Object.fromEntries(e.map((o)=>[o,t(o)]));
function sr(e,t){if(Un(e.origin)!==Un(t.origin))return"a changed origin (the engine set it; next(e) passes it on)";return typeof e.text==="string"?void 0:"no { text } (a string)"};
var Zt=(e,t,o={restored:[],passedProblem:()=>{return}})=>({event:e,restoreArgument:(r,n)=>z0(["origin",...o.restored],r,n),checkArgument:(r,n)=>sr(r,n)??o.passedProblem(r),measureArgument:(r,n)=>oe(r.text,n.text),check:C((r)=>typeof r[t]==="boolean"?void 0:`no { ${t} } (true or false)`)});
var ir=(e)=>WSn(e.mode)?void 0:`a mode that is not one of ${Fjt.join(", ")}`;
var eo=["start","end"];
var xjt=["color","backgroundColor","dimColor","bold","italic","underline","strikethrough"];
var ar=[...eo,...xjt];
function vs(e){return typeof e==="string"||typeof e==="number"||typeof e==="boolean"?e:""};
function Cs(e){if(!N(e))return" must be an object with start and end";let o=Object.keys(e).find((n)=>!ar.includes(n));if(o!==void 0)return`.${o} is not a decoration key (${ar.join(", ")})`;let r=eo.find((n)=>!Number.isInteger(e[n]));if(r!==void 0)return`.${r} must be an integer (a UTF-16 offset)`;for(let n of xjt){let s=e[n],p=s===void 0?void 0:Ijt(n,vs(s));if(p!==void 0)return`.${n} ${p}`}return};
function GBe(e){if(e===void 0)return;if(!Array.isArray(e))return"decorations must be an array of { start, end } runs";let o=e,r=B(o);for(let n=0;n<r;n+=1){let s=Cs(o[n]);if(s!==void 0)return`decorations[${n}]${s}`}return};
function pr(e,t){let{refusal:o,...r}=e;return o!==void 0&&r.isFilled===!1&&t.some((s)=>s.refusal===o)?{...r,refusal:o}:r};
var Ps={...Zt("prompt.fill","isFilled",{restored:["mode"],passedProblem:(e)=>ir(e)??GBe(e.decorations)}),stripResult:pr};
var Is=(e)=>Array.isArray(e.changed)?void 0:"no { changed }";
var fr=(e)=>typeof e.clientId==="string"?void 0:"no { clientId }";
var mr=(e)=>typeof e.cwd==="string"?void 0:"no { cwd }";
var Ns=(e)=>typeof e.sessionId==="string"?void 0:"no { sessionId }";
var cr=(e)=>typeof e.turnId==="string"?void 0:"no { turnId }";
var ur=["hook_event_name","session_id","transcript_path","cwd","scratchpad_dir","prompt_id","permission_mode","agent_id","agent_type","served_call","caller_session_id","effort"];
var lr=(e,t)=>fe(ur,e,t);
function dr(e){if(!N(e))return"an updatedPermissions entry that is not an object";if(!(typeof e.destination==="string"&&["userSettings","projectSettings","localSettings","session","cliArg"].includes(e.destination)))return"an updatedPermissions entry with an unknown destination";switch(e.type){case"addRules":case"replaceRules":case"removeRules":return(e.behavior==="allow"||e.behavior==="deny"||e.behavior==="ask")&&Array.isArray(e.rules)&&Re(e.rules,(r)=>N(r)&&typeof r.toolName==="string"&&(r.ruleContent===void 0||typeof r.ruleContent==="string"))?void 0:`an updatedPermissions ${e.type} without rules and a behavior`;case"setMode":return[...KF,YF].includes(e.mode)?void 0:"an updatedPermissions setMode with an unknown mode";case"addDirectories":case"removeDirectories":return d7e(e.directories)?void 0:`an updatedPermissions ${e.type} without directories`;default:return"an updatedPermissions entry of an unknown type"}};
function yr(e){let t=e===void 0;if(!N(e))return t?void 0:"a decision that is not an object";let o=e;if(o.behavior==="deny")return(o.message===void 0||typeof o.message==="string")&&(o.interrupt===void 0||typeof o.interrupt==="boolean")?void 0:"a deny decision whose message or interrupt has the wrong type";if(o.behavior!=="allow")return"a decision whose behavior is not allow or deny";if(!(o.updatedInput===void 0||N(o.updatedInput)))return"an allow decision whose updatedInput is not an object";let{updatedPermissions:n}=o,s=Array.isArray(n);return s||n===void 0?gt(s?n:[],dr)?.[1]:"an allow decision whose updatedPermissions is not a list"};
function gr(e){let{permissionDecision:t}=e;return t===void 0||t==="allow"||t==="deny"||t==="ask"?yr(e.decision):"a permissionDecision that is not allow, deny or ask"};
var xr=(e)=>[...["block","stopReason","sessionTitle","initialUserMessage","displayContent","permissionDecisionReason","worktreePath"].filter((t)=>e[t]!==void 0&&typeof e[t]!=="string"),...["preventContinuation","suppressOriginalPrompt","reloadSkills","retry"].filter((t)=>e[t]!==void 0&&e[t]!==!0),...["additionalContext","watchPaths"].filter((t)=>e[t]!==void 0&&!d7e(e[t]))];
function hr(e){let t=xr(e);return t.length>0?`${t.join(", ")} of the wrong type`:gr(e)};
function nJn(e){return{event:e,check:C(hr),checkArgument:lr}};
function to(e,t){let{description:o,argumentHint:r,isHidden:n}=e;if(typeof o!=="string")return"no { description } (a string)";if(!(r===void 0||typeof r==="string"))return"an argumentHint that is not a string";if(typeof n!=="boolean")return"no { isHidden } (a boolean)";let a=o===t.description||o.length<=qb,f=r===void 0||r===t.argumentHint||r.length<=qb;return a&&f?void 0:`a description or argumentHint over ${qb} characters`};
var Ms={event:"command.describe",restoreArgument:(e,t)=>z0(["provider"],e,t),checkArgument:(e,t)=>{if(e.command!==t.command)return"a changed command (the engine lists and caches by it)";if(e.immediate!==t.immediate)return"a changed immediate (read only: the command declares whether it runs mid-turn; next(e) passes it on)";return Un(e.provider)===Un(t.provider)?to(e,t):"a changed provider (pinned: who provides the command is a fact)"},check:C(to)};
function kr(e,t){if(e.context!==void 0)return e;let r=(t.find((n)=>n.ref!==void 0&&n.ref===e.ref)??t.at(-1))?.context;return r===void 0?e:{...e,context:r}};
var js={event:"command.run",restoreArgument:Ce(["presentation"]),checkArgument:(e,t)=>{if(e.command!==t.command)return"a changed command (the engine runs the one it resolved)";if(Un(e.presentation)!==Un(t.presentation))return"a changed presentation (pinned: where the answer shows is a fact)";return typeof e.args==="string"?Yo(e.origin,t.origin):"no { args } (a string)"},measureArgument:(e,t)=>oe(e.args,t.args),settle:(e)=>({text:e.text,...e.context!==void 0&&{context:OM(e.context)??Go},ref:e.ref,...e.exitCode!==void 0&&{exitCode:e.exitCode}}),restoreResult:kr,check:C((e,t,o)=>{let{text:r,context:n,ref:s,exitCode:i}=e;if(s!==void 0&&typeof s!=="number")return"a ref that is not the one next(e) gave";return r!==void 0&&typeof r!=="string"?"a text that is not a string":ds(i)??us(n,s,o??[])}),measure:(e,t,o)=>Math.max(oe(e.text,...o.map((r)=>r.text)),wt(e.context,...o.map((r)=>r.context)))};
var wr=(e)=>({...e,sections:Jt(e.sections)});
var Fs={event:"prompt.compose",pinnedKeys:["model"],restoreArgument:Ce(["model"]),checkArgument:ys,settle:wr,check:C(gs),measure:(e,t,o)=>xs(e,o)};
function Tt(e,t){let o=e.key!==t.key,r=Un(e.provider)!==Un(t.provider);return(o?"a changed key (pinned)":void 0)??(r?"a changed provider (pinned: a fact)":void 0)};
function oo(e,t){let{label:o,description:r,isHidden:n}=e;if(!(typeof o==="string"&&o!==""))return"no { label } (a non-empty string)";if(typeof n!=="boolean")return"no { isHidden } (a boolean)";if(r!==void 0&&typeof r!=="string")return"a description that is not a string";let i=o===t.label||o.length<=qb,p=r===void 0||r===t.description||r.length<=qb;return i&&p?void 0:`a label or description over ${qb} characters`};
var Ds={event:"config.describe",checkArgument:(e,t)=>Tt(e,t)??oo(e,t),restoreArgument:Ce(["provider"]),check:C(oo)};
function Ojt(e){let t=typeof e==="boolean"||typeof e==="string"||Number.isFinite(e),o=Array.isArray(e)&&Re(e,(n)=>typeof n==="string");return t||o?void 0:"a value that is not a boolean, a string, a number or a list of strings"};
var Us={event:"config.set",restoreArgument:Ce(["previous","provider","origin"]),checkArgument:(e,t)=>{let o=Un(e.previous)!==Un(t.previous),r=Un(e.origin)!==Un(t.origin),n=Object.hasOwn(e,"value");return Tt(e,t)??(o?"a changed previous (pinned)":void 0)??(r?"a changed origin (the engine sets it)":void 0)??(n?Ojt(e.value):"no { value }")},settle:(e)=>e.deny===void 0?{value:e.value}:{deny:e.deny},check:C((e)=>{let t=e.deny,r=typeof t==="string"&&t.length>qb?`a deny over ${qb}`:void 0;return De(e,"{ value }",(s)=>Object.hasOwn(s,"value"))??r??(t===void 0?Ojt(e.value):void 0)})};
function Et(e,t){return e.name!==t.name?"a changed name (the variable read or written; next(e) passes it on)":void 0};
var Bs={event:"env.get",check:V("env.get").check,checkArgument:Et};
var Ks={event:"env.set",check:V("env.set").check,checkArgument:Et};
function Er(e,t){if(e!==void 0&&t===void 0)return"an element where the move named none (one of the engine's stops)";if(e===void 0&&t!==void 0)return"no element where the move named one (a rewrite names another)";return e===void 0||typeof e==="string"&&e!==""?void 0:"an element that is not a non-empty string"};
var ro=["component","requestId","plugin","origin"];
var Vs={event:"ui.focus",restoreArgument:(e,t)=>z0([...ro,"element"],e,t),checkArgument:(e,t)=>fe(ro,e,t)??Er(e.element,t.element),check:C(Vo)};
var rJn=64;
function uyt(e){return typeof e==="string"&&e.length<=rJn&&/^[A-Za-z0-9_-]+$/.test(e)?void 0:`id is 1 to ${rJn} of letters, digits, _ or -`};
var Xs={event:"ui.close",check:V("ui.close").check,checkArgument:(e,t)=>{let o=uyt(e.id);if(o!==void 0)return`an unusable id: ${o}`;if(e.id!==t.id)return"a changed id (the pane being closed; next(e) passes it on)";if(e.origin===void 0)return"no origin (next(e) passes e.origin on; a rewrite spreads it: next({ ...e, id }))";return Un(e.origin)!==Un(t.origin)?ht:void 0}};
var zs={event:"ui.open",check:V("ui.open").check,checkArgument:(e,t)=>e.id!==t.id?"a changed id (the pane being opened; next(e) passes it on)":void 0};
var qs={event:"plugin.register",restoreArgument:(e,t)=>z0(["version"],e,t),checkArgument:(e,t)=>fe(["name","tier","root","version","provenance","uses"],e,t),check:C((e)=>{let{allow:t,refuse:o}=e;if(o===void 0)return t===!0?void 0:"neither { allow: true } nor { refuse }";if(typeof o!=="string")return"a refuse that is not a string";return t===void 0?void 0:"an allow beside { refuse }"})};
function br(e){if(!N(e))return"no { stream, text } (not an object)";if(!(e.stream==="stdout"||e.stream==="stderr"))return'a stream that is neither "stdout" nor "stderr"';return typeof e.text==="string"&&e.text!==""?void 0:"a text that is not a non-empty string"};
var Zs={event:"process.spawn",budgetSpan:"pull",check:V("process.spawn").check,chunkChecker:()=>({pulled:()=>{},yielded:(e,t)=>t?void 0:br(e)})};
var ti={event:"attribution.text",checkArgument:(e,t)=>{let o=e.kind;if(typeof o!=="string")return"no { kind }";if(o!==t.kind)return"a changed kind (the hooks beneath match on it)";return typeof e.text==="string"?void 0:"no { text }"},measureArgument:(e,t)=>oe(e.text,t.text),check:C((e)=>typeof e.text==="string"?void 0:"no { text } (a string)"),measure:Je("text")};
var HM=(e)=>typeof e==="number"&&Number.isInteger(e)&&e>=0;
function Sr(e,t){let{text:o,cursor:r,start:n,end:s,inputText:i}=e,p=Un(e.origin)===Un(t.origin),a=Un(e.key)===Un(t.key),f=typeof o==="string"&&typeof i==="string",m=typeof o==="string"?o.length:0,c=HM(r)&&HM(n)&&HM(s)&&r<=m&&n<=s&&s<=m;if(!p)return"a changed origin (the engine set it; next(e) passes it on)";if(!a)return"a changed key (what the person pressed; next(e) passes it on)";if(!f)return"no { text, inputText } (strings)";return c?void 0:"a { cursor, start, end } outside the text (whole offsets, ordered)"};
function Or(e){return typeof e.text==="string"&&HM(e.cursor)?GBe(e.decorations):"no { text, cursor } (a string and a whole offset)"};
var oi={event:"engine.create"};
var ri={event:"prompt.attachment",restoreArgument:Ce(["origin","agentId","detail"]),checkArgument:(e,t)=>{if(Object.hasOwn(e,"detail")&&!Object.hasOwn(t,"detail"))return"an added detail (the engine says which types carry one)";let r=fe(["type","origin","agentId","detail"],e,t);if(r!==void 0)return r;return typeof e.text==="string"?void 0:"no { text } (a string)"},measureArgument:(e,t)=>oe(e.text,t.text),check:C((e)=>Xo(e.text,"attachment")),measure:Je("text")};
function ni(e){let t={...e},o={...t,blocks:Jt(t.blocks)};if(t.instructionFiles)o.instructionFiles=Jt(t.instructionFiles);return o};
function no(e){return Y(e.blocks).find((t)=>t.name==="claudeMd")?.text};
function Ar(e,t){return e===void 0||t===void 0?e===t:ezo(e,t)};
function vr(e,t){let o=Y(e);return o.some((n)=>n.name==="claudeMd")?o.map((n)=>n.name==="claudeMd"?{...n,text:t}:n):[{name:"claudeMd",text:t},...o]};
function si(e,t){if(t.instructionFiles===void 0)return{...e,instructionFiles:void 0};let o=e.instructionFiles??t.instructionFiles,r=no(e),n=r!==no(t),s=!Ar(o,t.instructionFiles);if(!n&&s&&o!==void 0){let a=vr(e.blocks,Ye(o));return{...e,blocks:a,instructionFiles:o}}if(!n||o!==void 0&&r===Ye(o))return{...e,instructionFiles:o};if(s)nd().log("prompt.context: a hook changed the claudeMd text and the instruction files in one step; the text stands and the files read as unknown");return{...e,instructionFiles:void 0}};
function bt(e,t){let{blocks:o,instructionFiles:r}=e;if(!Array.isArray(o))return e;let n=B(o);for(let p=0;p<n;p+=1){let a=o[p];if(!(Object.hasOwn(o,p)&&N(a)&&typeof a.name==="string"&&typeof a.text==="string"))return e}if(!(r===void 0||Yt(r)))return e;let i={blocks:o,instructionFiles:r};return{...e,...si(i,t)}};
var ai=(e,t)=>bt(e,t);
var pi=(e,t,o)=>bt(e,t.at(-1)??o);
var mi={event:"prompt.context",restoreArgument:ai,checkArgument:Qo,measureArgument:(e,t)=>or(e,t,[]),settle:ni,restoreResult:pi,check:C(Qo),measure:or};
var ci=50;
var ui={event:"prompt.edit",budgetMs:ci,restoreArgument:(e,t)=>z0(["origin","key"],e,t),checkArgument:Sr,measureArgument:(e,t)=>Math.max(oe(e.text,t.text),oe(e.inputText,t.inputText)),check:C(Or),measure:(e,t,o)=>oe(e.text,t.text,...o.map((r)=>r.text))};
var li={event:"prompt.section",checkArgument:(e,t)=>{if(typeof e.name!=="string")return"no { name }";if(e.name!==t.name)return"a changed name (the engine caches the section by it)";if(e.text===null)return;return typeof e.text==="string"?void 0:"a text that is neither a string nor null"},measureArgument:(e,t)=>oe(e.text,t.text),check:C((e)=>Xo(e.text,"section")),measure:Je("text")};
var yi={event:"prompt.submit",checkArgument:(e,t)=>typeof e.text==="string"?Ss(e.wait,t.wait)??Yo(e.origin,t.origin)??rr(e.context):"no { text }",measureArgument:(e,t)=>Math.max(oe(e.text,t.text),wt(e.context,t.context)),check:C((e,t,o)=>{let r=e.drop===void 0,n=typeof e.text==="string",s=e.drop;return r?n?bs(e.origin,t.origin)??rr(e.context):"neither { text } nor { drop }":typeof s==="string"?Es(s,(o??[]).map((p)=>p.drop))??ls(e.context):"a drop that is not a string"}),measure:(e,t,o)=>Math.max(oe(e.text,t.text,...o.map((r)=>r.text)),wt(e.context,t.context,...o.map((r)=>r.context)))};
var gi={event:"skill.prompt",checkArgument:(e,t)=>{let{skill:o,text:r}=e,n=typeof o==="string",s=o===t.skill;return n?s?typeof r==="string"?void 0:"no { text }":"a changed skill (the hooks beneath match on it)":"no { skill }"},measureArgument:(e,t)=>oe(e.text,t.text),check:C((e)=>typeof e.text==="string"?void 0:"no { text } (a string)"),measure:Je("text")};
var hi={event:"ui.blit",check:V("ui.blit").check,checkArgument:(e,t)=>e.requestId!==t.requestId||e.key!==t.key||(("source"in e)&&e.source!==void 0)!==(("source"in t)&&t.source!==void 0)?"a changed requestId, key or kind (the Raster or Image being blitted; next(e) passes them on)":void 0};
var Ue="any kind";
function Rr(e){let t=N(e)?e.tool_use_id:null;return t===void 0||typeof t==="string"?t:null};
function so(e){return Array.isArray(e)?Y(e).map(Rr):void 0};
function St(e){let{keys:t,passed:o,received:r,explanation:n}=e,s=t.find((i)=>Un(o[i])!==Un(r[i]));if(s===void 0)return;return`a changed ${s} (${n})`};
function Be(e){switch(typeof e){case"string":return[e];case"object":if(e===null)return[];return Array.isArray(e)?Y(e).flatMap(Be):Object.entries(e).flatMap(([t,o])=>[t,...Be(o)]);default:return[]}};
var ao=(e,t)=>Be(e).reduce((o,r)=>o+oJn(r,t),0);
var Ot=(e,t,o)=>ao(e,o)>ao(t,o);
function Cr(e,t){let o=t.props,r=Object.keys(e).find((n)=>e[n]!==o[n]&&Un(e[n])!==Un(o[n])&&(Ot(e[n],o[n],sJn)||Ot(e[n],o[n],aJn)||Ot(e[n],o[n],iJn)));if(r===void 0)return;return`a props.${r} with a control character (an escape sequence the terminal would honour, an image placeholder, or an unpaired surrogate half out of reach); a rewrite the engine draws adds none`};
var ke=["an object","null","missing"];
var Pr={AskUserQuestion:{metadataSource:["a string","missing"]},UserMessage:{onScreen:ke},AssistantMessage:{onScreen:ke},ToolUse:{input:Ue,output:Ue,onScreen:ke},ToolResult:{output:Ue,onScreen:ke},ToolGroup:{onScreen:ke},CommandOutput:{onScreen:ke},Spinner:{message:["a string","null"],suffix:["a string","missing"]},TurnDuration:{onScreen:ke},InfoNotice:{command:["a string","null"],onScreen:ke},PromptHint:{tail:["a string","missing"]}};
var po="PermissionRequest";
var _r=["surface","component","requestId","viewport"];
var Ir=(e,t)=>fe(_r,e,t);
var At=(e,t)=>({event:e,checkArgument:t,check:C((o)=>typeof o.element==="string"&&typeof o.value==="string"?void 0:"no { element, value }")});
function Nr(e,t){let r=t.component==="ToolGroup"?so(t.props.calls)??[]:void 0,n=so(e.calls);return r!==void 0&&(n===void 0||n.length!==r.length||n.some((i,p)=>i===null||i!==r[p]))?"props.calls whose tool_use_ids are not the ones the engine drew (each call keeps the id tool.call carried; the group's calls are its own)":void 0};
var zG={terminal:["Box","Text","Button","Input","Select","Link","Code","Markdown","Client","Raster","Image"],desktop:["Box","Text","Button","Input","Select","Svg","Link","Code","Markdown","Client"],mobile:["Box","Text","Button","Svg","Link","Code","Markdown"],vscode:["Box","Text","Button","Input","Select","Svg","Link","Code","Markdown"]};
function Mu(e){if(!N(e))return"something that is not a table of elements";for(let[t,o]of Object.entries(e))if(typeof o!=="function")return`an entry "${t}" that is not a constructor`;return};
var APe=(e)=>typeof e==="string"&&Object.hasOwn(zG,e);
function bi(e){if(!(N(e)&&APe(e.surface)))return"takes a ui.render argument (e.surface names the surface)";let o=String(e.component);return Object.hasOwn(tpe,o)?void 0:`takes a ui.render argument (e.component "${o}" is not a component the engine draws)`};
function Ke(e,t){if(e.plugin!==t.plugin)return"a plugin other than the one that drew the element";if(typeof e.element!=="string")return"no { element }";if(typeof e.component!=="string")return"no { component }";if(e.requestId!==t.requestId)return"a requestId other than the instance the element was drawn in";if(!APe(e.surface))return"no { surface } naming a surface";let{link:i}=e;if(t.link===void 0)return i!==void 0?"a { link } on a press that had none":void 0;return N(i)&&typeof i.href==="string"?void 0:"no { link: { href } } on a press that had one"};
function Fr(e,t){let o=Ke(e,t);if(o!==void 0)return o;if(e.kind!==t.kind)return`a kind other than the ${t.kind} it was given`;return typeof e.value==="string"?void 0:"no { value } string"};
function vt(e){if(Array.isArray(e))return"an array";if(e===null)return"null";if(e===void 0)return"missing";return typeof e==="object"?"an object":`a ${typeof e}`};
function*Oi(e){if(Array.isArray(e)){let t=B(e);for(let o=0;o<t;o+=1)yield[1,e[o]];return}for(let[t,o]of Object.entries(e))yield[t.length+4,o]};
var MSn=LQ;
var cJn=TPe;
var dJn=kPe;
var uo=()=>({nodes:0,chars:0,path:new Set,done:new Map});
function Ai(e){if(e.nodes>dJn)return`holds more than ${dJn} values`;return e.chars>MSn?`serializes to more than ${MSn} characters`:void 0};
function Dr(e){switch(typeof e){case"boolean":return 5;case"string":return e.length+2;case"number":return String(e).length;default:return e===null?5:void 0}};
function Rt(e,t,o){if(t>cJn)return`nests deeper than ${cJn}`;let r=typeof e==="object"?o.done.get(e):void 0;o.nodes+=r?.nodes??1,o.chars+=r?.chars??Dr(e)??2;let n=Ai(o);if(n!==void 0||r!==void 0)return n;if(typeof e==="number"&&!Number.isFinite(e))return`holds ${String(e)}`;if(Dr(e)!==void 0)return;if(e===void 0)return"holds undefined (an array hole, a missing value)";if(typeof e!=="object"||e===null)return`holds ${fj(e)}`;if(o.path.has(e))return"holds a cycle";let s=Object.getPrototypeOf(e);if(!(Array.isArray(e)||s===null||Object.getPrototypeOf(s)===null))return"holds an object that is not plain (a class instance)";let p={nodes:o.nodes-1,chars:o.chars-2};o.path.add(e);for(let[a,f]of Oi(e)){o.chars+=a;let m=Rt(f,t+1,o);if(m!==void 0)return m}o.path.delete(e),o.done.set(e,{nodes:o.nodes-p.nodes,chars:o.chars-p.chars});return};
var Hjt=(e)=>Rt(e,0,uo());
function Br(e,t){for(let r of["surface","component","requestId","element","module"])if(e[r]!==t[r])return`{ ${r} } rewritten; only data may change`;if(!("data"in e)||e.data===void 0)return"no { data }";let o=Hjt(e.data);return o===void 0?void 0:`data ${o}`};
function Kr(e){if(!("props"in e)||e.props===void 0)return;let t=Hjt(e.props);return t===void 0?void 0:`props ${t}`};
function Wr(e,t){let o=Object.hasOwn(t.props,"onScreen")?t.props.onScreen:void 0;return Djt.has(t.component)&&Un(e.onScreen)!==Un(o)?"a props.onScreen other than the surface reported (the surface says what its viewport shows; a rewrite changes the drawing alone)":void 0};
function Vr(e,t){return t.component==="CommandOutput"&&e.command!==t.props.command?"a props.command other than the engine drew (the name is the command that printed the row; a rewrite changes the row alone)":void 0};
function Gr(e,t){return t.component==="Pane"&&e.placement!==t.props.placement?"a props.placement other than the surface drew (the surface places the pane; a rewrite changes the drawing alone)":void 0};
function Xr(e,t){return t.component==="ToolProgress"&&e.kind!==t.props.kind?"a props.kind other than the engine drew (the kind names the row; a rewrite changes its text alone)":void 0};
var zr=["origin","isExpanded","task","from"];
function Yr(e,t){if(t.component!=="UserMessage")return;let o=zr.find((r)=>Un(e[r])!==Un(t.props[r]));if(o===void 0)return;return`a props.${o} other than the engine drew (the row names its message's origin, sender and task and how the view draws it; a rewrite changes the text alone)`};
function Jr(e,t){return(t.component==="Pane"||t.component==="AbovePrompt")&&Un(e.view)!==Un(t.props.view)?"a props.view other than the surface drew (the person chooses the transcript in view; a rewrite changes the drawing alone)":void 0};
var Ct=(e)=>Be(e).reduce((t,o)=>t+o.length,0);
function qr(e,t){let o=t.props,r=Object.keys(e).find((n)=>e[n]!==o[n]&&Un(e[n])!==Un(o[n])&&Ct(e[n])>LQ&&Ct(e[n])>Ct(o[n]));if(r===void 0)return;return`a props.${r} of more than ${LQ} characters of text, more than the engine drew`};
function Qr(e,t){return(t.component==="ToolUse"||t.component==="ToolResult"||t.component==="ToolProgress")&&e.tool_use_id!==t.props.tool_use_id?"a props.tool_use_id other than the engine drew (the id names the call; a rewrite changes the row alone)":void 0};
function Zr(e,t){let o=e.props;if(!N(o))return"no { props } (an object)";let r=Pr[t.component]??{};for(let[n,s]of Object.entries(r)){let i=vt(o[n]);if(s!==Ue&&!s.includes(i))return`a props.${n} that is ${i}, not ${s.join(" or ")}`}for(let[n,s]of Object.entries(t.props)){if(s===void 0||Object.hasOwn(r,n))continue;let i=vt(s),p=vt(o[n]);if(p!==i)return`a props.${n} that is ${p}, not ${i}`}return Cr(o,t)??qr(o,t)??Yr(o,t)??Qr(o,t)??Xr(o,t)??Nr(o,t)??Vr(o,t)??Gr(o,t)??Jr(o,t)??Wr(o,t)};
var tn=(e,t)=>Ir(e,t)??Zr(e,t);
function rn(e,t){let o=Object.keys(e).filter((n)=>n!=="surface"&&n!=="component");return t||o.length===0?void 0:`resolved ahead of time, once per surface and component; a matcher here takes surface and component only, not ${o.join(", ")}`};
function nn(e,t){let o=Ke(e,t);if(o!==void 0)return o;return typeof e.value==="string"?void 0:"no { value } string"};
var vi=At("ui.input",Fr);
var Ri={event:"ui.message",checkArgument:Br,check:C(Kr)};
var Ci={event:"ui.press",checkArgument:Ke,check:C((e)=>typeof e.element==="string"?void 0:"no { element }")};
var Pi={event:"ui.render",restoreArgument:(e)=>f7e(e),checkArgument:tn,checkMatcher:(e)=>Object.hasOwn(e,"component")&&_yt(e.component,po)?`${po} is drawn by the engine alone; its answer authorises an action. A plugin adds context with $.ui.notice`:void 0,check:(e)=>N(e)&&typeof e.type==="string"?void 0:"something that is not a tree element"};
var _i={event:"ui.resolve",checkArgument:bi,checkMatcher:rn,check:Mu};
var Ii=At("ui.select",nn);
var go=["component","requestId","by","bodyRows","contentRows","origin","pointer"];
var Hi={event:"ui.scroll",restoreArgument:(e,t)=>z0(go,e,t),checkArgument:(e,t)=>{let o=fe(go,e,t),r=HM(e.offset);return o??(r?void 0:"an offset that is not a whole row number (0 or more)")},check:C(Vo)};
function sn(e){if(!N(e))return"is not an object";let{role:t,text:o,toolUses:r,toolResults:n,handle:s}=e;if(!(t==="user"||t==="assistant"))return"has a role that is neither user nor assistant";if(typeof o!=="string")return"has no text (a string)";if(!(s===void 0||typeof s==="string"))return"has a handle that is not a string";if(!(Array.isArray(r)&&Re(r,(m)=>N(m)&&typeof m.tool_use_id==="string"&&typeof m.tool==="string"&&N(m.input))))return"has toolUses that are not a list of { tool_use_id, tool, input }";return n===void 0||Array.isArray(n)&&Re(n,(m)=>N(m)&&typeof m.tool_use_id==="string"&&typeof m.text==="string")?void 0:"has toolResults that are not a list of { tool_use_id, text, isError }"};
function xo(e){if(!Array.isArray(e))return"messages that are not a list";let t=B(e);if(t===0)return"an empty messages (a compaction leaves at least one)";let o=gt(e,sn,t);return o&&`messages[${o[0]}] that ${o[1]}`};
var ho=(e)=>e===void 0||typeof e==="number"&&e>=0;
var an=(e)=>e===void 0||N(e)&&[e.input_tokens,e.output_tokens,e.cache_read_input_tokens,e.cache_creation_input_tokens].every((t)=>typeof t==="number"&&t>=0);
function pn(e,t){if(!(t.door==="note"&&t.origin.kind==="plugin"))return"a deny of a row the engine appends (only a plugin's own append is refused)";return typeof e==="string"&&e.trim()!==""?void 0:"a deny with no reason"};
function Pt(e){let t=N(e);return t&&Array.isArray(e.content)?void 0:t?"a message whose content is not an array of blocks":"a message that is not an object"};
var _t=["type","name","role","isMeta"];
function fn(e,t){let o=N(e)?e:{},r=N(t)?t:{},n=_t.find((s)=>Object.hasOwn(o,s)&&o[s]!==r[s]);return n===void 0?void 0:`a changed message.${n}`};
function mn(e,t){let o=z0(["agentId"],e,t),{message:r}=o,{message:n}=t;return N(r)&&N(n)?{...o,message:z0(_t,r,n)}:o};
function ji(e,t,o){if(o.some((s)=>s.deny===void 0))return"a deny after next stored the row (refuse in place of next)";return o.some((s)=>s.deny===e)?void 0:pn(e,t)};
function Li(e,t,o){let r=o.findLast((i)=>i.deny===void 0);if(e.deny!==void 0)return ji(e.deny,t,o);if(o.length===0)return"an answer without next (the row is kept; next(e) keeps it)";if(r===void 0)return"a row after next refused it (nothing was stored)";if(e.uuid!==t.uuid)return"a uuid other than the row it answers for";return Un(e.message)===Un(r.message)?Pt(e.message):"a row other than what next answered (the answer is the row as stored)"};
var Fi={event:"session.append",pinnedKeys:["door","origin","agentId","uuid"],restoreArgument:mn,checkArgument:(e,t)=>fe(["door","origin","agentId","uuid"],e,t)??Pt(e.message)??fn(e.message,t.message),check:C((e,t,o)=>Li(e,t,o??[]))};
var $i={event:"session.attach",restoreArgument:(e,t)=>z0(["viewport"],e,t),checkArgument:(e,t)=>fe(["surface","clientId","viewport"],e,t),check:C(fr)};
var Di={event:"session.compact",restoreArgument:(e,t)=>z0(["trigger","agentId"],e,t),checkArgument:(e,t)=>{if(e.trigger!==t.trigger)return"a changed trigger (the compaction is what it is; next(e) passes it on)";if(e.agentId!==t.agentId)return"a changed agentId (the loop compacting is pinned)";let{instructions:n}=e;return n===void 0||typeof n==="string"?xo(e.messages):"instructions that are not a string"},check:C((e,t,o)=>{let{skip:r,messages:n,tokensBefore:s,tokensAfter:i,usage:p}=e;if(r!==void 0){if(!(typeof r==="string"&&r!==""))return"a skip that is not a reason (a non-empty string)";if(n!==void 0)return"a skip beside messages";return t.trigger!=="precompute"&&(o??[]).some((c)=>c.messages!==void 0)?"a skip after next() compacted (the compaction happened beneath it; veto before calling next, or hand its result up)":void 0}if(n===void 0)return"neither { messages } nor { skip }";if(!(ho(s)&&ho(i)))return"token counts that are not numbers";return an(p)?xo(n):"a usage that is not the four token counts"})};
var Ui={event:"session.detach",checkArgument:(e,t)=>fe(["surface","clientId","reason"],e,t),check:C(fr)};
var Bi=zo("session.end",["reason","sessionId","resume"],Ns);
var Ki=zo("session.measure",["context","rateLimits","cost","changed"],Is);
var Wi={event:"session.receive",restoreArgument:(e,t)=>z0(["agentId"],e,t),checkArgument:(e,t)=>{if(Un(e.origin)!==Un(t.origin))return"a changed origin (the bridge set it; next(e) passes it on)";if(Un(e.event)!==Un(t.event))return"a changed event (parsed from the delivery; next(e) passes it on)";if(e.agentId!==t.agentId)return"a changed agentId (the loop the delivery is for; next(e) passes it on)";return typeof e.text==="string"?void 0:"no { text } (a string)"},check:C((e)=>{let{consumed:t,text:o}=e;if(t===void 0)return typeof o==="string"?void 0:"neither { text } nor { consumed }";return typeof t==="string"?void 0:"a consumed that is not a string"})};
var Vi={event:"session.send",restoreArgument:(e,t)=>z0(["agentId"],e,t),checkArgument:(e,t)=>{if(Un(e.origin)!==Un(t.origin))return"a changed origin (the engine set it; next(e) passes it on)";if(e.agentId!==t.agentId)return"a changed agentId (the loop sending; next(e) passes it on)";if(!(typeof e.to==="string"&&e.to.trim()!==""))return"no { to } (a non-empty string)";return typeof e.text==="string"&&e.text.trim()!==""?void 0:"no { text } (a non-empty string)"},check:C((e)=>{let{isDelivered:t,reason:o}=e;if(t===!0)return;if(t!==!1)return"no { isDelivered } (true or false)";return typeof o==="string"&&o!==""?void 0:"isDelivered false without a reason (a non-empty string)"})};
function It(e,t){return e.plugin!==t.plugin||e.key!==t.key||e.id!==t.id?"a changed reference (plugin, key and id say which value; next(e) passes them on)":void 0};
function cn(e,t){let o=e.ifVersion!==t.ifVersion,r=Un(e.previous)!==Un(t.previous);return It(e,t)??(o?"a changed ifVersion (the condition is the caller's)":void 0)??(r?"a changed previous (the host stamps it)":void 0)};
var Xi={event:"state.get",check:V("state.get").check,checkArgument:It};
var zi={event:"state.set",check:V("state.set").check,restoreArgument:Ce(["previous","ifVersion"]),checkArgument:cn};
var Ji={event:"telemetry.log",pinnedKeys:["to"],restoreArgument:Ce(["to"]),checkArgument:(e,t)=>e.to===t.to?void 0:"a changed to (pinned)",check:C((e)=>De(e,"{ value }",(t)=>Object.hasOwn(t,"value")))};
var qi={event:"telemetry.mark",check:C((e)=>De(e,"{ value }",(t)=>Object.hasOwn(t,"value")))};
var Zi={event:"agent.offer",restoreArgument:(e,t)=>z0(["provider"],e,t),checkArgument:(e,t)=>{if(typeof e.agent!=="string")return"no { agent }";if(e.agent!==t.agent)return"a changed agent (the hooks beneath match on it)";if(typeof e.description!=="string")return"no { description }";if(e.source!==t.source)return"a changed source (the hooks beneath match on it)";return Un(e.provider)===Un(t.provider)?void 0:"a changed provider (pinned: who provides the agent is a fact)"},check:C((e)=>typeof e.isOffered==="boolean"?void 0:"no { isOffered } (a boolean)")};
var Mjt=["tool_use_id","name","fork","parentModel","permissionMode","parentAgentId","provider"];
var un=["parentAgentId","provider"];
function ln(e,t){let{prompt:o,model:r,cwd:n}=e;return[["prompt",typeof o==="string"&&o.trim()!=="","no { prompt } (a non-empty string)"],["description",typeof e.description==="string","a description that is not a string"],["subagentType",typeof e.subagentType==="string","a subagentType that is not a string"],["model",r===void 0||typeof r==="string","a model that is neither a string nor undefined"],["background",typeof e.background==="boolean","a background that is not a boolean"],["cwd",n===void 0||typeof n==="string"&&Xl(n),"a cwd that is not an absolute path"]].find(([i,p])=>!p&&e[i]!==t[i])?.[2]};
var ea={event:"agent.spawn",restoreArgument:(e,t)=>z0(un,e,t),checkArgument(e,t){return St({keys:Mjt,passed:e,received:t,explanation:`the identity of the spawn and its parent is pinned; a rewrite keeps ${Mjt.join(", ")}`})??ln(e,t)},check:C((e)=>De(e,"{ model }",(t)=>typeof t.model==="string"))};
var dn=(e)=>Szo.some((t)=>t===e);
var Jl=["tool","tool_use_id","agentId"];
var Pe="$shadowed";
var yn=["tool","tool_use_id","agentId","consent",Pe];
var od=["agentId",Pe];
function Eoe(e){let{tool:t,tool_use_id:o,agentId:r,consent:n,[Pe]:s,...i}=e;return N(s)?{...i,...s}:i};
var Nt=(e,t)=>fe(yn,e,t);
var gn=(e)=>N(e)?di(e,(t,o)=>t===!1&&(o==="deny"||o==="ask"||o==="allow")):e;
var oa={event:"classic.PreToolUse",restoreArgument:(e,t)=>z0([Pe],e,t),checkArgument:Nt,settle:gn,check:C(({deny:e,ask:t,allow:o})=>{let r=typeof e==="string"||typeof t==="string";return!r&&(e!==void 0||t!==void 0)?"a deny or ask that is not a string":!r&&o!==void 0&&o!==!0?"an allow that is not true":void 0}),carry:(e,t,o)=>e.updatedInput===void 0&&typeof e.deny!=="string"&&cs(t,o)?{...e,updatedInput:Eoe(t)}:e};
function xn(e,t){let{isReadOnly:o,...r}=e;if(r.deny!==void 0||r.ref===void 0)return r;let n=t.findLast((p)=>p.ref===r.ref),s=Un(r.result);return n!==void 0&&n.isReadOnly===!0&&(r.result===void 0||r.result===n.result||s!==void 0&&s===Un(n.result))?{...r,isReadOnly:!0}:r};
function hn(e){let t={...e};return t.context===void 0?t:{...t,context:OM(t.context)??Go}};
function kn(e){let{decision:t,reason:o,rule:r}=e,n={decision:t};if(o!==void 0)n.reason=o;if(r!==void 0)n.rule=r;return n};
var ra={event:"tool.call",restoreArgument:(e,t)=>z0(od,e,t),checkArgument:Nt,pinnedKeys:Jl,settle:hn,stripResult:xn,check:C((e,t,o)=>{let r=e.deny===void 0;return De(e,"{ result }",(n)=>Object.hasOwn(n,"result"))??(r?Os(e.context,e.result,(o??[]).filter((n)=>n.deny===void 0)):void 0)}),measure:(e,t,o)=>wt(e.context,...o.map((r)=>r.context)),carry:cVr};
var wn=["tool","input","tool_use_id"];
var na={event:"tool.check",restoreArgument:(e,t)=>z0(["tool_use_id"],e,t),checkArgument:(e,t)=>St({keys:wn,passed:e,received:t,explanation:"the tool, its input and the call are the question and are pinned; a hook answers { decision }, it does not ask about another call"}),settle:kn,check:C((e)=>{let{decision:t,reason:o,rule:r}=e;if(!dn(t))return`no { decision } (one of ${Szo.join(", ")})`;return[o,r].every((s)=>s===void 0||typeof s==="string")?void 0:"a reason or rule that is not a string"})};
var sa={event:"tool.describe",restoreArgument:(e,t)=>z0(["provider"],e,t),checkArgument:(e,t)=>{if(typeof e.tool!=="string")return"no { tool }";if(e.tool!==t.tool)return"a changed tool (the engine caches the description by it)";if(Un(e.provider)!==Un(t.provider))return"a changed provider (pinned: who provides the tool is a fact)";if(!(e.isDeferred===void 0||typeof e.isDeferred==="boolean"))return"an isDeferred that is not a boolean";return typeof e.description==="string"?void 0:"no { description }"},measureArgument:(e,t)=>oe(e.description,t.description),restoreResult:(e,t,o)=>{if(e.isDeferred!==void 0)return e;let n=t.at(-1)?.isDeferred??o.isDeferred;return n===void 0?e:{...e,isDeferred:n}},check:C((e)=>{if(typeof e.description!=="string")return"no { description } (a string)";return e.isDeferred===void 0||typeof e.isDeferred==="boolean"?void 0:"an isDeferred that is not a boolean"}),measure:Je("description")};
var pJn=["end_turn","max_tokens","stop_sequence","tool_use","pause_turn","compaction","refusal","model_context_window_exceeded"];
var Tn=(e)=>N(e)&&[e.input_tokens,e.output_tokens,e.cache_read_input_tokens,e.cache_creation_input_tokens].every((t)=>Number.isFinite(t));
function En(e){let t=typeof e.index==="number"&&e.index>=0;switch(e.kind){case"text":case"thinking":return t&&typeof e.text==="string"?void 0:"{ index, text }";case"tool":return t&&typeof e.id==="string"&&/^[\w-]+$/.test(e.id)&&typeof e.name==="string"?void 0:"{ index, id, name } (an id of letters, digits, _ or -)";case"input":return t&&typeof e.json==="string"?void 0:"{ index, json } (json a string)";case"stop":{let o=e.stopReason===null||pJn.some((s)=>s===e.stopReason),r=e.usage===null||Tn(e.usage);return o&&r?void 0:"{ stopReason, usage } (usage null, or its four token counts)"}case"engine":return typeof e.ref==="number"?void 0:"ref (pass engine chunks on unchanged)";default:return"known kind (text, thinking, tool, input, stop, engine)"}};
function bn(e){if(!N(e))return`no kind (a chunk is an object; got ${e===null?"null":typeof e})`;let t=En(e);return t===void 0?void 0:`kind ${String(e.kind)} but no ${t}`};
function To(e){if(!N(e))return;let{ref:t,kind:o}=e;return typeof t==="number"&&typeof o==="string"?[t,o]:void 0};
function Sn(e){let t=N(e)&&e.kind==="tool"?e.id:void 0;return typeof t==="string"?t:void 0};
function On(){let e=new Map,t=new Set,o=new Set;function r(s){if(e.get(s)!=="engine")return"kind engine but a ref this link never pulled as an engine chunk (pass engine chunks on unchanged)";if(t.has(s))return"kind engine but a ref already passed on (pass each on once)";t.add(s);return}function n(s){if(o.has(s))return`kind tool but an id this step already used (${s})`;o.add(s);return}return{pulled:(s)=>{let i=To(s);if(i!==void 0)e.set(i[0],i[1])},yielded:(s,i)=>{let p=i?void 0:bn(s);if(p!==void 0)return p;let a=To(s);if(a?.[1]==="engine")return r(a[0]);let f=Sn(s);return f===void 0?void 0:n(f)}}};
var aa={...Gt({event:"turn.complete",check:({text:e},t)=>typeof e==="string"?nr(e,t.answer):"no { text }",checkArgument:(e,t)=>{let o=e.answer;if(typeof o!=="string")return"no { answer }";return e.agentId===t.agentId?nr(o,t.answer):"a changed agentId (the loop the turn ran in is pinned)"}}),restoreArgument:(e,t)=>z0(["agentId"],e,t)};
var pa={event:"turn.step",chunkChecker:On,restoreArgument:Ce(["agentId"]),checkArgument:(e,t)=>{let o=fe(["turnId","index","messageCount","agentId"],e,t);if(o!==void 0)return o;let{model:r,effort:n}=e;if(!(typeof r==="string"&&r.trim()!==""))return"no { model } (a non-empty model name)";let i=!1;return n===void 0||n===t.effort||typeof n==="number"&&i||nu.some((a)=>a===n)?void 0:`an effort that is not one of ${nu.join(", ")}`+(i?" or a number":" (a number is internal-only)")},check:C((e,t)=>{if(!(e.turnId===t.turnId&&e.index===t.index))return"a { turnId, index } other than the step it answers for";return typeof e.answer==="string"&&Array.isArray(e.toolUses)?void 0:"no { answer, toolUses }"})};
var eu={...Qt(USn,V),...Qt(Mts,nJn),"ui.open":zs,"ui.close":Xs,"ui.blit":hi,"env.get":Bs,"env.set":Ks,"state.get":Xi,"state.set":zi,"classic.PreToolUse":oa,"tool.call":ra,"tool.check":na,"agent.offer":Zi,"agent.spawn":ea,"prompt.submit":yi,"prompt.fill":Ps,"prompt.suggest":Zt("prompt.suggest","isShown"),"prompt.edit":ui,"prompt.section":li,"prompt.context":mi,"prompt.attachment":ri,"prompt.compose":Fs,"tool.describe":sa,"command.run":js,"command.describe":Ms,"config.set":Us,"config.describe":Ds,"telemetry.log":Ji,"telemetry.mark":qi,"skill.prompt":gi,"attribution.text":ti,"session.receive":Wi,"session.append":Fi,"session.send":Vi,"session.compact":Di,"session.attach":$i,"session.detach":Ui,"session.measure":Ki,"session.end":Bi,"plugin.register":qs,"process.spawn":Zs,"session.start":Gt({event:"session.start",check:mr,checkArgument:mr}),"turn.start":Gt({event:"turn.start",check:cr,checkArgument:cr}),"turn.step":pa,"turn.complete":aa,"ui.render":Pi,"ui.resolve":_i,"ui.press":Ci,"ui.input":vi,"ui.select":Ii,"ui.message":Ri,"ui.scroll":Hi,"ui.focus":Vs,"engine.create":oi};
var Q=(e)=>e.isCore===!0||e.isManaged===!0;
var Ht=()=>({entry:void 0,beneath:void 0});
function tt(e,t){e.entry=Object.freeze(t)};
function Eo(e){let t=[];for(let o=e;o!==void 0;o=o.beneath)if(o.entry!==void 0)t.push(o.entry);return t.length===0?JGo:Object.freeze(t)};
var _d=({bottom:e,index:t,event:o})=>async(r,n,{run:s,floors:i})=>{let p=performance.now(),a="rejected",f;try{return f=await e(r,n,i),a="returned",f}finally{tt(s,{index:t,plugin:woe,tier:"core",event:o,outcome:a,ms:performance.now()-p,received:r,returned:f})}};
function Rn({handler:e,tier:t,index:o,site:r,e:n,descent:s}){let{run:i,floors:p}=s;if(p.length===0||Q(e))return;let m=(e.isHop===!0?e.tiers??[]:[t]).map((h)=>Lts(p,h)),d=m.length>0&&m.every((h)=>h!==void 0)?m[0]:void 0;if(d===void 0)return;let y=`bypassed by ${d}`;nd().log(`${e.name}: ${r.event} ${y} (tier ${t}); beneath runs`),tt(i,{index:o,plugin:e.name,tier:t,event:r.event,outcome:"skipped",reason:y,ms:0,received:n,returned:void 0});let u=Ht();return i.beneath=u,{run:u,floors:p}};
function Cn(e){if(!Md(e))Object.freeze(e);return e};
function je(e){let t=e.isCore===!0,o=t?"core":"prepend";return t||e.isManaged===!0?o:e.tier??"user"};
var bo=1e4;
var ot=ct(new Map,(e)=>{for(let t of e.values())clearTimeout(t.timer);e.clear()});
var O3=1000;
function ga(e,t){let o=ot.get(e);if(ot.delete(e),o!==void 0&&o.count>0)nd().log(`${t} ${o.count} more times in the last ${bo/O3}s (the last in ${o.lastMs.toFixed(1)}ms)`)};
function xa(e){let{plugin:t,tier:o,event:r,ms:n}=e,s=`${r} ${t}`,i=ot.get(s),p=`${t} (${o}) answered ${r} without next()`;if(i!==void 0){i.count+=1,i.lastMs=n;return}nd().log(`${p} in ${n.toFixed(1)}ms; nothing beneath it ran for this dispatch`);let a=setTimeout(ga,bo,s,p);a.unref(),ot.set(s,{count:0,lastMs:n,timer:a})};
var mbe=5000;
var Mt=new Vd;
async function aVr(e){let t=Mt.getStore();if(t===void 0)return e();t.pause();try{return await e()}finally{t.resume()}};
var rt=1000;
var ha=(e)=>e;
function ka(e,t){if(--e.pendingDownstream>0)return;if(e.beneathMs+=performance.now()-e.beneathSince,!e.settled)t.resume()};
function So(e,t=new Map){if(typeof e!=="object"||e===null)return e;let o=t.get(e);if(o!==void 0)return o;if(Array.isArray(e)){let n=[];t.set(e,n);for(let s of e)n.push(So(s,t));return n}if(!gF(e))return e;let r={};t.set(e,r);for(let n of Object.keys(e))Object.defineProperty(r,n,{value:So(e[n],t),enumerable:!0,writable:!0,configurable:!0});return r};
function jBe(e,t,o){if(o!==void 0&&o>qt)nd().log(`${e}: wrote a text of ${o} characters (${t}; over ${qt}, accepted: a plugin's text is its own to size)`)};
function nt({handler:e,site:t,e:o},r){let n=jjt(r,e.name),s=!Q(e)&&(t.checkArgument!==void 0||t.restoreArgument!==void 0),p=s&&!Object.is(n,o)?So(n):n,a=s?t.restoreArgument?.(p,o)??p:p,f=s?t.checkArgument?.(a,o):void 0;if(f!==void 0)throw new Oe(`${e.name}: next() passed an argument with ${f}`);if(s&&e.isHop!==!0)jBe(e.name,t.event,t.measureArgument?.(a,o));return ha(a)};
function _n(e,t,o){if(t.length===0)throw new Oe(`${o.plugin}: next.to() names no tier`);let r=yyt(o.tier);return t.toReversed().reduce((n,s)=>{if(!EJn(s))throw new Oe(`${o.plugin}: next.to names "${String(s)}", which is not a tier a dispatch continues at (append, builtin, core)`);if(r.length===0)throw new Oe(`${o.plugin}: next.to is available to managed plugins (prependPlugins / appendPlugins) only, not to a ${o.tier} hook`);if(!r.includes(s))throw new Oe(`${o.plugin}: next.to("${s}") skips nothing from ${o.tier}; a ${o.tier} hook may continue at `+yyt(o.tier).join(", "));return Nts(n,{from:o.tier,to:s,plugin:o.plugin})},e)};
function Oo(e){return e>=O3&&e%O3===0?`${e/O3}s`:`${e}ms`};
var wa="failed closed: its .catch answered";
function Le(e){let t=e instanceof Oe&&e.thrownName!==void 0?{name:e.thrownName}:e;return`errorKind=${e instanceof Error?Ng(t)??"Error":"unknown"} errorChars=${String(l(e)).length}`};
function Ta(e,t,o){return`hook failed closed: ${e}: ${Le(t)} (${o}; its .catch answered)`};
var st=(e,t)=>t.startsWith(`${e.name}: `)?t:`${e.name}: ${t}`;
function In(e){return nd().log(`hooks module ${e}: next() after it settled; refused`,"warn"),new Oe(`${e}: next() after it settled`)};
var Nn="...";
var Hn=120;
function jt(e){let t=(e.split(/\r?\n/u)[0]??"").replace(H3," ").trim();return t.length<=Hn?t:re(t,Hn-Nn.length)+Nn};
function Ao(e){if(!(e instanceof Error))return jt(String(e));let o=e instanceof Oe?e.thrownName:e.name,r=o===void 0?"":`${o}: `;return jt(`${r}${e.message}`)};
function Ea(e,t){let{expiredMs:o,lingeredMs:r,shape:n,caught:s}=t,i=s===void 0?"":`; ${s}`;if(o!==void 0)return{kind:"budget",why:`ran past its ${Oo(o)} budget${i}`};if(r!==void 0)return{kind:"lingered",why:`did not stop within ${Oo(r)} of the turn being interrupted`};return n!==void 0?{kind:"shape",why:`returned the wrong shape (${jt(n)})`}:{kind:"threw",why:`threw ${Ao(e)}${i}`}};
function ba({error:e,handler:t,site:o,effect:r,cause:n}){let s=st(t,l(e));if(nd().log(`hook failed: ${t.name}: ${Le(e)} (${o.event}; ${r})`,"error"),!Q(t))nd().hookFailed({plugin:t.name,environmentId:t.environmentId,event:o.event,reason:s,effect:r,hasOverrun:!1,skip:t.isHop===!0?void 0:Ea(e,n)});return s};
var Sa="skipped; what is below it ran in its place";
var Oa="skipped; its last next() run's result stands";
function Mn(e,t,o){let r=!1,n=()=>{r=!0};e.then(n,n),setTimeout(()=>{if(r||Q(t))return;let i=st(t,`still running ${mbe}ms after its budget ran out; ignores its signal`);nd().log(`hook overran: ${i} (${o.event})`,"error"),nd().hookFailed({plugin:t.name,event:o.event,reason:i,effect:"counted toward a runaway",hasOverrun:!0})},mbe).unref?.()};
function zE(e,t){if(e===void 0)return()=>{};if(e.aborted)return t.abort(e.reason),()=>{};let o=()=>t.abort(e.reason);return e.addEventListener("abort",o,{once:!0}),()=>e.removeEventListener("abort",o)};
function gy({handler:e,below:t,site:o,e:r,budget:n,downstreamSignal:s,state:i,run:p,floors:a,tier:f}){async function m(y,u,h=a){let A=o.raiseArgument?.(y)??y;if(i.pendingDownstream++===0)n.pause(),i.beneathSince=performance.now();let x=new AbortController,_=zE(s,x),b=zE(u,x),H=Ht();if(!s.aborted)p.beneath=H;let S=t(A,x.signal,{run:H,floors:h}).then((R)=>{let I=o.carry===void 0?R:o.carry(R,A,r);return i.belowRejected=void 0,i.fromBelow=[...i.fromBelow,I],I},(R)=>{throw i.belowRejected={error:R},R});i.inFlight=S;try{return await S}finally{_(),b(),ka(i,n)}}function c(y){let u=nt({handler:e,site:o,e:r},y);if(i.settled)throw In(e.name);return u}let d=(y)=>_n(a,y,{plugin:e.name,tier:f});return{runBelow:m,call:async(y,u,h)=>m(c(y),u,h),to:async(y,u)=>m(c(y),void 0,d(u)),replay:async(y,u,h)=>i.inFlight??m(nt({handler:e,site:o,e:r},y),u,h),replayTo:async(y,u)=>i.inFlight??m(nt({handler:e,site:o,e:r},y),void 0,d(u))}};
var lVr=(e)=>Promise.reject(new Oe(`no implementation for ${e.event}`));
var Aa=(e,t)=>({name:t.map((o)=>o.name).join("+"),tier:t[0]?.tier,tiers:L(t.map(je)),...t.at(-1)?.answersForEngine&&{answersForEngine:!0},budgetMs:0,isHop:!0,run:(o,r,{call:n,floors:s,cutAt:i})=>e.run({members:t,e:o,call:n,signal:r.signal,origin:r.origin,floors:s,cutAt:i})});
var va=(e)=>e.reduce((t,o)=>{let r=t.at(-1);return o.hop!==void 0&&r?.hop?.key===o.hop.key?[...t.slice(0,-1),{hop:r.hop,members:[...r.members,o]}]:[...t,{hop:o.hop,members:[o]}]},[]);
var Oy=(e)=>va(e).map((t)=>{let o=t.hop;return o===void 0?t.members[0]:Aa(o,t.members)});
var dyt=()=>Q7n()!==void 0;
async function Ex({e,handlers:t,site:o,signal:r=new AbortController().signal,cutAt:n,budgetMs:s=o.budgetMs??gbe,bottom:i,origin:p=BBe,floors:a=_7e,trace:f}){let m=Oy(t),c=_d({bottom:i??(()=>lVr(o)),index:m.length,event:o.event}),d=Ht(),y=dyt();return m.reduceRight((u,h,A)=>{let x=A===m.length-1;return Cy({handler:h,index:A,below:u,site:o,budgetMs:s,cutAt:n,origin:p,nothingBelow:i===void 0&&x,answersForEngine:y&&x&&h.answersForEngine===!0})},c)(e,r,{run:d,floors:a}).then((u)=>(f?.(Eo(d)),u)).catch((u)=>{if(!Ge(u,r))nd().log(`hooks chain failed: ${Le(u)}`,"error");throw u})};
function Pa(e,t){let o=e,r=Date.now(),n,s=!1,i=!1,p=()=>{},a=Ln(new Promise((d,y)=>{p=y}));function f(){s=!0,p(new Oe(t))}function m(){r=Date.now(),i=!0,n=setTimeout(f,o)}let c=()=>i?Math.max(0,o-(Date.now()-r)):o;return m(),{expired:a,isExpired:()=>s,remainingMs:()=>s?0:c(),pause(){clearTimeout(n),o=c(),i=!1},resume:m,clear:()=>clearTimeout(n),rearm(){if(s)return;if(o=e,clearTimeout(n),i)m()}}};
function Ln(e){return e.catch(()=>{}),e};
function vo(e,t,o){let r=()=>o===void 0?Number.POSITIVE_INFINITY:Math.max(0,o-Date.now()),n=Math.min(e<=0?Number.POSITIVE_INFINITY:e,r());if(e<=0)return{expired:void 0,isExpired:()=>!1,reading:()=>o===void 0?Ko:Object.freeze({ms:n,remainingMs:r()}),hasGraceExpired:()=>!1,pause(){},resume(){},clear(){},rearm(){}};let s=0,i=!1,p,a=Pa(e,`exceeded ${e}ms budget`),f=Promise.withResolvers();function m(){if(p=Pa(mbe,`did not settle within ${mbe}ms of its signal aborting`),s>0)p.pause();p.expired.catch(f.reject)}let c=zE(t,{abort:m});return{expired:Ln(Promise.race([a.expired,f.promise])),isExpired:()=>a.isExpired(),reading:()=>Object.freeze({ms:n,remainingMs:Math.min(a.remainingMs(),r())}),hasGraceExpired:()=>p?.isExpired()??!1,pause(){if(s++===0)a.pause(),p?.pause()},resume(){if(--s===0&&!i)a.resume(),p?.resume()},clear(){i=!0,a.clear(),p?.clear(),c()},rearm(){if(!i)a.rearm()}}};
var gbe=1e4;
var Ro=({call:e,to:t,signal:o,event:r,origin:n,run:s,budget:i,caught:p})=>EPe({call:e,to:(a,...f)=>t(a,f),signal:o,is:Bo(r),event:r,origin:n,trace:()=>Eo(s.beneath),budget:()=>i.reading(),caught:p});
var Ia=()=>({pendingDownstream:0,settled:!1,inFlight:void 0,fromBelow:[],belowRejected:void 0,beneathMs:0,beneathSince:0});
var Ge=(e,t)=>t.aborted&&(at(e)||l(e)===Syt(t));
function Fy(e,t){return t!==void 0?`its .catch returned ${t}`:e};
function Na({kind:e,error:t,rejection:o}){let r=e==="throw",n=o===void 0?void 0:l(o.error);return r?l(t):n};
async function By({handler:e,e:t,signal:o,state:r,handle:n,site:s,origin:i,run:p,cutAt:a,kind:f,error:m}){let c=e.catch;if(c===void 0)return{answer:void 0,problem:void 0};let d=r.inFlight!==void 0;await r.inFlight?.then(void 0,()=>{return});let y=Na({kind:f,error:m,rejection:r.belowRejected}),u=new AbortController,h=zE(o,u),A=!1,x=`${e.name}: next() after its .catch settled`,_=(R)=>A?Promise.reject(new Oe(x)):aVr(R),b=vo(rt,o,a),H=Ro({call:(R,I,K)=>_(()=>n.replay(R,I,K)),to:(R,I)=>_(()=>n.replayTo(R,I)),signal:u.signal,event:s.event,origin:i,run:p,budget:b,caught:{error:Object.freeze({kind:f,...y===void 0?{}:{message:y},budget:rt}),called:d}}),S=Mt.run(b,()=>c(t,H));try{return{answer:b.expired===void 0?await S:await Promise.race([S,b.expired]),problem:void 0}}catch(R){if(Ge(R,o))throw R;let I=Oo(rt),K=b.isExpired(),M=K?`its .catch ran past its ${I} grace`:`its .catch threw ${Ao(R)}`;if(u.abort(new Oe(`${e.name}: ${M}`)),K)Mn(S,e,s);return{answer:void 0,problem:M}}finally{A=!0,b.clear(),h()}};
var Cy=({handler:e,index:t,below:o,site:r,budgetMs:n,cutAt:s,origin:i,nothingBelow:p,answersForEngine:a})=>async(f,m,c)=>{let{run:d,floors:y}=c,u=je(e),h=Rn({handler:e,tier:u,index:t,site:r,e:f,descent:c});if(h!==void 0)return o(f,m,h);let A=performance.now(),x=Ia(),_=new AbortController,b=zE(m,_),H=new AbortController,S=zE(m,H),R=e.budgetMs??n,I=vo(R,m,s),K=Cn(f),M=gy({handler:e,below:o,site:r,e:f,budget:I,downstreamSignal:_.signal,state:x,run:d,floors:y,tier:u}),{call:F,to:X,runBelow:Ne}=M,ue=Ro({call:F,to:X,signal:H.signal,event:r.event,origin:i,run:d,budget:I});function Ee(j){return nd().log(`${e.name}: its next() rejected below it (${r.event}); the rejection passes up`),j}function z(j){let W=r.settle,J=Q(e)||W===void 0;try{let q=J?j:W(j),se=Q(e)?q:r.restoreResult?.(q,x.fromBelow,f)??q,ie=Q(e)||a?se:r.stripResult?.(se,x.fromBelow)??se,$e=Q(e)?void 0:r.check?.(ie,f,x.fromBelow);if($e===void 0&&!Q(e)&&e.isHop!==!0)jBe(e.name,r.event,r.measure?.(ie,f,x.fromBelow));return{settled:ie,problem:$e}}catch(q){let le=`a result the site cannot read (${l(q)})`;return{settled:j,problem:le}}}let ye,ge,pe="rejected",xe=!1,Z,ne;try{Z=Mt.run(I,()=>e.run(K,ue,{call:F,floors:y,cutAt:s}));let W=I.expired===void 0?await Z:await Promise.race([Z,I.expired]);if(W===void 0)throw ne="no result",new Oe("returned no result");let{settled:J,problem:q}=z(W);if(q!==void 0)throw ne=q,new Oe(`returned ${q}`);ye=J,ge=J,pe=W===x.fromBelow.at(-1)?"passed":"returned",xe=x.inFlight===void 0&&!Q(e)&&e.isHop!==!0}catch(j){if(Ge(j,m))throw j;let W=I.isExpired(),J=W?void 0:x.belowRejected;if(J!==void 0&&e.catch===void 0)throw Ee(J.error);let q=st(e,l(j));if(x.settled=!0,W&&Z!==void 0)H.abort(new Oe(q)),Mn(Z,e,r);let se=x.inFlight!==void 0,le=m.aborted?{answer:void 0,problem:void 0}:await By({handler:e,e:K,signal:m,state:x,handle:M,site:r,origin:i,run:d,cutAt:s,kind:W?"timeout":"throw",error:j}),ie=le.answer===void 0?void 0:z(le.answer);if(ie!==void 0&&ie.problem===void 0)nd().log(Ta(e.name,j,r.event),"warn"),nd().hookFailed({plugin:e.name,environmentId:e.environmentId,event:r.event,reason:q,effect:wa,hasOverrun:!1}),ye=ie.settled,ge=ie.settled,pe="caught";else if(J===void 0){if(ba({error:j,handler:e,site:r,effect:se?Oa:Sa,cause:{expiredMs:W?R:void 0,lingeredMs:I.hasGraceExpired()?mbe:void 0,shape:ne,caught:Fy(le.problem,ie?.problem)}}),x.inFlight===void 0&&p)throw j;ye=await(x.inFlight??Ne(f)),ge=se?ye:void 0,pe=W?"expired":se?"kept":"skipped"}else throw Ee(J.error)}finally{x.settled=!0,I.clear(),S(),b();let j=performance.now(),W=j-A-x.beneathMs-(x.pendingDownstream>0?j-x.beneathSince:0);if(tt(d,{index:t,plugin:e.isCore===!0?woe:e.name,tier:u,event:r.event,outcome:pe,ms:W,received:f,returned:ge}),xe)xa({plugin:e.name,tier:u,event:r.event,ms:W});if(x.pendingDownstream>0)_.abort(new Oe(`${e.name} settled the call`))}return ye};
var _Jn=ct(Ys(),(e)=>e.set(void 0));
var Fo=(e)=>_Jn.get()?.get(e);
var PVr=(e)=>Fo(e)!==void 0;
return {woe,BBe,JGo,G0,Bo,Ko,EPe,GG,H3,ss,is,as,ps,Un,eJn,fs,tJn,uVr,fVr,u7e,mVr,p7e,Pjt,Ijt,oJn,sJn,iJn,aJn,tpe,LQ,TPe,kPe,fj,Djt,LSn,NSn,ms,B,Re,Y,fyt,f7e,ZGo,C,Vo,De,gt,cs,cVr,OM,d7e,xt,fe,z0,Go,Xo,Gt,zo,us,ls,Xt,ds,ht,Yo,ys,gs,xs,zt,Jo,qo,kt,Qo,ks,ezo,ws,Ts,Z7n,CPe,Ye,Yt,tr,or,rr,qb,Es,bs,Ss,Os,nr,Jt,Ce,wt,oe,Je,V,qt,Qt,sr,Zt,ir,eo,xjt,ar,vs,Cs,GBe,pr,Ps,Is,fr,mr,Ns,cr,ur,lr,dr,yr,gr,xr,hr,nJn,to,Ms,kr,js,wr,Fs,Tt,oo,Ds,Ojt,Us,Et,Bs,Ks,Er,ro,Vs,rJn,uyt,Xs,zs,qs,br,Zs,ti,HM,Sr,Or,oi,ri,ni,no,Ar,vr,si,bt,ai,pi,mi,ci,ui,li,yi,gi,hi,Ue,Rr,so,St,Be,ao,Ot,Cr,ke,Pr,po,_r,Ir,At,Nr,zG,Mu,APe,bi,Ke,Fr,vt,Oi,MSn,cJn,dJn,uo,Ai,Dr,Rt,Hjt,Br,Kr,Wr,Vr,Gr,Xr,zr,Yr,Jr,Ct,qr,Qr,Zr,tn,rn,nn,vi,Ri,Ci,Pi,_i,Ii,go,Hi,sn,xo,ho,an,pn,Pt,_t,fn,mn,ji,Li,Fi,$i,Di,Ui,Bi,Ki,Wi,Vi,It,cn,Xi,zi,Ji,qi,Zi,Mjt,un,ln,ea,dn,Jl,Pe,yn,od,Eoe,Nt,gn,oa,xn,hn,kn,ra,wn,na,sa,pJn,Tn,En,bn,To,Sn,On,aa,pa,eu,Q,Ht,tt,Eo,_d,Rn,Cn,je,bo,ot,O3,ga,xa,mbe,Mt,aVr,rt,ha,ka,So,jBe,nt,_n,Oo,wa,Le,Ta,st,In,Nn,Hn,jt,Ao,Ea,ba,Sa,Oa,Mn,zE,gy,lVr,Aa,va,Oy,dyt,Ex,Pa,Ln,vo,gbe,Ro,Ia,Ge,Fy,Na,By,Cy,_Jn,Fo,PVr};
}
function module30(imports){
const qOe=imports["qOe"];
const va=imports["va"];
var Li=["userSettings","projectSettings","localSettings","flagSettings","policySettings"];
function Xo(){let e=qOe(),n=va();if(n.enabledSources?.allowed===e)return n.enabledSources.result;let t=new Set(e);t.add("flagSettings"),t.add("policySettings");let o=Li.filter((i)=>t.has(i));return n.enabledSources={allowed:e,result:o},o};
return {Li,Xo};
}
function module31(imports){
const Xo=imports["Xo"];
const ZA=imports["ZA"];
const $c=imports["$c"];
const ge=imports["ge"];
var lU=["userSettings","flagSettings","policySettings"];
function Coe(t){let i=new Set(Xo()),e=WQ(t),n,r;for(let s of lU){if(!i.has(s))continue;let g=ge(s)?.pluginConfigs;for(let u of e){let o=g?.[u];if(o?.options)n={...n,...o.options};if(o?.mcpServers){r=r??{};for(let[l,c]of Object.entries(o.mcpServers))r[l]={...r[l],...c}}}}return{options:n,mcpServers:r}};
function WQ(t){let i=ZA(t);if(i.length>0)return[...i.toReversed(),t];let e=`@${$c}`,n=t.endsWith(e)?t.slice(0,-e.length):"";return n!==""&&!n.includes("@")?[n,t]:[t]};
return {lU,Coe,WQ};
}
function module32(imports){
const ut=imports["ut"];
const t=imports["t"];
const gF=imports["gF"];
const FQ=imports["FQ"];
const ct=imports["ct"];
const VVr=imports["VVr"];
const Bjt=imports["Bjt"];
const nd=imports["nd"];
const zVr=imports["zVr"];
const l=imports["l"];
const _yt=imports["_yt"];
const Oe=imports["Oe"];
const KVr=imports["KVr"];
const PVr=imports["PVr"];
const byt=imports["byt"];
const Coe=imports["Coe"];
const zn=imports["zn"];
const ZA=imports["ZA"];
const BBe=imports["BBe"];
function ik(e,r){if(byt())return Promise.resolve({});let{optionValues:n}=ut(),i=n.get(e);if(i!==void 0)return i;let s=St(e,r);return n.set(e,s),s.catch(()=>{if(n.get(e)===s)n.delete(e)}),s};
async function St(e,r){let n=Coe(e).options??{},i=(await zn().readAsync(r))?.pluginSecrets,s=[...ZA(e).toReversed(),e].reduce((a,c)=>({...a,...i?.[c]}),{});return{...n,...s}};
function gpt(e,r){return e.replace(/\$\{user_config\.([^}]+)\}/g,(n,i)=>{let s=r[i];if(s===void 0)throw Error(`Plugin option "${i}" isn't set. Open /plugin manage to configure it, or check that the plugin's userConfig schema declares "${i}".`);return String(s)})};
function hpt(e,r){try{return gpt(e,r)!==e}catch{return!0}};
var _e=(e)=>typeof e==="string"?e:`${e.plugin}#${e.registration}`;
var ZNt=(e)=>(e??[]).map(_e).join(" > ");
var QNt=(e)=>typeof e==="string"?e:e.plugin;
function Et(e,r){let n=new Set;for(let i of e??[]){if(QNt(i)!==r)continue;if(typeof i==="string")return"every";n.add(i.registration)}return[...n].sort((i,s)=>i-s)};
var Ee=ct(new Map,(e)=>e.clear());
var Me=ct(new Set,(e)=>e.clear());
function G(e,r,n){let i=`${e.name}#${e.environmentId} ${r}`,s=Ee.get(i)??0;if(s>=VVr)return;Ee.set(i,s+1);let a=Bjt(e.matcherFor(r),n);if(a===void 0)return;let c=`${i} ${a.path}`;if(Me.has(c))return;Me.add(c),nd().log(zVr(e.name,r,a),"warn")};
function cFr(e,r,n){let i=e.matcherFor(r);if(i===void 0)return!0;try{if(_yt(i,n))return!0}catch(s){return t(`hooks module ${e.label}: on('${r}') matcher threw on the host (${l(s)}); the hop decides`),!0}return G(e,r,n),!1};
function Ae(e,r,{keys:n,e:i}){let s=e.matcherFor(r);if(s===void 0||!gF(i))return!1;try{let c=n.some((p)=>Object.hasOwn(i,p)&&!FQ(s,p,i[p]));if(c)G(e,r,i);return c}catch(c){return t(`hooks module ${e.label}: on('${r}') matcher threw on the host (${l(c)}); the hop decides`),!1}};
function se(e,r,n){if(!n||n.length===0)return e;let i=Et(n,e.name);if(i==="every"){t(`hooks module ${e.label} ${r} skipped: re-entry (the plugin's own code raised it; origin ${ZNt(n)})`);return}let s=e.registrationsFor(r),a=i.filter((c)=>s.includes(c));if(a.length===0)return e;if(!e.hooks(r,a)){t(`hooks module ${e.label} ${r} skipped: re-entry (its own frame is being dispatched; origin ${ZNt(n)})`);return}return t(`hooks module ${e.label} ${r}: hooks ${a.join(", ")} left out for re-entry (origin ${ZNt(n)})`),{...e,leftOut:a,hooks:(c,p=[])=>e.hooks(c,[...a,...p]),matcherFor:(c,p=[])=>e.matcherFor(c,[...a,...p])}};
function ypt(e,r,{only:n,e:i,among:s,pinned:a}={}){let c=(s??ut().loadedModules).flatMap((g)=>{if(!g.hooks(e)||g.name!==(n??g.name))return[];let m=se(g,e,r);return m===void 0||a!==void 0&&Ae(m,e,a)?[]:[m]});if(i===void 0)return c;let p=c.findIndex((g)=>cFr(g,e,i));return p===-1?[]:c.slice(p)};
function fe(e,r){let n=[];for(let i of e){let s=i.status();if(s.kind!=="live"){let a=s.kind==="retiring"||s.kind==="unloaded"&&s.retired,c=s.kind==="unloaded";t(`hooks module ${a?`${i.label}: its environment was retired by a reload during ${r}`:c?`${i.label}: its environment was unloaded (during ${r})`:`${i.label}: ${s.reason} (during ${r})`}; passing on`);continue}n.push(i)}return n};
function N3n(e,r,n){let i=e.matcherFor(r),s=e.hopKey.kind==="worker";if(i===void 0)return!0;let a=s?KVr(i,n):_yt(i,n);if(!a)G(e,r,n);return a};
function ce(e,r,n){let i=fe(e,r),s=i.findIndex((a)=>N3n(a,r,n));return s===-1?[]:i.slice(s)};
var le=(e,r,n)=>e.map((i)=>{let s=r.get(i);if(s===void 0)throw new Oe(`${n}: a hop member is not one of these handlers`);return s});
var Ne=({loaded:e,event:r,origin:n,raise:i,owners:s})=>({name:e.name,tier:e.tier,...PVr(e.args.modulePath)&&{answersForEngine:!0},run:(a,c,{call:p,floors:g,cutAt:m})=>U3n({members:[e],event:r,e:a,call:p,signal:c.signal,hookOrigin:n,raise:i,origin:c.origin,floors:g,cutAt:m}),hop:{key:e.hopKey,run:(a)=>U3n({members:le(a.members,s,r),event:r,e:a.e,call:a.call,signal:a.signal,hookOrigin:n,raise:i,origin:a.origin,floors:a.floors,cutAt:a.cutAt})}});
var Ue=(e)=>e;
var It=(e)=>e;
function aJ(e){let r=e?.at(-1);if(r===void 0)return BBe;let n=QNt(r),{loadedModules:i,moduleSeats:s}=ut(),c=i.find((p)=>p.name===n)?.tier??s.get(n)??"user";return Object.freeze({plugin:n,tier:c})};
var F3n=(e)=>e.map((r)=>r.label).join(", ");
function pe({members:e,event:r,e:n,hookOrigin:i,origin:s,raise:a,floors:c,cutAt:p,kind:g}){let[m]=e;if(i)t(`hooks module ${F3n(e)}: ${r}${g} nested in ${ZNt(i)}`);let y=e.flatMap((w)=>{let h=[...w.leftOut??[]],{environmentId:S}=w;return h.length>0?[{environmentId:S,registrations:h}]:[]});return{id:m?m.hopKey.nextDispatchId():0,event:r,payload:n,environments:e.map((w)=>w.environmentId),leftOut:y.length===0?void 0:y,origin:s,hookOrigin:i,raise:a,floors:c.length===0?void 0:c,cutAt:p}};
async function U3n(e){let{event:r,e:n,call:i,signal:s,floors:a}=e,c=ce(e.members,r,n),p=c[0]?.hopKey;if(!p)return i(n,void 0,a);let g=(S,k,v)=>i(S,k,v),m=performance.now();for(let S of c)S.enter();let y;try{y=await p.dispatch(pe({...e,members:c,kind:""}),g,s)}finally{for(let S of c)S.leave()}let h=typeof n==="object"&&"requestId"in n&&typeof n.requestId==="string"?` key=${n.requestId}`:"";return t(`hooks module ${F3n(c)} ${r} settled in ${(performance.now()-m).toFixed(1)}ms (${p.kind} hop, next() included)${h}`),Ue(y.result)};
function me(e,r,n){e.leave(),t(`hooks module ${e.label} ${r} settled in ${(performance.now()-n).toFixed(1)}ms (native link, next() included)`)};
function de({loaded:e,event:r,origin:n},i){let s=fe([e],r).length===1&&N3n(e,r,i);if(s&&n)t(`hooks module ${e.label} (native): ${r} nested in `+ZNt(n));return s};
function Qt(e){let{loaded:r,event:n,origin:i}=e;if(r.link===void 0)throw new Oe(`${r.name}: ${n}: not a native module; it runs in a hop`);let s=r.link({event:n,leftOut:r.leftOut,hookOrigin:i}),a=s.catch;async function c(m){let y=performance.now();r.enter();try{return await m()}finally{me(r,n,y)}}async function p(m,y){r.enter();try{return await a?.(m,y)}finally{r.leave()}}let g=(m,y,w)=>de({loaded:r,event:n,origin:i},m)?c(()=>s.run(m,y,w)):y(m);return It({...s,run:g,...a!==void 0&&{catch:p}})};
function Ve(e){return e.loaded.link!==void 0?Qt(e):Ne(e)};
function S0(e,r,n={}){let i=[],s=new Map;for(let a of ypt(e,r,n)){let c=Ve({loaded:a,event:e,origin:r,raise:n.raise,owners:s});s.set(c,a),i.push(c)}return i};
return {ik,St,gpt,hpt,_e,ZNt,QNt,Et,Ee,Me,G,cFr,Ae,se,ypt,fe,N3n,ce,le,Ne,Ue,It,aJ,F3n,pe,U3n,me,de,Qt,Ve,S0};
}
function module33(imports){
const ge=imports["ge"];
function P6o(){return null};
function I6o(o){return!1};
function Wb(){return ge("policySettings")?.disableAllHooks===!0};
return {P6o,I6o,Wb};
}
function module34(imports){
const bn=imports["bn"];
const e=imports["e"];
function an(t){return bn(e("sha256").update(t).digest("hex").slice(0,12))};
return {an};
}
function module35(imports){
const i=imports["i"];
const c=imports["c"];
const tme=imports["tme"];
const Ue=imports["Ue"];
var n=Ue;
function BWe(e){return`hook_${n(e)}`};
function y(e,r){i("tengu_feature_ok",{feature_name:c(e),...r})};
function m(e,r,u){i("tengu_feature_bad",{...u,feature_name:c(e),error_code:tme(r)})};
function p(e,r,u){i("tengu_feature_sad",{...u,feature_name:c(e),error_code:tme(r)})};
return {n,BWe,y,m,p};
}
function module36(imports){

function hOe(n){return n.slice(n.lastIndexOf(")")+2).split(" ")[19]};
function wTn(n){let t=n.slice(n.lastIndexOf(")")+2).split(" ")[1],e=t===void 0?NaN:Number.parseInt(t,10);return Number.isNaN(e)?void 0:e};
return {hOe,wTn};
}
function module37(imports){
const hOe=imports["hOe"];
const G=imports["G"];
const pe=imports["pe"];
const w=imports["w"];
const wTn=imports["wTn"];
const Rs=imports["Rs"];
const V=imports["V"];
const t=imports["t"];
const E=imports["E"];
const i=imports["i"];
const S=imports["S"];
const O=imports["O"];
const a=imports["a"];
const gs=imports["gs"];
const zo=imports["zo"];
const Xe=imports["Xe"];
const Nn=imports["Nn"];
const y=imports["y"];
const m=imports["m"];
const so=imports["so"];
const Ko=imports["Ko"];
const c=imports["c"];
function qe(e){let n;for(let r of e.split(`
`)){let[o,s,...u]=r.split(":");if(s===void 0||u.length===0)continue;let d=u.join(":");if(s.split(",").includes("memory"))return{mountRoot:"/sys/fs/cgroup/memory",path:d,v2:!1};if(o==="0"&&s==="")n=d}return n===void 0?void 0:{mountRoot:"/sys/fs/cgroup",path:n,v2:!0}};
var He="claude-code-bash";
var Gn=1073741824;
var qo=Gn;
var Ve=["mcp","lsp","hooks","plugin","tmux","helper","agent"];
class Ln{reader=null;subscribeRefresh=null;register(e){let n=this.reader;return this.reader=e,n}read(e,n){return this.reader?this.reader(e,n):n}};
var N=new Ln;
class jn{dir=void 0;layout=void 0;limit=0;activatedClasses=new Set;pendingPids=new Map;pendingUnsubscribe=void 0;oomKillsSeen=void 0};
var T=new V(()=>new jn);
function Ye(){let e=Rs(T);if(e.dir!==void 0)return e.dir??void 0;let n=O();if(n!=="linux"&&n!=="wsl"){e.dir=null;return}let r=a.CLAUDE_CODE_TOOL_MEMORY_LIMIT?.trim().toLowerCase();if(r&&(gs(r)||r==="none")){e.dir=null;return}let o=ci(r);if(o===void 0&&N.read("tengu_tool_memory_cgroup",!1)!==!0)return;try{let s=oi(G("/proc/self/cgroup","utf8"));if(!s)throw Error("no memory cgroup hierarchy");let u=ui(o,zo());if(u===void 0){e.dir=null,t("tool cgroup: disabled (host too small for the default cap)"),i("tengu_tool_cgroup",{status:S("host_too_small")});return}zn(s,u),e.dir=s.dir,e.layout=s,e.limit=u,t(`tool cgroup: ${s.dir} ${s.reuse?"(nested: already capped, reusing our own)":`limit=${u}`}`),y("shell_memory_cgroup"),i("tengu_tool_cgroup",s.reuse?{status:S("nested")}:{status:S("enabled"),limit_bytes:u})}catch(s){e.dir=null,t(`tool cgroup: disabled (${E(s)??s})`),m("shell_memory_cgroup",so(s)??"no_hierarchy"),i("tengu_tool_cgroup",{status:S("disabled")})}return e.dir??void 0};
function K(e){if(Ye()===void 0)return;if(e!=="shell"&&Mn().has(e))return;let n=Rs(T),r=Ho(n);if(r===void 0)return;if(Bn(n),!n.activatedClasses.has(e))n.activatedClasses.add(e),i("tengu_tool_cgroup",{status:S("class_enabled"),class:c(e)});return r};
function Ho(e,n={exists:Vo,mkdirSync:Xe,writeFileSync:pe,rmdirSync:Nn}){if(e.dir===void 0||e.dir===null)return;try{if(n.exists(e.dir))return e.dir;if(e.layout===void 0||e.layout.reuse)throw Error("enclosing tool cgroup is gone");return zn(e.layout,e.limit,n),t(`tool cgroup: ${e.dir} vanished; re-created`),i("tengu_tool_cgroup",{status:S("recreated")}),e.dir}catch(r){e.dir=null,t(`tool cgroup: disabled (dir vanished: ${E(r)??r})`),i("tengu_tool_cgroup",{status:S("vanished")});return}};
function Vo(e){return Ko(e,{throwIfNoEntry:!1})!==void 0};
function Mn(){let e=a.CLAUDE_CODE_TOOL_MEMORY_CGROUP_EXCLUDE?.trim(),n=Xo(e);if(n.has("mcp")||!Yo(!e))return n;return new Set([...n,"mcp"])};
function Xo(e){if(e)return Fn(e.split(","));let n=N.read("tengu_tool_cgroup_exclude_classes",null);if(Array.isArray(n))return Fn(n);return new Set(Ve)};
function Yo(e){let n=a.CLAUDE_CODE_MCP_MEMORY_CGROUP?.trim().toLowerCase();if(n&&(gs(n)||n==="none"))return!0;return e&&N.read("tengu_mcp_memory_cgroup",null)===!1};
function Fn(e){let n=new Set;for(let r of e){let o=typeof r==="string"?r.trim().toLowerCase():"";if(o==="all-new"){Ve.forEach((u)=>n.add(u));continue}let s=Ve.find((u)=>u===o);if(s!==void 0)n.add(s)}return n};
function Ga(e){let n=K(e);return n===void 0?{}:{cgroup:n}};
var STn={readStarttime:Jo,writeFileSync:pe,readCgroupPids:ti,readProcIdentity:ei};
function Jo(e){try{return hOe(G(`/proc/${e}/stat`,"utf8"))}catch{return}};
function ei(e){try{let n=G(`/proc/${e}/stat`,"utf8"),r=wTn(n),o=hOe(n);return r===void 0||o===void 0?void 0:{ppid:r,starttime:o}}catch{return}};
function ti(e){return G(w.join(e,"cgroup.procs"),"utf8").split(`
`).map((n)=>Number.parseInt(n,10)).filter((n)=>!Number.isNaN(n))};
function ni(e){let n=/^oom_kill (\d+)$/m.exec(e);return n?Number.parseInt(n[1],10):void 0};
function Ze(e){return w.join(e.dir,e.v2?"memory.events":"memory.oom_control")};
function z(e){return G(e,"utf8")};
function Qe(e,n=z){try{return ni(n(e))}catch{return}};
function Bn(e,n=z,r){try{let o=e.layout;if(!e.dir||o===void 0||o.reuse)return;let s=r??Qe(Ze(o),n);if(s===void 0)return;let u=e.oomKillsSeen;if(e.oomKillsSeen=s,u===void 0||s<=u)return;t(`tool cgroup: OOM killer fired ${s-u} time(s) in ${o.dir} since last check`),i("tengu_tool_cgroup",{status:S("oom_kill"),oom_kills:s-u,cgroup_v2:o.v2})}catch(o){t(`tool cgroup: oom_kill check skipped (${o})`)}};
function bTn(e,n,r=STn){try{let o=Rs(T);if(o.dir===void 0){if(o.pendingPids.get(e)?.starttime!==n)return!1;return o.pendingPids.delete(e),t(`tool cgroup: unparked pid ${e}; it stays uncapped`),!0}let s=o.layout;if(!o.dir||s===void 0||s.reuse)return!1;if(r.readStarttime(e)!==n)return!1;let u=w.join(s.selfDir,"cgroup.procs");r.writeFileSync(u,String(e));let d=1+Kn(e,s.dir,u,r,"released");return t(`tool cgroup: released pid ${e} (${d} process${d===1?"":"es"}) to ${s.selfDir}`),i("tengu_tool_cgroup",{status:S("released"),released_count:d}),!0}catch(o){return t(`tool cgroup: release of pid ${e} failed (${E(o)??o})`),!1}};
function Kn(e,n,r,o,s){let u=0;for(let{pid:d,starttime:l}of ri(e,n,o)){if(o.readStarttime(d)!==l){t(`tool cgroup: descendant ${d} of pid ${e} exited or was recycled; skipped`);continue}try{o.writeFileSync(r,String(d)),u++}catch(f){t(`tool cgroup: descendant ${d} of pid ${e} not ${s} (${E(f)??f})`)}}return u};
function ri(e,n,r){let o;try{o=r.readCgroupPids(n)}catch(l){return t(`tool cgroup: members of ${n} unreadable (${E(l)??l}); moving pid ${e} alone`),[]}let s=new Map;for(let l of o){if(l===e)continue;let f;try{f=r.readProcIdentity(l)}catch{f=void 0}if(f===void 0)continue;let p={pid:l,starttime:f.starttime},g=s.get(f.ppid);if(g)g.push(p);else s.set(f.ppid,[p])}let u=[],d=[e];for(let l=0;l<d.length;l++)for(let f of s.get(d[l])??[])u.push(f),d.push(f.pid);return u};
function zn(e,n,r={mkdirSync:Xe,writeFileSync:pe,rmdirSync:Nn}){if(e.reuse)return;let o=!0;try{r.mkdirSync(e.dir)}catch(s){if(E(s)!=="EEXIST")throw s;o=!1}try{r.writeFileSync(w.join(e.dir,e.v2?"memory.max":"memory.limit_in_bytes"),String(n))}catch(s){if(o)try{r.rmdirSync?.(e.dir)}catch{}throw s}};
function oi(e){let n=qe(e);if(!n)return;return si(n.mountRoot,n.path,n.v2?w.dirname(n.path):n.path,n.v2)};
function si(e,n,r,o){let s=n.split("/").includes(He),u=w.join(e,n,".");return s?{dir:u,v2:o,reuse:!0,selfDir:u}:{dir:w.join(e,r,He),v2:o,reuse:!1,selfDir:u}};
function ai(e){return Math.floor(e-Math.max(2*Gn,e*0.15))};
function ui(e,n){if(e!==void 0)return e;let r=ai(n);return r>=qo?r:void 0};
function ci(e){let n=/^(\d+(?:\.\d+)?)\s*([kmgt]?)(?:i?b)?$/i.exec(e?.trim()??"");if(!n)return;let r=Math.floor(Number(n[1])*1024**" kmgt".indexOf((n[2]||" ").toLowerCase()));return r>=1?r:void 0};
return {qe,He,Gn,qo,Ve,Ln,N,jn,T,Ye,K,Ho,Vo,Mn,Xo,Yo,Fn,Ga,STn,Jo,ei,ti,ni,Ze,z,Qe,Bn,bTn,Kn,ri,zn,oi,si,ai,ui,ci};
}
function module38(imports){

function IJr(e){return`claude-code_${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.287",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-10-01T16:02:06Z",GIT_SHA:"3c446a1b98aceb99a6cdee0f84a8bea42f4a8937",HOOKS_WORKER_URL:"/$bunfs/root/src/plugins/functionHooks/hooks-worker/hooks-worker.js",DD_SOURCEMAP_GROUP:"darwin"}.VERSION.replace(/\./g,"-")}_${e}`};
return {IJr};
}
function module39(imports){
const a=imports["a"];
function Js(){if(a._CLAUDE_CODE_ASSUME_FIRST_PARTY_BASE_URL)return!0;return tg()};
function tg(){let e=process.env.ANTHROPIC_BASE_URL;if(!e)return!0;return ry(e)};
function ry(e){try{let t=new URL(e).host;return["api.anthropic.com"].includes(t)}catch{return!1}};
function Tje(){return Js()||a.CLAUDE_CODE_PROPAGATE_TRACEPARENT};
return {Js,tg,ry,Tje};
}
function module40(imports){
const Ef=imports["Ef"];
const see=imports["see"];
const re=imports["re"];
const Rs=imports["Rs"];
const V=imports["V"];
const bTn=imports["bTn"];
const t=imports["t"];
const aKo=imports["aKo"];
const cZ=imports["cZ"];
const f=imports["f"];
const u=imports["u"];
const B=imports["B"];
const o=imports["o"];
const DM=imports["DM"];
const uY=imports["uY"];
const IJr=imports["IJr"];
const Tje=imports["Tje"];
const G_e=imports["G_e"];
const Ga=imports["Ga"];
function m$e(e){let n={CLAUDECODE:"1",CLAUDE_CODE_SESSION_ID:e.sessionId,CLAUDE_CODE_CHILD_SESSION:"1",CLAUDE_CODE_SESSION_ATTENDED:uY()?"1":"0",CLAUDE_PID:String(process.pid)};if(e.source==="agent")n.AI_AGENT=IJr("agent");if(e.effortLevel!==void 0)n.CLAUDE_EFFORT=e.effortLevel;if(Tje()){let r=G_e();if(r!==void 0)n.TRACEPARENT=r}return n};
function zne(e){return{sessionId:e.session_id,effortLevel:e.effort?.level,source:"harness"}};
var v9="anthropic/memory";
var uqn="read_only";
var yI="none";
var A9=4096;
var Bh={all:0,read_only:1,none:2};
var P9=f(()=>u({subagent_memory:B(["all","read_only","none"]).optional().catch(yI),subagent_note:o().max(A9).optional().catch(void 0)}));
function pqn(e,n){let r,s,h,g=!1;for(let A of e??[]){if(!cZ(A))continue;if(A.type!=="connected"){g||=A.type!=="disabled";continue}let M=A.capabilities.experimental?.[v9];if(M===void 0)continue;let D=P9().safeParse(M),z=D.success?D.data.subagent_memory:yI,j=D.success?DM(D.data.subagent_note??"").trim()||void 0:void 0;if(z===void 0)h??=j;else if(r===void 0||Bh[z]>Bh[r])r=z,s=j}let b=r===void 0?n:n===void 0||Bh[r]>=Bh[n]?r:n,w=b===void 0?"default":b===r?"served":"fallback",R=r===void 0||b===r;if(r===void 0)s=h;return{mode:b??uqn,source:w,...s!==void 0&&R&&{note:s},...b===void 0&&g&&{serverPending:!0}}};
function _I(e){return aKo.has(e)};
function WMr(e,n){return n==="none"||!_I(e)};
var Pn=new V(()=>({answeredForSession:void 0,inflightFor:void 0,held:void 0,inflight:void 0,kicked:void 0,epoch:0,firstWaitSpent:!1,withdrawalOwed:!1,gateReported:void 0,lastCheck:void 0,turnEndCheck:void 0,turnEndGet:void 0,shown:new Set,shownRecall:[],failures:0,notBefore:void 0,tools:!1,subagentMode:void 0,earlyGets:new WeakMap,earlyGetsHeldBack:!1,lastGetUnanswered:!1,standingEarlyKick:void 0}));
function wdn(e){return Pn.of(e).subagentMode};
var eNt=new Set(["Notification","SessionStart","SessionEnd","Setup","StopFailure","SubagentStart","PostToolUseFailure","PostCompact","PostModelSwitch","PermissionDenied","WorktreeCreate","WorktreeRemove","InstructionsLoaded","CwdChanged","FileChanged","DirectoryAdded","MessageDisplay","StatusLine","FileSuggestion"]);
function N5e(e){return eNt.has(e)?Ga("hooks"):{}};
class e0{servers=[];unsubscribe=void 0;clear(){this.servers=[],this.unsubscribe?.(),this.unsubscribe=void 0}};
var xJ=new V(()=>new e0);
function Pw(){return Rs(xJ)};
function HHo(e,n){if(eNt.has(n))return;try{let r=Pw();if(!r.servers.some((s)=>s.name===e))return;Cw(r),r.servers=r.servers.filter((s)=>{if(s.name!==e)return!0;let h=bTn(s.pid,s.starttime,s.fs);return t(`tool cgroup: mcp server backing a ${n} hook was still capped at fire time; ${h?"released now":"release refused"}`),!h})}catch(r){t(`tool cgroup: mcp release at hook fire skipped (${r})`)}};
function Cw(e){e.servers=e.servers.filter((n)=>n.fs.readStarttime(n.pid)===n.starttime)};
function y0(e){return!(("async"in e)&&e.async===!0)};
function d_e(e){return"async"in e&&e.async===!0};
var GHo="CLAUDE_SCRIPT_HOOK_ACK";
function nLr(e,n){throw Error("script hooks are not available in this build")};
var e7=60;
function Sqn(e){let n=see(e).split(`
`).map((h)=>h.trim()).find((h)=>h.length>0)??"",r=re(n,e7),s=r.length<n.length||e.trim().includes(`
`);return`script: ${r}${s?"\u2026":""}`};
function aH(e){switch(e.type){case"command":return e.args?[e.command,...e.args].join(" "):e.command;case"prompt":return e.prompt;case"agent":return e.prompt;case"http":return e.url;case"mcp_tool":return`${e.server}/${e.tool}`;case"script":return e.file!==void 0?Ef(e.file):Sqn(e.script??"");case"callback":return"callback";case"function":return"function"}};
function Iut(e){return{command:Ef(aH(e)),statusMessage:"statusMessage"in e&&e.statusMessage?Ef(e.statusMessage):void 0}};
return {m$e,zne,v9,uqn,yI,A9,Bh,P9,pqn,_I,WMr,Pn,wdn,eNt,N5e,e0,xJ,Pw,HHo,Cw,y0,d_e,GHo,nLr,e7,Sqn,aH,Iut};
}
function module41(imports){
const a=imports["a"];
function Ja(){let _=a.MCP_TIMEOUT;return _&&_>0?Math.min(_,2147483647):30000};
return {Ja};
}
function module42(imports){

class Mir{now(){return Date.now()}monotonicNow(){return performance.now()}setTimeout(t,r,e){let o=setTimeout(t,r);if(e?.unref)o.unref();return()=>clearTimeout(o)}};
var aB=new Mir;
function ee(t,r,e){return new Promise((o,n)=>{if(r?.aborted){if(e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error("aborted"));else o();return}let m=(e?.clock??aB).setTimeout(()=>{r?.removeEventListener("abort",i),o()},t,{unref:e?.unref});function i(){if(m(),e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error("aborted"));else o()}r?.addEventListener("abort",i,{once:!0})})};
var s=(t,r)=>{let e=setTimeout(t,r);return()=>clearTimeout(e)};
function lt(t,r,e=s){let o=()=>{},n=new Promise((m)=>{o=e(()=>m(void 0),r)});return Promise.race([t,n]).finally(o)};
return {Mir,aB,ee,s,lt};
}
function module43(imports){
const SXr=imports["SXr"];
const M=imports["M"];
var Oo=["ANTHROPIC_API_KEY","CLAUDE_CODE_OAUTH_TOKEN","CLAUDE_CODE_ARTIFACTS_API_TOKEN","CLAUDE_CODE_MEMORY_API_TOKEN","CLAUDE_CODE_SLACK_TAG_TOKEN","ANTHROPIC_AUTH_TOKEN","ANTHROPIC_FOUNDRY_API_KEY","ANTHROPIC_FOUNDRY_AUTH_TOKEN","ANTHROPIC_AWS_API_KEY","ANTHROPIC_CUSTOM_HEADERS","AWS_SECRET_ACCESS_KEY","AWS_SESSION_TOKEN","AWS_BEARER_TOKEN_BEDROCK","GOOGLE_APPLICATION_CREDENTIALS","GOOGLE_GHA_CREDS_PATH","AZURE_CLIENT_SECRET","IDENTITY_HEADER","MSI_SECRET","AZURE_CLIENT_CERTIFICATE_PATH","AZURE_CLIENT_CERTIFICATE_PASSWORD","AZURE_PASSWORD","AZURE_FEDERATED_TOKEN_FILE","AWS_WEB_IDENTITY_TOKEN_FILE","AWS_CONTAINER_CREDENTIALS_RELATIVE_URI","AWS_CONTAINER_CREDENTIALS_FULL_URI","AWS_CONTAINER_AUTHORIZATION_TOKEN","AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE","CLOUDSDK_AUTH_ACCESS_TOKEN","GOOGLE_OAUTH_ACCESS_TOKEN","CLAUDE_CODE_OAUTH_REFRESH_TOKEN","HF_TOKEN","HUGGING_FACE_HUB_TOKEN","HUGGINGFACEHUB_API_TOKEN","NODE_AUTH_TOKEN","NUGET_AUTH_TOKEN","CARGO_REGISTRY_TOKEN","TWINE_PASSWORD","TWINE_USERNAME","PYPI_TOKEN","PYPI_API_TOKEN","UV_PUBLISH_TOKEN","UV_PUBLISH_PASSWORD","UV_PUBLISH_USERNAME","FLIT_PASSWORD","FLIT_USERNAME","HATCH_INDEX_AUTH","HATCH_INDEX_USER","GEM_HOST_API_KEY","MATURIN_PYPI_TOKEN","MATURIN_PASSWORD","MATURIN_USERNAME","CONAN_LOGIN_USERNAME","CONAN_PASSWORD","ANACONDA_API_TOKEN","BINSTAR_API_TOKEN","VAULT_TOKEN","VAULT_AUTH_TOKEN","VAULT_ROLE_ID","VAULT_SECRET_ID","CONSUL_HTTP_TOKEN","CONSUL_HTTP_AUTH","NOMAD_TOKEN","NOMAD_HTTP_AUTH","CI_REGISTRY_USER","CI_DEPLOY_USER","JF_USER","FASTLANE_SESSION","MATCH_GIT_BASIC_AUTHORIZATION","SONAR_TOKEN","SONARQUBE_SCANNER_PARAMS","SONAR_SCANNER_JSON_PARAMS","SLACK_WEBHOOK_URL","SLACK_WEBHOOK","DISCORD_WEBHOOK","DISCORD_WEBHOOK_URL","TEAMS_WEBHOOK_URL","MS_TEAMS_WEBHOOK_URI","ANTHROPIC_IDENTITY_TOKEN","ANTHROPIC_IDENTITY_TOKEN_FILE","CLOUDSDK_AUTH_ACCESS_TOKEN_FILE","CLOUDSDK_AUTH_AUTHORIZATION_TOKEN_FILE","AZURE_AUTH_LOCATION","ACTIONS_ID_TOKEN_REQUEST_TOKEN","ACTIONS_ID_TOKEN_REQUEST_URL","ACTIONS_RUNTIME_TOKEN","ACTIONS_RUNTIME_URL","ALL_INPUTS","VSS_NUGET_EXTERNAL_FEED_ENDPOINTS","ARTIFACTS_CREDENTIALPROVIDER_EXTERNAL_FEED_ENDPOINTS","VSS_NUGET_ACCESSTOKEN","ARTIFACTS_CREDENTIALPROVIDER_ACCESSTOKEN","COMPOSER_AUTH","OVERRIDE_GITHUB_TOKEN","DEFAULT_WORKFLOW_TOKEN","SSH_SIGNING_KEY"];
var Io=["AWS_SHARED_CREDENTIALS_FILE","AWS_CONFIG_FILE","CLOUDSDK_CONFIG","AZURE_CONFIG_DIR","KUBECONFIG","NETRC","PGPASSFILE","PGSERVICEFILE","DOCKER_CONFIG","GH_CONFIG_DIR","GNUPGHOME","NPM_CONFIG_USERCONFIG","NPM_CONFIG_GLOBALCONFIG","SSH_AUTH_SOCK","GIT_SSH_COMMAND","GIT_SSH","GIT_ASKPASS","SSH_ASKPASS","SSH_AGENT_PID","TF_CLI_CONFIG_FILE","WGETRC","PIP_CONFIG_FILE","UV_CONFIG_FILE","RCLONE_CONFIG","BOTO_CONFIG","BOTO_PATH","S3CMD_CONFIG","SOPS_AGE_KEY_FILE","ANSIBLE_VAULT_PASSWORD_FILE","ANSIBLE_VAULT_IDENTITY_LIST","ANSIBLE_CONFIG","GOAUTH","SBT_CREDENTIALS","COURSIER_CREDENTIALS","CONSUL_HTTP_TOKEN_FILE","SYSTEM_WGETRC","CLOUDSDK_ROOT_DIR","M2_HOME","MAVEN_HOME","LEIN_HOME","SSLKEYLOGFILE","GIT_CONFIG_GLOBAL","GIT_CONFIG_SYSTEM","XDG_CONFIG_HOME","XDG_CONFIG_DIRS","XDG_CACHE_HOME","XDG_DATA_HOME","XDG_STATE_HOME","XDG_RUNTIME_DIR","HELM_REGISTRY_CONFIG","HELM_REPOSITORY_CONFIG","HELM_CONFIG_HOME","REGISTRY_AUTH_FILE","DOCKER_CERT_PATH","SSL_CLIENT_CERT","GIT_SSL_CERT","GIT_SSL_KEY","PIP_CLIENT_CERT","PGSSLKEY","VAULT_CLIENT_KEY","VAULT_CLIENT_CERT","CONSUL_CLIENT_KEY","CONSUL_CLIENT_CERT","NOMAD_CLIENT_KEY","NOMAD_CLIENT_CERT","PGSSLCERT","PGSYSCONFDIR","CURL_HOME","CARGO_HOME","COMPOSER_HOME","GRADLE_USER_HOME","BUNDLE_CONFIG","BUNDLE_USER_CONFIG","BUNDLE_USER_HOME","BUNDLE_APP_CONFIG","POETRY_CONFIG_DIR","COURSIER_CONFIG_DIR","HEX_HOME","HF_HOME","HF_TOKEN_PATH","HF_STORED_TOKENS_PATH","CONDARC","BUN_CONFIG_FILE","GOENV","NPM_CONFIG_PREFIX","CLOUDSDK_AUTH_CREDENTIAL_FILE_OVERRIDE","CLAUDE_CONFIG_DIR","ANTHROPIC_CONFIG_DIR","ANTHROPIC_PROFILE","CLAUDE_CODE_FEDERATION_CACHE_DIR","CLAUDE_SECURESTORAGE_CONFIG_DIR"];
function FQe(){return Itr(),Pe?Io.flatMap((e)=>[e,`INPUT_${e}`,...e.startsWith("NPM_CONFIG_")?[e.toLowerCase()]:[]]):[]};
function Itr(){let e=process.env.CLAUDE_CODE_SUBPROCESS_ENV_SCRUB;Pe??=qt(e)||qt(process.env.GITHUB_ACTIONS)&&!Do(e)};
var Pe;
function Do(e){return e!==void 0&&/^(?:0|false|no|off)$/i.test(String(e).trim())};
function qt(e){let n=e===void 0?void 0:String(e).trim().toLowerCase();return n==="1"||n==="true"||n==="yes"||n==="on"};
var yje=Oo.flatMap((e)=>[e,`INPUT_${e}`]);
var L9r=["ANTHROPIC_API_KEY","ANTHROPIC_AUTH_TOKEN","ANTHROPIC_CUSTOM_HEADERS","CLAUDE_CODE_OAUTH_TOKEN","CLAUDE_CODE_OAUTH_REFRESH_TOKEN","CLAUDE_CODE_ARTIFACTS_API_TOKEN","CLAUDE_CODE_MEMORY_API_TOKEN","CLAUDE_CODE_SLACK_TAG_TOKEN","ANTHROPIC_FOUNDRY_API_KEY","ANTHROPIC_FOUNDRY_AUTH_TOKEN","ANTHROPIC_AWS_API_KEY","ANTHROPIC_IDENTITY_TOKEN","ANTHROPIC_IDENTITY_TOKEN_FILE","ALL_INPUTS"];
var N9r=L9r.flatMap((e)=>[e,`INPUT_${e}`]);
var rt=/CONN(ECT(ION)?)?_?STR(ING)?S?(?=$|[_0-9])/i;
function F9r(e){return rt.test(e)||rt.test(gn(e))};
var pn=["OAuth","NextAuth"];
function gn(e){return pn.reduce((n,r)=>n.replaceAll(r,r[0]+r.slice(1).toLowerCase()),e).replace(/([a-z0-9])([A-Z])/g,"$1_$2").replace(/([A-Z])([A-Z][a-z])/g,"$1_$2")};
var fn=["TOKEN","SECRET","PASSWORD","PASSWD","PASSPHRASE","KEY","AUTH","COOKIE","PAT","DSN","WEBHOOK","CREDENTIAL","CREDENTIALS","CREDS","APIKEY","ACCESSKEY","SECRETKEY","ACCOUNTKEY","PRIVATEKEY","AUTHKEY","SSHKEY","SIGNINGKEY","MASTERKEY","DEPLOYKEY","ENCRYPTIONKEY","PGPASSWORD","SSHPASS"];
var _n=["PWD","PASS","JWT"];
var Sn=["TOKEN","SECRET","PASSWORD","PASSWD","PASSPHRASE"];
var mn=["KEY","SECRET","PASSWORD","CREDENTIAL"];
var en=new RegExp(`((^|_)(${fn.join("|")}|(${mn.join("|")})S)|_(${_n.join("|")})|(${Sn.join("|")}))(?=$|[_0-9])`,"i");
var xo=/^GIT_CONFIG_KEY_[0-9][A-Za-z0-9_]*$/;
function ko(e){return/^GIT_CONFIG_(?:COUNT|PARAMETERS|(?:KEY|VALUE)_[0-9]+)$/.test(e)};
function xSt(e){return ko(e)||Uo.test(e)};
var Uo=/^(?:(?:https?|ftp|all|no)_proxy|npm_config_(?:https?_)?proxy|npm_config_noproxy|yarn_proxy|(?:yarn|global_agent|docker|claude_code)_(?:https?|no)_proxy|cloudsdk_proxy_[a-z]+|electron_get_use_proxy)$/i;
function $9r(e,n){let r=izt(e,n);return r===void 0?dT(n):r!==n};
function izt(e,n){if(sCn(e)==="GOFLAGS")return n.length>we?"":yi(n);if(!Pn.has(sCn(e)))return;let r=n.length>we?null:$Qe(n);if(r===null)return"";Itr();let s=r.map((R,A)=>{let I=A>0&&/^(?:-D|--define)$/.test(_je(r[A-1]))?`-D${R}`:An(_je(R));return{raw:R,word:I,residual:Tn.test(I),goes:!1}});for(let R=0;R<s.length;R++){let A=s[R];if(A.residual)continue;let I=R>0?s[R-1].word:null,b=s[R+1];if(A.goes=A.goes||jo(A.word,I)||b!==void 0&&!b.residual&&!Te(b.word)&&ot.test(A.word)&&dT(`${A.word} ${b.word}`),A.goes&&b!==void 0&&!Te(b.word)&&ot.test(A.word))b.goes=!0}for(let R=1;R<s.length;R++){if(Ko.test(s[R-1].word))s[R].goes=!0;if(s[R].goes&&!_je(s[R].raw).startsWith("-")&&Go(s[R-1].word))s[R-1].goes=!0}let g=s.filter((R)=>!R.goes);e:while(oCn(g.filter((R)=>!R.residual).flatMap(tn))){let R=g.filter((A)=>!A.residual);for(let A=2;A<=4;A++)for(let I=0;I+A<=R.length;I++){let b=R.slice(I,I+A);if(oCn(b.flatMap(tn))){for(let v of b)v.goes=!0;g=g.filter((v)=>!v.goes);continue e}}for(let A of R)A.goes=!0;g=g.filter((A)=>!A.goes)}if(g.length===s.length)return n;let h=Zo.has(sCn(e))?$o:En;return g.every((R)=>h.test(R.raw))?g.map((R)=>R.raw).join(" "):""};
var En=/^[A-Za-z0-9_.,:=\/@+~*?-]+$/;
var $o=/^[A-Za-z0-9_.,:=\/@+~|*?-]+$/;
var ot=/(?:\b(?:Bearer|Basic|token)|authorization\s*[:=]\s*["']?(?:[a-z][a-z0-9_-]*)?|-token\s*[:=])\s*["']?$/i;
function Go(e){return j9r(e)===""||W9r(e)===""||Wo.test(e)||Rn.test(e)};
var Wo=/^(?:-D|--define|-f|--file|-pl|--projects|-rf|--resume-from|-l|--log-file|-t|--toolchains|-gt|--global-toolchains|-itr|--install-toolchains|-P|--activate-profiles|-b|--builder|-T|--threads|-emp|--encrypt-master-password|-ep|--encrypt-password)$/;
var Ko=/^(?:-emp|--encrypt-master-password|-ep|--encrypt-password)$/;
var Bo=/^(?:-emp|--encrypt-master-password|-ep|--encrypt-password)=./s;
function Te(e){return/^-D[A-Za-z_][\w.-]*=.+$/s.test(e)||/^-D[A-Za-z_]\w*(?:\.\w+)+=$/.test(e)||/^-D[A-Za-z_][A-Za-z_.]*$/.test(e)||e.startsWith("-J-")&&Te(e.slice(2))||/^--[a-z][a-z0-9-]*(?:=.*)?$/s.test(e)||zo.test(e)||/^(?:@|-[A-Za-z]{1,4}\d{0,2}$)/.test(e)};
var zo=/^-(?:X(?:mx|ms|ss|mn|rs|int|comp|mixed|batch|diag|debug|future|prof|noclassgc|internalversion|check:jni|share:(?:on|off|auto|dump)|verify(?::[a-z]+)?|log(?::.*)?|loggc:.+|bootclasspath(?:\/[ap])?:.+|runjdwp:.+|dock:.+|startOnFirstThread|showSettings(?::[a-z]+)?)[0-9kKmMgGtT]*$|XX:[+-]?[A-Za-z]\w*(?:=.*)?$|(?:javaagent|agentlib|agentpath):.|verbose(?::[a-z]+)?$|[ed](?:s?a)(?::[a-z][\w$]*(?:\.[\w$]+)*(?:\.\.\.)?)?$|(?:server|client|d64|showversion)$|-(?:add-opens|add-exports|add-reads|add-modules|limit-modules|patch-module|module-path|upgrade-module-path|class-path|enable-native-access|illegal-access|enable-preview|source|release)(?:=.*)?$|(?:cp|classpath|p)$)/s;
function oCn(e){return dT(e.map((n)=>Te(n)?`; ${n.includes("=")?n.replace(/^[^=]*=/,""):""}`:n).join(" "))};
function jo(e,n){let r=yn(e);if(r===null)return nn(e,n);let s=/^-D([^=]+)=/.exec(e)[1];return Vo(e)||On(s,e.slice(s.length+3))||oCn(r)||r.some((g,h)=>nn(g,h>0?r[h-1]:null)||h+1<r.length&&!Te(r[h+1])&&ot.test(g)&&dT(`${g} ${r[h+1]}`))};
function tn(e){return yn(e.word)??[e.word]};
function yn(e){let n=/^-D[^=]+=\s*(-.*)$/s.exec(e);if(n===null)return null;return($Qe(n[1])??[]).map(_je).filter((r)=>!Tn.test(r))};
function Vo(e){let n=/^-D[^=]+=\s*(-.*)$/s.exec(e);return n!==null&&$Qe(n[1])===null};
function nn(e,n){if(Bo.test(e))return!0;let r=/^-D([^=]+)=(.+)$/s.exec(e);if(r!==null){let[,s,g]=r;if(On(s,g)||dT(g))return!0;if(Pe===!0)return B9r.test(s)||e.includes("\\")||!Jo.test(s)&&!(/^sonar\./i.test(s)&&!Otr(s)&&!/key.?store|cert|pkcs|p12|pfx|\.pem$/i.test(s))&&rn(g);return!1}if(dT(e))return!0;if(Pe===!0)return!Yo.test(e)&&!(n!==null&&Rn.test(n))&&rn(e);return!1};
function rn(e){return/[\\/]|^[@~]/.test(e)};
var Yo=/^-(?:X|XX:|javaagent:|agentlib:|agentpath:|verbose|ea\b|da\b|esa$|dsa$|server$|client$|d64$|showversion$|-(?:add-opens|add-exports|add-reads|add-modules|limit-modules|patch-module|module-path|upgrade-module-path|class-path|enable-native-access|illegal-access|enable-preview|source|release)\b|(?:cp|classpath|p)$)/;
var Rn=/^-(?:-(?:add-opens|add-exports|add-reads|add-modules|limit-modules|patch-module|module-path|upgrade-module-path|class-path|enable-native-access|source|release)|cp|classpath|p)$/;
var Jo=/^(?:javax\.net\.ssl\.trustStore|java\.io\.tmpdir|java\.security\.egd|java\.library\.path|jna\.library\.path|java\.class\.path|(?:https?|ftp)\.nonProxyHosts|socksNonProxyHosts|jna\.tmpdir|java\.util\.logging\.config\.file|log4j2?\.configurationFile|logback\.configurationFile|logging\.config|user\.dir|file\.encoding|maven\.multiModuleProjectDirectory|library\.jansi\.path|jansi\.tmpdir)$/i;
var U9r=["JAVA_TOOL_OPTIONS","JDK_JAVA_OPTIONS","_JAVA_OPTIONS","IBM_JAVA_OPTIONS","OPENJ9_JAVA_OPTIONS","MAVEN_OPTS","GRADLE_OPTS","MAVEN_ARGS","MAVEN_CONFIG","ANT_OPTS","ANT_ARGS","JAVA_OPTS","SBT_OPTS","JVM_OPTS","LEIN_JVM_OPTS","ES_JAVA_OPTS","SONAR_SCANNER_OPTS","SONAR_SCANNER_JAVA_OPTS"];
function sCn(e){return e.toUpperCase().replace(/^INPUT_/,"").replace(/-/g,"_")};
var Zo=new Set(["JAVA_TOOL_OPTIONS","JDK_JAVA_OPTIONS","_JAVA_OPTIONS","IBM_JAVA_OPTIONS","OPENJ9_JAVA_OPTIONS"]);
var Pn=new Set(U9r);
var Tn=/^-D(?:(?:(?:https?|ftp)\.proxy(?:User|Password)|socksProxy(?:User|Password)|java\.net\.socks\.(?:username|password))=\S*$|[\w.-]*trust-?store-?password=changeit$)/i;
function $Qe(e){let n=[],r="",s=!1,g=0;while(g<e.length){let h=e[g];if(h===" "||h==="\t"||h===`
`||h==="\r"){if(s)n.push(r),r="",s=!1;g++;continue}if(h==="'"||h==='"'){let R=e.indexOf(h,g+1);if(R===-1)return null;r+=e.slice(g+1,R),s=!0,g=R+1;continue}r+=h,s=!0,g++}if(s)n.push(r);return n};
function Le(e){return e.replace(/([a-z0-9])([A-Z])/g,"$1_$2").replace(/([A-Z])([A-Z][a-z])/g,"$1_$2")};
var B9r=/^(?:maven\.(?:user\.settings|global\.settings|installation\.settings|project\.settings|settings\.security|repo\.local|home)|settings\.security|gradle\.user\.home|sbt\.(?:boot\.credentials|repository\.config|global\.base|ivy\.home|boot\.directory)|user\.home)$/i;
function j9r(e){if(/^-(?:show-version|strict-checksums)$/.test(e))return null;let n=/^(?:--?settings|--?global-settings|--?install-settings|--?project-settings|-gs|-is|-ps|-s)(?:=(.+))?$/.exec(e)??/^-g?s=?(.+)$/.exec(e);return n===null?null:n[1]??""};
function W9r(e){let n=/^-{1,2}(?:ivy|sbt-dir|sbt-boot)(?:=(.+))?$/.exec(e);return n===null?null:n[1]??""};
function _je(e){return e.replace(/^-J(?=-)/,"")};
function An(e){return e.replace(/^--define=/,"-D")};
function On(e,n){return In(e,n)&&!/^(?:[\\/~]|[a-z]:[\\/]|file:)/i.test(n)};
function In(e,n){let r=e.split(".").at(-1)??"";return Otr(e)&&(Qo.test(Le(e))||!/(?:user(?:name)?|id|store|file|path|dir|location|url|host|port|alias|type)$/i.test(r))&&!G9r(e,n)};
var Qo=/(?:PASSWORD|PASSWD|SECRET)S?[._-]ID$/i;
var qo=new Set(["sonar.login","sonar.token","sonar.password"]);
var ei=/^(?:projectKey|moduleKey|componentKey|ruleKey|resourceKey)$/;
var ti=new Set(["sonar.pullrequest.key"]);
function G9r(e,n){let r=e.split(".").at(-1)??"";return/^(?:\d+[a-z]{0,2}|true|false)$/i.test(n)&&!use(r.replace(/-/g,"_"))&&!it(e)};
function Otr(e){if(qo.has(e.toLowerCase()))return!0;let n=e.split(".").at(-1)??"",r=Le(n).split(/[_-]+/).filter(Boolean).map((g)=>g.toUpperCase().replace(/\d+$/,"")).filter(Boolean),s=r.at(-1);if(!s)return!1;if(/^sonar\./i.test(e)){if(s==="SECURED")return!0;if((ei.test(n)||ti.has(e.toLowerCase()))&&!it(e))return!1}if(use(n.replace(/-/g,"_"))||it(e)||rt.test(Le(e).replace(/[.-]/g,"_")))return!0;return s==="USERNAME"||s==="USER"&&r.length>1};
function it(e){let n=Le(e).toUpperCase().split(/[._-]+/).filter(Boolean),r=n.at(-1)??"",s=n.at(-2)??"";return n.slice(0,-1).some((g)=>ni.test(g))&&(!ri.test(r)||/^IDS?$/.test(r)&&/^(?:PASSWORDS?|PASSWD|SECRETS?)$/.test(s))};
var ni=/^(?:PASSWORDS?|PASSWD|PASSPHRASE|SECRETS?|TOKENS?|KEYS?|APIKEY|CREDENTIALS?)$/;
var ri=/^(?:USER(?:NAME)?|ID|IDS|STORE|FILE|FILES|PATH|PATHS|DIR|DIRECTORY|LOCATION|URL|URI|HOST|PORT|ALIAS|TYPE|PREFERENCE|SCHEMES?|ENABLED?|DISABLED?|MODE|CLASS|PROVIDER|ALGORITHM|FORMAT|LENGTH|SIZE|BITS|TIMEOUT|TTL|HEADER|NAME|NAMES|PREFIX|SUFFIX|VERSION|ENCODING|POLICY|COUNT|CACHE|SERVICE|ENDPOINT|REGION|SCOPE|SCOPES|AUDIENCE|ISSUER|EXPIRY|EXPIRATION|ROTATION|REQUIRED|OPTIONAL|SECONDS?|SECS?|MS|MILLIS(?:ECONDS)?|MINUTES?|MINS?|HOURS?|DAYS?|AGE|CAPACITY|RATE|INTERVAL|DELAY|PERIOD|DURATION|VALIDITY|LIFETIME|WINDOW|MAX|MIN|LIMIT|THRESHOLD|BUDGET|RETRY|RETRIES|ATTEMPTS)$/;
function use(e){let n=e.replace(oi,"").replace(/-/g,"_");return(en.test(n)||en.test(gn(n))||F9r(n)||azt.test(n))&&!xo.test(e)};
var oi=/^AUTH0_/i;
var Cn=["BUILD","LOCAL","MIRROR","PATH","WITH","WITHOUT","CACHE","DISABLE","IGNORE","ONLY"];
var si="(?:[A-Za-z0-9]+(?:___[A-Za-z0-9]+)*__)+[A-Za-z]{2,}";
var azt=new RegExp(`^(?:INPUT_)?BUNDLE_(?!(?:${Cn.join("|")})__(?!${si}$))\\w*__`,"i");
var ci=new Set(["CLAUDE_CODE_CLIENT_KEY","CLAUDE_CODE_API_KEY_HELPER_TTL_MS","CLAUDE_CODE_PROXY_AUTH_HELPER_TTL_MS","CLAUDE_CODE_ENABLE_PROXY_AUTH_HELPER","CLAUDE_CODE_AUTH_FAIL_EXIT_MS","CLAUDE_CODE_ENABLE_TOKEN_USAGE_ATTACHMENT","CLAUDE_CODE_IDLE_TOKEN_THRESHOLD","CLAUDE_CODE_RESUME_TOKEN_THRESHOLD","CLAUDE_CODE_ARG_KEY_SHAPE"]);
var ui=/^CLAUDE_CODE_SKIP_[A-Z0-9_]+_AUTH$/;
function aCn(e){return ci.has(e)||ui.test(e)};
var n9o=new Set(["GITHUB_TOKEN","GH_TOKEN","GH_ENTERPRISE_TOKEN","GITHUB_ENTERPRISE_TOKEN"]);
var Nn=["INPUT_","ORG_GRADLE_PROJECT_","POETRY_PYPI_TOKEN_","POETRY_HTTP_BASIC_","CARGO_REGISTRIES_","CONAN_LOGIN_USERNAME_","CONAN_PASSWORD_"];
var st=["POETRY_HTTP_BASIC_","CONAN_LOGIN_USERNAME_"];
var di=new RegExp(`^(?:${Nn.join("|")})`,"i");
var pi=new RegExp(`^(?:INPUT_)?(?:${st.join("|")})`,"i");
function lzt(e){let n=e.replace(/-/g,"_");return di.test(n)&&(pi.test(n)||/USER(?:_?NAME)?_?[0-9]*$/i.test(n)||use(n))};
function dT(e){let n=e.length>we?e.slice(0,we):e,r=(g)=>{let h=g.search(/\s/),R=h===-1?g:g.slice(0,h),A=R.lastIndexOf("@");if(A===-1)return!1;let I=R.slice(0,A);if(on(I,R.slice(A+1)))return!1;return I.includes(":")||!/[/?#]/.test(I)&&fi(I)},s=n.indexOf("://");while(s!==-1){if(s>0&&/[a-z0-9+.-]/i.test(n[s-1]??"")){if(r(n.slice(s+3)))return!0}s=n.indexOf("://",s+3)}if(n.startsWith("//")&&r(n.slice(2)))return!0;return/^[^\s/@:]+:(?!\/\/)(?![\\/])[^\s@]*@[^\s/@]+/.test(n)&&!/^[a-z]:[\\/]/i.test(n)&&!_i.test(n)&&!on(n.slice(0,n.lastIndexOf("@",n.search(/\s|$/))),n.slice(n.lastIndexOf("@",n.search(/\s|$/))+1))&&!/^(?:mailto|sips?|xmpp|im|acct):/i.test(n)||hi.test(n)||Ei.test(n)||/["']?sonar\.login["']?\s*[:=]\s*["']?[^\s"',}]{8,}/.test(n)||V9r.test(n)||/\bauthorization\s*[:=]\s*["']?[a-z][a-z0-9_-]*\s+[A-Za-z0-9._~+\/=-]{8,}/i.test(n)||/\b(?:[Tt]oken|TOKEN)\s+(?=[A-Za-z0-9_~+=-]*[0-9])(?=[A-Za-z0-9_~+=-]*[A-Z])(?=([A-Za-z0-9_~+=-]{20,}))\1(?![\/.])/.test(n)||/\b(?:Bearer|Basic)\s+(?=[A-Za-z._~+\/=-]*[0-9]|(?:[A-Za-z0-9._~+\/=-]*?[a-z][A-Z](?![a-z])){2}|[A-Za-z0-9.-]*[_~+\/=])[A-Za-z0-9._~+\/=-]{8,}/.test(n)};
var we=8192;
function fi(e){return/^(?:gh[opusr]_|github_pat_|glpat-|xox[abpr]-|sk-|pk-|AKIA|eyJ|ya29\.|npm_)/.test(e)||e.length>=20&&/[0-9]/.test(e)&&/[a-z]/i.test(e)};
function on(e,n){let r=/^([a-z0-9_-]+(?:\.[a-z0-9_-]+)*):\d+([/?#].*)$/is.exec(e);if(!r)return!1;if(/[?#&]/.test(r[2]))return!0;if(Si.test(n))return!1;if(e.endsWith("/"))return!0;if(/^(?:v?\d|sha\d*:)/i.test(n))return!0;return!mi.test(n)};
var _i=/^(?:[\w.-]+(?::[\w.-]+)?@sha(?:256|384|512):[0-9a-f]{32,}|npm:(?:@[\w.-]+\/)?[\w.-]+@[\w.^~<>=*|+-]*|[a-z_][\w.-]*:[\w.-]+:v?\d[\w.+\[\](),-]*@(?:jar|war|ear|aar|apk|aab|pom|zip|tar|tgz|module|klib|exe|dll|so|dylib)?)$/i;
var Si=/^(?:localhost|[a-z0-9_-]+(?:\.[a-z0-9_-]+)*\.(?=[a-z0-9-]*[a-z])[a-z0-9-]+|[a-z0-9_.-]+(?=:\d+(?:[/?#]|$))|\d{1,3}(?:\.\d{1,3}){3}|\[[0-9a-f:.]+\])(?::\d+)?(?:[/?#]|$)/i;
var mi=/^(?:(?=[a-z0-9._-]*[a-z])[a-z0-9._-]+|\d{1,3}(?:\.\d{1,3}){3}|\[[0-9a-f:.]+\])(?::\d+)?(?:[/?#]|$)/i;
var V9r=/-----BEGIN [A-Z ]*PRIVATE KEY(?: BLOCK)?-----/;
var Ei=/https:\/\/(?:hooks\.slack\.com\/(?:services|workflows|triggers)\/|(?:ptb\.|canary\.)?discord(?:app)?\.com\/api\/webhooks\/\d+\/|[\w.-]+\.webhook\.office\.com\/webhookb2\/)[\w\/@.~-]{16,}/i;
var hi=/(?:(?:^|[;&?#,{]|\/:)\s*|\s)["']?(?!-*jobserver-auth\s*[=:])(?:[a-z0-9_.-]{0,64}(?:password|passwd|pwd|secret|token|(?:account|access|api|private|subscription)[-_]?key|signature|sig|credential)|[a-z0-9_.-]{0,63}[_.-]auth)["']?\s*[=:]\s*["']?(?!(?:true|false|none|null|yes|no|on|off|enabled|disabled|required|optional)(?:$|[;&,\s"']))[^;&,\s"']+/i;
function yi(e){let n=e.split(/\s+/).filter(Boolean),r=!1,s=n.map((A)=>{let I=A.replace(/["']/g,""),b=I.replace(/^--?[\w-]+=/,""),v=/(?:^|[=\s])--?X[= ]?([^\s=]+)=(.*)$/.exec(I),H=v??(r?/^()([^\s=-][^\s=]*)=(.*)$/.exec(I):null);if(r=/(?:^|=)--?X$/.test(I),H===null)return{bare:I,contribution:b,goes:/(?:^|[=\s])--?X\b/.test(I)&&!/(?:^|=)--?X$/.test(I)||dT(b)};let D=H.at(-2)??"",x=D.split("/").at(-1)??"",w=H.at(-1)??"",k=v===null?"":I.slice(0,v.index);return{bare:I,contribution:b,goes:In(x,w)||dT(w)||dT(D)||k!==""&&dT(k)}});for(let A=0;A<s.length;A++)for(let I=2;I<=4&&A+I<=s.length;I++){let b=s.slice(A,A+I);if(b.some((v)=>v.goes)||b.slice(1).some((v)=>v.bare.startsWith("-")))break;if(dT(b.map((v)=>v.contribution).join(" "))){for(let v of b)v.goes=!0;break}}s.forEach((A,I)=>{if(!/(?:^|=)--?X$/.test(A.bare))return;let b=s[I+1],v=b===void 0||b.goes||A.goes;if(A.goes=v,b!==void 0)b.goes=v});let g=n.map(()=>-1),h=-1,R="";if(n.forEach((A,I)=>{if(h===-1){let b=A[0];if((b==='"'||b==="'")&&!(A.length>1&&A.endsWith(b)))h=I,R=b,g[I]=h;return}if(g[I]=h,A.endsWith(R))h=-1}),h!==-1)s.forEach((A,I)=>{if(g[I]===h)A.goes=!0});if(s.forEach((A,I)=>{if(A.goes&&g[I]!==-1)s.forEach((b,v)=>{if(g[v]===g[I])b.goes=!0})}),s.every((A)=>!A.goes))return e;return n.filter((A,I)=>!s[I].goes&&(g[I]!==-1||En.test(A))).join(" ")};
function p8r(){return SXr(M())};
return {Oo,Io,FQe,Itr,Pe,Do,qt,yje,L9r,N9r,rt,F9r,pn,gn,fn,_n,Sn,mn,en,xo,ko,xSt,Uo,$9r,izt,En,$o,ot,Go,Wo,Ko,Bo,Te,zo,oCn,jo,tn,yn,Vo,nn,rn,Yo,Rn,Jo,U9r,sCn,Zo,Pn,Tn,$Qe,Le,B9r,j9r,W9r,_je,An,On,In,Qo,qo,ei,ti,G9r,Otr,it,ni,ri,use,oi,Cn,si,azt,ci,ui,aCn,n9o,Nn,st,di,pi,lzt,dT,we,fi,on,_i,Si,mi,V9r,Ei,hi,yi,p8r};
}
function module44(imports){
const V=imports["V"];
const Me=imports["Me"];
const L=imports["L"];
const U=imports["U"];
var n=new Set(["hipaa"]);
class o{latched=new Set;latchedTaints=[];taints=[];current=[];changed=Me();verdict=void 0;replaceTaints(e){this.current=L(e).sort();for(let r of e)if(n.has(r))this.latched.add(r);if(this.latched.size!==this.latchedTaints.length)this.latchedTaints=Array.from(this.latched).sort();return this.refreshEffectiveTaints()}latchTaints(e){let r=!1;for(let i of e)if(n.has(i)&&!this.latched.has(i))this.latched.add(i),r=!0;if(!r)return!1;return this.latchedTaints=Array.from(this.latched).sort(),this.refreshEffectiveTaints()}refreshEffectiveTaints(){let e=L([...this.latchedTaints,...this.current]).sort();if(e.length===this.taints.length&&e.every((r,i)=>r===this.taints[i]))return!1;return this.taints=e,this.changed.emit(this.taints),!0}registerVerdict(e){this.verdict=e}resetForTesting(){this.latched.clear(),this.latchedTaints=[],this.taints=[],this.current=[]}};
var a=new V(()=>new o);
function t(){return a.of(U().host)};
function ol(e){return t().taints.includes(e)};
return {n,o,a,t,ol};
}
function module45(imports){
const Pzt=imports["Pzt"];
const Awe=imports["Awe"];
const Pje=imports["Pje"];
const s9r=imports["s9r"];
const ol=imports["ol"];
const V=imports["V"];
const U=imports["U"];
const t=imports["t"];
const N9r=imports["N9r"];
const C=imports["C"];
const Le=imports["Le"];
const gs=imports["gs"];
const xSt=imports["xSt"];
const use=imports["use"];
const n9o=imports["n9o"];
const aCn=imports["aCn"];
var NGt="ssh-placeholder";
var SQe=["CLAUDE_BG_DISPATCHER_SUBSCRIPTION_TYPE","CLAUDE_BG_DISPATCHER_RATE_LIMIT_TIER"];
var ije=["CLAUDE_CODE_SESSION_KIND","CLAUDE_BG_SOURCE","CLAUDE_BG_ISOLATION","CLAUDE_BG_BACKEND","CLAUDE_CODE_SESSION_NAME","CLAUDE_CODE_RESUME_INTERRUPTED_TURN","CLAUDE_CODE_RESUME_INTERRUPTED_TURN_MAX_AGE_MS","CLAUDE_CODE_RESUME_PROMPT","CLAUDE_CODE_RESUME_REASON","CLAUDE_CODE_RESUME_SOURCE_ALIVE","CLAUDE_BG_POST_CLEAR_RESPAWN","CLAUDE_BG_SESSION_PERMISSION_RULES","CLAUDE_BG_MEMORY_TOGGLED_OFF","CLAUDE_BG_AUTO_MEMORY_OFF","CLAUDE_BG_WORKSPACE_TRUSTED","CLAUDE_CODE_RELAUNCH_HOME_TRUST",...SQe];
class Te{getAgentProxyEnv=void 0;getGhStandinDir=void 0;settingsColorEnv={};hipaaTierNoticeGiven=!1};
var T=new V(()=>new Te);
function Pd(){let e=C.scrubEnabledLatched;if(e!==void 0)return e;let r=Le(process.env.CLAUDE_CODE_SUBPROCESS_ENV_SCRUB);return C.setScrubEnabledLatched(r),r};
function Yer(){if(Pd())return!0;if(gs(process.env.CLAUDE_CODE_SUBPROCESS_ENV_SCRUB))return!1;return process.env.CLAUDE_CODE_ENTRYPOINT==="local-agent"};
function Jer(e){return e.startsWith("CLAUDE_CODE_ARTIFACT")&&e.endsWith("_BASE_URL")};
function Qer(e){let r=e.toUpperCase();return!xSt(e)&&use(e)&&!n9o.has(r)&&!aCn(r)};
function Zer(){if(!Tvn())return[];let e=T.of(U().host);if(!e.hipaaTierNoticeGiven)e.hipaaTierNoticeGiven=!0,t("HIPAA: withholding this CLI's Anthropic credentials from child processes and config ${VAR} expansion");return N9r};
function Tvn(){return ol("hipaa")};
function FGt(e){let r=e.replace(/^INPUT_/,"");return Jer(r)||Awe(r)||r.startsWith("OTEL_")||r==="CLAUDE_CODE_OTEL_DIAG_STDERR"};
function etr(){let e=process.env,r=(s)=>e.ANTHROPIC_UNIX_SOCKET!==void 0&&(s==="CLAUDE_CODE_OAUTH_TOKEN"||s==="ANTHROPIC_API_KEY")&&e[s]===NGt,n=(s)=>!Object.keys(e).some((i)=>i!==s&&i.toUpperCase()===s);return[...Pzt.filter((s)=>!r(s)),...Object.keys(e).filter((s)=>FGt(s.toUpperCase())),...Pje(e),...s9r(),...Zer().filter((s)=>!(r(s)&&n(s))),"CLAUDE_CODE_SUBSCRIPTION_TYPE","CLAUDE_CODE_RATE_LIMIT_TIER","CLAUDE_CODE_PLUGIN_ATTRIBUTION","CLAUDE_CODE_SKILL_ATTRIBUTION","CLAUDE_CODE_BRIDGE_CHILD_AUTO_DEFAULT","CLAUDE_CODE_BRIDGE_CHILD_ARTIFACT","CLAUDE_CODE_BRIDGE_CHILD_MACHINE_SETTINGS","CLAUDE_CODE_CONFIG_PROBE","CLAUDE_CODE_HOST_PROMPT_SUPERSEDES_RECORD","CLAUDE_CODE_MCP_SERVE_SETTINGS",...ije]};
return {NGt,SQe,ije,Te,T,Pd,Yer,Jer,Qer,Zer,Tvn,FGt,etr};
}
function module46(imports){

function Rrr(e){let{no_proxy:n,NO_PROXY:r}=e;if(n&&r&&n!==r)return`${n},${r}`;return n||r};
function j0e(e=process.env){if(e.no_proxy==="*"||e.NO_PROXY==="*")return"*";return Rrr(e)};
return {Rrr,j0e};
}
function module47(imports){
const St=imports["St"];
var l=/(^|\.)(anthropic\.com|claude\.ai|claude\.com)$/i;
function E(e){let t,r=e.startsWith("//")?`https:${e}`:e;try{t=new URL(r).hostname}catch{t=e.match(/^[^/:]+/)?.[0]??e}return t.endsWith(".")?t.slice(0,-1):t};
function $0e(e){return l.test(E(e))};
function Cfe(){return};
function c(e,t){for(let r of[e,t?.baseURL])if(r&&$0e(r))throw Error(`externalHttp: ${r} is Anthropic-operated. Use firstPartyApi from `+"src/services/http/firstParty \u2014 it enforces the 3P data-residency gate.")};
var sa={get(e,t){return c(e,t),Cfe(),St.get(e,t)},head(e,t){return c(e,t),Cfe(),St.head(e,t)},post(e,t,r){return c(e,r),Cfe(),St.post(e,t,r)},put(e,t,r){return c(e,r),Cfe(),St.put(e,t,r)},patch(e,t,r){return c(e,r),Cfe(),St.patch(e,t,r)},delete(e,t){return c(e,t),Cfe(),St.delete(e,t)}};
return {l,E,$0e,Cfe,c,sa};
}
function module48(imports){
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
function module49(imports){

var t;
function F(){return t===!0};
return {t,F};
}
function module50(imports){
const is=imports["is"];
const u=imports["u"];
const R=imports["R"];
function o(){return process.env.CLAUDE_CONFIG_DIR};
var we=is(()=>(o()??u(R(),".claude")).normalize("NFC"),o);
return {o,we};
}
function module51(imports){

var l=String.fromCharCode(0);
var p=/^\.[0-9a-f]{16}\.aside$/;
function pqt(e){if(e.charCodeAt(0)!==46)return!1;return FK(e).some((n)=>p.test(n))};
function u(e){return typeof e==="string"&&/^[. ]+$/.test(e)};
function Xn(e){return!(typeof e!=="string"||e.length===0||u(e)||e.includes("/")||e.includes("\\")||e.includes(l)||pqt(e))};
function Xx(e){return e.length>0&&e.every(Xn)};
function FK(e){let n=s.get(e);if(n!==void 0)return n;let a=Object.freeze(m(e));if(s.size>=d)s.clear();return s.set(e,a),a};
function m(e){let n=e.toLowerCase(),a=n.indexOf(":");return a===-1?[i(n)]:[i(n),i(n.slice(0,a))]};
var s=new Map;
var d=32768;
function i(e){let n=e.length;while(n>0){let a=e.charCodeAt(n-1);if(a!==46&&a!==32)break;n-=1}return n===e.length?e:e.slice(0,n)};
return {l,p,pqt,u,Xn,Xx,FK,m,s,d,i};
}
function module52(imports){
const S=imports["S"];
const we=imports["we"];
const de=imports["de"];
const A=imports["A"];
const ce=imports["ce"];
const Xx=imports["Xx"];
const a=imports["a"];
const Hd=imports["Hd"];
const R=imports["R"];
const z3t=imports["z3t"];
function H(){return S(we(),"plugins","cache")};
function z(e,r){let n=H();if(r!==n)return null;let i=de(n,e);if(i===""||i===".."||i.startsWith(`..${A}`)||ce(i))return null;let s=i.split(A);return S(n,...s)===e?s:null};
function G(e){return e.endsWith(".zip")};
function vG(e,r){let n=z(e,r);if(n===null||n.length!==3||!Xx(n)||G(n[2]))return null;let[i,s,d]=n;return{marketplace:i,plugin:s,version:d}};
var pe="plugins";
var V="cowork_plugins";
function Y(){if(z3t())return V;if(a.CLAUDE_CODE_USE_COWORK_PLUGINS)return V;return pe};
function Fa(){let e=a.CLAUDE_CODE_PLUGIN_CACHE_DIR;if(e)return Hd(e);return R(we(),Y())};
return {H,z,G,vG,pe,V,Y,Fa};
}
function module53(imports){
const R=imports["R"];
const P=imports["P"];
const Ee=imports["Ee"];
const Fa=imports["Fa"];
var wBt="cache";
function Lv(){return P(Ee(),Fa())};
function x9(){return R(Lv(),wBt)};
return {wBt,Lv,x9};
}
function module54(imports){

var R=typeof performance==="object"&&performance&&typeof performance.now==="function"?performance:Date;
var D=new Set;
var x=typeof process==="object"&&!!process?process:{};
var L=(e,i,s,n)=>{typeof x.emitWarning==="function"?x.emitWarning(e,i,s,n):console.error(`[${s}] ${i}: ${e}`)};
var {AbortController:O,AbortSignal:M}=globalThis;
var I=(e)=>!D.has(e);
var z=(e)=>e&&e===Math.floor(e)&&e>0&&isFinite(e);
var k=(e)=>!z(e)?null:e<=Math.pow(2,8)?Uint8Array:e<=Math.pow(2,16)?Uint16Array:e<=Math.pow(2,32)?Uint32Array:e<=Number.MAX_SAFE_INTEGER?T:null;
class T extends Array{constructor(e){super(e);this.fill(0)}};
class F{heap;length;static#l=!1;static create(e){let i=k(e);if(!i)return[];F.#l=!0;let s=new F(e,i);return F.#l=!1,s}constructor(e,i){if(!F.#l)throw TypeError("instantiate Stack using Stack.create(n)");this.heap=new i(e),this.length=0}push(e){this.heap[this.length++]=e}pop(){return this.heap[--this.length]}};
class hd{#l;#c;#m;#p;#C;#x;ttl;ttlResolution;ttlAutopurge;updateAgeOnGet;updateAgeOnHas;allowStale;noDisposeOnSet;noUpdateTTL;maxEntrySize;sizeCalculation;noDeleteOnFetchRejection;noDeleteOnStaleGet;allowStaleOnFetchAbort;allowStaleOnFetchRejection;ignoreFetchAbort;#n;#w;#s;#i;#t;#a;#u;#o;#r;#S;#h;#y;#b;#d;#_;#F;#f;static unsafeExposeInternals(e){return{starts:e.#b,ttls:e.#d,sizes:e.#y,keyMap:e.#s,keyList:e.#i,valList:e.#t,next:e.#a,prev:e.#u,get head(){return e.#o},get tail(){return e.#r},free:e.#S,isBackgroundFetch:(i)=>e.#e(i),backgroundFetch:(i,s,n,r)=>e.#D(i,s,n,r),moveToTail:(i)=>e.#O(i),indexes:(i)=>e.#A(i),rindexes:(i)=>e.#v(i),isStale:(i)=>e.#g(i)}}get max(){return this.#l}get maxSize(){return this.#c}get calculatedSize(){return this.#w}get size(){return this.#n}get fetchMethod(){return this.#C}get memoMethod(){return this.#x}get dispose(){return this.#m}get disposeAfter(){return this.#p}constructor(e){let{max:i=0,ttl:s,ttlResolution:n=1,ttlAutopurge:r,updateAgeOnGet:h,updateAgeOnHas:l,allowStale:o,dispose:a,disposeAfter:f,noDisposeOnSet:d,noUpdateTTL:g,maxSize:u=0,maxEntrySize:w=0,sizeCalculation:m,fetchMethod:y,memoMethod:c,noDeleteOnFetchRejection:S,noDeleteOnStaleGet:A,allowStaleOnFetchRejection:p,allowStaleOnFetchAbort:b,ignoreFetchAbort:E}=e;if(i!==0&&!z(i))throw TypeError("max option must be a nonnegative integer");let v=i?k(i):Array;if(!v)throw Error("invalid max value: "+i);if(this.#l=i,this.#c=u,this.maxEntrySize=w||this.#c,this.sizeCalculation=m,this.sizeCalculation){if(!this.#c&&!this.maxEntrySize)throw TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");if(typeof this.sizeCalculation!=="function")throw TypeError("sizeCalculation set to non-function")}if(c!==void 0&&typeof c!=="function")throw TypeError("memoMethod must be a function if defined");if(this.#x=c,y!==void 0&&typeof y!=="function")throw TypeError("fetchMethod must be a function if specified");if(this.#C=y,this.#F=!!y,this.#s=new Map,this.#i=Array(i).fill(void 0),this.#t=Array(i).fill(void 0),this.#a=new v(i),this.#u=new v(i),this.#o=0,this.#r=0,this.#S=F.create(i),this.#n=0,this.#w=0,typeof a==="function")this.#m=a;if(typeof f==="function")this.#p=f,this.#h=[];else this.#p=void 0,this.#h=void 0;if(this.#_=!!this.#m,this.#f=!!this.#p,this.noDisposeOnSet=!!d,this.noUpdateTTL=!!g,this.noDeleteOnFetchRejection=!!S,this.allowStaleOnFetchRejection=!!p,this.allowStaleOnFetchAbort=!!b,this.ignoreFetchAbort=!!E,this.maxEntrySize!==0){if(this.#c!==0){if(!z(this.#c))throw TypeError("maxSize must be a positive integer if specified")}if(!z(this.maxEntrySize))throw TypeError("maxEntrySize must be a positive integer if specified");this.#N()}if(this.allowStale=!!o,this.noDeleteOnStaleGet=!!A,this.updateAgeOnGet=!!h,this.updateAgeOnHas=!!l,this.ttlResolution=z(n)||n===0?n:1,this.ttlAutopurge=!!r,this.ttl=s||0,this.ttl){if(!z(this.ttl))throw TypeError("ttl must be a positive integer if specified");this.#L()}if(this.#l===0&&this.ttl===0&&this.#c===0)throw TypeError("At least one of max, maxSize, or ttl is required");if(!this.ttlAutopurge&&!this.#l&&!this.#c){if(I("LRU_CACHE_UNBOUNDED"))D.add("LRU_CACHE_UNBOUNDED"),L("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.","UnboundedCacheWarning","LRU_CACHE_UNBOUNDED",hd)}}getRemainingTTL(e){return this.#s.has(e)?1/0:0}#L(){let e=new T(this.#l),i=new T(this.#l);this.#d=e,this.#b=i,this.#k=(r,h,l=R.now())=>{if(i[r]=h!==0?l:0,e[r]=h,h!==0&&this.ttlAutopurge){let o=setTimeout(()=>{if(this.#g(r))this.#z(this.#i[r],"expire")},h+1);if(o.unref)o.unref()}},this.#E=(r)=>{i[r]=e[r]!==0?R.now():0},this.#R=(r,h)=>{if(e[h]){let l=e[h],o=i[h];if(!l||!o)return;r.ttl=l,r.start=o,r.now=s||n();let a=r.now-o;r.remainingTTL=l-a}};let s=0,n=()=>{let r=R.now();if(this.ttlResolution>0){s=r;let h=setTimeout(()=>s=0,this.ttlResolution);if(h.unref)h.unref()}return r};this.getRemainingTTL=(r)=>{let h=this.#s.get(r);if(h===void 0)return 0;let l=e[h],o=i[h];if(!l||!o)return 1/0;let a=(s||n())-o;return l-a},this.#g=(r)=>{let h=i[r],l=e[r];return!!l&&!!h&&(s||n())-h>l}}#E=()=>{};#R=()=>{};#k=()=>{};#g=()=>!1;#N(){let e=new T(this.#l);this.#w=0,this.#y=e,this.#T=(i)=>{this.#w-=e[i],e[i]=0},this.#P=(i,s,n,r)=>{if(this.#e(s))return 0;if(!z(n))if(r){if(typeof r!=="function")throw TypeError("sizeCalculation must be a function");if(n=r(s,i),!z(n))throw TypeError("sizeCalculation return invalid (expect positive integer)")}else throw TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");return n},this.#W=(i,s,n)=>{if(e[i]=s,this.#c){let r=this.#c-e[i];while(this.#w>r)this.#M(!0)}if(this.#w+=e[i],n)n.entrySize=s,n.totalCalculatedSize=this.#w}}#T=(e)=>{};#W=(e,i,s)=>{};#P=(e,i,s,n)=>{if(s||n)throw TypeError("cannot set size without setting maxSize or maxEntrySize on cache");return 0};*#A({allowStale:e=this.allowStale}={}){if(this.#n)for(let i=this.#r;;){if(!this.#U(i))break;if(e||!this.#g(i))yield i;if(i===this.#o)break;else i=this.#u[i]}}*#v({allowStale:e=this.allowStale}={}){if(this.#n)for(let i=this.#o;;){if(!this.#U(i))break;if(e||!this.#g(i))yield i;if(i===this.#r)break;else i=this.#a[i]}}#U(e){return e!==void 0&&this.#s.get(this.#i[e])===e}*entries(){for(let e of this.#A())if(this.#t[e]!==void 0&&this.#i[e]!==void 0&&!this.#e(this.#t[e]))yield[this.#i[e],this.#t[e]]}*rentries(){for(let e of this.#v())if(this.#t[e]!==void 0&&this.#i[e]!==void 0&&!this.#e(this.#t[e]))yield[this.#i[e],this.#t[e]]}*keys(){for(let e of this.#A()){let i=this.#i[e];if(i!==void 0&&!this.#e(this.#t[e]))yield i}}*rkeys(){for(let e of this.#v()){let i=this.#i[e];if(i!==void 0&&!this.#e(this.#t[e]))yield i}}*values(){for(let e of this.#A())if(this.#t[e]!==void 0&&!this.#e(this.#t[e]))yield this.#t[e]}*rvalues(){for(let e of this.#v())if(this.#t[e]!==void 0&&!this.#e(this.#t[e]))yield this.#t[e]}[Symbol.iterator](){return this.entries()}[Symbol.toStringTag]="LRUCache";find(e,i={}){for(let s of this.#A()){let n=this.#t[s],r=this.#e(n)?n.__staleWhileFetching:n;if(r===void 0)continue;if(e(r,this.#i[s],this))return this.get(this.#i[s],i)}}forEach(e,i=this){for(let s of this.#A()){let n=this.#t[s],r=this.#e(n)?n.__staleWhileFetching:n;if(r===void 0)continue;e.call(i,r,this.#i[s],this)}}rforEach(e,i=this){for(let s of this.#v()){let n=this.#t[s],r=this.#e(n)?n.__staleWhileFetching:n;if(r===void 0)continue;e.call(i,r,this.#i[s],this)}}purgeStale(){let e=!1;for(let i of this.#v({allowStale:!0}))if(this.#g(i))this.#z(this.#i[i],"expire"),e=!0;return e}info(e){let i=this.#s.get(e);if(i===void 0)return;let s=this.#t[i],n=this.#e(s)?s.__staleWhileFetching:s;if(n===void 0)return;let r={value:n};if(this.#d&&this.#b){let h=this.#d[i],l=this.#b[i];if(h&&l){let o=h-(R.now()-l);r.ttl=o,r.start=Date.now()}}if(this.#y)r.size=this.#y[i];return r}dump(){let e=[];for(let i of this.#A({allowStale:!0})){let s=this.#i[i],n=this.#t[i],r=this.#e(n)?n.__staleWhileFetching:n;if(r===void 0||s===void 0)continue;let h={value:r};if(this.#d&&this.#b){h.ttl=this.#d[i];let l=R.now()-this.#b[i];h.start=Math.floor(Date.now()-l)}if(this.#y)h.size=this.#y[i];e.unshift([s,h])}return e}load(e){this.clear();for(let[i,s]of e){if(s.start){let n=Date.now()-s.start;s.start=R.now()-n}this.set(i,s.value,s)}}set(e,i,s={}){if(i===void 0)return this.delete(e),this;let{ttl:n=this.ttl,start:r,noDisposeOnSet:h=this.noDisposeOnSet,sizeCalculation:l=this.sizeCalculation,status:o}=s,{noUpdateTTL:a=this.noUpdateTTL}=s,f=this.#P(e,i,s.size||0,l);if(this.maxEntrySize&&f>this.maxEntrySize){if(o)o.set="miss",o.maxEntrySizeExceeded=!0;return this.#z(e,"set"),this}let d=this.#n===0?void 0:this.#s.get(e);if(d===void 0){if(d=this.#n===0?this.#r:this.#S.length!==0?this.#S.pop():this.#n===this.#l?this.#M(!1):this.#n,this.#i[d]=e,this.#t[d]=i,this.#s.set(e,d),this.#a[this.#r]=d,this.#u[d]=this.#r,this.#r=d,this.#n++,this.#W(d,f,o),o)o.set="add";a=!1}else{this.#O(d);let g=this.#t[d];if(i!==g){if(this.#F&&this.#e(g)){g.__abortController.abort(Error("replaced"));let{__staleWhileFetching:u}=g;if(u!==void 0&&!h){if(this.#_)this.#m?.(u,e,"set");if(this.#f)this.#h?.push([u,e,"set"])}}else if(!h){if(this.#_)this.#m?.(g,e,"set");if(this.#f)this.#h?.push([g,e,"set"])}if(this.#T(d),this.#W(d,f,o),this.#t[d]=i,o){o.set="replace";let u=g&&this.#e(g)?g.__staleWhileFetching:g;if(u!==void 0)o.oldValue=u}}else if(o)o.set="update"}if(n!==0&&!this.#d)this.#L();if(this.#d){if(!a)this.#k(d,n,r);if(o)this.#R(o,d)}if(!h&&this.#f&&this.#h){let g=this.#h,u;while(u=g?.shift())this.#p?.(...u)}return this}pop(){try{while(this.#n){let e=this.#t[this.#o];if(this.#M(!0),this.#e(e)){if(e.__staleWhileFetching)return e.__staleWhileFetching}else if(e!==void 0)return e}}finally{if(this.#f&&this.#h){let e=this.#h,i;while(i=e?.shift())this.#p?.(...i)}}}#M(e){let i=this.#o,s=this.#i[i],n=this.#t[i];if(this.#F&&this.#e(n))n.__abortController.abort(Error("evicted"));else if(this.#_||this.#f){if(this.#_)this.#m?.(n,s,"evict");if(this.#f)this.#h?.push([n,s,"evict"])}if(this.#T(i),e)this.#i[i]=void 0,this.#t[i]=void 0,this.#S.push(i);if(this.#n===1)this.#o=this.#r=0,this.#S.length=0;else this.#o=this.#a[i];return this.#s.delete(s),this.#n--,i}has(e,i={}){let{updateAgeOnHas:s=this.updateAgeOnHas,status:n}=i,r=this.#s.get(e);if(r!==void 0){let h=this.#t[r];if(this.#e(h)&&h.__staleWhileFetching===void 0)return!1;if(!this.#g(r)){if(s)this.#E(r);if(n)n.has="hit",this.#R(n,r);return!0}else if(n)n.has="stale",this.#R(n,r)}else if(n)n.has="miss";return!1}peek(e,i={}){let{allowStale:s=this.allowStale}=i,n=this.#s.get(e);if(n===void 0||!s&&this.#g(n))return;let r=this.#t[n];return this.#e(r)?r.__staleWhileFetching:r}#D(e,i,s,n){let r=i===void 0?void 0:this.#t[i];if(this.#e(r))return r;let h=new O,{signal:l}=s;l?.addEventListener("abort",()=>h.abort(l.reason),{signal:h.signal});let o={signal:h.signal,options:s,context:n},a=(m,y=!1)=>{let{aborted:c}=h.signal,S=s.ignoreFetchAbort&&m!==void 0;if(s.status)if(c&&!y){if(s.status.fetchAborted=!0,s.status.fetchError=h.signal.reason,S)s.status.fetchAbortIgnored=!0}else s.status.fetchResolved=!0;if(c&&!S&&!y)return d(h.signal.reason);let A=u;if(this.#t[i]===u)if(m===void 0)if(A.__staleWhileFetching)this.#t[i]=A.__staleWhileFetching;else this.#z(e,"fetch");else{if(s.status)s.status.fetchUpdated=!0;this.set(e,m,o.options)}return m},f=(m)=>{if(s.status)s.status.fetchRejected=!0,s.status.fetchError=m;return d(m)},d=(m)=>{let{aborted:y}=h.signal,c=y&&s.allowStaleOnFetchAbort,S=c||s.allowStaleOnFetchRejection,A=S||s.noDeleteOnFetchRejection,p=u;if(this.#t[i]===u){if(!A||p.__staleWhileFetching===void 0)this.#z(e,"fetch");else if(!c)this.#t[i]=p.__staleWhileFetching}if(S){if(s.status&&p.__staleWhileFetching!==void 0)s.status.returnedStale=!0;return p.__staleWhileFetching}else if(p.__returned===p)throw m},g=(m,y)=>{let c=this.#C?.(e,r,o);if(c&&c instanceof Promise)c.then((S)=>m(S===void 0?void 0:S),y);h.signal.addEventListener("abort",()=>{if(!s.ignoreFetchAbort||s.allowStaleOnFetchAbort){if(m(void 0),s.allowStaleOnFetchAbort)m=(S)=>a(S,!0)}})};if(s.status)s.status.fetchDispatched=!0;let u=new Promise(g).then(a,f),w=Object.assign(u,{__abortController:h,__staleWhileFetching:r,__returned:void 0});if(i===void 0)this.set(e,w,{...o.options,status:void 0}),i=this.#s.get(e);else this.#t[i]=w;return w}#e(e){if(!this.#F)return!1;let i=e;return!!i&&i instanceof Promise&&i.hasOwnProperty("__staleWhileFetching")&&i.__abortController instanceof O}async fetch(e,i={}){let{allowStale:s=this.allowStale,updateAgeOnGet:n=this.updateAgeOnGet,noDeleteOnStaleGet:r=this.noDeleteOnStaleGet,ttl:h=this.ttl,noDisposeOnSet:l=this.noDisposeOnSet,size:o=0,sizeCalculation:a=this.sizeCalculation,noUpdateTTL:f=this.noUpdateTTL,noDeleteOnFetchRejection:d=this.noDeleteOnFetchRejection,allowStaleOnFetchRejection:g=this.allowStaleOnFetchRejection,ignoreFetchAbort:u=this.ignoreFetchAbort,allowStaleOnFetchAbort:w=this.allowStaleOnFetchAbort,context:m,forceRefresh:y=!1,status:c,signal:S}=i;if(!this.#F){if(c)c.fetch="get";return this.get(e,{allowStale:s,updateAgeOnGet:n,noDeleteOnStaleGet:r,status:c})}let A={allowStale:s,updateAgeOnGet:n,noDeleteOnStaleGet:r,ttl:h,noDisposeOnSet:l,size:o,sizeCalculation:a,noUpdateTTL:f,noDeleteOnFetchRejection:d,allowStaleOnFetchRejection:g,allowStaleOnFetchAbort:w,ignoreFetchAbort:u,status:c,signal:S},p=this.#s.get(e);if(p===void 0){if(c)c.fetch="miss";let b=this.#D(e,p,A,m);return b.__returned=b}else{let b=this.#t[p];if(this.#e(b)){let W=s&&b.__staleWhileFetching!==void 0;if(c){if(c.fetch="inflight",W)c.returnedStale=!0}return W?b.__staleWhileFetching:b.__returned=b}let E=this.#g(p);if(!y&&!E){if(c)c.fetch="hit";if(this.#O(p),n)this.#E(p);if(c)this.#R(c,p);return b}let v=this.#D(e,p,A,m),C=v.__staleWhileFetching!==void 0&&s;if(c){if(c.fetch=E?"stale":"refresh",C&&E)c.returnedStale=!0}return C?v.__staleWhileFetching:v.__returned=v}}async forceFetch(e,i={}){let s=await this.fetch(e,i);if(s===void 0)throw Error("fetch() returned undefined");return s}memo(e,i={}){let s=this.#x;if(!s)throw Error("no memoMethod provided to constructor");let{context:n,forceRefresh:r,...h}=i,l=this.get(e,h);if(!r&&l!==void 0)return l;let o=s(e,l,{options:h,context:n});return this.set(e,o,h),o}get(e,i={}){let{allowStale:s=this.allowStale,updateAgeOnGet:n=this.updateAgeOnGet,noDeleteOnStaleGet:r=this.noDeleteOnStaleGet,status:h}=i,l=this.#s.get(e);if(l!==void 0){let o=this.#t[l],a=this.#e(o);if(h)this.#R(h,l);if(this.#g(l)){if(h)h.get="stale";if(!a){if(!r)this.#z(e,"expire");if(h&&s)h.returnedStale=!0;return s?o:void 0}else{if(h&&s&&o.__staleWhileFetching!==void 0)h.returnedStale=!0;return s?o.__staleWhileFetching:void 0}}else{if(h)h.get="hit";if(a)return o.__staleWhileFetching;if(this.#O(l),n)this.#E(l);return o}}else if(h)h.get="miss"}#I(e,i){this.#u[i]=e,this.#a[e]=i}#O(e){if(e!==this.#r){if(e===this.#o)this.#o=this.#a[e];else this.#I(this.#u[e],this.#a[e]);this.#I(this.#r,e),this.#r=e}}delete(e){return this.#z(e,"delete")}#z(e,i){let s=!1;if(this.#n!==0){let n=this.#s.get(e);if(n!==void 0)if(s=!0,this.#n===1)this.#G(i);else{this.#T(n);let r=this.#t[n];if(this.#e(r))r.__abortController.abort(Error("deleted"));else if(this.#_||this.#f){if(this.#_)this.#m?.(r,e,i);if(this.#f)this.#h?.push([r,e,i])}if(this.#s.delete(e),this.#i[n]=void 0,this.#t[n]=void 0,n===this.#r)this.#r=this.#u[n];else if(n===this.#o)this.#o=this.#a[n];else{let h=this.#u[n];this.#a[h]=this.#a[n];let l=this.#a[n];this.#u[l]=this.#u[n]}this.#n--,this.#S.push(n)}}if(this.#f&&this.#h?.length){let n=this.#h,r;while(r=n?.shift())this.#p?.(...r)}return s}clear(){return this.#G("delete")}#G(e){for(let i of this.#v({allowStale:!0})){let s=this.#t[i];if(this.#e(s))s.__abortController.abort(Error("deleted"));else{let n=this.#i[i];if(this.#_)this.#m?.(s,n,e);if(this.#f)this.#h?.push([s,n,e])}}if(this.#s.clear(),this.#t.fill(void 0),this.#i.fill(void 0),this.#d&&this.#b)this.#d.fill(0),this.#b.fill(0);if(this.#y)this.#y.fill(0);if(this.#o=0,this.#r=0,this.#S.length=0,this.#w=0,this.#n=0,this.#f&&this.#h){let i=this.#h,s;while(s=i?.shift())this.#p?.(...s)}}};
function Qx(e,i,s=100){let n=new hd({max:s}),r=(...h)=>{let l=i(...h),o=n.get(l);if(o!==void 0)return o;let a=e(...h);return n.set(l,a),a};return r.cache={clear:()=>n.clear(),size:()=>n.size,delete:(h)=>n.delete(h),get:(h)=>n.peek(h),has:(h)=>n.has(h),set:(h,l)=>void n.set(h,l)},r};
return {R,D,x,L,O,M,I,z,k,T,F,hd,Qx};
}
function module55(imports){
const s=imports["s"];
const Qx=imports["Qx"];
function IAn(e,r){if(!s.isAbsolute(r))return;let i=s.dirname(r),n=Object.keys(e).find((l)=>l.toUpperCase()==="PATH")??"PATH",o=e[n];e[n]=o?i+s.delimiter+o:i};
function OAn(e){let r=e.trim(),i="",n=0;while(n<r.length){let o=r[n];if(o==='"'||o==="'"){let l=r.indexOf(o,n+1);if(l===-1){i+=r.slice(n+1),n=r.length;break}i+=r.slice(n+1,l),n=l+1}else if(o==="\\"&&n+1<r.length)i+=r[n+1],n+=2;else if(/\s/.test(o))break;else i+=o,n++}return i.endsWith(".sh")?`bash ${e}`:e};
var Z8=Qx((e)=>{if(e.startsWith("//"))return e.replaceAll("/","\\");let r=e.match(/^\/cygdrive\/([A-Za-z])(\/|$)/);if(r){let n=r[1].toUpperCase(),o=e.slice(("/cygdrive/"+r[1]).length);return n+":"+(o||"\\").replaceAll("/","\\")}let i=e.match(/^\/([A-Za-z])(\/|$)/);if(i){let n=i[1].toUpperCase(),o=e.slice(2);return n+":"+(o||"\\").replaceAll("/","\\")}return e.replaceAll("/","\\")},(e)=>e,500);
return {IAn,OAn,Z8};
}
function module56(imports){

function Ur(r){return r.map((t)=>{let n=String(t);if(n==="")return"''";if(/^[A-Za-z0-9_./:=@+,-]+$/.test(n))return n;return"'"+n.replaceAll("'",`'"'"'`)+"'"}).join(" ")};
return {Ur};
}
function module57(imports){

var y9n="io.modelcontextprotocol/tasks";
return {y9n};
}
function module58(imports){
const k=imports["k"];
function IE(){return k("tengu_mcp_tasks",!1)};
return {IE};
}
function module59(imports){
// Local C mandatory hook confinement port; original raw module remains immutable.
const mandatoryProcessWrapper=imports["mandatoryProcessWrapper"];
const Dr=imports["Dr"];
const oS=imports["oS"];
const SJn=imports["SJn"];
const dd=imports["dd"];
const di=imports["di"];
const en=imports["en"];
const Ex=imports["Ex"];
const Jo=imports["Jo"];
const S0=imports["S0"];
const nJn=imports["nJn"];
const Wb=imports["Wb"];
const t=imports["t"];
const qH=imports["qH"];
const d1t=imports["d1t"];
const Dir=imports["Dir"];
const el=imports["el"];
const Gd=imports["Gd"];
const fto=imports["fto"];
const c=imports["c"];
const G=imports["G"];
const i=imports["i"];
const ad=imports["ad"];
const S=imports["S"];
const an=imports["an"];
const S_t=imports["S_t"];
const _=imports["_"];
const d=imports["d"];
const m=imports["m"];
const BWe=imports["BWe"];
const a=imports["a"];
const k=imports["k"];
const uF=imports["uF"];
const dF=imports["dF"];
const ne=imports["ne"];
const I6o=imports["I6o"];
const P6o=imports["P6o"];
const aH=imports["aH"];
const _s=imports["_s"];
const VS=imports["VS"];
const d_e=imports["d_e"];
const y0=imports["y0"];
const Zve=imports["Zve"];
const V=imports["V"];
const U=imports["U"];
const at=imports["at"];
const Hl=imports["Hl"];
const HHo=imports["HHo"];
const dS=imports["dS"];
const eNt=imports["eNt"];
const Ja=imports["Ja"];
const ee=imports["ee"];
const Ts=imports["Ts"];
const wO=imports["wO"];
const cZ=imports["cZ"];
const WMr=imports["WMr"];
const pqn=imports["pqn"];
const wdn=imports["wdn"];
const GN=imports["GN"];
const dZ=imports["dZ"];
const l=imports["l"];
const Hce=imports["Hce"];
const ys=imports["ys"];
const tt=imports["tt"];
const BAn=imports["BAn"];
const p8r=imports["p8r"];
const etr=imports["etr"];
const yje=imports["yje"];
const Ko=imports["Ko"];
const Pzt=imports["Pzt"];
const FGt=imports["FGt"];
const lzt=imports["lzt"];
const azt=imports["azt"];
const qF=imports["qF"];
const dT=imports["dT"];
const Yer=imports["Yer"];
const xSt=imports["xSt"];
const $9r=imports["$9r"];
const FQe=imports["FQe"];
const Qer=imports["Qer"];
const WFo=imports["WFo"];
const Hp=imports["Hp"];
const Ph=imports["Ph"];
const j0e=imports["j0e"];
const sa=imports["sa"];
const Hjt=imports["Hjt"];
const ot=imports["ot"];
const LFo=imports["LFo"];
const Van=imports["Van"];
const nLr=imports["nLr"];
const Es=imports["Es"];
const Net=imports["Net"];
const SK=imports["SK"];
const Ce=imports["Ce"];
const Oet=imports["Oet"];
const a1=imports["a1"];
const Ec=imports["Ec"];
const Y=imports["Y"];
const O$n=imports["O$n"];
const I$n=imports["I$n"];
const HWt=imports["HWt"];
const Mi=imports["Mi"];
const qi=imports["qi"];
const zt=imports["zt"];
const pD=imports["pD"];
const TOe=imports["TOe"];
const Ge=imports["Ge"];
const Tt=imports["Tt"];
const Dit=imports["Dit"];
const O=imports["O"];
const rj=imports["rj"];
const Co=imports["Co"];
const F=imports["F"];
const vG=imports["vG"];
const x9=imports["x9"];
const dc=imports["dc"];
const ik=imports["ik"];
const hpt=imports["hpt"];
const P=imports["P"];
const Mxe=imports["Mxe"];
const gpt=imports["gpt"];
const OAn=imports["OAn"];
const Ur=imports["Ur"];
const m$e=imports["m$e"];
const Vn=imports["Vn"];
const At=imports["At"];
const Tvn=imports["Tvn"];
const ft=imports["ft"];
const fn=imports["fn"];
const nZ=imports["nZ"];
const Nrt=imports["Nrt"];
const P$o=imports["P$o"];
const BWt=imports["BWt"];
const GHo=imports["GHo"];
const Sae=imports["Sae"];
const N5e=imports["N5e"];
const MA=imports["MA"];
const vK=imports["vK"];
const IAn=imports["IAn"];
const i3=imports["i3"];
const E=imports["E"];
const Z8=imports["Z8"];
const D$n=imports["D$n"];
const Mr=imports["Mr"];
const nJ=imports["nJ"];
const lt=imports["lt"];
const zne=imports["zne"];
const H$n=imports["H$n"];
const Iut=imports["Iut"];
const p=imports["p"];
const y=imports["y"];
const Rv=imports["Rv"];
const L=imports["L"];
const Un=imports["Un"];
const Tg=imports["Tg"];
const _z=imports["_z"];
const aJ=imports["aJ"];
const y9n=imports["y9n"];
const IE=imports["IE"];
const BP=imports["BP"];
var I7e=/^[ \t]*<claude-code-hint[ \t]([^>\r\n]*)\/>[ \t]*$/gm;
function Ihe(e){if(!e.includes("<claude-code-hint"))return e;return e.replace(I7e,"").replace(/\n{3,}/g,`

`)};
var iwn=["CLAUDE_CODE_OAUTH_REFRESH_TOKEN","CLAUDE_SESSION_INGRESS_TOKEN_FILE","CLAUDE_CODE_HOST_CREDS_FILE","CLAUDE_CODE_MESSAGING_TOKEN","MCP_CLIENT_SECRET","MCP_XAA_IDP_CLIENT_SECRET","ENVIRONMENT_SERVICE_KEY","SELF_HOSTED_RUNNER_POOL_SECRET","SELF_HOSTED_RUNNER_ENVIRONMENT_SECRET"];
var RQe=iwn.flatMap((e)=>[e,`INPUT_${e}`]);
var dwn=["AWS_CONTAINER_AUTHORIZATION_TOKEN","ANTHROPIC_IDENTITY_TOKEN","CLOUDSDK_AUTH_ACCESS_TOKEN","GOOGLE_OAUTH_ACCESS_TOKEN","AZURE_CLIENT_CERTIFICATE_PASSWORD","AZURE_PASSWORD","CLAUDE_CODE_CLIENT_KEY_PASSPHRASE","CLAUDE_CODE_CLIENT_KEY","CLAUDE_CODE_CLIENT_CERT","HTTPS_PROXY","HTTP_PROXY","ALL_PROXY","https_proxy","http_proxy","all_proxy","CARGO_REGISTRY_TOKEN","NPM_TOKEN","CODEARTIFACT_AUTH_TOKEN","PIP_INDEX_URL","PIP_EXTRA_INDEX_URL","UV_INDEX_URL","UV_EXTRA_INDEX_URL","UV_DEFAULT_INDEX","UV_INDEX","GOPROXY","GOAUTH","PYPI_TOKEN","TWINE_PASSWORD"];
var uwn=new Set(["GH_ENTERPRISE_TOKEN","GITHUB_ENTERPRISE_TOKEN","HF_TOKEN","HUGGING_FACE_HUB_TOKEN","HUGGINGFACEHUB_API_TOKEN"]);
var pwn=[...yje.filter((e)=>!uwn.has(e.replace(/^INPUT_/,""))),...dwn.flatMap((e)=>[e,`INPUT_${e}`])];
function Y_e(e){let n=e.replace(/^INPUT_/,"");return FGt(e)||/^GIT_CONFIG_(?:PARAMETERS|(?:KEY|VALUE)_\d+)$/.test(n)||/^CARGO_REGISTRIES_[A-Z0-9_]+_TOKEN$/.test(n)||lzt(n)||azt.test(n)};
var gwn=new Set(RQe.map((e)=>e.toUpperCase()));
var hwn=new Set(pwn.map((e)=>e.toUpperCase()));
function jV(){let e=new Set([...etr().map((n)=>n.toUpperCase()),...gwn]);return{plain:e,remoteSink:new Set([...e,...hwn])}};
function AQe(e,n,r){let s=e.toUpperCase();return(r??jV()).remoteSink.has(s)||Y_e(s)||X_e(s,n)||gke(e,n)};
function MQe(e){return ywn.has(e.toUpperCase())};
var ywn=new Set([...Pzt.flatMap((e)=>[e,`INPUT_${e}`]),...RQe].map((e)=>e.toUpperCase()));
var kwn=new Set([...qF.filter((e)=>e.endsWith("_BASE_URL")),"CLAUDE_CODE_API_BASE_URL"].flatMap((e)=>[e,`INPUT_${e}`]));
function X_e(e,n){return n!==void 0&&kwn.has(e)&&dT(n)};
function gke(e,n){if(!Yer())return!1;return n!==void 0&&!xSt(e)&&$9r(e,n)||FQe().length>0&&Qer(e)};
function wX(e,n,r){let s=r===void 0?[]:[r];return e===void 0||n.length===0?[...n,...s]:[e,...n,...s]};
var DT=`zzwildcard${BAn(8).toString("hex")}zz`;
function cG(e,n){if(n==="*")return!0;let r;try{r=new URL(e)}catch{return!1}let s=n.replaceAll("*",DT),g=!1,h;try{h=new URL(s)}catch{let z=s.replace(new RegExp(`:${DT}(?=[/?#]|$)`),":0");if(z!==s)try{h=new URL(z),g=!0}catch{}}if(!h){let z=`${r.protocol}//${r.host}${r.pathname}${r.search}`,K=n.replace(/[.+?^${}()|[\]\\]/g,"\\$&");return new RegExp(`^${K.replaceAll("*","[^/]*")}$`).test(z)}if(h.protocol!==`${DT}:`&&h.protocol!==r.protocol)return!1;let b=r.hostname.replace(/\.$/,"").toLowerCase(),D=h.hostname.replace(/\.$/,"").toLowerCase().replaceAll(DT,"*").replace(/[.+?^${}()|[\]\\]/g,"\\$&").replaceAll("*","[^/]*");if(!new RegExp(`^${D}$`).test(b))return!1;if(h.port===""&&h.hostname.includes(DT))g=!0;if(!g&&h.port!==r.port)return!1;if((h.pathname==="/"||h.pathname==="")&&h.search===""&&!s.endsWith("/"))return!0;let j=(h.pathname+h.search).replaceAll(DT,"*").replace(/[.+?^${}()|[\]\\]/g,"\\$&").replaceAll("*",".*");return new RegExp(`^${j}$`).test(r.pathname+r.search)};
function tnt(){return k("tengu_mcp_url_elicitation",!0)};
var UAn="io.modelcontextprotocol/ui";
var HAn="text/html;profile=mcp-app";
function Txr(){return a.CLAUDE_CODE_MCP_APPS_HOST===!0};
function jAn(){return{roots:{listChanged:!0},elicitation:{},...IE()&&{tasks:{requests:{elicitation:{create:{}}}}},...Txr()&&{extensions:{[UAn]:{mimeTypes:[HAn]}}}}};
function WAn(e){let n=e.tasks;if(!n?.requests?.elicitation)return e;let{elicitation:r,...s}=n.requests,{requests:g,...h}=n,{tasks:b,...w}=e,D={...h,...Object.keys(s).length>0&&{requests:s}};return Object.keys(D).length>0?{...w,tasks:D}:w};
function kxr(e){let{tasks:n,extensions:r,...s}=e;if(r===void 0||!(y9n in r))return r===void 0?s:{...s,extensions:r};let{[y9n]:g,...h}=r;return Object.keys(h).length>0?{...s,extensions:h}:s};
function sHt(){let e=jAn();return BP()==="v2"?GAn(WAn(e)):e};
function GAn(e){if(!IE())return e;return{...e,extensions:{...e.extensions,[y9n]:{}}}};
function Lsn(){let e=sHt();if(!tnt())return e;return{...e,elicitation:{form:{},url:{}}}};
var LT="managed";
function xQ(e,n){let r=e.lastIndexOf(" -");if(r>0){let s=e.substring(0,r),g=e.substring(r+1);return`${Ur([s])} ${g} ${Ur([n])}`}else return`${Ur([e])} ${Ur([n])}`};
function Slt(e){return{...Jo(e.base,e.omit),...e.extra}};
function XG(){let e=["-NoProfile","-NonInteractive"];if(!a.CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY)e.push("-ExecutionPolicy","Bypass");return e};
function Isn(e){return[...XG(),"-Command",e]};
var GBn=(e)=>e!=="PreToolUse"&&SJn.includes(e);
var Qrt=(e)=>GBn(e)&&dd(`classic.${e}`);
var xve=(e)=>`classic.${e}`;
function Jrt(e){if(e.behavior==="allow")return e;let{interrupt:n,...r}=e;return n===!0?{...r,interrupt:n}:r};
function Zrt(e,n){let{permissionBehavior:r,permissionRequestResult:s}=e,g=n==="PreModelSwitch"&&(r==="allow"||r==="deny"||r==="ask"),b=n==="PermissionRequest"?s:void 0;return{block:e.blockingError?.blockingError,preventContinuation:e.preventContinuation===!0||void 0,stopReason:e.stopReason,additionalContext:e.additionalContexts,permissionDecision:g?r:void 0,permissionDecisionReason:g?e.hookPermissionDecisionReason:void 0,decision:b&&Jrt(b),updatedToolOutput:e.updatedToolOutput,updatedMCPToolOutput:e.updatedMCPToolOutput,initialUserMessage:e.initialUserMessage,sessionTitle:e.sessionTitle,suppressOriginalPrompt:e.suppressOriginalPrompt===!0||void 0,watchPaths:e.watchPaths,reloadSkills:e.reloadSkills===!0||void 0,retry:e.retry===!0||void 0,displayContent:e.displayContent}};
var CR=(e)=>di(e,(n)=>n===void 0);
var est=()=>({result:{},yields:[]});
function tst(e,n){let r={allow:1,ask:2,deny:3},s=(D)=>D===void 0?0:r[D],g=s(n.permissionDecision)>s(e.permissionDecision),[h,b]=g?[n,e]:[e,n],w=h.permissionDecision===b.permissionDecision;return{permissionDecision:h.permissionDecision,permissionDecisionReason:h.permissionDecisionReason??(w?b.permissionDecisionReason:void 0)}};
function JG(e,n){let r=[...e.additionalContext??[],...n.additionalContext??[]],s=[...e.watchPaths??[],...n.watchPaths??[]];return CR({...e,...n,...tst(e,n),decision:e.decision??n.decision,additionalContext:r.length>0?r:void 0,watchPaths:s.length>0?s:void 0})};
async function nst(e,n){let r=est();for await(let s of e)r={result:JG(r.result,CR(Zrt(s,n))),yields:[...r.yields,s]};return r};
var kNn=(e)=>e.block!==void 0||e.preventContinuation===!0||e.permissionDecision==="deny"||e.decision?.behavior==="deny";
var ost=(e,n)=>({...JG(e,CR(n)),...CR(Jo(e,["additionalContext","watchPaths","permissionDecision","permissionDecisionReason","decision"]))});
function rst(e){return e.block===void 0&&e.permissionDecision==="deny"?e.permissionDecisionReason??"Blocked by hook":e.block};
function sst(e){if(e.behavior!=="allow")return e;let{updatedPermissions:n}=e;return n===void 0?e:{...e,updatedPermissions:n.map((s)=>s.type==="setMode"?{...s,mode:Tg(s.mode)}:s)}};
function ist(e){let{permissionDecision:n,permissionDecisionReason:r,decision:s}=e,g={};if(n!==void 0)g.permissionBehavior=n;if(r!==void 0)g.hookPermissionDecisionReason=r;if(s===void 0)return g;g.permissionRequestResult=sst(s),g.permissionBehavior=s.behavior==="allow"?"allow":"deny";let h=s.behavior==="allow"?s.updatedInput:void 0;if(h!==void 0)g.updatedInput=h;return g};
var ast=["updatedToolOutput","updatedMCPToolOutput","initialUserMessage","sessionTitle","suppressOriginalPrompt","watchPaths","reloadSkills","retry","displayContent"];
function ENn(e,n,r){let s=rst(e),g=ist(e);if(s!==void 0)g.blockingError=n.find((b)=>b.blockingError?.blockingError===s)?.blockingError??{blockingError:s,command:r};if(e.preventContinuation===!0)g.preventContinuation=!0;if(e.stopReason!==void 0)g.stopReason=e.stopReason;if(e.additionalContext!==void 0&&e.additionalContext.length>0)g.additionalContexts=e.additionalContext;for(let b of ast)if(e[b]!==void 0)Object.assign(g,{[b]:e[b]});return g};
var RNn=(e,n)=>({name:"core",isCore:!0,budgetMs:0,async run(r){let s=await nst(e(r,{managedHooksExcluded:!0}),r.hook_event_name);return n(s),s.result}});
var xNn=(e,n)=>({name:LT,isManaged:!0,budgetMs:0,async run(r,s){let g=await nst(e(r,{managedHooksOnly:!0}),r.hook_event_name);return n(g),kNn(g.result)?g.result:ost(g.result,await s(r))}});
function SRr({hookInput:e,managed:n,core:r,signal:s,origin:g}){let h=xve(e.hook_event_name);return Ex({e,handlers:[n,...S0(h,g),r].filter((b)=>b!==void 0),site:nJn(h),signal:s,origin:aJ(g)})};
var dst=(e)=>L(e.flatMap((n)=>{let r=["permissionDecision","permissionDecisionReason"];return r.includes(n)?r:[n]}));
var cst=(e)=>JG(e.managed?.result??{},e.core?.result??{});
function ust(e,n){let r=n==="PreModelSwitch";switch(e){case"block":return r?["blockingError"]:["blockingError","permissionBehavior","hookPermissionDecisionReason"];case"additionalContext":return["additionalContexts"];case"permissionDecision":case"permissionDecisionReason":return["permissionBehavior","hookPermissionDecisionReason"];case"decision":return["permissionRequestResult","permissionBehavior","updatedInput"];case"preventContinuation":case"stopReason":case"sessionTitle":case"suppressOriginalPrompt":case"initialUserMessage":case"watchPaths":case"reloadSkills":case"updatedToolOutput":case"updatedMCPToolOutput":case"retry":case"displayContent":return[e];default:return[]}};
function DNn(e,n,r){let s=[...n.managed?.yields??[],...n.core?.yields??[]],g=e,h=cst(n),b=L([...Object.keys(g),...Object.keys(h)]).filter((K)=>Un(g[K])!==Un(h[K]));if(b.length===0)return s;let w=new Set(b.flatMap((K)=>ust(K,r.event))),D=s.map((K)=>di(K,(he,_e)=>w.has(_e))).filter((K)=>Object.keys(K).length>0),j=ENn(_z(e,dst(b)),s,r.command);return Object.keys(j).length===0?D:[...D,j]};
async function*NNn({event:e,hookInput:n,runClassicHooks:r,managedRanAbove:s,signal:g,origin:h}){let b={};yield*DNn(await SRr({hookInput:n,managed:s?void 0:xNn(r,(w)=>{b.managed=w}),core:RNn(r,(w)=>{b.core=w}),signal:g,origin:h}),b,{event:e,command:`${xve(e)} hook`})};
var pst=(e,n)=>({command:e,succeeded:!1,output:n,blocked:!0});
function $Nn(e){return en(e).split(`
`).map((n)=>n.trim()).filter(Boolean).at(-1)??""};
function xF(e){return e.filter((n)=>n.succeeded).map((n)=>$Nn(n.output)).find((n)=>n.length>0)};
function OQ(e,n){let r=e.find((g)=>g.blocked),s=n==="WorktreeCreate";return CR({block:r?.output,worktreePath:s?xF(e):void 0})};
var mst=(e,n,r)=>({name:n.managedHooksOnly===!0?LT:"core",...n.managedHooksOnly===!0?{isManaged:!0}:{isCore:!0},budgetMs:0,async run(s,g){let h=n.managedHooksOnly===!0,b=await e.runClassicHooks(s,n);r(b);let w=OQ(b,e.event);return!h||w.block!==void 0?w:ost(w,await g(s))}});
var gst=(e,n)=>({command:e,succeeded:!0,output:n,blocked:!1});
function HNn(e,n,r){let s=OQ(e,r.event),g=n.block===s.block,h=r.event!=="WorktreeCreate"||n.worktreePath===s.worktreePath,b=e.filter((j)=>(g||!j.blocked)&&(h||xF([j])===void 0)),w=g?void 0:n.block,D=h?void 0:n.worktreePath;return[...b,...w===void 0?[]:[pst(r.command,w)],...D===void 0?[]:[gst(r.command,D)]]};
async function jNn(e){let n=xve(e.event),r=[],s=(g)=>{r.push(...g)};return HNn(r,await Ex({handlers:[mst(e,{managedHooksOnly:!0},s),...S0(n),mst(e,{managedHooksExcluded:!0},s)],e:e.hookInput,site:nJn(n),signal:e.signal}),{event:e.event,command:`${n} hook`})};
var ZNn=500;
var eFn=1e4;
var VOt=new Set([...SK,"PreModelSwitch","UserPromptSubmit","UserPromptExpansion","ConfigChange","Elicitation","ElicitationResult","PostToolBatch","TaskCreated","PreCompact"]);
async function Sst({streamsSettled:e,lastDataAt:n,holdOpen:r,quietWindowMs:s=ZNn,capMs:g=eFn,arm:h,now:b=Date.now}){let w=b(),D=e.then(()=>!0);for(;;){let j=n();if(await lt(D,s,h)||b()-w>=g)return;if(n()!==j)continue;if(r?.())continue;if(await new Promise((K)=>setImmediate(K)),n()===j)return}};
function Pve(e){let n=e.resultStdout?.trim();return n!==void 0&&n.startsWith("{")?n:void 0};
function tFn(e,n){return n!==0&&n!==2&&(e==="Elicitation"||e==="ElicitationResult")};
function qOt(e,n,r,s,g){return kst(e,n,r,s)??(tFn(n,e.status)?kst({...e,resultStdout:void 0},n,e.stderr,g(e.stderr)):void 0)};
function kst(e,n,r,s){if(e.status===2||e.aborted===!0)return;if(e.stdioIncomplete!==!0&&e.stdioClosedWithoutEnd!==!0)return;if(s!==void 0&&bst(s,n,e.status)||Pve(e)!==void 0)return;if(e.stdioClosedWithoutEnd)return"hook stdio closed before end-of-stream, so part of its output may have been discarded; refusing to read the capture as a clean verdict";if(s!==void 0)return"hook output parsed as a document that grants, rewrites or injects, but its stdio went quiet before end-of-stream and a dropped later document could have changed it; refusing to honor the suspect capture";if(r.trim().startsWith("{"))return"hook output opens a JSON payload that never completed before its stdio went quiet; refusing to read the partial capture as a verdict";return};
var nFn=new Set(["continue","suppressOutput","stopReason","decision","systemMessage","terminalSequence","reason","metrics","rewakeSummary","hookSpecificOutput"]);
var oFn=new Set(["hookEventName","permissionDecision","permissionDecisionReason","additionalContext","decision","action","content","suppressOriginalPrompt","retry"]);
function KOt(e,n){if(e!=="UserPromptSubmit"&&e!=="UserPromptExpansion")return;return{decision:"block",reason:n,hookSpecificOutput:{hookEventName:e,suppressOriginalPrompt:!0}}};
var rFn=new Set(["UserPromptSubmit","UserPromptExpansion","SessionStart","PostModelSwitch"]);
var sFn=new Set(["Stop","SubagentStop","StopFailure","TaskCompleted","TeammateIdle","PostToolUse","PostToolUseFailure"]);
function Osn(e,n,r){if(e.status===2&&(e.stdioIncomplete===!0||e.stdioClosedWithoutEnd===!0)&&r!==void 0&&!bst(r,n,e.status))return;return r};
function bst(e,n,r){if("async"in e)return!0;if(e.decision==="approve")return!1;if(e.decision==="block"&&sFn.has(n))return!1;for(let g of Object.keys(e))if(!nFn.has(g))return!1;let s=e.hookSpecificOutput;if(s===void 0)return!0;if("permissionDecision"in s&&(s.permissionDecision==="allow"||s.permissionDecision==="defer"))return!1;if("decision"in s&&s.decision.behavior==="allow")return!1;if("action"in s&&s.action==="accept")return!1;if("retry"in s&&s.retry===!0)return!1;if("additionalContext"in s&&s.additionalContext!==void 0&&!(r===0&&rFn.has(n)))return!1;for(let g of Object.keys(s))if(!oFn.has(g))return!1;return!0};
class Ait{writers=[];register(e){this.writers.push(e)}unregister(e){let n=this.writers.lastIndexOf(e);if(n>=0)this.writers.splice(n,1)}reset(){this.writers.length=0}write(e){this.writers.at(-1)?.(e)}};
var C$n=new V(()=>new Ait);
function KQ(){return C$n.of(U().host)};
function tEe(e){KQ().write(e)};
var L$n=/\.[A-Za-z][A-Za-z0-9]*$/;
var N$n=/^(?:\d*|&)[<>]/;
var F$n=/^(?:\d*|&)[<>]{1,2}$/;
function Bit({command:e,args:n,pluginRoot:r,projectDir:s,homeDir:g,windowsBash:h}){let b=n===void 0,w=b?$$n(e):[e,...n],D=[];for(let j of w){if(!L$n.test(j))continue;let z=j.replaceAll("${CLAUDE_PROJECT_DIR}",()=>s);if(r!==void 0)z=z.replaceAll("${CLAUDE_PLUGIN_ROOT}",()=>r);if(b){if(z=z.replace(/^(?:~(?=[\\/])|\$HOME\b|\$\{HOME\})/,()=>g).replace(/\$CLAUDE_PROJECT_DIR\b/g,()=>s),r!==void 0)z=z.replace(/\$CLAUDE_PLUGIN_ROOT\b/g,()=>r);if(h&&z.startsWith("/"))z=Z8(z)}if(/[$`*?[]/.test(z)||!D$n(z))continue;D.push(z)}return D};
function $$n(e){let n=[],r="",s=!1,g;for(let h=0;h<e.length;h++){let b=e[h];if(g!==void 0){if(b===g)g=void 0;else r+=b;continue}if(b==='"'||b==="'")g=b,s=!0;else if(b==="\\"&&h+1<e.length)r+=e[++h],s=!0;else if(/\s/.test(b)){if(s)n.push(r),r="",s=!1}else r+=b,s=!0}if(s)n.push(r);return n.filter((h,b)=>!N$n.test(h)&&!F$n.test(n[b-1]??""))};
var B$n=/^(?:(?:[A-Za-z]:\\[^:]*|[^\s:]+): )?(?:\d+: )?(?:[Cc]an't|cannot) open (?:file |perl script )?(?:(['"])(.+?)\1[:( ]|([^'"]+?): )/;
async function Uit({stdout:e,stderr:n,scriptPaths:r}){if(r.length===0||e.trim()&&n.trim())return;let s=n.trim()?n:e,g=s.split(`
`).map((D)=>D.trim()).filter(Boolean);if(g.length===0)return;let h=new Map;for(let D of r)h.set($it(D),D);let b=new Set;for(let D of g){let j=B$n.exec(D),z=j?.[2]??j?.[3],K=z===void 0?void 0:h.get($it(z));if(K===void 0)return;b.add(K)}for(let D of b)if(await O$n(D,I$n.R_OK).then(()=>!0,()=>!1))return;let[w]=b;return w===void 0?void 0:{scriptPath:w,output:s}};
function $it(e){let n=e.replace(/[\\/]+/g,"/");return/^[A-Za-z]:\//.test(n)?n.toLowerCase():n};
var U$n=64;
var Hit=new V(()=>new Map);
function jit(e,n,r){if(r===void 0)return e.delete(n),!1;if(e.get(n)===r)return!0;if(e.delete(n),e.set(n,r),e.size>U$n){let[s]=e.keys();if(s!==void 0)e.delete(s)}return!1};
function ZOt({summary:e,body:n,priority:r,stopHookActive:s,queue:g,origin:h,turnAttribution:b}){(g===void 0?Mi:g.enqueuePendingNotification)({value:qi({summary:zt(e),trailing:`
${cl(n)}`}),mode:"task-notification",agentId:Ge(),priority:r,stopHookActive:s,origin:h,skipAttachments:!0},{turnAttribution:b})};
function iEe({hookEvent:e,hooks:n,agentId:r,toolName:s}){let g=H$n(),h={hookEvent:e,hooks:n,settled:new Set,agentId:r,toolName:s};return g.setState((b)=>[...b,h]),{settle:(b)=>g.setState((w)=>{let D=w.indexOf(h);if(D===-1||h.settled.has(b))return w;return h={...h,settled:new Set(h.settled).add(b)},w.toSpliced(D,1,h)}),[Symbol.dispose]:()=>g.setState((b)=>{let w=b.indexOf(h);return w===-1?b:b.toSpliced(w,1)})}};
function wjt(){return{stderr:"",stdout:"",output:"",started:!1,exitStatus:void 0,resultStdout:void 0,resultWasString:!1,resultConflict:!1,scanFrom:0,stdoutScanFrom:0}};
function hLe(e,n){e.scanFrom=bjt(e,"stderr",e.scanFrom,n),e.stdoutScanFrom=bjt(e,"stdout",e.stdoutScanFrom,n)};
function bjt(e,n,r,s){let g=`
${s} started
`,h=e[n].indexOf(g,r);while(h!==-1)e.started=!0,hae(e,n,h,h+g.length),h=e[n].indexOf(g,h);let b=`
${s} result `;h=e[n].indexOf(b,r);while(h!==-1){let z=e[n].indexOf(`
`,h+b.length);if(z===-1)break;let K=e[n].slice(h+b.length,z);hae(e,n,h,z+1);let he;try{he=Y(K)}catch{e.resultConflict=!0,h=e[n].indexOf(b,h);continue}let _e=typeof he==="string",ke=typeof he==="string"?he:K;if(e.resultStdout!==void 0&&e.resultStdout!==ke)e.resultConflict=!0;e.resultStdout=ke,e.resultWasString=_e,h=e[n].indexOf(b,h)}let w=`
${s} exited `;h=e[n].indexOf(w,r);while(h!==-1){let z=e[n].indexOf(`
`,h+w.length);if(z===-1)break;let K=e[n].slice(h+w.length,z);if(!/^\d{1,3}$/.test(K)){hae(e,n,h,z+1),e.resultConflict=!0,h=e[n].indexOf(w,h);continue}let he=Number(K);hae(e,n,h,z+1),e.exitStatus=e.exitStatus===2?2:he,h=e[n].indexOf(w,h)}let D=e[n].indexOf(`
${s} `,r),j=Math.max(0,e[n].length-(s.length+16));return D===-1?j:Math.min(D,j)};
function vjt(e,n){if(n===void 0)return;return e===2?2:n};
function hae(e,n,r,s){let g=e[n],h=g.slice(r,s);e[n]=g.slice(0,r)+g.slice(s);let b=e.output.lastIndexOf(h);if(b!==-1)e.output=e.output.slice(0,b)+e.output.slice(b+h.length)};
var yl=600000;
function bct(e){let n=Hjt(e);if(n===4)return jjt(e);if(n===6)return BFo(e);return!1};
function jjt(e){let n=e.split(".").map(Number),[r,s]=n;if(n.length!==4||r===void 0||s===void 0||n.some((g)=>Number.isNaN(g)))return!1;if(r===127)return!1;if(r===0)return!0;if(r===10)return!0;if(r===169&&s===254)return!0;if(r===172&&s>=16&&s<=31)return!0;if(r===100&&s>=64&&s<=127)return!0;if(r===192&&s===168)return!0;return!1};
function BFo(e){let n=e.toLowerCase();if(n==="::1")return!1;if(n==="::")return!0;let r=HFo(n);if(r!==null)return jjt(r);if(n.startsWith("fc")||n.startsWith("fd"))return!0;let s=ot(n,":");if(s&&s.length===4&&s>="fe80"&&s<="febf")return!0;return!1};
function UFo(e){let n=[];if(e.includes(".")){let j=e.lastIndexOf(":"),z=e.slice(j+1);e=e.slice(0,j);let K=z.split(".").map(Number);if(K.length!==4||K.some((he)=>!Number.isInteger(he)||he<0||he>255))return null;n=[K[0]<<8|K[1],K[2]<<8|K[3]]}let r=e.indexOf("::"),s,g;if(r===-1)s=e.split(":"),g=[];else{let j=e.slice(0,r),z=e.slice(r+2);s=j===""?[]:j.split(":"),g=z===""?[]:z.split(":")}let b=8-n.length-s.length-g.length;if(b<0)return null;let D=[...s,...Array(b).fill("0"),...g].map((j)=>parseInt(j,16));if(D.some((j)=>Number.isNaN(j)||j<0||j>65535))return null;return D.push(...n),D.length===8?D:null};
function HFo(e){let n=UFo(e);if(!n)return null;if(n[0]===0&&n[1]===0&&n[2]===0&&n[3]===0&&n[4]===0&&n[5]===65535){let r=n[6],s=n[7];return`${r>>8}.${r&255}.${s>>8}.${s&255}`}return null};
function zjt(e,n,r){let s="all"in n&&n.all===!0,g=Hjt(e);if(g!==0){if(bct(e)){r(Bjt(e,e),"");return}let h=g===6?6:4;if(s)r(null,[{address:e,family:h}]);else r(null,e,h);return}LFo(e,{all:!0},(h,b)=>{if(h){r(h,"");return}for(let{address:j}of b)if(bct(j)){r(Bjt(e,j),"");return}let w=b[0];if(!w){r(Object.assign(Error(`ENOTFOUND ${e}`),{code:"ENOTFOUND",hostname:e}),"");return}let D=w.family===6?6:4;if(s)r(null,b.map((j)=>({address:j.address,family:j.family===6?6:4})));else r(null,w.address,D)})};
function Bjt(e,n){let r=Error(`HTTP hook blocked: ${e} resolves to ${n} (private/link-local address). Loopback (127.0.0.1, ::1) is allowed for local dev.`);return Object.assign(r,{code:"ERR_HTTP_HOOK_BLOCKED_ADDRESS",hostname:e,address:n})};
var jFo=["NODE_EXTRA_CA_CERTS","CLAUDE_CODE_CERT_STORE","CLAUDE_CODE_CLIENT_CERT","CLAUDE_CODE_CLIENT_KEY","CLAUDE_CODE_CLIENT_KEY_PASSPHRASE","NODE_TLS_REJECT_UNAUTHORIZED","LOCALDOMAIN","HOSTALIASES","RES_OPTIONS"];
function GFo(){let e=tt();return{allowedUrls:e.allowedHttpHookUrls,allowedEnvVars:e.httpHookAllowedEnvVars}};
function qFo(e){return e.replace(/[\r\n\x00]/g,"")};
function KFo(e,n,r,s,g){let h=e.replace(/\$\{([A-Z_][A-Z0-9_]*)\}|\$([A-Z_][A-Z0-9_]*)/g,(b,w,D)=>{let j=w??D;if(!n.has(j))return t(`Hooks: env var $${j} not in allowedEnvVars, skipping interpolation`,{level:"warn"}),"";let z=(s??Ko())[j];if(MQe(j)||!r.has(j)&&AQe(j,z,g))return t(`Hooks: env var $${j} is a credential and is not interpolated into an HTTP hook header`,{level:"warn"}),"";return z??""});return qFo(h)};
async function Ban(e,n,r,s,g=yl,h){let b=GFo();if(b.allowedUrls!==void 0){if(!b.allowedUrls.some((K)=>cG(e.url,K))){let K=`HTTP hook blocked: ${e.url} does not match any pattern in allowedHttpHookUrls`;return t(K,{level:"warn"}),{ok:!1,body:"",error:K}}}let w=e.timeout?e.timeout*1000:g,{signal:D,cleanup:j}=_s(s,{timeoutMs:w});try{let z={"Content-Type":"application/json"};if(e.headers){let Te=e.allowedEnvVars??[],xe=b.allowedEnvVars!==void 0?Te.filter((We)=>b.allowedEnvVars.includes(We)):Te,Pe=new Set(xe),$e=new Set(p8r().flatMap((We)=>We.httpHookAllowedEnvVars??[])),Ne=jV();for(let[We,qe]of Object.entries(e.headers))z[We]=KFo(qe,Pe,$e,h,Ne)}let K=await WFo(),he=!K&&Hp()!==void 0&&!Ph(e.url),_e=Hp(),ke=h===void 0?void 0:Hp(h);if(h!==void 0&&(_e!==ke||(_e!==void 0||ke!==void 0)&&Ph(e.url,j0e()??"")!==Ph(e.url,j0e(h)??"")||jFo.some((Te)=>process.env[Te]!==h[Te])))return t("HTTP hook not sent: this process's proxy, TLS trust or resolver settings differ from the person's own environment",{level:"warn"}),j(),{ok:!1,body:"",error:"HTTP hook not sent: this process's proxy, TLS trust or resolver settings differ from the person's own environment"};if(K)t(`Hooks: HTTP hook POST to ${e.url} (via sandbox proxy :${K.port})`);else if(he)t(`Hooks: HTTP hook POST to ${e.url} (via env-var proxy)`);else t(`Hooks: HTTP hook POST to ${e.url}`);let be=await sa.post(e.url,r,{headers:z,signal:D,responseType:"text",validateStatus:()=>!0,maxRedirects:0,proxy:K??!1,lookup:K||he?void 0:zjt});j();let ve=be.data??"";return t(`Hooks: HTTP hook response status ${be.status}, body length ${ve.length}`),{ok:be.status>=200&&be.status<300,statusCode:be.status,body:ve}}catch(z){if(j(),D.aborted)return{ok:!1,body:"",aborted:!0};let K=l(z);return t(`Hooks: HTTP hook error: ${K}`,{level:"error"}),{ok:!1,body:"",error:K}}};
var qjt="hook-dispatch-hold";
var YFo=60000;
var Kjt=1200000;
var Lx=()=>{};
var XFo=new Set(["MessageDisplay","SessionEnd","PermissionRequest","Notification"]);
function SLe(e,n,r){let s;try{if(XFo.has(e)||!a.CLAUDE_CODE_REMOTE_SEND_KEEPALIVES)return Lx;if(!k("tengu_ccr_hook_keepalive_enabled",!1))return Lx;let w=0;for(let{hook:D}of n){let j=D.type==="function"?D.timeout??r:D.timeout?D.timeout*1000:r;w=Math.max(w,j)}s=Math.min(w+YFo,Kjt)}catch(w){return d(w),Lx}let g=!1,h,b=()=>{if(!g)return;g=!1;try{clearTimeout(h),uF("hook_exec",qjt)}catch(w){d(w)}};try{dF("hook_exec",qjt),g=!0;let w=Number.isFinite(s)?s:Kjt;return h=setTimeout(QFo,w,b,w),h.unref(),b}catch(w){return d(w),b(),Lx}};
function QFo(e,n){ne("warn","session_activity_hook_hold_expired",{max_ms:n}),e()};
function JFo(e,n){let r=(g)=>{let h=n;for(let b of g.split(".")){if(h==null||typeof h!=="object")return;h=h[b]}return h},s=(g)=>{if(typeof g==="string")return g.replace(/\$\{([a-zA-Z_][a-zA-Z0-9_.]*)\}/g,(h,b)=>{let w=r(b);if(w===void 0||w===null)return"";return typeof w==="object"?_(w):String(w)});if(Array.isArray(g))return g.map(s);if(g!==null&&typeof g==="object"){let h={};for(let[b,w]of Object.entries(g))h[b]=s(w);return h}return g};return s(e)};
async function bLe(e,n,r,s,g,h=yl,b){HHo(e.server,n);let w=s??dS();if(w===void 0){let be=`mcp_tool hooks are not available for the '${n}' hook event (no MCP client context)`;return t(`Hooks: mcp_tool hook skipped \u2014 ${be}`,{level:"warn"}),{ok:!1,body:"",error:be}}let D=e.timeout?e.timeout*1000:h,j=Date.now()+D,z=w.find((be)=>be.name===e.server);if(z===void 0&&s!==void 0)z=dS()?.find((be)=>be.name===e.server);if(z?.type==="pending"&&!eNt.has(n)){let be=Math.min(D,Ja());t(`Hooks: mcp_tool hook for ${n} is waiting up to ${be}ms (less if the server is retrying) for MCP server '${e.server}' to finish connecting`);let ve=Date.now(),Te=await r$o(e.server,be,g);if(g?.aborted)return{ok:!1,body:"",aborted:!0};let xe=Date.now()-ve;if(Te)z=Te,t(`Hooks: MCP server '${e.server}' is now ${Te.type} after ${xe}ms`);else t(xe<Qjt?`Hooks: no live MCP client list tracks '${e.server}'; not waiting for it`:`Hooks: stopped waiting for MCP server '${e.server}' after ${xe}ms; it has not connected`,{level:"warn"})}if(!z||!Ts(z)){let be=`MCP server '${e.server}' not connected`;return t(`Hooks: mcp_tool hook skipped \u2014 ${be}`,{level:"warn"}),{ok:!1,body:"",error:be}}let K=e.input?JFo(e.input,r):{},he=j-Date.now();if(he<=0)return{ok:!1,body:"",aborted:!0};let{signal:_e,cleanup:ke}=_s(g,{timeoutMs:he});try{t(`Hooks: mcp_tool calling ${e.server}/${e.tool} with ${Object.keys(K).length} arg(s)`);let be=wO();if(!be){ke();let $e=`MCP server '${e.server}' not connected`;return t(`Hooks: mcp_tool hook skipped \u2014 ${$e}`,{level:"warn"}),{ok:!1,body:"",error:$e}}let ve=await be(z,{signal:g,timeoutMs:Math.min(he,Ja()),context:"mcp_tool hook"}),Te=cZ(ve);if(Te&&WMr(e.tool,pqn([ve],b??wdn(U().host)).mode)){ke();let $e=`The account memory server's ${e.tool} is not available to a hook in this session`;return t(`Hooks: mcp_tool hook refused \u2014 ${$e}`,{level:"warn"}),{ok:!1,body:"",error:$e,withheld:!0}}let xe=await GN(ve,{name:e.tool,arguments:K,...Te&&{_meta:{[dZ]:"worker"}}},{signal:_e,timeout:he});ke();let Pe=Array.isArray(xe.content)?xe.content.map(($e)=>$e.type==="text"?$e.text:`[${$e.type}]`).join(`
`):"";if(xe.isError)return{ok:!1,body:Pe,error:Pe||"MCP tool returned an error"};return{ok:!0,body:Pe}}catch(be){if(ke(),_e.aborted)return{ok:!1,body:"",aborted:!0};let ve=l(be);return t(`Hooks: mcp_tool hook error: ${ve}`,{level:"error"}),{ok:!1,body:"",error:ve}}};
var Qjt=50;
var t$o=5000;
async function r$o(e,n,r){let s=Date.now()+n,g=!1;for(;;){let h=dS()?.find((w)=>w.name===e);if(h===void 0||h.type!=="pending")return h;if(!g&&h.reconnectAttempt!==void 0)s=Math.min(s,Date.now()+t$o),g=!0;let b=s-Date.now();if(b<=0||r?.aborted)return;await ee(Math.min(Qjt,b),r)}};
var O$o=new Tt(()=>new Set);
function jWt(){return O$o.of(U())};
var L$o=300;
function RLe({processId:e,hookId:n,shellCommand:r,asyncResponse:s,hookEvent:g,hookName:h,command:b,asyncRewake:w,rewakeMessage:D,rewakeSummary:j,scriptPaths:z,pluginId:K}){if(w){let he=r.result.then(async(ke)=>{await new Promise((Pe)=>setImmediate(Pe));let be=await r.taskOutput.getStdout(),ve=r.taskOutput.getStderr();r.cleanup(),Ec({hookId:n,hookName:h,hookEvent:g,output:be+ve,stdout:be,stderr:ve,exitCode:ke.code,outcome:ke.code===0?"success":"error"});let Te;if(K)for(let Pe of be.split(`
`)){let $e=Pe.trim();if(!$e.startsWith("{"))continue;try{let Ne=Y($e);if("async"in Ne)continue;if(y0(Ne)){if(fFe(Ne.metrics,K,g),typeof Ne.rewakeSummary==="string"&&Ne.rewakeSummary.trim()&&vae(K))Te=Ne.rewakeSummary.trim().replace(/\s+/g," ").slice(0,L$o)}break}catch{}}let xe=ke.code===2?await Uit({stdout:be,stderr:ve,scriptPaths:z??[]}):void 0;if(jit(Hit.of(U().host),`${h}
${b}`,xe?.output)){t(`Hooks: asyncRewake hook "${h}" (${b}) exited 2 again because ${xe?.scriptPath} cannot be opened; already reported, not waking the model`,{level:"warn"});return}if(ke.code===2){let Pe,$e,Ne;if(xe!==void 0)Pe=`${h} hook could not run: ${xe.scriptPath} cannot be opened, so its command exited with code 2 without doing any work. This is a broken hook installation, not feedback on your work; it is reported this once and identical repeats are dropped. Interpreter output:`,$e=`${g} hook could not open ${HWt(xe.scriptPath)}`,Ne=xe.output;else Pe=D??`Stop hook blocking error from command "${h}":`,$e=Te??j??"Stop hook feedback",Ne=ve||be;ZOt({summary:$e,body:`${Pe} ${Ne}`,priority:"next",stopHookActive:!0,turnAttribution:"inherit"})}}),_e=jWt();return _e.add(he),he.finally(()=>_e.delete(he)),!0}if(!r.background(e,{skipSpill:!0}))return!1;return Dit({processId:e,hookId:n,asyncResponse:s,hookEvent:g,hookName:h,command:b,shellCommand:r,pluginId:K}),!0};
function Oce(){return!qH()};
function Xct(e,n,r){let s=r.trim();return n!==0&&s?`${e}

Hook exited ${n} with stderr:
${s}`:e};
async function U$o(e,n){if(F()&&e!==void 0){let r=vG(n,x9());if(r){let s=await e.scopeKind({namespace:"pluginCache",marketplace:r.marketplace,plugin:r.plugin,version:r.version},{resolveLink:!0});if(s.ok)switch(s.value.kind){case"absent":return!1;case"directory":case"other":return!0;case"link":return s.value.linkResolves===!0;default:return s.value}}}return dc(n)};
function GWt(e){return Pve(e)??e.stdout};
function H$o(e,n,r){let s=r?n:n+`
`;if(s==="")return e;let g=e.endsWith(s)?e.slice(0,-s.length):e;return g===""?n:`${g}${g.endsWith(`
`)?"":`
`}${n}`};
function zWt(e){if(e.backgrounded)return!0;if(e.runnerConflict&&e.status!==2)return!1;if(e.runnerExited===!0)return e.status<=255;if(e.aborted||e.spawnFailed||e.exitedNormally!==!0)return!1;return!1};
function wae(e){if(e.runnerConflict)return"no single verdict (re-runs disagreed, or a malformed result or exit line)";if(e.aborted)return"timed out";if(e.spawnFailed)return"could not start";if(e.exitedNormally!==!0||e.runnerStarted)return"killed before it finished";if(e.stderr!==void 0&&e.stderr.trim()==="")return`nothing from the runner reached this process (exit ${e.status}) \u2014 a launcher that redirects the hook's stderr hides its verdict`;return`its launcher exited ${e.status} before the hook ran`};
async function IB(e,n,r,s,g,h,b,w,D,j,z,K,he,_e,ke,be,ve,Te,xe){let Pe=Net(),$e=K!==void 0&&Pe?.holds(K)===!0?Pe.run:void 0;if($e!==void 0&&K!==void 0){if(n==="StatusLine"||n==="FileSuggestion"||ke!==void 0||be!==void 0)return ALe(n);let xs={hook:e,hookEvent:n,jsonInput:s,pluginId:K,hookIndex:j},gi=(Go)=>Promise.race([Promise.resolve().then(()=>$e({...xs,signal:Go})),new Promise((Hr)=>{let os=()=>Hr(qWt(n)?ALe(n):{stdout:"",stderr:"",output:"",status:1,aborted:!0});if(Go.aborted)os();else Go.addEventListener("abort",os,{once:!0})})]);if((e.async||e.asyncRewake&&(!Ce()||Oet()))&&!_e){let Go=`async_hook_${VS()}`,Hr=new AbortController,os=j$o(Go,gi(Hr.signal),Hr),mr=RLe({processId:Go,hookId:D,shellCommand:os,asyncResponse:{async:!0,asyncTimeout:e.timeout?e.timeout*1000:yl},hookEvent:n,hookName:r,command:aH(e),asyncRewake:e.asyncRewake,rewakeMessage:e.rewakeMessage,rewakeSummary:e.rewakeSummary,pluginId:K});if(mr)return{stdout:"",stderr:"",output:"",status:0,backgrounded:mr}}let ar=await gi(w).catch((Go)=>{t(`Hooks: a plugin hook's run on another machine failed (${l(Go)})`,{level:"error"});return});if(ar===void 0)return ALe(n);return{...ar,stdout:Ihe(ar.stdout),stderr:Ihe(ar.stderr),output:Ihe(ar.output),...ar.aborted!==!0&&ar.spawnFailed!==!0&&{exitedNormally:!0}}}let Ne=n==="SessionStart"||n==="Setup"||n==="SessionEnd",We=Date.now(),qe,Qe=!1,Ze=O()==="windows",et=e.shell??rj(),bt=et==="powershell",ht=e.args!==void 0;if(ht&&/\s/.test(e.command)&&!/[\\/]/.test(e.command))t(`Hook command "${e.command}" has both "args" and whitespace in "command". Exec form treats "command" as a single executable name; move the rest into "args". Example: { "command": "node", "args": ["script.js"] }.`,{level:"warn"});let kt=Ze&&!bt&&!ht?(xs)=>xs.replaceAll("\\","/"):(xs)=>xs,$t=xe===void 0&&be?.startsOutsideProject!==!0?Co():null,It=$t??h.projectRoot,jt=e.command,Xt;if(!ht&&bt){if(jt=nBo(jt),/\$CLAUDE_PROJECT_DIR\b/.test(jt))t(`PowerShell hook command references $CLAUDE_PROJECT_DIR, which PowerShell reads as an undefined variable ($null). Use $env:CLAUDE_PROJECT_DIR or \${CLAUDE_PROJECT_DIR} instead. Command: ${jt}`,{level:"warn"})}for(let[xs,gi]of[["CLAUDE_PLUGIN_ROOT",z||he],["CLAUDE_PLUGIN_DATA",z]]){if(gi)continue;let ar="${"+xs+"}";if(!e.command.includes(ar)&&!e.args?.some((Hr)=>Hr.includes(ar)))continue;let Go=aH(e);throw Error(he?`Hook command references \${${xs}} but only \${CLAUDE_PLUGIN_ROOT} is available for skill hooks (\${CLAUDE_PLUGIN_DATA} is plugin-only). Command: ${Go}`:`Hook command references \${${xs}} but the hook is not associated with a plugin. This variable is only available in hooks defined in a plugin's hooks/hooks.json file, not in settings.json. Command: ${Go}`)}if(z){if(!await U$o(ve,z))throw Error(`Plugin directory does not exist: ${z}`+(K?` (${K} \u2014 run /plugin to reinstall)`:""));if(K)Xt=await ik(K,Te);if(!ht&&Xt){if(hpt(jt,Xt))throw new P(`Hook from ${K?`plugin ${K}`:"a plugin"} references \${user_config.*} in a shell-form command. The substituted value would be re-parsed by the shell. Use exec `+'form instead \u2014 {"command": "<executable>", "args": '+'["${user_config.KEY}", ...]} \u2014 or read '+`$CLAUDE_PLUGIN_OPTION_<KEY> from the hook's environment. Command: ${aH(e)}`,"plugin hook references ${user_config.*} in shell-form command")}}let un;if(e.args!==void 0){let xs=z??he,gi=z&&K?K:void 0,ar=(Go)=>{if(!Go.includes("${"))return Go;if(Go=Go.replaceAll("${CLAUDE_PROJECT_DIR}",()=>It),xs)Go=Go.replaceAll("${CLAUDE_PLUGIN_ROOT}",()=>xs);if(gi)Go=Go.replaceAll("${CLAUDE_PLUGIN_DATA}",()=>Mxe(gi));if(Xt)Go=gpt(Go,Xt);return Go};un=[ar(e.command),e.args.map(ar)]}let rn=aH(e);if(Ze&&!bt&&!ht)jt=OAn(jt);let Yt=be!==void 0?be.shellPrefix:a.CLAUDE_CODE_SHELL_PREFIX,Qt=!bt&&!ht&&Yt?xQ(Yt,jt):jt,nn=e.timeout?e.timeout*1000:yl,$n={...be!==void 0?Slt({base:be.base,omit:be.omit,extra:{}}):{...Ko()},...ke,...m$e(g),CLAUDE_PROJECT_DIR:kt(It)},{columns:qn,rows:En}=process.stdout;if(qn)$n.COLUMNS=String(qn);if(En)$n.LINES=String(En);if(z){if($n.CLAUDE_PLUGIN_ROOT=kt(z),K)$n.CLAUDE_PLUGIN_DATA=kt(Mxe(K))}if(Object.assign($n,H0o(K)),Xt)for(let[xs,gi]of Object.entries(Xt)){let ar=xs.replace(/[^A-Za-z0-9_]/g,"_").toUpperCase();$n[`CLAUDE_PLUGIN_OPTION_${ar}`]=String(gi)}if(he)$n.CLAUDE_PLUGIN_ROOT=kt(he);if(!bt&&(n==="SessionStart"||n==="Setup"||n==="CwdChanged"||n==="FileChanged")&&j!==void 0)$n.CLAUDE_ENV_FILE=await Nrt(n,j);let zn=be?.spawnCwd===void 0?$t:null,xn=zn===null?await hGn(b,h):await hGn(zn,{originalCwd:zn,projectRoot:zn});if(be?.startsOutsideProject===!0&&xn!==b)return{stdout:"",stderr:"",output:"",status:1,spawnFailed:!0};let Jn=!Ze,wn=ke?.[GHo],eo=wjt();using to=xe===void 0?void 0:await xe(un?Ur([un[0],...un[1]]):Qt);if(xe!==void 0&&to===void 0)return{stdout:"",stderr:"",output:"",status:1,spawnFailed:!0};using boundary=await mandatoryProcessWrapper?.({command:Qt,exec:un,wrappedCommand:to?.command,cwd:xn,shell:et,powerShellArgs:Isn(Qt),signal:w});if(w.aborted)return{stdout:"",stderr:"",output:"",status:1,aborted:!0};let ao;if(boundary!==void 0)ao=Sae(boundary.command,[],{env:$n,cwd:xn,shell:!0,detached:Jn,windowsHide:!0,...N5e(n)});else if(to!==void 0)ao=Sae(to.command,[],{env:$n,cwd:xn,shell:!0,detached:Jn,windowsHide:!0,...N5e(n)});else if(un)ao=Sae(un[0],un[1],{env:$n,cwd:xn,detached:Jn,windowsHide:!0,...N5e(n)});else if(et==="powershell"){let xs=await MA();if(w.aborted)return{stdout:"",stderr:"",output:"",status:1,aborted:!0};if(!xs)throw Error(`Hook "${e.command}" has shell: 'powershell' but no PowerShell executable (pwsh or powershell) was found on PATH. Install PowerShell, or remove "shell": "powershell" to use bash.`);ao=Sae(xs,Isn(Qt),{env:$n,cwd:xn,detached:Jn,windowsHide:!0,...N5e(n)})}else{let xs=Ze?vK():null;if(Ze&&!xs)throw Error(`Hook "${e.command}" requires bash but Git Bash was not found. Install Git for Windows (https://git-scm.com/downloads/win), or add "shell": "powershell" to this hook's config.`);let gi=Ze?xs:!0;if(Ze&&xs)IAn($n,xs);ao=Sae(Qt,[],{env:$n,cwd:xn,shell:gi,detached:Jn,windowsHide:!0,...N5e(n)})}let mo=new a1(`hook_${ao.pid}`,null),$o=i3(ao,w,nn,mo);boundary?.attach($o.result);let Ao=!1,Po=!1,ur=!Ce()||Oet();if((e.async||e.asyncRewake&&ur)&&!_e){let xs=`async_hook_${ao.pid}`;t(`Hooks: Config-based async hook, backgrounding process ${xs}`);let gi=(Go)=>{t(`Async hook stdin write failed (${E(Go)??Go}); hook command likely exited without reading stdin`)};ao.stdin.on("error",gi);try{ao.stdin.write(s+`
`,"utf8"),ao.stdin.end()}catch(Go){gi(Go)}if(Po=!0,RLe({processId:xs,hookId:D,shellCommand:$o,asyncResponse:{async:!0,asyncTimeout:nn},hookEvent:n,hookName:r,command:rn,asyncRewake:e.asyncRewake,rewakeMessage:e.rewakeMessage,rewakeSummary:e.rewakeSummary,scriptPaths:e.asyncRewake?Bit({command:e.command,args:e.args,pluginRoot:z??he,projectDir:It,homeDir:BWt(),windowsBash:Ze&&!bt&&!ht}):void 0,pluginId:K}))return{stdout:"",stderr:"",output:"",status:0,backgrounded:!0}}let kr="",po="",Tr="",Yr=0;ao.stdout.setEncoding("utf8"),ao.stderr.setEncoding("utf8");let gr=!1,_o=null,wo=new Promise((xs)=>{_o=xs}),br=(xs)=>{if(Yr=Date.now(),po+=xs,Tr+=xs,wn!==void 0)eo.stderr=po,eo.stdout=kr,eo.output=Tr,hLe(eo,wn),po=eo.stderr,kr=eo.stdout,Tr=eo.output},xo=(xs)=>{if(Yr=Date.now(),kr+=xs,Tr+=xs,wn!==void 0)eo.stderr=po,eo.stdout=kr,eo.output=Tr,hLe(eo,wn),po=eo.stderr,kr=eo.stdout,Tr=eo.output;if(!gr){let gi=Mr(kr).trim();if(!gi.includes("}"))return;gr=!0,t(`Hooks: Checking first line for async: ${gi}`);try{let ar=Y(gi);if(t(`Hooks: Parsed initial response: ${_(ar)}`),d_e(ar)&&!_e){let Go=`async_hook_${ao.pid}`;if(t(`Hooks: Detected async hook, backgrounding process ${Go}`),RLe({processId:Go,hookId:D,shellCommand:$o,asyncResponse:ar,hookEvent:n,hookName:r,command:rn,pluginId:K}))Ao=!0,ao.stdout.removeListener("data",xo),ao.stderr.removeListener("data",br),_o?.({stdout:kr,stderr:po,output:Tr,status:0,backgrounded:!0})}else if(d_e(ar)&&_e)t("Hooks: Detected async hook but forceSyncExecution is true, waiting for completion");else t("Hooks: Initial response is not async, continuing normal processing")}catch(ar){t(`Hooks: Failed to parse initial response as JSON: ${ar}`)}}};ao.stdout.on("data",xo),ao.stderr.on("data",br);let dr=to!==void 0?()=>{}:nJ({hookId:D,hookName:r,hookEvent:n,getOutput:async()=>({stdout:kr,stderr:po,output:Tr})}),or=!1,Wr=!1,_r=!1,Fr=new Promise((xs)=>{ao.stdout.once("end",()=>{or=!0,xs()}),ao.stdout.once("close",()=>{if(!or)_r=!0;xs()})}),es=new Promise((xs)=>{ao.stderr.once("end",()=>{Wr=!0,xs()}),ao.stderr.once("close",()=>{if(!Wr)_r=!0;xs()})}),qs=Po?Promise.resolve():new Promise((xs,gi)=>{ao.stdin.on("error",(ar)=>{gi(ar)}),ao.stdin.write(s+`
`,"utf8"),ao.stdin.end(),xs()}),Vs=new Promise((xs,gi)=>{ao.on("error",gi)}),fs=!1;ao.on("exit",()=>{if(!w.aborted)fs=!0});let Qi=new Promise((xs)=>{ao.on("exit",(gi)=>{(async()=>{await Sst({streamsSettled:Promise.all([Fr,es]).then(()=>{}),lastDataAt:()=>Yr,holdOpen:()=>wn!==void 0&&eo.started&&eo.exitStatus===void 0}),ao.stdout.removeListener("data",xo),ao.stderr.removeListener("data",br),xs({stdout:kr,stderr:po,output:Tr,status:gi??1,aborted:w.aborted&&!fs,...gi!==null&&{exitedNormally:!0},...!(or&&Wr)&&{stdioIncomplete:!0},..._r&&{stdioClosedWithoutEnd:!0},...eo.started&&{runnerStarted:!0},...eo.exitStatus!==void 0&&{status:vjt(gi,eo.exitStatus),exitedNormally:!0,runnerExited:!0,aborted:!1},...eo.resultStdout!==void 0&&{stdout:H$o(kr,eo.resultStdout,eo.resultWasString),resultStdout:eo.resultStdout},...eo.resultConflict&&{runnerConflict:!0}})})()})});try{if(Ne)ne("info","hook_spawn_started",{hook_event_name:n,index:j});await Promise.race([qs,Vs]);let xs=await Promise.race([wo,Qi,Vs]);return qe=xs.status,Qe=xs.aborted??!1,{...xs,stdout:Ihe(xs.stdout),stderr:Ihe(xs.stderr),output:Ihe(xs.output)}}catch(xs){let gi=E(xs);if(qe=1,gi==="EPIPE"){t("EPIPE error while writing to hook stdin (hook command likely closed early)");let ar="Hook command closed stdin before hook input was fully written (EPIPE)";return{stdout:"",stderr:ar,output:ar,status:1}}else if(gi==="ABORT_ERR")return Qe=!0,{stdout:"",stderr:"Hook cancelled",output:"Hook cancelled",status:1,aborted:!0};else{let ar=l(xs);t(`Hook command failed to spawn (${r}): ${ar}`,{level:"error"});let Go=`Error occurred while executing hook command: ${ar}`;return{stdout:"",stderr:Go,output:Go,status:1,spawnFailed:!0}}}finally{if(Ne)ne("info","hook_spawn_completed",{hook_event_name:n,index:j,duration_ms:Date.now()-We,exit_code:qe,aborted:Qe});if(dr(),to!==void 0&&$o.status==="running")$o.kill();if(!Ao)$o.cleanup()}};
function ALe(e){if(!qWt(e))return{stdout:"",stderr:"This plugin's hooks run on another machine, which is not available.",output:"This plugin's hooks run on another machine, which is not available.",status:1,spawnFailed:!0};let r=KOt(e,"This plugin's hooks run on another machine, which is not available.");return{stdout:r!==void 0?_(r):"",stderr:"This plugin's hooks run on another machine, which is not available.",output:"This plugin's hooks run on another machine, which is not available.",status:2}};
function qWt(e){return VOt.has(e)&&e!=="PostToolBatch"&&e!=="TaskCreated"&&e!=="PreCompact"};
function j$o(e,n,r){let s=new a1(e,null),g={status:"backgrounded",taskOutput:s,background:()=>!0,kill:async()=>r.abort(),cleanup:()=>{},result:n.then(({stdout:h,stderr:b,status:w,aborted:D})=>(s.writeStdout(h),s.writeStderr(b),g.status="completed",{stdout:h,stderr:b,code:w,interrupted:D===!0}),(h)=>{let b=l(h);return s.writeStderr(b),g.status="completed",{stdout:"",stderr:b,code:1,interrupted:!1}})};return g};
function MLe(e){return"tool_name"in e?e.tool_name:void 0};
function LLe(e){return e.hook.type==="callback"&&e.hook.internal===!0};
function vae(e){let n=e.lastIndexOf("@");if(n<=0)return!1;let r=e.slice(n+1);if(el(r))return!0;if(r===Gd&&el(fto(e)))return!0;return!1};
function e1t(e){let n=e.filter((s)=>s.pluginId);if(n.length===0)return;let r=new Map;for(let s of n){let g=Dir(s.pluginId,vae(s.pluginId));r.set(g,(r.get(g)??0)+1)}return r};
function U0o(e){if(!vae(e))return!1;let n=e.lastIndexOf("@"),r=e.slice(0,n);return(k("tengu_amber_lattice",{}).plugins??[]).includes(r)};
function H0o(e){if(!e||!U0o(e))return{};if(!Vn())return{};if(At()||Tvn())return{};if(a.ANTHROPIC_UNIX_SOCKET)return{};try{if(ft()){let r=fn()?.accessToken;return r?{ANTHROPIC_AUTH_TOKEN:r}:{}}let n=nZ();return n?{ANTHROPIC_API_KEY:n}:{}}catch{return{}}};
var j0o=20;
function fFe(e,n,r){if(!e||!n)return;let s=vae(n);if(!s)return;let g=Object.entries(e).slice(0,j0o).filter(([,h])=>typeof h==="boolean"||typeof h==="number");i("tengu_hook_plugin_metrics",{...Object.fromEntries(g),pluginId:Dir(n,s),hookEvent:c(r)}),ys("hook_plugin_metrics",{...Object.fromEntries(g),plugin_id:n,hook_event:r})};
function s1t(e){let n=new Map;for(let r of e){let s=c(r.hook.type);n.set(s,(n.get(s)??0)+1)}return n};
function c1t(e,n){return n?ad(c(e),S(":"),an(n)):c(e)};
function FWt(e,n){return e!=="SessionEnd"&&Dr()&&!n?.aborted};
async function hGn(e,n){if(await dc(e))return e;let r=P$o();for(let g of[n.originalCwd,n.projectRoot,BWt()])if(g!==e&&await dc(g)){r=g;break}let s=Y0o.of(U().host);if(!s.has(e))s.add(e),t(`Hooks: working directory ${e} no longer exists; running hooks from ${r} instead`,{level:"warn"});return r};
var Y0o=new V(()=>new Set);
function bae(e,n){if(!e||!y0(e)||!e.terminalSequence)return;let r=Zve(e.terminalSequence);if(r!==null)tEe(r);else t(`Hook ${n} returned a terminalSequence that was rejected by the allowlist (only OSC 0/1/2/9/99/777 and BEL are permitted, and OSC 9 bodies may not begin with a digit unless in the 9;4 progress form)`)};
async function AP(e){let{session:n,sessionHooks:r,getAppState:s,hookInput:g,matchQuery:h,signal:b,timeoutMs:w=yl,storageV5:D,credentials:j,tier:z,agentId:K}=e,he=g.hook_event_name,_e=h?`${he}:${h}`:he;if(FWt(he,b))await oS();if(!e.classicChainMember&&g.hook_event_name!=="PreToolUse"&&Qrt(g.hook_event_name))return jNn({event:g.hook_event_name,hookInput:{...g},signal:b,runClassicHooks:(qe,Qe)=>AP({...e,hookInput:qe,tier:Qe,classicChainMember:!0})});if(Wb())t(`Policy disableAllHooks: skipping configured hooks for ${_e} (SDK callback hooks still run)`);if(Oce())return t(`Skipping ${_e} hook execution - workspace trust not accepted`),[];let ke=s?.(),be=await d1t(r,n.id,he,g,void 0,{...z,getToolAliases:()=>ke?.toolPermissionContext.toolAliases});if(be.length===0)return[];if(b?.aborted)return[];let ve=be.filter((qe)=>!LLe(qe));if(ve.length>0){let qe=e1t(ve),Qe=s1t(ve),Ze=G(ve,(et)=>et.matcherIsMatchAll);i("tengu_run_hook",{hookName:c1t(he,h),numCommands:ve.length,numMatchAllMatchers:Ze,numSpecificMatchers:ve.length-Ze,hookTypeCounts:S_t(Qe),...qe&&{pluginHookCounts:S_t(qe)}})}let Te;try{Te=_(g)}catch(qe){return d(qe),m(BWe(he),"hook_input_stringify_failed"),[]}let xe,Pe=!1,$e=ve.length>0?SLe(he,be,w):Lx,Ne=be.map(async({hook:qe,pluginRoot:Qe,pluginId:Ze,skillRoot:et,projectRoot:bt},ht)=>{let kt;if(bt!==void 0){let Yt=I6o(bt)?bt:P6o();if(Yt===null){let Qt=`not run: it came from ${bt}, which is no longer a working copy this session can use, and the session's directory is not in one either`;return t(`Hooks: ${aH(qe)} for ${he} ${Qt}`,{level:"warn"}),xe??="hook_did_not_run",{command:aH(qe),succeeded:!1,output:Qt,blocked:!1}}kt=Yt}if(qe.type==="callback"){let Yt=qe.timeout?qe.timeout*1000:w,{signal:Qt,cleanup:nn}=_s(b,{timeoutMs:Yt});try{let Pn=VS(),$n=await qe.callback(g,Pn,Qt,ht);if(nn?.(),d_e($n))return t(`${_e} [callback] returned async response, returning empty output`),{command:"callback",succeeded:!0,output:"",blocked:!1};let qn=he==="WorktreeCreate"&&y0($n)&&$n.hookSpecificOutput?.hookEventName==="WorktreeCreate"?$n.hookSpecificOutput.worktreePath:$n.systemMessage||"",En=y0($n)&&$n.decision==="block";return bae($n,_e),t(`${_e} [callback] completed successfully`),{command:"callback",succeeded:!0,output:qn,blocked:En}}catch(Pn){if(nn?.(),at(Pn)){let qn=Pn instanceof Hl||!!b?.aborted;if(qn)t(Pn instanceof Hl?`${_e} [callback] cancelled (control stream closed)`:`${_e} [callback] cancelled`),Pe=!0;else t(`${_e} [callback] timed out`,{level:"error"}),xe??="hook_callback_timeout";return{command:"callback",succeeded:!1,output:"",blocked:!1,...qn&&{cancelled:!0}}}let $n=Pn instanceof Error?Pn.message:String(Pn);return t(`${_e} [callback] failed to run: ${$n}`,{level:"error"}),xe??="hook_callback_failed",{command:"callback",succeeded:!1,output:$n,blocked:!1}}}if(qe.type==="prompt")return xe??="hook_type_unsupported",{command:qe.prompt,succeeded:!1,output:"Prompt stop hooks are not yet supported outside REPL",blocked:!1};if(qe.type==="mcp_tool"){let Yt=`${qe.server}/${qe.tool}`;try{let Qt=await bLe(qe,he,g,s?.().mcp.clients,b,w);if(Qt.aborted)return xe??="hook_cancelled",{command:Yt,succeeded:!1,output:"Hook cancelled",blocked:!1,...b?.aborted&&{cancelled:!0}};if(Qt.error||!Qt.ok)return xe??="hook_mcp_tool_failed",{command:Yt,succeeded:!1,output:Qt.error||"MCP tool returned an error",blocked:!1};let{json:nn,validationError:Pn}=Hce(Qt.body);if(Pn)throw Error(Pn);let $n=nn&&y0(nn)?nn:void 0,qn=$n?.decision==="block";if($n)fFe($n.metrics,Ze,he);return bae(nn,_e),{command:Yt,succeeded:!0,output:qn?$n?.reason||"":Qt.body,blocked:qn,watchPaths:$n?.hookSpecificOutput&&"watchPaths"in $n.hookSpecificOutput?$n.hookSpecificOutput.watchPaths:void 0,systemMessage:$n?.systemMessage}}catch(Qt){let nn=Qt instanceof Error?Qt.message:String(Qt);return t(`${_e} [${Yt}] failed to run: ${nn}`,{level:"error"}),xe??="hook_mcp_exec_failed",{command:Yt,succeeded:!1,output:nn,blocked:!1}}}if(qe.type==="agent")return xe??="hook_type_unsupported",{command:qe.prompt,succeeded:!1,output:"Agent stop hooks are not yet supported outside REPL",blocked:!1};if(qe.type==="function")return d(Error(`Function hook reached executeHooksOutsideREPL for ${he}. Function hooks should only be used in REPL context (Stop hooks).`)),xe??="hook_type_unsupported",{command:"function",succeeded:!1,output:"Internal error: function hook executed outside REPL context",blocked:!1};if(qe.type==="http")try{let Yt=await Ban(qe,he,Te,b,w);if(Yt.aborted)return t(`${_e} [${qe.url}] cancelled`),xe??="hook_cancelled",{command:qe.url,succeeded:!1,output:"Hook cancelled",blocked:!1,...b?.aborted&&{cancelled:!0}};if(Yt.error||!Yt.ok){let qn=Yt.error||`HTTP ${Yt.statusCode} from ${qe.url}`;return t(`${_e} [${qe.url}] failed: ${qn}`,{level:"error"}),xe??="hook_http_request_failed",{command:qe.url,succeeded:!1,output:qn,blocked:!1}}let{json:Qt,validationError:nn}=Van(Yt.body);if(nn)throw Error(nn);if(Qt&&!d_e(Qt))t(`Parsed JSON output from HTTP hook: ${_(Qt)}`,{level:"verbose"});if(Qt&&y0(Qt))fFe(Qt.metrics,Ze,he);bae(Qt,_e);let Pn=Qt&&y0(Qt)&&Qt.decision==="block",$n=Pn?Qt&&y0(Qt)&&Qt.reason||"":he==="WorktreeCreate"?Qt&&y0(Qt)&&Qt.hookSpecificOutput?.hookEventName==="WorktreeCreate"?Qt.hookSpecificOutput.worktreePath:"":Yt.body;return{command:qe.url,succeeded:!0,output:$n,blocked:!!Pn,systemMessage:Qt&&y0(Qt)?Qt.systemMessage:void 0}}catch(Yt){let Qt=Yt instanceof Error?Yt.message:String(Yt);return t(`${_e} [${qe.url}] failed to run: ${Qt}`,{level:"error"}),xe??="hook_http_exec_failed",{command:qe.url,succeeded:!1,output:Qt,blocked:!1}}let $t=qe.timeout?qe.timeout*1000:w,It=aH(qe),{signal:jt,cleanup:Xt}=_s(b,{timeoutMs:$t}),un=!1,rn=!1;try{let Yt=qe.type==="script"?nLr(qe,he):{hook:qe,env:void 0},Qt=kt===void 0?Es(n):{originalCwd:Es(n).originalCwd,projectRoot:kt},nn=await IB(Yt.hook,he,_e,Te,zne(g),Qt,qe.type==="script"?Qt.projectRoot:g.cwd,jt,VS(),ht,Qe,Ze,et,qe.type==="script",Yt.env,void 0,D,j);un=qe.type!=="script"||zWt(nn)||nn.aborted===!0&&b?.aborted===!0,rn=nn.status===2&&!nn.backgrounded;let Pn=!un&&qe.type==="script"&&SK.has(he);if(Xt?.(),nn.aborted)return t(`${_e} [${It}] cancelled`),xe??="hook_cancelled",{command:It,succeeded:!1,output:"Hook cancelled",blocked:Pn,...b?.aborted&&{cancelled:!0}};if(t(`${_e} [${It}] completed with status ${nn.status}`),!un)return xe??="hook_did_not_run",{command:It,succeeded:!1,output:`script hook did not run (${wae(nn)})${nn.stderr.trim()?`: ${nn.stderr.trim()}`:""}`,blocked:Pn};let $n=GWt(nn),qn=Hce($n),En=qn.validationError,zn=Osn(nn,he,qn.json),xn=qOt(nn,he,$n,zn,(mo)=>Hce(mo).json);if(xn!==void 0)return xe??="hook_stdio_incomplete",{command:It,succeeded:!1,output:Xct(xn,nn.status,nn.stderr),blocked:VOt.has(he)};if(En&&nn.status!==2)throw Error(Xct(En,nn.status,nn.stderr));if(zn&&!d_e(zn))t(`Parsed JSON output from hook: ${_(zn)}`,{level:"verbose"});if(zn&&y0(zn))fFe(zn.metrics,Ze,he);bae(zn,_e);let Jn=zn&&y0(zn)&&zn.decision==="block",wn=nn.status===2||!!Jn||Pn,eo=Jn?zn&&y0(zn)&&zn.reason||nn.stderr||"":nn.status===0?nn.stdout||"":nn.stderr||"",to=zn&&y0(zn)&&zn.hookSpecificOutput&&"watchPaths"in zn.hookSpecificOutput?zn.hookSpecificOutput.watchPaths:void 0,ao=zn&&y0(zn)?zn.systemMessage:void 0;if(nn.status!==0&&!wn)xe??="hook_nonzero_exit";return{command:It,succeeded:nn.status===0,output:eo,blocked:wn,...nn.exitedNormally&&{exitCode:nn.status},watchPaths:to,systemMessage:ao}}catch(Yt){Xt?.();let Qt=Yt instanceof Error?Yt.message:String(Yt);return t(`${_e} [${It}] failed to run: ${Qt}`,{level:"error"}),xe??="hook_exec_failed",{command:It,succeeded:!1,output:Qt,blocked:SK.has(he)&&(rn||!un&&qe.type==="script")}}}),We;{let qe=new Map(ve.map((et,bt)=>[et.hook,bt]));using Qe=ve.length===0?void 0:iEe({hookEvent:he,hooks:ve.map(({hook:et})=>Iut(et)),agentId:K,toolName:MLe(g)});let Ze=Promise.all(be.map(({hook:et},bt)=>Ne[bt].finally(()=>{let ht=qe.get(et);if(ht!==void 0)Qe?.settle(ht)})));We=await($e===Lx?Ze:Ze.finally($e))}if(FWt(he,b))await oS();if(xe)m(BWe(he),xe);else if(Pe)p(BWe(he),"hook_cancelled");else y(BWe(he));for(let qe of new Set(be.map((Qe)=>Qe.pluginId)))if(qe)Rv(qe);return We};
function nBo(e){for(let n of["CLAUDE_PROJECT_DIR","CLAUDE_PLUGIN_ROOT","CLAUDE_PLUGIN_DATA"])e=e.replaceAll("${"+n+"}",()=>"${env:"+n+"}");return e};
function w1t(e,n){let r=e.findIndex((s)=>s.answersForEngine===!0);return e.toSpliced(r===-1?e.length:r,0,n)};
function cl(e){return`${pD}
${e}
${TOe}`};
return {I7e,Ihe,iwn,RQe,dwn,uwn,pwn,Y_e,gwn,hwn,jV,AQe,MQe,ywn,kwn,X_e,gke,wX,DT,cG,tnt,UAn,HAn,Txr,jAn,WAn,kxr,sHt,GAn,Lsn,LT,xQ,Slt,XG,Isn,GBn,Qrt,xve,Jrt,Zrt,CR,est,tst,JG,nst,kNn,ost,rst,sst,ist,ast,ENn,RNn,xNn,SRr,dst,cst,ust,DNn,NNn,pst,$Nn,xF,OQ,mst,gst,HNn,jNn,ZNn,eFn,VOt,Sst,Pve,tFn,qOt,kst,nFn,oFn,KOt,rFn,sFn,Osn,bst,Ait,C$n,KQ,tEe,L$n,N$n,F$n,Bit,$$n,B$n,Uit,$it,U$n,Hit,jit,ZOt,iEe,wjt,hLe,bjt,vjt,hae,yl,bct,jjt,BFo,UFo,HFo,zjt,Bjt,jFo,GFo,qFo,KFo,Ban,qjt,YFo,Kjt,Lx,XFo,SLe,QFo,JFo,bLe,Qjt,t$o,r$o,O$o,jWt,L$o,RLe,Oce,Xct,U$o,GWt,H$o,zWt,wae,IB,ALe,qWt,j$o,MLe,LLe,vae,e1t,U0o,H0o,j0o,fFe,s1t,c1t,FWt,hGn,Y0o,bae,AP,nBo,w1t,cl};
}
function module60(imports){

function Os(e){return e};
return {Os};
}
function module61(imports){
const Os=imports["Os"];
function xd(e,r,n){return Os(e).callTool(r,void 0,n)};
return {xd};
}
function module62(imports){

var mhe="io.modelcontextprotocol/clientCapabilities";
return {mhe};
}
function module63(imports){
const Os=imports["Os"];
const mhe=imports["mhe"];
const kxr=imports["kxr"];
const Lsn=imports["Lsn"];
function ut(e){return Os(e)};
function hf(e,n,r){let s=ut(e),h=s.getProtocolEra?.()==="modern"?{...n,_meta:{...n._meta,[mhe]:kxr(Lsn())}}:n;return s.callTool(h,r)};
return {ut,hf};
}
function module64(imports){

var qt=new Set(["synced-file staging not supported on this runner kind","CLAUDE_CODE_REMOTE_SESSION_ID unset","list returned incomplete credential"]);
function $so(e){if(qt.has(e))return e;if(/^(list|read) gated: [a-z-]{2,32}$/.test(e)||/^(list|read|write|mkdir) failed: (http \d{3}|[A-Za-z_-]{2,24}|-?\d{1,5})$/.test(e)||/^read truncated: got \d+ of \d+ bytes$/.test(e)||/^read stalled: no bytes for \d+ms$/.test(e))return e;return};
return {qt,$so};
}
function module65(imports){
const Hr=imports["Hr"];
var nar={invalid_path:"sad",unsupported_name:"sad",symlink_in_path:"sad",path_not_canonical:"sad",read_rule:"sad",not_found:"sad",not_a_directory:"sad",os_permission_denied:"sad",workspace_moved:"bad",unexpected_error:"bad"};
var c="list denied: ";
function LKt(e){if(!(e instanceof Hr))return;let n=e.errorClass;return n!==void 0&&h(n)&&e.message===`${c}${n}`?n:void 0};
function h(e){return Object.hasOwn(nar,e)};
return {nar,c,LKt,h};
}
const m0=module0({});
const m1=module1({"f":ports["lazySchema"],"o":ports["zString"],"uO":ports["policyHelperComposition"],"tR":ports["policyRecords"],"Le":m0["Le"]});
const m2=module2({"w0e":m1["w0e"],"Jzt":m1["Jzt"],"Ux":m1["Ux"],"yz":m1["yz"]});
const m3=module3({});
const m4=module4({"n":ports["execution"],"v":ports["rootExecution"],"c":ports["legacy"],"yo":m3["yo"]});
const m5=module5({});
const m6=module6({});
const m7=module7({"V":m4["V"],"Me":m0["Me"],"U":ports["execution"],"Le":m0["Le"],"lY":m6["lY"]});
const m8=module8({"C":ports["surfaceRegistry"],"U":ports["execution"],"a":ports["environment"],"cS":m4["cS"]});
const m9=module9({"yN":ports["crypto"]["createHash"],"bn":m5["bn"],"_":ports["stringify"],"cje":m7["cje"],"Vp":m7["Vp"],"sS":m7["sS"],"XIe":m7["XIe"],"hu":m8["hu"]});
const m10=module10({});
const m11=module11({"Yl":m2["Yl"],"V":m4["V"],"U":ports["execution"],"_i":m2["_i"],"el":m2["el"],"Jzt":m1["Jzt"],"qBe":m2["qBe"],"gn":m2["gn"],"k":ports["featureFlag"],"Dzo":m2["Dzo"],"bn":m5["bn"],"Gbe":m9["Gbe"],"c":m5["c"],"S":m5["S"],"ZS":m10["ZS"]});
const m12=module12({"Ag":m1["Ag"],"Oe":ports["hooksError"]});
const m13=module13({"N":m1["N"],"W":ports["types"]["isProxy"]});
const m14=module14({"ut":ports["mods"],"FQ":m13["FQ"]});
const m15=module15({});
const m16=module16({"Nz":m15["Nz"]});
const m17=module17({});
const m18=module18({"N":m1["N"],"Oe":ports["hooksError"]});
const m19=module19({"Dd":ports["sdkUserAbortError"],"bn":m5["bn"],"S":m5["S"],"P":ports["telemetrySafeError"]});
const m20=module20({"V":ports["memoize"],"ot":ports["os"]["homedir"]});
const m21=module21({});
const m22=module22({});
const m23=module23({"v":m22["v"]});
const m24=module24({});
const m25=module25({});
const m26=module26({"Z":m19["Z"],"Le":m0["Le"],"At":ports["essentialOnly"],"pEt":m19["pEt"]});
const m27=module27({"g9r":m25["g9r"],"eee":m26["eee"],"mO":m26["mO"],"f9r":m25["f9r"]});
const m28=module28({"M2e":m24["M2e"],"bf":m16["bf"],"FIe":m27["FIe"]});
const m29=module29({"_7e":m12["_7e"],"L":m17["L"],"Oe":ports["hooksError"],"Q7n":ports["modsEngine"],"Lts":m12["Lts"],"nd":m13["nd"],"Md":ports["types"]["isProxy"],"jjt":m18["jjt"],"gF":m13["gF"],"yyt":m12["yyt"],"EJn":m12["EJn"],"Nts":m12["Nts"],"npe":m12["npe"],"l":m19["l"],"Vd":ports["async_hooks"]["AsyncLocalStorage"],"at":m19["at"],"Syt":m18["Syt"],"re":m15["re"],"Ng":m19["Ng"],"ct":m20["ct"],"Ys":m21["Ys"],"N":m1["N"],"KF":m1["KF"],"YF":m1["YF"],"USn":m12["USn"],"Mts":m12["Mts"],"di":ports["omitBy"],"Szo":m12["Szo"],"Xl":ports["path"]["isAbsolute"],"WSn":m12["WSn"],"Fjt":m12["Fjt"],"Se":m22["Se"],"AJn":m23["AJn"],"_zo":m12["_zo"],"jQ":m28["jQ"],"nu":m1["nu"],"wf":m15["wf"],"Fm":m15["Fm"],"G":m17["G"],"_yt":m13["_yt"]});
const m30=module30({"qOe":ports["allowedSettingSources"],"va":ports["settingsStore"]});
const m31=module31({"Xo":m30["Xo"],"ZA":m2["ZA"],"$c":m2["$c"],"ge":ports["settingsForSource"]});
const m32=module32({"ut":ports["mods"],"t":ports["debug"],"gF":m13["gF"],"FQ":m13["FQ"],"ct":m20["ct"],"VVr":m13["VVr"],"Bjt":m13["Bjt"],"nd":m13["nd"],"zVr":m13["zVr"],"l":m19["l"],"_yt":m13["_yt"],"Oe":ports["hooksError"],"KVr":m13["KVr"],"PVr":m29["PVr"],"byt":m21["byt"],"Coe":m31["Coe"],"zn":ports["secureStorage"],"ZA":m2["ZA"],"BBe":m29["BBe"]});
const m33=module33({"ge":ports["settingsForSource"]});
const m34=module34({"bn":m5["bn"],"e":ports["crypto"]["createHash"]});
const m35=module35({"i":ports["analytics"],"c":m5["c"],"tme":m19["tme"],"Ue":ports["snakeCase"]});
const m36=module36({});
const m37=module37({"hOe":m36["hOe"],"G":ports["fs"]["readFileSync"],"pe":ports["fs"]["writeFileSync"],"w":ports["path"]["posix"],"wTn":m36["wTn"],"Rs":m4["Rs"],"V":m4["V"],"t":ports["debug"],"E":m19["E"],"i":ports["analytics"],"S":m5["S"],"O":ports["platform"],"a":ports["environment"],"gs":m0["gs"],"zo":ports["os"]["totalmem"],"Xe":ports["fs"]["mkdirSync"],"Nn":ports["fs"]["rmdirSync"],"y":m35["y"],"m":m35["m"],"so":m19["so"],"Ko":ports["fs"]["statSync"],"c":m5["c"]});
const m38=module38({});
const m39=module39({"a":ports["environment"]});
const m40=module40({"Ef":m15["Ef"],"see":m15["see"],"re":m15["re"],"Rs":m4["Rs"],"V":m4["V"],"bTn":m37["bTn"],"t":ports["debug"],"aKo":m9["aKo"],"cZ":m9["cZ"],"f":ports["lazySchema"],"u":ports["zObject"],"B":ports["zEnum"],"o":ports["zString"],"DM":m28["DM"],"uY":m8["uY"],"IJr":m38["IJr"],"Tje":m39["Tje"],"G_e":ports["traceparent"],"Ga":m37["Ga"]});
const m41=module41({"a":ports["environment"]});
const m42=module42({});
const m43=module43({"SXr":m1["SXr"],"M":ports["settingsPolicyContext"]});
const m44=module44({"V":m4["V"],"Me":m0["Me"],"L":m17["L"],"U":ports["execution"]});
const m45=module45({"Pzt":m1["Pzt"],"Awe":m1["Awe"],"Pje":m1["Pje"],"s9r":m7["s9r"],"ol":m44["ol"],"V":m4["V"],"U":ports["execution"],"t":ports["debug"],"N9r":m43["N9r"],"C":ports["subprocessScrubState"],"Le":m0["Le"],"gs":m0["gs"],"xSt":m43["xSt"],"use":m43["use"],"n9o":m43["n9o"],"aCn":m43["aCn"]});
const m46=module46({});
const m47=module47({"St":ports["httpClient"]});
const m48=module48({"Oz":m26["Oz"],"zK":m26["zK"],"ZZ":m26["ZZ"],"ret":m26["ret"],"aC":m26["aC"],"wT":m26["wT"],"Ru":m26["Ru"]});
const m49=module49({});
const m50=module50({"is":m20["is"],"u":ports["path"]["join"],"R":ports["os"]["homedir"]});
const m51=module51({});
const m52=module52({"S":ports["path"]["join"],"we":m50["we"],"de":ports["path"]["relative"],"A":ports["path"]["sep"],"ce":ports["path"]["isAbsolute"],"Xx":m51["Xx"],"a":ports["environment"],"Hd":m20["Hd"],"R":ports["path"]["join"],"z3t":m4["z3t"]});
const m53=module53({"R":ports["path"]["join"],"P":ports["path"]["resolve"],"Ee":m4["Ee"],"Fa":m52["Fa"]});
const m54=module54({});
const m55=module55({"s":ports["path/win32"],"Qx":m54["Qx"]});
const m56=module56({});
const m57=module57({});
const m58=module58({"k":ports["featureFlag"]});
const m59=module59({"mandatoryProcessWrapper":ports["mandatoryProcessWrapper"],"Dr":ports["registrationCommitted"],"oS":ports["registrationWait"],"SJn":m12["SJn"],"dd":m14["dd"],"di":ports["omitBy"],"en":m16["en"],"Ex":m29["Ex"],"Jo":ports["omit"],"S0":m32["S0"],"nJn":m29["nJn"],"Wb":m33["Wb"],"t":ports["debug"],"qH":ports["trustAccepted"],"d1t":ports["match"],"Dir":m5["Dir"],"el":m2["el"],"Gd":m2["Gd"],"fto":m4["fto"],"c":m5["c"],"G":m17["G"],"i":ports["analytics"],"ad":m5["ad"],"S":m5["S"],"an":m34["an"],"S_t":m9["S_t"],"_":ports["stringify"],"d":m26["d"],"m":m35["m"],"BWe":m35["BWe"],"a":ports["environment"],"k":ports["featureFlag"],"uF":ports["stopKeepalive"],"dF":ports["startKeepalive"],"ne":ports["diagnostics"],"I6o":m33["I6o"],"P6o":m33["P6o"],"aH":m40["aH"],"_s":ports["combinedAbort"],"VS":ports["crypto"]["randomUUID"],"d_e":m40["d_e"],"y0":m40["y0"],"Zve":ports["terminalSequence"],"V":m4["V"],"U":ports["execution"],"at":m19["at"],"Hl":ports["controlStreamClosedError"],"HHo":m40["HHo"],"dS":m4["dS"],"eNt":m40["eNt"],"Ja":m41["Ja"],"ee":m42["ee"],"Ts":m1["Ts"],"wO":m4["wO"],"cZ":m9["cZ"],"WMr":m40["WMr"],"pqn":m40["pqn"],"wdn":m40["wdn"],"GN":ports["invokeMcp"],"dZ":m9["dZ"],"l":m19["l"],"Hce":ports["commandParser"],"ys":ports["otel"],"tt":ports["initialSettings"],"BAn":ports["crypto"]["randomBytes"],"p8r":m43["p8r"],"etr":m45["etr"],"yje":m43["yje"],"Ko":ports["subprocessEnv"],"Pzt":m1["Pzt"],"FGt":m45["FGt"],"lzt":m43["lzt"],"azt":m43["azt"],"qF":m1["qF"],"dT":m43["dT"],"Yer":m45["Yer"],"xSt":m43["xSt"],"$9r":m43["$9r"],"FQe":m43["FQe"],"Qer":m45["Qer"],"WFo":ports["sandboxProxy"],"Hp":ports["proxyUrl"],"Ph":ports["bypassProxy"],"j0e":m46["j0e"],"sa":m47["sa"],"Hjt":ports["net"]["isIP"],"ot":m15["ot"],"LFo":ports["dns"]["lookup"],"Van":ports["httpParser"],"nLr":m40["nLr"],"Es":m4["Es"],"Net":m4["Net"],"SK":m1["SK"],"Ce":m4["Ce"],"Oet":m4["Oet"],"a1":ports["TaskOutput"],"Ec":ports["emitResponse"],"Y":ports["parse"],"O$n":ports["promises"]["access"],"I$n":ports["fs"]["constants"],"HWt":ports["path"]["basename"],"Mi":ports["enqueuePendingNotification"],"qi":m48["qi"],"zt":m25["zt"],"pD":m26["pD"],"TOe":m26["TOe"],"Ge":m4["Ge"],"Tt":ports["sessionRegistry"],"Dit":ports["registerAsync"],"O":ports["platform"],"rj":ports["hookShell"],"Co":m4["Co"],"F":m49["F"],"vG":m52["vG"],"x9":m53["x9"],"dc":ports["pathExists"],"ik":m32["ik"],"hpt":m32["hpt"],"P":ports["telemetrySafeError"],"Mxe":ports["pluginDataDir"],"gpt":m32["gpt"],"OAn":m55["OAn"],"Ur":m56["Ur"],"m$e":m40["m$e"],"Vn":ports["firstParty"],"At":ports["essentialOnly"],"Tvn":m45["Tvn"],"ft":ports["oauthEnabled"],"fn":ports["oauthTokens"],"nZ":ports["apiKey"],"Nrt":ports["hookEnvFile"],"P$o":ports["os"]["tmpdir"],"BWt":ports["os"]["homedir"],"GHo":m40["GHo"],"Sae":ports["child_process"]["spawn"],"N5e":m40["N5e"],"MA":ports["powershell"],"vK":ports["gitBashPath"],"IAn":m55["IAn"],"i3":ports["wrapSpawn"],"E":m19["E"],"Z8":m55["Z8"],"D$n":ports["path"]["isAbsolute"],"Mr":m15["Mr"],"nJ":ports["progressInterval"],"lt":m42["lt"],"zne":m40["zne"],"H$n":ports["activeHooksStore"],"Iut":m40["Iut"],"p":m35["p"],"y":m35["y"],"Rv":m11["Rv"],"L":m17["L"],"Un":m29["Un"],"Tg":m1["Tg"],"_z":ports["pick"],"aJ":m32["aJ"],"y9n":m57["y9n"],"IE":m58["IE"],"BP":ports["mcpGeneration"]});
const m60=module60({});
const m61=module61({"Os":m60["Os"]});
const m62=module62({});
const m63=module63({"Os":m60["Os"],"mhe":m62["mhe"],"kxr":m59["kxr"],"Lsn":m59["Lsn"]});
const m64=module64({});
const m65=module65({"Hr":m19["Hr"]});
return {"hookPluginMetadata":m11.hH,"pluginAliasRegistry":m11.b,"outside":m59.AP,"command":m59.IB,"classic":m59.NNn,"hasClassic":m59.Qrt,"terminal":m59.KQ,"http":m59.Ban,"pluginUsed":m11.Rv,"officialPlugin":m59.vae,"clearPluginActivity":m11.jNo,"invokeLegacy":m61.xd,"invokeModern":m63.hf,"mcpState":m7.qt,"dispatch":m29.Ex,"sites":m29.eu,"defaultCore":m29.ZGo,"runAnswers":m32.S0,"runOutput":m32.ypt,"runRefusal":m32.aJ,"composeMessages":m59.wX,"insertEngineAnswer":m59.w1t,"CW":m4.CW,"$so":m64.$so,"nar":m65.nar,"LKt":m65.LKt,sourceModule:file=>({"chunk-4s38z9x2.js":m0,"chunk-hrhfcbdv.js":m1,"chunk-h0r6byca.js":m2,"chunk-yptq0vrd.js":m3,"chunk-bn3p37gv.js":m4,"chunk-n4qghq20.js":m5,"chunk-h7x56jaz.js":m6,"chunk-758hjhx1.js":m7,"chunk-0a47xg8f.js":m8,"chunk-nankzm0s.js":m9,"chunk-xvq536p8.js":m10,"chunk-zj13ez1y.js":m11,"chunk-sthe7p0e.js":m12,"chunk-72fc0rrz.js":m13,"chunk-gk3p9fqk.js":m14,"chunk-eske5nfz.js":m15,"chunk-6re9qmwv.js":m16,"chunk-h3rrxdgy.js":m17,"chunk-nxj4t9f2.js":m18,"chunk-c9me9cp7.js":m19,"chunk-x954y317.js":m20,"chunk-3v9xv49a.js":m21,"chunk-870yz02b.js":m22,"chunk-bfnfpq58.js":m23,"chunk-xep95vq1.js":m24,"chunk-sx3wq5qp.js":m25,"chunk-amhtwhch.js":m26,"chunk-wb5qh1pz.js":m27,"chunk-x02yxv10.js":m28,"chunk-hhxhpvxp.js":m29,"chunk-s3exmmq6.js":m30,"chunk-tdtkpzh0.js":m31,"chunk-nzhr6ks9.js":m32,"chunk-n3ptvp2f.js":m33,"chunk-vh4tv488.js":m34,"chunk-9d2ykxmy.js":m35,"chunk-x918j25m.js":m36,"chunk-1nayt2j6.js":m37,"chunk-q6t47sex.js":m38,"chunk-wz6xag6e.js":m39,"chunk-09m4fzsj.js":m40,"chunk-sbndfme5.js":m41,"chunk-f2n7vgt8.js":m42,"chunk-f1vb7bx7.js":m43,"chunk-chme4mqf.js":m44,"chunk-8ptzhr8g.js":m45,"chunk-wj72kvg2.js":m46,"chunk-wrxh9xyj.js":m47,"chunk-bm2srtv9.js":m48,"chunk-ky674g9x.js":m49,"chunk-brnn4zwp.js":m50,"chunk-2z86j2rq.js":m51,"chunk-5fjw5n4x.js":m52,"chunk-qyyaty2v.js":m53,"chunk-nc9hhjpp.js":m54,"chunk-2ejbgdvw.js":m55,"chunk-kby37ryb.js":m56,"chunk-jcz2qb1f.js":m57,"chunk-x0bfz90y.js":m58,"chunk-mphp7acd.js":m59,"chunk-3c9s3x4q.js":m60,"chunk-fdjgzr8v.js":m61,"chunk-27kqvvhz.js":m62,"chunk-amg94xhm.js":m63,"chunk-1b45yw62.js":m64,"chunk-1acz4ecf.js":m65})[file]};
}
