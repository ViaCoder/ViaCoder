import {APIUserAbortError} from '@anthropic-ai/sdk'
import {createOfficialRetrySleep286, type RetryWakeSubscription286} from './officialByteWatchdog286/retry.runtime.js'
import {streamWatchdogClock286, type ByteWatchdogClock286} from './streamWatchdog.js'

export type {RetryWakeSubscription286}
export function waitForRetry286(ms: number, options: {
  clock?: ByteWatchdogClock286
  signal?: AbortSignal
  subscribeRetryWake?: RetryWakeSubscription286
}): Promise<boolean> {
  return createOfficialRetrySleep286({zQ: streamWatchdogClock286, dd: APIUserAbortError}).LLt(ms, options)
}

/** PNt uses native Z (not the request retry-wake subscription) for stream replay. */
export function sleepForStreamRetry286(ms:number,signal:AbortSignal | undefined,clock:ByteWatchdogClock286):Promise<void> {
  return createOfficialRetrySleep286({zQ:streamWatchdogClock286,dd:APIUserAbortError}).Z(ms,signal,{clock})
}
