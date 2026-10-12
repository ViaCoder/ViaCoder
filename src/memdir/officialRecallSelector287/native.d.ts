import type Anthropic from '@anthropic-ai/sdk'
import type {ToolUseContext} from '../../Tool.js'
import type {Message} from '../../types/message.js'
import type {Attachment} from '../../utils/attachments.js'
import type {QuerySource} from '../../constants/querySource.js'
import type {MemoryHeader} from '../memoryScan.js'
import type {SideQueryOptions,sideQuery} from '../../utils/sideQuery.js'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
import type {CredentialStore} from '../../utils/officialSecureStorage/runtime.js'

/** Passed original S7/Scope state, not a factory-created copy or cache. */
export interface RecallSelectorState287 {
 stateByDir:Record<string,{
  memories:MemoryHeader[];messages:Anthropic.MessageParam[];hydrated:boolean
  account?:{key:unknown;names:Set<string>;message:Anthropic.MessageParam};accountScope?:unknown
 }>
 lastUsage:null|{cacheReadInputTokens:number;cacheCreationInputTokens:number;turnCount:number}
}
export type RecallContext287=ToolUseContext&{session:ExecutionSession287;memorySelector:RecallSelectorState287}
export interface RecallPrefetch287 {
 promise:Promise<Attachment[]>;settledAt:number|null;consumedOnIteration:number
 consumedBlocking:boolean;earlierReadsMayBeCleared:boolean
 screen(attachments:readonly Attachment[],context:ToolUseContext):Attachment[]
 [Symbol.dispose]():void
}
export type RecallSelected287={path:string;mtimeMs:number;account?:boolean}
export interface RecallSelector287 {
 find(session:ExecutionSession287,query:string,directory:string,state:RecallSelectorState287,signal:AbortSignal,
  surfaced?:ReadonlySet<string>,viaIndex?:boolean,exclude?:((path:string)=>boolean),persist?:boolean,
  alreadyRead?:((path:string)=>boolean),multiStore?:()=>boolean,storageV5?:unknown,credentials?:CredentialStore,
  turnReverts?:(()=>void)[],regularFilesOnly?:boolean,account?:undefined,readLocal?:boolean,scope?:undefined):Promise<RecallSelected287[]>
 prefetch(messages:ReadonlyArray<Message>,context:RecallContext287,querySource:QuerySource,storageV5?:unknown):RecallPrefetch287|undefined
 collect(messages:ReadonlyArray<Message>):{paths:Set<string>;totalBytes:number}
 read(selected:ReadonlyArray<RecallSelected287&{regularFilesOnly?:boolean;containedIn?:string}>,signal?:AbortSignal):Promise<{path:string;content:string;mtimeMs:number;header:string;limit?:number}[]>
 seenRead(state:ToolUseContext['readFileState'],path:string,earlierReadsMayBeCleared?:boolean):boolean
}
export interface RecallSelectorPorts287 extends Record<string,unknown> {
 t2:typeof sideQuery;Mor:string
 findRelevantMemories287:RecallSelector287['find']
 requestSelectorOnce287(run:(model:string)=>ReturnType<typeof sideQuery>,signal:AbortSignal):Promise<{result:Anthropic.Beta.Messages.BetaMessage;refusals:0}>
 importRecallIndex287():Promise<{searchMemoryFilesWithIndex:(...args:Parameters<import('../officialRecallStartup287/runtime.js').RecallIndexNamespace287['Jo']>)=>ReturnType<import('../officialRecallStartup287/runtime.js').RecallIndexNamespace287['Jo']>}>
}
export function createRecallSelector287(ports:RecallSelectorPorts287):RecallSelector287
