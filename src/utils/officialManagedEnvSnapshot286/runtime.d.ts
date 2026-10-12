// Generated from the selected AST members in native class B.
export declare class OfficialManagedEnvSnapshot286 {
  preSettingsEnvSnapshot: Readonly<Record<string, string | undefined>> | undefined
  userTierNames: Set<string>
  launchNamesBeforeClaim: Set<string> | undefined
  userTierNamesInSnapshot: Set<string>
  getPreSettingsEnvSnapshot(): Readonly<Record<string, string | undefined>>
  latchPreSettingsEnvSnapshot(environment: Record<string, string | undefined>): Readonly<Record<string, string | undefined>>
  peekPreSettingsEnvSnapshot(): Readonly<Record<string, string | undefined>> | undefined
  dropPreSettingsEnvSnapshot(claimedNames?: Iterable<string>): void
}
