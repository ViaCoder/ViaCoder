function module0(imports){
const n=imports["n"];
function nto(){let e=n().host.credentialSlots.gatewayAuth();return!!e&&e.expiresAt<=Date.now()};
function M3t(){return n().host.credentialSlots.gatewayServerProcess()};
return {nto,M3t};
}
function module1(imports){

class P extends Error{telemetryMessage;errorClass;constructor(n,e,t){super(n);this.name="TelemetrySafeError",this.telemetryMessage=e??n,this.errorClass=t}};
return {P};
}
function module2(imports){
const a=imports["a"];
const P=imports["P"];
var kyt="Cloud gateway session expired \u2014 run /login to reconnect.";
function Jl(){return a.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST};
class cwn extends P{};
function kWt(e,n="The app may have quit or its credential file is stale \u2014 restart the desktop app."){return new cwn(`${e} credentials are managed by the desktop app, but none are available. ${n}`,"host-managed provider credentials unavailable \u2014 restart desktop app")};
return {kyt,Jl,cwn,kWt};
}
function module3(imports){
const a=imports["a"];
function D2e(e=a.ANTHROPIC_CUSTOM_HEADERS??""){let s=[];for(let r of e.split(/\r?\n/)){let n=r.indexOf(":"),i=n===-1?"":r.slice(0,n).trim();if(i)s.push([i,r.slice(n+1).trim()])}return s};
function My(){let e={Authorization:void 0};for(let[s]of D2e())if(s.toLowerCase()==="authorization")e[s]=void 0;return e};
return {D2e,My};
}
function module4(imports){
const He=imports["He"];
const uo=imports["uo"];
const M3t=imports["M3t"];
const Jl=imports["Jl"];
const kWt=imports["kWt"];
const vj=imports["vj"];
const nto=imports["nto"];
const TWt=imports["TWt"];
const kyt=imports["kyt"];
const ide=imports["ide"];
const My=imports["My"];
const Lz=imports["Lz"];
const a=imports["a"];
const ja=imports["ja"];
const k=imports["k"];
function rdn(){let e=a.CLAUDE_CODE_GATEWAY_HINT_HEADERS;if(e!==void 0)return e;if(ja())return!0;if(He()!=="firstParty")return!1;return k("tengu_splendid_sutton",!1)};
class hut extends Error{reason;constructor(e,n){super(e);this.reason=n}};
function as(){return{error:(e,...n)=>console.error("[Anthropic SDK ERROR]",e,...n),warn:(e,...n)=>console.error("[Anthropic SDK WARN]",e,...n),info:(e,...n)=>console.error("[Anthropic SDK INFO]",e,...n),debug:(e,...n)=>console.error("[Anthropic SDK DEBUG]",e,...n)}};
function Io(e){let n={},r;for(let[s,h]of Object.entries(e))if(s.toLowerCase()==="authorization")r=h;else n[s]=h;return{value:r,rest:n}};
function preflight(){if(He()==="gateway"&&!uo()&&!M3t()){if(Jl())throw kWt("Cloud gateway");throw new hut("Not signed in to the Cloud gateway \u2014 run /login.","signin_required")}}
async function construct(args){const We="gateway",$e=args;if(We==="gateway"){await vj();let ze=uo();if(!ze||nto()&&!TWt())throw ze?.unpinned?new hut("Cloud gateway token expired \u2014 refresh ANTHROPIC_AUTH_TOKEN and restart.","token_expired"):new hut(kyt,"session_expired");let{rest:Ve}=Io($e.defaultHeaders);return new ide({...$e,defaultHeaders:{...Ve,...My(),Authorization:`Bearer ${ze.jwt}`},apiKey:null,baseURL:ze.url,authToken:ze.jwt,...Lz()&&{logger:as()}})}}
return {rdn,hut,as,Io,preflight,construct};
}
export function createGatewayMessages287(ports){
const m0=module0({"n":ports["execution"]});
const m1=module1({});
const m2=module2({"a":ports["environment"],"P":m1["P"]});
const m3=module3({"a":ports["environment"]});
const m4=module4({"He":ports["provider"],"uo":ports["gatewayAuth"],"M3t":m0["M3t"],"Jl":m2["Jl"],"kWt":m2["kWt"],"vj":ports["refreshGateway"],"nto":m0["nto"],"TWt":ports["gatewayFromEnvironment"],"kyt":m2["kyt"],"ide":ports["sdkConstructor"],"My":m3["My"],"Lz":ports["debugEnabled"],"a":ports["environment"],"ja":ports["firstPartyRequest"],"k":ports["featureValue"]});
return {authorizationPartition:m4["Io"],gatewayHeaders:m3["My"],expired:m0["nto"],hostManagedError:m2["kWt"],hintGate:m4["rdn"],preflight:m4["preflight"],construct:m4["construct"]};
}
