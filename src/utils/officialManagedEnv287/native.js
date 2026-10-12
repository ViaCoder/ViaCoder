// Pinned287 complete B owner and all original required env closures; external state owners are ports.
function module0(imports){

function ia(e){return JSON.stringify(e)};
return {ia};
}
function module1(imports){

function Le(e){if(!e)return!1;if(typeof e==="boolean")return e;let n=String(e).toLowerCase().trim();return["1","true","yes","on"].includes(n)};
function gs(e){if(e===void 0)return!1;if(typeof e==="boolean")return!e;let n=String(e).toLowerCase().trim();return["0","false","no","off"].includes(n)};
return {Le,gs};
}
function module2(imports){
const gs=imports["gs"];
const mT=imports["mT"];
const wb=imports["wb"];
const Le=imports["Le"];
function LSt(e){let n=0,s=e.length;while(n<s&&tr(e.charCodeAt(n)))n++;while(s>n&&tr(e.charCodeAt(s-1)))s--;let r=or(e.slice(n,s));if(r!==-1)return{kind:"line_break",index:Ze(e,n+r)};for(let i=n;i<s;i++){let d=e.charCodeAt(i);if(d===0)return{kind:"nul",index:Ze(e,i)};if(d>255)return{kind:"non_ascii",index:Ze(e,i),codePoint:sr(e,i)}}return null};
function or(e){let n=e.indexOf(`
`),s=e.indexOf("\r");if(n===-1)return s;return s===-1?n:Math.min(n,s)};
function tr(e){return e===9||e===32||e===10||e===13};
function sr(e,n){return e.codePointAt(n)??e.charCodeAt(n)};
function Ze(e,n){let s=0;for(let r=0;r<n;r++){let i=e.charCodeAt(r);if(i>=55296&&i<=56319&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320)r++;s++}return s};
var W9o=/^$|[=\x00-\x1f\x7f-\x9f]/;
var Kj=["CLAUDE_CODE_USE_BEDROCK","CLAUDE_CODE_USE_VERTEX","CLAUDE_CODE_USE_FOUNDRY","CLAUDE_CODE_USE_ANTHROPIC_AWS","CLAUDE_CODE_USE_ANTHROPIC_GOOGLE_CLOUD","CLAUDE_CODE_USE_MANTLE","CLAUDE_CODE_USE_GATEWAY","ANTHROPIC_FOUNDRY_RESOURCE","ANTHROPIC_VERTEX_PROJECT_ID","ANTHROPIC_AWS_WORKSPACE_ID","ANTHROPIC_GOOGLE_CLOUD_PROJECT","ANTHROPIC_GOOGLE_CLOUD_LOCATION","ANTHROPIC_GOOGLE_CLOUD_WORKSPACE_ID","CLOUD_ML_REGION"];
var NSt="OTEL_EXPORTER_OTLP_";
var Fc=new Set(["projectSettings","localSettings"]);
function Rzt(e){return Fc.has(e)};
var TCn=["OTEL_EXPORTER_OTLP_ENDPOINT","OTEL_EXPORTER_OTLP_HEADERS","OTEL_EXPORTER_OTLP_PROTOCOL","OTEL_EXPORTER_OTLP_CERTIFICATE","OTEL_EXPORTER_OTLP_CLIENT_CERTIFICATE","OTEL_EXPORTER_OTLP_CLIENT_KEY","OTEL_EXPORTER_OTLP_INSECURE","OTEL_EXPORTER_OTLP_TRACES_ENDPOINT","OTEL_EXPORTER_OTLP_TRACES_HEADERS","OTEL_EXPORTER_OTLP_TRACES_PROTOCOL","OTEL_EXPORTER_OTLP_TRACES_CERTIFICATE","OTEL_EXPORTER_OTLP_TRACES_CLIENT_CERTIFICATE","OTEL_EXPORTER_OTLP_TRACES_CLIENT_KEY","OTEL_EXPORTER_OTLP_TRACES_INSECURE","OTEL_EXPORTER_OTLP_METRICS_ENDPOINT","OTEL_EXPORTER_OTLP_METRICS_HEADERS","OTEL_EXPORTER_OTLP_METRICS_PROTOCOL","OTEL_EXPORTER_OTLP_METRICS_CERTIFICATE","OTEL_EXPORTER_OTLP_METRICS_CLIENT_CERTIFICATE","OTEL_EXPORTER_OTLP_METRICS_CLIENT_KEY","OTEL_EXPORTER_OTLP_METRICS_INSECURE","OTEL_EXPORTER_OTLP_LOGS_ENDPOINT","OTEL_EXPORTER_OTLP_LOGS_HEADERS","OTEL_EXPORTER_OTLP_LOGS_PROTOCOL","OTEL_EXPORTER_OTLP_LOGS_CERTIFICATE","OTEL_EXPORTER_OTLP_LOGS_CLIENT_CERTIFICATE","OTEL_EXPORTER_OTLP_LOGS_CLIENT_KEY","OTEL_EXPORTER_OTLP_LOGS_INSECURE","OTEL_EXPORTER_OTLP_PROFILES_ENDPOINT","OTEL_EXPORTER_OTLP_PROFILES_HEADERS","OTEL_EXPORTER_OTLP_PROFILES_PROTOCOL","OTEL_EXPORTER_OTLP_PROFILES_CERTIFICATE","OTEL_EXPORTER_OTLP_PROFILES_CLIENT_CERTIFICATE","OTEL_EXPORTER_OTLP_PROFILES_CLIENT_KEY","OTEL_EXPORTER_OTLP_PROFILES_INSECURE","OTEL_EXPORTER_PROMETHEUS_HOST","OTEL_EXPORTER_PROMETHEUS_PORT","CLAUDE_CODE_ENABLE_TELEMETRY","OTEL_LOGS_EXPORTER","OTEL_METRICS_EXPORTER","OTEL_TRACES_EXPORTER","CLAUDE_CODE_ENHANCED_TELEMETRY_BETA","ENABLE_ENHANCED_TELEMETRY_BETA","OTEL_LOG_USER_PROMPTS","OTEL_LOG_ASSISTANT_RESPONSES","OTEL_LOG_TOOL_CONTENT","OTEL_LOG_TOOL_DETAILS","OTEL_LOG_MANAGED_SETTINGS"];
var $c=new Set(["OTEL_LOG_USER_PROMPTS","OTEL_LOG_TOOL_CONTENT","OTEL_LOG_TOOL_DETAILS"]);
var Bc=new Set(["OTEL_LOGS_EXPORTER","OTEL_METRICS_EXPORTER","OTEL_TRACES_EXPORTER"]);
function kCn(e,n,s){if(e!==e.toUpperCase()||typeof n!=="string"&&typeof n!=="number"&&typeof n!=="boolean")return!1;if(!($c.has(e)?gs(typeof n==="boolean"?n:String(n)):Bc.has(e)&&String(n).trim()==="none"))return!1;return!Object.keys(s()).some((i)=>i.toUpperCase()===e)};
var dr=["CLAUDE_CODE_MEMORY_API_BASE_URL","CLAUDE_CODE_MEMORY_API_TOKEN"];
function Awe(e){return dr.includes(e)};
var qF=["ANTHROPIC_BASE_URL","_CLAUDE_CODE_ASSUME_FIRST_PARTY_BASE_URL","ANTHROPIC_BEDROCK_BASE_URL","ANTHROPIC_VERTEX_BASE_URL","ANTHROPIC_FOUNDRY_BASE_URL","ANTHROPIC_AWS_BASE_URL","ANTHROPIC_GOOGLE_CLOUD_BASE_URL","ANTHROPIC_BEDROCK_MANTLE_BASE_URL","CLAUDE_CODE_ARTIFACTS_API_BASE_URL","CLAUDE_CODE_ARTIFACTS_API_TOKEN","CLAUDE_CODE_ARTIFACT_ASSET_BASE_URL","CLAUDE_CODE_ARTIFACT_LIVE_BASE_URL","CLAUDE_CODE_ARTIFACT_SYNC_BASE_URL","CLAUDE_CODE_ARTIFACT_VIEWER_BASE_URL",...dr];
var uL=["ANTHROPIC_API_KEY","ANTHROPIC_AUTH_TOKEN","CLAUDE_CODE_OAUTH_TOKEN","AWS_BEARER_TOKEN_BEDROCK","ANTHROPIC_FOUNDRY_API_KEY","ANTHROPIC_FOUNDRY_AUTH_TOKEN","ANTHROPIC_AWS_API_KEY"];
var RCn=["CLAUDE_CODE_SKIP_BEDROCK_AUTH","CLAUDE_CODE_SKIP_VERTEX_AUTH","CLAUDE_CODE_SKIP_FOUNDRY_AUTH","CLAUDE_CODE_SKIP_ANTHROPIC_AWS_AUTH","CLAUDE_CODE_SKIP_ANTHROPIC_GOOGLE_CLOUD_AUTH","CLAUDE_CODE_SKIP_MANTLE_AUTH"];
var KQe=["ANTHROPIC_MODEL","ANTHROPIC_DEFAULT_MODEL","ANTHROPIC_DEFAULT_FABLE_MODEL","ANTHROPIC_DEFAULT_FABLE_MODEL_DESCRIPTION","ANTHROPIC_DEFAULT_FABLE_MODEL_NAME","ANTHROPIC_DEFAULT_FABLE_MODEL_SUPPORTED_CAPABILITIES","ANTHROPIC_DEFAULT_HAIKU_MODEL","ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION","ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME","ANTHROPIC_DEFAULT_HAIKU_MODEL_SUPPORTED_CAPABILITIES","ANTHROPIC_DEFAULT_OPUS_MODEL","ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION","ANTHROPIC_DEFAULT_OPUS_MODEL_NAME","ANTHROPIC_DEFAULT_OPUS_MODEL_SUPPORTED_CAPABILITIES","ANTHROPIC_DEFAULT_SONNET_MODEL","ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION","ANTHROPIC_DEFAULT_SONNET_MODEL_NAME","ANTHROPIC_DEFAULT_SONNET_MODEL_SUPPORTED_CAPABILITIES","ANTHROPIC_SMALL_FAST_MODEL","ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION","CLAUDE_CODE_SUBAGENT_MODEL","CLAUDE_CODE_3P_PROBE_WROTE_SONNET_DEFAULT","CLAUDE_CODE_3P_PROBE_WROTE_OPUS_DEFAULT","CLAUDE_CODE_3P_PROBE_WROTE_HAIKU_DEFAULT","CLAUDE_CODE_3P_SEEDED_SONNET_DEFAULT","CLAUDE_CODE_3P_SEEDED_OPUS_DEFAULT"];
var xCn=["ANTHROPIC_CUSTOM_MODEL_OPTION","ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION","ANTHROPIC_CUSTOM_MODEL_OPTION_NAME","ANTHROPIC_CUSTOM_MODEL_OPTION_SUPPORTED_CAPABILITIES"];
var xzt=["CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR","CLAUDE_CODE_GATEWAY_TOKEN_FILE_DESCRIPTOR","CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR","CLAUDE_CODE_WEBSOCKET_AUTH_FILE_DESCRIPTOR"];
var fo=["AWS_ACCESS_KEY_ID","AWS_SECRET_ACCESS_KEY","AWS_SESSION_TOKEN"];
var FSt=[...fo,"AWS_PROFILE","AWS_CONFIG_FILE","AWS_SHARED_CREDENTIALS_FILE","GOOGLE_APPLICATION_CREDENTIALS","GOOGLE_CLOUD_PROJECT"];
var ho=["AWS_CONTAINER_CREDENTIALS_FULL_URI","AWS_CONTAINER_CREDENTIALS_RELATIVE_URI","AWS_CONTAINER_AUTHORIZATION_TOKEN","AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE","AWS_EC2_METADATA_SERVICE_ENDPOINT","AWS_EC2_METADATA_SERVICE_ENDPOINT_MODE","AWS_WEB_IDENTITY_TOKEN_FILE","AWS_ROLE_ARN"];
var PCn=["GCE_METADATA_HOST","GCE_METADATA_ROOT","GCE_METADATA_IP","METADATA_SERVER_DETECTION"];
var Wc=new Set(["CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST",...Kj,...qF,...uL,...RCn,"CLAUDE_CODE_HOST_AUTH_ENV_VAR","CLAUDE_CODE_SDK_HAS_HOST_AUTH_REFRESH","CLAUDE_CODE_HOST_AUTH_REFRESH_TIMEOUT_MS","CLAUDE_CODE_HOST_CREDS_FILE",...FSt,"GCLOUD_PROJECT","GOOGLE_CLOUD_QUOTA_PROJECT",...PCn,...ho,"AWS_REGION","AWS_DEFAULT_REGION",...KQe,"ANTHROPIC_BEDROCK_SERVICE_TIER","ANTHROPIC_BEDROCK_REGION_PREFIX","CLAUDE_CODE_CERT_STORE","DISABLE_GROWTHBOOK","CLAUDE_CODE_AUTO_MODE_MODEL","CLAUDE_CODE_BG_CLASSIFIER_MODEL","CLAUDE_CODE_SUBAGENT_MODEL_FORCE",...xCn]);
var ICn=["VERTEX_REGION_CLAUDE_"];
var Gc=["AWS_ENDPOINT_URL"];
function OCn(e){let n=e.toUpperCase();return Wc.has(n)||ICn.some((s)=>n.startsWith(s))||Gc.some((s)=>n.startsWith(s))};
var Vc=new Set(["AWS_PROFILE"]);
function G9o(e){return Vc.has(e.toUpperCase())};
var Yc=new Set(["HTTP_PROXY","HTTPS_PROXY","NO_PROXY"]);
function HCn(e){return Yc.has(e.toUpperCase())};
var Xc=new Set(["CLAUDE_CODE_CLIENT_CERT","CLAUDE_CODE_CLIENT_KEY","CLAUDE_CODE_CLIENT_KEY_PASSPHRASE","NODE_EXTRA_CA_CERTS","NODE_TLS_REJECT_UNAUTHORIZED","CLAUDE_CODE_OAUTH_SCOPES"]);
function YQe(e){return Xc.has(e.toUpperCase())};
var xje=["ANTHROPIC_UNIX_SOCKET","CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST","CLAUDE_CODE_HOST_AUTH_ENV_VAR"];
var Jc=new Set(["ANTHROPIC_BEDROCK_REGION_PREFIX","ANTHROPIC_BEDROCK_SERVICE_TIER","ANTHROPIC_CUSTOM_MODEL_OPTION","ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION","ANTHROPIC_CUSTOM_MODEL_OPTION_NAME","ANTHROPIC_CUSTOM_MODEL_OPTION_SUPPORTED_CAPABILITIES","ANTHROPIC_DEFAULT_FABLE_MODEL","ANTHROPIC_DEFAULT_FABLE_MODEL_DESCRIPTION","ANTHROPIC_DEFAULT_FABLE_MODEL_NAME","ANTHROPIC_DEFAULT_FABLE_MODEL_SUPPORTED_CAPABILITIES","ANTHROPIC_DEFAULT_MODEL","ANTHROPIC_DEFAULT_HAIKU_MODEL","ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION","ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME","ANTHROPIC_DEFAULT_HAIKU_MODEL_SUPPORTED_CAPABILITIES","ANTHROPIC_DEFAULT_OPUS_MODEL","ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION","ANTHROPIC_DEFAULT_OPUS_MODEL_NAME","ANTHROPIC_DEFAULT_OPUS_MODEL_SUPPORTED_CAPABILITIES","ANTHROPIC_DEFAULT_SONNET_MODEL","ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION","ANTHROPIC_DEFAULT_SONNET_MODEL_NAME","ANTHROPIC_DEFAULT_SONNET_MODEL_SUPPORTED_CAPABILITIES","ANTHROPIC_FOUNDRY_API_KEY","ANTHROPIC_MODEL","ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION","ANTHROPIC_SMALL_FAST_MODEL","AWS_DEFAULT_REGION","AWS_PROFILE","AWS_REGION","BASH_DEFAULT_TIMEOUT_MS","BASH_MAX_OUTPUT_LENGTH","BASH_MAX_TIMEOUT_MS","CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR","CLAUDE_CODE_API_KEY_HELPER_TTL_MS","CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS","CLAUDE_CODE_DISABLE_TERMINAL_TITLE","CLAUDE_CODE_ENABLE_AUTO_MODE","CLAUDE_CODE_ENABLE_DESIGN_SYNC","CLAUDE_CODE_ENABLE_FEEDBACK_SURVEY_FOR_OTEL","CLAUDE_CODE_ENABLE_TELEMETRY","CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS","CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL","CLAUDE_CODE_MAX_MCP_DESCRIPTION_LENGTH","CLAUDE_CODE_MAX_OUTPUT_TOKENS","CLAUDE_CODE_SKIP_BEDROCK_AUTH","CLAUDE_CODE_SKIP_FOUNDRY_AUTH","CLAUDE_CODE_SKIP_ANTHROPIC_AWS_AUTH","CLAUDE_CODE_SKIP_ANTHROPIC_GOOGLE_CLOUD_AUTH","CLAUDE_CODE_SKIP_MANTLE_AUTH","CLAUDE_CODE_SKIP_VERTEX_AUTH","CLAUDE_CODE_SUBAGENT_MODEL","CLAUDE_CODE_USE_BEDROCK","CLAUDE_CODE_USE_FOUNDRY","CLAUDE_CODE_USE_ANTHROPIC_AWS","CLAUDE_CODE_USE_ANTHROPIC_GOOGLE_CLOUD","CLAUDE_CODE_USE_GATEWAY","CLAUDE_CODE_USE_MANTLE","CLAUDE_CODE_USE_POWERSHELL_TOOL","CLAUDE_CODE_USE_VERTEX","DISABLE_AUTOUPDATER","DISABLE_BUG_COMMAND","DISABLE_COST_WARNINGS","DISABLE_FEEDBACK_COMMAND","DISABLE_GROWTHBOOK","DISABLE_INSTALLATION_CHECKS","DISABLE_UPDATES","ENABLE_TOOL_SEARCH","MAX_MCP_OUTPUT_TOKENS","MAX_THINKING_TOKENS","MCP_CONNECT_TIMEOUT_MS","MCP_TIMEOUT","MCP_TOOL_TIMEOUT","OTEL_EXPORTER_OTLP_COMPRESSION","OTEL_EXPORTER_OTLP_HEADERS","OTEL_EXPORTER_OTLP_LOGS_COMPRESSION","OTEL_EXPORTER_OTLP_LOGS_HEADERS","OTEL_EXPORTER_OTLP_LOGS_PROTOCOL","OTEL_EXPORTER_OTLP_METRICS_COMPRESSION","OTEL_EXPORTER_OTLP_METRICS_HEADERS","OTEL_EXPORTER_OTLP_METRICS_PROTOCOL","OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE","OTEL_EXPORTER_OTLP_PROTOCOL","OTEL_EXPORTER_OTLP_TRACES_COMPRESSION","OTEL_EXPORTER_OTLP_TRACES_HEADERS","OTEL_EXPORTER_OTLP_TRACES_PROTOCOL","OTEL_LOG_ASSISTANT_RESPONSES","OTEL_LOG_TOOL_CONTENT","OTEL_LOG_TOOL_DETAILS","OTEL_LOG_USER_PROMPTS","OTEL_LOGS_EXPORT_INTERVAL","OTEL_LOGS_EXPORTER","OTEL_METRIC_EXPORT_INTERVAL","OTEL_METRICS_EXPORTER","OTEL_METRICS_INCLUDE_ACCOUNT_UUID","OTEL_METRICS_INCLUDE_ENTRYPOINT","OTEL_METRICS_INCLUDE_REPOSITORY","OTEL_METRICS_INCLUDE_RESOURCE_ATTRIBUTES","OTEL_METRICS_INCLUDE_SESSION_ID","OTEL_METRICS_INCLUDE_VERSION","OTEL_RESOURCE_ATTRIBUTES","OTEL_SERVICE_NAME","OTEL_TRACES_EXPORT_INTERVAL","OTEL_TRACES_EXPORTER","USE_BUILTIN_RIPGREP","VERTEX_REGION_CLAUDE_3_5_HAIKU","VERTEX_REGION_CLAUDE_3_5_SONNET","VERTEX_REGION_CLAUDE_3_7_SONNET","VERTEX_REGION_CLAUDE_4_0_OPUS","VERTEX_REGION_CLAUDE_4_0_SONNET","VERTEX_REGION_CLAUDE_4_1_OPUS","VERTEX_REGION_CLAUDE_4_5_OPUS","VERTEX_REGION_CLAUDE_4_6_OPUS","VERTEX_REGION_CLAUDE_4_7_OPUS","VERTEX_REGION_CLAUDE_4_8_OPUS","VERTEX_REGION_CLAUDE_5_OPUS","VERTEX_REGION_CLAUDE_5_5_OPUS","VERTEX_REGION_CLAUDE_FABLE_5","VERTEX_REGION_CLAUDE_FABLE_5_1","VERTEX_REGION_CLAUDE_4_5_SONNET","VERTEX_REGION_CLAUDE_4_6_SONNET","VERTEX_REGION_CLAUDE_5_SONNET","VERTEX_REGION_CLAUDE_5_5_SONNET","VERTEX_REGION_CLAUDE_HAIKU_4_5","CLAUDE_AUTOCOMPACT_PCT_OVERRIDE","CLAUDE_CODE_AUTO_COMPACT_WINDOW","CLAUDE_CODE_DISABLE_UNKNOWN_MODEL_WINDOW_ENFORCEMENT","CLAUDE_CODE_MAX_CONTEXT_TOKENS","DISABLE_AUTO_COMPACT","DISABLE_COMPACT","CLAUDE_CODE_ALWAYS_ENABLE_EFFORT","CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING","CLAUDE_CODE_DISABLE_FAST_MODE","CLAUDE_CODE_DISABLE_LEGACY_MODEL_REMAP","CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK","CLAUDE_CODE_DISABLE_THINKING","CLAUDE_CODE_EFFORT_LEVEL","CLAUDE_CODE_MAX_EFFORT_REMINDER","CLAUDE_CODE_PROMPT_CACHE_TTL","CLAUDE_CODE_SUBAGENT_PROMPT_CACHE_TTL","DISABLE_INTERLEAVED_THINKING","DISABLE_PROMPT_CACHING","DISABLE_PROMPT_CACHING_FABLE","DISABLE_PROMPT_CACHING_HAIKU","DISABLE_PROMPT_CACHING_OPUS","DISABLE_PROMPT_CACHING_SONNET","ENABLE_PROMPT_CACHING_1H","ENABLE_PROMPT_CACHING_1H_BEDROCK","FALLBACK_FOR_ALL_PRIMARY_MODELS","FORCE_PROMPT_CACHING_5M","CLAUDE_AUTO_BACKGROUND_TASKS","CLAUDE_CODE_DISABLE_ADVISOR_TOOL","CLAUDE_CODE_DISABLE_AGENT_VIEW","CLAUDE_CODE_DISABLE_ARTIFACT","CLAUDE_CODE_DISABLE_BACKGROUND_TASKS","CLAUDE_CODE_DISABLE_BUNDLED_SKILLS","CLAUDE_CODE_DISABLE_CRON","CLAUDE_CODE_DISABLE_EXPLORE_PLAN_AGENTS","CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY","CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING","CLAUDE_CODE_DISABLE_MCP_TASK_BACKGROUND","CLAUDE_CODE_DISABLE_MEMORY_RO_UNSAVED_NOTICE","CLAUDE_CODE_DISABLE_WORKFLOWS","CLAUDE_CODE_ENABLE_AWAY_SUMMARY","CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING","CLAUDE_CODE_ENABLE_FUNCTION_HOOKS","CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION","CLAUDE_CODE_ENABLE_TASKS","CLAUDE_CODE_FORK_SUBAGENT","CLAUDE_CODE_PLAN_MODE_REQUIRED","DISABLE_DOCTOR_COMMAND","DISABLE_EXTRA_USAGE_COMMAND","DISABLE_INSTALL_GITHUB_APP_COMMAND","DISABLE_LOGIN_COMMAND","DISABLE_LOGOUT_COMMAND","DISABLE_UPGRADE_COMMAND","CLAUDE_AX_SCREEN_READER","CLAUDE_CODE_ACCESSIBILITY","CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN","CLAUDE_CODE_DISABLE_MOUSE","CLAUDE_CODE_DISABLE_MOUSE_CLICKS","CLAUDE_CODE_DISABLE_VIRTUAL_SCROLL","CLAUDE_CODE_FORCE_STRIKETHROUGH","CLAUDE_CODE_FORCE_TERMINAL_IMAGES","CLAUDE_CODE_HIDE_CWD","CLAUDE_CODE_NATIVE_CURSOR","CLAUDE_CODE_NO_FLICKER","CLAUDE_CODE_SCROLL_SPEED","CLAUDE_CODE_SYNTAX_HIGHLIGHT","API_TIMEOUT_MS","CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS","CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS","CLAUDE_CODE_GLOB_TIMEOUT_SECONDS","CLAUDE_CODE_MAX_RETRIES","CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION","CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY","CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION","CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS","CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT","CLAUDE_CODE_TEAM_TEARDOWN_PARK_TIMEOUT_MS","CLAUDE_STREAM_FIRST_BYTE_TIMEOUT_MS","CLAUDE_STREAM_IDLE_TIMEOUT_MS","MAX_STRUCTURED_OUTPUT_RETRIES","MCP_REMOTE_SERVER_CONNECTION_BATCH_SIZE","MCP_SERVER_CONNECTION_BATCH_SIZE","SLASH_COMMAND_TOOL_CHAR_BUDGET","TASK_MAX_OUTPUT_LENGTH","MCP_CONNECTION_NONBLOCKING","CLAUDE_ENABLE_BYTE_WATCHDOG","CLAUDE_ENABLE_BYTE_WATCHDOG_BEDROCK","CLAUDE_ENABLE_STREAM_WATCHDOG"]);
var z8r=new Set(["API_FORCE_IDLE_TIMEOUT","CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC","CLAUDE_CODE_DISABLE_WEB_FETCH","DISABLE_ERROR_REPORTING","DISABLE_TELEMETRY","DO_NOT_TRACK"]);
var qc=new Set(["ENABLE_BETA_TRACING_DETAILED","OTEL_LOG_RAW_API_BODIES"]);
var Zc=/auth|key|token|cookie|secret|credential|session|signature|passw|jwt|assertion|cert|oidc|org|tenant|account|project|workspace|user|email|identity|principal|consumer|client|host|url|base|target|upstream|endpoint|proxy|forward|route|fallback|override|apigw|x-goog-|l5d-|bypass|guardrail|amz|x-ms-|azureml|extra-parameters|envoy|helicone|litellm|cf-aig|cf-access|beta|version/;
function Qc(e){if(/\r(?!\n)/.test(e))return!0;return e.split(/\n|\r\n/).some((n)=>{let s=n.indexOf(":");if(s===-1)return!1;let r=n.slice(0,s).trim();return!eu.test(r)||LSt(n.slice(s+1))!==null||Zc.test(r.toLowerCase())})};
var eu=/^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
function BSt(e,n){let s=e.toUpperCase();return Jc.has(s)||gr(s,n)||s==="ANTHROPIC_CUSTOM_HEADERS"&&!Qc(n)};
function z9o(e,n){return gr(e.toUpperCase(),n)};
function gr(e,n){return z8r.has(e)&&Le(n)||qc.has(e)&&gs(n)};
function Zj(e){return e==="helper"||e==="plist"||e==="hklm"||e==="file"};
return {LSt,or,tr,sr,Ze,W9o,Kj,NSt,Fc,Rzt,TCn,$c,Bc,kCn,dr,Awe,qF,uL,RCn,KQe,xCn,xzt,fo,FSt,ho,PCn,Wc,ICn,Gc,OCn,Vc,G9o,Yc,HCn,Xc,YQe,xje,Jc,z8r,qc,Zc,Qc,eu,BSt,z9o,gr,Zj,gs,mT,wb,Le};
}
function module3(imports){

var Bv="CLAUDE_CODE_PROCESS_WRAPPER";
return {Bv};
}
function module4(imports){
const Xer=imports["Xer"];
var SQe=["CLAUDE_BG_DISPATCHER_SUBSCRIPTION_TYPE","CLAUDE_BG_DISPATCHER_RATE_LIMIT_TIER"];
return {SQe,Xer};
}
function module5(imports){
const a=imports["a"];

return {a};
}
function module6(imports){
const Ro=imports["Ro"];
const tr=imports["tr"];
const qOe=imports["qOe"];
const va=imports["va"];
var Li=["userSettings","projectSettings","localSettings","flagSettings","policySettings"];
function Xo(){let e=qOe(),n=va();if(n.enabledSources?.allowed===e)return n.enabledSources.result;let t=new Set(e);t.add("flagSettings"),t.add("policySettings");let o=Li.filter((i)=>t.has(i));return n.enabledSources={allowed:e,result:o},o};
var ffe=["projectSettings","localSettings"];
var Hm=new Set(ffe);
return {Li,Xo,ffe,Hm,Ro,tr,qOe,va};
}
function module7(imports){

var i=new Set(["--prefill","--prefill-b64","--deep-link-repo","--deep-link-last-fetch","--deep-link-cwd-b64","--handle-uri","--settings","--managed-settings","--setting-sources","--client-data-url","--watch-artifact","--watch-artifact-no-autoreact","--team-name","--agent-id","--agent-name","--agent-color","--parent-session-id","--agent-type","--model","--agent","--routine","--effort","--permission-mode","--inherit-permission-mode","--proactivity","--debug-file","--system-prompt","--system-prompt-file","--append-system-prompt","--append-system-prompt-file","--system-prompt-snapshot","--append-subagent-system-prompt","--append-subagent-system-prompt-file","--plan-mode-instructions","--permission-prompt-tool","--permission-prompts","--json-schema","--fallback-model","--advisor","--agents","--name","-n","--allowedTools","--allowed-tools","--disallowedTools","--disallowed-tools","--tools","--add-dir","--mcp-config","--betas","--file","--channels","--dangerously-load-development-channels","--plugin-dir","--plugin-dir-no-mcp","--plugin-url","--remote-control-session-name-prefix","--sdk-url","--exec","-m","--thinking","--thinking-display","--max-thinking-tokens","--max-turns","--max-budget-usd","--task-budget","--autocompact","--rewind-files","--resume-session-at","--resume-drops-turn","--workload","--output-format","--input-format","--teammate-mode","--messaging-socket-path","--session-id","--environment","--pool","--ref","--on-branch","--correlation-id","--forward-home-settings","--project-config-root","--attach-serve",...[]]);
var xor=new Set(["--allowedTools","--allowed-tools","--disallowedTools","--disallowed-tools","--tools","--add-dir","--mcp-config","--betas","--file","--channels","--dangerously-load-development-channels"]);
var a=new Set(["-d","--debug","-r","--resume","--from-pr","-w","--worktree","--teleport","--cloud","--remote","--project","--remote-control","--rc","--prompt-suggestions"]);
function YZe(e,n){let t=e[n];if(t!==void 0&&a.has(t)){let r=e[n+1];return r!==void 0&&!ewt(r)?n+1:n}if(t===void 0||!i.has(t))return n;let o=n+1;if(xor.has(t))while(o+1<e.length&&!ewt(e[o+1]))o++;return o};
function ewt(e){return e.length>1&&e.startsWith("-")};
function SI(e,n=process.argv){return Xse(e,n).at(-1)};
function Xse(e,n=process.argv){return l(e,n).map((t)=>t.value)};
function l(e,n){let t=[];for(let o=0;o<n.length;o++){let r=n[o];if(r==="--")break;if(r?.startsWith(`${e}=`)){t.push({value:r.slice(e.length+1),indices:[o]});continue}if(r===e&&o+1<n.length){t.push({value:n[o+1],indices:[o,o+1]}),o++;continue}o=YZe(n,o)}return t};
function iC(e,n=process.argv){return XZe((t)=>t===e,n)!==-1};
function jWe(e=process.argv.slice(2)){let n=iC("-p",e)||iC("--print",e),t=iC("--init-only",e),o=XZe((r)=>r.startsWith("--sdk-url"),e)!==-1;return n||t||o||!process.stdout.isTTY};
function XZe(e,n=process.argv){for(let t=0;t<n.length;t++){let o=n[t];if(o==="--")break;if(o!==void 0&&e(o))return t;t=YZe(n,t)}return-1};
return {i,xor,a,YZe,ewt,SI,Xse,l,iC,jWe,XZe};
}
function module8(imports){
const a=imports["a"];
const Jk=imports["Jk"];
const Zj=imports["Zj"];
const U8=imports["U8"];
const czt=imports["czt"];
const mT=imports["mT"];
const wb=imports["wb"];
const Hm=imports["Hm"];
const SI=imports["SI"];
const XZe=imports["XZe"];
const jWe=imports["jWe"];
const iC=imports["iC"];
const Zn=imports["Zn"];
function Kr(e){return e==="--cloud"||e==="--remote"||e.startsWith("--cloud=")||e.startsWith("--remote=")};
function x9r(){return SI("--attach-serve")!==void 0||XZe(Kr)!==-1&&jWe()&&!iC("-p")&&!iC("--print")};
function Ptr(e){return e!=="globalConfig"&&Hm.has(e)&&x9r()};
function jj(){return a.CLAUDE_CODE_REMOTE_TOOLS_PIN_STORED_LOGIN===!0};
function Ntr(e){if(!jj())return!1;if(e!=="policySettings")return!0;let n=Jk();return!((Zj(n)||n==="remote")&&U8().userWritable!==!0&&!czt()&&(mT()===null||wb()))};
return {Kr,x9r,Ptr,jj,Ntr,a,Jk,Zj,U8,czt,mT,wb,Hm,SI,XZe,jWe,iC,Zn};
}
function module9(imports){
const a=imports["a"];
var r=new Set(["claude-desktop","claude-desktop-3p","local-agent"]);
function yd(){let e=a.CLAUDE_CODE_ENTRYPOINT;return e!==void 0&&r.has(e)};
return {r,yd,a};
}
function module10(imports){
const le=imports["le"];

return {le};
}
function module11(imports){
const KP=imports["KP"];

return {KP};
}
function module12(imports){
const a7r=imports["a7r"];
const d7r=imports["d7r"];
const krr=imports["krr"];
const Fse=imports["Fse"];
const lw=imports["lw"];
const U0e=imports["U0e"];
const Nse=imports["Nse"];

return {a7r,d7r,krr,Fse,lw,U0e,Nse};
}
function module13(imports){
const d=imports["d"];

return {d};
}
function module14(imports){
const ge=imports["ge"];
const ia=imports["ia"];
const t=imports["t"];
const xje=imports["xje"];
const xzt=imports["xzt"];
const gs=imports["gs"];
const OCn=imports["OCn"];
const G9o=imports["G9o"];
const Rzt=imports["Rzt"];
const HCn=imports["HCn"];
const YQe=imports["YQe"];
const qF=imports["qF"];
const Awe=imports["Awe"];
const Bv=imports["Bv"];
const SQe=imports["SQe"];
const TCn=imports["TCn"];
const kCn=imports["kCn"];
const z8r=imports["z8r"];
const Le=imports["Le"];
const W9o=imports["W9o"];
const Ntr=imports["Ntr"];
const Ptr=imports["Ptr"];
const z9o=imports["z9o"];
const NSt=imports["NSt"];
const Zn=imports["Zn"];
const Ro=imports["Ro"];
const yd=imports["yd"];
const jj=imports["jj"];
const le=imports["le"];
const tr=imports["tr"];
const KP=imports["KP"];
const Xo=imports["Xo"];
const BSt=imports["BSt"];
const Xer=imports["Xer"];
const a=imports["a"];
const a7r=imports["a7r"];
const d7r=imports["d7r"];
const krr=imports["krr"];
const Fse=imports["Fse"];
const lw=imports["lw"];
const U0e=imports["U0e"];
const Nse=imports["Nse"];
const d=imports["d"];
function T(e,n){return W9o.test(e)?"invalid-name":typeof n!=="string"?"non-string-value":n.includes("\x00")?"nul-in-value":void 0};
var Aht={"invalid-name":"it isn't a valid environment variable name","non-string-value":"its value isn't a string","nul-in-value":"its value contains a NUL character"};
var N=200;
function b(e){return e===1?"1 character":`${e} characters`};
function g(e){return ia(e).slice(1,-1).replace(/[^\x20-\x7e]/g,(n)=>`\\u${n.charCodeAt(0).toString(16).padStart(4,"0")}`)};
function Tht(e){let n=e.indexOf("="),r=n===-1?e:e.slice(0,n),E=r.length>N,o=`"${g(E?r.slice(0,N):r)}"${E?"\u2026":""}`;return n===-1?o:`${o} (then '=' and ${b(e.length-n-1)}, not shown)`};
var V=new Set(["ANTHROPIC_UNIX_SOCKET","ANTHROPIC_BASE_URL","ANTHROPIC_API_KEY","ANTHROPIC_AUTH_TOKEN","CLAUDE_CODE_OAUTH_TOKEN",...qF.filter((e)=>e.startsWith("CLAUDE_CODE_ARTIFACT")||Awe(e))]);
function I(e){if(!e||!process.env.ANTHROPIC_UNIX_SOCKET)return e||{};let n={};for(let[r,E]of Object.entries(e))if(!V.has(r.toUpperCase()))n[r]=E;return n};
var f=Object.freeze({managedByHost:!1,managedByHostFlag:!1,desktopHost:!1,hostOrchestrated:!1,storedLoginPinned:!1});
function U(){let e=Le(process.env.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST),n=yd(),r=process.env.CLAUDE_CODE_ENVIRONMENT_KIND;return{managedByHost:e||!!process.env.CLAUDE_CODE_HOST_AUTH_ENV_VAR,managedByHostFlag:e,desktopHost:n,hostOrchestrated:n||r==="byoc",storedLoginPinned:jj()}};
var W=new Set(["policySettings","projectSettings","localSettings"]);
var K=[];
var w=[];
var Y=[];
var PXn=new Set([Bv,"CLAUDE_CODE_CUSTOM_OAUTH_URL","CLAUDE_CODE_SYNC_SKILLS","CLAUDE_CODE_SYNC_PLUGINS","CLAUDE_CODE_TRANSCRIPT_LOCAL_GC","CLAUDE_CODE_CCR_SURFACE","CLAUDE_CODE_TETHER_LIVE","CLAUDE_CODE_BRIDGE_CHILD_AUTO_DEFAULT","CLAUDE_CODE_BRIDGE_CHILD_ARTIFACT","CLAUDE_CODE_BRIDGE_CHILD_MACHINE_SETTINGS","CLAUDE_CODE_MCP_APPS_HOST","CLAUDE_CODE_HOST_PROMPT_SUPERSEDES_RECORD","CLAUDE_CODE_REMOTE_TOOLS_PIN_STORED_LOGIN","CLAUDE_CODE_3P_PROBE_WROTE_SONNET_DEFAULT","CLAUDE_CODE_3P_PROBE_WROTE_OPUS_DEFAULT","CLAUDE_CODE_3P_PROBE_WROTE_HAIKU_DEFAULT","CLAUDE_CODE_3P_SEEDED_SONNET_DEFAULT","CLAUDE_CODE_3P_SEEDED_OPUS_DEFAULT","CLAUDE_CODE_SANDBOXED","CLAUDE_CODE_ATTRIBUTION_STATUS_TIMEOUT_MS","CLAUDE_CODE_TOOL_USE_ID","CLAUDE_CODE_DISABLE_ATTRIBUTION_CROSS_REPO","CLAUDE_CODE_DISABLE_WEB_FETCH","CCR_SESSION_PROFILE","CLAUDE_CODE_MCP_STARTUP_WAIT_MS","CLAUDE_CODE_MCP_CONNECTOR_PREWAIT_MS","CLAUDE_CODE_MCP_PREWAIT_SERVERS","CLAUDE_CODE_MCP_PREWAIT_SERVERS_MS","CLAUDE_CODE_SKILL_PROPOSALS","CLAUDE_CODE_PLUGIN_CACHE_DIR","CLAUDE_CODE_PLUGIN_SEED_DIR","CLAUDE_CODE_PLUGIN_DIRS","CLAUDE_CODE_PLUGIN_DIR_WATCH","CLAUDE_CODE_ENABLE_FUNCTION_HOOKS","CLAUDE_CODE_PLUGIN_ATTRIBUTION","CLAUDE_CODE_SKILL_ATTRIBUTION","CLAUDE_CODE_MODEL_CATALOG_URL","CLAUDE_CODE_CLIENT_DATA_URL",...SQe,"CLAUDE_CODE_SUBSCRIPTION_TYPE","CLAUDE_CODE_RATE_LIMIT_TIER","CLAUDE_CODE_DISABLE_DANGEROUS_RM_TIMEOUT","CLAUDE_CODE_DISABLE_SUBSTITUTION_RM_PROMPT","CLAUDE_CODE_DISABLE_POWERSHELL_CMD_RM_DENY","CLAUDE_CODE_FEDERATION_CACHE_DIR","ANTHROPIC_CONFIG_DIR","XDG_CONFIG_HOME","HOME","APPDATA","USERPROFILE","HOMEDRIVE","HOMEPATH","PROGRAMDATA","ALLUSERSPROFILE","SYSTEMROOT","WINDIR","COMSPEC","SYSTEMDRIVE","PROGRAMFILES","PROGRAMFILES(X86)","PROGRAMW6432","LOCALAPPDATA","PATHEXT","COMMONPROGRAMFILES","COMMONPROGRAMFILES(X86)","COMMONPROGRAMW6432","PSMODULEPATH","HOMESHARE","ONEDRIVE","ONEDRIVECONSUMER","ONEDRIVECOMMERCIAL","CDPATH","PWD","XDG_DATA_HOME","XDG_CACHE_HOME","XDG_STATE_HOME","CLAUDE_CODE_SAFE_MODE","CLAUDE_CODE_SIMPLE","CLAUDE_CODE_HARBOR_KITE","CLAUDE_CODE_HARBOR_KITE_CLOUD","CLAUDE_CODE_HARBOR_KITE_PACING_OFF","CLAUDE_CODE_SILENT_TURN_REMINDER","CLAUDE_CODE_SILENT_TURN_REMINDER_TURNS","CLAUDE_CODE_SILENT_TURN_REMINDER_TEXT","CLAUDE_CODE_MODEL_CAPABILITIES","CLAUDE_CODE_ARTIFACT_ROOM","CLAUDE_CODE_BASH_EDIT_DIFF","CLAUDE_CODE_FORWARD_USER_INTENT","CLAUDE_CODE_WHIMSICAL_ELEPHANT","CLAUDE_CODE_ARTIFACT_PRESENCE","CLAUDE_CODE_ARTIFACT_OPEN_ACTION","CLAUDE_CODE_ARTIFACT_REPL","USER_TYPE","CLAUDE_CODE_MESSAGING_SOCKET","CLAUDE_CODE_MESSAGING_TOKEN","CLAUDE_CODE_DISABLE_ADMIN_ENV_UNION","CLAUDE_CODE_MANAGED_SETTINGS_PATH","CLAUDE_CODE_TOASTY_THIMBLE","CLAUDE_CODE_GENTLE_PARASOL","CLAUDE_CODE_LEGACY_BUNDLE","CCR_ENABLE_BUNDLE","CCR_FORCE_BUNDLE","GITHUB_ACTIONS","RUNNER_ENVIRONMENT","CLAUDE_CODE_SUBPROCESS_ENV_SCRUB","ENABLE_BETA_TRACING_DETAILED","BETA_TRACING_ENDPOINT","OTEL_LOG_RAW_API_BODIES",...TCn,"CLAUDE_PTY_RECORD","CLAUDE_CODE_DEBUG_LOGS_DIR","CLAUDE_CODE_DIAGNOSTICS_FILE","CLAUDE_CODE_PERFETTO_TRACE","CLAUDE_CODE_FRAME_TIMING_LOG","CLAUDE_CODE_REMOTE_MEMORY_DIR","CLAUDE_COWORK_MEMORY_PATH_OVERRIDE","AUTOMODE_DECISION_LOG","CLAUDE_CONFIG_DIR","CLAUDE_SECURESTORAGE_CONFIG_DIR","CLAUDE_CODE_TMPDIR","CLAUDE_TMPDIR","TMPDIR","TMP","TEMP","XDG_RUNTIME_DIR","CLAUDE_JOB_DIR","CLAUDE_CODE_REMOTE_TOOLS_FORWARD",...K]);
var k=[...w];
function j(e){let n=e.toUpperCase();return PXn.has(n)||k.some((r)=>n.startsWith(r))};
function h(e,n,r,E){if(!e||!Rzt(n))return e;let o;for(let s of Object.keys(e)){if(!j(s)||kCn(s,e[s],E)||z8r.has(s)&&Le(e[s]))continue;if(o??={...e},delete o[s],!r.has(s)){r.add(s);let i=n==="localSettings"?".claude/settings.local.json":".claude/settings.json";t(F.has(s.toUpperCase())?`${s} in ${i} is ignored: this key can only come from the environment Claude Code is started with, not from any settings file.`:`${s} in ${i} is ignored \u2014 project-scoped settings can't set this key. Set it in ~/.claude/settings.json or managed settings instead.`,{level:"warn"})}}return o??e};
var X={...Aht,"non-string-value":"its value isn't a string, a number or a boolean"};
function P(e,n,r){if(!e)return e;let E;for(let[o,s]of Object.entries(e)){let i=s,_=typeof i==="string"?i:typeof i==="number"||typeof i==="boolean"?String(i):void 0,S=T(o,_);if(S===void 0){if(_!==void 0&&_!==i)E??={...e},E[o]=_;continue}E??={...e},delete E[o];let A=X[S],O=Tht(o),R=`${n}:${A}:${O}`;if(!r.has(R))r.add(R),t(`Env key ${O} from ${n} is ignored: ${A}.`,{level:"warn"})}return E??e};
var F=new Set([...xje,"CLAUDE_CODE_HOST_GATEWAY_LINEAGE","CLAUDE_CODE_HOST_CREDS_FILE","CLAUDE_CODE_HOST_AUTH_ENV_VAR","CLAUDE_BG_AUTH_SNAPSHOT_PATH","CLAUDE_BG_SOCKET_TOKENS_PATH",...xzt,"CLAUDE_CODE_MESSAGING_SOCKET","CLAUDE_CODE_MESSAGING_TOKEN","CLAUDE_CODE_DISABLE_ADMIN_ENV_UNION","CLAUDE_CODE_DISABLE_DANGEROUS_RM_TIMEOUT","CLAUDE_CODE_DISABLE_SUBSTITUTION_RM_PROMPT","CLAUDE_CODE_DISABLE_POWERSHELL_CMD_RM_DENY","CLAUDE_CODE_TRANSCRIPT_LOCAL_GC","CLAUDE_CODE_MANAGED_SETTINGS_PATH","CLAUDE_CODE_EVAL_CONFINED","CLAUDE_CODE_TUI_TRIAL","CLAUDE_RELAUNCH_SESSION_ADD_DIRS","CLAUDE_BG_SESSION_PERMISSION_RULES","CLAUDE_CODE_WEBSOCKET_AUTH_FILE_DESCRIPTOR","CLAUDE_SESSION_INGRESS_TOKEN_FILE","CLAUDE_CODE_SESSION_ACCESS_TOKEN","CLAUDE_CODE_SESSION_KIND","CLAUDE_CODE_SANDBOXED","CLAUDE_BG_WORKSPACE_TRUSTED","CLAUDE_CODE_RELAUNCH_HOME_TRUST","CLAUDE_BRIDGE_REATTACH_SESSION","CLAUDE_CODE_PROJECT_DIR_NAME"]);
var x=new Set(["CLAUDE_CODE_TRANSCRIPT_LOCAL_GC"]);
function J(e,n,r){return r==="policySettings"&&x.has(e.toUpperCase())&&gs(n)};
function c(e,n,r,E=!1){if(e.has(n))return;e.add(n);let o=g(n);t(E?`Ignoring ${o} from ${r} \u2014 repo-committed settings can't re-point the TLS/proxy channel of a session whose credential comes from the host. Set it in ~/.claude/settings.json or managed settings instead.`:`Ignoring ${o} from ${r} \u2014 this session's provider routing is managed by the host (CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST or a host-auth-callback marker), so settings-sourced provider/auth configuration does not apply.`,{level:"warn"})};
function u(e,n,r,E){if(!e)return{};let o=r.managedByHost||r.desktopHost&&W.has(n),s={};for(let[i,_]of Object.entries(e)){if(F.has(i.toUpperCase())&&!J(i,_,n))continue;if(!o){s[i]=_;continue}if(OCn(i)&&(r.managedByHost||!G9o(i))){if(r.managedByHost)c(E,i,n);continue}if(r.managedByHost&&i.toUpperCase()==="ANTHROPIC_CUSTOM_HEADERS"){c(E,i,n);continue}if(r.managedByHostFlag&&(!r.desktopHost||Rzt(n))&&(HCn(i)||YQe(i))){c(E,i,n,r.desktopHost);continue}s[i]=_}return s};
function v(e,n,r){if(!e||!n)return e||{};let E={},o=[];for(let[s,i]of Object.entries(e)){if(!n.has(s.toUpperCase())){E[s]=i;continue}if(r&&process.env[s]!==i)o.push(s)}if(r&&o.length>0)z(o,r.source,r.warned);return E};
function z(e,n,r){let E=e.filter((s)=>{let i=`${n}:${s}`;if(r.has(i))return!1;return r.add(i),!0});if(E.length===0)return;let o=E.map(g).join(", ");t(`Ignoring ${o} from ${n}: the environment this session was launched with already sets ${E.length===1?"it":"them"}, and when the desktop app or a runner starts the session, the launch environment takes precedence over settings.`,{level:"warn"})};
function q(e,n){if(!e)return{};let r={};for(let[E,o]of Object.entries(e)){let s=E.toUpperCase();if(s==="NO_COLOR"||s==="FORCE_COLOR"){n[E]=o;continue}r[E]=o}return r};
var Q=new Set(["CLAUDE_CODE_REMOTE","CLAUDE_CODE_REMOTE_HERMETIC_MODE","CLAUDE_CODE_ENVIRONMENT_KIND","CLAUDE_CODE_BRIDGE_CHILD_AUTO_DEFAULT","CLAUDE_CODE_BRIDGE_CHILD_ARTIFACT","CLAUDE_CODE_BRIDGE_CHILD_MACHINE_SETTINGS","CLAUDE_CODE_BRIDGE_MCP_CARRIER","CLAUDE_CODE_BRIDGE_PROMPT_SHA256","CLAUDE_CODE_APPEND_PROMPT_HEAD","CLAUDE_CODE_BRIDGE_OWNER_ACCOUNT_UUID","CLAUDE_CODE_BRIDGE_OWNER_ORG_UUID","CLAUDE_CODE_BRIDGE_SOURCE_DIR","CLAUDE_CODE_POLL_EVENTS","CLAUDE_CODE_POLL_EVENT_DECLARATIONS","CLAUDE_CODE_ACCOUNT_UUID","CLAUDE_CODE_ORGANIZATION_UUID","CLAUDE_CODE_USER_EMAIL","CLAUDE_CODE_CONTAINER_ID","CLAUDE_CODE_SESSION_ID","CLAUDE_CODE_SYNC_SESSION_REFS","CLAUDE_CODE_SKILL_PROPOSALS","CLAUDE_CODE_REMOTE_SESSION_ID","CLAUDE_CODE_HOVER_REST","CCR_AGENT_PROXY_ENABLED","CCR_AGENT_PROXY_RELAY_MODE","CCR_AGENT_PROXY_INCLUDE_HOSTS","CCR_AGENT_PROXY_RECEIVE_GATE_DISABLED","CCR_AGENT_PROXY_UPLOAD_GATE_DISABLED","CCR_AGENT_PROXY_NO_PROXY_LOCAL_ONLY","CCR_AGENT_PROXY_CA_CERT_B64","CCR_AGENT_PROXY_FRAME_HOSTS","AGENT_PROXY_URL","AGENT_PROXY_AUTH_TOKEN","CLAUDE_CODE_MCP_SERVE_AUTH_TOKEN","CLAUDE_CODE_MCP_SERVE_SETTINGS","CLAUDE_CODE_MCP_SERVE_TOOL_OUTPUT","CLAUDE_CODE_AGENT_PROXY_GIT_CONFIG","CLAUDE_CODE_AGENT_PROXY_GH_SHIM","CLAUDE_CODE_AGENT_PROXY_GIT_HOSTS","SESSION_INGRESS_URL","CCR_SESSION_PROFILE","CLAUDE_CODE_REMOTE_SESSION_ORIGIN","CLAUDE_CODE_WORKER_EPOCH","CLAUDE_CODE_DISABLE_WORKING_SYNC",...[],"CLAUDE_CODE_CCR_EARLY_HYDRATE_PREFETCH","CLAUDE_CODE_CCR_EARLY_REMOTE_CONNECT","CLAUDE_CODE_CCR_EARLY_PLUGINS_SYNC","CLAUDE_CODE_CCR_EARLY_SKILLS_SYNC","CLAUDE_CODE_CCR_FOLD_FIRST_TURN_RESCAN","CLAUDE_CODE_GROWTHBOOK_KICK_FROM_INIT","CLAUDE_CODE_CCR_SKIP_FRESH_MIGRATIONS","CLAUDE_CODE_HOME_SEED_HOLD_TIMEOUT_MS","CLAUDE_CODE_HOME_SEED_VERDICT_TIMEOUT_MS","CLAUDE_CODE_DISABLE_HOOK_FORWARDING","CLAUDE_CODE_DISABLE_PLUGIN_FORWARDING","CLAUDE_CODE_DISABLE_TURN_HANDOFF","CLAUDE_CODE_RESTRICTED"]);
var Z=new Set(["CLAUDE_REMOTE_WORKFLOW_SCRIPT","CLAUDE_REMOTE_WORKFLOW_ARGS","CLAUDE_WORKFLOW_NAME_ONLY"]);
var ee=new Set(["CLAUDE_CODE_ENTRYPOINT","CLAUDE_CODE_HOST_SESSION_ID","CLAUDE_CODE_IS_COWORK","CLAUDE_CODE_COWORK_FRAME_ARTIFACTS","CLAUDE_CODE_HOST_SCHEDULED_RUN","CLAUDE_CODE_ARTIFACT_SHARE","CLAUDE_CODE_CCR_SURFACE","CLAUDE_CODE_SESSION_ORIGIN","SYSTEM_REMINDER_MEMORY_CONTEXT","CLAUDE_CODE_MEMORY_SUBAGENT_APPEND","CLAUDE_CODE_POST_TURN_MEMORY","CLAUDE_CODE_POST_TURN_MEMORY_CONFIG","CLAUDE_CODE_POST_TURN_MEMORY_SYNC",...Y,"CLAUDE_CODE_QUESTION_EXTENDED","CLAUDE_CODE_QUESTION_OPTIONAL_DESCRIPTIONS","CLAUDE_CODE_MCP_APPS_HOST","CLAUDE_CODE_HOST_PROMPT_SUPERSEDES_RECORD","CLAUDE_CODE_REMOTE_TOOLS_PIN_STORED_LOGIN","CLAUDE_CODE_SDK_HAS_OAUTH_REFRESH","CLAUDE_CODE_SDK_READS_SESSION_STATE","CLAUDE_CHROME_PAIRED_DEVICE_ID","CLAUDE_CHROME_TAB_GROUP_KEY","CLAUDE_CODE_SANDBOXED","CLAUDE_CODE_ATTRIBUTION_STATUS_TIMEOUT_MS","CLAUDE_CODE_TOOL_USE_ID","CLAUDE_CODE_DISABLE_ATTRIBUTION_CROSS_REPO","CLAUDE_CODE_CONFIG_PROBE"]);
var te=new Set(["CLAUDE_STAGE_FILE_ROOT"]);
var ne="CLAUDE_CODE_DISABLE_DIR_";
function m(e){if(!e)return{};let n={};for(let[r,E]of Object.entries(e)){let o=r.toUpperCase();if(!Q.has(o)&&!o.startsWith(ne)&&!Z.has(o)&&!ee.has(o)&&!te.has(o)&&!0&&o!=="CLAUDE_CODE_REMOTE_TOOLS_FORWARD")n[r]=E}return n};
var Ee=["userSettings","flagSettings","policySettings"];
var p=["TRACES","METRICS","LOGS","PROFILES"];
var C=NSt;
var y=new Set(["HEADERS","CLIENT_KEY","CLIENT_CERTIFICATE"]);
var M=new Set(["OTEL_LOGS_EXPORTER","OTEL_TRACES_EXPORTER"]);
var H="CLAUDE_CODE_ENABLE_TELEMETRY";
var G="BETA_TRACING_ENDPOINT";
function L(e){return e};
function re(e){return!e.split(",").map((n)=>n.trim()).includes("otlp")};
class B{providerStripContext=f;projectScopeDropWarned=new Set;hostManagedDropWarned=new Set;invalidEnvKeyWarned=new Set;hostSpawnEnvKeys=void 0;settingsColorEnv={};materializedProcessWrapper=void 0;preSettingsEnvSnapshot=void 0;userTierNames=new Set;launchNamesBeforeClaim=void 0;userTierNamesInSnapshot=new Set;otelDominanceDropWarned=new Set;hostSpawnEnvDropWarned=new Set;servedFolderEnvWithheld=!1;getPreSettingsEnvSnapshot(){return this.preSettingsEnvSnapshot??=this.latchPreSettingsEnvSnapshot({...process.env}),this.preSettingsEnvSnapshot}latchPreSettingsEnvSnapshot(e){let n=this.launchNamesBeforeClaim;return this.userTierNamesInSnapshot=new Set(n===void 0?[]:Object.keys(e).map((r)=>r.toUpperCase()).filter((r)=>this.userTierNames.has(r)&&!n.has(r))),Object.freeze(e)}envAboveProjectSettings(){let e=this.getPreSettingsEnvSnapshot(),n={};for(let[r,E]of Object.entries(e))if(!this.userTierNamesInSnapshot.has(r.toUpperCase()))n[r]=E;return{...n,...ge("flagSettings")?.env,...ge("policySettings")?.env}}peekPreSettingsEnvSnapshot(){return this.preSettingsEnvSnapshot}appliedGlobalConfigEnv=void 0;settingsOfferedEnvValues=new Map;getAppliedGlobalConfigEnv(){return this.appliedGlobalConfigEnv}dropPreSettingsEnvSnapshot(e){if(e!==void 0&&this.preSettingsEnvSnapshot)this.launchNamesBeforeClaim=new Set([...Object.keys(this.preSettingsEnvSnapshot),...e].map((n)=>n.toUpperCase()));this.preSettingsEnvSnapshot=void 0}reset(){this.providerStripContext=f,this.projectScopeDropWarned.clear(),this.hostManagedDropWarned.clear(),this.invalidEnvKeyWarned.clear(),this.hostSpawnEnvKeys=void 0,this.settingsColorEnv={},this.materializedProcessWrapper=void 0,this.preSettingsEnvSnapshot=void 0,this.userTierNames.clear(),this.launchNamesBeforeClaim=void 0,this.userTierNamesInSnapshot=new Set,this.appliedGlobalConfigEnv=void 0,this.settingsOfferedEnvValues.clear(),this.otelDominanceDropWarned.clear(),this.hostSpawnEnvDropWarned.clear(),this.servedFolderEnvWithheld=!1}servedFolderEnvWasWithheld(){return this.servedFolderEnvWithheld}filterSettingsEnv(e,n){if(this.withholdsEnvFrom(n))return{};let r=q(v(u(m(I(h(P(this.asFromAFolderNobodyTrusted(e,n,!0),n,this.invalidEnvKeyWarned),n,this.projectScopeDropWarned,()=>this.envAboveProjectSettings()))),n,this.providerStripContext,this.hostManagedDropWarned),this.hostSpawnEnvKeys,{source:n,warned:this.hostSpawnEnvDropWarned}),this.settingsColorEnv);for(let[E,o]of Object.entries(r)){let s=E.toUpperCase(),i=o.trim(),_=this.settingsOfferedEnvValues.get(s);if(_)_.add(i);else this.settingsOfferedEnvValues.set(s,new Set([i]))}if(n==="globalConfig"||n==="userSettings")for(let E of Object.keys(r))this.userTierNames.add(E.toUpperCase());return r}isSettingsSourcedEnvValue(e,n){return this.settingsOfferedEnvValues.get(e.toUpperCase())?.has(n.trim())===!0}filterPolicyPredicateEnv(e,n,{forPolicyMatch:r}){if(!r&&this.withholdsEnvFrom(n))return{};let E=v(u(m(I(h(P(r?e:this.asFromAFolderNobodyTrusted(e,n,!1),n,this.invalidEnvKeyWarned),n,this.projectScopeDropWarned,()=>this.envAboveProjectSettings()))),n,this.providerStripContext,this.hostManagedDropWarned),this.hostSpawnEnvKeys),o={};for(let[s,i]of Object.entries(E)){let _=s.toUpperCase();if(_==="NO_COLOR"||_==="FORCE_COLOR")continue;o[s]=i}return o}withholdsEnvFrom(e){return this.providerStripContext.storedLoginPinned&&Ntr(e)}asFromAFolderNobodyTrusted(e,n,r){if(e===void 0||!Ptr(n))return e;let E={};for(let[o,s]of Object.entries(e))if(typeof s==="string"&&z9o(o,s))E[o]=s;else if(r)this.servedFolderEnvWithheld=!0;return E}processWrapperKeyFrom(e){return this.withholdsEnvFrom(e)?void 0:ge(e)?.processWrapper}dropDominatedOtelKey(e,n,r,E,o="managed settings"){if(E.get(e)===process.env[e])return;if(this.hostSpawnEnvKeys?.has(e.toUpperCase()))return;if(process.env[e]===void 0)return;if(!this.otelDominanceDropWarned.has(e))this.otelDominanceDropWarned.add(e),t(`Dropping ${e}: ${r} is claimed by ${o}, so lower-trust scopes cannot redirect ${n}`,{level:"warn"});delete process.env[e]}dropDominatedAntAlias(e,n,r,E="managed settings"){return}dropDominatedBetaTracingEndpoint(e,n,r="managed settings"){this.dropDominatedOtelKey(G,"the logs and traces signals through detailed beta tracing",e,n,r)}hostSpawnOtelClaims(){let e=new Map,n=this.hostSpawnEnvKeys;if(!n)return e;let r=[...n].some((E)=>{let o=L(E);return(o.startsWith(C)&&o.endsWith("_ENDPOINT")||o===G)&&(process.env[E]??"").trim()!==""});for(let E of n){let o=L(E),s=M.has(o)||o===H,i=r&&o.startsWith(C);if(!s&&!i)continue;let _=process.env[E];if(_!==void 0)e.set(E,_)}return e}enforceManagedOtelFamilyDominance(){let e=ge("policySettings"),n=e?.env,r=(e?.otelHeadersHelper??"").trim()!=="",E=new Map;for(let[o,s]of Object.entries(n??{})){let i=o.toUpperCase();if(!E.has(i)||o===i)E.set(i,s)}if(this.applyOtelFamilyClaims(this.hostSpawnOtelClaims(),E,"the host spawn env"),!n&&!r)return;if(r){for(let o of p)this.dropDominatedOtelKey(`${C}${o}_ENDPOINT`,`the ${o.toLowerCase()} signal`,"otelHeadersHelper",E);this.dropDominatedOtelKey(`${C}ENDPOINT`,"telemetry for any signal","otelHeadersHelper",E),this.dropDominatedAntAlias(`${C}ENDPOINT`,"otelHeadersHelper",E),this.dropDominatedBetaTracingEndpoint("otelHeadersHelper",E)}this.applyOtelFamilyClaims(E,E,"managed settings")}applyOtelFamilyClaims(e,n,r){for(let[E,o]of e){let s=L(E);if(s===H){if(process.env[E]===o&&!Le(o))this.dropDominatedBetaTracingEndpoint(E,n,r);continue}if(M.has(s)){if(process.env[E]===o&&re(o))this.dropDominatedBetaTracingEndpoint(E,n,r);continue}if(!s.startsWith(C))continue;if(o.trim()==="")continue;if(process.env[E]!==o)continue;let i=p.find((O)=>s.startsWith(`${C}${O}_`));if(i){let O=s.slice(`${C}${i}_`.length),R=i==="TRACES"||i==="LOGS";if(y.has(O)){if(this.dropDominatedOtelKey(`${C}${i}_ENDPOINT`,`the ${i.toLowerCase()} signal`,E,n,r),R)this.dropDominatedBetaTracingEndpoint(E,n,r)}else if(O==="ENDPOINT"&&R)this.dropDominatedBetaTracingEndpoint(E,n,r);continue}let _=s.slice(C.length),S=y.has(_),A=S?[_,"ENDPOINT"]:[_];for(let O of A)for(let R of p)this.dropDominatedOtelKey(`${C}${R}_${O}`,`the ${R.toLowerCase()} signal`,E,n,r);if(S)this.dropDominatedOtelKey(`${C}ENDPOINT`,"telemetry for any signal",E,n,r),this.dropDominatedAntAlias(`${C}ENDPOINT`,E,n,r);if(A.includes("ENDPOINT"))this.dropDominatedBetaTracingEndpoint(E,n,r);this.dropDominatedAntAlias(s,E,n,r)}}resetSettingsIfUserSettingsFileMoved(e){if(Zn("userSettings")!==e)Ro()}applySafeConfigEnvironmentVariables(){this.getPreSettingsEnvSnapshot(),this.providerStripContext=U();let e=Zn("userSettings");if(this.hostSpawnEnvKeys===void 0)this.hostSpawnEnvKeys=this.providerStripContext.hostOrchestrated?new Set(Object.keys(process.env).map((E)=>E.toUpperCase())):null;this.settingsColorEnv={},this.appliedGlobalConfigEnv=this.filterSettingsEnv(le().env,"globalConfig"),Object.assign(process.env,this.appliedGlobalConfigEnv);for(let E of Ee){if(E==="policySettings")continue;if(!tr(E))continue;Object.assign(process.env,this.filterSettingsEnv(ge(E)?.env,E))}KP(),Object.assign(process.env,this.filterSettingsEnv(ge("policySettings")?.env,"policySettings"));let n=new Map;for(let E of Xo()){let o=this.filterSettingsEnv(ge(E)?.env,E);for(let[s,i]of Object.entries(o))n.set(s.toUpperCase(),{key:s,value:i})}for(let{key:E,value:o}of n.values())if(BSt(E,o))process.env[E]=o;Xer(this.settingsColorEnv);let r=process.env[Bv];if(!r||r===this.materializedProcessWrapper){let E=[this.processWrapperKeyFrom("policySettings"),this.processWrapperKeyFrom("flagSettings"),tr("userSettings")?this.processWrapperKeyFrom("userSettings"):void 0].find((o)=>typeof o==="string"&&o!=="");if(E!==void 0)process.env[Bv]=E,this.materializedProcessWrapper=E}this.enforceManagedOtelFamilyDominance(),this.resetSettingsIfUserSettingsFileMoved(e)}applyConfigEnvironmentVariables(){this.getPreSettingsEnvSnapshot(),this.providerStripContext=U(),this.settingsColorEnv={};let e=a.NODE_EXTRA_CA_CERTS,n=a.CLAUDE_CODE_CERT_STORE,r=a.NODE_OPTIONS,E=a.CLAUDE_CODE_CLIENT_CERT,o=a.CLAUDE_CODE_CLIENT_KEY;this.appliedGlobalConfigEnv=this.filterSettingsEnv(le().env,"globalConfig"),Object.assign(process.env,this.appliedGlobalConfigEnv);for(let A of Xo())Object.assign(process.env,this.filterSettingsEnv(ge(A)?.env,A));Xer(this.settingsColorEnv),this.enforceManagedOtelFamilyDominance();let s=a.NODE_EXTRA_CA_CERTS!==e||a.CLAUDE_CODE_CLIENT_CERT!==E||a.CLAUDE_CODE_CLIENT_KEY!==o;if(a.NODE_EXTRA_CA_CERTS!==e||a.CLAUDE_CODE_CERT_STORE!==n||a.NODE_OPTIONS!==r)a7r();let{certPath:i,keyPath:_}=d7r(),S=(a.CLAUDE_CODE_CLIENT_CERT!==i||a.CLAUDE_CODE_CLIENT_KEY!==_)&&(i!==void 0||_!==void 0);if(!S)krr();Fse(),lw(),Promise.all([U0e(),Nse()]).then(([A,O])=>{if(S&&O.readFailed)krr();if(s||S||A||O.changed)Fse(),lw()}).catch(d)}};
return {T,Aht,N,b,g,Tht,V,I,f,U,W,K,w,Y,PXn,k,j,h,X,P,F,x,J,c,u,v,z,q,Q,Z,ee,te,ne,m,Ee,p,C,y,M,H,G,L,re,B,ge,ia,t,xje,xzt,gs,OCn,G9o,Rzt,HCn,YQe,qF,Awe,Bv,SQe,TCn,kCn,z8r,Le,W9o,Ntr,Ptr,z9o,NSt,Zn,Ro,yd,jj,le,tr,KP,Xo,BSt,Xer,a,a7r,d7r,krr,Fse,lw,U0e,Nse,d};
}
export function createManagedEnv287(ports){
const m0=module0({});
const m1=module1({});
const m2=module2({"gs":m1["gs"],"mT":ports["remoteSettings"],"wb":ports["remoteVerified"],"Le":m1["Le"]});
const m3=module3({});
const m4=module4({"Xer":ports["publishColors"]});
const m5=module5({"a":ports["environment"]});
const m6=module6({"Ro":ports["resetSettingsCache"],"tr":ports["sourceEnabled"],"qOe":ports["allowedSources"],"va":ports["settingsStore"]});
const m7=module7({});
const m8=module8({"a":m5["a"],"Jk":ports["policyOrigin"],"Zj":m2["Zj"],"U8":ports["mdm"],"czt":ports["helperArmed"],"mT":m2["mT"],"wb":m2["wb"],"Hm":m6["Hm"],"SI":m7["SI"],"XZe":m7["XZe"],"jWe":m7["jWe"],"iC":m7["iC"],"Zn":ports["settingsPath"]});
const m9=module9({"a":m5["a"]});
const m10=module10({"le":ports["globalConfig"]});
const m11=module11({"KP":ports["remoteEligible"]});
const m12=module12({"a7r":ports["clearCACerts"],"d7r":ports["loadedMTLSPaths"],"krr":ports["clearMTLS"],"Fse":ports["clearProxy"],"lw":ports["configureAgents"],"U0e":ports["loadExtraCACerts"],"Nse":ports["loadMTLS"]});
const m13=module13({"d":ports["logError"]});
const m14=module14({"ge":ports["settingsSource"],"ia":m0["ia"],"t":ports["debug"],"xje":m2["xje"],"xzt":m2["xzt"],"gs":m1["gs"],"OCn":m2["OCn"],"G9o":m2["G9o"],"Rzt":m2["Rzt"],"HCn":m2["HCn"],"YQe":m2["YQe"],"qF":m2["qF"],"Awe":m2["Awe"],"Bv":m3["Bv"],"SQe":m4["SQe"],"TCn":m2["TCn"],"kCn":m2["kCn"],"z8r":m2["z8r"],"Le":m1["Le"],"W9o":m2["W9o"],"Ntr":m8["Ntr"],"Ptr":m8["Ptr"],"z9o":m2["z9o"],"NSt":m2["NSt"],"Zn":m8["Zn"],"Ro":m6["Ro"],"yd":m9["yd"],"jj":m8["jj"],"le":m10["le"],"tr":m6["tr"],"KP":m11["KP"],"Xo":m6["Xo"],"BSt":m2["BSt"],"Xer":m4["Xer"],"a":m5["a"],"a7r":m12["a7r"],"d7r":m12["d7r"],"krr":m12["krr"],"Fse":m12["Fse"],"lw":m12["lw"],"U0e":m12["U0e"],"Nse":m12["Nse"],"d":m13["d"]});
return {Owner:m14.B,providerContext:m14.U,enabledSources:m6.Xo,safeBeforeTrust:m2.BSt};
}

export function createLoadedMTLSPaths287({k}){function d7r(){let e=k();return{certPath:e.clientCert?.path,keyPath:e.clientKey?.path}};return d7r}
