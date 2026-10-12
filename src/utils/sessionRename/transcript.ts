import { dirname, join } from 'node:path'
import { atomicRenameWrite } from './jobs.js'
export type RenameEntry = { type: 'custom-title'; customTitle: string; sessionId: string } | { type: 'agent-name'; agentName: string; sessionId: string }
export interface RenameTranscript {
  getSessionId(): string
  materializedPath(): string | null
  transcriptPath(sessionId: string): string
  currentTitle(): string | undefined
  currentAgentName(): string | undefined
  cacheTitle(name: string): void
  cacheAgentName(name: string): void
  persistenceDisabled(): boolean
  append(path: string, entry: RenameEntry): Promise<void>
  logError(error: unknown): void
  metric(event: 'tengu_session_renamed' | 'tengu_agent_name_set', source: 'user' | 'remote' | 'hook'): void
}
export async function saveRenameTitle(storage: RenameTranscript, sessionId: string, name: string, path: string | undefined, source: 'user' | 'remote' | 'hook'): Promise<void> {
  const file = path ?? storage.transcriptPath(sessionId)
  await append(storage, file, { type: 'custom-title', customTitle: name, sessionId })
  if (!storage.persistenceDisabled()) {
    const sidecarTranscript = sessionId === storage.getSessionId() ? storage.transcriptPath(sessionId) : file
    await atomicRenameWrite(join(dirname(sidecarTranscript), sessionId, 'custom-title.json'), JSON.stringify({ customTitle: name }), true).catch(storage.logError)
  }
  if (sessionId === storage.getSessionId()) storage.cacheTitle(name)
  storage.metric('tengu_session_renamed', source)
}
export async function saveRenameAgent(storage: RenameTranscript, sessionId: string, name: string, path: string, source: 'user' | 'hook'): Promise<void> {
  await append(storage, path, { type: 'agent-name', agentName: name, sessionId })
  if (sessionId === storage.getSessionId()) storage.cacheAgentName(name)
  storage.metric('tengu_agent_name_set', source)
}
async function append(storage: RenameTranscript, path: string, entry: RenameEntry): Promise<void> {
  if (storage.persistenceDisabled()) return
  try { await storage.append(path, entry) }
  catch (error) {
    // Official as(): numeric errno is best effort, programmer/backend errors reject.
    if (typeof error === 'object' && error !== null && 'errno' in error && typeof error.errno === 'number') storage.logError(error)
    else throw error
  }
}
