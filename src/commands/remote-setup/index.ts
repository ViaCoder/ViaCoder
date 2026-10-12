import type { Command } from '../../commands.js'
import { isPolicyAllowed } from '../../services/policyLimits/index.js'
import { isEssentialTrafficOnly } from '../../utils/privacyLevel.js'
import { createOfficialWebSetupGate287 } from './officialWebSetupGate287.generated.js'

const officialWebSetupGate = createOfficialWebSetupGate287({
  isEssentialTrafficOnly,
  isPolicyAllowed,
})

const web = {
  type: 'local-jsx',
  name: 'web-setup',
  description:
    'Setup Claude Code on the web (requires connecting your GitHub account)',
  availability: ['claude-ai'],
  policyGate: officialWebSetupGate.policyGate,
  isEnabled: officialWebSetupGate.isEnabled,
  get isHidden() {
    return officialWebSetupGate.isHidden()
  },
  load: () => import('./remote-setup.js'),
} satisfies Command

export default web
