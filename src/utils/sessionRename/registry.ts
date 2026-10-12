/** Filesystem public host for $ut/AE/f$/zt/G4/rc (official npm 2.1.283).
 * One instance per CLI host. Do not run the legacy PID writer alongside it.
 */
import {startupProcessPorts287} from '../startupProcessPorts287.js'
import { randomBytes } from 'node:crypto'
import { chmod, mkdir, open, readdir, readFile, unlink, writeFile } from 'node:fs/promises'
import { basename, join } from 'node:path'
import { createSignal } from '../signal.js'
import { cleanTitle, nameKey, type LiveName, type NameRegistry, type NameSource, type RegisteredName } from './names.js'

export function createProcessProbe() {
  const cache = new Map<number, { at: number; promise: Promise<string | undefined>; miss?: boolean }>()
  return {
    alive(pid: number): boolean { if (pid <= 1) return false; try { process.kill(pid, 0); return true } catch { return false } },
    async start(pid: number): Promise<string | undefined> {
      const old = cache.get(pid), now = Date.now()
      if (old && now - old.at < (old.miss ? 5000 : 60000)) return old.promise
      const promise = new Promise<string | undefined>(resolve => {
        try {
          startupProcessPorts287.processIdentity('ps', ['-o', 'lstart=', '-p', String(pid)], {
            timeout: 1000, env: { ...process.env, LC_ALL: 'C', TZ: 'UTC' },
          }, (error, stdout) => resolve(!error && stdout ? stdout.trim() : undefined))
        } catch { resolve(undefined) }
      })
      const entry: { at: number; promise: Promise<string | undefined>; miss?: boolean } = { at: now, promise }
      cache.set(pid, entry)
      const result = await promise
      if (result === undefined && cache.get(pid) === entry) entry.miss = true
      return result
    },
  }
}
export type RegistryOptions = {
  configDir: string
  getSessionId: () => string
  getCwd: () => string
  logError: (error: unknown) => void
  /** The real ud()/parked gate; must be supplied by boot, not guessed from -p. */
  shouldRegister: () => boolean
  /** Optional REAL boot registration promise. Preserve its PID-record fields. */
  existingRegistration?: Promise<boolean>
  /** Production's sole PID writer, shared with bridge/activity/switch/cleanup. */
  writePidPatch?: (patch: Record<string, unknown> | ((current: Record<string, unknown>) => Record<string, unknown>)) => Promise<boolean>
  env?: Partial<Pick<NodeJS.ProcessEnv, 'CLAUDE_CODE_SESSION_KIND' | 'CLAUDE_CODE_SESSION_NAME' | 'CLAUDE_CODE_ENTRYPOINT' | 'CLAUDE_JOB_DIR'>>
  /** Snapshot of the official session-pinned flag (default false). */
  stableAddress?: boolean
  pid?: number
  probe?: ReturnType<typeof createProcessProbe>
  canonicalState?:Record<string,any>
  /** Actual canonical b/F/Iw host state; fixture-only fallback is separate. */
  canonicalNameState?:Record<string,any>
  now?: () => number
}
type FormerName = { name: string; until: number; sessionId: string }
export class LocalRenameRegistry implements NameRegistry {
  readonly changed!:ReturnType<typeof createSignal>
  readonly pid: number
  current: RegisteredName | undefined
  // Original GH stale-restore epochs, on this same PID/name registration.
  adoptions!:number
  restores!:number
  yieldHistory?:{base:string;name:string}
  userTypedName?:string
  pendingYield:[string,string]|undefined
  readonly yielded!:ReturnType<typeof createSignal<[string,string]>>
  announceYield(name:string,previous:string):void {
    if(this.options.canonicalNameState){this.options.canonicalNameState.announceYield(name,previous);return}
    this.pendingYield=[name,previous];this.yielded.emit(name,previous)
  }

