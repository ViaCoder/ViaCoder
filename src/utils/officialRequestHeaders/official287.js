// Generated from verified Claude Code 2.1.287 declarations; original complete source bodies.
export function createMessageBareSourceGate287() {
function Cb(){return!1}
return Cb;
}

export function createMessageApiKeySource287({mb}) {
function Gp(e={}){try{return mb(e)}catch{return{key:null,source:"none"}}}
return Gp;
}

export function createMessageBearer287({Cb,Gp,a,a2e,xr}) {
async function d9(e,n){let r=xr()&&Gp({skipRetrievingKeyFromApiKeyHelper:!0}).source==="none",h=Cb()&&!r?void 0:a.ANTHROPIC_AUTH_TOKEN,g=h||await a2e(n);if(g)return e.Authorization=`Bearer ${g}`,h?"ANTHROPIC_AUTH_TOKEN":"apiKeyHelper";return null}
return d9;
}

export function createOAuthHeldAccountReader287({fn,gi}) {
function l2e(){let e=fn()?.refreshToken;if(!e)return null;let n=gi.get(e);return n===void 0?null:{url:n}}
return l2e;
}

export function createOAuthHeldAccountError287() {
class ose extends Error{url;constructor(e){super("OAuth account is on hold");this.url=e;this.name="OAuthAccountOnHoldError"}}
return ose;
}

export function createOAuthLockTimeoutError287() {
class H5e extends Error{constructor(){super("OAuth access token could not be refreshed: another Claude Code process is holding the refresh lock");this.name="OAuthRefreshLockTimeoutError"}}
return H5e;
}

export function createSdkAuthInheritance287() {
var zk={__auth:{provider:null,tokenCache:null,resolution:null,error:null,extraHeaders:{}}};
return zk;
}

export function createSdkAuthentication287() {
function _Go(e){if(e.isSubscriber)return{apiKey:null,authToken:e.oauthAccessToken??null};return{apiKey:e.apiKey,authToken:null}}
return _Go;
}

export function createSdkSubscriber287({fA}) {
function Z_n(e){return e.anthropicAuthEnabled&&Boolean(e.oauthScopes?.includes(fA))}
return Z_n;
}

export function createRequestClassification287() {
function Ss(e){if(e===void 0)return;if(e.startsWith("repl_main_thread")||e==="sdk")return"main";if(e.startsWith("agent:")||e==="hook_agent")return"subagent";return"auxiliary"}
function vVo(e,n){if(e===void 0)return;if(e==="compact")return"compaction";let r=Ss(e);if(r==="subagent"&&n.agentType==="subagent"&&n.workflowRunId)return"workflow";return r}
var p_="agent:builtin:";
function CVo(e,n){if(e===void 0||!e.startsWith("agent:"))return;if(n.agentType==="teammate")return"teammate";if(e.startsWith(p_))return e.slice(p_.length)||void 0;if(e.startsWith("agent:custom"))return"custom";return}
function Rp(e){return e.agentType==="main"}
return {requestClass:vVo,agentType:CVo,isMain:Rp};
}

