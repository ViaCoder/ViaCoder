import type {Messages,BetaMessageStreamParams,BetaRawMessageStreamEvent,BetaMessageParam,BetaMessage} from '@anthropic-ai/sdk/resources/beta/messages/messages.mjs'
import type {APIPromise} from '@anthropic-ai/sdk/core/api-promise.mjs'
import type {Stream} from '@anthropic-ai/sdk/core/streaming.mjs'
type RequestOptions=NonNullable<Parameters<Messages['create']>[1]>
import type {ApiSystemMessage287} from '../../utils/officialToolSchema287/native.js'
import type {UserMessage,AssistantMessage} from '../../types/message.js'
import {getRequestCacheTTL287} from './requestCacheTTL287.js'
/** Native287 JNo/rMo serialize this public experimental wire form. The
 * installed SDK's JS create forwards body unchanged; its published role union
 * is narrower. This callable boundary is scoped to that proven source form,
 * not a replacement SDK, transport or message controller. */
export interface SystemMessageWire287 {role:'system';content:string|readonly Record<string,unknown>[];output_config?:Record<string,unknown>}
export type ToolSearchMessageWire287=BetaMessageParam|SystemMessageWire287
export type ToolSearchBody287=Omit<BetaMessageStreamParams,'messages'>&{messages:ToolSearchMessageWire287[];stream:true}
export function serializeToolSearchMessages287(messages:readonly(UserMessage|AssistantMessage|ApiSystemMessage287)[],enabled:boolean,ttl?:'1h',skipWrite?:boolean,forkPoint?:string,proxyDemoted?:boolean,wireIndices?:number[]):ToolSearchMessageWire287[]{
 return getRequestCacheTTL287().messages(messages,enabled,ttl,skipWrite,forkPoint,proxyDemoted,undefined,undefined,undefined,undefined,wireIndices)
}
export function createToolSearchStream287(api:Messages,params:BetaMessageStreamParams,options:RequestOptions,messages:ToolSearchMessageWire287[]):APIPromise<Stream<BetaRawMessageStreamEvent>>{
 const create=api.create as (body:ToolSearchBody287,request?:RequestOptions)=>APIPromise<Stream<BetaRawMessageStreamEvent>>
 return create.call(api,{...params,messages,stream:true},options)
}

export function createToolSearchResponse287(api:Messages,params:BetaMessageStreamParams,options:RequestOptions,messages:ToolSearchMessageWire287[]):APIPromise<BetaMessage>{
 const create=api.create as (body:Omit<ToolSearchBody287,'stream'>&{stream?:false},request?:RequestOptions)=>APIPromise<BetaMessage>
 return create.call(api,{...params,messages,stream:false},options)
}
