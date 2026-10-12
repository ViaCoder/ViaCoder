// Generated fixed-287 complete initializers; all business owners are borrowed.
function initialize_m0(p){
const {JV,V7,Y5,l,t}=p;
async function Voo(e,n){if(!Y5.attach({...e,attachedAt:Date.now(),...n!==void 0&&{answers:n}}))return!1;t(`session.attach: ${e.clientId} on ${e.surface}`);try{await JV.get(),await V7().session.attach(e)}catch(r){t(`session.attach: failed: ${l(r)}`,{level:"error"})}return!0}
var mtt=(e)=>`${e}:default`;
function K6e(e){if(e===void 0||typeof e==="string"||e.type==="engine")return[];if(e.type==="Button"||e.type==="Input"||e.type==="Select"){let{plugin:r,handle:s}=e.press;return[{tag:e.type,plugin:r,handle:s,element:e.props.key,isAutoFocus:e.props.autoFocus===!0,...e.type!=="Button"&&{value:e.props.value},...e.type==="Select"&&{options:e.props.options}}]}return(e.children??[]).flatMap(K6e)}
return {Voo,mtt,K6e};
}
function initialize_m1(p){
const {Jt,O6,li,Sde,Ao,c2,xan,Y5,Dl,ODt,K6e,ct,D3n,Fl,Jne,Mun,Oun,YNt,re}=p;
function DS(e,r){return e.by==="auto"&&r!==null&&r!==void 0?{kind:"plugin",name:r.plugin}:{kind:"person"}}
function xS(e){let r=Jt.get(e)?.holder;if(r===void 0)return null;return{plugin:r.plugin,key:r.element}}
var OS=(e,r)=>({result:r,element:xS(e)});
function Eo(e,r){let n=e==="AbovePrompt"&&r===O6,s=e==="Pane"&&li().getState().open.some((g)=>g.id===r);return n||s}
function FS(e,r){return r.element===void 0&&r.isHeld&&e.element!==void 0?{...r,element:e.element,by:e.by}:r}
var US=(e,r)=>({...r,by:e.by+r.by});
function LS(e,r){return(e==="Pane"?Sde(li().getState()):[]).find((g)=>g.id===r)?.plugin}
function jm(e){let r,n;async function s(g,w){try{return await new Promise((h,M)=>{w(g).then(h,M)})}finally{let h=n;if(n=void 0,r=h&&s(h.report,w),h!==void 0)r?.then(h.resolve,h.reject)}}return{drop:(g)=>{let w=n,h=()=>w?.resolve(g);n=void 0,(r??Promise.resolve()).then(h,h)},take:(g,w)=>{if(r===void 0)return r=s(g,w),r;if(n!==void 0)return n.report=e(n.report,g),n.promise;let{promise:h,resolve:M,reject:v}=Promise.withResolvers();return n={report:g,resolve:M,reject:v,promise:h},h}}}
var fs=(e,r,n)=>({owner:r?.owner??LS(e.component,e.requestId),offset:0,bodyRows:0,contentRows:0,keyed:[],focusables:[],isHeld:!1,holder:void 0,isPersonMoving:!1,isSuperseded:!1,isReporting:!1,isFollowingEnd:!1,scrolls:r?.scrolls??jm(US),focuses:r?.focuses??jm(FS),...e,...r,...n});
var xl=()=>({result:{deny:"no such site"},element:null});
async function HS(e){let{clientId:r,component:n,requestId:s,element:g}=e,w=c2(n,s),h=Jt.get(w);if(h===void 0||!Eo(n,s))return xl();Jt.set(w,fs({component:n,requestId:s,clientId:r},h,{isHeld:e.isHeld,holder:e.isHeld?h.holder:void 0,isReporting:!0})),Ao(w);let M=g!==void 0&&e.isHeld,v=g??void 0;try{return OS(w,M?await xan({input:{component:n,requestId:s,...v!==void 0&&{plugin:v.plugin,element:v.key},origin:DS(e,g)}}):{})}finally{let R=Jt.get(w);if(R!==void 0)Jt.set(w,{...R,isReporting:!1})}}
var BS={turnsOf:(e)=>e.focuses,run:HS,denied:xl};
var gi=(e)=>Y5.list().some((r)=>r.clientId===e);
function Ol(e,r){let{clientId:n,component:s,requestId:g}=e,w=c2(s,g),h=Jt.get(w);if(!Eo(s,g)||h===void 0&&!gi(n))return Promise.resolve(r.denied(e));let v=fs({component:s,requestId:g,clientId:n},h,{});return Jt.set(w,v),r.turnsOf(v).take(e,r.run)}
var pC=(e)=>Ol(e,BS);
function jS(e){let r=c2("Pane",e.requestId),n=Jt.get(r);if(!(Eo("Pane",e.requestId)&&(n!==void 0||e.isHeld&&gi(e.clientId))))return;Jt.set(r,fs({component:"Pane",requestId:e.requestId,clientId:e.clientId},n,{isHeld:e.isHeld,...!e.isHeld&&{holder:void 0}})),Ao(r)}
function WS(e){let{open:r,focusedId:n}=li().getState();for(let s of r){let g=Jt.has(c2("Pane",s.id)),w=s.id===n;if(g||w)jS({clientId:e,requestId:s.id,isHeld:w})}}
var Ul=(e)=>Math.max(0,e.contentRows-e.bodyRows);
var QS=(e)=>({result:{deny:"the window moved meanwhile"},offset:Dl(e),isFollowingEnd:e.isFollowingEnd});
function $S(e,r){let{key:n,before:s}=e,g=Jt.get(n);if(g===void 0||g.scrolls!==e.scrolls)return{result:r,offset:s,isFollowingEnd:!1};if(g.isSuperseded){let v=QS(g);return g.scrolls.drop(v),v}let w=r.deny!==void 0,{end:h}=e,M=g.isFollowingEnd||!w&&h.wasFollowed&&h.isDownward&&g.offset>=h.offset;return Jt.set(n,{...g,offset:w?s:g.offset,isFollowingEnd:M}),{result:r,offset:w?s:g.offset,isFollowingEnd:M}}
var VS=(e,r)=>({offset:Ul(e),wasFollowed:r.isFollowingEnd,isDownward:e.by>0});
function GS(e,r){let n=Ul(e);return r.isFollowingEnd?n:Math.min(r.offset,n)}
var zS=(e,r)=>({key:c2(e.component,e.requestId),scrolls:r.scrolls,before:GS(e,r),end:VS(e,r)});
var Hl=(e)=>({result:{deny:"no such site"},offset:e.offset,isFollowingEnd:!1});
async function YS(e){let{clientId:r,component:n,requestId:s}=e,g=c2(n,s),w=Jt.get(g);if(w===void 0||!Eo(n,s))return Hl(e);let h=zS(e,w),M=Math.min(Math.max(0,h.before+e.by),h.end.offset);Jt.set(g,fs({component:n,requestId:s,clientId:r},w,{offset:h.before,bodyRows:e.bodyRows,contentRows:e.contentRows,...e.keyed!==void 0&&{keyed:e.keyed},isPersonMoving:!0,isSuperseded:!1})),Ao(g);try{return $S(h,await ODt({input:{component:n,requestId:s,offset:M,by:e.by,bodyRows:e.bodyRows,contentRows:e.contentRows,origin:{kind:"person"},...e.pointer!==void 0&&{pointer:e.pointer}}}))}finally{let v=Jt.get(g);if(v!==void 0&&v.scrolls===h.scrolls)Jt.set(g,{...v,isPersonMoving:!1,isSuperseded:!1})}}
var JS={turnsOf:(e)=>e.scrolls,run:YS,denied:Hl};
function XS(e,r){return r===void 0||r.bodyRows===0&&r.contentRows===0?e:{bodyRows:e.bodyRows}}
function ZS(e){let{clientId:r,component:n,requestId:s}=e;if(!(Eo(n,s)&&gi(r)))return;let w=c2(n,s),h=Jt.get(w);Jt.set(w,fs({component:n,requestId:s,clientId:r},h,{clientId:r,...e.scroll!==void 0&&XS(e.scroll,h),...e.contentRows!==void 0&&{contentRows:e.contentRows},...e.keyed!==void 0&&{keyed:e.keyed},...e.keyboard!==void 0&&{isHeld:e.keyboard==="held"}})),Ao(w)}
function ek(e){let{clientId:r,component:n,requestId:s}=e,g=c2(n,s),w=Jt.get(g);if(!(w!==void 0&&gi(r)&&Eo(n,s)))return;let M=K6e(e.tree),{holder:v}=w,R=v!==void 0&&M.some((U)=>U.plugin===v.plugin&&U.element===v.element);Jt.set(g,{...w,focusables:M,holder:R?v:void 0}),Ao(g)}
var wd=ct(new Map,(e)=>e.clear());
function Wm(){let e=new Set(Oun().map((s)=>s.clientId)),r=new Set(Y5.list().map((s)=>s.clientId));Fl((s)=>!r.has(s.clientId));for(let[s,g]of wd)if(!e.has(s))wd.delete(s),g();for(let s of e)if(!wd.has(s))wd.set(s,YNt()),D3n(`${s} attached`);if(Jne.get()===void 0&&Mun()===void 0)D3n("no sized client attached")}
var WC=(e)=>Ol(e,JS);
function $C(e){let{scroll:r,isFocused:n}=e,s=typeof r==="object"&&r!==null&&"offset"in r&&"bodyRows"in r,g=s?r.offset:void 0,w=s?r.bodyRows:void 0;return{...typeof g==="number"&&typeof w==="number"&&Number.isInteger(g)&&Number.isInteger(w)&&g>=0&&w>=0&&{scroll:{offset:g,bodyRows:w}},...typeof n==="boolean"&&{keyboard:n?"held":"away"}}}
var Tw=65536;
function sI(e){let r=e.output;if(typeof r!=="string"||r.length<=Tw)return e;return{...e,output:re(r,Tw)}}
function iI(e,r,n){if(e!=="ToolUse"&&e!=="ToolResult")return n;if(typeof n.tool_use_id==="string")return n;return{...n,tool_use_id:r}}
return {DS,xS,OS,Eo,FS,US,LS,jm,fs,xl,HS,BS,gi,Ol,pC,jS,WS,Ul,QS,$S,VS,GS,zS,Hl,YS,JS,XS,ZS,ek,wd,Wm,WC,$C,Tw,sI,iI};
}
function initialize_m2(p){
const {LEt}=p;
var Ie="ui_";
var He="ui_detach";
function Roo(s,e){return typeof s==="string"&&s.startsWith(Ie)&&!(s===He&&e)&&!LEt()}
return {Ie,He,Roo};
}
export const borrowed287=[
  {
    "file": "chunk-xep95vq1.js",
    "name": "$En",
    "provider": "canonical"
  },
  {
    "file": "chunk-xep95vq1.js",
    "name": "BEn",
    "provider": "canonical"
  },
  {
    "file": "chunk-k35krsdc.js",
    "name": "Bn",
    "provider": "canonical"
  },
  {
    "file": "chunk-xep95vq1.js",
    "name": "DEn",
    "provider": "canonical"
  },
  {
    "file": "chunk-hhxhpvxp.js",
    "name": "Djt",
    "provider": "canonical"
  },
  {
    "file": "chunk-kgfqrfpa.js",
    "name": "Dq",
    "provider": "canonical"
  },
  {
    "file": "chunk-xep95vq1.js",
    "name": "FEn",
    "provider": "canonical"
  },
  {
    "file": "chunk-xep95vq1.js",
    "name": "GEn",
    "provider": "canonical"
  },
  {
    "file": "chunk-xep95vq1.js",
    "name": "HEn",
    "provider": "canonical"
  },
  {
    "file": "chunk-xapeakym.js",
    "name": "Km",
    "provider": "canonical"
  },
  {
    "file": "chunk-hrhfcbdv.js",
    "name": "Kt",
    "provider": "canonical"
  },
  {
    "file": "chunk-kgfqrfpa.js",
    "name": "L3n",
    "provider": "canonical"
  },
  {
    "file": "chunk-xep95vq1.js",
    "name": "LEn",
    "provider": "canonical"
  },
  {
    "file": "chunk-xep95vq1.js",
    "name": "MEn",
    "provider": "canonical"
  },
  {
    "file": "chunk-xep95vq1.js",
    "name": "NEn",
    "provider": "canonical"
  },
  {
    "file": "chunk-xep95vq1.js",
    "name": "OEn",
    "provider": "canonical"
  },
  {
    "file": "chunk-kgfqrfpa.js",
    "name": "Oun",
    "provider": "canonical"
  },
  {
    "file": "chunk-kgfqrfpa.js",
    "name": "Sde",
    "provider": "canonical"
  },
  {
    "file": "chunk-xep95vq1.js",
    "name": "UEn",
    "provider": "canonical"
  },
  {
    "file": "chunk-xep95vq1.js",
    "name": "VEn",
    "provider": "canonical"
  },
  {
    "file": "chunk-mphp7acd.js",
    "name": "JV",
    "provider": "canonical"
  },
  {
    "file": "chunk-mphp7acd.js",
    "name": "V7",
    "provider": "canonical"
  },
  {
    "file": "chunk-kgfqrfpa.js",
    "name": "Y5",
    "provider": "canonical"
  },
  {
    "file": "chunk-c9me9cp7.js",
    "name": "l",
    "provider": "canonical"
  },
  {
    "file": "chunk-xapeakym.js",
    "name": "Jt",
    "provider": "canonical"
  },
  {
    "file": "chunk-xapeakym.js",
    "name": "Dl",
    "provider": "canonical"
  },
  {
    "file": "chunk-xapeakym.js",
    "name": "Ao",
    "provider": "canonical"
  },
  {
    "file": "chunk-mphp7acd.js",
    "name": "O6",
    "provider": "canonical"
  },
  {
    "file": "chunk-kgfqrfpa.js",
    "name": "li",
    "provider": "canonical"
  },
  {
    "file": "chunk-mphp7acd.js",
    "name": "ODt",
    "provider": "canonical"
  },
  {
    "file": "chunk-mphp7acd.js",
    "name": "c2",
    "provider": "canonical"
  },
  {
    "file": "chunk-xep95vq1.js",
    "name": "WEn",
    "provider": "canonical"
  },
  {
    "file": "chunk-kgfqrfpa.js",
    "name": "D3n",
    "provider": "canonical"
  },
  {
    "file": "chunk-xapeakym.js",
    "name": "Fl",
    "provider": "canonical"
  },
  {
    "file": "chunk-kgfqrfpa.js",
    "name": "Jne",
    "provider": "canonical"
  },
  {
    "file": "chunk-kgfqrfpa.js",
    "name": "Mun",
    "provider": "canonical"
  },
  {
    "file": "chunk-kgfqrfpa.js",
    "name": "YNt",
    "provider": "canonical"
  },
  {
    "file": "chunk-x954y317.js",
    "name": "ct",
    "provider": "canonical"
  },
  {
    "file": "chunk-09m4fzsj.js",
    "name": "h5e",
    "provider": "canonical"
  },
  {
    "file": "chunk-xep95vq1.js",
    "name": "jEn",
    "provider": "canonical"
  },
  {
    "file": "chunk-kgfqrfpa.js",
    "name": "m9e",
    "provider": "canonical"
  },
  {
    "file": "chunk-n2zepamy.js",
    "name": "olr",
    "provider": "canonical"
  },
  {
    "file": "chunk-mphp7acd.js",
    "name": "xan",
    "provider": "canonical"
  },
  {
    "file": "chunk-xep95vq1.js",
    "name": "qEn",
    "provider": "canonical"
  },
  {
    "file": "chunk-mphp7acd.js",
    "name": "r7",
    "provider": "canonical"
  },
  {
    "file": "chunk-xapeakym.js",
    "name": "rk",
    "provider": "canonical"
  },
  {
    "file": "chunk-eske5nfz.js",
    "name": "re",
    "provider": "canonical"
  },
  {
    "file": "chunk-xapeakym.js",
    "name": "vd",
    "provider": "canonical"
  },
  {
    "file": "chunk-xep95vq1.js",
    "name": "zEn",
    "provider": "canonical"
  },
  {
    "file": "chunk-64z3xwk8.js",
    "name": "LEt",
    "provider": "canonical"
  },
  {
    "file": "chunk-09m4fzsj.js",
    "name": "d9e",
    "provider": "canonical"
  },
  {
    "file": "chunk-jbmda45v.js",
    "name": "Aee",
    "provider": "canonical"
  },
  {
    "file": "chunk-n2zepamy.js",
    "name": "pme",
    "provider": "canonical"
  },
  {
    "file": "chunk-x5mcrns6.js",
    "name": "qm",
    "provider": "canonical"
  }
];
export function createPluginUiSources287(getSource,host){
if(typeof getSource!=="function"||typeof host.logForDebugging!=="function")throw Error("Missing real source/logger ports");
const cache=new Map();function read(file,name){const key=file+":"+name;if(!cache.has(key)){const value=getSource(file,name);if(value===undefined)throw Error("Missing original source "+key);cache.set(key,value)}return cache.get(key)}
const m0=initialize_m0({JV:read("chunk-mphp7acd.js","JV"),V7:read("chunk-mphp7acd.js","V7"),Y5:read("chunk-kgfqrfpa.js","Y5"),l:read("chunk-c9me9cp7.js","l"),t:host.logForDebugging});
const m1=initialize_m1({Jt:read("chunk-xapeakym.js","Jt"),O6:read("chunk-mphp7acd.js","O6"),li:read("chunk-kgfqrfpa.js","li"),Sde:read("chunk-kgfqrfpa.js","Sde"),Ao:read("chunk-xapeakym.js","Ao"),c2:read("chunk-mphp7acd.js","c2"),xan:read("chunk-mphp7acd.js","xan"),Y5:read("chunk-kgfqrfpa.js","Y5"),Dl:read("chunk-xapeakym.js","Dl"),ODt:read("chunk-mphp7acd.js","ODt"),K6e:m0["K6e"],ct:read("chunk-x954y317.js","ct"),D3n:read("chunk-kgfqrfpa.js","D3n"),Fl:read("chunk-xapeakym.js","Fl"),Jne:read("chunk-kgfqrfpa.js","Jne"),Mun:read("chunk-kgfqrfpa.js","Mun"),Oun:read("chunk-kgfqrfpa.js","Oun"),YNt:read("chunk-kgfqrfpa.js","YNt"),re:read("chunk-eske5nfz.js","re")});
const m2=initialize_m2({LEt:read("chunk-64z3xwk8.js","LEt")});
const source={$C:m1["$C"],$En:read("chunk-xep95vq1.js","$En"),BEn:read("chunk-xep95vq1.js","BEn"),Bn:read("chunk-k35krsdc.js","Bn"),DEn:read("chunk-xep95vq1.js","DEn"),Djt:read("chunk-hhxhpvxp.js","Djt"),Dq:read("chunk-kgfqrfpa.js","Dq"),FEn:read("chunk-xep95vq1.js","FEn"),GEn:read("chunk-xep95vq1.js","GEn"),HEn:read("chunk-xep95vq1.js","HEn"),Km:read("chunk-xapeakym.js","Km"),Kt:read("chunk-hrhfcbdv.js","Kt"),L3n:read("chunk-kgfqrfpa.js","L3n"),LEn:read("chunk-xep95vq1.js","LEn"),MEn:read("chunk-xep95vq1.js","MEn"),NEn:read("chunk-xep95vq1.js","NEn"),OEn:read("chunk-xep95vq1.js","OEn"),Oun:read("chunk-kgfqrfpa.js","Oun"),Sde:read("chunk-kgfqrfpa.js","Sde"),UEn:read("chunk-xep95vq1.js","UEn"),VEn:read("chunk-xep95vq1.js","VEn"),Voo:m0["Voo"],WC:m1["WC"],WEn:read("chunk-xep95vq1.js","WEn"),WS:m1["WS"],Wm:m1["Wm"],Y5:read("chunk-kgfqrfpa.js","Y5"),ZS:m1["ZS"],ek:m1["ek"],h5e:read("chunk-09m4fzsj.js","h5e"),iI:m1["iI"],jEn:read("chunk-xep95vq1.js","jEn"),li:read("chunk-kgfqrfpa.js","li"),m9e:read("chunk-kgfqrfpa.js","m9e"),mtt:m0["mtt"],olr:read("chunk-n2zepamy.js","olr"),pC:m1["pC"],qEn:read("chunk-xep95vq1.js","qEn"),r7:read("chunk-mphp7acd.js","r7"),rk:read("chunk-xapeakym.js","rk"),sI:m1["sI"],t:host.logForDebugging,vd:read("chunk-xapeakym.js","vd"),zEn:read("chunk-xep95vq1.js","zEn"),Roo:m2.Roo,Aee:read("chunk-jbmda45v.js","Aee"),LEt:read("chunk-64z3xwk8.js","LEt"),pme:read("chunk-n2zepamy.js","pme"),qm:read("chunk-x5mcrns6.js","qm")};
const renderHooksModule={hasRenderHooks:read("chunk-09m4fzsj.js","d9e")};
return {source,renderHooksModule,verifyBorrowed(){return borrowed287.map(({file,name})=>({file,name,value:read(file,name)}))}};
}

