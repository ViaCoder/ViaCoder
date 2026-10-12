function module0(imports){
const n=imports["n"];
class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}};
function U(){return n()};
return {U,V};
}
function module1(imports){
function Oi(e){return e instanceof DOMException&&e.name==="AbortError"?e.message:e};
return {Oi};
}
function module2(imports){
function l(n){return n instanceof Error?n.message:String(n)};
return {l};
}
function module3(imports){
const U=imports["U"];
const V=imports["V"];
const a=imports["a"];
const Oi=imports["Oi"];
const t=imports["t"];
const l=imports["l"];
class ll{runs=new Map;userWaits=()=>!1;isWaiting(){for(let e of this.runs.values())if(e.control.waiting&&!e.cancel.signal.aborted)return!0;return!1}askTakeover(){for(let e of this.runs.values())if(e.control.waiting&&!e.cancel.signal.aborted)e.control.takeoverAsked=!0}};
function qr(){return!a.CLAUDE_CODE_DISABLE_AUTH_REFRESH_LOCK};
class ul{withStop=0;withoutStop=0;userTurns=0;stop=new AbortController;stoppedWhileWaiting=!1;takeoverForNextRun;singleFlight;constructor(e){this.singleFlight=e,e.userWaits=()=>this.userTurns>0}get signal(){return this.stop.signal}hasCallers(){return this.withStop+this.withoutStop>0}takeTakeover(){let e=this.takeoverForNextRun!==void 0;return this.takeoverForNextRun=void 0,e}clearTakeover(){this.stoppedWhileWaiting=!1,this.takeoverForNextRun=void 0}noteStop(){if(!this.singleFlight.isWaiting())return;this.stoppedWhileWaiting=!0}wait(e,{signal:n,userTurn:r},s){if(!qr())return e();if(n?.aborted)return Promise.resolve(s);let g=r&&n!==void 0,h;if(g&&this.stoppedWhileWaiting)if(this.stoppedWhileWaiting=!1,this.singleFlight.isWaiting())this.singleFlight.askTakeover();else h=Symbol("takeover"),this.takeoverForNextRun=h;let b=e();if(n===void 0){this.withoutStop++;let v=()=>{this.withoutStop--};return b.then(v,v),b}if(this.withStop++,g)this.userTurns++;return new Promise((v,w)=>{let A=!1,R=()=>{if(A)return!1;if(A=!0,this.withStop--,g)this.userTurns--;if(h!==void 0&&this.takeoverForNextRun===h)this.takeoverForNextRun=void 0;return n.removeEventListener("abort",M),!0},M=()=>{if(!R())return;let D=Oi(n.reason);if(g&&(D==="user-cancel"||D==="remote-cancel"||D==="interrupt"))this.noteStop();if(this.withStop===0&&this.withoutStop===0)this.stop.abort(),this.stop=new AbortController;v(s)};n.addEventListener("abort",M,{once:!0}),b.then((D)=>{if(R())v(D)},(D)=>{if(R())w(D)})})}};
class yk{lastRefreshAt=null;inFlight=null;epoch=0;signInFailures=0;singleFlight=new ll;waiters=new ul(this.singleFlight)};
var pwn=new V(()=>new yk);
function nJe(){try{let e=U().host;MWt.of(e).waiters.noteStop(),pwn.of(e).waiters.noteStop()}catch(e){t(`auth refresh: Stop not noted: ${l(e)}`,{level:"error"})}};
class kk{rejectedByApi=!1;inFlight=null;signInFailures=0;singleFlight=new ll;waiters=new ul(this.singleFlight)};
var MWt=new V(()=>new kk);
return {nJe,MWt,kk,ll,ul,qr,pwn,yk};
}
export function createPrintStopWaitersRuntime287(ports){
const m0=module0({"n":ports["executionContext"]});
const m1=module1({});
const m2=module2({});
const m3=module3({"U":m0["U"],"V":m0["V"],"a":ports["environment"],"Oi":m1["Oi"],"t":ports["debug"],"l":m2["l"]});
return {"noteStop":m3["nJe"],"awsStopOwner":m3["MWt"],"gcpStopOwner":m3["pwn"]};
}
