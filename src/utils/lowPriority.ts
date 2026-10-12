import {cancelUsageLimitWait, officialUsageLimitWait} from '../services/usageLimitWait.js'
import {APIUserAbortError} from '@anthropic-ai/sdk'
import {getSessionId, onSessionSwitch, getIsInteractive, getIsRemoteMode} from '../bootstrap/state.js'
import {createSignal} from './signal.js'
import * as official from '../vendor/official-low-priority/canonical287.js'
import {getLowPriorityHost} from '../vendor/official-low-priority/host.js'
import {isClaudeAISubscriber, getOauthAccountInfo} from './auth.js'
import {getAPIProvider, isFirstPartyAnthropicBaseUrl} from './model/providers.js'
import {enqueue} from './messageQueueManager.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../services/analytics/growthbook.js'
import {randomUUID} from 'node:crypto'
import {asAgentId} from '../types/ids.js'

export const LOW_PRIORITY_HEADER = 'anthropic-usage-limit'
export const LOW_PRIORITY_HEADER_VALUE = 'slow'
export {official as officialLowPriority}
export type LowPriorityOffer = {
  status?: string; rateLimitType?: string; resetsAt?: number; isUsingOverage?: boolean; overageInUse?: boolean
  lowPriorityOffer?: 'treatment' | 'control'
  lowPriorityRetryAfterSeconds?: number; lowPriorityMaxWaitSeconds?: number
}
type Waiting = {delayMs: number; attempt: number; waitingSinceMs: number}
export type LowPriorityUiState = {active: boolean; waiting: boolean; line?: string; allowancePercent?: number; endedReason?: string}
type HostState = {
  offer?: LowPriorityOffer; session: string; identity?: string; identityObserved: boolean
  endedReason?: string; waits: Map<object, Waiting>; changed: ReturnType<typeof createSignal>
  snapshot: LowPriorityUiState; resetTimer?: ReturnType<typeof setTimeout>
}
const hosts = new WeakMap<object, HostState>()
function host(): HostState {
  const key = getLowPriorityHost()
  let state = hosts.get(key)
  if (state) return state
  state = {session: getSessionId(), identityObserved: false, waits: new Map(), changed: createSignal(), snapshot: {active: false, waiting: false}}
  hosts.set(key, state)
  const current = state
  official.urn(() => publish(current))
  official.WIt(event => {
    if (event.type === 'ended') {
      current.endedReason = event.reason
      current.waits.clear()
    } else current.endedReason = undefined
    publish(current)
  })
  return state
}
function publish(state = host()) {
  const current = official.L3e(), active = current.phase === 'active', waiting = active && state.waits.size > 0
  const copy = official.L4(), percent = official.drn()
  state.snapshot = {active, waiting, endedReason: state.endedReason,
    allowancePercent: percent,
    line: waiting ? copy.waitBanner : active ? copy.statusLine.replace('{reset}', formatOfficialResetTime(current.resetsAtSeconds) ?? '') +
      (percent === undefined ? '' : ` · ${copy.allowanceNote.replace('{percent}', String(percent) + '%')}`) : state.endedReason === 'budget' ? copy.budgetExhaustedCopy : undefined,
  }
  clearTimeout(state.resetTimer)
  if (active) {
    state.resetTimer = setTimeout(() => {official.lUn(); publish(state)}, Math.min(2147483647, Math.max(0, current.resetsAtSeconds * 1000 + 60000 - Date.now())))
    state.resetTimer.unref?.()
  }
  state.changed.emit()
}
function checkConversation() {
  const state = host(), id = getSessionId()
  if (state.session !== id) {state.session = id; state.offer = undefined; official.K0('conversation_reset')}
}
onSessionSwitch(() => checkConversation())
export function syncLowPriorityIdentity(identity?: string, eligible = true) {
  const state = host()
  if (!eligible || state.identityObserved && identity !== state.identity) {
    state.offer = undefined
    cancelUsageLimitWait('account_switch')
    official.K0('account_switch')
    official.Fwo()
  }
  state.identityObserved = true; state.identity = identity
}
export function isOfficialLowPriorityActive(): boolean {checkConversation(); return official.NMe()}
export function isLowPriorityCommandAvailable(): boolean {return isOfficialLowPriorityActive() || official.M3e()}
export function isLowPriorityModeEnabled(): boolean {
  return isOfficialLowPriorityActive()
}
export function observeLowPriorityHeaders(headers: Headers, success: boolean) {
  const state = host(), arm = official.Mwo(headers)
  const reset = Number(headers.get('anthropic-ratelimit-unified-reset'))
  const overageStatus = headers.get('anthropic-ratelimit-unified-overage-status')
  // Remember an actual server offer, never infer entitlement from the env flag.
  if (arm) state.offer = {status: headers.get('anthropic-ratelimit-unified-status') ?? undefined,
    rateLimitType: headers.get('anthropic-ratelimit-unified-representative-claim') ?? undefined,
    resetsAt: Number.isFinite(reset) && reset > 0 ? reset : undefined, lowPriorityOffer: arm,
    lowPriorityRetryAfterSeconds: official.rUn(headers), lowPriorityMaxWaitSeconds: official.oUn(headers),
    isUsingOverage: headers.get('anthropic-ratelimit-unified-status') === 'rejected' && (overageStatus === 'allowed' || overageStatus === 'allowed_warning'),
    overageInUse: headers.get('anthropic-ratelimit-unified-overage-in-use') === 'true'}
  else if (headers.has('anthropic-ratelimit-unified-status')) state.offer = undefined
  if (success) official.jwo(headers)
}
export function canAcceptOfficialLowPriority(offer: LowPriorityOffer | undefined = host().offer, now = Date.now()): boolean {
  const treatment = !!offer && isLowPriorityHostEligible() && offer.status === 'rejected' &&
    offer.isUsingOverage !== true && offer.overageInUse !== true &&
    offer.rateLimitType === 'five_hour' && offer.lowPriorityOffer === 'treatment' &&
    typeof offer.resetsAt === 'number' && Number.isFinite(offer.resetsAt) && offer.resetsAt * 1000 > now &&
    official.M3e() && !isOfficialLowPriorityActive() && !official.cUn(now) && official.mCe(now) === undefined
  return treatment || canResumeOfficialLowPriority(offer, now)
}
function canResumeOfficialLowPriority(offer: LowPriorityOffer | undefined, now: number): boolean {
  const stoppedReset = official.Uwo(now)
  const quotaState = officialUsageLimitWait.ose()
  const armedReset = quotaState.phase === 'armed' ? quotaState.resetsAtSeconds : undefined
  return !!offer && isLowPriorityHostEligible() && offer.status !== 'rejected' && typeof stoppedReset === 'number' &&
    stoppedReset === offer.resetsAt && official.M3e() && !isOfficialLowPriorityActive() &&
    !official.cUn(now) && official.mCe(now) === undefined && quotaState.phase !== 'stale' && (armedReset === undefined || armedReset === stoppedReset)
}
// Exact public equivalents of 2.1.284 set()/WQ()/nz() gates.
function isLowPriorityHostEligible(): boolean {
  const feature = getFeatureValue_CACHED_MAY_BE_STALE<unknown>('tengu_toasty_breeze', {})
  const enabled = typeof feature === 'object' && feature !== null && !Array.isArray(feature) &&
    (feature as {enabled?: unknown}).enabled === true
  return isClaudeAISubscriber() && getOauthAccountInfo()?.billingType !== 'usage_based' &&
    getAPIProvider() === 'firstParty' && isFirstPartyAnthropicBaseUrl() &&
    getIsInteractive() && !getIsRemoteMode() && process.env.CLAUDE_CODE_SESSION_KIND !== 'bg' && enabled
}
export function acceptOfficialLowPriority(offer: LowPriorityOffer | undefined = host().offer, entry = 'command'): boolean {
  host()
  if (canResumeOfficialLowPriority(offer, Date.now())) return official.Bwo(entry)
  if (!canAcceptOfficialLowPriority(offer)) return false
  cancelUsageLimitWait('low_priority')
  return official.$wo({resetsAtSeconds: offer!.resetsAt, arm: offer!.lowPriorityOffer, entry,
    retryAfterSeconds: offer!.lowPriorityRetryAfterSeconds, maxWaitSeconds: offer!.lowPriorityMaxWaitSeconds})
}
export function setLowPriorityMode(enabled: boolean, offer?: LowPriorityOffer): void {
  if (enabled) acceptOfficialLowPriority(offer)
  else official.K0('user')
  publish()
}
export function toggleLowPriorityMode(): boolean {
  setLowPriorityMode(!isLowPriorityModeEnabled()); return isLowPriorityModeEnabled()
}

