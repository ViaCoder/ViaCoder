import type {UserMessage,AssistantMessage} from '../../../types/message.js'
import type {BetaMessageParam} from '@anthropic-ai/sdk/resources/beta/messages/messages.mjs'
import type {ExecutionSession287} from '../../context/officialExecutionOwners287/native.js'
import type {RuntimeMemo287} from '../../context/officialRuntimeMemo287/native.js'
export type RequestCacheTtl287='5m'|'1h'
export type RequestCacheSelection287={ttl:RequestCacheTtl287;reason:'default'|'subscriber'|'force_5m_env'|'env'|'setting'|'agent_frontmatter'|'enable_1h_env'}
export interface RequestCachePorts287 {
 provider():string
 environment:import('../../../utils/officialTypedEnvironment287/native.js').TypedEnvironment287
 subscriber():boolean
 config<T>(name:string,fallback:T):T
 settings():{promptCacheTtl?:RequestCacheTtl287;subagentPromptCacheTtl?:RequestCacheTtl287}
 limits():{isUsingOverage?:boolean}
 execution():ExecutionSession287
 runtimeMemo():RuntimeMemo287
 experimentalAllowed():boolean
 experimentalDisabled():boolean
 decoders:import('../../../utils/officialAuthEnvironment/runtime.js').AuthDecoders
 analytics(name:string,attributes:Record<string,number|boolean>):void
 errorLog(error:unknown):void
 debug(message:string,options?:{level?:string}):void
}
export interface RequestCacheTTL287 {

 select(source?:string,options?:{agentCacheTtlOverride?:RequestCacheTtl287;ignoreOverage?:boolean}):RequestCacheSelection287
 is1h(source?:string,options?:{agentCacheTtlOverride?:RequestCacheTtl287;ignoreOverage?:boolean}):boolean
 allowlist():string[]|null
 replaceAllowlist(value:string[]|null):void
 whitespaceUnstampable():boolean
 userMessage(message:UserMessage,mark?:boolean,enabled?:boolean,ttl?:'1h'):BetaMessageParam
 assistantMessage(message:AssistantMessage,mark?:boolean,enabled?:boolean,ttl?:'1h',whitespaceUnstampable?:boolean):BetaMessageParam
 messages(messages:readonly (UserMessage|AssistantMessage)[],enabled:boolean,ttl?:'1h',skipWrite?:boolean,forkPointUuid?:string,proxyDemoted?:boolean,provider?:string,threadedContinue?:boolean,topLevelCacheControl?:boolean,clearAtAfter?:boolean,wireIndices?:number[],divergesAtMessageId?:string,tailAudit?:{report(value:unknown):void;skipMessageCacheMarkers?:boolean;threadedContinue?:boolean},forkCachePin?:boolean,emitTelemetry?:boolean):BetaMessageParam[]
 messages(messages:readonly (UserMessage|AssistantMessage|import('../../../utils/officialToolSchema287/native.js').ApiSystemMessage287)[],enabled:boolean,ttl?:'1h',skipWrite?:boolean,forkPointUuid?:string,proxyDemoted?:boolean,provider?:string,threadedContinue?:boolean,topLevelCacheControl?:boolean,clearAtAfter?:boolean,wireIndices?:number[],divergesAtMessageId?:string,tailAudit?:{report(value:unknown):void;skipMessageCacheMarkers?:boolean;threadedContinue?:boolean},forkCachePin?:boolean,emitTelemetry?:boolean):import('../toolSearchRequest287.js').ToolSearchMessageWire287[]
}
export declare function createRequestCacheTTL287(ports:RequestCachePorts287):RequestCacheTTL287
