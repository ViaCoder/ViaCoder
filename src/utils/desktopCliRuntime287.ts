import * as path from 'node:path'
import * as fsPromises from 'node:fs/promises'
import {createDesktopCli287,type DesktopCli287,type DesktopHostPorts287,type DesktopLaunchOptions287,type DesktopTarget287} from './officialDesktopCli287/native.js'
import sourcePorts from './officialDesktopCli287/sourcePorts.json' with {type:'json'}
// Namespace only: no second auth/settings/registry/transcript state. The same
// service is consumed by root --desktop and the existing DesktopHandoff facade.
let desktop:DesktopCli287|undefined
export const MIN_DESKTOP_CLI_VERSION287='1.1.9669'
export function createDesktopProductionPorts287(overrides:Partial<DesktopHostPorts287>={}):DesktopHostPorts287 {
 const canonical=Object.fromEntries(sourcePorts.map(({port,file,name})=>{
  if(Object.hasOwn(overrides,port))return [port,overrides[port as keyof DesktopHostPorts287]]
  const owner=(require('./hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('./hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287()
  return [port,owner.clearLifecycleSource287(file,name)]
 }))
 return {
  ...canonical,process,builtins:{path,'fs/promises':fsPromises},
  subscriber:()=> (require('./auth.js') as typeof import('./auth.js')).isClaudeAISubscriber(),
  desktopPlatform:()=> (require('../commands/desktop/index.js') as typeof import('../commands/desktop/index.js')).default.isEnabled(),
  cwd:()=> (require('../bootstrap/state.js') as typeof import('../bootstrap/state.js')).getOriginalCwd(),
  exec:(...args)=> (require('./desktopExecPort287.js') as typeof import('./desktopExecPort287.js')).desktopExec287.exec(...args),
  exists:file=> (require('./file.js') as typeof import('./file.js')).pathExists(file),
  semver:require('semver') as DesktopHostPorts287['semver'],
  gte:(a,b)=>(require('./semver.js') as typeof import('./semver.js')).gte(a,b),
  debug:(message,options)=>(require('./debug.js') as typeof import('./debug.js')).logForDebugging(message,options as Parameters<typeof import('./debug.js').logForDebugging>[1]),
  error:message=>process.stderr.write(message+'\n'),
  // Retained R02 C: only pure telemetry, never eligibility or opener results.
  featureSuccess:()=>{},featureFailure:()=>{},telemetry:()=>{},
  openDesktop:target=>openDesktopTarget287(target),...overrides,
 }
}
export function getDesktopCli287():DesktopCli287 {
 return desktop??=createDesktopCli287(createDesktopProductionPorts287())
}
export function launchDesktopFromCli(options:DesktopLaunchOptions287):Promise<number>{return getDesktopCli287().launch(options)}
export function openDesktopTarget287(target:DesktopTarget287){
 if(process.platform==='darwin')return getDesktopCli287().open(target)
 // Preserve the existing Windows/Linux local C host; do not execute Darwin's
 // app discovery/open command on another OS or call an unsupported private host.
 return (require('./desktopDeepLink.js') as typeof import('./desktopDeepLink.js')).openDesktopTargetLocalC287(target)
}
