import type { Command } from '../types/command.js'
export type SkillDoctorRow = {
  name: string; source: string; owner: 'settings' | 'plugin' | 'mcp' | 'synced'; pluginKey?: string
  usageCount: number; daysSinceUse: number | null; listingTokens: number | null; weekTokens: number | null
}
export type SkillDoctorReport = ReturnType<typeof classifySkillDoctorRows>
/** Official chunk-h1hwwazp.js:fqt classification. Unlisted skills cost nothing. */
export function classifySkillDoctorRows(rows: SkillDoctorRow[], weekTokensNote: string | null = null) {
  rows = [...rows].sort((a,b) => (b.daysSinceUse ?? Infinity) - (a.daysSinceUse ?? Infinity))
  const unused = rows.filter(row => row.usageCount === 0 && row.listingTokens !== null)
  const usedPlugins = new Set(rows.filter(row => row.usageCount > 0 && row.pluginKey).map(row => row.pluginKey))
  const server = (row: SkillDoctorRow) => row.name.includes(':') ? row.name.slice(0,row.name.indexOf(':')) : undefined
  const usedServers = new Set(rows.filter(row => row.owner === 'mcp' && row.usageCount > 0).map(server))
  const unusedFromMcp = unused.filter(row => row.owner === 'mcp' && (!server(row) || !usedServers.has(server(row))))
  return { rows, unusedOwned:unused.filter(row => row.owner === 'settings'), unusedSynced:unused.filter(row => row.owner === 'synced'),
    unusedFromPlugins:unused.filter(row => row.owner === 'plugin' && !usedPlugins.has(row.pluginKey)), unusedFromMcp,
    unusedMcpServers:[...new Set(unusedFromMcp.map(server).filter((name): name is string => !!name))], weekTokensNote }
}
export function buildSkillDoctorRows(
  commands: Command[], listingTokens: ReadonlyMap<string,number>, usage: Record<string,{usageCount:number;lastUsedAt:number}>,
  weekTokens: ReadonlyMap<string,number> = new Map(), now = Date.now(),
): SkillDoctorRow[] {
  // Default host supports direct names. Synced/dedup alias attribution needs the
  // official included-skill snapshot; do not infer usage from a colliding alias.
  const seen = new Set<string>()
  return commands.flatMap(command => {
    if (command.type !== 'prompt' || ['builtin','bundled','policySettings'].includes(command.source) || seen.has(command.name)) return []
    if (command.source === 'mcp' && command.loadedFrom !== 'mcp') return []
    seen.add(command.name)
    const synced = (command.loadedFrom as string | undefined) === 'syncedSkills'
    // Official UP/jEe/rmo: consume explicit unqualified identities only; do not
    // guess a colliding bare suffix for plugin/synced skills.
    const identity=command as typeof command & {unqualifiedName?:string;bareNameReserved?:boolean}
    const alias=!synced||!identity.bareNameReserved ? identity.unqualifiedName : undefined
    const record = usage[command.name] ?? (alias ? usage[alias] : undefined)
    return [{ name:command.name, source:command.pluginInfo?.pluginManifest.name ?? (synced ? 'claude.ai' : command.source),
      owner:command.source === 'plugin' ? 'plugin' as const : command.source === 'mcp' ? 'mcp' as const : synced ? 'synced' as const : 'settings' as const,
      pluginKey:command.pluginInfo?.pluginManifest.name, usageCount:record?.usageCount ?? 0,
      daysSinceUse:record ? Math.floor((now - record.lastUsedAt) / 86_400_000) : null,
      listingTokens:listingTokens.get(command.name) ?? null, weekTokens:weekTokens.get(identity.unqualifiedName ?? command.name) ?? null }]
  })
}
