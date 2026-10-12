export type OriginalPermissionResolver287 = (input: OfficialPermissionResolverInput287) => {
  mode: string
  notification?: string
  fromAutoFallback: boolean
  baselineMode: string
  decidedByProactivityLevel: boolean
  modeSuppliedOnInvocation: boolean
  autoDefaultWithheldForPendingVerdict: boolean
  autoStartWithheldForHipaaTaint: boolean
}
export type OfficialPermissionResolverInput287 = {
  cli: {
    permissionMode?: string
    inheritPermissionMode?: string
    dangerouslySkipPermissions?: boolean
    allowDangerouslySkipPermissions?: boolean
    isNonInteractiveSession?: boolean
  }
  env: Record<string, string | undefined>
  settings: {
    disableAutoMode?: string
    permissions?: { defaultMode?: string; disableBypassPermissionsMode?: string }
  }
  agentFrontmatter?: { permissionMode?: string }
}
export type OfficialPermissionResolver287Ports = {
  Ah(value: string): string | undefined
  C(gate: string, fallback: boolean): boolean
  Il(name: string): boolean
  Le(value: unknown): boolean
  Pt(): boolean
  Q5o(): string | undefined
  Uo(key: string, fallback: unknown): { value: unknown; source: string }
  Y2t(): boolean
  _3r(): Record<string, unknown> | null
  an(value: string): string
  ge(source: string): { permissions?: { defaultMode?: string } } | undefined
  i(event: string, metadata: Record<string, unknown>): void
  le(): { bypassPermissionsModeAccepted?: boolean }
  nv(): boolean
  t(message: string, options: { level: 'warn' | 'error' | 'info' }): void
  tr(source: string): boolean
}
export function createOfficialPermissionResolver287(ports: OfficialPermissionResolver287Ports): OriginalPermissionResolver287
