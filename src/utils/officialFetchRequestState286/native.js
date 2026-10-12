// Complete official 2.1.287 request-state class and block-store reset; no body rewriting.
export function createNativeFetchRequestState287(ports){
class At{#e;#t=new WeakMap;constructor(e){this.#e=e}peek(e){return this.#t.get(e.root)}of(e){let t=e.root,o=this.#t.get(t);if(o!==void 0)return o;let r=this.#e();return this.#t.set(t,r),r}drop(e){this.#t.delete(e.root)}}
const hd=ports.LRUCache;
const U=ports.context;
const Pg=(()=>{var n=5;
function Pg(){let r=new Map;return{run(e,i){let t=(r.get(e)??Promise.resolve()).then(()=>i()),s=t.then(()=>{},()=>{});return r.set(e,s),s.then(()=>{if(r.get(e)===s)r.delete(e)}),t},has(e){return r.has(e)},get size(){return r.size},async settle(){await Promise.all([...r.values()])},async drain(){for(let e=0;e<n;e++){let i=[...r.values()];if(i.length===0)return;await Promise.all(i)}},clearForTest(){r.clear()}}}
return Pg;})();
var uze=33554432;
var J=uze;
function P(e=J){return{blocks:new Map,storedBytes:0,maxStoredBytes:e,evictedForSpaceCount:0,generation:0,cancelIdleDrop:void 0,pooledCompression:Promise.resolve()}}
function PXe(e){e.cancelIdleDrop?.(),e.cancelIdleDrop=void 0,e.blocks.clear(),e.storedBytes=0,e.generation++}
function D(){return new WeakMap}
var L=256;
class F{promptCacheBreak={previousStateBySource:new Map,hydrationAttempted:!1,pendingPersist:Promise.resolve(),latestQueuedPersist:null,hashSalt:null,summaryForks:new Map,classifierLines:new Map,classifierCompactions:new Map};threadDecisionTracker=void 0;threadInheritedFields={storedToolsHashByThread:new Map,breakerTripped:!1};threadDropRecreate=new Map;threadRequestEnds=new Map;dumpPrompts={recentRequests:[],stateByAgent:new Map,retiredInitHashes:new hd({max:1000}),appendQueue:Pg()};requestReplay={chains:new Map,unrecordableShapes:new Set};lastIngressUuidBySession=new Map;cacheCoverage=D();gzipRequestBody={latchedOff:!1,rejectedThisProcess:!1,persistedLatchChecked:!1,persistedLatchInEffect:!1,telemetryByClientRequestId:new hd({max:L}),dispatchAtByClientRequestId:new hd({max:L}),ccrWorkerSkipReasonsLogged:new Set,blockStore:P(),blocksSwitchedOff:!1,blocksBuildGeneration:void 0,blockGzippedResponses:new WeakSet};sentPrefix={ledger:void 0,mode:void 0,persist:Promise.resolve(),persisted:void 0,pendingSeed:void 0,lastReport:new WeakMap,lastVerdict:new WeakMap,renderEpochs:new WeakMap,memoryEpochs:new WeakMap,announced:new WeakMap,excuse:new WeakMap,staged:new WeakMap,boundVerdict:new WeakMap};bindingDrops={seenBlocks:void 0,threadsRead:new hd({max:512})};foreignThinkingKeep=void 0;streamFirstByteArmedRequestIds=new hd({max:64});skillHealthMap=void 0;firedOnceKeys=new Set;hasFired(e){return this.firedOnceKeys.has(e)}markFired(e){this.firedOnceKeys.add(e)}once(e){if(this.firedOnceKeys.has(e))return!1;return this.firedOnceKeys.add(e),!0}resetStreamNoEventsWarningLatch(){this.firedOnceKeys.delete("stream_no_events_fallback_warning")}}
var ce=new At(()=>new F);
function Ls(){return ce.of(U())}
return {get:Ls,clearBlockStore:PXe,cell:ce,RootCell:At};
}
