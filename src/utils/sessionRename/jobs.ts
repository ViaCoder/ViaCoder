/** Public raw-fs Ir/V0/E4/Wa rename closure, not a background job scheduler. */
import { mkdir, readFile, rename, stat, unlink, writeFile } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import { basename, dirname, isAbsolute, join } from 'node:path'
import {getAppStateJobOwner287,type PublicJobState287} from '../../state/appStateJobs287.js'
import { cleanTitle } from './names.js'
export type RenameJobState = PublicJobState287 & {state:string;detail:string;template:string;intent:string;sessionId:string;cwd:string;createdAt:string;nameSource?:'user'|'auto'|'collision'}
export function parseRenameJob(value: unknown): RenameJobState | null {
  const schema=getAppStateJobOwner287().Se(),parsed=schema.safeParse(value)
  if(!parsed.success||typeof value!=='object'||value===null)return null
  const shape=(schema as unknown as {in:{shape:Record<string,unknown>}}).in.shape
  return {...Object.fromEntries(Object.entries(value).filter(([key])=>!Object.hasOwn(shape,key))),...parsed.data} as RenameJobState
}
export async function atomicRenameWrite(file: string, content: string, createParent = false): Promise<void> {
  if (createParent) await mkdir(dirname(file), { recursive: true, mode: 0o700 })
  const temporary = `${file}.${process.pid}.${randomUUID()}.tmp`
  try { await writeFile(temporary, content, { flag: 'wx', mode: 0o600 }); await rename(temporary, file) }
  finally { await unlink(temporary).catch(() => {}) }
}
export class RenameJobs {
  constructor(private readonly options: {
    configDir: string; getSessionId: () => string; getJobDir: () => string | undefined
    getSessionKind: () => string | undefined; getAttachedJobDir?: () => string | undefined
    logError: (error: unknown) => void
  }) {}
  private async read(dir: string): Promise<RenameJobState | null> {
    return await getAppStateJobOwner287().Fr(dir) as RenameJobState | null
  }
  private async write(dir: string, state: RenameJobState): Promise<void> {
    await getAppStateJobOwner287().ul(dir,state)
  }
  async rename(name: string, source: 'user' | 'collision', expected: (string | undefined)[]): Promise<void> {
    const jobDir = this.options.getJobDir()
    if (jobDir && this.options.getSessionKind() === 'bg') {
      await getAppStateJobOwner287().fH('--name',['-n'],name,{name,nameSource:source},undefined,expected.filter((value):value is string=>value!==undefined))
    }
    // E4 is NOT gated on bg: a regular headless process may have a job row.
    const id = jobDir ? basename(jobDir) : this.options.getAttachedJobDir?.() ? basename(this.options.getAttachedJobDir()!) : this.options.getSessionId().slice(0, 8)
    const dir = join(this.options.configDir, 'jobs', id), old = await this.read(dir)
    if (!old || old.name === name) return
    getAppStateJobOwner287().jp(dir)
    const latest = await this.read(dir) ?? old
    if (latest.name === name || !matches(latest, expected)) return
    await this.write(dir, { ...latest, name, nameSource: source, updatedAt: new Date().toISOString() }).catch(error => { if (!isMissing(error)) this.options.logError(error) })
  }
}
function matches(state: RenameJobState, expected: (string | undefined)[]): boolean { return !state.name || state.nameSource === 'auto' || state.nameSource === 'collision' || expected.includes(cleanTitle(state.name)) }
function isMissing(error: unknown): boolean { return typeof error === 'object' && error !== null && 'code' in error && error.code === 'ENOENT' }