// Original complete 16 branches, same order. Only Bun module transport adapted.
export function createPrintUiControlDispatcher287(candidate,host){
const {$C,$En,BEn,Bn,DEn,Djt,Dq,FEn,GEn,HEn,Km,Kt,L3n,LEn,MEn,NEn,OEn,Oun,Sde,UEn,VEn,Voo,WC,WEn,WS,Wm,Y5,ZS,ek,h5e,iI,jEn,li,m9e,mtt,olr,pC,qEn,r7,rk,sI,t,vd,zEn,Roo,Aee,pme,qm}=candidate.source;
const {Pf,We,Ze,executionSession}=host;for(const name of ["Pf","We","Ze","panesRevision"])if(typeof host[name]!=="function")throw Error("Missing actual lexical port "+name);
const mo=host.mo;if(!mo||typeof mo.get!=="function"||typeof mo.set!=="function"||typeof mo.delete!=="function")throw Error("Missing same inFlightSdkControls.source287");
const nr=function(b,D,K,ce={}){We(b,pme(qm(executionSession),D,K,ce).error)};
const loadRenderHooksModule287=async()=>candidate.renderHooksModule;
const scope={$C,$En,BEn,Bn,DEn,Djt,Dq,FEn,GEn,HEn,Km,Kt,L3n,LEn,MEn,NEn,OEn,Oun,Pf,Sde,UEn,VEn,Voo,WC,WEn,WS,We,Wm,Y5,ZS,Ze,ek,h5e,iI,jEn,li,m9e,mo,mtt,nr,olr,pC,qEn,r7,rk,sI,t,vd,zEn,Roo,Aee,loadRenderHooksModule287,get Uu(){return host.panesRevision()}};
const execute=new Function("scope","A","Cr","with(scope){return (async()=>{for(let once=true;once;once=false){if(Roo(A.request.subtype,Y5.list().length>0)){We(A,`${Aee}: ${Kt(String(A.request.subtype))}`)}else if(A.request.subtype===\"ui_attach\"){let j=OEn().safeParse(A.request);if(!j.success){We(A,`ui_attach: surface must be \"desktop\", \"mobile\" or \"vscode\", client_id 1-64 of letters, digits, . _ - (the colon is the engine's), viewport (when given) positive integer columns and rows with isFullscreen (when given) a boolean, and answers (when given) a list of \"ui_copy\", \"ui_prompt_read\", \"ui_prompt_fill\", \"ui_prompt_suggest\"`);continue}let ue=A,J=j.data;Cr(async()=>{try{let ie=Voo({surface:J.surface,clientId:J.client_id,...J.viewport!==void 0&&{viewport:J.viewport}},J.answers),be=Uu;if(Wm(),Ze(ue,{surfaces:[...r7()]}),Oun().some((pt)=>pt.clientId===J.client_id)&&Uu===be)Pf(vd(li().getState()));await ie}catch(ie){nr(ue,\"ui_attach\",ie)}})}else if(A.request.subtype===\"ui_detach\"){let j=HEn().safeParse(A.request);if(!j.success){We(A,\"ui_detach: client_id must be 1-64 of letters, digits, . _ - (the colon is the engine's)\");continue}let ue=A,J=j.data;Cr(async()=>{try{let ie=Y5.list().some((ve)=>ve.clientId===J.client_id),be=olr(J.client_id,\"detach\");Wm(),Ze(ue,{detached:ie,surfaces:[...r7()]}),await be}catch(ie){nr(ue,\"ui_detach\",ie)}})}else if(A.request.subtype===\"ui_render\"){let j=DEn().safeParse(A.request);if(!j.success){We(A,'ui_render: surface must be \"desktop\", \"mobile\" or \"vscode\", component a render site name, instance_id a string, props an object, client_id (when given) 1-64 safe characters, viewport (when given) positive integer columns and rows with isFullscreen (when given) a boolean, and on_screen (when given) null or integers first <= last < of');continue}let ue=A,J=j.data,ie=`${J.instance_id}#${J.bench?.seq??0}`;t(`BENCH ui_render key=${ie} rid=${ue.request_id} C0=${Date.now()}`);let be=Bn();mo.get(ue.request_id)?.abort(),mo.set(ue.request_id,be),Cr(async()=>{try{Voo({surface:J.surface,clientId:J.client_id??mtt(J.surface),...J.viewport!==void 0&&{viewport:J.viewport}}),Wm();let ve=J.component===\"Pane\"||J.component===\"AbovePrompt\"?{clientId:J.client_id??mtt(J.surface),component:J.component,requestId:J.instance_id}:void 0;if(ve!==void 0)ZS({...ve,...$C(J.props),...J.content_rows!==void 0&&{contentRows:J.content_rows},...J.keyed!==void 0&&{keyed:J.keyed}});let pt=await loadRenderHooksModule287(),St=iI(J.component,J.instance_id,sI(J.props)),{onScreen:it,...Bt}=St,Wt=!Djt.has(J.component)?St:J.on_screen===void 0?Bt:{...Bt,onScreen:J.on_screen},ot=await h5e.run({surface:J.surface,component:J.component,requestId:J.instance_id,...J.viewport!==void 0&&{viewport:J.viewport},props:Wt});if(be.signal.aborted)return;if(ve!==void 0)ek({...ve,tree:ot.tree});t(`BENCH ui_render key=${ie} rid=${ue.request_id} C3=${Date.now()}`);let Je=Object.keys(ot.clientModules).length>0;Ze(ue,{tree:ot.tree,props:ot.props,rewritten:ot.rewritten,hooked:pt.hasRenderHooks(J.component),...Je&&{client_modules:ot.clientModules},...J.bench!==void 0&&{bench:J.bench}})}catch(ve){if(!be.signal.aborted)nr(ue,\"ui_render\",ve)}finally{if(mo.get(ue.request_id)===be)mo.delete(ue.request_id)}})}else if(A.request.subtype===\"ui_press\"){let j=MEn().safeParse(A.request);if(!j.success){We(A,'ui_press: plugin must be a string, handle an integer, surface (when given) \"desktop\", \"mobile\" or \"vscode\" and href (when given) a string of at most 2048 characters');continue}let ue=A,J=j.data;Cr(async()=>{try{let ie=await h5e.press({plugin:J.plugin,handle:J.handle,surface:J.surface,link:J.href===void 0?void 0:{href:J.href}});Ze(ue,ie===void 0?{handled:!1}:{handled:!0,element:ie.element})}catch(ie){nr(ue,\"ui_press\",ie)}})}else if(A.request.subtype===\"ui_input\"){let j=$En().safeParse(A.request);if(!j.success){We(A,'ui_input: plugin must be a string, handle an integer, kind \"change\" or \"submit\", value a string of at most 16384 characters, key (when given) a string, component (when given) a render site name, instance_id (when given) a string and surface (when given) \"desktop\", \"mobile\" or \"vscode\"');continue}let ue=A,J=j.data;Cr(async()=>{try{let ie=await h5e.input({plugin:J.plugin,handle:J.handle,surface:J.surface,kind:J.kind,value:J.value,...J.key!==void 0&&{element:J.key},...J.component!==void 0&&{component:J.component},...J.instance_id!==void 0&&{requestId:J.instance_id}});Ze(ue,ie===void 0?{handled:!1}:{handled:!0,element:ie.element,value:ie.value})}catch(ie){nr(ue,\"ui_input\",ie)}})}else if(A.request.subtype===\"ui_prompt_edit\"){let j=qEn().safeParse(A.request);if(!j.success){We(A,'ui_prompt_edit: text must be a string of at most 1000000 characters, cursor an integer >= 0, key (when given) an object with key a string of 1-32 characters and ctrl, shift, meta each true when present, by (when given) \"person\" or \"app\", surface (when given) \"desktop\", \"mobile\" or \"vscode\" and client_id (when given) 1-64 of letters, digits, . _ -');continue}let ue=A,J=j.data,ie=J.client_id??mtt(J.surface),be={text:J.text,cursor:J.cursor};Cr(async()=>{try{let ve=J.by===\"app\"?Km.adopt(ie,be):await Km.edit({clientKey:ie,box:be,...J.key!==void 0&&{key:J.key}});Ze(ue,{...ve})}catch(ve){nr(ue,\"ui_prompt_edit\",ve)}})}else if(A.request.subtype===\"ui_select\"){let j=UEn().safeParse(A.request);if(!j.success){We(A,'ui_select: plugin must be a string, handle an integer, value a string of at most 16384 characters, key (when given) a string, component (when given) a render site name, instance_id (when given) a string and surface (when given) \"desktop\", \"mobile\" or \"vscode\"');continue}let ue=A,J=j.data;Cr(async()=>{try{let ie=await h5e.select({plugin:J.plugin,handle:J.handle,surface:J.surface,value:J.value,...J.key!==void 0&&{element:J.key},...J.component!==void 0&&{component:J.component},...J.instance_id!==void 0&&{requestId:J.instance_id}});Ze(ue,ie===void 0?{handled:!1}:{handled:!0,element:ie.element,value:ie.value})}catch(ie){nr(ue,\"ui_select\",ie)}})}else if(A.request.subtype===\"ui_panes\"){if(!BEn().safeParse(A.request).success){We(A,\"ui_panes: client_id (when given) 1-64 safe characters\");continue}try{Ze(A,rk(vd(li().getState())))}catch(ue){nr(A,\"ui_panes\",ue)}}else if(A.request.subtype===\"ui_pane_show\"){let j=jEn().safeParse(A.request);if(!j.success){We(A,\"ui_pane_show: id must be 1-64 of letters, digits, _ or -\");continue}try{let ue=li().getState().focusedId;if(L3n(j.data.id),li().getState().focusedId!==ue)WS(j.data.client_id??mtt(j.data.surface));Ze(A,{shown_id:li().getState().shownId})}catch(ue){nr(A,\"ui_pane_show\",ue)}}else if(A.request.subtype===\"ui_pane_focus\"){let j=WEn().safeParse(A.request);if(!j.success){We(A,'ui_pane_focus: id must be null or 1-64 of letters, digits, _ or -, surface (when given) \"desktop\", \"mobile\" or \"vscode\"');continue}let ue=j.data;try{Dq(ue.id),WS(ue.client_id??mtt(ue.surface)),Ze(A,{focused_id:li().getState().focusedId})}catch(J){nr(A,\"ui_pane_focus\",J)}}else if(A.request.subtype===\"ui_close\"){let j=GEn().safeParse(A.request);if(!j.success){We(A,\"ui_close: id must be 1-64 of letters, digits, _ or -\");continue}let ue=A,J=j.data.id,ie=()=>Sde(li().getState()).some((be)=>be.id===J);if(!ie()){Ze(ue,{closed:!0});continue}Cr(async()=>{try{await m9e(J,{kind:\"person\"}),Ze(ue,{closed:!ie()})}catch(be){nr(ue,\"ui_close\",be)}})}else if(A.request.subtype===\"ui_scroll\"){let j=zEn().safeParse(A.request);if(!j.success){We(A,'ui_scroll: component must be \"Pane\" or \"AbovePrompt\", instance_id a string of at most 256 characters, offset, body_rows and content_rows non-negative integers, by an integer, pointer (when given) integer column and row, keyed (when given) at most 512 of {plugin, key, top, bottom}, surface (when given) \"desktop\", \"mobile\" or \"vscode\"');continue}let ue=A,J=j.data;Cr(async()=>{try{let ie=await WC({clientId:J.client_id??mtt(J.surface),component:J.component,requestId:J.instance_id,offset:J.offset,by:J.by,bodyRows:J.body_rows,contentRows:J.content_rows,...J.pointer!==void 0&&{pointer:J.pointer},...J.keyed!==void 0&&{keyed:J.keyed}});Ze(ue,{moved:ie.result.deny===void 0,offset:ie.offset,...ie.result.deny!==void 0&&{deny:ie.result.deny},...ie.isFollowingEnd&&{follow_end:!0}})}catch(ie){nr(ue,\"ui_scroll\",ie)}})}else if(A.request.subtype===\"ui_focus\"){let j=VEn().safeParse(A.request);if(!j.success){We(A,'ui_focus: component must be \"Pane\" or \"AbovePrompt\", instance_id a string of at most 256 characters, is_held a boolean, element (when given) null or {plugin, key} of at most 256 characters each, by (when given) \"person\" or \"auto\", surface (when given) \"desktop\", \"mobile\" or \"vscode\"');continue}let ue=A,J=j.data;Cr(async()=>{try{let ie=await pC({clientId:J.client_id??mtt(J.surface),component:J.component,requestId:J.instance_id,isHeld:J.is_held,...J.element!==void 0&&{element:J.element},by:J.by});Ze(ue,{moved:ie.result.deny===void 0,element:ie.element,...ie.result.deny!==void 0&&{deny:ie.result.deny}})}catch(ie){nr(ue,\"ui_focus\",ie)}})}else if(A.request.subtype===\"ui_client_module\"){let j=LEn().safeParse(A.request);if(!j.success){We(A,\"ui_client_module: plugin must be a string\");continue}try{let ue=h5e.clientModule(j.data.plugin);if(ue===void 0)We(A,`ui_client_module: plugin ${Kt(j.data.plugin)} is not loaded or its hooks module names no surface module`);else Ze(A,ue)}catch(ue){nr(A,\"ui_client_module\",ue)}}else if(A.request.subtype===\"ui_client_press\"){let j=NEn().safeParse(A.request);if(!j.success){We(A,'ui_client_press: plugin, instance_id, client, module and element must be strings, component a render site name, and event {type: \"press\"} | {type: \"input\", kind, value} | {type: \"select\", value}');continue}let ue=A,J=j.data;Cr(async()=>{try{let ie=await h5e.clientPress({plugin:J.plugin,component:J.component,requestId:J.instance_id,key:J.client,module:J.module,element:J.element,event:J.event});Ze(ue,ie===void 0?{handled:!1}:{handled:!0,...ie.reached!==void 0&&{reached:ie.reached}})}catch(ie){nr(ue,\"ui_client_press\",ie)}})}else if(A.request.subtype===\"ui_message\"){let j=FEn().safeParse(A.request);if(!j.success){We(A,\"ui_message: plugin, instance_id, client and module must be strings, component a render site name, and data present (plain JSON)\");continue}let ue=A,J=j.data;Cr(async()=>{try{let ie=await h5e.clientMessage({plugin:J.plugin,component:J.component,requestId:J.instance_id,key:J.client,module:J.module,data:J.data});Ze(ue,ie===void 0?{handled:!1}:{handled:!0,...ie.props!==void 0&&{props:ie.props}})}catch(ie){nr(ue,\"ui_message\",ie)}})}}return true})()}");
return {mo,async dispatch(A,Cr){if(typeof Cr!=="function")throw Error("Missing actual per-request Cr");if(!["ui_attach","ui_detach","ui_render","ui_press","ui_input","ui_prompt_edit","ui_select","ui_panes","ui_pane_show","ui_pane_focus","ui_close","ui_scroll","ui_focus","ui_client_module","ui_client_press","ui_message"].includes(A.request.subtype))return false;return execute(scope,A,Cr)}};
}

