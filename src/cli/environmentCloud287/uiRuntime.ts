import {createEnvironmentUiNamespaces287} from './uiNative.js'
import {createEnvironmentCloudPortsForBindings287} from './ports.js'
import bindings from './uiPorts.json'

const publicFiles=new Set(['chunk-q5snsasf.js','chunk-52qah382.js','chunk-xktw65wp.js','chunk-adakrekc.js','chunk-tggwvf1v.js'])
let ui:ReturnType<typeof createEnvironmentUiNamespaces287>|undefined
/** Lazy source publication only. Every business-state cut borrows its current
 * canonical/hot/modelSwitch owner; no factories, registries or sessions cloned. */
export function readEnvironmentUiPublicModule287(specifier:string):Readonly<Record<string,unknown>>|undefined{
 if(!specifier.startsWith('/$bunfs/root/')||!publicFiles.has(specifier.slice('/$bunfs/root/'.length)))return undefined
 ui??=createEnvironmentUiNamespaces287(createEnvironmentCloudPortsForBindings287(bindings))
 const module=ui.publicNamespaces[specifier]
 if(!module)throw Error('Original environment UI publication missing '+specifier)
 return module
}
