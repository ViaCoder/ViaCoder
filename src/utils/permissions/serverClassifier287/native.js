// Pinned 287 whole declarations; session request latches remain on the existing host.
function policy(ports){
const {He,GF,a,ol,mf,f,u,o,se,LF}=ports;
function Ta(e,s=!1){return e==="auto"||e==="plan"&&!s&&mf()};
function Yoe(){let e=He();return e==="firstParty"||GF(e)||e==="foundry"};
function rK(){return a.CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS||qM()};
function qM(){return ol("hipaa")};
function Im(){return Yoe()&&!rK()};
var l1=f(()=>u({lineage:o().min(1),source:se().optional()}));
function J_t(e){let s=l1().safeParse(e);if(!s.success)return;let{lineage:r,source:n}=s.data;return{lineage:r,source:n==="typed"||n==="relay"||n==="owner"?n:"unattributed"}};
return {Im,qM,Ta,J_t};
}

function constants(ports){
const {}=ports;
var MCn="Auto mode unavailable \u2014 stopped after repeated responses with no safety verdict";
var LCn="Auto mode could not evaluate this action and is blocking it for safety";
return {MCn,LCn};
}

function backoff(ports){
const {}=ports;
function pC({attempt:t,baseMs:r,capMs:e=1/0,factor:o=2,jitter:n={kind:"none"},random:m=Math.random}){let i=Math.min(e,r*o**(t-1));switch(n.kind){case"none":return i;case"proportional":return i+m()*n.ratio*i;case"symmetric":return Math.max(0,i+i*n.ratio*(2*m()-1));case"full":{let a=Math.min(n.floorMs,i);return a+m()*(i-a)}}};
return {pC};
}

function retry(ports){
const {pC}=ports;
var pe=500;
function sL(e,r,n=32000,s=Math.random){let a=Math.round(pC({attempt:e,baseMs:pe,capMs:n,jitter:{kind:"proportional",ratio:0.25},random:s}));if(r){let o=parseInt(r,10);if(!isNaN(o))return Math.max(o*1000,a)}return a};
var N8="safety_monitor_blocked";
return {sL,N8};
}

function served(ports){
const {a,Vn,uo,EL}=ports;
function u(){if(a.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST)return!1;return!Vn()};
function l(){return a.CLAUDE_CODE_CUSTOM_OAUTH_URL!==void 0};
function Ch(){return u()||uo()!==null||EL()||l()};
return {Ch};
}

function gitConstants(ports){
const {}=ports;
var yn=Object.freeze(["-c","core.hooksPath=/dev/null","-c","core.fsmonitor="]);
var iTn=2000;
var WZe=Object.freeze([...yn,"-c","safe.bareRepository=explicit","-c","protocol.file.allow=never"]);
return {WZe,iTn};
}

function providers(ports){
const {a,He}=ports;
function GF(e=He()){return e==="anthropicAws"||e==="anthropicGoogleCloud"};
function Czt(){let e=a.ANTHROPIC_BASE_URL;if(He()!=="firstParty"||!e||a.ANTHROPIC_UNIX_SOCKET!==void 0||ry(e))return;try{return new URL(e).host||void 0}catch{return}};
function ry(e){try{let t=new URL(e).host;return["api.anthropic.com"].includes(t)}catch{return!1}};
var F="[a-z]{2,4}(?:-[a-z]{2,5})?-[a-z]+-\\d+";
var h="[a-z]+(?:-[a-z]+\\d+)?";
var V="(?:amazonaws\\.(?:com(?:\\.cn)?|eu)|api\\.aws|c2s\\.ic\\.gov|sc2s\\.sgov\\.gov|cloud\\.adc-e\\.uk|csp\\.hci\\.ic\\.gov)";
function y(e){return new RegExp(`^(?:vpce-[a-z0-9-]+\\.)?${e}(?:-fips)?\\.${F}\\.(?:vpce\\.)?${V}$`)};
var E={firstParty:void 0,gateway:void 0,bedrock:{variables:[{name:"ANTHROPIC_BEDROCK_BASE_URL"},{name:"AWS_ENDPOINT_URL_BEDROCK_RUNTIME"},{name:"AWS_ENDPOINT_URL_BEDROCK"},{name:"AWS_ENDPOINT_URL"}],ownHost:y("bedrock(?:-runtime)?")},mantle:{variables:[{name:"ANTHROPIC_BEDROCK_MANTLE_BASE_URL"}],ownHost:y("bedrock-mantle")},anthropicAws:{variables:[{name:"ANTHROPIC_AWS_BASE_URL"}],ownHost:y("aws-external-anthropic")},vertex:{variables:[{name:"ANTHROPIC_VERTEX_BASE_URL"}],ownHost:new RegExp(`^(?:aiplatform|${h}-aiplatform|aiplatform\\.${h}\\.rep|[a-z0-9-]+\\.p)\\.googleapis\\.com$`)},anthropicGoogleCloud:{variables:[{name:"ANTHROPIC_GOOGLE_CLOUD_BASE_URL"}],ownHost:new RegExp(`^(?:claude|claude\\.${h}\\.rep|[a-z0-9-]+\\.p)\\.googleapis\\.com$`)},foundry:{variables:[{name:"ANTHROPIC_FOUNDRY_BASE_URL"},{name:"ANTHROPIC_FOUNDRY_RESOURCE",urlOf:(e)=>`https://${e}.services.ai.azure.com`}],ownHost:/^[a-z0-9-]{2,64}\.(?:services\.ai|cognitiveservices|openai)\.azure\.(?:com|us|cn)$/}};
function Ktr(e){return E[e]?.variables??[]};
function w(e,t){let n=E[e],r;try{r=new URL(t)}catch{return"unparsable"}let s=r.hostname.toLowerCase().replace(/\.$/,"");if(n===void 0||!n.ownHost.test(s))return"foreign";return r.protocol==="https:"?"own":"insecure"};
function F8r(e,t){return w(e,t)==="own"};
return {Czt,Ktr,F8r,GF};
}

function reminder(ports){
const {J_t,a,Ch,ko,k}=ports;
var lJe="slack_bot";
function Jb(e){return e===void 0||e.kind==="human"};
function aZn(e){return e.verifiedSlackHumanTurn===!0&&e.isMeta!==!0&&Jb(e.origin)};
function nm(e){return e===void 0||e.kind==="unclassified"};
function Bk(e){return e?.kind==="task-notification"&&e.subkind==="projects-relay"};
function Hy(e){return e===void 0||e.kind==="human"||e.kind==="auto-continuation"};
var vR=Object.freeze({kind:"task-notification"});
function f_t(e){return e.origin??(e.commandMode==="task-notification"?vR:void 0)};
function m_t(e){let n=f_t(e);if(e.isMeta===!0&&nm(n))return{frame:"invisible",reason:"meta-without-provenance"};if(e.isCompactSummary===!0)return{frame:"summary"};if(n?.kind==="peer"&&n.inbound_origin===lJe)return{frame:"invisible",reason:"slack-bot"};if(Bk(n))return{frame:"invisible",reason:"projects-relay"};if(aZn({...e,origin:n}))return{frame:"relay-human"};if(n===void 0)return{frame:"human",kind:"unstamped"};if(Hy(n))return{frame:"human",kind:n.kind==="auto-continuation"?"auto-continuation":"human"};let r=n.kind;switch(r){case"task-notification":case"coordinator":case"channel":case"peer":case"slack-ping":case"observer":case"observer-activity":case"plugin":case"unclassified":return{frame:"non-user",kind:r,origin:n};default:return{frame:"non-user",kind:"unclassified",origin:n}}};
function kF(e){if(typeof e==="string")return e;if(Array.isArray(e))return e.filter((n)=>typeof n==="object"&&n!==null&&("type"in n)&&n.type==="text"&&("text"in n)&&typeof n.text==="string").map((n)=>n.text).join(`
`);return""};
function H3r(e){if(J_t(e.forwardedIntent)!==void 0)return"forwarded_turn";if(m_t(e).frame==="invisible")return;switch(e.origin?.kind){case"peer":return e.origin.activityObservation===void 0?"peer":void 0;case"coordinator":return"coordinator";default:return}};
var Su={reader:null};
var CR="tengu_worker_owner_rows_killswitch";
function TR(){return Su.reader?.(CR,!1)??!1};
function hm(e){return e==="owner"&&TR()?"unattributed":e};
var D3r="session-user";
var cZn="channel-participant";
var M3r="project-owner";
var L3r="unattributed";
function dZn(e){switch(e){case"typed":return D3r;case"relay":return cZn;case"owner":return M3r;case"unattributed":return L3r}};
var N3r=/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,9})?(?:Z|[+-]\d{2}:\d{2})$/;
function Dwn(e){if(e.type!=="queued_command")return;let n=J_t(e.forwardedIntent);if(n===void 0)return;let r=kF(e.prompt);if(r.trim()==="")return;let s=hm(n.source),{lineage:g}=n,{timestamp:h}=e;return typeof h==="string"?{lineage:g,text:r,source:s,timestamp:h}:{lineage:g,text:r,source:s}};
function nz(){return!Ch()};
function IS(){return!a.DISABLE_GROWTHBOOK&&nz()};
function lo(e,n){let r=ko().pinnedFeatureValues??=new Map;if(!r.has(e))r.set(e,k(e,n));return r.get(e)};
return {H3r,Dwn,N3r,dZn,IS,lo};
}

