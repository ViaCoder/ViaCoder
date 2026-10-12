import {createBtwPrefix287} from './officialBtwPrefix287/native.js'
import {getSystemPrompt} from '../constants/prompts.js'
import {getUserContext,getSystemContext} from '../context.js'
import {getLastCacheSafeParams,type CacheSafeParams} from './forkedAgent.js'
import {asSystemPrompt} from './systemPromptType.js'
import type {ToolUseContext} from '../Tool.js'
import {adaptQueryPrefixContext287} from './queryPrefixContext287.js'

const original=createBtwPrefix287({JR:()=>getLastCacheSafeParams(),kA:(tools,model)=>getSystemPrompt(tools,model),kC:(session,storage,credentials)=>getUserContext(session,storage,credentials),QB:(session,phrase)=>getSystemContext(session,phrase),mi:asSystemPrompt})

/** JSX /btw keeps the current context identity and the existing prefix owner. */
export async function buildBtwCacheSafeParams287(context:ToolUseContext):Promise<CacheSafeParams & {advisorModel?:string}> {
 const result=await original.build(adaptQueryPrefixContext287(context))
 return {...result,toolUseContext:context}
}
