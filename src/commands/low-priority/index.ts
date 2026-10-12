import type { Command } from '../../commands.js'
import { isClaudeAISubscriber } from '../../utils/auth.js'
import { isLowPriorityCommandAvailable } from '../../utils/lowPriority.js'

const lowPriority = {
  type: 'local',
  name: 'low-priority',
  description: 'Continue now at lower priority after reaching your session limit; run again to stop',
  availability: ['claude-ai'],
  isEnabled: () => isClaudeAISubscriber() && isLowPriorityCommandAvailable(),
  isHidden: true,
  supportsNonInteractive: false,
  load: () => import('./low-priority.js'),
} satisfies Command

export default lowPriority
