// Borrow the current producer's original legacy SDK/list/cache and canonical scheduler.
import {getMcpConnectedProducer287} from '../connectedProducer287.js'
import {getOriginalModsLifecycle287} from '../../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {createLegacyMcpLifecycleRoots287} from './native.js'
function canonical(file,name){
 const value=getOriginalModsLifecycle287().clearLifecycleSource287(file,name)
 if(value===undefined)throw Error('Original legacy lifecycle dependency missing '+file+':'+name)
 return value
}
export function readLegacyMcpLifecycleClient287(){
 const producer=getMcpConnectedProducer287(),legacy=producer.sourceModule('chunk-fdjgzr8v.js')
 const bindings={}
 for(const name of ["Os", "qt", "gr", "ww", "mt", "$e", "GX", "te", "vr", "to", "We", "p", "bt", "$Fn", "YI", "Ca", "X$", "Ct", "It", "rb", "Ve", "At", "kn", "zI", "VI", "FB", "xlt", "y", "m", "Go", "$o", "St", "Wt"]){
  if(legacy[name]===undefined)throw Error('Existing legacy producer namespace missing '+name)
  bindings[name]=legacy[name]
 }
 Object.assign(bindings,{
  vLe:canonical('chunk-8f36gf8z.js','vLe'),
  YIt:canonical('chunk-764ypttr.js','YIt'),KIt:canonical('chunk-764ypttr.js','KIt'),VIt:canonical('chunk-764ypttr.js','VIt'),
  Mt:canonical('chunk-1b21she7.js','Mt'),iI:producer.sourceModule('chunk-fge68w3a.js').iI,
 })
 if(typeof bindings.iI!=='function')throw Error('Original reconnect iI dependency missing')
 const roots=createLegacyMcpLifecycleRoots287(bindings)
 return {...roots,clearServerCache:producer.clearServerLegacy,
  fetchToolsForClient:producer.listToolsLegacy,fetchCommandsForClient:producer.listCommandsLegacy,
  fetchResourcesForClient:producer.listResourcesLegacy,fetchResourceTemplatesForClient:legacy.St,
  getDiscoveryFetchError:legacy.Wt,persistRefreshedToolsIfPresent:producer.persistRefreshedLegacy}
}
