// Official npm 2.1.286 complete declarations, no body rewriting.
export function createSecureAtomicPublisher({Fe,I,L,Pe,Z,a,be,ie,oe,process,v,ve,x}){
class P extends Error{telemetryMessage;errorClass;constructor(n,e,t){super(n);this.name="TelemetrySafeError",this.telemetryMessage=e??n,this.errorClass=t}}
async function Dn(e,t,n,r){return Poe(e,t,{mode:n,renameFn:r})}
async function Poe(e,t,n){let{mode:r,createMode:o,exactMode:i,flush:s,followSymlinks:f,inPlaceOnTempCreateRefused:c,stagingDir:g,renameFn:w,beforePublish:y}=n,F=r??o,k=()=>{if(y!==void 0&&!y())throw new Jwn(e)},E=await Me(e,g),A=f===!0?0:a.O_NOFOLLOW,m,b=!1,Y=!1,K=async(p)=>{let l=await We(e,f===!0),h=l.kind==="snapshot"?l:void 0;k();let u=await L(e,a.O_WRONLY|a.O_CREAT|A|mQ,i??F),S;try{S=await u.stat()}catch(T){throw await u.close().catch(()=>{}),b=p!==void 0,R(T,p,"untouched")}let d=S.isCharacterDevice();if(!S.isFile()&&!d)throw await u.close().catch(()=>{}),Object.assign(Error("refusing the in-place arm on a non-regular target"),{code:"ENXIO",path:e});if(!d&&S.nlink>1&&Ywn())throw await u.close().catch(()=>{}),ae(e,S.nlink);if(y!==void 0&&!y()){if(await u.close().catch(()=>{}),l.kind==="absent"&&S.size===0&&!d)await x(e).catch(()=>{});throw new Jwn(e)}let G=!1;try{if(!d)await u.truncate(0),G=!0;await u.writeFile(t,{encoding:"utf8"});let T=d?void 0:i??(l.kind!=="absent"?r:void 0);if(T!==void 0)await u.chmod(T).catch(()=>{});if(s===!0)try{await u.sync()}catch(M){if(!dIe(M))throw M}await u.close()}catch(T){if(await u.close().catch(()=>{}),!G)throw b=p!==void 0,R(T,p,"untouched");b=p!==void 0;let pe=h!==void 0&&await Ye(e,h,f===!0)?"restored":await x(e).then(()=>!0,(Ee)=>v(Ee)==="ENOENT")?"removed":"partial";throw R(T,p,pe)}let z=p??m;if(z!==void 0)await x(z).catch(()=>{})};try{try{if(i!==void 0||s===!0){let l=await De(E,i??F),h=l.fh;m=l.tmp;let u=!1,S;try{if(await h.writeFile(t,{encoding:"utf8"}),i!==void 0)try{await h.chmod(i)}catch(d){if(!dIe(d))throw d}if(s===!0)try{await h.sync()}catch(d){if(!dIe(d))throw d}}catch(d){u=!0,S=d}if(!u)Y=!0;try{await h.close()}catch(d){if(!u)throw b=!0,R(d,m,"untouched")}if(u)throw S}else m=await gF(E,t,F),Y=!0}catch(l){if(c!==!0)throw l;if(Y)throw l;if(v(l)!=="EACCES")throw l;if(!await Pe(e).then(()=>!0,()=>!1))throw l;await K(void 0);return}if(m===void 0)throw Error("staging block exited without a staging file");let p=m;try{let l=w??ie;await cs(p,e,(h,u)=>(k(),l(h,u)))}catch(l){let h=v(l);if(h===void 0||!kC.has(h))throw l;await K(p)}}catch(p){if(m!==void 0&&!b)await x(m).catch(()=>{});throw p}}
class Jwn extends Error{target;constructor(e){super("beforePublish refused the write; nothing was published");this.target=e;this.name="PublishRefusedError"}}
async function Me(e,t){if(t===void 0)return e;try{await(await L(t,a.O_RDONLY|a.O_DIRECTORY|a.O_NOFOLLOW)).close()}catch(n){switch(v(n)){case"ENOENT":case"ELOOP":case"ENOTDIR":return e;case"EACCES":case"EPERM":if(await Ue(t))return e;throw n;default:throw n}}return ve(t,Fe(e))}
async function We(e,t=!1){if(!t&&!await fe(e,!0))return{kind:"unavailable"};let n;try{n=await L(e,a.O_RDONLY|(t?0:a.O_NOFOLLOW)|mQ)}catch(r){return v(r)==="ENOENT"?{kind:"absent"}:{kind:"unavailable"}}try{let r=await n.stat();if(!r.isFile()||r.size>ue)return{kind:"unavailable"};return{kind:"snapshot",bytes:new Uint8Array(await n.readFile()),mode:r.mode&4095}}catch{return{kind:"unavailable"}}finally{await n.close().catch(()=>{})}}
var mQ=a.O_NONBLOCK;
function R(e,t,n){try{if(e instanceof Error)e.message=`${e.message}; ${t!==void 0?`new contents preserved at ${t}; `:""}${n==="restored"?"original target restored":n==="removed"?"partial target removed":n==="untouched"?"target untouched":"target left partial \u2014 treat contents as torn"}`,Object.assign(e,{...t!==void 0&&{preservedTmp:t},targetOutcome:n})}catch{}return e}
function Ywn(){return oZn({served:!1})}
function ae(e,t){return Object.assign(new P(g5r(e,t),"in-place write refused: the target has other names (a hard link)"),{code:"EMLINK",path:e})}
function dIe(e){let t=v(e);return t==="EINVAL"||t==="ENOTSUP"||t==="EPERM"||t==="ENOSYS"}
async function Ye(e,t,n=!1){if(!n&&!await fe(e,!0))return!1;let r;try{r=await L(e,a.O_WRONLY|a.O_CREAT|a.O_TRUNC|(n?0:a.O_NOFOLLOW)|mQ,t.mode)}catch{return!1}try{if(!(await r.stat()).isFile())return await r.close().catch(()=>{}),!1;return await r.writeFile(t.bytes),await r.chmod(t.mode).catch(()=>{}),await r.close(),!0}catch{return await r.close().catch(()=>{}),!1}}
async function De(e,t,n="darwin"){return j(e,n,async(r)=>({fh:await L(r,n==="win32"?"wx":a.O_WRONLY|a.O_CREAT|a.O_EXCL,t),tmp:r}))}
async function gF(e,t,n,r="darwin"){return j(e,r,async(o)=>{try{return await oe(o,t,{encoding:"utf8",mode:n,flag:"wx"}),o}catch(i){if(v(i)!=="EEXIST")await x(o).catch(()=>{});throw i}})}
function cs(e,t,n=ie){return xG(()=>n(e,t),t)}
var kC=new Set(["EXDEV","EPERM","EEXIST","EBUSY"]);
async function Ue(e){let t=process.getuid?.();if(t===void 0)return!1;try{return(await I(e)).uid!==t}catch{return!1}}
async function fe(e,t,n="darwin"){return(await Ie(e,t,n)).kind==="pass"}
var ue=67108864;
function oZn({served:e}){if(!te())return!1;return e?!1:Ne()}
function g5r(e,t){return`Could not rewrite ${e} in place: this file has other names on disk (it is hard-linked, ${t} names in all), and writing it in place would change the file under every one of those names. Remove the extra links, then try again.`}
async function j(e,t,n){for(let r=1;;r++){let o=bP(e),i=await we(o,t);if(i!==!1){if(r<C)continue;throw W(o,i)}try{return await n(o)}catch(s){if(v(s)==="EEXIST"&&r<C)continue;throw s}}}
async function xG(e,t){let n=!1;for(let r=0;;r++)try{return await e(),n}catch(o){if(ce(o,r)){if(r===0&&t!==void 0&&await Le(t))throw o;n=!0,await Z(se);continue}throw o}}
async function Ie(e,t,n="darwin"){if(n!=="win32")return{kind:"pass"};try{return{kind:(await I(e)).isFile()?"pass":"refuse"}}catch(r){if(v(r)==="ENOENT")return{kind:t?"pass":"refuse"};return{kind:"failed",error:r}}}
function te(){return ee}
function Ne(){return!1}
function bP(e){return`${e}.tmp.${be(4).toString("hex")}`}
async function we(e,t){if(t!=="win32")return!1;try{return await I(e),!0}catch(n){return v(n)==="ENOENT"?!1:{cause:n}}}
var C=3;
function W(e,t){return Object.assign(Error("EEXIST: name already taken (exclusive create)",typeof t==="object"?{cause:t.cause}:void 0),{code:"EEXIST",syscall:"lstat",path:e})}
function ce(e,t){return!1}
async function Le(e){try{return((await I(e)).mode&le)===0}catch{return!1}}
var se=50;
var ee=!1;
var le=128;
return {write:Dn,publish:Poe};
}
export function createSecureStorageState({cn,i,j,l,o,process,u,we}){
class q{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
var Mue="-credentials";
function zS(){let e=process.env.CLAUDE_SECURESTORAGE_CONFIG_DIR;if(e!==void 0)return(e||u(o(),".claude")).normalize("NFC");return we()}
function QN(e=""){let n=process.env.CLAUDE_SECURESTORAGE_CONFIG_DIR,t=n!==void 0?!n:!process.env.CLAUDE_CONFIG_DIR,r=n!==void 0?n.normalize("NFC"):we(),c=t?"":`-${i("sha256").update(r).digest("hex").substring(0,8)}`;return`Claude Code${cn().OAUTH_FILE_SUFFIX}${e}${c}`}
var s=/^[a-zA-Z0-9._-]+$/;
function ok(){let e;try{e=process.env.USER||l().username}catch{e="claude-code-user"}if(!s.test(e))return"claude-code-user";return e}
var Rht=30000;
class a{cache={data:null,cachedAt:0};generation=0;readInFlight=null;lastReadFailure=null;keychainHoldsItem=!1;lastKnown=null;legacyApiKeyPrefetch=null}
var d=new q(()=>new a);
function yG(){return d.of(j().host)}
var vVr=1000;
function _Go(){let e=yG();e.cache={data:e.cache.data,cachedAt:0},e.generation++,e.readInFlight=null,e.lastReadFailure=null}
function pP(){let e=yG();e.cache={data:null,cachedAt:0},e.generation++,e.readInFlight=null,e.lastReadFailure=null}
function SGo(e,n,t=yG()){if(t.cache.cachedAt!==0||t.generation!==n)return;let r=null;if(e)try{r=JSON.parse(e)}catch{return}t.cache={data:r,cachedAt:Date.now()}}
function ujt(e,n,t){if(e.generation===t)e.keychainHoldsItem=n}
return {serviceSuffix:Mue,home:zS,serviceName:QN,username:ok,ttl:Rht,state:yG,failureTtl:vVr,expire:_Go,invalidate:pP,prime:SGo,holdsItem:ujt};
}
export function createSecureStorageCore({Dn,F,J,Qi,S,Z,ae,j,l,m,ne,p,re,t,v,y,z,zS}){
class q{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
var Wa=Symbol("secureStorage.READ_FAILED");
var D=new z;
var k=Promise.resolve();
async function gVr(e){if(D.getStore())return e();let r=k,n;k=new Promise((s)=>{n=s});try{await r;let s=zS();await ae().mkdir(s);let a=await Qi(Z(s,".storage-write"),{realpath:!1,retries:{retries:10,minTimeout:100,maxTimeout:1000},stale:15000,onCompromised:(o)=>t(`[secureStorage] write lock compromised: ${l(o)}`,{level:"warn"})});try{return await D.run(!0,e)}finally{await a().catch((o)=>t(`[secureStorage] write lock release failed: ${l(o)}`,{level:"warn"}))}}finally{n()}}
async function uGo(e){return D.run(!0,e)}
function d(e,r,n){return gVr(async()=>{e.invalidateCache?.();let s=await(e.readAsyncStrict?.(n,{inaccessibleAs:"failureIfTransient"})??e.readAsync(n));if(s===Wa)return p("secure_storage_credentials_write","read_failed_skip_write"),{success:!1,transient:!0};let a=s??{},o=r(a);return o===a?{success:!0}:await e.update(o,n)})}
var Q=Symbol("secureStorage.fallbackLegs");
function b(e,r){let n=r.osGuarded===!0?(a)=>a:ee,s={name:`${e.name}-with-${r.name}-fallback`,[Q]:[e,r],osGuarded:e.osGuarded===!0,read(a){let o=e.read(a);if(o!==null&&o!==void 0)return o;return n(r.read(a))||{}},async readAsync(a){let o=await e.readAsync();if(o!==null&&o!==void 0)return o;return n(await r.readAsync(a))||{}},async readAsyncStrict(a,o){let i=await(e.readAsyncStrict?.(void 0,o)??e.readAsync());if(i===Wa)return Wa;if(i!==null||o?.inaccessibleAs==="failure")return i;let c=await(r.readAsyncStrict?.(a,o)??r.readAsync(a));return c===Wa?c:n(c)||{}},invalidateCache(){e.invalidateCache?.(),r.invalidateCache?.()},mutate(a,o){return d(s,a,o)},async update(a,o){let i=await e.readAsync(),c=await e.update(a);if(c.success){if(i===null)await r.delete(o);return y("secure_storage_credentials_write"),c}if(c.transient)return p("secure_storage_credentials_write",c.keychainLocked?"keychain_locked_skip_fallback":"primary_transient_skip_fallback"),c;let O=await r.update(a,o);if(O.success){if(i!==null)await e.delete();return p("secure_storage_credentials_write","plaintext_fallback_used"),{success:!0,warning:O.warning}}return m("secure_storage_credentials_write","primary_and_fallback_failed"),{success:!1}},async delete(a){let o=await r.readAsync(a)!==null,[i,c]=await Promise.all([e.delete(),r.delete(a)]);return i||o&&c}};return s}
function ee(e){let r=e?.slackTag;if(typeof r!=="object"||r===null||!("lastBinding"in r))return e;let{lastBinding:n,...s}=r;return{...e,slackTag:s}}
function u(){let e=zS(),r=".credentials.json";return{storageDir:e,storagePath:ne(e,".credentials.json")}}
var r7n="Warning: Storing credentials in plaintext.";
function oe(e,r){if(e==="ENOENT"||e==="EISDIR"||e==="ENOTDIR")return null;if((e==="EACCES"||e==="EPERM")&&r!=="win32")return null;return Wa}
function se(e,r){return e==="ENOENT"?null:Wa}
var ie={async read(){let{storagePath:e}=u();try{let r=await ae().readFile(e,{encoding:"utf8"});return J(r)}catch{return null}},async readStrict(e){let{storagePath:r}=u(),n;try{n=await ae().readFile(r,{encoding:"utf8"})}catch(s){return(e?se:oe)(v(s),"darwin")}try{return J(n)}catch{if(e)return Wa;return null}},async write(e){try{let{storageDir:r,storagePath:n}=u();return await ae().mkdir(r),await Dn(n,S(e),384),await re(n,384),{success:!0,warning:r7n}}catch{return{success:!1}}finally{if(F())USe()}},async remove(){let{storagePath:e}=u();try{return await ae().unlink(e),!0}catch(r){if(v(r)==="ENOENT")return!0;return!1}finally{if(F())USe()}}};
function ce(e){switch(e.state){case"present":return e.data;case"absent":case"corrupt":return null;case"refused-symlink":case"read-failed":return Wa;default:{let r=e;return Wa}}}
function ue(e){return{async read(){let{storagePath:r}=u(),n=E(),s=n.generation,a=await C(e.readCredentials(),n);return U(n,a,r,s),a.state==="present"?a.data:null},async readStrict(r){let{storagePath:n}=u(),s=E(),a=s.generation,o=await C(r?e.readCredentials():e.readCredentialsStrict(),s);if(U(s,o,n,a),r)return o.state==="present"?o.data:o.state==="absent"?null:Wa;return ce(o)},async write(r){let{storagePath:n}=u(),s=E(),a=s.generation,o=await C(e.writeCredentials(r),s);if(o.state==="written"&&a===s.generation)R(s,n,S(r));else f(s);return o.state==="written"?{success:!0,warning:r7n}:{success:!1}},async remove(){let{storagePath:r}=u(),n=E(),s=n.generation,a=await C(e.deleteCredentials(),n);if(a.state==="deleted"&&s===n.generation)R(n,r,null);else f(n);return a.state==="deleted"}}}
async function C(e,r){try{return await e}catch(n){throw f(r),n}}
class B{copy=void 0;generation=0}
var le=new q(()=>new B);
function E(){return le.of(j().host)}
function R(e,r,n){e.copy={storagePath:r,text:n},e.generation++}
function U(e,r,n,s){if(s!==e.generation){f(e);return}switch(r.state){case"present":R(e,n,S(r.data));return;case"absent":case"corrupt":case"refused-symlink":R(e,n,null);return;case"read-failed":f(e);return;default:{let a=r;f(e)}}}
function f(e){e.copy=void 0,e.generation++}
function USe(){f(E())}
function A(e){return F()&&e!==void 0?ue(e):ie}
var w={name:"plaintext",osGuarded:!1,read(e){let{storagePath:r}=u();try{let n=F()&&e?.fromStoreCopy===!0?E().copy:void 0;if(n!==void 0&&n.storagePath===r){if(n.text===null)return null;return JSON.parse(n.text)}let s=ae().readFileSync(r,{encoding:"utf8"});return J(s)}catch{return null}},invalidateCache(){USe()},readAsync(e){return A(e).read()},readAsyncStrict(e,r){return A(e).readStrict(r?.unreadableFileAs==="failure")},mutate(e,r){return d(w,e,r)},update(e,r){return A(r).write(e)},delete(e){return A(e).remove()}};
return {readFailed:Wa,fallbackLegs:Q,mutate:d,withWriteLock:gVr,alreadyLocked:uGo,createFallback:b,plaintext:w,copyState:E,clearCopy:USe};
}
export function createSecureKeychain({J,Mue,QN,Rht,S,Tbe,Wa,_m,d,ok,pP,qe,t,ujt,vVr,yG}){
var g=2000;
var te=4032;
var L=44;
var M=36;
var I={name:"keychain",osGuarded:!0,read(){let e=yG(),r=e.cache;if(Date.now()-r.cachedAt<Rht)return r.data;let n=e.lastReadFailure;if(n!==null&&Date.now()-n<vVr)return r.data;try{let s=QN(Mue),a=ok(),o=Tbe(`security find-generic-password -a "${a}" -w -s "${s}"`,{timeout:g});if(o){e.keychainHoldsItem=!0;let i=J(o);return e.cache={data:i,cachedAt:Date.now()},i}}catch(s){}if(r.data!==null)return t("[keychain] read failed; serving stale cache",{level:"warn"}),e.cache={data:r.data,cachedAt:Date.now()},r.data;return e.cache={data:null,cachedAt:Date.now()},null},async readAsync(){let e=yG(),r=e.cache;if(Date.now()-r.cachedAt<Rht)return r.data;if(e.readInFlight)return e.readInFlight;let n=e.lastReadFailure;if(n!==null&&Date.now()-n<vVr)return null;let s=e.generation,a=x(e).then((o)=>{if(s!==e.generation)return o===Wa?null:o;if(e.readInFlight=null,o===Wa){if(t("[keychain] readAsync failed; not caching a null",{level:"warn"}),e.lastReadFailure=Date.now(),r.data!==null)e.cache={data:r.data,cachedAt:Date.now()};return r.data}let i=o??r.data;return e.cache={data:i,cachedAt:Date.now()},e.lastReadFailure=null,i});return e.readInFlight=a,a},async readAsyncStrict(e,r){let n=yG(),s=n.generation,a=await x(n,r);if(a!==Wa&&s===n.generation)n.cache={data:a??n.cache.data,cachedAt:Date.now()},n.lastReadFailure=null;return a},invalidateCache(){pP()},mutate(e){return d(I,e)},async update(e){let r=yG();pP();try{let n=QN(Mue),s=ok(),a=S(e),o=Buffer.from(a,"utf-8").toString("hex"),i=`add-generic-password -U -a "${s}" -s "${n}" -X "${o}"
`,c;if(i.length<=te)c=await _m("security",["-i"],{input:i,stdio:["pipe","pipe","pipe"],reject:!1,timeout:g});else t(`Keychain payload (${a.length}B JSON) exceeds security -i stdin limit; using argv`,{level:"warn"}),c=await _m("security",["add-generic-password","-U","-a",s,"-s",n,"-X",o],{stdio:["ignore","pipe","pipe"],reject:!1,timeout:g});if(c.exitCode!==0){if(c.exitCode===M&&r.keychainHoldsItem)return{success:!1,transient:!0,keychainLocked:!0};return{success:!1,transient:c.timedOut}}return r.keychainHoldsItem=!0,r.cache={data:e,cachedAt:Date.now()},r.generation++,r.readInFlight=null,{success:!0}}catch(n){return{success:!1}}},async delete(){let e=yG();pP();try{let r=QN(Mue),n=ok(),{code:s}=await qe("security",["delete-generic-password","-a",n,"-s",r],{timeout:g,useCwd:!1});if(s===0||s===L)e.keychainHoldsItem=!1;return e.generation++,e.readInFlight=null,!0}catch(r){return!1}}};
async function x(e,r){let n=e.generation;try{let s=QN(Mue),a=ok(),{stdout:o,code:i}=await qe("security",["find-generic-password","-a",a,"-w","-s",s],{useCwd:!1,preserveOutputOnError:!1,timeout:g});if(i===0&&o)return ujt(e,!0,n),J(o.trim());if(i===L)return ujt(e,!1,n),null;if(i===0)return null;if(i===M)switch(r?.inaccessibleAs??"absent"){case"absent":return null;case"failure":return Wa;case"failureIfTransient":return e.keychainHoldsItem?Wa:null}return Wa}catch(s){return null}}
var h;
function hVr(){if(h!==void 0)return h;return h=_m("security",["show-keychain-info"],{reject:!1,stdio:["ignore","pipe","pipe"],timeout:g}).then((e)=>e.exitCode===36).catch(()=>!1),h}
return {storage:I,isLocked:hVr};
}
