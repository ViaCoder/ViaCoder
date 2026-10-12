import {createModelPromptMetadata287} from './officialModelPromptMetadata287/native.js'
import {getBakedCatalogEntry287} from './canonical287.js'
import {getAPIProvider} from './providers.js'

export const modelPromptMetadata287=createModelPromptMetadata287({
 Be:(model,options)=>{
  const {getModelBehaviorName287}=require('./behavior287.js') as typeof import('./behavior287.js')
  return getModelBehaviorName287(model,options)
 },
 He:()=>getAPIProvider(),
 xa:model=>getBakedCatalogEntry287(model),
})
