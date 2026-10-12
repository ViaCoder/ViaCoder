import type {ByteWatchdogClock286} from './runtime.js'
export declare function createOfficialSlowResponseWarning286(ports: {
 B: ByteWatchdogClock286
 D: {model: string}
 rc(value: unknown): number
 t(message: string, options: {level: 'warn'}): void
 i(event: string, fields: Record<string, unknown>): void
 bt(model: string): unknown
 PA(): unknown
}): {start(startedAt: number, attempt: number): void; clear(): void}
