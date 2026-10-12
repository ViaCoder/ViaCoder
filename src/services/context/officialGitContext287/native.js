// Complete original Git context and environment bodies; actual owners are host ports.
function environment0(ports){const process=ports.process;var $S="--ignore-submodules=dirty";
var I=Object.freeze({GIT_LFS_SKIP_SMUDGE:"1"});
var ue=["'alias.remote-none=version'","'alias.remote-none.command=version'","'alias.remote-/.command=version'","'fetch.bundleURI='","'help.autocorrect=0'"];
var le=ue.join(" ");
var Ze=Object.freeze({GIT_ALLOW_PROTOCOL:"/",GIT_CONFIG_PARAMETERS:le,GIT_NO_LAZY_FETCH:"1",GIT_NO_REPLACE_OBJECTS:"1",GIT_TERMINAL_PROMPT:"0",...I});
var Xe=Object.freeze({GIT_SSH_COMMAND:"false"});
var aTn=["GIT_DIR","GIT_WORK_TREE","GIT_COMMON_DIR","GIT_INDEX_FILE","GIT_CEILING_DIRECTORIES","GIT_DISCOVERY_ACROSS_FILESYSTEM","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_SHALLOW_FILE","GIT_NAMESPACE","GIT_IMPLICIT_WORK_TREE"];
var Gbt=[...aTn,"GIT_CONFIG_COUNT","GIT_CONFIG_PARAMETERS","GIT_CONFIG_GLOBAL","GIT_CONFIG_SYSTEM","GIT_CONFIG"];
var qe=/^GIT_CONFIG_(KEY|VALUE)_\d+$/;
var lqt=new RegExp(qe.source,"i");
var Qe=new Set(Gbt);
function Qo(e,r={}){let n=e?.GIT_ALLOW_PROTOCOL?.split(":").includes("ssh")??!1;return nt(fe({...Ze,...!n&&Xe},e,r))};
function fe(e,r,{base:n=process.env,repository:o}){let i=tt({...e,...o!==void 0&&{GIT_DIR:o.gitDir,GIT_COMMON_DIR:o.commonDir},...o!==void 0&&(o.workTree!==null?{GIT_WORK_TREE:o.workTree}:{GIT_IMPLICIT_WORK_TREE:"0"}),...r}),s={};for(let c of Gbt)s[c]=void 0;let u=new Set(Object.keys(i).map((c)=>c.toUpperCase()));for(let c of Object.keys(n)){let p=c.toUpperCase();if(Qe.has(p)||lqt.test(c)||u.has(p)&&!(c in i))s[c]=void 0}return{...n,...s,...i}};
function tt(e){let r=e.GIT_ALLOW_PROTOCOL;if(r===void 0)return{...e};let n=r.split(":").filter((c)=>c!=="/");if(n.find((c)=>!/^[A-Za-z0-9-]*$/.test(c))!==void 0)throw Error('GIT_ALLOW_PROTOCOL may list only transport names made of letters, digits and "-"');let i=[...new Set([...ue,...n.flatMap((c)=>[`'alias.remote-${c}=version'`,`'alias.remote-${c}.command=version'`])])],s=e.GIT_CONFIG_PARAMETERS;return{...e,GIT_CONFIG_PARAMETERS:[...s===void 0||s===""||s===le?[]:[s],...i].join(" ")}};
function nt(e){let o=(c)=>c,i=(c)=>c.startsWith("/"),s=(c)=>{if(c===void 0)return;let p=c.split(":").map(o).filter((l)=>l!==""&&i(l));return p.length>0?p.join(":"):"/dev/null"},u=Object.keys(e).filter((c)=>c==="PATH");return{...e,...Object.fromEntries(u.map((c)=>[c,s(e[c])]))}};return{environment:Qo,ignoreSubmodules:$S};}
function environment1(ports){const process=ports.process;var $S="--ignore-submodules=dirty";
var N=Object.freeze({GIT_LFS_SKIP_SMUDGE:"1"});
var ue=["'alias.remote-none=version'","'alias.remote-none.command=version'","'alias.remote-/.command=version'","'fetch.bundleURI='","'help.autocorrect=0'"];
var le=ue.join(" ");
var ze=Object.freeze({GIT_ALLOW_PROTOCOL:"/",GIT_CONFIG_PARAMETERS:le,GIT_NO_LAZY_FETCH:"1",GIT_NO_REPLACE_OBJECTS:"1",GIT_TERMINAL_PROMPT:"0",...N});
var Ze=Object.freeze({GIT_SSH_COMMAND:"false"});
var akn=["GIT_DIR","GIT_WORK_TREE","GIT_COMMON_DIR","GIT_INDEX_FILE","GIT_CEILING_DIRECTORIES","GIT_DISCOVERY_ACROSS_FILESYSTEM","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_SHALLOW_FILE","GIT_NAMESPACE","GIT_IMPLICIT_WORK_TREE"];
var Gbt=[...akn,"GIT_CONFIG_COUNT","GIT_CONFIG_PARAMETERS","GIT_CONFIG_GLOBAL","GIT_CONFIG_SYSTEM","GIT_CONFIG"];
var Xe=/^GIT_CONFIG_(KEY|VALUE)_\d+$/;
var l3t=new RegExp(Xe.source,"i");
var Qe=new Set(Gbt);
function Qo(e,r={}){let n=e?.GIT_ALLOW_PROTOCOL?.split(":").includes("ssh")??!1;return nt(fe({...ze,...!n&&Ze},e,r))};
function fe(e,r,{base:n=process.env,repository:o}){let i=tt({...e,...o!==void 0&&{GIT_DIR:o.gitDir,GIT_COMMON_DIR:o.commonDir},...o!==void 0&&(o.workTree!==null?{GIT_WORK_TREE:o.workTree}:{GIT_IMPLICIT_WORK_TREE:"0"}),...r}),s={};for(let c of Gbt)s[c]=void 0;let u=new Set(Object.keys(i).map((c)=>c.toUpperCase()));for(let c of Object.keys(n)){let p=c.toUpperCase();if(Qe.has(p)||l3t.test(c)||u.has(p)&&!(c in i))s[c]=void 0}return{...n,...s,...i}};
function tt(e){let r=e.GIT_ALLOW_PROTOCOL;if(r===void 0)return{...e};let n=r.split(":").filter((c)=>c!=="/");if(n.find((c)=>!/^[A-Za-z0-9-]*$/.test(c))!==void 0)throw Error('GIT_ALLOW_PROTOCOL may list only transport names made of letters, digits and "-"');let i=[...new Set([...ue,...n.flatMap((c)=>[`'alias.remote-${c}=version'`,`'alias.remote-${c}.command=version'`])])],s=e.GIT_CONFIG_PARAMETERS;return{...e,GIT_CONFIG_PARAMETERS:[...s===void 0||s===""||s===le?[]:[s],...i].join(" ")}};
function nt(e){let o=(c)=>c,i=(c)=>c.startsWith("/"),s=(c)=>{if(c===void 0)return;let p=c.split(":").map(o).filter((l)=>l!==""&&i(l));return p.length>0?p.join(":"):"/dev/null"},u=Object.keys(e).filter((c)=>c==="PATH");return{...e,...Object.fromEntries(u.map((c)=>[c,s(e[c])]))}};return{environment:Qo,ignoreSubmodules:$S};}
function environment2(ports){const process=ports.process;var Fb="--ignore-submodules=dirty";
var I=Object.freeze({GIT_LFS_SKIP_SMUDGE:"1"});
var ue=["'alias.remote-none=version'","'alias.remote-none.command=version'","'alias.remote-/.command=version'","'fetch.bundleURI='","'help.autocorrect=0'"];
var le=ue.join(" ");
var ze=Object.freeze({GIT_ALLOW_PROTOCOL:"/",GIT_CONFIG_PARAMETERS:le,GIT_NO_LAZY_FETCH:"1",GIT_NO_REPLACE_OBJECTS:"1",GIT_TERMINAL_PROMPT:"0",...I});
var Ze=Object.freeze({GIT_SSH_COMMAND:"false"});
var GTn=["GIT_DIR","GIT_WORK_TREE","GIT_COMMON_DIR","GIT_INDEX_FILE","GIT_CEILING_DIRECTORIES","GIT_DISCOVERY_ACROSS_FILESYSTEM","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_SHALLOW_FILE","GIT_NAMESPACE","GIT_IMPLICIT_WORK_TREE"];
var DSt=[...GTn,"GIT_CONFIG_COUNT","GIT_CONFIG_PARAMETERS","GIT_CONFIG_GLOBAL","GIT_CONFIG_SYSTEM","GIT_CONFIG"];
var qe=/^GIT_CONFIG_(KEY|VALUE)_\d+$/;
var Qqt=new RegExp(qe.source,"i");
var Qe=new Set(DSt);
function Qo(e,r={}){let n=e?.GIT_ALLOW_PROTOCOL?.split(":").includes("ssh")??!1;return nt(fe({...ze,...!n&&Ze},e,r))};
function fe(e,r,{base:n=process.env,repository:o}){let i=tt({...e,...o!==void 0&&{GIT_DIR:o.gitDir,GIT_COMMON_DIR:o.commonDir},...o!==void 0&&(o.workTree!==null?{GIT_WORK_TREE:o.workTree}:{GIT_IMPLICIT_WORK_TREE:"0"}),...r}),s={};for(let c of DSt)s[c]=void 0;let u=new Set(Object.keys(i).map((c)=>c.toUpperCase()));for(let c of Object.keys(n)){let p=c.toUpperCase();if(Qe.has(p)||Qqt.test(c)||u.has(p)&&!(c in i))s[c]=void 0}return{...n,...s,...i}};
function tt(e){let r=e.GIT_ALLOW_PROTOCOL;if(r===void 0)return{...e};let n=r.split(":").filter((c)=>c!=="/");if(n.find((c)=>!/^[A-Za-z0-9-]*$/.test(c))!==void 0)throw Error('GIT_ALLOW_PROTOCOL may list only transport names made of letters, digits and "-"');let i=[...new Set([...ue,...n.flatMap((c)=>[`'alias.remote-${c}=version'`,`'alias.remote-${c}.command=version'`])])],s=e.GIT_CONFIG_PARAMETERS;return{...e,GIT_CONFIG_PARAMETERS:[...s===void 0||s===""||s===le?[]:[s],...i].join(" ")}};
function nt(e){let o=(c)=>c,i=(c)=>c.startsWith("/"),s=(c)=>{if(c===void 0)return;let p=c.split(":").map(o).filter((l)=>l!==""&&i(l));return p.length>0?p.join(":"):"/dev/null"},u=Object.keys(e).filter((c)=>c==="PATH");return{...e,...Object.fromEntries(u.map((c)=>[c,s(e[c])]))}};return{environment:Qo,ignoreSubmodules:Fb};}
function environment3(ports){const process=ports.process;var Ub="--ignore-submodules=dirty";
var h=Object.freeze({GIT_LFS_SKIP_SMUDGE:"1"});
var ue=["'alias.remote-none=version'","'alias.remote-none.command=version'","'alias.remote-/.command=version'","'fetch.bundleURI='","'help.autocorrect=0'"];
var le=ue.join(" ");
var ze=Object.freeze({GIT_ALLOW_PROTOCOL:"/",GIT_CONFIG_PARAMETERS:le,GIT_NO_LAZY_FETCH:"1",GIT_NO_REPLACE_OBJECTS:"1",GIT_TERMINAL_PROMPT:"0",...h});
var Ze=Object.freeze({GIT_SSH_COMMAND:"false"});
var GTn=["GIT_DIR","GIT_WORK_TREE","GIT_COMMON_DIR","GIT_INDEX_FILE","GIT_CEILING_DIRECTORIES","GIT_DISCOVERY_ACROSS_FILESYSTEM","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_SHALLOW_FILE","GIT_NAMESPACE","GIT_IMPLICIT_WORK_TREE"];
var NSt=[...GTn,"GIT_CONFIG_COUNT","GIT_CONFIG_PARAMETERS","GIT_CONFIG_GLOBAL","GIT_CONFIG_SYSTEM","GIT_CONFIG"];
var qe=/^GIT_CONFIG_(KEY|VALUE)_\d+$/;
var QKt=new RegExp(qe.source,"i");
var Qe=new Set(NSt);
function Qo(e,r={}){let n=e?.GIT_ALLOW_PROTOCOL?.split(":").includes("ssh")??!1;return nt(fe({...ze,...!n&&Ze},e,r))};
function fe(e,r,{base:n=process.env,repository:o}){let i=tt({...e,...o!==void 0&&{GIT_DIR:o.gitDir,GIT_COMMON_DIR:o.commonDir},...o!==void 0&&(o.workTree!==null?{GIT_WORK_TREE:o.workTree}:{GIT_IMPLICIT_WORK_TREE:"0"}),...r}),s={};for(let c of NSt)s[c]=void 0;let u=new Set(Object.keys(i).map((c)=>c.toUpperCase()));for(let c of Object.keys(n)){let p=c.toUpperCase();if(Qe.has(p)||QKt.test(c)||u.has(p)&&!(c in i))s[c]=void 0}return{...n,...s,...i}};
function tt(e){let r=e.GIT_ALLOW_PROTOCOL;if(r===void 0)return{...e};let n=r.split(":").filter((c)=>c!=="/");if(n.find((c)=>!/^[A-Za-z0-9-]*$/.test(c))!==void 0)throw Error('GIT_ALLOW_PROTOCOL may list only transport names made of letters, digits and "-"');let i=[...new Set([...ue,...n.flatMap((c)=>[`'alias.remote-${c}=version'`,`'alias.remote-${c}.command=version'`])])],s=e.GIT_CONFIG_PARAMETERS;return{...e,GIT_CONFIG_PARAMETERS:[...s===void 0||s===""||s===le?[]:[s],...i].join(" ")}};
function nt(e){let o=(c)=>c,i=(c)=>c.startsWith("/"),s=(c)=>{if(c===void 0)return;let p=c.split(":").map(o).filter((l)=>l!==""&&i(l));return p.length>0?p.join(":"):"/dev/null"},u=Object.keys(e).filter((c)=>c==="PATH");return{...e,...Object.fromEntries(u.map((c)=>[c,s(e[c])]))}};return{environment:Qo,ignoreSubmodules:Ub};}
function environment4(ports){const process=ports.process;var Bb="--ignore-submodules=dirty";
var N=Object.freeze({GIT_LFS_SKIP_SMUDGE:"1"});
var ue=["'alias.remote-none=version'","'alias.remote-none.command=version'","'alias.remote-/.command=version'","'fetch.bundleURI='","'help.autocorrect=0'"];
var le=ue.join(" ");
var ze=Object.freeze({GIT_ALLOW_PROTOCOL:"/",GIT_CONFIG_PARAMETERS:le,GIT_NO_LAZY_FETCH:"1",GIT_NO_REPLACE_OBJECTS:"1",GIT_TERMINAL_PROMPT:"0",...N});
var Ze=Object.freeze({GIT_SSH_COMMAND:"false"});
var ZTn=["GIT_DIR","GIT_WORK_TREE","GIT_COMMON_DIR","GIT_INDEX_FILE","GIT_CEILING_DIRECTORIES","GIT_DISCOVERY_ACROSS_FILESYSTEM","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_SHALLOW_FILE","GIT_NAMESPACE","GIT_IMPLICIT_WORK_TREE"];
var BSt=[...ZTn,"GIT_CONFIG_COUNT","GIT_CONFIG_PARAMETERS","GIT_CONFIG_GLOBAL","GIT_CONFIG_SYSTEM","GIT_CONFIG"];
var Xe=/^GIT_CONFIG_(KEY|VALUE)_\d+$/;
var tKt=new RegExp(Xe.source,"i");
var qe=new Set(BSt);
function Qo(e,r={}){let n=e?.GIT_ALLOW_PROTOCOL?.split(":").includes("ssh")??!1;return nt(fe({...ze,...!n&&Ze},e,r))};
function fe(e,r,{base:n=process.env,repository:o}){let i=et({...e,...o!==void 0&&{GIT_DIR:o.gitDir,GIT_COMMON_DIR:o.commonDir},...o!==void 0&&(o.workTree!==null?{GIT_WORK_TREE:o.workTree}:{GIT_IMPLICIT_WORK_TREE:"0"}),...r}),s={};for(let c of BSt)s[c]=void 0;let u=new Set(Object.keys(i).map((c)=>c.toUpperCase()));for(let c of Object.keys(n)){let p=c.toUpperCase();if(qe.has(p)||tKt.test(c)||u.has(p)&&!(c in i))s[c]=void 0}return{...n,...s,...i}};
function et(e){let r=e.GIT_ALLOW_PROTOCOL;if(r===void 0)return{...e};let n=r.split(":").filter((c)=>c!=="/");if(n.find((c)=>!/^[A-Za-z0-9-]*$/.test(c))!==void 0)throw Error('GIT_ALLOW_PROTOCOL may list only transport names made of letters, digits and "-"');let i=[...new Set([...ue,...n.flatMap((c)=>[`'alias.remote-${c}=version'`,`'alias.remote-${c}.command=version'`])])],s=e.GIT_CONFIG_PARAMETERS;return{...e,GIT_CONFIG_PARAMETERS:[...s===void 0||s===""||s===le?[]:[s],...i].join(" ")}};
function nt(e){let o=(c)=>c.replaceAll('"',""),i=(c)=>/^(?:[A-Za-z]:[\\/]|[\\/]{2})/.test(c),s=(c)=>{if(c===void 0)return;let p=c.split(";").map(o).filter((f)=>f!==""&&i(f));return p.length>0?p.join(";"):"\\\\.\\nul"},u=Object.keys(e).filter((c)=>c.toUpperCase()==="PATH");return{...e,...Object.fromEntries(u.map((c)=>[c,s(e[c])]))}};return{environment:Qo,ignoreSubmodules:Bb};}
function environment5(ports){const process=ports.process;var Hb="--ignore-submodules=dirty";
var N=Object.freeze({GIT_LFS_SKIP_SMUDGE:"1"});
var ue=["'alias.remote-none=version'","'alias.remote-none.command=version'","'alias.remote-/.command=version'","'fetch.bundleURI='","'help.autocorrect=0'"];
var le=ue.join(" ");
var ze=Object.freeze({GIT_ALLOW_PROTOCOL:"/",GIT_CONFIG_PARAMETERS:le,GIT_NO_LAZY_FETCH:"1",GIT_NO_REPLACE_OBJECTS:"1",GIT_TERMINAL_PROMPT:"0",...N});
var Ze=Object.freeze({GIT_SSH_COMMAND:"false"});
var ZTn=["GIT_DIR","GIT_WORK_TREE","GIT_COMMON_DIR","GIT_INDEX_FILE","GIT_CEILING_DIRECTORIES","GIT_DISCOVERY_ACROSS_FILESYSTEM","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_SHALLOW_FILE","GIT_NAMESPACE","GIT_IMPLICIT_WORK_TREE"];
var HSt=[...ZTn,"GIT_CONFIG_COUNT","GIT_CONFIG_PARAMETERS","GIT_CONFIG_GLOBAL","GIT_CONFIG_SYSTEM","GIT_CONFIG"];
var Xe=/^GIT_CONFIG_(KEY|VALUE)_\d+$/;
var tKt=new RegExp(Xe.source,"i");
var qe=new Set(HSt);
function Qo(e,r={}){let n=e?.GIT_ALLOW_PROTOCOL?.split(":").includes("ssh")??!1;return nt(fe({...ze,...!n&&Ze},e,r))};
function fe(e,r,{base:n=process.env,repository:o}){let i=et({...e,...o!==void 0&&{GIT_DIR:o.gitDir,GIT_COMMON_DIR:o.commonDir},...o!==void 0&&(o.workTree!==null?{GIT_WORK_TREE:o.workTree}:{GIT_IMPLICIT_WORK_TREE:"0"}),...r}),s={};for(let c of HSt)s[c]=void 0;let u=new Set(Object.keys(i).map((c)=>c.toUpperCase()));for(let c of Object.keys(n)){let p=c.toUpperCase();if(qe.has(p)||tKt.test(c)||u.has(p)&&!(c in i))s[c]=void 0}return{...n,...s,...i}};
function et(e){let r=e.GIT_ALLOW_PROTOCOL;if(r===void 0)return{...e};let n=r.split(":").filter((c)=>c!=="/");if(n.find((c)=>!/^[A-Za-z0-9-]*$/.test(c))!==void 0)throw Error('GIT_ALLOW_PROTOCOL may list only transport names made of letters, digits and "-"');let i=[...new Set([...ue,...n.flatMap((c)=>[`'alias.remote-${c}=version'`,`'alias.remote-${c}.command=version'`])])],s=e.GIT_CONFIG_PARAMETERS;return{...e,GIT_CONFIG_PARAMETERS:[...s===void 0||s===""||s===le?[]:[s],...i].join(" ")}};
function nt(e){let o=(c)=>c.replaceAll('"',""),i=(c)=>/^(?:[A-Za-z]:[\\/]|[\\/]{2})/.test(c),s=(c)=>{if(c===void 0)return;let p=c.split(";").map(o).filter((f)=>f!==""&&i(f));return p.length>0?p.join(";"):"\\\\.\\nul"},u=Object.keys(e).filter((c)=>c.toUpperCase()==="PATH");return{...e,...Object.fromEntries(u.map((c)=>[c,s(e[c])]))}};return{environment:Qo,ignoreSubmodules:Hb};}
const environments={"darwin-arm64":environment0,"darwin-x64":environment1,"linux-x64":environment2,"linux-arm64":environment3,"win32-x64":environment4,"win32-arm64":environment5};
export function createGitEnvironment287(ports){return environments[ports.platform+'-'+ports.architecture](ports);}
export function createGitContext287(ports){const {ne,Kx,y,sd,_T,Ke,vt,Qo,$a,Ue,wt,p,t,l,a,oHt,$S}=ports;var EEe=2000;
var N0n=["--no-optional-locks","status","--short",$S];
async function V2n(){let e=Date.now();ne("info","git_status_started");let n=Date.now(),r=await Kx();if(ne("info","git_is_git_check_completed",{duration_ms:Date.now()-n,is_git:r}),!r)return ne("info","git_status_skipped_not_git",{duration_ms:Date.now()-e}),y("context_git_detect"),null;try{let s=Date.now(),[g,h,b,w,D]=await Promise.all([sd(),_T(),Ke(vt(),[...N0n],{preserveOutputOnError:!1,env:Qo()}).then(({stdout:K})=>K.trim()),Ke(vt(),["--no-optional-locks","log","--oneline","-n","5"],{preserveOutputOnError:!1,env:Qo()}).then(({stdout:K})=>K.trim()),Ke(vt(),["config","user.name"],{preserveOutputOnError:!1,env:Qo()}).then(({stdout:K})=>K.trim())]);ne("info","git_commands_completed",{duration_ms:Date.now()-s,status_length:b.length});let j=$a()?Ue:wt,z=b.length>EEe?b.substring(0,EEe)+`
... (truncated because it exceeds 2k characters. If you need more information, run "git status" using ${j})`:b;return ne("info","git_status_completed",{duration_ms:Date.now()-e,truncated:b.length>EEe}),y("context_git_detect"),["This is the git status at the start of the conversation. Note that this status is a snapshot in time, and will not update during the conversation.",`Current branch: ${g}`,`Main branch (you will usually use this for PRs): ${h}`,...D?[`Git user: ${D}`]:[],`Status:
${z||"(clean)"}`,`Recent commits:
${w}`].join(`

`)}catch(s){return ne("error","git_status_failed",{duration_ms:Date.now()-e}),p("context_git_detect","git_cmd_failed"),t(`Failed to get git status for system context: ${l(s)}`,{level:"error"}),null}};
function Exr(){return!a.CLAUDE_CODE_REMOTE&&oHt()};return{build:V2n,include:Exr};}
