import {modelSwitchErrors287} from './errors.js'
import {randomUUID} from 'node:crypto'
import {isProxy} from 'node:util/types'
import {z} from 'zod/v4'
import {catalog} from '../../../vendor/official-model-catalog/catalog.js'
import {getExecutionSession287,executionSessionRegistryConstructor287} from '../../../services/context/execution287.js'
import {modsRegistryOwner287} from '../../plugins/modsRegistryOwner287.js'
import {getModelUsageProducer287} from '../../../services/context/modelUsagePolicy287.js'
import {getHooksConfigFromSnapshot,shouldAllowManagedHooksOnly} from '../hooksConfigSnapshot.js'
import {getMainThreadAgentHooks287,getRegisteredHooks} from '../../../bootstrap/state.js'
import {getSettingsForSource} from '../../settings/settings.js'
import {getGlobalConfig} from '../../config.js'
import {getClientData} from '../../clientData.js'
import {getCwd} from '../../cwd.js'
import {logForDebugging} from '../../debug.js'
import {isEnvTruthy} from '../../envUtils.js'
import {getAPIProvider} from '../../model/providers.js'
import {getCanonicalRoot287,getBakedCatalog287} from '../../model/canonical287.js'
import {CLAUDE_FABLE_5_CONFIG} from '../../model/configs.js'
import {createOfficialModelMenuPolicyPorts287} from '../../model/officialModelPicker287.js'
import {createModelCommandHostPorts287} from '../../model/officialModelCommand287/runtime.js'
import {createBaseHookInput287} from '../baseHookInput287.js'
import {getModelSwitchCaller287,modelSwitchSessionHooks287,withModelSwitchCaller287} from './caller.js'
import {sourceModelChange287} from './modelChange.js'
import {loadModelSwitchExecutionBridge287,currentModelSwitchExecutionBridge287} from './dispatcher.js'
import {createModelSwitchFlow287,createModelSwitchAttachment287,createModelSwitchModules287,createModelSwitchMatcher287,createModelSwitchSimple287,createModelSwitchFeatures287,createModelSwitchGate287,createModelSwitchDisabled287,createModelSwitchErrors287,createModelSwitchCatalog287,createModelSwitchLookup287,createModelSwitchLexical287,createModelSwitchPricing287,createModelSwitchIdentity287,createModelSwitchUsage287,type ModelSwitchSession287,type ModelSwitchRequest287,type ModelSwitchOptions287} from './native.js'

