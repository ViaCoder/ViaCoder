// Generated from verified official 2.1.286 win32-x64; do not edit.
function make_m_chunk_n2yvzd9n_js({p,ot,tt}){
function An(t){return/^[\\/]{2}/.test(t)||D0(t)}
function rx(t){if(/^[\\/]{2}[?.][\\/](?!unc[\\/])/i.test(t))return null;return t.match(/^[\\/]{2}(?:[?.][\\/]unc[\\/])?([^\\/]+)/i)?.[1]?.replace(/[A-Z]/g,(e)=>e.toLowerCase())??null}
function sa(t){return/(^|[\\/])\.{1,2}[. ]*([\\/]|$)/.test(t)}
function IE(t){return/^[\\/]{2}[?.][\\/]/.test(t)}
function hb(t){if(!/\/\.(?:vol|file|nofollow|resolve)(?:\/|$)/i.test(t))return!1;if(!t.startsWith("/"))return!1;let e=[];for(let n of t.split("/")){if(n===""||n===".")continue;if(n===".."){e.pop();continue}if(e.push(n),e.length===1&&/^\.(?:vol|file|nofollow|resolve)$/i.test(n))return!0}return!1}
function LQ(t,e){if(!An(t))return!1;if(IE(t)||D0(t))return!0;if(sa(t))return!0;let n=rx(t);return n===null||n!==rx(e)}
function g8(t){return null}
function O(t){return t.replace(/[A-Z]/g,(e)=>e.toLowerCase())}
function M0(t,e){if(hb(t))return!0;if(ea(t)){let n=g8(t);if(n===null||n!==g8(e))return!0}return Yer(t,e)}
function Pi(t,e){let n=p(e,t);if(LQ(t,e)||LQ(n,e))return!0;let r=g8(e);for(let o of[t,n]){if(ea(o)){let i=g8(o);if(i===null||i!==r)return!0}if(vF(o)||i_(o)||hb(o)||Yer(o,e))return!0}return!1}
function Yer(t,e,n="win32",r=n==="darwin"&&!0){if(n!=="darwin"||!yW(t,n,r))return!1;let o=et(e,n,r).complete[0]??null,{complete:i,partial:s}=et(t,n,r);if(i.length===0&&s.length===0)return!0;if(o===null)return!0;return i.some((a)=>a!==o)||s.some((a)=>!o.startsWith(a))}
var gn=6;
function et(t,e,n){let r=[],o=[];if(!t.startsWith("/"))return{complete:r,partial:o};let i=[];for(let s of t.split("/")){if(s===""||s===".")continue;if(s===".."){i.pop();continue}if(i.push(s),i.length>gn)continue;let a="/"+i.join("/"),u=(e==="darwin"?eB(a):a).split("/").filter((m)=>m!==""),h=u[0]?.toLowerCase();if(h==="network"){if(u.length===1)o.push("/network/");else if(u.length===2)o.push(`/network/${O(u[1])}/`);else if(u.length===3)r.push(`/network/${O(u[1])}/${O(u[2])}`)}else if(n&&h==="home"&&u.length===2)r.push(`/home/${u[1]}`)}return{complete:r,partial:o}}
function ea(t){return!1}
var Ft=1024;
var zt=4096;
var j=new Map;
function i_(t){if(!t.startsWith("/"))return!1;let e=[];for(let n of t.split("/")){if(n===""||n===".")continue;if(n===".."){e.pop();continue}e.push(n)}return e.length===1&&e[0].toLowerCase()==="net"}
function vF(t){if(!t.startsWith("/"))return!1;if(t.length>zt)return Rt(t);let e=j.get(t);if(e===void 0){if(e=Rt(t),j.size>=Ft)j.clear();j.set(t,e)}return e}
function Rt(t){let e=[];for(let n of t.split("/")){if(n===""||n===".")continue;if(n===".."){e.pop();continue}if(e.push(n),e.length===1&&e[0].toLowerCase()==="network")return!0}return!1}
function yW(t,e="win32",n=e==="darwin"&&!0){if(e!=="darwin")return!1;if(vF(t)||hb(t))return!0;if(!t.startsWith("/"))return!1;let{complete:r,partial:o}=et(t,e,n);if(o.length>0)return!0;if(r.some((s)=>s.startsWith("/network/")))return!0;let i=r.filter((s)=>s.startsWith("/home/"));if(i.length>0){let s=hn();if(i.some((a)=>a!==s))return!0}return!1}
function hn(){let t;try{t=ot()}catch{return null}let e=/^\/home\/([^/]+)/.exec(eB(t));return e?`/home/${e[1]}`:null}
var _n=["usr/local","usr/libexec/cups","usr/share/snmp","AppleInternal","Applications","Library","Users","Volumes","cores","home","media","mnt","opt","pkg","private","sw"];
function eB(t){let e=t.split("/");if(e.length<5||e[0]!==""||D(e[1]??"")!=="system"||D(e[2]??"")!=="volumes"||D(e[3]??"")!=="data")return t;let n=e.slice(4);for(let r of _n){let o=r.split("/");if(n.length<o.length)continue;if(o.every((i,s)=>D(n[s]??"")===D(i)))return"/"+n.join("/")}return t}
function D(t){return t.toUpperCase().toLowerCase()}
function D0(t){return Ut.test(t)||t.includes("??")&&Ut.test(Yt(t))}
var Ut=/^[\\/]\?\?[\\/]/;
function Yt(t){return tt.win32?tt.win32.normalize(t):t}
return {Pi,M0,vF}
}
function make_m_chunk_vfzpypse_js({}){
function k(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return}
return {k}
}
function make_m_chunk_ds9hkxra_js({Jt,Pi,Zt,be,O,ye,x,M0,vF,ns,es,k}){
function Ne(e,n){try{let r=Jt(e);if(r.isSymbolicLink()){let o=Qzt(e);if(o===null)return!1;if(Pi(o,n))return!1;if(Bh(o,n))return!1;let s=Zt(e);return s.isDirectory()||s.isFile()}return r.isDirectory()||r.isFile()}catch{return!1}}
function gn(e){try{let n=es(e);if(n.isSymbolicLink())return"symlink";return n.isFile()?"file":n.isDirectory()?"dir":"special"}catch(n){let r=k(n);return r==="ENOENT"||r==="ENOTDIR"?"absent":"other"}}
function Qzt(e){try{let n=ns(e,{encoding:"buffer"}),r=n.toString("utf-8");if(r.includes("\x00")||!Buffer.from(r,"utf-8").equals(n))return null;return r}catch{return null}}
function gs(e,n){return Pi(e,n)}
var ms=/[/\\]+/;
var hs=/[\\/]$/;
var mn=/^(?:[/\\]|[A-Za-z]:[/\\])/;
var bs=/^(?:[/\\]{2}[^/\\]+[/\\][^/\\]+[/\\]?|[A-Za-z]:[/\\]|[/\\])/;
function ce(e,n,r=40,o=n,s=!1){if(r<=0)return!1;let i=bs.exec(e),a=i?i[0]:"",u=e.slice(a.length).split(ms);for(let f=0;f<u.length;f++){let h=u[f];if(h===""||h===".")continue;if(h===".."){a=ye(a);continue}if(a=x(a,h),M0(a,o)||vF(a))return!1;let R=gn(a);if(R==="other"||R==="special"&&!s)return!1;if(R==="symlink"){let b=Qzt(a);if(b===null)return!1;if(gs(b,ye(a)))return!1;let c=mn.test(b)?b:ye(a)+be+b,g=u.slice(f+1).join(be),E=g?hs.test(c)?c+g:c+be+g:c;return ce(E,n,r-1,o,s)}}return!0}
function X(e,n,r=n,o=!1){if(!ce(mn.test(e)?e:n+be+e,n,void 0,r,o))return!0;return!ce(O(n,e),n,void 0,r,o)}
function Bh(e,n,r=n){return X(e,n,r)}
return {Ne}
}
export function createGitMarker286(ports){
const m_chunk_n2yvzd9n_js=make_m_chunk_n2yvzd9n_js({p:ports["path"]["resolve"],ot:ports["os"]["homedir"],tt:ports["path"]})
const m_chunk_vfzpypse_js=make_m_chunk_vfzpypse_js({})
const m_chunk_ds9hkxra_js=make_m_chunk_ds9hkxra_js({Jt:ports["fs"]["lstatSync"],Pi:m_chunk_n2yvzd9n_js.Pi,Zt:ports["fs"]["statSync"],be:ports["path"]["sep"],O:ports["path"]["resolve"],ye:ports["path"]["dirname"],x:ports["path"]["join"],M0:m_chunk_n2yvzd9n_js.M0,vF:m_chunk_n2yvzd9n_js.vF,ns:ports["fs"]["readlinkSync"],es:ports["fs"]["lstatSync"],k:m_chunk_vfzpypse_js.k})
return m_chunk_ds9hkxra_js.Ne
}
