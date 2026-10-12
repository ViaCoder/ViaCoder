/** Public 2.1.283 li/Tr and pLt/hIt/mnn/g1n. No account or network imports. */
import { shortSlug, isShortSlug } from './words.js'

export type NameSource = 'user' | 'peer' | 'hook' | 'collision' | 'auto' | 'derived'
export type RegisteredName = { name: string; source: NameSource; since: number; sessionId: string; givenAtLaunch?: boolean }
export type LiveName = { sessionId?: string; kind?: string; pid: number; startedAt: number; procStart?: string; name?: string; nameSince?: number }
export function cleanTitle(value: string): string {
  return [...value.trim().replace(/[\p{Cc}\p{Cf}\u2028\u2029]+/gu, ' ').replace(/[\x00-\x1f\x7f-\x9f]/g, '')].slice(0, 200).join('').trim()
}
export function nameKey(value: string): string {
  return value.normalize('NFKC').replace(/[\p{Cc}\p{Cf}]/gu, c => /\s/.test(c) ? c : '').trim().toLowerCase().replace(/\s+/g, '-')
}
export function suffix(value: string): { base: string; suffix: string } | undefined {
  const m = /-([a-z]+-[a-z]+)(-\d{1,4})?$/i.exec(value)
  if (!m || !isShortSlug(m[1]!.toLowerCase())) return
  const base = value.slice(0, -m[0].length)
  if (base) return { base, suffix: m[0].slice(1) }
}
function earlier(a: LiveName, b: LiveName): boolean {
  if (a.startedAt !== b.startedAt) return a.startedAt < b.startedAt
  if ((a.procStart ?? '') !== (b.procStart ?? '')) return (a.procStart ?? '') < (b.procStart ?? '')
  return a.pid < b.pid
}
// Official re limits UTF-16 units (not codepoints), without splitting a pair.
export function truncateBase(value: string, limit: number): string {
  if (limit <= 0) return ''
  if (value.length <= limit) return value
  const prefix = value.slice(0, limit), last = prefix.charCodeAt(limit - 1)
  return Buffer.from(last >= 0xd800 && last <= 0xdbff ? prefix.slice(0, -1) : prefix, 'utf16le').toString('utf16le')
}
export function chooseName(desired: string, self: LiveName, live: LiveName[], moment: 'rename' | 'recheck', base = desired, slug = shortSlug): string | undefined {
  const key = nameKey(desired)
  if (!key) return
  const holders = live.filter(p => p.pid !== self.pid && p.name !== undefined && p.procStart !== undefined && nameKey(p.name) === key)
  if (!holders.some(p => moment === 'rename' || earlier({ ...p, startedAt: p.nameSince ?? p.startedAt }, { ...self, startedAt: self.nameSince ?? self.startedAt }))) return
  const used = new Set(live.flatMap(p => p.name === undefined ? [] : [nameKey(p.name)]))
  const candidate = (s: string) => `${truncateBase(base, 200 - s.length - 1)}-${s}`
  for (let i = 0; i < 16; i++) { const name = candidate(slug()); if (!used.has(nameKey(name))) return name }
  for (let i = 2; ; i++) { const name = candidate(`${slug()}-${i}`); if (!used.has(nameKey(name))) return name }
}
export interface NameRegistry {
  readonly pid: number
  readonly current: RegisteredName | undefined
  yieldHistory?:{base:string;name:string}
  whenRegistered(): Promise<boolean>
  listLive(): Promise<LiveName[]>
  setName(name: string, source: NameSource): Promise<boolean>
}
export type NameDecision = { requested: string; name: string; recordSource: NameSource; settle: 'pre-decided' | 'own-name' | 'held' | 'superseded' | 'kept' | 'yielded' }
export class NameCoordinator {
  constructor(readonly registry: NameRegistry, private readonly options: {
    // Wire the existing cached feature getter, with this official default.
    uniqueness?: () => boolean
    slug?: () => string
    schedule?: (task: () => Promise<void>) => void
    logError: (error: unknown) => void
  }) {}
  held(requested: string, current?: string): string | undefined {
    if (!(this.options.uniqueness?.() ?? true)) return
    const base = suffix(requested)?.base ?? requested, last = this.registry.yieldHistory
    if (last && current !== undefined && nameKey(last.name) === nameKey(current) && last.base === nameKey(base)) return current
  }
  private previousSuffix(requested: string, current?: string): string | undefined {
    const held = this.held(requested, current)
    if (held !== undefined) return held
    if (current === undefined) return
    const s = suffix(current)
    if (s && s.base.toLowerCase() === truncateBase(suffix(requested)?.base ?? requested, 200 - s.suffix.length - 1).toLowerCase()) return current
  }
  async resolve(requested: string, moment: 'rename' | 'recheck', base = requested): Promise<{ name: string; yielded: boolean }> {
    if (!(this.options.uniqueness?.() ?? true) || !await this.registry.whenRegistered()) return { name: requested, yielded: false }
    base = suffix(base)?.base ?? base
    try {
      const live = await this.registry.listLive(), self = live.find(p => p.pid === this.registry.pid)
      if (!self) return { name: requested, yielded: false }
      const candidate = chooseName(requested, self, live, moment, base, this.options.slug)
      if (candidate === undefined) return { name: requested, yielded: false }
      const previous = this.previousSuffix(requested, self.name)
      const name = cleanTitle(previous !== undefined && nameKey(previous) !== nameKey(requested) ? previous : candidate) || candidate
      this.registry.yieldHistory = { base: nameKey(base), name }
      return { name, yielded: true }
    } catch (error) { this.options.logError(error); return { name: requested, yielded: false } }
  }
  async decide(requested: string, source: 'user' | 'collision'): Promise<NameDecision> {
    await this.registry.whenRegistered()
    const snapshot = this.registry.current
    if (source === 'collision') return { requested, name: requested, recordSource: source, settle: 'pre-decided' }
    if (snapshot && nameKey(snapshot.name) === nameKey(requested) && snapshot.source !== 'auto' && snapshot.source !== 'derived') {
      return { requested, name: requested, recordSource: snapshot.source === 'collision' ? 'collision' : source, settle: 'own-name' }
    }
    const result = await this.resolve(requested, 'rename'), current = this.registry.current
    if (current && current.source !== 'auto' && current.source !== 'derived' &&
        !(current.source === 'collision' && this.held(snapshot?.name ?? requested, current.name) !== undefined)) {
      const key = nameKey(current.name)
      if (!(snapshot && key === nameKey(snapshot.name)) && key !== nameKey(requested) && key !== nameKey(result.name)) {
        return { requested, name: current.name, recordSource: current.source, settle: 'superseded' }
      }
    }
    return { requested, name: cleanTitle(result.name) || requested, recordSource: result.yielded ? 'collision' : source,
      settle: result.yielded ? result.name === snapshot?.name ? 'held' : 'yielded' : 'kept' }
  }
  recheck(decision: NameDecision, onYield: (name: string, prior: string) => Promise<void>): void {
    if (decision.settle !== 'kept' && decision.settle !== 'yielded') return
    const task = async () => {
      const unchanged = () => this.registry.current !== undefined && nameKey(this.registry.current.name) === nameKey(decision.name)
      if (!unchanged()) return
      const next = await this.resolve(decision.name, 'recheck', decision.settle === 'yielded' ? decision.requested : decision.name)
      if (next.yielded && unchanged()) await onYield(next.name, decision.name)
    }
    if (this.options.schedule) this.options.schedule(task)
    else setTimeout(() => { void task().catch(this.options.logError) }, 3000).unref()
  }
}
