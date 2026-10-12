import {getIsNonInteractiveSession,setInitialMainLoopModel} from '../../bootstrap/state.js'
import {getExecutionSession287} from '../../services/context/execution287.js'
import {logEvent} from '../../services/analytics/index.js'
import {getGlobalConfig} from '../config.js'
import {getOriginalModsLifecycle287} from '../hooks/modelSwitch287/lifecycleRuntime.js'
import {getOriginalSettingsReader287} from '../settings/settingsReader287.js'
import {authEnvironment} from '../authEnvironment.js'
import {logError} from '../log.js'
import {parseUserSpecifiedModel} from './model.js'
import {getOfficialModelReprobeRuntime287,getOfficialModelMenuPolicy287} from './officialModelPicker287.js'
import {getSettings_DEPRECATED} from '../settings/settings.js'
import {getOfficialModelValidation287} from './officialModelPicker287/validation.js'
import {createStartupModel287,type StartupModelInput287} from './officialStartupModel287/native.js'
import provenance from './officialStartupModel287/provenance.json'

/** All original read imports resolve lazily to their existing canonical owner.
 * The source's three metadata writers operate on this same execution session. */
export function createStartupModelProductionPorts287():Record<string,unknown>{
 const reader=()=>getOriginalSettingsReader287()
 const ports:Record<string,unknown>={
  Ce:getIsNonInteractiveSession,$Zr:setInitialMainLoopModel,n:getExecutionSession287,
  er:getSettings_DEPRECATED,
  ge:(source:Parameters<ReturnType<typeof getOriginalSettingsReader287>['source']>[0])=>reader().source(source,reader().heldContext()),
  le:getGlobalConfig,a:authEnvironment,d:logError,i:logEvent,Rt:parseUserSpecifiedModel,
  Jae:(...args:Parameters<ReturnType<typeof getOfficialModelValidation287>['Jae']>)=>getOfficialModelValidation287().Jae(...args),
  jVo:(...args:Parameters<ReturnType<typeof getOfficialModelReprobeRuntime287>['jVo']>)=>getOfficialModelReprobeRuntime287().jVo(...args),
 }
 // These complete policy declarations already have the installed single owner.
 for(const name of ['QBe','EQn','El','$r','Kw','Yyt','j3','Ub','Iy'])ports[name]=(...args:unknown[])=>{
  const fn=getOfficialModelMenuPolicy287()[name]
  if(typeof fn!=='function')throw Error('Startup model existing policy export missing: '+name)
  return Reflect.apply(fn,undefined,args)
 }
 for(const [alias,binding] of Object.entries(provenance.ports)){
  if(Object.hasOwn(ports,alias))continue
  ports[alias]=(...args:unknown[])=>{
   const owner=getOriginalModsLifecycle287().clearSourceModule287(binding.file)
   if(!Object.hasOwn(owner,binding.name))throw Error('Startup model original import not selected: '+binding.file+':'+binding.name)
   const fn=owner[binding.name]
   if(typeof fn!=='function')throw Error('Startup model import is not callable: '+binding.file+':'+binding.name)
   return Reflect.apply(fn,undefined,args)
  }
 }
 return ports
}
let runtime:ReturnType<typeof createStartupModel287>|undefined
export function getStartupModel287(){return runtime??=createStartupModel287(createStartupModelProductionPorts287())}
export function prepareStartupModel287(input:StartupModelInput287){return getStartupModel287().prepare(input)}
