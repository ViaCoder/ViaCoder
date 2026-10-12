// Type-only completion of existing original je/Te methods. Kept in this owned
// directory so the execution/cost owner templates can be merged by controller
// without concurrent writes. No reflection or replacement implementation.
import type {ExecutionLifecycleContext287} from '../../services/context/officialExecutionLifecycle287/native.js'
import type {} from '../AgentTool/officialAgentPromptState287/native.js'
import type {} from '../../services/context/officialExecutionOwners287/native.js'

declare module '../AgentTool/officialAgentPromptState287/native.js' {
  interface LaunchOptions287 {
    strictToolResultPairing():boolean
    replaceStrictToolResultPairing(value:boolean):void
    singleShotPrintSession():boolean
    replaceSingleShotPrintSession(value:boolean):void
  }
}
declare module '../../services/context/officialExecutionOwners287/native.js' {
  interface ExecutionSession287 {
    readonly identity:ExecutionLifecycleContext287['identity'] & {mainAgentId(id:string):string}
  }
}
export {}
