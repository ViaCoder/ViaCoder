import type {PolicyRead287,PolicyReadContext287} from '../../../services/context/officialModelUsagePolicy287/native.js'
import type {SettingsStore287} from '../officialSettingsStore287/native.js'
import type {RawManagedRead287} from '../officialMdmRawRead287/native.js'
import type {ValidationError} from '../validation.js'
import type {SettingsJson} from '../types.js'
import type {authEnvironment} from '../../authEnvironment.js'
export interface ManagedPolicyRead287 {
 settings:SettingsJson|null;errors:ValidationError[];documentHasPolicyContent?:boolean
 loadState?:'loaded'|'absent'|'didNotLoad';onlySubstitutes?:boolean
}
export interface MdmPolicyRead287 extends Omit<ManagedPolicyRead287,'settings'> {settings:SettingsJson}
export interface ConsumedMdm287 {mdm:MdmPolicyRead287;hkcu:MdmPolicyRead287;wslInherits:boolean}
export interface PolicyRuling287 {
 path:string;message:string;statusOnly?:boolean;onlySubstitutes?:boolean;[key:string]:unknown
}
export interface ParsedPolicy287 {
 settings:SettingsJson|null;errors:PolicyRuling287[];documentHasPolicyContent:boolean
 loadState:'loaded'|'didNotLoad';removed:string[];onlySubstitutes?:boolean
}
export interface RuledEmpty287 {
 success:false;error:string;errorKind:'ruled_empty';rulings:PolicyRuling287[];skipRetry:true
}
export interface PolicyParserPorts287 {
 clone<T>(value:T):T
 omitBy<T extends object>(value:T,predicate:(value:unknown,key:string)=>boolean):Partial<T>
 environment:typeof authEnvironment
 debug:typeof import('../../debug.js').logForDebugging
 executionContext?:()=>{host:object}
 rawReadPromise?:()=>Promise<RawManagedRead287>|null
 rawRead?:()=>Promise<RawManagedRead287>
 logEvent?:typeof import('../../../services/analytics/index.js').logEvent
 diagnostics?:typeof import('../../diagLogs.js').logForDiagnosticsNoPII
 filesystem?:typeof import('../../fsOperations.js').getFsImplementation
 resolvePath?:typeof import('../../fsOperations.js').safeResolvePath
 expandConfigPath?:(fs:unknown,path:string)=>{resolvedPath:string}
 configHome?:()=>string
 managedPath?:()=>string
 platform?:typeof import('../../platform.js').getPlatform
 primerEnabled?:()=>boolean
 isWsl?:()=>boolean
 mergeWith?:typeof import('lodash-es/mergeWith.js').default
 ordinarySchema?:()=>unknown
 mdmRead?:(context:unknown)=>PolicyRead287
 builtins:{net:typeof import('node:net');path:typeof import('node:path')}
}
export interface PolicyParser287 {
 inlineSettings(value:Record<string,unknown>):{settings:SettingsJson|null;errors:ValidationError[]}
 mergeSettings(current:unknown,incoming:unknown,key:string):unknown

 helperPayload287(value:Record<string,unknown>,source:string):
  |{settings:SettingsJson;warnings:PolicyRuling287[];strippedKeys:string[]}
  |{error:string;warnings:PolicyRuling287[];strippedKeys:string[]}

 aliases(value:Record<string,unknown>,path:string):unknown[]
 isObject(value:unknown):boolean
 mergeMarkets(a:Record<string,unknown>,b:Record<string,unknown>):Record<string,unknown>
 fileIsConfig(path:string):boolean
 boundedRead(path:string,maxBytes:number):Promise<{content:string}>

 mdmRead():MdmPolicyRead287
 hkcuRead():MdmPolicyRead287
 wslInherits():boolean
 setMdm(mdm:MdmPolicyRead287,hkcu:MdmPolicyRead287,wslInherits:boolean):void
 windowsFileStamp(store?:SettingsStore287):Promise<string>
 mdmOwner():{mdm:MdmPolicyRead287|null;hkcu:MdmPolicyRead287|null;wslInherits:boolean;loadPromise:Promise<void>|null;startLoad(store?:SettingsStore287):void;replace(mdm:MdmPolicyRead287,hkcu:MdmPolicyRead287,wslInherits:boolean):void;reset():void}
 emptyMdm:MdmPolicyRead287
 emptyHkcu:MdmPolicyRead287
 command(stdout:string,source:string,options?:{userWritable?:boolean}):MdmPolicyRead287
 consume(raw:RawManagedRead287,store?:SettingsStore287):Promise<ConsumedMdm287>
 text(content:string,path:string,policy:boolean):ManagedPolicyRead287
 walk(directory:string,store:SettingsStore287):ManagedPolicyRead287
 readManaged(context:Pick<PolicyReadContext287,'store'|'mdm'|'wslInherits'>):ManagedPolicyRead287
 read(path:string,store:SettingsStore287,pinned?:string,policy?:boolean):ManagedPolicyRead287
 readUncached(path:string,pinned?:string,policy?:boolean):ManagedPolicyRead287
 responseSchema():{safeParse(value:unknown):
  |{success:true;data:{uuid:string;checksum:string;settings:Record<string,unknown>}}
  |{success:false;error:{message:string}}}
 parse(value:Record<string,unknown>,source:string):ParsedPolicy287
 strip(value:Record<string,unknown>):SettingsJson
 cleanupKeys:readonly string[]
 payload(value:Record<string,unknown>,source:string):
  |{ruledEmpty:RuledEmpty287}
  |{settings:SettingsJson;salvagedSettings:SettingsJson|undefined}
}
export function createPolicyParser287(ports:PolicyParserPorts287):PolicyParser287

/** Shared original constructors, not a second Zod or lazy-schema registry. */
export const confirmationSchema287: {
 f<T>(factory:()=>T):()=>T
 o():unknown;H():unknown;se():unknown
 u(shape:Record<string,unknown>):unknown
 de(key:unknown,value:unknown):{optional():unknown}
}
