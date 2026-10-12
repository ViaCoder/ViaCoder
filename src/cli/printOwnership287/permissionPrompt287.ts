import {createPrintPermissionPromptNative287} from './permissionPromptNative287.js'
import proof from './permissionPromptProvenance287.json' with {type:'json'}
import {getPrintHostSource287} from './publicHostRuntime287.js'
import {hasPermissionsToUseTool} from '../../utils/permissions/permissions.js'
import {toolMatchesName} from '../../Tool.js'
import {logForDebugging} from '../../utils/debug.js'
import {logError} from '../../utils/log.js'
import {gracefulShutdownSync} from '../../utils/gracefulShutdown.js'
// Only PI's own resolved permission-tool closure owns the cached callback.
// Dependency reads borrow the canonical permission/hooks/session namespace.
export function getPrintPermissionPrompt287(){
 const caller={kf:hasPermissionsToUseTool,Mt:toolMatchesName,t:logForDebugging,d:logError,cs:gracefulShutdownSync}
 const bindings:Readonly<Record<string,{file:string;name:string}>>=proof.bindings
 const ports=new Proxy(caller,{
  has(target,name){return typeof name==='string'&&(Object.hasOwn(target,name)||Object.hasOwn(bindings,name))},
  get(target,name,receiver){if(name===Symbol.unscopables)return undefined;if(Object.hasOwn(target,name))return Reflect.get(target,name,receiver);if(typeof name!=='string'||!Object.hasOwn(bindings,name))throw Error('Original permission prompt dependency missing '+String(name));const binding=bindings[name]!;return getPrintHostSource287(binding.file,binding.name)},
 })
 return createPrintPermissionPromptNative287(ports)
}
