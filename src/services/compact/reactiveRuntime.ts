import { isPrecomputeCompactEnabled } from './gates.js'
import { randomUUID } from 'node:crypto'
import { getContextWindowForModel } from '../../utils/context.js'
import { getSdkBetas } from '../../bootstrap/state.js'
import { createOfficialCompact } from './official/compact.js'
import { createReactiveCompact287 } from './officialReactive287/native.js'
import { getExecutionSession287 } from '../context/execution287.js'
import { runForkedAgent } from '../../utils/forkedAgent.js'
import { createUserMessage, getMessagesAfterCompactBoundary, getLastAssistantMessage, getAssistantMessageText, isCompactBoundaryMessage } from '../../utils/messages.js'
import { getTranscriptPath, cleanMessagesForLogging } from '../../utils/sessionStorage.js'
import { tokenCountWithEstimation } from '../../utils/tokens.js'
import { roughTokenCountEstimationForMessages } from '../tokenEstimation.js'
import { isPromptTooLongMessage, isMediaSizeErrorMessage, getPromptTooLongTokenGap } from '../api/errors.js'
import { getFeatureValue_CACHED_MAY_BE_STALE } from '../analytics/growthbook.js'
import { logEvent } from '../analytics/index.js'
import { logForDebugging } from '../../utils/debug.js'
import { logError } from '../../utils/log.js'

/** Host boundary only; the retry ladder, media stripping, split selection,
 * summary selection/formatting and precompute validation are official bodies.
 * See OFFICIAL_RECOVERY.md for the remaining fork and storage interfaces. */
export function createCompactHost(overrides: Record<string, unknown> = {}) {
  return {
    ra: getMessagesAfterCompactBoundary,
    vm: roughTokenCountEstimationForMessages,
    Zh: tokenCountWithEstimation,
    ke: createUserMessage,
    fv: runForkedAgent,
    ty: getLastAssistantMessage,
    MO: getAssistantMessageText,
    Tfe: isPromptTooLongMessage,
    Q7: isMediaSizeErrorMessage,
    wTt: getPromptTooLongTokenGap,
    // The local build has no credits-boundary entitlement service. Ordinary
    // prompt-too-long and media errors are still classified by official logic.
    fut: () => false,
    // Official IFe compares context windows, not model-name equality.
    IFe: (a: string, b: string) => getContextWindowForModel(b, getSdkBetas()) < getContextWindowForModel(a, getSdkBetas()),
    xd: getTranscriptPath,
    B: (items: unknown[], predicate: (item: unknown) => boolean) => items.filter(predicate).length,
    d1: JSON.stringify,
    Ta: isCompactBoundaryMessage,
    // Keep local transcript filtering, including its historical customizations.
    tVe: cleanMessagesForLogging,
    Abn: randomUUID, Rbn: randomUUID,
    // The local message pipeline renders attachments on demand, not into the
    // official rendered/renderedInHumanTurn cache fields. Roe removes stale fields.
    zZt: () => ({}),
    x: getFeatureValue_CACHED_MAY_BE_STALE,
    W$: isPrecomputeCompactEnabled,
    i: logEvent, t: logForDebugging, d: logError,
    l: (error: unknown) => error instanceof Error ? error.message : String(error),
    Yq: () => false,
    c: (v: unknown) => v, ue: (v: unknown) => v, us: (v: unknown) => v, y: (v: unknown) => v,
    ...overrides,
  }
}

export function createCompactKernel(overrides: Record<string, unknown> = {}) {
  return createOfficialCompact(createCompactHost(overrides))
}

/** Recovered 287 summarization body. Transport/message construction retain
 * their actual application owners; attachment rendering remains local C. */
export function createReactiveKernel287(overrides: Record<string, unknown> = {}) {
  return createReactiveCompact287(createReactiveHost287(overrides))
}

export function createReactiveHost287(overrides: Record<string, unknown> = {}) {
  const host = createCompactHost(overrides)
  const source = (file: string, name: string): unknown => {
    const {getOriginalModsLifecycle287} = require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')
    return getOriginalModsLifecycle287().clearLifecycleSource287(file, name)
  }
  return {
    Hee: host.Q7, IC: host.fv, Khe: host.Tfe,
    OMt: host.zZt, Re: host.ke, SHt: host.wTt,
    ai: host.ra, au: host.xd, tM: host.MO, t_: host.ty, ug: host.vm,
    S: host.y, c: host.c, me: host.ue, d: host.d, i: host.i, l: host.l, t: host.t,
    k: host.x,
    n: getExecutionSession287,
    Qp: source('chunk-bn3p37gv.js', 'Qp'),
    pf: source('chunk-nankzm0s.js', 'pf'),
  }
}
