import {APIUserAbortError} from '@anthropic-ai/sdk/error'
import {createOriginalSingleQueries287} from './officialSingleQuery287.js'
import type {OriginalSinglePrompt287,OriginalSingleControllerOptions287} from './officialSingleQuery287.js'
import type {Options} from './claude.js'
import {originalSingleQueryInputOptions287,queryOriginalModel287} from './originalQueryAdapter287.js'
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {getToolSchemaRuntime287} from '../../utils/toolSchema287.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {asSystemPrompt} from '../../utils/systemPromptType.js'
import {createUserMessage} from '../../utils/messages.js'
import {getEmptyToolPermissionContext} from '../../Tool.js'
import {withStreamingVCR,withVCR} from '../vcr.js'

/** The reverse ABI of the same two stores, not a third latch/cache owner.
 * Used by complete original wrappers and raw-source differential callers. */
export function createSingleQueryControllerPort287(options:Pick<Options,'stickyBetas'>) {
 return (messages:Parameters<typeof queryOriginalModel287>[0],system:Parameters<typeof queryOriginalModel287>[1],thinking:Parameters<typeof queryOriginalModel287>[2],tools:Parameters<typeof queryOriginalModel287>[3],signal:AbortSignal,raw:OriginalSingleControllerOptions287)=>
  queryOriginalModel287(messages,system,thinking,tools,signal,{...raw,stickyBetas:options.stickyBetas,toolSearchStickyBetas:raw.stickyBetas})
}

/** Invocation-only ABI: no second API controller, model ledger, sticky cell or
 * transcript. The original wrappers borrow the existing canonical selectors. */
function singleQueries287(options:Pick<Options,'stickyBetas'>) {
 const owner=getOriginalModsLifecycle287()
 const source=(file:string,name:string)=>owner.clearLifecycleSource287(file,name)
 return createOriginalSingleQueries287({
  a:authEnvironment,
  Hbe:source('chunk-nankzm0s.js','Hbe'),xS:source('chunk-nankzm0s.js','xS'),
  e2e:source('chunk-nankzm0s.js','e2e'),c4:source('chunk-brnn4zwp.js','c4'),
  Y7e:source('chunk-nankzm0s.js','Y7e'),Ooe:source('chunk-nankzm0s.js','Ooe'),
  Dqr:source('chunk-nankzm0s.js','Dqr'),Tqn:source('chunk-09m4fzsj.js','Tqn'),
  CP:getToolSchemaRuntime287().fallbackErrorClass,Dd:APIUserAbortError,
  mi:asSystemPrompt,Re:createUserMessage,vp:getEmptyToolPermissionContext,
  mR:source('chunk-bn3p37gv.js','mR'),Ei:source('chunk-bn3p37gv.js','Ei'),
  hZ:withVCR,qEe:withStreamingVCR,
  ljt:createSingleQueryControllerPort287(options),
 })
}
type PromptInput287=Omit<OriginalSinglePrompt287,'options'>&{options:Omit<Options,'getToolPermissionContext'>}
export function queryOriginalSmall287(input:Omit<PromptInput287,'options'>&{options:Omit<Options,'model'|'getToolPermissionContext'>}) {
 // a0/nFo supply the real selected model and permission reader before dispatch.
 return singleQueries287(input.options).a0({...input,options:originalSingleQueryInputOptions287(input.options)})
}
export function queryOriginalWithModel287(input:PromptInput287) {
 return singleQueries287(input.options).uFe({...input,options:originalSingleQueryInputOptions287(input.options)})
}
export function queryOriginalSingle287(input:Omit<Parameters<ReturnType<typeof createOriginalSingleQueries287>['gye']>[0],'options'>&{options:Options}) {
 return singleQueries287(input.options).gye({...input,options:originalSingleQueryInputOptions287(input.options)})
}
