// Official npm 2.1.286 complete declarations, no body rewriting.
export function createApiKeyHelper({BS,Bn,Io,J,QS,a,fe,ge,i,ih,j,ns,s8,t,xC,y2}){
class q{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
class P extends Error{telemetryMessage;errorClass;constructor(n,e,t){super(n);this.name="TelemetrySafeError",this.telemetryMessage=e??n,this.errorClass=t}}
function x(t){let e=[];for(let r=0;r<t.length;r+=8192){let i=Math.min(r+8192,t.length),o=new Uint16Array(i-r);for(let u=r;u<i;u++)o[u-r]=t.charCodeAt(u);e.push(String.fromCharCode(...o))}return e.join("")}
function f(t){if(typeof Buffer<"u")return Buffer.from(t,"utf16le").toString("utf16le");return x(t)}
function re(t,n){if(n<=0)return"";if(t.length<=n)return t;let e=t.slice(0,n),r=e.charCodeAt(n-1);return f(r>=55296&&r<=56319?e.slice(0,-1):e)}
function T1(r){let s=(r.startsWith("sk-ant-si-")?r.slice(10):r).split(".");if(s.length!==3||!s[1])return null;try{return J(Buffer.from(s[1],"base64url").toString("utf8"))}catch{return null}}
function cO(r){let n=T1(r);if(n!==null&&typeof n==="object"&&"exp"in n&&typeof n.exp==="number")return n.exp;return null}
function er(e){let n=e.indexOf(`
`),s=e.indexOf("\r");if(n===-1)return s;return s===-1?n:Math.min(n,s)}
function Ze(e,n){let s=0;for(let r=0;r<n;r++){let i=e.charCodeAt(r);if(i>=55296&&i<=56319&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320)r++;s++}return s}
function tr(e,n){return e.codePointAt(n)??e.charCodeAt(n)}
function nr(e){return Ze(e,e.length)}
function Nt(e){return`U+${e.toString(16).toUpperCase().padStart(4,"0")}`}
function Cc(e){switch(e){case 65279:return"a byte-order mark (U+FEFF)";case 8203:case 8204:case 8205:case 8288:return`a zero-width character (${Nt(e)})`;case 160:case 8239:return`a no-break space (${Nt(e)})`;case 8216:case 8217:case 8220:case 8221:return`a typographic quote (${Nt(e)})`;case 8211:case 8212:return`a typographic dash (${Nt(e)})`;case 8230:return"an ellipsis character (U+2026)";case 8232:case 8233:return`a line or paragraph separator (${Nt(e)})`;case 65533:return"a replacement character (U+FFFD)";default:return e>=55296&&e<=57343?"an unpaired UTF-16 surrogate":null}}
function gzo(e,{maxLength:n}){let s=er(e);if(s!==-1)return{kind:"line_break",index:Ze(e,s)};for(let i=0;i<e.length;i++){let d=e.charCodeAt(i);if(d===0)return{kind:"nul",index:Ze(e,i)};if(d===32||d===9)return{kind:"whitespace",index:Ze(e,i)};if(d<32||d===127)return{kind:"control_character",index:Ze(e,i),codePoint:d};if(d>126)return{kind:"non_ascii",index:Ze(e,i),codePoint:tr(e,i)}}let r=nr(e);if(r>n)return{kind:"too_long",length:r,maxLength:n};return null}
function z7n(e){let n=1;for(let s=0;s<e.length;s++){let r=e.charCodeAt(s);if(r===10)n++;else if(r===13){if(n++,e.charCodeAt(s+1)===10)s++}}return{length:nr(e),lineCount:n}}
function V7n(e,{length:n,lineCount:s}){let r=n===1?"1 character":`${n} characters`,i=s>1?`${r} on ${s} lines`:r;switch(e.kind){case"line_break":return`it contains a line break at character ${e.index+1} (${i})`;case"nul":return`it contains a NUL byte at character ${e.index+1} (${i})`;case"control_character":return`it contains a control character at character ${e.index+1} (${i})`;case"whitespace":return`it contains whitespace at character ${e.index+1} (${i})`;case"non_ascii":return`it contains ${Cc(e.codePoint)??"a non-ASCII character"} at character ${e.index+1} (${i})`;case"too_long":return`it is ${e.length} characters long (limit ${e.maxLength})`}}
var r=new Set(["claude-desktop","claude-desktop-3p","local-agent"]);
function Yc(){let e=a.CLAUDE_CODE_ENTRYPOINT;return e!==void 0&&r.has(e)}
var mH=300000;
var hk=30000;
var hH=16384;
function fr(){return a.CLAUDE_CODE_REMOTE||Yc()}
function gE(){return QS()?void 0:a.ANTHROPIC_AUTH_TOKEN}
function wp(e={}){try{return BS(e)}catch{return{key:null,source:"none"}}}
function hre(){return!fr()&&wp({skipRetrievingKeyFromApiKeyHelper:!0}).source==="apiKeyHelper"}
function Ek(){let e=ih();if(!e)return!1;let n=ge("projectSettings"),r=ge("localSettings");return n?.apiKeyHelper===e||r?.apiKeyHelper===e}
function OYo(){let e=a.CLAUDE_CODE_API_KEY_HELPER_TTL_MS;if(e!==void 0){if(e>=0)return e;t(`Found CLAUDE_CODE_API_KEY_HELPER_TTL_MS env var, but it was not a valid number. Got ${e}`,{level:"error"})}return mH}
var GUt=new q(()=>({cache:null,inflight:null,epoch:0,lastFailure:null}));
function C8n(){let e=GUt.of(j().host).inflight?.startedAt;return e?Date.now()-e:0}
function a2o(){let e=GUt.of(j().host).inflight;return e?.startedAt?e.promise:null}
function CH(e){let n=cO(e.value);if(n===null)return!0;let r=n*1000-hk;if(e.timestamp>=r)return!0;return Date.now()<r}
function TH(e){let n=cO(e);return n===null||Date.now()<n*1000-hk}
async function oUe(e){if(!ih())return null;let n=OYo(),r=GUt.of(j().host),s=()=>(r.inflight={promise:tk(r,e,!0,r.epoch),startedAt:Date.now()},r.inflight.promise);if(r.cache){if(!CH(r.cache)&&Bn()&&hre()&&!gE()){if(r.inflight){if(!r.inflight.startedAt)r.inflight.startedAt=Date.now();let g=await r.inflight.promise;if(g===null||TH(g))return g;if(r.inflight)return r.inflight.promise;return s()}return s()}if(Date.now()-r.cache.timestamp<n)return r.cache.value;if(!r.inflight)r.inflight={promise:tk(r,e,!1,r.epoch),startedAt:null};return r.cache.value}if(r.inflight)return r.inflight.promise;return s()}
async function tk(e,n,r,s){try{let g=await RH(n);if(s!==e.epoch)return g;if(g!==null)e.cache={value:g,timestamp:Date.now()},e.lastFailure=null;return g}catch(g){if(s!==e.epoch)return" ";let h=g instanceof Error?g.message:String(g);if(console.error(fe.red(`apiKeyHelper failed: ${h}`)),t(`Error getting API key from apiKeyHelper: ${h}`,{level:"error"}),!r&&e.cache&&e.cache.value!==" ")return e.cache={...e.cache,timestamp:Date.now()},e.cache.value;if(e.lastFailure=h,hre()){let b=y2.getInstance();b.startAuthentication(),b.setError(`apiKeyHelper failed: ${h}`),b.endAuthentication(!1)}return e.cache={value:" ",timestamp:Date.now()}," "}finally{if(s===e.epoch)e.inflight=null}}
async function RH(e){let n=ih();if(!n)return null;if(Ek()){if(!ns()&&!e){let E=Error(`Security: apiKeyHelper executed before workspace trust is confirmed. If you see this message, post in ${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.286",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-09-30T15:45:16Z",GIT_SHA:"f344a08993bbba4fc1ea9b295245324610f02c58",HOOKS_WORKER_URL:"/$bunfs/root/src/plugins/functionHooks/hooks-worker/hooks-worker.js",DD_SOURCEMAP_GROUP:"darwin"}.FEEDBACK_CHANNEL}.`);return s8("apiKeyHelper invoked before trust check",E),i("tengu_apiKeyHelper_missing_trust11",{}),null}}let r=Io(),s=await xC(n,{...r!==null&&{cwd:r},timeout:600000,reject:!1,useToolMemoryCgroup:!1});if(s.failed){let b=s.timedOut?"timed out":`exited ${s.exitCode}`,E=s.stderr&&re(s.stderr.trim(),500);throw Error(E?`${b}: ${E}`:b)}let g=s.stdout?.trim();if(!g)throw Error("did not return a value");let h=gzo(g,{maxLength:hH});if(h){let b=V7n(h,z7n(g));throw new P(`returned output that cannot be used as an API key: ${b}. The script must print only the key to stdout.`,"apiKeyHelper output rejected: not a printable-ASCII token")}return g}
function A8n(){return GUt.of(j().host).cache?.value??null}
function CYe(){if(!ih())return null;return GUt.of(j().host).lastFailure}
function AYe(){let e=GUt.of(j().host);e.epoch++,e.cache=null,e.inflight=null}
function sWr(){return!(Ek()&&!ns())}
return {fetch:oUe,cached:A8n,lastFailure:CYe,clear:AYe,elapsed:C8n,pending:a2o,canPrefetch:sWr,ttl:OYo,validate:gzo,describe:V7n,stats:z7n,state:host=>GUt.of(host)};
}
export function createHelperIntegerParser(){
var N=/^[+-]?(\d+(\.\d*)?|\.\d+)[eE][+-]?\d+$/;
var E=/^[+-]?\d{1,3}([_,\u00A0\u202F ])\d{3}(?:\1\d{3})*$/;
var c=/[_,\u00A0\u202F ]/g;
function m(e){if(e.length<=32){if(N.test(e)){let n=Number(e);return Number.isInteger(n)?n:NaN}if(E.test(e))return parseInt(e.replace(c,""),10)}return}
function rc(e){let n=String(e).trim();return m(n)??parseInt(n,10)}
function u(n){return n===void 0?void 0:String(n)}
function i(n){return{parse:(e)=>n(u(e))}}
function d(n){return i((e)=>{if(e===void 0)return;if(n?.digitsOnly&&!/^[+-]?\d+$/.test(e.trim()))return;let r=rc(e);if(!Number.isFinite(r))return;if(n?.min!==void 0&&r<n.min)return;if(n?.max!==void 0&&r>n.max)return;return r})}
return d();
}
