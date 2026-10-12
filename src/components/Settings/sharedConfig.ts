import {useEffect, useMemo, useState} from 'react'

/** Project-scoped preferences belong to the connected owner. Terminal theme,
 * notifications, selection and editor preferences remain in the viewer. */
export const SHARED_CONFIG_KEYS = ['spinnerTipsEnabled', 'prefersReducedMotion', 'outputStyle'] as const
export type SharedConfigKey = typeof SHARED_CONFIG_KEYS[number]
export type SharedConfigValues = {spinnerTipsEnabled?: boolean; prefersReducedMotion?: boolean; outputStyle?: string}
export type SharedConfigPatch = {spinnerTipsEnabled?: boolean | null; prefersReducedMotion?: boolean | null; outputStyle?: string | null}
export type SharedConfigSnapshot = {effective: SharedConfigValues; sources: {source: string; settings: SharedConfigValues}[]}
export type SharedConfigUpdate = {source: 'localSettings'; settings: SharedConfigPatch; expected: SharedConfigPatch}
export interface SharedConfigHost {
  getSettings?(signal?: AbortSignal): Promise<SharedConfigSnapshot>
  updateSettings?(update: SharedConfigUpdate, signal?: AbortSignal): Promise<SharedConfigSnapshot>
  subscribeSettingsChanges?(listener: () => void): () => void
}
export function localConfig(snapshot: SharedConfigSnapshot): SharedConfigValues {
  return snapshot.sources.find(source => source.source === 'localSettings')?.settings ?? {}
}
// Key remapping preserves explicitly declared properties even when T also has
// a string index signature; ordinary Omit would collapse them to its value type.
export type SharedConfigOverlay<T> = {[K in keyof T as K extends SharedConfigKey ? never : K]: T[K]} & SharedConfigValues
export function overlaySharedConfig<T extends SharedConfigValues>(settings: T, snapshot?: SharedConfigSnapshot): SharedConfigOverlay<T> {
  const result = {...settings}
  for (const key of SHARED_CONFIG_KEYS) delete result[key]
  return {...result, ...snapshot?.effective}
}
type State = {snapshot?: SharedConfigSnapshot; pending: boolean; error?: string}
type Saved = {initial: boolean | string | null; written: boolean | string | null}
const valueAt = (settings: SharedConfigValues, key: SharedConfigKey) => settings[key] ?? null

/** Only an acknowledged owner snapshot becomes visible. Old reads and disposed
 * dialogs cannot overwrite a newer result or write the viewer's configuration. */
export class SharedConfigController {
  state: State = {pending: true}
  private alive = true
  private writing = false
  private reading = false
  private revision = 0
  private refreshNeeded = false
  private abort = new AbortController()
  private changed = new Map<SharedConfigKey, Saved>()
  private unsubscribe?: () => void
  constructor(private host: SharedConfigHost, private publish: (state: State) => void) {}
  get hasChanges() {return this.changed.size > 0}
  private emit(next: State) {if (this.alive) {this.state = next; this.publish(next)}}
  start() {
    try {this.unsubscribe = this.host.subscribeSettingsChanges?.(() => {void this.refresh()})}
    catch (error) {this.emit({pending: false, error: String(error)}); return}
    void this.refresh()
  }
  async refresh() {
    if (!this.alive) return
    if (this.writing || this.reading) {this.refreshNeeded = true; return}
    this.reading = true
    const revision = ++this.revision
    try {
      if (!this.host.getSettings) throw Error('Shared owner preferences are not available on this connection')
      const snapshot = await this.host.getSettings(this.abort.signal)
      if (this.alive && revision === this.revision) this.emit({snapshot, pending: false})
    } catch (error) {
      if (this.alive && revision === this.revision) this.emit({...this.state, pending: false, error: error instanceof Error ? error.message : String(error)})
    } finally {
      this.reading = false
      if (this.refreshNeeded && !this.writing) {this.refreshNeeded = false; void this.refresh()}
    }
  }
  async update(settings: SharedConfigPatch, reverting = false): Promise<boolean> {
    if (!this.alive || this.writing || !this.state.snapshot) return false
    this.writing = true; ++this.revision
    this.emit({...this.state, pending: true, error: undefined})
    try {
      if (!this.host.getSettings || !this.host.updateSettings) throw Error('Shared owner preference changes are not available on this connection')
      const before = reverting ? await this.host.getSettings(this.abort.signal) : this.state.snapshot
      if (!this.alive) return false
      const source = localConfig(before), expected: SharedConfigPatch = {}
      for (const key of Object.keys(settings) as SharedConfigKey[]) {
        const current = valueAt(source, key)
        if (reverting && current !== this.changed.get(key)?.written) throw Error('Owner preferences changed elsewhere; refresh before reverting')
        Object.assign(expected, {[key]: current})
      }
      const snapshot = await this.host.updateSettings({source: 'localSettings', settings, expected}, this.abort.signal)
      if (!this.alive) return false
      for (const key of Object.keys(settings) as SharedConfigKey[]) {
        if (reverting) this.changed.delete(key)
        else {
          const saved = this.changed.get(key)
          const initial = saved ? saved.initial : valueAt(source, key)
          const written = valueAt(localConfig(snapshot), key)
          if (initial === written) this.changed.delete(key)
          else this.changed.set(key, {initial, written})
        }
      }
      this.emit({snapshot, pending: false})
      return true
    } catch (error) {
      this.emit({...this.state, pending: false, error: error instanceof Error ? error.message : String(error)})
      return false
    } finally {
      this.writing = false
      if (this.refreshNeeded) {this.refreshNeeded = false; void this.refresh()}
    }
  }
  async revert(): Promise<boolean> {
    if (this.writing) return false
    if (!this.hasChanges) return true
    return this.update(Object.fromEntries([...this.changed].map(([key, saved]) => [key, saved.initial])), true)
  }
  dispose() {this.alive = false; ++this.revision; this.abort.abort(); this.unsubscribe?.()}
}
export function useSharedConfig(host?: SharedConfigHost) {
  const [published, setPublished] = useState<{host?: SharedConfigHost; state: State}>({host, state: {pending: Boolean(host)}})
  const controller = useMemo(() => host ? new SharedConfigController(host, state => setPublished({host, state})) : undefined, [host])
  useEffect(() => {controller?.start(); return () => controller?.dispose()}, [controller])
  return {controller, ...(published.host === host ? published.state : {pending: Boolean(host)})}
}
