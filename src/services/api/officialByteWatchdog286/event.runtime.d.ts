import type {ByteWatchdogClock286,ByteChunkTimes286} from './runtime.js'
export type EventWatchdogStatus286 = {kind: 'stalled'; deadline: number} | null
export declare function createOfficialEventHeartbeat286(zQ: ByteWatchdogClock286): {
 KMo<T extends {type: string}>(events: AsyncIterable<T>, bytes?: ByteChunkTimes286, interval?: number, clock?: ByteWatchdogClock286): AsyncGenerator<T | {type: 'ping'}, void>
 Ele(event: {type: string}): boolean
 RNt: number
 qMo: number
}
export declare function createOfficialEventWatchdog286(ports: {
 D: {model: string; onRetryStatus?: (status: EventWatchdogStatus286) => void}
 B: ByteWatchdogClock286
 lr?: ByteChunkTimes286
 ms: number
 ni?: string | null
 US(): void
 a: {readonly CLAUDE_ENABLE_STREAM_WATCHDOG?: boolean}
 He(): string
 kOt(): number
 uWn(provider: string): number
 t(message: string, options?: {level: 'warn' | 'error'}): void
 te(level: 'warn' | 'error', event: string): void
 i(event: string, data: Record<string, unknown>): void
 bt(model: string): unknown
 wf(requestId: string | null | undefined): unknown
 _(value: string): unknown
}): {
 MH(): void
 KA(): void
 setAdvisorActive(value: boolean): void
 readonly enabled: boolean
 readonly fired: boolean
 readonly firedAt: number | null
}
