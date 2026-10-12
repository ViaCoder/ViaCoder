import { isIPv4 as builtinIsIPv4, isIPv6 as builtinIsIPv6 } from 'node:net'
function module0(imports){

function jU(e,n){let r=n.lastIndexOf("/");if(r<0)return!1;let o=n.slice(0,r),s=n.slice(r+1);if(!/^\d+$/.test(s))return!1;let i=parseInt(s,10),c=je(o);if(!c)return!1;if(c.zone)return!1;let u=je(e);if(!u)return!1;let l=ln(u.bytes),f=c.bytes;if(l.length!==f.length)return!1;let h=f.length*8;if(i<0||i>h)return!1;return un(l,f,i)};
function un(e,n,r){let o=r>>3;for(let c=0;c<o;c++)if(e[c]!==n[c])return!1;let s=r&7;if(s===0)return!0;let i=255<<8-s&255;return((e[o]??0)&i)===((n[o]??0)&i)};
function ln(e){if(e.length!==16)return e;for(let n=0;n<10;n++)if(e[n]!==0)return e;if(e[10]!==255||e[11]!==255)return e;return e.slice(12)};
function je(e){if(e==="")return null;let n="",r=e,o=e.indexOf("%");if(o>=0)n=e.slice(o+1),r=e.slice(0,o);if(r.includes(":")){let i=fn(r);return i?{bytes:i,zone:n}:null}if(n)return null;let s=We(r);return s?{bytes:s,zone:""}:null};
function We(e){let n=e.split(".");if(n.length!==4)return null;let r=new Uint8Array(4);for(let o=0;o<4;o++){let s=n[o];if(s===void 0||s===""||!/^\d{1,3}$/.test(s))return null;if(s.length>1&&s.startsWith("0"))return null;let i=parseInt(s,10);if(i>255)return null;r[o]=i}return r};
function fn(e){let n=null,r=e,o=e.lastIndexOf(":");if(o>=0&&e.slice(o+1).includes(".")){if(n=We(e.slice(o+1)),!n)return null;r=e.slice(0,o+1)}let s=r.split("::");if(s.length>2)return null;let i=[],c=(l,f)=>{if(l==="")return[];let h=l.split(":"),T=[];for(let S=0;S<h.length;S++){let E=h[S];if(E===""&&f&&S===h.length-1)continue;if(E===void 0||E===""||!/^[0-9a-fA-F]{1,4}$/.test(E))return null;T.push(parseInt(E,16))}return T};if(s.length===1){let l=s[0]??"",f=c(l,n!==null);if(!f)return null;i.push(...f);let h=n?6:8;if(i.length!==h)return null}else{let l=s[0]??"",f=s[1]??"",h=c(l,!1),T=c(f,n!==null);if(!h||!T)return null;let S=n?2:0,E=8-h.length-T.length-S;if(E<1)return null;i.push(...h);for(let R=0;R<E;R++)i.push(0);if(i.push(...T),i.length+S!==8)return null}let u=new Uint8Array(16);for(let l=0;l<i.length;l++){let f=i[l];if(f===void 0)return null;u[l*2]=f>>8&255,u[l*2+1]=f&255}if(n)u[12]=n[0]??0,u[13]=n[1]??0,u[14]=n[2]??0,u[15]=n[3]??0;return u};
return {jU,un,ln,je,We,fn};
}
function module1(imports){

class P extends Error{telemetryMessage;errorClass;constructor(n,e,t){super(n);this.name="TelemetrySafeError",this.telemetryMessage=e??n,this.errorClass=t}};
return {P};
}
function module2(imports){
const Hp=imports["Hp"];
const Ph=imports["Ph"];
const t=imports["t"];
const cD=imports["cD"];
const Yf=imports["Yf"];
const iA=imports["iA"];
const qf=imports["qf"];
const Yn=imports["Yn"];
const jn=imports["jn"];
const IA=imports["IA"];
const jU=imports["jU"];
const P=imports["P"];
var Rl=["10.0.0.0/8","172.16.0.0/12","192.168.0.0/16","127.0.0.0/8","169.254.0.0/16","100.64.0.0/10"];
function eo(e){let n=e.replace(/%.*$/,"").toLowerCase();if(Yn(n))return Rl.some((g)=>jU(n,g));if(!jn(n))return!1;let r=/^::ffff:(\d+\.\d+\.\d+\.\d+)$/.exec(n);if(r?.[1])return eo(r[1]);if(n==="::1")return!0;let s=parseInt(/^([0-9a-f]{1,4}):/.exec(n)?.[1]??"0",16);return s>=65152&&s<=65215||s>=64512&&s<=65023};
function Qf(e,n,r,s){if(!jU(s,e))return new P(`${n} answered from ${s||"an unknown address"}, outside its declared network ${e}: the name resolved differently between lookup and connect. Try again.`,"gateway login: gateway address outside declared network");if(!jU(r,e))return new P(`Claude Code only signs in to ${n} from inside its declared network ${e} (managed settings), and this machine is connecting from ${r||"an unknown address"}, outside it. Sign in `+"from the host OS on that network \u2014 not from a container, WSL2, or a "+`VPN whose addresses sit outside ${e}.`,"gateway login: this machine is outside the declared network");return};
var Zf=["claude.fedstart.com","claude.palantirfedstart.com"];
var Ci=new Set([...Zf]);
function s8(e){return e.hostname.replace(/^\[|\]$/g,"")};
var gbn="gateway host resolved to a public address";
function hbn(e,n){let r=new URL(e),s=s8(r),g=Yn(s)||jn(s);if(r.protocol!=="https:"||Ci.has(s)||g&&n===void 0||Hp()!==void 0&&!Ph(e))return;let h=cD(),b=new Yf({...iA(),...h&&{ca:h},lookup:QA(n)});if(n!==void 0){let v=b.createConnection.bind(b);b.createConnection=(w,A)=>{let R=v(w,A);return R?.prependOnceListener("connect",()=>{let{localAddress:M="",remoteAddress:D=""}=R,K=Qf(n,s,M,D);if(K)R.destroy(Object.assign(Error(gbn),{code:"EADDRNOTPRIVATE",cause:K}))}),R}}return b};
function QA(e){return function(r,s,g){IA(r,{...s,all:!0},(h,b)=>{let v=b??[],w=v.find((R)=>e?!jU(R.address,e):!eo(R.address)),A=h??(w?Object.assign(Error(gbn),{code:"EADDRNOTPRIVATE"}):null);if(s.all)g(A,A?[]:v);else g(A,v[0]?.address??"",v[0]?.family)})}};
var ybn="gateway TLS certificate does not match the pinned fingerprint";
function ZA(e){let n=cD();return new Yf({...iA(),...n&&{ca:n},checkServerIdentity:(r,s)=>{let g=qf(r,s);if(g)return g;let h=typeof s.fingerprint256==="string"?s.fingerprint256.replaceAll(":","").toLowerCase():"";if(h!==e){let b={pinnedFingerprint:e,presentedFingerprint:h};return Object.assign(Error(ybn),b)}return}})};
function spe(e,n){if(!e||new URL(n).protocol!=="https:")return;if(Hp()&&!Ph(n)){t(`[gateway] ${new URL(n).host} is reached through the HTTPS proxy \u2014 per-request cert pin not applied (known gap; list the gateway in NO_PROXY to pin)`,{level:"warn"});return}return ZA(e)};
return {Rl,eo,Qf,Zf,Ci,s8,gbn,hbn,QA,ybn,ZA,spe};
}
export function createOfficialGatewayTransport287(ports){
const m0=module0({});
const m1=module1({});
const m2=module2({"Hp":ports["proxyConfigured"],"Ph":ports["proxyBypass"],"t":ports["debug"],"cD":ports["certificateAuthority"],"Yf":ports["httpsAgent"],"iA":ports["mtlsOptions"],"qf":ports["checkServerIdentity"],"Yn":builtinIsIPv4,"jn":builtinIsIPv6,"IA":ports["dnsLookup"],"jU":m0["jU"],"P":m1["P"]});
return {spe:m2["spe"],ZA:m2["ZA"],hbn:m2["hbn"],QA:m2["QA"],Qf:m2["Qf"],s8:m2["s8"]};
}
