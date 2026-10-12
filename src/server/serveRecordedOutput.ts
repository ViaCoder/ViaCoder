import { isAbsolute } from 'node:path'
import { recordedOutputPaths, readRecordedOutput } from '../utils/transcriptOutput.js'
import { ServeConflict, ServeGone, type ServeEvent } from './serveSession.js'
import { findTranscriptHistory, transcriptHistoryWindow } from './serveTranscriptHistory.js'

type JournalSource = { replay(after: number, limit: number): ServeEvent[] }

/** Resolve a single raw source event, never a client-supplied filesystem path.
 * Display groups carry sourceEvents; callers select the member with the
 * persisted-output reference and pass that member's stable recordId. */
export async function sessionRecordedOutput(sessionId: string, recordId: string, index: number,
  journal?: JournalSource): Promise<{ recordId: string; index: number; content: string }> {
  if (!Number.isSafeInteger(index) || index < 0 || typeof recordId !== 'string')
    throw new ServeConflict('Invalid recorded output reference')
  const match = /^(journal|transcript):([0-9a-f-]{36}):([1-9]\d*)$/i.exec(recordId)
  if (!match || match[2] !== sessionId || !Number.isSafeInteger(Number(match[3])))
    throw new ServeConflict('Recorded output belongs to a different session or is not a source event')
  const seq = Number(match[3])
  let event: ServeEvent | undefined
  if (match[1] === 'journal') {
    if (!journal) throw new ServeConflict('Journal source is unavailable for this session')
    event = journal.replay(seq - 1, 1)[0]
  } else {
    const transcript = await findTranscriptHistory(sessionId)
    if (!transcript) throw new ServeConflict('Transcript source is unavailable for this session')
    event = (await transcriptHistoryWindow(sessionId, transcript.filePath,
      { after: seq - 1, limit: 1 })).events[0]
  }
  if (!event || event.seq !== seq || (event.recordId && event.recordId !== recordId))
    throw new ServeConflict('Source event was not found')
  const row = event.type === 'sdk' ? event.message : event.type === 'transcript_record' ? event.record : undefined
  const paths = recordedOutputPaths(row)
  const path = paths[index]
  if (!path || !isAbsolute(path)) throw new ServeConflict('Recorded output index is not registered by this source event')
  try { return { recordId, index, content: await readRecordedOutput(path) } }
  catch (error) {
    if ((error as NodeJS.ErrnoException)?.code === 'ENOENT') throw new ServeGone('Recorded output file is missing')
    if (error instanceof Error && error.message === 'Output reference is outside recorded session tool-results')
      throw new ServeConflict('Recorded output path is outside session tool-results')
    throw error
  }
}
