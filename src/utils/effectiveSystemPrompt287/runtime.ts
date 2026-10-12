import type {SystemPrompt} from '../systemPromptType.js'
import type {ToolUseContext} from '../../Tool.js'
import type {AgentDefinition} from '../../tools/AgentTool/loadAgentsDir.js'

/** Preserve the current public parameter ABI; the last two fields are original
 * jlo inputs, not local prompt defaults. No static/C system text is assembled here. */
export type EffectiveSystemPromptInput287 = {
  mainThreadAgentDefinition: (AgentDefinition & {appendSystemPrompt?: boolean}) | undefined
  toolUseContext: Pick<ToolUseContext, 'options'> & Partial<Pick<ToolUseContext, 'getAppState'>>
  customSystemPrompt: string | readonly string[] | undefined
  defaultSystemPrompt: string[]
  appendSystemPrompt: string | undefined
  overrideSystemPrompt?: string | null
  skillsPersistencePrompt?: string
  analysisOnly?: boolean
}

export interface EffectiveSystemPromptOwner287 {
  i2(input: EffectiveSystemPromptInput287): SystemPrompt
  jlo(input: EffectiveSystemPromptInput287): {
    prompt: SystemPrompt
    servesDefault: boolean
  }
}

/** Read the one canonical namespace lazily, after its normal initialization.
 * No factory, cache, fallback prompt, gate override or second Wre owner. */
export function getEffectiveSystemPromptOwner287(): EffectiveSystemPromptOwner287 {
  const lifecycle = (import.meta.require('../hooks/modelSwitch287/lifecycleRuntime.js') as
    typeof import('../hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287()
  const source = lifecycle.clearSourceModule287('chunk-mphp7acd.js')
  if (typeof source.i2 !== 'function' || typeof source.jlo !== 'function') {
    throw new TypeError('Canonical 2.1.287 effective prompt i2/jlo are not published')
  }
  return source as unknown as EffectiveSystemPromptOwner287
}

export function buildEffectiveSystemPrompt287(input: EffectiveSystemPromptInput287): SystemPrompt {
  return getEffectiveSystemPromptOwner287().i2(input)
}

/** Original analysis API: do not substitute this for i2 at a production caller.
 * jlo alone does not perform i2's conditional Wre(false). */
export function inspectEffectiveSystemPrompt287(input: EffectiveSystemPromptInput287) {
  return getEffectiveSystemPromptOwner287().jlo(input)
}
