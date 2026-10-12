import type {ExecutionSession287,ExecutionSessionRegistryConstructor287,LegacyExecutionContext287} from '../../services/context/officialExecutionOwners287/native.js'
import type {PrintDispatchCommand287} from './dispatchPolicyNative.js'
import type {PrintClearSurvivors287} from './controlNative.js'
export interface PrintArtifactState287 {
 codeliveredFollowups:Map<string,{noteUuid():string|undefined;revoke(cause:'cancel'):void}>
 summonStatus:{handOffs:Map<string,unknown>;sidBySlug:Map<string,string>;seqBySid:Map<string,number>;routeAbsentSince:number|null}
 autoReact:{userDisarmed:boolean;[key:string]:unknown}
 [key:string]:unknown
}
export interface PrintCancellationNative287 {
 artifactSlot():{current:PrintArtifactState287|undefined}
 cancelHandoffs(commands:readonly PrintDispatchCommand287[]):void
 artifactState():PrintArtifactState287
 revokeCodeliveredFollowups(commands:readonly PrintDispatchCommand287[]):void
 cancelArtifactHandoffs(commands:readonly PrintDispatchCommand287[]):PrintClearSurvivors287
 requeueSurvivors(queue:{enqueuePendingNotification(command:PrintDispatchCommand287):void},survivors:PrintClearSurvivors287,stopped?:number):void
}
export function createPrintCancellationNative287(ports:{
 executionContext():ExecutionSession287
 legacyContext():LegacyExecutionContext287|undefined
 process:NodeJS.Process
 Registry:ExecutionSessionRegistryConstructor287
 analytics:typeof import('../../services/analytics/index.js').logEvent
 debug:typeof import('../../utils/debug.js').logForDebugging
 logError:typeof import('../../utils/log.js').logError
 configOwner():unknown
 getGlobalConfig():unknown
 saveGlobalConfig(updater:(config:any)=>any,storage?:unknown):unknown
 emitSummonStatus?:((slug:string,thread:string,packet:unknown)=>Promise<unknown>)|undefined
}):PrintCancellationNative287
