import { createStore, type Store } from '../../state/store.js'
import type { EffortValue } from '../effort.js'
import type { SettingsEffortTable, SessionEffort } from './effortSettings.js'
import { shouldPublishEffortOwner287, type EffortOwnerSnapshotSource287 } from './officialEffortOwner287/native.js'

export interface AppStateEffortStoreState287 {
  readonly effortValue?: EffortValue
  readonly settings?: object
}
export interface AppStateEffortStoreOwner287 {
  mainLoopEffortState(): EffortOwnerSnapshotSource287 | undefined
  replaceMainLoopEffortState(value: EffortOwnerSnapshotSource287): void
}
export type AppStateEffortUpdater287<T> = (updater: (previous: T) => T) => void

function decode(value: EffortValue | undefined): SessionEffort {
  if (value === undefined) return {kind: 'inherit'}
  if (value === null) return {kind: 'default'}
  return {kind: 'level', value}
}

/** AppStateProvider's production store constructor and native owner publisher. */
export function createAppStateStoreWithEffortOwner287<T extends AppStateEffortStoreState287>(
  initial: T,
  onChangeAppState: ((change: {newState: T; oldState: T}) => void) | undefined,
  owner: AppStateEffortStoreOwner287,
  getSettingsTable: () => SettingsEffortTable,
): Store<T> {
  const changes = createEffortOwnerChangeWriter287(owner, getSettingsTable)
  const onChange = onChangeAppState ? (change: {newState: T; oldState: T}) => {
    if (!(onChangeAppState as typeof onChangeAppState & {publishesEffortOwner287?:boolean}).publishesEffortOwner287) changes.onChange(change)
    onChangeAppState(change)
  } : undefined
  if (onChangeAppState) changes.initialize(initial)
  return createStore(initial, onChange)
}

function createEffortOwnerChangeWriter287<T extends AppStateEffortStoreState287>(
  owner: AppStateEffortStoreOwner287,
  getSettingsTable: () => SettingsEffortTable,
) {
  const publish = (state: T, settingsChanged: boolean) => {
    const previous = owner.mainLoopEffortState()
    const table = previous === undefined || settingsChanged
      ? getSettingsTable()
      : previous.settingsEffortTable
    const next: EffortOwnerSnapshotSource287 = {
      sessionEffort: decode(state.effortValue),
      settingsEffortTable: table,
    }
    if (previous !== undefined && !shouldPublishEffortOwner287(next, previous)) return
    owner.replaceMainLoopEffortState(next)
  }
  return {
    initialize(state: T) { publish(state, true) },
    onChange(change: {newState: T; oldState: T}) {
      if (change.newState.effortValue !== change.oldState.effortValue || change.newState.settings !== change.oldState.settings) {
        publish(change.newState, change.newState.settings !== change.oldState.settings)
      }
    },
  }
}

/** Bind print/headless state initialization and subsequent immutable updates. */
export function bindAppStateEffortOwnerWriter287<T extends AppStateEffortStoreState287>(
  getState: () => T,
  setState: AppStateEffortUpdater287<T>,
  owner: AppStateEffortStoreOwner287,
  getSettingsTable: () => SettingsEffortTable,
  options?:{onChangePublishesEffort?:boolean},
): AppStateEffortUpdater287<T> {
  const changes = createEffortOwnerChangeWriter287(owner, getSettingsTable)
  changes.initialize(getState())
  return updater => setState(previous => {
    const next = updater(previous)
    if (!options?.onChangePublishesEffort) changes.onChange({newState: next, oldState: previous})
    return next
  })
}
