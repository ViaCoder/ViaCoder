export type DangerousSettings = {
  shellSettings: Record<string, string>
  envVars: Record<string, string>
  sandboxSettings: Record<string, string>
  isolationSettings: Record<string, string>
  hasHooks: boolean
  hooks?: unknown
  inlineHelperScriptSizes?: Record<string, {bytes: number; lines: number}>
  payloadSlots: Record<string, {
    shellSettings: Record<string, string>
    envVars: Record<string, string>
    sandboxSettings: Record<string, string>
    isolationSettings: Record<string, string>
  }>
}
export function extractDangerousSettings(settings: unknown): DangerousSettings
export function hasDangerousSettings(settings: DangerousSettings): boolean
export function hasDangerousSettingsChanged(previous: unknown, next: unknown): boolean
export function hashDangerousSettings(settings: DangerousSettings): string
export function matchesConsentHash(hash: string, settings: DangerousSettings, claudeMd?: string): boolean
export function needsConsentReview(baseline: {source: 'consented_payload'; settings: unknown} | {source: 'org_record'; dangerousSettingsHash: string; consentedPayload: unknown}, settings: unknown): boolean
