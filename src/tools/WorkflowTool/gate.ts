import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'

export type WorkflowDisabledReason =
  | 'managed_settings'
  | 'org_policy'
  | 'unavailable'
  | 'user_setting'

interface OriginalWorkflowGate287 {
  i(): {available: boolean; defaultOn: boolean}
  W6r(): WorkflowDisabledReason | undefined
  nm(): boolean
}

// Reuse complete original nm/W6r/i and the same host-scoped availability cell.
function originalWorkflowGate287(): OriginalWorkflowGate287 {
  return getOriginalModsLifecycle287().clearSourceModule287('chunk-980njedm.js') as unknown as OriginalWorkflowGate287
}

export function getWorkflowAvailability(): {available: boolean; defaultOn: boolean} {
  return originalWorkflowGate287().i()
}

export function getWorkflowDisabledReason(): WorkflowDisabledReason | undefined {
  return originalWorkflowGate287().W6r()
}

export function areWorkflowsEnabled(): boolean {
  return originalWorkflowGate287().nm()
}
