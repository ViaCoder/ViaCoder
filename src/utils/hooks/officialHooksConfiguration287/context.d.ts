import type {EffortLevel} from '../../../entrypoints/sdk/runtimeTypes.js'
import type {EffortOwnerSnapshotSource287} from '../../model/officialEffortOwner287/native.js'
export interface HookSourceContext287 {
  agentId?:string
  agentType?:string
  options?:{mainLoopModel?:string}
  getAppState?:()=>Partial<EffortOwnerSnapshotSource287>
  permissionLayers?:readonly {kind:string;effort?:EffortLevel|number}[]
  remoteCall?:{origin:{callerSessionId?:string}}
}
export interface HookBaseInputSource287 {
  session_id:string
  transcript_path:string
  cwd:string
  scratchpad_dir?:string
  prompt_id?:string
  permission_mode?:string
  agent_id?:string
  agent_type?:string
  effort?:{level:EffortLevel}
}
export interface HookBaseInputPorts287 {
  agentType():string|undefined
  effortState(state:Partial<EffortOwnerSnapshotSource287>,model?:string):EffortLevel|number|undefined
  supportsEffort(model:string):boolean
  effortLevel(model:string,effort:EffortLevel|number|undefined,turnEffort?:EffortLevel|number):EffortLevel
  transcript(sessionId:string):string
  scratchEnabled():boolean
  scratchDirectory(sessionId:string):string|null
  promptId():string|null
}
export function createHookBaseInput287(ports:HookBaseInputPorts287):{
  baseInput(session:{id:string},cwd:string,permissionMode?:string,context?:HookSourceContext287):HookBaseInputSource287
}
