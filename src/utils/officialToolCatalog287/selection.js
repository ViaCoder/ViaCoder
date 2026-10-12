// Complete pinned 2.1.287 HO/ETt. Same host Tools, permission and MCP owners.
export function createPublicToolSelection287(ports){
const {a,Wr,gM,rP,zs,Sv,RC,hv,ce,L1,We,cXt,ze,kt,nm,Tt,Pq,bt,$a,fi,zI,VI,FB,Fi,pv,Mt,Ue,ic,Bb,g1t,fct,hr,bE,qR,KR,Ofn,Yxo,dFe,aG,Qa,UP,zIr}=ports;
const HO=(e,r)=>{if(a.CLAUDE_CODE_SIMPLE&&!r?.skipSimpleModeFilter){let v=Wr();if(v!==null&&gM()&&!r?.skipReplFilter){let O=rP()||e.restricted===!0&&zs(e,v)!==null?[Sv,RC,hv]:[v,RC,hv];if(ce!==null&&L1())O.push(ce);if(We.isCoordinatorMode())O.push(cXt,ze,kt(),...nm()?[Tt]:[]);return Pq(O,e)}let R=bt(),E=[...$a()?[fi]:[],...R?[R]:[],Sv,RC];if(We.isCoordinatorMode())E.push(cXt,ze,kt(),...nm()?[Tt]:[]);return Pq(E,e)}let n=new Set([zI.name,VI.name,FB.name,Fi]),s=pv().filter((v)=>!n.has(v.name)),p=Pq(s,e),g=p.some((v)=>Mt(v,Ue))&&fi.isEnabled(),h=!1;if(gM()&&!r?.skipReplFilter){if(p.some((R)=>Mt(R,ic)))p=p.filter((R)=>!Bb(R,g1t)),h=!0}if(!r?.skipReplFilter&&fct(p,e,{activeAgents:r?.activeAgents}))p=p.filter((v)=>!Mt(v,hr));let b=p.map((v)=>v.isEnabled()),w=p.filter((v,R)=>b[R]);if(bE()&&!g&&!h){let v=Pq([qR,KR,...Ofn([KR.name,qR.name])].filter((R)=>!w.includes(R)),e);w=[...w,...v]}if((Yxo()||dFe())&&!aG(w)&&!w.some((v)=>Mt(v,Qa))&&!w.some((v)=>Mt(v,UP)))w=[...w,...Pq([zIr],e)];return w};
return HO;
}
export function createPublicToolPool287(ports){
const {HO,Ll,eHn,Pq}=ports;
function o3e(r){return r.filter((e)=>e.mcpInfo?.hiddenFromModel!==!0)}
function Qre(e,n){return e.name.localeCompare(n.name)}
function ETt(e,r,n){let s=HO(e,n),p=Ll(o3e([...n?.machineMcpTools??[],...r]),"name"),g=eHn(Pq(p,e),p);return Ll(s.toSorted(Qre).concat(g.sort(Qre)),"name")}
return ETt;
}
