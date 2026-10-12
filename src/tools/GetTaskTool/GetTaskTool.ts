import type * as z from 'zod/v4'
import {buildTool,type ToolDef} from '../../Tool.js'
import type {TaskResult287,GetTaskDefinition287} from '../officialTaskRegistration287/native.js'
import {getGetTaskOwner287,getTaskContext287} from '../../utils/task/getTaskSession287.js'

// The recovered registration remains the algorithm/schema/gate authority.
// This file only bridges the existing Tool call signature and context ports.
const definition=()=>getGetTaskOwner287().registration.tool
type InputSchema=z.ZodType<{taskId:string}>
type NativePartialRender287=(input:Partial<{taskId:string}>,options:Parameters<GetTaskDefinition287['renderToolUseMessage']>[1])=>string|null
// buildTool spreads getters eagerly. Keep the real native descriptors intact
// in this bootstrap import graph; only the two omitted shared defaults need
// lazy materialization. No proxy routing or duplicate default implementation.
function buildDeferredGetTask287<D extends ToolDef<InputSchema,TaskResult287>>(def:D) {
  let built:ReturnType<typeof buildTool<D>>|undefined
  const shared=()=>built??=buildTool(def)
  const defaults={
    get isDestructive(){return shared().isDestructive},
    get checkPermissions(){return shared().checkPermissions},
  }
  // defineProperties really copies every own native descriptor onto this
  // concrete defaults object; the precise intersection represents that copy.
  return Object.defineProperties(defaults,Object.getOwnPropertyDescriptors(def)) as D & typeof defaults
}
export const GetTaskTool=buildDeferredGetTask287({
  get name(){return definition().name},
  get searchHint(){return definition().searchHint},
  get maxResultSizeChars(){return definition().maxResultSizeChars},
  get inputSchema():InputSchema{return definition().inputSchema},
  get outputSchema(){return definition().outputSchema},
  description:(_input,_options)=>definition().description(),prompt:(_options)=>definition().prompt(),
  userFacingName:()=>definition().userFacingName(),
  isEnabled:()=>definition().isEnabled(),
  isConcurrencySafe:()=>definition().isConcurrencySafe(),isReadOnly:()=>definition().isReadOnly(),
  toAutoClassifierInput:input=>definition().toAutoClassifierInput(input),
  extractSearchText:()=>definition().extractSearchText(),
  // Tool renders Partial input during streaming. Original Lo accepts an absent
  // taskId here (returns e ?? "" after its working/repeat collapse guard).
  // This exact UI-only function view preserves that guard; validation/call
  // still use the complete original strict {taskId:string} schema unchanged.
  renderToolUseMessage:(input,options)=>(definition().renderToolUseMessage as NativePartialRender287)(input,options),
  mapToolResultToToolResultBlockParam:(result,id)=>definition().mapToolResultToToolResultBlockParam(result,id),
  async validateInput(input,context){
    const owner=getGetTaskOwner287()
    return owner.registration.tool.create(getTaskContext287(context,owner)).validateInput(input)
  },
  async call(input,context,_canUseTool,parentMessage){
    const owner=getGetTaskOwner287()
    return owner.registration.tool.create(getTaskContext287(context,owner)).call(input,{
      signal:context.abortController.signal,innerCall:context.innerCall,parentMessage,
    })
  },
  // ToolDef has no backgrounding slot. Preserve the source metadata as a
  // concrete adapter property without changing the shared Tool definition.
  get backgrounding(){return definition().backgrounding},
} satisfies ToolDef<InputSchema,TaskResult287> & {readonly backgrounding:GetTaskDefinition287['backgrounding']})
