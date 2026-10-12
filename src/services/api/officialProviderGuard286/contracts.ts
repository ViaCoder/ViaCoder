export type Provider286 = 'firstParty' | 'gateway' | 'bedrock' | 'mantle' | 'vertex' | 'foundry' | 'anthropicAws' | 'anthropicGoogleCloud'
export type ProviderPolicyName286 = Exclude<Provider286, 'firstParty'> | 'anthropic' | 'customEndpoint'
// Preserve the native v7e admin enum: anthropicGoogleCloud is not on this list.
export type AllowedProvider286 = Exclude<ProviderPolicyName286, 'anthropicGoogleCloud'>
export type Dispatch286 = 'inference' | 'files'
export type SettingSource286 = 'policySettings' | 'flagSettings' | 'localSettings' | 'projectSettings' | 'userSettings'
/** Native getter object is structural, not a primitive-valued dictionary.
 * Production AuthEnvironment also contains set/unset methods. These are not
 * provider flags; dynamic endpoint names below are the original table keys.
 */
export interface Environment286 {
  readonly ANTHROPIC_BASE_URL?: string
  readonly ANTHROPIC_UNIX_SOCKET?: string
  readonly CLAUDE_CODE_API_BASE_URL?: string
  readonly CLAUDE_CODE_USE_BEDROCK?: boolean | string
  readonly CLAUDE_CODE_USE_FOUNDRY?: boolean | string
  readonly CLAUDE_CODE_USE_ANTHROPIC_AWS?: boolean | string
  readonly CLAUDE_CODE_USE_ANTHROPIC_GOOGLE_CLOUD?: boolean | string
  readonly CLAUDE_CODE_USE_MANTLE?: boolean | string
  readonly CLAUDE_CODE_USE_VERTEX?: boolean | string
  readonly ANTHROPIC_BEDROCK_BASE_URL?: string
  readonly AWS_ENDPOINT_URL_BEDROCK_RUNTIME?: string
  readonly AWS_ENDPOINT_URL_BEDROCK?: string
  readonly AWS_ENDPOINT_URL?: string
  readonly ANTHROPIC_BEDROCK_MANTLE_BASE_URL?: string
  readonly ANTHROPIC_AWS_BASE_URL?: string
  readonly ANTHROPIC_VERTEX_BASE_URL?: string
  readonly ANTHROPIC_GOOGLE_CLOUD_BASE_URL?: string
  readonly ANTHROPIC_FOUNDRY_BASE_URL?: string
  readonly ANTHROPIC_FOUNDRY_RESOURCE?: string
}
export interface ManagedSettings286 {
  allowedProviders?: AllowedProvider286[]
  env?: Record<string, string>
  forceLoginMethod?: string
  forceLoginGatewayUrl?: string
}
export interface LoadError286 { file: string; path?: string; message: string; severity?: string }
export interface EndpointOverride286 {
  variable: string; envKey: string | undefined; value: string; pinVariables: string[]
  matchesPin?: (value: string) => boolean
}
export interface RefusedProvider286 {
  provider: Provider286; name: ProviderPolicyName286; overrides: EndpointOverride286[]; dispatch: Dispatch286
  reason: 'not_listed' | 'endpoint'; override: EndpointOverride286 | undefined
}
export interface Refusal286 { refused: RefusedProvider286[]; allowed: AllowedProvider286[]; message: string }

/** Original settings semantics, not substitutes made from the first-source-wins slot.
 * All fields are required even when the caller's reader returns null/undefined.
 * These methods must come from the settings owner; no fallback is installed here.
 */
export interface NativePolicySources286 {
  Mht(): ManagedSettings286 | null
  R7n(): ManagedSettings286[]
  k7n(): {settings: ManagedSettings286 | null; servedSnapshot: boolean}
  H9(): boolean
  Go(): void
  YS(): boolean
  c7e(): {forceLoginMethod: string | undefined; forceLoginGatewayUrl: string | undefined}
  ak(): LoadError286[]
}
export interface GatewaySources286 {
  no(): {url: string; unpinned?: boolean} | null
  BGt(): ManagedSettings286 | null
  jGt(): boolean
  WGt(): boolean
}
export interface ProviderPorts286 extends Pick<GatewaySources286, 'no' | 'jGt' | 'WGt'> {a: Environment286}
export interface ProviderNative286 {
  He(): Provider286
  GSe(): Provider286 | null
  Bh(url: string): boolean
  N7n(provider: Provider286, env: (name: string) => string | undefined): Array<{variable: string; url: string; verdict: string}>
  M7n(provider: Provider286): ProviderPolicyName286
  Ijt(name: string): string
  qS: Record<Exclude<Provider286, 'firstParty'>, string>
  _Be: Partial<Record<Provider286, string>>
}
export interface GuardPorts286 extends NativePolicySources286, Pick<GatewaySources286, 'no' | 'BGt'>, ProviderNative286 {
  a: Environment286
  ge(source: SettingSource286): ManagedSettings286 | null
  sr(source: SettingSource286): string | undefined
  it<T>(initial: T, reset: (state: T) => void): T
  L(value: unknown): boolean
  v7e: string[]
  I(count: number, singular: string, plural?: string): string
  N<T>(values: T[]): T[]
  Lg(value: string): string
  P: new (message: string, telemetryMessage?: string, errorClass?: string) => Error
}
export interface ProviderGuard286 {
  Op(reader: () => string | null | undefined): void
  sYe(provider: Provider286, endpoint: string | undefined, dispatch?: Dispatch286): void
  yJ(provider?: Provider286, endpoint?: string, dispatch?: Dispatch286): Refusal286 | undefined
  ro: {wifProfileBaseUrlInUse: (() => string | null | undefined) | undefined; settleRemotePolicy: unknown}
  Rp: {failedAt: number}
}

/** Native gateway accessors require the real slot-bearing execution context.
 * getSecureStorageExecutionHost() currently returns an empty host object. Main
 * must expose the existing owner slots; this contract does not fabricate them.
 */
export interface GatewayContext286 {
  host: {
    settingsSource: {parentManagedSettings(): ManagedSettings286 | null}
    credentialSlots: {
      gatewayAuth(): {url: string; unpinned?: boolean} | null
      gatewayServerProcess(): boolean
      gatewayRequiredByHostPolicy(): boolean
    }
  }
}
