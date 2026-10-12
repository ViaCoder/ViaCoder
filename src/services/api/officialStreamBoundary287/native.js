// Complete fixed-287 original stream boundary/predicate; only live-state and SDK bindings adapted.
import {APIError} from '@anthropic-ai/sdk'
const DNo=new Set(["tool_use","server_tool_use","mcp_tool_use"]);
export const isHiddenStreamBlock287=type=>DNo.has(type);
export function isRevokedOAuthToken287(e){if(!(e instanceof APIError))return!1;let r=e.message??"";return e.status===403&&r.includes("OAuth token has been revoked")||e.status===401&&r.includes("OAuth access token has been revoked")}
export function createStreamBoundary287(state){
function* Um() { if (!state.envelopeOpen)
    return; let $s = state.hiddenBlock ? null : state.activeBlock; if (state.envelopeOpen = !1, state.activeBlock = null, state.hiddenBlock = !1, $s !== null)
    yield { type: "stream_event", event: { type: "content_block_stop", index: $s } }; yield { type: "stream_event", event: { type: "message_stop" } }; }
return Um;
}
