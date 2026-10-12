// Generated from the complete public WIF accessor closure in official 2.1.286 raw modules.
import * as __node_path from 'node:path'
import * as __node_fs from 'node:fs'
import * as __node_fsp from 'node:fs/promises'
import * as __node_crypto from 'node:crypto'
import * as __node_os from 'node:os'
import * as __node_process from 'node:process'
import * as __node_util from 'node:util'
import {getSecureStorageExecutionHost as __sharedWifHost} from '../secureStorage/macOsKeychainHelpers.js'
import {logEvent as __cLogEvent} from '../../services/analytics/index.js'

function make_chunk_b006b4v9({}){
function r(n){return n}
function _(n){return r(n)}
function c(n){return r(n)}
function Sn(n){return r(n)}
return {Sn,_,c};
}
function make_chunk_h730kz80({Sn,_}){
var Ln=(()=>{class n extends Error{}return n})();
var nt=(n,e)=>{try{if(n!==null&&typeof n==="object"&&!("telemetryMessage"in n)&&Object.isExtensible(n))Object.assign(n,{telemetryMessage:e})}catch{}return n};
function ee(n){return n instanceof Error?n:Error(String(n))}
function l(n){return n instanceof Error?n.message:String(n)}
function v(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return}
function Ipe(n){if(typeof n!=="string")return;return/^[A-Za-z][A-Za-z0-9_-]{0,63}$/.test(n)?Sn(n):_("nonconforming")}
function us(n){return n!==null&&typeof n==="object"&&"errno"in n&&typeof n.errno==="number"}
function G(n){return v(n)==="ENOENT"}
function rK(n){return v(n)==="EISDIR"}
function pSt(n){let e=n.message?`${n.name}: ${n.message}`:n.name,t=n.stack;if(!t)return e;if(t.startsWith(e))return t;let r=t.split(`
`),o=r[0]??"",i=o===n.name||o.startsWith(`${n.name}:`)?r.slice(1):r;return[e,...i].join(`
`)}
var u=new Set(["ENOENT","EACCES","EPERM","ENOTDIR","ELOOP","ENAMETOOLONG","EROFS"]);
function Dt(n){return GA(v(n))}
function GA(n){return n!==void 0&&u.has(n)}
return {Dt,G,Ipe,Ln,ee,l,nt,pSt,rK,us,v};
}
function make_chunk_p4g2kckh({Dt,G,et,hn,st}){
var Qt=typeof global=="object"&&global&&global.Object===Object&&global;
var str=Qt;
var te=typeof self=="object"&&self&&self.Object===Object&&self;
var ee=str||te||Function("return this")();
var QM=ee;
var ne=QM.Symbol;
var lU=ne;
var ut=Object.prototype;
var {hasOwnProperty:re,toString:oe}=ut;
var E=lU?lU.toStringTag:void 0;
function ie(t){var e=re.call(t,E),n=t[E];try{t[E]=void 0;var r=!0}catch(i){}var o=oe.call(t);if(r)if(e)t[E]=n;else delete t[E];return o}
var lt=ie;
var se=Object.prototype;
var ae=se.toString;
function ue(t){return ae.call(t)}
var ct=ue;
var le="[object Null]";
var ce="[object Undefined]";
var ft=lU?lU.toStringTag:void 0;
function fe(t){if(t==null)return t===void 0?ce:le;return ft&&ft in Object(t)?lt(t):ct(t)}
var FQ=fe;
function pe(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}
var PE=pe;
var de="[object AsyncFunction]";
var ge="[object Function]";
var he="[object GeneratorFunction]";
var me="[object Proxy]";
function xe(t){if(!PE(t))return!1;var e=FQ(t);return e==ge||e==he||e==de||e==me}
var tSt=xe;
var we=QM["__core-js_shared__"];
var M=we;
var pt=function(){var t=/[^.]+$/.exec(M&&M.keys&&M.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();
function be(t){return!!pt&&pt in t}
var dt=be;
var _e=Function.prototype;
var Se=_e.toString;
function ye(t){if(t!=null){try{return Se.call(t)}catch(e){}try{return t+""}catch(e){}}return""}
var bje=ye;
var Te=/[\\^$.*+?()[\]{}|]/g;
var ve=/^\[object .+?Constructor\]$/;
var Ae=Function.prototype;
var Oe=Object.prototype;
var Ce=Ae.toString;
var Ee=Oe.hasOwnProperty;
var Ne=RegExp("^"+Ce.call(Ee).replace(Te,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");
function Pe(t){if(!PE(t)||dt(t))return!1;var e=tSt(t)?Ne:ve;return e.test(bje(t))}
var gt=Pe;
function Re(t,e){return t==null?void 0:t[e]}
var ht=Re;
function De(t,e){var n=ht(t,e);return gt(n)?n:void 0}
var $Q=De;
var Le=$Q(Object,"create");
var m=Le;
function Me(){this.__data__=m?m(null):{},this.size=0}
var mt=Me;
function Ie(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}
var xt=Ie;
var ke="__lodash_hash_undefined__";
var $e=Object.prototype;
var je=$e.hasOwnProperty;
function We(t){var e=this.__data__;if(m){var n=e[t];return n===ke?void 0:n}return je.call(e,t)?e[t]:void 0}
var wt=We;
var He=Object.prototype;
var Ue=He.hasOwnProperty;
function Fe(t){var e=this.__data__;return m?e[t]!==void 0:Ue.call(e,t)}
var bt=Fe;
var ze="__lodash_hash_undefined__";
function Be(t,e){var n=this.__data__;return this.size+=this.has(t)?0:1,n[t]=m&&e===void 0?ze:e,this}
var _t=Be;
function T(t){var e=-1,n=t==null?0:t.length;this.clear();while(++e<n){var r=t[e];this.set(r[0],r[1])}}
T.prototype.clear=mt;
T.prototype.delete=xt;
T.prototype.get=wt;
T.prototype.has=bt;
T.prototype.set=_t;
var B=T;
function Ge(){this.__data__=[],this.size=0}
var St=Ge;
function Ve(t,e){return t===e||t!==t&&e!==e}
var Ppe=Ve;
function Je(t,e){var n=t.length;while(n--)if(Ppe(t[n][0],e))return n;return-1}
var b=Je;
var Ke=Array.prototype;
var Ye=Ke.splice;
function Ze(t){var e=this.__data__,n=b(e,t);if(n<0)return!1;var r=e.length-1;if(n==r)e.pop();else Ye.call(e,n,1);return--this.size,!0}
var yt=Ze;
function Xe(t){var e=this.__data__,n=b(e,t);return n<0?void 0:e[n][1]}
var Tt=Xe;
function qe(t){return b(this.__data__,t)>-1}
var vt=qe;
function Qe(t,e){var n=this.__data__,r=b(n,t);if(r<0)++this.size,n.push([t,e]);else n[r][1]=e;return this}
var At=Qe;
function v(t){var e=-1,n=t==null?0:t.length;this.clear();while(++e<n){var r=t[e];this.set(r[0],r[1])}}
v.prototype.clear=St;
v.prototype.delete=yt;
v.prototype.get=Tt;
v.prototype.has=vt;
v.prototype.set=At;
var nQe=v;
var tn=$Q(QM,"Map");
var rQe=tn;
function en(){this.size=0,this.__data__={hash:new B,map:new(rQe||nQe),string:new B}}
var Ot=en;
function nn(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}
var Ct=nn;
function rn(t,e){var n=t.__data__;return Ct(e)?n[typeof e=="string"?"string":"hash"]:n.map}
var _=rn;
function on(t){var e=_(this,t).delete(t);return this.size-=e?1:0,e}
var Et=on;
function sn(t){return _(this,t).get(t)}
var Nt=sn;
function an(t){return _(this,t).has(t)}
var Pt=an;
function un(t,e){var n=_(this,t),r=n.size;return n.set(t,e),this.size+=n.size==r?0:1,this}
var Rt=un;
function A(t){var e=-1,n=t==null?0:t.length;this.clear();while(++e<n){var r=t[e];this.set(r[0],r[1])}}
A.prototype.clear=Ot;
A.prototype.delete=Et;
A.prototype.get=Nt;
A.prototype.has=Pt;
A.prototype.set=Rt;
var nSt=A;
var ln="Expected a function";
function V(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw TypeError(ln);var n=function(){var r=arguments,o=e?e.apply(this,r):r[0],i=n.cache;if(i.has(o))return i.get(o);var s=t.apply(this,r);return n.cache=i.set(o,s)||i,s};return n.cache=new(V.Cache||nSt),n}
var Wo=V;
function it(t,e){return t}
function xn(t){return t.normalize("NFC")}
function Pn(t){return/^[\\/]{2}/.test(t)||MO(t)}
function wy(t){return/(^|[\\/])\.\.([\\/]|$)/.test(t)}
function ax(t){if(/^[\\/]{2}[?.][\\/](?!unc[\\/])/i.test(t))return null;return t.match(/^[\\/]{2}(?:[?.][\\/]unc[\\/])?([^\\/]+)/i)?.[1]?.replace(/[A-Z]/g,(e)=>e.toLowerCase())??null}
function ua(t){return/(^|[\\/])\.{1,2}[. ]*([\\/]|$)/.test(t)}
function Pv(t){return/^[\\/]{2}[?.][\\/]/.test(t)}
function gS(t){if(!/\/\.(?:vol|file|nofollow|resolve)(?:\/|$)/i.test(t))return!1;if(!t.startsWith("/"))return!1;let e=[];for(let n of t.split("/")){if(n===""||n===".")continue;if(n===".."){e.pop();continue}if(e.push(n),e.length===1&&/^\.(?:vol|file|nofollow|resolve)$/i.test(n))return!0}return!1}
function atr(t){return/^[\\/](GLOBAL\?\?|GLOBALROOT|DosDevices|Device)[\\/]/i.test(t)}
function UQ(t,e){if(!Pn(t))return!1;if(Pv(t)||MO(t))return!0;if(ua(t))return!0;let n=ax(t);return n===null||n!==ax(e)}
function C(t){return t.length===2&&kk(t[0])==="net"||t.length===3&&kk(t[0])==="network"&&kk(t[1])==="servers"}
function b8(t){if(!t.startsWith("/"))return null;let e=[];for(let n of t.split("/")){if(n===""||n===".")continue;if(n===".."){e.pop();continue}if(e.push(n),C(e))return O(n)}return null}
function O(t){return t.replace(/[A-Z]/g,(e)=>e.toLowerCase())}
function kk(t){return t.replace(/[\u200c-\u200f\u202a-\u202e\u206a-\u206f\ufeff]/g,"").toUpperCase().toLowerCase()}
function DO(t,e){if(gS(t))return!0;if(ea(t)){let n=b8(t);if(n===null||n!==b8(e))return!0}return ctr(t,e)}
function ctr(t,e,n="darwin",r=n==="darwin"&&Bt()){if(n!=="darwin"||!Cj(t,n,r))return!1;let o=nt(e,n,r).complete[0]??null,{complete:i,partial:s}=nt(t,n,r);if(i.length===0&&s.length===0)return!0;if(o===null)return!0;return i.some((a)=>a!==o)||s.some((a)=>!o.startsWith(a))}
var J=it({value:void 0},(t)=>{t.value=void 0});
function Bt(t=Lt){let e=t===Lt;if(e&&J.value!==void 0)return J.value;let n;try{let r=!1;try{r=t.readAutoMaster().split(`
`).some((o)=>{let i=o.replace(/#.*$/,"").trim().split(/\s+/);return i.length>=2&&i[0].toLowerCase()==="/home"})}catch(o){if(!G(o))throw o}n=r||t.homeIsOwnMount()}catch{return!0}if(e)J.value=n;return n}
var Lt={readAutoMaster:()=>hn("/etc/auto_master","utf8"),homeIsOwnMount:()=>{let t;try{t=Dt("/home")}catch(e){if(G(e))return!0;throw e}return t.dev!==Dt("/Users").dev}};
var wn=6;
function nt(t,e,n){let r=[],o=[];if(!t.startsWith("/"))return{complete:r,partial:o};let i=[];for(let s of t.split("/")){if(s===""||s===".")continue;if(s===".."){i.pop();continue}if(i.push(s),i.length>wn)continue;let a="/"+i.join("/"),u=(e==="darwin"?PF(a):a).split("/").filter((w)=>w!==""),h=u[0]?.toLowerCase();if(h==="network"){if(u.length===1)o.push("/network/");else if(u.length===2)o.push(`/network/${O(u[1])}/`);else if(u.length===3)r.push(`/network/${O(u[1])}/${O(u[2])}`)}else if(n&&h==="home"&&u.length===2)r.push(`/home/${u[1]}`)}return{complete:r,partial:o}}
function ea(t){return ta(t)}
function ta(t){return owe(t)!==null}
var Gt=1024;
var Vt=4096;
var I=new Map;
var k=new Map;
function owe(t){if(!t.startsWith("/"))return null;if(t.length>Vt)return Mt(t);let e=I.get(t);if(e===void 0){if(e=Mt(t),I.size>=Gt)I.clear();I.set(t,e)}return e}
function Mt(t){let e=[];for(let n of t.split("/")){if(n===""||n===".")continue;if(n===".."){e.pop();continue}if(e.push(n),C(e))return"/"+e.join("/")}return null}
function s_(t){if(!t.startsWith("/"))return!1;let e=[];for(let n of t.split("/")){if(n===""||n===".")continue;if(n===".."){e.pop();continue}e.push(n)}return e.length===1&&e[0].toLowerCase()==="net"}
function xF(t){if(!t.startsWith("/"))return!1;if(t.length>Vt)return It(t);let e=k.get(t);if(e===void 0){if(e=It(t),k.size>=Gt)k.clear();k.set(t,e)}return e}
function It(t){let e=[];for(let n of t.split("/")){if(n===""||n===".")continue;if(n===".."){e.pop();continue}if(e.push(n),e.length===1&&e[0].toLowerCase()==="network")return!0}return!1}
function Cj(t,e="darwin",n=e==="darwin"&&Bt()){if(e!=="darwin")return!1;if(xF(t)||gS(t))return!0;if(!t.startsWith("/"))return!1;let{complete:r,partial:o}=nt(t,e,n);if(o.length>0)return!0;if(r.some((s)=>s.startsWith("/network/")))return!0;let i=r.filter((s)=>s.startsWith("/home/"));if(i.length>0){let s=_n();if(i.some((a)=>a!==s))return!0}return!1}
function _n(){let t;try{t=st()}catch{return null}let e=/^\/home\/([^/]+)/.exec(PF(t));return e?`/home/${e[1]}`:null}
function w8(t){return Ezt(t)||xF(t)}
function Ezt(t){return _s(t)||ta(t)||s_(t)||Pv(t)||MO(t)||atr(t)||gS(t)}
function pl(t){let e=/^[\\/]{2}wsl(?:\$|\.localhost)[\\/]([^\\/]*)/i.exec(t);return e!==null&&!/^\.{0,2}[. ]*$/.test(e[1]??"")}
function _s(t){return Pn(t)&&!pl(t)}
function xk(t){if(t.startsWith("\\\\?\\UNC\\"))return"\\\\"+t.slice(8);if(t.startsWith("\\\\?\\")&&t.length>=7&&t[5]===":")return t.slice(4);return t}
function kP(t){if(/^\\\\\?\\volume\{/i.test(t))return $t(t);if(MO(t))return!0;let e=xk(t);if(e!==t&&$t(e))return!0;return Pn(e)&&!pl(e)}
function $t(t){return ua(t)||t.includes("/")}
var An=["usr/local","usr/libexec/cups","usr/share/snmp","AppleInternal","Applications","Library","Users","Volumes","cores","home","media","mnt","opt","pkg","private","sw"];
function PF(t){let e=t.split("/");if(e.length<5||e[0]!==""||N(e[1]??"")!=="system"||N(e[2]??"")!=="volumes"||N(e[3]??"")!=="data")return t;let n=e.slice(4);for(let r of An){let o=r.split("/");if(n.length<o.length)continue;if(o.every((i,s)=>N(n[s]??"")===N(i)))return"/"+n.join("/")}return t}
function N(t){return t.toUpperCase().toLowerCase()}
function MO(t){return zt.test(t)||t.includes("??")&&zt.test(qt(t))}
var zt=/^[\\/]\?\?[\\/]/;
function qt(t){return et.win32?et.win32.normalize(t):t}
return {$Q,DO,FQ,PE,Pn,Ppe,QM,UQ,Wo,_s,b8,ea,gS,kP,lU,nQe,nSt,owe,pl,rQe,s_,str,tSt,ta,ua,w8,wy,xF,xn};
}
function make_chunk_r65ydf8e({r,u}){
function o(n){return n.normalize("NFC")}
function S7r(){let n="";if(typeof process<"u"&&typeof process.cwd==="function"&&typeof r==="function")try{let e=u();try{n=o(r(e))}catch{n=o(e)}}catch{}return n}
var fKo=S7r();
var t;
function F(){return t===!0}
return {F,S7r,fKo};
}
function make_chunk_v6yfpapk({f}){
function lo(t){return t}
function vj(t,s){let i=Buffer.from(s.replace(/-/g,""),"hex"),n=f("sha1").update(i).update(Buffer.from(t,"utf8")).digest();n[6]=n[6]&15|80,n[8]=n[8]&63|128;let e=n.subarray(0,16).toString("hex");return`${e.slice(0,8)}-${e.slice(8,12)}-${e.slice(12,16)}-${e.slice(16,20)}-${e.slice(20,32)}`}
return {lo,vj};
}
function make_chunk_52qbm57h({}){
class mtr{now(){return Date.now()}monotonicNow(){return performance.now()}setTimeout(t,r,e){let o=setTimeout(t,r);if(e?.unref)o.unref();return()=>clearTimeout(o)}}
var zQ=new mtr;
function Z(t,r,e){return new Promise((o,n)=>{if(r?.aborted){if(e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error("aborted"));else o();return}let m=(e?.clock??zQ).setTimeout(()=>{r?.removeEventListener("abort",i),o()},t,{unref:e?.unref});function i(){if(m(),e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error("aborted"));else o()}r?.addEventListener("abort",i,{once:!0})})}
function c(t,r){t(Error(r))}
function Ot(t,r,e){let o,n=new Promise((m,i)=>{o=setTimeout(c,r,i,e)});return Promise.race([t,n]).finally(()=>{if(o!==void 0)clearTimeout(o)})}
return {Ot,Z,mtr};
}
function make_chunk_ktw7xkh2({}){
function Le(e){if(!e)return!1;if(typeof e==="boolean")return e;let n=String(e).toLowerCase().trim();return["1","true","yes","on"].includes(n)}
function Cs(e){if(e===void 0)return!1;if(typeof e==="boolean")return!e;let n=String(e).toLowerCase().trim();return["0","false","no","off"].includes(n)}
var s=globalThis.process?.getBuiltinModule?.("async_hooks");
var xzt=s?(e)=>s.AsyncResource.bind(e):(e)=>e;
function Me(){let e=new Set;return{subscribe(n){let r=xzt(n);return e.add(r),()=>{e.delete(r)}},emit(...n){let r;for(let o of e)try{o(...n)}catch(i){(r??=[]).push(i)}if(r)throw r.length===1?r[0]:AggregateError(r,"Signal listener(s) threw")},clear(){e.clear()}}}
return {Cs,Le,Me};
}
function make_chunk_81k5s7s5({}){
var {getPrototypeOf:m,defineProperty:g,getOwnPropertyNames:n}=Object;
var E=(a,c)=>()=>(c||a((c={exports:{}}).exports,c),c.exports);
var r=(a)=>a;
function s(a,c){this[a]=r.bind(null,c)}
var Qr=(a,c)=>{for(var d in c)g(a,d,{get:c[d],enumerable:!0,configurable:!0,set:s.bind(c,d)})};
var Ie=import.meta.require;
return {E,Ie,Qr};
}
function make_chunk_ar1aj28g({$Q,FQ,Me,PE,Ppe,QM,Qr,S7r,Wo,fKo,lU,lo,mpe,mtr,nQe,nSt,rQe,str,tSt,vj,xn,getSecureStorageExecutionHost}){
var ee="3ab19d7e-9f35-45c2-926e-75e271cc60b3";
function LEn(){let e=process.env.CLAUDE_CODE_REMOTE_SESSION_ID?.trim();return e?vj(e,ee):null}
function Pn(){this.__data__=new nQe,this.size=0}
var Ze=Pn;
function wn(e){var t=this.__data__,o=t.delete(e);return this.size=t.size,o}
var et=wn;
function Mn(e){return this.__data__.get(e)}
var tt=Mn;
function Ln(e){return this.__data__.has(e)}
var nt=Ln;
var In=200;
function On(e,t){var o=this.__data__;if(o instanceof nQe){var r=o.__data__;if(!rQe||r.length<In-1)return r.push([e,t]),this.size=++o.size,this;o=this.__data__=new nSt(r)}return o.set(e,t),this.size=o.size,this}
var ot=On;
function A(e){var t=this.__data__=new nQe(e);this.size=t.size}
A.prototype.clear=Ze;
A.prototype.delete=et;
A.prototype.get=tt;
A.prototype.has=nt;
A.prototype.set=ot;
var HIe=A;
var Fn="__lodash_hash_undefined__";
function En(e){return this.__data__.set(e,Fn),this}
var rt=En;
function Dn(e){return this.__data__.has(e)}
var it=Dn;
function H(e){var t=-1,o=e==null?0:e.length;this.__data__=new nSt;while(++t<o)this.add(e[t])}
H.prototype.add=H.prototype.push=rt;
H.prototype.has=it;
var WZn=H;
function Hn(e,t){var o=-1,r=e==null?0:e.length;while(++o<r)if(t(e[o],o,e))return!0;return!1}
var st=Hn;
function Bn(e,t){return e.has(t)}
var GZn=Bn;
var jn=1;
var Un=2;
function _n(e,t,o,r,i,s){var a=o&jn,u=e.length,d=t.length;if(u!=d&&!(a&&d>u))return!1;var l=s.get(e),g=s.get(t);if(l&&g)return l==t&&g==e;var p=-1,h=!0,v=o&Un?new WZn:void 0;s.set(e,t),s.set(t,e);while(++p<u){var m=e[p],y=t[p];if(r)var k=a?r(y,m,p,t,e,s):r(m,y,p,e,t,s);if(k!==void 0){if(k)continue;h=!1;break}if(v){if(!st(t,function(C,x){if(!GZn(v,x)&&(m===C||i(m,C,o,r,s)))return v.push(x)})){h=!1;break}}else if(!(m===y||i(m,y,o,r,s))){h=!1;break}}return s.delete(e),s.delete(t),h}
var B=_n;
var qn=QM.Uint8Array;
var aGt=qn;
function Wn(e){var t=-1,o=Array(e.size);return e.forEach(function(r,i){o[++t]=[i,r]}),o}
var at=Wn;
function Gn(e){var t=-1,o=Array(e.size);return e.forEach(function(r){o[++t]=r}),o}
var lGt=Gn;
var Nn=1;
var Kn=2;
var Vn="[object Boolean]";
var Jn="[object Date]";
var zn="[object Error]";
var Qn="[object Map]";
var Xn="[object Number]";
var Yn="[object RegExp]";
var Zn="[object Set]";
var eo="[object String]";
var to="[object Symbol]";
var oo="[object ArrayBuffer]";
var ro="[object DataView]";
var lt=lU?lU.prototype:void 0;
var te=lt?lt.valueOf:void 0;
function io(e,t,o,r,i,s,a){switch(o){case ro:if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return!1;e=e.buffer,t=t.buffer;case oo:if(e.byteLength!=t.byteLength||!s(new aGt(e),new aGt(t)))return!1;return!0;case Vn:case Jn:case Xn:return Ppe(+e,+t);case zn:return e.name==t.name&&e.message==t.message;case Yn:case eo:return e==t+"";case Qn:var u=at;case Zn:var d=r&Nn;if(u||(u=lGt),e.size!=t.size&&!d)return!1;var l=a.get(e);if(l)return l==t;r|=Kn,a.set(e,t);var g=B(u(e),u(t),r,i,s,a);return a.delete(e),g;case to:if(te)return te.call(e)==te.call(t)}return!1}
var dt=io;
function so(e,t){var o=-1,r=t.length,i=e.length;while(++o<r)e[i+o]=t[o];return e}
var E_t=so;
var ao=Array.isArray;
var JS=ao;
function uo(e,t,o){var r=t(e);return JS(e)?r:E_t(r,o(e))}
var zZn=uo;
function co(e,t){var o=-1,r=e==null?0:e.length,i=0,s=[];while(++o<r){var a=e[o];if(t(a,o,e))s[i++]=a}return s}
var VZn=co;
function po(){return[]}
var qZn=po;
var fo=Object.prototype;
var go=fo.propertyIsEnumerable;
var ut=Object.getOwnPropertySymbols;
var ho=!ut?qZn:function(e){if(e==null)return[];return e=Object(e),VZn(ut(e),function(t){return go.call(e,t)})};
var v_t=ho;
function mo(e,t){var o=-1,r=Array(e);while(++o<e)r[o]=t(o);return r}
var ct=mo;
function So(e){return e!=null&&typeof e=="object"}
var eU=So;
var vo="[object Arguments]";
function yo(e){return eU(e)&&FQ(e)==vo}
var ne=yo;
var pt=Object.prototype;
var {hasOwnProperty:bo,propertyIsEnumerable:ko}=pt;
var Co=ne(function(){return arguments}())?ne:function(e){return eU(e)&&bo.call(e,"callee")&&!ko.call(e,"callee")};
var Z2e=Co;
var _={};
Qr(_,{default:()=>OIe});
function xo(){return!1}
var ft=xo;
var mt=typeof _=="object"&&_&&!_.nodeType&&_;
var gt=mt&&typeof U=="object"&&U&&!U.nodeType&&U;
var To=gt&&gt.exports===mt;
var ht=To?QM.Buffer:void 0;
var Ro=ht?ht.isBuffer:void 0;
var Ao=Ro||ft;
var OIe=Ao;
var Po=9007199254740991;
var wo=/^(?:0|[1-9]\d*)$/;
function Mo(e,t){var o=typeof e;return t=t==null?Po:t,!!t&&(o=="number"||o!="symbol"&&wo.test(e))&&(e>-1&&e%1==0&&e<t)}
var eje=Mo;
var Lo=9007199254740991;
function Oo(e){return typeof e=="number"&&e>-1&&e%1==0&&e<=Lo}
var P=Oo;
var f={};
function rr(e){return eU(e)&&P(e.length)&&!!f[FQ(e)]}
var St=rr;
function ir(e){return function(t){return e(t)}}
var cGt=ir;
var G={};
Qr(G,{default:()=>DIe});
var vt=typeof G=="object"&&G&&!G.nodeType&&G;
var L=vt&&typeof W=="object"&&W&&!W.nodeType&&W;
var sr=L&&L.exports===vt;
var oe=sr&&str.process;
var lr=function(){try{var e=L&&L.require&&L.require("util").types;if(e)return e;return oe&&oe.binding&&oe.binding("util")}catch(t){}}();
var DIe=lr;
var yt=DIe&&DIe.isTypedArray;
var dr=yt?cGt(yt):St;
var dGt=dr;
var ur=Object.prototype;
var cr=ur.hasOwnProperty;
function pr(e,t){var o=JS(e),r=!o&&Z2e(e),i=!o&&!r&&OIe(e),s=!o&&!r&&!i&&dGt(e),a=o||r||i||s,u=a?ct(e.length,String):[],d=u.length;for(var l in e)if((t||cr.call(e,l))&&!(a&&(l=="length"||i&&(l=="offset"||l=="parent")||s&&(l=="buffer"||l=="byteLength"||l=="byteOffset")||eje(l,d))))u.push(l);return u}
var KZn=pr;
var fr=Object.prototype;
function gr(e){var t=e&&e.constructor,o=typeof t=="function"&&t.prototype||fr;return e===o}
var C_t=gr;
function hr(e,t){return function(o){return e(t(o))}}
var YZn=hr;
var mr=YZn(Object.keys,Object);
var bt=mr;
var Sr=Object.prototype;
var vr=Sr.hasOwnProperty;
function yr(e){if(!C_t(e))return bt(e);var t=[];for(var o in Object(e))if(vr.call(e,o)&&o!="constructor")t.push(o);return t}
var kt=yr;
function br(e){return e!=null&&P(e.length)&&!tSt(e)}
var gpe=br;
function kr(e){return gpe(e)?KZn(e):kt(e)}
var Foe=kr;
function Cr(e){return zZn(e,Foe,v_t)}
var NEn=Cr;
var xr=1;
var Tr=Object.prototype;
var Rr=Tr.hasOwnProperty;
function Ar(e,t,o,r,i,s){var a=o&xr,u=NEn(e),d=u.length,l=NEn(t),g=l.length;if(d!=g&&!a)return!1;var p=d;while(p--){var h=u[p];if(!(a?h in t:Rr.call(t,h)))return!1}var v=s.get(e),m=s.get(t);if(v&&m)return v==t&&m==e;var y=!0;s.set(e,t),s.set(t,e);var k=a;while(++p<d){h=u[p];var C=e[h],x=t[h];if(r)var $e=a?r(x,C,h,t,e,s):r(C,x,h,e,t,s);if(!($e===void 0?C===x||i(C,x,o,r,s):$e)){y=!1;break}k||(k=h=="constructor")}if(y&&!k){var E=e.constructor,D=t.constructor;if(E!=D&&(("constructor"in e)&&("constructor"in t))&&!(typeof E=="function"&&E instanceof E&&typeof D=="function"&&D instanceof D))y=!1}return s.delete(e),s.delete(t),y}
var Ct=Ar;
var T=FQ;
var tje=T;
var jr=1;
var Mt="[object Arguments]";
var Lt="[object Array]";
var z="[object Object]";
var Ur=Object.prototype;
var It=Ur.hasOwnProperty;
function _r(e,t,o,r,i,s){var a=JS(e),u=JS(t),d=a?Lt:tje(e),l=u?Lt:tje(t);d=d==Mt?z:d,l=l==Mt?z:l;var g=d==z,p=l==z,h=d==l;if(h&&OIe(e)){if(!OIe(t))return!1;a=!0,g=!1}if(h&&!g)return s||(s=new HIe),a||dGt(e)?B(e,t,o,r,i,s):dt(e,t,d,o,r,i,s);if(!(o&jr)){var v=g&&It.call(e,"__wrapped__"),m=p&&It.call(t,"__wrapped__");if(v||m){var y=v?e.value():e,k=m?t.value():t;return s||(s=new HIe),i(y,k,o,r,s)}}if(!h)return!1;return s||(s=new HIe),Ct(e,t,o,r,i,s)}
var Ot=_r;
function Ft(e,t,o,r,i){if(e===t)return!0;if(e==null||t==null||!eU(e)&&!eU(t))return e!==e&&t!==t;return Ot(e,t,o,r,Ft,i)}
var w=Ft;
class q{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
function c8(){return{sent:new Set,rejected:new Set,declaredTools:void 0,noChannelTools:void 0,declaredToolsDecided:!1,nameOnlyAnnouncements:new Set,surfacedOnWire:new Set,definedByValue:new Set,inlineToolsRefusal:{rejectedHeader:void 0,announcementsByName:new Set},advisorHeld:void 0,wireShapeSeed:void 0,webSearchHistoryRejected:!1}}
function R9r(e,t){for(let o of t.sent)C0(e,o);for(let o of t.rejected)Tf(e,o);e.wireShapeSeed=t}
function Q(e){let t=c8();if(t.declaredTools=e.declaredTools,t.noChannelTools=e.noChannelTools,t.declaredToolsDecided=e.declaredToolsDecided,t.advisorHeld=e.advisorHeld,e.wireShapeSeed!==void 0)R9r(t,e.wireShapeSeed);let{rejectedHeader:o,announcementsByName:r}=e.inlineToolsRefusal;if(o!==void 0)x9r(t,o);return P9r(t,r),t.webSearchHistoryRejected=e.webSearchHistoryRejected,t}
function x9r(e,t){Tf(e,t),e.inlineToolsRefusal.rejectedHeader=t}
function P9r(e,t){for(let o of t)e.inlineToolsRefusal.announcementsByName.add(o),e.nameOnlyAnnouncements.add(o)}
function C0(e,t){if(!e.rejected.has(t))e.sent.add(t)}
function Tf(e,t){e.sent.delete(t),e.rejected.add(t)}
class ie{spawner=void 0;pairings=new Map;mainEnsureInFlight=!1;mainSlotBlocked=!1}
class se{#e=c8();#t=void 0;stickyBetas(){return this.#e}unlatchStickyBetas(){this.#e=Q(this.#e)}atisLatch(){return this.#t}replaceAtisLatch(e){this.#t=e}reset(){this.#e=c8(),this.#t=void 0}}
var Nr=function(){try{var e=$Q(Object,"defineProperty");return e({},"",{}),e}catch(t){}}();
var pGt=Nr;
function Kr(e,t,o){if(t=="__proto__"&&pGt)pGt(e,t,{configurable:!0,enumerable:!0,value:o,writable:!0});else e[t]=o}
var hpe=Kr;
function Vr(e){return function(t,o,r){var i=-1,s=Object(t),a=r(t),u=a.length;while(u--){var d=a[e?u:++i];if(o(s[d],d,s)===!1)break}return t}}
var Ht=Vr;
var Jr=Ht();
var QZn=Jr;
function zr(e,t){return e&&QZn(e,t,Foe)}
var A_t=zr;
var Xr=1;
var Yr=2;
function $r(e,t,o,r){var i=o.length,s=i,a=!r;if(e==null)return!s;e=Object(e);while(i--){var u=o[i];if(a&&u[2]?u[1]!==e[u[0]]:!(u[0]in e))return!1}while(++i<s){u=o[i];var d=u[0],l=e[d],g=u[1];if(a&&u[2]){if(l===void 0&&!(d in e))return!1}else{var p=new HIe;if(r)var h=r(l,g,d,e,t,p);if(!(h===void 0?w(g,l,Xr|Yr,r,p):h))return!1}}return!0}
var Bt=$r;
function Zr(e){return e===e&&!PE(e)}
var X=Zr;
function ei(e){var t=Foe(e),o=t.length;while(o--){var r=t[o],i=e[r];t[o]=[r,i,X(i)]}return t}
var jt=ei;
function ti(e,t){return function(o){if(o==null)return!1;return o[e]===t&&(t!==void 0||(e in Object(o)))}}
var Y=ti;
function ni(e){var t=jt(e);if(t.length==1&&t[0][2])return Y(t[0][0],t[0][1]);return function(o){return o===e||Bt(o,e,t)}}
var Ut=ni;
var oi="[object Symbol]";
function ri(e){return typeof e=="symbol"||eU(e)&&FQ(e)==oi}
var LJe=ri;
var ii=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var si=/^\w*$/;
function ai(e,t){if(JS(e))return!1;var o=typeof e;if(o=="number"||o=="symbol"||o=="boolean"||e==null||LJe(e))return!0;return si.test(e)||!ii.test(e)||t!=null&&e in Object(t)}
var M=ai;
var li=500;
function di(e){var t=Wo(e,function(r){if(o.size===li)o.clear();return r}),o=t.cache;return t}
var _t=di;
var ui=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var ci=/\\(\\)?/g;
var pi=_t(function(e){var t=[];if(e.charCodeAt(0)===46)t.push("");return e.replace(ui,function(o,r,i,s){t.push(i?s.replace(ci,"$1"):r||o)}),t});
var qt=pi;
function fi(e,t){var o=-1,r=e==null?0:e.length,i=Array(r);while(++o<r)i[o]=t(e[o],o,e);return i}
var MIe=fi;
var hi=1/0;
var Wt=lU?lU.prototype:void 0;
var Gt=Wt?Wt.toString:void 0;
function Nt(e){if(typeof e=="string")return e;if(JS(e))return MIe(e,Nt)+"";if(LJe(e))return Gt?Gt.call(e):"";var t=e+"";return t=="0"&&1/e==-hi?"-0":t}
var Kt=Nt;
function mi(e){return e==null?"":Kt(e)}
var $oe=mi;
function Si(e,t){if(JS(e))return e;return M(e,t)?[e]:qt($oe(e))}
var Uoe=Si;
var vi=1/0;
function yi(e){if(typeof e=="string"||LJe(e))return e;var t=e+"";return t=="0"&&1/e==-vi?"-0":t}
var xQ=yi;
function bi(e,t){t=Uoe(t,e);var o=0,r=t.length;while(e!=null&&o<r)e=e[xQ(t[o++])];return o&&o==r?e:void 0}
var rje=bi;
function ki(e,t,o){var r=e==null?void 0:rje(e,t);return r===void 0?o:r}
var Vt=ki;
function Ci(e,t){return e!=null&&t in Object(e)}
var Jt=Ci;
function xi(e,t,o){t=Uoe(t,e);var r=-1,i=t.length,s=!1;while(++r<i){var a=xQ(t[r]);if(!(s=e!=null&&o(e,a)))break;e=e[a]}if(s||++r!=i)return s;return i=e==null?0:e.length,!!i&&P(i)&&eje(a,i)&&(JS(e)||Z2e(e))}
var zt=xi;
function Ti(e,t){return e!=null&&zt(e,t,Jt)}
var ZZn=Ti;
var Ri=1;
var Ai=2;
function Pi(e,t){if(M(e)&&X(t))return Y(xQ(e),t);return function(o){var r=Vt(o,e);return r===void 0&&r===t?ZZn(o,e):w(t,r,Ri|Ai)}}
var Qt=Pi;
function wi(e){return e}
var fGt=wi;
function Mi(e){return function(t){return t==null?void 0:t[e]}}
var Yt=Mi;
function Li(e){return function(t){return rje(t,e)}}
var $t=Li;
function Ii(e){return M(e)?Yt(xQ(e)):$t(e)}
var Zt=Ii;
function Oi(e){if(typeof e=="function")return e;if(e==null)return fGt;if(typeof e=="object")return JS(e)?Qt(e[0],e[1]):Ut(e);return Zt(e)}
var qM=Oi;
function Fi(e,t){var o={};return t=qM(t,3),A_t(e,function(r,i,s){hpe(o,i,t(r,i,s))}),o}
var qr=Fi;
function Ei(e,t){var o,r=-1,i=e.length;while(++r<i){var s=t(e[r]);if(s!==void 0)o=o===void 0?s:o+s}return o}
var en=Ei;
function Di(e,t){return e&&e.length?en(e,qM(t,2)):0}
var NJe=Di;
var tn={inputTokens:0,outputTokens:0,cacheReadInputTokens:0,cacheCreationInputTokens:0};
function Z(e){let t=Object.create(null);return Object.assign(t,e)}
class ae{#e=0;#t=0;#n=0;#o=0;#r=Date.now();#i=void 0;#l=0;#d=0;#s=0;#u=tn;#a=!1;#c=Z();#g=null;#p=null;#f=null;totalCostUSD(){return this.#e}restoredCostUSD(){return this.#s}restoredTokens(){return this.#u}totalAPIDuration(){return this.#t}totalAPIDurationWithoutRetries(){return this.#n}totalToolDuration(){return this.#o}totalDuration(){return Math.max(0,Date.now()-this.#r)}sessionStartTime(){return this.#i??this.#r}totalLinesAdded(){return this.#l}totalLinesRemoved(){return this.#d}hasUnknownModelCost(){return this.#a}modelUsage(){return this.#c}usageForModel(e){return this.#c[e]}totalInputTokens(){return NJe(Object.values(this.#c),"inputTokens")}totalOutputTokens(){return NJe(Object.values(this.#c),"outputTokens")}totalCacheReadInputTokens(){return NJe(Object.values(this.#c),"cacheReadInputTokens")}totalCacheCreationInputTokens(){return NJe(Object.values(this.#c),"cacheCreationInputTokens")}totalWebSearchRequests(){return NJe(Object.values(this.#c),"webSearchRequests")}recordApiDuration(e,t){this.#t+=e,this.#n+=t}recordCost(e,t,o){this.#c[o]=t,this.#e+=e}recordToolDuration(e){this.#o+=e}recordLinesChanged(e,t){this.#l+=e,this.#d+=t}markUnknownModelCost(){this.#a=!0}zeroDurationsAndCostForTests(){this.#t=0,this.#n=0,this.#e=0,this.#s=0}restartClock(){this.#r=Date.now(),this.anchorLogicalStart(void 0)}anchorLogicalStart(e){this.#i=e===void 0?void 0:Math.min(e,this.#r)}restore({totalCostUSD:e,totalAPIDuration:t,totalAPIDurationWithoutRetries:o,totalToolDuration:r,totalLinesAdded:i,totalLinesRemoved:s,lastDuration:a,startTime:u,modelUsage:d,hasUnknownModelCost:l},g){if(this.#f=g,this.#e=e,this.#s=e,this.#t=t,this.#n=o,this.#o=r,this.#l=i,this.#d=s,this.#a=l??!1,d)this.#c=Z(d);if(this.#u={inputTokens:this.totalInputTokens(),outputTokens:this.totalOutputTokens(),cacheReadInputTokens:this.totalCacheReadInputTokens(),cacheCreationInputTokens:this.totalCacheCreationInputTokens()},a!==void 0)this.#r=Date.now()-a;this.anchorLogicalStart(u)}registerSaver(e){this.#g=e}runSaver(e,t){(this.#g??(t?t.#g:null))?.(e)}registerTranscriptRecorder(e){this.#p=e}runTranscriptRecorder(e,t,o){(this.#p??(o?o.#p:null))?.(e,t)}snapshot(){return{ownerSessionId:this.#f,totalCostUSD:this.#e,totalAPIDuration:this.#t,totalAPIDurationWithoutRetries:this.#n,totalToolDuration:this.#o,startTime:this.#r,sessionLogicalStartTime:this.#i,totalLinesAdded:this.#l,totalLinesRemoved:this.#d,restoredCostUSD:this.#s,restoredTokens:this.#u,hasUnknownModelCost:this.#a,modelUsage:qr(this.#c,(e)=>({...e}))}}restoreSnapshot(e){this.#f=e.ownerSessionId,this.#e=e.totalCostUSD,this.#t=e.totalAPIDuration,this.#n=e.totalAPIDurationWithoutRetries,this.#o=e.totalToolDuration,this.#r=e.startTime,this.#i=e.sessionLogicalStartTime,this.#l=e.totalLinesAdded,this.#d=e.totalLinesRemoved,this.#s=e.restoredCostUSD,this.#u=e.restoredTokens,this.#a=e.hasUnknownModelCost,this.#c=Z(qr(e.modelUsage,(t)=>({...t})))}claim(e){this.#f??=e}scopeTo(e){this.#f=e}ownerSessionId(){return this.#f}belongsTo(e){return this.#f===e}reset(e){this.#f=e,this.#e=0,this.#s=0,this.#u=tn,this.#t=0,this.#n=0,this.#o=0,this.#r=Date.now(),this.anchorLogicalStart(void 0),this.#l=0,this.#d=0,this.#a=!1,this.#c=Z()}}
class le{#e=!1;#t=null;fableConsentSessionFallback(){return this.#e}replaceFableConsentSessionFallback(e){this.#e=e}sessionConsentKey(){return this.#t}replaceSessionConsentKey(e){this.#t=e}reset(){this.#e=!1,this.#t=null}}
class de{#e={registeredHooks:null};#t=void 0;#n=void 0;holder(){return this.#e}mainThreadAgentType(){return this.#t}replaceMainThreadAgentType(e){this.#t=e}mainThreadAgentHooks(){return this.#n}replaceMainThreadAgentHooks(e){this.#n=e}reset(){this.#e={registeredHooks:null},this.#t=void 0,this.#n=void 0}}
class ue{#e=new Map;skills(){return this.#e}lookup(e){return this.#e.get(e)}record(e,t){this.#e.set(e,t)}forget(e){this.#e.delete(e)}forgetAll(){this.#e.clear()}reset(){this.#e=new Map}}
class ce{#e=[];#t;#n;#o;#r;approvedServers(){return this.#e}approveServers(e,t){for(let o of t)if(!this.#e.some((r)=>r.name===o&&r.workspaceKey===e))this.#e.push({name:o,workspaceKey:e})}registerClientsAccessor(e){this.#t=e}acquireClientsAccessor(e){if(this.#t)return()=>{};return this.#t=e,()=>{if(this.#t===e)this.#t=void 0}}clientsFromAccessor(){return this.#t?.()}registerConnectedClientWiring(e){this.#n=e}connectedClientWiring(){return this.#n}registerToolsSwapper(e){this.#o=e}acquireToolsSwapper(e){if(this.#o)return()=>{};return this.#o=e,()=>{if(this.#o===e)this.#o=void 0}}swapServerTools(e,t){if(!this.#o)return!1;return this.#o(e,t)}registerConnections(e){this.#r=e}acquireConnections(e){if(this.#r)return()=>{};return this.#r=e,()=>{if(this.#r===e)this.#r=void 0}}connections(){return this.#r}reset(){this.#e=[],this.#t=void 0}}
class pe{#e=void 0;#t=void 0;#n=void 0;#o=void 0;#r=void 0;#i=void 0;#l=!1;#d=!1;#s=void 0;#u=!1;#a=void 0;#c=void 0;mainLoopModelOverride(){return this.#e}overrideMainLoopModel(e){this.#e=e}mainLoopEffortState(){return this.#t}replaceMainLoopEffortState(e){this.#t=e}initialMainLoopModel(){return this.#n}replaceInitialMainLoopModel(e){this.#n=e}initialModelSettingLayer(){return this.#o}replaceInitialModelSettingLayer(e){this.#o=e}resolvedOrgDefault(){return this.#r}replaceResolvedOrgDefault(e){this.#r=e}initialEnvDefaultModel(){return this.#i}replaceInitialEnvDefaultModel(e){this.#i=e}refusalFallbackOccurred(){return this.#l}markRefusalFallbackOccurred(e){this.#l=!0,this.#s??=e}refusalFallbackHeaderArmed(){return this.#d}armRefusalFallbackHeader(e){this.#d=!0,this.#s??=e}refusalFallbackLatchOriginRequestId(){return this.#s}silentLaneServerArmed(){return this.#u}armSilentLaneFromServer(){this.#u=!0}forgetRefusalFallbackOccurred(){this.#l=!1,this.#d=!1,this.#u=!1,this.#s=void 0}refusalFallbackModelLatch(){return this.#a}replaceRefusalFallbackModelLatch(e){this.#a=e}unlatchRefusalFallbackModel(){this.#a=void 0}availabilityFallbackChain(){return this.#c}replaceAvailabilityFallbackChain(e){this.#c=e}reset(){this.#e=void 0,this.#t=void 0,this.#n=void 0,this.#o=void 0,this.#r=void 0,this.#i=void 0,this.#l=!1,this.#d=!1,this.#u=!1,this.#s=void 0,this.#a=void 0,this.#c=void 0}}
class fe{#e=new Map;#t=0;#n=void 0;#o=null;sections(){return this.#e}recordSection(e,t){this.#e.set(e,t)}forgetAllSections(){this.#e.clear()}noteInvalidation(e="other"){this.#t+=1,this.#n=e}epoch(){return this.#t}lastInvalidationReason(){return this.#n}registerWordingLatchClear(e){this.#o=e}clearWordingLatch(e){(this.#o??(e?e.#o:null))?.()}reset(){this.#e=new Map}}
class ge{#e=null;#t=null;#n=null;#o=null;#r=null;#i=0;#l=void 0;#d=0;#s=null;#u=null;#a=null;#c=null;#g=!1;#p=null;#f=null;#m=!1;lastAPIRequest(){return this.#e}replaceLastAPIRequest(e){this.#e=e}lastCancelledAPIMessageId(){return this.#t}replaceLastCancelledAPIMessageId(e){this.#t=e}lastAPIRequestMessages(){return this.#n}replaceLastAPIRequestMessages(e){this.#n=e}lastClassifierRequests(){return this.#o}replaceLastClassifierRequests(e){this.#o=e}promptId(){return this.#r}replacePromptId(e){this.#r=e}promptIndex(){return this.#i}replacePromptIndex(e){this.#i=e}incrementPromptIndex(){return this.#i++,this.#i}lastMainRequestId(){return this.#l}replaceLastMainRequestId(e){if(this.#l=e,e===void 0)this.#d+=1}mainChainReleaseCount(){return this.#d}lastMainThreadCacheTtlMs(){return this.#s}replaceLastMainThreadCacheTtlMs(e){this.#s=e,this.#a=Date.now(),this.#c=this.#a,this.#g=!0}adjustLastMainThreadCacheTtlMs(e){this.#s=e}recordLastMainThreadCacheRenewal(e){if(this.#a!==null)this.#u={requestAt:this.#a,at:Math.max(e,this.lastMainThreadCacheRenewedAt()??-1/0)}}lastMainThreadCacheRenewedAt(){let e=this.#u;return e!==null&&e.requestAt===this.#a?e.at:null}lastLiveMainThreadRequestAt(){return this.#c}lastMainThreadRequestAt(){return this.#a}mainThreadRequestedInProcess(){return this.#g}recordMainThreadTurnStart(){this.#g=!0}replaceLastMainThreadRequest(e,t){this.#a=e,this.#s=t}lastMainThreadContextTokens(){return this.#p}replaceLastMainThreadContextTokens(e){this.#p=e}stageResumeSeed(e){this.#h=e}applyResumeSeed(e){this.#h=null,this.#s=e.ttlMs,this.#a=e.requestAt,this.#p=e.contextTokens}#h=null;clearLastMainThreadRequest(e){let t=e!==void 0&&this.#h?.sessionId===e?this.#h:null;this.#h=null,this.#s=t?.ttlMs??null,this.#a=t?.requestAt??null,this.#p=t?.contextTokens??null,this.#c=null,this.#g=!1}lastApiCompletionTimestamp(){return this.#f}replaceLastApiCompletionTimestamp(e){this.#f=e}pendingPostCompaction(){return this.#m}replacePendingPostCompaction(e){this.#m=e}reset(){this.#e=null,this.#t=null,this.#n=null,this.#o=null,this.#r=null,this.#i=0,this.#l=void 0,this.#d+=1,this.#s=null,this.#a=null,this.#c=null,this.#g=!1,this.#p=null,this.#h=null,this.#f=null,this.#m=!1}}
class he{#e=[];#t=Object.create(null);#n=null;#o=0;#r=!1;#i=0;tasks(){return this.#e}schedule(e){this.#e.push(e)}replaceTasks(e){this.#e=e}chainStartedAt(e){return this.#t[e]}recordChainStart(e,t){this.#t[e]=t}forgetChainStart(e){delete this.#t[e]}tickInFlightPrompt(){return this.#n}replaceTickInFlightPrompt(e){this.#n=e}consecutiveKeepalives(){return this.#o}replaceConsecutiveKeepalives(e){this.#o=e}ended(){return this.#r}replaceEnded(e){this.#r=e}wakeFires(){return this.#i}recordWakeFire(){this.#i++}resetWakeFires(){this.#i=0}reset(){this.#e=[],this.#t=Object.create(null),this.#n=null,this.#o=0,this.#r=!1,this.#i=0}}
class me{#e=!1;#t=!1;#n=!1;#o=!1;#r=!1;#i=!1;#l=!1;#d=!1;#s=!1;#u=!1;#a=void 0;#c=!1;#g=void 0;#p=!1;#f=!1;#m=null;#h=null;#b=null;#k=!1;#S=null;#v=!1;#y=!1;#x=!1;#C=!1;#R=!1;#T=void 0;#A=void 0;#w=void 0;#P=null;#M=null;onboardingShownThisSession(){return this.#e}replaceOnboardingShownThisSession(e){this.#e=e}lspRecommendationShownThisSession(){return this.#t}replaceLspRecommendationShownThisSession(e){this.#t=e}sessionTrustAccepted(){return this.#n}replaceSessionTrustAccepted(e){this.#n=e}homeTrustDialogAccepted(){return this.#o}replaceHomeTrustDialogAccepted(e){this.#o=e}hasExitedPlanMode(){return this.#r}replaceHasExitedPlanMode(e){this.#r=e}needsPlanModeExitAttachment(){return this.#i}replaceNeedsPlanModeExitAttachment(e){this.#i=e}needsAutoModeExitAttachment(){return this.#l}replaceNeedsAutoModeExitAttachment(e){this.#l=e}memoryToggledOff(){return this.#d}replaceMemoryToggledOff(e){this.#d=e}autoMemoryOffThisSession(){return this.#s}replaceAutoMemoryOffThisSession(e){this.#s=e}accountMemorySessionMode(){return this.#a}replaceAccountMemorySessionMode(e,t=!1){this.#a=e,this.#c=t&&e!==void 0}accountMemorySessionModeRestored(){return this.#c}accountMemoryLaunchMode(){return this.#g}replaceAccountMemoryLaunchMode(e){this.#g=e}restoredMemoryPause(){return this.#p}replaceRestoredMemoryPause(e){this.#p=e}restoredAutoMemoryOff(){return this.#u}replaceRestoredAutoMemoryOff(e){this.#u=e}teardownUnwindRequested(){return this.#k}replaceTeardownUnwindRequested(e){this.#k=e}backgroundAutoModeSetupInFlight(){return this.#f}replaceBackgroundAutoModeSetupInFlight(e){this.#f=e}deferredToolStubGateLatch(){return this.#m}replaceDeferredToolStubGateLatch(e){this.#m=e}verifySkillRolloutGateLatch(){return this.#h}replaceVerifySkillRolloutGateLatch(e){this.#h=e}commitSkillRolloutGateLatch(){return this.#b}replaceCommitSkillRolloutGateLatch(e){this.#b=e}memoryToolsShapeLatch(){return this.#S}replaceMemoryToolsShapeLatch(e){this.#S=e}proposeGoalAvailabilityLogged(){return this.#v}markProposeGoalAvailabilityLogged(){this.#v=!0}activeRoutine(){return this.#A}replaceActiveRoutine(e){this.#A=e}inheritedTeamName(){return this.#w}replaceInheritedTeamName(e){this.#w=e}teleportedSessionInfo(){return this.#P}replaceTeleportedSessionInfo(e){this.#P=e}markFirstTeleportMessageLogged(){if(this.#P)this.#P.hasLoggedFirstMessage=!0}cachedClaudeMdContent(){return this.#M}replaceCachedClaudeMdContent(e){this.#M=e}accountSkillsSyncEnabled(){return this.#y}replaceAccountSkillsSyncEnabled(e){this.#y=e}skillsSyncVetoed(){return this.#x}replaceSkillsSyncVetoed(e){this.#x=e}accountPluginsSyncEnabled(){return this.#C}replaceAccountPluginsSyncEnabled(e){this.#C=e}pluginsSyncVetoed(){return this.#R}replacePluginsSyncVetoed(e){this.#R=e}armPendingContextCompacted(e){this.#T=e}consumePendingContextCompacted(){let e=this.#T;return this.#T=void 0,e}forgetPendingContextCompacted(){this.#T=void 0}reset(){this.#y=!1,this.#x=!1,this.#C=!1,this.#R=!1,this.#e=!1,this.#t=!1,this.#n=!1,this.#o=!1,this.#r=!1,this.#i=!1,this.#l=!1,this.#d=!1,this.#s=!1,this.#a=void 0,this.#c=!1,this.#g=void 0,this.#p=!1,this.#u=!1,this.#k=!1,this.#f=!1,this.#m=null,this.#h=null,this.#b=null,this.#S=null,this.#v=!1,this.#A=void 0,this.#w=void 0,this.#P=null,this.#M=null,this.#T=void 0}}
function nn(){return{messagesArriving:0,lastInLine:Promise.resolve(),gaveUpOn:void 0,toolCallsWaiting:0}}
class Se{#e=new Map;#t=new Map;#n=null;#o=new Map;#r=new Set;#i=new Set;#l=new Set;#d=new Set;#s=new Set;#u=new Set;#a=new Set;#c=new Set;#g=new Set;#p=new Set;#f=new Map;#m=new Map;#h={byFileUuid:new Map,recentPrefetchStarts:[]};#b=nn();#k=new Set;#S=void 0;#v=void 0;#y=void 0;#x=void 0;#C=void 0;planSlugCache(){return this.#e}forgetPlanSlug(e){this.#e.delete(e)}pendingBranchLinks(){return this.#t}replacePendingBranchLinks(){this.#t=new Map}vimSharedState(){return this.#n}replaceVimSharedState(e){this.#n=e}agentColorMap(){return this.#o}sessionCreatedTeams(){return this.#r}sessionSpawnedTeammatePanes(){return this.#i}surfacedHookSpawnFailures(){return this.#l}bareMcpServerMatchersWarned(){return this.#d}pendingConversationEditKinds(){return this.#s}clientTruncatedAssistantIds(){return this.#u}heldStatelessReplyIds(){return this.#a}unsupportedThreadKeys(){return this.#c}pendingPrLinks(){return this.#g}policyPredicateTelemetryEmitted(){return this.#p}humanAttachmentDigests(){return this.#f}inboundAttachmentFiles(){return this.#m}inboundAttachmentDownloads(){return this.#h}arrivingInboundFiles(){return this.#b}chromeAvailabilityStagesLogged(){return this.#k}replaceChromeAvailabilityStagesLogged(e){if(this.#k=new Set,e)this.#S=Date.now()}chromeAvailabilityAnchorMs(){return this.#S}pendingGoalIdleCheckin(){return this.#v}replacePendingGoalIdleCheckin(e){this.#v=e}pendingGoalReprompt(){return this.#y}replacePendingGoalReprompt(e){this.#y=e}goalInterruptionStreak(){return this.#x}replaceGoalInterruptionStreak(e){this.#x=e}workerCheckin(){return this.#C}replaceWorkerCheckin(e){this.#C=e}reset(){this.#e=new Map,this.#t=new Map,this.#n=null,this.#o=new Map,this.#r=new Set,this.#i=new Set,this.#l=new Set,this.#d=new Set,this.#s=new Set,this.#u=new Set,this.#a=new Set,this.#c=new Set,this.#g=new Set,this.#p=new Set,this.#f=new Map,this.#m=new Map;for(let e of this.#h.byFileUuid.values())clearTimeout(e.expiry),e.abort.abort();this.#h={byFileUuid:new Map,recentPrefetchStarts:[]},this.#b=nn(),this.#k=new Set,this.#S=void 0,clearTimeout(this.#v),this.#v=void 0,clearTimeout(this.#y),this.#y=void 0,this.#x=void 0,clearInterval(this.#C?.timer),this.#C=void 0}}
var on={renderTarget:"ink",workspace:"local",canDrive:!0,transcriptSource:"local-jsonl",remote:null};
class ye{#e=!1;#t=void 0;#n=void 0;#o=void 0;#r=void 0;#i=null;#l=!1;#d=void 0;#s=on;#u=!1;#a="idle";attacherCapsChanged=Me();rvSupervisorLinkChanged=Me();sdkDialogHostActive(){return this.#e}markSdkDialogHostActive(e){this.#e=e}sdkSupportedDialogKinds(){return this.#t}sdkSupportedDialogKindsSource(){return this.#n}declareDialogKinds(e,t){this.#t=e,this.#n=e===void 0?void 0:t}sdkPerTaskStopAffordance(){return this.#o}declarePerTaskStopAffordance(e){this.#o=e}sdkRapidFollowupPreempt(){return this.#r}declareRapidFollowupPreempt(e){this.#r=e}attacherCaps(){return this.#i}replaceAttacherCaps(e){this.#i=e,this.attacherCapsChanged.emit()}rvSupervisorLinkLive(){return this.#l}replaceRvSupervisorLinkLive(e){if(this.#l===e)return;this.#l=e,this.rvSupervisorLinkChanged.emit()}sdkBetas(){return this.#d}replaceSdkBetas(e){this.#d=e}caps(){return this.#s}replaceCaps(e){this.#s=e}markRemote(e){this.#s={...this.#s,workspace:e?"remote":"local"}}replBridgeActive(){return this.#u}replaceReplBridgeActive(e){if(this.#u===e)return;this.#u=e}mainLoopBusy(){return this.#a!=="idle"}mainQueryRunning(){return this.#a==="running"}replaceMainLoopStatus(e){this.#a=e}reset(){this.#e=!1,this.#t=void 0,this.#n=void 0,this.#o=void 0,this.#r=void 0,this.#i=null,this.#d=void 0,this.#s=on,this.#u=!1,this.#a="idle",this.#l=!1,this.attacherCapsChanged.clear(),this.rvSupervisorLinkChanged.clear()}}
class be{#e=0;#t=null;#n=0;outputTokensAtTurnStart(){return this.#e}budget(){return this.#t}continuationCount(){return this.#n}snapshotForTurn(e,t){this.#e=e,this.#t=t,this.#n=0}incrementContinuation(){this.#n++}reset(){this.#e=0,this.#t=null,this.#n=0}}
var rn=150;
class ke{#e=Date.now();#t=!1;interactionFired=Me();#n=void 0;terminalFocusFired=Me();#o=!1;#r;lastInteractionTime(){return this.#e}recordInteraction(e){if(e)this.#i();else this.#t=!0}flushIfDirty(){if(this.#t)this.#i()}#i(){this.#e=Date.now(),this.#t=!1,this.interactionFired.emit()}resetBaseline(){this.#e=Date.now(),this.#t=!1}terminalFocus(){return this.#n}updateTerminalFocus(e){this.#n=e,this.terminalFocusFired.emit()}scrollDraining(){return this.#o}markScrollActivity(){if(this.#o=!0,this.#r)clearTimeout(this.#r);this.#r=setTimeout(()=>{this.#o=!1,this.#r=void 0},rn),this.#r.unref?.()}async waitForScrollIdle(){while(this.#o)await new Promise((e)=>setTimeout(e,rn))}reset(){this.#e=Date.now(),this.#n=void 0,this.interactionFired.clear(),this.terminalFocusFired.clear()}}
var Hi=["sdk_single_prompt_gate","subagent_estimate","subagent_final_turn"];
class xe{byAgent=new Map;attemptsByAgent=new Map;cappedFailuresByAgent=new Map;armGateEventEmitted=new Set;vetoedUnderPrompt=new Map;sidecarIo=Promise.resolve();rehydrateAttemptedSessions=new Set;sidecarReadsAhead=new Map;get(e){return this.byAgent.get(e)}has(e){return this.byAgent.has(e)}put(e,t){this.byAgent.set(e,t)}remove(e){this.byAgent.delete(e)}nextAttemptNumber(e){let t=(this.attemptsByAgent.get(e)??0)+1;return this.attemptsByAgent.set(e,t),t}consecutiveCountedFailures(e){return this.cappedFailuresByAgent.get(e)??0}recordCountedFailure(e){let t=(this.cappedFailuresByAgent.get(e)??0)+1;return this.cappedFailuresByAgent.set(e,t),t}clearCountedFailures(e){this.cappedFailuresByAgent.delete(e)}recordVeto(e,t){this.vetoedUnderPrompt.set(e,t)}isVetoedUnder(e,t){return this.vetoedUnderPrompt.get(e)===t}latchArmGateEvent(e){if(this.armGateEventEmitted.has(e))return!1;return this.armGateEventEmitted.add(e),!0}enqueueSidecarIo(e,t){return this.sidecarIo=this.sidecarIo.then(e,e).catch(t),this.sidecarIo}sidecarIoSettled(){return this.sidecarIo}hasAttemptedRehydrate(e){return this.rehydrateAttemptedSessions.has(e)}markRehydrateAttempted(e){this.rehydrateAttemptedSessions.add(e)}keepSidecarReadAhead(e,t){this.sidecarReadsAhead.delete(e);while(this.sidecarReadsAhead.size>=8){let o=this.sidecarReadsAhead.keys().next().value;if(o===void 0)break;this.sidecarReadsAhead.delete(o)}this.sidecarReadsAhead.set(e,t)}takeSidecarReadAhead(e){let t=this.sidecarReadsAhead.get(e);return this.sidecarReadsAhead.delete(e),t}dropSidecarReadAhead(e){this.sidecarReadsAhead.delete(e)}forgetSubagentTelemetry(e){this.attemptsByAgent.delete(e),this.cappedFailuresByAgent.delete(e),this.vetoedUnderPrompt.delete(e);for(let t of Hi)this.armGateEventEmitted.delete(`${e}:${t}`)}}
class Te{#e=void 0;get current(){return this.#e}adopt(e){this.#e=e}}
class Re{#e=null;#t=null;mainAgentId(e){return this.#e??=lo(e),this.#e}projectDir(){return this.#t}replaceProjectDir(e){this.#t=e}}
class Ae{openToolUseId;answeredThisSession=!1;get answered(){return this.answeredThisSession}markAnswered(){this.answeredThisSession=!0}isOpenElsewhere(e){return this.openToolUseId!==void 0&&this.openToolUseId!==e}open(e){this.openToolUseId=e}closeFor(e){if(e!==void 0&&this.openToolUseId===e)this.openToolUseId=void 0}}
class Pe{granted=!1;isGranted(){return this.granted}grant(){this.granted=!0}}
class we{inFlight=null;startedForTurnEnd=!1;reset(){this.inFlight?.abort(),this.inFlight=null,this.startedForTurnEnd=!1}}
class Le{firstSyncPromise=null;accountListing="pending";syncErrors=[];lastRoundListed=!1;syncedLaneOpened=!1;removalsDeferredHere=new Set;pendingTrashRemovals=[];ensureBucketRoot=null;deferredRelist=null;missingEntry={resync:null,resyncAt:-1/0,swept:!1}}
class Ie{abortController=null;eligibleTurns=0;unusedInARow=0;askOnNextTurn(){this.eligibleTurns=0}reset(){this.abortController?.abort(),this.abortController=null}arm(){let e=new AbortController;return this.abortController=e,e}}
class Oe{#e=void 0;#t=void 0;ccrSessionID(){return this.#e}latchCcrSessionID(e){this.#e=e}syncEnabled(){return this.#t}latchSyncEnabled(e){return this.#t=e,e}}
class Fe{autonomousPreambleDelivered=!1;lastLoopFileDelivered=null;reset(){this.autonomousPreambleDelivered=!1,this.lastLoopFileDelivered=null}}
class Ee{exchanges=[];replace(e){this.exchanges=e}append(e,t,o){this.exchanges=[...this.exchanges,{question:e,response:t,...o&&{fallbackNotice:o}}].slice(-20)}pendingReopen=null;reopenAway=!1;get reopenPending(){return this.pendingReopen!==null}armReopen(e,t){if(this.pendingReopen){this.pendingReopen.owners.add(e);return}this.pendingReopen={owners:new Set([e]),cancel:t()}}clearPendingReopen(e){let t=this.pendingReopen;if(!t){this.reopenAway=!1;return}if(e!==void 0){if(t.owners.delete(e),t.owners.size>0)return}t.cancel(),this.pendingReopen=null,this.reopenAway=!1}reopener=null;setReopener(e){this.reopener=e}get hasReopener(){return this.reopener!==null}reopenNow(){return this.reopener?.()??!1}inFlightQuestions=[];get inFlight(){return this.inFlightQuestions.at(-1)??null}pendingBesidesTop(){return this.inFlightQuestions.slice(0,-1)}setInFlight(e){if(!this.inFlightQuestions.includes(e))this.inFlightQuestions=[...this.inFlightQuestions,e]}clearInFlight(e){if(this.inFlightQuestions.includes(e))this.inFlightQuestions=this.inFlightQuestions.filter((t)=>t!==e)}}
var Bi=16;
class De{pending=null;shownThisSession=!1;changed=Me();submitted=[];submittedChanged=Me();subscribe=this.changed.subscribe;getSnapshot=()=>this.pending;subscribeSubmitted=this.submittedChanged.subscribe;submit(e){if(this.shownThisSession)return;if(this.submitted.length>=Bi)this.submitted.shift();this.submitted.push(e),this.submittedChanged.emit()}takeSubmitted(){let e=this.submitted;return this.submitted=[],e}offer(e){if(this.shownThisSession)return;this.pending=e,this.changed.emit()}dismiss(){if(this.pending!==null)this.pending=null,this.changed.emit()}markShown(){this.shownThisSession=!0}}
class He{lastEmittedAt=new Map;shouldEmit(e,t,o){let r=this.lastEmittedAt.get(e)||0;if(t-r<o)return!1;if(this.lastEmittedAt.size>=100){let i=this.lastEmittedAt.keys().next().value;if(i!==void 0)this.lastEmittedAt.delete(i)}return this.lastEmittedAt.set(e,t),!0}}
var oje=Symbol("permission-stash-evicted");
class Be{entriesCap;evictedKeysCap;lanes={write:new Map,read:new Map};evicted={write:new Set,read:new Set};poisoned={write:!1,read:!1};identities=new Map;identitiesEvicted=new Set;identitiesPoisoned=!1;constructor(e=256,t=1048576){this.entriesCap=e;this.evictedKeysCap=t}stash(e,t,o,r="write"){if(e===void 0)return;let i=this.lanes[r],s=this.evicted[r],a=I(e,t);if(s.has(a))return;let u=i.get(a);if(u!==void 0){let d=new Set(o);i.set(a,u.filter((l)=>d.has(l)));return}if(i.size>=this.entriesCap){let d=i.keys().next().value;if(d!==void 0){if(i.delete(d),s.add(d),s.size>this.evictedKeysCap){this.poisoned[r]=!0;let l=s.values().next().value;if(l!==void 0)s.delete(l)}}}i.set(a,o)}holds(e,t,o="write"){return e!==void 0&&this.lanes[o].has(I(e,t))}stashIdentity(e,t,o){if(e===void 0)return;let r=I(e,t),i=this.identities.get(r);if(i!==void 0){if(i===null||o===null||i.dev!==o.dev||i.ino!==o.ino)this.identities.set(r,null);return}if(this.identitiesEvicted.has(r)||this.identitiesPoisoned){this.identities.set(r,null);return}if(this.identities.size>=this.entriesCap){let s=this.identities.keys().next().value;if(s!==void 0){if(this.identities.delete(s),this.identitiesEvicted.add(s),this.identitiesEvicted.size>this.evictedKeysCap){this.identitiesPoisoned=!0;let a=this.identitiesEvicted.values().next().value;if(a!==void 0)this.identitiesEvicted.delete(a)}}}this.identities.set(r,o)}takeIdentity(e,t){if(e===void 0)return;let o=I(e,t),r=this.identities.get(o);return this.identities.delete(o),this.identitiesEvicted.delete(o),r}consume(e,t,o="write"){if(e===void 0)return;let r=this.lanes[o],i=I(e,t),s=r.get(i),a=s===void 0&&(this.evicted[o].delete(i)||this.poisoned[o]),u=`${e}\x00`;for(let d of r.keys())if(d.startsWith(u))r.delete(d);if(o==="read"){for(let d of this.identities.keys())if(d.startsWith(u))this.identities.delete(d)}if(a)return oje;return s}}
function I(e,t){return`${e}\x00${t}`}
var sn="NoProjectDirectoryError";
class Ck extends Error{name=sn;constructor(){super("This session has no working directory.")}}
function ds(e){let{project:t}=e;if(t===null)throw new Ck;return t}
function ter(e){return an({kind:"root",host:e.host,id:e.id,parentId:e.parentId},e.project)}
function O(e,t){let o=t.originalCwd??e?.originalCwd,r=t.projectRoot??e?.projectRoot,i=t.cwd??e?.cwd;if(o===void 0&&r===void 0&&i===void 0)return null;if(o===void 0||r===void 0||i===void 0)throw new Ck;return{originalCwd:xn(o),projectRoot:xn(r),cwd:xn(i)}}
function an(e,t){let o={project:t===null?null:O(null,t)},r=Me(),i=e.kind==="fork"?e.root.observers:new ie,s=e.kind==="fork"?e.root.autonomousLoopPreamble:new Fe,a=e.kind==="fork"?e.root.precompute:new xe,u={get originalCwd(){return ds(o).originalCwd},get projectRoot(){return ds(o).projectRoot},get cwd(){return ds(o).cwd}},d={host:e.kind==="fork"?e.root.host:e.host,get id(){return e.kind==="fork"?e.root.id:e.id},get parentId(){return e.kind==="fork"?e.root.parentId:e.parentId},get root(){return e.kind==="fork"?e.root:d},get project(){return o.project===null?null:u},observers:i,autonomousLoopPreamble:s,btwHistory:e.kind==="fork"?e.root.btwHistory:new Ee,ccrRecap:e.kind==="fork"?e.root.ccrRecap:new we,conversationLatches:e.kind==="fork"?e.root.conversationLatches:new se,costLedger:e.kind==="fork"?e.root.costLedger:new ae,engineStore:e.kind==="fork"?e.root.engineStore:new Te,fableConsentSlots:e.kind==="fork"?e.root.fableConsentSlots:new le,hookRegistry:e.kind==="fork"?e.root.hookRegistry:new de,identity:e.kind==="fork"?e.root.identity:new Re,invokedSkills:e.kind==="fork"?e.root.invokedSkills:new ue,mcpSessionWiring:e.kind==="fork"?e.root.mcpSessionWiring:new ce,modelSelection:e.kind==="fork"?e.root.modelSelection:new pe,promptAssembly:e.kind==="fork"?e.root.promptAssembly:new fe,promptSuggestion:e.kind==="fork"?e.root.promptSuggestion:new Ie,pendingHint:e.kind==="fork"?e.root.pendingHint:new De,pluginsSync:e.kind==="fork"?e.root.pluginsSync:new Le,precompute:a,requestJournal:e.kind==="fork"?e.root.requestJournal:new ge,sessionCron:e.kind==="fork"?e.root.sessionCron:new he,sessionFlags:e.kind==="fork"?e.root.sessionFlags:new me,sessionRefsGate:e.kind==="fork"?e.root.sessionRefsGate:new Oe,sessionScratch:e.kind==="fork"?e.root.sessionScratch:new Se,surfaceCapabilities:e.kind==="fork"?e.root.surfaceCapabilities:new ye,toolProgressThrottle:e.kind==="fork"?e.root.toolProgressThrottle:new He,turnBudget:e.kind==="fork"?e.root.turnBudget:new be,userPresence:e.kind==="fork"?e.root.userPresence:new ke,workflowUsageConsent:e.kind==="fork"?e.root.workflowUsageConsent:new Pe,outsideReadPrompt:e.kind==="fork"?e.root.outsideReadPrompt:new Ae,writePermissionStash:e.kind==="fork"?e.root.writePermissionStash:new Be,subscribe(l){let g=r.subscribe(l);if(e.kind!=="fork")return g;let p=e.root,{id:h,parentId:v}=p,m=p.subscribe(()=>{if(p.id===h&&p.parentId===v)return;h=p.id,v=p.parentId,l()});return()=>{g(),m()}},setCwd(l){d.update({project:{cwd:l}})},withProject(l){return an({kind:"fork",root:d.root},O(o.project,l))},update(l){let g=l.project===void 0?o.project:l.project===null?null:O(o.project,l.project),p=!1;if(l.id!==void 0||"parentId"in l){if(e.kind==="fork")throw Error("A withProject fork cannot re-identify the session \u2014 update the root session instead");if(l.id!==void 0&&l.id!==e.id)e.id=l.id,p=!0;if("parentId"in l&&l.parentId!==e.parentId)e.parentId=l.parentId,p=!0}if(g?.originalCwd!==o.project?.originalCwd||g?.projectRoot!==o.project?.projectRoot||g?.cwd!==o.project?.cwd)o.project=g,p=!0;if(p)r.emit()}};return d}
class je{#e=!1;#t=null;#n=!1;#o=void 0;#r=!1;#i=!1;#l=!1;#d=!1;#s=void 0;#u=!1;#a=!1;#c=null;#g=null;#p=new Map;#f="cli";#m="fresh";#h=void 0;#b=!1;#k=!1;#S=[];#v=!1;#y=!1;#x=!1;#C=new Set;#R=!1;#T="none";#A=!1;#w=!1;#P=!1;#M=!1;#L=void 0;#I=void 0;#O=!1;#F=!1;#E=!1;#D=null;#H=!0;#B=null;#j=!1;#U=null;#_=!1;#q=!1;#W={};#G=null;#N="none";#K=void 0;isInteractive(){return this.#e}replaceIsInteractive(e){this.#e=e}printOutputFormat(){return this.#t}replacePrintOutputFormat(e){this.#t=e}thinkingDisplayExplicit(){return this.#n}replaceThinkingDisplayExplicit(e){this.#n=e}permissionPromptToolName(){return this.#o}replacePermissionPromptToolName(e){this.#o=e}hasStreamingInput(){return this.#r}replaceHasStreamingInput(e){this.#r=e}singleShotPrintSession(){return this.#i}replaceSingleShotPrintSession(e){this.#i=e}printInputClosed(){return this.#l}markPrintInputClosed(){this.#l=!0}modelOverrideOptOutForSession(){return this.#d}replaceModelOverrideOptOutForSession(e){this.#d=e}rendererMode(){return this.#s}replaceRendererMode(e){this.#s=e}strictToolResultPairing(){return this.#u}replaceStrictToolResultPairing(e){this.#u=e}restrictedSession(){return this.#a}replaceRestrictedSession(e){this.#a=e}workspaceRestrictionState(){return this.#c}replaceWorkspaceRestrictionState(e){this.#c=e}replaceWorkspaceRestrictionUnsubscribe(e){this.#g?.(),this.#g=e}restrictedWorkspaceRoots(){return this.#p}addRestrictedWorkspaceRoot(e,t){this.#p.set(e,t)}clearRestrictedWorkspaceRoots(){this.#p=new Map}clientType(){return this.#f}replaceClientType(e){this.#f=e}sessionStartType(){return this.#m}replaceSessionStartType(e){this.#m=e}questionPreviewFormat(){return this.#h}replaceQuestionPreviewFormat(e){this.#h=e}extendedQuestionsEnabled(){return this.#b}replaceExtendedQuestionsEnabled(e){this.#b=e}questionOptionDescriptionsOptional(){return this.#k}replaceQuestionOptionDescriptionsOptional(e){this.#k=e}replConfigArgv(){return this.#S}replaceReplConfigArgv(e){this.#S=e}userMsgOptIn(){return this.#v}replaceUserMsgOptIn(e){this.#v=e}searchToolsOptIn(){return this.#y}replaceSearchToolsOptIn(e){this.#y=e}todoToolsOptIn(){return this.#x}replaceTodoToolsOptIn(e){this.#x=e}toolsOmittedByLaunchList(){return this.#C}replaceToolsOmittedByLaunchList(e){this.#C=e}wizardOperatorToolsEnabled(){return this.#R}replaceWizardOperatorToolsEnabled(e){this.#R=e}pollEventIngress(){return this.#T}markPollEventIngress(e){this.#T=e}ownEventDeliveryRequested(){return this.#A}markOwnEventDeliveryRequested(){this.#A=!0}sdkAgentProgressSummariesEnabled(){return this.#w}replaceSdkAgentProgressSummariesEnabled(e){this.#w=e}sessionPersistenceDisabled(){return this.#P}replaceSessionPersistenceDisabled(e){this.#P=e}diskless(){return this.#M}replaceDiskless(e){this.#M=e}ccrSessionUrl(){return this.#L}replaceCcrSessionUrl(e){this.#L=e}ccrDerivedSurface(){return this.#I}replaceCcrDerivedSurface(e){this.#I=e}sessionBypassPermissionsMode(){return this.#O}replaceSessionBypassPermissionsMode(e){this.#O=e}disableSlashCommands(){return this.#F}replaceDisableSlashCommands(e){this.#F=e}disableFileMentions(){return this.#E}replaceDisableFileMentions(e){this.#E=e}sessionUploadsDir(){return this.#D}replaceSessionUploadsDir(e){this.#D=e}mayForwardHomeSettings(){return this.#H}replaceMayForwardHomeSettings(e){this.#H=e}homeSettingsHostConsent(){return this.#B}replaceHomeSettingsHostConsent(e){this.#B=e}scheduledTasksEnabled(){return this.#j}replaceScheduledTasksEnabled(e){this.#j=e}initJsonSchema(){return this.#U}replaceInitJsonSchema(e){this.#U=e}cliSessionConfigCarried(){return this.#_}replaceCliSessionConfigCarried(e){this.#_=e}forkRestrictedLaunchConfig(){return this.#q}replaceForkRestrictedLaunchConfig(e){this.#q=e}forkReplayLaunchConfig(){return this.#W}spareClaimState(){return this.#N}replaceSpareClaimState(e){this.#N=e}spareParkedAtMs(){return this.#K}replaceSpareParkedAtMs(e){this.#K=e}replaceForkReplayLaunchConfig(e){this.#W=e}projectConfigRoot(){return this.#G}replaceProjectConfigRoot(e){this.#G=e}reset(){this.#e=!1,this.#t=null,this.#N="none",this.#K=void 0,this.#n=!1,this.#o=void 0,this.#r=!1,this.#i=!1,this.#l=!1,this.#d=!1,this.#s=void 0,this.#u=!1,this.#a=!1,this.#c=null,this.replaceWorkspaceRestrictionUnsubscribe(null),this.#p=new Map,this.#f="cli",this.#m="fresh",this.#h=void 0,this.#b=!1,this.#k=!1,this.#S=[],this.#v=!1,this.#y=!1,this.#x=!1,this.#C=new Set,this.#R=!1,this.#T="none",this.#A=!1,this.#w=!1,this.#P=!1,this.#M=!1,this.#L=void 0,this.#I=void 0,this.#O=!1,this.#F=!1,this.#E=!1,this.#D=null,this.#H=!0,this.#B=null,this.#j=!1,this.#U=null,this.#_=!1,this.#q=!1,this.#W={},this.#G=null}}
class Ue{#e=void 0;#t=[];#n=void 0;#o=void 0;#r=null;#i=null;#l=!1;#d=ln();#s=null;#u=!1;flagSettingsPath(){return this.#e}replaceFlagSettingsPath(e){this.#e=e}flagAgentsFilePaths(){return this.#t}replaceFlagAgentsFilePaths(e){this.#t=e}flagSettingsExpectedContent(){return this.#n}replaceFlagSettingsExpectedContent(e){this.#n=e}flagSettingsFilePinnedContent(){return this.#o}replaceFlagSettingsFilePinnedContent(e){this.#o=e}flagSettingsInline(){return this.#r}replaceFlagSettingsInline(e){this.#r=e}parentManagedSettings(){return this.#i}replaceParentManagedSettings(e){this.#i=e}parentManagedSettingsInvalid(){return this.#l}replaceParentManagedSettingsInvalid(e){this.#l=e}allowedSettingSources(){return this.#d}replaceAllowedSettingSources(e){this.#d=e}allowedSettingSourcesWithoutRepoDirSources(){let e=this.#d;if(this.#s?.of!==e)this.#s={of:e,result:e.filter((t)=>t!=="projectSettings"&&t!=="localSettings")};return this.#s.result}useCoworkPlugins(){return this.#u}replaceUseCoworkPlugins(e){this.#u=e}reset(){this.#e=void 0,this.#t=[],this.#n=void 0,this.#o=void 0,this.#r=null,this.#i=null,this.#l=!1,this.#d=ln(),this.#s=null,this.#u=!1}}
function ln(){return["userSettings","projectSettings","localSettings","flagSettings","policySettings"]}
class _e{#e=[];#t=[];#n=[];#o=void 0;#r=new Map;#i=new Map;#l=[];#d=[];#s=!1;#u=void 0;#a=void 0;#c=void 0;inlinePlugins(){return this.#e}replaceInlinePlugins(e){this.#e=e}inlinePluginsNoMcp(){return this.#t}replaceInlinePluginsNoMcp(e){this.#t=e}inlinePluginUrls(){return this.#n}replaceInlinePluginUrls(e){this.#n=e}syncedPluginDirs(){return this.#o??[]}syncedPluginDirsRegistered(){return this.#o!==void 0}syncedPluginAttestation(e){return this.#r.get(e)}replaceSyncedPluginDirs(e,t=new Map){this.#o=e,this.#r=t,this.#i=this.#g(this.#i)}clearSyncedPluginDirs(){this.#o=void 0,this.#r=new Map,this.#i=new Map}attestedOfficialPluginMarketplace(e){return this.#i.get(e)}replaceAttestedOfficialPluginIds(e){this.#i=this.#g(e)}#g(e){let t=new Set([...this.#r.values()].map((o)=>`${o.pluginName}@${o.marketplace}`));return new Map([...e].filter(([o,r])=>t.has(`${o.slice(0,o.lastIndexOf("@"))}@${r}`)))}additionalDirectoriesForClaudeMd(){return this.#l}replaceAdditionalDirectoriesForClaudeMd(e){this.#l=e}allowedChannels(){return this.#d}replaceAllowedChannels(e){this.#d=e}hasDevChannels(){return this.#s}replaceHasDevChannels(e){this.#s=e}sessionSkillAllowlist(){return this.#u}replaceSessionSkillAllowlist(e){this.#u=e}chromeFlagOverride(){return this.#a}replaceChromeFlagOverride(e){this.#a=e}teammateAgentId(){return this.#c}replaceTeammateAgentId(e){this.#c=e}reset(){this.#e=[],this.#t=[],this.#n=[],this.clearSyncedPluginDirs(),this.#l=[],this.#d=[],this.#s=!1,this.#u=void 0,this.#a=void 0,this.#c=void 0}}
class qe{#e=null;#t=null;modelStrings(){return this.#e}replaceModelStrings(e){this.#e=e}invalidate(){this.#e=null}admin3PSteeringSnapshot(){return this.#t}recordAdmin3PSteeringSnapshot(e){this.#t=e}reset(){this.#e=null,this.#t=null}}
var dn=[];
class Ge{#e=[];#t=[];#n=void 0;errorLog(){return this.#e}recordError(e){if(this.#e.length>=100)this.#e.shift();this.#e.push(e)}recordSlowOperation(e,t){return}slowOperations(){if(this.#t.length===0)return dn;let e=Date.now();if(this.#t.some((t)=>e-t.timestamp>=1e4)){if(this.#t=this.#t.filter((t)=>e-t.timestamp<1e4),this.#t.length===0)return dn}return this.#t}recordDevBarAlert(e){return}devBarAlert(){let e=this.#n;if(e&&Date.now()-e.timestamp>=60000){this.#n=void 0;return}return e}reset(){this.#e=[],this.#t=[],this.#n=void 0}}
function un(){return{rateTokens:null,rateLastRefillMs:null,featureOkLogged:!1,reportedDropReasons:new Set}}
class Ne{#e=null;#t=null;#n=null;#o=null;#r=null;#i=null;#l=null;#d=null;#s=null;#u=null;#a=null;#c=null;#g=null;#p=[];#f=null;#m=un();#h=null;#b=null;#k=null;#S={direct:null,proxied:null};#v=null;#y=null;installMeter(e,t,{omitUnits:o=!1}={}){this.#e=e;let r=(i)=>o?void 0:i;this.#t=t("claude_code.session.count",{description:"Count of CLI sessions started"}),this.#n=t("claude_code.lines_of_code.count",{description:"Count of lines of code modified, with the 'type' attribute indicating whether lines were added or removed and the 'model' attribute indicating which model made the change"}),this.#o=t("claude_code.pull_request.count",{description:"Number of pull requests created"}),this.#r=t("claude_code.commit.count",{description:"Number of git commits created"}),this.#i=t("claude_code.cost.usage",{description:"Cost of the Claude Code session",unit:r("USD")}),this.#l=t("claude_code.token.usage",{description:"Number of tokens used",unit:r("tokens")}),this.#d=t("claude_code.code_edit_tool.decision",{description:"Count of code editing tool permission decisions (accept/reject) for Edit, Write, and NotebookEdit tools"}),this.#s=t("claude_code.active_time.total",{description:"Total active time in seconds",unit:r("s")})}meter(){return this.#e}sessionCounter(){return this.#t}locCounter(){return this.#n}prCounter(){return this.#o}commitCounter(){return this.#r}costCounter(){return this.#i}tokenCounter(){return this.#l}codeEditToolDecisionCounter(){return this.#d}activeTimeCounter(){return this.#s}statsStore(){return this.#u}replaceStatsStore(e){this.#u=e}loggerProvider(){return this.#a}replaceLoggerProvider(e){this.#a=e}eventLogger(){return this.#c}eventLoggerOwner(){return this.#g}attachEventLogger(e,t){if(this.#c=e,this.#g=e?t:null,!e)return;let o=this.#p;if(this.#p=null,o)for(let r of o)e.emit(r)}bufferPendingEvent(e){if(this.#p===null||this.#p.length>=100)return!1;return this.#p.push(e),!0}closeWindow(e){this.#p=null,this.#f=e}windowCloseCause(){return this.#f}isWindowOpen(){return this.#p!==null}hostOtel(){return this.#m}meterProvider(){return this.#h}replaceMeterProvider(e){this.#h=e}tracerProvider(){return this.#b}replaceTracerProvider(e){this.#b=e}cachedTelemetryResource(){return this.#k}replaceCachedTelemetryResource(e){this.#k=e}cachedOtlpHttpAgentFactory(e){return this.#S[e?"proxied":"direct"]}replaceCachedOtlpHttpAgentFactory(e,t){this.#S[e?"proxied":"direct"]=t}inClusterOtlpTrustRoots(){return this.#v}replaceInClusterOtlpTrustRoots(e){this.#v=e}inClusterOtlpAgentFactory(){return this.#y}replaceInClusterOtlpAgentFactory(e){this.#y=e}reset(){this.#e=null,this.#t=null,this.#n=null,this.#o=null,this.#r=null,this.#i=null,this.#l=null,this.#d=null,this.#s=null,this.#u=null,this.#a=null,this.#c=null,this.#g=null,this.#p=[],this.#f=null,this.#m=un(),this.#h=null,this.#b=null,this.#k=null,this.#S={direct:null,proxied:null},this.#v=null,this.#y=null}}
class Ke{#e=void 0;#t=void 0;#n=!1;#o=void 0;#r=void 0;#i=new Set;#l=void 0;#d=null;#s=null;#u=0;#a=!1;#c=()=>!1;#g=null;#p=void 0;#f=null;#m=null;sessionIngressToken(){return this.#e}replaceSessionIngressToken(e){this.#e=e}oauthTokenFromFd(){return this.#t}replaceOauthTokenFromFd(e){this.#t=e}oauthTokenFromBgSnapshot(){return this.#n}replaceOauthTokenFromBgSnapshot(e){this.#n=e}oauthScopesFromFd(){return this.#o}replaceOauthScopesFromFd(e){this.#o=e}apiKeyFromFd(){return this.#r}replaceApiKeyFromFd(e){this.#r=e}descriptorAnnouncementConsumed(e){return this.#i.has(e)}markDescriptorAnnouncementConsumed(e){this.#i.add(e)}gatewayTokenFromDescriptor(){return this.#l}replaceGatewayTokenFromDescriptor(e){this.#l=e}resetFdCredentialState(){this.#e=void 0,this.#t=void 0,this.#n=!1,this.#o=void 0,this.#r=void 0}gatewayAuth(){return this.#d}replaceGatewayAuth(e){this.#d=e}gatewayServerProcess(){return this.#a}replaceGatewayServerProcess(e){this.#a=e}gatewayRequiredByHostPolicy(){return this.#c()}replaceGatewayRequiredByHostPolicyReader(e){this.#c=e}authenticatedAccount(){return this.#s}authenticatedAccountEpoch(){return this.#u}stampAuthenticatedAccount(e){let t=this.#s;if(e!==null&&t!==null&&e.accountUuid===t.accountUuid&&e.emailAddress===t.emailAddress&&e.organizationUuid===t.organizationUuid)return;this.#u+=1,this.#s=e}startupPolicySnapshot(){return this.#p}replaceStartupPolicySnapshot(e){this.#p=e}gatewayRefreshInFlight(){return this.#g}replaceGatewayRefreshInFlight(e){this.#g=e}sdkOAuthTokenRefreshCallback(){return this.#f}replaceSdkOAuthTokenRefreshCallback(e){this.#f=e}hostAuthTokenRefreshCallback(){return this.#m}replaceHostAuthTokenRefreshCallback(e){this.#m=e}resetForTests(){this.#e=null,this.#t=null,this.#n=!1,this.#o=void 0,this.#r=null,this.#i.clear(),this.#l=void 0,this.#d=null,this.#s=null,this.#u=0,this.#a=!1,this.#c=()=>!1,this.#g=null,this.#p=void 0,this.#f=null,this.#m=null}}
class Ve{#e=void 0;#t=!1;#n=!1;#o;directConnectServerUrl(){return this.#e}replaceDirectConnectServerUrl(e){this.#e=e}connectNonBlocking(){return this.#t}replaceConnectNonBlocking(e){this.#t=e}strictConfig(){return this.#n}replaceStrictConfig(e){this.#n=e}registerEnsureConnectedClient(e){this.#o=e}ensureConnectedClient(){return this.#o}reset(){this.#e=void 0,this.#t=!1,this.#n=!1}}
class Je{#e=null;#t=new Map;#n=new Map;#o=new Set;#r=new Map;#i=!1;#l=!1;#d=!1;#s=!1;#u=!1;#a=!1;#c=!1;#g=!1;#p=!1;#f=new Set;#m=!1;#h=!1;#b=!1;#k=!1;#S=new Map;#v=void 0;#y=void 0;#x=!1;#C=void 0;#R=void 0;#T=new Map;#A=new Map;promptCache1hAllowlist(){return this.#e}replacePromptCache1hAllowlist(e){this.#e=e}thinkingTypeOverrides(){return this.#t}recordThinkingTypeOverride(e,t){this.#t.set(e,t)}servedModelsByRequestedModel(){return this.#n}recordServedModels(e,t){this.#n.set(e,t)}effortUnsupportedModels(){return this.#o}markEffortUnsupported(e){this.#o.add(e)}refusedBetas(e){return this.#r.get(e)??[]}markBetaRefused(e,t){let o=this.#r.get(e);if(o)o.add(t);else this.#r.set(e,new Set([t]))}midConvCachePromotionRejected(){return this.#i}markMidConvCachePromotionRejected(){this.#i=!0}perTurnEffortOkEmitted(){return this.#l}markPerTurnEffortOkEmitted(){this.#l=!0}lateToolAdditionsOkEmitted(){return this.#d}markLateToolAdditionsOkEmitted(){this.#d=!0}toolResultScreeningOkEmitted(){return this.#s}markToolResultScreeningOkEmitted(){this.#s=!0}toolChangeHeaderRefused(){return this.#u}markToolChangeHeaderRefused(){this.#u=!0}inlineToolsRefused(){return this.#a}markInlineToolsRefused(){this.#a=!0}inlineToolsOkEmitted(){return this.#c}markInlineToolsOkEmitted(){this.#c=!0}thinkingResumptionRefused(){return this.#g}markThinkingResumptionRefused(){this.#g=!0}thinkingHighlightsRefused(){return this.#p}markThinkingHighlightsRefused(){this.#p=!0}toolChangeUnsupportedModels(){return this.#f}markToolChangeUnsupportedModel(e){this.#f.add(e)}internalModelFieldsRefused(){return this.#m}markInternalModelFieldsRefused(){this.#m=!0}internalModelFieldsRefusalAnnounced(){return this.#h}markInternalModelFieldsRefusalAnnounced(){this.#h=!0}thirdPartyServerClassifierRefused(){return this.#b}markThirdPartyServerClassifierRefused(){this.#b=!0}threadsHeldForServerClassifier(){return this.#k}markThreadsHeldForServerClassifier(){this.#k=!0}autoModeUnavailableResponse(e){return this.#S.get(e)}autoModeUnavailableResponsesInARow(e){let t=0;for(let o of this.#S.values())if(o.runKey===e)t++;return t}noteAutoModeUnavailableResponse(e,t){this.#S.set(e,t)}clearAutoModeUnavailableResponses(e){for(let[t,o]of this.#S)if(o.runKey===e)this.#S.delete(t)}setAutoModeUnavailableStopNotice(e){this.#v=e}autoModeUnavailableStopNotice(){return this.#v}setLocalCommandExitCode(e){this.#y=e}localCommandExitCode(){return this.#y}observedGateway(){return this.#C}serverClassifierFallbackChoice(){return this.#R}setServerClassifierFallbackChoice(e){this.#R=e}clearServerClassifierFallbackChoice(){this.#R=void 0}noteObservedGateway(e){this.#C??=e}takeServerClassifierFallbackAnnouncement(){if(!this.#b||this.#x)return!1;return this.#x=!0,!0}inferenceProfileBackingModels(){return this.#T}recordInferenceProfileBackingModel(e,t){this.#T.set(e,t)}foundryDeploymentCapabilities(){return this.#A}reset(){this.#e=null,this.#t=new Map,this.#n=new Map,this.#o=new Set,this.#r=new Map,this.#i=!1,this.#l=!1,this.#d=!1,this.#s=!1,this.#u=!1,this.#a=!1,this.#c=!1,this.#g=!1,this.#p=!1,this.#f=new Set,this.#m=!1,this.#h=!1,this.#b=!1,this.#k=!1,this.#S.clear(),this.#v=void 0,this.#y=void 0,this.#x=!1,this.#C=void 0,this.#R=void 0,this.#T=new Map,this.#A=new Map}}
class ze{#e=!1;#t=!1;longContext1mCreditsBlocked(){return this.#e}replaceLongContext1mCreditsBlocked(e){this.#e=e}fableCreditsRequired(){return this.#t}replaceFableCreditsRequired(e){this.#t=e}reset(){this.#e=!1,this.#t=!1}}
class Qe{#e=!1;#t=!1;#n=cn;#o=Me();selectorGate(){return this.#e}selectorGateEverOn(){return this.#t}replaceSelectorGate(e){this.#e=e,this.#t||=e}inheritSelectorGateEverOn(){this.#t=!0}resampleSelectorGate(e){let t=this.#e;if(this.#e=e,this.#t||=e,t!==e)this.#o.emit(e)}subscribeSelectorGateChanged(e){return this.#o.subscribe(e)}replaceHostGateSubscription(e){let t=this.#n;this.#n=e,t()}dropHostGateSubscription(){this.replaceHostGateSubscription(cn)}}
function cn(){}
class Xe{started=!1;stagingReaped=!1;claim(){if(this.started)return!1;return this.started=!0,!0}claimStagingReap(){if(this.stagingReaped)return!1;return this.stagingReaped=!0,!0}}
class Ye{clock;backgroundHousekeeping;launchOptions;settingsSource;extensionsConfig;modelStringsCache;diagnostics;telemetryHandles;credentialSlots;mcpProcessWiring;requestLatches;accountCreditLatches;proactivity;constructor(e){this.clock=e.clock,this.backgroundHousekeeping=e.backgroundHousekeeping,this.launchOptions=e.launchOptions,this.settingsSource=e.settingsSource,this.extensionsConfig=e.extensionsConfig,this.modelStringsCache=e.modelStringsCache,this.diagnostics=e.diagnostics,this.telemetryHandles=e.telemetryHandles,this.credentialSlots=e.credentialSlots,this.mcpProcessWiring=e.mcpProcessWiring,this.requestLatches=e.requestLatches,this.accountCreditLatches=e.accountCreditLatches,this.proactivity=e.proactivity}}
function pn(){return new Ye({clock:new mtr,backgroundHousekeeping:new Xe,launchOptions:new je,settingsSource:new Ue,extensionsConfig:new _e,modelStringsCache:new qe,diagnostics:new Ge,telemetryHandles:new Ne,credentialSlots:new Ke,mcpProcessWiring:new Ve,requestLatches:new Je,accountCreditLatches:new ze,proactivity:new Qe})}
function Ui(e=S7r()){return ter({host:pn(),id:LEn()??mpe(),project:{originalCwd:e,projectRoot:e,cwd:e}})}
var S=Ui(fKo);
function j(){return {...n(),host:getSecureStorageExecutionHost()}}
function n(){return b()?.session??S}
function vs(e){return e.of(S.host)}
function c(){let e=b();return e?.session?void 0:e}
var b=()=>{return};
function V(){return c()?.sessionId??n().id}
function bn(){return n().host.launchOptions.diskless()}
return {V,bn,j,q,vs};
}
function make_chunk_gxp5am6q({R,Wo,u}){
var N=/^[+-]?(\d+(\.\d*)?|\.\d+)[eE][+-]?\d+$/;
var E=/^[+-]?\d{1,3}([_,\u00A0\u202F ])\d{3}(?:\1\d{3})*$/;
var c=/[_,\u00A0\u202F ]/g;
function m(e){if(e.length<=32){if(N.test(e)){let n=Number(e);return Number.isInteger(n)?n:NaN}if(E.test(e))return parseInt(e.replace(c,""),10)}return}
function rc(e){let n=String(e).trim();return m(n)??parseInt(n,10)}
function o(){return process.env.CLAUDE_CONFIG_DIR}
var we=Wo(()=>(o()??u(R(),".claude")).normalize("NFC"),o);
return {rc,we};
}
function make_chunk_9mppm73b({}){
function v(e,t,n){if(e.destroyed||e.writableEnded)return!1;return e.write(t,n),!0}
function vF(e){v(process.stderr,e)}
return {vF};
}
function make_chunk_1mbxc6eg({}){
var u="\\p{Default_Ignorable_Code_Point}\\u2800";
var a8=`\\p{Cc}\\p{Cf}\\p{Cs}\\p{Co}\\p{Cn}\\u2028\\u2029${u}`;
var fpe=String.raw`\u00ad\u034f\u061c\u115f\u1160\u17b4\u17b5\u180b-\u180f\u200b-\u200f\u202a-\u202e\u2060-\u206f\u2800\u3164\ufe00-\ufe0f\uffa0\ufff0-\ufffb\uDC00-\uDFFF\uDB40-\uDB43`;
var s=String.raw`\u0600-\u0605\u06dd\u070f\u0890\u0891\u08e2`;
var q2e=`[${fpe}${s}\\ufeff]*`;
function zbe(e){return e.replace(/([a-z)])(?=[a-z(\[])/gi,`$1${q2e}`).replace(/\[_-\]\?/g,`(?:[_-]${q2e})?`)}
var f=new RegExp(`[\\p{Cf}\\p{Co}\\p{Cn}\\u2028\\u2029\\u007F-\\u009F${u}]`,"gu");
function CF(e){return e.replace(f,(n)=>Array.from({length:n.length},(r,t)=>`\\u${n.charCodeAt(t).toString(16).padStart(4,"0")}`).join(""))}
function b_t(e){return e.split("").map((n)=>"\\u"+n.charCodeAt(0).toString(16).padStart(4,"0")).join("")}
return {CF,a8,b_t,fpe,q2e,zbe};
}
function make_chunk_6r5kgkzy({}){
function bu(t){return t.charAt(0).toUpperCase()+t.slice(1)}
return {bu};
}
function make_chunk_yx145v00({Ar,Bt,CF,Ct,DO,Dr,Er,F,G,Ht,Ke,Le,Lr,Me,Or,Ot,Pn,Pr,Rr,Sr,Tr,Tt,UQ,V,X,_s,a8,ar,b8,b_t,bn,bu,d,ea,fpe,gS,j,kP,kr,m,or,owe,pl,q,q2e,rK,s_,ta,ua,ur,v,vF,vr,vs,we,wr,wy,xF,xn,xr,z,zbe,ze}){
var Bu={home:(e)=>({space:"home",path:e}),workspace:(e)=>({space:"workspace",path:e}),system:(e)=>({space:"system",path:e}),userNamed:(e)=>({space:"userNamed",path:e})};
var Ee=globalThis.process?.getBuiltinModule?.("async_hooks");
var qe=Ee!==void 0;
var ve=Ee?new Ee.AsyncLocalStorage:{run:(e,n)=>n(),getStore:()=>{return}};
function Re({writeBatch:e,sizeOf:n,flushIntervalMs:r=1000,maxBufferSize:s=100,maxBufferBytes:i=1/0,immediateMode:o=!1}){let a=[],u=0,l=null,c=null;function f(){if(l)clearTimeout(l),l=null}function p(b){try{e(b)}catch{}}function k(){if(c)p(c),c=null;if(a.length===0)return;p(a),a=[],u=0,f()}function y(){if(!l)l=setTimeout(k,r)}function h(){if(c){c.push(...a),a=[],u=0,f();return}let b=a;a=[],u=0,f(),c=b,setImmediate(()=>{let g=c;if(c=null,g)p(g)})}return{write(b){if(o){p([b]);return}if(a.push(b),u+=n(b),y(),a.length>=s||u>=i)h()},flush:k,dispose(){k()}}}
function en(e){if(typeof e==="function")return e;if(Symbol.asyncDispose in e)return()=>e[Symbol.asyncDispose]();return()=>e[Symbol.dispose]()}
class Ae{#e=new Set;#t=!1;get drainStarted(){return this.#t}register(e){let n=en(e);this.#e.add(n);let r=()=>{this.#e.delete(n)};return Object.assign(r,{[Symbol.dispose]:r})}async drain(){this.#t=!0;let e=Array.from(this.#e);this.#e.clear();let r=(await Promise.allSettled(e.map(async(s)=>s()))).find((s)=>s.status==="rejected");if(r!==void 0)throw r.reason}async[Symbol.asyncDispose](){await this.drain()}get sizeForTesting(){return this.#e.size}}
class et{cleanup=new Ae;preExitFlush=new Ae}
var tn=new q(()=>new et);
function ne(){return vs(tn)}
function _t(e){return ne().cleanup.register(e)}
class nt{parsed=new Map;lookup(e){return this.parsed.get(e)}remember(e,n){this.parsed.set(e,n)}reset(){this.parsed.clear()}}
var tt=new nt;
function it(e){let n=tt.lookup(e);if(n!==void 0)return n;let r=nn(e);return tt.remember(e,r),r}
function nn(e){if(!e||e.trim()==="")return null;let n=e.split(",").map((o)=>o.trim()).filter(Boolean);if(n.length===0)return null;let r=n.some((o)=>o.startsWith("!")),s=n.some((o)=>!o.startsWith("!"));if(r&&s)return null;let i=n.map((o)=>o.replace(/^!/,"").toLowerCase());return{include:r?[]:i,exclude:r?i:[],isExclusive:r}}
function rn(e){let n=[],r=e.match(/^MCP server ["']([^"']+)["']/);if(r&&r[1])n.push("mcp"),n.push(r[1].toLowerCase());else{let o=e.match(/^([^:[]+):/);if(o&&o[1])n.push(o[1].trim().toLowerCase())}let s=e.match(/^\[([^\]]+)]/);if(s&&s[1])n.push(s[1].trim().toLowerCase());if(e.toLowerCase().includes("1p event:"))n.push("1p");let i=e.match(/:\s*([^:]+?)(?:\s+(?:type|mode|status|event))?:/);if(i&&i[1]){let o=i[1].trim().toLowerCase();if(o.length<30&&!o.includes(" "))n.push(o)}return Array.from(new Set(n))}
function sn(e,n){if(!n)return!0;if(e.length===0)return!1;if(n.isExclusive)return!e.some((r)=>n.exclude.includes(r));else return e.some((r)=>n.include.includes(r))}
function ot(e,n){if(!n)return!0;let r=rn(e);return sn(r,n)}
function at(e){let n=new Int32Array(e.length);for(let r=0;r<e.length;r++)n[r]=r;return{text:e,origin:n}}
function ut(e,n,r){let s=[];for(let i of e.text.matchAll(n)){let{keep:o,insert:a,keepEnd:u=0}=r(i),l=i.index??0,c=i[0].length,f=Math.min(Math.max(o|0,0),c),p=Math.min(Math.max(u|0,0),c-f);s.push([l+f,l+c-p,a])}return ie(e,s)}
function ie(e,n){if(n.length===0)return e;let{text:r,origin:s}=e,i=r.length;for(let[c,f,p]of n)i+=p.length-(f-c);let o=new Int32Array(i),a=[],u=0,l=0;for(let[c,f,p]of n)a.push(r.slice(u,c)),o.set(s.subarray(u,c),l),l+=c-u,a.push(p),o.fill(-1,l,l+p.length),l+=p.length,u=f;return a.push(r.slice(u)),o.set(s.subarray(u),l),{text:a.join(""),origin:o}}
var on=/\s/g;
var an=/[\n\r\u2028\u2029]/g;
var un=/(?:@|%40)(?:\[|%5B)/gi;
var ln=/\]|%5D/gi;
var cn=/(?:^|[^A-Za-z0-9+.-])(?:https?|wss?|ftps?)$/i;
var dn=/(?:^|[^A-Za-z0-9+.-])(?:ssh|git|git\+ssh|ssh\+git)$/i;
var fn=/[,;|&]/g;
var gn=/(?:^|[^A-Za-z0-9+.-])[A-Za-z][A-Za-z0-9+.-]{0,31}$/;
var hn=/["'`|,;&<>()[\]\\@/?#]|%40|%5B/i;
var pn=/["'`]/;
var mn=/[;|&\n]/g;
function yn(e){let n=[],r=[],s=C(e,on),i=C(e,/\//g),o=Oe(e,un),a=C(e,ln),u=C(e,/\//g),l=C(e,mn),c=C(e,/[/?#]/g),f=C(e,fn),p=C(e,/@/g),k=C(e,/%40/gi),y=C(e,/\[REDACTED|\*\*\*:\*\*\*/g),h=C(e,/[:%]/g),b=C(e,/["'`,;|&<>{}()]/g),g=dt(e,!1),A=dt(e,!0);for(let w=e.indexOf("://");w!==-1;){let x=w+3,D,R=e.indexOf("://",x),W=s(x),I=p(x),L;if(cn.test(e.slice(Math.max(0,w-8),w))){let T=Math.min(c(x),W),M=Math.min(f(x),T);if(L=I<T?Math.max(g(x,T),A(I,T)):Math.max(g(x,Math.min(i(x),W)),A(x,M)),L<=x){let O=Math.min(T,l(x));r.push({start:x,fieldEnd:Math.min(M,O),lastEncodedAt:A(x,O)})}}else{let T=Math.min(i(x),W),M=Math.min(W,R===-1?e.length:R),O=dn.test(e.slice(Math.max(0,w-8),w))?o(x):null;if(O!==null&&O.index<M){let E=a(O.index+O[0].length);if(E<W)D=E,T=Math.max(T,Math.min(u(E),W))}L=Math.max(g(x,T),A(x,T))}if(L>x)n.push({start:x,end:L,separatorEnd:L+(e[L]==="@"?1:3),loginEnd:I<=L?I:Math.min(k(x),L),bracketClose:D});else{let T=y(x);if(T>x&&T<Math.min(W,i(x),b(x))&&h(x)<T)n.push({start:x,end:T,separatorEnd:T,loginEnd:T})}w=R}return{spans:n,hostParts:r}}
function ft(e,n){let{spans:r,hostParts:s}=yn(e);if(r.length===0&&s.length===0)return[];let i=C(e,/[\s"'>}|,;&`)\]]/g),o=C(e,/\s/g),a=[],u=[];for(let y of r)a.push({start:y.start,end:y.end,loginEnd:y.loginEnd}),u.push({...y,userinfo:y});let l=oe(e,n);for(let y of s){let h=l(y.start)[0];if(h&&h.keyStart<y.fieldEnd&&e.slice(y.start,h.keyStart).includes("%")){let b=y.lastEncodedAt>h.keyStart?y.lastEncodedAt:h.valueStart;a.push({start:y.start,end:b,loginEnd:b}),u.push(b>h.valueStart?{start:y.start,end:b,userinfo:{start:y.start,end:b,separatorEnd:b+3,loginEnd:b}}:{start:y.start,end:b})}}if(u.length===0)return[];a.sort((y,h)=>y.start-h.start);let c=oe(e,n),f=0;for(let y=0,h=c(y);h[0]!==void 0;){let b,g=null;for(let w of h)if(g=w.valueEnd(),g!==null){b=w;break}if(b===void 0||g===null){y=h[0].keyStart+1,h=c(y);continue}while(f<a.length&&a[f].start<=b.keyStart)f++;let A=a[f];if(A!==void 0&&A.start<g){let w=e[b.valueStart]??"",D=(w==='"'||w==="'")&&g-1>b.valueStart&&e[g-1]===w?Math.max(g,A.end):o(Math.max(g,A.end,i(A.loginEnd+1)));u.push({start:b.valueStart,end:D})}y=g,h=c(y)}let p={nextKey:oe(e,n),plainKeys:oe(e,n),nextLineEnd:C(e,an),span:0,lineEnd:-1,resumeAt:0,overflowEnd:En(e,()=>p.lineEnd)},k=[];for(let y of vn(u)){let h=k.at(-1);k.push(h!==void 0&&y.start<h.end?ct(e,{start:k.pop().start,end:Math.max(h.end,y.end)},p):ct(e,y,p))}return k.map((y)=>y.userinfo?y:wn(e,y))}
var lt=new WeakMap;
function kn(e){let n=lt.get(e);if(!n)n={word:new RegExp(e.word,"gi"),notTail:new RegExp(`(?!${e.tail})[^]`,"gi"),separator:new RegExp(e.separator,"iy"),value:new RegExp(e.value,"iy")},lt.set(e,n);return n}
function oe(e,n){let r=n.map((s)=>{let{word:i,notTail:o,separator:a,value:u}=kn(s),l=Oe(e,i),c=C(e,o),f=-1,p=-1,k=-1,y=null,h=(w)=>{if(w!==k)k=w,u.lastIndex=w,y=u.test(e)?u.lastIndex:null;return y},b=(w)=>{if(w!==f)f=w,a.lastIndex=w,p=a.test(e)?a.lastIndex:-1;return p},g=-1,A=null;return(w)=>{if(g!==-1&&w>=g&&(A===null||w<=A.keyStart))return A;g=w,A=null;for(let x=l(w);x!==null;){let D=x.index+x[0].length,R=b(s.tail?c(D):D);if(R!==-1){A={keyStart:x.index,valueStart:R,valueEnd:()=>h(R)};break}x=l(x.index+1)}return A}});return(s)=>{let i=[];for(let o of r){let a=o(s);if(a&&(!i[0]||a.keyStart<=i[0].keyStart))i=i[0]&&a.keyStart===i[0].keyStart?[...i,a]:[a]}return i}}
function ct(e,n,r){if(n.userinfo&&Sn(e,n.userinfo,r))return n;let s=n.end;r.resumeAt=Math.max(r.resumeAt,n.start);for(let i=r.nextKey(r.resumeAt);i[0]!==void 0&&i[0].keyStart<s;){let o=i[0].keyStart;if(o>r.lineEnd){let c=r.nextLineEnd(o);r.span=64*(c-r.lineEnd),r.lineEnd=c}let a=null,u=i[0];for(let c of i)if(a=c.valueEnd(),a!==null){u=c;break}let l=a??u.valueStart;if(r.span-=l-o,r.span<0)return{start:n.start,end:Math.max(s,r.overflowEnd(n.start))};s=Math.max(s,l),r.resumeAt=u.valueStart,i=r.nextKey(r.resumeAt)}return s===n.end?n:{start:n.start,end:s}}
function Sn(e,n,r){if(e[n.end]!=="@"||hn.test(e.slice(n.start,n.end))||!gn.test(e.slice(Math.max(0,n.start-36),n.start-3)))return!1;for(let s=r.plainKeys(n.start);s[0]!==void 0&&s[0].keyStart<n.end;s=r.plainKeys(s[0].keyStart+1))if(s.some((i)=>i.valueStart===n.end))return!1;return!0}
function En(e,n){let r=C(e,/["'`]/g),s=-1,i=e.length;return(o)=>{if(n()!==s)s=n(),i=r(o)<s?e.length:s;return i}}
function wn(e,n){let r=e[n.end-1];if(r===void 0||!pn.test(r))return n;return(e.slice(n.start,n.end).split(r).length-1)%2===1?{start:n.start,end:n.end-1}:n}
function vn(e){e.sort((r,s)=>r.start-s.start||s.end-r.end);let n=[];for(let r of e){let s=n.at(-1);if(s===void 0||r.start>=s.end)n.push(r);else n[n.length-1]={start:s.start,end:Math.max(s.end,r.end)}}return n}
function C(e,n){let r=Oe(e,n);return(s)=>r(s)?.index??e.length}
function Oe(e,n){let r=-1,s=null;return(i)=>{if(r===-1||i<r||s!==null&&i>s.index)n.lastIndex=i,s=n.exec(e),r=i;return s}}
function dt(e,n){let r=null;return(s,i)=>{if(r===null){r=new Int32Array(e.length+1);let a=-1;for(let u=0;u<=e.length;u++){if(n){if(u>=3&&e.startsWith("%40",u-3))a=u-3}else if(u>=1&&e[u-1]==="@")a=u-1;r[u]=a}}let o=r[Math.min(i,e.length)];return o>=s?o:-1}}
var Fe=new RegExp(zbe(String.raw`api[_-]?key|secret|token|password|passwd|credential|bearer|authorization|auth[_-]?header|cookie|session[_-]?(?:id|key)|connection[_-]?string|(?:private|ssh|encryption|signing|access|deploy|master|license)[_-]?key|client[_-]?secret`),"i");
var Pe=`[\\s\\u0085${fpe}]`;
var xt=`(?:${zbe("Bearer|Basic")})[${fpe}]*[\\s\\u0085]+`;
var gt="[^\\s\\u0085,;&}\\])]+";
var ht="(?![\\w\\[({$/+=~!@%^?\\\\-])";
var pt="\\n\\r\\x0b\\x0c\\u0085\\u2028\\u2029";
var K="[\\s\\u0085]";
var de=`"[^"${pt}]*"|'[^'${pt}]*'|"[^"]*"${ht}|'[^']*'${ht}|[^\\s-]{0,4}\\[REDACTED\\]['"\`]?|${xt}(?:\\[REDACTED\\]|${gt})|${gt}`;
var Rn={word:"\\b(?:Bearer|Basic)",tail:"",separator:`${K}+`,value:"[A-Za-z0-9+/=._~-]{20,}"};
var An={word:`(?:${Fe.source})`,tail:"[\\w.-]",separator:`["']?${K}*[=:]${K}*`,value:de};
var Tn={word:"\\b(?:AWS|GOOGLE|GCP|GCLOUD|AZURE)_\\w",tail:"\\w",separator:`${K}*[=:]${K}*`,value:de};
var On=[An,Tn,Rn];
var Ln=["sk","ant","api"].join("-");
var H="[\\w=-]{20,}(?:\\.[0-9a-z]{9})?";
var St=[{id:"url-userinfo",source:`:\\/\\/((["'])[^/@\\s]*\\2(?=@)|(?:[^/@\\s"'|,;&\`]+(?=@))|[^/@\\s"'|,;&\`]*["'|,;&\`][^/@\\s]*@)@?`,confidence:"low"},{id:"gcp-service-account",source:"\\b([a-z0-9-]+@[a-z0-9-]+\\.iam\\.gserviceaccount\\.com)\\b",flags:"i",confidence:"low"},{id:"loose-anthropic-key",source:"\\b(sk-ant-?[\\w-]{10,})",confidence:"low"},{id:"http-auth-scheme",source:`\\b${xt}([A-Za-z0-9+/=._~-]{20,})`,flags:"i",confidence:"low"},{id:"loose-jwt",source:"\\b(eyJ[A-Za-z0-9_-]{10,}\\.[A-Za-z0-9_-]{10,}\\.[A-Za-z0-9_-]{10,})",confidence:"low"},{id:"sensitive-assign",source:`(?:${Fe.source})[\\w.-]*(?:${q2e}["'])?${Pe}*[=:]${K}*(${de})`,flags:"i",confidence:"low"},{id:"cloud-env-var",source:`\\b(?:${zbe("AWS|GOOGLE|GCP|GCLOUD|AZURE")})${q2e}_\\w+${Pe}*[=:]${K}*(${de})`,flags:"i",confidence:"low"},{id:"url-userinfo-tail",source:":\\/\\/(\\[REDACTED\\](?!@|%40[^\\s\"'>}|,;&`)\\]@/]*(?:[\\s\"'>}|,;&`)\\]/]|$))[^\\s\"'>}|,;&`)\\]]*?(?=[\\s\"'>}|,;&`)\\]]|:\\/\\/|$))",confidence:"low"},{id:"url-userinfo-later-at",source:":\\/\\/(\\[REDACTED\\]@(?:[^\\s:/?#\"'>}|,;&`)\\]]|:(?!\\/\\/)){0,256})(?=@|%40)",confidence:"low"},{id:"url-userinfo-encoded",source:":\\/\\/((?:\\[REDACTED\\]@)?(?:(?:[^/?#@\\s\"',;&<>|)\\]{}`[]*[\"'`<>{}[\\]][^/?#@\\s,;&|{}\"'`<>[\\]()]*(?=%40))|[^/?#@\\s\"',;&<>|)\\]}`[]+(?=%40)|(?=[^/?#@\\s\"',;&<>|)\\]}`[]*?(?:%|:[^/?#@\\s\"',;&<>|)\\]}`[]))[^/?#@\\s\"',;&<>|)\\]}`[]+(?=\\[REDACTED\\])))",confidence:"low"},{id:"masked-value-rest",source:"\\[REDACTED\\](\\][^\\s\"'>}|,;&`)\\]]*)",confidence:"low"},{id:"aws-access-token",source:"\\b((?:A3T[A-Z0-9]|AKIA|ASIA|ABIA|ACCA)[A-Z2-7]{16})\\b",confidence:"high"},{id:"gcp-api-key",source:"\\b(AIza[\\w-]{35})(?![\\w-])",confidence:"high"},{id:"google-oauth-client-secret",source:"\\bGOCSPX-[\\w-]{28}(?![\\w-])",confidence:"high"},{id:"azure-ad-client-secret",source:`(?:^|[\\\\'"\\x60\\s>=:(,)])([a-zA-Z0-9_~.]{3}\\dQ~[a-zA-Z0-9_~.-]{31,34})(?:$|[\\\\'"\\x60\\s<),])`,confidence:"high"},{id:"digitalocean-pat",source:`\\b(dop_v1_[a-f0-9]{64})(?:[\\x60'"\\s;]|\\\\[nr]|$)`,confidence:"high"},{id:"digitalocean-access-token",source:`\\b(doo_v1_[a-f0-9]{64})(?:[\\x60'"\\s;]|\\\\[nr]|$)`,confidence:"high"},{id:"anthropic-api-key",source:`\\b(${Ln}03-[a-zA-Z0-9_\\-]{93}AA)(?:[\\x60'"\\s;]|\\\\[nr]|$)`,confidence:"high"},{id:"anthropic-admin-api-key",source:`\\b(sk-ant-admin01-[a-zA-Z0-9_\\-]{93}AA)(?:[\\x60'"\\s;]|\\\\[nr]|$)`,confidence:"high"},{id:"anthropic-oauth-token",source:`\\b(sk-ant-(?:oat|ort)\\d{2}-[\\w-]{20,})(?:[\\x60'"\\s;]|\\\\[nr]|$)`,confidence:"high"},{id:"openai-api-key",source:"sk-[A-Za-z0-9_-]{8,200}T3BlbkFJ[A-Za-z0-9_-]{8,200}",confidence:"high"},{id:"openai-legacy-api-key",source:"\\bsk-[a-zA-Z0-9]{48}(?![a-zA-Z0-9])",confidence:"high"},{id:"huggingface-access-token",source:`\\b(hf_[a-zA-Z]{34})(?:[\\x60'"\\s;]|\\\\[nr]|$)`,confidence:"high"},{id:"supabase-secret-key",source:"\\bsb_secret_[A-Za-z0-9_-]{20,}",confidence:"high"},{id:"supabase-access-token",source:"\\bsbp_[a-z0-9]{40,}",confidence:"high"},{id:"github-pat",source:"ghp_[0-9a-zA-Z]{36}",confidence:"high"},{id:"github-fine-grained-pat",source:"github_pat_\\w{82}",confidence:"high"},{id:"github-app-token",source:"(?:ghu|ghs)_[0-9a-zA-Z]{36}",confidence:"high"},{id:"github-oauth",source:"gho_[0-9a-zA-Z]{36}",confidence:"high"},{id:"github-refresh-token",source:"ghr_[0-9a-zA-Z]{36}",confidence:"high"},{id:"gitlab-pat",source:`glpat-${H}`,confidence:"high"},{id:"gitlab-deploy-token",source:`gldt-${H}`,confidence:"high"},{id:"gitlab-runner-authentication-token",source:`glrt-${H}`,confidence:"high"},{id:"gitlab-oauth-app-secret",source:`gloas-${H}`,confidence:"high"},{id:"gitlab-pipeline-trigger-token",source:`glptt-${H}`,confidence:"high"},{id:"gitlab-kubernetes-agent-token",source:`glagent-${H}`,confidence:"high"},{id:"gitlab-incoming-mail-token",source:`glimt-${H}`,confidence:"high"},{id:"gitlab-scim-oauth-token",source:`glsoat-${H}`,confidence:"high"},{id:"gitlab-ci-build-token",source:`glcbt-${H}`,confidence:"high"},{id:"gitlab-feed-token",source:`glft-${H}`,confidence:"high"},{id:"gitlab-feature-flag-client-token",source:`glffct-${H}`,confidence:"high"},{id:"slack-bot-token",source:"xoxb-[0-9]{10,13}-[0-9]{10,13}[a-zA-Z0-9-]*",confidence:"high"},{id:"slack-user-token",source:"xox[a-z](?:-[0-9]{10,13}){3}-[a-zA-Z0-9-]{28,34}",confidence:"high"},{id:"slack-rotation-token",source:"xoxe(?:\\.xox[a-z])?-[0-9]-[A-Za-z0-9-]{28,}",confidence:"high"},{id:"slack-app-token",source:"xapp-\\d-[A-Z0-9]+-\\d+-[a-z0-9]+",flags:"i",confidence:"high"},{id:"slack-workflow-token",source:"\\bxwfp-[a-zA-Z0-9-]{20,}",confidence:"high"},{id:"slack-webhook-url",source:"(?:https?://)?hooks\\.slack\\.com/(?:services|workflows|triggers)/[A-Za-z0-9+/_-]{40,}",flags:"i",confidence:"high"},{id:"twilio-api-key",source:"SK[0-9a-fA-F]{32}",confidence:"high"},{id:"sendgrid-api-token",source:`\\b(SG\\.[a-zA-Z0-9=_\\-.]{66})(?:[\\x60'"\\s;]|\\\\[nr]|$)`,confidence:"high"},{id:"npm-access-token",source:`\\b(npm_[a-zA-Z0-9]{36})(?:[\\x60'"\\s;]|\\\\[nr]|$)`,confidence:"high"},{id:"pypi-upload-token",source:"pypi-AgEIcHlwaS5vcmc[\\w-]{50,1000}",confidence:"high"},{id:"databricks-api-token",source:`\\b(dapi[a-f0-9]{32}(?:-\\d)?)(?:[\\x60'"\\s;]|\\\\[nr]|$)`,confidence:"high"},{id:"hashicorp-tf-api-token",source:"[a-zA-Z0-9]{14}\\.atlasv1\\.[a-zA-Z0-9\\-_=]{60,70}",confidence:"high"},{id:"pulumi-api-token",source:`\\b(pul-[a-f0-9]{40})(?:[\\x60'"\\s;]|\\\\[nr]|$)`,confidence:"high"},{id:"postman-api-token",source:`\\b(PMAK-[a-fA-F0-9]{24}-[a-fA-F0-9]{34})(?:[\\x60'"\\s;]|\\\\[nr]|$)`,confidence:"high"},{id:"grafana-api-key",source:`\\b(eyJrIjoi[A-Za-z0-9+/]{70,400}={0,3})(?:[\\x60'"\\s;]|\\\\[nr]|$)`,confidence:"high"},{id:"grafana-cloud-api-token",source:`\\b(glc_[A-Za-z0-9+/]{32,400}={0,3})(?:[\\x60'"\\s;]|\\\\[nr]|$)`,confidence:"high"},{id:"grafana-service-account-token",source:`\\b(glsa_[A-Za-z0-9]{32}_[A-Fa-f0-9]{8})(?:[\\x60'"\\s;]|\\\\[nr]|$)`,confidence:"high"},{id:"sentry-user-token",source:`\\b(sntryu_[a-f0-9]{64})(?:[\\x60'"\\s;]|\\\\[nr]|$)`,confidence:"high"},{id:"sentry-org-token",source:"\\bsntrys_eyJpYXQiO[a-zA-Z0-9+/]{10,200}(?:LCJyZWdpb25fdXJs|InJlZ2lvbl91cmwi|cmVnaW9uX3VybCI6)[a-zA-Z0-9+/]{10,200}={0,2}_[a-zA-Z0-9+/]{43}",confidence:"high"},{id:"stripe-access-token",source:`\\b((?:sk|rk)_(?:test|live|prod)_[a-zA-Z0-9]{10,99})(?:[\\x60'"\\s;]|\\\\[nr]|$)`,confidence:"high"},{id:"shopify-access-token",source:"shpat_[a-fA-F0-9]{32}",confidence:"high"},{id:"shopify-shared-secret",source:"shpss_[a-fA-F0-9]{32}",confidence:"high"}];
var Dn=64;
function De(e,n){let r=/-----BEGIN[ A-Z0-9_-]{0,100}?PRIVATE KEY(?: BLOCK)?-----/gi,s=/-----END[ A-Z0-9_-]{0,100}?PRIVATE KEY(?: BLOCK)?-----/gi;r.lastIndex=n;let i=r.exec(e);if(!i)return null;s.lastIndex=i.index+i[0].length+Dn;let o=s.exec(e);if(!o)return null;return{start:i.index,end:o.index+o[0].length}}
function _n(e){return De(e,0)!==null}
function d9r(e){let n=Et(e);if(n.length===0)return e;let r="",s=0;for(let i of n)r+=e.slice(s,i.start)+"[REDACTED]",s=i.end;return r+e.slice(s)}
function Et(e){let n=e.indexOf("-----");while(n!==-1){while(e.charCodeAt(n+5)===45)n++;if((e.charCodeAt(n+5)|32)===98&&(e.charCodeAt(n+6)|32)===101&&(e.charCodeAt(n+7)|32)===103&&(e.charCodeAt(n+8)|32)===105&&(e.charCodeAt(n+9)|32)===110)break;n=e.indexOf("-----",n+5)}let r=[];if(n===-1)return r;for(let s=De(e,n);s;s=De(e,s.end))r.push(s);return r}
var mt=`(?:[\\x60'"\\s;]|\\\\[nr]|$)`;
var yt="(?=[^a-zA-Z0-9_\\-+=]|$)";
var Fn="(?<![a-zA-Z0-9_\\-])";
function Cn(){return St.map((e)=>({id:e.id,confidence:e.confidence,re:new RegExp(e.confidence!=="high"?e.source:Fn+(e.source.endsWith(mt)?e.source.slice(0,-mt.length)+yt:e.source+yt),(e.flags??"").replace("g","")+"g")}))}
function ue(e){return St.map((n)=>({id:n.id,confidence:n.confidence,re:new RegExp(n.source,e?(n.flags??"").replace("g","")+"g":n.flags??"")}))}
function _e(e,n){if(typeof n!=="string")return"[REDACTED]";let r=n.length>=2&&(n[0]==='"'||n[0]==="'")&&n.at(-1)===n[0]?n[0]:"",s=e.lastIndexOf(n);return`${e.slice(0,s)}${r}[REDACTED]${r}${e.slice(s+n.length)}`}
function In(e){let n=e[1];if(typeof n!=="string")return{keep:0,insert:"[REDACTED]"};let r=n.length>=2&&(n[0]==='"'||n[0]==="'")&&n.at(-1)===n[0]?1:0,s=e[0].lastIndexOf(n);return{keep:s+r,insert:"[REDACTED]",keepEnd:e[0].length-s-n.length+r}}
function fe(e){return ft(e,On).map(({start:n,end:r})=>{let s=/^(["'])[^]*\1$/.test(e.slice(n,r))?1:0;return[n+s,r-s]})}
function se(e,n){let{text:r,origin:s}=e,i=[],o=0;for(let a=0;a<r.length;){let u=s[a];while(o<n.length&&n[o][1]<=u)o++;let l=n[o];if(u<0||l===void 0||u<l[0]){a++;continue}let c=a;while(c>0&&s[c-1]<0)c--;while(a<r.length&&(s[a]<0||s[a]>=l[0]&&s[a]<l[1]))a++;let f=i.at(-1);if(f!==void 0&&f[1]>=c)f[1]=a;else i.push([c,a,"[REDACTED]"])}return ie(e,i)}
var Nn=512;
var Hn=512;
class wt{testRules=null;redactRules=null;displayRules=null;resultCache=new Map;scan(e){this.testRules??=ue(!1);let n=[];for(let r of this.testRules)if(r.confidence==="high"&&r.re.test(e))n.push({ruleId:r.id,label:r.id.split("-").map((s)=>ir[s]??bu(s)).join(" ")});if(_n(e))n.push({ruleId:"private-key",label:"Private Key"});return n}redactContext(e){this.redactRules??=ue(!0);let n=d9r(e);for(let r of this.redactRules)if(r.confidence==="low")n=n.replace(r.re,_e);return n}redactTokens(e){this.redactRules??=ue(!0);let n=e;for(let r of this.redactRules)if(r.confidence==="high")n=n.replace(r.re,_e);return n}trackedByRules(e){return this.trackedTokens(this.trackedContext(e))}trackedContext(e){let n=ie(at(e),Et(e).map(({start:r,end:s})=>[r,s,"[REDACTED]"]));return this.trackedRules(n,"low")}trackedTokens(e){return this.trackedRules(e,"high")}trackedRules(e,n){this.redactRules??=ue(!0);let r=e;for(let s of this.redactRules)if(s.confidence===n)s.re.lastIndex=0,r=ut(r,s.re,In);return r}redactWithUrlRanges(e){let n=fe(e);return n.length===0?this.redactTokens(this.redactContext(e)):se(this.trackedByRules(e),n).text}redactTracked(e){return se(this.trackedByRules(e),fe(e))}redact(e){let n=e.length<=Nn;if(n){let s=this.resultCache.get(e);if(s!==void 0)return s}let r=this.redactWithUrlRanges(e);if(n){if(this.resultCache.size>=Hn)this.resultCache.delete(this.resultCache.keys().next().value);this.resultCache.set(e,r)}return r}redactForDisplay(e){this.displayRules??=Cn();let n=e;for(let r of this.displayRules){if(r.confidence!=="high")continue;n=n.replace(r.re,Wn)}return n}}
var B=new wt;
function Rs(e){return B.redact(e)}
var $n=/[$\x60|;&<>()\s]/;
var Un=/[/.@:~*?\\]/;
function Wn(e,n){let r=typeof n==="string"?n:e;if($n.test(r)||Un.test(r))return e;return _e(e,n)}
var ir={aws:"AWS",gcp:"GCP",api:"API",pat:"PAT",ad:"AD",tf:"TF",oauth:"OAuth",npm:"NPM",pypi:"PyPI",jwt:"JWT",ci:"CI",scim:"SCIM",github:"GitHub",gitlab:"GitLab",openai:"OpenAI",digitalocean:"DigitalOcean",huggingface:"HuggingFace",hashicorp:"HashiCorp",sendgrid:"SendGrid"};
var je={verbose:0,debug:1,info:2,warn:3,error:4};
var lr=new RegExp(`(?!\\t)[${a8}]`,"gu");
var cr=10485760;
function dr(e){return Object.hasOwn(je,e)}
function Pt(e){return kP(e)?null:Ct(e)}
function Lt(){}
var fr={sessionId:"",fromBackend:!1};
function Dt(e,n,r,s){let i=z(n,"debug"),o=z(i,`${e.sessionId}.txt`),a;if(r===null)a=o;else if(s!==null&&r===s)a=z(s,`${e.sessionId}.txt`);else a=r;let u=!e.fromBackend&&a===o?"v5":"raw";return{target:a,arm:u,configHome:n,rotate:u==="raw"&&!(X(a)===i&&a.endsWith(".txt")),pointLatest:u==="raw"&&a!==o}}
function Ve(e){return Bu.userNamed(ur(e)?e:Ct(e))}
function gr(e){return e.code==="Failed"&&e.telemetryCode==="ENOENT"}
function hr(e,n=qe){return n?e:void 0}
async function Ft(e,n,r,s){let i={namespace:"log",sessionId:n,channel:"debug"},o=await ve.run(!0,()=>e.append(i,[{data:r}],s?{markLatest:!0}:void 0));if(o.ok)return"landed";return s&&o.error.code==="InvalidArgument"&&o.error.argument==="opts.markLatest"?"refused":"dropped"}
class It{deps;minLevel;filter;toStderr;filePath;runtimeDebugEnabled=!1;hasFormattedOutput=!1;debugFromLaunch;storageV5;writer=null;redirect=null;pendingWrite=Promise.resolve();unflushedChunks=[];backendLinesLogged=0;exiting=!1;exitHandlerRegistered=!1;successor=null;writtenBytes=-1;rotating=!1;resolvedLogPath=null;overrideDirectory=null;rotationTarget=null;latestMarked=!1;latestRefused=!1;constructor(e){this.deps=e;if(this.storageV5=hr(e.storageV5),e.launchIdentity!==void 0){this.minLevel=e.launchIdentity.minLevel,this.filter=e.launchIdentity.filter,this.toStderr=e.launchIdentity.toStderr,this.filePath=e.launchIdentity.filePath,this.debugFromLaunch=e.launchIdentity.debugFromLaunch;return}let n=Array.isArray(e.argv)?e.argv:[],r=n.indexOf("--"),s=r===-1?n:n.slice(0,r),i=e.env.CLAUDE_CODE_DEBUG_LOG_LEVEL?.toLowerCase().trim();this.minLevel=i&&dr(i)?i:"debug";let o=s.find((u)=>u.startsWith("--debug="));this.filter=o?it(o.substring(8)):null,this.toStderr=s.includes("--debug-to-stderr")||s.includes("-d2e");let a=null;for(let u=0;u<s.length;u++){let l=s[u];if(l.startsWith("--debug-file=")){a=Pt(l.substring(13));break}if(l==="--debug-file"&&u+1<s.length){a=Pt(s[u+1]);break}}this.filePath=a,this.debugFromLaunch=Le(e.env.DEBUG)||Le(e.env.DEBUG_SDK)||s.includes("--debug")||s.includes("-d")||this.toStderr||o!==void 0||this.filePath!==null}isDebugMode(){return this.runtimeDebugEnabled||this.debugFromLaunch}drainsSyncAtExit(){return!(F()&&this.storageV5!==void 0&&this.deps.syncExitDrain===!1)}launchIdentity(){return{minLevel:this.minLevel,filter:this.filter,toStderr:this.toStderr,filePath:this.filePath,debugFromLaunch:this.debugFromLaunch,isAnt:this.deps.isAnt,isTestEnvironment:this.deps.isTestEnvironment}}enableDebugLogging(){let e=this.isDebugMode()||this.deps.isAnt;return this.runtimeDebugEnabled=!0,e}logPath(){return this.filePath??(this.overrideDirectory!==null&&this.overrideDirectory===this.deps.env.CLAUDE_CODE_DEBUG_LOGS_DIR?z(this.overrideDirectory,`${this.deps.sessionId()}.txt`):null)??this.resolvedLogPath??this.deps.env.CLAUDE_CODE_DEBUG_LOGS_DIR??this.defaultLogPath()}defaultLogPath(e=this.deps.sessionId()){return z(this.deps.configHomeDir(),"debug",`${e}.txt`)}learnedOverrideDirectory(){return this.overrideDirectory}isArmed(){return this.storageV5!==void 0}log(e,{level:n}={level:"debug"}){if(je[n]<je[this.minLevel])return;if(!this.shouldLog(e))return;let r=Rs(e.trim());r=r.includes(`
`)?CF(S(r)):r.replace(lr,b_t);let i=`${new Date().toISOString()} [${n.toUpperCase()}] ${r}
`;if(this.toStderr){this.deps.writeToStderr(i);return}this.write(i)}write(e){let n=this.getWriter(),r=fr;if(this.storageV5!==void 0){if(r={sessionId:this.deps.sessionId(),fromBackend:ve.getStore()===!0},r.fromBackend)this.backendLinesLogged++}if(n.write({origin:r,content:e}),this.exiting)n.flush()}async flush(){let e=this.backendLinesLogged;if(this.writer?.flush(),await this.pendingWrite,this.storageV5!==void 0&&this.successor)return this.successor.flush();for(let n=0;this.backendLinesLogged!==e&&n<3;n++)e=this.backendLinesLogged,this.writer?.flush(),await this.pendingWrite}dispose(e){this.redirect=e;try{this.writer?.dispose()}finally{this.redirect=null,this.writer=null}}succeed(e){this.runtimeDebugEnabled=e.runtimeDebugEnabled,this.hasFormattedOutput=e.hasFormattedOutput,this.pendingWrite=e.pendingWrite,this.unflushedChunks=e.unflushedChunks,this.exitHandlerRegistered=e.exitHandlerRegistered,e.successor=this,e.dispose((n)=>{this.write(n)})}handleExit(){if(this.successor){this.successor.handleExit();return}this.exiting=!0,this.writer?.flush(),this.drainSync()}async maybeRotate(e,n,r=cr){let s=F()&&this.storageV5!==void 0?this.storageV5.hostFiles:void 0;if(this.writtenBytes<0)if(s){let i=await s.stat(Ve(e));this.writtenBytes=i.ok&&i.value.kind!=="absent"?i.value.size:0}else this.writtenBytes=await or(e).then((i)=>i.size).catch(()=>0);else this.writtenBytes+=n;if(this.writtenBytes<=r||this.rotating)return;this.rotating=!0;try{let i=e.endsWith(".txt")?`${e.slice(0,-4)}.1.txt`:`${e}.1`;if(s){let o=Ve(e),a=Ve(i),u=await s.rename(o,a);if(!u.ok&&!gr(u.error)){if(await s.delete(a,{missingOk:!0}),!(await s.rename(o,a)).ok)await s.delete(o,{missingOk:!0})}}else try{await Ot(e,i)}catch(o){if(!G(o))await ze(i).catch(()=>{}),await Ot(e,i).catch(()=>ze(e).catch(()=>{}))}this.writtenBytes=0}finally{this.rotating=!1}}shouldLog(e){if(this.deps.isTestEnvironment&&!this.toStderr&&this.filePath===null)return!1;if(!this.deps.isAnt&&!this.isDebugMode())return!1;if(typeof process>"u"||typeof process.versions>"u"||typeof process.versions.node>"u")return!1;return ot(e,this.filter)}resolveDirToFile(e){return this.resolvedLogPath=z(e,`${this.deps.sessionId()}.txt`),this.resolvedLogPath}async appendGroup(e,n,r,s){if(this.storageV5!==void 0&&e.arm==="v5"){await this.appendV5AndMark(this.storageV5,n,r);return}if(!this.writesFiles())return;if(s)await Tt(X(e.target),{recursive:!0}).catch(()=>{});let i=e;try{await Me(e.target,r)}catch(o){if(!rK(o))throw o;if(this.storageV5===void 0)i={...e,target:this.resolveDirToFile(e.target)},await Me(i.target,r);else{if(this.overrideDirectory=e.target,i=Dt(n,e.configHome,e.target,e.target),i.arm==="v5"){await this.appendV5AndMark(this.storageV5,n,r);return}await Tt(X(i.target),{recursive:!0}).catch(()=>{});try{await Me(i.target,r)}catch{return}}}if(i.rotate){if(this.storageV5!==void 0&&i.target!==this.rotationTarget)this.rotationTarget=i.target,this.writtenBytes=-1;await this.maybeRotate(i.target,Buffer.byteLength(r)).catch(Lt)}if(i.pointLatest)this.markLatestSymlink()}async appendV5AndMark(e,n,r){let s=F(),i=s&&!this.latestMarked&&!this.latestRefused,o=await Ft(e,n.sessionId,r,i);if(o==="refused")this.latestRefused=!0,o=await Ft(e,n.sessionId,r,!1),this.log("debug log: the storage backend refused markLatest; <debug folder>/latest is not pointed in this process",{level:"warn"});if(o!=="landed")return;if(i&&!this.latestRefused)this.latestMarked=!0;else if(!s)this.markLatestSymlink()}markLatestSymlink(){if(!this.latestMarked&&this.writesFiles())this.latestMarked=!0,this.updateLatestSymlink()}writesFiles(){try{return this.deps.diskless?.()!==!0&&(this.deps.defaultFile?.()!==!1||this.filePath!==null||this.deps.env.CLAUDE_CODE_DEBUG_LOGS_DIR!==void 0)}catch{return!1}}shiftUnflushedChunk(){this.unflushedChunks.shift()}drainSync(){if(this.unflushedChunks.length===0)return;if(!this.drainsSyncAtExit()||!this.writesFiles()){this.unflushedChunks.length=0;return}let e=[];for(let n of this.unflushedChunks.splice(0)){let r=e.at(-1);if(r!==void 0&&r.armed===n.armed&&(!n.armed||r.target===n.target))r.parts.push(n);else e.push({target:n.target,armed:n.armed,parts:[n]})}for(let{target:n,armed:r,parts:s}of e){let i=r?n:this.logPath(),o=s.map((a)=>a.content).join("");try{ae().mkdirSync(X(i))}catch{}try{ae().appendFileSync(i,o)}catch(a){if(rK(a))try{if(!r)ae().appendFileSync(this.resolveDirToFile(i),o);else{let u=(f,p)=>{try{ae().appendFileSync(z(i,`${f}.txt`),p)}catch{}},l=s[0]?.sessionId,c="";for(let f of s){if(f.sessionId!==l)u(l,c),l=f.sessionId,c="";c+=f.content}u(l,c)}}catch{}}}}groupLines(e){let n=e[0];if(n===void 0)return[];if(this.storageV5===void 0)return[{decision:{target:this.logPath(),arm:"raw",configHome:"",rotate:!0,pointLatest:!0},origin:n.origin,lines:e}];let r=[];for(let s of e){let i=r.at(-1);if(i!==void 0&&i.origin.sessionId===s.origin.sessionId&&i.origin.fromBackend===s.origin.fromBackend)i.lines.push(s);else r.push({decision:Dt(s.origin,this.deps.configHomeDir(),this.filePath??this.deps.env.CLAUDE_CODE_DEBUG_LOGS_DIR??null,this.overrideDirectory),origin:s.origin,lines:[s]})}return r}getWriter(){if(this.writer)return this.writer;let e=null,n=this.storageV5!==void 0;if(this.writer=Re({writeBatch:(r)=>{if(this.redirect){this.redirect(r.map((i)=>i.content).join(""));return}if(this.exiting){for(let i of this.groupLines(r))this.unflushedChunks.push({target:i.decision.target,sessionId:i.origin.sessionId,armed:n,content:i.lines.map((o)=>o.content).join("")});this.drainSync();return}let s=this.writesFiles();for(let i of this.groupLines(r)){if(i.decision.arm==="raw"&&!s)continue;let o=i.lines.map((l)=>l.content).join(""),a=X(i.decision.target),u=i.decision.arm==="raw"&&(i.origin.fromBackend||e!==a);if(i.decision.arm==="raw")e=a;this.unflushedChunks.push({target:i.decision.target,sessionId:i.origin.sessionId,armed:n,content:o}),this.pendingWrite=this.pendingWrite.then(this.appendGroup.bind(this,i.decision,i.origin,o,u)).catch(Lt).then(this.shiftUnflushedChunk.bind(this))}},sizeOf:(r)=>r.content.length,flushIntervalMs:1000,maxBufferSize:100,immediateMode:this.isDebugMode()}),this.deps.registerCleanup(async()=>{this.writer?.dispose(),await this.pendingWrite}),!this.exitHandlerRegistered)this.exitHandlerRegistered=!0,this.deps.onExit(this.handleExit.bind(this));return this.writer}async updateLatestSymlink(){try{let e=this.logPath(),n=z(X(e),"latest");await ze(n).catch(()=>{}),await ar(e,n)}catch{}}}
class Nt{instance=void 0;init={};defaultFile=!0;setInstance(e){this.instance=e}setInit(e){this.init=e}disableDefaultFile(){this.defaultFile=!1}}
var pr=new q(()=>new Nt);
function me(){return vs(pr)}
function Ge(e,n){return new It({argv:process.argv,env:process.env,sessionId:()=>V(),configHomeDir:()=>we(),onExit:(r)=>{process.on("exit",r)},registerCleanup:(r)=>{_t(r)},writeToStderr:(r)=>{vF(r)},isAnt:n?.isAnt??!1,isTestEnvironment:n?.isTestEnvironment??!1,launchIdentity:n,storageV5:e.init.storageV5!==void 0&&e.init.configHome===we()?e.init.storageV5:void 0,syncExitDrain:e.init.syncExitDrain,diskless:()=>bn(),defaultFile:()=>e.defaultFile})}
function U(){let e=me(),n=e.instance;if(n)return n;let r=Ge(e);return e.setInstance(r),r}
function t(e,n={level:"debug"}){U().log(e,n)}
var yr={[Symbol.dispose](){}};
function br(){return yr}
var Hm=br;
function S(e,n,r){using s=Hm`JSON.stringify(${ye(e)})`;return JSON.stringify(e,n,r)}
var J=(e,n)=>{using r=Hm`JSON.parse(${ye(e)})`;return typeof n>"u"?JSON.parse(e):JSON.parse(e,n)};
function ye(e){return typeof e==="string"?e.length:e}
var _r="\u2192";
function Fr(){return m.constants.O_NOFOLLOW|m.constants.O_NONBLOCK}
function TIe(){return m.constants.O_RDONLY|m.constants.O_NONBLOCK|m.constants.O_NOCTTY}
var Q=/\/+/;
function HZn(e,n){let r=(u)=>u.split(Q).filter(Boolean),s=d.resolve(e),i=d.resolve(n),o=r(s),a=r(i);return d.parse(s).root===d.parse(i).root&&o.length<a.length&&o.every((u,l)=>u===a[l])}
function Ut(e){let n="";for(let s of e.split(/([\\/]+)/)){if(s==="."||s==="..")break;n+=s}let r=n.replace(/(?<=[^\\/])[\\/]+$/,"");return r===""?e:r}
function Cr(e){if(e.startsWith("\\\\"))return Ut(e);let n=e.replace(/^\/+/,"/"),r=owe(n);if(r!==null)return r;return Ut(e)}
var Ir=Cr;
function ke(e,n,r){let s=ua(e);if(n.length===0||s||n.some((i)=>i==="."||i==="..")){if(r!==void 0&&(n.length>0||s))r(d.join(e,...n));return s?Ir(e):e}return d.join(e,...n)}
var hh="\x00unverified-ancestry";
var q6t="\x00opaque-link-text";
function Je(e){return wy(d.isAbsolute(e)?e:e.replace(/^(?:\.\.(?:[\\/]+|$))+/,""))}
function REn(e,n=!1){return e.includes("\uFFFD")||Je(e)||n&&(/^(?:[A-Za-z]:(?![\\/])|[\\/](?![\\/]))/.test(e)||/^[\\/]{2}\?[\\/]/.test(e)&&!/^[\\/]{2}\?[\\/](?:[A-Za-z]:[\\/]|UNC[\\/])/i.test(e)||e.split(/[\\/]/).some((r)=>r!=="."&&r!==".."&&/[. ]$/.test(r)))}
function Wt(e,n,r=!1,s=!1,i=!1){if(n?.unreadableAncestry!=="unverified")return;let o=e!==void 0&&typeof e==="object"&&"errno"in e?e.errno:void 0;if(o==="ENOENT"||o==="ENOTDIR")return;if(o==="ENAMETOOLONG"&&!r&&!s&&!i)return;return hh}
function Z(e){return xF(e)}
function be(e,n){return n!==void 0&&n.some((r)=>xF(r)&&!DO(e,r)&&(Xe(e,r)||ea(e)))}
function Mt(e,n){return n!==void 0&&n.some((r)=>xF(r)&&Xe(r,e))}
function Xe(e,n){let r=(o)=>o.length>1?o.replace(/\/+$/,""):o,[s,i]=[r(e),r(n)];return s===i||s.startsWith(i==="/"?i:i+"/")}
function ee(e,n){return n===void 0||n.every((r)=>DO(e,r))}
function xe(e,n){return n===void 0||n.every((r)=>UQ(e,r))}
function zt(e,n,r){let s=ea(e)?owe(e):null;if(s===null||!ee(s,n))return;let i=d.join(e);if(ea(i)&&b8(i)===b8(s))return i;return ke(e,[],r)}
function jt(e){if(e?.anchors!==void 0&&e.anchors.length>0)return e.anchors;return e?.anchor!==void 0?[e.anchor]:void 0}
async function Bbe(e,n=Wh){return wy(e)||_s(e)||ta(e)||s_(e)||await $G(n,e,{surfaceNetworkRaw:!0,unreadableAncestry:"unverified"})!==void 0}
function $G(e,n,r,s){return Nr(Se(n,r),s,async(i)=>{if(i.kind==="lstat")return e.lstat(i.path);if(i.kind==="opendirNofollow")return await e.openDirNoFollow(i.path),"ok";return e.readlink(i.path)})}
async function Nr(e,n,r){let s;for(;;){let i=e.next(s);if(i.done)return i.value;if(n?.aborted===!0)return hh;try{s=await r(i.value)}catch(o){s={errno:v(o)}}}}
function*Se(e,n){let r=jt(n);if(Z(e)&&!be(e,r))return e;if(Pn(e)&&!pl(e)&&xe(e,r)||ea(e)&&ee(e,r))return;let s=d.resolve(e),i=d.parse(s).root,o=i,a=s.slice(i.length).split(Q).filter(Boolean),u=0,l=!1,c=!1,f,p=64,k=()=>a.some((h)=>ua(h)),y=()=>/[. ]$/.test(a[0]);while(a.length>0&&u<p){if(l&&ua(a[0]))return hh;let h=d.join(o,a[0]);if(ea(h)&&ee(h,r)||Z(h)&&!(be(h,r)||Mt(h,r)))return ke(h,a.slice(1),n?.onCollapsedLanding);if(gS(h)){if(n?.surfaceNetworkRaw===!0||n?.unreadableAncestry==="unverified")return hh;return ke(h,a.slice(1),n?.onCollapsedLanding)}let b=h!=="/dev/fd"&&Xe(h,"/dev/fd");if(b&&d.dirname(h)==="/dev/fd"&&a.some((O,E)=>E>0&&(O===".."||O==="."))){a.shift();while(a[0]==="."&&a.length>1)a.shift();o=h;continue}let g=b?{errno:"ENOENT"}:yield{kind:"lstat",path:h};if(g===void 0||typeof g==="string"||"errno"in g){if(typeof g==="object"&&"errno"in g&&g.errno!==void 0&&g.errno!=="ENOENT"&&g.errno!=="ENOTDIR"&&g.errno!=="ENAMETOOLONG"){if(typeof(yield{kind:"opendirNofollow",path:h})==="string"){c=!0,a.shift(),o=h;continue}}if(n?.launchAncestry&&!c&&typeof g==="object"&&"errno"in g&&(g.errno==="EPERM"||g.errno==="EACCES")&&HZn(h,n.launchAncestry)){l=!0,a.shift(),o=h;continue}if(typeof g==="object"&&"errno"in g&&(g.errno==="ENOENT"||g.errno==="ENOTDIR"))n?.onOutcome?.({kind:"absent",at:o,remaining:[...a]});return Wt(g,n,u>0,k(),y())}let A=g;if(c=!0,!A.isSymbolicLink()){a.shift(),o=h;continue}u++;let w=h+"\x00"+a.join("\x00");if((f??=new Set).has(w))return;f.add(w);let x=yield{kind:"readlink",path:h};if(typeof x!=="string")return Wt(x,n,u>0,k(),y());let D=x;if(n?.literalLinkText==="opaque"&&REn(D))return q6t;if(!d.isAbsolute(D)){let O=D.split(Q).filter(Boolean);if(n?.surfaceNetworkRaw===!0){let E=zt((o.endsWith(d.sep)?o:o+d.sep)+[...O,...a.slice(1)].join(d.sep),r,n?.onCollapsedLanding);if(E!==void 0)return E}a.shift(),n?.onHop?.({composed:d.resolve(o,D,...a),leaf:a.length===0,text:D}),a=[...O,...a];continue}let R=D;if(n?.surfaceNetworkRaw===!0&&a.length>1&&s_(R)){let O=zt([R,...a.slice(1)].join(d.sep),r,n?.onCollapsedLanding);if(O!==void 0)return O}if(Pn(R)&&!pl(R)&&xe(R,r)||ea(R)&&ee(R,r)||Z(R)&&!(be(R,r)||a.length>1&&Mt(R,r)))return a.shift(),ke(R,a,n?.onCollapsedLanding);if(n?.surfaceNetworkRaw===!0&&ua(R)&&(Pn(R)||ta(R)||xF(R)||s_(R)))return a.shift(),a.length===0?R:R+d.sep+a.join(d.sep);a.shift();let I=d.parse(R).root||d.sep,L=d.parse(h).root,T=/^[\\/]$/.test(I)&&L!==""&&!/^[\\/]$/.test(L);if(T&&(n?.surfaceNetworkRaw===!0||n?.unreadableAncestry==="unverified"))return hh;n?.onHop?.({composed:a.length===0?R:d.resolve(R,...a),leaf:a.length===0,text:D}),o=T?L:I,c=!1,a=[...R.slice(I.length).split(Q).filter(Boolean),...a]}if(a.length>0&&n?.literalLinkText==="opaque")return q6t;if(a.length>0)return hh;if(u>0&&s_(o))return o;if(Z(o)&&!be(o,r))return o;if(a.length===0)n?.onOutcome?.({kind:"resolved",path:o});return}
var Wh={cwd(){return process.cwd()},existsSync(e){using n=Hm`fs.existsSync(${e})`;return m.existsSync(e)},async stat(e){return Bt(e)},async lstat(e){return Ke(e)},async openDirNoFollow(e){await(await j(e,m.constants.O_DIRECTORY|m.constants.O_NOFOLLOW)).close()},openDirNoFollowSync(e){let n=m.openSync(e,m.constants.O_DIRECTORY|m.constants.O_NOFOLLOW);m.closeSync(n)},async lstatBigint(e){return Ke(e,{bigint:!0})},async statBigint(e){return Bt(e,{bigint:!0})},async readdir(e){return vr(e,{withFileTypes:!0})},async unlink(e){return Dr(e)},async rmdir(e){return Or(e)},async rm(e,n){return Pr(e,n)},async mkdir(e,n){try{await wr(e,{recursive:!0,...n})}catch(r){if(v(r)!=="EEXIST")throw r}},async readFile(e,n){return Ht(e,{encoding:n.encoding})},async rename(e,n){return Tr(e,n)},async realpath(e){return xn(await Ar(e))},async readlink(e){return Rr(e)},async copyFile(e,n){return Sr(e,n)},async appendFile(e,n,r){if(r?.mode!==void 0)try{let s=await j(e,"ax",r.mode);try{await s.appendFile(n)}finally{await s.close()}return}catch(s){if(v(s)!=="EEXIST")throw s}return kr(e,n)},async symlink(e,n,r){return Lr(e,n,r)},async link(e,n){return Er(e,n)},async chmod(e,n){return xr(e,n)},statSync(e){using n=Hm`fs.statSync(${e})`;return m.statSync(e)},lstatSync(e){using n=Hm`fs.lstatSync(${e})`;return m.lstatSync(e)},readFileSync(e,n){using r=Hm`fs.readFileSync(${e})`;return m.readFileSync(e,{encoding:n.encoding})},readSync(e,n){using r=Hm`fs.readSync(${e}, ${n.length} bytes)`;let s=void 0;try{s=m.openSync(e,"r");let i=[],o=0;while(o<n.length){let u=Buffer.allocUnsafe(Math.min(65536,n.length-o)),l=m.readSync(s,u,0,u.length,o);if(l===0)break;i.push(u.subarray(0,l)),o+=l}return{buffer:Buffer.concat(i,o),bytesRead:o}}finally{if(s!==void 0)m.closeSync(s)}},appendFileSync(e,n,r){using s=Hm`fs.appendFileSync(${e}, ${n.length} chars)`;if(r?.mode!==void 0)try{let i=m.openSync(e,"ax",r.mode);try{m.appendFileSync(i,n)}finally{m.closeSync(i)}return}catch(i){if(v(i)!=="EEXIST")throw i}m.appendFileSync(e,n)},unlinkSync(e){using n=Hm`fs.unlinkSync(${e})`;m.unlinkSync(e)},renameSync(e,n){using r=Hm`fs.renameSync(${e} ${_r} ${n})`;m.renameSync(e,n)},readlinkSync(e){using n=Hm`fs.readlinkSync(${e})`;return m.readlinkSync(e)},realpathSync(e){using n=Hm`fs.realpathSync(${e})`;return xn(m.realpathSync(e))},mkdirSync(e,n){using r=Hm`fs.mkdirSync(${e})`;let s={recursive:!0};if(n?.mode!==void 0)s.mode=n.mode;try{m.mkdirSync(e,s)}catch(i){if(v(i)!=="EEXIST")throw i}},readdirSync(e){using n=Hm`fs.readdirSync(${e})`;return m.readdirSync(e,{withFileTypes:!0})},rmSync(e,n){using r=Hm`fs.rmSync(${e})`;m.rmSync(e,n)},createWriteStream(e){return m.createWriteStream(e)},async readFileBytes(e,n){if(n===void 0)return Ht(e);let r=await j(e,TIe());try{if(!(await r.stat()).isFile())return Buffer.alloc(0);return await y_t(r,n,"file")}finally{await r.close()}},async readFileFdGated(e,n){try{let r=Fr();if(r===0){if(!(await Ke(e)).isFile())return null}let s=await j(e,m.constants.O_RDONLY|r);try{let i=await s.stat();if(!i.isFile()||i.size>n)return null;let o=Number(i.size),a=Buffer.allocUnsafe(o),u=0;while(u<o){let{bytesRead:l}=await s.read(a,u,o-u,u);if(l===0)break;u+=l}return{content:(u<o?a.subarray(0,u):a).toString("utf8"),stats:i}}finally{await s.close()}}catch{return null}}};
function ae(){return Wh}
async function y_t(e,n,r){let s=r!==void 0?r==="file":(await e.stat()).isFile(),i=[],o=0;while(o<n){let a=Buffer.allocUnsafe(Math.min(65536,n-o)),{bytesRead:u}=await e.read(a,0,a.length,s?o:null);if(u===0)break;i.push(a.subarray(0,u)),o+=u}return Buffer.concat(i,o)}
return {Bbe,J,ae,t};
}
function make_chunk_j72sz16r({H,Le,R,ae,ee,pSt,t}){
function g_t(){if(process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC)return"essential-traffic";if(process.env.DISABLE_TELEMETRY)return"no-telemetry";if(Le(process.env.DO_NOT_TRACK))return"no-telemetry";return"default"}
function xt(){return g_t()==="essential-traffic"}
var v=100;
var k=1000;
class I{recentErrors=[];queue=[];droppedBeforeSink=0;sink=null;hardFailMode=void 0;remember(e){if(this.recentErrors.length>=v)this.recentErrors.shift();this.recentErrors.push(e)}dispatch(e){if(this.sink===null){if(this.queue.length>=k){this.droppedBeforeSink++;return}this.queue.push(e);return}switch(e.type){case"error":this.sink.logError(e.error);break;case"mcpError":this.sink.logMCPError(e.serverName,e.error);break;case"mcpDebug":this.sink.logMCPDebug(e.serverName,e.message);break}}attachSink(e){if(this.sink!==null)return;this.sink=e;let r=this.queue;this.queue=[];for(let n of r)this.dispatch(n)}isHardFailMode(){return this.hardFailMode??=process.argv.includes("--hard-fail"),this.hardFailMode}reset(){this.recentErrors=[],this.queue=[],this.droppedBeforeSink=0,this.sink=null,this.hardFailMode=void 0}}
var j2e=new I;
function d(e){let r=ee(e);try{if(Le(process.env.CLAUDE_CODE_USE_BEDROCK)||Le(process.env.CLAUDE_CODE_USE_VERTEX)||Le(process.env.CLAUDE_CODE_USE_FOUNDRY)||Le(process.env.CLAUDE_CODE_USE_ANTHROPIC_AWS)||Le(process.env.CLAUDE_CODE_USE_ANTHROPIC_GOOGLE_CLOUD)||Le(process.env.CLAUDE_CODE_USE_MANTLE)||process.env.DISABLE_ERROR_REPORTING||xt())return;let s={error:pSt(r),timestamp:new Date().toISOString()};j2e.remember(s),j2e.dispatch({type:"error",error:r})}catch{}}
function xZn(){try{return ae().readFileSync("/proc/version",{encoding:"utf8"}).toLowerCase()}catch{return}}
function PZn(e){return e.includes("microsoft")||e.includes("wsl")}
class S{sources;primedProcVersion;fallbackProcVersion;fallbackProcVersionRead=!1;platform;wslVersion=null;macOSMajorVersion=null;linuxDistroInfo;constructor(e){this.sources=e}kernelString(){if(this.primedProcVersion!==void 0)return this.primedProcVersion;if(!this.fallbackProcVersionRead)this.fallbackProcVersion=this.sources.readProcVersionSync(),this.fallbackProcVersionRead=!0;return this.fallbackProcVersion}getPlatform(){if(this.platform!==void 0)return this.platform;try{if(this.sources.platform==="darwin")this.platform="macos";else if(this.sources.platform==="win32")this.platform="windows";else if(this.sources.platform==="linux")if(this.sources.env.WSL_DISTRO_NAME||this.sources.env.WSL_INTEROP)this.platform="wsl";else{let e=this.kernelString();this.platform=e!==void 0&&PZn(e)?"wsl":"linux"}else this.platform="unknown"}catch(e){d(e),this.platform="unknown"}return this.platform}getWslVersion(){if(this.wslVersion!==null)return this.wslVersion;if(this.sources.platform!=="linux"){this.wslVersion=void 0;return}let e=this.kernelString();if(e===void 0){this.wslVersion=void 0;return}let r=e.match(/wsl(\d+)/);if(r&&r[1])this.wslVersion=r[1];else if(e.includes("microsoft"))this.wslVersion="1";else this.wslVersion=void 0;return this.wslVersion}getMacOSMajorVersion(){if(this.macOSMajorVersion!==null)return this.macOSMajorVersion;if(this.sources.platform!=="darwin"){this.macOSMajorVersion=void 0;return}let e=this.sources.osRelease().match(/^(\d+)\./);return this.macOSMajorVersion=e&&e[1]?parseInt(e[1],10)-9:void 0,this.macOSMajorVersion}getLinuxDistroInfo(){return this.linuxDistroInfo??=this.readLinuxDistroInfo()}async readLinuxDistroInfo(){if(this.sources.platform!=="linux")return;let e={linuxKernel:this.sources.osRelease()};try{let r=await this.sources.readOsRelease();for(let n of r.split(`
`)){let s=n.match(/^(ID|VERSION_ID)=(.*)$/);if(s&&s[1]&&s[2]){let i=s[2].replace(/^"|"$/g,"");if(s[1]==="ID")e.linuxDistroId=i;else e.linuxDistroVersion=i}}}catch{}return e}async prime(){if(this.primedProcVersion!==void 0||this.sources.platform!=="linux")return;try{let e=await this.sources.readProcVersion();this.primedProcVersion=e.toLowerCase()}catch(e){t(`Failed to read /proc/version for WSL detection: ${e}`,{level:"error"});return}this.platform=void 0,this.wslVersion=null}}
var V;
function p(){return V??=new S({platform:"darwin",env:process.env,readProcVersionSync:xZn,readProcVersion:()=>R("/proc/version",{encoding:"utf8"}),osRelease:H,readOsRelease:()=>R("/etc/os-release","utf8")})}
function O(){return p().getPlatform()}
return {O,d};
}
function make_chunk_abjdv98v({}){
function N(n){return[...new Set(n)]}
return {N};
}
function make_chunk_0shqxty0({}){
function s(){return"prod"}
function F3(){if(process.env.CLAUDE_CODE_CUSTOM_OAUTH_URL)return"-custom-oauth";switch(s()){case"local":return"-local-oauth";case"staging":return"-staging-oauth";case"prod":return""}}
var a={BASE_API_URL:"https://api.anthropic.com",CONSOLE_AUTHORIZE_URL:"https://platform.claude.com/oauth/authorize",CLAUDE_AI_AUTHORIZE_URL:"https://claude.com/cai/oauth/authorize",CLAUDE_AI_ORIGIN:"https://claude.ai",TOKEN_URL:"https://platform.claude.com/v1/oauth/token",API_KEY_URL:"https://api.anthropic.com/api/oauth/claude_cli/create_api_key",ROLES_URL:"https://api.anthropic.com/api/oauth/claude_cli/roles",CONSOLE_SUCCESS_URL:"https://platform.claude.com/buy_credits?returnUrl=/oauth/code/success%3Fapp%3Dclaude-code",CLAUDEAI_SUCCESS_URL:"https://platform.claude.com/oauth/code/success?app=claude-code",MANUAL_REDIRECT_URL:"https://platform.claude.com/oauth/code/callback",CLIENT_ID:"9d1c250a-e61b-44d9-88ed-5944d1962f5e",DESIGN_CLIENT_ID:"59637612-477b-4836-a601-b0589eda7704",OAUTH_FILE_SUFFIX:"",PLUGINS_SCOPE_REGISTERED:!0,PROJECTS_SCOPES_REGISTERED:!0,MCP_PROXY_URL:"https://mcp-proxy.anthropic.com",MCP_PROXY_PATH:"/v1/mcp/{server_id}"};
var u=void 0;
function i(){let t=process.env.CLAUDE_LOCAL_OAUTH_API_BASE?.replace(/\/$/,"")??"http://localhost:8000",e=process.env.CLAUDE_LOCAL_OAUTH_APPS_BASE?.replace(/\/$/,"")??"http://localhost:4000",o=process.env.CLAUDE_LOCAL_OAUTH_CONSOLE_BASE?.replace(/\/$/,"")??"http://localhost:3000";return{BASE_API_URL:t,CONSOLE_AUTHORIZE_URL:`${o}/oauth/authorize`,CLAUDE_AI_AUTHORIZE_URL:`${e}/oauth/authorize`,CLAUDE_AI_ORIGIN:e,TOKEN_URL:`${t}/v1/oauth/token`,API_KEY_URL:`${t}/api/oauth/claude_cli/create_api_key`,ROLES_URL:`${t}/api/oauth/claude_cli/roles`,CONSOLE_SUCCESS_URL:`${o}/buy_credits?returnUrl=/oauth/code/success%3Fapp%3Dclaude-code`,CLAUDEAI_SUCCESS_URL:`${o}/oauth/code/success?app=claude-code`,MANUAL_REDIRECT_URL:`${o}/oauth/code/callback`,CLIENT_ID:"22422756-60c9-4084-8eb7-27705fd5cf9a",DESIGN_CLIENT_ID:"00000000-0000-4000-8000-000000000000",OAUTH_FILE_SUFFIX:"-local-oauth",PLUGINS_SCOPE_REGISTERED:!0,PROJECTS_SCOPES_REGISTERED:!0,MCP_PROXY_URL:"http://localhost:8205",MCP_PROXY_PATH:"/v1/toolbox/shttp/mcp/{server_id}"}}
var SIe=["https://beacon.claude-ai.staging.ant.dev","https://claude.fedstart.com","https://claude-staging.fedstart.com"];
function CZn(){switch(s()){case"local":return i();case"staging":return u??a;case"prod":return a}}
function cn(){let t=CZn(),e=process.env.CLAUDE_CODE_CUSTOM_OAUTH_URL;if(e){let _=e.replace(/\/$/,"");if(!SIe.includes(_))throw Error("CLAUDE_CODE_CUSTOM_OAUTH_URL is not an approved endpoint.");t={...t,BASE_API_URL:_,CONSOLE_AUTHORIZE_URL:`${_}/oauth/authorize`,CLAUDE_AI_AUTHORIZE_URL:`${_}/oauth/authorize`,CLAUDE_AI_ORIGIN:_,TOKEN_URL:`${_}/v1/oauth/token`,API_KEY_URL:`${_}/api/oauth/claude_cli/create_api_key`,ROLES_URL:`${_}/api/oauth/claude_cli/roles`,CONSOLE_SUCCESS_URL:`${_}/oauth/code/success?app=claude-code`,CLAUDEAI_SUCCESS_URL:`${_}/oauth/code/success?app=claude-code`,MANUAL_REDIRECT_URL:`${_}/oauth/code/callback`,OAUTH_FILE_SUFFIX:"-custom-oauth",PLUGINS_SCOPE_REGISTERED:!1,PROJECTS_SCOPES_REGISTERED:!1}}let o=process.env.CLAUDE_CODE_OAUTH_CLIENT_ID;if(o)t={...t,CLIENT_ID:o,PLUGINS_SCOPE_REGISTERED:!1,PROJECTS_SCOPES_REGISTERED:!1};return t}
return {F3,cn};
}
function make_chunk_rmy2pep5({Cs,Le,rc}){
function i(n){return{parse:(e)=>n(u(e))}}
function t(n){let e=n?.trim();return e?e:void 0}
function u(n){return n===void 0?void 0:String(n)}
var f=i(t);
var o=i((n)=>n);
var s=i((n)=>Le(n));
var l=i((n)=>{if(Le(n))return!0;if(Cs(n))return!1;return});
var m=d();
function gKo(n){if(typeof n==="boolean")return n?"1":"0";return String(n)}
var D={str:()=>f,rawStr:()=>o,bool:()=>s,triBool:()=>l,int:(n)=>n?d(n):m,enum:(n)=>i((e)=>e!==void 0&&n.includes(e.trim())?e.trim():void 0)};
function d(n){return i((e)=>{if(e===void 0)return;if(n?.digitsOnly&&!/^[+-]?\d+$/.test(e.trim()))return;let r=rc(e);if(!Number.isFinite(r))return;if(n?.min!==void 0&&r<n.min)return;if(n?.max!==void 0&&r>n.max)return;return r})}
return {D,gKo};
}
function make_chunk_07mxqtdh({At,Bbe,D,Dt,F3,I,Le,N,O,Ot,Qr,Tt,ae,et,gKo,j,l,nt,q,w,w8,we,wy}){
function b0(){return!0}
function dEn(t){return!t.isDirectory()&&!t.isFile()&&!t.isSymbolicLink()&&!t.isFIFO()&&!t.isSocket()&&!t.isBlockDevice()&&!t.isCharacterDevice()}
function W(t){return g(t,Bun.which(t))}
function g(t,o){return o}
var gc=async(t)=>W(t);
var TO=W;
function Y(){return!1}
function y(){return}
function V(){return!1}
function Lt(){if(ae().existsSync(I(we(),".config.json")))return I(we(),".config.json");return bZn()}
function bZn(){let t=`.claude${F3()}.json`;return I(process.env.CLAUDE_CONFIG_DIR||Dt(),t)}
async function ct(){return null}
async function L(t){try{return!!await gc(t)}catch{return!1}}
async function pt(){let t=[];if(await L("npm"))t.push("npm");if(await L("yarn"))t.push("yarn");if(await L("pnpm"))t.push("pnpm");return t}
async function Rt(){let t=[];if(await L("bun"))t.push("bun");if(await L("deno"))t.push("deno");if(await L("node"))t.push("node");return t}
var wZn=["git","node","npm","npx","yarn","pnpm","bun","deno","tsc","python","python3","py","pip","uv","poetry","ruby","gem","bundle","rake","dotnet","msbuild","nuget","cl","nmake","cmake","ninja","make","gcc","g++","clang","cargo","rustc","go","java","javac","mvn","gradle","docker"];
var St=1000;
async function It(t){try{return/appinstaller/i.test(await At(t))}catch{return!1}}
async function O5r(t){if(t===""||w8(t)||wy(t))return!1;return!await Bbe(w(t))}
async function $6t(t,o){let _=O()==="windows",E=new Set(t),r=_?(process.env.PATHEXT??".COM;.EXE;.BAT;.CMD").toLowerCase().split(";").filter(Boolean):[],e=N((process.env.PATH??"").split(Tt).map((s)=>s.replace(/^"|"$/g,"")).filter(Boolean));await Promise.all(e.map(async(s)=>{if(!await O5r(s))return;let n;try{n=await nt(s,{withFileTypes:!0})}catch{return}let p=_&&/[\\/]microsoft[\\/]windowsapps[\\/]?$/i.test(s);for(let A of n){if(A.isDirectory())continue;let R=A.name;if(_){let T=R.toLowerCase(),i=T.lastIndexOf(".");if(i<=0||!r.includes(T.slice(i)))continue;R=T.slice(0,i)}if(!E.has(R)||o.has(R))continue;if(_){if(p&&await It(I(s,A.name)))continue}else{let T=I(s,A.name);if((A.isSymbolicLink()||dEn(A))&&await Bbe(w(T)))continue;try{await l(T,et.X_OK)}catch{continue}}o.add(R)}}))}
async function it(){let t=new Set;try{await Ot($6t(wZn,t),St,"build tool PATH scan timed out")}catch{}return wZn.filter((o)=>t.has(o))}
function Ut(t){try{if(!t.isWslEnvironment())return!1;let o=TO("npm");if(o===null)return!1;return o.startsWith("/mnt/c/")}catch(o){return!1}}
function xt(){return process.env.__CFBundleIdentifier==="com.conductor.app"}
var yQ=["pycharm","intellij","webstorm","phpstorm","rubymine","clion","goland","rider","datagrip","appcode","dataspell","aqua","gateway","fleet","jetbrains","androidstudio"];
function D5r(t){let o=t.toLowerCase();return o.includes("windsurf")||o.includes("devin.app")||o.includes("devin desktop")||o.includes("devin-desktop")||/appdata[\\/]local[\\/](programs[\\/])?devin[\\/]/.test(o)}
function Nt(){if(process.env.CURSOR_TRACE_ID)return"cursor";let t=process.env.VSCODE_GIT_ASKPASS_MAIN?.toLowerCase()??"";if(t.includes("cursor"))return"cursor";if(D5r(t))return"windsurf";if(t.includes("antigravity"))return"antigravity";let o=process.env.__CFBundleIdentifier?.toLowerCase();if(o?.includes("vscodium"))return"codium";if(o?.includes("windsurf")||o?.includes("devin"))return"windsurf";if(o?.includes("com.google.android.studio"))return"androidstudio";if(o){for(let _ of yQ)if(o.includes(_))return _}if(process.env.VisualStudioVersion)return"visualstudio";if(process.env.TERMINAL_EMULATOR==="JetBrains-JediTerm")return"pycharm";if(process.env.TERM==="xterm-ghostty")return"ghostty";if(process.env.TERM?.includes("kitty"))return"kitty";if(process.env.TERM_PROGRAM){if(/^devin([ -]desktop)?$/i.test(process.env.TERM_PROGRAM))return"windsurf";return process.env.TERM_PROGRAM}if(process.env.TMUX)return"tmux";if(process.env.STY)return"screen";if(process.env.KONSOLE_VERSION)return"konsole";if(process.env.GNOME_TERMINAL_SERVICE)return"gnome-terminal";if(process.env.XTERM_VERSION)return"xterm";if(process.env.VTE_VERSION)return"vte-based";if(process.env.TERMINATOR_UUID)return"terminator";if(process.env.KITTY_WINDOW_ID)return"kitty";if(process.env.ALACRITTY_LOG)return"alacritty";if(process.env.TILIX_ID)return"tilix";if(process.env.WT_SESSION)return"windows-terminal";if(process.env.SESSIONNAME&&process.env.TERM==="cygwin")return"cygwin";if(process.env.MSYSTEM)return process.env.MSYSTEM.toLowerCase();if(process.env.ConEmuANSI||process.env.ConEmuPID||process.env.ConEmuTask)return"conemu";if(process.env.WSL_DISTRO_NAME)return`wsl-${process.env.WSL_DISTRO_NAME}`;if(k())return"ssh-session";if(process.env.TERM){let _=process.env.TERM;if(_.includes("alacritty"))return"alacritty";if(_.includes("rxvt"))return"rxvt";if(_.includes("termite"))return"termite";return process.env.TERM}if(!process.stdout.isTTY)return"non-interactive";return null}
class X{sources;globalClaudeFile;packageManagers;runtimes;detectedBuildTools;wslEnvironment;npmFromWindowsPath;deploymentEnvironment;primedWslInteropExists;primedHypervisorUuid;primedDockerenvExists;fallbackWslInteropExists;fallbackHypervisorUuid;fallbackDockerenvExists;constructor(t){this.sources=t}getGlobalClaudeFile(){return this.globalClaudeFile??=Lt()}seedGlobalClaudeFile(t){if(this.globalClaudeFile===void 0)return this.globalClaudeFile=t,"seeded";return this.globalClaudeFile===t?"unchanged":"conflict"}getPackageManagers(){return this.packageManagers??=pt()}getRuntimes(){return this.runtimes??=Rt()}getDetectedBuildTools(){return this.detectedBuildTools??=it()}isWslEnvironment(){return this.wslEnvironment??=this.primedWslInteropExists??!1}isNpmFromWindowsPath(){return this.npmFromWindowsPath??=Ut(this)}hypervisorUuid(){return this.primedHypervisorUuid??(this.fallbackHypervisorUuid??=this.sources.readHypervisorUuidSync()??"")}isDockerenvPresent(){return this.primedDockerenvExists??(this.fallbackDockerenvExists??=this.sources.dockerenvExistsSync())}detectDeploymentEnvironment(){return this.deploymentEnvironment??=Pt(this)}async prime(){this.primedWslInteropExists;return}}
var lt=new q(()=>new X({wslInteropExistsSync:Y,readHypervisorUuidSync:y,dockerenvExistsSync:V}));
function C(){return lt.of(j().host)}
function h(){return C().detectDeploymentEnvironment()}
function Pt(t){if(Le(process.env.CODESPACES))return"codespaces";if(process.env.GITPOD_WORKSPACE_ID)return"gitpod";if(Le(process.env.CODER)||process.env.CODER_WORKSPACE_NAME)return"coder";if(Le(process.env.DEVPOD)||process.env.DEVPOD_WORKSPACE_UID)return"devpod";if(process.env.DAYTONA_WS_ID)return"daytona";if(Le(process.env.GOOGLE_CLOUD_WORKSTATIONS))return"gcp-cloud-workstations";if(process.env.C9_PID||process.env.C9_USER)return"aws-cloud9";if(process.env.REPL_ID||process.env.REPL_SLUG)return"replit";if(process.env.PROJECT_DOMAIN)return"glitch";if(Le(process.env.VERCEL))return"vercel";if(process.env.RAILWAY_ENVIRONMENT_NAME||process.env.RAILWAY_SERVICE_NAME)return"railway";if(Le(process.env.RENDER))return"render";if(Le(process.env.NETLIFY))return"netlify";if(process.env.DYNO)return"heroku";if(process.env.FLY_APP_NAME||process.env.FLY_MACHINE_ID)return"fly.io";if(Le(process.env.CF_PAGES))return"cloudflare-pages";if(process.env.DENO_DEPLOYMENT_ID)return"deno-deploy";if(process.env.AWS_LAMBDA_FUNCTION_NAME)return"aws-lambda";if(process.env.AWS_EXECUTION_ENV==="AWS_ECS_FARGATE")return"aws-fargate";if(process.env.AWS_EXECUTION_ENV==="AWS_ECS_EC2")return"aws-ecs";if(t.hypervisorUuid().startsWith("ec2"))return"aws-ec2";if(process.env.K_SERVICE)return"gcp-cloud-run";if(process.env.GOOGLE_CLOUD_PROJECT)return"gcp";if(process.env.WEBSITE_SITE_NAME||process.env.WEBSITE_SKU)return"azure-app-service";if(process.env.AZURE_FUNCTIONS_ENVIRONMENT)return"azure-functions";if(process.env.APP_URL?.includes("ondigitalocean.app"))return"digitalocean-app-platform";if(process.env.SPACE_CREATOR_USER_ID)return"huggingface-spaces";if(Le(process.env.GITHUB_ACTIONS))return"github-actions";if(Le(process.env.GITLAB_CI))return"gitlab-ci";if(process.env.CIRCLECI)return"circleci";if(process.env.BUILDKITE)return"buildkite";if(Le(!1))return"ci";if(process.env.KUBERNETES_SERVICE_HOST)return"kubernetes";if(t.isDockerenvPresent())return"docker";if(c.platform==="darwin")return"unknown-darwin";if(c.platform==="linux")return"unknown-linux";if(c.platform==="win32")return"unknown-win32";return"unknown"}
function k(){return!!(process.env.SSH_CONNECTION||process.env.SSH_CLIENT||process.env.SSH_TTY)}
var c={probeInternalNetworkAccess:ct,isCI:Le(!1),platform:["win32","darwin"].includes("darwin")?"darwin":"linux",arch:"arm64",nodeVersion:process.version,terminal:Nt(),isSSH:k,getPackageManagers(){return C().getPackageManagers()},getRuntimes(){return C().getRuntimes()},isRunningWithBun:b0,isWslEnvironment(){return C().isWslEnvironment()},isNpmFromWindowsPath(){return C().isNpmFromWindowsPath()},isConductor:xt,detectDeploymentEnvironment:h};
var Z=["us","eu","apac","jp","au","global"];
var P={};
Qr(P,{AGENT_PROXY_AUTH_TOKEN:()=>gt,ANTHROPIC_API_KEY:()=>at,ANTHROPIC_AUTH_TOKEN:()=>ut,ANTHROPIC_AWS_API_KEY:()=>Gt,ANTHROPIC_FEDERATION_RULE_ID:()=>Po,ANTHROPIC_FOUNDRY_API_KEY:()=>Ht,ANTHROPIC_FOUNDRY_AUTH_TOKEN:()=>mt,ANTHROPIC_ORGANIZATION_ID:()=>ao,ANTHROPIC_PROFILE:()=>Bo,ANTHROPIC_WORKSPACE_ID:()=>uo,AWS_BEARER_TOKEN_BEDROCK:()=>bt,AWS_CONTAINER_CREDENTIALS_FULL_URI:()=>Kt,AWS_CONTAINER_CREDENTIALS_RELATIVE_URI:()=>ft,AWS_ROLE_ARN:()=>dt,AWS_WEB_IDENTITY_TOKEN_FILE:()=>Ft,CLAUDE_CODE_ACCOUNT_TAGGED_ID:()=>Go,CLAUDE_CODE_ACCOUNT_UUID:()=>bo,CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR:()=>wt,CLAUDE_CODE_API_KEY_HELPER_TTL_MS:()=>Lo,CLAUDE_CODE_AUTH_FAIL_EXIT_MS:()=>To,CLAUDE_CODE_AWS_CHAIN_RESOLVE_TIMEOUT_MS:()=>lo,CLAUDE_CODE_CUSTOM_OAUTH_URL:()=>$t,CLAUDE_CODE_DESIGN_OAUTH_CLIENT_ID:()=>Qt,CLAUDE_CODE_ENABLE_PROXY_AUTH_HELPER:()=>co,CLAUDE_CODE_FEDERATION_CACHE_DIR:()=>Mo,CLAUDE_CODE_GATEWAY_TOKEN_FILE_DESCRIPTOR:()=>ht,CLAUDE_CODE_HFI_BEARER_TOKEN:()=>vt,CLAUDE_CODE_HOST_AUTH_ENV_VAR:()=>_o,CLAUDE_CODE_HOST_AUTH_REFRESH_TIMEOUT_MS:()=>oo,CLAUDE_CODE_HOST_CREDS_FILE:()=>Eo,CLAUDE_CODE_OAUTH_401_WAIT_MS:()=>Do,CLAUDE_CODE_OAUTH_CLIENT_ID:()=>Jt,CLAUDE_CODE_OAUTH_REFRESH_TOKEN:()=>jt,CLAUDE_CODE_OAUTH_SCOPES:()=>zt,CLAUDE_CODE_OAUTH_TOKEN:()=>Bt,CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR:()=>Xt,CLAUDE_CODE_ORGANIZATION_UUID:()=>Ho,CLAUDE_CODE_PROXY_AUTH_HELPER_TTL_MS:()=>po,CLAUDE_CODE_RATE_LIMIT_TIER:()=>fo,CLAUDE_CODE_SDK_HAS_HOST_AUTH_REFRESH:()=>to,CLAUDE_CODE_SDK_HAS_OAUTH_REFRESH:()=>qt,CLAUDE_CODE_SESSION_ACCESS_TOKEN:()=>ro,CLAUDE_CODE_SKIP_ANTHROPIC_AWS_AUTH:()=>io,CLAUDE_CODE_SKIP_ANTHROPIC_GOOGLE_CLOUD_AUTH:()=>Uo,CLAUDE_CODE_SKIP_AWS_CRED_CACHE:()=>No,CLAUDE_CODE_SKIP_BEDROCK_AUTH:()=>Ro,CLAUDE_CODE_SKIP_FOUNDRY_AUTH:()=>Io,CLAUDE_CODE_SKIP_MANTLE_AUTH:()=>xo,CLAUDE_CODE_SKIP_VERTEX_AUTH:()=>So,CLAUDE_CODE_SUBSCRIPTION_TYPE:()=>Fo,CLAUDE_CODE_USER_EMAIL:()=>mo,CLAUDE_CODE_WEBSOCKET_AUTH_FILE_DESCRIPTOR:()=>kt,CLAUDE_LOCAL_OAUTH_API_BASE:()=>Co,CLAUDE_LOCAL_OAUTH_APPS_BASE:()=>Ao,CLAUDE_LOCAL_OAUTH_CONSOLE_BASE:()=>Oo,CLAUDE_SESSION_INGRESS_TOKEN_FILE:()=>Zt,CLAUDE_TRUSTED_DEVICE_TOKEN:()=>so,CLOUDSDK_AUTH_ACCESS_TOKEN:()=>Wt,ENVIRONMENT_SERVICE_KEY:()=>Yt,MCP_CLIENT_SECRET:()=>yt,MCP_XAA_IDP_CLIENT_SECRET:()=>Vt,USE_LOCAL_OAUTH:()=>eo,USE_STAGING_OAUTH:()=>no});
var at=D.str();
var ut=D.str();
var Bt=D.str();
var bt=D.str();
var Gt=D.str();
var Ht=D.str();
var mt=D.str();
var Ft=D.str();
var dt=D.str();
var ft=D.str();
var Kt=D.str();
var Wt=D.str();
var vt=D.str();
var gt=D.str();
var Yt=D.str();
var yt=D.str();
var Vt=D.str();
var wt=D.str();
var Xt=D.str();
var ht=D.str();
var kt=D.str();
var Zt=D.str();
var jt=D.str();
var Jt=D.str();
var Qt=D.str();
var zt=D.str();
var $t=D.str();
var qt=D.bool();
var to=D.bool();
var oo=D.int({min:1});
var _o=D.str();
var Eo=D.str();
var ro=D.str();
var so=D.str();
var eo=D.bool();
var no=D.bool();
var Co=D.str();
var Ao=D.str();
var Oo=D.str();
var Do=D.int({min:0});
var To=D.int({min:0});
var Lo=D.int();
var co=D.bool();
var po=D.int();
var Ro=D.bool();
var So=D.bool();
var Io=D.bool();
var io=D.bool();
var Uo=D.bool();
var xo=D.bool();
var No=D.bool();
var lo=D.int({min:1,max:2147483647});
var Po=D.str();
var Mo=D.str();
var ao=D.str();
var uo=D.str();
var Bo=D.str();
var bo=D.str();
var Go=D.str();
var Ho=D.str();
var mo=D.str();
var Fo=D.str();
var fo=D.str();
var M={};
Qr(M,{ANT_CLAUDE_CODE_METRICS_ENDPOINT:()=>h_,ANT_OTEL_EXPORTER_OTLP_ENDPOINT:()=>v_,ANT_OTEL_EXPORTER_OTLP_HEADERS:()=>g_,ANT_OTEL_EXPORTER_OTLP_PROTOCOL:()=>Y_,ANT_OTEL_LOGS_EXPORTER:()=>y_,ANT_OTEL_METRICS_EXPORTER:()=>V_,ANT_OTEL_RESOURCE_ATTRIBUTES:()=>X_,ANT_OTEL_TRACES_EXPORTER:()=>w_,BETA_TRACING_ENDPOINT:()=>k_,CLAUDE_CODE_BENCH_LIVE_COUNTS:()=>qo,CLAUDE_CODE_BYOC_ENABLE_DATADOG:()=>e_,CLAUDE_CODE_DATADOG_FLUSH_INTERVAL_MS:()=>r_,CLAUDE_CODE_DD_ERROR_TRACKING_FLUSH_INTERVAL_MS:()=>s_,CLAUDE_CODE_DEBUG_LOGS_DIR:()=>go,CLAUDE_CODE_DEBUG_LOG_LEVEL:()=>vo,CLAUDE_CODE_DEBUG_REPAINTS:()=>Yo,CLAUDE_CODE_DIAGNOSTICS_FILE:()=>yo,CLAUDE_CODE_ENHANCED_TELEMETRY_BETA:()=>t_,CLAUDE_CODE_FRAME_TIMING_LOG:()=>Zo,CLAUDE_CODE_FRAME_TIMING_SAMPLE_EVERY:()=>jo,CLAUDE_CODE_OTEL_CONTENT_MAX_LENGTH:()=>H_,CLAUDE_CODE_OTEL_DIAG_STDERR:()=>n_,CLAUDE_CODE_OTEL_FLUSH_TIMEOUT_MS:()=>o_,CLAUDE_CODE_OTEL_HEADERS_HELPER_DEBOUNCE_MS:()=>E_,CLAUDE_CODE_OTEL_SHUTDOWN_TIMEOUT_MS:()=>__,CLAUDE_CODE_PERFETTO_TRACE:()=>ho,CLAUDE_CODE_PERFETTO_WRITE_INTERVAL_S:()=>ko,CLAUDE_CODE_PROFILE_STARTUP:()=>Xo,CLAUDE_CODE_SESSION_LOG:()=>Jo,CLAUDE_CODE_TEE_SDK_STDOUT:()=>$o,CLAUDE_CODE_TERMINAL_RECORDING:()=>zo,CLAUDE_DEBUG:()=>Ko,CLAUDE_PTY_RECORD:()=>Qo,DEBUG:()=>Wo,DEBUG_CLAUDE_AGENT_SDK:()=>Vo,DEBUG_SDK:()=>wo,OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT:()=>B_,OTEL_EXPORTER_OTLP_ENDPOINT:()=>D_,OTEL_EXPORTER_OTLP_HEADERS:()=>T_,OTEL_EXPORTER_OTLP_LOGS_ENDPOINT:()=>c_,OTEL_EXPORTER_OTLP_LOGS_HEADERS:()=>p_,OTEL_EXPORTER_OTLP_LOGS_PROTOCOL:()=>R_,OTEL_EXPORTER_OTLP_METRICS_ENDPOINT:()=>S_,OTEL_EXPORTER_OTLP_METRICS_HEADERS:()=>I_,OTEL_EXPORTER_OTLP_METRICS_PROTOCOL:()=>i_,OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE:()=>U_,OTEL_EXPORTER_OTLP_PROTOCOL:()=>L_,OTEL_EXPORTER_OTLP_TRACES_ENDPOINT:()=>x_,OTEL_EXPORTER_OTLP_TRACES_HEADERS:()=>N_,OTEL_EXPORTER_OTLP_TRACES_PROTOCOL:()=>l_,OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT:()=>b_,OTEL_LOGS_EXPORTER:()=>A_,OTEL_LOGS_EXPORT_INTERVAL:()=>M_,OTEL_LOG_ASSISTANT_RESPONSES:()=>F_,OTEL_LOG_MANAGED_SETTINGS:()=>K_,OTEL_LOG_RAW_API_BODIES:()=>W_,OTEL_LOG_TOOL_CONTENT:()=>d_,OTEL_LOG_TOOL_DETAILS:()=>f_,OTEL_LOG_USER_PROMPTS:()=>m_,OTEL_METRICS_EXPORTER:()=>C_,OTEL_METRIC_EXPORT_INTERVAL:()=>P_,OTEL_RESOURCE_ATTRIBUTES:()=>u_,OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT:()=>G_,OTEL_TRACES_EXPORTER:()=>O_,OTEL_TRACES_EXPORT_INTERVAL:()=>a_});
var Ko=D.bool();
var Wo=D.str();
var vo=D.str();
var go=D.str();
var Yo=D.bool();
var yo=D.str();
var Vo=D.bool();
var wo=D.bool();
var Xo=D.bool();
var ho=D.str();
var ko=D.int();
var Zo=D.str();
var jo=D.int();
var Jo=D.str();
var Qo=D.str();
var zo=D.str();
var $o=D.bool();
var qo=D.bool();
var t_=D.bool();
var o_=D.int();
var __=D.int();
var E_=D.int();
var r_=D.int({min:1});
var s_=D.int({min:1});
var e_=D.bool();
var n_=D.bool();
var C_=D.str();
var A_=D.str();
var O_=D.str();
var D_=D.str();
var T_=D.str();
var L_=D.str();
var c_=D.str();
var p_=D.str();
var R_=D.str();
var S_=D.str();
var I_=D.str();
var i_=D.str();
var U_=D.str();
var x_=D.str();
var N_=D.str();
var l_=D.str();
var P_=D.int();
var M_=D.int();
var a_=D.int();
var u_=D.str();
var B_=D.int({min:0});
var b_=D.int({min:0});
var G_=D.int({min:0});
var H_=D.int({min:1,digitsOnly:!0});
var m_=D.bool();
var F_=D.triBool();
var d_=D.bool();
var f_=D.bool();
var K_=D.bool();
var W_=D.bool();
var v_=D.str();
var g_=D.str();
var Y_=D.str();
var y_=D.str();
var V_=D.str();
var w_=D.str();
var X_=D.str();
var h_=D.str();
var k_=D.str();
var u={};
Qr(u,{CLAUDE_AX_PREPARK_MS:()=>J_,CLAUDE_AX_SCREEN_READER:()=>Z_,CLAUDE_AX_STARTUP_QUIET_MS:()=>j_,CLAUDE_CHROME_CLASSIFIER_FLOOR:()=>Q_,CLAUDE_CODE_ACCESSIBILITY:()=>ps,CLAUDE_CODE_ACT_DONT_REDERIVE:()=>Rs,CLAUDE_CODE_ALT_SCREEN_FULL_REPAINT:()=>$_,CLAUDE_CODE_AMBER_ASTROLABE:()=>hr,CLAUDE_CODE_ARTIFACT_ASSETS:()=>ys,CLAUDE_CODE_ARTIFACT_COMMENTS:()=>as,CLAUDE_CODE_ARTIFACT_COMMENTS_AUTOREACT:()=>us,CLAUDE_CODE_ARTIFACT_COMMENT_FAST_ACK:()=>bs,CLAUDE_CODE_ARTIFACT_COMMENT_FAST_ACK_FIXED:()=>Gs,CLAUDE_CODE_ARTIFACT_COMMENT_RESPONDER:()=>Bs,CLAUDE_CODE_ARTIFACT_DB:()=>Hs,CLAUDE_CODE_ARTIFACT_DB_STR_REPLACE:()=>ms,CLAUDE_CODE_ARTIFACT_DELETE:()=>ds,CLAUDE_CODE_ARTIFACT_FRESH_READ:()=>Qs,CLAUDE_CODE_ARTIFACT_HOT:()=>ws,CLAUDE_CODE_ARTIFACT_MULTI_FILE:()=>Vs,CLAUDE_CODE_ARTIFACT_OPENING_PREFETCH:()=>zs,CLAUDE_CODE_ARTIFACT_OPEN_ACTION:()=>Ks,CLAUDE_CODE_ARTIFACT_PATH_PIN:()=>Xs,CLAUDE_CODE_ARTIFACT_PIN:()=>Ws,CLAUDE_CODE_ARTIFACT_PRESENCE:()=>Ys,CLAUDE_CODE_ARTIFACT_PREVIEW:()=>fs,CLAUDE_CODE_ARTIFACT_QUICKSTART:()=>Js,CLAUDE_CODE_ARTIFACT_REPL:()=>Fs,CLAUDE_CODE_ARTIFACT_ROOM:()=>gs,CLAUDE_CODE_ARTIFACT_SHARE:()=>vs,CLAUDE_CODE_ARTIFACT_START_KIT:()=>$s,CLAUDE_CODE_ARTIFACT_TEXT_VARIANT:()=>ks,CLAUDE_CODE_ARTIFACT_TOOLSET:()=>hs,CLAUDE_CODE_ARTIFACT_TYPES:()=>Zs,CLAUDE_CODE_ARTIFACT_TYPE_CATALOG:()=>js,CLAUDE_CODE_ARTIFACT_TYPE_CLOUD_CREATE:()=>qs,CLAUDE_CODE_ARTIFACT_VERIFY:()=>te,CLAUDE_CODE_ATTRIBUTION_ANNOUNCEMENT:()=>Ss,CLAUDE_CODE_AUTO_CONNECT_IDE:()=>oe,CLAUDE_CODE_AUTO_MODE_SERVER:()=>_e,CLAUDE_CODE_BASALT_COVE:()=>sE,CLAUDE_CODE_BASH_EDIT_DIFF:()=>EE,CLAUDE_CODE_BASH_OUTPUT_AUDIENCE_NOTE:()=>Ps,CLAUDE_CODE_BASH_SANDBOX_SHOW_INDICATOR:()=>Ee,CLAUDE_CODE_BG_TASKS_REPORT_RUNNING:()=>SE,CLAUDE_CODE_BISON_CAIRN:()=>kr,CLAUDE_CODE_BREEZY_HORIZON:()=>eE,CLAUDE_CODE_BUBBLEWRAP:()=>re,CLAUDE_CODE_CCR_EARLY_HYDRATE_PREFETCH:()=>se,CLAUDE_CODE_CCR_EARLY_PLUGINS_SYNC:()=>ne,CLAUDE_CODE_CCR_EARLY_REMOTE_CONNECT:()=>ee,CLAUDE_CODE_CHILD_SESSION:()=>Ce,CLAUDE_CODE_CHROME_MCP_ORG_DENIED:()=>Oe,CLAUDE_CODE_COLD_COMPACT:()=>De,CLAUDE_CODE_COORDINATOR_FORCE_WORKER_INHERIT_MODEL:()=>IE,CLAUDE_CODE_COWORK_FRAME_ARTIFACTS:()=>xE,CLAUDE_CODE_COZY_TEAPOT:()=>rE,CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING:()=>aE,CLAUDE_CODE_DISABLE_ADMIN_ENV_UNION:()=>PE,CLAUDE_CODE_DISABLE_ADVISOR_TOOL:()=>uE,CLAUDE_CODE_DISABLE_AGENT_VIEW:()=>BE,CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN:()=>bE,CLAUDE_CODE_DISABLE_ARTIFACT:()=>GE,CLAUDE_CODE_DISABLE_ATTACHMENTS:()=>HE,CLAUDE_CODE_DISABLE_ATTRIBUTION_CROSS_REPO:()=>mE,CLAUDE_CODE_DISABLE_AUTH_REFRESH_LOCK:()=>FE,CLAUDE_CODE_DISABLE_AUTO_MEMORY:()=>dE,CLAUDE_CODE_DISABLE_AWAITING_USER_IDLE:()=>fE,CLAUDE_CODE_DISABLE_BACKGROUND_TASKS:()=>KE,CLAUDE_CODE_DISABLE_BEDROCK_CONTENT_TYPE_DEFAULT:()=>vE,CLAUDE_CODE_DISABLE_BEDROCK_CONTENT_TYPE_GUARD:()=>gE,CLAUDE_CODE_DISABLE_BG_EXIT_HANDOFF:()=>YE,CLAUDE_CODE_DISABLE_BUNDLED_SKILLS:()=>yE,CLAUDE_CODE_DISABLE_CFC_PROMPT:()=>VE,CLAUDE_CODE_DISABLE_CLAUDE_API_SKILL:()=>wE,CLAUDE_CODE_DISABLE_CLAUDE_CODE_SKILL:()=>XE,CLAUDE_CODE_DISABLE_CLAUDE_MDS:()=>hE,CLAUDE_CODE_DISABLE_CRON:()=>kE,CLAUDE_CODE_DISABLE_DANGEROUS_RM_TIMEOUT:()=>ZE,CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS:()=>jE,CLAUDE_CODE_DISABLE_EXPLORE_PLAN_AGENTS:()=>JE,CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY:()=>QE,CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING:()=>zE,CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS:()=>$E,CLAUDE_CODE_DISABLE_LAUNCH_COMPOSER:()=>qE,CLAUDE_CODE_DISABLE_MCP_TASK_BACKGROUND:()=>WE,CLAUDE_CODE_DISABLE_MEMORY_BULK_INFLATE:()=>tr,CLAUDE_CODE_DISABLE_MEMORY_MASS_DELETE_HOLD:()=>or,CLAUDE_CODE_DISABLE_MEMORY_PERIODIC_RESYNC:()=>_r,CLAUDE_CODE_DISABLE_MEMORY_RO_UNSAVED_NOTICE:()=>Er,CLAUDE_CODE_DISABLE_MEMORY_STREAM_LIST:()=>rr,CLAUDE_CODE_DISABLE_MOUSE:()=>nr,CLAUDE_CODE_DISABLE_MOUSE_CLICKS:()=>Cr,CLAUDE_CODE_DISABLE_NESTED_CHAIN_IDLE:()=>Ar,CLAUDE_CODE_DISABLE_NESTED_USER_REPAIR:()=>Or,CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC:()=>Dr,CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK:()=>Tr,CLAUDE_CODE_DISABLE_NOTIFICATION_PRESENCE_CHECK:()=>Lr,CLAUDE_CODE_DISABLE_OFFICIAL_MARKETPLACE_AUTOINSTALL:()=>cr,CLAUDE_CODE_DISABLE_ORG_MEMORY:()=>pr,CLAUDE_CODE_DISABLE_PERMISSION_PROMPT_NOTIFY_HOOKS:()=>sr,CLAUDE_CODE_DISABLE_POLICY_SKILLS:()=>Rr,CLAUDE_CODE_DISABLE_POWERSHELL_CMD_RM_DENY:()=>Sr,CLAUDE_CODE_DISABLE_PRECOMPACT_SKIP:()=>Ir,CLAUDE_CODE_DISABLE_REFUSAL_FALLBACK:()=>ir,CLAUDE_CODE_DISABLE_REFUSAL_RETRY:()=>Ur,CLAUDE_CODE_DISABLE_STARTUP_WORK_GATE:()=>Pr,CLAUDE_CODE_DISABLE_SUBSTITUTION_RM_PROMPT:()=>lr,CLAUDE_CODE_DISABLE_TERMINAL_TITLE:()=>Mr,CLAUDE_CODE_DISABLE_THINKING:()=>ur,CLAUDE_CODE_DISABLE_VIRTUAL_SCROLL:()=>Br,CLAUDE_CODE_DISABLE_WEB_FETCH:()=>br,CLAUDE_CODE_DISABLE_WINDOWS_SHELL_LAUNCHER:()=>pn,CLAUDE_CODE_DISABLE_WORKFLOWS:()=>Gr,CLAUDE_CODE_EDITOR_CODELIVERY:()=>iE,CLAUDE_CODE_ELEGANT_MEADOW:()=>pE,CLAUDE_CODE_ENABLE_APPEND_SUBAGENT_PROMPT:()=>mr,CLAUDE_CODE_ENABLE_AWAY_SUMMARY:()=>Fr,CLAUDE_CODE_ENABLE_BACKGROUND_PLUGIN_REFRESH:()=>dr,CLAUDE_CODE_ENABLE_CFC:()=>fr,CLAUDE_CODE_ENABLE_DESIGN_SYNC:()=>Kr,CLAUDE_CODE_ENABLE_EXPERIMENTAL_ADVISOR_TOOL:()=>Wr,CLAUDE_CODE_ENABLE_FEEDBACK_SURVEY_FOR_OTEL:()=>vr,CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING:()=>gr,CLAUDE_CODE_ENABLE_FUNCTION_HOOKS:()=>xC,CLAUDE_CODE_ENABLE_LAUNCH_COMPOSER:()=>Yr,CLAUDE_CODE_ENABLE_MENU_KIND_LANES:()=>yr,CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION:()=>$r,CLAUDE_CODE_ENABLE_REFRESH_MCP_TOOLS:()=>qr,CLAUDE_CODE_ENABLE_REMOTE_RECAP:()=>ts,CLAUDE_CODE_ENABLE_SDK_FILE_CHECKPOINTING:()=>os,CLAUDE_CODE_ENABLE_TASKS:()=>_s,CLAUDE_CODE_ENABLE_TODO_TOOLS:()=>Es,CLAUDE_CODE_ENABLE_TOKEN_USAGE_ATTACHMENT:()=>rs,CLAUDE_CODE_ENABLE_XAA:()=>ss,CLAUDE_CODE_EVAL_INTERVIEW_SESSION:()=>_n,CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS:()=>Te,CLAUDE_CODE_EXPERIMENTAL_OBSERVER_AGENTS:()=>ce,CLAUDE_CODE_FLEETVIEW_SIMPLE:()=>Vr,CLAUDE_CODE_FORCE_MID_CONVERSATION_SYSTEM:()=>Ne,CLAUDE_CODE_FORCE_SESSION_PERSISTENCE:()=>ie,CLAUDE_CODE_FORCE_STRIKETHROUGH:()=>Ue,CLAUDE_CODE_FORCE_TERMINAL_IMAGES:()=>xe,CLAUDE_CODE_FORCE_WINDOWS_CREDMAN:()=>Pe,CLAUDE_CODE_FORK_SUBAGENT:()=>pe,CLAUDE_CODE_FORWARD_SUBAGENT_TEXT:()=>Me,CLAUDE_CODE_FORWARD_USER_INTENT:()=>UE,CLAUDE_CODE_GATEWAY_HINT_HEADERS:()=>In,CLAUDE_CODE_GB_DISK_CACHE_WHEN_TELEMETRY_OFF:()=>wr,CLAUDE_CODE_GENTLE_PARASOL:()=>oE,CLAUDE_CODE_GLOB_HIDDEN:()=>Re,CLAUDE_CODE_GLOB_NO_IGNORE:()=>Se,CLAUDE_CODE_GORSE_PLOVER:()=>jr,CLAUDE_CODE_HARBOR_KITE:()=>es,CLAUDE_CODE_HARBOR_KITE_CLOUD:()=>Cs,CLAUDE_CODE_HARBOR_KITE_PACING_OFF:()=>ns,CLAUDE_CODE_HIDE_CWD:()=>Ie,CLAUDE_CODE_HOOKS_SAME_THREAD:()=>UC,CLAUDE_CODE_HOST_SCHEDULED_RUN:()=>NE,CLAUDE_CODE_HOVER_REST:()=>Xr,CLAUDE_CODE_HUMBLE_HAMMOCK:()=>AE,CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL:()=>ue,CLAUDE_CODE_IDE_SKIP_VALID_CHECK:()=>Be,CLAUDE_CODE_INCLUDE_PARTIAL_MESSAGES:()=>be,CLAUDE_CODE_INLINE_TOOLS:()=>le,CLAUDE_CODE_INTRO_FRAME:()=>Is,CLAUDE_CODE_JUNIPER_SUNDIAL:()=>zr,CLAUDE_CODE_KB_COHESION_FIXES:()=>cs,CLAUDE_CODE_LANTERN_PRISM:()=>As,CLAUDE_CODE_LARCH_CISTERN:()=>Zr,CLAUDE_CODE_MEMORY_PUSH_DELETE_MODE:()=>er,CLAUDE_CODE_MODEL_CAPABILITIES:()=>is,CLAUDE_CODE_NANKEEN_KESTREL:()=>ME,CLAUDE_CODE_NATIVE_CURSOR:()=>Ge,CLAUDE_CODE_NEW_INIT:()=>He,CLAUDE_CODE_NONBLOCKING_STDOUT:()=>Fe,CLAUDE_CODE_NO_FLICKER:()=>me,CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE:()=>de,CLAUDE_CODE_PARSED_WILLOW:()=>TE,CLAUDE_CODE_PEWTER_OWL:()=>Un,CLAUDE_CODE_PEWTER_OWL_TOOL:()=>xn,CLAUDE_CODE_PLAN_MODE_REQUIRED:()=>fe,CLAUDE_CODE_PLUGIN_BINARY_ASSETS:()=>Dn,CLAUDE_CODE_PLUGIN_DIRS:()=>lC,CLAUDE_CODE_PLUGIN_DIR_WATCH:()=>NC,CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE:()=>On,CLAUDE_CODE_PLUGIN_PREFER_HTTPS:()=>Ln,CLAUDE_CODE_PLUGIN_USE_ZIP_CACHE:()=>Tn,CLAUDE_CODE_POLISHED_DEWDROP:()=>nE,CLAUDE_CODE_POLL_EVENTS:()=>Ke,CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY:()=>cn,CLAUDE_CODE_PROACTIVE:()=>We,CLAUDE_CODE_PROJECTS_SESSION:()=>An,CLAUDE_CODE_PROMPT_CACHE_TTL:()=>AC,CLAUDE_CODE_PROPAGATE_TRACEPARENT:()=>Rn,CLAUDE_CODE_REFUSAL_FALLBACK_CATCH_ALL:()=>xr,CLAUDE_CODE_REMOTE_TOOLS_FORWARD:()=>PC,CLAUDE_CODE_REMOTE_TOOLS_PIN_STORED_LOGIN:()=>lE,CLAUDE_CODE_REPORT_FINDINGS:()=>Nr,CLAUDE_CODE_RUSTLING_PIXEL:()=>CE,CLAUDE_CODE_SEND_FEEDBACK:()=>ar,CLAUDE_CODE_SESSION_ATTENDED:()=>Ae,CLAUDE_CODE_SILENT_TURN_REMINDER:()=>xs,CLAUDE_CODE_SILENT_TURN_REMINDER_TEXT:()=>ls,CLAUDE_CODE_SILENT_TURN_REMINDER_TURNS:()=>Ns,CLAUDE_CODE_SKILL_PROPOSALS:()=>ve,CLAUDE_CODE_SKIP_PLUGIN_MCP_SERVERS:()=>ge,CLAUDE_CODE_SKIP_PLUGIN_MCP_SERVERS_EXCEPT:()=>Ye,CLAUDE_CODE_SKIP_PROJECT_BACKFILL:()=>ye,CLAUDE_CODE_SKIP_PROMPT_HISTORY:()=>Ve,CLAUDE_CODE_SKIP_REPO_UPLOAD:()=>Xe,CLAUDE_CODE_SQUISHY_NEWT:()=>cE,CLAUDE_CODE_STELLAR_DRIFT:()=>OE,CLAUDE_CODE_SUBAGENT_CACHE_EVICT:()=>he,CLAUDE_CODE_SUBAGENT_PROMPT_CACHE_TTL:()=>OC,CLAUDE_CODE_SUPPRESS_SESSION_ATTRIBUTION:()=>ke,CLAUDE_CODE_SYNC_PLUGINS:()=>je,CLAUDE_CODE_SYNC_PLUGIN_INSTALL:()=>Ze,CLAUDE_CODE_SYNC_SKILLS:()=>Je,CLAUDE_CODE_TAG_ISMETA_MESSAGES:()=>Qe,CLAUDE_CODE_THINKING_DISPLAY_UPDATES:()=>Ms,CLAUDE_CODE_THISTLE_GREBE:()=>q_,CLAUDE_CODE_THRIFTY_SONIC:()=>_E,CLAUDE_CODE_TOASTY_THIMBLE:()=>tE,CLAUDE_CODE_TODO_REMINDER_MODE:()=>Os,CLAUDE_CODE_TOTAL_TOKENS_REMINDER:()=>Ds,CLAUDE_CODE_TOTAL_TOKENS_REMINDER_AFTER_USER_TURN:()=>Ls,CLAUDE_CODE_TOTAL_TOKENS_REMINDER_BUDGET:()=>Ts,CLAUDE_CODE_TRANSCRIPT_LOCAL_GC:()=>ze,CLAUDE_CODE_TURN_UPDATES:()=>Us,CLAUDE_CODE_TWO_STAGE_CLASSIFIER:()=>$e,CLAUDE_CODE_USE_COWORK_PLUGINS:()=>qe,CLAUDE_CODE_USE_NATIVE_FILE_SEARCH:()=>tn,CLAUDE_CODE_USE_POWERSHELL_TOOL:()=>on,CLAUDE_CODE_WEBFETCH_CACHE_TTL_MS:()=>rn,CLAUDE_CODE_WEBFETCH_DEADLINE_MS:()=>sn,CLAUDE_CODE_WEBFETCH_USE_CCR_PROXY:()=>en,CLAUDE_CODE_WEBSEARCH_USE_CCR_PROXY:()=>nn,CLAUDE_CODE_WEB_FETCH_AGENT:()=>En,CLAUDE_CODE_WEB_SEARCH_FAST_ARG:()=>Cn,CLAUDE_CODE_WHIMSICAL_ELEPHANT:()=>LE,CLAUDE_CODE_WILLOW_TERN:()=>Jr,CLAUDE_CODE_WISE_COMET:()=>DE,CLAUDE_CODE_WORKFLOWS:()=>Hr,CLAUDE_CODE_WORKFLOW_MAX_CONCURRENT_AGENTS:()=>bn,CLAUDE_CODE_WORKFLOW_PREFIX_STAGGER_MS:()=>Bn,CLAUDE_CODE_WORKFLOW_SIZE_WARNING_AGENTS:()=>an,CLAUDE_CODE_WORKFLOW_SIZE_WARNING_TOKENS:()=>un,CLAUDE_DISABLE_ADOPT:()=>Nn,CLAUDE_IMPORT_CONVERSATIONS:()=>ln,CLAUDE_RUNNER_DISABLE_AWAITING_ACTION_OVERRIDE:()=>Pn,CLAUDE_WORKFLOW_NAME_ONLY:()=>Mn,DISABLE_AUTOUPDATER:()=>Hn,DISABLE_AUTO_COMPACT:()=>Gn,DISABLE_BRIEF_MODE_STOP_HOOK:()=>mn,DISABLE_BUG_COMMAND:()=>Fn,DISABLE_COST_WARNINGS:()=>dn,DISABLE_DOCTOR_COMMAND:()=>fn,DISABLE_ERROR_REPORTING:()=>Kn,DISABLE_EXTRA_USAGE_COMMAND:()=>Wn,DISABLE_FEEDBACK_COMMAND:()=>vn,DISABLE_GROWTHBOOK:()=>gn,DISABLE_INSTALL_GITHUB_APP_COMMAND:()=>Yn,DISABLE_INTERLEAVED_THINKING:()=>yn,DISABLE_LOGIN_COMMAND:()=>Vn,DISABLE_LOGOUT_COMMAND:()=>wn,DISABLE_PROMPT_CACHING:()=>Xn,DISABLE_PROMPT_CACHING_FABLE:()=>Jn,DISABLE_PROMPT_CACHING_HAIKU:()=>hn,DISABLE_PROMPT_CACHING_MYTHOS:()=>Qn,DISABLE_PROMPT_CACHING_OPUS:()=>Zn,DISABLE_PROMPT_CACHING_SONNET:()=>jn,DISABLE_TELEMETRY:()=>zn,DISABLE_UPDATES:()=>$n,DISABLE_UPGRADE_COMMAND:()=>qn,EMBEDDED_SEARCH_TOOLS:()=>IC,ENABLE_BETA_TRACING_DETAILED:()=>tC,ENABLE_CLAUDEAI_MCP_SERVERS:()=>oC,ENABLE_ENHANCED_TELEMETRY_BETA:()=>_C,ENABLE_LOCKLESS_UPDATES:()=>EC,ENABLE_LSP_TOOL:()=>rC,ENABLE_MCP_LARGE_OUTPUT_FILES:()=>sC,ENABLE_PID_BASED_VERSION_LOCKING:()=>eC,ENABLE_PROMPT_CACHING_1H:()=>nC,ENABLE_PROMPT_CACHING_1H_BEDROCK:()=>CC,ENABLE_SESSION_BACKGROUNDING:()=>DC,ENABLE_SESSION_PERSISTENCE:()=>TC,ENABLE_TOOL_SEARCH:()=>LC,FORCE_AUTOUPDATE_PLUGINS:()=>cC,FORCE_CODE_TERMINAL:()=>pC,FORCE_PROMPT_CACHING_5M:()=>RC,FORCE_VCR:()=>SC,INK_SCREEN_READER:()=>z_,USE_API_CONTEXT_MANAGEMENT:()=>iC});
var N2e=["5m","1h"];
var Z_=D.triBool();
var j_=D.int({min:0});
var J_=D.int({min:0});
var Q_=D.triBool();
var z_=D.bool();
var $_=D.bool();
var q_=D.str();
var tE=D.str();
var oE=D.str();
var _E=D.triBool();
var EE=D.triBool();
var rE=D.enum(["strict","relaxed"]);
var sE=D.bool();
var eE=D.str();
var nE=D.enum(["drop","block","off"]);
var CE=D.str();
var AE=D.triBool();
var OE=D.triBool();
var DE=D.triBool();
var TE=D.triBool();
var LE=D.triBool();
var cE=D.triBool();
var pE=D.triBool();
var SE=D.triBool();
var IE=D.bool();
var iE=D.bool();
var UE=D.bool();
var xE=D.bool();
var NE=D.bool();
var lE=D.bool();
var PE=D.bool();
var ME=D.bool();
var aE=D.bool();
var uE=D.bool();
var BE=D.bool();
var bE=D.bool();
var GE=D.bool();
var HE=D.bool();
var mE=D.bool();
var FE=D.bool();
var dE=D.bool();
var fE=D.bool();
var KE=D.bool();
var WE=D.bool();
var vE=D.bool();
var gE=D.bool();
var YE=D.bool();
var yE=D.bool();
var VE=D.bool();
var wE=D.bool();
var XE=D.bool();
var hE=D.bool();
var kE=D.bool();
var ZE=D.bool();
var jE=D.bool();
var JE=D.bool();
var QE=D.bool();
var zE=D.bool();
var $E=D.triBool();
var qE=D.bool();
var tr=D.bool();
var or=D.bool();
var _r=D.bool();
var Er=D.bool();
var rr=D.bool();
var sr=D.bool();
var er=D.enum(["corroborate","immediate","never"]);
var nr=D.triBool();
var Cr=D.triBool();
var Ar=D.bool();
var Or=D.bool();
var Dr=D.bool();
var Tr=D.bool();
var Lr=D.bool();
var cr=D.bool();
var pr=D.bool();
var Rr=D.bool();
var Sr=D.bool();
var Ir=D.bool();
var ir=D.bool();
var Ur=D.bool();
var xr=D.triBool();
var Nr=D.bool();
var lr=D.bool();
var Pr=D.bool();
var Mr=D.bool();
var ar=D.triBool();
var ur=D.bool();
var Br=D.bool();
var br=D.bool();
var Gr=D.bool();
var Hr=D.triBool();
var mr=D.bool();
var Fr=D.bool();
var dr=D.bool();
var fr=D.triBool();
var Kr=D.bool();
var Wr=D.bool();
var vr=D.bool();
var gr=D.triBool();
var Yr=D.bool();
var yr=D.bool();
var Vr=D.bool();
var wr=D.bool();
var Xr=D.triBool();
var hr=D.bool();
var kr=D.triBool();
var Zr=D.bool();
var jr=D.bool();
var Jr=D.bool();
var zr=D.int({min:1,digitsOnly:!0});
var $r=D.triBool();
var qr=D.bool();
var ts=D.triBool();
var os=D.bool();
var _s=D.triBool();
var Es=D.bool();
var rs=D.bool();
var ss=D.bool();
var es=D.str();
var ns=D.bool();
var Cs=D.bool();
var As=D.bool();
var Os=D.enum(["baseline","off"]);
var Ds=D.str();
var Ts=D.int();
var Ls=D.triBool();
var cs=D.bool();
var ps=D.bool();
var Rs=D.triBool();
var Ss=D.triBool();
var Is=D.triBool();
var is=D.str();
var Us=D.triBool();
var xs=D.triBool();
var Ns=D.int({min:1});
var ls=D.str();
var Ps=D.triBool();
var Ms=D.triBool();
var as=D.triBool();
var us=D.triBool();
var Bs=D.triBool();
var bs=D.triBool();
var Gs=D.triBool();
var Hs=D.triBool();
var ms=D.triBool();
var Fs=D.triBool();
var ds=D.triBool();
var fs=D.triBool();
var Ks=D.triBool();
var Ws=D.triBool();
var vs=D.triBool();
var gs=D.triBool();
var Ys=D.triBool();
var ys=D.triBool();
var Vs=D.triBool();
var ws=D.triBool();
var Xs=D.triBool();
var hs=D.triBool();
var ks=D.enum(["v0","v1","v2"]);
var Zs=D.triBool();
var js=D.triBool();
var Js=D.triBool();
var Qs=D.triBool();
var zs=D.triBool();
var $s=D.triBool();
var qs=D.triBool();
var te=D.triBool();
var oe=D.triBool();
var _e=D.str();
var Ee=D.bool();
var re=D.bool();
var se=D.bool();
var ee=D.bool();
var ne=D.bool();
var Ce=D.bool();
var Ae=D.triBool();
var Oe=D.bool();
var De=D.bool();
var Te=D.bool();
var ce=D.bool();
var pe=D.triBool();
var Re=D.bool();
var Se=D.bool();
var Ie=D.bool();
var ie=D.bool();
var Ue=D.bool();
var xe=D.bool();
var Ne=D.bool();
var le=D.triBool();
var Pe=D.str();
var Me=D.bool();
var ue=D.bool();
var Be=D.bool();
var be=D.bool();
var Ge=D.bool();
var He=D.bool();
var me=D.triBool();
var Fe=D.triBool();
var de=D.bool();
var fe=D.bool();
var Ke=D.bool();
var We=D.bool();
var ve=D.bool();
var ge=D.bool();
var Ye=D.str();
var ye=D.bool();
var Ve=D.bool();
var Xe=D.bool();
var he=D.bool();
var ke=D.bool();
var Ze=D.bool();
var je=D.bool();
var Je=D.bool();
var Qe=D.bool();
var ze=D.triBool();
var $e=D.bool();
var qe=D.bool();
var tn=D.bool();
var on=D.triBool();
var _n=D.bool();
var En=D.triBool();
var rn=D.int({min:1,digitsOnly:!0});
var sn=D.int({min:0,digitsOnly:!0});
var en=D.bool();
var nn=D.bool();
var Cn=D.triBool();
var An=D.bool();
var On=D.bool();
var Dn=D.bool();
var Tn=D.bool();
var Ln=D.bool();
var cn=D.bool();
var pn=D.bool();
var Rn=D.bool();
var In=D.triBool();
var Un=D.triBool();
var xn=D.triBool();
var Nn=D.bool();
var ln=D.bool();
var Pn=D.bool();
var Mn=D.bool();
var an=D.int({min:1});
var un=D.int({min:1});
var Bn=D.int({min:0});
var bn=D.int({min:1,max:256,digitsOnly:!0});
var Gn=D.bool();
var Hn=D.bool();
var mn=D.bool();
var Fn=D.bool();
var dn=D.bool();
var fn=D.bool();
var Kn=D.bool();
var Wn=D.bool();
var vn=D.bool();
var gn=D.bool();
var Yn=D.bool();
var yn=D.bool();
var Vn=D.bool();
var wn=D.bool();
var Xn=D.bool();
var hn=D.bool();
var Zn=D.bool();
var jn=D.bool();
var Jn=D.bool();
var Qn=D.bool();
var zn=D.bool();
var $n=D.bool();
var qn=D.bool();
var tC=D.bool();
var oC=D.triBool();
var _C=D.bool();
var EC=D.bool();
var rC=D.bool();
var sC=D.triBool();
var eC=D.triBool();
var nC=D.bool();
var CC=D.bool();
var AC=D.enum(N2e);
var OC=D.enum(N2e);
var DC=D.bool();
var TC=D.bool();
var LC=D.str();
var cC=D.bool();
var pC=D.bool();
var RC=D.bool();
var SC=D.bool();
var IC=D.bool();
var iC=D.bool();
var UC=D.bool();
var xC=D.triBool();
var NC=D.triBool();
var lC=D.str();
var PC=D.bool();
var B={};
Qr(B,{ALACRITTY_LOG:()=>OO,ALLUSERSPROFILE:()=>LA,ANDROID_HOME:()=>VA,ANDROID_SDK_ROOT:()=>wA,APPDATA:()=>EA,APP_URL:()=>yD,AWS_CA_BUNDLE:()=>bA,AWS_EXECUTION_ENV:()=>BD,AWS_LAMBDA_FUNCTION_NAME:()=>uD,AZURE_FUNCTIONS_ENVIRONMENT:()=>YD,BAT_THEME:()=>kD,BROWSER:()=>wC,BUILDKITE:()=>CD,BUN_CHROME_PATH:()=>hD,BUN_INSTALL:()=>XD,CARGO_HTTP_CAINFO:()=>HA,CDPATH:()=>uC,CF_PAGES:()=>MD,CIRCLECI:()=>nD,CLOUDSDK_ACTIVE_CONFIG_NAME:()=>WD,CLOUDSDK_CONFIG:()=>KD,CLOUDSDK_CORE_CUSTOM_CA_CERTS_FILE:()=>uA,CODER:()=>LD,CODER_WORKSPACE_NAME:()=>cD,CODESPACES:()=>TD,COLORFGBG:()=>ZA,COLORTERM:()=>kA,COMPUTERNAME:()=>tA,COMSPEC:()=>dC,CONTAINER_SANDBOX_MOUNT_POINT:()=>oA,CURL_CA_BUNDLE:()=>aA,CURSOR_TRACE_ID:()=>bO,ComSpec:()=>KC,ConEmuANSI:()=>NO,ConEmuPID:()=>lO,ConEmuTask:()=>PO,DAYTONA_WS_ID:()=>SD,DEMO_VERSION:()=>$D,DENO_CERT:()=>GA,DENO_DEPLOYMENT_ID:()=>aD,DISPLAY:()=>XC,DO_NOT_TRACK:()=>jA,DYNO:()=>PD,EDITOR:()=>yC,FORCE_COLOR:()=>hA,GCLOUD_PROJECT:()=>HD,GCM_INTERACTIVE:()=>WO,GH_CONFIG_DIR:()=>YO,GH_ENTERPRISE_TOKEN:()=>hO,GH_HOST:()=>XO,GH_TOKEN:()=>wO,GITHUB_ACTIONS:()=>QO,GITHUB_ACTION_INPUTS:()=>zO,GITHUB_ACTION_PATH:()=>$O,GITHUB_ACTOR:()=>qO,GITHUB_ACTOR_ID:()=>tD,GITHUB_ENTERPRISE_TOKEN:()=>ZO,GITHUB_ENV:()=>jO,GITHUB_EVENT_NAME:()=>oD,GITHUB_EVENT_PATH:()=>_D,GITHUB_REPOSITORY:()=>ED,GITHUB_REPOSITORY_ID:()=>rD,GITHUB_REPOSITORY_OWNER:()=>sD,GITHUB_REPOSITORY_OWNER_ID:()=>eD,GITHUB_TOKEN:()=>kO,GITHUB_WORKSPACE:()=>JO,GITLAB_CI:()=>AD,GITPOD_WORKSPACE_ID:()=>pD,GIT_ASKPASS:()=>KO,GIT_CONFIG_COUNT:()=>vO,GIT_CONFIG_GLOBAL:()=>gO,GIT_CONFIG_NOSYSTEM:()=>WA,GIT_SSH_COMMAND:()=>dO,GIT_SSL_CAINFO:()=>KA,GIT_SSL_CAPATH:()=>vA,GIT_TERMINAL_PROMPT:()=>fO,GNOME_TERMINAL_SERVICE:()=>CO,GOOGLE_APPLICATION_CREDENTIALS:()=>mD,GOOGLE_CLOUD_PROJECT:()=>GD,GOOGLE_CLOUD_WORKSTATIONS:()=>RD,GRPC_DEFAULT_SSL_ROOTS_FILE_PATH:()=>FA,HEX_CACERTS_PATH:()=>fA,HISTFILE:()=>UA,HOME:()=>MC,HOMEDRIVE:()=>CA,HOMEPATH:()=>AA,HOMESHARE:()=>OA,HTTPLIB2_CA_CERTS:()=>BA,HUB_CONFIG:()=>yO,INTELLIJ_TERMINAL_COMMAND_BLOCKS:()=>MO,INTELLIJ_TERMINAL_COMMAND_BLOCKS_REWORKED:()=>aO,IS_DEMO:()=>zD,IS_SANDBOX:()=>QD,ITERM_SESSION_ID:()=>rO,JAVA_HOME:()=>YA,JAVA_TOOL_OPTIONS:()=>yA,KITTY_WINDOW_ID:()=>sO,KONSOLE_VERSION:()=>eO,KUBERNETES_SERVICE_HOST:()=>wD,K_SERVICE:()=>bD,LANG:()=>kC,LC_ALL:()=>ZC,LC_TERMINAL:()=>$A,LC_TIME:()=>jC,LOCALAPPDATA:()=>rA,MSYSTEM:()=>xO,NETLIFY:()=>lD,NIX_SSL_CERT_FILE:()=>dA,NODE_EXTRA_CA_CERTS:()=>NA,NODE_OPTIONS:()=>xA,NO_COLOR:()=>XA,NoDefaultCurrentDirectoryInExePath:()=>YC,OneDrive:()=>sA,OneDriveCommercial:()=>nA,OneDriveConsumer:()=>eA,P4PORT:()=>ZD,PATH:()=>aC,PATHEXT:()=>gC,PIP_CERT:()=>mA,PLAYWRIGHT_BROWSERS_PATH:()=>jD,PREFIX:()=>bC,PROGRAMDATA:()=>TA,PROJECT_DOMAIN:()=>UD,PWD:()=>BC,ProgramData:()=>DA,ProgramFiles:()=>vC,RENDER:()=>ND,REPL_ID:()=>ID,REPL_SLUG:()=>iD,REQUESTS_CA_BUNDLE:()=>MA,RUNNER_ENVIRONMENT:()=>DD,RUNNER_OS:()=>OD,SAFEUSER:()=>cA,SESSIONNAME:()=>LO,SHELL:()=>FC,SPACE_CREATOR_USER_ID:()=>VD,SSH_AUTH_SOCK:()=>FO,SSH_CLIENT:()=>GO,SSH_CONNECTION:()=>HO,SSH_TTY:()=>mO,SSL_CERT_DIR:()=>PA,SSL_CERT_FILE:()=>lA,STY:()=>cO,SUDO_GID:()=>zC,SUDO_UID:()=>QC,SUDO_USER:()=>$C,SYSTEMROOT:()=>fC,SystemRoot:()=>WC,TEMP:()=>mC,TERM:()=>JA,TERMINAL:()=>qA,TERMINAL_EMULATOR:()=>tO,TERMINATOR_UUID:()=>oO,TERMUX_VERSION:()=>_O,TERM_PROGRAM:()=>QA,TERM_PROGRAM_VERSION:()=>zA,TILIX_ID:()=>EO,TMP:()=>HC,TMPDIR:()=>GC,TMUX:()=>pO,TMUX_PANE:()=>RO,TRACEPARENT:()=>qD,TRACESTATE:()=>tT,USER:()=>JC,USERNAME:()=>qC,USERPROFILE:()=>_A,USE_BUILTIN_RIPGREP:()=>JD,UV_THREADPOOL_SIZE:()=>gA,VERCEL:()=>xD,VISUAL:()=>VC,VSCODE_GIT_ASKPASS_MAIN:()=>BO,VTE_VERSION:()=>AO,WAYLAND_DISPLAY:()=>hC,WEBSITE_SITE_NAME:()=>vD,WEBSITE_SKU:()=>gD,WSL_DISTRO_NAME:()=>iO,WSL_INTEROP:()=>UO,WT_SESSION:()=>DO,XDG_CACHE_HOME:()=>IA,XDG_CONFIG_HOME:()=>RA,XDG_DATA_HOME:()=>SA,XDG_RUNTIME_DIR:()=>pA,XDG_STATE_HOME:()=>iA,XTERM_VERSION:()=>nO,ZDOTDIR:()=>VO,ZED_TERM:()=>IO,ZELLIJ:()=>SO,__CFBundleIdentifier:()=>uO,gcloud_project:()=>FD,google_application_credentials:()=>fD,google_cloud_project:()=>dD});
var MC=D.str();
var aC=D.str();
var uC=D.str();
var BC=D.str();
var bC=D.str();
var GC=D.str();
var HC=D.str();
var mC=D.str();
var FC=D.str();
var dC=D.str();
var fC=D.str();
var KC=D.str();
var WC=D.str();
var vC=D.str();
var gC=D.str();
var YC=D.str();
var yC=D.str();
var VC=D.str();
var wC=D.str();
var XC=D.str();
var hC=D.str();
var kC=D.str();
var ZC=D.str();
var jC=D.str();
var JC=D.str();
var QC=D.int({min:0,digitsOnly:!0});
var zC=D.int({min:0,digitsOnly:!0});
var $C=D.str();
var qC=D.str();
var tA=D.str();
var oA=D.str();
var _A=D.str();
var EA=D.str();
var rA=D.str();
var sA=D.str();
var eA=D.str();
var nA=D.str();
var CA=D.str();
var AA=D.str();
var OA=D.str();
var DA=D.str();
var TA=D.str();
var LA=D.str();
var cA=D.str();
var pA=D.str();
var RA=D.str();
var SA=D.str();
var IA=D.str();
var iA=D.str();
var UA=D.str();
var xA=D.str();
var NA=D.str();
var lA=D.str();
var PA=D.str();
var MA=D.str();
var aA=D.str();
var uA=D.str();
var BA=D.str();
var bA=D.str();
var GA=D.str();
var HA=D.str();
var mA=D.str();
var FA=D.str();
var dA=D.str();
var fA=D.str();
var KA=D.str();
var WA=D.str();
var vA=D.str();
var gA=D.str();
var YA=D.str();
var yA=D.str();
var VA=D.str();
var wA=D.str();
var XA=D.rawStr();
var hA=D.rawStr();
var kA=D.str();
var ZA=D.str();
var jA=D.str();
var JA=D.str();
var QA=D.str();
var zA=D.str();
var $A=D.str();
var qA=D.str();
var tO=D.str();
var oO=D.str();
var _O=D.str();
var EO=D.str();
var rO=D.str();
var sO=D.str();
var eO=D.str();
var nO=D.str();
var CO=D.str();
var AO=D.str();
var OO=D.str();
var DO=D.str();
var LO=D.str();
var cO=D.str();
var pO=D.str();
var RO=D.str();
var SO=D.str();
var IO=D.str();
var iO=D.str();
var UO=D.str();
var xO=D.str();
var NO=D.str();
var lO=D.str();
var PO=D.str();
var MO=D.str();
var aO=D.str();
var uO=D.str();
var BO=D.str();
var bO=D.rawStr();
var GO=D.str();
var HO=D.str();
var mO=D.str();
var FO=D.str();
var dO=D.str();
var fO=D.str();
var KO=D.str();
var WO=D.str();
var vO=D.str();
var gO=D.str();
var YO=D.str();
var yO=D.str();
var VO=D.str();
var wO=D.str();
var XO=D.str();
var hO=D.str();
var kO=D.str();
var ZO=D.str();
var jO=D.str();
var JO=D.str();
var QO=D.str();
var zO=D.rawStr();
var $O=D.str();
var qO=D.str();
var tD=D.str();
var oD=D.str();
var _D=D.str();
var ED=D.str();
var rD=D.str();
var sD=D.str();
var eD=D.str();
var nD=D.str();
var CD=D.str();
var AD=D.str();
var OD=D.str();
var DD=D.str();
var TD=D.str();
var LD=D.str();
var cD=D.str();
var pD=D.str();
var RD=D.str();
var SD=D.str();
var ID=D.str();
var iD=D.str();
var UD=D.str();
var xD=D.str();
var ND=D.str();
var lD=D.str();
var PD=D.str();
var MD=D.str();
var aD=D.str();
var uD=D.str();
var BD=D.str();
var bD=D.str();
var GD=D.str();
var HD=D.str();
var mD=D.str();
var FD=D.str();
var dD=D.str();
var fD=D.str();
var KD=D.str();
var WD=D.str();
var vD=D.str();
var gD=D.str();
var YD=D.str();
var yD=D.str();
var VD=D.str();
var wD=D.str();
var XD=D.str();
var hD=D.str();
var kD=D.str();
var ZD=D.str();
var jD=D.str();
var JD=D.str();
var QD=D.str();
var zD=D.str();
var $D=D.str();
var qD=D.str();
var tT=D.str();
var b={};
Qr(b,{AI_AGENT:()=>Cp,ALLOW_ANT_COMPUTER_USE_MCP:()=>Ap,ANTHROPIC_CONFIG_DIR:()=>oT,BASH_MAX_OUTPUT_LENGTH:()=>WR,CCR_SESSION_PROFILE:()=>Op,CLAUBBIT:()=>Dp,CLAUDECODE:()=>Tp,CLAUDE_AFK_COUNTDOWN_MS:()=>vR,CLAUDE_AFK_TIMEOUT_MS:()=>gR,CLAUDE_AFTER_LAST_COMPACT:()=>_T,CLAUDE_AGENTS_SELECT:()=>ET,CLAUDE_AGENT_SDK_CLIENT_APP:()=>rT,CLAUDE_AGENT_SDK_DISABLE_BUILTIN_AGENTS:()=>Lp,CLAUDE_AGENT_SDK_DISABLE_MCP_MANIFESTS:()=>cp,CLAUDE_AGENT_SDK_MCP_NO_PREFIX:()=>pp,CLAUDE_AGENT_SDK_VERSION:()=>sT,CLAUDE_ARTIFACT_HOST_GRANT:()=>eT,CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS:()=>YR,CLAUDE_AUTOCOMPACT_PCT_OVERRIDE:()=>nT,CLAUDE_AUTO_BACKGROUND_TASKS:()=>Rp,CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR:()=>Sp,CLAUDE_BG_AUTH_SNAPSHOT_PATH:()=>CT,CLAUDE_BG_AUTO_MEMORY_OFF:()=>pT,CLAUDE_BG_BACKEND:()=>AT,CLAUDE_BG_CLAIM_AUTH:()=>OT,CLAUDE_BG_DISPATCHER_RATE_LIMIT_TIER:()=>DT,CLAUDE_BG_DISPATCHER_SUBSCRIPTION_TYPE:()=>TT,CLAUDE_BG_ISOLATION:()=>LT,CLAUDE_BG_MEMORY_TOGGLED_OFF:()=>cT,CLAUDE_BG_POST_CLEAR_RESPAWN:()=>RT,CLAUDE_BG_PTY_AUTH:()=>ST,CLAUDE_BG_RENDEZVOUS_SOCK:()=>IT,CLAUDE_BG_RV_AUTH:()=>iT,CLAUDE_BG_SESSION_PERMISSION_RULES:()=>UT,CLAUDE_BG_SOCKET_TOKENS_PATH:()=>xT,CLAUDE_BG_SOURCE:()=>NT,CLAUDE_BG_STARTUP_WEDGE_MS:()=>yR,CLAUDE_BG_TCC_DISCLAIMED:()=>lT,CLAUDE_BG_WORKSPACE_TRUSTED:()=>PT,CLAUDE_BRIDGE_BASE_URL:()=>MT,CLAUDE_BRIDGE_OAUTH_TOKEN:()=>aT,CLAUDE_BRIDGE_REATTACH_GROUPING:()=>uT,CLAUDE_BRIDGE_REATTACH_NO_BACKFILL:()=>Ip,CLAUDE_BRIDGE_REATTACH_OUTBOUND_ONLY:()=>ip,CLAUDE_BRIDGE_REATTACH_OWNER_ACCT:()=>BT,CLAUDE_BRIDGE_REATTACH_OWNER_ORG:()=>bT,CLAUDE_BRIDGE_REATTACH_SEQ:()=>VR,CLAUDE_BRIDGE_REATTACH_SESSION:()=>GT,CLAUDE_BRIDGE_SESSION_INGRESS_URL:()=>HT,CLAUDE_CHROME_PAIRED_DEVICE_ID:()=>mT,CLAUDE_CHROME_PERMISSION_MODE:()=>FT,CLAUDE_CHROME_TAB_GROUP_KEY:()=>dT,CLAUDE_CLIENT_PRESENCE_FILE:()=>fT,CLAUDE_CODE_ACTION:()=>KT,CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD:()=>WT,CLAUDE_CODE_ADDITIONAL_PROTECTION:()=>Up,CLAUDE_CODE_ADOPT_UNDERIVABLE_PARKED_PERMISSION:()=>LR,CLAUDE_CODE_AGENT:()=>vT,CLAUDE_CODE_APPEND_PROMPT_HEAD:()=>gT,CLAUDE_CODE_ARTIFACT:()=>YT,CLAUDE_CODE_ARTIFACTS_API_BASE_URL:()=>VT,CLAUDE_CODE_ARTIFACTS_API_TOKEN:()=>wT,CLAUDE_CODE_ARTIFACT_ASSET_BASE_URL:()=>XT,CLAUDE_CODE_ARTIFACT_AUTO_OPEN:()=>yT,CLAUDE_CODE_ARTIFACT_LIVE_BASE_URL:()=>hT,CLAUDE_CODE_ARTIFACT_SYNC_BASE_URL:()=>kT,CLAUDE_CODE_ARTIFACT_VIEWER_BASE_URL:()=>ZT,CLAUDE_CODE_ATTRIBUTION_STATUS_TIMEOUT_MS:()=>jT,CLAUDE_CODE_AUTO_COMPACT_WINDOW:()=>QT,CLAUDE_CODE_AUTO_MODE_EXTERNAL_PERMISSIONS:()=>xp,CLAUDE_CODE_AUTO_MODE_TIER:()=>Np,CLAUDE_CODE_BASE_REF:()=>zT,CLAUDE_CODE_BASE_REFS:()=>$T,CLAUDE_CODE_BLOCKING_LIMIT_OVERRIDE:()=>qT,CLAUDE_CODE_BRIDGE_CHILD_ARTIFACT:()=>NL,CLAUDE_CODE_BRIDGE_CHILD_AUTO_DEFAULT:()=>xL,CLAUDE_CODE_BRIDGE_CHILD_MACHINE_SETTINGS:()=>lL,CLAUDE_CODE_BRIDGE_MCP_CARRIER:()=>tL,CLAUDE_CODE_BRIDGE_OWNER_ACCOUNT_UUID:()=>oL,CLAUDE_CODE_BRIDGE_OWNER_ORG_UUID:()=>_L,CLAUDE_CODE_BRIDGE_PROMPT_SHA256:()=>rL,CLAUDE_CODE_BRIDGE_SESSION_ID:()=>sL,CLAUDE_CODE_BRIDGE_SOURCE_DIR:()=>EL,CLAUDE_CODE_BRIEF:()=>lp,CLAUDE_CODE_BRIEF_UPLOAD:()=>Pp,CLAUDE_CODE_CCR_SURFACE:()=>AR,CLAUDE_CODE_CLASSIFIER_SUMMARY:()=>nL,CLAUDE_CODE_CONFIG_PROBE:()=>PL,CLAUDE_CODE_CONTAINER_ID:()=>CL,CLAUDE_CODE_COORDINATOR_SKILL_GUIDANCE:()=>Mp,CLAUDE_CODE_DAEMON_COLD_START:()=>ap,CLAUDE_CODE_DECSTBM:()=>AL,CLAUDE_CODE_DESKTOP_APP_VERSION:()=>OL,CLAUDE_CODE_DEV_RAW_CHANGELOG_URL:()=>DL,CLAUDE_CODE_DISABLE_ATTRIBUTION_BASELINE_REUSE:()=>JT,CLAUDE_CODE_DISABLE_BG_SHELL_PRESSURE_REAP:()=>up,CLAUDE_CODE_DISABLE_HOOK_FORWARDING:()=>LL,CLAUDE_CODE_DISABLE_PLUGIN_FORWARDING:()=>cL,CLAUDE_CODE_DISABLE_TURN_HANDOFF:()=>pL,CLAUDE_CODE_DISABLE_VITALS_EMITTER:()=>RL,CLAUDE_CODE_DISABLE_WORKING_SYNC:()=>SL,CLAUDE_CODE_DONT_INHERIT_ENV:()=>Bp,CLAUDE_CODE_DOWNLOAD_DEADLINE_MS_FOR_TESTING:()=>IL,CLAUDE_CODE_EMIT_SESSION_STATE_EVENTS:()=>bp,CLAUDE_CODE_EMIT_STARTUP_TIMING:()=>Hp,CLAUDE_CODE_EMIT_TOOL_USE_SUMMARIES:()=>mp,CLAUDE_CODE_ENTRYPOINT:()=>iL,CLAUDE_CODE_ENVIRONMENT_KIND:()=>UL,CLAUDE_CODE_ENVIRONMENT_RUNNER_VERSION:()=>ML,CLAUDE_CODE_EVAL_CONFINED:()=>ER,CLAUDE_CODE_EXIT_AFTER_FIRST_RENDER:()=>Fp,CLAUDE_CODE_EXIT_AFTER_STOP_DELAY:()=>wR,CLAUDE_CODE_FLAG_FETCH_WAIT_MS:()=>dp,CLAUDE_CODE_FOOTER_INDICATOR:()=>aL,CLAUDE_CODE_FORCE_BRIDGE:()=>fp,CLAUDE_CODE_FORCE_EVALUATE_MEMORY:()=>Kp,CLAUDE_CODE_FORCE_FULLSCREEN_UPSELL:()=>Wp,CLAUDE_CODE_FORCE_MEMORY_SURVEY:()=>vp,CLAUDE_CODE_FORCE_TIP_ID:()=>uL,CLAUDE_CODE_GIT_BASH_PATH:()=>BL,CLAUDE_CODE_GLOB_TIMEOUT_SECONDS:()=>XR,CLAUDE_CODE_GOAL_CHECKIN_MINUTES:()=>hR,CLAUDE_CODE_HIDE_SETTINGS_HINT:()=>bL,CLAUDE_CODE_HOLD_REPORT_PARK_AT_INIT:()=>SR,CLAUDE_CODE_HOME_SEED_HOLD_TIMEOUT_MS:()=>GL,CLAUDE_CODE_HOME_SEED_VERDICT_TIMEOUT_MS:()=>HL,CLAUDE_CODE_HOST_PLATFORM:()=>mL,CLAUDE_CODE_HOST_PROMPT_SUPERSEDES_RECORD:()=>gp,CLAUDE_CODE_HOST_SESSION_ID:()=>FL,CLAUDE_CODE_IDE_HOST_OVERRIDE:()=>dL,CLAUDE_CODE_IDLE_THRESHOLD_MINUTES:()=>kR,CLAUDE_CODE_IDLE_TOKEN_THRESHOLD:()=>ZR,CLAUDE_CODE_IS_COWORK:()=>Yp,CLAUDE_CODE_LEGACY_BUNDLE:()=>TL,CLAUDE_CODE_LOOP_KEEPALIVE:()=>yp,CLAUDE_CODE_LOOP_PERSISTENT:()=>Vp,CLAUDE_CODE_MANAGED_SETTINGS_PATH:()=>fL,CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS:()=>jR,CLAUDE_CODE_MAX_MCP_DESCRIPTION_LENGTH:()=>yS,CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH:()=>JR,CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION:()=>QR,CLAUDE_CODE_MCP_ALLOWLIST_ENV:()=>KL,CLAUDE_CODE_MCP_APPS_HOST:()=>YS,CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS:()=>fS,CLAUDE_CODE_MCP_CONNECTOR_PREWAIT_MS:()=>KS,CLAUDE_CODE_MCP_MEMORY_CGROUP:()=>BR,CLAUDE_CODE_MCP_PREWAIT_SERVERS:()=>vS,CLAUDE_CODE_MCP_PREWAIT_SERVERS_MS:()=>gS,CLAUDE_CODE_MCP_STARTUP_WAIT_MS:()=>WS,CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT:()=>dS,CLAUDE_CODE_MEMORY_SUBAGENT_APPEND:()=>rp,CLAUDE_CODE_MOCK_REMOTE_SETTINGS:()=>wp,CLAUDE_CODE_MOCK_TRIAL:()=>Xp,CLAUDE_CODE_OVERRIDE_DATE:()=>WL,CLAUDE_CODE_PARKED_PERMISSION_WAIT_MS:()=>TR,CLAUDE_CODE_PARKED_RUN_BEFORE_CLEAR:()=>RR,CLAUDE_CODE_PARKED_STOP_RETIRES:()=>pR,CLAUDE_CODE_PERFORCE_MODE:()=>gL,CLAUDE_CODE_PLAN_V2_AGENT_COUNT:()=>zR,CLAUDE_CODE_PLAN_V2_EXPLORE_AGENT_COUNT:()=>$R,CLAUDE_CODE_PLUGIN_ATTRIBUTION:()=>YL,CLAUDE_CODE_PLUGIN_CACHE_DIR:()=>yL,CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS:()=>qR,CLAUDE_CODE_PLUGIN_SEED_DIR:()=>VL,CLAUDE_CODE_POST_TURN_MEMORY:()=>hp,CLAUDE_CODE_POST_TURN_MEMORY_CONFIG:()=>wL,CLAUDE_CODE_POST_TURN_MEMORY_SYNC:()=>kp,CLAUDE_CODE_POWERUP_ONBOARDING:()=>XL,CLAUDE_CODE_PROJECT_DIR_NAME:()=>hL,CLAUDE_CODE_PWSH_PARSE_TIMEOUT_MS:()=>tS,CLAUDE_CODE_QUESTION_EXTENDED:()=>ZL,CLAUDE_CODE_QUESTION_OPTIONAL_DESCRIPTIONS:()=>jL,CLAUDE_CODE_QUESTION_PREVIEW_FORMAT:()=>kL,CLAUDE_CODE_RELAUNCH_HOME_TRUST:()=>JL,CLAUDE_CODE_RELAUNCH_TERMINAL_SIZE:()=>QL,CLAUDE_CODE_REMOTE:()=>Zp,CLAUDE_CODE_REMOTE_ENVIRONMENT_TYPE:()=>zL,CLAUDE_CODE_REMOTE_HERMETIC_MODE:()=>jp,CLAUDE_CODE_REMOTE_MEMORY_DIR:()=>$L,CLAUDE_CODE_REMOTE_RAW_EVENTS_FILE:()=>qL,CLAUDE_CODE_REMOTE_SEND_KEEPALIVES:()=>Jp,CLAUDE_CODE_REMOTE_SESSION_ID:()=>tc,CLAUDE_CODE_REMOTE_SESSION_ORIGIN:()=>oc,CLAUDE_CODE_REMOTE_SETTINGS_PATH:()=>_c,CLAUDE_CODE_REMOTE_SETTINGS_POLL_MS:()=>oS,CLAUDE_CODE_REPL:()=>Qp,CLAUDE_CODE_REPO_CHECKOUTS:()=>Ec,CLAUDE_CODE_RESTRICTED:()=>zp,CLAUDE_CODE_RESULT_NONCE:()=>eL,CLAUDE_CODE_RESUME_FROM_SESSION:()=>rc,CLAUDE_CODE_RESUME_INTERRUPTED_TURN:()=>$p,CLAUDE_CODE_RESUME_INTERRUPTED_TURN_MAX_AGE_MS:()=>tR,CLAUDE_CODE_RESUME_PROMPT:()=>sc,CLAUDE_CODE_RESUME_REASON:()=>oR,CLAUDE_CODE_RESUME_SOURCE_ALIVE:()=>qp,CLAUDE_CODE_RESUME_THRESHOLD_MINUTES:()=>_S,CLAUDE_CODE_RESUME_TOKEN_THRESHOLD:()=>ES,CLAUDE_CODE_RESUME_TOLERATES_CONTEXT_APPENDS:()=>cR,CLAUDE_CODE_SAFE_MODE:()=>_R,CLAUDE_CODE_SANDBOXED:()=>rR,CLAUDE_CODE_SCRIPT_CAPS:()=>rS,CLAUDE_CODE_SCROLL_SPEED:()=>ec,CLAUDE_CODE_SDK_READS_SESSION_STATE:()=>Gp,CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS:()=>sS,CLAUDE_CODE_SESSION_ID:()=>nc,CLAUDE_CODE_SESSION_KIND:()=>Cc,CLAUDE_CODE_SESSION_NAME:()=>Ac,CLAUDE_CODE_SESSION_ORIGIN:()=>Oc,CLAUDE_CODE_SESSION_START_ANNOUNCEMENTS_BEFORE_PROMPT:()=>sR,CLAUDE_CODE_SHELL:()=>Dc,CLAUDE_CODE_SHELL_PREFIX:()=>Tc,CLAUDE_CODE_SIMPLE:()=>eR,CLAUDE_CODE_SIMPLE_SYSTEM_PROMPT:()=>Lc,CLAUDE_CODE_SKILL_ATTRIBUTION:()=>cc,CLAUDE_CODE_SPAWN_TIMESTAMP_MS:()=>eS,CLAUDE_CODE_SSE_PORT:()=>nS,CLAUDE_CODE_STALL_TIMEOUT_MS_FOR_TESTING:()=>pc,CLAUDE_CODE_STARTUP_FAILURE_RESULTS:()=>vL,CLAUDE_CODE_STOP_HOOK_BLOCK_CAP:()=>CS,CLAUDE_CODE_SUBPROCESS_ENV_SCRUB:()=>nR,CLAUDE_CODE_SUPERVISED:()=>CR,CLAUDE_CODE_SYNC_PLUGINS_BUFFERED_DOWNLOAD:()=>OR,CLAUDE_CODE_SYNC_PLUGINS_DOWNLOAD_STALL_MS:()=>DR,CLAUDE_CODE_SYNC_PLUGINS_INSTALL_TIMEOUT_MS:()=>OS,CLAUDE_CODE_SYNC_PLUGINS_MCP_TIMEOUT_MS:()=>DS,CLAUDE_CODE_SYNC_PLUGIN_INSTALL_TIMEOUT_MS:()=>AS,CLAUDE_CODE_SYNC_REUSE_WITHIN_MS:()=>TS,CLAUDE_CODE_SYNC_SESSION_REFS:()=>IR,CLAUDE_CODE_SYNC_SKILLS_INSTALL_TIMEOUT_MS:()=>LS,CLAUDE_CODE_SYNC_SKILLS_WAIT_TIMEOUT_MS:()=>cS,CLAUDE_CODE_SYNTAX_HIGHLIGHT:()=>iR,CLAUDE_CODE_SYSTEM_PROMPT_GB_FEATURE:()=>Rc,CLAUDE_CODE_TAGS:()=>Sc,CLAUDE_CODE_TASK_LIST_ID:()=>ic,CLAUDE_CODE_TEAM_TEARDOWN_PARK_TIMEOUT_MS:()=>pS,CLAUDE_CODE_TERMINAL_MCP_TOOLS:()=>Ic,CLAUDE_CODE_TEST_ALLOW_REAL_NETWORK:()=>UR,CLAUDE_CODE_TEST_FIXTURES_ROOT:()=>Uc,CLAUDE_CODE_TEST_FORCE_DENY:()=>xR,CLAUDE_CODE_TEST_NO_GIT_BASH:()=>NR,CLAUDE_CODE_TEST_NO_PWSH:()=>lR,CLAUDE_CODE_TMPDIR:()=>xc,CLAUDE_CODE_TMUX_PREFIX:()=>Nc,CLAUDE_CODE_TMUX_PREFIX_CONFLICTS:()=>PR,CLAUDE_CODE_TMUX_SESSION:()=>lc,CLAUDE_CODE_TMUX_TRUECOLOR:()=>MR,CLAUDE_CODE_TOOL_MEMORY_CGROUP_EXCLUDE:()=>aR,CLAUDE_CODE_TOOL_MEMORY_LIMIT:()=>uR,CLAUDE_CODE_TRIGGER_ID:()=>Pc,CLAUDE_CODE_TUI_JUST_SWITCHED:()=>bR,CLAUDE_CODE_TUI_TRIAL:()=>GR,CLAUDE_CODE_ULTRAREVIEW_PREFLIGHT_FIXTURE:()=>Mc,CLAUDE_CODE_ULTRAREVIEW_QUOTA_FIXTURE:()=>ac,CLAUDE_CODE_USER_DIALOG_TIMEOUT_MS:()=>RS,CLAUDE_CODE_VOICE_FORWARD_INTERIMS_TYPED:()=>HR,CLAUDE_CODE_WORKER_CHECKIN_SCHEDULE:()=>uc,CLAUDE_CODE_WORKER_EPOCH:()=>SS,CLAUDE_CODE_WORKSPACE_HOST_PATHS:()=>Bc,CLAUDE_CONFIG_DIR:()=>bc,CLAUDE_COWORK_MEMORY_EXTRA_GUIDELINES:()=>Gc,CLAUDE_COWORK_MEMORY_GUIDELINES:()=>Hc,CLAUDE_COWORK_MEMORY_INDEX_CONTENT:()=>mc,CLAUDE_COWORK_MEMORY_PATH_OVERRIDE:()=>Fc,CLAUDE_ENV_FILE:()=>dc,CLAUDE_FORCE_DISPLAY_SURVEY:()=>mR,CLAUDE_INTERNAL_ASSISTANT_TEAM_NAME:()=>fc,CLAUDE_INTERNAL_FC_OVERRIDES:()=>Kc,CLAUDE_JOB_DIR:()=>Wc,CLAUDE_MEMORY_STORES:()=>vc,CLAUDE_PROJECT_UUID:()=>Yc,CLAUDE_PTY_HEARTBEAT_MS:()=>IS,CLAUDE_PTY_HOST_EXEC:()=>yc,CLAUDE_PTY_ORPHAN_CHECK_MS:()=>iS,CLAUDE_RELAUNCH_SESSION_ADD_DIRS:()=>Vc,CLAUDE_REMOTE_CONTROL_SESSION_NAME_PREFIX:()=>wc,CLAUDE_REMOTE_WORKFLOW_ARGS:()=>Xc,CLAUDE_REMOTE_WORKFLOW_SCRIPT:()=>hc,CLAUDE_RUNNER_ACTIVITY_FD:()=>US,CLAUDE_RUNNER_FETCH_DEPTH:()=>kc,CLAUDE_SECURESTORAGE_CONFIG_DIR:()=>Zc,CLAUDE_SERVE_DRAIN_TIMEOUT_MS:()=>xS,CLAUDE_SNIP:()=>jc,CLAUDE_SSH_LOCAL_BINARY:()=>Jc,CLAUDE_SSH_VERSION:()=>Qc,CLAUDE_STAGE_FILE_ROOT:()=>zc,CLAUDE_TMPDIR:()=>$c,LOCAL_BRIDGE:()=>FR,MCP_CONNECTION_NONBLOCKING:()=>dR,MCP_CONNECT_TIMEOUT_MS:()=>NS,MCP_DISCOVERY_CACHE:()=>lS,MCP_DISCOVERY_CACHE_MAX_STALE_S:()=>PS,MCP_DISCOVERY_CACHE_STRIKES:()=>MS,MCP_DISCOVERY_CACHE_TTL_S:()=>aS,MCP_OAUTH_CALLBACK_PORT:()=>uS,MCP_OAUTH_CLIENT_METADATA_URL:()=>qc,MCP_PROTOCOL_NEGOTIATION:()=>BS,MCP_REMOTE_SERVER_CONNECTION_BATCH_SIZE:()=>bS,MCP_SDK_GENERATION:()=>HS,MCP_SERVER_CONNECTION_BATCH_SIZE:()=>GS,MCP_TIMEOUT:()=>mS,MCP_TOOL_TIMEOUT:()=>FS,MCP_TRUNCATION_PROMPT_OVERRIDE:()=>tp,SDK_NATIVE_BIN:()=>op,SESSION_INGRESS_URL:()=>_p,SLASH_COMMAND_TOOL_CHAR_BUDGET:()=>VS,SYSTEM_REMINDER_MEMORY_CONTEXT:()=>Ep,TEST_ENABLE_SESSION_PERSISTENCE:()=>fR,ULTRAPLAN_PROMPT_FILE:()=>sp,VCR_RECORD:()=>KR,VITALS_EMITTER_BIN:()=>ep,VOICE_STREAM_BASE_URL:()=>np});
var oT=D.str();
var _T=D.str();
var ET=D.str();
var rT=D.str();
var sT=D.str();
var eT=D.rawStr();
var nT=D.str();
var CT=D.str();
var AT=D.str();
var OT=D.str();
var DT=D.str();
var TT=D.str();
var LT=D.str();
var cT=D.str();
var pT=D.str();
var RT=D.bool();
var ST=D.str();
var IT=D.str();
var iT=D.str();
var UT=D.str();
var xT=D.str();
var NT=D.str();
var lT=D.str();
var PT=D.bool();
var MT=D.str();
var aT=D.str();
var uT=D.str();
var BT=D.str();
var bT=D.str();
var GT=D.str();
var HT=D.str();
var mT=D.str();
var FT=D.str();
var dT=D.str();
var fT=D.str();
var KT=D.str();
var WT=D.str();
var vT=D.str();
var gT=D.str();
var YT=D.str();
var yT=D.str();
var VT=D.str();
var wT=D.str();
var XT=D.str();
var hT=D.str();
var kT=D.str();
var ZT=D.str();
var jT=D.int({min:0});
var JT=D.bool();
var QT=D.str();
var zT=D.str();
var $T=D.str();
var qT=D.str();
var tL=D.enum(["1","spent"]);
var oL=D.str();
var _L=D.str();
var EL=D.str();
var rL=D.str();
var sL=D.str();
var eL=D.str();
var nL=D.str();
var CL=D.str();
var AL=D.str();
var OL=D.str();
var DL=D.str();
var TL=D.bool();
var LL=D.bool();
var cL=D.bool();
var pL=D.bool();
var RL=D.bool();
var SL=D.bool();
var IL=D.str();
var iL=D.str();
var UL=D.str();
var xL=D.bool();
var NL=D.bool();
var lL=D.bool();
var PL=D.bool();
var ML=D.str();
var aL=D.str();
var uL=D.str();
var BL=D.str();
var bL=D.str();
var GL=D.int({min:0});
var HL=D.int({min:0});
var mL=D.str();
var FL=D.str();
var dL=D.str();
var fL=D.str();
var KL=D.str();
var WL=D.str();
var vL=D.bool();
var gL=D.str();
var YL=D.str();
var yL=D.str();
var VL=D.str();
var wL=D.str();
var XL=D.str();
var hL=D.str();
var kL=D.str();
var ZL=D.bool();
var jL=D.bool();
var JL=D.str();
var QL=D.str();
var zL=D.str();
var $L=D.str();
var qL=D.str();
var tc=D.str();
var oc=D.str();
var _c=D.str();
var Ec=D.str();
var rc=D.str();
var sc=D.str();
var ec=D.str();
var nc=D.str();
var Cc=D.str();
var Ac=D.str();
var Oc=D.enum(["claude_ai_chat"]);
var Dc=D.str();
var Tc=D.str();
var Lc=D.str();
var cc=D.str();
var pc=D.str();
var Rc=D.str();
var Sc=D.str();
var Ic=D.str();
var ic=D.str();
var Uc=D.str();
var xc=D.str();
var Nc=D.str();
var lc=D.str();
var Pc=D.str();
var Mc=D.str();
var ac=D.str();
var uc=D.str();
var Bc=D.str();
var bc=D.str();
var Gc=D.str();
var Hc=D.str();
var mc=D.str();
var Fc=D.str();
var dc=D.str();
var fc=D.str();
var Kc=D.str();
var Wc=D.str();
var vc=D.str();
var Yc=D.str();
var yc=D.str();
var Vc=D.str();
var wc=D.str();
var Xc=D.str();
var hc=D.str();
var kc=D.str();
var Zc=D.str();
var jc=D.str();
var Jc=D.str();
var Qc=D.str();
var zc=D.str();
var $c=D.str();
var qc=D.str();
var tp=D.str();
var op=D.str();
var _p=D.str();
var Ep=D.bool();
var rp=D.bool();
var sp=D.str();
var ep=D.str();
var np=D.str();
var Cp=D.bool();
var Ap=D.bool();
var Op=D.bool();
var Dp=D.bool();
var Tp=D.bool();
var Lp=D.bool();
var cp=D.bool();
var pp=D.bool();
var Rp=D.bool();
var Sp=D.bool();
var Ip=D.bool();
var ip=D.bool();
var Up=D.bool();
var xp=D.bool();
var Np=D.rawStr();
var lp=D.bool();
var Pp=D.bool();
var Mp=D.bool();
var ap=D.bool();
var up=D.bool();
var Bp=D.bool();
var bp=D.bool();
var Gp=D.bool();
var Hp=D.bool();
var mp=D.bool();
var Fp=D.bool();
var dp=D.int({min:0});
var fp=D.bool();
var Kp=D.bool();
var Wp=D.bool();
var vp=D.bool();
var gp=D.bool();
var Yp=D.bool();
var yp=D.triBool();
var Vp=D.bool();
var wp=D.str();
var Xp=D.bool();
var hp=D.bool();
var kp=D.bool();
var Zp=D.bool();
var jp=D.bool();
var Jp=D.bool();
var Qp=D.triBool();
var zp=D.bool();
var $p=D.bool();
var qp=D.str();
var tR=D.str();
var oR=D.str();
var _R=D.bool();
var ER=D.bool();
var rR=D.bool();
var sR=D.bool();
var eR=D.bool();
var nR=D.triBool();
var CR=D.bool();
var AR=D.str();
var OR=D.bool();
var DR=D.int({min:1});
var TR=D.int({min:0});
var LR=D.bool();
var cR=D.bool();
var pR=D.bool();
var RR=D.bool();
var SR=D.bool();
var IR=D.bool();
var iR=D.str();
var UR=D.bool();
var xR=D.rawStr();
var NR=D.str();
var lR=D.str();
var PR=D.bool();
var MR=D.rawStr();
var aR=D.str();
var uR=D.str();
var BR=D.str();
var bR=D.str();
var GR=D.str();
var HR=D.bool();
var mR=D.bool();
var FR=D.bool();
var dR=D.triBool();
var fR=D.bool();
var KR=D.bool();
var WR=D.int();
var vR=D.int();
var gR=D.int();
var YR=D.int({min:1,max:2147483647,digitsOnly:!0});
var yR=D.int();
var VR=D.int();
var wR=D.int();
var XR=D.int({min:1});
var hR=D.int({min:0,max:10080,digitsOnly:!0});
var kR=D.int();
var ZR=D.int();
var jR=D.int({min:1,digitsOnly:!0});
var JR=D.int({min:1,digitsOnly:!0});
var QR=D.int({min:1,digitsOnly:!0});
var zR=D.int();
var $R=D.int();
var qR=D.int();
var tS=D.int();
var oS=D.int();
var _S=D.int();
var ES=D.int();
var rS=D.int();
var sS=D.int({min:1});
var eS=D.int();
var nS=D.int();
var CS=D.int();
var AS=D.int({min:1});
var OS=D.int({min:1});
var DS=D.int({min:0});
var TS=D.int({min:0,max:86400000});
var LS=D.int();
var cS=D.int();
var pS=D.int({min:1000,max:60000});
var RS=D.int();
var SS=D.int();
var IS=D.int({min:1});
var iS=D.int({min:1});
var US=D.int({min:3});
var xS=D.int({min:1});
var NS=D.int();
var lS=D.triBool();
var PS=D.int({min:1});
var MS=D.int({min:1});
var aS=D.int({min:1});
var uS=D.int({min:1});
var BS=D.str();
var bS=D.int({min:1});
var GS=D.int({min:1});
var HS=D.str();
var mS=D.int();
var FS=D.int({min:1});
var dS=D.int();
var fS=D.int();
var KS=D.int({min:1});
var WS=D.int({min:0});
var vS=D.str();
var gS=D.int({min:0,digitsOnly:!0});
var YS=D.bool();
var yS=D.int({min:1,digitsOnly:!0});
var VS=D.int({min:1});
var H={};
Qr(H,{ANTHROPIC_CUSTOM_MODEL_OPTION:()=>OI,ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION:()=>TI,ANTHROPIC_CUSTOM_MODEL_OPTION_NAME:()=>DI,ANTHROPIC_DEFAULT_FABLE_MODEL:()=>kS,ANTHROPIC_DEFAULT_FABLE_MODEL_DESCRIPTION:()=>jS,ANTHROPIC_DEFAULT_FABLE_MODEL_NAME:()=>ZS,ANTHROPIC_DEFAULT_HAIKU_MODEL:()=>oI,ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION:()=>EI,ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME:()=>_I,ANTHROPIC_DEFAULT_MODEL:()=>XS,ANTHROPIC_DEFAULT_OPUS_MODEL:()=>JS,ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION:()=>zS,ANTHROPIC_DEFAULT_OPUS_MODEL_NAME:()=>QS,ANTHROPIC_DEFAULT_SONNET_MODEL:()=>$S,ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION:()=>tI,ANTHROPIC_DEFAULT_SONNET_MODEL_NAME:()=>qS,ANTHROPIC_MODEL:()=>wS,ANTHROPIC_SMALL_FAST_MODEL:()=>hS,CLAUDE_CODE_3P_PROBE_WROTE_HAIKU_DEFAULT:()=>eI,CLAUDE_CODE_3P_PROBE_WROTE_OPUS_DEFAULT:()=>sI,CLAUDE_CODE_3P_PROBE_WROTE_SONNET_DEFAULT:()=>rI,CLAUDE_CODE_3P_SEEDED_OPUS_DEFAULT:()=>CI,CLAUDE_CODE_3P_SEEDED_SONNET_DEFAULT:()=>nI,CLAUDE_CODE_ALWAYS_ENABLE_EFFORT:()=>lI,CLAUDE_CODE_AUTO_MODE_MODEL:()=>pI,CLAUDE_CODE_BG_CLASSIFIER_MODEL:()=>RI,CLAUDE_CODE_CLIENT_DATA_URL:()=>mI,CLAUDE_CODE_DISABLE_1M_CONTEXT:()=>BI,CLAUDE_CODE_DISABLE_EXPLORE_INHERIT_CAP:()=>UI,CLAUDE_CODE_DISABLE_FAST_MODE:()=>MI,CLAUDE_CODE_DISABLE_LEGACY_MODEL_REMAP:()=>xI,CLAUDE_CODE_DISABLE_MODEL_ACCESS_FALLBACK:()=>iI,CLAUDE_CODE_DISABLE_UNKNOWN_MODEL_WINDOW_ENFORCEMENT:()=>bI,CLAUDE_CODE_EFFORT_LEVEL:()=>NI,CLAUDE_CODE_MAX_EFFORT_REMINDER:()=>PI,CLAUDE_CODE_MODEL_CATALOG:()=>GI,CLAUDE_CODE_MODEL_CATALOG_URL:()=>HI,CLAUDE_CODE_NO_MODEL_FALLBACK:()=>II,CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS:()=>aI,CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK:()=>uI,CLAUDE_CODE_SKIP_MODEL_ACCESS_MEMORY:()=>AI,CLAUDE_CODE_SUBAGENT_MODEL:()=>LI,CLAUDE_CODE_SUBAGENT_MODEL_FORCE:()=>cI,FALLBACK_FOR_ALL_PRIMARY_MODELS:()=>SI});
var wS=D.str();
var XS=D.str();
var hS=D.str();
var kS=D.str();
var ZS=D.str();
var jS=D.str();
var JS=D.str();
var QS=D.str();
var zS=D.str();
var $S=D.str();
var qS=D.str();
var tI=D.str();
var oI=D.str();
var _I=D.str();
var EI=D.str();
var rI=D.str();
var sI=D.str();
var eI=D.str();
var nI=D.str();
var CI=D.str();
var AI=D.bool();
var OI=D.str();
var DI=D.str();
var TI=D.str();
var LI=D.str();
var cI=D.bool();
var pI=D.str();
var RI=D.str();
var SI=D.str();
var II=D.bool();
var iI=D.bool();
var UI=D.bool();
var xI=D.bool();
var NI=D.str();
var lI=D.bool();
var PI=D.triBool();
var MI=D.bool();
var aI=D.bool();
var uI=D.bool();
var BI=D.bool();
var bI=D.bool();
var GI=D.str();
var HI=D.str();
var mI=D.str();
var m={};
Qr(m,{ALL_PROXY:()=>gI,ANTHROPIC_BETAS:()=>kI,ANTHROPIC_CUSTOM_HEADERS:()=>ZI,API_FORCE_IDLE_TIMEOUT:()=>Ci,API_TIMEOUT_MS:()=>ei,CLAUDE_BYTE_STREAM_IDLE_TIMEOUT_MS:()=>Ri,CLAUDE_CODE_ATTRIBUTION_HEADER:()=>QI,CLAUDE_CODE_CERT_STORE:()=>hI,CLAUDE_CODE_CLIENT_CERT:()=>yI,CLAUDE_CODE_CLIENT_KEY:()=>VI,CLAUDE_CODE_CLIENT_KEY_PASSPHRASE:()=>wI,CLAUDE_CODE_DISABLE_MTLS_RELOAD_ON_STALE_CONNECTION:()=>XI,CLAUDE_CODE_EAGER_FLUSH:()=>Ui,CLAUDE_CODE_EXTRA_BODY:()=>jI,CLAUDE_CODE_EXTRA_METADATA:()=>JI,CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS:()=>ti,CLAUDE_CODE_FORCE_SYNC_OUTPUT:()=>xi,CLAUDE_CODE_GZIP_CCR_REQUEST_BODIES:()=>Li,CLAUDE_CODE_GZIP_REQUEST_BODIES:()=>Ti,CLAUDE_CODE_GZIP_REQUEST_BODY_LEVEL:()=>ci,CLAUDE_CODE_MAX_CONTEXT_TOKENS:()=>qI,CLAUDE_CODE_MAX_OUTPUT_TOKENS:()=>$I,CLAUDE_CODE_MAX_RETRIES:()=>zI,CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY:()=>oi,CLAUDE_CODE_MAX_TURNS:()=>_i,CLAUDE_CODE_NONSTREAMING_TIMEOUT_RETRIES:()=>ni,CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS:()=>Pi,CLAUDE_CODE_RETRY_WATCHDOG:()=>ii,CLAUDE_CODE_SLOW_OPERATION_THRESHOLD_MS:()=>li,CLAUDE_ENABLE_BYTE_WATCHDOG:()=>Ai,CLAUDE_ENABLE_BYTE_WATCHDOG_BEDROCK:()=>Oi,CLAUDE_ENABLE_STREAM_WATCHDOG:()=>Di,CLAUDE_MOCK_HEADERLESS_429:()=>Ni,CLAUDE_SLOW_FIRST_BYTE_MS:()=>Ii,CLAUDE_STREAM_FIRST_BYTE_TIMEOUT_MS:()=>Si,CLAUDE_STREAM_IDLE_TIMEOUT_MS:()=>pi,HTTPS_PROXY:()=>dI,HTTP_PROXY:()=>FI,MAX_MCP_OUTPUT_TOKENS:()=>si,MAX_STRUCTURED_OUTPUT_RETRIES:()=>ri,MAX_THINKING_TOKENS:()=>Ei,NO_PROXY:()=>fI,all_proxy:()=>YI,http_proxy:()=>KI,https_proxy:()=>WI,no_proxy:()=>vI});
var FI=D.str();
var dI=D.str();
var fI=D.str();
var KI=D.str();
var WI=D.str();
var vI=D.str();
var gI=D.str();
var YI=D.str();
var yI=D.str();
var VI=D.str();
var wI=D.str();
var XI=D.bool();
var hI=D.str();
var kI=D.str();
var ZI=D.str();
var jI=D.str();
var JI=D.str();
var QI=D.str();
var zI=D.int();
var $I=D.int();
var qI=D.int();
var ti=D.int();
var oi=D.int({min:1});
var _i=D.str();
var Ei=D.int();
var ri=D.int();
var si=D.int();
var ei=D.int();
var ni=D.int({min:0,digitsOnly:!0});
var Ci=D.int();
var Ai=D.triBool();
var Oi=D.bool();
var Di=D.triBool();
var Ti=D.triBool();
var Li=D.triBool();
var ci=D.int({min:0,max:9,digitsOnly:!0});
var pi=D.int({min:1});
var Ri=D.int({min:1});
var Si=D.int({min:1});
var Ii=D.int({min:1});
var ii=D.bool();
var Ui=D.bool();
var xi=D.bool();
var Ni=D.bool();
var li=D.int();
var Pi=D.int({min:0});
var F={};
Qr(F,{AGENT_PROXY_URL:()=>WU,ANTHROPIC_AWS_BASE_URL:()=>vi,ANTHROPIC_AWS_WORKSPACE_ID:()=>gi,ANTHROPIC_BASE_URL:()=>Hi,ANTHROPIC_BEDROCK_BASE_URL:()=>di,ANTHROPIC_BEDROCK_MANTLE_BASE_URL:()=>Wi,ANTHROPIC_BEDROCK_REGION_PREFIX:()=>fi,ANTHROPIC_BEDROCK_SERVICE_TIER:()=>Ki,ANTHROPIC_FOUNDRY_BASE_URL:()=>Zi,ANTHROPIC_FOUNDRY_RESOURCE:()=>ji,ANTHROPIC_GOOGLE_CLOUD_BASE_URL:()=>wi,ANTHROPIC_GOOGLE_CLOUD_LOCATION:()=>yi,ANTHROPIC_GOOGLE_CLOUD_PROJECT:()=>Yi,ANTHROPIC_GOOGLE_CLOUD_WORKSPACE_ID:()=>Vi,ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION:()=>CU,ANTHROPIC_UNIX_SOCKET:()=>AU,ANTHROPIC_VERTEX_BASE_URL:()=>Xi,ANTHROPIC_VERTEX_PROJECT_ID:()=>hi,AWS_ACCESS_KEY_ID:()=>tU,AWS_CONFIG_FILE:()=>$i,AWS_DEFAULT_REGION:()=>Qi,AWS_ENDPOINT_URL:()=>EU,AWS_ENDPOINT_URL_BEDROCK:()=>rU,AWS_ENDPOINT_URL_BEDROCK_RUNTIME:()=>sU,AWS_ENDPOINT_URL_STS:()=>eU,AWS_PROFILE:()=>zi,AWS_REGION:()=>Ji,AWS_SECRET_ACCESS_KEY:()=>oU,AWS_SESSION_TOKEN:()=>_U,AWS_SHARED_CREDENTIALS_FILE:()=>qi,AWS_USE_FIPS_ENDPOINT:()=>nU,CCR_AGENT_PROXY_CA_CERT_B64:()=>mU,CCR_AGENT_PROXY_ENABLED:()=>lU,CCR_AGENT_PROXY_FRAME_HOSTS:()=>FU,CCR_AGENT_PROXY_INCLUDE_HOSTS:()=>BU,CCR_AGENT_PROXY_NO_PROXY_LOCAL_ONLY:()=>HU,CCR_AGENT_PROXY_RECEIVE_GATE_DISABLED:()=>bU,CCR_AGENT_PROXY_RELAY_MODE:()=>uU,CCR_AGENT_PROXY_UPLOAD_GATE_DISABLED:()=>GU,CCR_ENABLE_BUNDLE:()=>dU,CCR_FORCE_BUNDLE:()=>fU,CCR_ON_BRANCH_DEFAULT_GUARD:()=>KU,CLAUDE_CODE_AGENT_PROXY_GH_SHIM:()=>MU,CLAUDE_CODE_AGENT_PROXY_GIT_CONFIG:()=>PU,CLAUDE_CODE_AGENT_PROXY_GIT_HOSTS:()=>aU,CLAUDE_CODE_API_BASE_URL:()=>Fi,CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY:()=>iU,CLAUDE_CODE_GATEWAY_MODEL_DISCOVERY_TIMEOUT_MS:()=>UU,CLAUDE_CODE_GB_BASE_URL:()=>xU,CLAUDE_CODE_GB_REFRESH_INTERVAL_MS:()=>NU,CLAUDE_CODE_HOST_GATEWAY_LINEAGE:()=>DU,CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST:()=>OU,CLAUDE_CODE_PROXY_RESOLVES_HOSTS:()=>LU,CLAUDE_CODE_SIMULATE_PROXY_USAGE:()=>TU,CLAUDE_CODE_SKIP_HFI_VERSION_CHECK:()=>vU,CLAUDE_CODE_USE_ANTHROPIC_AWS:()=>Bi,CLAUDE_CODE_USE_ANTHROPIC_GOOGLE_CLOUD:()=>bi,CLAUDE_CODE_USE_BEDROCK:()=>Mi,CLAUDE_CODE_USE_FOUNDRY:()=>ui,CLAUDE_CODE_USE_GATEWAY:()=>cU,CLAUDE_CODE_USE_MANTLE:()=>Gi,CLAUDE_CODE_USE_VERTEX:()=>ai,CLAUDE_GATEWAY_ALLOW_LOOPBACK:()=>pU,CLAUDE_GATEWAY_DRAIN_TIMEOUT_MS:()=>IU,CLAUDE_GATEWAY_LOG_LEVEL:()=>SU,CLAUDE_GATEWAY_PROXY_IS_EGRESS_BOUNDARY:()=>RU,CLOUD_ML_REGION:()=>ki,_CLAUDE_CODE_ASSUME_FIRST_PARTY_BASE_URL:()=>mi});
var Mi=D.bool();
var ai=D.bool();
var ui=D.bool();
var Bi=D.bool();
var bi=D.bool();
var Gi=D.bool();
var Hi=D.str();
var mi=D.bool();
var Fi=D.str();
var di=D.str();
var fi=D.enum(Z);
var Ki=D.str();
var Wi=D.str();
var vi=D.str();
var gi=D.str();
var Yi=D.str();
var yi=D.str();
var Vi=D.str();
var wi=D.str();
var Xi=D.str();
var hi=D.str();
var ki=D.str();
var Zi=D.str();
var ji=D.str();
var Ji=D.str();
var Qi=D.str();
var zi=D.str();
var $i=D.str();
var qi=D.str();
var tU=D.str();
var oU=D.str();
var _U=D.str();
var EU=D.str();
var rU=D.str();
var sU=D.str();
var eU=D.str();
var nU=D.str();
var CU=D.str();
var AU=D.str();
var OU=D.bool();
var DU=D.bool();
var TU=D.bool();
var LU=D.bool();
var cU=D.bool();
var pU=D.bool();
var RU=D.bool();
var SU=D.str();
var IU=D.int({min:1,max:2147000000,digitsOnly:!0});
var iU=D.bool();
var UU=D.int({min:1,max:2147483647,digitsOnly:!0});
var xU=D.str();
var NU=D.int();
var lU=D.bool();
var PU=D.bool();
var MU=D.bool();
var aU=D.str();
var uU=D.str();
var BU=D.str();
var bU=D.bool();
var GU=D.bool();
var HU=D.bool();
var mU=D.str();
var FU=D.str();
var dU=D.bool();
var fU=D.bool();
var KU=D.enum(["enforce","observe","off"]);
var WU=D.str();
var vU=D.bool();
var YU={...P,...F,...H,...u,...m,...B,...M,...b};
function gJe(t,o){let _=Object.create(o);for(let[E,r]of Object.entries(t)){let e=_,s;Object.defineProperty(_,E,{get:()=>{let n=process.env[E];if(n!==e)s=r.parse(n),e=n;return s},enumerable:!0,configurable:!0})}return Object.defineProperties(_,{set:{value:(E,r)=>{process.env[E]=gKo(r)}},unset:{value:(E)=>{delete process.env[E]}}}),_}
var a=gJe(YU,c);
return {a};
}
function make_chunk_2143w8bm({}){
class i{resetters=[];built=[];lazy(e){let t,r=()=>{t=void 0};return this.resetters.push(r),()=>{if(t===void 0)t=e(),this.built.push(r);return t}}builtCount(){return this.built.length}releaseBuiltSince(e){for(let t of this.built.splice(e))t()}reset(){for(let e of this.resetters)e();this.built.length=0}}
var nQn=new i;
function f(e){return nQn.lazy(e)}
return {f};
}
function make_chunk_pmrrc8z5({}){
function lQn(e){let t=Object.values(e).filter((n)=>typeof n==="number");return Object.entries(e).filter(([n,i])=>t.indexOf(+n)===-1).map(([n,i])=>i)}
function VKr(e,t="|"){return e.map((r)=>YKr(r)).join(t)}
function Swn(e,t){if(typeof t==="bigint")return t.toString();return t}
function bwn(e){return{get value(){{let r=e();return Object.defineProperty(this,"value",{value:r}),r}throw Error("cached value already set")}}}
function RVo(e){return e===null||e===void 0}
function WWt(e){let t=e.startsWith("^")?1:0,r=e.endsWith("$")?e.length-1:e.length;return e.slice(t,r)}
function q1(e,t,r){Object.defineProperty(e,t,{value:r,writable:!0,enumerable:!0,configurable:!0})}
function X7e(...e){let t={};for(let r of e){let n=Object.getOwnPropertyDescriptors(r);Object.assign(t,n)}return Object.defineProperties({},t)}
function PVo(e){return JSON.stringify(e)}
var qKr="captureStackTrace"in Error?Error.captureStackTrace:(...e)=>{};
function zWt(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)}
var HVo=bwn(()=>{if(j9.jitless)return!1;if(typeof navigator<"u"&&navigator?.userAgent?.includes("Cloudflare"))return!1;try{return new Function(""),!0}catch(e){return!1}});
function Cyt(e){if(zWt(e)===!1)return!1;let t=e.constructor;if(t===void 0)return!0;if(typeof t!=="function")return!0;let r=t.prototype;if(zWt(r)===!1)return!1;if(Object.prototype.hasOwnProperty.call(r,"isPrototypeOf")===!1)return!1;return!0}
function KKr(e){if(Cyt(e))return{...e};if(Array.isArray(e))return[...e];if(e instanceof Map)return new Map(e);if(e instanceof Set)return new Set(e);return e}
var OVo=new Set(["string","number","symbol"]);
function J7e(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}
function MPe(e,t,r){let n=new e._zod.constr(t??e._zod.def);if(!t||r?.parent)n._zod.parent=e;return n}
function Aa(e){let t=e;if(!t)return{};if(typeof t==="string")return{error:()=>t};if(t?.message!==void 0){if(t?.error!==void 0)throw Error("Cannot specify both `message` and `error` params");t.error=t.message}if(delete t.message,typeof t.error==="string")return{...t,error:()=>t.error};return t}
function YKr(e){if(typeof e==="bigint")return e.toString()+"n";if(typeof e==="string")return`"${e}"`;return`${e}`}
function DVo(e){return Object.keys(e).filter((t)=>e[t]._zod.optin!==void 0&&e[t]._zod.optout==="optional")}
function FXo(e,t){let r=e._zod.def,n=r.checks;if(n&&n.length>0)throw Error(".pick() cannot be used on object schemas containing refinements");let o=X7e(e._zod.def,{get shape(){let c={};for(let s of Reflect.ownKeys(t)){if(!Object.prototype.hasOwnProperty.call(r.shape,s))throw Error(`Unrecognized key: "${String(s)}"`);if(!t[s])continue;q1(c,s,r.shape[s])}return q1(this,"shape",c),c},checks:[]});return MPe(e,o)}
function $Xo(e,t){let r=e._zod.def,n=r.checks;if(n&&n.length>0)throw Error(".omit() cannot be used on object schemas containing refinements");let o=X7e(e._zod.def,{get shape(){let c={...e._zod.def.shape};for(let s of Reflect.ownKeys(t)){if(!Object.prototype.hasOwnProperty.call(r.shape,s))throw Error(`Unrecognized key: "${String(s)}"`);if(!t[s])continue;delete c[s]}return q1(this,"shape",c),c},checks:[]});return MPe(e,o)}
function UXo(e,t){if(!Cyt(t))throw Error("Invalid input to extend: expected a plain object");let r=e._zod.def.checks;if(r&&r.length>0){let o=e._zod.def.shape;for(let c of Reflect.ownKeys(t))if(Object.getOwnPropertyDescriptor(o,c)!==void 0)throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.")}let i=X7e(e._zod.def,{get shape(){let o={...e._zod.def.shape,...t};return q1(this,"shape",o),o}});return MPe(e,i)}
function BXo(e,t){if(!Cyt(t))throw Error("Invalid input to safeExtend: expected a plain object");let r=X7e(e._zod.def,{get shape(){let n={...e._zod.def.shape,...t};return q1(this,"shape",n),n}});return MPe(e,r)}
function jXo(e,t){if(!t?._zod?.def)throw Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");if(e._zod.def.checks?.length)throw Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");let r=X7e(e._zod.def,{get shape(){let n={...e._zod.def.shape,...t._zod.def.shape};return q1(this,"shape",n),n},get catchall(){return t._zod.def.catchall},checks:t._zod.def.checks??[]});return MPe(e,r)}
function LVo(e,t,r,n="partial"){let o=t._zod.def.checks;if(o&&o.length>0)throw Error(`.${n}() cannot be used on object schemas containing refinements`);let s=X7e(t._zod.def,{get shape(){let p=t._zod.def.shape,g={...p};if(r)for(let f of Reflect.ownKeys(r)){if(!Object.prototype.hasOwnProperty.call(p,f))throw Error(`Unrecognized key: "${String(f)}"`);if(!r[f])continue;g[f]=e?new e({type:"optional",innerType:p[f]}):p[f]}else for(let f of Reflect.ownKeys(p))g[f]=e?new e({type:"optional",innerType:p[f]}):p[f];return q1(this,"shape",g),g},checks:[]});return MPe(t,s)}
function WXo(e,t,r){let n=X7e(t._zod.def,{get shape(){let i=t._zod.def.shape,o={...i};if(r)for(let c of Reflect.ownKeys(r)){if(!Object.prototype.hasOwnProperty.call(o,c))throw Error(`Unrecognized key: "${String(c)}"`);if(!r[c])continue;o[c]=new e({type:"nonoptional",innerType:i[c]})}else for(let c of Reflect.ownKeys(i))o[c]=new e({type:"nonoptional",innerType:i[c]});return q1(this,"shape",o),o}});return MPe(t,n)}
function Ayt(e,t=0){if(e.aborted===!0)return!0;for(let r=t;r<e.issues.length;r++)if(e.issues[r]?.continue!==!0)return!0;return!1}
function NVo(e,t=0){if(e.aborted===!0)return!0;for(let r=t;r<e.issues.length;r++)if(e.issues[r]?.continue===!1)return!0;return!1}
function LPe(e,t){return t.map((r)=>{var n;return(n=r).path??(n.path=[]),r.path.unshift(e),r})}
function x(e){return typeof e==="string"?e:e?.message}
function XKr(e,t,r){var n;for(let i=t;i<e.length;i++)(n=e[i]).schema??(n.schema=r)}
function NPe(e,t,r){var n;let i=e.inst?._zod?.traits;if(i?.has("$ZodType"))if(i.has("$ZodCheck"))(n=e).schema??(n.schema=e.inst);else e.schema=e.inst;let o=e.schema!==e.inst?e.schema?._zod.def?.error:void 0,c=e.message?e.message:x(e.inst?._zod.def?.error?.(e))??x(o?.(e))??x(t?.error?.(e))??x(r.customError?.(e))??x(r.localeError?.(e))??"Invalid input",{inst:s,schema:p,continue:g,input:f,...a}=e;if(a.path??(a.path=[]),a.message=c,t?.reportInput)a.input=f;return a}
var S=/[\uD800-\uDBFF]/;
function cQn(e){let t=e.length;if(!S.test(e))return t;let r=t;for(let n=0;n<t-1;n++)if((e.charCodeAt(n)&64512)===55296&&(e.charCodeAt(n+1)&64512)===56320)r--,n++;return r}
function dQn(e){if(Array.isArray(e))return"array";if(typeof e==="string")return"string";return"unknown"}
function FVo(e){let t=typeof e;switch(t){case"number":return Number.isNaN(e)?"nan":"number";case"object":{if(e===null)return"null";if(Array.isArray(e))return"array";let r=e;if(r&&Object.getPrototypeOf(r)!==Object.prototype&&"constructor"in r&&r.constructor)return r.constructor.name}}return t}
function Tyt(...e){let[t,r,n]=e;if(typeof t==="string")return{message:t,code:"custom",input:r,inst:n};return{...t}}
function P(e,t){for(let r in t){let n=Object.getOwnPropertyDescriptor(t,r);if(n.get)Object.defineProperty(e,r,{...n,enumerable:!1});else A(e,r,n.value)}}
function kyt(e,t,r,n=!0){return Object.defineProperty(e,t,{configurable:!0,writable:!0,enumerable:n,value:r}),r}
function JKr(e,t,r){return kyt(e,t,r,!1)}
function A(e,t,r){Object.defineProperty(e,t,{configurable:!0,get(){return this==null?r:kyt(this,t,r.bind(this))},set(n){kyt(this,t,n)}})}
function k(e,t){let r=Object.getPrototypeOf(e);return t in r?void 0:r}
var m;
var h=!1;
var v={configurable:!0,get(){h=!0;return}};
function cS(e,t,r){let n=Object.getPrototypeOf(e._zod);if(t in n&&m!==e._zod){m=void 0;return}m=e._zod,Object.defineProperty(n,t,{configurable:!0,get(){Object.defineProperty(this,t,v);let i=h;h=!1;try{let o=r(this);if(h)delete this[t];else Object.defineProperty(this,t,{configurable:!0,writable:!0,value:o});return h=h||i,o}catch(o){throw delete this[t],h=h||i,o}},set(i){Object.defineProperty(this,t,{configurable:!0,writable:!0,value:i})}})}
function GXo(e,t,r,n){let i=k(e,t);if(!i)return;Object.defineProperty(i,t,{configurable:!0,get(){let o={configurable:!0,writable:!0,enumerable:n,value:void 0};return Object.defineProperty(this,t,o),o.value=r(this),Object.defineProperty(this,t,o),o.value},set(o){Object.defineProperty(this,t,{configurable:!0,writable:!0,enumerable:n,value:o})}})}
var T="~constantCatch";
function $Vo(e){let t=()=>e;return t[T]=!0,t}
var O={value:void 0,enumerable:!1};
var E="captureStackTrace"in Error?Error:null;
function N(e){let t=E;if(t){let r=t.stackTraceLimit;if(typeof r==="number"){try{t.stackTraceLimit=0}catch{return E=null,new e}try{return new e}finally{t.stackTraceLimit=r}}}return new e}
function Zn(e,t,r,n){let i={};function o(u){this.def=u,this.constr=a,this.traits=new Set}o.prototype=i;let c=r,s=c&&new WeakSet;function p(u,d){if(!u._zod){O.value=new o(d);try{Object.defineProperty(u,"_zod",O)}finally{O.value=void 0}}if(u._zod.traits.has(e))return;if(u._zod.traits.add(e),t(u,d),s){let l=Object.getPrototypeOf(u),_=u._zod.constr.prototype,b=l;while(b&&b!==_)b=Object.getPrototypeOf(b);let w=b??l;if(!s.has(w))s.add(w),P(w,c)}let y=a.prototype;for(let l in y){if(!Object.prototype.hasOwnProperty.call(y,l))continue;if(!(l in u))u[l]=y[l].bind(u)}}let g=n?.Parent??Object;class f extends g{}Object.defineProperty(f,"name",{value:e});function a(u){let d=n?.Parent?N(f):this;p(d,u);let y=d._zod.deferred;if(y){for(let _ of y)_();d._zod.deferred=void 0}let l=globalThis.__zod_globalConfig?.postProcessor;if(l)l(d);return d}return Object.defineProperty(a,"init",{value:p}),Object.defineProperty(a,Symbol.hasInstance,{value:(u)=>{if(n?.Parent&&u instanceof n.Parent)return!0;return u?._zod?.traits?.has(e)}}),Object.defineProperty(a,"name",{value:e}),a}
class s2e extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}}
class wwn extends Error{constructor(e){super(`Encountered unidirectional transform during encode: ${e}`);this.name="ZodEncodeError"}}
var j9=globalThis.__zod_globalConfig;
function T3(e){if(e)Object.assign(j9,e);return j9}
return {$Vo,$Xo,Aa,Ayt,BXo,Cyt,DVo,FVo,FXo,GXo,HVo,J7e,JKr,KKr,LPe,LVo,MPe,NPe,NVo,OVo,PVo,RVo,Swn,T3,Tyt,UXo,VKr,WWt,WXo,X7e,XKr,YKr,Zn,bwn,cQn,cS,dQn,j9,jXo,kyt,lQn,q1,qKr,s2e,wwn,zWt};
}
function make_chunk_1f551ggg({$Vo,$Xo,Aa,Ayt,BXo,Cyt,DVo,FVo,FXo,GXo,HVo,J7e,JKr,KKr,LPe,LVo,MPe,NPe,NVo,OVo,PVo,RVo,Swn,T3,Tyt,UXo,VKr,WWt,WXo,X7e,XKr,YKr,Zn,bwn,cQn,cS,dQn,j9,jXo,kyt,lQn,q1,qKr,s2e,wwn,zWt}){
var Z=Zn("$ZodCheck",(e,t)=>{var r;e._zod??(e._zod={}),e._zod.def=t,(r=e._zod).onattach??(r.onattach=[])});
var be=(e)=>{let t=e.value;return!RVo(t)&&t.length!==void 0};
var gr=Zn("$ZodCheckMaxLength",(e,t)=>{var r;Z.init(e,t),(r=e._zod.def).when??(r.when=be),e._zod.onattach.push((n)=>{let s=n._zod.bag.maximum??Number.POSITIVE_INFINITY;if(t.maximum<s)n._zod.bag.maximum=t.maximum}),e._zod.check=(n)=>{let s=n.value,i=s.length;if((typeof s==="string"&&i>t.maximum?cQn(s):i)<=t.maximum)return;let a=dQn(s);n.issues.push({origin:a,code:"too_big",maximum:t.maximum,inclusive:!0,input:s,inst:e,continue:!t.abort})}});
var xr=Zn("$ZodCheckMinLength",(e,t)=>{var r;Z.init(e,t),(r=e._zod.def).when??(r.when=be),e._zod.onattach.push((n)=>{let s=n._zod.bag.minimum??Number.NEGATIVE_INFINITY;if(t.minimum>s)n._zod.bag.minimum=t.minimum}),e._zod.check=(n)=>{let s=n.value,i=s.length;if((typeof s==="string"&&i>=t.minimum&&i<t.minimum*2?cQn(s):i)>=t.minimum)return;let a=dQn(s);n.issues.push({origin:a,code:"too_small",minimum:t.minimum,inclusive:!0,input:s,inst:e,continue:!t.abort})}});
var vr=Zn("$ZodCheckLengthEquals",(e,t)=>{var r;Z.init(e,t),(r=e._zod.def).when??(r.when=be),e._zod.onattach.push((n)=>{let s=n._zod.bag;s.minimum=t.length,s.maximum=t.length,s.length=t.length}),e._zod.check=(n)=>{let s=n.value,i=s.length,c=typeof s==="string"&&i>=t.length&&i<=t.length*2?cQn(s):i;if(c===t.length)return;let a=dQn(s),l=c>t.length;n.issues.push({origin:a,...l?{code:"too_big",maximum:t.length}:{code:"too_small",minimum:t.length},inclusive:!0,exact:!0,input:n.value,inst:e,continue:!t.abort})}});
var wr=Zn("$ZodCheckOverwrite",(e,t)=>{Z.init(e,t),e._zod.check=(r)=>{r.value=t.tx(r.value)}});
var r2e=globalThis.__zod_globalRegistry;
class we{constructor(e=[],t={}){this.content=[],this.indent=0,this.args=e,this.closed=t}indented(e){this.indent+=1,e(this),this.indent-=1}write(e){if(typeof e==="function"){e(this,{execution:"sync"}),e(this,{execution:"async"});return}let r=e.split(`
`).filter((i)=>i),n=Math.min(...r.map((i)=>i.length-i.trimStart().length)),s=r.map((i)=>i.slice(n)).map((i)=>" ".repeat(this.indent*2)+i);for(let i of s)this.content.push(i)}compile(){let e=Function,t=this?.content??[""];return new e(...Object.keys(this.closed),`return function (${this.args.join(", ")}) {
${t.join(`
`)}
};`)(...Object.values(this.closed))}}
function Bs(){let e=this._zod;return e.message??(e.message=JSON.stringify(e.def,Swn,2)),e.message}
function Vs(e){this._zod.message=e}
var Ks={get:Bs,set:Vs,enumerable:!0,configurable:!0};
var Pe={value:void 0,enumerable:!1};
var Se={value:void 0,enumerable:!1};
var Or=new WeakSet([Object.prototype,Error.prototype]);
var Tr=(e,t)=>{e.name="$ZodError",Pe.value=e._zod,Object.defineProperty(e,"_zod",Pe),Se.value=t,Object.defineProperty(e,"issues",Se),Pe.value=void 0,Se.value=void 0,Object.defineProperty(e,"message",Ks);let r=Object.getPrototypeOf(e);if(!Or.has(r))Or.add(r),Object.defineProperty(r,"toString",{configurable:!0,enumerable:!1,get(){let n=()=>this.message;return Object.defineProperty(this,"toString",{value:n,configurable:!0,writable:!0}),n},set(n){Object.defineProperty(this,"toString",{value:n,configurable:!0,writable:!0})}})};
var re=Zn("$ZodError",Tr);
var Ie=Zn("$ZodError",Tr,void 0,{Parent:Error});
function Ws(e,t,r){if(!Object.prototype.hasOwnProperty.call(e,t))if(t==="__proto__")Object.defineProperty(e,t,{value:r(),writable:!0,enumerable:!0,configurable:!0});else e[t]=r();return e[t]}
function Ar(e,t=(r)=>r.message){let r={},n=[];for(let s of e.issues)if(s.path.length>0)Ws(r,s.path[0],()=>[]).push(t(s));else n.push(t(s));return{formErrors:n,fieldErrors:r}}
function Er(e,t=(r)=>r.message){let r={_errors:[]},n=(s,i=[])=>{for(let c of s.issues)if(c.code==="invalid_union"&&c.errors.length)c.errors.map((a)=>n({issues:a},[...i,...c.path]));else if(c.code==="invalid_key")n({issues:c.issues},[...i,...c.path]);else if(c.code==="invalid_element")n({issues:c.issues},[...i,...c.path]);else{let a=[...i,...c.path];if(a.length===0)r._errors.push(t(c));else{let l=r,p=0;while(p<a.length){let f=a[p],d=p===a.length-1;if(f==="_errors"){if(d)l._errors.push(t(c));p++;continue}if(!Object.prototype.hasOwnProperty.call(l,f))Object.defineProperty(l,f,{value:{_errors:[]},enumerable:!0,writable:!0,configurable:!0});let h=l[f];if(d)h._errors.push(t(c));l=h,p++}}}};return n(e),r}
function oe(e,t){return{callee:t?.callee??e,Err:t?.Err}}
var ne=(e)=>{let t=(r,n,s,i)=>{let c=s?{...s,async:!1}:{async:!1},a=r._zod.run({value:n,issues:[]},c);if(a instanceof Promise)throw new s2e;if(a.issues.length){let l=new(i?.Err??e)(a.issues.map((p)=>NPe(p,c,T3())));throw qKr(l,i?.callee??t),l}return a.value};return t};
var se=(e)=>{let t=async(r,n,s,i)=>{let c=s?{...s,async:!0}:{async:!0},a=r._zod.run({value:n,issues:[]},c);if(a instanceof Promise)a=await a;if(a.issues.length){let l=new(i?.Err??e)(a.issues.map((p)=>NPe(p,c,T3())));throw qKr(l,i?.callee??t),l}return a.value};return t};
var F=(e)=>(t,r,n)=>{let s=n?{...n,async:!1}:{async:!1},i=t._zod.run({value:r,issues:[]},s);if(i instanceof Promise)throw new s2e;return i.issues.length?{success:!1,error:new(e??re)(i.issues.map((c)=>NPe(c,s,T3())))}:{success:!0,data:i.value}};
var gwn=F(Ie);
var M=(e)=>async(t,r,n)=>{let s=n?{...n,async:!0}:{async:!0},i=t._zod.run({value:r,issues:[]},s);if(i instanceof Promise)i=await i;return i.issues.length?{success:!1,error:new e(i.issues.map((c)=>NPe(c,s,T3())))}:{success:!0,data:i.value}};
var Nr=M(Ie);
var Cr=(e)=>{let t=ne(e),r=(n,s,i,c)=>{let a=i?{...i,direction:"backward"}:{direction:"backward"};return t(n,s,a,oe(r,c))};return r};
var Rr=(e)=>{let t=ne(e),r=(n,s,i,c)=>t(n,s,i,oe(r,c));return r};
var Dr=(e)=>{let t=se(e),r=async(n,s,i,c)=>{let a=i?{...i,direction:"backward"}:{direction:"backward"};return await t(n,s,a,oe(r,c))};return r};
var jr=(e)=>{let t=se(e),r=async(n,s,i,c)=>await t(n,s,i,oe(r,c));return r};
var Lr=(e)=>(t,r,n)=>{let s=n?{...n,direction:"backward"}:{direction:"backward"};return F(e)(t,r,s)};
var Fr=(e)=>(t,r,n)=>F(e)(t,r,n);
var Ur=(e)=>async(t,r,n)=>{let s=n?{...n,direction:"backward"}:{direction:"backward"};return M(e)(t,r,s)};
var Mr=(e)=>async(t,r,n)=>M(e)(t,r,n);
var Jr={major:4,minor:5,patch:4};
var Ib=Zn("$ZodType",(e,t)=>{var r;e??(e={}),e._zod.def=t,e._zod.bag=e._zod.bag||{},e._zod.version=Jr;let n=e._zod.def.checks,s=e._zod.traits.has("$ZodCheck")?[e,...n??[]]:n?.length?[...n]:[];for(let i of s)for(let c of i._zod.onattach)c(e);if(s.length===0)(r=e._zod).deferred??(r.deferred=[]),e._zod.deferred?.push(()=>{e._zod.run=e._zod.parse});else{let i=(a,l,p)=>{if(a.memo)return a;let f=Ayt(a),d;for(let h of l){if(h._zod.def.when){if(NVo(a))continue;if(!h._zod.def.when(a))continue}else if(f)continue;let m=a.issues.length,_=h._zod.check(a);if(_ instanceof Promise&&p?.async===!1)throw new s2e;if(d||_ instanceof Promise)d=(d??Promise.resolve()).then(async()=>{if(await _,a.issues.length===m)return;if(XKr(a.issues,m,e),!f)f=Ayt(a,m)});else{if(a.issues.length===m)continue;if(XKr(a.issues,m,e),!f)f=Ayt(a,m)}}if(d)return d.then(()=>a);return a},c=(a,l,p)=>{if(Ayt(a))return a.aborted=!0,a;let f=i(l,s,p);if(f instanceof Promise){if(p.async===!1)throw new s2e;return f.then((d)=>e._zod.parse(d,p))}return e._zod.parse(f,p)};e._zod.run=(a,l)=>{if(l.skipChecks)return e._zod.parse(a,l);if(l.direction==="backward"){let f=e._zod.parse({value:a.value,issues:[]},{...l,skipChecks:!0});if(f instanceof Promise)return f.then((d)=>c(d,a,l));return c(f,a,l)}let p=e._zod.parse(a,l);if(p instanceof Promise){if(l.async===!1)throw new s2e;return p.then((f)=>i(f,s,l))}return i(p,s,l)}}},{get "~standard"(){return JKr(this,"~standard",Ae(this))},set "~standard"(e){kyt(this,"~standard",e)}});
var Br=(e)=>e.success?{value:e.data}:{issues:e.error?.issues};
function Ae(e){return{validate:(t)=>{try{return Br(gwn(e,t))}catch(r){return Nr(e,t).then(Br)}},vendor:"zod",version:1}}
var Ro=Zn("$ZodUnknown",(e,t)=>{Ib.init(e,t),e._zod.parse=(r)=>r});
var Do=Zn("$ZodNever",(e,t)=>{Ib.init(e,t),e._zod.parse=(r,n)=>(r.issues.push({expected:"never",code:"invalid_type",input:r.value,inst:e}),r)});
function Vr(e,t,r){if(e.issues.length)t.issues.push(...LPe(r,e.issues));t.value[r]=e.value}
var jo=Zn("$ZodArray",(e,t)=>{Ib.init(e,t);let r=j9.memoizer;r?.attach(e),e._zod.parse=(n,s)=>{let i=n.value;if(!Array.isArray(i))return n.issues.push({expected:"array",code:"invalid_type",input:i,inst:e}),n;n.value=r?r.alloc(e,n,Array(i.length),s):Array(i.length);let c=[];for(let a=0;a<i.length;a++){let l=i[a],p=t.element._zod.run({value:l,issues:[]},s);if(p instanceof Promise)c.push(p.then((f)=>Vr(f,n,a)));else Vr(p,n,a)}if(c.length)return Promise.all(c).then(()=>n);return n}});
function ae(e,t,r,n,s,i){let c=r in n,a=i==="optional";if(!c&&a&&s==="optional")return;if(e.issues.length){if(s!==void 0&&a&&!c)return;t.issues.push(...LPe(r,e.issues))}if(!c&&s===void 0){if(!e.issues.length)t.issues.push({code:"invalid_type",expected:"nonoptional",input:void 0,path:[r]});return}if(e.value===void 0){if(c)t.value[r]=void 0}else t.value[r]=e.value}
var ni=[];
function Lo(e){let t=Object.keys(e.shape),r=Object.getOwnPropertySymbols(e.shape),n=r.length?r:ni,s=n.length?[...t,...n]:t;for(let c of s)if(!e.shape?.[c]?._zod?.traits?.has("$ZodType"))throw Error(`Invalid element at key "${String(c)}": expected a Zod schema`);let i=DVo(e.shape);return{...e,allKeys:s,symbolKeys:n,keySet:new Set(t),numKeys:t.length,optionalKeys:new Set(i)}}
function Fo(e,t,r,n,s,i){let c=[],a=s.keySet,l=s.catchall._zod,p=l.def.type,{optin:f,optout:d}=l;for(let h in t){if(a.has(h))continue;if(h==="__proto__"){if(p==="never")c.push(h);continue}if(p==="never"){c.push(h);continue}let m=l.run({value:t[h],issues:[]},n);if(m instanceof Promise)e.push(m.then((_)=>ae(_,r,h,t,f,d)));else ae(m,r,h,t,f,d)}if(c.length)r.issues.push({code:"unrecognized_keys",keys:c,input:t,inst:i,continue:!0});if(!e.length)return r;return Promise.all(e).then(()=>r)}
var Oe=new WeakMap;
var si=Zn("$ZodObject",(e,t)=>{if(Ib.init(e,t),!Object.getOwnPropertyDescriptor(t,"shape")?.get){let l=t.shape;Oe.set(t,l),Object.defineProperty(t,"shape",{get:()=>{let p={...l};return Object.defineProperty(t,"shape",{value:p}),Oe.set(t,p),p}})}let n=bwn(()=>Lo(t));cS(e,"propValues",(l)=>{let p=l.def.shape,f={};for(let d in p){let h=p[d]._zod;if(h.values){if(!Object.prototype.hasOwnProperty.call(f,d))q1(f,d,new Set);for(let m of h.values)f[d].add(m);if(h.optin!==void 0)f[d].add(void 0)}}return f});let s=zWt,i=t.catchall,c,a=j9.memoizer;a?.attach(e),e._zod.parse=(l,p)=>{c??(c=n.value);let f=l.value;if(!s(f))return l.issues.push({expected:"object",code:"invalid_type",input:f,inst:e}),l;l.value=a?a.alloc(e,l,{},p):{};let d=[],h=c.shape;for(let m of c.allKeys){if(m==="__proto__")continue;let _=h[m],v=_._zod.optin,g=_._zod.optout,O=_._zod.run({value:f[m],issues:[]},p);if(O instanceof Promise)d.push(O.then((N)=>ae(N,l,m,f,v,g)));else ae(O,l,m,f,v,g)}if(!i)return d.length?Promise.all(d).then(()=>l):l;return Fo(d,f,l,p,n.value,e)}});
var Uo=Zn("$ZodObjectJIT",(e,t)=>{si.init(e,t);let r=e._zod.parse,n=bwn(()=>Lo(t)),s=j9.memoizer,i=(m)=>{let _=n.value,v=_.symbolKeys,g=new we(["payload","ctx"],{shape:m,inst:e,memo:s,syms:v}),O=(P)=>`shape[${P}]._zod.run({ value: input[${P}], issues: [] }, ctx)`,N=(P,y)=>`
          for (let i = 0; i < ${P}.issues.length; i++) {
            const iss = ${P}.issues[i];
            iss.path = iss.path ? [${y}, ...iss.path] : [${y}];
            payload.issues.push(iss);
          }`;g.write("const input = payload.value;");let Rt=Object.create(null),js=0;for(let P of _.allKeys)Rt[P]=`key_${js++}`;g.write(s?"const newResult = memo.alloc(inst, payload, {}, ctx);":"const newResult = {};");for(let P of _.allKeys){if(P==="__proto__")continue;let y=Rt[P],I=typeof P==="symbol"?`syms[${v.indexOf(P)}]`:PVo(P),ve=`${I} in input`,Dt=m[P],jt=Dt?._zod?.optin,Lt=jt!==void 0,Ls=Dt?._zod?.optout==="optional";if(g.write(`const ${y} = ${O(I)};`),Lt&&Ls){let Fs=jt==="optional"?`${y}_present`:`${y}.value !== undefined || ${y}_present`;g.write(`
        const ${y}_present = ${ve};
        if (!${y}.issues.length || ${y}_present) {
          if (${y}.issues.length) {${N(y,I)}
          }

          if (${Fs}) {
            newResult[${I}] = ${y}.value;
          }
        }

      `)}else if(!Lt)g.write(`
        const ${y}_present = ${ve};
        if (${y}.issues.length) {${N(y,I)}
        }
        if (!${y}_present && !${y}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${I}]
          });
        }

        if (${y}_present) {
          newResult[${I}] = ${y}.value;
        }

      `);else g.write(`
        if (${y}.issues.length) {${N(y,I)}
        }
        
        if (${y}.value === undefined) {
          if (${ve}) {
            newResult[${I}] = undefined;
          }
        } else {
          newResult[${I}] = ${y}.value;
        }

      `)}return g.write("payload.value = newResult;"),g.write("return payload;"),g.compile()},c,a=zWt,l=!j9.jitless,f=l&&HVo.value,d=t.catchall,h;e._zod.parse=(m,_)=>{h??(h=n.value);let v=m.value;if(!a(v))return m.issues.push({expected:"object",code:"invalid_type",input:v,inst:e}),m;if(l&&f&&_?.async===!1&&_.jitless!==!0){if(!c)c=i(t.shape);if(m=c(m,_),!d)return m;return Fo([],v,m,_,h,e)}return r(m,_)}});
function Kr(e,t,r,n){for(let i of e)if(i.issues.length===0)return t.value=i.value,t;let s=e.filter((i)=>!Ayt(i));if(s.length===1)return t.value=s[0].value,s[0];return t.issues.push({code:"invalid_union",input:t.value,inst:r,errors:e.map((i)=>i.issues.map((c)=>NPe(c,n,T3())))}),t}
var Ne=Zn("$ZodUnion",(e,t)=>{Ib.init(e,t),cS(e,"optin",(n)=>n.def.options.some((s)=>s._zod.optin==="defaulted")?"defaulted":n.def.options.some((s)=>s._zod.optin!==void 0)?"optional":void 0),cS(e,"optout",(n)=>n.def.options.some((s)=>s._zod.optout==="optional")?"optional":void 0),cS(e,"values",(n)=>{if(n.def.options.every((s)=>s._zod.values))return new Set(n.def.options.flatMap((s)=>Array.from(s._zod.values)));return}),cS(e,"pattern",(n)=>{if(n.def.options.every((s)=>s._zod.pattern)){let s=n.def.options.map((i)=>i._zod.pattern);return new RegExp(`^(${s.map((i)=>WWt(i.source)).join("|")})$`)}return});let r=t.options.length===1?t.options[0]._zod.run:null;e._zod.parse=(n,s)=>{if(r)return r(n,s);let i=!1,c=[];for(let a of t.options){let l=a._zod.run({value:n.value,issues:[]},s);if(l instanceof Promise)c.push(l),i=!0;else{if(l.issues.length===0)return l;c.push(l)}}if(!i)return Kr(c,n,e,s);return Promise.all(c).then((a)=>Kr(a,n,e,s))}});
var Jo=Zn("$ZodIntersection",(e,t)=>{Ib.init(e,t),e._zod.parse=(r,n)=>{let s=r.value,i=t.left._zod.run({value:s,issues:[]},n),c=t.right._zod.run({value:s,issues:[]},n);if(i instanceof Promise||c instanceof Promise)return Promise.all([i,c]).then(([l,p])=>Wr(r,l,p));return Wr(r,i,c)}});
function Te(e,t){if(e===t)return{valid:!0,data:e};if(e instanceof Date&&t instanceof Date&&+e===+t)return{valid:!0,data:e};if(Cyt(e)&&Cyt(t)){let r=Object.keys(t),n=Object.keys(e).filter((i)=>r.indexOf(i)!==-1),s={...e,...t};if(Object.prototype.hasOwnProperty.call(s,"__proto__"))delete s.__proto__;for(let i of n){if(i==="__proto__")continue;let c=Te(e[i],t[i]);if(!c.valid)return{valid:!1,mergeErrorPath:[i,...c.mergeErrorPath]};s[i]=c.data}return{valid:!0,data:s}}if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return{valid:!1,mergeErrorPath:[]};let r=[];for(let n=0;n<e.length;n++){let s=e[n],i=t[n],c=Te(s,i);if(!c.valid)return{valid:!1,mergeErrorPath:[n,...c.mergeErrorPath]};r.push(c.data)}return{valid:!0,data:r}}return{valid:!1,mergeErrorPath:[]}}
function Wr(e,t,r){let n=new Map,s,i=new Map,c=(p,f)=>{let d;if(p.code==="unrecognized_keys"&&!p.path?.length)s??(s=p),d=p.keys;else if(p.code==="invalid_key"&&p.origin==="record"&&p.path?.length===1){let h=String(p.path[0]);if(!i.has(h))i.set(h,p);d=[h]}else return!1;for(let h of d){if(!n.has(h))n.set(h,{});n.get(h)[f]=!0}return!0};for(let p of t.issues)if(!c(p,"l"))e.issues.push(p);for(let p of r.issues)if(!c(p,"r"))e.issues.push(p);let a=[...n].filter(([,p])=>p.l&&p.r).map(([p])=>p);if(a.length){let p=s?a.filter((f)=>s.keys.includes(f)):[];if(p.length)e.issues.push({...s,keys:p});for(let f of a)if(!p.includes(f)&&i.has(f))e.issues.push(i.get(f))}let l=Te(t.value,r.value);if(!l.valid){if(Ayt(e))return e;throw Error(`Unmergable intersection. Error path: ${JSON.stringify(l.mergeErrorPath)}`)}return e.value=l.data,e}
var Wo=Zn("$ZodEnum",(e,t)=>{Ib.init(e,t);let r=lQn(t.entries),n=new Set(r);e._zod.values=n;let s=r.filter((i)=>OVo.has(typeof i));e._zod.pattern=new RegExp(s.length?`^(${s.map((i)=>J7e(i.toString())).join("|")})$`:"^[^\\s\\S]$"),e._zod.parse=(i,c)=>{let a=i.value;if(n.has(a))return i;return i.issues.push({code:"invalid_value",values:r,input:a,inst:e}),i}});
var Go=Zn("$ZodLiteral",(e,t)=>{Ib.init(e,t);let r=new Set(t.values);e._zod.values=r,e._zod.pattern=new RegExp(t.values.length?`^(${t.values.map((n)=>typeof n==="string"?J7e(n):n?J7e(n.toString()):String(n)).join("|")})$`:"^[^\\s\\S]$"),e._zod.parse=(n,s)=>{let i=n.value;if(r.has(i))return n;return n.issues.push({code:"invalid_value",values:t.values,input:i,inst:e}),n}});
var Yo=Zn("$ZodTransform",(e,t)=>{Ib.init(e,t),e._zod.optin="optional",j9.memoizer?.guard(e),e._zod.parse=(r,n)=>{if(n.direction==="backward")throw new wwn(e.constructor.name);let s=t.transform(r.value,r);if(n.async)return(s instanceof Promise?s:Promise.resolve(s)).then((c)=>(r.value=c,r));if(s instanceof Promise)throw new s2e;return r.value=s,r}});
function Xr(e,t){return e.value=t.issues.length?void 0:t.value,e}
var Ce=Zn("$ZodOptional",(e,t)=>{Ib.init(e,t),cS(e,"optin",(r)=>r.def.innerType._zod.optin==="defaulted"?"defaulted":"optional"),e._zod.optout="optional",cS(e,"values",(r)=>{let n=r.def.innerType._zod.values;return n?new Set([...n,void 0]):void 0}),cS(e,"pattern",(r)=>{let n=r.def.innerType._zod.pattern;return n?new RegExp(`^(${WWt(n.source)})?$`):void 0}),e._zod.parse=(r,n)=>{if(r.value===void 0){if(t.innerType._zod.optin!=="defaulted")return r;let s=t.innerType._zod.run({value:r.value,issues:[]},n);if(s instanceof Promise)return s.then((i)=>Xr(r,i));return Xr(r,s)}return t.innerType._zod.run(r,n)}});
var qo=Zn("$ZodExactOptional",(e,t)=>{Ce.init(e,t),cS(e,"values",(r)=>r.def.innerType._zod.values),cS(e,"pattern",(r)=>r.def.innerType._zod.pattern),e._zod.parse=(r,n)=>t.innerType._zod.run(r,n)});
var Xo=Zn("$ZodNullable",(e,t)=>{Ib.init(e,t),cS(e,"optin",(r)=>r.def.innerType._zod.optin),cS(e,"optout",(r)=>r.def.innerType._zod.optout),cS(e,"pattern",(r)=>{let n=r.def.innerType._zod.pattern;return n?new RegExp(`^(${WWt(n.source)}|null)$`):void 0}),cS(e,"values",(r)=>r.def.innerType._zod.values?new Set([...r.def.innerType._zod.values,null]):void 0),e._zod.parse=(r,n)=>{if(r.value===null)return r;return t.innerType._zod.run(r,n)}});
var Ho=Zn("$ZodDefault",(e,t)=>{Ib.init(e,t),e._zod.optin="defaulted",cS(e,"values",(r)=>r.def.innerType._zod.values),e._zod.parse=(r,n)=>{if(n.direction==="backward")return t.innerType._zod.run(r,n);if(r.value===void 0)return r.value=t.defaultValue,r;let s=t.innerType._zod.run(r,n);if(s instanceof Promise)return s.then((i)=>Hr(i,t));return Hr(s,t)}});
function Hr(e,t){if(e.value===void 0)e.value=t.defaultValue;return e}
var Qo=Zn("$ZodPrefault",(e,t)=>{Ib.init(e,t),e._zod.optin="defaulted",cS(e,"values",(r)=>r.def.innerType._zod.values),e._zod.parse=(r,n)=>{if(n.direction==="backward")return t.innerType._zod.run(r,n);if(r.value===void 0)r.value=t.defaultValue;return t.innerType._zod.run(r,n)}});
var en=Zn("$ZodNonOptional",(e,t)=>{Ib.init(e,t),cS(e,"values",(r)=>{let n=r.def.innerType._zod.values;return n?new Set([...n].filter((s)=>s!==void 0)):void 0}),e._zod.parse=(r,n)=>{let s=t.innerType._zod.run(r,n);if(s instanceof Promise)return s.then((i)=>Qr(i,e));return Qr(s,e)}});
function Qr(e,t){if(!e.issues.length&&e.value===void 0)e.issues.push({code:"invalid_type",expected:"nonoptional",input:e.value,inst:t});return e}
function eo(e,t,r,n){if(!t.issues.length){if(e.value=t.value,t.memo)e.memo=!0;return e}return e.value=r.catchValue({...t,value:e.value,error:{issues:t.issues.map((s)=>NPe(s,n,T3()))},input:e.value}),e}
var tn=Zn("$ZodCatch",(e,t)=>{Ib.init(e,t),cS(e,"optin",(r)=>r.def.innerType._zod.optin==="defaulted"?"defaulted":"optional"),cS(e,"optout",(r)=>r.def.innerType._zod.optout),cS(e,"values",(r)=>r.def.innerType._zod.values),e._zod.parse=(r,n)=>{if(n.direction==="backward")return t.innerType._zod.run(r,n);let s=t.innerType._zod.run({value:r.value,issues:[]},n);if(s instanceof Promise)return s.then((i)=>eo(r,i,t,n));return eo(r,s,t,n)}});
var Re=Zn("$ZodPipe",(e,t)=>{Ib.init(e,t),cS(e,"values",(r)=>r.def.in._zod.values),cS(e,"optin",(r)=>r.def.in._zod.optin),cS(e,"optout",(r)=>r.def.out._zod.optout),cS(e,"propValues",(r)=>r.def.in._zod.propValues),e._zod.parse=(r,n)=>{if(n.direction==="backward"){let i=t.out._zod.run(r,n);if(i instanceof Promise)return i.then((c)=>ce(c,t.in,n));return ce(i,t.in,n)}let s=t.in._zod.run(r,n);if(s instanceof Promise)return s.then((i)=>ce(i,t.out,n));return ce(s,t.out,n)}});
function ce(e,t,r){if(e.issues.some((n)=>n.code!=="unrecognized_keys"))return e.aborted=!0,e;return t._zod.run({value:e.value,issues:e.issues},r)}
var on=Zn("$ZodReadonly",(e,t)=>{Ib.init(e,t),cS(e,"propValues",(r)=>r.def.innerType._zod.propValues),cS(e,"values",(r)=>r.def.innerType._zod.values),cS(e,"optin",(r)=>r.def.innerType?._zod?.optin),cS(e,"optout",(r)=>r.def.innerType?._zod?.optout),e._zod.parse=(r,n)=>{if(n.direction==="backward")return t.innerType._zod.run(r,n);let s=t.innerType._zod.run(r,n);if(s instanceof Promise)return s.then(to);return to(s)}});
function to(e){if(!e.memo)e.value=Object.freeze(e.value);return e}
var nn=Zn("$ZodCustom",(e,t)=>{Z.init(e,t),Ib.init(e,t),e._zod.parse=(r,n)=>r,e._zod.check=(r)=>{let n=r.value,s=t.fn(n);if(s instanceof Promise)return s.then((i)=>ro(i,r,n,e));ro(s,r,n,e);return}});
function ro(e,t,r,n){if(!e){let s={code:"custom",input:r,inst:n,path:[...n._zod.def.path??[]],continue:!n._zod.def.abort};if(n._zod.def.params)s.params=n._zod.def.params;t.issues.push(Tyt(s))}}
function Cn(e){return new e({type:"unknown"})}
function Rn(e,t){return new e({type:"never",...Aa(t)})}
function UWt(e,t){return new gr({check:"max_length",...Aa(t),maximum:e})}
function R(e,t){return new xr({check:"min_length",...Aa(t),minimum:e})}
function me(e,t){return new vr({check:"length_equals",...Aa(t),length:e})}
function E(e){return new wr({check:"overwrite",tx:e})}
function Dn(e,t,r){return new e({type:"array",element:t,...Aa(r)})}
function Ln(e,t,r){return new e({type:"custom",check:"custom",fn:t,...Aa(r)})}
function Fn(e,t){let r=ii((n)=>(n.addIssue=(s)=>{if(typeof s==="string")n.issues.push(Tyt(s,n.value,r._zod.def));else{let i=s;if(i.fatal)i.continue=!1;if(i.code??(i.code="custom"),!("input"in i))i.input=n.value;i.inst??(i.inst=r),i.continue??(i.continue=!r._zod.def.abort),n.issues.push(Tyt(i))}},e(n.value,n)),t);return r}
function ii(e,t){let r=new Z({check:"custom",...Aa(t)});return r._zod.check=e,r}
class Jn extends Error{constructor(){super("Cannot parse a reference cycle that closes through a transform");this.name="ZodCyclicError"}}
var tt="~memo";
var Un=[];
function et(e){return e.map((t)=>t.path?{...t,path:t.path.slice()}:{...t})}
var Mn=new WeakMap;
function Bn(e,t){let r=Mn.get(e);if(r!==void 0)return r;if(t.has(e))return!0;t.add(e);let n=!1,s=(a)=>{if(!n&&a?._zod&&Bn(a,t))n=!0},i=e._zod.def,c=i.type;switch(c){case"object":{for(let a of Reflect.ownKeys(i.shape))s(i.shape[a]);s(i.catchall);break}case"array":s(i.element);break;case"tuple":for(let a of i.items)s(a);s(i.rest);break;case"record":case"map":s(i.keyType),s(i.valueType);break;case"set":s(i.valueType);break;case"union":for(let a of i.options)s(a);break;case"intersection":s(i.left),s(i.right);break;case"optional":case"nullable":case"default":case"prefault":case"catch":case"readonly":case"nonoptional":case"promise":case"success":s(i.innerType);break;case"pipe":s(i.in),s(i.out);break;case"function":s(i.input),s(i.output);break;case"lazy":s(e._zod.innerType);break;case"template_literal":case"string":case"number":case"int":case"boolean":case"bigint":case"symbol":case"undefined":case"null":case"void":case"never":case"any":case"unknown":case"date":case"nan":case"enum":case"literal":case"file":case"transform":case"custom":break;default:for(let a in i){let l=Object.getOwnPropertyDescriptor(i,a);if(!l||l.get)continue;let p=l.value;if(!p||typeof p!=="object")continue;if(p._zod)s(p);else if(Array.isArray(p))for(let f of p)s(f)}}return t.delete(e),Mn.set(e,n),n}
function ci(e,t){let r=e.buckets.get(t);if(!r)r=new Map,e.buckets.set(t,r);return r}
var he;
var _e=[];
var ui={alloc(e,t,r){let n=he;if(!n)return r;he=void 0;let s={value:r,issues:null};return n.set(t.value,s),_e.push(s),r},guard(e){var t;(t=e._zod).deferred??(t.deferred=[]),e._zod.deferred.push(()=>{let r=e._zod.parse,n=(s,i)=>{if(i.direction!=="backward"&&ai(i,s.value))throw new Jn;return r(s,i)};if(e._zod.parse=n,e._zod.run===r)e._zod.run=n})},attach(e){var t;let r,n,s;(t=e._zod).deferred??(t.deferred=[]),e._zod.deferred.push(()=>{let i=e._zod.parse,c=(a,l)=>{if(r===void 0){if(r=Bn(e,new Set),!r){if(e._zod.parse=i,e._zod.run===c)e._zod.run=i;return i(a,l)}}let p=a.value;if(p===null||typeof p!=="object")return i(a,l);let f=l[tt];if(!f)f={buckets:new Map,backEdges:void 0},l[tt]=f;let d;if(n===l)d=s;else d=ci(f,e),n=l,s=d;let h=d.get(p);if(h){if(a.value=h.value,h.issues){if(h.issues.length)a.issues.push(...et(h.issues))}else a.memo=!0,f.backEdges??(f.backEdges=new Set),f.backEdges.add(h.value);return a}he=d;let m=_e.length,_=i(a,l);he=void 0;let v=_e.length>m?_e.pop():void 0;if(_ instanceof Promise)return _.then((g)=>{if(v)v.issues=g.issues.length?et(g.issues):Un;return g});if(v)v.issues=_.issues.length?et(_.issues):Un;return _};if(e._zod.parse=c,e._zod.run===i)e._zod.run=c})}};
function Vn(){return ui}
function ai(e,t){let r=e[tt]?.backEdges;return r!==void 0&&t!==null&&typeof t==="object"&&r.has(t)}
var li=()=>{let e={string:{unit:"characters",verb:"to have"},file:{unit:"bytes",verb:"to have"},array:{unit:"items",verb:"to have"},set:{unit:"items",verb:"to have"},map:{unit:"entries",verb:"to have"}};function t(i){return e[i]??null}let r={regex:"input",email:"email address",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO datetime",date:"ISO date",time:"ISO time",duration:"ISO duration",ipv4:"IPv4 address",ipv6:"IPv6 address",mac:"MAC address",cidrv4:"IPv4 range",cidrv6:"IPv6 range",base64:"base64-encoded string",base64url:"base64url-encoded string",json_string:"JSON string",e164:"E.164 number",credit_card:"credit card number",jwt:"JWT",template_literal:"input"},n={nan:"NaN"};function s(i,c){if(i==="number"&&typeof c==="number"&&!Number.isFinite(c))return String(c);return n[i]??i}return(i)=>{switch(i.code){case"invalid_type":{let c=s(i.expected),a=FVo(i.input),l=s(a,i.input);return`Invalid input: expected ${c}, received ${l}`}case"invalid_value":if(i.values.length===1)return`Invalid input: expected ${YKr(i.values[0])}`;return`Invalid option: expected one of ${VKr(i.values,"|")}`;case"too_big":{let c=i.exact?"exactly ":i.inclusive?"<=":"<",a=t(i.origin);if(a)return`Too big: expected ${i.origin??"value"} to have ${c}${i.maximum.toString()} ${a.unit??"elements"}`;return`Too big: expected ${i.origin??"value"} to be ${c}${i.maximum.toString()}`}case"too_small":{let c=i.exact?"exactly ":i.inclusive?">=":">",a=t(i.origin);if(a)return`Too small: expected ${i.origin} to have ${c}${i.minimum.toString()} ${a.unit}`;return`Too small: expected ${i.origin} to be ${c}${i.minimum.toString()}`}case"invalid_format":{let c=i;if(c.format==="starts_with")return`Invalid string: must start with "${c.prefix}"`;if(c.format==="ends_with")return`Invalid string: must end with "${c.suffix}"`;if(c.format==="includes")return`Invalid string: must include "${c.includes}"`;if(c.format==="regex")return`Invalid string: must match pattern ${c.pattern}`;return`Invalid ${r[c.format]??i.format}`}case"not_multiple_of":return`Invalid number: must be a multiple of ${i.divisor}`;case"unrecognized_keys":return`Unrecognized key${i.keys.length>1?"s":""}: ${VKr(i.keys,", ")}`;case"invalid_key":return`Invalid key in ${i.origin}`;case"invalid_union":if(i.options&&Array.isArray(i.options)&&i.options.length>0)return`Invalid discriminator value. Expected ${i.options.map((a)=>`'${a}'`).join(" | ")}`;if(i.inclusive===!1)return"Invalid input: more than one option matched";return"Invalid input";case"invalid_element":return`Invalid value in ${i.origin}`;default:return"Invalid input"}}};
function rt(){return{localeError:li()}}
function V(e,...t){for(let r of t)for(let n of Reflect.ownKeys(r))if(Object.prototype.propertyIsEnumerable.call(r,n))q1(e,n,r[n]);return e}
function W(e){let t=e?.target??"draft-2020-12";if(t==="draft-4")t="draft-04";if(t==="draft-7")t="draft-07";return{processors:e.processors??{},metadataRegistry:e?.metadata??r2e,target:t,unrepresentable:e?.unrepresentable??"throw",override:e?.override??(()=>{}),io:e?.io??"output",counter:0,seen:new Map,sharedDefsExtractedFor:void 0,sharedEmitDoneFor:void 0,cycles:e?.cycles??"ref",reused:e?.reused??"inline",intersections:[],deferred:[],external:e?.external??void 0}}
function k(e,t,r,n,s){let i=typeof t.unrepresentable==="function"?t.unrepresentable({zodSchema:e,path:n.path,message:s}):t.unrepresentable;if(i==="any")return!1;if(i===void 0||i==="throw")throw Error(s);return Object.assign(r,i),!0}
function Ev(e,t,r={path:[],schemaPath:[]}){var n;let s=e._zod.def,i=t.seen.get(e);if(i){if(i.count++,r.schemaPath.includes(e))i.cycle=r.path;return i.schema}let c={schema:{},count:1,cycle:void 0,path:r.path};t.seen.set(e,c),t.sharedDefsExtractedFor=void 0,t.sharedEmitDoneFor=void 0;let a=e._zod.toJSONSchema?.();if(a)c.schema=a;else{let f={...r,schemaPath:[...r.schemaPath,e],path:r.path};if(e._zod.processJSONSchema)e._zod.processJSONSchema(t,c.schema,f);else{let h=c.schema,m=t.processors[s.type];if(!m)throw Error(`[toJSONSchema]: Non-representable type encountered: ${s.type}`);m(e,t,h,f)}let d=e._zod.parent;if(d){if(!c.ref)c.ref=d;Ev(d,t,f),t.seen.get(d).isParent=!0}}let l=t.metadataRegistry.get(e);if(l)V(c.schema,l);if(t.io==="input"&&w(e))delete c.schema.examples,delete c.schema.default;if(t.io==="input"&&"_prefault"in c.schema)(n=c.schema).default??(n.default=c.schema._prefault);return delete c.schema._prefault,t.seen.get(e).schema}
function Kn(e){return e.replace(/~/g,"~0").replace(/\//g,"~1")}
function G(e,t){let r=e.seen.get(t);if(!r)throw Error("Unprocessed schema. This is a bug in Zod.");if(e.external&&e.sharedDefsExtractedFor===e.external)return;let n=new Map;for(let c of e.seen.entries()){let a=e.metadataRegistry.get(c[0])?.id;if(a){let l=n.get(a);if(l&&l!==c[0])throw Error(`Duplicate schema id "${a}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);n.set(a,c[0])}}let s=(c)=>{let a=e.target==="draft-2020-12"?"$defs":"definitions";if(e.external){let d=e.external.registry.get(c[0])?.id,h=e.external.uri??((_)=>_);if(d)return{ref:h(d)};let m=c[1].defId??c[1].schema.id??`schema${e.counter++}`;return c[1].defId=m,{defId:m,ref:`${h("__shared")}#/${a}/${Kn(m)}`}}let l="#",p=`${l}/${a}/`;if(c[1]===r&&!c[1].schema.id)return{ref:l};let f=c[1].schema.id??`__schema${e.counter++}`;return{defId:f,ref:p+Kn(f)}},i=(c)=>{if(c[1].schema.$ref)return;let a=c[1],{ref:l,defId:p}=s(c);if(a.def={...a.schema},p)a.defId=p;let f=a.schema;for(let d in f)delete f[d];f.$ref=l};if(e.cycles==="throw")for(let c of e.seen.entries()){let a=c[1];if(a.cycle)throw Error(`Cycle detected: #/${a.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`)}for(let c of e.seen.entries()){let a=c[1];if(t===c[0]){i(c);continue}if(e.external){let p=e.external.registry.get(c[0])?.id;if(t!==c[0]&&p){i(c);continue}}if(e.metadataRegistry.get(c[0])?.id){i(c);continue}if(a.cycle){i(c);continue}if(a.count>1){if(e.reused==="ref"){i(c);continue}}}if(e.external)e.sharedDefsExtractedFor=e.external}
function Yn(e){let t=e.anyOf;if(!Array.isArray(t)||t.length===0||e.type!==void 0)return;let r=[];for(let n of t){if(!n||typeof n!=="object")return;Yn(n);let s=Object.keys(n);if(s.length!==1||s[0]!=="type")return;let i=n.type;for(let c of Array.isArray(i)?i:[i]){if(typeof c!=="string")return;if(!r.includes(c))r.push(c)}}delete e.anyOf,e.type=r.length===1?r[0]:r}
var qn=new Set(["type","properties","required","additionalProperties"]);
var Wn=["oneOf","anyOf"];
function Gn(e){let t=e.additionalProperties;if(t===void 0||t===!1||typeof t!=="object"||t===null)return null;return Object.keys(t).length?t:null}
function ot(e){let t=[];for(let i of e){if(typeof i!=="object"||i.type!=="object")return null;for(let c in i)if(!qn.has(c))return null;t.push(i)}let r={},n=new Set;for(let i of t){for(let c in i.properties){if(Object.prototype.hasOwnProperty.call(r,c))continue;let a=[];for(let p of t){let f=p.properties?.[c]??Gn(p);if(f===null||f===void 0)continue;if(!a.some((d)=>JSON.stringify(d)===JSON.stringify(f)))a.push(f)}let l=a.length===1?a[0]:ot(a)??{allOf:a};q1(r,c,l)}for(let c of i.required??[])n.add(c)}let s={type:"object",properties:r};if(n.size)s.required=[...n];if(t.every((i)=>i.additionalProperties===!1))s.additionalProperties=!1;else{let i=[];for(let c of t){let a=Gn(c);if(a&&!i.some((l)=>JSON.stringify(l)===JSON.stringify(a)))i.push(a)}if(i.length===1)s.additionalProperties=i[0];else if(i.length>1)s.additionalProperties={allOf:i}}return s}
function pi(e){let t=e.allOf;if(!Array.isArray(t)||t.length<2)return;for(let s of qn)if(s in e)return;let r=t.filter((s)=>Wn.some((i)=>Array.isArray(s[i]))),n=null;if(!r.length)n=ot(t);else{let s=r[0],i=Wn.find((l)=>Array.isArray(s[l]));if(Object.keys(s).length!==1)return;let c=t.filter((l)=>l!==s),a=s[i].map((l)=>ot([...c,l]));if(a.some((l)=>!l))return;n={[i]:a}}if(!n)return;delete e.allOf,V(e,n)}
function Y(e,t){let r=e.seen.get(t);if(!r)throw Error("Unprocessed schema. This is a bug in Zod.");let n=(a)=>{let l=e.seen.get(a);if(l.ref===null)return;let p=l.def??l.schema,f={...p},d=l.ref;if(l.ref=null,d){n(d);let m=e.seen.get(d),_=m.schema;if(_.$ref&&(e.target==="draft-07"||e.target==="draft-04"||e.target==="openapi-3.0"))p.allOf=p.allOf??[],p.allOf.push(_);else V(p,_);if(V(p,f),a._zod.parent===d)for(let g in p){if(g==="$ref"||g==="allOf")continue;if(!(g in f))delete p[g]}if(_.$ref&&m.def)for(let g in p){if(g==="$ref"||g==="allOf")continue;if(g in m.def&&JSON.stringify(p[g])===JSON.stringify(m.def[g]))delete p[g]}}let h=a._zod.parent;if(h&&h!==d){n(h);let m=e.seen.get(h);if(m?.schema.$ref){if(p.$ref=m.schema.$ref,m.def)for(let _ in p){if(_==="$ref"||_==="allOf")continue;if(_ in m.def&&JSON.stringify(p[_])===JSON.stringify(m.def[_]))delete p[_]}}}e.override({zodSchema:a,jsonSchema:p,path:l.path??[]})};if(!e.external||e.sharedEmitDoneFor!==e.external){for(let a of[...e.seen.entries()].reverse())n(a[0]);if(e.target!=="openapi-3.0")for(let a of e.seen.entries())Yn(a[1].def??a[1].schema);for(let a of e.deferred)a();if(e.intersections.length){let a=new Map;for(let l of e.seen.values())for(let p of[l.schema,l.def]){let f=p?.allOf;if(!Array.isArray(f))continue;let d=a.get(f);if(d)d.push(p);else a.set(f,[p])}for(let l of e.intersections)for(let p of a.get(l)??[])pi(p)}}let s={};if(e.target==="draft-2020-12")s.$schema="https://json-schema.org/draft/2020-12/schema";else if(e.target==="draft-07")s.$schema="http://json-schema.org/draft-07/schema#";else if(e.target==="draft-04")s.$schema="http://json-schema.org/draft-04/schema#";else if(e.target==="openapi-3.0");if(e.external?.uri){let a=e.external.registry.get(t)?.id;if(!a)throw Error("Schema is missing an `id` property");s.$id=e.external.uri(a)}V(s,r.defId?r.schema:r.def??r.schema);let i=e.metadataRegistry.get(t)?.id;if(i!==void 0&&s.id===i)delete s.id;let c=e.external?.defs??{};if(!e.external||e.sharedEmitDoneFor!==e.external)for(let a of e.seen.entries()){let l=a[1];if(l.def&&l.defId){if(l.def.id===l.defId)delete l.def.id;q1(c,l.defId,l.def)}}if(e.external)e.sharedEmitDoneFor=e.external;if(e.external);else if(Object.keys(c).length>0)if(e.target==="draft-2020-12")s.$defs=c;else s.definitions=c;try{let a=JSON.parse(JSON.stringify(s));return Object.defineProperty(a,"~standard",{value:{...t["~standard"],jsonSchema:{input:K(t,"input",e.processors),output:K(t,"output",e.processors)}},enumerable:!1,writable:!1}),a}catch(a){throw Error("Error converting schema to JSON.")}}
function w(e,t){let r=t??{seen:new Set};if(r.seen.has(e))return!1;r.seen.add(e);let n=e._zod.def;if(n.type==="transform")return!0;if(n.type==="array")return w(n.element,r);if(n.type==="set")return w(n.valueType,r);if(n.type==="lazy")return w(n.getter(),r);if(n.type==="promise"||n.type==="optional"||n.type==="nonoptional"||n.type==="nullable"||n.type==="readonly"||n.type==="default"||n.type==="prefault"||n.type==="catch")return w(n.innerType,r);if(n.type==="intersection")return w(n.left,r)||w(n.right,r);if(n.type==="record"||n.type==="map")return w(n.keyType,r)||w(n.valueType,r);if(n.type==="pipe"){if(e._zod.traits.has("$ZodCodec"))return!0;return w(n.in,r)||w(n.out,r)}if(n.type==="object"){for(let s in n.shape)if(w(n.shape[s],r))return!0;return!1}if(n.type==="union"){for(let s of n.options)if(w(s,r))return!0;return!1}if(n.type==="tuple"){for(let s of n.items)if(w(s,r))return!0;if(n.rest&&w(n.rest,r))return!0;return!1}return!1}
var Xn=(e,t={})=>(r)=>{let n=W({...r,processors:t});return Ev(e,n),G(n,e),Y(n,e)};
var K=(e,t,r={})=>(n)=>{let{libraryOptions:s,target:i}=n??{},c=W({...s??{},target:i,io:t,processors:r});return Ev(e,c),G(c,e),Y(c,e)};
var pt=(e,t,r,n)=>{r.not={}};
var mt=(e,t,r,n)=>{};
var ht=(e,t,r,n)=>{let s=e._zod.def,i=lQn(s.entries);if(i.length===0){r.not={};return}if(i.every((c)=>typeof c==="number"))r.type="number";if(i.every((c)=>typeof c==="string"))r.type="string";r.enum=i};
var _t=(e,t,r,n)=>{let s=e._zod.def;if(s.values.length===0){r.not={};return}let i=[];for(let c of s.values)if(c===void 0){if(k(e,t,r,n,"Literal `undefined` cannot be represented in JSON Schema"))return}else if(typeof c==="bigint"){if(k(e,t,r,n,"BigInt literals cannot be represented in JSON Schema"))return;i.push(Number(c))}else i.push(c);if(i.length===0);else if(i.length===1){let c=i[0];if(r.type=c===null?"null":typeof c,t.target==="draft-04"||t.target==="openapi-3.0")r.enum=[c];else r.const=c}else{if(i.every((c)=>typeof c==="number"))r.type="number";if(i.every((c)=>typeof c==="string"))r.type="string";if(i.every((c)=>typeof c==="boolean"))r.type="boolean";if(i.every((c)=>c===null))r.type="null";r.enum=i}};
var gt=(e,t,r,n)=>{k(e,t,r,n,"Custom types cannot be represented in JSON Schema")};
var xt=(e,t,r,n)=>{k(e,t,r,n,"Transforms cannot be represented in JSON Schema")};
var vt=(e,t,r,n)=>{let s=r,i=e._zod.def,{minimum:c,maximum:a}=e._zod.bag;if(typeof c==="number")s.minItems=c;if(typeof a==="number")s.maxItems=a;s.type="array",s.items=Ev(i.element,t,{...n,path:[...n.path,"items"]})};
function q(e){let t=e._zod.def;if(t.type==="pipe"&&t.in._zod.traits.has("$ZodTransform"))return q(t.out);if(t.type==="catch")return q(t.innerType);return e._zod.optin}
var zt=(e,t,r,n)=>{let s=r,i=e._zod.def,c=i.shape;if(Object.getOwnPropertySymbols(c).length&&k(e,t,s,n,"Symbol keys cannot be represented in JSON Schema"))return;s.type="object",s.properties={};for(let f in c)q1(s.properties,f,Ev(c[f],t,{...n,path:[...n.path,"properties",f]}));let l=new Set(Object.keys(c)),p=new Set([...l].filter((f)=>{let d=i.shape[f];if(t.io==="input")return q(d)===void 0;else return d._zod.optout===void 0}));if(p.size>0)s.required=Array.from(p);if(i.catchall?._zod.def.type==="never")s.additionalProperties=!1;else if(!i.catchall){if(t.io==="output")s.additionalProperties=!1}else if(i.catchall)s.additionalProperties=Ev(i.catchall,t,{...n,path:[...n.path,"additionalProperties"]})};
var yt=(e,t,r,n)=>{let s=e._zod.def,i=s.inclusive===!1,c=s.options.map((a,l)=>Ev(a,t,{...n,path:[...n.path,i?"oneOf":"anyOf",l]}));if(i)r.oneOf=c;else r.anyOf=c};
var $t=(e,t,r,n)=>{let s=e._zod.def,i=Ev(s.left,t,{...n,path:[...n.path,"allOf",0]}),c=Ev(s.right,t,{...n,path:[...n.path,"allOf",1]}),a=(p)=>("allOf"in p)&&Object.keys(p).length===1,l=[...a(i)?i.allOf:[i],...a(c)?c.allOf:[c]];r.allOf=l,t.intersections.push(l)};
var Zt=(e,t,r,n)=>{let s=e._zod.def,i=Ev(s.innerType,t,n),c=t.seen.get(e);if(t.target==="openapi-3.0")c.ref=s.innerType,r.nullable=!0;else r.anyOf=[i,{type:"null"}]};
var wt=(e,t,r,n)=>{let s=e._zod.def;Ev(s.innerType,t,n);let i=t.seen.get(e);i.ref=s.innerType};
var Pt=Symbol();
function ls(e,t,r,n,s){let i=!1,c=JSON.stringify(e,(a,l)=>{if(typeof l!=="bigint")return l;return i=!0,null});if(!i)return JSON.parse(c);return k(t,r,n,s,"BigInt defaults cannot be represented in JSON Schema"),Pt}
var St=(e,t,r,n)=>{let s=e._zod.def;Ev(s.innerType,t,n);let i=t.seen.get(e);i.ref=s.innerType;let c=ls(s.defaultValue,e,t,r,n);if(c!==Pt)r.default=c};
var It=(e,t,r,n)=>{let s=e._zod.def;Ev(s.innerType,t,n);let i=t.seen.get(e);if(i.ref=s.innerType,t.io!=="input")return;let c=ls(s.defaultValue,e,t,r,n);if(c!==Pt)r._prefault=c};
var Ot=(e,t,r,n)=>{let s=e._zod.def;Ev(s.innerType,t,n);let i=t.seen.get(e);i.ref=s.innerType;let c;try{c=s.catchValue(void 0)}catch{k(e,t,r,n,"Dynamic catch values are not supported in JSON Schema");return}r.default=c};
var Tt=(e,t,r,n)=>{let s=e._zod.def,i=s.in._zod.traits.has("$ZodTransform"),c=t.io==="input"?i?s.out:s.in:s.out;Ev(c,t,n);let a=t.seen.get(e);a.ref=c};
var At=(e,t,r,n)=>{let s=e._zod.def;Ev(s.innerType,t,n);let i=t.seen.get(e);i.ref=s.innerType,r.readOnly=!0};
var ge=(e,t,r,n)=>{let s=e._zod.def;Ev(s.innerType,t,n);let i=t.seen.get(e);i.ref=s.innerType};
var fs=new WeakSet([Object.prototype,Error.prototype]);
function xe(e,t,r){Object.defineProperty(e,t,{configurable:!0,enumerable:!1,get(){let n=r(this);return Object.defineProperty(this,t,{value:n,configurable:!0,writable:!0}),n},set(n){Object.defineProperty(this,t,{value:n,configurable:!0,writable:!0})}})}
var ds=(e,t)=>{re.init(e,t),e.name="ZodError";let r=Object.getPrototypeOf(e);if(fs.has(r))return;fs.add(r),xe(r,"format",(n)=>(s)=>Er(n,s)),xe(r,"flatten",(n)=>(s)=>Ar(n,s)),xe(r,"addIssue",(n)=>(s)=>{n.issues.push(s),n.message=JSON.stringify(n.issues,Swn,2)}),xe(r,"addIssues",(n)=>(s)=>{n.issues.push(...s),n.message=JSON.stringify(n.issues,Swn,2)}),Object.defineProperty(r,"isEmpty",{configurable:!0,enumerable:!1,get(){return this.issues.length===0}})};
var S=Zn("ZodError",ds,void 0,{Parent:Error});
var ms=ne(S);
var hs=se(S);
var iQn=F(S);
var _s=M(S);
var gs=Cr(S);
var xs=Rr(S);
var vs=Dr(S);
var ys=jr(S);
var $s=Lr(S);
var bs=Fr(S);
var ks=Ur(S);
var Zs=Mr(S);
function yi(){if(!j9.localeError)T3(rt())}
function Q(){if(!j9.memoizer)T3({memoizer:Vn()})}
var Hb=Zn("ZodType",(e,t)=>(yi(),Ib.init(e,t),e.def=t,e.type=t.type,e),{check(...e){let t=this.def;return this.clone(X7e(t,{checks:[...t.checks??[],...e.map((r)=>typeof r==="function"?{_zod:{check:r,def:{check:"custom"},onattach:[]}}:r)]}),{parent:!0})},with(...e){return this.check(...e)},clone(e,t){return MPe(this,e,t)},brand(){return this},register(e,t){return e.add(this,t),this},refine(e,t){return this.check(cc(e,t))},superRefine(e,t){return this.check(uc(e,t))},overwrite(e){return this.check(E(e))},optional(){return zs(this)},exactOptional(){return Yi(this)},nullable(){return ws(this)},nullish(){return zs(ws(this))},nonoptional(e){return tc(this,e)},array(){return T(this)},or(e){return Fe([this,e])},and(e){return iQ(this,e)},transform(e){return Ps(this,Ns(e))},default(e){return Hi(this,e)},prefault(e){return ec(this,e)},catch(e){return rc(this,e)},pipe(e){return Ps(this,e)},readonly(){return sc(this)},describe(e){let t=this.clone();return r2e.add(t,{description:e}),t},meta(...e){if(e.length===0)return r2e.get(this);let t=this.clone();return r2e.add(t,e[0]),t},isOptional(){return this.safeParse(void 0).success},isNullable(){return this.safeParse(null).success},apply(e,...t){return t.length===0?e(this):e(this,...t)},get "~standard"(){return JKr(this,"~standard",{...Ae(this),jsonSchema:{input:K(this,"input"),output:K(this,"output")}})},set "~standard"(e){kyt(this,"~standard",e)},parse:function e(t,r){return ms(this,t,r,{callee:e})},parseAsync:async function e(t,r){return await hs(this,t,r,{callee:e})},safeParse(e,t){return iQn(this,e,t)},async safeParseAsync(e,t){return _s(this,e,t)},get spa(){return this?.safeParseAsync},set spa(e){kyt(this,"spa",e)},encode:function e(t,r){return gs(this,t,r,{callee:e})},decode:function e(t,r){return xs(this,t,r,{callee:e})},encodeAsync:async function e(t,r){return await vs(this,t,r,{callee:e})},decodeAsync:async function e(t,r){return await ys(this,t,r,{callee:e})},safeEncode(e,t){return $s(this,e,t)},safeDecode(e,t){return bs(this,e,t)},async safeEncodeAsync(e,t){return ks(this,e,t)},async safeDecodeAsync(e,t){return Zs(this,e,t)},toJSONSchema(e){return Xn(this,{})(e)},get description(){return r2e.get(this)?.description},get _def(){return this._zod.def}});
var Mi=Zn("ZodUnknown",(e,t)=>{Ro.init(e,t),Hb.init(e,t),e._zod.processJSONSchema=(r,n,s)=>mt(e,r,n,s)});
function ie(){return Cn(Mi)}
var Ji=Zn("ZodNever",(e,t)=>{Do.init(e,t),Hb.init(e,t),e._zod.processJSONSchema=(r,n,s)=>pt(e,r,n,s)});
function OPe(e){return Rn(Ji,e)}
var GKr=Zn("ZodArray",(e,t)=>{Q(),jo.init(e,t),Hb.init(e,t),e._zod.processJSONSchema=(r,n,s)=>vt(e,r,n,s),e.element=t.element},{min(e,t){return this.check(R(e,t))},nonempty(e){return this.check(R(1,e))},max(e,t){return this.check(UWt(e,t))},length(e,t){return this.check(me(e,t))},unwrap(){return this.element}});
function T(e,t){return Dn(GKr,e,t)}
var gbe=Zn("ZodObject",(e,t)=>{Q(),Uo.init(e,t),Hb.init(e,t),e._zod.processJSONSchema=(r,n,s)=>zt(e,r,n,s),GXo(e,"shape",(r)=>r._zod.def.shape,!1)},{keyof(){return U(Object.keys(this._zod.def.shape))},catchall(e){return this.clone({...this._zod.def,catchall:e})},passthrough(){return this.clone({...this._zod.def,catchall:ie()})},loose(){return this.clone({...this._zod.def,catchall:ie()})},strict(){return this.clone({...this._zod.def,catchall:OPe()})},strip(){return this.clone({...this._zod.def,catchall:void 0})},extend(e){return UXo(this,e)},safeExtend(e){return BXo(this,e)},merge(e){return jXo(this,e)},pick(e){return FXo(this,e)},omit(e){return $Xo(this,e)},partial(...e){return LVo(ywn,this,e[0])},exactPartial(...e){return LVo(Cs,this,e[0],"exactPartial")},required(...e){return WXo(Rs,this,e[0])}});
function u(e,t){let r={type:"object",shape:e??{},...Aa(t)};return new gbe(r)}
var Es=Zn("ZodUnion",(e,t)=>{Ne.init(e,t),Hb.init(e,t),e._zod.processJSONSchema=(r,n,s)=>yt(e,r,n,s),e.options=t.options});
function Fe(e,t){return new Es({type:"union",options:e,...Aa(t)})}
var Vi=Zn("ZodIntersection",(e,t)=>{Jo.init(e,t),Hb.init(e,t),e._zod.processJSONSchema=(r,n,s)=>$t(e,r,n,s)});
function iQ(e,t){return new Vi({type:"intersection",left:e,right:t})}
var hwn=Zn("ZodEnum",(e,t)=>{Wo.init(e,t),Hb.init(e,t),e._zod.processJSONSchema=(n,s,i)=>ht(e,n,s,i),e.enum=t.entries,e.options=Object.values(t.entries);let r=new Set(Object.keys(t.entries));e.extract=(n,s)=>{let i={};for(let c of n)if(r.has(c))i[c]=t.entries[c];else throw Error(`Key ${c} not found in enum`);return new hwn({...t,checks:[],...Aa(s),entries:i})},e.exclude=(n,s)=>{let i={...t.entries};for(let c of n)if(r.has(c))delete i[c];else throw Error(`Key ${c} not found in enum`);return new hwn({...t,checks:[],...Aa(s),entries:i})}});
function U(e,t){let r=Array.isArray(e)?Object.fromEntries(e.map((n)=>[n,n])):e;return new hwn({type:"enum",entries:r,...Aa(t)})}
var zKr=Zn("ZodLiteral",(e,t)=>{Go.init(e,t),Hb.init(e,t),e._zod.processJSONSchema=(r,n,s)=>_t(e,r,n,s),e.values=new Set(t.values),Object.defineProperty(e,"value",{get(){if(t.values.length>1)throw Error("This schema contains multiple valid literal values. Use `.values` instead.");return t.values[0]}})});
function x(e,t){return new zKr({type:"literal",values:Array.isArray(e)?e:[e],...Aa(t)})}
var Gi=Zn("ZodTransform",(e,t)=>{Q(),Yo.init(e,t),Hb.init(e,t),e._zod.processJSONSchema=(r,n,s)=>xt(e,r,n,s),e._zod.parse=(r,n)=>{if(n.direction==="backward")throw new wwn(e.constructor.name);r.addIssue=(i)=>{if(typeof i==="string")r.issues.push(Tyt(i,r.value,t));else{let c=i;if(c.fatal)c.continue=!1;if(c.code??(c.code="custom"),!("input"in c))c.input=r.value;c.inst??(c.inst=e),r.issues.push(Tyt(c))}};let s=t.transform(r.value,r);if(s instanceof Promise)return s.then((i)=>(r.value=i,r));return r.value=s,r}});
function Ns(e){return new Gi({type:"transform",transform:e})}
var ywn=Zn("ZodOptional",(e,t)=>{Ce.init(e,t),Hb.init(e,t),e._zod.processJSONSchema=(r,n,s)=>ge(e,r,n,s),e.unwrap=()=>e._zod.def.innerType});
function zs(e){return new ywn({type:"optional",innerType:e})}
var Cs=Zn("ZodExactOptional",(e,t)=>{qo.init(e,t),Hb.init(e,t),e._zod.processJSONSchema=(r,n,s)=>ge(e,r,n,s),e.unwrap=()=>e._zod.def.innerType});
function Yi(e){return new Cs({type:"optional",innerType:e})}
var qi=Zn("ZodNullable",(e,t)=>{Xo.init(e,t),Hb.init(e,t),e._zod.processJSONSchema=(r,n,s)=>Zt(e,r,n,s),e.unwrap=()=>e._zod.def.innerType});
function ws(e){return new qi({type:"nullable",innerType:e})}
var Xi=Zn("ZodDefault",(e,t)=>{Ho.init(e,t),Hb.init(e,t),e._zod.processJSONSchema=(r,n,s)=>St(e,r,n,s),e.unwrap=()=>e._zod.def.innerType,e.removeDefault=e.unwrap});
function Hi(e,t){return new Xi({type:"default",innerType:e,get defaultValue(){return typeof t==="function"?t():KKr(t)}})}
var Qi=Zn("ZodPrefault",(e,t)=>{Qo.init(e,t),Hb.init(e,t),e._zod.processJSONSchema=(r,n,s)=>It(e,r,n,s),e.unwrap=()=>e._zod.def.innerType});
function ec(e,t){return new Qi({type:"prefault",innerType:e,get defaultValue(){return typeof t==="function"?t():KKr(t)}})}
var Rs=Zn("ZodNonOptional",(e,t)=>{en.init(e,t),Hb.init(e,t),e._zod.processJSONSchema=(r,n,s)=>wt(e,r,n,s),e.unwrap=()=>e._zod.def.innerType});
function tc(e,t){return new Rs({type:"nonoptional",innerType:e,...Aa(t)})}
var aQn=Zn("ZodCatch",(e,t)=>{tn.init(e,t),Hb.init(e,t),e._zod.processJSONSchema=(r,n,s)=>Ot(e,r,n,s),e.unwrap=()=>e._zod.def.innerType,e.removeCatch=e.unwrap});
function rc(e,t){return new aQn({type:"catch",innerType:e,catchValue:typeof t==="function"?t:$Vo(t)})}
var _wn=Zn("ZodPipe",(e,t)=>{Re.init(e,t),Hb.init(e,t),e._zod.processJSONSchema=(r,n,s)=>Tt(e,r,n,s),e.in=t.in,e.out=t.out});
function Ps(e,t){return new _wn({type:"pipe",in:e,out:t})}
var nc=Zn("ZodReadonly",(e,t)=>{on.init(e,t),Hb.init(e,t),e._zod.processJSONSchema=(r,n,s)=>At(e,r,n,s),e.unwrap=()=>e._zod.def.innerType});
function sc(e){return new nc({type:"readonly",innerType:e})}
var Ds=Zn("ZodCustom",(e,t)=>{nn.init(e,t),Hb.init(e,t),e._zod.processJSONSchema=(r,n,s)=>gt(e,r,n,s)});
function cc(e,t={}){return Ln(Ds,e,t)}
function uc(e,t){return Fn(e,t)}
return {U,ie,u,x};
}
function make_chunk_ttgve2cs({Dt,J,Ln,U,a,bn,cn,f,g,ie,j,me,q,tt,u,x}){
var T6o="urn:ietf:params:oauth:grant-type:jwt-bearer";
var k6o="refresh_token";
var NXn="/v1/oauth/token";
var LXe="oauth-2025-04-20";
var R6o="oidc-federation-2026-04-01";
var x6o=120;
var NXe=30;
var P6o=5;
var Q=1048576;
function FXn(e){if(!e)return;let r;try{r=new URL(e)}catch(s){throw new id(`Invalid token endpoint base URL "${e}": ${s}`)}if(r.protocol==="https:")return;let n=r.hostname.toLowerCase().replace(/^\[|\]$/g,"");if(r.protocol==="http:"&&(n==="localhost"||n==="127.0.0.1"||n==="::1"))return;throw new id(`Refusing to send credential over non-https token endpoint "${e}"`)}
async function $Xn(e,r){let n=await Ve(e),s;try{s=JSON.parse(n)}catch{throw new id(`Token endpoint returned non-JSON response (status ${e.status})`,e.status,WJ(n),r)}if(!s.access_token)throw new id(`Token endpoint response missing access_token: ${JSON.stringify(WJ(s))}`,e.status,WJ(s),r);if(s.token_type&&s.token_type.toLowerCase()!=="bearer")throw new id(`Token endpoint response: unsupported token_type "${s.token_type}" (want Bearer)`,e.status,WJ(s),r);return s}
var w=2000;
var Ye=new Set(["error","error_description","error_uri"]);
function WJ(e){if(e==null)return e;if(typeof e==="string"){let r;try{r=JSON.parse(e)}catch{if(e.length<=w)return e;return e.slice(0,w)+`... <${e.length-w} more chars>`}return JSON.stringify(WJ(r))}if(typeof e==="object"&&!Array.isArray(e)){let r={};for(let[n,s]of Object.entries(e))if(Ye.has(n))r[n]=s;return r}return null}
async function z2t(e,r=(n)=>console.warn(`anthropic-sdk: ${n}`)){if(typeof process>"u")return;let{fs:n}=await import("./nativeIO.js"),s=e,i;try{s=await n.promises.realpath(e),i=await n.promises.stat(s)}catch{return}let c=i.mode&511;if(c&18)throw new id(`Credentials file at ${s} is group/world-writable (mode 0o${c.toString(8)}); this allows other local users to plant tokens. Run \`chmod 600 ${s}\`.`);if(c&36)throw new id(`Credentials file at ${s} is group/world-readable (mode 0o${c.toString(8)}); run \`chmod 600 ${s}\` before retrying.`);if(typeof process.getuid==="function"&&i.uid!==process.getuid())r(`credentials file at ${s} is owned by uid ${i.uid} (current process uid ${process.getuid()}); verify this is intentional.`)}
async function Xxe(e,r){let{fs:n,path:s}=await import("./nativeIO.js"),i=s.dirname(e);await n.promises.mkdir(i,{recursive:!0,mode:448});let c=`${e}.${process.pid}.${Math.random().toString(36).slice(2)}.tmp`;try{let d=await n.promises.open(c,"w",384);try{await d.writeFile(JSON.stringify(r,null,2)),await d.sync()}finally{await d.close()}await n.promises.rename(c,e)}catch(d){throw await n.promises.unlink(c).catch(()=>{}),d}try{let d=await n.promises.open(i,"r");try{await d.sync()}finally{await d.close()}}catch{}}
async function Ve(e){if(!e.body)return"";let r=e.body.getReader(),n=[],s=0;for(;;){let{done:c,value:d}=await r.read();if(c)break;if(s+d.length>Q){let p=Q-s;if(p>0)n.push(d.subarray(0,p));await r.cancel();break}n.push(d),s+=d.length}let i;if(n.length===1)i=n[0];else{i=new Uint8Array(n.reduce((d,p)=>d+p.length,0));let c=0;for(let d of n)i.set(d,c),c+=d.length}return new TextDecoder("utf-8").decode(i)}
class id extends Ln{constructor(e,r=null,n=null,s=null){super(e);this.statusCode=r,this.body=n,this.requestId=s}}
var qe="tengu_lively_beaver";
class te{reader=null;register(e){let r=this.reader;return this.reader=e,r}}
var re=new te;
function yht(){let e=re.reader;if(!e)return!1;try{return e(qe,!1)===!0}catch{return!1}}
var MXe="account_on_hold";
var _ht="https://claude.ai/restricted";
var ee=2048;
var Je=/^https:\/\/[a-z0-9.-]+\/[A-Za-z0-9/._~%-]*(?:\?[A-Za-z0-9._~%=&-]*)?(?<![.?])$/;
function Qe(e){try{return e===new URL(cn().CLAUDE_AI_ORIGIN).origin}catch{return!1}}
function Yxe(e){if(typeof e!=="string"||e.length>ee)return _ht;let r;try{r=new URL(e)}catch{return _ht}if(r.protocol!=="https:"||r.username||r.password||r.port||r.hash)return _ht;let n=r.hostname;return(n==="claude.ai"||n.endsWith(".claude.ai")||n==="anthropic.com"||n.endsWith(".anthropic.com")||Qe(r.origin))&&r.href.length<=ee&&Je.test(r.href)?r.href:_ht}
var Ze=f(()=>u({error:U(["invalid_grant","access_denied"]),error_description:x(MXe),error_uri:ie().optional()}));
function G2t(e){if(!yht())return null;let r=e;if(typeof r==="string"){if(!r.includes(MXe))return null;try{r=J(r)}catch{return null}}let n=Ze().safeParse(r);return n.success?{url:Yxe(n.data.error_uri)}:null}
function YUe(e){if(!(e instanceof id)||e.statusCode!==400&&e.statusCode!==401&&e.statusCode!==403)return null;return G2t(e.body)}
function Sht(e){return e instanceof id&&e.statusCode===null&&e.message.includes("has expired and no refresh is available")}
var at=["ANTHROPIC_FEDERATION_RULE_ID","ANTHROPIC_ORGANIZATION_ID"];
class ue{precedenceSource={filled:!1};authType={filled:!1};profileBaseUrl={filled:!1};accountInfo={filled:!1};federationIdentity={filled:!1};profileStoreDenyPaths={filled:!1};settingsBearerRejected=!1;primedFiles=void 0}
var A=new q(()=>new ue);
function kb(){let e=A.of(j().host);if(e.precedenceSource.filled)return e.precedenceSource.value;let r=ft();return e.precedenceSource={filled:!0,value:r},r}
function ft(){let e=SM(),r=de();if(r){if(e===null)return null;let n=k(e,r);return n==="oidc_federation"||n==="user_oauth"?"profile-explicit":null}if(pe())return"env-quad";if(e!==null){let n=k(e,MSe(e));if(n==="oidc_federation"||n==="user_oauth")return"profile-implicit"}return null}
function nSn(){let e=A.of(j().host);e.precedenceSource={filled:!1},e.authType={filled:!1},e.profileBaseUrl={filled:!1},e.federationIdentity={filled:!1},e.profileStoreDenyPaths={filled:!1},e.settingsBearerRejected=!1,V2t()}
function V2t(){A.of(j().host).accountInfo={filled:!1}}
function I6o(){return kb()!==null}
function FXe(){let e=A.of(j().host);if(e.authType.filled)return e.authType.value;let r=lt();return e.authType={filled:!0,value:r},r}
function lt(){let e=kb();if(e===null)return null;if(e==="env-quad")return"oidc_federation";let r=SM();if(r===null)return null;let n=e==="profile-explicit"?process.env.ANTHROPIC_PROFILE?.trim()??"default":MSe(r),s=k(r,n);return s==="oidc_federation"||s==="user_oauth"?s:null}
function q2t(){return kb()==="profile-implicit"&&FXe()==="user_oauth"}
function XUe(){let e=A.of(j().host);if(e.accountInfo.filled)return e.accountInfo.value;let r=ut();return e.accountInfo={filled:!0,value:r},r}
function ut(){let e=kb();if(e===null||e==="env-quad")return;let r=SM();if(r===null)return;let n=e==="profile-explicit"?process.env.ANTHROPIC_PROFILE?.trim()??"default":MSe(r),s=S(F(r,n));if(s===null)return;try{let i=JSON.parse(s);return{organizationUuid:i.organization_uuid,organizationName:i.organization_name,accountEmail:i.account_email,workspaceId:i.workspace_id,workspaceName:i.workspace_name}}catch{return}}
function $Xe(){let e=A.of(j().host);if(e.profileBaseUrl.filled)return e.profileBaseUrl.value;let r=ct();return e.profileBaseUrl={filled:!0,value:r},r}
function ct(){let e=kb();if(e===null||e==="env-quad")return;let r=SM();if(r===null)return;try{let n=e==="profile-explicit"?process.env.ANTHROPIC_PROFILE?.trim()??"default":MSe(r),s=S(g(r,"configs",`${n}.json`));if(s===null)return;let i=JSON.parse(s);return typeof i.base_url==="string"&&i.base_url.trim()?i.base_url.trim():void 0}catch{return}}
function H6o(){return A.of(j().host).settingsBearerRejected}
function O6o(e){A.of(j().host).settingsBearerRejected=e}
function MSe(e){return S(g(e,"active_config"))?.trim()||"default"}
function Yzr(e){return process.env.ANTHROPIC_PROFILE?.trim()||MSe(e)}
function k(e,r){let n=S(g(e,"configs",`${r}.json`));if(n===null)return null;let s;try{s=JSON.parse(n)}catch{return null}let i=s?.authentication?.type??null;if(i==="user_oauth"){if(!S(F(e,r,s))?.trim())return null}return i}
function F(e,r,n){if(n===void 0){let s=S(g(e,"configs",`${r}.json`));if(s!==null)try{n=JSON.parse(s)}catch{}}return n?.authentication?.credentials_path??g(e,"credentials",`${r}.json`)}
function SM(){return ce()?.dir??null}
function ce(){if(bn())return null;let e=process.env,r=e.ANTHROPIC_CONFIG_DIR?.trim();if(r)return{dir:r,space:"userNamed"};let n=e.XDG_CONFIG_HOME?.trim();if(n)return{dir:g(n,"anthropic"),space:"home"};let s=e.HOME?.trim();return s?{dir:g(s,".config","anthropic"),space:"home"}:null}
function de(){return process.env.ANTHROPIC_PROFILE?.trim()}
function pe(){return at.every((e)=>process.env[e]?.trim())}
function S(e){let r=A.of(j().host).primedFiles;if(r!==void 0&&r.has(e))return r.get(e)??null;try{return tt(e,"utf-8")}catch(n){if(Dt(n))return null;throw n}}
function JUe(){if(bn())return null;let e=a.CLAUDE_CODE_FEDERATION_CACHE_DIR;if(e)return me(e);let r=SM();return r===null?null:me(r,"credentials","federation")}
return {$Xe,$Xn,FXe,FXn,H6o,I6o,JUe,LXe,MSe,NXe,NXn,O6o,P6o,R6o,SM,Sht,T6o,V2t,WJ,XUe,Xxe,YUe,Yzr,id,k6o,kb,nSn,q2t,x6o,z2t,readProtectionState287:()=>A.of(j().host)};
}
function make_chunk_1zmpymz2({Ipe,c,i}){
function y(e,r){i("tengu_feature_ok",{feature_name:c(e),...r})}
function m(e,r,u){i("tengu_feature_bad",{...u,feature_name:c(e),error_code:Ipe(r)})}
async function Mr(e,r,u){try{let o=await r();return y(e),o}catch(o){throw m(e,u?.(o)??"error"),o}}
return {Mr,m,y};
}
function make_chunk_v350ypgv({E,Ie}){
var qe=E(function(Xt,je){var W=Ie("constants"),ht=process.cwd,oe=null,pt=process.env.GRACEFUL_FS_PLATFORM||"darwin";process.cwd=function(){if(!oe)oe=ht.call(process);return oe};try{process.cwd()}catch(e){}if(typeof process.chdir==="function"){if(ue=process.chdir,process.chdir=function(e){oe=null,ue.call(process,e)},Object.setPrototypeOf)Object.setPrototypeOf(process.chdir,ue)}var ue;je.exports=mt;function mt(e){if(W.hasOwnProperty("O_SYMLINK")&&process.version.match(/^v0\.6\.[0-2]|^v0\.5\./))r(e);if(!e.lutimes)n(e);if(e.chown=c(e.chown),e.fchown=c(e.fchown),e.lchown=c(e.lchown),e.chmod=i(e.chmod),e.fchmod=i(e.fchmod),e.lchmod=i(e.lchmod),e.chownSync=p(e.chownSync),e.fchownSync=p(e.fchownSync),e.lchownSync=p(e.lchownSync),e.chmodSync=u(e.chmodSync),e.fchmodSync=u(e.fchmodSync),e.lchmodSync=u(e.lchmodSync),e.stat=y(e.stat),e.fstat=y(e.fstat),e.lstat=y(e.lstat),e.statSync=x(e.statSync),e.fstatSync=x(e.fstatSync),e.lstatSync=x(e.lstatSync),e.chmod&&!e.lchmod)e.lchmod=function(o,m,f){if(f)process.nextTick(f)},e.lchmodSync=function(){};if(e.chown&&!e.lchown)e.lchown=function(o,m,f,a){if(a)process.nextTick(a)},e.lchownSync=function(){};if(pt==="win32")e.rename=typeof e.rename!=="function"?e.rename:function(o){function m(f,a,h){var g=Date.now(),_=0;o(f,a,function k(j){if(j&&(j.code==="EACCES"||j.code==="EPERM"||j.code==="EBUSY")&&Date.now()-g<60000){if(setTimeout(function(){e.stat(a,function(G,Z){if(G&&G.code==="ENOENT")o(f,a,k);else h(j)})},_),_<100)_+=10;return}if(h)h(j)})}if(Object.setPrototypeOf)Object.setPrototypeOf(m,o);return m}(e.rename);e.read=typeof e.read!=="function"?e.read:function(o){function m(f,a,h,g,_,k){var j;if(k&&typeof k==="function"){var G=0;j=function(Z,Ce,Ge){if(Z&&Z.code==="EAGAIN"&&G<10)return G++,o.call(e,f,a,h,g,_,j);k.apply(this,arguments)}}return o.call(e,f,a,h,g,_,j)}if(Object.setPrototypeOf)Object.setPrototypeOf(m,o);return m}(e.read),e.readSync=typeof e.readSync!=="function"?e.readSync:function(o){return function(m,f,a,h,g){var _=0;while(!0)try{return o.call(e,m,f,a,h,g)}catch(k){if(k.code==="EAGAIN"&&_<10){_++;continue}throw k}}}(e.readSync);function r(o){o.lchmod=function(m,f,a){o.open(m,W.O_WRONLY|W.O_SYMLINK,f,function(h,g){if(h){if(a)a(h);return}o.fchmod(g,f,function(_){o.close(g,function(k){if(a)a(_||k)})})})},o.lchmodSync=function(m,f){var a=o.openSync(m,W.O_WRONLY|W.O_SYMLINK,f),h=!0,g;try{g=o.fchmodSync(a,f),h=!1}finally{if(h)try{o.closeSync(a)}catch(_){}else o.closeSync(a)}return g}}function n(o){if(W.hasOwnProperty("O_SYMLINK")&&o.futimes)o.lutimes=function(m,f,a,h){o.open(m,W.O_SYMLINK,function(g,_){if(g){if(h)h(g);return}o.futimes(_,f,a,function(k){o.close(_,function(j){if(h)h(k||j)})})})},o.lutimesSync=function(m,f,a){var h=o.openSync(m,W.O_SYMLINK),g,_=!0;try{g=o.futimesSync(h,f,a),_=!1}finally{if(_)try{o.closeSync(h)}catch(k){}else o.closeSync(h)}return g};else if(o.futimes)o.lutimes=function(m,f,a,h){if(h)process.nextTick(h)},o.lutimesSync=function(){}}function i(o){if(!o)return o;return function(m,f,a){return o.call(e,m,f,function(h){if(F(h))h=null;if(a)a.apply(this,arguments)})}}function u(o){if(!o)return o;return function(m,f){try{return o.call(e,m,f)}catch(a){if(!F(a))throw a}}}function c(o){if(!o)return o;return function(m,f,a,h){return o.call(e,m,f,a,function(g){if(F(g))g=null;if(h)h.apply(this,arguments)})}}function p(o){if(!o)return o;return function(m,f,a){try{return o.call(e,m,f,a)}catch(h){if(!F(h))throw h}}}function y(o){if(!o)return o;return function(m,f,a){if(typeof f==="function")a=f,f=null;function h(g,_){if(_){if(_.uid<0)_.uid+=4294967296;if(_.gid<0)_.gid+=4294967296}if(a)a.apply(this,arguments)}return f?o.call(e,m,f,h):o.call(e,m,h)}}function x(o){if(!o)return o;return function(m,f){var a=f?o.call(e,m,f):o.call(e,m);if(a){if(a.uid<0)a.uid+=4294967296;if(a.gid<0)a.gid+=4294967296}return a}}function F(o){if(!o)return!0;if(o.code==="ENOSYS")return!0;var m=!process.getuid||process.getuid()!==0;if(m){if(o.code==="EINVAL"||o.code==="EPERM")return!0}return!1}}});
var $e=E(function(Jt,Ae){var Ue=Ie("stream").Stream;Ae.exports=yt;function yt(e){return{ReadStream:r,WriteStream:n};function r(i,u){if(!(this instanceof r))return new r(i,u);Ue.call(this);var c=this;this.path=i,this.fd=null,this.readable=!0,this.paused=!1,this.flags="r",this.mode=438,this.bufferSize=65536,u=u||{};var p=Object.keys(u);for(var y=0,x=p.length;y<x;y++){var F=p[y];this[F]=u[F]}if(this.encoding)this.setEncoding(this.encoding);if(this.start!==void 0){if(typeof this.start!=="number")throw TypeError("start must be a Number");if(this.end===void 0)this.end=1/0;else if(typeof this.end!=="number")throw TypeError("end must be a Number");if(this.start>this.end)throw Error("start must be <= end");this.pos=this.start}if(this.fd!==null){process.nextTick(function(){c._read()});return}e.open(this.path,this.flags,this.mode,function(o,m){if(o){c.emit("error",o),c.readable=!1;return}c.fd=m,c.emit("open",m),c._read()})}function n(i,u){if(!(this instanceof n))return new n(i,u);Ue.call(this),this.path=i,this.fd=null,this.writable=!0,this.flags="w",this.encoding="binary",this.mode=438,this.bytesWritten=0,u=u||{};var c=Object.keys(u);for(var p=0,y=c.length;p<y;p++){var x=c[p];this[x]=u[x]}if(this.start!==void 0){if(typeof this.start!=="number")throw TypeError("start must be a Number");if(this.start<0)throw Error("start must be >= zero");this.pos=this.start}if(this.busy=!1,this._queue=[],this.fd===null)this._open=e.open,this._queue.push([this._open,this.path,this.flags,this.mode,void 0]),this.flush()}}});
var Ye=E(function(Zt,We){We.exports=vt;var dt=Object.getPrototypeOf||function(e){return e.__proto__};function vt(e){if(e===null||typeof e!=="object")return e;if(e instanceof Object)var r={__proto__:dt(e)};else var r=Object.create(null);return Object.getOwnPropertyNames(e).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(e,n))}),r}});
var ge=E(function(er,we){var L=Ie("fs"),St=qe(),_t=$e(),wt=Ye(),ce=Ie("util"),C,fe;if(typeof Symbol==="function"&&typeof Symbol.for==="function")C=Symbol.for("graceful-fs.queue"),fe=Symbol.for("graceful-fs.previous");else C="___graceful-fs.queue",fe="___graceful-fs.previous";function gt(){}function Qe(e,r){Object.defineProperty(e,C,{get:function(){return r}})}var Q=gt;if(ce.debuglog)Q=ce.debuglog("gfs4");else if(/\bgfs4\b/i.test(process.env.NODE_DEBUG||""))Q=function(){var e=ce.format.apply(ce,arguments);e="GFS4: "+e.split(/\n/).join(`
GFS4: `),console.error(e)};if(!L[C]){if(ve=global[C]||[],Qe(L,ve),L.close=function(e){function r(n,i){return e.call(L,n,function(u){if(!u)Ke();if(typeof i==="function")i.apply(this,arguments)})}return Object.defineProperty(r,fe,{value:e}),r}(L.close),L.closeSync=function(e){function r(n){e.apply(L,arguments),Ke()}return Object.defineProperty(r,fe,{value:e}),r}(L.closeSync),/\bgfs4\b/i.test(process.env.NODE_DEBUG||""))process.on("exit",function(){Q(L[C]),Ie("assert").equal(L[C].length,0)})}var ve;if(!global[C])Qe(global,L[C]);we.exports=Se(wt(L));if(process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH&&!L.__patched)we.exports=Se(L),L.__patched=!0;function Se(e){St(e),e.gracefulify=Se,e.createReadStream=Ce,e.createWriteStream=Ge;var r=e.readFile;e.readFile=n;function n(s,S,d){if(typeof S==="function")d=S,S=null;return P(s,S,d);function P(R,N,I,b){return r(R,N,function(w){if(w&&(w.code==="EMFILE"||w.code==="ENFILE"))V([P,[R,N,I],w,b||Date.now(),Date.now()]);else if(typeof I==="function")I.apply(this,arguments)})}}var i=e.writeFile;e.writeFile=u;function u(s,S,d,P){if(typeof d==="function")P=d,d=null;return R(s,S,d,P);function R(N,I,b,w,M){return i(N,I,b,function(O){if(O&&(O.code==="EMFILE"||O.code==="ENFILE"))V([R,[N,I,b,w],O,M||Date.now(),Date.now()]);else if(typeof w==="function")w.apply(this,arguments)})}}var c=e.appendFile;if(c)e.appendFile=p;function p(s,S,d,P){if(typeof d==="function")P=d,d=null;return R(s,S,d,P);function R(N,I,b,w,M){return c(N,I,b,function(O){if(O&&(O.code==="EMFILE"||O.code==="ENFILE"))V([R,[N,I,b,w],O,M||Date.now(),Date.now()]);else if(typeof w==="function")w.apply(this,arguments)})}}var y=e.copyFile;if(y)e.copyFile=x;function x(s,S,d,P){if(typeof d==="function")P=d,d=0;return R(s,S,d,P);function R(N,I,b,w,M){return y(N,I,b,function(O){if(O&&(O.code==="EMFILE"||O.code==="ENFILE"))V([R,[N,I,b,w],O,M||Date.now(),Date.now()]);else if(typeof w==="function")w.apply(this,arguments)})}}var F=e.readdir;e.readdir=m;var o=/^v[0-5]\./;function m(s,S,d){if(typeof S==="function")d=S,S=null;var P=o.test(process.version)?function(I,b,w,M){return F(I,R(I,b,w,M))}:function(I,b,w,M){return F(I,b,R(I,b,w,M))};return P(s,S,d);function R(N,I,b,w){return function(M,O){if(M&&(M.code==="EMFILE"||M.code==="ENFILE"))V([P,[N,I,b],M,w||Date.now(),Date.now()]);else{if(O&&O.sort)O.sort();if(typeof b==="function")b.call(this,M,O)}}}}if(process.version.substr(0,4)==="v0.8"){var f=_t(e);k=f.ReadStream,G=f.WriteStream}var a=e.ReadStream;if(a)k.prototype=Object.create(a.prototype),k.prototype.open=j;var h=e.WriteStream;if(h)G.prototype=Object.create(h.prototype),G.prototype.open=Z;Object.defineProperty(e,"ReadStream",{get:function(){return k},set:function(s){k=s},enumerable:!0,configurable:!0}),Object.defineProperty(e,"WriteStream",{get:function(){return G},set:function(s){G=s},enumerable:!0,configurable:!0});var g=k;Object.defineProperty(e,"FileReadStream",{get:function(){return g},set:function(s){g=s},enumerable:!0,configurable:!0});var _=G;Object.defineProperty(e,"FileWriteStream",{get:function(){return _},set:function(s){_=s},enumerable:!0,configurable:!0});function k(s,S){if(this instanceof k)return a.apply(this,arguments),this;else return k.apply(Object.create(k.prototype),arguments)}function j(){var s=this;de(s.path,s.flags,s.mode,function(S,d){if(S){if(s.autoClose)s.destroy();s.emit("error",S)}else s.fd=d,s.emit("open",d),s.read()})}function G(s,S){if(this instanceof G)return h.apply(this,arguments),this;else return G.apply(Object.create(G.prototype),arguments)}function Z(){var s=this;de(s.path,s.flags,s.mode,function(S,d){if(S)s.destroy(),s.emit("error",S);else s.fd=d,s.emit("open",d)})}function Ce(s,S){return new e.ReadStream(s,S)}function Ge(s,S){return new e.WriteStream(s,S)}var st=e.open;e.open=de;function de(s,S,d,P){if(typeof d==="function")P=d,d=null;return R(s,S,d,P);function R(N,I,b,w,M){return st(N,I,b,function(O,Vt){if(O&&(O.code==="EMFILE"||O.code==="ENFILE"))V([R,[N,I,b,w],O,M||Date.now(),Date.now()]);else if(typeof w==="function")w.apply(this,arguments)})}}return e}function V(e){Q("ENQUEUE",e[0].name,e[1]),L[C].push(e),_e()}var ae;function Ke(){var e=Date.now();for(var r=0;r<L[C].length;++r)if(L[C][r].length>2)L[C][r][3]=e,L[C][r][4]=e;_e()}function _e(){if(clearTimeout(ae),ae=void 0,L[C].length===0)return;var e=L[C].shift(),r=e[0],n=e[1],i=e[2],u=e[3],c=e[4];if(u===void 0)Q("RETRY",r.name,n),r.apply(null,n);else if(Date.now()-u>=60000){Q("TIMEOUT",r.name,n);var p=n.pop();if(typeof p==="function")p.call(null,i)}else{var y=Date.now()-c,x=Math.max(c-u,1),F=Math.min(x*1.2,100);if(y>=F)Q("RETRY",r.name,n),r.apply(null,n.concat([u]));else L[C].push(e)}if(ae===void 0)ae=setTimeout(_e,0)}});
var ze=E(function(tr,Be){function q(e,r){if(typeof r==="boolean")r={forever:r};if(this._originalTimeouts=JSON.parse(JSON.stringify(e)),this._timeouts=e,this._options=r||{},this._maxRetryTime=r&&r.maxRetryTime||1/0,this._fn=null,this._errors=[],this._attempts=1,this._operationTimeout=null,this._operationTimeoutCb=null,this._timeout=null,this._operationStart=null,this._options.forever)this._cachedTimeouts=this._timeouts.slice(0)}Be.exports=q;q.prototype.reset=function(){this._attempts=1,this._timeouts=this._originalTimeouts};q.prototype.stop=function(){if(this._timeout)clearTimeout(this._timeout);this._timeouts=[],this._cachedTimeouts=null};q.prototype.retry=function(e){if(this._timeout)clearTimeout(this._timeout);if(!e)return!1;var r=new Date().getTime();if(e&&r-this._operationStart>=this._maxRetryTime)return this._errors.unshift(Error("RetryOperation timeout occurred")),!1;this._errors.push(e);var n=this._timeouts.shift();if(n===void 0)if(this._cachedTimeouts)this._errors.splice(this._errors.length-1,this._errors.length),this._timeouts=this._cachedTimeouts.slice(0),n=this._timeouts.shift();else return!1;var i=this,u=setTimeout(function(){if(i._attempts++,i._operationTimeoutCb){if(i._timeout=setTimeout(function(){i._operationTimeoutCb(i._attempts)},i._operationTimeout),i._options.unref)i._timeout.unref()}i._fn(i._attempts)},n);if(this._options.unref)u.unref();return!0};q.prototype.attempt=function(e,r){if(this._fn=e,r){if(r.timeout)this._operationTimeout=r.timeout;if(r.cb)this._operationTimeoutCb=r.cb}var n=this;if(this._operationTimeoutCb)this._timeout=setTimeout(function(){n._operationTimeoutCb()},n._operationTimeout);this._operationStart=new Date().getTime(),this._fn(this._attempts)};q.prototype.try=function(e){console.log("Using RetryOperation.try() is deprecated"),this.attempt(e)};q.prototype.start=function(e){console.log("Using RetryOperation.start() is deprecated"),this.attempt(e)};q.prototype.start=q.prototype.try;q.prototype.errors=function(){return this._errors};q.prototype.attempts=function(){return this._attempts};q.prototype.mainError=function(){if(this._errors.length===0)return null;var e={},r=null,n=0;for(var i=0;i<this._errors.length;i++){var u=this._errors[i],c=u.message,p=(e[c]||0)+1;if(e[c]=p,p>=n)r=u,n=p}return r}});
var Ve=E(function(Oe){var Ot=ze();Oe.operation=function(e){var r=Oe.timeouts(e);return new Ot(r,{forever:e&&e.forever,unref:e&&e.unref,maxRetryTime:e&&e.maxRetryTime})};Oe.timeouts=function(e){if(e instanceof Array)return[].concat(e);var r={retries:10,factor:2,minTimeout:1000,maxTimeout:1/0,randomize:!1};for(var n in e)r[n]=e[n];if(r.minTimeout>r.maxTimeout)throw Error("minTimeout is greater than maxTimeout");var i=[];for(var u=0;u<r.retries;u++)i.push(this.createTimeout(u,r));if(e&&e.forever&&!i.length)i.push(this.createTimeout(u,r));return i.sort(function(c,p){return c-p}),i};Oe.createTimeout=function(e,r){var n=r.randomize?Math.random()+1:1,i=Math.round(n*r.minTimeout*Math.pow(r.factor,e));return i=Math.min(i,r.maxTimeout),i};Oe.wrap=function(e,r,n){if(r instanceof Array)n=r,r=null;if(!n){n=[];for(var i in e)if(typeof e[i]==="function")n.push(i)}for(var u=0;u<n.length;u++){var c=n[u],p=e[c];e[c]=function(x){var F=Oe.operation(r),o=Array.prototype.slice.call(arguments,1),m=o.pop();o.push(function(f){if(F.retry(f))return;if(f)arguments[0]=F.mainError();m.apply(this,arguments)}),F.attempt(function(){x.apply(e,o)})}.bind(e,p),e[c].options=r}}});
var Xe=E(function(nr,Ee){Ee.exports=["SIGABRT","SIGALRM","SIGHUP","SIGINT","SIGTERM"];Ee.exports.push("SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT")});
var Je=E(function(ir,J){var T=global.process,B=function(e){return e&&typeof e==="object"&&typeof e.removeListener==="function"&&typeof e.emit==="function"&&typeof e.reallyExit==="function"&&typeof e.listeners==="function"&&typeof e.kill==="function"&&typeof e.pid==="number"&&typeof e.on==="function"};if(!B(T))J.exports=function(){return function(){}};else{if(Te=Ie("assert"),z=Xe(),xe=/^win/i.test(T.platform),X=Ie("events"),typeof X!=="function")X=X.EventEmitter;if(T.__signal_exit_emitter__)D=T.__signal_exit_emitter__;else D=T.__signal_exit_emitter__=new X,D.count=0,D.emitted={};if(!D.infinite)D.setMaxListeners(1/0),D.infinite=!0;J.exports=function(e,r){if(!B(global.process))return function(){};if(Te.equal(typeof e,"function","a callback must be provided for exit handler"),H===!1)le();var n="exit";if(r&&r.alwaysLast)n="afterexit";var i=function(){if(D.removeListener(n,e),D.listeners("exit").length===0&&D.listeners("afterexit").length===0)ee()};return D.on(n,e),i},ee=function(){if(!H||!B(global.process))return;H=!1,z.forEach(function(r){try{T.removeListener(r,te[r])}catch(n){}}),T.emit=re,T.reallyExit=se,D.count-=1},J.exports.unload=ee,Y=function(r,n,i){if(D.emitted[r])return;D.emitted[r]=!0,D.emit(r,n,i)},te={},z.forEach(function(e){te[e]=function(){if(!B(global.process))return;var n=T.listeners(e);if(n.length===D.count){if(ee(),Y("exit",null,e),Y("afterexit",null,e),xe&&e==="SIGHUP")e="SIGINT";T.kill(T.pid,e)}}}),J.exports.signals=function(){return z},H=!1,le=function(){if(H||!B(global.process))return;H=!0,D.count+=1,z=z.filter(function(r){try{return T.on(r,te[r]),!0}catch(n){return!1}}),T.emit=Le,T.reallyExit=ke},J.exports.load=le,se=T.reallyExit,ke=function(r){if(!B(global.process))return;T.exitCode=r||0,Y("exit",T.exitCode,null),Y("afterexit",T.exitCode,null),se.call(T,T.exitCode)},re=T.emit,Le=function(r,n){if(r==="exit"&&B(global.process)){if(n!==void 0)T.exitCode=n;var i=re.apply(this,arguments);return Y("exit",T.exitCode,null),Y("afterexit",T.exitCode,null),i}else return re.apply(this,arguments)}}var Te,z,xe,X,D,ee,Y,te,H,le,se,ke,re,Le});
var Ze=E(function(Lt,Fe){var be=Symbol();function kt(e,r,n){let i=r[be];if(i)return r.stat(e,(c,p)=>{if(c)return n(c);n(null,p.mtime,i)});let u=new Date(Math.ceil(Date.now()/1000)*1000+5);r.utimes(e,u,u,(c)=>{if(c)return n(c);r.stat(e,(p,y)=>{if(p)return n(p);let x=y.mtime.getTime()%1000===0?"s":"ms";if(!(be in r))try{Object.defineProperty(r,be,{value:x,configurable:!0})}catch{}n(null,y.mtime,x)})})}function It(e){let r=Date.now();if(e==="s")r=Math.ceil(r/1000)*1000;return new Date(r)}Lt.probe=kt;Lt.getMtime=It});
var ot=E(function(Mt,ie){var et=Ie("path"),Pe=ge(),tt=Ve(),Dt=Je(),pe=Ze(),A={};function ne(e,r){return r.lockfilePath||`${e}.lock`}function Re(e,r,n){if(!r.realpath)return n(null,et.resolve(e));r.fs.realpath(e,n)}function Ne(e,r,n){let i=ne(e,r);r.fs.mkdir(i,(u)=>{if(!u)return pe.probe(i,r.fs,(c,p,y)=>{if(c)return r.fs.rmdir(i,()=>{}),n(c);n(null,p,y)});if(u.code!=="EEXIST")return n(u);if(r.stale<=0)return n(Object.assign(Error("Lock file is already being held"),{code:"ELOCKED",file:e}));r.fs.stat(i,(c,p)=>{if(c){if(c.code==="ENOENT")return Ne(e,{...r,stale:0},n);return n(c)}if(!rt(p,r))return n(Object.assign(Error("Lock file is already being held"),{code:"ELOCKED",file:e}));nt(e,r,(y)=>{if(y)return n(y);Ne(e,{...r,stale:0},n)})})})}function rt(e,r){return e.mtime.getTime()<Date.now()-r.stale}function nt(e,r,n){r.fs.rmdir(ne(e,r),(i)=>{if(i&&i.code!=="ENOENT")return n(i);n()})}function he(e,r){let n=A[e];if(n.updateTimeout)return;if(n.updateDelay=n.updateDelay||r.update,n.updateTimeout=setTimeout(()=>{n.updateTimeout=null,r.fs.stat(n.lockfilePath,(i,u)=>{let c=n.lastUpdate+r.stale<Date.now();if(i){if(i.code==="ENOENT"||c)return De(e,n,Object.assign(i,{code:"ECOMPROMISED"}));return n.updateDelay=1000,he(e,r)}if(n.mtime.getTime()!==u.mtime.getTime())return De(e,n,Object.assign(Error("Unable to update lock within the stale threshold"),{code:"ECOMPROMISED"}));let y=pe.getMtime(n.mtimePrecision);r.fs.utimes(n.lockfilePath,y,y,(x)=>{let F=n.lastUpdate+r.stale<Date.now();if(n.released)return;if(x){if(x.code==="ENOENT"||F)return De(e,n,Object.assign(x,{code:"ECOMPROMISED"}));return n.updateDelay=1000,he(e,r)}n.mtime=y,n.lastUpdate=Date.now(),n.updateDelay=null,he(e,r)})})},n.updateDelay),n.updateTimeout.unref)n.updateTimeout.unref()}function De(e,r,n){if(r.released=!0,r.updateTimeout)clearTimeout(r.updateTimeout);if(A[e]===r)delete A[e];r.options.onCompromised(n)}function Nt(e,r,n){r={stale:1e4,update:null,realpath:!0,retries:0,fs:Pe,onCompromised:(i)=>{throw i},...r},r.retries=r.retries||0,r.retries=typeof r.retries==="number"?{retries:r.retries}:r.retries,r.stale=Math.max(r.stale||0,2000),r.update=r.update==null?r.stale/2:r.update||0,r.update=Math.max(Math.min(r.update,r.stale/2),1000),Re(e,r,(i,u)=>{if(i)return n(i);let c=tt.operation(r.retries);c.attempt(()=>{Ne(u,r,(p,y,x)=>{if(c.retry(p))return;if(p)return n(c.mainError());let F=A[u]={lockfilePath:ne(u,r),mtime:y,mtimePrecision:x,options:r,lastUpdate:Date.now()};he(u,r),n(null,(o)=>{if(F.released)return o&&o(Object.assign(Error("Lock is already released"),{code:"ERELEASED"}));it(u,{...r,realpath:!1},o)})})})})}function it(e,r,n){r={fs:Pe,realpath:!0,...r},Re(e,r,(i,u)=>{if(i)return n(i);let c=A[u];if(!c)return n(Object.assign(Error("Lock is not acquired/owned by you"),{code:"ENOTACQUIRED"}));c.updateTimeout&&clearTimeout(c.updateTimeout),c.released=!0,delete A[u],nt(u,r,n)})}function Pt(e,r,n){r={stale:1e4,realpath:!0,fs:Pe,...r},r.stale=Math.max(r.stale||0,2000),Re(e,r,(i,u)=>{if(i)return n(i);r.fs.stat(ne(u,r),(c,p)=>{if(c)return c.code==="ENOENT"?n(null,!1):n(c);return n(null,!rt(p,r))})})}function Rt(){return A}Dt(()=>{for(let e in A){let r=A[e].options;try{r.fs.rmdirSync(ne(e,r))}catch(n){}}});Mt.lock=Nt;Mt.unlock=it;Mt.check=Pt;Mt.getLocks=Rt});
var ct=E(function(or,ut){var Ut=ge();function At(e){let r=["mkdir","realpath","stat","rmdir","utimes"],n={...e};return r.forEach((i)=>{n[i]=(...u)=>{let c=u.pop(),p;try{p=e[`${i}Sync`](...u)}catch(y){return c(y)}c(null,p)}}),n}function $t(e){return(...r)=>new Promise((n,i)=>{r.push((u,c)=>{if(u)i(u);else n(c)}),e(...r)})}function Wt(e){return(...r)=>{let n,i;if(r.push((u,c)=>{n=u,i=c}),e(...r),n)throw n;return i}}function Yt(e){if(e={...e},e.fs=At(e.fs||Ut),typeof e.retries==="number"&&e.retries>0||e.retries&&typeof e.retries.retries==="number"&&e.retries.retries>0)throw Object.assign(Error("Cannot use retries with the sync api"),{code:"ESYNC"});return e}ut.exports={toPromise:$t,toSync:Wt,toSyncOptions:Yt}});
var ft=E(function(ur,K){var U=ot(),{toPromise:me,toSync:ye,toSyncOptions:Me}=ct();async function at(e,r){let n=await me(U.lock)(e,r);return me(n)}function Kt(e,r){let n=ye(U.lock)(e,Me(r));return ye(n)}function Qt(e,r){return me(U.unlock)(e,r)}function Bt(e,r){return ye(U.unlock)(e,Me(r))}function zt(e,r){return me(U.check)(e,r)}function Ht(e,r){return ye(U.check)(e,Me(r))}K.exports=at;K.exports.lock=at;K.exports.unlock=Qt;K.exports.lockSync=Kt;K.exports.unlockSync=Bt;K.exports.check=zt;K.exports.checkSync=Ht});
function lt(){return ft()}
async function Qi(e,r){let n=await lt().lock(e,r);return Object.assign(n,{[Symbol.asyncDispose]:n})}
return {Qi};
}
function make_chunk_zebstnyx({E}){
function nn(e){return E("sha256").update(e).digest("hex")}
return {nn};
}
function make_chunk_jzbeanqj({$Xn,B,Dt,FXn,JUe,LXe,Ln,Mr,NXe,NXn,P6o,Qi,R6o,Sht,T6o,WJ,Xxe,YUe,Z,a,bn,c,d,ee,fe,he,i,id,j,k6o,kb,l,le,m,nSn,nn,nt,q,t,ue,us,x6o,y,z2t}){
var cv="0.127.0";
function G(){if(typeof Deno<"u"&&Deno.build!=null)return"deno";if(typeof EdgeRuntime<"u")return"edge";if(Object.prototype.toString.call(typeof globalThis.process<"u"?globalThis.process:0)==="[object process]")return"node";return"unknown"}
var Q=()=>{let e=G();if(e==="deno")return{"X-Stainless-Lang":"js","X-Stainless-Package-Version":cv,"X-Stainless-OS":D(Deno.build.os),"X-Stainless-Arch":F(Deno.build.arch),"X-Stainless-Runtime":"deno","X-Stainless-Runtime-Version":typeof Deno.version==="string"?Deno.version:Deno.version?.deno??"unknown"};if(typeof EdgeRuntime<"u")return{"X-Stainless-Lang":"js","X-Stainless-Package-Version":cv,"X-Stainless-OS":"Unknown","X-Stainless-Arch":`other:${EdgeRuntime}`,"X-Stainless-Runtime":"edge","X-Stainless-Runtime-Version":globalThis.process?.version??"unknown"};if(e==="node")return{"X-Stainless-Lang":"js","X-Stainless-Package-Version":cv,"X-Stainless-OS":D(globalThis.process.platform??"unknown"),"X-Stainless-Arch":F(globalThis.process.arch??"unknown"),"X-Stainless-Runtime":"node","X-Stainless-Runtime-Version":globalThis.process.version??"unknown"};let n=te();if(n)return{"X-Stainless-Lang":"js","X-Stainless-Package-Version":cv,"X-Stainless-OS":"Unknown","X-Stainless-Arch":"unknown","X-Stainless-Runtime":`browser:${n.browser}`,"X-Stainless-Runtime-Version":n.version};return{"X-Stainless-Lang":"js","X-Stainless-Package-Version":cv,"X-Stainless-OS":"Unknown","X-Stainless-Arch":"unknown","X-Stainless-Runtime":"unknown","X-Stainless-Runtime-Version":"unknown"}};
function te(){if(typeof navigator>"u"||!navigator)return null;let e=[{key:"edge",pattern:/Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/},{key:"ie",pattern:/MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/},{key:"ie",pattern:/Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/},{key:"chrome",pattern:/Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/},{key:"firefox",pattern:/Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/},{key:"safari",pattern:/(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/}];for(let{key:n,pattern:s}of e){let r=s.exec(navigator.userAgent);if(r){let o=r[1]||0,u=r[2]||0,f=r[3]||0;return{browser:n,version:`${o}.${u}.${f}`}}}return null}
var F=(e)=>{if(e==="x32")return"x32";if(e==="x86_64"||e==="x64")return"x64";if(e==="arm")return"arm";if(e==="aarch64"||e==="arm64")return"arm64";if(e)return`other:${e}`;return"unknown"};
var D=(e)=>{if(e=e.toLowerCase(),e.includes("ios"))return"iOS";if(e==="android")return"Android";if(e==="darwin")return"MacOS";if(e==="win32")return"Windows";if(e==="freebsd")return"FreeBSD";if(e==="openbsd")return"OpenBSD";if(e==="linux")return"Linux";if(e)return`Other:${e}`;return"Unknown"};
var x;
var Xmn=()=>x??(x=Q());
var oh=(e)=>{if(typeof globalThis.process<"u")return globalThis.process.env?.[e]?.trim()||void 0;if(typeof globalThis.Deno<"u")return globalThis.Deno.env?.get?.(e)?.trim()||void 0;return};
var x1t="1.0";
var ne=/^[A-Za-z0-9_.-]+$/;
function b(e){if(!e)throw Error("profile name is empty");if(e==="."||e==="..")throw Error(`profile name "${e}" is not allowed`);if(e.includes("/")||e.includes("\\"))throw Error(`profile name "${e}" must not contain path separators`);if(!ne.test(e))throw Error(`profile name "${e}" contains disallowed characters (allowed: letters, digits, '_', '.', '-')`)}
var H=async(e)=>(await O(e))?.config??null;
var O=async(e)=>{var n,s;let r=await C();if(r===null)return null;let o=e??await L();if(o===null)return null;b(o);let{fs:u,path:f}=await import("./nativeIO.js"),p=f.join(r,"configs",`${o}.json`),w;try{w=await u.promises.readFile(p,"utf-8")}catch(E){if(E?.code!=="ENOENT")throw Error(`failed to read config file ${p}: ${E}`);w=null}if(w===null){let E=oh("ANTHROPIC_ORGANIZATION_ID"),T=oh("ANTHROPIC_IDENTITY_TOKEN_FILE"),I=oh("ANTHROPIC_FEDERATION_RULE_ID");if(I&&E)return{fromFile:!1,config:{organization_id:E,workspace_id:oh("ANTHROPIC_WORKSPACE_ID"),base_url:oh("ANTHROPIC_BASE_URL"),authentication:{type:"oidc_federation",federation_rule_id:I,service_account_id:oh("ANTHROPIC_SERVICE_ACCOUNT_ID"),identity_token:T?{source:"file",path:T}:void 0,scope:oh("ANTHROPIC_SCOPE")}}};return null}let h;try{h=JSON.parse(w)}catch(E){throw Error(`failed to parse config file ${p}: ${E}`)}if(!h.authentication)throw Error(`config file ${p} is missing "authentication"`);let _=h.authentication.type;if(_!=="oidc_federation"&&_!=="user_oauth")throw Error(`authentication.type "${_}" is not a known authentication type`);if(h.organization_id??(h.organization_id=oh("ANTHROPIC_ORGANIZATION_ID")),h.workspace_id??(h.workspace_id=oh("ANTHROPIC_WORKSPACE_ID")),h.base_url??(h.base_url=oh("ANTHROPIC_BASE_URL")),(n=h.authentication).scope??(n.scope=oh("ANTHROPIC_SCOPE")),h.authentication.type==="oidc_federation"){if(!h.authentication.identity_token){let E=oh("ANTHROPIC_IDENTITY_TOKEN_FILE");if(E)h.authentication.identity_token={source:"file",path:E}}if(!h.authentication.federation_rule_id)h.authentication.federation_rule_id=oh("ANTHROPIC_FEDERATION_RULE_ID")??"";(s=h.authentication).service_account_id??(s.service_account_id=oh("ANTHROPIC_SERVICE_ACCOUNT_ID"))}return{config:h,fromFile:!0}};
var S=async(e,n)=>{if(e?.authentication.credentials_path)return e.authentication.credentials_path;let s=await C();if(!s)return null;let r=n??await L();if(!r)return null;b(r);let{path:o}=await import("./nativeIO.js");return o.join(s,"credentials",`${r}.json`)};
var C=async()=>{if(!re())return null;let{path:e}=await import("./nativeIO.js"),n=oh("ANTHROPIC_CONFIG_DIR");if(n)return n;if(Xmn()["X-Stainless-OS"]==="Windows"){let u=oh("APPDATA");if(u)return e.join(u,"Anthropic");let f=oh("USERPROFILE");if(f)return e.join(f,"AppData","Roaming","Anthropic");return null}let r=oh("XDG_CONFIG_HOME");if(r)return e.join(r,"anthropic");let o=oh("HOME");if(o)return e.join(o,".config","anthropic");return null};
var re=()=>{let e=Xmn()["X-Stainless-Runtime"];return e==="node"||e==="deno"};
var L=async()=>{let e=await C();if(!e)return null;let n=oh("ANTHROPIC_PROFILE");if(n)return n;let{fs:s,path:r}=await import("./nativeIO.js"),o=r.join(e,"active_config");try{return(await s.promises.readFile(o,"utf-8")).trim()||"default"}catch(u){if(u?.code!=="ENOENT")throw Error(`failed to read ${o}: ${u}`);return"default"}};
function k(){return Math.floor(Date.now()/1000)}
function N(e){if(!e)throw new Ln("Identity token file path is empty");return async()=>{let{fs:n}=await import("./nativeIO.js"),s;try{s=await n.promises.readFile(e,"utf-8")}catch(o){throw new Ln(`Failed to read identity token file at ${e}: ${o}`)}let r=s.trim();if(!r)throw new Ln(`Identity token file at ${e} is empty`);return r}}
function W(e){if(!e)throw new Ln("Identity token value is empty");return()=>e}
function U(e){return async()=>{FXn(e.baseURL);let n=await e.identityTokenProvider();if(n.length>16384)throw new id(`Identity token is ${Math.ceil(n.length/1024)} KiB, exceeds the 16 KiB assertion limit`);let s={grant_type:T6o,assertion:n,federation_rule_id:e.federationRuleId,organization_id:e.organizationId};if(e.serviceAccountId)s.service_account_id=e.serviceAccountId;if(e.workspaceId)s.workspace_id=e.workspaceId;let r=`${e.baseURL}${NXn}`,o;try{o=await e.fetch(r,{method:"POST",headers:{"Content-Type":"application/json","anthropic-beta":`${LXe},${R6o}`,"User-Agent":e.userAgent||`anthropic-sdk-typescript/${cv} oidcFederationProvider`},body:JSON.stringify(s)})}catch(w){throw new id(`Failed to reach token endpoint ${r}: ${w}`)}let u=o.headers.get("Request-Id");if(!o.ok){let w=await o.text().catch(()=>""),h=WJ(w),_="";if(o.status===401)_=` Ensure your federation rule matches your identity token. ${e.workspaceId?"":"If your federation rule is scoped to multiple workspaces, set the ANTHROPIC_WORKSPACE_ID environment variable, the 'workspace_id' config key, or the `workspaceId` option. "}View your authentication events in the Workload identity page of Claude Console for more details.`;throw new id(`Token exchange failed with status ${o.status}${u?` (request-id ${u})`:""}: ${h}${_}`,o.status,h,u)}let f=await $Xn(o,u),p=Number(f.expires_in);if(!Number.isFinite(p))throw new id(`Token endpoint response missing required fields: ${JSON.stringify(WJ(f))}`,o.status,WJ(f),u);return{token:f.access_token,expiresAt:k()+p}}}
function X(e){return async(n)=>{let{fs:s}=await import("./nativeIO.js");await z2t(e.credentialsPath,e.onSafetyWarning);let r;try{r=await s.promises.readFile(e.credentialsPath,"utf-8")}catch(R){throw new id(`Credentials file not found at ${e.credentialsPath}: ${R}`)}let o;try{o=JSON.parse(r)}catch(R){throw new id(`Credentials file at ${e.credentialsPath} is not valid JSON: ${R}`)}let u=o.access_token;if(!u)throw new id(`Credentials file at ${e.credentialsPath} must include 'access_token'`);let f=o.expires_at;if(!n?.forceRefresh&&(f==null||k()<f-NXe))return{token:u,expiresAt:f??null};let p=o.refresh_token;if(!e.clientId||!p)throw new id(`Access token at ${e.credentialsPath} has expired and no refresh is available (client_id ${e.clientId?"set":"empty"}, refresh_token ${p?"set":"empty"})`);FXn(e.baseURL);let w={grant_type:k6o,refresh_token:p,client_id:e.clientId},h=`${e.baseURL}${NXn}`,_;try{_=await e.fetch(h,{method:"POST",headers:{"Content-Type":"application/json","anthropic-beta":LXe,"User-Agent":e.userAgent||`anthropic-sdk-typescript/${cv} userOAuthProvider`},body:JSON.stringify(w)})}catch(R){throw new id(`User OAuth refresh failed to reach token endpoint: ${R}`)}let E=_.headers.get("Request-Id");if(!_.ok){let R=await _.text().catch(()=>"");throw new id(`User OAuth refresh failed (HTTP ${_.status}): ${WJ(R)}`,_.status,WJ(R),E)}let T=await $Xn(_,E),I=Number(T.expires_in);if(!Number.isFinite(I))throw new id(`User OAuth refresh response missing or invalid expires_in: ${JSON.stringify(WJ(T))}`,_.status,WJ(T),E);let v=k()+I,J=T.refresh_token||p;return await Xxe(e.credentialsPath,{...o,version:x1t,type:"oauth_token",access_token:T.access_token,expires_at:v,refresh_token:J}),{token:T.access_token,expiresAt:v}}}
function Gft(e,n){let s=e.authentication.credentials_path??null,r=(e.base_url||n.baseURL).replace(/\/+$/,""),o=ie(e,s,r,n),u={};if(e.workspace_id&&e.authentication.type==="user_oauth")u["anthropic-workspace-id"]=e.workspace_id;return{provider:o,extraHeaders:u,baseURL:e.base_url||void 0}}
function ie(e,n,s,r){switch(e.authentication.type){case"oidc_federation":{let o=e.authentication,u=oe(o);if(!u)throw new id("oidc_federation config requires an identity token (set authentication.identity_token, ANTHROPIC_IDENTITY_TOKEN_FILE, or ANTHROPIC_IDENTITY_TOKEN)");if(!o.federation_rule_id)throw new id("oidc_federation config requires 'federation_rule_id'. Set it in authentication.federation_rule_id in your profile, or via ANTHROPIC_FEDERATION_RULE_ID (profile takes precedence).");if(!e.organization_id)throw new id("oidc_federation config requires organization_id (set ANTHROPIC_ORGANIZATION_ID or config.organization_id)");let f=U({identityTokenProvider:u,federationRuleId:o.federation_rule_id,organizationId:e.organization_id,serviceAccountId:o.service_account_id,workspaceId:e.workspace_id,baseURL:s,fetch:r.fetch,userAgent:r.userAgent});if(n)return se(f,n,r.onCacheWriteError,r.onSafetyWarning);return f}case"user_oauth":{if(!n)throw new id("user_oauth config requires authentication.credentials_path (or load via a profile so it defaults to <config_dir>/credentials/<profile>.json)");return X({credentialsPath:n,clientId:e.authentication.client_id,baseURL:s,fetch:r.fetch,userAgent:r.userAgent,onSafetyWarning:r.onSafetyWarning})}default:{let o=e.authentication.type;throw new id(`authentication.type "${o}" is not a known authentication type`)}}}
function oe(e){if(e.identity_token){let r=e.identity_token.source;if(r!=="file")throw new id(`identity_token.source "${r}" is not supported by this SDK version (only "file")`);if(!e.identity_token.path)throw new id('identity_token.source "file" requires a non-empty path');return N(e.identity_token.path)}let n=oh("ANTHROPIC_IDENTITY_TOKEN_FILE");if(n)return N(n);let s=oh("ANTHROPIC_IDENTITY_TOKEN");if(s)return W(s);return null}
function se(e,n,s,r){return async(o)=>{let{fs:u}=await import("./nativeIO.js");await z2t(n,r);let f;try{let w=await u.promises.readFile(n,"utf-8");f=JSON.parse(w);let h=f?.access_token;if(h&&!o?.forceRefresh){let _=f?.expires_at;if(_==null||k()<_-NXe)return{token:h,expiresAt:_??null}}}catch(w){if(w?.code!=="ENOENT"&&!(w instanceof SyntaxError))s?.(w)}let p=await e(o);try{await Xxe(n,{...f??{},version:x1t,type:"oauth_token",access_token:p.token,expires_at:p.expiresAt})}catch(w){s?.(w)}return p}}
class Wft{constructor(e,n){this.cached=null,this.pendingRefresh=null,this.nextForce=!1,this.lastAdvisoryError=0,this.provider=e,this.onAdvisoryRefreshError=n}async getToken(){let e=this.nextForce;this.nextForce=!1;let n=this.cached;if(e||n==null)return(await this.refresh(e)).token;if(n.expiresAt==null)return n.token;let s=n.expiresAt-k();if(s>x6o)return n.token;if(s>NXe)return this.backgroundRefresh(),n.token;return(await this.refresh()).token}invalidate(){this.cached=null,this.nextForce=!0}refresh(e=!1){if(this.pendingRefresh&&!e)return this.pendingRefresh;return this.doRefresh(e)}backgroundRefresh(){if(this.pendingRefresh)return;if(k()-this.lastAdvisoryError<P6o)return;this.doRefresh().catch((e)=>{this.lastAdvisoryError=k(),this.onAdvisoryRefreshError?.(e)})}doRefresh(e=!1){return this.pendingRefresh=this.provider(e?{forceRefresh:!0}:void 0).then((n)=>(this.cached=n,this.pendingRefresh=null,n),(n)=>{throw this.pendingRefresh=null,n}),this.pendingRefresh}}
var ce={"fail-closed":5,"fail-open":15};
function P(e,n,s){return(r)=>K(n,()=>e(r),s)}
async function K(e,n,s){let r=ce[s],o;try{o=await de(e,r,s)}catch(u){if(s==="fail-closed"||u instanceof id)throw u;return t(`wif: credentials lock unavailable at ${e} (${l(u)}); refreshing without cross-process serialization`),n()}try{return i("tengu_wif_user_oauth_lock_acquired",{mode:c(s)}),await n()}finally{i("tengu_wif_user_oauth_lock_released",{mode:c(s)});try{await o()}catch(u){if(us(u))t(`wif: lock release failed: ${u}`);else d(u)}}}
async function de(e,n,s){for(let r=0;;r++)try{return await Qi(e,{stale:60000,update:5000,onCompromised:(o)=>t(`WIF credentials lock compromised: ${o}`,{level:"error"})})}catch(o){if(o.code!=="ELOCKED")throw o;if(r>=n){i("tengu_wif_user_oauth_lock_retry_limit",{attempt:r,mode:c(s)});let u=new id(`Could not acquire credentials lock at ${e} after ${n} retries`);throw u.cause=Object.assign(Error("credentials lock busy"),{code:"ELOCKED"}),u}i("tengu_wif_user_oauth_lock_retry",{attempt:r,mode:c(s)}),await Z(1000+Math.random()*1000)}}
class z{credentialsPromise=void 0;tokenCachePromise=void 0;resolvedBaseUrlSnapshot=void 0;failedAccessTokens=new Set;reset(){this.credentialsPromise=void 0,this.tokenCachePromise=void 0,this.resolvedBaseUrlSnapshot=void 0,this.failedAccessTokens.clear()}}
var pe=new q(()=>new z);
function A(){return pe.of(j().host)}
var _e=20;
function Qne(){return A().resolvedBaseUrlSnapshot}
function _Re(){return M(A())}
function M(e){if(e.credentialsPromise===void 0)e.credentialsPromise=Mr("wif_credentials_resolve",async()=>{let n=await ke();if(n===null)return e.resolvedBaseUrlSnapshot=null,null;let s=a.ANTHROPIC_BASE_URL||n.base_url,r=s||"https://api.anthropic.com",u=kb()==="env-quad"?await ye(n,r):await S(n),f={...n,base_url:s,...n.authentication.credentials_path||u===null?{}:{authentication:{...n.authentication,credentials_path:u}}},[{getUserAgent:p},{getProxyFetchOptions:w}]=await Promise.all([import("./nativeBindings.js"),import("./nativeBindings.js")]),h=Gft(f,{baseURL:r,fetch:(_,E)=>fetch(_,{...E,...w({forAnthropicAPI:!0,url:String(_)}),signal:AbortSignal.timeout(1e4)}),userAgent:p(),onSafetyWarning:(_)=>t(_,{level:"warn"}),onCacheWriteError:(_)=>t(String(_),{level:"warn"})});if(u)switch(n.authentication.type){case"user_oauth":h.provider=P(V(we(h.provider,u),u,"after-recorded-401",e.failedAccessTokens),fe(u),"fail-closed");break;case"oidc_federation":{let _=JUe();if(_===null)break;await B(_,{recursive:!0,mode:448}).catch((E)=>t(`wif: cannot create ${_} (${l(E)}); the credentials lock may be unavailable`,{level:"warn"})),h.provider=P(V(h.provider,u,"always",e.failedAccessTokens),_,"fail-open");break}}return e.resolvedBaseUrlSnapshot=h.baseURL??null,h}).catch((n)=>{throw t(`WIF credential resolution failed: ${l(n)}`,{level:"error"}),n instanceof id?n:new id(l(n))});return e.credentialsPromise}
async function PBr(e){let n=A(),s=await Y(n).catch(()=>null);if(s===null)return;if(e){if(n.failedAccessTokens.add(e),n.failedAccessTokens.size>_e)for(let r of n.failedAccessTokens){n.failedAccessTokens.delete(r);break}}s.invalidate()}
function bde(){return Y(A())}
function Y(e){return e.tokenCachePromise??=M(e).then((n)=>{if(n===null)return null;return new Wft(async(r)=>{try{let o=await n.provider(r);return y("wif_token_exchange"),o}catch(o){let u=o instanceof id?o:new id(o instanceof Error?o.message:String(o),null);if(u!==o)u.cause=o;throw m("wif_token_exchange",Ee(u)),u}},(r)=>t(String(r),{level:"warn"}))}),e.tokenCachePromise}
function V(e,n,s,r){return async(o)=>{if(!o?.forceRefresh)return e(o);if(s==="always"||r.size>0)try{await z2t(n,(h)=>t(h,{level:"warn"}));let u=await import("fs"),f=JSON.parse(await u.promises.readFile(n,"utf-8")),p=f.access_token,w=f.expires_at==null?null:Number(f.expires_at);if(typeof p==="string"&&p&&!r.has(p)&&(w===null||Date.now()/1000<w-NXe)){let{logEvent:h}=await import("./nativeBindings.js"),{fromEnum:_}=await import("./nativeBindings.js");return h("tengu_wif_user_oauth_refresh_race_resolved",{mode:_(s)}),t("wif: adopting sibling-rotated access token from credentials file; skipping refresh grant"),{token:p,expiresAt:w}}}catch(u){t(`wif: rotated-token adoption check failed: ${l(u)}`)}return e(o)}}
function we(e,n){let s=async()=>{try{let r=await import("fs");return JSON.parse(await r.promises.readFile(n,"utf-8"))}catch{return null}};return async(r)=>{let u=(await s())?.refresh_token;try{return await e(r)}catch(f){if(f instanceof id&&(f.statusCode===400||f.statusCode===401)&&typeof f.body==="string"&&f.body.includes('"invalid_grant"')&&YUe(f)===null&&typeof u==="string"&&u)try{let p=await s();if(p&&p.refresh_token===u){let{logEvent:w}=await import("./nativeBindings.js");await Xxe(n,{...p,refresh_token:void 0}),w("tengu_wif_user_oauth_refresh_token_cleared",{})}}catch(p){if(Dt(p))t(`wif: refresh-token cleanup write failed: ${p}`);else d(nt(ee(p),"WIF: failed to clear stale user_oauth refresh_token"))}throw f}}}
function Ee(e){if(Sht(e))return"no_refresh_available";if(YUe(e))return"account_on_hold";if(typeof e.body==="string"&&e.body.includes('"invalid_grant"'))return"invalid_grant";if(typeof e.statusCode==="number"){if(e.statusCode>=500)return"http_5xx";if(e.statusCode>=400)return"http_4xx"}let n=e.message.toLowerCase();if(n.includes("parse")||n.includes("json"))return"parse_failed";return"network_error"}
function A5n(){A().reset(),nSn()}
var g=(e)=>process.env[e]?.trim()||void 0;
async function ke(){if(kb()==="env-quad"){let e=g("ANTHROPIC_FEDERATION_RULE_ID"),n=g("ANTHROPIC_ORGANIZATION_ID");if(e&&n){let s=g("ANTHROPIC_IDENTITY_TOKEN_FILE");return{organization_id:n,workspace_id:g("ANTHROPIC_WORKSPACE_ID"),base_url:g("ANTHROPIC_BASE_URL"),authentication:{type:"oidc_federation",federation_rule_id:e,service_account_id:g("ANTHROPIC_SERVICE_ACCOUNT_ID"),identity_token:s?{source:"file",path:s}:void 0,scope:g("ANTHROPIC_SCOPE")}}}}if(bn())return null;return H()}
async function ye(e,n){if(e.authentication.type!=="oidc_federation")return null;let s=e.authentication.identity_token?.path,r;if(s)try{r=(await le(s,"utf-8")).trim()}catch(f){return t(`wif: cannot read identity token at ${s} (${l(f)}); federation token cache disabled`),null}else r=g("ANTHROPIC_IDENTITY_TOKEN");if(!r)return t("wif: no identity token; federation token cache disabled"),null;let o=JUe();if(o===null)return t("wif: no config directory, or a diskless session; federation token cache disabled"),null;try{await B(o,{recursive:!0,mode:448});{let f=await ue(o),p=f.mode&511;if(p&63)return t(`wif: ${o} is mode 0o${p.toString(8)} (filesystem ignores modes, or directory pre-existed shared); federation token cache disabled`),null;let w=process.getuid?.();if(w!==void 0&&f.uid!==w)return t(`wif: ${o} is owned by uid ${f.uid}, not ${w}; federation token cache disabled`),null}}catch(f){return t(`wif: cannot prepare ${o} (${l(f)}); federation token cache disabled`),null}let u=nn(JSON.stringify([e.authentication.federation_rule_id,e.organization_id,e.workspace_id??"",e.authentication.service_account_id??"",e.authentication.scope??"",n,nn(r)]));return he(o,`${u}.json`)}
return {A5n,K,PBr,Qne,_Re,bde};
}
const __module_chunk_b006b4v9=make_chunk_b006b4v9({});
const __module_chunk_h730kz80=make_chunk_h730kz80({"Sn":__module_chunk_b006b4v9.Sn,"_":__module_chunk_b006b4v9._});
const __module_chunk_p4g2kckh=make_chunk_p4g2kckh({"Dt":__node_fs["statSync"],"G":__module_chunk_h730kz80.G,"et":__node_path,"hn":__node_fs["readFileSync"],"st":__node_os["homedir"]});
const __module_chunk_r65ydf8e=make_chunk_r65ydf8e({"r":__node_fs["realpathSync"],"u":__node_process["cwd"]});
const __module_chunk_v6yfpapk=make_chunk_v6yfpapk({"f":__node_crypto["createHash"]});
const __module_chunk_52qbm57h=make_chunk_52qbm57h({});
const __module_chunk_ktw7xkh2=make_chunk_ktw7xkh2({});
const __module_chunk_81k5s7s5=make_chunk_81k5s7s5({});
const __module_chunk_ar1aj28g=make_chunk_ar1aj28g({"$Q":__module_chunk_p4g2kckh.$Q,"FQ":__module_chunk_p4g2kckh.FQ,"Me":__module_chunk_ktw7xkh2.Me,"PE":__module_chunk_p4g2kckh.PE,"Ppe":__module_chunk_p4g2kckh.Ppe,"QM":__module_chunk_p4g2kckh.QM,"Qr":__module_chunk_81k5s7s5.Qr,"S7r":__module_chunk_r65ydf8e.S7r,"Wo":__module_chunk_p4g2kckh.Wo,"fKo":__module_chunk_r65ydf8e.fKo,"lU":__module_chunk_p4g2kckh.lU,"lo":__module_chunk_v6yfpapk.lo,"mpe":__node_crypto["randomUUID"],"mtr":__module_chunk_52qbm57h.mtr,"nQe":__module_chunk_p4g2kckh.nQe,"nSt":__module_chunk_p4g2kckh.nSt,"rQe":__module_chunk_p4g2kckh.rQe,"str":__module_chunk_p4g2kckh.str,"tSt":__module_chunk_p4g2kckh.tSt,"vj":__module_chunk_v6yfpapk.vj,"xn":__module_chunk_p4g2kckh.xn,"getSecureStorageExecutionHost":__sharedWifHost});
const __module_chunk_gxp5am6q=make_chunk_gxp5am6q({"R":__node_os["homedir"],"Wo":__module_chunk_p4g2kckh.Wo,"u":__node_path["join"]});
const __module_chunk_9mppm73b=make_chunk_9mppm73b({});
const __module_chunk_1mbxc6eg=make_chunk_1mbxc6eg({});
const __module_chunk_6r5kgkzy=make_chunk_6r5kgkzy({});
const __module_chunk_yx145v00=make_chunk_yx145v00({"Ar":__node_fsp["realpath"],"Bt":__node_fsp["stat"],"CF":__module_chunk_1mbxc6eg.CF,"Ct":__node_path["resolve"],"DO":__module_chunk_p4g2kckh.DO,"Dr":__node_fsp["unlink"],"Er":__node_fsp["link"],"F":__module_chunk_r65ydf8e.F,"G":__module_chunk_h730kz80.G,"Ht":__node_fsp["readFile"],"Ke":__node_fsp["lstat"],"Le":__module_chunk_ktw7xkh2.Le,"Lr":__node_fsp["symlink"],"Me":__node_fsp["appendFile"],"Or":__node_fsp["rmdir"],"Ot":__node_fsp["rename"],"Pn":__module_chunk_p4g2kckh.Pn,"Pr":__node_fsp["rm"],"Rr":__node_fsp["readlink"],"Sr":__node_fsp["copyFile"],"Tr":__node_fsp["rename"],"Tt":__node_fsp["mkdir"],"UQ":__module_chunk_p4g2kckh.UQ,"V":__module_chunk_ar1aj28g.V,"X":__node_path["dirname"],"_s":__module_chunk_p4g2kckh._s,"a8":__module_chunk_1mbxc6eg.a8,"ar":__node_fsp["symlink"],"b8":__module_chunk_p4g2kckh.b8,"b_t":__module_chunk_1mbxc6eg.b_t,"bn":__module_chunk_ar1aj28g.bn,"bu":__module_chunk_6r5kgkzy.bu,"d":__node_path,"ea":__module_chunk_p4g2kckh.ea,"fpe":__module_chunk_1mbxc6eg.fpe,"gS":__module_chunk_p4g2kckh.gS,"j":__node_fsp["open"],"kP":__module_chunk_p4g2kckh.kP,"kr":__node_fsp["appendFile"],"m":__node_fs,"or":__node_fsp["stat"],"owe":__module_chunk_p4g2kckh.owe,"pl":__module_chunk_p4g2kckh.pl,"q":__module_chunk_ar1aj28g.q,"q2e":__module_chunk_1mbxc6eg.q2e,"rK":__module_chunk_h730kz80.rK,"s_":__module_chunk_p4g2kckh.s_,"ta":__module_chunk_p4g2kckh.ta,"ua":__module_chunk_p4g2kckh.ua,"ur":__node_path["isAbsolute"],"v":__module_chunk_h730kz80.v,"vF":__module_chunk_9mppm73b.vF,"vr":__node_fsp["readdir"],"vs":__module_chunk_ar1aj28g.vs,"we":__module_chunk_gxp5am6q.we,"wr":__node_fsp["mkdir"],"wy":__module_chunk_p4g2kckh.wy,"xF":__module_chunk_p4g2kckh.xF,"xn":__module_chunk_p4g2kckh.xn,"xr":__node_fsp["chmod"],"z":__node_path["join"],"zbe":__module_chunk_1mbxc6eg.zbe,"ze":__node_fsp["unlink"]});
const __module_chunk_j72sz16r=make_chunk_j72sz16r({"H":__node_os["release"],"Le":__module_chunk_ktw7xkh2.Le,"R":__node_fsp["readFile"],"ae":__module_chunk_yx145v00.ae,"ee":__module_chunk_h730kz80.ee,"pSt":__module_chunk_h730kz80.pSt,"t":__module_chunk_yx145v00.t});
const __module_chunk_abjdv98v=make_chunk_abjdv98v({});
const __module_chunk_0shqxty0=make_chunk_0shqxty0({});
const __module_chunk_rmy2pep5=make_chunk_rmy2pep5({"Cs":__module_chunk_ktw7xkh2.Cs,"Le":__module_chunk_ktw7xkh2.Le,"rc":__module_chunk_gxp5am6q.rc});
const __module_chunk_07mxqtdh=make_chunk_07mxqtdh({"At":__node_fsp["readlink"],"Bbe":__module_chunk_yx145v00.Bbe,"D":__module_chunk_rmy2pep5.D,"Dt":__node_os["homedir"],"F3":__module_chunk_0shqxty0.F3,"I":__node_path["join"],"Le":__module_chunk_ktw7xkh2.Le,"N":__module_chunk_abjdv98v.N,"O":__module_chunk_j72sz16r.O,"Ot":__module_chunk_52qbm57h.Ot,"Qr":__module_chunk_81k5s7s5.Qr,"Tt":__node_path["delimiter"],"ae":__module_chunk_yx145v00.ae,"et":__node_fs["constants"],"gKo":__module_chunk_rmy2pep5.gKo,"j":__module_chunk_ar1aj28g.j,"l":__node_fsp["access"],"nt":__node_fsp["readdir"],"q":__module_chunk_ar1aj28g.q,"w":__node_path["resolve"],"w8":__module_chunk_p4g2kckh.w8,"we":__module_chunk_gxp5am6q.we,"wy":__module_chunk_p4g2kckh.wy});
const __module_chunk_2143w8bm=make_chunk_2143w8bm({});
const __module_chunk_pmrrc8z5=make_chunk_pmrrc8z5({});
const __module_chunk_1f551ggg=make_chunk_1f551ggg({"$Vo":__module_chunk_pmrrc8z5.$Vo,"$Xo":__module_chunk_pmrrc8z5.$Xo,"Aa":__module_chunk_pmrrc8z5.Aa,"Ayt":__module_chunk_pmrrc8z5.Ayt,"BXo":__module_chunk_pmrrc8z5.BXo,"Cyt":__module_chunk_pmrrc8z5.Cyt,"DVo":__module_chunk_pmrrc8z5.DVo,"FVo":__module_chunk_pmrrc8z5.FVo,"FXo":__module_chunk_pmrrc8z5.FXo,"GXo":__module_chunk_pmrrc8z5.GXo,"HVo":__module_chunk_pmrrc8z5.HVo,"J7e":__module_chunk_pmrrc8z5.J7e,"JKr":__module_chunk_pmrrc8z5.JKr,"KKr":__module_chunk_pmrrc8z5.KKr,"LPe":__module_chunk_pmrrc8z5.LPe,"LVo":__module_chunk_pmrrc8z5.LVo,"MPe":__module_chunk_pmrrc8z5.MPe,"NPe":__module_chunk_pmrrc8z5.NPe,"NVo":__module_chunk_pmrrc8z5.NVo,"OVo":__module_chunk_pmrrc8z5.OVo,"PVo":__module_chunk_pmrrc8z5.PVo,"RVo":__module_chunk_pmrrc8z5.RVo,"Swn":__module_chunk_pmrrc8z5.Swn,"T3":__module_chunk_pmrrc8z5.T3,"Tyt":__module_chunk_pmrrc8z5.Tyt,"UXo":__module_chunk_pmrrc8z5.UXo,"VKr":__module_chunk_pmrrc8z5.VKr,"WWt":__module_chunk_pmrrc8z5.WWt,"WXo":__module_chunk_pmrrc8z5.WXo,"X7e":__module_chunk_pmrrc8z5.X7e,"XKr":__module_chunk_pmrrc8z5.XKr,"YKr":__module_chunk_pmrrc8z5.YKr,"Zn":__module_chunk_pmrrc8z5.Zn,"bwn":__module_chunk_pmrrc8z5.bwn,"cQn":__module_chunk_pmrrc8z5.cQn,"cS":__module_chunk_pmrrc8z5.cS,"dQn":__module_chunk_pmrrc8z5.dQn,"j9":__module_chunk_pmrrc8z5.j9,"jXo":__module_chunk_pmrrc8z5.jXo,"kyt":__module_chunk_pmrrc8z5.kyt,"lQn":__module_chunk_pmrrc8z5.lQn,"q1":__module_chunk_pmrrc8z5.q1,"qKr":__module_chunk_pmrrc8z5.qKr,"s2e":__module_chunk_pmrrc8z5.s2e,"wwn":__module_chunk_pmrrc8z5.wwn,"zWt":__module_chunk_pmrrc8z5.zWt});
const __module_chunk_ttgve2cs=make_chunk_ttgve2cs({"Dt":__module_chunk_h730kz80.Dt,"J":__module_chunk_yx145v00.J,"Ln":__module_chunk_h730kz80.Ln,"U":__module_chunk_1f551ggg.U,"a":__module_chunk_07mxqtdh.a,"bn":__module_chunk_ar1aj28g.bn,"cn":__module_chunk_0shqxty0.cn,"f":__module_chunk_2143w8bm.f,"g":__node_path["join"],"ie":__module_chunk_1f551ggg.ie,"j":__module_chunk_ar1aj28g.j,"me":__node_path["resolve"],"q":__module_chunk_ar1aj28g.q,"tt":__node_fs["readFileSync"],"u":__module_chunk_1f551ggg.u,"x":__module_chunk_1f551ggg.x});
const __module_chunk_1zmpymz2=make_chunk_1zmpymz2({"Ipe":__module_chunk_h730kz80.Ipe,"c":__module_chunk_b006b4v9.c,"i":__cLogEvent});
const __module_chunk_v350ypgv=make_chunk_v350ypgv({"E":__module_chunk_81k5s7s5.E,"Ie":__module_chunk_81k5s7s5.Ie});
const __module_chunk_zebstnyx=make_chunk_zebstnyx({"E":__node_crypto["createHash"]});
const __module_chunk_jzbeanqj=make_chunk_jzbeanqj({"$Xn":__module_chunk_ttgve2cs.$Xn,"B":__node_fsp["mkdir"],"Dt":__module_chunk_h730kz80.Dt,"FXn":__module_chunk_ttgve2cs.FXn,"JUe":__module_chunk_ttgve2cs.JUe,"LXe":__module_chunk_ttgve2cs.LXe,"Ln":__module_chunk_h730kz80.Ln,"Mr":__module_chunk_1zmpymz2.Mr,"NXe":__module_chunk_ttgve2cs.NXe,"NXn":__module_chunk_ttgve2cs.NXn,"P6o":__module_chunk_ttgve2cs.P6o,"Qi":__module_chunk_v350ypgv.Qi,"R6o":__module_chunk_ttgve2cs.R6o,"Sht":__module_chunk_ttgve2cs.Sht,"T6o":__module_chunk_ttgve2cs.T6o,"WJ":__module_chunk_ttgve2cs.WJ,"Xxe":__module_chunk_ttgve2cs.Xxe,"YUe":__module_chunk_ttgve2cs.YUe,"Z":__module_chunk_52qbm57h.Z,"a":__module_chunk_07mxqtdh.a,"bn":__module_chunk_ar1aj28g.bn,"c":__module_chunk_b006b4v9.c,"d":__module_chunk_j72sz16r.d,"ee":__module_chunk_h730kz80.ee,"fe":__node_path["dirname"],"he":__node_path["join"],"i":__cLogEvent,"id":__module_chunk_ttgve2cs.id,"j":__module_chunk_ar1aj28g.j,"k6o":__module_chunk_ttgve2cs.k6o,"kb":__module_chunk_ttgve2cs.kb,"l":__module_chunk_h730kz80.l,"le":__node_fsp["readFile"],"m":__module_chunk_1zmpymz2.m,"nSn":__module_chunk_ttgve2cs.nSn,"nn":__module_chunk_zebstnyx.nn,"nt":__module_chunk_h730kz80.nt,"q":__module_chunk_ar1aj28g.q,"t":__module_chunk_yx145v00.t,"ue":__node_fsp["stat"],"us":__module_chunk_h730kz80.us,"x6o":__module_chunk_ttgve2cs.x6o,"y":__module_chunk_1zmpymz2.y,"z2t":__module_chunk_ttgve2cs.z2t});
const __root=__module_chunk_jzbeanqj
const __nativeWifTransientExchangeError287=((xd)=>{function me(e){switch("code"in e&&typeof e.code==="string"?e.code:""){case"ECONNRESET":case"ECONNREFUSED":case"ECONNABORTED":case"ETIMEDOUT":case"EHOSTUNREACH":case"ENETUNREACH":case"ENETDOWN":case"ENOTFOUND":case"EAI_AGAIN":case"EPIPE":case"UND_ERR_SOCKET":case"UND_ERR_CONNECT_TIMEOUT":case"ELOCKED":case"ConnectionRefused":case"ConnectionClosed":case"FailedToOpenSocket":case"Timeout":return!0;default:return!1}}
function Uls(e){if(e instanceof xd&&typeof e.statusCode==="number")return e.statusCode>=500||e.statusCode===429||e.statusCode===408;let n=e;for(let s=0;s<4&&n instanceof Error;s++){if(n.name==="TimeoutError"||me(n))return!0;n=n.cause}return!1}
return Uls})(__module_chunk_ttgve2cs.id)
export const __nativeFromEnum=__module_chunk_b006b4v9.c
export function createHttpWif286(){return {getWIFTokenCache:__root.bde,getWIFCredentials:__root._Re,invalidateWIFToken:__root.PBr,resetWIFCredentialState:__root.A5n,getResolvedWIFBaseUrlSnapshot:__root.Qne,isWIFTransientExchangeError:__nativeWifTransientExchangeError287}}
export function getWifAttribution286(){return {kb:__module_chunk_ttgve2cs.kb,MSe:__module_chunk_ttgve2cs.MSe,SM:__module_chunk_ttgve2cs.SM,V2t:__module_chunk_ttgve2cs.V2t,XUe:__module_chunk_ttgve2cs.XUe,Yzr:__module_chunk_ttgve2cs.Yzr,I6o:__module_chunk_ttgve2cs.I6o,q2t:__module_chunk_ttgve2cs.q2t,H6o:__module_chunk_ttgve2cs.H6o,O6o:__module_chunk_ttgve2cs.O6o,FXe:__module_chunk_ttgve2cs.FXe,$Xe:__module_chunk_ttgve2cs.$Xe,readProtectionState287:__module_chunk_ttgve2cs.readProtectionState287}}
export function getOAuthResetExecutionContext286(){return __module_chunk_ar1aj28g.j()}
/** Expose the existing lock closure, not a second lock/cache instance. */
export function withWifCredentialLock286(directory,operation,mode){return __root.K(directory,operation,mode)}
