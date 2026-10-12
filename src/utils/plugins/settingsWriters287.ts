import {lstat} from 'node:fs/promises'
import omitBy from 'lodash-es/omitBy.js'
import uniq from 'lodash-es/uniq.js'
import {createPluginSettingsWriters287,createPluginOptionsInvalidator287} from './officialSettingsWriters287/native.js'
import {modsRegistryOwner287} from './modsRegistryOwner287.js'
import {getFastStatusSettingsWriter287} from '../settings/fastStatusWriter287.js'
import {getSettingsForSource,getSettingsFilePathForSource} from '../settings/settings.js'
import {resetSettingsCache} from '../settings/settingsCache.js'
import {getSecureStorage} from '../secureStorage/index.js'
import {secureStorageCore} from '../secureStorage/officialRuntime.js'
import {getErrnoCode,isENOENT,toError,errorMessage} from '../errors.js'
import {logForDebugging} from '../debug.js'
// The existing lifecycle's TS/ZA/$c share its original alias registry. No new Map.
const aliases=()=> (require('../hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().pluginStorageAliases287
export function getPluginSettingsWriterPorts287():Record<string,unknown>{return {
 TS:(id:string)=>aliases().canonical(id),ZA:(id:string)=>aliases().aliases(id),get $c(){return aliases().legacySuffix},
 zn:()=>getSecureStorage(),ge:getSettingsForSource,hn:(...args:Parameters<ReturnType<typeof getFastStatusSettingsWriter287>['update']>)=>getFastStatusSettingsWriter287().update(...args),
 Ri:(...args:Parameters<ReturnType<typeof getFastStatusSettingsWriter287>['transform']>)=>getFastStatusSettingsWriter287().transform(...args),
 ut:modsRegistryOwner287.registry,Ro:resetSettingsCache,Zn:getSettingsFilePathForSource,Q:lstat,W:isENOENT,E:getErrnoCode,Oc:omitBy,L:uniq,Ka:secureStorageCore.readFailed,t:logForDebugging,l:errorMessage,Z:toError,
}}
let writer:ReturnType<typeof createPluginSettingsWriters287>|undefined
export function getPluginSettingsWriters287(){return writer??=createPluginSettingsWriters287(getPluginSettingsWriterPorts287())}

/** Original ik/St/Ede from the installed canonical lifecycle, same Mods and credentials. */
export function getPluginOptionsReader287(){return (require('../hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().pluginOptionsReader287}

export const invalidateOriginalPluginOptions287=createPluginOptionsInvalidator287(modsRegistryOwner287.registry)
