// Generated complete original rules traversal, link boundary and injected-client stat closure.
export function createMemoryRules287(ports){
function module0(imports){
const tt=imports["tt"];
function Ln(t){return/^[\\/]{2}/.test(t)||CD(t)};
function CD(t){return Ft.test(t)||t.includes("??")&&Ft.test(Xt(t))};
var Ft=/^[\\/]\?\?[\\/]/;
function Xt(t){return tt.win32?tt.win32.normalize(t):t};
return {Ln,CD,Ft,Xt};
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

var up={home:(e)=>({space:"home",path:e}),workspace:(e)=>({space:"workspace",path:e}),system:(e)=>({space:"system",path:e}),userNamed:(e)=>({space:"userNamed",path:e})};
return {up};
}
function module4(imports){

function r(n){return n};
function S(n){return r(n)};
function c(n){return r(n)};
function bn(n){return r(n)};
return {r,S,c,bn};
}
function module5(imports){
const bn=imports["bn"];
const S=imports["S"];
function E(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return};
function tme(n){if(typeof n!=="string")return;return/^[A-Za-z][A-Za-z0-9_-]{0,63}$/.test(n)?bn(n):S("nonconforming")};
function c(n){return n==="UNKNOWN"||n.startsWith("Unknown system error")};
function C$(n){if(typeof n!=="string")return;return/^E[A-Z0-9]+$/.test(n)||c(n)?n:void 0};
return {E,tme,c,C$};
}
function module6(imports){
const O=imports["O"];
const ue=imports["ue"];
const me=imports["me"];
function ap(e){let n=O()==="windows",r=ue(e),o=n?/[\\/]+$/:/\/+$/,f=r.length>me(r).root.length?r.replace(o,""):r;return n?f.replaceAll("/","\\").toLowerCase():f};
return {ap};
}
function module7(imports){

function Le(e){if(!e)return!1;if(typeof e==="boolean")return e;let n=String(e).toLowerCase().trim();return["1","true","yes","on"].includes(n)};
return {Le};
}
function module8(imports){

var l=String.fromCharCode(0);
var p=/^\.[0-9a-f]{16}\.aside$/;
function pqt(e){if(e.charCodeAt(0)!==46)return!1;return FK(e).some((n)=>p.test(n))};
function u(e){return typeof e==="string"&&/^[. ]+$/.test(e)};
function Xn(e){return!(typeof e!=="string"||e.length===0||u(e)||e.includes("/")||e.includes("\\")||e.includes(l)||pqt(e))};
function FK(e){let n=s.get(e);if(n!==void 0)return n;let a=Object.freeze(m(e));if(s.size>=d)s.clear();return s.set(e,a),a};
function m(e){let n=e.toLowerCase(),a=n.indexOf(":");return a===-1?[i(n)]:[i(n),i(n.slice(0,a))]};
var s=new Map;
var d=32768;
function i(e){let n=e.length;while(n>0){let a=e.charCodeAt(n-1);if(a!==46&&a!==32)break;n-=1}return n===e.length?e:e.slice(0,n)};
function r(e,n,a){return a===void 0?e:{...e,[n]:a}};
function f(e,n,a,t){let o=r({namespace:"transcript",projectKey:e,sessionId:n},"agentId",a);return r(o,"agentRelPath",t)};
function h(e,n,a){let c=r({namespace:"log",sessionId:e,channel:n},"agentId",a?.agentId);return r(c,"runId",a?.runId)};
var De={transcript:f,journal:(e,n,a)=>({namespace:"transcript",projectKey:e,sessionId:n,agentRelPath:a,journal:!0}),sessionJournal:(e,n,a)=>({namespace:"transcript",projectKey:e,sessionId:n,sessionJournal:a}),history:()=>({namespace:"history"}),log:h,globalConfig:()=>({namespace:"globalConfig"}),globalConfigCopy:(e,n)=>({namespace:"globalConfig",kind:e,stamp:n}),userSettings:()=>({namespace:"settings",layer:"user"}),projectSettings:(e)=>({namespace:"settings",layer:"project",projectKey:e}),localSettings:(e)=>({namespace:"settings",layer:"local",consentRootKey:e}),task:(e,n)=>({namespace:"task",listId:e,taskId:n}),taskListMeta:(e)=>({namespace:"task",listId:e,meta:!0}),taskListHighWaterMark:(e)=>({namespace:"task",listId:e,highWaterMark:!0}),memory:(e,n)=>({namespace:"memory",projectKey:e,relPath:n}),pluginRegistry:(e)=>({namespace:"pluginRegistry",file:e}),marketplaceCache:(e,n)=>({namespace:"marketplaceCache",marketplace:e,form:n}),marketplaceTree:(e,n)=>({namespace:"marketplaceCache",marketplace:e,relPath:n}),pluginCache:(e,n,a,t)=>({namespace:"pluginCache",marketplace:e,plugin:n,version:a,relPath:t}),cache:(e,n)=>({namespace:"cache",store:e,id:n}),paste:(e)=>({namespace:"paste",id:e}),state:(e)=>({namespace:"state",id:e}),pluginAssetCache:(e)=>({namespace:"pluginAssetCache",digest:e}),plan:(e)=>({namespace:"plan",name:e}),daemon:(e)=>({namespace:"daemon",relPath:e}),feedbackDraft:(e)=>({namespace:"feedbackDraft",draftId:e}),agentMemory:(e,n)=>({namespace:"agentMemory",layer:"user",agentType:e,relPath:n}),identity:()=>({namespace:"identity"}),team:(e)=>({namespace:"team",team:e}),sidecar:(e,n,a)=>({namespace:"sidecar",projectKey:e,sessionId:n,relPath:a}),mailbox:(e,n)=>({namespace:"mailbox",team:e,teammate:n}),scratch:(e,n)=>({namespace:"scratch",sessionId:e,relPath:n}),userConfigDir:(e,n)=>({namespace:"userConfigDir",dir:e,relPath:n}),fileHistory:(e,n)=>({namespace:"fileHistory",sessionId:e,backupFileName:n}),job:(e,n)=>({namespace:"job",jobId:e,relPath:n}),jobTimeline:(e)=>({namespace:"jobTimeline",jobId:e}),recording:(e,n,a)=>({namespace:"recording",projectKey:e,sessionId:n,stamp:a}),sessionLog:(e,n,a)=>({namespace:"sessionLog",projectKey:e,year:n.year,month:n.month,day:n.day,logName:a}),jobPins:()=>({namespace:"jobsRoot",file:"pins"}),jobDraft:(e)=>({namespace:"jobsRoot",draftKey:e}),session:(e)=>({namespace:"session",file:e}),bridgePointer:(e)=>({namespace:"bridgePointer",projectKey:e}),sessionAliases:(e)=>({namespace:"sessionAliases",projectKey:e}),dirSyncRecord:(e,n)=>({namespace:"dirSyncRecord",projectKey:e,sessionId:n})};
return {l,p,pqt,u,Xn,FK,m,s,d,i,r,f,h,De};
}
function module9(imports){
const i=imports["i"];
const c=imports["c"];
const tme=imports["tme"];
function p(e,r,u){i("tengu_feature_sad",{...u,feature_name:c(e),error_code:tme(r)})};
return {p};
}
function module10(imports){
const ae=imports["ae"];
const bo=imports["bo"];
const PR=imports["PR"];
const w$=imports["w$"];
const uA=imports["uA"];
const ep=imports["ep"];
const AIe=imports["AIe"];
const F=imports["F"];
const up=imports["up"];
const C$=imports["C$"];
const t=imports["t"];
const Ee=imports["Ee"];
const ap=imports["ap"];
const Le=imports["Le"];
const a=imports["a"];
const xu=imports["xu"];
const kw=imports["kw"];
const ci=imports["ci"];
const E=imports["E"];
const _p=imports["_p"];
const yat=imports["yat"];
const Xn=imports["Xn"];
const g7=imports["g7"];
const De=imports["De"];
const i=imports["i"];
const we=imports["we"];
const wEe=imports["wEe"];
const p=imports["p"];
function zI(e){return ep(e,Ee())};
function MF(e,n){if(!n.isSymlink||n.isCanonical)return!1;return!(n.resolvedPath===e&&w$(e))};
async function $Ne({rulesDir:e,type:n,processedPaths:r,includeExternal:s,conditionalRule:g,visitedDirs:h=new Set,storageV5:b,v5Descent:w,discoveredDir:D,linkedFrom:j,excludeMatcher:z}){if(h.has(e))return[];try{let K=ae(),he=bo(K,e),{resolvedPath:_e,isSymlink:ke,isCanonical:be}=he;if(PR(_e)||MF(e,he))return[];if(h.add(e),ke)h.add(_e);let ve=s&&(n!=="User"||bat()),Te=n!=="User"&&!ep(D??e,AIe()),xe=!ve||j===void 0&&Te&&be&&ke,Pe=xe&&await rat(K,e,n,b,w)&&!zI(_e),$e=xe&&!Pe&&n==="Project"&&Te&&ke&&!zI(_e)&&C0n(kw(kw(e)))&&await rat(K,kw(e),n,b,void 0);if(!ve&&(Pe||$e&&(g||!ci().hasClaudeMdExternalIncludesApproved)))return[];let Ne=j??(Pe?e:$e?kw(e):void 0),We=be?_e:void 0,qe=!be||ke?void 0:w??(b!==void 0&&n==="User"&&e===AIe()?{backend:b,relPath:[]}:void 0),Qe=[],Ze;try{Ze=await K.readdir(_e)}catch(et){let bt=E(et);if(bt==="ENOENT"||bt==="EACCES"||bt==="ENOTDIR")return[];throw et}for(let et of Ze){let bt=_p(e,et.name),ht=bo(K,bt),{resolvedPath:kt,isSymlink:$t,isCanonical:It}=ht,jt=_p(D??e,et.name);if(jt!==kt&&yat(jt,n,z))continue;if(PR(kt)||MF(bt,ht))continue;let Xt=$t?await R0n(K,kt,n,b):null,un=Xt?Xt.isDirectory():et.isDirectory(),rn=Xt?Xt.isFile():et.isFile(),Yt=qe!==void 0&&!$t&&It&&Xn(et.name)&&kt===_p(AIe(),...qe.relPath,et.name)?[...qe.relPath,et.name]:void 0,Qt=We!==void 0&&kt!==_p(We,et.name)&&!zI(kt),nn=Ne??(Qt&&Te?jt:void 0);if(un){if(Qt&&!ve)continue;Qe.push(...await $Ne({rulesDir:kt,type:n,processedPaths:r,includeExternal:s,conditionalRule:g,visitedDirs:h,storageV5:b,v5Descent:qe&&Yt?{backend:qe.backend,relPath:Yt}:void 0,discoveredDir:jt!==kt?jt:void 0,linkedFrom:nn,excludeMatcher:z}))}else if(rn&&et.name.endsWith(".md")){if(Qt&&!ve)continue;let Pn=await g7(kt,n,r,s,0,void 0,qe&&Yt?{backend:qe.backend,key:De.userConfigDir("rules",Yt)}:void 0,z),[$n]=Pn;if($n&&nn!==void 0)$n.linkedFrom=nn;Qe.push(...Pn.filter((qn)=>g?qn.globs:!qn.globs))}}return Qe}catch(K){if(K instanceof Error&&K.message.includes("EACCES"))i("tengu_claude_rules_md_permission_error",{is_access_error:1,has_home_dir:e.includes(we())?1:0});let he=wEe();if(!he.rulesWalk)he.rulesWalk=!0,p("context_claude_md_load","rules_walk_failed");return[]}};
function C0n(e){if(ep(Ee(),e))return!0;let n=ap(e);return kat().some((r)=>ap(r)===n)};
function kat(){return Le(a.CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD)?xu():[]};
function Sat(e,n){return e==="Managed"?up.system(n):e==="User"?up.home(n):up.workspace(n)};
async function rat(e,n,r,s,g){if(F()&&s!==void 0){let h=r==="User"&&(g!==void 0||n===AIe())?await s.scopeKind({namespace:"userConfigDir",dir:"rules",...g&&{relPath:g.relPath}}).catch(()=>{return}):await s.hostFiles.stat(Sat(r,n),{follow:!1}).catch(()=>{return});if(h?.ok)return h.value.kind==="link";let b=h!==void 0&&h.error.code==="Failed"?h.error.telemetryCode:void 0;if(C$(b)!==void 0||/^ERR_[A-Z0-9_]+$/.test(b??""))return!1;t(`claudemd: the storage backend could not say whether the ${r} rules folder (or its .claude parent) is a symlink (${b??h?.error.code??"no answer"}) \u2014 checking directly`)}try{return(await e.lstat(n)).isSymbolicLink()}catch{return!1}};
async function R0n(e,n,r,s){if(F()&&s!==void 0){let g=await s.hostFiles.stat(Sat(r,n)).catch(()=>{return});if(g?.ok){let{kind:b}=g.value;if(b==="absent")throw Object.assign(Error("ENOENT: rules entry target is gone"),{code:"ENOENT",syscall:"stat",path:n});return{isDirectory:()=>b==="directory",isFile:()=>b==="file"}}let h=g!==void 0&&g.error.code==="Failed"?g.error.telemetryCode:void 0;if(C$(h)!==void 0||/^ERR_[A-Z0-9_]+$/.test(h??""))throw g!==void 0&&g.error.code==="Failed"&&g.error.cause instanceof Error?g.error.cause:Object.assign(Error("rules entry stat failed"),{code:h});t(`claudemd: the storage backend could not type a linked ${r} rules entry (${h??g?.error.code??"no answer"}) \u2014 checking directly`)}return e.stat(n)};
function bat(){return uA()!=="local-agent"};
return {zI,MF,$Ne,C0n,kat,Sat,rat,R0n,bat};
}
const m0=module0({"tt":ports.path});
const m1=module1({});
const m2=module2({"Xe":ports["expand"],"Ln":m0["Ln"],"O":ports["platform"],"jx":ports["windowsToPosix"],"qe":ports.path["posix"],"pI":m1["pI"]});
const m3=module3({});
const m4=module4({});
const m5=module5({"bn":m4["bn"],"S":m4["S"]});
const m6=module6({"O":ports["platform"],"ue":ports.path["normalize"],"me":ports.path["parse"]});
const m7=module7({});
const m8=module8({});
const m9=module9({"i":ports["event"],"c":m4["c"],"tme":m5["tme"]});
const m10=module10({"ae":ports["filesystem"],"bo":ports["resolve"],"PR":ports["network"],"w$":ports["networkVolume"],"uA":ports["entrypoint"],"ep":m2["ep"],"AIe":ports["userRules"],"F":ports["storageEnabled"],"up":m3["up"],"C$":m5["C$"],"t":ports["debug"],"Ee":ports["originalCwd"],"ap":m6["ap"],"Le":m7["Le"],"a":ports["env"],"xu":ports["additionalDirectories"],"kw":ports.path["dirname"],"ci":ports["projectConfig"],"E":m5["E"],"_p":ports.path["join"],"yat":ports["excluded"],"Xn":m8["Xn"],"g7":ports["processFile"],"De":m8["De"],"i":ports["event"],"we":ports["configHome"],"wEe":ports["readState"],"p":m9["p"]});
return {"walk":m10.$Ne,"isLink":m10.rat,"targetStat":m10.R0n};
}
