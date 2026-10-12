import { randomUUID } from 'node:crypto'
import { createInterface } from 'node:readline'
import type { Readable, Writable } from 'node:stream'
import type { ServeEvent } from './serveSession.js'

export type AttachTerminalOptions = {
  url: string
  sessionId: string
  token?: string
  input?: Readable
  output?: Writable
}

/** Development text-only protocol client; not the full REPL rendering path. */
export async function attachTerminal(options: AttachTerminalOptions): Promise<void> {
  const base = new URL(options.url)
  if (!['http:', 'https:'].includes(base.protocol)) throw new Error('Expected HTTP service URL')
  if (!/^[0-9a-f-]{36}$/.test(options.sessionId)) throw new Error('Invalid session ID')
  const input = options.input ?? process.stdin
  const output = options.output ?? process.stdout
  const sessionPath = `/v1/sessions/${options.sessionId}`
  const headers: Record<string, string> = { 'content-type': 'application/json' }
  if (options.token) headers.authorization = `Bearer ${options.token}`
  const request = async (path: string, init: RequestInit = {}) => {
    const response = await fetch(new URL(path, base), { ...init, headers: { ...headers, ...init.headers } })
    if (!response.ok) throw new Error(`Session service HTTP ${response.status}: ${(await response.text()).slice(0, 200)}`)
    return response
  }
  // SDK streams and finals carry message IDs. Keep partial bytes per
  // message/block, not per turn: a later complete message or Agent final in
  // the same operation must never be suppressed by an earlier text delta.
  const streamedBlocks = new Map<string, Map<number, string>>()
  const activeStreamIds = new Map<string, string>()
  const activeBlockIndexes = new Map<string, number>()
  const sourceKey = (operationId: unknown, parent: unknown) => `${String(operationId)}:${typeof parent === 'string' ? parent : 'main'}`
  const streamLabel = (parent: unknown) => typeof parent === 'string' ? `Agent ${parent.slice(0, 8)}` : 'Main'
  const clearSource = (source: string) => {
    for (const key of streamedBlocks.keys()) if (key.startsWith(`${source}:`)) streamedBlocks.delete(key)
    activeStreamIds.delete(source)
    activeBlockIndexes.delete(source)
  }
  const render = (event: ServeEvent) => {
    if (event.type === 'turn_queued') {
      const content = typeof event.content === 'string' ? event.content :
        Array.isArray(event.content) ? event.content.map((part: any) => part?.type === 'text' ? part.text : part?.type==='local_file'?`[Attached file: ${String(part.title)}]`:`[${part?.type ?? 'attachment'}]`).join(' ') : ''
      output.write(`\n[${event.source === 'terminal' ? 'CLI' : 'Web'} queued ${event.operationId}] ${content}\n`)
    } else if (event.type === 'turn_started') {
      output.write(`\n[Running ${event.operationId}]\n`)
    } else if (event.type === 'turn_completed') {
      const prefix = `${String(event.operationId)}:`
      for (const key of streamedBlocks.keys()) if (key.startsWith(prefix)) streamedBlocks.delete(key)
      for (const key of activeStreamIds.keys()) if (key.startsWith(prefix)) activeStreamIds.delete(key)
      for (const key of activeBlockIndexes.keys()) if (key.startsWith(prefix)) activeBlockIndexes.delete(key)
      output.write(`\n[${event.isError ? 'Failed' : 'Completed'} ${event.operationId}]\n`)
    } else if (event.type === 'permission_resolved' || event.type === 'permission_cancelled') {
      output.write(`\n[Approval ${event.requestId} ${event.type === 'permission_resolved' ? 'answered' : 'cancelled'}]\n`)
    } else if (event.type === 'elicitation_request') {
      output.write(`\n[Input requested ${event.requestId}]\n`)
    } else if (event.type === 'elicitation_resolved' || event.type === 'elicitation_cancelled') {
      output.write(`\n[Input ${event.requestId} ${event.type === 'elicitation_resolved' ? 'answered' : 'cancelled'}]\n`)
    } else if (event.type === 'control_requested' || event.type === 'control_completed') {
      output.write(`\n[${event.type === 'control_requested' ? 'Control requested' : 'Control completed'} ${event.subtype}]\n`)
    } else if (event.type === 'transport_error') {
      output.write('\n[Session transport error]\n')
    } else if (event.type === 'sdk_ready') {
      output.write('\n[Worker ready]\n')
    } else if (event.type === 'session_started') {
      output.write('\n[Session started]\n')
    } else if (event.type === 'permission_request') {
      output.write(`\nApproval ${event.requestId}: ${event.toolName}. Use /approve ${event.requestId} or /deny ${event.requestId}.\n`)
    } else if (event.type === 'sdk') {
      const frame = event.message as { type?: string; parent_tool_use_id?: string | null;
        event?: { type?: string; index?: number; message?: { id?: string }; delta?: { type?: string; text?: string } };
        message?: { id?: string; content?: Array<{ type?: string; text?: string; name?: string }> };
        apiBlockIndex?: number; tool_name?: string; is_error?: boolean }
      const source = sourceKey(event.operationId, frame.parent_tool_use_id)
      if (frame?.type === 'stream_event' && frame.event?.type === 'message_start') {
        clearSource(source)
        if (frame.event.message?.id) activeStreamIds.set(source, frame.event.message.id)
      }
      if (frame?.type === 'stream_event' &&
        (frame.event?.type === 'content_block_start' || frame.event?.type === 'content_block_delta') &&
        Number.isSafeInteger(frame.event.index)) activeBlockIndexes.set(source, frame.event.index!)
      if (frame?.type === 'stream_event' && frame.event?.type === 'content_block_delta' && frame.event.delta?.type === 'text_delta' && frame.event.delta.text) {
        const messageId = activeStreamIds.get(source)
        if (messageId && Number.isSafeInteger(frame.event.index)) {
          const key = `${source}:${messageId}`
          const blocks = streamedBlocks.get(key) ?? new Map<number, string>()
          const index = frame.event.index!
          blocks.set(index, (blocks.get(index) ?? '') + frame.event.delta.text)
          streamedBlocks.set(key, blocks)
        }
        output.write(`\n[${streamLabel(frame.parent_tool_use_id)}] ${frame.event.delta.text}`)
      }
      if (frame?.type === 'assistant') {
        const key = `${source}:${frame.message?.id ?? ''}`
        const streamed = frame.message?.id ? streamedBlocks.get(key) : undefined
        const content = frame.message?.content ?? []
        // Installed SDK emits a one-block assistant final *before* each
        // content_block_stop, even when that block is index 1 or 2. It is
        // not the end of the message and its array index is always zero.
        const singleIndex = Number.isSafeInteger(frame.apiBlockIndex) ? frame.apiBlockIndex! : activeBlockIndexes.get(source) ?? 0
        for (const [arrayIndex, block] of content.entries()) {
          const index = content.length === 1 ? singleIndex : arrayIndex
          if (block.type === 'text' && block.text) {
            const prior = streamed?.get(index) ?? ''
            const rest = prior && block.text.startsWith(prior) ? block.text.slice(prior.length) : block.text
            if (rest) output.write(`\n[${streamLabel(frame.parent_tool_use_id)}] ${rest}\n`)
          }
          if (block.type === 'tool_use') output.write(`\n[${streamLabel(frame.parent_tool_use_id)} tool ${block.name ?? 'unknown'} started]\n`)
        }
      }
      if (frame?.type === 'stream_event' && frame.event?.type === 'message_stop') clearSource(source)
      if (frame?.type === 'result') clearSource(source)
      if (frame?.type === 'tool_progress') output.write(`\n[Tool ${frame.tool_name ?? 'running'} progress]\n`)
      if (frame?.type === 'result' && frame.is_error) output.write('\n[Worker reported an error]\n')
    } else if (event.type === 'process_exit') output.write('\nSession worker stopped.\n')
  }
  let cursor = 0
  for (;;) {
    const response = await request(`${sessionPath}/events?after=${cursor}&limit=500`)
    const page = await response.json() as { events?: ServeEvent[]; nextCursor?: number; hasMore?: boolean }
    if (!Array.isArray(page.events) || typeof page.hasMore !== 'boolean') throw new Error('Invalid session history page')
    for (const event of page.events) {
      if (!event || !Number.isSafeInteger(event.seq) || event.seq !== cursor + 1 || typeof event.type !== 'string') {
        throw new Error(`Session history gap or invalid event after sequence ${cursor}`)
      }
      render(event)
      cursor = event.seq
    }
    if (page.nextCursor !== cursor || (page.hasMore && page.events.length === 0)) throw new Error('Session history cursor mismatch')
    if (!page.hasMore) break
  }
  let stopping = false
  let fatal: Error | undefined
  let rl: ReturnType<typeof createInterface> | undefined
  let ws: WebSocket | undefined
  const fail = (error: Error) => {
    if (stopping || fatal) return
    fatal = error
    rl?.close()
    ws?.close()
  }
  const accept = (event: ServeEvent) => {
    if (!event || !Number.isSafeInteger(event.seq) || typeof event.type !== 'string') throw new Error('Invalid live session event')
    if (event.seq <= cursor) return // HTTP/WS replay can overlap.
    if (event.seq !== cursor + 1) throw new Error(`Live session event gap after sequence ${cursor}`)
    render(event)
    cursor = event.seq
  }
  const catchUp = async () => {
    for (;;) {
      const response = await request(`${sessionPath}/events?after=${cursor}&limit=500`)
      const page = await response.json() as { events?: ServeEvent[]; nextCursor?: number; hasMore?: boolean }
      if (!Array.isArray(page.events) || typeof page.hasMore !== 'boolean') throw new Error('Invalid session history page')
      for (const event of page.events) accept(event)
      if (page.nextCursor !== cursor || (page.hasMore && !page.events.length)) throw new Error('Session history cursor mismatch')
      if (!page.hasMore) break
    }
  }
  const followOnce = () => new Promise<void>((resolve) => {
    const wsUrl = new URL(`${sessionPath}/ws?after=${cursor}`, base)
    wsUrl.protocol = base.protocol === 'https:' ? 'wss:' : 'ws:'
    const socket = new WebSocket(wsUrl, [options.token ? `cc.serve.${options.token}` : 'cc.serve'])
    ws = socket
    socket.addEventListener('message', message => {
      try { accept(JSON.parse(String(message.data)) as ServeEvent) }
      catch { socket.close() } // Re-fetch the missing sequence before subscribing again.
    })
    socket.addEventListener('error', () => socket.close())
    socket.addEventListener('close', () => { if (ws === socket) ws = undefined; resolve() }, { once: true })
  })
  const follower = (async () => {
    while (!stopping) {
      try {
        await followOnce()
        if (!stopping) await catchUp()
      } catch (error) {
        if (!stopping && error instanceof Error && (/Session service HTTP (401|403|404|409|410)/.test(error.message) ||
          /Invalid session history|Session history cursor mismatch|Session history gap/.test(error.message))) {
          fail(error)
          break
        }
        if (!stopping) output.write(`\n[Reconnecting from sequence ${cursor}]\n`)
      }
      if (!stopping) await new Promise(resolve => setTimeout(resolve, 250))
    }
  })().catch(error => fail(error instanceof Error ? error : new Error(String(error))))
  output.write('Development text-only shared-session client (not full REPL). Type a message, /approve ID, /deny ID, or /quit.\n')
  rl = createInterface({ input, output, terminal: Boolean((input as any).isTTY && (output as any).isTTY) })
  if (fatal) rl.close()
  let pending: Promise<void> = Promise.resolve()
  try {
    for await (const line of rl) {
      const text = line.trim()
      if (!text) continue
      if (text === '/quit') break
      pending = pending.then(async () => {
        const approval = /^\/(approve|deny)\s+([\w.-]+)$/.exec(text)
        if (approval) {
          await request(`${sessionPath}/approvals`, { method: 'POST', body: JSON.stringify({
            operationId: randomUUID(), requestId: approval[2], allowed: approval[1] === 'approve',
          }) })
        } else {
          await request(`${sessionPath}/turns`, { method: 'POST', body: JSON.stringify({ operationId: randomUUID(), content: line, source: 'terminal' }) })
        }
      }).catch(error => { fail(error instanceof Error ? error : new Error(String(error))) })
    }
    await pending
  } finally {
    stopping = true
    rl.close()
    ws?.close()
    await follower
  }
  if (fatal) throw fatal
}
