import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import type {ToolUseContext,ToolResult} from '../../Tool.js'
import {logError} from '../../utils/log.js'

/** Original definitions borrowed by the registered tools through the same live
 * context. Each adopter owns which complete methods it restores; no registry
 * or replacement session is allocated here. */
export function getOriginalFileReadDefinition287() {
 return getOriginalModsLifecycle287().clearSourceModule287('chunk-mphp7acd.js').originalFileReadDefinition287
}

export function getOriginalNotebookEditDefinition287() {
 return getOriginalModsLifecycle287().clearSourceModule287('chunk-mphp7acd.js').vce
}

export function getOriginalGlobDefinition287() {
 return getOriginalModsLifecycle287().clearSourceModule287('chunk-mphp7acd.js').qR
}

export function getOriginalGrepDefinition287() {
 return getOriginalModsLifecycle287().clearSourceModule287('chunk-mphp7acd.js').KR
}

/** UYn's original file-history getter/operation ports borrow the existing
 * AppState and updateFileHistoryState owner. The reducer is the complete tce;
 * no snapshot store, backup algorithm or shadow state is allocated here. */
export function getOriginalFileToolContext287(context: ToolUseContext) {
 const source=getOriginalModsLifecycle287().clearSourceModule287('chunk-mphp7acd.js')
 return {
  ...context,
  getFileHistoryState:context.getFileHistoryState??(()=>context.getAppState().fileHistory),
  applyFileHistoryOp:context.applyFileHistoryOp??((operation:Parameters<typeof source.tce>[1])=>
   context.updateFileHistoryState(state=>source.tce(state,operation,context.storageV5))),
 }
}

/** The original gco tail commits only after the paired result is installed,
 * and uses the original scope-aware cancellation classifier unchanged. */
export function commitOriginalToolResult287(result: ToolResult<unknown>, context: ToolUseContext, name: string): void {
 const owner=getOriginalModsLifecycle287()
 const source=owner.clearSourceModule287('chunk-mphp7acd.js')
 owner.clearSourceModule287('chunk-1b21she7.js').Kyn(
  result,source.Xin(context.abortController.signal,{name,ran:true},source.TOt(context))!==null,logError,
 )
}
