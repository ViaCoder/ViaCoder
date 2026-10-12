import type {TextBlockParam} from '@anthropic-ai/sdk/resources/messages/messages.js'
// SDK generic cache declarations omit this raw prompt-caching-scope beta field.
export type SystemCacheControl287 = {type: 'ephemeral'; ttl?: '1h'; scope?: 'global'}
export type SystemCacheTextBlock287 = Omit<TextBlockParam, 'cache_control'> & {cache_control?: SystemCacheControl287}
export interface SystemCachePorts287 {
  provider(): string
  experimentalAllowed(): boolean
  environment: {_CLAUDE_CODE_ASSUME_FIRST_PARTY_BASE_URL?: boolean}
  prefixes: ReadonlySet<string>
  analytics(event: string, attributes: Record<string, number>): void
}
export interface SystemCacheSerializer287 {
  globalScope(): boolean
  split(input: readonly string[], options?: {skipGlobalCacheForSystemPrompt?: boolean; skipTelemetry?: boolean}): {text: string; cacheScope: 'org' | 'global' | null}[]
  blocks(input: readonly string[], enabled: boolean, options?: {skipGlobalCacheForSystemPrompt?: boolean; cacheTtl?: '1h'}): SystemCacheTextBlock287[]
  cacheControl(options?: {scope?: 'org' | 'global' | null; ttl?: '1h'}): SystemCacheControl287
}
export declare function createSystemCache287(ports: SystemCachePorts287): SystemCacheSerializer287
