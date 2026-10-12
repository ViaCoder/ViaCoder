import type {FetchRequestState286} from '../officialFetchRequestState286/runtime.js'
export type NativeFetchLifecycle287Ports = Readonly<{
  Id(callback: (id: string, reason: string) => void): (() => void) | {unsubscribe(): void}
  Ls(): FetchRequestState286
}>
export type NativeFetchLifecycle287 = () => (() => void) | {unsubscribe(): void}
export declare function createNativeFetchLifecycle287(ports: NativeFetchLifecycle287Ports): NativeFetchLifecycle287
