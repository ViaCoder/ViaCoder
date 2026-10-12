import type { SettingsJson } from '../../../utils/settings/types.js'
import type { SettingsStore287 } from '../../../utils/settings/officialSettingsStore287/native.js'
import type { Signal } from '../../../utils/signal.js'
import type { getFsImplementation, safeResolvePath } from '../../../utils/fsOperations.js'
import type { authEnvironment } from '../../../utils/authEnvironment.js'
export type RemotePolicy287=SettingsJson
export type RemoteFailure287={errorKind:string;rulings?:unknown[];[key:string]:unknown}
export type RemoteLoadStatus287=
 |{state:'ok';hasSettings:boolean}
 |{state:'ineligible';reason:unknown}
 |{state:'stale_cache';failure:RemoteFailure287;transportEnvWithheld:boolean}
 |{state:'failed';failure:RemoteFailure287}
export type StateArtifact287={namespace:'state';id:string}
export type RemoteStorageFailure287={code:string;failureClass?:string;telemetryCode?:string;cause?:unknown}
export type RemoteStorageResult287={ok:true}|{ok:false;error:RemoteStorageFailure287}
export interface RemotePolicyStorage287 {
 write(key:StateArtifact287,content:string,options:{publishDiscipline:'inPlace';mode:number;flush?:boolean}):Promise<RemoteStorageResult287>
 delete(key:StateArtifact287):Promise<RemoteStorageResult287>
}
export type RemoteStorageView287={ready:boolean;stoodDown:boolean;configHome:string;attestation?:string;content:string|null;standDown(reason:string):void;written(key:StateArtifact287,content:string|null):void}
export interface RemoteOwnerState287 {
 sessionCache:RemotePolicy287|null;eligible:boolean|undefined;eligibilityMemo:boolean|undefined;ineligibleReason:unknown
 evalPolicySnapshotOnly:boolean;lastLoadStatus:RemoteLoadStatus287|undefined;lastLoadStatusChanged:Signal<[RemoteLoadStatus287|undefined]>
 policySettingsNotified:boolean;verifiedPayload:RemotePolicy287|null;unverifiedView:{raw:RemotePolicy287;view:RemotePolicy287}|null;projectedView:{raw:RemotePolicy287;view:RemotePolicy287}|null
 consentedPayload:RemotePolicy287|null;deferredPayload:RemotePolicy287|null;resetEpoch:number;backendView:RemoteStorageView287|undefined
 replaceSessionCache(value:RemotePolicy287|null,options?:{verified?:boolean;consentDeferred?:boolean}):void
 seedFromDisk(value:RemotePolicy287):void;markConsented(value:RemotePolicy287):void;dropConsentDeferral():void;markPolicySettingsNotified():void
 recordEligibility(eligible:boolean,options:{memoize:boolean;ineligibleReason?:unknown}):void
 registerResetListener(listener:()=>void):void;reset():void;emitLoadStatusChanged(value:RemoteLoadStatus287|undefined):void
}
export interface RemoteOwnerRuntime287 {
 resetEpoch():number;consented():RemotePolicy287|null;markConsented(settings:RemotePolicy287):void
 helperConsentHash(value:RemotePolicy287):string|undefined
 helperConsentName:string;cachePath():string;helperConsentPath():string;cacheOverride():string|undefined;diskWritesDisabled():boolean
 artifacts:{state(id:string):StateArtifact287;[key:string]:unknown};notifyWritten(kind:'cache'|'helperConsent',content:string|null):void
 writeSignature(cachePath:string,signature?:string):Promise<void>;clearSignatures(cachePath:string):Promise<void>;signatureAfterReset(cachePath:string,reset:boolean):Promise<boolean>;formatStorageFailure(error:RemoteStorageFailure287):string
 ineligibleReason():unknown
 Owner:new()=>RemoteOwnerState287;registry:{of(host:object):RemoteOwnerState287};owner():RemoteOwnerState287
 replace(value:RemotePolicy287|null,options?:{verified?:boolean;consentDeferred?:boolean},invalidateOptions?:{userLayer?:'retain'}):void
 isVerified():boolean;isVerifiedConsented():boolean;setLoadStatus(value:RemoteLoadStatus287|undefined):void;loadStatus():RemoteLoadStatus287|undefined
 isSnapshot(value:RemotePolicy287|null):boolean;read():RemotePolicy287|null;project():RemotePolicy287|null
 unverified(owner:RemoteOwnerState287,value:RemotePolicy287|null):RemotePolicy287|null;snapshot(value:RemotePolicy287|null):RemotePolicy287|null
 snapshotEnabled():boolean;setSnapshot(value:boolean):void
 hasContent(value:RemotePolicy287):unknown;consentHash(value:unknown):string;matchesConsent(hash:string,value:unknown,claudeMd?:string):boolean
 stripInternal(value:RemotePolicy287):RemotePolicy287
}
export function createRemoteOwner287(ports:{
 execution():{host:object};configHome():string;environment:typeof authEnvironment
 debug:typeof import('../../../utils/debug.js').logForDebugging;errorText(error:unknown):string
 invalidateSettings(options?:{userLayer?:'retain'}):void;settingsStore():SettingsStore287;primerEnabled():boolean
 filesystem:typeof getFsImplementation;resolvePath:typeof safeResolvePath
 omitBy<T extends object>(value:T,predicate:(value:unknown,key:string)=>boolean):Partial<T>
 sha256(value:string):string;stringify(value:unknown):string
 builtins:{path:typeof import('node:path');os:typeof import('node:os');fs:typeof import('node:fs');'fs/promises':typeof import('node:fs/promises')}
}):RemoteOwnerRuntime287

