// Generated from verified official 2.1.286 linux-arm64; do not edit.
function make_m_chunk_6wzwv598_js({f,rt,Q}){
function Pn(t){return/^[\\/]{2}/.test(t)||OM(t)}
function rx(t){if(/^[\\/]{2}[?.][\\/](?!unc[\\/])/i.test(t))return null;return t.match(/^[\\/]{2}(?:[?.][\\/]unc[\\/])?([^\\/]+)/i)?.[1]?.replace(/[A-Z]/g,(e)=>e.toLowerCase())??null}
function ua(t){return/(^|[\\/])\.{1,2}[. ]*([\\/]|$)/.test(t)}
function xk(t){return/^[\\/]{2}[?.][\\/]/.test(t)}
function mb(t){if(!/\/\.(?:vol|file|nofollow|resolve)(?:\/|$)/i.test(t))return!1;if(!t.startsWith("/"))return!1;let e=[];for(let n of t.split("/")){if(n===""||n===".")continue;if(n===".."){e.pop();continue}if(e.push(n),e.length===1&&/^\.(?:vol|file|nofollow|resolve)$/i.test(n))return!0}return!1}
function OQ(t,e){if(!Pn(t))return!1;if(xk(t)||OM(t))return!0;if(ua(t))return!0;let n=rx(t);return n===null||n!==rx(e)}
function C(t){return t.length===2&&TC(t[0])==="net"||t.length===3&&TC(t[0])==="network"&&TC(t[1])==="servers"}
function p9(t){if(!t.startsWith("/"))return null;let e=[];for(let n of t.split("/")){if(n===""||n===".")continue;if(n===".."){e.pop();continue}if(e.push(n),C(e))return O(n)}return null}
function O(t){return t.replace(/[A-Z]/g,(e)=>e.toLowerCase())}
function TC(t){return t.replace(/[\u200c-\u200f\u202a-\u202e\u206a-\u206f\ufeff]/g,"").toUpperCase().toLowerCase()}
function PM(t,e){if(mb(t))return!0;if(ea(t)){let n=p9(t);if(n===null||n!==p9(e))return!0}return Ber(t,e)}
function Pi(t,e){let n=f(e,t);if(OQ(t,e)||OQ(n,e))return!0;let r=p9(e);for(let o of[t,n]){if(ea(o)){let i=p9(o);if(i===null||i!==r)return!0}if(b$(o)||o_(o)||mb(o)||Ber(o,e))return!0}return!1}
function Ber(t,e,n="linux",r=n==="darwin"&&!0){if(n!=="darwin"||!gW(t,n,r))return!1;let o=tt(e,n,r).complete[0]??null,{complete:i,partial:s}=tt(t,n,r);if(i.length===0&&s.length===0)return!0;if(o===null)return!0;return i.some((a)=>a!==o)||s.some((a)=>!o.startsWith(a))}
var fn=6;
function tt(t,e,n){let r=[],o=[];if(!t.startsWith("/"))return{complete:r,partial:o};let i=[];for(let s of t.split("/")){if(s===""||s===".")continue;if(s===".."){i.pop();continue}if(i.push(s),i.length>fn)continue;let a="/"+i.join("/"),u=(e==="darwin"?JB(a):a).split("/").filter((w)=>w!==""),m=u[0]?.toLowerCase();if(m==="network"){if(u.length===1)o.push("/network/");else if(u.length===2)o.push(`/network/${O(u[1])}/`);else if(u.length===3)r.push(`/network/${O(u[1])}/${O(u[2])}`)}else if(n&&m==="home"&&u.length===2)r.push(`/home/${u[1]}`)}return{complete:r,partial:o}}
function ea(t){return ta(t)}
function ta(t){return JSe(t)!==null}
var Wt=1024;
var Ut=4096;
var I=new Map;
var k=new Map;
function JSe(t){if(!t.startsWith("/"))return null;if(t.length>Ut)return Pt(t);let e=I.get(t);if(e===void 0){if(e=Pt(t),I.size>=Wt)I.clear();I.set(t,e)}return e}
function Pt(t){let e=[];for(let n of t.split("/")){if(n===""||n===".")continue;if(n===".."){e.pop();continue}if(e.push(n),C(e))return"/"+e.join("/")}return null}
function o_(t){if(!t.startsWith("/"))return!1;let e=[];for(let n of t.split("/")){if(n===""||n===".")continue;if(n===".."){e.pop();continue}e.push(n)}return e.length===1&&e[0].toLowerCase()==="net"}
function b$(t){if(!t.startsWith("/"))return!1;if(t.length>Ut)return Rt(t);let e=k.get(t);if(e===void 0){if(e=Rt(t),k.size>=Wt)k.clear();k.set(t,e)}return e}
function Rt(t){let e=[];for(let n of t.split("/")){if(n===""||n===".")continue;if(n===".."){e.pop();continue}if(e.push(n),e.length===1&&e[0].toLowerCase()==="network")return!0}return!1}
function gW(t,e="linux",n=e==="darwin"&&!0){if(e!=="darwin")return!1;if(b$(t)||mb(t))return!0;if(!t.startsWith("/"))return!1;let{complete:r,partial:o}=tt(t,e,n);if(o.length>0)return!0;if(r.some((s)=>s.startsWith("/network/")))return!0;let i=r.filter((s)=>s.startsWith("/home/"));if(i.length>0){let s=dn();if(i.some((a)=>a!==s))return!0}return!1}
function dn(){let t;try{t=rt()}catch{return null}let e=/^\/home\/([^/]+)/.exec(JB(t));return e?`/home/${e[1]}`:null}
var bn=["usr/local","usr/libexec/cups","usr/share/snmp","AppleInternal","Applications","Library","Users","Volumes","cores","home","media","mnt","opt","pkg","private","sw"];
function JB(t){let e=t.split("/");if(e.length<5||e[0]!==""||N(e[1]??"")!=="system"||N(e[2]??"")!=="volumes"||N(e[3]??"")!=="data")return t;let n=e.slice(4);for(let r of bn){let o=r.split("/");if(n.length<o.length)continue;if(o.every((i,s)=>N(n[s]??"")===N(i)))return"/"+n.join("/")}return t}
function N(t){return t.toUpperCase().toLowerCase()}
function OM(t){return Ht.test(t)||t.includes("??")&&Ht.test(Jt(t))}
var Ht=/^[\\/]\?\?[\\/]/;
function Jt(t){return Q.win32?Q.win32.normalize(t):t}
return {Pi,PM,b$}
}
function make_m_chunk_n4nzrxz8_js({}){
function T(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return}
return {T}
}
function make_m_chunk_81htvrmc_js({Zt,Pi,Qt,ye,D,he,I,PM,b$,os,ts,T}){
function Le(e,n){try{let r=Zt(e);if(r.isSymbolicLink()){let o=qzt(e);if(o===null)return!1;if(Pi(o,n))return!1;if(Hh(o,n))return!1;let s=Qt(e);return s.isDirectory()||s.isFile()}return r.isDirectory()||r.isFile()}catch{return!1}}
function mn(e){try{let n=ts(e);if(n.isSymbolicLink())return"symlink";return n.isFile()?"file":n.isDirectory()?"dir":"special"}catch(n){let r=T(n);return r==="ENOENT"||r==="ENOTDIR"?"absent":"other"}}
function qzt(e){try{let n=os(e,{encoding:"buffer"}),r=n.toString("utf-8");if(r.includes("\x00")||!Buffer.from(r,"utf-8").equals(n))return null;return r}catch{return null}}
function hs(e,n){return Pi(e,n)}
var bs=/\/+/;
var Rs=/\/$/;
var hn=/^\//;
var Ss=/^\//;
function ce(e,n,r=40,o=n,s=!1){if(r<=0)return!1;let i=Ss.exec(e),a=i?i[0]:"",u=e.slice(a.length).split(bs);for(let p=0;p<u.length;p++){let h=u[p];if(h===""||h===".")continue;if(h===".."){a=he(a);continue}if(a=I(a,h),PM(a,o)||b$(a))return!1;let R=mn(a);if(R==="other"||R==="special"&&!s)return!1;if(R==="symlink"){let g=qzt(a);if(g===null)return!1;if(hs(g,he(a)))return!1;let c=hn.test(g)?g:he(a)+ye+g,b=u.slice(p+1).join(ye),E=b?Rs.test(c)?c+b:c+ye+b:c;return ce(E,n,r-1,o,s)}}return!0}
function X(e,n,r=n,o=!1){if(!ce(hn.test(e)?e:n+ye+e,n,void 0,r,o))return!0;return!ce(D(n,e),n,void 0,r,o)}
function Hh(e,n,r=n){return X(e,n,r)}
return {Le}
}
export function createGitMarker286(ports){
const m_chunk_6wzwv598_js=make_m_chunk_6wzwv598_js({f:ports["path"]["resolve"],rt:ports["os"]["homedir"],Q:ports["path"]})
const m_chunk_n4nzrxz8_js=make_m_chunk_n4nzrxz8_js({})
const m_chunk_81htvrmc_js=make_m_chunk_81htvrmc_js({Zt:ports["fs"]["lstatSync"],Pi:m_chunk_6wzwv598_js.Pi,Qt:ports["fs"]["statSync"],ye:ports["path"]["sep"],D:ports["path"]["resolve"],he:ports["path"]["dirname"],I:ports["path"]["join"],PM:m_chunk_6wzwv598_js.PM,b$:m_chunk_6wzwv598_js.b$,os:ports["fs"]["readlinkSync"],ts:ports["fs"]["lstatSync"],T:m_chunk_n4nzrxz8_js.T})
return m_chunk_81htvrmc_js.Le
}
