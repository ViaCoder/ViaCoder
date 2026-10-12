import type { AppState } from '../../state/AppStateStore.js'
import type { Store } from '../../state/store.js'
import { isBypassPermissionsModeDisabled, transitionPermissionMode } from '../../utils/permissions/permissionSetup.js'
import { RemoteModeSync, type ModeSyncOptions } from './modeSync.js'

/** Bind to the real store, not a /plan-only watcher: Shift-Tab and ExitPlanMode
 * changes also flow here. Synchronous subscribe avoids React effect ACK races. */
export function bindRemoteModeSync(store: Store<AppState>, options: Omit<ModeSyncOptions, 'initialMode' | 'apply'>) {
  const sync = new RemoteModeSync({
    ...options,
    initialMode: store.getState().toolPermissionContext.mode,
    apply: mode => store.setState(state => {
      const context = state.toolPermissionContext
      if (context.mode === mode) return state
      if (mode === 'bypassPermissions' && (!context.isBypassPermissionsModeAvailable || isBypassPermissionsModeDisabled())) {
        throw new Error('Remote permission mode is not permitted locally')
      }
      return { ...state, toolPermissionContext: { ...transitionPermissionMode(context.mode, mode, context), mode } }
    }),
  })
  const unsubscribe = store.subscribe(() => sync.localModeChanged(store.getState().toolPermissionContext.mode))
  return { sync, dispose: () => { unsubscribe(); sync.dispose() } }
}
