import { createHash, randomUUID } from 'node:crypto'
import { lstat, mkdir, readFile, rename, unlink, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import lockfile from 'proper-lockfile'

type AppLock = { bundleId: string; windowId?: number }
type Owner = AppLock & { sessionId: string; pid: number; token: string }
type Exclusive = {holder?: string; isSelf: boolean}

/** Host-only contract consumed by official cgr/je, not a native implementation.
 * Ledger mutations and per-app writes are serialized across our processes.
 * Original CLI peers share computer-use.lock but do not know this ledger;
 * therefore this does not enable native appScoped support by itself.
 */
export function createAppScopedHost(options: {
  directory: string
  sessionId: string
  checkExclusiveLock(): Promise<Exclusive>
}) {
  const token = randomUUID(), root = join(options.directory, 'computer-use-app-host')
  const ledger = join(root, 'owners.json')
  let owned: AppLock[] = [], disposed = false
  const evicted = new Set<string>()
  const queues = new Map<string, Promise<unknown>>()
  const alive = (pid: number) => {
    try { process.kill(pid, 0); return true }
    catch (e) { return (e as NodeJS.ErrnoException).code !== 'ESRCH' }
  }
  async function directory() {
    await mkdir(root, {recursive: true, mode: 0o700})
    const s = await lstat(root)
    if (!s.isDirectory() || s.isSymbolicLink() || (s.mode & 0o077) !== 0 ||
        (process.getuid && s.uid !== process.getuid())) throw Error('Insecure app lock directory')
  }
  function serialize<T>(key: string, operation: () => Promise<T>): Promise<T> {
    const work = (queues.get(key) ?? Promise.resolve()).then(operation, operation)
    queues.set(key, work)
    void work.finally(() => { if (queues.get(key) === work) queues.delete(key) }).catch(() => {})
    return work
  }
  async function guarded<T>(key: string, operation: () => Promise<T>): Promise<T> {
    return serialize(key, async () => {
      await directory()
      const release = await lockfile.lock(join(root, key), {realpath: false, lockfilePath: join(root, `${key}.lock`),
        retries: {retries: 100, minTimeout: 10, maxTimeout: 50}, stale: 30000,
        // Never resume a desktop action after losing the mutex lease.
        onCompromised: error => { disposed = true; throw error },
      })
      try { return await operation() } finally { await release() }
    })
  }
  async function read(): Promise<Owner[]> {
    let raw: string
    try {
      const s = await lstat(ledger)
      if (!s.isFile() || s.isSymbolicLink() || (s.mode & 0o077) !== 0) throw Error('Insecure app lock ledger')
      raw = await readFile(ledger, 'utf8')
    } catch (e) { if ((e as NodeJS.ErrnoException).code === 'ENOENT') return []; throw e }
    const value: unknown = JSON.parse(raw)
    if (!Array.isArray(value) || !value.every(v => v && typeof v.bundleId === 'string' &&
        typeof v.sessionId === 'string' && typeof v.token === 'string' && Number.isInteger(v.pid) && v.pid > 0 &&
        (v.windowId === undefined || Number.isSafeInteger(v.windowId) && v.windowId >= 0))) {
      throw Error('Malformed app lock ledger; refusing to overwrite it')
    }
    return value.filter(v => alive(v.pid))
  }
  async function save(rows: Owner[]) {
    const temp = `${ledger}.${token}.tmp`
    try {
      await writeFile(temp, JSON.stringify(rows), {flag: 'wx', mode: 0o600})
      await rename(temp, ledger)
      owned = rows.filter(r => r.token === token).map(({bundleId, windowId}) => ({bundleId, windowId}))
    } finally { await unlink(temp).catch(() => {}) }
  }
  function validate(bundleId: string, windowId?: number) {
    if (!bundleId || typeof bundleId !== 'string' || (windowId !== undefined &&
        (!Number.isSafeInteger(windowId) || windowId < 0))) throw Error('Invalid app/window lock key')
  }
  const conflicts = (r: Owner, app: string, window?: number) => r.token !== token && r.bundleId === app &&
    (window === undefined || r.windowId === undefined || r.windowId === window)
  async function blocker(rows: Owner[], app: string, window?: number) {
    const exclusive = await options.checkExclusiveLock()
    if (exclusive.holder && !exclusive.isSelf) return {blockedBy: 'exclusive' as const, holder: exclusive.holder}
    const other = rows.find(r => conflicts(r, app, window))
    return other ? {blockedBy: 'app' as const, holder: other.sessionId} : undefined
  }
  const api = {
    sessionId: options.sessionId,
    getAppLockHeld: () => owned.map(r => ({...r})),
    checkExclusiveLock: options.checkExclusiveLock,
    checkAppLock: (app: string, window?: number) => guarded('ledger', async () => {
      validate(app, window); return blocker(await read(), app, window)
    }),
    acquireAppLock: (app: string, window?: number) => guarded('ledger', async () => {
      if (disposed) throw Error('App lock host is closed')
      validate(app, window)
      const rows = await read()
      if (await blocker(rows, app, window)) return false
      if (!rows.some(r => r.token === token && r.bundleId === app && r.windowId === window))
        rows.push({bundleId: app, windowId: window, token, pid: process.pid, sessionId: options.sessionId})
      await save(rows); return true
    }),
    releaseAppLock: (app?: string, window?: number) => guarded('ledger', async () => {
      if (window !== undefined && app === undefined) throw Error('windowId requires bundleId')
      if (app !== undefined) validate(app, window)
      await save((await read()).filter(r => !(r.token === token &&
        (app === undefined || r.bundleId === app) && (window === undefined || r.windowId === window))))
    }),
    withAppWriteMutex: <T>(app: string, work: () => Promise<T>) => {
      validate(app)
      return guarded('write-' + createHash('sha256').update(app).digest('hex'), async () => {
        if (disposed) throw Error('App lock host is closed')
        // The user may have evicted ownership while this write was queued.
        const stillOwned = await guarded('ledger', async () => {
          const exclusive = await options.checkExclusiveLock()
          return !(exclusive.holder && !exclusive.isSelf) && (await read()).some(r => r.token === token && r.bundleId === app)
        })
        if (!stillOwned) throw Error('App ownership was released before the queued write')
        return work()
      })
    },
    // Call only when the audited native collision callback has evicted control.
    onCollisionEvicted: async (app: string) => {
      evicted.add(app)
      await api.releaseAppLock(app)
    },
    consumeCollisionEvicted: (app: string) => evicted.delete(app),
    // Serializes the transition to display scope against new app acquisitions.
    withExclusiveAcquire: <T>(work: () => Promise<T>) => guarded('ledger', async () => {
      if (disposed) throw Error('App lock host is closed')
      const foreign = (await read()).find(r => r.token !== token)
      if (foreign) throw Error(`Computer use app locks held by ${foreign.sessionId}`)
      return work()
    }),
    dispose: async () => { disposed = true; await api.releaseAppLock(); evicted.clear() },
  }
  return api
}

export const APP_SCOPED_UNAVAILABLE_REASON = 'Official npm 2.1.283 publishes low-level Swift appScoped exports, but its CLI executor does not publish the MCP dispatch/focus/collision adapter. Native app-scoped actions, takeover and teach mode are disabled.'