/** Official /low-priority command outcome text (2.1.284, chunk-bavbzc88). */
export function runOfficialLowPriority(entry: string, offer: LowPriorityOffer | undefined = host().offer): string {
  host()
  if (isOfficialLowPriorityActive()) {
    setLowPriorityMode(false)
    return `Lower-priority mode is off. New messages wait for your usage limit as usual${canAcceptOfficialLowPriority(offer) ? '; run /low-priority again to turn it back on' : ''}.`
  }
  const resumed = canResumeOfficialLowPriority(offer, Date.now())
  const autoWaitArmed = officialUsageLimitWait.ose().phase === 'armed'
  if (resumed && autoWaitArmed) cancelUsageLimitWait('low_priority')
  if (acceptOfficialLowPriority(offer, entry)) {
    // 2.1.284 QWe uses Ve(): the active session ID branded as AgentId via
    // bo(), whose official implementation is identity. Its origin is the
    // same auto-continuation kind used by the usage-limit queue.
    if (!resumed || autoWaitArmed) enqueue({agentId: asAgentId(getSessionId()), mode: 'prompt', priority: 'later', value: 'You can continue now. Continue the task you were working on when the usage limit was reached; do not repeat work that is already complete.', uuid: randomUUID(), origin: {kind: 'auto-continuation'}, isMeta: true, skipSlashCommands: true})
    const reset = official.L3e().resetsAtSeconds
    const until = formatOfficialResetTime(reset)
    return `${resumed ? 'Lower-priority mode is back on' : 'Continuing now at lower priority'} until your limit resets at ${until}. Your weekly limit still applies, and responses may pause while waiting for spare capacity. Run /low-priority to stop.`
  }
  if (official.cUn()) return `${official.L4().budgetExhaustedCopy}. Lower-priority mode is offered again after your weekly limit resets.`
  const cooloff = official.mCe()
  if (cooloff !== undefined) return `Lower-priority mode is taking a break until ${formatOfficialResetTime(Math.ceil(cooloff / 1000)) ?? 'later'}, after waiting too long for spare capacity. Try /low-priority again then.`
  return "Lower-priority mode isn't available right now."
}
// 2.1.284's nu(seconds): preserve the official en-US reset-time formatter,
// including the date for distant resets and lowercase am/pm.
function formatOfficialResetTime(seconds: number): string {
  const date = new Date(seconds * 1000), now = new Date(), minutes = date.getMinutes()
  const hours = (date.getTime() - now.getTime()) / 3_600_000
  if (hours > 24) {
    const options: Intl.DateTimeFormatOptions = {month: 'short', day: 'numeric', hour: 'numeric', minute: minutes === 0 ? undefined : '2-digit', hour12: true}
    if (date.getFullYear() !== now.getFullYear()) options.year = 'numeric'
    return date.toLocaleString('en-US', options).replace(/[ \u202f]([AP]M)/i, (_match, half: string) => half.toLowerCase())
  }
  return date.toLocaleTimeString('en-US', {hour: 'numeric', minute: minutes === 0 ? undefined : '2-digit', hour12: true})
    .replace(/[ \u202f]([AP]M)/i, (_match, half: string) => half.toLowerCase())
}
export const subscribeLowPriorityStatus = (listener: () => void) => host().changed.subscribe(listener)
export const getLowPriorityStatus = (): LowPriorityUiState => host().snapshot
export const createLowPriorityWait = official.iUn
export function finishLowPriorityWait(wait: {current: unknown}, served = false) {
  if (served) official.prn(wait)
  else wait.current = null
  host().waits.delete(wait); publish()
}
export function lowPriorityRetry(error: unknown, markedAtDispatch: boolean, querySource: string | undefined, wait: {current: unknown}): Waiting | null {
  const result = official.dUn(error, {markedAtDispatch, querySource, wait})
  if (result) host().waits.set(wait, result)
  else host().waits.delete(wait)
  publish()
  return result
}
/** Stop waits promptly on Ctrl+C, /low-priority off, account/session change or
 * expiry. The injectable sleeper is used only by the existing retry host/tests.
 */
export async function waitForLowPriorityCapacity(delayMs: number, signal: AbortSignal | undefined,
  sleep: (ms: number, signal: AbortSignal) => Promise<void>) {
  const controller = new AbortController()
  const abort = () => controller.abort()
  const unsubscribe = official.WIt(event => {if (event.type === 'ended') abort()})
  signal?.addEventListener('abort', abort, {once: true})
  try {
    if (signal?.aborted || !isOfficialLowPriorityActive()) throw new APIUserAbortError()
    await sleep(delayMs, controller.signal)
    if (signal?.aborted || !isOfficialLowPriorityActive()) throw new APIUserAbortError()
  } finally {unsubscribe(); signal?.removeEventListener('abort', abort)}
}
