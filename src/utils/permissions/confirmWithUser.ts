import {createHash} from 'node:crypto'
import uniq from 'lodash-es/uniq.js'
import {getAllowedChannels,getIsNonInteractiveSession,getPermissionPromptToolName} from '../../bootstrap/state.js'
import {AskUserQuestionTool} from '../../tools/AskUserQuestionTool/AskUserQuestionTool.js'
import {SKILL_TOOL_NAME} from '../../tools/SkillTool/constants.js'
import {errorMessage,TelemetrySafeError_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS as TelemetrySafeError} from '../errors.js'
import {logForDebugging} from '../debug.js'
import {logError} from '../log.js'
import {createAssistantMessage} from '../messages.js'
import {getInitialSettings} from '../settings/settings.js'
import {confirmationSchema287} from '../settings/officialPolicyParser287/native.js'
import {NativeRootContextCell286} from '../officialFetchRequestState286/runtime.js'
import {getOAuthResetExecutionContext286} from '../officialHttpWif286/runtime.js'
import {isAutoModeActive} from './autoModeState.js'
import {createConfirmation287,createConfirmationContext287,createConfirmationEligibility287,createConfirmationCleanup287,createConfirmationUtilities287,type ConfirmationOptions287,type ConfirmationContext287} from './officialPersonConfirm287/native.js'

const identity=<T>(value:T):T=>value
// Analytics ports intentionally retain the existing local no-telemetry policy.
const noAnalytics=()=>{}
const utilities=createConfirmationUtilities287({er:getInitialSettings,mf:isAutoModeActive,bn:identity,e:createHash})
const context=createConfirmationContext287({Ta:utilities.autoActive,BE:utilities.bypassDisabled,So:SKILL_TOOL_NAME,HG:'skill__',L:uniq})
const eligible=createConfirmationEligibility287({Ce:getIsNonInteractiveSession,EI:getPermissionPromptToolName,lh:getAllowedChannels})
const cleanup=createConfirmationCleanup287({Tt:NativeRootContextCell286})
let runtime:ReturnType<typeof createConfirmation287>|undefined
// Config's cleanup imports this binding before AskUserQuestion finishes loading.
// Capture the actual tool once on first use, not during that import cycle.
function getConfirmationRuntime287(){return runtime??=createConfirmation287({
 ...utilities.constants,...confirmationSchema287,
 c:identity,P:TelemetrySafeError,l:errorMessage,
 y:noAnalytics,m:noAnalytics,p:noAnalytics,t:logForDebugging,d:logError,
 Jre:cleanup.finish,pe:context.read,o5:AskUserQuestionTool,y7:eligible,
 Jc:createAssistantMessage,_tn:utilities.unforwarded,an:utilities.hash,
})}

export function canConfirmWithUser(context:ConfirmationContext287){return getConfirmationRuntime287().canAsk(context)}
export const isCapturedNonAutoPermissionMode287=context.isCapturedNonAuto
export const captureConfirmationPermissionMode=context.capture
export const readConfirmationPermissionContext=context.read
export const finishConfirmationPermissionCall287=cleanup.finish
export const isConfirmationBypassDisabled287=utilities.bypassDisabled
export function confirmWithUser<T>(options:ConfirmationOptions287<T>){
 // The local ToolUseContext predates the original root field. Bind the same
 // process execution root used by credential/session cells, not a new owner.
 const ctx=options.toolUseContext
 return getConfirmationRuntime287().confirm({...options,toolUseContext:ctx.session===undefined?{...ctx,session:getOAuthResetExecutionContext286()}:ctx})
}
