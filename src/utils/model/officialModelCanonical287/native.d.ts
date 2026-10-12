import type {CanonicalRoot287} from '../officialModelBehavior287/native.js'
export function createModelCanonical287(catalog: {
  models: readonly {id: string; provider_ids: Record<string, string | null>}[]
}): {canonical(model: string): string; isKnownIdentity(identity: string): boolean; root(): CanonicalRoot287; catalog(): typeof import('../../../vendor/official-model-catalog/catalog.js').catalog; entry(model: string): {display_name?: string; capabilities?: string[]; knowledge_cutoff?: string} | undefined}
