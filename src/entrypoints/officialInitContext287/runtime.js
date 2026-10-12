// Generated from verified official 2.1.287 raw closures. No backend/cache/pin state is created here.
export function createOfficialInitStorageContext287(ports){
 const {F,U7o,t,we,a,k,tResolve}=ports;
 const tPath=tResolve;
 // Original Zfe imports path.resolve as t; keep its complete declaration in a separate lexical scope.
 const Zfe=(()=>{const t=tPath;function Zfe(e){return t(we())===t(e)};return Zfe})();
 function Yzr(e=$7n){let o=a.CLAUDE_CODE_HOVER_REST;if(o===void 0)return;if(F7n(o)!=="pinned")return;return{backend:F()?e():void 0,configHome:we()}};
function Xzr(e){let o=F()?e.backend:void 0;if(o===void 0)return;if(!Zfe(e.configHome)){t(`CLAUDE_CONFIG_DIR now names ${we()}, not ${e.configHome} where the v5 storage backend was built at start-up; not handing it on, so this process keeps today's direct file access`,{level:"warn"});return}return o};
function F7n(e){if(typeof e!=="boolean")t(`tengu_hover_rest served a ${typeof e}, not a boolean; treating it as off`,{level:"warn"});let o=U7o(e);if(o==="conflict")t(`tengu_hover_rest read ${String(e)} at a second pin in this process; keeping the first decision`,{level:"warn"});return o};
function $7n(){if(!F())return;return};
 function jD(e){if(F7n(a.CLAUDE_CODE_HOVER_REST??k("tengu_hover_rest",!1)),e===void 0)return F()?$7n():void 0;return Xzr(e)};
 return {prepare(e={}){let r=e.storageV5EnvPin;if(r?.backend!==void 0&&!Zfe(r.configHome))t(`CLAUDE_CONFIG_DIR no longer names ${r.configHome}, where the v5 storage backend was built at start-up; init() loads its config without it`,{level:"warn"}),r={...r,backend:void 0};r??=Yzr();return r},adopt:jD,fromEnv:Yzr};
}
export function createOfficialInitCredentials287(ports){
 const {E,F,_,ae,Kse,yb,s,b,h,p,H,L,D,B}=ports;
 var nzt=65536;
 function f(){let e=yb();return{storeDir:e,storePath:B(e,".credentials.json")}};
var N=s.O_NONBLOCK;
var c=1048576;
async function P(e){try{return{kind:"open",fileHandle:await p(e,s.O_RDONLY|s.O_NOFOLLOW|N)}}catch(r){let n=E(r);if(n==="ELOOP")return{kind:"refused-symlink"};return{kind:"error",code:n}}};
async function v(e,r){let n=s.O_WRONLY|s.O_CREAT|s.O_TRUNC;try{return{kind:"open",fileHandle:await p(e,n|s.O_NOFOLLOW,r)}}catch(t){let a=E(t);if(a==="ELOOP")return{kind:"refused-symlink"};return{kind:"error",code:a}}};
function S(e){return e.length>0&&!e.includes("\x00")&&D(e)};
var A=new Set([".oauth_token",".api_key",".session_ingress_token"]);
function m(e){return e==="ENOENT"?{state:"absent"}:{state:"read-failed",code:e}};
function w(e){return e==="ENOENT"?"absent":"read-failed"};
function I(e,r){if(e==="ENOENT"||e==="EISDIR"||e==="ENOTDIR")return"absent";if((e==="EACCES"||e==="EPERM")&&r!=="win32")return"absent";return"read-failed"};
async function R(e){let{storePath:r}=f(),n=await P(r);switch(n.kind){case"refused-symlink":return{state:"refused-symlink"};case"error":return e(n.code)==="absent"?{state:"absent"}:{state:"read-failed",code:n.code};case"open":{let{fileHandle:t}=n,a,l,C;try{let o=await t.stat();if(!o.isFile()){if(o.isDirectory())return e("EISDIR")==="absent"?{state:"absent"}:{state:"read-failed",code:"EISDIR"};return{state:"corrupt"}}if(o.size>c)return{state:"corrupt"};l=o.uid,C=o.mode;let i=Buffer.alloc(Math.min(o.size,c)+1),d=0;for(;;){let{bytesRead:g}=await t.read(i,d,i.length-d,d);if(g===0)break;if(d+=g,d===i.length){if(i.length>c)return{state:"corrupt"};let O=Buffer.alloc(c+1);i.copy(O,0,0,d),i=O}}a=i.toString("utf8",0,d)}catch(o){let i=E(o);return e(i)==="absent"?{state:"absent"}:{state:"read-failed",code:i}}finally{await t.close().catch(()=>{})}let u;try{u=JSON.parse(a)}catch{return{state:"corrupt"}}if(u===null)return{state:"absent"};return{state:"present",data:u,uid:l,mode:C}}}};
var y={readCredentials(){return R(w)},readCredentialsStrict(){return R((e)=>I(e,"darwin"))},async writeCredentials(e){let{storeDir:r,storePath:n}=f();try{await ae().mkdir(r),await Kse(n,_(e),{mode:384,exactMode:384})}catch(t){return{state:"write-failed",code:E(t)}}return{state:"written"}},async deleteCredentials(){let{storePath:e}=f();return k(e)},async discardSpentCredentialFile(e){return k(e)},async readHandoffCredential(e,{symlinkAtPath:r}){if(!S(e))return{state:"read-failed",code:"EINVAL"};let n;if(r==="follow")try{n=await p(e,s.O_RDONLY|N)}catch(t){return m(E(t))}else{let t=await P(e);switch(t.kind){case"refused-symlink":return{state:"read-failed",code:"ELOOP"};case"error":return m(t.code);case"open":n=t.fileHandle}}try{if(!(await n.stat()).isFile())return{state:"read-failed",code:"EINVAL"};let t=Buffer.alloc(nzt+1),a=0;for(;;){let{bytesRead:l}=await n.read(t,a,t.length-a,a);if(l===0)break;if(a+=l,a>nzt)return{state:"read-failed",code:"EFBIG"}}return{state:"present",contents:t.toString("utf8",0,a)}}catch(t){return m(E(t))}finally{await n.close().catch(()=>{})}},async writeHandoffCredential(e,r){if(!S(e))return{state:"write-failed",code:"EINVAL"};if(!A.has(H(e)))return{state:"write-failed",code:"EINVAL"};try{await h(L(e),{recursive:!0,mode:448})}catch(t){return{state:"write-failed",code:E(t)}}let n=await v(e,384);switch(n.kind){case"refused-symlink":return{state:"write-failed",code:"ELOOP"};case"error":return{state:"write-failed",code:n.code};case"open":try{return await n.fileHandle.writeFile(r,{encoding:"utf8"}),{state:"written"}}catch(t){return{state:"write-failed",code:E(t)}}finally{await n.fileHandle.close().catch(()=>{})}}},async probeCredentials(){let{storePath:e}=f(),r;try{r=await b(e,{bigint:!0})}catch(n){let t=E(n);return w(t)==="absent"?{state:"absent"}:{state:"read-failed",code:t}}if(r.isSymbolicLink())return{state:"read-failed",code:"ELOOP"};return{state:"present",version:`${r.dev}:${r.ino}:${r.size}:${r.mtimeNs}`}}};
async function k(e){try{return await ae().unlink(e),{state:"deleted"}}catch(r){let n=E(r);if(n==="ENOENT")return{state:"deleted"};return{state:"delete-failed",code:n}}};
var T=Symbol("secureStorage.CredentialsStoreHandle");
function bx(e,r=y){return F()&&e!==void 0?W(r):void 0};
function W(e=y){return{...e,[T]:"CredentialsStoreHandle"}};
 return bx;
}
export function createOfficialInitCallerContext287(ports){
 const {jD,bx,pqr,d}=ports;
 return {adopt(r){let n=jD(r),p=bx(n);return {storageV5:n,credentials:p}},populate({storageV5:n,credentials:p}){return pqr(p,n).catch(d)}};
}