// Keep original factories intact, but assemble their policy imports only after
// the cold config/cleanup cycle has finished evaluating the model namespace.
function createModelSwitchRuntime287(){
const policyPorts=createOfficialModelMenuPolicyPorts287()
const host=(name:string)=>(...args:unknown[])=>{
 const fn=createModelCommandHostPorts287()[name]
 if(typeof fn!=='function')throw Error('Original ModelSwitch command port not bound: '+name)
 return fn(...args)
}
const errors=modelSwitchErrors287
const simple=createModelSwitchSimple287({Le:isEnvTruthy})
const features=createModelSwitchFeatures287({...simple,Ut:()=>getExecutionSession287().host.launchOptions.diskless()})
const disabled=createModelSwitchDisabled287({ge:getSettingsForSource})
const gate=createModelSwitchGate287({...simple,...features,...disabled})
const matcher=createModelSwitchMatcher287({N:(value:unknown)=>typeof value==='object'&&value!==null&&!Array.isArray(value),W:isProxy})
const modules=createModelSwitchModules287({...matcher,ut:()=>modsRegistryOwner287.registry()})
const catalogPrimitives=createModelSwitchCatalog287({...errors,g:()=>{getBakedCatalog287();return (getCanonicalRoot287() as {bakedCatalog?:unknown}).bakedCatalog},Gj:()=>catalog,ho:{fable5:CLAUDE_FABLE_5_CONFIG},Vn:()=>getAPIProvider()==='firstParty'})
const primitives={...policyPorts,...errors,...catalogPrimitives,...createModelSwitchLookup287({}),...createModelSwitchLexical287({}),
 de:z.record,Kd:getClientData,le:getGlobalConfig,No:()=>getModelUsageProducer287().managedPricing(),Qfe:(model:string)=>(getExecutionSession287().host.requestLatches as unknown as {inferenceProfileBackingModels():Map<string,string>}).inferenceProfileBackingModels().get(model)}
const pricing=createModelSwitchPricing287(primitives)
const identity=createModelSwitchIdentity287(primitives)
function createModelSwitchProductionPorts287():Record<string,unknown>{return {
 ...policyPorts,...sourceModelChange287,...errors,...modules,...simple,...features,...disabled,...gate,...identity,...pricing,...createModelSwitchUsage287({}),
 ut:()=>modsRegistryOwner287.registry(),Tt:executionSessionRegistryConstructor287,
 P4e:(...args:unknown[])=>modelSwitchCanonical287('chunk-mphp7acd.js','P4e',...args),
 _:(...args:unknown[])=>modelSwitchCanonical287('chunk-q80zaav8.js','_',...args),
 l:(...args:unknown[])=>modelSwitchCanonical287('chunk-c9me9cp7.js','l',...args),
 lt:(...args:unknown[])=>modelSwitchCanonical287('chunk-f2n7vgt8.js','lt',...args),
 V9:getHooksConfigFromSnapshot,Ty:shouldAllowManagedHooksOnly,LEe:getMainThreadAgentHooks287,S$:getRegisteredHooks,
 t:logForDebugging,oe:getCwd,Tk:3600000,t4:()=>(getExecutionSession287().requestJournal as unknown as {lastMainThreadCacheTtlMs():number|null}).lastMainThreadCacheTtlMs(),
 xet:()=>(getExecutionSession287().requestJournal as unknown as {lastMainThreadContextTokens():number|null}).lastMainThreadContextTokens(),one:host('one'),rte:()=>host('QD')('repl_main_thread')?'1h':'5m',
 tDt:host('tDt'),Py:host('Py'),Rt:host('Rt'),bQn:host('bQn'),
 Xc:(session:ModelSwitchSession287)=>createBaseHookInput287(undefined,session.id,getModelSwitchCaller287()),
 tFe:{of:()=>{const caller=getModelSwitchCaller287();return {registry:caller?modelSwitchSessionHooks287(caller):undefined}}},
 fWt:randomUUID,vbe:()=>Promise.reject(Error('Bedrock inference profiles are excluded')),
 R7:async(storageV5?:unknown,credentials?:unknown)=>(await loadModelSwitchExecutionBridge287()).retryModelSwitchHookRegistration287(storageV5,credentials),
 yy:(reason:string)=>currentModelSwitchExecutionBridge287().clearModelSwitchPluginCache287(reason),
 PA:async function*(options:Parameters<import('./native.js').ModelSwitchExecutionBridge287['executeModelSwitchHooks287']>[0]){yield*(await loadModelSwitchExecutionBridge287()).executeModelSwitchHooks287(options)},
 }}
 return {source:createModelSwitchFlow287(createModelSwitchProductionPorts287()),createModelSwitchProductionPorts287}
}
var modelSwitchRuntime287:ReturnType<typeof createModelSwitchRuntime287>|undefined
function getModelSwitchRuntime287(){return modelSwitchRuntime287??=createModelSwitchRuntime287()}
export function createModelSwitchProductionPorts287():Record<string,unknown>{return getModelSwitchRuntime287().createModelSwitchProductionPorts287()}
export const sourceModelSwitch287=new Proxy({} as ReturnType<typeof createModelSwitchFlow287>,{
 get:(_target,key)=>Reflect.get(getModelSwitchRuntime287().source,key),
 has:(_target,key)=>Reflect.has(getModelSwitchRuntime287().source,key),
 ownKeys:()=>Reflect.ownKeys(getModelSwitchRuntime287().source),
 getOwnPropertyDescriptor:(_target,key)=>Object.getOwnPropertyDescriptor(getModelSwitchRuntime287().source,key),
})
export const modelChangeSlot287=sourceModelChange287.gWt
export const takeModelChangeSource287=sourceModelChange287.kRo
export async function runOriginalPreModelSwitch287(session:ModelSwitchSession287,input:ModelSwitchRequest287,options:ModelSwitchOptions287={}){
 // Original ZV includes a registration in-flight/unknown gate; prepare only the real shared runner.
 if(sourceModelSwitch287.ZV(session))await loadModelSwitchExecutionBridge287()
 return sourceModelSwitch287.FPr(session,input,options)
}

// Lazy original namespace delegation, no extra lifecycle graph or state store.
function modelSwitchCanonical287(file:string,name:string,...args:unknown[]):unknown {
 const original=(require('./lifecycleRuntime.js') as typeof import('./lifecycleRuntime.js')).getOriginalModsLifecycle287().clearLifecycleSource287(file,name)
 if(typeof original!=='function')throw Error('Original ModelSwitch source missing '+file+':'+name)
 return original(...args)
}
export function runOriginalPostModelSwitch287(session:ModelSwitchSession287,input:ModelSwitchRequest287,state:import('../../../state/AppStateStore.js').AppState,options:Pick<ModelSwitchOptions287,'timeoutMs'>={}):Promise<void> {
 // Invocation transport only: the registry reads the actual AppState session Map.
 return withModelSwitchCaller287({getAppState:()=>state},()=>sourceModelSwitch287.$Pr(session,input,options))
}
const postAttachment287=createModelSwitchAttachment287({Dfe:randomUUID,OMt:attachment=>modelSwitchCanonical287('chunk-mphp7acd.js','OMt',attachment)})
export const createPostModelSwitchAttachment287=postAttachment287.ln
export const drainOriginalPostModelSwitch287:ReturnType<typeof createModelSwitchFlow287>['RRo']=(...args)=>sourceModelSwitch287.RRo(...args)
