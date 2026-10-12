import {realpathSync, statSync} from 'node:fs'
import {isAbsolute} from 'node:path'
import type {ServeDirectConnectConfig} from './serveDirectConnectManager.js'

/** Read-only facade context. Never continue/fork a worker or confer trust. */
export function sharedTuiDirectory(snapshot: unknown, sessionId: string, allowClosed = false): string {
  if (!snapshot || typeof snapshot !== 'object') throw Error('Invalid shared session context')
  const data = snapshot as {sessionId?: unknown; closed?: unknown; cwd?: unknown; executorState?: {status?: unknown}}
  const eligible = data.closed === false || allowClosed && data.closed === true && data.executorState?.status === 'closed'
  if (data.sessionId !== sessionId || !eligible || typeof data.cwd !== 'string' || !isAbsolute(data.cwd))
    throw Error('Active shared session directory was not confirmed')
  const directory = realpathSync(data.cwd)
  if (!statSync(directory).isDirectory()) throw Error('Shared session directory is unavailable on this host')
  return directory
}

/** Authenticated archived navigation only. Does not resume or grant trust. */
export async function readSharedResumeDirectory(config: Omit<ServeDirectConnectConfig, 'protocol'>): Promise<string | undefined> {
  const response = await fetch(new URL(`/v1/sessions/${config.sessionId}`, config.serverUrl), {
    headers: config.authToken ? {authorization: `Bearer ${config.authToken}`} : {},
    signal: AbortSignal.timeout(2000),
  })
  if (response.status === 404) return undefined
  if (!response.ok) throw Error(`Shared session context HTTP ${response.status}`)
  return sharedTuiDirectory(await response.json(), config.sessionId, true)
}

export async function readSharedTuiDirectory(config: Omit<ServeDirectConnectConfig, 'protocol'>): Promise<string> {
  const response = await fetch(new URL(`/v1/sessions/${config.sessionId}`, config.serverUrl), {
    headers: config.authToken ? {authorization: `Bearer ${config.authToken}`} : {},
    signal: AbortSignal.timeout(2000),
  })
  if (!response.ok) throw Error(`Shared session context HTTP ${response.status}`)
  return sharedTuiDirectory(await response.json(), config.sessionId)
}

export function assertSharedTuiDirectory(directory: string, currentDirectory: string): void {
  if (directory !== realpathSync(currentDirectory))
    throw Error(`Shared session belongs to ${directory}; start this frontend there so its setup and trust context match. No local executor started.`)
}
