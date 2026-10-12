import type {AssistantMessage,Message} from '../../types/message.js'
import type {SystemPrompt} from '../../utils/systemPromptType.js'
import type {ThinkingConfig} from '../../utils/thinking.js'
import type {Tools} from '../../Tool.js'
import type {OriginalQueryOptions287} from '../../utils/officialToolSchema287/native.js'
import type {BetaJSONOutputFormat} from '@anthropic-ai/sdk/resources/beta/messages/messages.mjs'
// nFo/uFe forward g.agentContext verbatim, including undefined. The helper
// input borrows the public Options slot; only the downstream ljt adapter
// resolves a missing context from the existing execution owner.
export type OriginalSingleControllerOptions287 =
 Omit<OriginalQueryOptions287,'agentContext'> &
 Pick<import('./claude.js').Options,'agentContext'>
export type OriginalSinglePromptOptions287 = Omit<OriginalSingleControllerOptions287,'getToolPermissionContext'>
export interface OriginalSinglePrompt287 {
 systemPrompt?:SystemPrompt
 userPrompt:string
 outputFormat?:BetaJSONOutputFormat
 signal:AbortSignal
 thinkingConfig?:ThinkingConfig
 options:OriginalSinglePromptOptions287
}
export interface OriginalSingleQueries287 {
 a0(input:Omit<OriginalSinglePrompt287,'options'>&{options:Omit<OriginalSinglePrompt287['options'],'model'>}):Promise<AssistantMessage>
 uFe(input:OriginalSinglePrompt287):Promise<AssistantMessage>
 gye(input:{messages:Message[];systemPrompt:SystemPrompt;thinkingConfig:ThinkingConfig;tools:Tools;signal:AbortSignal;options:OriginalSingleControllerOptions287}):Promise<AssistantMessage>
}
export function createOriginalSingleQueries287(ports:Record<string,unknown>):OriginalSingleQueries287
