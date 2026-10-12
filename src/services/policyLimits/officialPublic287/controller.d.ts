import type {CredentialStore} from '../../../utils/officialSecureStorage/runtime.js'
import type {StorageV5Backend} from '../../../utils/secureStorage/storageV5.js'
import type {PolicyLimitsResponse} from '../types.js'
import type {PolicyPrincipal287,HipaaEvidence287,PolicyFetchOutcome287} from './principal.js'
export interface PolicyStartupServices287 {storageV5?:StorageV5Backend;credentials?:CredentialStore}
export interface PolicySeal287 {identity:string;evidence:HipaaEvidence287;confirmedAt:number;rewrite():Promise<void>;vouch():Promise<void>}
export interface PolicyController287 {
 storageV5:StorageV5Backend|undefined;credentials:CredentialStore|undefined;used:boolean
 oauthRefreshLatch:{attempted:boolean;lastOutcome?:string};abortController:AbortController
 poller:{[Symbol.dispose]():void}|null;cleanupRegistered:boolean
 loadingCompletePromise:Promise<void>|null;loadingCompleteResolve:(()=>void)|null;loadingTimeoutId:ReturnType<typeof setTimeout>|null
 sessionGeneration:number;serverConfirmedGeneration:number;verdictPrincipalIdentity:string|null;verdictKey:string|null;verdictPrincipalKind:string|null;askedKey:string|null
 cyclesInFlight:number;unsettledCycles:Set<Promise<unknown>>;principalCheckOwed:boolean;principalCheckQueued:boolean;unclassifiedRecheckTimer:ReturnType<typeof setTimeout>|null
 stopCredentialWatch:(()=>void)|null;stopTunnelEpochWatch:(()=>void)|null;tunnelEpochSeen:number|undefined;tunnelVerdictEpoch:number|undefined;tunnelRepolledForEpoch:number|undefined
 signedCacheShadowChecked:boolean;cacheClearEpoch:number;verdictlessRetry:{[Symbol.dispose]():void}|null;verdictlessRetryStep:number;stopNetworkWatch:(()=>void)|null
 verdictlessEpisode:{sinceMs:number;errorCode:string;failedCycles:number;staleServed:boolean}|null
 noteUnverifiedCycle(errorCode:string,staleServed:boolean):void;onLiveVerdict(trigger:string):void
 recordFetchOutcome(generation:number,clearEpoch:number,outcome:PolicyFetchOutcome287&{host?:string},identity:string|null,awaited:boolean):void
 staleFallbackSource():PolicyLimitsResponse|null;dropUnconfirmedSessionCache():void
 repollFor(principal:PolicyPrincipal287,askedKey:string,reason:string,trigger?:string):'repolled'
 startupLoadState:string;startupLoadClaimed:boolean;prefetchAdmittedGeneration:number;startupLoadErrorCode:string|undefined;startupLoadCredentialState:string|undefined
 startupAwaitResult:string;gateSnapshotThisRun:unknown;coldStartFirstWaitAtMs:number|undefined;coldStartWaitedMs:number;readonly coldStartTimedOut:boolean
 readonly coldStartVerdictWait:{waitedMs:number;firstAtMs:number}|null
 firstPromptStateLogged:boolean;cacheWriteFailureLogged:boolean
 adoptStartupServices(services:PolicyStartupServices287):'nothing to adopt'|'already composed'|'already used'|'adopted'
 stop():void;releaseLoadingPromise():void;initializeLoadingPromise():void;waitForLoad():Promise<void>
 load(options?:{startupAwaited?:boolean}):Promise<void>;loadFor(trigger:string,awaited?:boolean):Promise<void>
 refresh(options?:{observedBoundary?:boolean}):Promise<void>;clearCache():Promise<void>
 runFetchCycle(reason:string,trigger?:string,awaited?:boolean):Promise<PolicyLimitsResponse|null>
 fetchAndLoad(reason:string,trigger?:string,awaited?:boolean):Promise<PolicyLimitsResponse|null>;_settleCyclesForTesting():Promise<void>;endCycle(generation:number):void
 saveCachedResponse(body:PolicyLimitsResponse,generation:number,signature:string|undefined,principal:PolicyPrincipal287|null,authority:'confirmed'|'prior_evidence'):Promise<'stale'|'skipped'|'failed'|'saved'>
 writeStampForSave(body:PolicyLimitsResponse,principal:PolicyPrincipal287,authority:'confirmed'|'prior_evidence'):Promise<PolicySeal287|null>
 sealSavedBody(seal:PolicySeal287,checksum:string):Promise<'saved'|'failed'>
 readDiskBody():Promise<{kind:'none'|'unreadable'}|{kind:'body';checksum:string}>;removeBodyLeavingStamp():Promise<boolean>;removeUnstampedBody():Promise<void>;removeSupersededLegacyBody(body:PolicyLimitsResponse,checksum:string):Promise<void>
 deleteCacheFile():Promise<boolean>;restampConfirmedCache(body:PolicyLimitsResponse,checksum:string|undefined,principal:PolicyPrincipal287|null,generation:number,authority:'confirmed'|'prior_evidence'):Promise<void>
 recordCacheWriteFailure(message:string,code?:string):void;recordVerdictPrincipal(principal:PolicyPrincipal287|null):void
 hasLiveVerdict():boolean;armVerdictlessRetry():boolean;disposeVerdictlessRetryTimer():void;armNetworkKick():void;disarmNetworkKick():void;kickOnNetworkSuccess(generation:number):void;resetAcceleratedRecovery():void
 ensureCredentialWatch():void;onCredentialMayHaveChanged():void;onTunnelCredentialEpoch(epoch:number):void;observeTunnelCredentialEpoch(epoch:number|undefined,reason:string,repoll:boolean):void;settleTunnelCredentialEpoch(epoch:number|undefined):void;isStaleTunnelCredentialEpoch(epoch:number|undefined):boolean
 checkPrincipal(trigger?:string):Promise<'unchanged'|'superseded'|'changed'|'repolled'|'started'>;scheduleUnclassifiedRecheck():void;fetchAcrossBoundaryKeepingVerdict(trigger:string):Promise<void>
 startBackgroundPolling():void;stopBackgroundPolling():void;poll(trigger?:string):Promise<void>
 policyGateSnapshot():Record<string,unknown>;managedConfigPolicyGateFields():Record<string,unknown>;logCacheStateAtFirstPrompt():void
 recordStartupAwaitResult(result:string):void;awaitColdStartVerdict():Promise<'completed'|'timed_out'>;ensureLoadRequested(options?:{startupAwaited?:boolean}):boolean
 admitPrefetched(prefetch:{orgUuid:string;bearerDigest:string;endpointHost:string;fetchedAtMs:number;data:unknown;signature?:string}):Promise<{admitted:true}|{admitted:false;refused:string}>
}
export declare function createPolicyController287(ports:Record<string,unknown>):{
 FGr:new(services?:PolicyStartupServices287)=>PolicyController287;A():PolicyController287;$Gr(services:PolicyStartupServices287):void
 NGr(storage?:StorageV5Backend):Promise<void>;LGr(bearer:string,options?:{timeoutMs?:number}):Promise<PolicyLimitsResponse|null>;GXe():Promise<'completed'|'timed_out'|'skipped'>;UXn():void
}
