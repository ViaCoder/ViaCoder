// Original field expressions, constructor bindings and exact prototype methods.
export function installCCRWorkerStateNative287(n,r,original){
const {Ie,Qt,Bt,kDn,ce,y,V,ne,p,b_t,SZn,t,At,Tt,he,Ue,g2e,l,m,i,S,Oe}=original;
if(!Object.hasOwn(this,"holdSwitchedOff"))this.holdSwitchedOff=!1;
if(!Object.hasOwn(this,"loggedHoldSwitchedOff"))this.loggedHoldSwitchedOff=!1;
if(!Object.hasOwn(this,"shutdownReleased"))this.shutdownReleased=!1;
if(!Object.hasOwn(this,"seesModelCallBoundaries"))this.seesModelCallBoundaries=!1;
if(!Object.hasOwn(this,"noSubscriberUploadHoldMs"))this.noSubscriberUploadHoldMs=0;
if(!Object.hasOwn(this,"parkReportedAtInitRequestId"))this.parkReportedAtInitRequestId=void 0;
if(!Object.hasOwn(this,"gatedWriteToolCalls"))this.gatedWriteToolCalls=new Set;
if(!Object.hasOwn(this,"transcriptLaneInUse"))this.transcriptLaneInUse=!1;
if(!Object.hasOwn(this,"lanesNotAnswering"))this.lanesNotAnswering=new Set;
if(!Object.hasOwn(this,"toolCallRows"))this.toolCallRows={client_events:new Map,internal_events:new Map};
if(!Object.hasOwn(this,"awaitedToolCalls"))this.awaitedToolCalls=new Set;
if(!Object.hasOwn(this,"toolCallRowWaiters"))this.toolCallRowWaiters=new Map;
if(!Object.hasOwn(this,"droppedWorkerStatePatchCount"))this.droppedWorkerStatePatchCount=0;
if(!Object.hasOwn(this,"loggedUnreadableFlushPolicy"))this.loggedUnreadableFlushPolicy=!1;
if(!Object.hasOwn(this,"loggedTranscriptEnvelopeStrip"))this.loggedTranscriptEnvelopeStrip=!1;
if(!Object.hasOwn(this,"loggedToolResultBlank"))this.loggedToolResultBlank=!1;
if(!Object.hasOwn(this,"loggedMcpImageBlank"))this.loggedMcpImageBlank=!1;
if(!Object.hasOwn(this,"rowsAwaitingCompactSummary"))this.rowsAwaitingCompactSummary=new Map;
if(!Object.hasOwn(this,"viewerAbsentReported"))this.viewerAbsentReported=!1;
if(!Object.hasOwn(this,"closingForSuccessor"))this.closingForSuccessor=!1;
if(!Object.hasOwn(this,"onDurableEventsUpload"))this.onDurableEventsUpload=void 0;
if(!Object.hasOwn(this,"noSubscriberStreamEventFlushIntervalMs"))this.noSubscriberStreamEventFlushIntervalMs=0;
if(!Object.hasOwn(this,"dropUnwatchedStreamEvents"))this.dropUnwatchedStreamEvents=!1;
if(!Object.hasOwn(this,"hasSubscribersReports"))this.hasSubscribersReports=0;
if(!Object.hasOwn(this,"lastBeatingEventsPostOkAtMs"))this.lastBeatingEventsPostOkAtMs=0;
if(!Object.hasOwn(this,"lastInboundEventAtMs"))this.lastInboundEventAtMs=Number.NEGATIVE_INFINITY;
if(!Object.hasOwn(this,"streamEventTimer"))this.streamEventTimer=null;
if(!Object.hasOwn(this,"parkedRows"))this.parkedRows=[];
if(!Object.hasOwn(this,"droppedDurableEventBatches"))this.droppedDurableEventBatches=0;
if(!Object.hasOwn(this,"onDurableEventsDropped"))this.onDurableEventsDropped=void 0;
if(!Object.hasOwn(this,"droppedInternalEventBatches"))this.droppedInternalEventBatches=0;
if(!Object.hasOwn(this,"droppedDeliveryAckBatches"))this.droppedDeliveryAckBatches=0;
// Transport-only alias: one lifetime abort controller, not a second owner.
this.closeAbort=this.lifetime;
this.uploadTrim=r?.uploadTrim??(()=>Ie);
this.uploadHoldMarker=()=>r?.uploadHoldMarker?.()===!0;
this.eventHoldEnabled=r?.eventHoldEnabled;
this.gatesToolCalls=r?.gatesToolCalls===!0;
this.toolCallRowGraceMs=r?.toolCallRowGraceMs??Qt;
this.onDiagnostic=r?.onDiagnostic;
this.reportParkAtInit=r?.reportParkAtInit??!1;
this.initExternalMetadata=r?.initExternalMetadata??{};
this.initialWorkerStatus=r?.initialWorkerStatus??"idle";
this.initStateGetOrderingBoundMs=r?.initStateGetOrderingBoundMs??Bt;
this.readSource={...kDn(n,this.getAuthHeaders),isClosed:()=>this.closed,onConflict:(h)=>this.handleEpochMismatch(h)};
this.sessionBaseUrl=this.readSource.sessionBaseUrl;
let s=r?.internalEventUploader;
const delegated=new Set(["initialize","getWorkerState","reportState","reportInternalMetadata","flushWorkerState","droppedWorkerStatePatches","writeInternalEvent","flushInternalEvents","internalEventsPending"]);
for(const name of ["initialize","getWorkerState","applyUploadHold","decideHoldRule","servedPolicyHolds","unwatched","noSubscriberHoldMs","laneHold","gateToolCall","awaitToolCallStored","toolCallRowReaches","reportState","reportInternalMetadata","flushWorkerState","droppedWorkerStatePatches","takeUpFlushPolicy","releaseFor","toolResultReleases","mayWaitUnderHold","noteToolCallRows","noteToolCallRowsSettled","queueInternalEvents","writeInternalEvent","currentUploadTrim","uploadedToolResult","startCompactSummaryWaitTimer","takeRowsAwaitingCompactSummary","transcriptRowMayWait","flushInternalEvents","internalEventsPending","countRowsAwaitingCompactSummary","enqueueClientEvents","trackedFrameUploads","logUndeliveredAtClose","reportDurableUpload","uploadBody","noteBeatingEventsPostOk","setHasSubscribers","logUploadHoldEnd","logUploadDrain"])if(!delegated.has(name))Object.defineProperty(this,name,Object.getOwnPropertyDescriptor(original.F$.prototype,name));
this.workerState=new ce({send:async(h)=>{let v=await this.request("put","/worker",{worker_epoch:this.workerEpoch,...h},"PUT worker");if(v.ok){if(h.worker_status!==void 0)y("ccr_worker_state_publish");return!0}if(V(v.status)){if(ne("warn","cli_worker_state_4xx_dropped",{status:v.status}),this.droppedWorkerStatePatchCount++,h.worker_status!==void 0)p("ccr_worker_state_publish","state_4xx_dropped");return!0}return!1},baseDelayMs:500,maxDelayMs:30000,jitterMs:500});
this.eventUploader=new b_t({maxBatchSize:100,maxBatchBytes:10485760,maxQueueSize:1e5,send:async(h,v)=>{let b=SZn(h);if(b>0)t(`CCRClient: dropped ${b} repeated-uuid durable event(s) from one /worker/events POST`);let g=h.some(At)||v.followsUrgent?Tt:void 0;this.reportDurableUpload(h,"sending");let w=this.noSubscriberStreamEventFlushIntervalMs>0||this.noSubscriberUploadHoldMs>0||this.dropUnwatchedStreamEvents||this.servedPolicyHolds(),k=w||this.onSubscribersReported!==void 0,P=this.hasSubscribersReports,R=[];for(let O of this.trackedFrameUploads("ackedAtMs"))if(h.some((U)=>U.payload.uuid===O.uuid))R.push(O.timing);for(let O of R)if(O.postedAtMs===void 0)O.postedAtMs=performance.now(),O.postedWallMs=Date.now();let F=await this.request("post","/worker/events",this.uploadBody(h,v),"client events",{timeout:g,parseBody:k});if(F.ok){for(let x of R)if(x.ackedAtMs===void 0)x.ackedAtMs=performance.now();let O=he(h);if(O)y("ccr_task_status_publish",O);if(this.noteBeatingEventsPostOk(h),this.reportDurableUpload(h,"accepted"),this.noteToolCallRowsSettled("client_events","stored",h),w&&P===this.hasSubscribersReports)this.setHasSubscribers(F.data?.has_subscribers,"no_report");let U=F.data?.has_subscribers;if(typeof U==="boolean")this.onSubscribersReported?.(U);return}if(this.reportDurableUpload(h,Ue(F.status)),V(F.status)){let O=h.filter((D)=>!D.ephemeral),U=h.length-O.length,x=F.status;if(U>0){if(t(`CCRClient: client event POST rejected (${F.status}) \u2014 dropping ${U} ephemeral event(s), retrying ${O.length} durable event(s)`,{level:"warn"}),p("ccr_partial_messages","ephemeral_dropped_on_4xx"),h.splice(0,h.length,...O),O.length===0)return;this.reportDurableUpload(O,"sending");let D=await this.request("post","/worker/events",this.uploadBody(O,v),"client events (durable retry)",{timeout:g});if(D.ok){let A=he(O);if(A)y("ccr_task_status_publish",A);this.noteBeatingEventsPostOk(O),this.reportDurableUpload(O,"accepted"),this.noteToolCallRowsSettled("client_events","stored",O);return}if(this.reportDurableUpload(O,Ue(D.status)),!V(D.status))throw new g2e("client event POST failed",D.retryAfterMs);x=D.status}if(O.length>0){this.droppedDurableEventBatches++,this.noteToolCallRowsSettled("client_events","dropped",O);try{this.onDurableEventsDropped?.(O,x)}catch(D){t(`CCRClient: onDurableEventsDropped threw; batch still dropped: ${l(D)}`,{level:"warn"})}}ne("warn","cli_worker_events_4xx_dropped",{status:x,count:O.length});let L=he(O);if(L)m("ccr_task_status_publish","status_events_4xx_dropped",L);return}throw new g2e("client event POST failed",F.retryAfterMs)},baseDelayMs:500,maxDelayMs:30000,jitterMs:500,onHoldRelease:this.logUploadHoldEnd.bind(this,"client_events"),onDrained:this.logUploadDrain.bind(this,"client_events")});
this.internalEventUploader=new b_t({maxBatchSize:100,maxBatchBytes:s?.maxBatchBytes??10485760,maxQueueSize:200,maxConsecutiveFailures:s?.maxConsecutiveFailures,onBatchDropped:(h,v)=>{this.droppedInternalEventBatches++,ne("warn","cli_worker_internal_events_give_up_dropped",{count:h,consecutive_failures:v}),i("tengu_ccr_internal_events_dropped",{reason:S("give_up"),count:h,consecutive_failures:v})},send:async(h,v)=>{let b=await this.request("post","/worker/internal-events",this.uploadBody(h,v),"internal events",{timeout:s?.requestTimeoutMs});if(b.ok){this.noteToolCallRowsSettled("internal_events","stored",h),Promise.resolve().then(()=>this.onInternalBatchAcked?.(h)).catch(()=>{});return}if(V(b.status)){this.droppedInternalEventBatches++,this.noteToolCallRowsSettled("internal_events","dropped",h),ne("warn","cli_worker_internal_events_4xx_dropped",{status:b.status,count:h.length}),i("tengu_ccr_internal_events_dropped",{reason:S("4xx"),count:h.length,status:b.status});return}throw new g2e("internal event POST failed",b.nonOriginRefusal?Oe:b.retryAfterMs)},baseDelayMs:500,maxDelayMs:Oe,jitterMs:500,holdMaxItems:50,onHoldRelease:this.logUploadHoldEnd.bind(this,"internal_events"),onDrained:this.logUploadDrain.bind(this,"internal_events")});
this.deliveryUploader=new b_t({maxBatchSize:64,maxQueueSize:64,send:async(h)=>{let v=await this.request("post","/worker/events/delivery",{worker_epoch:this.workerEpoch,updates:h.map((b)=>({event_id:b.eventId,status:b.status}))},"delivery batch");if(v.ok)return;if(V(v.status)){ne("warn","cli_worker_delivery_4xx_dropped",{status:v.status,count:h.length}),this.droppedDeliveryAckBatches++;return}throw new g2e("delivery POST failed",v.retryAfterMs)},baseDelayMs:500,maxDelayMs:30000,jitterMs:500});
}
export async function enqueueClientDurableNative287(w,event,original){const {me}=original;let h=this.releaseFor(w),b=[],n=[event],s,v=!1;if(this.gatesToolCalls){let R=me(w);if(R.some((F)=>this.awaitedToolCalls.has(F)))h??="tool_call";b.push(...R)}{if(h)this.internalEventUploader.release(h);else if(v)h="sampling_end";await this.enqueueClientEvents(n,h?{release:h}:{since:s}),this.noteToolCallRows("client_events",b,"queued")}}
export function closeInternalSummaryNative287(){let n=this.countRowsAwaitingCompactSummary();for(let r of this.rowsAwaitingCompactSummary.keys())this.takeRowsAwaitingCompactSummary(r,"close");this.rowsAwaitingCompactSummaryAtClose??=n,this.logUndeliveredAtClose("internal_events",this.internalEventUploader.close()+n)}
