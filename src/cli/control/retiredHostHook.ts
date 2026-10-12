import type { SyncHookJSONOutput } from '../../entrypoints/sdk/coreTypes.js'

/** Official 2.1.283 print.ts fy. Consumes only the event discriminant so it
 * also covers host events whose public input schema has not been recovered.
 * This does not register or enable those events.
 */
export function getRetiredSdkHostHookOutput(
  input: { hook_event_name: string },
): SyncHookJSONOutput {
  switch (input.hook_event_name) {
    case 'PreToolUse':
      return { hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason: 'The SDK host reconnected before its PreToolUse hook answered, so this tool call was not executed. No one denied it; retry the same tool call.',
      } }
    case 'PreModelSwitch':
      return { hookSpecificOutput: {
        hookEventName: 'PreModelSwitch',
        permissionDecision: 'deny',
        permissionDecisionReason: 'The SDK host that registered this PreModelSwitch hook re-initialized before answering; the model was not switched. Retry the switch.',
      } }
    case 'UserPromptSubmit':
    case 'UserPromptExpansion':
      return {
        decision: 'block',
        reason: 'The SDK host reconnected before its prompt hook answered, so this prompt was not submitted. Send it again.',
        hookSpecificOutput: { hookEventName: input.hook_event_name, suppressOriginalPrompt: true },
      }
    default:
      return {}
  }
}

