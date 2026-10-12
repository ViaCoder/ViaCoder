import type {EffortLevel} from '../../utils/effort.js'

export function createSdkSettingsValidation287(ports: {nu: readonly EffortLevel[]}): {
  OA(remote: boolean, enabled: boolean, source: unknown, settings: unknown): string | null
  Uue(value: string): EffortLevel | undefined
  Ow: string
}
