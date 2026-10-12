import type {ToolUseContext} from '../Tool.js'
import type {AppState} from '../state/AppStateStore.js'
import type {BtwPrefixContext287} from './officialBtwPrefix287/native.js'
import {getExecutionSession287} from '../services/context/execution287.js'

/** Original prefix callers spread their context; forward every existing slot. */
function readThrough<T extends object>(source:T):T {
 const view=Object.create(source)
 for(const key of Object.keys(source))Object.defineProperty(view,key,{enumerable:true,configurable:true,get:()=>Reflect.get(source,key)})
 return view
}

export function adaptQueryPrefixContext287<T extends ToolUseContext>(context:T):T & BtwPrefixContext287 {
 const source=context as T & Partial<BtwPrefixContext287>
 const options=readThrough(source.options),view=readThrough(source)
 Object.defineProperty(options,'cacheBreakerPhrase',{enumerable:true,configurable:true,get:()=>source.options.cacheBreakerPhrase??(context.getAppState() as AppState & {cacheBreakerPhrase?:string}).cacheBreakerPhrase})
 for(const [key,value] of Object.entries({session:source.session??getExecutionSession287(),options,getAdvisorSetting:source.getAdvisorSetting??(()=>context.getAppState().advisorModel)}))
  Object.defineProperty(view,key,{enumerable:true,configurable:true,value})
 return view as T & BtwPrefixContext287
}
