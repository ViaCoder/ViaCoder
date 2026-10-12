// Generated from verified Claude Code 2.1.286 declarations; bodies are original AST source text.
export function createCustomHeaderOverrides286({Ca,a}) {
function Kgt(e){return e.toLowerCase().includes("afk-mode")}
function cM(){return Ca("hipaa")}
function gy(){let e={Authorization:void 0};for(let s of(a.ANTHROPIC_CUSTOM_HEADERS??"").split(`
`)){let r=s.indexOf(":"),n=r>=0?s.slice(0,r).trim():"";if(n.toLowerCase()==="authorization")e[n]=void 0}return e}
function dO(){let e={},s=cM();for(let r of(a.ANTHROPIC_CUSTOM_HEADERS??"").split(`
`)){let n=r.indexOf(":"),i=n>=0?r.slice(0,n).trim():"";if(i.toLowerCase()!=="anthropic-beta")continue;let c=r.slice(n+1).split(",").map((h)=>h.trim()).filter(Boolean),d=c.filter((h)=>!Kgt(h));if(s)e[i]=void 0;else if(d.length!==c.length)e[i]=d.length>0?d.join(","):void 0;else delete e[i]}return e}
return {beta:dO,gatewayAuth:gy};
}

export function createSdkAuthInheritance286() {
var ZT={__auth:{provider:null,tokenCache:null,resolution:null,error:null,extraHeaders:{}}};
return ZT;
}

export function createSdkAuthentication286() {
function Z$o(e){if(e.isSubscriber)return{apiKey:null,authToken:e.oauthAccessToken??null};return{apiKey:e.apiKey,authToken:null}}
return Z$o;
}

export function createSdkSubscriber286({PC}) {
function Imn(e){return e.anthropicAuthEnabled&&Boolean(e.oauthScopes?.includes(PC))}
return Imn;
}

export function createRequestClassification286() {
function as(e){if(e===void 0)return;if(e.startsWith("repl_main_thread")||e==="sdk")return"main";if(e.startsWith("agent:")||e==="hook_agent")return"subagent";return"auxiliary"}
function ZUo(e,n){if(e===void 0)return;if(e==="compact")return"compaction";let r=as(e);if(r==="subagent"&&n.agentType==="subagent"&&n.workflowRunId)return"workflow";return r}
var b_="agent:builtin:";
function eBo(e,n){if(e===void 0||!e.startsWith("agent:"))return;if(n.agentType==="teammate")return"teammate";if(e.startsWith(b_))return e.slice(b_.length)||void 0;if(e.startsWith("agent:custom"))return"custom";return}
function vp(e){return e.agentType==="main"}
return {requestClass:ZUo,agentType:eBo,isMain:vp};
}

