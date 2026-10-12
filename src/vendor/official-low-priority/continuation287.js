// Complete pinned official 2.1.287 declarations; canonical qn is the only state owner.
export function createLowPriorityContinuation287(ports){
const {qn,GS,HO,BO,zO,Yu,$O,xh,fde,i,c}=ports;
var Ja={label:"Continue now at lower priority",noticeLine:`/${fde} to continue now at lower priority \xB7 uses your weekly limit`,statusLine:"Lower priority until {reset}",allowanceNote:"{percent} allowance left",waitBanner:"Working at lower priority \xB7 waiting for capacity",budgetExhaustedCopy:"You've used this week's lower-priority allowance"};
function Za(e,n){return typeof e==="string"&&e.trim()!==""?e:n};
function vq(){let e=xh();return{label:Za(e.label,Ja.label),noticeLine:Za(e.noticeLine,Ja.noticeLine),statusLine:Za(e.statusLine,Ja.statusLine),allowanceNote:Za(e.allowanceNote,Ja.allowanceNote),waitBanner:Za(e.waitBanner,Ja.waitBanner),budgetExhaustedCopy:Za(e.budgetExhaustedCopy,Ja.budgetExhaustedCopy)}};
function JVn(e=Date.now()){let n=qn().budgetSpentUntilSeconds;return n!==void 0&&e<n*1000};
function xOo(){qn().budgetSpentUntilSeconds=void 0};
function Eke(e=Date.now()){let n=qn().coolingOffUntilMs;return n!==void 0&&e<n?n:void 0};
function edn(){let e=qn();if(e.state.phase!=="active")return;return GS(e.budgetUtilization)};
function R5e(){return qn().state};
function tdn(e){return qn().changed.subscribe(e)};
function zLt(e){return qn().events.subscribe(e)};
function POo({resetsAtSeconds:e,arm:n,entry:r,retryAfterSeconds:s,maxWaitSeconds:h,now:g=Date.now()}){let b=qn();if(b.state.phase==="active")return!1;return b.arm=n,b.retryAfterMs=HO,b.maxWaitMs=BO,zO(b,s,h),jO(b,{resetsAtSeconds:e,entry:r,resumed:!1,now:g}),!0};
function IOo(e=Date.now()){let n=qn();return n.state.phase==="active"?void 0:UO(n,e)};
function OOo(e,n=Date.now()){let r=qn(),s=UO(r,n);if(r.state.phase==="active"||s===void 0)return!1;return jO(r,{resetsAtSeconds:s,entry:e,resumed:!0,now:n}),!0};
function UO(e,n){let r=e.stoppedWallResetsAtSeconds;return r!==void 0&&r*1000>n?r:void 0};
function jO(e,{resetsAtSeconds:n,entry:r,resumed:s,now:h}){if(e.stoppedWallResetsAtSeconds=void 0,e.resumed=s,e.requestsServed=0,e.requestsServedStandard=0,e.totalWaitMs=0,!s)e.budgetUtilization=void 0,e.budgetUtilizationObservedAtMs=0;i("tengu_lowpri_accepted",{...Yu(e),entry:c(r),resumed:s}),$O(e,{phase:"active",resetsAtSeconds:n,acceptedAtMs:h}),e.events.emit({type:"accepted",entry:r})};
return {vq,JVn,xOo,Eke,edn,R5e,tdn,zLt,POo,IOo,OOo};
}
