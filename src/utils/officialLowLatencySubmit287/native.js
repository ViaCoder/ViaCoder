// Exact local declaration closure for qEt/Rs/XRn/To/Ms; imported source bindings are required ports.
function Rs(e){if(e.head==="ended_by_hook"||e.hasFoldTakenPrompt||!e.isLocalTurnActive)return{action:"stand_by"};if(e.isHeldByDialog)return{action:"wait",reason:"held_by_dialog"};if(e.head==="not_ready"||!e.isLocalTurnRunning)return{action:"wait",reason:"not_ready"};if(e.head==="behind_earlier")return{action:"wait",reason:"behind_earlier"};if(e.holderCount>e.unmovableHolderCount)return{action:"background"};if(e.isCompacting)return{action:"wait",reason:"compacting"};if(e.isAwaitingMovedResult)return{action:"wait",reason:"moved_result"};if(e.holderCount>0||e.isExecuting){if(!e.isUnmovableGraceOver)return{action:"wait",reason:"unmovable_grace"};return e.isBackgroundingDisabled?{action:"cancel"}:{action:"interrupt"}}if(!e.isMainRequestInFlight)return{action:"wait",reason:"not_sampling"};return{action:"interrupt"}}
export function evaluateOfficialLowLatencyDecision287(input){return Rs(input)}
var Abn=new Set(["task-notification","poll-event"]);
function Pbn(e){return!Abn.has(e)}
function ilt(e){return e.mode==="poll-event"||e.mode==="task-notification"||e.skipAttachments===!0}
function tf(e){return Pbn(e.mode)&&!e.isMeta&&Hy(e.origin)&&!ilt(e)}
function Hy(e){return e===void 0||e.kind==="human"||e.kind==="auto-continuation"}
function Hhe(e){return Array.isArray(e)&&e.some((n)=>n.type==="tool_result")}
function qOr(e,n){return FMt(e)&&e.type==="local_bash"&&e.agentId===n}
var _zn=":preamble-";
function KOr(e,n){return qOr(e,n)&&e.caller===(n===void 0?"turn":"agent")}
function Szn(e){let n=e.indexOf(":preamble-");return n===-1?e:e.slice(0,n)}
function FMt(e){if(Lu(e))return!e.isBackgrounded&&Boolean(e.shellCommand);return kn(e)&&!e.isBackgrounded&&!fzn(e)&&!e.forkWorker}
function Lu(e){return typeof e==="object"&&e!==null&&"type"in e&&e.type==="local_bash"}
function fzn(e){if(typeof e!=="object"||e===null||!("type"in e)||!("agentType"in e))return!1;return e.type==="local_agent"&&e.agentType==="main-session"}
function kn(e){return typeof e==="object"&&e!==null&&"type"in e&&e.type==="local_agent"}
function TFr(e,n){return kn(e)&&e.status==="running"&&!e.isBackgrounded&&e.parentAgentId===n}
function ot(t,n){let e=t.indexOf(n);return e===-1?t:t.slice(0,e)}
var ic="REPL";
var yt="Agent";
var Tm="Task";
function TOt(e){let n=e.innerCall===!0,r=e.agentId===void 0;return n?"inner":r?"turn":"agent"}
export function officialLowLatencyCaller287(context){return TOt(context)}
// Exact official per-agent/task cache closure; local imported owners are typed ports.
export function isOfficialEligiblePrompt287(command){return tf(command)}
export const officialLowLatencySubmitSourcePorts287={
  "Ge": {
    "file": "chunk-bn3p37gv.js",
    "name": "Ge"
  },
  "p": {
    "file": "chunk-9d2ykxmy.js",
    "name": "p"
  },
  "d": {
    "file": "chunk-amhtwhch.js",
    "name": "d"
  },
  "m": {
    "file": "chunk-9d2ykxmy.js",
    "name": "m"
  },
  "Za": {
    "file": "chunk-mgkghrc5.js",
    "name": "Za"
  },
  "YOr": {
    "file": "chunk-mphp7acd.js",
    "name": "YOr"
  },
  "_N": {
    "file": "chunk-mphp7acd.js",
    "name": "_N"
  },
  "cTe": {
    "file": "chunk-mphp7acd.js",
    "name": "cTe"
  },
  "oGo": {
    "file": "chunk-35ny7gy3.js",
    "name": "oGo"
  },
  "que": {
    "file": "chunk-35ny7gy3.js",
    "name": "que"
  },
  "t": {
    "file": "chunk-q80zaav8.js",
    "name": "t"
  },
  "lFe": {
    "file": "chunk-mphp7acd.js",
    "name": "lFe"
  },
  "ZTo": {
    "file": "chunk-mphp7acd.js",
    "name": "ZTo"
  },
  "y": {
    "file": "chunk-9d2ykxmy.js",
    "name": "y"
  }
};
export function createOfficialLowLatencySubmit287(ports){
const Ge=ports["Ge"];
const YOr=ports["YOr"];
const ZTo=ports["ZTo"];
const Za=ports["Za"];
const _N=ports["_N"];
const cTe=ports["cTe"];
const d=ports["d"];
const lFe=ports["lFe"];
const m=ports["m"];
const oGo=ports["oGo"];
const p=ports["p"];
const que=ports["que"];
const t=ports["t"];
const y=ports["y"];
var As=200;
var Ts=8;
var Ao=2;
function XRn(e){let n=new Map,o=new Set;for(let r=e.length-1;r>=0;r--){let s=e[r];if(s.type==="assistant"){for(let f of s.message.content)if(f.type==="tool_use")n.set(f.id,f.name);continue}if(s.type!=="user")continue;let u=s.message.content;if(!Hhe(u)){if(s.isMeta!==!0)break;continue}for(let f of u)if(typeof f!=="string"&&f.type==="tool_result")o.add(f.tool_use_id)}for(let r of o)n.delete(r);return n}
function To(e,n,o,r){let s=e.findIndex((b)=>b.uuid!==void 0&&n.has(b.uuid)&&b.priority!=="now"),u=e[s],f=u?.uuid;if(u===void 0||f===void 0)return null;let g=u.priority==="later"?"later":"next";if(u.drainOnly===!0&&u.promptSubmitted!==void 0)return{head:"ended_by_hook",uuid:f,priority:g};let h=e.slice(0,s);if(e.some((b)=>b.screeningPending===!0&&b.agentId===r)||o.isFoldInFlight(f)||o.isMidTurnFoldSuspended()||h.some((b)=>b.priority==="now"&&b.agentId===r))return{head:"not_ready",uuid:f,priority:g};if(h.some((b)=>b.agentId===r&&(b.mode==="prompt"||b.mode==="bash")))return{head:"behind_earlier",uuid:f,priority:g};return{head:"deliverable",uuid:f,priority:g}}
class qEt{#t;#e=new Map;#n=null;#f=[];#m=!1;#p="";#d=!1;#o=0;#a=!1;#r=new Set;#g=0;#l=0;#y=!1;constructor(e){this.#t=e}sendQueuedNow=()=>{let e=!1;return this.#u(()=>{if(this.#y)return;let{messageQueue:n,turn:o}=this.#t;if(!o.guard.isRunning){this.#s();return}let r=Ro(o.agentId);for(let u of n.getCommandQueueSnapshot())if(u.uuid!==void 0&&u.agentId===r&&u.mode==="prompt"&&tf(u)&&!this.#e.has(u.uuid))this.#e.set(u.uuid,{outcome:"undecided",raisedFrom:null});if(this.#e.size===0)return;let s=To(n.getCommandQueue(),this.#e,n,r)?.head;if(s==="behind_earlier"||s==="ended_by_hook"){this.#s();return}if(e=!0,this.#d=!1,this.#a=!1,this.#f.length===0)this.#f=[n.subscribe(this.#_),o.guard.subscribe(this.#C)];if(this.#n===null)this.#h(0)}),e};dispose(){this.#y=!0,this.#u(()=>this.#s())}#h(e){this.#n?.(),this.#n=this.#t.clock.setTimeout(this.#v,e)}#i(){this.#n?.(),this.#n=null,this.#o=0,this.#r.clear(),this.#g=0,this.#l=0}#s(){this.#i();for(let e of this.#f.splice(0))e();this.#S(),this.#e.clear(),this.#m=!1,this.#p="",this.#d=!1,this.#a=!1}#c(){if(this.#e.size>0)this.#h(As)}#S(){for(let[e,n]of this.#e)if(n.raisedFrom!==null){let o=n.raisedFrom;n.raisedFrom=null,this.#t.messageQueue.demoteFromNow(e,o)}}#b(){let e=new Set(this.#t.messageQueue.getCommandQueueSnapshot().map((n)=>n.uuid));for(let[n,o]of this.#e){if(e.has(n))continue;if(this.#e.delete(n),this.#t.messageQueue.isFoldInFlight(n))this.#a=!0;if(o.outcome!=="undecided"&&o.outcome!=="delivered_early")p(this.#t.featureName,o.outcome)}}#_=()=>{this.#u(()=>{let[e]=this.#e.keys();if(this.#b(),this.#e.size===0){this.#s();return}if(this.#a){this.#i();return}let[n]=this.#e.keys();if(n!==e&&(this.#n!==null||this.#t.turn.guard.isActive))this.#h(0)})};#C=()=>{this.#u(()=>{let{guard:e}=this.#t.turn;if(!e.isActive){this.#d=!0,this.#i();return}if(this.#d)this.#s()})};#v=()=>{this.#n=null,this.#u(()=>{this.#A()})};#u(e){try{e()}catch(n){if(d(n),!this.#m)this.#m=!0,m(this.#t.featureName,"check_threw")}}#A(){let{messageQueue:e,turn:n,transcript:o,session:r,taskRegistry:s}=this.#t;if(this.#b(),this.#e.size===0){this.#s();return}let u=To(e.getCommandQueue(),this.#e,e,Ro(n.agentId)),f=u===null?void 0:this.#e.get(u.uuid),g=o.getSnapshot(),h=XRn(g),b=Object.values(s.all()),T=Ms(b,h,n.agentId),C=n.guard.isActive&&[...this.#e.values()].some((M)=>M.raisedFrom!==null);if(C&&!Za()){if(YOr(T,s),this.#l=h.size>0?this.#l+1:0,n.endsUnmovableShells&&this.#l>Ao)for(let M of xs(b,h,T,n.agentId))_N(M.id,s)}if(u===null||f===void 0){if(C)this.#c();else this.#i();return}let{head:v,uuid:R,priority:A}=u,D=b.filter((M)=>TFr(M,n.agentId)).filter((M)=>Le(h,M.toolUseId)),w=(cTe.peek(r)?.list()??[]).filter((M)=>Le(h,M.toolUseId)),x=Za(),W=x?[]:T,Q=x?[]:D.filter((M)=>{let se=M.toolUseId===void 0?void 0:h.get(M.toolUseId);return se===yt||se===Tm}),H=n.readEvidence(),K=n.abortController,z=g.at(-1);for(let M of this.#r)if(!h.has(M))this.#r.delete(M);let re={head:v,hasFoldTakenPrompt:this.#a,isLocalTurnActive:n.guard.isActive,isLocalTurnRunning:n.guard.isRunning&&K!==null&&!K.signal.aborted,isHeldByDialog:H.isHeldByDialog,holderCount:T.length+D.length+w.length,unmovableHolderCount:(x?T.length:0)+(D.length-Q.length),isExecuting:H.isToolCallStarting||h.size>0,isAwaitingMovedResult:this.#r.size>0,isBackgroundingDisabled:x,isCompacting:H.isCompacting,isUnmovableGraceOver:this.#o>=Ao,isMainRequestInFlight:H.isMainRequestAnnounced&&!(z?.type==="assistant"&&(z.message.stop_reason!==null||z.isApiErrorMessage===!0))&&oGo("api_call")&&que()>0},N=Rs(re),te=`${N.action}${N.action==="wait"?` ${N.reason}`:""} head=${v} holders=${re.holderCount} executing=${re.isExecuting}`;if(te!==this.#p)this.#p=te,t(`[low-latency-submit] ${te} agent=${n.agentId??"main"}`);switch(N.action){case"stand_by":this.#i();return;case"wait":if(this.#o=N.reason==="unmovable_grace"?this.#o+1:0,N.reason==="moved_result"&&++this.#g>=Ts)this.#r.clear();if(N.reason!=="not_ready"&&f.outcome==="undecided")f.outcome=N.reason;this.#c();return;case"background":{let M=f.outcome;f.outcome="delivered_early";let se=YOr(W,s).map(Mo);for(let pe of Q)if(lFe(pe.id,s))se.push(pe.toolUseId);let le=se.length,ue=ZTo(w);if(le+=ue,ue>0)se.push(...w.map((pe)=>pe.toolUseId));if(this.#e.size>0){this.#g=0;for(let pe of se)if(pe!==void 0)this.#r.add(pe)}if(le===0){if(f.outcome=M==="undecided"?"nothing_moved":M,re.isUnmovableGraceOver){if(x)this.#w(f);else this.#k(f,R,A);return}if(this.#e.size>0)this.#o++}else if(this.#o=0,M!=="delivered_early")y(this.#t.featureName);this.#c();return}case"interrupt":this.#k(f,R,A);return;case"cancel":this.#w(f)}}#w(e){let{interruptForSubmit:n}=this.#t.turn;if(n===void 0){if(e.outcome==="undecided")e.outcome="nothing_moved"}else{if(e.outcome!=="delivered_early")e.outcome="fell_back_to_cancel";n()}this.#i()}#k(e,n,o){if(this.#o=0,this.#l=0,e.raisedFrom=o,!this.#t.messageQueue.promoteToNow(n))e.raisedFrom=null;else if(e.outcome!=="delivered_early")e.outcome="delivered_early",y(this.#t.featureName);this.#c()}}
function Ro(e){return e??Ge()}
function Ms(e,n,o){return e.filter((r)=>qOr(r,o)).filter((r)=>r.status==="running"&&(r.caller==="inner"&&r.toolUseId?.includes(_zn)===!0||KOr(r,o))&&Le(n,Mo(r)))}
function Mo(e){return e.toolUseId===void 0?void 0:Szn(e.toolUseId)}
function xs(e,n,o,r){let s=[...n.values()].includes(ic),u=e.filter(kn).filter((g)=>g.status==="running"&&!g.isBackgrounded),f=new Set(u.filter((g)=>g.parentAgentId===r&&(s||Le(n,g.toolUseId))).map((g)=>g.agentId));for(let g=-1;g!==f.size;){g=f.size;for(let h of u)if(h.parentAgentId!==void 0&&f.has(h.parentAgentId))f.add(h.agentId)}return e.filter(Lu).filter((g)=>{let h=KOr(g,r)||o.includes(g),b=FMt(g);if(g.status!=="running"||!b||h)return!1;if(g.agentId!==r)return g.agentId!==void 0&&f.has(g.agentId);let{toolUseId:T}=g;return s||T!==void 0&&Le(n,ot(T,":"))})}
function Le(e,n){return n!==void 0&&e.has(n)}
return {Coordinator:qEt,create:configuration=>new qEt(configuration),createAgentCache:(configuration,bindings)=>{const yo=bindings.yo,Rlt=bindings.Rlt;var g_e=()=>{};function h_e(h,v){let D=()=>{let Se=v.get(h);return kn(Se)?Se:void 0},N=()=>D()?.status==="running",X=()=>Tlt(D());return{turn:{agentId:h,guard:{get isActive(){return N()},get isRunning(){return N()},subscribe:()=>g_e},get abortController(){return D()?.abortController??null},readEvidence:()=>({isHeldByDialog:!1,isToolCallStarting:(v.getTranscript(h)?.inProgressToolUseIDs.size??0)>0,isCompacting:!1,isMainRequestAnnounced:!1}),interruptForSubmit:void 0,endsUnmovableShells:!1},messageQueue:{getCommandQueueSnapshot:X,getCommandQueue:X,subscribe:()=>g_e,isFoldInFlight:()=>!1,isMidTurnFoldSuspended:()=>!1,promoteToNow:()=>!1,demoteFromNow:()=>!1},transcript:{getSnapshot:()=>xlt(v.getTranscript(h)?.messages??[],X())}}}
function Tlt(h){if(h===void 0)return[];let v=[];for(let D of h.pendingMessages)if(D.origin?.kind==="human"&&D.shownAs!==void 0)v.push({value:D.text,mode:"prompt",uuid:D.shownAs,agentId:yo(h.agentId),origin:D.origin});return v}
function xlt(h,v){if(v.length===0)return h;let D=new Set(v.map((N)=>N.uuid));return h.filter((N)=>!D.has(N.uuid))}class zj{#e;#t=new Map;#o=!1;constructor(h){this.#e=h}sendQueuedNow=(h)=>{if(this.#o)return!1;for(let[D,N]of this.#t)if(D!==void 0&&this.#e.taskRegistry.get(D)===void 0)N.dispose(),this.#t.delete(D);let v=this.#t.get(h);if(v===void 0)v=new qEt({...this.#r(h),session:this.#e.session,taskRegistry:this.#e.taskRegistry,clock:this.#e.clock,featureName:"input_low_latency_submit"}),this.#t.set(h,v);return v.sendQueuedNow()};dispose(){this.#o=!0;for(let h of this.#t.values())h.dispose();this.#t.clear()}#r(h){if(h!==void 0)return h_e(h,this.#e.taskRegistry);let v=this.#e,{turn:D,messageQueue:N,transcript:X}=v;return{turn:{agentId:void 0,guard:D.guard,get abortController(){return D.abortController},readEvidence:()=>Rlt(v),interruptForSubmit:()=>D.interruptForSubmit(),endsUnmovableShells:!0},messageQueue:N,transcript:X}}}return new zj(configuration)},decide:Rs,transcriptMap:XRn,head:To,eligibleTasks:Ms};
}
