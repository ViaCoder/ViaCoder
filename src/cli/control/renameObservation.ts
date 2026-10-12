import type {RenameTranscript} from '../../utils/sessionRename/transcript.js'
import {readSessionLite} from '../../utils/sessionStoragePortable.js'

/** Observe records, not nested fields or whitespace-pattern precedence. A tail
 * window may begin inside a record; only complete matching rows count. */
function lastPersistedTitle(text: string, sessionId: string): string | undefined {
  for (const line of text.split('\n').reverse()) {
    try {
      const row: unknown = JSON.parse(line)
      if (row && typeof row === 'object' && 'type' in row && row.type === 'custom-title' &&
        'sessionId' in row && row.sessionId === sessionId && 'customTitle' in row && typeof row.customTitle === 'string')
        return row.customTitle
    } catch { /* Partial tail row or malformed metadata is not evidence. */ }
  }
  return undefined
}

/** Local Web observation only. No title writer or expected-name promotion. */
export type LocalSessionTitleState = {
  session_id: string
  revision: number
  status: 'unobserved' | 'pending' | 'settled' | 'failed'
  persistence: 'persisted' | 'memory_only' | 'disabled'
  title?: string
  name?: string
  requested_title?: string
  error?: string
}
export function observeRenamePersistence(source: RenameTranscript) {
  let id = source.getSessionId(), revision = 0, pending = 0, observed = false
  let title: string | undefined, name: string | undefined, requested: string | undefined, error: string | undefined
  function current() {
    if (id !== source.getSessionId()) {
      id = source.getSessionId(); revision++; pending = 0; observed = false
      title = name = requested = error = undefined
    }
    return id
  }
  function fail(value: unknown, sessionId = current()) {
    if (current() !== sessionId) return
    error = value instanceof Error ? value.message : String(value); revision++
  }
  const storage: RenameTranscript = {
    ...source,
    async append(path, entry) {
      try {
        await source.append(path, entry)
        if (entry.sessionId === current() && entry.type === 'custom-title') {
          title = entry.customTitle; revision++
        }
      } catch (cause) { fail(cause, entry.sessionId); throw cause }
    },
    logError(cause) {fail(cause); source.logError(cause)},
  }
  function snapshot(): LocalSessionTitleState {
    current()
    return {session_id: id, revision,
      status: pending ? 'pending' : error ? 'failed' : observed ? 'settled' : 'unobserved',
      persistence: source.persistenceDisabled() ? 'disabled' : title !== undefined ? 'persisted' : 'memory_only',
      ...(title !== undefined ? {title} : {}), ...(name !== undefined ? {name} : {}),
      ...(requested !== undefined ? {requested_title: requested} : {}), ...(error !== undefined ? {error} : {})}
  }
  return {
    storage,
    begin(value: string) {current(); observed = true; requested = value; error = undefined; revision++},
    fail,
    committedName(value: string, sessionId: string) {if (current() === sessionId) {name = value; revision++}},
    work() {
      const sessionId = current(); pending++; revision++
      return () => {if (current() === sessionId) {pending--; revision++}}
    },
    async snapshot(): Promise<LocalSessionTitleState> {
      const sessionId = current(), before = revision, path = source.materializedPath()
      // Explicit query only. Reuse the transcript metadata reader to observe a
      // cached title after the ordinary first-turn materializer writes it.
      if (path && title === undefined && !source.persistenceDisabled()) {
        const file = await readSessionLite(path)
        if (file && sessionId === current() && before === revision) {
          const persisted = lastPersistedTitle(file.tail, sessionId) ?? lastPersistedTitle(file.head, sessionId)
          if (persisted !== undefined && title !== persisted) {title = persisted; observed = true; revision++}
        }
      }
      return snapshot()
    },
  }
}
