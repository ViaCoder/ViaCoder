import * as path from 'node:path'
import * as fs from 'node:fs'
import * as fsPromises from 'node:fs/promises'
import * as crypto from 'node:crypto'
import * as timers from 'node:timers/promises'
import {createConfigPlatformAtomic} from '../officialConfigWriter/platform.js'
import cloneDeep from 'lodash-es/cloneDeep.js'
import mergeWith from 'lodash-es/mergeWith.js'
import isEqual from 'lodash-es/isEqual.js'
import {createFastStatusSettingsWriter287} from './officialFastStatusWriter287/native.js'
import {getAtomicWriter287} from '../atomicWriter287.js'
import {getAtomicStaging287} from '../atomicStaging287.js'
import {getOriginalSettingsReader287} from './settingsReader287.js'
import {OriginalSettingsSnapshotStore287} from './settingsCache.js'
import {getSettingsCacheStore287,resetSettingsCache} from './settingsCache.js'
import {getPolicyParser287} from './policyParserOwner287.js'
import {getSettingsWithErrors} from './settings.js'
import {getFsImplementation,safeResolvePath} from '../fsOperations.js'
import {getOriginalCwd} from '../../bootstrap/state.js'
import {getClaudeConfigHomeDir} from '../envUtils.js'
import {logForDebugging} from '../debug.js'
import {isStorageV5PinnedOn} from '../secureStorage/storageV5.js'
import {isENOENT} from '../errors.js'
import {jsonStringify} from '../slowOperations.js'
import {safeParseJSON} from '../json.js'
import {modelSwitchErrors287} from '../hooks/modelSwitch287/errors.js'

// The existing original async settings writer serves Rbe and ordinary repo
// settings, including original local legacy revocation and gitignore publication.
// Only the private StorageV5 retention backend remains an explicit cut.
const outOfScope = ():never => {throw Error('Original async settings writer: private StorageV5 retention backend is not installed')}
export function getFastStatusSettingsWriterPorts287():Record<string,unknown> {
 const parser=getPolicyParser287()
 const nativeAtomic=getAtomicWriter287(),reader=getOriginalSettingsReader287()
 const platformAtomic=createConfigPlatformAtomic(process.platform,process.arch,{crypto,fs,fsPromises,path,timers,
  fileOps:getFsImplementation,context:()=>({host:(require('../secureStorage/macOsKeychainHelpers.js') as typeof import('../secureStorage/macOsKeychainHelpers.js')).getSecureStorageExecutionHost()}),
  featureSad:(feature:string,reason:string)=>logForDebugging(`${feature}: ${reason}`,{level:'error'}),debug:logForDebugging})
 return {
  Zn:(source:import('./constants.js').SettingSource)=>reader.path(source,reader.context()),um:getOriginalCwd,gR:reader.NoProjectError,F:isStorageV5PinnedOn,Tt:path.basename,
  va:getSettingsCacheStore287,M:reader.context,
  hVt:reader.unfiltered,QF:parser.read,bo:safeResolvePath,ae:getFsImplementation,lO:parser.fileIsConfig,
  ZWe:(fs:ReturnType<typeof getFsImplementation>,path:string)=>{const {getReadPermissions287}=require('../permissions/read.js') as typeof import('../permissions/read.js');return getReadPermissions287().ZWe(fs,path)},Rg:parser.boundedRead,W:isENOENT,gt:safeParseJSON,_f:cloneDeep,ce:path.dirname,VF:mergeWith,
  _:jsonStringify,
  De:{userSettings:()=>({namespace:'settings',layer:'user'})},P:modelSwitchErrors287.P,rC:platformAtomic.write,dm:nativeAtomic.SymlinkWriteRefusedError,
  OY:reader.isConfigDirectory,
  me:path.join,bL:'.cc-writes',Ro:resetSettingsCache,R_:getSettingsWithErrors,d:(error:unknown)=>logForDebugging(String(error),{level:'error'}),t:logForDebugging,l:String,
  fr:outOfScope,xtr:(pattern:string,cwd:string)=>getAtomicStaging287().publishGitignore(pattern,cwd),
  dO:reader.relativePath,Co:()=>reader.context().projectConfigDir,Ee:getOriginalCwd,
  y:()=>logForDebugging('gitignore global rule effective'),p:(_feature:string,reason:string)=>logForDebugging(`gitignore: ${reason}`),m:(_feature:string,reason:string)=>logForDebugging(`gitignore: ${reason}`,{level:'warn'}),
  // Complete rs uses the actual M/At/pCn snapshot and same d6e parsedFiles.
  At:reader.heldContext,DZ:reader.legacyPath,d6e:OriginalSettingsSnapshotStore287,NU:reader.path,HZ:parser.text,Sz:parser.mergeSettings,
  vwt:(value:Record<string,unknown>|null)=>value!==null&&Object.keys(value).length===0?null:value,Or:isEqual,pCn:reader.snapshot,
 }
}
let writer:ReturnType<typeof createFastStatusSettingsWriter287>|undefined
export function getFastStatusSettingsWriter287(){return writer??=createFastStatusSettingsWriter287(getFastStatusSettingsWriterPorts287())}
export function updateFastStatusSettings287(source:'userSettings',settings:{fastMode?:undefined},storageV5?:unknown){
 return getFastStatusSettingsWriter287().update(source,settings,undefined,storageV5)
}

export function updateOrdinarySettingsAsync287(source:'userSettings'|'projectSettings'|'localSettings',settings:import('./types.js').SettingsJson,storageV5?:unknown){
 return getFastStatusSettingsWriter287().update(source,settings,undefined,storageV5)
}

/** Full original Ri, sharing the existing hn per-path queue and source owner. */
export function transformOrdinarySettingsAsync287(source:'userSettings'|'projectSettings'|'localSettings',transform:(existing:Record<string,unknown>|null)=>Record<string,unknown>|null,storageV5?:unknown){return getFastStatusSettingsWriter287().transform(source,transform,undefined,storageV5)}
