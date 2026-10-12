// Complete pinned 287 remote cache owner/identity/consent closures; original lexical modules retained.
function module0(imports){

class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}};
return {V};
}
function module1(imports){

function Le(e){if(!e)return!1;if(typeof e==="boolean")return e;let n=String(e).toLowerCase().trim();return["1","true","yes","on"].includes(n)};
function gs(e){if(e===void 0)return!1;if(typeof e==="boolean")return!e;let n=String(e).toLowerCase().trim();return["0","false","no","off"].includes(n)};
var s=globalThis.process?.getBuiltinModule?.("async_hooks");
var wKt=s?(e)=>s.AsyncResource.bind(e):(e)=>e;
function Me(){let e=new Set;return{subscribe(n){let r=wKt(n);return e.add(r),()=>{e.delete(r)}},emit(...n){let r;for(let o of e)try{o(...n)}catch(i){(r??=[]).push(i)}if(r)throw r.length===1?r[0]:AggregateError(r,"Signal listener(s) threw")},clear(){e.clear()}}};
return {Le,gs,s,wKt,Me};
}
function module2(imports){

function Vt(t,n,e=0){let r=0,i=t.indexOf(n,e);while(i!==-1)r++,i=t.indexOf(n,i+1);return r};
return {Vt};
}
function module3(imports){

function L(n){return[...new Set(n)]};
return {L};
}
function module4(imports){
const t=imports["t"];
const we=imports["we"];
function Zfe(e){return t(we())===t(e)};
return {Zfe};
}
function module5(imports){
const ae=imports["ae"];
const bo=imports["bo"];
const t=imports["t"];
function u(n,e,i){D0e(n.statSync(e),e,i)};
function D0e(n,e,i){if(n.isDirectory())throw Object.assign(Error("EISDIR: illegal operation on a directory, read"),{code:"EISDIR",errno:-21,syscall:"read",path:e});if(!n.isFile())throw Object.assign(Error("Not a regular file (device, FIFO, or socket)"),{code:"ERR_NOT_REGULAR_FILE",path:e});if(i!==void 0&&n.size>i)throw Object.assign(Error("File exceeds maxBytes limit"),{code:"ERR_FILE_TOO_LARGE",path:e,size:n.size,maxBytes:i})};
function yrr(n,e,i){if(i===void 0)return;if(n>i)throw Object.assign(Error("File exceeds maxBytes limit"),{code:"ERR_FILE_TOO_LARGE",path:e,size:n,maxBytes:i})};
function t$(n){return n!=null&&typeof n==="object"&&"code"in n&&n.code==="ERR_FILE_TOO_LARGE"};
function HAn(n){if(n.byteLength===0)return"utf8";if(n.byteLength>=2){if(n[0]===255&&n[1]===254)return"utf16le"}if(n.byteLength>=3&&n[0]===239&&n[1]===187&&n[2]===191)return"utf8";return"utf8"};
function zXr(n){let{buffer:e,bytesRead:i}=ae().readSync(n,{length:4096});return HAn(e.subarray(0,i))};
function DAn(n){let e=0,i=0;for(let r=0;r<n.length;r++)if(n[r]===`
`)if(r>0&&n[r-1]==="\r")e++;else i++;return e>i?"CRLF":"LF"};
function VXr(n,e){let i=ae(),{resolvedPath:r,isSymlink:s}=bo(i,n);if(s)t(`Reading through symlink: ${n} -> ${r}`);u(i,n,e);let o=zXr(n),c;if(e===void 0)c=i.readFileSync(n,{encoding:o});else{let{buffer:g,bytesRead:a}=i.readSync(n,{length:e+1});yrr(a,n,e),c=g.subarray(0,a).toString(o)}let d=DAn(c.slice(0,4096));return{content:c.replaceAll(`\r
`,`
`),encoding:o,lineEndings:d}};
function gL(n,e){return VXr(n,e).content};
return {u,D0e,yrr,t$,HAn,zXr,DAn,VXr,gL};
}
function module6(imports){
const a=imports["a"];
var Mor=new Set(["claude-desktop","claude-desktop-3p"]);
function f$(){{let e=a.CLAUDE_CODE_ENTRYPOINT;return a.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST&&a.CLAUDE_CODE_USE_GATEWAY&&(e!==void 0&&Mor.has(e)||i())}return!1};
function i(){return a.CLAUDE_CODE_HOST_GATEWAY_LINEAGE&&!!a.CLAUDE_CODE_HOST_CREDS_FILE};
return {Mor,f$,i};
}
function module7(imports){

function r(e,n,a){return a===void 0?e:{...e,[n]:a}};
function f(e,n,a,t){let o=r({namespace:"transcript",projectKey:e,sessionId:n},"agentId",a);return r(o,"agentRelPath",t)};
function h(e,n,a){let c=r({namespace:"log",sessionId:e,channel:n},"agentId",a?.agentId);return r(c,"runId",a?.runId)};
var De={transcript:f,journal:(e,n,a)=>({namespace:"transcript",projectKey:e,sessionId:n,agentRelPath:a,journal:!0}),sessionJournal:(e,n,a)=>({namespace:"transcript",projectKey:e,sessionId:n,sessionJournal:a}),history:()=>({namespace:"history"}),log:h,globalConfig:()=>({namespace:"globalConfig"}),globalConfigCopy:(e,n)=>({namespace:"globalConfig",kind:e,stamp:n}),userSettings:()=>({namespace:"settings",layer:"user"}),projectSettings:(e)=>({namespace:"settings",layer:"project",projectKey:e}),localSettings:(e)=>({namespace:"settings",layer:"local",consentRootKey:e}),task:(e,n)=>({namespace:"task",listId:e,taskId:n}),taskListMeta:(e)=>({namespace:"task",listId:e,meta:!0}),taskListHighWaterMark:(e)=>({namespace:"task",listId:e,highWaterMark:!0}),memory:(e,n)=>({namespace:"memory",projectKey:e,relPath:n}),pluginRegistry:(e)=>({namespace:"pluginRegistry",file:e}),marketplaceCache:(e,n)=>({namespace:"marketplaceCache",marketplace:e,form:n}),marketplaceTree:(e,n)=>({namespace:"marketplaceCache",marketplace:e,relPath:n}),pluginCache:(e,n,a,t)=>({namespace:"pluginCache",marketplace:e,plugin:n,version:a,relPath:t}),cache:(e,n)=>({namespace:"cache",store:e,id:n}),paste:(e)=>({namespace:"paste",id:e}),state:(e)=>({namespace:"state",id:e}),pluginAssetCache:(e)=>({namespace:"pluginAssetCache",digest:e}),plan:(e)=>({namespace:"plan",name:e}),daemon:(e)=>({namespace:"daemon",relPath:e}),feedbackDraft:(e)=>({namespace:"feedbackDraft",draftId:e}),agentMemory:(e,n)=>({namespace:"agentMemory",layer:"user",agentType:e,relPath:n}),identity:()=>({namespace:"identity"}),team:(e)=>({namespace:"team",team:e}),sidecar:(e,n,a)=>({namespace:"sidecar",projectKey:e,sessionId:n,relPath:a}),mailbox:(e,n)=>({namespace:"mailbox",team:e,teammate:n}),scratch:(e,n)=>({namespace:"scratch",sessionId:e,relPath:n}),userConfigDir:(e,n)=>({namespace:"userConfigDir",dir:e,relPath:n}),fileHistory:(e,n)=>({namespace:"fileHistory",sessionId:e,backupFileName:n}),job:(e,n)=>({namespace:"job",jobId:e,relPath:n}),jobTimeline:(e)=>({namespace:"jobTimeline",jobId:e}),recording:(e,n,a)=>({namespace:"recording",projectKey:e,sessionId:n,stamp:a}),sessionLog:(e,n,a)=>({namespace:"sessionLog",projectKey:e,year:n.year,month:n.month,day:n.day,logName:a}),jobPins:()=>({namespace:"jobsRoot",file:"pins"}),jobDraft:(e)=>({namespace:"jobsRoot",draftKey:e}),session:(e)=>({namespace:"session",file:e}),bridgePointer:(e)=>({namespace:"bridgePointer",projectKey:e}),sessionAliases:(e)=>({namespace:"sessionAliases",projectKey:e}),dirSyncRecord:(e,n)=>({namespace:"dirSyncRecord",projectKey:e,sessionId:n})};
return {r,f,h,De};
}
function module8(imports){

var wr={[Symbol.dispose](){}};
function Rr(){return wr};
var ng=Rr;
var Y=(e,n)=>{using r=ng`JSON.parse(${Se(e)})`;return typeof n>"u"?JSON.parse(e):JSON.parse(e,n)};
function Se(e){return typeof e==="string"?e.length:e};
return {wr,Rr,ng,Y,Se};
}
function module9(imports){

function Do(e){return e.startsWith("\uFEFF")?e.slice(1):e};
return {Do};
}
function module10(imports){

class i{resetters=[];built=[];lazy(e){let t,r=()=>{t=void 0};return this.resetters.push(r),()=>{if(t===void 0)t=e(),this.built.push(r);return t}}builtCount(){return this.built.length}releaseBuiltSince(e){for(let t of this.built.splice(e))t()}reset(){for(let e of this.resetters)e();this.built.length=0}};
var _rr=new i;
function f(e){return _rr.lazy(e)};
return {i,_rr,f};
}
function module11(imports){
const V=imports["V"];
const Me=imports["Me"];
const Zt=imports["Zt"];
const _=imports["_"];
const Vt=imports["Vt"];
const L=imports["L"];
const Le=imports["Le"];
const gs=imports["gs"];
const F=imports["F"];
const Zfe=imports["Zfe"];
const gL=imports["gL"];
const gl=imports["gl"];
const we=imports["we"];
const t=imports["t"];
const l=imports["l"];
const U=imports["U"];
const f$=imports["f$"];
const De=imports["De"];
const Ro=imports["Ro"];
const di=imports["di"];
const Y=imports["Y"];
const Do=imports["Do"];
const t$=imports["t$"];
const va=imports["va"];
const f=imports["f"];
var p0e=["AWS_ACCESS_KEY_ID","AWS_SECRET_ACCESS_KEY","AWS_SESSION_TOKEN"];
var Nt="_PARENT_PAIR_SUPPRESSOR_";
var nu=["low","medium","high","xhigh","max"];
function ACn(e){return e===void 0||e===!1?e:!0};
var st=f(()=>[{path:["allowManagedPermissionRulesOnly"],restrictive:!0},{path:["allowManagedHooksOnly"],restrictive:!0},{path:["allowManagedMcpServersOnly"],restrictive:!0},{path:["enforceAvailableModels"],restrictive:!0},{path:["disableAllHooks"],restrictive:!0},{path:["disableClaudeAiConnectors"],restrictive:!0},{path:["disableCommandPluginSources"],restrictive:!0},{path:["disableSideloadFlags"],restrictive:!0},{path:["disableSkillShellExecution"],restrictive:!0},{path:["disableRemoteControl"],restrictive:!0},{path:["disableAgentView"],restrictive:!0},{path:["disableWorkflows"],restrictive:!0},{path:["disableArtifact"],restrictive:!0},{path:["disableBundledSkills"],restrictive:!0},{path:["fastModePerSessionOptIn"],restrictive:!0},{path:["isolatePeerMachines"],restrictive:!0},{path:["strictPluginOnlyCustomization"],restrictive:!0},{path:["disableAutoMode"],restrictive:"disable"},{path:["disableDeepLinkRegistration"],restrictive:"disable"},{path:["permissions","disableBypassPermissionsMode"],restrictive:"disable"},{path:["permissions","disableAutoMode"],restrictive:"disable"},{path:["permissions","blockReadsOutsideWorkingDirectories"],restrictive:!0},{path:["autoMode","classifyAllShell"],restrictive:!0},{path:["worktree","bgIsolation"],restrictive:"worktree"},{path:["enableArtifact"],restrictive:!1},{path:["enableWorkflows"],restrictive:!1},{path:["syncClaudeAiSkills"],restrictive:!1},{path:["syncClaudeAiPlugins"],restrictive:!1},{path:["useAutoModeDuringPlan"],restrictive:!1},{path:["skipDangerousModePermissionPrompt"],restrictive:!1},{path:["skipAutoPermissionPrompt"],restrictive:!1},{path:["enableAllProjectMcpServers"],restrictive:!1},{path:["channelsEnabled"],restrictive:!1},{path:["skipWebFetchPreflight"],restrictive:!1},{path:["skipWorkflowUsageWarning"],restrictive:!1},{path:["autoUploadSessions"],restrictive:!1},{path:["remoteControlAtStartup"],restrictive:!1},{path:["remoteTools","allowUnattendedServing"],restrictive:!1},{path:["autoContinueAtUsageLimit"],restrictive:!1},{path:["disablePluginDirectory"],restrictive:!0,normalize:ACn},{path:["attribution","sessionUrl"],restrictive:!1},{path:["crossSessionInbound"],restrictive:["refuse","hold"]},{path:["remoteControl","shareHostProfile"],restrictive:["off","basic"]},{path:["modelProposedGoals"],restrictive:["disabled","alwaysAsk"]},{path:["maxEffortLevel"],restrictive:nu},{path:["feedbackDrafts"],restrictive:"off"},{path:["availableModelsMatch"],restrictive:"exact"},{path:["askUserQuestionTimeout"],restrictive:"never"},{path:["dialogExpiry"],restrictive:"never"},{path:["sandbox","enabled"],restrictive:!0},{path:["sandbox","failIfUnavailable"],restrictive:!0},{path:["sandbox","autoAllowBashIfSandboxed"],restrictive:!1},{path:["sandbox","allowUnsandboxedCommands"],restrictive:!1},{path:["sandbox","enableWeakerNestedSandbox"],restrictive:!1},{path:["sandbox","enableWeakerNetworkIsolation"],restrictive:!1},{path:["sandbox","allowAppleEvents"],restrictive:!1},{path:["sandbox","network","allowManagedDomainsOnly"],restrictive:!0},{path:["sandbox","network","strictAllowlist"],restrictive:!0},{path:["sandbox","network","allowAllUnixSockets"],restrictive:!1},{path:["sandbox","network","allowLocalBinding"],restrictive:!1},{path:["sandbox","filesystem","allowManagedReadPathsOnly"],restrictive:!0},{path:["sandbox","filesystem","disabled"],restrictive:!1},{path:["sandbox","credentials","allowPlaintextInject"],restrictive:!1},{path:["sandbox","credentials","sigv4","streaming"],restrictive:"deny"},{path:["sandbox","credentials","sigv4","presigned"],restrictive:"deny"},{path:["sandbox","credentials","sigv4","sigv4a"],restrictive:"deny"},{path:["isolation","required"],restrictive:!0},{path:["isolation","persistHome"],restrictive:!1}]);
function dt(e){return Array.isArray(e)?e:[e]};
function Te(e,n){let s=e;for(let r of n){if(s===null||typeof s!=="object")return;s=s[r]}return s};
function qe(e,n,s){let r=[e],i=e;for(let c of n.slice(0,-1)){let p={...i[c]};i[c]=p,i=p,r.push(i)}let d=n.at(-1);if(s!==void 0){i[d]=s;return}delete i[d];for(let c=r.length-1;c>0;c--){if(Object.keys(r[c]).length>0)break;delete r[c-1][n[c-1]]}};
function dn(e,n){let s=Te(n,e.path);return e.normalize===void 0?s:e.normalize(s)};
var er=new Set(["disableAllHooks"]);
function nnr(e){let n={};for(let m of st()){let{path:y,restrictive:S}=m;if(er.has(y[0]))continue;let b=dn(m,e);if((typeof b==="boolean"||typeof b==="string")&&dt(S).includes(b))qe(n,y,b)}if(Te(e,["attribution"])===!1)qe(n,["attribution","sessionUrl"],!1);let s=cn(e.permissions,["deny","ask","disableBypassPermissionsMode","disableAutoMode"]);if(s)n.permissions={...n.permissions,...s};for(let m of Hc)if(e[m]!==void 0)n[m]=e[m];for(let[m,y]of Object.entries(e))if((m.startsWith("disable")&&(y===!0||y==="disable")||m.startsWith("enable")&&y===!1)&&!er.has(m))n[m]=y;if(e.disableAllHooks===!0)n.allowManagedHooksOnly=!0;if(Array.isArray(e.httpHookAllowedEnvVars)&&e.httpHookAllowedEnvVars.length===0)n.httpHookAllowedEnvVars=[];let r=cn(e.sandbox?.filesystem,["denyRead","denyWrite","allowManagedReadPathsOnly"]),i=cn(e.sandbox?.network,["deniedDomains","strictAllowlist","allowManagedDomainsOnly"]),d=cn(e.sandbox?.credentials,["files","envVars"])??{},c=(e.sandbox?.credentials?.awsPairs??[]).flatMap((m)=>[m.accessKeyIdVar,m.secretAccessKeyVar,m.sessionTokenVar]),p=p0e.filter((m)=>c.includes(m));if(p.length>0)d.awsPairs=p.map((m,y)=>({accessKeyIdVar:m,secretAccessKeyVar:`${Nt}${y+1}_`}));let g=e.sandbox?.credentials?.sigv4;if(g){let m={};for(let[y,S]of Object.entries(g))if(S==="deny")m[y]="deny";if(Object.keys(m).length>0)d.sigv4=m}let h=Object.keys(d).length>0;if(r||i||h){let m=n.sandbox??{};n.sandbox={...m,...r&&{filesystem:{...m.filesystem,...r}},...i&&{network:{...m.network,...i}},...h&&{credentials:{...m.credentials,...d}}}}return Object.keys(n).length>0?n:null};
function cn(e,n){if(!e)return;let s={};for(let r of n)if(e[r]!==void 0)s[r]=e[r];return Object.keys(s).length>0?s:void 0};
var Hc=["allowedMcpServers","deniedMcpServers","allowManagedMcpServersOnly","disabledMcpjsonServers","allowManagedHooksOnly","allowedHttpHookUrls","strictKnownMarketplaces","allowedMarketplaces","blockedMarketplaces","strictPluginOnlyCustomization","availableModels","enforceAvailableModels","availableModelsMatch","deniedModels","allowedProviders"];
function LSt(e){let n=0,s=e.length;while(n<s&&tr(e.charCodeAt(n)))n++;while(s>n&&tr(e.charCodeAt(s-1)))s--;let r=or(e.slice(n,s));if(r!==-1)return{kind:"line_break",index:Ze(e,n+r)};for(let i=n;i<s;i++){let d=e.charCodeAt(i);if(d===0)return{kind:"nul",index:Ze(e,i)};if(d>255)return{kind:"non_ascii",index:Ze(e,i),codePoint:sr(e,i)}}return null};
function or(e){let n=e.indexOf(`
`),s=e.indexOf("\r");if(n===-1)return s;return s===-1?n:Math.min(n,s)};
function tr(e){return e===9||e===32||e===10||e===13};
function sr(e,n){return e.codePointAt(n)??e.charCodeAt(n)};
function Ze(e,n){let s=0;for(let r=0;r<n;r++){let i=e.charCodeAt(r);if(i>=55296&&i<=56319&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320)r++;s++}return s};
var Kj=["CLAUDE_CODE_USE_BEDROCK","CLAUDE_CODE_USE_VERTEX","CLAUDE_CODE_USE_FOUNDRY","CLAUDE_CODE_USE_ANTHROPIC_AWS","CLAUDE_CODE_USE_ANTHROPIC_GOOGLE_CLOUD","CLAUDE_CODE_USE_MANTLE","CLAUDE_CODE_USE_GATEWAY","ANTHROPIC_FOUNDRY_RESOURCE","ANTHROPIC_VERTEX_PROJECT_ID","ANTHROPIC_AWS_WORKSPACE_ID","ANTHROPIC_GOOGLE_CLOUD_PROJECT","ANTHROPIC_GOOGLE_CLOUD_LOCATION","ANTHROPIC_GOOGLE_CLOUD_WORKSPACE_ID","CLOUD_ML_REGION"];
var dr=["CLAUDE_CODE_MEMORY_API_BASE_URL","CLAUDE_CODE_MEMORY_API_TOKEN"];
var qF=["ANTHROPIC_BASE_URL","_CLAUDE_CODE_ASSUME_FIRST_PARTY_BASE_URL","ANTHROPIC_BEDROCK_BASE_URL","ANTHROPIC_VERTEX_BASE_URL","ANTHROPIC_FOUNDRY_BASE_URL","ANTHROPIC_AWS_BASE_URL","ANTHROPIC_GOOGLE_CLOUD_BASE_URL","ANTHROPIC_BEDROCK_MANTLE_BASE_URL","CLAUDE_CODE_ARTIFACTS_API_BASE_URL","CLAUDE_CODE_ARTIFACTS_API_TOKEN","CLAUDE_CODE_ARTIFACT_ASSET_BASE_URL","CLAUDE_CODE_ARTIFACT_LIVE_BASE_URL","CLAUDE_CODE_ARTIFACT_SYNC_BASE_URL","CLAUDE_CODE_ARTIFACT_VIEWER_BASE_URL",...dr];
var uL=["ANTHROPIC_API_KEY","ANTHROPIC_AUTH_TOKEN","CLAUDE_CODE_OAUTH_TOKEN","AWS_BEARER_TOKEN_BEDROCK","ANTHROPIC_FOUNDRY_API_KEY","ANTHROPIC_FOUNDRY_AUTH_TOKEN","ANTHROPIC_AWS_API_KEY"];
var fo=["AWS_ACCESS_KEY_ID","AWS_SECRET_ACCESS_KEY","AWS_SESSION_TOKEN"];
var FSt=[...fo,"AWS_PROFILE","AWS_CONFIG_FILE","AWS_SHARED_CREDENTIALS_FILE","GOOGLE_APPLICATION_CREDENTIALS","GOOGLE_CLOUD_PROJECT"];
var ho=["AWS_CONTAINER_CREDENTIALS_FULL_URI","AWS_CONTAINER_CREDENTIALS_RELATIVE_URI","AWS_CONTAINER_AUTHORIZATION_TOKEN","AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE","AWS_EC2_METADATA_SERVICE_ENDPOINT","AWS_EC2_METADATA_SERVICE_ENDPOINT_MODE","AWS_WEB_IDENTITY_TOKEN_FILE","AWS_ROLE_ARN"];
var PCn=["GCE_METADATA_HOST","GCE_METADATA_ROOT","GCE_METADATA_IP","METADATA_SERVER_DETECTION"];
var cr=["apiKeyHelper","awsAuthRefresh","awsCredentialExport","fileSuggestion","gcpAuthRefresh","otelHeadersHelper","processWrapper","policyHelpers","proxyAuthHelper","statusLine","subagentStatusLine"];
var yo=["bwrapPath","ripgrep","socatPath"];
var ur=["allowAppleEvents","credentials","enableWeakerNestedSandbox","enableWeakerNetworkIsolation","filesystem.disabled","network.allowAllUnixSockets","network.allowMachLookup","network.allowUnixSockets","network.httpProxyPort","network.socksProxyPort","network.tlsTerminate"];
var pr=["required","egress"];
var Jc=new Set(["ANTHROPIC_BEDROCK_REGION_PREFIX","ANTHROPIC_BEDROCK_SERVICE_TIER","ANTHROPIC_CUSTOM_MODEL_OPTION","ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION","ANTHROPIC_CUSTOM_MODEL_OPTION_NAME","ANTHROPIC_CUSTOM_MODEL_OPTION_SUPPORTED_CAPABILITIES","ANTHROPIC_DEFAULT_FABLE_MODEL","ANTHROPIC_DEFAULT_FABLE_MODEL_DESCRIPTION","ANTHROPIC_DEFAULT_FABLE_MODEL_NAME","ANTHROPIC_DEFAULT_FABLE_MODEL_SUPPORTED_CAPABILITIES","ANTHROPIC_DEFAULT_MODEL","ANTHROPIC_DEFAULT_HAIKU_MODEL","ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION","ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME","ANTHROPIC_DEFAULT_HAIKU_MODEL_SUPPORTED_CAPABILITIES","ANTHROPIC_DEFAULT_OPUS_MODEL","ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION","ANTHROPIC_DEFAULT_OPUS_MODEL_NAME","ANTHROPIC_DEFAULT_OPUS_MODEL_SUPPORTED_CAPABILITIES","ANTHROPIC_DEFAULT_SONNET_MODEL","ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION","ANTHROPIC_DEFAULT_SONNET_MODEL_NAME","ANTHROPIC_DEFAULT_SONNET_MODEL_SUPPORTED_CAPABILITIES","ANTHROPIC_FOUNDRY_API_KEY","ANTHROPIC_MODEL","ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION","ANTHROPIC_SMALL_FAST_MODEL","AWS_DEFAULT_REGION","AWS_PROFILE","AWS_REGION","BASH_DEFAULT_TIMEOUT_MS","BASH_MAX_OUTPUT_LENGTH","BASH_MAX_TIMEOUT_MS","CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR","CLAUDE_CODE_API_KEY_HELPER_TTL_MS","CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS","CLAUDE_CODE_DISABLE_TERMINAL_TITLE","CLAUDE_CODE_ENABLE_AUTO_MODE","CLAUDE_CODE_ENABLE_DESIGN_SYNC","CLAUDE_CODE_ENABLE_FEEDBACK_SURVEY_FOR_OTEL","CLAUDE_CODE_ENABLE_TELEMETRY","CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS","CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL","CLAUDE_CODE_MAX_MCP_DESCRIPTION_LENGTH","CLAUDE_CODE_MAX_OUTPUT_TOKENS","CLAUDE_CODE_SKIP_BEDROCK_AUTH","CLAUDE_CODE_SKIP_FOUNDRY_AUTH","CLAUDE_CODE_SKIP_ANTHROPIC_AWS_AUTH","CLAUDE_CODE_SKIP_ANTHROPIC_GOOGLE_CLOUD_AUTH","CLAUDE_CODE_SKIP_MANTLE_AUTH","CLAUDE_CODE_SKIP_VERTEX_AUTH","CLAUDE_CODE_SUBAGENT_MODEL","CLAUDE_CODE_USE_BEDROCK","CLAUDE_CODE_USE_FOUNDRY","CLAUDE_CODE_USE_ANTHROPIC_AWS","CLAUDE_CODE_USE_ANTHROPIC_GOOGLE_CLOUD","CLAUDE_CODE_USE_GATEWAY","CLAUDE_CODE_USE_MANTLE","CLAUDE_CODE_USE_POWERSHELL_TOOL","CLAUDE_CODE_USE_VERTEX","DISABLE_AUTOUPDATER","DISABLE_BUG_COMMAND","DISABLE_COST_WARNINGS","DISABLE_FEEDBACK_COMMAND","DISABLE_GROWTHBOOK","DISABLE_INSTALLATION_CHECKS","DISABLE_UPDATES","ENABLE_TOOL_SEARCH","MAX_MCP_OUTPUT_TOKENS","MAX_THINKING_TOKENS","MCP_CONNECT_TIMEOUT_MS","MCP_TIMEOUT","MCP_TOOL_TIMEOUT","OTEL_EXPORTER_OTLP_COMPRESSION","OTEL_EXPORTER_OTLP_HEADERS","OTEL_EXPORTER_OTLP_LOGS_COMPRESSION","OTEL_EXPORTER_OTLP_LOGS_HEADERS","OTEL_EXPORTER_OTLP_LOGS_PROTOCOL","OTEL_EXPORTER_OTLP_METRICS_COMPRESSION","OTEL_EXPORTER_OTLP_METRICS_HEADERS","OTEL_EXPORTER_OTLP_METRICS_PROTOCOL","OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE","OTEL_EXPORTER_OTLP_PROTOCOL","OTEL_EXPORTER_OTLP_TRACES_COMPRESSION","OTEL_EXPORTER_OTLP_TRACES_HEADERS","OTEL_EXPORTER_OTLP_TRACES_PROTOCOL","OTEL_LOG_ASSISTANT_RESPONSES","OTEL_LOG_TOOL_CONTENT","OTEL_LOG_TOOL_DETAILS","OTEL_LOG_USER_PROMPTS","OTEL_LOGS_EXPORT_INTERVAL","OTEL_LOGS_EXPORTER","OTEL_METRIC_EXPORT_INTERVAL","OTEL_METRICS_EXPORTER","OTEL_METRICS_INCLUDE_ACCOUNT_UUID","OTEL_METRICS_INCLUDE_ENTRYPOINT","OTEL_METRICS_INCLUDE_REPOSITORY","OTEL_METRICS_INCLUDE_RESOURCE_ATTRIBUTES","OTEL_METRICS_INCLUDE_SESSION_ID","OTEL_METRICS_INCLUDE_VERSION","OTEL_RESOURCE_ATTRIBUTES","OTEL_SERVICE_NAME","OTEL_TRACES_EXPORT_INTERVAL","OTEL_TRACES_EXPORTER","USE_BUILTIN_RIPGREP","VERTEX_REGION_CLAUDE_3_5_HAIKU","VERTEX_REGION_CLAUDE_3_5_SONNET","VERTEX_REGION_CLAUDE_3_7_SONNET","VERTEX_REGION_CLAUDE_4_0_OPUS","VERTEX_REGION_CLAUDE_4_0_SONNET","VERTEX_REGION_CLAUDE_4_1_OPUS","VERTEX_REGION_CLAUDE_4_5_OPUS","VERTEX_REGION_CLAUDE_4_6_OPUS","VERTEX_REGION_CLAUDE_4_7_OPUS","VERTEX_REGION_CLAUDE_4_8_OPUS","VERTEX_REGION_CLAUDE_5_OPUS","VERTEX_REGION_CLAUDE_5_5_OPUS","VERTEX_REGION_CLAUDE_FABLE_5","VERTEX_REGION_CLAUDE_FABLE_5_1","VERTEX_REGION_CLAUDE_4_5_SONNET","VERTEX_REGION_CLAUDE_4_6_SONNET","VERTEX_REGION_CLAUDE_5_SONNET","VERTEX_REGION_CLAUDE_5_5_SONNET","VERTEX_REGION_CLAUDE_HAIKU_4_5","CLAUDE_AUTOCOMPACT_PCT_OVERRIDE","CLAUDE_CODE_AUTO_COMPACT_WINDOW","CLAUDE_CODE_DISABLE_UNKNOWN_MODEL_WINDOW_ENFORCEMENT","CLAUDE_CODE_MAX_CONTEXT_TOKENS","DISABLE_AUTO_COMPACT","DISABLE_COMPACT","CLAUDE_CODE_ALWAYS_ENABLE_EFFORT","CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING","CLAUDE_CODE_DISABLE_FAST_MODE","CLAUDE_CODE_DISABLE_LEGACY_MODEL_REMAP","CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK","CLAUDE_CODE_DISABLE_THINKING","CLAUDE_CODE_EFFORT_LEVEL","CLAUDE_CODE_MAX_EFFORT_REMINDER","CLAUDE_CODE_PROMPT_CACHE_TTL","CLAUDE_CODE_SUBAGENT_PROMPT_CACHE_TTL","DISABLE_INTERLEAVED_THINKING","DISABLE_PROMPT_CACHING","DISABLE_PROMPT_CACHING_FABLE","DISABLE_PROMPT_CACHING_HAIKU","DISABLE_PROMPT_CACHING_OPUS","DISABLE_PROMPT_CACHING_SONNET","ENABLE_PROMPT_CACHING_1H","ENABLE_PROMPT_CACHING_1H_BEDROCK","FALLBACK_FOR_ALL_PRIMARY_MODELS","FORCE_PROMPT_CACHING_5M","CLAUDE_AUTO_BACKGROUND_TASKS","CLAUDE_CODE_DISABLE_ADVISOR_TOOL","CLAUDE_CODE_DISABLE_AGENT_VIEW","CLAUDE_CODE_DISABLE_ARTIFACT","CLAUDE_CODE_DISABLE_BACKGROUND_TASKS","CLAUDE_CODE_DISABLE_BUNDLED_SKILLS","CLAUDE_CODE_DISABLE_CRON","CLAUDE_CODE_DISABLE_EXPLORE_PLAN_AGENTS","CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY","CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING","CLAUDE_CODE_DISABLE_MCP_TASK_BACKGROUND","CLAUDE_CODE_DISABLE_MEMORY_RO_UNSAVED_NOTICE","CLAUDE_CODE_DISABLE_WORKFLOWS","CLAUDE_CODE_ENABLE_AWAY_SUMMARY","CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING","CLAUDE_CODE_ENABLE_FUNCTION_HOOKS","CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION","CLAUDE_CODE_ENABLE_TASKS","CLAUDE_CODE_FORK_SUBAGENT","CLAUDE_CODE_PLAN_MODE_REQUIRED","DISABLE_DOCTOR_COMMAND","DISABLE_EXTRA_USAGE_COMMAND","DISABLE_INSTALL_GITHUB_APP_COMMAND","DISABLE_LOGIN_COMMAND","DISABLE_LOGOUT_COMMAND","DISABLE_UPGRADE_COMMAND","CLAUDE_AX_SCREEN_READER","CLAUDE_CODE_ACCESSIBILITY","CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN","CLAUDE_CODE_DISABLE_MOUSE","CLAUDE_CODE_DISABLE_MOUSE_CLICKS","CLAUDE_CODE_DISABLE_VIRTUAL_SCROLL","CLAUDE_CODE_FORCE_STRIKETHROUGH","CLAUDE_CODE_FORCE_TERMINAL_IMAGES","CLAUDE_CODE_HIDE_CWD","CLAUDE_CODE_NATIVE_CURSOR","CLAUDE_CODE_NO_FLICKER","CLAUDE_CODE_SCROLL_SPEED","CLAUDE_CODE_SYNTAX_HIGHLIGHT","API_TIMEOUT_MS","CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS","CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS","CLAUDE_CODE_GLOB_TIMEOUT_SECONDS","CLAUDE_CODE_MAX_RETRIES","CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION","CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY","CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION","CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS","CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT","CLAUDE_CODE_TEAM_TEARDOWN_PARK_TIMEOUT_MS","CLAUDE_STREAM_FIRST_BYTE_TIMEOUT_MS","CLAUDE_STREAM_IDLE_TIMEOUT_MS","MAX_STRUCTURED_OUTPUT_RETRIES","MCP_REMOTE_SERVER_CONNECTION_BATCH_SIZE","MCP_SERVER_CONNECTION_BATCH_SIZE","SLASH_COMMAND_TOOL_CHAR_BUDGET","TASK_MAX_OUTPUT_LENGTH","MCP_CONNECTION_NONBLOCKING","CLAUDE_ENABLE_BYTE_WATCHDOG","CLAUDE_ENABLE_BYTE_WATCHDOG_BEDROCK","CLAUDE_ENABLE_STREAM_WATCHDOG"]);
var z8r=new Set(["API_FORCE_IDLE_TIMEOUT","CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC","CLAUDE_CODE_DISABLE_WEB_FETCH","DISABLE_ERROR_REPORTING","DISABLE_TELEMETRY","DO_NOT_TRACK"]);
var qc=new Set(["ENABLE_BETA_TRACING_DETAILED","OTEL_LOG_RAW_API_BODIES"]);
var Zc=/auth|key|token|cookie|secret|credential|session|signature|passw|jwt|assertion|cert|oidc|org|tenant|account|project|workspace|user|email|identity|principal|consumer|client|host|url|base|target|upstream|endpoint|proxy|forward|route|fallback|override|apigw|x-goog-|l5d-|bypass|guardrail|amz|x-ms-|azureml|extra-parameters|envoy|helicone|litellm|cf-aig|cf-access|beta|version/;
function Qc(e){if(/\r(?!\n)/.test(e))return!0;return e.split(/\n|\r\n/).some((n)=>{let s=n.indexOf(":");if(s===-1)return!1;let r=n.slice(0,s).trim();return!eu.test(r)||LSt(n.slice(s+1))!==null||Zc.test(r.toLowerCase())})};
var eu=/^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
function BSt(e,n){let s=e.toUpperCase();return Jc.has(s)||gr(s,n)||s==="ANTHROPIC_CUSTOM_HEADERS"&&!Qc(n)};
function gr(e,n){return z8r.has(e)&&Le(n)||qc.has(e)&&gs(n)};
var JF=["macos","linux","windows","wsl"];
var ft=[{alias:"additionalMarketplaces",canonical:"extraKnownMarketplaces"},{alias:"allowedMarketplaces",canonical:"strictKnownMarketplaces"}];
function Ji(e){if(typeof e!=="object"||e===null)return!1;let n=Object.getPrototypeOf(e);return n===Object.prototype||n===null};
function aO(e){if(Array.isArray(e))return e.map(aO);if(e!==null&&typeof e==="object"){let n={};for(let s of Object.keys(e).sort())n[s]=aO(e[s]);return n}return e};
var Sm=["enabled","enabledPlatforms"];
var Gt="network.allowedDomains";
var bm=new Set(["OTEL_LOG_MANAGED_SETTINGS"]);
function fL(e){if(!e)return{shellSettings:{},envVars:{},sandboxSettings:{},isolationSettings:{},hasHooks:!1,payloadSlots:{}};let n=Ja(e),s=Em(e);km([n,...s.map(([,c])=>c)]);let r={};for(let[c,p]of s){let g={shellSettings:p.hasHooks?{...p.shellSettings,hooks:Ge(p.hooks)}:p.shellSettings,envVars:p.envVars,sandboxSettings:p.sandboxSettings,isolationSettings:p.isolationSettings};if(Yt(g))r[c]=g}let{sandboxSwitches:i,...d}=n;return{...d,payloadSlots:r}};
function Ja(e){let n={},s;for(let y of cr){let S=e[y];if(y==="policyHelpers"){if(S!==null&&typeof S==="object")for(let A of JF){let D=sl(S[A]);if(D){if(n[`policyHelpers.${A}`]=D.command,D.scriptSize)s??={},s[`policyHelpers.${A}`]=D.scriptSize}}continue}let b;if(typeof S==="string")b=S;else if(S!==null&&typeof S==="object"&&"command"in S&&typeof S.command==="string")b=S.command;if(b!==void 0&&b.length>0)n[y]=b}let r=Xm(e);if(r&&typeof r==="object")for(let[y,S]of Object.entries(r)){let b=S?.source;if(!b||typeof b!=="object")continue;if(b.source==="url"&&typeof b.headersHelper==="string"&&b.headersHelper.length>0)n[`extraKnownMarketplaces[${_(y)}].source.headersHelper`]=Fa(b.headersHelper,"url",b.url);if(b.source==="settings"&&Array.isArray(b.plugins)){let A=new Map;for(let D of b.plugins){let v=_(D?.name),K=A.get(v)??0;A.set(v,K+1);let M=D?.source;if(M!==null&&typeof M==="object"&&"source"in M&&M.source==="command"&&"command"in M&&typeof M.command==="string"&&M.command.length>0)n[`extraKnownMarketplaces[${_(y)}].plugins[${_(D.name)}][${K}].source.command`]=M.command;if(typeof D?.headersHelper==="string"&&D.headersHelper.length>0){let z=D.source,Z=z!==null&&typeof z==="object";n[`extraKnownMarketplaces[${_(y)}].plugins[${_(D.name)}][${K}].headersHelper`]=Fa(D.headersHelper,Z&&"source"in z?z.source:void 0,Z&&"url"in z?z.url:void 0)}}}}let i=e.sandbox,d={},c={enabled:Ot(i,"enabled"),enabledPlatforms:Ot(i,"enabledPlatforms"),[Gt]:Ot(i,Gt)};if(i!==null&&typeof i==="object"){let y={enabled:c.enabled,enabledPlatforms:c.enabledPlatforms};for(let S of yo){let b=Tm(i[S]);if(b)n[`sandbox.${S}`]=Ge({value:b,...y})}for(let S of ur){let b=Ot(i,S);if(wm(S,b))d[`sandbox.${S}`]=Ge({value:b,...y,...Qa.has(S)&&{allowedDomains:el(c[Gt])}})}}let p=e.isolation,g={};for(let y of pr){let S=Ot(p,y);if(Am(y,S))g[`isolation.${y}`]=Ge({value:S})}let h={};if(e.env&&typeof e.env==="object")for(let[y,S]of Object.entries(e.env)){if(S===void 0)continue;let b=String(S);if(b.length>0&&!bm.has(y.toUpperCase())&&!BSt(y,b))h[y]=b}let m=e.hooks!==void 0&&e.hooks!==null&&typeof e.hooks==="object"&&Object.keys(e.hooks).length>0;return{shellSettings:n,inlineHelperScriptSizes:s,envVars:h,sandboxSettings:d,isolationSettings:g,hasHooks:m,hooks:m?e.hooks:void 0,sandboxSwitches:c}};
function Em(e){return As(e).map(([n,s])=>[n,Ja(s)])};
function As(e){let n=[];for(let s of Za){let r=`policyHelpers.${s}`,i=Ot(e,r);if(!Ji(i))continue;let{policyHelper:d,policyHelpers:c,...p}=i;n.push([r,p])}return n};
function km(e){let n=e.map((r)=>Object.keys(r.sandboxSettings).length>0||yo.some((i)=>r.shellSettings[`sandbox.${i}`]!==void 0)),s=e.map((r)=>[...Qa].some((i)=>r.sandboxSettings[`sandbox.${i}`]!==void 0));e.forEach((r,i)=>{if(n.some((d,c)=>d&&c!==i))for(let d of Sm){let c=r.sandboxSwitches[d];if(c!==void 0)r.sandboxSettings[`sandbox.${d}`]=Ge({value:c})}if(s.some((d,c)=>d&&c!==i)){let d=r.sandboxSwitches[Gt];if(d!==void 0)r.sandboxSettings[`sandbox.${Gt}`]=Ge({value:el(d)??d})}})};
var Za=[...JF.map((e)=>`${e}.defaultSettings`),"default"];
function xe(e){let n=[];for(let s of Za){let r=`policyHelpers.${s}`,i=e.payloadSlots[r];if(i!==void 0&&Yt(i))n.push([r,i])}return n};
function Yt(e){return Object.keys(e.shellSettings).length>0||Object.keys(e.envVars).length>0||Object.keys(e.sandboxSettings).length>0||Object.keys(e.isolationSettings).length>0};
var Qa=new Set(["credentials","network.tlsTerminate"]);
function el(e){return Array.isArray(e)?L(e.filter((n)=>typeof n==="string")).sort():void 0};
function Ot(e,n){let s=e;for(let r of n.split(".")){if(s===null||typeof s!=="object")return;s=s[r]}return s};
function wm(e,n){if(n===void 0||n===null||n===!1)return!1;if(Array.isArray(n)&&n.length===0)return!1;return!(e==="credentials"&&Om(n))};
function Am(e,n){if(n===void 0||n===null)return!1;switch(e){case"required":return n!==!1;case"egress":return!Ji(n)||Object.entries(n).some(([s,r])=>Rm.has(s)?r!==void 0&&r!==null&&!(Array.isArray(r)&&r.length===0):r!==void 0)}};
var Rm=new Set(["allowedHosts","deniedHosts"]);
function Om(e){if(typeof e!=="object"||e===null)return!1;return Object.entries(e).every(([n,s])=>{if(s===void 0)return!0;if(n==="files"||n==="envVars")return Array.isArray(s)&&s.every((r)=>typeof r==="object"&&r!==null&&r.mode==="deny");if(n==="sigv4")return typeof s==="object"&&s!==null&&Object.values(s).every((r)=>r===void 0||r==="deny");return n==="allowPlaintextInject"&&s===!1})};
function vm(e){return Object.keys(e.shellSettings).some(tl)};
function tl(e){return JF.some((n)=>e===`policyHelpers.${n}`)};
function nl(e){return vm(e)||Object.keys(e.shellSettings).some((n)=>n.startsWith("extraKnownMarketplaces["))||xe(e).length>0};
function ol(e){return e==="sh"||e==="pwsh"};
function sl(e){if(e===null||typeof e!=="object")return;let{path:n,script:s,interpreter:r,timeoutMs:i,refreshIntervalMs:d}=e,c,p;if(typeof n==="string"&&n)c=n;else if(typeof s==="string"&&s&&ol(r))c={interpreter:r,script:rl(s)},p=Pm(s);else return;return{command:_([c,i??null,d??null]),scriptSize:p}};
function Pm(e){return{bytes:Buffer.byteLength(e,"utf8"),lines:Vt(e,`
`)+(e.endsWith(`
`)?0:1)}};
function rl(e){return Zt(_(e))};
function Tm(e){if(typeof e==="string")return e||void 0;if(e===null||typeof e!=="object"||!("command"in e)||typeof e.command!=="string"||!e.command)return;let n="args"in e&&Array.isArray(e.args)?e.args.map(String):[];return _([e.command,...n])};
function ws(e){return Ge(il(e))};
function il(e){return{shellSettings:e.shellSettings,envVars:e.envVars,sandboxSettings:Object.keys(e.sandboxSettings).length>0?e.sandboxSettings:void 0,...ja(e),hooks:e.hooks,payloadSlots:xe(e).length>0?Object.fromEntries(xe(e).map(([n,s])=>{let{isolationSettings:r,...i}=s;return[n,{...i,...ja(s)}]})):void 0}};
function ja(e){return Object.keys(e.isolationSettings).length>0?{isolationSettings:e.isolationSettings}:{}};
function Ge(e){return _(aO(e))};
function cAn(e){return Zt(ws(e))};
function Rs(e,n,s){if(cAn(n)===e)return!0;return typeof s==="string"&&s.length>0&&Zt(Ge({...il(n),claudeMd:s}))===e};
function Fa(e,n,s){return _([e,typeof n==="string"?n:null,typeof s==="string"?s:null])};
function Xm(e){let n=e.extraKnownMarketplaces;if(n!==void 0&&n!==null)return n;let s=e;for(let{alias:r,canonical:i}of ft){if(i!=="extraKnownMarketplaces")continue;let d=s[r];if(d!==void 0&&d!==null&&typeof d==="object")return d}return};
var ibt="remote-settings.json";
var Sfe="remote-settings-helper-consent";
function dAn(){return gl(we(),Sfe)};
function ml(e){let n=fL(e);return nl(n)?n:void 0};
function zYr(e){let n=ml(e);return n&&cAn(n)};
function Fnr(e){return di(e,(n,s)=>s.startsWith("$")&&s!=="$schema")};
class fl{sessionCache=null;eligible=void 0;eligibilityMemo=void 0;ineligibleReason=void 0;evalPolicySnapshotOnly=!1;lastLoadStatus=void 0;lastLoadStatusChanged=Me();policySettingsNotified=!1;verifiedPayload=null;unverifiedView=null;projectedView=null;consentedPayload=null;deferredPayload=null;resetEpoch=0;backendView=void 0;replaceSessionCache(e,n){if(this.sessionCache=e,n?.verified){if(this.verifiedPayload=e,n.consentDeferred)this.deferredPayload=e}}seedFromDisk(e){this.sessionCache=e;let n=ml(e);if(n!==void 0){let s=ef();if(s===void 0||!Rs(s,n,e.claudeMd))return}this.consentedPayload??=e}markConsented(e){this.consentedPayload=e}dropConsentDeferral(){this.deferredPayload=null}markPolicySettingsNotified(){this.policySettingsNotified=!0}recordEligibility(e,n){if(this.eligible=e,n.memoize)this.eligibilityMemo=e,this.ineligibleReason=e?void 0:n.ineligibleReason}resetListener=null;registerResetListener(e){if(this.resetListener!==null)throw Error("registerSyncCacheResetListener: a listener is already registered; a second one would unhook the first");this.resetListener=e}reset(){this.sessionCache=null,this.eligible=void 0,this.eligibilityMemo=void 0,this.ineligibleReason=void 0,this.evalPolicySnapshotOnly=!1,this.lastLoadStatus=void 0,this.policySettingsNotified=!1,this.verifiedPayload=null,this.unverifiedView=null,this.projectedView=null,this.consentedPayload=null,this.deferredPayload=null,this.resetEpoch++,this.emitLoadStatusChanged(void 0)}emitLoadStatusChanged(e){try{this.lastLoadStatusChanged.emit(e)}catch(n){t(`Remote settings: load-status listener threw: ${l(n)}`,{level:"error"})}}};
var Jm=new V(()=>new fl);
function ce(){return Jm.of(U().host)};
function Mwe(){return ce().resetEpoch};
function uAn(){return ce().consentedPayload};
function $nr(e){ce().markConsented(e)};
function gZe(e,n,s){ce().replaceSessionCache(e,n),Ro(s)};
function wb(){let{sessionCache:e,verifiedPayload:n}=ce();return e!==null&&e===n};
function abt(){let{sessionCache:e,verifiedPayload:n,consentedPayload:s,deferredPayload:r}=ce();return e!==null&&e===n&&(e===s||e===r)};
function aVt(){return ce().ineligibleReason};
function pAn(e){let n=ce();n.lastLoadStatus=e,n.emitLoadStatusChanged(e)};
function uI(){return ce().lastLoadStatus};
function oA(){return};
function zje(){return ce().evalPolicySnapshotOnly};
function QYr(e){ce().evalPolicySnapshotOnly=e};
function E8o(e){return e!==null&&ce().projectedView?.view===e};
function qm(e){return e&&zje()?{...nnr(e),managedSourcesBehavior:"merge"}:e};
function cVt(){return oA()===void 0&&f$()};
function PZ(){return oA()??gl(we(),ibt)};
var hl=8388608;
function Zm(){if(cVt())return null;try{let e=tf();if(e===null)return null;let n=Y(Do(e));if(!n||typeof n!=="object"||Array.isArray(n))return null;return Fnr(n)}catch(e){if(t$(e))t(`Remote settings: Disk cache exceeds ${hl} bytes; ignoring it as if absent`);return null}};
var Qm=4096;
function ef(){let e=Os();if(e!==void 0)return e.attestation;try{return gL(dAn(),Qm).trim()||void 0}catch{return}};
function tf(){let e=Os();if(e!==void 0)return e.content;return gL(PZ(),hl)};
function Os(){let e=ce().backendView;if(!F()||e===void 0||!e.ready||e.stoodDown||oA()!==void 0)return;if(!Zfe(e.configHome)){e.standDown("config home changed");return}return e};
var vs=De.state("remote-settings");
var Ps=De.state(Sfe);
function Vje(e,n){ce().backendView?.written(e==="cache"?vs:Ps,n)};
var bl=new Set(["HTTPS_PROXY","HTTP_PROXY","NO_PROXY","CLAUDE_CODE_PROXY_RESOLVES_HOSTS","CLAUDE_CODE_ENABLE_PROXY_AUTH_HELPER","CLAUDE_CODE_PROXY_AUTH_HELPER_TTL_MS","API_FORCE_IDLE_TIMEOUT","ANTHROPIC_UNIX_SOCKET","NODE_EXTRA_CA_CERTS","CLAUDE_CODE_CERT_STORE","CLAUDE_CODE_CLIENT_CERT","CLAUDE_CODE_CLIENT_KEY","CLAUDE_CODE_CLIENT_KEY_PASSPHRASE","ALL_PROXY","NODE_OPTIONS","NODE_TLS_REJECT_UNAUTHORIZED",...Kj,...qF,"AWS_ENDPOINT_URL_STS","AWS_ENDPOINT_URL","AWS_ENDPOINT_URL_SSO","AWS_ENDPOINT_URL_SSO_OIDC","AWS_ENDPOINT_URL_BEDROCK","AWS_ENDPOINT_URL_BEDROCK_RUNTIME",...FSt,...ho,...PCn,"CLOUDSDK_CONFIG","GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES","GCLOUD_PROJECT","CLAUDE_CODE_CUSTOM_OAUTH_URL",...uL,"CLAUDE_CODE_API_BASE_URL","CLAUDE_CODE_OAUTH_REFRESH_TOKEN","CLAUDE_CODE_OAUTH_SCOPES","CLAUDE_CODE_OAUTH_CLIENT_ID","CLAUDE_CODE_SESSION_ACCESS_TOKEN","CLAUDE_SESSION_INGRESS_TOKEN_FILE","CLAUDE_CODE_ENVIRONMENT_KIND","CLAUDE_CODE_REMOTE_SESSION_ID","ANTHROPIC_FEDERATION_RULE_ID","ANTHROPIC_ORGANIZATION_ID","ANTHROPIC_WORKSPACE_ID","ANTHROPIC_SERVICE_ACCOUNT_ID","ANTHROPIC_IDENTITY_TOKEN","ANTHROPIC_IDENTITY_TOKEN_FILE","ANTHROPIC_SCOPE","ANTHROPIC_PROFILE","ANTHROPIC_CONFIG_DIR","CLAUDE_CODE_FEDERATION_CACHE_DIR","HOME","XDG_CONFIG_HOME","APPDATA","USERPROFILE","HOMEDRIVE","HOMEPATH","PROGRAMDATA","ALLUSERSPROFILE","ANTHROPIC_CUSTOM_HEADERS","CLAUDE_CODE_HOST_CREDS_FILE","CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST","CLAUDE_CODE_HOST_AUTH_ENV_VAR","CLAUDE_CONFIG_DIR","CLAUDE_SECURESTORAGE_CONFIG_DIR","CLAUDE_CODE_REMOTE_SETTINGS_PATH","CLAUDE_CODE_MANAGED_SETTINGS_PATH","CLAUDE_CODE_DISABLE_ADMIN_ENV_UNION","CLAUDE_CODE_MOCK_REMOTE_SETTINGS","USE_LOCAL_OAUTH","USE_STAGING_OAUTH","CLAUDE_LOCAL_OAUTH_API_BASE","CLAUDE_LOCAL_OAUTH_APPS_BASE","CLAUDE_LOCAL_OAUTH_CONSOLE_BASE","CLAUDE_BRIDGE_BASE_URL","CLAUDE_BRIDGE_OAUTH_TOKEN","CLAUDE_BRIDGE_SESSION_INGRESS_URL","CLAUDE_REMOTE_TOOLS_BRIDGE_URL","CLAUDE_CODE_GB_BASE_URL"].map((e)=>e.toUpperCase()));
function El(e){if(!e||!e.env&&!("managedMcpServers"in e))return e;let{managedMcpServers:n,...s}=e;return e.env?{...s,env:di(e.env,(r,i)=>bl.has(i.toUpperCase()))}:s};
function kl(e,n){return n===e.verifiedPayload||Boolean(oA())};
function mAn(){let e=ce();if(!oA()&&e.eligible!==!0)return null;if(e.sessionCache)return e.sessionCache;let n=Os()!==void 0,s=Zm();if(s){if(e.seedFromDisk(s),n)va().invalidatePolicyLayer();else Ro();return s}return null};
function mT(){let e=mAn(),n=ce(),s=kl(n,e)?e:rf(n,e);if(s===null||!zje())return s;if(n.projectedView?.raw!==s)n.projectedView={raw:s,view:qm(s)};return n.projectedView.view};
function rf(e,n){if(n===null)return null;if(e.unverifiedView?.raw!==n)e.unverifiedView={raw:n,view:El(n)};return e.unverifiedView.view};
return {resetEpoch:Mwe,consented:uAn,markConsented:$nr,helperConsentHash:zYr,cachePath:PZ,helperConsentPath:dAn,helperConsentName:Sfe,cacheOverride:oA,diskWritesDisabled:cVt,notifyWritten:Vje,artifacts:De,ineligibleReason:aVt,Owner:fl,registry:Jm,owner:ce,replace:gZe,isVerified:wb,isVerifiedConsented:abt,setLoadStatus:pAn,loadStatus:uI,isSnapshot:E8o,hasContent:ml,consentHash:cAn,matchesConsent:Rs,stripInternal:Fnr,read:mAn,project:mT,unverified:rf,snapshot:qm,snapshotEnabled:zje,setSnapshot:QYr};
}
function module12(imports){

function E(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return};
function W(n){return E(n)==="ENOENT"};
return {E,W};
}
function module13(imports){
const k=imports["k"];
var Q0e=k.O_NONBLOCK;
var Wl=k.O_NOFOLLOW|Q0e;
return {Q0e,Wl};
}
function module14(imports){
const ge=imports["ge"];
const W=imports["W"];
const t=imports["t"];
const l=imports["l"];
const Wl=imports["Wl"];
const j=imports["j"];
const me=imports["me"];
const R=imports["R"];
const _=imports["_"];
function dPe(e){return`${e}.signature.json`};
function EBe(e){return`${e}.signature-iat.json`};
async function uPe(e,n){if(n===void 0){await k(dPe(e));return}let r={jws:n,receivedAt:Date.now()};await Ce(dPe(e),r)};
async function X2t(e){await Promise.all([k(dPe(e)),k(EBe(e))])};
async function J2t(e,n){if(!n&&await we(e))return!1;return await X2t(e),!0};
async function we(e){try{return await j(e),!0}catch(n){return!W(n)}};
async function Ce(e,n){try{if(Wl===0&&await Te(e))return;let r=await me(e,R.O_WRONLY|R.O_CREAT|R.O_TRUNC|Wl,384);try{await r.writeFile(_(n),{encoding:"utf-8"})}finally{await r.close()}}catch(r){t(`Signed cache: failed to write ${e} - ${l(r)}`)}};
async function Te(e){try{return(await j(e)).isSymbolicLink()}catch{return!1}};
async function k(e){try{await ge(e)}catch(n){if(!W(n))t(`Signed cache: failed to remove ${e} - ${l(n)}`)}};
return {dPe,EBe,uPe,X2t,J2t,we,Ce,Te,k};
}
function module15(imports){

function it(e){return e.code+("failureClass"in e?` ${e.failureClass}`:"")+("telemetryCode"in e&&e.telemetryCode?` ${e.telemetryCode}`:"")+("cause"in e&&e.cause?`: ${i(e.cause)}`:"")};
function i(e){return e instanceof Error?e.message:String(e)};
return {it,i};
}
export function createRemoteOwner287(ports){
const m0=module0({});
const m1=module1({});
const m2=module2({});
const m3=module3({});
const m4=module4({"t":ports.builtins["path"]["resolve"],"we":ports["configHome"]});
const m5=module5({"ae":ports["filesystem"],"bo":ports["resolvePath"],"t":ports["debug"]});
const m6=module6({"a":ports["environment"]});
const m7=module7({});
const m8=module8({});
const m9=module9({});
const m10=module10({});
const m11=module11({"V":m0["V"],"Me":m1["Me"],"Zt":ports["sha256"],"_":ports["stringify"],"Vt":m2["Vt"],"L":m3["L"],"Le":m1["Le"],"gs":m1["gs"],"F":ports["primerEnabled"],"Zfe":m4["Zfe"],"gL":m5["gL"],"gl":ports.builtins["path"]["join"],"we":ports["configHome"],"t":ports["debug"],"l":ports["errorText"],"U":ports["execution"],"f$":m6["f$"],"De":m7["De"],"Ro":ports["invalidateSettings"],"di":ports["omitBy"],"Y":m8["Y"],"Do":m9["Do"],"t$":m5["t$"],"va":ports["settingsStore"],"f":m10["f"]});
const m12=module12({});
const m13=module13({"k":ports.builtins["fs"]["constants"]});
const m14=module14({"ge":ports.builtins["fs/promises"]["unlink"],"W":m12["W"],"t":ports["debug"],"l":ports["errorText"],"Wl":m13["Wl"],"j":ports.builtins["fs/promises"]["lstat"],"me":ports.builtins["fs/promises"]["open"],"R":ports.builtins["fs"]["constants"],"_":ports["stringify"]});
const m15=module15({});
return {...m11,writeSignature:m14.uPe,clearSignatures:m14.X2t,signatureAfterReset:m14.J2t,formatStorageFailure:m15.it};
}
export function createRemoteLoadReporter287({KP,aVt,pAn,uI,wb,Ro}){
function N(e){if(!KP()){let r=aVt();if(r)pAn({state:"ineligible",reason:r});return}let n=ve()!==void 0;if(e.fetchSucceeded){if(pAn({state:"ok",hasSettings:e.settings!==null&&Object.keys(e.settings).length>0}),n)Ro();return}if(e.failure){let r=e.settings!==null&&Object.keys(e.settings).length>0;if(pAn(r?{state:"stale_cache",failure:e.failure,transportEnvWithheld:!wb()}:{state:"failed",failure:e.failure}),n||e.failure.rulings!==void 0)Ro()}}
function ve(){let e=uI();return e?.state==="failed"||e?.state==="stale_cache"?e.failure.rulings:void 0}
return {settle:N,failure:h=>({errorKind:h.errorKind??"unknown_error",message:h.error??"Unknown error",...h.httpStatus!==void 0&&{httpStatus:h.httpStatus},...h.gatewayPinMismatch&&{gatewayPinMismatch:h.gatewayPinMismatch}}),unexpected:()=>({errorKind:"unknown_error",message:"Unexpected error while applying remote settings"})};
}
export function createRemoteCacheWriter287({cVt,_,zYr,F,oA,De,t,it,Vje,uPe,PZ,Ie,Sfe,Be,dAn,l}){
async function le(e,n,r){if(cVt())return;let s=_(e,null,2),g=zYr(e);if(F()&&n!==void 0&&!oA()){let R=await n.write(De.state("remote-settings"),s,{publishDiscipline:"inPlace",mode:384,flush:!0});if(!R.ok){t(`Remote settings: Failed to save - ${it(R.error)}`);return}if(t("Remote settings: Saved via storage backend"),Vje("cache",s),await uPe(PZ(),r),g!==void 0){let w=await n.write(De.state(Sfe),g,{publishDiscipline:"inPlace",mode:384});if(t(w.ok?"Remote settings: Saved helper consent via storage backend":`Remote settings: Failed to save helper consent - ${it(w.error)}`),w.ok)Vje("helperConsent",g)}return}try{let R=PZ(),w=await Ie(R,"w",384);try{await w.writeFile(s,{encoding:"utf-8"}),await w.datasync()}finally{await w.close()}t(`Remote settings: Saved to ${R}`)}catch(R){t(`Remote settings: Failed to save - ${R instanceof Error?R.message:"unknown error"}`);return}if(F()&&!oA())Vje("cache",s);if(await uPe(PZ(),r),g===void 0)return;try{if(await Be(dAn(),g,{mode:384}),F()&&!oA())Vje("helperConsent",g)}catch(R){t(`Remote settings: Failed to save helper consent - ${l(R)}`)}}
return le;
}
export function createRemoteCacheClearer287({aJt,A3,Ro,I,F,De,Sfe,it,Le,dAn,l,t,oA,Vje,X2t,PZ,He,W}){
async function cRt(e){aJt(),A3(),Ro(),I().detachBarrier()?.();let n=F()&&e!==void 0?await e.delete(De.state(Sfe)).then((r)=>r.ok?void 0:it(r.error)):await Le(dAn(),{force:!0}).then(()=>{return},l);if(n!==void 0){t(`Remote settings: Failed to remove helper consent - ${n}`);return}if(F()&&!oA())Vje("helperConsent",null);if(oA())return;if(await X2t(PZ()),F()&&e!==void 0){if((await e.delete(De.state("remote-settings"))).ok)Vje("cache",null);return}try{let r=PZ();await He(r)}catch(r){if(F()&&!W(r))return}if(F())Vje("cache",null)}
return cRt;
}
