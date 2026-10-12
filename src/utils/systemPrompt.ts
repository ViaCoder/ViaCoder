import type {SystemPrompt} from './systemPromptType.js'

export {asSystemPrompt, type SystemPrompt} from './systemPromptType.js'

/** Original 287 i2/jlo owns prompt precedence, split blocks and append order.
 * The existing canonical owner retains flags and static local prompt text. */
export function buildEffectiveSystemPrompt(input: import('./effectiveSystemPrompt287/runtime.js').EffectiveSystemPromptInput287): SystemPrompt {
  return (import.meta.require('./effectiveSystemPrompt287/runtime.js') as
    typeof import('./effectiveSystemPrompt287/runtime.js')).buildEffectiveSystemPrompt287(input)
}
