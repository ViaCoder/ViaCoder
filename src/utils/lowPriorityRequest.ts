import {AsyncLocalStorage} from 'node:async_hooks'

// Headers follow an individual SDK operation, including parallel subagents;
// never use a process-global "last response" for quota/state observations.
export type LowPriorityAttempt = {headers?: Headers; markedAtDispatch?: boolean}
const attempts = new AsyncLocalStorage<LowPriorityAttempt>()
export function withLowPriorityAttempt<T>(attempt: LowPriorityAttempt, operation: () => Promise<T>): Promise<T> {
  return attempts.run(attempt, operation)
}
export function captureLowPriorityResponse(headers: Headers, marked: boolean) {
  const attempt = attempts.getStore()
  if (attempt) { attempt.headers = headers; attempt.markedAtDispatch = marked }
}
