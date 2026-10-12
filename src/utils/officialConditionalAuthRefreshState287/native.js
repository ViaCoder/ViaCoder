// Complete original 2.1.287 state/reset closures. Conditional provider refresh is a source port, not a backend.
export function createConditionalAuthRefreshState287(ports){
const {U,_,a,gK,l,t}=ports;
class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}};
class ll{runs=new Map;userWaits=()=>!1;isWaiting(){for(let e of this.runs.values())if(e.control.waiting&&!e.cancel.signal.aborted)return!0;return!1}askTakeover(){for(let e of this.runs.values())if(e.control.waiting&&!e.cancel.signal.aborted)e.control.takeoverAsked=!0}};
function qr(){return!a.CLAUDE_CODE_DISABLE_AUTH_REFRESH_LOCK};
class ul{withStop=0;withoutStop=0;userTurns=0;stop=new AbortController;stoppedWhileWaiting=!1;takeoverForNextRun;singleFlight;constructor(e){this.singleFlight=e,e.userWaits=()=>this.userTurns>0}get signal(){return this.stop.signal}hasCallers(){return this.withStop+this.withoutStop>0}takeTakeover(){let e=this.takeoverForNextRun!==void 0;return this.takeoverForNextRun=void 0,e}clearTakeover(){this.stoppedWhileWaiting=!1,this.takeoverForNextRun=void 0}noteStop(){if(!this.singleFlight.isWaiting())return;this.stoppedWhileWaiting=!0}wait(e,{signal:n,userTurn:r},s){if(!qr())return e();if(n?.aborted)return Promise.resolve(s);let g=r&&n!==void 0,h;if(g&&this.stoppedWhileWaiting)if(this.stoppedWhileWaiting=!1,this.singleFlight.isWaiting())this.singleFlight.askTakeover();else h=Symbol("takeover"),this.takeoverForNextRun=h;let b=e();if(n===void 0){this.withoutStop++;let v=()=>{this.withoutStop--};return b.then(v,v),b}if(this.withStop++,g)this.userTurns++;return new Promise((v,w)=>{let A=!1,R=()=>{if(A)return!1;if(A=!0,this.withStop--,g)this.userTurns--;if(h!==void 0&&this.takeoverForNextRun===h)this.takeoverForNextRun=void 0;return n.removeEventListener("abort",M),!0},M=()=>{if(!R())return;let D=Oi(n.reason);if(g&&(D==="user-cancel"||D==="remote-cancel"||D==="interrupt"))this.noteStop();if(this.withStop===0&&this.withoutStop===0)this.stop.abort(),this.stop=new AbortController;v(s)};n.addEventListener("abort",M,{once:!0}),b.then((D)=>{if(R())v(D)},(D)=>{if(R())w(D)})})}};
class yk{lastRefreshAt=null;inFlight=null;epoch=0;signInFailures=0;singleFlight=new ll;waiters=new ul(this.singleFlight)};
var pwn=new V(()=>new yk);
function nJe(){try{let e=U().host;MWt.of(e).waiters.noteStop(),pwn.of(e).waiters.noteStop()}catch(e){t(`auth refresh: Stop not noted: ${l(e)}`,{level:"error"})}};
function rJe(){let e=pwn.of(U().host);e.lastRefreshAt=null,e.epoch++};
class kk{rejectedByApi=!1;inFlight=null;signInFailures=0;singleFlight=new ll;waiters=new ul(this.singleFlight)};
var MWt=new V(()=>new kk);
function f3r(){let e=U().host;mwn.of(e).cache.clear(),MWt.of(e).rejectedByApi=!0};
var fK=3600000;
var mwn=new V(()=>aY(async()=>await gK(),fK));
function $Qn(){return MWt.of(U().host).signInFailures};
function UQn(){return pwn.of(U().host).signInFailures};
function a_t(){let e=U().host;mwn.of(e).cache.clear(),MWt.of(e).rejectedByApi=!1};
function Oi(e){return e instanceof DOMException&&e.name==="AbortError"?e.message:e};
function aY(e,i=300000,s){let n=(o)=>typeof i==="function"?i(o):i,r=new Map,h=new Map,l=async(...o)=>{let a=_(o),f=r.get(a);if(f&&s&&!s(f.value,f.timestamp)){if(f.refreshPromise)return f.refreshPromise;r.delete(a),f=void 0}let d=Date.now();if(!f){let g=h.get(a);if(g)return g;let u=e(...o);h.set(a,u);try{let w=await u;if(h.get(a)===u)r.set(a,{value:w,timestamp:Date.now(),refreshing:!1,lifetimeMs:n(w)});return w}finally{if(h.get(a)===u)h.delete(a)}}if(f&&d-f.timestamp>f.lifetimeMs&&!f.refreshing){f.refreshing=!0;let g=f,u=e(...o);return g.refreshPromise=u,u.then((w)=>{if(r.get(a)===g)r.set(a,{value:w,timestamp:Date.now(),refreshing:!1,lifetimeMs:n(w)})}).catch((w)=>{if(t(String(w),{level:"error"}),r.get(a)===g)r.delete(a)}),f.value}return r.get(a).value};return l.cache={clear:()=>{r.clear(),h.clear()}},l};
return {pwn,mwn,MWt,rJe,a_t,nJe,f3r,$Qn,UQn};
}
