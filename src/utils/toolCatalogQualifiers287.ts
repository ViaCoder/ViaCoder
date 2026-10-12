import {createToolCatalogQualifiers287,type CatalogTool287} from './officialToolCatalog287/native.js'
import {authEnvironment} from './authEnvironment.js'
import {agentPromptState287} from '../services/context/agentPromptState287.js'
import {usesBashTools287} from '../services/context/runtime.js'
import {isEnvTruthy} from './envUtils.js'
import {hasEmbeddedSearchTools} from './embeddedTools.js'

function isCatalogTool287(value:unknown):value is CatalogTool287 {
 return typeof value==='object'&&value!==null&&'name' in value&&typeof value.name==='string'
}
function source287(file:string,name:string) {
 const owner=(require('./hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('./hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287()
 const value=owner.clearSourceModule287(file)[name]
 if(typeof value!=='function')throw new TypeError(`Missing original catalog reader ${file}:${name}`)
 return value
}
// Vde reads the already recovered source-local V1→V2 registry. No Tool map,
// object, execution store or native pv callback is created here.
const original=createToolCatalogQualifiers287({
 Le:isEnvTruthy,Neo:()=>agentPromptState287.searchToolsOptIn(),a:authEnvironment,
 $a:()=>usesBashTools287(),co:'Glob',Jr:'Grep',
 Vde(name){
  const value:unknown=source287('chunk-dec2r715.js','Vde')(name)
  if(value===undefined)return undefined
  if(!isCatalogTool287(value))throw new TypeError('Invalid original V1→V2 Tool registration')
  return value
 },
})
export const toolCatalogQualifiers287={
 ...original,
 // The pinned binary has embedded bfs/ugrep (bE's compiled literal "true").
 // This source/Bun build has them only when the existing build owner says so.
 // Keep the complete d7 algorithm, but do not remove the sole available search
 // tools in a build without those native replacements. This is a runtime cut,
 // not an account gate or a claim that the raw binary literal matches here.
 omittedSearchNames:()=>hasEmbeddedSearchTools()?original.d7():new Set<string>(),
 bashAvailable:()=>usesBashTools287(),
 tasksEnabled:()=>{
  const value:unknown=source287('chunk-mphp7acd.js','w7')()
  if(typeof value!=='boolean')throw new TypeError('Invalid original task eligibility result')
  return value
 },
}