export function createOutgoingHeaderValidation287({LSt,P,onr,rnr}) {
var eQn="x-claude-code-request-class";
var tQn="x-claude-code-agent-type";
var nQn="x-claude-code-prompt-id";
var jyt="X-Claude-Code-Session-Id";
class KG extends P{header;source;constructor(e,n,r){super(e,"request header value rejected before send: not a valid HTTP header value");this.header=n;this.source=r;this.name="InvalidRequestHeaderValueError"}get isUserSupplied(){return this.source!=="claude-code"}}
var bx=new Set(["x-app",jyt,"x-claude-code-agent-id","x-claude-code-parent-agent-id",nQn,eQn,tQn,"x-anthropic-additional-protection"]);
var vx={"x-client-app":"CLAUDE_AGENT_SDK_CLIENT_APP","x-claude-remote-container-id":"CLAUDE_CODE_CONTAINER_ID","x-claude-remote-session-id":"CLAUDE_CODE_REMOTE_SESSION_ID","User-Agent":"User-Agent environment"};
var Fo={ANTHROPIC_API_KEY:" from ANTHROPIC_API_KEY",apiKeyHelper:" from apiKeyHelper","/login managed key":" from the saved /login API key",ANTHROPIC_AUTH_TOKEN:" from ANTHROPIC_AUTH_TOKEN",CLAUDE_CODE_OAUTH_TOKEN:" from CLAUDE_CODE_OAUTH_TOKEN",CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR:" from the OAuth token file descriptor",CCR_OAUTH_TOKEN_FILE:" from the OAuth token file","claude.ai":" from the saved claude.ai login",ANTHROPIC_CUSTOM_HEADERS:" from ANTHROPIC_CUSTOM_HEADERS",CLAUDE_AGENT_SDK_CLIENT_APP:" from CLAUDE_AGENT_SDK_CLIENT_APP",CLAUDE_CODE_CONTAINER_ID:" from CLAUDE_CODE_CONTAINER_ID",CLAUDE_CODE_REMOTE_SESSION_ID:" from CLAUDE_CODE_REMOTE_SESSION_ID","User-Agent environment":" from CLAUDE_CODE_ENTRYPOINT / CLAUDE_AGENT_SDK_VERSION / CLAUDE_AGENT_SDK_CLIENT_APP",unknown:"","claude-code":""};
function rQn({apiKey:e,getApiKeySource:n,authToken:r,getAuthTokenSource:s,defaultHeaders:g,authorizationSource:h,customHeaderNames:b,envSuppliedHeaderNames:v}){if(e!==null&&id("x-api-key",e)){let w=n();throw new KG(`Invalid X-Api-Key header value${Fo[w]}: ${Un(e)}.`,"X-Api-Key",w)}for(let[w,A]of Object.entries(g)){if(typeof A!=="string"||!id(w,A))continue;let R=b.indexOf(w),M=`distinct header ${R+1} of ${b.length} parsed from ANTHROPIC_CUSTOM_HEADERS`;if(Sx(w))throw new KG(R===-1?`Invalid request header name: the HTTP runtime does not accept it (${sd(w.length)}).`:`Invalid name for ${M}: the HTTP runtime does not accept it (${sd(w.length)}).`,"other",R===-1?"claude-code":"ANTHROPIC_CUSTOM_HEADERS");let D=vx[w];if(D!==void 0&&v.has(w))throw new KG(`Invalid ${w} header value${Fo[D]}: ${Un(A)}.`,"other",D);let K=w==="Authorization"&&h!==null;if(w.toLowerCase()==="authorization"){let G=K?h:R===-1?"unknown":"ANTHROPIC_CUSTOM_HEADERS",z=K&&A.startsWith("Bearer ")?A.slice(7):A;throw new KG(`Invalid Authorization header value${Fo[G]}: ${Un(z)}.`,"Authorization",G)}if(R!==-1)throw new KG(`Invalid value for ${M}: ${Un(A)}.`,w.toLowerCase()==="x-api-key"?"X-Api-Key":"other","ANTHROPIC_CUSTOM_HEADERS");if(D!==void 0)throw new KG(`Invalid ${w} header value${Fo[D]}: ${Un(A)}.`,"other",D);throw new KG(bx.has(w)?`Invalid ${w} header value: ${Un(A)}.`:`Invalid request header value: ${Un(A)}.`,"other","claude-code")}if(r!==null&&id("authorization",`Bearer ${r}`)){let w=s();throw new KG(`Invalid Authorization header value${Fo[w]}: ${Un(r)}.`,"Authorization",w)}}
function id(e,n){try{return new Headers([[e,n]]),!1}catch{return!0}}
function Sx(e){try{return new Headers([[e,"x"]]),!1}catch{return!0}}
function Un(e){let n=LSt(e),r=rnr(e);return n===null?`it contains a character the HTTP runtime does not accept (${sd(r.length)})`:onr(n,r)}
function sd(e){return e===1?"1 character":`${e} characters`}
return rQn;
}

