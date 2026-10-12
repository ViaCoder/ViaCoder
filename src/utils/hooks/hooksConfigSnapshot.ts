import {resetSdkInitState,notifyHooksChanged287} from '../../bootstrap/state.js'
import {getRootExecutionSession287} from '../../services/context/execution287.js'
import * as settingsModule from '../settings/settings.js'
import {resetSettingsCache} from '../settings/settingsCache.js'
import {createHooksSnapshot287} from './officialHooksConfiguration287/snapshot.js'

// Original host-keyed l.current() (default key "cli"). The source owns the
// snapshot and invalidation; no independent module-level hooks cache remains.
const source=createHooksSnapshot287({
  root:{get host(){return getRootExecutionSession287().host}},
  settingsForSource:source=>settingsModule.getSettingsForSource(source),
  settings:()=>settingsModule.getSettings_DEPRECATED(),
  invalidateSettings:resetSettingsCache,
  notify:notifyHooksChanged287,
})
// Hoisted live getter: cyclic consumers may bind the function before this factory initializes.
export function getHooksConfigFromSnapshot(...args:Parameters<typeof source.snapshot>){return source.snapshot(...args)}
export function captureHooksConfigSnapshot(...args:Parameters<typeof source.capture>){return source.capture(...args)}
export function updateHooksConfigSnapshot(...args:Parameters<typeof source.update>){return source.update(...args)}
export function shouldAllowManagedHooksOnly(...args:Parameters<typeof source.managedOnly>){return source.managedOnly(...args)}
export function shouldDisableAllHooksIncludingManaged(...args:Parameters<typeof source.disabled>){return source.disabled(...args)}
export function getHooksSnapshotOwner287(...args:Parameters<typeof source.owner>){return source.owner(...args)}
export function resetHooksConfigSnapshot():void {
  source.owner().store(null)
  resetSdkInitState()
}
