// Complete original settings context, held snapshot, source reader and admission; existing cache/parser/host ports.
import {join as builtin0} from "node:path";
import {resolve as builtin1} from "node:path";
import {homedir as builtin2} from "node:os";
import {dirname as builtin3} from "node:path";
import {readFile as builtin4} from "node:fs/promises";
import {release as builtin5} from "node:os";
import {normalize as builtin6} from "node:path";
import {parse as builtin7} from "node:path";
import {basename as builtin8} from "node:path";
function module0(imports){

function r(n){return n};
function c(n){return r(n)};
return {r,c};
}
function module1(imports){

var ffe=["projectSettings","localSettings"];
return {ffe};
}
function module2(imports){

var an="NoProjectDirectoryError";
class gR extends Error{name=an;constructor(){super("This session has no working directory.")}};
return {an,gR};
}
function module3(imports){

function E(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return};
function W(n){return E(n)==="ENOENT"};
return {E,W};
}
function module4(imports){
const a=imports["a"];
var p=new Set(["claude-desktop-3p","local-agent"]);
function yOe(){let e=a.CLAUDE_CODE_ENTRYPOINT;return e!==void 0&&p.has(e)};
return {p,yOe};
}
function module5(imports){
const ve=imports["ve"];
const he=imports["he"];
const we=imports["we"];
const gR=imports["gR"];
const va=imports["va"];
const fm=imports["fm"];
const nc=imports["nc"];
const Mn=imports["Mn"];
const t=imports["t"];
const ae=imports["ae"];
const W=imports["W"];
const $s=imports["$s"];
const a=imports["a"];
const gT=imports["gT"];
const I8o=imports["I8o"];
const QF=imports["QF"];
const yOe=imports["yOe"];
const P_=imports["P_"];
const _f=imports["_f"];
const VF=imports["VF"];
const Sz=imports["Sz"];
const arr=imports["arr"];
function v_(){return ve(gT(),"managed-settings.json")};
function EZe(e){let n=e.flagInline;if(!n)return{settings:null,errors:[]};let s=yOe(),r=e.store.inlineFlagParse;if(r?.inline!==n||r.desktopSupplied!==s)r={inline:n,desktopSupplied:s,parsed:P_(n)},e.store.inlineFlagParse=r;let{settings:i,errors:d}=r.parsed;return{settings:i&&_f(i),errors:d.map((c)=>({...c}))}};
function gVt(e,n){switch(e){case"userSettings":return he(we());case"policySettings":return he(_An(n));case"projectSettings":return he(n.projectConfigDir??_An(n));case"localSettings":{if(n.projectConfigDir!==void 0)return he(n.projectConfigDir);return iD(_An(n),n.canonicalGitRoot)}case"flagSettings":return n.flagPath?$s(he(n.flagPath)):he(_An(n))}};
function _An(e){if(e.cwd===null)throw new gR;return e.cwd};
function iD(e,n){let s=Qnr(e,n);if(s.decided!==void 0)return s.decided;if(!Xns(s.root))return s.cwdResolved;return s.root};
function Qnr(e,n){let s=n?.(e);if(!s)return{decided:he(e)};let r=he(s),i=he(e);if(r===i)return{decided:r};let d;try{d=Znr()}catch{return{decided:i}}if(r===d)return{decided:i};return{decided:void 0,root:r,cwdResolved:i}};
function Yns(e){return va().localStoreProbes.canonicalRootOwnerUids(e,I_)};
function I_(e){let n=ae(),s=null;try{s=n.lstatSync(ve(e,".claude")).uid}catch(r){if(!W(r))throw r}return{rootUid:n.statSync(e).uid,gitEntryUid:L_(e),claudeEntryUid:s}};
function L_(e){let n=ae();try{return n.lstatSync(ve(e,".git")).uid}catch(s){throw s}};
function Xns(e){if(typeof process.getuid!=="function"&&typeof process.geteuid!=="function")return t(`localSettings: not canonicalizing the consent store to ${e} \u2014 this platform has no uid semantics to verify directory ownership with, so the store stays at the session cwd (canonicalization is POSIX-only)`,{level:"warn"}),!1;let n=typeof process.geteuid==="function"?process.geteuid():process.getuid?.();try{let{rootUid:s,gitEntryUid:r,claudeEntryUid:i}=Yns(e);if(s===n&&r===n&&(i===null||i===n))return!0;return t(`localSettings: not canonicalizing the consent store to ${e} \u2014 it (uid ${s}), its .git entry (uid ${r}), or its .claude entry (uid ${i??"absent"}) is not owned by the current user (uid ${n}); the store stays at the session cwd (the pre-canonicalization behavior). If you own this repo, chown it (including .git and .claude) or run from a directory you own.`,{level:"warn"}),!1}catch(s){return t(`localSettings: not canonicalizing the consent store to ${e} \u2014 its ownership could not be verified (${s instanceof Error?s.message:String(s)}); the store stays at the session cwd`,{level:"warn"}),!1}};
function Znr(){return va().localStoreProbes.normalizedRealHomeDir(N_)};
function N_(){let e=fm(nc());if(e===null)throw Error("home directory realpath unavailable");return Mn(e)};
var cO={default:"settings.json",cowork:"cowork_settings.json"};
function U_(e){if(e.coworkPlugins||a.CLAUDE_CODE_USE_COWORK_PLUGINS)return cO.cowork;return cO.default};
function NU(e,n){switch(e){case"userSettings":return ve(gVt(e,n),U_(n));case"projectSettings":case"localSettings":{if(n.cwd===null&&n.projectConfigDir===void 0)return;return ve(gVt(e,n),dO(e))}case"policySettings":return v_();case"flagSettings":return n.flagPath}};
function dO(e){switch(e){case"projectSettings":return ve(".claude","settings.json");case"localSettings":return ve(".claude","settings.local.json")}};
function DZ(e){if(e.cwd===null||iD(e.cwd,e.canonicalGitRoot)===he(e.cwd))return;if(e.projectConfigDir!==void 0)return;return ve(he(e.cwd),dO("localSettings"))};
function Xje(e,n){let s=n.store.repoTierFreeze.tier(e);if(s!==void 0)return s.settings;let r=n.store.perSource.get(e);if(r!==void 0)return r;let i=hVt(e,n),d=i&&tn(e,i,n);return n.store.perSource.set(e,d),d};
var hc=["apiKeyHelper","awsAuthRefresh","awsCredentialExport","gcpAuthRefresh"];
var irr=[...hc,"otelHeadersHelper","proxyAuthHelper"];
function tn(e,n,s){let r=irr.some((p)=>n[p]!==void 0);if(!r&&e!=="policySettings")return n;let i=s.credentialHelperKeysFrom(e);if(i==="as_read")return n;let d=e==="policySettings"&&i==="machine_admin"?Z_(s):{};if(!r&&Object.keys(d).length===0)return n;let c={...n};for(let p of irr)delete c[p];return Object.assign(c,d)};
function Z_(e){let n=arr(e),s={};for(let r of irr){let i=n?.[r];if(i!==void 0)s[r]=i}return s};
function hVt(e,n,{includeLegacyLocalSettings:s=!0}={}){if(e==="policySettings")return I8o(n).settings;let r=NU(e,n),{settings:i}=r?QF(r,n.store,e==="flagSettings"?n.flagExpectedContent:void 0):{settings:null};if(e==="flagSettings"){let{settings:d}=EZe(n);if(d)return VF(i||{},d,Sz)}if(e==="localSettings"&&s){let d=DZ(n);if(d){let{settings:c}=QF(d,n.store);if(c)return n.onLegacyLocalSettingsRead?.("per_source"),VF(c,i||{},Sz)}}return i};
function lrr(e,n){let s=n.store.repoTierFreeze.tier(e);if(s!==void 0)return[...s.errors];let r=[],i=NU(e,n);if(i)r.push(...QF(i,n.store,e==="flagSettings"?n.flagExpectedContent:void 0).errors);if(e==="flagSettings")r.push(...EZe(n).errors);if(e==="localSettings"){let d=DZ(n);if(d)r.push(...QF(d,n.store).errors)}return r};
return {v_,EZe,gVt,_An,iD,Qnr,Yns,I_,L_,Xns,Znr,N_,cO,U_,NU,dO,DZ,Xje,hc,irr,tn,Z_,hVt,lrr};
}
function module6(imports){
const d=imports["d"];
const t=imports["t"];
const ae=imports["ae"];
const R=imports["R"];
const H=imports["H"];
function qor(){try{return ae().readFileSync("/proc/version",{encoding:"utf8"}).toLowerCase()}catch{return}};
function Kor(e){return e.includes("microsoft")||e.includes("wsl")};
class S{sources;primedProcVersion;fallbackProcVersion;fallbackProcVersionRead=!1;platform;wslVersion=null;macOSMajorVersion=null;linuxDistroInfo;constructor(e){this.sources=e}kernelString(){if(this.primedProcVersion!==void 0)return this.primedProcVersion;if(!this.fallbackProcVersionRead)this.fallbackProcVersion=this.sources.readProcVersionSync(),this.fallbackProcVersionRead=!0;return this.fallbackProcVersion}getPlatform(){if(this.platform!==void 0)return this.platform;try{if(this.sources.platform==="darwin")this.platform="macos";else if(this.sources.platform==="win32")this.platform="windows";else if(this.sources.platform==="linux")if(this.sources.env.WSL_DISTRO_NAME||this.sources.env.WSL_INTEROP)this.platform="wsl";else{let e=this.kernelString();this.platform=e!==void 0&&Kor(e)?"wsl":"linux"}else this.platform="unknown"}catch(e){d(e),this.platform="unknown"}return this.platform}getWslVersion(){if(this.wslVersion!==null)return this.wslVersion;if(this.sources.platform!=="linux"){this.wslVersion=void 0;return}let e=this.kernelString();if(e===void 0){this.wslVersion=void 0;return}let r=e.match(/wsl(\d+)/);if(r&&r[1])this.wslVersion=r[1];else if(e.includes("microsoft"))this.wslVersion="1";else this.wslVersion=void 0;return this.wslVersion}getMacOSMajorVersion(){if(this.macOSMajorVersion!==null)return this.macOSMajorVersion;if(this.sources.platform!=="darwin"){this.macOSMajorVersion=void 0;return}let e=this.sources.osRelease().match(/^(\d+)\./);return this.macOSMajorVersion=e&&e[1]?parseInt(e[1],10)-9:void 0,this.macOSMajorVersion}getLinuxDistroInfo(){return this.linuxDistroInfo??=this.readLinuxDistroInfo()}async readLinuxDistroInfo(){if(this.sources.platform!=="linux")return;let e={linuxKernel:this.sources.osRelease()};try{let r=await this.sources.readOsRelease();for(let n of r.split(`
`)){let s=n.match(/^(ID|VERSION_ID)=(.*)$/);if(s&&s[1]&&s[2]){let i=s[2].replace(/^"|"$/g,"");if(s[1]==="ID")e.linuxDistroId=i;else e.linuxDistroVersion=i}}}catch{}return e}async prime(){if(this.primedProcVersion!==void 0||this.sources.platform!=="linux")return;try{let e=await this.sources.readProcVersion();this.primedProcVersion=e.toLowerCase()}catch(e){t(`Failed to read /proc/version for WSL detection: ${e}`,{level:"error"});return}this.platform=void 0,this.wslVersion=null}};
var V;
function p(){return V??=new S({platform:"darwin",env:process.env,readProcVersionSync:qor,readProcVersion:()=>R("/proc/version",{encoding:"utf8"}),osRelease:H,readOsRelease:()=>R("/etc/os-release","utf8")})};
function O(){return p().getPlatform()};
return {qor,Kor,S,V,p,O};
}
function module7(imports){
const O=imports["O"];
const ue=imports["ue"];
const me=imports["me"];
function ap(e){let n=O()==="windows",r=ue(e),o=n?/[\\/]+$/:/\/+$/,f=r.length>me(r).root.length?r.replace(o,""):r;return n?f.replaceAll("/","\\").toLowerCase():f};
function pO(e,n){return ap(e)===ap(n)};
return {ap,pO};
}
function module8(imports){
const va=imports["va"];
const um=imports["um"];
const Co=imports["Co"];
const qOe=imports["qOe"];
const V=imports["V"];
const i=imports["i"];
const c=imports["c"];
const U=imports["U"];
const D3t=imports["D3t"];
const a=imports["a"];
const ly=imports["ly"];
const SD=imports["SD"];
const TT=imports["TT"];
const TY=imports["TY"];
const z3t=imports["z3t"];
const Dr=imports["Dr"];
const Ttr=imports["Ttr"];
const bs=imports["bs"];
const U8=imports["U8"];
const gje=imports["gje"];
const or=imports["or"];
const sr=imports["sr"];
const ar=imports["ar"];
const Rt=imports["Rt"];
const IU=imports["IU"];
const czt=imports["czt"];
const Bns=imports["Bns"];
const bZe=imports["bZe"];
const d6e=imports["d6e"];
const ffe=imports["ffe"];
const NU=imports["NU"];
const pO=imports["pO"];
const ye=imports["ye"];
const DZ=imports["DZ"];
const Xje=imports["Xje"];
const lrr=imports["lrr"];
const hVt=imports["hVt"];
const QF=imports["QF"];
const ekn=imports["ekn"];
const Or=imports["Or"];
const d=imports["d"];
const Z=imports["Z"];
function PU(e,{uncached:n=!1}={}){return null};
function Fr(e,{uncached:n=!1}={}){return!1};
function ktr(e,{uncached:n=!1}={}){let r=e;for(;;){let s=PU(r,{uncached:n});if(s===null)return null;let g=Fr(s,{uncached:n});if(g!==!1)return{root:s,readable:g===!0};let h=Dr(s);if(h===s)return null;r=h}};
function bt(e,n,r){let s=ktr(e,{uncached:r});if(s===null)return n();if(!s.readable)return null;switch(Ttr(s.root,{uncached:r})){case!1:return s.root;case!0:return n();default:return null}};
function aI(e){return bt(e,()=>bs(e),!1)};
class mr{firedSites=new Set;fire(e){if(this.firedSites.has(e))return;this.firedSites.add(e),i("tengu_dead_probe_legacy_local_settings",{site:c(e)})}reset(){this.firedSites.clear()}};
var Uns=new V(()=>new mr);
function M(){let e={store:va(),cwd:um(),projectConfigDir:Co()??void 0,allowedSources:qOe(),onLegacyLocalSettingsRead:(n)=>Uns.of(U().host).fire(n),parentManaged:D3t(),hostManagedProvider:a.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST,flagInline:ly(),flagPath:SD(),flagExpectedContent:TT()??TY(),coworkPlugins:z3t(),canonicalGitRoot:aI,mdm:()=>U8(),hkcu:()=>gje(),helper:()=>or(),helperArmedFromRemote:()=>sr(),helperMergesOutput:()=>ar(),helperWarnings:()=>Rt(),wslInherits:()=>IU(),helperArmedFromUserWritableBase:()=>czt(),credentialHelperKeysFrom:(n)=>Bns(n)};return e.file=()=>bZe(e),e};
var Ie;
function At(){let e=M(),n=Ie;if(n===void 0)return e;let r=e.canonicalGitRoot;return{...e,cwd:n.cwd,projectConfigDir:n.projectConfigDir,canonicalGitRoot:(s)=>s===n.cwd?n.canonicalRoot:r?.(s)??null}};
function pCn(e=new Map){let n=new d6e;for(let[g,h]of e)n.parsedFiles.set(g,h);let r={...At(),store:n},s=new Map;for(let g of ffe){if(g==="projectSettings"&&(()=>{let R=NU(g,r),A=NU("userSettings",r);return!!R&&!!A&&pO(ye(R),ye(A))})())continue;let h=g==="localSettings"?DZ(r):void 0;s.set(g,{settings:Xje(g,r),errors:lrr(g,r),unfiltered:hVt(g,r),...g==="localSettings"&&{legacy:h===void 0?null:QF(h,n).settings??null}})}return s};
function i8r(){let e=va(),n=!e.repoTierFreeze.isHeld(),r=M();if(n)Ie={cwd:r.cwd,projectConfigDir:r.projectConfigDir,canonicalRoot:r.cwd===null?null:r.canonicalGitRoot?.(r.cwd)??null};let s;try{s=e.repoTierFreeze.engage(pCn,`${r.cwd??""}\x00${r.projectConfigDir??""}`)}catch(h){if(n)Ie=void 0;throw h}try{e.invalidateAll()}catch(h){if(s.abandon(),!e.repoTierFreeze.isHeld())Ie=void 0;throw h}let g=!1;return{changedSinceLast:s.changedSinceLast,release:()=>{let h=[];if(!g&&e.repoTierFreeze.isHeld())try{for(let[A,I]of pCn()){let b=e.repoTierFreeze.tier(A);if(b===void 0)continue;let v=ekn(b),H=ekn(I);if(!(Or(v.settings,H.settings)&&Or(v.errors,H.errors)&&Or(v.legacy,H.legacy)))h.push(A)}}catch(A){d(Z(A)),h.length=0,h.push(...ffe.filter((I)=>e.repoTierFreeze.tier(I)!==void 0))}g=!0;let R=s.release();if(R.last)Ie=void 0,e.invalidateAll();return{last:R.last,edited:R.last?h:[]}}}};
function a8r(){return va().repoTierFreeze.differingTiers(pCn()).length===0?"same":"changed"};
return {PU,Fr,ktr,bt,aI,mr,Uns,M,Ie,At,pCn,i8r,a8r};
}
function module9(imports){
const we=imports["we"];
const t=imports["t"];
const D=imports["D"];
const fm=imports["fm"];
const Mn=imports["Mn"];
const u=imports["u"];
const O=imports["O"];
function OY(e){let n=we();if(t(e)===t(n))return!0;return _(e)===_(n)};
function _(e){let n=t(e),r=D(n),s=fm(r)??r;return Mn(u(s,O(n)))};
return {OY,_};
}
export function createSettingsReader287(ports){
const m0=module0({});
const m1=module1({});
const m2=module2({});
const m3=module3({});
const m4=module4({"a":ports["a"]});
const m5=module5({"ve":builtin0,"he":builtin1,"we":ports["we"],"gR":m2["gR"],"va":ports["va"],"fm":ports["fm"],"nc":builtin2,"Mn":ports["Mn"],"t":ports["t"],"ae":ports["ae"],"W":m3["W"],"$s":builtin3,"a":ports["a"],"gT":ports["gT"],"I8o":ports["I8o"],"QF":ports["QF"],"yOe":m4["yOe"],"P_":ports["P_"],"_f":ports["_f"],"VF":ports["VF"],"Sz":ports["Sz"],"arr":ports["arr"]});
const m6=module6({"d":ports["d"],"t":ports["t"],"ae":ports["ae"],"R":builtin4,"H":builtin5});
const m7=module7({"O":m6["O"],"ue":builtin6,"me":builtin7});
const m8=module8({"va":ports["va"],"um":ports["um"],"Co":ports["Co"],"qOe":ports["qOe"],"V":ports["V"],"i":ports["i"],"c":m0["c"],"U":ports["U"],"D3t":ports["D3t"],"a":ports["a"],"ly":ports["ly"],"SD":ports["SD"],"TT":ports["TT"],"TY":ports["TY"],"z3t":ports["z3t"],"Dr":builtin3,"Ttr":ports["unusedCanonicalRootHomeProbe"],"bs":ports["aI"],"U8":ports["U8"],"gje":ports["gje"],"or":ports["or"],"sr":ports["sr"],"ar":ports["ar"],"Rt":ports["Rt"],"IU":ports["IU"],"czt":ports["czt"],"Bns":ports["Bns"],"bZe":ports["bZe"],"d6e":ports["d6e"],"ffe":m1["ffe"],"NU":m5["NU"],"pO":m7["pO"],"ye":builtin1,"DZ":m5["DZ"],"Xje":m5["Xje"],"lrr":m5["lrr"],"hVt":m5["hVt"],"QF":ports["QF"],"ekn":ports["ekn"],"Or":ports["Or"],"d":ports["d"],"Z":ports["Z"]});
const m9=module9({"we":ports["we"],"t":builtin1,"D":builtin3,"fm":ports["fm"],"Mn":ports["Mn"],"u":builtin0,"O":builtin8});
return {"context":m8.M,"heldContext":m8.At,"snapshot":m8.pCn,"engage":m8.i8r,"compare":m8.a8r,"path":m5.NU,"legacyPath":m5.DZ,"source":m5.Xje,"unfiltered":m5.hVt,"errors":m5.lrr,"directory":m5.gVt,"relativePath":m5.dO,"isConfigDirectory":m9.OY,"NoProjectError":m2.gR,"canonicalGitRoot":m8.aI};
}