export interface RemoteLoadOutcome287 {settings:RemotePolicy287|null;fetchSucceeded:boolean;failure?:RemoteFailure287}
export function createRemoteLoadReporter287(ports:{
 KP():boolean;aVt():unknown;pAn(value:RemoteLoadStatus287|undefined):void;uI():RemoteLoadStatus287|undefined;wb():boolean;Ro():void
}):{
 settle(outcome:RemoteLoadOutcome287):void
 failure(result:{errorKind?:string;error?:string;httpStatus?:number;gatewayPinMismatch?:unknown}):RemoteFailure287
 unexpected():RemoteFailure287
}

export interface RemoteCacheWriterPorts287 {
 cVt():boolean;_:typeof import('../../../utils/slowOperations.js').jsonStringify;zYr(value:RemotePolicy287):string|undefined
 F():boolean;oA():string|undefined;De:RemoteOwnerRuntime287['artifacts'];t:typeof import('../../../utils/debug.js').logForDebugging
 it(error:RemoteStorageFailure287):string;Vje(kind:'cache'|'helperConsent',value:string|null):void
 uPe(path:string,signature?:string):Promise<void>;PZ():string;Ie:typeof import('node:fs/promises').open;Sfe:string;Be:typeof import('node:fs/promises').writeFile;dAn():string;l(error:unknown):string
}
export function createRemoteCacheWriter287(ports:RemoteCacheWriterPorts287):(settings:RemotePolicy287,storage?:RemotePolicyStorage287,signature?:string)=>Promise<void>
export interface RemoteCacheClearerPorts287 {
 aJt():void;A3():void;Ro():void;I():{detachBarrier():(()=>void)|undefined};F():boolean;De:RemoteOwnerRuntime287['artifacts'];Sfe:string
 it(error:RemoteStorageFailure287):string;Le:typeof import('node:fs/promises').rm;dAn():string;l(error:unknown):string;t:typeof import('../../../utils/debug.js').logForDebugging
 oA():string|undefined;Vje(kind:'cache'|'helperConsent',value:string|null):void;X2t(path:string):Promise<void>;PZ():string;He:typeof import('node:fs/promises').unlink;W(error:unknown):boolean
}
export function createRemoteCacheClearer287(ports:RemoteCacheClearerPorts287):(storage?:RemotePolicyStorage287)=>Promise<void>