export function createHeaderValidationText287() {
function LSt(e){let n=0,s=e.length;while(n<s&&tr(e.charCodeAt(n)))n++;while(s>n&&tr(e.charCodeAt(s-1)))s--;let r=or(e.slice(n,s));if(r!==-1)return{kind:"line_break",index:Ze(e,n+r)};for(let i=n;i<s;i++){let d=e.charCodeAt(i);if(d===0)return{kind:"nul",index:Ze(e,i)};if(d>255)return{kind:"non_ascii",index:Ze(e,i),codePoint:sr(e,i)}}return null}
function rnr(e){let n=1;for(let s=0;s<e.length;s++){let r=e.charCodeAt(s);if(r===10)n++;else if(r===13){if(n++,e.charCodeAt(s+1)===10)s++}}return{length:rr(e),lineCount:n}}
function onr(e,{length:n,lineCount:s}){let r=n===1?"1 character":`${n} characters`,i=s>1?`${r} on ${s} lines`:r;switch(e.kind){case"line_break":return`it contains a line break at character ${e.index+1} (${i})`;case"nul":return`it contains a NUL byte at character ${e.index+1} (${i})`;case"control_character":return`it contains a control character at character ${e.index+1} (${i})`;case"whitespace":return`it contains whitespace at character ${e.index+1} (${i})`;case"non_ascii":return`it contains ${Kc(e.codePoint)??"a non-ASCII character"} at character ${e.index+1} (${i})`;case"too_long":return`it is ${e.length} characters long (limit ${e.maxLength})`}}
function Kc(e){switch(e){case 65279:return"a byte-order mark (U+FEFF)";case 8203:case 8204:case 8205:case 8288:return`a zero-width character (${Ut(e)})`;case 160:case 8239:return`a no-break space (${Ut(e)})`;case 8216:case 8217:case 8220:case 8221:return`a typographic quote (${Ut(e)})`;case 8211:case 8212:return`a typographic dash (${Ut(e)})`;case 8230:return"an ellipsis character (U+2026)";case 8232:case 8233:return`a line or paragraph separator (${Ut(e)})`;case 65533:return"a replacement character (U+FFFD)";default:return e>=55296&&e<=57343?"an unpaired UTF-16 surrogate":null}}
function Ut(e){return`U+${e.toString(16).toUpperCase().padStart(4,"0")}`}
function or(e){let n=e.indexOf(`
`),s=e.indexOf("\r");if(n===-1)return s;return s===-1?n:Math.min(n,s)}
function tr(e){return e===9||e===32||e===10||e===13}
function sr(e,n){return e.codePointAt(n)??e.charCodeAt(n)}
function Ze(e,n){let s=0;for(let r=0;r<n;r++){let i=e.charCodeAt(r);if(i>=55296&&i<=56319&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320)r++;s++}return s}
function rr(e){return Ze(e,e.length)}
return {LSt,onr,rnr};
}

export function createHeaderValidationErrorBase287() {
class P extends Error{telemetryMessage;errorClass;constructor(n,e,t){super(n);this.name="TelemetrySafeError",this.telemetryMessage=e??n,this.errorClass=t}}
return P;
}

export function createRequestHintGate287({He,a,ja,k}) {
function rdn(){let e=a.CLAUDE_CODE_GATEWAY_HINT_HEADERS;if(e!==void 0)return e;if(ja())return!0;if(He()!=="firstParty")return!1;return k("tengu_splendid_sutton",!1)}
return rdn;
}

export function createAgentHeaderEncoding287() {
function Uer(e){return e.replace(/%|[^\x20-\x7e]/gu,(n)=>encodeURIComponent(n))}
return Uer;
}

export function createPromptIdValidator287() {
var d=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function tn(t){if(typeof t!=="string")return null;return d.test(t)?t:null}
return tn;
}

export function createOAuthConstructorGuard287({l2e,ose,H5e,k}) {
return function guardfactory(ke,he,be) {
if(ke){let ze=l2e();if(ze)throw new ose(ze.url);if(he==="lock_timeout"&&be?.expiresAt!=null&&Date.now()>=be.expiresAt&&k("tengu_sharded_beacon",!0))throw new H5e}
};
}
