export interface ParsedBaseTools287 {
  kept: string[]
  excluded: Set<string>
  bare: boolean
  detached: string[]
  scoped: string[]
}
export interface SearchToolsInitialization287 {
  allowed: string[]
  base: ParsedBaseTools287
  kept: string[]
  isPreset: boolean
  warnings: string[]
}
export interface SearchToolOptInPorts287 {
  feature(name: string, fallback: boolean): boolean
  replaceSearchToolsOptIn(value: boolean): void
}
export interface SearchToolOptIn287 {
  parseList(tools: string[]): string[]
  parseBase(tools: string[]): ParsedBaseTools287
  preset(value: string): 'default' | null
  normalize(tool: string): string
  parseRule(rule: string): {toolName: string; ruleContent?: string}
  formatRule(rule: {toolName: string; ruleContent?: string}): string
  validateAllow(tool: string): {valid: false; error: string; suggestion: string; examples: string[]} | null
  initialize(allowed: string[], base?: string[]): SearchToolsInitialization287
}
export function createSearchToolOptIn287(ports: SearchToolOptInPorts287): SearchToolOptIn287
