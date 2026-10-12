import type { Command } from '../../commands.js'
import { isClaudeAISubscriber } from '../../utils/auth.js'

const rateLimitOptions = {
  type: 'local-jsx',
  name: 'rate-limit-options',
  description: 'Manage usage limits and upgrade options',
  isEnabled: () => {
    if (!isClaudeAISubscriber()) {
      return false
    }

    return true
  },
  load: () => import('./rate-limit-options.js'),
} satisfies Command

export default rateLimitOptions
