import type {AppState} from '../../state/AppState.js'
import {getMainLoopModel} from '../../utils/model/model.js'
import {getAvailableEffortLevels,modelSupportsEffort,resolveAppliedEffort} from '../../utils/effort.js'
import {executeEffortChange} from '../../utils/model/effortCommand.js'
import {showCurrentEffort} from '../../commands/effort/effort.js'
import type {SharedEffortState,SharedEffortResult} from '../../server/sharedEffortState.js'

export function getSharedEffortState(state:Pick<AppState,'effortValue'>):SharedEffortState {
  const model=getMainLoopModel(),value=state.effortValue
  return {model,selection:value===undefined?'inherit':value===null?'default':value,
    applied:modelSupportsEffort(model)?resolveAppliedEffort(model,value)??null:null,
    available:modelSupportsEffort(model)?getAvailableEffortLevels(model):[]}
}
export function handleSharedEffort(request:{value?:string;expectedModel?:string},host:{
  getAppState():AppState;setAppState(update:(state:AppState)=>AppState):void
}):SharedEffortResult {
  const model=getMainLoopModel()
  if(request.expectedModel!==undefined&&request.expectedModel!==model)
    throw Error('Shared model changed before effort confirmation; refresh before retrying')
  let message:string
  if(request.value!==undefined){
    // Same parser, model cap, environment precedence and auto/reset semantics as
    // the official command. A facade must never persist its own user settings.
    const result=executeEffortChange(request.value,model,false)
    if(!result.effortUpdate)throw Error(result.message)
    host.setAppState(state=>({...state,effortValue:result.effortUpdate!.value}))
    message=result.message
  }else message=showCurrentEffort(host.getAppState().effortValue,model).message
  return {message,state:getSharedEffortState(host.getAppState())}
}
