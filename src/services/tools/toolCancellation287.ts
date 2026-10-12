// Official 2.1.287 oFe and its two complete message constants; shared abort/feature owners.
import {agentAdmission287} from '../../tools/AgentTool/agentAdmission287.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../analytics/growthbook.js'
import {CANCEL_MESSAGE} from '../../utils/messages.js'
const INTERRUPT_TOOL_MESSAGE287="[Tool call skipped: the turn ended to deliver the message that follows before this call ran. Nothing refused it; re-run it if still needed.]";
const PERMISSION_STOP_TOOL_MESSAGE287="[Tool call skipped: the turn was stopped before this call ran, by the check whose denial is on another call in this batch. Nothing refused this call and it had no effects; re-run it if still needed.]";
export function getToolAbortMessage287(e: AbortSignal): string{let n=agentAdmission287.abortReason(e.reason);if(n==="permission-stop")return PERMISSION_STOP_TOOL_MESSAGE287;if(n==="interrupt"&&getFeatureValue_CACHED_MAY_BE_STALE("tengu_fizzy_grove",!1))return INTERRUPT_TOOL_MESSAGE287;return CANCEL_MESSAGE}
