// Original 2.1.286 query event timers and byte-progress heartbeat; no function-body rewrites.
export function createOfficialEventHeartbeat286(zQ) {
let RNt=1e4;
let XOe=20000;
let zMo=90000;
let qMo=30;
function Ele(e){return e.type==="ping"}
async function*KMo(e,n,r=RNt,s=zQ){if(!n){yield*e;return}let g=e[Symbol.asyncIterator](),h=s.monotonicNow(),b=null,w,D=Symbol("heartbeat");try{while(!0){b??=g.next();let B=new Promise((K)=>{w=s.setTimeout(()=>K(D),r,{unref:!0})}),W=await Promise.race([b,B]);if(w?.(),w=void 0,W===D){if(n.lastAt>h)h=s.monotonicNow(),yield{type:"ping"};continue}if(b=null,W.done)return;h=s.monotonicNow(),yield W.value}}finally{w?.();try{Promise.resolve(g.return?.(void 0)).catch(()=>{})}catch{}}}
return {KMo,Ele,RNt,qMo}
}
export function createOfficialEventWatchdog286({D,B,lr,ms,ni,US,a,He,kOt,uWn,t,te,i,bt,wf,_}) {
let dL=false;
let RNt=1e4;
let XOe=20000;
let zMo=90000;
let qMo=30;
let Bw=a.CLAUDE_ENABLE_STREAM_WATCHDOG??!0;
let Ck=kOt();
let TT=Ck/2;
let CT=Math.min(uWn(He()),Bw?Ck:1/0);
let WA=Math.min(zMo,CT-XOe);
let Qf=!1;
let Og=null;
let Mk=null;
let Ok=null;
let KS=null;
let YS=!1;
let MH=function(){if(KS!==null)KS(),KS=null;if(YS)YS=!1,D.onRetryStatus?.(null);if(Mk!==null)Mk(),Mk=null;if(Ok!==null)Ok(),Ok=null};
let qA=function(){if(!D.onRetryStatus||!lr)return;let Ns=lr.lastAt,Lu=B.monotonicNow();KS=B.setTimeout(()=>{if(B.monotonicNow()-Lu<XOe/2)return;if(lr.lastAt>Ns){qA();return}let Fc=B.monotonicNow()-lr.lastAt;if(dL&&Fc<WA){qA();return}let fl=lr.lastAt===0?B.monotonicNow()-ms:Fc;YS=!0,D.onRetryStatus?.({kind:"stalled",deadline:B.now()+Math.max(0,CT-fl)})},XOe,{unref:!0})};
let KA=function(){if(MH(),qA(),!Bw)return;let Ns=B.monotonicNow(),Lu=TT;Mk=B.setTimeout(()=>{if(B.monotonicNow()-Ns<Lu)return;t(`Streaming idle warning: no chunks received for ${Lu/1000}s`,{level:"warn"}),te("warn","cli_streaming_idle_warning")},TT),Ok=B.setTimeout(()=>{Qf=!0,Og=B.monotonicNow(),t(`Streaming idle timeout: no chunks received for ${Ck/1000}s, aborting stream`,{level:"error"}),te("error","cli_streaming_idle_timeout"),i("tengu_streaming_idle_timeout",{model:bt(D.model),request_id:wf(ni),timeout_ms:Ck,tier:_("event")}),US()},Ck)};
return {MH,KA,setAdvisorActive(value){dL=value},get enabled(){return Bw},get fired(){return Qf},get firedAt(){return Og}};
}
