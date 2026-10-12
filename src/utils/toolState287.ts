import {getExecutionSession287} from '../services/context/execution287.js'
import {ToolState287} from './officialToolState287/native.js'

const owners=new WeakMap<object,ToolState287>()

/** The 2.1.287 session owns one generic YL state store, shared by tool contexts. */
export function getToolState287(execution=getExecutionSession287()):ToolState287 {
  const root=execution.root
  let state=owners.get(root)
  if(!state){state=new ToolState287();owners.set(root,state)}
  return state
}
