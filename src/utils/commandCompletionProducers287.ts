import {createPluginComplete287,createConfigComplete287} from './officialPublicCommandDiscovery287/completions.js'
import proof from './officialPublicCommandDiscovery287/completions.provenance.json' with {type:'json'}
import type {ArgumentProducer287} from './officialPublicCommandDiscovery287/completions.js'
// All imported plugin readers are the original existing Mods namespace. The
// only new cells are the source-declared f candidate cache and go descriptor
// cache: each is host-scoped and neither owns installed plugins or settings.
export function publicCommandSourcePort287(module:string,name:string):unknown {
 return (require('./hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('./hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearLifecycleSource287(module,name)
}
export function publicCommandProducerPorts287(group:'metadata'|'plugin'|'config'):Record<string,unknown>{
 // Config's imported bindings are live source references. Constructing the
 // completion controller must not evaluate callback-only writer dependencies
 // that the original fo descriptor projection discards. Every invoked read or
 // callback resolves the actual namespace; missing ports still throw normally.
 if(group==='config')return Object.defineProperties({},Object.fromEntries(proof.groups.config.ports.map(p=>[p.name,{enumerable:true,get:()=>publicCommandSourcePort287(p.module,p.imported)}])))
 return Object.fromEntries(proof.groups[group].ports.map(p=>[p.name,publicCommandSourcePort287(p.module,p.imported)]))
}
let plugin:ReturnType<typeof createPluginComplete287>|undefined,config:ReturnType<typeof createConfigComplete287>|undefined
export function getPluginCompletionOwner287(){
 return (plugin??=createPluginComplete287(publicCommandProducerPorts287('plugin'))).state
}
export const getPluginArgumentCompletions287:ArgumentProducer287=(tokens,prefix,storage)=>{
 getPluginCompletionOwner287()
 return plugin!.complete(tokens,prefix,storage)
}
export function getConfigCompletionOwner287(){
 config??=createConfigComplete287(Object.assign(publicCommandProducerPorts287('config'),{
  requireCommandModule287:(module:string)=>{
   if(module==='/$bunfs/root/chunk-tnwx1mmk.js')return {isBriefEntitled:publicCommandSourcePort287('chunk-q1yatwsf.js','wen')}
   throw new Error('Unknown original config require '+module)
  },
 }))
 return config.state
}
export const getConfigArgumentCompletions287:ArgumentProducer287=(tokens,prefix,storage)=>{
 getConfigCompletionOwner287()
 return config!.complete(tokens,prefix,storage)
}
export function importCommandCompletionModule287(module:string):Promise<{getConfigArgumentCompletions:ArgumentProducer287}|{getPluginArgumentCompletions:ArgumentProducer287}>{
 if(module==='/$bunfs/root/chunk-crq2m5kr.js')return Promise.resolve((require('./publicConfigCommandModule287.js') as typeof import('./publicConfigCommandModule287.js')).getPublicConfigCommandModule287())
 if(module==='/$bunfs/root/chunk-wffs8qq8.js')return Promise.resolve({getPluginArgumentCompletions:getPluginArgumentCompletions287})
 return Promise.reject(new Error('Unknown original command completion module '+module))
}