export function createOutgoingHeaderValidation286({$ht,P,V7n,z7n}) {
var W9n="x-claude-code-request-class";
var G9n="x-claude-code-agent-type";
var z9n="x-claude-code-prompt-id";
var Nmt="X-Claude-Code-Session-Id";
class tG extends P{header;source;constructor(e,n,r){super(e,"request header value rejected before send: not a valid HTTP header value");this.header=n;this.source=r;this.name="InvalidRequestHeaderValueError"}get isUserSupplied(){return this.source!=="claude-code"}}
var Lx=new Set(["x-app",Nmt,"x-claude-code-agent-id","x-claude-code-parent-agent-id",z9n,W9n,G9n,"x-anthropic-additional-protection"]);
var Ux={"x-client-app":"CLAUDE_AGENT_SDK_CLIENT_APP","x-claude-remote-container-id":"CLAUDE_CODE_CONTAINER_ID","x-claude-remote-session-id":"CLAUDE_CODE_REMOTE_SESSION_ID","User-Agent":"User-Agent environment"};
var Fo={ANTHROPIC_API_KEY:" from ANTHROPIC_API_KEY",apiKeyHelper:" from apiKeyHelper","/login managed key":" from the saved /login API key",ANTHROPIC_AUTH_TOKEN:" from ANTHROPIC_AUTH_TOKEN",CLAUDE_CODE_OAUTH_TOKEN:" from CLAUDE_CODE_OAUTH_TOKEN",CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR:" from the OAuth token file descriptor",CCR_OAUTH_TOKEN_FILE:" from the OAuth token file","claude.ai":" from the saved claude.ai login",ANTHROPIC_CUSTOM_HEADERS:" from ANTHROPIC_CUSTOM_HEADERS",CLAUDE_AGENT_SDK_CLIENT_APP:" from CLAUDE_AGENT_SDK_CLIENT_APP",CLAUDE_CODE_CONTAINER_ID:" from CLAUDE_CODE_CONTAINER_ID",CLAUDE_CODE_REMOTE_SESSION_ID:" from CLAUDE_CODE_REMOTE_SESSION_ID","User-Agent environment":" from CLAUDE_CODE_ENTRYPOINT / CLAUDE_AGENT_SDK_VERSION / CLAUDE_AGENT_SDK_CLIENT_APP",unknown:"","claude-code":""};
function V9n({apiKey:e,getApiKeySource:n,authToken:r,getAuthTokenSource:s,defaultHeaders:g,authorizationSource:h,customHeaderNames:b,envSuppliedHeaderNames:E}){if(e!==null&&od("x-api-key",e)){let w=n();throw new tG(`Invalid X-Api-Key header value${Fo[w]}: ${Ln(e)}.`,"X-Api-Key",w)}for(let[w,k]of Object.entries(g)){if(typeof k!=="string"||!od(w,k))continue;let A=b.indexOf(w),M=`distinct header ${A+1} of ${b.length} parsed from ANTHROPIC_CUSTOM_HEADERS`;if(Bx(w))throw new tG(A===-1?`Invalid request header name: the HTTP runtime does not accept it (${id(w.length)}).`:`Invalid name for ${M}: the HTTP runtime does not accept it (${id(w.length)}).`,"other",A===-1?"claude-code":"ANTHROPIC_CUSTOM_HEADERS");let D=Ux[w];if(D!==void 0&&E.has(w))throw new tG(`Invalid ${w} header value${Fo[D]}: ${Ln(k)}.`,"other",D);let B=w==="Authorization"&&h!==null;if(w.toLowerCase()==="authorization"){let K=B?h:A===-1?"unknown":"ANTHROPIC_CUSTOM_HEADERS",z=B&&k.startsWith("Bearer ")?k.slice(7):k;throw new tG(`Invalid Authorization header value${Fo[K]}: ${Ln(z)}.`,"Authorization",K)}if(A!==-1)throw new tG(`Invalid value for ${M}: ${Ln(k)}.`,w.toLowerCase()==="x-api-key"?"X-Api-Key":"other","ANTHROPIC_CUSTOM_HEADERS");if(D!==void 0)throw new tG(`Invalid ${w} header value${Fo[D]}: ${Ln(k)}.`,"other",D);throw new tG(Lx.has(w)?`Invalid ${w} header value: ${Ln(k)}.`:`Invalid request header value: ${Ln(k)}.`,"other","claude-code")}if(r!==null&&od("authorization",`Bearer ${r}`)){let w=s();throw new tG(`Invalid Authorization header value${Fo[w]}: ${Ln(r)}.`,"Authorization",w)}}
function od(e,n){try{return new Headers([[e,n]]),!1}catch{return!0}}
function Bx(e){try{return new Headers([[e,"x"]]),!1}catch{return!0}}
function Ln(e){let n=$ht(e),r=z7n(e);return n===null?`it contains a character the HTTP runtime does not accept (${id(r.length)})`:V7n(n,r)}
function id(e){return e===1?"1 character":`${e} characters`}
return V9n;
}

