import {readFileSync as readEmbeddedText287} from 'node:fs';
const embeddedRequire287=(specifier)=>specifier==="/$bunfs/root/state-library.js-wy8y4843.txt"?readEmbeddedText287(new URL("./resources/state-library.js-wy8y4843.txt",import.meta.url),'utf8'):import.meta.require(specifier);
import {isProxy as builtin0} from "node:util/types";
import {relative as builtin1} from "node:path";
import {resolve as builtin2} from "node:path";
import {dirname as builtin3} from "node:path";
import {sep as builtin4} from "node:path";
import {isAbsolute as builtin5} from "node:path";
import {realpath as builtin6} from "node:fs/promises";
import {basename as builtin7} from "node:path";
import {lstat as builtin8} from "node:fs/promises";
import {readFile as builtin9} from "node:fs/promises";
import * as builtin10 from "node:vm";
import {isUint8Array as builtin11} from "node:util/types";
import {isArrayBuffer as builtin12} from "node:util/types";
import {AsyncResource as builtin13} from "node:async_hooks";
import {pathToFileURL as builtin14} from "node:url";
import {AsyncLocalStorage as builtin15} from "node:async_hooks";
import {workerData as builtin16} from "node:worker_threads";
function module0(imports){

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
function ct(t,e){return t};
return {qt,Tir,Qt,te,IL,ne,nB,st,re,oe,E,ie,at,se,ae,ue,ut,le,ce,lt,fe,mee,pe,iv,de,ge,he,me,xe,tEt,we,M,ft,be,pt,_e,Se,ye,R6e,Te,ve,Ae,Oe,Ce,Ee,Ne,Pe,dt,Re,gt,De,gee,Le,m,Me,ht,Ie,mt,ke,$e,je,We,xt,He,Ue,Fe,wt,ze,Be,bt,T,G,Ge,_t,Ve,eme,Je,b,Ke,Ye,Ze,St,Xe,yt,qe,Tt,Qe,vt,v,Wet,tn,Get,en,At,nn,Ot,rn,_,on,Ct,sn,Et,an,Nt,un,Pt,A,nEt,ln,V,is,ct};
}
function module1(imports){
const Ie=imports["Ie"];
var l=Object.create;
var {getPrototypeOf:m,defineProperty:g,getOwnPropertyNames:n}=Object;
var k=Object.prototype.hasOwnProperty;
function o(a){return this[a]};
var p;
var q;
var Se=(a,c,d)=>{var e=a!=null&&typeof a==="object";if(e){var i=c?p??=new WeakMap:q??=new WeakMap,j=i.get(a);if(j)return j}d=a!=null?l(m(a)):{};let f=c||!a||!a.__esModule||!k.call(a,"default")?g(d,"default",{value:a,enumerable:!0}):d;if(a&&typeof a==="object"||typeof a==="function"){for(let h of n(a))if(!k.call(f,h))g(f,h,{get:o.bind(a,h),enumerable:!0})}if(e)i.set(a,f);return f};
var v=(a,c)=>()=>(c||a((c={exports:{}}).exports,c),c.exports);
var r=(a)=>a;
function s(a,c){this[a]=r.bind(null,c)};
var io=(a,c)=>{for(var d in c)g(a,d,{get:c[d],enumerable:!0,configurable:!0,set:s.bind(c,d)})};
return {l,m,g,n,k,o,p,q,Se,v,r,s,io,Ie};
}
function module2(imports){
const gee=imports["gee"];
const mee=imports["mee"];
const is=imports["is"];
const nB=imports["nB"];
const tEt=imports["tEt"];
const IL=imports["IL"];
const Tir=imports["Tir"];
const iv=imports["iv"];
const Wet=imports["Wet"];
const nEt=imports["nEt"];
const eme=imports["eme"];
const Get=imports["Get"];
const io=imports["io"];
function An(){this.__data__=new Wet,this.size=0};
var Ze=An;
function Pn(e){var t=this.__data__,o=t.delete(e);return this.size=t.size,o};
var et=Pn;
function wn(e){return this.__data__.get(e)};
var tt=wn;
function Ln(e){return this.__data__.has(e)};
var nt=Ln;
var In=200;
function On(e,t){var o=this.__data__;if(o instanceof Wet){var r=o.__data__;if(!Get||r.length<In-1)return r.push([e,t]),this.size=++o.size,this;o=this.__data__=new nEt(r)}return o.set(e,t),this.size=o.size,this};
var ot=On;
function A(e){var t=this.__data__=new Wet(e);this.size=t.size};
A.prototype.clear=Ze;
A.prototype.delete=et;
A.prototype.get=tt;
A.prototype.has=nt;
A.prototype.set=ot;
var MOe=A;
var Fn="__lodash_hash_undefined__";
function En(e){return this.__data__.set(e,Fn),this};
var rt=En;
function Dn(e){return this.__data__.has(e)};
var it=Dn;
function H(e){var t=-1,o=e==null?0:e.length;this.__data__=new nEt;while(++t<o)this.add(e[t])};
H.prototype.add=H.prototype.push=rt;
H.prototype.has=it;
var asr=H;
function Hn(e,t){var o=-1,r=e==null?0:e.length;while(++o<r)if(t(e[o],o,e))return!0;return!1};
var st=Hn;
function Bn(e,t){return e.has(t)};
var lsr=Bn;
var jn=1;
var Un=2;
function _n(e,t,o,r,i,s){var a=o&jn,u=e.length,d=t.length;if(u!=d&&!(a&&d>u))return!1;var l=s.get(e),h=s.get(t);if(l&&h)return l==t&&h==e;var p=-1,g=!0,S=o&Un?new asr:void 0;s.set(e,t),s.set(t,e);while(++p<u){var m=e[p],y=t[p];if(r)var k=a?r(y,m,p,t,e,s):r(m,y,p,e,t,s);if(k!==void 0){if(k)continue;g=!1;break}if(S){if(!st(t,function(C,x){if(!lsr(S,x)&&(m===C||i(m,C,o,r,s)))return S.push(x)})){g=!1;break}}else if(!(m===y||i(m,y,o,r,s))){g=!1;break}}return s.delete(e),s.delete(t),g};
var B=_n;
var qn=IL.Uint8Array;
var Zqt=qn;
function Gn(e){var t=-1,o=Array(e.size);return e.forEach(function(r,i){o[++t]=[i,r]}),o};
var at=Gn;
function Nn(e){var t=-1,o=Array(e.size);return e.forEach(function(r){o[++t]=r}),o};
var e3t=Nn;
var Kn=1;
var Vn=2;
var Jn="[object Boolean]";
var zn="[object Date]";
var Qn="[object Error]";
var Xn="[object Map]";
var Yn="[object Number]";
var $n="[object RegExp]";
var Zn="[object Set]";
var eo="[object String]";
var to="[object Symbol]";
var no="[object ArrayBuffer]";
var oo="[object DataView]";
var lt=nB?nB.prototype:void 0;
var te=lt?lt.valueOf:void 0;
function ro(e,t,o,r,i,s,a){switch(o){case oo:if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return!1;e=e.buffer,t=t.buffer;case no:if(e.byteLength!=t.byteLength||!s(new Zqt(e),new Zqt(t)))return!1;return!0;case Jn:case zn:case Yn:return eme(+e,+t);case Qn:return e.name==t.name&&e.message==t.message;case $n:case eo:return e==t+"";case Xn:var u=at;case Zn:var d=r&Kn;if(u||(u=e3t),e.size!=t.size&&!d)return!1;var l=a.get(e);if(l)return l==t;r|=Vn,a.set(e,t);var h=B(u(e),u(t),r,i,s,a);return a.delete(e),h;case to:if(te)return te.call(e)==te.call(t)}return!1};
var dt=ro;
function so(e,t){var o=-1,r=t.length,i=e.length;while(++o<r)e[i+o]=t[o];return e};
var bwt=so;
var ao=Array.isArray;
var vb=ao;
function lo(e,t,o){var r=t(e);return vb(e)?r:bwt(r,o(e))};
var csr=lo;
function co(e,t){var o=-1,r=e==null?0:e.length,i=0,s=[];while(++o<r){var a=e[o];if(t(a,o,e))s[i++]=a}return s};
var dsr=co;
function po(){return[]};
var usr=po;
var fo=Object.prototype;
var ho=fo.propertyIsEnumerable;
var ut=Object.getOwnPropertySymbols;
var go=!ut?usr:function(e){if(e==null)return[];return e=Object(e),dsr(ut(e),function(t){return ho.call(e,t)})};
var wwt=go;
function mo(e,t){var o=-1,r=Array(e);while(++o<e)r[o]=t(o);return r};
var ct=mo;
function So(e){return e!=null&&typeof e=="object"};
var KU=So;
var vo="[object Arguments]";
function bo(e){return KU(e)&&mee(e)==vo};
var ne=bo;
var pt=Object.prototype;
var {hasOwnProperty:ko,propertyIsEnumerable:xo}=pt;
var To=ne(function(){return arguments}())?ne:function(e){return KU(e)&&ko.call(e,"callee")&&!xo.call(e,"callee")};
var a6e=To;
var _={};
io(_,{default:()=>LOe});
function Ro(){return!1};
var ft=Ro;
var mt=typeof _=="object"&&_&&!_.nodeType&&_;
var ht=mt&&typeof j=="object"&&j&&!j.nodeType&&j;
var Ao=ht&&ht.exports===mt;
var gt=Ao?IL.Buffer:void 0;
var Po=gt?gt.isBuffer:void 0;
var Mo=Po||ft;
var LOe=Mo;
var wo=9007199254740991;
var Lo=/^(?:0|[1-9]\d*)$/;
function Io(e,t){var o=typeof e;return t=t==null?wo:t,!!t&&(o=="number"||o!="symbol"&&Lo.test(e))&&(e>-1&&e%1==0&&e<t)};
var l6e=Io;
var Oo=9007199254740991;
function Fo(e){return typeof e=="number"&&e>-1&&e%1==0&&e<=Oo};
var P=Fo;
var Eo="[object Arguments]";
var Do="[object Array]";
var Ho="[object Boolean]";
var Bo="[object Date]";
var jo="[object Error]";
var Uo="[object Function]";
var _o="[object Map]";
var qo="[object Number]";
var Wo="[object Object]";
var Go="[object RegExp]";
var No="[object Set]";
var Ko="[object String]";
var Vo="[object WeakMap]";
var Jo="[object ArrayBuffer]";
var zo="[object DataView]";
var Qo="[object Float32Array]";
var Xo="[object Float64Array]";
var Yo="[object Int8Array]";
var $o="[object Int16Array]";
var Zo="[object Int32Array]";
var er="[object Uint8Array]";
var tr="[object Uint8ClampedArray]";
var nr="[object Uint16Array]";
var or="[object Uint32Array]";
var f={};
f[Qo]=f[Xo]=f[Yo]=f[$o]=f[Zo]=f[er]=f[tr]=f[nr]=f[or]=!0;
f[Eo]=f[Do]=f[Jo]=f[Ho]=f[zo]=f[Bo]=f[jo]=f[Uo]=f[_o]=f[qo]=f[Wo]=f[Go]=f[No]=f[Ko]=f[Vo]=!1;
function rr(e){return KU(e)&&P(e.length)&&!!f[mee(e)]};
var St=rr;
function ir(e){return function(t){return e(t)}};
var t3t=ir;
var G={};
io(G,{default:()=>NOe});
var vt=typeof G=="object"&&G&&!G.nodeType&&G;
var L=vt&&typeof W=="object"&&W&&!W.nodeType&&W;
var sr=L&&L.exports===vt;
var oe=sr&&Tir.process;
var ar=function(){try{var e=L&&L.require&&L.require("util").types;if(e)return e;return oe&&oe.binding&&oe.binding("util")}catch(t){}}();
var NOe=ar;
var yt=NOe&&NOe.isTypedArray;
var lr=yt?t3t(yt):St;
var n3t=lr;
var dr=Object.prototype;
var ur=dr.hasOwnProperty;
function pr(e,t){var o=vb(e),r=!o&&a6e(e),i=!o&&!r&&LOe(e),s=!o&&!r&&!i&&n3t(e),a=o||r||i||s,u=a?ct(e.length,String):[],d=u.length;for(var l in e)if((t||ur.call(e,l))&&!(a&&(l=="length"||i&&(l=="offset"||l=="parent")||s&&(l=="buffer"||l=="byteLength"||l=="byteOffset")||l6e(l,d))))u.push(l);return u};
var psr=pr;
var fr=Object.prototype;
function hr(e){var t=e&&e.constructor,o=typeof t=="function"&&t.prototype||fr;return e===o};
var Ewt=hr;
function gr(e,t){return function(o){return e(t(o))}};
var fsr=gr;
var mr=fsr(Object.keys,Object);
var bt=mr;
var Sr=Object.prototype;
var vr=Sr.hasOwnProperty;
function yr(e){if(!Ewt(e))return bt(e);var t=[];for(var o in Object(e))if(vr.call(e,o)&&o!="constructor")t.push(o);return t};
var kt=yr;
function br(e){return e!=null&&P(e.length)&&!tEt(e)};
var Ufe=br;
function kr(e){return Ufe(e)?psr(e):kt(e)};
var rie=kr;
function Cr(e){return csr(e,rie,wwt)};
var ZTn=Cr;
var xr=1;
var Tr=Object.prototype;
var Rr=Tr.hasOwnProperty;
function Ar(e,t,o,r,i,s){var a=o&xr,u=ZTn(e),d=u.length,l=ZTn(t),h=l.length;if(d!=h&&!a)return!1;var p=d;while(p--){var g=u[p];if(!(a?g in t:Rr.call(t,g)))return!1}var S=s.get(e),m=s.get(t);if(S&&m)return S==t&&m==e;var y=!0;s.set(e,t),s.set(t,e);var k=a;while(++p<d){g=u[p];var C=e[g],x=t[g];if(r)var $e=a?r(x,C,g,t,e,s):r(C,x,g,e,t,s);if(!($e===void 0?C===x||i(C,x,o,r,s):$e)){y=!1;break}k||(k=g=="constructor")}if(y&&!k){var E=e.constructor,D=t.constructor;if(E!=D&&(("constructor"in e)&&("constructor"in t))&&!(typeof E=="function"&&E instanceof E&&typeof D=="function"&&D instanceof D))y=!1}return s.delete(e),s.delete(t),y};
var Ct=Ar;
var T=mee;
var c6e=T;
var jr=1;
var wt="[object Arguments]";
var Lt="[object Array]";
var z="[object Object]";
var Ur=Object.prototype;
var It=Ur.hasOwnProperty;
function _r(e,t,o,r,i,s){var a=vb(e),u=vb(t),d=a?Lt:c6e(e),l=u?Lt:c6e(t);d=d==wt?z:d,l=l==wt?z:l;var h=d==z,p=l==z,g=d==l;if(g&&LOe(e)){if(!LOe(t))return!1;a=!0,h=!1}if(g&&!h)return s||(s=new MOe),a||n3t(e)?B(e,t,o,r,i,s):dt(e,t,d,o,r,i,s);if(!(o&jr)){var S=h&&It.call(e,"__wrapped__"),m=p&&It.call(t,"__wrapped__");if(S||m){var y=S?e.value():e,k=m?t.value():t;return s||(s=new MOe),i(y,k,o,r,s)}}if(!g)return!1;return s||(s=new MOe),Ct(e,t,o,r,i,s)};
var Ot=_r;
function Ft(e,t,o,r,i){if(e===t)return!0;if(e==null||t==null||!KU(e)&&!KU(t))return e!==e&&t!==t;return Ot(e,t,o,r,Ft,i)};
var M=Ft;
var Gr=function(){try{var e=gee(Object,"defineProperty");return e({},"",{}),e}catch(t){}}();
var o3t=Gr;
function Nr(e,t,o){if(t=="__proto__"&&o3t)o3t(e,t,{configurable:!0,enumerable:!0,value:o,writable:!0});else e[t]=o};
var Bfe=Nr;
function Kr(e){return function(t,o,r){var i=-1,s=Object(t),a=r(t),u=a.length;while(u--){var d=a[e?u:++i];if(o(s[d],d,s)===!1)break}return t}};
var Bt=Kr;
var Vr=Bt();
var hsr=Vr;
function Jr(e,t){return e&&hsr(e,t,rie)};
var Cwt=Jr;
var zr=1;
var Xr=2;
function Yr(e,t,o,r){var i=o.length,s=i,a=!r;if(e==null)return!s;e=Object(e);while(i--){var u=o[i];if(a&&u[2]?u[1]!==e[u[0]]:!(u[0]in e))return!1}while(++i<s){u=o[i];var d=u[0],l=e[d],h=u[1];if(a&&u[2]){if(l===void 0&&!(d in e))return!1}else{var p=new MOe;if(r)var g=r(l,h,d,e,t,p);if(!(g===void 0?M(h,l,zr|Xr,r,p):g))return!1}}return!0};
var jt=Yr;
function $r(e){return e===e&&!iv(e)};
var X=$r;
function Zr(e){var t=rie(e),o=t.length;while(o--){var r=t[o],i=e[r];t[o]=[r,i,X(i)]}return t};
var _t=Zr;
function ei(e,t){return function(o){if(o==null)return!1;return o[e]===t&&(t!==void 0||(e in Object(o)))}};
var Y=ei;
function ti(e){var t=_t(e);if(t.length==1&&t[0][2])return Y(t[0][0],t[0][1]);return function(o){return o===e||jt(o,e,t)}};
var qt=ti;
var ni="[object Symbol]";
function oi(e){return typeof e=="symbol"||KU(e)&&mee(e)==ni};
var vet=oi;
var ri=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var ii=/^\w*$/;
function si(e,t){if(vb(e))return!1;var o=typeof e;if(o=="number"||o=="symbol"||o=="boolean"||e==null||vet(e))return!0;return ii.test(e)||!ri.test(e)||t!=null&&e in Object(t)};
var w=si;
var ai=500;
function li(e){var t=is(e,function(r){if(o.size===ai)o.clear();return r}),o=t.cache;return t};
var Wt=li;
var di=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var ui=/\\(\\)?/g;
var ci=Wt(function(e){var t=[];if(e.charCodeAt(0)===46)t.push("");return e.replace(di,function(o,r,i,s){t.push(i?s.replace(ui,"$1"):r||o)}),t});
var Gt=ci;
function pi(e,t){var o=-1,r=e==null?0:e.length,i=Array(r);while(++o<r)i[o]=t(e[o],o,e);return i};
var FOe=pi;
var fi=1/0;
var Nt=nB?nB.prototype:void 0;
var Kt=Nt?Nt.toString:void 0;
function Vt(e){if(typeof e=="string")return e;if(vb(e))return FOe(e,Vt)+"";if(vet(e))return Kt?Kt.call(e):"";var t=e+"";return t=="0"&&1/e==-fi?"-0":t};
var Jt=Vt;
function hi(e){return e==null?"":Jt(e)};
var oie=hi;
function gi(e,t){if(vb(e))return e;return w(e,t)?[e]:Gt(oie(e))};
var sie=gi;
var mi=1/0;
function Si(e){if(typeof e=="string"||vet(e))return e;var t=e+"";return t=="0"&&1/e==-mi?"-0":t};
var iee=Si;
function vi(e,t){t=sie(t,e);var o=0,r=t.length;while(e!=null&&o<r)e=e[iee(t[o++])];return o&&o==r?e:void 0};
var u6e=vi;
function yi(e,t,o){var r=e==null?void 0:u6e(e,t);return r===void 0?o:r};
var ysr=yi;
function bi(e,t){return e!=null&&t in Object(e)};
var zt=bi;
function ki(e,t,o){t=sie(t,e);var r=-1,i=t.length,s=!1;while(++r<i){var a=iee(t[r]);if(!(s=e!=null&&o(e,a)))break;e=e[a]}if(s||++r!=i)return s;return i=e==null?0:e.length,!!i&&P(i)&&l6e(a,i)&&(vb(e)||a6e(e))};
var Qt=ki;
function Ci(e,t){return e!=null&&Qt(e,t,zt)};
var _sr=Ci;
var xi=1;
var Ti=2;
function Ri(e,t){if(w(e)&&X(t))return Y(iee(e),t);return function(o){var r=ysr(o,e);return r===void 0&&r===t?_sr(o,e):M(t,r,xi|Ti)}};
var Xt=Ri;
function Ai(e){return e};
var s3t=Ai;
function Pi(e){return function(t){return t==null?void 0:t[e]}};
var Yt=Pi;
function Mi(e){return function(t){return u6e(t,e)}};
var $t=Mi;
function wi(e){return w(e)?Yt(iee(e)):$t(e)};
var Zt=wi;
function Li(e){if(typeof e=="function")return e;if(e==null)return s3t;if(typeof e=="object")return vb(e)?Xt(e[0],e[1]):qt(e);return Zt(e)};
var TL=Li;
function Ii(e,t){var o={};return t=TL(t,3),Cwt(e,function(r,i,s){Bfe(o,i,t(r,i,s))}),o};
var Qr=Ii;
return {An,Ze,Pn,et,wn,tt,Ln,nt,In,On,ot,A,MOe,Fn,En,rt,Dn,it,H,asr,Hn,st,Bn,lsr,jn,Un,_n,B,qn,Zqt,Gn,at,Nn,e3t,Kn,Vn,Jn,zn,Qn,Xn,Yn,$n,Zn,eo,to,no,oo,lt,te,ro,dt,so,bwt,ao,vb,lo,csr,co,dsr,po,usr,fo,ho,ut,go,wwt,mo,ct,So,KU,vo,bo,ne,pt,ko,xo,To,a6e,_,Ro,ft,mt,ht,Ao,gt,Po,Mo,LOe,wo,Lo,Io,l6e,Oo,Fo,P,Eo,Do,Ho,Bo,jo,Uo,_o,qo,Wo,Go,No,Ko,Vo,Jo,zo,Qo,Xo,Yo,$o,Zo,er,tr,nr,or,f,rr,St,ir,t3t,G,vt,L,sr,oe,ar,NOe,yt,lr,n3t,dr,ur,pr,psr,fr,hr,Ewt,gr,fsr,mr,bt,Sr,vr,yr,kt,br,Ufe,kr,rie,Cr,ZTn,xr,Tr,Rr,Ar,Ct,T,c6e,jr,wt,Lt,z,Ur,It,_r,Ot,Ft,M,Gr,o3t,Nr,Bfe,Kr,Bt,Vr,hsr,Jr,Cwt,zr,Xr,Yr,jt,$r,X,Zr,_t,ei,Y,ti,qt,ni,oi,vet,ri,ii,si,w,ai,li,Wt,di,ui,ci,Gt,pi,FOe,fi,Nt,Kt,Vt,Jt,hi,oie,gi,sie,mi,Si,iee,vi,u6e,yi,ysr,bi,zt,ki,Qt,Ci,_sr,xi,Ti,Ri,Xt,Ai,s3t,Pi,Yt,Mi,$t,wi,Zt,Li,TL,Ii,Qr};
}
function module3(imports){
const u6e=imports["u6e"];
const iv=imports["iv"];
const sie=imports["sie"];
const iee=imports["iee"];
const l6e=imports["l6e"];
const eme=imports["eme"];
const Bfe=imports["Bfe"];
const FOe=imports["FOe"];
const csr=imports["csr"];
const Ufe=imports["Ufe"];
const psr=imports["psr"];
const Ewt=imports["Ewt"];
const usr=imports["usr"];
const bwt=imports["bwt"];
const wwt=imports["wwt"];
const fsr=imports["fsr"];
const TL=imports["TL"];
var v=Object.prototype;
var d=v.hasOwnProperty;
function g(r,t,e){var o=r[t];if(!(d.call(r,t)&&eme(o,e))||e===void 0&&!(t in r))Bfe(r,t,e)};
var PWe=g;
function P(r,t,e,o){if(!iv(r))return r;t=sie(t,r);var i=-1,m=t.length,s=m-1,n=r;while(n!=null&&++i<m){var f=iee(t[i]),a=e;if(f==="__proto__"||f==="constructor"||f==="prototype")return r;if(i!=s){var p=n[f];if(a=o?o(p,f,n):void 0,a===void 0)a=iv(p)?p:l6e(t[i+1])?[]:{}}PWe(n,f,a),n=n[f]}return r};
var u=P;
function x(r,t,e){var o=-1,i=t.length,m={};while(++o<i){var s=t[o],n=u6e(r,s);if(e(n,s))u(m,sie(s,r),n)}return m};
var uor=x;
var O=fsr(Object.getPrototypeOf,Object);
var gqt=O;
var I=Object.getOwnPropertySymbols;
var h=!I?usr:function(r){var t=[];while(r)bwt(t,wwt(r)),r=gqt(r);return t};
var por=h;
function K(r){var t=[];if(r!=null)for(var e in Object(r))t.push(e);return t};
var l=K;
var c=Object.prototype;
var A=c.hasOwnProperty;
function S(r){if(!iv(r))return l(r);var t=Ewt(r),e=[];for(var o in r)if(!(o=="constructor"&&(t||!A.call(r,o))))e.push(o);return e};
var y=S;
function w(r){return Ufe(r)?psr(r,!0):y(r)};
var iOe=w;
function b(r){return csr(r,iOe,por)};
var hqt=b;
function _(r,t){if(r==null)return{};var e=FOe(hqt(r),function(o){return[o]});return t=TL(t),uor(r,e,function(o,i){return t(o,i[0])})};
var zr=_;
return {v,d,g,PWe,P,u,x,uor,O,gqt,I,h,por,K,l,c,A,S,y,w,iOe,b,hqt,_,zr};
}
function module4(imports){
const o3t=imports["o3t"];
const s3t=imports["s3t"];
const vb=imports["vb"];
const a6e=imports["a6e"];
const nB=imports["nB"];
const bwt=imports["bwt"];
const uor=imports["uor"];
const _sr=imports["_sr"];
const zr=imports["zr"];
const TL=imports["TL"];
var KF=["acceptEdits","auto","bypassPermissions","default","dontAsk","plan"];
var YF="manual";
var Ac="Expected a function";
function Rc(e){if(typeof e!="function")throw TypeError(Ac);return function(){var n=arguments;switch(n.length){case 0:return!e.call(this);case 1:return!e.call(this,n[0]);case 2:return!e.call(this,n[0],n[1]);case 3:return!e.call(this,n[0],n[1],n[2])}return!e.apply(this,n)}};
var tnr=Rc;
function Oc(e,n){return zr(e,tnr(TL(n)))};
var di=Oc;
function N(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)};
var nu=["low","medium","high","xhigh","max"];
var pnr={".ts":"ts",".tsx":"tsx",".jsx":"jsx",".js":"js",".mjs":"js",".cjs":"js",".mts":"ts",".cts":"ts"};
var oZe=Object.keys(pnr);
var pYr=`${oZe.slice(0,-1).join(", ")} or `+String(oZe.at(-1));
var Ag=["PreToolUse","PostToolUse","PostToolUseFailure","PostToolBatch","Notification","UserPromptSubmit","UserPromptExpansion","SessionStart","SessionEnd","Stop","StopFailure","SubagentStart","SubagentStop","PreCompact","PostCompact","PreModelSwitch","PostModelSwitch","PermissionRequest","PermissionDenied","Setup","TeammateIdle","TaskCreated","TaskCompleted","Elicitation","ElicitationResult","ConfigChange","WorktreeCreate","WorktreeRemove","InstructionsLoaded","CwdChanged","FileChanged","DirectoryAdded","MessageDisplay"];
function Df(e,n,s){switch(s.length){case 0:return e.call(n);case 1:return e.call(n,s[0]);case 2:return e.call(n,s[0],s[1]);case 3:return e.call(n,s[0],s[1],s[2])}return e.apply(n,s)};
var Ul=Df;
var zl=Math.max;
function xf(e,n,s){return n=zl(n===void 0?e.length-1:n,0),function(){var r=arguments,i=-1,d=zl(r.length-n,0),c=Array(d);while(++i<d)c[i]=r[n+i];i=-1;var p=Array(n+1);while(++i<n)p[i]=r[i];return p[n]=s(c),Ul(e,this,p)}};
var Jn=xf;
function Mf(e){return function(){return e}};
var Hl=Mf;
var If=!o3t?s3t:function(e,n){return o3t(e,"toString",{configurable:!0,enumerable:!1,value:Hl(n),writable:!0})};
var Kl=If;
var Lf=800;
var Nf=16;
var Uf=Date.now;
function zf(e){var n=0,s=0;return function(){var r=Uf(),i=Nf-(r-s);if(s=r,i>0){if(++n>=Lf)return arguments[0]}else n=0;return e.apply(void 0,arguments)}};
var jl=zf;
var Hf=jl(Kl);
var qn=Hf;
var md=nB?nB.isConcatSpreadable:void 0;
function my(e){return vb(e)||a6e(e)||!!(md&&e&&e[md])};
var fd=my;
function hd(e,n,s,r,i){var d=-1,c=e.length;s||(s=fd),i||(i=[]);while(++d<c){var p=e[d];if(n>0&&s(p))if(n>1)hd(p,n-1,s,r,i);else bwt(i,p);else if(!r)i[i.length]=p}return i};
var yd=hd;
function fy(e){var n=e==null?0:e.length;return n?yd(e,1):[]};
var _d=fy;
function hy(e){return qn(Jn(e,void 0,_d),e+"")};
var eo=hy;
function Ey(e,n){return uor(e,n,function(s,r){return _sr(e,r)})};
var Sd=Ey;
var ky=eo(function(e,n){return e==null?{}:Sd(e,n)});
var _z=ky;
function Lwe(e,n,s){let i=new Set,d=[];for(let c of n){if(i.has(c))continue;if(i.add(c),Math.abs(c.length-e.length)>2)continue;let p=X8(e,c);if(p<=2)d.push({name:c,distance:p})}return d.sort((c,p)=>c.distance-p.distance).slice(0,s).map((c)=>c.name)};
function X8(e,n){if(e===n)return 0;let s=e.length,r=n.length,i=Array.from({length:s+1},(d,c)=>Array.from({length:r+1},(p,g)=>c===0?g:g===0?c:0));for(let d=1;d<=s;d++)for(let c=1;c<=r;c++){let p=e[d-1]===n[c-1]?0:1;if(i[d][c]=Math.min(i[d-1][c]+1,i[d][c-1]+1,i[d-1][c-1]+p),d>1&&c>1&&e[d-1]===n[c-2]&&e[d-2]===n[c-1])i[d][c]=Math.min(i[d][c],i[d-2][c-2]+1)}return i[s][r]};
return {KF,YF,Ac,Rc,tnr,Oc,di,N,nu,pnr,oZe,pYr,Ag,Df,Ul,zl,xf,Jn,Mf,Hl,If,Kl,Lf,Nf,Uf,zf,jl,Hf,qn,md,my,fd,hd,yd,fy,_d,hy,eo,Ey,Sd,ky,_z,Lwe,X8};
}
function module5(imports){
const N=imports["N"];
class Oe extends Error{name="HooksError";telemetryMessage="function hooks error (message not reported: it may contain plugin details)";thrownName};
function YVr(e){if(!(e instanceof Error))return;let r=e.cause;return typeof r==="string"?r:void 0};
function Syt(e,r="aborted"){let{reason:o}=e;return o instanceof Error?o.message:o===void 0?r:String(o)};
function jjt(e,r){if(!N(e))throw new Oe(`${r}: next() takes the event's argument: next(e) passes it on, next({ ...e, x }) rewrites it`);return e};
var xzo=(e)=>typeof e==="object"&&e!==null&&("aborted"in e)&&typeof e.addEventListener==="function"&&typeof e.removeEventListener==="function";
var PPe=(e)=>new Oe(`${e}: its environment was unloaded`);
return {Oe,YVr,Syt,jjt,xzo,PPe};
}
function module6(imports){
const D=imports["D"];
const N=imports["N"];
const W=imports["W"];
const Oe=imports["Oe"];
function gF(r){if(!N(r))return!1;let o=Object.getPrototypeOf(r);return o===null||!W(o)&&Object.getPrototypeOf(o)===null};
function I(){let r={log(){},hookFailed(){}};return{set:(o)=>{r=o},get:()=>r}};
var x=I();
var Ujt=x.set;
var nd=x.get;
var kzo=8;
var Rzo=256;
var l=65536;
function z(r){if(r===void 0)return"undefined";if(typeof r==="function")return"a function";if(typeof r==="object"&&r){let o=Object.prototype.toString.call(r).replace(/^\[object |\]$/g,"");return o==="Object"?"an object":`a ${o}`}return`a ${typeof r}`};
function y(r,o){if(typeof r!=="object"||!r||o.has(r))return;if(D(r))return;if(o.add(r),Array.isArray(r)){for(let t of r)y(t,o);Object.freeze(r);return}if(!gF(r))return;for(let t of Object.keys(r))y(r[t],o);Object.freeze(r)};
function RPe(r){return y(r,new Set),r};
function i(r){if(typeof r!=="object"||!r)return!1;try{return Reflect.get(RegExp.prototype,"source",r),!0}catch{return!1}};
var xPe=(r)=>gF(r)&&!i(r);
function s(r,o,t){if(Array.isArray(r))return Array.prototype.some.call(r,(e)=>s(e,o,t));if(Array.isArray(o))return Array.prototype.some.call(o,(e)=>s(r,e,t));if(typeof r!=="object"||r===null)return r===o;if(gF(r)){if(typeof o!=="object"||!o)return!1;for(let e of Object.keys(r))if(!Object.hasOwn(o,e)||!s(r[e],o[e],t))return!1;return!0}return i(r)&&t(r,String(o))};
function Bjt(r,o,t=""){let e;if(Array.isArray(r))return Array.prototype.some.call(r,(n)=>(e=Bjt(n,o,t),e!==void 0)),e;if(Array.isArray(o))return Array.prototype.some.call(o,(n)=>(e=Bjt(r,n,t),e!==void 0)),e;if(!xPe(r))return;if(o===null)return{path:t,kind:"null"};switch(typeof o){case"string":return{path:t,kind:"string"};case"number":return{path:t,kind:"number"};case"boolean":return{path:t,kind:"boolean"};case"bigint":return{path:t,kind:"bigint"};case"object":break;case"undefined":case"symbol":case"function":return}for(let n of Object.keys(r)){if(!Object.hasOwn(o,n))continue;if(e=Bjt(r[n],o[n],t===""?n:`${t}.${n}`),e!==void 0)return e}return};
function zVr(r,o,t){let e=t.path.split(".").at(-1)??t.path;return`hooks module ${r}: on('${o}') matcher at ${t.path} is a nested object, but e.${t.path} is a ${t.kind} there, which an object matcher can never match (a matcher has no operator keys); the hook will not run for it. A ${t.kind} is matched by the literal value or, as a string, by a RegExp, e.g. { ${e}: /^prefix/ }`};
var VVr=32;
var p="$$regex";
var T="__proto__";
var M=(r)=>/\([^()]*[+*?}]\)\s*[+*{]/.test(r);
var d=(r)=>r.includes("g")?"g":r.includes("y")?"y":void 0;
function E({source:r,flags:o,where:t,at:e}){let n=d(o);if(n)throw new Oe(`${t}: matcher${e} is a RegExp with the ${n} flag, which keeps state between tests; drop it`);if(M(r))throw new Oe(`${t}: matcher${e} is a RegExp with a nested quantifier (${r}), which can backtrack without bound; rewrite it`)};
var m=(r)=>({source:String(Reflect.get(RegExp.prototype,"source",r)),flags:String(Reflect.get(RegExp.prototype,"flags",r))});
function w(r,o,t){if(Object.hasOwn(r,T))throw new Oe(`${o}: matcher${t} has the key ${T}, which no event has`)};
function A(r,o,t){let e=t===""?"":` at ${t}`;if(i(r)){E({...m(r),where:o,at:e});return}if(Array.isArray(r)){Array.prototype.forEach.call(r,(n,u)=>A(n,o,`${t}[${u}]`));return}if(xPe(r)){if(Object.hasOwn(r,p))throw new Oe(`${o}: matcher${e} uses the reserved key ${p} (how a RegExp crosses the worker boundary); a RegExp goes in as a RegExp`);w(r,o,e);for(let[n,u]of Object.entries(r))A(u,o,t===""?n:`${t}.${n}`);return}switch(typeof r){case"string":if(r.length>l)throw new Oe(`${o}: matcher${e} is a string longer than ${l} characters, which cannot match`);return;case"number":case"boolean":return;case"object":if(!r)return;break;case"bigint":case"symbol":case"undefined":case"function":break}throw new Oe(`${o}: matcher${t===""?"":` at ${t}`} must be a string, a number, a boolean, null, a RegExp, an array of those, or a nested object; got ${z(r)}`)};
function tr(r,o){if(o.length>l)return nd().log(`matcher: a value of ${o.length} characters is past the ${l} a RegExp matcher reads; it matches, so the hook decides`),!0;if(d(m(r).flags))r.lastIndex=0;return RegExp.prototype.exec.call(r,o)!==null};
function k(r){if(i(r)){let{source:o,flags:t}=m(r);return{[p]:o,flags:t}}if(Array.isArray(r))return Array.prototype.map.call(r,k);if(xPe(r)){let o={};for(let[t,e]of Object.entries(r))o[t]=k(e);return o}return r};
var qVr=(r)=>r.map(({pattern:o,matcher:t})=>t===void 0?{pattern:o}:{pattern:o,matcher:k(t)});
var KVr=(r,o)=>s(r,o,()=>!0);
var FQ=(r,o,t)=>Array.isArray(r)?r.some((e)=>FQ(e,o,t)):!gF(r)||!Object.hasOwn(r,o)||KVr(r[o],t);
function jts(r,o){if(!xPe(r))throw new Oe(`${o}: the matcher must be a plain object (a partial of e)`);A(r,o,"")};
var _yt=(r,o)=>s(r,o,tr);
return {gF,I,x,Ujt,nd,kzo,Rzo,l,z,y,RPe,i,xPe,s,Bjt,zVr,VVr,p,T,M,d,E,m,w,A,tr,k,qVr,KVr,FQ,jts,_yt};
}
function module7(imports){

function Ys(){let t;return{set:(e)=>{t=e},get:()=>t}};
return {Ys};
}
function module8(imports){

var JA=4096;
return {JA};
}
function module9(imports){

function r(n){return n};
function bn(n){return r(n)};
return {r,bn};
}
function module10(imports){
const bn=imports["bn"];
var sEt=(n)=>{if(n instanceof Error)return n;if(typeof n==="object"&&n!==null){try{let e=Object.prototype.toString.call(n);if(e==="[object Error]"||e==="[object DOMException]"){let t=Error(n.message,n.cause?{cause:n.cause}:{});if(n.stack)t.stack=n.stack;if(n.cause&&!t.cause)t.cause=n.cause;if(n.name)t.name=n.name;return t}}catch{}try{return Error(JSON.stringify(n))}catch{}}return Error(n)};
var $n=(()=>{class n extends Error{}return n})();
class xt extends $n{constructor(n,e,t,r,o){super(`${xt.makeMessage(n,e,t)}`);this.status=n,this.headers=r,this.requestID=r?.get("request-id"),this.workspaceID=r?.get("anthropic-workspace-id"),this.error=e,this.type=o??null}static makeMessage(n,e,t){let r=e?.message?typeof e.message==="string"?e.message:JSON.stringify(e.message):e?JSON.stringify(e):t;if(n&&r)return`${n} ${r}`;if(n)return`${n} status code (no body)`;if(r)return r;return"(no status code or body)"}static generate(n,e,t,r){if(!n||!r)return new Jd({message:t,cause:sEt(e)});let o=e,i=o?.error?.type;if(n===400)return new iEt(n,o,t,r,i);if(n===401)return new rHe(n,o,t,r,i);if(n===403)return new aEt(n,o,t,r,i);if(n===404)return new oHe(n,o,t,r,i);if(n===409)return new lEt(n,o,t,r,i);if(n===422)return new cEt(n,o,t,r,i);if(n===429)return new dEt(n,o,t,r,i);if(n>=500)return new uEt(n,o,t,r,i);return new xt(n,o,t,r,i)}};
class Dd extends xt{constructor({message:n}={}){super(void 0,void 0,n||"Request was aborted.",void 0)}};
class Jd extends xt{constructor({message:n,cause:e}){super(void 0,void 0,n||"Connection error.",void 0);if(e)this.cause=e}};
class iEt extends xt{};
class rHe extends xt{};
class aEt extends xt{};
class oHe extends xt{};
class lEt extends xt{};
class cEt extends xt{};
class dEt extends xt{};
class uEt extends xt{};
class Ye extends Error{constructor(n){super(n);this.name="AbortError"}};
function at(n){try{return n instanceof Ye||n instanceof Dd||n instanceof Error&&(n.name==="AbortError"||("__CANCEL__"in n)&&Boolean(n.__CANCEL__))}catch{return!1}};
function l(n){return n instanceof Error?n.message:String(n)};
function Ng(n){let e=n?.name;return typeof e==="string"&&/^[A-Z][a-zA-Z]{0,63}$/.test(e)?bn(e):void 0};
return {sEt,$n,xt,Dd,Jd,iEt,rHe,aEt,oHe,lEt,cEt,dEt,uEt,Ye,at,l,Ng};
}
function module11(imports){

function G(n,e){let r=0;for(let t of n)r+=+!!e(t);return r};
function L(n){return[...new Set(n)]};
return {G,L};
}
function module12(imports){
const v=imports["v"];
var w7e=v(function(ge,gt){(function(b,Z){typeof ge==="object"&&typeof gt<"u"?Z(ge):typeof define==="function"&&define.amd?define(["exports"],Z):(b=typeof globalThis<"u"?globalThis:b||self,Z(b.acorn={}))})(ge,function(b){var Z=[509,0,227,0,150,4,294,9,1368,2,2,1,6,3,41,2,5,0,166,1,574,3,9,9,7,9,32,4,318,1,80,3,71,10,50,3,123,2,54,14,32,10,3,1,11,3,46,10,8,0,46,9,7,2,37,13,2,9,6,1,45,0,13,2,49,13,9,3,2,11,83,11,7,0,3,0,158,11,6,9,7,3,56,1,2,6,3,1,3,2,10,0,11,1,3,6,4,4,68,8,2,0,3,0,2,3,2,4,2,0,15,1,83,17,10,9,5,0,82,19,13,9,214,6,3,8,28,1,83,16,16,9,82,12,9,9,7,19,58,14,5,9,243,14,166,9,71,5,2,1,3,3,2,0,2,1,13,9,120,6,3,6,4,0,29,9,41,6,2,3,9,0,10,10,47,15,343,9,54,7,2,7,17,9,57,21,2,13,123,5,4,0,2,1,2,6,2,0,9,9,49,4,2,1,2,4,9,9,330,3,10,1,2,0,49,6,4,4,14,10,5350,0,7,14,11465,27,2343,9,87,9,39,4,60,6,26,9,535,9,470,0,2,54,8,3,82,0,12,1,19628,1,4178,9,519,45,3,22,543,4,4,5,9,7,3,6,31,3,149,2,1418,49,513,54,5,49,9,0,15,0,23,4,2,14,1361,6,2,16,3,6,2,1,2,4,101,0,161,6,10,9,357,0,62,13,499,13,245,1,2,9,726,6,110,6,6,9,4759,9,787719,239],Te=[0,11,2,25,2,18,2,1,2,14,3,13,35,122,70,52,268,28,4,48,48,31,14,29,6,37,11,29,3,35,5,7,2,4,43,157,19,35,5,35,5,39,9,51,13,10,2,14,2,6,2,1,2,10,2,14,2,6,2,1,4,51,13,310,10,21,11,7,25,5,2,41,2,8,70,5,3,0,2,43,2,1,4,0,3,22,11,22,10,30,66,18,2,1,11,21,11,25,71,55,7,1,65,0,16,3,2,2,2,28,43,28,4,28,36,7,2,27,28,53,11,21,11,18,14,17,111,72,56,50,14,50,14,35,39,27,10,22,251,41,7,1,17,2,60,28,11,0,9,21,43,17,47,20,28,22,13,52,58,1,3,0,14,44,33,24,27,35,30,0,3,0,9,34,4,0,13,47,15,3,22,0,2,0,36,17,2,24,20,1,64,6,2,0,2,3,2,14,2,9,8,46,39,7,3,1,3,21,2,6,2,1,2,4,4,0,19,0,13,4,31,9,2,0,3,0,2,37,2,0,26,0,2,0,45,52,19,3,21,2,31,47,21,1,2,0,185,46,42,3,37,47,21,0,60,42,14,0,72,26,38,6,186,43,117,63,32,7,3,0,3,7,2,1,2,23,16,0,2,0,95,7,3,38,17,0,2,0,29,0,11,39,8,0,22,0,12,45,20,0,19,72,200,32,32,8,2,36,18,0,50,29,113,6,2,1,2,37,22,0,26,5,2,1,2,31,15,0,328,18,16,0,2,12,2,33,125,0,80,921,103,110,18,195,2637,96,16,1071,18,5,26,3994,6,582,6842,29,1763,568,8,30,18,78,18,29,19,47,17,3,32,20,6,18,433,44,212,63,129,74,6,0,67,12,65,1,2,0,29,6135,9,1237,42,9,8936,3,2,6,2,1,2,290,16,0,30,2,3,0,15,3,9,395,2309,106,6,12,4,8,8,9,5991,84,2,70,2,1,3,0,3,1,3,3,2,11,2,0,2,6,2,64,2,3,3,7,2,6,2,27,2,3,2,4,2,0,4,6,2,339,3,24,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,7,1845,30,7,5,262,61,147,44,11,6,17,0,322,29,19,43,485,27,229,29,3,0,496,6,2,3,2,1,2,14,2,196,60,67,8,0,1205,3,2,26,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,16,6,2,2,4,2,16,4421,42719,33,4153,7,221,3,5761,15,7472,16,621,2467,541,1507,4938,6,4191],bt="\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0897-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0CF3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1ACE\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\u30FB\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F\uFF65",Le="\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC",be={3:"abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",5:"class enum extends super const export import",6:"enum",strict:"implements interface let package private protected public static yield",strictBind:"eval arguments"},ye="break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this",yt={5:ye,"5module":ye+" export import",6:ye+" const class extends export import super"},_t=/^in(stanceof)?$/,Ct=new RegExp("["+Le+"]"),St=new RegExp("["+Le+bt+"]");function _e(e,t){var i=65536;for(var s=0;s<t.length;s+=2){if(i+=t[s],i>e)return!1;if(i+=t[s+1],i>=e)return!0}return!1}function L(e,t){if(e<65)return e===36;if(e<91)return!0;if(e<97)return e===95;if(e<123)return!0;if(e<=65535)return e>=170&&Ct.test(String.fromCharCode(e));if(t===!1)return!1;return _e(e,Te)}function B(e,t){if(e<48)return e===36;if(e<58)return!0;if(e<65)return!1;if(e<91)return!0;if(e<97)return e===95;if(e<123)return!0;if(e<=65535)return e>=170&&St.test(String.fromCharCode(e));if(t===!1)return!1;return _e(e,Te)||_e(e,Z)}var g=function(t,i){if(i===void 0)i={};this.label=t,this.keyword=i.keyword,this.beforeExpr=!!i.beforeExpr,this.startsExpr=!!i.startsExpr,this.isLoop=!!i.isLoop,this.isAssign=!!i.isAssign,this.prefix=!!i.prefix,this.postfix=!!i.postfix,this.binop=i.binop||null,this.updateContext=null};function E(e,t){return new g(e,{beforeExpr:!0,binop:t})}var P={beforeExpr:!0},I={startsExpr:!0},ne={};function m(e,t){if(t===void 0)t={};return t.keyword=e,ne[e]=new g(e,t)}var a={num:new g("num",I),regexp:new g("regexp",I),string:new g("string",I),name:new g("name",I),privateId:new g("privateId",I),eof:new g("eof"),bracketL:new g("[",{beforeExpr:!0,startsExpr:!0}),bracketR:new g("]"),braceL:new g("{",{beforeExpr:!0,startsExpr:!0}),braceR:new g("}"),parenL:new g("(",{beforeExpr:!0,startsExpr:!0}),parenR:new g(")"),comma:new g(",",P),semi:new g(";",P),colon:new g(":",P),dot:new g("."),question:new g("?",P),questionDot:new g("?."),arrow:new g("=>",P),template:new g("template"),invalidTemplate:new g("invalidTemplate"),ellipsis:new g("...",P),backQuote:new g("`",I),dollarBraceL:new g("${",{beforeExpr:!0,startsExpr:!0}),eq:new g("=",{beforeExpr:!0,isAssign:!0}),assign:new g("_=",{beforeExpr:!0,isAssign:!0}),incDec:new g("++/--",{prefix:!0,postfix:!0,startsExpr:!0}),prefix:new g("!/~",{beforeExpr:!0,prefix:!0,startsExpr:!0}),logicalOR:E("||",1),logicalAND:E("&&",2),bitwiseOR:E("|",3),bitwiseXOR:E("^",4),bitwiseAND:E("&",5),equality:E("==/!=/===/!==",6),relational:E("</>/<=/>=",7),bitShift:E("<</>>/>>>",8),plusMin:new g("+/-",{beforeExpr:!0,binop:9,prefix:!0,startsExpr:!0}),modulo:E("%",10),star:E("*",10),slash:E("/",10),starstar:new g("**",{beforeExpr:!0}),coalesce:E("??",1),_break:m("break"),_case:m("case",P),_catch:m("catch"),_continue:m("continue"),_debugger:m("debugger"),_default:m("default",P),_do:m("do",{isLoop:!0,beforeExpr:!0}),_else:m("else",P),_finally:m("finally"),_for:m("for",{isLoop:!0}),_function:m("function",I),_if:m("if"),_return:m("return",P),_switch:m("switch"),_throw:m("throw",P),_try:m("try"),_var:m("var"),_const:m("const"),_while:m("while",{isLoop:!0}),_with:m("with"),_new:m("new",{beforeExpr:!0,startsExpr:!0}),_this:m("this",I),_super:m("super",I),_class:m("class",I),_extends:m("extends",P),_export:m("export"),_import:m("import",I),_null:m("null",I),_true:m("true",I),_false:m("false",I),_in:m("in",{beforeExpr:!0,binop:7}),_instanceof:m("instanceof",{beforeExpr:!0,binop:7}),_typeof:m("typeof",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_void:m("void",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_delete:m("delete",{beforeExpr:!0,prefix:!0,startsExpr:!0})},w=/\r\n?|\n|\u2028|\u2029/,Re=new RegExp(w.source,"g");function j(e){return e===10||e===13||e===8232||e===8233}function Oe(e,t,i){if(i===void 0)i=e.length;for(var s=t;s<i;s++){var r=e.charCodeAt(s);if(j(r))return s<i-1&&r===13&&e.charCodeAt(s+1)===10?s+2:s+1}return-1}var Ce=/[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/,S=/(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,Be=Object.prototype,{hasOwnProperty:kt,toString:wt}=Be,H=Object.hasOwn||function(e,t){return kt.call(e,t)},De=Array.isArray||function(e){return wt.call(e)==="[object Array]"},Fe=Object.create(null);function U(e){return Fe[e]||(Fe[e]=new RegExp("^(?:"+e.replace(/ /g,"|")+")$"))}function D(e){if(e<=65535)return String.fromCharCode(e);return e-=65536,String.fromCharCode((e>>10)+55296,(e&1023)+56320)}var At=/(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/,W=function(t,i){this.line=t,this.column=i};W.prototype.offset=function(t){return new W(this.line,this.column+t)};var J=function(t,i,s){if(this.start=i,this.end=s,t.sourceFile!==null)this.source=t.sourceFile};function Se(e,t){for(var i=1,s=0;;){var r=Oe(e,s,t);if(r<0)return new W(i,t-s);++i,s=r}}var ue={ecmaVersion:null,sourceType:"script",onInsertedSemicolon:null,onTrailingComma:null,allowReserved:null,allowReturnOutsideFunction:!1,allowImportExportEverywhere:!1,allowAwaitOutsideFunction:null,allowSuperOutsideMethod:null,allowHashBang:!1,checkPrivateFields:!0,locations:!1,onToken:null,onComment:null,ranges:!1,program:null,sourceFile:null,directSourceFile:null,preserveParens:!1},Me=!1;function It(e){var t={};for(var i in ue)t[i]=e&&H(e,i)?e[i]:ue[i];if(t.ecmaVersion==="latest")t.ecmaVersion=1e8;else if(t.ecmaVersion==null){if(!Me&&typeof console==="object"&&console.warn)Me=!0,console.warn(`Since Acorn 8.0.0, options.ecmaVersion is required.
Defaulting to 2020, but this will stop working in the future.`);t.ecmaVersion=11}else if(t.ecmaVersion>=2015)t.ecmaVersion-=2009;if(t.allowReserved==null)t.allowReserved=t.ecmaVersion<5;if(!e||e.allowHashBang==null)t.allowHashBang=t.ecmaVersion>=14;if(De(t.onToken)){var s=t.onToken;t.onToken=function(r){return s.push(r)}}if(De(t.onComment))t.onComment=Et(t,t.onComment);return t}function Et(e,t){return function(i,s,r,n,u,o){var h={type:i?"Block":"Line",value:s,start:r,end:n};if(e.locations)h.loc=new J(this,u,o);if(e.ranges)h.range=[r,n];t.push(h)}}var ee=1,z=2,ke=4,Ue=8,we=16,qe=32,oe=64,je=128,G=256,te=512,he=ee|z|G;function Ae(e,t){return z|(e?ke:0)|(t?Ue:0)}var ce=0,Ie=1,F=2,Ge=3,He=4,We=5,C=function(t,i,s){this.options=t=It(t),this.sourceFile=t.sourceFile,this.keywords=U(yt[t.ecmaVersion>=6?6:t.sourceType==="module"?"5module":5]);var r="";if(t.allowReserved!==!0){if(r=be[t.ecmaVersion>=6?6:t.ecmaVersion===5?5:3],t.sourceType==="module")r+=" await"}this.reservedWords=U(r);var n=(r?r+" ":"")+be.strict;if(this.reservedWordsStrict=U(n),this.reservedWordsStrictBind=U(n+" "+be.strictBind),this.input=String(i),this.containsEsc=!1,s)this.pos=s,this.lineStart=this.input.lastIndexOf(`
`,s-1)+1,this.curLine=this.input.slice(0,this.lineStart).split(w).length;else this.pos=this.lineStart=0,this.curLine=1;if(this.type=a.eof,this.value=null,this.start=this.end=this.pos,this.startLoc=this.endLoc=this.curPosition(),this.lastTokEndLoc=this.lastTokStartLoc=null,this.lastTokStart=this.lastTokEnd=this.pos,this.context=this.initialContext(),this.exprAllowed=!0,this.inModule=t.sourceType==="module",this.strict=this.inModule||this.strictDirective(this.pos),this.potentialArrowAt=-1,this.potentialArrowInForAwait=!1,this.yieldPos=this.awaitPos=this.awaitIdentPos=0,this.labels=[],this.undefinedExports=Object.create(null),this.pos===0&&t.allowHashBang&&this.input.slice(0,2)==="#!")this.skipLineComment(2);this.scopeStack=[],this.enterScope(ee),this.regexpState=null,this.privateNameStack=[]},R={inFunction:{configurable:!0},inGenerator:{configurable:!0},inAsync:{configurable:!0},canAwait:{configurable:!0},allowSuper:{configurable:!0},allowDirectSuper:{configurable:!0},treatFunctionsAsVar:{configurable:!0},allowNewDotTarget:{configurable:!0},inClassStaticBlock:{configurable:!0}};C.prototype.parse=function(){var t=this.options.program||this.startNode();return this.nextToken(),this.parseTopLevel(t)},R.inFunction.get=function(){return(this.currentVarScope().flags&z)>0},R.inGenerator.get=function(){return(this.currentVarScope().flags&Ue)>0},R.inAsync.get=function(){return(this.currentVarScope().flags&ke)>0},R.canAwait.get=function(){for(var e=this.scopeStack.length-1;e>=0;e--){var t=this.scopeStack[e],i=t.flags;if(i&(G|te))return!1;if(i&z)return(i&ke)>0}return this.inModule&&this.options.ecmaVersion>=13||this.options.allowAwaitOutsideFunction},R.allowSuper.get=function(){var e=this.currentThisScope(),t=e.flags;return(t&oe)>0||this.options.allowSuperOutsideMethod},R.allowDirectSuper.get=function(){return(this.currentThisScope().flags&je)>0},R.treatFunctionsAsVar.get=function(){return this.treatFunctionsAsVarInScope(this.currentScope())},R.allowNewDotTarget.get=function(){for(var e=this.scopeStack.length-1;e>=0;e--){var t=this.scopeStack[e],i=t.flags;if(i&(G|te)||i&z&&!(i&we))return!0}return!1},R.inClassStaticBlock.get=function(){return(this.currentVarScope().flags&G)>0},C.extend=function(){var t=[],i=arguments.length;while(i--)t[i]=arguments[i];var s=this;for(var r=0;r<t.length;r++)s=t[r](s);return s},C.parse=function(t,i){return new this(i,t).parse()},C.parseExpressionAt=function(t,i,s){var r=new this(s,t,i);return r.nextToken(),r.parseExpression()},C.tokenizer=function(t,i){return new this(i,t)},Object.defineProperties(C.prototype,R);var A=C.prototype,Pt=/^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;A.strictDirective=function(e){if(this.options.ecmaVersion<5)return!1;for(;;){S.lastIndex=e,e+=S.exec(this.input)[0].length;var t=Pt.exec(this.input.slice(e));if(!t)return!1;if((t[1]||t[2])==="use strict"){S.lastIndex=e+t[0].length;var i=S.exec(this.input),s=i.index+i[0].length,r=this.input.charAt(s);return r===";"||r==="}"||w.test(i[0])&&!(/[(`.[+\-/*%<>=,?^&]/.test(r)||r==="!"&&this.input.charAt(s+1)==="=")}if(e+=t[0].length,S.lastIndex=e,e+=S.exec(this.input)[0].length,this.input[e]===";")e++}},A.eat=function(e){if(this.type===e)return this.next(),!0;else return!1},A.isContextual=function(e){return this.type===a.name&&this.value===e&&!this.containsEsc},A.eatContextual=function(e){if(!this.isContextual(e))return!1;return this.next(),!0},A.expectContextual=function(e){if(!this.eatContextual(e))this.unexpected()},A.canInsertSemicolon=function(){return this.type===a.eof||this.type===a.braceR||w.test(this.input.slice(this.lastTokEnd,this.start))},A.insertSemicolon=function(){if(this.canInsertSemicolon()){if(this.options.onInsertedSemicolon)this.options.onInsertedSemicolon(this.lastTokEnd,this.lastTokEndLoc);return!0}},A.semicolon=function(){if(!this.eat(a.semi)&&!this.insertSemicolon())this.unexpected()},A.afterTrailingComma=function(e,t){if(this.type===e){if(this.options.onTrailingComma)this.options.onTrailingComma(this.lastTokStart,this.lastTokStartLoc);if(!t)this.next();return!0}},A.expect=function(e){this.eat(e)||this.unexpected()},A.unexpected=function(e){this.raise(e!=null?e:this.start,"Unexpected token")};var pe=function(){this.shorthandAssign=this.trailingComma=this.parenthesizedAssign=this.parenthesizedBind=this.doubleProto=-1};A.checkPatternErrors=function(e,t){if(!e)return;if(e.trailingComma>-1)this.raiseRecoverable(e.trailingComma,"Comma is not permitted after the rest element");var i=t?e.parenthesizedAssign:e.parenthesizedBind;if(i>-1)this.raiseRecoverable(i,t?"Assigning to rvalue":"Parenthesized pattern")},A.checkExpressionErrors=function(e,t){if(!e)return!1;var{shorthandAssign:i,doubleProto:s}=e;if(!t)return i>=0||s>=0;if(i>=0)this.raise(i,"Shorthand property assignments are valid only in destructuring patterns");if(s>=0)this.raiseRecoverable(s,"Redefinition of __proto__ property")},A.checkYieldAwaitInDefaultParams=function(){if(this.yieldPos&&(!this.awaitPos||this.yieldPos<this.awaitPos))this.raise(this.yieldPos,"Yield expression cannot be a default value");if(this.awaitPos)this.raise(this.awaitPos,"Await expression cannot be a default value")},A.isSimpleAssignTarget=function(e){if(e.type==="ParenthesizedExpression")return this.isSimpleAssignTarget(e.expression);return e.type==="Identifier"||e.type==="MemberExpression"};var p=C.prototype;p.parseTopLevel=function(e){var t=Object.create(null);if(!e.body)e.body=[];while(this.type!==a.eof){var i=this.parseStatement(null,!0,t);e.body.push(i)}if(this.inModule)for(var s=0,r=Object.keys(this.undefinedExports);s<r.length;s+=1){var n=r[s];this.raiseRecoverable(this.undefinedExports[n].start,"Export '"+n+"' is not defined")}return this.adaptDirectivePrologue(e.body),this.next(),e.sourceType=this.options.sourceType,this.finishNode(e,"Program")};var Ee={kind:"loop"},Nt={kind:"switch"};p.isLet=function(e){if(this.options.ecmaVersion<6||!this.isContextual("let"))return!1;S.lastIndex=this.pos;var t=S.exec(this.input),i=this.pos+t[0].length,s=this.input.charCodeAt(i);if(s===91||s===92)return!0;if(e)return!1;if(s===123||s>55295&&s<56320)return!0;if(L(s,!0)){var r=i+1;while(B(s=this.input.charCodeAt(r),!0))++r;if(s===92||s>55295&&s<56320)return!0;var n=this.input.slice(i,r);if(!_t.test(n))return!0}return!1},p.isAsyncFunction=function(){if(this.options.ecmaVersion<8||!this.isContextual("async"))return!1;S.lastIndex=this.pos;var e=S.exec(this.input),t=this.pos+e[0].length,i;return!w.test(this.input.slice(this.pos,t))&&this.input.slice(t,t+8)==="function"&&(t+8===this.input.length||!(B(i=this.input.charCodeAt(t+8))||i>55295&&i<56320))},p.isUsingKeyword=function(e,t){if(this.options.ecmaVersion<17||!this.isContextual(e?"await":"using"))return!1;S.lastIndex=this.pos;var i=S.exec(this.input),s=this.pos+i[0].length;if(w.test(this.input.slice(this.pos,s)))return!1;if(e){var r=s+5,n;if(this.input.slice(s,r)!=="using"||r===this.input.length||B(n=this.input.charCodeAt(r))||n>55295&&n<56320)return!1;S.lastIndex=r;var u=S.exec(this.input);if(u&&w.test(this.input.slice(r,r+u[0].length)))return!1}if(t){var o=s+2,h;if(this.input.slice(s,o)==="of"){if(o===this.input.length||!B(h=this.input.charCodeAt(o))&&!(h>55295&&h<56320))return!1}}var l=this.input.charCodeAt(s);return L(l,!0)||l===92},p.isAwaitUsing=function(e){return this.isUsingKeyword(!0,e)},p.isUsing=function(e){return this.isUsingKeyword(!1,e)},p.parseStatement=function(e,t,i){var s=this.type,r=this.startNode(),n;if(this.isLet(e))s=a._var,n="let";switch(s){case a._break:case a._continue:return this.parseBreakContinueStatement(r,s.keyword);case a._debugger:return this.parseDebuggerStatement(r);case a._do:return this.parseDoStatement(r);case a._for:return this.parseForStatement(r);case a._function:if(e&&(this.strict||e!=="if"&&e!=="label")&&this.options.ecmaVersion>=6)this.unexpected();return this.parseFunctionStatement(r,!1,!e);case a._class:if(e)this.unexpected();return this.parseClass(r,!0);case a._if:return this.parseIfStatement(r);case a._return:return this.parseReturnStatement(r);case a._switch:return this.parseSwitchStatement(r);case a._throw:return this.parseThrowStatement(r);case a._try:return this.parseTryStatement(r);case a._const:case a._var:if(n=n||this.value,e&&n!=="var")this.unexpected();return this.parseVarStatement(r,n);case a._while:return this.parseWhileStatement(r);case a._with:return this.parseWithStatement(r);case a.braceL:return this.parseBlock(!0,r);case a.semi:return this.parseEmptyStatement(r);case a._export:case a._import:if(this.options.ecmaVersion>10&&s===a._import){S.lastIndex=this.pos;var u=S.exec(this.input),o=this.pos+u[0].length,h=this.input.charCodeAt(o);if(h===40||h===46)return this.parseExpressionStatement(r,this.parseExpression())}if(!this.options.allowImportExportEverywhere){if(!t)this.raise(this.start,"'import' and 'export' may only appear at the top level");if(!this.inModule)this.raise(this.start,"'import' and 'export' may appear only with 'sourceType: module'")}return s===a._import?this.parseImport(r):this.parseExport(r,i);default:if(this.isAsyncFunction()){if(e)this.unexpected();return this.next(),this.parseFunctionStatement(r,!0,!e)}var l=this.isAwaitUsing(!1)?"await using":this.isUsing(!1)?"using":null;if(l){if(t&&this.options.sourceType==="script")this.raise(this.start,"Using declaration cannot appear in the top level when source type is `script`");if(l==="await using"){if(!this.canAwait)this.raise(this.start,"Await using cannot appear outside of async function");this.next()}return this.next(),this.parseVar(r,!1,l),this.semicolon(),this.finishNode(r,"VariableDeclaration")}var d=this.value,_=this.parseExpression();if(s===a.name&&_.type==="Identifier"&&this.eat(a.colon))return this.parseLabeledStatement(r,d,_,e);else return this.parseExpressionStatement(r,_)}},p.parseBreakContinueStatement=function(e,t){var i=t==="break";if(this.next(),this.eat(a.semi)||this.insertSemicolon())e.label=null;else if(this.type!==a.name)this.unexpected();else e.label=this.parseIdent(),this.semicolon();var s=0;for(;s<this.labels.length;++s){var r=this.labels[s];if(e.label==null||r.name===e.label.name){if(r.kind!=null&&(i||r.kind==="loop"))break;if(e.label&&i)break}}if(s===this.labels.length)this.raise(e.start,"Unsyntactic "+t);return this.finishNode(e,i?"BreakStatement":"ContinueStatement")},p.parseDebuggerStatement=function(e){return this.next(),this.semicolon(),this.finishNode(e,"DebuggerStatement")},p.parseDoStatement=function(e){if(this.next(),this.labels.push(Ee),e.body=this.parseStatement("do"),this.labels.pop(),this.expect(a._while),e.test=this.parseParenExpression(),this.options.ecmaVersion>=6)this.eat(a.semi);else this.semicolon();return this.finishNode(e,"DoWhileStatement")},p.parseForStatement=function(e){this.next();var t=this.options.ecmaVersion>=9&&this.canAwait&&this.eatContextual("await")?this.lastTokStart:-1;if(this.labels.push(Ee),this.enterScope(0),this.expect(a.parenL),this.type===a.semi){if(t>-1)this.unexpected(t);return this.parseFor(e,null)}var i=this.isLet();if(this.type===a._var||this.type===a._const||i){var s=this.startNode(),r=i?"let":this.value;return this.next(),this.parseVar(s,!0,r),this.finishNode(s,"VariableDeclaration"),this.parseForAfterInit(e,s,t)}var n=this.isContextual("let"),u=!1,o=this.isUsing(!0)?"using":this.isAwaitUsing(!0)?"await using":null;if(o){var h=this.startNode();if(this.next(),o==="await using")this.next();return this.parseVar(h,!0,o),this.finishNode(h,"VariableDeclaration"),this.parseForAfterInit(e,h,t)}var l=this.containsEsc,d=new pe,_=this.start,k=t>-1?this.parseExprSubscripts(d,"await"):this.parseExpression(!0,d);if(this.type===a._in||(u=this.options.ecmaVersion>=6&&this.isContextual("of"))){if(t>-1){if(this.type===a._in)this.unexpected(t);e.await=!0}else if(u&&this.options.ecmaVersion>=8){if(k.start===_&&!l&&k.type==="Identifier"&&k.name==="async")this.unexpected();else if(this.options.ecmaVersion>=9)e.await=!1}if(n&&u)this.raise(k.start,"The left-hand side of a for-of loop may not start with 'let'.");return this.toAssignable(k,!1,d),this.checkLValPattern(k),this.parseForIn(e,k)}else this.checkExpressionErrors(d,!0);if(t>-1)this.unexpected(t);return this.parseFor(e,k)},p.parseForAfterInit=function(e,t,i){if((this.type===a._in||this.options.ecmaVersion>=6&&this.isContextual("of"))&&t.declarations.length===1){if(this.options.ecmaVersion>=9)if(this.type===a._in){if(i>-1)this.unexpected(i)}else e.await=i>-1;return this.parseForIn(e,t)}if(i>-1)this.unexpected(i);return this.parseFor(e,t)},p.parseFunctionStatement=function(e,t,i){return this.next(),this.parseFunction(e,ie|(i?0:Pe),!1,t)},p.parseIfStatement=function(e){return this.next(),e.test=this.parseParenExpression(),e.consequent=this.parseStatement("if"),e.alternate=this.eat(a._else)?this.parseStatement("if"):null,this.finishNode(e,"IfStatement")},p.parseReturnStatement=function(e){if(!this.inFunction&&!this.options.allowReturnOutsideFunction)this.raise(this.start,"'return' outside of function");if(this.next(),this.eat(a.semi)||this.insertSemicolon())e.argument=null;else e.argument=this.parseExpression(),this.semicolon();return this.finishNode(e,"ReturnStatement")},p.parseSwitchStatement=function(e){this.next(),e.discriminant=this.parseParenExpression(),e.cases=[],this.expect(a.braceL),this.labels.push(Nt),this.enterScope(0);var t;for(var i=!1;this.type!==a.braceR;)if(this.type===a._case||this.type===a._default){var s=this.type===a._case;if(t)this.finishNode(t,"SwitchCase");if(e.cases.push(t=this.startNode()),t.consequent=[],this.next(),s)t.test=this.parseExpression();else{if(i)this.raiseRecoverable(this.lastTokStart,"Multiple default clauses");i=!0,t.test=null}this.expect(a.colon)}else{if(!t)this.unexpected();t.consequent.push(this.parseStatement(null))}if(this.exitScope(),t)this.finishNode(t,"SwitchCase");return this.next(),this.labels.pop(),this.finishNode(e,"SwitchStatement")},p.parseThrowStatement=function(e){if(this.next(),w.test(this.input.slice(this.lastTokEnd,this.start)))this.raise(this.lastTokEnd,"Illegal newline after throw");return e.argument=this.parseExpression(),this.semicolon(),this.finishNode(e,"ThrowStatement")};var Vt=[];p.parseCatchClauseParam=function(){var e=this.parseBindingAtom(),t=e.type==="Identifier";return this.enterScope(t?qe:0),this.checkLValPattern(e,t?He:F),this.expect(a.parenR),e},p.parseTryStatement=function(e){if(this.next(),e.block=this.parseBlock(),e.handler=null,this.type===a._catch){var t=this.startNode();if(this.next(),this.eat(a.parenL))t.param=this.parseCatchClauseParam();else{if(this.options.ecmaVersion<10)this.unexpected();t.param=null,this.enterScope(0)}t.body=this.parseBlock(!1),this.exitScope(),e.handler=this.finishNode(t,"CatchClause")}if(e.finalizer=this.eat(a._finally)?this.parseBlock():null,!e.handler&&!e.finalizer)this.raise(e.start,"Missing catch or finally clause");return this.finishNode(e,"TryStatement")},p.parseVarStatement=function(e,t,i){return this.next(),this.parseVar(e,!1,t,i),this.semicolon(),this.finishNode(e,"VariableDeclaration")},p.parseWhileStatement=function(e){return this.next(),e.test=this.parseParenExpression(),this.labels.push(Ee),e.body=this.parseStatement("while"),this.labels.pop(),this.finishNode(e,"WhileStatement")},p.parseWithStatement=function(e){if(this.strict)this.raise(this.start,"'with' in strict mode");return this.next(),e.object=this.parseParenExpression(),e.body=this.parseStatement("with"),this.finishNode(e,"WithStatement")},p.parseEmptyStatement=function(e){return this.next(),this.finishNode(e,"EmptyStatement")},p.parseLabeledStatement=function(e,t,i,s){for(var r=0,n=this.labels;r<n.length;r+=1){var u=n[r];if(u.name===t)this.raise(i.start,"Label '"+t+"' is already declared")}var o=this.type.isLoop?"loop":this.type===a._switch?"switch":null;for(var h=this.labels.length-1;h>=0;h--){var l=this.labels[h];if(l.statementStart===e.start)l.statementStart=this.start,l.kind=o;else break}return this.labels.push({name:t,kind:o,statementStart:this.start}),e.body=this.parseStatement(s?s.indexOf("label")===-1?s+"label":s:"label"),this.labels.pop(),e.label=i,this.finishNode(e,"LabeledStatement")},p.parseExpressionStatement=function(e,t){return e.expression=t,this.semicolon(),this.finishNode(e,"ExpressionStatement")},p.parseBlock=function(e,t,i){if(e===void 0)e=!0;if(t===void 0)t=this.startNode();if(t.body=[],this.expect(a.braceL),e)this.enterScope(0);while(this.type!==a.braceR){var s=this.parseStatement(null);t.body.push(s)}if(i)this.strict=!1;if(this.next(),e)this.exitScope();return this.finishNode(t,"BlockStatement")},p.parseFor=function(e,t){return e.init=t,this.expect(a.semi),e.test=this.type===a.semi?null:this.parseExpression(),this.expect(a.semi),e.update=this.type===a.parenR?null:this.parseExpression(),this.expect(a.parenR),e.body=this.parseStatement("for"),this.exitScope(),this.labels.pop(),this.finishNode(e,"ForStatement")},p.parseForIn=function(e,t){var i=this.type===a._in;if(this.next(),t.type==="VariableDeclaration"&&t.declarations[0].init!=null&&(!i||this.options.ecmaVersion<8||this.strict||t.kind!=="var"||t.declarations[0].id.type!=="Identifier"))this.raise(t.start,(i?"for-in":"for-of")+" loop variable declaration may not have an initializer");return e.left=t,e.right=i?this.parseExpression():this.parseMaybeAssign(),this.expect(a.parenR),e.body=this.parseStatement("for"),this.exitScope(),this.labels.pop(),this.finishNode(e,i?"ForInStatement":"ForOfStatement")},p.parseVar=function(e,t,i,s){e.declarations=[],e.kind=i;for(;;){var r=this.startNode();if(this.parseVarId(r,i),this.eat(a.eq))r.init=this.parseMaybeAssign(t);else if(!s&&i==="const"&&!(this.type===a._in||this.options.ecmaVersion>=6&&this.isContextual("of")))this.unexpected();else if(!s&&(i==="using"||i==="await using")&&this.options.ecmaVersion>=17&&this.type!==a._in&&!this.isContextual("of"))this.raise(this.lastTokEnd,"Missing initializer in "+i+" declaration");else if(!s&&r.id.type!=="Identifier"&&!(t&&(this.type===a._in||this.isContextual("of"))))this.raise(this.lastTokEnd,"Complex binding patterns require an initialization value");else r.init=null;if(e.declarations.push(this.finishNode(r,"VariableDeclarator")),!this.eat(a.comma))break}return e},p.parseVarId=function(e,t){e.id=t==="using"||t==="await using"?this.parseIdent():this.parseBindingAtom(),this.checkLValPattern(e.id,t==="var"?Ie:F,!1)};var ie=1,Pe=2,ze=4;p.parseFunction=function(e,t,i,s,r){if(this.initFunction(e),this.options.ecmaVersion>=9||this.options.ecmaVersion>=6&&!s){if(this.type===a.star&&t&Pe)this.unexpected();e.generator=this.eat(a.star)}if(this.options.ecmaVersion>=8)e.async=!!s;if(t&ie){if(e.id=t&ze&&this.type!==a.name?null:this.parseIdent(),e.id&&!(t&Pe))this.checkLValSimple(e.id,this.strict||e.generator||e.async?this.treatFunctionsAsVar?Ie:F:Ge)}var n=this.yieldPos,u=this.awaitPos,o=this.awaitIdentPos;if(this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,this.enterScope(Ae(e.async,e.generator)),!(t&ie))e.id=this.type===a.name?this.parseIdent():null;return this.parseFunctionParams(e),this.parseFunctionBody(e,i,!1,r),this.yieldPos=n,this.awaitPos=u,this.awaitIdentPos=o,this.finishNode(e,t&ie?"FunctionDeclaration":"FunctionExpression")},p.parseFunctionParams=function(e){this.expect(a.parenL),e.params=this.parseBindingList(a.parenR,!1,this.options.ecmaVersion>=8),this.checkYieldAwaitInDefaultParams()},p.parseClass=function(e,t){this.next();var i=this.strict;this.strict=!0,this.parseClassId(e,t),this.parseClassSuper(e);var s=this.enterClassBody(),r=this.startNode(),n=!1;r.body=[],this.expect(a.braceL);while(this.type!==a.braceR){var u=this.parseClassElement(e.superClass!==null);if(u){if(r.body.push(u),u.type==="MethodDefinition"&&u.kind==="constructor"){if(n)this.raiseRecoverable(u.start,"Duplicate constructor in the same class");n=!0}else if(u.key&&u.key.type==="PrivateIdentifier"&&Tt(s,u))this.raiseRecoverable(u.key.start,"Identifier '#"+u.key.name+"' has already been declared")}}return this.strict=i,this.next(),e.body=this.finishNode(r,"ClassBody"),this.exitClassBody(),this.finishNode(e,t?"ClassDeclaration":"ClassExpression")},p.parseClassElement=function(e){if(this.eat(a.semi))return null;var t=this.options.ecmaVersion,i=this.startNode(),s="",r=!1,n=!1,u="method",o=!1;if(this.eatContextual("static")){if(t>=13&&this.eat(a.braceL))return this.parseClassStaticBlock(i),i;if(this.isClassElementNameStart()||this.type===a.star)o=!0;else s="static"}if(i.static=o,!s&&t>=8&&this.eatContextual("async"))if((this.isClassElementNameStart()||this.type===a.star)&&!this.canInsertSemicolon())n=!0;else s="async";if(!s&&(t>=9||!n)&&this.eat(a.star))r=!0;if(!s&&!n&&!r){var h=this.value;if(this.eatContextual("get")||this.eatContextual("set"))if(this.isClassElementNameStart())u=h;else s=h}if(s)i.computed=!1,i.key=this.startNodeAt(this.lastTokStart,this.lastTokStartLoc),i.key.name=s,this.finishNode(i.key,"Identifier");else this.parseClassElementName(i);if(t<13||this.type===a.parenL||u!=="method"||r||n){var l=!i.static&&le(i,"constructor"),d=l&&e;if(l&&u!=="method")this.raise(i.key.start,"Constructor can't have get/set modifier");i.kind=l?"constructor":u,this.parseClassMethod(i,r,n,d)}else this.parseClassField(i);return i},p.isClassElementNameStart=function(){return this.type===a.name||this.type===a.privateId||this.type===a.num||this.type===a.string||this.type===a.bracketL||this.type.keyword},p.parseClassElementName=function(e){if(this.type===a.privateId){if(this.value==="constructor")this.raise(this.start,"Classes can't have an element named '#constructor'");e.computed=!1,e.key=this.parsePrivateIdent()}else this.parsePropertyName(e)},p.parseClassMethod=function(e,t,i,s){var r=e.key;if(e.kind==="constructor"){if(t)this.raise(r.start,"Constructor can't be a generator");if(i)this.raise(r.start,"Constructor can't be an async method")}else if(e.static&&le(e,"prototype"))this.raise(r.start,"Classes may not have a static property named prototype");var n=e.value=this.parseMethod(t,i,s);if(e.kind==="get"&&n.params.length!==0)this.raiseRecoverable(n.start,"getter should have no params");if(e.kind==="set"&&n.params.length!==1)this.raiseRecoverable(n.start,"setter should have exactly one param");if(e.kind==="set"&&n.params[0].type==="RestElement")this.raiseRecoverable(n.params[0].start,"Setter cannot use rest params");return this.finishNode(e,"MethodDefinition")},p.parseClassField=function(e){if(le(e,"constructor"))this.raise(e.key.start,"Classes can't have a field named 'constructor'");else if(e.static&&le(e,"prototype"))this.raise(e.key.start,"Classes can't have a static field named 'prototype'");if(this.eat(a.eq))this.enterScope(te|oe),e.value=this.parseMaybeAssign(),this.exitScope();else e.value=null;return this.semicolon(),this.finishNode(e,"PropertyDefinition")},p.parseClassStaticBlock=function(e){e.body=[];var t=this.labels;this.labels=[],this.enterScope(G|oe);while(this.type!==a.braceR){var i=this.parseStatement(null);e.body.push(i)}return this.next(),this.exitScope(),this.labels=t,this.finishNode(e,"StaticBlock")},p.parseClassId=function(e,t){if(this.type===a.name){if(e.id=this.parseIdent(),t)this.checkLValSimple(e.id,F,!1)}else{if(t===!0)this.unexpected();e.id=null}},p.parseClassSuper=function(e){e.superClass=this.eat(a._extends)?this.parseExprSubscripts(null,!1):null},p.enterClassBody=function(){var e={declared:Object.create(null),used:[]};return this.privateNameStack.push(e),e.declared},p.exitClassBody=function(){var e=this.privateNameStack.pop(),{declared:t,used:i}=e;if(!this.options.checkPrivateFields)return;var s=this.privateNameStack.length,r=s===0?null:this.privateNameStack[s-1];for(var n=0;n<i.length;++n){var u=i[n];if(!H(t,u.name))if(r)r.used.push(u);else this.raiseRecoverable(u.start,"Private field '#"+u.name+"' must be declared in an enclosing class")}};function Tt(e,t){var i=t.key.name,s=e[i],r="true";if(t.type==="MethodDefinition"&&(t.kind==="get"||t.kind==="set"))r=(t.static?"s":"i")+t.kind;if(s==="iget"&&r==="iset"||s==="iset"&&r==="iget"||s==="sget"&&r==="sset"||s==="sset"&&r==="sget")return e[i]="true",!1;else if(!s)return e[i]=r,!1;else return!0}function le(e,t){var{computed:i,key:s}=e;return!i&&(s.type==="Identifier"&&s.name===t||s.type==="Literal"&&s.value===t)}p.parseExportAllDeclaration=function(e,t){if(this.options.ecmaVersion>=11)if(this.eatContextual("as"))e.exported=this.parseModuleExportName(),this.checkExport(t,e.exported,this.lastTokStart);else e.exported=null;if(this.expectContextual("from"),this.type!==a.string)this.unexpected();if(e.source=this.parseExprAtom(),this.options.ecmaVersion>=16)e.attributes=this.parseWithClause();return this.semicolon(),this.finishNode(e,"ExportAllDeclaration")},p.parseExport=function(e,t){if(this.next(),this.eat(a.star))return this.parseExportAllDeclaration(e,t);if(this.eat(a._default))return this.checkExport(t,"default",this.lastTokStart),e.declaration=this.parseExportDefaultDeclaration(),this.finishNode(e,"ExportDefaultDeclaration");if(this.shouldParseExportStatement()){if(e.declaration=this.parseExportDeclaration(e),e.declaration.type==="VariableDeclaration")this.checkVariableExport(t,e.declaration.declarations);else this.checkExport(t,e.declaration.id,e.declaration.id.start);if(e.specifiers=[],e.source=null,this.options.ecmaVersion>=16)e.attributes=[]}else{if(e.declaration=null,e.specifiers=this.parseExportSpecifiers(t),this.eatContextual("from")){if(this.type!==a.string)this.unexpected();if(e.source=this.parseExprAtom(),this.options.ecmaVersion>=16)e.attributes=this.parseWithClause()}else{for(var i=0,s=e.specifiers;i<s.length;i+=1){var r=s[i];if(this.checkUnreserved(r.local),this.checkLocalExport(r.local),r.local.type==="Literal")this.raise(r.local.start,"A string literal cannot be used as an exported binding without `from`.")}if(e.source=null,this.options.ecmaVersion>=16)e.attributes=[]}this.semicolon()}return this.finishNode(e,"ExportNamedDeclaration")},p.parseExportDeclaration=function(e){return this.parseStatement(null)},p.parseExportDefaultDeclaration=function(){var e;if(this.type===a._function||(e=this.isAsyncFunction())){var t=this.startNode();if(this.next(),e)this.next();return this.parseFunction(t,ie|ze,!1,e)}else if(this.type===a._class){var i=this.startNode();return this.parseClass(i,"nullableID")}else{var s=this.parseMaybeAssign();return this.semicolon(),s}},p.checkExport=function(e,t,i){if(!e)return;if(typeof t!=="string")t=t.type==="Identifier"?t.name:t.value;if(H(e,t))this.raiseRecoverable(i,"Duplicate export '"+t+"'");e[t]=!0},p.checkPatternExport=function(e,t){var i=t.type;if(i==="Identifier")this.checkExport(e,t,t.start);else if(i==="ObjectPattern")for(var s=0,r=t.properties;s<r.length;s+=1){var n=r[s];this.checkPatternExport(e,n)}else if(i==="ArrayPattern")for(var u=0,o=t.elements;u<o.length;u+=1){var h=o[u];if(h)this.checkPatternExport(e,h)}else if(i==="Property")this.checkPatternExport(e,t.value);else if(i==="AssignmentPattern")this.checkPatternExport(e,t.left);else if(i==="RestElement")this.checkPatternExport(e,t.argument)},p.checkVariableExport=function(e,t){if(!e)return;for(var i=0,s=t;i<s.length;i+=1){var r=s[i];this.checkPatternExport(e,r.id)}},p.shouldParseExportStatement=function(){return this.type.keyword==="var"||this.type.keyword==="const"||this.type.keyword==="class"||this.type.keyword==="function"||this.isLet()||this.isAsyncFunction()},p.parseExportSpecifier=function(e){var t=this.startNode();return t.local=this.parseModuleExportName(),t.exported=this.eatContextual("as")?this.parseModuleExportName():t.local,this.checkExport(e,t.exported,t.exported.start),this.finishNode(t,"ExportSpecifier")},p.parseExportSpecifiers=function(e){var t=[],i=!0;this.expect(a.braceL);while(!this.eat(a.braceR)){if(!i){if(this.expect(a.comma),this.afterTrailingComma(a.braceR))break}else i=!1;t.push(this.parseExportSpecifier(e))}return t},p.parseImport=function(e){if(this.next(),this.type===a.string)e.specifiers=Vt,e.source=this.parseExprAtom();else e.specifiers=this.parseImportSpecifiers(),this.expectContextual("from"),e.source=this.type===a.string?this.parseExprAtom():this.unexpected();if(this.options.ecmaVersion>=16)e.attributes=this.parseWithClause();return this.semicolon(),this.finishNode(e,"ImportDeclaration")},p.parseImportSpecifier=function(){var e=this.startNode();if(e.imported=this.parseModuleExportName(),this.eatContextual("as"))e.local=this.parseIdent();else this.checkUnreserved(e.imported),e.local=e.imported;return this.checkLValSimple(e.local,F),this.finishNode(e,"ImportSpecifier")},p.parseImportDefaultSpecifier=function(){var e=this.startNode();return e.local=this.parseIdent(),this.checkLValSimple(e.local,F),this.finishNode(e,"ImportDefaultSpecifier")},p.parseImportNamespaceSpecifier=function(){var e=this.startNode();return this.next(),this.expectContextual("as"),e.local=this.parseIdent(),this.checkLValSimple(e.local,F),this.finishNode(e,"ImportNamespaceSpecifier")},p.parseImportSpecifiers=function(){var e=[],t=!0;if(this.type===a.name){if(e.push(this.parseImportDefaultSpecifier()),!this.eat(a.comma))return e}if(this.type===a.star)return e.push(this.parseImportNamespaceSpecifier()),e;this.expect(a.braceL);while(!this.eat(a.braceR)){if(!t){if(this.expect(a.comma),this.afterTrailingComma(a.braceR))break}else t=!1;e.push(this.parseImportSpecifier())}return e},p.parseWithClause=function(){var e=[];if(!this.eat(a._with))return e;this.expect(a.braceL);var t={},i=!0;while(!this.eat(a.braceR)){if(!i){if(this.expect(a.comma),this.afterTrailingComma(a.braceR))break}else i=!1;var s=this.parseImportAttribute(),r=s.key.type==="Identifier"?s.key.name:s.key.value;if(H(t,r))this.raiseRecoverable(s.key.start,"Duplicate attribute key '"+r+"'");t[r]=!0,e.push(s)}return e},p.parseImportAttribute=function(){var e=this.startNode();if(e.key=this.type===a.string?this.parseExprAtom():this.parseIdent(this.options.allowReserved!=="never"),this.expect(a.colon),this.type!==a.string)this.unexpected();return e.value=this.parseExprAtom(),this.finishNode(e,"ImportAttribute")},p.parseModuleExportName=function(){if(this.options.ecmaVersion>=13&&this.type===a.string){var e=this.parseLiteral(this.value);if(At.test(e.value))this.raise(e.start,"An export name cannot include a lone surrogate.");return e}return this.parseIdent(!0)},p.adaptDirectivePrologue=function(e){for(var t=0;t<e.length&&this.isDirectiveCandidate(e[t]);++t)e[t].directive=e[t].expression.raw.slice(1,-1)},p.isDirectiveCandidate=function(e){return this.options.ecmaVersion>=5&&e.type==="ExpressionStatement"&&e.expression.type==="Literal"&&typeof e.expression.value==="string"&&(this.input[e.start]==='"'||this.input[e.start]==="'")};var N=C.prototype;N.toAssignable=function(e,t,i){if(this.options.ecmaVersion>=6&&e)switch(e.type){case"Identifier":if(this.inAsync&&e.name==="await")this.raise(e.start,"Cannot use 'await' as identifier inside an async function");break;case"ObjectPattern":case"ArrayPattern":case"AssignmentPattern":case"RestElement":break;case"ObjectExpression":if(e.type="ObjectPattern",i)this.checkPatternErrors(i,!0);for(var s=0,r=e.properties;s<r.length;s+=1){var n=r[s];if(this.toAssignable(n,t),n.type==="RestElement"&&(n.argument.type==="ArrayPattern"||n.argument.type==="ObjectPattern"))this.raise(n.argument.start,"Unexpected token")}break;case"Property":if(e.kind!=="init")this.raise(e.key.start,"Object pattern can't contain getter or setter");this.toAssignable(e.value,t);break;case"ArrayExpression":if(e.type="ArrayPattern",i)this.checkPatternErrors(i,!0);this.toAssignableList(e.elements,t);break;case"SpreadElement":if(e.type="RestElement",this.toAssignable(e.argument,t),e.argument.type==="AssignmentPattern")this.raise(e.argument.start,"Rest elements cannot have a default value");break;case"AssignmentExpression":if(e.operator!=="=")this.raise(e.left.end,"Only '=' operator can be used for specifying default value.");e.type="AssignmentPattern",delete e.operator,this.toAssignable(e.left,t);break;case"ParenthesizedExpression":this.toAssignable(e.expression,t,i);break;case"ChainExpression":this.raiseRecoverable(e.start,"Optional chaining cannot appear in left-hand side");break;case"MemberExpression":if(!t)break;default:this.raise(e.start,"Assigning to rvalue")}else if(i)this.checkPatternErrors(i,!0);return e},N.toAssignableList=function(e,t){var i=e.length;for(var s=0;s<i;s++){var r=e[s];if(r)this.toAssignable(r,t)}if(i){var n=e[i-1];if(this.options.ecmaVersion===6&&t&&n&&n.type==="RestElement"&&n.argument.type!=="Identifier")this.unexpected(n.argument.start)}return e},N.parseSpread=function(e){var t=this.startNode();return this.next(),t.argument=this.parseMaybeAssign(!1,e),this.finishNode(t,"SpreadElement")},N.parseRestBinding=function(){var e=this.startNode();if(this.next(),this.options.ecmaVersion===6&&this.type!==a.name)this.unexpected();return e.argument=this.parseBindingAtom(),this.finishNode(e,"RestElement")},N.parseBindingAtom=function(){if(this.options.ecmaVersion>=6)switch(this.type){case a.bracketL:var e=this.startNode();return this.next(),e.elements=this.parseBindingList(a.bracketR,!0,!0),this.finishNode(e,"ArrayPattern");case a.braceL:return this.parseObj(!0)}return this.parseIdent()},N.parseBindingList=function(e,t,i,s){var r=[],n=!0;while(!this.eat(e)){if(n)n=!1;else this.expect(a.comma);if(t&&this.type===a.comma)r.push(null);else if(i&&this.afterTrailingComma(e))break;else if(this.type===a.ellipsis){var u=this.parseRestBinding();if(this.parseBindingListItem(u),r.push(u),this.type===a.comma)this.raiseRecoverable(this.start,"Comma is not permitted after the rest element");this.expect(e);break}else r.push(this.parseAssignableListItem(s))}return r},N.parseAssignableListItem=function(e){var t=this.parseMaybeDefault(this.start,this.startLoc);return this.parseBindingListItem(t),t},N.parseBindingListItem=function(e){return e},N.parseMaybeDefault=function(e,t,i){if(i=i||this.parseBindingAtom(),this.options.ecmaVersion<6||!this.eat(a.eq))return i;var s=this.startNodeAt(e,t);return s.left=i,s.right=this.parseMaybeAssign(),this.finishNode(s,"AssignmentPattern")},N.checkLValSimple=function(e,t,i){if(t===void 0)t=ce;var s=t!==ce;switch(e.type){case"Identifier":if(this.strict&&this.reservedWordsStrictBind.test(e.name))this.raiseRecoverable(e.start,(s?"Binding ":"Assigning to ")+e.name+" in strict mode");if(s){if(t===F&&e.name==="let")this.raiseRecoverable(e.start,"let is disallowed as a lexically bound name");if(i){if(H(i,e.name))this.raiseRecoverable(e.start,"Argument name clash");i[e.name]=!0}if(t!==We)this.declareName(e.name,t,e.start)}break;case"ChainExpression":this.raiseRecoverable(e.start,"Optional chaining cannot appear in left-hand side");break;case"MemberExpression":if(s)this.raiseRecoverable(e.start,"Binding member expression");break;case"ParenthesizedExpression":if(s)this.raiseRecoverable(e.start,"Binding parenthesized expression");return this.checkLValSimple(e.expression,t,i);default:this.raise(e.start,(s?"Binding":"Assigning to")+" rvalue")}},N.checkLValPattern=function(e,t,i){if(t===void 0)t=ce;switch(e.type){case"ObjectPattern":for(var s=0,r=e.properties;s<r.length;s+=1){var n=r[s];this.checkLValInnerPattern(n,t,i)}break;case"ArrayPattern":for(var u=0,o=e.elements;u<o.length;u+=1){var h=o[u];if(h)this.checkLValInnerPattern(h,t,i)}break;default:this.checkLValSimple(e,t,i)}},N.checkLValInnerPattern=function(e,t,i){if(t===void 0)t=ce;switch(e.type){case"Property":this.checkLValInnerPattern(e.value,t,i);break;case"AssignmentPattern":this.checkLValPattern(e.left,t,i);break;case"RestElement":this.checkLValPattern(e.argument,t,i);break;default:this.checkLValPattern(e,t,i)}};var V=function(t,i,s,r,n){this.token=t,this.isExpr=!!i,this.preserveSpace=!!s,this.override=r,this.generator=!!n},y={b_stat:new V("{",!1),b_expr:new V("{",!0),b_tmpl:new V("${",!1),p_stat:new V("(",!1),p_expr:new V("(",!0),q_tmpl:new V("`",!0,!0,function(e){return e.tryReadTemplateToken()}),f_stat:new V("function",!1),f_expr:new V("function",!0),f_expr_gen:new V("function",!0,!1,null,!0),f_gen:new V("function",!1,!1,null,!0)},K=C.prototype;K.initialContext=function(){return[y.b_stat]},K.curContext=function(){return this.context[this.context.length-1]},K.braceIsBlock=function(e){var t=this.curContext();if(t===y.f_expr||t===y.f_stat)return!0;if(e===a.colon&&(t===y.b_stat||t===y.b_expr))return!t.isExpr;if(e===a._return||e===a.name&&this.exprAllowed)return w.test(this.input.slice(this.lastTokEnd,this.start));if(e===a._else||e===a.semi||e===a.eof||e===a.parenR||e===a.arrow)return!0;if(e===a.braceL)return t===y.b_stat;if(e===a._var||e===a._const||e===a.name)return!1;return!this.exprAllowed},K.inGeneratorContext=function(){for(var e=this.context.length-1;e>=1;e--){var t=this.context[e];if(t.token==="function")return t.generator}return!1},K.updateContext=function(e){var t,i=this.type;if(i.keyword&&e===a.dot)this.exprAllowed=!1;else if(t=i.updateContext)t.call(this,e);else this.exprAllowed=i.beforeExpr},K.overrideContext=function(e){if(this.curContext()!==e)this.context[this.context.length-1]=e},a.parenR.updateContext=a.braceR.updateContext=function(){if(this.context.length===1){this.exprAllowed=!0;return}var e=this.context.pop();if(e===y.b_stat&&this.curContext().token==="function")e=this.context.pop();this.exprAllowed=!e.isExpr},a.braceL.updateContext=function(e){this.context.push(this.braceIsBlock(e)?y.b_stat:y.b_expr),this.exprAllowed=!0},a.dollarBraceL.updateContext=function(){this.context.push(y.b_tmpl),this.exprAllowed=!0},a.parenL.updateContext=function(e){var t=e===a._if||e===a._for||e===a._with||e===a._while;this.context.push(t?y.p_stat:y.p_expr),this.exprAllowed=!0},a.incDec.updateContext=function(){},a._function.updateContext=a._class.updateContext=function(e){if(e.beforeExpr&&e!==a._else&&!(e===a.semi&&this.curContext()!==y.p_stat)&&!(e===a._return&&w.test(this.input.slice(this.lastTokEnd,this.start)))&&!((e===a.colon||e===a.braceL)&&this.curContext()===y.b_stat))this.context.push(y.f_expr);else this.context.push(y.f_stat);this.exprAllowed=!1},a.colon.updateContext=function(){if(this.curContext().token==="function")this.context.pop();this.exprAllowed=!0},a.backQuote.updateContext=function(){if(this.curContext()===y.q_tmpl)this.context.pop();else this.context.push(y.q_tmpl);this.exprAllowed=!1},a.star.updateContext=function(e){if(e===a._function){var t=this.context.length-1;if(this.context[t]===y.f_expr)this.context[t]=y.f_expr_gen;else this.context[t]=y.f_gen}this.exprAllowed=!0},a.name.updateContext=function(e){var t=!1;if(this.options.ecmaVersion>=6&&e!==a.dot){if(this.value==="of"&&!this.exprAllowed||this.value==="yield"&&this.inGeneratorContext())t=!0}this.exprAllowed=t};var f=C.prototype;f.checkPropClash=function(e,t,i){if(this.options.ecmaVersion>=9&&e.type==="SpreadElement")return;if(this.options.ecmaVersion>=6&&(e.computed||e.method||e.shorthand))return;var s=e.key,r;switch(s.type){case"Identifier":r=s.name;break;case"Literal":r=String(s.value);break;default:return}var n=e.kind;if(this.options.ecmaVersion>=6){if(r==="__proto__"&&n==="init"){if(t.proto)if(i){if(i.doubleProto<0)i.doubleProto=s.start}else this.raiseRecoverable(s.start,"Redefinition of __proto__ property");t.proto=!0}return}r="$"+r;var u=t[r];if(u){var o;if(n==="init")o=this.strict&&u.init||u.get||u.set;else o=u.init||u[n];if(o)this.raiseRecoverable(s.start,"Redefinition of property")}else u=t[r]={init:!1,get:!1,set:!1};u[n]=!0},f.parseExpression=function(e,t){var i=this.start,s=this.startLoc,r=this.parseMaybeAssign(e,t);if(this.type===a.comma){var n=this.startNodeAt(i,s);n.expressions=[r];while(this.eat(a.comma))n.expressions.push(this.parseMaybeAssign(e,t));return this.finishNode(n,"SequenceExpression")}return r},f.parseMaybeAssign=function(e,t,i){if(this.isContextual("yield"))if(this.inGenerator)return this.parseYield(e);else this.exprAllowed=!1;var s=!1,r=-1,n=-1,u=-1;if(t)r=t.parenthesizedAssign,n=t.trailingComma,u=t.doubleProto,t.parenthesizedAssign=t.trailingComma=-1;else t=new pe,s=!0;var o=this.start,h=this.startLoc;if(this.type===a.parenL||this.type===a.name)this.potentialArrowAt=this.start,this.potentialArrowInForAwait=e==="await";var l=this.parseMaybeConditional(e,t);if(i)l=i.call(this,l,o,h);if(this.type.isAssign){var d=this.startNodeAt(o,h);if(d.operator=this.value,this.type===a.eq)l=this.toAssignable(l,!1,t);if(!s)t.parenthesizedAssign=t.trailingComma=t.doubleProto=-1;if(t.shorthandAssign>=l.start)t.shorthandAssign=-1;if(this.type===a.eq)this.checkLValPattern(l);else this.checkLValSimple(l);if(d.left=l,this.next(),d.right=this.parseMaybeAssign(e),u>-1)t.doubleProto=u;return this.finishNode(d,"AssignmentExpression")}else if(s)this.checkExpressionErrors(t,!0);if(r>-1)t.parenthesizedAssign=r;if(n>-1)t.trailingComma=n;return l},f.parseMaybeConditional=function(e,t){var i=this.start,s=this.startLoc,r=this.parseExprOps(e,t);if(this.checkExpressionErrors(t))return r;if(this.eat(a.question)){var n=this.startNodeAt(i,s);return n.test=r,n.consequent=this.parseMaybeAssign(),this.expect(a.colon),n.alternate=this.parseMaybeAssign(e),this.finishNode(n,"ConditionalExpression")}return r},f.parseExprOps=function(e,t){var i=this.start,s=this.startLoc,r=this.parseMaybeUnary(t,!1,!1,e);if(this.checkExpressionErrors(t))return r;return r.start===i&&r.type==="ArrowFunctionExpression"?r:this.parseExprOp(r,i,s,-1,e)},f.parseExprOp=function(e,t,i,s,r){var n=this.type.binop;if(n!=null&&(!r||this.type!==a._in)){if(n>s){var u=this.type===a.logicalOR||this.type===a.logicalAND,o=this.type===a.coalesce;if(o)n=a.logicalAND.binop;var h=this.value;this.next();var l=this.start,d=this.startLoc,_=this.parseExprOp(this.parseMaybeUnary(null,!1,!1,r),l,d,n,r),k=this.buildBinary(t,i,e,_,h,u||o);if(u&&this.type===a.coalesce||o&&(this.type===a.logicalOR||this.type===a.logicalAND))this.raiseRecoverable(this.start,"Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses");return this.parseExprOp(k,t,i,s,r)}}return e},f.buildBinary=function(e,t,i,s,r,n){if(s.type==="PrivateIdentifier")this.raise(s.start,"Private identifier can only be left side of binary expression");var u=this.startNodeAt(e,t);return u.left=i,u.operator=r,u.right=s,this.finishNode(u,n?"LogicalExpression":"BinaryExpression")},f.parseMaybeUnary=function(e,t,i,s){var r=this.start,n=this.startLoc,u;if(this.isContextual("await")&&this.canAwait)u=this.parseAwait(s),t=!0;else if(this.type.prefix){var o=this.startNode(),h=this.type===a.incDec;if(o.operator=this.value,o.prefix=!0,this.next(),o.argument=this.parseMaybeUnary(null,!0,h,s),this.checkExpressionErrors(e,!0),h)this.checkLValSimple(o.argument);else if(this.strict&&o.operator==="delete"&&Ke(o.argument))this.raiseRecoverable(o.start,"Deleting local variable in strict mode");else if(o.operator==="delete"&&Ne(o.argument))this.raiseRecoverable(o.start,"Private fields can not be deleted");else t=!0;u=this.finishNode(o,h?"UpdateExpression":"UnaryExpression")}else if(!t&&this.type===a.privateId){if((s||this.privateNameStack.length===0)&&this.options.checkPrivateFields)this.unexpected();if(u=this.parsePrivateIdent(),this.type!==a._in)this.unexpected()}else{if(u=this.parseExprSubscripts(e,s),this.checkExpressionErrors(e))return u;while(this.type.postfix&&!this.canInsertSemicolon()){var l=this.startNodeAt(r,n);l.operator=this.value,l.prefix=!1,l.argument=u,this.checkLValSimple(u),this.next(),u=this.finishNode(l,"UpdateExpression")}}if(!i&&this.eat(a.starstar))if(t)this.unexpected(this.lastTokStart);else return this.buildBinary(r,n,u,this.parseMaybeUnary(null,!1,!1,s),"**",!1);else return u};function Ke(e){return e.type==="Identifier"||e.type==="ParenthesizedExpression"&&Ke(e.expression)}function Ne(e){return e.type==="MemberExpression"&&e.property.type==="PrivateIdentifier"||e.type==="ChainExpression"&&Ne(e.expression)||e.type==="ParenthesizedExpression"&&Ne(e.expression)}f.parseExprSubscripts=function(e,t){var i=this.start,s=this.startLoc,r=this.parseExprAtom(e,t);if(r.type==="ArrowFunctionExpression"&&this.input.slice(this.lastTokStart,this.lastTokEnd)!==")")return r;var n=this.parseSubscripts(r,i,s,!1,t);if(e&&n.type==="MemberExpression"){if(e.parenthesizedAssign>=n.start)e.parenthesizedAssign=-1;if(e.parenthesizedBind>=n.start)e.parenthesizedBind=-1;if(e.trailingComma>=n.start)e.trailingComma=-1}return n},f.parseSubscripts=function(e,t,i,s,r){var n=this.options.ecmaVersion>=8&&e.type==="Identifier"&&e.name==="async"&&this.lastTokEnd===e.end&&!this.canInsertSemicolon()&&e.end-e.start===5&&this.potentialArrowAt===e.start,u=!1;while(!0){var o=this.parseSubscript(e,t,i,s,n,u,r);if(o.optional)u=!0;if(o===e||o.type==="ArrowFunctionExpression"){if(u){var h=this.startNodeAt(t,i);h.expression=o,o=this.finishNode(h,"ChainExpression")}return o}e=o}},f.shouldParseAsyncArrow=function(){return!this.canInsertSemicolon()&&this.eat(a.arrow)},f.parseSubscriptAsyncArrow=function(e,t,i,s){return this.parseArrowExpression(this.startNodeAt(e,t),i,!0,s)},f.parseSubscript=function(e,t,i,s,r,n,u){var o=this.options.ecmaVersion>=11,h=o&&this.eat(a.questionDot);if(s&&h)this.raise(this.lastTokStart,"Optional chaining cannot appear in the callee of new expressions");var l=this.eat(a.bracketL);if(l||h&&this.type!==a.parenL&&this.type!==a.backQuote||this.eat(a.dot)){var d=this.startNodeAt(t,i);if(d.object=e,l)d.property=this.parseExpression(),this.expect(a.bracketR);else if(this.type===a.privateId&&e.type!=="Super")d.property=this.parsePrivateIdent();else d.property=this.parseIdent(this.options.allowReserved!=="never");if(d.computed=!!l,o)d.optional=h;e=this.finishNode(d,"MemberExpression")}else if(!s&&this.eat(a.parenL)){var _=new pe,k=this.yieldPos,re=this.awaitPos,Q=this.awaitIdentPos;this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0;var ve=this.parseExprList(a.parenR,this.options.ecmaVersion>=8,!1,_);if(r&&!h&&this.shouldParseAsyncArrow()){if(this.checkPatternErrors(_,!1),this.checkYieldAwaitInDefaultParams(),this.awaitIdentPos>0)this.raise(this.awaitIdentPos,"Cannot use 'await' as identifier inside an async function");return this.yieldPos=k,this.awaitPos=re,this.awaitIdentPos=Q,this.parseSubscriptAsyncArrow(t,i,ve,u)}this.checkExpressionErrors(_,!0),this.yieldPos=k||this.yieldPos,this.awaitPos=re||this.awaitPos,this.awaitIdentPos=Q||this.awaitIdentPos;var Y=this.startNodeAt(t,i);if(Y.callee=e,Y.arguments=ve,o)Y.optional=h;e=this.finishNode(Y,"CallExpression")}else if(this.type===a.backQuote){if(h||n)this.raise(this.start,"Optional chaining cannot appear in the tag of tagged template expressions");var X=this.startNodeAt(t,i);X.tag=e,X.quasi=this.parseTemplate({isTagged:!0}),e=this.finishNode(X,"TaggedTemplateExpression")}return e},f.parseExprAtom=function(e,t,i){if(this.type===a.slash)this.readRegexp();var s,r=this.potentialArrowAt===this.start;switch(this.type){case a._super:if(!this.allowSuper)this.raise(this.start,"'super' keyword outside a method");if(s=this.startNode(),this.next(),this.type===a.parenL&&!this.allowDirectSuper)this.raise(s.start,"super() call outside constructor of a subclass");if(this.type!==a.dot&&this.type!==a.bracketL&&this.type!==a.parenL)this.unexpected();return this.finishNode(s,"Super");case a._this:return s=this.startNode(),this.next(),this.finishNode(s,"ThisExpression");case a.name:var n=this.start,u=this.startLoc,o=this.containsEsc,h=this.parseIdent(!1);if(this.options.ecmaVersion>=8&&!o&&h.name==="async"&&!this.canInsertSemicolon()&&this.eat(a._function))return this.overrideContext(y.f_expr),this.parseFunction(this.startNodeAt(n,u),0,!1,!0,t);if(r&&!this.canInsertSemicolon()){if(this.eat(a.arrow))return this.parseArrowExpression(this.startNodeAt(n,u),[h],!1,t);if(this.options.ecmaVersion>=8&&h.name==="async"&&this.type===a.name&&!o&&(!this.potentialArrowInForAwait||this.value!=="of"||this.containsEsc)){if(h=this.parseIdent(!1),this.canInsertSemicolon()||!this.eat(a.arrow))this.unexpected();return this.parseArrowExpression(this.startNodeAt(n,u),[h],!0,t)}}return h;case a.regexp:var l=this.value;return s=this.parseLiteral(l.value),s.regex={pattern:l.pattern,flags:l.flags},s;case a.num:case a.string:return this.parseLiteral(this.value);case a._null:case a._true:case a._false:return s=this.startNode(),s.value=this.type===a._null?null:this.type===a._true,s.raw=this.type.keyword,this.next(),this.finishNode(s,"Literal");case a.parenL:var d=this.start,_=this.parseParenAndDistinguishExpression(r,t);if(e){if(e.parenthesizedAssign<0&&!this.isSimpleAssignTarget(_))e.parenthesizedAssign=d;if(e.parenthesizedBind<0)e.parenthesizedBind=d}return _;case a.bracketL:return s=this.startNode(),this.next(),s.elements=this.parseExprList(a.bracketR,!0,!0,e),this.finishNode(s,"ArrayExpression");case a.braceL:return this.overrideContext(y.b_expr),this.parseObj(!1,e);case a._function:return s=this.startNode(),this.next(),this.parseFunction(s,0);case a._class:return this.parseClass(this.startNode(),!1);case a._new:return this.parseNew();case a.backQuote:return this.parseTemplate();case a._import:if(this.options.ecmaVersion>=11)return this.parseExprImport(i);else return this.unexpected();default:return this.parseExprAtomDefault()}},f.parseExprAtomDefault=function(){this.unexpected()},f.parseExprImport=function(e){var t=this.startNode();if(this.containsEsc)this.raiseRecoverable(this.start,"Escape sequence in keyword import");if(this.next(),this.type===a.parenL&&!e)return this.parseDynamicImport(t);else if(this.type===a.dot){var i=this.startNodeAt(t.start,t.loc&&t.loc.start);return i.name="import",t.meta=this.finishNode(i,"Identifier"),this.parseImportMeta(t)}else this.unexpected()},f.parseDynamicImport=function(e){if(this.next(),e.source=this.parseMaybeAssign(),this.options.ecmaVersion>=16)if(!this.eat(a.parenR))if(this.expect(a.comma),!this.afterTrailingComma(a.parenR)){if(e.options=this.parseMaybeAssign(),!this.eat(a.parenR)){if(this.expect(a.comma),!this.afterTrailingComma(a.parenR))this.unexpected()}}else e.options=null;else e.options=null;else if(!this.eat(a.parenR)){var t=this.start;if(this.eat(a.comma)&&this.eat(a.parenR))this.raiseRecoverable(t,"Trailing comma is not allowed in import()");else this.unexpected(t)}return this.finishNode(e,"ImportExpression")},f.parseImportMeta=function(e){this.next();var t=this.containsEsc;if(e.property=this.parseIdent(!0),e.property.name!=="meta")this.raiseRecoverable(e.property.start,"The only valid meta property for import is 'import.meta'");if(t)this.raiseRecoverable(e.start,"'import.meta' must not contain escaped characters");if(this.options.sourceType!=="module"&&!this.options.allowImportExportEverywhere)this.raiseRecoverable(e.start,"Cannot use 'import.meta' outside a module");return this.finishNode(e,"MetaProperty")},f.parseLiteral=function(e){var t=this.startNode();if(t.value=e,t.raw=this.input.slice(this.start,this.end),t.raw.charCodeAt(t.raw.length-1)===110)t.bigint=t.value!=null?t.value.toString():t.raw.slice(0,-1).replace(/_/g,"");return this.next(),this.finishNode(t,"Literal")},f.parseParenExpression=function(){this.expect(a.parenL);var e=this.parseExpression();return this.expect(a.parenR),e},f.shouldParseArrow=function(e){return!this.canInsertSemicolon()},f.parseParenAndDistinguishExpression=function(e,t){var i=this.start,s=this.startLoc,r,n=this.options.ecmaVersion>=8;if(this.options.ecmaVersion>=6){this.next();var u=this.start,o=this.startLoc,h=[],l=!0,d=!1,_=new pe,k=this.yieldPos,re=this.awaitPos,Q;this.yieldPos=0,this.awaitPos=0;while(this.type!==a.parenR)if(l?l=!1:this.expect(a.comma),n&&this.afterTrailingComma(a.parenR,!0)){d=!0;break}else if(this.type===a.ellipsis){if(Q=this.start,h.push(this.parseParenItem(this.parseRestBinding())),this.type===a.comma)this.raiseRecoverable(this.start,"Comma is not permitted after the rest element");break}else h.push(this.parseMaybeAssign(!1,_,this.parseParenItem));var ve=this.lastTokEnd,Y=this.lastTokEndLoc;if(this.expect(a.parenR),e&&this.shouldParseArrow(h)&&this.eat(a.arrow))return this.checkPatternErrors(_,!1),this.checkYieldAwaitInDefaultParams(),this.yieldPos=k,this.awaitPos=re,this.parseParenArrowList(i,s,h,t);if(!h.length||d)this.unexpected(this.lastTokStart);if(Q)this.unexpected(Q);if(this.checkExpressionErrors(_,!0),this.yieldPos=k||this.yieldPos,this.awaitPos=re||this.awaitPos,h.length>1)r=this.startNodeAt(u,o),r.expressions=h,this.finishNodeAt(r,"SequenceExpression",ve,Y);else r=h[0]}else r=this.parseParenExpression();if(this.options.preserveParens){var X=this.startNodeAt(i,s);return X.expression=r,this.finishNode(X,"ParenthesizedExpression")}else return r},f.parseParenItem=function(e){return e},f.parseParenArrowList=function(e,t,i,s){return this.parseArrowExpression(this.startNodeAt(e,t),i,!1,s)};var Lt=[];f.parseNew=function(){if(this.containsEsc)this.raiseRecoverable(this.start,"Escape sequence in keyword new");var e=this.startNode();if(this.next(),this.options.ecmaVersion>=6&&this.type===a.dot){var t=this.startNodeAt(e.start,e.loc&&e.loc.start);t.name="new",e.meta=this.finishNode(t,"Identifier"),this.next();var i=this.containsEsc;if(e.property=this.parseIdent(!0),e.property.name!=="target")this.raiseRecoverable(e.property.start,"The only valid meta property for new is 'new.target'");if(i)this.raiseRecoverable(e.start,"'new.target' must not contain escaped characters");if(!this.allowNewDotTarget)this.raiseRecoverable(e.start,"'new.target' can only be used in functions and class static block");return this.finishNode(e,"MetaProperty")}var s=this.start,r=this.startLoc;if(e.callee=this.parseSubscripts(this.parseExprAtom(null,!1,!0),s,r,!0,!1),this.eat(a.parenL))e.arguments=this.parseExprList(a.parenR,this.options.ecmaVersion>=8,!1);else e.arguments=Lt;return this.finishNode(e,"NewExpression")},f.parseTemplateElement=function(e){var t=e.isTagged,i=this.startNode();if(this.type===a.invalidTemplate){if(!t)this.raiseRecoverable(this.start,"Bad escape sequence in untagged template literal");i.value={raw:this.value.replace(/\r\n?/g,`
`),cooked:null}}else i.value={raw:this.input.slice(this.start,this.end).replace(/\r\n?/g,`
`),cooked:this.value};return this.next(),i.tail=this.type===a.backQuote,this.finishNode(i,"TemplateElement")},f.parseTemplate=function(e){if(e===void 0)e={};var t=e.isTagged;if(t===void 0)t=!1;var i=this.startNode();this.next(),i.expressions=[];var s=this.parseTemplateElement({isTagged:t});i.quasis=[s];while(!s.tail){if(this.type===a.eof)this.raise(this.pos,"Unterminated template literal");this.expect(a.dollarBraceL),i.expressions.push(this.parseExpression()),this.expect(a.braceR),i.quasis.push(s=this.parseTemplateElement({isTagged:t}))}return this.next(),this.finishNode(i,"TemplateLiteral")},f.isAsyncProp=function(e){return!e.computed&&e.key.type==="Identifier"&&e.key.name==="async"&&(this.type===a.name||this.type===a.num||this.type===a.string||this.type===a.bracketL||this.type.keyword||this.options.ecmaVersion>=9&&this.type===a.star)&&!w.test(this.input.slice(this.lastTokEnd,this.start))},f.parseObj=function(e,t){var i=this.startNode(),s=!0,r={};i.properties=[],this.next();while(!this.eat(a.braceR)){if(!s){if(this.expect(a.comma),this.options.ecmaVersion>=5&&this.afterTrailingComma(a.braceR))break}else s=!1;var n=this.parseProperty(e,t);if(!e)this.checkPropClash(n,r,t);i.properties.push(n)}return this.finishNode(i,e?"ObjectPattern":"ObjectExpression")},f.parseProperty=function(e,t){var i=this.startNode(),s,r,n,u;if(this.options.ecmaVersion>=9&&this.eat(a.ellipsis)){if(e){if(i.argument=this.parseIdent(!1),this.type===a.comma)this.raiseRecoverable(this.start,"Comma is not permitted after the rest element");return this.finishNode(i,"RestElement")}if(i.argument=this.parseMaybeAssign(!1,t),this.type===a.comma&&t&&t.trailingComma<0)t.trailingComma=this.start;return this.finishNode(i,"SpreadElement")}if(this.options.ecmaVersion>=6){if(i.method=!1,i.shorthand=!1,e||t)n=this.start,u=this.startLoc;if(!e)s=this.eat(a.star)}var o=this.containsEsc;if(this.parsePropertyName(i),!e&&!o&&this.options.ecmaVersion>=8&&!s&&this.isAsyncProp(i))r=!0,s=this.options.ecmaVersion>=9&&this.eat(a.star),this.parsePropertyName(i);else r=!1;return this.parsePropertyValue(i,e,s,r,n,u,t,o),this.finishNode(i,"Property")},f.parseGetterSetter=function(e){var t=e.key.name;this.parsePropertyName(e),e.value=this.parseMethod(!1),e.kind=t;var i=e.kind==="get"?0:1;if(e.value.params.length!==i){var s=e.value.start;if(e.kind==="get")this.raiseRecoverable(s,"getter should have no params");else this.raiseRecoverable(s,"setter should have exactly one param")}else if(e.kind==="set"&&e.value.params[0].type==="RestElement")this.raiseRecoverable(e.value.params[0].start,"Setter cannot use rest params")},f.parsePropertyValue=function(e,t,i,s,r,n,u,o){if((i||s)&&this.type===a.colon)this.unexpected();if(this.eat(a.colon))e.value=t?this.parseMaybeDefault(this.start,this.startLoc):this.parseMaybeAssign(!1,u),e.kind="init";else if(this.options.ecmaVersion>=6&&this.type===a.parenL){if(t)this.unexpected();e.method=!0,e.value=this.parseMethod(i,s),e.kind="init"}else if(!t&&!o&&this.options.ecmaVersion>=5&&!e.computed&&e.key.type==="Identifier"&&(e.key.name==="get"||e.key.name==="set")&&(this.type!==a.comma&&this.type!==a.braceR&&this.type!==a.eq)){if(i||s)this.unexpected();this.parseGetterSetter(e)}else if(this.options.ecmaVersion>=6&&!e.computed&&e.key.type==="Identifier"){if(i||s)this.unexpected();if(this.checkUnreserved(e.key),e.key.name==="await"&&!this.awaitIdentPos)this.awaitIdentPos=r;if(t)e.value=this.parseMaybeDefault(r,n,this.copyNode(e.key));else if(this.type===a.eq&&u){if(u.shorthandAssign<0)u.shorthandAssign=this.start;e.value=this.parseMaybeDefault(r,n,this.copyNode(e.key))}else e.value=this.copyNode(e.key);e.kind="init",e.shorthand=!0}else this.unexpected()},f.parsePropertyName=function(e){if(this.options.ecmaVersion>=6)if(this.eat(a.bracketL))return e.computed=!0,e.key=this.parseMaybeAssign(),this.expect(a.bracketR),e.key;else e.computed=!1;return e.key=this.type===a.num||this.type===a.string?this.parseExprAtom():this.parseIdent(this.options.allowReserved!=="never")},f.initFunction=function(e){if(e.id=null,this.options.ecmaVersion>=6)e.generator=e.expression=!1;if(this.options.ecmaVersion>=8)e.async=!1},f.parseMethod=function(e,t,i){var s=this.startNode(),r=this.yieldPos,n=this.awaitPos,u=this.awaitIdentPos;if(this.initFunction(s),this.options.ecmaVersion>=6)s.generator=e;if(this.options.ecmaVersion>=8)s.async=!!t;return this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,this.enterScope(Ae(t,s.generator)|oe|(i?je:0)),this.expect(a.parenL),s.params=this.parseBindingList(a.parenR,!1,this.options.ecmaVersion>=8),this.checkYieldAwaitInDefaultParams(),this.parseFunctionBody(s,!1,!0,!1),this.yieldPos=r,this.awaitPos=n,this.awaitIdentPos=u,this.finishNode(s,"FunctionExpression")},f.parseArrowExpression=function(e,t,i,s){var r=this.yieldPos,n=this.awaitPos,u=this.awaitIdentPos;if(this.enterScope(Ae(i,!1)|we),this.initFunction(e),this.options.ecmaVersion>=8)e.async=!!i;return this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,e.params=this.toAssignableList(t,!0),this.parseFunctionBody(e,!0,!1,s),this.yieldPos=r,this.awaitPos=n,this.awaitIdentPos=u,this.finishNode(e,"ArrowFunctionExpression")},f.parseFunctionBody=function(e,t,i,s){var r=t&&this.type!==a.braceL,n=this.strict,u=!1;if(r)e.body=this.parseMaybeAssign(s),e.expression=!0,this.checkParams(e,!1);else{var o=this.options.ecmaVersion>=7&&!this.isSimpleParamList(e.params);if(!n||o){if(u=this.strictDirective(this.end),u&&o)this.raiseRecoverable(e.start,"Illegal 'use strict' directive in function with non-simple parameter list")}var h=this.labels;if(this.labels=[],u)this.strict=!0;if(this.checkParams(e,!n&&!u&&!t&&!i&&this.isSimpleParamList(e.params)),this.strict&&e.id)this.checkLValSimple(e.id,We);e.body=this.parseBlock(!1,void 0,u&&!n),e.expression=!1,this.adaptDirectivePrologue(e.body.body),this.labels=h}this.exitScope()},f.isSimpleParamList=function(e){for(var t=0,i=e;t<i.length;t+=1){var s=i[t];if(s.type!=="Identifier")return!1}return!0},f.checkParams=function(e,t){var i=Object.create(null);for(var s=0,r=e.params;s<r.length;s+=1){var n=r[s];this.checkLValInnerPattern(n,Ie,t?null:i)}},f.parseExprList=function(e,t,i,s){var r=[],n=!0;while(!this.eat(e)){if(!n){if(this.expect(a.comma),t&&this.afterTrailingComma(e))break}else n=!1;var u=void 0;if(i&&this.type===a.comma)u=null;else if(this.type===a.ellipsis){if(u=this.parseSpread(s),s&&this.type===a.comma&&s.trailingComma<0)s.trailingComma=this.start}else u=this.parseMaybeAssign(!1,s);r.push(u)}return r},f.checkUnreserved=function(e){var{start:t,end:i,name:s}=e;if(this.inGenerator&&s==="yield")this.raiseRecoverable(t,"Cannot use 'yield' as identifier inside a generator");if(this.inAsync&&s==="await")this.raiseRecoverable(t,"Cannot use 'await' as identifier inside an async function");if(!(this.currentThisScope().flags&he)&&s==="arguments")this.raiseRecoverable(t,"Cannot use 'arguments' in class field initializer");if(this.inClassStaticBlock&&(s==="arguments"||s==="await"))this.raise(t,"Cannot use "+s+" in class static initialization block");if(this.keywords.test(s))this.raise(t,"Unexpected keyword '"+s+"'");if(this.options.ecmaVersion<6&&this.input.slice(t,i).indexOf("\\")!==-1)return;var r=this.strict?this.reservedWordsStrict:this.reservedWords;if(r.test(s)){if(!this.inAsync&&s==="await")this.raiseRecoverable(t,"Cannot use keyword 'await' outside an async function");this.raiseRecoverable(t,"The keyword '"+s+"' is reserved")}},f.parseIdent=function(e){var t=this.parseIdentNode();if(this.next(!!e),this.finishNode(t,"Identifier"),!e){if(this.checkUnreserved(t),t.name==="await"&&!this.awaitIdentPos)this.awaitIdentPos=t.start}return t},f.parseIdentNode=function(){var e=this.startNode();if(this.type===a.name)e.name=this.value;else if(this.type.keyword){if(e.name=this.type.keyword,(e.name==="class"||e.name==="function")&&(this.lastTokEnd!==this.lastTokStart+1||this.input.charCodeAt(this.lastTokStart)!==46))this.context.pop();this.type=a.name}else this.unexpected();return e},f.parsePrivateIdent=function(){var e=this.startNode();if(this.type===a.privateId)e.name=this.value;else this.unexpected();if(this.next(),this.finishNode(e,"PrivateIdentifier"),this.options.checkPrivateFields)if(this.privateNameStack.length===0)this.raise(e.start,"Private field '#"+e.name+"' must be declared in an enclosing class");else this.privateNameStack[this.privateNameStack.length-1].used.push(e);return e},f.parseYield=function(e){if(!this.yieldPos)this.yieldPos=this.start;var t=this.startNode();if(this.next(),this.type===a.semi||this.canInsertSemicolon()||this.type!==a.star&&!this.type.startsExpr)t.delegate=!1,t.argument=null;else t.delegate=this.eat(a.star),t.argument=this.parseMaybeAssign(e);return this.finishNode(t,"YieldExpression")},f.parseAwait=function(e){if(!this.awaitPos)this.awaitPos=this.start;var t=this.startNode();return this.next(),t.argument=this.parseMaybeUnary(null,!0,!1,e),this.finishNode(t,"AwaitExpression")};var fe=C.prototype;fe.raise=function(e,t){var i=Se(this.input,e);if(t+=" ("+i.line+":"+i.column+")",this.sourceFile)t+=" in "+this.sourceFile;var s=SyntaxError(t);throw s.pos=e,s.loc=i,s.raisedAt=this.pos,s},fe.raiseRecoverable=fe.raise,fe.curPosition=function(){if(this.options.locations)return new W(this.curLine,this.pos-this.lineStart)};var q=C.prototype,Rt=function(t){this.flags=t,this.var=[],this.lexical=[],this.functions=[]};q.enterScope=function(e){this.scopeStack.push(new Rt(e))},q.exitScope=function(){this.scopeStack.pop()},q.treatFunctionsAsVarInScope=function(e){return e.flags&z||!this.inModule&&e.flags&ee},q.declareName=function(e,t,i){var s=!1;if(t===F){var r=this.currentScope();if(s=r.lexical.indexOf(e)>-1||r.functions.indexOf(e)>-1||r.var.indexOf(e)>-1,r.lexical.push(e),this.inModule&&r.flags&ee)delete this.undefinedExports[e]}else if(t===He){var n=this.currentScope();n.lexical.push(e)}else if(t===Ge){var u=this.currentScope();if(this.treatFunctionsAsVar)s=u.lexical.indexOf(e)>-1;else s=u.lexical.indexOf(e)>-1||u.var.indexOf(e)>-1;u.functions.push(e)}else for(var o=this.scopeStack.length-1;o>=0;--o){var h=this.scopeStack[o];if(h.lexical.indexOf(e)>-1&&!(h.flags&qe&&h.lexical[0]===e)||!this.treatFunctionsAsVarInScope(h)&&h.functions.indexOf(e)>-1){s=!0;break}if(h.var.push(e),this.inModule&&h.flags&ee)delete this.undefinedExports[e];if(h.flags&he)break}if(s)this.raiseRecoverable(i,"Identifier '"+e+"' has already been declared")},q.checkLocalExport=function(e){if(this.scopeStack[0].lexical.indexOf(e.name)===-1&&this.scopeStack[0].var.indexOf(e.name)===-1)this.undefinedExports[e.name]=e},q.currentScope=function(){return this.scopeStack[this.scopeStack.length-1]},q.currentVarScope=function(){for(var e=this.scopeStack.length-1;;e--){var t=this.scopeStack[e];if(t.flags&(he|te|G))return t}},q.currentThisScope=function(){for(var e=this.scopeStack.length-1;;e--){var t=this.scopeStack[e];if(t.flags&(he|te|G)&&!(t.flags&we))return t}};var se=function(t,i,s){if(this.type="",this.start=i,this.end=0,t.options.locations)this.loc=new J(t,s);if(t.options.directSourceFile)this.sourceFile=t.options.directSourceFile;if(t.options.ranges)this.range=[i,0]},ae=C.prototype;ae.startNode=function(){return new se(this,this.start,this.startLoc)},ae.startNodeAt=function(e,t){return new se(this,e,t)};function Qe(e,t,i,s){if(e.type=t,e.end=i,this.options.locations)e.loc.end=s;if(this.options.ranges)e.range[1]=i;return e}ae.finishNode=function(e,t){return Qe.call(this,e,t,this.lastTokEnd,this.lastTokEndLoc)},ae.finishNodeAt=function(e,t,i,s){return Qe.call(this,e,t,i,s)},ae.copyNode=function(e){var t=new se(this,e.start,this.startLoc);for(var i in e)t[i]=e[i];return t};var Ot="Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sunu Sunuwar Todhri Todr Tulu_Tigalari Tutg Unknown Zzzz",Ye="ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS",Xe=Ye+" Extended_Pictographic",Ze=Xe,Je=Ze+" EBase EComp EMod EPres ExtPict",$e=Je,Bt=$e,Dt={9:Ye,10:Xe,11:Ze,12:Je,13:$e,14:Bt},Ft="Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji",Mt={9:"",10:"",11:"",12:"",13:"",14:Ft},et="Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu",tt="Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb",it=tt+" Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd",st=it+" Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho",at=st+" Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi",rt=at+" Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith",Ut=rt+" "+Ot,qt={9:tt,10:it,11:st,12:at,13:rt,14:Ut},nt={};function jt(e){var t=nt[e]={binary:U(Dt[e]+" "+et),binaryOfStrings:U(Mt[e]),nonBinary:{General_Category:U(et),Script:U(qt[e])}};t.nonBinary.Script_Extensions=t.nonBinary.Script,t.nonBinary.gc=t.nonBinary.General_Category,t.nonBinary.sc=t.nonBinary.Script,t.nonBinary.scx=t.nonBinary.Script_Extensions}for(var Ve=0,ut=[9,10,11,12,13,14];Ve<ut.length;Ve+=1){var Gt=ut[Ve];jt(Gt)}var c=C.prototype,de=function(t,i){this.parent=t,this.base=i||this};de.prototype.separatedFrom=function(t){for(var i=this;i;i=i.parent)for(var s=t;s;s=s.parent)if(i.base===s.base&&i!==s)return!0;return!1},de.prototype.sibling=function(){return new de(this.parent,this.base)};var O=function(t){this.parser=t,this.validFlags="gim"+(t.options.ecmaVersion>=6?"uy":"")+(t.options.ecmaVersion>=9?"s":"")+(t.options.ecmaVersion>=13?"d":"")+(t.options.ecmaVersion>=15?"v":""),this.unicodeProperties=nt[t.options.ecmaVersion>=14?14:t.options.ecmaVersion],this.source="",this.flags="",this.start=0,this.switchU=!1,this.switchV=!1,this.switchN=!1,this.pos=0,this.lastIntValue=0,this.lastStringValue="",this.lastAssertionIsQuantifiable=!1,this.numCapturingParens=0,this.maxBackReference=0,this.groupNames=Object.create(null),this.backReferenceNames=[],this.branchID=null};O.prototype.reset=function(t,i,s){var r=s.indexOf("v")!==-1,n=s.indexOf("u")!==-1;if(this.start=t|0,this.source=i+"",this.flags=s,r&&this.parser.options.ecmaVersion>=15)this.switchU=!0,this.switchV=!0,this.switchN=!0;else this.switchU=n&&this.parser.options.ecmaVersion>=6,this.switchV=!1,this.switchN=n&&this.parser.options.ecmaVersion>=9},O.prototype.raise=function(t){this.parser.raiseRecoverable(this.start,"Invalid regular expression: /"+this.source+"/: "+t)},O.prototype.at=function(t,i){if(i===void 0)i=!1;var s=this.source,r=s.length;if(t>=r)return-1;var n=s.charCodeAt(t);if(!(i||this.switchU)||n<=55295||n>=57344||t+1>=r)return n;var u=s.charCodeAt(t+1);return u>=56320&&u<=57343?(n<<10)+u-56613888:n},O.prototype.nextIndex=function(t,i){if(i===void 0)i=!1;var s=this.source,r=s.length;if(t>=r)return r;var n=s.charCodeAt(t),u;if(!(i||this.switchU)||n<=55295||n>=57344||t+1>=r||(u=s.charCodeAt(t+1))<56320||u>57343)return t+1;return t+2},O.prototype.current=function(t){if(t===void 0)t=!1;return this.at(this.pos,t)},O.prototype.lookahead=function(t){if(t===void 0)t=!1;return this.at(this.nextIndex(this.pos,t),t)},O.prototype.advance=function(t){if(t===void 0)t=!1;this.pos=this.nextIndex(this.pos,t)},O.prototype.eat=function(t,i){if(i===void 0)i=!1;if(this.current(i)===t)return this.advance(i),!0;return!1},O.prototype.eatChars=function(t,i){if(i===void 0)i=!1;var s=this.pos;for(var r=0,n=t;r<n.length;r+=1){var u=n[r],o=this.at(s,i);if(o===-1||o!==u)return!1;s=this.nextIndex(s,i)}return this.pos=s,!0},c.validateRegExpFlags=function(e){var{validFlags:t,flags:i}=e,s=!1,r=!1;for(var n=0;n<i.length;n++){var u=i.charAt(n);if(t.indexOf(u)===-1)this.raise(e.start,"Invalid regular expression flag");if(i.indexOf(u,n+1)>-1)this.raise(e.start,"Duplicate regular expression flag");if(u==="u")s=!0;if(u==="v")r=!0}if(this.options.ecmaVersion>=15&&s&&r)this.raise(e.start,"Invalid regular expression flag")};function Ht(e){for(var t in e)return!0;return!1}c.validateRegExpPattern=function(e){if(this.regexp_pattern(e),!e.switchN&&this.options.ecmaVersion>=9&&Ht(e.groupNames))e.switchN=!0,this.regexp_pattern(e)},c.regexp_pattern=function(e){if(e.pos=0,e.lastIntValue=0,e.lastStringValue="",e.lastAssertionIsQuantifiable=!1,e.numCapturingParens=0,e.maxBackReference=0,e.groupNames=Object.create(null),e.backReferenceNames.length=0,e.branchID=null,this.regexp_disjunction(e),e.pos!==e.source.length){if(e.eat(41))e.raise("Unmatched ')'");if(e.eat(93)||e.eat(125))e.raise("Lone quantifier brackets")}if(e.maxBackReference>e.numCapturingParens)e.raise("Invalid escape");for(var t=0,i=e.backReferenceNames;t<i.length;t+=1){var s=i[t];if(!e.groupNames[s])e.raise("Invalid named capture referenced")}},c.regexp_disjunction=function(e){var t=this.options.ecmaVersion>=16;if(t)e.branchID=new de(e.branchID,null);this.regexp_alternative(e);while(e.eat(124)){if(t)e.branchID=e.branchID.sibling();this.regexp_alternative(e)}if(t)e.branchID=e.branchID.parent;if(this.regexp_eatQuantifier(e,!0))e.raise("Nothing to repeat");if(e.eat(123))e.raise("Lone quantifier brackets")},c.regexp_alternative=function(e){while(e.pos<e.source.length&&this.regexp_eatTerm(e));},c.regexp_eatTerm=function(e){if(this.regexp_eatAssertion(e)){if(e.lastAssertionIsQuantifiable&&this.regexp_eatQuantifier(e)){if(e.switchU)e.raise("Invalid quantifier")}return!0}if(e.switchU?this.regexp_eatAtom(e):this.regexp_eatExtendedAtom(e))return this.regexp_eatQuantifier(e),!0;return!1},c.regexp_eatAssertion=function(e){var t=e.pos;if(e.lastAssertionIsQuantifiable=!1,e.eat(94)||e.eat(36))return!0;if(e.eat(92)){if(e.eat(66)||e.eat(98))return!0;e.pos=t}if(e.eat(40)&&e.eat(63)){var i=!1;if(this.options.ecmaVersion>=9)i=e.eat(60);if(e.eat(61)||e.eat(33)){if(this.regexp_disjunction(e),!e.eat(41))e.raise("Unterminated group");return e.lastAssertionIsQuantifiable=!i,!0}}return e.pos=t,!1},c.regexp_eatQuantifier=function(e,t){if(t===void 0)t=!1;if(this.regexp_eatQuantifierPrefix(e,t))return e.eat(63),!0;return!1},c.regexp_eatQuantifierPrefix=function(e,t){return e.eat(42)||e.eat(43)||e.eat(63)||this.regexp_eatBracedQuantifier(e,t)},c.regexp_eatBracedQuantifier=function(e,t){var i=e.pos;if(e.eat(123)){var s=0,r=-1;if(this.regexp_eatDecimalDigits(e)){if(s=e.lastIntValue,e.eat(44)&&this.regexp_eatDecimalDigits(e))r=e.lastIntValue;if(e.eat(125)){if(r!==-1&&r<s&&!t)e.raise("numbers out of order in {} quantifier");return!0}}if(e.switchU&&!t)e.raise("Incomplete quantifier");e.pos=i}return!1},c.regexp_eatAtom=function(e){return this.regexp_eatPatternCharacters(e)||e.eat(46)||this.regexp_eatReverseSolidusAtomEscape(e)||this.regexp_eatCharacterClass(e)||this.regexp_eatUncapturingGroup(e)||this.regexp_eatCapturingGroup(e)},c.regexp_eatReverseSolidusAtomEscape=function(e){var t=e.pos;if(e.eat(92)){if(this.regexp_eatAtomEscape(e))return!0;e.pos=t}return!1},c.regexp_eatUncapturingGroup=function(e){var t=e.pos;if(e.eat(40)){if(e.eat(63)){if(this.options.ecmaVersion>=16){var i=this.regexp_eatModifiers(e),s=e.eat(45);if(i||s){for(var r=0;r<i.length;r++){var n=i.charAt(r);if(i.indexOf(n,r+1)>-1)e.raise("Duplicate regular expression modifiers")}if(s){var u=this.regexp_eatModifiers(e);if(!i&&!u&&e.current()===58)e.raise("Invalid regular expression modifiers");for(var o=0;o<u.length;o++){var h=u.charAt(o);if(u.indexOf(h,o+1)>-1||i.indexOf(h)>-1)e.raise("Duplicate regular expression modifiers")}}}}if(e.eat(58)){if(this.regexp_disjunction(e),e.eat(41))return!0;e.raise("Unterminated group")}}e.pos=t}return!1},c.regexp_eatCapturingGroup=function(e){if(e.eat(40)){if(this.options.ecmaVersion>=9)this.regexp_groupSpecifier(e);else if(e.current()===63)e.raise("Invalid group");if(this.regexp_disjunction(e),e.eat(41))return e.numCapturingParens+=1,!0;e.raise("Unterminated group")}return!1},c.regexp_eatModifiers=function(e){var t="",i=0;while((i=e.current())!==-1&&Wt(i))t+=D(i),e.advance();return t};function Wt(e){return e===105||e===109||e===115}c.regexp_eatExtendedAtom=function(e){return e.eat(46)||this.regexp_eatReverseSolidusAtomEscape(e)||this.regexp_eatCharacterClass(e)||this.regexp_eatUncapturingGroup(e)||this.regexp_eatCapturingGroup(e)||this.regexp_eatInvalidBracedQuantifier(e)||this.regexp_eatExtendedPatternCharacter(e)},c.regexp_eatInvalidBracedQuantifier=function(e){if(this.regexp_eatBracedQuantifier(e,!0))e.raise("Nothing to repeat");return!1},c.regexp_eatSyntaxCharacter=function(e){var t=e.current();if(ot(t))return e.lastIntValue=t,e.advance(),!0;return!1};function ot(e){return e===36||e>=40&&e<=43||e===46||e===63||e>=91&&e<=94||e>=123&&e<=125}c.regexp_eatPatternCharacters=function(e){var t=e.pos,i=0;while((i=e.current())!==-1&&!ot(i))e.advance();return e.pos!==t},c.regexp_eatExtendedPatternCharacter=function(e){var t=e.current();if(t!==-1&&t!==36&&!(t>=40&&t<=43)&&t!==46&&t!==63&&t!==91&&t!==94&&t!==124)return e.advance(),!0;return!1},c.regexp_groupSpecifier=function(e){if(e.eat(63)){if(!this.regexp_eatGroupName(e))e.raise("Invalid group");var t=this.options.ecmaVersion>=16,i=e.groupNames[e.lastStringValue];if(i)if(t)for(var s=0,r=i;s<r.length;s+=1){var n=r[s];if(!n.separatedFrom(e.branchID))e.raise("Duplicate capture group name")}else e.raise("Duplicate capture group name");if(t)(i||(e.groupNames[e.lastStringValue]=[])).push(e.branchID);else e.groupNames[e.lastStringValue]=!0}},c.regexp_eatGroupName=function(e){if(e.lastStringValue="",e.eat(60)){if(this.regexp_eatRegExpIdentifierName(e)&&e.eat(62))return!0;e.raise("Invalid capture group name")}return!1},c.regexp_eatRegExpIdentifierName=function(e){if(e.lastStringValue="",this.regexp_eatRegExpIdentifierStart(e)){e.lastStringValue+=D(e.lastIntValue);while(this.regexp_eatRegExpIdentifierPart(e))e.lastStringValue+=D(e.lastIntValue);return!0}return!1},c.regexp_eatRegExpIdentifierStart=function(e){var t=e.pos,i=this.options.ecmaVersion>=11,s=e.current(i);if(e.advance(i),s===92&&this.regexp_eatRegExpUnicodeEscapeSequence(e,i))s=e.lastIntValue;if(zt(s))return e.lastIntValue=s,!0;return e.pos=t,!1};function zt(e){return L(e,!0)||e===36||e===95}c.regexp_eatRegExpIdentifierPart=function(e){var t=e.pos,i=this.options.ecmaVersion>=11,s=e.current(i);if(e.advance(i),s===92&&this.regexp_eatRegExpUnicodeEscapeSequence(e,i))s=e.lastIntValue;if(Kt(s))return e.lastIntValue=s,!0;return e.pos=t,!1};function Kt(e){return B(e,!0)||e===36||e===95||e===8204||e===8205}c.regexp_eatAtomEscape=function(e){if(this.regexp_eatBackReference(e)||this.regexp_eatCharacterClassEscape(e)||this.regexp_eatCharacterEscape(e)||e.switchN&&this.regexp_eatKGroupName(e))return!0;if(e.switchU){if(e.current()===99)e.raise("Invalid unicode escape");e.raise("Invalid escape")}return!1},c.regexp_eatBackReference=function(e){var t=e.pos;if(this.regexp_eatDecimalEscape(e)){var i=e.lastIntValue;if(e.switchU){if(i>e.maxBackReference)e.maxBackReference=i;return!0}if(i<=e.numCapturingParens)return!0;e.pos=t}return!1},c.regexp_eatKGroupName=function(e){if(e.eat(107)){if(this.regexp_eatGroupName(e))return e.backReferenceNames.push(e.lastStringValue),!0;e.raise("Invalid named reference")}return!1},c.regexp_eatCharacterEscape=function(e){return this.regexp_eatControlEscape(e)||this.regexp_eatCControlLetter(e)||this.regexp_eatZero(e)||this.regexp_eatHexEscapeSequence(e)||this.regexp_eatRegExpUnicodeEscapeSequence(e,!1)||!e.switchU&&this.regexp_eatLegacyOctalEscapeSequence(e)||this.regexp_eatIdentityEscape(e)},c.regexp_eatCControlLetter=function(e){var t=e.pos;if(e.eat(99)){if(this.regexp_eatControlLetter(e))return!0;e.pos=t}return!1},c.regexp_eatZero=function(e){if(e.current()===48&&!xe(e.lookahead()))return e.lastIntValue=0,e.advance(),!0;return!1},c.regexp_eatControlEscape=function(e){var t=e.current();if(t===116)return e.lastIntValue=9,e.advance(),!0;if(t===110)return e.lastIntValue=10,e.advance(),!0;if(t===118)return e.lastIntValue=11,e.advance(),!0;if(t===102)return e.lastIntValue=12,e.advance(),!0;if(t===114)return e.lastIntValue=13,e.advance(),!0;return!1},c.regexp_eatControlLetter=function(e){var t=e.current();if(ht(t))return e.lastIntValue=t%32,e.advance(),!0;return!1};function ht(e){return e>=65&&e<=90||e>=97&&e<=122}c.regexp_eatRegExpUnicodeEscapeSequence=function(e,t){if(t===void 0)t=!1;var i=e.pos,s=t||e.switchU;if(e.eat(117)){if(this.regexp_eatFixedHexDigits(e,4)){var r=e.lastIntValue;if(s&&r>=55296&&r<=56319){var n=e.pos;if(e.eat(92)&&e.eat(117)&&this.regexp_eatFixedHexDigits(e,4)){var u=e.lastIntValue;if(u>=56320&&u<=57343)return e.lastIntValue=(r-55296)*1024+(u-56320)+65536,!0}e.pos=n,e.lastIntValue=r}return!0}if(s&&e.eat(123)&&this.regexp_eatHexDigits(e)&&e.eat(125)&&Qt(e.lastIntValue))return!0;if(s)e.raise("Invalid unicode escape");e.pos=i}return!1};function Qt(e){return e>=0&&e<=1114111}c.regexp_eatIdentityEscape=function(e){if(e.switchU){if(this.regexp_eatSyntaxCharacter(e))return!0;if(e.eat(47))return e.lastIntValue=47,!0;return!1}var t=e.current();if(t!==99&&(!e.switchN||t!==107))return e.lastIntValue=t,e.advance(),!0;return!1},c.regexp_eatDecimalEscape=function(e){e.lastIntValue=0;var t=e.current();if(t>=49&&t<=57){do e.lastIntValue=10*e.lastIntValue+(t-48),e.advance();while((t=e.current())>=48&&t<=57);return!0}return!1};var ct=0,M=1,T=2;c.regexp_eatCharacterClassEscape=function(e){var t=e.current();if(Yt(t))return e.lastIntValue=-1,e.advance(),M;var i=!1;if(e.switchU&&this.options.ecmaVersion>=9&&((i=t===80)||t===112)){e.lastIntValue=-1,e.advance();var s;if(e.eat(123)&&(s=this.regexp_eatUnicodePropertyValueExpression(e))&&e.eat(125)){if(i&&s===T)e.raise("Invalid property name");return s}e.raise("Invalid property name")}return ct};function Yt(e){return e===100||e===68||e===115||e===83||e===119||e===87}c.regexp_eatUnicodePropertyValueExpression=function(e){var t=e.pos;if(this.regexp_eatUnicodePropertyName(e)&&e.eat(61)){var i=e.lastStringValue;if(this.regexp_eatUnicodePropertyValue(e)){var s=e.lastStringValue;return this.regexp_validateUnicodePropertyNameAndValue(e,i,s),M}}if(e.pos=t,this.regexp_eatLoneUnicodePropertyNameOrValue(e)){var r=e.lastStringValue;return this.regexp_validateUnicodePropertyNameOrValue(e,r)}return ct},c.regexp_validateUnicodePropertyNameAndValue=function(e,t,i){if(!H(e.unicodeProperties.nonBinary,t))e.raise("Invalid property name");if(!e.unicodeProperties.nonBinary[t].test(i))e.raise("Invalid property value")},c.regexp_validateUnicodePropertyNameOrValue=function(e,t){if(e.unicodeProperties.binary.test(t))return M;if(e.switchV&&e.unicodeProperties.binaryOfStrings.test(t))return T;e.raise("Invalid property name")},c.regexp_eatUnicodePropertyName=function(e){var t=0;e.lastStringValue="";while(pt(t=e.current()))e.lastStringValue+=D(t),e.advance();return e.lastStringValue!==""};function pt(e){return ht(e)||e===95}c.regexp_eatUnicodePropertyValue=function(e){var t=0;e.lastStringValue="";while(Xt(t=e.current()))e.lastStringValue+=D(t),e.advance();return e.lastStringValue!==""};function Xt(e){return pt(e)||xe(e)}c.regexp_eatLoneUnicodePropertyNameOrValue=function(e){return this.regexp_eatUnicodePropertyValue(e)},c.regexp_eatCharacterClass=function(e){if(e.eat(91)){var t=e.eat(94),i=this.regexp_classContents(e);if(!e.eat(93))e.raise("Unterminated character class");if(t&&i===T)e.raise("Negated character class may contain strings");return!0}return!1},c.regexp_classContents=function(e){if(e.current()===93)return M;if(e.switchV)return this.regexp_classSetExpression(e);return this.regexp_nonEmptyClassRanges(e),M},c.regexp_nonEmptyClassRanges=function(e){while(this.regexp_eatClassAtom(e)){var t=e.lastIntValue;if(e.eat(45)&&this.regexp_eatClassAtom(e)){var i=e.lastIntValue;if(e.switchU&&(t===-1||i===-1))e.raise("Invalid character class");if(t!==-1&&i!==-1&&t>i)e.raise("Range out of order in character class")}}},c.regexp_eatClassAtom=function(e){var t=e.pos;if(e.eat(92)){if(this.regexp_eatClassEscape(e))return!0;if(e.switchU){var i=e.current();if(i===99||dt(i))e.raise("Invalid class escape");e.raise("Invalid escape")}e.pos=t}var s=e.current();if(s!==93)return e.lastIntValue=s,e.advance(),!0;return!1},c.regexp_eatClassEscape=function(e){var t=e.pos;if(e.eat(98))return e.lastIntValue=8,!0;if(e.switchU&&e.eat(45))return e.lastIntValue=45,!0;if(!e.switchU&&e.eat(99)){if(this.regexp_eatClassControlLetter(e))return!0;e.pos=t}return this.regexp_eatCharacterClassEscape(e)||this.regexp_eatCharacterEscape(e)},c.regexp_classSetExpression=function(e){var t=M,i;if(this.regexp_eatClassSetRange(e));else if(i=this.regexp_eatClassSetOperand(e)){if(i===T)t=T;var s=e.pos;while(e.eatChars([38,38])){if(e.current()!==38&&(i=this.regexp_eatClassSetOperand(e))){if(i!==T)t=M;continue}e.raise("Invalid character in character class")}if(s!==e.pos)return t;while(e.eatChars([45,45])){if(this.regexp_eatClassSetOperand(e))continue;e.raise("Invalid character in character class")}if(s!==e.pos)return t}else e.raise("Invalid character in character class");for(;;){if(this.regexp_eatClassSetRange(e))continue;if(i=this.regexp_eatClassSetOperand(e),!i)return t;if(i===T)t=T}},c.regexp_eatClassSetRange=function(e){var t=e.pos;if(this.regexp_eatClassSetCharacter(e)){var i=e.lastIntValue;if(e.eat(45)&&this.regexp_eatClassSetCharacter(e)){var s=e.lastIntValue;if(i!==-1&&s!==-1&&i>s)e.raise("Range out of order in character class");return!0}e.pos=t}return!1},c.regexp_eatClassSetOperand=function(e){if(this.regexp_eatClassSetCharacter(e))return M;return this.regexp_eatClassStringDisjunction(e)||this.regexp_eatNestedClass(e)},c.regexp_eatNestedClass=function(e){var t=e.pos;if(e.eat(91)){var i=e.eat(94),s=this.regexp_classContents(e);if(e.eat(93)){if(i&&s===T)e.raise("Negated character class may contain strings");return s}e.pos=t}if(e.eat(92)){var r=this.regexp_eatCharacterClassEscape(e);if(r)return r;e.pos=t}return null},c.regexp_eatClassStringDisjunction=function(e){var t=e.pos;if(e.eatChars([92,113])){if(e.eat(123)){var i=this.regexp_classStringDisjunctionContents(e);if(e.eat(125))return i}else e.raise("Invalid escape");e.pos=t}return null},c.regexp_classStringDisjunctionContents=function(e){var t=this.regexp_classString(e);while(e.eat(124))if(this.regexp_classString(e)===T)t=T;return t},c.regexp_classString=function(e){var t=0;while(this.regexp_eatClassSetCharacter(e))t++;return t===1?M:T},c.regexp_eatClassSetCharacter=function(e){var t=e.pos;if(e.eat(92)){if(this.regexp_eatCharacterEscape(e)||this.regexp_eatClassSetReservedPunctuator(e))return!0;if(e.eat(98))return e.lastIntValue=8,!0;return e.pos=t,!1}var i=e.current();if(i<0||i===e.lookahead()&&Zt(i))return!1;if(Jt(i))return!1;return e.advance(),e.lastIntValue=i,!0};function Zt(e){return e===33||e>=35&&e<=38||e>=42&&e<=44||e===46||e>=58&&e<=64||e===94||e===96||e===126}function Jt(e){return e===40||e===41||e===45||e===47||e>=91&&e<=93||e>=123&&e<=125}c.regexp_eatClassSetReservedPunctuator=function(e){var t=e.current();if($t(t))return e.lastIntValue=t,e.advance(),!0;return!1};function $t(e){return e===33||e===35||e===37||e===38||e===44||e===45||e>=58&&e<=62||e===64||e===96||e===126}c.regexp_eatClassControlLetter=function(e){var t=e.current();if(xe(t)||t===95)return e.lastIntValue=t%32,e.advance(),!0;return!1},c.regexp_eatHexEscapeSequence=function(e){var t=e.pos;if(e.eat(120)){if(this.regexp_eatFixedHexDigits(e,2))return!0;if(e.switchU)e.raise("Invalid escape");e.pos=t}return!1},c.regexp_eatDecimalDigits=function(e){var t=e.pos,i=0;e.lastIntValue=0;while(xe(i=e.current()))e.lastIntValue=10*e.lastIntValue+(i-48),e.advance();return e.pos!==t};function xe(e){return e>=48&&e<=57}c.regexp_eatHexDigits=function(e){var t=e.pos,i=0;e.lastIntValue=0;while(lt(i=e.current()))e.lastIntValue=16*e.lastIntValue+ft(i),e.advance();return e.pos!==t};function lt(e){return e>=48&&e<=57||e>=65&&e<=70||e>=97&&e<=102}function ft(e){if(e>=65&&e<=70)return 10+(e-65);if(e>=97&&e<=102)return 10+(e-97);return e-48}c.regexp_eatLegacyOctalEscapeSequence=function(e){if(this.regexp_eatOctalDigit(e)){var t=e.lastIntValue;if(this.regexp_eatOctalDigit(e)){var i=e.lastIntValue;if(t<=3&&this.regexp_eatOctalDigit(e))e.lastIntValue=t*64+i*8+e.lastIntValue;else e.lastIntValue=t*8+i}else e.lastIntValue=t;return!0}return!1},c.regexp_eatOctalDigit=function(e){var t=e.current();if(dt(t))return e.lastIntValue=t-48,e.advance(),!0;return e.lastIntValue=0,!1};function dt(e){return e>=48&&e<=55}c.regexp_eatFixedHexDigits=function(e,t){var i=e.pos;e.lastIntValue=0;for(var s=0;s<t;++s){var r=e.current();if(!lt(r))return e.pos=i,!1;e.lastIntValue=16*e.lastIntValue+ft(r),e.advance()}return!0};var me=function(t){if(this.type=t.type,this.value=t.value,this.start=t.start,this.end=t.end,t.options.locations)this.loc=new J(t,t.startLoc,t.endLoc);if(t.options.ranges)this.range=[t.start,t.end]},x=C.prototype;if(x.next=function(e){if(!e&&this.type.keyword&&this.containsEsc)this.raiseRecoverable(this.start,"Escape sequence in keyword "+this.type.keyword);if(this.options.onToken)this.options.onToken(new me(this));this.lastTokEnd=this.end,this.lastTokStart=this.start,this.lastTokEndLoc=this.endLoc,this.lastTokStartLoc=this.startLoc,this.nextToken()},x.getToken=function(){return this.next(),new me(this)},typeof Symbol<"u")x[Symbol.iterator]=function(){var e=this;return{next:function(){var t=e.getToken();return{done:t.type===a.eof,value:t}}}};x.nextToken=function(){var e=this.curContext();if(!e||!e.preserveSpace)this.skipSpace();if(this.start=this.pos,this.options.locations)this.startLoc=this.curPosition();if(this.pos>=this.input.length)return this.finishToken(a.eof);if(e.override)return e.override(this);else this.readToken(this.fullCharCodeAtPos())},x.readToken=function(e){if(L(e,this.options.ecmaVersion>=6)||e===92)return this.readWord();return this.getTokenFromCode(e)},x.fullCharCodeAtPos=function(){var e=this.input.charCodeAt(this.pos);if(e<=55295||e>=56320)return e;var t=this.input.charCodeAt(this.pos+1);return t<=56319||t>=57344?e:(e<<10)+t-56613888},x.skipBlockComment=function(){var e=this.options.onComment&&this.curPosition(),t=this.pos,i=this.input.indexOf("*/",this.pos+=2);if(i===-1)this.raise(this.pos-2,"Unterminated comment");if(this.pos=i+2,this.options.locations)for(var s=void 0,r=t;(s=Oe(this.input,r,this.pos))>-1;)++this.curLine,r=this.lineStart=s;if(this.options.onComment)this.options.onComment(!0,this.input.slice(t+2,i),t,this.pos,e,this.curPosition())},x.skipLineComment=function(e){var t=this.pos,i=this.options.onComment&&this.curPosition(),s=this.input.charCodeAt(this.pos+=e);while(this.pos<this.input.length&&!j(s))s=this.input.charCodeAt(++this.pos);if(this.options.onComment)this.options.onComment(!1,this.input.slice(t+e,this.pos),t,this.pos,i,this.curPosition())},x.skipSpace=function(){e:while(this.pos<this.input.length){var e=this.input.charCodeAt(this.pos);switch(e){case 32:case 160:++this.pos;break;case 13:if(this.input.charCodeAt(this.pos+1)===10)++this.pos;case 10:case 8232:case 8233:if(++this.pos,this.options.locations)++this.curLine,this.lineStart=this.pos;break;case 47:switch(this.input.charCodeAt(this.pos+1)){case 42:this.skipBlockComment();break;case 47:this.skipLineComment(2);break;default:break e}break;default:if(e>8&&e<14||e>=5760&&Ce.test(String.fromCharCode(e)))++this.pos;else break e}}},x.finishToken=function(e,t){if(this.end=this.pos,this.options.locations)this.endLoc=this.curPosition();var i=this.type;this.type=e,this.value=t,this.updateContext(i)},x.readToken_dot=function(){var e=this.input.charCodeAt(this.pos+1);if(e>=48&&e<=57)return this.readNumber(!0);var t=this.input.charCodeAt(this.pos+2);if(this.options.ecmaVersion>=6&&e===46&&t===46)return this.pos+=3,this.finishToken(a.ellipsis);else return++this.pos,this.finishToken(a.dot)},x.readToken_slash=function(){var e=this.input.charCodeAt(this.pos+1);if(this.exprAllowed)return++this.pos,this.readRegexp();if(e===61)return this.finishOp(a.assign,2);return this.finishOp(a.slash,1)},x.readToken_mult_modulo_exp=function(e){var t=this.input.charCodeAt(this.pos+1),i=1,s=e===42?a.star:a.modulo;if(this.options.ecmaVersion>=7&&e===42&&t===42)++i,s=a.starstar,t=this.input.charCodeAt(this.pos+2);if(t===61)return this.finishOp(a.assign,i+1);return this.finishOp(s,i)},x.readToken_pipe_amp=function(e){var t=this.input.charCodeAt(this.pos+1);if(t===e){if(this.options.ecmaVersion>=12){var i=this.input.charCodeAt(this.pos+2);if(i===61)return this.finishOp(a.assign,3)}return this.finishOp(e===124?a.logicalOR:a.logicalAND,2)}if(t===61)return this.finishOp(a.assign,2);return this.finishOp(e===124?a.bitwiseOR:a.bitwiseAND,1)},x.readToken_caret=function(){var e=this.input.charCodeAt(this.pos+1);if(e===61)return this.finishOp(a.assign,2);return this.finishOp(a.bitwiseXOR,1)},x.readToken_plus_min=function(e){var t=this.input.charCodeAt(this.pos+1);if(t===e){if(t===45&&!this.inModule&&this.input.charCodeAt(this.pos+2)===62&&(this.lastTokEnd===0||w.test(this.input.slice(this.lastTokEnd,this.pos))))return this.skipLineComment(3),this.skipSpace(),this.nextToken();return this.finishOp(a.incDec,2)}if(t===61)return this.finishOp(a.assign,2);return this.finishOp(a.plusMin,1)},x.readToken_lt_gt=function(e){var t=this.input.charCodeAt(this.pos+1),i=1;if(t===e){if(i=e===62&&this.input.charCodeAt(this.pos+2)===62?3:2,this.input.charCodeAt(this.pos+i)===61)return this.finishOp(a.assign,i+1);return this.finishOp(a.bitShift,i)}if(t===33&&e===60&&!this.inModule&&this.input.charCodeAt(this.pos+2)===45&&this.input.charCodeAt(this.pos+3)===45)return this.skipLineComment(4),this.skipSpace(),this.nextToken();if(t===61)i=2;return this.finishOp(a.relational,i)},x.readToken_eq_excl=function(e){var t=this.input.charCodeAt(this.pos+1);if(t===61)return this.finishOp(a.equality,this.input.charCodeAt(this.pos+2)===61?3:2);if(e===61&&t===62&&this.options.ecmaVersion>=6)return this.pos+=2,this.finishToken(a.arrow);return this.finishOp(e===61?a.eq:a.prefix,1)},x.readToken_question=function(){var e=this.options.ecmaVersion;if(e>=11){var t=this.input.charCodeAt(this.pos+1);if(t===46){var i=this.input.charCodeAt(this.pos+2);if(i<48||i>57)return this.finishOp(a.questionDot,2)}if(t===63){if(e>=12){var s=this.input.charCodeAt(this.pos+2);if(s===61)return this.finishOp(a.assign,3)}return this.finishOp(a.coalesce,2)}}return this.finishOp(a.question,1)},x.readToken_numberSign=function(){var e=this.options.ecmaVersion,t=35;if(e>=13){if(++this.pos,t=this.fullCharCodeAtPos(),L(t,!0)||t===92)return this.finishToken(a.privateId,this.readWord1())}this.raise(this.pos,"Unexpected character '"+D(t)+"'")},x.getTokenFromCode=function(e){switch(e){case 46:return this.readToken_dot();case 40:return++this.pos,this.finishToken(a.parenL);case 41:return++this.pos,this.finishToken(a.parenR);case 59:return++this.pos,this.finishToken(a.semi);case 44:return++this.pos,this.finishToken(a.comma);case 91:return++this.pos,this.finishToken(a.bracketL);case 93:return++this.pos,this.finishToken(a.bracketR);case 123:return++this.pos,this.finishToken(a.braceL);case 125:return++this.pos,this.finishToken(a.braceR);case 58:return++this.pos,this.finishToken(a.colon);case 96:if(this.options.ecmaVersion<6)break;return++this.pos,this.finishToken(a.backQuote);case 48:var t=this.input.charCodeAt(this.pos+1);if(t===120||t===88)return this.readRadixNumber(16);if(this.options.ecmaVersion>=6){if(t===111||t===79)return this.readRadixNumber(8);if(t===98||t===66)return this.readRadixNumber(2)}case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return this.readNumber(!1);case 34:case 39:return this.readString(e);case 47:return this.readToken_slash();case 37:case 42:return this.readToken_mult_modulo_exp(e);case 124:case 38:return this.readToken_pipe_amp(e);case 94:return this.readToken_caret();case 43:case 45:return this.readToken_plus_min(e);case 60:case 62:return this.readToken_lt_gt(e);case 61:case 33:return this.readToken_eq_excl(e);case 63:return this.readToken_question();case 126:return this.finishOp(a.prefix,1);case 35:return this.readToken_numberSign()}this.raise(this.pos,"Unexpected character '"+D(e)+"'")},x.finishOp=function(e,t){var i=this.input.slice(this.pos,this.pos+t);return this.pos+=t,this.finishToken(e,i)},x.readRegexp=function(){var e,t,i=this.pos;for(;;){if(this.pos>=this.input.length)this.raise(i,"Unterminated regular expression");var s=this.input.charAt(this.pos);if(w.test(s))this.raise(i,"Unterminated regular expression");if(!e){if(s==="[")t=!0;else if(s==="]"&&t)t=!1;else if(s==="/"&&!t)break;e=s==="\\"}else e=!1;++this.pos}var r=this.input.slice(i,this.pos);++this.pos;var n=this.pos,u=this.readWord1();if(this.containsEsc)this.unexpected(n);var o=this.regexpState||(this.regexpState=new O(this));o.reset(i,r,u),this.validateRegExpFlags(o),this.validateRegExpPattern(o);var h=null;try{h=new RegExp(r,u)}catch(l){}return this.finishToken(a.regexp,{pattern:r,flags:u,value:h})},x.readInt=function(e,t,i){var s=this.options.ecmaVersion>=12&&t===void 0,r=i&&this.input.charCodeAt(this.pos)===48,n=this.pos,u=0,o=0;for(var h=0,l=t==null?1/0:t;h<l;++h,++this.pos){var d=this.input.charCodeAt(this.pos),_=void 0;if(s&&d===95){if(r)this.raiseRecoverable(this.pos,"Numeric separator is not allowed in legacy octal numeric literals");if(o===95)this.raiseRecoverable(this.pos,"Numeric separator must be exactly one underscore");if(h===0)this.raiseRecoverable(this.pos,"Numeric separator is not allowed at the first of digits");o=d;continue}if(d>=97)_=d-97+10;else if(d>=65)_=d-65+10;else if(d>=48&&d<=57)_=d-48;else _=1/0;if(_>=e)break;o=d,u=u*e+_}if(s&&o===95)this.raiseRecoverable(this.pos-1,"Numeric separator is not allowed at the last of digits");if(this.pos===n||t!=null&&this.pos-n!==t)return null;return u};function ei(e,t){if(t)return parseInt(e,8);return parseFloat(e.replace(/_/g,""))}function xt(e){if(typeof BigInt!=="function")return null;return BigInt(e.replace(/_/g,""))}x.readRadixNumber=function(e){var t=this.pos;this.pos+=2;var i=this.readInt(e);if(i==null)this.raise(this.start+2,"Expected number in radix "+e);if(this.options.ecmaVersion>=11&&this.input.charCodeAt(this.pos)===110)i=xt(this.input.slice(t,this.pos)),++this.pos;else if(L(this.fullCharCodeAtPos()))this.raise(this.pos,"Identifier directly after number");return this.finishToken(a.num,i)},x.readNumber=function(e){var t=this.pos;if(!e&&this.readInt(10,void 0,!0)===null)this.raise(t,"Invalid number");var i=this.pos-t>=2&&this.input.charCodeAt(t)===48;if(i&&this.strict)this.raise(t,"Invalid number");var s=this.input.charCodeAt(this.pos);if(!i&&!e&&this.options.ecmaVersion>=11&&s===110){var r=xt(this.input.slice(t,this.pos));if(++this.pos,L(this.fullCharCodeAtPos()))this.raise(this.pos,"Identifier directly after number");return this.finishToken(a.num,r)}if(i&&/[89]/.test(this.input.slice(t,this.pos)))i=!1;if(s===46&&!i)++this.pos,this.readInt(10),s=this.input.charCodeAt(this.pos);if((s===69||s===101)&&!i){if(s=this.input.charCodeAt(++this.pos),s===43||s===45)++this.pos;if(this.readInt(10)===null)this.raise(t,"Invalid number")}if(L(this.fullCharCodeAtPos()))this.raise(this.pos,"Identifier directly after number");var n=ei(this.input.slice(t,this.pos),i);return this.finishToken(a.num,n)},x.readCodePoint=function(){var e=this.input.charCodeAt(this.pos),t;if(e===123){if(this.options.ecmaVersion<6)this.unexpected();var i=++this.pos;if(t=this.readHexChar(this.input.indexOf("}",this.pos)-this.pos),++this.pos,t>1114111)this.invalidStringToken(i,"Code point out of bounds")}else t=this.readHexChar(4);return t},x.readString=function(e){var t="",i=++this.pos;for(;;){if(this.pos>=this.input.length)this.raise(this.start,"Unterminated string constant");var s=this.input.charCodeAt(this.pos);if(s===e)break;if(s===92)t+=this.input.slice(i,this.pos),t+=this.readEscapedChar(!1),i=this.pos;else if(s===8232||s===8233){if(this.options.ecmaVersion<10)this.raise(this.start,"Unterminated string constant");if(++this.pos,this.options.locations)this.curLine++,this.lineStart=this.pos}else{if(j(s))this.raise(this.start,"Unterminated string constant");++this.pos}}return t+=this.input.slice(i,this.pos++),this.finishToken(a.string,t)};var mt={};x.tryReadTemplateToken=function(){this.inTemplateElement=!0;try{this.readTmplToken()}catch(e){if(e===mt)this.readInvalidTemplateToken();else throw e}this.inTemplateElement=!1},x.invalidStringToken=function(e,t){if(this.inTemplateElement&&this.options.ecmaVersion>=9)throw mt;else this.raise(e,t)},x.readTmplToken=function(){var e="",t=this.pos;for(;;){if(this.pos>=this.input.length)this.raise(this.start,"Unterminated template");var i=this.input.charCodeAt(this.pos);if(i===96||i===36&&this.input.charCodeAt(this.pos+1)===123){if(this.pos===this.start&&(this.type===a.template||this.type===a.invalidTemplate))if(i===36)return this.pos+=2,this.finishToken(a.dollarBraceL);else return++this.pos,this.finishToken(a.backQuote);return e+=this.input.slice(t,this.pos),this.finishToken(a.template,e)}if(i===92)e+=this.input.slice(t,this.pos),e+=this.readEscapedChar(!0),t=this.pos;else if(j(i)){switch(e+=this.input.slice(t,this.pos),++this.pos,i){case 13:if(this.input.charCodeAt(this.pos)===10)++this.pos;case 10:e+=`
`;break;default:e+=String.fromCharCode(i);break}if(this.options.locations)++this.curLine,this.lineStart=this.pos;t=this.pos}else++this.pos}},x.readInvalidTemplateToken=function(){for(;this.pos<this.input.length;this.pos++)switch(this.input[this.pos]){case"\\":++this.pos;break;case"$":if(this.input[this.pos+1]!=="{")break;case"`":return this.finishToken(a.invalidTemplate,this.input.slice(this.start,this.pos));case"\r":if(this.input[this.pos+1]===`
`)++this.pos;case`
`:case"\u2028":case"\u2029":++this.curLine,this.lineStart=this.pos+1;break}this.raise(this.start,"Unterminated template")},x.readEscapedChar=function(e){var t=this.input.charCodeAt(++this.pos);switch(++this.pos,t){case 110:return`
`;case 114:return"\r";case 120:return String.fromCharCode(this.readHexChar(2));case 117:return D(this.readCodePoint());case 116:return"\t";case 98:return"\b";case 118:return"\v";case 102:return"\f";case 13:if(this.input.charCodeAt(this.pos)===10)++this.pos;case 10:if(this.options.locations)this.lineStart=this.pos,++this.curLine;return"";case 56:case 57:if(this.strict)this.invalidStringToken(this.pos-1,"Invalid escape sequence");if(e){var i=this.pos-1;this.invalidStringToken(i,"Invalid escape sequence in template string")}default:if(t>=48&&t<=55){var s=this.input.substr(this.pos-1,3).match(/^[0-7]+/)[0],r=parseInt(s,8);if(r>255)s=s.slice(0,-1),r=parseInt(s,8);if(this.pos+=s.length-1,t=this.input.charCodeAt(this.pos),(s!=="0"||t===56||t===57)&&(this.strict||e))this.invalidStringToken(this.pos-1-s.length,e?"Octal literal in template string":"Octal literal in strict mode");return String.fromCharCode(r)}if(j(t)){if(this.options.locations)this.lineStart=this.pos,++this.curLine;return""}return String.fromCharCode(t)}},x.readHexChar=function(e){var t=this.pos,i=this.readInt(16,e);if(i===null)this.invalidStringToken(t,"Bad character escape sequence");return i},x.readWord1=function(){this.containsEsc=!1;var e="",t=!0,i=this.pos,s=this.options.ecmaVersion>=6;while(this.pos<this.input.length){var r=this.fullCharCodeAtPos();if(B(r,s))this.pos+=r<=65535?1:2;else if(r===92){this.containsEsc=!0,e+=this.input.slice(i,this.pos);var n=this.pos;if(this.input.charCodeAt(++this.pos)!==117)this.invalidStringToken(this.pos,"Expecting Unicode escape sequence \\uXXXX");++this.pos;var u=this.readCodePoint();if(!(t?L:B)(u,s))this.invalidStringToken(n,"Invalid Unicode escape");e+=D(u),i=this.pos}else break;t=!1}return e+this.input.slice(i,this.pos)},x.readWord=function(){var e=this.readWord1(),t=a.name;if(this.keywords.test(e))t=ne[e];return this.finishToken(t,e)};var vt="8.15.0";C.acorn={Parser:C,version:vt,defaultOptions:ue,Position:W,SourceLocation:J,getLineInfo:Se,Node:se,TokenType:g,tokTypes:a,keywordTypes:ne,TokContext:V,tokContexts:y,isIdentifierChar:B,isIdentifierStart:L,Token:me,isNewLine:j,lineBreak:w,lineBreakG:Re,nonASCIIwhitespace:Ce};function ti(e,t){return C.parse(e,t)}function ii(e,t,i){return C.parseExpressionAt(e,t,i)}function si(e,t){return C.tokenizer(e,t)}b.Node=se,b.Parser=C,b.Position=W,b.SourceLocation=J,b.TokContext=V,b.Token=me,b.TokenType=g,b.defaultOptions=ue,b.getLineInfo=Se,b.isIdentifierChar=B,b.isIdentifierStart=L,b.isNewLine=j,b.keywordTypes=ne,b.lineBreak=w,b.lineBreakG=Re,b.nonASCIIwhitespace=Ce,b.parse=ti,b.parseExpressionAt=ii,b.tokContexts=y,b.tokTypes=a,b.tokenizer=si,b.version=vt})});
return {w7e};
}
function module13(imports){

var wr={[Symbol.dispose](){}};
function Rr(){return wr};
var ng=Rr;
function _(e,n,r){using s=ng`JSON.stringify(${Se(e)})`;return JSON.stringify(e,n,r)};
function Se(e){return typeof e==="string"?e.length:e};
return {wr,Rr,ng,_,Se};
}
function module14(imports){

function re(t,n){if(n<=0)return"";if(t.length<=n)return t;let e=t.slice(0,n),r=e.charCodeAt(n-1);return f(r>=55296&&r<=56319?e.slice(0,-1):e)};
function f(t){if(typeof Buffer<"u")return Buffer.from(t,"utf16le").toString("utf16le");return x(t)};
function x(t){let e=[];for(let r=0;r<t.length;r+=8192){let i=Math.min(r+8192,t.length),o=new Uint16Array(i-r);for(let u=r;u<i;u++)o[u-r]=t.charCodeAt(u);e.push(String.fromCharCode(...o))}return e.join("")};
var m=/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/;
var a=/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g;
var l=typeof String.prototype.isWellFormed==="function"?Function.prototype.call.bind(String.prototype.isWellFormed):void 0;
var g=typeof String.prototype.toWellFormed==="function"?Function.prototype.call.bind(String.prototype.toWellFormed):void 0;
function wf(t){if(l)return l(t);return!m.test(t)};
function Fm(t){if(g)return g(t);return t.replace(a,"\uFFFD")};
function Vt(t,n,e=0){let r=0,i=t.indexOf(n,e);while(i!==-1)r++,i=t.indexOf(n,i+1);return r};
return {re,f,x,m,a,l,g,wf,Fm,Vt};
}
function module15(imports){
const Oe=imports["Oe"];
const Ag=imports["Ag"];
const Ie=imports["Ie"];
const fr=imports["fr"];
const nr=imports["nr"];
const tr=imports["tr"];
const $n=imports["$n"];
const Fn=imports["Fn"];
const oZe=imports["oZe"];
const yn=imports["yn"];
const ir=imports["ir"];
const Tn=imports["Tn"];
const An=imports["An"];
const On=imports["On"];
const Nn=imports["Nn"];
const vn=imports["vn"];
const pYr=imports["pYr"];
const Sn=imports["Sn"];
const l=imports["l"];
const w7e=imports["w7e"];
const vr=imports["vr"];
const Ss=imports["Ss"];
const vs=imports["vs"];
const Tr=imports["Tr"];
const ws=imports["ws"];
const _=imports["_"];
const pnr=imports["pnr"];
const Vt=imports["Vt"];
const re=imports["re"];
var Q=(e)=>e instanceof Error&&("code"in e)?String(e.code):"EIO";
var Wo=(e,o,r)=>new Oe(`${e}: ${o}: no such file`,{cause:Q(r)});
var qo=["EMFILE","ENFILE"];
async function xo(e,o){try{return await e}catch(r){throw o(r)}};
function Ko(e,o,r){let t=Q(r);return qo.includes(t)?new Oe(`${e}: ${o}: not read, no file descriptor free (${t})`):Wo(e,o,r)};
var fn=(e,o,r)=>new Oe(`${e}: ${o}: not readable (${Q(r)})`);
var Yo=`/** @jsxRuntime classic */
/** @jsx h */
/** @jsxFrag Fragment */
`;
var go=(e)=>pnr[oZe.find((o)=>e.endsWith(o))??""]??"js";
function Jo(e){let o=typeof e==="object"&&e?e:{},r="errors"in o?o.errors:void 0;return Array.isArray(r)?r:[o]};
function Qo(e,o){let r=typeof e==="object"&&e!==null,t=r&&"message"in e?String(e.message):"",n=r&&"position"in e?e.position:void 0;if(!(typeof n==="object"&&n!==null&&("line"in n)&&typeof n.line==="number"&&("column"in n)))return t;return`${t} (line ${Number(n.line)-o}, column ${String(n.column)})`};
var Zo=(e,o)=>Jo(e).map((r)=>Qo(r,o)).filter((r)=>r!=="").join("; ")||String(e);
function GSn(e,o){let r=go(e),t=r==="js",n=r==="ts"?"":Yo;if(t)return o;try{let s={loader:r,macro:!1};return new Bun.Transpiler(s).transformSync(`${n}${o}`)}catch(s){throw new Oe(Zo(s,Vt(n,`
`)))}};
var LVr=(e)=>oZe.some((o)=>e.endsWith(o));
var jo=1048576;
function rr(e){let o=[e];if(e.endsWith(".js")){let r=e.slice(0,-3);o.push(`${r}.ts`,`${r}.tsx`)}if(e.endsWith(".jsx"))o.push(`${e.slice(0,-4)}.tsx`);if(e.endsWith(".mjs"))o.push(`${e.slice(0,-4)}.mts`);if(e.endsWith(".cjs"))o.push(`${e.slice(0,-4)}.cts`);for(let r of oZe)o.push(`${e}${r}`),o.push(`${e}${yn}index${r}`);return o};
var S7e="claude-code";
var bzo=(e,o,r)=>new Oe(`${e}: cannot import "${o}" (from ${r}): a hooks module imports its own files by relative path and "${S7e}", nothing else`);
var sr=(e,o)=>[".","..","./","../"].includes(e)?nr(tr(o),e,"index"):nr(tr(o),e);
var NVr=(e)=>e==="."||e===".."||e.startsWith("./")||e.startsWith("../");
var pr=["no such file","not a regular file","resolves outside the plugin's folder"];
var ko=(e,o)=>new Oe(`${e}: ${o} is over ${jo} bytes and was not read`);
async function ve(e,{real:o,size:r},t){if(r>jo)throw ko(t,e);try{return{real:o,source:await Sn(o,"utf8")}}catch(n){throw Ko(t,e,n)}};
async function VBe(e,o,r){let t=await xo(ir(o),(f)=>fn(r,Tn(o),f)),n=(f)=>Ko(r,e,f),s=await xo(ir(e),n),p=An(t,s);if(p===".."||p.startsWith(`..${On}`)||Nn(p))throw new Oe(`${r}: ${e}: ${s} resolves outside the plugin's folder`);let a=await xo(vn(s),n);if(!a.isFile())throw new Oe(`${r}: ${e}: not a regular file`);return{real:s,size:a.size}};
var ar=(e,o)=>new Oe(`${e}: ${o} is not named like code and was not loaded: a hooks module and the files it imports end in `+pYr);
function Te(e,o,r){let t=[o,r].find((n)=>!LVr(n));if(t!==void 0)throw ar(e,t)};
var FVr=(e,o)=>o.startsWith(`${e}: `)?o.slice(`${e}: `.length):o;
async function wzo({spelled:e,importer:o,root:r,pluginName:t},n,s){let p=`${t}: cannot import "${e}" (from ${fr(r,o)||o}):`,i=sr(e,o),a=fr(r,i);if(a===".."||a.startsWith(`..${$n}`)||Fn(a))throw new Oe(`${p} it is outside the plugin's folder (${r})`);let c=[];for(let u of rr(i)){let y=n.get(u);if(y!==void 0)return{file:u,source:y};try{let x=await VBe(u,r,t);Te(t,u,x.real);let g=s.get(x.real),h=g===void 0?void 0:n.get(g);if(g!==void 0&&h!==void 0)return{file:g,source:h};let{real:k,source:E}=await ve(u,x,t);return{file:u,source:E,real:k}}catch(x){let g=l(x);if(!(x instanceof Oe)||!pr.some((k)=>g.endsWith(k)))throw new Oe(`${p} ${FVr(t,g)}`);let j=x.cause===void 0;c.push(j?g:`${g} (${String(x.cause)})`)}}throw new Oe(`${p} no such file under ${r}`,c.length===0?void 0:{cause:c.join("; ")})};
var $Vr=()=>w7e();
var dr=80;
var oe="Client";
var xr=(e,o)=>e.id===o||e.params.includes(o);
var gr={VariableDeclarator:(e,o)=>e.id===o,FunctionDeclaration:xr,FunctionExpression:xr,ArrowFunctionExpression:(e,o)=>e.params.includes(o),ClassDeclaration:(e,o)=>e.id===o,ClassExpression:(e,o)=>e.id===o,CatchClause:(e,o)=>e.param===o,AssignmentPattern:(e,o)=>e.left===o,RestElement:(e,o)=>e.argument===o,ArrayPattern:(e,o)=>e.elements.includes(o),Property:(e,o,r)=>e.value===o&&r?.type==="ObjectPattern",ImportSpecifier:(e,o)=>e.local===o,ImportDefaultSpecifier:(e,o)=>e.local===o,ImportNamespaceSpecifier:(e,o)=>e.local===o};
var os=(e)=>gr[e.type];
var rs=(e,o)=>(o?.type==="Property"||o?.type==="PropertyDefinition"||o?.type==="MethodDefinition")&&o.key===e&&!o.computed;
var hr=(e)=>typeof e==="object"&&e!==null&&typeof e.type==="string";
function Dk(e,o,r){function t(n){if(o(n),r?.(n.node))return;let{node:s}=n;function p(i){if(hr(i))t({node:i,parent:s,grandparent:n.parent})}for(let i of Object.keys(s)){if(i==="loc"||i==="type"||i==="start"||i==="end")continue;let a=s[i];Array.isArray(a)?a.forEach(p):p(a)}}t({node:e,parent:void 0,grandparent:void 0})};
function ps(e){let o=new Map;return Dk(e,({node:r,parent:t})=>{if(t!==void 0)o.set(r,t)}),o};
function jr(e){let o;for(let r of e.properties){if(r.type==="SpreadElement"){o=o&&{...o,isSpreadAfter:!0};continue}let{key:t}=r;if(!r.computed&&r.kind==="init"&&(t.type==="Identifier"&&t.name==="module"||t.type==="Literal"&&t.value==="module"))o={property:r,isSpreadAfter:!1}}return o};
function z(e){if(e===void 0)return"no argument";switch(e.type){case"Identifier":return`the variable ${e.name}`;case"TemplateLiteral":return"a template with a substitution";case"SpreadElement":return"a spread";case"Literal":return`the literal ${e.raw??String(e.value)}`;case"MemberExpression":return"a member read";case"CallExpression":return"a call";case"BinaryExpression":return"a concatenation";case"ObjectExpression":return"an object whose plugin or key is not a string literal";default:return`a ${e.type}`}};
function B(e){if(e.type==="Literal")return typeof e.value==="string"?e.value:void 0;if(e.type!=="TemplateLiteral"||e.expressions.length!==0)return;let o=e.quasis[0]?.value.cooked;return o===void 0||o===null?void 0:o};
function kr(e,o){if(!o||o.type!=="ObjectExpression")return{at:o??e,problem:`Client takes its props as an object literal ({ module: "./board.tsx", key }), so the surface module it names can be read before it runs (got ${z(o)})`};let r=jr(o);if(!r)return{at:o,problem:`Client names no module: give it module, the surface module's path as a string literal ("./board.tsx")`};if(r.isSpreadAfter)return{at:r.property,problem:"a spread after module in Client(...) could replace it: put module after the spread"};let{value:t}=r.property,n=B(t);if(n===void 0)return{at:t,problem:`Client module must be a string literal, the surface module's path relative to this file (got ${z(t)})`};return{at:t,spelled:n}};
var Eo=(e)=>e.type==="Identifier"&&e.name===oe||e.type==="Literal"&&e.value===oe||e.type==="MemberExpression"&&!e.computed&&e.property.type==="Identifier"&&e.property.name===oe;
var Er="h";
function br(e){let{callee:o}=e;if(o.type!=="Super"&&Eo(o))return{argument:e.arguments[0]};let[r,t]=e.arguments;return o.type==="Identifier"&&o.name===Er&&r!==void 0&&r.type!=="SpreadElement"&&Eo(r)?{argument:t}:void 0};
function bo(e){let o=[];return Dk(e,({node:r})=>{if(r.type!=="CallExpression")return;let t=br(r);if(t)o.push(kr(r,t.argument))}),o.toSorted((r,t)=>t.at.start-r.at.start)};
function So(e){let{spelled:o,file:r,root:t}=e,n=`Client module "${o}"`;if(!NVr(o))return{problem:`${n} is not relative: spell the surface module's path from this file ("./board.tsx")`};if(!LVr(o))return{problem:`${n} is not named like code: a surface module's path ends in `+pYr};let s=vr(Ss(r),o),p=vs(vr(t),s);return p===".."||p.startsWith(`..${Tr}`)||ws(p)?{problem:`${n} leaves the plugin's folder`}:{module:p.split(Tr).join("/")}};
function Ar(e){try{return $Vr().parse(e,{ecmaVersion:"latest",sourceType:"module"})}catch{return}};
function $ts(e,o,r){if(!e.includes(oe))return e;let t=Ar(e),n=e;for(let s of t?bo(t):[]){if(!("spelled"in s))continue;let p=So({spelled:s.spelled,file:o,root:r});if("module"in p)n=n.slice(0,s.at.start)+_(p.module)+n.slice(s.at.end)}return n};
function Dr(e){let o=new Set;function r(t){if(t===null)return;switch(t.type){case"Identifier":o.add(t.name);return;case"ArrayPattern":t.elements.forEach(r);return;case"ObjectPattern":for(let n of t.properties)r(n.type==="Property"?n.value:n);return;case"AssignmentPattern":r(t.left);return;case"RestElement":r(t.argument);return;default:return}}return Dk(e,({node:t})=>{let n=(t.type==="ForInStatement"||t.type==="ForOfStatement")&&t.left.type!=="VariableDeclaration";if(t.type==="AssignmentExpression")r(t.left);else if(t.type==="UpdateExpression")r(t.argument);else if(n)r(t.left)}),o};
var te=(e,o,r)=>o!==void 0&&(os(o)?.(o,e,r)??!1);
var De=(e,o,r)=>!te(e,o,r)&&!(o?.type==="MemberExpression"&&o.property===e&&!o.computed)&&!rs(e,o)&&o?.type!=="LabeledStatement"&&o?.type!=="BreakStatement"&&o?.type!=="ContinueStatement"&&o?.type!=="ExportSpecifier"&&o?.type!=="ImportSpecifier"&&o?.type!=="ImportDefaultSpecifier"&&o?.type!=="ImportNamespaceSpecifier";
function Rr(e){let o=new Map;function r(t){let n=t.type==="VariableDeclaration"&&t.kind==="const";if(t.type==="FunctionDeclaration"&&t.id!==null)o.set(t.id.name,t);else if(n)for(let s of t.declarations){let{id:p,init:i}=s;if(p.type==="Identifier"&&(i?.type==="FunctionExpression"||i?.type==="ArrowFunctionExpression"))o.set(p.name,i)}}for(let t of e.body)if(r(t),t.type==="ExportNamedDeclaration"||t.type==="ExportDefaultDeclaration"){let s=t.declaration;if(s!==null&&s!==void 0)r(s)}return o};
function vo(e){let o=[],r=[];return Dk(e,({node:t,parent:n,grandparent:s})=>{if(t.type!=="Identifier")return;if(te(t,n,s))o.push(t);else if(De(t,n,s))r.push(t)}),{declared:Map.groupBy(o,(t)=>t.name),read:Map.groupBy(r,(t)=>t.name)}};
function Bs(e){let o=Rr(e),{declared:r,read:t}=vo(e);return{functions:o,assigned:Dr(e),declared:r,read:t,declaredOnce:new Set([...o.keys()].filter((n)=>r.get(n)?.length===1))}};
var et=Ie("/$bunfs/root/state-library.js-wy8y4843.txt");
var vJn=et;
var SJn=Ag;
var Xe=SJn.map((e)=>`classic.${e}`);
var USn=["model.complete","model.classify","model.fork","audio.play","audio.speak","mcp.call","mcp.connect","session.cwd","session.root","session.model","session.turns","session.id","session.messages","session.repo","session.surface","session.surfaces","session.authorize","session.usage","session.version","turn.abort","prompt.read","flag.value","tool.list","tool.register","command.list","command.register","config.list","agent.list","agent.register","ui.toast","ui.status","ui.log","ui.notice","ui.invalidate","ui.open","ui.close","ui.panes","ui.copy","ui.blit","fs.read","fs.write","fs.list","fs.exists","fs.stat","fs.ancestors","store.get","store.set","store.delete","store.keys","state.get","state.set","clock.now","clock.sleep","clock.after","clock.every","http.fetch","process.run","process.spawn","settings.read","env.get","env.set"];
var g7e=[...Xe,"tool.call","tool.check","ui.render","ui.resolve","ui.press","ui.input","ui.select","ui.message","ui.scroll","ui.focus","agent.offer","agent.spawn","prompt.submit","prompt.fill","prompt.suggest","prompt.edit","prompt.section","prompt.context","prompt.attachment","prompt.compose","tool.describe","command.run","command.describe","config.set","config.describe","telemetry.log","telemetry.mark","skill.prompt","attribution.text","session.start","session.receive","session.append","session.send","session.compact","session.attach","session.detach","session.measure","session.end","plugin.register","turn.start","turn.step","turn.complete","engine.create",...USn];
var Mts=Xe.filter((e)=>e!=="classic.PreToolUse");
var hyt=(e)=>g7e.includes(e);
var bJn=["turn.step","process.spawn"];
var Ljt=(e)=>bJn.includes(e);
var Ye=String.raw`(?!\p{Default_Ignorable_Code_Point})[\p{ID_Start}$_]`+String.raw`(?:(?!\p{Default_Ignorable_Code_Point})[\p{ID_Continue}$])*`;
var _zo=["managed","user","project","local","memory"];
var Fjt=["replace","append","insert"];
var WSn=(e)=>typeof e==="string"&&Fjt.includes(e);
var ac=["prepend","user","append","builtin","core"];
var Szo=["allow","ask","deny"];
var y7e=(e)=>ac.indexOf(e);
function Lts(e,o){let r=y7e(o);return e.find((t)=>y7e(t.from)<r&&r<y7e(t.to))?.plugin};
var yyt=(e)=>({prepend:["append","builtin","core"],user:[],append:["core"],builtin:[],core:[]})[e];
var EJn=(e)=>yyt("prepend").includes(e);
function Nts(e,o){return Object.freeze([...e,Object.freeze({...o,to:e.reduce((r,t)=>y7e(t.to)>y7e(r)?t.to:r,o.to)})])};
var MVr=(e)=>`next.to:${e}`;
var _7e=Object.freeze([]);
var lt=new RegExp(`^${Ye}$`,"u");
var h7e=(e)=>e==="*"||e.endsWith(".*")||e.startsWith("!");
var Qe=(e)=>e.startsWith("telemetry.");
function Ze(e){if(typeof e!=="string")return`${typeof e} is not an event name or a pattern (a string)`;let o=e.startsWith("!"),r=o?e.slice(1):e;if(o&&r==="*")return`"${e}" is not a pattern: it selects no event`;if(o&&r.startsWith("!"))return`"${e}" is not a pattern: "!" negates once`;let t=r==="*",n=r.endsWith(".*"),s=(n?r.slice(0,-2):r).split(".");if(!(t||s.every((i)=>lt.test(i))))return`"${e}" is not an event name or a pattern ("*", "<prefix>.*", or "!" before either)`;return{isNegated:o,selection:t?{kind:"every"}:n?{kind:"prefix",prefix:s.join(".")}:{kind:"name",name:r}}};
function eo(e){let o=Ze(e);if(typeof o==="string")throw new Oe(o);return o};
function wJn(e){let o=Ze(e);return typeof o==="string"?o:void 0};
function npe(e,o){let{isNegated:r,selection:t}=eo(e),n;switch(t.kind){case"every":n=!0;break;case"prefix":n=o.startsWith(`${t.prefix}.`);break;case"name":n=o===t.name;break}return r?!n:n};
var Njt=(e,o,r)=>npe(e,o)&&(r.isBuiltin||!Qe(o)||Qe(e));
var jSn=(e)=>e.endsWith("@builtin")&&e.indexOf("@")===e.length-8&&e.length>8;
var Sbe="core";
var Dts=(e)=>e.withheldBy?.at(-1);
var HVr=(e,o)=>`$.${e}: removed by plugin \`${o}\``;
var ao=(e,o,r)=>new Oe(`${e}: ${o} does not parse: ${l(r)}`);
var Tt=(e,o)=>go(e)==="js"?void 0:o.split(`
`);
function Czo(e){let o;if(Dk(e.program,({node:r})=>{if(r.type==="ImportExpression"&&(o===void 0||r.start<o.start))o=r}),o===void 0)return;return e.refuse(o,'a dynamic import(); a hooks module imports its own files with an import declaration, as in import { name } from "./file.js"')};
function Nt(e){let o=new Map;for(let r of e.body){if(r.type!=="ImportDeclaration")continue;let t=String(r.source.value);for(let n of r.specifiers){let s;if(n.type==="ImportSpecifier"){let p=n.imported;s=p.type==="Identifier"?p.name:String(p.value)}else s=n.type==="ImportDefaultSpecifier"?"default":void 0;o.set(n.local.name,{specifier:t,imported:s})}}return o};
function At(e){let o=new Set;for(let r of e.body){let t=r.type==="ImportDeclaration"||r.type==="ExportAllDeclaration",n=r.type==="ExportNamedDeclaration",s=t?r.source:n?r.source??null:null;if(s!==null)o.add(String(s.value))}return[...o]};
class Lo extends Oe{name="ScanRefusal";plugin;file;line;excerpt;construct;constructor({plugin:e,file:o,line:r,excerpt:t,construct:n}){super(`${e}: ${o}${r===void 0?"":t===void 0?`:${r}`:`, compiled line ${r} \`${t}\``}: ${n}; $ is always spelled $.noun.event(...) at the call site, on is always on("<event>", hook), and next.to always next.to(e, "<tier>")`);this.plugin=e,this.file=o,this.line=r,this.excerpt=t,this.construct=n}};
function Azo(e,o,r){let t=Tt(e,o);function n(a,f){let c=a?.loc?.start.line,y=t===void 0||c===void 0?void 0:t[c-1]?.trim()??"",x=y!==void 0&&y.length>dr;return new Lo({plugin:r,file:e,line:c,excerpt:x?`${re(y,dr)}...`:y,construct:f})}let{parse:s}=$Vr(),p;try{p=s(o,{ecmaVersion:"latest",sourceType:"module",locations:!0})}catch(a){throw ao(r,e,a)}let i=ps(p);return{file:e,program:p,names:Bs(p),parentOf:(a)=>i.get(a),refuse:n,imports:Nt(p),specifiers:At(p)}};
return {Q,Wo,qo,xo,Ko,fn,Yo,go,Jo,Qo,Zo,GSn,LVr,jo,rr,S7e,bzo,sr,NVr,pr,ko,ve,VBe,ar,Te,FVr,wzo,$Vr,dr,oe,xr,gr,os,rs,hr,Dk,ps,jr,z,B,kr,Eo,Er,br,bo,So,Ar,$ts,Dr,te,De,Rr,vo,Bs,et,vJn,SJn,Xe,USn,g7e,Mts,hyt,bJn,Ljt,Ye,_zo,Fjt,WSn,ac,Szo,y7e,Lts,yyt,EJn,Nts,MVr,_7e,lt,h7e,Qe,Ze,eo,wJn,npe,Njt,jSn,Sbe,Dts,HVr,ao,Tt,Czo,Nt,At,Lo,Azo};
}
function module16(imports){
const v=imports["v"];
var o=v(function(b,i){i.exports={single:{topLeft:"\u250C",top:"\u2500",topRight:"\u2510",right:"\u2502",bottomRight:"\u2518",bottom:"\u2500",bottomLeft:"\u2514",left:"\u2502"},double:{topLeft:"\u2554",top:"\u2550",topRight:"\u2557",right:"\u2551",bottomRight:"\u255D",bottom:"\u2550",bottomLeft:"\u255A",left:"\u2551"},round:{topLeft:"\u256D",top:"\u2500",topRight:"\u256E",right:"\u2502",bottomRight:"\u256F",bottom:"\u2500",bottomLeft:"\u2570",left:"\u2502"},bold:{topLeft:"\u250F",top:"\u2501",topRight:"\u2513",right:"\u2503",bottomRight:"\u251B",bottom:"\u2501",bottomLeft:"\u2517",left:"\u2503"},singleDouble:{topLeft:"\u2553",top:"\u2500",topRight:"\u2556",right:"\u2551",bottomRight:"\u255C",bottom:"\u2500",bottomLeft:"\u2559",left:"\u2551"},doubleSingle:{topLeft:"\u2552",top:"\u2550",topRight:"\u2555",right:"\u2502",bottomRight:"\u255B",bottom:"\u2550",bottomLeft:"\u2558",left:"\u2502"},classic:{topLeft:"+",top:"-",topRight:"+",right:"|",bottomRight:"+",bottom:"-",bottomLeft:"+",left:"|"},arrow:{topLeft:"\u2198",top:"\u2193",topRight:"\u2199",right:"\u2190",bottomRight:"\u2196",bottom:"\u2191",bottomLeft:"\u2197",left:"\u2192"}}});
var AJn=v(function(g,t){var e=o();t.exports=e;t.exports.default=e});
return {o,AJn};
}
function module17(imports){

var R=new Map([["a","aA\uFF21\uFF41\uD835\uDC00\uD835\uDC1A\uD835\uDC34\uD835\uDC4E\uD835\uDC68\uD835\uDC82\uD835\uDC9C\uD835\uDCB6\uD835\uDCD0\uD835\uDCEA\uD835\uDD04\uD835\uDD1E\uD835\uDD38\uD835\uDD52\uD835\uDD6C\uD835\uDD86\uD835\uDDA0\uD835\uDDBA\uD835\uDDD4\uD835\uDDEE\uD835\uDE08\uD835\uDE22\uD835\uDE3C\uD835\uDE56\uD835\uDE70\uD835\uDE8A\u24B6\u24D0\u0430\u03B1\u1D00\u0251\uAB7A\uA4EE\u2C81\u0410\u0391\u2C6D\u13AA\u2C80\xC0\xC1\xC2\xC3\xC4\xC5\xE0\xE1\xE2\xE3\xE4\xE5\u0100\u0101\u0102\u0103\u0104\u0105\u01CD\u01CE\u01DE\u01DF\u01E0\u01E1\u01FA\u01FB\u0200\u0201\u0202\u0203\u0226\u0227\u1E00\u1E01\u1EA0\u1EA1\u1EA2\u1EA3\u1EA4\u1EA5\u1EA6\u1EA7\u1EA8\u1EA9\u1EAA\u1EAB\u1EAC\u1EAD\u1EAE\u1EAF\u1EB0\u1EB1\u1EB2\u1EB3\u1EB4\u1EB5\u1EB6\u1EB7\u212B\uD835\uDC00\uD835\uDC1A\uD835\uDC34\uD835\uDC4E\uD835\uDC68\uD835\uDC82\uD835\uDC9C\uD835\uDCB6\uD835\uDCD0\uD835\uDCEA\uD835\uDD04\uD835\uDD1E\uD835\uDD38\uD835\uDD52\uD835\uDD6C\uD835\uDD86\uD835\uDDA0\uD835\uDDBA\uD835\uDDD4\uD835\uDDEE\uD835\uDE08\uD835\uDE22\uD835\uDE3C\uD835\uDE56\uD835\uDE70\uD835\uDE8A\uD835\uDEA8\uD835\uDEC2\uD835\uDEE2\uD835\uDEFC\uD835\uDF1C\uD835\uDF36\uD835\uDF56\uD835\uDF70\uD835\uDF90\uD835\uDFAA\u1D2C\u1D43\u1D45\u2090"],["b","bB\uFF22\uFF42\uD835\uDC01\uD835\uDC1B\uD835\uDC35\uD835\uDC4F\uD835\uDC69\uD835\uDC83\uD835\uDC9D\uD835\uDCB7\uD835\uDCD1\uD835\uDCEB\uD835\uDD05\uD835\uDD1F\uD835\uDD39\uD835\uDD53\uD835\uDD6D\uD835\uDD87\uD835\uDDA1\uD835\uDDBB\uD835\uDDD5\uD835\uDDEF\uD835\uDE09\uD835\uDE23\uD835\uDE3D\uD835\uDE57\uD835\uDE71\uD835\uDE8B\u24B7\u24D1\u212C\u0412\u0392\u0299\uAB9F\u13FC\uA4D0\u2C83\u13CF\u13F4\u2C82\u1E02\u1E03\u1E04\u1E05\u1E06\u1E07\uD835\uDC01\uD835\uDC1B\uD835\uDC35\uD835\uDC4F\uD835\uDC69\uD835\uDC83\uD835\uDCB7\uD835\uDCD1\uD835\uDCEB\uD835\uDD05\uD835\uDD1F\uD835\uDD39\uD835\uDD53\uD835\uDD6D\uD835\uDD87\uD835\uDDA1\uD835\uDDBB\uD835\uDDD5\uD835\uDDEF\uD835\uDE09\uD835\uDE23\uD835\uDE3D\uD835\uDE57\uD835\uDE71\uD835\uDE8B\uD835\uDEA9\uD835\uDEE3\uD835\uDF1D\uD835\uDF57\uD835\uDF91\u1D2E\u1D47"],["c","cC\uFF23\uFF43\uD835\uDC02\uD835\uDC1C\uD835\uDC36\uD835\uDC50\uD835\uDC6A\uD835\uDC84\uD835\uDC9E\uD835\uDCB8\uD835\uDCD2\uD835\uDCEC\uD835\uDD06\uD835\uDD20\uD835\uDD3A\uD835\uDD54\uD835\uDD6E\uD835\uDD88\uD835\uDDA2\uD835\uDDBC\uD835\uDDD6\uD835\uDDF0\uD835\uDE0A\uD835\uDE24\uD835\uDE3E\uD835\uDE58\uD835\uDE72\uD835\uDE8C\u24B8\u24D2\u2102\u212D\u0441\u1D04\uABAF\uA4DA\u03F2\u2CA5\u0421\u13DF\u03F9\u2CA4\xC7\xE7\u0106\u0107\u0108\u0109\u010A\u010B\u010C\u010D\u1E08\u1E09\uD835\uDC02\uD835\uDC1C\uD835\uDC36\uD835\uDC50\uD835\uDC6A\uD835\uDC84\uD835\uDC9E\uD835\uDCB8\uD835\uDCD2\uD835\uDCEC\uD835\uDD20\uD835\uDD54\uD835\uDD6E\uD835\uDD88\uD835\uDDA2\uD835\uDDBC\uD835\uDDD6\uD835\uDDF0\uD835\uDE0A\uD835\uDE24\uD835\uDE3E\uD835\uDE58\uD835\uDE72\uD835\uDE8C\u1D9C\u216D\u217D\uA7F2"],["d","dD\uFF24\uFF44\uD835\uDC03\uD835\uDC1D\uD835\uDC37\uD835\uDC51\uD835\uDC6B\uD835\uDC85\uD835\uDC9F\uD835\uDCB9\uD835\uDCD3\uD835\uDCED\uD835\uDD07\uD835\uDD21\uD835\uDD3B\uD835\uDD55\uD835\uDD6F\uD835\uDD89\uD835\uDDA3\uD835\uDDBD\uD835\uDDD7\uD835\uDDF1\uD835\uDE0B\uD835\uDE25\uD835\uDE3F\uD835\uDE59\uD835\uDE73\uD835\uDE8D\u24B9\u24D3\u2145\u2146\u0501\u1D05\uAB70\uABB7\uA4D3\u0500\u13A0\u13E7\u010E\u010F\u1E0A\u1E0B\u1E0C\u1E0D\u1E0E\u1E0F\u1E10\u1E11\u1E12\u1E13\uD835\uDC03\uD835\uDC1D\uD835\uDC37\uD835\uDC51\uD835\uDC6B\uD835\uDC85\uD835\uDC9F\uD835\uDCB9\uD835\uDCD3\uD835\uDCED\uD835\uDD07\uD835\uDD21\uD835\uDD3B\uD835\uDD55\uD835\uDD6F\uD835\uDD89\uD835\uDDA3\uD835\uDDBD\uD835\uDDD7\uD835\uDDF1\uD835\uDE0B\uD835\uDE25\uD835\uDE3F\uD835\uDE59\uD835\uDE73\uD835\uDE8D\u1D30\u1D48\u216E\u217E"],["e","eE\uFF25\uFF45\uD835\uDC04\uD835\uDC1E\uD835\uDC38\uD835\uDC52\uD835\uDC6C\uD835\uDC86\uD835\uDCA0\uD835\uDCBA\uD835\uDCD4\uD835\uDCEE\uD835\uDD08\uD835\uDD22\uD835\uDD3C\uD835\uDD56\uD835\uDD70\uD835\uDD8A\uD835\uDDA4\uD835\uDDBE\uD835\uDDD8\uD835\uDDF2\uD835\uDE0C\uD835\uDE26\uD835\uDE40\uD835\uDE5A\uD835\uDE74\uD835\uDE8E\u24BA\u24D4\u212F\u2130\u2147\u0435\u03B5\u1D07\uAB7C\uA4F0\u2C89\u0415\u0395\u13AC\u2C88\xC8\xC9\xCA\xCB\xE8\xE9\xEA\xEB\u0112\u0113\u0114\u0115\u0116\u0117\u0118\u0119\u011A\u011B\u0204\u0205\u0206\u0207\u0228\u0229\u1E14\u1E15\u1E16\u1E17\u1E18\u1E19\u1E1A\u1E1B\u1E1C\u1E1D\u1EB8\u1EB9\u1EBA\u1EBB\u1EBC\u1EBD\u1EBE\u1EBF\u1EC0\u1EC1\u1EC2\u1EC3\u1EC4\u1EC5\u1EC6\u1EC7\uD835\uDC04\uD835\uDC1E\uD835\uDC38\uD835\uDC52\uD835\uDC6C\uD835\uDC86\uD835\uDCD4\uD835\uDCEE\uD835\uDD08\uD835\uDD22\uD835\uDD3C\uD835\uDD56\uD835\uDD70\uD835\uDD8A\uD835\uDDA4\uD835\uDDBE\uD835\uDDD8\uD835\uDDF2\uD835\uDE0C\uD835\uDE26\uD835\uDE40\uD835\uDE5A\uD835\uDE74\uD835\uDE8E\uD835\uDEAC\uD835\uDEC6\uD835\uDEDC\uD835\uDEE6\uD835\uDF00\uD835\uDF16\uD835\uDF20\uD835\uDF3A\uD835\uDF50\uD835\uDF5A\uD835\uDF74\uD835\uDF8A\uD835\uDF94\uD835\uDFAE\uD835\uDFC4\u1D31\u1D49\u2091"],["f","fF\uFF26\uFF46\uD835\uDC05\uD835\uDC1F\uD835\uDC39\uD835\uDC53\uD835\uDC6D\uD835\uDC87\uD835\uDCA1\uD835\uDCBB\uD835\uDCD5\uD835\uDCEF\uD835\uDD09\uD835\uDD23\uD835\uDD3D\uD835\uDD57\uD835\uDD71\uD835\uDD8B\uD835\uDDA5\uD835\uDDBF\uD835\uDDD9\uD835\uDDF3\uD835\uDE0D\uD835\uDE27\uD835\uDE41\uD835\uDE5B\uD835\uDE75\uD835\uDE8F\u24BB\u24D5\u2131\uA730\uA4DD\u1E1E\u1E1F\uD835\uDC05\uD835\uDC1F\uD835\uDC39\uD835\uDC53\uD835\uDC6D\uD835\uDC87\uD835\uDCBB\uD835\uDCD5\uD835\uDCEF\uD835\uDD09\uD835\uDD23\uD835\uDD3D\uD835\uDD57\uD835\uDD71\uD835\uDD8B\uD835\uDDA5\uD835\uDDBF\uD835\uDDD9\uD835\uDDF3\uD835\uDE0D\uD835\uDE27\uD835\uDE41\uD835\uDE5B\uD835\uDE75\uD835\uDE8F\u1DA0\uA7F3"],["g","gG\uFF27\uFF47\uD835\uDC06\uD835\uDC20\uD835\uDC3A\uD835\uDC54\uD835\uDC6E\uD835\uDC88\uD835\uDCA2\uD835\uDCBC\uD835\uDCD6\uD835\uDCF0\uD835\uDD0A\uD835\uDD24\uD835\uDD3E\uD835\uDD58\uD835\uDD72\uD835\uDD8C\uD835\uDDA6\uD835\uDDC0\uD835\uDDDA\uD835\uDDF4\uD835\uDE0E\uD835\uDE28\uD835\uDE42\uD835\uDE5C\uD835\uDE76\uD835\uDE90\u24BC\u24D6\u210A\u0262\u0261\uAB90\uA4D6\u0581\uA7AC\u13C0\u0551\u011C\u011D\u011E\u011F\u0120\u0121\u0122\u0123\u01E6\u01E7\u01F4\u01F5\u1E20\u1E21\uD835\uDC06\uD835\uDC20\uD835\uDC3A\uD835\uDC54\uD835\uDC6E\uD835\uDC88\uD835\uDCA2\uD835\uDCD6\uD835\uDCF0\uD835\uDD0A\uD835\uDD24\uD835\uDD3E\uD835\uDD58\uD835\uDD72\uD835\uDD8C\uD835\uDDA6\uD835\uDDC0\uD835\uDDDA\uD835\uDDF4\uD835\uDE0E\uD835\uDE28\uD835\uDE42\uD835\uDE5C\uD835\uDE76\uD835\uDE90\u1D33\u1D4D\u1DA2"],["h","hH\uFF28\uFF48\uD835\uDC07\uD835\uDC21\uD835\uDC3B\uD835\uDC55\uD835\uDC6F\uD835\uDC89\uD835\uDCA3\uD835\uDCBD\uD835\uDCD7\uD835\uDCF1\uD835\uDD0B\uD835\uDD25\uD835\uDD3F\uD835\uDD59\uD835\uDD73\uD835\uDD8D\uD835\uDDA7\uD835\uDDC1\uD835\uDDDB\uD835\uDDF5\uD835\uDE0F\uD835\uDE29\uD835\uDE43\uD835\uDE5D\uD835\uDE77\uD835\uDE91\u24BD\u24D7\u210B\u210C\u210D\u210E\u04BB\u041D\u0397\u029C\uAB8B\uAB92\uA4E7\u0570\u2C8F\u04BA\u13BB\u13C2\u0540\u2C8E\u0124\u0125\u021E\u021F\u1E22\u1E23\u1E24\u1E25\u1E26\u1E27\u1E28\u1E29\u1E2A\u1E2B\u1E96\uD835\uDC07\uD835\uDC21\uD835\uDC3B\uD835\uDC6F\uD835\uDC89\uD835\uDCBD\uD835\uDCD7\uD835\uDCF1\uD835\uDD25\uD835\uDD59\uD835\uDD73\uD835\uDD8D\uD835\uDDA7\uD835\uDDC1\uD835\uDDDB\uD835\uDDF5\uD835\uDE0F\uD835\uDE29\uD835\uDE43\uD835\uDE5D\uD835\uDE77\uD835\uDE91\uD835\uDEAE\uD835\uDEE8\uD835\uDF22\uD835\uDF5C\uD835\uDF96\u02B0\u1D34\u2095"],["i","iI\uFF29\uFF49\uD835\uDC08\uD835\uDC22\uD835\uDC3C\uD835\uDC56\uD835\uDC70\uD835\uDC8A\uD835\uDCA4\uD835\uDCBE\uD835\uDCD8\uD835\uDCF2\uD835\uDD0C\uD835\uDD26\uD835\uDD40\uD835\uDD5A\uD835\uDD74\uD835\uDD8E\uD835\uDDA8\uD835\uDDC2\uD835\uDDDC\uD835\uDDF6\uD835\uDE10\uD835\uDE2A\uD835\uDE44\uD835\uDE5E\uD835\uDE78\uD835\uDE92\u24BE\u24D8\u2110\u2111\u2139\u2148\u0456\u03B9\u026A\u0131\uA4F2\u0269\u2C93\u0406\u0399\uA7AE\u0196\u2C92\xCC\xCD\xCE\xCF\xEC\xED\xEE\xEF\u0128\u0129\u012A\u012B\u012C\u012D\u012E\u012F\u0130\u01CF\u01D0\u0208\u0209\u020A\u020B\u1E2C\u1E2D\u1E2E\u1E2F\u1EC8\u1EC9\u1ECA\u1ECB\uD835\uDC08\uD835\uDC22\uD835\uDC3C\uD835\uDC56\uD835\uDC70\uD835\uDC8A\uD835\uDCBE\uD835\uDCD8\uD835\uDCF2\uD835\uDD26\uD835\uDD40\uD835\uDD5A\uD835\uDD74\uD835\uDD8E\uD835\uDDA8\uD835\uDDC2\uD835\uDDDC\uD835\uDDF6\uD835\uDE10\uD835\uDE2A\uD835\uDE44\uD835\uDE5E\uD835\uDE78\uD835\uDE92\uD835\uDEA4\uD835\uDEB0\uD835\uDECA\uD835\uDEEA\uD835\uDF04\uD835\uDF24\uD835\uDF3E\uD835\uDF5E\uD835\uDF78\uD835\uDF98\uD835\uDFB2\u1D35\u1D62\u1DA5\u1DA6\u2071\u2160\u2170"],["j","jJ\uFF2A\uFF4A\uD835\uDC09\uD835\uDC23\uD835\uDC3D\uD835\uDC57\uD835\uDC71\uD835\uDC8B\uD835\uDCA5\uD835\uDCBF\uD835\uDCD9\uD835\uDCF3\uD835\uDD0D\uD835\uDD27\uD835\uDD41\uD835\uDD5B\uD835\uDD75\uD835\uDD8F\uD835\uDDA9\uD835\uDDC3\uD835\uDDDD\uD835\uDDF7\uD835\uDE11\uD835\uDE2B\uD835\uDE45\uD835\uDE5F\uD835\uDE79\uD835\uDE93\u24BF\u24D9\u2149\u0458\u03F3\u1D0A\uAB7B\uA4D9\u0408\u037F\u13AB\u0134\u0135\u01F0\uD835\uDC09\uD835\uDC23\uD835\uDC3D\uD835\uDC57\uD835\uDC71\uD835\uDC8B\uD835\uDCA5\uD835\uDCBF\uD835\uDCD9\uD835\uDCF3\uD835\uDD0D\uD835\uDD27\uD835\uDD41\uD835\uDD5B\uD835\uDD75\uD835\uDD8F\uD835\uDDA9\uD835\uDDC3\uD835\uDDDD\uD835\uDDF7\uD835\uDE11\uD835\uDE2B\uD835\uDE45\uD835\uDE5F\uD835\uDE79\uD835\uDE93\u02B2\u1D36"],["k","kK\uFF2B\uFF4B\uD835\uDC0A\uD835\uDC24\uD835\uDC3E\uD835\uDC58\uD835\uDC72\uD835\uDC8C\uD835\uDCA6\uD835\uDCC0\uD835\uDCDA\uD835\uDCF4\uD835\uDD0E\uD835\uDD28\uD835\uDD42\uD835\uDD5C\uD835\uDD76\uD835\uDD90\uD835\uDDAA\uD835\uDDC4\uD835\uDDDE\uD835\uDDF8\uD835\uDE12\uD835\uDE2C\uD835\uDE46\uD835\uDE60\uD835\uDE7A\uD835\uDE94\u24C0\u24DA\u212A\u043A\u03BA\u1D0B\uABB6\uA4D7\u2C95\u041A\u039A\u13E6\u2C94\u0136\u0137\u01E8\u01E9\u1E30\u1E31\u1E32\u1E33\u1E34\u1E35\uD835\uDC0A\uD835\uDC24\uD835\uDC3E\uD835\uDC58\uD835\uDC72\uD835\uDC8C\uD835\uDCA6\uD835\uDCC0\uD835\uDCDA\uD835\uDCF4\uD835\uDD0E\uD835\uDD28\uD835\uDD42\uD835\uDD5C\uD835\uDD76\uD835\uDD90\uD835\uDDAA\uD835\uDDC4\uD835\uDDDE\uD835\uDDF8\uD835\uDE12\uD835\uDE2C\uD835\uDE46\uD835\uDE60\uD835\uDE7A\uD835\uDE94\uD835\uDEB1\uD835\uDECB\uD835\uDEDE\uD835\uDEEB\uD835\uDF05\uD835\uDF18\uD835\uDF25\uD835\uDF3F\uD835\uDF52\uD835\uDF5F\uD835\uDF79\uD835\uDF8C\uD835\uDF99\uD835\uDFB3\uD835\uDFC6\u1D37\u1D4F\u2096"],["l","lL\uFF2C\uFF4C\uD835\uDC0B\uD835\uDC25\uD835\uDC3F\uD835\uDC59\uD835\uDC73\uD835\uDC8D\uD835\uDCA7\uD835\uDCC1\uD835\uDCDB\uD835\uDCF5\uD835\uDD0F\uD835\uDD29\uD835\uDD43\uD835\uDD5D\uD835\uDD77\uD835\uDD91\uD835\uDDAB\uD835\uDDC5\uD835\uDDDF\uD835\uDDF9\uD835\uDE13\uD835\uDE2D\uD835\uDE47\uD835\uDE61\uD835\uDE7B\uD835\uDE95\u24C1\u24DB\u2112\u2113\u04CF\u029F\uABAE\uA4E1\u04C0\u13DE\u0139\u013A\u013B\u013C\u013D\u013E\u1E36\u1E37\u1E38\u1E39\u1E3A\u1E3B\u1E3C\u1E3D\uD835\uDC0B\uD835\uDC25\uD835\uDC3F\uD835\uDC59\uD835\uDC73\uD835\uDC8D\uD835\uDCC1\uD835\uDCDB\uD835\uDCF5\uD835\uDD0F\uD835\uDD29\uD835\uDD43\uD835\uDD5D\uD835\uDD77\uD835\uDD91\uD835\uDDAB\uD835\uDDC5\uD835\uDDDF\uD835\uDDF9\uD835\uDE13\uD835\uDE2D\uD835\uDE47\uD835\uDE61\uD835\uDE7B\uD835\uDE95\u02E1\u1D38\u1DAB\u2097\u216C\u217C"],["m","mM\uFF2D\uFF4D\uD835\uDC0C\uD835\uDC26\uD835\uDC40\uD835\uDC5A\uD835\uDC74\uD835\uDC8E\uD835\uDCA8\uD835\uDCC2\uD835\uDCDC\uD835\uDCF6\uD835\uDD10\uD835\uDD2A\uD835\uDD44\uD835\uDD5E\uD835\uDD78\uD835\uDD92\uD835\uDDAC\uD835\uDDC6\uD835\uDDE0\uD835\uDDFA\uD835\uDE14\uD835\uDE2E\uD835\uDE48\uD835\uDE62\uD835\uDE7C\uD835\uDE96\u24C2\u24DC\u2133\u041C\u039C\u1D0D\u043C\uAB87\uA4DF\u2C99\u13B7\u2C98\u1E3E\u1E3F\u1E40\u1E41\u1E42\u1E43\uD835\uDC0C\uD835\uDC26\uD835\uDC40\uD835\uDC5A\uD835\uDC74\uD835\uDC8E\uD835\uDCC2\uD835\uDCDC\uD835\uDCF6\uD835\uDD10\uD835\uDD2A\uD835\uDD44\uD835\uDD5E\uD835\uDD78\uD835\uDD92\uD835\uDDAC\uD835\uDDC6\uD835\uDDE0\uD835\uDDFA\uD835\uDE14\uD835\uDE2E\uD835\uDE48\uD835\uDE62\uD835\uDE7C\uD835\uDE96\uD835\uDEB3\uD835\uDEED\uD835\uDF27\uD835\uDF61\uD835\uDF9B\u1D39\u1D50\u2098\u216F\u217F"],["n","nN\uFF2E\uFF4E\uD835\uDC0D\uD835\uDC27\uD835\uDC41\uD835\uDC5B\uD835\uDC75\uD835\uDC8F\uD835\uDCA9\uD835\uDCC3\uD835\uDCDD\uD835\uDCF7\uD835\uDD11\uD835\uDD2B\uD835\uDD45\uD835\uDD5F\uD835\uDD79\uD835\uDD93\uD835\uDDAD\uD835\uDDC7\uD835\uDDE1\uD835\uDDFB\uD835\uDE15\uD835\uDE2F\uD835\uDE49\uD835\uDE63\uD835\uDE7D\uD835\uDE97\u24C3\u24DD\u2115\u039D\u0274\uA4E0\u0578\u2C9B\u0548\u2C9A\xD1\xF1\u0143\u0144\u0145\u0146\u0147\u0148\u01F8\u01F9\u1E44\u1E45\u1E46\u1E47\u1E48\u1E49\u1E4A\u1E4B\uD835\uDC0D\uD835\uDC27\uD835\uDC41\uD835\uDC5B\uD835\uDC75\uD835\uDC8F\uD835\uDCA9\uD835\uDCC3\uD835\uDCDD\uD835\uDCF7\uD835\uDD11\uD835\uDD2B\uD835\uDD5F\uD835\uDD79\uD835\uDD93\uD835\uDDAD\uD835\uDDC7\uD835\uDDE1\uD835\uDDFB\uD835\uDE15\uD835\uDE2F\uD835\uDE49\uD835\uDE63\uD835\uDE7D\uD835\uDE97\uD835\uDEB4\uD835\uDEEE\uD835\uDF28\uD835\uDF62\uD835\uDF9C\u1D3A\u1DB0\u207F\u2099"],["o","oO\uFF2F\uFF4F\uD835\uDC0E\uD835\uDC28\uD835\uDC42\uD835\uDC5C\uD835\uDC76\uD835\uDC90\uD835\uDCAA\uD835\uDCC4\uD835\uDCDE\uD835\uDCF8\uD835\uDD12\uD835\uDD2C\uD835\uDD46\uD835\uDD60\uD835\uDD7A\uD835\uDD94\uD835\uDDAE\uD835\uDDC8\uD835\uDDE2\uD835\uDDFC\uD835\uDE16\uD835\uDE30\uD835\uDE4A\uD835\uDE64\uD835\uDE7E\uD835\uDE98\u24C4\u24DE\u2134\u043E\u03BF\u1D0F\uA4F3\u0585\u2C9F\u041E\u039F\u0555\u2C9E\xD2\xD3\xD4\xD5\xD6\xF2\xF3\xF4\xF5\xF6\u014C\u014D\u014E\u014F\u0150\u0151\u01A0\u01A1\u01D1\u01D2\u01EA\u01EB\u01EC\u01ED\u020C\u020D\u020E\u020F\u022A\u022B\u022C\u022D\u022E\u022F\u0230\u0231\u1E4C\u1E4D\u1E4E\u1E4F\u1E50\u1E51\u1E52\u1E53\u1ECC\u1ECD\u1ECE\u1ECF\u1ED0\u1ED1\u1ED2\u1ED3\u1ED4\u1ED5\u1ED6\u1ED7\u1ED8\u1ED9\u1EDA\u1EDB\u1EDC\u1EDD\u1EDE\u1EDF\u1EE0\u1EE1\u1EE2\u1EE3\uD835\uDC0E\uD835\uDC28\uD835\uDC42\uD835\uDC5C\uD835\uDC76\uD835\uDC90\uD835\uDCAA\uD835\uDCDE\uD835\uDCF8\uD835\uDD12\uD835\uDD2C\uD835\uDD46\uD835\uDD60\uD835\uDD7A\uD835\uDD94\uD835\uDDAE\uD835\uDDC8\uD835\uDDE2\uD835\uDDFC\uD835\uDE16\uD835\uDE30\uD835\uDE4A\uD835\uDE64\uD835\uDE7E\uD835\uDE98\uD835\uDEB6\uD835\uDED0\uD835\uDEF0\uD835\uDF0A\uD835\uDF2A\uD835\uDF44\uD835\uDF64\uD835\uDF7E\uD835\uDF9E\uD835\uDFB8\u1D3C\u1D52\u2092"],["p","pP\uFF30\uFF50\uD835\uDC0F\uD835\uDC29\uD835\uDC43\uD835\uDC5D\uD835\uDC77\uD835\uDC91\uD835\uDCAB\uD835\uDCC5\uD835\uDCDF\uD835\uDCF9\uD835\uDD13\uD835\uDD2D\uD835\uDD47\uD835\uDD61\uD835\uDD7B\uD835\uDD95\uD835\uDDAF\uD835\uDDC9\uD835\uDDE3\uD835\uDDFD\uD835\uDE17\uD835\uDE31\uD835\uDE4B\uD835\uDE65\uD835\uDE7F\uD835\uDE99\u24C5\u24DF\u2119\u0440\u03C1\u1D18\uABB2\uA4D1\u2CA3\u0420\u03A1\u13E2\u2CA2\u1E54\u1E55\u1E56\u1E57\uD835\uDC0F\uD835\uDC29\uD835\uDC43\uD835\uDC5D\uD835\uDC77\uD835\uDC91\uD835\uDCAB\uD835\uDCC5\uD835\uDCDF\uD835\uDCF9\uD835\uDD13\uD835\uDD2D\uD835\uDD61\uD835\uDD7B\uD835\uDD95\uD835\uDDAF\uD835\uDDC9\uD835\uDDE3\uD835\uDDFD\uD835\uDE17\uD835\uDE31\uD835\uDE4B\uD835\uDE65\uD835\uDE7F\uD835\uDE99\uD835\uDEB8\uD835\uDED2\uD835\uDEE0\uD835\uDEF2\uD835\uDF0C\uD835\uDF1A\uD835\uDF2C\uD835\uDF46\uD835\uDF54\uD835\uDF66\uD835\uDF80\uD835\uDF8E\uD835\uDFA0\uD835\uDFBA\uD835\uDFC8\u1D3E\u1D56\u1D68\u209A"],["q","qQ\uFF31\uFF51\uD835\uDC10\uD835\uDC2A\uD835\uDC44\uD835\uDC5E\uD835\uDC78\uD835\uDC92\uD835\uDCAC\uD835\uDCC6\uD835\uDCE0\uD835\uDCFA\uD835\uDD14\uD835\uDD2E\uD835\uDD48\uD835\uDD62\uD835\uDD7C\uD835\uDD96\uD835\uDDB0\uD835\uDDCA\uD835\uDDE4\uD835\uDDFE\uD835\uDE18\uD835\uDE32\uD835\uDE4C\uD835\uDE66\uD835\uDE80\uD835\uDE9A\u24C6\u24E0\u211A\u051B\u0566\u051A\u0536\uD835\uDC10\uD835\uDC2A\uD835\uDC44\uD835\uDC5E\uD835\uDC78\uD835\uDC92\uD835\uDCAC\uD835\uDCC6\uD835\uDCE0\uD835\uDCFA\uD835\uDD14\uD835\uDD2E\uD835\uDD62\uD835\uDD7C\uD835\uDD96\uD835\uDDB0\uD835\uDDCA\uD835\uDDE4\uD835\uDDFE\uD835\uDE18\uD835\uDE32\uD835\uDE4C\uD835\uDE66\uD835\uDE80\uD835\uDE9A\uA7F4"],["r","rR\uFF32\uFF52\uD835\uDC11\uD835\uDC2B\uD835\uDC45\uD835\uDC5F\uD835\uDC79\uD835\uDC93\uD835\uDCAD\uD835\uDCC7\uD835\uDCE1\uD835\uDCFB\uD835\uDD15\uD835\uDD2F\uD835\uDD49\uD835\uDD63\uD835\uDD7D\uD835\uDD97\uD835\uDDB1\uD835\uDDCB\uD835\uDDE5\uD835\uDDFF\uD835\uDE19\uD835\uDE33\uD835\uDE4D\uD835\uDE67\uD835\uDE81\uD835\uDE9B\u24C7\u24E1\u211B\u211C\u211D\u0280\uAB71\uABA2\uA4E3\u01A6\u13A1\u13D2\u0154\u0155\u0156\u0157\u0158\u0159\u0210\u0211\u0212\u0213\u1E58\u1E59\u1E5A\u1E5B\u1E5C\u1E5D\u1E5E\u1E5F\uD835\uDC11\uD835\uDC2B\uD835\uDC45\uD835\uDC5F\uD835\uDC79\uD835\uDC93\uD835\uDCC7\uD835\uDCE1\uD835\uDCFB\uD835\uDD2F\uD835\uDD63\uD835\uDD7D\uD835\uDD97\uD835\uDDB1\uD835\uDDCB\uD835\uDDE5\uD835\uDDFF\uD835\uDE19\uD835\uDE33\uD835\uDE4D\uD835\uDE67\uD835\uDE81\uD835\uDE9B\u02B3\u1D3F\u1D63"],["s","sS\uFF33\uFF53\uD835\uDC12\uD835\uDC2C\uD835\uDC46\uD835\uDC60\uD835\uDC7A\uD835\uDC94\uD835\uDCAE\uD835\uDCC8\uD835\uDCE2\uD835\uDCFC\uD835\uDD16\uD835\uDD30\uD835\uDD4A\uD835\uDD64\uD835\uDD7E\uD835\uDD98\uD835\uDDB2\uD835\uDDCC\uD835\uDDE6\uD835\uDE00\uD835\uDE1A\uD835\uDE34\uD835\uDE4E\uD835\uDE68\uD835\uDE82\uD835\uDE9C\u24C8\u24E2\u0455\uA731\uABAA\uA4E2\u0405\u13DA\u015A\u015B\u015C\u015D\u015E\u015F\u0160\u0161\u017F\u0218\u0219\u1E60\u1E61\u1E62\u1E63\u1E64\u1E65\u1E66\u1E67\u1E68\u1E69\u1E9B\uD835\uDC12\uD835\uDC2C\uD835\uDC46\uD835\uDC60\uD835\uDC7A\uD835\uDC94\uD835\uDCAE\uD835\uDCC8\uD835\uDCE2\uD835\uDCFC\uD835\uDD16\uD835\uDD30\uD835\uDD4A\uD835\uDD64\uD835\uDD7E\uD835\uDD98\uD835\uDDB2\uD835\uDDCC\uD835\uDDE6\uD835\uDE00\uD835\uDE1A\uD835\uDE34\uD835\uDE4E\uD835\uDE68\uD835\uDE82\uD835\uDE9C\u02E2\u209B\uA7F1"],["t","tT\uFF34\uFF54\uD835\uDC13\uD835\uDC2D\uD835\uDC47\uD835\uDC61\uD835\uDC7B\uD835\uDC95\uD835\uDCAF\uD835\uDCC9\uD835\uDCE3\uD835\uDCFD\uD835\uDD17\uD835\uDD31\uD835\uDD4B\uD835\uDD65\uD835\uDD7F\uD835\uDD99\uD835\uDDB3\uD835\uDDCD\uD835\uDDE7\uD835\uDE01\uD835\uDE1B\uD835\uDE35\uD835\uDE4F\uD835\uDE69\uD835\uDE83\uD835\uDE9D\u24C9\u24E3\u0422\u03C4\u1D1B\u0442\uAB72\uA4D4\u2CA7\u03A4\u13A2\u2CA6\u0162\u0163\u0164\u0165\u021A\u021B\u1E6A\u1E6B\u1E6C\u1E6D\u1E6E\u1E6F\u1E70\u1E71\u1E97\uD835\uDC13\uD835\uDC2D\uD835\uDC47\uD835\uDC61\uD835\uDC7B\uD835\uDC95\uD835\uDCAF\uD835\uDCC9\uD835\uDCE3\uD835\uDCFD\uD835\uDD17\uD835\uDD31\uD835\uDD4B\uD835\uDD65\uD835\uDD7F\uD835\uDD99\uD835\uDDB3\uD835\uDDCD\uD835\uDDE7\uD835\uDE01\uD835\uDE1B\uD835\uDE35\uD835\uDE4F\uD835\uDE69\uD835\uDE83\uD835\uDE9D\uD835\uDEBB\uD835\uDED5\uD835\uDEF5\uD835\uDF0F\uD835\uDF2F\uD835\uDF49\uD835\uDF69\uD835\uDF83\uD835\uDFA3\uD835\uDFBD\u1D40\u1D57\u209C"],["u","uU\uFF35\uFF55\uD835\uDC14\uD835\uDC2E\uD835\uDC48\uD835\uDC62\uD835\uDC7C\uD835\uDC96\uD835\uDCB0\uD835\uDCCA\uD835\uDCE4\uD835\uDCFE\uD835\uDD18\uD835\uDD32\uD835\uDD4C\uD835\uDD66\uD835\uDD80\uD835\uDD9A\uD835\uDDB4\uD835\uDDCE\uD835\uDDE8\uD835\uDE02\uD835\uDE1C\uD835\uDE36\uD835\uDE50\uD835\uDE6A\uD835\uDE84\uD835\uDE9E\u24CA\u24E4\u03C5\u1D1C\uAB9C\uA4F4\u057D\u13CC\u054D\xD9\xDA\xDB\xDC\xF9\xFA\xFB\xFC\u0168\u0169\u016A\u016B\u016C\u016D\u016E\u016F\u0170\u0171\u0172\u0173\u01AF\u01B0\u01D3\u01D4\u01D5\u01D6\u01D7\u01D8\u01D9\u01DA\u01DB\u01DC\u0214\u0215\u0216\u0217\u1E72\u1E73\u1E74\u1E75\u1E76\u1E77\u1E78\u1E79\u1E7A\u1E7B\u1EE4\u1EE5\u1EE6\u1EE7\u1EE8\u1EE9\u1EEA\u1EEB\u1EEC\u1EED\u1EEE\u1EEF\u1EF0\u1EF1\uD835\uDC14\uD835\uDC2E\uD835\uDC48\uD835\uDC62\uD835\uDC7C\uD835\uDC96\uD835\uDCB0\uD835\uDCCA\uD835\uDCE4\uD835\uDCFE\uD835\uDD18\uD835\uDD32\uD835\uDD4C\uD835\uDD66\uD835\uDD80\uD835\uDD9A\uD835\uDDB4\uD835\uDDCE\uD835\uDDE8\uD835\uDE02\uD835\uDE1C\uD835\uDE36\uD835\uDE50\uD835\uDE6A\uD835\uDE84\uD835\uDE9E\uD835\uDED6\uD835\uDF10\uD835\uDF4A\uD835\uDF84\uD835\uDFBE\u1D41\u1D58\u1D64\u1DB8"],["v","vV\uFF36\uFF56\uD835\uDC15\uD835\uDC2F\uD835\uDC49\uD835\uDC63\uD835\uDC7D\uD835\uDC97\uD835\uDCB1\uD835\uDCCB\uD835\uDCE5\uD835\uDCFF\uD835\uDD19\uD835\uDD33\uD835\uDD4D\uD835\uDD67\uD835\uDD81\uD835\uDD9B\uD835\uDDB5\uD835\uDDCF\uD835\uDDE9\uD835\uDE03\uD835\uDE1D\uD835\uDE37\uD835\uDE51\uD835\uDE6B\uD835\uDE85\uD835\uDE9F\u24CB\u24E5\u03BD\u1D20\u0475\uABA9\uA4E6\u0474\u13D9\u1E7C\u1E7D\u1E7E\u1E7F\uD835\uDC15\uD835\uDC2F\uD835\uDC49\uD835\uDC63\uD835\uDC7D\uD835\uDC97\uD835\uDCB1\uD835\uDCCB\uD835\uDCE5\uD835\uDCFF\uD835\uDD19\uD835\uDD33\uD835\uDD4D\uD835\uDD67\uD835\uDD81\uD835\uDD9B\uD835\uDDB5\uD835\uDDCF\uD835\uDDE9\uD835\uDE03\uD835\uDE1D\uD835\uDE37\uD835\uDE51\uD835\uDE6B\uD835\uDE85\uD835\uDE9F\uD835\uDECE\uD835\uDF08\uD835\uDF42\uD835\uDF7C\uD835\uDFB6\u1D5B\u1D65\u2164\u2174"],["w","wW\uFF37\uFF57\uD835\uDC16\uD835\uDC30\uD835\uDC4A\uD835\uDC64\uD835\uDC7E\uD835\uDC98\uD835\uDCB2\uD835\uDCCC\uD835\uDCE6\uD835\uDD00\uD835\uDD1A\uD835\uDD34\uD835\uDD4E\uD835\uDD68\uD835\uDD82\uD835\uDD9C\uD835\uDDB6\uD835\uDDD0\uD835\uDDEA\uD835\uDE04\uD835\uDE1E\uD835\uDE38\uD835\uDE52\uD835\uDE6C\uD835\uDE86\uD835\uDEA0\u24CC\u24E6\u051D\u1D21\uAB83\uABA4\uA4EA\u051C\u13B3\u13D4\u0174\u0175\u1E80\u1E81\u1E82\u1E83\u1E84\u1E85\u1E86\u1E87\u1E88\u1E89\u1E98\uD835\uDC16\uD835\uDC30\uD835\uDC4A\uD835\uDC64\uD835\uDC7E\uD835\uDC98\uD835\uDCB2\uD835\uDCCC\uD835\uDCE6\uD835\uDD00\uD835\uDD1A\uD835\uDD34\uD835\uDD4E\uD835\uDD68\uD835\uDD82\uD835\uDD9C\uD835\uDDB6\uD835\uDDD0\uD835\uDDEA\uD835\uDE04\uD835\uDE1E\uD835\uDE38\uD835\uDE52\uD835\uDE6C\uD835\uDE86\uD835\uDEA0\u02B7\u1D42"],["x","xX\uFF38\uFF58\uD835\uDC17\uD835\uDC31\uD835\uDC4B\uD835\uDC65\uD835\uDC7F\uD835\uDC99\uD835\uDCB3\uD835\uDCCD\uD835\uDCE7\uD835\uDD01\uD835\uDD1B\uD835\uDD35\uD835\uDD4F\uD835\uDD69\uD835\uDD83\uD835\uDD9D\uD835\uDDB7\uD835\uDDD1\uD835\uDDEB\uD835\uDE05\uD835\uDE1F\uD835\uDE39\uD835\uDE53\uD835\uDE6D\uD835\uDE87\uD835\uDEA1\u24CD\u24E7\u0445\u03C7\uA4EB\u2CAD\u0425\u03A7\u2CAC\u1E8A\u1E8B\u1E8C\u1E8D\uD835\uDC17\uD835\uDC31\uD835\uDC4B\uD835\uDC65\uD835\uDC7F\uD835\uDC99\uD835\uDCB3\uD835\uDCCD\uD835\uDCE7\uD835\uDD01\uD835\uDD1B\uD835\uDD35\uD835\uDD4F\uD835\uDD69\uD835\uDD83\uD835\uDD9D\uD835\uDDB7\uD835\uDDD1\uD835\uDDEB\uD835\uDE05\uD835\uDE1F\uD835\uDE39\uD835\uDE53\uD835\uDE6D\uD835\uDE87\uD835\uDEA1\uD835\uDEBE\uD835\uDED8\uD835\uDEF8\uD835\uDF12\uD835\uDF32\uD835\uDF4C\uD835\uDF6C\uD835\uDF86\uD835\uDFA6\uD835\uDFC0\u02E3\u1D61\u1D6A\u2093\u2169\u2179"],["y","yY\uFF39\uFF59\uD835\uDC18\uD835\uDC32\uD835\uDC4C\uD835\uDC66\uD835\uDC80\uD835\uDC9A\uD835\uDCB4\uD835\uDCCE\uD835\uDCE8\uD835\uDD02\uD835\uDD1C\uD835\uDD36\uD835\uDD50\uD835\uDD6A\uD835\uDD84\uD835\uDD9E\uD835\uDDB8\uD835\uDDD2\uD835\uDDEC\uD835\uDE06\uD835\uDE20\uD835\uDE3A\uD835\uDE54\uD835\uDE6E\uD835\uDE88\uD835\uDEA2\u24CE\u24E8\u0443\u03A5\u028F\uAB79\uA4EC\u2CA9\u0423\u13A9\u2CA8\xDD\xFD\xFF\u0176\u0177\u0178\u0232\u0233\u1E8E\u1E8F\u1E99\u1EF2\u1EF3\u1EF4\u1EF5\u1EF6\u1EF7\u1EF8\u1EF9\uD835\uDC18\uD835\uDC32\uD835\uDC4C\uD835\uDC66\uD835\uDC80\uD835\uDC9A\uD835\uDCB4\uD835\uDCCE\uD835\uDCE8\uD835\uDD02\uD835\uDD1C\uD835\uDD36\uD835\uDD50\uD835\uDD6A\uD835\uDD84\uD835\uDD9E\uD835\uDDB8\uD835\uDDD2\uD835\uDDEC\uD835\uDE06\uD835\uDE20\uD835\uDE3A\uD835\uDE54\uD835\uDE6E\uD835\uDE88\uD835\uDEA2\uD835\uDEBC\uD835\uDEF6\uD835\uDF30\uD835\uDF6A\uD835\uDFA4\u02B8"],["z","zZ\uFF3A\uFF5A\uD835\uDC19\uD835\uDC33\uD835\uDC4D\uD835\uDC67\uD835\uDC81\uD835\uDC9B\uD835\uDCB5\uD835\uDCCF\uD835\uDCE9\uD835\uDD03\uD835\uDD1D\uD835\uDD37\uD835\uDD51\uD835\uDD6B\uD835\uDD85\uD835\uDD9F\uD835\uDDB9\uD835\uDDD3\uD835\uDDED\uD835\uDE07\uD835\uDE21\uD835\uDE3B\uD835\uDE55\uD835\uDE6F\uD835\uDE89\uD835\uDEA3\u24CF\u24E9\u2124\u2128\u0396\u1D22\uAB93\uA4DC\u2C8D\u13C3\u2C8C\u0179\u017A\u017B\u017C\u017D\u017E\u1E90\u1E91\u1E92\u1E93\u1E94\u1E95\uD835\uDC19\uD835\uDC33\uD835\uDC4D\uD835\uDC67\uD835\uDC81\uD835\uDC9B\uD835\uDCB5\uD835\uDCCF\uD835\uDCE9\uD835\uDD03\uD835\uDD37\uD835\uDD6B\uD835\uDD85\uD835\uDD9F\uD835\uDDB9\uD835\uDDD3\uD835\uDDED\uD835\uDE07\uD835\uDE21\uD835\uDE3B\uD835\uDE55\uD835\uDE6F\uD835\uDE89\uD835\uDEA3\uD835\uDEAD\uD835\uDEE7\uD835\uDF21\uD835\uDF5B\uD835\uDF95\u1DBB"]]);
var itr="\\u00ad\\u034f\\u0600-\\u0605\\u061c\\u06dd\\u070f\\u0890\\u0891\\u08e2\\u115f\\u1160\\u17b4\\u17b5\\u180b-\\u180f\\u200b-\\u200f\\u202a-\\u202e\\u2060-\\u206f\\u3164\\ufe00-\\ufe0f\\ufeff\\uffa0\\ufff0-\\ufffb\\u{110bd}\\u{110cd}\\u{13430}-\\u{1343f}\\u{1bca0}-\\u{1bca3}\\u{1d173}-\\u{1d17a}\\u{16fe4}\\u{e0000}-\\u{e0fff}";
var I={"\uFF1C":"<","\uFF1E":">","\uFE64":"<","\uFE65":">","\u2329":"<","\u232A":">","\u27E8":"<","\u27E9":">","\u3008":"<","\u3009":">","\u2039":"<","\u203A":">","\u02C2":"<","\u02C3":">","\u1438":"<","\u1433":">","\u276C":"<","\u276D":">","\u276E":"<","\u276F":">","\u2770":"<","\u2771":">","\u29FC":"<","\u29FD":">","\u226E":"<","\u226F":">","\u227A":"<","\u227B":">","\u22D6":"<","\u22D7":">","\uFF0F":"/","\u2215":"/","\u2044":"/"};
var Z="\\u0300-\\u0344\\u0346-\\u036f\\u0483-\\u0489\\u0591-\\u05bd\\u05bf\\u05c1\\u05c2\\u05c4\\u05c5\\u05c7\\u0610-\\u061a\\u064b-\\u065f\\u0670\\u06d6-\\u06dc\\u06df-\\u06e4\\u06e7\\u06e8\\u06ea-\\u06ed\\u1ab0-\\u1aff\\u1dc0-\\u1dff\\u20d0-\\u20ff\\u3099\\u309a\\ufe20-\\ufe2f";
var x=`${itr}${Z}\\x00-\\x08\\x0b\\x0c\\x0e-\\x1f\\x7f-\\x9f\\u2028\\u2029`;
var V="\\x0b\\x0c\\x1c-\\x1f\\x85\\u2028\\u2029\\u115f\\u1160\\u3164\\uffa0";
var bSt="A-Za-z0-9_\\-";
var j=`(?:[^${bSt}]|$)`;
var wSt="\\p{Pd}\\u2212\\u207b\\u208b\\u02d7\\u2796\\u2043\\u30fc\\uff70";
var QIe=":\\uff1a\\ufe55\\ufe13\\ua789\\u2236\\u02d0\\u02f8\\u05c3\\u0589\\u0703\\u0704\\u16ec\\u1803\\u1809\\u205a\\ua4fd\\ufe30";
var z="=\\u207c\\u208c\\ufe66\\uff1d\\ua78a\\u2550\\u268c\\ua4ff\\u{1f7f0}";
var F="\u2E40\u30A0\u1400";
var B=`\\s\\u2800${x}`;
var atr=`_\\p{Pc}\\u2017\\u02cd\\u07fa\\u0640${wSt}`;
var i=(()=>{let u={"<":"<",">":">","/":"/"};for(let[d,e]of Object.entries(I))u[e]+=d;return{open:u["<"],close:u[">"],slash:u["/"],filler:`^${bSt}${u["<"]}${u[">"]}`,lookalikePattern:new RegExp(`[${Object.keys(I).join("")}]`,"g"),invisiblePattern:new RegExp(`[${itr}]`,"gu")}})();
function ZIe(u,d){return`(?=([${u}]*))(?:\\${d})`};
function ESt(u){return ZIe(x,u)};
var k={"\u0430":"a","\u0435":"e","\u043E":"o","\u0440":"p","\u0441":"c","\u0443":"y","\u0445":"x","\u043A":"k","\u0456":"i","\u0458":"j","\u0455":"s","\u0501":"d","\u051B":"q","\u051D":"w","\u04BB":"h","\u04CF":"l","\u0412":"b","\u041C":"m","\u041D":"h","\u0422":"t","\u03B1":"a","\u03B5":"e","\u03B9":"i","\u03BA":"k","\u03BD":"v","\u03BF":"o","\u03C1":"p","\u03C4":"t","\u03C5":"u","\u03C7":"x","\u03F3":"j","\u0392":"b","\u0396":"z","\u0397":"h","\u039C":"m","\u039D":"n","\u03A5":"y","\u1D00":"a","\u0299":"b","\u1D04":"c","\u1D05":"d","\u1D07":"e","\uA730":"f","\u0262":"g","\u029C":"h","\u026A":"i","\u1D0A":"j","\u1D0B":"k","\u029F":"l","\u1D0D":"m","\u0274":"n","\u1D0F":"o","\u1D18":"p","\u0280":"r","\uA731":"s","\u1D1B":"t","\u1D1C":"u","\u1D20":"v","\u1D21":"w","\u028F":"y","\u1D22":"z","\u0251":"a","\u0261":"g","\u0131":"i","\u0475":"v","\u0442":"t","\u043C":"m","\uAB70":"d","\uAB71":"r","\uAB72":"t","\uAB79":"y","\uAB7A":"a","\uAB7B":"j","\uAB7C":"e","\uAB83":"w","\uAB87":"m","\uAB8B":"h","\uAB90":"g","\uAB92":"h","\uAB93":"z","\uAB9C":"u","\uAB9F":"b","\uABA2":"r","\uABA4":"w","\uABA9":"v","\uABAA":"s","\uABAE":"l","\uABAF":"c","\uABB2":"p","\uABB6":"k","\uABB7":"d","\u13FC":"b","\uA4D0":"b","\uA4D1":"p","\uA4D3":"d","\uA4D4":"t","\uA4D6":"g","\uA4D7":"k","\uA4D9":"j","\uA4DA":"c","\uA4DC":"z","\uA4DD":"f","\uA4DF":"m","\uA4E0":"n","\uA4E1":"l","\uA4E2":"s","\uA4E3":"r","\uA4E6":"v","\uA4E7":"h","\uA4EA":"w","\uA4EB":"x","\uA4EC":"y","\uA4EE":"a","\uA4F0":"e","\uA4F2":"i","\uA4F3":"o","\uA4F4":"u","\u0566":"q","\u0570":"h","\u0578":"n","\u057D":"u","\u0581":"g","\u0585":"o","\u03F2":"c","\u2CA5":"c","\u0269":"i","\u2C81":"a","\u2C83":"b","\u2C89":"e","\u2C8F":"h","\u2C93":"i","\u2C95":"k","\u2C99":"m","\u2C9B":"n","\u2C9F":"o","\u2CA3":"p","\u2CA7":"t","\u2CA9":"y","\u2CAD":"x","\u2C8D":"z"};
var du=(()=>{let u={...k};for(let[d,e]of Object.entries(k)){let a=d.toUpperCase();if(a!==d&&[...a].length===1&&!(a in u)&&!/^[A-Za-z]$/.test(a))u[a]=e}return{table:u,pattern:new RegExp(`[${Object.keys(u).join("")}]`,"gu")}})();
function Swe(u){let{table:d,pattern:e}=du,a=(c)=>c.replace(e,(n)=>d[n]??n);return a(eu(a(u)).normalize("NFKC"))};
function eu(u){return u.normalize("NFKD").replace(/\p{M}+/gu,"")};
function f9r({name:u,close:d,span:e=(c)=>`[^${d}]{0,${c}}`,assign:a=(c)=>`${c}(?=(?<assignGap>[${B}]*))\\k<assignGap>[${z}${F}]`}){return`(?:(?![${u}])|(?<=[${V}][${x}]*))${e(120)}(?<![\\w-])${a("source")}`};
var au=/[\u0080-\u{10ffff}]/u;
var fu=new RegExp(`[${i.open}]`,"u");
var cu=new RegExp(`[${wSt}]`,"gu");
var nu=new RegExp(`^[${atr}]$`,"u");
var tu=String.fromCharCode(65533);
var h=57344;
var ru=h+32;
var ou=h+126;
var y=57856;
var H=y+32;
var v=y+126;
var N=`${String.fromCharCode(H)}-${String.fromCharCode(v)}`;
var K=["nv","uy"];
var S=57600;
var su=S+255;
var P=String.fromCharCode(S+240);
var T=new Map;
var bu=32768;
var X=new Uint8Array(4352);
var m;
function A(u){return String.fromCharCode(h+u.charCodeAt(0))};
function L(u){return String.fromCharCode(y+u.charCodeAt(0))};
function iu(u){let d=T.get(u);if(d!==void 0)return d;let e=q(u);if(T.size>=bu)T.clear();return T.set(u,e),e};
function q(u){let d=u.codePointAt(0),e=u;if(d>=ru&&d<=ou||d>=H&&d<=v||d>=S&&d<=su)e=tu;else if(F.includes(u))e=P;else{if(m===void 0){m=new Map;for(let[f,t]of R)for(let o of t)m.set(o,f)}let a=new Set;for(let f of[u,u.toLowerCase(),u.toUpperCase(),u.toUpperCase().toLowerCase(),u.toLowerCase().toUpperCase()]){let t=m.get(f);if(t!==void 0)a.add(t)}let c=[...a].sort().join(""),n=c||Swe(u).replace(cu,"-").toLowerCase().replace(/\u00DF/g,"ss");if(a.size>1){let f=K.indexOf(c);e=f===-1?A(c):String.fromCharCode(S+f)}else if(/^[a-z0-9_-]+$/.test(n))e=[...n].map((f,t)=>t===0?A(f):L(f)).join("");else if(nu.test(u))e=A("_")}return e};
var lu=256;
function gu(u){let d=1;for(let e=Math.max(u<<8,128);e<u+1<<8;e++){let a=String.fromCodePoint(e);if(q(a)!==a){d=2;break}}return X[u]=d,d};
function pu(u){if(/^[a-z0-9]$/.test(u)){let d=K.flatMap((e,a)=>e.includes(u)?[String.fromCharCode(S+a)]:[]);return`[${u}${A(u)}${L(u)}${d.join("")}]`}if(u==="-"||u==="_")return`[_\\-${A("_")}${A("-")}${L("_")}${L("-")}${P}]`;throw Error("createTagFormScrub: tag names are lowercase [a-z0-9_-]")};
function Au({tags:u,tail:d}){let{open:e,close:a,filler:c}=i,n=0,f=(r)=>[...r].map((b,l)=>(l===0?"":ESt(++n))+pu(b)).join(""),t=u.map(f),o=d===void 0?j:`${ESt(++n)}${d({name:bSt,close:a,colon:QIe,span:(r)=>`[${N}]*(?:[^${a}${N}][${N}]*){0,${r}}`,spell:f,assign:(r)=>`${f(r)}${ZIe(B,++n)}[${z}${P}]`})}`;return new RegExp(`[${e}](?!\\\\)(?=[${c}]*?(?:${t.join("|")})${o})`,"giu")};
function g9r(u){let d=u.filter((e)=>e.tags.length>0).map(Au);return{openerOffsets(e){return M(e,d)},neutralize(e){let a="",c=0;for(let n of M(e,d))a+=`${e.slice(c,n)}<\\`,c=n+1;return a+e.slice(c)}}};
function Eu(u){let d=[],e=[],a,c="",n=0;for(let f=0;f<u.length;f++){let t=u.charCodeAt(f);if(t<128)continue;let o=u.charCodeAt(f+1),r=t>=55296&&t<=56319&&o>=56320&&o<=57343?2:1,b=(r===2?u.codePointAt(f):t)>>8,l=X[b];if(l===0){if(a??=new Uint16Array(4352),++a[b]>=lu)l=gu(b)}if(l===1){f+=r-1;continue}let p=iu(u.slice(f,f+r));if(c+=u.slice(n,f)+p,n=f+r,p.length!==r)d.push(c.length),e.push(p.length-r+(e.at(-1)??0));f+=r-1}return c+=u.slice(n),{reading:c,offsetInText(f){let t=0,o=d.length;while(t<o){let r=t+o>>1;if(d[r]<=f)t=r+1;else o=r}return t===0?f:f-e[t-1]}}};
function M(u,d){if(!fu.test(u))return[];let e=au.test(u)?Eu(u):void 0,a=e?.reading??u,c=new Set;for(let n of d)for(let f of a.matchAll(n))c.add(e?e.offsetInText(f.index):f.index);return[...c].sort((n,f)=>n-f)};
return {R,itr,I,Z,x,V,bSt,j,wSt,QIe,z,F,B,atr,i,ZIe,ESt,k,du,Swe,eu,f9r,au,fu,cu,nu,tu,h,ru,ou,y,H,v,N,K,S,su,P,T,bu,X,m,A,L,iu,q,lu,gu,pu,Au,g9r,Eu,M};
}
function module18(imports){

var net="cowritten-artifact-html";
var EOe="artifact-file-content";
var Dfe="artifact-type-instructions";
var vOe="artifact-origin-notes";
var swt="artifact-stored-declaration";
var dp="command-name";
var yf="command-message";
var mY="command-args";
var iwt="bash-input";
var Qse="bash-stdout";
var VU="bash-stderr";
var Wor="bash-exit-code";
var id="local-command-stdout";
var Xp="local-command-stderr";
var hW="local-command-caveat";
var KWe=[iwt,Qse,VU,Wor,id,Xp,hW];
var GK="tick";
var Ru="task-notification";
var LTn="remote-review";
var g$="teammate-message";
var mO="channel";
var _W="cross-session-message";
var D="slack-ping";
var x="slack-tag-message";
var Nqt="agent-message";
var COe="fetched-web-content";
var dwt="coordinator-relay";
var AOe=[Ru,Nqt,g$,_W,LTn,D,x,GK,COe,dwt,Dfe,net,EOe,vOe,swt];
var eee=[...KWe,dp,yf,mY,...AOe,mO,"system-reminder","system_reminder","function_results","tool_use_error","sandbox_violations","persisted-output","total_tokens","user-prompt-submit-hook"];
return {net,EOe,Dfe,vOe,swt,dp,yf,mY,iwt,Qse,VU,Wor,id,Xp,hW,KWe,GK,Ru,LTn,g$,mO,_W,D,x,Nqt,COe,dwt,AOe,eee};
}
function module19(imports){
const g9r=imports["g9r"];
const eee=imports["eee"];
const mO=imports["mO"];
const f9r=imports["f9r"];
var K;
function z(){return K??=g9r([{tags:eee.filter((e)=>e!==mO)},{tags:[mO],tail:f9r},{tags:["antml"],tail:({colon:e})=>`[${e}]`}]),K};
function FIe(e){return z().neutralize(e)};
return {K,z,FIe};
}
function module20(imports){
const FIe=imports["FIe"];
function jQ(t){return FIe(s(t))};
var ZVr=new Set([8204,8205,65038,65039]);
var i=/^[\p{Cf}\p{Co}\p{Cn}\p{Cs}\p{DI}]$/u;
function C7e(t){let r=t.codePointAt(0);if(ZVr.has(r)||r===9||r===10||r===13)return!1;return i.test(t)||r<32||r>=127&&r<=159};
function s(t){let r="";for(let n of t.replace(/\r\n?|[\u2028\u2029]/g,`
`)){if(C7e(n))continue;r+=n}return r};
return {jQ,ZVr,i,C7e,s};
}
function module21(imports){

class Mir{now(){return Date.now()}monotonicNow(){return performance.now()}setTimeout(t,r,e){let o=setTimeout(t,r);if(e?.unref)o.unref();return()=>clearTimeout(o)}};
var aB=new Mir;
function ee(t,r,e){return new Promise((o,n)=>{if(r?.aborted){if(e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error("aborted"));else o();return}let m=(e?.clock??aB).setTimeout(()=>{r?.removeEventListener("abort",i),o()},t,{unref:e?.unref});function i(){if(m(),e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error("aborted"));else o()}r?.addEventListener("abort",i,{once:!0})})};
return {Mir,aB,ee};
}
function module22(imports){

var HIe=4;
var JEn=200000;
return {HIe,JEn};
}
function module23(imports){

var XVr=25000;
return {XVr};
}
function module24(imports){
const ct=imports["ct"];
const Ys=imports["Ys"];
const Fe=imports["Fe"];
const Xn=imports["Xn"];
const ce=imports["ce"];
const mp=imports["mp"];
const Sx=imports["Sx"];
const Oe=imports["Oe"];
const tp=imports["tp"];
const ep=imports["ep"];
const kzo=imports["kzo"];
const Rzo=imports["Rzo"];
const JA=imports["JA"];
const sp=imports["sp"];
const ox=imports["ox"];
const Zg=imports["Zg"];
const fx=imports["fx"];
const l=imports["l"];
const RPe=imports["RPe"];
const PPe=imports["PPe"];
const xzo=imports["xzo"];
const If=imports["If"];
const L=imports["L"];
const nd=imports["nd"];
const N=imports["N"];
const fo=imports["fo"];
const Dts=imports["Dts"];
const HVr=imports["HVr"];
const Sbe=imports["Sbe"];
const Fm=imports["Fm"];
const re=imports["re"];
const _z=imports["_z"];
const WSn=imports["WSn"];
const Se=imports["Se"];
const AJn=imports["AJn"];
const Fjt=imports["Fjt"];
const La=imports["La"];
const Njt=imports["Njt"];
const h7e=imports["h7e"];
const _yt=imports["_yt"];
const VVr=imports["VVr"];
const Bjt=imports["Bjt"];
const zVr=imports["zVr"];
const Ljt=imports["Ljt"];
const jSn=imports["jSn"];
const wJn=imports["wJn"];
const bJn=imports["bJn"];
const jts=imports["jts"];
const g7e=imports["g7e"];
const hyt=imports["hyt"];
const USn=imports["USn"];
const Mts=imports["Mts"];
const KF=imports["KF"];
const YF=imports["YF"];
const di=imports["di"];
const Szo=imports["Szo"];
const Xl=imports["Xl"];
const _zo=imports["_zo"];
const jQ=imports["jQ"];
const nu=imports["nu"];
const wf=imports["wf"];
const gF=imports["gF"];
const G=imports["G"];
const Jm=imports["Jm"];
const Bn=imports["Bn"];
const Ya=imports["Ya"];
const Kn=imports["Kn"];
const vJn=imports["vJn"];
const S7e=imports["S7e"];
const Gg=imports["Gg"];
const NVr=imports["NVr"];
const bzo=imports["bzo"];
const Za=imports["Za"];
const wzo=imports["wzo"];
const $ts=imports["$ts"];
const GSn=imports["GSn"];
const Czo=imports["Czo"];
const Azo=imports["Azo"];
const Ug=imports["Ug"];
const Dg=imports["Dg"];
const _7e=imports["_7e"];
const Lts=imports["Lts"];
const Md=imports["Md"];
const jjt=imports["jjt"];
const yyt=imports["yyt"];
const EJn=imports["EJn"];
const Nts=imports["Nts"];
const npe=imports["npe"];
const Vd=imports["Vd"];
const at=imports["at"];
const Syt=imports["Syt"];
const Ng=imports["Ng"];
const ee=imports["ee"];
const cw=imports["cw"];
const io=imports["io"];
const JEn=imports["JEn"];
const XVr=imports["XVr"];
const HIe=imports["HIe"];
const xPe=imports["xPe"];
const FQ=imports["FQ"];
const Lwe=imports["Lwe"];
var woe="engine";
var BBe=Object.freeze({plugin:woe,tier:"core"});
function ISn(e){let{error:t}=e;if(t===void 0)return;return{error:t,called:e.called===!0}};
var JGo=Object.freeze([]);
function ky(e){for(let t of Object.values(e))if(typeof t==="function")Object.setPrototypeOf(t,null);return Object.setPrototypeOf(e,null),Object.freeze(e)};
function G0(e){return Object.setPrototypeOf(e,null),e};
var Bo=(e)=>G0((t,o)=>npe(t,e));
var Ko=Object.freeze({ms:0,remainingMs:Number.POSITIVE_INFINITY});
function EPe(e){let{call:t,signal:o,event:r,origin:n}=e,s=G0(t);if(s.to=G0(e.to),s.signal=o,s.is=e.is,s.event=r,s.origin=n,e.caught!==void 0)Object.assign(s,e.caught);return Object.defineProperty(s,"trace",{get:G0(e.trace),enumerable:!0}),Object.defineProperty(s,"budget",{get:G0(e.budget??(()=>Ko)),enumerable:!0}),Object.freeze(s)};
var Y7n=(e)=>EPe(e);
var iVr=(e,t,o)=>t.to(e,...o);
var kjt=(e,t,o)=>t.to(e,...o);
var X7n=(e)=>({signal:e.signal,is:e.is,event:e.event,origin:e.origin,trace:()=>e.trace,budget:()=>e.budget,caught:ISn(e)});
var GG={escape:String.raw`\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f`,placeholder:String.raw`\u{10eeee}`,loneSurrogate:String.raw`\ud800-\udfff`};
var H3=new RegExp(`[${String.raw`\t\n\r`}${GG.escape}${GG.loneSurrogate}${GG.placeholder}]`,"gu");
function ss(e,t){if(N(t)){let o=Object.create(null);for(let r of Object.keys(t).toSorted())Object.defineProperty(o,r,{value:t[r],enumerable:!0});return o}return t};
var is="\x00unserializable:";
function as(){let e=0;return()=>`${is}${++e}`};
var ps=as();
function Un(e){try{return JSON.stringify(e,ss)}catch{return ps()}};
var eJn=new Set(["dimColor","bold","italic","underline","strikethrough","inverse","borderDimColor"]);
var fs=Se(AJn(),1);
var tJn=new Set([...Object.keys(fs.default),"dashed","quote"]);
var uVr=new Set(["color","backgroundColor","borderColor"]);
var fVr=new Set(["flexGrow","flexShrink","gap","columnGap","rowGap","margin","marginX","marginY","marginTop","marginBottom","marginLeft","marginRight","padding","paddingX","paddingY","paddingTop","paddingBottom","paddingLeft","paddingRight"]);
var u7e=new Set(["top","left","right","bottom"]);
var mVr={flexDirection:new Set(["row","column","row-reverse","column-reverse"]),flexWrap:new Set(["nowrap","wrap","wrap-reverse"]),alignItems:new Set(["flex-start","center","flex-end","stretch"]),alignSelf:new Set(["flex-start","center","flex-end","auto"]),justifyContent:new Set(["flex-start","center","flex-end","space-between","space-around","space-evenly"]),overflow:new Set(["visible","hidden"]),display:new Set(["flex","none"]),position:new Set(["relative","absolute"]),wrap:new Set(["wrap","end","middle","truncate-end","truncate","truncate-middle","truncate-start"]),borderStyle:tJn};
var p7e=1e4;
var Pjt=new Set(["width","height","minWidth","minHeight"]);
function Ijt(e,t){let o=mVr[e];if(o!==void 0)return typeof t==="string"&&o.has(t)?void 0:`must be one of ${[...o].join(", ")}`;if(Pjt.has(e)){if(typeof t==="number")return Number.isFinite(t)&&t>=0&&t<=p7e?void 0:`must be a finite number between 0 and ${p7e}`;return typeof t==="string"&&/^\d{1,3}%$/.test(t)?void 0:"must be a number or a percentage"}if(fVr.has(e))return typeof t==="number"&&Number.isFinite(t)&&Math.abs(t)<=p7e?void 0:`must be a finite number within ${p7e}`;if(u7e.has(e))return typeof t==="number"&&Number.isInteger(t)&&Math.abs(t)<=p7e?void 0:`must be an integer within ${p7e} (character cells)`;if(uVr.has(e))return typeof t==="string"&&/^[#a-zA-Z0-9_().,% -]{1,40}$/.test(t)?void 0:"must be a color (a theme key, a name, or hex)";if(eJn.has(e))return typeof t==="boolean"?void 0:"must be a boolean";return"has no value rule"};
var oJn=(e,t)=>G(Array.from(e),(o)=>t.test(o));
var sJn=new RegExp(`[${GG.escape}]`,"u");
var iJn=new RegExp(`[${GG.loneSurrogate}]`,"u");
var aJn=new RegExp(`[${GG.placeholder}]`,"u");
var tpe={AskUserQuestion:"AskUserQuestionPermissionDialog",UserMessage:"UserPromptMessage",AssistantMessage:"AssistantTextMessage",ToolUse:"AssistantToolUseMessage",ToolResult:"UserToolResultMessage",ToolGroup:"CollapsedReadSearchContent",ToolProgress:"ToolProgressHint",CommandOutput:"CommandOutputSite",Spinner:"SpinnerWithVerb",TurnDuration:"TurnDurationMessage",InfoNotice:"InfoNoticeLine",SessionMode:"SessionStateRow",PromptHint:"PromptHintSite",AbovePrompt:"AbovePromptSite",Pane:"PaneSite"};
var LQ=1e5;
var TPe=32;
var kPe=20000;
function fj(e){if(e===null)return"null";let t=typeof e==="object";return Array.isArray(e)?"an array":t?"an object":`a ${typeof e}`};
var Djt=new Set(["UserMessage","AssistantMessage","ToolUse","ToolResult","ToolGroup","CommandOutput","TurnDuration","InfoNotice"]);
var LSn=4;
var NSn=(e)=>wf(e)?e:Fm(e);
var ms=4294967295;
function B(e){let t=e.length,r=typeof t!=="bigint"&&typeof t!=="symbol"?Math.max(Math.trunc(Number(t))||0,0):void 0;if(r===void 0||r>ms)throw new Oe(`a plugin's list claims a length no list has (got ${r??`a ${typeof t}`})`);return r};
function Re(e,t){let o=B(e);for(let r=0;r<o;r+=1)if(r in e&&!t(e[r]))return!1;return!0};
function Y(e){let t=B(e),o=[];o.length=t;for(let r=0;r<t;r+=1)if(r in e)o[r]=e[r];return o};
function fyt(e,t){if(typeof e==="string")return NSn(e);if(!Array.isArray(e)&&!gF(e))return e;if(t.copies.has(e))return t.copies.get(e);if(t.depth>=TPe*LSn||t.nodes>=kPe*LSn)return e;let r=Array.isArray(e)?Y(e).map((a,f)=>[String(f),a]):Object.entries(e);t.copies.set(e,e),t.nodes+=1,t.depth+=1;let n=r.map(([a,f])=>[t.isKeyed?NSn(a):a,fyt(f,t)]);t.depth-=1;let s=n.some(([a,f],m)=>a!==r[m]?.[0]||f!==r[m]?.[1]),i=Array.isArray(e)?n.map(([,a])=>a):Object.fromEntries(n),p=s?i:e;return t.copies.set(e,p),p};
var f7e=(e)=>fyt(e,{copies:new Map,nodes:0,depth:0,isKeyed:!0});
var gyt={};
io(gyt,{AGENT_OFFER:()=>Zi,AGENT_SPAWN:()=>ea,AGENT_SPAWN_KEPT_KEYS:()=>Mjt,AGENT_SPAWN_RESTORED_KEYS:()=>un,ANY_KIND:()=>Ue,ATTRIBUTION_TEXT:()=>ti,CLASSIC_ENVELOPE_KEYS:()=>ur,COMMAND_DESCRIBE:()=>Ms,COMMAND_RUN:()=>js,CONFIG_DESCRIBE:()=>Ds,CONFIG_SET:()=>Us,CONTEXT_DISPATCH_MAX:()=>OSn,CONTEXT_ENTRY_MAX:()=>Rjt,CORE_ECHO:()=>ZGo,DECLARED_PROP_KINDS:()=>Pr,ENGINE_CREATE:()=>oi,ENGINE_ONLY_COMPONENT:()=>po,ENV_GET:()=>Bs,ENV_SET:()=>Ks,FOCUS_ENVELOPE_KEYS:()=>ro,MAX_EXIT_CODE:()=>Xt,NOT_TEXTS:()=>Go,ON_SCREEN_COMPONENTS:()=>Djt,ON_SCREEN_KINDS:()=>ke,OTHER_ORIGIN:()=>ht,PINNED_VIEW_KEYS:()=>_t,PLUGIN_REGISTER:()=>qs,PRE_TOOL_USE:()=>oa,PROCESS_SPAWN:()=>Zs,PROMPT_ATTACHMENT:()=>ri,PROMPT_COMPOSE:()=>Fs,PROMPT_CONTEXT:()=>mi,PROMPT_CONTEXT_BLOCKS_MAX:()=>zt,PROMPT_EDIT:()=>ui,PROMPT_FILL_SITE:()=>Ps,PROMPT_SECTION:()=>li,PROMPT_SUBMIT:()=>yi,PROMPT_TEXT_MAX:()=>qt,RENDER_COMPONENTS:()=>Ze,RENDER_ENGINE_FALLBACK:()=>WBe,RENDER_ENVELOPE_KEYS:()=>_r,RENDER_SURFACES_OF:()=>We,ROW_FACTS:()=>zr,SCROLL_ENVELOPE_KEYS:()=>go,SESSION_APPEND:()=>Fi,SESSION_ATTACH:()=>$i,SESSION_COMPACT:()=>Di,SESSION_DETACH:()=>Ui,SESSION_END:()=>Bi,SESSION_MEASURE:()=>Ki,SESSION_RECEIVE:()=>Wi,SESSION_SEND:()=>Vi,SITE_RULES:()=>eu,SKILL_PROMPT:()=>gi,STATE_GET:()=>Xi,STATE_SET:()=>zi,TELEMETRY_LOG:()=>Ji,TELEMETRY_MARK:()=>qi,TOOL_CALL:()=>ra,TOOL_CHECK:()=>na,TOOL_CHECK_KEPT_KEYS:()=>wn,TOOL_DESCRIBE:()=>sa,TURN_COMPLETE:()=>aa,TURN_STEP:()=>pa,UI_BLIT:()=>hi,UI_CLOSE:()=>Xs,UI_FOCUS:()=>Vs,UI_INPUT:()=>vi,UI_MESSAGE:()=>Ri,UI_OPEN:()=>zs,UI_PRESS:()=>Ci,UI_RENDER:()=>Pi,UI_RESOLVE:()=>_i,UI_SCROLL:()=>Hi,UI_SELECT:()=>Ii,UI_TEXT_MAX:()=>qb,appendDenyProblem:()=>pn,appendMessageProblem:()=>Pt,appendViewProblem:()=>fn,appendViewRestored:()=>mn,boxSite:()=>Zt,boxTextProblem:()=>sr,callIdOf:()=>Rr,callIdsOf:()=>so,changedKeptKeyProblem:()=>St,changedWriteProblem:()=>cn,charactersIn:()=>ao,checked:()=>C,chunkChecker:()=>On,chunkProblem:()=>bn,classicEnvelopeKept:()=>lr,classicResultProblem:()=>hr,classicSite:()=>nJn,claudeMdOf:()=>no,claudeMdOfFiles:()=>Ye,commandContextProblem:()=>us,compactMessageProblem:()=>sn,compactMessagesProblem:()=>xo,composeFactsProblem:()=>ys,composeSectionsProblem:()=>gs,composeSectionsWritten:()=>xs,configValueProblem:()=>Ojt,contextBlocksProblem:()=>Qo,contextBlocksWritten:()=>or,controlTextProblem:()=>Cr,decisionProblem:()=>gr,default:()=>gyt,denyAnswerProblem:()=>Vo,denyRule:()=>De,describedFieldsProblem:()=>to,dropContextProblem:()=>ls,editArgumentProblem:()=>Sr,editResultProblem:()=>Or,elementRewriteProblem:()=>Er,entryProblem:()=>Jo,envelopeKept:()=>Ir,exitCodeProblem:()=>ds,fieldSite:()=>At,fieldsMissing:()=>En,fillModeProblem:()=>ir,firstProblem:()=>gt,groupCallIdsProblem:()=>Nr,hasChanged:()=>Is,hasClientId:()=>fr,hasCwd:()=>mr,hasRewritten:()=>cs,hasSessionId:()=>Ns,hasTokenCounts:()=>Tn,hasTurnId:()=>cr,holdsMore:()=>Ot,inputArgumentProblem:()=>Fr,instructionFilesProblem:()=>kt,isErrorPresentOnly:()=>cVr,isInstructionFiles:()=>Yt,isListOfTexts:()=>d7e,isSameFiles:()=>Ar,isTokenCount:()=>ho,isToolCheckDecision:()=>dn,isUsageCounts:()=>an,keepsEntries:()=>xt,keysKept:()=>fe,keysRestored:()=>z0,kindOf:()=>vt,messageArgumentProblem:()=>Br,messageResultProblem:()=>Kr,movedReferenceProblem:()=>It,namesAt:()=>lo,nullableTextProblem:()=>Xo,observed:()=>Gt,onScreenProblem:()=>Wr,opSite:()=>V,outputCommandProblem:()=>Vr,panePlacementProblem:()=>Gr,passedOriginProblem:()=>Yo,pathOf:()=>qo,permissionRequestDecisionProblem:()=>yr,permissionUpdateProblem:()=>dr,pinned:()=>zo,pinnedRowProblem:()=>Tt,presentedFieldsProblem:()=>oo,pressArgumentProblem:()=>Ke,progressKindProblem:()=>Xr,promptContextProblem:()=>rr,promptDropProblem:()=>Es,promptOriginProblem:()=>bs,promptWaitProblem:()=>Ss,propsShapeProblem:()=>Zr,raisedOnText:()=>en,raisedPairsOf:()=>on,readOnlyRestored:()=>xn,recordsOf:()=>Jt,refAndKindOf:()=>To,refusalRestored:()=>pr,renamedVariableProblem:()=>Et,renderArgumentProblem:()=>tn,renderMatcherAdvice:()=>uJn,renderedClaudeMd:()=>tr,reservedKeysKept:()=>Nt,resolveMatcherProblem:()=>rn,restoredCommandContext:()=>kr,restoredKeys:()=>Ce,rowFactsProblem:()=>Yr,selectArgumentProblem:()=>nn,settledAnswer:()=>hn,settledCheck:()=>kn,settledContext:()=>ni,settledDecision:()=>gn,settledSections:()=>wr,siteOf:()=>hbe,siteTableOf:()=>Qt,siteViewProblem:()=>Jr,spawnChunkProblem:()=>br,spawnContentProblem:()=>ln,stringLeaves:()=>Be,syncedCarrier:()=>bt,syncedInstructionsDown:()=>ai,syncedInstructionsUp:()=>pi,syncedPair:()=>si,textLengthOf:()=>Ct,textLengthProblem:()=>qr,textsOf:()=>OM,toolContextProblem:()=>Os,toolIdOf:()=>Sn,toolUseIdProblem:()=>Qr,turnTextProblem:()=>nr,unknownNameFindings:()=>yo,withClaudeMd:()=>vr,writtenEntriesLength:()=>wt,writtenFieldLength:()=>Je,writtenLength:()=>oe,wrongTypeFieldsOf:()=>xr});
var OSn=JEn;
var Rjt=XVr*HIe;
var ZGo={"session.start":(e)=>({cwd:e.cwd}),"session.attach":(e)=>({clientId:e.clientId}),"session.detach":(e)=>({clientId:e.clientId}),"session.measure":(e)=>({changed:e.changed}),"session.end":(e)=>({sessionId:e.sessionId}),"turn.start":(e)=>({turnId:e.turnId}),"turn.complete":(e)=>({text:e.answer,...e.usage&&{usage:e.usage}})};
var C=(e)=>(t,o,r)=>N(t)?e(t,o,r):"something that is not a result object";
function Vo(e){let{deny:t}=e;return t===void 0||typeof t==="string"&&t!==""?void 0:"a deny that is not a non-empty string"};
function De(e,t,o){if(e.deny===void 0)return o(e)?void 0:`neither ${t} nor { deny }`;return typeof e.deny==="string"?o(e)?`a deny beside ${t}`:void 0:"a deny that is not a string"};
function gt(e,t,o=B(e)){for(let r=0;r<o;r+=1){let n=r in e?t(e[r]):void 0;if(n!==void 0)return[r,n]}return};
var cs=(e,t)=>Un(e)!==Un(t);
function cVr(e){let{isError:t,...o}=e;return t===!0?e:o};
function OM(e){if(!Array.isArray(e))return;let t=B(e),o=[];for(let r=0;r<t;r+=1){let n=e[r];if(!(Object.hasOwn(e,r)&&typeof n==="string"))return;o.push(n)}return o};
var d7e=(e)=>OM(e)!==void 0;
function xt(e,t){let o=new Map;for(let r of e)o.set(r,(o.get(r)??0)+1);for(let r of t){let n=o.get(r)??0;if(n===0)return!1;o.set(r,n-1)}return!0};
function fe(e,t,o){let r=e.find((n)=>Un(t[n])!==Un(o[n]));if(!r)return;return`a changed ${r} (the envelope is the engine's; a rewrite keeps ${e.join(", ")})`};
function z0(e,t,o){let r=e.filter((s)=>!Object.hasOwn(t,s)&&Object.hasOwn(o,s));if(r.length===0)return t;let n={...t};for(let s of r)n[s]=o[s];return n};
var Go=Object.freeze(Array(1));
function Xo(e,t){return e===null||typeof e==="string"?void 0:`no { text } (a string, or null to leave the ${t} out)`};
var Gt=({event:e,check:t,checkArgument:o})=>({event:e,check:C(t),checkArgument:o});
var zo=(e,t,o)=>({event:e,checkArgument:(r,n)=>fe(t,r,n),check:C(o)});
function us(e,t,o){if(e===void 0)return;let r=OM(e);if(r===void 0)return"a context that is not a list of texts";if(r.some((a)=>a===""))return"a context with an empty entry";let s=o.filter((a)=>a.ref!==void 0&&a.ref===t),i=(a)=>xt(r,OM(a.context)??[]);return(s.length===0?o.slice(-1):s).every(i)?void 0:"a context without an entry a hook below attached (a hook adds to the context its next gave it; it may not leave an entry out)"};
var ls=(e)=>e===void 0?void 0:"a drop that carries a context";
var Xt=255;
function ds(e){return e===void 0||typeof e==="number"&&Number.isInteger(e)&&e>=0&&e<=Xt?void 0:`an exitCode that is not a whole number from 0 to ${Xt}`};
var ht="an origin other than the engine set (next(e) passes e.origin on)";
function Yo(e,t){return Un(e)===Un(t)?void 0:ht};
function ys(e,t){if(e.model!==t.model)return"a changed model (pinned)";if(typeof e.promptModel!=="string")return"no { promptModel } (a model id)";let o=e.outputStyle;if(!(o===null||N(o)&&typeof o.name==="string"&&typeof o.isKeepingCodingInstructions==="boolean"))return"no { outputStyle } (null, or { name, isKeepingCodingInstructions })";let[n]=["tools","traits","surfaces"].filter((s)=>!d7e(e[s])).map((s)=>`no { ${s} } (a list of names)`);return n};
function gs(e){let{sections:t}=e;if(!Array.isArray(t))return"no { sections } (a list of { id, text, scope })";let o=B(t),r=new Set,n=new Set;for(let s=0;s<o;s+=1){let i=t[s];if(!(Object.hasOwn(t,s)&&N(i)))return`a section that is not { id, text, scope } (at ${s})`;let{id:a,text:f,scope:m}=i;if(typeof a!=="string"||a==="")return`a section without an id (at ${s})`;if(typeof f!=="string")return`a section whose text is not a string (${a})`;if(m!=="shared"&&m!=="session")return`a section whose scope is neither shared nor session (${a})`;if(r.has(a))return`two sections with the id ${a} (a hook finds a section by it)`;if(m==="shared"&&n.has("session"))return`a shared section after a session one (${a}): every shared section goes first`;r.add(a),n.add(m)}return};
function xs(e,t){let o=new Set(t.flatMap((n)=>n.sections).map((n)=>n.text));return(Array.isArray(e.sections)?e.sections:[]).filter(N).flatMap(({text:n})=>typeof n==="string"&&!o.has(n)?[n]:[]).reduce((n,s)=>Math.max(n,s.length),0)};
var zt=32;
function Jo(e,t){if(!N(e))return`an instruction file that is not { path, kind, content } (at ${t})`;let{path:o,kind:r,content:n,parent:s}=e;if(typeof o!=="string"||o==="")return`an instruction file without a path (at ${t})`;if(!(typeof r==="string"&&_zo.some((a)=>a===r)))return`an instruction file whose kind is not one of ${_zo.join(", ")} (${o})`;if(typeof n!=="string")return`an instruction file whose content is not a string (${o})`;return s===void 0||typeof s==="string"?void 0:`an instruction file whose parent is not a string (${o})`};
function qo(e){let t=N(e)?e.path:void 0;return typeof t==="string"?t:""};
function kt(e){if(e===void 0)return;if(!Array.isArray(e))return"instructionFiles that is not a list of { path, kind, content }";let t=B(e),o=new Set;for(let r=0;r<t;r+=1){let n=e[r],s=Jo(n,r);if(s!==void 0)return s;let i=qo(n);if(o.has(i))return`two instruction files with the path ${i}`;o.add(i)}return};
function Qo(e){let{blocks:t}=e,o=kt(e.instructionFiles);if(o!==void 0)return o;if(!Array.isArray(t))return"no { blocks } (a list of { name, text })";let r=B(t);if(r>zt)return`more than ${zt} blocks`;let n=new Set;for(let s=0;s<r;s+=1){let i=t[s];if(!(Object.hasOwn(t,s)&&N(i)))return`a block that is not { name, text } (at ${s})`;let{name:a,text:f}=i;if(typeof a!=="string"||a==="")return`a block without a name (at ${s})`;if(typeof f!=="string")return`a block whose text is not a string (${a})`;if(n.has(a))return`two blocks named ${a} (the engine keys the context by name)`;n.add(a)}return};
function ks(e){switch(e.kind){case"managed":return"Managed";case"user":return"User";case"project":return"Project";case"local":return"Local";case"memory":return"AutoMem"}};
function ezo(e,t){let o=B(e);if(o!==t.length)return!1;for(let r=0;r<o;r+=1){let n=e[r],s=t[r];if(!(!(r in e)||n!==void 0&&s!==void 0&&n.path===s.path&&n.kind===s.kind&&n.content===s.content&&n.parent===s.parent))return!1}return!0};
var ws="Codebase and user instructions are shown below. Be sure to adhere to these instructions. IMPORTANT: These instructions OVERRIDE any default behavior and you MUST follow them exactly as written.";
function Ts(e){switch(e){case"Project":return" (project instructions, checked into the codebase)";case"Local":return" (user's private project instructions, not checked in)";case"AutoMem":return" (user's auto-memory, persists across conversations)";case"Managed":return" (organization-managed policy instructions)";case"User":return" (user's private global instructions for all projects)"}};
function Z7n(e){return e.map((t)=>`Contents of ${t.path}${Ts(t.type)}:

`+(t.type==="AutoMem"?jQ(t.content).trim():t.content.trim())).join(`

`)};
function CPe(e){let t=Z7n(e);return t===""?"":`${ws}

${t}`};
function Ye(e){return CPe(Y(e).map((t)=>({path:t.path,type:ks(t),content:t.content})))};
function Yt(e){return Array.isArray(e)&&kt(e)===void 0};
function tr(e){return Yt(e)?Ye(e):void 0};
function or(e,t,o){let r=new Map;for(let i of[t,...o].flatMap((p)=>p.blocks))r.set(i.name,(r.get(i.name)??new Set).add(i.text));let n=Array.isArray(e.blocks)?Y(e.blocks):[],s=tr(e.instructionFiles);return n.filter(N).flatMap(({name:i,text:p})=>{let a=r.get(String(i))?.has(String(p))===!0||i==="claudeMd"&&p===s;return typeof p==="string"&&!a?[p]:[]}).reduce((i,p)=>Math.max(i,p.length),0)};
function rr(e){if(e!==void 0&&!d7e(e))return"a context that is not a list of texts";return(OM(e)??[]).some((o)=>o==="")?"a context with an empty entry":void 0};
var qb=4096;
function Es(e,t){return t.includes(e)||e.length<=qb?void 0:`a drop over ${qb} characters`};
function bs(e,t){return e===void 0||Un(e)===Un(t)?void 0:"an origin the engine did not set (a hook may leave the origin out of its answer, or answer it as received; it may not set one)"};
function Ss(e,t){return e===t?void 0:typeof e==="boolean"?"a wait the engine did not set (whether the prompt waits its turn is the user's; a hook carries it as received)":"no { wait }"};
function Os(e,t,o){if(e!==void 0&&!OM(e))return"a context that is not a list of texts";let r=e===void 0?[]:OM(e)??[];if(r.some((f)=>f===""))return"a context with an empty entry";let s=Un(t),i=o.filter((f)=>Un(f.result)===s),p=(f)=>xt(r,OM(f.context)??[]);return(i.length===0?o:i).every(p)?void 0:"a context without an entry a hook below attached (a hook adds to the context its next gave it; it may not leave an entry out)"};
function nr(e,t){return e===t||e.length<=qb?void 0:`a text over ${qb} characters`};
function Jt(e){if(!Array.isArray(e))return e;let t=B(e),o=[];for(let r=0;r<t;r+=1){if(!Object.hasOwn(e,r)){o.push(void 0);continue}let n=e[r];o.push(N(n)?Object.fromEntries(Object.keys(n).map((s)=>[s,n[s]])):n)}return o};
var Ce=(e)=>(t,o)=>z0(e,t,o);
function wt(e,...t){let o=new Set(t.flatMap((r)=>OM(r)??[]));return(OM(e)??[]).filter((r)=>!o.has(r)).reduce((r,n)=>Math.max(r,n.length),0)};
function oe(e,...t){return typeof e==="string"&&!t.includes(e)?e.length:0};
var Je=(e)=>(t,o,r)=>oe(t[e],o[e],...r.map((n)=>n[e]));
var V=(e)=>({event:e,check:C((t)=>De(t,"{ value }",(o)=>Object.hasOwn(o,"value")))});
var qt=32000;
var WBe={type:"engine",ref:0};
function tzo(e,t){if(!N(t))return t;let o=t[e.field];if(typeof o!=="string"||o==="")return t;let r=Jm(e.at,o);return r===o?t:{...t,[e.field]:r}};
var Qt=(e,t)=>Object.fromEntries(e.map((o)=>[o,t(o)]));
function sr(e,t){if(Un(e.origin)!==Un(t.origin))return"a changed origin (the engine set it; next(e) passes it on)";return typeof e.text==="string"?void 0:"no { text } (a string)"};
var Zt=(e,t,o={restored:[],passedProblem:()=>{return}})=>({event:e,restoreArgument:(r,n)=>z0(["origin",...o.restored],r,n),checkArgument:(r,n)=>sr(r,n)??o.passedProblem(r),measureArgument:(r,n)=>oe(r.text,n.text),check:C((r)=>typeof r[t]==="boolean"?void 0:`no { ${t} } (true or false)`)});
var ir=(e)=>WSn(e.mode)?void 0:`a mode that is not one of ${Fjt.join(", ")}`;
var eo=["start","end"];
var xjt=["color","backgroundColor","dimColor","bold","italic","underline","strikethrough"];
var ar=[...eo,...xjt];
function vs(e){return typeof e==="string"||typeof e==="number"||typeof e==="boolean"?e:""};
function Cs(e){if(!N(e))return" must be an object with start and end";let o=Object.keys(e).find((n)=>!ar.includes(n));if(o!==void 0)return`.${o} is not a decoration key (${ar.join(", ")})`;let r=eo.find((n)=>!Number.isInteger(e[n]));if(r!==void 0)return`.${r} must be an integer (a UTF-16 offset)`;for(let n of xjt){let s=e[n],p=s===void 0?void 0:Ijt(n,vs(s));if(p!==void 0)return`.${n} ${p}`}return};
function GBe(e){if(e===void 0)return;if(!Array.isArray(e))return"decorations must be an array of { start, end } runs";let o=e,r=B(o);for(let n=0;n<r;n+=1){let s=Cs(o[n]);if(s!==void 0)return`decorations[${n}]${s}`}return};
function pr(e,t){let{refusal:o,...r}=e;return o!==void 0&&r.isFilled===!1&&t.some((s)=>s.refusal===o)?{...r,refusal:o}:r};
var Ps={...Zt("prompt.fill","isFilled",{restored:["mode"],passedProblem:(e)=>ir(e)??GBe(e.decorations)}),stripResult:pr};
var Is=(e)=>Array.isArray(e.changed)?void 0:"no { changed }";
var fr=(e)=>typeof e.clientId==="string"?void 0:"no { clientId }";
var mr=(e)=>typeof e.cwd==="string"?void 0:"no { cwd }";
var Ns=(e)=>typeof e.sessionId==="string"?void 0:"no { sessionId }";
var cr=(e)=>typeof e.turnId==="string"?void 0:"no { turnId }";
var ur=["hook_event_name","session_id","transcript_path","cwd","scratchpad_dir","prompt_id","permission_mode","agent_id","agent_type","served_call","caller_session_id","effort"];
var lr=(e,t)=>fe(ur,e,t);
function dr(e){if(!N(e))return"an updatedPermissions entry that is not an object";if(!(typeof e.destination==="string"&&["userSettings","projectSettings","localSettings","session","cliArg"].includes(e.destination)))return"an updatedPermissions entry with an unknown destination";switch(e.type){case"addRules":case"replaceRules":case"removeRules":return(e.behavior==="allow"||e.behavior==="deny"||e.behavior==="ask")&&Array.isArray(e.rules)&&Re(e.rules,(r)=>N(r)&&typeof r.toolName==="string"&&(r.ruleContent===void 0||typeof r.ruleContent==="string"))?void 0:`an updatedPermissions ${e.type} without rules and a behavior`;case"setMode":return[...KF,YF].includes(e.mode)?void 0:"an updatedPermissions setMode with an unknown mode";case"addDirectories":case"removeDirectories":return d7e(e.directories)?void 0:`an updatedPermissions ${e.type} without directories`;default:return"an updatedPermissions entry of an unknown type"}};
function yr(e){let t=e===void 0;if(!N(e))return t?void 0:"a decision that is not an object";let o=e;if(o.behavior==="deny")return(o.message===void 0||typeof o.message==="string")&&(o.interrupt===void 0||typeof o.interrupt==="boolean")?void 0:"a deny decision whose message or interrupt has the wrong type";if(o.behavior!=="allow")return"a decision whose behavior is not allow or deny";if(!(o.updatedInput===void 0||N(o.updatedInput)))return"an allow decision whose updatedInput is not an object";let{updatedPermissions:n}=o,s=Array.isArray(n);return s||n===void 0?gt(s?n:[],dr)?.[1]:"an allow decision whose updatedPermissions is not a list"};
function gr(e){let{permissionDecision:t}=e;return t===void 0||t==="allow"||t==="deny"||t==="ask"?yr(e.decision):"a permissionDecision that is not allow, deny or ask"};
var xr=(e)=>[...["block","stopReason","sessionTitle","initialUserMessage","displayContent","permissionDecisionReason","worktreePath"].filter((t)=>e[t]!==void 0&&typeof e[t]!=="string"),...["preventContinuation","suppressOriginalPrompt","reloadSkills","retry"].filter((t)=>e[t]!==void 0&&e[t]!==!0),...["additionalContext","watchPaths"].filter((t)=>e[t]!==void 0&&!d7e(e[t]))];
function hr(e){let t=xr(e);return t.length>0?`${t.join(", ")} of the wrong type`:gr(e)};
function nJn(e){return{event:e,check:C(hr),checkArgument:lr}};
function to(e,t){let{description:o,argumentHint:r,isHidden:n}=e;if(typeof o!=="string")return"no { description } (a string)";if(!(r===void 0||typeof r==="string"))return"an argumentHint that is not a string";if(typeof n!=="boolean")return"no { isHidden } (a boolean)";let a=o===t.description||o.length<=qb,f=r===void 0||r===t.argumentHint||r.length<=qb;return a&&f?void 0:`a description or argumentHint over ${qb} characters`};
var Ms={event:"command.describe",restoreArgument:(e,t)=>z0(["provider"],e,t),checkArgument:(e,t)=>{if(e.command!==t.command)return"a changed command (the engine lists and caches by it)";if(e.immediate!==t.immediate)return"a changed immediate (read only: the command declares whether it runs mid-turn; next(e) passes it on)";return Un(e.provider)===Un(t.provider)?to(e,t):"a changed provider (pinned: who provides the command is a fact)"},check:C(to)};
function kr(e,t){if(e.context!==void 0)return e;let r=(t.find((n)=>n.ref!==void 0&&n.ref===e.ref)??t.at(-1))?.context;return r===void 0?e:{...e,context:r}};
var js={event:"command.run",restoreArgument:Ce(["presentation"]),checkArgument:(e,t)=>{if(e.command!==t.command)return"a changed command (the engine runs the one it resolved)";if(Un(e.presentation)!==Un(t.presentation))return"a changed presentation (pinned: where the answer shows is a fact)";return typeof e.args==="string"?Yo(e.origin,t.origin):"no { args } (a string)"},measureArgument:(e,t)=>oe(e.args,t.args),settle:(e)=>({text:e.text,...e.context!==void 0&&{context:OM(e.context)??Go},ref:e.ref,...e.exitCode!==void 0&&{exitCode:e.exitCode}}),restoreResult:kr,check:C((e,t,o)=>{let{text:r,context:n,ref:s,exitCode:i}=e;if(s!==void 0&&typeof s!=="number")return"a ref that is not the one next(e) gave";return r!==void 0&&typeof r!=="string"?"a text that is not a string":ds(i)??us(n,s,o??[])}),measure:(e,t,o)=>Math.max(oe(e.text,...o.map((r)=>r.text)),wt(e.context,...o.map((r)=>r.context)))};
var wr=(e)=>({...e,sections:Jt(e.sections)});
var Fs={event:"prompt.compose",pinnedKeys:["model"],restoreArgument:Ce(["model"]),checkArgument:ys,settle:wr,check:C(gs),measure:(e,t,o)=>xs(e,o)};
function Tt(e,t){let o=e.key!==t.key,r=Un(e.provider)!==Un(t.provider);return(o?"a changed key (pinned)":void 0)??(r?"a changed provider (pinned: a fact)":void 0)};
function oo(e,t){let{label:o,description:r,isHidden:n}=e;if(!(typeof o==="string"&&o!==""))return"no { label } (a non-empty string)";if(typeof n!=="boolean")return"no { isHidden } (a boolean)";if(r!==void 0&&typeof r!=="string")return"a description that is not a string";let i=o===t.label||o.length<=qb,p=r===void 0||r===t.description||r.length<=qb;return i&&p?void 0:`a label or description over ${qb} characters`};
var Ds={event:"config.describe",checkArgument:(e,t)=>Tt(e,t)??oo(e,t),restoreArgument:Ce(["provider"]),check:C(oo)};
function Ojt(e){let t=typeof e==="boolean"||typeof e==="string"||Number.isFinite(e),o=Array.isArray(e)&&Re(e,(n)=>typeof n==="string");return t||o?void 0:"a value that is not a boolean, a string, a number or a list of strings"};
var Us={event:"config.set",restoreArgument:Ce(["previous","provider","origin"]),checkArgument:(e,t)=>{let o=Un(e.previous)!==Un(t.previous),r=Un(e.origin)!==Un(t.origin),n=Object.hasOwn(e,"value");return Tt(e,t)??(o?"a changed previous (pinned)":void 0)??(r?"a changed origin (the engine sets it)":void 0)??(n?Ojt(e.value):"no { value }")},settle:(e)=>e.deny===void 0?{value:e.value}:{deny:e.deny},check:C((e)=>{let t=e.deny,r=typeof t==="string"&&t.length>qb?`a deny over ${qb}`:void 0;return De(e,"{ value }",(s)=>Object.hasOwn(s,"value"))??r??(t===void 0?Ojt(e.value):void 0)})};
function Et(e,t){return e.name!==t.name?"a changed name (the variable read or written; next(e) passes it on)":void 0};
var Bs={event:"env.get",check:V("env.get").check,checkArgument:Et};
var Ks={event:"env.set",check:V("env.set").check,checkArgument:Et};
function Er(e,t){if(e!==void 0&&t===void 0)return"an element where the move named none (one of the engine's stops)";if(e===void 0&&t!==void 0)return"no element where the move named one (a rewrite names another)";return e===void 0||typeof e==="string"&&e!==""?void 0:"an element that is not a non-empty string"};
var ro=["component","requestId","plugin","origin"];
var Vs={event:"ui.focus",restoreArgument:(e,t)=>z0([...ro,"element"],e,t),checkArgument:(e,t)=>fe(ro,e,t)??Er(e.element,t.element),check:C(Vo)};
var rJn=64;
function uyt(e){return typeof e==="string"&&e.length<=rJn&&/^[A-Za-z0-9_-]+$/.test(e)?void 0:`id is 1 to ${rJn} of letters, digits, _ or -`};
var Xs={event:"ui.close",check:V("ui.close").check,checkArgument:(e,t)=>{let o=uyt(e.id);if(o!==void 0)return`an unusable id: ${o}`;if(e.id!==t.id)return"a changed id (the pane being closed; next(e) passes it on)";if(e.origin===void 0)return"no origin (next(e) passes e.origin on; a rewrite spreads it: next({ ...e, id }))";return Un(e.origin)!==Un(t.origin)?ht:void 0}};
var zs={event:"ui.open",check:V("ui.open").check,checkArgument:(e,t)=>e.id!==t.id?"a changed id (the pane being opened; next(e) passes it on)":void 0};
var qs={event:"plugin.register",restoreArgument:(e,t)=>z0(["version"],e,t),checkArgument:(e,t)=>fe(["name","tier","root","version","provenance","uses"],e,t),check:C((e)=>{let{allow:t,refuse:o}=e;if(o===void 0)return t===!0?void 0:"neither { allow: true } nor { refuse }";if(typeof o!=="string")return"a refuse that is not a string";return t===void 0?void 0:"an allow beside { refuse }"})};
function br(e){if(!N(e))return"no { stream, text } (not an object)";if(!(e.stream==="stdout"||e.stream==="stderr"))return'a stream that is neither "stdout" nor "stderr"';return typeof e.text==="string"&&e.text!==""?void 0:"a text that is not a non-empty string"};
var Zs={event:"process.spawn",budgetSpan:"pull",check:V("process.spawn").check,chunkChecker:()=>({pulled:()=>{},yielded:(e,t)=>t?void 0:br(e)})};
var ti={event:"attribution.text",checkArgument:(e,t)=>{let o=e.kind;if(typeof o!=="string")return"no { kind }";if(o!==t.kind)return"a changed kind (the hooks beneath match on it)";return typeof e.text==="string"?void 0:"no { text }"},measureArgument:(e,t)=>oe(e.text,t.text),check:C((e)=>typeof e.text==="string"?void 0:"no { text } (a string)"),measure:Je("text")};
var HM=(e)=>typeof e==="number"&&Number.isInteger(e)&&e>=0;
function Sr(e,t){let{text:o,cursor:r,start:n,end:s,inputText:i}=e,p=Un(e.origin)===Un(t.origin),a=Un(e.key)===Un(t.key),f=typeof o==="string"&&typeof i==="string",m=typeof o==="string"?o.length:0,c=HM(r)&&HM(n)&&HM(s)&&r<=m&&n<=s&&s<=m;if(!p)return"a changed origin (the engine set it; next(e) passes it on)";if(!a)return"a changed key (what the person pressed; next(e) passes it on)";if(!f)return"no { text, inputText } (strings)";return c?void 0:"a { cursor, start, end } outside the text (whole offsets, ordered)"};
function Or(e){return typeof e.text==="string"&&HM(e.cursor)?GBe(e.decorations):"no { text, cursor } (a string and a whole offset)"};
var oi={event:"engine.create"};
var ri={event:"prompt.attachment",restoreArgument:Ce(["origin","agentId","detail"]),checkArgument:(e,t)=>{if(Object.hasOwn(e,"detail")&&!Object.hasOwn(t,"detail"))return"an added detail (the engine says which types carry one)";let r=fe(["type","origin","agentId","detail"],e,t);if(r!==void 0)return r;return typeof e.text==="string"?void 0:"no { text } (a string)"},measureArgument:(e,t)=>oe(e.text,t.text),check:C((e)=>Xo(e.text,"attachment")),measure:Je("text")};
function ni(e){let t={...e},o={...t,blocks:Jt(t.blocks)};if(t.instructionFiles)o.instructionFiles=Jt(t.instructionFiles);return o};
function no(e){return Y(e.blocks).find((t)=>t.name==="claudeMd")?.text};
function Ar(e,t){return e===void 0||t===void 0?e===t:ezo(e,t)};
function vr(e,t){let o=Y(e);return o.some((n)=>n.name==="claudeMd")?o.map((n)=>n.name==="claudeMd"?{...n,text:t}:n):[{name:"claudeMd",text:t},...o]};
function si(e,t){if(t.instructionFiles===void 0)return{...e,instructionFiles:void 0};let o=e.instructionFiles??t.instructionFiles,r=no(e),n=r!==no(t),s=!Ar(o,t.instructionFiles);if(!n&&s&&o!==void 0){let a=vr(e.blocks,Ye(o));return{...e,blocks:a,instructionFiles:o}}if(!n||o!==void 0&&r===Ye(o))return{...e,instructionFiles:o};if(s)nd().log("prompt.context: a hook changed the claudeMd text and the instruction files in one step; the text stands and the files read as unknown");return{...e,instructionFiles:void 0}};
function bt(e,t){let{blocks:o,instructionFiles:r}=e;if(!Array.isArray(o))return e;let n=B(o);for(let p=0;p<n;p+=1){let a=o[p];if(!(Object.hasOwn(o,p)&&N(a)&&typeof a.name==="string"&&typeof a.text==="string"))return e}if(!(r===void 0||Yt(r)))return e;let i={blocks:o,instructionFiles:r};return{...e,...si(i,t)}};
var ai=(e,t)=>bt(e,t);
var pi=(e,t,o)=>bt(e,t.at(-1)??o);
var mi={event:"prompt.context",restoreArgument:ai,checkArgument:Qo,measureArgument:(e,t)=>or(e,t,[]),settle:ni,restoreResult:pi,check:C(Qo),measure:or};
var ci=50;
var ui={event:"prompt.edit",budgetMs:ci,restoreArgument:(e,t)=>z0(["origin","key"],e,t),checkArgument:Sr,measureArgument:(e,t)=>Math.max(oe(e.text,t.text),oe(e.inputText,t.inputText)),check:C(Or),measure:(e,t,o)=>oe(e.text,t.text,...o.map((r)=>r.text))};
var li={event:"prompt.section",checkArgument:(e,t)=>{if(typeof e.name!=="string")return"no { name }";if(e.name!==t.name)return"a changed name (the engine caches the section by it)";if(e.text===null)return;return typeof e.text==="string"?void 0:"a text that is neither a string nor null"},measureArgument:(e,t)=>oe(e.text,t.text),check:C((e)=>Xo(e.text,"section")),measure:Je("text")};
var yi={event:"prompt.submit",checkArgument:(e,t)=>typeof e.text==="string"?Ss(e.wait,t.wait)??Yo(e.origin,t.origin)??rr(e.context):"no { text }",measureArgument:(e,t)=>Math.max(oe(e.text,t.text),wt(e.context,t.context)),check:C((e,t,o)=>{let r=e.drop===void 0,n=typeof e.text==="string",s=e.drop;return r?n?bs(e.origin,t.origin)??rr(e.context):"neither { text } nor { drop }":typeof s==="string"?Es(s,(o??[]).map((p)=>p.drop))??ls(e.context):"a drop that is not a string"}),measure:(e,t,o)=>Math.max(oe(e.text,t.text,...o.map((r)=>r.text)),wt(e.context,t.context,...o.map((r)=>r.context)))};
var gi={event:"skill.prompt",checkArgument:(e,t)=>{let{skill:o,text:r}=e,n=typeof o==="string",s=o===t.skill;return n?s?typeof r==="string"?void 0:"no { text }":"a changed skill (the hooks beneath match on it)":"no { skill }"},measureArgument:(e,t)=>oe(e.text,t.text),check:C((e)=>typeof e.text==="string"?void 0:"no { text } (a string)"),measure:Je("text")};
var hi={event:"ui.blit",check:V("ui.blit").check,checkArgument:(e,t)=>e.requestId!==t.requestId||e.key!==t.key||(("source"in e)&&e.source!==void 0)!==(("source"in t)&&t.source!==void 0)?"a changed requestId, key or kind (the Raster or Image being blitted; next(e) passes them on)":void 0};
var Ue="any kind";
function Rr(e){let t=N(e)?e.tool_use_id:null;return t===void 0||typeof t==="string"?t:null};
function so(e){return Array.isArray(e)?Y(e).map(Rr):void 0};
function St(e){let{keys:t,passed:o,received:r,explanation:n}=e,s=t.find((i)=>Un(o[i])!==Un(r[i]));if(s===void 0)return;return`a changed ${s} (${n})`};
function Be(e){switch(typeof e){case"string":return[e];case"object":if(e===null)return[];return Array.isArray(e)?Y(e).flatMap(Be):Object.entries(e).flatMap(([t,o])=>[t,...Be(o)]);default:return[]}};
var ao=(e,t)=>Be(e).reduce((o,r)=>o+oJn(r,t),0);
var Ot=(e,t,o)=>ao(e,o)>ao(t,o);
function Cr(e,t){let o=t.props,r=Object.keys(e).find((n)=>e[n]!==o[n]&&Un(e[n])!==Un(o[n])&&(Ot(e[n],o[n],sJn)||Ot(e[n],o[n],aJn)||Ot(e[n],o[n],iJn)));if(r===void 0)return;return`a props.${r} with a control character (an escape sequence the terminal would honour, an image placeholder, or an unpaired surrogate half out of reach); a rewrite the engine draws adds none`};
var ke=["an object","null","missing"];
var Pr={AskUserQuestion:{metadataSource:["a string","missing"]},UserMessage:{onScreen:ke},AssistantMessage:{onScreen:ke},ToolUse:{input:Ue,output:Ue,onScreen:ke},ToolResult:{output:Ue,onScreen:ke},ToolGroup:{onScreen:ke},CommandOutput:{onScreen:ke},Spinner:{message:["a string","null"],suffix:["a string","missing"]},TurnDuration:{onScreen:ke},InfoNotice:{command:["a string","null"],onScreen:ke},PromptHint:{tail:["a string","missing"]}};
var po="PermissionRequest";
var _r=["surface","component","requestId","viewport"];
var Ir=(e,t)=>fe(_r,e,t);
var At=(e,t)=>({event:e,checkArgument:t,check:C((o)=>typeof o.element==="string"&&typeof o.value==="string"?void 0:"no { element, value }")});
function Nr(e,t){let r=t.component==="ToolGroup"?so(t.props.calls)??[]:void 0,n=so(e.calls);return r!==void 0&&(n===void 0||n.length!==r.length||n.some((i,p)=>i===null||i!==r[p]))?"props.calls whose tool_use_ids are not the ones the engine drew (each call keeps the id tool.call carried; the group's calls are its own)":void 0};
function wi(e){if(typeof e!=="object"||!e)throw TypeError("the element constructor did not build an element");return e};
function Ti(){let e=new WeakMap;return{mark:(t,o)=>(e.set(t,o),t),nameOf:(t)=>typeof t==="function"?e.get(t):void 0}};
var HSn=Ti();
var V7n=String.raw`(() => {
  'use strict'
  const INTRINSIC = { Box: 'Box', Text: 'Text' }
  let pressCounter = 0
  const flatten = (children, into) => {
    for (const child of children) {
      if (child === null || child === undefined || typeof child === 'boolean') {
        continue
      }
      if (Array.isArray(child)) {
        flatten(child, into)
      } else {
        into.push(typeof child === 'number' ? String(child) : child)
      }
    }
  }
  function Fragment(props) {
    return {
      type: 'Box',
      props: { flexDirection: 'column' },
      children: props.children ?? [],
    }
  }
  function hoverOf(tag, props) {
    const hover = props?.hover
    if (hover === undefined || hover === null) return undefined
    if (typeof hover !== 'object' || Array.isArray(hover)) {
      throw new Error(
        'JSX element <' + tag + '> hover is an object of style props ' +
          '({ borderColor: "cyan" }), applied while the pointer is over the ' +
          'nearest keyed Box',
      )
    }
    return { ...hover }
  }
  function autoFocusOf(tag, key, props) {
    const autoFocus = props?.autoFocus
    if (autoFocus !== undefined && autoFocus !== true) {
      throw new Error(
        'JSX element <' + tag + ' key="' + key + '"> autoFocus is true or ' +
          'absent',
      )
    }
    return autoFocus
  }
  function button(props, children) {
    const { onPress, hotkey, action, plain, dimColor, variant, role } =
      props ?? {}
    const hover = hoverOf('Button', props)
    const childLabel =
      children.length === 1 && typeof children[0] === 'string'
        ? children[0]
        : undefined
    const label = props?.label ?? childLabel
    const key = props?.key ?? label
    if (typeof label !== 'string') {
      throw new Error(
        'JSX element <Button> needs a label: the label prop, or one string ' +
          'child',
      )
    }
    if (typeof key !== 'string' || key === '') {
      throw new Error(
        'JSX element <Button> needs a key: its address, what e.element ' +
          'carries at ui.press (the label when absent)',
      )
    }
    if (typeof onPress !== 'function') {
      throw new Error(
        'JSX element <Button key="' + key + '"> needs an onPress function',
      )
    }
    if (
      children.length > 0 &&
      (childLabel === undefined || props?.label !== undefined)
    ) {
      throw new Error(
        'JSX element <Button key="' + key + '"> takes one string child, ' +
          'its label, or none',
      )
    }
    if (
      hotkey !== undefined &&
      (typeof hotkey !== 'string' || !/^[0-9a-z]$/.test(hotkey))
    ) {
      throw new Error(
        'JSX element <Button key="' + key + '"> hotkey must be one digit ' +
          '0-9 or one lowercase letter a-z',
      )
    }
    if (action !== undefined && (typeof action !== 'string' || action === '')) {
      throw new Error(
        'JSX element <Button key="' + key + '"> action is a string naming ' +
          "one of the engine's keybinding actions (app:cycleDiffBase)",
      )
    }
    if (plain !== undefined && plain !== true) {
      throw new Error(
        'JSX element <Button key="' + key + '"> plain is true or absent',
      )
    }
    if (dimColor !== undefined && typeof dimColor !== 'boolean') {
      throw new Error(
        'JSX element <Button key="' + key + '"> dimColor is a boolean or ' +
          'absent',
      )
    }
    if (
      variant !== undefined &&
      variant !== 'primary' &&
      variant !== 'secondary'
    ) {
      throw new Error(
        'JSX element <Button key="' + key + '"> variant is "primary", ' +
          '"secondary" or absent',
      )
    }
    if (role !== undefined && role !== 'dismiss') {
      throw new Error(
        'JSX element <Button key="' + key + '"> role is "dismiss" or absent',
      )
    }
    const autoFocus = autoFocusOf('Button', key, props)
    const buttonProps = { key, label }
    if (hotkey !== undefined) {
      buttonProps.hotkey = hotkey
    }
    if (action !== undefined) {
      buttonProps.action = action
    }
    if (plain === true) {
      buttonProps.plain = true
    }
    if (dimColor !== undefined) {
      buttonProps.dimColor = dimColor
    }
    if (variant !== undefined) {
      buttonProps.variant = variant
    }
    if (role !== undefined) {
      buttonProps.role = role
    }
    if (autoFocus === true) {
      buttonProps.autoFocus = true
    }
    return {
      type: 'Button',
      props: buttonProps,
      ...(hover !== undefined && { hover }),
      press: { plugin: '', handle: ++pressCounter },
      onPress,
    }
  }
  function input(props, children) {
    const { key, label, placeholder, value, submitLabel, onInput, onSubmit } =
      props ?? {}
    if (typeof key !== 'string' || key === '') {
      throw new Error(
        'JSX element <Input> needs a key: its address, what e.element ' +
          'carries at ui.input',
      )
    }
    if (typeof onSubmit !== 'function') {
      throw new Error(
        'JSX element <Input key="' + key + '"> needs an onSubmit function',
      )
    }
    if (onInput !== undefined && typeof onInput !== 'function') {
      throw new Error(
        'JSX element <Input key="' + key + '"> onInput is a function or ' +
          'absent',
      )
    }
    if (children.length > 0) {
      throw new Error(
        'JSX element <Input key="' + key + '"> is a leaf: it takes no children',
      )
    }
    const inputProps = { key }
    for (const [name, text] of Object.entries({
      label, placeholder, value, submitLabel,
    })) {
      if (text === undefined) continue
      if (typeof text !== 'string') {
        throw new Error(
          'JSX element <Input key="' + key + '"> ' + name + ' must be a string',
        )
      }
      inputProps[name] = text
    }
    if (autoFocusOf('Input', key, props) === true) {
      inputProps.autoFocus = true
    }
    return {
      type: 'Input',
      props: inputProps,
      press: { plugin: '', handle: ++pressCounter },
      onEvent: e =>
        e.kind === 'submit'
          ? onSubmit(e.value, e)
          : onInput === undefined
            ? undefined
            : onInput(e.value, e),
    }
  }
  function select(props, children) {
    const { key, label, options, value, onSelect } = props ?? {}
    if (typeof key !== 'string' || key === '') {
      throw new Error(
        'JSX element <Select> needs a key: its address, what e.element ' +
          'carries at ui.select',
      )
    }
    if (typeof onSelect !== 'function') {
      throw new Error(
        'JSX element <Select key="' + key + '"> needs an onSelect function',
      )
    }
    if (!Array.isArray(options) || options.length === 0) {
      throw new Error(
        'JSX element <Select key="' + key + '"> needs options, a ' +
          'non-empty array of { value, label? }',
      )
    }
    if (children.length > 0) {
      throw new Error(
        'JSX element <Select key="' + key + '"> is a leaf: it takes no ' +
          'children',
      )
    }
    const selectProps = { key, options: [] }
    for (const option of options) {
      const isOption =
        typeof option === 'object' && option !== null &&
        typeof option.value === 'string' &&
        (option.label === undefined || typeof option.label === 'string')
      if (!isOption) {
        throw new Error(
          'JSX element <Select key="' + key + '"> options are ' +
            '{ value: string, label?: string }',
        )
      }
      selectProps.options.push(
        option.label === undefined
          ? { value: option.value }
          : { value: option.value, label: option.label },
      )
    }
    for (const [name, text] of Object.entries({ label, value })) {
      if (text === undefined) continue
      if (typeof text !== 'string') {
        throw new Error(
          'JSX element <Select key="' + key + '"> ' + name +
            ' must be a string',
        )
      }
      selectProps[name] = text
    }
    if (autoFocusOf('Select', key, props) === true) {
      selectProps.autoFocus = true
    }
    return {
      type: 'Select',
      props: selectProps,
      press: { plugin: '', handle: ++pressCounter },
      onEvent: e => onSelect(e.value, e),
    }
  }
  function svg(props, children) {
    const { source, alt, width, height, isInteractive } = props ?? {}
    if (typeof source !== 'string' || typeof alt !== 'string') {
      throw new Error(
        'JSX element <Svg> needs source (the SVG markup) and alt, both ' +
          'strings',
      )
    }
    if (children.length > 0) {
      throw new Error('JSX element <Svg> is a leaf: it takes no children')
    }
    const svgProps = { source, alt }
    if (width !== undefined) svgProps.width = width
    if (height !== undefined) svgProps.height = height
    if (isInteractive !== undefined) svgProps.isInteractive = isInteractive
    return { type: 'Svg', props: svgProps }
  }
  function code(props, children) {
    const { source } = props ?? {}
    if (typeof source !== 'string') {
      throw new Error('JSX element <Code> needs source, a string (the code)')
    }
    if (children.length > 0) {
      throw new Error('JSX element <Code> is a leaf: it takes no children')
    }
    const codeProps = { source }
    for (const name of ['language', 'path', 'startLine', 'format', 'wrap']) {
      if (props[name] !== undefined) codeProps[name] = props[name]
    }
    return { type: 'Code', props: codeProps }
  }
  function markdown(props, children) {
    const { key, text, dimColor, onLinkPress, pressableLinks } = props ?? {}
    if (typeof text !== 'string') {
      throw new Error(
        'JSX element <Markdown> needs text, a string (the markdown)',
      )
    }
    if (key !== undefined && (typeof key !== 'string' || key === '')) {
      throw new Error('JSX element <Markdown> key is a non-empty string')
    }
    const named =
      key === undefined ? '<Markdown>' : '<Markdown key="' + key + '">'
    if (children.length > 0) {
      throw new Error(
        'JSX element ' + named + ' is a leaf: it takes no children (the ' +
          'markdown is its text prop)',
      )
    }
    if (dimColor !== undefined && typeof dimColor !== 'boolean') {
      throw new Error(
        'JSX element ' + named + ' dimColor is a boolean or absent',
      )
    }
    if (onLinkPress !== undefined && typeof onLinkPress !== 'function') {
      throw new Error(
        'JSX element ' + named + ' onLinkPress is a function or absent',
      )
    }
    if (onLinkPress !== undefined && key === undefined) {
      throw new Error(
        'JSX element <Markdown> with onLinkPress needs a key: its address, ' +
          'what e.element carries at ui.press',
      )
    }
    if (pressableLinks !== undefined && onLinkPress === undefined) {
      throw new Error(
        'JSX element ' + named + ' pressableLinks names the links ' +
          'onLinkPress answers; without onLinkPress no link is pressable',
      )
    }
    const isLinkList =
      pressableLinks === undefined ||
      (Array.isArray(pressableLinks) &&
        pressableLinks.every(href => typeof href === 'string' && href !== ''))
    if (!isLinkList) {
      throw new Error(
        'JSX element ' + named + ' pressableLinks is a list of hrefs ' +
          '(non-empty strings) or absent',
      )
    }
    const markdownProps = { text }
    if (key !== undefined) markdownProps.key = key
    if (dimColor !== undefined) markdownProps.dimColor = dimColor
    if (pressableLinks !== undefined) {
      markdownProps.pressableLinks = [...pressableLinks]
    }
    if (onLinkPress === undefined) {
      return { type: 'Markdown', props: markdownProps }
    }
    return {
      type: 'Markdown',
      props: markdownProps,
      press: { plugin: '', handle: ++pressCounter },
      onEvent: e => onLinkPress(e.link, e),
    }
  }
  function client(props, children) {
    const { module, key, props: data, width, height, flexGrow } = props ?? {}
    if (typeof module !== 'string' || module === '') {
      throw new Error(
        'JSX element <Client> needs module, a string literal: the path of ' +
          'the surface module that draws it, relative to this file ' +
          '("./board.tsx")',
      )
    }
    if (typeof key !== 'string' || key === '') {
      throw new Error(
        'JSX element <Client module="' + module + '"> needs a key: its ' +
          'address, what e.element carries at ui.message',
      )
    }
    if (children.length > 0) {
      throw new Error(
        'JSX element <Client key="' + key + '"> is a leaf: it takes no ' +
          'children (the surface module draws its inside)',
      )
    }
    const clientProps = { key, module }
    if (data !== undefined) clientProps.props = data
    if (width !== undefined) clientProps.width = width
    if (height !== undefined) clientProps.height = height
    if (flexGrow !== undefined) clientProps.flexGrow = flexGrow
    return { type: 'Client', props: clientProps, client: { plugin: '' } }
  }
  function raster(props, children) {
    const { key, columns, rows, cells } = props ?? {}
    if (typeof key !== 'string' || key === '') {
      throw new Error(
        'JSX element <Raster> needs a key: its address, what $.ui.blit ' +
          'names to repaint it',
      )
    }
    if (!Number.isInteger(columns) || !Number.isInteger(rows)) {
      throw new Error(
        'JSX element <Raster key="' + key + '"> needs columns and rows, ' +
          'whole numbers of terminal cells',
      )
    }
    if (typeof cells !== 'string') {
      throw new Error(
        'JSX element <Raster key="' + key + '"> needs cells, the base64 ' +
          'of columns * rows 12-byte cells (RasterProps)',
      )
    }
    if (children.length > 0) {
      throw new Error(
        'JSX element <Raster key="' + key + '"> is a leaf: it takes no ' +
          'children',
      )
    }
    return {
      type: 'Raster',
      props: { key, columns, rows, cells },
      raster: { plugin: '' },
    }
  }
  function image(props, children) {
    const { source, columns, rows, alt, key } = props ?? {}
    if (typeof source !== 'object' || source === null) {
      throw new Error(
        'JSX element <Image> needs source: { png } or { rgba, width, ' +
          'height } of base64 bytes, or { file, format } or { shm, ' +
          'format, width, height } the terminal reads (ImageSource)',
      )
    }
    if (!Number.isInteger(columns) || !Number.isInteger(rows)) {
      throw new Error(
        'JSX element <Image> needs columns and rows, whole numbers of ' +
          'terminal cells',
      )
    }
    if (typeof alt !== 'string') {
      throw new Error(
        'JSX element <Image> needs alt, a string drawn where the picture ' +
          'cannot be',
      )
    }
    if (key !== undefined && (typeof key !== 'string' || key === '')) {
      throw new Error(
        'JSX element <Image> key is a non-empty string, its address for ' +
          '$.ui.blit, or absent',
      )
    }
    if (children.length > 0) {
      throw new Error('JSX element <Image> is a leaf: it takes no children')
    }
    const imageProps =
      key === undefined
        ? { source, columns, rows, alt }
        : { key, source, columns, rows, alt }
    return { type: 'Image', props: imageProps, image: { plugin: '' } }
  }
  function link(props, children) {
    const { href, label } = props ?? {}
    if (typeof href !== 'string') {
      throw new Error('JSX element <Link> needs href, a string (the URL)')
    }
    if (label !== undefined && typeof label !== 'string') {
      throw new Error('JSX element <Link> label is a string or absent')
    }
    const linkProps = label === undefined ? { href } : { href, label }
    return {
      type: 'Link',
      props: linkProps,
      ...(children.length > 0 && { children }),
    }
  }
  function h(type, props, ...rest) {
    const children = []
    flatten(rest, children)
    if (typeof type === 'function') return type({ ...(props ?? {}), children })
    if (type === 'Button') return button(props, children)
    if (type === 'Input') return input(props, children)
    if (type === 'Select') return select(props, children)
    if (type === 'Svg') return svg(props, children)
    if (type === 'Link') return link(props, children)
    if (type === 'Code') return code(props, children)
    if (type === 'Markdown') return markdown(props, children)
    if (type === 'Client') return client(props, children)
    if (type === 'Raster') return raster(props, children)
    if (type === 'Image') return image(props, children)
    const intrinsic = Object.hasOwn(INTRINSIC, type)
      ? INTRINSIC[type]
      : undefined
    if (intrinsic === undefined) {
      // The tag name is the plugin's own source text, thrown in its
      // environment: the host reports it as a hook error.
      throw new Error(
        'JSX element <' + type + '> is not an element: a render hook ' +
          'draws with the table $.ui.resolve(e) returns (Box, Text, ' +
          'Button, Input, Select, Link, Code, Markdown, Client, Raster, ' +
          'Image, Svg) and what next(e) returned',
      )
    }
    const takesHover = intrinsic === 'Box' || intrinsic === 'Text'
    const hover = takesHover ? hoverOf(intrinsic, props) : undefined
    const cleaned = {}
    for (const [name, value] of Object.entries(props ?? {})) {
      if (
        name === 'ref' || name === 'children' ||
        (takesHover && name === 'hover') ||
        value === null || value === undefined
      ) {
        continue
      }
      if (name === 'key') {
        // A Box keeps its key, its hover scope's name; React's habit of a
        // number in a list is kept as its string. Elsewhere it is dropped.
        const isKept =
          intrinsic === 'Box' &&
          (typeof value === 'string' || typeof value === 'number')
        if (isKept) cleaned.key = String(value)
        continue
      }
      cleaned[name] = value
    }
    return {
      type: intrinsic,
      ...(Object.keys(cleaned).length > 0 && { props: cleaned }),
      ...(hover !== undefined && { hover }),
      ...(children.length > 0 && { children }),
    }
  }
  return { h, Fragment }
})()`;
var xu=String.raw`(helpers => {
  const define = (name, value) =>
    Object.defineProperty(globalThis, name, {
      value, writable: true, configurable: true, enumerable: false,
    })
  const isObject = value => value !== null && typeof value === 'object'
  // A frame line naming a file that is not the plugin's own: ours, or the
  // thread's; from the first of them down the stack is cut. The message's
  // own lines come first and are kept whatever they hold.
  const foreignFrame = line =>
    /^\s+at |@/.test(line) && /[\\/]/.test(line) &&
    !line.includes(helpers.root)
  const err = (message, name = 'TypeError') => {
    const e = new Error(message)
    e.name = name
    const lines = String(e.stack).split('\n')
    const header = String(message).split('\n').length
    const cut = lines.findIndex((line, i) => i >= header && foreignFrame(line))
    if (cut > 0) e.stack = lines.slice(0, cut).join('\n')
    return e
  }
  // An Error of the environment's under the name and message of what a
  // helper of the host's threw: a host Error never reaches the plugin.
  const fromHost = error => {
    const message = isObject(error) && 'message' in error
      ? error.message
      : error
    const name = isObject(error) && typeof error.name === 'string'
      ? error.name
      : 'OperationError'
    return err(String(message), name)
  }
  const guarded = fn => (...args) => {
    try {
      return fn(...args)
    } catch (error) {
      throw fromHost(error)
    }
  }

  // -- Bytes. What a plugin hands a web API is worked HERE, by internal slots
  // alone, and the host is handed a fresh Uint8Array the plugin never holds:
  // nothing of the plugin's for an API of the runtime's to refuse or look
  // into. The host never asks a view of the plugin's for its buffer: the
  // ArrayBuffer object is made for whoever asks first, and kept.
  // Every intrinsic is taken now: the global's bindings can be replaced.
  const apply = Reflect.apply
  const Octets = Uint8Array
  const isView = ArrayBuffer.isView
  const typed = Object.getPrototypeOf(Uint8Array.prototype)
  const getterOf = (holder, name) =>
    Object.getOwnPropertyDescriptor(holder, name).get
  const kindOf = getterOf(typed, Symbol.toStringTag)
  const bufferLength = getterOf(ArrayBuffer.prototype, 'byteLength')
  const TYPED_SLOTS = Object.freeze([
    getterOf(typed, 'buffer'),
    getterOf(typed, 'byteOffset'),
    getterOf(typed, 'byteLength'),
  ])
  const DATA_SLOTS = Object.freeze([
    getterOf(DataView.prototype, 'buffer'),
    getterOf(DataView.prototype, 'byteOffset'),
    getterOf(DataView.prototype, 'byteLength'),
  ])
  const setBytes = typed.set
  const sliceBytes = typed.slice
  const lengthOf = getterOf(typed, 'length')
  const includes = Array.prototype.includes
  const INTEGER_KINDS = Object.freeze([
    'Int8Array', 'Uint8Array', 'Uint8ClampedArray', 'Int16Array',
    'Uint16Array', 'Int32Array', 'Uint32Array', 'BigInt64Array',
    'BigUint64Array',
  ])
  const isBuffer = value => {
    try {
      apply(bufferLength, value, [])
      return true
    } catch {
      return false
    }
  }
  // A view of the environment's over the memory of a buffer or view. Detached,
  // or shrunk beneath its view, it is read as empty, as the runtime reads it.
  const over = (value, refusal) => {
    if (!isView(value) && !isBuffer(value)) throw err(refusal)
    const slots = apply(kindOf, value, []) === undefined
      ? DATA_SLOTS
      : TYPED_SLOTS
    try {
      return isView(value)
        ? new Octets(
            apply(slots[0], value, []),
            apply(slots[1], value, []),
            apply(slots[2], value, []),
          )
        : new Octets(value)
    } catch {
      return new Octets(0)
    }
  }
  // A primitive string, whatever the global String has been replaced by.
  const textOf = input => {
    const text = String(input)
    if (typeof text !== 'string') throw err('Expected a string')
    return text
  }
  // The view is made here, so its constructor and species are the frozen
  // intrinsic's.
  const copyOf = (value, refusal) =>
    apply(sliceBytes, over(value, refusal), [])

  // -- AbortSignal / AbortController
  const signalState = new WeakMap()
  class AbortSignal {
    constructor() { throw err('Illegal constructor') }
    get aborted() { return signalState.get(this).aborted }
    get reason() { return signalState.get(this).reason }
    throwIfAborted() {
      const s = signalState.get(this)
      if (s.aborted) throw s.reason
    }
    addEventListener(type, listener, options) {
      if (type !== 'abort' || typeof listener !== 'function') return
      const s = signalState.get(this)
      const once = isObject(options) && options.once === true
      const signal = isObject(options) ? options.signal : undefined
      s.listeners.set(listener, { once })
      if (isObject(signal) && typeof signal.addEventListener === 'function') {
        signal.addEventListener(
          'abort',
          () => s.listeners.delete(listener),
          { once: true },
        )
      }
    }
    removeEventListener(type, listener) {
      if (type === 'abort') signalState.get(this).listeners.delete(listener)
    }
    static abort(reason) {
      const made = makeSignal()
      made.abort(reason)
      return made.signal
    }
    static any(signals) {
      const made = makeSignal()
      for (const one of signals) {
        if (one.aborted) { made.abort(one.reason); break }
        one.addEventListener('abort', () => made.abort(one.reason), {
          once: true,
        })
      }
      return made.signal
    }
    get [Symbol.toStringTag]() { return 'AbortSignal' }
  }
  function makeSignal() {
    const signal = Object.create(AbortSignal.prototype)
    const state = {
      aborted: false, reason: undefined, listeners: new Map(), onabort: null,
    }
    signalState.set(signal, state)
    Object.defineProperty(signal, 'onabort', {
      get: () => state.onabort,
      set: v => { state.onabort = typeof v === 'function' ? v : null },
      enumerable: true,
      configurable: true,
    })
    const abort = reason => {
      if (state.aborted) return
      state.aborted = true
      state.reason = reason === undefined
        ? err('This operation was aborted', 'AbortError')
        : reason
      const event = Object.freeze({
        type: 'abort', target: signal, currentTarget: signal,
      })
      const listeners = [...state.listeners.entries()]
      for (const [listener, { once }] of listeners) {
        if (once) state.listeners.delete(listener)
        try { listener.call(signal, event) } catch {}
      }
      if (typeof state.onabort === 'function') {
        try { state.onabort.call(signal, event) } catch {}
      }
    }
    return { signal, abort }
  }
  class AbortController {
    #made = makeSignal()
    get signal() { return this.#made.signal }
    abort(reason) { this.#made.abort(reason) }
    get [Symbol.toStringTag]() { return 'AbortController' }
  }
  define('AbortSignal', AbortSignal)
  define('AbortController', AbortController)

  // -- TextEncoder / TextDecoder (UTF-8; the host encodes into a buffer of
  // the environment's)
  const UTF8_TWO_BYTES = 0x80
  const UTF8_THREE_BYTES = 0x800
  const UTF8_FOUR_BYTES = 0x10000
  const utf8Length = codePoint =>
    codePoint < UTF8_TWO_BYTES ? 1
      : codePoint < UTF8_THREE_BYTES ? 2
      : codePoint < UTF8_FOUR_BYTES ? 3
      : 4
  class TextEncoder {
    get encoding() { return 'utf-8' }
    encode(input = '') {
      const text = textOf(input)
      const bytes = new Octets(guarded(helpers.byteLength)(text))
      // Asked here first, so the ArrayBuffer it keeps is the environment's.
      apply(TYPED_SLOTS[0], bytes, [])
      guarded(helpers.encodeInto)(text, bytes)
      return bytes
    }
    encodeInto(input, into) {
      if (apply(kindOf, into, []) !== 'Uint8Array') {
        throw err('Expected Uint8Array')
      }
      // Converted first: from here to the set nothing of the plugin's runs.
      const text = textOf(input)
      const room = over(into)
      const space = apply(lengthOf, room, [])
      let read = 0
      let written = 0
      for (const char of text) {
        const next = written + utf8Length(char.codePointAt(0))
        if (next > space) break
        read += char.length
        written = next
      }
      const fits = new Octets(written)
      guarded(helpers.encodeInto)(text.slice(0, read), fits)
      apply(setBytes, room, [fits])
      return { read, written }
    }
  }
  const UTF8_LABELS = ['utf-8', 'utf8', 'unicode-1-1-utf-8']
  class TextDecoder {
    #fatal
    constructor(label = 'utf-8', options = {}) {
      if (!UTF8_LABELS.includes(String(label).toLowerCase())) {
        throw err(
          'The encoding label provided (' + label + ') is invalid; ' +
            'this environment decodes UTF-8',
          'RangeError',
        )
      }
      this.#fatal = isObject(options) && options.fatal === true
    }
    get encoding() { return 'utf-8' }
    get fatal() { return this.#fatal }
    decode(input) {
      if (input === undefined) return ''
      return guarded(helpers.decodeUtf8)(
        copyOf(
          input,
          'TextDecoder.decode expects an ArrayBuffer or TypedArray',
        ),
        this.#fatal,
      )
    }
  }
  define('TextEncoder', TextEncoder)
  define('TextDecoder', TextDecoder)

  // -- URLSearchParams / URL (parsing by the host's URL; the objects are the
  // environment's)
  const decode = text => {
    try { return decodeURIComponent(text.replace(/\+/g, ' ')) }
    catch { return text }
  }
  const encode = text =>
    encodeURIComponent(text)
      .replace(/%20/g, '+')
      .replace(
        /[!'()~]/g,
        c => '%' + c.charCodeAt(0).toString(16).toUpperCase(),
      )
  const paramsState = new WeakMap()
  const pairOf = pair => {
    const at = pair.indexOf('=')
    return at === -1
      ? [decode(pair), '']
      : [decode(pair.slice(0, at)), decode(pair.slice(at + 1))]
  }
  const listOf = text => {
    const body = text.startsWith('?') ? text.slice(1) : text
    return body.split('&').filter(pair => pair !== '').map(pairOf)
  }
  class URLSearchParams {
    constructor(init = '') {
      let list = []
      if (typeof init === 'string') {
        list = listOf(init)
      } else if (isObject(init)) {
        if (typeof init[Symbol.iterator] === 'function') {
          for (const [k, v] of init) list.push([String(k), String(v)])
        } else {
          for (const key of Object.keys(init)) {
            list.push([key, String(init[key])])
          }
        }
      }
      paramsState.set(this, { list, onChange: null })
    }
    #changed() {
      const s = paramsState.get(this)
      if (s.onChange !== null) s.onChange(this.toString())
    }
    #matches(name, value) {
      return ([k, v]) =>
        k === String(name) && (value === undefined || v === String(value))
    }
    append(name, value) {
      paramsState.get(this).list.push([String(name), String(value)])
      this.#changed()
    }
    delete(name, value) {
      const s = paramsState.get(this)
      const matches = this.#matches(name, value)
      s.list = s.list.filter(pair => !matches(pair))
      this.#changed()
    }
    get(name) {
      const found = paramsState.get(this).list.find(([k]) => k === String(name))
      return found === undefined ? null : found[1]
    }
    getAll(name) {
      return paramsState.get(this).list
        .filter(([k]) => k === String(name))
        .map(([, v]) => v)
    }
    has(name, value) {
      return paramsState.get(this).list.some(this.#matches(name, value))
    }
    set(name, value) {
      const s = paramsState.get(this)
      const key = String(name)
      const at = s.list.findIndex(([k]) => k === key)
      s.list = s.list.filter(([k], i) => k !== key || i === at)
      if (at === -1) s.list.push([key, String(value)])
      else s.list[at] = [key, String(value)]
      this.#changed()
    }
    sort() {
      const s = paramsState.get(this)
      s.list.sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
      this.#changed()
    }
    forEach(fn, self) {
      for (const [k, v] of paramsState.get(this).list) fn.call(self, v, k, this)
    }
    entries() {
      const pairs = paramsState.get(this).list.map(([k, v]) => [k, v])
      return pairs[Symbol.iterator]()
    }
    keys() {
      return paramsState.get(this).list.map(([k]) => k)[Symbol.iterator]()
    }
    values() {
      return paramsState.get(this).list.map(([, v]) => v)[Symbol.iterator]()
    }
    [Symbol.iterator]() { return this.entries() }
    get size() { return paramsState.get(this).list.length }
    toString() {
      return paramsState.get(this).list
        .map(([k, v]) => encode(k) + '=' + encode(v))
        .join('&')
    }
    get [Symbol.toStringTag]() { return 'URLSearchParams' }
  }
  const urlState = new WeakMap()
  const PARTS = [
    'href', 'origin', 'protocol', 'username', 'password', 'host', 'hostname',
    'port', 'pathname', 'search', 'hash',
  ]
  const parse = (input, base) => {
    const json = guarded(helpers.parseUrl)(
      String(input),
      base === undefined ? undefined : String(base),
    )
    if (json === null) throw err('Invalid URL: ' + String(input))
    return JSON.parse(json)
  }
  const setPart = (url, part, value) => {
    const s = urlState.get(url)
    const json = guarded(helpers.setUrlPart)(s.parts.href, part, String(value))
    if (json === null) return false
    s.parts = JSON.parse(json)
    return true
  }
  const paramsFor = (url, search) => {
    const params = new URLSearchParams(search)
    paramsState.get(params).onChange = text => { setPart(url, 'search', text) }
    return params
  }
  class URL {
    constructor(input, base) {
      const parts = parse(input, base)
      urlState.set(this, { parts, params: paramsFor(this, parts.search) })
    }
    static canParse(input, base) {
      try { parse(input, base); return true } catch { return false }
    }
    static parse(input, base) {
      try { return new URL(input, base) } catch { return null }
    }
    get searchParams() { return urlState.get(this).params }
    toString() { return urlState.get(this).parts.href }
    toJSON() { return urlState.get(this).parts.href }
    get [Symbol.toStringTag]() { return 'URL' }
  }
  for (const part of PARTS) {
    Object.defineProperty(URL.prototype, part, {
      get() { return urlState.get(this).parts[part] },
      set(value) {
        if (part === 'origin' || !setPart(this, part, value)) return
        const s = urlState.get(this)
        paramsState.get(s.params).list = listOf(s.parts.search)
      },
      enumerable: true,
      configurable: true,
    })
  }
  define('URL', URL)
  define('URLSearchParams', URLSearchParams)

  // -- atob / btoa
  define('atob', text => guarded(helpers.atob)(String(text)))
  define('btoa', text => guarded(helpers.btoa)(String(text)))

  // -- structuredClone (the environment's own walk: plain data, Date, RegExp,
  // Map, Set, buffers)
  const uncloneable = () =>
    err('The object can not be cloned.', 'DataCloneError')
  const cloneInto = (value, seen) => {
    if (typeof value !== 'object' || value === null) {
      if (typeof value === 'function' || typeof value === 'symbol') {
        throw uncloneable()
      }
      return value
    }
    if (seen.has(value)) return seen.get(value)
    if (Array.isArray(value)) {
      const out = []
      seen.set(value, out)
      for (const item of value) out.push(cloneInto(item, seen))
      return out
    }
    if (value instanceof Date) return new Date(value.getTime())
    if (value instanceof RegExp) return new RegExp(value.source, value.flags)
    if (value instanceof Map) {
      const out = new Map()
      seen.set(value, out)
      for (const [k, v] of value) {
        out.set(cloneInto(k, seen), cloneInto(v, seen))
      }
      return out
    }
    if (value instanceof Set) {
      const out = new Set()
      seen.set(value, out)
      for (const v of value) out.add(cloneInto(v, seen))
      return out
    }
    if (value instanceof ArrayBuffer) return value.slice(0)
    if (value instanceof DataView) {
      const end = value.byteOffset + value.byteLength
      return new DataView(value.buffer.slice(value.byteOffset, end))
    }
    if (ArrayBuffer.isView(value)) return new value.constructor(value)
    if (value instanceof Error) return err(value.message, value.name)
    const proto = Object.getPrototypeOf(value)
    if (
      proto !== null &&
      proto !== Object.prototype &&
      Object.getPrototypeOf(proto) !== null
    ) {
      throw uncloneable()
    }
    const out = {}
    seen.set(value, out)
    for (const key of Object.keys(value)) out[key] = cloneInto(value[key], seen)
    return out
  }
  define('structuredClone', value => cloneInto(value, new Map()))

  // -- crypto, performance
  const algorithmName = algorithm =>
    typeof algorithm === 'string'
      ? algorithm
      : isObject(algorithm) ? String(algorithm.name) : String(algorithm)
  // Taken now, before any plugin runs: the global's binding is the plugin's
  // to replace, and the host writes into what this makes.
  const DigestBuffer = ArrayBuffer
  const subtle = Object.freeze({
    __proto__: null,
    // An async function of the environment's: the promise is the
    // environment's own, and the host's rejection (an unknown algorithm) an
    // Error of the environment's. The buffer is kept here: the host's
    // promise carries nothing.
    digest: async (algorithm, data) => {
      const name = algorithmName(algorithm)
      const bytes = copyOf(
        data,
        'The "data" argument must be of type ArrayBuffer, Buffer, ' +
          'TypedArray, or DataView',
      )
      let made
      try {
        await helpers.digestInto(name, bytes, n => (made = new DigestBuffer(n)))
      } catch (error) {
        throw fromHost(error)
      }
      return made
    },
  })
  define('crypto', Object.freeze({
    __proto__: null,
    subtle,
    randomUUID: () => guarded(helpers.randomUUID)(),
    getRandomValues: array => {
      if (!apply(includes, INTEGER_KINDS, [apply(kindOf, array, [])])) {
        throw err(
          'The data argument must be an integer-type TypedArray',
          'TypeMismatchError',
        )
      }
      const into = over(array)
      const fresh = new Octets(apply(lengthOf, into, []))
      guarded(helpers.fillRandom)(fresh)
      apply(setBytes, into, [fresh])
      return array
    },
  }))
  define('performance', Object.freeze({
    __proto__: null,
    now: () => guarded(helpers.now)(),
  }))

  // -- JSX (render-jsx/): the classic runtime's h and Fragment, the two
  // names the pragma compiles JSX against; the elements themselves come
  // from $.ui.resolve(e), never from a global
  const jsx = ${V7n}
  define('h', jsx.h)
  define('Fragment', jsx.Fragment)

  return Object.freeze({
    __proto__: null,
    makeSignal,
    makeError: (name, message) => err(message, name),
    relaySignal: (signal, abort) => {
      const relay = () => {
        const reason = signal.reason
        if (reason instanceof Error) abort(reason.name, reason.message)
        else if (reason === undefined) {
          abort('AbortError', 'This operation was aborted')
        } else abort('AbortError', String(reason))
      }
      if (signal.aborted) relay()
      else signal.addEventListener('abort', relay, { once: true })
      return () => signal.removeEventListener('abort', relay)
    },
  })
})`;
var VC=(e)=>`'use strict';${e}`;
var mo=fo.runInContext(VC(V7n),fo.createContext({}));
var nzo=mo.Fragment;
var rzo=mo.h;
function jr(e,t){let{children:o,...r}=t??{},n=o===void 0?[]:Array.isArray(o)?o:[o];return wi(rzo(e,r,...n))};
var Pu=(e)=>HSn.mark((t)=>RPe(jr(e,t)),e);
var zG={terminal:["Box","Text","Button","Input","Select","Link","Code","Markdown","Client","Raster","Image"],desktop:["Box","Text","Button","Input","Select","Svg","Link","Code","Markdown","Client"],mobile:["Box","Text","Button","Svg","Link","Code","Markdown"],vscode:["Box","Text","Button","Input","Select","Svg","Link","Code","Markdown"]};
var Qe=L(Object.values(zG).flat());
var Ei=(e)=>RPe(jr(nzo,e));
function ozo(e,t,o){let r={};for(let[n,s]of Object.entries(e))if(typeof s==="function")r[n]=t(s);for(let n of Qe)if(!r[n])o(n),r[n]=t(Ei);return r};
function szo(e){let t=Object.create(null);for(let o of zG[e])t[o]=Pu(o);return Object.freeze(t)};
function Mu(e){if(!N(e))return"something that is not a table of elements";for(let[t,o]of Object.entries(e))if(typeof o!=="function")return`an entry "${t}" that is not a constructor`;return};
var ju=(e)=>typeof e==="string"&&Qe.includes(e);
var APe=(e)=>typeof e==="string"&&Object.hasOwn(zG,e);
var me=Object.freeze(Object.keys(zG));
function bi(e){if(!(N(e)&&APe(e.surface)))return"takes a ui.render argument (e.surface names the surface)";let o=String(e.component);return Object.hasOwn(tpe,o)?void 0:`takes a ui.render argument (e.component "${o}" is not a component the engine draws)`};
var Si=(e)=>`${e.surface}:${e.component}`;
function izo(e){let t=new Set;return(o)=>{let r=o===void 0?Qe:zG[o];return(n)=>{if(!r.includes(n)||t.has(n))return;t.add(n),nd().log(`${e}: $.ui.resolve: <${n}> was withheld by a ui.resolve hook; it draws a fragment`,"warn")}}};
function Ke(e,t){if(e.plugin!==t.plugin)return"a plugin other than the one that drew the element";if(typeof e.element!=="string")return"no { element }";if(typeof e.component!=="string")return"no { component }";if(e.requestId!==t.requestId)return"a requestId other than the instance the element was drawn in";if(!APe(e.surface))return"no { surface } naming a surface";let{link:i}=e;if(t.link===void 0)return i!==void 0?"a { link } on a press that had none":void 0;return N(i)&&typeof i.href==="string"?void 0:"no { link: { href } } on a press that had one"};
function Fr(e,t){let o=Ke(e,t);if(o!==void 0)return o;if(e.kind!==t.kind)return`a kind other than the ${t.kind} it was given`;return typeof e.value==="string"?void 0:"no { value } string"};
function vt(e){if(Array.isArray(e))return"an array";if(e===null)return"null";if(e===void 0)return"missing";return typeof e==="object"?"an object":`a ${typeof e}`};
function*Oi(e){if(Array.isArray(e)){let t=B(e);for(let o=0;o<t;o+=1)yield[1,e[o]];return}for(let[t,o]of Object.entries(e))yield[t.length+4,o]};
var MSn=LQ;
var cJn=TPe;
var dJn=kPe;
var uo=()=>({nodes:0,chars:0,path:new Set,done:new Map});
function Ai(e){if(e.nodes>dJn)return`holds more than ${dJn} values`;return e.chars>MSn?`serializes to more than ${MSn} characters`:void 0};
function Dr(e){switch(typeof e){case"boolean":return 5;case"string":return e.length+2;case"number":return String(e).length;default:return e===null?5:void 0}};
function Rt(e,t,o){if(t>cJn)return`nests deeper than ${cJn}`;let r=typeof e==="object"?o.done.get(e):void 0;o.nodes+=r?.nodes??1,o.chars+=r?.chars??Dr(e)??2;let n=Ai(o);if(n!==void 0||r!==void 0)return n;if(typeof e==="number"&&!Number.isFinite(e))return`holds ${String(e)}`;if(Dr(e)!==void 0)return;if(e===void 0)return"holds undefined (an array hole, a missing value)";if(typeof e!=="object"||e===null)return`holds ${fj(e)}`;if(o.path.has(e))return"holds a cycle";let s=Object.getPrototypeOf(e);if(!(Array.isArray(e)||s===null||Object.getPrototypeOf(s)===null))return"holds an object that is not plain (a class instance)";let p={nodes:o.nodes-1,chars:o.chars-2};o.path.add(e);for(let[a,f]of Oi(e)){o.chars+=a;let m=Rt(f,t+1,o);if(m!==void 0)return m}o.path.delete(e),o.done.set(e,{nodes:o.nodes-p.nodes,chars:o.chars-p.chars});return};
var Hjt=(e)=>Rt(e,0,uo());
function Br(e,t){for(let r of["surface","component","requestId","element","module"])if(e[r]!==t[r])return`{ ${r} } rewritten; only data may change`;if(!("data"in e)||e.data===void 0)return"no { data }";let o=Hjt(e.data);return o===void 0?void 0:`data ${o}`};
function Kr(e){if(!("props"in e)||e.props===void 0)return;let t=Hjt(e.props);return t===void 0?void 0:`props ${t}`};
function Wr(e,t){let o=Object.hasOwn(t.props,"onScreen")?t.props.onScreen:void 0;return Djt.has(t.component)&&Un(e.onScreen)!==Un(o)?"a props.onScreen other than the surface reported (the surface says what its viewport shows; a rewrite changes the drawing alone)":void 0};
function Vr(e,t){return t.component==="CommandOutput"&&e.command!==t.props.command?"a props.command other than the engine drew (the name is the command that printed the row; a rewrite changes the row alone)":void 0};
function Gr(e,t){return t.component==="Pane"&&e.placement!==t.props.placement?"a props.placement other than the surface drew (the surface places the pane; a rewrite changes the drawing alone)":void 0};
function Xr(e,t){return t.component==="ToolProgress"&&e.kind!==t.props.kind?"a props.kind other than the engine drew (the kind names the row; a rewrite changes its text alone)":void 0};
var zr=["origin","isExpanded","task","from"];
function Yr(e,t){if(t.component!=="UserMessage")return;let o=zr.find((r)=>Un(e[r])!==Un(t.props[r]));if(o===void 0)return;return`a props.${o} other than the engine drew (the row names its message's origin, sender and task and how the view draws it; a rewrite changes the text alone)`};
function Jr(e,t){return(t.component==="Pane"||t.component==="AbovePrompt")&&Un(e.view)!==Un(t.props.view)?"a props.view other than the surface drew (the person chooses the transcript in view; a rewrite changes the drawing alone)":void 0};
var Ct=(e)=>Be(e).reduce((t,o)=>t+o.length,0);
function qr(e,t){let o=t.props,r=Object.keys(e).find((n)=>e[n]!==o[n]&&Un(e[n])!==Un(o[n])&&Ct(e[n])>LQ&&Ct(e[n])>Ct(o[n]));if(r===void 0)return;return`a props.${r} of more than ${LQ} characters of text, more than the engine drew`};
function Qr(e,t){return(t.component==="ToolUse"||t.component==="ToolResult"||t.component==="ToolProgress")&&e.tool_use_id!==t.props.tool_use_id?"a props.tool_use_id other than the engine drew (the id names the call; a rewrite changes the row alone)":void 0};
function Zr(e,t){let o=e.props;if(!N(o))return"no { props } (an object)";let r=Pr[t.component]??{};for(let[n,s]of Object.entries(r)){let i=vt(o[n]);if(s!==Ue&&!s.includes(i))return`a props.${n} that is ${i}, not ${s.join(" or ")}`}for(let[n,s]of Object.entries(t.props)){if(s===void 0||Object.hasOwn(r,n))continue;let i=vt(s),p=vt(o[n]);if(p!==i)return`a props.${n} that is ${p}, not ${i}`}return Cr(o,t)??qr(o,t)??Yr(o,t)??Qr(o,t)??Xr(o,t)??Nr(o,t)??Vr(o,t)??Gr(o,t)??Jr(o,t)??Wr(o,t)};
var We={AskUserQuestion:me,UserMessage:me,AssistantMessage:me,ToolUse:me,ToolResult:me,ToolGroup:me,ToolProgress:["terminal"],CommandOutput:me,Spinner:["terminal","desktop"],TurnDuration:["terminal"],InfoNotice:["terminal"],SessionMode:["terminal","desktop"],PromptHint:["terminal","desktop"],AbovePrompt:["terminal","desktop"],Pane:me};
function en(e){let t=We[e],o=me.every((n)=>t.includes(n)),r=t.length===1;return o?"every surface":r?`the ${t[0]} surface only`:`the ${t.slice(0,-1).join(", ")} and ${t.at(-1)} surfaces only`};
var tn=(e,t)=>Ir(e,t)??Zr(e,t);
var Ze=Object.freeze(Object.keys(We));
function lo(e,t){if(!xPe(e)||!Object.hasOwn(e,t))return;let o=e[t];if(typeof o==="string")return[o];return Array.isArray(o)&&o.length>0&&o.every((n)=>typeof n==="string")?o:void 0};
var on=(e)=>Ze.flatMap((t)=>We[t].filter((o)=>FQ(e,"component",t)&&FQ(e,"surface",o)).map((o)=>({component:t,surface:o})));
var yo=(e,t,o)=>L(e).filter((r)=>!t.includes(r)).map((r)=>{let[n]=Lwe(r,t,1),s=n===void 0?"":` (did you mean ${n}?)`;return`no ${o} is named ${r}${s}`});
function uJn(e){let t=Array.isArray(e)?e:[e],o=t.flatMap((m)=>lo(m,"component")??[]),r=t.flatMap((m)=>lo(m,"surface")??[]),n=Ze.filter((m)=>o.includes(m)),s=me.filter((m)=>r.includes(m)),i=t.every((m)=>on(m).length===0),p=i&&n.length>0&&s.length>0,a=[...yo(o,Ze,"component"),...yo(r,me,"surface"),...p?[n.map((m)=>`${m} is raised on ${en(m)}`).join(", ")+`; this hook names ${s.join(", ")}`]:[]];return a.length>0?`${a.join("; ")}${i?", so it never runs":""}`:void 0};
function rn(e,t){let o=Object.keys(e).filter((n)=>n!=="surface"&&n!=="component");return t||o.length===0?void 0:`resolved ahead of time, once per surface and component; a matcher here takes surface and component only, not ${o.join(", ")}`};
function nn(e,t){let o=Ke(e,t);if(o!==void 0)return o;return typeof e.value==="string"?void 0:"no { value } string"};
var vi=At("ui.input",Fr);
var Ri={event:"ui.message",checkArgument:Br,check:C(Kr)};
var Ci={event:"ui.press",checkArgument:Ke,check:C((e)=>typeof e.element==="string"?void 0:"no { element }")};
var Pi={event:"ui.render",restoreArgument:(e)=>f7e(e),checkArgument:tn,checkMatcher:(e)=>Object.hasOwn(e,"component")&&_yt(e.component,po)?`${po} is drawn by the engine alone; its answer authorises an action. A plugin adds context with $.ui.notice`:void 0,check:(e)=>N(e)&&typeof e.type==="string"?void 0:"something that is not a tree element"};
var _i={event:"ui.resolve",checkArgument:bi,checkMatcher:rn,check:Mu};
var Ii=At("ui.select",nn);
var go=["component","requestId","by","bodyRows","contentRows","origin","pointer"];
var Hi={event:"ui.scroll",restoreArgument:(e,t)=>z0(go,e,t),checkArgument:(e,t)=>{let o=fe(go,e,t),r=HM(e.offset);return o??(r?void 0:"an offset that is not a whole row number (0 or more)")},check:C(Vo)};
function sn(e){if(!N(e))return"is not an object";let{role:t,text:o,toolUses:r,toolResults:n,handle:s}=e;if(!(t==="user"||t==="assistant"))return"has a role that is neither user nor assistant";if(typeof o!=="string")return"has no text (a string)";if(!(s===void 0||typeof s==="string"))return"has a handle that is not a string";if(!(Array.isArray(r)&&Re(r,(m)=>N(m)&&typeof m.tool_use_id==="string"&&typeof m.tool==="string"&&N(m.input))))return"has toolUses that are not a list of { tool_use_id, tool, input }";return n===void 0||Array.isArray(n)&&Re(n,(m)=>N(m)&&typeof m.tool_use_id==="string"&&typeof m.text==="string")?void 0:"has toolResults that are not a list of { tool_use_id, text, isError }"};
function xo(e){if(!Array.isArray(e))return"messages that are not a list";let t=B(e);if(t===0)return"an empty messages (a compaction leaves at least one)";let o=gt(e,sn,t);return o&&`messages[${o[0]}] that ${o[1]}`};
var ho=(e)=>e===void 0||typeof e==="number"&&e>=0;
var an=(e)=>e===void 0||N(e)&&[e.input_tokens,e.output_tokens,e.cache_read_input_tokens,e.cache_creation_input_tokens].every((t)=>typeof t==="number"&&t>=0);
function pn(e,t){if(!(t.door==="note"&&t.origin.kind==="plugin"))return"a deny of a row the engine appends (only a plugin's own append is refused)";return typeof e==="string"&&e.trim()!==""?void 0:"a deny with no reason"};
function Pt(e){let t=N(e);return t&&Array.isArray(e.content)?void 0:t?"a message whose content is not an array of blocks":"a message that is not an object"};
var _t=["type","name","role","isMeta"];
function fn(e,t){let o=N(e)?e:{},r=N(t)?t:{},n=_t.find((s)=>Object.hasOwn(o,s)&&o[s]!==r[s]);return n===void 0?void 0:`a changed message.${n}`};
function mn(e,t){let o=z0(["agentId"],e,t),{message:r}=o,{message:n}=t;return N(r)&&N(n)?{...o,message:z0(_t,r,n)}:o};
function ji(e,t,o){if(o.some((s)=>s.deny===void 0))return"a deny after next stored the row (refuse in place of next)";return o.some((s)=>s.deny===e)?void 0:pn(e,t)};
function Li(e,t,o){let r=o.findLast((i)=>i.deny===void 0);if(e.deny!==void 0)return ji(e.deny,t,o);if(o.length===0)return"an answer without next (the row is kept; next(e) keeps it)";if(r===void 0)return"a row after next refused it (nothing was stored)";if(e.uuid!==t.uuid)return"a uuid other than the row it answers for";return Un(e.message)===Un(r.message)?Pt(e.message):"a row other than what next answered (the answer is the row as stored)"};
var Fi={event:"session.append",pinnedKeys:["door","origin","agentId","uuid"],restoreArgument:mn,checkArgument:(e,t)=>fe(["door","origin","agentId","uuid"],e,t)??Pt(e.message)??fn(e.message,t.message),check:C((e,t,o)=>Li(e,t,o??[]))};
var $i={event:"session.attach",restoreArgument:(e,t)=>z0(["viewport"],e,t),checkArgument:(e,t)=>fe(["surface","clientId","viewport"],e,t),check:C(fr)};
var Di={event:"session.compact",restoreArgument:(e,t)=>z0(["trigger","agentId"],e,t),checkArgument:(e,t)=>{if(e.trigger!==t.trigger)return"a changed trigger (the compaction is what it is; next(e) passes it on)";if(e.agentId!==t.agentId)return"a changed agentId (the loop compacting is pinned)";let{instructions:n}=e;return n===void 0||typeof n==="string"?xo(e.messages):"instructions that are not a string"},check:C((e,t,o)=>{let{skip:r,messages:n,tokensBefore:s,tokensAfter:i,usage:p}=e;if(r!==void 0){if(!(typeof r==="string"&&r!==""))return"a skip that is not a reason (a non-empty string)";if(n!==void 0)return"a skip beside messages";return t.trigger!=="precompute"&&(o??[]).some((c)=>c.messages!==void 0)?"a skip after next() compacted (the compaction happened beneath it; veto before calling next, or hand its result up)":void 0}if(n===void 0)return"neither { messages } nor { skip }";if(!(ho(s)&&ho(i)))return"token counts that are not numbers";return an(p)?xo(n):"a usage that is not the four token counts"})};
var Ui={event:"session.detach",checkArgument:(e,t)=>fe(["surface","clientId","reason"],e,t),check:C(fr)};
var Bi=zo("session.end",["reason","sessionId","resume"],Ns);
var Ki=zo("session.measure",["context","rateLimits","cost","changed"],Is);
var Wi={event:"session.receive",restoreArgument:(e,t)=>z0(["agentId"],e,t),checkArgument:(e,t)=>{if(Un(e.origin)!==Un(t.origin))return"a changed origin (the bridge set it; next(e) passes it on)";if(Un(e.event)!==Un(t.event))return"a changed event (parsed from the delivery; next(e) passes it on)";if(e.agentId!==t.agentId)return"a changed agentId (the loop the delivery is for; next(e) passes it on)";return typeof e.text==="string"?void 0:"no { text } (a string)"},check:C((e)=>{let{consumed:t,text:o}=e;if(t===void 0)return typeof o==="string"?void 0:"neither { text } nor { consumed }";return typeof t==="string"?void 0:"a consumed that is not a string"})};
var Vi={event:"session.send",restoreArgument:(e,t)=>z0(["agentId"],e,t),checkArgument:(e,t)=>{if(Un(e.origin)!==Un(t.origin))return"a changed origin (the engine set it; next(e) passes it on)";if(e.agentId!==t.agentId)return"a changed agentId (the loop sending; next(e) passes it on)";if(!(typeof e.to==="string"&&e.to.trim()!==""))return"no { to } (a non-empty string)";return typeof e.text==="string"&&e.text.trim()!==""?void 0:"no { text } (a non-empty string)"},check:C((e)=>{let{isDelivered:t,reason:o}=e;if(t===!0)return;if(t!==!1)return"no { isDelivered } (true or false)";return typeof o==="string"&&o!==""?void 0:"isDelivered false without a reason (a non-empty string)"})};
function It(e,t){return e.plugin!==t.plugin||e.key!==t.key||e.id!==t.id?"a changed reference (plugin, key and id say which value; next(e) passes them on)":void 0};
function cn(e,t){let o=e.ifVersion!==t.ifVersion,r=Un(e.previous)!==Un(t.previous);return It(e,t)??(o?"a changed ifVersion (the condition is the caller's)":void 0)??(r?"a changed previous (the host stamps it)":void 0)};
var Xi={event:"state.get",check:V("state.get").check,checkArgument:It};
var zi={event:"state.set",check:V("state.set").check,restoreArgument:Ce(["previous","ifVersion"]),checkArgument:cn};
var Ji={event:"telemetry.log",pinnedKeys:["to"],restoreArgument:Ce(["to"]),checkArgument:(e,t)=>e.to===t.to?void 0:"a changed to (pinned)",check:C((e)=>De(e,"{ value }",(t)=>Object.hasOwn(t,"value")))};
var qi={event:"telemetry.mark",check:C((e)=>De(e,"{ value }",(t)=>Object.hasOwn(t,"value")))};
var Zi={event:"agent.offer",restoreArgument:(e,t)=>z0(["provider"],e,t),checkArgument:(e,t)=>{if(typeof e.agent!=="string")return"no { agent }";if(e.agent!==t.agent)return"a changed agent (the hooks beneath match on it)";if(typeof e.description!=="string")return"no { description }";if(e.source!==t.source)return"a changed source (the hooks beneath match on it)";return Un(e.provider)===Un(t.provider)?void 0:"a changed provider (pinned: who provides the agent is a fact)"},check:C((e)=>typeof e.isOffered==="boolean"?void 0:"no { isOffered } (a boolean)")};
var Mjt=["tool_use_id","name","fork","parentModel","permissionMode","parentAgentId","provider"];
var un=["parentAgentId","provider"];
function ln(e,t){let{prompt:o,model:r,cwd:n}=e;return[["prompt",typeof o==="string"&&o.trim()!=="","no { prompt } (a non-empty string)"],["description",typeof e.description==="string","a description that is not a string"],["subagentType",typeof e.subagentType==="string","a subagentType that is not a string"],["model",r===void 0||typeof r==="string","a model that is neither a string nor undefined"],["background",typeof e.background==="boolean","a background that is not a boolean"],["cwd",n===void 0||typeof n==="string"&&Xl(n),"a cwd that is not an absolute path"]].find(([i,p])=>!p&&e[i]!==t[i])?.[2]};
var ea={event:"agent.spawn",restoreArgument:(e,t)=>z0(un,e,t),checkArgument(e,t){return St({keys:Mjt,passed:e,received:t,explanation:`the identity of the spawn and its parent is pinned; a rewrite keeps ${Mjt.join(", ")}`})??ln(e,t)},check:C((e)=>De(e,"{ model }",(t)=>typeof t.model==="string"))};
var dn=(e)=>Szo.some((t)=>t===e);
var Jl=["tool","tool_use_id","agentId"];
var Pe="$shadowed";
var yn=["tool","tool_use_id","agentId","consent",Pe];
var od=["agentId",Pe];
function Eoe(e){let{tool:t,tool_use_id:o,agentId:r,consent:n,[Pe]:s,...i}=e;return N(s)?{...i,...s}:i};
var Nt=(e,t)=>fe(yn,e,t);
var gn=(e)=>N(e)?di(e,(t,o)=>t===!1&&(o==="deny"||o==="ask"||o==="allow")):e;
var oa={event:"classic.PreToolUse",restoreArgument:(e,t)=>z0([Pe],e,t),checkArgument:Nt,settle:gn,check:C(({deny:e,ask:t,allow:o})=>{let r=typeof e==="string"||typeof t==="string";return!r&&(e!==void 0||t!==void 0)?"a deny or ask that is not a string":!r&&o!==void 0&&o!==!0?"an allow that is not true":void 0}),carry:(e,t,o)=>e.updatedInput===void 0&&typeof e.deny!=="string"&&cs(t,o)?{...e,updatedInput:Eoe(t)}:e};
function xn(e,t){let{isReadOnly:o,...r}=e;if(r.deny!==void 0||r.ref===void 0)return r;let n=t.findLast((p)=>p.ref===r.ref),s=Un(r.result);return n!==void 0&&n.isReadOnly===!0&&(r.result===void 0||r.result===n.result||s!==void 0&&s===Un(n.result))?{...r,isReadOnly:!0}:r};
function hn(e){let t={...e};return t.context===void 0?t:{...t,context:OM(t.context)??Go}};
function kn(e){let{decision:t,reason:o,rule:r}=e,n={decision:t};if(o!==void 0)n.reason=o;if(r!==void 0)n.rule=r;return n};
var ra={event:"tool.call",restoreArgument:(e,t)=>z0(od,e,t),checkArgument:Nt,pinnedKeys:Jl,settle:hn,stripResult:xn,check:C((e,t,o)=>{let r=e.deny===void 0;return De(e,"{ result }",(n)=>Object.hasOwn(n,"result"))??(r?Os(e.context,e.result,(o??[]).filter((n)=>n.deny===void 0)):void 0)}),measure:(e,t,o)=>wt(e.context,...o.map((r)=>r.context)),carry:cVr};
var wn=["tool","input","tool_use_id"];
var na={event:"tool.check",restoreArgument:(e,t)=>z0(["tool_use_id"],e,t),checkArgument:(e,t)=>St({keys:wn,passed:e,received:t,explanation:"the tool, its input and the call are the question and are pinned; a hook answers { decision }, it does not ask about another call"}),settle:kn,check:C((e)=>{let{decision:t,reason:o,rule:r}=e;if(!dn(t))return`no { decision } (one of ${Szo.join(", ")})`;return[o,r].every((s)=>s===void 0||typeof s==="string")?void 0:"a reason or rule that is not a string"})};
var sa={event:"tool.describe",restoreArgument:(e,t)=>z0(["provider"],e,t),checkArgument:(e,t)=>{if(typeof e.tool!=="string")return"no { tool }";if(e.tool!==t.tool)return"a changed tool (the engine caches the description by it)";if(Un(e.provider)!==Un(t.provider))return"a changed provider (pinned: who provides the tool is a fact)";if(!(e.isDeferred===void 0||typeof e.isDeferred==="boolean"))return"an isDeferred that is not a boolean";return typeof e.description==="string"?void 0:"no { description }"},measureArgument:(e,t)=>oe(e.description,t.description),restoreResult:(e,t,o)=>{if(e.isDeferred!==void 0)return e;let n=t.at(-1)?.isDeferred??o.isDeferred;return n===void 0?e:{...e,isDeferred:n}},check:C((e)=>{if(typeof e.description!=="string")return"no { description } (a string)";return e.isDeferred===void 0||typeof e.isDeferred==="boolean"?void 0:"an isDeferred that is not a boolean"}),measure:Je("description")};
var pJn=["end_turn","max_tokens","stop_sequence","tool_use","pause_turn","compaction","refusal","model_context_window_exceeded"];
var Tn=(e)=>N(e)&&[e.input_tokens,e.output_tokens,e.cache_read_input_tokens,e.cache_creation_input_tokens].every((t)=>Number.isFinite(t));
function En(e){let t=typeof e.index==="number"&&e.index>=0;switch(e.kind){case"text":case"thinking":return t&&typeof e.text==="string"?void 0:"{ index, text }";case"tool":return t&&typeof e.id==="string"&&/^[\w-]+$/.test(e.id)&&typeof e.name==="string"?void 0:"{ index, id, name } (an id of letters, digits, _ or -)";case"input":return t&&typeof e.json==="string"?void 0:"{ index, json } (json a string)";case"stop":{let o=e.stopReason===null||pJn.some((s)=>s===e.stopReason),r=e.usage===null||Tn(e.usage);return o&&r?void 0:"{ stopReason, usage } (usage null, or its four token counts)"}case"engine":return typeof e.ref==="number"?void 0:"ref (pass engine chunks on unchanged)";default:return"known kind (text, thinking, tool, input, stop, engine)"}};
function bn(e){if(!N(e))return`no kind (a chunk is an object; got ${e===null?"null":typeof e})`;let t=En(e);return t===void 0?void 0:`kind ${String(e.kind)} but no ${t}`};
function To(e){if(!N(e))return;let{ref:t,kind:o}=e;return typeof t==="number"&&typeof o==="string"?[t,o]:void 0};
function Sn(e){let t=N(e)&&e.kind==="tool"?e.id:void 0;return typeof t==="string"?t:void 0};
function On(){let e=new Map,t=new Set,o=new Set;function r(s){if(e.get(s)!=="engine")return"kind engine but a ref this link never pulled as an engine chunk (pass engine chunks on unchanged)";if(t.has(s))return"kind engine but a ref already passed on (pass each on once)";t.add(s);return}function n(s){if(o.has(s))return`kind tool but an id this step already used (${s})`;o.add(s);return}return{pulled:(s)=>{let i=To(s);if(i!==void 0)e.set(i[0],i[1])},yielded:(s,i)=>{let p=i?void 0:bn(s);if(p!==void 0)return p;let a=To(s);if(a?.[1]==="engine")return r(a[0]);let f=Sn(s);return f===void 0?void 0:n(f)}}};
var aa={...Gt({event:"turn.complete",check:({text:e},t)=>typeof e==="string"?nr(e,t.answer):"no { text }",checkArgument:(e,t)=>{let o=e.answer;if(typeof o!=="string")return"no { answer }";return e.agentId===t.agentId?nr(o,t.answer):"a changed agentId (the loop the turn ran in is pinned)"}}),restoreArgument:(e,t)=>z0(["agentId"],e,t)};
var pa={event:"turn.step",chunkChecker:On,restoreArgument:Ce(["agentId"]),checkArgument:(e,t)=>{let o=fe(["turnId","index","messageCount","agentId"],e,t);if(o!==void 0)return o;let{model:r,effort:n}=e;if(!(typeof r==="string"&&r.trim()!==""))return"no { model } (a non-empty model name)";let i=!1;return n===void 0||n===t.effort||typeof n==="number"&&i||nu.some((a)=>a===n)?void 0:`an effort that is not one of ${nu.join(", ")}`+(i?" or a number":" (a number is internal-only)")},check:C((e,t)=>{if(!(e.turnId===t.turnId&&e.index===t.index))return"a { turnId, index } other than the step it answers for";return typeof e.answer==="string"&&Array.isArray(e.toolUses)?void 0:"no { answer, toolUses }"})};
var eu={...Qt(USn,V),...Qt(Mts,nJn),"ui.open":zs,"ui.close":Xs,"ui.blit":hi,"env.get":Bs,"env.set":Ks,"state.get":Xi,"state.set":zi,"classic.PreToolUse":oa,"tool.call":ra,"tool.check":na,"agent.offer":Zi,"agent.spawn":ea,"prompt.submit":yi,"prompt.fill":Ps,"prompt.suggest":Zt("prompt.suggest","isShown"),"prompt.edit":ui,"prompt.section":li,"prompt.context":mi,"prompt.attachment":ri,"prompt.compose":Fs,"tool.describe":sa,"command.run":js,"command.describe":Ms,"config.set":Us,"config.describe":Ds,"telemetry.log":Ji,"telemetry.mark":qi,"skill.prompt":gi,"attribution.text":ti,"session.receive":Wi,"session.append":Fi,"session.send":Vi,"session.compact":Di,"session.attach":$i,"session.detach":Ui,"session.measure":Ki,"session.end":Bi,"plugin.register":qs,"process.spawn":Zs,"session.start":Gt({event:"session.start",check:mr,checkArgument:mr}),"turn.start":Gt({event:"turn.start",check:cr,checkArgument:cr}),"turn.step":pa,"turn.complete":aa,"ui.render":Pi,"ui.resolve":_i,"ui.press":Ci,"ui.input":vi,"ui.select":Ii,"ui.message":Ri,"ui.scroll":Hi,"ui.focus":Vs,"engine.create":oi};
function hbe(e,t){let r=hyt(e)?eu[e]:V(e);return t?{...r,raiseArgument:(n)=>tzo(t,n)}:r};
var ua=Symbol("compile with no import() hook");
var pbe=Object.freeze({importModuleDynamically:ua});
function la(e){let t=e?.importModuleDynamically;if(t===ua)return;if(typeof t!=="function")throw TypeError("The options argument of hardenVMIntrinsics and createVMIntakeWalkers must be either { importModuleDynamically: <function> } or COMPILE_WITHOUT_IMPORT_HOOK, which src/utils/vmHardening.ts exports");return{importModuleDynamically:t}};
function FBe(e,t){ce.runInContext(`(() => {
    Object.defineProperty(Error, 'prepareStackTrace', {
      value: (err) => { const s = err.stack; return typeof s === 'string' ? s : '' },
      writable: false, configurable: false,
    });
    for (const g of ['ShadowRealm', 'WebAssembly', 'FinalizationRegistry',
                     'WeakRef', 'Atomics', 'SharedArrayBuffer',
                     'queueMicrotask',
                     // JSC debug/shell globals \u2014 present only if
                     // JSC_useDollarVM=1 or similar, but $vm is a full
                     // escape (createGlobalObject, addressOf, runScript).
                     '$vm', 'gc', 'edenGC', 'fullGC', 'print', 'readFile',
                     'Loader']) {
      delete globalThis[g];
    }
    // SES-style enable-property-override: convert common shadowed data props
    // to accessors whose setter defineProperty's onto the receiver. Otherwise
    // freezing makes them non-writable, and [[Set]] on an instance (e.g.
    // "this.name='X'" in an Error subclass ctor) throws in strict / no-ops in
    // sloppy \u2014 the TC39 "override mistake".
    function enableOverride(proto, key) {
      const d = Object.getOwnPropertyDescriptor(proto, key);
      if (!d || 'get' in d) return;
      const v = d.value;
      Object.defineProperty(proto, key, {
        get() { return v },
        set(nv) {
          if (this === proto) return;
          Object.defineProperty(this, key, { value: nv, writable: true, enumerable: true, configurable: true });
        },
        enumerable: d.enumerable, configurable: true,
      });
    }
    const errorCtors = [Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError, AggregateError, globalThis.SuppressedError].filter(Boolean);
    const errorProtos = errorCtors.map(C => C.prototype);
    for (const [proto, keys] of [
      // All Object.prototype data props \u2014 Object.assign({}, {propertyIsEnumerable:x})
      // and friends would otherwise throw post-freeze. Accessor props (__proto__,
      // __define/lookupGetter__) are skipped by the 'get' in d guard above.
      [Object.prototype, Object.getOwnPropertyNames(Object.prototype)],
      [Function.prototype, ['toString', 'constructor', 'name', 'length']],
      [Array.prototype, ['toString', 'constructor']],
      [Date.prototype, ['toString', 'toLocaleString', 'valueOf', 'constructor']],
      ...errorProtos.map(p => [p, ['name', 'message', 'toString', 'constructor']]),
    ]) for (const k of keys) enableOverride(proto, k);
    // Error subclasses each have their own .prototype; freezing only Error
    // leaves TypeError.prototype.then etc. writable. SuppressedError is
    // from the explicit-resource-management proposal (bun/JSC ship it).
    for (const C of [Promise, Object, Array, Function, globalThis.Iterator,
                     Map, Set, WeakMap, WeakSet,
                     String, Number, Boolean, Symbol, BigInt,
                     Date, RegExp, ArrayBuffer, DataView,
                     ...errorCtors,
                     typeof URL !== 'undefined' ? URL : undefined,
                    ].filter(Boolean)) {
      Object.freeze(C);
      Object.freeze(C.prototype);
    }
    // %TypedArray% (shared prototype of all typed arrays) + each concrete.
    for (const C of [Object.getPrototypeOf(Int8Array),
                     Int8Array, Uint8Array, Uint8ClampedArray,
                     Int16Array, Uint16Array, Int32Array, Uint32Array,
                     globalThis.Float16Array, Float32Array, Float64Array,
                     BigInt64Array, BigUint64Array].filter(Boolean)) {
      Object.freeze(C);
      Object.freeze(C.prototype);
    }
    // %AsyncFunction%, %GeneratorFunction%, %AsyncGeneratorFunction% and
    // their .prototype are not reachable as globals \u2014 walk from instances.
    for (const f of [async()=>{}, function*(){}, async function*(){}]) {
      Object.freeze(f.constructor);
      Object.freeze(f.constructor.prototype);
    }
    for (const C of [globalThis.DisposableStack, globalThis.AsyncDisposableStack,
                     globalThis.Intl].filter(Boolean)) {
      Object.freeze(C);
      if (C.prototype) Object.freeze(C.prototype);
    }
    // Namespace objects (no .prototype) \u2014 VM code could otherwise set
    // JSON.then/Math.then/Reflect.then and any host await on the namespace
    // object (or on a VM value that aliases it) becomes a thenable escape.
    // Proxy has no .prototype but freeze closes Proxy.revocable tampering.
    for (const ns of [JSON, Math, Reflect, Proxy]) Object.freeze(ns);
    Object.defineProperty(globalThis, 'then', {
      value: undefined, writable: false, configurable: false,
    });
    Object.defineProperty(globalThis, 'Error', {
      value: Error, writable: false, enumerable: false, configurable: false,
    });
    // Intl.* sub-constructors each have their own .prototype \u2014 freezing the
    // Intl namespace above does NOT freeze Intl.Collator.prototype etc.
    // Same own-property-.then escape shape as Promise.prototype.then if any
    // host code ever awaits an Intl.* instance.
    if (typeof Intl !== 'undefined') {
      for (const k of Object.getOwnPropertyNames(Intl)) {
        const C = Intl[k];
        if (typeof C === 'function') {
          Object.freeze(C);
          if (C.prototype) Object.freeze(C.prototype);
        }
      }
    }
    for (const it of [
      [][Symbol.iterator](),
      ''[Symbol.iterator](),
      new Map()[Symbol.iterator](),
      new Set()[Symbol.iterator](),
      'a'.matchAll(/a/g),
      // Iterator helpers (map/from) are stage-4 but guard for older runtimes.
      ...(typeof Iterator !== 'undefined' && Iterator.from ? [
        [].values().map(x=>x),
        // %WrapForValidIteratorPrototype% \u2014 Iterator.from(non-Iterator) wraps
        // via a distinct intrinsic prototype not reachable from any other path.
        Iterator.from({next:()=>({done:true})}),
      ] : []),
      (function*(){})(),
      (async function*(){})(),
      // %SegmentsPrototype% + %SegmentIteratorPrototype% \u2014 host for..of on a
      // VM Segments object would otherwise see a writable .then on the chain.
      ...(typeof Intl !== 'undefined' && Intl.Segmenter ? (s => [s, s[Symbol.iterator]()])(new Intl.Segmenter().segment('a')) : []),
    ]) {
      for (let p = Object.getPrototypeOf(it); p; p = Object.getPrototypeOf(p)) {
        Object.freeze(p);
      }
    }
    })()`,e,la(t))};
function Cjt(e){return ce.runInContext("((fn, ...args) => fn(...args))",e)};
function MQ(e){return ce.runInContext(`(e => {
      let name = 'Error', message = '', stack = ''
      try { const v = e?.name; if (typeof v === 'string') name = v } catch {}
      try {
        const v = e?.message
        if (typeof v === 'string') message = v
        else if (typeof e === 'string') message = e
        else if (typeof e === 'number' || typeof e === 'boolean' || typeof e === 'bigint') {
          const s = \`\${e}\`
          if (typeof s === 'string') message = s
        }
      } catch {}
      try { const v = e?.stack; if (typeof v === 'string') stack = v } catch {}
      return { __proto__: null, name, message, stack }
    })`,e)};
function $Be(e,{arrayLengthCap:t}={arrayLengthCap:JA}){let o=t===void 0?"":`if (len > ${t}) {
              throw capErr('array length ' + len + ' exceeds the maximum of ${t} supported across the workflow VM boundary')
            }`;return ce.runInContext(`(() => {
      'use strict';
      const _WeakMap = WeakMap, _WeakSet = WeakSet, _isArray = Array.isArray,
            _keys = Object.keys, _defineProperty = Object.defineProperty,
            _Error = Error, _isSafeInteger = Number.isSafeInteger
      // Closure-private registry of clone-created boundary-cap errors, so
      // the per-element/per-key catch blocks below can tell them apart from
      // an INCIDENTAL throw (a hostile getter / Proxy trap on a single
      // value). The cap error must propagate out of the whole clone at any
      // nesting depth; incidental throws still degrade that one slot to
      // undefined. Membership, NOT a tag property: childWorkflow feeds this
      // cloner parent-VM (attacker-reachable) values as childArgs, and a
      // thrown Proxy whose get trap answers true for any key would
      // fake-match a property-based check \u2014 the walker would then rethrow
      // the ATTACKER'S object to the host, whose error extraction reads
      // .message on it host-side. WeakSet.has is identity-based and runs
      // no attacker code.
      const _capSet = new _WeakSet()
      function capErr(msg) {
        const e = new _Error(msg)
        _capSet.add(e)
        return e
      }
      function isCap(e) {
        try { return _capSet.has(e) } catch { return false }
      }
      return (hostVal) => {
        const seen = new _WeakMap()
        function c(v) {
          if (typeof v === 'function') return undefined
          if (v === null || typeof v !== 'object') return v
          const hit = seen.get(v); if (hit !== undefined) return hit
          if (_isArray(v)) {
            // Read length ONCE \u2014 re-reading v.length per iteration lets a
            // Proxy length getter that increments make i < len never false
            // (infinite host-thread hang outside the VM sync-timeout). The
            // read is guarded: at the ROOT of the clone there is no
            // enclosing per-slot catch, so an unguarded read would let a
            // length getter throw an ATTACKER value out to host error
            // extraction with identity preserved \u2014 defeating the
            // only-walker-created-errors-propagate invariant (childArgs /
            // child-result inputs are attacker-reachable).
            let len
            try { len = v.length } catch {
              throw new _Error('unable to read array length across the workflow VM boundary')
            }
            if (typeof len !== 'number' || !_isSafeInteger(len)) {
              throw capErr('array length is not a safe integer across the workflow VM boundary')
            }
            ${o}
            const out = []; seen.set(v, out)
            for (let i = 0; i < len; i++) {
              try { out[i] = c(v[i]) } catch (e) { if (isCap(e)) throw e; out[i] = undefined }
            }
            return out
          }
          const out = {}; seen.set(v, out)
          let ks; try { ks = _keys(v) } catch { return out }
          for (const k of ks) {
            if (k === '__proto__') continue
            try {
              const vk = v[k]
              if (typeof vk === 'function') continue
              _defineProperty(out, k, { value: c(vk), writable: true, enumerable: true, configurable: true })
            } catch (e) { if (isCap(e)) throw e }
          }
          return out
        }
        return c(hostVal)
      }
    })()`,e)};
var Ed=`(e) => {
  let name = 'Error', message = '', stack
  try { const v = e?.name; if (typeof v === 'string') name = v } catch {}
  try {
    const v = e?.message
    if (typeof v === 'string') message = v
    else if (typeof e === 'string') message = e
  } catch {}
  try { const v = e?.stack; if (typeof v === 'string') stack = v } catch {}
  const toStr = () => name + ': ' + message
  _setProto(toStr, null)
  _freeze(toStr)
  return _freeze({
    __proto__: null,
    name,
    message,
    stack: stack === undefined ? name + ': ' + message : stack,
    toString: toStr,
  })
}`;
function j7n(e){return ce.runInContext(`(() => {
      const _freeze = Object.freeze
      const _setProto = Object.setPrototypeOf
      const _getProto = Object.getPrototypeOf
      const _ObjectProto = Object.prototype
      const reseal = ${Ed}
      // Prebuilt at build time (full stack headroom): the last-resort reason
      // when laundering itself throws at the stack ceiling. Throwing it
      // allocates nothing and calls nothing.
      const SENTINEL = reseal({
        name: 'Error',
        message: 'host call failed at the VM boundary (details unavailable)',
      })
      // true only for an object whose prototype chain reaches this realm's
      // Object.prototype within 64 hops (far beyond any real chain; the cap
      // stops a Proxy whose getPrototypeOf trap returns a fresh object each
      // hop from spinning this microtask forever). A null-terminated, foreign,
      // throwing or over-long chain is not this realm's.
      const ownRealm = e => {
        let p = e
        for (let i = 0; i < 64; i++) {
          p = _getProto(p)
          if (p === _ObjectProto) return true
          if (p === null) return false
        }
        return false
      }
      const launder = e => {
        if (e === null || (typeof e !== 'object' && typeof e !== 'function')) return e
        try { if (ownRealm(e)) return e } catch {}
        return reseal(e)
      }
      return (hostFn) => async (...a) => {
        try {
          return await hostFn(...a)
        } catch (e) {
          // No call or allocation between a failed launder and the throw.
          let reason = SENTINEL
          try { reason = launder(e) } catch {}
          throw reason
        }
      }
    })()`,e)};
function UBe(e){if(e==null||typeof e!=="object"&&typeof e!=="function")return String(e);return`[${typeof e}]`};
var Tjt=2;
var c7e=1;
var K7n=0;
var vts=9;
function PSn(e){if(e)Atomics.store(e,c7e,0),setImmediate(Atomics.store,e,c7e,0).unref()};
var Q=(e)=>e.isCore===!0||e.isManaged===!0;
var Ht=()=>({entry:void 0,beneath:void 0});
function tt(e,t){e.entry=Object.freeze(t)};
function Eo(e){let t=[];for(let o=e;o!==void 0;o=o.beneath)if(o.entry!==void 0)t.push(o.entry);return t.length===0?JGo:Object.freeze(t)};
var _d=({bottom:e,index:t,event:o})=>async(r,n,{run:s,floors:i})=>{let p=performance.now(),a="rejected",f;try{return f=await e(r,n,i),a="returned",f}finally{tt(s,{index:t,plugin:woe,tier:"core",event:o,outcome:a,ms:performance.now()-p,received:r,returned:f})}};
function Rn({handler:e,tier:t,index:o,site:r,e:n,descent:s}){let{run:i,floors:p}=s;if(p.length===0||Q(e))return;let m=(e.isHop===!0?e.tiers??[]:[t]).map((h)=>Lts(p,h)),d=m.length>0&&m.every((h)=>h!==void 0)?m[0]:void 0;if(d===void 0)return;let y=`bypassed by ${d}`;nd().log(`${e.name}: ${r.event} ${y} (tier ${t}); beneath runs`),tt(i,{index:o,plugin:e.name,tier:t,event:r.event,outcome:"skipped",reason:y,ms:0,received:n,returned:void 0});let u=Ht();return i.beneath=u,{run:u,floors:p}};
function Cn(e){if(!Md(e))Object.freeze(e);return e};
function je(e){let t=e.isCore===!0,o=t?"core":"prepend";return t||e.isManaged===!0?o:e.tier??"user"};
var bo=1e4;
var ot=ct(new Map,(e)=>{for(let t of e.values())clearTimeout(t.timer);e.clear()});
var O3=1000;
function ga(e,t){let o=ot.get(e);if(ot.delete(e),o!==void 0&&o.count>0)nd().log(`${t} ${o.count} more times in the last ${bo/O3}s (the last in ${o.lastMs.toFixed(1)}ms)`)};
function xa(e){let{plugin:t,tier:o,event:r,ms:n}=e,s=`${r} ${t}`,i=ot.get(s),p=`${t} (${o}) answered ${r} without next()`;if(i!==void 0){i.count+=1,i.lastMs=n;return}nd().log(`${p} in ${n.toFixed(1)}ms; nothing beneath it ran for this dispatch`);let a=setTimeout(ga,bo,s,p);a.unref(),ot.set(s,{count:0,lastMs:n,timer:a})};
var mbe=5000;
var Mt=new Vd;
async function aVr(e){let t=Mt.getStore();if(t===void 0)return e();t.pause();try{return await e()}finally{t.resume()}};
var rt=1000;
var ha=(e)=>e;
function ka(e,t){if(--e.pendingDownstream>0)return;if(e.beneathMs+=performance.now()-e.beneathSince,!e.settled)t.resume()};
function So(e,t=new Map){if(typeof e!=="object"||e===null)return e;let o=t.get(e);if(o!==void 0)return o;if(Array.isArray(e)){let n=[];t.set(e,n);for(let s of e)n.push(So(s,t));return n}if(!gF(e))return e;let r={};t.set(e,r);for(let n of Object.keys(e))Object.defineProperty(r,n,{value:So(e[n],t),enumerable:!0,writable:!0,configurable:!0});return r};
function jBe(e,t,o){if(o!==void 0&&o>qt)nd().log(`${e}: wrote a text of ${o} characters (${t}; over ${qt}, accepted: a plugin's text is its own to size)`)};
function nt({handler:e,site:t,e:o},r){let n=jjt(r,e.name),s=!Q(e)&&(t.checkArgument!==void 0||t.restoreArgument!==void 0),p=s&&!Object.is(n,o)?So(n):n,a=s?t.restoreArgument?.(p,o)??p:p,f=s?t.checkArgument?.(a,o):void 0;if(f!==void 0)throw new Oe(`${e.name}: next() passed an argument with ${f}`);if(s&&e.isHop!==!0)jBe(e.name,t.event,t.measureArgument?.(a,o));return ha(a)};
function _n(e,t,o){if(t.length===0)throw new Oe(`${o.plugin}: next.to() names no tier`);let r=yyt(o.tier);return t.toReversed().reduce((n,s)=>{if(!EJn(s))throw new Oe(`${o.plugin}: next.to names "${String(s)}", which is not a tier a dispatch continues at (append, builtin, core)`);if(r.length===0)throw new Oe(`${o.plugin}: next.to is available to managed plugins (prependPlugins / appendPlugins) only, not to a ${o.tier} hook`);if(!r.includes(s))throw new Oe(`${o.plugin}: next.to("${s}") skips nothing from ${o.tier}; a ${o.tier} hook may continue at `+yyt(o.tier).join(", "));return Nts(n,{from:o.tier,to:s,plugin:o.plugin})},e)};
function Oo(e){return e>=O3&&e%O3===0?`${e/O3}s`:`${e}ms`};
var wa="failed closed: its .catch answered";
function Le(e){let t=e instanceof Oe&&e.thrownName!==void 0?{name:e.thrownName}:e;return`errorKind=${e instanceof Error?Ng(t)??"Error":"unknown"} errorChars=${String(l(e)).length}`};
function Ta(e,t,o){return`hook failed closed: ${e}: ${Le(t)} (${o}; its .catch answered)`};
var st=(e,t)=>t.startsWith(`${e.name}: `)?t:`${e.name}: ${t}`;
function In(e){return nd().log(`hooks module ${e}: next() after it settled; refused`,"warn"),new Oe(`${e}: next() after it settled`)};
var iy="left mid-stream; what it yielded stands, the rest came from beneath it";
var Nn="...";
var Hn=120;
function jt(e){let t=(e.split(/\r?\n/u)[0]??"").replace(H3," ").trim();return t.length<=Hn?t:re(t,Hn-Nn.length)+Nn};
function Ao(e){if(!(e instanceof Error))return jt(String(e));let o=e instanceof Oe?e.thrownName:e.name,r=o===void 0?"":`${o}: `;return jt(`${r}${e.message}`)};
function Ea(e,t){let{expiredMs:o,lingeredMs:r,shape:n,caught:s}=t,i=s===void 0?"":`; ${s}`;if(o!==void 0)return{kind:"budget",why:`ran past its ${Oo(o)} budget${i}`};if(r!==void 0)return{kind:"lingered",why:`did not stop within ${Oo(r)} of the turn being interrupted`};return n!==void 0?{kind:"shape",why:`returned the wrong shape (${jt(n)})`}:{kind:"threw",why:`threw ${Ao(e)}${i}`}};
function ba({error:e,handler:t,site:o,effect:r,cause:n}){let s=st(t,l(e));if(nd().log(`hook failed: ${t.name}: ${Le(e)} (${o.event}; ${r})`,"error"),!Q(t))nd().hookFailed({plugin:t.name,environmentId:t.environmentId,event:o.event,reason:s,effect:r,hasOverrun:!1,skip:t.isHop===!0?void 0:Ea(e,n)});return s};
var Sa="skipped; what is below it ran in its place";
var Oa="skipped; its last next() run's result stands";
function Mn(e,t,o){let r=!1,n=()=>{r=!0};e.then(n,n),setTimeout(()=>{if(r||Q(t))return;let i=st(t,`still running ${mbe}ms after its budget ran out; ignores its signal`);nd().log(`hook overran: ${i} (${o.event})`,"error"),nd().hookFailed({plugin:t.name,event:o.event,reason:i,effect:"counted toward a runaway",hasOverrun:!0})},mbe).unref?.()};
function zE(e,t){if(e===void 0)return()=>{};if(e.aborted)return t.abort(e.reason),()=>{};let o=()=>t.abort(e.reason);return e.addEventListener("abort",o,{once:!0}),()=>e.removeEventListener("abort",o)};
function gy({handler:e,below:t,site:o,e:r,budget:n,downstreamSignal:s,state:i,run:p,floors:a,tier:f}){async function m(y,u,h=a){let A=o.raiseArgument?.(y)??y;if(i.pendingDownstream++===0)n.pause(),i.beneathSince=performance.now();let x=new AbortController,_=zE(s,x),b=zE(u,x),H=Ht();if(!s.aborted)p.beneath=H;let S=t(A,x.signal,{run:H,floors:h}).then((R)=>{let I=o.carry===void 0?R:o.carry(R,A,r);return i.belowRejected=void 0,i.fromBelow=[...i.fromBelow,I],I},(R)=>{throw i.belowRejected={error:R},R});i.inFlight=S;try{return await S}finally{_(),b(),ka(i,n)}}function c(y){let u=nt({handler:e,site:o,e:r},y);if(i.settled)throw In(e.name);return u}let d=(y)=>_n(a,y,{plugin:e.name,tier:f});return{runBelow:m,call:async(y,u,h)=>m(c(y),u,h),to:async(y,u)=>m(c(y),void 0,d(u)),replay:async(y,u,h)=>i.inFlight??m(nt({handler:e,site:o,e:r},y),u,h),replayTo:async(y,u)=>i.inFlight??m(nt({handler:e,site:o,e:r},y),void 0,d(u))}};
var lVr=(e)=>Promise.reject(new Oe(`no implementation for ${e.event}`));
var Aa=(e,t)=>({name:t.map((o)=>o.name).join("+"),tier:t[0]?.tier,tiers:L(t.map(je)),...t.at(-1)?.answersForEngine&&{answersForEngine:!0},budgetMs:0,isHop:!0,run:(o,r,{call:n,floors:s,cutAt:i})=>e.run({members:t,e:o,call:n,signal:r.signal,origin:r.origin,floors:s,cutAt:i})});
var va=(e)=>e.reduce((t,o)=>{let r=t.at(-1);return o.hop!==void 0&&r?.hop?.key===o.hop.key?[...t.slice(0,-1),{hop:r.hop,members:[...r.members,o]}]:[...t,{hop:o.hop,members:[o]}]},[]);
var Oy=(e)=>va(e).map((t)=>{let o=t.hop;return o===void 0?t.members[0]:Aa(o,t.members)});
var J7n=ct(Ys(),(e)=>e.set(void 0));
var Q7n=()=>J7n.get();
var dyt=()=>Q7n()!==void 0;
async function Ex({e,handlers:t,site:o,signal:r=new AbortController().signal,cutAt:n,budgetMs:s=o.budgetMs??gbe,bottom:i,origin:p=BBe,floors:a=_7e,trace:f}){let m=Oy(t),c=_d({bottom:i??(()=>lVr(o)),index:m.length,event:o.event}),d=Ht(),y=dyt();return m.reduceRight((u,h,A)=>{let x=A===m.length-1;return Cy({handler:h,index:A,below:u,site:o,budgetMs:s,cutAt:n,origin:p,nothingBelow:i===void 0&&x,answersForEngine:y&&x&&h.answersForEngine===!0})},c)(e,r,{run:d,floors:a}).then((u)=>(f?.(Eo(d)),u)).catch((u)=>{if(!Ge(u,r))nd().log(`hooks chain failed: ${Le(u)}`,"error");throw u})};
function Pa(e,t){let o=e,r=Date.now(),n,s=!1,i=!1,p=()=>{},a=Ln(new Promise((d,y)=>{p=y}));function f(){s=!0,p(new Oe(t))}function m(){r=Date.now(),i=!0,n=setTimeout(f,o)}let c=()=>i?Math.max(0,o-(Date.now()-r)):o;return m(),{expired:a,isExpired:()=>s,remainingMs:()=>s?0:c(),pause(){clearTimeout(n),o=c(),i=!1},resume:m,clear:()=>clearTimeout(n),rearm(){if(s)return;if(o=e,clearTimeout(n),i)m()}}};
function Ln(e){return e.catch(()=>{}),e};
function vo(e,t,o){let r=()=>o===void 0?Number.POSITIVE_INFINITY:Math.max(0,o-Date.now()),n=Math.min(e<=0?Number.POSITIVE_INFINITY:e,r());if(e<=0)return{expired:void 0,isExpired:()=>!1,reading:()=>o===void 0?Ko:Object.freeze({ms:n,remainingMs:r()}),hasGraceExpired:()=>!1,pause(){},resume(){},clear(){},rearm(){}};let s=0,i=!1,p,a=Pa(e,`exceeded ${e}ms budget`),f=Promise.withResolvers();function m(){if(p=Pa(mbe,`did not settle within ${mbe}ms of its signal aborting`),s>0)p.pause();p.expired.catch(f.reject)}let c=zE(t,{abort:m});return{expired:Ln(Promise.race([a.expired,f.promise])),isExpired:()=>a.isExpired(),reading:()=>Object.freeze({ms:n,remainingMs:Math.min(a.remainingMs(),r())}),hasGraceExpired:()=>p?.isExpired()??!1,pause(){if(s++===0)a.pause(),p?.pause()},resume(){if(--s===0&&!i)a.resume(),p?.resume()},clear(){i=!0,a.clear(),p?.clear(),c()},rearm(){if(!i)a.rearm()}}};
var gbe=1e4;
var Ro=({call:e,to:t,signal:o,event:r,origin:n,run:s,budget:i,caught:p})=>EPe({call:e,to:(a,...f)=>t(a,f),signal:o,is:Bo(r),event:r,origin:n,trace:()=>Eo(s.beneath),budget:()=>i.reading(),caught:p});
var Ia=()=>({pendingDownstream:0,settled:!1,inFlight:void 0,fromBelow:[],belowRejected:void 0,beneathMs:0,beneathSince:0});
var Ge=(e,t)=>t.aborted&&(at(e)||l(e)===Syt(t));
function Fy(e,t){return t!==void 0?`its .catch returned ${t}`:e};
function Na({kind:e,error:t,rejection:o}){let r=e==="throw",n=o===void 0?void 0:l(o.error);return r?l(t):n};
async function By({handler:e,e:t,signal:o,state:r,handle:n,site:s,origin:i,run:p,cutAt:a,kind:f,error:m}){let c=e.catch;if(c===void 0)return{answer:void 0,problem:void 0};let d=r.inFlight!==void 0;await r.inFlight?.then(void 0,()=>{return});let y=Na({kind:f,error:m,rejection:r.belowRejected}),u=new AbortController,h=zE(o,u),A=!1,x=`${e.name}: next() after its .catch settled`,_=(R)=>A?Promise.reject(new Oe(x)):aVr(R),b=vo(rt,o,a),H=Ro({call:(R,I,K)=>_(()=>n.replay(R,I,K)),to:(R,I)=>_(()=>n.replayTo(R,I)),signal:u.signal,event:s.event,origin:i,run:p,budget:b,caught:{error:Object.freeze({kind:f,...y===void 0?{}:{message:y},budget:rt}),called:d}}),S=Mt.run(b,()=>c(t,H));try{return{answer:b.expired===void 0?await S:await Promise.race([S,b.expired]),problem:void 0}}catch(R){if(Ge(R,o))throw R;let I=Oo(rt),K=b.isExpired(),M=K?`its .catch ran past its ${I} grace`:`its .catch threw ${Ao(R)}`;if(u.abort(new Oe(`${e.name}: ${M}`)),K)Mn(S,e,s);return{answer:void 0,problem:M}}finally{A=!0,b.clear(),h()}};
var Cy=({handler:e,index:t,below:o,site:r,budgetMs:n,cutAt:s,origin:i,nothingBelow:p,answersForEngine:a})=>async(f,m,c)=>{let{run:d,floors:y}=c,u=je(e),h=Rn({handler:e,tier:u,index:t,site:r,e:f,descent:c});if(h!==void 0)return o(f,m,h);let A=performance.now(),x=Ia(),_=new AbortController,b=zE(m,_),H=new AbortController,S=zE(m,H),R=e.budgetMs??n,I=vo(R,m,s),K=Cn(f),M=gy({handler:e,below:o,site:r,e:f,budget:I,downstreamSignal:_.signal,state:x,run:d,floors:y,tier:u}),{call:F,to:X,runBelow:Ne}=M,ue=Ro({call:F,to:X,signal:H.signal,event:r.event,origin:i,run:d,budget:I});function Ee(j){return nd().log(`${e.name}: its next() rejected below it (${r.event}); the rejection passes up`),j}function z(j){let W=r.settle,J=Q(e)||W===void 0;try{let q=J?j:W(j),se=Q(e)?q:r.restoreResult?.(q,x.fromBelow,f)??q,ie=Q(e)||a?se:r.stripResult?.(se,x.fromBelow)??se,$e=Q(e)?void 0:r.check?.(ie,f,x.fromBelow);if($e===void 0&&!Q(e)&&e.isHop!==!0)jBe(e.name,r.event,r.measure?.(ie,f,x.fromBelow));return{settled:ie,problem:$e}}catch(q){let le=`a result the site cannot read (${l(q)})`;return{settled:j,problem:le}}}let ye,ge,pe="rejected",xe=!1,Z,ne;try{Z=Mt.run(I,()=>e.run(K,ue,{call:F,floors:y,cutAt:s}));let W=I.expired===void 0?await Z:await Promise.race([Z,I.expired]);if(W===void 0)throw ne="no result",new Oe("returned no result");let{settled:J,problem:q}=z(W);if(q!==void 0)throw ne=q,new Oe(`returned ${q}`);ye=J,ge=J,pe=W===x.fromBelow.at(-1)?"passed":"returned",xe=x.inFlight===void 0&&!Q(e)&&e.isHop!==!0}catch(j){if(Ge(j,m))throw j;let W=I.isExpired(),J=W?void 0:x.belowRejected;if(J!==void 0&&e.catch===void 0)throw Ee(J.error);let q=st(e,l(j));if(x.settled=!0,W&&Z!==void 0)H.abort(new Oe(q)),Mn(Z,e,r);let se=x.inFlight!==void 0,le=m.aborted?{answer:void 0,problem:void 0}:await By({handler:e,e:K,signal:m,state:x,handle:M,site:r,origin:i,run:d,cutAt:s,kind:W?"timeout":"throw",error:j}),ie=le.answer===void 0?void 0:z(le.answer);if(ie!==void 0&&ie.problem===void 0)nd().log(Ta(e.name,j,r.event),"warn"),nd().hookFailed({plugin:e.name,environmentId:e.environmentId,event:r.event,reason:q,effect:wa,hasOverrun:!1}),ye=ie.settled,ge=ie.settled,pe="caught";else if(J===void 0){if(ba({error:j,handler:e,site:r,effect:se?Oa:Sa,cause:{expiredMs:W?R:void 0,lingeredMs:I.hasGraceExpired()?mbe:void 0,shape:ne,caught:Fy(le.problem,ie?.problem)}}),x.inFlight===void 0&&p)throw j;ye=await(x.inFlight??Ne(f)),ge=se?ye:void 0,pe=W?"expired":se?"kept":"skipped"}else throw Ee(J.error)}finally{x.settled=!0,I.clear(),S(),b();let j=performance.now(),W=j-A-x.beneathMs-(x.pendingDownstream>0?j-x.beneathSince:0);if(tt(d,{index:t,plugin:e.isCore===!0?woe:e.name,tier:u,event:r.event,outcome:pe,ms:W,received:f,returned:ge}),xe)xa({plugin:e.name,tier:u,event:r.event,ms:W});if(x.pendingDownstream>0)_.abort(new Oe(`${e.name} settled the call`))}return ye};
var Ma=1;
var fJn=(e)=>typeof e==="number"&&Number.isFinite(e)&&e>=0;
function ja(e){let t=N(e)?e.message:void 0;return typeof t==="string"?t:l(e)};
function qy({pluginName:e,host:t,live:o,unloaded:r,invoke:n,signalFrom:s,makeSignal:i}){let p=new La(`${e} $.clock`);function a(c,d){if(!fJn(c))throw new Oe(`${e}: $.clock.${d} takes a non-negative number of milliseconds`);if(r())throw PPe(e);return c}function f({event:c,ms:d,fn:y,shouldRepeat:u}){if(typeof y!=="function")throw new Oe(`${e}: $.clock.${c} takes a function`);let h=a(d,c),A=u?Math.max(Ma,h):h,x=i(),_=new La(`${e} $.clock.${c}`),b,H=ky({cancel:()=>{o?.delete(H),b&&clearImmediate(b),x.abort(new Oe(`${e}: $.clock.${c} cancelled`))}}),S=()=>void _.runInAsyncScope(()=>n(y,[])).catch((F)=>nd().log(`${e}: $.clock.${c}: the callback threw: `+l(F),"warn"));function R(F){if(o?.delete(H),!x.signal.aborted)nd().log(`${e}: $.clock.${c} refused: ${ja(F)}`,"warn")}function I(){if(x.signal.aborted)return;if(!u)o?.delete(H);if(S(),u)b=setImmediate(K)}function K(){if(!x.signal.aborted)M()}function M(){let F=u?"clock.every":"clock.after";p.runInAsyncScope(()=>t(F,{ms:A},x.signal).then(I,R))}return o?.add(H),M(),H}async function m(c,d={}){let y=a(c,"sleep"),u=s(d.signal),h=i(),A=zE(u?.signal,h),x=ky({cancel:()=>h.abort(PPe(e))});o?.add(x);try{await t("clock.sleep",{ms:y},h.signal)}finally{o?.delete(x),A(),u?.unlink()}}return ky({now:()=>t("clock.now",{}),sleep:m,after:(c,d)=>f({event:"after",ms:c,fn:d,shouldRepeat:!1}),every:(c,d)=>f({event:"every",ms:c,fn:d,shouldRepeat:!0})})};
var ybe=(e)=>e==="clock.now"||e==="clock.sleep"||e==="clock.after"||e==="clock.every";
var Fa=(e)=>GBe(e)===void 0;
var $a=["ui.log","ui.notice","ui.invalidate","ui.toast","ui.status"];
var $Sn=(e)=>$a.includes(e);
function mj(e){let t=Promise.withResolvers();t.promise.catch(()=>{});let o=!1;async function*r(){let n=typeof e==="function"?e():e;try{let s=yield*n;return o=!0,t.resolve(s),s}catch(s){throw o=!0,t.reject(s),s}finally{if(!o)t.reject(new Oe("the stream was closed before its result"))}}return Object.defineProperty(r(),"result",{value:t.promise,enumerable:!0})};
async function pt(e){let t=new AbortController,o=Promise.resolve().then(()=>e.return?.(void 0)).then(()=>{return},()=>{return});try{await Promise.race([o,ee(mbe,t.signal,{unref:!0})])}finally{t.abort()}};
async function*_be(e,t=()=>{}){let o=!1;async function r(){try{return await e.next()}catch(n){throw o=!0,n}}try{while(!0){let n=await r();if(n.done===!0)return o=!0,n.value;t(n.value),yield n.value}}finally{if(!o)await e.return?.(void 0)}};
function Da(e,t,o){let r=!e||o!==void 0,n=e?l(o):l(t);return Object.freeze({kind:e?"timeout":"throw",...r&&{message:n},budget:rt})};
var Ua=()=>({done:!1,result:void 0,closed:!1,revoked:!1,threw:void 0});
function Ba({source:e,name:t,away:o,carry:r,onChunk:n}){let s=Ua(),i=0,p=0,a,f;async function m(){let y=a??e.next();a=y;try{return await o(()=>y)}catch(u){throw s.done=!0,s.threw??={error:u},u}finally{if(a===y)a=void 0}}function c(){if(s.threw!==void 0)throw s.threw.error;return s.result}function d(y="link"){i+=1;let u=i;p=u;let h=()=>p!==u||y==="hook"&&s.revoked;function A(x){if(f??=x,y==="hook")throw In(t);return s.result}return async function*(){while(!0){if(h())return A(void 0);let x;if(f!==void 0)x=f,f=void 0;else if(s.done)return c();else{if(x=await m(),h())return A(x);if(f===x)f=void 0}if(x.done===!0)return s.done=!0,s.result=r(x.value),s.result;n(x.value),yield x.value}}()}return{source:e,progress:s,readOn:d}};
function $n(e){let t=0,o=0,r=0;e.pause();function n(){if(t++===0)o=performance.now(),e.resume()}function s(){if(--t===0)r+=performance.now()-o,e.pause()}return{async own(i){n();try{return await Mt.run(e,i)}finally{s()}},async away(i){if(!(t>0))return i();s();try{return await i()}finally{n()}},ms:()=>t>0?r+(performance.now()-o):r}};
var yg=({handler:e,index:t,below:o,site:r,budgetMs:n,origin:s,nothingBelow:i})=>(p,a,f)=>mj(async function*(){let{run:m,floors:c}=f,d=je(e),y=Rn({handler:e,tier:d,index:t,site:r,e:p,descent:f});if(y!==void 0)return yield*o(p,a,y);let u=Cn(p),h=new AbortController,A=zE(a,h),x=new AbortController,_=zE(a,x),b=e.budgetMs??n,H=vo(b,a),S=r.budgetSpan==="pull"?H.rearm:()=>{},{own:R,ms:I,...K}=$n(H),M=K,F=(g)=>M.away(g),X=[],Ne=new WeakSet,ue=Q(e),Ee=ue?void 0:r.chunkChecker?.(),z=!1,ye=!1,ge=0,pe="rejected",xe,Z,ne,j="none",W=()=>{ge+=1};function J(g,k=H){let{expired:O}=k;return O===void 0?g:Promise.race([g,O])}function q(g){return nd().log(`${e.name}: its next() stream rejected below it (${r.event}); the rejection passes up`),g}function se(g,k,O){let T=r.raiseArgument?.(g)??g,D=new AbortController;zE(x.signal,D),zE(k,D);let U=Ht();if(!x.signal.aborted)m.beneath=U;let{carry:be}=r,He=Ba({source:o(T,D.signal,{run:U,floors:O}),name:e.name,away:F,carry:(te)=>be===void 0?te:be(te,T,p),onChunk:(te)=>{if(typeof te==="object"&&te!==null)Ne.add(te);Ee?.pulled(te),S()}});return X.push(He),He}let le=(g)=>mj(async function*(){try{return yield*g.readOn("hook")}finally{if(!g.progress.done)g.progress.closed=!0}}),ie=(g,k,O=c)=>{let T=nt({handler:e,site:r,e:p},g);if(z)throw In(e.name);return $e(),le(se(T,k,O))};function $e(){for(let g of X)if(g.progress.closed&&!g.progress.done)g.progress.done=!0,pt(g.source)}let ut=(g)=>_n(c,g,{plugin:e.name,tier:d}),Bt=Y7n({call:ie,to:(g,...k)=>ie(g,void 0,ut(k)),signal:h.signal,is:Bo(r.event),event:r.event,origin:s,trace:()=>Eo(m.beneath),budget:()=>H.reading()});function lt(g){let k=r.settle,O=ue||k===void 0;try{let T=O?g:k(g),D=ue?void 0:r.check?.(T,p,X.flatMap((U)=>U.progress.done?[U.progress.result]:[]));return{settled:T,problem:D}}catch(T){let U=`a result the site cannot read (${l(T)})`;return{settled:g,problem:U}}}function Kt(g){let k=typeof g==="object"&&g!==null&&Ne.has(g),O=Ee?.yielded(g,k);if(O!==void 0)throw Z=`a chunk with ${O}`,new Oe(`yielded a chunk with ${O}`);return g}function dt(g){let k=X.at(-1);if(g===void 0){if(k?.progress.done===!0)return pe="passed",k.progress.result;throw Z="no result",new Oe("returned no result (and read no next() stream to its end)")}let{settled:O,problem:T}=lt(g);if(T!==void 0)throw Z=T,new Oe(`returned ${T}`);return pe=X.some((U)=>U.progress.done&&U.progress.result===g)?"passed":"returned",ye=X.length===0&&!ue&&e.isHop!==!0,O}function ze(){let g=X.at(-1);return g!==void 0&&g.progress.threw===void 0?g:void 0}async function*Wt(g,k){let O=e.catch;if(O===void 0||a.aborted)return{answered:!1,problem:void 0};let T=vo(rt,a),D=$n(T);M=D;let U=new AbortController,be=zE(a,U),He=X.at(-1)?.progress.threw,te,he=(Ae,ve,Do=c)=>{let Uo=nt({handler:e,site:r,e:p},Ae);if(te!==void 0)return te;return te=mj((ze()??se(Uo,ve,Do)).readOn()),te},Uf=Y7n({call:he,to:(Ae,...ve)=>he(Ae,void 0,ut(ve)),signal:U.signal,is:Bo(r.event),event:r.event,origin:s,trace:()=>Eo(m.beneath),budget:()=>T.reading(),caught:{error:Da(k,g,He?.error),called:X.length>0}}),Vt,$o=!1;try{Vt=await D.own(()=>J(Promise.resolve(O(u,Uf,{open:he,floors:c})),T)),$o=!0;while(!0){let Ae=Vt,ve=await D.own(()=>J(Ae.next(),T));if(ve.done===!0){if($o=!1,ve.value===void 0)return{answered:!1,problem:void 0};let{settled:Uo,problem:ns}=lt(ve.value);if(ns===void 0)return{answered:!0,result:Uo};return{answered:!1,problem:`its .catch returned ${ns}`}}let Do=Kt(ve.value);W(),yield Do}}catch(Ae){if(Ge(Ae,a))throw Ae;return{answered:!1,problem:`its .catch ${T.isExpired()?`ran past its ${rt}ms grace`:`threw ${Ao(Ae)}`}`}}finally{if(M=K,T.clear(),be(),$o&&Vt!==void 0)U.abort(new Oe(`${e.name}: .catch left`)),pt(Vt)}}async function*v(g){let k=H.isExpired(),O=st(e,l(g)),T=k?void 0:X.at(-1)?.progress.threw;if(T!==void 0&&e.catch===void 0)throw q(T.error);z=!0;for(let he of X)he.progress.revoked=!0;if(ne!==void 0&&j!=="done"){let he=ne;if(k)h.abort(new Oe(O)),Mn(Promise.resolve().then(()=>he.return(void 0)).catch(()=>{return}),e,r);else await pt(he);j="done"}let D=yield*Wt(g,k);if(D.answered)return nd().log(Ta(e.name,g,r.event),"warn"),nd().hookFailed({plugin:e.name,environmentId:e.environmentId,event:r.event,reason:O,effect:wa,hasOverrun:!1}),pe="caught",D.result;if(T!==void 0)throw q(T.error);let U=ze(),be=U?.progress.done===!0,He=ge>0||U!==void 0,te=be?Oa:He?iy:Sa;if(ba({error:g,handler:e,site:r,effect:te,cause:{expiredMs:k?b:void 0,lingeredMs:H.hasGraceExpired()?mbe:void 0,shape:Z,caught:D.problem}}),U?.progress.done===!0)return pe=k?"expired":"kept",U.progress.result;if(U!==void 0)return pe=k?"expired":"kept",yield*_be(U.readOn(),W);if(i)throw g;return pe=k?"expired":"skipped",yield*_be(se(p,void 0,c).readOn(),W)}try{try{if(j="running",ne=await R(()=>J(Promise.resolve(e.run(u,Bt,{open:ie,floors:c})))),!(typeof ne==="object"&&ne!==null&&typeof ne.next==="function"))throw j="done",Z="no stream",new Oe("returned no stream: a hook on a streaming event is an async generator, async function* ($, e, next) {}");while(!0){j="running",S();let k=ne,O=await R(()=>J(k.next())).catch((D)=>{if(!H.isExpired())j="done";throw D});if(O.done===!0)return j="done",xe=dt(O.value),xe;j="suspended";let T=Kt(O.value);W(),yield T}}catch(g){if(Ge(g,a))throw g;return xe=yield*v(g),xe}}finally{if(z=!0,H.clear(),A(),ne!==void 0&&j==="suspended")await pt(ne);if(X.some((O)=>!O.progress.done))x.abort(new Oe(`${e.name} settled the call`));for(let O of X)if(!O.progress.done)O.progress.done=!0,await pt(O.source);_();let k=I();if(tt(m,{index:t,plugin:e.isCore===!0?woe:e.name,tier:d,event:r.event,outcome:pe,ms:k,chunks:ge,received:p,returned:xe}),ye)xa({plugin:e.name,tier:d,event:r.event,ms:k})}});
var Wa=(e,t)=>({name:t.map((o)=>o.name).join("+"),tier:t[0]?.tier,tiers:L(t.map(je)),budgetMs:0,isHop:!0,run:(o,r,{open:n,floors:s})=>e.run({members:t,e:o,open:n,signal:r.signal,origin:r.origin,floors:s})});
function Va(e){let t=[],o=[];function r(){let[n]=o,s=n?.hop;if(n!==void 0&&s!==void 0)t.push(Wa(s,o));o=[]}for(let n of e){if(!(n.hop!==void 0&&n.hop.key===o[0]?.hop?.key))r();if(n.hop===void 0){t.push(n);continue}o.push(n)}return r(),t};
var Ga=(e,t,o)=>(r,n,{run:s,floors:i})=>mj(async function*(){let p=performance.now(),a="rejected",f,m=0;try{return f=yield*_be(e(r,n,i),()=>{m+=1}),a="returned",f}finally{tt(s,{index:t,plugin:woe,tier:"core",event:o,outcome:a,ms:performance.now()-p,chunks:m,received:r,returned:f})}});
function yJn(e){let{e:t,site:o,bottom:r}=e,n=Va(e.handlers),i=Ga(r??(()=>async function*(){return await lVr(o)}()),n.length,o.event),p=n.reduceRight((m,c,d)=>yg({handler:c,index:d,below:m,site:o,budgetMs:e.budgetMs??gbe,origin:e.origin??BBe,nothingBelow:r===void 0&&d===n.length-1}),i),a=e.signal??new AbortController().signal,f=e.floors??_7e;return mj(async function*(){try{return yield*p(t,a,{run:Ht(),floors:f})}catch(m){throw nd().log(`hooks stream chain failed: ${Le(m)}`,"error"),m}})};
async function*dzo(e){let t=!1;try{while(!0){let o=await e.next().catch((r)=>{throw t=!0,r});if(o.done===!0)return t=!0,o.value;yield o.value}}finally{if(!t)await e.return().catch(()=>{return})}};
function Og(e){let t=Reflect.get(e,"result");return typeof t==="object"&&t!==null&&"then"in t&&typeof t.then==="function"?t:Promise.reject(new Oe("the stream carries no result of its own"))};
var Dn=(e)=>new Oe(`${e.name}: the stream was closed before next() returned its result`);
function Ots(e){let{run:t,catch:o,hop:r,...n}=e,s=(i)=>async function*(a,f,m){let c=[],d,y=!1,u=(b)=>new Promise((H,S)=>{if(y){b.return(void 0).catch(()=>{return}),S(Dn(e));return}c=[...c,{stream:b,resolve:H,reject:S}],d?.()}),h=EPe({...X7n(f),call:(b)=>u(m.open(b)),to:(b,...H)=>u(iVr(b,f,H))}),A=i(a,h).then((b)=>({result:b,error:void 0,isThrown:!1}),(b)=>({result:void 0,error:b,isThrown:!0})),x;A.then((b)=>{x=b,d?.()});let _;try{while(!0){if([_,...c]=c,_===void 0&&x!==void 0)break;if(_===void 0){await new Promise((b)=>{d=b}),d=void 0;continue}try{while(x===void 0){let b=await Promise.race([_.stream.next(),A]);if(!("done"in b))break;if(b.done===!0){_.resolve(b.value),_=void 0;break}yield b.value}}catch(b){_?.reject(b),_=void 0}}}finally{y=!0;for(let b of[..._?[_]:[],...c])b.reject(Dn(e)),b.stream.return(void 0).catch(()=>{return});c=[]}if(x.isThrown)throw x.error;return x.result};return{...n,run:s((i,p)=>t(i,p,{call:(a)=>p(a),floors:[],cutAt:void 0})),...o!==void 0&&{catch:s((i,p)=>o(i,p))}}};
function uzo(e,t){let o=e.return.bind(e);return Object.defineProperty(e,"return",{value:(r)=>(t(),o(r))})};
var Xa=(e)=>({url:Ug(e).href,dir:Dg(e),file:e});
var za=`(() => {
  const REFUSAL = new Error(
    'import() is not available: a hooks module imports its own files ' +
      'with an import declaration',
  )
  REFUSAL.stack = String(REFUSAL.stack).split('\\n')[0]
  Object.freeze(REFUSAL)
  return () => {
    throw REFUSAL
  }
})()`;
var pzo=(e)=>Ya.runInContext(VC(za),e);
var Co=(e,t)=>`${t.length}:${t}${e.length}:${e}`;
var qa=(e)=>new Map(e.map((t)=>[Co(t.spelled,Gg(t.from)),t.file]));
var Qa=(e)=>new Map(e.map((t)=>[t.file,t.source]));
function RVr(e){let{args:t,context:o,stamped:r,evaluateOptions:n,isScanned:s}=e,{pluginName:i,pluginRoot:p}=t,a=Bn(p),f=new Map,m=new Set,c=pzo(o),d=new Kn.SourceTextModule(vJn,{context:o,identifier:S7e,importModuleDynamically:c}),y=Qa(t.linked),u=qa(t.links);async function h(S,R){if(S===S7e)return d;let I=e.virtual?.get(S);if(I)return I;if(!NVr(S))throw bzo(i,S,Za(a,R.identifier)||R.identifier);let K=u.get(Co(S,Bn(R.identifier))),M=K===void 0?void 0:y.get(K);if(K!==void 0&&M!==void 0)return b(K,M);let F=await wzo({spelled:S,importer:R.identifier,root:a,pluginName:i},y,new Map);return y.set(F.file,F.source),m.add(F.file),b(F.file,F.source)}let A=new Map;function x(S){if(S.status==="unlinked")A.set(S.identifier,S.link(h).then(()=>r(()=>S.evaluate(n))));return A.get(S.identifier)}function _(S){if(S.status==="errored")throw S.error;if(S.status==="linked"){let R=r(()=>S.evaluate(n));return A.set(S.identifier,R),R}return}let b=(S,R)=>f.get(S)??H(S,R);function H(S,R){let I=$ts(GSn(S,R),S,a),M=!s||m.has(S)?Czo(Azo(S,I,i)):void 0;if(M!==void 0)throw M;let F=new Kn.SourceTextModule(I,{context:o,identifier:S,initializeImportMeta:(X)=>{Object.assign(X,Xa(S))},importModuleDynamically:c});return f.set(S,F),F}return{async load(S,R){let I=Bn(S);y.set(I,R);let K=b(I,R);await x(K),await _(K);let M=K.namespace;if(Reflect.ownKeys(M).includes("then"))throw new Oe(`${i}: ${Za(a,I)} exports the name "then" (its own, or through an export *), which no entry module may: rename the export`);return M}}};
var fzo=(e)=>RVr(e).load(e.args.modulePath,e.args.source);
function KGo(e,t){let o=(r)=>G0(e((...n)=>nd().log(`${t} console.${r}: ${n.map(UBe).join(" ")}`)));return ky({log:o("log"),info:o("info"),warn:o("warn"),error:o("error"),debug:o("debug")})};
var qg=(e)=>ep.runInContext(VC(`(() => {
      const _isArray = Array.isArray, _keys = Object.keys,
            _create = Object.create, _defineProperty = Object.defineProperty,
            _getPrototypeOf = Object.getPrototypeOf, _RegExp = RegExp,
            _ObjectPrototype = Object.prototype,
            _toString = Object.prototype.toString,
            _toStringTag = Symbol.toStringTag,
            _Error = Error,
            _descriptor = Object.getOwnPropertyDescriptor,
            _source = _descriptor(RegExp.prototype, 'source').get,
            _flags = _descriptor(RegExp.prototype, 'flags').get
      const isRegExp = value => {
        try { _source.call(value); return true } catch { return false }
      }
      const isPlain = value => {
        const proto = _getPrototypeOf(value)
        return proto === null || _getPrototypeOf(proto) === null
      }
      const standIn = value => {
        const tag = { value: _toString.call(value).slice(8, -1) }
        return _create(_create(_ObjectPrototype, { [_toStringTag]: tag }))
      }
      const copy = (value, depth, budget) => {
        if (depth > ${kzo}) {
          throw new _Error(
            'the matcher is deeper than ${kzo} levels ' +
            '(a partial of e is a few levels deep; a cycle never ends)',
          )
        }
        if (--budget.left < 0) {
          throw new _Error(
            'the matcher holds more than ${Rzo} values ' +
            '(a partial of e names a few fields)',
          )
        }
        if (typeof value === 'function') return () => {}
        if (typeof value !== 'object' || value === null) return value
        if (isRegExp(value)) {
          return new _RegExp(_source.call(value), _flags.call(value))
        }
        if (_isArray(value)) {
          const length = value.length
          const out = []
          for (let i = 0; i < length; i++) {
            out[i] = copy(value[i], depth + 1, budget)
          }
          return out
        }
        if (!isPlain(value)) return standIn(value)
        const out = {}
        for (const key of _keys(value)) {
          _defineProperty(out, key, {
            value: copy(value[key], depth + 1, budget),
            writable: true, enumerable: true, configurable: true,
          })
        }
        return out
      }
      return matcher => copy(matcher, 0, { left: ${Rzo} })
    })()`),e);
var YGo=(e)=>tp.runInContext(VC(`(() => {
      const _Object = Object
      return value => {
        try {
          return value instanceof _Object
        } catch {
          return false
        }
      }
    })()`),e);
var Wn=(e)=>JSON.stringify({href:e.href,origin:e.origin,protocol:e.protocol,username:e.username,password:e.password,host:e.host,hostname:e.hostname,port:e.port,pathname:e.pathname,search:e.search,hash:e.hash});
function ex(e){if(!Zg(e))throw TypeError("an ArrayBuffer was expected");return e};
function tx(e){if(typeof e!=="function")throw TypeError("a function was expected");return e};
function Po(e){if(!ox(e))throw TypeError("a Uint8Array was expected");return e};
function Te(e){if(typeof e!=="string")throw TypeError("a string was expected");return e};
var rp=(e)=>({root:e,byteLength:(t)=>Buffer.byteLength(Te(t),"utf8"),encodeInto:(t,o)=>{new TextEncoder().encodeInto(Te(t),Po(o))},decodeUtf8:(t,o)=>new TextDecoder("utf-8",{fatal:o===!0}).decode(Po(t)),parseUrl:(t,o)=>{let r=Te(t),n=o===void 0?o:Te(o);try{return Wn(new URL(r,n))}catch{return null}},setUrlPart:(t,o,r)=>{let n=Te(t),s=Te(o),i=Te(r);try{let p=new URL(n);return p[s]=i,Wn(p)}catch{return null}},atob:(t)=>globalThis.atob(Te(t)),btoa:(t)=>globalThis.btoa(Te(t)),randomUUID:()=>crypto.randomUUID(),fillRandom:(t)=>{crypto.getRandomValues(Po(t))},digestInto:async(t,o,r)=>{let n=tx(r),s=await crypto.subtle.digest(Te(t),Po(o));new Uint8Array(ex(n(s.byteLength))).set(new Uint8Array(s))},now:()=>performance.now()});
var nx=(e)=>ky(rp(e));
var np=({handle:e,repeat:t})=>t?clearInterval(e):clearTimeout(e);
var Vn=({pluginName:e,api:t,invoke:o,fn:r,args:n})=>{o(r,n).catch((s)=>nd().log(`${e}: ${t}: the callback threw: ${l(s)}`,"warn"))};
function ix({timers:e,id:t,fire:o}){e.delete(t),Vn(o)};
var XGo=(e,t)=>sp.runInContext(VC(xu),e)(nx(fx(t)));
function _o(e){try{return e()}catch{return!1}};
var xSn=(e)=>_o(()=>e instanceof Error);
var ip=()=>Object.create(null);
var lx=`(fn => {
  try {
    return typeof fn === 'function' &&
      Object.prototype.toString.call(fn) === '[object AsyncGeneratorFunction]'
  } catch {
    return false
  }
})`;
var dx=`(async (it, method, arg) => {
  const isObject =
    it !== null && (typeof it === 'object' || typeof it === 'function')
  if (!isObject) {
    throw new TypeError(
      'a hook on a streaming event returns its async generator; got ' +
        (it === null ? 'null' : typeof it),
    )
  }
  const pull = it[method]
  if (typeof pull !== 'function') {
    if (method === 'return') return { __proto__: null, done: true, value: arg }
    throw new TypeError(
      'a hook on a streaming event returns its async generator; got an ' +
        'object without ' + method + '()',
    )
  }
  const step = await Reflect.apply(pull, it, [arg])
  const isStep = step !== null && typeof step === 'object'
  return {
    __proto__: null,
    done: !isStep || step.done === true,
    value: isStep ? step.value : undefined,
  }
})`;
var yx=`(() => {
  const { freeze, isFrozen, keys } = Object
  const { isArray } = Array
  const Closures = Map
  const freezeDeep = value => {
    const isOpen =
      typeof value === 'object' && value !== null && !isFrozen(value)
    if (isOpen) {
      freeze(value)
      for (const key of keys(value)) freezeDeep(value[key])
    }
    return value
  }
  return (entries, local) => {
    const childrenOf = props => {
      const { children, ...rest } = props ?? {}
      const childList =
        children === undefined
          ? []
          : isArray(children)
            ? children
            : [children]
      return { rest, childList }
    }
    const isElement = node => typeof node === 'object' && node !== null
    const addressOf = node =>
      isElement(node.press) && isElement(node.props)
        ? node.press.handle + ':' + node.props.key
        : undefined
    // The slot an element keeps its closure in: a Button's onPress, an
    // Input's, Select's or Markdown's onEvent (over its onInput and
    // onSubmit, its onSelect, or its onLinkPress); none for the rest.
    const slotOfName = name =>
      name === 'Button'
        ? 'onPress'
        : name === 'Input' || name === 'Select' || name === 'Markdown'
          ? 'onEvent'
          : undefined
    // The prop a caller hands that element's closure in by.
    const givenOfName = name =>
      name === 'Input'
        ? 'onSubmit'
        : name === 'Select'
          ? 'onSelect'
          : name === 'Markdown'
            ? 'onLinkPress'
            : 'onPress'
    // Whether an element built without its closure waits for a rewire: a
    // Button, Input or Select always has one; a Markdown's is optional, so
    // one with neither onLinkPress nor pressableLinks is complete, while one
    // naming pressableLinks lost its onLinkPress crossing here and pends.
    const isPending = (name, rest) =>
      name === 'Markdown'
        ? rest.pressableLinks !== undefined &&
          typeof rest.onLinkPress !== 'function'
        : typeof rest[givenOfName(name)] !== 'function'
    const slotOf = node => slotOfName(node.type)
    const closuresOf = (node, closures) => {
      if (isArray(node)) {
        for (const child of node) closuresOf(child, closures)
      } else if (isElement(node)) {
        const slot = slotOf(node)
        const isWired = slot !== undefined && typeof node[slot] === 'function'
        const address = isWired ? addressOf(node) : undefined
        if (address !== undefined) closures.set(address, node[slot])
        closuresOf(node.children, closures)
      }
      return closures
    }
    const revive = (node, closures, root) => {
      if (isArray(node)) return node.map(child => revive(child, closures, root))
      if (!isElement(node)) return node
      const slot = slotOf(node)
      const isUnwired = slot !== undefined && typeof node[slot] !== 'function'
      if (isUnwired) {
        const address = addressOf(node)
        const held = address === undefined ? undefined : closures.get(address)
        if (held) return { ...node, [slot]: held }
        const handlers = handlersOf(root, node.type)
        const isRoot =
          !root.taken &&
          handlers !== undefined &&
          isElement(node.props) &&
          node.props.key === root.key
        if (!isRoot) return node
        root.taken = true
        const hover = isElement(node.hover) ? { hover: node.hover } : {}
        return h(node.type, { ...node.props, ...hover, ...handlers })
      }
      return node.children === undefined
        ? node
        : { ...node, children: revive(node.children, closures, root) }
    }
    // The caller's own handlers, kept to rewire the one element a foreign
    // constructor answers for them, whatever the constructor is named: a
    // Button takes the onPress, an Input the onInput / onSubmit pair, a
    // Select the onSelect.
    const rootOf = props => ({
      taken: false,
      onPress: props?.onPress,
      onInput: props?.onInput,
      onSubmit: props?.onSubmit,
      onSelect: props?.onSelect,
      onLinkPress: props?.onLinkPress,
      key:
        props?.key ??
        props?.label ??
        (typeof props?.children === 'string' ? props.children : undefined),
    })
    const handlersOf = (root, type) => {
      if (type === 'Input') {
        return typeof root.onSubmit === 'function'
          ? { onInput: root.onInput, onSubmit: root.onSubmit }
          : undefined
      }
      if (type === 'Select') {
        return typeof root.onSelect === 'function'
          ? { onSelect: root.onSelect }
          : undefined
      }
      if (type === 'Markdown') {
        return typeof root.onLinkPress === 'function'
          ? { onLinkPress: root.onLinkPress }
          : undefined
      }
      return typeof root.onPress === 'function'
        ? { onPress: root.onPress }
        : undefined
    }
    const unwired = () => {}
    const table = { __proto__: null }
    for (const [name, value] of entries) {
      const isForeign = typeof value === 'function' && !local.includes(name)
      table[name] = isForeign
        ? freeze(props =>
            freezeDeep(
              revive(
                value(props),
                closuresOf(props?.children, new Closures()),
                rootOf(props),
              ),
            ),
          )
        : value
    }
    for (const name of local) {
      table[name] = freeze(props => {
        const { rest, childList } = childrenOf(props)
        const slot = slotOfName(name)
        if (slot === undefined || !isPending(name, rest)) {
          return freezeDeep(h(name, rest, ...childList))
        }
        const given = givenOfName(name)
        const built = h(name, { ...rest, [given]: unwired }, ...childList)
        return freezeDeep({ ...built, [slot]: undefined })
      })
    }
    return freeze(table)
  }
})()`;
var Io=64;
var xx=`(() => {
  // Taken now, before any plugin runs: the global's bindings are the
  // plugin's to replace.
  const isOpen = Reflect.isExtensible
  const describe = Reflect.getOwnPropertyDescriptor
  const define = Reflect.defineProperty
  const parentOf = Reflect.getPrototypeOf
  const Refusal = TypeError
  const ABSENT = Object.freeze({
    __proto__: null,
    value: undefined,
    writable: false,
    enumerable: false,
    configurable: false,
  })
  const KEPT = Object.freeze({
    __proto__: null,
    writable: false,
    configurable: false,
  })
  const refusal = () =>
    new Refusal('the answer holds a \`then\` that cannot be fixed')
  // A trap may not report a property non-configurable, nor non-writable
  // with it, unless its target holds it so; and must then read it the same.
  const isFixed = held =>
    held !== undefined &&
    held.writable === false &&
    held.configurable === false &&
    typeof held.value !== 'function'
  const pin = answer => {
    let link = answer
    for (let hop = 0; link !== null; hop += 1) {
      // Asked first: a trap must agree with its target, and what is closed
      // stays closed, so what the next two asks learn of it stays true.
      const isClosed = !isOpen(link)
      // Of a closed target a trap may not report a property it holds absent.
      const held = describe(link, 'then')
      if (!isClosed || held !== undefined) {
        // The lookup ends at this link: an own property, absent till now or
        // kept as it is, made fixed; then asked again, the define untrusted.
        define(link, 'then', held === undefined ? ABSENT : KEPT)
        if (!isFixed(describe(link, 'then'))) throw refusal()
        return
      }
      // Only closed links are passed, each with no own \`then\` for ever. One
      // that is a Proxy may still read as it likes: unseen here, refused by
      // the host's check. A chain through Proxies may turn back on itself.
      if (hop === ${Io}) throw refusal()
      // Of a closed target a trap must answer the target's own, which is fixed.
      link = parentOf(link)
    }
  }
  return async returned => {
    const answer = await returned
    const isHeld =
      typeof answer === 'function' ||
      (typeof answer === 'object' && answer !== null)
    // From here to the envelope nothing is awaited; after the pin nothing
    // the plugin runs, now or later, changes what reading \`then\` gives.
    if (isHeld) pin(answer)
    return { __proto__: null, v: answer }
  }
})()`;
var hx=`(isError => {
  'use strict'
  const ordinary = Function.prototype[Symbol.hasInstance]
  Object.defineProperty(Error, Symbol.hasInstance, {
    value: function hasInstance(value) {
      if (this !== Error) return ordinary.call(this, value)
      try {
        if (ordinary.call(Error, value)) return true
      } catch {}
      try {
        return isError(value) === true
      } catch {
        return false
      }
    },
  })
})`;
var kx=`((pull, close, result) => {
  const stream = {
    next: () => pull(),
    return: () => close(),
    throw: error => close(undefined).then(() => { throw error }),
    [Symbol.asyncIterator]() { return this },
  }
  Object.defineProperty(stream, 'result', {
    get: () => result(),
    enumerable: true,
  })
  return Object.freeze(stream)
})`;
var ap=`(intoEnvironment => {
  'use strict'
  const FALLBACK = new Error(
    'A Claude Code call failed and its error could not be passed to the plugin',
  )
  FALLBACK.stack = String(FALLBACK.stack).split('\\n')[0]
  Object.freeze(FALLBACK)
  const converted = error => {
    let out = FALLBACK
    try {
      out = intoEnvironment(error)
    } catch {}
    return out
  }
  return hostFn => (...args) => {
    let returned
    let isThenable
    try {
      returned = hostFn(...args)
      isThenable =
        returned !== null &&
        typeof returned === 'object' &&
        typeof returned.then === 'function'
    } catch (error) {
      throw converted(error)
    }
    if (isThenable) {
      return (async () => {
        try {
          return await returned
        } catch (error) {
          throw converted(error)
        }
      })()
    }
    return returned
  }
})`;
function pp(e){let t=Xn.runInContext(VC("Error"),e),o=Function.prototype[Symbol.hasInstance];Xn.runInContext(VC(hx),e)(G0((r)=>xSn(r)||_o(()=>o.call(t,r))))};
function q7n(e,t,o){function r(s){if(xSn(s))return s;let{name:i,message:p}=e(s),a=new Oe(p===""?i:p);if(p!==""&&i!==a.name)a.thrownName=i;return a}function n(s){if(xSn(s))return t.makeError(s.name,s.message);if(s===null||typeof s!=="object"&&typeof s!=="function"||o(s))return s;let{name:p,message:a}=s;return t.makeError(typeof p==="string"?p:"Error",typeof a==="string"?a:l(s))}return{fromEnvironment:r,intoEnvironment:n}};
function fp(e){let o=typeof e==="function"||typeof e==="object"&&e!==null?e:null;for(let r=0;o!==null;r+=1){if(Sx(o))return!1;let n=Reflect.isExtensible(o),s=Reflect.getOwnPropertyDescriptor(o,"then");if(s!==void 0)return s.writable===!1&&s.configurable===!1&&typeof s.value!=="function";if(n||r===Io)return!1;o=Reflect.getPrototypeOf(o)}return!0};
function cp(e){let t=mp.runInContext(VC(xx),e);return async(o)=>{let r=await t(o);if(!fp(r.v))throw new Oe("the answer holds a `then` that is not fixed");return r}};
function sVr(e){let t=ip(),o=Fe.createContext(t,{codeGeneration:{strings:!1,wasm:!1}});pp(o),FBe(o,pbe);let r=Cjt(o),n=Fe.runInContext(VC("((self, fn, ...args) => Reflect.apply(fn, self, args))"),o),s=cp(o),i=MQ(o),p=YGo(o),a=qg(o),f=$Be(o,{arrayLengthCap:void 0}),m=j7n(o),c=XGo(o,e),{fromEnvironment:d,intoEnvironment:y}=q7n(i,c,p),u=Fe.runInContext(VC(ap),o)(G0(y));return{globals:t,context:o,makers:c,vmCall:r,vmApply:n,vmSettle:s,vmOwns:p,copyMatcher:a,vmClone:f,cloneIn:(h)=>RPe(f(h)),vmAsyncWrap:m,fromEnvironment:d,intoEnvironment:y,wrapMethod:u,vmIterate:Fe.runInContext(VC(dx),o),vmStream:Fe.runInContext(VC(kx),o),isGeneratorHook:Fe.runInContext(VC(lx),o)}};
function _x({engine:e,core:t,pluginName:o,callInterface:r,invoke:n,wrapMethod:s}){let i=e;return{engine:e,slots:i,identity:new Set(Object.keys(i)),local:t,own:new Map,isFinalized:!1,pluginName:o,callInterface:r,invoke:n,wrapMethod:s}};
function up(e,t,o){if(typeof o!=="object"||!o)throw new Oe(`${e}: $.${t} must be an object of methods, not ${typeof o}`);let r=[];for(let[n,s]of Object.entries(o)){if(typeof s!=="function")throw new Oe(`${e}: $.${t}.${n} is not a function; an interface is an object of methods (a value another plugin can call)`);r.push(n)}return r};
function Nx(e,t,o){if(typeof t!=="object"||!t)throw new Oe(`${e.pluginName}: engine.create must return $ ({ ...await next(e), <noun>: { <event>() {} } }), not ${typeof t}`);let r=Object.create(null);for(let[n,s]of Object.entries(t)){if(e.identity.has(n)){if(s===e.slots[n])continue;throw new Oe(`${e.pluginName}: engine.create returned $.${n} changed; it is this plugin's identity, not a noun`)}let p=typeof s==="object"&&s!==null?o.get(s):void 0;if(p&&p.name===n){r[n]=p.descriptor;continue}r[n]={owner:e.pluginName,methods:up(e.pluginName,n,s)},e.own.set(n,s)}return r};
function lp(e,t,o){let r={};for(let n of o.methods)r[n]=e.wrapMethod(()=>{throw new Oe(`${e.pluginName}: $.${t}.${n} is not callable from an engine.create step registered through on("*"); hook engine.create by name to compose nouns`)});return ky(r)};
var dp=new Set(["then","toJSON","constructor","valueOf","toString","inspect","nodeType","$$typeof","asymmetricMatch"]);
var No=(e)=>typeof e==="string"&&!dp.has(e);
function yp(e,t,o){let r={};for(let n of o.methods)r[n]=e.wrapMethod((...s)=>e.callInterface({owner:o.owner,name:t,method:n,args:s}));return ky(r)};
var mt=Object.freeze(Object.create(null));
function $t(e,t,o){let r=(n)=>o(()=>Promise.reject(new Oe(HVr(`${e}.${n}`,t))));return new Proxy(mt,{get:(n,s)=>No(s)?r(s):void 0})};
function zn(e,t,o){let r=Dts(o);if(r!==void 0)return $t(t,r,e.wrapMethod);if(o.owner===Sbe){let n=e.local[t];if(!n)throw new Oe(`${e.pluginName}: the interface table names core as the owner of $.${t}, which core does not provide`);return n}return yp(e,t,o)};
function Ux(e,{table:t,beneath:o,isObserving:r}){let n=Object.assign(Object.create(null),e.slots);for(let[s,i]of Object.entries(t)){let a=r&&i.withheldBy===void 0?lp(e,s,i):zn(e,s,i);n[s]=a,o.set(a,{name:s,descriptor:i})}return n};
var Bx=(e,t)=>new Proxy(mt,{get:(o,r)=>No(r)?$t(r,e,t):void 0});
var xp=(e)=>(t,o)=>{if(e.isFinalized)throw new Oe(`${e.pluginName}: $ is already built`);for(let[n,s]of Object.entries(t))e.slots[n]=zn(e,n,s);for(let[n,s]of Object.entries(o??{}))if(n!=="*"&&!Object.hasOwn(t,n)&&!e.identity.has(n))e.slots[n]=$t(n,s,e.wrapMethod);let r=o?.["*"];if(r!==void 0)Object.setPrototypeOf(e.engine,Bx(r,e.wrapMethod));Object.freeze(e.engine),e.isFinalized=!0};
var hp=(e)=>(t,o)=>async(r,n)=>{let s=o!==void 0,i=new WeakMap,p;function a(u){return p=u,Ux(e,{table:p,beneath:i,isObserving:s})}let f=async(u)=>a(await n(u)),m=async(u,...h)=>a(await kjt(u,n,h));async function c(u){if(nd().log(`hooks module ${e.pluginName}: the on("${o}") hook failed at engine.create (${l(u)}); passed on`,"warn"),p)return p;if(n.signal.aborted)throw u;return await n(r)}let d=EPe({call:e.wrapMethod(f),to:e.wrapMethod(m),signal:n.signal,is:n.is,event:n.event,origin:n.origin,trace:()=>n.trace,budget:()=>n.budget}),y;try{y=await e.invoke(t,[mt,r,d])}catch(u){if(!s)throw u;return c(u)}return Nx(e,y,i)};
function Xx(e){let t=_x(e);return{get isFinalized(){return t.isFinalized},wrap:hp(t),finalize:xp(t),call:(o,r,n)=>{let s=t.own.get(o);if(!s)return Promise.reject(new Oe(`${t.pluginName} provides no interface named ${o}`));let i=s[r];return typeof i==="function"?t.invoke(i,n,s):Promise.reject(new Oe(`$.${o} (${t.pluginName}) has no method ${r}`))}}};
var qx=(e)=>ky({value:(t,o)=>e("flag.value",{name:t,fallback:o})});
function th(e,t,o){let{register:r}=typeof e==="object"&&e?e:{};if(typeof r!=="function")throw new Oe(`${o}: ${t} exports no register(on, options) function`);return r};
function oh(e,t){let o={};for(let r of Object.keys(e)){let n=e[r],s=typeof n==="function";o[r]=s?t(n):n}return ky(o)};
var wp=(e,t)=>e===!0&&t===void 0;
var nh=(e,t)=>ky({play:(o,r)=>{let{signal:n,shouldLoop:s,gain:i}=r??{};return n!==void 0&&!xzo(n)?Promise.reject(new Oe(`${e}: $.audio.play options.signal must be an AbortSignal`)):wp(s,n)?Promise.reject(new Oe(`${e}: $.audio.play with shouldLoop needs options.signal: the clip repeats until it aborts`)):t("audio.play",{clip:o,shouldLoop:s===!0,gain:i},n)},speak:(o,r)=>t("audio.speak",{text:String(o),voice:r?.voice})});
var m7e=/^[a-zA-Z0-9_-]{1,64}$/;
var ih=(e,t)=>ky({list:()=>t("command.list",{}),register:(o)=>{let r=N(o)?{name:o.name,description:o.description,argumentHint:o.argumentHint,immediate:o.immediate}:void 0,n=r?.name;if(r===void 0||typeof n!=="string"||!m7e.test(n))return Promise.reject(new Oe(`${e}: $.command.register takes { name, description, argumentHint?, immediate? }; name is letters, digits, _ or - (up to 64)`));let{description:i,argumentHint:p,immediate:a}=r;return typeof i!=="string"||i.trim()===""?Promise.reject(new Oe(`${e}: $.command.register: ${n} needs a description (what the menu shows)`)):t("command.register",{name:n,description:i,...p!==void 0&&{argumentHint:p},...a!==void 0&&{immediate:a}})},run:(o)=>{let r=N(o)?{command:o.command,args:o.args}:void 0,n=r?.command;return typeof n!=="string"||n===""?Promise.reject(new Oe(`${e}: $.command.run takes { command, args? } (the command's name without the slash)`)):t("command.run",{command:n,args:r?.args??""})}});
var ah=(e,t)=>ky({list:()=>t("config.list",{}),set:(o)=>{let{key:r,value:n}=N(o)?{key:o.key,value:o.value}:{key:void 0,value:void 0};return typeof r!=="string"||r===""||Ojt(n)!==void 0?Promise.reject(new Oe(`${e}: $.config.set takes { key, value } (the key as $.config.list names it; the value a boolean, a string, a number or a list of strings)`)):t("config.set",{key:r,value:n})}});
var ph=(e)=>ky({get:(t)=>e("env.get",{name:t}),set:async(t,o)=>{await e("env.set",o===void 0?{name:t}:{name:t,value:o})}});
var fh=(e)=>ky({read:(t,o)=>e("fs.read",{path:t,as:o?.as??"text"}),write:(t,o)=>e("fs.write",{path:t,text:o}),list:(t=".")=>e("fs.list",{path:t}),exists:(t)=>e("fs.exists",{path:t}),stat:(t,o)=>e("fs.stat",{path:t,resolve:o?.resolve??!1}),ancestors:(t)=>e("fs.ancestors",{names:t.names,...t.of!==void 0&&{of:t.of},...t.below!==void 0&&{below:t.below}})});
var mh=(e,t)=>ky({fetch:(o,r)=>typeof o==="string"&&o!==""?t("http.fetch",{url:o,...r===void 0?{}:{init:{...r.method!==void 0&&{method:String(r.method)},...r.headers!==void 0&&{headers:{...r.headers}},...r.body!==void 0&&{body:String(r.body)},...r.auth!==void 0&&{auth:String(r.auth)},...r.socketPath!==void 0&&{socketPath:String(r.socketPath)}}}}):Promise.reject(new Oe(`${e}: $.http.fetch takes a URL`))});
var ch=(e,t,o)=>ky({call:(r,n,s={})=>t({server:r,tool:n,args:s}),connect:(r)=>o({server:r})});
var mJn=Object.freeze({input_tokens:0,output_tokens:0,cache_read_input_tokens:0,cache_creation_input_tokens:0});
var Jn=ky({isAnswered:!1,reason:"aborted",usage:ky({...mJn})});
var hh=(e)=>ky({complete:async(t,o)=>{let r=o?.signal;if(r?.aborted===!0)return Jn;try{return await e("model.complete",t,r)}catch(s){if(Boolean(r?.aborted))return Jn;throw s}},fork:(t)=>e("model.fork",t),classify:(t,o,r)=>e("model.classify",{text:t,labels:o,options:r})});
var kh=(e,t)=>ky({run:(o,r)=>e("process.run",{argv:Array.isArray(o)?[...Y(o)]:o,...r===void 0?{}:{init:N(r)?{...r.cwd!==void 0&&{cwd:r.cwd},...r.env!==void 0&&{env:N(r.env)?{...r.env}:r.env},...r.stdin!==void 0&&{stdin:r.stdin},...r.timeoutMs!==void 0&&{timeoutMs:r.timeoutMs}}:r}}),spawn:(o)=>t("process.spawn",N(o)?{argv:Array.isArray(o.argv)?[...Y(o.argv)]:o.argv,...o.cwd!==void 0&&{cwd:o.cwd},...o.env!==void 0&&{env:N(o.env)?{...o.env}:o.env},...o.input!==void 0&&{input:o.input}}:o)});
function Np(e){let{message:t,agentId:o}=e;return{message:_z(t,["type","content"]),...o!==void 0&&{agentId:o}}};
var Hp='takes { message: { type: "user" | "system", content } } (content an array of text blocks) and an optional agentId (a string)';
function wVr(e){let t=N(e)?e.message:void 0,o=N(t)&&(t.type==="user"||t.type==="system")&&Array.isArray(t.content)&&Re(t.content,N),r=N(e)&&(e.agentId===void 0||typeof e.agentId==="string"&&e.agentId!=="");return o&&r?void 0:Hp};
var qn=(e)=>(t)=>{let o=e.problemOf(t);return o!==void 0||!N(t)?Promise.reject(new Oe(`${e.name} ${o}`)):e.host(t)};
function Ut(e,t,o){let r=N(e)?e.text:void 0;return typeof r==="string"?Promise.resolve(r):Promise.reject(new Oe(`${t}: $.${o} takes { text } (a string)`))};
var Mp=(e,t)=>Ut(e,t,"prompt.fill").then((o)=>{let r=N(e)?e.mode:void 0,n=N(e)?e.decorations:void 0,s=r!==void 0&&!WSn(r);return!s&&Fa(n)?{text:o,...r!==void 0&&{mode:r},...n!==void 0&&{decorations:n}}:Promise.reject(new Oe(`${t}: $.prompt.fill `+(s?`takes { mode } of ${Fjt.join(", ")}`:GBe(n)??"takes { decorations }")))});
function jp(e){let t=N(e)?e:{},{agentId:o}=t,r=typeof o==="string",n=t.as==="api";return{...r&&{agentId:o},...n&&{as:"api"}}};
function Lp(e){if(e===void 0)return;if(!N(e))return"takes { agentId, as } or nothing";let t=Object.keys(e).filter((i)=>i!=="agentId"&&i!=="as");if(t.length>0)return`takes { agentId, as } or nothing (not ${t.join(", ")})`;let{agentId:o}=e,r=e.as,n=o===void 0||typeof o==="string"&&o!=="",s=r===void 0||r==="api";if(!n)return`takes agentId, a non-empty string (got ${String(o)})`;return s?void 0:`takes as "api" or none (got ${String(r)})`};
var Ch=(e,t)=>ky({submit:(o)=>Ut(o,e,"prompt.submit").then((r)=>{let n=r.trim()==="",s=N(o)?o.asUser:void 0;return n?Promise.reject(new Oe(`${e}: $.prompt.submit takes { text } (a non-empty prompt)`)):s!==void 0&&typeof s!=="boolean"?Promise.reject(new Oe(`${e}: $.prompt.submit takes { asUser } as a boolean`)):t("prompt.submit",s===!0?{text:r,asUser:!0}:{text:r})}),read:()=>t("prompt.read",{}),fill:(o)=>Mp(o,e).then((r)=>t("prompt.fill",r)),suggest:(o)=>Ut(o,e,"prompt.suggest").then((r)=>t("prompt.suggest",{text:r})),compose:(o)=>o===void 0||N(o)?t("prompt.compose",{...o}):Promise.reject(new Oe(`${e}: $.prompt.compose takes the facts to compose for ({ tools, traits, ... }), or nothing`))});
function Fp(e){let{to:t,text:o}=e;if(typeof t==="string")return{to:t,text:o};return{to:"sessionId"in t?{sessionId:t.sessionId}:{agentId:t.agentId},text:o}};
function $p(e){return N(e)&&Object.hasOwn(e,"sessionId")!==Object.hasOwn(e,"agentId")?e.sessionId??e.agentId:void 0};
var Qn="takes { to, text }: to a name, an agent id or an address (a non-empty string), { sessionId } or { agentId }; text a non-empty string";
function EVr(e){if(!N(e))return Qn;let{to:t,text:o}=e,r=typeof o==="string"&&o.trim()!=="",n=typeof t==="string"?t:$p(t),s=typeof n==="string"&&n.trim()!=="";return r&&s?void 0:Qn};
function Dp(e){let{breakdown:t,columns:o}=e;return{...t!==void 0&&{breakdown:t},...o!==void 0&&{columns:o}}};
function Up(e){if(e===void 0)return;let t=N(e)?Object.keys(e).filter((r)=>r!=="breakdown"&&r!=="columns"):[];return N(e)&&t.length===0?void 0:"takes { breakdown, columns } or nothing"+(t.length>0?` (not ${t.join(", ")})`:"")};
var jh=(e,t)=>ky({messages:(o)=>{let r=Lp(o);return r!==void 0?Promise.reject(new Oe(`${e}: $.session.messages ${r}`)):t("session.messages",jp(o))},cwd:()=>t("session.cwd",{}),root:()=>t("session.root",{}),model:()=>t("session.model",{}),turns:()=>t("session.turns",{}),id:()=>t("session.id",{}),repo:()=>t("session.repo",{}),surface:()=>t("session.surface",{}),surfaces:()=>t("session.surfaces",{}),authorize:()=>t("session.authorize",{}),usage:(o)=>{let r=Up(o);return r!==void 0?Promise.reject(new Oe(`${e}: $.session.usage ${r}`)):t("session.usage",N(o)?Dp(o):{})},version:()=>t("session.version",{}),send:qn({name:`${e}: $.session.send`,problemOf:EVr,host:(o)=>t("session.send",Fp(o))}),append:qn({name:`${e}: $.session.append`,problemOf:wVr,host:(o)=>t("session.append",Np(o))}),compact:(o)=>{let r=N(o)?o.instructions:void 0;return o!==void 0&&(!N(o)||r!==void 0&&typeof r!=="string")?Promise.reject(new Oe(`${e}: $.session.compact takes { instructions } (a string) or nothing`)):t("session.compact",typeof r==="string"?{instructions:r}:{})}});
var Lh=(e,t)=>ky({read:(o)=>{let r=N(o)?o.source:void 0;return o!==void 0&&!N(o)?Promise.reject(new Oe(`${e}: $.settings.read takes { source } or nothing`)):t("settings.read",r!==void 0?{source:r}:{})}});
var voe=4194304;
function Zn(e,t,o="store.set"){let r;try{r=JSON.stringify(e)}catch(n){throw new Oe(`${t}: $.${o}: value is not JSON data (${l(n)})`)}if(typeof r!=="string")throw new Oe(`${t}: $.${o}: value is not JSON data (${e===void 0?"undefined":`a ${typeof e}`})`);if(r.length>voe)throw new Oe(`${t}: $.${o}: the value is ${r.length} characters, over the ${voe} limit`);return JSON.parse(r)};
function Dh(e,t){function o(r,n){if(typeof r!=="string"||r==="")throw new Oe(`${e}: $.store.${n} takes a non-empty string key`);return r}return ky({get:async(r)=>t("store.get",{key:o(r,"get")}),set:async(r,n)=>{await t("store.set",{value:Zn(n,e),key:o(r,"set")})},delete:async(r)=>{await t("store.delete",{key:o(r,"delete")})},keys:()=>t("store.keys",{})})};
function Uh(e,t){function o(r,n){let s=N(r)?r.plugin:void 0,i=N(r)?r.key:void 0,p=N(r)?r.id:void 0;if(!(typeof s==="string"&&typeof i==="string"&&(p===void 0||typeof p==="string")))throw new Oe(`${e}: $.state.${n} takes a reference { plugin, key } (and id for a family's member)`);return p===void 0?{plugin:s,key:i}:{plugin:s,key:i,id:p}}return ky({get:async(r)=>t("state.get",o(r,"get")),set:async(r,n,s)=>t("state.set",{...o(r,"set"),value:Zn(n,e,"state.set"),...s?.ifVersion!==void 0&&{ifVersion:s.ifVersion}})})};
function ts(e,t){let o={};for(let r of t){let n=e[r];if(n!==void 0)o[r]=n}return o};
var Kh=(e,t)=>ky({log:(o)=>N(o)?t("telemetry.log",ts(o,["to","event","props","attributes","loggedAt","span"])):Promise.reject(new Oe(`${e}: $.telemetry.log takes an entry ({ to?, event, props? } or a collector record)`)),mark:(o)=>N(o)?t("telemetry.mark",ts(o,["feature","kind","reason","props"])):Promise.reject(new Oe(`${e}: $.telemetry.mark takes an entry ({ feature, kind, reason?, props? })`))});
function Gp(e){let t=N(e)?e.agentId:void 0;return typeof t==="string"?t:void 0};
var Xp="Agent";
var zp=5;
var Yp=(e,t)=>({tool:Xp,prompt:t,description:e.description??t.split(/\s+/).slice(0,zp).join(" "),run_in_background:!0,...e.model!==void 0&&{model:e.model},...e.subagentType!==void 0&&{subagent_type:e.subagentType},...e.name!==void 0&&{name:e.name},...e.cwd!==void 0&&{cwd:e.cwd}});
var Jp=["name","description","prompt","tools","disallowedTools","model","effort","permissionMode","mcpServers","hooks","maxTurns","skills","initialPrompt","memory","background","omitClaudeMd","isolation"];
var qp=(e)=>N(e)?Object.fromEntries(Jp.flatMap((t)=>{let o=e[t];if(o===void 0)return[];return[[t,Array.isArray(o)?[...Y(o)]:o]]})):void 0;
function gJn(e){let t=N(e)?e.resolvedModel:void 0;return typeof t==="string"?t:void 0};
var qh=(e,t)=>ky({list:()=>t("agent.list",{}),register:(o)=>{let r=qp(o);return r!==void 0&&typeof r.name==="string"&&m7e.test(r.name)?t("agent.register",r):Promise.reject(new Oe(`${e}: $.agent.register takes { name, description, prompt, ... }; name is letters, digits, _ or - (up to 64)`))},spawn:async(o)=>{let r=o?.prompt;if(o===void 0||typeof r!=="string"||r.trim()==="")throw new Oe(`${e}: $.agent.spawn takes { prompt, ... } (a non-empty prompt)`);let s=await t("agent.spawn",Yp(o,r)),i=s.deny??(s.isError===!0?s.text:void 0),p=Gp(s.result),a=i===void 0;return ky(a?{model:gJn(s.result)??o.model??"inherit",...p!==void 0&&{agentId:p}}:{deny:i})}});
var Qh=(e,t)=>ky({register:(o)=>{if(!N(o)||typeof o.name!=="string"||!m7e.test(o.name))return Promise.reject(new Oe(`${e}: $.tool.register takes { name, description, inputSchema? }; name is letters, digits, _ or - (up to 64)`));if(typeof o.description!=="string"||o.description.trim()==="")return Promise.reject(new Oe(`${e}: $.tool.register: ${o.name} needs a description (what the model reads)`));let s=o.inputSchema??{type:"object"};return N(s)?t("tool.register",{name:o.name,description:o.description,inputSchema:{type:"object",...s}}):Promise.reject(new Oe(`${e}: $.tool.register: ${o.name}'s inputSchema must be a JSON schema object`))},list:()=>t("tool.list",{}),call:async(o)=>{if(!N(o))throw new Oe(`${e}: $.tool.call: input must be an object`);if(typeof o.tool!=="string"||o.tool.length===0)throw new Oe(`${e}: $.tool.call takes the event's input: { tool, ...args }`);return t("tool.call",o)},check:(o)=>N(o)&&typeof o.tool==="string"&&o.tool.length>0&&N(o.input)?t("tool.check",{tool:o.tool,input:o.input}):Promise.reject(new Oe(`${e}: $.tool.check takes { tool, input }: the tool's name and its arguments, an object`))});
var Zh=(e,t)=>ky({abort:(o)=>{let r=N(o)?o.turnId:void 0;return typeof r!=="string"||r===""?Promise.reject(new Oe(`${e}: $.turn.abort takes { turnId } (the id turn.start carried)`)):t("turn.abort",{turnId:r})}});
var ek=12;
var ef=4;
var tf=2;
var tk=["Yes","No"];
var ok=120;
var of="AskUserQuestion";
function rf(e,t){let o=t??[],r=Array.isArray(o)?Number(o.length):Number.NaN,n=Number.isSafeInteger(r)&&r>=0;if(!Array.isArray(o)||!n)throw new Oe(`${e}: $.ui.ask takes its options as a list`);if(r>ef)throw new Oe(`${e}: $.ui.ask takes at most ${ef} options (got ${r})`);let s=[];s.length=r;for(let i=0;i<r;i+=1)if(i in o)s[i]=String(o[i]);return s};
function nf(e){return e.length>=tf?e:[...e,...tk.filter((o)=>!e.includes(o)).slice(0,tf-e.length)]};
function sf(e){return N(e)&&typeof e.cells==="string"&&e.source===void 0};
function af(e){let t={...e?.columns!==void 0&&{columns:e.columns},...e?.rows!==void 0&&{rows:e.rows}};return sf(e)?{requestId:e.requestId,key:e.key,cells:e.cells,...t}:{requestId:e?.requestId,key:e?.key,source:e?.source,...N(e)&&"cells"in e&&{cells:e.cells},...t}};
function fk(e,t,o){let r=(a,f)=>{t(a,f).catch((m)=>nd().log(`[${e}] $.${a} dropped: ${l(m)}`,"warn"))},n=(a,f={})=>r("ui.log",{text:String(a),to:f?.to??"transcript"}),s=(a,f={})=>{r("ui.toast",{text:String(a),...typeof f.timeoutMs==="number"&&{timeoutMs:f.timeoutMs}})},i=(a)=>{r("ui.status",{text:a===void 0||a===null?void 0:String(a)})};function p(a){let f=bi(a);if(f!==void 0)throw new Oe(`${e}: $.ui.resolve ${f}`);return o(a)}return ky({notice:(a,f)=>r("ui.notice",{tool_use_id:a,text:f}),invalidate:(a)=>r("ui.invalidate",{event:a}),blit:(a)=>t("ui.blit",af(a)),resolve:p,log:n,status:i,ask:async(a,f)=>{if(typeof a!=="string"||a.trim()==="")throw new Oe(`${e}: $.ui.ask takes the question first`);let m=Array.isArray(f)?{options:f}:f??{},c=rf(e,m.options),d=Fm(a),y=nf(c.map(Fm)),u=re(m.header??"Plugin",ek),h=await t("ui.ask",{tool:of,questions:[{question:d,header:u,options:y.map((_)=>({label:_,description:""})),multiSelect:m.multiSelect===!0}]}),A=h.result?.answers?.[d],x=(_)=>c.find((b)=>Fm(b)===_)??_;if(typeof A==="string")return x(A);if(Array.isArray(A))return A.map((_)=>x(String(_))).join(", ");throw new Oe(`${e}: $.ui.ask: no answer (${re(h.deny??h.text??"",ok)||"the dialog was dismissed"})`)},toast:s,open:(a)=>t("ui.open",{id:a?.id,...a?.title!==void 0&&{title:String(a.title)},...a?.focus!==void 0&&{focus:a.focus},...a?.closeOnEscape!==void 0&&{closeOnEscape:a.closeOnEscape},...a?.holdToasts!==void 0&&{holdToasts:a.holdToasts},...a?.rows!==void 0&&{rows:a.rows},...a?.columns!==void 0&&{columns:a.columns}}),close:(a)=>t("ui.close",{id:a?.id,origin:{kind:"plugin"}}),panes:()=>t("ui.panes",{}),scroll:(a)=>t("ui.scroll",{to:a?.to,...a?.in!==void 0&&{in:a.in},...a?.block!==void 0&&{block:a.block}}),focus:(a)=>t("ui.focus",{requestId:a?.requestId,key:a?.key}),copy:(a)=>t("ui.copy",{text:a?.text,...a?.surface!==void 0&&{surface:a.surface}})})};
function os({pluginName:e,host:t,hostStream:o,resolvedTable:r,timers:n,unloaded:s,invoke:i,wrapMethod:p,signalFrom:a,makeSignal:f}){let m=(c)=>oh(c,p);return{ui:m(fk(e,t,r)),model:m(hh(t)),audio:m(nh(e,t)),mcp:m(ch(e,(c)=>t("mcp.call",c),(c)=>t("mcp.connect",c))),session:m(jh(e,t)),prompt:m(Ch(e,t)),turn:m(Zh(e,t)),tool:m(Qh(e,t)),command:m(ih(e,t)),config:m(ah(e,t)),telemetry:m(Kh(e,t)),agent:m(qh(e,t)),fs:m(fh(t)),store:m(Dh(e,t)),state:m(Uh(e,t)),clock:m(qy({pluginName:e,host:t,live:n,unloaded:s,invoke:i,signalFrom:a,makeSignal:f})),http:m(mh(e,t)),process:m(kh(t,o)),settings:m(Lh(e,t)),env:m(ph(t)),flag:m(qx(t))}};
function uf(e,t){let{pattern:o,matcher:r}=t;if(r!==void 0){let n=h7e(o),s=n?g7e.filter((i)=>Njt(o,i,e)):[o];for(let i of s){let p=hbe(i).checkMatcher?.(r,n);if(p!==void 0)throw new Oe(`${e.pluginName}: ${i}: ${p}`)}}e.clauses=[...e.clauses,t]};
function lf({engine:e,interfaces:t,invoke:o},{pattern:r,hook:n},s){let i=s==="engine.create",p=h7e(r)?r:void 0;return i?t.wrap(n,p):async(a,f)=>await o(n,[e,a,f])};
function df({engine:e,invoke:t,stamped:o},r){let{matcher:n}=r,s=r.catch;if(s===void 0)return;return async(i,p)=>n===void 0||o(()=>_yt(n,i))?await t(s,[e,i,p]):void 0};
var yf=(e)=>e;
var gf=(e,t,o)=>EPe({call:e((r)=>kjt(r,t,o)),to:e((r,...n)=>kjt(r,t,[...n,...o])),signal:t.signal,is:t.is,event:t.event,origin:t.origin,trace:()=>t.trace,budget:()=>t.budget,caught:ISn(t)});
function xf(e){if(e.error!==void 0)throw e.error;return e.answer};
function hf({pluginName:e,wrapMethod:t},{outer:o,inner:r,pattern:n}){let s=o.matcher===void 0||r.matcher===void 0,i=o.catch===void 0&&r.catch===void 0,p=new WeakMap;async function a({e:c,passed:d},y){p.set(c,d);let u=await r.run(d,y);if(!u)throw new Oe(`${e}: the on("${n}") hook returned no result`);return u}let f=(c,d)=>EPe({...X7n(c),call:t((y)=>(d(),c(y))),to:t((y,...u)=>(d(),kjt(y,c,u)))});async function m(c,d){let y=!1,u=f(d,()=>{y=!0}),h=await Promise.resolve(o.catch?.(c,u)).then((x)=>({answer:x,error:void 0}),(x)=>({answer:void 0,error:x}));if(h.answer!==void 0||y)return xf(h);let A=await r.catch?.(p.get(c)??c,d);if(A===void 0&&h.error!==void 0)throw h.error;return A}return{run:(c,d)=>o.run(c,EPe({...X7n(d),call:t((y)=>a({e:c,passed:y},d)),to:t((y,...u)=>a({e:c,passed:y},gf(t,d,u)))})),matcher:s?void 0:[o.matcher,r.matcher],...i?{}:{catch:m}}};
function kf(e,{matcher:t,event:o,run:r}){let n=new Set,s={count:0};return(i,p)=>{if(e.stamped(()=>_yt(t,i)))return r(i,p);if(s.count>=VVr)return p(i);s.count+=1;let f=e.stamped(()=>Bjt(t,i));if(f!==void 0&&!n.has(f.path))n.add(f.path),nd().log(zVr(e.pluginName,o,f),"warn");return p(i)}};
function jo(e,{clause:t,event:o,registration:r}){let n=lf(e,t,o),s=(c,d)=>e.framed(r,()=>n(c,d)),{matcher:i}=t,a=o==="engine.create"?void 0:df(e,t),f=a===void 0?void 0:(c,d)=>e.framed(r,()=>a(c,d)),m=i===void 0?{run:s}:{run:kf(e,{matcher:i,event:o,run:s}),matcher:i};return f===void 0?m:{...m,catch:f}};
function Tf(e,t,o){let r;for(let[n,s]of e.clauses.entries()){if(!(Njt(s.pattern,t,e)&&!o.includes(n)))continue;let p=jo(e,{clause:s,event:t,registration:n});r=r===void 0?p:hf(e,{outer:r,inner:p,pattern:s.pattern})}return r};
function Ef(e,{clause:t,registration:o}){let{engine:r,invoke:n,iterate:s,stamped:i,framed:p}=e,{matcher:a}=t,f=(d)=>a===void 0||i(()=>_yt(a,d)),m=(d)=>async(y,u)=>s(f(y)?await p(o,()=>n(d,[r,y,u])):u(y)),c=t.catch;return{kind:"generator",registration:o,matcher:a,open:m(t.hook),...c!==void 0&&{catch:m(c)}}};
var bf=(e,t,o)=>e.clauses.flatMap((r,n)=>{if(!(Njt(r.pattern,t,e)&&!o.includes(n)))return[];return Ljt(r.pattern)?[Ef(e,{clause:r,registration:n})]:[{kind:"value",registration:n,hook:jo(e,{clause:r,event:t,registration:n})}]});
function _k({pluginName:e,isBuiltin:t,engine:o,interfaces:r},{invoke:n,iterate:s,streamIn:i,isGeneratorHook:p,wrapMethod:a,copyMatcher:f,stamped:m,framed:c}){let d=new Map,y=yf({pluginName:e,isBuiltin:t,engine:o,interfaces:r,clauses:[],once:new Set,registrations:{get registered(){return y.clauses.map(({pattern:u,matcher:h})=>h===void 0?{pattern:u}:{pattern:u,matcher:h})},get(u,h=[]){let A=`${u}\x00${h.join(",")}`;if(!d.has(A))d.set(A,Tf(y,u,h));return d.get(A)},streamClauses:(u,h=[])=>bf(y,u,h)},isRegistered:!1,invoke:n,iterate:s,streamIn:i,isGeneratorHook:p,wrapMethod:a,copyMatcher:f,stamped:m,framed:c});return y};
function Lo(e,t,o){let r=Ljt(t),n=e.isGeneratorHook(o);if(r&&!n)return`takes an async generator, async function* ($, e, next) { ... }: ${t} streams, its hook yields the chunks and returns the result`;return!r&&n?`takes ($, e, next) => result, not an async generator: only a streaming event named as itself (${bJn.join(", ")}) takes the generator form`:void 0};
function Sf(e,t){let{pattern:o}=t,r=`${e.pluginName}: on("${o}").catch()`;return ky({catch:e.wrapMethod((n)=>{if(e.isRegistered)throw new Oe(`${r} after register() returned: .catch() is for register()`);if(typeof n!=="function")throw new Oe(`${r} takes a function, ($, e, next)`);let s=Lo(e,o,n);if(s!==void 0)throw new Oe(`${r} ${s}`);if(t.catch!==void 0)throw new Oe(`${r} called twice: a registration takes one .catch`);if(o==="engine.create")throw new Oe(`${r}: an engine.create hook has no budget and its failure fails the load; .catch does not apply`);t.catch=n})})};
var Hk=(e)=>G0(e.wrapMethod((t,...o)=>{let{pluginName:r}=e,[n,s]=o.length===1?[void 0,o[0]]:o;if(e.isRegistered)throw new Oe(`${r}: on("${t}") after register() returned: on() is for register(); a hook may not register hooks`);let i=wJn(t);if(i!==void 0)throw new Oe(`${r}: on(): ${i}`);if(typeof s!=="function")throw new Oe(`${r}: on("${t}") takes (pattern, hook) or (pattern, matcher, hook); the hook must be a function`);let p=Lo(e,t,s);if(p!==void 0)throw new Oe(`${r}: on("${t}") ${p}`);let a=n===void 0?void 0:e.copyMatcher(n);if(a!==void 0)jts(a,`${r}: on("${t}", matcher)`);if(!(a!==void 0&&!h7e(t))){if(e.once.has(t))throw new Oe(`${r}: on("${t}") registered twice`);e.once.add(t)}let m={pattern:t,hook:s,matcher:a,catch:void 0};return uf(e,m),Sf(e,m)}));
async function czo(e){let{loaded:t,host:o,hostStream:r,resolvedTable:n,invoke:s,wrapMethod:i,signalFrom:p,makeSignal:a}=e,{modulePath:f,pluginName:m,pluginRoot:c}=e.args,d=new Set,y=!1,u={plugin:ky({name:m,root:c})};Object.setPrototypeOf(u,null);let h=Xx({engine:u,core:os({pluginName:m,host:o,hostStream:r,resolvedTable:n,timers:d,unloaded:()=>y,invoke:s,wrapMethod:i,signalFrom:p,makeSignal:a}),pluginName:m,callInterface:(x)=>o("interface.call",x),invoke:s,wrapMethod:i}),A=_k({pluginName:m,isBuiltin:jSn(e.args.pluginStorageId),engine:u,interfaces:h},e);return await s(th(t,f,m),[Hk(A),RPe(e.args.options)]),A.isRegistered=!0,{registrations:A.registrations,finalize:h.finalize,callInterface:h.call,dispose(){y=!0;for(let x of d)x.cancel();d.clear()}}};
var vf=(e,t)=>dzo({next:()=>t(e,"next"),return:()=>t(e,"return")});
var vVr=(e)=>mj(async function*(){throw new Oe(`$.${e}: this environment was made without the host's streaming ops`)}());
function CVr(e,t){return typeof t==="object"&&t!==null?e.get(t):void 0};
function AVr(e){let t=new Map,o=new Map;return{read(r){let n=t.get(Si(r));if(n!==void 0)return n;let s=o.get(r.surface)??e(szo(r.surface),r.surface);return o.set(r.surface,s),s},store(r){let n=new Map;t.clear();for(let{surface:s,component:i,answer:p}of r){let a=n.get(p)??e(p,s);n.set(p,a),t.set(Si({surface:s,component:i}),a)}}}};
var Rf=(e,t=()=>e?.environmentId??0)=>async(o)=>{function r(){if(e)Atomics.store(e.view,c7e,t())}r(),queueMicrotask(r);try{return await o}finally{r()}};
var Cf=(e,t)=>(o)=>{if(o===void 0||o===null)return;if(!xzo(o))throw new Oe(`${e}: options.signal must be an AbortSignal`);let r=new AbortController,n=t.relaySignal(o,G0((s,i)=>{let p=new Oe(i);p.name=s,r.abort(p)}));return{signal:r.signal,unlink:n}};
var Pf=(e,t=()=>e?.environmentId??0)=>(o)=>{if(!e)return o();let{view:r,environmentId:n}=e,s=Atomics.load(r,K7n);Atomics.store(r,K7n,n),Atomics.store(r,c7e,t());try{return o()}finally{Atomics.store(r,K7n,s),Atomics.store(r,c7e,s===0?t():s)}};
function TVr({vmStream:e,wrapMethod:t,cloneIn:o},r=(n)=>n){let n=(s)=>o({done:s.done===!0,value:s.value});return(s)=>e(t(async()=>n(await r(s.next()))),t(async()=>n(await r(s.return(void 0)))),t(async()=>o(await r(Og(s)))))};
function _f(e){let o=(N(e)?e:{}).surface;return APe(o)?o:void 0};
function Nf(e){let{context:t,wrapMethod:o,cloneIn:r,pluginName:n,vmClone:s}=e,i=If.runInContext(VC(yx),t),p=izo(n);return(a,f)=>{if(!N(a))return s(a);let m=Object.keys(a).filter(ju).filter((d)=>HSn.nameOf(a[d])===d),c=i(Object.entries(ozo(a,(d)=>o((y)=>r(d(y))),p(f))),m);for(let d of m){let y=c[d];if(typeof y==="function")HSn.mark(y,d)}return c}};
var Hf=(e)=>e;
function Mf(e){let{vmClone:t,cloneIn:o}=e,r=Object.freeze(t([])),n=new WeakMap;function s(i){let p=n.get(i);if(p!==void 0)return p;let{index:a,plugin:f,tier:m,event:c,outcome:d,reason:y,ms:u}=i,h=Object.freeze(Object.assign(t({index:a,plugin:f,tier:m,event:c,outcome:d,...y===void 0?{}:{reason:y},ms:u}),{received:o(i.received),returned:i.returned===void 0?void 0:o(i.returned)}));return n.set(i,h),h}return(i)=>{if(i.length===0)return r;let p=t([]);for(let[a,f]of i.entries())p[a]=s(f);return Object.freeze(p)}};
async function kVr({bare:e,args:t,host:o,bounds:r={},loaded:n,isInstallingGlobals:s}){let{pluginName:i}=t,{stamp:p,signal:a,framed:f=(v,g)=>g(),hostStream:m=vVr,blamedFor:c}=r,d=!1,y=()=>c?.()??p?.environmentId??0,u=Pf(p,y),h=Rf(p,y),A=new Map,x=0,{globals:_,context:b,vmCall:H,vmApply:S,vmSettle:R,vmOwns:I,copyMatcher:K,vmClone:M,cloneIn:F,vmAsyncWrap:X,makers:Ne,fromEnvironment:ue,intoEnvironment:Ee,wrapMethod:z,vmIterate:ye,isGeneratorHook:ge}=e;async function pe(v,g,k){if(d)throw PPe(i);try{let O=await u(()=>ye(v,g,k));return{...O,value:M(O.value)}}catch(O){throw ue(O)}}let xe=(v)=>vf(v,pe),Z=TVr(e,h);function ne(v,g){if(d)throw PPe(i);try{return u(()=>F(H(v,F(g))))}catch(k){throw ue(k)}}let j=async(v,g,k)=>{if(d)throw PPe(i);let O;try{O=u(()=>k===void 0?H(v,...g):S(k,v,...g))}catch(T){throw ue(T)}try{return(await R(O)).v}catch(T){throw ue(T)}},W=Cf(i,Ne),J=Nf({context:b,wrapMethod:z,cloneIn:F,pluginName:i,vmClone:M}),q=Mf({vmClone:M,cloneIn:F}),se=AVr(J),le=new WeakMap;function ie(v,g){let k=Ee(g);if(typeof k!=="object"||!k)return k;return le.set(k,{plugin:i,op:v,message:l(g)}),k}let $e=X(async(...v)=>{let[g,k,O]=v,T;try{return T=W(O),M(await h(o(g,k,T?.signal)))}catch(D){throw ie(g,D)}finally{T?.unlink()}}),ut=(...v)=>{let[g,k,O]=v,T=W(O),D=m(g,k,T?.signal);async function*U(){try{return yield*D}finally{T?.unlink()}}return Z(uzo(mj(U),()=>{D.return(void 0).catch(()=>{return})}))};function Bt(v){let g=v?"setInterval":"setTimeout";return G0(z((k,O,...T)=>{if(typeof k!=="function")throw new Oe(`${i}: ${g} takes a function`);if(d)throw new Oe(`${i}: ${g}: its environment was unloaded`);let D=fJn(O)?O:0,U=++x,be=Hf({pluginName:i,api:g,invoke:(te,he)=>(PSn(p?.view),j(te,he)),fn:k,args:T}),He=v?setInterval(Vn,D,be):setTimeout(ix,D,{timers:A,id:U,fire:be});return A.set(U,{handle:He,repeat:v}),U}))}let lt=G0(z((v)=>{if(typeof v!=="number")return;let g=A.get(v);if(g)A.delete(v),np(g)}));if(s)Object.assign(_,{setTimeout:Bt(!1),setInterval:Bt(!0),clearTimeout:lt,clearInterval:lt,console:KGo(z,`[${i}]`)});let Kt={...t,options:M(t.options)};a?.addEventListener("abort",ze,{once:!0});let dt;try{if(dt=await czo({loaded:await n(u),args:Kt,host:$e,hostStream:ut,resolvedTable:se.read,invoke:j,iterate:xe,streamIn:Z,isGeneratorHook:ge,wrapMethod:z,signalFrom:W,makeSignal:()=>{let{signal:v,abort:g}=Ne.makeSignal();return{signal:v,abort:(k)=>u(()=>g(Ee(k)))}},copyMatcher:K,stamped:u,framed:f}),a?.aborted===!0)throw new Oe(`${i}: unloaded while its module loaded`)}catch(v){throw ze(),v}function ze(){d=!0;for(let v of A.values())np(v);A.clear()}function Wt(v){let g=ISn(v),{signal:k,abort:O}=Ne.makeSignal();return zE(v.signal,{abort:(T)=>u(()=>O(Ee(T)))}),{signal:k,is:G0(z(v.is)),event:v.event,origin:F(v.origin),trace:z(()=>q(v.trace)),budget:z(()=>F(v.budget)),caught:g&&{...g,error:F(g.error)}}}return{activation:dt,invoke:j,invokeSync:ne,cloneIn:F,argumentFor:F,freezeForNext:RPe,nextFor:(v,g)=>{let k=g==="ui.resolve",O=(T,D)=>k?J(T,_f(D)):M(T);return EPe({...Wt(v),call:z(async(T)=>O(await h(v(T)),T)),to:z(async(T,...D)=>O(await h(kjt(T,v,D.map(M))),T))})},streamNextFor:(v)=>Y7n({...Wt(v),call:z((g)=>Z(v(M(g)))),to:z((g,...k)=>Z(iVr(M(g),v,k.map(M))))}),storeResolved:se.store,dispose:()=>{ze(),dt.dispose()},opFailureOf:(v)=>CVr(le,v),ownsValue:I}};
var _Jn=ct(Ys(),(e)=>e.set(void 0));
var Fo=(e)=>_Jn.get()?.get(e);
function xVr(e,t,o={}){let r=Fo(t.modulePath);if(r)return r(t,e,o);let n=sVr(t.pluginRoot);return kVr({bare:n,args:t,host:e,bounds:o,isInstallingGlobals:!0,loaded:(s)=>fzo({args:t,context:n.context,isScanned:!0,stamped:s})})};
var PVr=(e)=>Fo(e)!==void 0;
function hzo(e,t,o){if(!e)return o();let r=e.length-Tjt,n=Array.from({length:r},(s,i)=>Atomics.load(e,Tjt+i));for(let s=0;s<r;s++)Atomics.store(e,Tjt+s,t[s]??0);try{return o()}finally{for(let[s,i]of n.entries())Atomics.store(e,Tjt+s,i)}};
function Hts(e,t){let o=e===void 0?0:Atomics.load(e,c7e);try{return t()}finally{if(e)Atomics.store(e,c7e,o)}};
function rs(e){if(!e)return"a rejection that is not an Error";if(cw(e))return"a rejection that is not plain data";let t=Object.getOwnPropertyDescriptor(e,"message")?.value;return typeof t==="string"?t:rs(Object.getPrototypeOf(e))};
function IVr(e){return typeof e!=="object"&&typeof e!=="function"?String(e):rs(e)};
function OVr(e){let t=`${e.plugin}: `,{message:o}=e;return`${e.plugin}: $.${e.op} (not awaited): ${o.startsWith(t)?o.slice(t.length):o}`};
return {woe,BBe,ISn,JGo,ky,G0,Bo,Ko,EPe,Y7n,iVr,kjt,X7n,GG,H3,ss,is,as,ps,Un,eJn,fs,tJn,uVr,fVr,u7e,mVr,p7e,Pjt,Ijt,oJn,sJn,iJn,aJn,tpe,LQ,TPe,kPe,fj,Djt,LSn,NSn,ms,B,Re,Y,fyt,f7e,gyt,OSn,Rjt,ZGo,C,Vo,De,gt,cs,cVr,OM,d7e,xt,fe,z0,Go,Xo,Gt,zo,us,ls,Xt,ds,ht,Yo,ys,gs,xs,zt,Jo,qo,kt,Qo,ks,ezo,ws,Ts,Z7n,CPe,Ye,Yt,tr,or,rr,qb,Es,bs,Ss,Os,nr,Jt,Ce,wt,oe,Je,V,qt,WBe,tzo,Qt,sr,Zt,ir,eo,xjt,ar,vs,Cs,GBe,pr,Ps,Is,fr,mr,Ns,cr,ur,lr,dr,yr,gr,xr,hr,nJn,to,Ms,kr,js,wr,Fs,Tt,oo,Ds,Ojt,Us,Et,Bs,Ks,Er,ro,Vs,rJn,uyt,Xs,zs,qs,br,Zs,ti,HM,Sr,Or,oi,ri,ni,no,Ar,vr,si,bt,ai,pi,mi,ci,ui,li,yi,gi,hi,Ue,Rr,so,St,Be,ao,Ot,Cr,ke,Pr,po,_r,Ir,At,Nr,wi,Ti,HSn,V7n,xu,VC,mo,nzo,rzo,jr,Pu,zG,Qe,Ei,ozo,szo,Mu,ju,APe,me,bi,Si,izo,Ke,Fr,vt,Oi,MSn,cJn,dJn,uo,Ai,Dr,Rt,Hjt,Br,Kr,Wr,Vr,Gr,Xr,zr,Yr,Jr,Ct,qr,Qr,Zr,We,en,tn,Ze,lo,on,yo,uJn,rn,nn,vi,Ri,Ci,Pi,_i,Ii,go,Hi,sn,xo,ho,an,pn,Pt,_t,fn,mn,ji,Li,Fi,$i,Di,Ui,Bi,Ki,Wi,Vi,It,cn,Xi,zi,Ji,qi,Zi,Mjt,un,ln,ea,dn,Jl,Pe,yn,od,Eoe,Nt,gn,oa,xn,hn,kn,ra,wn,na,sa,pJn,Tn,En,bn,To,Sn,On,aa,pa,eu,hbe,ua,pbe,la,FBe,Cjt,MQ,$Be,Ed,j7n,UBe,Tjt,c7e,K7n,vts,PSn,Q,Ht,tt,Eo,_d,Rn,Cn,je,bo,ot,O3,ga,xa,mbe,Mt,aVr,rt,ha,ka,So,jBe,nt,_n,Oo,wa,Le,Ta,st,In,iy,Nn,Hn,jt,Ao,Ea,ba,Sa,Oa,Mn,zE,gy,lVr,Aa,va,Oy,J7n,Q7n,dyt,Ex,Pa,Ln,vo,gbe,Ro,Ia,Ge,Fy,Na,By,Cy,Ma,fJn,ja,qy,ybe,Fa,$a,$Sn,mj,pt,_be,Da,Ua,Ba,$n,yg,Wa,Va,Ga,yJn,dzo,Og,Dn,Ots,uzo,Xa,za,pzo,Co,qa,Qa,RVr,fzo,KGo,qg,YGo,Wn,ex,tx,Po,Te,rp,nx,np,Vn,ix,XGo,_o,xSn,ip,lx,dx,yx,Io,xx,hx,kx,ap,pp,q7n,fp,cp,sVr,_x,up,Nx,lp,dp,No,yp,mt,$t,zn,Ux,Bx,xp,hp,Xx,qx,th,oh,wp,nh,m7e,ih,ah,ph,fh,mh,ch,mJn,Jn,hh,kh,Np,Hp,wVr,qn,Ut,Mp,jp,Lp,Ch,Fp,$p,Qn,EVr,Dp,Up,jh,Lh,voe,Zn,Dh,Uh,ts,Kh,Gp,Xp,zp,Yp,Jp,qp,gJn,qh,Qh,Zh,ek,ef,tf,tk,ok,of,rf,nf,sf,af,fk,os,uf,lf,df,yf,gf,xf,hf,kf,jo,Tf,Ef,bf,_k,Lo,Sf,Hk,czo,vf,vVr,CVr,AVr,Rf,Cf,Pf,TVr,_f,Nf,Hf,Mf,kVr,_Jn,Fo,xVr,PVr,hzo,Hts,rs,IVr,OVr};
}
function module25(imports){
const V=imports["V"];
const xVr=imports["xVr"];
const Ex=imports["Ex"];
const Oe=imports["Oe"];
const De=imports["De"];
const N=imports["N"];
const HSn=imports["HSn"];
const Hts=imports["Hts"];
const hzo=imports["hzo"];
const ge=imports["ge"];
const gF=imports["gF"];
const EPe=imports["EPe"];
const jjt=imports["jjt"];
const EJn=imports["EJn"];
const MVr=imports["MVr"];
const kjt=imports["kjt"];
const ISn=imports["ISn"];
const l=imports["l"];
const hbe=imports["hbe"];
const _7e=imports["_7e"];
const dzo=imports["dzo"];
const ybe=imports["ybe"];
const aVr=imports["aVr"];
const uzo=imports["uzo"];
const mj=imports["mj"];
const PVr=imports["PVr"];
const yJn=imports["yJn"];
const Y7n=imports["Y7n"];
const X7n=imports["X7n"];
const iVr=imports["iVr"];
const Ots=imports["Ots"];
const Qr=imports["Qr"];
const zG=imports["zG"];
const szo=imports["szo"];
const eu=imports["eu"];
const gbe=imports["gbe"];
var L=(e)=>e==="engine"||e==="Svg";
var O=(e)=>e==="Button"||e==="Input"||e==="Select"||e==="Markdown";
var me=(e)=>!L(e)&&e!=="Client"&&e!=="Raster"&&e!=="Image"&&!O(e);
function P(e,r){let{children:t}=e;return Array.isArray(t)&&me(e.type)?t.flatMap(r):[]};
var S=(e)=>N(e)?e.plugin:void 0;
function tVr(e){if(!N(e))return[];let r=e;if(r.type!=="Client")return P(r,tVr);let{props:t}=r,o=S(r.client),n=N(t)?t.key:void 0,i=N(t)?t.module:void 0;return typeof o==="string"&&o!==""&&typeof n==="string"&&typeof i==="string"?[{plugin:o,module:i,key:n}]:[]};
function ae(e){if(!Array.isArray(e))return;let r=e.map((o)=>typeof o==="object"&&o!==null&&("value"in o)?o.value:void 0);return r.every((o)=>typeof o==="string")?r:void 0};
function TSn(e){if(typeof e!=="object"||!e||Array.isArray(e))return[];let r=e,t=r.type;if(!O(t))return P(r,TSn);let{press:o,props:n}=r;if(!(typeof o==="object"&&o!==null))return[];let{plugin:p,handle:a}=o,f=n?.key;if(!(typeof p==="string"&&typeof a==="number"&&typeof f==="string"))return[];let y=n?.pressableLinks,v=Array.isArray(y)&&y.every((w)=>typeof w==="string"),x=t==="Select"?ae(n?.options):void 0;return[{tag:t,plugin:p,handle:a,element:f,...v&&{pressableLinks:y},...x!==void 0&&{options:x}}]};
var Q=(e)=>`${e.plugin}\x00client\x00${e.key}\x00${e.module}`;
var nr=()=>({seen:new Set,groups:new Map,counted:new WeakSet});
var U7n=(e)=>`${e.plugin}\x00scope\x00${e.scope}`;
var kSn=(e)=>e==="Box"||e==="Text";
function cyt(e){let r=N(e)?e.scope:void 0;return typeof r==="string"?r:void 0};
function fe(e){let r=N(e)?e:{},{hover:t,press:o,group:n}=r,i=cyt(t),p=r.type,f=N(o)&&typeof o.handle==="number"?o:void 0,d=O(p)?f:kSn(p)?n:void 0,y=S(d);return[...i!==void 0&&typeof y==="string"&&y!==""?[{plugin:y,scope:i}]:[],...P(r,fe)]};
var wjt=String.fromCharCode(0);
var X=(e)=>["image",e.plugin,e.key??""].join(wjt);
function M(e,r,t){let o=t==="Raster",n=o?"a Raster":"an Image",i=o?"cells":"source";return`returned ${n} it did not draw (${String(r)}/${String(e)}); a render hook may keep the ones next(e) returned and change their ${i}, not which plugin or key they name`};
var ue=(e,r)=>({...e,image:{plugin:r}});
var le={stampOf:(e)=>e.image,restamp:ue,seenKeyOf:(e,r)=>{let t=e.props.key;return t===void 0||typeof t==="string"?X({plugin:r,key:t}):void 0},refusal:(e,r)=>M(e.props.key,r,"Image")};
function ce(e){if(!N(e))return[];let r=e;if(r.type!=="Image")return P(r,ce);let{props:t}=r,o=S(r.image),n=N(t)?t.key:void 0;return typeof o==="string"&&o!==""?[{plugin:o,key:typeof n==="string"?n:void 0}]:[]};
function de(e){return e==="onPress"||e==="onEvent"};
var ye=(e)=>gF(e)&&typeof e.type==="string";
var B=(e)=>typeof e==="string"||L(e.type);
var K=(e)=>O(e.type)&&("press"in e)&&N(e.press);
var xe=(e)=>kSn(e.type);
function W(e,r){let t=Object.getOwnPropertyDescriptor(e,r);return t&&"value"in t?t.value:void 0};
function Z(e,r,t){return e.set(r,t),t};
function Hr(e,r){let t=new WeakMap;function o(p){if(Array.isArray(p)){let f=W(p,"length"),d=typeof f==="number"?f:0,y=Z(t,p,[]);for(let v=0;v<d;v+=1)y[v]=i(W(p,String(v)));return y}let a=Z(t,p,{});for(let f of Object.keys(p))if(f!=="__proto__")a[f]=n(f,W(p,f));return a}function n(p,a){return!ge(a)&&typeof a==="function"&&de(p)?a:i(a)}function i(p){if(ge(p))throw new Oe(`${r}: returned a drawing that holds a Proxy; an element, its props and its hover are plain objects and arrays`);let a=Array.isArray(p)||gF(p);if(typeof p==="function")throw new Oe(`${r}: returned a drawing with a function where plain data goes; a closure rides only in an element's onPress or onEvent`);if(!a&&N(p))throw new Oe(`${r}: returned a drawing that holds an object that is not plain data (a class instance); an element, its props and its hover are plain objects and arrays`);return a?t.get(p)??o(p):p}return i(e)};
var ee=(e,r)=>`${e}\x00${r}`;
var re=(e)=>["raster",e.plugin,e.key].join(wjt);
var ke=(e,r)=>({...e,raster:{plugin:r}});
var ve={stampOf:(e)=>e.raster,restamp:ke,seenKeyOf:(e,r)=>{let t=e.props.key;return typeof t==="string"?re({plugin:r,key:t}):void 0},refusal:(e,r)=>M(e.props.key,r,"Raster")};
function we(e){if(!N(e))return[];let r=e;if(r.type!=="Raster")return P(r,we);let{props:t}=r,o=S(r.raster),n=N(t)?t.key:void 0;return typeof o==="string"&&o!==""&&typeof n==="string"?[{plugin:o,key:n}]:[]};
function U(e,r){let t=e,o="children"in t?t.children:void 0;return Array.isArray(o)?{...e,children:o.map(r)}:e};
var Te=(e,r)=>({...e,client:{plugin:r}});
function Se(e,r){let t=S(e.client),o=e.props.key,n=e.props.module;if(t===""||t===void 0)return Te(e,r.plugin);if(!(typeof t==="string"&&typeof o==="string"&&typeof n==="string"&&r.seen.has(Q({plugin:t,key:o,module:n}))))throw new Oe(`${r.plugin}: returned a Client it did not draw (${String(t)}/${String(o)} ${String(n)}); a render hook may keep the ones next(e) returned and change their props, not which plugin, key or module they name`);return e};
var Re=(e,r)=>({...e,group:{plugin:r}});
function _(e,r,t){let o=U7n(r),n=e.groups.get(o)??0;if(n<1)throw new Oe(`${e.plugin}: returned a ${t} in another plugin's hover scope that next(e) did not hand it; a render hook may keep the ones next(e) returned and restyle them, not join another plugin's group`);e.groups.set(o,n-1)};
function Ee(e,r){let t=cyt(e.hover);if(t===void 0)return e;let o=S(e.group);if(o===""||o===void 0||o===r.plugin)return Re(e,r.plugin);return _(r,{plugin:String(o),scope:t},e.type),e};
function G(e,r,t){let o=S(t.stampOf(e));if(o===""||o===void 0)return t.restamp(e,r.plugin);let i=typeof o==="string"?t.seenKeyOf(e,o):void 0;if(!(i!==void 0&&r.seen.has(i)))throw new Oe(`${r.plugin}: ${t.refusal(e,o)}`);return e};
var He=(e,r)=>G(e,r,le);
var be={Button:"a Button",Input:"an Input",Select:"a Select",Markdown:"a Markdown"};
var Pe=(e,r)=>G(e,r,ve);
function Ae(e,r,t){let o={plugin:r,handle:t};switch(e.type){case"Button":{let n={type:"Button",props:e.props,press:o};return e.hover===void 0?n:{...n,hover:e.hover}}case"Input":return{type:"Input",props:e.props,press:o};case"Select":return{type:"Select",props:e.props,press:o};case"Markdown":return{type:"Markdown",props:e.props,press:o}}};
var Ne={Button:"returned a Button without an onPress function; a render hook draws one with <Button key label onPress>",Input:"returned an Input without an onSubmit function; a render hook draws one with <Input key onSubmit>",Select:"returned a Select without an onSelect function; a render hook draws one with <Select key options onSelect>",Markdown:"returned a pressable Markdown without an onLinkPress function; a render hook draws one with <Markdown key text onLinkPress>"};
function oe(e,r){if(B(e))return e;if(e.type==="Client")return Se(e,r);if(e.type==="Raster")return Pe(e,r);if(e.type==="Image")return He(e,r);if(!K(e)){let A=xe(e)?Ee(e,r):e;return U(A,(s)=>oe(s,r))}let t=e,{press:o,onPress:n,onEvent:i}=e,a=t.type==="Button"?n:i;if(typeof o!=="object"||o===null)return e;let{handle:d,plugin:y}=o;if(typeof d!=="number")return e;if(y===""){if(typeof a!=="function")throw new Oe(`${r.plugin}: ${Ne[t.type]}`);return r.take(d,a),Ae(t,r.plugin,d)}if(typeof y!=="string"||!r.seen.has(ee(y,d)))throw new Oe(`${r.plugin}: returned ${be[t.type]} it did not draw (${String(y)}#${d}); a render hook may keep the ones next(e) returned, not address another plugin's`);let{hover:w}=t,T=cyt(w);if(T!==void 0&&y!==r.plugin)_(r,{plugin:y,scope:T},t.type);return e};
var nt=({tree:e,...r})=>oe(e,r);
var je=()=>Qr(zG,(e,r)=>szo(r));
function Ce(e){let r="kind"in e,t="value"in e;return r?"ui.input":t?"ui.select":"ui.press"};
function Fe(e){let r=e.answering.getStore();return r!==void 0&&r.isLive&&Date.now()<r.answersUntil?r.event:void 0};
var ct=(e)=>({event:Ce(e),isLive:!0,answersUntil:Date.now()+gbe});
function se(e){let r=e.serving.getStore();return r!==void 0&&e.servingLive.has(r.callId)?r.callers:[]};
function Ie(e,r,t){let{result:o,resolver:n}=t;if(De(o))throw new Oe("the ui.resolve answer is a Proxy; a table of elements is a plain object");if(!N(o))return o;let i=Object.create(null);for(let p of Reflect.ownKeys(o)){if(typeof p!=="string"||p==="then"||p==="__proto__")continue;let a=Reflect.getOwnPropertyDescriptor(o,p);if(a?.enumerable!==!0)continue;let f=a.value,d=!De(f)&&typeof f==="function",y=d&&HSn.nameOf(f)===p;i[p]=!d?void 0:y?f:(v)=>Hts(e.stamp,()=>hzo(e.stamp,[...se(e),n],()=>r.invokeSync(f,v)))}return i};
var vt=(e,r,t)=>({environments:new Map,loading:new Map,dispatching:new V,framing:new V,serving:new V,answering:new V,servingLive:new Set,hostOps:e,hostStreamOps:r,presses:new Map,taking:new Map,resolving:new Map,stamp:t});
function q({environment:e,name:r,event:t,e:o}){try{return e.argumentFor(o)}catch(n){throw new Oe(`${r}: ${t}: could not be given its argument: ${l(n)}`)}};
var j=(e,r)=>`${e}\x00${r}`;
function St(e,r,t){let o=e.taking.get(r);if(e.taking.delete(r),o===void 0)return;let n=new Set;for(let{plugin:i,handle:p}of TSn(t))for(let[a,f]of e.environments)if(f.name===i)n.add(j(a,p));for(let i of o)if(!n.has(i))e.presses.delete(i)};
function H(e,r){let t=e.environments.get(r);if(t===void 0)throw new Oe(`environment ${r} is not loaded`);return t};
function Le(e,r){let t=e.framing.getStore();return t?.environmentId===r?t.registration:void 0};
var I=(e,r)=>dzo({next:()=>r(()=>e.next()),return:()=>r(()=>e.return(void 0))});
function Y(e,r){let{name:t,nextTo:o}=e;for(let n of r)if(EJn(n)&&!o.has(n))throw new Oe(`${t}: next.to("${n}") refused: its hooks module does not spell ${MVr(n)} in a literal the scan reads (host rule)`)};
function $e(e,r,t){let{environmentId:o,name:n}=r,i=Hr(r.result,n);return ye(i)?nt({tree:i,plugin:n,seen:t.seen,groups:t.groups,take:(p,a)=>{let f=j(o,p);e.presses.set(f,a);let d=e.dispatching.getStore();if(d!==void 0)e.taking.get(d)?.add(f)}}):i};
function C(e,r,t){let{environmentId:o,event:n,resolver:i,leftOut:p}=r,{environment:a,name:f,tier:d,answersForEngine:y}=H(e,o),v=t??a.activation.registrations.get(n,p);if(!v)throw new Oe(`${f}: no ${n} handler`);let{run:x,catch:w}=v;function T(m,c){return i!==void 0?Ie(e,a,{result:m,resolver:i}):n==="ui.render"?$e(e,{environmentId:o,name:f,result:m},c):m}function b(m,{seen:c,groups:g,counted:h}){function F(k){if(n==="ui.render"&&ye(k)&&!h.has(k)){h.add(k);for(let E of TSn(k))c.add(ee(E.plugin,E.handle));for(let E of tVr(k))c.add(Q(E));for(let E of we(k))c.add(re(E));for(let E of ce(k))c.add(X(E));for(let E of fe(k)){let ie=U7n(E);g.set(ie,(g.get(ie)??0)+1)}}return k}return a.nextFor(EPe({call:async(k)=>(a.freezeForNext(jjt(k,f)),F(await m(k))),to:async(k,...D)=>(a.freezeForNext(jjt(k,f)),Y(H(e,o),D),F(await kjt(k,m,D))),signal:m.signal,is:m.is,event:m.event,origin:m.origin,trace:()=>m.trace,budget:()=>m.budget,caught:ISn(m)}),n)}let A=new WeakMap;function s(m){let c=A.get(m)??q({environment:a,name:f,event:n,e:m});return A.set(m,c),c}async function u(m,c,g){let h=nr();return T(await m(s(c),b(g,h)),h)}return{name:f,environmentId:o,tier:d,...y&&{answersForEngine:y},...w&&{catch:(m,c)=>u(w,m,c)},run:(m,c)=>u(x,m,c)}};
function Ke(e){let r=e.serving.getStore();return r!==void 0&&e.servingLive.has(r.callId)?r.callId:void 0};
var J=(e,r)=>({environmentId:r,dispatchId:e.dispatching.getStore(),registration:Le(e,r),serving:Ke(e),rootEvent:Fe(e)});
var $t=(e,r)=>(t,o,n)=>{let i=()=>e.hostOps({...J(e,r),op:t,args:o,signal:n});return ybe(t)?i():aVr(i)};
var Kt=(e,r)=>(t,o,n)=>{let i=new AbortController,p=n===void 0?i.signal:AbortSignal.any([n,i.signal]),a=I(e.hostStreamOps({...J(e,r),op:t,args:o,signal:p}),aVr);async function*f(){try{return yield*a}catch(d){if(i.signal.aborted)return;throw d}}return uzo(mj(f),()=>i.abort(new Oe(`${t}: the stream was let go`)))};
function Ut(e,r){let{environmentId:t,request:o,core:n}=r,i={surface:o.surface,component:o.component},p=H(e,t);return Ex({e:i,handlers:o.environments.filter((a)=>e.environments.has(a)).map((a)=>C(e,{environmentId:a,event:"ui.resolve",resolver:t})),site:eu["ui.resolve"],bottom:()=>Promise.resolve(n),origin:{plugin:p.name,tier:p.tier}})};
var qt=(e,r)=>{e.delete(r)};
function pe(e,r){let{environmentId:t,event:o,leftOut:n}=r,{environment:i,name:p,tier:a}=H(e,t),f=new WeakMap;function d(x){let w=f.get(x)??q({environment:i,name:p,event:o,e:x});return f.set(x,w),w}function y(x){let w=x;return i.streamNextFor(Y7n({...X7n(x),call:(T)=>(i.freezeForNext(jjt(T,p)),w(T)),to:(T,...b)=>(i.freezeForNext(jjt(T,p)),Y(H(e,t),b),iVr(T,w,b))}))}let v=(x,w)=>I(w,(T)=>e.framing.run({environmentId:t,registration:x},T));return i.activation.registrations.streamClauses(o,n).map((x)=>{if(x.kind==="value")return Ots(C(e,r,x.hook));let{registration:w}=x,T=(A)=>async(s,u)=>v(w,await A(d(s),y(u))),b=x.catch;return{name:p,environmentId:t,tier:a,run:T(x.open),...b!==void 0&&{catch:T(b)}}})};
function Xt(e,{request:r,hostNext:t,signal:o}){let{event:n,leftOut:i,environments:p}=r,a=p.flatMap((d)=>pe(e,{environmentId:d,event:n,leftOut:i?.find((y)=>y.environmentId===d)?.registrations})),f=(d,y,v=_7e)=>t(d,y,v);return{e:r.payload,handlers:a,site:hbe(n,r.raise),signal:o,bottom:f,origin:r.origin,floors:r.floors}};
function nVr({hostOps:e,hostStreamOps:r,stamp:t,createEnvironment:o}){let n=vt(e,r,t),i=o??xVr,{environments:p,loading:a,dispatching:f,framing:d,serving:y,answering:v,presses:x}=n;async function w(s,u,m){if(u==="ui.render")n.taking.set(s,new Set);let c;try{return c=await f.run(s,()=>v.run(void 0,m)),c}finally{St(n,s,c)}}let T=async(s,u,m)=>({result:await w(s.id,s.event,()=>Ex({e:s.payload,handlers:s.environments.map((c)=>C(n,{environmentId:c,event:s.event,leftOut:s.leftOut?.find((g)=>g.environmentId===c)?.registrations})),site:hbe(s.event,s.raise),signal:m,bottom:(c,g,h=_7e)=>u(c,g,h),origin:s.origin,floors:s.floors,cutAt:s.cutAt}))}),b=(s,u)=>I(u,(m)=>f.run(s,()=>v.run(void 0,m)));return{currentDispatch:()=>f.getStore(),opFailureOf:(s)=>Array.from(p.values(),(u)=>u.environment.opFailureOf(s)).find((u)=>u!==void 0),ownsValue:(s)=>Array.from(p.values()).some((u)=>u.environment.ownsValue(s)),has:(s)=>p.has(s),async load(s,u){let m=new AbortController;a.set(s,m);let c;try{c=await i($t(n,s),u,{stamp:t?{view:t,environmentId:s}:void 0,signal:m.signal,hostStream:Kt(n,s),framed:(g,h)=>d.run({environmentId:s,registration:g},h),blamedFor:()=>se(n)[0]})}finally{a.delete(s)}return p.set(s,{environment:c,name:u.pluginName,tier:u.tier,nextTo:new Set(u.scan.nextTo??[]),answersForEngine:PVr(u.modulePath)}),{registered:c.activation.registrations.registered}},unload(s){a.get(s)?.abort(),a.delete(s);let u=p.get(s);if(u)p.delete(s),n.resolving.delete(s),u.environment.dispose();for(let m of x.keys())if(m.startsWith(j(s,0).slice(0,-1)))x.delete(m)},dispatch:T,dispatchStream:(s,u,m)=>mj(b(s.id,yJn(Xt(n,{request:s,hostNext:u,signal:m})))),link:(s)=>C(n,s),linkStreams:(s)=>pe(n,s),within:w,withinSteps:b,async resolveTables(s,u){let{environment:m}=H(n,s),c=(n.resolving.get(s)??0)+1;n.resolving.set(s,c);let g=je(),h=await Promise.all(u.map(async(k)=>({surface:k.surface,component:k.component,answer:await Ut(n,{environmentId:s,request:k,core:g[k.surface]})})));if(p.get(s)?.environment===m&&n.resolving.get(s)===c)m.storeResolved(h)},build:(s,u,m)=>{H(n,s).environment.activation.finalize(u,m)},callInterface(s,{name:u,method:m,args:c},g){let{environment:h}=H(n,s);if(g)n.servingLive.add(g.callId);let F=g?setTimeout(qt,gbe,n.servingLive,g.callId):void 0;function k(){if(clearTimeout(F),g)n.servingLive.delete(g.callId)}let D=()=>hzo(t,g?.callers??[],()=>h.activation.callInterface(u,m,h.cloneIn(c)));try{return d.run(void 0,()=>v.run(void 0,()=>y.run(g,D))).finally(k)}catch(E){throw k(),E}},press(s,u,m){let{environment:c}=H(n,s),g=x.get(j(s,u));if(g===void 0)return Promise.reject(new Oe(`ui.press/ui.input/ui.select: no handler is held under handle ${u}`));let h=ct(m);return d.run(void 0,()=>v.run(h,()=>c.invoke(g,[c.cloneIn(m)]).then(()=>{return}).finally(()=>{h.isLive=!1})))},releasePresses:(s,u)=>{for(let m of u)x.delete(j(s,m))}}};
function WG(e,r){let t=e.get(r);return e.delete(r),t};
var B7n=0;
var rVr=2;
var oVr=1;
var Ets=3;
return {L,O,me,P,S,tVr,ae,TSn,Q,nr,U7n,kSn,cyt,fe,wjt,X,M,ue,le,ce,de,ye,B,K,xe,W,Z,Hr,ee,re,ke,ve,we,U,Te,Se,Re,_,Ee,G,He,be,Pe,Ae,Ne,oe,nt,je,Ce,Fe,ct,se,Ie,vt,q,j,St,H,Le,I,Y,$e,C,Ke,J,$t,Kt,Ut,qt,pe,Xt,nVr,WG,B7n,rVr,oVr,Ets};
}
function module26(imports){
const S=imports["S"];
const Ujt=imports["Ujt"];
const nVr=imports["nVr"];
const Oe=imports["Oe"];
const $Sn=imports["$Sn"];
const zE=imports["zE"];
const Syt=imports["Syt"];
const l=imports["l"];
const IVr=imports["IVr"];
const OVr=imports["OVr"];
const PSn=imports["PSn"];
const WG=imports["WG"];
const oVr=imports["oVr"];
const rVr=imports["rVr"];
const qVr=imports["qVr"];
const YVr=imports["YVr"];
const B7n=imports["B7n"];
var N=(o)=>({post:(t)=>o.postMessage(t),ports:new Map,pendingNext:new Map,pendingSteps:new Map,streams:new Map,nextCounter:0,opCounter:0});
function F(o,t){let r=o.opFailureOf(t);if(!r)return IVr(t);return OVr(r)};
var L=(o,t)=>{process.on("unhandledRejection",(r)=>o.post({type:"unhandled",error:F(t,r)}))};
var w=({pending:o,key:t,send:r,onAbort:m,signal:g,notPlainMessage:u})=>new Promise((y,k)=>{let h=()=>{};o.set(t,{resolve:(i)=>{h(),y(i)},reject:(i)=>{h(),k(i)}});try{r()}catch(i){o.delete(t),k(new Oe(u(i)));return}h=zE(g,{abort:m})});
var D=(o,t)=>(r,m,g)=>{let u=++o.nextCounter;return w({pending:o.pendingNext,key:`${t}:${u}`,send:()=>o.post({type:"next",id:t,nextId:u,argument:r,floors:g}),onAbort:()=>o.post({type:"next_abort",id:t,nextId:u,reason:Syt(m)}),signal:m,notPlainMessage:(y)=>`next() argument is not plain data: ${l(y)}`})};
function B(o,{environmentId:t,op:r,args:m,signal:g,dispatchId:u,registration:y,serving:k,rootEvent:h}){let i=o.ports.get(t);if(!i)return Promise.reject(new Oe(`${r}: the plugin's environment is unloaded`));let{port:v}=i,d=++o.opCounter;if(u!==void 0&&!$Sn(r))i.owedOps.set(d,u);return w({pending:i.pendingOps,key:d,send:()=>v.postMessage({type:"op",opId:d,dispatchId:u,registration:y,serving:k,rootEvent:h,op:r,args:m}),onAbort:g?()=>v.postMessage({type:"op_abort",opId:d,reason:Syt(g)}):()=>{},signal:g,notPlainMessage:(x)=>`${r}: arguments are not plain data: ${l(x)}`})};
var U=(o,t)=>(r,m,g)=>{let u=++o.nextCounter,y=!1,k=!1,h=()=>w({pending:o.pendingSteps,key:`${t}:${u}`,send:()=>{o.post({type:"next_pull",id:t,nextId:u,...y?{}:{open:{argument:r,floors:g}}}),y=!0},onAbort:()=>o.post({type:"next_abort",id:t,nextId:u,reason:Syt(m)}),signal:m,notPlainMessage:(i)=>`next() argument is not plain data: ${l(i)}`});return async function*(){try{while(!0){let i=await h().catch((v)=>{throw k=!0,v});if(i.done)return k=!0,i.value;yield i.value}}finally{if(y&&!k)o.post({type:"next_close",id:t,nextId:u})}}()};
var q=(o,{environmentId:t,op:r,args:m,signal:g,dispatchId:u,registration:y,serving:k,rootEvent:h})=>async function*(){let i=()=>new Oe(`${r}: the plugin's environment is unloaded`),v=o.ports.get(t);if(!v)throw i();let{port:d,pendingOps:x,owedOps:n}=v,e=++o.opCounter,p={dispatchId:u,registration:y,serving:k,rootEvent:h,op:r,args:m},a=!1,s=!1;function c(){if(o.ports.get(t)!==v)return Promise.reject(i());if(u!==void 0)n.set(e,u);return w({pending:x,key:e,send:()=>{d.postMessage({type:"op_pull",opId:e,...a?{}:{open:p}}),a=!0},onAbort:g?()=>d.postMessage({type:"op_abort",opId:e,reason:Syt(g)}):()=>{},signal:g,notPlainMessage:(f)=>`${r}: arguments are not plain data: ${l(f)}`})}try{while(!0){let f=await c().catch((b)=>{throw s=!0,b});if(f.done)return s=!0,f.value;yield f.value}}finally{if(a&&!s)d.postMessage({type:"op_close",opId:e})}}();
function H(o,t){if(o)Atomics.store(o,B7n,Math.max(Atomics.load(o,B7n),t))};
function R(o,t,r){let m=(t.get(r)??0)+1;if(t.set(r,m),o)Atomics.store(o,oVr,r),Atomics.store(o,rVr,m)};
function W(o){for(let t of o.pendingOps.values())t.reject(new Oe("the plugin's environment was unloaded"));o.pendingOps.clear()};
function M(o,t){if(!(typeof o==="object"&&o!==null&&(t in o)))return;let m=Object.getOwnPropertyDescriptor(o,t)?.value;return m instanceof SharedArrayBuffer?new Int32Array(m):void 0};
function K(o){let t=N(o),{post:r,ports:m,pendingNext:g,pendingSteps:u,streams:y}=t,k=new Map,h=M(S,"stamp"),i=M(S,"marks"),v=new Map;Ujt({log:(x,n)=>r({type:"log",text:x,level:n}),hookFailed:(x)=>r({type:"hook_failed",...x})});let d=nVr({hostOps:(x)=>B(t,x),hostStreamOps:(x)=>q(t,x),stamp:h});L(t,d),o.onmessage=(x)=>{let n=x.data;if(n.type==="ping"){r({type:"pong",n:n.n});return}switch(PSn(h),n.type){case"load":{let{environmentId:e,port:p}=n,a=new Map,s=new Map;m.set(e,{port:p,pendingOps:a,owedOps:s}),p.onmessage=(c)=>{let f=c.data;if(PSn(h),f.type==="flush"){p.postMessage({type:"flushed",flushId:f.flushId});return}let b=WG(s,f.opId);if(b!==void 0)R(i,v,b);let E=WG(a,f.opId);f.type==="op_result"?E?.resolve(f.value):E?.reject(new Oe(f.error))},d.load(e,n.args).then((c)=>{r({type:"loaded",environmentId:e,registered:qVr(c.registered)})},(c)=>{m.delete(e),p.close();let f=YVr(c);r({type:"load_error",environmentId:e,error:l(c),...f!==void 0&&{cause:f}})});return}case"unload":{d.unload(n.environmentId);let e=WG(m,n.environmentId);if(e)e.port.close(),W(e);return}case"build":{let{environmentId:e}=n;try{d.build(e,n.table,n.suppressed),r({type:"built",environmentId:e})}catch(p){r({type:"built_error",environmentId:e,error:l(p)})}return}case"resolve":{let{resolveId:e,environmentId:p,requests:a}=n;Promise.resolve().then(()=>d.resolveTables(p,a)).then(()=>r({type:"resolved",resolveId:e}),(s)=>r({type:"resolve_error",resolveId:e,error:l(s)}));return}case"call":{let{callId:e,environmentId:p,call:a,callers:s}=n;Promise.resolve().then(()=>d.callInterface(p,a,{callId:e,callers:s})).then((c)=>{try{r({type:"call_result",callId:e,value:c})}catch(f){r({type:"call_error",callId:e,error:`$.${a.name}.${a.method} returned a value that is not plain data: ${l(f)}`})}},(c)=>r({type:"call_error",callId:e,error:l(c)}));return}case"dispatch":{let{id:e,event:p,payload:a,environments:s,leftOut:c,origin:f,raise:b,floors:E,cutAt:_}=n;H(i,e);let A=new AbortController;k.set(e,A),Promise.resolve().then(()=>d.dispatch({id:e,event:p,payload:a,environments:s,leftOut:c,origin:f,raise:b,floors:E,cutAt:_},D(t,e),A.signal)).then((P)=>{try{r({type:"result",id:e,...P})}catch(I){r({type:"error",id:e,error:`result not cloneable: ${l(I)}`})}},(P)=>r({type:"error",id:e,error:l(P)})).finally(()=>{k.delete(e),v.delete(e)});return}case"dispatch_stream":{let{id:e,type:p,...a}=n;H(i,e);let s=new AbortController;k.set(e,s);try{y.set(e,d.dispatchStream({id:e,...a},U(t,e),s.signal))}catch(c){k.delete(e),v.delete(e),r({type:"error",id:e,error:l(c)})}return}case"stream_pull":{let a=function(){y.delete(e),k.delete(e),v.delete(e)},{id:e}=n,p=y.get(e);if(p===void 0){r({type:"error",id:e,error:"no stream is open for this dispatch"});return}p.next().then((s)=>{if(s.done===!0)a();try{r({type:"stream_step",id:e,step:{done:s.done===!0,value:s.value}})}catch(c){a(),p.return(void 0).catch(()=>{return}),r({type:"error",id:e,error:`a chunk that is not plain data: ${l(c)}`})}},(s)=>{a(),r({type:"error",id:e,error:l(s)})});return}case"stream_close":{let e=y.get(n.id);y.delete(n.id),k.delete(n.id),e?.return(void 0).catch(()=>{return});return}case"next_step":{R(i,v,n.id),WG(u,`${n.id}:${n.nextId}`)?.resolve(n.step);return}case"abort":k.get(n.id)?.abort(new Oe(n.reason));return;case"press":{let{pressId:e,environmentId:p,handle:a,e:s}=n;Promise.resolve().then(()=>d.press(p,a,s)).then(()=>r({type:"press_result",pressId:e}),(c)=>r({type:"press_error",pressId:e,error:l(c)}));return}case"press_release":d.releasePresses(n.environmentId,n.handles);return;case"next_result":case"next_error":{R(i,v,n.id);let e=`${n.id}:${n.nextId}`,p=WG(g,e);if(n.type==="next_result")p?.resolve(n.result);else{let s=new Oe(n.error);p?.reject(s),WG(u,e)?.reject(s)}return}}}};
return {N,F,L,w,D,B,U,q,H,R,W,M,K};
}
const m0=module0({});
const m1=module1({"Ie":embeddedRequire287});
const m2=module2({"gee":m0["gee"],"mee":m0["mee"],"is":m0["is"],"nB":m0["nB"],"tEt":m0["tEt"],"IL":m0["IL"],"Tir":m0["Tir"],"iv":m0["iv"],"Wet":m0["Wet"],"nEt":m0["nEt"],"eme":m0["eme"],"Get":m0["Get"],"io":m1["io"]});
const m3=module3({"u6e":m2["u6e"],"iv":m0["iv"],"sie":m2["sie"],"iee":m2["iee"],"l6e":m2["l6e"],"eme":m0["eme"],"Bfe":m2["Bfe"],"FOe":m2["FOe"],"csr":m2["csr"],"Ufe":m2["Ufe"],"psr":m2["psr"],"Ewt":m2["Ewt"],"usr":m2["usr"],"bwt":m2["bwt"],"wwt":m2["wwt"],"fsr":m2["fsr"],"TL":m2["TL"]});
const m4=module4({"o3t":m2["o3t"],"s3t":m2["s3t"],"vb":m2["vb"],"a6e":m2["a6e"],"nB":m0["nB"],"bwt":m2["bwt"],"uor":m3["uor"],"_sr":m2["_sr"],"zr":m3["zr"],"TL":m2["TL"]});
const m5=module5({"N":m4["N"]});
const m6=module6({"D":builtin0,"N":m4["N"],"W":builtin0,"Oe":m5["Oe"]});
const m7=module7({});
const m8=module8({});
const m9=module9({});
const m10=module10({"bn":m9["bn"]});
const m11=module11({});
const m12=module12({"v":m1["v"]});
const m13=module13({});
const m14=module14({});
const m15=module15({"Oe":m5["Oe"],"Ag":m4["Ag"],"Ie":m1["Ie"],"fr":builtin1,"nr":builtin2,"tr":builtin3,"$n":builtin4,"Fn":builtin5,"oZe":m4["oZe"],"yn":builtin4,"ir":builtin6,"Tn":builtin7,"An":builtin1,"On":builtin4,"Nn":builtin5,"vn":builtin8,"pYr":m4["pYr"],"Sn":builtin9,"l":m10["l"],"w7e":m12["w7e"],"vr":builtin2,"Ss":builtin3,"vs":builtin1,"Tr":builtin4,"ws":builtin5,"_":m13["_"],"pnr":m4["pnr"],"Vt":m14["Vt"],"re":m14["re"]});
const m16=module16({"v":m1["v"]});
const m17=module17({});
const m18=module18({});
const m19=module19({"g9r":m17["g9r"],"eee":m18["eee"],"mO":m18["mO"],"f9r":m17["f9r"]});
const m20=module20({"FIe":m19["FIe"]});
const m21=module21({});
const m22=module22({});
const m23=module23({});
const m24=module24({"ct":m0["ct"],"Ys":m7["Ys"],"Fe":builtin10,"Xn":builtin10,"ce":builtin10,"mp":builtin10,"Sx":builtin0,"Oe":m5["Oe"],"tp":builtin10,"ep":builtin10,"kzo":m6["kzo"],"Rzo":m6["Rzo"],"JA":m8["JA"],"sp":builtin10,"ox":builtin11,"Zg":builtin12,"fx":builtin2,"l":m10["l"],"RPe":m6["RPe"],"PPe":m5["PPe"],"xzo":m5["xzo"],"If":builtin10,"L":m11["L"],"nd":m6["nd"],"N":m4["N"],"fo":builtin10,"Dts":m15["Dts"],"HVr":m15["HVr"],"Sbe":m15["Sbe"],"Fm":m14["Fm"],"re":m14["re"],"_z":m4["_z"],"WSn":m15["WSn"],"Se":m1["Se"],"AJn":m16["AJn"],"Fjt":m15["Fjt"],"La":builtin13,"Njt":m15["Njt"],"h7e":m15["h7e"],"_yt":m6["_yt"],"VVr":m6["VVr"],"Bjt":m6["Bjt"],"zVr":m6["zVr"],"Ljt":m15["Ljt"],"jSn":m15["jSn"],"wJn":m15["wJn"],"bJn":m15["bJn"],"jts":m6["jts"],"g7e":m15["g7e"],"hyt":m15["hyt"],"USn":m15["USn"],"Mts":m15["Mts"],"KF":m4["KF"],"YF":m4["YF"],"di":m4["di"],"Szo":m15["Szo"],"Xl":builtin5,"_zo":m15["_zo"],"jQ":m20["jQ"],"nu":m4["nu"],"wf":m14["wf"],"gF":m6["gF"],"G":m11["G"],"Jm":builtin2,"Bn":builtin2,"Ya":builtin10,"Kn":builtin10,"vJn":m15["vJn"],"S7e":m15["S7e"],"Gg":builtin2,"NVr":m15["NVr"],"bzo":m15["bzo"],"Za":builtin1,"wzo":m15["wzo"],"$ts":m15["$ts"],"GSn":m15["GSn"],"Czo":m15["Czo"],"Azo":m15["Azo"],"Ug":builtin14,"Dg":builtin3,"_7e":m15["_7e"],"Lts":m15["Lts"],"Md":builtin0,"jjt":m5["jjt"],"yyt":m15["yyt"],"EJn":m15["EJn"],"Nts":m15["Nts"],"npe":m15["npe"],"Vd":builtin15,"at":m10["at"],"Syt":m5["Syt"],"Ng":m10["Ng"],"ee":m21["ee"],"cw":builtin0,"io":m1["io"],"JEn":m22["JEn"],"XVr":m23["XVr"],"HIe":m22["HIe"],"xPe":m6["xPe"],"FQ":m6["FQ"],"Lwe":m4["Lwe"]});
const m25=module25({"V":builtin15,"xVr":m24["xVr"],"Ex":m24["Ex"],"Oe":m5["Oe"],"De":builtin0,"N":m4["N"],"HSn":m24["HSn"],"Hts":m24["Hts"],"hzo":m24["hzo"],"ge":builtin0,"gF":m6["gF"],"EPe":m24["EPe"],"jjt":m5["jjt"],"EJn":m15["EJn"],"MVr":m15["MVr"],"kjt":m24["kjt"],"ISn":m24["ISn"],"l":m10["l"],"hbe":m24["hbe"],"_7e":m15["_7e"],"dzo":m24["dzo"],"ybe":m24["ybe"],"aVr":m24["aVr"],"uzo":m24["uzo"],"mj":m24["mj"],"PVr":m24["PVr"],"yJn":m24["yJn"],"Y7n":m24["Y7n"],"X7n":m24["X7n"],"iVr":m24["iVr"],"Ots":m24["Ots"],"Qr":m2["Qr"],"zG":m24["zG"],"szo":m24["szo"],"eu":m24["eu"],"gbe":m24["gbe"]});
const m26=module26({"S":builtin16,"Ujt":m6["Ujt"],"nVr":m25["nVr"],"Oe":m5["Oe"],"$Sn":m24["$Sn"],"zE":m24["zE"],"Syt":m5["Syt"],"l":m10["l"],"IVr":m24["IVr"],"OVr":m24["OVr"],"PSn":m24["PSn"],"WG":m25["WG"],"oVr":m25["oVr"],"rVr":m25["rVr"],"qVr":m6["qVr"],"YVr":m5["YVr"],"B7n":m25["B7n"]});
export const startHooksWorker287=m26.K;
export const hooksWorkerStampLength287=m24.vts;
export const hooksWorkerMarksLength287=m25.Ets;
