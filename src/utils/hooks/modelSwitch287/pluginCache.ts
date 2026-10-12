import {modsRegistryOwner287} from '../../plugins/modsRegistryOwner287.js'
// Legacy callers keep their cache API, reading/writing ONLY the original slots.
// No Map/memoize alongside the host-keyed Mods owner.
export function pluginLoadCacheView287(field:'pluginLoad'|'pluginLoadCacheOnly'){
 const arm=field==='pluginLoad'?'pluginLoadArm':'pluginLoadCacheOnlyArm'
 return {clear(){const r=modsRegistryOwner287.registry();r[field]=undefined;r[arm]=undefined},get(_key:unknown){return modsRegistryOwner287.registry()[field]},has(_key:unknown){return modsRegistryOwner287.registry()[field]!==undefined},set(_key:unknown,value:unknown){modsRegistryOwner287.registry()[field]=value;return this},delete(_key:unknown){const found=this.has(_key);this.clear();return found}}
}
