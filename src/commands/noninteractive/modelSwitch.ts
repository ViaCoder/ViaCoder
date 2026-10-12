import { setTimeout, clearTimeout } from 'node:timers'
import type { LocalJSXCommandContext } from '../../types/command.js'
import {getExecutionSession287} from '../../services/context/execution287.js'
import {sourceModelAdmission287} from '../../utils/model/modelAdmissionOwner287.js'
import {withModelSwitchCaller287} from '../../utils/hooks/modelSwitch287/caller.js'
import {sourceModelCommandHelpers287} from '../../utils/model/officialModelCommand287/runtime.js'

export type ModelSwitchDecision = { decision: 'proceed' | 'block' | 'ask'; reason?: string; messages: string[] }
export type ModelSwitchHost = {
  /** Host must run the real PreModelSwitch pipeline, not a synthetic allow. */
  preModelSwitch?: (model: string | null, context: LocalJSXCommandContext) => Promise<ModelSwitchDecision>
}
export type InferenceCommandContext = LocalJSXCommandContext & { commandRuntime?: ModelSwitchHost }
// Same original JO/j_ used by actual jt and print admission; no per-getter queue.
export async function withInferenceChange<T>(context:LocalJSXCommandContext,work:()=>Promise<T>):Promise<T>{
 return sourceModelAdmission287.j_(getExecutionSession287(),()=>withModelSwitchCaller287(context,work))
}
export async function checkModelSwitch(model:string|null,context:InferenceCommandContext,source='command'):Promise<ModelSwitchDecision>{
 return withModelSwitchCaller287(context,()=>sourceModelCommandHelpers287.mE(getExecutionSession287(),context.getAppState,model,source,{signal:context.abortController.signal}))
}
export async function timeout<T>(promise: Promise<T>, milliseconds: number): Promise<T | undefined> {
  let timer: number | undefined
  try { return await Promise.race([promise, new Promise<undefined>(resolve => { timer = Number(setTimeout(resolve, milliseconds)) })]) }
  finally { clearTimeout(timer) }
}
/** Original B_ records source before the successful state write, on the same session. */
export function recordModelSwitch287(model:string|null,context:LocalJSXCommandContext,source='command'):void {
 const {sourceModelSwitch287}=require('../../utils/hooks/modelSwitch287/runtime.js') as typeof import('../../utils/hooks/modelSwitch287/runtime.js')
 sourceModelSwitch287.B_(getExecutionSession287(),context.getAppState(),model,source)
}
