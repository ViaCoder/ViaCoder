// Generated COMPLETE raw declarations; external owners have no fallback.
import {AsyncLocalStorage} from 'node:async_hooks'
import {isProxy} from 'node:util/types'
import {randomUUID} from 'node:crypto'
function module0(imports){
const n=imports["n"];
class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}};
function U(){return n()};

return {V,U};
}
function module1(imports){

var s=globalThis.process?.getBuiltinModule?.("async_hooks");
var wKt=s?(e)=>s.AsyncResource.bind(e):(e)=>e;
function Me(){let e=new Set;return{subscribe(n){let r=wKt(n);return e.add(r),()=>{e.delete(r)}},emit(...n){let r;for(let o of e)try{o(...n)}catch(i){(r??=[]).push(i)}if(r)throw r.length===1?r[0]:AggregateError(r,"Signal listener(s) threw")},clear(){e.clear()}}};

return {s,wKt,Me};
}
function module2(imports){
const wKt=imports["wKt"];
function Ls(t,e){let r=t,S=new Set,a=e&&wKt(e),s=()=>r;return{getSnapshot:s,getState:s,setState:(n)=>{let o=r,i=n(o);if(Object.is(i,o))return;r=i,a?.({newState:i,oldState:o});for(let u of S)u()},subscribe:(n)=>{let o=wKt(n);return S.add(o),()=>S.delete(o)}}};

return {Ls};
}
function module3(imports){
const V=imports["V"];
const Ls=imports["Ls"];
const Me=imports["Me"];
const U=imports["U"];
var eyn=Object.freeze({open:Object.freeze([]),unplaced:Object.freeze([]),asked:Object.freeze([]),shownId:null,focusedId:null,focusRequest:null,placements:0,closing:Object.freeze([])});
var HWr=()=>({values:Ls(new Map),readers:new Map,readersOf:new Map,mounted:new Map,folds:{steady:{stale:new Set,lastAt:Number.NEGATIVE_INFINITY,pending:void 0},live:{stale:new Set,lastAt:Number.NEGATIVE_INFINITY,pending:void 0}},staleListeners:new Set,bumps:0,versionFloor:0});
var DWr=()=>({pending:void 0,pausedAt:void 0});
function s(){return{pluginLoad:void 0,pluginLoadArm:void 0,pluginLoadCacheOnly:void 0,pluginLoadCacheOnlyArm:void 0,commands:void 0,skills:void 0,skillsV5:void 0,agents:void 0,handedIn:void 0,outputStyles:void 0,workflows:void 0,hookRegistration:void 0,hookModulesAwaitTrust:!1,hookRegistrationInFlight:void 0,hooksUnknownCause:void 0,pluginsWithHooks:new Set,hookRegistrationEpoch:0,hookSwapEpoch:0,unlatchedAbsentManagedIds:new Set,hookRegistrationArgs:void 0,hookHotReloadUnsubscribe:void 0,hookHotReloadSettingsSnapshot:void 0,hookHotReloadTierSnapshot:void 0,loadedModules:[],moduleSeats:new Map,notices:Ls(new Map),openCalls:new Map,spawnProvenance:new Map,registeredAgents:new Map,renderVersions:Ls(new Map),panes:Ls(eyn),pluginState:HWr(),toastClock:DWr(),hoverGroups:Ls(new Map),scrollSites:new Map,focusSites:new Map,focusSiteDraws:Me(),mountedRasters:new Map,mountedImages:new Map,rasterAdmission:void 0,uiLogSink:null,pendingUiLog:[],armedMonitorKeys:new Set,marketplaces:new Map,marketplaceRefreshesInFlight:new Map,marketplaceHelperMemo:new Map,addDirMarketplacesMemo:void 0,headlessInstallPass:void 0,installedPluginsMigrated:!1,installedPluginsFile:null,installedPluginsEpoch:0,installedPluginsSnapshot:null,optionValues:new Map,flaggedPlugins:null,orphanedVersionGlobExclusions:null,recentActivity:[],pluginActivityFeatures:new Map,autoUpdateListener:null,commandSourceReresolve:null,pendingAutoUpdateNotification:null,ownInUseMarkerPaths:new Set,ownInUseMarkerHandles:new Map,commandProducerDirsDenied:new Set,commandProducerDirsScannedAt:0,commandProducerDirsComparable:null,commandProducerDirsNeedCanonicalCandidate:!1,commandProducerDirsWslProviderUndeterminable:!1,commandProducerDirsChanged:Me(),inUseMarkerCleanup:void 0,vouchedManagedPluginIds:new Set,hintedPluginIds:new Set,seenHintPluginIds:new Set,gitAvailable:void 0,operatorDeclaredMemo:void 0,marketplaceResolutionNoticesLogged:new Set,marketplaceAdmissionVerdicts:new Map,hiddenRegistryEntries:{raw:new Map,v5:new Map},releasedRegistryEntries:{raw:new Set,v5:new Set},cacheRootComparableMemo:void 0,provenLocalRoots:new Map,wslProviderOfPluginsRootMemo:void 0,inlinePluginRootsComparableMemo:void 0}};
class n{registry=s()};
var r=new V(()=>new n);
function a(){return r.of(U().host)};
function ut(){return a().registry};

return {eyn,HWr,DWr,s,n,r,a,ut};
}
export function createModsRegistryOwner287(ports){
const m0=module0({"n":ports["executionContext"]});
const m1=module1({});
const m2=module2({"wKt":m1["wKt"]});
const m3=module3({"V":m0["V"],"Ls":m2["Ls"],"Me":m1["Me"],"U":m0["U"]});

return {"owner":m3.a,"registry":m3.ut,"registryOwner":m3.r,"RegistryState":m3.n,"createRegistry":m3.s,"RegistryOwner":m0.V};
}
