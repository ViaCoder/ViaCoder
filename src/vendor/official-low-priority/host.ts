import {createSignal} from '../../utils/signal.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../../services/analytics/growthbook.js'
import {logEvent} from '../../services/analytics/index.js'
import {logError} from '../../utils/log.js'

// The low-priority and quota adapters share the existing execution host.
// Do not revive the legacy fixture-only ALS root or allocate an alternate cell.
export const getLowPriorityHost = (): object => (import.meta.require('../../services/context/execution287.js') as typeof import('../../services/context/execution287.js')).getExecutionSession287().host
export function runInLowPriorityHost<T>(host: object, work: () => T): T {
  if (host !== getLowPriorityHost()) throw new TypeError('Legacy isolated low-priority host is unsupported; use the existing execution session')
  return work()
}
export const j = () => ({host: getLowPriorityHost()})
export class K<T> {
  private values = new WeakMap<object, T>()
  constructor(private create: () => T) {}
  of(host: object): T { let value = this.values.get(host); if (!value) {value = this.create(); this.values.set(host, value)}; return value }
}
export const Oe = createSignal
export function x<T>(name: string, fallback: T): T { return getFeatureValue_CACHED_MAY_BE_STALE(name, fallback) }
export const d = logError
export const i = logEvent
export const c = <T>(value: T) => value
export const ue = <T>(value: T) => value
// Preserve terminal outcome consumption locally. The private host's QoS sink
// is absent; do not replace the user's customized telemetry implementation.
export const outcomes = createSignal<[event: {operation: string; success: boolean; reason?: string}]>()
export const _ = (operation: string) => outcomes.emit({operation, success: true})
export const p = (operation: string, reason: string) => outcomes.emit({operation, success: false, reason})
