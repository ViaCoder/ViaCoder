/** Unchanged official cJ/zm/tn closures; see followup-provenance.json. */
export function revealControls(value: string): string
export function revealControlsSingleLine(value: string): string
export function sanitizeMcpText(value: unknown): string
export function parseOfficialInteger(value: string): number
export function pluginDisplayName(manifest: {name: string; displayName?: unknown}): string
export function hookMetadata(toolNames: string[]): Record<string, {
  summary: string
  description: string
  matcherMetadata?: {fieldToMatch: string; values: string[]}
}>
