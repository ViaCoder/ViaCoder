import type { Command } from '../../commands.js'
export default {
  name: 'reload-skills', type: 'local', description: 'Reload skills from disk',
  supportsNonInteractive: true, load: () => import('./reload-skills.js'),
} satisfies Command
