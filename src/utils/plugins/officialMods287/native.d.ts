export type ModsPortName = "q" | "Ge" | "Ut" | "S" | "c" | "l" | "Ht" | "ee" | "yr" | "Von" | "ksn" | "YO" | "sTo" | "iTo" | "ixr" | "pce" | "HWn" | "jPr" | "WPr" | "aDt" | "Mxo" | "L6n" | "N6n" | "F6n" | "Pan" | "tOr" | "nOr" | "Mi" | "xi" | "qH" | "_t" | "t" | "_Y" | "y" | "m" | "p" | "Qs" | "ge" | "Lcn" | "ade" | "Ncn" | "Xye" | "Jye" | "Gr" | "coe" | "Wb" | "I9" | "O9" | "ab" | "cM" | "wH" | "xP" | "lpt" | "JPt" | "Yqe" | "k$" | "YJ" | "io"
export type ModsRuntimePorts = Record<ModsPortName, unknown>
export type WatchDecision = 'enable' | 'decline' | 'withdrawn' | 'retry' | 'no_one_to_ask'
export type ModsWatchPorts = {
  loaded: readonly string[]; quietMs: number
  watchRoot(folder: string, changed: () => void): {close(): Promise<void>}
  turn: {isRunning(): boolean; isPersonTurn(): boolean; onBegin(cb: () => void): () => void; onEnd(cb: () => void): () => void}
  clock: {setTimeout(cb: () => void, ms: number): () => void}
  listChildren(folder: string): Promise<string[] | undefined>
  refusal(): unknown
  ask(folder: string, signal: AbortSignal): Promise<WatchDecision>
  enable(folder: string): Promise<unknown>
  stopped(reason: 'refused' | 'enabled' | 'no_one_to_ask'): void
  deferred(): void; withdrawn(): void; unanswered(): void
}
export function createMods287(ports: ModsRuntimePorts): {
  initialize(): void
  expand(text: string, context: {isPreload?: boolean}): Promise<string>
  watch(folder: string, ports: ModsWatchPorts): {declined(): string[]; isClosed(): boolean; dispose(): Promise<void>}
}
