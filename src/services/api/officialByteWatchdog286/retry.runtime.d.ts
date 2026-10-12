import type {ByteWatchdogClock286} from './runtime.js'
export type RetryWakeSubscription286 = (wake: () => void) => () => void
export declare function createOfficialRetrySleep286(ports: {zQ: ByteWatchdogClock286; dd: new () => Error}): {
 Z(ms: number, signal?: AbortSignal, options?: {clock?: ByteWatchdogClock286; unref?: boolean; throwOnAbort?: boolean; abortError?: () => Error}): Promise<void>
 LLt(ms: number, options: {clock?: ByteWatchdogClock286; signal?: AbortSignal; subscribeRetryWake?: RetryWakeSubscription286}): Promise<boolean>
}
