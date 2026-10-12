import {createHookEngineRegistrationRegistry287,createHookEngineRegistrySwap287,createHookEngineRegistration287} from './engine.js'
import {modsRegistryOwner287} from '../../plugins/modsRegistryOwner287.js'
import {getPluginSettingsBase,clearPluginSettingsBase,resetSettingsCache} from '../../settings/settingsCache.js'
import {loadAllPluginsCacheOnly} from '../../plugins/pluginLoader.js'
import {createOriginalHookEnginePorts287} from './engineRuntime.js'
const getOriginalModsLifecycle287=()=> (require('./lifecycleRuntime.js') as typeof import('./lifecycleRuntime.js')).getOriginalModsLifecycle287()
import {getExecutionSession287,getLegacyExecutionContext287} from '../../../services/context/execution287.js'
import {clearRegisteredPluginHooks,registerHookCallbacks} from '../../../bootstrap/state.js'
import proof from './engine.provenance.json' with {type:'json'}
// Preserve the whole R7/yy state machine. Remaining module-loader boundaries are
// explicit rather than mutating hooksUnknownCause into a manufactured allow.
let registration:ReturnType<typeof createHookEngineRegistration287>|undefined
export function createHookRegistrationPorts287():Record<string,unknown>{return {
 ...Object.fromEntries(proof.groups.registration.imported.map(name=>[name,()=>{throw Error('Original hook-registration port not connected: '+name)}])),
 ...getOriginalModsLifecycle287().registration,
 ...createOriginalHookEnginePorts287((require('../../hooks.js') as typeof import('../../hooks.js')).createHookExecutionHostPorts287()),
 ...(require('./runtime.js') as typeof import('./runtime.js')).createModelSwitchProductionPorts287(),ut:()=>modsRegistryOwner287.registry(),
 doe:()=> (require('../../hooks.js') as typeof import('../../hooks.js')).getHookMatcher287().settingsUnknown(),
 xi:loadAllPluginsCacheOnly,I1:()=> (require('../../hooks.js') as typeof import('../../hooks.js')).getHookMatcher287().managedIds(),
 ...getOriginalModsLifecycle287().registration,
 ...createHookEngineRegistrySwap287({...createHookEngineRegistrationRegistry287({c:getLegacyExecutionContext287,n:getExecutionSession287}),Gi:clearRegisteredPluginHooks,Wz:registerHookCallbacks}),
 E9o:getPluginSettingsBase,C9o:clearPluginSettingsBase,Ro:resetSettingsCache,
 jNo:()=> (require('../../hooks.js') as typeof import('../../hooks.js')).getHookPluginActivity287().jNo(),
}}
function source(){return registration??=createHookEngineRegistration287(createHookRegistrationPorts287())}
export async function retryModelSwitchHookRegistration287(storageV5?:unknown,credentials?:unknown):Promise<void>{await source().R7(storageV5,credentials)}
export function clearModelSwitchPluginCache287(reason?:string):void{source().yy(reason)}

export function convertRegisteredPluginMatchers287(plugin:import('../../../types/plugin.js').LoadedPlugin){return source().Cwo(plugin)}

/** Original B6n invalidates only the registration promise, preserving active callbacks. */
export function invalidateHookRegistration287():void{source().B6n()}
