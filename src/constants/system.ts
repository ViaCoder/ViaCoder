// Critical system constants extracted to break circular dependencies

import { logForDebugging } from '../utils/debug.js'
import { isEnvDefinedFalsy } from '../utils/envUtils.js'
import { getAPIProvider, isFirstPartyAnthropicBaseUrl, isFirstPartyRequestEndpoint } from '../utils/model/providers.js'
import type { AgentContext } from '../utils/agentContext.js'
import type { TurnPosition } from '../types/message.js'
import { getWorkload } from '../utils/workloadContext.js'
import { createBillingAttribution287 } from '../services/api/officialBilling287/runtime.js'
import { authEnvironment } from '../utils/authEnvironment.js'

const DEFAULT_PREFIX = `You are Claude Code, Anthropic's official CLI for Claude.`
const AGENT_SDK_CLAUDE_CODE_PRESET_PREFIX = `You are Claude Code, Anthropic's official CLI for Claude, running within the Claude Agent SDK.`
const AGENT_SDK_PREFIX = `You are a Claude agent, built on Anthropic's Claude Agent SDK.`

const CLI_SYSPROMPT_PREFIX_VALUES = [
  DEFAULT_PREFIX,
  AGENT_SDK_CLAUDE_CODE_PRESET_PREFIX,
  AGENT_SDK_PREFIX,
] as const

export type CLISyspromptPrefix = (typeof CLI_SYSPROMPT_PREFIX_VALUES)[number]

/**
 * All possible CLI sysprompt prefix values, used by splitSysPromptPrefix
 * to identify prefix blocks by content rather than position.
 */
export const CLI_SYSPROMPT_PREFIXES: ReadonlySet<string> = new Set(
  CLI_SYSPROMPT_PREFIX_VALUES,
)

export function getCLISyspromptPrefix(options?: {
  isNonInteractive: boolean
  hasAppendSystemPrompt: boolean
}): CLISyspromptPrefix {
  const apiProvider = getAPIProvider()
  if (apiProvider === 'vertex') {
    return DEFAULT_PREFIX
  }

  if (options?.isNonInteractive) {
    if (options.hasAppendSystemPrompt) {
      return AGENT_SDK_CLAUDE_CODE_PRESET_PREFIX
    }
    return AGENT_SDK_PREFIX
  }
  return DEFAULT_PREFIX
}

// Restore the complete official formatter. Its cch=00000 field is the
// userland placeholder; native serialization/signing is a separate boundary.
const billingAttribution = createBillingAttribution287({
  provider: getAPIProvider,
  base: isFirstPartyAnthropicBaseUrl,
  scope: isFirstPartyRequestEndpoint,
  optOut: isEnvDefinedFalsy,
  workload: getWorkload,
  logger: logForDebugging,
  a: authEnvironment,
  process,
  buildMetadata: { get VERSION() { return MACRO.VERSION } },
})

export function getAttributionHeader(
  fingerprint: string,
  agentContext?: AgentContext,
  previousRequestId?: string,
  promptId?: string,
  turnOrigin?: string,
  turnPosition?: TurnPosition,
  options?: { ignoreEnvOptOut?: boolean },
): string {
  return billingAttribution.format(
    fingerprint, agentContext ?? { agentType: 'main' }, previousRequestId,
    promptId, turnOrigin, turnPosition, options,
  )
}
