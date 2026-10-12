import * as fs from 'node:fs/promises'
import {constants} from 'node:fs'
import * as path from 'node:path'
import {randomBytes} from 'node:crypto'
import {z} from 'zod/v4'
import mapValues from 'lodash-es/mapValues.js'
import {isEnvTruthy} from '../utils/envUtils.js'
import * as native from './officialAppStateChange287/native.js'
import {getOriginalModsLifecycle287} from '../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {getExecutionSession287} from '../services/context/execution287.js'
import {OriginalHostRegistry287} from '../utils/settings/settingsCache.js'
import {authEnvironment} from '../utils/authEnvironment.js'
import {logForDebugging} from '../utils/debug.js'
import {logError} from '../utils/log.js'
import {lazySchema} from '../utils/lazySchema.js'
import {createSignal} from '../utils/signal.js'
import {errorMessage,getErrnoCode,isENOENT} from '../utils/errors.js'
import {sleep} from '../utils/sleep.js'
import {jsonStringify,jsonParse} from '../utils/slowOperations.js'
import {modelSwitchErrors287} from '../utils/hooks/modelSwitch287/errors.js'
export interface PublicJobState287 extends Record<string,unknown>{respawnFlags:string[];name?:string;nameSource?:string;updatedAt:string}
export interface AppStateJobOwner287 {
 fH(flag:string,aliases:string[],value:string|null,patch?:Record<string,unknown>,storageV5?:unknown,expectedNames?:string[],guard?:(flags:string[])=>boolean):Promise<void>
 Fr(dir:string,storageV5?:unknown):Promise<PublicJobState287|null>
 nt(dir:string,storageV5?:unknown,options?:{onReadFailure?:'null'}):Promise<PublicJobState287|null>
 ul(dir:string,state:PublicJobState287,storageV5?:unknown):Promise<void>
 jp(dir:string):void
 Se():{safeParse(value:unknown):{success:boolean;data?:PublicJobState287;error?:unknown}}
 O():unknown
 dt:{settle():Promise<void>;readonly size:number}
 Nl(error:unknown):void
}
const absent=(name:string):never=>{throw Error('Original AppState job source not installed: '+name)}
type AppStateJobWriteState287={ownStateWriteDepth:number;inFlightSnapshot:unknown;inFlightSnapshotChanged:ReturnType<typeof createSignal>;publishInFlightSnapshot(value:unknown):void;reset():void}
export function getAppStateJobWriteState287():AppStateJobWriteState287 {
 const canonical=getOriginalModsLifecycle287().clearSourceModule287('chunk-7fkv6k8a.js')
 return (canonical.R2 as ()=>AppStateJobWriteState287)()
}
export function getAppStateJobPorts287():Record<string,unknown>{
 const base={U:getExecutionSession287,V:OriginalHostRegistry287,Me:createSignal}
 const paths=native.createAppStatePathSanitizer287({})
 const publicFlags=native.createAppStateFlagsPublic287({})
 const flagsData=native.createAppStateJobFlagsData287({...publicFlags,ia:JSON.stringify})
 const flags=native.createAppStateJobFlags287({...paths,...flagsData,...publicFlags,t:logForDebugging,Le:isEnvTruthy})
 const atomic=native.createAppStateJobAtomic287({L:fs.open,a:constants,E:getErrnoCode,I:fs.lstat,xe:path.join,ve:path.basename,P:modelSwitchErrors287.P,x:fs.unlink,Te:randomBytes,oe:fs.writeFile,Pe:fs.access,K:fs.rename,ee:sleep})
 const string=native.createAppStateStringSanitizer287(native.createAppStateAnsi287({}))
 const names=native.createAppStateJobName287({...string,...native.createAppStateNameLimit287({})})
 return {...base,_A:paths._A,r9:flags.r9,O_e:flags.O_e,FLo:flags.FLo,OKn:flags.OKn,tn:native.createAppStateJobIdentity287({}).tn,dEe:native.createAppStateJobUuid287({}).dEe,Si:names.Si,Pg:native.createAppStateQueue287({}).Pg,R2:getAppStateJobWriteState287,Tn:atomic.Tn,
  a:authEnvironment,j:path.join,J:path.basename,Qe:path.isAbsolute,te:fs.lstat,pe:fs.readFile,t:logForDebugging,W:isENOENT,E:getErrnoCode,so:getErrnoCode,l:errorMessage,d:logError,
  // Frozen telemetry: no transport, business lstat/read/cache lifecycle is intact.
  i:()=>{},S:(value:unknown)=>value,Y:jsonParse,_:jsonStringify,f:lazySchema,u:z.object,o:z.string,B:z.enum,C:z.number,T:z.array,x:z.literal,H:z.boolean,de:z.record,se:z.unknown,
  Qr:native.createAppStateProviderEnv287({Ii:mapValues}).Qr,ih:string.ih,
  W9e:()=>absent('StorageV5 state reference'),Jt:()=>absent('StorageV5 state reader'),
  Vf:(error:unknown)=>getErrnoCode(error),it:errorMessage,P:modelSwitchErrors287.P,...native.createAppStateJobExpectedErrors287({}),
 }
}
/** Complete fH/Fr/nt/ul/Se/Ve + original queue, one singleton original host registry.
 * RenameJobs delegates here too; it has no remaining parallel cache/ownWrites. */
export function getAppStateJobOwner287():AppStateJobOwner287 {
 // Fr/ul/Ve/Xe declare here; this HEAD namespace imports R2 from chunk-7fkv6k8a.
 return getOriginalModsLifecycle287().clearSourceModule287('chunk-1jqp49rh.js') as unknown as AppStateJobOwner287
}
