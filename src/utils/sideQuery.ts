import type Anthropic from '@anthropic-ai/sdk'
import type {BetaToolUnion} from '@anthropic-ai/sdk/resources/beta/messages.js'
import type {QuerySource} from '../constants/querySource.js'
import type {CredentialStore} from './officialSecureStorage/runtime.js'
import type {BetaToken287} from './officialModelBetas287/native.js'
import type {EffortValue} from './effort.js'
import {executeSideQuery287} from './officialSideQuery287/bindings.js'

/** Complete public t2 options; credentials remain the existing auth owner. */
export type SideQueryOptions = {
 model:string
 system?:string|Anthropic.TextBlockParam[]
 messages:Anthropic.MessageParam[]
 tools?:Anthropic.Tool[]|BetaToolUnion[]
 tool_choice?:Anthropic.ToolChoice
 output_format?:Anthropic.Beta.Messages.BetaJSONOutputFormat
 max_tokens?:number
 maxRetries?:number
 timeout?:number
 signal?:AbortSignal
 skipSystemPromptPrefix?:boolean
 forceAttributionHeader?:boolean
 temperature?:number
 thinking?:number|false
 effort?:EffortValue
 stop_sequences?:string[]
 extraBodyParams?:Record<string,unknown>
 extraBetas?:BetaToken287[]
 onFetchAttempt?:()=>void
 retryAfterBudgetMs?:()=>number
 credentials?:CredentialStore
 querySource:QuerySource
}

/** Original whole t2: request/options, billing, SDK dispatch and auth recovery. */
export async function sideQuery(opts:SideQueryOptions):Promise<Anthropic.Beta.Messages.BetaMessage>{
 // Frozen C: explicit disabled thinking wins, including an extra-body override.
 // Everything else is merged in the original t2 order, without classifier edits.
 const input=opts.thinking===false&&opts.extraBodyParams?.thinking!==undefined
  ? {...opts,extraBodyParams:{...opts.extraBodyParams,thinking:{type:'disabled'}}}:opts
 return executeSideQuery287(input)
}
