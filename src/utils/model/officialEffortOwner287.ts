import {
  shouldPublishEffortOwner287,
  type EffortOwnerSnapshotSource287,
} from './officialEffortOwner287/native.js'
import { decodeSessionEffort, type SettingsEffortTable } from './effortSettings.js'
import {createSelectorEffort287,createSelectorLexical287} from './officialModelPicker287/selector.native.js'
import {createOfficialModelMenuPolicyPorts287} from './officialModelPicker287.js'
import {bindOfficialEffortWc287Imports287} from './effortWc287.js'
import {lazySchema} from '../lazySchema.js'
import type { EffortValue } from '../effort.js'

export type MainLoopEffortSnapshot287 = EffortOwnerSnapshotSource287

/** The two methods present on the recovered modelSelection owner. */
export interface MainLoopEffortOwner287 {
  mainLoopEffortState(): MainLoopEffortSnapshot287 | undefined
  replaceMainLoopEffortState(value: MainLoopEffortSnapshot287): void
}

/** Source kd port; its model-default accessor is a required caller binding. */
export function resolveMainLoopSessionEffort287(
  snapshot: MainLoopEffortSnapshot287,
  model: string | null | undefined,
  sourceDefaultModel: () => string,
): EffortValue | undefined {
  // Reuse the accepted canonical 287 kd -> ee/qSe/$6r closure. Its Y is
  // only a pure identity memo, not a host/session/credential registry or writer.
  // El stays lazy and is the actual caller's default-model port. No WIP entry
  // (Sx/jC) is exposed here; this facade invokes only original kd.
  const lexical = createSelectorLexical287({QZ: createOfficialModelMenuPolicyPorts287().QZ})
  const source = createSelectorEffort287({
    ...bindOfficialEffortWc287Imports287(),
    ...lexical,
    El: sourceDefaultModel,
    f: lazySchema,
  })
  return source.kd(snapshot as Parameters<typeof source.kd>[0], model)
}

/**
 * AppState-to-owner production writer. It uses the recovered fQ equality and
 * the owner's actual table snapshot identity, refreshing the table only when
 * local settings change. Undefined and null remain inherit/default.
 */
export function syncAppStateEffortSnapshot287(
  owner: MainLoopEffortOwner287,
  nextEffortValue: EffortValue | undefined,
  settingsChanged: boolean,
  getSettingsTable: () => SettingsEffortTable,
): boolean {
  const previous = owner.mainLoopEffortState()
  const table = previous === undefined || settingsChanged
    ? getSettingsTable()
    : previous.settingsEffortTable
  const next: MainLoopEffortSnapshot287 = {
    sessionEffort: decodeSessionEffort(nextEffortValue),
    settingsEffortTable: table,
  }
  if (previous !== undefined && !shouldPublishEffortOwner287(next, previous)) return false
  owner.replaceMainLoopEffortState(next)
  return true
}
