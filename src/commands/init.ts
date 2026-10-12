import type { Command } from '../commands.js'
import { maybeMarkProjectOnboardingComplete } from '../projectOnboardingState.js'
import { authEnvironment } from '../utils/authEnvironment.js'
import { getFeatureValue_CACHED_MAY_BE_STALE } from '../services/analytics/growthbook.js'
import { createOriginalInit287 } from './originalInit287/native.js'

// Preserve the same registered command object and original live descriptors.
// The complete fixed-287 prompt closure borrows the existing auth/feature owners.
const command = createOriginalInit287({
  a: authEnvironment,
  k: getFeatureValue_CACHED_MAY_BE_STALE,
}) satisfies Command
const originalPrompt = command.getPromptForCommand
command.getPromptForCommand = async () => {
  maybeMarkProjectOnboardingComplete()
  return originalPrompt()
}

export default command
