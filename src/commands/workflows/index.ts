import type { Command } from '../../types/command.js'
import { areWorkflowsEnabled } from '../../tools/WorkflowTool/gate.js'

const workflows = {
  type: 'local-jsx', name: 'workflows', aliases: [],
  description: 'Browse running and completed workflows',
  isEnabled: areWorkflowsEnabled, immediate: true,
  load: () => import('./workflows.js'),
} satisfies Command

export default workflows
