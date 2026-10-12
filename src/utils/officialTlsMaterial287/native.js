function module0(imports){

class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}};
return {V};
}
function module1(imports){

var qt=typeof global=="object"&&global&&global.Object===Object&&global;
var Tir=qt;
var Qt=typeof self=="object"&&self&&self.Object===Object&&self;
var te=Tir||Qt||Function("return this")();
var IL=te;
var ne=IL.Symbol;
var nB=ne;
var st=Object.prototype;
var {hasOwnProperty:re,toString:oe}=st;
var E=nB?nB.toStringTag:void 0;
function ie(t){var e=re.call(t,E),n=t[E];try{t[E]=void 0;var r=!0}catch(i){}var o=oe.call(t);if(r)if(e)t[E]=n;else delete t[E];return o};
var at=ie;
var se=Object.prototype;
var ae=se.toString;
function ue(t){return ae.call(t)};
var ut=ue;
var le="[object Null]";
var ce="[object Undefined]";
var lt=nB?nB.toStringTag:void 0;
function fe(t){if(t==null)return t===void 0?ce:le;return lt&&lt in Object(t)?at(t):ut(t)};
var mee=fe;
function pe(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")};
var iv=pe;
var de="[object AsyncFunction]";
var ge="[object Function]";
var he="[object GeneratorFunction]";
var me="[object Proxy]";
function xe(t){if(!iv(t))return!1;var e=mee(t);return e==ge||e==he||e==de||e==me};
var tEt=xe;
var we=IL["__core-js_shared__"];
var M=we;
var ft=function(){var t=/[^.]+$/.exec(M&&M.keys&&M.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();
function be(t){return!!ft&&ft in t};
var pt=be;
var _e=Function.prototype;
var Se=_e.toString;
function ye(t){if(t!=null){try{return Se.call(t)}catch(e){}try{return t+""}catch(e){}}return""};
var R6e=ye;
var Te=/[\\^$.*+?()[\]{}|]/g;
var ve=/^\[object .+?Constructor\]$/;
var Ae=Function.prototype;
var Oe=Object.prototype;
var Ce=Ae.toString;
var Ee=Oe.hasOwnProperty;
var Ne=RegExp("^"+Ce.call(Ee).replace(Te,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");
function Pe(t){if(!iv(t)||pt(t))return!1;var e=tEt(t)?Ne:ve;return e.test(R6e(t))};
var dt=Pe;
function Re(t,e){return t==null?void 0:t[e]};
var gt=Re;
function De(t,e){var n=gt(t,e);return dt(n)?n:void 0};
var gee=De;
var Le=gee(Object,"create");
var m=Le;
function Me(){this.__data__=m?m(null):{},this.size=0};
var ht=Me;
function Ie(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e};
var mt=Ie;
var ke="__lodash_hash_undefined__";
var $e=Object.prototype;
var je=$e.hasOwnProperty;
function We(t){var e=this.__data__;if(m){var n=e[t];return n===ke?void 0:n}return je.call(e,t)?e[t]:void 0};
var xt=We;
var He=Object.prototype;
var Ue=He.hasOwnProperty;
function Fe(t){var e=this.__data__;return m?e[t]!==void 0:Ue.call(e,t)};
var wt=Fe;
var ze="__lodash_hash_undefined__";
function Be(t,e){var n=this.__data__;return this.size+=this.has(t)?0:1,n[t]=m&&e===void 0?ze:e,this};
var bt=Be;
function T(t){var e=-1,n=t==null?0:t.length;this.clear();while(++e<n){var r=t[e];this.set(r[0],r[1])}};
T.prototype.clear=ht;
T.prototype.delete=mt;
T.prototype.get=xt;
T.prototype.has=wt;
T.prototype.set=bt;
var G=T;
function Ge(){this.__data__=[],this.size=0};
var _t=Ge;
function Ve(t,e){return t===e||t!==t&&e!==e};
var eme=Ve;
function Je(t,e){var n=t.length;while(n--)if(eme(t[n][0],e))return n;return-1};
var b=Je;
var Ke=Array.prototype;
var Ye=Ke.splice;
function Ze(t){var e=this.__data__,n=b(e,t);if(n<0)return!1;var r=e.length-1;if(n==r)e.pop();else Ye.call(e,n,1);return--this.size,!0};
var St=Ze;
function Xe(t){var e=this.__data__,n=b(e,t);return n<0?void 0:e[n][1]};
var yt=Xe;
function qe(t){return b(this.__data__,t)>-1};
var Tt=qe;
function Qe(t,e){var n=this.__data__,r=b(n,t);if(r<0)++this.size,n.push([t,e]);else n[r][1]=e;return this};
var vt=Qe;
function v(t){var e=-1,n=t==null?0:t.length;this.clear();while(++e<n){var r=t[e];this.set(r[0],r[1])}};
v.prototype.clear=_t;
v.prototype.delete=St;
v.prototype.get=yt;
v.prototype.has=Tt;
v.prototype.set=vt;
var Wet=v;
var tn=gee(IL,"Map");
var Get=tn;
function en(){this.size=0,this.__data__={hash:new G,map:new(Get||Wet),string:new G}};
var At=en;
function nn(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null};
var Ot=nn;
function rn(t,e){var n=t.__data__;return Ot(e)?n[typeof e=="string"?"string":"hash"]:n.map};
var _=rn;
function on(t){var e=_(this,t).delete(t);return this.size-=e?1:0,e};
var Ct=on;
function sn(t){return _(this,t).get(t)};
var Et=sn;
function an(t){return _(this,t).has(t)};
var Nt=an;
function un(t,e){var n=_(this,t),r=n.size;return n.set(t,e),this.size+=n.size==r?0:1,this};
var Pt=un;
function A(t){var e=-1,n=t==null?0:t.length;this.clear();while(++e<n){var r=t[e];this.set(r[0],r[1])}};
A.prototype.clear=At;
A.prototype.delete=Ct;
A.prototype.get=Et;
A.prototype.has=Nt;
A.prototype.set=Pt;
var nEt=A;
var ln="Expected a function";
function V(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw TypeError(ln);var n=function(){var r=arguments,o=e?e.apply(this,r):r[0],i=n.cache;if(i.has(o))return i.get(o);var s=t.apply(this,r);return n.cache=i.set(o,s)||i,s};return n.cache=new(V.Cache||nEt),n};
V.Cache=nEt;
var is=V;
return {qt,Tir,Qt,te,IL,ne,nB,st,re,oe,E,ie,at,se,ae,ue,ut,le,ce,lt,fe,mee,pe,iv,de,ge,he,me,xe,tEt,we,M,ft,be,pt,_e,Se,ye,R6e,Te,ve,Ae,Oe,Ce,Ee,Ne,Pe,dt,Re,gt,De,gee,Le,m,Me,ht,Ie,mt,ke,$e,je,We,xt,He,Ue,Fe,wt,ze,Be,bt,T,G,Ge,_t,Ve,eme,Je,b,Ke,Ye,Ze,St,Xe,yt,qe,Tt,Qe,vt,v,Wet,tn,Get,en,At,nn,Ot,rn,_,on,Ct,sn,Et,an,Nt,un,Pt,A,nEt,ln,V,is};
}
function module2(imports){

function Zwt(e){let n=process.env.NODE_OPTIONS;if(!n)return!1;return n.split(/\s+/).includes(e)};
return {Zwt};
}
function module3(imports){

function L(n){return[...new Set(n)]};
return {L};
}
function module4(imports){

function Zx(r){let e=Promise.resolve();return(...i)=>{let o=e.then(()=>r(...i));return e=o.catch(()=>{}),o}};
return {Zx};
}
function module5(imports){
const V=imports["V"];
const is=imports["is"];
const a=imports["a"];
const t=imports["t"];
const p=imports["p"];
const Zwt=imports["Zwt"];
const Ie=imports["Ie"];
const ae=imports["ae"];
const m=imports["m"];
const L=imports["L"];
const y=imports["y"];
const U=imports["U"];
const Zx=imports["Zx"];
const st=imports["st"];
const it=imports["it"];
const ge=imports["ge"];
var le=["bundled","system"];
var Y=new Set;
function H(e){if(Y.has(e))return!1;return Y.add(e),!0};
class fe{extraCACerts=null;certificates=is(()=>ot(this))};
var tt=new V(()=>new fe);
function X(){return tt.of(U().host)};
var U0e=Zx(async()=>{let e=X(),n=a.NODE_EXTRA_CA_CERTS;if(!n){if(e.extraCACerts!==null)return e.extraCACerts=null,W(e),!0;return!1}try{let r=await ae().readFile(n,{encoding:"utf8"});if(e.extraCACerts?.path===n&&e.extraCACerts.content===r)return!1;e.extraCACerts={path:n,content:r}}catch(r){if(t(`CA certs: Failed to read NODE_EXTRA_CA_CERTS file (${n}): ${r}`,{level:"error"}),H("read_failed"))m("ca_certs_load","read_failed");if(e.extraCACerts===null)return!1;e.extraCACerts=null}return W(e),!0});
function nt(){let e=a.CLAUDE_CODE_CERT_STORE;if(e){let n=[];for(let r of e.split(",")){let o=r.trim().toLowerCase();if(o==="bundled"||o==="system"){if(!n.includes(o))n.push(o)}else if(o){if(t(`CA certs: unrecognized CLAUDE_CODE_CERT_STORE source '${o}', ignoring`,{level:"warn"}),H("parse_skip"))p("ca_certs_load","parse_skip")}}if(n.length===0&&H("parse_all_invalid"))p("ca_certs_load","parse_all_invalid");return n.length>0?n:le}if(Zwt("--use-system-ca")||Zwt("--use-openssl-ca"))return["system"];return le};
function rt(e){let{X509Certificate:n}=Ie("crypto"),r=Date.now(),o=0,s=e.filter((i)=>{try{let c=new n(i),u=new Date(c.validTo).getTime();if(Number.isNaN(u)||u>r)return!0;return o++,!1}catch{return!0}});if(o>0){if(t(`CA certs: Dropped ${o} expired certificate(s) from system store`),H("expired_dropped"))p("ca_certs_load","expired_dropped",{dropped_count:o})}return s};
function cD(){return X().certificates()};
function ot(e){let n=nt(),r=a.NODE_EXTRA_CA_CERTS,o=n.includes("bundled"),s=n.includes("system");t(`CA certs: stores=${n.join(",")}, extraCertsPath=${r}`);let i=Ie("tls"),c=i.getCACertificates;if(!o&&s&&!c){if(t("CA certs: stores=system but system CA API unavailable, deferring to runtime"),H("system_api_unavailable"))p("ca_certs_load","system_api_unavailable");return}let u=[];if(o)u.push(...i.rootCertificates),t(`CA certs: Loaded ${i.rootCertificates.length} bundled root certificates`);if(s)try{let f=c?.("system");if(f&&f.length>0){let h=rt(f);u.push(...h),t(`CA certs: Loaded ${h.length} system CA certificates`)}else if(t(`CA certs: system store ${c?"returned empty":"unavailable"}`),!o)u.push(...i.rootCertificates)}catch(f){if(t(`CA certs: Failed to load system CA certificates: ${f}`,{level:"error"}),H("system_store_failed"))p("ca_certs_load","system_store_failed");if(!o)u.push(...i.rootCertificates)}if(r){if(e.extraCACerts?.path!==r)try{let f=ae().readFileSync(r,{encoding:"utf8"});e.extraCACerts={path:r,content:f}}catch(f){if(t(`CA certs: Failed to read NODE_EXTRA_CA_CERTS file (${r}): ${f}`,{level:"error"}),H("read_failed"))m("ca_certs_load","read_failed")}if(e.extraCACerts?.path===r)u.push(e.extraCACerts.content),t(`CA certs: Appended extra certificates from NODE_EXTRA_CA_CERTS (${r})`)}let l=u.length>0?L(u):void 0;if(Y.size===0&&H("ok"))y("ca_certs_load",{cert_count:l?.length??0,store_bundled:o,store_system:s,extra_configured:Boolean(r)});return l};
function a7r(){W(X())};
function W(e){e.certificates.cache.clear?.(),t("Cleared CA certificates cache")};
class me{clientCert=null;clientKey=null;config=is(()=>ft(this));agentCache=null;fetchSession=null};
var ut=new V(()=>new me);
function k(){return ut.of(U().host)};
var z="-----BEGIN ";
function ye(e){let n=e.lastIndexOf(z);if(n===-1)return!1;let r=e.indexOf("-----",n+z.length);if(r===-1)return!1;let o=e.slice(n+z.length,r);return e.includes(`-----END ${o}-----`,r)};
var r$=/-----BEGIN CERTIFICATE-----[\s\S]*?-----END CERTIFICATE-----/g;
function lt(e,n){let r;try{r=st({key:n,...a.CLAUDE_CODE_CLIENT_KEY_PASSPHRASE&&{passphrase:a.CLAUDE_CODE_CLIENT_KEY_PASSPHRASE}})}catch{return!1}let o=!1,s=!1;for(let i of e.match(r$)??[])try{if(new it(i).checkPrivateKey(r))return!1;o=!0}catch{s=!0}return o&&!s};
var de=1048576;
function Ae(e,n){if(!e.isFile()||e.size>de)return t(`mTLS: Ignoring ${n} \u2014 not a regular file or over ${de} bytes`,{level:"error"}),!1;return!0};
function pe(e,n){try{if(!Ae(ae().statSync(e),n))return null;let r=ae().readFileSync(e,{encoding:"utf8"});if(!ye(r))return t(`mTLS: Ignoring incomplete ${n} \u2014 no PEM block`,{level:"error"}),null;return t(`mTLS: Loaded ${n}`),{path:e,content:r}}catch(r){return t(`mTLS: Failed to load ${n}: ${r}`,{level:"error"}),null}};
async function he(e,n){try{if(!Ae(await ae().stat(e),n))return null;let r=await ae().readFile(e,{encoding:"utf8"});if(!ye(r))return t(`mTLS: Ignoring incomplete ${n} \u2014 no PEM block`,{level:"error"}),null;return t(`mTLS: Loaded ${n}`),{path:e,content:r}}catch(r){return t(`mTLS: Failed to load ${n}: ${r}`,{level:"error"}),null}};
var Nse=Zx(async()=>{let e=k(),n=a.CLAUDE_CODE_CLIENT_CERT,r=a.CLAUDE_CODE_CLIENT_KEY,[o,s]=await Promise.all([n?he(n,"client certificate from CLAUDE_CODE_CLIENT_CERT"):null,r?he(r,"client key from CLAUDE_CODE_CLIENT_KEY"):null]),i=Boolean(n&&!o||r&&!s),c=Boolean(!i&&o&&s&&lt(o.content,s.content));if(c)t("mTLS: Ignoring mismatched client cert/key pair \u2014 mid-rotation read",{level:"error"});let u=i||c,l=n?u?e.clientCert:o:null,f=r?u?e.clientKey:s:null,h=e.clientCert?.path!==l?.path||e.clientCert?.content!==l?.content||e.clientKey?.path!==f?.path||e.clientKey?.content!==f?.content;if(e.clientCert=l,e.clientKey=f,h)xe(e);return{changed:h,readFailed:u,mismatched:c}});
function iA(){return k().config()};
function ft(e){let n={},r=a.CLAUDE_CODE_CLIENT_CERT;if(r){if(e.clientCert?.path!==r)e.clientCert=pe(r,"client certificate from CLAUDE_CODE_CLIENT_CERT")??e.clientCert;if(e.clientCert?.path===r)n.cert=e.clientCert.content}let o=a.CLAUDE_CODE_CLIENT_KEY;if(o){if(e.clientKey?.path!==o)e.clientKey=pe(o,"client key from CLAUDE_CODE_CLIENT_KEY")??e.clientKey;if(e.clientKey?.path===o)n.key=e.clientKey.content}let s=a.CLAUDE_CODE_CLIENT_KEY_PASSPHRASE;if(s)n.passphrase=s,t("mTLS: Using client key passphrase");if(Object.keys(n).length===0)return;return n};
function DZe(){let e=k(),n=iA(),r=cD();if(e.agentCache&&e.agentCache.config===n&&e.agentCache.ca===r)return e.agentCache.agent;let o;if(n||r){let s={...n,...r&&{ca:r},keepAlive:!0};t("mTLS: Creating HTTPS agent with custom certificates"),o=new ge(s)}return e.agentCache={config:n,ca:r,agent:o},o};
function nR(){let e=iA(),n=cD();if(!e&&!n)return;return{...e,...n&&{ca:n}}};
function krr(){xe(k())};
function xe(e){e.config.cache.clear?.(),e.agentCache=null,t("Cleared mTLS configuration cache")};
function f7r(){if(!iA())return;if(a.NODE_EXTRA_CA_CERTS)t("NODE_EXTRA_CA_CERTS detected - Node.js will automatically append to built-in CAs")};

return {le,Y,H,fe,tt,X,U0e,nt,rt,cD,ot,a7r,W,me,ut,k,z,ye,r$,lt,de,Ae,pe,he,Nse,iA,ft,DZe,nR,krr,xe,f7r};
}
export function createTlsMaterial287(ports){
const m0=module0({});
const m1=module1({});
const m2=module2({});
const m3=module3({});
const m4=module4({});
const m5=module5({"V":m0["V"],"is":m1["is"],"a":ports["environment"],"t":ports["debug"],"p":ports["fallback"],"Zwt":m2["Zwt"],"Ie":ports["require"],"ae":ports["filesystem"],"m":ports["failure"],"L":m3["L"],"y":ports["success"],"U":ports["execution"],"Zx":m4["Zx"],"st":ports.builtins["crypto"]["createPrivateKey"],"it":ports.builtins["crypto"]["X509Certificate"],"ge":ports.builtins["https"]["Agent"]});
return {getCACertificates:m5["cD"],clearCACertsCache:m5["a7r"],loadExtraCACerts:m5["U0e"],getMTLSConfig:m5["iA"],clearMTLSCache:m5["krr"],loadMTLSClientMaterial:m5["Nse"],getMTLSAgent:m5["DZe"],getWebSocketTLSOptions:m5["nR"],configureGlobalMTLS:m5["f7r"],mtlsState:m5["k"]};
}

export function createTlsReload287(ports){
const {a,Nse,Fse,lw,d,m,p,t,y,Jd}=ports;
var _Kt="The socket connection was closed unexpectedly";
var e0e=new Set(["UNABLE_TO_VERIFY_LEAF_SIGNATURE","UNABLE_TO_GET_ISSUER_CERT","UNABLE_TO_GET_ISSUER_CERT_LOCALLY","CERT_SIGNATURE_FAILURE","CERT_NOT_YET_VALID","CERT_HAS_EXPIRED","CERT_REVOKED","CERT_REJECTED","CERT_UNTRUSTED","DEPTH_ZERO_SELF_SIGNED_CERT","SELF_SIGNED_CERT_IN_CHAIN","CERT_CHAIN_TOO_LONG","PATH_LENGTH_EXCEEDED","ERR_TLS_CERT_ALTNAME_INVALID","HOSTNAME_MISMATCH"]);
var Ce=new Set([...e0e,"ERR_TLS_HANDSHAKE_TIMEOUT","ERR_SSL_WRONG_VERSION_NUMBER","ERR_SSL_DECRYPTION_FAILED_OR_BAD_RECORD_MAC"]);
var xU=new Set(["ECONNRESET","EPIPE","ConnectionClosed","UND_ERR_SOCKET","ETIMEDOUT","ECONNABORTED","ERR_SOCKET_CLOSED","StreamSuspended","StreamTruncated"]);
function lm(e){if(!e||typeof e!=="object")return null;let r=e,n=5,s=0;while(r&&s<n){if(r instanceof Error){if("code"in r&&typeof r.code==="string"){let a=r.code,o=Ce.has(a);return{code:a,message:r.message,isSSLError:o}}if(r.message.startsWith(_Kt))return{code:"ConnectionClosed",message:r.message,isSSLError:!1}}if(r instanceof Error&&"cause"in r&&r.cause!==r)r=r.cause,s++;else break}return null};
function SLo(e){if(!(e instanceof Jd))return!1;let n=lm(e);if(n===null)return!1;let{code:r}=n;return xU.has(r)||r==="EPROTO"||r==="FailedToOpenSocket"||r.startsWith("ERR_OSSL_")||r.startsWith("ERR_SSL_")};
async function bLo(e){if(!a.CLAUDE_CODE_CLIENT_CERT||a.CLAUDE_CODE_DISABLE_MTLS_RELOAD_ON_STALE_CONNECTION)return{reportedFailure:!1,attempted:!1};try{let{changed:n,readFailed:r,mismatched:s}=await Nse();if(n)Fse(),lw();if(r){if(e)p("api_mtls_cert_reload",s?"material_mismatched":"material_read_failed");return{reportedFailure:e,attempted:!0}}if(n)t("Stale connection \u2014 reloaded rotated mTLS client material"),y("api_mtls_cert_reload");return{reportedFailure:!1,attempted:!0}}catch(n){if(d(n),e)m("api_mtls_cert_reload","reload_failed");return{reportedFailure:e,attempted:!0}}};
return {shouldReload:SLo,reload:bLo};
}
