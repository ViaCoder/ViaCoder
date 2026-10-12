/** Leaf remote-settings owner: native verification, consent, disk and projection are distinct. */
import * as path from 'node:path'
import * as os from 'node:os'
import * as fs from 'node:fs'
import * as fsPromises from 'node:fs/promises'
import { createHash } from 'node:crypto'
import omitBy from 'lodash-es/omitBy.js'
import { getClaudeConfigHomeDir } from '../../utils/envUtils.js'
import { authEnvironment } from '../../utils/authEnvironment.js'
import { getFsImplementation, safeResolvePath } from '../../utils/fsOperations.js'
import { getSecureStorageExecutionHost } from '../../utils/secureStorage/macOsKeychainHelpers.js'
import { getSettingsCacheStore287, isSettingsPrimerEnabled287, resetSettingsCache } from '../../utils/settings/settingsCache.js'
import { logForDebugging } from '../../utils/debug.js'
import { jsonStringify } from '../../utils/slowOperations.js'
import type { SettingsJson } from '../../utils/settings/types.js'
import { createRemoteOwner287, type RemoteOwnerState287, type RemoteLoadStatus287 } from './officialOwner287/native.js'

const runtime = createRemoteOwner287({
 execution:()=>({host:getSecureStorageExecutionHost()}),configHome:getClaudeConfigHomeDir,
 environment:authEnvironment,debug:logForDebugging,errorText:error=>error instanceof Error?error.message:String(error),
 invalidateSettings:resetSettingsCache,settingsStore:getSettingsCacheStore287,primerEnabled:isSettingsPrimerEnabled287,
 filesystem:getFsImplementation,resolvePath:safeResolvePath,omitBy,
 sha256:value=>createHash('sha256').update(value).digest('hex'),stringify:jsonStringify,
 builtins:{path,os,fs,'fs/promises':fsPromises},
})

// Keep the established config-directory isolation around the same native host owner.
const ownerPaths = new WeakMap<RemoteOwnerState287,string>()
function owner(): RemoteOwnerState287 {
 const value=runtime.owner(),current=getSettingsPath(),previous=ownerPaths.get(value)
 if(previous!==undefined&&previous!==current)value.reset()
 ownerPaths.set(value,current)
 return value
}

export function setSessionCache(
 value:SettingsJson|null,consented=false,
 provenance?:{verified?:boolean;consentDeferred?:boolean},
):void {
 owner()
 runtime.replace(value,provenance)
 if(consented&&value!==null)runtime.markConsented(value)
}
export function getConsentedSettingsFromCache():SettingsJson|null {owner();return runtime.consented()}
export function resetSyncCache():void {owner().reset()}
export function setEligibility(value:boolean):boolean {
 owner().recordEligibility(value,{memoize:true})
 return value
}
export function getSettingsPath():string {return path.join(getClaudeConfigHomeDir(),'remote-settings.json')}
export function getRemoteManagedSettingsSyncFromCache():SettingsJson|null {
 owner()
 return runtime.project()
}
export function getRawRemoteManagedSettingsCache():SettingsJson|null {owner();return runtime.read()}
export function getRemoteManagedSettingsIneligibleReason():unknown {owner();return runtime.ineligibleReason()}
export function isRemoteManagedSettingsCacheVerified():boolean {owner();return runtime.isVerified()}
export function getRemoteManagedSettingsLoadStatus():RemoteLoadStatus287|undefined {owner();return runtime.loadStatus()}
export function setRemoteManagedSettingsLoadStatus(value:RemoteLoadStatus287|undefined):void {owner();runtime.setLoadStatus(value)}

/** Existing owner bindings for the full native writer/clearer; not a second cache. */
export function getRemoteManagedSettingsRuntime287() {owner();return runtime}
