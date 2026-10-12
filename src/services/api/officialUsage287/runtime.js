export function createUsageInputTimer287(ports){
const {A,Q,ke,kt,xb}=ports;
var OR=(c,r)=>{let t=setTimeout(c,r);return()=>clearTimeout(t)};
var ODe=()=>()=>{};
var zo=()=>!1;
function kr(o,r,l){let u=ke(xb),d=typeof o==="function",m=d?o:null,f=d?r:o,C=d?void 0:r,v=A(m);v.current=m;let h=A(null),S=u?.setTimeout??OR,x=Q(()=>{if(f===null)return ODe;let P=(T)=>(h.current=null,T(),S(()=>{if(h.current=P,d)v.current?.();else T()},f));return P},[S,f,d,C,...l??[]]),E=kt(x,d?zo:()=>h.current===x);if(!d)return E};
return kr;
}
export function createUsageInputFocus287(ports){
const {NT,R}=ports;
function Ug(e,r,n=!1){R(()=>{let s=e.current;if(!s)return;let o=NT(s);if(!r){if(n&&o.activeElement===s)o.blur();return}return o.focus(s),o.subscribe(()=>{let l=e.current;if(!l||o.activeElement===l)return;if(!o.activeElement){o.focus(l);return}let c=l.parentNode;while(c){if(c===o.activeElement){o.focus(l);return}c=c.parentNode}})},[r,e,n])};
return Ug;
}
export function createUsageInputText287(ports){
const {sf}=ports;
function RR(r){if(typeof r==="string")return r;if(typeof r==="number")return String(r);if(!r)return"";if(Array.isArray(r))return r.map(RR).join("");if(sf(r))return RR(r.props.children);return""};
return RR;
}
export function createUsageConfirmSelect287(ports){
const {$e,Ci,Ze,b0n,e,g,kr,n,nc,w}=ports;
var z=500;
function QCt(L=z){let r=nc();return kr(L,r)};
function qn(L){let a=w(32),{onConfirm:r,onCancel:o,confirmLabel:D,cancelLabel:P,cancelFirst:V,focus:X,hideIndexes:Y,refuseInput:F,openedAt:I,windowMs:Z,armAfterMs:v}=L,s=D===void 0?"Yes":D,i=P===void 0?"No":P,x=V===void 0?!1:V,j=X===void 0?"confirm":X,N=Y===void 0?!1:Y,[E]=g(j),l=QCt(v??null)||v===void 0;if(Ze()){const c=Z??v;let t;if(a[0]!==i||a[1]!==s||a[2]!==o||a[3]!==r||a[4]!==I||a[5]!==F||a[6]!==c)t=e(b0n,{confirmLabel:s,cancelLabel:i,onConfirm:r,onCancel:o,refuseInput:F,openedAt:I,windowMs:c}),a[0]=i,a[1]=s,a[2]=o,a[3]=r,a[4]=I,a[5]=F,a[6]=c,a[7]=t;else t=a[7];return t}let c;if(a[8]!==s||a[9]!==l)c=l?s:e(n,{dimColor:!0,children:s}),a[8]=s,a[9]=l,a[10]=c;else c=a[10];let t;if(a[11]!==c)t={label:c,value:"confirm"},a[11]=c,a[12]=t;else t=a[12];let m=t,f;if(a[13]!==i||a[14]!==l)f=l?i:e(n,{dimColor:!0,children:i}),a[13]=i,a[14]=l,a[15]=f;else f=a[15];let k;if(a[16]!==f)k={label:f,value:"cancel"},a[16]=f,a[17]=k;else k=a[17];let d=k,u;if(a[18]!==d||a[19]!==x||a[20]!==m)u=x?[d,m]:[m,d],a[18]=d,a[19]=x,a[20]=m,a[21]=u;else u=a[21];const S=!l;let b;if(a[22]!==o||a[23]!==r)b=(ee)=>ee==="confirm"?r():o(),a[22]=o,a[23]=r,a[24]=b;else b=a[24];let q;if(a[25]!==N||a[26]!==o||a[27]!==E||a[28]!==u||a[29]!==S||a[30]!==b)q=e($e,{options:u,selectedValue:Ci,hideIndexes:N,isDisabled:S,defaultFocusValue:E,onChange:b,onCancel:o}),a[25]=N,a[26]=o,a[27]=E,a[28]=u,a[29]=S,a[30]=b,a[31]=q;else q=a[31];return q};
return qn;
}
export function createUsageInputGuard287(ports){
const {A,RR,Ug,V0n,b,ce,e,g,ie,ke,n,r,s,ua,uv,w}=ports;
function wa(){return ke(V0n)??Wo};
function Wo(){return Date.now()};
var nV=150;
var mo=250;
function Dl(e,n,t=nV){let o=e()-n;if(o>=0)return o<t;return n<=Date.now()};
function ha(o=nV){let t=wa(),i=A(Date.now());return ce(()=>Dl(t,i.current,o),[t,o])};
function Vy(){return A(Date.now()).current};
function _At(){let[o,t]=g(0),i=ce(()=>t((a)=>a+1),[]);return{epoch:o,noteAttempt:i}};
function es(){let o=wa(),t=A(null),{epoch:i,noteAttempt:a}=_At(),l=ce((d=nV)=>t.current!==null&&Dl(o,t.current,d),[o]),c=ce(()=>{t.current=Date.now(),a()},[a]);return{refusedWithin:l,noteRefused:c,epoch:i}};
function Td(){return""};
function Dd(){return""};
function Fd(ne){return ne.slice(0,-1)};
function _e(o){let l=w(3),[t,i]=g(o),a=A(o),c;if(l[0]===b)c=(d)=>{a.current=d(a.current),i(a.current)},l[0]=c;else c=l[0];let p=c,x;if(l[1]!==t)x=[t,a,p],l[1]=t,l[2]=x;else x=l[2];return x};
function Zt(){return _e("")};
function yi(o,t){let c=w(18),i=t===void 0?nV:t,a=wa(),l=ha(i),d;if(c[0]!==o||c[1]!==a||c[2]!==l||c[3]!==i)d=o===void 0?l:()=>Dl(a,o,i),c[0]=o,c[1]=a,c[2]=l,c[3]=i,c[4]=d;else d=c[4];let p=d,{refusedWithin:x,noteRefused:u}=es(),f;if(c[5]!==p||c[6]!==u||c[7]!==x||c[8]!==i)f=()=>{if(p()||x(i)){return u(),!0}return!1},c[5]=p,c[6]=u,c[7]=x,c[8]=i,c[9]=f;else f=c[9];let F=f,y;if(c[10]!==p||c[11]!==u||c[12]!==x||c[13]!==i)y=()=>{if(!p()&&!x(i)){return!1}return u(),!0},c[10]=p,c[11]=u,c[12]=x,c[13]=i,c[14]=y;else y=c[14];let O=y,L;if(c[15]!==F||c[16]!==O)L={refuse:F,refuseCharacter:O},c[15]=F,c[16]=O,c[17]=L;else L=c[17];return L};
function b0n(o){let v=w(43),{confirmLabel:t,cancelLabel:i,onConfirm:a,onCancel:l,refuseInput:c,openedAt:d,windowMs:p}=o,[x,u,f]=Zt(),[F,y]=g(null),O=A(null);Ug(O,!0),ua("select",!0);let{refuse:L,refuseCharacter:q}=yi(d,p),h;if(v[0]!==c||v[1]!==L)h=function I(){return(c?.()??!1)||L()},v[0]=c,v[1]=L,v[2]=h;else h=v[2];let I=h,P;if(v[3]!==c||v[4]!==q)P=function W(){return(c?.()??!1)||q()},v[3]=c,v[4]=q,v[5]=P;else P=v[5];let W=P,V;if(v[6]!==l||v[7]!==a||v[8]!==I||v[9]!==f)V=(T)=>{let E=T.trim().toLowerCase();if((E==="y"||E==="yes"||E==="n"||E==="no")&&I()){f(Td);return}if(E==="y"||E==="yes"){return a()}if(E==="n"||E==="no"){return l()}y("Please answer y or n."),f(Dd)},v[6]=l,v[7]=a,v[8]=I,v[9]=f,v[10]=V;else V=v[10];let B=V,k;if(v[11]!==u||v[12]!==l||v[13]!==I||v[14]!==W||v[15]!==f||v[16]!==B)k=(S)=>{if(S.key==="escape"&&S.name==="escape"){if(S.preventDefault(),I()){return}return l()}if(S.key==="return"&&S.name==="return"){return S.preventDefault(),B(u.current)}if(S.key==="backspace"||S.key==="delete"){S.preventDefault(),f(Fd);return}if(S.key.length===1&&!S.ctrl&&!S.meta){if(S.preventDefault(),W()){return}y(null),f((he)=>he+S.key)}},v[11]=u,v[12]=l,v[13]=I,v[14]=W,v[15]=f,v[16]=B,v[17]=k;else k=v[17];let H=k,U=`Enter y/n: ${x}`,mt;if(v[18]!==U)mt=ie(U),v[18]=U,v[19]=mt;else mt=v[19];let oe;if(v[20]!==mt)oe={line:0,column:mt,active:!0,visible:!0},v[20]=mt,v[21]=oe;else oe=v[21];let se=uv(oe),ye;if(v[22]!==t)ye=RR(t),v[22]=t,v[23]=ye;else ye=v[23];let C;if(v[24]!==ye)C=r(n,{children:["y. ",ye]}),v[24]=ye,v[25]=C;else C=v[25];let Oe;if(v[26]!==i)Oe=RR(i),v[26]=i,v[27]=Oe;else Oe=v[27];let z;if(v[28]!==Oe)z=r(n,{children:["n. ",Oe]}),v[28]=Oe,v[29]=z;else z=v[29];let re;if(v[30]!==F)re=F&&e(n,{children:F}),v[30]=F,v[31]=re;else re=v[31];let Z;if(v[32]!==U)Z=e(n,{children:U}),v[32]=U,v[33]=Z;else Z=v[33];let ge;if(v[34]!==se||v[35]!==Z)ge=e(s,{ref:se,children:Z}),v[34]=se,v[35]=Z,v[36]=ge;else ge=v[36];let Te;if(v[37]!==H||v[38]!==z||v[39]!==re||v[40]!==ge||v[41]!==C)Te=r(s,{ref:O,flexDirection:"column",tabIndex:0,onKeyDown:H,children:[C,z,re,ge]}),v[37]=H,v[38]=z,v[39]=re,v[40]=ge,v[41]=C,v[42]=Te;else Te=v[42];return Te};
return {ha,es,Vy,b0n};
}
export function createUsageUiLeaf287(ports){
const {e,n,r,s,w}=ports;
function UL(p){let l=w(7),{children:i,subtitle:t}=p,o;if(l[0]!==i)o=e(n,{bold:!0,children:i}),l[0]=i,l[1]=o;else o=l[1];let c;if(l[2]!==t)c=t&&e(n,{dimColor:!0,children:t}),l[2]=t,l[3]=c;else c=l[3];let a;if(l[4]!==o||l[5]!==c)a=r(s,{flexDirection:"column",children:[o,c]}),l[4]=o,l[5]=c,l[6]=a;else a=l[6];return a};
return UL;
}
export function createUsageUiFormats287(ports){
const {}=ports;
var f=new WeakMap;
function p(e){if(!e)return"";let t=f.get(e);if(t!==void 0)return t;let r=Object.entries(e).sort(([i],[o])=>i<o?-1:i>o?1:0),n="";for(let[i,o]of r)n+=`${i}=${String(o)};`;return f.set(e,n),n};
var d=new Map;
function ZYo(e,t){let r=`${e??""}|${p(t)}`,n=d.get(r);if(!n)n=new Intl.NumberFormat(e,t),d.set(r,n);return n};
var re={notation:"compact",maximumFractionDigits:1,minimumFractionDigits:1};
var ne={notation:"compact",maximumFractionDigits:1,minimumFractionDigits:0};
function ws(e){let t=e>=1000;return ZYo("en-US",t?re:ne).format(e).toLowerCase()};
function fr(e){return ws(e).replace(".0","")};
return fr;
}
export function createUsageUiCron287(ports){
const {}=ports;
var b=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
function T(r,s){return new Date(2000,0,1,s,r).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"})};
function w(r,s){let n=new Date;return n.setUTCHours(s,r,0,0),n.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",timeZoneName:"short"})};
function FC(r,s){let n=s?.utc??!1,e=r.trim().split(/\s+/);if(e.length!==5)return r;let[i,a,o,c,p]=e;if(a==="*"&&o==="*"&&c==="*"&&p==="*"){if(i==="*")return"Every minute";let l=i.match(/^\*\/(\d+)$/);if(l){let m=parseInt(l[1],10);return m===1?"Every minute":`Every ${m} minutes`}}if(i.match(/^\d+$/)&&a==="*"&&o==="*"&&c==="*"&&p==="*"){let l=parseInt(i,10);if(l===0)return"Every hour";return`Every hour at :${l.toString().padStart(2,"0")}`}let u=a.match(/^\*\/(\d+)$/);if(i.match(/^\d+$/)&&u&&o==="*"&&c==="*"&&p==="*"){let l=parseInt(u[1],10),m=parseInt(i,10),h=m===0?"":` at :${m.toString().padStart(2,"0")}`;return l===1?`Every hour${h}`:`Every ${l} hours${h}`}if(!i.match(/^\d+$/)||!a.match(/^\d+$/))return r;let f=parseInt(i,10),g=parseInt(a,10),y=n?w:T;if(o==="*"&&c==="*"&&p==="*")return`Every day at ${y(f,g)}`;if(o==="*"&&c==="*"&&p.match(/^\d$/)){let l=parseInt(p,10)%7,m;if(n){let h=new Date,M=(l-h.getUTCDay()+7)%7;h.setUTCDate(h.getUTCDate()+M),h.setUTCHours(g,f,0,0),m=b[h.getDay()]}else m=b[l];if(m)return`Every ${m} at ${y(f,g)}`}if(o==="*"&&c==="*"&&p==="1-5")return`Weekdays at ${y(f,g)}`;return r};
return FC;
}
export function createUsageUiCurrency287(ports){
const {}=ports;
var Ase={USD:"$",EUR:"\u20AC",GBP:"\xA3",JPY:"\xA5",BRL:"R$",CAD:"CA$",AUD:"A$",NZD:"NZ$",SGD:"S$"};
var Tse=new Set(["JPY","KRW","VND"]);
function Bke(e){let n=e.toUpperCase();return Ase[n]??`${n} `};
function gi(e,n,r="precise"){let s=n.toUpperCase(),h=Bke(s);if(Tse.has(s))return`${h}${Math.round(e).toLocaleString("en-US")}`;let g=e/100;if(r==="whole")return`${h}${Math.round(g).toLocaleString("en-US")}`;if(r==="fit"&&g%1===0)return`${h}${g.toLocaleString("en-US")}`;return`${h}${g.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`};
return gi;
}
export function createUsageTranscriptPolicy287(ports){
const {ase,on,op,wh,x3}=ports;
var Te="allow_usage_transcript_scan";
var Me={policy:Te,hipaaReason:"Not shown under your organization's policy: this breakdown is built by scanning the session transcripts saved on this machine."};
function B(e){if(on(e.policy))return{allowed:!0};if(wh(e.policy)==="org_denied"&&ase().includes("hipaa"))return{allowed:!1,reason:e.hipaaReason};let{featureLabel:n,verb:o}=x3(e.policy);return{allowed:!1,reason:op(e.policy,n,o)??`${n} ${o} unavailable right now.`}};
function kMe(){return B(Me)};
return kMe;
}
export function createUsageMenuActions287(ports){
const {Ct,HGe,One,Ve,X,_nt,e,f,fve,i,m,u,wGe,xt}=ports;
function je(){if(xt.current)return;xt.current=!0,i("tengu_rate_limit_options_menu_select_cedar_ember",{}),Ct(!0),_nt("dialog",u.credentials).then((o)=>{if(Ve.current)return;if(o.kind==="answer"){m(o.result.text);return}f(e(wGe,{offer:o.offer,entry:"dialog",credentials:u.credentials,onDone:(_)=>m(_.text)}))}).catch(()=>{m(fve)})};
function et(){i("tengu_rate_limit_options_menu_select_juniper_tide",{}),X(!0),HGe("dialog",u.credentials).then((o)=>{m(o.text)}).catch(()=>{m(One().unavailableLine)})};
return {cedar:je,juniper:et};
}
export function createUsageUserFlags287(ports){
const {He,a,n}=ports;
function Le(e){if(!e)return!1;if(typeof e==="boolean")return e;let n=String(e).toLowerCase().trim();return["1","true","yes","on"].includes(n)};
function mwt(){if(process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC)return"essential-traffic";if(process.env.DISABLE_TELEMETRY)return"no-telemetry";if(Le(process.env.DO_NOT_TRACK))return"no-telemetry";return"default"};
function EL(){return mwt()!=="default"};
function uo(){return n().host.credentialSlots.gatewayAuth()};
function Vn(){return He()==="firstParty"};
function u(){if(a.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST)return!1;return!Vn()};
function l(){return a.CLAUDE_CODE_CUSTOM_OAUTH_URL!==void 0};
function Ch(){return u()||uo()!==null||EL()||l()};
function PF(){let e=a.CLAUDE_CODE_SESSION_KIND;if(e==="bg"||e==="daemon"||e==="daemon-worker")return e;return};
function Pt(){return PF()==="bg"};
function nz(){return!Ch()};
function IS(){return!a.DISABLE_GROWTHBOOK&&nz()};
return {IS,Pt};
}
export function createUsageSchemaBuilder287(ports){
const {}=ports;
class i{resetters=[];built=[];lazy(e){let t,r=()=>{t=void 0};return this.resetters.push(r),()=>{if(t===void 0)t=e(),this.built.push(r);return t}}builtCount(){return this.built.length}releaseBuiltSince(e){for(let t of this.built.splice(e))t()}reset(){for(let e of this.resetters)e();this.built.length=0}};
var _rr=new i;
function f(e){return _rr.lazy(e)};
return f;
}
export function createUsageUiDate287(ports){
const {}=ports;
var m=new Map;
function dJr(e,t){let r=`${e}:${t}`,n=m.get(r);if(!n)n=new Intl.RelativeTimeFormat("en",{style:e,numeric:t}),m.set(r,n);return n};
function MK(e,t={}){let{style:r="narrow",numeric:n="always",maxUnit:s,now:o=new Date}=t,c=e.getTime()-o.getTime(),d=Math.trunc(c/1000),g=[{unit:"year",seconds:31536000,shortUnit:"y"},{unit:"month",seconds:2592000,shortUnit:"mo"},{unit:"week",seconds:604800,shortUnit:"w"},{unit:"day",seconds:86400,shortUnit:"d"},{unit:"hour",seconds:3600,shortUnit:"h"},{unit:"minute",seconds:60,shortUnit:"m"},{unit:"second",seconds:1,shortUnit:"s"}],f=s?g.filter((a)=>a.seconds<=86400):g;for(let{unit:a,seconds:i,shortUnit:m}of f)if(Math.abs(d)>=i){let l=Math.trunc(d/i);if(r==="narrow")return d<0?`${Math.abs(l)}${m} ago`:`in ${l}${m}`;return dJr("long",n).format(l,a)}if(r==="narrow")return d<=0?"0s ago":"in 0s";return dJr(r,"auto").format(0,"second")};
function FS(e,t={}){let{now:r=new Date,...n}=t;if(e>r)return MK(e,{...n,now:r});return MK(e,{...n,numeric:"always",now:r})};
return FS;
}
export function createUsageUiLoad287(ports){
const {FS,JLt,N,V,f,h,m,p,q,uMn,y}=ports;
function cd(zo){return zo.enrichError===null?zo:{...zo,enrichError:null}};
var co="Failed to load usage data";
function Na(o,u){if(o===void 0)return"";return` as of ${FS(new Date(o),{now:u})}`};
const load=async()=>{q(!0),V(null),N(cd);let X=await uMn(h,f);G:switch(X.status){case"ok":{N({utilization:X.utilization,source:"ok",fetchedAtMs:void 0,enrichError:null}),y("usage_plan_limits");break G}case"empty_response":{m("usage_plan_limits","empty_response"),V(co);break G}case"seeded":{let B=new Date;N((ee)=>{let se=ee.utilization===null;let oe=X.seedSource==="headers"?"headers":se?"persisted":ee.source;let me=X.seedSource==="headers"?void 0:se?X.seedFetchedAtMs:ee.fetchedAtMs;return{utilization:X.seedSource==="headers"?X.utilization:ee.utilization??X.utilization,source:oe,fetchedAtMs:me,enrichError:X.seedSource==="persisted"?`Showing last-known usage${oe==="persisted"?Na(me,B):""}${X.rateLimitedVia!==null?" (rate limited \u2014 try again in a moment)":" (could not refresh)"}`:X.rateLimitedVia!==null?JLt(X.utilization.limits)?"Partial usage data (rate limited \u2014 try again in a moment)":"Per-model breakdown unavailable (rate limited \u2014 try again in a moment)":"Could not refresh usage data"}}),p("usage_plan_limits",X.rateLimitedVia===null?"refresh_failed_seeded":X.rateLimitedVia==="envelope"?"rate_limited_seeded_envelope":"rate_limited_seeded_http_429");break G}case"unavailable":{if(X.rateLimitedVia!==null)V("Usage endpoint is rate limited. Please try again in a moment."),m("usage_plan_limits",X.rateLimitedVia==="envelope"?"rate_limited_envelope":"rate_limited_http_429");else V(X.responseBody?`${co}: ${X.responseBody}`:co),m("usage_plan_limits","load_failed")}}q(!1)};
return load;
}
export function createUsageUiRenderer287(ports){
const {Bbt,F6,FC,FS,Gne,JLt,K,Qt,R,SA,Te,UL,We,b,be,br,but,d,e,eJt,et,fr,g,gi,ir,jMr,kMe,lRt,m,n,p,r,s,uMn,ur,w,y}=ports;
function wu(L){return d(L),{day:fn,week:fn}};
function ku(Ke,ye){return`${Ke}% of your usage came from subagents under "${ye}"`};
function Tu(ke,Ge){return`${ke}% of your usage came from /${Ge}`};
function Du(Ce,qe){return`${Ce}% of your usage came from the plugin "${qe}"`};
function vu(Re,pe){return`${Re}% of your usage came from the MCP server "${pe}"`};
function xu(Ue){return`/${Ue}`};
var sa={cache_miss:{headline:(o)=>`${o}% of your usage hit a >100k-token cache miss`,body:"Uncached input is expensive, and often happens when sending a message to a session that has gone idle. /compact before stepping away keeps the cold-start small."},long_context:{headline:(o)=>`${o}% of your usage was at >150k context`,body:"Longer sessions are more expensive even when cached. /compact mid-task, /clear when switching to new tasks."},subagent_heavy:{headline:(o)=>`${o}% of your usage came from subagent-heavy sessions`,body:"Each subagent runs its own requests. Be deliberate about spawning them \u2014 and consider configuring a cheaper model for simpler subagents."},high_parallel:{headline:(o)=>`${o}% of your usage was while 4+ sessions ran in parallel`,body:"All sessions share one limit. If you don't need them all at once, queueing uses it more evenly."},cron:{headline:(o)=>`${o}% of your usage came from sessions active for 8+ hours`,body:"These are often background/loop sessions. Continuous usage can add up quickly so make sure it is intentional."}};
var Eo=10;
var fn={totalCost:0,requestCount:0,sessionCount:0,behaviors:[],agents:[],skills:[],plugins:[],mcpServers:[],loops:[]};
var $t=8;
var gn=28;
var yn=6;
function kn(o){let h=w(2),{maxWidth:u}=o,f;if(h[0]!==u)f=e(ys,{maxWidth:u}),h[0]=u,h[1]=f;else f=h[1];return f};
function ys(o){let T=w(14),{maxWidth:u}=o,{storageV5:h}=Te(),[f]=g(kMe),x;if(T[0]!==h||T[1]!==f.allowed)x=()=>f.allowed?lRt(h).catch(wu):null,T[0]=h,T[1]=f.allowed,T[2]=x;else x=T[2];let[C]=g(x);if(C===null||!f.allowed){let E;if(T[3]===b)E=e(eo,{withSubtitle:!1}),T[3]=E;else E=T[3];const D=f.allowed?null:f.reason;let N;if(T[4]!==D)N=e(n,{dimColor:!0,wrap:"wrap",children:D}),T[4]=D,T[5]=N;else N=T[5];let P;if(T[6]!==u||T[7]!==N)P=r(s,{flexDirection:"column",children:[E,e(s,{marginTop:1,width:u,children:N})]}),T[6]=u,T[7]=N,T[8]=P;else P=T[8];return P}let E;if(T[9]===b)E=e(eo,{}),T[9]=E;else E=T[9];let D;if(T[10]===b)D=r(s,{flexDirection:"column",children:[E,e(s,{marginTop:1,children:e(n,{dimColor:!0,children:"Scanning local sessions\u2026"})})]}),T[10]=D;else D=T[10];let H=D,N;if(T[11]!==u||T[12]!==C)N=e(br,{fallback:H,children:e(Ss,{maxWidth:u,scanPromise:C})}),T[11]=u,T[12]=C,T[13]=N;else N=T[13];return N};
function ao(o){if(o.totalCost===0)return[];return o.behaviors.filter((u)=>u.cost/o.totalCost*100>=Eo)};
function Wt(o){return o.agents.length>0||o.skills.length>0||o.plugins.length>0||o.mcpServers.length>0||o.loops.length>0};
function Ss(o){let C=w(35),{maxWidth:u,scanPromise:h}=o,f=ur(h),[T,x]=g("day"),E;if(C[0]!==f.day)E=ao(f.day).length>0||Wt(f.day),C[0]=f.day,C[1]=E;else E=C[1];let D=E,N;if(C[2]!==f.week)N=ao(f.week).length>0||Wt(f.week),C[2]=f.week,C[3]=N;else N=C[3];let P=N,H=D||P,L;if(C[4]===b)L={"settings:periodDay":()=>x("day"),"settings:periodWeek":()=>x("week")},C[4]=L;else L=C[4];let V;if(C[5]!==H)V={context:"Settings",isActive:H},C[5]=H,C[6]=V;else V=C[6];if(Qt(L,V),!D&&!P){return null}let U=T==="day"?f.day:f.week,q,te,X,G,B,ee,se,oe,me;if(C[7]!==u||C[8]!==T||C[9]!==U){let ue=ao(U);te=s;me="column";if(C[19]===b)X=e(eo,{}),C[19]=X;else X=C[19];const de=T==="day"?"24h":"7d";if(C[20]!==de)G=e(s,{marginTop:1,children:r(n,{dimColor:!0,wrap:"wrap",children:["Last ",de," \xB7 these are independent characteristics of your usage, not a breakdown"]})}),C[20]=de,C[21]=G;else G=C[21];q=s;B=1;ee="column";se=1;oe=ue.length===0&&!Wt(U)?r(n,{dimColor:!0,children:["Nothing over ",Eo,"% in this period \u2014 try the other window."]}):r(K,{children:[ue.map((Le)=>e(Cs,{stat:Le,totalCost:U.totalCost,maxWidth:u},Le.key)),e(Et,{top:U.agents[0],maxWidth:u,headline:ku,body:"If this runs frequently, consider configuring its subagents with a cheaper model or tightening their prompts."}),e(Et,{top:U.skills[0],maxWidth:u,headline:Tu,body:"Heavy skills can be scoped down or run with a cheaper model via skill frontmatter."}),e(Et,{top:U.plugins[0],maxWidth:u,headline:Du,body:"Review what this plugin contributes \u2014 its agents, skills, and MCP tools all count toward your limit."}),e(Et,{top:U.mcpServers[0],maxWidth:u,headline:vu,body:"MCP tool results stay in context for the rest of the session. /compact to flush them, or disable servers you don't need."}),!Wt(U)?r(s,{flexDirection:"column",children:[e(n,{bold:!0,children:"Skills, subagents, plugins, and MCP servers"}),e(n,{dimColor:!0,wrap:"wrap",children:"No attribution data yet \xB7 accumulates as you use Claude"})]}):r(K,{children:[e(Rt,{title:"Skills",rows:U.skills,label:xu}),e(Rt,{title:"Subagents",rows:U.agents}),e(Rt,{title:"Plugins",rows:U.plugins}),e(Rt,{title:"MCP servers",rows:U.mcpServers}),e(bs,{rows:U.loops,maxWidth:u})]})]});C[7]=u,C[8]=T,C[9]=U,C[10]=q,C[11]=te,C[12]=X,C[13]=G,C[14]=B,C[15]=ee,C[16]=se,C[17]=oe,C[18]=me}else q=C[10],te=C[11],X=C[12],G=C[13],B=C[14],ee=C[15],se=C[16],oe=C[17],me=C[18];let de;if(C[22]!==q||C[23]!==B||C[24]!==ee||C[25]!==se||C[26]!==oe)de=e(q,{marginTop:B,flexDirection:ee,gap:se,children:oe}),C[22]=q,C[23]=B,C[24]=ee,C[25]=se,C[26]=oe,C[27]=de;else de=C[27];let Ne;if(C[28]===b)Ne=e(s,{marginTop:1,children:e(n,{dimColor:!0,children:r(be,{children:[e(et,{action:"settings:periodDay",context:"Settings",fallback:"d",description:"day"}),e(et,{action:"settings:periodWeek",context:"Settings",fallback:"w",description:"week"})]})})}),C[28]=Ne;else Ne=C[28];let xe;if(C[29]!==te||C[30]!==X||C[31]!==G||C[32]!==de||C[33]!==me)xe=r(te,{flexDirection:me,children:[X,G,de,Ne]}),C[29]=te,C[30]=X,C[31]=G,C[32]=de,C[33]=me,C[34]=xe;else xe=C[34];return xe};
function eo(o){let f=w(5),{withSubtitle:u}=o,h=u===void 0?!0:u,T;if(f[0]===b)T=e(n,{bold:!0,wrap:"wrap",children:"What's contributing to your limits usage?"}),f[0]=T;else T=f[0];let x;if(f[1]!==h)x=h&&e(n,{dimColor:!0,wrap:"wrap",children:"Approximate, based on local sessions on this machine \u2014 does not include other devices or claude.ai"}),f[1]=h,f[2]=x;else x=f[2];let C;if(f[3]!==x)C=r(s,{flexDirection:"column",children:[T,x]}),f[3]=x,f[4]=C;else C=f[4];return C};
function Rt(o){let T=w(23),{title:u,rows:h,label:f}=o;if(h.length===0){return null}let x,C,E,D,N;if(T[0]!==f||T[1]!==h||T[2]!==u){let P=h.slice(0,$t);N=h.length-$t;x=s;C="column";let H;if(T[8]!==u)H=e(n,{children:u}),T[8]=u,T[9]=H;else H=T[9];let L;if(T[10]===b)L=e(n,{dimColor:!0,children:"% of usage"}),T[10]=L;else L=T[10];if(T[11]!==H)E=r(s,{width:gn+yn,justifyContent:"space-between",children:[H,L]}),T[11]=H,T[12]=E;else E=T[12];let V;if(T[13]!==f)V=(U)=>r(s,{children:[e(s,{width:gn,children:e(n,{dimColor:!0,wrap:"truncate-end",children:f?f(U.name):U.name})}),e(s,{width:yn,justifyContent:"flex-end",children:r(n,{dimColor:!0,children:[U.pct,"%"]})})]},U.name),T[13]=f,T[14]=V;else V=T[14];D=P.map(V);T[0]=f,T[1]=h,T[2]=u,T[3]=x,T[4]=C,T[5]=E,T[6]=D,T[7]=N}else x=T[3],C=T[4],E=T[5],D=T[6],N=T[7];let H;if(T[15]!==N)H=N>0&&r(n,{dimColor:!0,children:["\u2026 ",N," more"]}),T[15]=N,T[16]=H;else H=T[16];let L;if(T[17]!==x||T[18]!==C||T[19]!==E||T[20]!==D||T[21]!==H)L=r(x,{flexDirection:C,children:[E,D,H]}),T[17]=x,T[18]=C,T[19]=E,T[20]=D,T[21]=H,T[22]=L;else L=T[22];return L};
var Do=10;
var vo=6;
var xo=8;
var Zt=9;
var Mo=9;
var Ro=Do+vo+xo+Zt+Mo;
var ga=Ro+24;
function ha(o){if(o.isDynamic)return"dynamic";if(!o.cron)return"?";let u=o.cron.match(/^(?:(?:\*\/(\d+)|(\*)) \* \* \* \*|0 (?:\*\/(\d+)|(\*)) \* \* \*|0 0 (?:\*\/(\d+)|(\*)) \* \*|(\d{1,2}) (\d{1,2}) \* \* \*)$/);if(u){if(u[1]||u[2])return`${u[1]??1}m`;if(u[3]||u[4])return`${u[3]??1}h`;if(u[5]||u[6])return`${u[5]??1}d`;return`at ${u[8].padStart(2,"0")}:${u[7].padStart(2,"0")}`}return FC(o.cron).toLowerCase()};
function bs(o){let C=w(28),{rows:u,maxWidth:h}=o;if(u.length===0){return null}let f=h>=ga,T=f?Ro:Ro-Zt,x=Math.max(12,h-T),E,D,N,P,H;if(C[0]!==x||C[1]!==u||C[2]!==f){let L=u.slice(0,$t);H=u.length-$t;let V=new Date;E=s;D="column";let U;if(C[8]===b)U=e(n,{children:"Loops"}),C[8]=U;else U=C[8];let q;if(C[9]!==x)q=e(s,{width:x,children:U}),C[9]=x,C[10]=q;else q=C[10];let te,X,G;if(C[11]===b)te=e(Xe,{width:Do,text:"every"}),X=e(Xe,{width:vo,text:"runs"}),G=e(Xe,{width:xo,text:"tokens"}),C[11]=te,C[12]=X,C[13]=G;else te=C[11],X=C[12],G=C[13];let B;if(C[14]!==f)B=f&&e(Xe,{width:Zt,text:"per run"}),C[14]=f,C[15]=B;else B=C[15];let ee;if(C[16]===b)ee=e(Xe,{width:Mo,text:"last run"}),C[16]=ee;else ee=C[16];if(C[17]!==q||C[18]!==B)N=r(s,{children:[q,te,X,G,B,ee]}),C[17]=q,C[18]=B,C[19]=N;else N=C[19];P=L.map((se)=>r(s,{children:[e(s,{width:x,children:e(n,{dimColor:!0,wrap:"truncate-end",children:se.prompt})}),e(Xe,{width:Do,text:ha(se)}),e(Xe,{width:vo,text:String(se.runs)}),e(Xe,{width:xo,text:fr(se.tokens)}),f&&e(Xe,{width:Zt,text:se.runs>0&&se.tokens>0?fr(Math.round(se.tokens/se.runs)):"\u2013"}),e(Xe,{width:Mo,text:se.lastRunMs>0?FS(new Date(se.lastRunMs),{now:V}):"\u2013"})]},se.prompt));C[0]=x,C[1]=u,C[2]=f,C[3]=E,C[4]=D,C[5]=N,C[6]=P,C[7]=H}else E=C[3],D=C[4],N=C[5],P=C[6],H=C[7];let U;if(C[20]!==H)U=H>0&&r(n,{dimColor:!0,children:["\u2026 ",H," more"]}),C[20]=H,C[21]=U;else U=C[21];let q;if(C[22]!==E||C[23]!==D||C[24]!==N||C[25]!==P||C[26]!==U)q=r(E,{flexDirection:D,children:[N,P,U]}),C[22]=E,C[23]=D,C[24]=N,C[25]=P,C[26]=U,C[27]=q;else q=C[27];return q};
function Xe(o){let f=w(5),{width:u,text:h}=o,T;if(f[0]!==h)T=e(n,{dimColor:!0,wrap:"truncate-end",children:h}),f[0]=h,f[1]=T;else T=f[1];let x;if(f[2]!==T||f[3]!==u)x=e(s,{width:u,justifyContent:"flex-end",children:T}),f[2]=T,f[3]=u,f[4]=x;else x=f[4];return x};
function Et(o){let x=w(12),{top:u,maxWidth:h,headline:f,body:T}=o;if(!u||u.pct<Eo){return null}let C;if(x[0]!==f||x[1]!==u.name||x[2]!==u.pct)C=f(u.pct,u.name),x[0]=f,x[1]=u.name,x[2]=u.pct,x[3]=C;else C=x[3];let E;if(x[4]!==C)E=e(n,{wrap:"wrap",children:C}),x[4]=C,x[5]=E;else E=x[5];let D;if(x[6]!==T)D=e(s,{paddingLeft:1,children:e(n,{dimColor:!0,wrap:"wrap",children:T})}),x[6]=T,x[7]=D;else D=x[7];let N;if(x[8]!==h||x[9]!==E||x[10]!==D)N=r(s,{flexDirection:"column",width:h,children:[E,D]}),x[8]=h,x[9]=E,x[10]=D,x[11]=N;else N=x[11];return N};
function Cs(o){let x=w(22),{stat:u,totalCost:h,maxWidth:f}=o,T=sa[u.key],C,E,D,N,P,H;if(x[0]!==f||x[1]!==T||x[2]!==u.cost||x[3]!==h){let L=Math.round(u.cost/h*100);E=s;P="column";H=f;C=n;D="wrap";N=T.headline(L);x[0]=f,x[1]=T,x[2]=u.cost,x[3]=h,x[4]=C,x[5]=E,x[6]=D,x[7]=N,x[8]=P,x[9]=H}else C=x[4],E=x[5],D=x[6],N=x[7],P=x[8],H=x[9];let V;if(x[10]!==C||x[11]!==D||x[12]!==N)V=e(C,{wrap:D,children:N}),x[10]=C,x[11]=D,x[12]=N,x[13]=V;else V=x[13];let U;if(x[14]!==T.body)U=e(s,{paddingLeft:1,children:e(n,{dimColor:!0,wrap:"wrap",children:T.body})}),x[14]=T.body,x[15]=U;else U=x[15];let q;if(x[16]!==E||x[17]!==P||x[18]!==H||x[19]!==V||x[20]!==U)q=r(E,{flexDirection:P,width:H,children:[V,U]}),x[16]=E,x[17]=P,x[18]=H,x[19]=V,x[20]=U,x[21]=q;else q=x[21];return q};
function cd(zo){return zo.enrichError===null?zo:{...zo,enrichError:null}};
function ud(qn){return{text:qn.text,color:qn.variant}};
function dd(o){let{title:yo,displayName:Si,limit:Ko}=o;return{bar:Si,title:yo,limit:Ko,alwaysShowDateInReset:!0}};
function Pt(o){let q=w(41),{title:u,limit:h,maxWidth:f,showTimeInReset:T,alwaysShowDateInReset:x,extraSubtext:C,trailingLines:E,subtextOverride:D}=o,N=T===void 0?!0:T,P=x===void 0?!1:x,{utilization:H,resets_at:L}=h;if(H===null){return null}let V=`${Math.floor(H)}% used`,U;if(L){let te;if(q[0]!==P||q[1]!==L||q[2]!==N)te=Bbt(L,!0,N,P),q[0]=P,q[1]=L,q[2]=N,q[3]=te;else te=q[3];U=`Resets ${te}`}if(C){if(U)U=`${C} \xB7 ${U}`;else U=C}if(D!==void 0)U=D;if(f>=62){let te;if(q[4]!==u)te=e(n,{bold:!0,children:u}),q[4]=u,q[5]=te;else te=q[5];const X=H/100;let G;if(q[6]!==X)G=e(SA,{ratio:X,width:50,fillColor:"rate_limit_fill",emptyColor:"rate_limit_empty"}),q[6]=X,q[7]=G;else G=q[7];let B;if(q[8]!==V)B=e(n,{children:V}),q[8]=V,q[9]=B;else B=q[9];let ee;if(q[10]!==G||q[11]!==B)ee=r(s,{flexDirection:"row",gap:1,children:[G,B]}),q[10]=G,q[11]=B,q[12]=ee;else ee=q[12];let se;if(q[13]!==U)se=U&&e(n,{dimColor:!0,children:U}),q[13]=U,q[14]=se;else se=q[14];let oe;if(q[15]!==E)oe=e(Dn,{lines:E}),q[15]=E,q[16]=oe;else oe=q[16];let me;if(q[17]!==te||q[18]!==ee||q[19]!==se||q[20]!==oe)me=r(s,{flexDirection:"column",flexShrink:0,children:[te,ee,se,oe]}),q[17]=te,q[18]=ee,q[19]=se,q[20]=oe,q[21]=me;else me=q[21];return me}else{let te;if(q[22]!==u)te=e(n,{bold:!0,children:u}),q[22]=u,q[23]=te;else te=q[23];let X;if(q[24]!==U)X=U&&r(K,{children:[e(n,{children:" "}),r(n,{dimColor:!0,children:["\xB7 ",U]})]}),q[24]=U,q[25]=X;else X=q[25];let G;if(q[26]!==te||q[27]!==X)G=r(n,{children:[te,X]}),q[26]=te,q[27]=X,q[28]=G;else G=q[28];let B;if(q[29]!==E)B=e(Dn,{lines:E}),q[29]=E,q[30]=B;else B=q[30];const ee=H/100;let se;if(q[31]!==f||q[32]!==ee)se=e(SA,{ratio:ee,width:f,fillColor:"rate_limit_fill",emptyColor:"rate_limit_empty"}),q[31]=f,q[32]=ee,q[33]=se;else se=q[33];let oe;if(q[34]!==V)oe=e(n,{children:V}),q[34]=V,q[35]=oe;else oe=q[35];let me;if(q[36]!==G||q[37]!==B||q[38]!==se||q[39]!==oe)me=r(s,{flexDirection:"column",flexShrink:0,children:[G,B,se,oe]}),q[36]=G,q[37]=B,q[38]=se,q[39]=oe,q[40]=me;else me=q[40];return me}};
function Dn({lines:o}){return(o??[]).map((u,h)=>e(n,{dimColor:!u.color,color:u.color,children:u.text},h))};
var co="Failed to load usage data";
function Na(o,u){if(o===void 0)return"";return` as of ${FS(new Date(o),{now:u})}`};
function $s(o){let T=w(62),{maxWidth:u}=o,{storageV5:h,credentials:f}=Te(),x;if(T[0]!==h)x=()=>eJt(h),T[0]=h,T[1]=x;else x=T[1];let[C]=g(x),E;if(T[2]!==C?.fetchedAtMs||T[3]!==C?.source||T[4]!==C?.utilization)E=()=>({utilization:C?.utilization??null,source:C?.source??null,fetchedAtMs:C?.fetchedAtMs,enrichError:null}),T[2]=C?.fetchedAtMs,T[3]=C?.source,T[4]=C?.utilization,T[5]=E;else E=T[5];let[D,N]=g(E),{utilization:P,enrichError:H}=D,[L,V]=g(null),[U,q]=g(!0),te;if(T[6]!==f||T[7]!==h)te=async()=>{q(!0),V(null),N(cd);let X=await uMn(h,f);G:switch(X.status){case"ok":{N({utilization:X.utilization,source:"ok",fetchedAtMs:void 0,enrichError:null}),y("usage_plan_limits");break G}case"empty_response":{m("usage_plan_limits","empty_response"),V(co);break G}case"seeded":{let B=new Date;N((ee)=>{let se=ee.utilization===null;let oe=X.seedSource==="headers"?"headers":se?"persisted":ee.source;let me=X.seedSource==="headers"?void 0:se?X.seedFetchedAtMs:ee.fetchedAtMs;return{utilization:X.seedSource==="headers"?X.utilization:ee.utilization??X.utilization,source:oe,fetchedAtMs:me,enrichError:X.seedSource==="persisted"?`Showing last-known usage${oe==="persisted"?Na(me,B):""}${X.rateLimitedVia!==null?" (rate limited \u2014 try again in a moment)":" (could not refresh)"}`:X.rateLimitedVia!==null?JLt(X.utilization.limits)?"Partial usage data (rate limited \u2014 try again in a moment)":"Per-model breakdown unavailable (rate limited \u2014 try again in a moment)":"Could not refresh usage data"}}),p("usage_plan_limits",X.rateLimitedVia===null?"refresh_failed_seeded":X.rateLimitedVia==="envelope"?"rate_limited_seeded_envelope":"rate_limited_seeded_http_429");break G}case"unavailable":{if(X.rateLimitedVia!==null)V("Usage endpoint is rate limited. Please try again in a moment."),m("usage_plan_limits",X.rateLimitedVia==="envelope"?"rate_limited_envelope":"rate_limited_http_429");else V(X.responseBody?`${co}: ${X.responseBody}`:co),m("usage_plan_limits","load_failed")}}q(!1)},T[6]=f,T[7]=h,T[8]=te;else te=T[8];let ue=te,de,Le;if(T[9]!==ue)de=()=>{ue()},Le=[ue],T[9]=ue,T[10]=de,T[11]=Le;else de=T[10],Le=T[11];R(de,Le);let Ne;if(T[12]!==ue)Ne=()=>{ue()},T[12]=ue,T[13]=Ne;else Ne=T[13];const xe=(!!L||!!H)&&!U;let Ke;if(T[14]!==xe)Ke={context:"Settings",isActive:xe},T[14]=xe,T[15]=Ke;else Ke=T[15];if(We("settings:retry",Ne,Ke),L){let ye;if(T[16]!==L)ye=r(n,{color:"error",children:["Error: ",L]}),T[16]=L,T[17]=ye;else ye=T[17];let ke;if(T[18]===b)ke=e(n,{dimColor:!0,children:r(be,{children:[e(et,{action:"settings:retry",context:"Settings",fallback:"r",description:"retry"}),e(et,{action:"confirm:no",context:"Settings",fallback:"Esc",description:"cancel"})]})}),T[18]=ke;else ke=T[18];let Ge;if(T[19]!==ye)Ge=r(s,{flexDirection:"column",gap:1,children:[ye,ke]}),T[19]=ye,T[20]=Ge;else Ge=T[20];return Ge}if(!P){let ye;if(T[21]===b)ye=e(n,{dimColor:!0,children:"Loading usage data\u2026"}),T[21]=ye;else ye=T[21];let ke;if(T[22]===b)ke=r(s,{flexDirection:"column",gap:1,children:[ye,e(n,{dimColor:!0,children:e(et,{action:"confirm:no",context:"Settings",fallback:"Esc",description:"cancel"})})]}),T[22]=ke;else ke=T[22];return ke}let ye;if(T[23]===b)ye=ir(),T[23]=ye;else ye=T[23];let Ce=ye,qe=Ce==="max"||Ce==="team"||Ce===null,Re,ke,Ge,pe;if(T[24]!==u||T[25]!==P.five_hour||T[26]!==P.limits||T[27]!==P.seven_day||T[28]!==P.seven_day_sonnet){let Ue=jMr();let st=(Ee)=>Ue.filter((je)=>je.bar.toLowerCase()===Ee.toLowerCase()).map(ud);let Be=[{bar:"five_hour",title:"Current session",limit:P.five_hour,alwaysShowDateInReset:!1},{bar:"seven_day",title:"Current week (all models)",limit:P.seven_day,alwaysShowDateInReset:!0},...qe?[{bar:"seven_day_sonnet",title:"Current week (Sonnet only)",limit:P.seven_day_sonnet,alwaysShowDateInReset:!0}]:[],...but(P.limits,Gne()).map(dd)];Re=s;ke="column";Ge=1;pe=Be.map((ze)=>{let{bar:nt,title:Ie,limit:_e,alwaysShowDateInReset:Ye}=ze;return _e&&e(Pt,{title:Ie,limit:_e,maxWidth:u,alwaysShowDateInReset:Ye,trailingLines:st(nt)},Ie)});T[24]=u,T[25]=P.five_hour,T[26]=P.limits,T[27]=P.seven_day,T[28]=P.seven_day_sonnet,T[29]=Re,T[30]=ke,T[31]=Ge,T[32]=pe}else Re=T[29],ke=T[30],Ge=T[31],pe=T[32];let ze;if(T[33]!==u||T[34]!==P.cinder_cove)ze=P.cinder_cove&&e(Pt,{title:"Claude Code and Cowork credit",limit:P.cinder_cove,maxWidth:u,subtextOverride:P.cinder_cove.resets_at?`One-time credit \xB7 Expires ${new Date(P.cinder_cove.resets_at).toLocaleDateString("en-US",{month:"long",day:"numeric"})}`:"One-time credit"}),T[33]=u,T[34]=P.cinder_cove,T[35]=ze;else ze=T[35];let dt;if(T[36]!==u)dt=e(kn,{maxWidth:u}),T[36]=u,T[37]=dt;else dt=T[37];let mt;if(T[38]!==u||T[39]!==P.extra_usage)mt=P.extra_usage&&e(Us,{extraUsage:P.extra_usage,maxWidth:u}),T[38]=u,T[39]=P.extra_usage,T[40]=mt;else mt=T[40];let Tt;if(T[41]!==H)Tt=H&&e(n,{dimColor:!0,children:H}),T[41]=H,T[42]=Tt;else Tt=T[42];let pt;if(T[43]!==H||T[44]!==U)pt=U&&!H&&e(n,{dimColor:!0,children:"Refreshing\u2026"}),T[43]=H,T[44]=U,T[45]=pt;else pt=T[45];let gt;if(T[46]!==H)gt=H&&e(et,{action:"settings:retry",context:"Settings",fallback:"r",description:"retry"}),T[46]=H,T[47]=gt;else gt=T[47];let Ho;if(T[48]===b)Ho=e(et,{action:"confirm:no",context:"Settings",fallback:"Esc",description:"cancel"}),T[48]=Ho;else Ho=T[48];let no;if(T[49]!==gt)no=e(n,{dimColor:!0,children:r(be,{children:[gt,Ho]})}),T[49]=gt,T[50]=no;else no=T[50];let so;if(T[51]!==Re||T[52]!==ke||T[53]!==Ge||T[54]!==pe||T[55]!==ze||T[56]!==dt||T[57]!==mt||T[58]!==Tt||T[59]!==pt||T[60]!==no)so=r(Re,{flexDirection:ke,gap:Ge,children:[pe,ze,dt,mt,Tt,pt,no]}),T[51]=Re,T[52]=ke,T[53]=Ge,T[54]=pe,T[55]=ze,T[56]=dt,T[57]=mt,T[58]=Tt,T[59]=pt,T[60]=no,T[61]=so;else so=T[61];return so};
var Ut="Usage credits";
function Us(o){let C=w(27),{extraUsage:u,maxWidth:h}=o,f=ir(),T=f==="pro"||f==="max";if(!T&&!(f==="team"||f==="enterprise")){return null}if(!u.is_enabled){if(T&&F6.isEnabled()){let E;if(C[0]===b)E=e(UL,{subtitle:"Usage credits are off \xB7 /usage-credits to turn them on",children:Ut}),C[0]=E;else E=C[0];return E}return null}let D=u.currency??"USD";if(u.monthly_limit===null){if(T){let E;if(C[1]===b)E=e(UL,{subtitle:"Unlimited",children:Ut}),C[1]=E;else E=C[1];return E}if(typeof u.used_credits!=="number"){return null}let E;if(C[2]!==D||C[3]!==u.used_credits)E=gi(u.used_credits,D),C[2]=D,C[3]=u.used_credits,C[4]=E;else E=C[4];const N=`${E} spent`;let P;if(C[5]!==N)P=e(UL,{subtitle:N,children:Ut}),C[5]=N,C[6]=P;else P=C[6];return P}if(typeof u.used_credits!=="number"){return null}let H=u.utilization??(u.monthly_limit>0?Math.max(0,Math.min(100,u.used_credits/u.monthly_limit*100)):100),E;if(C[7]!==D||C[8]!==u.used_credits)E=gi(u.used_credits,D),C[7]=D,C[8]=u.used_credits,C[9]=E;else E=C[9];let L=E,N;if(C[10]!==D||C[11]!==u.monthly_limit)N=gi(u.monthly_limit,D),C[10]=D,C[11]=u.monthly_limit,C[12]=N;else N=C[12];let V=N,U,P,q,te;if(C[13]!==H){let X=new Date;let G=new Date(X.getFullYear(),X.getMonth()+1,1);U=Pt;te=Ut;P=H;q=G.toISOString();C[13]=H,C[14]=U,C[15]=P,C[16]=q,C[17]=te}else U=C[14],P=C[15],q=C[16],te=C[17];let B;if(C[18]!==P||C[19]!==q)B={utilization:P,resets_at:q},C[18]=P,C[19]=q,C[20]=B;else B=C[20];const ee=`${L} / ${V} spent`;let se;if(C[21]!==U||C[22]!==h||C[23]!==te||C[24]!==B||C[25]!==ee)se=e(U,{title:te,limit:B,showTimeInReset:!1,alwaysShowDateInReset:!0,extraSubtext:ee,maxWidth:h}),C[21]=U,C[22]=h,C[23]=te,C[24]=B,C[25]=ee,C[26]=se;else se=C[26];return se};
return $s;
}
export function createUsageUiNotices287(ports){
const {Id,MN,T,f,k,o,u}=ports;
var wie="tengu_rate_limit_promo_notices";
var kie=f(()=>T(u({bar:o(),text:o(),variant:Id((e)=>typeof e==="string"&&Object.hasOwn(MN("dark"),e)).optional().catch(void 0)})));
function jMr(){let e=k(wie,[]),n=kie().safeParse(e);return n.success?n.data:[]};
return jMr;
}
export function createUsageUiResetText287(ports){
const {}=ports;
var g=null;
function uJr(){if(!g)g=Intl.DateTimeFormat().resolvedOptions().timeZone;return g};
function Tu(e,t=!1,r=!0,n=!1){if(!e)return;let s=new Date(e*1000),o=new Date,c=s.getMinutes(),d=(s.getTime()-o.getTime())/3600000;if(n||d>24){let f={month:"short",day:"numeric",hour:r?"numeric":void 0,minute:!r||c===0?void 0:"2-digit",hour12:r?!0:void 0};if(s.getFullYear()!==o.getFullYear())f.year="numeric";return s.toLocaleString("en-US",f).replace(/[ \u202f]([AP]M)/i,(i,m)=>m.toLowerCase())+(t?` (${uJr()})`:"")}return s.toLocaleTimeString("en-US",{hour:"numeric",minute:c===0?void 0:"2-digit",hour12:!0}).replace(/[ \u202f]([AP]M)/i,(f,a)=>a.toLowerCase())+(t?` (${uJr()})`:"")};
function Bbt(e,t=!1,r=!0,n=!1){let s=new Date(e);return`${Tu(Math.floor(s.getTime()/1000),t,r,n)}`};
return Bbt;
}
export function createUsageCedarConfirm287(ports){
const {A,Kdr,Vdr,Vy,Wm,b,e,es,g,h4,ha,he,mo,n,qdr,qn,r,rM,s,un,w}=ports;
function ce(){};
function wGe(ae){let i=w(55),{offer:o,entry:d,credentials:J,onDone:f}=ae,[K,fe]=g(!1),E=A(!1),v=ha(mo),{refusedWithin:C,noteRefused:D}=es(),Q=Vy(),k,j,m,H,S,V,U,B,N,P,R,W,I,T,h;if(i[0]!==K||i[1]!==J||i[2]!==d||i[3]!==v||i[4]!==D||i[5]!==o||i[6]!==f||i[7]!==C||i[8]!==Q){V=un;Oe:{let c=rM();let u=h4(o);let l;if(i[24]!==o)l=Vdr(o),i[24]=o,i[25]=l;else l=i[25];let Y=l;let L;if(i[26]!==v||i[27]!==D||i[28]!==C)L=function p(){if(v()||C(mo)){return D(),!0}return!1},i[26]=v,i[27]=D,i[28]=C,i[29]=L;else L=i[29];let p=L;let F;if(i[30]!==d||i[31]!==o||i[32]!==f||i[33]!==p)F=function m(){if(E.current||p()){return}E.current=!0,f(qdr(d,o))},i[30]=d,i[31]=o,i[32]=f,i[33]=p,i[34]=F;else F=i[34];m=F;h=function h(){if(E.current||p()){return}E.current=!0,fe(!0),Kdr(d,J,o).then(f).catch(()=>{f({outcome:"unavailable",text:Wm(o.origin==="wall"?c.unconfirmedLine:c.unconfirmedAnytimeLine,u)})})};if(K){let O;if(i[35]===b)O=e(n,{dimColor:!0,children:"Resetting your limits\u2026 this usually takes a few seconds"}),i[35]=O;else O=i[35];V=e(he,{title:Wm(c.confirmTitle,u),onCancel:ce,exitOnCtrlCD:!0,color:"suggestion",hideInputGuide:!0,children:O});break Oe}j=he;W=Wm(c.confirmTitle,u);I=m;T="suggestion";let O;if(i[36]!==Y)O=Y===void 0?null:e(n,{children:Y}),i[36]=Y,i[37]=O;else O=i[37];S=r(s,{flexDirection:"column",children:[O,e(n,{children:Wm(c.confirmBody,u)}),e(n,{dimColor:!0,children:Wm(c.confirmDetail,u)})]});k=qn;H=p;U=Q;B=mo;N=!0;P=Wm(c.confirmYes,u);R=Wm(c.confirmNo,u)}i[0]=K,i[1]=J,i[2]=d,i[3]=v,i[4]=D,i[5]=o,i[6]=f,i[7]=C,i[8]=Q,i[9]=k,i[10]=j,i[11]=m,i[12]=H,i[13]=S,i[14]=V,i[15]=U,i[16]=B,i[17]=N,i[18]=P,i[19]=R,i[20]=W,i[21]=I,i[22]=T,i[23]=h}else k=i[9],j=i[10],m=i[11],H=i[12],S=i[13],V=i[14],U=i[15],B=i[16],N=i[17],P=i[18],R=i[19],W=i[20],I=i[21],T=i[22],h=i[23];if(V!==un)return V;let l;if(i[38]!==k||i[39]!==m||i[40]!==H||i[41]!==U||i[42]!==B||i[43]!==N||i[44]!==P||i[45]!==R||i[46]!==h)l=e(k,{refuseInput:H,openedAt:U,windowMs:B,hideIndexes:N,confirmLabel:P,cancelLabel:R,onConfirm:h,onCancel:m}),i[38]=k,i[39]=m,i[40]=H,i[41]=U,i[42]=B,i[43]=N,i[44]=P,i[45]=R,i[46]=h,i[47]=l;else l=i[47];let L;if(i[48]!==j||i[49]!==S||i[50]!==l||i[51]!==W||i[52]!==I||i[53]!==T)L=r(j,{title:W,onCancel:I,color:T,children:[S,l]}),i[48]=j,i[49]=S,i[50]=l,i[51]=W,i[52]=I,i[53]=T,i[54]=L;else L=i[54];return L};
return wGe;
}
export function createUsageSessionReason287(ports){
const {}=ports;
function Oqe(e){switch(e){case"clear":case"resume":case"remote_attach":return!0;case"fork":case"cd":case"spare_claim":case"hydrate":case"startup_custom_id":return!1}};
return Oqe;
}
export function createUsageOwnLabel287(ports){
const {}=ports;
function ra(e,r){return Object.hasOwn(e,r)?e[r]:void 0};
return ra;
}
export function createUsageExpectedError287(ports){
const {}=ports;
function Pu(n,e){if(e?.(n))return!0;if(!n||typeof n!=="object"||!("isAxiosError"in n)||!n.isAxiosError)return!1;let t=n.response?.status;return t===void 0||t===401||t===403||t===429};
return Pu;
}
export function createUsageClock287(ports){
const {}=ports;
var g=null;
function uJr(){if(!g)g=Intl.DateTimeFormat().resolvedOptions().timeZone;return g};
function Tu(e,t=!1,r=!0,n=!1){if(!e)return;let s=new Date(e*1000),o=new Date,c=s.getMinutes(),d=(s.getTime()-o.getTime())/3600000;if(n||d>24){let f={month:"short",day:"numeric",hour:r?"numeric":void 0,minute:!r||c===0?void 0:"2-digit",hour12:r?!0:void 0};if(s.getFullYear()!==o.getFullYear())f.year="numeric";return s.toLocaleString("en-US",f).replace(/[ \u202f]([AP]M)/i,(i,m)=>m.toLowerCase())+(t?` (${uJr()})`:"")}return s.toLocaleTimeString("en-US",{hour:"numeric",minute:c===0?void 0:"2-digit",hour12:!0}).replace(/[ \u202f]([AP]M)/i,(f,a)=>a.toLowerCase())+(t?` (${uJr()})`:"")};
return Tu;
}
export function createUsageEventFields287(ports){
const {}=ports;
function r(n){return n};
function S(n){return r(n)};
function c(n){return r(n)};
function me(n){return n==null?void 0:r(n)};
function Oa(n){return r([...n].sort().join(","))};
function bn(n){return r(n)};
return {c,me,Oa,S,bn};
}
export function createUsageGrantField287(ports){
const {S,bn}=ports;
function ye(n){if(n==null)return;return/^[A-Za-z0-9_-]{1,128}$/.test(n)?bn(n):S("nonconforming")};
return ye;
}
export function createUsageRollout287(ports){
const {}=ports;
var nDe="tengu_wise_bear_copy";
function Zdr(e){return typeof e==="object"&&e!==null&&Reflect.get(e,"only_if_unused_reset")===!0};
return {Zdr,nDe};
}
export function createUsageLabels287(ports){
const {ir,ra}=ports;
var Dhe={five_hour:"session limit",seven_day:"weekly limit",seven_day_opus:"Opus limit",seven_day_sonnet:"Sonnet limit",seven_day_overage_included:"Fable limit",overage:"usage credit limit"};
function DOt(){let e=ir();return e==="pro"||e==="enterprise"?Dhe.seven_day:Dhe.seven_day_sonnet};
function ult(e){return ra(Dhe,e)||e};
return {ult,DOt};
}
export function createUsageScopedModels287(ports){
const {Dt,IS,Uo,Vd,k,t}=ports;
var yie=Object.freeze(["Fable","Fable 5","Fable 5.1"]);
var _ie=Object.freeze([]);
function CF(){return IS()?_ie:yie};
var DF="tengu_usage_overage_included_models";
function Gne(){let e=k(DF,null);if(e===null||e===void 0)return CF();return Array.isArray(e)?e.filter((n)=>typeof n==="string"):[]};
var Sie=1500;
var OF="usage: overage-included models allowlist";
async function BMr(){let e=()=>Uo(DF,[]).source,n=Date.now();try{let r=e();if(r!=="fallback"&&r!=="disk")return;await Dt(Vd(),Sie,OF),t(`usage: GrowthBook init settled after ${Date.now()-n}ms; overage-included models allowlist now read from ${e()} (was ${r})`)}catch(r){t(`usage: overage-included models allowlist not refreshed after ${Date.now()-n}ms (${r instanceof Error&&r.message===OF?"timeout":"error"}); per-model rows use the cached list`,{level:"warn"})}};
return {Gne,BMr};
}
export function createUsageProgramConfig287(ports){
const {k}=ports;
var F5="limit-reset";
var ptr="tengu_cedar_ember";
var lg={label:"Use your reset now ({left} left, until {date})",noticeLine:`/${F5} to refill your limits \xB7 {resets} left \xB7 use by {date}`,spentLine:"Reset used \xB7 {resets} left",confirmTitle:"Use your reset?",confirmBody:"Refills your {limits} now \xB7 your weekly reset day stays {week}",confirmDetail:"{resets} left \xB7 use by {deadline}",confirmYes:"Yes, use my reset",confirmNo:"No, keep it",successLine:"Limits reset \xB7 your weekly reset day stays {week} \xB7 {resets} left",keptLine:`Reset kept \xB7 run /${F5} at a limit to use it \xB7 use by {deadline}`,keptAnytimeLine:`Reset kept \xB7 run /${F5} whenever you want to use it \xB7 use by {deadline}`,unavailableLine:"Couldn't reset your limits \xB7 nothing was used \xB7 try again in a moment",unconfirmedLine:"Couldn't confirm the reset went through \xB7 if you're still at the limit in a moment, try again",unconfirmedAnytimeLine:`Couldn't confirm the reset went through \xB7 check /usage in a moment \xB7 if your limits weren't refilled, run /${F5} again`,stillUnconfirmedLine:"Still couldn't confirm your reset \xB7 nothing more was used \xB7 if your limits aren't refilled in a few minutes, contact support",earlyLine:"You still have {percent}% of your {limit} left \u2014 use your reset anyway?",earlyNoNumberLine:"You haven't reached a limit yet \u2014 use your reset anyway?"};
function nfe(){let e=k(ptr,{});return typeof e==="object"&&e!==null&&!Array.isArray(e)?e:{}};
function Ine(){return nfe().enabled===!0};
function e5e(){let e=nfe().version;return typeof e==="number"&&Number.isFinite(e)?e:0};
function zIo(){return nfe().autoContinue!==!1};
function dg(e,n){return typeof e==="string"&&e.trim()!==""?e:n};
function rM(){let e=nfe();return{label:dg(e.label,lg.label),noticeLine:dg(e.noticeLine,lg.noticeLine),spentLine:dg(e.spentLine,lg.spentLine),confirmTitle:dg(e.confirmTitle,lg.confirmTitle),confirmBody:dg(e.confirmBody,lg.confirmBody),confirmDetail:dg(e.confirmDetail,lg.confirmDetail),confirmYes:dg(e.confirmYes,lg.confirmYes),confirmNo:dg(e.confirmNo,lg.confirmNo),successLine:dg(e.successLine,lg.successLine),keptLine:dg(e.keptLine,lg.keptLine),keptAnytimeLine:dg(e.keptAnytimeLine,lg.keptAnytimeLine),unavailableLine:dg(e.unavailableLine,lg.unavailableLine),unconfirmedLine:dg(e.unconfirmedLine,lg.unconfirmedLine),unconfirmedAnytimeLine:dg(e.unconfirmedAnytimeLine,lg.unconfirmedAnytimeLine),stillUnconfirmedLine:dg(e.stillUnconfirmedLine,lg.stillUnconfirmedLine),earlyLine:dg(e.earlyLine,lg.earlyLine),earlyNoNumberLine:dg(e.earlyNoNumberLine,lg.earlyNoNumberLine)}};
var K8t=" \xB7 ";
function Wm(e,n){let r={"{left}":n.left===void 0?void 0:String(n.left),"{resets}":n.left===void 0?void 0:n.left===0?"no resets":n.left===1?"1 reset":`${n.left} resets`,"{date}":n.date,"{deadline}":n.deadline,"{week}":n.week,"{limits}":n.limits,"{percent}":n.percent===void 0?void 0:String(n.percent),"{limit}":n.limit},s=Object.keys(r).filter((h)=>r[h]===void 0&&e.includes(h)),g=e;if(s.length>0){let h=g.split(K8t).filter((b)=>!s.some((w)=>b.includes(w)));g=h.length>0?h.join(K8t):g.replace(/ \([^)]*\{[a-z]+\}[^)]*\)/g,"");for(let b of s)g=g.replaceAll(b,"\u2026")}for(let[h,b]of Object.entries(r))if(b!==void 0)g=g.replaceAll(h,b);return g};
var mtr="tengu_nifty_lemur";
var XY={label:"Reset your session limit now",noticeLine:`/${F5} to reset your session limit now \xB7 uses weekly limit \xB7 1/week`,spentLine:"Weekly reset used \xB7 available again {date}",successLine:"Session limit reset \xB7 next reset available {date} \xB7 your weekly limit still applies",unavailableLine:"Couldn't reset your session limit right now \xB7 try again in a moment"};
function ofe(){let e=k(mtr,{});return typeof e==="object"&&e!==null&&!Array.isArray(e)?e:{}};
function Uye(){return ofe().enabled===!0};
function fcn(){let e=ofe().version;return typeof e==="number"&&Number.isFinite(e)?e:0};
function VIo(){return ofe().autoContinue!==!1};
function QY(e,n){return typeof e==="string"&&e.trim()!==""?e:n};
function One(){let e=ofe();return{label:QY(e.label,XY.label),noticeLine:QY(e.noticeLine,XY.noticeLine),spentLine:QY(e.spentLine,XY.spentLine),successLine:QY(e.successLine,XY.successLine),unavailableLine:QY(e.unavailableLine,XY.unavailableLine)}};
function Bzn(e,n){if(!e.includes("{date}"))return e;if(n!==void 0)return e.replaceAll("{date}",n);let r=e.split(" \xB7 ").filter((s)=>!s.includes("{date}")).join(" \xB7 ");return r!==""?r:e.replaceAll("{date}","later")};
return {Ine,Uye,e5e,fcn,rM,One,Wm,Bzn,zIo,VIo,F5};
}
export function createUsageProgramEligibility287(ports){
const {Ev,Ge,In,Pt,Wn,Wu,YE,ft,ir,ja,t}=ports;
function CV(e){return e.status==="rejected"&&e.resetsAt!==void 0&&Number.isFinite(e.resetsAt)&&e.isUsingOverage!==!0&&e.overageInUse!==!0};
var o="You can continue now. Continue the task you were working on when the usage limit was reached; do not repeat work that is already complete.";
function Aot(){return ft()&&In()?.billingType!=="usage_based"&&ja()&&Wu()&&!Wn()&&!Pt()};
function nte(e){return Aot()&&CV(e)&&e.rateLimitType==="five_hour"};
var r=["five_hour","seven_day","seven_day_overage_included","seven_day_opus","seven_day_sonnet"];
function M7t(e){return Aot()&&CV(e)&&e.rateLimitType!==void 0&&r.includes(e.rateLimitType)};
function Tot(){switch(ir()){case"pro":return"pro";case"max":switch(YE()){case"default_claude_max_5x":return"max_5x";case"default_claude_max_20x":return"max_20x";default:return"max_other"}default:return"other"}};
function xVe(){Ev({agentId:Ge(),mode:"prompt",priority:"later",value:o,uuid:t(),origin:{kind:"auto-continuation"},isMeta:!0,skipSlashCommands:!0})};
return {nte,M7t,Tot,Aot,xVe,CV};
}
export function createUsageSurfaces287(ports){
const {n}=ports;
function Wu(){return n().host.launchOptions.isInteractive()};
function Wn(){return n().surfaceCapabilities.caps().workspace==="remote"};
return {Wu,Wn};
}
export function createUsageTimeout287(ports){
const {}=ports;
var s=(t,r)=>{let e=setTimeout(t,r);return()=>clearTimeout(e)};
function lt(t,r,e=s){let o=()=>{},n=new Promise((m)=>{o=e(()=>m(void 0),r)});return Promise.race([t,n]).finally(o)};
return lt;
}
export function createUsageBehavior287(ports){
const {ue}=ports;
var oe=604800000;
var Ae=1e5;
var Oe=150000;
var Le=3;
var we=0.5;
var Ie=300000;
var Ne=4;
var ke=8;
function On(e){return(e.cached+e.uncached*10+e.cacheCreate*12.5+e.output*50)*e.modelTier};
async function lRt(e){let n=Date.now()-oe,o=Date.now()-86400000,s=J(),r=J();return await ue(n,(i)=>{if(ee(r,i),i.ts>=o)ee(s,i,o)},e,(i)=>{if(Z(r,i),i.ts>=o)Z(s,i)}),{day:ne(s),week:ne(r)}};
function J(){return{totalCost:0,requestCount:0,cacheMissCost:0,cacheMissCount:0,longCtxCost:0,longCtxCount:0,sessions:new Map,buckets:new Map,byAgent:new Map,bySkill:new Map,byPlugin:new Map,byMcpServer:new Map,loops:new Map}};
function ge(e,n){let o=e.loops.get(n.prompt);if(!o)o={prompt:n.prompt,cron:n.cron,isDynamic:n.isDynamic,runs:0,tokens:0,lastRunMs:0},e.loops.set(n.prompt,o);return o};
function Z(e,n){let o=ge(e,n.loop);if(o.runs++,n.ts>=o.lastRunMs)o.lastRunMs=n.ts,o.cron=n.loop.cron??o.cron,o.isDynamic=n.loop.isDynamic};
function N(e,n,o){if(n)e.set(n,(e.get(n)??0)+o)};
function ee(e,n,o=-1/0){let s=On(n);if(e.totalCost+=s,e.requestCount++,n.attributionAgent)N(e.byAgent,n.attributionSkill??n.attributionAgent,s);else N(e.bySkill,n.attributionSkill,s);if(N(e.byPlugin,n.attributionPlugin,s),N(e.byMcpServer,n.attributionMcpServer,s),n.loop||n.loopShares){let m=n.cached+n.cacheCreate+n.uncached+n.output;for(let{loop:S,fireTs:u,share:T}of n.loopShares??[{loop:n.loop,fireTs:n.loopFireTs??n.ts,share:1}])if(u>=o)ge(e,S).tokens+=m*T}let r=n.cached+n.cacheCreate+n.uncached;if(n.uncached>Ae)e.cacheMissCost+=s,e.cacheMissCount++;if(r>Oe)e.longCtxCost+=s,e.longCtxCount++;let i=e.sessions.get(n.sessionId);if(!i)i={cost:0,requests:0,subCost:0,subCount:0,hours:new Set},e.sessions.set(n.sessionId,i);if(i.cost+=s,i.requests++,n.isSubagent)i.subCost+=s,i.subCount++;i.hours.add(Math.floor(n.ts/3600000));let c=Math.floor(n.ts/Ie),a=e.buckets.get(c);if(!a)a={sids:new Set,cost:0,count:0},e.buckets.set(c,a);a.sids.add(n.sessionId),a.cost+=s,a.count++};
function ne(e){let n=0,o=0;for(let m of e.buckets.values())if(m.sids.size>=Ne)n+=m.cost,o+=m.count;let s=0,r=0,i=0,c=0;for(let m of e.sessions.values()){if(m.subCount>=Le||m.cost>0&&m.subCost/m.cost>we)s+=m.cost,r++;if(m.hours.size>=ke)i+=m.cost,c++}let a=[{key:"cache_miss",cost:e.cacheMissCost,count:e.cacheMissCount},{key:"long_context",cost:e.longCtxCost,count:e.longCtxCount},{key:"subagent_heavy",cost:s,count:r},{key:"high_parallel",cost:n,count:o},{key:"cron",cost:i,count:c}];return a.sort((m,S)=>S.cost-m.cost),{totalCost:e.totalCost,requestCount:e.requestCount,sessionCount:e.sessions.size,behaviors:a,agents:k(e.byAgent,e.totalCost),skills:k(e.bySkill,e.totalCost),plugins:k(e.byPlugin,e.totalCost),mcpServers:k(e.byMcpServer,e.totalCost),loops:[...e.loops.values()].map((m)=>({...m,tokens:Math.round(m.tokens)})).sort((m,S)=>S.tokens-m.tokens)}};
function k(e,n){if(e.size===0||n===0)return[];return[...e.entries()].sort((o,s)=>s[1]-o[1]).map(([o,s])=>({name:o,pct:Math.round(s/n*100)})).filter((o)=>o.pct>0)};
return lRt;
}
export function createUsageTranscripts287(ports){
const {Ce,Dp,H,Ht,Ln,QK,SQr,_,d,j,v,zo}=ports;
var KGt="You ended the turn without calling SendUserMessage.";
var hW="local-command-caveat";
var Xp="local-command-stderr";
var id="local-command-stdout";
var VU="bash-stderr";
var Qse="bash-stdout";
var dwe="Operation stopped by hook";
var Jw="[Request interrupted by user]";
var tGt="Your response above was cut off mid-stream and only your next message is delivered. "+"Write the complete response again from the start \u2014 no apology, no mention of the cut-off.";
var eGt="Your response above was cut off mid-stream. Resume directly from where it stops \u2014 no apology, no recap. "+"If none of it survived, answer the request from the start.";
var Z6t="Output token limit hit. Resume directly \u2014 no apology, no recap of what you were doing. "+"Pick up mid-thought if that is where the cut happened. Break remaining work into smaller pieces.";
var Q6t="The PermissionDenied hook indicated you may retry this tool call.";
var J6t="[Your previous response had no visible output. Please continue and produce a user-visible response.]";
var J4r="Your tool call was malformed and could not be parsed. Please retry.";
var X6t="The previous response failed to produce a valid tool call. Please retry the tool call now.";
var evn="Goal check-in: \xAB";
var jJe="[projects-reply-gate]";
var X4r="";
var oSt="[structured-output-enforce]";
var _er=` hook feedback:
`;
var Y4r=["Stop","TeammateIdle","TaskCreated","TaskCompleted"];
var D=4;
var p=new TextEncoder;
var se=p.encode('"type":"assistant"');
var ve=p.encode('"usage":{');
var re=p.encode('"timestamp":"');
var De=p.encode('"sessionId":"');
var Pe=p.encode('"model":"');
var xe=p.encode('"requestId":"');
var z=p.encode('"id":"');
var Be=p.encode("msg_");
var ie=p.encode('"uuid":"');
var Ue=p.encode('"input_tokens":');
var Fe=p.encode('"output_tokens":');
var He=p.encode('"cache_creation_input_tokens":');
var Ke=p.encode('"cache_read_input_tokens":');
var Ge=p.encode('"isSidechain":true');
var qe=p.encode('"isSidechain": true');
var $e=p.encode('"attribution');
var We=p.encode('"attributionAgent":"');
var Ye=p.encode('"attributionSkill":"');
var je=p.encode('"attributionPlugin":"');
var ze=p.encode('"attributionMcpServer":"');
var Xe=p.encode('"type":"user"');
var U=p.encode('"isMeta":true');
var Ve=p.encode('"subtype":"scheduled_task_fire"');
var Qe=p.encode('"taskId":"');
var F=p.encode('"scheduledTaskId":"');
var Je=p.encode('"scheduledFireId":"');
var Ze=p.encode('"type":"tool_result"');
var en=p.encode('"turnCompanion":true');
var nn=p.encode(`"text":"${Jw.slice(0,-1)}`);
var X=p.encode('"content":"[');
var tn=p.encode(" prior /loop wakeup");
var sn=p.encode('"isCompactSummary":true');
var rn=p.encode('"type":"attachment"');
var cn=p.encode('"type":"queued_command"');
var an=p.encode('"origin":{');
var un=p.encode('"origin":{"kind":"human"');
var dn=p.encode('"promptSource":"');
var pn=p.encode('"type":"system"');
var ln=p.encode('"subtype":"local_command"');
var w=(e)=>[p.encode(`"content":"<${e}>`),p.encode(`"text":"<${e}>`)];
var V=[...w("command-message"),...w("command-name")];
var fn=w(hW);
var Q=[...w(id),...w(Xp)];
var mn=[...w(Qse),...w(VU)];
var L=(e,n,o)=>n.some((s)=>g(e,s,0,o)>=0);
var _n=[p.encode(`"content":${_(dwe).slice(0,-1)}`),p.encode(`"text":${_(dwe).slice(0,-1)}`)];
var ce=(e,n=!1)=>{let o=n?_(e):_(e).slice(0,-1);return[p.encode(`"content":${o}`),p.encode(`"text":${o}`)]};
var Sn=[...Y4r.map((e)=>`${e}${_er}`),oSt,X4r,jJe,KGt,evn].filter((e)=>e.length>0).flatMap((e)=>ce(e));
var gn=[X6t,J4r,J6t,Q6t,Z6t,eGt,tGt].flatMap((e)=>ce(e,!0));
var Tn=p.encode('"cron":"');
var hn=p.encode('"prompt":"');
var Rn=p.encode('"taskKind":"loop"');
var Mn=p.encode('"content":"');
var En=p.encode('"text":"');
var q=34;
var yn=92;
var K=48;
var ae=57;
function g(e,n,o,s){let r=e.subarray(o,s).indexOf(n);return r<0?-1:o+r};
function E(e,n,o,s){let r=g(e,n,o,s);if(r<0)return;let i=r+n.length,c=i;while(c<s&&e[c]!==q)c++;return e.toString("utf8",i,c)};
function P(e,n,o,s,r){let i=g(e,n,o,s);if(i<0)return;let c=i+n.length,a=c,m=Math.min(s,c+r);while(a<m&&e[a]!==q){if(e[a]===yn)a++;a++}let S=a>=m;if(a>m)a=m-1;if(S)a=Cn(e,c,a);let u=e.toString("utf8",c,a);if(S)u=u.replace(/(^|[^\\])((?:\\\\)*)\\u[0-9a-fA-F]{0,3}$/,"$1$2");try{let T=zo(`"${u}"`);return typeof T==="string"?T:void 0}catch{return}};
function Cn(e,n,o){let s=o;while(s>n&&(e[s-1]&192)===128)s--;if(s===n)return n;let r=e[s-1],i=r>=240?4:r>=224?3:r>=192?2:1;return o-(s-1)<i?s-1:o};
function bn(e,n,o){let s=n;while(!0){if(s=g(e,z,s,o),s<0)return;let r=s+z.length;if(g(e,Be,r,r+4)===r){let i=r;while(i<o&&e[i]!==q)i++;return e.toString("utf8",r,i)}s=r}};
function I(e,n,o,s){let r=g(e,n,o,s);if(r<0)return 0;let i=r+n.length,c=0;while(i<s&&e[i]>=K&&e[i]<=ae)c=c*10+(e[i]-K),i++;return c};
function An(e){if(!e)return 3;let n=e.toLowerCase();if(n.includes("fable"))return 10;if(n.includes("opus"))return 5;if(n.includes("haiku"))return 1;return 3};
async function ue(e,n,o,s,r){if(o)return Ln(o,e,n,s,r);let i=Dp(),c;try{c=await H(i)}catch(u){if(Ht(u))return;throw u}let m=(await Promise.all(c.map((u)=>vn(v(i,u))))).flat(),S=de(n,s);for(let u=0;u<m.length;u+=D){let T=m.slice(u,u+D),h=T.map(()=>r&&_e(r()));(await Promise.all(T.map((y,l)=>Dn(y,e,h[l])))).forEach((y,l)=>{S(y),h[l]?.end(y)})}};
function de(e,n){let o=new Set,s=(r)=>{if(!r)return!0;if(o.has(r))return!1;return o.add(r),!0};return(r)=>{for(let i of r.records)if(s(i.uuid))e(i);if(n){for(let i of r.fires)if(s(i.uuid))n(i)}}};
async function vn(e){let n;try{n=await H(e,{withFileTypes:!0})}catch(i){if(Ht(i))return[];throw i}let o=[],s=[];for(let i of n)if(i.isFile()&&j(i.name)===".jsonl")o.push(v(e,i.name));else if(i.isDirectory())s.push(i.name);let r=await Promise.all(s.map(async(i)=>{let c=v(e,i,"subagents");try{return(await H(c,{recursive:!0})).filter((m)=>j(m)===".jsonl").map((m)=>v(c,m))}catch(a){if(Ht(a))return[];throw a}}));for(let i of r)for(let c of i)o.push(c);return o};
async function Dn(e,n,o){let s=fe();return await Pn(e,n,me(s,n,o)),s};
async function Pn(e,n,o){let s;try{s=await Ce(e)}catch(r){if(Ht(r))return;throw r}if(!s.isFile()||s.mtimeMs<n)return;try{for await(let r of SQr(e))o(r)}catch(r){if(Ht(r))return;throw r}};
function fe(){return{records:[],fires:[]}};
function me(e,n,o){let s=Bn(e,n);if(!o)return s;return(r)=>{s(r),o.line(r,e)}};
function _e(e){let n=!0,o=(s)=>{if(!n)return;try{s()}catch(r){n=!1,d(r)}};return{line:(s,r)=>o(()=>e.line(s,r)),end:(s)=>o(()=>e.end(s))}};
var xn=/<command-name>([^<]{1,200})<\/command-name>/;
var Y=200;
var G=6*Y;
function Bn(e,n){let o=0,s=[],r=[],i=0,c=!0,a,m=()=>{o++,r=[],i=0,c=!1},S=()=>{o++,r=[],i=0,c=!0,h=void 0,a=void 0},u=()=>{if(!a)return;if(i=Math.max(0,i-1),a.run)e.fires.pop(),r.pop();if(a.fire&&a.fire.taskId===void 0)s.unshift(a.fire);a=void 0},T=()=>{if(a?.isCommandRecord)u(),S()},h,A=(l,f)=>{let R=E(l,Je,0,f);if(R!==void 0){let M=s.findIndex((b)=>b.uuid===R);return M<0?void 0:s.splice(M,1)[0]}let C=E(l,F,0,f);if(C!==void 0){let M=s.findLastIndex((x)=>x.taskId===C);if(M<0)return;let b=s[M];return s=s.filter((x)=>x.taskId!==C),b}if(!(g(l,an,0,f)<0&&(g(l,U,0,f)>=0||L(l,V,f)))){s=s.filter((M)=>M.taskId!==void 0);return}if(s[0]?.taskId===void 0)return s.shift();return},y=(l,f)=>g(l,U,0,f)>=0&&(Sn.some((R)=>g(l,R,0,f)>=0)||gn.some((R)=>g(l,R,0,f)>=0));return(l)=>{let f=l.length;if(g(l,se,0,f)>=0){let R=Gn(l,0,f,n);if(c=!0,a=void 0,R){if(i>1&&r.length>0){let C=1/i;R.loopShares=r.map((O)=>({...O,share:C}))}else if(r[0])R.loop=r[0].loop,R.loopFireTs=r[0].fireTs;e.records.push(R)}return}if(g(l,Xe,0,f)>=0){if(g(l,Ze,0,f)>=0||g(l,en,0,f)>=0||g(l,sn,0,f)>=0||L(l,mn,f)||Un(l,f)||y(l,f))return;if(g(l,nn,0,f)>=0){S();return}let R=g(l,U,0,f)>=0;if(R&&L(l,_n,f)){if(u(),i===0)S();return}if(L(l,Q,f)){T();return}let C=L(l,V,f);if(L(l,fn,f)||R&&!C&&g(l,dn,0,f)<0&&g(l,F,0,f)<0)return;let O=g(l,un,0,f)>=0||!R&&!C&&g(l,F,0,f)<0,M=A(l,f);if(M?.openBatch===o&&!c&&i>0)S();if(c||O)m();if(i++,a={fire:M,run:!1,isCommandRecord:C},!M){h=void 0;return}let b=M.loop??Kn(l,f);if(!b)return;if(!b.isDynamic)h=void 0;if(M.ts<n)return;e.fires.push({ts:M.ts,uuid:M.uuid,loop:b}),r.push({loop:b,fireTs:M.ts}),a.run=!0;return}if(g(l,pn,0,f)>=0&&g(l,ln,0,f)>=0&&L(l,Q,f)){T();return}if(g(l,rn,0,f)>=0&&g(l,cn,0,f)>=0){S();return}if(g(l,Ve,0,f)>=0){let R=E(l,re,0,f),C=R?Date.parse(R):NaN;if(Number.isNaN(C))return;let O=P(l,hn,0,f,G),M=O?QK(O,Y):void 0,b=g(l,Rn,0,f)>=0;if(M&&b)h??=M,M=h;s.push({ts:C,openBatch:i>0&&!c?o:void 0,uuid:E(l,ie,0,f)??"",taskId:E(l,Qe,0,f),loop:M?{prompt:M,cron:Hn(P(l,Tn,0,f,Fn)),isDynamic:b}:null})}}};
function Un(e,n){let o=g(e,X,0,n);if(o<0)return!1;let s=o+X.length,r=s;while(s<n&&e[s]>=K&&e[s]<=ae)s++;return s>r&&g(e,tn,s,n)===s};
var Se=64;
var Fn=6*Se;
function Hn(e){return e===void 0?void 0:QK(e,Se)};
function Kn(e,n){let o=P(e,Mn,0,n,G)??P(e,En,0,n,G);if(!o)return null;let s=o.match(xn)?.[1],r=QK(s??o,Y);return r?{prompt:r,cron:void 0,isDynamic:!1}:null};
function Gn(e,n,o,s){if(g(e,se,n,o)<0)return;if(g(e,ve,n,o)<0)return;let r=E(e,re,n,o),i=E(e,De,n,o);if(!r||!i)return;let c=Date.parse(r);if(Number.isNaN(c)||c<s)return;let a=I(e,Ue,n,o),m=I(e,Fe,n,o),S=I(e,He,n,o),u=I(e,Ke,n,o);if(a+m+S+u===0)return;let T=g(e,$e,n,o)>=0,h=E(e,Pe,n,o);return{ts:c,sessionId:i,cached:u,cacheCreate:S,uncached:a,output:m,isSubagent:g(e,Ge,n,o)>=0||g(e,qe,n,o)>=0,modelTier:An(h),model:h,uuid:E(e,xe,n,o)??bn(e,n,o)??E(e,ie,n,o)??"",...T&&{attributionAgent:E(e,We,n,o),attributionSkill:E(e,Ye,n,o),attributionPlugin:E(e,je,n,o),attributionMcpServer:E(e,ze,n,o)}}};
return {read:ue,parse:Gn};
}
export function createUsageTranscriptIoErrors287(ports){
const {}=ports;
function E(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return};
var u=new Set(["ENOENT","EACCES","EPERM","ENOTDIR","ELOOP","ENAMETOOLONG","EROFS"]);
function Ht(n){return PT(E(n))};
function PT(n){return n!==void 0&&u.has(n)};
return Ht;
}
export function createUsageTranscriptLines287(ports){
const {K}=ports;
function zo(e){return JSON.parse(e)};
async function*SQr(e,n=65536){let r=await K(e,"r"),s=Buffer.alloc(n),i=0,o=[],a=0;try{while(!0){let{bytesRead:u}=await r.read(s,0,n,i);if(u===0)break;i+=u;let l=s.subarray(0,u),c=0;while(c<u){let f=l.indexOf(10,c);if(f===-1){o.push(Buffer.from(l.subarray(c))),a+=u-c;break}if(a===0)yield l.subarray(c,f);else yield Buffer.concat([...o,l.subarray(c,f)],a+(f-c)),o=[],a=0;c=f+1}}}finally{await r.close()}if(a>0)yield o.length===1?o[0]:Buffer.concat(o,a)};
return {SQr,zo};
}
export function createUsageTranscriptText287(ports){
const {}=ports;
function re(t,n){if(n<=0)return"";if(t.length<=n)return t;let e=t.slice(0,n),r=e.charCodeAt(n-1);return f(r>=55296&&r<=56319?e.slice(0,-1):e)};
function f(t){if(typeof Buffer<"u")return Buffer.from(t,"utf16le").toString("utf16le");return x(t)};
function x(t){let e=[];for(let r=0;r<t.length;r+=8192){let i=Math.min(r+8192,t.length),o=new Uint16Array(i-r);for(let u=r;u<i;u++)o[u-r]=t.charCodeAt(u);e.push(String.fromCharCode(...o))}return e.join("")};
var oee=/[\x00-\x08\x0E-\x1F\x7F-\x9F]/g;
function Ar(t){return t.replace(oee,"").replace(/\s+/g," ").trim()};
function gO(t){return t.replace(/[\p{Cc}\p{Cf}\p{Cs}\p{Default_Ignorable_Code_Point}\u2028\u2029]/gu,"")};
var d=/[\u001B\u009B][[\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\d/#&.:=?%@~_]+)*|[a-zA-Z\d]+(?:;[-a-zA-Z\d/#&.:=?%@~_]*)*)?(?:\u0007|\u001B\u005C|\u009C))|(?:(?:\d{1,4}(?:;\d{0,4})*)?[\dA-PR-TZcf-nq-uy=><~]))/g;
function QK(t,n){return re(ZK(t),n)};
function ZK(t){return gO(Ar(t.replace(d,""))).trim()};
return QK;
}
export function createUsageSdkReader287(ports){
const {BMr,Gne,IAo,In,JLt,OAo,P2n,Pu,Sut,VV,ZRr,_,but,d,ft,g0,l,mHo,t,zp}=ports;
function eJt(e){let n=VV();if(!n.five_hour&&!n.seven_day){let s=P2n(e);return s?{utilization:s.utilization,source:"persisted",fetchedAtMs:s.fetchedAtMs}:null}let o=(s)=>s?{utilization:s.utilization*100,resets_at:new Date(s.resets_at*1000).toISOString()}:void 0,i=z(ZRr().seven_day_overage_included,e);return{utilization:{five_hour:o(n.five_hour),seven_day:o(n.seven_day),...i&&{limits:[i]}},source:"headers"}};
function z(e,n){if(!e)return;let o=Gne();if(!o[0])return;let i=but(P2n(n)?.utilization.limits,o),s=i.length===1?i[0].displayName:o[0];return{kind:"weekly_scoped",group:"weekly",percent:e.utilization*100,resets_at:new Date(e.resets_at*1000).toISOString(),scope:{model:{display_name:s}}}};
function f(e,n){return{status:"seeded",utilization:e.utilization,rateLimitedVia:n,seedSource:e.source,seedFetchedAtMs:e.fetchedAtMs}};
var y=200;
function g(e){if(e.length<=y)return e;return`${e.slice(0,y).replace(/[\uD800-\uDBFF]$/,"")}\u2026`};
async function uMn(e,n){let o=await R(e,n);if(o.status!=="ok"&&o.status!=="seeded")return o;if(o.status==="seeded"&&o.seedSource==="headers"){let i=ZRr().seven_day_overage_included;if(i){await BMr();let s=z(i,e),{limits:a,...c}=o.utilization;return{...o,utilization:s?{...c,limits:[s]}:c}}}if(JLt(o.utilization.limits))await BMr();return o};
async function R(e,n){let o=In()?.accountUuid;if(ft()&&zp()){let i=OAo(e);if(i)return t(`Usage read answered from a snapshot ${Math.round(i.ageMs/1000)}s old; endpoint not asked`),{status:"ok",utilization:i.utilization}}try{let i=await g0(n);if(!i)return{status:"empty_response"};let s=ft()&&zp(),a=mHo(i),c=Sut(i);if(!a||s&&!c){t("Usage fetch returned a fieldless or non-object body (in-band error)",{level:"error"});let u=a&&"error"in i?i.error:void 0,p=typeof u==="object"&&u!==null&&"type"in u&&u.type==="rate_limit_error"?"envelope":null,m=eJt(e);if(m)return f(m,p);return{status:"unavailable",rateLimitedVia:p,responseBody:g(_(i))}}if(c)IAo(i,o,e);return{status:"ok",utilization:i}}catch(i){if(Pu(i))t(`Failed to load usage data: ${l(i)}`,{level:"error"});else d(i);let s=i,a=s.response?.status===429?"http_429":null,c=eJt(e);if(c)return f(c,a);return{status:"unavailable",rateLimitedVia:a,responseBody:s.response?.data?g(_(s.response.data)):void 0}}};
return {read:uMn,seed:eJt};
}
export function createUsageSdkReply287(ports){
const {Gne,REe,_O,ah,aie,but,d,ft,gHo,ir,kMe,l,lRt,nP,t,uMn,xEe,zp}=ports;
var f_r=10;
function h(e){return{request_count:e.requestCount,session_count:e.sessionCount,behaviors:e.behaviors.filter((n)=>e.totalCost>0&&n.cost/e.totalCost*100>=f_r).map((n)=>({key:n.key,pct:Math.round(n.cost/e.totalCost*100),count:n.count})),agents:e.agents,skills:e.skills,plugins:e.plugins,mcp_servers:e.mcpServers}};
async function tJt({includeBehaviors:e=!0,storageV5:n,credentials:o}){let i=ft(),s=i&&zp(),[a,c]=await Promise.all([s?uMn(n,o):Promise.resolve(null),e&&i&&kMe().allowed?lRt(n).then((r)=>({day:h(r.day),week:h(r.week)}),(r)=>(d(r),null)):Promise.resolve(null)]),u=a?.status==="ok"||a?.status==="seeded"?a.utilization:null,p;if(u!==null)try{p=but(u.limits,Gne()).map((r)=>({display_name:r.displayName,utilization:r.limit.utilization??null,resets_at:typeof r.limit.resets_at==="number"?new Date(r.limit.resets_at*1000).toISOString():r.limit.resets_at??null}))}catch(r){t(`model_scoped projection failed: ${l(r)}`,{level:"error"})}let m=u;if(u!==null&&a?.status==="seeded"){let{limits:r,...S}=u;m=S}let v=p!==void 0&&a?.status==="ok"&&(a.utilization.five_hour!=null||a.utilization.seven_day!=null)&&Array.isArray(a.utilization.limits)&&!gHo(a.utilization.limits);return{session:{total_cost_usd:ah(),total_api_duration_ms:_O(),total_duration_ms:aie(),total_lines_added:REe(),total_lines_removed:xEe(),model_usage:nP()},subscription_type:ir(),rate_limits_available:s,rate_limits:u===null?null:p!==void 0&&p.length>0?{...m,model_scoped:p}:v?{...m,model_scoped:[]}:m,behaviors:c}};
return tJt;
}
export function createUsageSdkControl287(ports){
const {Hr,tJt}=ports;
var Ve=async(e,o)=>{if(e.skip_behaviors!=null&&typeof e.skip_behaviors!=="boolean")throw new Hr("get_usage: skip_behaviors must be a boolean");return{...await tJt({storageV5:o.storageV5,credentials:o.credentials,includeBehaviors:!o.redactsPersistedLane()&&e.skip_behaviors!==!0})}};
return Ve;
}
export function createUsageSnapshot287(ports){
const {Ae,Eo,In,Qn,cn,f,le,mt,ue,yc}=ports;
var zb=[["five_hour","5h"],["seven_day","7d"],["seven_day_overage_included","7d_oi"],["overage","overage"]];
function Vle(e){return e!==void 0&&Number.isFinite(e.utilization)&&Number.isFinite(e.resets_at)};
var Dgn=3600000;
var m5e=60000;
var Ngn=f(()=>{let e=mt({utilization:cn().nullable(),resets_at:ue().nullable()}).passthrough(),n=mt({five_hour:e.nullish(),seven_day:e.nullish(),seven_day_oauth_apps:e.nullish(),seven_day_opus:e.nullish(),seven_day_sonnet:e.nullish(),cinder_cove:e.nullish(),extra_usage:mt({is_enabled:Eo(),monthly_limit:cn().nullable(),used_credits:cn().nullable(),utilization:cn().nullable(),currency:ue().nullish(),disabled_reason:ue().nullish()}).passthrough().nullish(),limits:Qn(mt({kind:ue(),group:ue(),percent:cn(),resets_at:ue().nullable(),severity:ue(),is_active:Eo(),scope:mt({model:mt({display_name:ue()}).passthrough().nullish(),surface:mt({display_name:ue()}).passthrough().nullish()}).passthrough().nullish()}).passthrough()).nullish()}).passthrough();return mt({fetchedAtMs:cn(),accountUuid:ue().optional(),utilization:n})});
function IAo(e,n,r){let s=In()?.accountUuid;if(s!==n)return;let g=le().cachedUsageUtilization,h=g&&g.accountUuid===s?Date.now()-g.fetchedAtMs:Number.POSITIVE_INFINITY;if(h>=0&&h<m5e)return;Ae((b)=>({...b,cachedUsageUtilization:{fetchedAtMs:Date.now(),...s!==void 0&&{accountUuid:s},utilization:e}}),r)};
function P2n(e){let n=le().cachedUsageUtilization;if(!n)return null;let r=Ngn().safeParse(n);if(!r.success)return null;if(r.data.accountUuid!==In()?.accountUuid)return Ae((g)=>({...g,cachedUsageUtilization:void 0}),e),null;let s=Date.now()-r.data.fetchedAtMs;if(s<0||s>Dgn)return null;return{utilization:r.data.utilization,fetchedAtMs:r.data.fetchedAtMs}};
function OAo(e){let n=P2n(e);if(!n)return null;let r=Date.now()-n.fetchedAtMs;if(r>=m5e||yc.lastAppliedObservationAtMs>n.fetchedAtMs)return null;return{utilization:n.utilization,ageMs:r}};
function VV(){return zgn(yc.rawUtilization)};
function ZRr(){let e=yc.currentWindows(Date.now()),n={};for(let[r]of zb){let s=e[r];if(s)n[r]={utilization:s.utilization,resets_at:s.resets_at}}return n};
function zgn(e){let n=Date.now(),r={};for(let[s]of zb){let g=e[s];if(g!==void 0&&h5e(g,n))r[s]=g}return r};
function h5e(e,n){let r=n/1000,s=r+31536000;return Vle(e)&&e.resets_at>r&&e.resets_at<s};
return {IAo,P2n,OAo,VV,ZRr};
}
export function createUsagePublicBody287(ports){
const {}=ports;
var bie=["five_hour","seven_day","seven_day_oauth_apps","seven_day_opus","seven_day_sonnet","cinder_cove","extra_usage","limits"];
function mHo(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)};
function Sut(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)&&bie.some((n)=>(n in e))};
function LF(e){return e!==null&&typeof e==="object"&&e.kind==="weekly_scoped"&&typeof e.scope?.model?.display_name==="string"};
function JLt(e){return Array.isArray(e)&&e.some((n)=>typeof n==="object"&&n!==null&&LF(n))};
function gHo(e){return Array.isArray(e)&&e.some((n)=>typeof n!=="object"||n===null||n.scope?.model!=null)};
function but(e,n){let r=n.map((s)=>s.toLowerCase());if(r.length===0||!Array.isArray(e))return[];return e.filter(LF).filter((s)=>r.includes(s.scope.model.display_name.toLowerCase())).map((s)=>({title:`Current week (${s.scope.model.display_name})`,displayName:s.scope.model.display_name,limit:{utilization:s.percent,resets_at:s.resets_at}}))};
return {mHo,Sut,JLt,gHo,but};
}
export function createUsageProgramStatus287(ports){
const {Aot,B,BD,Bzn,C,CV,DOt,E_,F5,Gt,H,In,Ine,M7t,Me,Mhe,Oa,Ob,Od,One,Oqe,Pu,Qn,Sut,T,Tot,Tu,U,Uye,VIo,Wm,Z,Zdr,bKe,c,d,de,dqn,e5e,f,fcn,g0,gd,i,k,kN,lt,me,nDe,nte,o,p,pa,plt,rM,sH,sLe,se,t,u,ult,vV,xVe,y,ye,zIo,zp}=ports;
class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}};
function Fn(){return{state:{phase:"idle"},shownOfferKey:null,wallRecordKey:null,pendingAsk:null,claiming:!1,continuableWallResetsAt:null,unsettledClaimGrantId:null,unsettledClaimEpoch:null,unsettledClaimRequestId:null,unsettledClaimAtMs:null,sessionSwitchSubscribed:!1,changed:Me(),events:Me()}};
var Dn=new V(Fn);
function P(){return Dn.of(U().host)};
function NL(){return P().state};
function Y(a){let s=P();s.state=a,s.changed.emit()};
function ZHe(a){return P().changed.subscribe(a)};
var Jn="cedar_ember";
var Gn=25000;
var He=/^[a-z0-9_-]{1,40}$/;
var $n=/^[A-Za-z0-9_-]{1,64}$/;
var xe=["five_hour","seven_day","seven_day_overage_included","seven_day_opus","seven_day_sonnet","seven_day_cowork","seven_day_omelette","seven_day_oauth_apps"];
var Pt=["config_off","tier","seat","mobile","surface","cli_version","no_grant","tenure","other_experiment","unavailable","unknown"];
var jn=[...Pt,"paused","expired","unknown_grant","not_next_grant","grant_id_required","not_limited","already_used","cooldown","stamp_indeterminate","reset_unconfirmed"];
var Hn=f(()=>u({surface:B(["claude_ai","claude_code_cli","unknown"]).catch("unknown"),tier:B(["claude_pro","claude_max_5x","claude_max_20x","claude_team","unknown"]).catch("unknown"),tenure_bucket:B(["under_14","14-29","30-89","90-364","365+","unknown"]).catch("unknown"),billing_path:B(["stripe","apple","google_play","other","unknown"]).catch("unknown"),billing_period:B(["monthly","annual","unknown"]).catch("unknown"),extra_usage_state:B(["not_configured","disabled","enabled","unknown"]).catch("unknown")}));
var ve=f(()=>T(se()).catch([]).transform((a)=>a.filter((s)=>xe.some((l)=>l===s))));
var Kn=f(()=>u({id:o().regex(He),label:o().catch(""),resets_total:C().int().min(0).catch(0),resets_left:C().int().min(0),starts_at:o().nullable().optional().catch(null),ends_at:o().nullable().optional().catch(null),clears:ve(),paused:H().catch(!1),usable_now:H().catch(!1),use_requires_limit:H().catch(!0),percent_used:de(o(),se()).catch({}),blocking:ve()}));
function Bn(a){let s={};for(let l of xe){let m=a[l];if(typeof m==="number"&&Number.isInteger(m)&&m>=0&&m<=100)s[l]=m}return s};
var qn=f(()=>u({eligible:H(),ineligible_reason:B(Pt).catch("unknown").nullable().optional(),at_limit:H().optional().catch(void 0),exhausted:ve().optional(),grants:T(se()).optional().catch(void 0),next_grant_id:o().regex(He).nullable().optional().catch(null),weekly_resets_at:o().nullable().optional().catch(null),cooldown_until:o().nullable().optional().catch(null),event_props:Hn().nullable().optional().catch(null)}));
var Xn=f(()=>u({result:B(["reset","already_used","not_limited","cooldown","ineligible","unavailable"]).catch("unavailable"),reason:B(jn).catch("unknown").nullable().optional(),resets_left:C().int().min(0).nullable().optional().catch(null),cleared:ve().optional(),weekly_resets_at:o().nullable().optional().catch(null),cooldown_until:o().nullable().optional().catch(null)}));
function Yn(a){let s=Kn().safeParse(a);if(!s.success)return t(`[cedar-ember] ignoring a malformed grant: ${s.error.message}`),null;let l=s.data;return{id:l.id,label:l.label,resetsTotal:l.resets_total,resetsLeft:l.resets_left,startsAt:l.starts_at??null,endsAt:l.ends_at??null,clears:l.clears,paused:l.paused,usableNow:l.usable_now,useRequiresLimit:l.use_requires_limit,percentUsed:Bn(l.percent_used),blocking:l.blocking}};
function Vn(a){if(a===void 0||a===null)return null;let s=qn().safeParse(a);if(!s.success)return t(`[cedar-ember] ignoring a malformed status block: ${s.error.message}`),null;let l=s.data,m=(l.grants??[]).map(Yn).filter((E)=>E!==null),_=l.next_grant_id!==void 0&&l.next_grant_id!==null&&m.some((E)=>E.id===l.next_grant_id)?l.next_grant_id:null,h=l.event_props;return{eligible:l.eligible,ineligibleReason:l.ineligible_reason??null,atLimit:l.at_limit??!1,exhausted:l.exhausted??[],grants:m,nextGrantId:_,weeklyResetsAt:l.weekly_resets_at??null,cooldownUntil:l.cooldown_until??null,eventProps:h?{surface:h.surface,tier:h.tier,tenureBucket:h.tenure_bucket,billingPath:h.billing_path,billingPeriod:h.billing_period,extraUsageState:h.extra_usage_state}:null}};
async function Ke(a,{read:s="at_wall"}={}){try{if(!zp())return{kind:"no_profile_scope"};let l=await g0(a,{read:s});if(!Sut(l))return t("[cedar-ember] status fetch returned a fieldless or non-object body (in-band error)",{level:"warn"}),{kind:"failed"};return{kind:"answered",status:Vn(l?.cedar_ember)}}catch(l){if(t(`[cedar-ember] status fetch failed: ${Z(l).message}`,{level:"warn"}),dqn(l))return{kind:"not_authorized"};return{kind:"failed"}}};
var ee={reason:null,resetsLeft:null,cleared:[],weeklyResetsAt:null};
async function Be(a,s,l){let m=In()?.organizationUuid;if(!m)return t("[cedar-ember] no OAuth organization; cannot claim"),{result:"auth_error",...ee};if(!He.test(s)||!$n.test(l))return d(Error("[cedar-ember] refusing to claim with a malformed grant or request id")),{result:"error",...ee};try{let _=await E_(()=>Gt.post(`/api/organizations/${m}/reset_rate_limits`,{program:Jn,grant_id:s,request_id:l},{auth:"async",headers:{"Content-Type":"application/json"},timeout:Gn,refreshOAuth:!0,credentials:a}),{credentials:a});if(!_.ok)return t(`[cedar-ember] claim not sent: ${_.reason==="no-auth"?_.detail:_.reason}`,{level:"warn"}),{result:_.reason==="no-auth"?"auth_error":"error",...ee};let h=Xn().safeParse(_.data);if(!h.success)return t(`[cedar-ember] unreadable claim response: ${h.error.message}`,{level:"error"}),d(Error("[cedar-ember] unreadable claim response")),{result:"error",...ee};return{result:h.data.result,reason:h.data.reason??null,resetsLeft:h.data.resets_left??null,cleared:h.data.cleared??[],weeklyResetsAt:h.data.weekly_resets_at??null}}catch(_){if(Pu(_))t(`[cedar-ember] claim failed: ${Z(_).message}`,{level:"warn"});else d(Z(_));if(gd(_))switch(_.response?.status){case 429:return{result:"rate_limited",...ee};case 401:case 403:return{result:"auth_error",...ee};default:break}return{result:"error",...ee}}};
var Zn=3;
var Ft=12000;
var Dt=35000;
var er=600000;
var tr=20000;
function Ze(a){if(!M7t(a)||a.rateLimitType===void 0||a.resetsAt===void 0)return null;return{rateLimitType:a.rateLimitType,wallResetsAt:a.resetsAt,accountEpoch:Ob()}};
function Oe(a,s){return s.rateLimitType===a.rateLimitType&&s.resetsAt===a.wallResetsAt&&a.accountEpoch===Ob()};
function ne(a){let s=NL();return s.phase==="answered"&&Oe(s.wall,a)?s.status:void 0};
function et(a){let s=NL();return s.phase==="failed"&&Oe(s.wall,a)};
function j(){return Date.now()};
function Jt(a,s,l,m){if(a.final)return!1;let _=m-a.answeredAtMs,h=(v)=>_<0||_>=v;if(Ime(s,m)!==void 0)return!1;let E=oe(a.status?.cooldownUntil??null),A=_<0||_>=tr&&(E===void 0||m>=Math.min(E,a.answeredAtMs+150000));switch(l){case"wall":return h(er);case"command":return A;case"dialog":return A&&(a.status===null||rr(s))}};
function be(a,s){return a.clears.some((l)=>l===s)};
function Ime(a,s=Date.now()){let l=ne(a);if(!M7t(a)||l===void 0||l===null||l.nextGrantId===null||a.rateLimitType===void 0||a.resetsAt===void 0||a.resetsAt*1000<=s||kN()||!Ine())return;let m=Yt(l,s);if(m===void 0||!be(m.grant,a.rateLimitType)||tt(m.grant,l))return;let{grant:_,endsAtMs:h}=m;return{origin:"wall",grant:_,resetsLeft:Math.max(1,Pe(l)),weeklyResetsAt:l.weeklyResetsAt,endsAtMs:h,rateLimitType:a.rateLimitType}};
function Pe(a){return a.grants.reduce((s,l)=>s+l.resetsLeft,0)};
function tt(a,s){return!a.useRequiresLimit&&!a.clears.some((l)=>s.exhausted.includes(l))};
function nr(a,s){if(!tt(a,s))return null;let l=null;for(let _ of xe){let h=a.percentUsed[_];if(a.clears.includes(_)&&h!==void 0&&(l===null||h>l.percentUsed))l={claimType:_,percentUsed:h}}if(l===null)return{kind:"unnumbered",percentUsedMax:null};let m=rt(l.claimType);if(m===null||l.percentUsed>=100)return{kind:"unnumbered",percentUsedMax:l.percentUsed};return{kind:"numbered",percentLeft:100-l.percentUsed,claimType:l.claimType,limitName:m,percentUsedMax:l.percentUsed}};
function rt(a){switch(a){case"five_hour":case"seven_day":case"seven_day_opus":return ult(a);case"seven_day_sonnet":return DOt();case"seven_day_overage_included":case"seven_day_cowork":case"seven_day_omelette":case"seven_day_oauth_apps":return null}};
function Vdr(a){if(a.origin==="wall"||a.earlyUse===null)return;let s=rM();switch(a.earlyUse.kind){case"numbered":return Wm(s.earlyLine,h4(a));case"unnumbered":return Wm(s.earlyNoNumberLine,h4(a))}};
function Uie(){let a=P();return a.claiming||a.unsettledClaimGrantId!==null&&a.unsettledClaimEpoch===Ob()&&Kt(a)};
function pve(a,s=Date.now()){let l=ne(a);if(!M7t(a)||l===void 0||l===null||!l.eligible||l.nextGrantId!==null||l.grants.length===0||l.grants.some((m)=>m.resetsLeft>0)||a.resetsAt===void 0||a.resetsAt*1000<=s||!Ine())return;return Wm(rM().spentLine,{left:0})};
function rr(a){let s=ne(a);return s!==void 0&&s!==null&&s.eligible&&s.nextGrantId===null&&s.grants.some((l)=>l.resetsLeft>0)};
function h4(a){return{left:a.resetsLeft,date:$t(a.grant.endsAt),deadline:Re(a.grant.endsAt),week:Re(a.weeklyResetsAt),limits:ar(a.grant.clears),...a.origin==="anytime"&&a.earlyUse?.kind==="numbered"&&{percent:a.earlyUse.percentLeft,limit:a.earlyUse.limitName}}};
function ar(a){let s=new Set;for(let _ of a)switch(_){case"five_hour":s.add("session");break;case"seven_day":case"seven_day_overage_included":s.add("weekly");break;case"seven_day_opus":s.add(ult(_).replace(/ limit$/,""));break;case"seven_day_sonnet":s.add(DOt().replace(/ limit$/,""));break;case"seven_day_cowork":case"seven_day_omelette":case"seven_day_oauth_apps":break}let l=[...s],m=l.pop();if(m===void 0)return"limits";return l.length===0?`${m} limit`:`${l.join(", ")} and ${m} limits`};
function $t(a){let s=oe(a);return s===void 0?void 0:Tu(Math.floor(s/1000),!1,!1,!0)};
function Re(a){let s=oe(a);return s===void 0?void 0:Tu(Math.floor(s/1000),!1,!0,!0)};
function oe(a){if(a===null)return;let s=Date.parse(a);return Number.isFinite(s)?s:void 0};
function jt(){return Ine()||Zdr(k(nDe,null))};
function ylo(a,s){if(!jt()||!M7t(a))return;let l=P();if(Rr(l),l.continuableWallResetsAt=a.resetsAt??null,l.unsettledClaimEpoch!==Ob())F(l);te(a,s,"wall")};
function te(a,s,l){if(l==="wall"?!jt():!Ine())return Promise.resolve();let m=Ze(a);if(m===null)return Promise.resolve();let _=P(),h=_.state,E=0,A=null;if(h.phase!=="idle"&&Oe(h.wall,a))switch(h.phase){case"answered":if(!Jt(h,a,l,j()))return Promise.resolve();A=h;break;case"asking":return _.pendingAsk??Promise.resolve();case"failed":if(l==="wall"&&h.failures>=Zn)return Promise.resolve();E=h.failures}Y({phase:"asking",wall:m});let v=vV(),x=lt(Ke(s),Ft).then((S)=>{if(Ut({wall:m,failures:E,previous:A,result:S??{kind:"failed"},autoArmed:v}),S!==void 0&&S.kind==="answered"&&S.status?.ineligibleReason!=="unavailable")Ht(_,S.status,s)}).catch((S)=>{d(Z(S));try{Ut({wall:m,failures:E,previous:A,result:{kind:"failed"},autoArmed:v})}catch(L){d(Z(L))}}).finally(()=>{if(_.pendingAsk===x)_.pendingAsk=null});return _.pendingAsk=x,x};
function Ut({wall:a,failures:s,previous:l,result:m,autoArmed:_}){let h=NL();if(h.phase!=="asking"||h.wall.rateLimitType!==a.rateLimitType||h.wall.wallResetsAt!==a.wallResetsAt||h.wall.accountEpoch!==a.accountEpoch)return;let E=m.kind==="answered"?m.status:null,A=m.kind==="failed"||E?.ineligibleReason==="unavailable";if(A&&l!==null)Y({...l,answeredAtMs:j()});else if(A)Y({phase:"failed",wall:a,failures:s+1});else{let I=m.kind==="no_profile_scope"||m.kind==="not_authorized";Y(I?{phase:"answered",wall:a,status:E,answeredAtMs:j(),final:I}:{phase:"answered",wall:a,status:E,answeredAtMs:j()})}if(!Ine())return;let v=e5e();if(i("tengu_cedar_ember_asked",{outcome:c(Bt(m)),at_wall:!0,attempt:s+1,eligible:E?.eligible??!1,ineligible_reason:me(E?.ineligibleReason),limit_type:c(a.rateLimitType),config_version:v}),A||E===null||!E.eligible)return;let x=P(),S=`${a.accountEpoch}:${a.rateLimitType}:${a.wallResetsAt}:${E.eligible}:${E.nextGrantId}`;if(x.wallRecordKey===S)return;x.wallRecordKey=S;let L=E.grants.find((I)=>I.id===E.nextGrantId);i("tengu_cedar_ember_wall",{eligible:E.eligible,at_limit:E.atLimit,usable:L!==void 0&&be(L,a.rateLimitType)&&!tt(L,E),grant_id:ye(E.nextGrantId),resets_left:L?.resetsLeft??0,resets_left_total:Pe(E),grants:E.grants.length,limit_type:c(a.rateLimitType),limit_types:Oa(E.exhausted),tier:c(Tot()),auto_armed:_,low_priority_active:kN(),config_version:v,surface:me(E.eventProps?.surface),server_tier:me(E.eventProps?.tier),tenure_bucket:me(E.eventProps?.tenureBucket),billing_path:me(E.eventProps?.billingPath),billing_period:me(E.eventProps?.billingPeriod),extra_usage_state:me(E.eventProps?.extraUsageState)})};
function Ht(a,s,l){if(a.unsettledClaimGrantId===null)return;if(a.unsettledClaimEpoch!==Ob()){F(a);return}if(s?.nextGrantId===a.unsettledClaimGrantId)return;if(z(l),s!==null&&!Ue(s))F(a)};
var sr=600000;
function Kt(a){return a.unsettledClaimAtMs!==null&&j()-a.unsettledClaimAtMs<sr};
function Bt(a){return a.kind==="answered"?a.status===null?"absent":"block":a.kind};
function it(a,s){return a.unsettledClaimGrantId===s&&a.unsettledClaimEpoch===Ob()&&Kt(a)};
function F(a){a.unsettledClaimGrantId=null,a.unsettledClaimRequestId=null,a.unsettledClaimEpoch=null,a.unsettledClaimAtMs=null};
function qt(a,s,l,m){if(a.unsettledClaimRequestId!==l)a.unsettledClaimAtMs=j();a.unsettledClaimGrantId=s,a.unsettledClaimRequestId=l,a.unsettledClaimEpoch=m};
function Xt(a,s){return it(a,s)&&a.unsettledClaimRequestId!==null?a.unsettledClaimRequestId:Qn()};
function Yt(a,s){if(a.nextGrantId===null)return;let l=a.grants.find((_)=>_.id===a.nextGrantId);if(l===void 0||!l.usableNow||l.paused)return;let m=oe(l.endsAt)??null;if(m!==null&&m<=s)return;return{grant:l,endsAtMs:m}};
function R9t(a,s){let l=NL();if(et(a)||l.phase==="answered"&&Oe(l.wall,a)&&Jt(l,a,"dialog",j()))te(a,s,"dialog")};
async function _nt(a,s){try{return await or(a,s)}catch(l){return d(Z(l)),{kind:"answer",result:{outcome:"unavailable",text:fve}}}};
async function Vt(a,s){let m=P().pendingAsk!==null;if(await te(pa(),s,a),m&&et(pa()))await te(pa(),s,a)};
async function or(a,s){if(P().claiming)return{kind:"answer",result:{outcome:"unavailable",text:dn}};if(pa().status!=="rejected"&&Aot()&&Ine()){if(kN())return{kind:"answer",result:{outcome:"not_offered",text:gr}};return lr(a,s)}await Vt(a,s);let m=pa(),_=Ime(m);if(_===void 0){let h=ne(m);if(h!==void 0&&h!==null&&(Ue(h)||en(h,m)))z(s);return{kind:"answer",result:Zt(m)}}return Qt(a,_),{kind:"confirm",offer:_}};
function Qt(a,s){i("tengu_cedar_ember_selected",{entry:c(a),grant_id:ye(s.grant.id),resets_left:s.grant.resetsLeft,resets_left_total:s.resetsLeft,limit_type:me(s.origin==="wall"?s.rateLimitType:void 0),at_limit:s.origin==="wall"||s.atLimit,early_use:Le(s),auto_armed:vV(),config_version:e5e()})};
async function lr(a,s){let l=P(),m=await lt(Ke(s,{read:"cedar_ember"}),Ft),_=m?.kind==="answered"?m.status:null,h=m===void 0||m.kind==="failed"||_?.ineligibleReason==="unavailable";if(i("tengu_cedar_ember_asked",{outcome:c(Bt(m??{kind:"failed"})),at_wall:!1,asker:c(a),eligible:_?.eligible??!1,ineligible_reason:me(_?.ineligibleReason),at_limit:_?.atLimit??!1,grants:_?.grants.length??0,grant_id:ye(_?.nextGrantId??null),config_version:e5e()}),h)return{kind:"answer",result:{outcome:"unavailable",text:Uie()?Wm(rM().unconfirmedAnytimeLine,{}):fve}};Ht(l,_,s);let E=_===null?void 0:ur(_,j());if(E===void 0)return{kind:"answer",result:dr(_)};return Qt(a,E),{kind:"confirm",offer:E}};
function ur(a,s){let l=Yt(a,s);if(l===void 0)return;let{grant:m,endsAtMs:_}=l;return{origin:"anytime",grant:m,resetsLeft:Math.max(1,Pe(a)),weeklyResetsAt:a.weeklyResetsAt,endsAtMs:_,earlyUse:nr(m,a),atLimit:a.atLimit}};
function dr(a){if(a===null||!a.eligible||a.grants.length===0)return{outcome:"not_offered",text:`${Ve} \xB7 ${nn}`};let s=a.grants.filter((h)=>h.resetsLeft>0),l={left:Pe(a),date:$t(s[0]?.endsAt??null)};if(s.length===0)return{outcome:"spent",text:Wm(rM().spentLine,l)};let m=s.flatMap((h)=>h.blocking).map(rt).find((h)=>h!==null)??null,_=m!==null?rn(m):s.every((h)=>h.paused)?`${Xe} \xB7 it is paused`:Ue(a)?`${Xe} \xB7 try again in a minute`:s.every((h)=>h.useRequiresLimit)?_r:`${Xe} \xB7 try again later`;return{outcome:"not_offered",text:Wm(`${_} \xB7 {resets} left \xB7 use by {date}`,l)}};
function Zt(a){let s=pve(a);if(s!==void 0)return{outcome:"spent",text:s};if(et(a))return{outcome:"unavailable",text:Uie()?Wm(rM().unconfirmedLine,{}):fve};let l=ne(a);if(l!==void 0&&l!==null&&en(l,a))return{outcome:"not_offered",text:br};return{outcome:"not_offered",text:tn(cr(a),a)}};
function en(a,s){let l=s.rateLimitType;return l!==void 0&&a.nextGrantId!==null&&!a.exhausted.some((m)=>m===l)&&a.grants.some((m)=>m.id===a.nextGrantId&&be(m,l))};
function Ue(a){let s=oe(a.cooldownUntil);return s!==void 0&&s>j()};
function cr(a){let s=ne(a);if(s===void 0||s===null||a.rateLimitType===void 0)return Ve;let l=a.rateLimitType,m=s.grants.filter((h)=>h.resetsLeft>0);if(m.length===0)return Ve;if(!m.some((h)=>be(h,l)))return fr;let _=m.filter((h)=>be(h,l)).flatMap((h)=>h.blocking).map(rt).find((h)=>h!==null)??null;if(_!==null)return rn(_);if(m.every((h)=>h.paused))return`${qe} \xB7 it is paused`;if(Ue(s))return`${qe} \xB7 try again in a minute`;return qe};
function tn(a,s){let l=CV(s)?Tu(s.resetsAt):void 0;return l!==void 0?`${a} \xB7 this limit resets ${l}`:`${a} \xB7 ${nn}`};
function qdr(a,s){i("tengu_cedar_ember_confirmed",{confirmed:!1,entry:c(a),grant_id:ye(s.grant.id),limit_type:me(s.origin==="wall"?s.rateLimitType:void 0),at_limit:s.origin==="wall"||s.atLimit,early_use:Le(s),percent_used_max:Ye(s),config_version:e5e()});let l=rM();return{outcome:"kept",text:Wm(s.grant.useRequiresLimit?l.keptLine:l.keptAnytimeLine,h4(s))}};
async function Kdr(a,s,l){let m=P();if(m.claiming)return{outcome:"unavailable",text:dn};m.claiming=!0;try{return l.origin==="wall"||Ze(pa())!==null?await mr(a,s,l.grant.id):await pr(a,s,l)}catch(_){d(Z(_));let h=rM();return{outcome:"unavailable",text:Wm(l.origin==="wall"?h.unconfirmedLine:h.unconfirmedAnytimeLine,{})}}finally{m.claiming=!1}};
async function mr(a,s,l){let m=P(),_=rM(),h=e5e();await Vt(a,s);let E=pa(),A=Ze(E),v=Ime(E);if(i("tengu_cedar_ember_confirmed",{confirmed:!0,entry:c(a),grant_id:ye(l),limit_type:me(E.rateLimitType),still_offered:v!==void 0&&v.grant.id===l,at_limit:!0,early_use:!1,config_version:h}),v===void 0||A===null)return Zt(E);if(v.grant.id!==l)return{outcome:"not_offered",text:hr};let x=Date.now(),S=it(m,l),L=Xt(m,l),I=await lt(Be(s,l,L),Dt)??{result:"error",reason:null,resetsLeft:null,cleared:[],weeklyResetsAt:null};switch(i("tengu_cedar_ember_result",{result:c(I.result),reason:me(I.reason),entry:c(a),grant_id:ye(l),resets_left:I.resetsLeft??void 0,cleared:Oa(I.cleared),limit_type:c(A.rateLimitType),at_limit:!0,early_use:!1,latency_ms:Date.now()-x,config_version:h}),I.result){case"reset":case"not_limited":case"cooldown":case"already_used":case"ineligible":y("cedar_ember");break;case"unavailable":case"rate_limited":case"auth_error":case"error":p("cedar_ember",I.result);break}let N=v.resetsLeft-v.grant.resetsLeft,K=I.resetsLeft??(I.result==="already_used"?0:Math.max(0,v.grant.resetsLeft-1)),W={...h4(v),left:N+K,week:Re(I.weeklyResetsAt??v.weeklyResetsAt)};switch(I.result){case"reset":{F(m);let G=Wt(m,A);zt(m,A,[A.rateLimitType,...Ie(I.cleared).filter((le)=>le!==A.rateLimitType)],a,G);let O=Wm(_.successLine,W);return{outcome:"reset",text:G?O:Mt(O)}}case"not_limited":{F(m);let G=Wt(m,A);zt(m,A,[A.rateLimitType],a,G);let O=S?wr:Er;return{outcome:"reset",text:G?O:Mt(O)}}case"cooldown":{if(!S)F(m);return z(s),{outcome:"unavailable",text:S?on:Cr}}case"already_used":{if(S)return F(m),fe(A),z(s),{outcome:"spent",text:ln};if(N>0)return fe(A),te(pa(),s,a),z(s),{outcome:"spent",text:Wm(`${Se} \xB7 ${an}`,W)};return xr(A,l),z(s),{outcome:"spent",text:Wm(Se,W)}}case"ineligible":{if(fe(A),te(pa(),s,a),S)return F(m),z(s),{outcome:"not_offered",text:Qe};return{outcome:"not_offered",text:tn(sn,E)}}case"auth_error":return{outcome:"unavailable",text:cn};case"rate_limited":return{outcome:"unavailable",text:Wm(S?_.unconfirmedLine:_.unavailableLine,W)};case"unavailable":case"error":{qt(m,l,L,A.accountEpoch);let G=Ie(I.cleared);if(G.length>0){if(bKe(G),G.includes(A.rateLimitType))z(s)}return fe(A),te(pa(),s,a),{outcome:"unavailable",text:Wm(S?_.stillUnconfirmedLine:_.unconfirmedLine,W)}}}};
function Ye(a){return a.origin==="anytime"?a.earlyUse?.percentUsedMax??void 0:void 0};
function Le(a){return a.origin==="anytime"&&a.earlyUse!==null};
async function pr(a,s,l){let m=P(),_=rM(),h=e5e(),E=l.grant.id,A=Ob();i("tengu_cedar_ember_confirmed",{confirmed:!0,entry:c(a),grant_id:ye(E),at_limit:l.atLimit,early_use:Le(l),percent_used_max:Ye(l),config_version:h});let v=Date.now(),x=it(m,E),S=Xt(m,E),L=await lt(Be(s,E,S),Dt)??{result:"error",reason:null,resetsLeft:null,cleared:[],weeklyResetsAt:null};switch(i("tengu_cedar_ember_result",{result:c(L.result),reason:me(L.reason),entry:c(a),grant_id:ye(E),resets_left:L.resetsLeft??void 0,cleared:Oa(L.cleared),at_limit:l.atLimit,early_use:Le(l),percent_used_max:Ye(l),latency_ms:Date.now()-v,config_version:h}),L.result){case"reset":case"not_limited":case"cooldown":case"already_used":case"ineligible":y("cedar_ember");break;case"unavailable":case"rate_limited":case"auth_error":case"error":p("cedar_ember",L.result);break}let I=l.resetsLeft-l.grant.resetsLeft,N=L.resetsLeft??(L.result==="already_used"?0:Math.max(0,l.grant.resetsLeft-1)),K={...h4(l),left:I+N,week:Re(L.weeklyResetsAt??l.weeklyResetsAt)};switch(L.result){case"reset":{F(m);let W=Ie(L.cleared);if(W.length>0)bKe(W);return z(s),{outcome:"reset",text:Wm(_.successLine,K)}}case"not_limited":if(F(m),x)return z(s),{outcome:"not_offered",text:Qe};return{outcome:"not_offered",text:yr};case"cooldown":if(!x)F(m);return z(s),{outcome:"unavailable",text:x?on:Ar};case"already_used":if(x)return F(m),z(s),{outcome:"spent",text:ln};return{outcome:"spent",text:Wm(I>0?`${Se} \xB7 ${an}`:Se,K)};case"ineligible":if(x)return F(m),z(s),{outcome:"not_offered",text:Qe};return{outcome:"not_offered",text:sn};case"auth_error":return{outcome:"unavailable",text:cn};case"rate_limited":return{outcome:"unavailable",text:Wm(x?_.unconfirmedAnytimeLine:_.unavailableLine,K)};case"unavailable":case"error":{qt(m,E,S,A);let W=Ie(L.cleared);if(W.length>0)bKe(W);if(W.length>0||x)z(s);return{outcome:"unavailable",text:Wm(x?_.stillUnconfirmedLine:_.unconfirmedAnytimeLine,K)}}}};
var Ve="No reset to use";
var nn="you're not at a usage limit right now";
var qe="Your reset can't be used for this limit right now";
var fr="Your reset doesn't cover this limit";
var br=`This limit may have lifted already \xB7 checking your limits now \xB7 run /${F5} again in a moment to use your reset anyway`;
var _r=`You have a reset saved for when you reach a usage limit \xB7 run /${F5} when you do`;
var Xe="Your reset can't be used right now";
var gr=`Resets can't be used while you continue at lower priority \xB7 run /${F5} after that ends`;
var yr="Your reset only works at a usage limit, and you're not at one now \xB7 nothing was used";
function rn(a){return`Your reset doesn't refill your ${a}, so it can't be used until that resets`};
var fve="Couldn't check for a reset right now \xB7 try again in a moment";
var eDe="Checking for a reset\u2026";
var Se="That reset was already used \xB7 nothing changed just now \xB7 {resets} left";
var an=`run /${F5} again to use one`;
var sn="This reset isn't available any more \xB7 nothing was used";
var hr=`A different reset is on offer now \xB7 nothing was used \xB7 run /${F5} again to see it`;
var Er="Your limit had already reset on its own \xB7 nothing was used";
var wr="Your limits are clear";
var Cr="Another reset was just started on your account \xB7 checking your limits now \xB7 if you're still at the limit in a minute, try again";
var on="Your earlier reset may still be going through \xB7 checking your limits now \xB7 try again in a minute if they aren't refilled";
var Ar="Another reset was just started on your account \xB7 this one wasn't used \xB7 try again in a minute";
var ln="Your earlier reset went through after all \xB7 checking your limits now";
var Qe="This reset isn't available any more \xB7 your earlier try may have gone through \xB7 checking your limits now";
var Tr="send a message to continue";
var dn="Your limits are already being reset \xB7 one moment";
var cn="Couldn't reset your limits with this login \xB7 run /login, then try again";
function Mt(a){return`${a} \xB7 ${Tr}`};
function Wt(a,s){let l=zIo()&&a.continuableWallResetsAt===s.wallResetsAt;return a.continuableWallResetsAt=null,l};
function Ie(a){let s=[];for(let l of a)switch(l){case"five_hour":case"seven_day":case"seven_day_overage_included":case"seven_day_opus":case"seven_day_sonnet":s.push(l);break;case"seven_day_cowork":case"seven_day_omelette":case"seven_day_oauth_apps":break}return s};
function zt(a,s,l,m,_){let h=[()=>BD("cedar_ember"),()=>{sH("reset")},()=>vr(l),()=>{fe(s),a.wallRecordKey=null,a.shownOfferKey=null},()=>{if(_)xVe()},()=>a.events.emit({type:"reset",entry:m})];for(let E of h)try{E()}catch(A){d(Z(A))}};
function vr(a){if(a.length>0)bKe(a);let s=pa();if(s.status!=="rejected"||s.rateLimitType===void 0||!a.includes(s.rateLimitType))return;Mhe({...s,status:"allowed",rateLimitType:void 0,resetsAt:void 0})};
function z(a){if(vV()){sLe();return}plt(a,void 0).catch((s)=>{d(Z(s))})};
function fe(a){let s=NL();if(s.phase!=="idle"&&s.wall.wallResetsAt===a.wallResetsAt&&s.wall.rateLimitType===a.rateLimitType)Y({phase:"idle"})};
function xr(a,s){let l=NL();if(l.phase!=="answered"||l.wall.wallResetsAt!==a.wallResetsAt||l.wall.rateLimitType!==a.rateLimitType||l.status===null)return;Y({...l,answeredAtMs:j(),status:{...l.status,nextGrantId:l.status.nextGrantId===s?null:l.status.nextGrantId,grants:l.status.grants.map((m)=>m.id===s?{...m,resetsLeft:0,usableNow:!1}:m)}})};
function Rr(a){if(a.sessionSwitchSubscribed)return;a.sessionSwitchSubscribed=!0,Od((s,l)=>{if(Oqe(l))a.continuableWallResetsAt=null})};
function kr(){return{state:{phase:"idle"},shownWallResetsAt:null,pendingAsk:null,claiming:!1,continuableWallResetsAt:null,unsettledClaimWallResetsAt:null,sessionSwitchSubscribed:!1,changed:Me(),events:Me()}};
var Lr=new V(kr);
function q(){return Lr.of(U().host)};
function FL(){return q().state};
function re(a){let s=q();s.state=a,s.changed.emit()};
function tDe(a){return q().changed.subscribe(a)};
var Sr="juniper_tide";
var Ir=25000;
var Or=f(()=>u({surface:B(["claude_ai","claude_code_cli","unknown"]).catch("unknown"),tier:B(["claude_pro","claude_max_5x","claude_max_20x","unknown"]).catch("unknown"),tenure_bucket:B(["under_14","14-29","30-89","90-364","365+","unknown"]).catch("unknown"),billing_path:B(["stripe","apple","google_play","other","unknown"]).catch("unknown"),billing_period:B(["monthly","annual","unknown"]).catch("unknown"),extra_usage_state:B(["not_configured","disabled","enabled","unknown"]).catch("unknown")}));
var Pr=f(()=>u({eligible:H(),ineligible_reason:B(["tier","tenure","surface","mobile","cli_version","not_at_wall","weekly_limit","no_weekly_limit","other_experiment","extra_usage","unavailable","unknown"]).catch("unknown").nullable().optional(),in_experiment:H().optional(),arm:B(["control","reset"]).nullable().optional().catch(null),available:H().optional(),next_available_at:o().nullable().optional().catch(null),weekly_resets_at:o().nullable().optional().catch(null),resets_per_week:C().optional().catch(void 0),event_props:Or().nullable().optional().catch(null)}));
var Ur=f(()=>u({result:B(["reset","already_used","not_limited","ineligible","unavailable"]).catch("unavailable"),next_available_at:o().nullable().optional().catch(null),weekly_resets_at:o().nullable().optional().catch(null)}));
function Mr(a){if(a===void 0||a===null)return null;let s=Pr().safeParse(a);if(!s.success)return t(`[juniper-tide] ignoring a malformed status block: ${s.error.message}`),null;let l=s.data,m=l.event_props;return{eligible:l.eligible,ineligibleReason:l.ineligible_reason??null,inExperiment:l.in_experiment??!1,arm:l.arm??null,available:l.available??!1,nextAvailableAt:l.next_available_at??null,weeklyResetsAt:l.weekly_resets_at??null,resetsPerWeek:l.resets_per_week??1,eventProps:m?{surface:m.surface,tier:m.tier,tenureBucket:m.tenure_bucket,billingPath:m.billing_path,billingPeriod:m.billing_period,extraUsageState:m.extra_usage_state}:null}};
async function mn(a){try{if(!zp())return{kind:"no_profile_scope"};let s=await g0(a,{read:"at_wall"});if(!Sut(s))return t("[juniper-tide] status fetch returned a fieldless or non-object body (in-band error)",{level:"warn"}),{kind:"failed"};return{kind:"answered",status:Mr(s?.juniper_tide)}}catch(s){if(t(`[juniper-tide] status fetch failed: ${Z(s).message}`,{level:"warn"}),dqn(s))return{kind:"answered",status:null};return{kind:"failed"}}};
async function pn(a){let s=In()?.organizationUuid;if(!s)return t("[juniper-tide] no OAuth organization; cannot claim"),{result:"auth_error",nextAvailableAt:null};try{let l=await E_(()=>Gt.post(`/api/organizations/${s}/reset_rate_limits`,{program:Sr},{auth:"async",headers:{"Content-Type":"application/json"},timeout:Ir,refreshOAuth:!0,credentials:a}),{credentials:a});if(!l.ok)return t(`[juniper-tide] claim not sent: ${l.reason==="no-auth"?l.detail:l.reason}`,{level:"warn"}),{result:l.reason==="no-auth"?"auth_error":"error",nextAvailableAt:null};let m=Ur().safeParse(l.data);if(!m.success)return t(`[juniper-tide] unreadable claim response: ${m.error.message}`,{level:"error"}),d(Error("[juniper-tide] unreadable claim response")),{result:"error",nextAvailableAt:null};return{result:m.data.result,nextAvailableAt:m.data.next_available_at??null}}catch(l){if(Pu(l))t(`[juniper-tide] claim failed: ${Z(l).message}`,{level:"warn"});else d(Z(l));if(gd(l))switch(l.response?.status){case 429:return{result:"rate_limited",nextAvailableAt:null};case 401:case 403:return{result:"auth_error",nextAvailableAt:null};default:break}return{result:"error",nextAvailableAt:null}}};
var Nr=3;
var Wr=12000;
var zr=35000;
function ot(a,s){return s.resetsAt===a.wallResetsAt&&a.accountEpoch===Ob()};
function We(a){let s=FL();return s.phase==="answered"&&ot(s,a)?s.status:void 0};
function at(a){let s=FL();return s.phase==="failed"&&ot(s,a)};
function eX(a,s=Date.now()){let l=We(a);return nte(a)&&l!==void 0&&l!==null&&l.arm==="reset"&&l.available&&a.resetsAt!==void 0&&a.resetsAt*1000>s&&!kN()&&Uye()};
function mve(a,s=Date.now()){let l=We(a);if(!nte(a)||l===void 0||l===null||l.arm!=="reset"||l.available||l.nextAvailableAt===null||a.resetsAt===void 0||a.resetsAt*1000<=s||!Uye())return;return Bzn(One().spentLine,st(l.nextAvailableAt))};
function st(a){if(a===null)return;let s=Date.parse(a);return Number.isFinite(s)?Tu(Math.floor(s/1000),!1,!0,!0):void 0};
function _lo(a,s){if(!Uye()||!nte(a))return;let l=q();Br(l),l.continuableWallResetsAt=a.resetsAt??null,Ne(a,s,"wall")};
function Ne(a,s,l){if(!Uye()||!nte(a))return Promise.resolve();let m=a.resetsAt;if(m===void 0)return Promise.resolve();let _=q(),h=Ob(),E=_.state,A=0;if(E.phase!=="idle"&&ot(E,a))switch(E.phase){case"answered":return Promise.resolve();case"asking":return _.pendingAsk??Promise.resolve();case"failed":if(l==="wall"&&E.failures>=Nr)return Promise.resolve();A=E.failures}re({phase:"asking",wallResetsAt:m,accountEpoch:h});let v=vV(),x=lt(mn(s),Wr).then((S)=>{fn({wallResetsAt:m,accountEpoch:h,failures:A,result:S??{kind:"failed"},autoArmed:v})}).catch((S)=>{d(Z(S));try{fn({wallResetsAt:m,accountEpoch:h,failures:A,result:{kind:"failed"},autoArmed:v})}catch(L){d(Z(L))}}).finally(()=>{if(_.pendingAsk===x)_.pendingAsk=null});return _.pendingAsk=x,x};
function fn({wallResetsAt:a,accountEpoch:s,failures:l,result:m,autoArmed:_}){let h=FL();if(h.phase!=="asking"||h.wallResetsAt!==a||h.accountEpoch!==s)return;let E=m.kind==="answered"?m.status:null;if(m.kind==="failed")re({phase:"failed",wallResetsAt:a,accountEpoch:s,failures:l+1});else re({phase:"answered",wallResetsAt:a,accountEpoch:s,status:E});if(i("tengu_juniper_tide_asked",{outcome:c(m.kind==="answered"?E===null?"absent":"block":m.kind),attempt:l+1,eligible:E?.eligible??!1,ineligible_reason:me(E?.ineligibleReason)??void 0,config_version:fcn()}),E===null||!E.eligible)return;i("tengu_juniper_tide_wall",{in_experiment:E.inExperiment,arm:me(E.arm)??void 0,available:E.available,tier:c(Tot()),auto_armed:_,low_priority_active:kN(),config_version:fcn(),surface:me(E.eventProps?.surface)??void 0,server_tier:me(E.eventProps?.tier)??void 0,tenure_bucket:me(E.eventProps?.tenureBucket)??void 0,billing_path:me(E.eventProps?.billingPath)??void 0,billing_period:me(E.eventProps?.billingPeriod)??void 0,extra_usage_state:me(E.eventProps?.extraUsageState)??void 0})};
function Xdr(a,s){if(at(a))Ne(a,s,"dialog")};
async function HGe(a,s){try{return await Fr(a,s)}catch(l){return d(Z(l)),{outcome:"unavailable",text:One().unavailableLine}}};
async function Fr(a,s){let l=q(),m=One();if(We(pa())===void 0){let x=l.pendingAsk!==null;if(await Ne(pa(),s,a),x&&at(pa()))await Ne(pa(),s,a)}let _=pa();if(!eX(_)||_.resetsAt===void 0){let x=mve(_);if(x!==void 0)return{outcome:"spent",text:x};return at(_)?{outcome:"unavailable",text:m.unavailableLine}:{outcome:"not_offered",text:bn}}if(l.claiming)return{outcome:"unavailable",text:Dr};let h=_.resetsAt,E=fcn();i("tengu_juniper_tide_selected",{entry:c(a),auto_armed:vV(),config_version:E});let A=Date.now(),v;l.claiming=!0;try{v=await lt(pn(s),zr)??{result:"error",nextAvailableAt:null}}finally{l.claiming=!1}switch(i("tengu_juniper_tide_result",{result:c(v.result),entry:c(a),latency_ms:Date.now()-A,config_version:E}),v.result){case"reset":case"not_limited":case"already_used":case"ineligible":y("juniper_tide");break;case"unavailable":case"rate_limited":case"auth_error":case"error":p("juniper_tide",v.result);break}switch(v.result){case"reset":case"not_limited":{l.unsettledClaimWallResetsAt=null;let x=VIo()&&l.continuableWallResetsAt===h;l.continuableWallResetsAt=null,Gr(l,h,a,x);let S=Bzn(m.successLine,v.result==="reset"?st(v.nextAvailableAt):void 0);return{outcome:"reset",text:x?S:`${S} \xB7 send a message to continue`}}case"already_used":{if(Hr(h,v.nextAvailableAt),l.unsettledClaimWallResetsAt===h)l.unsettledClaimWallResetsAt=null,jr(s);return{outcome:"spent",text:Bzn(m.spentLine,st(v.nextAvailableAt))}}case"ineligible":return Kr(h),{outcome:"not_offered",text:bn};case"auth_error":return{outcome:"unavailable",text:Jr};case"unavailable":case"rate_limited":case"error":if(v.result==="error")l.unsettledClaimWallResetsAt=h;return{outcome:"unavailable",text:m.unavailableLine}}};
var bn="A session-limit reset isn't available right now.";
var Dr="Your session limit is already being reset \xB7 one moment";
var Jr="Couldn't reset your session limit with this login \xB7 run /login, then try again";
function Gr(a,s,l,m){let _=[()=>BD("juniper_tide"),()=>{sH("reset")},()=>$r(s),()=>{let h=FL();if(h.phase!=="idle"&&h.wallResetsAt===s)re({phase:"idle"})},()=>{if(m)xVe()},()=>a.events.emit({type:"reset",entry:l})];for(let h of _)try{h()}catch(E){d(Z(E))}};
function $r(a){let s=pa();if(s.status!=="rejected"||s.rateLimitType!=="five_hour"||s.resetsAt!==a)return;Mhe({...s,status:"allowed",rateLimitType:void 0,resetsAt:void 0})};
function jr(a){if(vV()){sLe();return}plt(a,void 0).catch((s)=>{d(Z(s))})};
function Hr(a,s){let l=FL();if(l.phase!=="answered"||l.wallResetsAt!==a||l.status===null)return;re({...l,status:{...l.status,available:!1,nextAvailableAt:s??l.status.nextAvailableAt}})};
function Kr(a){let s=FL();if(s.phase!=="answered"||s.wallResetsAt!==a||s.status===null)return;re({...s,status:{...s.status,eligible:!1,available:!1}})};
function Br(a){if(a.sessionSwitchSubscribed)return;a.sessionSwitchSubscribed=!0,Od((s,l)=>{if(Oqe(l))a.continuableWallResetsAt=null})};
return {wallCedar:ylo,wallJuniper:_lo,dialogCedar:R9t,dialogJuniper:Xdr,cedar:Ke,juniper:mn,askCedar:te,askJuniper:Ne,cedarState:NL,juniperState:FL,subscribeCedar:ZHe,subscribeJuniper:tDe,cedarOffer:Ime,juniperOffer:eX,cedarSpent:pve,juniperSpent:mve,cedarTokens:h4,beginCedar:_nt,claimCedar:Kdr,cancelCedar:qdr,claimJuniper:HGe,anytimeCedarEnabled:Uie,cedarConfirmationNote:Vdr,cedarUnavailable:fve,cedarLoading:eDe};
}
export function createUsageQualification287(ports){
const {}=ports;
var fA="user:inference";
var WK="user:profile";
function HTn(t){return Array.isArray(t)&&t.includes(fA)};
return {inference:HTn,profileScope:WK};
}
export function createUsage287(ports){
const {$i,Br,E_,Gt,In,Irr,U,Xwn,ft,gJe,gd,jWt,k,mIe,re,rm,t,uWe,zp}=ports;
class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}};
function ct(t,e){return t};
var mie=64;
var hie=200;
class yE{maxHoldMs;#e=new Map;constructor(e){this.maxHoldMs=e}remember(e,n){let r=n.recordedAtMs;for(let[s,h]of this.#e)if(this.#t(h,r)===void 0)this.#e.delete(s);this.#e.set(e,{...n,untilMs:Math.min(n.untilMs,n.recordedAtMs+this.maxHoldMs)})}recall(e,n=Date.now()){let r=this.#e.get(e);if(r===void 0)return;let s=this.#t(r,n);if(s===void 0)this.#e.delete(e);return s}clear(){this.#e.clear()}#t(e,n){return n<e.recordedAtMs||n>=e.untilMs?void 0:e}};
class Qd extends uWe{replayed=!0;kind;recordedAtMs;untilMs;constructor(e,n=Date.now()){let r={headers:new Irr},s=Math.max(0,Math.round((n-e.recordedAtMs)/1000)),h=Math.max(0,Math.ceil((e.untilMs-n)/1000));super(`the endpoint answered ${e.status} ${s}s ago; not asked again for ${h}s`,"ERR_REMEMBERED_RESPONSE",r,void 0,{status:e.status,statusText:"",headers:{},config:r,data:e.body});this.name="RememberedResponseError",this.kind=e.kind,this.recordedAtMs=e.recordedAtMs,this.untilMs=e.untilMs}};
function TF(e){return e instanceof Qd};
function dqn(e){if(TF(e))return e.kind==="auth_rejected";let n=bl(e);return n!==void 0&&_E(n)};
function _E(e){return e.status===401||e.status===403&&e.anthropicError!==void 0};
async function _l({credentials:e,settle:n}){if(n&&gJe())try{await $i({credentials:e})}catch(r){t(`claudeAiAuthKey: token settle failed (${r instanceof Error?r.message:String(r)}); keying the token in memory`)}return Xwn()};
function bl(e){if(!gd(e)||TF(e))return;let n=Irr.from(e.config?.headers??{}).get("Authorization"),r=e.response?.headers?.["retry-after"];return{status:e.response?.status,sentAuthKey:typeof n==="string"&&n!==""?mIe(n):null,retryAfterMs:rm(typeof r==="string"?r:typeof r==="number"?String(r):void 0),anthropicError:gie(e.response?.data)}};
function gie(e){if(typeof e!=="object"||e===null||!("error"in e))return;let n=e.error;if(typeof n!=="object"||n===null||!("type"in n)||typeof n.type!=="string")return;let r="message"in n&&typeof n.message==="string"?re(n.message,hie):void 0;return{error:{type:re(n.type,mie),...r!==void 0&&{message:r}}}};
var Eie=300000;
var NF=3600000;
var Rie=3600000;
var bE=ct(new yE(NF),(e)=>e.clear());
var MF=ct({attempted:!1},(e)=>{e.attempted=!1});
var Sl=ct(new Set,(e)=>{e.clear()});
var xie="tengu_federated_robin";
function vie(){return k(xie,!0)};
function Aie(e){return e>=200&&e<300};
var Tie=new V(()=>({pending:null,requester:null,credentials:void 0}));
function Pie(){let e=In();return`${e?.organizationUuid??""}:${e?.accountUuid??""}`};
async function g0(e,{read:n="plain"}={}){if(n!=="at_wall")return IF(e,n);let r=Tie.of(U().host),s=Pie();if(r.pending!==null&&r.requester===s&&r.credentials===e)return r.pending;let h=IF(e,"at_wall").finally(()=>{if(r.pending===h)r.pending=null,r.requester=null,r.credentials=void 0});return r.pending=h,r.requester=s,r.credentials=e,h};
var Cie={plain:"/api/oauth/usage",at_wall:"/api/oauth/usage?at_wall=1&skip_spend=1",cedar_ember:"/api/oauth/usage?cedar_ember=1&skip_spend=1"};
async function IF(e,n){let r=Cie[n],s=vie();if(!s)bE.clear();let h=s&&ft()&&zp()?Ug(await _l({credentials:e,settle:!1})):void 0;if(h!==void 0)h=Ug(await _l({credentials:e,settle:!0}));if(h?.kind==="auth_rejected"&&Sl.size>0)await Promise.allSettled([...Sl]),h=Ug(await _l({credentials:e,settle:!0}));if(h!==void 0){let g=new Qd(h);throw t(`fetchUtilization: ${r} replayed \u2014 ${g.message}`),g}return Br(n==="at_wall"?"api_usage_fetch_at_wall":n==="cedar_ember"?"api_usage_fetch_cedar_ember":"api_usage_fetch",async()=>{if(!ft()||!zp())return{};let g=0,b,w=jWt(),R=null,A,M=()=>{let z,j=new Promise((K)=>{z=K});return A=j,E_(async()=>{g++;let K=await _l({credentials:e,settle:!1});if(b!==void 0&&K===b.key)throw b.error;t(`fetchUtilization: GET ${r} (attempt ${g})`);try{let X=await Gt.get(r,{timeout:5000,headers:{"Content-Type":"application/json"},refreshOAuth:!0,credentials:e,validateStatus:Aie});if(!X.ok)throw Error(`Auth error: ${X.reason==="no-auth"?X.detail:X.reason}`);return X}catch(X){let J=s?Oie(X,K):null;if(J!==null)b={key:J,error:X};let te=bl(X);if(R=te?.sentAuthKey??K,te?.status===401)Sl.add(j);throw X}},w?{credentials:e,gateToSessionOAuthCredential:!0,oauthRefreshLatch:MF}:{credentials:e}).then((K)=>(z(!0),Sl.delete(j),K),(K)=>{throw z(!1),Sl.delete(j),K})},D;try{D=await M()}catch(z){let j=[...Sl].filter((te)=>te!==A);if(bl(z)?.status!==401||j.length===0)throw z;let K=await Promise.allSettled(j),X=await _l({credentials:e,settle:!0});if(X===null||X===R)throw z;let J=s?Ug(X):void 0;if(J!==void 0)throw new Qd(J);if(!s&&!K.some((te)=>te.status==="fulfilled"&&te.value))throw z;t(`fetchUtilization: ${r} 401 during another read's token refresh; re-sending with the refreshed bearer`),D=await M()}return MF.attempted=!1,t(`fetchUtilization: 200 after ${g} attempt(s)${g>1?" (401\u2192refresh\u2192retry succeeded)":""}`),D.data},Mie)};
function Ug(e){return e===null?void 0:bE.recall(e)};
function Oie(e,n){try{let r=bl(e);if(r===void 0||r.status===void 0)return null;let s=r.sentAuthKey??n;if(s===null)return null;let{status:h,anthropicError:g}=r,b,w;if(_E(r))b="auth_rejected",w=Rie;else if(h===429||h===403){b="rate_limited";let A=r.retryAfterMs??0;w=Math.min(A>0?A:Eie,NF)}else return null;let R=Date.now();return bE.remember(s,{kind:b,status:h,body:g,recordedAtMs:R,untilMs:R+w}),t(`fetchUtilization: ${h} remembered for this bearer; not asking again for ${Math.round(w/1000)}s`),s}catch(r){return t(`fetchUtilization: could not record the endpoint's answer: ${r instanceof Error?r.message:String(r)}`,{level:"error"}),null}};
function Mie(e){let n=bl(e);if(n===void 0)return"error";switch(n.status){case void 0:return"network";case 401:return"http_401";case 403:return"http_403";case 429:return"http_429";default:return"http_other"}};
return {fetch:IF,read:g0,isAuthRejected:dqn};
}
export function createUsageAuthKey287(ports){
const {At,He,WK,fn,qN,uU}=ports;
function mIe(e){return qN("sha256").update(e).digest("hex")};
function Xwn(){let e=fn(),n=e?.accessToken;if(!BWt(e)||!n)return null;return mIe(`Bearer ${n}`)};
function Uv(e){if(e.publicPluginDirectoryCatalog===!0&&e.auth==="none")return;let n=!1;if(!e.bypassEssentialTrafficOnly&&!n&&At())return"essential-traffic-only";if(He()!=="firstParty")return"data-residency";return};
function gJe(){return Uv({})===void 0};
function BWt(e){return uU(e?.scopes)&&!!e?.accessToken};
function zp(){let e=fn()?.scopes;return Array.isArray(e)&&e.includes(WK)};
function jWt(){return fn()?.refreshToken!=null};
return {key:Xwn,settleAllowed:gJe,profile:zp,refreshable:jWt};
}
export function createUsageHostArgv287(ports){
const {}=ports;
var i=new Set(["--prefill","--prefill-b64","--deep-link-repo","--deep-link-last-fetch","--deep-link-cwd-b64","--handle-uri","--settings","--managed-settings","--setting-sources","--client-data-url","--watch-artifact","--watch-artifact-no-autoreact","--team-name","--agent-id","--agent-name","--agent-color","--parent-session-id","--agent-type","--model","--agent","--routine","--effort","--permission-mode","--inherit-permission-mode","--proactivity","--debug-file","--system-prompt","--system-prompt-file","--append-system-prompt","--append-system-prompt-file","--system-prompt-snapshot","--append-subagent-system-prompt","--append-subagent-system-prompt-file","--plan-mode-instructions","--permission-prompt-tool","--permission-prompts","--json-schema","--fallback-model","--advisor","--agents","--name","-n","--allowedTools","--allowed-tools","--disallowedTools","--disallowed-tools","--tools","--add-dir","--mcp-config","--betas","--file","--channels","--dangerously-load-development-channels","--plugin-dir","--plugin-dir-no-mcp","--plugin-url","--remote-control-session-name-prefix","--sdk-url","--exec","-m","--thinking","--thinking-display","--max-thinking-tokens","--max-turns","--max-budget-usd","--task-budget","--autocompact","--rewind-files","--resume-session-at","--resume-drops-turn","--workload","--output-format","--input-format","--teammate-mode","--messaging-socket-path","--session-id","--environment","--pool","--ref","--on-branch","--correlation-id","--forward-home-settings","--project-config-root","--attach-serve",...[]]);
var xor=new Set(["--allowedTools","--allowed-tools","--disallowedTools","--disallowed-tools","--tools","--add-dir","--mcp-config","--betas","--file","--channels","--dangerously-load-development-channels"]);
var a=new Set(["-d","--debug","-r","--resume","--from-pr","-w","--worktree","--teleport","--cloud","--remote","--project","--remote-control","--rc","--prompt-suggestions"]);
function YZe(e,n){let t=e[n];if(t!==void 0&&a.has(t)){let r=e[n+1];return r!==void 0&&!ewt(r)?n+1:n}if(t===void 0||!i.has(t))return n;let o=n+1;if(xor.has(t))while(o+1<e.length&&!ewt(e[o+1]))o++;return o};
function ewt(e){return e.length>1&&e.startsWith("-")};
function Xse(e,n=process.argv){return l(e,n).map((t)=>t.value)};
function l(e,n){let t=[];for(let o=0;o<n.length;o++){let r=n[o];if(r==="--")break;if(r?.startsWith(`${e}=`)){t.push({value:r.slice(e.length+1),indices:[o]});continue}if(r===e&&o+1<n.length){t.push({value:n[o+1],indices:[o,o+1]}),o++;continue}o=YZe(n,o)}return t};
return Xse;
}
export function createUsageHostInput287(ports){
const {Xse,n}=ports;
var wOe=["https://beacon.claude-ai.staging.ant.dev","https://claude.fedstart.com","https://claude-staging.fedstart.com"];
function Q3t(){return n().host.launchOptions.ccrSessionUrl()};
var u=(e)=>JSON.stringify(e);
var T=new Set(["api.anthropic.com","api-staging.anthropic.com",...wOe.map((e)=>new URL(e).hostname)]);
function _(e){let r;try{r=new URL(e)}catch{return{code:"unparseable",reason:`could not parse ${u(e)} as a URL`}}if(T.has(r.hostname)){if(r.protocol!=="wss:"&&r.protocol!=="https:")return{code:"bad_scheme",reason:`scheme ${u(r.protocol)} is not permitted for host ${u(r.hostname)}; only wss:// and https:// are accepted`};return null}return{code:"not_allowlisted",reason:`host ${u(r.hostname)} is not an approved Anthropic endpoint`}};
function UGt(){let e=Q3t();if(e!==void 0)return{status:"ok",url:e};let r=Xse("--sdk-url"),n=r.filter(Boolean).at(-1);if(!n)return{status:"absent"};if(new Set(r).size>1)return{status:"rejected",code:"conflicting",reason:"conflicting --sdk-url occurrences"};let t=_(n);if(t)return{status:"rejected",...t};return{status:"ok",url:n}};
function gwe(e){if(e.protocol==="wss:")e.protocol="https:";else if(e.protocol==="ws:")e.protocol="http:";return e};
return {UGt,gwe};
}
export function createUsageRequest287(ports){
const {$i,At,Dn,EN,Gfe,He,JN,NM,Ov,St,UGt,Vn,XN,_,a,cD,cp,d,dIe,dn,fn,ge,gwe,hi,hj,iA,lc,nS,q0,qN,rc,t,tl,uU,uWe,zn}=ports;
class P extends Error{telemetryMessage;errorClass;constructor(n,e,t){super(n);this.name="TelemetrySafeError",this.telemetryMessage=e??n,this.errorClass=t}};
var st=(n,e)=>{try{if(n!==null&&typeof n==="object"&&!("telemetryMessage"in n)&&Object.isExtensible(n))Object.assign(n,{telemetryMessage:e})}catch{}return n};
function Z(n){return n instanceof Error?n:Error(String(n))};
function Oh(){switch(process.env.CLAUDE_CODE_ENTRYPOINT){case"claude-vscode":return"claude_code_vscode";case"remote":case"remote_baku":case"remote_cowork":case"remote_desktop":case"remote_mobile":case"remote_projects":return"claude_code_remote";case"claude-in-teams":return"claude_code_remote";case"sdk-cli":case"sdk-ts":case"sdk-py":return"claude_code_sdk";case"mcp":return"claude_code_mcp";case"claude-code-github-action":return"claude_code_github_action";case"local-agent":return"claude_code_local_agent";case"claude_in_slack":return"claude_in_slack";case"claude-in-slack":return"claude-in-slack";case"cli":default:return"claude_code_cli"}};
function u7r(){let e=iA(),n=cD();return new ge({...e,...n&&{ca:n},keepAlive:!1})};
function Cfe(){return};
var vN="Invalid SemVer: <redacted>";
function pa(e,n){try{return Bun.semver.order(e,n)}catch(r){throw st(Z(r),vN)}};
function PS(e,n){return pa(e,n)>=0};
var Zd=60000;
var wN=8388608;
var bv=32768;
var m2e=262144;
function kN(e,n){let r=Math.min(e,wN);return Math.max(n,Math.ceil(r/bv*1000))};
function vv(e,n){return Math.max(n,Math.ceil(e/bv*1000))};
function $wn(){return PS("1.4.3","1.4.0")};
class n6t extends Error{waitedMs;constructor(e){super("transfer stalled");this.waitedMs=e;this.name="UploadStalledError"}};
function G3r(e,n){let r=!1,s=!1,g=(b,v)=>{r=!0,b.abort(new n6t(v))},h=setTimeout(g,n,e,n);return{touch:()=>{if(!s)h.refresh()},relax:(b)=>{if(s)return;clearTimeout(h),h=setTimeout(g,b,e,b)},clear:()=>{s=!0,clearTimeout(h)},fired:()=>r}};
function*AN(e,n){for(let r=0;r<e.length;r+=m2e)n(r),yield e.subarray(r,Math.min(r+m2e,e.length));n(e.length)};
function Sv(e,n={}){return Ev(e.length,(r)=>AN(e,r),n)};
function Ev(e,n,r){let s=r.stallMs??Zd,g=Math.max(kN(e,s),r.tailFloorMs??0),h=new AbortController,b=()=>h.abort(r.signal?.reason);if(r.signal?.aborted)b();else r.signal?.addEventListener("abort",b,{once:!0});let v=G3r(h,s),w=0;return{body:EN.from(n((A)=>{if(w=A,A===e)v.relax(g);else v.touch()}),{objectMode:!1}),signal:h.signal,dispose:()=>{v.clear(),r.signal?.removeEventListener("abort",b)},seen:()=>({body_bytes:e,bytes_handed:w,stalled:v.fired()&&r.signal?.aborted!==!0})}};
async function Vv(e){if(!Vn())throw Error("Cloud sessions are only available on the first-party Anthropic API provider.");await $i({credentials:e});let n=fn()?.accessToken;if(n===void 0)throw Error("Claude Code cloud sessions require authentication with a Claude.ai account. API key authentication is not sufficient. Please run /login to authenticate, or check your authentication status with /status.");let r=await hj();if(!r)throw Error("Unable to get organization UUID");return{accessToken:n,orgUUID:r}};
function a6t(e){return{Authorization:`Bearer ${e}`,"Content-Type":"application/json","anthropic-version":"2023-06-01","anthropic-client-platform":Oh()}};
function Kwn(){return};
function qbe(){return Kwn()!==void 0};
function mJe(){if(!qbe())return{host:"memory",auth:"async",refreshOAuth:!0};let e=Dn.CLAUDE_CODE_MEMORY_API_TOKEN;return{host:"memory",auth:"none",refreshOAuth:!1,...e&&{headers:{Authorization:`Bearer ${e}`}}}};
var Pv=Symbol("uploadWire.freedAt");
var xv=Symbol("uploadWire.stamping");
function YN(e){if(!(e instanceof rc.Agent))return;let n=e;if(n[xv])return;n[xv]=!0,n.on("free",(r)=>{r[Pv]=performance.now()})};
function Mv(){let e={},n,r;return{transport:{request(g,h){let b=g.protocol==="http:",v=(b?rc:Ov).request(g,h);return YN(g.agent??(b?rc.globalAgent:Ov.globalAgent)),v.once("socket",(w)=>{n=w,r=typeof w.bytesWritten==="number"?w.bytesWritten:void 0,e.response_started=!1,e.socket_reused=v.reusedSocket===!0;let A=w[Pv];if(e.socket_reused&&A!==void 0)e.socket_idle_ms=Math.round(performance.now()-A);let R=()=>{let M=w.localFamily??w.remoteFamily;if(M==="IPv4")e.local_af=4;else if(M==="IPv6")e.local_af=6};if(w.connecting)w.once("connect",R);else R()}),v.once("response",()=>{e.response_started=!0}),v}},seen:(g)=>({...e,...g&&n!==void 0&&r!==void 0&&typeof n.bytesWritten==="number"&&{bytes_flushed:Math.max(0,n.bytesWritten-r)}})}};
var QN=new Set(["authorization","proxy-authorization","x-authorization","x-api-key","cookie"]);
function tF(e,n){return n.auth==="none"&&n.host!=="frame"&&n.host!=="memory"&&n.baseUrl?n.baseUrl:e};
function Ywn(){return};
function Lv(e){let n=dn();switch(e){case"api":return n.BASE_API_URL;case"claude-ai":return n.CLAUDE_AI_ORIGIN;case"mcp-proxy":return n.MCP_PROXY_URL;case"frame":return Ywn()??n.BASE_API_URL;case"memory":return Kwn()??n.BASE_API_URL;case"ccr-session":return Dv(e).href.replace(/\/$/,"");case"ccr-gateway":return Dv(e).origin}};
function Dv(e){let n=UGt();switch(n.status){case"absent":throw e==="ccr-session"?Error("ccr-session host requires --sdk-url"):Error("ccr-gateway host requires --sdk-url");case"rejected":throw e==="ccr-session"?new P(`ccr-session --sdk-url rejected: ${n.reason}`,"ccr-session --sdk-url rejected by allowlist"):new P(`ccr-gateway --sdk-url rejected: ${n.reason}`,"ccr-gateway --sdk-url rejected by allowlist");case"ok":return gwe(new URL(n.url))}};
function mIe(e){return qN("sha256").update(e).digest("hex")};
function Uv(e){if(e.publicPluginDirectoryCatalog===!0&&e.auth==="none")return;let n=!1;if(!e.bypassEssentialTrafficOnly&&!n&&At())return"essential-traffic-only";if(He()!=="firstParty")return"data-residency";return};
var Bv="OAuth refresh token is no longer valid; run /login to re-authenticate";
var Hv="no claude.ai login";
async function ur(e,n,r,s={},g=!1){Cfe();let h=Uv(s);if(h!==void 0)return{ok:!1,reason:h};if(s.frameTunnel&&(s.host!=="frame"||s.auth!=="session-jwt"))throw Error("frameTunnel requires host 'frame' and auth 'session-jwt'");let b={},v,w=n,A=null;if(s.auth==="teleport-org"){if(await $i({credentials:s.credentials,storageV5:s.storageV5}),await V3(s.credentials))return{ok:!1,reason:"no-auth",detail:Bv};if(!fn()?.accessToken)return{ok:!1,reason:"no-auth",detail:"No OAuth token in keychain"};let{accessToken:J,orgUUID:Q}=await Vv(s.credentials);A=J,b={...a6t(J),"x-organization-uuid":Q},w=n.replace(":orgUUID",Q)}else if(s.auth==="session-jwt"){let J=lc();if(!J)return{ok:!1,reason:"no-auth",detail:"No session access token"};b={Authorization:`Bearer ${J}`},v=b.Authorization}else if(s.auth==="claude-ai-oauth"){await Iv(s);let J=fn(),Q=J?.accessToken;if(!BWt(J)||!Q)return{ok:!1,reason:"no-auth",detail:Hv};if(b={Authorization:`Bearer ${Q}`,"anthropic-beta":cp},s.recoverOAuth401&&(J?.refreshToken||Gfe()))A=Q}else if(s.auth!=="none"){await Iv(s);let J=s.auth==="async"?await NM():dIe();if(J.error&&s.auth!=="optional")return{ok:!1,reason:"no-auth",detail:J.error};b=J.headers}if(s.host==="frame"&&Ywn()!==void 0){if(a.CLAUDE_CODE_ARTIFACTS_API_TOKEN)b={Authorization:`Bearer ${a.CLAUDE_CODE_ARTIFACTS_API_TOKEN}`};A=null}if(s.host==="memory"){let J=mJe();if(J.auth==="none")b=J.headers??{},A=null}let R={"User-Agent":q0(),...b,...s.headers};if(s.frameTunnel){for(let J of Object.keys(R))if(QN.has(J.toLowerCase()))delete R[J];R.Authorization=v}let M=null;if(s.reportSentAuth){let J;for(let[Q,te]of Object.entries(R))if(Q.toLowerCase()==="authorization")J=te;M=J===void 0?null:mIe(J)}let D=s.maxRedirects??(s.host==="frame"?0:void 0),K=r,G=s.timeout??15000,z;if(s.streamUpload!==void 0&&r!==void 0){let J=rF(r),Q=typeof r!=="string"&&!$v(r);if(s.maxBodyLength!==void 0&&J.length>s.maxBodyLength)throw new uWe("Request body larger than maxBodyLength limit",uWe.ERR_BAD_REQUEST);let te=s.streamUpload.stallMs??Zd,pe=s.streamUpload.tailFloorMs?.(J.length);if($wn())z=Sv(J,{stallMs:te,...pe!==void 0&&{tailFloorMs:pe},signal:s.signal}),K=z.body;else K=J,G=Math.max(vv(J.length,te),pe??0);if(!oF(R,"content-type")&&!Q)R["Content-Type"]=typeof r==="string"?"text/plain":"application/json";R["Content-Length"]=String(J.length)}let j=s.streamUpload!==void 0&&r!==void 0&&D===0?Mv():void 0,X;try{try{X=await St.request({method:e,baseURL:s.frameTunnel?`https://${s.frameTunnel.host}`:tF(Lv(s.host??"api"),s),url:w,data:K,timeout:z?0:G,signal:z?z.signal:s.signal,responseType:s.responseType,validateStatus:s.validateStatus,maxContentLength:s.maxContentLength,maxBodyLength:s.maxBodyLength,...D!==void 0&&{maxRedirects:D},...j&&{transport:j.transport},...s.freshConnection&&!s.frameTunnel&&{httpsAgent:u7r(),httpAgent:new XN({keepAlive:!1})},...s.frameTunnel&&{httpsAgent:s.frameTunnel.agent,proxy:!1},headers:R})}catch(J){throw z?nF(J,z):J}finally{if(z)z.dispose(),s.streamUpload?.onSettled?.({...z.seen(),...j?.seen(!0)});else if(s.streamUpload&&Buffer.isBuffer(K))s.streamUpload.onSettled?.({body_bytes:K.length,bytes_handed:K.length,stalled:!1,...j?.seen(!1)})}}catch(J){if(A!==null&&!g&&!s.isBackground&&St.isAxiosError(J)&&J.response?.status===401&&!s.isRouteOwned401?.(J.response.data)){let Q=await Nv(A,s);if(Q==="retry")return ya(J.response.data),ur(e,n,r,s,!0);if(Q!==null)return ya(J.response.data),Q}throw J}if(A!==null&&X.status===401&&!g&&!s.isBackground&&!s.isRouteOwned401?.(X.data)){let J=await Nv(A,s);if(J==="retry")return ya(X.data),ur(e,n,r,s,!0);if(J!==null)return ya(X.data),J}return{ok:!0,data:X.data,status:X.status,response:X,...s.reportSentAuth&&{sentAuthFingerprint:M}}};
async function Iv(e){if(!e.refreshOAuth)return;try{await $i({credentials:e.credentials,storageV5:e.storageV5})}catch(n){t(`firstPartyApi: refreshOAuth failed (${n instanceof Error?n.message:n}); proceeding with cached token`)}};
function nF(e,n){let r=n.seen();if(!(St.isCancel(e)&&r.stalled))return e;let s=n.signal.reason,g=s instanceof n6t?`${Math.round(s.waitedMs/1000)}s`:"the allowance";return new uWe(r.bytes_handed===r.body_bytes?`upload stalled: no answer within ${g} of the body being handed over`:`upload stalled: nothing moved for ${g}`,uWe.ECONNABORTED)};
function rF(e){if(Buffer.isBuffer(e))return e;if(iF(e))return Buffer.from(e.buffer,e.byteOffset,e.byteLength);if(e instanceof ArrayBuffer)return Buffer.from(e);if(typeof e==="string")return Buffer.from(e);if($v(e))return Buffer.from(_(e));throw TypeError("streamUpload: unsupported request body type")};
function $v(e){if(Array.isArray(e))return!0;if(typeof e!=="object"||e===null)return!1;let n=Object.getPrototypeOf(e);return n===Object.prototype||n===null};
function oF(e,n){let r=n.toLowerCase();return Object.keys(e).some((s)=>s.toLowerCase()===r)};
function iF(e){return ArrayBuffer.isView(e)};
function ya(e){if(e instanceof JN)e.destroy()};
async function Nv(e,n){let r=n.auth==="claude-ai-oauth";try{if(await nS(e,n.credentials,n.storageV5))return"retry";if(await V3(n.credentials))return{ok:!1,reason:"no-auth",detail:r?Hv:Bv};return null}catch(s){if(!r)throw s;return d(s),null}};
var Gt={get(e,n){return ur("GET",e,void 0,n)},post(e,n,r){return ur("POST",e,n,r)},put(e,n,r){return ur("PUT",e,n,r)},patch(e,n,r){return ur("PATCH",e,n,r)},delete(e,n,r){return ur("DELETE",e,n,r)}};
function Jl(){return a.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST};
async function V3(e){let n=Af(await tl(e));if(n!==void 0)return n;try{return Ok(await zn().readAsync(e))}catch{return!1}};
function Af(e){if(e){let n=e.refreshToken;return n===""||!!n&&hi.has(n)}if(Jl())return!1;return};
function Ok(e){return e?.claudeAiOauth?.refreshToken===""};
function BWt(e){return uU(e?.scopes)&&!!e?.accessToken};
return {Gt,request:ur};
}
export function createUsageText287(ports){
const {}=ports;
function re(t,n){if(n<=0)return"";if(t.length<=n)return t;let e=t.slice(0,n),r=e.charCodeAt(n-1);return f(r>=55296&&r<=56319?e.slice(0,-1):e)};
function f(t){if(typeof Buffer<"u")return Buffer.from(t,"utf16le").toString("utf16le");return x(t)};
function x(t){let e=[];for(let r=0;r<t.length;r+=8192){let i=Math.min(r+8192,t.length),o=new Uint16Array(i-r);for(let u=r;u<i;u++)o[u-r]=t.charCodeAt(u);e.push(String.fromCharCode(...o))}return e.join("")};
return re;
}
export function createUsageRetryAfter287(ports){
const {}=ports;
function rm(e,n=Date.now()){if(!e)return;let r=Number(e);if(Number.isFinite(r)&&r>=0)return r*1000;let o=Date.parse(e);if(Number.isFinite(o)){let s=o-n;return s>0?s:void 0}return};
return rm;
}
export function createUsageScope287(ports){
const {m,y}=ports;
async function Br(e,r,u){try{let o=await r();return y(e),o}catch(o){throw m(e,u?.(o)??"error"),o}};
return Br;
}
