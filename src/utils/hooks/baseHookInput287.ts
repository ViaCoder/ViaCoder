import {getMainThreadAgentType,getSessionId} from '../../bootstrap/state.js'
import {getExecutionSession287} from '../../services/context/execution287.js'
import type {AppState} from '../../state/AppStateStore.js'
import {getCwd} from '../cwd.js'
import {getTranscriptPathForSession} from '../sessionStorage.js'
import {createEffortOwnerSource287,type EffortOwnerSnapshotSource287} from '../model/officialEffortOwner287/native.js'
import {decodeSessionEffort,resolveSettingsEffort} from '../model/effortSettings.js'
import {supportsOfficialHookEffort287,resolveOfficialHookEffort287} from '../model/effortWc287.js'
import {getOfficialModelMenuPolicy287} from '../model/officialModelPicker287.js'
import {getReadPermissions287} from '../permissions/read.js'
import {createHookBaseInput287,type HookSourceContext287,type HookBaseInputSource287} from './officialHooksConfiguration287/context.js'

export type HookCallerContext287=Omit<HookSourceContext287,'getAppState'> & {
  getAppState?:()=>AppState|Partial<EffortOwnerSnapshotSource287>
}
const effort=createEffortOwnerSource287({resolveSettingsEffort,sourceDefaultModel:()=>getOfficialModelMenuPolicy287().El()})
const source=createHookBaseInput287({
  agentType:getMainThreadAgentType,
  effortState:effort.read,
  supportsEffort:model=>supportsOfficialHookEffort287(model),
  effortLevel:(model,effort,turnEffort)=>resolveOfficialHookEffort287(model,effort,turnEffort),
  transcript:getTranscriptPathForSession,
  scratchEnabled:()=>getReadPermissions287().isScratchpadEnabled(),
  scratchDirectory:id=>getReadPermissions287().getScratchpadDir(id),
  promptId:()=>getExecutionSession287().requestJournal.promptId(),
})

/** Read-through view of the existing AppState and modelSelection effort owner. */
function sourceContext(context:HookCallerContext287|undefined):HookSourceContext287|undefined {
  if(context===undefined)return undefined
  const getState=context.getAppState
  if(getState===undefined)return context as HookSourceContext287
  return {...context,getAppState:()=>{
    const state=getState()
    if('sessionEffort'in state||'settingsEffortTable'in state)return state as Partial<EffortOwnerSnapshotSource287>
    const app=state as AppState
    return {
      sessionEffort:decodeSessionEffort(app.effortValue),
      settingsEffortTable:getExecutionSession287().modelSelection.mainLoopEffortState()?.settingsEffortTable,
    }
  }}
}

export function createBaseHookInput287(permissionMode?:string,sessionId?:string,context?:HookCallerContext287):HookBaseInputSource287 {
  return source.baseInput({id:sessionId??getSessionId()},getCwd(),permissionMode,sourceContext(context))
}
