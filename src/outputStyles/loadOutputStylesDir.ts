import type {OutputStyleConfig} from '../constants/outputStyles.js'
import type {ToolUseContext} from '../Tool.js'
import {clearPluginOutputStyleCache} from '../utils/plugins/loadPluginOutputStyles.js'
/** Complete cbt/D7n -> Phe/GRn and u1/W7n remain in the accepted Mods382.
 * Their ro caches are the already accepted Mods77 host registry, not local memoize.
 * StorageV5 is only an optional original argument; no backend or eligibility is invented.
 */
export type OriginalOutputStyles287={
 cbt(cwd:string|null,storageV5?:ToolUseContext['storageV5']):Promise<OutputStyleConfig[]>;
 D7n(cwd:string|null,storageV5?:ToolUseContext['storageV5']):Promise<OutputStyleConfig[]>;
 u1(cwd:string|null,storageV5?:ToolUseContext['storageV5']):Promise<Record<string,OutputStyleConfig|null>>;
 ro():{outputStyleDirStyles:Map<string,unknown>;allOutputStyles:Map<string,unknown>;markdownFiles:Map<string,unknown>};
 ut():{outputStyles?:Promise<OutputStyleConfig[]>};
}
export function getOriginalOutputStyles287():OriginalOutputStyles287 {
 return (require('../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearSourceModule287('chunk-mphp7acd.js') as unknown as OriginalOutputStyles287
}
export const getOutputStyleDirStyles=Object.defineProperty(
 (cwd:string|null,storageV5?:ToolUseContext['storageV5']):Promise<OutputStyleConfig[]>=>getOriginalOutputStyles287().cbt(cwd,storageV5),
 'cache',{get:()=>getOriginalOutputStyles287().ro().outputStyleDirStyles},
) as ((cwd:string|null,storageV5?:ToolUseContext['storageV5'])=>Promise<OutputStyleConfig[]>)&{readonly cache:Map<string,unknown>}
export function clearOutputStyleCaches():void {
 const source=getOriginalOutputStyles287(),registry=source.ro()
 registry.outputStyleDirStyles.clear()
 registry.markdownFiles.clear()
 // Same Sbt plugin cache cell, plus the inherited local plugin loader's public reset.
 source.ut().outputStyles=undefined
 clearPluginOutputStyleCache()
}
