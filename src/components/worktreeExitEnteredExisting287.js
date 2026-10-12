import {dirname} from 'node:path';import {homedir} from 'node:os';
// Complete original stateless Sye/CAe/lq/Vm closures; all writes borrow existing canonical cells.
export function createEnteredExistingExit287(read,storage,projectSetter,worktreeState){
const at=(...args)=>read("chunk-c9me9cp7.js","at")(...args);
const oB=(...args)=>read("chunk-x954y317.js","oB")(...args);
const h$=(...args)=>read("chunk-q80zaav8.js","h$")(...args);
const zf=(...args)=>read("chunk-q80zaav8.js","zf")(...args);
const t=(...args)=>read("chunk-q80zaav8.js","t")(...args);
const lr=(...args)=>read("chunk-2ynta9xc.js","lr")(...args);
const Uc=(...args)=>read("chunk-nankzm0s.js","Uc")(...args);
const Wt=worktreeState;
function T_t(e){Wt().setCurrentSession(e)}
const $f=(...args)=>read("chunk-nankzm0s.js","$f")(...args);
const on=(...args)=>read("chunk-b5kmgz2n.js","on")(...args);
const cd=(...args)=>read("chunk-7fkv6k8a.js","cd")(...args);
const OQn=(...args)=>read("os","homedir")(...args);
function vT(e){projectSetter(e)}
const Rf=(...args)=>read("chunk-mphp7acd.js","Rf")(...args);
const X_=(...args)=>read("chunk-epk29mef.js","X_")(...args);
const Kl=new Proxy({}, {get:(_,key)=>read('chunk-epk29mef.js','Kl')[key]})
const DMe=(...args)=>read("chunk-s6vr35c0.js","DMe")(...args);
const JVe=(...args)=>read("chunk-s6vr35c0.js","JVe")(...args);
const RCe=(...args)=>read("chunk-s6vr35c0.js","RCe")(...args);
const hpo=dirname
const ypo=homedir
const YDt=(...args)=>read('chunk-mphp7acd.js','YDt')(...args);
const requireOriginal287=(path)=>{if(path!=='/$bunfs/root/chunk-waq70p5c.js')throw Error('Unknown storage namespace '+path);return storage;};
function lq(e,n){T_t(e);let r=e!==null?(()=>{let{liveLaunchAnchor:s,originalChangeset:g,...h}=e;return h})():void 0;$f((s)=>({...s,activeWorktreeSession:r}),n)}
function CAe(e,n){if(!h$(e))return e;return oB(n)??OQn()}
async function Sye(e){let n=Uc();if(!n)return;try{let{worktreePath:r,originalCwd:s,worktreeBranch:g}=n,h=CAe(s,r),b=lr(h)??h;try{zf(h)}catch(w){t(`Could not chdir to original directory while keeping worktree: ${w}`)}if(!n.enteredExisting&&!n.hookBased)await YDt(r,b);lq(null,e),t(`Linked worktree preserved at: ${r}${g?` on branch: ${g}`:""}`),t(`You can continue working there by running: cd ${r}`)}catch(r){t(`Error keeping worktree: ${r}`,{level:"error"})}}
function qH(){return requireOriginal287("/$bunfs/root/chunk-waq70p5c.js")}
async function Vm(h,v){let{originalCwd:D,preEnterOriginalCwd:N,liveLaunchAnchor:X}=h,Se=h$(D)?ypo():D;while(!0)try{zf(Se),Rf(Se);break}catch{let Pe=hpo(Se);if(Pe===Se)break;Se=Pe}let _e=Se!==D;if(_e)t(`Original directory ${D} no longer exists \u2014 returned to ${Se} instead`,{level:"warn"});if(!_e){let Pe=N??D;if(X===void 0||RCe(Pe,DMe(X,h.worktreePath),{requireCovered:!0,coveredWitnesses:JVe(X,h.worktreePath),extraCoveredRoots:(()=>{let Ie=oB(h.worktreePath);return Ie!==null?[Ie]:[]})()}))vT(Pe);try{await qH().relocateSessionTranscript(v)}catch(Ie){qH().reportRelocateSessionTranscriptFailure(Ie,"WorktreeExitDialog")}}qH().saveWorktreeState(null,v),Kl.cache.clear?.(),X_(v)}
return async(session,storageV5)=>{if(session?.enteredExisting!==true)throw Error('Entered-existing exit requires its actual WorktreeSession');await Sye(storageV5);await Vm(session,storageV5);return `Returned to ${session.originalCwd} (worktree at ${session.worktreePath} left in place)`;};
}
