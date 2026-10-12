import { join } from 'node:path'
import type { LoadedPlugin } from '../../types/plugin.js'
import { Aon, EFe, fr } from './contractIO.js'

/**
 * Official J/g consumes enabled[].manifest.types. This host's older manifest
 * schema strips that field. Recover ONLY that declarative field from the already
 * loaded plugin's contained manifest; never reload hooks, install or execute it.
 * Changed identity/version is a reload requirement, not a new enabled snapshot.
 */
export async function readLoadedTypeContract(plugin:LoadedPlugin):Promise<{types?:string;warning?:string}> {
  const loaded=plugin.manifest as typeof plugin.manifest & {types?:unknown}
  if (loaded.types!==undefined) return typeof loaded.types==='string' ? {types:loaded.types} : {warning:`Skipped ${fr(plugin.name)}: manifest types must be a string.`}
  try {
    const path=join(plugin.path,'.claude-plugin','plugin.json')
    const {real}=await EFe(path,plugin.path,'plugin type manifest')
    const manifest:unknown=JSON.parse(await Aon(real))
    if (!manifest || typeof manifest!=='object' || Array.isArray(manifest)) throw Error('invalid manifest')
    const raw=manifest as Record<string,unknown>
    if (raw.name!==plugin.manifest.name || raw.version!==plugin.manifest.version) throw Error('manifest changed; run /reload-plugins first')
    if (raw.types===undefined) return {}
    if (typeof raw.types!=='string') throw Error('manifest types must be a string')
    return {types:raw.types}
  } catch(error) {
    // A manifest is optional in this host; a genuine missing file has no contract.
    if ((error as NodeJS.ErrnoException)?.code==='ENOENT') return {}
    return {warning:`Skipped ${fr(plugin.name)}: type manifest could not be read or validated; run /reload-plugins and check the plugin's manifest.`}
  }
}
