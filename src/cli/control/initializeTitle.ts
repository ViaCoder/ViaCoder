/** Public raw-fs arm of official 2.1.283 initialize.title + Uut.
 * Title cache is synchronous; a derived/auto registry promotion is detached.
 */
import {cleanTitle, nameKey, type NameSource, type RegisteredName} from '../../utils/sessionRename/names.js'

type Registry = {
  current: RegisteredName | undefined
  heldNames: Map<string, NameSource>
  formerNames: {name: string; until: number; sessionId: string}[]
  changed: {emit(): void}
  setName(name: string, source: 'auto'): Promise<boolean>
}
type Ready = {available: true; registry: Registry} | {available: false}
export type InitializeTitleHost = {
  titles: {attempted: boolean}
  cacheTitle(name: string): void
  registryReady(): Promise<Ready>
  canAutoName(): boolean
  logError(error: unknown): void
}

/** Uut follows registration and only promotes a derived name, or an auto name
 * whose normalized key differs. A user/peer/hook name is never replaced. */
export async function promoteInitializeTitle(name: string, host: InitializeTitleHost): Promise<boolean> {
  if (!host.canAutoName()) return false
  const ready = await host.registryReady()
  if (!ready.available || !host.canAutoName()) return false
  const registry = ready.registry, before = registry.current
  if (before === undefined || !(before.source === 'derived' ||
    before.source === 'auto' && nameKey(before.name) !== nameKey(name))) return false
  const updated = await registry.setName(name, 'auto')
  // Exact Uut failure rollback: f$ has already set the local name, but the
  // sole PID writer failed. Do not let that transient auto name shadow the
  // former derived/auto name in this process.
  if (!updated && registry.current?.name === name && registry.current.source === 'auto') {
    registry.current = before
    const key = nameKey(before.name)
    registry.heldNames.delete(key)
    registry.formerNames = registry.formerNames.filter(entry => nameKey(entry.name) !== key)
    registry.changed.emit()
  }
  return updated
}

/** Called after initialize payload preflight, on both first and repeat handshakes.
 * Official title cache/attempted changes precede the control response; Uut is
 * fire-and-forget and its failure is logged rather than failing initialize. */
export function applyInitializeTitle(rawTitle: unknown, host: InitializeTitleHost): string | undefined {
  if (typeof rawTitle !== 'string') return
  const title = cleanTitle(rawTitle)
  if (!title) return
  host.titles.attempted = true
  host.cacheTitle(title)
  void promoteInitializeTitle(title, host).catch(host.logError)
  return title
}
