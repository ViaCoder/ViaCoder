export function createSubprocessEnvironment287(ports){
function module0(imports){

function Rrr(e){let{no_proxy:n,NO_PROXY:r}=e;if(n&&r&&n!==r)return`${n},${r}`;return n||r};
return {Rrr};
}
function module1(imports){

function Le(e){if(!e)return!1;if(typeof e==="boolean")return e;let n=String(e).toLowerCase().trim();return["1","true","yes","on"].includes(n)};
function gs(e){if(e===void 0)return!1;if(typeof e==="boolean")return!e;let n=String(e).toLowerCase().trim();return["0","false","no","off"].includes(n)};
return {Le,gs};
}
function module2(imports){
const Le=imports["Le"];
var Kj=["CLAUDE_CODE_USE_BEDROCK","CLAUDE_CODE_USE_VERTEX","CLAUDE_CODE_USE_FOUNDRY","CLAUDE_CODE_USE_ANTHROPIC_AWS","CLAUDE_CODE_USE_ANTHROPIC_GOOGLE_CLOUD","CLAUDE_CODE_USE_MANTLE","CLAUDE_CODE_USE_GATEWAY","ANTHROPIC_FOUNDRY_RESOURCE","ANTHROPIC_VERTEX_PROJECT_ID","ANTHROPIC_AWS_WORKSPACE_ID","ANTHROPIC_GOOGLE_CLOUD_PROJECT","ANTHROPIC_GOOGLE_CLOUD_LOCATION","ANTHROPIC_GOOGLE_CLOUD_WORKSPACE_ID","CLOUD_ML_REGION"];
var mo=["CLAUDE_CODE_USE_BEDROCK","CLAUDE_CODE_USE_ANTHROPIC_AWS","CLAUDE_CODE_USE_MANTLE"];
var jc=["AWS_BEARER_TOKEN_BEDROCK","ANTHROPIC_AWS_API_KEY"];
var dr=["CLAUDE_CODE_MEMORY_API_BASE_URL","CLAUDE_CODE_MEMORY_API_TOKEN"];
function Awe(e){return dr.includes(e)};
var uL=["ANTHROPIC_API_KEY","ANTHROPIC_AUTH_TOKEN","CLAUDE_CODE_OAUTH_TOKEN","AWS_BEARER_TOKEN_BEDROCK","ANTHROPIC_FOUNDRY_API_KEY","ANTHROPIC_FOUNDRY_AUTH_TOKEN","ANTHROPIC_AWS_API_KEY"];
var xzt=["CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR","CLAUDE_CODE_GATEWAY_TOKEN_FILE_DESCRIPTOR","CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR","CLAUDE_CODE_WEBSOCKET_AUTH_FILE_DESCRIPTOR"];
var Pzt=["CLAUDE_CODE_OAUTH_TOKEN",...xzt,"CLAUDE_CODE_ARTIFACTS_API_TOKEN","CLAUDE_CODE_SLACK_TAG_TOKEN","CLAUDE_CODE_HFI_BEARER_TOKEN","CLAUDE_BRIDGE_OAUTH_TOKEN","CLAUDE_TRUSTED_DEVICE_TOKEN","AGENT_PROXY_AUTH_TOKEN","CLAUDE_CODE_MCP_SERVE_AUTH_TOKEN","CLAUDE_BG_AUTH_SNAPSHOT_PATH","CLAUDE_BG_SOCKET_TOKENS_PATH","CLAUDE_BG_RV_AUTH","CLAUDE_BG_PTY_AUTH","CLAUDE_BG_CLAIM_AUTH"];
var fo=["AWS_ACCESS_KEY_ID","AWS_SECRET_ACCESS_KEY","AWS_SESSION_TOKEN"];
var FSt=[...fo,"AWS_PROFILE","AWS_CONFIG_FILE","AWS_SHARED_CREDENTIALS_FILE","GOOGLE_APPLICATION_CREDENTIALS","GOOGLE_CLOUD_PROJECT"];
var xje=["ANTHROPIC_UNIX_SOCKET","CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST","CLAUDE_CODE_HOST_AUTH_ENV_VAR"];
function Pje(e){if(!Le(e.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST))return[];let n=mo.some((i)=>Le(e[i])),s=!!e.CLAUDE_CODE_HOST_AUTH_ENV_VAR||jc.some((i)=>!!e[i])||!!e.AWS_PROFILE||!!e.AWS_CONFIG_FILE||!!e.AWS_SHARED_CREDENTIALS_FILE,r=FSt.filter((i)=>e[i]==="");return["ANTHROPIC_CUSTOM_HEADERS",...uL,...n&&s?fo:[],...r,hK(e),"CLAUDE_CODE_HOST_CREDS_FILE"].filter((i)=>!!i)};
function hK(e){let n=e.CLAUDE_CODE_HOST_AUTH_ENV_VAR;if(!n||xje.includes(n)||Kj.includes(n))return;return n};
return {Kj,mo,jc,dr,Awe,uL,xzt,Pzt,fo,FSt,xje,Pje,hK};
}
function module3(imports){
const T_=imports["T_"];
function s9r(){return T_.bridgeCarrier?["CLAUDE_CODE_SESSION_ACCESS_TOKEN","SESSION_INGRESS_URL","CLAUDE_CODE_BRIDGE_PROMPT_SHA256"]:[]};
return {s9r};
}
function module4(imports){
const a=imports["a"];
const U=imports["U"];
function t(){return a.of(U().host)};
function ol(e){return t().taints.includes(e)};
return {t,ol};
}
function module5(imports){
const a=imports["a"];
const dT=imports["dT"];
function jj(){return a.CLAUDE_CODE_REMOTE_TOOLS_PIN_STORED_LOGIN===!0};
var Oo=["ANTHROPIC_API_KEY","CLAUDE_CODE_OAUTH_TOKEN","CLAUDE_CODE_ARTIFACTS_API_TOKEN","CLAUDE_CODE_MEMORY_API_TOKEN","CLAUDE_CODE_SLACK_TAG_TOKEN","ANTHROPIC_AUTH_TOKEN","ANTHROPIC_FOUNDRY_API_KEY","ANTHROPIC_FOUNDRY_AUTH_TOKEN","ANTHROPIC_AWS_API_KEY","ANTHROPIC_CUSTOM_HEADERS","AWS_SECRET_ACCESS_KEY","AWS_SESSION_TOKEN","AWS_BEARER_TOKEN_BEDROCK","GOOGLE_APPLICATION_CREDENTIALS","GOOGLE_GHA_CREDS_PATH","AZURE_CLIENT_SECRET","IDENTITY_HEADER","MSI_SECRET","AZURE_CLIENT_CERTIFICATE_PATH","AZURE_CLIENT_CERTIFICATE_PASSWORD","AZURE_PASSWORD","AZURE_FEDERATED_TOKEN_FILE","AWS_WEB_IDENTITY_TOKEN_FILE","AWS_CONTAINER_CREDENTIALS_RELATIVE_URI","AWS_CONTAINER_CREDENTIALS_FULL_URI","AWS_CONTAINER_AUTHORIZATION_TOKEN","AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE","CLOUDSDK_AUTH_ACCESS_TOKEN","GOOGLE_OAUTH_ACCESS_TOKEN","CLAUDE_CODE_OAUTH_REFRESH_TOKEN","HF_TOKEN","HUGGING_FACE_HUB_TOKEN","HUGGINGFACEHUB_API_TOKEN","NODE_AUTH_TOKEN","NUGET_AUTH_TOKEN","CARGO_REGISTRY_TOKEN","TWINE_PASSWORD","TWINE_USERNAME","PYPI_TOKEN","PYPI_API_TOKEN","UV_PUBLISH_TOKEN","UV_PUBLISH_PASSWORD","UV_PUBLISH_USERNAME","FLIT_PASSWORD","FLIT_USERNAME","HATCH_INDEX_AUTH","HATCH_INDEX_USER","GEM_HOST_API_KEY","MATURIN_PYPI_TOKEN","MATURIN_PASSWORD","MATURIN_USERNAME","CONAN_LOGIN_USERNAME","CONAN_PASSWORD","ANACONDA_API_TOKEN","BINSTAR_API_TOKEN","VAULT_TOKEN","VAULT_AUTH_TOKEN","VAULT_ROLE_ID","VAULT_SECRET_ID","CONSUL_HTTP_TOKEN","CONSUL_HTTP_AUTH","NOMAD_TOKEN","NOMAD_HTTP_AUTH","CI_REGISTRY_USER","CI_DEPLOY_USER","JF_USER","FASTLANE_SESSION","MATCH_GIT_BASIC_AUTHORIZATION","SONAR_TOKEN","SONARQUBE_SCANNER_PARAMS","SONAR_SCANNER_JSON_PARAMS","SLACK_WEBHOOK_URL","SLACK_WEBHOOK","DISCORD_WEBHOOK","DISCORD_WEBHOOK_URL","TEAMS_WEBHOOK_URL","MS_TEAMS_WEBHOOK_URI","ANTHROPIC_IDENTITY_TOKEN","ANTHROPIC_IDENTITY_TOKEN_FILE","CLOUDSDK_AUTH_ACCESS_TOKEN_FILE","CLOUDSDK_AUTH_AUTHORIZATION_TOKEN_FILE","AZURE_AUTH_LOCATION","ACTIONS_ID_TOKEN_REQUEST_TOKEN","ACTIONS_ID_TOKEN_REQUEST_URL","ACTIONS_RUNTIME_TOKEN","ACTIONS_RUNTIME_URL","ALL_INPUTS","VSS_NUGET_EXTERNAL_FEED_ENDPOINTS","ARTIFACTS_CREDENTIALPROVIDER_EXTERNAL_FEED_ENDPOINTS","VSS_NUGET_ACCESSTOKEN","ARTIFACTS_CREDENTIALPROVIDER_ACCESSTOKEN","COMPOSER_AUTH","OVERRIDE_GITHUB_TOKEN","DEFAULT_WORKFLOW_TOKEN","SSH_SIGNING_KEY"];
var sn=["PIP_INDEX_URL","PIP_EXTRA_INDEX_URL","PIP_FIND_LINKS","UV_INDEX_URL","UV_EXTRA_INDEX_URL","UV_DEFAULT_INDEX","UV_INDEX","UV_FIND_LINKS","UV_PUBLISH_URL","TWINE_REPOSITORY_URL","FLIT_INDEX_URL","HATCH_INDEX_REPO","NPM_CONFIG_REGISTRY","YARN_REGISTRY","YARN_NPM_REGISTRY_SERVER","YARN_NPM_PUBLISH_REGISTRY","COREPACK_NPM_REGISTRY","BUN_CONFIG_REGISTRY","GOPROXY"];
var No=new Set(sn);
var vo=/^(?:CARGO_REGISTRIES_[A-Z0-9_]+_INDEX|POETRY_REPOSITORIES_[A-Z0-9_]+_URL|NPM_CONFIG_@[^:]+:REGISTRY)$/i;
function NQe(e){let n=e.toUpperCase().replace(/-/g,"_").replace(/^INPUT_/,"");return No.has(n)||vo.test(n)};
function an(e){return ln[e.toUpperCase().replace(/-/g,"_").replace(/^INPUT_/,"")]};
var ln={PIP_EXTRA_INDEX_URL:"PIP_INDEX_URL",PIP_FIND_LINKS:"PIP_INDEX_URL",UV_EXTRA_INDEX_URL:"UV_DEFAULT_INDEX",UV_INDEX:"UV_DEFAULT_INDEX",UV_FIND_LINKS:"UV_DEFAULT_INDEX"};
var n0e="http://index.invalid/";
var cn={UV_DEFAULT_INDEX:["UV_INDEX_URL"]};
function D9r(e,n){return[n,...cn[n]??[]].some((r)=>(e[r]??"")!=="")};
var Lo=/^[a-z][a-z0-9+.-]*:\/\//i;
function wo(e){let n=e.startsWith("//"),r;try{r=new URL(n?`https:${e}`:e)}catch{let A=e.replace(/^([a-z][a-z0-9+.-]*:)?\/\/[^/?#]*@/i,"$1//");return dT(A)?{text:n0e,cut:!0}:{text:A,cut:!1,stripped:A!==e}}let s=r.password!==""||r.username!==""&&/(^|\+)https?:$/i.test(r.protocol),g=s;if(s)r.username="",r.password="";let h=!1;if(dT(Ho(r.search)))r.search="",r.hash="",h=!0;let R=r.href;return{text:n?R.replace(/^https:/,""):R,cut:h,stripped:g}};
function Ho(e){try{return decodeURIComponent(e)}catch{return e}};
function szt(e,n){if(n.trim()==="")return{value:n,cut:!1,stripped:!1};let r=/^(?:INPUT_)?GOPROXY$/i.test(e),s=!/^INPUT_/i.test(e)&&an(e)!==void 0,g=!1,h=!1,R=!1,A=r?/(\s*[,|]\s*|\s+)/:s?/(\s+)/:null,v=(A===null?[n]:n.split(A)).flatMap((H)=>{if(R)return[];let D=/^([A-Za-z0-9_.-]+=)(?=[a-z][a-z0-9+.-]*:\/\/|\/\/)/i.exec(H),x=D?D[1]:"",w=H.slice(x.length);if(!w.startsWith("//")&&!Lo.test(w)){if(H.trim()!==""&&dT(H))return g=!0,h=!0,[r?"off":n0e];return[H]}let k=wo(w);if(h||=k.cut||k.stripped===!0,k.cut||k.stripped&&(r||s)){if(g=!0,r)return R=!0,["off"]}return[x+k.text]}).join("");if(r)v=v.replace(/[,|\s]+$/,"");if(v!==""&&dT(v))return{value:r?"off":n0e,cut:!0,stripped:!0};return{value:v===""?n0e:v,cut:g,stripped:h}};
function M9r(e,n){let r=/^INPUT_/i.test(e)?void 0:an(e);if(r===void 0)return;let s=n.split(/\s+|,|\|/).map((h)=>h.replace(/^[A-Za-z0-9_.-]+=(?=[a-z][a-z0-9+.-]*:\/\/|\/\/)/i,"")).find((h)=>h.startsWith("//")||/^https?:\/\//i.test(h)),g=n0e;if(s!==void 0)try{let h=new URL(s.startsWith("//")?`https:${s}`:s).origin;g=h==="null"?n0e:`${h}/`}catch{g=n0e}return{name:r,value:g}};
var yje=Oo.flatMap((e)=>[e,`INPUT_${e}`]);
var L9r=["ANTHROPIC_API_KEY","ANTHROPIC_AUTH_TOKEN","ANTHROPIC_CUSTOM_HEADERS","CLAUDE_CODE_OAUTH_TOKEN","CLAUDE_CODE_OAUTH_REFRESH_TOKEN","CLAUDE_CODE_ARTIFACTS_API_TOKEN","CLAUDE_CODE_MEMORY_API_TOKEN","CLAUDE_CODE_SLACK_TAG_TOKEN","ANTHROPIC_FOUNDRY_API_KEY","ANTHROPIC_FOUNDRY_AUTH_TOKEN","ANTHROPIC_AWS_API_KEY","ANTHROPIC_IDENTITY_TOKEN","ANTHROPIC_IDENTITY_TOKEN_FILE","ALL_INPUTS"];
var N9r=L9r.flatMap((e)=>[e,`INPUT_${e}`]);
function dse(e){return e.toUpperCase().replace(/-/g,"_")};
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
return {jj,Oo,sn,No,vo,NQe,an,ln,n0e,cn,D9r,Lo,wo,Ho,szt,M9r,yje,L9r,N9r,dse,rt,F9r,pn,gn,fn,_n,Sn,mn,en,xo,ko,xSt,Uo,use,oi,Cn,si,azt,ci,ui,aCn,n9o,Nn,st,di,pi,lzt};
}
function module6(imports){

function B7o(n){if(typeof n==="boolean")return n?"1":"0";return String(n)};
return {B7o};
}
function module7(imports){
const B7o=imports["B7o"];
function ZZe(t,o){let _=Object.create(o);for(let[r,s]of Object.entries(t)){let n=_,e;Object.defineProperty(_,r,{get:()=>{let C=process.env[r];if(C!==n)e=s.parse(C),n=C;return e},enumerable:!0,configurable:!0})}return Object.defineProperties(_,{set:{value:(r,s)=>{process.env[r]=B7o(s)}},unset:{value:(r)=>{delete process.env[r]}}}),_};
var JU={};
var Dn=ZZe(JU,null);
return {ZZe,JU,Dn};
}
function module8(imports){

var nD="proxy-injected";
return {nD};
}
function module9(imports){
const T=imports["T"];
const U=imports["U"];
const a=imports["a"];
const Rrr=imports["Rrr"];
const C=imports["C"];
const Le=imports["Le"];
const gs=imports["gs"];
const Pzt=imports["Pzt"];
const Awe=imports["Awe"];
const Pje=imports["Pje"];
const s9r=imports["s9r"];
const ol=imports["ol"];
const N9r=imports["N9r"];
const dse=imports["dse"];
const jj=imports["jj"];
const Dn=imports["Dn"];
const t=imports["t"];
const FQe=imports["FQe"];
const yje=imports["yje"];
const nD=imports["nD"];
const azt=imports["azt"];
const lzt=imports["lzt"];
const xSt=imports["xSt"];
const use=imports["use"];
const n9o=imports["n9o"];
const aCn=imports["aCn"];
const NQe=imports["NQe"];
const szt=imports["szt"];
const M9r=imports["M9r"];
const D9r=imports["D9r"];
const izt=imports["izt"];
const dT=imports["dT"];
var NGt="ssh-placeholder";
var SQe=["CLAUDE_BG_DISPATCHER_SUBSCRIPTION_TYPE","CLAUDE_BG_DISPATCHER_RATE_LIMIT_TIER"];
var mt=/[ \t\n\v\f\r'"]/;
function xe(e){let r=e.HTTP_PROXY||e.http_proxy||e.CLAUDE_CODE_HTTP_PROXY,n=e.HTTPS_PROXY||e.https_proxy||e.CLAUDE_CODE_HTTPS_PROXY,s=Rrr(e);if(!r&&!n)return{};let i=he(r),c=he(n);if(!c.host)c=i;let d={},p=(h,m)=>{if(m&&e[h]===void 0)d[h]=m};if(p("YARN_HTTP_PROXY",r),p("YARN_HTTPS_PROXY",n),p("npm_config_proxy",r),p("npm_config_https_proxy",n),p("npm_config_noproxy",s),p("GLOBAL_AGENT_HTTP_PROXY",r),p("GLOBAL_AGENT_HTTPS_PROXY",n),p("GLOBAL_AGENT_NO_PROXY",s),p("ELECTRON_GET_USE_PROXY","1"),p("DOCKER_HTTP_PROXY",r),p("DOCKER_HTTPS_PROXY",n),c.host)p("CLOUDSDK_PROXY_TYPE","http"),p("CLOUDSDK_PROXY_ADDRESS",c.host),p("CLOUDSDK_PROXY_PORT",c.port),p("CLOUDSDK_PROXY_USERNAME",c.user),p("CLOUDSDK_PROXY_PASSWORD",c.pass);if(p("FSSPEC_GCS",'{"session_kwargs": {"trust_env": true}}'),c.host){let h=e.JAVA_TOOL_OPTIONS;if(!h?.includes("-Dhttps.proxyHost=")){let m=_t(i,c,s);d.JAVA_TOOL_OPTIONS=h?`${h} ${m}`:m}}return d};
function he(e){if(!e)return{host:"",port:"",user:"",pass:""};try{let r=new URL(e);if(!r.hostname)return{host:"",port:"",user:"",pass:""};return{host:r.hostname.startsWith("[")&&r.hostname.endsWith("]")?r.hostname.slice(1,-1):r.hostname,port:r.port||(r.protocol==="https:"?"443":"80"),user:decodeURIComponent(r.username),pass:decodeURIComponent(r.password)}}catch{return{host:"",port:"",user:"",pass:""}}};
function _t(e,r,n){let s=[],i=(c,d)=>{if(d&&!mt.test(d))s.push(`-D${c}=${d}`)};if(i("http.proxyHost",e.host),i("http.proxyPort",e.port),i("https.proxyHost",r.host),i("https.proxyPort",r.port),i("http.proxyUser",e.user),i("http.proxyPassword",e.pass),i("https.proxyUser",r.user),i("https.proxyPassword",r.pass),n)i("http.nonProxyHosts",Et(n));return s.push("-Djdk.http.auth.tunneling.disabledSchemes="),s.push("-Djdk.http.auth.proxying.disabledSchemes="),s.join(" ")};
function Et(e){return e.split(/[,\s]+/).map((r)=>r.trim()).filter(Boolean).flatMap((r)=>{if(r.startsWith("."))return[`*${r}`];return ht(r)??[r]}).join("|")};
function ht(e){let r=e.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$/);if(!r)return;let n=[Number(r[1]),Number(r[2]),Number(r[3]),Number(r[4])],s=Number(r[5]);if(n.some((m)=>m>255)||s<8||s>24)return[e];let i=Math.floor(s/8),c=s%8;if(c===0)return[`${n.slice(0,i).join(".")}.*`];let d=2**(8-c);if(d>16)return[e];let p=n[i]-n[i]%d,h=[];for(let m=p;m<p+d;m++)h.push(`${[...n.slice(0,i),m].join(".")}.*`);return h};
var ije=["CLAUDE_CODE_SESSION_KIND","CLAUDE_BG_SOURCE","CLAUDE_BG_ISOLATION","CLAUDE_BG_BACKEND","CLAUDE_CODE_SESSION_NAME","CLAUDE_CODE_RESUME_INTERRUPTED_TURN","CLAUDE_CODE_RESUME_INTERRUPTED_TURN_MAX_AGE_MS","CLAUDE_CODE_RESUME_PROMPT","CLAUDE_CODE_RESUME_REASON","CLAUDE_CODE_RESUME_SOURCE_ALIVE","CLAUDE_BG_POST_CLEAR_RESPAWN","CLAUDE_BG_SESSION_PERMISSION_RULES","CLAUDE_BG_MEMORY_TOGGLED_OFF","CLAUDE_BG_AUTO_MEMORY_OFF","CLAUDE_BG_WORKSPACE_TRUSTED","CLAUDE_CODE_RELAUNCH_HOME_TRUST",...SQe];
function Pd(){let e=C.scrubEnabledLatched;if(e!==void 0)return e;let r=Le(process.env.CLAUDE_CODE_SUBPROCESS_ENV_SCRUB);return C.setScrubEnabledLatched(r),r};
function Yer(){if(Pd())return!0;if(gs(process.env.CLAUDE_CODE_SUBPROCESS_ENV_SCRUB))return!1;return process.env.CLAUDE_CODE_ENTRYPOINT==="local-agent"};
function Eds(e){T.of(U().host).getAgentProxyEnv=e};
function vds(e){T.of(U().host).getGhStandinDir=e};
function Xer(e){T.of(U().host).settingsColorEnv=e};
function Jer(e){return e.startsWith("CLAUDE_CODE_ARTIFACT")&&e.endsWith("_BASE_URL")};
function Qer(e){let r=e.toUpperCase();return!xSt(e)&&use(e)&&!n9o.has(r)&&!aCn(r)};
var xt=new Set(Pzt.map((e)=>e.toUpperCase()));
function Zer(){if(!Tvn())return[];let e=T.of(U().host);if(!e.hipaaTierNoticeGiven)e.hipaaTierNoticeGiven=!0,t("HIPAA: withholding this CLI's Anthropic credentials from child processes and config ${VAR} expansion");return N9r};
function Tvn(){return ol("hipaa")};
var Ce=new Set(N9r.map((e)=>e.toUpperCase()));
function FGt(e){let r=e.replace(/^INPUT_/,"");return Jer(r)||Awe(r)||r.startsWith("OTEL_")||r==="CLAUDE_CODE_OTEL_DIAG_STDERR"};
function etr(){let e=process.env,r=(s)=>e.ANTHROPIC_UNIX_SOCKET!==void 0&&(s==="CLAUDE_CODE_OAUTH_TOKEN"||s==="ANTHROPIC_API_KEY")&&e[s]===NGt,n=(s)=>!Object.keys(e).some((i)=>i!==s&&i.toUpperCase()===s);return[...Pzt.filter((s)=>!r(s)),...Object.keys(e).filter((s)=>FGt(s.toUpperCase())),...Pje(e),...s9r(),...Zer().filter((s)=>!(r(s)&&n(s))),"CLAUDE_CODE_SUBSCRIPTION_TYPE","CLAUDE_CODE_RATE_LIMIT_TIER","CLAUDE_CODE_PLUGIN_ATTRIBUTION","CLAUDE_CODE_SKILL_ATTRIBUTION","CLAUDE_CODE_BRIDGE_CHILD_AUTO_DEFAULT","CLAUDE_CODE_BRIDGE_CHILD_ARTIFACT","CLAUDE_CODE_BRIDGE_CHILD_MACHINE_SETTINGS","CLAUDE_CODE_CONFIG_PROBE","CLAUDE_CODE_HOST_PROMPT_SUPERSEDES_RECORD","CLAUDE_CODE_MCP_SERVE_SETTINGS",...ije]};
var gt=new Set(["BUN_GC_TIMER_INTERVAL","BUN_GC_TIMER_DISABLE","BUN_GC_RUNS_UNTIL_SKIP_RELEASE_ACCESS","BUN_IDLE_GC_SECONDS"]);
var Ct=new Set(["MIMALLOC_PURGE_HOLES_MIN_INTERVAL"]);
function De(e){let r=e.toUpperCase();return r.startsWith("BUN_JSC_")||gt.has(r)||Ct.has(r)};
function Ot(){if(a.CLAUDE_CODE_REMOTE!==!0)return[];return Object.keys(process.env).filter(De)};
function Ko(){let e=T.of(U().host),r=e.getAgentProxyEnv?.()??{},n=Object.keys(r).length>0,{settingsColorEnv:s}=e,i=Object.keys(s).length>0,d=a.CLAUDE_CODE_REMOTE===!0?xe(n?{...process.env,...r}:process.env):{},p=Object.keys(d).length>0,h=Yer(),m=Object.keys(process.env).some((_)=>xt.has(_.toUpperCase()))||Object.keys(process.env).some((_)=>FGt(_.toUpperCase()))||process.env.CLAUDE_CODE_SUBSCRIPTION_TYPE!==void 0||process.env.CLAUDE_CODE_RATE_LIMIT_TIER!==void 0,O=Pje(process.env),R=s9r(),z=Tvn()&&Object.keys(process.env).some((_)=>Ce.has(dse(_))),X=!1;X=ije.some((_)=>process.env[_]!==void 0);let Pe=Object.keys(process.env).some((_)=>/^(INPUT_)?(OTEL_|CLAUDE_CODE_OTEL_DIAG_STDERR$)/i.test(_)),ye=a.CLAUDE_CODE_PLUGIN_ATTRIBUTION!==void 0||a.CLAUDE_CODE_SKILL_ATTRIBUTION!==void 0,Ue=a.CLAUDE_CODE_QUESTION_EXTENDED||a.CLAUDE_CODE_QUESTION_OPTIONAL_DESCRIPTIONS,Ne=a.CLAUDE_CODE_SDK_HAS_OAUTH_REFRESH,be=a.CLAUDE_CODE_SDK_READS_SESSION_STATE,ve=jj(),we=a.CLAUDE_CODE_BRIDGE_CHILD_AUTO_DEFAULT||a.CLAUDE_CODE_BRIDGE_CHILD_ARTIFACT||a.CLAUDE_CODE_BRIDGE_CHILD_MACHINE_SETTINGS,He=a.CLAUDE_CODE_CONFIG_PROBE,$e=a.CLAUDE_CODE_MCP_STARTUP_WAIT_MS!==void 0,Be=a.CLAUDE_CODE_MCP_APPS_HOST,ke=a.CLAUDE_CODE_ARTIFACT_SHARE!==void 0,Fe=a.CLAUDE_CHROME_TAB_GROUP_KEY!==void 0,Ge=a.CLAUDE_CODE_HOST_PROMPT_SUPERSEDES_RECORD,We=Dn.CLAUDE_CODE_MCP_SERVE_SETTINGS!==void 0,q=!1,J=Ot().length>0;if(!n&&!p&&!h&&!X&&!m&&!O.length&&!R.length&&!z&&!Pe&&!i&&!ye&&!Ue&&!Ne&&!be&&!ve&&!we&&!He&&!$e&&!Be&&!ke&&!Fe&&!Ge&&!We&&!q&&!J)return process.env;let E={...process.env,...s,...r,...d},Me=new Set([...etr(),"CLAUDE_CODE_SUBSCRIPTION_TYPE","CLAUDE_CODE_RATE_LIMIT_TIER","CLAUDE_CODE_QUESTION_EXTENDED","CLAUDE_CODE_QUESTION_OPTIONAL_DESCRIPTIONS","CLAUDE_CODE_SDK_HAS_OAUTH_REFRESH","CLAUDE_CODE_SDK_READS_SESSION_STATE","CLAUDE_CODE_REMOTE_TOOLS_PIN_STORED_LOGIN","CLAUDE_CODE_BRIDGE_CHILD_AUTO_DEFAULT","CLAUDE_CODE_BRIDGE_CHILD_ARTIFACT","CLAUDE_CODE_BRIDGE_CHILD_MACHINE_SETTINGS","CLAUDE_CODE_CONFIG_PROBE","CLAUDE_CODE_MCP_STARTUP_WAIT_MS","CLAUDE_CODE_MCP_APPS_HOST","CLAUDE_CODE_ARTIFACT_SHARE","CLAUDE_CHROME_TAB_GROUP_KEY"].map((_)=>_.toUpperCase()));for(let _ of Object.keys(E))if(Me.has(_.toUpperCase())||z&&_.includes("-")&&Ce.has(dse(_)))delete E[_];for(let _ of ije)delete E[_];for(let _ of Object.keys(E))if(_.startsWith("OTEL_"))delete E[_];if(delete E.CLAUDE_CODE_OTEL_DIAG_STDERR,delete E.CLAUDE_CODE_PLUGIN_ATTRIBUTION,delete E.CLAUDE_CODE_SKILL_ATTRIBUTION,q){for(let _ of Object.keys(E))if(At(_))delete E[_]}if(J){for(let _ of Object.keys(E))if(De(_))delete E[_]}if(!h)return E;let je=Tt(),Ke=FQe().length>0;for(let[_,S]of Object.entries(E)){if(S===nD&&Object.hasOwn(r,_))continue;if((_==="CLAUDE_CODE_OAUTH_TOKEN"||_==="ANTHROPIC_API_KEY")&&S===NGt&&E.ANTHROPIC_UNIX_SOCKET!==void 0)continue;if(je.has(dse(_))||azt.test(_)||lzt(_)||Ke&&Qer(_)){delete E[_];continue}if(S===void 0||xSt(_))continue;let D=typeof S==="string"?S:String(S);if(NQe(_)){let b=szt(_,D);if(b.value!==D)E[_]=b.value;if(b.cut){let v=M9r(_,b.value);if(v!==void 0&&!D9r(E,v.name))E[v.name]=v.value}continue}let N=izt(_,D);if(N===void 0){if(dT(D))delete E[_]}else if(N!==D)if(N==="")delete E[_];else E[_]=N}return E};
function At(e){return!1};
var M;
function Tt(){let e=FQe(),r=e.length>0;if(M?.armed!==r)M={armed:r,names:new Set([...yje,...e].map((n)=>n.toUpperCase()))};return M.names};
return {NGt,SQe,mt,xe,he,_t,Et,ht,ije,Pd,Yer,Eds,vds,Xer,Jer,Qer,xt,Zer,Tvn,Ce,FGt,etr,gt,Ct,De,Ot,Ko,At,M,Tt};
}
const m0=module0({});
const m1=module1({});
const m2=module2({"Le":m1["Le"]});
const m3=module3({"T_":ports["bridgeCarrierOwner"]});
const m4=module4({"a":ports["taintRegistry"],"U":ports["execution"]});
const m5=module5({"a":ports["environment"],"dT":ports["containsCredential"]});
const m6=module6({});
const m7=module7({"B7o":m6["B7o"]});
const m8=module8({});
const m9=module9({"T":ports["hostRegistry"],"U":ports["execution"],"a":ports["environment"],"Rrr":m0["Rrr"],"C":ports["subprocessScrubState"],"Le":m1["Le"],"gs":m1["gs"],"Pzt":m2["Pzt"],"Awe":m2["Awe"],"Pje":m2["Pje"],"s9r":m3["s9r"],"ol":m4["ol"],"N9r":m5["N9r"],"dse":m5["dse"],"jj":m5["jj"],"Dn":m7["Dn"],"t":ports["debug"],"FQe":ports["scrubPathNames"],"yje":m5["yje"],"nD":m8["nD"],"azt":m5["azt"],"lzt":m5["lzt"],"xSt":m5["xSt"],"use":m5["use"],"n9o":m5["n9o"],"aCn":m5["aCn"],"NQe":m5["NQe"],"szt":m5["szt"],"M9r":m5["M9r"],"D9r":m5["D9r"],"izt":ports["scrubCommand"],"dT":ports["containsCredential"]});
return {"subprocessEnv":m9.Ko,"publishSettingsColor":m9.Xer,"registerProxy":m9.Eds,"registerGhStandin":m9.vds};
}
