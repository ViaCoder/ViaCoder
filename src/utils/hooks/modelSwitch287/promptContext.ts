import {createHookEnginePromptContext287,createHookEnginePromptCells287,createHookEnginePromptInvalidation287,type OriginalPromptContextOwner287} from './engine.js'
import {getOutsideHookRuntime287} from '../outsideRuntime287.js'
import {createModsPolicy287} from '../../plugins/officialModsPolicy287/native.js'
import {modelSwitchErrors287} from './errors.js'
import {errorMessage} from '../../errors.js'
import {logForDebugging} from '../../debug.js'
import {randomUUID} from 'node:crypto'
import {getExecutionSession287} from '../../../services/context/execution287.js'
import {setPromptSectionResolver287,setPromptSectionInvalidator287} from '../../../constants/systemPromptSections.js'
import {originalPromptFacts287,originalDetachedPromptSections287,prepareOriginalDetachedPromptModel287,resolveOriginalPromptModel287} from './promptComposition.js'
import proof from './engine.provenance.json' with {type:'json'}
let owner:OriginalPromptContextOwner287|undefined
export function createPromptContextProductionPorts287():Record<string,unknown>{
 const outside=getOutsideHookRuntime287()
 return {...Object.fromEntries(proof.groups.promptContext.imported.map(name=>[name,()=>{throw Error('Original non-context Mods core port not connected: '+name)}])),
  ...createHookEnginePromptCells287({}),
  ...createHookEnginePromptInvalidation287({n:getExecutionSession287}),
  l_n:setPromptSectionResolver287,i_n:setPromptSectionInvalidator287,
  mRt:originalPromptFacts287,gRt:originalDetachedPromptSections287,
  hRt:prepareOriginalDetachedPromptModel287,M9:resolveOriginalPromptModel287,
  xP:()=>lifecycle().requester.current(),Y5:{surfaces:()=>lifecycle().surfaceRegistry.surfaces()},
  dd:(...args:unknown[])=>{
   const predicate=(require('./runtime.js') as typeof import('./runtime.js')).createModelSwitchProductionPorts287().dd
   if(typeof predicate!=='function')throw Error('Original prompt.context capability predicate is not callable')
   return predicate(...args)
  },dyt:createModsPolicy287().isEngineActive,
  Ex:outside.dispatch,S0:outside.runAnswers,ypt:outside.runOutput,aJ:outside.runRefusal,eu:outside.sites,ZGo:outside.defaultCore,
  Oe:modelSwitchErrors287.Oe,t:logForDebugging,l:errorMessage,sxn:randomUUID,
  Oes:(listener:(requester:unknown)=>void)=> (require('./lifecycleRuntime.js') as typeof import('./lifecycleRuntime.js')).getOriginalModsLifecycle287().requester.whenBound(listener),
  e9e:(value:unknown)=>{
   const fn=(require('./lifecycleRuntime.js') as typeof import('./lifecycleRuntime.js')).getOriginalModsLifecycle287().sourceBindings['chunk-09m4fzsj.js:e9e']
   if(typeof fn!=='function')throw Error('Original e9e binding is not callable')
   return fn(value)
  },
 }
}
/** One original Cxn/gw; exact Oxn(Lxn)/Dxn(Nxn) installation is in the factory. */
export function getOriginalPromptContextOwner287():OriginalPromptContextOwner287{return owner??=createHookEnginePromptContext287(createPromptContextProductionPorts287())}
export const resolveOriginalPromptContext287:OriginalPromptContextOwner287['Ixn']=(core)=>getOriginalPromptContextOwner287().Ixn(core)
export const invalidateOriginalPromptContext287=()=>getOriginalPromptContextOwner287().Mxn()
export const invalidateHookedPromptContext287=(hooked:boolean)=>getOriginalPromptContextOwner287().Pxn(hooked)

const lifecycle=()=> (require('./lifecycleRuntime.js') as typeof import('./lifecycleRuntime.js')).getOriginalModsLifecycle287()
