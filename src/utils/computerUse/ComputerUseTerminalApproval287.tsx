import * as React from 'react'
import type { CuPermissionRequest, CuPermissionResponse } from '../../vendor/official-desktop/nativeTypes.js'
import { ComputerUseApproval } from '../../components/permissions/ComputerUseApproval/ComputerUseApproval.js'
import { requestOfficialRltDialog287, type OfficialRltDialogStore287, type OfficialRltRequestHost287 } from '../officialRlt287.js'
import { OfficialRltSourceRenderer287, type OfficialRltRendererLayout287 } from '../officialRltRenderer287.js'
import { requestComputerUseDialog287 } from './approval287.js'
import { computerUseWebRequest287 } from './webApproval287.js'
import { useRegisterKeybindingContext } from '../../keybindings/KeybindingContext.js'

/** The already-connected UE/Hpr owns pending requests, ordering and replies. */
export function requestComputerUseTerminalApproval287(host: OfficialRltRequestHost287,
  request: CuPermissionRequest, signal: AbortSignal): Promise<CuPermissionResponse> {
  return requestComputerUseDialog287({ abortController: { signal },
    requestDialog: (spec, payload, options) => requestOfficialRltDialog287(host, spec, payload,
      { signal: options.signal, armInputGrace: true }),
  }, request)
}

/** Full original $ye first-answer/presence gate + existing approval menu.
 * This is a C kind registration, not another dialog/grant/cache owner. */
export function ComputerUseTerminalApproval287({ store, enabled, layout }: {
  store: OfficialRltDialogStore287; enabled: boolean; layout: OfficialRltRendererLayout287
}) {
  const state = React.useSyncExternalStore(store.subscribe, store.getState)
  const request = state.open.findLast(row => !row.userInvoked)
  const visible = enabled && !state.open.some(row => row.userInvoked) && request?.kind === 'computer_use_approval' && Boolean(request.id)
  useRegisterKeybindingContext('Confirmation', visible)
  if (!visible || !request?.id) return null
  const payload = computerUseWebRequest287.parse(request.payload)
  return <OfficialRltSourceRenderer287<CuPermissionResponse> store={store} request={{ ...request, id: request.id }} layout={layout}>
    {({ answer }) => <ComputerUseApproval request={payload} onDone={response => { answer(response) }} />}
  </OfficialRltSourceRenderer287>
}
