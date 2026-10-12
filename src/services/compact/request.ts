import { isFirstPartyRequestEndpoint } from '../../utils/model/providers.js'
import { getNativeAPIProvider287 } from '../../utils/model/providerSelectionBindings287.js'
import { areRequestHintHeadersEnabled } from '../api/requestHeaders.js'
import { createCompactHeaders287 } from '../api/officialInterfaceHeaders287/native.js'
import type { Message } from '../../types/message.js'
import { createReactiveKernel287 } from './reactiveRuntime.js'

/** Official fv / nDt request options; these are not serialized as body fields. */
export interface CompactRequestOptions {
  compactionRequestKind?: string
  thinkingStripPlan?: ReadonlyMap<string, number>
  advisorStripPlan?: ReadonlySet<string>
  skipMessageCacheMarkers?: boolean
}
let wire287:ReturnType<typeof createReactiveKernel287> | undefined
const wire=()=>wire287??=createReactiveKernel287()
/** Apply original 287 F_r then o_ AFTER API normalization. Read plans before attachment
 * normalization removes marker rows; never rewrite stored transcript messages. */
export function getCompactStripPlans(messages: Message[], options: CompactRequestOptions) {
  const core=wire()
  return {thinking: core.gLe(options.thinkingStripPlan, core.nV(messages)),
    advisor: core.mLe(options.advisorStripPlan, core.jO(messages))}
}
export function applyCompactStripPlans<T extends Message>(messages: T[], plans: ReturnType<typeof getCompactStripPlans>): T[] {
  const core=wire()
  const thinking = plans.thinking.size ? core.F_r(messages, plans.thinking) : messages
  return plans.advisor.size ? core.o_(thinking, plans.advisor) : thinking
}

const applyCompactHeaders287 = createCompactHeaders287({
  He: getNativeAPIProvider287, Js: isFirstPartyRequestEndpoint,
  rdn: areRequestHintHeadersEnabled,
})
/** Complete 287 ojt; triBool hints come from the existing gateway owner. */
export function getCompactRequestHeaders(kind?: string): Record<string, string> {
  const headers: Record<string, string> = {}
  applyCompactHeaders287(headers, undefined, kind)
  return headers
}
