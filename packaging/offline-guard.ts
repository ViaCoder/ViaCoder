// Verification never reads real credentials or starts network/subprocess clients.
import { Socket } from 'node:net'
import tls from 'node:tls'
import { Socket as DatagramSocket } from 'node:dgram'
import childProcess from 'node:child_process'
import { syncBuiltinESMExports } from 'node:module'
export function isIsolatedManagedPolicyRead(file: unknown, args: unknown, platform = process.platform): boolean {
  const reg = `${process.env.SYSTEMROOT || process.env.SystemRoot || 'C:\\Windows'}\\System32\\reg.exe`
  return platform === 'win32' && typeof file === 'string' && file.toLowerCase() === reg.toLowerCase() &&
    Array.isArray(args) && args.length === 4 && args[0] === 'query' && args[2] === '/v' && args[3] === 'Settings' &&
    ['HKLM\\SOFTWARE\\Policies\\ClaudeCode', 'HKCU\\SOFTWARE\\Policies\\ClaudeCode'].includes(args[1])
}
let attempts = 0
const deny = (): never => { attempts++; const error = Error('Release verification forbids network and external commands'); console.error(error.stack); throw error }
Socket.prototype.connect = deny as typeof Socket.prototype.connect
tls.connect = deny as typeof tls.connect
DatagramSocket.prototype.connect = deny as typeof DatagramSocket.prototype.connect
DatagramSocket.prototype.send = deny as typeof DatagramSocket.prototype.send
const originalFetch = globalThis.fetch
globalThis.fetch = Object.assign((input: Parameters<typeof fetch>[0], init?: RequestInit) => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url
  return url.startsWith('data:') ? originalFetch(input, init) : deny()
}, { preconnect: deny }) as typeof fetch
globalThis.WebSocket = class { constructor() { deny() } } as unknown as typeof WebSocket
Bun.connect = deny as typeof Bun.connect
Bun.spawn = deny as typeof Bun.spawn
Bun.spawnSync = deny as typeof Bun.spawnSync
for (const name of ['spawn', 'spawnSync', 'exec', 'execSync', 'execFileSync', 'fork'] as const) {
  Object.assign(childProcess, { [name]: deny })
}
// HOME cannot isolate machine-wide registry policy. Verification chooses the
// explicit absent-policy fixture without reading the host registry or spawning.
childProcess.execFile = ((...params: unknown[]) => {
  const callback = params.at(-1)
  if (!isIsolatedManagedPolicyRead(params[0], params[1]) || typeof callback !== 'function') return deny()
  queueMicrotask(() => callback(Object.assign(new Error('Isolated managed policy absent'), { code: 1 }), '', ''))
  return new childProcess.ChildProcess()
}) as typeof childProcess.execFile
syncBuiltinESMExports()
process.on('exit', () => { if (attempts) process.exitCode = 1 })
