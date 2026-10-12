export function checkAppleTerminalBell(host: {
  Ke: (file: string, args: string[]) => Promise<{stdout: string; code: number}>
  t: (message: string, options?: {level: 'error'}) => void
}): Promise<boolean>
