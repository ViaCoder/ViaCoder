import type {IdeType} from './ide.js'
import {getNativeTipModule287} from '../services/tips/tipsProduction287.js'
import {getIDEState287} from './ide.js'

/** Complete Pnr/Mnr/AXt over the one canonical i_/CXt owner. */
export async function isJetBrainsPluginInstalled(ideType:IdeType):Promise<boolean>{
  return getNativeTipModule287('chunk-mphp7acd.js').Mnr(ideType)
}
export async function isJetBrainsPluginInstalledCached(ideType:IdeType,forceRefresh=false):Promise<boolean>{
  return getNativeTipModule287('chunk-mphp7acd.js').AXt(ideType,forceRefresh)
}
/** Legacy synchronous notice view, not a second result cache. Unknown stays
 * unknown. Only the already-fulfilled canonical Promise supplies a boolean. */
export function isJetBrainsPluginInstalledCachedSync(ideType:IdeType):boolean|undefined {
  const pending=(getIDEState287().jetbrainsPluginInstalled as Map<string,Promise<boolean>>).get(ideType)
  if(!pending||Bun.peek.status(pending)!=='fulfilled')return undefined
  // Bun's declarations do not narrow peek's union after the fulfilled-status
  // check; this Promise's producer is the full boolean-returning Mnr.
  return Bun.peek(pending) as boolean
}
