export type SSEFrame = { event?: string; id?: string; data?: string }
/** Runtime is the complete, byte-identical 2.1.283 chunk-qf5fbefx.js. */
export class Sbt {
  push(chunk: string | Uint8Array): SSEFrame[]
  flush(): SSEFrame[]
  buffered(): string
}
