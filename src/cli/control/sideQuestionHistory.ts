import {BtwHistory} from '../../commands/btw/history.js'

/** Official NGt: SDK history is per-request, snake-case on wire. The actual
 * side-question runner consumes BtwHistory's exchange shape, but the SDK's
 * supplied turns are not appended to the process-global /btw history. */
export function sdkSideQuestionHistory(history: readonly {
  question: string
  response: string
  fallback_notice?: string
}[] | undefined): BtwHistory | undefined {
  if (!history?.length) return undefined
  const threaded = new BtwHistory()
  threaded.replace(history.map(entry => ({
    question: entry.question,
    response: entry.response,
    ...(entry.fallback_notice && {fallbackNotice: entry.fallback_notice}),
  })))
  return threaded
}
