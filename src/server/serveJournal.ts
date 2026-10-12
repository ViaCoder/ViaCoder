import { Database } from 'bun:sqlite'
import { chmodSync, lstatSync, mkdirSync, readdirSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import type { ServeEvent } from './serveSession.js'

export function serveJournalDirectory(): string {
  return join(process.env.CLAUDE_CONFIG_DIR ?? join(homedir(), '.claude'), 'web-serve')
}

/** Disk-backed event pages and idempotency index for one live CLI session. */
export class ServeJournal {
  private readonly db: Database
  private historyIndexesReady = false
  constructor(sessionId: string, baseDir = serveJournalDirectory()) {
    mkdirSync(baseDir, { recursive: true, mode: 0o700 })
    chmodSync(baseDir, 0o700)
    const file = join(baseDir, `${sessionId}.sqlite`)
    this.db = new Database(file, { create: true })
    chmodSync(file, 0o600)
    this.db.exec('PRAGMA journal_mode = WAL; CREATE TABLE IF NOT EXISTS events (seq INTEGER PRIMARY KEY, payload TEXT NOT NULL); CREATE TABLE IF NOT EXISTS operations (id TEXT PRIMARY KEY, fingerprint TEXT NOT NULL, result TEXT NOT NULL)')
  }
  append(event: ServeEvent): void {
    this.db.query('INSERT INTO events (seq, payload) VALUES (?, ?)').run(event.seq, JSON.stringify(event))
  }
  page(after: number, limit: number): ServeEvent[] {
    const rows = this.db.query('SELECT payload FROM events WHERE seq > ? ORDER BY seq LIMIT ?').all(after, limit) as Array<{ payload: string }>
    return rows.map(row => JSON.parse(row.payload) as ServeEvent)
  }
  /** Bounded witnesses for this transcript page, independent of its line cursor.
   * SQLite builds the indexes once; no journal replay or whole-log JSON parsing.
   * UUID aliases establish provenance before operation/request evidence is read. */
  historyEvidence(page: ServeEvent[], through: number, after = 0, limit = 500, liveTail: ServeEvent[] = []): {events:ServeEvent[];nextAfter:number;hasMore:boolean} {
    if (page.length > 500 || liveTail.length > 500 || !Number.isSafeInteger(limit) || limit < 1 || limit > 500)
      throw new Error('Invalid history evidence page size')
    if (!this.historyIndexesReady) {
      this.db.exec(`
        CREATE INDEX IF NOT EXISTS history_sdk_uuid ON events(json_extract(payload,'$.message.uuid'));
        CREATE INDEX IF NOT EXISTS history_stream_start ON events(json_extract(payload,'$.message.event.message.id'))
          WHERE json_extract(payload,'$.type')='sdk' AND json_extract(payload,'$.message.type')='stream_event'
            AND json_extract(payload,'$.message.event.type')='message_start';
        CREATE INDEX IF NOT EXISTS history_admission_uuid ON events(json_extract(payload,'$.messageUuid'));
        CREATE INDEX IF NOT EXISTS history_operation ON events(json_extract(payload,'$.executorGeneration'),json_extract(payload,'$.operationId'),json_extract(payload,'$.type'),json_extract(payload,'$.message.type'));
        CREATE INDEX IF NOT EXISTS history_request ON events(json_extract(payload,'$.executorGeneration'),json_extract(payload,'$.requestId'),json_extract(payload,'$.type'));
        CREATE INDEX IF NOT EXISTS history_permission_tool ON events(json_extract(payload,'$.executorGeneration'),json_extract(payload,'$.request.tool_use_id'),json_extract(payload,'$.type'));
      `)
      this.historyIndexesReady = true
    }
    const seeds = page.flatMap(event => {
      const frame = event.type === 'sdk' ? event.message as Record<string, any> : event.record as Record<string, any>
      if (!frame || typeof frame.uuid !== 'string' || frame.isSidechain === true && !frame.parent_tool_use_id && !frame.agent_id) return []
      const type = frame.type === 'system' && frame.subtype === 'local_command' ? 'assistant' : frame.type
      return type === 'user' || type === 'assistant' ? [{uuid:frame.uuid,type,parent:frame.parent_tool_use_id??null,agent:frame.agent_id??null}] : []
    })
    if (!seeds.length && !liveTail.length) return {events:[],nextAfter:after,hasMore:false}
    // All joins use exact persisted identities. SQLite may join many relevant
    // blocks, but only one bounded page is decoded in JS. Continuation is
    // independent of both the transcript line cursor and live-follow cursor.
    const rows = this.db.query(`
      WITH seeds AS (SELECT DISTINCT value AS key, json_extract(value,'$.uuid') AS uuid,
        json_extract(value,'$.type') AS type, json_extract(value,'$.parent') AS parent,
        json_extract(value,'$.agent') AS agent FROM json_each($seeds)),
      tail_turns AS (SELECT DISTINCT json_extract(e.payload,'$.executorGeneration') AS gen,
        json_extract(e.payload,'$.operationId') AS op,
        json_extract(e.payload,'$.message.parent_tool_use_id') AS parent,
        json_extract(e.payload,'$.message.agent_id') AS agent FROM json_each($tail) t JOIN events e ON e.seq=t.value
        WHERE e.seq <= $through AND json_extract(e.payload,'$.operationId') IS NOT NULL
          AND json_extract(e.payload,'$.type')='sdk'),
      active_turns AS (SELECT t.gen,t.op,t.parent,t.agent FROM tail_turns t WHERE NOT EXISTS (
        SELECT 1 FROM events e INDEXED BY history_operation
        WHERE json_extract(e.payload,'$.executorGeneration') IS t.gen AND json_extract(e.payload,'$.operationId')=t.op
          AND e.seq <= $through AND json_extract(e.payload,'$.type')='sdk'
          AND json_extract(e.payload,'$.message.type')='result'
          AND json_extract(e.payload,'$.message.parent_tool_use_id') IS t.parent
          AND json_extract(e.payload,'$.message.agent_id') IS t.agent
          AND json_extract(e.payload,'$.message.subtype')='success'
          AND json_extract(e.payload,'$.message.is_error')=0)),
      live_frames AS (SELECT e.seq,e.payload FROM active_turns t JOIN events e INDEXED BY history_operation
        ON json_extract(e.payload,'$.executorGeneration') IS t.gen AND json_extract(e.payload,'$.operationId')=t.op
        WHERE e.seq <= $through AND json_extract(e.payload,'$.type')='sdk'
          AND json_extract(e.payload,'$.message.parent_tool_use_id') IS t.parent
          AND json_extract(e.payload,'$.message.agent_id') IS t.agent
          AND json_extract(e.payload,'$.message.type') IN ('stream_event','assistant','user')),
      candidates AS MATERIALIZED (
        SELECT e.seq,e.payload,s.key FROM seeds s JOIN events e INDEXED BY history_sdk_uuid
          ON json_extract(e.payload,'$.message.uuid')=s.uuid
        WHERE e.seq <= $through AND json_extract(e.payload,'$.type')='sdk'
          AND json_extract(e.payload,'$.message.type')=s.type
          AND json_extract(e.payload,'$.message.parent_tool_use_id') IS s.parent
          AND json_extract(e.payload,'$.message.agent_id') IS s.agent),
      valid AS (SELECT key FROM candidates GROUP BY key HAVING count(DISTINCT json_array(
        json_extract(payload,'$.executorGeneration'),json_extract(payload,'$.operationId'),
        json_extract(payload,'$.message.message.id'))) = 1),
      matched AS MATERIALIZED (SELECT DISTINCT seq,payload FROM candidates WHERE key IN (SELECT key FROM valid)),
      stream_starts AS (SELECT DISTINCT e.seq,e.payload FROM matched m
        JOIN events e INDEXED BY history_stream_start
          ON json_extract(e.payload,'$.message.event.message.id')=json_extract(m.payload,'$.message.message.id')
        WHERE json_extract(m.payload,'$.message.type')='assistant'
          AND json_extract(e.payload,'$.type')='sdk' AND json_extract(e.payload,'$.message.type')='stream_event'
          AND json_extract(e.payload,'$.message.event.type')='message_start'
          AND json_extract(e.payload,'$.executorGeneration') IS json_extract(m.payload,'$.executorGeneration')
          AND json_extract(e.payload,'$.operationId') IS json_extract(m.payload,'$.operationId')
          AND json_extract(e.payload,'$.message.parent_tool_use_id') IS json_extract(m.payload,'$.message.parent_tool_use_id')
          AND json_extract(e.payload,'$.message.agent_id') IS json_extract(m.payload,'$.message.agent_id')
          AND e.seq <= m.seq),
      turns AS (SELECT DISTINCT json_extract(payload,'$.executorGeneration') AS gen,
        json_extract(payload,'$.operationId') AS op FROM matched WHERE json_extract(payload,'$.operationId') IS NOT NULL),
      tools AS (SELECT DISTINCT json_extract(m.payload,'$.executorGeneration') AS gen,
        json_extract(m.payload,'$.operationId') AS op,
        CASE json_extract(b.value,'$.type') WHEN 'tool_use' THEN json_extract(b.value,'$.id')
          WHEN 'tool_result' THEN json_extract(b.value,'$.tool_use_id') END AS id
        FROM matched m, json_each(CASE WHEN json_type(m.payload,'$.message.message.content')='array'
          THEN json_extract(m.payload,'$.message.message.content') ELSE '[]' END) b
        WHERE json_extract(b.value,'$.type') IN ('tool_use','tool_result')),
      requests AS MATERIALIZED (SELECT DISTINCT e.seq,e.payload FROM tools t
        JOIN events e INDEXED BY history_permission_tool
          ON json_extract(e.payload,'$.executorGeneration') IS t.gen
          AND json_extract(e.payload,'$.request.tool_use_id')=t.id
          AND json_extract(e.payload,'$.type')='permission_request'
        WHERE e.seq <= $through AND (json_extract(e.payload,'$.operationId') IS NULL
          OR json_extract(e.payload,'$.operationId')=t.op)),
      evidence AS (
        SELECT seq,payload FROM matched
        UNION SELECT seq,payload FROM stream_starts
        UNION SELECT seq,payload FROM live_frames
        UNION SELECT e.seq,e.payload FROM seeds s JOIN events e INDEXED BY history_admission_uuid
          ON json_extract(e.payload,'$.messageUuid')=s.uuid
          WHERE e.seq <= $through AND s.type='user' AND s.parent IS NULL AND s.agent IS NULL
            AND json_extract(e.payload,'$.type')='turn_queued'
        UNION SELECT seq,payload FROM requests
        UNION SELECT e.seq,e.payload FROM turns t JOIN events e INDEXED BY history_operation
          ON json_extract(e.payload,'$.executorGeneration') IS t.gen AND json_extract(e.payload,'$.operationId')=t.op
          WHERE e.seq <= $through AND json_extract(e.payload,'$.type') IN ('turn_interrupted','turn_completed')
        UNION SELECT e.seq,e.payload FROM turns t JOIN events e INDEXED BY history_operation
          ON json_extract(e.payload,'$.executorGeneration') IS t.gen AND json_extract(e.payload,'$.operationId')=t.op
          WHERE e.seq <= $through AND json_extract(e.payload,'$.type')='sdk' AND json_extract(e.payload,'$.message.type')='result'
        UNION SELECT e.seq,e.payload FROM requests r JOIN events e INDEXED BY history_request
          ON json_extract(e.payload,'$.executorGeneration') IS json_extract(r.payload,'$.executorGeneration')
          AND json_extract(e.payload,'$.requestId')=json_extract(r.payload,'$.requestId')
          WHERE e.seq <= $through AND json_extract(e.payload,'$.type') IN ('permission_cancelled','permission_resolved'))
      SELECT payload FROM evidence WHERE seq > $after ORDER BY seq LIMIT $limit
    `).all({$seeds:JSON.stringify(seeds),$tail:JSON.stringify(liveTail.map(event=>event.seq)),$through:through,$after:after,$limit:limit+1}) as Array<{payload:string}>
    const events=rows.slice(0,limit).map(row=>JSON.parse(row.payload) as ServeEvent)
    return {events,nextAfter:events.at(-1)?.seq??after,hasMore:rows.length>limit}
  }
  getOperation(id: string): { fingerprint: string; result: unknown } | undefined {
    const row = this.db.query('SELECT fingerprint, result FROM operations WHERE id = ?').get(id) as { fingerprint: string; result: string } | null
    return row ? { fingerprint: row.fingerprint, result: JSON.parse(row.result) } : undefined
  }
  putOperation(id: string, fingerprint: string, result: unknown): void {
    this.db.query('INSERT INTO operations (id, fingerprint, result) VALUES (?, ?, ?)').run(id, fingerprint, JSON.stringify(result))
  }
  close(): void { this.db.close() }
}

export function existingServeJournalIds(baseDir = serveJournalDirectory()): string[] {
  try { return readdirSync(baseDir).flatMap(file => {
    const match = /^([0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})\.sqlite$/i.exec(file)
    if (!match) return []
    const stat = lstatSync(join(baseDir, file))
    const uid = process.getuid?.()
    return stat.isFile() && (uid === undefined || stat.uid === uid) && !(stat.mode & 0o077) ? [match[1]!] : []
  }) }
  catch { return [] }
}
