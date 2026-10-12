// Complete official 2.1.287 block-gzip core and caller declarations. No body rewriting.
import {inflateRaw as H, deflateRaw as j, deflateRawSync as q, inflateRawSync as V, constants as W, gunzip as V8} from 'node:zlib'
import {promisify as v, promisify as K8} from 'node:util'
export function createNativeBlockGzip287(ports){
 const {a,C,Ls,N1r,d,t,m,p,y,sSt,JM}=ports;
function r(n){return n}
function c(n){return r(n)}
function Sn(n){return r(n)}
function E(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return}
function so(n){return bR(E(n))}
function bR(n){return n&&/^[A-Z][A-Z0-9_]{0,63}$/.test(n)?Sn(n):void 0}
class pir{now(){return Date.now()}monotonicNow(){return performance.now()}setTimeout(t,r,e){let o=setTimeout(t,r);if(e?.unref)o.unref();return()=>clearTimeout(o)}}
var KB=new pir;
function yTn(e,t){if(e instanceof Request)return{method:(t?.method??e.method).toUpperCase(),url:e.url};return{method:(t?.method??"GET").toUpperCase(),url:String(e)}}
function LUt(e,n){if(e===null)return;let r=Ls().gzipRequestBody.telemetryByClientRequestId,s=r.get(e);if(s?.requestBodyEncoding!=="gzip")return;r.set(e,{...s,gzipBlocks:s.gzipBlocks?.outcome==="as_blocks"?{...s.gzipBlocks,outcome:"rejected"}:n})}
 const {IXe,Lzo,Nzo,PGr,PXe,RGr,xGr}=(()=>{
async function cS(e,t,{concurrency:n=Number.POSITIVE_INFINITY,stopOnError:r=!0,signal:o}={}){return new Promise((i,s)=>{if(e[Symbol.iterator]===void 0&&e[Symbol.asyncIterator]===void 0)throw TypeError(`Expected \`input\` to be either an \`Iterable\` or \`AsyncIterable\`, got (${typeof e})`);if(typeof t!=="function")throw TypeError("Mapper function is required");if(!(Number.isSafeInteger(n)&&n>=1||n===Number.POSITIVE_INFINITY))throw TypeError(`Expected \`concurrency\` to be an integer from 1 and up or \`Infinity\`, got \`${n}\` (${typeof n})`);let a=[],c=[],d=new Map,u=!1,S=!1,y=!1,C=0,f=0,b=e[Symbol.iterator]===void 0?e[Symbol.asyncIterator]():e[Symbol.iterator](),h=()=>{l(o.reason)},p=()=>{o?.removeEventListener("abort",h)},k=(m)=>{i(m),p()},l=(m)=>{u=!0,S=!0,s(m),p()};if(o){if(o.aborted)l(o.reason);o.addEventListener("abort",h,{once:!0})}let B=async()=>{if(S)return;let m=await b.next(),_=f;if(f++,m.done){if(y=!0,C===0&&!S){if(!r&&c.length>0){l(AggregateError(c));return}if(S=!0,d.size===0){k(a);return}let g=[];for(let[R,K]of a.entries()){if(d.get(R)===T)continue;g.push(K)}k(g)}return}C++,(async()=>{try{let g=await m.value;if(S)return;let R=await t(g,_);if(R===T)d.set(_,R);a[_]=R,C--,await B()}catch(g){if(r)l(g);else{c.push(g),C--;try{await B()}catch(R){l(R)}}}})()};(async()=>{for(let m=0;m<n;m++){try{await B()}catch(_){l(_);break}if(y||u)break}})()})}
var T=Symbol("skip");
var w=131072;
var Y=32768;
var Z=4*w;
var X=32;
var Q=2;
var M=210000;
var ee=256;
var I={messages:'"messages":[',system:'],"system":',endOfSystemBlock:'"},{'};
var te=1024;
function PXe(e){e.cancelIdleDrop?.(),e.cancelIdleDrop=void 0,e.blocks.clear(),e.storedBytes=0,e.generation++}
function RGr({body:e,level:t,store:n,clock:r}){let o=ne(e),i=re(e,o,t),s=r.monotonicNow(),a=0,c=0,d=o.map((u,S)=>{let y=N(n,i[S],s);if(y!==void 0)a++,c+=u.end-u.start;return y});if(n.blocks.size>0)z(n,r);return{body:e,level:t,blocks:o,keys:i,reused:d,reusedBlockCount:a,reusedBytes:c,generation:n.generation}}
function Lzo({keys:e,reused:t}){return e.some((n,r)=>n!==void 0&&t[r]===void 0)}
async function Nzo(e,t,n,r){let o=await PGr(e,t,n,r),i=Buffer.from([31,139,8,0,0,0,0,0,0,255]),s=Buffer.alloc(10);return s[0]=3,s.writeUInt32LE(Bun.hash.crc32(e.body),2),s.writeUInt32LE(e.body.length%4294967296,6),Buffer.concat([i,...o,s])}
class IXe extends Error{fault;constructor(e,t){super("Request body gzip: a newly compressed block failed its check",t);this.fault=e}}
function xGr(e){let t=E(e);return t==="Z_DATA_ERROR"||t==="Z_BUF_ERROR"?t:void 0}
async function PGr(e,t,n,{signal:r,stopIf:o,inBackground:i=!1}={}){let{body:s,level:a,blocks:c,keys:d,reused:u,generation:S}=e,y;if(!i&&s.length-e.reusedBytes<=Z)y=c.map((f,b)=>{let h=u[b];if(h!==void 0)return h;let p=s.subarray(f.start,f.end),k=x(s,f,a),l=q(p,k);try{A(p,l,V(l,k))}catch(B){throw O(B)}return l});else{let b=(i?Promise.resolve():t.pooledCompression).then(()=>{r?.throwIfAborted();let h=n.monotonicNow();return cS(c,async(p,k)=>{if(o?.())throw Error("Request body gzip: compression stopped");if(u[k]!==void 0)return u[k];let l=t.generation===S?N(t,d[k],h):void 0;if(l!==void 0)return e.reusedBlockCount++,e.reusedBytes+=p.end-p.start,l;let B=s.subarray(p.start,p.end),m=x(s,p,a),_=await oe(B,m);try{A(B,_,await se(_,m))}catch(g){throw O(g)}return _},{concurrency:i?Q:X,signal:r})});if(!i)t.pooledCompression=b.then(()=>{},()=>{});y=await b}if(t.generation!==S)return y;let C=n.monotonicNow();return y.forEach((f,b)=>{let h=d[b];if(h!==void 0&&!t.blocks.has(h)){let p=f.buffer.byteLength===f.length;ae(t,h,p?f:Buffer.copyBytesFrom(f),C)}}),de(t,C),z(t,n),y}
function ne(e){let t=e.lastIndexOf(I.system),n=t===-1?-1:e.indexOf(I.endOfSystemBlock,t),r=[e.indexOf(I.messages),t,n!==-1&&n-t<=te?n+2:-1,e.length],o=[],i=0;for(let s of r){if(s<=i)continue;for(let a=i;a<s;a+=w)o.push({start:a,end:Math.min(a+w,s),dictionaryStart:Math.max(a-Y,i)});i=s}return o}
function re(e,t,n){let r=t.map((o)=>o.end-o.start===w?Bun.SHA256.hash(e.subarray(o.start,o.end),"base64"):void 0);return t.map((o,i)=>{let s=r[i],a=o.dictionaryStart<o.start?r[i-1]:"none";return s===void 0||a===void 0?void 0:`${n}:${a}:${s}`})}
function oe(e,t){return v(j)(e,t)}
function se(e,t){return v(H)(e,t)}
function x(e,t,n){return{level:n,finishFlush:W.Z_SYNC_FLUSH,chunkSize:w,...t.dictionaryStart<t.start&&{dictionary:e.subarray(t.dictionaryStart,t.start)}}}
function O(e){let t=xGr(e);return t===void 0?e:new IXe(t,{cause:e})}
var ie=65535;
function A(e,t,n){if(!n.equals(e))throw new IXe("inflates_to_other_bytes");if(t.length<4||t.readUInt32BE(t.length-4)!==ie)throw new IXe("no_flush_marker")}
function N(e,t,n){let r=t===void 0?void 0:e.blocks.get(t);if(t===void 0||r===void 0)return;return e.blocks.delete(t),e.blocks.set(t,{compressed:r.compressed,lastUsedAt:n}),r.compressed}
function ae(e,t,n,r){let o={compressed:n,lastUsedAt:r};e.blocks.set(t,o),e.storedBytes+=G(o)}
function de(e,t){for(let[n,r]of e.blocks){let o=e.storedBytes>e.maxStoredBytes;if(!o&&t-r.lastUsedAt<M)return;if(e.blocks.delete(n),e.storedBytes-=G(r),o)e.evictedForSpaceCount++}}
function z(e,t){let n=new WeakRef(e);e.cancelIdleDrop?.(),e.cancelIdleDrop=t.setTimeout(()=>{let r=n.deref();if(r!==void 0)PXe(r)},M,{unref:!0})}
function G(e){return ee+e.compressed.length}
 return {IXe,Lzo,Nzo,PGr,PXe,RGr,xGr};
 })();
var ade="x-client-request-id";
var q8="tengu_buzzing_pike";
var X8=524288;
var J8=['"thread":{"type":"create"}','"thread":{"type":"continue",','"speed":"fast"'];
var Q8=4096;
var zM=6;
var WM=1000;
var Z8=0.1;
function KM(){let e=a.CLAUDE_CODE_GZIP_REQUEST_BODY_BLOCKS??C(q8,0);return e===1||e===2?e:0}
function td(e){try{return new URL(yTn(e,void 0).url).pathname.endsWith("/v1/messages")}catch{return!1}}
function uw(e){let n=e?.body;return XM(e?.compress)!==void 0&&typeof n==="string"&&n.length>=X8&&!J8.some((r)=>n.includes(r,n.length-Q8))}
async function VM(e,n=KB){let r=XM(e?.compress);if(e===void 0||r===void 0||typeof e.body!=="string"||!uw(e))return{init:e};let s=e.body,h=Ls(),g=h.gzipRequestBody,S=g.blockStore,w=new Headers(e.headers),R=w.get(ade),T=KM();if(T===0||g.blocksSwitchedOff)return LUt(R,{mode:T,outcome:T===0?"off":"switched_off"}),{init:e};if(T===1&&S.blocks.size===0)return LUt(R,{mode:T,outcome:"by_runtime"}),{init:e,afterResponse:GM(g,n,s,r)};let D=()=>(LUt(R,{mode:T,outcome:"switched_off"}),{init:e}),H=performance.now();try{let G=RGr({body:Buffer.from(s),level:r,store:S,clock:n}),j=G.reusedBytes*2<G.body.length,K=T===1&&j?void 0:await Nzo(G,S,n,{signal:e.signal??void 0,stopIf:()=>g.blocksSwitchedOff!==!1});if(g.blocksSwitchedOff)return D();if(LUt(R,{mode:T,outcome:K===void 0?"by_runtime":"as_blocks",planned:{blockCount:G.blocks.length,reusedBlockCount:G.reusedBlockCount,reusedBytes:G.reusedBytes,spentMs:Math.round(performance.now()-H),gzippedBytes:K?.length,storedBytes:S.storedBytes,evictedForSpaceCount:S.evictedForSpaceCount}}),K===void 0)return{init:e,...Lzo(G)&&{afterResponse:GM(g,n,s,r)}};if(h.once("gzip_request_body_blocks_ok"))y("api_gzip_request_body_blocks");w.set("Content-Encoding","gzip");let{compress:Y,...X}=e;return{init:{...X,headers:w,body:K},afterResponse:t9(g,n,K)}}catch(G){if(e.signal?.aborted)return{init:e};if(g.blocksSwitchedOff&&!(G instanceof IXe))return D();return YM(G,g,"failed"),LUt(R,{mode:T,outcome:"failed"}),{init:e}}}
async function qM(e,n){let r=Ls().gzipRequestBody;if(!r.blockGzippedResponses.has(e))return e;let s=await N1r(e);if(s===null)return e;Nh(r,"for_the_session",`rejected (status=${e.status} kind=${s})`),e.body?.cancel().catch(()=>{});let h;try{return h=await n(),h}finally{p("api_gzip_request_body_blocks","rejected",{status:e.status,rejection:c(s),...h!==void 0&&{resendStatus:h.status}})}}
function Nh(e,n,r){if(e.blocksSwitchedOff!=="for_the_session")e.blocksSwitchedOff=n;PXe(e.blockStore),t(`[API REQUEST] gzip in blocks switched off (${e.blocksSwitchedOff}): ${r}`,{level:"warn"})}
function YM(e,n,r){if(d(e),e instanceof IXe)Nh(n,"for_the_session",`a new block failed its check (${e.fault})`),p("api_gzip_request_body_blocks","piece_check_failed",{fault:c(e.fault)});else Nh(n,"until_next_conversation","compression threw"),p("api_gzip_request_body_blocks",r)}
function GM(e,n,r,s){let h=e.blockStore,{generation:g}=h;return(S)=>{if(!S?.ok||e.blocksBuildGeneration===g)return;e.blocksBuildGeneration=g,n.setTimeout(async()=>{try{if(!e.blocksSwitchedOff&&KM()!==0&&h.generation===g)await PGr(RGr({body:Buffer.from(r),level:s,store:h,clock:n}),h,n,{inBackground:!0,stopIf:()=>e.blocksSwitchedOff!==!1})}catch(w){if(!e.blocksSwitchedOff||w instanceof IXe)YM(w,e,"build_failed")}finally{if(e.blocksBuildGeneration===g)e.blocksBuildGeneration=void 0}},WM,{unref:!0})}}
function t9(e,n,r){return(s)=>{if(s!==void 0)e.blockGzippedResponses.add(s);if(!n9(s)&&!0&&Math.random()>=Z8)return;n.setTimeout(()=>K8(V8)(r,{chunkSize:1048576}).catch((h)=>{let g=so(h),S=g===void 0?{}:{code:g},w=xGr(h)!==void 0;if(Nh(e,w?"for_the_session":"until_next_conversation",`the check of a sent body ended in ${E(h)??"an error"}`),w)m("api_gzip_request_body_blocks","self_check_wrong_bytes",S);else p("api_gzip_request_body_blocks","self_check_could_not_run",S)}),WM,{unref:!0})}}
function n9(e){return e===void 0||e.status>=400&&e.status<500&&e.status!==401&&e.status!==429}
function XM(e){if(e==="gzip")return zM;return typeof e==="object"&&e!==null&&e.encoding==="gzip"?e.level??zM:void 0}
async function qJ(e,n){if(!uw(n)||!td(e))return JM(e,n);let{init:r,afterResponse:s}=await VM(n).catch((g)=>(d(g),{init:n})),h;try{return h=await JM(e,r),h}finally{if(h!==void 0||!r9(n?.signal))try{s?.(h)}catch(g){d(g)}}}
function r9(e){return e?.aborted===!0&&!(e.reason instanceof sSt)}
 return {fetch:qJ,handleResponse:qM,prepare:VM,clock:KB,clear:PXe};
}
