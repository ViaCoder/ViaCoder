// Generated complete raw M0n/OT/E8 closure. Primitive and existing business owners are bound in claudemd.ts; see the bounded production report for unresolved hook/helper contracts.
export function createMemoryLoader287(ports){
function module0(imports){
const tt=imports["tt"];
const w$=imports["w$"];
function Ln(t){return/^[\\/]{2}/.test(t)||CD(t)};
function uC(t){return/^[\\/]{2}[?.][\\/]/.test(t)};
function jS(t){if(!/\/\.(?:vol|file|nofollow|resolve)(?:\/|$)/i.test(t))return!1;if(!t.startsWith("/"))return!1;let e=[];for(let n of t.split("/")){if(n===""||n===".")continue;if(n===".."){e.pop();continue}if(e.push(n),e.length===1&&/^\.(?:vol|file|nofollow|resolve)$/i.test(n))return!0}return!1};
function Rir(t){return/^[\\/](GLOBAL\?\?|GLOBALROOT|DosDevices|Device)[\\/]/i.test(t)};
function C(t){return t.length===2&&_R(t[0])==="net"||t.length===3&&_R(t[0])==="network"&&_R(t[1])==="servers"};
function _R(t){return t.replace(/[\u200c-\u200f\u202a-\u202e\u206a-\u206f\ufeff]/g,"").toUpperCase().toLowerCase()};
function rB(t){if(!t.startsWith("/"))return!1;t=E$(t);let e=t.split("/").filter((r)=>r!==""&&r!==".");if(e.length<1||e.length>3||e.includes(".."))return!1;if(C(e)&&(e.length===2||!0))return!0;let n=e[0].toLowerCase();return e.length<=2&&(n==="net"||(n==="network"||n==="home"&&e.length===1))};
function da(t){return UEe(t)!==null};
var Bt=1024;
var Gt=4096;
var I=new Map;
function UEe(t){if(!t.startsWith("/"))return null;if(t.length>Gt)return Lt(t);let e=I.get(t);if(e===void 0){if(e=Lt(t),I.size>=Bt)I.clear();I.set(t,e)}return e};
function Lt(t){let e=[];for(let n of t.split("/")){if(n===""||n===".")continue;if(n===".."){e.pop();continue}if(e.push(n),C(e))return"/"+e.join("/")}return null};
function O_(t){if(!t.startsWith("/"))return!1;let e=[];for(let n of t.split("/")){if(n===""||n===".")continue;if(n===".."){e.pop();continue}e.push(n)}return e.length===1&&e[0].toLowerCase()==="net"};
function MY(t){return mKt(t)||w$(t)};
function mKt(t){return Cs(t)||da(t)||O_(t)||uC(t)||CD(t)||Rir(t)||jS(t)};
function Rl(t){let e=/^[\\/]{2}wsl(?:\$|\.localhost)[\\/]([^\\/]*)/i.exec(t);return e!==null&&!/^\.{0,2}[. ]*$/.test(e[1]??"")};
function Cs(t){return Ln(t)&&!Rl(t)};
var vn=["usr/local","usr/libexec/cups","usr/share/snmp","AppleInternal","Applications","Library","Users","Volumes","cores","home","media","mnt","opt","pkg","private","sw"];
function E$(t){let e=t.split("/");if(e.length<5||e[0]!==""||N(e[1]??"")!=="system"||N(e[2]??"")!=="volumes"||N(e[3]??"")!=="data")return t;let n=e.slice(4);for(let r of vn){let o=r.split("/");if(n.length<o.length)continue;if(o.every((i,s)=>N(n[s]??"")===N(i)))return"/"+n.join("/")}return t};
function N(t){return t.toUpperCase().toLowerCase()};
function CD(t){return Ft.test(t)||t.includes("??")&&Ft.test(Xt(t))};
var Ft=/^[\\/]\?\?[\\/]/;
function Xt(t){return tt.win32?tt.win32.normalize(t):t};
return {Ln,uC,jS,Rir,C,_R,rB,da,Bt,Gt,I,UEe,Lt,O_,MY,mKt,Rl,Cs,vn,E$,N,CD,Ft,Xt};
}
function module1(imports){

function pI(e){return/(?:^|[\\/])\.\.(?:[\\/]|$)/.test(e)};
return {pI};
}
function module2(imports){
const Xe=imports["Xe"];
const Ln=imports["Ln"];
const O=imports["O"];
const jx=imports["jx"];
const qe=imports["qe"];
const pI=imports["pI"];
function Zr(e){return e.toLowerCase().replace(/\u0131/g,"i").replace(/\u017f/g,"s")};
function kxe(e,n){if(O()==="windows"){let r=jx(e),s=jx(n);return qe.relative(r,s)}return qe.relative(e,n)};
function ep(e,n,{caseFold:r,skipPrivateAlias:s=!1,uncShapeParity:g=!1}={caseFold:!0}){let h=Xe(e),w=Xe(n);if(g&&(Ln(h)!==Ln(w)||Ln(e)!==Ln(n)))return!1;let b=r?/^\/private\/var\//i:/^\/private\/var\//,R=r?/^\/private\/tmp(\/|$)/i:/^\/private\/tmp(\/|$)/,M=(j)=>s?j:j.replace(b,"/var/").replace(R,"/tmp$1"),x=M(h),I=M(w),A=r?kxe(Zr(I),Zr(x)):kxe(I,x);if(A==="")return!0;if(pI(A))return!1;return!qe.isAbsolute(A)};
return {Zr,kxe,ep};
}
function module3(imports){

function E(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return};
return {E};
}
function module4(imports){

var q9r="<policyHelper>";
return {q9r};
}
function module5(imports){

function r(e,n,a){return a===void 0?e:{...e,[n]:a}};
function f(e,n,a,t){let o=r({namespace:"transcript",projectKey:e,sessionId:n},"agentId",a);return r(o,"agentRelPath",t)};
function h(e,n,a){let c=r({namespace:"log",sessionId:e,channel:n},"agentId",a?.agentId);return r(c,"runId",a?.runId)};
var De={transcript:f,journal:(e,n,a)=>({namespace:"transcript",projectKey:e,sessionId:n,agentRelPath:a,journal:!0}),sessionJournal:(e,n,a)=>({namespace:"transcript",projectKey:e,sessionId:n,sessionJournal:a}),history:()=>({namespace:"history"}),log:h,globalConfig:()=>({namespace:"globalConfig"}),globalConfigCopy:(e,n)=>({namespace:"globalConfig",kind:e,stamp:n}),userSettings:()=>({namespace:"settings",layer:"user"}),projectSettings:(e)=>({namespace:"settings",layer:"project",projectKey:e}),localSettings:(e)=>({namespace:"settings",layer:"local",consentRootKey:e}),task:(e,n)=>({namespace:"task",listId:e,taskId:n}),taskListMeta:(e)=>({namespace:"task",listId:e,meta:!0}),taskListHighWaterMark:(e)=>({namespace:"task",listId:e,highWaterMark:!0}),memory:(e,n)=>({namespace:"memory",projectKey:e,relPath:n}),pluginRegistry:(e)=>({namespace:"pluginRegistry",file:e}),marketplaceCache:(e,n)=>({namespace:"marketplaceCache",marketplace:e,form:n}),marketplaceTree:(e,n)=>({namespace:"marketplaceCache",marketplace:e,relPath:n}),pluginCache:(e,n,a,t)=>({namespace:"pluginCache",marketplace:e,plugin:n,version:a,relPath:t}),cache:(e,n)=>({namespace:"cache",store:e,id:n}),paste:(e)=>({namespace:"paste",id:e}),state:(e)=>({namespace:"state",id:e}),pluginAssetCache:(e)=>({namespace:"pluginAssetCache",digest:e}),plan:(e)=>({namespace:"plan",name:e}),daemon:(e)=>({namespace:"daemon",relPath:e}),feedbackDraft:(e)=>({namespace:"feedbackDraft",draftId:e}),agentMemory:(e,n)=>({namespace:"agentMemory",layer:"user",agentType:e,relPath:n}),identity:()=>({namespace:"identity"}),team:(e)=>({namespace:"team",team:e}),sidecar:(e,n,a)=>({namespace:"sidecar",projectKey:e,sessionId:n,relPath:a}),mailbox:(e,n)=>({namespace:"mailbox",team:e,teammate:n}),scratch:(e,n)=>({namespace:"scratch",sessionId:e,relPath:n}),userConfigDir:(e,n)=>({namespace:"userConfigDir",dir:e,relPath:n}),fileHistory:(e,n)=>({namespace:"fileHistory",sessionId:e,backupFileName:n}),job:(e,n)=>({namespace:"job",jobId:e,relPath:n}),jobTimeline:(e)=>({namespace:"jobTimeline",jobId:e}),recording:(e,n,a)=>({namespace:"recording",projectKey:e,sessionId:n,stamp:a}),sessionLog:(e,n,a)=>({namespace:"sessionLog",projectKey:e,year:n.year,month:n.month,day:n.day,logName:a}),jobPins:()=>({namespace:"jobsRoot",file:"pins"}),jobDraft:(e)=>({namespace:"jobsRoot",draftKey:e}),session:(e)=>({namespace:"session",file:e}),bridgePointer:(e)=>({namespace:"bridgePointer",projectKey:e}),sessionAliases:(e)=>({namespace:"sessionAliases",projectKey:e}),dirSyncRecord:(e,n)=>({namespace:"dirSyncRecord",projectKey:e,sessionId:n})};
return {r,f,h,De};
}
function module6(imports){

function Le(e){if(!e)return!1;if(typeof e==="boolean")return e;let n=String(e).toLowerCase().trim();return["1","true","yes","on"].includes(n)};
return {Le};
}
function module7(imports){
const k=imports["k"];
const GZn=imports["GZn"];
function E8(){if(k("tengu_moth_copse",!1))return!0;return GZn()};
return {E8};
}
function module8(imports){

function G(n,e){let r=0;for(let t of n)r+=+!!e(t);return r};
return {G};
}
function module9(imports){
const Ft=imports["Ft"];
const aat=imports["aat"];
const ne=imports["ne"];
const ci=imports["ci"];
const hat=imports["hat"];
const gT=imports["gT"];
const pZ=imports["pZ"];
const j_t=imports["j_t"];
const tr=imports["tr"];
const we=imports["we"];
const AIe=imports["AIe"];
const O3t=imports["O3t"];
const uie=imports["uie"];
const Ee=imports["Ee"];
const lr=imports["lr"];
const bs=imports["bs"];
const ap=imports["ap"];
const ep=imports["ep"];
const d0n=imports["d0n"];
const kw=imports["kw"];
const _p=imports["_p"];
const ae=imports["ae"];
const AF=imports["AF"];
const c0n=imports["c0n"];
const Ln=imports["Ln"];
const MY=imports["MY"];
const rB=imports["rB"];
const Sf=imports["Sf"];
const E=imports["E"];
const yEe=imports["yEe"];
const bEe=imports["bEe"];
const iat=imports["iat"];
const g7=imports["g7"];
const lCn=imports["lCn"];
const q9r=imports["q9r"];
const ge=imports["ge"];
const $Ne=imports["$Ne"];
const De=imports["De"];
const PR=imports["PR"];
const bo=imports["bo"];
const w$=imports["w$"];
const TJ=imports["TJ"];
const Le=imports["Le"];
const a=imports["a"];
const xu=imports["xu"];
const qd=imports["qd"];
const a3=imports["a3"];
const VH=imports["VH"];
const Goe=imports["Goe"];
const Xs=imports["Xs"];
const oat=imports["oat"];
const mat=imports["mat"];
const _0n=imports["_0n"];
const E8=imports["E8"];
const Qit=imports["Qit"];
const G=imports["G"];
const k=imports["k"];
const i=imports["i"];
const I0n=imports["I0n"];
const yGn=imports["yGn"];
const Wan=imports["Wan"];
function OT(e){if(tr(e))return!0;let n=O3t();return n!==null&&n.sparesInstructionFiles&&uie().includes(e)};
var cat="<managed-settings>";
function IKe(e){return e===q9r||e===cat};
function k0n(){return process.env.CLAUDE_COWORK_MEMORY_INDEX_CONTENT};
function MF(e,n){if(!n.isSymlink||n.isCanonical)return!1;return!(n.resolvedPath===e&&w$(e))};
function vEe(e,n=hat()){let r=new Map;for(let h of e)r.set(h.path,h);let s=new Map,g=[];for(let h of e){let b=[],w=new Set,D=h,j=!1;while(D){let z=s.get(D.path);if(z!==void 0){j=z;break}if(w.has(D.path)||n(D.path,D.type)){j=!0;break}w.add(D.path),b.push(D.path),D=D.parent===void 0?void 0:r.get(D.parent)}for(let z of b)s.set(z,j);if(!j)g.push(h)}return g};
function kat(){return Le(a.CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD)?xu():[]};
function Elt(e){let n=lr(e),r=bs(e);return n!==null&&r!==null&&ap(n)!==ap(r)&&ep(n,r)?{worktreeRoot:n,mainRepoRoot:r}:null};
function vlt(e,n){return n!==null&&ep(e,n.mainRepoRoot)&&!ep(e,n.worktreeRoot)};
async function x0n(e){let n=_p(e,"AGENTS.md");if(PR(n))return!1;try{let r=ae(),s=bo(r,n);if(PR(s.resolvedPath)||MF(n,s))return!1;let g=await r.lstat(n);return g.isFile()||g.isSymbolicLink()}catch{return!1}};
function A0n(e,n){let r=new Set;for(let{base:s,path:g}of n){if(rB(s))continue;let h=yEe(s,g),b=h.split(bEe);if(AF(h)||b.some((D)=>D===".."||D===""||D==="."))continue;let w=s;for(let[D,j]of b.entries()){w=_p(w,j);let z=P0n(e,w);if(z==="absent"){r.add(g);break}if(D<b.length-1&&z!=="directory")break}}return r};
function hEe(e,n){if(!AF(n)||n!==c0n(n)||sat(n))return!1;if(Sf(e,n,{unreadableAncestry:"unverified",surfaceNetworkRaw:!0})!==void 0)return!1;let r=n;try{r=e.realpathSync(n)}catch(s){let g=E(s);if(g!=="ENOENT"&&g!=="ENOTDIR")return!1}return!sat(r)};
function sat(e){let n=_p(e,"CLAUDE.md");return Ln(e)||MY(e)||Ln(n)||MY(n)||rB(e)};
function P0n(e,n){if(Ln(n)||MY(n))return"other";try{let r=e.lstatSync(n);return r.isDirectory()&&!r.isSymbolicLink()?"directory":"other"}catch(r){let s=E(r);return s==="ENOENT"||s==="ENOTDIR"?"absent":"other"}};
async function M0n(e,n,r,s,g,h){if(Ft()){if(!s)aat(r,[]);return[]}let b=Date.now();if(!s)n.walkEpoch++;let w=n.walkEpoch,D=()=>n.walkEpoch!==w;ne("info","memory_files_started");let j=[],z=new Set,K=ci(),he=s||K.hasClaudeMdExternalIncludesApproved||!1,_e=hat(),ke=gT(),be=pZ("Managed"),ve=j_t(),Te=tr("userSettings"),xe=we(),Pe=pZ("User"),$e=AIe(),Ne=OT("projectSettings"),We=OT("localSettings"),qe=Ne||We?Ee():void 0,Qe=qe===void 0?null:Elt(qe),Ze=[];for(let xn=qe;xn!==void 0&&xn!==d0n(xn).root;xn=kw(xn))Ze.unshift(xn);let et=Ze.map((xn)=>{let Jn=vlt(xn,Qe),wn=Ne&&!Jn,eo=_p(xn,"CLAUDE.local.md");return{dir:xn,project:wn,projectFiles:wn?[_p(xn,"CLAUDE.md"),_p(xn,".claude","CLAUDE.md")].filter((to)=>!_e(to,"Project")):[],rulesDir:wn?_p(xn,".claude","rules"):void 0,localFile:We&&!_e(eo,"Local")?eo:void 0}}),bt=ae(),ht=hEe(bt,ke),kt=Te&&g===void 0&&hEe(bt,xe),$t=et.findLast(({projectFiles:xn,rulesDir:Jn,localFile:wn})=>xn.length>0||Jn!==void 0||wn!==void 0)?.dir,It=g===void 0&&$t!==void 0&&hEe(bt,$t),jt=A0n(bt,[...ht?[{base:ke,path:be},{base:ke,path:ve}]:[],...kt?[..._e(Pe,"User")?[]:[{base:xe,path:Pe}],{base:xe,path:$e}]:[],...It?et.flatMap(({dir:xn,projectFiles:Jn,rulesDir:wn,localFile:eo})=>[...Jn,wn,eo].filter((to)=>to!==void 0).map((to)=>({base:xn,path:to}))):[]]),Xt=async(xn,Jn)=>jt.has(xn)?iat(xn,Jn,z,_e):g7(xn,Jn,z,he,0,void 0,void 0,_e);j.push(...await Xt(be,"Managed"));let un=lCn();if(un)j.push({path:q9r,type:"Managed",content:un,globs:[],contentDiffersFromDisk:!0,rawContent:un});let rn=ge("policySettings")?.claudeMd;if(rn)j.push({path:cat,type:"Managed",content:rn,globs:[],contentDiffersFromDisk:!0,rawContent:rn});if(!jt.has(ve))j.push(...await $Ne({rulesDir:ve,type:"Managed",processedPaths:z,includeExternal:he,conditionalRule:!1,storageV5:g,excludeMatcher:_e}));if(Te){if(j.push(...jt.has(Pe)?iat(Pe,"User",z,_e):await g7(Pe,"User",z,!0,0,void 0,g!==void 0?{backend:g,key:De.state("user-memory")}:void 0,_e)),!jt.has($e))j.push(...await $Ne({rulesDir:$e,type:"User",processedPaths:z,includeExternal:!0,conditionalRule:!1,storageV5:g,excludeMatcher:_e}))}let Yt=Ne&&It,Qt=[];for(let{dir:xn,project:Jn,projectFiles:wn,rulesDir:eo,localFile:to}of et){if(Jn&&Yt&&!n.hasLoggedInitialLoad)Qt.push(x0n(xn));for(let ao of wn)j.push(...await Xt(ao,"Project"));if(eo!==void 0&&!jt.has(eo))j.push(...await $Ne({rulesDir:eo,type:"Project",processedPaths:z,includeExternal:he,conditionalRule:!1,storageV5:g,excludeMatcher:_e}));if(to!==void 0)j.push(...await Xt(to,"Local"))}let nn=TJ.peek(e)?.read;if(nn)j.push(...vEe(await nn(),_e));for(let xn of kat()){let Jn=_p(xn,"CLAUDE.md");j.push(...await g7(Jn,"Project",z,he,0,void 0,void 0,_e));let wn=_p(xn,".claude","CLAUDE.md");j.push(...await g7(wn,"Project",z,he,0,void 0,void 0,_e));let eo=_p(xn,".claude","rules");if(j.push(...await $Ne({rulesDir:eo,type:"Project",processedPaths:z,includeExternal:he,conditionalRule:!1,storageV5:g,excludeMatcher:_e})),OT("localSettings")){let to=_p(xn,"CLAUDE.local.md");j.push(...await g7(to,"Local",z,he,0,void 0,void 0,_e))}}if(qd()&&!a3()){await VH().warmCanonicalWcRoot();let xn=a3(),Jn=k0n();if(!xn&&Jn!==""){let wn=Goe(),eo=Xs(),to=Jn===void 0&&oat(wn),ao=async($o)=>$o?(await mat(wn,"AutoMem")).info:null,mo=Jn!==void 0?_0n(Jn):await ao(to);if(mo===null&&Jn===void 0&&!s&&!E8()&&!a.CLAUDE_CODE_REMOTE&&to&&await Qit(e.host,eo))mo=await ao(oat(wn));if(mo){let $o=ap(mo.path);if(!z.has($o))z.add($o),j.push(mo)}}}let Pn=Date.now()-b,$n=await Promise.all(Qt),qn=D();if(!s&&!qn)aat(r,j);let En=j.reduce((xn,Jn)=>xn+Jn.content.length,0);ne("info","memory_files_completed",{duration_ms:Pn,file_count:j.length,total_content_length:En});let zn={};for(let xn of j)zn[xn.type]=(zn[xn.type]??0)+1;if(!s&&!n.hasLoggedInitialLoad&&!qn){n.hasLoggedInitialLoad=!0;let xn=Yt?G($n,Boolean):void 0,Jn=O0n(j);i("tengu_claudemd__initial_load",{file_count:j.length,total_content_length:En,instructions_content_length:Jn.totalChars,max_file_content_length:Jn.largestChars,user_count:zn.User??0,project_count:zn.Project??0,local_count:zn.Local??0,managed_count:zn.Managed??0,automem_count:zn.AutoMem??0,agents_md_count:xn,duration_ms:Pn})}if(!s&&!qn){let xn=I0n(n);if(xn!==void 0&&yGn())for(let Jn of j){if(!TEe(Jn.type))continue;if(IKe(Jn.path))continue;let wn=Jn.parent?"include":xn;Wan(e,Jn.path,Jn.type,wn,{globs:Jn.globs,parentFilePath:Jn.parent,storageV5:g,credentials:h})}}return j};
function TEe(e){return e==="User"||e==="Project"||e==="Local"||e==="Managed"};
function vat(e){return xJ(e).filter((n)=>!IKe(n.path)&&TEe(n.type))};
function Tat(e){let n=0,r=0;for(let s of e)n+=s.content.length,r=Math.max(r,s.content.length);return{fileCount:e.length,totalChars:n,largestChars:r}};
function O0n(e){return Tat(vat(e))};
function xJ(e,n){return e.filter((r)=>(!n||n(r.type))&&L0n(r))};
function L0n(e){if((e.type==="Project"||e.type==="Local")&&k("tengu_paper_halyard",!1))return!1;return Boolean(e.content)};
return {OT,cat,IKe,k0n,MF,vEe,kat,Elt,vlt,x0n,A0n,hEe,sat,P0n,M0n,TEe,vat,Tat,O0n,xJ,L0n};
}
const m0=module0({"tt":ports["path"],"w$":ports["networkVolume"]});
const m1=module1({});
const m2=module2({"Xe":ports["expand"],"Ln":m0["Ln"],"O":ports["platform"],"jx":ports["windowsToPosix"],"qe":ports["path"]["posix"],"pI":m1["pI"]});
const m3=module3({});
const m4=module4({});
const m5=module5({});
const m6=module6({});
const m7=module7({"k":ports["feature"],"GZn":ports["hasMemoryStores"]});
const m8=module8({});
const m9=module9({"Ft":ports["remoteWorkspace"],"aat":ports["track"],"ne":ports["diagnostic"],"ci":ports["projectConfig"],"hat":ports["excludeMatcher"],"gT":ports["managedHome"],"pZ":ports["memoryPath"],"j_t":ports["managedRules"],"tr":ports["settingEnabled"],"we":ports["configHome"],"AIe":ports["userRules"],"O3t":ports["restriction"],"uie":ports["allowedSources"],"Ee":ports["originalCwd"],"lr":ports["gitRoot"],"bs":ports["canonicalGitRoot"],"ap":ports["normalize"],"ep":m2["ep"],"d0n":ports["path"]["parse"],"kw":ports["path"]["dirname"],"_p":ports["path"]["join"],"ae":ports["filesystem"],"AF":ports["path"]["isAbsolute"],"c0n":ports["path"]["resolve"],"Ln":m0["Ln"],"MY":m0["MY"],"rB":m0["rB"],"Sf":ports["ancestry"],"E":m3["E"],"yEe":ports["path"]["relative"],"bEe":ports["path"]["sep"],"iat":ports["skipped"],"g7":ports["processFile"],"lCn":ports["helperInstructions"],"q9r":m4["q9r"],"ge":ports["settingsForSource"],"$Ne":ports["rules"],"De":m5["De"],"PR":ports["network"],"bo":ports["resolve"],"w$":ports["networkVolume"],"TJ":ports["additionalRegistry"],"Le":m6["Le"],"a":ports["env"],"xu":ports["additionalDirectories"],"qd":ports["memoryEnabled"],"a3":ports["memoryBlocked"],"VH":ports["directoryOwner"],"Goe":ports["indexPath"],"Xs":ports["requiredDirectory"],"oat":ports["readAllowed"],"mat":ports["read"],"_0n":ports["indexOverride"],"E8":m7["E8"],"Qit":ports["backfill"],"G":m8["G"],"k":ports["feature"],"i":ports["event"],"I0n":ports["consumeHook"],"yGn":ports["hasInstructionsHook"],"Wan":ports["instructionsHook"]});
return {"load":m9.M0n,"instructionsEnabled":m9.OT,"indexSuppressed":m7.E8};
}
