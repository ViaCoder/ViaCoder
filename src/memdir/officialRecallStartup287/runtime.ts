import {getExecutionSession287} from '../../services/context/execution287.js'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
import {createRecallStartupConsumer287} from './native.js'

export interface RecallPrewarmNamespace287 {
 bt(session:ExecutionSession287):void
 ue:{of(host:ExecutionSession287['host']):{claim():boolean;fired:boolean}}
}
export interface RecallIndexNamespace287 {
 Xo(session:ExecutionSession287,directory:string,exclude?:((path:string)=>boolean),visible?:((path:string)=>boolean)):void
 Jo(session:ExecutionSession287,query:string|{exact_terms:string[];conceptual_keywords:string[]},directory:string,signal:AbortSignal,limit?:number,exclusions?:{excluded:Set<string>;excludedPrefixes:string[]}|null,exclude?:((path:string)=>boolean),prewarm?:boolean,visible?:((path:string)=>boolean)):Promise<{
  ranked:{path:string;mtimeMs:number;score:number}[]
  stats:{docCount:number;termCount:number;loadedFromDisk:boolean;storeWasHeld:boolean;hitCount:number;queryTermCount:number;tookMs:number;sync:{scanCompleted:boolean;transientSkips:number}}
 }>
}
function namespace(file:string):Record<string,unknown>{
 const canonical=import.meta.require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')
 return canonical.getOriginalModsLifecycle287().clearSourceModule287(file)
}
/** A finite view of the original selected namespace, not a second latch/index. */
export function getRecallPrewarmNamespace287():RecallPrewarmNamespace287{
 const source=namespace('chunk-1sb33067.js')
 if(typeof source.bt!=='function'||!source.ue||typeof source.ue!=='object'||typeof Reflect.get(source.ue,'of')!=='function')throw Error('Original Recall prewarm namespace missing')
 return source as Record<string,unknown>&RecallPrewarmNamespace287
}
export function getRecallIndexNamespace287():RecallIndexNamespace287{
 const source=namespace('chunk-ef2rd7de.js')
 if(typeof source.Xo!=='function'||typeof source.Jo!=='function')throw Error('Original Recall index namespace missing')
 return source as Record<string,unknown>&RecallIndexNamespace287
}
/** The startup caller passes its existing session; original bt owns eligibility,
 * host-scoped one-shot claim, and the asynchronous original index operation. */
export function startRecallPrewarm287(session:ExecutionSession287=getExecutionSession287()):Promise<void>{
 return createRecallStartupConsumer287({o:session,importRecall287:async()=>({maybePrewarmRecallIndex:getRecallPrewarmNamespace287().bt})})()
}
