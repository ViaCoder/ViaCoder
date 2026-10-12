import {createOfficialBrookHeron287, type OfficialBrookHeronPorts287} from './officialSystemComposerHelpers287/native.js'
import {getExecutionSession287} from '../services/context/execution287.js'
import {logEvent} from '../services/analytics/index.js'
import {getClientData} from '../utils/clientData.js'
import {getModelBehaviorName287} from '../utils/model/behavior287.js'
import {getDefaultMainLoopModel} from '../utils/model/model.js'
import {normalizeModelStringForAPI} from '../utils/model/model.js'
import {resolveSettingsEffort} from '../utils/model/effortSettings.js'
import {createEffortOwnerSource287} from '../utils/model/officialEffortOwner287/native.js'
import {resolveOfficialEffortWc287} from '../utils/model/effortWc287.js'
import type {EffortOwnerSnapshotSource287} from '../utils/model/officialEffortOwner287/native.js'
import type {EffortLevel} from '../utils/effort.js'

export type EffortPrompt287 = (model: string) => string | null

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function localAnalyticsMetadata(payload: Readonly<Record<string, unknown>>): Record<string, boolean | number | undefined> {
  const metadata: Record<string, boolean | number | undefined> = {}
  for (const [key, value] of Object.entries(payload)) {
    if (typeof value === 'boolean' || typeof value === 'number') metadata[key] = value
  }
  return metadata
}

const effortOwner = createEffortOwnerSource287({
  resolveSettingsEffort,
  sourceDefaultModel: getDefaultMainLoopModel,
})

const ports: OfficialBrookHeronPorts287 = {
  Be: model => getModelBehaviorName287(model),
  Fn: normalizeModelStringForAPI,
  Ji: isRecord,
  Kd: getClientData,
  WC: resolveOfficialEffortWc287,
  i: (event, payload) => logEvent(event, localAnalyticsMetadata(payload)),
  kZr: () => getExecutionSession287().modelSelection.mainLoopEffortState(),
  kd: (snapshot: EffortOwnerSnapshotSource287, model: string | undefined): EffortLevel | number | undefined =>
    effortOwner.read(snapshot, model),
  me: effort => effort,
}

const Pao = createOfficialBrookHeron287(ports).Pao

/** Ready singleton consumer for the one `brook_heron` dynamic section owner. */
export function brookHeronGuidance287(model: string): string | null {
  return Pao(model)
}
