// Generated complete original host identity and FXo initialization closure.
export function createSurfaceIdentity287(ports){
function module0(imports){

class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}};
return {V};
}
function module1(imports){

function Le(e){if(!e)return!1;if(typeof e==="boolean")return e;let n=String(e).toLowerCase().trim();return["1","true","yes","on"].includes(n)};
return {Le};
}
function module2(imports){
const V=imports["V"];
const U=imports["U"];
const a=imports["a"];
const Le=imports["Le"];
class d{entrypoint=void 0;interactive=!1;spawnedByAttendedSession=void 0;childSession=!1;claudecode=!1;coworkFrameArtifacts=!1;hostScheduledRun=!1;chromeTabGroupKey=void 0;remoteControlOwnerDeclared=!1;setEntrypoint(e){this.entrypoint=e}setInteractive(e){this.interactive=e}setSpawnedByAttendedSession(e){this.spawnedByAttendedSession=e}setChildSession(e){this.childSession=e}setClaudecode(e){this.claudecode=e}setCoworkFrameArtifacts(e){this.coworkFrameArtifacts=e}setHostScheduledRun(e){this.hostScheduledRun=e}setChromeTabGroupKey(e){this.chromeTabGroupKey=e}setRemoteControlOwnerDeclared(e){this.remoteControlOwnerDeclared=e}};
var C=new V(()=>new d);
function n(){return C.of(U().host)};
function uA(){return n().entrypoint};
function FXo(e){D(e);let t=n();t.setInteractive(!e),t.setSpawnedByAttendedSession(a.CLAUDE_CODE_SESSION_ATTENDED),t.setEntrypoint(a.CLAUDE_CODE_ENTRYPOINT),t.setChildSession(Boolean(a.CLAUDE_CODE_CHILD_SESSION)),t.setClaudecode(Boolean(a.CLAUDECODE)),t.setCoworkFrameArtifacts(a.CLAUDE_CODE_COWORK_FRAME_ARTIFACTS),t.setHostScheduledRun(a.CLAUDE_CODE_HOST_SCHEDULED_RUN),t.setChromeTabGroupKey(a.CLAUDE_CODE_REMOTE_SESSION_ID?a.CLAUDE_CHROME_TAB_GROUP_KEY:void 0),a.unset("CLAUDE_CHROME_TAB_GROUP_KEY")};
function D(e){if(a.CLAUDE_CODE_ENTRYPOINT){if(a.CLAUDE_CODE_ENTRYPOINT==="local_agent")a.set("CLAUDE_CODE_ENTRYPOINT","local-agent");if(a.CLAUDE_CODE_ENTRYPOINT==="cli"&&e)a.set("CLAUDE_CODE_ENTRYPOINT","sdk-cli");return}let t=process.argv.slice(2),o=t.indexOf("mcp");if(o!==-1&&t[o+1]==="serve"){a.set("CLAUDE_CODE_ENTRYPOINT","mcp");return}if(Le(a.CLAUDE_CODE_ACTION)){a.set("CLAUDE_CODE_ENTRYPOINT","claude-code-github-action");return}a.set("CLAUDE_CODE_ENTRYPOINT",e?"sdk-cli":"cli")};
return {d,C,n,uA,FXo,D};
}
function module3(imports){

function YZ(){let r=Promise.resolve();return{acquire(){let e=()=>{},i=new Promise((t)=>{e=t}),o=r;return r=i,o.then(()=>e)}}};
return {YZ};
}
function module4(imports){
const V=imports["V"];
const YZ=imports["YZ"];
const U=imports["U"];
class t{filterPolicy=void 0;dropNotifier=void 0;senderDropWriter=void 0;malformedConfigReported=!1;knownInboundRequestIds=new Set;knownOutboundRequestIds=new Set;automatedOutboundRequestIds=new Set;deviceOutboundRequestIds=new Set;elicitationOutboundRequestIds=new Set;resolvedPromptRequestIds=new Set;recentDropEventIds=new Set;commandDropNoticeWindow={start:0,count:0};messageDropNoticeWindow={start:0,count:0};reportedStrayDropCodes=new Set;reportedCloudWorkerCodes=new Set;clearWindowsForTesting(){this.knownInboundRequestIds.clear(),this.knownOutboundRequestIds.clear(),this.automatedOutboundRequestIds.clear(),this.deviceOutboundRequestIds.clear(),this.elicitationOutboundRequestIds.clear(),this.resolvedPromptRequestIds.clear(),this.recentDropEventIds.clear(),this.commandDropNoticeWindow.start=0,this.commandDropNoticeWindow.count=0,this.messageDropNoticeWindow.start=0,this.messageDropNoticeWindow.count=0}resetForTesting(){this.filterPolicy=void 0,this.dropNotifier=void 0,this.senderDropWriter=void 0,this.malformedConfigReported=!1,this.clearWindowsForTesting(),this.reportedStrayDropCodes.clear(),this.reportedCloudWorkerCodes.clear()}};
class r{outboundPeers=new Set;outboundPosts=new Set;subscriberStarted=!1;subscriberStopping=!1;liveSocket=null;enqueuePeerMessage=null;getCurrentMode=null;enqueueReceiveNotice=null;connectFailureStreak=null;outageWakeSent=!1;identity=null;identityResolved=null;identityFailedClosed=null};
class o{held=new Map;settled=[];reporter=void 0;sessionId=void 0;resetForTesting(){this.held.clear(),this.settled.length=0,this.reporter=void 0,this.sessionId=void 0}};
class s{checkouts=null;baseRefs=null;onMetadataChanged=null;lastEmittedBranches={};reset(){this.checkouts=null,this.baseRefs=null,this.onMetadataChanged=null,this.lastEmittedBranches={}}};
class i{attestation=new t;replHandle=null;sdkHostedHandle=null;projectFilesDoor=null;supervisedBridgeSession=null;peerIdentityKey=null;walkCredentialKey=null;retiredHandles=new WeakSet;lastReportedPermissionMode=void 0;lastKnownPermissionMode=void 0;lastReportedEffort=void 0;lastKnownEffort=void 0;lastReportedModel=void 0;lastKnownModel=void 0;contextUsageMirror=void 0;lastReportedArtifacts=void 0;lastKnownArtifacts=void 0;artifactsEgressSuppressed=void 0;lastReportedCrossSessionInbound=void 0;lastKnownCrossSessionInbound=void 0;lastKnownPostTurnSummary=void 0;remoteEgressSuppressed=null;lastRateLimitMirror=void 0;dropSenderWriterByHandle=new WeakMap;antproto=new r;bridgeStateFramesGate=void 0;cseShimGate=void 0;placeholderWriteChain=Promise.resolve();placeholderSweepStarted=!1;rcActiveImpressionRecorded=!1;verboseRcActive=void 0;teleportedSessionIds=new Set;nameTagWriteChain=Promise.resolve();latestAppliedName=new Map;connectTimeName=new Map;diagnosticPolicyKick=void 0;remoteControlLockReason=void 0;uploadLimitTold=void 0;uploadResends={underWay:0,lastFailedAtMs:void 0};imageScaleLock=YZ();historySpoolDir=null;historyPrefetchEntries=new Map;repoCheckouts=new s;inboundReadReceipts=new o};
var TJr=new V(()=>new i);
function Vr(){return TJr.of(U().host)};
return {t,r,o,s,i,TJr,Vr};
}
function module5(imports){
const Vr=imports["Vr"];
function sc(){return Vr().replHandle};
return {sc};
}
const m0=module0({});
const m1=module1({});
const m2=module2({"V":m0["V"],"U":ports["execution"],"a":ports["environment"],"Le":m1["Le"]});
const m3=module3({});
const m4=module4({"V":m0["V"],"YZ":m3["YZ"],"U":ports["execution"]});
const m5=module5({"Vr":m4["Vr"]});
return {"surface":m2.n,"entrypoint":m2.uA,"initialize":m2.FXo,"bridgeRuntime":m4.Vr,"replHandle":m5.sc,"bridgeRuntimeOwner287":m4.TJr};
}
