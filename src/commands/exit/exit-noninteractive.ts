import { feature } from 'bun:bundle'
import type { LocalCommandCall } from '../../types/command.js'
import { isBgSession } from '../../utils/concurrentSessions.js'
import { gracefulShutdown } from '../../utils/gracefulShutdown.js'
// chunk-d77qm9s7.js:n. The renderer/worktree exit flow is intentionally not mounted.
export const call: LocalCommandCall = async () => {
  if (feature('BG_SESSIONS') && isBgSession()) return { type: 'text', value: 'Session keeps running. Use /stop to end it.' }
  await gracefulShutdown(0, 'prompt_input_exit')
  return { type: 'skip' }
}
