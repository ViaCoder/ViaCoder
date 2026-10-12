import * as fs from 'node:fs'
import * as io from 'node:fs/promises'
import {verify,X509Certificate} from 'node:crypto'
import {z} from 'zod/v4'
import {getFsImplementation} from '../../utils/fsOperations.js'
import {getErrnoCode,errorMessage,isENOENT,toError} from '../../utils/errors.js'
import {logForDebugging} from '../../utils/debug.js'
import {logError} from '../../utils/log.js'
import {lock} from '../../utils/lockfile.js'
import {lazySchema} from '../../utils/lazySchema.js'
import {sleep} from '../../utils/sleep.js'
import {registerCleanup} from '../../utils/cleanupRegistry.js'
import {logEvent} from '../analytics/index.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../analytics/growthbook.js'
import {getAPIProvider} from '../../utils/model/providers.js'
import {getExecutionSession287} from '../context/execution287.js'
import {getSecureStorageExecutionHost} from '../../utils/secureStorage/macOsKeychainHelpers.js'
import {OfficialHostCell286} from './officialIdentity286/hostCell.js'
import {Bt} from '../../utils/officialHostFilesystem287/native.js'
import {createPolicyLocks287} from './officialPublic287/locks.js'
import {createPolicySignature287} from './officialPublic287/signature.js'
import {createPolicyDiagnostics287} from './officialPublic287/diagnostics.js'
import {createPolicyBoundedRead287} from './officialPublic287/boundedRead.js'
import {sessionActivity287} from '../../utils/sessionActivity.js'
import {createPolicyActivityGate287} from './officialPublic287/activityGate.js'
import {getPolicyPublicClient287} from './publicBindings287.js'

// These ports are the existing filesystem/runtime/library owners; every
// persistence/rewrite/repair arm remains in the complete original closure.
export const policyAtomic287={Tn:(path:string,text:string,mode?:number)=>Bt().atomicWrite(path,text,mode)}
const locks=createPolicyLocks287({lt:()=>({lock}),E:getErrnoCode,l:errorMessage,t:logForDebugging})
export function bindPolicySignaturePorts287():Record<string,unknown>{return {Bf:locks.Bf,oa:locks.oa,Tn:policyAtomic287.Tn,_:JSON.stringify,t:logForDebugging,l:errorMessage,ee:sleep,ae:getFsImplementation,Y:JSON.parse,f:lazySchema,u:z.object,o:z.string,C:z.number,G:X509Certificate,J:verify,x:z.literal,T:z.array,ge:io.unlink,W:isENOENT,j:io.lstat,Wl:fs.constants.O_NOFOLLOW|(fs.constants.O_NONBLOCK??0),me:io.open,R:fs.constants}}
export const policySignature287=createPolicySignature287(bindPolicySignaturePorts287())
export const policyBoundedRead287=createPolicyBoundedRead287({})

export function bindPolicyDiagnosticPorts287():Record<string,unknown>{
 const native=getPolicyPublicClient287()
 return {...policySignature287,E:getErrnoCode,l:errorMessage,t:logForDebugging,i:logEvent,c:(v:unknown)=>v,S:(v:unknown)=>v,me:(v:unknown)=>v,
 He:getAPIProvider,EL:()=>true, // frozen telemetry-C; prevents the original telemetry-only attribution probe
 f:lazySchema,u:z.object,o:z.string,U:()=>({host:getSecureStorageExecutionHost()}),V:OfficialHostCell286,d:logError,Z:toError,
 Rs:(cell:{of(host:object):unknown})=>cell.of(getSecureStorageExecutionHost()),_t:registerCleanup,
 Hg:()=>getExecutionSession287().userPresence.lastInteractionTime(),CY:()=>getExecutionSession287().requestJournal.lastApiCompletionTimestamp(),
 Kue:activityGate.Kue,vY:(listener:()=>void)=>getExecutionSession287().userPresence.interactionFired.subscribe(listener),k:getFeatureValue_CACHED_MAY_BE_STALE,
 gGo:native.gGo,hGo:native.hGo,yGo:native.yGo}
}
// Original Kue/que read the existing A6 activity owner and selected surface.
const activityGate=createPolicyActivityGate287({r:sessionActivity287.owner,cKt:()=>{
 const surface=getExecutionSession287().surfaceCapabilities as unknown as {mainQueryRunning():boolean}
 return surface.mainQueryRunning()
}})
let diagnostics:ReturnType<typeof createPolicyDiagnostics287>|undefined
export function getPolicyDiagnostics287(){return diagnostics??=createPolicyDiagnostics287(bindPolicyDiagnosticPorts287())}
