import { startupArguments, STARTUP_ENV, CHECKPOINT_ENV, type ServeStartupOptions } from './serveStartupOptions.js'
import { resolve } from 'node:path'
import { desktopNativeFeatureArgs287 } from './desktopNativeFeatureArgs287.js'
import type { ServeTransport } from './serveSession.js'
import { getGlobalConfig } from '../utils/config.js'

// Bound one malformed/unterminated JSON frame, not the total output from a
// worker. A read() chunk may legitimately contain many small SDK frames.
const MAX_FRAME_BYTES = 16 * 1024 * 1024

/** Stdio adapter for the existing -p stream-json execution path. No model loop here. */
export class StdioServeTransport implements ServeTransport {
  private process: ReturnType<typeof Bun.spawn> | null = null
  private started = false
  private closed = false
  private readonly command: string[]
  private readonly cwd: string
  private readonly env: Record<string, string | undefined>

  constructor(command: string[], options: { cwd: string; env?: Record<string, string | undefined> }) {
    if (command.length === 0) throw new Error('Missing CLI command')
    this.command = command
    this.cwd = options.cwd
    this.env = options.env ?? process.env
  }

  start(onFrame: (frame: unknown) => void, onExit: (code: number | null) => void): void {
    if (this.started) throw new Error('Transport already started')
    this.started = true
    const child = Bun.spawn(this.command, {
      cwd: this.cwd, env: this.env, stdin: 'pipe', stdout: 'pipe', stderr: 'pipe',
    })
    this.process = child
    const readStdout = async () => {
      const reader = child.stdout.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      try {
        for (;;) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          for (;;) {
            const end = buffer.indexOf('\n')
            if (end < 0) break
            const line = buffer.slice(0, end)
            buffer = buffer.slice(end + 1)
            if (!line.trim()) continue
            if (line.length > MAX_FRAME_BYTES) throw new Error('CLI frame exceeds limit')
            let frame: unknown
            try { frame = JSON.parse(line) }
            catch { throw new Error('CLI emitted invalid stream-json') }
            onFrame(frame)
          }
          if (buffer.length > MAX_FRAME_BYTES) throw new Error('CLI frame exceeds limit')
        }
        if (buffer.trim()) throw new Error('CLI stream ended with partial JSON frame')
      } finally {
        reader.releaseLock()
      }
    }
    // Stderr is not exposed to Web clients; drain it so a chatty CLI cannot
    // block on a full pipe. The exit status still signals a failed worker.
    const drainStderr = async () => {
      const reader = child.stderr.getReader()
      try { for (;;) { if ((await reader.read()).done) break } }
      finally { reader.releaseLock() }
    }
    void (async () => {
      let code: number | null = null
      try {
        const [, exitCode] = await Promise.all([readStdout(), child.exited, drainStderr()])
        code = exitCode
      } catch {
        child.kill()
      } finally {
        this.closed = true
        onExit(code)
      }
    })()
  }

  async write(frame: Record<string, unknown>): Promise<void> {
    if (!this.process || this.closed) throw new Error('CLI worker is closed')
    const stdin = this.process.stdin
    if (typeof stdin === 'number') throw new Error('CLI worker stdin is not piped')
    const bytes = JSON.stringify(frame) + '\n'
    await stdin.write(bytes)
    await stdin.flush()
  }

  async close(): Promise<void> {
    if (!this.process || this.closed) return
    this.closed = true
    const stdin = this.process.stdin
    if (typeof stdin !== 'number') stdin.end()
    this.process.kill()
    await this.process.exited
  }
}

export function existingHeadlessCliCommand(sessionId: string, resumeFrom?: string, startup?: ServeStartupOptions): string[] {
  const root = resolve(import.meta.dir, '../..')
  return [process.execPath,
    '--no-env-file', '--feature=TRANSCRIPT_CLASSIFIER', ...desktopNativeFeatureArgs287(), `--config=${resolve(root, 'packaging/runtime.bunfig.toml')}`,
    '--preload', resolve(root, 'preload.ts'), resolve(root, 'src/entrypoints/cli.tsx'),
    '-p', '--verbose', '--input-format=stream-json', '--output-format=stream-json',
    '--permission-prompt-tool', 'stdio', '--include-partial-messages', '--forward-subagent-text',
    '--allow-dangerously-skip-permissions', // Offer an explicit later choice; do not select bypass on startup.
    ...startupArguments(startup),
    ...(resumeFrom ? ['--resume', resumeFrom] : []),
    ...(resumeFrom && resumeFrom !== sessionId ? ['--fork-session'] : []),
    ...(resumeFrom === sessionId ? [] : ['--session-id', sessionId])]
}

export function createExistingHeadlessCliTransport(sessionId: string, cwd: string,
  env: Record<string, string | undefined> = process.env, resumeFrom?: string, startup?: ServeStartupOptions): StdioServeTransport {
  const workerEnv={...env}
  if(startup){
    for(const key of STARTUP_ENV)if(!CHECKPOINT_ENV.some(checkpoint => checkpoint === key))delete workerEnv[key]
    Object.assign(workerEnv,startup.env)
  }
  // Shared sessions replace an interactive CLI. Enable its existing file
  // checkpoints in this SDK child while respecting explicit user settings.
  // Ordinary standalone -p/SDK defaults remain unchanged.
  workerEnv.CLAUDE_CODE_ENABLE_SDK_FILE_CHECKPOINTING ??=
    getGlobalConfig().fileCheckpointingEnabled === false ? '0' : '1'
  return new StdioServeTransport(existingHeadlessCliCommand(sessionId, resumeFrom, startup), { cwd, env:workerEnv })
}
