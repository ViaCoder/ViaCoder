import * as path from 'node:path'
import * as os from 'node:os'
import * as processApi from 'node:process'
import {getOriginalCwd} from '../bootstrap/state.js'
import {getFsImplementation} from './fsOperations.js'
import {getClaudeConfigHomeDir} from './envUtils.js'
import {getSettings_DEPRECATED} from './settings/settings.js'
import {logForDebugging} from './debug.js'
import {logError} from './log.js'
import {createCleanupCutoff287} from './officialCleanupCutoff287/native.js'
import {createCleanupLogs287, type CleanupLogsPorts287} from './officialCleanupLogs287/native.js'

function sourceModule(file:string):Record<string,unknown> {
  return (require('./hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('./hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearSourceModule287(file)
}

// Original declarations resolve against the existing canonical graph at call
// time, not a second auth/settings/filesystem owner during graph construction.
export function createCleanupLogPorts287():CleanupLogsPorts287 {
  return {
    ae:getFsImplementation,we:getClaudeConfigHomeDir,Ee:getOriginalCwd,
    tee:value => (sourceModule('chunk-x1058jpn.js').tee as (value:string)=>number)(value),
    W:error => (sourceModule('chunk-c9me9cp7.js').W as (error:unknown)=>boolean)(error),
    Ht:error => (sourceModule('chunk-c9me9cp7.js').Ht as (error:unknown)=>boolean)(error),
    ch:error => (sourceModule('chunk-c9me9cp7.js').ch as (error:unknown)=>boolean)(error),
    t:logForDebugging,d:logError,
    $_:createCleanupCutoff287({er:getSettings_DEPRECATED,T1t:30}),
    o:path,E:os,l:processApi,c:process.env,T:path.join,h:path.join,
  }
}

// All declarations in this factory are stateless helpers or readonly path
// values. Retention and filesystem state stay in their existing owners.
export const cleanupLogs287=createCleanupLogs287(createCleanupLogPorts287())
