import type {StdoutMessage} from '../../entrypoints/sdk/controlTypes.js'

/** Shared contract implemented by the local SSE/WebSocket transports and
 * consumed by RemoteIO. Protocol-specific callbacks stay on their subclasses. */
export interface Transport {
  connect(): Promise<void>
  write(message: StdoutMessage): Promise<void>
  close(): void
  isConnectedStatus(): boolean
  isClosedStatus(): boolean
  setOnData(callback: (data: string) => void): void
  setOnClose(callback: (closeCode?: number) => void): void
}
