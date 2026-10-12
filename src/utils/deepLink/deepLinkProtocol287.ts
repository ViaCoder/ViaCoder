import * as fs from 'node:fs/promises'
import * as os from 'node:os'
import * as path from 'node:path'
import {getClaudeConfigHomeDir} from '../envUtils.js'
import {getXDGDataHome} from '../xdg.js'
import {getInitialSettings} from '../settings/settings.js'
import {isStorageV5PinnedOn} from '../secureStorage/storageV5.js'
import {which} from '../which.js'
import {execFileNoThrow} from '../execFileNoThrow.js'
import {logForDebugging} from '../debug.js'
import {DEEP_LINK_PROTOCOL} from './parseDeepLink.js'
import {getDeepLinkStableEntry287} from './stableEntry287.js'
import {createDeepLinkProtocol287,type DeepLinkPorts287} from '../officialDeepLinkProtocol287/native.js'
function sourceModule(file:string):Record<string,unknown>{
 return (require('../hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearSourceModule287(file)
}
export function createDeepLinkProductionPorts287():DeepLinkPorts287{
 return {
  errno:error=>(sourceModule('chunk-c9me9cp7.js').E as (error:unknown)=>unknown)(error),
  errorCode:error=>(sourceModule('chunk-c9me9cp7.js').so as (error:unknown)=>string|undefined)(error),
  storagePinned:isStorageV5PinnedOn,
  featureSuccess:name=>(sourceModule('chunk-9d2ykxmy.js').y as (name:string)=>unknown)(name),
  featureFailure:(name,code)=>(sourceModule('chunk-9d2ykxmy.js').m as (name:string,code:string)=>unknown)(name,code),
  debug:logForDebugging,configHome:getClaudeConfigHomeDir,
  keys:{state:name=>(sourceModule('chunk-2z86j2rq.js').De as DeepLinkPorts287['keys']).state(name)},
  which,exec:execFileNoThrow,
  // Retained C: route protocol activation to this source application's stable
  // entry, never the user's separately installed official claude executable.
  stablePath:getDeepLinkStableEntry287,
  settings:getInitialSettings,protocol:DEEP_LINK_PROTOCOL,dataHome:getXDGDataHome,fs,os,path,
 }
}
export const deepLinkProtocol287=createDeepLinkProtocol287(createDeepLinkProductionPorts287())
