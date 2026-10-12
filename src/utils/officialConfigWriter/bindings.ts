// Concrete standalone I/O bindings for the original 2.1.286 config pipeline.
// Ownership, enable/read lifecycle and backend handoff are supplied by callers;
// this factory does not install a second cache or assume a V5 backend exists.
import * as crypto from 'node:crypto'
import * as fs from 'node:fs'
import * as fsPromises from 'node:fs/promises'
import * as path from 'node:path'
import * as timers from 'node:timers/promises'
import {copyFile} from 'node:fs/promises'
import {basename,dirname,join} from 'node:path'
import pickBy from 'lodash-es/pickBy.js'
import * as native from './runtime.js'
import {createConfigPlatformAtomic} from './platform.js'
import {getFsImplementation} from '../fsOperations.js'
import {lock} from '../lockfile.js'
import {logError} from '../log.js'
import {registerCleanup,hasCleanupStarted} from '../cleanupRegistry.js'
import {logForDiagnosticsNoPII} from '../diagLogs.js'
import {configErrors} from './errors.js'

export const configQueue = native.createConfigQueue()
export const configSignal = native.createConfigSignal()
export const ConfigState = native.createConfigState({Me:configSignal,ng:configQueue})
export const configKeys = native.createConfigKeys()
export {configErrors} from './errors.js'
const sleep = native.createConfigSleep()
const results = native.createConfigResult()
const pages = native.createConfigPagination()
const format = native.createConfigFormatter()
const json = native.createConfigJson({d:logError,nt:configErrors.wrapParseError,y0:native.createConfigMemo()})
const nativeLock = native.createConfigLock({lt:()=>({lock})})
const watch = native.createConfigWatch({Uo:fs.watchFile,d:logError})
const fileOps = () => ({...getFsImplementation(),copyFile})
export type NativeConfigState = InstanceType<typeof ConfigState>
export type ConfigBindingOptions = {
 state():NativeConfigState
 host():object
 file():string
 home():string
 project():string
 storageV5():boolean
 diskless():boolean
 debug(message:string,options?:{level?:string}):void
 event(name:string,metadata:Record<string,unknown>):void
 featureSad(feature:string,reason:string):void
}
export function bindConfigWriter(options:ConfigBindingOptions) {
 const atomic = createConfigPlatformAtomic(process.platform,process.arch,{
  crypto,fs,fsPromises,path,timers,fileOps,
  context:()=>({host:options.host()}),featureSad:options.featureSad,debug:options.debug,
 })
 return native.createConfigWriter({
  Bg:results.ok,F:options.storageV5,G:configErrors.isENOENT,Ge:join,J:JSON.parse,Oe:configKeys,Qi:nativeLock,Ro:json.stripBOM,S:JSON.stringify,Z:sleep,
  IC:hasCleanupStarted,Ic:fs.unwatchFile,Own:watch,_t:registerCleanup,te:logForDiagnosticsNoPII,
  ae:fileOps,bn:options.diskless,c:(value:unknown)=>value,ft:json.parse,
  i:options.event,kp:pages.cap,lp:results.error,oe:options.state,oi:pages.pages,p:options.featureSad,
  qa:dirname,rt:format,t:options.debug,tl:basename,v:configErrors.errno,vxe:options.project,we:options.home,wv:atomic.write,xP:configErrors.ConfigParseError,
  za:options.file,zr:pickBy,
 })
}