function reminderIds(ports){
const {Le}=ports;
var aet='<system-reminder id="';
var SEe='">';
var U=/^[0-9a-f]{16,32}$/;
var P=32;
function XWe(e){return typeof e==="string"&&U.test(e)};
function kOe(e){if(!e.startsWith(aet))return;let r=aet.length,n=e.slice(r,r+P+SEe.length+1),s=n.indexOf(SEe),i=s===-1?void 0:n.slice(0,s);return XWe(i)&&n.startsWith(`${SEe}
`,s)?i:void 0};
function mwt(){if(process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC)return"essential-traffic";if(process.env.DISABLE_TELEMETRY)return"no-telemetry";if(Le(process.env.DO_NOT_TRACK))return"no-telemetry";return"default"};
function EL(){return mwt()!=="default"};
return {XWe,kOe,EL};
}

function ids(ports){
const {}=ports;
var k=/_(\d+)$/;
function _Re(e){let r=k.exec(e);return r?e.slice(0,-r[0].length):void 0};
return {_Re};
}

function sanitize(ports){
const {}=ports;
function en(e){return Bun.stripANSI(e)};
return {en};
}

function runtime(ports){
const {He,a,Js,Im,GF,qM,cno,_ir,bir,Sir,sL,t,l,i,Czt,Ktr,F8r,uo,pno,Bs,MCn,wkn,lno,f,T,u,o,Wo,x,de,se,B,V,U,Ta,ko,Le,fee,k,_Re,LCn,en,_,S,H,C,XWe,H3r,Dwn,N3r,dZn,kOe,x6r,pe,Qr,re,lo,Ut,Wbe,ot,Je,vt,WZe,Qo,iTn,Dn,YS,HG,Nn,M8,wc,jue,Ue,wt,rt,Qyt,Ioe,Uqr,Bqr}=ports;
var ROt=/[\p{Cf}\p{Default_Ignorable_Code_Point}]/gu;
var {open:N9e,close:$9e,slash:U_n}=M8;
function BM(e,n){return n.replace(ROt,"").replace(new RegExp(`[${N9e}]([\\s${U_n}]*${wc(e)}\\b(?:[^${N9e}${$9e}]*[${$9e}])?)`,"gi"),(r,s)=>"["+s)};
var UM="forwarded_user_turns";
var mS="forwarded_turn";
var H_n=["transcript",UM,mS];
function oT(e){let n=e;for(let r of H_n)n=BM(r,n);return n};
var ykn=64;
var S8e=200;
var mAo=256000;
var w8e=1024;
var v8e=16;
var _kn=128000;
var T8e=1024;
var jRr=4096;
var A2n=32;
var gsn=256;
var E8e=260;
var f_e=f(()=>B(["public","private","unknown"]));
var x8e=f(()=>u({enabled:H(),baselines:de(o(),o()),tabs:de(o(),de(o(),o())).optional()}));
var Tkn=f(()=>u({cwd:o(),root:o().nullable(),branch:o().nullable(),default_branch:o().nullable(),status:u({clean:H(),counts:u({staged:C(),modified:C(),untracked:C().nullable(),untracked_normal:C().nullable()}).nullable(),porcelain:o().nullable(),truncated:H()}).nullable(),visibility:u({origin:u({host:o(),remote:o(),visibility:f_e()}).nullable(),push_remote:o().nullable(),remotes:T(u({name:o(),host:o(),remote:o(),visibility:f_e()})),visibility_cache:T(u({host:o(),remote:o(),visibility:f_e()}))}).nullable(),error:B(["timeout","not_a_repo","error","pending"]).optional(),truncated:H().optional()}));
var k_e=f(()=>u({git_state:Tkn().optional(),chrome_navigation:x8e().optional(),live_cwd:o().optional(),platform:o().optional()}));
var A8e=64;
var b_e=200;
var v_e=1024;
var M8e=64;
function Kte(e){return Buffer.byteLength(_(e))};
function C8e(e,n,r,s){if(e.length<=n)return e;return r[s]=!0,e.slice(0,n)};
function R8e(e,n,r){if(r>0)e.dropped[n]=(e.dropped[n]??0)+r};
function gAo(e,n){let r=ykn,s=0,g={bytes:0,allowDropped:0};for(;;){let h={pathClamped:!1,identityClamped:!1,listCapped:!1,spellingsShed:!1,dropped:{...e.dropped}},b=(Te)=>C8e(Te,w8e,h,"pathClamped"),w=(Te)=>({rule:Te.rule,...Te.canonical!==void 0&&{canonical:Te.canonical},source:Te.source,...Te.root!==void 0&&{root:Te.root===null?null:b(Te.root)},...Te.pattern!==void 0&&{pattern:Te.pattern}}),D=(Te,xe)=>{let Pe=Te==="allow"?S8e:w8e,$e=xe.filter((Ne)=>Ne.rule.length<=Pe);if(R8e(h,Te,xe.length-$e.length),Te!=="allow"||$e.length<=r)return $e.map(w);return R8e(h,Te,$e.length-r),$e.slice(0,r).map(w)},j=()=>e.truncated===!0||h.pathClamped||h.identityClamped||h.listCapped||h.spellingsShed,z=(Te)=>{if(s>=2&&Te.resolved.length>0)h.spellingsShed=!0;return{path:b(Te.path),resolved:s>=2?[]:Te.resolved.map(b)}},K=e.trusted_directories.additional.slice(0,v8e);if(K.length<e.trusted_directories.additional.length)h.listCapped=!0;let he=e.trusted_directories.network.slice(0,v8e).map(b);if(he.length<e.trusted_directories.network.length)h.listCapped=!0;let _e={permission_mode:e.permission_mode,platform:e.platform,live_cwd:b(e.live_cwd),home_dir:b(e.home_dir),rule_roots:Qr(e.rule_roots,b),trusted_directories:{primary:z(e.trusted_directories.primary),additional:K.map((Te)=>({...z(Te),source:Te.source})),network:he,block_reads_outside_working_directories:e.trusted_directories.block_reads_outside_working_directories},rules:{allow:D("allow",e.rules.allow),deny:D("deny",e.rules.deny),ask:D("ask",e.rules.ask)},auto_mode:{allow:[...e.auto_mode.allow],soft_deny:[...e.auto_mode.soft_deny],hard_deny:[...e.auto_mode.hard_deny],environment:[...e.auto_mode.environment]},artifact_consent_holdback:e.artifact_consent_holdback,...e.chrome_navigation!==void 0&&{chrome_navigation:e.chrome_navigation},case_insensitive_paths:e.case_insensitive_paths,restricted:e.restricted,is_remote_mode:e.is_remote_mode,classify_all_shell:e.classify_all_shell,user_identity:e.user_identity===null?null:C8e(e.user_identity,S8e,h,"identityClamped"),...Object.keys(h.dropped).length>0&&{dropped:h.dropped},...j()&&{truncated:!0}},ke=Kte(_e);if(s===0)g={bytes:ke,allowDropped:h.dropped.allow??0};let be=ke>_kn;if(be){if(s===0||s===1&&r>0){s=1,r=Math.floor(r/2);continue}if(s<2){s++;continue}}let ve=be?{..._e,truncated:!0}:_e;if(ve.truncated===!0||ve.dropped!==void 0)n({bytes:ve===_e?ke:Kte(ve),bytesBeforeShedding:g.bytes,overCapBeforeShedding:s>0,overCap:be,allowRulesShed:(h.dropped.allow??0)-g.allowDropped,resolvedSpellingsShed:h.spellingsShed,pathClamped:h.pathClamped,identityClamped:h.identityClamped,additionalDirectories:e.trusted_directories.additional.length,networkRoots:e.trusted_directories.network.length,arrivedTruncated:e.truncated===!0,truncated:ve.truncated===!0,dropped:h.dropped,denyRules:e.rules.deny.length,askRules:e.rules.ask.length,autoMode:{allow:e.auto_mode.allow.length,softDeny:e.auto_mode.soft_deny.length,hardDeny:e.auto_mode.hard_deny.length,environment:e.auto_mode.environment.length}});return ve}};
function hAo(e){let n=e.truncated===!0,r=(w)=>{if(w.length<=T8e)return w;return n=!0,w.slice(0,T8e)},s=(w)=>w===null?null:r(w),g=(w)=>{if(w.length<=E8e)return w;return n=!0,w.slice(0,E8e)},h=(w,D)=>{if(w.length>D)n=!0;return w.slice(0,D)},b=e.visibility;return{cwd:r(e.cwd),root:s(e.root),branch:s(e.branch),default_branch:s(e.default_branch),status:e.status,visibility:b===null?null:{origin:b.origin===null?null:{...b.origin,host:g(b.origin.host)},push_remote:s(b.push_remote),remotes:h(b.remotes,A2n).map((w)=>({...w,host:g(w.host)})),visibility_cache:h(b.visibility_cache,gsn).map((w)=>({...w,host:g(w.host)}))},...e.error!==void 0&&{error:e.error},...n&&{truncated:!0}}};
class O8e{inFlight=new Map;judged=new Map;recordRequest(e,n){this.inFlight.set(e,n)}settleRequest(e,n){let r=this.inFlight.get(e);if(r===void 0)return;this.inFlight.delete(e);let s={request:e,context:r};for(let g of n)this.judged.set(g,s)}forgetRequest(e){this.inFlight.delete(e)}historyFor(e){return this.judged.get(e)}reset(){this.inFlight.clear(),this.judged.clear()}};
var Lkn=new V(()=>new O8e);
function $3(){return Lkn.of(U().host)};
function D8e(e,n){$3().recordRequest(e,n)};
function L8e(e,n){$3().settleRequest(e,n)};
function F8e(e){$3().forgetRequest(e)};
function eXe(e){let n=[],r=new Map;for(let s of e){if(s.type!=="user")continue;let g=s.serverClassifierContext;if(g===void 0)continue;let h=s.message.content;if(!Array.isArray(h))continue;let b=h.filter((z)=>typeof z==="object"&&z!==null&&z.type==="tool_result");if(b.length!==1)continue;let w=b[0].tool_use_id;if(typeof w!=="string"||w.length>b_e)continue;let D=Nkn(g);if(D===void 0)continue;let j=r.get(D.request);if(j===void 0)j={tool_use_ids:[],context:D.context},r.set(D.request,j),n.push(j);if(j.tool_use_ids.length<A8e&&!j.tool_use_ids.includes(w))j.tool_use_ids.push(w)}return n};
function tXe(e,n){let r=new Map;for(let h of e){if(h.type!=="attachment"||h.attachment.type!=="queued_command")continue;let{attachment:b}=h,w=b.reminderId;if(!XWe(w)||r.has(w)||b.renderedByBatchHead||b.reminderUnlisted!==void 0)continue;let D=H3r(b);if(D===void 0)continue;if(D==="forwarded_turn"){let j=Dwn(b);if(j===void 0)continue;let z=j.source==="owner"&&j.timestamp!==void 0&&j.timestamp.length<=M8e&&N3r.test(j.timestamp)?j.timestamp:void 0;r.set(w,{provenance:D,author:dZn(j.source),...z!==void 0&&{written:z}})}else r.set(w,{provenance:D})}if(r.size===0)return[];let s=[],g=new Set;for(let h of n){if(h.type!=="user")continue;let b=h.message.content,w=typeof b==="string"?[b]:b.flatMap((D)=>D.type==="text"?[D.text]:[]);for(let D of w){let j=kOe(D);if(j===void 0||g.has(j))continue;let z=r.get(j);if(z===void 0)continue;g.add(j),s.push({id:j,...z})}}return s.length>v_e?s.slice(s.length-v_e):s};
function Nkn(e){if(typeof e!=="object"||e===null)return;let{request:n,context:r}=e;if(typeof n!=="string"||n.length===0)return;let s=k_e().safeParse(r);return s.success?{request:n,context:s.data}:void 0};
var Xve="host_context";
var Qve="result_from";
var Jve="host_context_live";
var Sit=2000;
function QOt(e){try{let n=new URL(e),r=n.origin==="null"?`${n.protocol}//${n.host}`:n.origin;return re(r,Sit)}catch{return re(e,Sit)}};
function Cc(e){if(e.name.startsWith(HG))return"skill_tool";let n=String(Nn(e.name));if(n!==e.name)return n;if(e.mcpInfo!==void 0)return"mcp_tool";if(e.name.startsWith("eval_registered__"))return"eval_registered";if(e.uiTableKey!==void 0||e.name.includes("__"))return"dynamic_tool";return e.name};
function TRe(e,n){if(!e)return;e((r)=>{if(r.checking.has(n))return r;let s=new Set(r.checking);return s.add(n),{...r,checking:s}})};
function tne(e,n){if(!e)return;e((r)=>{if(!r.checking.has(n))return r;let s=new Set(r.checking);return s.delete(n),{...r,checking:s}})};
function RPe(){return!1};
var Nso="tengu_smooth_chipmunk";
function VEt(){let e=ko();return e.autoModeContextEnabled??=Fso()??k(Nso,!0),e.autoModeContextEnabled};
function Fso(){return};
var $so="tengu_iridescent_crystal";
function xPe(){return k($so,!1)};
function MPe(){return k("tengu_quiet_lantern",!0)};
var Bso="tengu_tranquil_summit";
function YEt(){return k(Bso,!0)};
var Uso="tengu_mutable_teapot";
function uRo(){return lo(Uso,!0)};
function XEt(){let e=ko();return e.thirdPartyServerClassifierEnabled??=OPe()??!(a.CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS&&!a.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST),e.thirdPartyServerClassifierEnabled};
function OPe(){let e=ko();if(e.userServerClassifierSwitch===void 0){let n=a.CLAUDE_CODE_AUTO_MODE_SERVER;e.userServerClassifierSwitch=n===void 0?null:Le(n)}return e.userServerClassifierSwitch};
var Hso=(e,n)=>{let r=setTimeout(e,n);return()=>clearTimeout(r)};
var qS=10;
function kK(e){return e??"main"};
var jso=!0;
async function QEt(e,n){let r=cno(e);if(r!==void 0)return r.position>=qS?{kind:"stop",position:r.position,recorded:!1}:{kind:"deny",position:r.position,interrupted:!await r.waited};let s=_ir(n.runKey);if(n.signal.aborted)return{kind:"deny",position:s,interrupted:!0};if(jso&&s>=qS)bir(n.runKey),s=0;let g=s+1;if(g>=qS)return Sir(e,{runKey:n.runKey,position:g,waited:Promise.resolve(!0)}),{kind:"stop",position:g,recorded:!0};let h=Wso(g),b=Gso(h,g,n);return Sir(e,{runKey:n.runKey,position:g,waited:b}),{kind:"deny",position:g,interrupted:!await b}};
function Doe(e){if(_ir(e)>0)bir(e)};
function Wso(e){return sL(e)};
function Gso(e,n,{signal:r,scheduleTimeout:s=Hso,onWait:g}){let h=(b)=>{try{g?.(b)}catch(w){t(`[server-classifier] retry banner update failed: ${l(w)}`,{level:"warn"})}};return new Promise((b)=>{let w=()=>{},D=(z)=>{w(),r.removeEventListener("abort",j),h(null),b(z)},j=()=>D(!1);r.addEventListener("abort",j,{once:!0}),h({position:n,limit:qS,delayMs:e}),w=s(()=>D(!0),e)})};
function JEt(e,n){if(e===void 0)return!1;if(e.startsWith("server_call_unavailable_"))return e!=="server_call_unavailable_truncated";return e.startsWith("server_unavailable_")||e==="server_stream_ended"||e==="server_unrecognized_result"||!n&&(e==="server_no_result"||e==="server_unsupported"||e==="server_thread_unsupported")};
function ZEt(e){return`Auto mode is unavailable: the server returned no safety verdict for ${qS} responses in a row, so ${e} was not run and this turn has ended. Wait for the user's next message before doing anything further.`};
function OO(e,n,r){return`${`${LCn}${n==="policy_refusal"&&r==="refusal"?" \u2014 a safety check separate from auto mode blocked this request because of earlier conversation content \u2014 it isn't about the action itself":""}`} \u2014 run with --debug for details`};
var LPe="dangerous_tool_use";
var zso=f(()=>Wo("type",[u({type:x("evaluated"),outcome:B(["flagged","not_flagged"]),explanation:o().nullish().transform((e)=>e??void 0).optional()}),u({type:x("skipped")}),u({type:x("unavailable"),reason:o()})]));
var qso=f(()=>Wo("type",[u({type:x("available"),tool_uses:de(o(),se())}),u({type:x("unsupported")}),u({type:x("unavailable"),reason:o()})]));
var Kso=f(()=>T(u({type:o()}).loose()));
var Vso=["disabled","error"];
var Yso=["timeout","error","refused","input_too_long","truncated"];
function eCt(e,n){return e.includes(n)?n:"other"};
function Xso(e){let n=typeof e==="object"&&e!==null?e.safeguard_results:void 0;if(n===void 0||n===null)return{kind:"none",why:"server_no_result"};let r=Kso().safeParse(n);if(!r.success)return{kind:"none",why:"server_unrecognized_result"};let s=r.data.filter((h)=>h.type===LPe);if(s.length===0)return{kind:"none",why:"server_no_result"};if(s.length>1)return{kind:"none",why:"server_unrecognized_result"};let g=qso().safeParse(s[0].status);if(!g.success)return{kind:"none",why:"server_unrecognized_result"};switch(g.data.type){case"unsupported":return{kind:"none",why:"server_unsupported"};case"unavailable":return{kind:"none",why:`server_unavailable_${eCt(Vso,g.data.reason)}`};case"available":{let h=new Map;for(let[b,w]of Object.entries(g.data.tool_uses)){let D=zso().safeParse(w);h.set(b,D.success?D.data:{type:"unrecognized"})}return{kind:"per_call",statuses:h}}}};
class FPe{key;sentArtifacts;sentThread;runKey;#e=void 0;#t=void 0;#n=!1;#o=()=>{};#r;constructor(e,n,r,s){this.key=e,this.sentArtifacts=n,this.sentThread=r,this.runKey=s,this.#r=new Promise((g)=>{this.#o=g})}settle(e){if(this.#e!==void 0)return!1;return this.#e=e,this.#t=Date.now(),this.#o(e),!0}results(){return this.#e!==void 0?Promise.resolve(this.#e):this.#r}settledAt(){return this.#t}noteRewrittenCall(){this.#n=!0}hasRewrittenCall(){return this.#n}toJSON(){return}};
function tCt(e,n={}){return new FPe(e,n.artifacts,n.thread===!0,kK(n.agentId))};
function GR(e){return e instanceof FPe?e:void 0};
function $Pe(e){return{serverClassifierRequest:e.key,serverClassifierResults:e}};
function nCt(e,n,r){let s=Qso(e,Xso(n));L8e(e.key,s.kind==="per_call"?[...s.statuses].filter(([,h])=>h.type==="evaluated").map(([h])=>h):[]);let g=GR(e);if(!(g?.settle(s)??!1))return;if(g!==void 0&&s.kind==="per_call"&&Jso(s.statuses,r))Doe(g.runKey);return s};
function Qso(e,n){if(e.sentThread&&n.kind==="none"&&n.why==="server_unsupported"){if(!wkn())lno(),t("[server-classifier] the API answered unsupported to a request sent on a message thread; this session sends its later requests without a thread so the server can classify them",{level:"warn"});return{kind:"none",why:"server_thread_unsupported"}}return n};
function Jso(e,n){if(n===void 0)return[...e.values()].some((r)=>r.type==="evaluated");for(let r of n)if(e.get(r)?.type==="evaluated")return!0;return!1};
function UPe(e){return e.kind==="none"&&(e.why==="server_unsupported"||e.why==="server_unavailable_disabled"||e.why==="server_no_result")};
function jPe(e){F8e(e.key),GR(e)?.settle({kind:"none",why:"server_stream_ended"})};
function wK(){let e=He();switch(e){case"firstParty":if(a.ANTHROPIC_UNIX_SOCKET!==void 0)return a.CLAUDE_CODE_ENTRYPOINT==="ssh-remote"?"firstParty":"thirdParty";return Js()?"firstParty":"thirdParty";case"bedrock":case"mantle":case"vertex":case"foundry":case"anthropicAws":case"anthropicGoogleCloud":case"gateway":return"thirdParty";default:return e}};
function v7(e){if(!Ta(e)||!$oe())return"off";if(wK()==="thirdParty")return XEt()&&!fee()&&!RPe()&&!(He()==="firstParty"&&xPe())?"arbiterWithLocalFallback":"off";let n=OPe();if(n===!1)return"off";if((n??VEt())&&!xPe()&&!fee()&&!RPe())return"arbiter";return"off"};
function $oe(){switch(wK()){case"firstParty":return Im();case"thirdParty":{let e=He();return e==="firstParty"||GF(e)?Im():!qM()}}};
function KHt(e){return e==="arbiter"||e==="arbiterWithLocalFallback"};
var bK="The server-side auto mode classifier";
var Zso=2000;
var eio=". If you have other tasks";
function tio(e){if(e===void 0)return;let n=en(e).replace(/[\u0000-\u001f\u007f-\u009f]/g," ").replace(/\s+/g," ").trim(),r=n.indexOf(eio);return r===-1?n:n.slice(0,r).trim()};
function RK(e,n){if(e.kind!=="per_call")return;let r=e.statuses.get(n);if(r!==void 0)return r;let s=_Re(n);return s===void 0?void 0:e.statuses.get(s)};
function oE(e,n){let r=RK(e,n);return r?.type==="evaluated"?void 0:oio(e,r)};
function Boe(e){return e==="server_not_requested"||e==="server_input_rewritten"};
function nio(e,n){return e==="arbiterWithLocalFallback"&&(UPe(n)||n.kind==="none"&&Boe(n.why))};
function iCt(e,n,r){if(e==="arbiter")return MPe()&&n.kind==="none"&&(n.why==="server_no_result"||n.why==="server_unsupported");if(e!=="arbiterWithLocalFallback")return!1;if(nio(e,n))return!0;if(n.kind==="none")return n.why.startsWith("server_unavailable_")||n.why==="server_results_not_held";let s=RK(n,r);if(s===void 0)return!0;return s.type==="unavailable"&&s.reason!=="truncated"};
function oio(e,n){if(e.kind==="none")return e.why;if(n===void 0)return"server_no_result";switch(n.type){case"skipped":return"server_call_skipped";case"unavailable":return`server_call_unavailable_${eCt(Yso,n.reason)}`;case"unrecognized":return"server_unrecognized_result"}};
function rio(e){if(e.serverClassifierInputRewritten===!0)return Promise.resolve({kind:"none",why:"server_input_rewritten"});let n=GR(e.serverClassifierResults);if(n!==void 0)return n.results();return Promise.resolve({kind:"none",why:e.serverClassifierRequest!==void 0?"server_results_not_held":"server_not_requested"})};
function aCt(e,n){let r=e.serverClassifierInputRewritten===!0,s=GR(r?e.serverClassifierReviewLeftBehind:e.serverClassifierResults);if(s===void 0)return rio(e);return s.results().then((g)=>{let h=RK(g,n);return(r?h?.type==="evaluated"||h?.type==="skipped":s.hasRewrittenCall()&&lCt(h))?{kind:"none",why:"server_input_rewritten"}:g})};
function lCt(e){return e?.type==="evaluated"&&e.outcome==="not_flagged"};
function cCt(e,n,r){let s=RK(e,n);if(s?.type!=="evaluated"){if(s?.type==="unavailable"&&s.reason==="refused"&&YEt())return{model:bK,durationMs:0,shouldBlock:!0,refusedBySafeguard:!0,failureMode:"policy_refusal",errorKind:oE(e,n),reason:OO("server","policy_refusal","refusal")};return((s===void 0?e.kind!=="none"||e.why!=="server_unrecognized_result":s.type==="skipped")?r():void 0)??{model:bK,durationMs:0,shouldBlock:!0,unavailable:!0,errorKind:oE(e,n),reason:"Classifier unavailable - blocking for safety"}}let g=s.outcome==="flagged",h=g?tio(s.explanation):void 0;return{model:bK,durationMs:0,shouldBlock:g,reason:g?h!==void 0&&h.length>0?h.slice(0,Zso):"The server-side auto mode classifier judged this action dangerous (it gave no explanation)":"Not flagged by the server-side auto mode classifier"}};
function Uoe(e,n,r){let s=e.permissionModeAtRequest;if(!x6r(s)||!e.message.content.some((h)=>h.type==="tool_use"&&h.id===n))return;let g=pe({...r,permissionModeAtRequest:void 0}).mode;return v7(g)==="arbiter"&&k("tengu_radiant_teapot",!0)?s:void 0};
function jCt(){return Wio().value};
function Wio(){let e=Dn.CLAUDE_CODE_AUTO_MODE_OUTCOME_CODES;if(e!==void 0)return{value:e,src:"env"};let n=YS();return typeof n?.outcomeVisibility==="boolean"?{value:n.outcomeVisibility,src:"gb"}:{value:!1,src:"default"}};
var bDe=256000;
var BEo=1040000;
function A$t(e){return{git_state:e.git_state,...e.chrome_navigation!==void 0&&{chrome_navigation:e.chrome_navigation},live_cwd:e.live_cwd,platform:e.platform}};
function M$t({autoModeServerContext:e,priorTurnContext:n,systemReminders:r}){let s=UEo(e.context,e.git,n??[],r??[],e.artifacts),g=Kte(s);if(g>BEo){i("tengu_auto_mode_context_withheld",{reason:S("field_over_ceiling"),bytes:g});return}return s};
function UEo(e,n,r,s,g){let h=(ke,be,ve,Te,xe,Pe)=>{let $e=e.chrome_navigation;return{v:1,...e,...$e!==void 0&&{chrome_navigation:be?$e:{enabled:$e.enabled,baselines:$e.baselines}},git_state:ke,...ve.length>0&&{prior_turn_context:ve},...Te.length>0&&{system_reminders:Te},...xe!==void 0&&{artifacts:xe},...Pe.length>0&&{shed:Pe}}},b=n,w=e.chrome_navigation?.tabs!==void 0,D=r,j=s,z=g,K=[],he=()=>Kte(h(b,w,D,j,z,K))<=bDe;if(he())return h(b,w,D,j,z,K);if(D.length>0){let ke=D.length;while(ke>0){if(ke=Math.floor(ke/2),D=ke>0?r.slice(r.length-ke):[],ke===0)K.push("prior_turn_context");if(he())return h(b,w,D,j,z,K)}}if(w){if(w=!1,K.push("chrome_navigation.tabs"),he())return h(b,w,D,j,z,K)}if(b.visibility!==null&&b.visibility.visibility_cache.length>0){if(b={...b,visibility:{...b.visibility,visibility_cache:[]},truncated:!0},K.push("git_state.visibility.visibility_cache"),he())return h(b,w,D,j,z,K)}if(b.visibility!==null&&b.visibility.remotes.length>0){if(b={...b,visibility:{...b.visibility,remotes:[]},truncated:!0},K.push("git_state.visibility.remotes"),he())return h(b,w,D,j,z,K)}if(b.status!==null&&b.status.porcelain!==null){if(b={...b,status:{...b.status,porcelain:null,truncated:!1},truncated:!0},K.push("git_state.status.porcelain"),he())return h(b,w,D,j,z,K)}if(j.length>0){let ke=j.length;while(ke>0){if(ke=Math.floor(ke/2),j=ke>0?s.slice(s.length-ke):[],ke===0)K.push("system_reminders");if(he())return h(b,w,D,j,z,K)}}if(z!==void 0)z=void 0,K.push("artifacts");let _e=h(b,w,D,j,z,K);if(Kte(_e)>bDe)t(`[server-classifier] the permission rule lists alone exceed the auto-mode context budget (${bDe} bytes): every variable part (git state, repository visibility, Chrome tabs, prior-turn history, system-reminder ids, artifact state) was left out of this request's classifier context \u2014 trim the deny/ask rules or settings.autoMode entries`,{level:"warn"}),i("tengu_auto_mode_context_static_over_budget",{bytes:Kte(_e),deny_rules:e.rules.deny.length,ask_rules:e.rules.ask.length,auto_mode_entries:e.auto_mode.soft_deny.length+e.auto_mode.hard_deny.length});return _e};
var lqo={litellm:"a LiteLLM gateway",helicone:"a Helicone gateway",portkey:"a Portkey gateway","cloudflare-ai-gateway":"Cloudflare AI Gateway",kong:"a Kong gateway",braintrust:"a Braintrust proxy",bifrost:"a Bifrost gateway",databricks:"a Databricks gateway"};
function $Kt(e){if(!e)return;try{let{host:n,hostname:r}=new URL(e);return n&&!r.endsWith(".anthropic.com")?n:void 0}catch{return}};
function dqo(e){let n=Ktr(e)[0]?.name,r=n===void 0?void 0:a[n]||void 0;if(!r||F8r(e,r))return;try{return new URL(r).host||void 0}catch{return}};
function GHt(){let e=fqo();return e===void 0?cqo():TPr(e)};
var BKt=80;
function TPr(e){let n=Bs(e);return n.length<=BKt?n:`${n.slice(0,BKt-1)}\u2026`};
function cqo(){let e=pno();return e===void 0?void 0:lqo[e]};
function fqo(){let e=He();switch(e){case"firstParty":{let n=Czt();return n===void 0?void 0:$Kt(`https://${n}`)}case"bedrock":case"mantle":case"vertex":case"foundry":case"anthropicAws":case"anthropicGoogleCloud":return dqo(e);case"gateway":return $Kt(uo()?.url)}};
var yqo=/[^a-zA-Z0-9._-]/g;
async function mWn(){let e=a.GITHUB_ACTOR??a.USER??a.USERNAME,n=e===void 0&&!Ut()?await Wbe():null;return(e??(n?ot(n,"@"):null))?.replace(yqo,"").slice(0,64)||null};
async function oct(e,n,{abortSignal:r}={}){try{let s=await Je(vt(),[...WZe,"--no-optional-locks",...n],{cwd:e,env:Qo(),timeout:iTn,abortSignal:r,maxBuffer:1e6,preserveOutputOnError:!1,useToolMemoryCgroup:!1});return s.code===0?{ok:!0,stdout:s.stdout}:{ok:!1,code:s.exitCode??null,timedOut:s.timedOut===!0,overflowed:s.maxBufferExceeded===!0}}catch{return{ok:!1,code:null,timedOut:!1,overflowed:!1}}};
function RPr(){return Lqo().value};
function Lqo(){let e=Dn.CLAUDE_CODE_AUTO_MODE_GIT_STATUS;if(e!==void 0)return{value:e,src:"env"};let r=YS()?.gitStatusType;return typeof r==="boolean"?{value:r,src:"gb"}:{value:!1,src:"default"}};
function xPr(){return Nqo().value};
function Nqo(){let e=Dn.CLAUDE_CODE_AUTO_MODE_GIT_STATUS_UPLOADS;if(e!==void 0)return{value:e,src:"env"};let r=YS()?.gitStatusUploads;return typeof r==="boolean"?{value:r,src:"gb"}:{value:!1,src:"default"}};
var Fqo=2000;
function PPr(){return $qo().value};
function $qo(){let e=Dn.CLAUDE_CODE_AUTO_MODE_GIT_STATUS_LIMIT;if(e!==void 0)return{value:e,src:"env"};let r=YS()?.gitStatusTruncationLimit;return typeof r==="number"&&Number.isFinite(r)?{value:r,src:"gb"}:{value:Fqo,src:"default"}};
function gWn(e){let n=0,r=0,s=0;for(let g of e.split(`
`)){if(g.length<2)continue;let h=g[0],b=g[1];if(h==="?"&&b==="?"){s++;continue}if(h!==" "&&h!=="?")n++;if(b!==" ")r++}return{staged:n,modified:r,untracked:s}};
function IPr(e,n){let r=e.split(`
`).filter((w)=>w.length>0);if(n<=0)return r.join(`
`);let s="",g=0;for(;g<r.length;g++){let w=(s===""?"":`
`)+r[g];if(s.length+w.length>n)break;s+=w}let h=r.length-g;if(h===0)return s;let b=`\u2026[+${h} more lines]`;return s===""?b:`${s}
${b}`};
var XKt=null;
function fRo(){return XKt?.()??!0};
class x2t{lastClassificationArm;onNewArm;record(e){let n=this.lastClassificationArm?.value!==e.value||this.lastClassificationArm?.src!==e.src;if(this.lastClassificationArm=e,n)this.fireOnNewArm()}setOnNewArm(e){if(this.onNewArm=e,this.lastClassificationArm!==void 0)this.fireOnNewArm()}fireOnNewArm(){try{this.onNewArm?.()}catch{}}lastClassification(){return this.lastClassificationArm}reset(){this.lastClassificationArm=void 0,this.onNewArm=void 0}};
class M2t{templateLanesLogged=new Set;controlMonitorsBetaRejected=!1;externalSonnet5Probe="unprobed";loggedPolicySkips=new Set;projectsOwnerRowsLogged=new Set;projectsMemberRelaySeen=!1;mirroredSystemHashes=new Map;artifactConsentArm=new x2t};
var SKo=new V(()=>new M2t);
function r_(){return SKo.of(U().host)};
var EKo=new Set([Ue,wt]);
var CKo={"user-rejected":"rejected-by-user","permission-rule":"blocked-by-permissions","automode-blocked":"automode-blocked","automode-unavailable":"automode-unavailable","automode-parsing-error":"automode-parsing-error",interrupted:"error",cancelled:"error"};
function RKo(e,n,r,s){if(s!==void 0)return CKo[s];if(e&&r!==void 0&&r.isMcp!==!0&&EKo.has(r.name)&&n!==null&&typeof n==="object"&&n.interrupted===!0)return"interrupted";return e?"error":"ok"};
function fle(e){return String(e).slice(-6).replace(/[^A-Za-z0-9_-]/g,"_")};
var MKo=/[\u2028\u2029\u0085]/g;
function hD(e){return e.replace(MKo,(n)=>"\\u"+n.charCodeAt(0).toString(16).padStart(4,"0"))};
function yle(e){let n=new Map;for(let r of e){n.set(r.name,r);for(let s of r.aliases??[])n.set(s,r)}return n};
function $2t(e,n,r,s){let g=()=>_(r);try{return e.toAutoClassifierInput(r)??g()}catch(h){if(s)t(`toAutoClassifierInput failed for ${Cc(e)}: errorChars=${l(h).length}`),i("tengu_auto_mode_malformed_tool_input",{toolName:Nn(n),isMcp:e.isMcp??!1});return g()}};
function ple(e,n){let r=e.get(n.name);if(!r)return null;let s=n.input??{};if($2t(r,n.name,s,!1)==="")return null;return r};
function DKo(e){return e.replace(ROt,"")};
function LKo(e){e=DKo(e);let n=e.trim().toLowerCase();if(n==="outcome")return`[${e}]`;if(n==="id")return`[${e}]`;if(n==="meta")return`[${e}]`;if(n===Xve||n===Jve)return`[${e}]`;if(jue()&&n===Qve)return`[${e}]`;if(n==="user"||n==="assistant")return`[${e}]`;return e};
function B2t(e,n,r){if(e.type==="tool_use"){let s=r.get(e.name);if(!s)return"";let g=e.input??{},h=$2t(s,e.name,g,!0);if(h==="")return"";return hD(oT(_({[LKo(e.name)]:h,..._0e()&&e.id!==void 0&&{id:fle(e.id)}})))+`
`}if(e.type==="outcome"){let s=ple(r,e);if(!s)return"";if(e.resultInfo.resultText!==void 0)return hD(oT(_({tool_result:e.resultInfo.resultText})))+`
`;let g=RKo(e.resultInfo.isError,e.resultInfo.toolUseResult,s,e.resultInfo.toolDenialKind);return hD(oT(_({outcome:g,id:fle(e.id)})))+`
`}if(e.type==="host_context"){if(ple(r,e)===null)return"";return hD(oT(_({[e.live?Jve:Xve]:e.context,id:fle(e.id)})))+`
`}if(e.type==="result_from"){if(ple(r,e)===null)return"";return hD(oT(_({[Qve]:e.host,id:fle(e.id)})))+`
`}if(e.type==="meta"){if(ple(r,e)===null)return"";return e.serialized}if(e.type==="text")return hD(oT(_({[n]:e.text})))+`
`;return""};
function O0e(e,n){return e.content.map((r)=>B2t(r,e.role,n)).join("")};
function hE(e,n){return e!=null&&typeof e==="object"&&Object.hasOwn(e,n)?e[n]:void 0};
function H2t(e,n){let r=yle(n);for(let s of e.content)if(s.type==="tool_use"&&!r.has(s.name))return;return O0e(e,r)===""?j2t():void 0};
function j2t(){return{shouldBlock:!1,reason:"Tool declares no classifier-relevant input",model:L0e(),classifierRan:!1}};
function _0e(){if(Dn.CLAUDE_CODE_AUTO_MODE_OUTCOME_CODES===void 0);return jCt()};
function L0e(){return QNe().value};
function N0e(e){return Bqr(e)};
function QNe(){let e=rt(),n=YS(),r=W2t(n?.modelByMainModel,{vet:(s)=>k0e(s,"modelByMainModel")})??k0e(n?.model,"model");if(r)return{value:r,src:"gb"};if(r_().externalSonnet5Probe!=="demoted"){let s=Uqr(e);if(s)return{value:s,src:"default",externalDefault:!0}}return{value:N0e(e),src:"default"}};
function k0e(e,n){if(!e)return;if(Ioe(e))return e;let r=`${n}:${e}`,{loggedPolicySkips:s}=r_();if(!s.has(r))s.add(r),t(`Auto mode classifier: skipping server-configured classifier model ${e} (tengu_auto_mode_config.${n}) \u2014 org model policy excludes it`,{level:"info"});return};
function W2t(e,n){if(e==null||typeof e!=="object")return;let r=n?.vet??((g)=>g),s=Qyt();for(let g of s){let h=hE(e,g),b=h?r(h):void 0;if(b)return b}if(!n?.prefixPatterns)return;for(let g of s){let h,b=0;for(let[w,D]of Object.entries(e)){if(!D||w.length<=1||!w.endsWith("*"))continue;let j=w.slice(0,-1);if(!g.startsWith(j)||j.length<=b)continue;let z=r(D);if(z)h=z,b=j.length}if(h)return h}return};
async function iVo(e,n,r,s){TRe(r,s);try{return await QEt(e,{runKey:kK(n.agentId),signal:n.abortController.signal,scheduleTimeout:n.scheduleTimeout,onWait:(g)=>{if(g===null){n.onRetryStatus?.(null);return}t(`[server-classifier] no usable verdict for ${g.position} response(s) in a row; holding this response's denials ${g.delayMs}ms before the model may retry (${g.position}/${g.limit})`,{level:"warn"}),n.onRetryStatus?.({kind:"auto_mode_unavailable",attempt:g.position,maxRetries:g.limit,retryInMs:g.delayMs,deadline:Date.now()+g.delayMs})}})}finally{tne(r,s)}};
function aVo(e,n,r){if(r){let s=n.agentId!==void 0;i("tengu_auto_mode_unavailable_stop",{isSubagent:s,gatewayConfigured:GHt()!==void 0}),t(`[server-classifier] no usable verdict for ${qS} responses in a row; stopping the ${s?"agent's run":"turn"}`,{level:"warn"})}return{behavior:"deny",decisionReason:{type:"classifier",classifier:"auto-mode",reason:MCn,noVerdict:!0},message:ZEt(e.name),endsTurn:!0}};
return {$oe,QEt,iVo,JEt,aVo,tCt,nCt,$Pe,jPe,v7,KHt,aCt,cCt,iCt,D8e,M$t,A$t,eXe,tXe,Uoe,gAo,hAo,QOt,uRo,fRo,mWn,oct,RPr,xPr,PPr,gWn,IPr,A2n,gsn,jRr,mAo,Kte,GHt,H2t};
}

function rulePaths(ports){
const {sXe,ti,Yn,TG,mx,I8n}=ports;
function sn(e){let n=e.replace(/\/{2,}/g,"/");if(/^\s*(?:\/\*\*)?$/.test(n))return n;return n.replace(/^\uFEFF([!#]?)/,(r,s)=>s?"\\"+s:"").replace(/^\uFEFF/,"[\uFEFF]")};
function hWr(e,n,r){let{relativePattern:s,root:g}=sXe(e,n),h=r==="allow",w=ti(sn(s),h);return w===null?null:{root:g,pattern:Yn(w,h)}};
return {hWr};
}

function visibility(ports){
const {Dn,k,IS,V,U,ot,u$,Cz,eor,tor,DK,iqt,hT,oo,oR,i,c,fOe,EL,on,KZ,fc,Ke,Ko,sa,Mo,f,mt,Ql,Eo}=ports;
var NL=[];
var une=/^[a-z0-9.-]+(?::[0-9]+)?\/[a-z0-9._-]+\/[a-z0-9._-]+$/;
function v$e(e){if(!/^https?:\/\//.test(e)&&!/^ssh:\/\//.test(e)&&!/^git@/.test(e))return!1;if(/[?#\\]/.test(ot(e.replace(/^(?:https?|ssh):\/\//,""),"/")))return!1;if(u$(e)||Cz(e))return!1;let n=e.replace(/^https?:\/\//,"").replace(/^ssh:\/\//,"").replace(/^[^@/]+@/,"").replace(/\/$/,"");if(eor()&&tor(ot(n,"/"))){let r=DK(e);if(r&&!n.includes("@")&&une.test(r))return NL.includes(r)}if(iqt(n))return!1;return NL.some((r)=>{if(!n.startsWith(r))return!1;let s=n.slice(r.length);return s===""||s===".git"||s.startsWith("/")})};
var fLr=Object.freeze({twoStageClassifier:!0,sameTurnSiblingContext:!0,editRemovalVisibility:!0,editRemovalCap:3000,outcomeVisibility:!1,repoVisibility:!0,gitStatusType:!0,gitStatusUploads:!1,tagConnectorWrites:!1,severityByModel:Object.freeze({"claude-sonnet-5[1m]":Object.freeze({t1:25,t2:35}),"claude-opus-4-8[1m]":Object.freeze({t1:45,t2:35}),"claude-sonnet-5":Object.freeze({t1:25,t2:35}),"claude-opus-4-8":Object.freeze({t1:45,t2:35})})});
var Cg=Object.freeze({});
function YS(){let e=k("tengu_auto_mode_config",Cg)??Cg;if(e!==Cg)return e;return IS()?Cg:fLr};
class nN{resultsByHost=new Map};
var ure=new V(()=>new nN);
function rN(){return ure.of(U().host).resultsByHost};
async function oN(e){let n=await oE(e);return n.kind==="token"?n.token:null};
async function oE(e){let n=rN(),r=n.get(e);if(r!==void 0)return r;let s=await dre(e);return n.set(e,s),s};
async function dre(e){let n=oo(e)?process.env.GH_TOKEN||process.env.GITHUB_TOKEN:KZ(process.env.GH_HOST,e)?process.env.GH_ENTERPRISE_TOKEN||process.env.GITHUB_ENTERPRISE_TOKEN:void 0;if(n)return{kind:"token",token:n};if(!await fc("gh"))return{kind:"gh-missing"};let{stdout:s,code:h}=await Ke("gh",["auth","token","--hostname",e],{timeout:5000,preserveOutputOnError:!1,env:{...Ko(),GH_TOKEN:"",GITHUB_TOKEN:"",GH_ENTERPRISE_TOKEN:"",GITHUB_ENTERPRISE_TOKEN:""},extendEnv:!1});if(h!==0)return{kind:"no-token"};let g=s.trim();return g.length>0?{kind:"token",token:g}:{kind:"no-token"}};
function zqn(){let e=Dn.CLAUDE_CODE_AUTO_MODE_REPO_VISIBILITY;if(e!==void 0)return e;return YS()?.repoVisibility===!0};
var pre="2022-11-28";
var sN=3000;
class iN{visibilityByHostSlug=new Map;policyDeniedLogged=new Set;lookup(e,n){return this.visibilityByHostSlug.get(`${e}/${n}`)}markPolicyDenied(e,n){let r=`${e}/${n}`;if(this.policyDeniedLogged.has(r))return!1;return this.policyDeniedLogged.add(r),!0}record(e,n,r){this.visibilityByHostSlug.set(`${e}/${n}`,r)}entries(){return Array.from(this.visibilityByHostSlug,([e,n])=>{let r=e.indexOf("/");return{host:e.slice(0,r),slug:e.slice(r+1),visibility:n}})}clear(){this.visibilityByHostSlug.clear(),this.policyDeniedLogged.clear()}};
var mre=new V(()=>new iN);
function Bd(){return mre.of(U().host)};
var NLr={lookup:(e,n)=>Bd().lookup(e,n),record:(e,n,r)=>Bd().record(e,n,r),entries:()=>Bd().entries(),clear:()=>Bd().clear()};
function Nke(e){return e.replace(/[^a-zA-Z0-9._/-]/g,"").slice(0,128)};
var hre=f(()=>mt({visibility:Ql(["public","private","internal"]).optional(),private:Eo().optional()}));
function run(e){if(e.visibility==="public"||e.visibility==="private")return e.visibility;return v$e(`https://${e.host}/${e.slug}`)?"private":e.visibility};
async function Vqn(e){let n=await hT(e,{skipCache:!0});if(!n)return null;return Og(n.host,n.owner,n.name)};
async function Og(e,n,r){let s=`${n}/${r}`,h=Bd(),g=h.lookup(e,s);if(g!==void 0)return{slug:s,host:e,visibility:g};let b=await gre(e,n,r);if(b==="unverified"){if(h.markPolicyDenied(e,s))Ud("policy_denied");return{slug:s,host:e,visibility:b}}return h.record(e,s,b),{slug:s,host:e,visibility:b}};
function Ud(e){i("tengu_auto_mode_repo_visibility_lookup_failed",{reason:c(e)})};
async function gre(e,n,r){if(!oo(e)){let h=oR(e);return Ud(h==="gitlab"||h==="bitbucket"?h:"other_host"),"unknown"}let s=`${fOe(e)}/repos/${encodeURIComponent(n)}/${encodeURIComponent(r)}`;if(EL())return"unknown";if(!on("allow_repo_visibility_probe"))return"unverified";try{let h=await oN(e),{data:g}=await sa.get(s,{headers:{...h&&{Authorization:`Bearer ${h}`},Accept:"application/vnd.github+json","X-GitHub-Api-Version":pre,"User-Agent":Mo()},timeout:sN,signal:AbortSignal.timeout(sN),maxRedirects:0}),b=hre().safeParse(g);if(!b.success)return Ud("parse_error"),"unknown";let w=b.data.visibility;if(w==="public")return"public";if(w==="private"||w==="internal")return"private";if(b.data.private===!0)return"private";if(b.data.private===!1)return"public";return Ud("missing_fields"),"unknown"}catch{return Ud("http_error"),"unknown"}};
return {zqn,NLr,Nke,run,Vqn,YS};
}

function tabs(ports){
const {}=ports;
var r=null;
async function VEo(){if(r===null)return;let e=await r();return Array.isArray(e)?e.filter((n)=>typeof n?.tabId==="number"&&typeof n?.url==="string"):void 0};
return {VEo};
}

function settings(ports){
const {f,u,T,o,va,rw,ge,t,i,c}=ports;
var W8=f(()=>u({allow:T(o()).optional(),soft_deny:T(o()).optional(),hard_deny:T(o()).optional(),deny:T(o()).optional(),environment:T(o()).optional()}));
var l0e=["userSettings","flagSettings","policySettings"];
function uT(){let e=W8(),n=va();if(!n.autoModeUntrustedSourceWarned)for(let A of["projectSettings","localSettings"]){if(A==="projectSettings"&&rw())continue;let I=ge(A)?.autoMode;if(I&&e.safeParse(I).success)n.autoModeUntrustedSourceWarned=!0,t(`settings autoMode in ${A} ignored \u2014 only user/flag/managed settings may set classifier rules (projectSettings and localSettings are repo-controllable)`,{level:"warn"}),i("tengu_settings_auto_mode_rules_untrusted_source_ignored",{source:c(A)})}let r=[],s=[],g=[],h=[],R=!1;for(let A of l0e){let I=ge(A);if(!I)continue;let b=e.safeParse(I.autoMode);if(b.success){if(b.data.allow)r.push(...b.data.allow);if(b.data.soft_deny)s.push(...b.data.soft_deny);if(b.data.hard_deny)g.push(...b.data.hard_deny);if(b.data.environment)h.push(...b.data.environment)}}if(r.length>0||s.length>0||g.length>0||h.length>0||R)return{...r.length>0&&{allow:r},...s.length>0&&{soft_deny:s},...g.length>0&&{hard_deny:g},...h.length>0&&{environment:h},...{}};return};
return {uT};
}

function context(ports){
const {pe,v7,Lp,XC,oe,mx,On,dt,Ot,hWr,jn,uRo,uT,q,Zc,e0t,VEo,QOt,xxe,O,Hu,Txe,I8n,Ee,L,ZN,fRo,UUe,mWn,gAo,i,d,zqn,NLr,Nke,run,gsn,Ut,Fy,RPr,xPr,oct,$S,Vqn,Gx,A2n,PPr,IPr,jRr,gWn,Kte,mAo,hAo,c,nativeImport}=ports;
function _a(e){return Nke(e)||null};
async function Lu(e,o){let n=await oct(e,["symbolic-ref","--short","refs/remotes/origin/HEAD"],{abortSignal:o}),r=n.ok?n.stdout.trim().replace(/^origin\//,""):"";return r===""?null:r};
async function Bu(e,o,n){let r=(g)=>oct(e,["status","--porcelain",$S,`--untracked-files=${g}`],{abortSignal:n}),[u,s]=await Promise.all([r("normal"),o?r("all"):Promise.resolve(null)]);return{normal:u,all:s}};
async function qu(e,o){let n=await oct(e,["config","-z","--get-regexp","^(remote\\..+\\.(url|pushurl)|remote\\.pushdefault|branch\\..+\\.remote)$"],{abortSignal:o}),r={remotes:new Map,branchRemotes:new Map,pushDefault:void 0};if(!n.ok)return n.code===1&&!n.timedOut&&!n.overflowed?r:null;for(let u of n.stdout.split("\x00")){let s=u.indexOf(`
`);if(s<0)continue;let g=u.slice(0,s),T=u.slice(s+1);if(g==="remote.pushdefault"){r.pushDefault=T;continue}let M=g.match(/^remote\.(.+)\.(url|pushurl)$/);if(M!==null){let E=M[1],R=r.remotes.get(E)??{url:[],pushurl:[]};R[M[2]].push(T),r.remotes.set(E,R);continue}let b=g.match(/^branch\.(.+)\.remote$/);if(b!==null)r.branchRemotes.set(b[1],T)}return r};
function Nu(e,o){return(o!==null&&o!=="HEAD"?e.branchRemotes.get(o):void 0)??e.pushDefault??"origin"};
function as(e){let o=run(e);return o==="unverified"?"unknown":o};
function ba(e){return Nke(e)===e&&e!==""?e:null};
function Gu(e){let o=[];for(let[n,r]of e.remotes){let u=ba(n);if(u===null)continue;let s=r.pushurl.length>0?r.pushurl:r.url,g=new Set;for(let T of s){let M=Gx(T);if(M===null)continue;let b=`${M.owner}/${M.name}`;if(g.has(`${M.host}/${b}`))continue;g.add(`${M.host}/${b}`),o.push({name:u,host:M.host,remote:Nke(b),visibility:as({slug:b,host:M.host,visibility:NLr.lookup(M.host,b)??"unknown"})})}}return o.sort((n,r)=>n.name.localeCompare(r.name)||n.remote.localeCompare(r.remote)),o};
function Sa(){return NLr.entries().map((e)=>({host:e.host,remote:Nke(e.slug),visibility:as(e)})).filter((e)=>e.remote!=="")};
async function ka(e,o){let n=(()=>{try{return zqn()}catch{return!1}})(),r=(u)=>({cwd:e,root:null,branch:null,default_branch:null,status:null,visibility:n?{origin:null,push_remote:null,remotes:[],visibility_cache:Sa().slice(0,gsn)}:null,error:u});if(Ut())return r("error");try{let u=Fy(e);if(u===null)return r("not_a_repo");let s=RPr(),g=xPr(),[T,M,b,E,R]=await Promise.all([s||g?Bu(e,g,o):null,oct(e,["rev-parse","--abbrev-ref","HEAD"],{abortSignal:o}),n?Vqn(e):null,Lu(e,o),n?qu(e,o):null]),A=M.ok?M.stdout.trim():null,B=A===null?null:_a(A),D=E===null?null:_a(E),P=R===null?[]:Gu(R),z=n?Sa():[],x=P.length>A2n||z.length>gsn||B!==A||D!==E,W={cwd:e,root:u,branch:B,default_branch:D,visibility:n?{origin:b===null?null:{host:b.host,remote:Nke(b.slug),visibility:as(b)},push_remote:R===null?null:ba(Nu(R,A)),remotes:P.slice(0,A2n),visibility_cache:z.slice(0,gsn)}:null,...x&&{truncated:!0}};if(T===null)return{...W,status:null};let{normal:he,all:xe}=T,je=xe?.ok?xe:he.ok?he:null;if(je===null)return{...W,status:null,error:!he.ok&&he.timedOut||xe!==null&&!xe.ok&&xe.timedOut?"timeout":"error"};let et=je.stdout.split(`
`).filter((Te)=>Te.length>0),Ft=[...et.filter((Te)=>Te.startsWith("??")),...et.filter((Te)=>!Te.startsWith("??"))].join(`
`),Ie=PPr(),I=g?IPr(Ft,Ie>0?Math.min(Ie,jRr):jRr):null,it=gWn(je.stdout);return{...W,status:{clean:et.length===0,counts:s?{staged:it.staged,modified:it.modified,untracked:xe?.ok?it.untracked:null,untracked_normal:he.ok?gWn(he.stdout).untracked:null}:null,porcelain:I,truncated:I!==null&&(je!==xe||I!==Ft)}}}catch{return r("error")}};
var ju=300;
var Ta=128;
var Ca=32;
var Qu=300;
var Wu=2000;
function va(e,o,n){return new Promise((r,u)=>{let s=setTimeout((g,T)=>g(T),o,r,n);e.then((g)=>{clearTimeout(s),r(g)},(g)=>{clearTimeout(s),u(g)})})};
var Ma;
function $u(){return va(VEo(),Qu,void 0)};
async function Yu(e){let o=mx,n=(x,W)=>W.map((he)=>{let xe=On(he.ruleValue),je={rule:he.stored??xe,source:he.source,...he.stored!==void 0&&he.stored!==xe&&{canonical:xe}},{toolName:et,ruleContent:Ft}=he.ruleValue;if(Ft===void 0||et!==dt&&et!==Ot)return je;let Ie=hWr(Ft,he.source,x);if(Ie===null)return je;return{...je,root:Ie.root===null?null:o(Ie.root),pattern:Ie.pattern}}),r=(x,W)=>Object.entries(x).flatMap(([he,xe])=>(xe??[]).map((je)=>({source:he,ruleBehavior:W,ruleValue:jn(je),stored:je}))),{mcpServerPolicy:u,...s}=e.alwaysAskRules,g=uRo()?s:e.alwaysAskRules,T=uT(),M=q(),b=Zc().lastExecutedTabUrlByScope.get(e0t()),E=b===void 0?[]:[[M,b]],R=E,A=E.length===0?void 0:await $u(),B=A!==void 0&&A.length>Ca,D=R.length===0?void 0:{enabled:e.chromeNavigationClassifierEnabled===!0,baselines:Object.fromEntries(R.map(([x,W])=>[x.slice(0,Ta),QOt(W)])),...A!==void 0&&{tabs:{[M.slice(0,Ta)]:Object.fromEntries(A.slice(0,Ca).map((x)=>[String(x.tabId),QOt(x.url)]))}}},P=(x)=>({path:o(x),resolved:xxe(x).map(o)}),z={permission_mode:e.mode,platform:O(),live_cwd:o(oe()),home_dir:o(Hu().normalize("NFC")),rule_roots:Object.fromEntries(Txe.map((x)=>[x,o(I8n(x))])),trusted_directories:{primary:P(Ee()),additional:Array.from(e.additionalWorkingDirectories.values(),(x)=>({...P(x.path),source:x.source})),network:L(Array.from(e.trustedNetworkDirectories?.entries()??[],([x,W])=>[x,...W]).flat().map(o)),block_reads_outside_working_directories:e.blockReadsOutsideWorkingDirectories===!0},rules:{allow:n("allow",ZN(e)),deny:n("deny",r(e.alwaysDenyRules,"deny")),ask:n("ask",r(g,"ask"))},case_insensitive_paths:O()==="windows",auto_mode:{allow:T?.allow??[],soft_deny:T?.soft_deny??[],hard_deny:T?.hard_deny??[],environment:T?.environment??[]},artifact_consent_holdback:!fRo(),...D!==void 0&&{chrome_navigation:D},...B&&{truncated:!0},restricted:e.restricted===!0,is_remote_mode:e.isRemoteMode===!0,classify_all_shell:UUe(),user_identity:await va(mWn(),Wu,null)};return gAo(z,(x)=>{let W=q();if(Ma===W)return;Ma=W,i("tengu_auto_mode_context_incomplete",{bytes:x.bytes,bytes_before_shedding:x.bytesBeforeShedding,over_cap_before_shedding:x.overCapBeforeShedding,over_cap:x.overCap,allow_rules_shed:x.allowRulesShed,resolved_spellings_shed:x.resolvedSpellingsShed,path_clamped:x.pathClamped,identity_clamped:x.identityClamped,additional_directories:x.additionalDirectories,network_roots:x.networkRoots,chrome_tabs_cut:B,truncated:x.truncated,dropped_allow:x.dropped.allow??0,dropped_deny:x.dropped.deny??0,dropped_ask:x.dropped.ask??0,deny_rules:x.denyRules,ask_rules:x.askRules,auto_mode_allow:x.autoMode.allow,auto_mode_soft_deny:x.autoMode.softDeny,auto_mode_hard_deny:x.autoMode.hardDeny,auto_mode_environment:x.autoMode.environment})})};
function Aa(e,o){try{let n=pe(e);if(v7(n.mode)==="off"||Lp(o,XC))return;let r=oe();return{tools:e.options.tools,context:Yu(n).catch((u)=>{d(u);return}),git:ka(r,e.abortController.signal),cwd:r,startedAt:Date.now()}}catch(n){d(n);return}};
function Ia(e){try{return v7(pe(e).mode)!=="off"}catch(o){return d(o),!1}};
async function Pa(e,o=Xu){if(e===void 0)return;try{return await zu(e,o)}catch(n){d(n);return}};
async function zu(e,o){let n=await e.context;if(n===void 0)return;let r=Kte(n);if(r>mAo&&e.overCeilingLogged===void 0)e.overCeilingLogged=!0,i("tengu_auto_mode_context_over_ceiling",{bytes:r});let u=Date.now(),s=await Ju(e.git,o,ju,{cwd:e.cwd,root:null,branch:null,default_branch:null,status:null,visibility:null,error:"pending"}),g=hAo({...s,cwd:mx(s.cwd),root:s.root===null?null:mx(s.root)});if(e.logged===void 0)e.logged=!0,i("tengu_auto_mode_git_state_probe",{duration_ms:u-e.startedAt,wait_ms:Date.now()-u,outcome:c(g.error??(g.status===null?"no_status":g.status.clean?"clean":"dirty")),truncated:g.truncated===!0||g.status?.truncated===!0});let T;try{let{artifactsClassifierContext:M}=await nativeImport("/$bunfs/root/chunk-qfns8y8q.js");T=M({tools:e.tools})}catch(M){d(M),T=void 0}return{context:n,git:g,...T!==void 0&&{artifacts:T}}};
var Xu={setTimeout:(e,o)=>{let n=setTimeout(e,o);return()=>clearTimeout(n)}};
function Ju(e,o,n,r){return new Promise((u)=>{let s=!1,g=o.setTimeout(()=>{if(!s)s=!0,u(r)},n);e.then((T)=>{if(!s)s=!0,g(),u(T)},()=>{if(!s)s=!0,g(),u(r)})})};
return {Aa,Pa,Ia};
}
export function createServerClassifierNative287(ports){const deps={...ports,...policy(ports),...constants(ports),...retry({...ports,...backoff(ports)}),...gitConstants(ports),...providers(ports),...reminder({...ports,...served({...ports,...reminderIds(ports)}),...policy(ports)}),...reminderIds(ports),...ids(ports),...sanitize(ports)};const vis=visibility(deps),server=runtime({...deps,...vis});return {...server,permissionVisibility287:vis,resolveNoVerdict:async args=>{const {JEt,iVo,aVo}=server,{Ye}=ports,{N8}=deps,{e,D,w,g,xn,ls,mr,Rr,$o}=args;const Kr=mr.errorKind===N8&&!mr.refusedBySafeguard;if(xn&&!ls&&!Kr&&Rr!==void 0&&JEt(mr.errorKind,(await $o()).kind==="per_call")){let Vr=await iVo(Rr,D,w,g);if(Vr.kind==="stop")return aVo(e,D,Vr.recorded);if(Vr.interrupted)throw new Ye};},...context({...deps,...server,...rulePaths(ports),...vis,...tabs(ports),...settings(ports)})}; }
