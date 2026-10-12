// Contracts for the pinned 2.1.283 desktop chunks and their hash-checked NAPI
// bindings. These are local descriptions of the exports actually consumed by
// this checkout, not declarations for an independently installed @ant package.
// Literal modes in both fixed 283 and 287 public builders/binders.
export type CoordinateMode = 'pixels' | 'normalized_0_100'

export type CuSubGates = {
  pixelValidation: boolean
  clipboardPasteMultiline: boolean
  mouseAnimation: boolean
  hideBeforeAction: boolean
  autoTargetDisplay: boolean
  clipboardGuard: boolean
}

export type CuGrantFlags = {
  clipboardRead: boolean
  clipboardWrite: boolean
  systemKeyCombos: boolean
}

export type AppGrant = {
  bundleId: string
  displayName: string
  grantedAt: number
}

export type CuPermissionRequest = {
  apps: readonly {
    requestedName: string
    alreadyGranted?: boolean
    resolved?: { bundleId: string; displayName: string }
  }[]
  requestedFlags: Partial<CuGrantFlags>
  tccState?: { accessibility: boolean; screenRecording: boolean }
  reason?: string
  willHide?: readonly string[]
}

export type CuPermissionResponse = {
  granted: AppGrant[]
  denied: { bundleId: string; reason: 'user_denied' | 'not_installed' }[]
  flags: CuGrantFlags
}

export type ScreenshotDims = {
  width: number
  height: number
  displayWidth: number
  displayHeight: number
  displayId: number
  originX: number
  originY: number
}

export type CuCallToolResult = {
  content: ({ type: 'text'; text: string } | { type: 'image'; data: string; mimeType?: string })[]
  isError?: boolean
  telemetry?: { error_kind?: string }
}

export interface Logger {
  silly(message: string, ...args: unknown[]): void
  debug(message: string, ...args: unknown[]): void
  info(message: string, ...args: unknown[]): void
  warn(message: string, ...args: unknown[]): void
  error(message: string, ...args: unknown[]): void
}

export type ComputerUseInputAPI = {
  key(name: string, action: 'press' | 'release'): Promise<void>
  keys(names: string[]): Promise<void>
  typeText(text: string): Promise<void>
  moveMouse(x: number, y: number, animate: boolean): Promise<void>
  mouseLocation(): Promise<{ x: number; y: number }>
  mouseButton(button: string, action: string, clicks?: number): Promise<void>
  mouseScroll(amount: number, direction: 'vertical' | 'horizontal'): Promise<void>
  getFrontmostAppInfo(): { bundleId?: string; appName?: string } | null
}

export type ComputerUseInput = { isSupported: true } & ComputerUseInputAPI

export type ComputerUseAPI = {
  tcc: {
    checkAccessibility(): boolean
    checkScreenRecording(): boolean
  }
  hotkey: {
    registerEscape(callback: () => void): boolean
    unregister(): void
    notifyExpectedEscape(): void
  }
  _drainMainRunLoop(): void
}
