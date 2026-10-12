import type { LocalCommandCall } from '../../types/command.js'
import type { ClearCommandContextExtension } from './resetEvents.js'
import { clearConversation } from './conversation.js'

export const call: LocalCommandCall = async (args, context) => {
  await clearConversation({
    ...context as typeof context & ClearCommandContextExtension,
    clearedSessionTitle: args.trim() || undefined,
    resetTrigger: 'clear',
  })
  return { type: 'text', value: '' }
}
