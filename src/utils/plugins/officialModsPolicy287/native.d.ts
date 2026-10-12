/** Original source-qualified per-runtime policy and engine cells; unset is meaningful. */
export interface ModsPolicyCell287<T> { set(value: T | undefined): void; get(): T | undefined }
export interface ModsPolicy287 { readonly managedIds: readonly string[]; readonly order: { readonly prepend: readonly string[]; readonly append: readonly string[]; readonly from: { readonly prepend: 'user' | 'policy' | 'none'; readonly append: 'user' | 'policy' | 'none' }; readonly shadowed: readonly string[]; readonly outermost: readonly string[]; readonly seat: string; readonly shadowedBy?: string } }
export type ModsEngineState287 = (request: { readonly op: string; readonly args: unknown; readonly caller: unknown }, next: (...args: never[]) => unknown) => unknown
export interface ModsPolicyRuntime287 { readonly policyCell: ModsPolicyCell287<ModsPolicy287>; policy(): ModsPolicy287 | undefined; readonly engineCell: ModsPolicyCell287<ModsEngineState287>; engineState(): ModsEngineState287 | undefined; isEngineActive(): boolean }
export function createModsPolicy287(): ModsPolicyRuntime287
