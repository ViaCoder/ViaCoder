import type {EffortLevel} from '../../entrypoints/sdk/runtimeTypes.js'

// Shared leaf constant: settings validation must not initialize the model graph.
export const EFFORT_LEVELS = [
  'low',
  'medium',
  'high',
  'xhigh',
  'max',
] as const satisfies readonly EffortLevel[]
