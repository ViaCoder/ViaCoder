// Complete pinned 2.1.287 trust and tracking predicates. Host operations are required ports.
import {AsyncLocalStorage} from 'node:async_hooks'
import {LRUCache} from 'lru-cache'
import * as fs from 'node:fs'
import * as path from 'node:path'
export function createOfficialPermissionTrust287(ports){
function originalGitEnvironment(e,r){const I=Object.freeze({GIT_LFS_SKIP_SMUDGE:"1"});
const ue=["'alias.remote-none=version'","'alias.remote-none.command=version'","'alias.remote-/.command=version'","'fetch.bundleURI='","'help.autocorrect=0'"];
const le=ue.join(" ");
const aTn=["GIT_DIR","GIT_WORK_TREE","GIT_COMMON_DIR","GIT_INDEX_FILE","GIT_CEILING_DIRECTORIES","GIT_DISCOVERY_ACROSS_FILESYSTEM","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_SHALLOW_FILE","GIT_NAMESPACE","GIT_IMPLICIT_WORK_TREE"];
const Gbt=[...aTn,"GIT_CONFIG_COUNT","GIT_CONFIG_PARAMETERS","GIT_CONFIG_GLOBAL","GIT_CONFIG_SYSTEM","GIT_CONFIG"];
const qe=/^GIT_CONFIG_(KEY|VALUE)_\d+$/;
const lqt=new RegExp(qe.source,"i");
const Qe=new Set(Gbt);
const Ze=Object.freeze({GIT_ALLOW_PROTOCOL:"/",GIT_CONFIG_PARAMETERS:le,GIT_NO_LAZY_FETCH:"1",GIT_NO_REPLACE_OBJECTS:"1",GIT_TERMINAL_PROMPT:"0",...I});
const Xe=Object.freeze({GIT_SSH_COMMAND:"false"});
function Qo(e,r={}){let n=e?.GIT_ALLOW_PROTOCOL?.split(":").includes("ssh")??!1;return nt(fe({...Ze,...!n&&Xe},e,r))}
function fe(e,r,{base:n=process.env,repository:o}){let i=tt({...e,...o!==void 0&&{GIT_DIR:o.gitDir,GIT_COMMON_DIR:o.commonDir},...o!==void 0&&(o.workTree!==null?{GIT_WORK_TREE:o.workTree}:{GIT_IMPLICIT_WORK_TREE:"0"}),...r}),s={};for(let c of Gbt)s[c]=void 0;let u=new Set(Object.keys(i).map((c)=>c.toUpperCase()));for(let c of Object.keys(n)){let p=c.toUpperCase();if(Qe.has(p)||lqt.test(c)||u.has(p)&&!(c in i))s[c]=void 0}return{...n,...s,...i}}
function tt(e){let r=e.GIT_ALLOW_PROTOCOL;if(r===void 0)return{...e};let n=r.split(":").filter((c)=>c!=="/");if(n.find((c)=>!/^[A-Za-z0-9-]*$/.test(c))!==void 0)throw Error('GIT_ALLOW_PROTOCOL may list only transport names made of letters, digits and "-"');let i=[...new Set([...ue,...n.flatMap((c)=>[`'alias.remote-${c}=version'`,`'alias.remote-${c}.command=version'`])])],s=e.GIT_CONFIG_PARAMETERS;return{...e,GIT_CONFIG_PARAMETERS:[...s===void 0||s===""||s===le?[]:[s],...i].join(" ")}}
function nt(e){let o=(c)=>c,i=(c)=>c.startsWith("/"),s=(c)=>{if(c===void 0)return;let p=c.split(":").map(o).filter((l)=>l!==""&&i(l));return p.length>0?p.join(":"):"/dev/null"},u=Object.keys(e).filter((c)=>c==="PATH");return{...e,...Object.fromEntries(u.map((c)=>[c,s(e[c])]))}}
return Qo(e,r)}
const Qo=originalGitEnvironment,yn=Object.freeze(["-c","core.hooksPath=/dev/null","-c","core.fsmonitor="]),_0=false,h0=new AsyncLocalStorage(),Ut=ports.diskless;
const a=ports.env, oe=ports.oe, um=ports.currentTrustProject, U_t=ports.persistedTrustForProject, Yfe=ports.trustFromSession, le=ports.readGlobalConfig, vIe=ports.currentProjectKey, Ee=ports.originalCwd, Co=ports.projectConfigRoot, Xe=ports.pathResolve, Zn=ports.settingsFilePathForSource, ye=ports.pathResolve, qOe=ports.allowedSettingSources, va=ports.permissionConfigState, Li=ports.sourceOrder, ae=ports.fs, RE=ports.homeDirectory, we=ports.configDirectory, We=ports.pathJoin, W=ports.isNotFound, childProcess=ports.childProcess, resolveGit=ports.resolveGitExecutable, he=ports.pathResolve, ve=ports.pathJoin, fm=ports.realpathOrNull, nc=ports.homeDirectory, Mn=e=>e.normalize("NFC"), t=ports.debug;
function Qbe(){return _0}
function vJe(){return h0.getStore()!==void 0}
function PU(e,{uncached:n=!1}={}){return null}
function Tz(){return Ut()}
const canonicalPath=// Pinned 2.1.287 Git-root cache closure: qt -> ko -> Cu -> lr/en/Be -> bs.
(()=>{
const hd=LRUCache,{lstatSync:Zt,readFileSync:B,realpathSync:ye,statSync:Qt,readlinkSync:os,lstatSync:ns}=fs,{basename:he,dirname:z,dirname:be,isAbsolute:ds,join:x,join:C,relative:pathRelative,resolve:N,resolve:j,sep:T,sep:Re}=path
class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
const OK=Symbol("git-repo-negative-result")
class qt{rootByPath=new hd({max:50});canonicalRootByRoot=new hd({max:50});remoteSlugByRoot=new hd({max:50});monorepoRuledOutByRoot=new hd({max:50});monorepoVerdictByDir=new hd({max:50});gitDirByCwd=new Map;linkedFromRootByPin=new hd({max:64});markersByRoot=new hd({max:50});repositoryByCwd=new Map;remoteHostByCwd=new Map;repoClassByCanonicalRoot=new Map;linguistGeneratedByPath=new Map;wcRootByPath=new hd({max:50});wcTrunkByRoot=new Map;wcWorktreesByRoot=new hd({max:50,ttl:60000});wcRemoteHashByRoot=new hd({max:50});wcHeadByRoot=new Map;sessionRepoNameByCwd=new hd({max:50});diffCheckoutIsRepo=new Map;gitExecutable=null;reportedHookInstallSkips=new Set;clear(){this.rootByPath.clear(),this.canonicalRootByRoot.clear(),this.remoteSlugByRoot.clear(),this.monorepoRuledOutByRoot.clear(),this.monorepoVerdictByDir.clear(),this.gitDirByCwd.clear(),this.linkedFromRootByPin.clear(),this.markersByRoot.clear(),this.repositoryByCwd.clear(),this.remoteHostByCwd.clear(),this.repoClassByCanonicalRoot.clear(),this.linguistGeneratedByPath.clear(),this.wcRootByPath.clear(),this.wcTrunkByRoot.clear(),this.wcWorktreesByRoot.clear(),this.wcRemoteHashByRoot.clear(),this.wcHeadByRoot.clear(),this.sessionRepoNameByCwd.clear(),this.diffCheckoutIsRepo.clear(),this.gitExecutable=null,this.reportedHookInstallSkips.clear()}}
var ko=new V(()=>new qt)
const $se=(e,n,r)=>{let o=e.get(n);if(o!==void 0)return o;let s=r(n);return e.set(n,s),s}
const Mn=function Mn(t){return t.normalize("NFC")}
function ct(t,e){return t}
const Nt=ct(new Map,(e)=>e.clear())
const Dr=path.dirname
function Ttr(e,{uncached:n=!1}={}){let r=n?void 0:Nt.get(e);if(r!==void 0)return r;let s=fm(e);if(s===null)return;let g;try{g=Znr()}catch{return}let h=Mn(s)===g;return Nt.set(e,h),h}
function Fr(e,{uncached:n=!1}={}){return!1}
const pathSafety=(()=>{const fs=ports.fs(),path=ports.path,os={homedir:ports.homeDirectory};const f=path.resolve;const hn=fs.readFileSync;const Rt=fs.statSync;const ot=os.homedir;const tt=path;const W=function W(n){return E(n)==="ENOENT"};const E=function E(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return};
function Ni(t,e){let n=f(e,t);if(hee(t,e)||hee(n,e))return!0;let r=DY(e);for(let o of[t,n]){if(ca(o)){let i=DY(o);if(i===null||i!==r)return!0}if(w$(o)||O_(o)||jS(o)||Pir(o,e))return!0}return!1}
function hee(t,e){if(!Ln(t))return!1;if(uC(t)||CD(t))return!0;if(Sa(t))return!0;let n=oP(t);return n===null||n!==oP(e)}
function Ln(t){return/^[\\/]{2}/.test(t)||CD(t)}
function CD(t){return Ft.test(t)||t.includes("??")&&Ft.test(Xt(t))}
const Ft=/^[\\/]\?\?[\\/]/;
function Xt(t){return tt.win32?tt.win32.normalize(t):t}
function uC(t){return/^[\\/]{2}[?.][\\/]/.test(t)}
function Sa(t){return/(^|[\\/])\.{1,2}[. ]*([\\/]|$)/.test(t)}
function oP(t){if(/^[\\/]{2}[?.][\\/](?!unc[\\/])/i.test(t))return null;return t.match(/^[\\/]{2}(?:[?.][\\/]unc[\\/])?([^\\/]+)/i)?.[1]?.replace(/[A-Z]/g,(e)=>e.toLowerCase())??null}
function DY(t){if(!t.startsWith("/"))return null;let e=[];for(let n of t.split("/")){if(n===""||n===".")continue;if(n===".."){e.pop();continue}if(e.push(n),C(e))return O(n)}return null}
function C(t){return t.length===2&&_R(t[0])==="net"||t.length===3&&_R(t[0])==="network"&&_R(t[1])==="servers"}
function _R(t){return t.replace(/[\u200c-\u200f\u202a-\u202e\u206a-\u206f\ufeff]/g,"").toUpperCase().toLowerCase()}
function O(t){return t.replace(/[A-Z]/g,(e)=>e.toLowerCase())}
function ca(t){return da(t)}
function da(t){return UEe(t)!==null}
function UEe(t){if(!t.startsWith("/"))return null;if(t.length>Gt)return Lt(t);let e=I.get(t);if(e===void 0){if(e=Lt(t),I.size>=Bt)I.clear();I.set(t,e)}return e}
const Gt=4096;
function Lt(t){let e=[];for(let n of t.split("/")){if(n===""||n===".")continue;if(n===".."){e.pop();continue}if(e.push(n),C(e))return"/"+e.join("/")}return null}
const I=new Map;
const Bt=1024;
function w$(t){if(!t.startsWith("/"))return!1;if(t.length>Gt)return Mt(t);let e=k.get(t);if(e===void 0){if(e=Mt(t),k.size>=Bt)k.clear();k.set(t,e)}return e}
function Mt(t){let e=[];for(let n of t.split("/")){if(n===""||n===".")continue;if(n===".."){e.pop();continue}if(e.push(n),e.length===1&&e[0].toLowerCase()==="network")return!0}return!1}
const k=new Map;
function O_(t){if(!t.startsWith("/"))return!1;let e=[];for(let n of t.split("/")){if(n===""||n===".")continue;if(n===".."){e.pop();continue}e.push(n)}return e.length===1&&e[0].toLowerCase()==="net"}
function jS(t){if(!/\/\.(?:vol|file|nofollow|resolve)(?:\/|$)/i.test(t))return!1;if(!t.startsWith("/"))return!1;let e=[];for(let n of t.split("/")){if(n===""||n===".")continue;if(n===".."){e.pop();continue}if(e.push(n),e.length===1&&/^\.(?:vol|file|nofollow|resolve)$/i.test(n))return!0}return!1}
function Pir(t,e,n="darwin",r=n==="darwin"&&zt()){if(n!=="darwin"||!AW(t,n,r))return!1;let o=et(e,n,r).complete[0]??null,{complete:i,partial:s}=et(t,n,r);if(i.length===0&&s.length===0)return!0;if(o===null)return!0;return i.some((a)=>a!==o)||s.some((a)=>!o.startsWith(a))}
function zt(t=Dt){let e=t===Dt;if(e&&J.value!==void 0)return J.value;let n;try{let r=!1;try{r=t.readAutoMaster().split(`
`).some((o)=>{let i=o.replace(/#.*$/,"").trim().split(/\s+/);return i.length>=2&&i[0].toLowerCase()==="/home"})}catch(o){if(!W(o))throw o}n=r||t.homeIsOwnMount()}catch{return!0}if(e)J.value=n;return n}
const Dt={readAutoMaster:()=>hn("/etc/auto_master","utf8"),homeIsOwnMount:()=>{let t;try{t=Rt("/home")}catch(e){if(W(e))return!0;throw e}return t.dev!==Rt("/Users").dev}};
const J=ct({value:void 0},(t)=>{t.value=void 0});
function ct(t,e){return t}
function AW(t,e="darwin",n=e==="darwin"&&zt()){if(e!=="darwin")return!1;if(w$(t)||jS(t))return!0;if(!t.startsWith("/"))return!1;let{complete:r,partial:o}=et(t,e,n);if(o.length>0)return!0;if(r.some((s)=>s.startsWith("/network/")))return!0;let i=r.filter((s)=>s.startsWith("/home/"));if(i.length>0){let s=bn();if(i.some((a)=>a!==s))return!0}return!1}
function et(t,e,n){let r=[],o=[];if(!t.startsWith("/"))return{complete:r,partial:o};let i=[];for(let s of t.split("/")){if(s===""||s===".")continue;if(s===".."){i.pop();continue}if(i.push(s),i.length>xn)continue;let a="/"+i.join("/"),u=(e==="darwin"?E$(a):a).split("/").filter((w)=>w!==""),h=u[0]?.toLowerCase();if(h==="network"){if(u.length===1)o.push("/network/");else if(u.length===2)o.push(`/network/${O(u[1])}/`);else if(u.length===3)r.push(`/network/${O(u[1])}/${O(u[2])}`)}else if(n&&h==="home"&&u.length===2)r.push(`/home/${u[1]}`)}return{complete:r,partial:o}}
const xn=6;
function E$(t){let e=t.split("/");if(e.length<5||e[0]!==""||N(e[1]??"")!=="system"||N(e[2]??"")!=="volumes"||N(e[3]??"")!=="data")return t;let n=e.slice(4);for(let r of vn){let o=r.split("/");if(n.length<o.length)continue;if(o.every((i,s)=>N(n[s]??"")===N(i)))return"/"+n.join("/")}return t}
function N(t){return t.toUpperCase().toLowerCase()}
const vn=["usr/local","usr/libexec/cups","usr/share/snmp","AppleInternal","Applications","Library","Users","Volumes","cores","home","media","mnt","opt","pkg","private","sw"];
function bn(){let t;try{t=ot()}catch{return null}let e=/^\/home\/([^/]+)/.exec(E$(t));return e?`/home/${e[1]}`:null}
function vD(t,e){if(jS(t))return!0;if(ca(t)){let n=DY(t);if(n===null||n!==DY(e))return!0}return Pir(t,e)}
return {Ni,vD,w$,ca};})()
const {Ni,vD,w$,ca}=pathSafety
const E=function E(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return}
const hs=/\/+/;
const ys=/\/$/;
const hn=/^\//;
const Rs=/^\//;
function mn(e){try{let n=ns(e);if(n.isSymbolicLink())return"symlink";return n.isFile()?"file":n.isDirectory()?"dir":"special"}catch(n){let r=E(n);return r==="ENOENT"||r==="ENOTDIR"?"absent":"other"}}
function le(e,n,r=40,o=n,s=!1){if(r<=0)return!1;let i=Rs.exec(e),c=i?i[0]:"",f=e.slice(c.length).split(hs);for(let g=0;g<f.length;g++){let b=f[g];if(b===""||b===".")continue;if(b===".."){c=be(c);continue}if(c=C(c,b),vD(c,o)||w$(c))return!1;let S=mn(c);if(S==="other"||S==="special"&&!s)return!1;if(S==="symlink"){let R=ZVt(c);if(R===null)return!1;if(ms(R,be(c)))return!1;let u=hn.test(R)?R:be(c)+Re+R,h=f.slice(g+1).join(Re),_=h?ys.test(u)?u+h:u+Re+h:u;return le(_,n,r-1,o,s)}}return!0}
function J(e,n,r=n,o=!1){if(!le(hn.test(e)?e:n+Re+e,n,void 0,r,o))return!0;return!le(j(n,e),n,void 0,r,o)}
function oy(e,n,r=n){return J(e,n,r)}
function ms(e,n){return Ni(e,n)}
const ne=(level,event,fields)=>ports.gitDiscoveryLog(level,event,fields)
function U(){return n()}const n=ports.executionSession
function ZVt(e){try{let n=os(e,{encoding:"buffer"}),r=n.toString("utf-8");if(r.includes("\x00")||!Buffer.from(r,"utf-8").equals(n))return null;return r}catch{return null}}
function yL(e,n){if(!le(e,n))return!0;let r=mn(e);return r==="symlink"||r==="special"||r==="other"}
function Ne(e,n){try{let r=Zt(e);if(r.isSymbolicLink()){let o=ZVt(e);if(o===null)return!1;if(Ni(o,n))return!1;if(oy(o,n))return!1;let s=Qt(e);return s.isDirectory()||s.isFile()}return r.isDirectory()||r.isFile()}catch{return!1}}
function en(e){let n=Date.now();ne("info","find_git_root_started");let r=N(e),o=r.substring(0,r.indexOf(T)+1)||T,s=0;while(r!==o){let i=x(r,".git");if(s++,Ne(i,r))return ne("info","find_git_root_completed",{duration_ms:Date.now()-n,stat_count:s,found:!0}),Mn(r);let c=z(r);if(c===r)break;r=c}if(s++,Ne(x(o,".git"),o))return ne("info","find_git_root_completed",{duration_ms:Date.now()-n,stat_count:s,found:!0}),Mn(o);return ne("info","find_git_root_completed",{duration_ms:Date.now()-n,stat_count:s,found:!1}),OK}
function lr(e){let n=$se(Cu().rootByPath,e,en);return n===OK?null:n}
function Be(e){try{return tn(e,B(x(e,".git"),"utf-8"))}catch{return e}}
function tn(e,n){try{let r=n.trim();if(!r.startsWith("gitdir:"))return e;let o=r.slice(7).trim();if(Ni(o,e))return e;if(oy(o,e))return e;let s=N(e,o);if(yL(x(s,"commondir"),s))return e;let i=B(x(s,"commondir"),"utf-8").trim();if(Ni(i,s))return e;if(oy(i,s))return e;let c=N(s,i);if(N(z(s))!==x(c,"worktrees"))return e;if(yL(x(s,"gitdir"),s))return e;let f=B(x(s,"gitdir"),"utf-8").trim();if(Ni(f,e))return e;if(oy(f,s,e))return e;if(ye(N(s,f))!==x(ye(e),".git"))return e;if(he(c)!==".git"){if(Ne(x(c,".git"),c))return e;return Mn(c)}return Mn(z(c))}catch{return e}}
function Cu(){return ko.of(U().host)}
function bs(e){let n=lr(e);if(!n)return null;return $se(Cu().canonicalRootByRoot,n,Be)}
function LS(e){let n=en(e);return n===OK?null:n}
function ktr(e,{uncached:n=!1}={}){let r=e;for(;;){let s=PU(r,{uncached:n});if(s===null)return null;let g=Fr(s,{uncached:n});if(g!==!1)return{root:s,readable:g===!0};let h=Dr(s);if(h===s)return null;r=h}}
function bt(e,n,r){let s=ktr(e,{uncached:r});if(s===null)return n();if(!s.readable)return null;switch(Ttr(s.root,{uncached:r})){case!1:return s.root;case!0:return n();default:return null}}
function aI(e){return bt(e,()=>bs(e),!1)}
return {bs,aI,LS,ktr,Ttr};
})(),aI=canonicalPath.aI
const {LS,ktr,Ttr}=canonicalPath,u=path.normalize,O=()=>ports.pathStylePlatform()
function $U(e){let r=u(e);if(O()==="windows")return r.replaceAll("\\","/");return r}
function xE(e,n){let r=Mn(Xe(n)),s=KZn(r);if(s?.rootOnly){let g=$U(Xe(s.root));return e.projects?.[g]?.hasTrustDialogAccepted===!0?g:null}return PE(e,r,s!==null?$U(Xe(s.root)):null)}
function KZn(e){let n=Mn(Xe(e)),r=ktr(n,{uncached:!0});if(r!==null&&Ttr(r.root,{uncached:!0})!==!0)return{root:r.root,rootOnly:!0};let s=LS(n);return s!==null?{root:s,rootOnly:!1}:null}
function PE(e,n,r){let s=$U(n);while(!0){if(!(r===null||s===r||s.startsWith(r.endsWith("/")?r:r+"/")))return null;if(e.projects?.[s]?.hasTrustDialogAccepted)return s;if(s===r)return null;let h=$U(Xe(s,".."));if(h===s)return null;s=h}}
function Pm(e){let n=e??um();return n!==null&&U_t(n)}
function fi(){if(Qbe()&&!vJe())return!1;return um()===null}
function T0(){if(a.CLAUDE_CODE_SANDBOXED)return!0;if(Yfe())return!0;let e=le(),n=vIe();if(e.projects?.[n]?.hasTrustDialogAccepted)return!0;return xE(e,Ee())!==null}
function k0(){let e=Ee(),n=ae();try{if(n.realpathSync(Xe(e))===n.realpathSync(RE()))return!0}catch{}return Xe(we())===Xe(We(e,".claude"))}
function iD(e,n){let s=Qnr(e,n);if(s.decided!==void 0)return s.decided;if(!Xns(s.root))return s.cwdResolved;return s.root}
function Qnr(e,n){let s=n?.(e);if(!s)return{decided:he(e)};let r=he(s),i=he(e);if(r===i)return{decided:r};let d;try{d=Znr()}catch{return{decided:i}}if(r===d)return{decided:i};return{decided:void 0,root:r,cwdResolved:i}}
function Yns(e){return va().localStoreProbes.canonicalRootOwnerUids(e,I_)}
function I_(e){let n=ae(),s=null;try{s=n.lstatSync(ve(e,".claude")).uid}catch(r){if(!W(r))throw r}return{rootUid:n.statSync(e).uid,gitEntryUid:L_(e),claudeEntryUid:s}}
function L_(e){let n=ae();try{return n.lstatSync(ve(e,".git")).uid}catch(s){throw s}}
function Xns(e){if(typeof process.getuid!=="function"&&typeof process.geteuid!=="function")return t(`localSettings: not canonicalizing the consent store to ${e} \u2014 this platform has no uid semantics to verify directory ownership with, so the store stays at the session cwd (canonicalization is POSIX-only)`,{level:"warn"}),!1;let n=typeof process.geteuid==="function"?process.geteuid():process.getuid?.();try{let{rootUid:s,gitEntryUid:r,claudeEntryUid:i}=Yns(e);if(s===n&&r===n&&(i===null||i===n))return!0;return t(`localSettings: not canonicalizing the consent store to ${e} \u2014 it (uid ${s}), its .git entry (uid ${r}), or its .claude entry (uid ${i??"absent"}) is not owned by the current user (uid ${n}); the store stays at the session cwd (the pre-canonicalization behavior). If you own this repo, chown it (including .git and .claude) or run from a directory you own.`,{level:"warn"}),!1}catch(s){return t(`localSettings: not canonicalizing the consent store to ${e} \u2014 its ownership could not be verified (${s instanceof Error?s.message:String(s)}); the store stays at the session cwd`,{level:"warn"}),!1}}
function Znr(){return va().localStoreProbes.normalizedRealHomeDir(N_)}
function N_(){let e=fm(nc());if(e===null)throw Error("home directory realpath unavailable");return Mn(e)}
function ds(){if(fi())return!1;let e=oe();if(e.trustAccepted)return!0;let n=T0();if(n)e.setTrustAccepted(!0);return n}
function OE(){let e=oe(),n=Ee(),r=e.localSettingsGitTracked?.cwd===n?e.localSettingsGitTracked.value:void 0;if(r===void 0)r=A0(),e.setLocalSettingsGitTracked({cwd:n,value:r});return r}
function C0(e){let n=ae();try{if(n.realpathSync(Xe(e))===n.realpathSync(RE()))return"untracked"}catch{}if(Xe(we())===Xe(We(e,".claude")))return"untracked";for(let r of[We(e,".claude"),We(e,".claude","settings.local.json")])try{if(n.lstatSync(r).isSymbolicLink())return"tracked"}catch(s){if(!W(s))return"tracked"}try{return n.lstatSync(We(e,".claude",".git")),"tracked"}catch(r){if(!W(r))return"tracked"}if(PU(e,{uncached:!0})!==null)return"tracked";if(Tz())return"tracked";try{let r=childProcess(),g=resolveGit();if(g===null)return"untracked";let h=r.spawnSync(g,[...yn,"-C",e,"ls-files","--error-unmatch","--",":(icase).claude/settings.local.json"],{cwd:e,encoding:"utf8",timeout:2000,windowsHide:!0,env:Qo({GIT_LITERAL_PATHSPECS:"",LC_ALL:"C",GIT_TRACE2:"0",GIT_TRACE2_PERF:"0",GIT_TRACE2_EVENT:"0"})});if(h.error&&W(h.error))return"untracked";if(h.signal!==null||h.error)return"tracked";if(h.status===128)return/^fatal: not a git repository/.test(h.stderr??"")?"indeterminate":"tracked";if(h.status===0)return"tracked_in_index";if(h.status===1)return"untracked";return"tracked"}catch{return"untracked"}}
function A0(){let e=Ee(),n=Co(),r=n??e,s=[r],g=n??iD(e,aI);if(g!==Xe(r))s.push(g);let h=!1,b=!1;for(let v of s){let w=C0(v);if(w==="tracked_in_index")return"tracked_in_index";if(w==="tracked")h=!0;if(w==="indeterminate")b=!0}if(h)return"tracked";return b?"indeterminate":"untracked"}
function J0({onIndeterminate:e}){if(fi())return!0;if(!ds()){if(k0()&&Co()===null&&iD(Ee(),aI)===Xe(Ee()))return!1;return!0}let n=OE();if(n==="indeterminate")return e==="tracked";return n==="tracked"||n==="tracked_in_index"}
function rw(){let e=Zn("projectSettings"),n=Zn("userSettings");return!!e&&!!n&&ye(e)===ye(n)}
function Rhn(){return{gateProject:!rw(),gateLocal:J0({onIndeterminate:"untracked"})}}
function Xo(){let e=qOe(),n=va();if(n.enabledSources?.allowed===e)return n.enabledSources.result;let t=new Set(e);t.add("flagSettings"),t.add("policySettings");let o=Li.filter((i)=>t.has(i));return n.enabledSources={allowed:e,result:o},o}
return {Pm,J0,ds,fi,T0,OE,A0,C0,rw,Rhn,Xo,xE,bs:canonicalPath.bs,aI};
}
