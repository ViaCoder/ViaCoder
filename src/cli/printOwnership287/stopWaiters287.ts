import {getExecutionSession287} from '../../services/context/execution287.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {logForDebugging} from '../../utils/debug.js'
import {createPrintStopWaitersRuntime287} from './stopWaitersNative.js'
// One full original nJe/ll/ul/MWt/pwn namespace. nJe is unconditional even on
// the personal OAuth/API-key print lane. No provider refresh/helper executor is
// restored here, and the existing C fetch/retry implementation is untouched.
export const printStopWaiters287=createPrintStopWaitersRuntime287({
 executionContext:()=>getExecutionSession287(),
 environment:{get CLAUDE_CODE_DISABLE_AUTH_REFRESH_LOCK(){return authEnvironment.CLAUDE_CODE_DISABLE_AUTH_REFRESH_LOCK}},
 debug:(message,options)=>logForDebugging(message,options),
})
