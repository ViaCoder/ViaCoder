import type { BetaTool } from '@anthropic-ai/sdk/resources/beta/messages/messages.mjs'

// Session-scoped cache of rendered tool schemas. Tool schemas render at server
// position 2 (before system prompt), so any byte-level change busts the entire
// ~11K-token tool block AND everything downstream. GrowthBook gate flips
// (tengu_tool_pear, tengu_fgts), MCP reconnects, or dynamic content in
// tool.prompt() all cause this churn. Memoizing per-session locks the schema
// bytes at first render — mid-session GB refreshes no longer bust the cache.
//
// Lives in a leaf module so auth.ts can clear it without importing api.ts
// (which would create a cycle via plans→settings→file→growthbook→config→
// bridgeEnabled→auth).
type CachedSchema = BetaTool & {
  strict?: boolean
  eager_input_streaming?: boolean
}

const owner=()=> (require('./hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('./hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287()

export function getToolSchemaCache(): Map<string, CachedSchema> {
  return owner().toolDescriptionOwner287.cache().byKey
}

export function clearToolSchemaCache(): void {
  owner().toolSchemaBindings287.invalidate()
}
