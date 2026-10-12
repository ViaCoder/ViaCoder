import {createEnvironmentPreparation287} from './prepareNative.js'
import {createEnvironmentCloudPortsForBindings287} from './ports.js'
import bindings from './preparePorts.json'
/** Whole original Gs/Ec validation, including its original environment unset. */
export function prepareEnvironmentAppendHead287(appendCli:string|undefined):string|undefined{
 return createEnvironmentPreparation287(createEnvironmentCloudPortsForBindings287(bindings)).appendPromptHead(appendCli)
}
