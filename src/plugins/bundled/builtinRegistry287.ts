import * as source from './officialBuiltinAgents287/native.js'
import * as agentsHooks from './agentsMd287/hooks/register.js'
import {join,dirname} from 'node:path'
import {fileURLToPath} from 'node:url'
import type {BuiltinPluginDefinition,LoadedPlugin} from '../../types/plugin.js'
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {getOutsideHookRuntime287} from '../../utils/hooks/outsideRuntime287.js'
import {getOriginalSettingsReader287} from '../../utils/settings/settingsReader287.js'
import {getInitialSettings} from '../../utils/settings/settings.js'
import type {SettingSource} from '../../utils/settings/constants.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../../services/analytics/growthbook.js'
import {errorMessage,toError} from '../../utils/errors.js'
import {logError} from '../../utils/log.js'
import {modelSwitchErrors287} from '../../utils/hooks/modelSwitch287/errors.js'

const lifecycle=()=>getOriginalModsLifecycle287()
/** Original ro() already belongs to lifecycle's command/skill registry. */
export const getBuiltinRegistryOwner287=()=>lifecycle().commandRegistry()
const enabledSources=():SettingSource[]=>{
 const n=getOutsideHookRuntime287().sourceModule('chunk-s3exmmq6.js').Xo
 if(typeof n!=='function')throw Error('Canonical original Xo settings source reader missing')
 return n()
}
const readSource=(name:SettingSource)=>{const r=getOriginalSettingsReader287();return r.source(name,r.heldContext())}
const aliases={TS:(name:string)=>lifecycle().pluginStorageAliases287.canonical(name),ZA:(name:string)=>lifecycle().pluginStorageAliases287.aliases(name)}
const choice=source.createBuiltinSettingsChoice287({...aliases,Xo:enabledSources,ge:readSource})
let registry:ReturnType<typeof source.createBuiltinRegistry287>|undefined
export function getBuiltinRegistryProduction287(){
 if(!registry){const pure=source.createBuiltinObject287({}),standalone=source.createBuiltinStandalone287({});registry=source.createBuiltinRegistry287({
  ro:getBuiltinRegistryOwner287,Ne:lifecycle().builtinPluginScanner287,...aliases,
  N:pure.N,ku:standalone.ku,P:modelSwitchErrors287.P,Rh:join,_i:source.createBuiltinSuffix287({})._i,
  er:getInitialSettings,ge:readSource,Xo:enabledSources,VG:choice.VG,ZSn:choice.ZSn,
  Z:toError,l:errorMessage,d:logError,
  // Frozen C telemetry omitted; real failure ledger/error and availability stay original.
  m:()=>{},
 })}
 return registry
}
let agents:ReturnType<typeof source.createBuiltinAgentsDescriptor287>|undefined
export function getAgentsBuiltinModule287(){
 if(!agents)agents=source.createBuiltinAgentsDescriptor287({
  I:agentsHooks,agentsDir287:join(dirname(fileURLToPath(import.meta.url)),'agentsMd287'),
  ...source.createBuiltinInterop287({}),
  lo:getFeatureValue_CACHED_MAY_BE_STALE,
  eS:(definition:BuiltinPluginDefinition)=>{
   const owner=getBuiltinRegistryProduction287();owner.eS(definition)
   // This is a recovered, already-minified PACKAGE module, not authored
   // TypeScript for the unbundled scanner. Reuse its complete original Le
   // build metadata on the existing Ne (the packaged branch does the same).
   // Never exempt external/user modules or infer a scan from an empty source.
   const descriptor=definition.hooksModule
   if(definition.name==='cc-plugin-agents-md'&&descriptor?.module===agentsHooks&&'folder'in descriptor){
    if(!agents)throw Error('Original Agents descriptor metadata not initialized')
    lifecycle().builtinPluginScanner287.registerScan(owner.Hh(definition.name,descriptor).modulePath,agents.Le().scan)
   }
  },
  iU:(...args:unknown[])=>getBuiltinRegistryProduction287().iU(...args),
 })
 return {registerPlugin:agents.Qe}
}
export function initializeDefaultAgentsBuiltin287():void{
 source.initializeAgentsBuiltin287({ro:getBuiltinRegistryOwner287,rpe:getBuiltinRegistryProduction287().rpe,agentsModule:getAgentsBuiltinModule287})
}
export function readBuiltinPlugins287():{enabled:LoadedPlugin[];disabled:LoadedPlugin[]}{return getBuiltinRegistryProduction287().NQ()}

/** Read the already-created original VG/ZSn closure; no second selector/state. */
export function getBuiltinSettingsChoice287(){return choice}
