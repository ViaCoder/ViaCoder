import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'

/** Publish original aliases over the already-installed canonical/public owners.
 * These are the finite exports read by the complete environment caller.
 * No function body, state, registry, scheduler or factory is copied here. */
function canonicalExport287(file:string,name:string):unknown {
 const source=getOriginalModsLifecycle287().clearSourceModule287(file)
 if(!Object.hasOwn(source,name))throw Error('Environment original namespace export not selected: '+file+':'+name)
 return source[name]
}

/** Main may insert this reader before the existing require/import fallthrough.
 * Unsupported literals retain their existing reader and original feature gates. */
export function readEnvironmentPublicNamespace287(specifier:string):Readonly<Record<string,unknown>>|undefined {
 switch(specifier){
  case '/$bunfs/root/chunk-qndfa2vy.js':
   return {isPlanModeRequired:canonicalExport287('chunk-yzr5hfaq.js','xGt')}
  case '/$bunfs/root/chunk-tnwx1mmk.js':
   return {isBriefEntitled:canonicalExport287('chunk-q1yatwsf.js','wen')}
  case '/$bunfs/root/chunk-xbk5q05y.js':
   return {replyToJob:canonicalExport287('chunk-rhhjwy45.js','WGe')}
  case '/$bunfs/root/chunk-yje5xmam.js':
   return {getJobDir:canonicalExport287('chunk-1jqp49rh.js','Lr'),readJobState:canonicalExport287('chunk-1jqp49rh.js','Fr')}
  case '/$bunfs/root/chunk-rzs079ty.js':
   return {detectCurrentRepositoryWithHost:canonicalExport287('chunk-9hktajv8.js','hT')}
  case '/$bunfs/root/chunk-aatcqh6b.js':
   // Match the accepted existing-cloud load switch; Ii passes only render options.
   return {createRoot:(require('../../ink.js') as typeof import('../../ink.js')).createRoot}
  case '/$bunfs/root/chunk-v53vg090.js':
   return {mountFleetView:canonicalExport287('chunk-9975a2ae.js','icr')}
  case '/$bunfs/root/chunk-n5n26kcd.js':
   // The accepted public entry delegates to the existing scheduler.start/Hlr.
   // Require only after its namespace is requested, preserving startup laziness.
   return {startBackgroundHousekeeping:(require('../../utils/backgroundHousekeeping.js') as typeof import('../../utils/backgroundHousekeeping.js')).startBackgroundHousekeeping}
  default:
   return undefined
 }
}