  formerNames!: FormerName[]
  readonly heldNames!: Map<string, NameSource>
  private registration?: Promise<boolean>
  private registered = false
  private writeChain: Promise<unknown> = Promise.resolve()
  private readonly probe: ReturnType<typeof createProcessProbe>
  private readonly directory: string
  private readonly file: string
  private readonly now: () => number
  constructor(private readonly options: RegistryOptions) {
    // Local onSessionSwitch carries only an ID, not official Oy(reason). Do not
    // silently approximate stable-address adoption/gae restoration with renames.
    if (options.stableAddress) throw new Error('rename_session: stable-address adoption/restore host is not available')
    if (process.platform === 'win32') throw new Error('rename_session: Windows process-identity host is not supported by this raw-fs adapter')
    if(!options.canonicalState){this.changed=createSignal();this.adoptions=0;this.restores=0;this.formerNames=[];this.heldNames=new Map()}
    if(!options.canonicalNameState)this.yielded=createSignal<[string,string]>()
    if(options.canonicalNameState){
      const owner=options.canonicalNameState
      for(const [field,source] of Object.entries({yieldHistory:'lastYield',userTypedName:'userTypedName',yielded:'yielded',pendingYield:'pendingYield'}))Object.defineProperty(this,field,{get:()=>owner[source],set:value=>{owner[source]=value},configurable:true})
    }
    if(options.canonicalState){
      const owner=options.canonicalState
      for(const [field,source] of Object.entries({changed:'registeredNameChanged',current:'registeredName',formerNames:'formerNames',heldNames:'heldNames',adoptions:'adoptions',restores:'restores'}))Object.defineProperty(this,field,{get:()=>owner[source],set:value=>{owner[source]=value},configurable:true})
    }
    this.pid = options.pid ?? process.pid
    this.directory = join(options.configDir, 'sessions')
    this.file = join(this.directory, `${this.pid}.json`)
    this.probe = options.probe ?? createProcessProbe()
    this.now = options.now ?? Date.now
  }
  private derivedName(): string {
    const base = basename(this.options.getCwd()).replace(/\[(?:Pasted text #\d+(?: \+\d+ lines)?|Image #\d+|Audio #\d+|\.\.\.Truncated text #\d+ \+\d+ lines\.\.\.)\]/g, ' ')
      .split(/\s+/).filter(Boolean).slice(0, 4).join(' ').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40).replace(/^-+|-+$/g, '') || 'claude'
    return `${base}-${randomBytes(1).toString('hex')}`
  }
  register(): Promise<boolean> {
    if (this.registration) return this.registration
    this.registration = this.registerOnce()
    if (!this.options.writePidPatch) this.writeChain = this.registration.then(() => undefined)
    return this.registration
  }
  whenRegistered(): Promise<boolean> { return this.registration ?? Promise.resolve(this.registered) }
  private async registerOnce(): Promise<boolean> {
    if (!this.options.shouldRegister()) return false
    try {
      let existing: Record<string, unknown> = {}
      if (this.options.existingRegistration !== undefined) {
        if (!await this.options.existingRegistration) return false
        if (!this.options.writePidPatch) {
          const record: unknown = JSON.parse(await readFile(this.file, 'utf8'))
          if (!record || typeof record !== 'object' || Array.isArray(record)) throw new Error('invalid existing session registry record')
          existing = record as Record<string, unknown>
        }
      }
      const env = this.options.env ?? {}, kind = ['bg', 'daemon', 'daemon-worker'].includes(env.CLAUDE_CODE_SESSION_KIND ?? '') ? env.CLAUDE_CODE_SESSION_KIND! : 'interactive'
      const launchName = env.CLAUDE_CODE_SESSION_NAME ? cleanTitle(env.CLAUDE_CODE_SESSION_NAME) : undefined
      await mkdir(this.directory, { recursive: true, mode: 0o700 }); await chmod(this.directory, 0o700)
      const procStart = await this.probe.start(this.pid)
      let name: string | undefined, source: NameSource = 'derived'
      const patchFor = (latest: Record<string, unknown>) => {
        const effectiveKind = latest.kind === 'interactive' || latest.kind === 'bg' || latest.kind === 'daemon' || latest.kind === 'daemon-worker'
          ? latest.kind : kind
        // Resolve the name *inside* the sole writer's transaction: an early
        // legacy update may have queued after baseline registration.
        const priorName = typeof latest.name === 'string' ? cleanTitle(latest.name) : undefined
        name = launchName || priorName || (effectiveKind === 'interactive' ? this.derivedName() : undefined)
        const priorSource = latest.nameSource
        source = launchName ? 'user' : priorName
          ? (priorSource === 'user' || priorSource === 'peer' || priorSource === 'hook' || priorSource === 'collision' || priorSource === 'auto' || priorSource === 'derived' ? priorSource : 'user')
          : 'derived'
        return {pid: this.pid, sessionId: this.options.getSessionId(), cwd: this.options.getCwd(),
          startedAt: timestamp(latest.startedAt) ?? this.now(),
          ...(procStart !== undefined ? {procStart} : {}), version: '2.1.287', kind: effectiveKind,
          ...(env.CLAUDE_CODE_ENTRYPOINT !== undefined ? {entrypoint: env.CLAUDE_CODE_ENTRYPOINT} : {}),
          name, nameSource: name ? source : undefined,
          nameSince: priorName && !launchName ? timestamp(latest.nameSince) ?? this.now() : this.now(),
          ...(effectiveKind === 'bg' && env.CLAUDE_JOB_DIR ? {jobId: basename(env.CLAUDE_JOB_DIR)} : {})}
      }
      if (this.options.writePidPatch) {
        if (!await this.options.writePidPatch(patchFor)) return false
      } else await writeFile(this.file, JSON.stringify({ ...existing, ...patchFor(existing) }), { mode: 0o600 })
      this.registered = true
      if (name && !this.current) this.setLocalName(name, source, !!launchName)
      return true
    } catch (error) { this.options.logError(error); return false }
  }
  private setLocalName(name: string, source: NameSource, givenAtLaunch?: boolean): void {
    if(this.options.canonicalState){this.options.canonicalState.setRegisteredName(name,source,givenAtLaunch);return}
    const previous = this.current, now = this.now(), key = nameKey(name), sessionId = this.options.getSessionId()
    if (previous && nameKey(previous.name) === key) {
      this.current = { name, source, since: previous.since, sessionId, givenAtLaunch: givenAtLaunch ?? previous.givenAtLaunch }
      if (previous.name !== name || previous.source !== source) this.changed.emit()
      return
    }
    if (previous) this.heldNames.set(nameKey(previous.name), previous.source)
    this.heldNames.delete(key)
    this.formerNames = this.formerNames.filter(n => nameKey(n.name) !== key)
    if (previous && previous.source !== 'derived' && now - previous.since >= 10000) {
      this.formerNames = [{ name: previous.name, until: now, sessionId: previous.sessionId }, ...this.formerNames.filter(n => nameKey(n.name) !== nameKey(previous.name))].slice(0, 3)
    }
    this.current = { name, source, since: now, sessionId, ...(givenAtLaunch && { givenAtLaunch }) }
    this.changed.emit()
  }
  update(patch: Record<string, unknown>): Promise<boolean> {
    if (this.options.writePidPatch) return this.options.writePidPatch(patch)
    const next = this.writeChain.then(async () => {
      try {
        const old: unknown = JSON.parse(await readFile(this.file, 'utf8'))
        if (old === null || typeof old !== 'object' || Array.isArray(old)) throw new Error('invalid session registry record')
        await writeFile(this.file, JSON.stringify({ ...old, ...patch }))
        return true
      } catch (error) { this.options.logError(error); return false }
    })
    this.writeChain = next.then(() => undefined)
    return next
  }
  async setName(name: string, source: NameSource, givenAtLaunch?: boolean): Promise<boolean> {
    if (!name) return false
    this.setLocalName(name, source, givenAtLaunch)
    const updated = await this.update({ name, nameSource: source, nameSince: this.current?.since ?? this.now(),
      formerNames: this.formerNames.length ? this.formerNames : undefined, updatedAt: this.now() }) || !this.options.shouldRegister()
    if (!updated) this.options.logError(new Error('session name applied locally but the session registry record was not updated'))
    return updated
  }
  /** SAr's noninteractive startup path: --name writes without startup arbitration. */
  async initializeSessionName(name: string | undefined, source: 'user' | 'peer' = 'user'): Promise<void> {
    if (name && await this.whenRegistered()) await this.setName(name, source, true)
  }
  /** Public stable-address-OFF lifecycle: keep the registered process name. */
  async sessionSwitched(): Promise<void> {
    this.adoptions++
    if (this.current) this.current = {...this.current, sessionId: this.options.getSessionId()}
    await this.update({ sessionId: this.options.getSessionId(), parkedJobId: undefined, updatedAt: this.now() })
  }
  async cwdChanged(): Promise<void> {
    await this.update({ cwd: this.options.getCwd() })
  }
  async listLive(options: {rejectUnreadable?:boolean} = {}): Promise<LiveName[]> {
    let files: string[]
    try { files = await readdir(this.directory) } catch (error) { if(options.rejectUnreadable && (error as NodeJS.ErrnoException).code!=='ENOENT')throw error; return [] }
    const records = await Promise.all(files.filter(f => /^[1-9]\d*\.json$/.test(f)).map(async file => {
      const pid = Number(file.slice(0, -5))
      if (!Number.isSafeInteger(pid) || String(pid) !== file.slice(0, -5)) return
      try {
        const fd = await open(join(this.directory, file), 'r')
        let data: unknown
        try {
          const st = await fd.stat()
          if (!st.isFile() || st.size > 262144) {if(options.rejectUnreadable&&this.probe.alive(pid))throw Error('Unreadable live session record');return}
          const buffer = Buffer.alloc(262145), { bytesRead } = await fd.read(buffer, 0, buffer.length, 0)
          if (bytesRead > 262144) {if(options.rejectUnreadable&&this.probe.alive(pid))throw Error('Oversized live session record');return}
          data = JSON.parse(buffer.subarray(0, bytesRead).toString('utf8'))
        } finally { await fd.close() }
        if(!this.probe.alive(pid))return
        if (!data || typeof data !== 'object' || Array.isArray(data)) {if(options.rejectUnreadable)throw Error('Invalid live session record');return}
        const p = data as Record<string, unknown>, start = typeof p.procStart === 'string' ? p.procStart : undefined
        const expected = typeof p.procStartFt === 'string' ? p.procStartFt : start
        if (expected !== undefined) {
          const actual = await this.probe.start(pid)
          if(actual===undefined&&options.rejectUnreadable)throw Error('Live session process identity is unreadable')
          if (actual !== undefined && actual !== expected) return
        }
        return { pid, sessionId:typeof p.sessionId==='string'?p.sessionId:undefined,kind:typeof p.kind==='string'?p.kind:undefined, startedAt: timestamp(p.startedAt) ?? 0, procStart: start,
          name: typeof p.name === 'string' ? p.name : undefined, nameSince: timestamp(p.nameSince) }
      } catch (error) { if(options.rejectUnreadable&&this.probe.alive(pid))throw error;return }
    }))
    // The rename reader does not run the daemon's optional registry janitor.
    // Dead/reused/unreadable records never participate; no foreign file is deleted.
    return records.filter((r): r is NonNullable<typeof r> => r !== undefined)
  }
  async dispose(): Promise<void> {
    await this.writeChain
    if (this.registered && !this.options.writePidPatch) await unlink(this.file).catch(() => {})
    this.registered = false
    this.changed.clear()
    this.yielded.clear()
    this.pendingYield=undefined
  }
}
function timestamp(value: unknown): number | undefined { return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 4000000000000000 ? value : undefined }
