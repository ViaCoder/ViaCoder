import type {SubprocessPolicy287} from './permissions/officialReadPermissions287/native.js'
function readPolicy(){return (import.meta.require('./permissions/read.js') as typeof import('./permissions/read.js')).getReadPermissions287()}
// The cold Hooks -> config -> cleanup source graph may reach this export
// before this module's body; retain the one existing cell, initialized by use.
var policyOwner287:SubprocessPolicy287|undefined
/** One original Ae owner shared by subprocess env and sandbox gk/Pd. */
export function getSubprocessEnvPolicyOwner287():SubprocessPolicy287 {
 return policyOwner287??=new (readPolicy().SubprocessPolicy)()
}
export function isSubprocessEnvScrubEnabled287():boolean {
 return readPolicy().isSubprocessScrubEnabled()
}

// Original Ko/Xer use the existing AP Te/T host registry and Ae scrub latch.
// These are late reads, not another host WeakMap, carrier or color cache.
import {createSubprocessEnvironment287,type SubprocessEnvironment287,type SubprocessHost287} from './officialSubprocessEnv287/native.js'
import {getExecutionSession287} from '../services/context/execution287.js'
import {authEnvironment} from './authEnvironment.js'
import {logForDebugging} from './debug.js'
const originalModule=(file:string)=>(require('./hooks/outsideRuntime287.js') as typeof import('./hooks/outsideRuntime287.js'))
 .getOutsideHookRuntime287().sourceModule(file)
const hostRegistry={of:(host:object)=>(originalModule('chunk-8ptzhr8g.js').T as {of(host:object):SubprocessHost287}).of(host)}
export function getSubprocessHostState287():Readonly<SubprocessHost287>{return hostRegistry.of(getExecutionSession287().host)}
let nativeEnvironment287:SubprocessEnvironment287|undefined
function environment287():SubprocessEnvironment287 {
 if(nativeEnvironment287)return nativeEnvironment287
 const ports={hostRegistry,execution:getExecutionSession287,environment:authEnvironment,
  get subprocessScrubState(){return getSubprocessEnvPolicyOwner287()},
  get bridgeCarrierOwner(){return originalModule('chunk-758hjhx1.js').T_ as {readonly bridgeCarrier:unknown}},
  taintRegistry:{of:(host:object)=>(originalModule('chunk-chme4mqf.js').a as {of(host:object):{taints:string[]}}).of(host)},
  scrubPathNames:()=> (originalModule('chunk-f1vb7bx7.js').FQe as ()=>string[])(),
  containsCredential:(value:string)=>(originalModule('chunk-f1vb7bx7.js').dT as (value:string)=>boolean)(value),
  scrubCommand:(name:string,value:string)=>(originalModule('chunk-f1vb7bx7.js').izt as (name:string,value:string)=>string|undefined)(name,value),
  debug:logForDebugging,
 }
 return nativeEnvironment287=createSubprocessEnvironment287(ports)
}
/** Full original Eds; init's existing upstream proxy callback stays host-owned. */
export function registerUpstreamProxyEnvFn(fn:()=>Record<string,string>):void {environment287().registerProxy(fn)}
/** Full original Xer; publish the exact D writer object, without modifying parent env/chalk. */
export function publishSettingsColorEnvironment287(env:Record<string,string>):void {environment287().publishSettingsColor(env)}
/** Full original Ko for Shell, Hooks, MCP stdio and LSP. */
export function subprocessEnv():NodeJS.ProcessEnv {return environment287().subprocessEnv()}
