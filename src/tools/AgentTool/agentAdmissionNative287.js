// Generated complete official 2.1.287 declarations; no second task/cost owner.
export function createTaskRegistryNative287(ports){
const {en,Jt,tn,nn,rr}=ports;
function I(e,n){return e!==void 0&&Object.hasOwn(e,n)?e[n]:void 0};
var J$e=[];
var Zt=new Set;
var Ipt={messages:J$e,inProgressToolUseIDs:Zt};
function Gm(e,n){let r=0;return{register(s){en(s,n)},update(s,o){Jt(s,n,o)},updateTranscript(s,o){n((i)=>{let u=I(i.transcripts,s)??Ipt,f=o(u);if(f===u)return i;return{...i,transcripts:{...i.transcripts,[s]:f}}})},getTranscript(s){return I(e().transcripts,s)},remove(s){rr().taskEvicted.emit(s),n((o)=>{if(!Object.hasOwn(o.tasks,s))return o;let{[s]:i,...u}=o.tasks,f=o.transcripts??{},{[s]:g,...h}=f;return{...o,tasks:u,transcripts:s in f?h:f}})},evictTerminal(s){tn(s,n)},applyOffsetsAndEvict(s,o){nn(n,s,o)},get(s){return I(e().tasks,s)},all(){return e().tasks},incrementWebSearchCalls(){r++},getWebSearchCalls(){return r},resetWebSearchCalls(){r=0},takeConcurrencySlot(){n((o)=>({...o,runningSubagents:o.runningSubagents+1}));let s=!1;return()=>{if(s)return;s=!0,n((o)=>{let i=Math.max(0,o.runningSubagents-1);if(i===o.runningSubagents)return o;return{...o,runningSubagents:i}})}},getConcurrentSubagents(){return e().runningSubagents}}};
return Gm(ports.getState,ports.setState);
}
export function createAgentAdmissionNative287(ports){
const {a,zle,k,jC,IMe,m,Ye,j}=ports;
var R={"user-cancel":new DOMException("user-cancel","AbortError"),"remote-cancel":new DOMException("remote-cancel","AbortError"),shutdown:new DOMException("shutdown","AbortError"),interrupt:new DOMException("interrupt","AbortError"),"turn-abort":new DOMException("turn-abort","AbortError"),background:new DOMException("background","AbortError"),"refusal-fallback-edit":new DOMException("refusal-fallback-edit","AbortError"),"recovery-timeout":new DOMException("recovery-timeout","AbortError"),"permission-stop":new DOMException("permission-stop","AbortError")};
function fl(e){return R[e]};
function Oi(e){return e instanceof DOMException&&e.name==="AbortError"?e.message:e};
var w=new Set(["interrupt","turn-abort","refusal-fallback-edit","permission-stop"]);
function Joe(e){return w.has(Oi(e))};
function iT(e){return Oi(e.reason)==="shutdown"?!0:void 0};
var Gro=20;
function MWn(){return a.CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS??Gro};
function u2(e){return e!==void 0&&!(zle()<e)};
var qS=10;
function oRo(){return`Auto mode is unavailable: the server returned no safety verdict for ${qS} responses in a row, so this agent was stopped before it finished. Nobody interrupted it; whatever it returned is partial. Retrying now will likely stop the same way \u2014 wait for the user's next message.`};
function Sn(n){let e=MWn();if(n.taskRegistry.getConcurrentSubagents()<e)return;if(k("tengu_amber_kestrel",!1))return;let h=n.getAppState();if(jC(h.ultracode,n.rootToolSurface.mainLoopModel))return;return m("subagent_launch","subagent_concurrency_cap"),IMe.of(n.session).recordRefused("concurrency_limit"),new j(`Concurrent subagent limit reached. You can run ${e} subagents at once. Do not retry. If the user wants more concurrent subagents, ask them to increase CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS.`)};

return {checkConcurrency:Sn,forContext(e,ve){
var Mt=(r=!1)=>{if(e.abortController.signal.aborted){let A=Oi(e.abortController.signal.reason);if(!(r&&A==="interrupt"))throw new Ye}let{maxBudgetUsd:b}=e.options;if(u2(b))throw m("subagent_launch","subagent_budget_exhausted"),IMe.of(e.session).recordRefused("budget"),new j(`Budget limit reached ($${zle().toFixed(2)} spent of the $${b} maximum). New agents cannot be started. Complete the remaining work directly with your tools, or wrap up with the results you already have.`)};
var Mn=async()=>{let r=Sn(e);if(r)throw await ve(),r;return e.taskRegistry.takeConcurrencySlot()};
return {check:Mt,take:Mn};},abortReason:Oi,abortToken:fl,permissionStopMessage:oRo,quietInterrupt:Joe,isShutdown:iT};
}
