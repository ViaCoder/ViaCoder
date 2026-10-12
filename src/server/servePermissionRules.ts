import type { PermissionRulesState, PermissionRuleRow, RulesSource } from '../cli/control/permissionRules.js'

const SOURCES = new Set<RulesSource>([
  'userSettings', 'projectSettings', 'localSettings', 'flagSettings', 'policySettings',
  'cliArg', 'command', 'session', 'toolsNarrowing', 'mcpServerPolicy', 'hostCredential',
])

function object(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : null
}

/** Project the existing SDK list_permission_rules result; never expose unknown worker fields. */
export function projectPermissionRulesResponse(value: unknown): { state: PermissionRulesState } | null {
  const response = object(value), state = object(response?.state)
  if (!state || !Array.isArray(state.rules) || !Array.isArray(state.workspaceDirectories) ||
    typeof state.originalCwd !== 'string' || typeof state.managedOnly !== 'boolean') return null
  const rules: PermissionRuleRow[] = []
  for (const raw of state.rules) {
    const row = object(raw), description = object(row?.description)
    if (!row || !['allow', 'ask', 'deny'].includes(String(row.behavior)) ||
      !SOURCES.has(row.source as RulesSource) || typeof row.rule !== 'string' ||
      !['persistent', 'session', 'readonly'].includes(String(row.editability)) ||
      (row.notInEffect !== undefined && row.notInEffect !== true) ||
      (row.description !== undefined && (!description || typeof description.prefix !== 'string' ||
        (description.emphasis !== undefined && typeof description.emphasis !== 'string') ||
        (description.suffix !== undefined && typeof description.suffix !== 'string')))) return null
    rules.push({ behavior: row.behavior as PermissionRuleRow['behavior'], source: row.source as RulesSource,
      rule: row.rule, editability: row.editability as PermissionRuleRow['editability'],
      ...(description ? { description: { prefix: description.prefix as string,
        ...(typeof description.emphasis === 'string' ? { emphasis: description.emphasis } : {}),
        ...(typeof description.suffix === 'string' ? { suffix: description.suffix } : {}) } } : {}),
      ...(row.notInEffect === true ? { notInEffect: true as const } : {}) })
  }
  const workspaceDirectories: PermissionRulesState['workspaceDirectories'] = []
  for (const value of state.workspaceDirectories) {
    const item = object(value)
    if (!item || typeof item.path !== 'string' || typeof item.source !== 'string') return null
    workspaceDirectories.push({ path: item.path, source: item.source })
  }
  const errors: NonNullable<PermissionRulesState['errors']> = []
  if (state.errors !== undefined) {
    if (!Array.isArray(state.errors)) return null
    for (const value of state.errors) {
      const item = object(value)
      if (!item || typeof item.file !== 'string' || typeof item.path !== 'string' || typeof item.message !== 'string') return null
      errors.push({ file: item.file, path: item.path, message: item.message })
    }
  }
  return { state: { rules, workspaceDirectories, originalCwd: state.originalCwd,
    managedOnly: state.managedOnly, ...(errors.length ? { errors } : {}) } }
}
