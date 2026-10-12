import type * as React from 'react'
import type { AutoUpdaterResult } from '../utils/autoUpdater.js'

type Props = {
  isUpdating: boolean
  onChangeIsUpdating: (isUpdating: boolean) => void
  onAutoUpdaterResult: (autoUpdaterResult: AutoUpdaterResult) => void
  autoUpdaterResult: AutoUpdaterResult | null
  showSuccessMessage: boolean
  verbose: boolean
}

/** Official application auto-updates are disabled for source distributions. */
export function NativeAutoUpdater(_props: Props): React.ReactNode {
  return null
}
