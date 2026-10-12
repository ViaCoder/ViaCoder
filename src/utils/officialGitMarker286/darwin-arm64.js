// Generated from verified official 2.1.286 darwin-arm64; do not edit.
function make_m_chunk_h730kz80_js({}){
function v(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return}
function G(n){return v(n)==="ENOENT"}
return {G,v}
}
function make_m_chunk_p4g2kckh_js({f,st,G,hn,Dt,et}){
function it(t,e){return t}
function Pn(t){return/^[\\/]{2}/.test(t)||MO(t)}
function ax(t){if(/^[\\/]{2}[?.][\\/](?!unc[\\/])/i.test(t))return null;return t.match(/^[\\/]{2}(?:[?.][\\/]unc[\\/])?([^\\/]+)/i)?.[1]?.replace(/[A-Z]/g,(e)=>e.toLowerCase())??null}
function ua(t){return/(^|[\\/])\.{1,2}[. ]*([\\/]|$)/.test(t)}
function Pv(t){return/^[\\/]{2}[?.][\\/]/.test(t)}
function gS(t){if(!/\/\.(?:vol|file|nofollow|resolve)(?:\/|$)/i.test(t))return!1;if(!t.startsWith("/"))return!1;let e=[];for(let n of t.split("/")){if(n===""||n===".")continue;if(n===".."){e.pop();continue}if(e.push(n),e.length===1&&/^\.(?:vol|file|nofollow|resolve)$/i.test(n))return!0}return!1}
function UQ(t,e){if(!Pn(t))return!1;if(Pv(t)||MO(t))return!0;if(ua(t))return!0;let n=ax(t);return n===null||n!==ax(e)}
function C(t){return t.length===2&&kk(t[0])==="net"||t.length===3&&kk(t[0])==="network"&&kk(t[1])==="servers"}
function b8(t){if(!t.startsWith("/"))return null;let e=[];for(let n of t.split("/")){if(n===""||n===".")continue;if(n===".."){e.pop();continue}if(e.push(n),C(e))return O(n)}return null}
function O(t){return t.replace(/[A-Z]/g,(e)=>e.toLowerCase())}
function kk(t){return t.replace(/[\u200c-\u200f\u202a-\u202e\u206a-\u206f\ufeff]/g,"").toUpperCase().toLowerCase()}
function DO(t,e){if(gS(t))return!0;if(ea(t)){let n=b8(t);if(n===null||n!==b8(e))return!0}return ctr(t,e)}
function Pi(t,e){let n=f(e,t);if(UQ(t,e)||UQ(n,e))return!0;let r=b8(e);for(let o of[t,n]){if(ea(o)){let i=b8(o);if(i===null||i!==r)return!0}if(xF(o)||s_(o)||gS(o)||ctr(o,e))return!0}return!1}
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
var An=["usr/local","usr/libexec/cups","usr/share/snmp","AppleInternal","Applications","Library","Users","Volumes","cores","home","media","mnt","opt","pkg","private","sw"];
function PF(t){let e=t.split("/");if(e.length<5||e[0]!==""||N(e[1]??"")!=="system"||N(e[2]??"")!=="volumes"||N(e[3]??"")!=="data")return t;let n=e.slice(4);for(let r of An){let o=r.split("/");if(n.length<o.length)continue;if(o.every((i,s)=>N(n[s]??"")===N(i)))return"/"+n.join("/")}return t}
function N(t){return t.toUpperCase().toLowerCase()}
function MO(t){return zt.test(t)||t.includes("??")&&zt.test(qt(t))}
var zt=/^[\\/]\?\?[\\/]/;
function qt(t){return et.win32?et.win32.normalize(t):t}
return {Pi,DO,xF}
}
function make_m_chunk_w2ah3m38_js({Jt,Pi,Zt,be,O,ye,x,DO,xF,ns,es,v}){
function je(e,n){try{let r=Jt(e);if(r.isSymbolicLink()){let o=l6t(e);if(o===null)return!1;if(Pi(o,n))return!1;if(jh(o,n))return!1;let s=Zt(e);return s.isDirectory()||s.isFile()}return r.isDirectory()||r.isFile()}catch{return!1}}
function gn(e){try{let n=es(e);if(n.isSymbolicLink())return"symlink";return n.isFile()?"file":n.isDirectory()?"dir":"special"}catch(n){let r=v(n);return r==="ENOENT"||r==="ENOTDIR"?"absent":"other"}}
function l6t(e){try{let n=ns(e,{encoding:"buffer"}),r=n.toString("utf-8");if(r.includes("\x00")||!Buffer.from(r,"utf-8").equals(n))return null;return r}catch{return null}}
function ms(e,n){return Pi(e,n)}
var hs=/\/+/;
var bs=/\/$/;
var mn=/^\//;
var Rs=/^\//;
function ce(e,n,r=40,o=n,s=!1){if(r<=0)return!1;let i=Rs.exec(e),a=i?i[0]:"",u=e.slice(a.length).split(hs);for(let f=0;f<u.length;f++){let h=u[f];if(h===""||h===".")continue;if(h===".."){a=ye(a);continue}if(a=x(a,h),DO(a,o)||xF(a))return!1;let R=gn(a);if(R==="other"||R==="special"&&!s)return!1;if(R==="symlink"){let b=l6t(a);if(b===null)return!1;if(ms(b,ye(a)))return!1;let c=mn.test(b)?b:ye(a)+be+b,g=u.slice(f+1).join(be),E=g?bs.test(c)?c+g:c+be+g:c;return ce(E,n,r-1,o,s)}}return!0}
function X(e,n,r=n,o=!1){if(!ce(mn.test(e)?e:n+be+e,n,void 0,r,o))return!0;return!ce(O(n,e),n,void 0,r,o)}
function jh(e,n,r=n){return X(e,n,r)}
return {je}
}
export function createGitMarker286(ports){
const m_chunk_h730kz80_js=make_m_chunk_h730kz80_js({})
const m_chunk_p4g2kckh_js=make_m_chunk_p4g2kckh_js({f:ports["path"]["resolve"],st:ports["os"]["homedir"],G:m_chunk_h730kz80_js.G,hn:ports["fs"]["readFileSync"],Dt:ports["fs"]["statSync"],et:ports["path"]})
const m_chunk_w2ah3m38_js=make_m_chunk_w2ah3m38_js({Jt:ports["fs"]["lstatSync"],Pi:m_chunk_p4g2kckh_js.Pi,Zt:ports["fs"]["statSync"],be:ports["path"]["sep"],O:ports["path"]["resolve"],ye:ports["path"]["dirname"],x:ports["path"]["join"],DO:m_chunk_p4g2kckh_js.DO,xF:m_chunk_p4g2kckh_js.xF,ns:ports["fs"]["readlinkSync"],es:ports["fs"]["lstatSync"],v:m_chunk_h730kz80_js.v})
return m_chunk_w2ah3m38_js.je
}
