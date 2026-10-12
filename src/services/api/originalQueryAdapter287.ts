import type {Tools} from '../../Tool.js'
import type {Message} from '../../types/message.js'
import type {SystemPrompt} from '../../utils/systemPromptType.js'
import type {ThinkingConfig} from '../../utils/thinking.js'
import type {OriginalQueryMessage287,OriginalQueryOptions287,OriginalRefusalControl287,OriginalFallbackError287} from '../../utils/officialToolSchema287/native.js'
import type {Options} from './claude.js'
import {getToolSchemaRuntime287} from '../../utils/toolSchema287.js'
import {getAgentContext} from '../../utils/agentContext.js'
import {isModelContextExcluded,isRefusalMessage} from './refusalFallback.js'
import {sanitizeErrorToolResultContent} from '../../utils/messages.js'
import {resolveThinkingDisplay,canRequestThinkingDisplay} from '../../utils/thinking.js'
import {getInitialSettings} from '../../utils/settings/settings.js'
import {modelSupportsThinking} from '../../utils/thinking.js'
import {modelSupportsISP} from '../../utils/betas.js'
import {shouldIncludeFirstPartyOnlyBetas} from '../../utils/betas.js'
import {oc as hasComplianceTaint} from '../../vendor/official-files-api/taints.js'
import {isEnvTruthy} from '../../utils/envUtils.js'
import {getExecutionSession287} from '../context/execution287.js'
/** Original Query reads f.session.host.clock. Older callers carry the same
 * session through ALS; this accessor never creates a clock or a request owner. */
export function originalQueryClock287(context:import('../../Tool.js').ToolUseContext&{session?:import('../context/officialExecutionOwners287/native.js').ExecutionSession287}):NonNullable<Options['clock']> {
 return (context.session??getExecutionSession287()).host.clock as NonNullable<Options['clock']>
}
/** Native bh/Ay read the existing context layers and model-selected AppState.
 * This ABI adapter owns neither permissions nor effort state. */
export function originalQueryEffort287(context:import('../../Tool.js').ToolUseContext):Pick<Options,'effortValue'|'turnEffort'> {
 const owner=(require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287()
 const bh=owner.clearLifecycleSource287('chunk-m4akk3an.js','bh') as (context:import('../../Tool.js').ToolUseContext)=>Options['effortValue']
 const Ay=owner.clearLifecycleSource287('chunk-m4akk3an.js','Ay') as (layers:import('../../utils/permissions/officialPersonConfirm287/native.js').ConfirmationContext287['permissionLayers'])=>Options['turnEffort']
 const layered:import('../../utils/permissions/officialPersonConfirm287/native.js').ConfirmationContext287=context
 return {effortValue:bh(context),turnEffort:Ay(layered.permissionLayers)}
}
export type ApiQueryMessage287=OriginalQueryMessage287
/** Read-only C view. Transcript objects, original normalization and request state stay owned upstream. */
export function originalQueryInput287(messages:Message[]):Message[] {
 return messages.filter(row=>!isModelContextExcluded(row)&&!isRefusalMessage(row)).map(row=>row.type==='user'||row.type==='assistant'?sanitizeErrorToolResultContent([row])[0]!:row)
}
export function originalQueryThinking287(thinking:ThinkingConfig,model:string):ThinkingConfig&{displayExplicit?:boolean} {
 if(thinking.type==='disabled')return thinking
 const display=resolveThinkingDisplay(thinking,getInitialSettings().showThinkingSummaries,canRequestThinkingDisplay({thinkingEnabled:!isEnvTruthy(process.env.CLAUDE_CODE_DISABLE_THINKING),modelSupportsThinking:modelSupportsThinking(model),modelSupportsInterleavedThinking:modelSupportsISP(model),firstPartyBetaEligible:shouldIncludeFirstPartyOnlyBetas(),hipaa:hasComplianceTaint('hipaa')}),true)
 // The C omitted preference must not be replaced by NFt's connector-text experiment.
 return {...thinking,...display&&{display,displayExplicit:false}}
}
export function originalQueryOptions287(options:Options):OriginalQueryOptions287 {
 const {stickyBetas:_thinkingCLatches,toolSearchStickyBetas,...rest}=options
 return {...rest,agentContext:options.agentContext??getAgentContext()??{agentType:'main'},...toolSearchStickyBetas&&{stickyBetas:toolSearchStickyBetas}}
}
/** Helper entry transport, before nFo/uFe supply their model/permission reader.
 * All public fields retain their ABI/identity. C thinking latches are captured
 * by the invocation's controller port; only the original tool-search owner
 * occupies raw stickyBetas. Absence is preserved for nFo's mR(Ei()) default. */
export function originalSingleQueryInputOptions287<T extends Omit<Options,'model'|'getToolPermissionContext'>>(options:T):
 Omit<T,'stickyBetas'|'toolSearchStickyBetas'> & {stickyBetas?:import('../context/officialExecutionOwners287/native.js').StickyBetas287} {
 const {stickyBetas:_thinkingCLatches,toolSearchStickyBetas,...rest}=options
 return {...rest,...toolSearchStickyBetas&&{stickyBetas:toolSearchStickyBetas}}
}
export function isOriginalFallbackError287(error:unknown):error is OriginalFallbackError287 {
 return error instanceof getToolSchemaRuntime287().fallbackErrorClass
}
/** No retry actor here: ljt owns dispatch, non-stream fallback, cancellation and billing. */
export async function* queryOriginalModel287(messages:Message[],system:SystemPrompt,thinking:ThinkingConfig,tools:Tools,signal:AbortSignal,options:Options):AsyncGenerator<ApiQueryMessage287,void> {
 let refusal:OriginalRefusalControl287|undefined
 const assistants:Extract<ApiQueryMessage287,{type:'assistant'}>[]=[]
 for await(const event of getToolSchemaRuntime287().originalQuery(originalQueryInput287(messages),system,originalQueryThinking287(thinking,options.model),tools,signal,originalQueryOptions287(options))) {
  switch(event.type){
   case 'streaming_fallback_began':options.onStreamingFallback?.();assistants.length=0;break
   case 'refusal_no_fallback':
    refusal=event
    for(const row of assistants)row.refusalRecovery={original_model:event.originalModel,request_id:event.requestId,api_refusal_category:event.apiRefusalCategory,api_refusal_explanation:event.apiRefusalExplanation,refused_user_message_uuid:null,scope:'local',retracted_message_uuids:[]}
    break
   case 'hint_clears':
    if(!options.onHintClears)throw new Error('Original hint_clears requires its registered context-hint transcript consumer')
    getToolSchemaRuntime287().dispatchQueryHint287(event,{onHintClears:options.onHintClears});break
   case 'server_fallback':case 'fallback_request':
    // These require the original explicitly armed producer. Public C uses Query's
    // existing one-shot local refusal path; it never fabricates server qualification.
    throw new Error('Original '+event.type+' requires its registered armed caller')
   case 'assistant':
    if(refusal)event.refusalRecovery={original_model:refusal.originalModel,request_id:refusal.requestId,api_refusal_category:refusal.apiRefusalCategory,api_refusal_explanation:refusal.apiRefusalExplanation,refused_user_message_uuid:null,scope:'local',retracted_message_uuids:[]}
    assistants.push(event);yield event;break
   default:yield event
  }
 }
}
