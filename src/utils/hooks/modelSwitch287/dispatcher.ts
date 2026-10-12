import type {ModelSwitchExecutionBridge287} from './native.js'
let fixtureBridge:ModelSwitchExecutionBridge287|undefined
/** Only a dispatcher test/host override. This never registers hooks or creates policy state. */
export function installModelSwitchExecutionBridge287(bridge:ModelSwitchExecutionBridge287):()=>void {
 const previous=fixtureBridge;fixtureBridge=bridge;return()=>{if(fixtureBridge===bridge)fixtureBridge=previous}
}
let productionBridge:ModelSwitchExecutionBridge287|undefined
export async function loadModelSwitchExecutionBridge287():Promise<ModelSwitchExecutionBridge287> {
 if(fixtureBridge)return fixtureBridge
 const shared=await import('../../hooks.js') as unknown as Partial<ModelSwitchExecutionBridge287>
 if(typeof shared.executeModelSwitchHooks287!=='function'||typeof shared.retryModelSwitchHookRegistration287!=='function'||typeof shared.clearModelSwitchPluginCache287!=='function')throw Error('Shared original PA/registration exports are not connected for ModelSwitch')
 productionBridge=shared as ModelSwitchExecutionBridge287
 return productionBridge
}
export function currentModelSwitchExecutionBridge287():ModelSwitchExecutionBridge287 {
 const bridge=fixtureBridge??productionBridge
 if(!bridge)throw Error('ModelSwitch execution bridge must be loaded before synchronous registration invalidation')
 return bridge
}