export function createHeaderValidationText286() {
function $ht(e){let n=0,s=e.length;while(n<s&&Qs(e.charCodeAt(n)))n++;while(s>n&&Qs(e.charCodeAt(s-1)))s--;let r=er(e.slice(n,s));if(r!==-1)return{kind:"line_break",index:Ze(e,n+r)};for(let i=n;i<s;i++){let d=e.charCodeAt(i);if(d===0)return{kind:"nul",index:Ze(e,i)};if(d>255)return{kind:"non_ascii",index:Ze(e,i),codePoint:tr(e,i)}}return null}
function z7n(e){let n=1;for(let s=0;s<e.length;s++){let r=e.charCodeAt(s);if(r===10)n++;else if(r===13){if(n++,e.charCodeAt(s+1)===10)s++}}return{length:nr(e),lineCount:n}}
function V7n(e,{length:n,lineCount:s}){let r=n===1?"1 character":`${n} characters`,i=s>1?`${r} on ${s} lines`:r;switch(e.kind){case"line_break":return`it contains a line break at character ${e.index+1} (${i})`;case"nul":return`it contains a NUL byte at character ${e.index+1} (${i})`;case"control_character":return`it contains a control character at character ${e.index+1} (${i})`;case"whitespace":return`it contains whitespace at character ${e.index+1} (${i})`;case"non_ascii":return`it contains ${Cc(e.codePoint)??"a non-ASCII character"} at character ${e.index+1} (${i})`;case"too_long":return`it is ${e.length} characters long (limit ${e.maxLength})`}}
function Cc(e){switch(e){case 65279:return"a byte-order mark (U+FEFF)";case 8203:case 8204:case 8205:case 8288:return`a zero-width character (${Nt(e)})`;case 160:case 8239:return`a no-break space (${Nt(e)})`;case 8216:case 8217:case 8220:case 8221:return`a typographic quote (${Nt(e)})`;case 8211:case 8212:return`a typographic dash (${Nt(e)})`;case 8230:return"an ellipsis character (U+2026)";case 8232:case 8233:return`a line or paragraph separator (${Nt(e)})`;case 65533:return"a replacement character (U+FFFD)";default:return e>=55296&&e<=57343?"an unpaired UTF-16 surrogate":null}}
function Nt(e){return`U+${e.toString(16).toUpperCase().padStart(4,"0")}`}
function er(e){let n=e.indexOf(`
`),s=e.indexOf("\r");if(n===-1)return s;return s===-1?n:Math.min(n,s)}
function Qs(e){return e===9||e===32||e===10||e===13}
function tr(e,n){return e.codePointAt(n)??e.charCodeAt(n)}
function Ze(e,n){let s=0;for(let r=0;r<n;r++){let i=e.charCodeAt(r);if(i>=55296&&i<=56319&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320)r++;s++}return s}
function nr(e){return Ze(e,e.length)}
return {$ht,V7n,z7n};
}

export function createHeaderValidationErrorBase286() {
class P extends Error{telemetryMessage;errorClass;constructor(n,e,t){super(n);this.name="TelemetrySafeError",this.telemetryMessage=e??n,this.errorClass=t}}
return P;
}

export function createRequestHintGate286({He,Ia,R,a}) {
function Wsn(){let e=a.CLAUDE_CODE_GATEWAY_HINT_HEADERS;if(e!==void 0)return e;if(Ia())return!0;if(He()!=="firstParty")return!1;return R("tengu_splendid_sutton",!1)}
return Wsn;
}

export function createMessageHeaders286({cM,iEn,t}) {
function mlt(){let e={},r=(process.env.ANTHROPIC_CUSTOM_HEADERS??"").split(/\n|\r\n/);for(let h of r){if(!h.trim())continue;let g=h.indexOf(":");if(g===-1)continue;let b=h.slice(0,g).trim(),w=h.slice(g+1).trim();if(b.toLowerCase()==="anthropic-beta"&&cM()){t("ANTHROPIC_CUSTOM_HEADERS anthropic-beta ignored: experimental betas are disabled by your organization's policy",{level:"debug"});continue}if(b)e[b]=w}let s=iEn();if(s&&!Object.keys(e).some((h)=>/^anthropic-client-(platform|version)$/i.test(h)))e["anthropic-client-platform"]="desktop_app",e["anthropic-client-version"]=s;return e}
return mlt;
}

export function createCompliancePolicy286({Ca}) {
function cM(){return Ca("hipaa")}
return cM;
}

export function createAgentHeaderEncoding286() {
function IXn(e){return e.replace(/%|[^\x20-\x7e]/gu,(n)=>encodeURIComponent(n))}
return IXn;
}

export function createPromptIdValidator286() {
var d=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function Xt(t){if(typeof t!=="string")return null;return d.test(t)?t:null}
return Xt;
}

export function createDesktopVersion286({a}) {
function iEn(){let e=a.CLAUDE_CODE_ENTRYPOINT;return e==="claude-desktop"||e==="local-agent"?a.CLAUDE_CODE_DESKTOP_APP_VERSION:void 0}
return iEn;
}
