// Complete pinned 2.1.287 pure catalog. Tool objects and state readers belong to the existing host.
export function createToolCatalog287(ports){
const {Js,Wr,cXt,$a,fi,qR,KR,d7,_V,Sv,RC,hv,ni,vce,go,gy,mo,lo,io,ze,o5,Io,Jze,RXt,Zs,ei,Fr,dk,mr,gr,Tr,wr,Dr,ri,Lr,Nr,HRe,ft,krt,nr,lr,kt,ti,jr,Vt,Mr,ce,Tt,qs,Cr,Gs,to,vr,Rr,Or,Xt,jt,oi,xr,Vs,Ar,eo,Ys,Xs,Qs,Pr,Ce,zr,bt,$r,Br,zI,VI,FB,a,ht,Vh,Pjn,zIr,Lo}=ports;
function pv(){let e=Js(),r=Wr();return[cXt,...$a()?[fi]:[],...[qR,KR].filter((n)=>!d7().has(n.name)),_V,Sv,RC,hv,...(ni?.()??[]).filter((n)=>!d7().has(n.underlyingV1ToolName)),vce,...go,gy,mo,lo,io,ze,o5,Io,Jze,RXt,...[],Zs,...e?[e]:[],ei,...Fr?[Fr]:[],...dk()?[mr,gr,Tr,wr]:[],...Dr?[Dr]:[],...ri(),...Lr?[Lr]:[],...Nr?[Nr]:[],...HRe()?[ft]:[],...krt()?[nr,lr]:[],kt(),ti(),...jr?[jr]:[],Vt,...r?[r]:[],...Mr?[Mr]:[],...ce?[ce]:[],Tt,...qs,...Cr()?Gs:[],to,...vr?[vr]:[],...Rr?[Rr]:[],...Or?[Or]:[],Xt,jt,...oi,...xr?[xr]:[],...Vs,...Ar?[Ar]:[],eo,Ys,Xs,Qs,...Pr?[Pr]:[],...Ce?[Ce]:[],...zr?[zr]:[],...bt()?[bt()]:[],...$r?[$r]:[],...Br?[Br()]:[],...[],zI,VI,FB,...a.CLAUDE_CODE_ENABLE_REFRESH_MCP_TOOLS?[ht]:[],...Vh()?[Pjn]:[],zIr,Lo]}
return pv;
}
export function createToolCatalogQualifiers287(ports){
const {Le,Neo,a,$a,Vde,co,Jr}=ports;
const ISn=new Set;
const DSn=new Set([co,Jr]);
function bE(){if(!Le("true"))return!1;if(Neo())return!1;return a.CLAUDE_CODE_ENTRYPOINT!=="local-agent"}
function d7(){if(!bE()||!$a())return ISn;let e=DSn,n;for(let r of e){let s=Vde(r);if(s!==void 0)n??=new Set(e),n.add(s.name)}return n??e}
function dk(){if(a.CLAUDE_CODE_ENABLE_TASKS===!1)return!1;return!0}
function HRe(){return Le("true")}
function krt(){return!0}
function Wr(){return null}
return {bE,d7,dk,HRe,krt,Wr};
}
