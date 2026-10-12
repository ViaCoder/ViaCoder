import type { Command } from '../../types/command.js'

const recap: Command = {
  type: 'local',
  name: 'recap',
  description: 'Generate a one-line session recap now',
  supportsNonInteractive: true,
  load: () => import('./recap.js'),
}

export default recap
