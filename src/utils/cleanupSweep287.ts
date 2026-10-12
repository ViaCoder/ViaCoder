import {join} from 'node:path'
import {getSessionId} from '../bootstrap/state.js'
import {getFsImplementation} from './fsOperations.js'
import {getClaudeConfigHomeDir} from './envUtils.js'
import {getSettings_DEPRECATED} from './settings/settings.js'
import {logForDebugging} from './debug.js'
import {createCleanupCutoff287} from './officialCleanupCutoff287/native.js'
import {createCleanupRetentionLeaves287} from './officialCleanupRetentionLeaves287/native.js'
import {cleanupLogs287} from './cleanupLogs287.js'
import type {StorageV5Backend} from './secureStorage/storageV5.js'
function sourceModule(file:string):Record<string,unknown>{
 return (require('./hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('./hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearSourceModule287(file)
}
// Retained C: only history/default retention changes. All explicit positive
// limits and original optional per-call caps keep their original semantics.
export const cleanupHistoryCutoff287=createCleanupCutoff287({er:getSettings_DEPRECATED,T1t:0})
const leaves=createCleanupRetentionLeaves287({ae:getFsImplementation,se:join,we:getClaudeConfigHomeDir,q:getSessionId,t:logForDebugging,
 Qk:name=>(sourceModule('chunk-f1vb7bx7.js').Qk as (name:string)=>readonly [number|null|undefined,...unknown[]])(name),
})
export function cleanupRetentionSetting287(name:string,fallback:number):Date|null{
 return leaves.settingCutoff(name,name==='cleanupPeriodDays'?0:fallback)
}
export function cleanupHistoryImages287():Promise<void>{
 return cleanupHistoryCutoff287()===null?Promise.resolve():leaves.images()
}
export const cleanupMessageLogs287=()=>cleanupLogs287.messageLogs()
export const cleanupDebugLogs287=()=>cleanupLogs287.debugLogs()
/** Complete original fSr dispatch/aggregate/disposal with five explicit C leaf bindings. */
export function runCleanupSweep287(storage?:StorageV5Backend):Promise<void>{
 return (sourceModule('chunk-925etgj7.js').fSr as (storage?:StorageV5Backend)=>Promise<void>)(storage)
}
