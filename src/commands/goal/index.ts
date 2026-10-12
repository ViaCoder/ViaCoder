import type { Command } from '../../commands.js'

const goal = {
  type: 'local-jsx',
  name: 'goal',
  description: 'Set a goal Claude checks before stopping',
  argumentHint: '[<condition> | clear]',
  immediate: true,
  load: () => import('./goal-ui.js'),
  loadNonInteractive: () => import('./goal.js'),
} satisfies Command

export default goal
