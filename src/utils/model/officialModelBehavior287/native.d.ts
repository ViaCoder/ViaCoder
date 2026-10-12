import type {ZodOptional,ZodType} from 'zod/v4'
export type ModelPicker287 = {options: {model: string; label?: string; description?: string; behavesAs?: string}[]; replaceBuiltInOptions?: boolean}
export type BehaviorResult287 = {status: 'known' | 'unknown'} | {status: 'mapped'; target: string; source: 'served' | 'settings'; hops: number}
export type BehaviorMemoOwner287 = {
 behavesAsMemo?: unknown
 servedCatalogSuppressDepth?: number
 pinnedFeatureValues?: Map<string, unknown>
 clientDataCapabilityLogged?: Map<string, Set<string>>
}
export type ModelKnowledge287 = {
 isKnown(model: string): boolean
 identitySpelling(model: string): string
 settingsBehavesAs(model: string): string | undefined
 hasSettingsBehavesAs(): boolean
 settingsGeneration(): object
}
export type CanonicalRoot287 = {
 mainLoopCanonical?:()=>string
 modelKnowledge?: ModelKnowledge287
 servedCapabilityLookup?: (capability: string, models: (string | undefined)[]) => true | undefined
 featureGateLookup?: (gate: string) => boolean
}
export function createModelBehavior287(ports: {
 cL(): CanonicalRoot287
 Tb(model: string, options?: {identity?: boolean}): string
 Doe(identity: string): boolean
 fb(model: string): string
 Xr(): BehaviorMemoOwner287
 Vs(): {config: {models?: {id: string; behaves_as?: string | null}[]}} | null
 va(): {policy: object}
 Xo(): string[]
 ge(source: string): {modelPicker?: ModelPicker287} | null
}): {canonical(model: string, options?: {identity?: boolean}): string; lookup(catalog: ReturnType<Parameters<typeof createModelBehavior287>[0]['Vs']>, model: string): BehaviorResult287}
export function createModelPickerSchema287(ports: {f<T>(factory: () => T): () => T; u: typeof import('zod/v4').z.object; o: typeof import('zod/v4').z.string; T: typeof import('zod/v4').z.array; H: typeof import('zod/v4').z.boolean}): ZodOptional<ZodType<ModelPicker287>>
