import * as net from 'node:net'
import * as path from 'node:path'
import cloneDeep from 'lodash-es/cloneDeep.js'
import omitBy from 'lodash-es/omitBy.js'
import mergeWith from 'lodash-es/mergeWith.js'
import {authEnvironment} from '../authEnvironment.js'
import {logForDebugging} from '../debug.js'
import {getFsImplementation,safeResolvePath} from '../fsOperations.js'
import {getClaudeConfigHomeDir} from '../envUtils.js'
import {getPlatform} from '../platform.js'
import {logForDiagnosticsNoPII} from '../diagLogs.js'
import {logEvent} from '../../services/analytics/index.js'
import {getManagedFilePath} from './managedPath.js'
import {isSettingsPrimerEnabled287} from './settingsCache.js'
import {createPolicyParser287,type PolicyParser287} from './officialPolicyParser287/native.js'

// The existing ModelUsage parser moves here; managed-file/MDM consumers acquire
// this same closure. QF uses the canonical store's parsedFiles, never another map.
export function getPolicyParserPorts287() {
 return {clone:cloneDeep,omitBy,mergeWith,environment:authEnvironment,debug:logForDebugging,
  builtins:{net,path},filesystem:getFsImplementation,resolvePath:safeResolvePath,
  executionContext:()=>{const {getSecureStorageExecutionHost}=require('../secureStorage/macOsKeychainHelpers.js') as typeof import('../secureStorage/macOsKeychainHelpers.js');return {host:getSecureStorageExecutionHost()}},
  rawReadPromise:()=>{const {getMdmRawReadPromise}=require('./mdm/rawRead.js') as typeof import('./mdm/rawRead.js');return getMdmRawReadPromise()},
  rawRead:()=>{const {fireRawRead}=require('./mdm/rawRead.js') as typeof import('./mdm/rawRead.js');return fireRawRead()},
  logEvent,diagnostics:logForDiagnosticsNoPII,
  configHome:getClaudeConfigHomeDir,managedPath:getManagedFilePath,platform:getPlatform,
  primerEnabled:isSettingsPrimerEnabled287,isWsl:()=>getPlatform()==='wsl',
  ordinarySchema:()=>{const {SettingsSchema}=require('./types.js') as typeof import('./types.js');return SettingsSchema()},
  // Ordinary wK uses the same restored Read ancestry owner, not a second path cache.
  expandConfigPath:(fs:unknown,path:string)=>{const {getReadPermissions287}=require('../permissions/read.js') as typeof import('../permissions/read.js');return getReadPermissions287().CL(fs as ReturnType<typeof getFsImplementation>,path)},
  mdmRead:(context:unknown)=>{const {getModelUsagePolicy287}=require('../../services/context/modelUsagePolicy287.js') as typeof import('../../services/context/modelUsagePolicy287.js');return getModelUsagePolicy287().mdmPolicyRead(context as import('../../services/context/officialModelUsagePolicy287/native.js').PolicyReadContext287)},
 }
}
let owner:PolicyParser287|undefined
export function getPolicyParser287():PolicyParser287 {
 return owner??=createPolicyParser287(getPolicyParserPorts287())
}
