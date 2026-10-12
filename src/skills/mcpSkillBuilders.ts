import type {
  createSkillCommand,
  parseSkillFrontmatterFields,
} from './loadSkillsDir.js'

/**
 * Write-once registry for the two loadSkillsDir functions that MCP skill
 * discovery needs. This module is a dependency-graph leaf: it imports nothing
 * but types, so both mcpSkills.ts and loadSkillsDir.ts can depend on it
 * without forming a cycle (client.ts → mcpSkills.ts → loadSkillsDir.ts → …
 * → client.ts).
 *
 * The non-literal dynamic-import approach ("await import(variable)") fails at
 * runtime in Bun-bundled binaries — the specifier is resolved against the
 * chunk's /$bunfs/root/… path, not the original source tree, yielding "Cannot
 * find module './loadSkillsDir.js'". A literal dynamic import works in bunfs
 * but dependency-cruiser tracks it, and because loadSkillsDir transitively
 * reaches almost everything, the single new edge fans out into many new cycle
 * violations in the diff check.
 *
 * Registration happens at loadSkillsDir.ts module init, which is eagerly
 * evaluated at startup via the static import from commands.ts — long before
 * any MCP server connects.
 */

export type MCPSkillBuilders = {
  createSkillCommand: typeof createSkillCommand
  parseSkillFrontmatterFields: typeof parseSkillFrontmatterFields
}

let builders: MCPSkillBuilders | null = null

// C supporting-resource admission observes the full original N builder result.
// Commands intentionally close over the root; this owns no fetch/cache state.
const mcpSkillCommandRoots287 = new WeakMap<import('../types/command.js').Command, Readonly<{server:string;uri:string}>>()
export function recordMcpSkillCommandRoot287(command:import('../types/command.js').Command,root:Readonly<{server:string;uri:string}>):void {
  mcpSkillCommandRoots287.set(command,root)
}
export function getMcpSkillCommandRoot287(command:import('../types/command.js').Command) {
  return mcpSkillCommandRoots287.get(command)
}

export function registerMCPSkillBuilders(b: MCPSkillBuilders): void {
  builders = b
}

export function getMCPSkillBuilders(): MCPSkillBuilders {
  if (!builders) {
    throw new Error(
      'MCP skill builders not registered — loadSkillsDir.ts has not been evaluated yet',
    )
  }
  return builders
}

/** Original scey49m3.y reads/writes this same leaf cell. The view has no state. */
const mcpSkillBuilderRegistry287 = {
  get loaderSide(): MCPSkillBuilders | null { return builders },
  register: registerMCPSkillBuilders,
}
export function getMCPSkillBuilderRegistry287() { return mcpSkillBuilderRegistry287 }
