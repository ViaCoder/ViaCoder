import type { ValidationError } from '../../utils/settings/validation.js'

/** Main must bind this to the actual session lane (official Tg), not auth state. */
export interface ControlLane {
  redactsPersistedLane(): boolean
}
export function assertReadableLane(lane: ControlLane, subtype: string): void {
  if (lane.redactsPersistedLane()) throw new Error(`${subtype} is not available on this connection`)
}
export type SettingsWireError = Pick<ValidationError, 'file' | 'path' | 'message'>
export function projectSettingsErrors(errors: readonly ValidationError[]): SettingsWireError[] {
  return errors.filter(error =>
    !('severity' in error && error.severity === 'warning') && error.mcpErrorMetadata?.severity !== 'warning',
  ).map(({ file, path, message }) => ({ file, path, message }))
}