// Expose the original Pf/Uu of the one print subscription install.
export function createPrintPublicSubscriptions287(p){
const {I,r,qz,Wi,h5e,Gin,fi,wC,_C,rk,IZo,R4r,x4r,P4r,I4r,P6n,LEt,Xy,Q,v,EIr}=p;
let ya=true,Uu=0;
function ta(){return ya&&I.outputFormat==="stream-json"&&LEt()}
const Pf=(b)=>{if(!ta())return;Uu++,Wi({type:"system",subtype:"ui_panes",...rk(b)})};
const Xw=I.outputFormat==="stream-json"&&!(r instanceof qz)?IZo({copy:async(b)=>(await r.sendUiHostRequest({subtype:"ui_copy",surface:b.surface,client_id:b.clientId,plugin:b.plugin,text:b.text},R4r(),P6n))?.copied,readPrompt:(b)=>r.sendUiHostRequest({subtype:"ui_prompt_read",surface:b.surface,client_id:b.clientId},x4r(),P6n),fillPrompt:async(b)=>(await r.sendUiHostRequest({subtype:"ui_prompt_fill",surface:b.surface,client_id:b.clientId,text:b.text,mode:b.mode,...b.decorations!==void 0&&b.decorations.length>0&&{decorations:[...b.decorations]}},P4r(),P6n))?.filled,suggestPrompt:async(b)=>(await r.sendUiHostRequest({subtype:"ui_prompt_suggest",surface:b.surface,client_id:b.clientId,text:b.text},I4r(),P6n))?.shown}):()=>{};
const wb=h5e.onInvalidate((b)=>{if(!ta())return;Wi({type:"system",subtype:"ui_invalidate",event:"ui.render",...b!==void 0&&{instances:b.map((D)=>({surface:D.surface,component:D.component,instance_id:D.requestId}))}})});
const bb=I.outputFormat==="stream-json"?Gin((b)=>{if(!ta())return;Wi({type:"system",subtype:"ui_log",plugin:b.plugin,text:b.text})}):()=>{};
const Pb=wC((b)=>{_C(b),Pf(b)});
const Rb=fi.scroll.subscribe((b)=>{if(!ta())return;Wi({type:"system",subtype:"ui_scroll",client_id:b.clientId,component:b.component,instance_id:b.requestId,offset:b.offset,...b.isFollowingEnd&&{follow_end:!0}})});
const Tb=fi.focus.subscribe((b)=>{if(!ta())return;Wi({type:"system",subtype:"ui_focus",client_id:b.clientId,component:b.component,instance_id:b.requestId,plugin:b.plugin,key:b.element})});
const Mb=r.isRemoteTransport()?Xy({messageQueue:Q,getTasks:()=>v().tasks,publish:(b)=>r.sessionState.notifyInternalMetadataChanged({finished_background_tasks_pending_notification:b})}):()=>{};
return {get live(){return ya},set live(value){ya=value},source:{wb,Pb,Rb,Tb,bb,Xw,Mb},closeUi(){ya=false;wb();Pb();Rb();Tb();bb();},closeComposer(){EIr();Xw();},closeTaskMetadata:Mb,active:ta,panesRevision:()=>Uu,publishPanes:Pf};
}
