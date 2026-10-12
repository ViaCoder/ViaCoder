import {AsyncLocalStorage} from 'node:async_hooks'
import {createOfficialSystemComposer287,type SystemComposerPorts287,type SystemPromptRecord287,type SystemPromptTool287} from '../../../constants/officialSystemComposer287/native.js'
import {createHookEnginePromptCompose287,createHookEnginePromptComposeRecords287,type OriginalPromptComposer287,type PromptComposeFacts287} from './engine.js'
import {SYSTEM_PROMPT_DYNAMIC_BOUNDARY} from '../../../constants/prompts.js'
import {getSystemCacheSerializer287} from '../../../services/api/systemCache287.js'
import {getOriginalPromptContextOwner287} from './promptContext.js'

export type PromptComposeMode287={excludeDynamicSections?:boolean;isDetached?:boolean;analysisOnly?:boolean;teammate?:boolean;hookOrigin?:unknown}
// Invocation-local ports are not a policy/cache owner. The source yR holder in
// promptContext is the only installed composer; concurrent detached calls keep
// the tools/static-part closure of their actual caller.
const calls=new AsyncLocalStorage<SystemComposerPorts287>()
let installedPorts:(()=>SystemComposerPorts287)|undefined
export function installOriginalPromptComposerPorts287(ports:()=>SystemComposerPorts287):void{installedPorts=ports;getOriginalPromptContextOwner287()}
function ports(){const value=calls.getStore()??installedPorts?.();if(!value)throw Error('Original prompt composer has no production static-parts caller');return value}
export function createOriginalPromptComposePorts287(value:SystemComposerPorts287):Record<string,unknown>{return {
 ...value,yxn:(...args:Parameters<ReturnType<typeof getOriginalPromptContextOwner287>['yxn']>)=>getOriginalPromptContextOwner287().yxn(...args),Loe:()=>getSystemCacheSerializer287().globalScope(),rD:SYSTEM_PROMPT_DYNAMIC_BOUNDARY,M9:value.communication.modelForPrompt,AG:value.communication.lean,
 yRt:createOfficialSystemComposer287(value),
}}
function core(){return createHookEnginePromptCompose287(createOriginalPromptComposePorts287(ports()))}
export const originalPromptFacts287:OriginalPromptComposer287['facts']=(...args)=>core().mRt(...args)
export const originalDetachedPromptSections287=(facts:PromptComposeFacts287,tools:readonly SystemPromptTool287[],detached:boolean,origin?:unknown)=>core().gRt(facts,tools,detached,origin)
export const prepareOriginalDetachedPromptModel287=(model:string|undefined)=>{const value=ports();value.hRt(model)}
export const resolveOriginalPromptModel287=(model:string|undefined)=>ports().communication.modelForPrompt(model)
/** Whole source kA; only its final string projection is adapted to main C records. */
export function composeOriginalPromptRecords287(tools:readonly SystemPromptTool287[],model:string|undefined,mode:PromptComposeMode287|undefined,value:SystemComposerPorts287):Promise<SystemPromptRecord287[]>{
 installedPorts=()=>value
 return calls.run(value,()=>{
  const source=core()
  // dxn is the output-format boundary, not an alternate composer/holder.
  const outer=createHookEnginePromptComposeRecords287({...createOriginalPromptComposePorts287(value),...source,dxn:(records:SystemPromptRecord287[])=>records})
  return outer.kA(tools,model,mode)
 })
}

/** Original dxn owns shared/session ordering and conditional cache boundaries. */
export function projectOriginalPromptRecords287(records:SystemPromptRecord287[]):string[]{
 return core().dxn(records,getSystemCacheSerializer287().globalScope()?SYSTEM_PROMPT_DYNAMIC_BOUNDARY:null)
}

export function applyOriginalPromptInvalidations287():void{(require('./lifecycleRuntime.js') as typeof import('./lifecycleRuntime.js')).getOriginalModsLifecycle287().applyPendingInvalidations()}
